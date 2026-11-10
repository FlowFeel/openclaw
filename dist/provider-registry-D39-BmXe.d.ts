import { n as OpenClawConfig } from "./types.openclaw-ymL1Xg7f.js";
import { m as ImageGenerationProviderPlugin } from "./types-CtdP6tZL.js";

//#region src/image-generation/provider-registry.d.ts
/** Lists canonical image-generation providers visible for config. */
declare function listImageGenerationProviders(cfg?: OpenClawConfig): ImageGenerationProviderPlugin[];
/** Resolves an image-generation provider by canonical id or alias. */
declare function getImageGenerationProvider(providerId: string | undefined, cfg?: OpenClawConfig): ImageGenerationProviderPlugin | undefined;
//#endregion
export { listImageGenerationProviders as n, getImageGenerationProvider as t };