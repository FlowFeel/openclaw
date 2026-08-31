import { describe, it, expect } from "vitest";
import { RabinKarpTokenHasher } from "./rabin-karp-token-hasher.js";
import { ToolFingerprintStack } from "./tool-fingerprint-stack.js";
import { formatScalarStateRegister } from "./scalar-state-register.js";

describe("V8 Tripwire Behavioral Verification (BDD)", () => {
  it("Scenario: Host halts duplicate tool call loop within depth k=4", () => {
    const stack = new ToolFingerprintStack(4);

    // Agent executes 1st search
    const step1 = stack.pushAndCheckHalt("search_index_inspect", { query: "Inferno Labs" });
    expect(step1.shouldHalt).toBe(false);

    // Agent executes 2nd action
    const step2 = stack.pushAndCheckHalt("read_file", { path: "reference/phosphene-oc/src/index.ts" });
    expect(step2.shouldHalt).toBe(false);

    // Agent enters loop and repeats 1st search with identical args
    const step3 = stack.pushAndCheckHalt("search_index_inspect", { query: "Inferno Labs" });
    expect(step3.shouldHalt).toBe(true);
    expect(step3.reason).toBe("duplicate_tool_signature_halt");
  });

  it("Scenario: Token stream tripwire trips on repeating token generation loop", () => {
    const hasher = new RabinKarpTokenHasher({ windowSize: 16 });

    // Simulate 16-token repeating pattern
    const pattern = Array.from({ length: 16 }, (_, i) => 1000 + i);

    // First emission
    expect(hasher.pushTokens(pattern)).toBe(false);

    // Some intermediate tokens
    expect(hasher.pushTokens([50, 51, 52])).toBe(false);

    // Repeated generation loop
    const looped = hasher.pushTokens(pattern);
    expect(looped).toBe(true);
  });

  it("Scenario: Lean scalar state register consumes <= 6 prompt tokens", () => {
    const slot0 = formatScalarStateRegister({
      budgetPercent: 92,
      callDepth: 1,
      flags: 0,
    });

    expect(slot0).toBe("[B: 92 | D: 1 | S: 0]");
    expect(slot0.length).toBeLessThanOrEqual(24);
  });
});
