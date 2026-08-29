import { i as OpenClawConfig } from "../types.openclaw-DfLlB8Bo.js";
import { t as ProviderPlugin } from "../types-CQ0HkH232.js";
import { n as PluginMetadataRegistryView } from "../plugin-metadata-snapshot.types--sILz5c8.js";

//#region src/plugins/provider-discovery.runtime.d.ts
declare function resolvePluginDiscoveryProvidersRuntime(params: {
  config?: OpenClawConfig;
  workspaceDir?: string;
  env?: NodeJS.ProcessEnv;
  bundledProviderVitestCompat?: boolean;
  onlyPluginIds?: string[];
  includeUntrustedWorkspacePlugins?: boolean;
  requireCompleteDiscoveryEntryCoverage?: boolean;
  discoveryEntriesOnly?: boolean;
  includeManifestModelCatalogProviders?: boolean;
  includeSyntheticAuthProviders?: boolean;
  pluginMetadataSnapshot?: PluginMetadataRegistryView;
}): ProviderPlugin[];
//#endregion
export { resolvePluginDiscoveryProvidersRuntime };