import { n as PluginManifestRegistry } from "../manifest-registry-D4clTLHV.js";
import { i as InstalledPluginIndex, n as PluginMetadataSnapshot } from "../plugin-metadata-snapshot.types-BRAGhUAG.js";
import { St as augmentModelCatalogWithProviderPlugins } from "../types-CVuq6K6F.js";
import { t as PluginLoadOptions } from "../loader-Cj40V536.js";
import { n as resolvePluginProviders, t as isPluginProvidersLoadInFlight } from "../providers.runtime-BpX7nEjb.js";
import { DatabaseSync } from "node:sqlite";

//#region src/plugins/plugin-registry-snapshot.d.ts
type PluginRegistrySnapshot = InstalledPluginIndex;
//#endregion
//#region src/plugins/providers.d.ts
type ProviderManifestLoadParams = {
  config?: PluginLoadOptions["config"];
  workspaceDir?: string;
  env?: PluginLoadOptions["env"];
  registry?: PluginRegistrySnapshot;
  manifestRegistry?: PluginManifestRegistry;
  metadataSnapshot?: Pick<PluginMetadataSnapshot, "manifestRegistry"> & Partial<Pick<PluginMetadataSnapshot, "owners" | "byPluginId">>;
};
declare function resolveOwningPluginIdsForProvider(params: {
  provider: string;
  config?: PluginLoadOptions["config"];
  workspaceDir?: string;
  env?: PluginLoadOptions["env"];
  manifestRegistry?: PluginManifestRegistry;
  metadataSnapshot?: Pick<PluginMetadataSnapshot, "owners" | "manifestRegistry" | "byPluginId">;
}): string[] | undefined;
declare function resolveCatalogHookProviderPluginIds(params: {
  config?: PluginLoadOptions["config"];
  workspaceDir?: string;
  env?: PluginLoadOptions["env"];
  metadataSnapshot?: ProviderManifestLoadParams["metadataSnapshot"];
}): string[];
//#endregion
export { augmentModelCatalogWithProviderPlugins, isPluginProvidersLoadInFlight, resolveCatalogHookProviderPluginIds, resolveOwningPluginIdsForProvider, resolvePluginProviders };