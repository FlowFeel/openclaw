import { describe, expect, it } from "vitest";
import { collectSystemProbeSnapshot } from "./system-probe-service.js";

describe("collectSystemProbeSnapshot", () => {
  it("returns healthy discriminated union with sanitized config and mock telemetry", async () => {
    const result = await collectSystemProbeSnapshot({
      getHeapMetrics: () => ({
        usedBytes: 300 * 1024 * 1024,
        totalBytes: 500 * 1024 * 1024,
        limitBytes: 1024 * 1024 * 1024,
        utilizationRatio: 0.30,
      }),
      getDiskMetrics: () => ({
        usedPercent: 50,
        freeBytes: 15 * 1024 * 1024 * 1024,
        totalBytes: 30 * 1024 * 1024 * 1024,
      }),
      getEventLoopMetrics: () => ({
        lagMs: 5,
        p95LagMs: 12,
      }),
      getConfig: () => ({
        channel: "telegram",
        botToken: "secret_12345",
        activeModel: "claude-3-5-sonnet",
      }),
      gatewayVersion: "2.1.0",
      activeProvider: "anthropic",
      activeModel: "claude-3-5-sonnet",
      activeSessions: 3,
    });

    expect(result.kind).toBe("healthy");
    if (result.kind === "healthy") {
      expect(result.gatewayVersion).toBe("2.1.0");
      expect(result.activeProvider).toBe("anthropic");
      expect(result.activeModel).toBe("claude-3-5-sonnet");
      expect(result.activeSessions).toBe(3);
      expect(result.heap.utilizationRatio).toBe(0.30);
      expect(result.disk.usedPercent).toBe(50);
      expect(result.eventLoop.lagMs).toBe(5);
      expect(result.config.botToken).toBe("[REDACTED]");
      expect(result.config.channel).toBe("telegram");
    }
  });

  it("returns degraded discriminated union with reason when heap threshold is breached", async () => {
    const result = await collectSystemProbeSnapshot({
      getHeapMetrics: () => ({
        usedBytes: 800 * 1024 * 1024,
        totalBytes: 850 * 1024 * 1024,
        limitBytes: 1024 * 1024 * 1024,
        utilizationRatio: 0.78,
      }),
      getDiskMetrics: () => ({
        usedPercent: 50,
        freeBytes: 15 * 1024 * 1024 * 1024,
        totalBytes: 30 * 1024 * 1024 * 1024,
      }),
      getEventLoopMetrics: () => ({
        lagMs: 5,
        p95LagMs: 10,
      }),
    });

    expect(result.kind).toBe("degraded");
    if (result.kind === "degraded") {
      expect(result.reason).toContain("heap_warning");
      expect(result.critical).toBe(false);
    }
  });

  it("returns error result when dependency throws unexpectedly", async () => {
    const result = await collectSystemProbeSnapshot({
      getHeapMetrics: () => {
        throw new Error("V8 metrics unavailable");
      },
    });

    expect(result.kind).toBe("error");
    if (result.kind === "error") {
      expect(result.message).toContain("V8 metrics unavailable");
    }
  });
});
