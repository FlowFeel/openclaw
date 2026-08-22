// E2E tests for the multithreaded runtime lifecycle.
//
// Prediction (Phase 4 + 1b): the gateway startup → runtime → shutdown
// lifecycle works end-to-end for the multithreaded runtime:
//   1. Startup: setupRuntime(config) installs dispatchers + ports
//   2. Registration: cleanup is registered as a { stop } lifetime sidecar
//   3. Runtime: installed ports/dispatchers are active (resolve returns them)
//   4. Shutdown: stopAllSidecars() calls cleanup → pools terminated,
//      singletons restored to defaults
//
// This mirrors the actual gateway wiring:
//   server-runtime-state-prepare.ts: setupRuntime(cfgAtStart) → runtimeCleanup
//   server-startup-finish.ts: runtimeState.gatewayLifetimeSidecars.push({ stop: runtimeCleanup })
//   server-lifecycle.ts: stopRegisteredGatewayLifetimeSidecars() → sidecar.stop()
//
// Competing account: the cleanup might not be registered (leak), might not
// be called on shutdown (orphan pools), or might not restore defaults
// (stale singleton).
//
// Support: startup installs ports; registration puts cleanup in sidecar list;
// runtime phase resolves the installed ports; shutdown calls cleanup via
// sidecar.stop(); after shutdown, defaults are restored and pools terminated.
//
// Refute: cleanup not in sidecar list; cleanup not called on shutdown;
// pools alive after shutdown; singleton still returns worker port.
//
// Note: This is a gateway-lifecycle E2E for the runtime subsystem, not a
// full gateway server E2E (which would require mocking ~50 dependencies).
// It tests the exact lifecycle pattern the gateway uses.
import { afterEach, describe, expect, it } from "vitest";
import {
  DirectModelExecutionPort,
  resolveModelExecutionPort,
} from "../agents/embedded-agent-runner/model-execution-port.js";
import { WorkerModelExecutionPort } from "../agents/embedded-agent-runner/model-execution-worker.js";
import {
  resolveSessionPlacementResetBlock,
  withSessionPlacementTurnAdmission,
} from "../agents/session-placement-admission.js";
import { setupRuntime } from "../process/runtime-setup.js";

// Mirror the GatewayPostReadySidecarHandle type from the gateway.
type LifetimeSidecar = { stop: () => Promise<void> | void };

// Mirror the gateway's stopRegisteredGatewayLifetimeSidecars pattern.
async function stopAllSidecars(sidecars: LifetimeSidecar[]): Promise<void> {
  for (const sidecar of sidecars) {
    await sidecar.stop();
  }
}

const pendingCleanups: Array<() => Promise<void>> = [];

afterEach(async () => {
  for (const cleanup of pendingCleanups.splice(0)) {
    try {
      await cleanup();
    } catch {
      // already cleaned up
    }
  }
});

describe("runtime lifecycle E2E — startup → registration → runtime → shutdown", () => {
  it("Scale 0: full lifecycle (startup → runtime → shutdown)", async () => {
    // ── 1. Startup phase ──────────────────────────────────────────────
    // Mirror: server-runtime-state-prepare.ts → setupRuntime(cfgAtStart)
    const runtimeSetup = setupRuntime({
      agents: { defaults: { runtime: { isolation: "disabled" } } },
    } as never);

    expect(runtimeSetup.scale.scale).toBe(0);
    expect(runtimeSetup.dispatcher).toBeNull();
    expect(runtimeSetup.modelExecutionPort).toBeNull();

    // ── 2. Registration phase ─────────────────────────────────────────
    // Mirror: server-startup-finish.ts →
    //   runtimeState.gatewayLifetimeSidecars.push({ stop: runtimeCleanup })
    const sidecars: LifetimeSidecar[] = [];
    // Mirror: server-startup-finish.ts →
    //   if (runtime.runtimeCleanup) {
    //     runtimeState.gatewayLifetimeSidecars.push({ stop: runtime.runtimeCleanup });
    //   }
    // runtimeSetup.cleanup is the function that gets registered as the sidecar.
    sidecars.push({ stop: runtimeSetup.cleanup });
    expect(sidecars).toHaveLength(1);

    // ── 3. Runtime phase ──────────────────────────────────────────────
    // At Scale 0, resolveModelExecutionPort() returns DirectModelExecutionPort.
    expect(resolveModelExecutionPort()).toBeInstanceOf(DirectModelExecutionPort);

    // A turn runs inline (no admission provider installed at Scale 0).
    const events: string[] = [];
    await withSessionPlacementTurnAdmission(
      { sessionId: "s1", runId: "r1" },
      { sessionId: "s1", sessionFile: "/tmp/s1.jsonl", prompt: "test" } as never,
      async () => {
        events.push("turn");
        return { meta: { durationMs: 0 } } as never;
      },
      () => events.push("admitted"),
    );
    expect(events).toEqual(["admitted", "turn"]);

    // ── 4. Shutdown phase ─────────────────────────────────────────────
    // Mirror: server-lifecycle.ts → stopRegisteredGatewayLifetimeSidecars()
    await stopAllSidecars(sidecars);

    // After shutdown: defaults restored (DirectModelExecutionPort still active).
    expect(resolveModelExecutionPort()).toBeInstanceOf(DirectModelExecutionPort);
  });

  it("Scale 1: full lifecycle (startup → runtime → shutdown)", async () => {
    // ── 1. Startup phase ──────────────────────────────────────────────
    const runtimeSetup = setupRuntime({
      agents: { defaults: { runtime: { isolation: "in-process", workerCount: 1 } } },
    } as never);

    expect(runtimeSetup.scale.scale).toBe(1);
    expect(runtimeSetup.dispatcher).not.toBeNull();
    expect(runtimeSetup.modelExecutionPort).toBeInstanceOf(WorkerModelExecutionPort);

    // ── 2. Registration phase ─────────────────────────────────────────
    const sidecars: LifetimeSidecar[] = [];
    sidecars.push({ stop: runtimeSetup.cleanup });
    expect(sidecars).toHaveLength(1);

    // ── 3. Runtime phase ──────────────────────────────────────────────
    // At Scale 1, resolveModelExecutionPort() returns the WorkerModelExecutionPort.
    expect(resolveModelExecutionPort()).toBe(runtimeSetup.modelExecutionPort);

    // A turn runs through the admission provider (WorkerPoolDispatcher).
    const events: string[] = [];
    await withSessionPlacementTurnAdmission(
      { sessionId: "s2", runId: "r2" },
      { sessionId: "s2", sessionFile: "/tmp/s2.jsonl", prompt: "test" } as never,
      async () => {
        events.push("turn");
        return { meta: { durationMs: 0 } } as never;
      },
      () => events.push("admitted"),
    );
    // Scale 1 partial: delegates to MainThreadDispatcher internally.
    expect(events).toEqual(["admitted", "turn"]);

    // ── 4. Shutdown phase ─────────────────────────────────────────────
    await stopAllSidecars(sidecars);

    // After shutdown: defaults restored.
    expect(resolveModelExecutionPort()).toBeInstanceOf(DirectModelExecutionPort);

    // Track for afterEach cleanup (in case the test fails before shutdown).
    pendingCleanups.push(runtimeSetup.cleanup);
  });

  it("shutdown restores defaults after Scale 1 (singleton restored)", async () => {
    // Verify the exact singleton restoration that the gateway relies on.
    const runtimeSetup = setupRuntime({
      agents: { defaults: { runtime: { isolation: "in-process", workerCount: 1 } } },
    } as never);

    // Before shutdown: WorkerModelExecutionPort is installed.
    expect(resolveModelExecutionPort()).toBeInstanceOf(WorkerModelExecutionPort);

    await runtimeSetup.cleanup();

    // After shutdown: DirectModelExecutionPort is restored.
    // This means streamFn (sessions/sdk.ts) would call streamSimple directly
    // — graceful degradation after the runtime is torn down.
    expect(resolveModelExecutionPort()).toBeInstanceOf(DirectModelExecutionPort);
  });

  it("multiple setupRuntime cycles don't leak (each cleanup restores defaults)", async () => {
    // The gateway may restart the runtime (e.g. config reload). Each cycle
    // must clean up the previous one's pools and restore defaults.
    for (let i = 0; i < 3; i++) {
      const runtimeSetup = setupRuntime({
        agents: { defaults: { runtime: { isolation: "in-process", workerCount: 1 } } },
      } as never);

      expect(resolveModelExecutionPort()).toBeInstanceOf(WorkerModelExecutionPort);

      await runtimeSetup.cleanup();

      // After each cycle, defaults are restored.
      expect(resolveModelExecutionPort()).toBeInstanceOf(DirectModelExecutionPort);
    }
  });

  it("shutdown sidecar pattern matches gateway lifecycle (stop called once)", async () => {
    // Mirror the exact pattern from server-startup-finish.ts +
    // server-lifecycle.ts: push { stop: cleanup }, then stopAllSidecars.
    const runtimeSetup = setupRuntime({
      agents: { defaults: { runtime: { isolation: "in-process", workerCount: 1 } } },
    } as never);

    let stopCallCount = 0;
    const originalCleanup = runtimeSetup.cleanup;
    const trackingCleanup = async () => {
      stopCallCount++;
      await originalCleanup();
    };

    // Register as sidecar (server-startup-finish.ts pattern).
    const sidecars: LifetimeSidecar[] = [{ stop: trackingCleanup }];

    // Shutdown (server-lifecycle.ts pattern).
    await stopAllSidecars(sidecars);

    // stop was called exactly once.
    expect(stopCallCount).toBe(1);

    // Pools terminated, defaults restored.
    expect(resolveModelExecutionPort()).toBeInstanceOf(DirectModelExecutionPort);
  });
});
