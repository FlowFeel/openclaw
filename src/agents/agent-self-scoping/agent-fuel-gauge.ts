/**
 * Pure fuel and execution spend accumulator for agentic self-scoping.
 * Tracks turns, elapsed wall-clock time, accumulated bytes, and call depth.
 */

export interface FuelSpendState {
  readonly chainTurnCount: number;
  readonly accumulatedElapsedMs: number;
  readonly accumulatedBytes: number;
  readonly activeDepth: number;
}

export interface FuelTelemetryTurnDelta {
  readonly elapsedMs: number;
  readonly responseBytes: number;
  readonly depthDelta?: number;
}

export interface FuelGaugeSnapshot {
  readonly chainTurn: number;
  readonly chainTimeSeconds: number;
  readonly chainBytes: number;
  readonly depth: number;
}

export function createInitialFuelState(initialDepth = 1): FuelSpendState {
  return {
    chainTurnCount: 0,
    accumulatedElapsedMs: 0,
    accumulatedBytes: 0,
    activeDepth: Math.max(1, initialDepth),
  };
}

/**
 * Purely accumulates fuel spend from a single completed turn delta.
 */
export function accumulateFuelSpend(
  prior: FuelSpendState,
  delta: FuelTelemetryTurnDelta,
): FuelSpendState {
  const nextTurn = prior.chainTurnCount + 1;
  const nextMs = prior.accumulatedElapsedMs + Math.max(0, delta.elapsedMs);
  const nextBytes = prior.accumulatedBytes + Math.max(0, delta.responseBytes);
  const nextDepth = Math.max(1, prior.activeDepth + (delta.depthDelta ?? 0));

  return Object.freeze({
    chainTurnCount: nextTurn,
    accumulatedElapsedMs: nextMs,
    accumulatedBytes: nextBytes,
    activeDepth: nextDepth,
  });
}

/**
 * Formats a high-density snapshot for attachment to tool return envelopes.
 */
export function formatFuelGaugeSnapshot(state: FuelSpendState): FuelGaugeSnapshot {
  return Object.freeze({
    chainTurn: state.chainTurnCount,
    chainTimeSeconds: Number((state.accumulatedElapsedMs / 1000).toFixed(1)),
    chainBytes: state.accumulatedBytes,
    depth: state.activeDepth,
  });
}
