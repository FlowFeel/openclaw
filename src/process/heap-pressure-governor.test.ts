import { describe, expect, it, vi } from "vitest";
import {
  evaluateHeapMetrics,
  HeapPressureGovernor,
} from "./heap-pressure-governor.js";

describe("heap-pressure-governor", () => {
  describe("evaluateHeapMetrics", () => {
    it("classifies nominal memory usage (< 75%)", () => {
      const result = evaluateHeapMetrics({
        heapUsedBytes: 500 * 1024 * 1024,
        heapLimitBytes: 1000 * 1024 * 1024, // 50%
      });
      expect(result.tier).toBe("nominal");
      expect(result.usedRatio).toBeCloseTo(0.5);
    });

    it("classifies soft warning tier (>= 75% and < 88%)", () => {
      const result = evaluateHeapMetrics({
        heapUsedBytes: 760 * 1024 * 1024,
        heapLimitBytes: 1000 * 1024 * 1024, // 76%
      });
      expect(result.tier).toBe("soft_warning");
      expect(result.usedRatio).toBeCloseTo(0.76);
    });

    it("classifies hard emergency tier (>= 88%)", () => {
      const result = evaluateHeapMetrics({
        heapUsedBytes: 900 * 1024 * 1024,
        heapLimitBytes: 1000 * 1024 * 1024, // 90%
      });
      expect(result.tier).toBe("hard_emergency");
      expect(result.usedRatio).toBeCloseTo(0.9);
    });
  });

  describe("HeapPressureGovernor state machine", () => {
    it("triggers soft pressure handlers upon crossing 75% threshold", async () => {
      const governor = new HeapPressureGovernor({ cooldownMs: 1000 });
      const softSpy = vi.fn();
      const hardSpy = vi.fn();

      governor.onSoftPressure(softSpy);
      governor.onHardEmergency(hardSpy);

      // Check with 50% usage
      await governor.checkPressure(() => ({
        heapUsedBytes: 500,
        heapLimitBytes: 1000,
      }));
      expect(softSpy).not.toHaveBeenCalled();
      expect(hardSpy).not.toHaveBeenCalled();
      expect(governor.getCurrentTier()).toBe("nominal");

      // Check with 80% usage (soft threshold)
      await governor.checkPressure(() => ({
        heapUsedBytes: 800,
        heapLimitBytes: 1000,
      }));
      expect(softSpy).toHaveBeenCalledTimes(1);
      expect(hardSpy).not.toHaveBeenCalled();
      expect(governor.getCurrentTier()).toBe("soft_warning");
    });

    it("triggers hard emergency handlers upon crossing 88% threshold", async () => {
      const governor = new HeapPressureGovernor({ cooldownMs: 1000 });
      const softSpy = vi.fn();
      const hardSpy = vi.fn();

      governor.onSoftPressure(softSpy);
      governor.onHardEmergency(hardSpy);

      // Check with 90% usage (hard threshold)
      await governor.checkPressure(() => ({
        heapUsedBytes: 900,
        heapLimitBytes: 1000,
      }));
      expect(hardSpy).toHaveBeenCalledTimes(1);
      expect(softSpy).not.toHaveBeenCalled();
      expect(governor.getCurrentTier()).toBe("hard_emergency");
    });

    it("respects hysteresis and does not reset to nominal until below 70%", async () => {
      const governor = new HeapPressureGovernor({
        softThresholdRatio: 0.75,
        hysteresisRatio: 0.7,
      });

      governor.recordEvaluation(
        { tier: "soft_warning", usedRatio: 0.78, heapUsedBytes: 780, heapLimitBytes: 1000 },
        1000,
      );
      expect(governor.getCurrentTier()).toBe("soft_warning");

      // Drops to 72% (below 75% but above hysteresis 70%) -> stays in soft_warning
      governor.recordEvaluation(
        { tier: "nominal", usedRatio: 0.72, heapUsedBytes: 720, heapLimitBytes: 1000 },
        1050,
      );
      expect(governor.getCurrentTier()).toBe("soft_warning");

      // Drops to 65% (below hysteresis 70%) -> resets to nominal
      governor.recordEvaluation(
        { tier: "nominal", usedRatio: 0.65, heapUsedBytes: 650, heapLimitBytes: 1000 },
        1100,
      );
      expect(governor.getCurrentTier()).toBe("nominal");
    });

    it("allows unregistering pressure handlers", async () => {
      const governor = new HeapPressureGovernor();
      const spy = vi.fn();
      const unsubscribe = governor.onSoftPressure(spy);

      unsubscribe();

      await governor.checkPressure(() => ({
        heapUsedBytes: 800,
        heapLimitBytes: 1000,
      }));
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
