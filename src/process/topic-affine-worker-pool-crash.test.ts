// Fault injection tests for TopicAffineWorkerPool — crash recovery.
//
// Prediction (§3.2 + §7.2): when a worker dies mid-request, the pool's
// 'exit'/'error' handler rejects all pending requests with code "unavailable",
// and the next dispatch to that worker slot respawns a fresh worker.
// Competing account: a crash might hang pending requests forever (no exit
// handler), or permanently break the pool (no respawn).
// Support: crash mid-dispatch → dispatch rejects with "unavailable"; next
// dispatch succeeds (worker respawned). terminateAll mid-dispatch → rejects
// with "unavailable". Timeout → rejects with "timeout".
// Refute: dispatch hangs after crash; pool permanently broken; pending
// requests never reject.
import { pathToFileURL } from "node:url";
import { afterAll, describe, expect, it } from "vitest";
import { TopicAffineWorkerPool, WorkerPoolError } from "./topic-affine-worker-pool.js";

const workerUrl = pathToFileURL(new URL("./test-echo-worker.ts", import.meta.url).pathname);

describe("TopicAffineWorkerPool — crash recovery", () => {
  let pool: TopicAffineWorkerPool<string>;

  afterAll(async () => {
    if (pool) {
      await pool.terminateAll();
    }
  });

  it("rejects pending requests with 'unavailable' when the worker crashes", async () => {
    pool = new TopicAffineWorkerPool<string>({
      workerUrl,
      poolSize: 1,
      queueDepth: 4,
      timeoutMs: 10_000,
    });

    // Dispatch a crash request — the worker will process.exit(1) immediately.
    // The pending request should be rejected with code "unavailable".
    await expect(pool.dispatch("topic-crash", { crash: true })).rejects.toMatchObject({
      code: "unavailable",
    });
  });

  it("recovers on the next dispatch after a crash (worker respawned)", async () => {
    // After the crash above, the pool should respawn a worker for the next
    // request to the same topic slot.
    const result = await pool.dispatch("topic-recover", { echo: "recovered" });
    expect(result).toBe("recovered");
  });

  it("crash mid-delay rejects the delayed request (not just the crash request)", async () => {
    // Two requests to the same topic (same worker):
    // 1. A delayed request (in-flight, pending)
    // 2. A crash request (arrives while #1 is pending)
    // Both should reject — the crash kills the worker, rejecting all pending.
    const crashPool = new TopicAffineWorkerPool<string>({
      workerUrl,
      poolSize: 1,
      queueDepth: 4,
      timeoutMs: 10_000,
    });

    try {
      // Start a slow request (delay 2000ms)
      const slow = crashPool.dispatch("topic-concurrent", { echo: "slow", delay: 2000 });

      // Give the worker time to start the delay, then crash it.
      await new Promise((resolve) => setTimeout(resolve, 50));
      const crash = crashPool.dispatch("topic-concurrent", { crash: true });

      // Both should reject with "unavailable".
      await expect(slow).rejects.toMatchObject({ code: "unavailable" });
      await expect(crash).rejects.toMatchObject({ code: "unavailable" });
    } finally {
      await crashPool.terminateAll();
    }
  });

  it("terminateAll rejects all pending requests with 'unavailable'", async () => {
    const termPool = new TopicAffineWorkerPool<string>({
      workerUrl,
      poolSize: 1,
      queueDepth: 4,
      timeoutMs: 10_000,
    });

    // Start a slow request (delay 2000ms), then terminate.
    const slow = termPool.dispatch("topic-term", { echo: "slow", delay: 2000 });

    await new Promise((resolve) => setTimeout(resolve, 50));
    await termPool.terminateAll();

    await expect(slow).rejects.toMatchObject({ code: "unavailable" });
  });

  it("rejects with 'timeout' when the worker doesn't respond in time", async () => {
    const timeoutPool = new TopicAffineWorkerPool<string>({
      workerUrl,
      poolSize: 1,
      queueDepth: 4,
      timeoutMs: 50, // very short timeout
    });

    try {
      // Delay 2000ms but timeout is 50ms → should reject after ~50ms.
      await expect(
        timeoutPool.dispatch("topic-timeout", { echo: "late", delay: 2000 }),
      ).rejects.toMatchObject({ code: "timeout" });
    } finally {
      await timeoutPool.terminateAll();
    }
  });

  it("stale responses from timed-out requests are ignored", async () => {
    // When a request times out, its seq is removed from pending. If the
    // worker later responds with that seq, the response should be ignored
    // (not crash or resolve an already-rejected promise).
    const stalePool = new TopicAffineWorkerPool<string>({
      workerUrl,
      poolSize: 1,
      queueDepth: 4,
      timeoutMs: 50,
    });

    try {
      // This request will time out (50ms timeout, 200ms delay).
      await expect(
        stalePool.dispatch("topic-stale", { echo: "late", delay: 200 }),
      ).rejects.toMatchObject({ code: "timeout" });

      // Wait for the stale response to arrive (200ms delay).
      await new Promise((resolve) => setTimeout(resolve, 300));

      // The pool should still be usable — the stale response didn't break it.
      const result = await stalePool.dispatch("topic-stale-next", { echo: "ok" });
      expect(result).toBe("ok");
    } finally {
      await stalePool.terminateAll();
    }
  });

  it("WorkerPoolError preserves the code for distinct recovery strategies", async () => {
    // The 4 codes (busy/timeout/unavailable/failed) must be distinguishable
    // so callers can apply different recovery strategies (e.g. "busy" →
    // fallback, "timeout" → retry, "unavailable" → respawn).
    const busyPool = new TopicAffineWorkerPool<string>({
      workerUrl,
      poolSize: 1,
      queueDepth: 1,
      timeoutMs: 10_000,
    });

    try {
      // Fill the queue, then dispatch a third to get "busy".
      const slow = busyPool.dispatch("topic-busy", { echo: "slow", delay: 500 });
      await new Promise((resolve) => setTimeout(resolve, 30));

      let busyError: WorkerPoolError | undefined;
      try {
        await busyPool.dispatch("topic-busy", { echo: "rejected" });
      } catch (e) {
        busyError = e as WorkerPoolError;
      }

      expect(busyError).toBeInstanceOf(WorkerPoolError);
      expect(busyError?.code).toBe("busy");

      await slow; // drain
    } finally {
      await busyPool.terminateAll();
    }
  });
});
