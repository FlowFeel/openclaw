import { AgentMessage, BashExecutionMessage, BranchSummaryMessage, CompactionSummaryMessage, CustomMessage } from "../types.js";
import { ImageContent, Message, TextContent } from "@openclaw/llm-core";

//#region packages/agent-core/src/harness/messages.d.ts
/** Harness-only transcript entries that can be normalized into LLM messages. */
type HarnessMessage = AgentMessage | BashExecutionMessage | CustomMessage | BranchSummaryMessage | CompactionSummaryMessage;
declare function asAgentMessage(message: HarnessMessage): AgentMessage;
declare const COMPACTION_SUMMARY_PREFIX = "The conversation history before this point was compacted into the following summary:\n\n<summary>\n";
declare const COMPACTION_SUMMARY_SUFFIX = "\n</summary>";
declare const BRANCH_SUMMARY_PREFIX = "The following is a summary of a branch that this conversation came back from:\n\n<summary>\n";
declare const BRANCH_SUMMARY_SUFFIX = "</summary>";
/** Render a shell execution record as user-visible context text for the model. */
declare function bashExecutionToText(msg: BashExecutionMessage): string;
/** Build a persisted branch summary message from the repository timestamp string. */
declare function createBranchSummaryMessage(summary: string, fromId: string, timestamp: string): BranchSummaryMessage;
/** Build a persisted compaction summary message from the repository timestamp string. */
declare function createCompactionSummaryMessage(summary: string, tokensBefore: number, timestamp: string): CompactionSummaryMessage;
/** Build a custom transcript message that can be shown and replayed into context. */
declare function createCustomMessage(customType: string, content: string | (TextContent | ImageContent)[], display: boolean, details: unknown, timestamp: string): CustomMessage;
/** Convert harness transcript messages into the LLM-facing message sequence. */
declare function convertToLlm(messages: AgentMessage[]): Message[];
//#endregion
export { BRANCH_SUMMARY_PREFIX, BRANCH_SUMMARY_SUFFIX, type BashExecutionMessage, type BranchSummaryMessage, COMPACTION_SUMMARY_PREFIX, COMPACTION_SUMMARY_SUFFIX, type CompactionSummaryMessage, type CustomMessage, HarnessMessage, asAgentMessage, bashExecutionToText, convertToLlm, createBranchSummaryMessage, createCompactionSummaryMessage, createCustomMessage };