import { T as UnifiedModelCatalogEntry } from "../../manifest-registry-DCsAetxD.js";
import { f as UnifiedModelCatalogProviderContext } from "../../plugin-entry-COORsTlt.js";
import { i as VideoGenerationProviderCapabilities, n as VideoGenerationModelCapabilitiesContext } from "../../video-generation-DiHMkGt7.js";

//#region extensions/openrouter/video-model-catalog.d.ts
type OpenRouterVideoModelCatalogCapabilities = VideoGenerationProviderCapabilities & {
  allowedPassthroughParameters?: readonly string[];
  canonicalSlug?: string;
  created?: number;
  description?: string;
  pricingSkus?: Readonly<Record<string, string>>;
};
declare function listOpenRouterVideoModelCatalog(ctx: UnifiedModelCatalogProviderContext): Promise<Array<UnifiedModelCatalogEntry<OpenRouterVideoModelCatalogCapabilities>> | null>;
declare function resolveOpenRouterVideoModelCapabilities(ctx: VideoGenerationModelCapabilitiesContext): Promise<VideoGenerationProviderCapabilities | undefined>;
//#endregion
export { listOpenRouterVideoModelCatalog, resolveOpenRouterVideoModelCapabilities };