import { A as ProviderRuntimeModel } from "../../types-B3KbIvCl.js";
import { u as ModelProviderDeclarationConfig } from "../../types.openclaw-hJEKisz6.js";
import { t as LiveModelCatalogFetchGuard } from "../../provider-catalog-live-runtime-4zY-OGQF.js";
//#region extensions/clawrouter/provider-catalog.d.ts
declare function normalizeClawRouterRootUrl(baseUrl: string | undefined): string;
declare function normalizeClawRouterApiBaseUrl(baseUrl: string | undefined): string;
declare function buildClawRouterProviderConfig(params: {
  apiKey: string;
  discoveryApiKey?: string;
  baseUrl?: string;
  fetchGuard?: LiveModelCatalogFetchGuard;
}): Promise<ModelProviderDeclarationConfig>;
declare function normalizeClawRouterResolvedModel(model: ProviderRuntimeModel): ProviderRuntimeModel | undefined;
declare function prepareClawRouterRequestModel(model: ProviderRuntimeModel): ProviderRuntimeModel;
//#endregion
export { buildClawRouterProviderConfig, normalizeClawRouterApiBaseUrl, normalizeClawRouterResolvedModel, normalizeClawRouterRootUrl, prepareClawRouterRequestModel };