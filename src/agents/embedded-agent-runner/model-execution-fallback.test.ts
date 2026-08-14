// Integration tests for WorkerModelExecutionPort graceful degradation (3a-5).
//
// Prediction (3a-5): when the worker pool rejects with code "busy" (queue
// full), WorkerModelExecutionPort falls back to streamSimple() on main —
// graceful degradation. No requests are rejected under burst load; they
// run on main instead of in a worker. The fallback stream events flow into
// the same AssistantMessageEventStreamContract.
//
// Competing account: a hard reject would drop requests under burst load.
// A broken fallback might hang (stream never ends) or crash (unhandled
// rejection from streamSimple).
//
// Support: pool busy → stream completes (done or error), never hangs. The
// fallback closes the unused MessageChannel (port2 never transferred). If
// streamSimple throws synchronously, the stream ends with an error event.
//
// Refute: pool busy → stream hangs forever; or streamSimple's rejection is
// unhandled (crashes the process).
//
// Strategy: mock streamSimple to control its behavior (success, throw, hang).
// This lets us verify the fallback path without a real model API.
import { pathToFileURL } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import type {
  AssistantMessage,
  AssistantMessageEvent,
  AssistantMessageEventStreamContract,
  Context,
  Model,
  SimpleStreamOptions,
} from "../../llm/types.js";

// Track streamSimple calls so tests can assert the fallback was taken.
let streamSimpleCallCount = 0;
let streamSimpleMock:
  | ((
      model: Model,
      context: Context,
      options?: SimpleStreamOptions,
    ) => AssistantMessageEventStreamContract)
  | undefined;

// Mock streamSimple — the fallback path calls this directly.
vi.mock("../../llm/stream.js", () => ({
  streamSimple: (
    model: Model,
    context: Context,
    options?: SimpleStreamOptions,
  ): AssistantMessageEventStreamContract => {
    streamSimpleCallCount++;
    if (streamSimpleMock) {
      return streamSimpleMock(model, context, options);
    }
    // Default: return an empty stream that immediately ends with "done".
    return makeMockStream([{ type: "done", reason: "stop", message: makeMessage(model) }]);
  },
}));

// Import AFTER mocking. vi.mock is hoisted by vitest.
import { WorkerModelExecutionPort } from "./model-execution-worker.js";

const workerUrl = pathToFileURL(new URL("./test-model-worker.ts", import.meta.url).pathname);

const testModel: Model = {
  api: "openai",
  provider: "openai",
  id: "test-model",
  name: "Test Model",
  contextWindow: 4096,
  maxTokens: 2048,
} as unknown as Model;

const testContext = {
  systemPrompt: "You are a test assistant.",
  messages: [{ role: "user" as const, content: "Hello", timestamp: Date.now() }],
};

const ports: WorkerModelExecutionPort[] = [];

function makeMessage(model: Model): AssistantMessage {
  return {
    role: "assistant",
    content: [{ type: "text", text: "fallback response" }],
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
    stopReason: "stop",
    timestamp: Date.now(),
  };
}

function makeMockStream(events: AssistantMessageEvent[]): AssistantMessageEventStreamContract {
  const queue = [...events];
  return {
    async *[Symbol.asyncIterator]() {
      while (queue.length > 0) {
        yield queue.shift()!;
      }
    },
    result: async () => makeMessage(testModel),
  } as unknown as AssistantMessageEventStreamContract;
}

afterEach(async () => {
  streamSimpleMock = undefined;
  streamSimpleCallCount = 0;
  for (const p of ports.splice(0)) {
    await p.terminate();
  }
});

describe("WorkerModelExecutionPort — graceful degradation (3a-5)", () => {
  it("falls back to streamSimple when pool is busy (stream ends, never hangs)", async () => {
    const port = new WorkerModelExecutionPort({
      workerUrl,
      poolSize: 1,
      queueDepth: 1,
      timeoutMs: 5_000,
    });
    ports.push(port);

    // Occupy the worker (delay 2000ms).
    const stream1 = port.stream(testModel, testContext, {
      timeoutMs: 2000,
    } as SimpleStreamOptions);
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Second request: pool busy → fallback to streamSimple (mocked).
    const stream2 = port.stream(testModel, testContext, {} as SimpleStreamOptions);

    const events: string[] = [];
    for await (const event of stream2) {
      events.push(event.type);
    }

    // The fallback stream should end with "done" (mocked streamSimple).
    expect(events.at(-1)).toBe("done");
    // streamSimple was called (fallback path taken).
    expect(streamSimpleCallCount).toBe(1);

    for await (const _event of stream1) {
      // drain
    }
  }, 10_000);

  it("fallback stream produces events from streamSimple (not the worker)", async () => {
    // Mock streamSimple to return a known event with "FALLBACK" text.
    streamSimpleMock = () =>
      makeMockStream([
        { type: "text_delta", contentIndex: 0, delta: "FALLBACK", partial: makeMessage(testModel) },
        { type: "done", reason: "stop", message: makeMessage(testModel) },
      ]);

    const port = new WorkerModelExecutionPort({
      workerUrl,
      poolSize: 1,
      queueDepth: 1,
      timeoutMs: 5_000,
    });
    ports.push(port);

    // Occupy the worker.
    const stream1 = port.stream(testModel, testContext, {
      timeoutMs: 2000,
    } as SimpleStreamOptions);
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Second request: busy → fallback.
    const stream2 = port.stream(testModel, testContext, {} as SimpleStreamOptions);

    let fallbackText = "";
    for await (const event of stream2) {
      if (event.type === "text_delta" && "delta" in event) {
        fallbackText += event.delta;
      }
    }

    // The text should be "FALLBACK" (from mocked streamSimple), NOT
    // "Hello from test worker" (from the test-model-worker).
    expect(fallbackText).toBe("FALLBACK");
    expect(streamSimpleCallCount).toBe(1);

    for await (const _event of stream1) {
      // drain
    }
  }, 10_000);

  it("synchronous streamSimple throw ends the stream with an error event", async () => {
    // Mock streamSimple to throw synchronously.
    streamSimpleMock = () => {
      throw new Error("streamSimple sync failure");
    };

    const port = new WorkerModelExecutionPort({
      workerUrl,
      poolSize: 1,
      queueDepth: 1,
      timeoutMs: 5_000,
    });
    ports.push(port);

    // Occupy the worker.
    const stream1 = port.stream(testModel, testContext, {
      timeoutMs: 2000,
    } as SimpleStreamOptions);
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Second request: busy → fallback → streamSimple throws.
    const stream2 = port.stream(testModel, testContext, {} as SimpleStreamOptions);

    const events: string[] = [];
    for await (const event of stream2) {
      events.push(event.type);
    }

    // Should end with "error" (sync throw caught → error event).
    expect(events.at(-1)).toBe("error");
    expect(streamSimpleCallCount).toBe(1);

    for await (const _event of stream1) {
      // drain
    }
  }, 10_000);

  it("multiple concurrent busy requests all degrade gracefully", async () => {
    const port = new WorkerModelExecutionPort({
      workerUrl,
      poolSize: 1,
      queueDepth: 1,
      timeoutMs: 5_000,
    });
    ports.push(port);

    // Occupy the worker.
    const stream1 = port.stream(testModel, testContext, {
      timeoutMs: 2000,
    } as SimpleStreamOptions);
    await new Promise((resolve) => setTimeout(resolve, 50));

    // 3 concurrent fallback requests — all should complete via streamSimple.
    const streams = [1, 2, 3].map(() =>
      port.stream(testModel, testContext, {} as SimpleStreamOptions),
    );

    const results = await Promise.all(
      streams.map(async (s) => {
        const events: string[] = [];
        for await (const event of s) {
          events.push(event.type);
        }
        return events.at(-1) ?? "empty";
      }),
    );

    // All 3 should end with "done" (mocked streamSimple default).
    for (const last of results) {
      expect(last).toBe("done");
    }
    // streamSimple was called 3 times (all 3 fell back).
    expect(streamSimpleCallCount).toBe(3);

    for await (const _event of stream1) {
      // drain
    }
  }, 10_000);
});
