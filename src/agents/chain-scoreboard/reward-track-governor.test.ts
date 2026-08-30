import { describe, expect, it } from "vitest";
import { classifyRewardTier } from "./reward-track-governor.js";

describe("reward-track-governor (Tier 1 Pure Invariants)", () => {
  it("classifies scores into Diamond (>=99), Gold (95-98), Silver (85-94), and Bronze (<85)", () => {
    const diamond = classifyRewardTier(100);
    expect(diamond.tier).toBe("Diamond");
    expect(diamond.badge).toBe("💎");
    expect(diamond.unlockedPrivilege).toContain("Autonomous multi-turn");

    const gold = classifyRewardTier(96);
    expect(gold.tier).toBe("Gold");
    expect(gold.badge).toBe("🟢");
    expect(gold.unlockedPrivilege).toContain("Extended autonomous leash");

    const silver = classifyRewardTier(90);
    expect(silver.tier).toBe("Silver");
    expect(silver.badge).toBe("⚪");
    expect(silver.unlockedPrivilege).toContain("Priority tool execution");

    const bronze = classifyRewardTier(75);
    expect(bronze.tier).toBe("Bronze");
    expect(bronze.badge).toBe("🟡");
    expect(bronze.unlockedPrivilege).toContain("Standard nominal baseline");
  });
});
