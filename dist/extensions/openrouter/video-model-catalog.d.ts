import { T as UnifiedModelCatalogEntry } from "../../manifest-registry-B_Ya6t5q.js";
import { f as UnifiedModelCatalogProviderContext } from "../../plugin-entry-C6mhVz2t.js";
import { i as VideoGenerationProviderCapabilities, n as VideoGenerationModelCapabilitiesContext } from "../../video-generation-BzctQhrg.js";

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