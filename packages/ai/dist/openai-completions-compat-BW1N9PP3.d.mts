import { E as Model, O as OpenAICompletionsCompat } from "./types-CH7ReIcU.mjs";
import { a as AiProviderRequestPolicyInput, i as AiProviderRequestCapabilities } from "./host-Dn4_SZI2.mjs";

//#region packages/ai/src/transports/openai-completions-compat.d.ts
type ProviderRequestCapabilities = AiProviderRequestCapabilities;
type OpenAICompletionsSessionAffinity = "none" | "openai" | "openrouter";
type OpenAICompletionsCompatDefaults = {
  supportsStore: boolean;
  supportsDeveloperRole: boolean;
  supportsReasoningEffort: boolean;
  supportsUsageInStreaming: boolean;
  maxTokensField: "max_completion_tokens" | "max_tokens";
  thinkingFormat: "openai" | "openrouter" | "deepseek" | "together" | "zai";
  visibleReasoningDetailTypes: string[];
  supportsStrictMode: boolean;
  supportsJsonSchemaResponseFormat: boolean;
  requiresReasoningContentOnAssistantMessages: boolean;
  requiresNonEmptyUserOrAssistantMessage: boolean;
  cacheControlFormat?: OpenAICompletionsCompat["cacheControlFormat"];
  sessionAffinityFormat: Exclude<OpenAICompletionsSessionAffinity, "none">;
  supportsLongCacheRetention: boolean;
};
type DetectedOpenAICompletionsCompat = {
  capabilities: ProviderRequestCapabilities;
  defaults: OpenAICompletionsCompatDefaults;
};
type ResolvedOpenAICompletionsCompat = Omit<Required<OpenAICompletionsCompat>, "cacheControlFormat" | "openRouterRouting" | "sendSessionAffinityHeaders"> & {
  cacheControlFormat?: OpenAICompletionsCompat["cacheControlFormat"];
  openRouterRouting?: OpenAICompletionsCompat["openRouterRouting"];
  sessionAffinity: OpenAICompletionsSessionAffinity;
  visibleReasoningDetailTypes: string[];
  requiresNonEmptyUserOrAssistantMessage: boolean;
};
/** Detects endpoint capabilities and defaults for an OpenAI-completions model. */
declare function detectOpenAICompletionsCompat(model: Pick<Model<"openai-completions">, "provider" | "baseUrl" | "id"> & {
  compat?: {
    supportsStore?: boolean;
  } | null;
}, resolveCapabilities?: (input: AiProviderRequestPolicyInput) => ProviderRequestCapabilities): DetectedOpenAICompletionsCompat;
/** Applies explicit model overrides once on top of the canonical transport defaults. */
declare function resolveOpenAICompletionsCompat(model: Model<"openai-completions">, resolveCapabilities?: (input: AiProviderRequestPolicyInput) => ProviderRequestCapabilities): ResolvedOpenAICompletionsCompat;
//#endregion
export { detectOpenAICompletionsCompat as n, resolveOpenAICompletionsCompat as r, ResolvedOpenAICompletionsCompat as t };