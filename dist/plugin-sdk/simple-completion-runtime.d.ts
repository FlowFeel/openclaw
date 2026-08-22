import { r as AssistantMessage } from "../types-xx0UXBU1.js";
import { dn as completeWithPreparedSimpleCompletionModel, pn as prepareSimpleCompletionModelForAgent } from "../types-DdUyjaEr.js";

//#region src/agents/embedded-agent-utils.d.ts
/** Extract sanitized assistant text across all text content blocks. */
declare function extractAssistantText(msg: AssistantMessage): string;
//#endregion
export { completeWithPreparedSimpleCompletionModel, extractAssistantText, prepareSimpleCompletionModelForAgent };