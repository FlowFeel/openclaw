//#region packages/model-catalog-core/src/model-catalog-types.d.ts
/** Supported API protocols for model catalog entries. */
declare const MODEL_CATALOG_APIS: readonly ["openai-completions", "openai-responses", "openai-chatgpt-responses", "anthropic-messages", "google-generative-ai", "google-vertex", "github-copilot", "bedrock-converse-stream", "ollama", "azure-openai-responses"];
/** API protocol for a model catalog entry. */
type ModelCatalogApi = (typeof MODEL_CATALOG_APIS)[number];
/** Supported model thinking/reasoning wire formats. */
declare const MODEL_CATALOG_THINKING_FORMATS: readonly ["openai", "openrouter", "deepseek", "together", "qwen", "qwen-chat-template", "zai"];
/** Thinking/reasoning wire format for model compatibility. */
type ModelCatalogThinkingFormat = (typeof MODEL_CATALOG_THINKING_FORMATS)[number];
/** Narrow a string to a supported model catalog thinking format. */
declare function isModelCatalogThinkingFormat(value: string): value is ModelCatalogThinkingFormat;
/** Compatibility flags and provider-specific routing metadata for one model. */
type ModelCatalogCompatConfig = {
  supportsStore?: boolean;
  supportsDeveloperRole?: boolean;
  supportsReasoningEffort?: boolean; /** Whether the model accepts the temperature parameter (GPT-5.6 family rejects it). */
  supportsTemperature?: boolean;
  supportsUsageInStreaming?: boolean;
  supportsStrictMode?: boolean;
  supportsJsonSchemaResponseFormat?: boolean;
  maxTokensField?: "max_completion_tokens" | "max_tokens";
  requiresToolResultName?: boolean;
  requiresAssistantAfterToolResult?: boolean;
  requiresThinkingAsText?: boolean;
  requiresReasoningContentOnAssistantMessages?: boolean;
  openRouterRouting?: ModelCatalogOpenRouterRouting;
  vercelGatewayRouting?: ModelCatalogVercelGatewayRouting;
  zaiToolStream?: boolean;
  cacheControlFormat?: "anthropic";
  sendSessionAffinityHeaders?: boolean;
  sendSessionIdHeader?: boolean;
  supportsEagerToolInputStreaming?: boolean;
  supportsLongCacheRetention?: boolean;
  supportsPromptCacheKey?: boolean;
  supportsTools?: boolean; /** Code-mode tier consumed by `tools.codeMode.enabled: "auto"`; absent means "capable". */
  codeMode?: "preferred" | "capable";
  requiresStringContent?: boolean;
  strictMessageKeys?: boolean;
  toolSchemaProfile?: string;
  unsupportedToolSchemaKeywords?: string[];
  toolCallArgumentsEncoding?: string;
  requiresOpenAiAnthropicToolPayload?: boolean;
  thinkingFormat?: ModelCatalogThinkingFormat;
  supportedReasoningEfforts?: string[];
  reasoningEffortMap?: Record<string, string>;
  visibleReasoningDetailTypes?: string[];
};
/** OpenRouter routing preferences copied into request metadata. */
type ModelCatalogOpenRouterRouting = {
  allow_fallbacks?: boolean;
  require_parameters?: boolean;
  data_collection?: "deny" | "allow";
  zdr?: boolean;
  enforce_distillable_text?: boolean;
  order?: string[];
  only?: string[];
  ignore?: string[];
  quantizations?: string[];
  sort?: string | {
    by?: string;
    partition?: string | null;
  };
  max_price?: {
    prompt?: number | string;
    completion?: number | string;
    image?: number | string;
    audio?: number | string;
    request?: number | string;
  };
  preferred_min_throughput?: number | {
    p50?: number;
    p75?: number;
    p90?: number;
    p99?: number;
  };
  preferred_max_latency?: number | {
    p50?: number;
    p75?: number;
    p90?: number;
    p99?: number;
  };
};
/** Vercel AI Gateway routing preferences. */
type ModelCatalogVercelGatewayRouting = {
  only?: string[];
  order?: string[];
};
/** Image input limits for a model. */
type ModelCatalogImageInputConfig = {
  maxBytes?: number;
  maxPixels?: number;
  maxSidePx?: number;
  preferredSidePx?: number;
  tokenMode?: "tile" | "detail" | "provider";
};
/** Media input limits for a model. */
type ModelCatalogMediaInputConfig = {
  image?: ModelCatalogImageInputConfig;
};
/** Supported input modality for a model. */
type ModelCatalogInput = "text" | "image" | "document";
/** Model-level thinking settings carried by provider catalog metadata. */
declare const MODEL_CATALOG_THINKING_LEVELS: readonly ["off", "minimal", "low", "medium", "high", "xhigh", "max"];
type ModelCatalogThinkingLevel = (typeof MODEL_CATALOG_THINKING_LEVELS)[number];
type ModelCatalogThinkingLevelMap = Partial<Record<ModelCatalogThinkingLevel, string | null>>;
/** Discovery lifecycle for a provider catalog. */
type ModelCatalogDiscovery = "static" | "refreshable" | "runtime";
/** Availability state for a model. */
type ModelCatalogStatus = "available" | "preview" | "deprecated" | "disabled";
/** Source of a model catalog row. */
type ModelCatalogSource = "manifest" | "provider-index" | "cache" | "config" | "runtime-refresh";
/** Unified catalog kind across text and generated media models. */
type UnifiedModelCatalogKind = "text" | "voice" | "image_generation" | "video_generation" | "music_generation";
/** Source for unified model catalog entries. */
type UnifiedModelCatalogSource = "manifest" | "provider-index" | "static" | "live" | "cache" | "configured" | "runtime-refresh";
/** Unified model catalog entry for provider/model pickers. */
type UnifiedModelCatalogEntry<TCapabilities = unknown> = {
  kind: UnifiedModelCatalogKind;
  provider: string;
  model: string;
  label?: string;
  source: UnifiedModelCatalogSource;
  default?: boolean;
  configured?: boolean;
  capabilities?: TCapabilities;
  modes?: readonly string[];
  authEnvVars?: readonly string[];
  docsPath?: string;
  fetchedAt?: number;
  expiresAt?: number;
  warnings?: readonly string[];
};
/** Tiered token cost row. */
type ModelCatalogTieredCost = {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
  range: [number, number] | [number];
};
/** Token cost metadata for one model. */
type ModelCatalogCost = {
  input?: number;
  output?: number;
  cacheRead?: number;
  cacheWrite?: number;
  tieredPricing?: ModelCatalogTieredCost[];
};
/** Provider manifest model entry. */
type ModelCatalogModel = {
  id: string;
  name?: string;
  api?: ModelCatalogApi;
  baseUrl?: string;
  headers?: Record<string, string>;
  input?: ModelCatalogInput[];
  reasoning?: boolean;
  contextWindow?: number;
  contextTokens?: number;
  maxTokens?: number;
  thinkingLevelMap?: ModelCatalogThinkingLevelMap;
  cost?: ModelCatalogCost;
  compat?: ModelCatalogCompatConfig;
  /**
   * Provider/model ref of the same upstream model in another bundled catalog,
   * for vendors reachable through several provider ids under different model
   * ids. Authoring metadata only: normalization drops it, and the shared-model
   * contract test uses it to keep `compat` capability tiers from drifting apart.
   */
  upstreamModel?: string;
  mediaInput?: ModelCatalogMediaInputConfig;
  status?: ModelCatalogStatus;
  statusReason?: string;
  replaces?: string[];
  replacedBy?: string;
  tags?: string[];
};
/** Provider manifest catalog entry. */
type ModelCatalogProvider = {
  baseUrl?: string;
  api?: ModelCatalogApi;
  headers?: Record<string, string>; /** Provider-recommended primary model id. */
  defaultModel?: string; /** Provider-recommended small model id for short internal utility tasks. */
  defaultUtilityModel?: string;
  models: ModelCatalogModel[];
};
/** Provider alias entry. */
type ModelCatalogAlias = {
  provider: string;
  api?: ModelCatalogApi;
  baseUrl?: string;
};
/** Suppression rule for hiding a provider/model under matching config. */
type ModelCatalogSuppression = {
  provider: string;
  model: string;
  reason?: string;
  when?: {
    baseUrlHosts?: string[];
    providerConfigApiIn?: string[];
  };
};
/** Raw model catalog manifest shape. */
type ModelCatalog = {
  providers?: Record<string, ModelCatalogProvider>;
  aliases?: Record<string, ModelCatalogAlias>;
  suppressions?: ModelCatalogSuppression[];
  discovery?: Record<string, ModelCatalogDiscovery>;
  runtimeAugment?: boolean;
};
/** Normalized model catalog row used by runtime lookup and UI surfaces. */
type NormalizedModelCatalogRow = {
  provider: string;
  id: string;
  ref: string;
  mergeKey: string;
  name: string;
  source: ModelCatalogSource;
  input: ModelCatalogInput[];
  reasoning: boolean;
  status: ModelCatalogStatus;
  api?: ModelCatalogApi;
  baseUrl?: string;
  headers?: Record<string, string>;
  contextWindow?: number;
  contextTokens?: number;
  maxTokens?: number;
  thinkingLevelMap?: ModelCatalogThinkingLevelMap;
  cost?: ModelCatalogCost;
  compat?: ModelCatalogCompatConfig;
  mediaInput?: ModelCatalogMediaInputConfig;
  statusReason?: string;
  replaces?: string[];
  replacedBy?: string;
  tags?: string[];
};
//#endregion
export { MODEL_CATALOG_APIS, MODEL_CATALOG_THINKING_FORMATS, MODEL_CATALOG_THINKING_LEVELS, ModelCatalog, ModelCatalogAlias, ModelCatalogApi, ModelCatalogCompatConfig, ModelCatalogCost, ModelCatalogDiscovery, ModelCatalogImageInputConfig, ModelCatalogInput, ModelCatalogMediaInputConfig, ModelCatalogModel, ModelCatalogOpenRouterRouting, ModelCatalogProvider, ModelCatalogSource, ModelCatalogStatus, ModelCatalogSuppression, ModelCatalogThinkingFormat, ModelCatalogThinkingLevel, ModelCatalogThinkingLevelMap, ModelCatalogTieredCost, ModelCatalogVercelGatewayRouting, NormalizedModelCatalogRow, UnifiedModelCatalogEntry, UnifiedModelCatalogKind, UnifiedModelCatalogSource, isModelCatalogThinkingFormat };