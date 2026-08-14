/**
 * Topic-affine worker pool — warm, persistent workers with topic routing.
 *
 * Manages N worker threads, each owning the topics that hash to it (FNV-1a).
 * A topic's tasks always land on the same worker → warm state, cache locality.
 *
 * Features (multithreaded-runtime-design.md §3):
 * - Warm pool: workers created once, reused across turns (no spawn-per-call).
 * - Topic affinity: `workerIndex = hashTopicKey(topicKey) % poolSize`.
 * - Bounded queue per worker (backpressure): fast-reject when full.
 * - Auto-recovery: on worker death, pending requests rejected, next request
 *   respawns a replacement.
 * - `unref`'d: workers don't keep the process alive.
 *
 * This is the generic infrastructure. The `WorkerPoolDispatcher` wraps it to
 * implement `TurnDispatcher`; CPU-bound subtasks (compaction, code-mode) can
 * also use it directly.
 *
 * @dft
 * - A1 (pure-io-separation): worker spawn/IPC is I/O; pool routing is state.
 * - A4 (dft-docs): this file is documented.
 */
import { Worker, type Transferable } from "node:worker_threads";
import { hashTopicKey } from "./topic-isolation-policy.js";

/** Default bounded queue depth per worker (backpressure). */
export const DEFAULT_QUEUE_DEPTH = 4;

type PendingRequest<TValue> = {
  resolve: (value: TValue) => void;
  reject: (error: WorkerPoolError) => void;
  timer: ReturnType<typeof setTimeout>;
};

type WorkerEntry<TValue> = {
  worker: Worker;
  pending: Map<number, PendingRequest<TValue>>;
  queueDepth: number;
};

export class WorkerPoolError extends Error {
  constructor(
    message: string,
    readonly code: "unavailable" | "timeout" | "failed" | "busy",
  ) {
    super(message);
    this.name = "WorkerPoolError";
  }
}

export type TopicAffineWorkerPoolOptions = {
  /** The worker script URL. */
  workerUrl: URL;
  /** Number of workers in the pool (1 = single worker, no sharding). */
  poolSize: number;
  /** Bounded queue depth per worker (default 4). */
  queueDepth?: number;
  /** Per-request timeout in ms (default 60s). */
  timeoutMs?: number;
  /**
   * Optional workerData passed to each worker at spawn time.
   *
   * Workers that support a persistent mode (e.g. compaction-planning.worker.ts)
   * use this to switch from one-shot to RPC mode.  When omitted, workerData
   * is undefined in the worker.
   */
  workerData?: unknown;
};

/**
 * A pool of warm worker threads with topic-affinity routing.
 *
 * @typeParam TValue - The successful response value type from the worker.
 */
export class TopicAffineWorkerPool<TValue> {
  private readonly workers: Map<number, WorkerEntry<TValue>> = new Map();
  private readonly workerUrl: URL;
  private readonly poolSize: number;
  private readonly queueDepth: number;
  private readonly timeoutMs: number;
  private readonly workerData: unknown;
  private seq = 0;

  constructor(options: TopicAffineWorkerPoolOptions) {
    this.workerUrl = options.workerUrl;
    this.poolSize = Math.max(1, Math.floor(options.poolSize) || 1);
    this.queueDepth = options.queueDepth ?? DEFAULT_QUEUE_DEPTH;
    this.timeoutMs = options.timeoutMs ?? 60_000;
    this.workerData = options.workerData;
  }

  /**
   * Dispatch a request to the worker that owns the given topic key.
   *
   * The topic→worker mapping is deterministic (FNV-1a hash), so the same
   * topic always lands on the same worker (session affinity).
   *
   * @throws WorkerPoolError with code "busy" if the worker's queue is full.
   *
   * @param transferList Optional transfer list for `postMessage` (e.g. MessagePort).
   *   Transferable objects are moved (not cloned) to the worker.
   */
  async dispatch(
    topicKey: string,
    input: unknown,
    transferList?: readonly Transferable[],
  ): Promise<TValue> {
    const workerIndex = hashTopicKey(topicKey) % this.poolSize;
    const entry = this.getOrCreateWorker(workerIndex);

    if (entry.queueDepth >= this.queueDepth) {
      throw new WorkerPoolError(
        `worker-${workerIndex} queue full (${entry.queueDepth}/${this.queueDepth})`,
        "busy",
      );
    }

    const seq = ++this.seq;
    entry.queueDepth++;

    return new Promise<TValue>((resolve, reject) => {
      const timer = setTimeout(() => {
        entry.pending.delete(seq);
        entry.queueDepth--;
        reject(new WorkerPoolError(`request timed out on worker-${workerIndex}`, "timeout"));
      }, this.timeoutMs);

      entry.pending.set(seq, { resolve, reject, timer });
      entry.worker.postMessage({ seq, input }, transferList ?? []);
    });
  }

  /** Terminate all workers and reject all pending requests. */
  async terminateAll(): Promise<void> {
    const entries = [...this.workers.values()];
    this.workers.clear();
    for (const entry of entries) {
      this.failAllPending(entry, new WorkerPoolError("pool terminated", "unavailable"));
      await entry.worker.terminate();
    }
  }

  private getOrCreateWorker(index: number): WorkerEntry<TValue> {
    let entry = this.workers.get(index);
    if (entry) {
      return entry;
    }

    // Match the legacy harness: .ts worker URLs need tsx for on-the-fly
    // transpilation in dev/test mode.
    const sourceWorkerExecArgv = this.workerUrl.pathname.endsWith(".ts")
      ? ["--import", "tsx"]
      : undefined;
    const worker = new Worker(this.workerUrl, {
      ...(this.workerData !== undefined ? { workerData: this.workerData } : {}),
      execArgv: sourceWorkerExecArgv,
    });
    worker.unref?.();
    entry = { worker, pending: new Map(), queueDepth: 0 };
    this.workers.set(index, entry);

    worker.on(
      "message",
      (msg: { seq: number; status: "ok" | "failed"; value?: TValue; error?: string }) => {
        const request = entry!.pending.get(msg.seq);
        if (!request) {
          return; // stale response from a timed-out request
        }
        entry!.pending.delete(msg.seq);
        entry!.queueDepth--;
        clearTimeout(request.timer);
        if (msg.status === "ok" && msg.value !== undefined) {
          request.resolve(msg.value);
        } else {
          request.reject(new WorkerPoolError(msg.error ?? "unknown error", "failed"));
        }
      },
    );

    worker.on("error", (error) => {
      this.failAllPending(
        entry!,
        new WorkerPoolError(error instanceof Error ? error.message : String(error), "unavailable"),
      );
      this.workers.delete(index);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        this.failAllPending(
          entry!,
          new WorkerPoolError(`worker-${index} exited with code ${code}`, "unavailable"),
        );
      }
      this.workers.delete(index);
    });

    return entry;
  }

  private failAllPending(entry: WorkerEntry<TValue>, error: WorkerPoolError): void {
    for (const { reject, timer } of entry.pending.values()) {
      clearTimeout(timer);
      reject(error);
    }
    entry.pending.clear();
    entry.queueDepth = 0;
  }

  /** The number of workers currently alive. */
  get aliveCount(): number {
    return this.workers.size;
  }
}
