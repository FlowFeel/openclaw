import { u as ModelProviderDeclarationConfig } from "../../types.openclaw-DPyC_juj.js";
import { t as LiveModelCatalogFetchGuard } from "../../provider-catalog-live-runtime-4zY-OGQF.js";
//#region extensions/google/provider-catalog.d.ts
declare function buildGoogleStaticCatalogProvider(): ModelProviderDeclarationConfig;
declare function buildGoogleLiveCatalogProvider(params: {
  apiKey?: string;
  discoveryApiKey?: string;
  fetchGuard?: LiveModelCatalogFetchGuard;
  signal?: AbortSignal;
}): Promise<ModelProviderDeclarationConfig>;
declare function buildGoogleVertexStaticCatalogProvider(): ModelProviderDeclarationConfig;
//#endregion
export { buildGoogleLiveCatalogProvider, buildGoogleStaticCatalogProvider, buildGoogleVertexStaticCatalogProvider };