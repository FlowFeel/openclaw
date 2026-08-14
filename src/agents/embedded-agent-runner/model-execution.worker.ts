/**
 * Worker-thread entry point for model execution.
 *
 * Phase 3a-2: offloads the model API call (streamSimple) to a worker thread.
 * The worker receives a request with a transferable MessagePort, calls
 * streamSimple, and streams AssistantMessageEvents back on the port.
 *
 * Two modes (selected by workerData at spawn time):
 *
 * 1. One-shot: workerData is the request. Process and exit. (for tests)
 * 2. Persistent (warm pool): workerData = { mode: "persistent" }. Listen on
 *    parentPort for { seq, input } requests. For each request, call
 *    streamSimple, stream events on the request's MessagePort, and send a
 *    terminal { seq, status, value } ack on parentPort.
 *
 * Protocol:
 * - Main → Worker (parentPort): { seq, input: { model, context, options, streamPort } }
 *   streamPort is transferred (not cloned).
 * - Worker → Main (streamPort): each AssistantMessageEvent as-is
 * - Main → Worker (streamPort): { type: "abort" } control message
 * - Worker → Main (parentPort): { seq, status: "ok", value: null } or
 *   { seq, status: "failed", error: string }
 *
 * The terminal ack on parentPort satisfies the TopicAffineWorkerPool's
 * single-response contract. The real result flows via the streamPort events
 * (the "done"/"error" event carries the final AssistantMessage).
 *
 * @dft
 * - A1 (pure-io-separation): streamSimple is I/O; the protocol is state.
 * - A4 (dft-docs): this file is documented.
 */
import { parentPort, workerData, type MessagePort } from "node:worker_threads";
import { streamSimple } from "../../llm/stream.js";
import type {
  AssistantMessage,
  AssistantMessageEvent,
  Context,
  Model,
  SimpleStreamOptions,
} from "../../llm/types.js";

/** Serializable request accepted by the model execution worker. */
export type ModelExecutionWorkerInput = {
  model: Model;
  context: Context;
  options: Omit<SimpleStreamOptions, "signal">;
  /** Transferred MessagePort for streaming events back to main. */
  streamPort: MessagePort;
};

/** Serializable ack sent on parentPort (satisfies the pool's response contract). */
export type ModelExecutionWorkerResult = null;

type PersistentRequest = { seq: number; input: unknown };

function isPersistentMode(data: unknown): data is { mode: "persistent" } {
  return (
    typeof data === "object" &&
    data !== null &&
    (data as Record<string, unknown>).mode === "persistent"
  );
}

function isWorkerInput(value: unknown): value is ModelExecutionWorkerInput {
  if (!value || typeof value !== "object") {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.model === "object" &&
    record.model !== null &&
    typeof record.context === "object" &&
    record.context !== null &&
    typeof record.options === "object" &&
    record.options !== null &&
    typeof record.streamPort === "object" &&
    record.streamPort !== null
  );
}

/**
 * Execute one model request: call streamSimple, stream events on the port.
 *
 * The caller owns the AbortController and the streamPort lifecycle.
 * This function:
 * 1. Calls streamSimple(model, context, { ...options, signal })
 * 2. Iterates the event stream, forwarding each event on streamPort
 * 3. On error, sends a synthetic "error" event on streamPort
 * 4. Returns when the stream is exhausted (done/error/break)
 */
async function executeModelRequest(
  input: ModelExecutionWorkerInput,
  signal: AbortSignal,
): Promise<void> {
  const { model, context, options, streamPort } = input;

  try {
    const eventStream = streamSimple(model, context, {
      ...options,
      signal,
    });

    for await (const event of eventStream) {
      streamPort.postMessage(event satisfies AssistantMessageEvent);

      if (event.type === "done" || event.type === "error") {
        break;
      }
    }
  } catch (error) {
    const assistantMessage: AssistantMessage = {
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
      },
      stopReason: "error" as const,
      timestamp: Date.now(),
      ...(error instanceof Error ? { errorMessage: error.message } : {}),
    };
    const errorEvent: AssistantMessageEvent = {
      type: "error",
      reason: "error",
      error: assistantMessage,
    };
    streamPort.postMessage(errorEvent);
  }
}

/**
 * Handle one persistent-mode request: create an AbortController, wire abort
 * control messages from the stream port, execute, and ack on parentPort.
 */
async function handlePersistentRequest(
  port: NonNullable<typeof parentPort>,
  request: PersistentRequest,
): Promise<void> {
  if (!isWorkerInput(request.input)) {
    port.postMessage({
      seq: request.seq,
      status: "failed",
      error: "invalid model execution worker input",
    });
    return;
  }

  const { streamPort } = request.input;
  const abortController = new AbortController();

  const onAbortControl = (msg: unknown) => {
    if (
      typeof msg === "object" &&
      msg !== null &&
      (msg as Record<string, unknown>).type === "abort"
    ) {
      abortController.abort();
    }
  };
  streamPort.on("message", onAbortControl);

  try {
    await executeModelRequest(request.input, abortController.signal);
    port.postMessage({ seq: request.seq, status: "ok", value: null });
  } catch (error) {
    port.postMessage({
      seq: request.seq,
      status: "failed",
      error: error instanceof Error ? error.message : String(error),
    });
  } finally {
    streamPort.off("message", onAbortControl);
    try {
      streamPort.close();
    } catch {
      // already closed
    }
  }
}

if (parentPort) {
  const port = parentPort;

  if (isPersistentMode(workerData)) {
    // Persistent RPC mode: stay alive, handle requests via parentPort.
    port.on("message", (request: PersistentRequest) => {
      void handlePersistentRequest(port, request);
    });
  } else if (isWorkerInput(workerData)) {
    // One-shot mode (for tests): process workerData and exit.
    const abortController = new AbortController();
    void executeModelRequest(workerData, abortController.signal).finally(() => {
      try {
        workerData.streamPort.close();
      } catch {
        // already closed
      }
      port.close();
    });
  }
}
