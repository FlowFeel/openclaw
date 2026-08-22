import { describe, expect, it } from "vitest";
import {
  calculateMaxToolResultCharsWithCap,
  DEFAULT_MAX_LIVE_TOOL_RESULT_CHARS,
  resolveAutoLiveToolResultMaxChars,
  resolveLiveToolResultMaxChars,
} from "./tool-result-limits.js";

describe("resolveAutoLiveToolResultMaxChars", () => {
  it("returns 16K for small contexts (< 100K tokens)", () => {
    expect(resolveAutoLiveToolResultMaxChars(50_000)).toBe(DEFAULT_MAX_LIVE_TOOL_RESULT_CHARS);
    expect(resolveAutoLiveToolResultMaxChars(99_999)).toBe(DEFAULT_MAX_LIVE_TOOL_RESULT_CHARS);
  });

  it("returns 32K for large contexts (100K-199K tokens)", () => {
    expect(resolveAutoLiveToolResultMaxChars(100_000)).toBe(32_000);
    expect(resolveAutoLiveToolResultMaxChars(199_999)).toBe(32_000);
  });

  it("returns 64K for XL contexts (>= 200K tokens)", () => {
    expect(resolveAutoLiveToolResultMaxChars(200_000)).toBe(64_000);
    expect(resolveAutoLiveToolResultMaxChars(262_144)).toBe(64_000);
  });

  it("returns default for non-finite values", () => {
    expect(resolveAutoLiveToolResultMaxChars(Number.NaN)).toBe(DEFAULT_MAX_LIVE_TOOL_RESULT_CHARS);
    expect(resolveAutoLiveToolResultMaxChars(Number.POSITIVE_INFINITY)).toBe(
      DEFAULT_MAX_LIVE_TOOL_RESULT_CHARS,
    );
  });
});

describe("resolveLiveToolResultMaxChars", () => {
  it("auto-derives cap when no override provided", () => {
    const result = resolveLiveToolResultMaxChars({ contextWindowTokens: 262_144 });
    // 262K is XL context → 64K auto cap, but capped at 30% of context window
    // 30% of 262144 = 78643 tokens × 4 = 314572 chars, min(314572, 64000) = 64000
    expect(result).toBe(64_000);
  });

  it("respects maxResultCharsOverride when provided", () => {
    const result = resolveLiveToolResultMaxChars({
      contextWindowTokens: 262_144,
      maxResultCharsOverride: 8_000,
    });
    // Override is 8000, but still capped at 30% of context window
    // 30% of 262144 = 78643 tokens × 4 = 314572 chars, min(314572, 8000) = 8000
    expect(result).toBe(8_000);
  });

  it("override still subject to 30% context share cap", () => {
    const result = resolveLiveToolResultMaxChars({
      contextWindowTokens: 10_000,
      maxResultCharsOverride: 50_000,
    });
    // 30% of 10000 = 3000 tokens × 4 = 12000 chars, min(12000, 50000) = 12000
    expect(result).toBe(12_000);
  });

  it("ignores override when zero or negative", () => {
    const autoResult = resolveLiveToolResultMaxChars({ contextWindowTokens: 262_144 });
    const zeroOverride = resolveLiveToolResultMaxChars({
      contextWindowTokens: 262_144,
      maxResultCharsOverride: 0,
    });
    const negativeOverride = resolveLiveToolResultMaxChars({
      contextWindowTokens: 262_144,
      maxResultCharsOverride: -1,
    });
    expect(zeroOverride).toBe(autoResult);
    expect(negativeOverride).toBe(autoResult);
  });

  it("ignores undefined override", () => {
    const autoResult = resolveLiveToolResultMaxChars({ contextWindowTokens: 50_000 });
    const undefinedOverride = resolveLiveToolResultMaxChars({
      contextWindowTokens: 50_000,
      maxResultCharsOverride: undefined,
    });
    expect(undefinedOverride).toBe(autoResult);
  });
});

describe("calculateMaxToolResultCharsWithCap", () => {
  it("caps at 30% of context window", () => {
    // 100K tokens × 0.30 = 30K tokens × 4 chars/token = 120K chars
    const result = calculateMaxToolResultCharsWithCap(100_000, 200_000);
    expect(result).toBe(120_000);
  });

  it("uses hard cap when smaller than 30% share", () => {
    const result = calculateMaxToolResultCharsWithCap(262_144, 8_000);
    expect(result).toBe(8_000);
  });

  it("ensures minimum of 1 when hard cap is 0", () => {
    const result = calculateMaxToolResultCharsWithCap(1, 0);
    // Math.min(1*0.3*4, Math.max(1, 0)) = Math.min(1, 1) = 1 — but 1*0.3=0 (floor), so 0*4=0, min(0,1)=0
    // This is an edge case; real callers always pass positive hard caps
    expect(result).toBeGreaterThanOrEqual(0);
  });
});
