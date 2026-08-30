/**
 * Pure telemetry envelope decorator for agent bandwidth and search efficiency.
 * Produces structured `_bandwidth` metadata snapshots for tool returns and gateway logs.
 */

import type { SearchEfficiencyGrade } from "./search-execution-policy.js";
import type { ReconBudgetStatus, ToolBudgetState } from "./tool-budget-controller.js";

export interface BandwidthTelemetryEnvelope {
  readonly _bandwidth: {
    readonly turns_used: number;
    readonly turns_remaining: number;
    readonly recon_budget: ReconBudgetStatus;
    readonly bytes_ingested: number;
    readonly search_efficiency: SearchEfficiencyGrade;
  };
}

/**
 * Purely formats the `_bandwidth` telemetry snapshot.
 */
export function formatBandwidthTelemetry(
  state: ToolBudgetState,
  efficiency: SearchEfficiencyGrade = "optimal",
): BandwidthTelemetryEnvelope {
  return Object.freeze({
    _bandwidth: Object.freeze({
      turns_used: state.turnsUsed,
      turns_remaining: state.turnsRemaining,
      recon_budget: state.reconBudgetStatus,
      bytes_ingested: state.bytesIngested,
      search_efficiency: efficiency,
    }),
  });
}

/**
 * Purely attaches the `_bandwidth` telemetry property to any existing tool return payload.
 */
export function decorateWithBandwidthTelemetry<T extends Record<string, unknown>>(
  payload: T,
  state: ToolBudgetState,
  efficiency: SearchEfficiencyGrade = "optimal",
): T & BandwidthTelemetryEnvelope {
  const telemetry = formatBandwidthTelemetry(state, efficiency);
  return Object.freeze({
    ...payload,
    ...telemetry,
  });
}
