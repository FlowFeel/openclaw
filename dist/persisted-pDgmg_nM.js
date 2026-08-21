import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { s as asFiniteNumber } from "./number-coercion-Crk_c9KW.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { _ as uniqueStrings, d as normalizeTrimmedStringList } from "./string-normalization-CRyoFBPt.js";
import { r as normalizeProviderId } from "./provider-id-BIcU_2-A.js";
import { t as asBoolean } from "./boolean-CrriykWV.js";
import { s as coerceSecretRef } from "./types.secrets-BvApkFoj.js";
import { a as readPersistedAuthProfileStoreRaw, i as readPersistedAuthProfileStateRaw } from "./sqlite-DQLy89x1.js";
import { S as log, f as normalizeAuthEmailToken, i as hasUsableOAuthCredential, o as isSafeToAdoptMainStoreOAuthIdentity, p as normalizeAuthIdentityToken, r as hasOAuthIdentity } from "./oauth-shared-B-oYylTU.js";
//#region src/agents/auth-profiles/legacy-oauth-ref.ts
/**
* Legacy OAuth reference recognizer.
* Used by migration/health code to detect older Codex/OpenClaw credential
* sidecar references without accepting arbitrary ref-like objects.
*/
/** Legacy OAuth ref source persisted by older credential stores. */
const LEGACY_OAUTH_REF_SOURCE = "openclaw-credentials";
/** Legacy OAuth ref provider persisted by older credential stores. */
const LEGACY_OAUTH_REF_PROVIDER = "openai-codex";
/** Return true for the legacy OAuth reference shape persisted by older stores. */
function isLegacyOAuthRef(value) {
	if (!isRecord(value)) return false;
	return value.source === LEGACY_OAUTH_REF_SOURCE && value.provider === "openai-codex" && typeof value.id === "string" && /^[a-f0-9]{32}$/.test(value.id);
}
//#endregion
//#region src/agents/auth-profiles/state.ts
/**
* Runtime-state normalization and persistence for auth profile selection.
* This state tracks order, last-good profile, and cooldown/failure metadata
* separately from secret-bearing credentials.
*/
const AUTH_FAILURE_REASONS = /* @__PURE__ */ new Set([
	"auth",
	"auth_permanent",
	"format",
	"overloaded",
	"rate_limit",
	"billing",
	"timeout",
	"model_not_found",
	"session_expired",
	"empty_response",
	"no_error_details",
	"unclassified",
	"unknown"
]);
const AUTH_BLOCKED_REASONS = /* @__PURE__ */ new Set(["subscription_limit"]);
const AUTH_BLOCKED_SOURCES = /* @__PURE__ */ new Set(["codex_rate_limits", "wham"]);
function normalizeFiniteNumber(value) {
	return asFiniteNumber(value);
}
function normalizeEnumValue(value, allowed) {
	if (typeof value !== "string") return;
	return allowed.has(value) ? value : void 0;
}
function normalizeFailureCounts(raw) {
	if (!isRecord(raw)) return;
	const normalized = {};
	for (const [reason, count] of Object.entries(raw)) {
		if (!AUTH_FAILURE_REASONS.has(reason)) continue;
		if (typeof count !== "number" || !Number.isFinite(count) || count <= 0) continue;
		normalized[reason] = Math.trunc(count);
	}
	return Object.keys(normalized).length > 0 ? normalized : void 0;
}
function normalizeAuthProfileOrder(raw) {
	if (!isRecord(raw)) return;
	const normalized = Object.entries(raw).reduce((acc, [provider, value]) => {
		if (!Array.isArray(value)) return acc;
		const providerKey = normalizeProviderId(provider);
		if (!providerKey) return acc;
		const list = normalizeTrimmedStringList(value);
		if (list.length > 0) acc[providerKey] = list;
		return acc;
	}, {});
	return Object.keys(normalized).length > 0 ? normalized : void 0;
}
function normalizeLastGood(raw) {
	if (!isRecord(raw)) return;
	const normalized = {};
	for (const [provider, profileId] of Object.entries(raw)) {
		const providerKey = normalizeProviderId(provider);
		const normalizedProfileId = normalizeOptionalString(profileId);
		if (!providerKey || !normalizedProfileId) continue;
		normalized[providerKey] = normalizedProfileId;
	}
	return Object.keys(normalized).length > 0 ? normalized : void 0;
}
function normalizeUsageStatsEntry(raw) {
	if (!isRecord(raw)) return;
	const stats = {
		lastUsed: normalizeFiniteNumber(raw.lastUsed),
		blockedUntil: normalizeFiniteNumber(raw.blockedUntil),
		blockedReason: normalizeEnumValue(raw.blockedReason, AUTH_BLOCKED_REASONS),
		blockedSource: normalizeEnumValue(raw.blockedSource, AUTH_BLOCKED_SOURCES),
		blockedModel: normalizeOptionalString(raw.blockedModel),
		blockedScope: raw.blockedScope === "model" ? "model" : void 0,
		cooldownUntil: normalizeFiniteNumber(raw.cooldownUntil),
		cooldownReason: normalizeEnumValue(raw.cooldownReason, AUTH_FAILURE_REASONS),
		cooldownModel: normalizeOptionalString(raw.cooldownModel),
		disabledUntil: normalizeFiniteNumber(raw.disabledUntil),
		disabledReason: normalizeEnumValue(raw.disabledReason, AUTH_FAILURE_REASONS),
		errorCount: normalizeFiniteNumber(raw.errorCount),
		failureCounts: normalizeFailureCounts(raw.failureCounts),
		lastFailureAt: normalizeFiniteNumber(raw.lastFailureAt),
		lastProbeAt: normalizeFiniteNumber(raw.lastProbeAt)
	};
	for (const key of Object.keys(stats)) if (stats[key] === void 0) delete stats[key];
	return Object.keys(stats).length > 0 ? stats : void 0;
}
function normalizeUsageStats(raw) {
	if (!isRecord(raw)) return;
	const normalized = {};
	for (const [profileId, value] of Object.entries(raw)) {
		const normalizedProfileId = normalizeOptionalString(profileId);
		const stats = normalizeUsageStatsEntry(value);
		if (!normalizedProfileId || !stats) continue;
		normalized[normalizedProfileId] = stats;
	}
	return Object.keys(normalized).length > 0 ? normalized : void 0;
}
/** Coerces persisted auth profile runtime state into the current shape. */
function coerceAuthProfileState(raw) {
	if (!isRecord(raw)) return {};
	return {
		order: normalizeAuthProfileOrder(raw.order),
		lastGood: normalizeLastGood(raw.lastGood),
		usageStats: normalizeUsageStats(raw.usageStats)
	};
}
/** Merges auth profile runtime state, with override records winning per key. */
function mergeAuthProfileState(base, override) {
	const mergeRecord = (left, right) => {
		if (!left && !right) return;
		if (!left) return { ...right };
		if (!right) return { ...left };
		return {
			...left,
			...right
		};
	};
	return {
		order: mergeRecord(base.order, override.order),
		lastGood: mergeRecord(base.lastGood, override.lastGood),
		usageStats: mergeRecord(base.usageStats, override.usageStats)
	};
}
/** Loads persisted auth profile runtime state from SQLite. */
function loadPersistedAuthProfileState(agentDir, database) {
	return coerceAuthProfileState(readPersistedAuthProfileStateRaw(agentDir, database));
}
/** Builds the persisted auth profile runtime state payload. */
function buildPersistedAuthProfileState(store) {
	const state = coerceAuthProfileState(store);
	if (!state.order && !state.lastGood && !state.usageStats) return null;
	return {
		version: 1,
		...state.order ? { order: state.order } : {},
		...state.lastGood ? { lastGood: state.lastGood } : {},
		...state.usageStats ? { usageStats: state.usageStats } : {}
	};
}
//#endregion
//#region src/agents/auth-profiles/persisted.ts
/**
* Persisted auth profile store loading and migration.
* Normalizes legacy JSON stores, SQLite/raw payloads, runtime state metadata,
* legacy OAuth files, and merged main/agent stores.
*/
const AUTH_PROFILE_TYPES = /* @__PURE__ */ new Set([
	"api_key",
	"oauth",
	"token"
]);
const INLINE_API_KEY_USAGE_ID_PREFIX = "inline-api-key:";
function isRetainedUsageStatsId(profileId, profiles) {
	return Boolean(profiles[profileId]) || profileId.startsWith(INLINE_API_KEY_USAGE_ID_PREFIX);
}
function normalizeOptionalCredentialString(value) {
	if (typeof value !== "string") return;
	return value.trim() ? value : void 0;
}
function normalizeExpiryField(value) {
	if (value === void 0) return;
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}
function normalizeCredentialMetadata(value) {
	if (!isRecord(value)) return;
	const metadata = {};
	for (const [key, entry] of Object.entries(value)) if (typeof entry === "string") metadata[key] = entry;
	return Object.keys(metadata).length > 0 ? metadata : void 0;
}
function normalizeSecretBackedField(params) {
	const value = params.entry[params.valueField];
	if (value == null || typeof value === "string") return;
	const ref = coerceSecretRef(value);
	if (ref && !coerceSecretRef(params.entry[params.refField])) params.entry[params.refField] = ref;
	delete params.entry[params.valueField];
}
function normalizeCommonCredentialFields(entry) {
	const normalized = { provider: typeof entry.provider === "string" ? normalizeProviderId(entry.provider) : "" };
	const copyToAgents = asBoolean(entry.copyToAgents);
	if (copyToAgents !== void 0) normalized.copyToAgents = copyToAgents;
	const email = normalizeOptionalCredentialString(entry.email);
	if (email !== void 0) normalized.email = email;
	const displayName = normalizeOptionalCredentialString(entry.displayName);
	if (displayName !== void 0) normalized.displayName = displayName;
	return normalized;
}
function normalizeRawCredentialEntry(raw) {
	const entry = { ...raw };
	if (!("type" in entry) && typeof entry["mode"] === "string") entry["type"] = entry["mode"];
	if (entry.type === "apiKey") entry.type = "api_key";
	if (!("key" in entry) && !coerceSecretRef(entry["keyRef"]) && typeof entry["apiKey"] === "string") entry["key"] = entry["apiKey"];
	normalizeSecretBackedField({
		entry,
		valueField: "key",
		refField: "keyRef"
	});
	normalizeSecretBackedField({
		entry,
		valueField: "token",
		refField: "tokenRef"
	});
	if (entry.type === "api_key") {
		const normalized = {
			type: "api_key",
			...normalizeCommonCredentialFields(entry)
		};
		const key = normalizeOptionalCredentialString(entry.key);
		const keyRef = coerceSecretRef(entry.keyRef);
		const metadata = normalizeCredentialMetadata(entry.metadata);
		if (keyRef) normalized.keyRef = keyRef;
		else if (key !== void 0) normalized.key = key;
		if (metadata) normalized.metadata = metadata;
		return normalized;
	}
	if (entry.type === "token") {
		const normalized = {
			type: "token",
			...normalizeCommonCredentialFields(entry)
		};
		const token = normalizeOptionalCredentialString(entry.token);
		const tokenRef = coerceSecretRef(entry.tokenRef);
		const expires = normalizeExpiryField(entry.expires);
		if (token !== void 0) normalized.token = token;
		if (tokenRef) normalized.tokenRef = tokenRef;
		if (expires !== void 0) normalized.expires = expires;
		return normalized;
	}
	if (entry.type === "oauth") {
		const normalized = {
			type: "oauth",
			...normalizeCommonCredentialFields(entry)
		};
		if (isLegacyOAuthRef(entry.oauthRef)) normalized.oauthRef = entry.oauthRef;
		for (const field of [
			"access",
			"refresh",
			"idToken",
			"clientId",
			"enterpriseUrl",
			"projectId",
			"accountId",
			"chatgptPlanType",
			"subscriptionType",
			"rateLimitTier"
		]) {
			const value = normalizeOptionalCredentialString(entry[field]);
			if (value !== void 0) normalized[field] = value;
		}
		const expires = normalizeExpiryField(entry.expires);
		if (expires !== void 0) normalized.expires = expires;
		return normalized;
	}
	return entry;
}
function parseCredentialEntry(raw, fallbackProvider) {
	if (!isRecord(raw)) return {
		ok: false,
		reason: "non_object"
	};
	const typed = normalizeRawCredentialEntry(raw);
	if (!AUTH_PROFILE_TYPES.has(typed.type)) return {
		ok: false,
		reason: "invalid_type"
	};
	const provider = typed.provider || fallbackProvider;
	const normalizedProvider = typeof provider === "string" ? normalizeProviderId(provider) : "";
	if (!normalizedProvider) return {
		ok: false,
		reason: "missing_provider"
	};
	return {
		ok: true,
		credential: {
			...typed,
			provider: normalizedProvider
		}
	};
}
/** Normalizes a single legacy credential entry into a canonical credential. */
function parseLegacyCredentialEntry(raw, fallbackProvider) {
	const parsed = parseCredentialEntry(raw, fallbackProvider);
	return parsed.ok ? parsed.credential : null;
}
function warnRejectedCredentialEntries(source, rejected) {
	if (rejected.length === 0) return;
	const reasons = rejected.reduce((acc, current) => {
		acc[current.reason] = (acc[current.reason] ?? 0) + 1;
		return acc;
	}, {});
	log.warn("ignored invalid auth profile entries during store load", {
		source,
		dropped: rejected.length,
		reasons,
		...reasons.invalid_type ? { validTypes: [...AUTH_PROFILE_TYPES] } : {},
		keys: rejected.slice(0, 10).map((entry) => entry.key)
	});
}
function coerceLegacyAuthStore(raw) {
	if (!isRecord(raw)) return null;
	const record = raw;
	if ("profiles" in record) return null;
	const entries = {};
	const rejected = [];
	for (const [key, value] of Object.entries(record)) {
		const parsed = parseCredentialEntry(value, key);
		if (!parsed.ok) {
			rejected.push({
				key,
				reason: parsed.reason
			});
			continue;
		}
		entries[key] = parsed.credential;
	}
	warnRejectedCredentialEntries("auth.json", rejected);
	return Object.keys(entries).length > 0 ? entries : null;
}
/** Coerces a persisted auth profile store payload into the current store shape. */
function coercePersistedAuthProfileStore(raw) {
	if (!isRecord(raw)) return null;
	const record = raw;
	if (!isRecord(record.profiles)) return null;
	const profiles = record.profiles;
	const normalized = {};
	const rejected = [];
	for (const [key, value] of Object.entries(profiles)) {
		const parsed = parseCredentialEntry(value);
		if (!parsed.ok) {
			rejected.push({
				key,
				reason: parsed.reason
			});
			continue;
		}
		normalized[key] = parsed.credential;
	}
	warnRejectedCredentialEntries("auth-profiles.json", rejected);
	const version = Number(record.version ?? 1);
	return {
		version: Number.isFinite(version) && version > 0 ? version : 1,
		profiles: normalized,
		...coerceAuthProfileState(record)
	};
}
function mergeRecord(base, override) {
	if (!base && !override) return;
	if (!base) return { ...override };
	if (!override) return { ...base };
	return {
		...base,
		...override
	};
}
function dedupeMergedProfileOrder(profileIds) {
	return uniqueStrings(profileIds);
}
function groupProfileIdsByProvider(profiles) {
	const grouped = /* @__PURE__ */ new Map();
	for (const [profileId, credential] of Object.entries(profiles)) {
		const providerKey = normalizeProviderId(credential.provider);
		grouped.set(providerKey, [...grouped.get(providerKey) ?? [], profileId]);
	}
	return grouped;
}
function findOrderEntryKey(order, providerKey) {
	return Object.keys(order ?? {}).find((key) => normalizeProviderId(key) === providerKey);
}
function mergeProfileRecordsWithOverridePrecedence(base, override) {
	const overrideProfileIds = new Set(Object.keys(override));
	return Object.fromEntries([...Object.entries(override), ...Object.entries(base).filter(([profileId]) => !overrideProfileIds.has(profileId))]);
}
function mergeProfileOrderWithOverridePrecedence(params) {
	const mergedOrder = mergeRecord(params.baseOrder, params.overrideOrder);
	if (!mergedOrder) return;
	for (const [providerKey, overrideProfileIds] of groupProfileIdsByProvider(params.overrideProfiles)) {
		const baseOrderKey = findOrderEntryKey(params.baseOrder, providerKey);
		const overrideOrderKey = findOrderEntryKey(params.overrideOrder, providerKey);
		const mergedOrderKey = overrideOrderKey ?? baseOrderKey;
		if (!mergedOrderKey) continue;
		for (const provider of Object.keys(mergedOrder)) if (provider !== mergedOrderKey && normalizeProviderId(provider) === providerKey) delete mergedOrder[provider];
		if (overrideOrderKey) {
			mergedOrder[mergedOrderKey] = dedupeMergedProfileOrder(params.overrideOrder?.[overrideOrderKey] ?? []);
			continue;
		}
		const baseOrderIds = baseOrderKey ? params.baseOrder?.[baseOrderKey] ?? [] : [];
		mergedOrder[mergedOrderKey] = dedupeMergedProfileOrder([
			...overrideProfileIds,
			...baseOrderIds,
			...mergedOrder[mergedOrderKey] ?? []
		]);
	}
	return mergedOrder;
}
function hasComparableOAuthIdentityConflict(existing, candidate) {
	const existingAccountId = normalizeAuthIdentityToken(existing.accountId);
	const candidateAccountId = normalizeAuthIdentityToken(candidate.accountId);
	if (existingAccountId !== void 0 && candidateAccountId !== void 0 && existingAccountId !== candidateAccountId) return true;
	const existingEmail = normalizeAuthEmailToken(existing.email);
	const candidateEmail = normalizeAuthEmailToken(candidate.email);
	return existingEmail !== void 0 && candidateEmail !== void 0 && existingEmail !== candidateEmail;
}
function isLegacyDefaultOAuthProfile(profileId, credential) {
	return profileId === `${normalizeProviderId(credential.provider)}:default`;
}
function isNewerUsableOAuthCredential(existing, candidate) {
	if (!hasUsableOAuthCredential(candidate)) return false;
	if (!hasUsableOAuthCredential(existing)) return true;
	return Number.isFinite(candidate.expires) && (!Number.isFinite(existing.expires) || candidate.expires > existing.expires);
}
function findMainStoreOAuthReplacement(params) {
	const providerKey = normalizeProviderId(params.legacyCredential.provider);
	const candidates = Object.entries(params.base.profiles).flatMap(([profileId, credential]) => {
		if (profileId === params.legacyProfileId || credential.type !== "oauth" || normalizeProviderId(credential.provider) !== providerKey) return [];
		return [[profileId, credential]];
	}).filter(([, credential]) => isNewerUsableOAuthCredential(params.legacyCredential, credential)).toSorted(([leftId, leftCredential], [rightId, rightCredential]) => {
		const leftExpires = Number.isFinite(leftCredential.expires) ? leftCredential.expires : 0;
		const rightExpires = Number.isFinite(rightCredential.expires) ? rightCredential.expires : 0;
		if (rightExpires !== leftExpires) return rightExpires - leftExpires;
		return leftId.localeCompare(rightId);
	});
	const exactIdentityCandidates = candidates.filter(([, credential]) => isSafeToAdoptMainStoreOAuthIdentity(params.legacyCredential, credential));
	if (exactIdentityCandidates.length > 0) {
		if (!hasOAuthIdentity(params.legacyCredential) && exactIdentityCandidates.length > 1) return;
		return exactIdentityCandidates[0]?.[0];
	}
	if (hasUsableOAuthCredential(params.legacyCredential)) return;
	const fallbackCandidates = candidates.filter(([, credential]) => !hasComparableOAuthIdentityConflict(params.legacyCredential, credential));
	if (fallbackCandidates.length !== 1) return;
	return fallbackCandidates[0]?.[0];
}
function replaceMergedProfileReferences(params) {
	const { store, base, replacements } = params;
	if (replacements.size === 0) return store;
	const profiles = { ...store.profiles };
	for (const [legacyProfileId, replacementProfileId] of replacements) {
		const baseCredential = base.profiles[legacyProfileId];
		if (baseCredential) profiles[legacyProfileId] = baseCredential;
		else delete profiles[legacyProfileId];
		const replacementBaseCredential = base.profiles[replacementProfileId];
		const replacementCredential = profiles[replacementProfileId];
		if (replacementBaseCredential && (!replacementCredential || replacementCredential.type === "oauth" && replacementBaseCredential.type === "oauth" && isNewerUsableOAuthCredential(replacementCredential, replacementBaseCredential))) profiles[replacementProfileId] = replacementBaseCredential;
	}
	const order = store.order ? Object.fromEntries(Object.entries(store.order).map(([provider, profileIds]) => [provider, dedupeMergedProfileOrder(profileIds.map((profileId) => replacements.get(profileId) ?? profileId))])) : void 0;
	const lastGood = store.lastGood ? Object.fromEntries(Object.entries(store.lastGood).map(([provider, profileId]) => [provider, replacements.get(profileId) ?? profileId])) : void 0;
	const usageStats = store.usageStats ? { ...store.usageStats } : void 0;
	if (usageStats) for (const legacyProfileId of replacements.keys()) {
		const baseStats = base.usageStats?.[legacyProfileId];
		if (baseStats) usageStats[legacyProfileId] = baseStats;
		else delete usageStats[legacyProfileId];
	}
	return {
		...store,
		profiles,
		...order && Object.keys(order).length > 0 ? { order } : { order: void 0 },
		...lastGood && Object.keys(lastGood).length > 0 ? { lastGood } : { lastGood: void 0 },
		...usageStats && Object.keys(usageStats).length > 0 ? { usageStats } : { usageStats: void 0 }
	};
}
function reconcileMainStoreOAuthProfileDrift(params) {
	const replacements = /* @__PURE__ */ new Map();
	for (const [profileId, credential] of Object.entries(params.override.profiles)) {
		if (credential.type !== "oauth") continue;
		const replacementProfileId = isLegacyDefaultOAuthProfile(profileId, credential) ? findMainStoreOAuthReplacement({
			base: params.base,
			legacyProfileId: profileId,
			legacyCredential: credential
		}) : void 0;
		if (replacementProfileId) replacements.set(profileId, replacementProfileId);
	}
	return replaceMergedProfileReferences({
		store: params.merged,
		base: params.base,
		replacements
	});
}
/** Merges two auth profile stores, preserving valid runtime external profile metadata. */
function mergeAuthProfileStores(base, override, options) {
	if (Object.keys(override.profiles).length === 0 && !override.order && !override.lastGood && !override.usageStats && override.runtimePersistedProfileIds === void 0 && override.runtimeLocalProfileIds === void 0 && override.runtimeInheritsMainState === void 0 && override.runtimeExternalProfileIds === void 0 && override.runtimeExternalProfileIdsAuthoritative !== true) return base;
	const overrideProfileIds = new Set(Object.keys(override.profiles));
	const overrideRuntimeExternalProfileIds = new Set(override.runtimeExternalProfileIds ?? []);
	const removedRuntimeExternalProfileIds = new Set(override.runtimeExternalProfileIdsAuthoritative === true && options?.preserveBaseRuntimeExternalProfiles !== true ? (base.runtimeExternalProfileIds ?? []).filter((profileId) => !overrideRuntimeExternalProfileIds.has(profileId) && !overrideProfileIds.has(profileId)) : []);
	const profiles = mergeProfileRecordsWithOverridePrecedence(base.profiles, override.profiles);
	for (const profileId of removedRuntimeExternalProfileIds) delete profiles[profileId];
	const mergedOrder = mergeProfileOrderWithOverridePrecedence({
		baseOrder: base.order,
		overrideOrder: override.order,
		overrideProfiles: override.profiles
	});
	const order = mergedOrder ? Object.fromEntries(Object.entries(mergedOrder).map(([provider, profileIds]) => [provider, profileIds.filter((profileId) => profiles[profileId] || !removedRuntimeExternalProfileIds.has(profileId))]).filter(([, profileIds]) => Array.isArray(profileIds) && profileIds.length > 0)) : void 0;
	const mergedLastGood = mergeRecord(base.lastGood, override.lastGood);
	const lastGood = mergedLastGood ? Object.fromEntries(Object.entries(mergedLastGood).filter(([, profileId]) => profiles[profileId])) : void 0;
	const mergedUsageStats = mergeRecord(base.usageStats, override.usageStats);
	const usageStats = mergedUsageStats ? Object.fromEntries(Object.entries(mergedUsageStats).filter(([profileId]) => isRetainedUsageStatsId(profileId, profiles))) : void 0;
	const merged = {
		version: Math.max(base.version, override.version ?? base.version),
		profiles,
		order,
		lastGood,
		usageStats
	};
	const runtimePersistedProfileIds = [...(base.runtimePersistedProfileIds ?? []).filter((profileId) => !overrideProfileIds.has(profileId)), ...override.runtimePersistedProfileIds ?? []].filter((profileId) => merged.profiles[profileId]).toSorted();
	const runtimeLocalProfileIds = override.runtimeLocalProfileIds?.filter((profileId) => merged.profiles[profileId]).toSorted();
	const runtimeExternalProfileIds = [...override.runtimeExternalProfileIdsAuthoritative === true && options?.preserveBaseRuntimeExternalProfiles !== true ? [] : (base.runtimeExternalProfileIds ?? []).filter((profileId) => !overrideProfileIds.has(profileId)), ...override.runtimeExternalProfileIds ?? []].filter((profileId) => merged.profiles[profileId]).toSorted();
	const runtimeExternalProfileIdsAuthoritative = base.runtimeExternalProfileIdsAuthoritative === true || override.runtimeExternalProfileIdsAuthoritative === true;
	const runtimeExternalProfileMetadata = runtimeExternalProfileIds.length > 0 || runtimeExternalProfileIdsAuthoritative ? {
		runtimeExternalProfileIds: [...new Set(runtimeExternalProfileIds)],
		...runtimeExternalProfileIdsAuthoritative ? { runtimeExternalProfileIdsAuthoritative: true } : {}
	} : {};
	return reconcileMainStoreOAuthProfileDrift({
		base,
		override,
		merged: {
			...merged,
			...runtimePersistedProfileIds.length > 0 ? { runtimePersistedProfileIds: [...new Set(runtimePersistedProfileIds)] } : {},
			...runtimeLocalProfileIds ? { runtimeLocalProfileIds } : {},
			...override.runtimeInheritsMainState !== void 0 ? { runtimeInheritsMainState: override.runtimeInheritsMainState } : {},
			...runtimeExternalProfileMetadata
		}
	});
}
/** Builds the persisted secrets store, stripping resolved literals when refs exist. */
function buildPersistedAuthProfileSecretsStore(store, shouldPersistProfile) {
	return {
		version: 1,
		profiles: Object.fromEntries(Object.entries(store.profiles).flatMap(([profileId, credential]) => {
			if (shouldPersistProfile && !shouldPersistProfile({
				profileId,
				credential
			})) return [];
			if (credential.type === "api_key" && credential.keyRef && credential.key !== void 0) {
				const sanitized = { ...credential };
				delete sanitized.key;
				return [[profileId, sanitized]];
			}
			if (credential.type === "token" && credential.tokenRef && credential.token !== void 0) {
				const sanitized = { ...credential };
				delete sanitized.token;
				return [[profileId, sanitized]];
			}
			return [[profileId, credential]];
		}))
	};
}
/** Applies legacy auth.json credentials into an auth profile store. */
function applyLegacyAuthStore(store, legacy) {
	for (const [provider, cred] of Object.entries(legacy)) store.profiles[`${provider}:default`] = {
		...cred,
		provider: cred.provider ?? provider
	};
}
/** Loads the persisted auth profile store and merges runtime state. */
function loadPersistedAuthProfileStore(agentDir, options) {
	const raw = readPersistedAuthProfileStoreRaw(agentDir, options?.database);
	const store = coercePersistedAuthProfileStore(raw);
	if (!store) return null;
	return {
		...store,
		...mergeAuthProfileState(coerceAuthProfileState(raw), loadPersistedAuthProfileState(agentDir, options?.database))
	};
}
//#endregion
export { loadPersistedAuthProfileStore as a, buildPersistedAuthProfileState as c, mergeAuthProfileState as d, LEGACY_OAUTH_REF_PROVIDER as f, coercePersistedAuthProfileStore as i, coerceAuthProfileState as l, buildPersistedAuthProfileSecretsStore as n, mergeAuthProfileStores as o, isLegacyOAuthRef as p, coerceLegacyAuthStore as r, parseLegacyCredentialEntry as s, applyLegacyAuthStore as t, loadPersistedAuthProfileState as u };
