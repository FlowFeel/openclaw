/**
 * Test worker for WorkerModelExecutionPort — mocks the model stream.
 *
 * Persistent mode: receives { seq, input: { streamPort, ... } } on parentPort,
 * sends mock AssistantMessageEvents on streamPort, then sends ack on parentPort.
 *
 * Supports a "delay" option in input.options.timeoutMs to simulate slow model
 * calls (for abort testing).
 */
import { parentPort, workerData, type MessagePort } from "node:worker_threads";

interface TestRequest {
  seq: number;
  input: {
    streamPort: MessagePort;
    options?: { timeoutMs?: number; crash?: boolean };
    model?: { api?: string; provider?: string; id?: string };
  };
}

function isPersistentMode(data: unknown): data is { mode: "persistent" } {
  return (
    typeof data === "object" &&
    data !== null &&
    (data as Record<string, unknown>).mode === "persistent"
  );
}

function makeUsage() {
  return {
    input: 10,
    output: 20,
    cacheRead: 0,
    cacheWrite: 0,
    totalTokens: 30,
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
  };
}

function makeAssistantMessage(model?: { api?: string; provider?: string; id?: string }) {
  return {
    role: "assistant" as const,
    content: [{ type: "text" as const, text: "Hello from test worker" }],
    api: model?.api ?? "openai",
    provider: model?.provider ?? "openai",
    model: model?.id ?? "test-model",
    usage: makeUsage(),
    stopReason: "stop" as const,
    timestamp: Date.now(),
  };
}

if (parentPort && isPersistentMode(workerData)) {
  const port = parentPort;

  port.on("message", (request: TestRequest) => {
    const { seq, input } = request;
    const streamPort = input.streamPort;

    // Listen for abort control messages
    let aborted = false;
    streamPort.on("message", (msg: unknown) => {
      if (
        typeof msg === "object" &&
        msg !== null &&
        (msg as Record<string, unknown>).type === "abort"
      ) {
        aborted = true;
      }
    });

    const sendEvents = async () => {
      const model = input.model;
      const assistantMessage = makeAssistantMessage(model);

      // Crash mid-stream — simulates a worker dying during a model API call.
      // The pool's 'exit' handler rejects the pending dispatch promise,
      // and the WorkerModelExecutionPort ends the stream with an error event.
      if (input.options?.crash) {
        process.exit(1);
      }

      // If a delay is requested, wait (for abort testing)
      if (input.options?.timeoutMs && input.options.timeoutMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, input.options!.timeoutMs));
      }

      if (aborted) {
        streamPort.postMessage({
          type: "error",
          reason: "aborted",
          error: { ...assistantMessage, stopReason: "aborted" as const, errorMessage: "aborted" },
        });
        streamPort.close();
        port.postMessage({ seq, status: "ok", value: null });
        return;
      }

      // Send: start → text_start → text_delta → text_end → done
      streamPort.postMessage({ type: "start", partial: assistantMessage });
      streamPort.postMessage({
        type: "text_start",
        contentIndex: 0,
        partial: assistantMessage,
      });
      streamPort.postMessage({
        type: "text_delta",
        contentIndex: 0,
        delta: "Hello",
        partial: assistantMessage,
      });
      streamPort.postMessage({
        type: "text_end",
        contentIndex: 0,
        content: "Hello from test worker",
        partial: assistantMessage,
      });
      streamPort.postMessage({
        type: "done",
        reason: "stop",
        message: assistantMessage,
      });
      streamPort.close();
      port.postMessage({ seq, status: "ok", value: null });
    };

    void sendEvents();
  });
}
