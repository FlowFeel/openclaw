import { describe, it, expect } from "vitest";
import { ToolFingerprintStack, canonicalizeParams } from "./tool-fingerprint-stack.js";

describe("ToolFingerprintStack (TV-V8-02 & TV-V8-03)", () => {
  it("detects identical tool invocation within depth k <= 4 and triggers halt", () => {
    const stack = new ToolFingerprintStack(4);

    const r1 = stack.pushAndCheckHalt("read_file", { path: "/workspace/config.yaml" });
    expect(r1.shouldHalt).toBe(false);

    const r2 = stack.pushAndCheckHalt("exec", { command: "git status" });
    expect(r2.shouldHalt).toBe(false);

    // Call identical read_file within depth 4
    const r3 = stack.pushAndCheckHalt("read_file", { path: "/workspace/config.yaml" });
    expect(r3.shouldHalt).toBe(true);
    expect(r3.reason).toBe("duplicate_tool_signature_halt");
    expect(r3.duplicateSignature).toContain("read_file:0x");
  });

  it("canonicalizes unordered object parameters to catch semantic duplicates (TV-V8-03)", () => {
    const str1 = canonicalizeParams({ b: 2, a: 1, nested: { y: 20, x: 10 } });
    const str2 = canonicalizeParams({ a: 1, b: 2, nested: { x: 10, y: 20 } });
    expect(str1).toBe(str2);

    const stack = new ToolFingerprintStack(4);
    stack.pushAndCheckHalt("custom_tool", { b: 2, a: 1 });
    const r = stack.pushAndCheckHalt("custom_tool", { a: 1, b: 2 });
    expect(r.shouldHalt).toBe(true);
  });

  it("evicts signatures beyond depth k", () => {
    const stack = new ToolFingerprintStack(2);

    stack.pushAndCheckHalt("tool1", { a: 1 });
    stack.pushAndCheckHalt("tool2", { a: 2 });
    stack.pushAndCheckHalt("tool3", { a: 3 }); // Evicts tool1

    // Calling tool1 again should NOT trigger halt since it was evicted from depth 2
    const r = stack.pushAndCheckHalt("tool1", { a: 1 });
    expect(r.shouldHalt).toBe(false);
  });
});
