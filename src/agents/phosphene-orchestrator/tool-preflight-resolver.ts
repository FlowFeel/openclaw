/**
 * Pure preflight resolver for Phosphene Tool Orchestrator.
 * Resolves sticky session CWD, topic defaulting ($/$_), and turn admission.
 */

import {
  resolveEffectiveCwd,
  type SessionCwdState,
} from "../exec-ergonomics/exec-cwd-state.js";
import {
  resolveTargetWithTopic,
  updateSessionTopic,
} from "../exec-ergonomics/session-topic-resolver.js";
import type { CompositeOrchestratorState } from "./orchestrator-state.js";
import type {
  PhospheneOrchestratorConfig,
  ToolInvocationContext,
} from "./orchestrator-types.js";

export interface PreflightResolution {
  readonly effectiveCwd: string;
  readonly resolvedCommand?: string;
  readonly resolvedTargetPath?: string;
  readonly nextState: CompositeOrchestratorState;
  readonly isAdmitted: boolean;
  readonly rejectionReason?: string;
}

/**
 * Purely resolves preflight context before dispatching a tool execution.
 */
export function resolveToolPreflight(
  state: CompositeOrchestratorState,
  ctx: ToolInvocationContext,
  config: PhospheneOrchestratorConfig,
): PreflightResolution {
  // 1. Check prompt turn budget admission
  if (state.budgetState.isExhausted) {
    return {
      effectiveCwd: state.cwdState.activeCwd,
      isAdmitted: false,
      rejectionReason: `[BANDWIDTH REJECTION: Maximum prompt turn allowance (${config.budget.maxTurnsPerPrompt}) reached. Final answer required.]`,
      nextState: state,
    };
  }

  // 2. Resolve sticky CWD and process any `cd` commands
  let nextCwdState: SessionCwdState = state.cwdState;
  let resolvedCommand = ctx.commandText;

  if (ctx.commandText) {
    const cwdResult = resolveEffectiveCwd(state.cwdState, undefined, ctx.commandText);
    if (cwdResult.kind === "mutated") {
      nextCwdState = cwdResult.nextState;
      resolvedCommand = ctx.commandText;
    }
  }

  // 3. Resolve topic subject ($_) for omitted file paths
  const topicRes = resolveTargetWithTopic(
    state.topicState,
    ctx.targetPath,
    state.cwdState.activeCwd,
  );
  const nextTopicState = ctx.targetPath
    ? updateSessionTopic(state.topicState, ctx.targetPath)
    : state.topicState;

  const nextState: CompositeOrchestratorState = Object.freeze({
    ...state,
    cwdState: nextCwdState,
    topicState: nextTopicState,
  });

  return Object.freeze({
    effectiveCwd: nextCwdState.activeCwd,
    resolvedCommand,
    resolvedTargetPath: topicRes.target,
    nextState,
    isAdmitted: true,
  });
}
