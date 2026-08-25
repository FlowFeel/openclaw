import { describe, it, expect } from "vitest";
import { generateTokenomicsContextCue } from "./tokenomics-prompt-injector.js";

describe("Degree 0: TokenomicsPromptInjector Pure Invariants", () => {
  it("returns undefined for nominal SNR (Zero-Tax Invariant)", () => {
    const cue = generateTokenomicsContextCue({
      totalTokens: 1000,
      signalTokens: 850, // 85% SNR -> nominal
    });
    expect(cue).toBeUndefined();
  });

  it("generates warning notice when SNR is between 50% and 70%", () => {
    const cue = generateTokenomicsContextCue({
      totalTokens: 1000,
      signalTokens: 600, // 60% SNR -> warning
    });
    expect(cue).toBeDefined();
    expect(cue?.tier).toBe("warning");
    expect(cue?.promptDirective).toContain("TOKENOMICS NOTICE: Warning SNR 60.0%");
  });

  it("generates critical alert when SNR is below 50%", () => {
    const cue = generateTokenomicsContextCue({
      totalTokens: 1000,
      signalTokens: 350, // 35% SNR -> critical
    });
    expect(cue).toBeDefined();
    expect(cue?.tier).toBe("critical");
    expect(cue?.promptDirective).toContain("TOKENOMICS ALERT: Critical SNR 35.0%");
    expect(cue?.promptDirective).toContain("compaction_preview");
  });
});
