import { describe, it, expect } from "vitest";
import {
  formatScalarStateRegister,
  parseScalarStateRegister,
  encodeScalarStateFlags,
} from "./scalar-state-register.js";

describe("ScalarStateRegister (TV-V8-04)", () => {
  it("formats compact <= 6 token header matching exact tuple specification", () => {
    const formatted = formatScalarStateRegister({
      budgetPercent: 80,
      callDepth: 2,
      flags: { isDegradedSNR: true, isCircuitWarning: false },
    });

    expect(formatted).toBe("[B: 80 | D: 2 | S: 1]");

    // Rough token estimate (character count / 4)
    expect(formatted.length).toBeLessThanOrEqual(24);
  });

  it("encodes and round-trips state bitflags", () => {
    const flags = encodeScalarStateFlags({
      isDegradedSNR: true, // 1
      isCircuitWarning: true, // 2
      isCacheAffinity: true, // 4
      isCompactionPending: true, // 8
    });
    expect(flags).toBe(15);

    const formatted = formatScalarStateRegister({
      budgetPercent: 50,
      callDepth: 5,
      flags,
    });
    expect(formatted).toBe("[B: 50 | D: 5 | S: 15]");

    const parsed = parseScalarStateRegister(formatted);
    expect(parsed).toEqual({
      budgetPercent: 50,
      callDepth: 5,
      flags: 15,
    });
  });
});
