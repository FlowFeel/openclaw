/**
 * Warm worker pool for compaction planning — replaces spawn-per-call.
 *
 * Design (multithreaded-runtime-design.md §3, Phase 1):
 * The previous harness (`runCompactionPlanningWorker` in
 * `compaction-planning-worker.ts`) spawned a fresh `new Worker()` per call and
 * terminated it in `finally`.  On a multi-topic forum bot, compaction planning
 * fires on every turn once history exceeds 64 messages — each paying
 * worker-spawn cost (10–30 MB heap init).
 *
 * This pool creates **one** persistent worker at first use, keeps it alive
 * (`unref`'d so it doesn't keep the process alive), and routes requests via
 * `postMessage({ seq, input })` / `on('message', { seq, ...result })`.
 *
 * Failure handling:
 * - On worker `error` or unexpected `exit`: all pending requests are rejected
 *   with code `"unavailable"`, the worker reference is cleared, and the next
 *   `run()` call spawns a fresh worker.  Callers fall back to inline planning
 *   (see `runCompactionPlan` in `compaction-planning-worker.ts`).
 *
 * Thread safety:
 * - The pool is a module-level singleton.  All calls come from the main thread.
 * - The worker processes one request at a time (single-threaded event loop
 *   inside the worker).  Requests are correlated by `seq` number, so multiple
 *   in-flight requests are safe (though the worker handles them serially).
 *
 * @dft
 * - A1 (pure-io-separation): worker spawn/IPC is I/O; the pool logic is state.
 * - A4 (dft-docs): this file is documented.
 * - A6 (check-result): errors carry a `code` for caller routing.
 */
import { Worker } from "node:worker_threads";
import type {
  CompactionPlanningWorkerInput,
  CompactionPlanningWorkerResult,
  CompactionPlanningWorkerValue,
} from "./compaction-planning.worker.js";

const POOL_REQUEST_TIMEOUT_MS = 60_000;

type PendingRequest = {
  resolve: (value: CompactionPlanningWorkerValue) => void;
  reject: (error: PoolError) => void;
  timer: ReturnType<typeof setTimeout>;
};

export class CompactionPlanningPoolError extends Error {
  constructor(
    message: string,
    readonly code: "unavailable" | "timeout" | "failed",
  ) {
    super(message);
    this.name = "CompactionPlanningPoolError";
  }
}

type PoolWorkerOptions = {
  workerUrl: URL;
  timeoutMs?: number;
};

type PersistentResponse = { seq: number } & CompactionPlanningWorkerResult;

/**
 * A warm, reusable compaction-planning worker.
 *
 * Created once, reused across turns.  If the worker dies, the next `run()`
 * call lazily creates a replacement.
 */
export class CompactionPlanningWorkerPool {
  private worker: Worker | null = null;
  private seq = 0;
  private readonly pending = new Map<number, PendingRequest>();
  private readonly workerUrl: URL;
  private readonly timeoutMs: number;
  private starting: Promise<Worker> | null = null;

  constructor(options: PoolWorkerOptions) {
    this.workerUrl = options.workerUrl;
    this.timeoutMs = options.timeoutMs ?? POOL_REQUEST_TIMEOUT_MS;
  }

  /**
   * Run one compaction planning request on the warm worker.
   *
   * If the worker is not yet created, it is spawned lazily.  If the worker has
   * died, a replacement is spawned.  Requests are correlated by sequence
   * number so multiple calls can be in-flight concurrently (the worker handles
   * them serially in its own event loop).
   */
  async run(input: CompactionPlanningWorkerInput): Promise<CompactionPlanningWorkerValue> {
    const worker = await this.ensureWorker();
    const seq = ++this.seq;
    return new Promise<CompactionPlanningWorkerValue>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(seq);
        reject(
          new CompactionPlanningPoolError("compaction planning pool request timed out", "timeout"),
        );
      }, this.timeoutMs);

      this.pending.set(seq, { resolve, reject, timer });
      worker.postMessage({ seq, input });
    });
  }

  /**
   * Lazily create the worker, or return the existing one.
   *
   * Uses a `starting` promise to deduplicate concurrent first-call spawns.
   */
  private ensureWorker(): Promise<Worker> {
    if (this.worker) {
      return Promise.resolve(this.worker);
    }
    if (this.starting) {
      return this.starting;
    }
    this.starting = this.createWorker().finally(() => {
      this.starting = null;
    });
    return this.starting;
  }

  private createWorker(): Promise<Worker> {
    return new Promise<Worker>((resolve, reject) => {
      let worker: Worker;
      try {
        worker = new Worker(this.workerUrl, {
          workerData: { mode: "persistent" },
        });
      } catch (error) {
        reject(
          new CompactionPlanningPoolError(
            error instanceof Error ? error.message : String(error),
            "unavailable",
          ),
        );
        return;
      }
      worker.unref?.();

      // The 'online' event fires when the worker thread has started.
      // postMessage is buffered until the worker registers its listener,
      // so it's safe to send requests immediately after 'online'.
      worker.once("online", () => {
        this.attachWorker(worker);
        resolve(worker);
      });
      worker.once("error", (error) => {
        reject(
          new CompactionPlanningPoolError(
            error instanceof Error ? error.message : String(error),
            "unavailable",
          ),
        );
      });
    });
  }

  private attachWorker(worker: Worker): void {
    this.worker = worker;

    worker.on("message", (msg: PersistentResponse) => {
      const handler = this.pending.get(msg.seq);
      if (!handler) {
        return; // stale response from a timed-out request
      }
      this.pending.delete(msg.seq);
      clearTimeout(handler.timer);
      if (msg.status === "ok") {
        handler.resolve(msg.value);
      } else {
        handler.reject(new CompactionPlanningPoolError(msg.error, "failed"));
      }
    });

    worker.on("error", (error) => {
      this.failAllPending(
        new CompactionPlanningPoolError(
          error instanceof Error ? error.message : String(error),
          "unavailable",
        ),
      );
      this.worker = null;
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        this.failAllPending(
          new CompactionPlanningPoolError(`worker exited with code ${code}`, "unavailable"),
        );
      }
      this.worker = null;
    });
  }

  private failAllPending(error: CompactionPlanningPoolError): void {
    for (const { reject, timer } of this.pending.values()) {
      clearTimeout(timer);
      reject(error);
    }
    this.pending.clear();
  }

  /** Terminate the warm worker and clear all pending requests. */
  async terminate(): Promise<void> {
    const worker = this.worker;
    this.worker = null;
    this.failAllPending(new CompactionPlanningPoolError("pool terminated", "unavailable"));
    if (worker) {
      await worker.terminate();
    }
  }
}
