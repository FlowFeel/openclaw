import { AgentCoreCompletionRuntimeDeps, AgentCoreRuntimeDeps, AgentCoreStreamRuntimeDeps, resolveAgentCoreCompleteFn, resolveAgentCoreStreamFn } from "./runtime-deps.js";
import { AfterToolCallContext, AfterToolCallResult, AfterToolOutcomeContext, AgentContext, AgentEvent, AgentLoopConfig, AgentLoopTurnUpdate, AgentMessage, AgentState, AgentTool, AgentToolCall, AgentToolProgress, AgentToolResult, AgentToolUpdateCallback, BashExecutionMessage, BeforeToolCallContext, BeforeToolCallResult, BranchSummaryMessage, CompactionSummaryMessage, CustomAgentMessages, CustomMessage, DeferredToolCallContext, PrepareNextTurnContext, QueueMode, ShouldStopAfterTurnContext, StreamFn, ThinkingLevel, ToolExecutionMode, ToolResultContentSource } from "./types.js";
import { AgentEventSink, agentLoop, agentLoopContinue, runAgentLoop, runAgentLoopContinue } from "./agent-loop.js";
import { Agent, AgentOptions } from "./agent.js";
import { a as FileOperations, c as Result, o as SessionContext, r as BranchSummaryResult, s as SessionTreeEntry, t as serializeConversation } from "./utils--bSzVdMN.js";
import { BranchPathEntry, BranchPreparation, BranchSummaryDetails, CollectBranchPathEntriesResult, collectEntriesForBranchSummaryFromBranches, generateBranchSummary, prepareBranchEntries } from "./harness/branch-summarization.js";
import { CompactionConvergence, CompactionDetails, CompactionPreparation, CompactionResult, CompactionSettings, ContextUsageEstimate, DEFAULT_COMPACTION_SETTINGS, calculateContextTokens, compact, estimateContextTokens, estimateTokens, findCutPoint, findTurnStartIndex, generateSummary, getLastAssistantUsage, prepareCompaction, shouldCompact } from "./harness/compaction.js";
import { KillProcessTreeOptions, killProcessTree, signalProcessTree } from "./harness/env/kill-tree.js";
import { BRANCH_SUMMARY_PREFIX, BRANCH_SUMMARY_SUFFIX, COMPACTION_SUMMARY_PREFIX, COMPACTION_SUMMARY_SUFFIX, HarnessMessage, asAgentMessage, bashExecutionToText, convertToLlm, createBranchSummaryMessage, createCompactionSummaryMessage, createCustomMessage } from "./harness/messages.js";
import { PromptTemplate, parseCommandArgs, substituteArgs } from "./harness/prompt-template-arguments.js";
import { DEFAULT_MAX_BYTES, DEFAULT_MAX_LINES, GREP_MAX_LINE_LENGTH, TruncationOptions, TruncationResult, formatSize, truncateHead, truncateLine, truncateTail } from "./harness/utils/truncate.js";
import { validateToolArguments, validateToolCall } from "./validation.js";

//#region packages/agent-core/src/errors.d.ts
declare const TRANSCRIPT_NOT_CONTINUABLE_ERROR_CODE = "openclaw_transcript_not_continuable";
declare class TranscriptNotContinuableError extends Error {
  readonly code = "openclaw_transcript_not_continuable";
  readonly role: AgentMessage["role"];
  constructor(role: AgentMessage["role"]);
}
//#endregion
//#region packages/agent-core/src/harness/session/session.d.ts
/** Build model context from an ordered session branch and its latest state markers. */
declare function buildSessionContext(pathEntries: SessionTreeEntry[]): SessionContext;
//#endregion
//#region packages/agent-core/src/harness/session/uuid.d.ts
/** Generate a monotonic UUIDv7 string. */
declare function uuidv7(): string;
//#endregion
export { AfterToolCallContext, AfterToolCallResult, AfterToolOutcomeContext, Agent, AgentContext, AgentCoreCompletionRuntimeDeps, AgentCoreRuntimeDeps, AgentCoreStreamRuntimeDeps, AgentEvent, AgentEventSink, AgentLoopConfig, AgentLoopTurnUpdate, AgentMessage, AgentOptions, AgentState, AgentTool, AgentToolCall, AgentToolProgress, AgentToolResult, AgentToolUpdateCallback, BRANCH_SUMMARY_PREFIX, BRANCH_SUMMARY_SUFFIX, BashExecutionMessage, BeforeToolCallContext, BeforeToolCallResult, type BranchPathEntry, type BranchPreparation, type BranchSummaryDetails, BranchSummaryMessage, type BranchSummaryResult, COMPACTION_SUMMARY_PREFIX, COMPACTION_SUMMARY_SUFFIX, type CollectBranchPathEntriesResult, type CompactionConvergence, type CompactionDetails, type CompactionPreparation, type CompactionResult, type CompactionSettings, CompactionSummaryMessage, type ContextUsageEstimate, CustomAgentMessages, CustomMessage, DEFAULT_COMPACTION_SETTINGS, DEFAULT_MAX_BYTES, DEFAULT_MAX_LINES, DeferredToolCallContext, type FileOperations, GREP_MAX_LINE_LENGTH, HarnessMessage, KillProcessTreeOptions, PrepareNextTurnContext, PromptTemplate, QueueMode, type Result, type SessionTreeEntry, ShouldStopAfterTurnContext, StreamFn, TRANSCRIPT_NOT_CONTINUABLE_ERROR_CODE, ThinkingLevel, ToolExecutionMode, ToolResultContentSource, TranscriptNotContinuableError, TruncationOptions, TruncationResult, agentLoop, agentLoopContinue, asAgentMessage, bashExecutionToText, buildSessionContext, calculateContextTokens, collectEntriesForBranchSummaryFromBranches, compact, convertToLlm, createBranchSummaryMessage, createCompactionSummaryMessage, createCustomMessage, estimateContextTokens, estimateTokens, findCutPoint, findTurnStartIndex, formatSize, generateBranchSummary, generateSummary, getLastAssistantUsage, killProcessTree, parseCommandArgs, prepareBranchEntries, prepareCompaction, resolveAgentCoreCompleteFn, resolveAgentCoreStreamFn, runAgentLoop, runAgentLoopContinue, serializeConversation, shouldCompact, signalProcessTree, substituteArgs, truncateHead, truncateLine, truncateTail, uuidv7, validateToolArguments, validateToolCall };