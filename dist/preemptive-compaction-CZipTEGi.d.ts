import { n as AgentMessage } from "./index-B4PKL_IC.js";
import { v as SourceReplyDeliveryMode } from "./types-CJ2AFyfH.js";
import { h as TaskSuggestionDeliveryMode } from "./templating-BhJuWyZk.js";
import { r as PreemptiveCompactionRoute, ys as ReplyBackendQueueMessageOptions } from "./types-CWvW31qx.js";
//#region src/agents/embedded-agent-runner/run-state.d.ts
/**
 * Shared process state for embedded-agent runs, queues, and snapshots.
 *
 * The maps are global-singleton backed so reloads and lazy imports inside the same gateway process
 * do not split active-run bookkeeping.
 */
type EmbeddedAgentQueueHandle = {
  kind?: "embedded";
  runId?: string;
  queueMessage: (text: string, options?: EmbeddedAgentQueueMessageOptions) => Promise<void>;
  isStreaming: () => boolean;
  isStopped?: () => boolean; /** True after this handle has accepted an abort, even while cleanup retains it. */
  isAborted?: () => boolean;
  isAbortable?: () => boolean;
  isCompacting: () => boolean;
  supportsTranscriptCommitWait?: boolean; /** True only when queueMessage preserves images supplied in its options. */
  supportsQueueMessageImages?: boolean;
  cancel?: (reason?: "user_abort" | "restart" | "superseded") => void;
  abort: (reason?: "restart") => void;
  sourceReplyDeliveryMode?: SourceReplyDeliveryMode;
  taskSuggestionDeliveryMode?: TaskSuggestionDeliveryMode;
};
type EmbeddedAgentQueueMessageOptions = ReplyBackendQueueMessageOptions;
/** Resolves the current session id for an active run after resets or compaction. */
declare function resolveActiveEmbeddedRunSessionId(sessionKey: string): string | undefined;
//#endregion
//#region src/agents/embedded-agent-runner/runs.d.ts
/**
 * Abort embedded OpenClaw runs.
 *
 * - With a sessionId, aborts that single run.
 * - With no sessionId, supports targeted abort modes (for example, compacting runs only).
 */
declare function abortEmbeddedAgentRun(sessionId: string): boolean;
declare function abortEmbeddedAgentRun(sessionId: undefined, opts: {
  mode: "all" | "compacting";
  reason?: "restart";
}): boolean;
type AbortAndDrainEmbeddedAgentRunResult = {
  aborted: boolean;
  drained: boolean;
  forceCleared: boolean;
};
declare function abortAndDrainEmbeddedAgentRun(params: {
  sessionId: string;
  sessionKey?: string;
  settleMs?: number;
  forceClear?: boolean;
  reason?: string;
}): Promise<AbortAndDrainEmbeddedAgentRunResult>;
declare function setActiveEmbeddedRun(sessionId: string, handle: EmbeddedAgentQueueHandle, sessionKey?: string, sessionFile?: string): void;
declare function clearActiveEmbeddedRun(sessionId: string, handle: EmbeddedAgentQueueHandle, sessionKey?: string, sessionFile?: string, reason?: string): void;
//#endregion
//#region src/agents/embedded-agent-runner/run/preemptive-compaction.d.ts
declare const PREEMPTIVE_OVERFLOW_ERROR_TEXT = "Context overflow: prompt too large for the model (precheck).";
/** Pre-prompt routing decision plus the budget facts used to explain it in logs and session state. */
type PreemptiveCompactionDecision = {
  route: PreemptiveCompactionRoute;
  shouldCompact: boolean;
  estimatedPromptTokens: number;
  pressureSource?: string;
  promptBudgetBeforeReserve: number;
  overflowTokens: number;
  toolResultReducibleChars: number;
  effectiveReserveTokens: number;
};
/** Token pressure reported by the rendered provider-boundary prompt when available. */
type LlmBoundaryTokenPressure = {
  estimatedPromptTokens: number;
  source: string;
  renderedChars?: number;
};
/** Estimates only the rendered prompt/system portion when history has already been accounted for. */
declare function estimateRenderedLlmBoundaryTokenPressure(params: {
  systemPrompt?: string;
  prompt: string;
}): number;
/**
 * Decides whether a run should compact before submitting the prompt, and
 * whether reducible tool results can avoid or follow compaction. Rendered LLM
 * boundary pressure wins over local transcript estimates when supplied.
 */
declare function shouldPreemptivelyCompactBeforePrompt(params: {
  messages: AgentMessage[];
  unwindowedMessages?: AgentMessage[];
  systemPrompt?: string;
  prompt: string;
  contextTokenBudget: number;
  reserveTokens: number;
  toolResultMaxChars?: number;
  llmBoundaryTokenPressure?: LlmBoundaryTokenPressure;
}): PreemptiveCompactionDecision;
/** Formats the compact operator log line for one pre-prompt budget check. */
declare function formatPrePromptPrecheckLog(params: {
  result: PreemptiveCompactionDecision;
  sessionKey?: string;
  sessionId?: string;
  provider: string;
  modelId: string;
  messageCount: number;
  unwindowedMessageCount?: number;
  contextTokenBudget: number;
  reserveTokens: number;
  sessionFile?: string;
}): string;
//#endregion
export { formatPrePromptPrecheckLog as a, abortAndDrainEmbeddedAgentRun as c, setActiveEmbeddedRun as d, EmbeddedAgentQueueMessageOptions as f, estimateRenderedLlmBoundaryTokenPressure as i, abortEmbeddedAgentRun as l, PREEMPTIVE_OVERFLOW_ERROR_TEXT as n, shouldPreemptivelyCompactBeforePrompt as o, resolveActiveEmbeddedRunSessionId as p, PreemptiveCompactionDecision as r, AbortAndDrainEmbeddedAgentRunResult as s, LlmBoundaryTokenPressure as t, clearActiveEmbeddedRun as u };