import { describe, expect, it } from "vitest";
import {
  createActivityInspectTool,
  type ActivityTraceEvent,
} from "./activity-inspect-tool.js";

describe("activity_inspect agent tool (TDD Unit Invariants)", () => {
  it("has the expected tool descriptor and parameters schema", () => {
    const tool = createActivityInspectTool();
    expect(tool.name).toBe("activity_inspect");
    expect(tool.description).toContain("recent tool execution activity");
  });

  it("returns clean default metrics when no activity is recorded", async () => {
    const tool = createActivityInspectTool({
      getRecentActivity: () => [],
    });

    const result = await tool.execute("call-1", {});
    const parsed = JSON.parse(result.content[0].text);

    expect(parsed.totalCalls).toBe(0);
    expect(parsed.errorCount).toBe(0);
    expect(parsed.totalDurationMs).toBe(0);
    expect(parsed.circuitBreaker.callLimit).toBe(12);
    expect(parsed.circuitBreaker.remainingCalls).toBe(12);
    expect(parsed.circuitBreaker.isCapReached).toBe(false);
    expect(parsed.recentActivity).toEqual([]);
  });

  it("computes call metrics, latency aggregation, and circuit breaker status", async () => {
    const mockActivity: ActivityTraceEvent[] = [
      { toolName: "exec", target: "find src/", durationMs: 1200, status: "ok" },
      { toolName: "read", target: "src/a.ts", durationMs: 400, status: "ok" },
      { toolName: "read", target: "src/missing.ts", durationMs: 250, status: "error", isError: true },
      { toolName: "exec", target: "grep foo .", durationMs: 2100, status: "ok" },
    ];

    const tool = createActivityInspectTool({
      getRecentActivity: () => mockActivity,
      chainScore: 78, // Bronze tier (limit = 3)
    });

    const result = await tool.execute("call-2", { limit: 2 });
    const parsed = JSON.parse(result.content[0].text);

    expect(parsed.totalCalls).toBe(4);
    expect(parsed.errorCount).toBe(1);
    expect(parsed.totalDurationMs).toBe(3950);
    expect(parsed.circuitBreaker.tier).toBe("Bronze");
    expect(parsed.circuitBreaker.callLimit).toBe(3);
    expect(parsed.circuitBreaker.remainingCalls).toBe(0);
    expect(parsed.circuitBreaker.isCapReached).toBe(true);
    expect(parsed.recentActivity).toHaveLength(2);
    expect(parsed.recentActivity[1].toolName).toBe("exec");
  });
});
