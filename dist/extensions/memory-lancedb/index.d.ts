import { t as OpenClawPluginDefinition } from "../../types-CAQ6JuHx.js";
import { c as OpenClawPluginConfigSchema, l as OpenClawPluginDefinition$1 } from "../../plugin-entry-i32wLQY9.js";
import { normalizeEmbeddingVector, testing } from "./embeddings.js";
import { parseMemoryCliFilter } from "./memory-cli.js";
import { looksLikeEnvelopeSludge, sanitizeForMemoryCapture } from "./memory-capture-sanitization.js";
import { detectCategory, escapeMemoryForPrompt, formatRelevantMemoriesContext, looksLikePromptInjection, normalizeRecallQuery, shouldCapture } from "./memory-policy.js";

//#region extensions/memory-lancedb/index.d.ts
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition$1["register"]>;
} & Pick<OpenClawPluginDefinition, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
//#endregion
export { _default as default, detectCategory, escapeMemoryForPrompt, formatRelevantMemoriesContext, looksLikeEnvelopeSludge, looksLikePromptInjection, normalizeEmbeddingVector, normalizeRecallQuery, parseMemoryCliFilter, sanitizeForMemoryCapture, shouldCapture, testing };