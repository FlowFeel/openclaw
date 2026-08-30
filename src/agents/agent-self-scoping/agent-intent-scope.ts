/**
 * Pure state machine for agentic intent scoping (`scope_intent` and `scope_resolve`).
 * Enforces tactical turn budgets and synthesizes non-fatal scope advisories upon exhaustion.
 */

export type ScopeStrategy = "targeted_search" | "broad_survey" | "deep_inspection" | "refactoring";

export interface IntentScopeState {
  readonly id: string;
  readonly intent: string;
  readonly strategy: ScopeStrategy;
  readonly maxTurns: number;
  readonly turnsExecuted: number;
  readonly active: boolean;
  readonly outcome?: {
    readonly status: "resolved" | "abandoned" | "budget_exhausted";
    readonly notes?: string;
  };
}

export function createIntentScope(params: {
  id?: string;
  intent: string;
  maxTurns?: number;
  strategy?: ScopeStrategy;
}): IntentScopeState {
  return Object.freeze({
    id: params.id ?? `scope_${Date.now()}`,
    intent: params.intent.trim(),
    strategy: params.strategy ?? "targeted_search",
    maxTurns: Math.max(1, params.maxTurns ?? 5),
    turnsExecuted: 0,
    active: true,
  });
}

export interface ScopeStepResult {
  readonly nextState: IntentScopeState;
  readonly advisoryNotice?: string;
}

/**
 * Records an execution turn against the active scope and checks for budget exhaustion advisory.
 */
export function recordTurnInScope(state: IntentScopeState): ScopeStepResult {
  if (!state.active) {
    return { nextState: state };
  }

  const nextTurns = state.turnsExecuted + 1;
  const budgetReached = nextTurns >= state.maxTurns;

  const nextState: IntentScopeState = Object.freeze({
    ...state,
    turnsExecuted: nextTurns,
    active: !budgetReached,
    ...(budgetReached
      ? { outcome: { status: "budget_exhausted" as const, notes: "Target turn budget reached" } }
      : {}),
  });

  const advisoryNotice = budgetReached
    ? `[SCOPE ADVISORY: Target turn budget (${state.maxTurns}/${state.maxTurns}) reached for intent: "${state.intent}". Evaluate current findings or adjust hypothesis before further exploratory turns.]`
    : undefined;

  return { nextState, advisoryNotice };
}

/**
 * Explicitly resolves or concludes an active scope.
 */
export function resolveIntentScope(
  state: IntentScopeState,
  outcomeStatus: "resolved" | "abandoned",
  notes?: string,
): IntentScopeState {
  return Object.freeze({
    ...state,
    active: false,
    outcome: {
      status: outcomeStatus,
      notes: notes?.trim(),
    },
  });
}
