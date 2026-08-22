import { E as Model, F as SimpleStreamOptions, H as ThinkingBudgets, T as Message, W as ThinkingLevel, i as AssistantMessage, n as Api, z as StreamOptions } from "../types-CH7ReIcU.mjs";
import { t as sanitizeSurrogates } from "../sanitize-unicode-BZiVbGwK.mjs";
import { n as normalizeStructuredPromptSection, r as sortPromptCacheToolsByName, t as normalizePromptCapabilityIds } from "../prompt-cache-stability-Cwcjv_fx.mjs";

//#region packages/ai/src/providers/simple-options.d.ts
type FirstEventStreamOptions = {
  firstEventTimeoutMs?: number;
  onFirstEventTimeout?: (reason: Error) => void;
};
declare function buildBaseOptions(model: Model, options?: SimpleStreamOptions, apiKey?: string): StreamOptions & FirstEventStreamOptions;
declare function clampMaxTokensToModel(model: Model, requestedMaxTokens: number): number;
declare function clampMaxTokensToModel(model: Model, requestedMaxTokens: number | undefined): number | undefined;
declare function clampReasoning(effort: ThinkingLevel): Exclude<ThinkingLevel, "xhigh">;
declare function clampReasoning(effort: ThinkingLevel | undefined): Exclude<ThinkingLevel, "xhigh"> | undefined;
declare function adjustMaxTokensForThinking(baseMaxTokens: number | undefined, modelMaxTokens: number, reasoningLevel: ThinkingLevel, customBudgets?: ThinkingBudgets): {
  maxTokens: number;
  thinkingBudget: number;
};
//#endregion
//#region packages/ai/src/providers/tool-result-text.d.ts
/** Media metadata alone is not an attachment; provider emitters need inline bytes. */
declare function hasMediaPayload(block: unknown): block is Record<string, unknown> & {
  data: string;
};
/** Image metadata alone is not an attachment; provider emitters need inline bytes. */
declare function isImageWithMediaPayload<T>(block: T): block is T & {
  type: "image";
  data: string;
};
declare function describeToolResultMediaPlaceholder(blocks: readonly unknown[]): string | undefined;
declare function extractToolResultBlockText(block: unknown): string | undefined;
declare function extractToolResultText(blocks: readonly unknown[]): string;
//#endregion
//#region packages/ai/src/transcript-transform.d.ts
/**
 * Normalize tool call ID for cross-provider compatibility.
 * OpenAI Responses API generates IDs that are 450+ chars with special characters like `|`.
 * Anthropic APIs require IDs matching ^[a-zA-Z0-9_-]+$ (max 64 chars).
 */
declare function transformMessages<TApi extends Api>(messages: Message[], model: Model<TApi>, normalizeToolCallId?: (id: string, model: Model<TApi>, source: AssistantMessage) => string): Message[];
//#endregion
//#region packages/ai/src/utils/system-prompt-cache-boundary.d.ts
declare const SYSTEM_PROMPT_CACHE_BOUNDARY = "\n<!-- OPENCLAW_CACHE_BOUNDARY -->\n";
declare function stripSystemPromptCacheBoundary(text: string): string;
declare function ensureSystemPromptCacheBoundary(systemPrompt: string): string;
declare function splitSystemPromptCacheBoundary(text: string): {
  stablePrefix: string;
  dynamicSuffix: string;
} | undefined;
declare function prependSystemPromptAdditionAfterCacheBoundary(params: {
  systemPrompt: string;
  systemPromptAddition?: string;
}): string;
//#endregion
//#region packages/ai/src/utils/tls-certificate-errors.d.ts
type TlsCertificateErrorKind = "certificate_invalid" | "hostname_mismatch";
type TlsCertificateErrorDetails = {
  kind: TlsCertificateErrorKind;
  code?: string;
  message: string;
};
/** Classify deterministic Node/OpenSSL certificate validation failures. */
declare function inspectTlsCertificateError(error: unknown): TlsCertificateErrorDetails | null;
//#endregion
export { SYSTEM_PROMPT_CACHE_BOUNDARY, TlsCertificateErrorDetails, TlsCertificateErrorKind, adjustMaxTokensForThinking, buildBaseOptions, clampMaxTokensToModel, clampReasoning, describeToolResultMediaPlaceholder, ensureSystemPromptCacheBoundary, extractToolResultBlockText, extractToolResultText, hasMediaPayload, inspectTlsCertificateError, isImageWithMediaPayload, normalizePromptCapabilityIds, normalizeStructuredPromptSection, prependSystemPromptAdditionAfterCacheBoundary, sanitizeSurrogates, sortPromptCacheToolsByName, splitSystemPromptCacheBoundary, stripSystemPromptCacheBoundary, transformMessages };