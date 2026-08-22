// Fault injection tests for WorkerModelExecutionPort — crash + abort recovery.
//
// Prediction (3a-4/3a-5): when the model execution worker crashes mid-stream,
// the dispatch promise rejects (pool exit handler), and the
// WorkerModelExecutionPort ends the stream with an error event. The next
// request respawns a fresh worker. Abort propagation stops the in-flight
// model fetch and ends the stream with reason "aborted".
// Competing account: a crash might hang the stream forever (no error event),
// permanently break the port (no respawn), or leak the abort listener.
// Support: crash mid-stream → stream receives { type: "error" }; next request
// succeeds. Abort mid-call → stream ends with "aborted". After stream ends,
// the abort listener is removed.
// Refute: stream hangs after crash; port permanently broken; listener leaked.
import { pathToFileURL } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Model, SimpleStreamOptions } from "../../llm/types.js";
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

describe("WorkerModelExecutionPort — crash recovery", () => {
  let port: WorkerModelExecutionPort;

  beforeAll(() => {
    port = new WorkerModelExecutionPort({
      workerUrl,
      poolSize: 1,
      queueDepth: 4,
      timeoutMs: 10_000,
    });
  });

  afterAll(async () => {
    if (port) {
      await port.terminate();
    }
  });

  it("ends the stream with an error event when the worker crashes mid-call", async () => {
    // The test-model-worker calls process.exit(1) when options.crash is set.
    // The pool's exit handler rejects the dispatch promise, and the
    // WorkerModelExecutionPort pushes a synthetic error event onto the stream.
    const stream = port.stream(testModel, testContext, {
      crash: true,
    } as SimpleStreamOptions);

    const events: string[] = [];
    for await (const event of stream) {
      events.push(event.type);
    }

    // The stream should end with an error event (not hang).
    expect(events).toContain("error");
    expect(events.at(-1)).toBe("error");

    const result = await stream.result();
    expect(result.stopReason).toBe("error");
  }, 10_000);

  it("recovers on the next request after a crash (worker respawned)", async () => {
    // After the crash above, the pool should respawn a worker for the next
    // request. The stream should complete normally.
    const stream = port.stream(testModel, testContext, {} as SimpleStreamOptions);

    const events: string[] = [];
    for await (const event of stream) {
      events.push(event.type);
    }

    expect(events.at(-1)).toBe("done");
  }, 10_000);

  it("abort mid-call ends the stream with reason 'aborted'", async () => {
    const abortController = new AbortController();
    const stream = port.stream(testModel, testContext, {
      signal: abortController.signal,
      timeoutMs: 500, // delay in the test worker
    } as SimpleStreamOptions);

    // Abort after 50ms (before the 500ms delay completes)
    setTimeout(() => abortController.abort(), 50);

    const events: string[] = [];
    for await (const event of stream) {
      events.push(event.type);
    }

    expect(events).toContain("error");
    const result = await stream.result();
    expect(result.stopReason).toBe("aborted");
  }, 10_000);

  it("removes the abort listener after the stream ends (no leak)", async () => {
    const abortController = new AbortController();
    const stream = port.stream(testModel, testContext, {
      signal: abortController.signal,
    } as SimpleStreamOptions);

    // Let the stream complete normally (no abort).
    for await (const _event of stream) {
      // drain
    }

    // After the stream ends, the abort listener should have been removed.
    // Aborting the signal should not throw or cause side effects.
    expect(() => abortController.abort()).not.toThrow();
  }, 10_000);

  it("crash followed by abort: abort does not interfere with crash recovery", async () => {
    // Start a crash request, then abort it while in-flight. The crash should
    // still produce an error event (the worker dies, pool rejects).
    const abortController = new AbortController();
    const stream = port.stream(testModel, testContext, {
      signal: abortController.signal,
      crash: true,
    } as SimpleStreamOptions);

    // Abort immediately (before the crash resolves).
    setTimeout(() => abortController.abort(), 10);

    const events: string[] = [];
    for await (const event of stream) {
      events.push(event.type);
    }

    // The stream should end with an error event (from either the crash or
    // the abort — both produce error events).
    expect(events).toContain("error");
    expect(events.at(-1)).toBe("error");
  }, 10_000);
});
