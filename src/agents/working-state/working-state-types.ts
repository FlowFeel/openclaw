/**
 * Working State Data Contracts — Immutable types for agent working context checkpoints.
 *
 * @dft
 * - A2 (explicit-invariant-modeling): typed schema with bounded arrays.
 */

export type SubGoalEntry = {
  readonly id: string;
  readonly description: string;
  readonly status: "pending" | "in_progress" | "done" | "failed";
};

export type SessionWorkingState = {
  readonly sessionId: string;
  readonly turnIndex: number;
  readonly activeFiles: readonly string[];
  readonly recentSearchQueries: readonly string[];
  readonly activePlanSummary?: string;
  readonly subGoalTree?: readonly SubGoalEntry[];
  readonly updatedAt: number;
};

export type WorkingStateCheckpointInput = {
  readonly sessionId: string;
  readonly turnIndex: number;
  readonly activeFiles?: readonly string[];
  readonly recentSearchQueries?: readonly string[];
  readonly activePlanSummary?: string;
  readonly subGoalTree?: readonly SubGoalEntry[];
};

export const MAX_WORKING_STATE_ACTIVE_FILES = 50;
export const MAX_WORKING_STATE_SEARCH_QUERIES = 20;
export const MAX_WORKING_STATE_PLAN_CHARS = 4000;
