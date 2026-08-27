import { r as OpenClawConfig } from "../types.openclaw-BwKjboya.js";
import { $n as registerMemoryCorpusSupplement, Bn as MemoryPluginCapability, Jn as buildMemoryPromptSection, Qn as registerMemoryCapability, Un as MemoryPromptSectionBuilder, Vn as MemoryPluginPublicArtifact, Xn as getMemoryCapabilityRegistration, Yn as clearMemoryPluginState, Zn as listActiveMemoryPublicArtifacts } from "../types-CaDBLrp9.js";
import { z as resolveSessionTranscriptsDirForAgent } from "../session-store-runtime-B2qLSO4P.js";
import { d as resolveDefaultAgentId, n as resolveSessionAgentId } from "../agent-scope-CsoE8OJv.js";

//#region src/plugin-sdk/memory-host-core.d.ts
/** Lists public memory artifacts across all configured memory workspaces. */
declare function listMemoryHostPublicArtifacts(params: {
  cfg: OpenClawConfig;
}): Promise<MemoryPluginPublicArtifact[]>;
//#endregion
export { type MemoryPluginCapability, type MemoryPluginPublicArtifact, type MemoryPromptSectionBuilder, buildMemoryPromptSection as buildActiveMemoryPromptSection, clearMemoryPluginState, getMemoryCapabilityRegistration, listActiveMemoryPublicArtifacts, listMemoryHostPublicArtifacts, registerMemoryCapability, registerMemoryCorpusSupplement, resolveDefaultAgentId, resolveSessionAgentId, resolveSessionTranscriptsDirForAgent };