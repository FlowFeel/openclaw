import { n as PluginManifestRegistry } from "../manifest-registry-CVXQFOT4.js";
import { i as InstalledPluginIndex, n as PluginMetadataSnapshot } from "../plugin-metadata-snapshot.types-B7Oza1hi.js";
import { St as augmentModelCatalogWithProviderPlugins } from "../types-BMOPjNqu.js";
import { t as PluginLoadOptions } from "../loader-omiREMea.js";
import { n as resolvePluginProviders, t as isPluginProvidersLoadInFlight } from "../providers.runtime-AW2B1kXs.js";
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