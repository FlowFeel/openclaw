import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-DW4mBlAt.js";
import { a as parseModelCatalogRef } from "./model-catalog-refs-C_8nyypZ.js";
import { n as normalizeGooglePreviewModelId, r as normalizeTogetherModelId } from "./provider-model-id-normalize-DODOj1rv.js";
//#region packages/model-catalog-core/src/provider-model-id-normalization.ts
let currentManifestModelIdNormalizationPolicies;
/** Collect provider model-id normalization policies from plugin manifests. */
function collectManifestModelIdNormalizationPolicies(plugins) {
	const policies = /* @__PURE__ */ new Map();
	for (const plugin of plugins) for (const [provider, policy] of Object.entries(plugin.modelIdNormalization?.providers ?? {})) policies.set(normalizeLowercaseStringOrEmpty(provider), policy);
	return policies;
}
/** Replace the process-local manifest normalization policy snapshot. */
function setCurrentManifestModelIdNormalizationRecords(plugins) {
	currentManifestModelIdNormalizationPolicies = plugins ? collectManifestModelIdNormalizationPolicies(plugins) : void 0;
}
/** Return the current process-local manifest normalization policy snapshot. */
function getCurrentManifestModelIdNormalizationPolicies() {
	return currentManifestModelIdNormalizationPolicies;
}
/** Return true when a model id already includes a provider namespace. */
function hasProviderPrefix(modelId) {
	return modelId.includes("/");
}
/** Join a provider prefix and model id with exactly one slash. */
function formatPrefixedModelId(prefix, modelId) {
	return `${prefix.replace(/\/+$/u, "")}/${modelId.replace(/^\/+/u, "")}`;
}
/** Strip a duplicated self-provider prefix from a model id. */
function stripSelfProviderModelPrefix(provider, model) {
	const prefix = `${normalizeLowercaseStringOrEmpty(provider)}/`;
	const trimmed = model.trim();
	return normalizeLowercaseStringOrEmpty(trimmed).startsWith(prefix) ? trimmed.slice(prefix.length) : model;
}
/** Apply manifest normalization policies for one provider/model id. */
function normalizeProviderModelIdWithPolicies(params) {
	const policy = params.policies.get(normalizeLowercaseStringOrEmpty(params.provider));
	if (!policy) return;
	let modelId = params.context.modelId.trim();
	if (!modelId) return modelId;
	for (const prefix of policy.stripPrefixes ?? []) {
		const normalizedPrefix = normalizeLowercaseStringOrEmpty(prefix);
		if (normalizedPrefix && normalizeLowercaseStringOrEmpty(modelId).startsWith(normalizedPrefix)) {
			modelId = modelId.slice(normalizedPrefix.length);
			break;
		}
	}
	modelId = policy.aliases?.[normalizeLowercaseStringOrEmpty(modelId)] ?? modelId;
	if (!hasProviderPrefix(modelId)) {
		for (const rule of policy.prefixWhenBareAfterAliasStartsWith ?? []) if (normalizeLowercaseStringOrEmpty(modelId).startsWith(rule.modelPrefix.toLowerCase())) return formatPrefixedModelId(rule.prefix, modelId);
		if (policy.prefixWhenBare) return formatPrefixedModelId(policy.prefixWhenBare, modelId);
	}
	return modelId;
}
/** Apply built-in provider-specific model id normalization rules. */
function normalizeBuiltInProviderModelId(provider, model) {
	const normalizedProvider = normalizeLowercaseStringOrEmpty(provider);
	if (normalizedProvider === "google" || normalizedProvider === "google-gemini-cli" || normalizedProvider === "google-vertex") return normalizeGooglePreviewModelId(model);
	if (normalizedProvider === "openrouter") {
		const trimmed = model.trim();
		return trimmed && !trimmed.includes("/") ? `openrouter/${trimmed}` : model;
	}
	if (normalizedProvider === "anthropic") {
		const anthropicAliases = {
			"opus-5": "claude-opus-5",
			opus: "claude-opus-5",
			"opus-4.8": "claude-opus-4-8",
			"opus-4.6": "claude-opus-4-6",
			"sonnet-5": "claude-sonnet-5",
			sonnet: "claude-sonnet-5",
			"sonnet-4.6": "claude-sonnet-4-6"
		};
		const providerModel = normalizeLowercaseStringOrEmpty(model).startsWith("anthropic/") ? model.trim().slice(10) : model;
		return anthropicAliases[normalizeLowercaseStringOrEmpty(providerModel)] ?? providerModel;
	}
	if (normalizedProvider === "vercel-ai-gateway") {
		const aliased = {
			"opus-4.6": "claude-opus-4-6",
			"sonnet-5": "claude-sonnet-5",
			sonnet: "claude-sonnet-4-6",
			"sonnet-4.6": "claude-sonnet-4-6"
		}[normalizeLowercaseStringOrEmpty(model)] ?? model;
		return normalizeLowercaseStringOrEmpty(aliased).startsWith("claude-") ? `anthropic/${aliased}` : aliased;
	}
	if (normalizedProvider === "huggingface") return normalizeLowercaseStringOrEmpty(model).startsWith("huggingface/") ? model.slice(12) : model;
	if (normalizedProvider === "nvidia") {
		const trimmed = model.trim();
		return trimmed && !trimmed.includes("/") ? `nvidia/${trimmed}` : model;
	}
	if (normalizedProvider === "xai") return {
		"grok-4.3-latest": "grok-4.3",
		"grok-4.5-latest": "grok-4.5",
		"grok-build-latest": "grok-4.5",
		"grok-4-fast-reasoning": "grok-4-fast",
		"grok-4-1-fast-reasoning": "grok-4-1-fast"
	}[normalizeLowercaseStringOrEmpty(model)] ?? model;
	if (normalizedProvider === "openai") return model;
	if (normalizedProvider === "together") return normalizeTogetherModelId(model);
	return model;
}
/** Apply manifest policies and built-in normalization to a static provider/model id. */
function normalizeStaticProviderModelIdWithPolicies(provider, model, policies) {
	const normalizedProvider = normalizeLowercaseStringOrEmpty(provider);
	return normalizeBuiltInProviderModelId(normalizedProvider, policies ? normalizeProviderModelIdWithPolicies({
		provider: normalizedProvider,
		policies,
		context: { modelId: model }
	}) ?? model : model);
}
/** Normalize a configured provider/model catalog reference using current policies. */
function normalizeConfiguredProviderCatalogModelId(provider, model, policies = getCurrentManifestModelIdNormalizationPolicies()) {
	return normalizeConfiguredProviderCatalogModelRef(normalizeStaticProviderModelIdWithPolicies(provider, model, policies));
}
/** Normalize embedded Google model aliases inside provider/model catalog refs. */
function normalizeConfiguredProviderCatalogModelRef(providerModel) {
	const googlePrefix = "google/";
	if (!providerModel.startsWith(googlePrefix)) {
		const parsed = parseModelCatalogRef(providerModel);
		if (!parsed) return providerModel;
		if (!parsed.modelId.startsWith(googlePrefix)) return providerModel;
		const normalizedModelId = normalizeGooglePreviewModelId(parsed.modelId);
		return normalizedModelId === parsed.modelId ? providerModel : `${parsed.provider}/${normalizedModelId}`;
	}
	const modelId = providerModel.slice(7);
	const normalizedModelId = normalizeGooglePreviewModelId(modelId);
	return normalizedModelId === modelId ? providerModel : `${googlePrefix}${normalizedModelId}`;
}
//#endregion
//#region src/plugins/current-plugin-metadata-state.ts
let currentPluginMetadataSnapshot;
let currentPluginMetadataSnapshotConfigFingerprint;
let currentPluginMetadataSnapshotCompatiblePolicyHashes;
let currentPluginMetadataSnapshotCompatibleConfigFingerprints;
let currentManifestModelIdNormalizationRecords;
let currentPluginMetadataSnapshotRevision = Symbol("plugin-metadata-snapshot");
let currentPluginMetadataConfigIdentities = /* @__PURE__ */ new WeakSet();
/** Owns config identity reuse for the current immutable metadata snapshot. */
const currentPluginMetadataConfigIdentityCache = {
	add(config) {
		currentPluginMetadataConfigIdentities.add(config);
	},
	capture() {
		return currentPluginMetadataConfigIdentities;
	},
	clear() {
		currentPluginMetadataConfigIdentities = /* @__PURE__ */ new WeakSet();
	},
	has(config) {
		return currentPluginMetadataConfigIdentities.has(config);
	},
	restore(identities) {
		currentPluginMetadataConfigIdentities = identities;
	}
};
/** Stores the process-current plugin metadata snapshot and compatible config fingerprints. */
function setCurrentPluginMetadataSnapshotState(snapshot, configFingerprint, compatiblePolicyHashes, compatibleConfigFingerprints, manifestModelIdNormalizationRecords) {
	currentPluginMetadataSnapshot = snapshot;
	currentPluginMetadataSnapshotConfigFingerprint = snapshot ? configFingerprint : void 0;
	currentPluginMetadataSnapshotCompatiblePolicyHashes = snapshot ? compatiblePolicyHashes : void 0;
	currentPluginMetadataSnapshotCompatibleConfigFingerprints = snapshot ? compatibleConfigFingerprints : void 0;
	currentManifestModelIdNormalizationRecords = snapshot ? manifestModelIdNormalizationRecords : void 0;
	setCurrentManifestModelIdNormalizationRecords(currentManifestModelIdNormalizationRecords);
	currentPluginMetadataSnapshotRevision = Symbol("plugin-metadata-snapshot");
	return currentPluginMetadataSnapshotRevision;
}
/** Clears the process-current plugin metadata snapshot. */
function clearCurrentPluginMetadataSnapshotState() {
	currentPluginMetadataSnapshot = void 0;
	currentPluginMetadataSnapshotConfigFingerprint = void 0;
	currentPluginMetadataSnapshotCompatiblePolicyHashes = void 0;
	currentPluginMetadataSnapshotCompatibleConfigFingerprints = void 0;
	currentManifestModelIdNormalizationRecords = void 0;
	setCurrentManifestModelIdNormalizationRecords(void 0);
	currentPluginMetadataSnapshotRevision = Symbol("plugin-metadata-snapshot");
	return currentPluginMetadataSnapshotRevision;
}
/** Clears the snapshot, its identity cache, and process-wide model normalization. */
function clearCurrentPluginMetadataSnapshot() {
	currentPluginMetadataConfigIdentityCache.clear();
	clearCurrentPluginMetadataSnapshotState();
}
/** Returns the process-current plugin metadata snapshot state. */
function getCurrentPluginMetadataSnapshotState() {
	return {
		snapshot: currentPluginMetadataSnapshot,
		configFingerprint: currentPluginMetadataSnapshotConfigFingerprint,
		compatiblePolicyHashes: currentPluginMetadataSnapshotCompatiblePolicyHashes,
		compatibleConfigFingerprints: currentPluginMetadataSnapshotCompatibleConfigFingerprints,
		manifestModelIdNormalizationRecords: currentManifestModelIdNormalizationRecords,
		revision: currentPluginMetadataSnapshotRevision
	};
}
//#endregion
//#region src/plugins/plugin-metadata-lifecycle.ts
/** Coordinates plugin metadata snapshot and process memo cache lifecycle resets. */
const pluginMetadataProcessMemoClears = /* @__PURE__ */ new Set();
/** Registers a process-local plugin metadata memo clear hook. */
function registerPluginMetadataProcessMemoLifecycleClear(clearProcessMemo) {
	pluginMetadataProcessMemoClears.add(clearProcessMemo);
}
/** Clears plugin metadata snapshots and registered process memo caches. */
function clearPluginMetadataLifecycleCaches() {
	clearCurrentPluginMetadataSnapshot();
	for (const clearProcessMemo of pluginMetadataProcessMemoClears) clearProcessMemo();
}
//#endregion
export { setCurrentPluginMetadataSnapshotState as a, normalizeConfiguredProviderCatalogModelId as c, normalizeStaticProviderModelIdWithPolicies as d, stripSelfProviderModelPrefix as f, getCurrentPluginMetadataSnapshotState as i, normalizeConfiguredProviderCatalogModelRef as l, registerPluginMetadataProcessMemoLifecycleClear as n, collectManifestModelIdNormalizationPolicies as o, currentPluginMetadataConfigIdentityCache as r, normalizeBuiltInProviderModelId as s, clearPluginMetadataLifecycleCaches as t, normalizeProviderModelIdWithPolicies as u };
