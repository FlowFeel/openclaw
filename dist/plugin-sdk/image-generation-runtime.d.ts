import { n as OpenClawConfig } from "../types.openclaw-B4JlK2kd.js";
import { in as GenerateImageRuntimeResult, rn as GenerateImageParams } from "../types-DlorAczx.js";
import { t as SubsystemLogger } from "../subsystem-RmDRaRJV.js";
import { l as ImageGenerationProvider } from "../types-Dgl6wS7O.js";
import { n as getProviderEnvVars } from "../provider-env-vars-FZEzpQ8b.js";
import { n as listImageGenerationProviders, t as getImageGenerationProvider } from "../provider-registry-bq7WcmOg.js";

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