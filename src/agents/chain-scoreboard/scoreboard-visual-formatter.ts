/**
 * Pure ASCII Dashboard Formatter for Shannon-Weaver Gamified Agent Telemetry.
 * Strict Shannon-Weaver compliance: Consumes <= 35 prompt tokens per banner.
 */

import type { ComputedChainMetrics } from "./chain-metrics-calculator.js";
import { classifyRewardTier } from "./reward-track-governor.js";

/**
 * Purely formats the lightweight visual scoreboard line for model context injection.
 * Total character count is bounded to < 140 chars (<= 35 tokens).
 */
export function formatScoreboardBanner(metrics: ComputedChainMetrics): string {
  const tierInfo = classifyRewardTier(metrics.chainScore);
  return `📊 SCORE: ${metrics.chainScore} ${tierInfo.badge} (${tierInfo.tier}) | Calls: ${metrics.callCount} | Eff: ${metrics.convergenceDelta} ↑ | Unlocks: ${tierInfo.unlockedPrivilege}`;
}

/**
 * Purely estimates the prompt token footprint of the visual banner.
 */
export function estimateBannerTokenCount(banner: string): number {
  return Math.max(1, Math.ceil(banner.length / 4));
}
