/**
 * Pure ambient advisory generator for agent bandwidth and search discipline.
 * Injects non-fatal cognitive steering reminders when turn or recon ceilings are reached.
 */

import type { ToolBudgetConfig, ToolBudgetState } from "./tool-budget-controller.js";

export function generateBandwidthAdvisory(
  state: ToolBudgetState,
  config: ToolBudgetConfig,
): string | undefined {
  if (!config.enableBudgetAdvisories) {
    return undefined;
  }

  if (state.isExhausted) {
    return `[BANDWIDTH ADVISORY: Prompt turn ceiling (${config.maxTurnsPerPrompt}/${config.maxTurnsPerPrompt}) reached. Deliver final answer to user now.]`;
  }

  if (state.reconBudgetStatus === "exhausted") {
    return `[BANDWIDTH ADVISORY: Default recon budget (${config.defaultReconBudget}/${config.defaultReconBudget}) reached. Synthesize findings or proceed directly to answer.]`;
  }

  return undefined;
}
