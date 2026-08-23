import { Et as SubsystemLogger, K as GenerateImageParams, at as getImageGenerationProvider, mt as getProviderEnvVars, ot as listImageGenerationProviders, q as GenerateImageRuntimeResult } from "../../plugin-entry-D2U6D_c3.js";
import { n as OpenClawConfig } from "../../types.openclaw-_47ZKysp.js";
import { o as ImageGenerationProvider } from "../../types-CJCX-FF5.js";

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