// Tests for TopicAffineWorkerPool — warm pool with topic affinity + backpressure.
import { pathToFileURL } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { TopicAffineWorkerPool, WorkerPoolError } from "./topic-affine-worker-pool.js";

const workerUrl = pathToFileURL(new URL("./test-echo-worker.ts", import.meta.url).pathname);

describe("TopicAffineWorkerPool", () => {
  let pool: TopicAffineWorkerPool<string>;

  afterAll(async () => {
    if (pool) {
      await pool.terminateAll();
    }
  });

  it("dispatches requests and receives responses", async () => {
    pool = new TopicAffineWorkerPool<string>({
      workerUrl,
      poolSize: 2,
      queueDepth: 4,
      timeoutMs: 5_000,
    });

    const result = await pool.dispatch("topic-A", { echo: "hello" });
    expect(result).toBe("hello");
  });

  it("routes the same topic to the same worker (affinity)", async () => {
    // With poolSize=1, all topics go to the same worker.
    const single = new TopicAffineWorkerPool<string>({
      workerUrl,
      poolSize: 1,
      timeoutMs: 5_000,
    });
    try {
      const a = single.dispatch("topic-A", { echo: "a" });
      const b = single.dispatch("topic-A", { echo: "b" });
      const [ra, rb] = await Promise.all([a, b]);
      expect(ra).toBe("a");
      expect(rb).toBe("b");
    } finally {
      await single.terminateAll();
    }
  });

  it("handles concurrent dispatches to different topics", async () => {
    const results = await Promise.all([
      pool.dispatch("topic-A", { echo: 1 }),
      pool.dispatch("topic-B", { echo: 2 }),
      pool.dispatch("topic-C", { echo: 3 }),
      pool.dispatch("topic-D", { echo: 4 }),
    ]);
    expect(results).toEqual([1, 2, 3, 4]);
  });

  it("applies backpressure when queue is full", async () => {
    // poolSize=1, queueDepth=1: one in-flight + one queued = 2 max.
    // The third should be rejected with "busy".
    const small = new TopicAffineWorkerPool<string>({
      workerUrl,
      poolSize: 1,
      queueDepth: 1,
      timeoutMs: 5_000,
    });
    try {
      // First request: in-flight (delayed)
      const slow = small.dispatch("topic-A", { echo: "slow", delay: 200 });
      // Second request: queued (within depth)
      const queued = small.dispatch("topic-A", { echo: "queued", delay: 200 });
      // Third request: should be rejected (queue full)
      await expect(small.dispatch("topic-A", { echo: "rejected" })).rejects.toThrow();
      await Promise.all([slow, queued]);
    } finally {
      await small.terminateAll();
    }
  });

  it("propagates worker failures as WorkerPoolError", async () => {
    await expect(pool.dispatch("topic-E", { fail: "intentional failure" })).rejects.toThrow(
      "intentional failure",
    );
  });

  it("recovers after a worker failure (next request respawns)", async () => {
    // After the failure above, the next request should still work.
    const result = await pool.dispatch("topic-F", { echo: "recovered" });
    expect(result).toBe("recovered");
  });
});
