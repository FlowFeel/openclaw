import { beforeEach, describe, expect, it } from "vitest";
import {
  clearAllSessionUsageForTest,
  getMonotonicSessionUsage,
  recordMonotonicSessionUsage,
  resetMonotonicSessionUsage,
} from "./session-usage-accumulator.js";

describe("CAP-GAUGE-01: Monotonic Session Usage Accumulator", () => {
  beforeEach(() => {
    clearAllSessionUsageForTest();
  });

  describe("Axiom G1: Monotonic Accumulation", () => {
    it("accumulates maximum tokens observed across turns", () => {
      const sessionId = "session-1";

      const t1 = recordMonotonicSessionUsage({ sessionId, sampleTokens: 1000 });
      expect(t1.usedTokens).toBe(1000);
      expect(t1.confidence).toBe("live");
      expect(t1.isStale).toBe(false);

      const t2 = recordMonotonicSessionUsage({ sessionId, sampleTokens: 2500 });
      expect(t2.usedTokens).toBe(2500);
      expect(t2.confidence).toBe("live");

      // Provider reporting a lower number (e.g. transient cache glitch) must NOT lower the gauge
      const t3 = recordMonotonicSessionUsage({ sessionId, sampleTokens: 1200 });
      expect(t3.usedTokens).toBe(2500);
      expect(t3.confidence).toBe("live");
    });
  });

  describe("Axiom G2: Signal vs Noise Distinction", () => {
    it("reports 'none' confidence when no observations exist", () => {
      const result = recordMonotonicSessionUsage({
        sessionId: "session-empty",
        sampleTokens: undefined,
      });
      expect(result.usedTokens).toBe(0);
      expect(result.confidence).toBe("none");
      expect(result.isStale).toBe(false);
    });

    it("retains last known usage and tags 'stale' when fallback turn omits usage metadata", () => {
      const sessionId = "session-fallback";

      recordMonotonicSessionUsage({ sessionId, sampleTokens: 4500 });

      // Fallback turn returns undefined sample
      const fallbackTurn = recordMonotonicSessionUsage({ sessionId, sampleTokens: undefined });
      expect(fallbackTurn.usedTokens).toBe(4500);
      expect(fallbackTurn.confidence).toBe("stale");
      expect(fallbackTurn.isStale).toBe(true);

      // Subsequent live turn restores live confidence and raises gauge
      const nextLive = recordMonotonicSessionUsage({ sessionId, sampleTokens: 5200 });
      expect(nextLive.usedTokens).toBe(5200);
      expect(nextLive.confidence).toBe("live");
      expect(nextLive.isStale).toBe(false);
    });
  });

  describe("Axiom G4: Explicit Reset Boundary", () => {
    it("resets accumulator to 0 when explicitly cleared", () => {
      const sessionId = "session-reset";
      recordMonotonicSessionUsage({ sessionId, sampleTokens: 8000 });

      expect(getMonotonicSessionUsage(sessionId)?.usedTokens).toBe(8000);

      resetMonotonicSessionUsage(sessionId);

      expect(getMonotonicSessionUsage(sessionId)).toBeUndefined();

      const afterReset = recordMonotonicSessionUsage({ sessionId, sampleTokens: undefined });
      expect(afterReset.usedTokens).toBe(0);
      expect(afterReset.confidence).toBe("none");
    });
  });

  describe("Anonymous Sessions (no sessionId)", () => {
    it("returns immediate sample without persistent state", () => {
      const r1 = recordMonotonicSessionUsage({ sampleTokens: 300 });
      expect(r1.usedTokens).toBe(300);
      expect(r1.confidence).toBe("live");

      const r2 = recordMonotonicSessionUsage({ sampleTokens: undefined });
      expect(r2.usedTokens).toBe(0);
      expect(r2.confidence).toBe("none");
    });
  });
});
