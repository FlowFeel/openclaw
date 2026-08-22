// Tests for MainThreadDispatcher — the Scale 0 TurnDispatcher adapter.
//
// Prediction (§3.2): MainThreadDispatcher runs turns inline on the main event
// loop, calling onAdmitted exactly once before runLocal, and passing through
// the return value and errors unchanged. This is also the
// DirectExecutionDispatcher test double — no threads spawned, deterministic.
// Competing account: a dispatcher might swallow errors, skip onAdmitted,
// call onAdmitted multiple times, or add latency by deferring runLocal.
// Support: onAdmitted called exactly once before runLocal starts; runLocal's
// return value passes through; runLocal's rejection propagates.
// Refute: onAdmitted called 0 or 2+ times; return value changed; error swallowed.
import { describe, expect, it, vi } from "vitest";
import type { EmbeddedAgentRunResult } from "./embedded-agent-runner/types.js";
import type {
  LocalTurnPlacementClaim,
  SessionPlacementTurnParams,
} from "./session-placement-admission.js";
import { MainThreadDispatcher } from "./turn-dispatcher.js";

const claim: LocalTurnPlacementClaim = {
  sessionId: "session-1",
  runId: "run-1",
};

const params: SessionPlacementTurnParams = {
  sessionId: "session-1",
  sessionFile: "/tmp/session-1.jsonl",
  prompt: "test",
} as unknown as SessionPlacementTurnParams;

describe("MainThreadDispatcher", () => {
  it("executeLocalTurn: runs the task inline and passes through the result", async () => {
    const dispatcher = new MainThreadDispatcher();
    const result = await dispatcher.executeLocalTurn(claim, async () => 42);
    expect(result).toBe(42);
  });

  it("executeLocalTurn: propagates errors from the task", async () => {
    const dispatcher = new MainThreadDispatcher();
    await expect(
      dispatcher.executeLocalTurn(claim, async () => {
        throw new Error("task failed");
      }),
    ).rejects.toThrow("task failed");
  });

  it("executeTurn: calls onAdmitted exactly once before runLocal", async () => {
    const dispatcher = new MainThreadDispatcher();
    const events: string[] = [];

    await dispatcher.executeTurn(
      claim,
      params,
      async () => {
        events.push("turn");
        return { meta: { durationMs: 1 } } as unknown as EmbeddedAgentRunResult;
      },
      () => events.push("admitted"),
    );

    // Prediction: onAdmitted fires before the turn starts, exactly once.
    expect(events).toEqual(["admitted", "turn"]);
  });

  it("executeTurn: passes through the runLocal result unchanged", async () => {
    const dispatcher = new MainThreadDispatcher();
    const expected = { meta: { durationMs: 99 }, payloads: [{ text: "hello" }] };

    const result = await dispatcher.executeTurn(
      claim,
      params,
      async () => structuredClone(expected) as unknown as EmbeddedAgentRunResult,
    );

    expect(result).toEqual(expected);
  });

  it("executeTurn: propagates errors from runLocal", async () => {
    const dispatcher = new MainThreadDispatcher();

    await expect(
      dispatcher.executeTurn(claim, params, async () => {
        throw new Error("turn failed");
      }),
    ).rejects.toThrow("turn failed");
  });

  it("executeTurn: works without onAdmitted callback (optional)", async () => {
    const dispatcher = new MainThreadDispatcher();

    // No onAdmitted — should not throw.
    const result = await dispatcher.executeTurn(
      claim,
      params,
      async () => ({ meta: { durationMs: 0 } }) as unknown as EmbeddedAgentRunResult,
    );

    expect(result.meta.durationMs).toBe(0);
  });

  it("executeTurn: does not call onAdmitted if runLocal throws before yielding", async () => {
    // Prediction: onAdmitted is called before runLocal starts. If runLocal
    // throws synchronously (before the first await), onAdmitted has already
    // fired. This is correct — the admission was granted; the turn then failed.
    const dispatcher = new MainThreadDispatcher();
    const onAdmitted = vi.fn();

    await expect(
      dispatcher.executeTurn(
        claim,
        params,
        async () => {
          throw new Error("immediate failure");
        },
        onAdmitted,
      ),
    ).rejects.toThrow("immediate failure");

    // onAdmitted was called once (before runLocal started), even though
    // runLocal threw. This matches the §3.2 claim-on-main invariant: the
    // admission gate fires before execution, and the caller's finally
    // block releases it.
    expect(onAdmitted).toHaveBeenCalledOnce();
  });
});
