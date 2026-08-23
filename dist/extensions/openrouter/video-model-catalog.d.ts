import { T as UnifiedModelCatalogEntry } from "../../manifest-registry-5AqPUfeS.js";
import { f as UnifiedModelCatalogProviderContext } from "../../plugin-entry-Ba15Paz9.js";
import { i as VideoGenerationProviderCapabilities, n as VideoGenerationModelCapabilitiesContext } from "../../video-generation-g0gV9UC7.js";

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