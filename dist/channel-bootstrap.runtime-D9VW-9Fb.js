import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { f as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { d as getActivePluginRegistry, p as getActivePluginRegistryVersion } from "./runtime-WkCmQTS9.js";
import { n as loadPluginRegistryHandle } from "./loader-CT1KBBu5.js";
import "./agent-scope-DyEposw2.js";
import { l as resolveDiscoverableScopedChannelPluginIds } from "./channel-presence-policy-BjX2SvLo.js";
import { b as resolveRuntimeConfigCacheKey } from "./runtime-snapshot-Bzqj8IgJ.js";
import { t as applyPluginAutoEnable } from "./plugin-auto-enable-Bs1CK1Hn.js";
import { r as withActivatedPluginIds } from "./activation-context-BFUm3Kb9.js";
import "./channel-plugin-ids-Ds82VHXY.js";
//#region src/infra/outbound/channel-bootstrap.runtime.ts
const MAX_BOOTSTRAP_CONFIG_GENERATIONS = 64;
let bootstrapRegistryGeneration;
const bootstrapRegistriesByConfig = /* @__PURE__ */ new Map();
function resolveBootstrapRegistryGeneration() {
	return String(getActivePluginRegistryVersion());
}
function resolveBootstrapRegistries(cfg) {
	const registryGeneration = resolveBootstrapRegistryGeneration();
	if (registryGeneration !== bootstrapRegistryGeneration) {
		bootstrapRegistryGeneration = registryGeneration;
		bootstrapRegistriesByConfig.clear();
	}
	const configKey = resolveRuntimeConfigCacheKey(cfg);
	const existing = bootstrapRegistriesByConfig.get(configKey);
	if (existing) {
		bootstrapRegistriesByConfig.delete(configKey);
		bootstrapRegistriesByConfig.set(configKey, existing);
		return existing;
	}
	pruneMapToMaxSize(bootstrapRegistriesByConfig, MAX_BOOTSTRAP_CONFIG_GENERATIONS - 1);
	const registries = /* @__PURE__ */ new Map();
	bootstrapRegistriesByConfig.set(configKey, registries);
	return registries;
}
/** Clears the per-generation channel bootstrap handle cache for isolated tests. */
function resetOutboundChannelBootstrapStateForTests() {
	bootstrapRegistryGeneration = void 0;
	bootstrapRegistriesByConfig.clear();
}
function channelEntryCanSend(entry) {
	return Boolean(entry?.plugin?.outbound?.sendText ?? entry?.plugin?.message?.send?.text);
}
function findChannelEntry(registry, channel) {
	return registry?.channels?.find((entry) => entry?.plugin?.id === channel);
}
function resolveSendCapableRegistry(registry, channel) {
	return registry && channelEntryCanSend(findChannelEntry(registry, channel)) ? registry : void 0;
}
/** Loads runtime plugins on demand when a selected outbound channel has only a setup shell. */
function bootstrapOutboundChannelPlugin(params) {
	const cfg = params.cfg;
	if (!cfg) return;
	const activeSendRegistry = resolveSendCapableRegistry(getActivePluginRegistry(), params.channel);
	if (activeSendRegistry) return activeSendRegistry;
	const registries = resolveBootstrapRegistries(cfg);
	if (registries.has(params.channel)) return resolveSendCapableRegistry(registries.get(params.channel), params.channel);
	const autoEnabled = applyPluginAutoEnable({ config: cfg });
	const defaultAgentId = resolveDefaultAgentId(autoEnabled.config);
	const workspaceDir = resolveAgentWorkspaceDir(autoEnabled.config, defaultAgentId);
	const pluginIds = resolveDiscoverableScopedChannelPluginIds({
		config: autoEnabled.config,
		activationSourceConfig: cfg,
		channelIds: [params.channel],
		workspaceDir,
		env: process.env
	});
	const activatedConfig = withActivatedPluginIds({
		config: autoEnabled.config,
		pluginIds
	}) ?? autoEnabled.config;
	const activatedSourceConfig = withActivatedPluginIds({
		config: cfg,
		pluginIds
	}) ?? cfg;
	try {
		const sendRegistry = resolveSendCapableRegistry(loadPluginRegistryHandle({
			config: activatedConfig,
			activationSourceConfig: activatedSourceConfig,
			autoEnabledReasons: autoEnabled.autoEnabledReasons,
			onlyPluginIds: pluginIds,
			workspaceDir,
			runtimeOptions: { allowGatewaySubagentBinding: true }
		}), params.channel);
		registries.set(params.channel, sendRegistry ?? null);
		return sendRegistry;
	} catch {
		registries.set(params.channel, null);
		return;
	}
}
//#endregion
export { resetOutboundChannelBootstrapStateForTests as n, bootstrapOutboundChannelPlugin as t };
