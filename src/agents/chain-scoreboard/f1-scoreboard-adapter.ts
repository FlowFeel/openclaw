/**
 * Pure F1 Scoreboard Adapter for Self-State Envelope.
 * Decorates Frame1Headroom with live `chainMetrics` for peek("F1.chainMetrics").
 */

import type { ComputedChainMetrics } from "./chain-metrics-calculator.js";
import { classifyRewardTier, type RewardTier } from "./reward-track-governor.js";
import type { Frame1Headroom } from "../../infra/self-state-envelope/types.js";

export interface ChainMetricsSnapshot {
  readonly callCount: number;
  readonly spreadFactor: number;
  readonly convergenceDelta: string;
  readonly chainScore: number;
  readonly tier: RewardTier;
  readonly unlockedPrivilege: string;
}

/**
 * Purely constructs the structured ChainMetricsSnapshot.
 */
export function formatChainMetricsSnapshot(metrics: ComputedChainMetrics): ChainMetricsSnapshot {
  const tierInfo = classifyRewardTier(metrics.chainScore);
  return Object.freeze({
    callCount: metrics.callCount,
    spreadFactor: metrics.spreadFactor,
    convergenceDelta: metrics.convergenceDelta,
    chainScore: metrics.chainScore,
    tier: tierInfo.tier,
    unlockedPrivilege: tierInfo.unlockedPrivilege,
  });
}

/**
 * Purely attaches chainMetrics to a Frame1Headroom object.
 */
export function attachScoreboardToF1(
  f1: Frame1Headroom,
  metrics: ComputedChainMetrics,
): Frame1Headroom & { readonly chainMetrics: ChainMetricsSnapshot } {
  const snapshot = formatChainMetricsSnapshot(metrics);
  return Object.freeze({
    ...f1,
    chainMetrics: snapshot,
  });
}
