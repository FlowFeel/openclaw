import { describe, expect, it } from "vitest";
import {
  attachScoreboardToF1,
  formatChainMetricsSnapshot,
} from "./f1-scoreboard-adapter.js";
import { calculateChainMetrics } from "./chain-metrics-calculator.js";
import type { Frame1Headroom } from "../../infra/self-state-envelope/types.js";

describe("f1-scoreboard-adapter (Tier 1 & Tier 2 Story 1)", () => {
  it("formats standardized ChainMetricsSnapshot matching Story 1 schema", () => {
    const rawMetrics = calculateChainMetrics([
      { toolName: "exec", target: "grep -rn 'foo' src/" },
      { toolName: "read", target: "src/a.ts" },
    ]);
    const snapshot = formatChainMetricsSnapshot(rawMetrics);

    expect(snapshot.callCount).toBe(2);
    expect(snapshot.callLimit).toBe(5);
    expect(snapshot.remainingCalls).toBe(3);
    expect(snapshot.isCapReached).toBe(false);
    expect(snapshot.spreadFactor).toBe(1.0);
    expect(snapshot.chainScore).toBe(92);
    expect(snapshot.tier).toBe("Silver");
  });

  it("DoD AC-1: attaches live calculated chainMetrics to F1 object matching peek(path: 'F1.chainMetrics')", () => {
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
    expect(decoratedF1.chainMetrics).toEqual({
      callCount: 1,
      callLimit: 12,
      remainingCalls: 11,
      isCapReached: false,
      spreadFactor: 1.0,
      convergenceDelta: "+18%",
      chainScore: 100,
      tier: "Diamond",
    });
  });
});
