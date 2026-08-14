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
import { MessageChannel, type MessagePort } from "node:worker_threads";
import type {
  AssistantMessage,
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
    const { port1, port2 } = new MessageChannel();
    const stream = createAssistantMessageEventStream();
    let settled = false;

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

    // Forward events from port1 to the AssistantMessageEventStream.
    port1.on("message", (event: AssistantMessageEvent) => {
      stream.push(event);
      if (event.type === "done" || event.type === "error") {
        settled = true;
        port1.close();
      }
    });

    // Abort propagation: when the caller's signal aborts, tell the worker.
    if (options?.signal) {
      const signal = options.signal;
      if (signal.aborted) {
        port1.postMessage({ type: "abort" });
      } else {
        signal.addEventListener(
          "abort",
          () => {
            port1.postMessage({ type: "abort" });
          },
          { once: true },
        );
      }
    }

    // Crash recovery: if the pool rejects (worker crash, timeout), end the
    // stream with an error event.
    dispatchPromise.catch((error: unknown) => {
      if (settled) {
        return; // stream already completed via events
      }
      settled = true;
      const message =
        error instanceof WorkerPoolError
          ? `model execution worker ${error.code}: ${error.message}`
          : error instanceof Error
            ? error.message
            : String(error);
      const errorEvent: AssistantMessageEvent = {
        type: "error",
        reason: "error",
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
          stopReason: "error" as const,
          timestamp: Date.now(),
          errorMessage: message,
        },
      };
      stream.push(errorEvent);
      try {
        port1.close();
      } catch {
        // already closed
      }
    });

    // Clean up the port when the stream is done.
    // (port1.close() is called in the message handler on terminal events,
    // and in the catch handler on crashes.)
    port1.on("close", () => {
      // Drain: the dispatch promise resolves after the worker sends the ack.
      // Swallow the ack — the real result already flowed via events.
      void dispatchPromise.catch(() => {
        // Error already handled above.
      });
    });

    return stream;
  }

  /** Terminate the worker pool. */
  async terminate(): Promise<void> {
    await this.pool.terminateAll();
  }
}
