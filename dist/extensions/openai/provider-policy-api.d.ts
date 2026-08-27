import { Q as ProviderThinkingProfile, x as ProviderNormalizeResolvedModelContext, y as ProviderDefaultThinkingPolicyContext } from "../../plugin-entry-DZ50A-uD.js";
import { o as ModelProviderConfig } from "../../types.models-BEJn4TTJ.js";
import { a as ProviderResolveModelRoutesContext, i as ProviderNormalizeModelCatalogIdContext, n as ProviderModelRouteResolution } from "../../provider-model-types-Be5uEMwN.js";
//#region extensions/openai/provider-policy-api.d.ts
/** Canonical logical id for OpenAI catalog projection. */
declare function normalizeModelCatalogId(params: ProviderNormalizeModelCatalogIdContext): string | null;
/** Resolves authored OpenAI provider config without activating the runtime plugin. */
declare function resolveAuthoredOpenAIProviderConfig(params: {
  provider: string;
  config?: {
    models?: {
      providers?: Record<string, ModelProviderConfig | undefined>;
    };
  };
}): ModelProviderConfig | undefined;
/**
 * Skips full runtime loading only when OpenAI normalization is provably a no-op.
 * Transport-sensitive routes and legacy model aliases still use the runtime hook.
 */
declare function projectConfiguredModelRow(ctx: ProviderNormalizeResolvedModelContext): null | undefined;
/** Resolves every physical row for one logical OpenAI model in provider order. */
declare function resolveModelRoutes(context: ProviderResolveModelRoutesContext): ProviderModelRouteResolution;
declare function normalizeConfig(params: {
  provider: string;
  providerConfig: ModelProviderConfig;
}): ModelProviderConfig;
declare function resolveThinkingProfile(params: ProviderDefaultThinkingPolicyContext): ProviderThinkingProfile | null;
//#endregion
export { normalizeConfig, normalizeModelCatalogId, projectConfiguredModelRow, resolveAuthoredOpenAIProviderConfig, resolveModelRoutes, resolveThinkingProfile };