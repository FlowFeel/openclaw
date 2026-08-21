import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { n as loadPluginRegistryHandle } from "./loader-CT1KBBu5.js";
import { t as collectConfiguredAgentHarnessRuntimes } from "./harness-runtimes-Ir0ien4R.js";
import { c as normalizePluginsConfig } from "./config-state-DrPZVhOu.js";
import { t as getCurrentPluginMetadataSnapshot } from "./current-plugin-metadata-snapshot-LM8oq-yZ.js";
import { r as resolveAgentRuntimePluginLoadPlan } from "./runtime-plugin-load-plan-CfrMO8pl.js";
//#region src/agents/runtime-plugins.ts
function resolveStartupPluginIdsFromCurrentSnapshot(params) {
	const pluginIds = getCurrentPluginMetadataSnapshot({
		config: params.config,
		env: params.env,
		workspaceDir: params.workspaceDir
	})?.startup?.pluginIds;
	if (!Array.isArray(pluginIds)) return;
	return pluginIds.filter((pluginId) => typeof pluginId === "string");
}
function resolveAgentRuntimePluginRegistryLoad(params) {
	const workspaceDir = typeof params.workspaceDir === "string" && params.workspaceDir.trim() ? resolveUserPath(params.workspaceDir) : void 0;
	if (params.config && !normalizePluginsConfig(params.config.plugins).enabled) return {
		requiredPluginIds: [],
		loadOptions: {
			config: params.config,
			activationSourceConfig: params.config,
			...params.env ? { env: params.env } : {},
			workspaceDir,
			onlyPluginIds: [],
			runtimeOptions: params.allowGatewaySubagentBinding ? { allowGatewaySubagentBinding: true } : void 0
		}
	};
	const startupPluginIds = resolveStartupPluginIdsFromCurrentSnapshot({
		config: params.config,
		env: params.env,
		workspaceDir
	});
	const plan = resolveAgentRuntimePluginLoadPlan({
		config: params.config,
		workspaceDir: workspaceDir ?? process.cwd(),
		...startupPluginIds === void 0 ? {} : { basePluginIds: startupPluginIds },
		selections: [...collectConfiguredAgentHarnessRuntimes(params.config ?? {}).map((runtime) => ({
			runtime,
			provider: "",
			modelId: ""
		})), ...params.selections ?? []]
	});
	return {
		requiredPluginIds: plan.pluginIds,
		loadOptions: {
			config: plan.config,
			...plan.config ? { activationSourceConfig: plan.config } : {},
			...params.env ? { env: params.env } : {},
			workspaceDir,
			...startupPluginIds === void 0 || plan.pluginIds === void 0 ? {} : { onlyPluginIds: plan.pluginIds },
			...startupPluginIds === void 0 ? {} : { channelPluginLoadIntent: "full" },
			runtimeOptions: params.allowGatewaySubagentBinding ? { allowGatewaySubagentBinding: true } : void 0
		}
	};
}
/** Loads the registry handle owned by an agent prepared-runtime generation. */
function loadAgentRuntimePluginRegistryHandle(params) {
	return loadPluginRegistryHandle({
		...resolveAgentRuntimePluginRegistryLoad(params).loadOptions,
		activate: false
	});
}
//#endregion
export { loadAgentRuntimePluginRegistryHandle as t };
