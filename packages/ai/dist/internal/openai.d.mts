import { E as Model, F as SimpleStreamOptions, I as StopReason, R as StreamFunction, X as Usage, u as Context, z as StreamOptions } from "../types-CH7ReIcU.mjs";
import { _ as resolveOpenAIReasoningEffortForModel, a as OpenAICompletionsOptions, b as supportsOpenAITemperature, c as projectOpenAITools, d as OpenAIApiReasoningEffort, f as OpenAIReasoningEffort, g as normalizeOpenAIReasoningEffort, h as isOpenAIGpt56Model, l as reconcileOpenAICompletionsToolChoice, m as isOpenAIGpt55Model, o as OpenAICompletionsToolChoice, p as isOpenAIGpt54MiniModel, s as OpenAIToolProjection, u as reconcileOpenAIResponsesToolChoice, v as resolveOpenAISupportedReasoningEfforts, y as supportsOpenAIReasoningEffort } from "../provider-options-C5kYML7i.mjs";
import { t as ResolvedOpenAICompletionsCompat } from "../openai-completions-compat-BW1N9PP3.mjs";
import { n as clampOpenAIPromptCacheKey, t as OPENAI_PROMPT_CACHE_KEY_MAX_LENGTH } from "../openai-prompt-cache-2uo_1OR1.mjs";
import OpenAI from "openai";
import { TSchema } from "typebox";
import { ResponseCreateParamsStreaming } from "openai/resources/responses/responses.js";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.js";

//#region packages/ai/src/providers/agent-tools-parameter-schema.d.ts
/**
 * Narrow structural view of the host's model compat config. packages/ai must stay
 * config-agnostic, so only tool-schema-relevant fields are modeled here; the host's
 * ModelCompatConfig remains structurally assignable.
 */
type ToolSchemaModelCompat = {
  toolSchemaProfile?: string;
  unsupportedToolSchemaKeywords?: string[];
  omitEmptyArrayItems?: boolean;
};
/** Extracts the compat record whether callers pass a model (`{ compat }`) or the compat itself. */
declare function extractToolSchemaModelCompat(modelOrCompat: {
  compat?: unknown;
} | ToolSchemaModelCompat | undefined): ToolSchemaModelCompat | undefined;
/** JSON Schema keywords this model/provider rejects in tool schemas. */
declare function resolveUnsupportedToolSchemaKeywords(modelOrCompat: {
  compat?: unknown;
} | ToolSchemaModelCompat | undefined): ReadonlySet<string>;
/** Whether empty `items: {}` on array schemas must be omitted for this model/provider. */
declare function shouldOmitEmptyArrayItems(modelOrCompat: {
  compat?: unknown;
} | ToolSchemaModelCompat | undefined): boolean;
type ToolParameterSchemaOptions = {
  modelProvider?: string;
  modelId?: string;
  modelCompat?: ToolSchemaModelCompat;
};
/** Return a provider-compatible JSON schema for a model-facing tool. */
declare function normalizeToolParameterSchema(schema: unknown, options?: ToolParameterSchemaOptions): TSchema;
//#endregion
//#region packages/ai/src/providers/azure-deployment-map.d.ts
/** Parses AZURE_OPENAI_DEPLOYMENT_MAP-style model=deployment entries. */
declare function parseAzureDeploymentNameMap(value: string | undefined): Map<string, string>;
/**
 * Resolves the Azure deployment name for a model id, falling back to the model id.
 *
 * An exact-case match always wins, so configs that intentionally distinguish keys by
 * case keep their exact mappings; a case-insensitive match is only used as a fallback
 * (e.g. `GPT-4o` against a `gpt-4o=...` map) to avoid 404s from casing differences.
 */
declare function resolveAzureDeploymentNameFromMap(params: {
  modelId: string;
  deploymentMap?: string;
}): string;
//#endregion
//#region packages/ai/src/providers/azure-openai-responses-client-compat.d.ts
declare function isTraditionalAzureOpenAIHost(hostname: string): boolean;
declare function isOpenAICompatibleAzureResponsesBaseUrl(baseUrl: string): boolean;
//#endregion
//#region packages/ai/src/providers/clean-for-gemini.d.ts
declare const GEMINI_UNSUPPORTED_SCHEMA_KEYWORDS: Set<string>;
declare function cleanSchemaForGemini(schema: unknown): TSchema;
//#endregion
//#region packages/ai/src/providers/clean-for-llamacpp-gbnf.d.ts
/** llama.cpp rejects grammar repetitions whose expanded rule count reaches 2000. */
declare const LLAMACPP_GBNF_MAX_REPETITION_THRESHOLD = 2000;
/** Removes JSON Schema constraints that llama.cpp cannot compile into GBNF. */
declare function cleanSchemaForLlamacppGbnf(schema: unknown): unknown;
/** Reports schema paths that llama.cpp cannot compile into GBNF. */
declare function findLlamacppGbnfSchemaViolations(schema: unknown, path: string): string[];
//#endregion
//#region packages/ai/src/openai-completions-messages.d.ts
/** Convert a normalized transcript to OpenAI Chat Completions messages. */
declare function convertMessages(model: Model<"openai-completions">, context: Context, compat: ResolvedOpenAICompletionsCompat, options?: {
  cacheOptOutIndexes?: Set<number>;
  preserveSystemPromptCacheBoundary?: boolean;
}): ChatCompletionMessageParam[];
//#endregion
//#region packages/ai/src/providers/openai-completions.d.ts
declare const streamOpenAICompletions: StreamFunction<"openai-completions", OpenAICompletionsOptions>;
declare const streamSimpleOpenAICompletions: StreamFunction<"openai-completions", SimpleStreamOptions>;
//#endregion
//#region packages/ai/src/providers/openai-responses.d.ts
interface OpenAIResponsesOptions extends StreamOptions {
  reasoningEffort?: "minimal" | "low" | "medium" | "high" | "xhigh" | "max";
  reasoningSummary?: "auto" | "detailed" | "concise" | null;
  replayResponsesItemIds?: boolean;
  serviceTier?: ResponseCreateParamsStreaming["service_tier"];
}
/**
 * Generate function for OpenAI Responses API
 */
declare const streamOpenAIResponses: StreamFunction<"openai-responses", OpenAIResponsesOptions>;
declare const streamSimpleOpenAIResponses: StreamFunction<"openai-responses", SimpleStreamOptions>;
//#endregion
//#region packages/ai/src/providers/openai-responses-stream-compat.d.ts
declare const OPENAI_RESPONSES_OUTPUT_TEXT_CONTENT_PART_TYPE = "output_text";
declare const AZURE_RESPONSES_TEXT_CONTENT_PART_TYPE = "text";
declare const OPENAI_RESPONSES_OUTPUT_TEXT_DELTA_EVENT_TYPE = "response.output_text.delta";
declare const AZURE_RESPONSES_TEXT_DELTA_EVENT_TYPE = "response.text.delta";
type ResponsesTextContentPartType = typeof OPENAI_RESPONSES_OUTPUT_TEXT_CONTENT_PART_TYPE | typeof AZURE_RESPONSES_TEXT_CONTENT_PART_TYPE;
type ResponsesTextDeltaEventType = typeof OPENAI_RESPONSES_OUTPUT_TEXT_DELTA_EVENT_TYPE | typeof AZURE_RESPONSES_TEXT_DELTA_EVENT_TYPE;
type AzureResponsesTextContentPart = {
  type: typeof AZURE_RESPONSES_TEXT_CONTENT_PART_TYPE;
  text: string;
};
type AzureResponsesTextDeltaEvent = {
  type: typeof AZURE_RESPONSES_TEXT_DELTA_EVENT_TYPE;
  delta: string;
};
declare function isResponsesTextContentPartType(type: unknown): type is ResponsesTextContentPartType;
declare function isResponsesTextDeltaEventType(type: unknown): type is ResponsesTextDeltaEventType;
declare function isAzureResponsesTextDeltaEventType(type: unknown): type is typeof AZURE_RESPONSES_TEXT_DELTA_EVENT_TYPE;
declare function isAzureResponsesTextDeltaEvent(event: {
  type?: unknown;
  delta?: unknown;
}): event is AzureResponsesTextDeltaEvent;
type ResponsesMessageSnapshotCollapse = {
  kind: "extend";
  text: string;
} | {
  kind: "keep";
};
declare function resolveResponsesMessageSnapshotCollapse(params: {
  prior: {
    text: string;
    phase: string | undefined;
  } | null;
  nextText: string;
  nextPhase: string | undefined;
}): ResponsesMessageSnapshotCollapse;
//#endregion
//#region packages/ai/src/providers/openai-responses-terminal-usage.d.ts
/** Terminal usage payload, modeled structurally so untyped callers can pass raw records. */
type ResponsesTerminalUsagePayload = {
  input_tokens?: number | null;
  output_tokens?: number | null;
  total_tokens?: number | null;
  input_tokens_details?: {
    cached_tokens?: number | null;
    cache_write_tokens?: number | null;
  } | null;
  output_tokens_details?: {
    reasoning_tokens?: number | null;
  } | null;
};
/**
 * Split a terminal usage payload into the priced buckets.
 *
 * OpenAI includes cache reads and writes in `input_tokens`, so both are subtracted out of the
 * billable input bucket. `total_tokens` comes from the payload, but never below the sum of the
 * split buckets: proxies routinely omit it (reporting 0 would understate the turn), and a payload
 * whose `cached_tokens` exceeds `input_tokens` clamps the input bucket, leaving the reported total
 * short of what the buckets actually price.
 */
declare function mapResponsesTerminalUsage(usage: ResponsesTerminalUsagePayload | undefined | null): Pick<Usage, "input" | "output" | "cacheRead" | "cacheWrite" | "totalTokens"> | undefined;
/** Reasoning tokens are reported by the agent path only; the package path does not track them. */
declare function readResponsesReasoningTokens(usage: ResponsesTerminalUsagePayload | undefined | null): number | undefined;
/**
 * Resolve the terminal stop reason, including the two overrides every Responses path shares: a
 * content-filtered turn is a provider error rather than a truncated answer, and a turn that
 * produced tool calls reports `toolUse` instead of a plain stop.
 */
declare function resolveResponsesTerminalStopReason(params: {
  status: OpenAI.Responses.ResponseStatus | undefined;
  terminalEventType?: "response.completed" | "response.incomplete";
  incompleteReason?: string;
  hasToolCall: boolean;
}): {
  stopReason: StopReason;
  errorMessage?: string;
};
//#endregion
//#region packages/ai/src/providers/openai-responses-tool-call-tracker.d.ts
type ResponsesToolCallIdentity = {
  itemId?: string;
  callId?: string;
};
type ResponsesToolCallState = ResponsesToolCallIdentity & {
  argumentStreamReliable: boolean;
};
type ResponsesToolCallEvent = {
  output_index?: unknown;
  item_id?: unknown;
};
declare function readResponsesToolCallItemIdentity(item: {
  id?: unknown;
  call_id?: unknown;
}): ResponsesToolCallIdentity;
declare function createResponsesToolCallTracker<TState extends ResponsesToolCallState>(): {
  register(event: ResponsesToolCallEvent, state: TState): void;
  resolve(event: ResponsesToolCallEvent, identity?: ResponsesToolCallIdentity): TState | undefined;
  forget(toolCall: TState): void;
  markArgumentsUnreliable(): void;
  hasActive(): boolean;
};
//#endregion
//#region packages/ai/src/providers/openai-stop-reason.d.ts
type OpenAIStopReasonResult = {
  stopReason: StopReason;
  errorMessage?: string;
};
declare function mapOpenAIStopReason(reason: string | null, options?: {
  allowSingularToolCall?: boolean;
}): OpenAIStopReasonResult;
//#endregion
//#region packages/ai/src/providers/openai-tool-schema-compat.d.ts
/** Repairs recoverable OpenAI tool-schema shapes before canonical normalization. */
declare function normalizeOpenAIStrictCompatSchema(schema: unknown): TSchema;
/** Finds schema paths that violate OpenAI strict tool-schema requirements. */
declare function findOpenAIStrictSchemaViolations(schema: unknown, path: string, options?: {
  requireObjectRoot?: boolean;
}): string[];
//#endregion
//#region packages/ai/src/providers/openai-tool-schema.d.ts
/**
 * OpenAI strict-tool-schema normalization and diagnostics.
 *
 * Strict schemas need all object properties required and `additionalProperties: false`; model
 * compatibility settings can also remove unsupported schema constructs before strict checks run.
 */
type ToolSchemaCompatInput = {
  unsupportedToolSchemaKeywords?: unknown;
  omitEmptyArrayItems?: unknown;
};
declare function clearOpenAIToolSchemaCacheForTest(): void;
/** Normalizes a tool parameter schema into the OpenAI strict JSON-schema subset. */
declare function normalizeStrictOpenAIJsonSchema(schema: unknown, modelCompat?: ToolSchemaCompatInput | null): unknown;
/** Normalizes tool parameters using strict OpenAI rules only when strict mode is active. */
declare function normalizeOpenAIStrictToolParameters<T>(schema: T, strict: boolean, modelCompat?: ToolSchemaCompatInput | null): T;
/** Returns whether a schema already satisfies OpenAI strict tool-schema constraints. */
declare function isStrictOpenAIJsonSchemaCompatible(schema: unknown): boolean;
type OpenAIStrictToolSchemaDiagnostic = {
  toolIndex: number;
  toolName?: string;
  violations: string[];
};
/** Returns strict-schema diagnostics for an already materialized OpenAI tool projection. */
declare function findOpenAIStrictToolProjectionDiagnostics(projection: OpenAIToolProjection): OpenAIStrictToolSchemaDiagnostic[];
/** Resolves strict mode for the projected tools that will be emitted in the request payload. */
declare function resolveOpenAIProjectedToolsStrictToolFlag(projection: OpenAIToolProjection, strict: boolean | null | undefined): boolean | undefined;
//#endregion
//#region packages/ai/src/providers/schema-keyword-strip.d.ts
/** Recursively remove schema keywords unsupported by a target provider/tool surface. */
declare function stripUnsupportedSchemaKeywords(schema: unknown, unsupportedKeywords: ReadonlySet<string>): unknown;
//#endregion
//#region packages/ai/src/providers/tool-schema-json-projection.d.ts
/** JSON-safe schema value used when projecting runtime tool parameters. */
type RuntimeToolInputSchemaJson = null | boolean | number | string | RuntimeToolInputSchemaJson[] | {
  [key: string]: RuntimeToolInputSchemaJson;
};
/** Projected runtime tool schema plus validation violations. */
type RuntimeToolInputSchemaProjection = {
  readonly schema: RuntimeToolInputSchemaJson;
  readonly violations: readonly string[];
};
/** Projects one runtime tool input schema to JSON and reports runtime incompatibilities. */
declare function projectRuntimeToolInputSchema(schema: unknown, path?: string): RuntimeToolInputSchemaProjection;
//#endregion
export { AZURE_RESPONSES_TEXT_CONTENT_PART_TYPE, AZURE_RESPONSES_TEXT_DELTA_EVENT_TYPE, AzureResponsesTextContentPart, AzureResponsesTextDeltaEvent, GEMINI_UNSUPPORTED_SCHEMA_KEYWORDS, LLAMACPP_GBNF_MAX_REPETITION_THRESHOLD, OPENAI_PROMPT_CACHE_KEY_MAX_LENGTH, OPENAI_RESPONSES_OUTPUT_TEXT_CONTENT_PART_TYPE, OPENAI_RESPONSES_OUTPUT_TEXT_DELTA_EVENT_TYPE, OpenAIApiReasoningEffort, type OpenAICompletionsOptions, OpenAICompletionsToolChoice, OpenAIReasoningEffort, OpenAIResponsesOptions, OpenAIStopReasonResult, OpenAIToolProjection, ResponsesMessageSnapshotCollapse, ResponsesTerminalUsagePayload, ResponsesTextContentPartType, ResponsesTextDeltaEventType, ResponsesToolCallIdentity, ResponsesToolCallState, RuntimeToolInputSchemaJson, RuntimeToolInputSchemaProjection, ToolParameterSchemaOptions, ToolSchemaModelCompat, clampOpenAIPromptCacheKey, cleanSchemaForGemini, cleanSchemaForLlamacppGbnf, clearOpenAIToolSchemaCacheForTest, convertMessages, createResponsesToolCallTracker, extractToolSchemaModelCompat, findLlamacppGbnfSchemaViolations, findOpenAIStrictSchemaViolations, findOpenAIStrictToolProjectionDiagnostics, isAzureResponsesTextDeltaEvent, isAzureResponsesTextDeltaEventType, isOpenAICompatibleAzureResponsesBaseUrl, isOpenAIGpt54MiniModel, isOpenAIGpt55Model, isOpenAIGpt56Model, isResponsesTextContentPartType, isResponsesTextDeltaEventType, isStrictOpenAIJsonSchemaCompatible, isTraditionalAzureOpenAIHost, mapOpenAIStopReason, mapResponsesTerminalUsage, normalizeOpenAIReasoningEffort, normalizeOpenAIStrictCompatSchema, normalizeOpenAIStrictToolParameters, normalizeStrictOpenAIJsonSchema, normalizeToolParameterSchema, parseAzureDeploymentNameMap, projectOpenAITools, projectRuntimeToolInputSchema, readResponsesReasoningTokens, readResponsesToolCallItemIdentity, reconcileOpenAICompletionsToolChoice, reconcileOpenAIResponsesToolChoice, resolveAzureDeploymentNameFromMap, resolveOpenAIProjectedToolsStrictToolFlag, resolveOpenAIReasoningEffortForModel, resolveOpenAISupportedReasoningEfforts, resolveResponsesMessageSnapshotCollapse, resolveResponsesTerminalStopReason, resolveUnsupportedToolSchemaKeywords, shouldOmitEmptyArrayItems, streamOpenAICompletions, streamOpenAIResponses, streamSimpleOpenAICompletions, streamSimpleOpenAIResponses, stripUnsupportedSchemaKeywords, supportsOpenAIReasoningEffort, supportsOpenAITemperature };