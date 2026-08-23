import { describe, expect, it } from "vitest";
import { evaluateStalenessSignal } from "./staleness-signal.js";

describe("Tier 1: evaluateStalenessSignal (Parameterized Bayesian Staleness)", () => {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const nowMs = 1787500000000;

  it("classifies index under fresh threshold as high confidence", () => {
    const indexedAtMs = nowMs - 3 * MS_PER_DAY; // 3 days old
    const signal = evaluateStalenessSignal(indexedAtMs, nowMs);

    expect(signal.classification).toBe("fresh");
    expect(signal.confidence).toBe("high");
    expect(signal.ageDays).toBe(3);
    expect(signal.actionableAdvice).toContain("trust path offsets and symbols directly");
  });

  it("classifies index between fresh and aging thresholds as moderate confidence", () => {
    const indexedAtMs = nowMs - 14 * MS_PER_DAY; // 14 days old
    const signal = evaluateStalenessSignal(indexedAtMs, nowMs);

    expect(signal.classification).toBe("aging");
    expect(signal.confidence).toBe("moderate");
    expect(signal.ageDays).toBe(14);
    expect(signal.actionableAdvice).toContain("verify modified files");
  });

  it("classifies index beyond aging threshold as seed_only confidence", () => {
    const indexedAtMs = nowMs - 90 * MS_PER_DAY; // 90 days old
    const signal = evaluateStalenessSignal(indexedAtMs, nowMs);

    expect(signal.classification).toBe("stale");
    expect(signal.confidence).toBe("seed_only");
    expect(signal.ageDays).toBe(90);
    expect(signal.actionableAdvice).toContain("treat entries as starting search clues");
  });

  it("supports custom dynamic thresholds (e.g. fresh=1d, aging=5d)", () => {
    const indexedAtMs = nowMs - 3 * MS_PER_DAY; // 3 days old
    const signal = evaluateStalenessSignal(indexedAtMs, nowMs, {
      freshThresholdDays: 1,
      agingThresholdDays: 5,
    });

    expect(signal.classification).toBe("aging");
    expect(signal.freshThresholdDays).toBe(1);
    expect(signal.agingThresholdDays).toBe(5);
  });
});
