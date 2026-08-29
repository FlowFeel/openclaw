import { describe, expect, it } from "vitest";
import {
  createExecStatusMetadata,
  wrapToolResultWithStatus,
} from "./exec-register-envelope.js";

describe("exec-register-envelope (Tier 1 Pure Invariants)", () => {
  it("creates clean success metadata ($? = 0)", () => {
    const meta = createExecStatusMetadata({ exitCode: 0, durationMs: 42.4 });
    expect(meta.exitCode).toBe(0);
    expect(meta.durationMs).toBe(42);
    expect(meta.tool).toBe("exec");
    expect(meta.error).toBeUndefined();
  });

  it("creates structured error metadata ($! / non-zero $?)", () => {
    const meta = createExecStatusMetadata({
      exitCode: 127,
      durationMs: 15,
      errorCode: "ENOENT",
      errorMessage: "command not found: foobar",
      fatal: true,
    });
    expect(meta.exitCode).toBe(127);
    expect(meta.error).toBeDefined();
    expect(meta.error?.code).toBe("ENOENT");
    expect(meta.error?.fatal).toBe(true);
  });

  it("wraps tool result in frozen envelope", () => {
    const meta = createExecStatusMetadata({ exitCode: 0, durationMs: 100 });
    const payload = { stdout: "build complete" };
    const enveloped = wrapToolResultWithStatus(payload, meta);

    expect(enveloped.result).toBe(payload);
    expect(enveloped._status.exitCode).toBe(0);
  });
});
