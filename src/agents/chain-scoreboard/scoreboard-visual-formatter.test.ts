import { describe, expect, it } from "vitest";
import {
  estimateBannerTokenCount,
  formatScoreboardBanner,
} from "./scoreboard-visual-formatter.js";

describe("scoreboard-visual-formatter (Tier 1 Pure Invariants & DoD AC-3)", () => {
  it("formats visual scoreboard banner cleanly with tier badges and unlocked privilege", () => {
    const banner = formatScoreboardBanner({
      callCount: 3,
      spreadFactor: 1.0,
      chainScore: 94,
      convergenceDelta: "+12%",
    });

    expect(banner).toContain("📊 SCORE: 94 🥈 (Silver) | Calls: 3 | Eff: +12% ↑");
    expect(banner).toContain("Unlocks: Priority Execution Queue on Tool Batching");
  });

  it("DoD AC-3: verifies banner injection consumes <= 35 prompt tokens per turn", () => {
    const banner = formatScoreboardBanner({
      callCount: 1,
      spreadFactor: 1.0,
      chainScore: 100,
      convergenceDelta: "+18%",
    });

    // Approximate token count: length / 4
    const tokenCount = estimateBannerTokenCount(banner);
    expect(tokenCount).toBeLessThanOrEqual(35); // Strict DoD AC-3 verified!
  });
});
