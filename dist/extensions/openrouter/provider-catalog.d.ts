import { j as ModelProviderDeclarationConfig } from "../../types.openclaw-lExroEnq.js";
import { r as SsrFPolicy } from "../../ssrf-BmS65x05.js";
import { t as LiveModelCatalogFetchGuard } from "../../provider-catalog-live-runtime-CY2HKNxf.js";
import { r as resolveProviderHttpRequestConfig } from "../../provider-http-DA8dj3Tz.js";

//#region extensions/openrouter/provider-catalog.d.ts
declare const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
declare function normalizeOpenRouterBaseUrl(baseUrl: string | undefined): string | undefined;
declare function resolveOpenRouterApiBaseUrl(baseUrl: string | undefined): string;
declare function resolveOpenRouterSsrfPolicy(requestConfig: Pick<ReturnType<typeof resolveProviderHttpRequestConfig>, "baseUrl" | "allowPrivateNetwork">, request?: ModelProviderDeclarationConfig["request"]): SsrFPolicy | undefined;
declare function isOpenRouterProxyReasoningUnsupportedModel(modelId: string | undefined): boolean;
declare function buildOpenrouterProvider(): ModelProviderDeclarationConfig;
declare function buildOpenrouterLiveProvider(params: {
  apiKey?: string;
  discoveryApiKey?: string;
  baseUrl?: string;
  request?: ModelProviderDeclarationConfig["request"];
  fetchGuard?: LiveModelCatalogFetchGuard;
  signal?: AbortSignal;
}): Promise<ModelProviderDeclarationConfig>;
//#endregion
export { OPENROUTER_BASE_URL, buildOpenrouterLiveProvider, buildOpenrouterProvider, isOpenRouterProxyReasoningUnsupportedModel, normalizeOpenRouterBaseUrl, resolveOpenRouterApiBaseUrl, resolveOpenRouterSsrfPolicy };