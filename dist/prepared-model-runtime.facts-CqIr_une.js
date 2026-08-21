import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { o as asDateTimestampMs } from "./number-coercion-Crk_c9KW.js";
import "./src-COWbwBfI.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { t as stableStringify } from "./stable-stringify-DoZ6Yalc.js";
import "./utils-Bs67j6-3.js";
import { r as normalizeProviderId } from "./provider-id-BIcU_2-A.js";
import { l as resolveAgentEntry } from "./agent-scope-config-Dusa8eSA.js";
import { r as collectConfiguredModelRefs } from "./configured-model-refs-XCtO9k7W.js";
import { s as coerceSecretRef } from "./types.secrets-BvApkFoj.js";
import { L as getPreparedMessageToolCatalog, N as withPluginRuntimeRegistryScope, R as getPreparedMessageToolCatalogForRegistry } from "./runtime-yJAYArQt.js";
import { n as sha256Base64Url } from "./crypto-digest-CmUwt1S-.js";
import { d as extractPluginInstallRecordsFromInstalledPluginIndex } from "./installed-plugin-index-CqNI0grC.js";
import { t as MODEL_APIS } from "./types.models-BDWk1A38.js";
import { a as resolvePluginMetadataSnapshot } from "./plugin-metadata-snapshot-DtW_P3kZ.js";
import { u as hashRuntimeConfigValue } from "./runtime-snapshot-DLOCFXOE.js";
import { i as buildConfiguredModelCatalog } from "./model-selection-shared-BDTPW9Jk.js";
import { i as resolveAuthProfileOrder } from "./order-DCEZOH-n.js";
import { g as resolveProviderEnvAuthLookupMaps, h as listProviderEnvAuthLookupKeys } from "./model-auth-markers-Co0rjfKm.js";
import { i as resolvePluginRuntimeLoadContext } from "./load-context-JWg4gtu_.js";
import { m as resolveModelPluginMetadataSnapshot } from "./provider-hook-runtime-CJN_HH27.js";
import { _ as normalizeProviderResolvedModelWithPlugin, j as resolveProviderSyntheticAuthWithPlugin, r as applyProviderResolvedTransportWithPlugin } from "./provider-runtime-ByIbzpnW.js";
import { i as isAmbientCredentialAllowedByProviderAuthPin } from "./external-auth-CyTN6oZz.js";
import { i as ensureAuthProfileStore, o as ensureAuthProfileStoreWithoutExternalProfiles } from "./store-C8MGqOG3.js";
import { t as buildPreparedModelCatalogSnapshot } from "./model-catalog-DIJ_3b9w.js";
import { n as prepareMediaCapabilityProviders } from "./capability-provider-runtime-Clrhcxsz.js";
import { n as resolveRuntimeSyntheticAuthProviderRefs } from "./synthetic-auth.runtime.js";
import { t as resolveEnvApiKey } from "./model-auth-env-Bb6w1-EL.js";
import { i as normalizeModelCompat } from "./provider-model-compat-Czzl4McI.js";
import { mt as AuthStorage, rt as ModelRegistry } from "./sessions-Digi7ATr.js";
import { s as loadPersistedPluginModelCatalogsReadOnly, u as resolvePluginModelCatalogOwnerPluginId } from "./plugin-model-catalog-D_KS5x8_.js";
import { c as createStaticModelIdMatcher, i as loadBundledProviderStaticCatalogContextModels, r as createBundledStaticCatalogModelResolver, u as buildInlineProviderModels } from "./model.static-catalog-B_f3CT3_.js";
import { n as normalizePluginDiscoveryResult } from "./provider-discovery-UXN1ZFRC.js";
import { n as planOpenClawModelsJsonSource, r as prepareImplicitProviderStaticCatalog, t as ensureOpenClawModelsJson } from "./models-config-BZgDHX-R.js";
import { t as loadAgentRuntimePluginRegistryHandle } from "./runtime-plugins-CHLkfrOL.js";
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
//#region src/agents/agent-auth-credentials.ts
/** Converts auth-profile credentials into agent runtime credential maps. */
const AGENT_SECRET_REF_CONFIGURED_MARKER = "openclaw-secret-ref-configured";
function hasConfiguredSecretRef(value) {
	return coerceSecretRef(value) !== null;
}
function secretRefPlaceholder(options) {
	if (options?.includeSecretRefPlaceholders === true) return {
		type: "api_key",
		key: AGENT_SECRET_REF_CONFIGURED_MARKER
	};
	return null;
}
function convertAuthProfileCredentialToAgent(cred, options) {
	if (cred.type === "api_key") {
		const key = normalizeOptionalString(cred.key) ?? "";
		if (!key) return hasConfiguredSecretRef(cred.keyRef) ? secretRefPlaceholder(options) : null;
		return {
			type: "api_key",
			key
		};
	}
	if (cred.type === "token") {
		if (cred.expires !== void 0) {
			const expires = asDateTimestampMs(cred.expires);
			if (expires === void 0 || Date.now() >= expires) return null;
		}
		const token = normalizeOptionalString(cred.token) ?? "";
		if (!token) return hasConfiguredSecretRef(cred.tokenRef) ? secretRefPlaceholder(options) : null;
		return {
			type: "api_key",
			key: token
		};
	}
	if (cred.type === "oauth") {
		const access = normalizeOptionalString(cred.access) ?? "";
		const refresh = normalizeOptionalString(cred.refresh) ?? "";
		const expires = asDateTimestampMs(cred.expires);
		if (!access || !refresh || expires === void 0 || expires <= 0) return null;
		return {
			type: "oauth",
			access,
			refresh,
			expires
		};
	}
	return null;
}
/** Build one canonically selected credential per normalized provider. */
function resolveAgentCredentialMapFromStore(store, options) {
	const credentials = {};
	for (const credential of Object.values(store.profiles)) {
		const provider = normalizeProviderId(credential.provider ?? "");
		if (!provider) continue;
		if (credentials[provider]) continue;
		const profileIds = resolveAuthProfileOrder({
			cfg: options?.config,
			store,
			provider,
			...options?.includeSecretRefPlaceholders === true ? { readinessMode: "read-only" } : {}
		});
		for (const profileId of profileIds) {
			const profile = store.profiles[profileId];
			if (!profile) continue;
			const converted = convertAuthProfileCredentialToAgent(profile, options);
			if (converted) {
				credentials[provider] = converted;
				break;
			}
		}
	}
	return credentials;
}
//#endregion
//#region src/agents/agent-auth-discovery-core.ts
/** Adds provider credentials resolvable from env/config without mutating existing credentials. */
function addEnvBackedAgentCredentials(credentials, options = {}) {
	const env = options.env ?? process.env;
	const { aliasMap, envCandidateMap: candidateMap, authEvidenceMap } = resolveProviderEnvAuthLookupMaps({
		config: options.config,
		workspaceDir: options.workspaceDir,
		env
	});
	const next = { ...credentials };
	for (const provider of listProviderEnvAuthLookupKeys({
		envCandidateMap: candidateMap,
		authEvidenceMap
	})) {
		if (next[provider]) continue;
		const resolved = resolveEnvApiKey(provider, env, {
			config: options.config,
			workspaceDir: options.workspaceDir,
			aliasMap,
			candidateMap,
			authEvidenceMap
		});
		if (!resolved?.apiKey) continue;
		next[provider] = {
			type: "api_key",
			key: resolved.apiKey
		};
	}
	return next;
}
//#endregion
//#region src/agents/agent-auth-discovery.ts
/** Discovers agent runtime credentials from auth profiles, env, and synthetic providers. */
/** Resolves workspace/config/env-stable credentials independently of agent-local profiles. */
function resolveAmbientAgentCredentialsForDiscovery(options = {}) {
	const credentials = addEnvBackedAgentCredentials({}, options);
	const syntheticAuthProviderRefs = options.syntheticAuthProviderRefs ?? resolveRuntimeSyntheticAuthProviderRefs();
	const resolveSyntheticAuth = options.resolveSyntheticAuth ?? ((provider) => resolveProviderSyntheticAuthWithPlugin({
		provider,
		config: options.config,
		workspaceDir: options.workspaceDir,
		env: options.env,
		context: {
			config: options.config,
			provider,
			providerConfig: options.config?.models?.providers?.[provider]
		}
	}));
	for (const provider of syntheticAuthProviderRefs) {
		if (credentials[provider]) continue;
		if (!isAmbientCredentialAllowedByProviderAuthPin({
			config: options.config,
			authAliasLookupParams: {
				...options.env ? { env: options.env } : {},
				...options.workspaceDir ? { workspaceDir: options.workspaceDir } : {}
			},
			provider,
			type: "api_key"
		})) continue;
		const apiKey = resolveSyntheticAuth(provider)?.apiKey?.trim();
		if (!apiKey) continue;
		credentials[provider] = {
			type: "api_key",
			key: apiKey
		};
	}
	return credentials;
}
/** Resolves agent credentials from auth profiles, env, and synthetic auth hooks. */
function resolveAgentCredentialsForDiscovery(agentDir, options) {
	const storeOptions = {
		allowKeychainPrompt: false,
		...options?.config ? { config: options.config } : {},
		...options?.externalCli ? { externalCli: options.externalCli } : {},
		...options?.inheritedAuthDir ? { inheritedAuthDir: options.inheritedAuthDir } : {}
	};
	const credentials = resolveAgentCredentialMapFromStore(options?.skipExternalAuthProfiles === true ? ensureAuthProfileStoreWithoutExternalProfiles(agentDir, {
		allowKeychainPrompt: false,
		...options?.inheritedAuthDir ? { inheritedAuthDir: options.inheritedAuthDir } : {},
		...options?.readOnly === true ? { readOnly: true } : {}
	}) : ensureAuthProfileStore(agentDir, {
		...storeOptions,
		...options?.readOnly === true ? { readOnly: true } : {}
	}), {
		includeSecretRefPlaceholders: options?.readOnly === true,
		config: options?.config
	});
	const ambientCredentials = options?.ambientCredentials ?? resolveAmbientAgentCredentialsForDiscovery({
		config: options?.config,
		workspaceDir: options?.workspaceDir,
		env: options?.env,
		syntheticAuthProviderRefs: options?.syntheticAuthProviderRefs
	});
	for (const [provider, credential] of Object.entries(ambientCredentials)) {
		if (credentials[provider]) continue;
		credentials[provider] = credential;
	}
	return credentials;
}
//#endregion
//#region src/agents/agent-model-discovery.ts
/** Discovers agent models and auth storage with provider/plugin normalization hooks. */
const CAPTURED_MODELS_JSON_SOURCE_PATH = "captured:models.json";
/** Applies plugin model normalization and transport hooks to discovered agent models. */
function normalizeDiscoveredAgentModel(value, agentDir, options) {
	if (!isRecord(value)) return value;
	if (typeof value.id !== "string" || typeof value.name !== "string" || typeof value.provider !== "string") return value;
	const model = value;
	const runtimeContext = {
		...options?.config !== void 0 ? { config: options.config } : {},
		...options?.workspaceDir !== void 0 ? { workspaceDir: options.workspaceDir } : {}
	};
	const pluginNormalized = normalizeProviderResolvedModelWithPlugin({
		provider: model.provider,
		modelId: model.id,
		...runtimeContext,
		context: {
			provider: model.provider,
			modelId: model.id,
			model,
			agentDir
		}
	}) ?? model;
	const transportNormalized = applyProviderResolvedTransportWithPlugin({
		provider: model.provider,
		modelId: model.id,
		...runtimeContext,
		context: {
			provider: model.provider,
			modelId: model.id,
			model: pluginNormalized,
			agentDir
		}
	}) ?? pluginNormalized;
	if (!isRecord(transportNormalized) || typeof transportNormalized.id !== "string" || typeof transportNormalized.name !== "string" || typeof transportNormalized.provider !== "string" || typeof transportNormalized.api !== "string") return value;
	return normalizeModelCompat(transportNormalized, options?.providerMetadataOwners);
}
function createOpenClawModelRegistry(authStorage, modelsJsonPath, agentDir, options) {
	const pluginMetadataSnapshot = resolveModelPluginMetadataSnapshot({
		...options?.config ? { config: options.config } : {},
		...options?.pluginMetadataSnapshot ? { pluginMetadataSnapshot: options.pluginMetadataSnapshot } : {},
		...options?.workspaceDir ? { workspaceDir: options.workspaceDir } : {},
		allowWorkspaceScopedCurrent: options?.workspaceDir === void 0,
		useRuntimeConfig: options?.config === void 0
	});
	const registryOptions = {
		...pluginMetadataSnapshot ? { pluginMetadataSnapshot } : {},
		...options?.includePluginCatalogs !== void 0 ? { includePluginCatalogs: options.includePluginCatalogs } : {},
		...options?.modelsJsonContents !== void 0 ? { modelsJsonContents: options.modelsJsonContents } : {},
		...options?.pluginCatalogs !== void 0 ? { pluginCatalogs: options.pluginCatalogs } : {}
	};
	const registry = ModelRegistry.create(authStorage, modelsJsonPath, registryOptions);
	const getAll = registry.getAll.bind(registry);
	const getAvailable = registry.getAvailable.bind(registry);
	const find = registry.find.bind(registry);
	const refresh = registry.refresh.bind(registry);
	const providerFilter = options?.providerFilter ? normalizeProviderId(options.providerFilter) : "";
	const matchesProviderFilter = (entry) => !providerFilter || normalizeProviderId(entry.provider) === providerFilter;
	const shouldNormalize = options?.normalizeModels !== false;
	const findCache = /* @__PURE__ */ new Map();
	const normalizeEntry = (entry) => {
		if (!shouldNormalize) return entry;
		if (!agentDir) throw new Error("agent directory is required for model normalization");
		return normalizeDiscoveredAgentModel(entry, agentDir, {
			...options,
			...pluginMetadataSnapshot?.owners ? { providerMetadataOwners: pluginMetadataSnapshot.owners } : {}
		});
	};
	registry.getAll = () => {
		const entries = getAll().filter((entry) => matchesProviderFilter(entry));
		return shouldNormalize ? entries.map(normalizeEntry) : entries;
	};
	registry.getAvailable = () => {
		const entries = getAvailable().filter((entry) => matchesProviderFilter(entry));
		return shouldNormalize ? entries.map(normalizeEntry) : entries;
	};
	registry.find = (provider, modelId) => {
		const key = `${normalizeProviderId(provider)}\0${modelId}`;
		if (findCache.has(key)) return findCache.get(key);
		const fallbackEntry = find(provider, modelId);
		const resolved = fallbackEntry ? normalizeEntry(fallbackEntry) : void 0;
		findCache.set(key, resolved);
		return resolved;
	};
	registry.refresh = () => {
		findCache.clear();
		return refresh();
	};
	return registry;
}
/** Builds auth storage for model discovery without prompting for secrets. */
function discoverAuthStorage(agentDir, options) {
	const credentials = options?.skipCredentials === true ? {} : resolveAgentCredentialsForDiscovery(agentDir, options);
	return AuthStorage.inMemory(credentials);
}
/** Creates the model registry used by agent model discovery. */
/** Creates a model registry for one agent directory, optionally filtered and plugin-normalized. */
function discoverModels(authStorage, agentDir, options) {
	return createOpenClawModelRegistry(authStorage, path.join(agentDir, "models.json"), agentDir, options);
}
/**
* Parses complete lifecycle-captured sources without retaining an agent-directory dependency.
* Callers may share the resulting immutable catalog snapshot across exact source generations.
*/
function discoverModelsFromCapturedSources(authStorage, options) {
	return createOpenClawModelRegistry(authStorage, CAPTURED_MODELS_JSON_SOURCE_PATH, void 0, {
		...options,
		normalizeModels: false
	});
}
//#endregion
//#region src/agents/prepared-model-runtime.configured.ts
/** Collects defaults, global refs, and only the selected agent's overrides. */
function collectPreparedModelRuntimeConfiguredRefs(config, agentId) {
	if (!agentId) return collectConfiguredModelRefs(config);
	const entry = resolveAgentEntry(config, agentId);
	return collectConfiguredModelRefs({
		...config,
		agents: {
			...config.agents?.defaults ? { defaults: config.agents.defaults } : {},
			list: entry ? [entry] : []
		}
	});
}
function isCatalogModelApi(value) {
	return value !== void 0 && MODEL_APIS.includes(value);
}
function toStaticCatalogEntry(model) {
	return {
		id: model.id,
		name: model.name ?? model.id,
		provider: model.provider,
		...isCatalogModelApi(model.api) ? { api: model.api } : {},
		...model.baseUrl ? { baseUrl: model.baseUrl } : {},
		...model.contextWindow ? { contextWindow: model.contextWindow } : {},
		...model.contextTokens ? { contextTokens: model.contextTokens } : {},
		...model.reasoning !== void 0 ? { reasoning: model.reasoning } : {},
		...model.input ? { input: model.input } : {},
		...model.params ? { params: model.params } : {},
		...model.compat ? { compat: model.compat } : {},
		...model.mediaInput ? { mediaInput: model.mediaInput } : {}
	};
}
function collectPreparedModelRuntimeProviderIds(config, credentials, includeCredentialProviders, configuredModelRefs = collectConfiguredModelRefs(config)) {
	const providerIds = /* @__PURE__ */ new Set();
	const addProviderId = (value) => {
		const providerId = normalizeProviderId(value);
		if (providerId) providerIds.add(providerId);
	};
	if (includeCredentialProviders) for (const providerId of Object.keys(credentials)) addProviderId(providerId);
	for (const providerId of Object.keys(config.models?.providers ?? {})) addProviderId(providerId);
	for (const ref of configuredModelRefs) {
		const separator = ref.value.indexOf("/");
		if (separator > 0) addProviderId(ref.value.slice(0, separator));
	}
	return [...providerIds].toSorted((left, right) => left.localeCompare(right));
}
function hasConfiguredInlineProviderModel(config, provider, modelId, matchesStaticModelId) {
	return Object.entries(config.models?.providers ?? {}).some(([providerId, providerConfig]) => normalizeProviderId(providerId) === provider && (providerConfig.models ?? []).some((model) => matchesStaticModelId({
		candidateId: model.id,
		rowProvider: providerId,
		provider,
		modelId
	})));
}
function collectConfiguredProviderIdsNeedingStaticCatalog(params) {
	const providerIds = /* @__PURE__ */ new Set();
	for (const { value } of params.configuredModelRefs ?? collectConfiguredModelRefs(params.config)) {
		const separator = value.indexOf("/");
		if (separator <= 0 || separator >= value.length - 1) continue;
		const provider = normalizeProviderId(value.slice(0, separator));
		const modelId = value.slice(separator + 1).trim();
		if (!provider || !modelId || hasConfiguredInlineProviderModel(params.config, provider, modelId, params.matchesStaticModelId) || params.resolveStaticCatalogModel({
			provider,
			modelId
		})) continue;
		providerIds.add(provider);
	}
	return [...providerIds].toSorted((left, right) => left.localeCompare(right));
}
function prepareConfiguredRuntimeModels(params) {
	const prepared = [];
	const seen = /* @__PURE__ */ new Set();
	for (const { value } of params.configuredModelRefs ?? collectConfiguredModelRefs(params.config)) {
		const separator = value.indexOf("/");
		if (separator <= 0 || separator >= value.length - 1) continue;
		const provider = normalizeProviderId(value.slice(0, separator));
		const modelId = value.slice(separator + 1).trim();
		if (!provider || !modelId) continue;
		const key = `${provider}\0${modelId.toLowerCase()}`;
		if (seen.has(key)) continue;
		seen.add(key);
		const model = params.resolveStaticCatalogModel({
			provider,
			modelId
		}) ?? findPreparedProviderStaticCatalogModel({
			prepared: params.preparedStaticProviderCatalog,
			metadataSnapshot: params.metadataSnapshot,
			provider,
			modelId,
			matchesStaticModelId: params.matchesStaticModelId
		}) ?? params.providerStaticModels.find((candidate) => params.matchesStaticModelId({
			candidateId: candidate.id,
			rowProvider: candidate.provider,
			provider,
			modelId
		}));
		if (model) prepared.push({
			provider,
			modelId,
			model
		});
	}
	return prepared;
}
function findPreparedProviderStaticCatalogModel(params) {
	if (!params.prepared) return;
	for (const { provider, result } of params.prepared.entries) for (const [providerId, providerConfig] of Object.entries(normalizePluginDiscoveryResult({
		provider,
		result
	}))) {
		const model = (providerConfig.models ?? []).find((candidate) => params.matchesStaticModelId({
			candidateId: candidate.id,
			rowProvider: providerId,
			provider: params.provider,
			modelId: params.modelId
		}));
		if (!model) continue;
		const [resolved] = buildInlineProviderModels({ [providerId]: {
			...providerConfig,
			models: [model]
		} }, { providerMetadataOwners: params.metadataSnapshot.owners });
		if (resolved) return resolved;
	}
}
//#endregion
//#region src/agents/prepared-model-runtime.plugin-context.ts
const preparedPluginRuntimeLoadContext = Symbol("preparedPluginRuntimeLoadContext");
const emptyPluginDiscovery = {
	candidates: [],
	diagnostics: []
};
function setPreparedPluginRuntimeLoadContext(registry, context) {
	registry[preparedPluginRuntimeLoadContext] = context;
}
function preparePluginLoadContext(input, env, registry, metadataSnapshot) {
	const { config, workspaceDir } = input;
	const context = {
		...resolvePluginRuntimeLoadContext({
			config,
			env,
			workspaceDir,
			metadataSnapshot: metadataSnapshot.discovery ? metadataSnapshot : {
				...metadataSnapshot,
				discovery: emptyPluginDiscovery
			},
			manifestRegistry: metadataSnapshot.manifestRegistry
		}),
		metadataSnapshot,
		installRecords: extractPluginInstallRecordsFromInstalledPluginIndex(metadataSnapshot.index)
	};
	if (registry) setPreparedPluginRuntimeLoadContext(registry, context);
	return context;
}
/** Resolves and attaches the plugin facts owned by one prepared workspace generation. */
function prepareOwnedPluginLoadContext(input, env, registry) {
	const metadataSnapshot = resolvePluginMetadataSnapshot({
		config: input.config,
		env,
		...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {}
	});
	preparePluginLoadContext(input, env, registry, metadataSnapshot);
	return metadataSnapshot;
}
/** Reads plugin facts carried by a lifecycle-owned prepared runtime snapshot. */
const getPreparedPluginRuntimeLoadContext = (registry) => registry?.[preparedPluginRuntimeLoadContext];
//#endregion
//#region src/agents/prepared-model-runtime.facts.ts
const MODEL_RUNTIME_PROVIDER_DISCOVERY_TIMEOUT_MS = 5e3;
const fullModelCatalogSnapshots = /* @__PURE__ */ new WeakSet();
function prepareAgentFacts(input, catalogMode, ambientCredentials, additionalProviderIds = []) {
	const env = input.env ?? process.env;
	const templateAuthStorage = discoverAuthStorage(input.agentDir, {
		config: input.config,
		readOnly: true,
		ambientCredentials,
		...input.skipCredentials ? { skipCredentials: true } : {},
		...input.inheritedAuthDir ? { inheritedAuthDir: input.inheritedAuthDir } : {},
		...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {},
		...input.env ? { env } : {}
	});
	const credentials = templateAuthStorage.getAll();
	const configuredModelRefs = collectPreparedModelRuntimeConfiguredRefs(input.config, input.agentId);
	return {
		input,
		env,
		templateAuthStorage,
		credentials,
		configuredModelRefs,
		providerIds: [.../* @__PURE__ */ new Set([...collectPreparedModelRuntimeProviderIds(input.config, credentials, catalogMode === "live", configuredModelRefs), ...additionalProviderIds.map(normalizeProviderId).filter(Boolean)])].toSorted((left, right) => left.localeCompare(right))
	};
}
function listPreparedSyntheticAuthProviderRefs(providers) {
	return [...new Set(providers.flatMap((provider) => typeof provider.resolveSyntheticAuth === "function" ? [
		provider.id,
		...provider.aliases ?? [],
		...provider.hookAliases ?? []
	] : []))].toSorted((left, right) => left.localeCompare(right));
}
function resolvePreparedSyntheticAuth(params) {
	const normalizedProvider = normalizeProviderId(params.provider);
	return params.providers.find((candidate) => [
		candidate.id,
		...candidate.aliases ?? [],
		...candidate.hookAliases ?? []
	].some((ref) => normalizeProviderId(ref) === normalizedProvider))?.resolveSyntheticAuth?.({
		config: params.config,
		provider: params.provider,
		providerConfig: Object.entries(params.config.models?.providers ?? {}).find(([providerId]) => normalizeProviderId(providerId) === normalizedProvider)?.[1]
	}) ?? void 0;
}
function preparedModelRuntimeWorkspaceFactsKey(input) {
	return JSON.stringify({
		config: hashRuntimeConfigValue(input.config),
		env: hashRuntimeConfigValue(input.env ?? process.env),
		readOnly: input.readOnly === true,
		workspaceDir: input.workspaceDir,
		allowGatewaySubagentBinding: input.allowGatewaySubagentBinding === true,
		runtimePluginSelections: input.runtimePluginSelections
	});
}
async function prepareWorkspaceBuildGroup(inputs, catalogMode, options = {}) {
	const input = inputs[0];
	if (!input) throw new Error("prepared model runtime workspace group is empty");
	const env = input.env ?? process.env;
	const runtimePluginStartedAt = performance.now();
	const runtimePluginRegistry = !input.readOnly ? loadAgentRuntimePluginRegistryHandle({
		config: input.config,
		env,
		...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {},
		...input.allowGatewaySubagentBinding ? { allowGatewaySubagentBinding: true } : {},
		selections: input.runtimePluginSelections
	}) : void 0;
	const runtimePluginMs = performance.now() - runtimePluginStartedAt;
	return await withPluginRuntimeRegistryScope(runtimePluginRegistry, async () => {
		const pluginMetadataStartedAt = performance.now();
		const pluginMetadataSnapshot = prepareOwnedPluginLoadContext(input, env, runtimePluginRegistry);
		const pluginMetadataMs = performance.now() - pluginMetadataStartedAt;
		const matchesStaticModelId = createStaticModelIdMatcher({ manifestPlugins: pluginMetadataSnapshot.plugins });
		const mediaCapabilityProviders = input.readOnly || !runtimePluginRegistry ? void 0 : prepareMediaCapabilityProviders({
			cfg: input.config,
			pluginMetadataSnapshot,
			registry: runtimePluginRegistry
		});
		const messageToolCatalog = runtimePluginRegistry ? getPreparedMessageToolCatalogForRegistry(runtimePluginRegistry) : catalogMode === "live" ? getPreparedMessageToolCatalog() : void 0;
		const resolveManifestStaticCatalogModel = createBundledStaticCatalogModelResolver({
			cfg: input.config,
			env,
			includeRuntimeDiscovery: true,
			metadataSnapshot: pluginMetadataSnapshot,
			...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {}
		});
		const configuredManifestModels = /* @__PURE__ */ new Map();
		const resolveConfiguredManifestModel = (lookup) => {
			const key = `${normalizeProviderId(lookup.provider)}\0${lookup.modelId.trim().toLowerCase()}`;
			if (configuredManifestModels.has(key)) return configuredManifestModels.get(key);
			const model = resolveManifestStaticCatalogModel(lookup);
			configuredManifestModels.set(key, model);
			return model;
		};
		const configuredProviderIds = [.../* @__PURE__ */ new Set([...collectPreparedModelRuntimeProviderIds(input.config, {}, false), ...(options.providerDiscoveryProviderIds ?? []).map(normalizeProviderId).filter(Boolean)])].toSorted((left, right) => left.localeCompare(right));
		const staticCatalogProviderIds = [.../* @__PURE__ */ new Set([...collectConfiguredProviderIdsNeedingStaticCatalog({
			config: input.config,
			matchesStaticModelId,
			resolveStaticCatalogModel: resolveConfiguredManifestModel
		}), ...(options.providerDiscoveryProviderIds ?? []).map(normalizeProviderId).filter(Boolean)])].toSorted((left, right) => left.localeCompare(right));
		const staticProviderCatalogStartedAt = performance.now();
		const preparedStaticProviderCatalog = catalogMode === "static" ? await prepareImplicitProviderStaticCatalog({
			config: input.config,
			env,
			pluginMetadataSnapshot,
			providerDiscoveryProviderIds: configuredProviderIds,
			staticCatalogProviderIds,
			...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {}
		}) : void 0;
		const staticProviderCatalogMs = performance.now() - staticProviderCatalogStartedAt;
		const preparedSyntheticAuthProviders = preparedStaticProviderCatalog?.providers ?? [];
		const ambientCredentialsStartedAt = performance.now();
		const ambientCredentials = resolveAmbientAgentCredentialsForDiscovery({
			config: input.config,
			env,
			syntheticAuthProviderRefs: catalogMode === "static" ? listPreparedSyntheticAuthProviderRefs(preparedSyntheticAuthProviders) : resolveRuntimeSyntheticAuthProviderRefs({
				config: input.config,
				env,
				index: pluginMetadataSnapshot.index,
				registryDiagnostics: pluginMetadataSnapshot.registryDiagnostics,
				...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {}
			}),
			...catalogMode === "static" ? { resolveSyntheticAuth: (provider) => resolvePreparedSyntheticAuth({
				config: input.config,
				provider,
				providers: preparedSyntheticAuthProviders
			}) } : {},
			...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {}
		});
		const ambientCredentialsMs = performance.now() - ambientCredentialsStartedAt;
		const agentFactsStartedAt = performance.now();
		const agentBaseFacts = inputs.map((candidate) => prepareAgentFacts(candidate, catalogMode, ambientCredentials, options.providerDiscoveryProviderIds));
		const agentFactsMs = performance.now() - agentFactsStartedAt;
		const configuredProjectionStartedAt = performance.now();
		const providerStaticModels = catalogMode === "static" ? [] : await loadBundledProviderStaticCatalogContextModels({
			cfg: input.config,
			env,
			metadataSnapshot: pluginMetadataSnapshot,
			...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {}
		});
		const inlineProviderModels = buildInlineProviderModels(input.config.models?.providers ?? {}, { providerMetadataOwners: pluginMetadataSnapshot.owners });
		const configuredCatalogEntries = buildConfiguredModelCatalog({
			cfg: input.config,
			manifestPlugins: pluginMetadataSnapshot.plugins,
			...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {}
		});
		const agentFacts = [];
		for (const facts of agentBaseFacts) {
			const configuredRuntimeModels = prepareConfiguredRuntimeModels({
				config: facts.input.config,
				configuredModelRefs: facts.configuredModelRefs,
				metadataSnapshot: pluginMetadataSnapshot,
				...preparedStaticProviderCatalog ? { preparedStaticProviderCatalog } : {},
				providerStaticModels,
				matchesStaticModelId,
				resolveStaticCatalogModel: resolveConfiguredManifestModel
			});
			const configuredEntryKeys = new Set(configuredCatalogEntries.map(modelCatalogEntryKey));
			for (const configured of configuredRuntimeModels) configuredEntryKeys.add(modelCatalogEntryKey({
				provider: configured.provider,
				id: configured.modelId
			}));
			const configuredGeneratedCatalogPluginIds = [...new Set(facts.configuredModelRefs.flatMap(({ value }) => {
				const separator = value.indexOf("/");
				if (separator <= 0 || separator >= value.length - 1) return [];
				const provider = normalizeProviderId(value.slice(0, separator));
				const modelId = value.slice(separator + 1).trim();
				if (!provider || !modelId || configuredEntryKeys.has(modelCatalogEntryKey({
					provider,
					id: modelId
				}))) return [];
				const pluginId = resolvePluginModelCatalogOwnerPluginId({
					providerId: provider,
					pluginMetadataSnapshot
				});
				return pluginId ? [pluginId] : [];
			}))].toSorted((left, right) => left.localeCompare(right));
			agentFacts.push({
				...facts,
				configuredRuntimeModels,
				configuredGeneratedCatalogPluginIds
			});
		}
		const configuredProjectionMs = performance.now() - configuredProjectionStartedAt;
		return {
			agentFacts,
			buildStats: {
				runtimePluginMs,
				pluginMetadataMs,
				staticProviderCatalogMs,
				ambientCredentialsMs,
				agentFactsMs,
				configuredProjectionMs
			},
			workspaceFacts: {
				pluginMetadataSnapshot,
				messageToolCatalog,
				providerStaticModelsComplete: catalogMode === "live",
				inlineProviderModels,
				configuredCatalogEntries,
				...runtimePluginRegistry ? { pluginRegistry: runtimePluginRegistry } : {},
				...mediaCapabilityProviders ? { mediaCapabilityProviders } : {},
				...preparedStaticProviderCatalog ? { preparedStaticProviderCatalog } : {},
				...providerStaticModels ? { providerStaticModels } : {}
			}
		};
	});
}
async function prepareFullCatalogFacts(agentFacts, workspaceFacts, catalogMode, catalogSource) {
	const { credentials, env, input, templateAuthStorage } = agentFacts;
	const { pluginMetadataSnapshot, preparedStaticProviderCatalog } = workspaceFacts;
	const templateModelRegistry = discoverModels(templateAuthStorage, input.agentDir, {
		config: input.config,
		...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {},
		pluginMetadataSnapshot,
		...catalogMode === "static" ? { normalizeModels: false } : {},
		...catalogSource ? {
			includePluginCatalogs: true,
			modelsJsonContents: catalogSource.modelsJsonContents,
			pluginCatalogs: catalogSource.pluginCatalogs
		} : {}
	});
	const modelCatalog = await buildPreparedModelCatalogSnapshot({
		agentDir: input.agentDir,
		authCredentials: credentials,
		config: input.config,
		modelRegistry: templateModelRegistry,
		metadataSnapshot: pluginMetadataSnapshot,
		includeProviderPluginAugmentation: catalogMode === "live",
		...input.env ? { env } : {},
		...input.readOnly ? { readOnly: true } : {},
		...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {}
	});
	const providerStaticModels = (workspaceFacts.providerStaticModelsComplete ? workspaceFacts.providerStaticModels : void 0) ?? await loadBundledProviderStaticCatalogContextModels({
		cfg: input.config,
		env,
		metadataSnapshot: pluginMetadataSnapshot,
		...preparedStaticProviderCatalog ? { preparedStaticProviderCatalog } : {},
		...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {}
	});
	const configuredRuntimeModels = agentFacts.configuredRuntimeModels;
	const staticModels = /* @__PURE__ */ new Map();
	for (const model of [...configuredRuntimeModels.map((configured) => configured.model), ...providerStaticModels]) {
		const modelKey = `${normalizeProviderId(model.provider)}\0${model.id.trim().toLowerCase()}`;
		if (!staticModels.has(modelKey)) staticModels.set(modelKey, model);
	}
	const staticEntries = [...staticModels.values()].map(toStaticCatalogEntry);
	const completeModelCatalog = {
		...modelCatalog,
		staticEntries
	};
	if (catalogMode === "live") fullModelCatalogSnapshots.add(completeModelCatalog);
	return {
		templateModelRegistry,
		modelCatalog: completeModelCatalog,
		configuredRuntimeModels,
		inlineProviderModels: workspaceFacts.inlineProviderModels
	};
}
/** Reports whether a catalog came from the complete prepared-catalog build path. */
function isPreparedModelCatalogFull(snapshot) {
	return fullModelCatalogSnapshots.has(snapshot);
}
function modelCatalogEntryKey(entry) {
	return `${normalizeProviderId(entry.provider)}\0${entry.id.trim().toLowerCase()}`;
}
function createConfiguredModelCatalogSnapshot(params) {
	const entries = /* @__PURE__ */ new Map();
	const addEntry = (entry) => {
		const key = modelCatalogEntryKey(entry);
		if (!entries.has(key)) entries.set(key, entry);
	};
	for (const entry of params.workspaceFacts.configuredCatalogEntries) addEntry(entry);
	for (const configured of params.configuredRuntimeModels) addEntry(toStaticCatalogEntry(configured.model));
	for (const { value } of params.agentFacts.configuredModelRefs) {
		const separator = value.indexOf("/");
		if (separator <= 0 || separator >= value.length - 1) continue;
		const provider = normalizeProviderId(value.slice(0, separator));
		const modelId = value.slice(separator + 1).trim();
		if (!provider || !modelId) continue;
		const model = params.templateModelRegistry.find(provider, modelId);
		if (model) addEntry(toStaticCatalogEntry(model));
	}
	const configuredEntries = [...entries.values()];
	const staticEntries = params.configuredRuntimeModels.map(({ model }) => toStaticCatalogEntry(model));
	return {
		entries: configuredEntries,
		routeVariants: configuredEntries,
		...staticEntries.length > 0 ? { staticEntries } : {}
	};
}
function prepareConfiguredRuntimeFacts(agentFacts, workspaceFacts, sharedTemplateModelRegistry) {
	const { configuredRuntimeModels } = agentFacts;
	const { inlineProviderModels } = workspaceFacts;
	const templateModelRegistry = sharedTemplateModelRegistry;
	return {
		templateModelRegistry,
		modelCatalog: createConfiguredModelCatalogSnapshot({
			agentFacts,
			workspaceFacts,
			templateModelRegistry,
			configuredRuntimeModels
		}),
		configuredRuntimeModels,
		inlineProviderModels
	};
}
function captureModelsJsonContents(agentDir) {
	try {
		return fs.readFileSync(path.join(agentDir, "models.json"), "utf8");
	} catch (error) {
		if (error.code === "ENOENT") return null;
		throw error;
	}
}
function fingerprintPreparedRuntimeFacts(value) {
	return sha256Base64Url(stableStringify(value));
}
function hasSameOAuthProviderGeneration(left, right) {
	return left.length === right.length && left.every((provider, index) => {
		const candidate = right[index];
		return candidate !== void 0 && provider.id === candidate.id && provider.name === candidate.name && provider.usesCallbackServer === candidate.usesCallbackServer && provider.login === candidate.login && provider.refreshToken === candidate.refreshToken && provider.getApiKey === candidate.getApiKey && provider.modifyModels === candidate.modifyModels;
	});
}
function groupConfiguredRegistrySources(agentFacts) {
	const groups = /* @__PURE__ */ new Map();
	for (const facts of agentFacts) {
		const modelsJsonContents = captureModelsJsonContents(facts.input.agentDir);
		const oauthProviders = facts.templateAuthStorage.getOAuthProviders();
		const pluginCatalogs = loadPersistedPluginModelCatalogsReadOnly(facts.input.agentDir, facts.configuredGeneratedCatalogPluginIds);
		const key = fingerprintPreparedRuntimeFacts({
			credentials: facts.credentials,
			modelsJsonContents,
			pluginCatalogs
		});
		const candidates = groups.get(key) ?? [];
		const group = candidates.find((candidate) => hasSameOAuthProviderGeneration(candidate.oauthProviders, oauthProviders));
		if (group) group.agentFacts.push(facts);
		else {
			candidates.push({
				agentFacts: [facts],
				modelsJsonContents,
				oauthProviders,
				pluginCatalogs
			});
			groups.set(key, candidates);
		}
	}
	return [...groups.values()].flat();
}
function prepareConfiguredRuntimeFactsBatch(params) {
	const catalogs = /* @__PURE__ */ new Map();
	let registryCount = 0;
	for (const group of groupConfiguredRegistrySources(params.agentFacts)) {
		const representative = group.agentFacts[0];
		if (!representative) continue;
		const templateModelRegistry = discoverModelsFromCapturedSources(representative.templateAuthStorage, {
			config: representative.input.config,
			includePluginCatalogs: true,
			modelsJsonContents: group.modelsJsonContents,
			pluginCatalogs: group.pluginCatalogs,
			pluginMetadataSnapshot: params.workspaceFacts.pluginMetadataSnapshot,
			...representative.input.workspaceDir ? { workspaceDir: representative.input.workspaceDir } : {}
		});
		registryCount += 1;
		for (const facts of group.agentFacts) catalogs.set(facts.input, prepareConfiguredRuntimeFacts(facts, params.workspaceFacts, templateModelRegistry));
	}
	return {
		catalogs,
		registryCount
	};
}
async function prepareAgentCatalogSource(agentFacts, workspaceFacts, catalogMode, persist = true, sourceOptions = {}) {
	const { env, input, providerIds } = agentFacts;
	const options = {
		pluginMetadataSnapshot: workspaceFacts.pluginMetadataSnapshot,
		...workspaceFacts.preparedStaticProviderCatalog ? { preparedStaticProviderCatalog: workspaceFacts.preparedStaticProviderCatalog } : {},
		...input.workspaceDir ? { workspaceDir: input.workspaceDir } : {},
		...input.env ? { env } : {},
		...catalogMode === "static" ? {
			providerDiscoveryEntriesOnly: true,
			providerDiscoveryProviderIds: sourceOptions.providerDiscoveryProviderIds ?? providerIds
		} : {
			providerDiscoveryTimeoutMs: MODEL_RUNTIME_PROVIDER_DISCOVERY_TIMEOUT_MS,
			...sourceOptions.providerDiscoveryProviderIds ? { providerDiscoveryProviderIds: sourceOptions.providerDiscoveryProviderIds } : {}
		}
	};
	if (!persist) {
		const source = await planOpenClawModelsJsonSource(input.config, input.agentDir, options);
		return {
			modelsJsonContents: source.modelsJsonContents,
			pluginCatalogs: source.pluginCatalogs
		};
	}
	if (!input.readOnly) await ensureOpenClawModelsJson(input.config, input.agentDir, options);
	return {
		modelsJsonContents: captureModelsJsonContents(input.agentDir),
		pluginCatalogs: loadPersistedPluginModelCatalogsReadOnly(input.agentDir)
	};
}
//#endregion
export { prepareFullCatalogFacts as a, getPreparedPluginRuntimeLoadContext as c, prepareConfiguredRuntimeFactsBatch as i, normalizeDiscoveredAgentModel as l, isPreparedModelCatalogFull as n, prepareWorkspaceBuildGroup as o, prepareAgentCatalogSource as r, preparedModelRuntimeWorkspaceFactsKey as s, fingerprintPreparedRuntimeFacts as t };
