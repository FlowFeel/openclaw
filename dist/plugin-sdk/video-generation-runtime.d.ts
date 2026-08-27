import { n as OpenClawConfig } from "../types.openclaw-B4JlK2kd.js";
import { nn as GenerateVideoRuntimeResult, tn as GenerateVideoParams } from "../types-DlorAczx.js";
import { t as SubsystemLogger } from "../subsystem-RmDRaRJV.js";
import { c as VideoGenerationProvider } from "../types-D7KuwZHu.js";
import { n as getProviderEnvVars } from "../provider-env-vars-FZEzpQ8b.js";
import { n as listVideoGenerationProviders, t as getVideoGenerationProvider } from "../provider-registry-C8ba-GRw.js";

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