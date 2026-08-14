// Contract tests: TurnDispatcher ≡ SessionPlacementAdmissionProvider.
//
// Prediction (1c — Priority 1 fix): TurnDispatcher and
// SessionPlacementAdmissionProvider are structurally identical. A
// TurnDispatcher instance (MainThreadDispatcher, WorkerPoolDispatcher)
// satisfies SessionPlacementAdmissionProvider directly — no adapter wrapper
// needed. This is why runtime-setup.ts installs a TurnDispatcher via
// installSessionPlacementAdmissionProvider(dispatcher) directly.
//
// Competing account: if the types diverge (e.g. different method signatures),
// the canonical wiring would fail to typecheck, requiring an adapter.
//
// Support: a TurnDispatcher can be assigned to a
// SessionPlacementAdmissionProvider variable (structural typing); installing
// a MainThreadDispatcher as the admission provider works end-to-end;
// withSessionPlacementTurnAdmission delegates to it.
//
// Refute: assignment fails to typecheck; provider not called; adapter needed.
import { afterEach, describe, expect, it } from "vitest";
import type { EmbeddedAgentRunResult } from "./embedded-agent-runner/types.js";
import {
  installSessionPlacementAdmissionProvider,
  withSessionPlacementTurnAdmission,
  type SessionPlacementAdmissionProvider,
} from "./session-placement-admission.js";
import { MainThreadDispatcher, type TurnDispatcher } from "./turn-dispatcher.js";
import { WorkerPoolDispatcher } from "./worker-pool-dispatcher.js";

let uninstall: (() => void) | undefined;

afterEach(() => {
  uninstall?.();
  uninstall = undefined;
});

describe("TurnDispatcher ≡ SessionPlacementAdmissionProvider (structural typing)", () => {
  it("a TurnDispatcher satisfies SessionPlacementAdmissionProvider", () => {
    // This assignment typechecks only if the types are structurally identical.
    // If they diverge, tsgo would reject this file.
    const dispatcher: TurnDispatcher = new MainThreadDispatcher();
    const provider: SessionPlacementAdmissionProvider = dispatcher;

    expect(provider.executeTurn).toBe(dispatcher.executeTurn);
    expect(provider.executeLocalTurn).toBe(dispatcher.executeLocalTurn);
  });

  it("MainThreadDispatcher installs as the admission provider (no adapter)", async () => {
    // This is exactly what runtime-setup.ts does at Scale 0 fallback:
    // installSessionPlacementAdmissionProvider(new MainThreadDispatcher()).
    const dispatcher = new MainThreadDispatcher();
    uninstall = installSessionPlacementAdmissionProvider(dispatcher);

    const events: string[] = [];
    await withSessionPlacementTurnAdmission(
      { sessionId: "s1", runId: "r1" },
      { sessionId: "s1", sessionFile: "/tmp/s1.jsonl", prompt: "test" } as never,
      async () => {
        events.push("turn");
        return { meta: { durationMs: 0 } } as unknown as EmbeddedAgentRunResult;
      },
      () => events.push("admitted"),
    );

    // The dispatcher's executeTurn was called (via the provider interface).
    expect(events).toEqual(["admitted", "turn"]);
  });

  it("WorkerPoolDispatcher installs as the admission provider (no adapter)", async () => {
    // This is what runtime-setup.ts does at Scale 1:
    // installSessionPlacementAdmissionProvider(new WorkerPoolDispatcher(...)).
    const dispatcher = new WorkerPoolDispatcher({ poolSize: 2 });
    uninstall = installSessionPlacementAdmissionProvider(dispatcher);

    const events: string[] = [];
    await withSessionPlacementTurnAdmission(
      { sessionId: "s2", runId: "r2" },
      { sessionId: "s2", sessionFile: "/tmp/s2.jsonl", prompt: "test" } as never,
      async () => {
        events.push("turn");
        return { meta: { durationMs: 0 } } as unknown as EmbeddedAgentRunResult;
      },
      () => events.push("admitted"),
    );

    // Scale 1 partial: delegates to MainThreadDispatcher internally.
    expect(events).toEqual(["admitted", "turn"]);

    await dispatcher.terminate();
  });
});
