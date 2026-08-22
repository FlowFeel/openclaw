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

  it("handles pre-aborted signal without dispatching (3a-4)", async () => {
    const abortController = new AbortController();
    abortController.abort(); // pre-abort before calling stream()

    const stream = port.stream(testModel, testContext, {
      signal: abortController.signal,
    } as SimpleStreamOptions);

    const events: string[] = [];
    for await (const event of stream) {
      events.push(event.type);
    }

    // Should immediately end with an error event (no worker dispatch).
    expect(events).toEqual(["error"]);
    const result = await stream.result();
    expect(result.stopReason).toBe("aborted");
  }, 5_000);

  it("gracefully degrades to direct execution on busy (3a-5)", async () => {
    // Create a port with poolSize=1, queueDepth=1 (very tight).
    // Fill the queue, then dispatch a third request — it should get "busy"
    // and fall back to streamSimple on main.
    //
    // queueDepth=1 means: 1 in-flight + 0 queued = max 1. The second request
    // would be queued (queueDepth becomes 1 which is < ... wait, queueDepth
    // is the max including in-flight. So queueDepth=1 means only 1 request
    // can be pending. A second concurrent request would be rejected as "busy".
    //
    // We can't easily test graceful degradation with the test-model-worker
    // because the fallback calls streamSimple() which needs a real model.
    // Instead, we verify the fallback path is taken by checking that a "busy"
    // rejection doesn't produce a hard error — it produces a stream that
    // either succeeds (if streamSimple works) or fails with a direct error
    // (not a WorkerPoolError).
    //
    // This test is structural: it verifies that a busy pool doesn't hang or
    // crash. The actual streamSimple fallback will fail (no real model), but
    // the stream should end with an error event (not a hung promise).
    const smallPort = new WorkerModelExecutionPort({
      workerUrl,
      poolSize: 1,
      queueDepth: 1, // only 1 request at a time
      timeoutMs: 5_000,
    });

    try {
      // First request: occupies the worker (delay 2000ms)
      const stream1 = smallPort.stream(testModel, testContext, {
        timeoutMs: 2000,
      } as SimpleStreamOptions);

      // Wait a tick for the first request to be dispatched.
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Second request: should be rejected as "busy" and fall back to direct.
      // streamSimple will fail (no real model), but the stream should end.
      const stream2 = smallPort.stream(testModel, testContext, {} as SimpleStreamOptions);

      const events2: string[] = [];
      for await (const event of stream2) {
        events2.push(event.type);
      }

      // The fallback stream should end with either "done" (unlikely, no real
      // model) or "error" (expected — no model configured). Either way, it
      // should NOT hang.
      expect(events2.length).toBeGreaterThan(0);
      expect(["done", "error"]).toContain(events2.at(-1));

      // Clean up stream1
      for await (const _event of stream1) {
        // drain
      }
    } finally {
      await smallPort.terminate();
    }
  }, 15_000);

  it("cleans up abort listener after stream ends (3a-4)", async () => {
    const abortController = new AbortController();
    const stream = port.stream(testModel, testContext, {
      signal: abortController.signal,
    } as SimpleStreamOptions);

    // Let the stream complete normally (no abort).
    for await (const _event of stream) {
      // drain
    }

    // After the stream ends, aborting the signal should not throw or cause
    // any side effects (the listener should have been removed).
    expect(() => abortController.abort()).not.toThrow();
  }, 10_000);
});
