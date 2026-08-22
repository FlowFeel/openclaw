import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.js";
import { it as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db--PLC25lY.js";
import { c as resolveMemorySearchConfig } from "./config-utils-dp-ljmDA.js";
import { i as resolveSharedMemoryStatusSnapshot } from "./status.scan.shared-ChraK9k3.js";
//#region src/commands/status.scan-memory.ts
const statusScanDepsRuntimeModuleLoader = createLazyImportLoader(() => import("./status.scan.deps.runtime.js"));
function loadStatusScanDepsRuntimeModule() {
	return statusScanDepsRuntimeModuleLoader.load();
}
/** Returns the owning agent database path for built-in memory. */
function resolveDefaultMemoryDatabasePath(agentId) {
	return resolveOpenClawAgentSqlitePath({ agentId });
}
/** Resolves memory index/cache status for the current status scan. */
async function resolveStatusMemoryStatusSnapshot(params) {
	const { getMemorySearchManager } = await loadStatusScanDepsRuntimeModule();
	return await resolveSharedMemoryStatusSnapshot({
		cfg: params.cfg,
		agentStatus: params.agentStatus,
		memoryPlugin: params.memoryPlugin,
		resolveMemoryConfig: resolveMemorySearchConfig,
		getMemorySearchManager,
		requireDefaultDatabasePath: params.requireDefaultDatabasePath
	});
}
//#endregion
export { resolveStatusMemoryStatusSnapshot as n, resolveDefaultMemoryDatabasePath as t };
