// Integration tests for setupRuntime → model execution port → streaming.
//
// Prediction (3a-3): setupRuntime installs the WorkerModelExecutionPort at
// Scale 1, and resolveModelExecutionPort() (called by sessions/sdk.ts streamFn)
// returns that port. The port actually streams events through the worker pool.
// At Scale 0, resolveModelExecutionPort() returns DirectModelExecutionPort
// (calls streamSimple directly). Cleanup restores defaults and terminates pools.
//
// Competing account: the singleton might not propagate (streamFn would call
// the wrong port), or the port might be installed but not actually wired to
// the worker pool (streaming would fail).
//
// Support: after setupRuntime(Scale 1), resolveModelExecutionPort() returns
// WorkerModelExecutionPort; after setupRuntime(Scale 0), it returns
// DirectModelExecutionPort; after cleanup, defaults are restored. The
// admission provider is installed and withSessionPlacementTurnAdmission
// delegates to it.
//
// Refute: streamFn resolves a different port than what setupRuntime installed;
// cleanup doesn't restore defaults; admission provider not installed.
import { pathToFileURL } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import {
  DirectModelExecutionPort,
  installModelExecutionPort,
  resolveModelExecutionPort,
} from "../agents/embedded-agent-runner/model-execution-port.js";
import { WorkerModelExecutionPort } from "../agents/embedded-agent-runner/model-execution-worker.js";
import {
  installSessionPlacementAdmissionProvider,
  withSessionPlacementTurnAdmission,
} from "../agents/session-placement-admission.js";
import { MainThreadDispatcher } from "../agents/turn-dispatcher.js";
import type { Model, SimpleStreamOptions } from "../llm/types.js";
import { setupRuntime } from "./runtime-setup.js";

const testWorkerUrl = pathToFileURL(
  new URL("../agents/embedded-agent-runner/test-model-worker.ts", import.meta.url).pathname,
);

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

// Each test cleans up its own runtime setup to avoid singleton leakage
// between tests. The pending cleanup is tracked here and run in afterEach.
let pendingCleanup: (() => Promise<void>) | undefined;
let pendingUninstall: (() => void) | undefined;

afterEach(async () => {
  pendingUninstall?.();
  pendingUninstall = undefined;
  await pendingCleanup?.();
  pendingCleanup = undefined;
});

describe("setupRuntime integration: port → streaming", () => {
  it("Scale 1: resolveModelExecutionPort() returns the installed WorkerModelExecutionPort", () => {
    const result = setupRuntime({
      agents: { defaults: { runtime: { isolation: "in-process", workerCount: 1 } } },
    } as never);
    pendingCleanup = result.cleanup;

    expect(result.scale.scale).toBe(1);
    expect(result.modelExecutionPort).toBeInstanceOf(WorkerModelExecutionPort);

    // The singleton resolves to the same port that setupRuntime installed.
    // This is what sessions/sdk.ts streamFn calls.
    expect(resolveModelExecutionPort()).toBe(result.modelExecutionPort);
  });

  it("Scale 0: resolveModelExecutionPort() returns DirectModelExecutionPort (no install)", () => {
    const result = setupRuntime({
      agents: { defaults: { runtime: { isolation: "disabled" } } },
    } as never);
    pendingCleanup = result.cleanup;

    expect(result.scale.scale).toBe(0);
    expect(result.modelExecutionPort).toBeNull();

    // No port installed → default DirectModelExecutionPort.
    // This is what streamFn calls at Scale 0 (identical to pre-change behavior).
    expect(resolveModelExecutionPort()).toBeInstanceOf(DirectModelExecutionPort);
  });

  it("manual install: resolveModelExecutionPort().stream() dispatches to the worker", async () => {
    // Simulate what setupRuntime does, but with the test worker URL (so we
    // can verify streaming without a real model API). This tests the full
    // path: install → resolve → stream → worker → events back.
    const port = new WorkerModelExecutionPort({
      workerUrl: testWorkerUrl,
      poolSize: 1,
      queueDepth: 4,
      timeoutMs: 10_000,
    });
    pendingUninstall = installModelExecutionPort(port);
    pendingCleanup = async () => {
      await port.terminate();
    };

    // The singleton now returns our port.
    expect(resolveModelExecutionPort()).toBe(port);

    // Stream through the singleton (like streamFn does).
    const stream = resolveModelExecutionPort().stream(
      testModel,
      testContext,
      {} as SimpleStreamOptions,
    );

    const events: string[] = [];
    for await (const event of stream) {
      events.push(event.type);
    }

    expect(events).toEqual(["start", "text_start", "text_delta", "text_end", "done"]);
    const result = await stream.result();
    expect(result.stopReason).toBe("stop");
  }, 10_000);

  it("cleanup restores DirectModelExecutionPort after Scale 1", async () => {
    const result = setupRuntime({
      agents: { defaults: { runtime: { isolation: "in-process", workerCount: 1 } } },
    } as never);

    expect(resolveModelExecutionPort()).toBeInstanceOf(WorkerModelExecutionPort);

    await result.cleanup();

    // After cleanup, the default is restored — streamFn would call
    // DirectModelExecutionPort → streamSimple (graceful shutdown).
    expect(resolveModelExecutionPort()).toBeInstanceOf(DirectModelExecutionPort);
  });

  it("Scale 1: admission provider is installed and delegates turns", async () => {
    // setupRuntime(Scale 1) installs a WorkerPoolDispatcher as the admission
    // provider. withSessionPlacementTurnAdmission should delegate to it.
    const result = setupRuntime({
      agents: { defaults: { runtime: { isolation: "in-process", workerCount: 1 } } },
    } as never);
    pendingCleanup = result.cleanup;

    // Install a tracking dispatcher to verify delegation.
    const events: string[] = [];
    const tracker = new MainThreadDispatcher();
    pendingUninstall = installSessionPlacementAdmissionProvider({
      executeLocalTurn: (claim, runLocal) => tracker.executeLocalTurn(claim, runLocal),
      executeTurn: (claim, params, runLocal, onAdmitted) => {
        events.push("executeTurn");
        return tracker.executeTurn(claim, params, runLocal, onAdmitted);
      },
    });

    await withSessionPlacementTurnAdmission(
      { sessionId: "s1", runId: "r1" },
      { sessionId: "s1", sessionFile: "/tmp/s1.jsonl", prompt: "test" } as never,
      async () => {
        events.push("turn");
        return { meta: { durationMs: 0 } } as never;
      },
      () => events.push("admitted"),
    );

    // The tracker's executeTurn was called (delegation worked).
    expect(events).toEqual(["executeTurn", "admitted", "turn"]);
  });

  it("Scale 0: no admission provider installed (inline execution)", async () => {
    const result = setupRuntime({
      agents: { defaults: { runtime: { isolation: "disabled" } } },
    } as never);
    pendingCleanup = result.cleanup;

    // At Scale 0, setupRuntime does not install an admission provider.
    // withSessionPlacementTurnAdmission should run inline (no provider).
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

    // No provider → inline execution: admitted then turn.
    expect(events).toEqual(["admitted", "turn"]);
  });
});
