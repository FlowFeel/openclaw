/**
 * Pure composite state accumulator for Phosphene Tool Orchestrator.
 * Encapsulates session CWD, fuel spend, turn budget, and entropy velocity.
 */

import {
  createInitialSessionCwdState,
  type SessionCwdState,
} from "../exec-ergonomics/exec-cwd-state.js";
import {
  createInitialSessionTopicState,
  type SessionTopicState,
} from "../exec-ergonomics/session-topic-resolver.js";
import {
  createInitialFuelState,
  type FuelSpendState,
} from "../agent-self-scoping/agent-fuel-gauge.js";
import {
  createInitialToolBudgetState,
  type ToolBudgetConfig,
  type ToolBudgetState,
} from "../agent-bandwidth-budget/tool-budget-controller.js";
import {
  createInitialEntropySensor,
  type EntropyVelocityState,
} from "../agent-self-scoping/entropy-velocity-sensor.js";
import type { PhospheneOrchestratorConfig } from "./orchestrator-types.js";

export interface CompositeOrchestratorState {
  readonly sessionId: string;
  readonly cwdState: SessionCwdState;
  readonly topicState: SessionTopicState;
  readonly fuelState: FuelSpendState;
  readonly budgetState: ToolBudgetState;
  readonly entropyState: EntropyVelocityState;
}

export function createInitialOrchestratorState(
  sessionId: string,
  config: PhospheneOrchestratorConfig,
): CompositeOrchestratorState {
  return Object.freeze({
    sessionId,
    cwdState: createInitialSessionCwdState(config.defaultWorkspacePath),
    topicState: createInitialSessionTopicState(),
    fuelState: createInitialFuelState(1),
    budgetState: createInitialToolBudgetState(config.budget),
    entropyState: createInitialEntropySensor(5),
  });
}
