import { n as OpenClawConfig } from "../types.openclaw-ymL1Xg7f.js";
import { nn as GenerateVideoRuntimeResult, tn as GenerateVideoParams } from "../types-CtdP6tZL.js";
import { t as SubsystemLogger } from "../subsystem-RmDRaRJV.js";
import { c as VideoGenerationProvider } from "../types-D92IaxH8.js";
import { n as getProviderEnvVars } from "../provider-env-vars-BUQJ0Cza.js";
import { n as listVideoGenerationProviders, t as getVideoGenerationProvider } from "../provider-registry-Mhgegbz6.js";

//#region src/video-generation/runtime.d.ts
declare const log: SubsystemLogger;
type VideoGenerationRuntimeDeps = {
  getProvider?: typeof getVideoGenerationProvider;
  listProviders?: typeof listVideoGenerationProviders;
  getProviderEnvVars?: typeof getProviderEnvVars;
  log?: Pick<typeof log, "debug" | "warn">;
};
declare function listRuntimeVideoGenerationProviders(params?: {
  config?: OpenClawConfig;
}, deps?: VideoGenerationRuntimeDeps): VideoGenerationProvider[];
declare function generateVideo(params: GenerateVideoParams, deps?: VideoGenerationRuntimeDeps): Promise<GenerateVideoRuntimeResult>;
//#endregion
export { type GenerateVideoParams, type GenerateVideoRuntimeResult, generateVideo, listRuntimeVideoGenerationProviders };