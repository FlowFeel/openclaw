//#region packages/agent-core/src/harness/compaction/compaction.d.ts
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
//#endregion
export { CompactionResult as t };