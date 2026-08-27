import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { f as normalizeUniqueSingleOrTrimmedStringList } from "./string-normalization-CRyoFBPt.js";
import { n as findNormalizedProviderValue } from "./provider-id-BIcU_2-A.js";
import { f as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { _ as resolveProviderConfigApiOwnerHint } from "./gateway-startup-plugin-ids-C6NYFwsv.js";
import { k as getPluginRuntimeGatewayRequestScope } from "./runtime-yJAYArQt.js";
import { n as getPluginRegistryState, t as getActivePluginRegistryWorkspaceDirFromState } from "./runtime-state-D2E7wBko.js";
import "./agent-scope-DyEposw2.js";
import { i as resolveConfigScopedRuntimeCacheValue, t as PluginLruCache } from "./plugin-cache-primitives-Dz0npwxC.js";
import { n as resolvePluginControlPlaneFingerprint } from "./plugin-control-plane-context-77sSwtPJ.js";
import { t as getCurrentPluginMetadataSnapshot } from "./current-plugin-metadata-snapshot-krwg-Yx5.js";
import { n as matchesProviderPluginRef } from "./provider-registry-shared-DpBO0Uka.js";
import { a as resolvePluginMetadataSnapshot } from "./plugin-metadata-snapshot-DtW_P3kZ.js";
import "./config-UtpOr1Uw.js";
import { n as getLoadedRuntimePluginRegistry } from "./active-runtime-registry-uAjeR_VT.js";
import { n as resolvePluginProviders, t as isPluginProvidersLoadInFlight } from "./providers.runtime-BP0sZHIy.js";
//#region src/agents/model-discovery-context.ts
/**
* Shared context resolvers for model discovery.
* Keeps callers from reaching into runtime config or plugin metadata snapshot
* plumbing directly.
*/
function providerConfigDeclaresModel(providerConfig, model) {
	const trimmedModel = model.trim();
	return Boolean(trimmedModel && providerConfig?.models?.some((candidate) => candidate.id?.trim() === trimmedModel));
}
/** Resolves provider/model refs used to scope model catalog discovery. */
function resolveModelCatalogScope(params) {
	const provider = params.provider.trim();
	const model = params.model.trim();
	const providerConfig = findNormalizedProviderValue(params.cfg?.models?.providers, provider);
	const modelRefs = providerConfigDeclaresModel(providerConfig, model) ? [provider && model ? `${provider}/${model}` : model] : [provider && model ? `${provider}/${model}` : model, model];
	return {
		providerRefs: normalizeUniqueSingleOrTrimmedStringList([provider, providerConfig?.api]),
		modelRefs: normalizeUniqueSingleOrTrimmedStringList(modelRefs)
	};
}
/** Resolve the workspace directory model discovery should use for agent scope. */
function resolveModelWorkspaceDir(cfg, explicitWorkspaceDir) {
	if (explicitWorkspaceDir !== void 0 || !cfg) return explicitWorkspaceDir;
	return resolveAgentWorkspaceDir(cfg, resolveDefaultAgentId(cfg));
}
/**
* Resolve the plugin metadata snapshot for model discovery.
*
* Explicit snapshots win for tests and prepared runtimes. Otherwise we prefer
* the current process snapshot, then fall back to resolving from config/env.
*/
function resolveModelPluginMetadataSnapshot(params) {
	if (params.pluginMetadataSnapshot) return params.pluginMetadataSnapshot;
	const env = params.env ?? process.env;
	try {
		const config = params.config ?? (params.useRuntimeConfig ? getRuntimeConfig() : void 0);
		return getCurrentPluginMetadataSnapshot({
			allowWorkspaceScopedSnapshot: true,
			env,
			...config ? { config } : {},
			...params.workspaceDir ? { workspaceDir: params.workspaceDir } : {}
		}) ?? resolvePluginMetadataSnapshot({
			config: config ?? {},
			env,
			...params.workspaceDir ? { workspaceDir: params.workspaceDir } : {},
			...params.allowWorkspaceScopedCurrent !== void 0 ? { allowWorkspaceScopedCurrent: params.allowWorkspaceScopedCurrent } : {}
		});
	} catch {
		return;
	}
}
//#endregion
//#region src/plugins/provider-hook-runtime.ts
let providerRuntimePluginCache = /* @__PURE__ */ new WeakMap();
const defaultProviderRuntimePluginCache = new PluginLruCache(128);
function clearProviderRuntimePluginCacheForTest() {
	providerRuntimePluginCache = /* @__PURE__ */ new WeakMap();
	defaultProviderRuntimePluginCache.clear();
}
function resolveProviderRuntimePluginCacheKey(params, registryState = getPluginRegistryState()) {
	return JSON.stringify({
		provider: normalizeLowercaseStringOrEmpty(params.provider),
		modelId: resolveProviderRuntimeLookupModelId(params) ?? null,
		pluginControlPlane: resolvePluginControlPlaneFingerprint({
			config: params.config,
			env: params.env,
			workspaceDir: params.workspaceDir
		}),
		plugins: params.config?.plugins,
		models: params.config?.models?.providers,
		workspaceDir: params.workspaceDir ?? "",
		applyAutoEnable: params.applyAutoEnable ?? null,
		bundledProviderVitestCompat: params.bundledProviderVitestCompat ?? null,
		pluginMetadata: params.pluginMetadataSnapshot?.manifestRegistry.plugins.map((plugin) => plugin.id).join(",") ?? null,
		pluginRegistryKey: registryState?.key ?? null,
		pluginRegistryVersion: registryState?.activeVersion ?? null
	});
}
function matchesProviderLiteralId(provider, providerId) {
	const normalized = normalizeLowercaseStringOrEmpty(providerId);
	return Boolean(normalized) && normalizeLowercaseStringOrEmpty(provider.id) === normalized;
}
function resolveProviderRuntimeLookupModelId(params) {
	return normalizeOptionalString(params.modelId ?? (typeof params.context?.modelId === "string" ? params.context.modelId : void 0));
}
function resolveProviderRuntimeLookupScope(params, apiOwnerHint) {
	const providerRefs = apiOwnerHint ? [params.provider, apiOwnerHint] : [params.provider];
	const modelId = resolveProviderRuntimeLookupModelId(params);
	if (!modelId) return { providerRefs };
	return {
		providerRefs,
		modelRefs: resolveModelCatalogScope({
			cfg: params.config,
			provider: params.provider,
			model: modelId
		}).modelRefs
	};
}
function findProviderRuntimePluginInLoadedRegistries(params) {
	const scopedRegistry = getPluginRuntimeGatewayRequestScope()?.pluginRegistry;
	const scopedPlugin = scopedRegistry ? findProviderRuntimePluginInRegistry({
		registry: scopedRegistry,
		provider: params.lookup.provider,
		apiOwnerHint: params.apiOwnerHint
	}) : void 0;
	if (scopedPlugin) return scopedPlugin;
	const activeRegistry = getLoadedRuntimePluginRegistry({
		env: params.lookup.env,
		workspaceDir: params.lookup.workspaceDir
	});
	const activePlugin = activeRegistry ? findProviderRuntimePluginInRegistry({
		registry: activeRegistry,
		provider: params.lookup.provider,
		apiOwnerHint: params.apiOwnerHint
	}) : void 0;
	if (activePlugin) return activePlugin;
}
function findProviderRuntimePluginInRegistry(params) {
	return params.registry.providers.map((entry) => Object.assign({}, entry.provider, { pluginId: entry.pluginId })).find((plugin) => {
		if (params.apiOwnerHint) return matchesProviderLiteralId(plugin, params.provider) || matchesProviderPluginRef(plugin, params.apiOwnerHint);
		return matchesProviderPluginRef(plugin, params.provider);
	});
}
function hasConfiguredModelProvider(params) {
	return findNormalizedProviderValue(params.config?.models?.providers, params.provider) !== void 0;
}
function resolveProviderPluginsForHooks(params) {
	const env = params.env ?? process.env;
	const workspaceDir = params.workspaceDir ?? getActivePluginRegistryWorkspaceDirFromState();
	return resolvePluginProviders({
		...params,
		workspaceDir,
		env,
		activate: false,
		applyAutoEnable: params.applyAutoEnable,
		bundledProviderVitestCompat: params.bundledProviderVitestCompat ?? true,
		skipIfLoadInFlight: true
	});
}
function resolveProviderRuntimePlugin(params) {
	const workspaceDir = params.workspaceDir ?? getActivePluginRegistryWorkspaceDirFromState();
	const env = params.env ?? process.env;
	const lookup = {
		...params,
		workspaceDir,
		env
	};
	const apiOwnerHint = resolveProviderConfigApiOwnerHint({
		provider: params.provider,
		config: params.config
	});
	const providerRefs = apiOwnerHint ? [params.provider, apiOwnerHint] : [params.provider];
	const loadedPlugin = findProviderRuntimePluginInLoadedRegistries({
		lookup,
		apiOwnerHint
	});
	if (loadedPlugin) return loadedPlugin;
	if (isPluginProvidersLoadInFlight({
		...params,
		workspaceDir,
		env,
		providerRefs,
		activate: false,
		applyAutoEnable: params.applyAutoEnable,
		bundledProviderVitestCompat: params.bundledProviderVitestCompat ?? true
	})) return;
	const cacheConfig = params.env && params.env !== process.env ? void 0 : params.config;
	const registryState = getPluginRegistryState();
	const cacheKey = resolveProviderRuntimePluginCacheKey(lookup, registryState);
	const load = () => {
		const lookupScope = resolveProviderRuntimeLookupScope(params, apiOwnerHint);
		return resolveProviderPluginsForHooks({
			config: params.config,
			workspaceDir,
			env,
			providerRefs: lookupScope.providerRefs,
			modelRefs: lookupScope.modelRefs,
			applyAutoEnable: params.applyAutoEnable,
			bundledProviderVitestCompat: params.bundledProviderVitestCompat,
			pluginMetadataSnapshot: params.pluginMetadataSnapshot
		}).find((plugin) => {
			if (apiOwnerHint) return matchesProviderLiteralId(plugin, params.provider) || matchesProviderPluginRef(plugin, apiOwnerHint);
			return matchesProviderPluginRef(plugin, params.provider);
		}) ?? null;
	};
	return (cacheConfig ? resolveConfigScopedRuntimeCacheValue({
		cache: providerRuntimePluginCache,
		config: cacheConfig,
		key: cacheKey,
		load
	}) : !registryState?.key ? load() : (() => {
		const cached = defaultProviderRuntimePluginCache.getResult(cacheKey);
		if (cached.hit) return cached.value;
		const loaded = load();
		defaultProviderRuntimePluginCache.set(cacheKey, loaded);
		return loaded;
	})()) ?? void 0;
}
function resolveLoadedProviderRuntimePlugin(params) {
	return findProviderRuntimePluginInLoadedRegistries({
		lookup: params,
		apiOwnerHint: resolveProviderConfigApiOwnerHint({
			provider: params.provider,
			config: params.config
		})
	});
}
function resolveProviderHookPlugin(params) {
	const runtimePlugin = resolveProviderRuntimePlugin(params);
	if (runtimePlugin) return runtimePlugin;
	if (hasConfiguredModelProvider(params)) return;
	return resolveProviderPluginsForHooks({
		config: params.config,
		workspaceDir: params.workspaceDir,
		env: params.env
	}).find((candidate) => matchesProviderPluginRef(candidate, params.provider));
}
function resolveProviderRuntimePluginHandle(params) {
	const workspaceDir = params.workspaceDir ?? getActivePluginRegistryWorkspaceDirFromState();
	const env = params.env;
	const runtimePlugin = resolveProviderRuntimePlugin({
		...params,
		workspaceDir,
		env
	});
	return {
		...params,
		workspaceDir,
		env,
		plugin: runtimePlugin
	};
}
function ensureProviderRuntimePluginHandle(params) {
	const modelId = resolveProviderRuntimeLookupModelId(params);
	if (!params.runtimeHandle || modelId && !params.runtimeHandle.plugin && params.runtimeHandle.modelId !== modelId) return resolveProviderRuntimePluginHandle({
		provider: params.provider,
		modelId,
		config: params.config ?? params.runtimeHandle?.config,
		workspaceDir: params.workspaceDir ?? params.runtimeHandle?.workspaceDir,
		env: params.env ?? params.runtimeHandle?.env,
		applyAutoEnable: params.runtimeHandle?.applyAutoEnable,
		bundledProviderVitestCompat: params.runtimeHandle?.bundledProviderVitestCompat,
		pluginMetadataSnapshot: params.pluginMetadataSnapshot ?? params.runtimeHandle?.pluginMetadataSnapshot
	});
	return params.runtimeHandle;
}
function prepareProviderExtraParams(params) {
	return ensureProviderRuntimePluginHandle(params).plugin?.prepareExtraParams?.(params.context) ?? void 0;
}
function resolveProviderExtraParamsForTransport(params) {
	return ensureProviderRuntimePluginHandle(params).plugin?.extraParamsForTransport?.(params.context) ?? void 0;
}
function resolveProviderAuthProfileId(params) {
	const resolved = ensureProviderRuntimePluginHandle(params).plugin?.resolveAuthProfileId?.(params.context);
	return typeof resolved === "string" && resolved.trim() ? resolved.trim() : void 0;
}
function resolveProviderFollowupFallbackRoute(params) {
	return ensureProviderRuntimePluginHandle(params).plugin?.followupFallbackRoute?.(params.context) ?? void 0;
}
function wrapProviderStreamFn(params) {
	return ensureProviderRuntimePluginHandle(params).plugin?.wrapStreamFn?.(params.context) ?? void 0;
}
function wrapProviderSimpleCompletionStreamFn(params) {
	return ensureProviderRuntimePluginHandle(params).plugin?.wrapSimpleCompletionStreamFn?.(params.context) ?? void 0;
}
//#endregion
export { resolveProviderAuthProfileId as a, resolveProviderHookPlugin as c, resolveProviderRuntimePluginHandle as d, wrapProviderSimpleCompletionStreamFn as f, resolveModelWorkspaceDir as h, resolveLoadedProviderRuntimePlugin as i, resolveProviderPluginsForHooks as l, resolveModelPluginMetadataSnapshot as m, ensureProviderRuntimePluginHandle as n, resolveProviderExtraParamsForTransport as o, wrapProviderStreamFn as p, prepareProviderExtraParams as r, resolveProviderFollowupFallbackRoute as s, clearProviderRuntimePluginCacheForTest as t, resolveProviderRuntimePlugin as u };
