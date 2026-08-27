import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { N as withPluginRuntimeRegistryScope } from "./runtime-yJAYArQt.js";
import { F as resolvePluginRegistryLoadCacheKey, n as loadPluginRegistryHandle } from "./loader-BmgwYkg7.js";
import "./agent-scope-DyEposw2.js";
import { c as normalizePluginsConfig } from "./config-state-B6-Feb6H.js";
import { a as getMemoryRuntime, g as resolveMemoryCapabilityRegistration, y as setStandaloneMemoryManagerActive } from "./memory-state-CngllfdS.js";
//#region src/plugins/memory-runtime.ts
let standaloneMemoryRegistrySlot;
/** Resolves the configured memory slot to the single runtime plugin that may load memory. */
function resolveMemoryRuntimePluginIds(config) {
	const plugins = normalizePluginsConfig(config.plugins);
	const memorySlot = plugins.slots.memory;
	if (!plugins.enabled || typeof memorySlot !== "string" || memorySlot.trim().length === 0) return [];
	const pluginId = memorySlot.trim();
	if (plugins.deny.includes(pluginId) || plugins.entries[pluginId]?.enabled === false) return [];
	return [pluginId];
}
function resolveMemoryRuntimeWorkspaceDir(cfg, agentId) {
	const dir = resolveAgentWorkspaceDir(cfg, agentId);
	if (typeof dir !== "string" || !dir.trim()) return;
	return resolveUserPath(dir);
}
function resolveMemoryRuntimeFromRegistry(registry) {
	return resolveMemoryCapabilityRegistration(registry.memoryCapabilities)?.capability.runtime;
}
function listCurrentMemoryRuntimeOwners() {
	const current = getMemoryRuntime();
	const owners = /* @__PURE__ */ new Map();
	for (const [runtime, registry] of standaloneMemoryRegistrySlot?.retiredRuntimes ?? []) owners.set(runtime, {
		runtime,
		registry
	});
	if (current) owners.set(current, { runtime: current });
	if (standaloneMemoryRegistrySlot) {
		const runtime = resolveMemoryRuntimeFromRegistry(standaloneMemoryRegistrySlot.registry);
		if (runtime) owners.set(runtime, {
			runtime,
			registry: standaloneMemoryRegistrySlot.registry
		});
	}
	return [...owners.values()];
}
function withMemoryRuntimeOwner(owner, run) {
	return withPluginRuntimeRegistryScope(owner.registry, () => run(owner.runtime));
}
function ensureMemoryRuntime(params) {
	const current = getMemoryRuntime();
	if (current || !params) return current ? { runtime: current } : void 0;
	const onlyPluginIds = resolveMemoryRuntimePluginIds(params.cfg);
	if (onlyPluginIds.length === 0) return;
	const workspaceDir = resolveMemoryRuntimeWorkspaceDir(params.cfg, params.agentId);
	const loadOptions = {
		config: params.cfg,
		onlyPluginIds,
		workspaceDir,
		activate: false
	};
	const key = resolvePluginRegistryLoadCacheKey(loadOptions);
	if (standaloneMemoryRegistrySlot?.key === key) {
		const runtime = resolveMemoryRuntimeFromRegistry(standaloneMemoryRegistrySlot.registry);
		return runtime ? {
			runtime,
			registry: standaloneMemoryRegistrySlot.registry
		} : void 0;
	}
	const registry = loadPluginRegistryHandle(loadOptions);
	if (!registry) return;
	const runtime = resolveMemoryRuntimeFromRegistry(registry);
	const previousSlot = standaloneMemoryRegistrySlot;
	const retiredRuntimes = new Map(previousSlot?.retiredRuntimes);
	const previousRuntime = previousSlot ? resolveMemoryRuntimeFromRegistry(previousSlot.registry) : void 0;
	if (previousSlot && previousRuntime && previousRuntime !== runtime) retiredRuntimes.set(previousRuntime, previousSlot.registry);
	standaloneMemoryRegistrySlot = {
		key,
		registry,
		retiredRuntimes
	};
	return runtime ? {
		runtime,
		registry
	} : void 0;
}
/** Returns the active plugin-backed memory search manager for an agent. */
async function getActiveMemorySearchManager(params) {
	const owner = ensureMemoryRuntime(params);
	if (!owner) return {
		manager: null,
		error: "memory plugin unavailable"
	};
	if (owner.registry) setStandaloneMemoryManagerActive(true);
	return await withMemoryRuntimeOwner(owner, async (runtime) => await runtime.getMemorySearchManager(params));
}
/** Applies the selected memory plugin's authorization policy to raw search hits. */
async function authorizeActiveMemorySearchHits(params) {
	const owner = ensureMemoryRuntime(params);
	if (!owner) return params.hits.filter((hit) => hit.source !== "sessions");
	return await withMemoryRuntimeOwner(owner, async (runtime) => {
		if (!runtime.authorizeSearchHits) return params.hits.filter((hit) => hit.source !== "sessions");
		return await runtime.authorizeSearchHits(params);
	});
}
/** Resolves current memory backend config without constructing a manager. */
function resolveActiveMemoryBackendConfig(params) {
	const owner = ensureMemoryRuntime(params);
	return owner ? withMemoryRuntimeOwner(owner, (runtime) => runtime.resolveMemoryBackendConfig(params)) : null;
}
/** Closes all active plugin-backed memory search managers. */
async function closeActiveMemorySearchManagers(cfg) {
	await Promise.all(listCurrentMemoryRuntimeOwners().map((owner) => withMemoryRuntimeOwner(owner, async (runtime) => {
		await runtime.closeAllMemorySearchManagers?.();
	})));
	standaloneMemoryRegistrySlot?.retiredRuntimes.clear();
	setStandaloneMemoryManagerActive(false);
}
/** Closes the plugin-backed memory search manager for one agent. */
async function closeActiveMemorySearchManager(params) {
	await Promise.all(listCurrentMemoryRuntimeOwners().map((owner) => withMemoryRuntimeOwner(owner, async (runtime) => {
		await runtime.closeMemorySearchManager?.(params);
	})));
}
function resetStandaloneMemoryRegistrySlot() {
	standaloneMemoryRegistrySlot = void 0;
	setStandaloneMemoryManagerActive(false);
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.memoryRuntimeTestApi")] = { resetStandaloneMemoryRegistrySlot };
//#endregion
export { resolveActiveMemoryBackendConfig as a, getActiveMemorySearchManager as i, closeActiveMemorySearchManager as n, closeActiveMemorySearchManagers as r, authorizeActiveMemorySearchHits as t };
