/**
 * Pure Micro-Scoreboard Dashboard Formatter for Shannon-Weaver Gamified Agent Telemetry.
 * Strict Shannon-Weaver compliance: Consumes <= 25 prompt tokens per banner.
 */

import type { ComputedChainMetrics } from "./chain-metrics-calculator.js";
import { classifyRewardTier } from "./reward-track-governor.js";

/**
 * Formats the ultra-compact micro-scoreboard banner for prompt turn injection.
 * Format: 📊 CHAIN: Calls: {callCount} | Spread: {spread} | Score: {score} {badge} {TIER} ({delta} ↑)
 */
export function formatScoreboardBanner(metrics: ComputedChainMetrics): string {
  const tierInfo = classifyRewardTier(metrics.chainScore);
  const runwaySuffix =
    metrics.runwayRemainingSeconds !== undefined
      ? `${metrics.runwayRemainingSeconds}s left`
      : `${metrics.convergenceDelta} ↑`;
  return `📊 CHAIN: Calls: ${metrics.callCount}/${metrics.callLimit} | Spread: ${metrics.spreadFactor.toFixed(1)} | Score: ${metrics.chainScore} ${tierInfo.badge} ${tierInfo.tier.toUpperCase()} (${runwaySuffix})`;
}

/**
 * Purely estimates the prompt token footprint of the visual banner.
 */
export function estimateBannerTokenCount(banner: string): number {
  return Math.max(1, Math.ceil(banner.length / 4));
}
