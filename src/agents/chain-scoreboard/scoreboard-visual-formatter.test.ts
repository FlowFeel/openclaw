import { describe, expect, it } from "vitest";
import {
  estimateBannerTokenCount,
  formatScoreboardBanner,
} from "./scoreboard-visual-formatter.js";

describe("scoreboard-visual-formatter (Tier 1 Pure Invariants & Story 2)", () => {
  it("formats visual micro-scoreboard banner matching exact specification", () => {
    const banner = formatScoreboardBanner({
      callCount: 2,
      callLimit: 5,
      remainingCalls: 3,
      isCapReached: false,
      spreadFactor: 1.0,
      chainScore: 96,
      convergenceDelta: "+15%",
    });

    expect(banner).toBe("📊 CHAIN: Calls: 2/5 | Spread: 1.0 | Score: 96 🟢 GOLD (+15% ↑)");
  });

  it("formats banner with runway countdown when remaining seconds provided", () => {
    const banner = formatScoreboardBanner({
      callCount: 3,
      callLimit: 5,
      remainingCalls: 2,
      isCapReached: false,
      spreadFactor: 1.0,
      chainScore: 90,
      convergenceDelta: "+8%",
      runwayRemainingSeconds: 245,
    });

    expect(banner).toBe("📊 CHAIN: Calls: 3/5 | Spread: 1.0 | Score: 90 ⚪ SILVER (245s left)");
    const tokenCount = estimateBannerTokenCount(banner);
    expect(tokenCount).toBeLessThanOrEqual(25);
  });

  it("Story 2 / DoD AC-2: verifies micro-banner consumes <= 25 prompt tokens", () => {
    const banner = formatScoreboardBanner({
      callCount: 2,
      callLimit: 5,
      remainingCalls: 3,
      isCapReached: false,
      spreadFactor: 1.0,
      chainScore: 96,
      convergenceDelta: "+15%",
    });

    const tokenCount = estimateBannerTokenCount(banner);
    expect(tokenCount).toBeLessThanOrEqual(25); // Strictly <= 25 tokens!
  });
});
