/**
 * Worker model execution port — dispatches model API calls to a worker pool.
 *
 * Phase 3a-2: implements `ModelExecutionPort` using `TopicAffineWorkerPool`.
 * Each `stream()` call:
 * 1. Creates a `MessageChannel` (port1 stays on main, port2 goes to worker)
 * 2. Dispatches `{ model, context, options, streamPort: port2 }` to the pool
 *    (port2 is transferred, not cloned)
 * 3. Returns an `AssistantMessageEventStreamContract` that iterates events
 *    received on port1
 *
 * The worker calls `streamSimple(model, context, options)`, streams events
 * back on port2, and sends a terminal ack on the pool's parentPort.
 *
 * Abort propagation: when the caller's `options.signal` aborts, main sends
 * `{ type: "abort" }` on port1. The worker receives it and aborts the model
 * fetch.
 *
 * Crash recovery: if the worker dies mid-stream, the pool's `dispatch()`
 * promise rejects (via the pool's exit/error handler). The stream is ended
 * with an error event.
 *
 * @dft
 * - A1 (pure-io-separation): worker IPC is I/O; the stream adapter is state.
 * - A4 (dft-docs): this file is documented.
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { MessageChannel } from "node:worker_threads";
import { streamSimple } from "../../llm/stream.js";
import type {
  AssistantMessageEvent,
  AssistantMessageEventStreamContract,
  Context,
  Model,
  SimpleStreamOptions,
  Usage,
} from "../../llm/types.js";
import { createAssistantMessageEventStream } from "../../llm/utils/event-stream.js";
import { TopicAffineWorkerPool, WorkerPoolError } from "../../process/topic-affine-worker-pool.js";
import type { ModelExecutionPort } from "./model-execution-port.js";
import type {
  ModelExecutionWorkerInput,
  ModelExecutionWorkerResult,
} from "./model-execution.worker.js";

/**
 * Resolves the model execution worker URL from the current module URL.
 *
 * In dev/test (`.ts`): resolves to `./model-execution.worker.ts` relative to
 * this module.  In production (`/dist/`): resolves to
 * `dist/agents/embedded-agent-runner/model-execution.worker.js`.
 *
 * Matches the pattern in `compaction-planning-worker.ts`.
 */
export function resolveModelExecutionWorkerUrl(currentModuleUrl = import.meta.url): URL {
  const currentPath = fileURLToPath(currentModuleUrl);
  const normalized = currentPath.replaceAll(path.sep, "/");
  const distMarker = "/dist/";
  const distIndex = normalized.lastIndexOf(distMarker);
  if (distIndex >= 0) {
    const distRoot = currentPath.slice(0, distIndex + distMarker.length);
    return pathToFileURL(
      path.join(distRoot, "agents", "embedded-agent-runner", "model-execution.worker.js"),
    );
  }
  const extension = path.extname(currentPath) || ".js";
  return new URL(`./model-execution.worker${extension}`, currentModuleUrl);
}

export type WorkerModelExecutionPortOptions = {
  /** The worker script URL. */
  workerUrl: URL;
  /** Number of workers in the pool (1 = single worker, no sharding). */
  poolSize: number;
  /** Bounded queue depth per worker (default 4). */
  queueDepth?: number;
  /** Per-request timeout in ms (default 120s — model calls can be long). */
  timeoutMs?: number;
  /** Topic key for worker affinity (default: "model-execution"). */
  topicKey?: string;
};

/**
 * Model execution port backed by a `TopicAffineWorkerPool`.
 *
 * At Scale 1, this replaces `DirectModelExecutionPort` for model API calls.
 * The worker handles only HTTP fetch + SSE parse; all prompt/tool/wrapper
 * logic stays on main.
 */
export class WorkerModelExecutionPort implements ModelExecutionPort {
  private readonly pool: TopicAffineWorkerPool<ModelExecutionWorkerResult>;
  private readonly topicKey: string;

  constructor(options: WorkerModelExecutionPortOptions) {
    this.pool = new TopicAffineWorkerPool<ModelExecutionWorkerResult>({
      workerUrl: options.workerUrl,
      poolSize: options.poolSize,
      queueDepth: options.queueDepth,
      timeoutMs: options.timeoutMs ?? 120_000,
      workerData: { mode: "persistent" },
    });
    this.topicKey = options.topicKey ?? "model-execution";
  }

  stream(
    model: Model,
    context: Context,
    options?: SimpleStreamOptions,
  ): AssistantMessageEventStreamContract {
    const stream = createAssistantMessageEventStream();
    let settled = false;

    // 3a-4: Pre-aborted signal — immediately end the stream without dispatching.
    // The model call never starts, so no cleanup is needed.
    if (options?.signal?.aborted) {
      stream.push(this.makeErrorEvent(model, "aborted", "model execution aborted before dispatch"));
      return stream;
    }

    const { port1, port2 } = new MessageChannel();
    // 3a-4: unref port1 so it doesn't keep the process alive.
    port1.unref();

    // Strip the signal — it can't cross the IPC boundary. Abort is propagated
    // via a control message on the MessagePort (see below).
    const { signal: _stripped, ...portableOptions } = options ?? {};

    const input: ModelExecutionWorkerInput = {
      model,
      context,
      options: portableOptions,
      streamPort: port2,
    };

    // Dispatch to the pool, transferring port2 to the worker.
    const dispatchPromise = this.pool.dispatch(this.topicKey, input, [port2]);

    // 3a-4: Abort listener cleanup — store the listener so we can remove it
    // when the stream ends (prevents memory leak if the signal outlives the stream).
    let abortListener: (() => void) | undefined;
    if (options?.signal) {
      const signal = options.signal;
      abortListener = () => {
        // Send abort control message. postMessage buffers until the worker
        // attaches its listener, so this is safe even if the worker hasn't
        // started yet.
        try {
          port1.postMessage({ type: "abort" });
        } catch {
          // port may be closed already
        }
      };
      signal.addEventListener("abort", abortListener, { once: true });
    }

    // Helper: clean up the port + abort listener. Idempotent via `settled`.
    const cleanup = () => {
      if (settled) {
        return;
      }
      settled = true;
      if (abortListener && options?.signal) {
        options.signal.removeEventListener("abort", abortListener);
      }
      try {
        port1.close();
      } catch {
        // already closed
      }
    };

    // Forward events from port1 to the AssistantMessageEventStream.
    port1.on("message", (event: AssistantMessageEvent) => {
      stream.push(event);
      if (event.type === "done" || event.type === "error") {
        cleanup();
      }
    });

    // Crash recovery + graceful degradation (3a-4/3a-5):
    // - "busy" (3a-5): the request was never dispatched (fast-reject before
    //   the worker saw it). Fall back to streamSimple() on main — graceful
    //   degradation. Port2 was never transferred, so we own it and close it.
    // - "timeout" / "unavailable" / "failed" (3a-4): the request may have
    //   been dispatched (the model call may be in-flight in the worker).
    //   Falling back would risk a duplicate model call. End with an error.
    dispatchPromise.catch((error: unknown) => {
      if (settled) {
        return; // stream already completed via events
      }

      // 3a-5: graceful degradation on "busy" — fall back to direct execution.
      if (error instanceof WorkerPoolError && error.code === "busy") {
        // Close the unused channel (port2 was never transferred).
        try {
          port1.close();
        } catch {
          // already closed
        }
        try {
          port2.close();
        } catch {
          // already closed
        }
        if (abortListener && options?.signal) {
          options.signal.removeEventListener("abort", abortListener);
        }

        // Fall back to streamSimple on main. Pipe events into the existing stream.
        try {
          const directStream = streamSimple(model, context, options);
          void (async () => {
            for await (const event of directStream) {
              if (settled) {
                return;
              }
              stream.push(event);
              if (event.type === "done" || event.type === "error") {
                settled = true;
                return;
              }
            }
          })().catch(() => {
            if (!settled) {
              settled = true;
              stream.push(this.makeErrorEvent(model, "error", "direct fallback stream failed"));
            }
          });
        } catch (directError) {
          settled = true;
          stream.push(
            this.makeErrorEvent(
              model,
              "error",
              directError instanceof Error ? directError.message : String(directError),
            ),
          );
        }
        return;
      }

      // 3a-4: hard error on timeout/unavailable/failed.
      const message =
        error instanceof WorkerPoolError
          ? `model execution worker ${error.code}: ${error.message}`
          : error instanceof Error
            ? error.message
            : String(error);
      stream.push(this.makeErrorEvent(model, "error", message));
      cleanup();
    });

    return stream;
  }

  /**
   * Construct a synthetic error AssistantMessageEvent.
   *
   * Used for crash recovery (3a-4) and pre-abort (3a-4) and graceful
   * degradation failure (3a-5).
   */
  private makeErrorEvent(
    model: Model,
    reason: "error" | "aborted",
    message: string,
  ): AssistantMessageEvent {
    return {
      type: "error",
      reason,
      error: {
        role: "assistant",
        content: [],
        api: model.api,
        provider: model.provider,
        model: model.id,
        usage: {
          input: 0,
          output: 0,
          cacheRead: 0,
          cacheWrite: 0,
          totalTokens: 0,
          cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
        } satisfies Usage,
        stopReason: reason === "aborted" ? ("aborted" as const) : ("error" as const),
        timestamp: Date.now(),
        errorMessage: message,
      },
    };
  }

  /** Terminate the worker pool. */
  async terminate(): Promise<void> {
    await this.pool.terminateAll();
  }
}
