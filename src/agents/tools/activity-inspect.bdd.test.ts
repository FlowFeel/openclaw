import { describe, expect, it } from "vitest";
import {
  createActivityInspectTool,
  type ActivityTraceEvent,
} from "./activity-inspect-tool.js";

describe("Feature: Agent Activity & Execution Introspection (BDD)", () => {
  it("Scenario: Agent inspects its own activity after repeated tool failures to avoid timing out", async () => {
    // Given the agent has executed 5 consecutive tools with 2 errors
    const traceHistory: ActivityTraceEvent[] = [
      { toolName: "read", target: "nonexistent-file.ts", isError: true, durationMs: 150 },
      { toolName: "read", target: "nonexistent-file-2.ts", isError: true, durationMs: 150 },
      { toolName: "exec", target: "grep foo .", durationMs: 3500 },
      { toolName: "exec", target: "find .", durationMs: 4200 },
      { toolName: "exec", target: "ls -la", durationMs: 200 },
    ];

    // When the agent executes activity_inspect
    const tool = createActivityInspectTool({
      getRecentActivity: () => traceHistory,
      chainScore: 65, // degraded score
    });

    const response = await tool.execute("bdd-call-1", { limit: 5 });
    const payload = JSON.parse(response.content[0].text);

    // Then it receives clear visibility of its error count, total elapsed tool time, and circuit breaker cap
    expect(payload.totalCalls).toBe(5);
    expect(payload.errorCount).toBe(2);
    expect(payload.totalDurationMs).toBe(8200);
    expect(payload.circuitBreaker.isCapReached).toBe(true);
    expect(payload.circuitBreaker.tier).toBe("Bronze");
    expect(payload.circuitBreaker.callLimit).toBe(3);
  });
});
