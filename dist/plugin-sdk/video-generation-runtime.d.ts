import { n as OpenClawConfig } from "../types.openclaw-B-6RRL7F.js";
import { nn as GenerateVideoRuntimeResult, tn as GenerateVideoParams } from "../types-CrfqAVvH.js";
import { t as SubsystemLogger } from "../subsystem-RmDRaRJV.js";
import { c as VideoGenerationProvider } from "../types-BxdX8JcN.js";
import { n as getProviderEnvVars } from "../provider-env-vars-DMJl7-H2.js";
import { n as listVideoGenerationProviders, t as getVideoGenerationProvider } from "../provider-registry-BbEDsMC3.js";

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