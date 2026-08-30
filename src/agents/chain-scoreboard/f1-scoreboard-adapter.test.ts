import { describe, expect, it } from "vitest";
import {
  attachScoreboardToF1,
  formatChainMetricsSnapshot,
} from "./f1-scoreboard-adapter.js";
import { calculateChainMetrics } from "./chain-metrics-calculator.js";
import type { Frame1Headroom } from "../../infra/self-state-envelope/types.js";

describe("f1-scoreboard-adapter (Tier 1 & Tier 2 DoD AC-1)", () => {
  it("formats structured ChainMetricsSnapshot accurately", () => {
    const rawMetrics = calculateChainMetrics([
      { toolName: "exec", target: "grep -rn 'foo' src/" },
      { toolName: "read", target: "src/a.ts" },
    ]);
    const snapshot = formatChainMetricsSnapshot(rawMetrics);

    expect(snapshot.callCount).toBe(2);
    expect(snapshot.spreadFactor).toBe(1.0);
    expect(snapshot.chainScore).toBe(92);
    expect(snapshot.tier).toBe("Silver");
    expect(snapshot.unlockedPrivilege).toContain("Priority Execution Queue");
  });

  it("DoD AC-1: attaches live calculated chainMetrics to F1 object without mutation", () => {
    const baseF1: Frame1Headroom = {
      usedTokens: 1000,
      limitTokens: 128000,
      remainingTokens: 127000,
      capacityPercentage: 1,
      snrPercentage: 99,
    };

    const metrics = calculateChainMetrics([
      { toolName: "exec", target: "git status" },
    ]);

    const decoratedF1 = attachScoreboardToF1(baseF1, metrics);
    expect(decoratedF1.usedTokens).toBe(1000);
    expect(decoratedF1.chainMetrics).toBeDefined();
    expect(decoratedF1.chainMetrics.chainScore).toBe(100);
    expect(decoratedF1.chainMetrics.tier).toBe("Diamond");
    expect(decoratedF1.chainMetrics.unlockedPrivilege).toContain("Full Autonomous Lease");
  });
});
