import { f as createInstalledPluginIndexScopeLookup, p as collectConfiguredMemoryEmbeddingProviderIds, r as resolveChannelPluginIds } from "./gateway-startup-plugin-ids-C6NYFwsv.js";
import { o as loadOpenClawPlugins } from "./loader-si71apUX.js";
import { c as normalizePluginsConfig } from "./config-state-B6-Feb6H.js";
import { o as hasNonEmptyPluginIdScope } from "./current-plugin-metadata-snapshot-krwg-Yx5.js";
import { s as resolveConfiguredChannelPluginIds } from "./channel-presence-policy-DhrCS5Fz.js";
import { r as withActivatedPluginIds } from "./activation-context-G6MWjT24.js";
import { i as resolvePluginRuntimeLoadContext, n as buildPluginRuntimeLoadOptionsFromValues } from "./load-context-JWg4gtu_.js";
import "./channel-plugin-ids-DnoOYgMp.js";
import { t as resolveEffectivePluginIds } from "./effective-plugin-ids-CIvVZR5Q.js";
//#region src/plugins/runtime/runtime-registry-loader.ts
function resolveMemoryPluginIds(context) {
	const configuredProviderIds = [...collectConfiguredMemoryEmbeddingProviderIds(context.activationSourceConfig)];
	const pluginIds = /* @__PURE__ */ new Set();
	if (context.metadataSnapshot) createInstalledPluginIndexScopeLookup(context.metadataSnapshot.index).addProviderContributionOwners(pluginIds, configuredProviderIds);
	else for (const providerId of configuredProviderIds) pluginIds.add(providerId);
	const memoryPluginId = normalizePluginsConfig(context.config.plugins).slots.memory?.trim();
	if (memoryPluginId) pluginIds.add(memoryPluginId);
	return [...pluginIds].toSorted();
}
function resolveScopePluginIds(params) {
	if (params.scope === "configured-channels") return resolveConfiguredChannelPluginIds({
		config: params.context.config,
		activationSourceConfig: params.context.activationSourceConfig,
		workspaceDir: params.context.workspaceDir,
		env: params.context.env
	});
	if (params.scope === "channels") return resolveChannelPluginIds({
		config: params.context.config,
		workspaceDir: params.context.workspaceDir,
		env: params.context.env
	});
	if (params.scope === "memory") return resolveMemoryPluginIds(params.context);
	return resolveEffectivePluginIds({
		config: params.context.rawConfig,
		workspaceDir: params.context.workspaceDir,
		env: params.context.env
	});
}
function ensurePluginRegistryLoaded(options) {
	const scope = options?.scope ?? "all";
	const context = resolvePluginRuntimeLoadContext(options);
	const pluginIds = resolveScopePluginIds({
		scope,
		context
	});
	const activateConfigured = scope === "configured-channels" && pluginIds.length > 0;
	const config = activateConfigured ? withActivatedPluginIds({
		config: context.config,
		pluginIds
	}) ?? context.config : context.config;
	const activationSourceConfig = activateConfigured ? withActivatedPluginIds({
		config: context.activationSourceConfig,
		pluginIds
	}) ?? context.activationSourceConfig : context.activationSourceConfig;
	loadOpenClawPlugins(buildPluginRuntimeLoadOptionsFromValues({
		...context,
		config,
		activationSourceConfig
	}, {
		throwOnLoadError: true,
		...scope === "configured-channels" || scope === "memory" || scope === "all" || hasNonEmptyPluginIdScope(pluginIds) ? { onlyPluginIds: pluginIds } : {}
	}));
}
//#endregion
export { ensurePluginRegistryLoaded as t };
