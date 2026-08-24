/**
 * Adaptive Threshold Resolver & Dual-Metric Calculator.
 *
 * @dft
 * - A1 (pure-io-separation): Pure mathematical functions.
 * - A2 (determinism): Zero side-effects.
 * - A4 (dft-docs): Documented parameter semantics.
 * - A6 (check-result): Fully typed return structs.
 */

import type {
  DualMetricFootprint,
  EnvironmentContextVector,
  ResolvedCompactionThreshold,
} from "./types.js";

/** Default fallback density if session data is sparse (bytes per token in JSONL serialization). */
export const DEFAULT_JSONL_BYTES_PER_TOKEN = 12.5;

/** Default host disk threshold in bytes (10MB) to prevent SQLite lock contention. */
export const DEFAULT_HOST_DISK_LIMIT_BYTES = 10 * 1024 * 1024;

/**
 * Resolves the effective, environment-calibrated compaction threshold.
 *
 * Computes min(policyRatio * contextWindow, contextWindow - reserve, diskLimitInTokens).
 */
export function resolveCompactionThreshold(
  env: EnvironmentContextVector,
): ResolvedCompactionThreshold {
  const contextWindow = Math.max(1024, Math.floor(env.modelContextWindow));
  const reserveTokens = Math.max(0, Math.floor(env.reserveTokens));
  const tailTurnCount = Math.max(1, Math.floor(env.tailTurnCount ?? 2));
  const preTailTargetRatio = Math.max(0.01, Math.min(0.5, env.preTailCompressionTarget ?? 0.15));

  const hostDiskLimit = env.hostDiskLimitBytes ?? DEFAULT_HOST_DISK_LIMIT_BYTES;
  const diskEquivalentTokens = Math.floor(hostDiskLimit / DEFAULT_JSONL_BYTES_PER_TOKEN);

  let tokenTrigger: number;
  let reason: string;

  if (env.absoluteTokenTrigger !== undefined && env.absoluteTokenTrigger > 0) {
    tokenTrigger = Math.min(
      env.absoluteTokenTrigger,
      contextWindow - reserveTokens,
      diskEquivalentTokens,
    );
    reason = `absolute-override-clamped (${tokenTrigger} tokens)`;
  } else {
    const ratio = Math.max(0.1, Math.min(0.95, env.triggerRatio ?? 0.75));
    const ratioTrigger = Math.floor(contextWindow * ratio);
    const reactiveCap = Math.max(512, contextWindow - reserveTokens);

    if (diskEquivalentTokens < Math.min(ratioTrigger, reactiveCap)) {
      tokenTrigger = diskEquivalentTokens;
      reason = `host-disk-limit (${(hostDiskLimit / (1024 * 1024)).toFixed(1)}MB limit)`;
    } else if (ratioTrigger < reactiveCap) {
      tokenTrigger = ratioTrigger;
      reason = `model-ratio (${(ratio * 100).toFixed(0)}% of ${contextWindow} tokens)`;
    } else {
      tokenTrigger = reactiveCap;
      reason = `reactive-reserve-ceiling (${contextWindow} - ${reserveTokens} tokens)`;
    }
  }

  return {
    tokenTrigger: Math.max(512, tokenTrigger),
    byteLimit: hostDiskLimit,
    contextWindow,
    reserveTokens,
    tailTurnCount,
    preTailTargetRatio,
    reason,
  };
}

/**
 * Calculates empirical density (bytes per token) from message payload and token count.
 */
export function calculateEmpiricalDensity(
  tokens: number,
  bytes: number,
  fallbackDensity: number = DEFAULT_JSONL_BYTES_PER_TOKEN,
): number {
  if (tokens > 0 && bytes > 0 && Number.isFinite(tokens) && Number.isFinite(bytes)) {
    const density = bytes / tokens;
    if (density >= 1.0 && density <= 100.0) {
      return Number(density.toFixed(2));
    }
  }
  return fallbackDensity;
}

/**
 * Formats a number of bytes into a human-readable MB / KB string.
 */
export function formatBytes(bytes: number): string {
  if (bytes >= 100 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(0)}KB`;
  }
  return `${bytes}B`;
}

/**
 * Formats a token count into a human-readable K / M string.
 */
export function formatTokens(tokens: number): string {
  if (tokens >= 1_000_000) {
    return `${(tokens / 1_000_000).toFixed(1)}M`;
  }
  if (tokens >= 1_000) {
    return `${Math.round(tokens / 1_000)}K`;
  }
  return `${tokens}`;
}

/**
 * Computes dual-metric telemetry comparing before/after state in both tokens and on-disk payload.
 */
export function calculateDualMetricFootprint(
  tokensBefore: number,
  tokensAfter: number,
  bytesBefore: number,
  bytesAfter: number,
  densityOverride?: number,
): DualMetricFootprint {
  const safeTokensBefore = Math.max(1, Math.round(tokensBefore));
  const safeTokensAfter = Math.max(0, Math.round(tokensAfter));
  const safeBytesBefore = Math.max(1, Math.round(bytesBefore));
  const safeBytesAfter = Math.max(0, Math.round(bytesAfter));

  const tokenDeltaPercent = Number(
    (((safeTokensBefore - safeTokensAfter) / safeTokensBefore) * 100).toFixed(1),
  );
  const byteDeltaPercent = Number(
    (((safeBytesBefore - safeBytesAfter) / safeBytesBefore) * 100).toFixed(1),
  );

  const empiricalDensity =
    densityOverride ?? calculateEmpiricalDensity(safeTokensBefore, safeBytesBefore);

  const formattedSummary =
    `${formatTokens(safeTokensBefore)} tokens → ${formatTokens(safeTokensAfter)} ` +
    `(${tokenDeltaPercent >= 0 ? "-" : "+"}${Math.abs(tokenDeltaPercent)}%), ` +
    `${formatBytes(safeBytesBefore)} → ${formatBytes(safeBytesAfter)} ` +
    `(${byteDeltaPercent >= 0 ? "-" : "+"}${Math.abs(byteDeltaPercent)}%) | ` +
    `density: ${empiricalDensity} B/tok`;

  return {
    tokensBefore: safeTokensBefore,
    tokensAfter: safeTokensAfter,
    tokenDeltaPercent,
    bytesBefore: safeBytesBefore,
    bytesAfter: safeBytesAfter,
    byteDeltaPercent,
    empiricalDensityBytesPerToken: empiricalDensity,
    formattedSummary,
  };
}
