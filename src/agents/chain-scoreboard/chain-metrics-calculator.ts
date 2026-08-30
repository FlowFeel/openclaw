/**
 * Pure mathematical scoring engine for Shannon-Weaver Agent Chain Precision & Convergence.
 * Computes spreadFactor, chainScore (0-100), and convergenceDelta.
 */

export interface RawChainSample {
  readonly toolName: string;
  readonly target?: string;
  readonly isError?: boolean;
}

export interface ComputedChainMetrics {
  readonly callCount: number;
  readonly spreadFactor: number;
  readonly convergenceDelta: string;
  readonly chainScore: number;
}

/**
 * Purely computes the spread factor, chain score (0-100), and convergence delta.
 */
export function calculateChainMetrics(samples: readonly RawChainSample[]): ComputedChainMetrics {
  const callCount = samples.length;
  if (callCount === 0) {
    return Object.freeze({
      callCount: 0,
      spreadFactor: 1.0,
      convergenceDelta: "+0%",
      chainScore: 100,
    });
  }

  // 1. Calculate unique targets/commands vs total calls
  const uniqueTargets = new Set(
    samples.map((s) => `${s.toolName}:${(s.target ?? "").trim().toLowerCase()}`),
  );
  const spreadRatio = uniqueTargets.size / callCount;
  const spreadFactor = Math.round(spreadRatio * 10) / 10;

  // 2. Count errors
  const errorCount = samples.filter((s) => Boolean(s.isError)).length;

  // 3. Compute weighted chainScore (0-100)
  // Rewarding low call count (<=3), tight target spread (1.0), and zero errors
  const callPenalty = Math.max(0, (callCount - 1) * 8);
  const spreadPenalty = Math.max(0, Math.round((spreadFactor - 1.0) * 15));
  const errorPenalty = errorCount * 12;

  const rawScore = 100 - callPenalty - spreadPenalty - errorPenalty;
  const chainScore = Math.max(0, Math.min(100, rawScore));

  // 4. Compute convergence delta
  let convergenceDelta: string;
  if (callCount <= 3) {
    const gain = (4 - callCount) * 6;
    convergenceDelta = `+${gain}%`;
  } else {
    const drop = (callCount - 3) * 8;
    convergenceDelta = `-${drop}%`;
  }

  return Object.freeze({
    callCount,
    spreadFactor,
    convergenceDelta,
    chainScore,
  });
}
