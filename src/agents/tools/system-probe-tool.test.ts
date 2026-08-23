import { describe, expect, it } from "vitest";
import { createSystemProbeTool } from "./system-probe-tool.js";
import type { SystemProbeResult } from "../../infra/system-probe-service.js";

describe("system_probe agent tool", () => {
  it("has the expected tool descriptor", () => {
    const tool = createSystemProbeTool();
    expect(tool.name).toBe("system_probe");
    expect(tool.description).toContain("Query live gateway runtime health");
    expect(tool.parameters).toBeDefined();
  });

  it("executes and returns a formatted JSON tool result with discriminated health union", async () => {
    const tool = createSystemProbeTool({
      getHeapMetrics: () => ({
        usedBytes: 400 * 1024 * 1024,
        totalBytes: 800 * 1024 * 1024,
        limitBytes: 1024 * 1024 * 1024,
        utilizationRatio: 0.39,
      }),
      getDiskMetrics: () => ({
        usedPercent: 40,
        freeBytes: 18 * 1024 * 1024 * 1024,
        totalBytes: 30 * 1024 * 1024 * 1024,
      }),
      getEventLoopMetrics: () => ({
        lagMs: 8,
        p95LagMs: 15,
      }),
      getConfig: () => ({
        channel: "telegram",
        apiKey: "sk-ant-secret-12345",
      }),
      gatewayVersion: "1.0.0",
      activeProvider: "anthropic",
      activeModel: "claude-3-5-sonnet",
    });

    const result = await tool.execute("call_probe_1", {});
    expect(result.content).toBeDefined();
    expect(result.details).toBeDefined();

    const details = result.details as SystemProbeResult;
    expect(details.kind).toBe("healthy");
    if (details.kind === "healthy") {
      expect(details.gatewayVersion).toBe("1.0.0");
      expect(details.activeProvider).toBe("anthropic");
      expect(details.activeModel).toBe("claude-3-5-sonnet");
      expect(details.heap.utilizationRatio).toBe(0.39);
      expect(details.config.apiKey).toBe("[REDACTED]");
    }
  });
});
