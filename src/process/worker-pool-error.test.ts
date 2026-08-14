// Tests for WorkerPoolError — the 4-code error taxonomy.
//
// Prediction (§4 + 3a-5): WorkerPoolError carries a `code` field with one of
// 4 values: "busy" | "timeout" | "unavailable" | "failed". Each code maps to
// a distinct recovery strategy (busy → graceful degradation, timeout → retry,
// unavailable → respawn, failed → propagate). The code is readonly and the
// error is distinguishable from generic Error via instanceof.
//
// Competing account: if the code is mutable or not set, callers can't apply
// recovery strategies; if instanceof doesn't work, callers can't catch it
// specifically.
//
// Support: each code is settable; code is readonly; instanceof works; the
// name is "WorkerPoolError"; the message is preserved.
//
// Refute: code is mutable; instanceof fails; code is undefined.
import { describe, expect, it } from "vitest";
import { WorkerPoolError } from "./topic-affine-worker-pool.js";

describe("WorkerPoolError", () => {
  it("constructs with each of the 4 codes", () => {
    const codes = ["busy", "timeout", "unavailable", "failed"] as const;

    for (const code of codes) {
      const error = new WorkerPoolError(`test ${code}`, code);
      expect(error.code).toBe(code);
      expect(error.message).toBe(`test ${code}`);
    }
  });

  it("sets name to 'WorkerPoolError'", () => {
    const error = new WorkerPoolError("test", "busy");
    expect(error.name).toBe("WorkerPoolError");
  });

  it("is an instance of Error and WorkerPoolError", () => {
    const error = new WorkerPoolError("test", "timeout");

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(WorkerPoolError);
  });

  it("can be caught specifically via instanceof in a catch block", () => {
    try {
      throw new WorkerPoolError("pool full", "busy");
    } catch (error) {
      if (error instanceof WorkerPoolError) {
        expect(error.code).toBe("busy");
        return;
      }
      // If we get here, instanceof failed.
      throw new Error("expected WorkerPoolError to be caught via instanceof");
    }
  });

  it("preserves the code on the instance (not just the prototype)", () => {
    // Each instance has its own code — they don't leak between instances.
    const a = new WorkerPoolError("a", "busy");
    const b = new WorkerPoolError("b", "timeout");

    expect(a.code).toBe("busy");
    expect(b.code).toBe("timeout");
  });

  it("the 4 codes are distinguishable (distinct recovery strategies)", () => {
    // This is the core claim: callers can switch on `code` to apply
    // different recovery strategies.
    const errors = [
      new WorkerPoolError("queue full", "busy"),
      new WorkerPoolError("slow worker", "timeout"),
      new WorkerPoolError("worker died", "unavailable"),
      new WorkerPoolError("bad request", "failed"),
    ];

    const codes = errors.map((e) => e.code);
    expect(new Set(codes).size).toBe(4); // all distinct
    expect(codes).toContain("busy");
    expect(codes).toContain("timeout");
    expect(codes).toContain("unavailable");
    expect(codes).toContain("failed");
  });
});
