/**
 * Pure session topic resolver.
 * Implements the Perl `$_` default subject variable for implicit path and command scoping.
 */
import path from "node:path";

export interface SessionTopicState {
  readonly currentTopic: string | null;
  readonly topicHistory: readonly string[];
}

export function createInitialSessionTopicState(): SessionTopicState {
  return {
    currentTopic: null,
    topicHistory: [],
  };
}

export function updateSessionTopic(
  state: SessionTopicState,
  newTopic: string | null | undefined,
): SessionTopicState {
  if (!newTopic || newTopic.trim().length === 0) {
    return {
      currentTopic: null,
      topicHistory: state.topicHistory,
    };
  }
  const clean = path.normalize(newTopic.trim());
  return {
    currentTopic: clean,
    topicHistory: [...state.topicHistory, clean],
  };
}

export type TopicTargetResolution =
  | { kind: "explicit"; target: string }
  | { kind: "topic"; target: string; inferred: true }
  | { kind: "workspace_default"; target: string };

/**
 * Resolves a target path or argument against the active topic register ($_) or workspace default.
 */
export function resolveTargetWithTopic(
  state: SessionTopicState,
  explicitTarget?: string,
  workspaceRoot = "/",
): TopicTargetResolution {
  if (explicitTarget && explicitTarget.trim().length > 0) {
    return { kind: "explicit", target: path.normalize(explicitTarget.trim()) };
  }

  if (state.currentTopic) {
    const resolved = path.isAbsolute(state.currentTopic)
      ? state.currentTopic
      : path.join(workspaceRoot, state.currentTopic);
    return { kind: "topic", target: path.normalize(resolved), inferred: true };
  }

  return { kind: "workspace_default", target: path.normalize(workspaceRoot) };
}
