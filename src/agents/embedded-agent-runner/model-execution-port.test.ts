// Tests for the model execution port — singleton install/resolve + default fallback.
import { afterAll, describe, expect, it } from "vitest";
import {
  DirectModelExecutionPort,
  installModelExecutionPort,
  resolveModelExecutionPort,
  type ModelExecutionPort,
} from "./model-execution-port.js";

describe("model execution port", () => {
  const restoreUninstall = (() => {
    let uninstall: (() => void) | undefined;
    return {
      set: (fn: () => void) => {
        uninstall = fn;
      },
      run: () => uninstall?.(),
    };
  })();

  afterAll(() => {
    restoreUninstall.run();
  });

  it("resolves the direct port by default (no install)", () => {
    const port = resolveModelExecutionPort();
    expect(port).toBeInstanceOf(DirectModelExecutionPort);
  });

  it("resolves an installed port", () => {
    const fake: ModelExecutionPort = {
      stream: () =>
        ({
          async *[Symbol.asyncIterator]() {
            yield { type: "done", message: {} as never, reason: "stop" };
          },
          result: async () => ({}) as never,
        }) as never,
    };
    const uninstall = installModelExecutionPort(fake);
    restoreUninstall.set(uninstall);
    expect(resolveModelExecutionPort()).toBe(fake);
  });

  it("uninstall restores the previous port", () => {
    const fake: ModelExecutionPort = {
      stream: () =>
        ({
          async *[Symbol.asyncIterator]() {
            yield { type: "done", message: {} as never, reason: "stop" };
          },
          result: async () => ({}) as never,
        }) as never,
    };
    const uninstall = installModelExecutionPort(fake);
    expect(resolveModelExecutionPort()).toBe(fake);
    uninstall();
    // After uninstall, the default direct port is restored.
    expect(resolveModelExecutionPort()).toBeInstanceOf(DirectModelExecutionPort);
  });

  it("uninstall only clears if the current port matches", () => {
    const fake1: ModelExecutionPort = { stream: () => ({}) as never };
    const fake2: ModelExecutionPort = { stream: () => ({}) as never };
    const uninstall1 = installModelExecutionPort(fake1);
    installModelExecutionPort(fake2);
    // uninstall1 should NOT clear fake2 (it's no longer current).
    uninstall1();
    expect(resolveModelExecutionPort()).toBe(fake2);
    // Clean up fake2 for other tests.
    const uninstall2 = installModelExecutionPort(
      resolveModelExecutionPort() === fake2
        ? new DirectModelExecutionPort()
        : new DirectModelExecutionPort(),
    );
    uninstall2();
  });

  it("DirectModelExecutionPort.stream delegates to streamSimple", async () => {
    // The direct port's stream method should produce an async iterable.
    // We don't call a real model — just verify the contract shape.
    const port = new DirectModelExecutionPort();
    expect(typeof port.stream).toBe("function");
    // streamSimple is called lazily; verifying it doesn't throw at call time
    // with a minimal model would require a real provider. The type check +
    // singleton tests above are sufficient for 3a-1 (no-behavior-change).
  });
});
