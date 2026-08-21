import { E as Model, L as StreamFn, O as OpenAICompletionsCompat, X as Usage, a as AssistantMessageEvent, i as AssistantMessage, n as Api, u as Context } from "./types-CH7ReIcU.mjs";
import { t as AssistantMessageEventStream } from "./event-stream-DRmDMRHH.mjs";
import { n as ApiRegistry } from "./api-registry-EpJoVwM1.mjs";
import { a as OpenAICompletionsOptions, d as OpenAIApiReasoningEffort, f as OpenAIReasoningEffort, i as BaseOpenAIStreamOptions, s as OpenAIToolProjection } from "./provider-options-C5kYML7i.mjs";
import { n as detectOpenAICompletionsCompat, r as resolveOpenAICompletionsCompat, t as ResolvedOpenAICompletionsCompat } from "./openai-completions-compat-BW1N9PP3.mjs";
import { n as FirstStreamEventInternalOptions } from "./stream-first-event-timeout-DvDeSucC.mjs";
import { r as sortPromptCacheToolsByName } from "./prompt-cache-stability-Cwcjv_fx.mjs";
import OpenAI from "openai";
import { FunctionTool, ResponseCreateParamsStreaming, ResponseInput, ResponseReasoningItem } from "openai/resources/responses/responses.js";
import { ChatCompletionChunk } from "openai/resources/chat/completions.js";

//#region packages/ai/src/transports/anthropic-payload-policy.d.ts
/** @deprecated Anthropic-family provider payload helper; do not use from third-party plugins. */
type AnthropicServiceTier = "auto" | "standard_only";
/** @deprecated Anthropic-family provider payload helper; do not use from third-party plugins. */
type AnthropicEphemeralCacheControl = {
  type: "ephemeral";
  ttl?: "1h" | "5m";
};
type AnthropicPayloadPolicyInput = {
  api?: string;
  baseUrl?: string;
  cacheRetention?: "short" | "long" | "none";
  enableCacheControl?: boolean;
  provider?: string;
  serviceTier?: AnthropicServiceTier;
};
/** @deprecated Anthropic-family provider payload helper; do not use from third-party plugins. */
type AnthropicPayloadPolicy = {
  allowsServiceTier: boolean;
  cacheControl: AnthropicEphemeralCacheControl | undefined;
  serviceTier: AnthropicServiceTier | undefined;
};
/** Resolve Anthropic cache-control marker retention for a request endpoint. */
declare function resolveAnthropicEphemeralCacheControl(baseUrl: string | undefined, cacheRetention: AnthropicPayloadPolicyInput["cacheRetention"]): AnthropicEphemeralCacheControl | undefined;
/** Apply one shared deepest-stable-message cache breakpoint policy. */
declare function applyAnthropicCacheControlToMessages(messages: unknown, cacheControl: AnthropicEphemeralCacheControl, markerLimit: number, cacheBreakpointOptOutMessageIndexes: ReadonlySet<number>): void;
/** @deprecated Anthropic-family provider payload helper; do not use from third-party plugins. */
declare function resolveAnthropicPayloadPolicy(input: AnthropicPayloadPolicyInput): AnthropicPayloadPolicy;
/** @deprecated Anthropic-family provider payload helper; do not use from third-party plugins. */
declare function applyAnthropicPayloadPolicyToParams(payloadObj: Record<string, unknown>, policy: AnthropicPayloadPolicy, cacheBreakpointOptOutMessageIndexes: ReadonlySet<number>): void;
/** @deprecated Anthropic-family provider payload helper; do not use from third-party plugins. */
declare function applyAnthropicEphemeralCacheControlMarkers(payloadObj: Record<string, unknown>, cacheControl?: AnthropicEphemeralCacheControl | null): void;
//#endregion
//#region packages/ai/src/transports/anthropic-transport-stream.d.ts
/** Resolve the Anthropic Messages endpoint URL for the effective base URL. */
declare function resolveAnthropicMessagesUrl(baseUrl?: string): string;
/** Create the stream function used by Anthropic Messages transport models. */
declare function createAnthropicMessagesTransportStreamFn(): StreamFn;
//#endregion
//#region packages/ai/src/transports/deepseek-text-filter.d.ts
interface DeepSeekTextFilter {
  /** Push one streamed text chunk and receive any safe visible text segments. */
  push(chunk: string): string[];
  /** Flush buffered text at stream end, dropping any unterminated DSML block. */
  flush(): string[];
}
/** Create an incremental text filter that strips DeepSeek DSML tool blocks. */
declare function createDeepSeekTextFilter(): DeepSeekTextFilter;
//#endregion
//#region packages/ai/src/transports/json-unsafe-integers.d.ts
/** Quotes integer literals above Number.MAX_SAFE_INTEGER before JSON.parse. */
declare function quoteUnsafeIntegerLiterals(input: string): string;
/** Parses JSON while preserving unsafe integer literals as strings. */
declare function parseJsonPreservingUnsafeIntegers(input: string): unknown;
/** Parses or accepts an object while preserving unsafe integer literals in string input. */
declare function parseJsonObjectPreservingUnsafeIntegers(value: unknown): Record<string, unknown> | null;
//#endregion
//#region packages/ai/src/transports/model-max-tokens-params.d.ts
/** Resolve the first supported max-token parameter present in a params object. */
declare function resolveMaxTokensParam(params: Record<string, unknown> | undefined): number | undefined;
/**
 * Canonicalize merged params to `maxTokens`, preserving source precedence from
 * left to right across the provided source objects.
 */
declare function canonicalizeMaxTokensParam(params: {
  merged: Record<string, unknown>;
  sources: Array<Record<string, unknown> | undefined>;
}): void;
//#endregion
//#region packages/ai/src/transports/model-transport-debug.d.ts
/**
 * Environment-driven debug controls for model transport logging.
 *
 * Model adapters share these helpers so payload, SSE, and transport diagnostics
 * interpret OpenClaw debug environment variables consistently.
 */
type SubsystemLogger = {
  info(message: string): void;
  debug(message: string): void;
};
type ModelTransportDebugEnv = NodeJS.ProcessEnv;
/** Payload debug detail levels accepted by `OPENCLAW_DEBUG_MODEL_PAYLOAD`. */
type ModelPayloadDebugMode = "off" | "summary" | "tools" | "full-redacted";
/** SSE debug detail levels accepted by `OPENCLAW_DEBUG_SSE`. */
type ModelSseDebugMode = "off" | "events" | "peek";
/** Resolves model payload debug verbosity from `OPENCLAW_DEBUG_MODEL_PAYLOAD`. */
declare function resolveModelPayloadDebugMode(env?: ModelTransportDebugEnv): ModelPayloadDebugMode;
/** Resolves SSE stream debug verbosity from `OPENCLAW_DEBUG_SSE`. */
declare function resolveModelSseDebugMode(env?: ModelTransportDebugEnv): ModelSseDebugMode;
/** Emits model-fetch metadata at info level by default; other diagnostics require debug env. */
declare function emitModelTransportDebug(log: SubsystemLogger, message: string): void;
//#endregion
//#region packages/ai/src/transports/model-transport-url.d.ts
/**
 * Debug formatting helpers for model transport endpoints.
 * Keeps logs useful without exposing credentials, request params, or fragments.
 */
/** Return a sanitized URL suitable for logs and diagnostics. */
declare function formatModelTransportDebugUrl(rawUrl: string): string;
/** Format a configured base URL for debug output, or the implicit default. */
declare function formatModelTransportDebugBaseUrl(rawUrl: string | undefined): string;
//#endregion
//#region packages/ai/src/transports/openai-compatible-conversation-turn.d.ts
/** Returns whether an OpenAI-compatible messages payload contains a usable turn. */
declare function hasOpenAICompatibleConversationTurn(messages: unknown): boolean;
//#endregion
//#region packages/ai/src/transports/openai-completions-string-content.d.ts
/** Flatten string-only text block content arrays into newline-joined strings. */
declare function flattenCompletionMessagesToStringContent(messages: unknown[]): unknown[];
/** Strip completion messages to role/content fields for strict providers. */
declare function stripCompletionMessagesToRoleContent(messages: unknown[]): unknown[];
//#endregion
//#region packages/ai/src/transports/openai-transport-shared.d.ts
declare const GEMINI_THOUGHT_SIGNATURE_VALIDATOR_SKIP = "skip_thought_signature_validator";
declare const log: {
  debug(message: string, data?: Record<string, unknown>): void;
  info(message: string, data?: Record<string, unknown>): void;
  warn(message: string, data?: Record<string, unknown>): void;
};
type OpenAICompletionsContentDelta = {
  kind: "thinking";
  signature?: string;
  text: string;
} | {
  kind: "text";
  text: string;
  source?: "refusal";
};
type OpenAIModeCompatInput = Omit<OpenAICompletionsCompat, "thinkingFormat"> & {
  thinkingFormat?: string;
  requiresStringContent?: boolean;
  strictMessageKeys?: boolean;
  unsupportedToolSchemaKeywords?: unknown;
  omitEmptyArrayItems?: unknown;
  visibleReasoningDetailTypes?: string[];
};
type OpenAIModeModel = Omit<Model, "compat"> & {
  compat?: OpenAIModeCompatInput | null;
};
type MutableAssistantOutput = {
  role: "assistant";
  content: Array<Record<string, unknown>>;
  api: Api;
  provider: string;
  model: string;
  usage: {
    input: number;
    output: number;
    cacheRead: number;
    cacheWrite: number;
    reasoningTokens?: number;
    totalTokens: number;
    cost: Usage["cost"];
  };
  stopReason: string;
  timestamp: number;
  responseId?: string;
  errorMessage?: string;
  errorCode?: string;
  errorType?: string;
  errorBody?: string;
};
declare function parseOpenAICompletionsUsage(rawUsage: NonNullable<ChatCompletionChunk["usage"]> & {
  cost?: unknown;
  prompt_cache_hit_tokens?: number;
}, model: Model, options?: {
  includeReasoningTokens?: boolean;
}): MutableAssistantOutput["usage"];
type ModelStreamCooperativeScheduler = {
  afterEvent: () => Promise<void>;
};
declare function throwIfModelStreamAborted(signal?: AbortSignal): void;
declare function createModelStreamCooperativeScheduler(signal?: AbortSignal): ModelStreamCooperativeScheduler;
declare function resolvePromptCacheKey(options: Pick<BaseOpenAIStreamOptions, "promptCacheKey" | "sessionId"> | undefined, cacheRetention: "short" | "long" | "none"): string | undefined;
declare function isOpenAICompletionsThinkingEnabled(effort: string): boolean;
declare function readOpenAICompletionsContentDeltas(content: unknown, topLevelRefusal?: unknown, mirroredThinking?: readonly string[]): OpenAICompletionsContentDelta[];
//#endregion
//#region packages/ai/src/transports/openai-transport-params.d.ts
declare function readCodeModePayloadToolName(tool: unknown): string | undefined;
declare function filterCodeModePayloadTools(payload: unknown, visibleToolNames: ReadonlySet<string>): void;
declare function resolveCodeModeResponsesVisibleToolNames(context: Pick<Context, "tools">): ReadonlySet<string>;
declare function enforceCodeModeResponsesToolSurface(payload: unknown, visibleToolNames: ReadonlySet<string>): void;
declare function assertCodeModeResponsesToolSurface(payload: unknown, visibleToolNames: ReadonlySet<string>): void;
declare function resolveOpenAIStrictToolFlagWithDiagnostics(projection: OpenAIToolProjection, strictSetting: boolean | null | undefined, context: {
  transport: "responses" | "completions";
  model: OpenAIModeModel;
}): boolean | undefined;
declare function isOpenAICodexResponsesModel(model: Model): boolean;
declare function usesNativeOpenAICodexResponsesBackend(model: Model): boolean;
declare function buildOpenAIClientHeaders(model: Model, context: Context, optionHeaders?: Record<string, string>, turnHeaders?: Record<string, string>, sessionId?: string): Record<string, string>;
declare function buildOpenAISdkClientOptions(model: Model): {
  timeout?: number;
};
declare function buildOpenAISdkRequestOptions(model: Model, signal?: AbortSignal, options?: {
  stream?: boolean;
  timeoutMs?: number;
  maxRetries?: number;
}): {
  signal?: AbortSignal;
  timeout?: number;
  maxRetries?: number;
  headers?: Record<string, string>;
} | undefined;
declare function getCompat(model: OpenAIModeModel): {
  cacheControlFormat: "anthropic" | undefined;
  reasoningEffortMap: Record<string, string>;
  openRouterRouting: Record<string, unknown>;
  vercelGatewayRouting: Record<string, unknown>;
  requiresStringContent: boolean;
  strictMessageKeys: boolean;
  supportsStore: boolean;
  supportsDeveloperRole: boolean;
  supportsReasoningEffort: boolean;
  supportsUsageInStreaming: boolean;
  maxTokensField: "max_completion_tokens" | "max_tokens";
  requiresToolResultName: boolean;
  requiresAssistantAfterToolResult: boolean;
  requiresThinkingAsText: boolean;
  requiresReasoningContentOnAssistantMessages: boolean;
  thinkingFormat: "openai" | "openrouter" | "deepseek" | "together" | "zai" | "qwen" | "qwen-chat-template";
  zaiToolStream: boolean;
  supportsStrictMode: boolean;
  supportsJsonSchemaResponseFormat: boolean;
  supportsPromptCacheKey: boolean;
  supportsLongCacheRetention: boolean;
  sessionAffinity: "openai" | "openrouter" | "none";
  visibleReasoningDetailTypes: string[];
  requiresNonEmptyUserOrAssistantMessage: boolean;
};
//#endregion
//#region packages/ai/src/transports/openai-completions-transport.d.ts
declare function createSseDoneDetector(): {
  observe(chunk: Uint8Array): void;
  finish(): void;
  sawDone: () => boolean;
};
declare function createOpenAICompletionsClient(model: Model, context: Context, apiKey: string, optionHeaders?: Record<string, string>, opts?: {
  fetch?: typeof globalThis.fetch;
}): OpenAI;
declare function buildOpenAICompletionsClientConfig(model: Model, context: Context, optionHeaders?: Record<string, string>): {
  baseURL: string;
  defaultHeaders: Record<string, string>;
  defaultQuery?: Record<string, string>;
};
declare function createOpenAICompletionsTransportStreamFn(): StreamFn;
declare function processOpenAICompletionsStream(responseStream: AsyncIterable<ChatCompletionChunk>, output: MutableAssistantOutput, model: Model, stream: {
  push(event: unknown): void;
}, options?: {
  signal?: AbortSignal;
  emitReasoning?: boolean;
  firstEventTimeoutMs?: number;
  abortFirstEventStream?: (reason: Error) => void;
  onFirstEventTimeout?: (reason: Error) => void;
  sawStreamDONE?: () => boolean;
}): Promise<void>;
declare function shouldEmitOpenAICompletionsReasoningForModel(model: OpenAIModeModel, options: OpenAICompletionsOptions | undefined): boolean;
declare function buildOpenAICompletionsParams(model: OpenAIModeModel, context: Context, options: OpenAICompletionsOptions | undefined): Record<string, unknown>;
declare const completionsTesting: {
  getCompat: typeof getCompat;
  createSseDoneDetector: typeof createSseDoneDetector;
  createOpenAICompletionsClient: typeof createOpenAICompletionsClient;
  buildOpenAICompletionsClientConfig: typeof buildOpenAICompletionsClientConfig;
  parseTransportChunkUsage: typeof parseOpenAICompletionsUsage;
  processOpenAICompletionsStream: typeof processOpenAICompletionsStream;
  shouldEmitOpenAICompletionsReasoningForModel: typeof shouldEmitOpenAICompletionsReasoningForModel;
};
declare global {
  var openclawOpenAICompletionsTransportTestApi: typeof completionsTesting | undefined;
}
//#endregion
//#region packages/ai/src/transports/openai-reasoning-compat.d.ts
/** Minimal model fields needed to resolve OpenAI reasoning effort compatibility. */
type OpenAIReasoningCompatModel = {
  provider?: string | null;
  id?: string | null;
  compat?: unknown;
};
/** Resolves the reasoning effort remap for an OpenAI-compatible model. */
declare function resolveOpenAIReasoningEffortMap(model: OpenAIReasoningCompatModel, fallbackMap?: Record<string, string>): Record<string, string>;
//#endregion
//#region packages/ai/src/transports/openai-responses-payload-policy.d.ts
type OpenAIResponsesPayloadModel = {
  api?: unknown;
  baseUrl?: unknown;
  id?: unknown;
  provider?: unknown;
  contextWindow?: unknown;
  compat?: unknown;
};
type OpenAIResponsesPayloadPolicyOptions = {
  extraParams?: Record<string, unknown>;
  storeMode?: "provider-policy" | "disable" | "preserve";
  enablePromptCacheStripping?: boolean;
  enableServerCompaction?: boolean;
};
type OpenAIResponsesPayloadPolicy = {
  allowsServiceTier: boolean;
  compactThreshold: number;
  explicitStore: boolean | undefined;
  shouldStripDisabledReasoningPayload: boolean;
  shouldStripInputStatus: boolean;
  shouldStripPromptCache: boolean;
  shouldStripStore: boolean;
  useServerCompaction: boolean;
};
/** Resolve payload mutation policy for one OpenAI Responses-style model endpoint. */
declare function resolveOpenAIResponsesPayloadPolicy(model: OpenAIResponsesPayloadModel, options?: OpenAIResponsesPayloadPolicyOptions): OpenAIResponsesPayloadPolicy;
/** Mutate a Responses request payload according to the resolved endpoint policy. */
declare function applyOpenAIResponsesPayloadPolicy(payloadObj: Record<string, unknown>, policy: OpenAIResponsesPayloadPolicy): void;
//#endregion
//#region packages/ai/src/transports/openai-responses-replay.d.ts
/** Resolves the assistant message id that can be replayed to OpenAI Responses. */
declare function resolveReplayableResponsesMessageId(params: {
  replayResponsesItemIds: boolean;
  textSignatureId?: string;
  fallbackId: string;
  fallbackOrdinal: number;
  previousReplayItemWasReasoning: boolean;
}): string | undefined;
//#endregion
//#region packages/ai/src/transports/openai-responses-client.d.ts
declare function createOpenAIResponsesClient(model: Model, context: Context, apiKey: string, optionHeaders?: Record<string, string>, turnHeaders?: Record<string, string>, sessionId?: string): OpenAI;
declare function createOpenAIResponsesTransportStreamFn(): StreamFn;
declare function createAzureOpenAIResponsesTransportStreamFn(): StreamFn;
declare function createAzureOpenAIClient(model: Model, context: Context, apiKey: string, optionHeaders?: Record<string, string>, turnHeaders?: Record<string, string>): OpenAI;
//#endregion
//#region packages/ai/src/transports/openai-responses-debug.d.ts
declare function summarizeResponsesTools(tools: unknown): string;
declare function stringifyRedactedPayload(value: unknown): string;
declare function stringifyRedactedEvent(value: unknown): string;
type ResponsesFailedNoDetailsObservation = {
  event: "openai_responses_response_failed_without_details";
  provider: string;
  api: Api;
  transportModel: string;
  providerRuntimeFailureKind: "no_error_details";
  responseId: string;
  responseStatus: string;
  responseModel: string;
  responseObject: string;
  metadataKeys: string[];
  requestIdHashes: string[];
  failureFieldsPreview: string;
  responsePreview: string;
};
type ResponsesFailedEventSummary = {
  message: string;
  responseId?: string;
  observation?: ResponsesFailedNoDetailsObservation;
};
declare function buildResponsesFailedNoDetailsObservation(event: Record<string, unknown>, model: Model, response?: Record<string, unknown> | undefined): ResponsesFailedNoDetailsObservation;
declare function summarizeResponsesFailedNoDetailsObservation(observation: ResponsesFailedNoDetailsObservation): string;
declare function normalizeResponsesFailedEvent(event: Record<string, unknown>, model: Model): ResponsesFailedEventSummary;
declare function summarizeResponsesPayload(params: unknown): string;
//#endregion
//#region packages/ai/src/transports/openai-responses-contracts.d.ts
declare const OPENAI_RESPONSES_REASONING_REPLAY_META_KEY = "__openclaw_replay";
type OpenAIResponsesReasoningReplayMetadata = {
  v: 1;
  source: "openai-responses";
  provider: string;
  api: Api;
  model: string;
  baseUrlHash?: string;
  sessionHash?: string;
  authProfileHash?: string;
};
type ReplayableResponseReasoningItem = Omit<ResponseReasoningItem, "id"> & {
  id?: string;
  [OPENAI_RESPONSES_REASONING_REPLAY_META_KEY]?: OpenAIResponsesReasoningReplayMetadata;
};
type OpenAIResponsesOptions = BaseOpenAIStreamOptions & {
  reasoning?: OpenAIReasoningEffort;
  reasoningEffort?: OpenAIReasoningEffort;
  reasoningSummary?: "auto" | "detailed" | "concise" | null;
  replayResponsesItemIds?: boolean;
  serviceTier?: ResponseCreateParamsStreaming["service_tier"];
  toolChoice?: ResponseCreateParamsStreaming["tool_choice"];
};
type OpenAIResponsesReplayContext = {
  provider: string;
  api: Api;
  model: string;
  baseUrlHash?: string;
  sessionHash?: string;
  authProfileHash?: string;
};
type OpenAIResponsesRequestParams = {
  model: string;
  input: ResponseInput;
  stream: true;
  instructions?: string;
  prompt_cache_key?: string;
  prompt_cache_retention?: "24h";
  metadata?: Record<string, string>;
  store?: boolean;
  max_output_tokens?: number;
  temperature?: number;
  top_p?: number;
  text?: ResponseCreateParamsStreaming["text"];
  service_tier?: ResponseCreateParamsStreaming["service_tier"];
  tools?: FunctionTool[];
  tool_choice?: ResponseCreateParamsStreaming["tool_choice"];
  reasoning?: {
    effort: OpenAIApiReasoningEffort;
  } | {
    effort: OpenAIApiReasoningEffort;
    summary: NonNullable<OpenAIResponsesOptions["reasoningSummary"]>;
  };
  include?: string[];
};
//#endregion
//#region packages/ai/src/transports/openai-responses-params-internal.d.ts
declare function sanitizeOpenAICodexResponsesParams<T extends Record<string, unknown>>(model: Model, params: T): T;
declare function buildOpenAIResponsesParams(model: Model, context: Context, options: OpenAIResponsesOptions | undefined, metadata?: Record<string, string>): OpenAIResponsesRequestParams;
//#endregion
//#region packages/ai/src/transports/openai-responses-replay-internal.d.ts
type ResponsesClientLike = ReturnType<typeof createOpenAIResponsesClient>;
declare function isInvalidEncryptedContentError(error: unknown): boolean;
declare function stripResponsesRequestEncryptedContent(params: OpenAIResponsesRequestParams): OpenAIResponsesRequestParams;
declare function buildOpenAIResponsesReasoningReplayMetadata(model: Model, options?: Pick<BaseOpenAIStreamOptions, "authProfileId" | "sessionId">): OpenAIResponsesReasoningReplayMetadata;
declare function tagOpenAIResponsesReasoningReplayItem(item: Record<string, unknown>, model: Model, options?: Pick<BaseOpenAIStreamOptions, "authProfileId" | "sessionId">): Record<string, unknown>;
declare function prepareOpenAIResponsesReasoningItemForReplay(item: ReplayableResponseReasoningItem, context: OpenAIResponsesReplayContext, blockMetadata?: OpenAIResponsesReasoningReplayMetadata): ReplayableResponseReasoningItem;
declare function createResponsesStreamWithEncryptedContentRetry(params: {
  client: ResponsesClientLike;
  request: OpenAIResponsesRequestParams;
  requestOptions: unknown;
  model: Model;
}): Promise<{
  stream: AsyncIterable<unknown>;
  response: Response;
}>;
declare function resolveAzureOpenAIApiVersion(env?: NodeJS.ProcessEnv): string;
//#endregion
//#region packages/ai/src/transports/openai-responses-stream-terminal-internal.d.ts
type ResponsesEventSink = {
  push(event: AssistantMessageEvent): void;
};
//#endregion
//#region packages/ai/src/transports/openai-responses-stream-internal.d.ts
type ResponsesStreamOptions = FirstStreamEventInternalOptions & {
  serviceTier?: ResponseCreateParamsStreaming["service_tier"];
  resolveServiceTier?: (responseServiceTier: ResponseCreateParamsStreaming["service_tier"] | undefined, requestServiceTier: ResponseCreateParamsStreaming["service_tier"] | undefined) => ResponseCreateParamsStreaming["service_tier"] | undefined;
  applyServiceTierPricing?: (usage: Usage, serviceTier: ResponseCreateParamsStreaming["service_tier"] | undefined) => void;
  signal?: AbortSignal;
  reasoningReplayMetadata?: OpenAIResponsesReasoningReplayMetadata;
};
declare function processResponsesStream<TApi extends Api>(openaiStream: AsyncIterable<unknown>, output: AssistantMessage, stream: ResponsesEventSink, model: Model<TApi>, options?: ResponsesStreamOptions): Promise<void>;
//#endregion
//#region packages/ai/src/transports/openai-responses-transport.d.ts
declare const responsesTesting: {
  getCompat: typeof getCompat;
  assertCodeModeResponsesToolSurface: typeof assertCodeModeResponsesToolSurface;
  buildOpenAIResponsesParams: typeof buildOpenAIResponsesParams;
  buildOpenAIClientHeaders: typeof buildOpenAIClientHeaders;
  buildOpenAISdkClientOptions: typeof buildOpenAISdkClientOptions;
  buildOpenAISdkRequestOptions: typeof buildOpenAISdkRequestOptions;
  createAzureOpenAIClient: typeof createAzureOpenAIClient;
  createOpenAIResponsesClient: typeof createOpenAIResponsesClient;
  enforceCodeModeResponsesToolSurface: typeof enforceCodeModeResponsesToolSurface;
  sanitizeOpenAICodexResponsesParams: typeof sanitizeOpenAICodexResponsesParams;
  processResponsesStream: typeof processResponsesStream;
  formatModelTransportDebugBaseUrl: typeof formatModelTransportDebugBaseUrl;
  buildResponsesFailedNoDetailsObservation: typeof buildResponsesFailedNoDetailsObservation;
  buildOpenAIResponsesReasoningReplayMetadata: typeof buildOpenAIResponsesReasoningReplayMetadata;
  isInvalidEncryptedContentError: typeof isInvalidEncryptedContentError;
  normalizeResponsesFailedEvent: typeof normalizeResponsesFailedEvent;
  prepareOpenAIResponsesReasoningItemForReplay: typeof prepareOpenAIResponsesReasoningItemForReplay;
  createResponsesStreamWithEncryptedContentRetry: typeof createResponsesStreamWithEncryptedContentRetry;
  resolveAzureOpenAIApiVersion: typeof resolveAzureOpenAIApiVersion;
  stripResponsesRequestEncryptedContent: typeof stripResponsesRequestEncryptedContent;
  tagOpenAIResponsesReasoningReplayItem: typeof tagOpenAIResponsesReasoningReplayItem;
  summarizeResponsesFailedNoDetailsObservation: typeof summarizeResponsesFailedNoDetailsObservation;
  summarizeResponsesPayload: typeof summarizeResponsesPayload;
  summarizeResponsesTools: typeof summarizeResponsesTools;
  stringifyRedactedEvent: typeof stringifyRedactedEvent;
  stringifyRedactedPayload: typeof stringifyRedactedPayload;
};
declare global {
  var openclawOpenAIResponsesTransportTestApi: typeof responsesTesting | undefined;
}
//#endregion
//#region packages/ai/src/transports/provider-transport-stream.d.ts
type ProviderTransportStreamContext = {
  cfg?: unknown;
  agentDir?: string;
  workspaceDir?: string;
  env?: NodeJS.ProcessEnv;
};
/** Maps public model APIs to the internal transport API id used by simple runtime dispatch. */
declare function resolveTransportAwareSimpleApi(api: Api): Api | undefined;
/** Creates a managed transport stream only when request overrides require it. */
declare function createTransportAwareStreamFnForModel(model: Model, ctx?: ProviderTransportStreamContext): StreamFn | undefined;
/** Creates a managed OpenClaw transport stream for explicit fallback/runtime callers. */
declare function createOpenClawTransportStreamFnForModel(model: Model, ctx?: ProviderTransportStreamContext): StreamFn | undefined;
declare function createBoundaryAwareStreamFnForModel(model: Model, ctx?: ProviderTransportStreamContext): StreamFn | undefined;
declare function prepareTransportAwareSimpleModel<TApi extends Api>(model: Model<TApi>, ctx?: ProviderTransportStreamContext): Model;
declare function buildTransportAwareSimpleStreamFn(model: Model, ctx?: ProviderTransportStreamContext): StreamFn | undefined;
//#endregion
//#region packages/ai/src/transports/responses-image-payload-sanitizer.d.ts
/** Sanitize inline image fields inside a Responses API payload. */
declare function sanitizeResponsesImagePayload<T extends Record<string, unknown>>(params: T): T;
//#endregion
//#region packages/ai/src/transports/simple-completion-transport.d.ts
declare function normalizeCodexResponsesBaseUrlForOpenAISdk(baseUrl?: string): string;
declare function prepareModelForSimpleCompletion<TApi extends Api>(params: {
  apiRegistry: ApiRegistry;
  model: Model<TApi>;
  cfg?: unknown;
}): Model;
//#endregion
//#region packages/ai/src/transports/transport-stream-shared.d.ts
type ContextUsage = NonNullable<Usage["contextUsage"]>;
type TransportUsage = {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
  contextUsage?: ContextUsage;
  totalTokens: number;
  cost: {
    input: number;
    output: number;
    cacheRead: number;
    cacheWrite: number;
    total: number;
  };
};
type WritableTransportStream = {
  push(event: unknown): void;
  end(): void;
};
type TransportOutputShape = {
  stopReason: string;
  errorMessage?: string;
  errorCode?: string;
  errorType?: string;
  errorBody?: string;
};
declare function sanitizeTransportPayloadText(text: string): string;
declare function sanitizeNonEmptyTransportPayloadText(text: string, fallback?: string): string;
declare function coerceTransportToolCallArguments(argumentsValue: unknown): Record<string, unknown>;
declare function mergeTransportHeaders(...headerSources: Array<Record<string, string> | undefined>): Record<string, string> | undefined;
declare function mergeTransportMetadata<T extends Record<string, unknown>>(payload: T, metadata?: Record<string, string>): T;
declare function createEmptyTransportUsage(): TransportUsage;
declare function createWritableTransportEventStream(): {
  eventStream: AssistantMessageEventStream;
  stream: WritableTransportStream;
};
/**
 * Abort error to surface for an aborted `signal`.
 *
 * Rethrows the caller's abort reason only when it carries a `code`, so that code
 * survives into `errorCode` on the persisted assistant message and consumers can
 * recognize an abort's origin without matching error text. A default
 * `abort()` reason is an uncoded DOMException that carries nothing the synthetic
 * error does not, so it keeps the "Request was aborted" text every transport
 * already emits rather than churning it.
 */
declare function transportAbortError(signal?: AbortSignal): Error;
declare function finalizeTransportStream(params: {
  stream: WritableTransportStream;
  output: TransportOutputShape;
  signal?: AbortSignal;
}): void;
declare function assignTransportErrorDetails(output: TransportOutputShape, error: unknown, signal?: AbortSignal): void;
declare function failTransportStream(params: {
  stream: WritableTransportStream;
  output: TransportOutputShape;
  signal?: AbortSignal;
  error: unknown;
  cleanup?: () => void;
}): void;
//#endregion
//#region packages/ai/src/transports/transport-utils.d.ts
declare function isCodeModeModelVisibleToolName(name: string, visibleToolNames: ReadonlySet<string>): boolean;
//#endregion
export { GEMINI_THOUGHT_SIGNATURE_VALIDATOR_SKIP, MutableAssistantOutput, OpenAICompletionsContentDelta, type OpenAICompletionsOptions, OpenAIModeModel, ResolvedOpenAICompletionsCompat, WritableTransportStream, applyAnthropicCacheControlToMessages, applyAnthropicEphemeralCacheControlMarkers, applyAnthropicPayloadPolicyToParams, applyOpenAIResponsesPayloadPolicy, assertCodeModeResponsesToolSurface, assignTransportErrorDetails, buildOpenAIClientHeaders, buildOpenAICompletionsParams, buildOpenAISdkClientOptions, buildOpenAISdkRequestOptions, buildTransportAwareSimpleStreamFn, canonicalizeMaxTokensParam, coerceTransportToolCallArguments, createAnthropicMessagesTransportStreamFn, createAzureOpenAIResponsesTransportStreamFn, createBoundaryAwareStreamFnForModel, createDeepSeekTextFilter, createEmptyTransportUsage, createModelStreamCooperativeScheduler, createOpenAICompletionsTransportStreamFn, createOpenAIResponsesTransportStreamFn, createOpenClawTransportStreamFnForModel, createTransportAwareStreamFnForModel, createWritableTransportEventStream, detectOpenAICompletionsCompat, emitModelTransportDebug, enforceCodeModeResponsesToolSurface, failTransportStream, filterCodeModePayloadTools, finalizeTransportStream, flattenCompletionMessagesToStringContent, formatModelTransportDebugBaseUrl, formatModelTransportDebugUrl, getCompat, hasOpenAICompatibleConversationTurn, isCodeModeModelVisibleToolName, isOpenAICodexResponsesModel, isOpenAICompletionsThinkingEnabled, log, mergeTransportHeaders, mergeTransportMetadata, normalizeCodexResponsesBaseUrlForOpenAISdk, parseJsonObjectPreservingUnsafeIntegers, parseJsonPreservingUnsafeIntegers, parseOpenAICompletionsUsage, prepareModelForSimpleCompletion, prepareTransportAwareSimpleModel, quoteUnsafeIntegerLiterals, readCodeModePayloadToolName, readOpenAICompletionsContentDeltas, resolveAnthropicEphemeralCacheControl, resolveAnthropicMessagesUrl, resolveAnthropicPayloadPolicy, resolveCodeModeResponsesVisibleToolNames, resolveMaxTokensParam, resolveModelPayloadDebugMode, resolveModelSseDebugMode, resolveOpenAICompletionsCompat, resolveOpenAIReasoningEffortMap, resolveOpenAIResponsesPayloadPolicy, resolveOpenAIStrictToolFlagWithDiagnostics, resolvePromptCacheKey, resolveReplayableResponsesMessageId, resolveTransportAwareSimpleApi, sanitizeNonEmptyTransportPayloadText, sanitizeResponsesImagePayload, sanitizeTransportPayloadText, sortPromptCacheToolsByName as sortTransportToolsByName, stripCompletionMessagesToRoleContent, throwIfModelStreamAborted, transportAbortError, usesNativeOpenAICodexResponsesBackend };