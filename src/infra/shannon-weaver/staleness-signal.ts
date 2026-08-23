/**
 * Bayesian Staleness Signal Evaluator — Dynamic Threshold Epoch Mapping.
 *
 * Maps index creation/update timestamp into actionable Bayesian confidence signals
 * parameterized by dynamic epoch thresholds (tau_fresh, tau_aging).
 *
 * @dft
 * - Pure function (A1): No I/O, deterministic numeric evaluation.
 */

import type { StalenessSignalResult } from "./types.js";

export type StalenessThresholds = {
  readonly freshThresholdDays?: number; // Default: 7
  readonly agingThresholdDays?: number; // Default: 30
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Pure function evaluating the staleness signal of an index or cache timestamp.
 */
export function evaluateStalenessSignal(
  indexedAtMs: number,
  nowMs: number,
  thresholds: StalenessThresholds = {},
): StalenessSignalResult {
  const freshDays = thresholds.freshThresholdDays ?? 7;
  const agingDays = thresholds.agingThresholdDays ?? 30;

  const ageMs = Math.max(0, nowMs - indexedAtMs);
  const ageDays = Math.round((ageMs / MS_PER_DAY) * 10) / 10;

  if (ageDays <= freshDays) {
    return {
      classification: "fresh",
      ageDays,
      confidence: "high",
      actionableAdvice: "Index is fresh (< 7d); trust path offsets and symbols directly.",
      freshThresholdDays: freshDays,
      agingThresholdDays: agingDays,
    };
  }

  if (ageDays <= agingDays) {
    return {
      classification: "aging",
      ageDays,
      confidence: "moderate",
      actionableAdvice: "Index is moderately aging (7d - 30d); verify modified files before assuming exact line offsets.",
      freshThresholdDays: freshDays,
      agingThresholdDays: agingDays,
    };
  }

  return {
    classification: "stale",
    ageDays,
    confidence: "seed_only",
    actionableAdvice: "Index is stale (> 30d); treat entries as starting search clues and execute active verification.",
    freshThresholdDays: freshDays,
    agingThresholdDays: agingDays,
  };
}
