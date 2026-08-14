// Tests for WorkerPoolDispatcher — the Scale 1 TurnDispatcher adapter.
//
// Prediction (§3.1 + Phase 3): WorkerPoolDispatcher implements TurnDispatcher.
// When no workerUrl is given (Scale 1 partial), no pool is created — the
// dispatcher delegates all turn execution to MainThreadDispatcher inline.
// When a workerUrl IS given, the pool is created eagerly at construction
// time (warm pool). terminate() terminates the pool (or is a no-op when null).
//
// Competing account: the dispatcher might create a pool even without a URL
// (crash on null), or defer pool creation lazily (first-request latency),
// or fail to terminate the pool on shutdown (leak).
//
// Support: no workerUrl → pool is null, executeTurn delegates to main;
// workerUrl given → pool is non-null immediately after construction;
// terminate() terminates the pool; executeLocalTurn delegates to main.
//
// Refute: no workerUrl → pool created (crash); workerUrl → pool null;
// terminate() → pool not terminated (leak).
import { pathToFileURL } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import type { EmbeddedAgentRunResult } from "./embedded-agent-runner/types.js";
import type {
  LocalTurnPlacementClaim,
  SessionPlacementTurnParams,
} from "./session-placement-admission.js";
import { WorkerPoolDispatcher } from "./worker-pool-dispatcher.js";

const echoWorkerUrl = pathToFileURL(
  new URL("../process/test-echo-worker.ts", import.meta.url).pathname,
);

const claim: LocalTurnPlacementClaim = {
  sessionId: "session-1",
  runId: "run-1",
};

const params: SessionPlacementTurnParams = {
  sessionId: "session-1",
  sessionFile: "/tmp/session-1.jsonl",
  prompt: "test",
} as unknown as SessionPlacementTurnParams;

const dispatchers: WorkerPoolDispatcher[] = [];

afterEach(async () => {
  for (const d of dispatchers.splice(0)) {
    await d.terminate();
  }
});

describe("WorkerPoolDispatcher (no workerUrl — Scale 1 partial)", () => {
  it("does not create a pool when workerUrl is omitted", () => {
    const dispatcher = new WorkerPoolDispatcher({ poolSize: 4 });
    dispatchers.push(dispatcher);

    // Prediction: Scale 1 partial = no pool, pure MainThreadDispatcher wrapper.
    expect(dispatcher.pool).toBeNull();
  });

  it("executeTurn delegates to MainThreadDispatcher (inline)", async () => {
    const dispatcher = new WorkerPoolDispatcher({ poolSize: 4 });
    dispatchers.push(dispatcher);

    const events: string[] = [];
    const result = await dispatcher.executeTurn(
      claim,
      params,
      async () => {
        events.push("turn");
        return { meta: { durationMs: 1 } } as unknown as EmbeddedAgentRunResult;
      },
      () => events.push("admitted"),
    );

    // Delegates to main: onAdmitted fires before turn, exactly once.
    expect(events).toEqual(["admitted", "turn"]);
    expect(result.meta.durationMs).toBe(1);
  });

  it("executeLocalTurn delegates to MainThreadDispatcher (inline)", async () => {
    const dispatcher = new WorkerPoolDispatcher({ poolSize: 4 });
    dispatchers.push(dispatcher);

    const result = await dispatcher.executeLocalTurn(claim, async () => 42);
    expect(result).toBe(42);
  });

  it("terminate() is a no-op when pool is null", async () => {
    const dispatcher = new WorkerPoolDispatcher({ poolSize: 4 });
    dispatchers.push(dispatcher);

    // Should not throw — pool is null, terminate is a no-op.
    await expect(dispatcher.terminate()).resolves.toBeUndefined();
  });
});

describe("WorkerPoolDispatcher (with workerUrl — pool created eagerly)", () => {
  it("creates the pool eagerly at construction time", () => {
    const dispatcher = new WorkerPoolDispatcher({
      workerUrl: echoWorkerUrl,
      poolSize: 2,
      queueDepth: 4,
    });
    dispatchers.push(dispatcher);

    // Prediction: pool is non-null immediately (warm, not lazy).
    // Competing account: lazy creation would leave pool null until first use.
    expect(dispatcher.pool).not.toBeNull();
  });

  it("executeTurn still delegates to MainThreadDispatcher (pool available but unused)", async () => {
    // Phase 3 (Scale 1 partial): the pool exists for subtask offload, but
    // turn execution still runs on main. Full turn dispatch is deferred.
    const dispatcher = new WorkerPoolDispatcher({
      workerUrl: echoWorkerUrl,
      poolSize: 2,
    });
    dispatchers.push(dispatcher);

    const events: string[] = [];
    await dispatcher.executeTurn(
      claim,
      params,
      async () => {
        events.push("turn");
        return { meta: { durationMs: 0 } } as unknown as EmbeddedAgentRunResult;
      },
      () => events.push("admitted"),
    );

    expect(events).toEqual(["admitted", "turn"]);
  });

  it("terminate() terminates the pool", async () => {
    const dispatcher = new WorkerPoolDispatcher({
      workerUrl: echoWorkerUrl,
      poolSize: 2,
    });

    expect(dispatcher.pool).not.toBeNull();

    // Warm the pool by dispatching a request (workers are created lazily
    // on first dispatch, not at construction time).
    await dispatcher.pool!.dispatch("warmup", { echo: "warm" });
    expect(dispatcher.pool!.aliveCount).toBeGreaterThan(0);

    await dispatcher.terminate();

    // After terminate, the pool's workers are gone.
    // (terminateAll clears the workers map.)
    expect(dispatcher.pool!.aliveCount).toBe(0);
  });
});
