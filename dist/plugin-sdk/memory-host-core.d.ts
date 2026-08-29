import { r as OpenClawConfig } from "../types.openclaw-C7iFpWwX.js";
import { $n as registerMemoryCorpusSupplement, Bn as MemoryPluginCapability, Jn as buildMemoryPromptSection, Qn as registerMemoryCapability, Un as MemoryPromptSectionBuilder, Vn as MemoryPluginPublicArtifact, Xn as getMemoryCapabilityRegistration, Yn as clearMemoryPluginState, Zn as listActiveMemoryPublicArtifacts } from "../types-CVuq6K6F.js";
import { z as resolveSessionTranscriptsDirForAgent } from "../session-store-runtime-BfZUBOPg.js";
import { d as resolveDefaultAgentId, n as resolveSessionAgentId } from "../agent-scope-CeMvfb5u.js";

//#region src/plugin-sdk/memory-host-core.d.ts
/** Lists public memory artifacts across all configured memory workspaces. */
declare function listMemoryHostPublicArtifacts(params: {
  cfg: OpenClawConfig;
}): Promise<MemoryPluginPublicArtifact[]>;
//#endregion
export { type MemoryPluginCapability, type MemoryPluginPublicArtifact, type MemoryPromptSectionBuilder, buildMemoryPromptSection as buildActiveMemoryPromptSection, clearMemoryPluginState, getMemoryCapabilityRegistration, listActiveMemoryPublicArtifacts, listMemoryHostPublicArtifacts, registerMemoryCapability, registerMemoryCorpusSupplement, resolveDefaultAgentId, resolveSessionAgentId, resolveSessionTranscriptsDirForAgent };