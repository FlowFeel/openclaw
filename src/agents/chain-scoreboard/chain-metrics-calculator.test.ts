import { describe, expect, it } from "vitest";
import { calculateChainMetrics } from "./chain-metrics-calculator.js";

describe("chain-metrics-calculator (Tier 1 Pure Invariants)", () => {
  it("rewards 1-turn precision with high score (100) and +18% convergence gain", () => {
    const metrics = calculateChainMetrics([
      { toolName: "exec", target: "grep -rn 'foo' src/" },
    ]);
    expect(metrics.callCount).toBe(1);
    expect(metrics.spreadFactor).toBe(1.0);
    expect(metrics.chainScore).toBe(100);
    expect(metrics.convergenceDelta).toBe("+18%");
  });

  it("rewards 2-3 turn convergent lookups with score >= 84 and positive delta", () => {
    const metrics2 = calculateChainMetrics([
      { toolName: "exec", target: "grep -rn 'foo' src/" },
      { toolName: "read", target: "src/a.ts" },
    ]);
    expect(metrics2.callCount).toBe(2);
    expect(metrics2.chainScore).toBe(92);
    expect(metrics2.convergenceDelta).toBe("+12%");

    const metrics3 = calculateChainMetrics([
      { toolName: "exec", target: "find src/" },
      { toolName: "read", target: "src/a.ts" },
      { toolName: "read", target: "src/b.ts" },
    ]);
    expect(metrics3.callCount).toBe(3);
    expect(metrics3.chainScore).toBe(84);
    expect(metrics3.convergenceDelta).toBe("+6%");
  });

  it("DoD AC-2: degrades repetitive looping over >6 calls under score 70", () => {
    const wanderingCalls = [
      { toolName: "exec", target: "ls -la" },
      { toolName: "exec", target: "find src/" },
      { toolName: "read", target: "src/a.ts" },
      { toolName: "read", target: "src/b.ts" },
      { toolName: "exec", target: "grep foo ." },
      { toolName: "read", target: "src/c.ts" },
      { toolName: "exec", target: "cat README.md" },
    ];
    const metrics = calculateChainMetrics(wanderingCalls);
    expect(metrics.callCount).toBe(7);
    expect(metrics.chainScore).toBeLessThan(70); // DoD AC-2 verified!
    expect(metrics.convergenceDelta).toBe("-32%");
  });
});
