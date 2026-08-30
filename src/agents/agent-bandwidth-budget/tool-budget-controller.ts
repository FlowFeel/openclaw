/**
 * Pure state machine and turn budget controller for agent bandwidth management.
 * Tracks prompt-level turn spending, recon allowance, and budget exhaustion.
 */

export interface ToolBudgetConfig {
  readonly maxTurnsPerPrompt: number;
  readonly defaultReconBudget: number;
  readonly maxFileIngestBytes: number;
  readonly emitBandwidthTelemetry: boolean;
  readonly enableBudgetAdvisories: boolean;
}

export const DEFAULT_TOOL_BUDGET_CONFIG: ToolBudgetConfig = Object.freeze({
  maxTurnsPerPrompt: 3,
  defaultReconBudget: 2,
  maxFileIngestBytes: 16384,
  emitBandwidthTelemetry: true,
  enableBudgetAdvisories: true,
});

export type ReconBudgetStatus = "active" | "exhausted" | "exceeded";

export interface ToolBudgetState {
  readonly turnsUsed: number;
  readonly turnsRemaining: number;
  readonly reconBudgetStatus: ReconBudgetStatus;
  readonly isExhausted: boolean;
  readonly bytesIngested: number;
}

export function createInitialToolBudgetState(
  config: ToolBudgetConfig = DEFAULT_TOOL_BUDGET_CONFIG,
): ToolBudgetState {
  const maxTurns = Math.max(1, config.maxTurnsPerPrompt);
  return Object.freeze({
    turnsUsed: 0,
    turnsRemaining: maxTurns,
    reconBudgetStatus: "active",
    isExhausted: false,
    bytesIngested: 0,
  });
}

/**
 * Purely evaluates turn budget progression after a completed tool turn.
 */
export function recordToolTurn(
  prior: ToolBudgetState,
  consumedBytes = 0,
  config: ToolBudgetConfig = DEFAULT_TOOL_BUDGET_CONFIG,
): ToolBudgetState {
  const nextTurnsUsed = prior.turnsUsed + 1;
  const nextTurnsRemaining = Math.max(0, config.maxTurnsPerPrompt - nextTurnsUsed);
  const nextBytes = prior.bytesIngested + Math.max(0, consumedBytes);

  let reconStatus: ReconBudgetStatus = "active";
  if (nextTurnsUsed === config.defaultReconBudget) {
    reconStatus = "exhausted";
  } else if (nextTurnsUsed > config.defaultReconBudget) {
    reconStatus = "exceeded";
  }

  const isExhausted = nextTurnsUsed >= config.maxTurnsPerPrompt;

  return Object.freeze({
    turnsUsed: nextTurnsUsed,
    turnsRemaining: nextTurnsRemaining,
    reconBudgetStatus: reconStatus,
    isExhausted,
    bytesIngested: nextBytes,
  });
}
