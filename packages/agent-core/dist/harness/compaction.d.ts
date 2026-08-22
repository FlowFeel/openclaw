import { AgentCoreCompletionRuntimeDeps } from "../runtime-deps.js";
import { AgentMessage, ThinkingLevel } from "../types.js";
import { a as FileOperations, c as Result, i as CompactionError, s as SessionTreeEntry, t as serializeConversation } from "../utils--bSzVdMN.js";
import { Model, StreamFn, Usage } from "@openclaw/llm-core";

//#region packages/agent-core/src/harness/compaction/compaction.d.ts
/** File-operation details stored on generated compaction entries. */
interface CompactionDetails {
  /** Files read in the compacted history. */
  readFiles: string[];
  /** Files modified in the compacted history. */
  modifiedFiles: string[];
}
/** Convergence metadata for R4 post-compaction logging. */
interface CompactionConvergence {
  /** Number of summarization passes run (1 = first pass only, 2 = convergence re-summarized). */
  passes: number;
  /** Whether the post-compaction context fits within 85% of the context budget. */
  converged: boolean;
  /** Estimated token count of the final summary. */
  summaryTokens: number;
  /** keepRecentTokens used for the final pass. */
  keepRecentTokens: number;
  /** Context token budget (model context window), if known. */
  contextTokenBudget: number | undefined;
}
/** Generated compaction data ready to be persisted as a compaction entry. */
interface CompactionResult<T = unknown> {
  /** Summary text that replaces compacted history in future context. */
  summary: string;
  /** Entry id where retained history starts. */
  firstKeptEntryId: string;
  /** Estimated context tokens before compaction. */
  tokensBefore: number;
  /** Optional implementation-specific details stored with the compaction entry. */
  details?: T;
  /** R4: Convergence metadata for post-compaction logging. Undefined when no budget was provided. */
  convergence?: CompactionConvergence;
}
/** Compaction thresholds and retention settings. */
interface CompactionSettings {
  /** Enable automatic compaction decisions. */
  enabled: boolean;
  /** Tokens reserved for summary prompt and output. */
  reserveTokens: number;
  /** Approximate recent-context tokens to keep after compaction. */
  keepRecentTokens: number;
  /**
   * Proactive compaction ratio: fire when context usage reaches this fraction
   * of the context window (default 0.70). At 0.70 on a 242K window, compaction
   * fires at ~169K instead of the reactive edge (~226K), giving the model a
   * smaller, more summarizable context.
   */
  compactAtRatio?: number;
}
/** Default proactive compaction ratio (fire at 70% of context window). */
declare const DEFAULT_COMPACT_AT_RATIO = 0.7;
/** Default compaction settings used by the harness. */
declare const DEFAULT_COMPACTION_SETTINGS: CompactionSettings;
/** Calculate total context tokens from provider usage. */
declare function calculateContextTokens(usage: Usage): number;
/** Return usage from the last valid assistant message in session entries. */
declare function getLastAssistantUsage(entries: SessionTreeEntry[]): Usage | undefined;
/** Estimated context-token usage for a message list. */
interface ContextUsageEstimate {
  /** Estimated total context tokens. */
  tokens: number;
  /** Tokens reported by the most recent assistant usage block. */
  usageTokens: number;
  /** Estimated tokens not covered by usable provider usage. */
  trailingTokens: number;
  /** Index of the message that provided usage, or null when none exists. */
  lastUsageIndex: number | null;
}
/** Estimate context tokens for messages using provider usage when available. */
declare function estimateContextTokens(messages: AgentMessage[]): ContextUsageEstimate;
/**
 * Return whether context usage exceeds the configured compaction threshold.
 *
 * R1 (proactive compaction): fires at `compactAtRatio` of the context window
 * (default 0.70) — well before the reactive edge (`contextWindow - reserveTokens`,
 * ~93%). The `min` ensures we never fire later than the reactive threshold,
 * so a high `compactAtRatio` (e.g. 0.95) falls back to reactive behavior.
 *
 * Prediction: firing at 70% gives the model a smaller, more summarizable
 * context, producing higher-quality summaries that fit the budget on the
 * first pass.
 *
 * Competing account: firing at 93% is fine if the model can summarize a
 * near-full context window effectively.
 *
 * Support: on 2026-08-15, topic 53 reached 275K tokens (114% over the 242K
 * budget) because compaction at ~93% left the model with too much context to
 * summarize. At 70% (~169K), the model would have had a manageable input.
 */
declare function shouldCompact(contextTokens: number, contextWindow: number, settings: CompactionSettings): boolean;
/** Estimate token count for one message using a conservative character heuristic. */
declare function estimateTokens(message: AgentMessage): number;
/** Find the user-visible message that starts the turn containing an entry. */
declare function findTurnStartIndex(entries: SessionTreeEntry[], entryIndex: number, startIndex: number): number;
/** Cut point selected for compaction. */
interface CutPointResult {
  /** Index of the first entry retained after compaction. */
  firstKeptEntryIndex: number;
  /** Index of the turn-start entry when the cut splits a turn, otherwise -1. */
  turnStartIndex: number;
  /** Whether the selected cut point splits an in-progress turn. */
  isSplitTurn: boolean;
}
/** Find the compaction cut point that keeps approximately the requested recent-token budget. */
declare function findCutPoint(entries: SessionTreeEntry[], startIndex: number, endIndex: number, keepRecentTokens: number): CutPointResult;
declare const SUMMARIZATION_SYSTEM_PROMPT = "You are a context summarization assistant. Your task is to read a conversation between a user and an AI assistant, then produce a structured summary following the exact format specified.\n\nDo NOT continue the conversation. Do NOT respond to any questions in the conversation. ONLY output the structured summary.\n\nIf the workspace defines stable axiom IDs (e.g., S-xxx, C-xxx, E-xxx, M-xxx, T-xxx in AGENTS.md), preserve and reference them by ID when summarizing constraints, decisions, and context. Do not paraphrase axiom IDs away \u2014 they are stable cross-references that survive compaction.";
/** Generate or update a conversation summary for compaction. */
declare function generateSummary(currentMessages: AgentMessage[], model: Model, reserveTokens: number, apiKey: string | undefined, headers?: Record<string, string>, signal?: AbortSignal, customInstructions?: string, previousSummary?: string, thinkingLevel?: ThinkingLevel, streamFn?: StreamFn, runtime?: AgentCoreCompletionRuntimeDeps, contextTokenBudget?: number, keepRecentTokens?: number): Promise<Result<string, CompactionError>>;
/** Prepared inputs for a compaction run. */
interface CompactionPreparation {
  /** Entry id where retained history starts. */
  firstKeptEntryId: string;
  /** Messages summarized into the history summary. */
  messagesToSummarize: AgentMessage[];
  /** Prefix messages summarized separately when compaction splits a turn. */
  turnPrefixMessages: AgentMessage[];
  /** Whether compaction splits a turn. */
  isSplitTurn: boolean;
  /** Estimated context tokens before compaction. */
  tokensBefore: number;
  /** Previous compaction summary used for iterative updates. */
  previousSummary?: string;
  /** File operations extracted from summarized history. */
  fileOps: FileOperations;
  /** Settings used to prepare compaction. */
  settings: CompactionSettings;
}
/** Prepare session entries for compaction, or return undefined when compaction is not applicable. */
declare function prepareCompaction(pathEntries: SessionTreeEntry[], settings: CompactionSettings): Result<CompactionPreparation | undefined, CompactionError>;
/** Generate compaction summary data from prepared session history. */
declare function compact(preparation: CompactionPreparation, model: Model, apiKey: string | undefined, headers?: Record<string, string>, customInstructions?: string, signal?: AbortSignal, thinkingLevel?: ThinkingLevel, streamFn?: StreamFn, runtime?: AgentCoreCompletionRuntimeDeps, contextTokenBudget?: number): Promise<Result<CompactionResult, CompactionError>>;
//#endregion
export { CompactionConvergence, CompactionDetails, CompactionPreparation, CompactionResult, CompactionSettings, ContextUsageEstimate, DEFAULT_COMPACTION_SETTINGS, DEFAULT_COMPACT_AT_RATIO, SUMMARIZATION_SYSTEM_PROMPT, calculateContextTokens, compact, estimateContextTokens, estimateTokens, findCutPoint, findTurnStartIndex, generateSummary, getLastAssistantUsage, prepareCompaction, serializeConversation, shouldCompact };