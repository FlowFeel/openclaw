import { describe, expect, it } from "vitest";
import {
  estimateBannerTokenCount,
  formatScoreboardBanner,
} from "./scoreboard-visual-formatter.js";

describe("scoreboard-visual-formatter (Tier 1 Pure Invariants & Story 2)", () => {
  it("formats visual micro-scoreboard banner matching exact specification", () => {
    const banner = formatScoreboardBanner({
      callCount: 2,
      spreadFactor: 1.0,
      chainScore: 96,
      convergenceDelta: "+15%",
    });

    expect(banner).toBe("📊 CHAIN: Calls: 2 | Spread: 1.0 | Score: 96 🟢 GOLD (+15% ↑)");
  });

  it("Story 2 / DoD AC-2: verifies micro-banner consumes <= 25 prompt tokens", () => {
    const banner = formatScoreboardBanner({
      callCount: 2,
      spreadFactor: 1.0,
      chainScore: 96,
      convergenceDelta: "+15%",
    });

    const tokenCount = estimateBannerTokenCount(banner);
    expect(tokenCount).toBeLessThanOrEqual(25); // Strictly <= 25 tokens!
  });
});
