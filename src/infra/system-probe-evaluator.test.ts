import { describe, expect, it } from "vitest";
import {
  DEFAULT_PROBE_THRESHOLDS,
  evaluateSystemHealthState,
  type SystemMetricsSnapshot,
} from "./system-probe-evaluator.js";

function createNominalMetrics(overrides: Partial<SystemMetricsSnapshot> = {}): SystemMetricsSnapshot {
  return {
    heap: {
      usedBytes: 400 * 1024 * 1024,
      totalBytes: 512 * 1024 * 1024,
      limitBytes: 1024 * 1024 * 1024,
      utilizationRatio: 0.39, // 39%
    },
    eventLoop: {
      lagMs: 8,
      p95LagMs: 15,
    },
    disk: {
      usedPercent: 45,
      freeBytes: 15 * 1024 * 1024 * 1024,
      totalBytes: 30 * 1024 * 1024 * 1024,
    },
    activeSessions: 2,
    gatewayVersion: "1.0.0",
    activeProvider: "anthropic",
    activeModel: "claude-3-5-sonnet-20241022",
    ...overrides,
  };
}

describe("evaluateSystemHealthState (Pure DFT Verifier)", () => {
  it("classifies nominal metrics as healthy", () => {
    const metrics = createNominalMetrics();
    const result = evaluateSystemHealthState(metrics);
    expect(result).toEqual({ kind: "healthy" });
  });

  describe("Heap pressure evaluation", () => {
    it("returns degraded warning when heap utilization reaches or exceeds 75%", () => {
      const metrics = createNominalMetrics({
        heap: {
          usedBytes: 768 * 1024 * 1024,
          totalBytes: 800 * 1024 * 1024,
          limitBytes: 1024 * 1024 * 1024,
          utilizationRatio: 0.75,
        },
      });
      const result = evaluateSystemHealthState(metrics);
      expect(result.kind).toBe("degraded");
      if (result.kind === "degraded") {
        expect(result.critical).toBe(false);
        expect(result.reason).toContain("heap_warning");
        expect(result.reason).toContain("75.0%");
      }
    });

    it("returns degraded critical emergency when heap utilization reaches or exceeds 88%", () => {
      const metrics = createNominalMetrics({
        heap: {
          usedBytes: 900 * 1024 * 1024,
          totalBytes: 950 * 1024 * 1024,
          limitBytes: 1024 * 1024 * 1024,
          utilizationRatio: 0.89,
        },
      });
      const result = evaluateSystemHealthState(metrics);
      expect(result.kind).toBe("degraded");
      if (result.kind === "degraded") {
        expect(result.critical).toBe(true);
        expect(result.reason).toContain("heap_emergency");
        expect(result.reason).toContain("89.0%");
      }
    });
  });

  describe("Disk saturation evaluation", () => {
    it("returns degraded warning when disk reaches 85%", () => {
      const metrics = createNominalMetrics({
        disk: {
          usedPercent: 86.5,
          freeBytes: 4 * 1024 * 1024 * 1024,
          totalBytes: 30 * 1024 * 1024 * 1024,
        },
      });
      const result = evaluateSystemHealthState(metrics);
      expect(result.kind).toBe("degraded");
      if (result.kind === "degraded") {
        expect(result.critical).toBe(false);
        expect(result.reason).toContain("disk_warning");
        expect(result.reason).toContain("86.5%");
      }
    });

    it("returns degraded critical when disk reaches 95%", () => {
      const metrics = createNominalMetrics({
        disk: {
          usedPercent: 96.0,
          freeBytes: 1 * 1024 * 1024 * 1024,
          totalBytes: 30 * 1024 * 1024 * 1024,
        },
      });
      const result = evaluateSystemHealthState(metrics);
      expect(result.kind).toBe("degraded");
      if (result.kind === "degraded") {
        expect(result.critical).toBe(true);
        expect(result.reason).toContain("disk_critical");
        expect(result.reason).toContain("96.0%");
      }
    });
  });

  describe("Event loop latency evaluation", () => {
    it("returns degraded warning when event loop lag reaches 100ms", () => {
      const metrics = createNominalMetrics({
        eventLoop: { lagMs: 120 },
      });
      const result = evaluateSystemHealthState(metrics);
      expect(result.kind).toBe("degraded");
      if (result.kind === "degraded") {
        expect(result.critical).toBe(false);
        expect(result.reason).toContain("event_loop_warning");
        expect(result.reason).toContain("120ms");
      }
    });

    it("returns degraded critical when event loop lag reaches 500ms", () => {
      const metrics = createNominalMetrics({
        eventLoop: { lagMs: 650 },
      });
      const result = evaluateSystemHealthState(metrics);
      expect(result.kind).toBe("degraded");
      if (result.kind === "degraded") {
        expect(result.critical).toBe(true);
        expect(result.reason).toContain("event_loop_critical");
        expect(result.reason).toContain("650ms");
      }
    });
  });

  describe("Custom threshold override support", () => {
    it("respects customized threshold boundaries", () => {
      const customThresholds = {
        ...DEFAULT_PROBE_THRESHOLDS,
        heapWarningRatio: 0.60, // tighter 60% warning
      };
      const metrics = createNominalMetrics({
        heap: {
          usedBytes: 650 * 1024 * 1024,
          totalBytes: 700 * 1024 * 1024,
          limitBytes: 1024 * 1024 * 1024,
          utilizationRatio: 0.65,
        },
      });
      const defaultResult = evaluateSystemHealthState(metrics, DEFAULT_PROBE_THRESHOLDS);
      expect(defaultResult).toEqual({ kind: "healthy" });

      const customResult = evaluateSystemHealthState(metrics, customThresholds);
      expect(customResult.kind).toBe("degraded");
    });
  });
});
