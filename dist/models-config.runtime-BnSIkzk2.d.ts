import { i as OpenClawConfig } from "./types.openclaw-3lPuYQv-.js";
import { T as PreparedProviderStaticCatalog } from "./types-CRZpySL92.js";
import { r as PluginMetadataSnapshot } from "./plugin-metadata-snapshot.types-C2GH8pkR.js";
//#region src/agents/models-config-state.d.ts
type ModelsJsonReadyResult = {
  agentDir: string;
  wrote: boolean;
};
//#endregion
//#region src/agents/models-config.d.ts
type EnsureOpenClawModelsJsonOptions = {
  env?: NodeJS.ProcessEnv;
  pluginMetadataSnapshot?: Pick<PluginMetadataSnapshot, "index" | "manifestRegistry" | "owners">;
  preparedStaticProviderCatalog?: PreparedProviderStaticCatalog;
  workspaceDir?: string;
  providerDiscoveryProviderIds?: readonly string[];
  providerDiscoveryTimeoutMs?: number;
  providerDiscoveryEntriesOnly?: boolean;
};
/** Ensures models.json and the agent SQLite catalog cache are current. */
declare function ensureOpenClawModelsJson(config?: OpenClawConfig, agentDirOverride?: string, options?: EnsureOpenClawModelsJsonOptions): Promise<ModelsJsonReadyResult>;
//#endregion
export { ensureOpenClawModelsJson as t };