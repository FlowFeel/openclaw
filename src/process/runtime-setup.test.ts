// Tests for setupRuntime — verifies Scale 0/1 wiring + cleanup.
import { afterAll, describe, expect, it } from "vitest";
import { resolveModelExecutionPort } from "../agents/embedded-agent-runner/model-execution-port.js";
import { setupRuntime } from "./runtime-setup.js";

describe("setupRuntime", () => {
  // Track cleanups to run after all tests
  const cleanups: Array<() => Promise<void>> = [];

  afterAll(async () => {
    for (const cleanup of cleanups) {
      await cleanup();
    }
  });

  it("Scale 0 (isolation: disabled) installs no dispatcher or model port", () => {
    const result = setupRuntime({
      agents: {
        defaults: {
          runtime: { isolation: "disabled" },
        },
      },
    } as never);

    expect(result.scale.scale).toBe(0);
    expect(result.dispatcher).toBeNull();
    expect(result.modelExecutionPort).toBeNull();

    // resolveModelExecutionPort should return the default DirectModelExecutionPort
    // (no WorkerModelExecutionPort installed)
    const port = resolveModelExecutionPort();
    expect(port.constructor.name).toBe("DirectModelExecutionPort");

    // Cleanup should be safe to call (no-op for Scale 0)
    cleanups.push(result.cleanup);
  });

  it("Scale 0 cleanup terminates without error", async () => {
    const result = setupRuntime({
      agents: {
        defaults: {
          runtime: { isolation: "disabled" },
        },
      },
    } as never);

    await expect(result.cleanup()).resolves.toBeUndefined();
  });

  it("Scale 1 (isolation: in-process) installs dispatcher + model port", () => {
    const result = setupRuntime({
      agents: {
        defaults: {
          runtime: { isolation: "in-process", workerCount: 1 },
        },
      },
    } as never);

    expect(result.scale.scale).toBe(1);
    expect(result.scale.poolSize).toBe(1);
    expect(result.dispatcher).not.toBeNull();
    expect(result.modelExecutionPort).not.toBeNull();

    // resolveModelExecutionPort should now return the WorkerModelExecutionPort
    const port = resolveModelExecutionPort();
    expect(port.constructor.name).toBe("WorkerModelExecutionPort");

    // Register cleanup to terminate the pools after all tests
    cleanups.push(result.cleanup);
  });

  it("Scale 1 cleanup uninstalls the model port (restores direct)", async () => {
    const result = setupRuntime({
      agents: {
        defaults: {
          runtime: { isolation: "in-process", workerCount: 1 },
        },
      },
    } as never);

    // Before cleanup: WorkerModelExecutionPort is installed
    expect(resolveModelExecutionPort().constructor.name).toBe("WorkerModelExecutionPort");

    await result.cleanup();

    // After cleanup: DirectModelExecutionPort is restored
    expect(resolveModelExecutionPort().constructor.name).toBe("DirectModelExecutionPort");
  });
});
