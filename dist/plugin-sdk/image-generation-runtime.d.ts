import { n as OpenClawConfig } from "../types.openclaw-ymL1Xg7f.js";
import { in as GenerateImageRuntimeResult, rn as GenerateImageParams } from "../types-CtdP6tZL.js";
import { t as SubsystemLogger } from "../subsystem-RmDRaRJV.js";
import { l as ImageGenerationProvider } from "../types-BBJVTByg.js";
import { n as getProviderEnvVars } from "../provider-env-vars-BUQJ0Cza.js";
import { n as listImageGenerationProviders, t as getImageGenerationProvider } from "../provider-registry-D39-BmXe.js";

//#region src/image-generation/runtime.d.ts
declare const log: SubsystemLogger;
/** Dependency seam used by image-generation runtime tests and plugin host callers. */
type ImageGenerationRuntimeDeps = {
  getProvider?: typeof getImageGenerationProvider;
  listProviders?: typeof listImageGenerationProviders;
  getProviderEnvVars?: typeof getProviderEnvVars;
  log?: Pick<typeof log, "warn">;
};
/** Lists image-generation providers visible for the current config. */
declare function listRuntimeImageGenerationProviders(params?: {
  config?: OpenClawConfig;
}, deps?: ImageGenerationRuntimeDeps): ImageGenerationProvider[];
declare function generateImage(params: GenerateImageParams, deps?: ImageGenerationRuntimeDeps): Promise<GenerateImageRuntimeResult>;
//#endregion
export { type GenerateImageParams, type GenerateImageRuntimeResult, generateImage, listRuntimeImageGenerationProviders };