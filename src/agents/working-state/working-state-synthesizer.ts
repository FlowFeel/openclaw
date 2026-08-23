/**
 * Pure Working State Synthesizer & Bounded Trimmer.
 *
 * Formats synthetic context blocks for turn prompt initialization on restart recovery
 * and enforces strict entropy bounds on checkpoint payloads.
 *
 * @dft
 * - A1 (pure-io-separation): pure string formatting and array slicing.
 * - Axiom P0.6 (bounded-checkpoint-entropy): strictly limits array lengths and character counts.
 */

import {
  MAX_WORKING_STATE_ACTIVE_FILES,
  MAX_WORKING_STATE_PLAN_CHARS,
  MAX_WORKING_STATE_SEARCH_QUERIES,
  type SessionWorkingState,
  type WorkingStateCheckpointInput,
} from "./working-state-types.js";

/**
 * Pure function bounding entropy of checkpoint inputs to prevent SQLite storage blowup.
 */
export function normalizeWorkingStateInput(
  input: WorkingStateCheckpointInput,
  nowMs: number = Date.now(),
): SessionWorkingState {
  const activeFiles = (input.activeFiles ?? [])
    .slice(-MAX_WORKING_STATE_ACTIVE_FILES)
    .filter((file): file is string => typeof file === "string" && file.trim().length > 0);

  const recentSearchQueries = (input.recentSearchQueries ?? [])
    .slice(-MAX_WORKING_STATE_SEARCH_QUERIES)
    .filter((q): q is string => typeof q === "string" && q.trim().length > 0);

  const activePlanSummary = input.activePlanSummary
    ? input.activePlanSummary.trim().slice(0, MAX_WORKING_STATE_PLAN_CHARS)
    : undefined;

  const subGoalTree = input.subGoalTree ? input.subGoalTree.slice(-20) : undefined;

  return {
    sessionId: input.sessionId,
    turnIndex: Math.max(0, input.turnIndex),
    activeFiles,
    recentSearchQueries,
    activePlanSummary: activePlanSummary && activePlanSummary.length > 0 ? activePlanSummary : undefined,
    subGoalTree,
    updatedAt: nowMs,
  };
}

/**
 * Pure generator producing formatted synthetic context block for prompt replay.
 */
export function formatWorkingStateRecoveryPrompt(state: SessionWorkingState): string {
  const sections: string[] = [
    `[RECONSTRUCTED WORKING CONTEXT — Turn ${state.turnIndex}]`,
  ];

  if (state.activePlanSummary) {
    sections.push(`Active Plan:\n${state.activePlanSummary}`);
  }

  if (state.activeFiles.length > 0) {
    sections.push(`Active Working Files:\n- ${state.activeFiles.join("\n- ")}`);
  }

  if (state.recentSearchQueries.length > 0) {
    sections.push(`Recent Search Context:\n- ${state.recentSearchQueries.join("\n- ")}`);
  }

  if (state.subGoalTree && state.subGoalTree.length > 0) {
    const goals = state.subGoalTree
      .map((g) => `[${g.status.toUpperCase()}] ${g.id}: ${g.description}`)
      .join("\n");
    sections.push(`Task Graph:\n${goals}`);
  }

  return sections.join("\n\n");
}
