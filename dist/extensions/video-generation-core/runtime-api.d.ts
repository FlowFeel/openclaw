import { B as getProviderEnvVars, N as getVideoGenerationProvider, P as listVideoGenerationProviders, h as GenerateVideoRuntimeResult, m as GenerateVideoParams } from "../../types-kmCR57lP.js";
import { n as OpenClawConfig } from "../../types.openclaw-Becy5MdM.js";
import { m as SubsystemLogger } from "../../types-C7sdoOVw.js";
import { o as VideoGenerationProvider } from "../../types-D4lhE2hd.js";

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