import { o as asDateTimestampMs } from "./number-coercion-Crk_c9KW.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import "./utils-Bs67j6-3.js";
import "./number-coercion-IpMOa8nH.js";
import { u as isSecretRef } from "./types.secrets-BvApkFoj.js";
import { a as readPersistedAuthProfileStoreRaw, c as resolveAuthProfileDatabasePath, d as writePersistedAuthProfileStoreRaw, i as readPersistedAuthProfileStateRaw, l as runAuthProfileWriteTransaction, r as inspectPersistedAuthProfileStoreRaw, t as deletePersistedAuthProfileStoreRaw, u as writePersistedAuthProfileStateRaw } from "./sqlite-DQLy89x1.js";
import { c as deferOpenClawAgentPostCommitPublication } from "./openclaw-agent-db--PLC25lY.js";
import { d as listLegacyAuthProfileSources, f as markAuthProfileMigrationRequired, i as assertAuthProfileMigrationReady, m as warnLegacyAuthProfileSourcesIgnored, n as AuthProfileMigrationRequiredError, o as clearAuthProfileMigrationRequired, r as AuthProfileStoreUnreadableError } from "./legacy-source-diagnostic-CQwNDL5h.js";
import { t as cloneAuthProfileStore } from "./clone-DIzuC3ZN.js";
import { d as listRuntimeAuthProfileStoreSnapshots, f as noteRuntimeAuthProfileStorePersistedMutation, h as setRuntimeAuthProfileStoreSnapshot, m as replaceRuntimeAuthProfileStoreSnapshots$1, n as clearRuntimeAuthProfileStoreSnapshots$1, o as getRuntimeAuthProfileStoreSnapshot$1, s as getRuntimeAuthProfileStoreSnapshotRevision, t as clearRuntimeAuthProfileStoreSnapshot$1 } from "./runtime-snapshots-D6jlj0Te.js";
import { S as log, l as shouldPersistRuntimeExternalOAuthProfile, o as isSafeToAdoptMainStoreOAuthIdentity } from "./oauth-shared-B-oYylTU.js";
import { n as overlayExternalAuthProfiles, r as syncPersistedExternalCliAuthProfiles, t as listRuntimeExternalAuthProfiles } from "./external-auth-DP23eY14.js";
import { a as loadPersistedAuthProfileStore, c as buildPersistedAuthProfileState, n as buildPersistedAuthProfileSecretsStore, o as mergeAuthProfileStores, u as loadPersistedAuthProfileState } from "./persisted-pDgmg_nM.js";
import "./source-check-4TcBlDsA.js";
import { isDeepStrictEqual } from "node:util";
import { AsyncLocalStorage } from "node:async_hooks";
//#region src/agents/auth-profiles/store.ts
/**
* Auth profile store orchestration.
* Merges persisted stores, runtime snapshots, inherited main-agent OAuth
* profiles, and external CLI overlays while keeping save paths local.
*/
const resolveAuthStorePath = resolveAuthProfileDatabasePath;
const INLINE_OAUTH_TOKEN_FIELDS = [
	"access",
	"refresh",
	"idToken"
];
const authProfileRuntimeMode = new AsyncLocalStorage();
function createEmptyAuthProfileStore() {
	return {
		version: 1,
		profiles: {}
	};
}
/** Run a bounded operation without persisted or external CLI auth profiles. */
function withEnvOnlyAuthProfileStore(run) {
	return authProfileRuntimeMode.run({ kind: "env-only" }, run);
}
/** Run a bounded operation against one existing persisted auth store. */
function withAuthProfileStoreAgentDir(agentDir, run) {
	return authProfileRuntimeMode.run({
		kind: "agent-dir",
		agentDir
	}, run);
}
function isEnvOnlyAuthProfileRuntime() {
	return authProfileRuntimeMode.getStore()?.kind === "env-only";
}
function resolveRuntimeAuthProfileAgentDir(agentDir) {
	const mode = authProfileRuntimeMode.getStore();
	return mode?.kind === "agent-dir" ? mode.agentDir : agentDir;
}
function resolveRuntimeAuthProfileLoadOptions(options) {
	const mode = authProfileRuntimeMode.getStore();
	if (mode?.kind !== "agent-dir") return options;
	return {
		...options,
		inheritedAuthDir: mode.agentDir
	};
}
function hasInlineOAuthTokenMaterial(credential) {
	return INLINE_OAUTH_TOKEN_FIELDS.some((field) => credential[field] !== void 0);
}
function hasChangedInlineOAuthTokenMaterial(params) {
	return INLINE_OAUTH_TOKEN_FIELDS.some((field) => {
		if (params.credential[field] === void 0) return false;
		return !isDeepStrictEqual(params.credential[field], params.existingCredential[field]);
	});
}
function preserveLegacyOAuthRefsOnSave(params) {
	if (!isRecord(params.existingRaw) || !isRecord(params.existingRaw.profiles)) return params.payload;
	let nextProfiles;
	for (const [profileId, credential] of Object.entries(params.payload.profiles)) {
		if (!isRecord(credential) || credential.oauthRef !== void 0 || credential.type !== "oauth") continue;
		const existingCredential = params.existingRaw.profiles[profileId];
		if (!isRecord(existingCredential) || existingCredential.oauthRef === void 0 || existingCredential.type !== "oauth") continue;
		if (hasInlineOAuthTokenMaterial(credential) && hasChangedInlineOAuthTokenMaterial({
			credential,
			existingCredential
		})) continue;
		nextProfiles ??= { ...params.payload.profiles };
		nextProfiles[profileId] = {
			...credential,
			oauthRef: existingCredential.oauthRef
		};
	}
	return nextProfiles ? {
		...params.payload,
		profiles: nextProfiles
	} : params.payload;
}
let runtimeSnapshotPublisherForTest;
function publishRuntimeSnapshotsAfterCommit(publish) {
	if (!publish) return true;
	try {
		if (runtimeSnapshotPublisherForTest) runtimeSnapshotPublisherForTest(publish);
		else publish();
		return true;
	} catch (err) {
		clearRuntimeAuthProfileStoreSnapshots$1();
		log.warn("auth profile store committed but runtime snapshot publication failed", { err });
		return false;
	}
}
const testing = {
	publishRuntimeSnapshotsAfterCommit,
	resetRuntimeSnapshotPublisherForTest() {
		runtimeSnapshotPublisherForTest = void 0;
	},
	setRuntimeSnapshotPublisherForTest(publisher) {
		runtimeSnapshotPublisherForTest = publisher;
	}
};
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.authProfileStoreTestApi")] = testing;
function resolvePersistedLoadOptions(options) {
	return {
		...options?.allowKeychainPrompt !== void 0 ? { allowKeychainPrompt: options.allowKeychainPrompt } : {},
		...options?.database ? { database: options.database } : {}
	};
}
/**
* A non-main agent store deliberately does not persist an OAuth credential the
* main store already owns at the same or newer expiry. Callers that verify a
* write must treat such a profile as intentionally deduped rather than lost,
* otherwise the credential looks like it vanished during the write.
*/
function isInheritedMainOAuthCredential(params) {
	if (!params.agentDir || params.credential.type !== "oauth") return false;
	if (resolveAuthStorePath(params.agentDir) === resolveAuthStorePath()) return false;
	if (loadPersistedAuthProfileStore(params.agentDir)?.profiles[params.profileId]) return false;
	const mainCredential = loadPersistedAuthProfileStore()?.profiles[params.profileId];
	return mainCredential?.type === "oauth" && (isDeepStrictEqual(mainCredential, params.credential) || shouldUseMainOwnerForLocalOAuthCredential({
		local: params.credential,
		main: mainCredential
	}));
}
function shouldUseMainOwnerForLocalOAuthCredential(params) {
	if (params.local.type !== "oauth" || params.main?.type !== "oauth") return false;
	if (!isSafeToAdoptMainStoreOAuthIdentity(params.local, params.main)) return false;
	if (isDeepStrictEqual(params.local, params.main)) return true;
	const mainExpires = asDateTimestampMs(params.main.expires);
	if (mainExpires === void 0) return false;
	const localExpires = asDateTimestampMs(params.local.expires);
	return localExpires === void 0 || mainExpires >= localExpires;
}
function resolveRuntimeAuthProfileStore(agentDir, options) {
	const mainKey = resolveAuthStorePath(options?.inheritedAuthDir);
	const requestedKey = resolveAuthStorePath(agentDir);
	const mainStore = getRuntimeAuthProfileStoreSnapshot$1(options?.inheritedAuthDir);
	const requestedStore = getRuntimeAuthProfileStoreSnapshot$1(agentDir);
	if (!agentDir || requestedKey === mainKey) {
		if (!mainStore) return null;
		return mainStore;
	}
	if (mainStore && requestedStore) return mergeAuthProfileStores(mainStore, requestedStore, { preserveBaseRuntimeExternalProfiles: true });
	if (requestedStore) return mergeAuthProfileStores(loadAuthProfileStoreForAgent(options?.inheritedAuthDir, {
		readOnly: true,
		syncExternalCli: false,
		...resolvePersistedLoadOptions(options)
	}), requestedStore, { preserveBaseRuntimeExternalProfiles: true });
	if (mainStore) return mergeAuthProfileStores(mainStore, loadAuthProfileStoreForAgent(agentDir, {
		readOnly: true,
		syncExternalCli: false,
		...resolvePersistedLoadOptions(options)
	}), { preserveBaseRuntimeExternalProfiles: true });
	return null;
}
function resolveExternalCliOverlayOptions(options) {
	const discovery = options?.externalCli;
	if (!discovery) return {
		...options?.allowKeychainPrompt !== void 0 ? { allowKeychainPrompt: options.allowKeychainPrompt } : {},
		...options?.config ? { config: options.config } : {},
		...options?.externalCliProviderIds ? { externalCliProviderIds: options.externalCliProviderIds } : {},
		...options?.externalCliProfileIds ? { externalCliProfileIds: options.externalCliProfileIds } : {}
	};
	if (discovery.mode === "none") {
		const config = discovery.config ?? options?.config;
		return {
			allowKeychainPrompt: false,
			...config ? { config } : {},
			externalCliProviderIds: [],
			externalCliProfileIds: []
		};
	}
	if (discovery.mode === "existing") {
		const allowKeychainPrompt = discovery.allowKeychainPrompt ?? options?.allowKeychainPrompt;
		const config = discovery.config ?? options?.config;
		return {
			...allowKeychainPrompt !== void 0 ? { allowKeychainPrompt } : {},
			...config ? { config } : {}
		};
	}
	const allowKeychainPrompt = discovery.allowKeychainPrompt ?? options?.allowKeychainPrompt;
	const config = discovery.config ?? options?.config;
	return {
		...allowKeychainPrompt !== void 0 ? { allowKeychainPrompt } : {},
		...config ? { config } : {},
		...discovery.providerIds ? { externalCliProviderIds: discovery.providerIds } : {},
		...discovery.profileIds ? { externalCliProfileIds: discovery.profileIds } : {}
	};
}
function hasScopedExternalCliOverlay(options) {
	return options.externalCliProviderIds !== void 0 || options.externalCliProfileIds !== void 0;
}
function maybeSyncPersistedExternalCliAuthProfiles(params) {
	if (params.options?.readOnly === true || params.options?.syncExternalCli === false || process.env.OPENCLAW_AUTH_STORE_READONLY === "1") return {
		store: params.store,
		cacheable: true
	};
	const synced = syncPersistedExternalCliAuthProfiles(params.store, {
		agentDir: params.agentDir,
		...resolveExternalCliOverlayOptions(params.options)
	});
	if (synced === params.store) return {
		store: params.store,
		cacheable: true
	};
	const changedProfiles = Object.entries(synced.profiles).filter(([profileId, credential]) => {
		const previous = params.store.profiles[profileId];
		return !isDeepStrictEqual(previous, credential);
	});
	if (changedProfiles.length === 0) return {
		store: synced,
		cacheable: true
	};
	let publishRuntimeSnapshots;
	let result;
	try {
		result = runAuthProfileWriteTransaction(params.agentDir, (database) => {
			const latestStore = loadPersistedAuthProfileStore(params.agentDir, {
				...resolvePersistedLoadOptions(params.options),
				database
			}) ?? {
				version: 1,
				profiles: {}
			};
			let changed = false;
			for (const [profileId, credential] of changedProfiles) {
				const previous = params.store.profiles[profileId];
				const latest = latestStore.profiles[profileId];
				if (!isDeepStrictEqual(latest, previous)) {
					log.debug("skipped persisted external cli auth sync for concurrently changed profile", { profileId });
					continue;
				}
				latestStore.profiles[profileId] = credential;
				changed = true;
			}
			if (changed) publishRuntimeSnapshots = saveAuthProfileStoreInTransaction(latestStore, params.agentDir, { filterExternalAuthProfiles: false }, database);
			return {
				store: latestStore,
				cacheable: true
			};
		});
	} catch (err) {
		log.warn("skipped persisted external cli auth sync because auth store write failed", { err });
		return {
			store: params.store,
			cacheable: false
		};
	}
	return publishRuntimeSnapshotsAfterCommit(publishRuntimeSnapshots) ? result : {
		store: result.store,
		cacheable: false
	};
}
function shouldKeepProfileInLocalStore(params) {
	if (params.credential.type !== "oauth") return true;
	if (isInheritedMainOAuthCredential({
		agentDir: params.agentDir,
		profileId: params.profileId,
		credential: params.credential
	})) return false;
	if (params.options?.filterExternalAuthProfiles === false) return true;
	if (params.store.runtimeExternalProfileIds?.includes(params.profileId)) {
		if (loadPersistedAuthProfileStore(params.agentDir)?.profiles[params.profileId]) return shouldPersistRuntimeExternalOAuthProfile({
			profileId: params.profileId,
			credential: params.credential,
			profiles: params.externalProfiles()
		});
		const runtimeCredential = getRuntimeAuthProfileStoreSnapshot(params.agentDir)?.profiles[params.profileId];
		if (!runtimeCredential || isDeepStrictEqual(runtimeCredential, params.credential)) return false;
	}
	return shouldPersistRuntimeExternalOAuthProfile({
		profileId: params.profileId,
		credential: params.credential,
		profiles: params.externalProfiles()
	});
}
function pruneAuthProfileStoreReferences(store, keptProfileIds, keptOrderProfileIds = keptProfileIds) {
	store.order = store.order ? Object.fromEntries(Object.entries(store.order).map(([provider, profileIds]) => [provider, profileIds.filter((profileId) => keptOrderProfileIds.has(profileId))]).filter(([, profileIds]) => Array.isArray(profileIds) && profileIds.length > 0)) : void 0;
	store.lastGood = store.lastGood ? Object.fromEntries(Object.entries(store.lastGood).filter(([, profileId]) => keptProfileIds.has(profileId))) : void 0;
	store.usageStats = store.usageStats ? Object.fromEntries(Object.entries(store.usageStats).filter(([profileId]) => keptProfileIds.has(profileId) || profileId.startsWith("inline-api-key:"))) : void 0;
	store.runtimePersistedProfileIds = store.runtimePersistedProfileIds?.filter((profileId) => keptProfileIds.has(profileId)).toSorted();
	if (store.runtimePersistedProfileIds?.length === 0) store.runtimePersistedProfileIds = void 0;
	store.runtimeLocalProfileIds = store.runtimeLocalProfileIds?.filter((profileId) => keptProfileIds.has(profileId)).toSorted();
	store.runtimeExternalProfileIds = store.runtimeExternalProfileIds?.filter((profileId) => keptProfileIds.has(profileId)).toSorted();
	if (store.runtimeExternalProfileIds?.length === 0 && store.runtimeExternalProfileIdsAuthoritative !== true) store.runtimeExternalProfileIds = void 0;
	if (store.runtimeExternalProfileIdsAuthoritative === true) store.runtimeExternalProfileIds ??= [];
}
function buildLocalAuthProfileStoreForSave(params) {
	const localStore = cloneAuthProfileStore(params.store);
	let externalProfiles;
	const getExternalProfiles = () => externalProfiles ??= listRuntimeExternalAuthProfiles({
		store: params.store,
		agentDir: params.agentDir
	});
	localStore.profiles = Object.fromEntries(Object.entries(localStore.profiles).filter(([profileId, credential]) => shouldKeepProfileInLocalStore({
		store: params.store,
		profileId,
		credential,
		agentDir: params.agentDir,
		options: params.options,
		externalProfiles: getExternalProfiles
	})));
	const keptProfileIds = new Set(Object.keys(localStore.profiles));
	const keptOrderProfileIds = new Set(keptProfileIds);
	for (const profileId of params.options?.preserveStateProfileIds ?? []) {
		const normalizedProfileId = profileId.trim();
		if (normalizedProfileId) {
			keptProfileIds.add(normalizedProfileId);
			keptOrderProfileIds.add(normalizedProfileId);
		}
	}
	for (const profileIds of Object.values(loadPersistedAuthProfileState(params.agentDir).order ?? {})) for (const profileId of profileIds) keptOrderProfileIds.add(profileId);
	for (const profileId of params.options?.preserveOrderProfileIds ?? []) {
		const normalizedProfileId = profileId.trim();
		if (normalizedProfileId) keptOrderProfileIds.add(normalizedProfileId);
	}
	const prunedOrderProfileIds = /* @__PURE__ */ new Set();
	for (const profileId of params.options?.pruneOrderProfileIds ?? []) {
		const normalizedProfileId = profileId.trim();
		if (normalizedProfileId) prunedOrderProfileIds.add(normalizedProfileId);
	}
	for (const profileId of prunedOrderProfileIds) keptOrderProfileIds.delete(profileId);
	pruneAuthProfileStoreReferences(localStore, keptProfileIds, keptOrderProfileIds);
	if (params.options?.filterExternalAuthProfiles !== false) {
		localStore.runtimeExternalProfileIds = void 0;
		localStore.runtimeExternalProfileIdsAuthoritative = void 0;
	}
	return localStore;
}
function buildAuthProfileStoreWithoutExternalProfiles(params) {
	const runtimeExternalProfileIds = new Set(params.store.runtimeExternalProfileIds ?? []);
	const localStore = cloneAuthProfileStore(params.store);
	if (runtimeExternalProfileIds.size === 0) return stripRuntimeExternalProfileMetadata(localStore);
	for (const profileId of runtimeExternalProfileIds) delete localStore.profiles[profileId];
	pruneAuthProfileStoreReferences(localStore, new Set(Object.keys(localStore.profiles)));
	return stripRuntimeExternalProfileMetadata(mergeAuthProfileStores(loadAuthProfileStoreWithoutExternalProfiles(params.agentDir, params.options), localStore));
}
function stripRuntimeExternalProfileMetadata(store) {
	const stripped = { ...store };
	delete stripped.runtimeExternalProfileIds;
	delete stripped.runtimeExternalProfileIdsAuthoritative;
	return stripped;
}
function markRuntimePersistedProfiles(store, persistedStore = store) {
	const profileIds = Object.entries(persistedStore.profiles).flatMap(([profileId, credential]) => isDeepStrictEqual(store.profiles[profileId], credential) ? [profileId] : []).toSorted();
	return {
		...store,
		runtimePersistedProfileIds: profileIds.length > 0 ? profileIds : void 0
	};
}
function buildRuntimeAuthProfileStoreForSave(params) {
	return buildLocalAuthProfileStoreForSave({
		...params,
		options: {
			...params.options,
			filterExternalAuthProfiles: false
		}
	});
}
function setRuntimeLocalProfileMetadata(store, localProfileIds, runtimeInheritsMainState = false) {
	return {
		...store,
		runtimeLocalProfileIds: [...new Set(localProfileIds)].toSorted(),
		...runtimeInheritsMainState ? { runtimeInheritsMainState: true } : {}
	};
}
function runtimeStoreInheritsMainState(store, localStore) {
	const state = ({ order, lastGood, usageStats }) => ({
		order,
		lastGood,
		usageStats
	});
	return !isDeepStrictEqual(state(store), state(localStore));
}
function listRuntimeLocalProfileIds(store, mainStore) {
	return Object.entries(store.profiles).flatMap(([profileId, credential]) => mainStore && shouldUseMainOwnerForLocalOAuthCredential({
		local: credential,
		main: mainStore.profiles[profileId]
	}) ? [] : [profileId]);
}
function setRuntimeExternalProfileMetadata(params) {
	const profileIds = [...params.profileIds].toSorted();
	params.store.runtimeExternalProfileIds = profileIds.length > 0 || params.authoritative ? profileIds : void 0;
	params.store.runtimeExternalProfileIdsAuthoritative = params.authoritative ? true : void 0;
}
function mergeRuntimeExternalProfileReferences(params) {
	const runtimeExternalProfileIds = new Set(params.existing.runtimeExternalProfileIds ?? []);
	if (params.next.runtimeExternalProfileIdsAuthoritative === true) return params.next;
	if (runtimeExternalProfileIds.size === 0) return params.next;
	const merged = cloneAuthProfileStore(params.next);
	const mergedRuntimeExternalProfileIds = new Set(merged.runtimeExternalProfileIds ?? []);
	const backfilledRuntimeExternalProfileIds = /* @__PURE__ */ new Set();
	for (const profileId of runtimeExternalProfileIds) {
		const existingCredential = params.existing.profiles[profileId];
		const nextCredential = merged.profiles[profileId];
		if (nextCredential) {
			if (mergedRuntimeExternalProfileIds.has(profileId) || existingCredential && isDeepStrictEqual(nextCredential, existingCredential)) mergedRuntimeExternalProfileIds.add(profileId);
			continue;
		}
		if (!existingCredential) continue;
		merged.profiles[profileId] = existingCredential;
		mergedRuntimeExternalProfileIds.add(profileId);
		backfilledRuntimeExternalProfileIds.add(profileId);
		if (params.existing.usageStats?.[profileId]) merged.usageStats = {
			...merged.usageStats,
			[profileId]: params.existing.usageStats[profileId]
		};
	}
	for (const [provider, profileIds] of Object.entries(params.existing.order ?? {})) {
		const externalProfileIds = profileIds.filter((profileId) => backfilledRuntimeExternalProfileIds.has(profileId));
		if (externalProfileIds.length === 0) continue;
		if (merged.order?.[provider]) continue;
		const existingOrder = merged.order?.[provider] ?? [];
		merged.order = {
			...merged.order,
			[provider]: [...externalProfileIds, ...existingOrder.filter((profileId) => !externalProfileIds.includes(profileId))]
		};
	}
	for (const [provider, profileId] of Object.entries(params.existing.lastGood ?? {})) {
		if (!backfilledRuntimeExternalProfileIds.has(profileId) || merged.lastGood?.[provider]) continue;
		merged.lastGood = {
			...merged.lastGood,
			[provider]: profileId
		};
	}
	setRuntimeExternalProfileMetadata({
		store: merged,
		profileIds: mergedRuntimeExternalProfileIds,
		authoritative: params.existing.runtimeExternalProfileIdsAuthoritative === true
	});
	return merged;
}
function preserveResolvedSecretBackedCredentials(params) {
	const next = cloneAuthProfileStore(params.next);
	for (const [profileId, credential] of Object.entries(next.profiles)) {
		const existing = params.existing.profiles[profileId];
		if (credential.type === "api_key" && existing?.type === "api_key" && credential.key === void 0 && existing.key !== void 0 && isSecretRef(credential.keyRef) && isDeepStrictEqual(credential.keyRef, existing.keyRef)) next.profiles[profileId] = {
			...credential,
			key: existing.key
		};
		else if (credential.type === "token" && existing?.type === "token" && credential.token === void 0 && existing.token !== void 0 && isSecretRef(credential.tokenRef) && isDeepStrictEqual(credential.tokenRef, existing.tokenRef)) next.profiles[profileId] = {
			...credential,
			token: existing.token
		};
	}
	return next;
}
function mergeRuntimeExternalProfileState(params) {
	const existingRuntimeProfileIds = new Set(params.existing.runtimeExternalProfileIds ?? []);
	if (existingRuntimeProfileIds.size === 0) return params.next;
	const merged = cloneAuthProfileStore(params.next);
	const mergedRuntimeProfileIds = new Set(merged.runtimeExternalProfileIds ?? []);
	const activeRuntimeProfileIds = /* @__PURE__ */ new Set();
	const nextRuntimeProfileIdsAuthoritative = params.next.runtimeExternalProfileIdsAuthoritative === true;
	for (const profileId of existingRuntimeProfileIds) {
		if (nextRuntimeProfileIdsAuthoritative && !mergedRuntimeProfileIds.has(profileId)) continue;
		const existingCredential = params.existing.profiles[profileId];
		if (!existingCredential) continue;
		const nextCredential = merged.profiles[profileId];
		if (nextCredential) {
			if (mergedRuntimeProfileIds.has(profileId) || isDeepStrictEqual(nextCredential, existingCredential)) {
				mergedRuntimeProfileIds.add(profileId);
				activeRuntimeProfileIds.add(profileId);
			}
			continue;
		}
		merged.profiles[profileId] = existingCredential;
		mergedRuntimeProfileIds.add(profileId);
		activeRuntimeProfileIds.add(profileId);
	}
	if (activeRuntimeProfileIds.size === 0) return params.next;
	for (const profileId of activeRuntimeProfileIds) if (params.existing.usageStats?.[profileId]) merged.usageStats = {
		...merged.usageStats,
		[profileId]: params.existing.usageStats[profileId]
	};
	for (const [provider, profileIds] of Object.entries(params.existing.order ?? {})) {
		const externalProfileIds = profileIds.filter((profileId) => activeRuntimeProfileIds.has(profileId));
		if (externalProfileIds.length === 0 || merged.order?.[provider]) continue;
		merged.order = {
			...merged.order,
			[provider]: externalProfileIds
		};
	}
	for (const [provider, profileId] of Object.entries(params.existing.lastGood ?? {})) {
		if (!activeRuntimeProfileIds.has(profileId) || merged.lastGood?.[provider]) continue;
		merged.lastGood = {
			...merged.lastGood,
			[provider]: profileId
		};
	}
	setRuntimeExternalProfileMetadata({
		store: merged,
		profileIds: mergedRuntimeProfileIds,
		authoritative: params.existing.runtimeExternalProfileIdsAuthoritative === true
	});
	return merged;
}
/** Apply an auth store update inside the SQLite write lock. */
async function updateAuthProfileStoreWithLock(params) {
	const agentDir = resolveRuntimeAuthProfileAgentDir(params.agentDir);
	let publishRuntimeSnapshots;
	let store;
	try {
		store = runAuthProfileWriteTransaction(agentDir, (database) => {
			const loadedStore = loadAuthProfileStoreForAgent(agentDir, {
				database,
				readOnly: true,
				syncExternalCli: false
			});
			if (params.updater(loadedStore)) publishRuntimeSnapshots = saveAuthProfileStoreInTransaction(loadedStore, agentDir, params.saveOptions, database);
			return loadedStore;
		}, { stateDir: params.stateDir });
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		log.warn(`auth profile store update failed: ${message}`, {
			agentDir,
			error: message
		});
		return null;
	}
	publishRuntimeSnapshotsAfterCommit(publishRuntimeSnapshots);
	return store;
}
/** Load the main auth profile store with runtime external profiles overlaid. */
function loadAuthProfileStore() {
	if (isEnvOnlyAuthProfileRuntime()) return createEmptyAuthProfileStore();
	const agentDir = resolveRuntimeAuthProfileAgentDir();
	const asStore = loadPersistedAuthProfileStore(agentDir);
	if (asStore) return overlayExternalAuthProfiles(markRuntimePersistedProfiles(asStore), { agentDir });
	return overlayExternalAuthProfiles(markRuntimePersistedProfiles({
		version: 1,
		profiles: {}
	}), { agentDir });
}
function loadAuthProfileStoreForAgent(agentDir, options) {
	if (isEnvOnlyAuthProfileRuntime()) return createEmptyAuthProfileStore();
	const effectiveAgentDir = resolveRuntimeAuthProfileAgentDir(agentDir);
	const effectiveOptions = resolveRuntimeAuthProfileLoadOptions(options);
	assertAuthProfileMigrationReady(effectiveAgentDir);
	const asStore = loadPersistedAuthProfileStore(effectiveAgentDir, resolvePersistedLoadOptions(effectiveOptions));
	if (asStore) {
		const legacySources = listLegacyAuthProfileSources({ agentDir: effectiveAgentDir });
		const credentialSources = legacySources.filter((source) => source.kind !== "auth-state");
		if (credentialSources.length > 0) {
			const migrationError = new AuthProfileMigrationRequiredError({
				agentDir: effectiveAgentDir,
				sources: credentialSources
			});
			markAuthProfileMigrationRequired(effectiveAgentDir, migrationError);
			throw migrationError;
		}
		warnLegacyAuthProfileSourcesIgnored({
			agentDir: effectiveAgentDir,
			sources: legacySources
		});
		clearAuthProfileMigrationRequired(effectiveAgentDir);
		return markRuntimePersistedProfiles(maybeSyncPersistedExternalCliAuthProfiles({
			store: asStore,
			agentDir: effectiveAgentDir,
			options: effectiveOptions
		}).store);
	}
	if (inspectPersistedAuthProfileStoreRaw(effectiveAgentDir, effectiveOptions?.database).status !== "missing") throw new AuthProfileStoreUnreadableError(effectiveAgentDir);
	const legacySources = listLegacyAuthProfileSources({ agentDir: effectiveAgentDir });
	const credentialSources = legacySources.filter((source) => source.kind !== "auth-state");
	if (credentialSources.length > 0) throw new AuthProfileMigrationRequiredError({
		agentDir: effectiveAgentDir,
		sources: credentialSources
	});
	warnLegacyAuthProfileSourcesIgnored({
		agentDir: effectiveAgentDir,
		sources: legacySources
	});
	clearAuthProfileMigrationRequired(effectiveAgentDir);
	return markRuntimePersistedProfiles(maybeSyncPersistedExternalCliAuthProfiles({
		store: {
			version: 1,
			profiles: {}
		},
		agentDir: effectiveAgentDir,
		options: effectiveOptions
	}).store);
}
/** Loads the effective runtime store for an agent, including inherited main profiles. */
function loadAuthProfileStoreForRuntime(agentDir, options) {
	if (isEnvOnlyAuthProfileRuntime()) return createEmptyAuthProfileStore();
	const effectiveAgentDir = resolveRuntimeAuthProfileAgentDir(agentDir);
	const effectiveOptions = resolveRuntimeAuthProfileLoadOptions(options);
	const store = loadAuthProfileStoreForAgent(effectiveAgentDir, effectiveOptions);
	const authPath = resolveAuthStorePath(effectiveAgentDir);
	const mainAuthPath = resolveAuthStorePath(effectiveOptions?.inheritedAuthDir);
	const externalCli = resolveExternalCliOverlayOptions(effectiveOptions);
	if (!effectiveAgentDir || authPath === mainAuthPath) return setRuntimeLocalProfileMetadata(overlayExternalAuthProfiles(store, {
		agentDir: effectiveAgentDir,
		...externalCli
	}), listRuntimeLocalProfileIds(store));
	const mainStore = loadAuthProfileStoreForAgent(effectiveOptions?.inheritedAuthDir, effectiveOptions);
	const mergedStore = mergeAuthProfileStores(mainStore, store, { preserveBaseRuntimeExternalProfiles: true });
	return setRuntimeLocalProfileMetadata(overlayExternalAuthProfiles(mergedStore, {
		agentDir: effectiveAgentDir,
		...externalCli
	}), listRuntimeLocalProfileIds(store, mainStore), runtimeStoreInheritsMainState(mergedStore, store));
}
/** Load auth profiles for secret resolution without keychain prompts or writes. */
function loadAuthProfileStoreForSecretsRuntime(agentDir, options) {
	return loadAuthProfileStoreForRuntime(agentDir, {
		...options,
		readOnly: true,
		allowKeychainPrompt: false
	});
}
/** Load auth profiles with runtime external profiles removed from the result. */
function loadAuthProfileStoreWithoutExternalProfiles(agentDir, loadOptions) {
	const effectiveAgentDir = resolveRuntimeAuthProfileAgentDir(agentDir);
	const effectiveLoadOptions = resolveRuntimeAuthProfileLoadOptions(loadOptions);
	const options = {
		readOnly: true,
		allowKeychainPrompt: effectiveLoadOptions?.allowKeychainPrompt ?? false,
		...effectiveLoadOptions?.inheritedAuthDir ? { inheritedAuthDir: effectiveLoadOptions.inheritedAuthDir } : {}
	};
	const store = loadAuthProfileStoreForAgent(effectiveAgentDir, options);
	const authPath = resolveAuthStorePath(effectiveAgentDir);
	const mainAuthPath = resolveAuthStorePath(options.inheritedAuthDir);
	if (!effectiveAgentDir || authPath === mainAuthPath) return setRuntimeLocalProfileMetadata(stripRuntimeExternalProfileMetadata(store), listRuntimeLocalProfileIds(store));
	const mainStore = loadAuthProfileStoreForAgent(options.inheritedAuthDir, options);
	const mergedStore = mergeAuthProfileStores(mainStore, store, { preserveBaseRuntimeExternalProfiles: true });
	return setRuntimeLocalProfileMetadata(stripRuntimeExternalProfileMetadata(mergedStore), listRuntimeLocalProfileIds(store, mainStore), runtimeStoreInheritsMainState(mergedStore, store));
}
/** Ensure an auth store is available, including runtime/external profile overlays. */
function ensureAuthProfileStore(agentDir, options) {
	if (isEnvOnlyAuthProfileRuntime()) return createEmptyAuthProfileStore();
	const effectiveAgentDir = resolveRuntimeAuthProfileAgentDir(agentDir);
	const effectiveOptions = resolveRuntimeAuthProfileLoadOptions(options);
	const externalCli = resolveExternalCliOverlayOptions(effectiveOptions);
	const runtimeStore = resolveRuntimeAuthProfileStore(effectiveAgentDir, effectiveOptions);
	const store = overlayExternalAuthProfiles(ensureAuthProfileStoreWithoutExternalProfiles(effectiveAgentDir, effectiveOptions), {
		agentDir: effectiveAgentDir,
		...externalCli
	});
	if (!runtimeStore || hasScopedExternalCliOverlay(externalCli)) return store;
	return mergeRuntimeExternalProfileState({
		next: store,
		existing: runtimeStore
	});
}
/** Ensure an auth store is available without external profile overlays. */
function ensureAuthProfileStoreWithoutExternalProfiles(agentDir, options) {
	if (isEnvOnlyAuthProfileRuntime()) return createEmptyAuthProfileStore();
	const effectiveAgentDir = resolveRuntimeAuthProfileAgentDir(agentDir);
	const effectiveOptions = resolveRuntimeAuthProfileLoadOptions(options) ?? { ...options };
	const runtimeStore = resolveRuntimeAuthProfileStore(effectiveAgentDir, effectiveOptions);
	if (runtimeStore) return buildAuthProfileStoreWithoutExternalProfiles({
		store: runtimeStore,
		agentDir: effectiveAgentDir,
		options: effectiveOptions
	});
	const store = loadAuthProfileStoreForAgent(effectiveAgentDir, effectiveOptions);
	const authPath = resolveAuthStorePath(effectiveAgentDir);
	const mainAuthPath = resolveAuthStorePath(effectiveOptions.inheritedAuthDir);
	if (!effectiveAgentDir || authPath === mainAuthPath) return stripRuntimeExternalProfileMetadata(store);
	return stripRuntimeExternalProfileMetadata(mergeAuthProfileStores(loadAuthProfileStoreForAgent(effectiveOptions.inheritedAuthDir, effectiveOptions), store, { preserveBaseRuntimeExternalProfiles: true }));
}
/** Find a persisted credential in the scoped store, falling back to the main store. */
function findPersistedAuthProfileCredential(params) {
	if (isEnvOnlyAuthProfileRuntime()) return;
	const agentDir = resolveRuntimeAuthProfileAgentDir(params.agentDir);
	const requestedProfile = loadPersistedAuthProfileStore(agentDir)?.profiles[params.profileId];
	if (requestedProfile || !agentDir) return requestedProfile;
	if (resolveAuthStorePath(agentDir) === resolveAuthStorePath(resolveRuntimeAuthProfileAgentDir())) return requestedProfile;
	return loadPersistedAuthProfileStore(resolveRuntimeAuthProfileAgentDir())?.profiles[params.profileId];
}
/** Resolve which agent dir owns a persisted profile, accounting for inherited OAuth. */
function resolvePersistedAuthProfileOwnerAgentDir(params) {
	if (isEnvOnlyAuthProfileRuntime()) return;
	const agentDir = resolveRuntimeAuthProfileAgentDir(params.agentDir);
	if (!agentDir) return;
	const requestedStore = loadPersistedAuthProfileStore(agentDir);
	const requestedPath = resolveAuthStorePath(agentDir);
	const mainAgentDir = resolveRuntimeAuthProfileAgentDir();
	if (requestedPath === resolveAuthStorePath(mainAgentDir)) return;
	const mainStore = loadPersistedAuthProfileStore(mainAgentDir);
	const requestedProfile = requestedStore?.profiles[params.profileId];
	if (requestedProfile) return shouldUseMainOwnerForLocalOAuthCredential({
		local: requestedProfile,
		main: mainStore?.profiles[params.profileId]
	}) ? void 0 : agentDir;
	return mainStore?.profiles[params.profileId] ? void 0 : agentDir;
}
/** Load the store shape used when applying local-only auth updates. */
function ensureAuthProfileStoreForLocalUpdate(agentDir) {
	if (isEnvOnlyAuthProfileRuntime()) return createEmptyAuthProfileStore();
	const effectiveAgentDir = resolveRuntimeAuthProfileAgentDir(agentDir);
	const store = loadAuthProfileStoreForAgent(effectiveAgentDir, { syncExternalCli: false });
	const authPath = resolveAuthStorePath(effectiveAgentDir);
	const mainAuthPath = resolveAuthStorePath(resolveRuntimeAuthProfileAgentDir());
	if (!effectiveAgentDir || authPath === mainAuthPath) return store;
	return mergeAuthProfileStores(loadAuthProfileStoreForAgent(void 0, {
		readOnly: true,
		syncExternalCli: false
	}), store, { preserveBaseRuntimeExternalProfiles: true });
}
/** Return the current runtime auth-profile snapshot for an agent dir. */
function getRuntimeAuthProfileStoreSnapshot(agentDir) {
	return getRuntimeAuthProfileStoreSnapshot$1(agentDir);
}
/** Replace runtime auth-profile snapshots, used by tests and prepared runtimes. */
function replaceRuntimeAuthProfileStoreSnapshots(entries) {
	replaceRuntimeAuthProfileStoreSnapshots$1(entries);
}
/** Clear all runtime auth-profile snapshots. */
function clearRuntimeAuthProfileStoreSnapshots() {
	clearRuntimeAuthProfileStoreSnapshots$1();
}
/** Clear one runtime auth-profile snapshot. */
function clearRuntimeAuthProfileStoreSnapshot(agentDir) {
	return clearRuntimeAuthProfileStoreSnapshot$1(agentDir);
}
function saveAuthProfileStoreInTransaction(store, agentDir, options, database, publishFromSuppliedStore = false) {
	const savedAuthPath = resolveAuthStorePath(agentDir);
	const mainAuthPath = resolveAuthStorePath();
	const savesMainStore = savedAuthPath === mainAuthPath;
	const localStore = buildLocalAuthProfileStoreForSave({
		store,
		agentDir,
		options
	});
	const existingRaw = readPersistedAuthProfileStoreRaw(agentDir, database);
	const payload = preserveLegacyOAuthRefsOnSave({
		payload: buildPersistedAuthProfileSecretsStore(localStore),
		existingRaw
	});
	const existingProfiles = isRecord(existingRaw) && isRecord(existingRaw.profiles) ? existingRaw.profiles : {};
	const changedProfileIds = [.../* @__PURE__ */ new Set([...Object.keys(existingProfiles), ...Object.keys(payload.profiles)])].filter((profileId) => !isDeepStrictEqual(existingProfiles[profileId], payload.profiles[profileId]));
	const profileSetChanged = changedProfileIds.some((profileId) => Object.hasOwn(existingProfiles, profileId) !== Object.hasOwn(payload.profiles, profileId));
	const credentialsChanged = !isDeepStrictEqual(existingRaw, payload);
	const statePayload = buildPersistedAuthProfileState(localStore);
	const stateChanged = !isDeepStrictEqual(readPersistedAuthProfileStateRaw(agentDir, database), statePayload);
	const suppliedRuntimeStore = publishFromSuppliedStore ? markRuntimePersistedProfiles(buildRuntimeAuthProfileStoreForSave({
		store,
		agentDir,
		options
	}), localStore) : void 0;
	if (credentialsChanged) writePersistedAuthProfileStoreRaw(payload, agentDir, database);
	if (stateChanged) writePersistedAuthProfileStateRaw(statePayload, agentDir, database);
	const publishRuntimeSnapshots = () => {
		const derivedSnapshots = savesMainStore ? listRuntimeAuthProfileStoreSnapshots().filter((entry) => resolveAuthStorePath(entry.agentDir) !== mainAuthPath) : [];
		if (credentialsChanged || stateChanged) noteRuntimeAuthProfileStorePersistedMutation(agentDir, {
			credentialsChanged,
			profileSetChanged,
			stateChanged,
			profileIds: changedProfileIds
		});
		if (suppliedRuntimeStore) {
			const existing = getRuntimeAuthProfileStoreSnapshot(agentDir);
			if (existing) setRuntimeAuthProfileStoreSnapshot(mergeRuntimeExternalProfileReferences({
				next: preserveResolvedSecretBackedCredentials({
					next: suppliedRuntimeStore,
					existing
				}),
				existing
			}), agentDir);
			if (savesMainStore && (credentialsChanged || stateChanged)) for (const derived of derivedSnapshots) setRuntimeAuthProfileStoreSnapshot(mergeRuntimeExternalProfileReferences({
				next: preserveResolvedSecretBackedCredentials({
					next: loadAuthProfileStoreWithoutExternalProfiles(derived.agentDir),
					existing: derived.store
				}),
				existing: derived.store
			}), derived.agentDir);
			return;
		}
		refreshRuntimeAuthProfileStoreSnapshot(agentDir);
		for (const derived of derivedSnapshots) setRuntimeAuthProfileStoreSnapshot(mergeRuntimeExternalProfileReferences({
			next: preserveResolvedSecretBackedCredentials({
				next: loadAuthProfileStoreWithoutExternalProfiles(derived.agentDir),
				existing: derived.store
			}),
			existing: derived.store
		}), derived.agentDir);
	};
	return publishRuntimeSnapshots;
}
/** Save the auth profile store plus sidecar state, preserving runtime overlay metadata. */
function saveAuthProfileStore(store, agentDir, options, database) {
	const effectiveAgentDir = resolveRuntimeAuthProfileAgentDir(agentDir);
	if (database) {
		const publishRuntimeSnapshots = saveAuthProfileStoreInTransaction(store, effectiveAgentDir, options, database, true);
		const publishAfterCommit = () => {
			publishRuntimeSnapshotsAfterCommit(publishRuntimeSnapshots);
		};
		if (!deferOpenClawAgentPostCommitPublication(database, publishAfterCommit)) publishAfterCommit();
		return;
	}
	let publishRuntimeSnapshots;
	runAuthProfileWriteTransaction(effectiveAgentDir, (transactionDatabase) => {
		publishRuntimeSnapshots = saveAuthProfileStoreInTransaction(store, effectiveAgentDir, options, transactionDatabase);
	});
	publishRuntimeSnapshotsAfterCommit(publishRuntimeSnapshots);
}
function captureRuntimeAuthProfileStorePersistenceSnapshot(agentDir) {
	const capturedAuthPath = resolveAuthStorePath(agentDir);
	const mainAuthPath = resolveAuthStorePath(void 0);
	return {
		runtimeCaptured: true,
		runtimeRevision: getRuntimeAuthProfileStoreSnapshotRevision(agentDir),
		runtimeStore: getRuntimeAuthProfileStoreSnapshot(agentDir),
		derivedRuntimeStores: capturedAuthPath === mainAuthPath ? listRuntimeAuthProfileStoreSnapshots().filter((entry) => resolveAuthStorePath(entry.agentDir) !== mainAuthPath).map(({ agentDir: derivedAgentDir, store }) => ({
			agentDir: derivedAgentDir,
			store,
			runtimeRevision: getRuntimeAuthProfileStoreSnapshotRevision(derivedAgentDir)
		})) : []
	};
}
function recordRuntimeAuthProfileStoreOwnership(owned, runtime) {
	owned.runtimeCaptured = runtime.runtimeCaptured;
	if (runtime.runtimeRevision !== void 0) owned.runtimeRevision = runtime.runtimeRevision;
	if (runtime.runtimeStore !== void 0) owned.runtimeStore = runtime.runtimeStore;
	if (runtime.derivedRuntimeStores !== void 0) owned.derivedRuntimeStores = runtime.derivedRuntimeStores;
}
function recordRuntimeAuthProfileStorePublicationEdge(owned, runtime) {
	if (runtime.runtimeRevision !== void 0) owned.runtimeRevisionBeforePublication = runtime.runtimeRevision;
	if (runtime.derivedRuntimeStores !== void 0) owned.derivedRuntimeRevisionsBeforePublication = runtime.derivedRuntimeStores.flatMap((entry) => typeof entry.runtimeRevision === "number" ? [{
		agentDir: entry.agentDir,
		runtimeRevision: entry.runtimeRevision
	}] : []);
}
function replaceRuntimeAuthProfileStoreSnapshot(store, agentDir) {
	if (store) {
		setRuntimeAuthProfileStoreSnapshot(store, agentDir);
		return;
	}
	const replacedAuthPath = resolveAuthStorePath(agentDir);
	replaceRuntimeAuthProfileStoreSnapshots$1(listRuntimeAuthProfileStoreSnapshots().filter((entry) => resolveAuthStorePath(entry.agentDir) !== replacedAuthPath));
}
function refreshRuntimeAuthProfileStoreSnapshot(agentDir) {
	const existing = getRuntimeAuthProfileStoreSnapshot(agentDir);
	if (!existing) return;
	rebuildRuntimeAuthProfileStoreSnapshot(agentDir, existing);
}
function rebuildRuntimeAuthProfileStoreSnapshot(agentDir, existing, predecessor) {
	const currentMaterialized = preserveResolvedSecretBackedCredentials({
		next: loadAuthProfileStoreWithoutExternalProfiles(agentDir),
		existing
	});
	setRuntimeAuthProfileStoreSnapshot(mergeRuntimeExternalProfileReferences({
		next: predecessor ? preserveResolvedSecretBackedCredentials({
			next: currentMaterialized,
			existing: predecessor
		}) : currentMaterialized,
		existing
	}), agentDir);
}
/** Capture both persisted auth rows under one database lock. */
function captureAuthProfileStorePersistenceSnapshot(agentDir) {
	const effectiveAgentDir = resolveRuntimeAuthProfileAgentDir(agentDir);
	return runAuthProfileWriteTransaction(effectiveAgentDir, (database) => {
		return {
			credentialsRaw: readPersistedAuthProfileStoreRaw(effectiveAgentDir, database),
			stateRaw: readPersistedAuthProfileStateRaw(effectiveAgentDir, database),
			...captureRuntimeAuthProfileStorePersistenceSnapshot(effectiveAgentDir)
		};
	});
}
/**
* Commit only while both persisted auth rows still match the captured baseline.
* The caller claims `owned` before publishing because publication is fallible.
*/
function saveAuthProfileStoreIfPersistenceSnapshotMatches(params) {
	const agentDir = resolveRuntimeAuthProfileAgentDir(params.agentDir);
	let publishRuntimeSnapshots;
	const owned = {
		credentialsRaw: null,
		stateRaw: null,
		runtimeCaptured: false
	};
	runAuthProfileWriteTransaction(agentDir, (database) => {
		const currentCredentials = readPersistedAuthProfileStoreRaw(agentDir, database);
		const currentState = readPersistedAuthProfileStateRaw(agentDir, database);
		if (!isDeepStrictEqual(currentCredentials, params.snapshot.credentialsRaw) || !isDeepStrictEqual(currentState, params.snapshot.stateRaw)) throw new Error("auth profile store changed after secrets apply captured it");
		const runtimeAtSaveEdge = captureRuntimeAuthProfileStorePersistenceSnapshot(agentDir);
		owned.runtimeRevisionAtSaveEdge = runtimeAtSaveEdge.runtimeRevision;
		owned.derivedRuntimeRevisionsAtSaveEdge = runtimeAtSaveEdge.derivedRuntimeStores?.flatMap((entry) => typeof entry.runtimeRevision === "number" ? [{
			agentDir: entry.agentDir,
			runtimeRevision: entry.runtimeRevision
		}] : []);
		publishRuntimeSnapshots = saveAuthProfileStoreInTransaction(params.store, agentDir, params.options, database);
		owned.credentialsRaw = readPersistedAuthProfileStoreRaw(agentDir, database);
		owned.stateRaw = readPersistedAuthProfileStateRaw(agentDir, database);
	});
	return {
		owned,
		publishRuntimeSnapshots: () => publishRuntimeSnapshotsAfterCommit(() => {
			recordRuntimeAuthProfileStorePublicationEdge(owned, captureRuntimeAuthProfileStorePersistenceSnapshot(agentDir));
			publishRuntimeSnapshots?.();
			recordRuntimeAuthProfileStoreOwnership(owned, captureRuntimeAuthProfileStorePersistenceSnapshot(params.agentDir));
		})
	};
}
function reconcileRuntimeAuthProfileStorePersistenceSnapshot(params) {
	if (!params.snapshot.runtimeCaptured || !params.owned.runtimeCaptured) return;
	const rowsFullyOwned = params.credentialsOwned && params.stateOwned;
	const rowsRestored = params.credentialsRestored || params.stateRestored;
	const reconcileOne = (agentDir, snapshotStore, snapshotRuntimeRevision, runtimeRevisionAtSaveEdge, runtimeRevisionBeforePublication, ownedStore, ownedRuntimeRevision, currentStore, currentRuntimeRevision) => {
		if (rowsFullyOwned && typeof snapshotRuntimeRevision === "number" && typeof runtimeRevisionAtSaveEdge === "number" && typeof runtimeRevisionBeforePublication === "number" && typeof ownedRuntimeRevision === "number" && snapshotRuntimeRevision === runtimeRevisionAtSaveEdge && runtimeRevisionAtSaveEdge === runtimeRevisionBeforePublication && currentRuntimeRevision === ownedRuntimeRevision && isDeepStrictEqual(currentStore, ownedStore)) replaceRuntimeAuthProfileStoreSnapshot(snapshotStore, agentDir);
		else if (rowsRestored && currentStore) rebuildRuntimeAuthProfileStoreSnapshot(agentDir, currentStore, snapshotStore);
	};
	const restoredAuthPath = resolveAuthStorePath(params.agentDir);
	const mainAuthPath = resolveAuthStorePath(void 0);
	const currentRuntimeStores = new Map(params.currentRuntimeStores.map((entry) => [resolveAuthStorePath(entry.agentDir), entry]));
	reconcileOne(params.agentDir, params.snapshot.runtimeStore, params.snapshot.runtimeRevision, params.owned.runtimeRevisionAtSaveEdge, params.owned.runtimeRevisionBeforePublication, params.owned.runtimeStore, params.owned.runtimeRevision, currentRuntimeStores.get(restoredAuthPath)?.store, params.currentRuntimeRevision);
	if (restoredAuthPath !== mainAuthPath) return;
	const snapshotDerived = new Map((params.snapshot.derivedRuntimeStores ?? []).map((entry) => [resolveAuthStorePath(entry.agentDir), entry]));
	const ownedDerived = new Map((params.owned.derivedRuntimeStores ?? []).map((entry) => [resolveAuthStorePath(entry.agentDir), entry]));
	const saveEdgeDerivedRevisions = new Map((params.owned.derivedRuntimeRevisionsAtSaveEdge ?? []).map((entry) => [resolveAuthStorePath(entry.agentDir), entry.runtimeRevision]));
	const publicationEdgeDerivedRevisions = new Map((params.owned.derivedRuntimeRevisionsBeforePublication ?? []).map((entry) => [resolveAuthStorePath(entry.agentDir), entry.runtimeRevision]));
	for (const [pathname, currentEntry] of currentRuntimeStores) {
		if (pathname === mainAuthPath) continue;
		const snapshotEntry = snapshotDerived.get(pathname);
		const ownedEntry = ownedDerived.get(pathname);
		reconcileOne(currentEntry.agentDir, snapshotEntry?.store, snapshotEntry?.runtimeRevision, saveEdgeDerivedRevisions.get(pathname), publicationEdgeDerivedRevisions.get(pathname), ownedEntry?.store, ownedEntry?.runtimeRevision, currentEntry.store, currentEntry.runtimeRevision);
	}
}
/** Restore each persisted row and runtime snapshot only while apply still owns it. */
function restoreAuthProfileStorePersistenceSnapshot(snapshot, owned, agentDir) {
	let credentialsOwned = false;
	let stateOwned = false;
	let credentialsRestored = false;
	let stateRestored = false;
	let publishRuntimeSnapshots;
	runAuthProfileWriteTransaction(agentDir, (database) => {
		const existingRaw = readPersistedAuthProfileStoreRaw(agentDir, database);
		const existingState = readPersistedAuthProfileStateRaw(agentDir, database);
		credentialsOwned = isDeepStrictEqual(existingRaw, owned.credentialsRaw);
		stateOwned = isDeepStrictEqual(existingState, owned.stateRaw);
		const beforeProfiles = isRecord(existingRaw) && isRecord(existingRaw.profiles) ? existingRaw.profiles : {};
		const restoredProfiles = isRecord(snapshot.credentialsRaw) && isRecord(snapshot.credentialsRaw.profiles) ? snapshot.credentialsRaw.profiles : {};
		const changedProfileIds = [.../* @__PURE__ */ new Set([...Object.keys(beforeProfiles), ...Object.keys(restoredProfiles)])].filter((profileId) => !isDeepStrictEqual(beforeProfiles[profileId], restoredProfiles[profileId]));
		const profileSetChanged = changedProfileIds.some((profileId) => Object.hasOwn(beforeProfiles, profileId) !== Object.hasOwn(restoredProfiles, profileId));
		credentialsRestored = credentialsOwned && !isDeepStrictEqual(existingRaw, snapshot.credentialsRaw);
		stateRestored = stateOwned && !isDeepStrictEqual(existingState, snapshot.stateRaw);
		if (credentialsRestored) if (snapshot.credentialsRaw === null) deletePersistedAuthProfileStoreRaw(agentDir, database);
		else writePersistedAuthProfileStoreRaw(snapshot.credentialsRaw, agentDir, database);
		if (stateRestored) writePersistedAuthProfileStateRaw(snapshot.stateRaw, agentDir, database);
		publishRuntimeSnapshots = () => {
			const currentRuntimeStores = listRuntimeAuthProfileStoreSnapshots().map(({ agentDir: runtimeAgentDir, store }) => ({
				agentDir: runtimeAgentDir,
				store,
				runtimeRevision: getRuntimeAuthProfileStoreSnapshotRevision(runtimeAgentDir)
			}));
			const currentRuntimeRevision = getRuntimeAuthProfileStoreSnapshotRevision(agentDir);
			if (credentialsRestored || stateRestored) noteRuntimeAuthProfileStorePersistedMutation(agentDir, {
				credentialsChanged: credentialsRestored,
				profileSetChanged: credentialsRestored && profileSetChanged,
				stateChanged: stateRestored,
				profileIds: credentialsRestored ? changedProfileIds : []
			});
			reconcileRuntimeAuthProfileStorePersistenceSnapshot({
				snapshot,
				owned,
				agentDir,
				credentialsOwned,
				stateOwned,
				credentialsRestored,
				stateRestored,
				currentRuntimeStores,
				currentRuntimeRevision
			});
		};
	});
	publishRuntimeSnapshotsAfterCommit(publishRuntimeSnapshots);
}
//#endregion
export { withEnvOnlyAuthProfileStore as S, restoreAuthProfileStorePersistenceSnapshot as _, ensureAuthProfileStoreForLocalUpdate as a, updateAuthProfileStoreWithLock as b, getRuntimeAuthProfileStoreSnapshot as c, loadAuthProfileStoreForRuntime as d, loadAuthProfileStoreForSecretsRuntime as f, resolveRuntimeAuthProfileAgentDir as g, resolvePersistedAuthProfileOwnerAgentDir as h, ensureAuthProfileStore as i, isInheritedMainOAuthCredential as l, replaceRuntimeAuthProfileStoreSnapshots as m, clearRuntimeAuthProfileStoreSnapshot as n, ensureAuthProfileStoreWithoutExternalProfiles as o, loadAuthProfileStoreWithoutExternalProfiles as p, clearRuntimeAuthProfileStoreSnapshots as r, findPersistedAuthProfileCredential as s, captureAuthProfileStorePersistenceSnapshot as t, loadAuthProfileStore as u, saveAuthProfileStore as v, withAuthProfileStoreAgentDir as x, saveAuthProfileStoreIfPersistenceSnapshotMatches as y };
