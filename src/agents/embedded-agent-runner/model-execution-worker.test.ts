// Tests for WorkerModelExecutionPort — streaming model execution via worker pool.
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

describe("WorkerModelExecutionPort", () => {
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

  it("streams events in order and resolves result()", async () => {
    const stream = port.stream(testModel, testContext, {} as SimpleStreamOptions);

    const events: string[] = [];
    for await (const event of stream) {
      events.push(event.type);
    }

    // Events should arrive in order, ending with "done"
    expect(events).toEqual(["start", "text_start", "text_delta", "text_end", "done"]);

    // result() should resolve with the final assistant message
    const result = await stream.result();
    expect(result.role).toBe("assistant");
    expect(result.stopReason).toBe("stop");
  }, 10_000);

  it("handles concurrent dispatches to different topics", async () => {
    const stream1 = port.stream(testModel, testContext, {} as SimpleStreamOptions);
    const stream2 = port.stream(testModel, testContext, {} as SimpleStreamOptions);

    const [events1, events2] = await Promise.all([
      (async () => {
        const evts: string[] = [];
        for await (const event of stream1) {
          evts.push(event.type);
        }
        return evts;
      })(),
      (async () => {
        const evts: string[] = [];
        for await (const event of stream2) {
          evts.push(event.type);
        }
        return evts;
      })(),
    ]);

    expect(events1.at(-1)).toBe("done");
    expect(events2.at(-1)).toBe("done");
  }, 10_000);

  it("propagates abort to the worker", async () => {
    const abortController = new AbortController();
    const stream = port.stream(testModel, testContext, {
      signal: abortController.signal,
      timeoutMs: 500, // tell the test worker to delay 500ms
    } as SimpleStreamOptions);

    // Abort after 50ms (before the 500ms delay completes)
    setTimeout(() => abortController.abort(), 50);

    const events: string[] = [];
    for await (const event of stream) {
      events.push(event.type);
    }

    // The worker should receive the abort and send an error event
    expect(events).toContain("error");
    const result = await stream.result();
    expect(result.stopReason).toBe("aborted");
  }, 10_000);

  it("recovers after a worker failure (next request respawns)", async () => {
    // After the abort test, the worker may have been replaced.
    // A new request should still work.
    const stream = port.stream(testModel, testContext, {} as SimpleStreamOptions);

    const events: string[] = [];
    for await (const event of stream) {
      events.push(event.type);
    }

    expect(events.at(-1)).toBe("done");
  }, 10_000);
});
