import { i as OpenClawConfig } from "../types.openclaw-DvmDDNUn.js";
import { w as loadManifestModelCatalog } from "../types-Ma6iYIWk2.js";
import { c as ModelCatalogSnapshot, s as ModelCatalogEntry } from "../provider-model-types-Csg6KI5e.js";

//#region src/agents/prepared-model-catalog.d.ts
type LoadPreparedModelCatalogParams = {
  agentId?: string;
  agentDir?: string;
  config?: OpenClawConfig;
  readOnly?: boolean;
  workspaceDir?: string;
  env?: NodeJS.ProcessEnv;
  providerDiscoveryProviderIds?: readonly string[];
  allowGatewaySubagentBinding?: boolean;
};
/** Reads one atomic catalog generation, activating a lifecycle owner when needed. */
declare function loadPreparedModelCatalogSnapshot(params?: LoadPreparedModelCatalogParams): Promise<ModelCatalogSnapshot>;
declare function loadPreparedModelCatalog(params?: LoadPreparedModelCatalogParams): Promise<ModelCatalogEntry[]>;
//#endregion
export { loadManifestModelCatalog, loadPreparedModelCatalog, loadPreparedModelCatalogSnapshot };