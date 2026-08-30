/**
 * Pure mathematical scoring engine for Shannon-Weaver Agent Chain Precision & Convergence.
 * Computes spreadFactor, chainScore (0-100), and convergenceDelta.
 */

import { classifyRewardTier } from "./reward-track-governor.js";

export interface RawChainSample {
  readonly toolName: string;
  readonly target?: string;
  readonly isError?: boolean;
  readonly durationMs?: number;
}

export interface ComputedChainMetrics {
  readonly callCount: number;
  readonly callLimit: number;
  readonly remainingCalls: number;
  readonly isCapReached: boolean;
  readonly spreadFactor: number;
  readonly convergenceDelta: string;
  readonly chainScore: number;
  readonly runwayRemainingSeconds?: number;
}

export interface ChainMetricsOptions {
  readonly timeoutSeconds?: number;
  readonly turnStartMs?: number;
  readonly nowMs?: number;
}

/**
 * Purely computes the spread factor, chain score (0-100), call budget, and convergence delta.
 */
export function calculateChainMetrics(
  samples: readonly RawChainSample[],
  options: ChainMetricsOptions = {},
): ComputedChainMetrics {
  const callCount = samples.length;

  let spreadFactor = 1.0;
  let chainScore = 100;
  let convergenceDelta = "+0%";

  if (callCount > 0) {
    // 1. Calculate unique targets/commands vs total calls
    const uniqueTargets = new Set(
      samples.map((s) => `${s.toolName}:${(s.target ?? "").trim().toLowerCase()}`),
    );
    const spreadRatio = uniqueTargets.size / callCount;
    spreadFactor = Math.round(spreadRatio * 10) / 10;

    // 2. Count errors
    const errorCount = samples.filter((s) => Boolean(s.isError)).length;

    // 3. Compute weighted chainScore (0-100)
    const callPenalty = Math.max(0, (callCount - 1) * 8);
    const spreadPenalty = Math.max(0, Math.round((spreadFactor - 1.0) * 15));
    const errorPenalty = errorCount * 12;

    const rawScore = 100 - callPenalty - spreadPenalty - errorPenalty;
    chainScore = Math.max(0, Math.min(100, rawScore));

    // 4. Compute convergence delta
    if (callCount <= 3) {
      const gain = (4 - callCount) * 6;
      convergenceDelta = `+${gain}%`;
    } else {
      const drop = (callCount - 3) * 8;
      convergenceDelta = `-${drop}%`;
    }
  }

  const tier = classifyRewardTier(chainScore);
  const callLimit = tier.callLimit;
  const remainingCalls = Math.max(0, callLimit - callCount);
  const isCapReached = callCount >= callLimit;

  let runwayRemainingSeconds: number | undefined;
  if (options.timeoutSeconds && options.turnStartMs) {
    const now = options.nowMs ?? Date.now();
    const elapsedSeconds = Math.max(0, Math.floor((now - options.turnStartMs) / 1000));
    runwayRemainingSeconds = Math.max(0, options.timeoutSeconds - elapsedSeconds);
  }

  return Object.freeze({
    callCount,
    callLimit,
    remainingCalls,
    isCapReached,
    spreadFactor,
    convergenceDelta,
    chainScore,
    ...(runwayRemainingSeconds !== undefined ? { runwayRemainingSeconds } : {}),
  });
}
