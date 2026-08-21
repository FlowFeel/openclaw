import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-DW4mBlAt.js";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { t as isIncognitoSessionKey } from "./incognito-session-key-BwpD1Lwd.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { r as getRuntimeConfig } from "./io-BsQc3Kgy.js";
import { c as runSqliteDeferredTransactionSync, h as getNodeSqliteKysely, m as executeSqliteQueryTakeFirstSync, p as executeSqliteQuerySync } from "./node-sqlite-B_0DgpUE.js";
import { v as normalizeOptionalAgentRuntimeId } from "./openai-routing-Db2edxk0.js";
import { h as openOpenClawAgentDatabase, rt as resolveIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db-DemdumbZ.js";
import { r as resolveAgentMainSessionKey } from "./main-session-Bjm_i_Af.js";
import { n as resolveSessionStoreAgentId, r as resolveSessionStoreKey } from "./session-store-key-DmGCpash.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { C as resolveProjectionExistingEntry, D as forkSqliteSessionTranscriptFromParent, E as forkSqliteSessionEntryFromParentTarget, L as applySqliteSessionEntryLifecycleMutation, O as resolveSqliteSessionParentForkDecision, _ as forkSqliteSessionAtMessage, _t as updateSqliteSessionLastRoute, at as loadExactSqliteSessionEntry, b as rewindSqliteSessionToMessage, d as trimSqliteTranscriptForManualCompact, et as listSqliteSessionEntries, ft as recordSqliteInboundSessionMeta, g as rememberCommittedSqliteTranscriptMessageSequences, h as readCommittedSqliteTranscriptMessageSequence, ht as resolveSqliteSessionEntry, i as appendSqliteTranscriptEvent, it as listSqliteSessionTranscriptInstances, lt as patchSqliteSessionEntry, nt as listSqliteSessionEntriesReadOnly, o as appendSqliteTranscriptMessage, ot as loadExactSqliteSessionEntryReadOnly, pt as replaceSqliteSessionEntry, r as appendSqliteExpectedSessionTranscriptTurn, st as loadSqliteSessionEntry, tt as listSqliteSessionEntriesByStatus, v as listSqliteSessionBranches, x as switchSqliteSessionBranch, y as resolveSessionTranscriptActiveLeafEntryId$1, yt as resolveSessionStorePathForScope } from "./session-accessor.sqlite-CtCo5VZ6.js";
import { U as canonicalSessionKeyMigrationRequiredError, s as resolveAllAgentSessionStoreTargetsSync } from "./targets-Bz-meSET.js";
import { a as normalizeStoreSessionKey, s as resolveSessionStoreEntry } from "./store-entry-DWPp52Lz.js";
import { p as toDatabaseOptions, u as resolveSqliteTranscriptReadScope } from "./session-accessor.sqlite-scope-G-CS03gJ.js";
import { C as selectSessionTranscriptTreePathNodes, b as scanSessionTranscriptTree } from "./session-transcript-index-NEbbnqMc.js";
import { g as findSqliteTranscriptEvent, l as redactTranscriptMessageForStorage, p as createSessionTranscriptHeader, y as loadSqliteTranscriptEvents } from "./session-accessor.sqlite-transcript-store-BCfOcQgE.js";
import { Ot as projectSessionStoreForPersistence, t as normalizeSessionEntrySlotKey } from "./session-entry-slot-keys-DPRQmSpa.js";
import { t as emitSessionTranscriptUpdate } from "./transcript-events-BG9Ai61T.js";
import { r as startSessionTranscriptIndexReconcile } from "./session-transcript-reconcile-Ba-ULxeh.js";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { AsyncLocalStorage } from "node:async_hooks";
import { sql } from "kysely";
//#region src/config/sessions/session-history.ts
/** Lists entries selected by the indexed normalized session status. */
function listSessionEntriesByStatus(scope, statuses) {
	return listSqliteSessionEntriesByStatus(scope, statuses);
}
/** Lists every retained transcript instance, including prior ids for rotated logical sessions. */
function listSessionTranscriptInstances(scope = {}) {
	return listSqliteSessionTranscriptInstances(scope);
}
//#endregion
//#region src/config/sessions/plugin-host-cleanup.ts
/** Shared predicates and mutations for plugin host-owned session-state cleanup. */
function collectStoredSessionEntrySlotKeys(entry, pluginId) {
	const slotKeys = /* @__PURE__ */ new Set();
	const storedSlotKeys = entry.pluginExtensionSlotKeys;
	if (!storedSlotKeys) return slotKeys;
	const records = pluginId === void 0 ? Object.values(storedSlotKeys) : storedSlotKeys[pluginId] ? [storedSlotKeys[pluginId]] : [];
	for (const record of records) for (const slotKey of Object.values(record)) {
		const normalized = normalizeSessionEntrySlotKey(slotKey);
		if (normalized.ok) slotKeys.add(normalized.key);
	}
	return slotKeys;
}
function collectPromotedSessionEntrySlotKeys(entry, pluginId, sessionEntrySlotKeys) {
	const slotKeys = collectStoredSessionEntrySlotKeys(entry, pluginId);
	for (const slotKey of sessionEntrySlotKeys ?? []) slotKeys.add(slotKey);
	return slotKeys;
}
function clearPromotedSessionEntrySlots(entry, pluginId, sessionEntrySlotKeys, options = {}) {
	const slotKeys = options.includeStoredSlotKeys === false && sessionEntrySlotKeys ? new Set(sessionEntrySlotKeys) : collectPromotedSessionEntrySlotKeys(entry, pluginId, sessionEntrySlotKeys);
	const entryRecord = entry;
	for (const slotKey of slotKeys) delete entryRecord[slotKey];
	if (!options.pruneSlotOwnership || !entry.pluginExtensionSlotKeys) return;
	const pruneRecord = (record) => {
		for (const [namespace, slotKey] of Object.entries(record)) {
			const normalized = normalizeSessionEntrySlotKey(slotKey);
			if (normalized.ok && slotKeys.has(normalized.key)) delete record[namespace];
		}
	};
	if (pluginId) {
		const record = entry.pluginExtensionSlotKeys[pluginId];
		if (record) {
			pruneRecord(record);
			if (Object.keys(record).length === 0) delete entry.pluginExtensionSlotKeys[pluginId];
		}
	} else {
		for (const record of Object.values(entry.pluginExtensionSlotKeys)) pruneRecord(record);
		for (const [ownerPluginId, record] of Object.entries(entry.pluginExtensionSlotKeys)) if (Object.keys(record).length === 0) delete entry.pluginExtensionSlotKeys[ownerPluginId];
	}
	if (Object.keys(entry.pluginExtensionSlotKeys).length === 0) delete entry.pluginExtensionSlotKeys;
}
/** Clears plugin-owned extension state from one session entry. */
function clearPluginOwnedSessionState(entry, pluginId, sessionEntrySlotKeys) {
	clearPromotedSessionEntrySlots(entry, pluginId, sessionEntrySlotKeys);
	if (!pluginId) {
		delete entry.pluginExtensions;
		delete entry.pluginExtensionSlotKeys;
		delete entry.pluginNextTurnInjections;
		return;
	}
	if (entry.pluginExtensions) {
		delete entry.pluginExtensions[pluginId];
		if (Object.keys(entry.pluginExtensions).length === 0) delete entry.pluginExtensions;
	}
	if (entry.pluginExtensionSlotKeys) {
		delete entry.pluginExtensionSlotKeys[pluginId];
		if (Object.keys(entry.pluginExtensionSlotKeys).length === 0) delete entry.pluginExtensionSlotKeys;
	}
	if (entry.pluginNextTurnInjections) {
		delete entry.pluginNextTurnInjections[pluginId];
		if (Object.keys(entry.pluginNextTurnInjections).length === 0) delete entry.pluginNextTurnInjections;
	}
}
function hasPromotedSessionEntrySlot(entry, pluginId, sessionEntrySlotKeys) {
	const slotKeys = collectPromotedSessionEntrySlotKeys(entry, pluginId, sessionEntrySlotKeys);
	if (slotKeys.size === 0) return false;
	const entryRecord = entry;
	for (const slotKey of slotKeys) if (Object.hasOwn(entryRecord, slotKey)) return true;
	return false;
}
function hasPluginOwnedSessionState(entry, pluginId, sessionEntrySlotKeys) {
	if (hasPromotedSessionEntrySlot(entry, pluginId, sessionEntrySlotKeys)) return true;
	if (!pluginId) return Boolean(entry.pluginExtensions || entry.pluginExtensionSlotKeys || entry.pluginNextTurnInjections);
	return Boolean(entry.pluginExtensions?.[pluginId] || entry.pluginExtensionSlotKeys?.[pluginId] || entry.pluginNextTurnInjections?.[pluginId]);
}
function matchesPluginHostCleanupSession(entryKey, entry, sessionKey) {
	const normalizedSessionKey = normalizeLowercaseStringOrEmpty(sessionKey);
	if (!normalizedSessionKey) return true;
	return normalizeLowercaseStringOrEmpty(entryKey) === normalizedSessionKey || normalizeLowercaseStringOrEmpty(entry.sessionId) === normalizedSessionKey;
}
function shouldSkipPluginHostCleanupStore(params) {
	if (!params.pluginId && !params.sessionKey) return true;
	return params.mode === "promoted-slots" && (params.sessionEntrySlotKeys?.size ?? 0) === 0;
}
function hasPluginHostCleanupTarget(entry, params) {
	if (params.mode === "promoted-slots") return hasPromotedSessionEntrySlot(entry, params.pluginId, params.sessionEntrySlotKeys);
	return hasPluginOwnedSessionState(entry, params.pluginId, params.sessionEntrySlotKeys);
}
function isLockedHarnessSessionOwnedByPlugin(entry, preserveLockedHarnessIds) {
	if (entry.modelSelectionLocked !== true || !preserveLockedHarnessIds?.size) return false;
	const harnessId = normalizeOptionalAgentRuntimeId(entry.agentHarnessId);
	return harnessId !== void 0 && preserveLockedHarnessIds.has(harnessId);
}
function clearPluginHostCleanupTarget(entry, params) {
	if (params.mode === "promoted-slots") {
		clearPromotedSessionEntrySlots(entry, params.pluginId, params.sessionEntrySlotKeys, {
			includeStoredSlotKeys: false,
			pruneSlotOwnership: true
		});
		return;
	}
	clearPluginOwnedSessionState(entry, params.pluginId, params.sessionEntrySlotKeys);
}
//#endregion
//#region src/config/sessions/session-accessor.entry.ts
/** Keeps legacy store-key alias resolution behind the entry owner boundary. */
function resolveSessionEntryFromStore(params) {
	return resolveSessionStoreEntry(params);
}
/** Resolves a session directly through canonical SQLite row and alias ownership. */
function resolveSessionEntrySelection(scope, options = {}) {
	return resolveSqliteSessionEntry(scope, options);
}
function resolveAccessStorePath(scope) {
	return resolveSessionStorePathForScope(scope);
}
function isStorePathTemplate(store) {
	return typeof store === "string" && store.includes("{agentId}");
}
function resolveLogicalSessionStoreCandidates(params) {
	const storeConfig = params.cfg.session?.store;
	const defaultTarget = {
		agentId: params.agentId,
		storePath: resolveStorePath(storeConfig, {
			agentId: params.agentId,
			env: params.env
		})
	};
	if (!isStorePathTemplate(storeConfig)) return [defaultTarget];
	const targets = /* @__PURE__ */ new Map();
	targets.set(defaultTarget.storePath, defaultTarget);
	for (const target of resolveAllAgentSessionStoreTargetsSync(params.cfg, { env: params.env })) if (target.agentId === params.agentId) targets.set(target.storePath, target);
	return [...targets.values()];
}
function buildLogicalSessionEntryCandidateKeys(params) {
	const targets = /* @__PURE__ */ new Set();
	if (params.canonicalKey) targets.add(params.canonicalKey);
	if (params.requestedKey && params.requestedKey !== params.canonicalKey) targets.add(params.requestedKey);
	if (params.canonicalKey === "global" || params.canonicalKey === "unknown") return [...targets];
	const agentMainKey = resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: params.agentId
	});
	if (params.canonicalKey === agentMainKey) targets.add(`agent:${params.agentId}:main`);
	return [...targets];
}
function findCanonicalSessionEntryMatch(scope, canonicalKey, candidateKeys, options = {}) {
	let selected;
	for (const candidate of candidateKeys) {
		const trimmed = candidate.trim();
		if (!trimmed) continue;
		const match = (options.readOnly === false ? loadExactSqliteSessionEntry : loadExactSqliteSessionEntryReadOnly)({
			...scope,
			sessionKey: trimmed
		});
		if (!match) continue;
		if (selected) throw canonicalSessionKeyMigrationRequiredError(`duplicate rows resolve to canonical session key ${canonicalKey}`);
		if (match.sessionKey !== canonicalKey) throw canonicalSessionKeyMigrationRequiredError(`non-canonical persisted row resolves to session key ${canonicalKey}`);
		selected = match;
	}
	return selected;
}
/** Resolves one canonical row across the prepared configured and discovered store targets. */
function resolveSessionEntryAccessTarget(scope) {
	const target = resolveSessionEntryStoreTarget(scope);
	return {
		agentId: target.agentId,
		canonicalKey: target.canonicalKey,
		entry: target.entry,
		requestedKey: target.requestedKey,
		storeKey: target.storeKey
	};
}
/** Resolves ordered candidate keys inside one agent-owned session store. */
function resolveSessionEntryCandidateTarget(scope) {
	const candidateKeys = uniqueStrings(scope.candidateKeys.map((key) => key.trim()));
	const incognitoKey = candidateKeys.find(isIncognitoSessionKey);
	const incognitoAgentId = incognitoKey ? resolveAgentIdFromSessionKey(incognitoKey) : void 0;
	const storePath = incognitoAgentId ? resolveIncognitoOpenClawAgentSqlitePath({
		agentId: incognitoAgentId,
		env: scope.env
	}) : resolveStorePath(scope.cfg.session?.store, {
		agentId: scope.agentId,
		env: scope.env
	});
	const resolvedAgentId = incognitoAgentId ?? scope.agentId;
	for (const candidateKey of candidateKeys) {
		if (!candidateKey) continue;
		const resolved = resolveSessionEntrySelection({
			agentId: resolvedAgentId,
			...scope.env ? { env: scope.env } : {},
			sessionKey: candidateKey,
			storePath
		}, { readOnly: !incognitoAgentId });
		if (!resolved.existing) continue;
		return {
			agentId: resolvedAgentId,
			candidateKey,
			entry: structuredClone(resolved.existing),
			persisted: true,
			sessionKey: resolved.normalizedKey
		};
	}
	const fallbackKey = scope.fallback?.sessionKey.trim();
	if (!fallbackKey || !scope.fallback) return null;
	return {
		agentId: resolvedAgentId,
		candidateKey: fallbackKey,
		entry: structuredClone(scope.fallback.entry),
		persisted: false,
		sessionKey: fallbackKey
	};
}
function resolveSessionEntryStoreTarget(scope) {
	const requestedKey = scope.sessionKey.trim();
	const canonicalKey = resolveSessionStoreKey({
		cfg: scope.cfg,
		sessionKey: requestedKey
	});
	const agentId = resolveSessionStoreAgentId(scope.cfg, canonicalKey);
	const scanTargets = buildLogicalSessionEntryCandidateKeys({
		agentId,
		canonicalKey,
		cfg: scope.cfg,
		requestedKey
	});
	if (isIncognitoSessionKey(canonicalKey)) {
		const incognitoAgentId = resolveAgentIdFromSessionKey(canonicalKey);
		const storePath = resolveIncognitoOpenClawAgentSqlitePath({
			agentId: incognitoAgentId,
			env: scope.env
		});
		const selectedMatch = findCanonicalSessionEntryMatch({
			agentId: incognitoAgentId,
			...scope.env ? { env: scope.env } : {},
			storePath
		}, canonicalKey, scanTargets, { readOnly: false });
		return {
			agentId: incognitoAgentId,
			canonicalKey,
			entry: selectedMatch?.entry,
			requestedKey,
			storeKey: selectedMatch?.sessionKey ?? canonicalKey,
			storePath
		};
	}
	const candidates = resolveLogicalSessionStoreCandidates({
		agentId,
		cfg: scope.cfg,
		env: scope.env
	});
	const fallback = candidates[0] ?? {
		agentId,
		storePath: resolveStorePath(scope.cfg.session?.store, {
			agentId,
			env: scope.env
		})
	};
	let selectedStorePath = fallback.storePath;
	let selectedMatch = findCanonicalSessionEntryMatch({
		agentId,
		...scope.env ? { env: scope.env } : {},
		storePath: fallback.storePath
	}, canonicalKey, scanTargets);
	for (let index = 1; index < candidates.length; index += 1) {
		const candidate = candidates[index];
		if (!candidate) continue;
		const match = findCanonicalSessionEntryMatch({
			agentId,
			...scope.env ? { env: scope.env } : {},
			storePath: candidate.storePath
		}, canonicalKey, scanTargets);
		if (match && selectedMatch) throw canonicalSessionKeyMigrationRequiredError(`duplicate rows resolve to canonical session key ${canonicalKey}`);
		if (match) {
			selectedStorePath = candidate.storePath;
			selectedMatch = match;
		}
	}
	return {
		agentId,
		canonicalKey,
		entry: selectedMatch?.entry,
		requestedKey,
		storeKey: selectedMatch?.sessionKey ?? canonicalKey,
		storePath: selectedStorePath
	};
}
/**
* Mutates the canonical logical session entry without exposing the
* backing store map to callers.
*/
async function updateResolvedSessionEntry(scope, update) {
	const target = resolveSessionEntryStoreTarget(scope);
	if (!target.entry) return {
		canonicalKey: target.canonicalKey,
		found: false
	};
	let updateResult;
	const updated = await patchSqliteSessionEntry({
		sessionKey: target.storeKey,
		storePath: target.storePath
	}, async (entry) => {
		updateResult = await update(entry, {
			agentId: target.agentId,
			canonicalKey: target.canonicalKey,
			entry,
			requestedKey: target.requestedKey,
			storeKey: target.storeKey
		});
		return entry;
	}, {
		replaceEntry: true,
		skipMaintenance: true
	});
	if (!updated) return {
		canonicalKey: target.canonicalKey,
		found: false
	};
	return {
		canonicalKey: target.canonicalKey,
		entry: structuredClone(updated),
		found: true,
		result: updateResult,
		storeKey: target.storeKey
	};
}
/** Lists entries from the resolved store, preserving the persisted key for each row. */
function listSessionEntries(scope = {}) {
	if (scope.clone === false) return openSessionEntryReadView(scope).entries();
	return listSqliteSessionEntries(scope);
}
/**
* Borrowed keyed view over one resolved store for synchronous read-only hot paths.
* Unlike loadSessionEntry, `get` is a raw exact persisted-key probe with no alias
* or canonical-key resolution. The first probe materializes one validated store
* snapshot; later probes and `entries` reuse its parsed rows. Rows are borrowed,
* not cloned: callers must not mutate them and must drop the view before any await.
*/
function openSessionEntryReadView(scope = {}) {
	return {
		get: (sessionKey) => (isIncognitoSessionKey(sessionKey) ? loadExactSqliteSessionEntry : loadExactSqliteSessionEntryReadOnly)({
			...scope,
			clone: false,
			sessionKey
		})?.entry,
		entries: () => listSqliteSessionEntries({
			...scope,
			clone: false
		})
	};
}
/**
* Applies an atomic patch and returns the persisted key selected by the backing
* store. Use when a caller must keep sidecar state keyed to the final row.
*/
async function patchSessionEntryWithKey(scope, update, options = {}) {
	const entry = await patchSqliteSessionEntry(scope, update, options);
	return entry ? {
		sessionKey: normalizeStoreSessionKey(scope.sessionKey),
		entry
	} : null;
}
/**
* Copies one parent transcript into a new child transcript target.
* This is for guarded callers that already own the eventual entry commit.
*/
//#endregion
//#region src/config/sessions/session-accessor.lifecycle.ts
function findSessionCompactionCheckpoint(params) {
	const checkpointId = params.checkpointId.trim();
	if (!checkpointId || !Array.isArray(params.entry.compactionCheckpoints)) return;
	let newest;
	for (const checkpoint of params.entry.compactionCheckpoints) {
		if (checkpoint.checkpointId !== checkpointId) continue;
		if (!newest || checkpoint.createdAt > newest.createdAt) newest = checkpoint;
	}
	return newest;
}
async function applySessionCompactionCheckpointMutation(params) {
	const currentEntry = loadSqliteSessionEntry({
		sessionKey: params.readKey,
		storePath: params.storePath
	});
	if (!currentEntry?.sessionId) return { status: "missing-session" };
	if (currentEntry.modelSelectionLocked === true) return { status: "model-selection-locked" };
	const checkpoint = findSessionCompactionCheckpoint({
		entry: currentEntry,
		checkpointId: params.checkpointId
	});
	if (!checkpoint) return { status: "missing-checkpoint" };
	const forkedSession = await params.forkTranscriptFromCheckpoint(checkpoint);
	if (forkedSession.status !== "created") return forkedSession;
	const nextEntry = await params.buildEntry({
		checkpoint,
		currentEntry,
		forkedTranscript: forkedSession.transcript
	});
	await replaceSqliteSessionEntry({
		sessionKey: params.writeKey,
		storePath: params.storePath
	}, nextEntry);
	return {
		status: "created",
		key: params.writeKey,
		checkpoint,
		entry: nextEntry
	};
}
/**
* Forks checkpoint transcript content and persists a new branch entry in one
* storage-sized mutation. SQLite adapters implement the transcript row copy
* and `session_nodes.entry_json` insert inside the same write transaction.
*/
async function branchSessionFromCompactionCheckpoint(params) {
	return await applySessionCompactionCheckpointMutation({
		buildEntry: params.buildEntry,
		checkpointId: params.checkpointId,
		forkTranscriptFromCheckpoint: params.forkTranscriptFromCheckpoint,
		readKey: params.sourceStoreKey ?? params.sourceKey,
		storePath: params.storePath,
		writeKey: params.nextKey
	});
}
/**
* Forks checkpoint transcript content and replaces the current entry in one
* storage-sized mutation. SQLite adapters implement the transcript row copy
* and `session_nodes.entry_json` update inside the same write transaction.
*/
async function restoreSessionFromCompactionCheckpoint(params) {
	return await applySessionCompactionCheckpointMutation({
		buildEntry: params.buildEntry,
		checkpointId: params.checkpointId,
		forkTranscriptFromCheckpoint: params.forkTranscriptFromCheckpoint,
		readKey: params.sessionStoreKey ?? params.sessionKey,
		storePath: params.storePath,
		writeKey: params.sessionKey
	});
}
/**
* Applies a session patch projection through the accessor boundary.
* The resolver sees a read-only snapshot and names the persisted key set; the
* projector returns one replacement entry without receiving the mutable store.
*/
async function applySessionPatchProjection(params) {
	const entries = listSessionEntries({
		agentId: params.agentId,
		storePath: params.storePath
	}).map(({ sessionKey, entry }) => ({
		entry: structuredClone(entry),
		sessionKey
	}));
	const target = params.resolveTarget({ entries });
	const existingEntry = resolveProjectionExistingEntry(entries, target);
	const projected = await params.project({
		...target,
		entries,
		...existingEntry ? { existingEntry } : {}
	});
	if (!projected.ok) return projected;
	const candidateKeys = uniqueStrings((target.candidateKeys ?? [target.primaryKey]).map((key) => key.trim()).filter(Boolean));
	await applySqliteSessionEntryLifecycleMutation({
		agentId: params.agentId,
		storePath: params.storePath,
		removals: candidateKeys.filter((sessionKey) => sessionKey !== target.primaryKey).map((sessionKey) => ({ sessionKey })),
		upserts: [{
			sessionKey: target.primaryKey,
			buildEntry: () => {
				params.assertCurrent?.();
				return projected.entry;
			}
		}],
		skipMaintenance: true
	});
	return {
		...projected,
		entry: structuredClone(projected.entry)
	};
}
/**
* Runs an operation while preserving one temporary session mapping.
* The storage backend snapshots exactly the named key before the operation and
* restores that entry, or deletes it when it did not previously exist, after
* the operation finishes. SQLite backends can implement the same named
* preservation lifecycle without exposing mutable store access to callers.
*/
async function preserveTemporarySessionMapping(scope, operation) {
	const snapshot = snapshotTemporarySessionMapping(scope);
	let operationResult;
	try {
		operationResult = {
			ok: true,
			result: await operation()
		};
	} catch (err) {
		operationResult = {
			error: err,
			ok: false
		};
	}
	const restoreFailure = await restoreTemporarySessionMapping(snapshot);
	if (!operationResult.ok) throw operationResult.error;
	return {
		result: operationResult.result,
		...snapshot.canRestore ? {} : { snapshotFailure: snapshot.snapshotFailure },
		...restoreFailure ? { restoreFailure } : {}
	};
}
/**
* Clears plugin host-owned state inside one resolved session store.
* This is an internal transaction-sized boundary for the storage backend, not
* a Plugin SDK API.
*/
async function cleanupPluginHostSessionStore(params) {
	if (shouldSkipPluginHostCleanupStore(params) || params.shouldCleanup && !params.shouldCleanup()) return 0;
	const now = Date.now();
	let cleared = 0;
	for (const { entry, sessionKey } of listSessionEntries({
		agentId: params.agentId,
		storePath: params.storePath
	})) {
		if (isLockedHarnessSessionOwnedByPlugin(entry, params.preserveLockedHarnessIds)) continue;
		if (!matchesPluginHostCleanupSession(sessionKey, entry, params.sessionKey) || !hasPluginHostCleanupTarget(entry, params)) continue;
		if (await patchSqliteSessionEntry({
			agentId: params.agentId,
			sessionKey,
			storePath: params.storePath
		}, (currentEntry) => {
			if (isLockedHarnessSessionOwnedByPlugin(currentEntry, params.preserveLockedHarnessIds)) return null;
			if (!hasPluginHostCleanupTarget(currentEntry, params)) return null;
			clearPluginHostCleanupTarget(currentEntry, params);
			currentEntry.updatedAt = now;
			return currentEntry;
		}, {
			replaceEntry: true,
			skipMaintenance: true
		})) cleared += 1;
	}
	return cleared;
}
function snapshotTemporarySessionMapping(scope) {
	const storePath = resolveAccessStorePath(scope);
	try {
		const exact = loadExactSqliteSessionEntry({
			...scope,
			storePath
		});
		return {
			canRestore: true,
			...exact ? {
				entry: structuredClone(exact.entry),
				hadEntry: true
			} : { hadEntry: false },
			sessionKey: scope.sessionKey,
			storePath
		};
	} catch (err) {
		return {
			canRestore: false,
			sessionKey: scope.sessionKey,
			snapshotFailure: formatErrorMessage(err),
			storePath
		};
	}
}
async function restoreTemporarySessionMapping(snapshot) {
	if (!snapshot.canRestore) return;
	try {
		if (snapshot.hadEntry) await replaceSqliteSessionEntry({
			sessionKey: snapshot.sessionKey,
			storePath: snapshot.storePath
		}, structuredClone(snapshot.entry));
		else await applySqliteSessionEntryLifecycleMutation({
			storePath: snapshot.storePath,
			removals: [{ sessionKey: snapshot.sessionKey }],
			activeSessionKey: snapshot.sessionKey,
			skipMaintenance: true
		});
		return;
	} catch (err) {
		return formatErrorMessage(err);
	}
}
//#endregion
//#region src/config/sessions/session-accessor.entry-mutation.ts
function projectSessionEntryForPersistenceRevision(params) {
	const snapshot = params.entry.skillsSnapshot;
	const stripped = snapshot?.resolvedSkills === void 0 ? params.entry : {
		...params.entry,
		skillsSnapshot: (({ resolvedSkills: _drop, ...rest }) => rest)(snapshot)
	};
	return projectSessionStoreForPersistence({
		storePath: params.storePath,
		store: { entry: stripped }
	}).store.entry ?? stripped;
}
async function forkSessionFromParentTranscript(params) {
	return await forkSqliteSessionTranscriptFromParent(params);
}
/**
* Forks parent transcript content and persists the child entry/alias cleanup in
* one storage-owned operation.
*/
async function forkSessionEntryFromParentTarget(params) {
	return await forkSqliteSessionEntryFromParentTarget(params);
}
/** Resolves whether a parent session is small enough to fork through the active store. */
async function resolveSessionParentForkDecision(params) {
	return await resolveSqliteSessionParentForkDecision(params);
}
/**
* Creates or updates one session entry and initializes its transcript header as
* one SQLite-backed lifecycle operation. Callers do not compose row creation,
* transcript initialization, rollback, and normalized session identity.
*/
async function createSessionEntryWithTranscript(scope, createEntry, options = {}) {
	const storePath = resolveAccessStorePath(scope);
	const agentId = scope.agentId ?? resolveAgentIdFromSessionKey(scope.sessionKey);
	const store = Object.fromEntries(listSessionEntries({
		agentId,
		storePath
	}).map(({ sessionKey, entry }) => [sessionKey, entry]));
	const resolved = resolveSessionEntryFromStore({
		store,
		sessionKey: scope.sessionKey
	});
	const created = await createEntry({
		existingEntry: resolved.existing ? { ...resolved.existing } : void 0,
		sessionEntries: cloneSessionEntries(store)
	});
	if (!created.ok) return {
		ok: false,
		error: created.error,
		phase: "entry"
	};
	try {
		await appendSqliteTranscriptEvent({
			agentId,
			sessionId: created.entry.sessionId,
			sessionKey: resolved.normalizedKey,
			storePath
		}, createSessionTranscriptHeader({
			cwd: options.cwd,
			sessionId: created.entry.sessionId
		}));
	} catch (err) {
		return {
			ok: false,
			error: formatErrorMessage(err),
			phase: "transcript"
		};
	}
	const entry = created.entry;
	await applySqliteSessionEntryLifecycleMutation({
		agentId,
		storePath,
		removals: resolved.legacyKeys.map((sessionKey) => ({ sessionKey })),
		upserts: [{
			sessionKey: resolved.normalizedKey,
			entry
		}],
		skipMaintenance: true
	});
	return {
		ok: true,
		entry,
		sessionFile: resolved.normalizedKey
	};
}
function cloneSessionEntries(store) {
	return Object.fromEntries(Object.entries(store).map(([sessionKey, entry]) => [sessionKey, { ...entry }]));
}
function collectSessionEntryKeys(...entries) {
	const keys = /* @__PURE__ */ new Set();
	for (const entry of entries) for (const key of Object.keys(entry)) keys.add(key);
	return [...keys];
}
function sessionEntryFieldEqual(left, right) {
	return Object.is(left, right) || isDeepStrictEqual(left, right);
}
function sessionEntryFieldUnset(hasValue, value) {
	return !hasValue || value === void 0;
}
function sessionEntryFieldUnchanged(params) {
	const { leftHasValue, leftValue, rightHasValue, rightValue } = params;
	if (sessionEntryFieldUnset(leftHasValue, leftValue) && sessionEntryFieldUnset(rightHasValue, rightValue)) return true;
	return leftHasValue === rightHasValue && sessionEntryFieldEqual(leftValue, rightValue);
}
function mergeConcurrentReplySessionMetadata(params) {
	const { currentEntry, preparedEntry, snapshotEntry } = params;
	if (!snapshotEntry || preparedEntry.sessionId !== snapshotEntry.sessionId) return preparedEntry;
	const merged = { ...preparedEntry };
	const mergedFields = merged;
	for (const key of collectSessionEntryKeys(currentEntry, preparedEntry, snapshotEntry)) {
		const currentHasValue = Object.hasOwn(currentEntry, key);
		const snapshotHasValue = Object.hasOwn(snapshotEntry, key);
		const preparedHasValue = Object.hasOwn(preparedEntry, key);
		const currentValue = currentEntry[key];
		const snapshotValue = snapshotEntry[key];
		const preparedValue = preparedEntry[key];
		const currentChanged = !sessionEntryFieldUnchanged({
			leftHasValue: currentHasValue,
			leftValue: currentValue,
			rightHasValue: snapshotHasValue,
			rightValue: snapshotValue
		});
		const preparedKeptSnapshot = sessionEntryFieldUnchanged({
			leftHasValue: preparedHasValue,
			leftValue: preparedValue,
			rightHasValue: snapshotHasValue,
			rightValue: snapshotValue
		});
		if (currentChanged && preparedKeptSnapshot) if (currentHasValue) mergedFields[key] = currentValue;
		else delete mergedFields[key];
	}
	return merged;
}
function createReplySessionInitializationRevision(params) {
	const { entry, storePath } = params;
	if (!entry) return JSON.stringify(null);
	const projected = projectSessionEntryForPersistenceRevision({
		storePath,
		entry
	});
	return JSON.stringify({ sessionId: projected.sessionId });
}
function resolveInitializedReplySessionEntry(params) {
	return params.sessionEntry;
}
/** Updates an existing entry only; returns null when the session is absent. */
async function updateSessionEntry(scope, update, options = {}) {
	return await patchSqliteSessionEntry(scope, update, options);
}
/**
* Records stable conversation metadata derived from one inbound message as a
* single storage-sized upsert (createIfMissing by default). Inbound metadata
* must not refresh activity timestamps — idle reset relies on updatedAt from
* real session turns — so existing rows merge with preserve-activity
* semantics while legacy alias keys collapse onto the canonical row.
*/
async function recordInboundSessionMeta(params) {
	return await recordSqliteInboundSessionMeta(params);
}
/**
* Persists the last known delivery route for one session as a single
* storage-sized patch. Route updates preserve activity timestamps (#49515)
* and merge explicit route/delivery input over the persisted session
* fallback before normalizing the derived last* fields.
*/
async function updateSessionLastRoute(params) {
	return await updateSqliteSessionLastRoute(params);
}
/** Resolves one abort target identity without exposing the mutable store. */
function resolveSessionAbortTarget(scope) {
	const entry = loadSqliteSessionEntry(scope);
	if (!entry) return null;
	return {
		entry: { ...entry },
		sessionId: entry.sessionId,
		sessionKey: normalizeStoreSessionKey(scope.sessionKey)
	};
}
/**
* Resolves, marks, touches, and canonicalizes one abort target entry as a
* storage-sized operation. Runtime abort side effects remain with callers.
*/
async function markSessionAbortTarget(params) {
	let resolvedTarget = null;
	try {
		const sessionKey = normalizeStoreSessionKey(params.scope.sessionKey);
		const updated = await patchSqliteSessionEntry(params.scope, (currentEntry) => {
			resolvedTarget = {
				entry: { ...currentEntry },
				persisted: false,
				sessionId: currentEntry.sessionId,
				sessionKey
			};
			const entry = {
				...currentEntry,
				abortedLastRun: true,
				updatedAt: params.now?.() ?? Date.now()
			};
			applySessionAbortCutoff(entry, params.resolveAbortCutoff?.({
				entry: { ...currentEntry },
				sessionKey
			}));
			return entry;
		}, {
			replaceEntry: true,
			skipMaintenance: true
		});
		return updated ? {
			entry: { ...updated },
			persisted: true,
			sessionId: updated.sessionId,
			sessionKey
		} : null;
	} catch (error) {
		const fallbackTarget = resolvedTarget;
		if (fallbackTarget) return {
			entry: fallbackTarget.entry,
			persisted: fallbackTarget.persisted,
			sessionId: fallbackTarget.sessionId,
			sessionKey: fallbackTarget.sessionKey,
			persistenceError: formatErrorMessage(error)
		};
		throw error;
	}
}
function applySessionAbortCutoff(entry, cutoff) {
	entry.abortCutoffMessageSid = cutoff?.messageSid;
	entry.abortCutoffTimestamp = cutoff?.timestamp;
}
//#endregion
//#region src/config/sessions/session-accessor.message-cut.ts
async function listSessionBranches(params) {
	return await listSqliteSessionBranches(params);
}
function resolveSessionTranscriptActiveLeafEntryId(events) {
	return resolveSessionTranscriptActiveLeafEntryId$1(events);
}
async function rewindSessionToMessage(params) {
	return await rewindSqliteSessionToMessage(params);
}
async function forkSessionAtMessage(params) {
	return await forkSqliteSessionAtMessage(params);
}
async function switchSessionBranch(params) {
	return await switchSqliteSessionBranch(params);
}
//#endregion
//#region src/config/sessions/session-accessor.reset.ts
var SessionInitializationAgentScopeMismatchError = class extends Error {
	constructor(agentId, sessionKeyAgentId) {
		super(`Session initialization agent scope mismatch: explicit agent "${agentId}" does not match session key agent "${sessionKeyAgentId}".`);
		this.agentId = agentId;
		this.sessionKeyAgentId = sessionKeyAgentId;
		this.code = "SESSION_INITIALIZATION_AGENT_SCOPE_MISMATCH";
		this.name = "SessionInitializationAgentScopeMismatchError";
	}
};
function assertSessionInitializationAgentScope(agentId, sessionKey) {
	const normalizedAgentId = normalizeAgentId(agentId);
	const sessionKeyAgentId = parseAgentSessionKey(sessionKey)?.agentId;
	if (sessionKeyAgentId && normalizeAgentId(sessionKeyAgentId) !== normalizedAgentId) throw new SessionInitializationAgentScopeMismatchError(normalizedAgentId, sessionKeyAgentId);
}
const loadSessionArchiveRuntime = createLazyRuntimeModule(() => import("./session-archive.runtime.js"));
/**
* Persists runner reset metadata after the caller appends the in-log boundary.
*/
async function persistSessionResetLifecycle(params) {
	await applySqliteSessionEntryLifecycleMutation({
		agentId: params.agentId,
		activeSessionKey: params.sessionKey,
		storePath: params.storePath,
		upserts: [{
			sessionKey: params.sessionKey,
			entry: params.nextEntry,
			resetBoundaryReason: "reset"
		}],
		skipMaintenance: true
	});
	return { replayedMessages: 0 };
}
/** Loads the reply-session initialization rows without exposing a mutable store. */
function loadReplySessionInitializationSnapshot(params) {
	assertSessionInitializationAgentScope(params.agentId, params.sessionKey);
	const storePath = resolveSessionStorePathForScope(params);
	const store = Object.fromEntries(listSqliteSessionEntriesReadOnly({
		agentId: params.agentId,
		storePath
	}).map(({ sessionKey, entry }) => [sessionKey, entry]));
	const resolved = resolveSessionEntryFromStore({
		store,
		sessionKey: params.sessionKey
	});
	const currentEntry = resolved.existing ? { ...resolved.existing } : void 0;
	const entries = cloneSessionEntries(store);
	return {
		...currentEntry ? { currentEntry } : {},
		readEntry: (sessionKey) => {
			const entry = resolveSessionEntryFromStore({
				store: entries,
				sessionKey
			}).existing;
			return entry ? { ...entry } : void 0;
		},
		revision: createReplySessionInitializationRevision({
			entry: currentEntry,
			storePath
		})
	};
}
/**
* Persists one reply-session initialization result and archives the previous
* transcript after metadata commits. SQLite adapters map the guarded write to a
* transaction and keep archive failure warning-only, matching file storage.
*/
async function commitReplySessionInitialization(params) {
	assertSessionInitializationAgentScope(params.agentId, params.sessionKey);
	const storePath = resolveSessionStorePathForScope({
		sessionKey: params.sessionKey,
		storePath: params.storePath
	});
	const store = Object.fromEntries(listSessionEntries({
		agentId: params.agentId,
		storePath
	}).map(({ sessionKey, entry }) => [sessionKey, entry]));
	const resolved = resolveSessionEntryFromStore({
		store,
		sessionKey: params.sessionKey
	});
	const currentEntry = resolved.existing ? { ...resolved.existing } : void 0;
	const revision = createReplySessionInitializationRevision({
		entry: currentEntry,
		storePath
	});
	if (revision !== params.expectedRevision) return {
		ok: false,
		...currentEntry ? { currentEntry } : {},
		reason: "stale-snapshot",
		revision
	};
	const readEntry = (sessionKey) => {
		const entry = resolveSessionEntryFromStore({
			store,
			sessionKey
		}).existing;
		return entry ? { ...entry } : void 0;
	};
	const preparedSessionEntry = params.prepareSessionEntry ? await params.prepareSessionEntry({
		...currentEntry ? { currentEntry } : {},
		readEntry,
		sessionEntry: params.sessionEntry
	}) : params.sessionEntry;
	const sessionEntry = resolveInitializedReplySessionEntry({
		agentId: params.agentId,
		...currentEntry ? { currentEntry } : {},
		sessionEntry: preparedSessionEntry,
		storePath
	});
	let staleCommit;
	let committedSessionEntry = sessionEntry;
	let beforeEntryMutationDone = false;
	const upserts = [{
		sessionKey: resolved.normalizedKey,
		...params.resetBoundaryReason ? { resetBoundaryReason: params.resetBoundaryReason } : {},
		buildEntry: async ({ store: currentStore }) => {
			const commitEntry = resolveSessionEntryFromStore({
				store: currentStore,
				sessionKey: params.sessionKey
			}).existing;
			const commitRevision = createReplySessionInitializationRevision({
				entry: commitEntry,
				storePath
			});
			if (commitRevision !== params.expectedRevision) {
				staleCommit = {
					...commitEntry ? { currentEntry: { ...commitEntry } } : {},
					revision: commitRevision
				};
				return null;
			}
			committedSessionEntry = commitEntry ? mergeConcurrentReplySessionMetadata({
				currentEntry: commitEntry,
				preparedEntry: sessionEntry,
				snapshotEntry: params.snapshotEntry ?? params.previousEntry
			}) : sessionEntry;
			if (!beforeEntryMutationDone) {
				await params.beforeEntryMutation?.({
					...commitEntry ? { currentEntry: { ...commitEntry } } : {},
					sessionEntry: committedSessionEntry
				});
				beforeEntryMutationDone = true;
			}
			return committedSessionEntry;
		}
	}];
	if (params.retiredEntry) {
		const retiredEntry = params.retiredEntry;
		upserts.push({
			sessionKey: retiredEntry.key,
			buildEntry: () => staleCommit ? null : retiredEntry.entry
		});
	}
	await applySqliteSessionEntryLifecycleMutation({
		activeSessionKey: params.activeSessionKey,
		agentId: params.agentId,
		maintenanceOverride: params.maintenanceConfig,
		storePath,
		upserts
	});
	if (staleCommit) return {
		ok: false,
		...staleCommit.currentEntry ? { currentEntry: staleCommit.currentEntry } : {},
		reason: "stale-snapshot",
		revision: staleCommit.revision
	};
	store[resolved.normalizedKey] = committedSessionEntry;
	if (params.retiredEntry) store[params.retiredEntry.key] = params.retiredEntry.entry;
	const committed = {
		ok: true,
		previousSessionTranscript: {},
		sessionEntry: { ...committedSessionEntry },
		sessionStoreView: cloneSessionEntries(store)
	};
	const previousSessionTranscript = isIncognitoSessionKey(params.sessionKey) || params.previousEntry?.incognito === true ? {} : params.archivePreviousTranscript === false ? {} : await archivePreviousSessionTranscript({
		agentId: params.agentId,
		onArchiveError: params.onArchiveError,
		previousEntry: params.previousEntry,
		storePath: params.storePath
	});
	return {
		...committed,
		previousSessionTranscript
	};
}
async function archivePreviousSessionTranscript(params) {
	if (!params.previousEntry?.sessionId) return {};
	const { archiveSessionTranscriptsDetailed, resolveStableSessionEndTranscript } = await loadSessionArchiveRuntime();
	const archivedTranscripts = archiveSessionTranscriptsDetailed({
		sessionId: params.previousEntry.sessionId,
		storePath: params.storePath,
		agentId: params.agentId,
		reason: "reset",
		onArchiveError: params.onArchiveError
	});
	return resolveStableSessionEndTranscript({
		sessionId: params.previousEntry.sessionId,
		storePath: params.storePath,
		agentId: params.agentId,
		archivedTranscripts
	});
}
//#endregion
//#region src/config/sessions/session-accessor.transcript.ts
/** Keeps transcript event delivery behind the transcript owner boundary. */
function emitTranscriptUpdate(update) {
	emitSessionTranscriptUpdate(update);
}
/**
* Finds the newest transcript record accepted by the matcher. Reads rows
* newest-first with early exit so hot append-path lookups never parse the
* whole transcript; missing transcripts match nothing. The match is wrapped
* so parsed falsy records stay distinguishable from "no match".
*/
async function findTranscriptEvent(scope, match) {
	return findSqliteTranscriptEvent(scope, match);
}
/**
* Trims a transcript for manual sessions.compact and clears stale token metadata.
* This is one storage-sized mutation: future stores can trim transcript rows and
* update entry metadata inside the same backend transaction.
*/
async function preflightSessionTranscriptForManualCompact(scope, params) {
	const events = await loadSqliteTranscriptEvents(scope).catch(() => []);
	if (events.length === 0) return {
		compacted: false,
		reason: "no transcript"
	};
	const maxLines = Math.max(1, Math.floor(params.maxLines));
	return events.length > maxLines ? { compacted: true } : {
		compacted: false,
		kept: events.length
	};
}
async function trimSessionTranscriptForManualCompact(scope, params) {
	const maxLines = Math.max(1, Math.floor(params.maxLines));
	const maxTailLines = Math.max(0, maxLines - 1);
	let declined = {
		compacted: false,
		reason: "no transcript"
	};
	const trimmed = await trimSqliteTranscriptForManualCompact(scope, (lines) => {
		if (lines.length === 0) {
			declined = {
				compacted: false,
				reason: "no transcript"
			};
			return null;
		}
		if (lines.length <= maxLines) {
			declined = {
				compacted: false,
				kept: lines.length
			};
			return null;
		}
		const tailLines = lines.slice(1);
		const retainedLines = normalizeManualCompactTranscriptLines(lines[0], maxTailLines > 0 ? tailLines.slice(-maxTailLines) : []);
		if (!retainedLines) {
			declined = {
				compacted: false,
				kept: 0
			};
			return null;
		}
		return retainedLines;
	}, params.nowMs === void 0 ? {} : { nowMs: params.nowMs });
	if (!trimmed.trimmed) return declined;
	return {
		archived: trimmed.archivedPath,
		compacted: true,
		kept: trimmed.kept
	};
}
function parseManualCompactTranscriptRecord(line) {
	try {
		const parsed = JSON.parse(line);
		return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
	} catch {
		return null;
	}
}
function normalizeManualCompactTranscriptLines(headerLine, tailLines) {
	if (!headerLine) return null;
	const header = parseManualCompactTranscriptRecord(headerLine);
	if (header?.type !== "session" || typeof header.id !== "string") return null;
	const records = tailLines.map(parseManualCompactTranscriptRecord).filter((record) => record !== null);
	const retainedIds = /* @__PURE__ */ new Set();
	const transparentParents = /* @__PURE__ */ new Map();
	const normalizedRecords = [];
	for (const record of records) {
		let parentId = record.parentId;
		const seenTransparentParents = /* @__PURE__ */ new Set();
		while (typeof parentId === "string" && transparentParents.has(parentId) && !seenTransparentParents.has(parentId)) {
			seenTransparentParents.add(parentId);
			parentId = transparentParents.get(parentId) ?? null;
		}
		let next = typeof parentId === "string" && !retainedIds.has(parentId) ? {
			...record,
			parentId: null
		} : parentId !== record.parentId ? {
			...record,
			parentId
		} : record;
		if (next.type === "leaf") {
			const targetId = next.targetId;
			const validTargetId = targetId === null || typeof targetId === "string" && targetId.trim().length > 0;
			if (!validTargetId && typeof next.id === "string") transparentParents.set(next.id, next.parentId === null || typeof next.parentId === "string" ? next.parentId : null);
			if (typeof targetId === "string" && targetId.trim() && !retainedIds.has(targetId)) next = {
				...next,
				targetId: null,
				appendParentId: null
			};
			else if (validTargetId && typeof next.appendParentId === "string" && !retainedIds.has(next.appendParentId)) next = {
				...next,
				appendParentId: targetId
			};
		}
		if ((next.type === "compaction" || next.type === "reset") && typeof next.id === "string") {
			const firstKeptEntryId = next.firstKeptEntryId;
			if (typeof firstKeptEntryId === "string" && firstKeptEntryId !== next.id) {
				const branchPath = selectSessionTranscriptTreePathNodes(scanSessionTranscriptTree([...normalizedRecords, next]), next.id);
				if (!branchPath.some((node) => node.id === firstKeptEntryId)) next = {
					...next,
					firstKeptEntryId: branchPath[0]?.id ?? next.id
				};
			}
		}
		normalizedRecords.push(next);
		if (typeof next.id === "string" && next.id.trim()) retainedIds.add(next.id);
	}
	return [JSON.stringify(header), ...normalizedRecords.map((record) => JSON.stringify(record))];
}
//#endregion
//#region src/config/sessions/transcript-write-context.ts
const ownedTranscriptWriteContext = new AsyncLocalStorage();
function normalizeConcretePathForCompare(value) {
	const trimmed = value?.trim();
	if (!trimmed || !path.isAbsolute(trimmed) || !trimmed.endsWith(".jsonl")) return;
	return path.resolve(trimmed);
}
function contextMatches(params) {
	const normalizeTarget = (target) => {
		const agentId = target?.agentId?.trim();
		const sessionId = target?.sessionId?.trim();
		const sessionKey = target?.sessionKey?.trim();
		const storePath = target?.storePath?.trim();
		return sessionKey && storePath ? {
			agentId,
			sessionId,
			sessionKey,
			storePath: path.resolve(storePath)
		} : void 0;
	};
	const contextTarget = normalizeTarget(params.context.sessionTarget);
	const requestedTarget = normalizeTarget(params.sessionTarget);
	if (params.context.sessionTarget || params.sessionTarget) return Boolean(contextTarget && requestedTarget && contextTarget.sessionKey === requestedTarget.sessionKey && contextTarget.storePath === requestedTarget.storePath && (!contextTarget.agentId || !requestedTarget.agentId || contextTarget.agentId === requestedTarget.agentId) && (!contextTarget.sessionId || !requestedTarget.sessionId || contextTarget.sessionId === requestedTarget.sessionId));
	const contextSessionFile = normalizeConcretePathForCompare(params.context.sessionFile);
	const sessionFile = normalizeConcretePathForCompare(params.sessionFile);
	if (contextSessionFile && sessionFile) return contextSessionFile === sessionFile;
	const contextSessionKey = params.context.sessionKey?.trim();
	const sessionKey = params.sessionKey?.trim();
	return Boolean(contextSessionKey && sessionKey && contextSessionKey === sessionKey);
}
/** Runs transcript writes with an owned write-lock context. */
async function withOwnedSessionTranscriptWrites(context, run) {
	return await ownedTranscriptWriteContext.run(context, run);
}
/** Runs detached work without retaining an attempt-owned transcript lock. */
function runWithoutOwnedSessionTranscriptWrites(run) {
	return ownedTranscriptWriteContext.exit(run);
}
function bindOwnedSessionTranscriptWrites(context, run) {
	return (...args) => ownedTranscriptWriteContext.run(context, () => run(...args));
}
async function runWithOwnedSessionTranscriptWriteLock(params, run) {
	return await runWithOwnedSessionTranscriptWriteContext(params, run);
}
async function acquireOwnedSessionTranscriptWriteLock(params) {
	const context = ownedTranscriptWriteContext.getStore();
	if (!context || !contextMatches({
		context,
		...params
	})) return;
	let markAcquired;
	let rejectAcquire;
	const acquired = new Promise((resolve, reject) => {
		markAcquired = resolve;
		rejectAcquire = reject;
	});
	let releaseOperation;
	const releaseRequested = new Promise((resolve) => {
		releaseOperation = resolve;
	});
	const operation = context.withSessionWriteLock(async () => {
		markAcquired();
		await releaseRequested;
	});
	operation.catch(rejectAcquire);
	await acquired;
	let released = false;
	return { release: async () => {
		if (released) return;
		released = true;
		releaseOperation();
		await operation;
	} };
}
async function runWithOwnedSessionTranscriptWriteContext(params, run, options) {
	const context = ownedTranscriptWriteContext.getStore();
	if (!context || !contextMatches({
		context,
		...params
	})) return await run();
	return await context.withSessionWriteLock(run, options);
}
//#endregion
//#region src/config/sessions/session-accessor.transcript-turn.ts
/** Appends one prepared ordered group in the existing transcript turn transaction. */
async function appendTranscriptMessages(scope, options) {
	if (options.messages.length === 0) return [];
	const expectedSessionId = scope.sessionId?.trim();
	if (!expectedSessionId) throw new Error("Cannot append a transcript batch without an exact session id");
	const turn = await persistExpectedSessionTranscriptTurn(scope, {
		atomicGroup: true,
		config: options.config,
		cwd: options.cwd,
		expectedSessionId,
		messages: options.messages.map((append) => ({
			...append,
			eventId: append.eventId ?? randomUUID(),
			message: redactTranscriptMessageForStorage(append.message, options),
			now: append.now ?? Date.now()
		})),
		updateMode: "none"
	});
	if (turn.rejectedReason) throw new Error("Transcript session changed before batch append");
	return turn.messages;
}
/**
* Persists one logical transcript turn through the SQLite-backed session target.
* Transcript row append(s) and the requested
* updatedAt touch happen before transcript update delivery is published.
*/
async function persistSessionTranscriptTurn(scope, options) {
	const expectedSessionId = options.expectedSessionId;
	if (expectedSessionId) return await persistExpectedSessionTranscriptTurn(scope, {
		...options,
		expectedSessionId
	});
	if (options.sessionLifecyclePatch) throw new Error("Cannot patch session lifecycle without an expected session id");
	const target = await resolveTranscriptTurnTarget(scope, options.config);
	const appendedMessages = await runWithOwnedSessionTranscriptWriteLock({
		sessionFile: target.sessionKey,
		sessionKey: target.sessionKey,
		sessionTarget: target
	}, () => appendTranscriptTurnMessages(target, options));
	const appendedCount = countAppendedTranscriptMessages(appendedMessages);
	const sessionEntry = await touchTranscriptTurnSessionEntry({
		scope,
		target,
		shouldTouch: options.touchSessionEntry === true && appendedCount > 0
	});
	await publishTranscriptTurnUpdate({
		target,
		sessionEntry,
		updateMode: options.updateMode ?? "inline",
		publishWhen: options.publishWhen ?? "when-appended",
		appendedMessages
	});
	return {
		appendedCount,
		messages: appendedMessages,
		sessionEntry
	};
}
async function appendTranscriptTurnMessages(target, options) {
	const selectedMessages = await selectAppendableTranscriptTurnMessages(target, options);
	const appendedMessages = [];
	for (const append of selectedMessages) {
		const { shouldAppend: _shouldAppend, ...appendOptions } = append;
		const result = await appendSqliteTranscriptMessage({
			...target.agentId ? { agentId: target.agentId } : {},
			...target.sessionId ? { sessionId: target.sessionId } : {},
			...target.sessionKey ? { sessionKey: target.sessionKey } : {},
			...target.storePath ? { storePath: target.storePath } : {}
		}, {
			...appendOptions,
			...append.cwd ?? options.cwd ? { cwd: append.cwd ?? options.cwd } : {},
			...append.config ?? options.config ? { config: append.config ?? options.config } : {}
		});
		if (result) appendedMessages.push(result);
	}
	rememberCommittedSqliteTranscriptMessageSequences(target, appendedMessages);
	return appendedMessages;
}
async function selectAppendableTranscriptTurnMessages(target, options) {
	const selectedMessages = [];
	for (const append of options.messages) {
		if (!(append.shouldAppend ? await append.shouldAppend({
			...target.agentId ? { agentId: target.agentId } : {},
			...target.sessionId ? { sessionId: target.sessionId } : {},
			...target.sessionKey ? { sessionKey: target.sessionKey } : {},
			...target.storePath ? { storePath: target.storePath } : {}
		}) : true)) continue;
		selectedMessages.push(append);
	}
	return selectedMessages;
}
function countAppendedTranscriptMessages(messages) {
	return messages.filter((message) => message.appended).length;
}
async function persistExpectedSessionTranscriptTurn(scope, options) {
	const sessionKey = scope.sessionKey?.trim();
	if (!scope.storePath || !sessionKey) throw new Error("Cannot guard a transcript turn without a session store and key");
	const storePath = scope.storePath;
	const expectedSessionId = options.expectedSessionId;
	const agentId = scope.agentId ?? resolveAgentIdFromSessionKey(sessionKey, resolveDefaultAgentId(options.config ?? getRuntimeConfig()));
	if (!agentId) throw new Error(`Cannot resolve transcript turn without an agent id: ${sessionKey}`);
	const resolved = scope.sessionStore ? resolveSessionEntryFromStore({
		store: scope.sessionStore,
		sessionKey
	}) : resolveSessionEntrySelection({
		agentId,
		...scope.env ? { env: scope.env } : {},
		sessionKey,
		storePath
	});
	const target = {
		agentId,
		sessionId: expectedSessionId,
		sessionKey: resolved.normalizedKey,
		storePath
	};
	const turn = await runWithOwnedSessionTranscriptWriteLock({
		sessionFile: target.sessionKey,
		sessionKey: target.sessionKey,
		sessionTarget: target
	}, () => appendSqliteExpectedSessionTranscriptTurn({
		agentId,
		sessionKey: resolved.normalizedKey,
		sessionId: expectedSessionId,
		storePath
	}, {
		config: options.config,
		cwd: options.cwd,
		expectedLifecycleRevision: options.expectedLifecycleRevision,
		expectedSessionState: options.expectedSessionState,
		expectedSessionId,
		atomicGroup: options.atomicGroup,
		messages: options.messages,
		sessionLifecyclePatch: options.sessionLifecyclePatch,
		sessionFile: target.sessionKey,
		touchSessionEntry: options.touchSessionEntry
	}));
	if (turn.rejectedReason === "session-rebound") return {
		appendedCount: 0,
		messages: [],
		rejectedReason: "session-rebound",
		sessionEntry: turn.sessionEntry
	};
	await publishTranscriptTurnUpdate({
		target,
		sessionEntry: turn.sessionEntry,
		updateMode: options.updateMode ?? "inline",
		publishWhen: options.publishWhen ?? "when-appended",
		appendedMessages: turn.appendedMessages
	});
	if (turn.sessionEntry && scope.sessionStore) scope.sessionStore[resolved.normalizedKey] = turn.sessionEntry;
	return {
		appendedCount: countAppendedTranscriptMessages(turn.appendedMessages),
		messages: turn.appendedMessages,
		sessionEntry: turn.sessionEntry ?? scope.sessionEntry
	};
}
async function resolveTranscriptTurnTarget(scope, config) {
	const sessionKey = scope.sessionKey?.trim();
	if (!sessionKey || !scope.sessionId) throw new Error("Cannot persist a transcript turn without a session key and session id");
	const agentId = scope.agentId ?? resolveAgentIdFromSessionKey(sessionKey, resolveDefaultAgentId(config ?? getRuntimeConfig()));
	if (!agentId) throw new Error(`Cannot resolve transcript turn without an agent id: ${sessionKey}`);
	const storePath = scope.storePath ?? resolveStorePath(getRuntimeConfig().session?.store, {
		agentId,
		env: scope.env
	});
	const resolved = scope.sessionStore ? resolveSessionEntryFromStore({
		store: scope.sessionStore,
		sessionKey
	}) : resolveSessionEntrySelection({
		agentId,
		...scope.env ? { env: scope.env } : {},
		sessionKey,
		storePath
	});
	const sessionEntry = resolved?.existing ?? scope.sessionEntry ?? loadSqliteSessionEntry({
		...scope,
		agentId,
		sessionKey,
		storePath
	});
	return {
		agentId,
		sessionId: scope.sessionId,
		sessionKey: resolved?.normalizedKey ?? sessionKey,
		storePath,
		sessionEntry
	};
}
async function touchTranscriptTurnSessionEntry(params) {
	if (!params.shouldTouch || !params.target.storePath || !params.target.sessionKey || !params.target.sessionId) return params.target.sessionEntry;
	const updatedAt = Date.now();
	const updated = await updateSessionEntry({
		sessionKey: params.target.sessionKey,
		storePath: params.target.storePath,
		...params.target.agentId ? { agentId: params.target.agentId } : {}
	}, (current) => current.sessionId === params.target.sessionId ? { updatedAt: Math.max(current.updatedAt ?? 0, updatedAt) } : null, { skipMaintenance: true });
	if (updated && params.scope.sessionStore) params.scope.sessionStore[params.target.sessionKey] = updated;
	return updated ?? params.target.sessionEntry;
}
async function publishTranscriptTurnUpdate(params) {
	if (params.updateMode === "none") return;
	const appendedMessages = params.appendedMessages.filter((message) => message.appended);
	if (params.publishWhen === "when-appended" && appendedMessages.length === 0) return;
	const target = params.target.agentId && params.target.sessionId && params.target.sessionKey ? {
		agentId: params.target.agentId,
		sessionId: params.target.sessionId,
		sessionKey: params.target.sessionKey,
		...params.target.storePath ? { storePath: params.target.storePath } : {}
	} : void 0;
	const update = {
		...params.target.sessionKey ? { sessionKey: params.target.sessionKey } : {},
		...params.target.agentId ? { agentId: params.target.agentId } : {},
		...target ? { target } : {},
		...params.sessionEntry?.lifecycleRevision ? { lifecycleRevision: params.sessionEntry.lifecycleRevision } : {}
	};
	if (params.updateMode !== "inline" || appendedMessages.length === 0) {
		emitTranscriptUpdate(update);
		return;
	}
	const sequencedMessages = appendedMessages.map((message) => ({
		message,
		messageSeq: readCommittedSqliteTranscriptMessageSequence(message)
	}));
	if (sequencedMessages.length > 1 && sequencedMessages.some(({ messageSeq }) => messageSeq === void 0)) {
		emitTranscriptUpdate(update);
		return;
	}
	for (const { message, messageSeq } of sequencedMessages) emitTranscriptUpdate({
		...update,
		message: message.message,
		messageId: message.messageId,
		...messageSeq !== void 0 ? { messageSeq } : {}
	});
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-reset-window.ts
const resetMessageWindowCache = /* @__PURE__ */ new Map();
const MAX_RESET_MESSAGE_WINDOW_CACHE = 64;
function getResetWindowKysely(database) {
	return getNodeSqliteKysely(database.db);
}
function parseMessageEventRow$1(row) {
	if (row.message_position === null) throw new Error("Active transcript message row is missing its message position");
	return {
		event: JSON.parse(row.event_json),
		seq: row.message_position + 1
	};
}
function readMessageRange(projection, start, endExclusive) {
	if (endExclusive <= start) return [];
	const db = getResetWindowKysely(projection.database);
	return executeSqliteQuerySync(projection.database.db, db.selectFrom("session_transcript_active_events as active").innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "active.session_id").onRef("event.seq", "=", "active.event_seq")).select(["active.message_position", "event.event_json"]).where("active.session_id", "=", projection.resolved.sessionId).where("active.message_position", "is not", null).where("active.message_position", ">=", start).where("active.message_position", "<", endExclusive).orderBy("active.message_position", "asc")).rows.map(parseMessageEventRow$1);
}
function parseTranscriptEventType(eventJson) {
	try {
		const parsed = JSON.parse(eventJson);
		return typeof parsed.type === "string" ? parsed.type : void 0;
	} catch {
		return;
	}
}
function resetMessageWindowCacheKey(projection) {
	return `${projection.database.path}\0${projection.resolved.sessionId}`;
}
function readTranscriptGeneration(projection) {
	return executeSqliteQueryTakeFirstSync(projection.database.db, getResetWindowKysely(projection.database).selectFrom("transcript_rewrite_watermarks").select("generation").where("session_id", "=", projection.resolved.sessionId))?.generation;
}
function cacheResetMessageWindow(key, entry) {
	resetMessageWindowCache.delete(key);
	resetMessageWindowCache.set(key, entry);
	pruneMapToMaxSize(resetMessageWindowCache, MAX_RESET_MESSAGE_WINDOW_CACHE);
}
function findLatestResetMessageWindow(projection, generation) {
	const db = getResetWindowKysely(projection.database);
	const latestBoundaryRow = executeSqliteQuerySync(projection.database.db, db.selectFrom("session_transcript_active_events as active").innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "active.session_id").onRef("event.seq", "=", "active.event_seq")).select(["active.active_position", "event.event_json"]).where("active.session_id", "=", projection.resolved.sessionId).where("active.message_position", "is", null).orderBy("active.active_position", "desc")).rows.find((row) => {
		const type = parseTranscriptEventType(row.event_json);
		return type === "reset" || type === "compaction";
	});
	if (!latestBoundaryRow || parseTranscriptEventType(latestBoundaryRow.event_json) !== "reset") return null;
	const resetRow = latestBoundaryRow;
	const reset = JSON.parse(resetRow.event_json);
	const postBoundaryMessagePosition = executeSqliteQueryTakeFirstSync(projection.database.db, db.selectFrom("session_transcript_active_events").select("message_position").where("session_id", "=", projection.resolved.sessionId).where("active_position", ">", resetRow.active_position).where("message_position", "is not", null).orderBy("active_position", "asc").limit(1))?.message_position ?? projection.state.activeMessageCount;
	let keptMessagePositions = [];
	if (typeof reset.firstKeptEntryId === "string") {
		const firstKept = executeSqliteQueryTakeFirstSync(projection.database.db, db.selectFrom("transcript_event_identities as identity").innerJoin("session_transcript_active_events as active", (join) => join.onRef("active.session_id", "=", "identity.session_id").onRef("active.event_seq", "=", "identity.seq")).select("active.active_position").where("identity.session_id", "=", projection.resolved.sessionId).where("identity.event_id", "=", reset.firstKeptEntryId));
		if (firstKept && firstKept.active_position < resetRow.active_position) keptMessagePositions = executeSqliteQuerySync(projection.database.db, db.selectFrom("session_transcript_active_events as active").innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "active.session_id").onRef("event.seq", "=", "active.event_seq")).select(["active.message_position", "event.event_json"]).where("active.session_id", "=", projection.resolved.sessionId).where("active.active_position", ">=", firstKept.active_position).where("active.active_position", "<", resetRow.active_position).where("active.message_position", "is not", null).orderBy("active.active_position", "asc")).rows.flatMap((row) => {
			if (row.message_position === null) return [];
			try {
				const role = JSON.parse(row.event_json).message?.role;
				return role === "user" || role === "assistant" ? [row.message_position] : [];
			} catch {
				return [];
			}
		});
	}
	return {
		generation,
		indexedSeq: projection.state.indexedSeq,
		keptMessagePositions,
		postBoundaryMessagePosition
	};
}
function resolveResetMessageWindow(projection) {
	const key = resetMessageWindowCacheKey(projection);
	const cached = resetMessageWindowCache.get(key);
	const generation = readTranscriptGeneration(projection);
	if (cached) {
		if (cached.generation === generation && cached.indexedSeq === projection.state.indexedSeq) return cached.window;
	}
	const window = findLatestResetMessageWindow(projection, generation);
	cacheResetMessageWindow(key, {
		generation,
		indexedSeq: projection.state.indexedSeq,
		window
	});
	return window;
}
function resolveVisibleMessagePositions(projection) {
	const window = resolveResetMessageWindow(projection);
	if (!window) return {
		kept: [],
		postStart: 0,
		total: projection.state.activeMessageCount
	};
	return {
		kept: window.keptMessagePositions,
		postStart: window.postBoundaryMessagePosition,
		total: window.keptMessagePositions.length + Math.max(0, projection.state.activeMessageCount - window.postBoundaryMessagePosition)
	};
}
function readVisibleMessageRange(projection, start, endExclusive) {
	if (endExclusive <= start) return [];
	const visible = resolveVisibleMessagePositions(projection);
	const boundedStart = Math.min(Math.max(0, start), visible.total);
	const boundedEnd = Math.min(Math.max(boundedStart, endExclusive), visible.total);
	if (boundedEnd <= boundedStart) return [];
	const keptEnd = Math.min(boundedEnd, visible.kept.length);
	const keptEvents = visible.kept.slice(boundedStart, keptEnd).flatMap((position) => readMessageRange(projection, position, position + 1));
	const postVisibleStart = Math.max(boundedStart, visible.kept.length);
	const postVisibleEnd = Math.max(postVisibleStart, boundedEnd);
	const postEvents = readMessageRange(projection, visible.postStart + postVisibleStart - visible.kept.length, visible.postStart + postVisibleEnd - visible.kept.length);
	return [...keptEvents, ...postEvents];
}
/** Maps a logical visible-message range to its materialized message positions. */
function resolveVisibleMessagePositionRange(projection, start, endExclusive) {
	if (endExclusive <= start) return [];
	const visible = resolveVisibleMessagePositions(projection);
	const boundedStart = Math.min(Math.max(0, start), visible.total);
	const boundedEnd = Math.min(Math.max(boundedStart, endExclusive), visible.total);
	const keptEnd = Math.min(boundedEnd, visible.kept.length);
	const positions = visible.kept.slice(boundedStart, keptEnd);
	const postVisibleStart = Math.max(boundedStart, visible.kept.length);
	const postVisibleEnd = Math.max(postVisibleStart, boundedEnd);
	for (let logical = postVisibleStart; logical < postVisibleEnd; logical += 1) positions.push(visible.postStart + logical - visible.kept.length);
	return positions;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-visible-cursor.ts
const VISIBLE_MESSAGE_CURSOR_VERSION = 1;
const DEFAULT_VISIBLE_MESSAGE_MAX_MESSAGES = 1e3;
const DEFAULT_VISIBLE_MESSAGE_MAX_BYTES = 1e6;
const MAX_VISIBLE_MESSAGE_MAX_MESSAGES = 1e4;
const MAX_VISIBLE_MESSAGE_MAX_BYTES = 64 * 1024 * 1024;
function normalizeVisibleMessageLimit(value, fallback, maximum, name) {
	const resolved = value ?? fallback;
	if (!Number.isInteger(resolved) || resolved < 1 || resolved > maximum) throw new RangeError(`${name} must be an integer between 1 and ${String(maximum)}`);
	return resolved;
}
function encodeVisibleMessageCursor(cursor) {
	return Buffer.from(JSON.stringify(cursor), "utf8").toString("base64url");
}
function createVisibleMessageCursor(params) {
	return {
		...params,
		lastEventSeq: -1,
		lastMessagePosition: -1,
		version: VISIBLE_MESSAGE_CURSOR_VERSION
	};
}
function parseVisibleMessageCursor(value) {
	if (value.length > 4096) return;
	try {
		const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
		if (parsed.version !== VISIBLE_MESSAGE_CURSOR_VERSION || typeof parsed.agentId !== "string" || typeof parsed.sessionId !== "string" || typeof parsed.generation !== "string" || !Number.isSafeInteger(parsed.lastEventSeq) || (parsed.lastEventSeq ?? -2) < -1 || !Number.isSafeInteger(parsed.lastMessagePosition) || (parsed.lastMessagePosition ?? -2) < -1 || parsed.lastEventSeq === -1 !== (parsed.lastMessagePosition === -1)) return;
		return parsed;
	} catch {
		return;
	}
}
//#endregion
//#region src/config/sessions/session-transcript-projection-error.ts
var SessionTranscriptProjectionUnavailableError = class extends Error {
	constructor(sessionId) {
		super(`Session transcript projection is rebuilding: ${sessionId}`);
		this.sessionId = sessionId;
		this.name = "SessionTranscriptProjectionUnavailableError";
	}
};
function isSessionTranscriptProjectionUnavailableError(error) {
	return error instanceof SessionTranscriptProjectionUnavailableError;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-active-events.ts
const EMPTY_PROJECTION_STATE = {
	activeEventCount: 0,
	activeMessageCount: 0,
	indexedSeq: -1,
	leafEventId: null,
	needsRebuild: false
};
function getActiveTranscriptKysely(database) {
	return getNodeSqliteKysely(database.db);
}
function readProjectionSnapshot(database, sessionId) {
	const row = executeSqliteQueryTakeFirstSync(database.db, getActiveTranscriptKysely(database).selectFrom("transcript_events as latest").leftJoin("session_transcript_index_state as state", "state.session_id", "latest.session_id").select([
		"latest.seq as latest_seq",
		"state.active_event_count",
		"state.active_message_count",
		"state.indexed_seq",
		"state.leaf_event_id",
		"state.needs_rebuild"
	]).where("latest.session_id", "=", sessionId).orderBy("latest.seq", "desc").limit(1));
	if (!row) return;
	return {
		latestSeq: row.latest_seq,
		...typeof row.indexed_seq === "number" ? { state: {
			activeEventCount: row.active_event_count ?? 0,
			activeMessageCount: row.active_message_count ?? 0,
			indexedSeq: row.indexed_seq,
			leafEventId: row.leaf_event_id,
			needsRebuild: row.needs_rebuild !== 0
		} } : {}
	};
}
function withCurrentProjectionSnapshot(scope, read) {
	const resolved = resolveSqliteTranscriptReadScope(scope);
	const databaseOptions = toDatabaseOptions(resolved);
	const database = openOpenClawAgentDatabase(databaseOptions);
	const result = runSqliteDeferredTransactionSync(database.db, () => {
		const snapshot = readProjectionSnapshot(database, resolved.sessionId);
		if (!snapshot) return {
			kind: "value",
			value: read({
				database,
				resolved,
				state: EMPTY_PROJECTION_STATE
			})
		};
		if (snapshot.state && !snapshot.state.needsRebuild && snapshot.state.indexedSeq === snapshot.latestSeq) return {
			kind: "value",
			value: read({
				database,
				resolved,
				state: snapshot.state
			})
		};
		return { kind: "unavailable" };
	}, {
		databaseLabel: database.path,
		operationLabel: "sessions.history.read"
	});
	if (result.kind === "value") return result.value;
	startSessionTranscriptIndexReconcile({
		...databaseOptions,
		preferredSessionId: resolved.sessionId
	});
	throw new SessionTranscriptProjectionUnavailableError(resolved.sessionId);
}
function parseMessageEventRow(row) {
	if (row.message_position === null) throw new Error("Active transcript message row is missing its message position");
	return {
		event: JSON.parse(row.event_json),
		seq: row.message_position + 1
	};
}
/** Reads every message event on the active path. Full callers remain intentionally O(output). */
function readSessionTranscriptMessageEvents(scope) {
	return withCurrentProjectionSnapshot(scope, (projection) => {
		return readVisibleMessageRange(projection, 0, resolveVisibleMessagePositions(projection).total);
	});
}
/** Reads the projected active leaf without materializing the transcript. */
function readSessionTranscriptActiveLeafEvents(scope) {
	return withCurrentProjectionSnapshot(scope, (projection) => {
		const leafEventId = projection.state.leafEventId;
		if (!leafEventId) return [];
		const db = getActiveTranscriptKysely(projection.database);
		const row = executeSqliteQueryTakeFirstSync(projection.database.db, db.selectFrom("transcript_event_identities as identity").innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "identity.session_id").onRef("event.seq", "=", "identity.seq")).select("event.event_json").where("identity.session_id", "=", projection.resolved.sessionId).where("identity.event_id", "=", leafEventId).limit(1));
		if (!row) throw new Error(`Active transcript leaf event is missing: ${leafEventId}`);
		return [JSON.parse(row.event_json)];
	});
}
/** Reads a bounded tail from the materialized active path, including control events. */
function readRecentSessionTranscriptActiveEvents(scope, maxEvents) {
	return withCurrentProjectionSnapshot(scope, (projection) => {
		const limit = Math.max(0, Math.floor(Number.isFinite(maxEvents) ? maxEvents : 0));
		if (limit === 0) return [];
		const db = getActiveTranscriptKysely(projection.database);
		return executeSqliteQuerySync(projection.database.db, db.selectFrom("session_transcript_active_events as active").innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "active.session_id").onRef("event.seq", "=", "active.event_seq")).select("event.event_json").where("active.session_id", "=", projection.resolved.sessionId).orderBy("active.active_position", "desc").limit(limit)).rows.toReversed().map((row) => JSON.parse(row.event_json));
	});
}
/** Reads active-path event count and JSONL byte size without materializing payloads. */
function readSessionTranscriptActiveStats(scope) {
	return withCurrentProjectionSnapshot(scope, (projection) => {
		const db = getActiveTranscriptKysely(projection.database);
		const row = executeSqliteQueryTakeFirstSync(projection.database.db, db.selectFrom("session_transcript_active_events as active").innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "active.session_id").onRef("event.seq", "=", "active.event_seq")).select((eb) => [eb.fn.count("active.event_seq").as("event_count"), sql`COALESCE(SUM(LENGTH(CAST(event.event_json AS BLOB))), 0)
            + COUNT(*)`.as("size_bytes")]).where("active.session_id", "=", projection.resolved.sessionId));
		return {
			eventCount: row?.event_count ?? 0,
			sizeBytes: row?.size_bytes ?? 0
		};
	});
}
/** Reads one append-stable forward page from the materialized active-message projection. */
function readSessionTranscriptVisibleMessageDelta(scope, limits = {}) {
	const maxMessages = normalizeVisibleMessageLimit(limits.maxMessages, DEFAULT_VISIBLE_MESSAGE_MAX_MESSAGES, MAX_VISIBLE_MESSAGE_MAX_MESSAGES, "maxMessages");
	const maxBytes = normalizeVisibleMessageLimit(limits.maxBytes, DEFAULT_VISIBLE_MESSAGE_MAX_BYTES, MAX_VISIBLE_MESSAGE_MAX_BYTES, "maxBytes");
	return withCurrentProjectionSnapshot(scope, (projection) => {
		const db = getActiveTranscriptKysely(projection.database);
		const generation = executeSqliteQueryTakeFirstSync(projection.database.db, db.selectFrom("transcript_rewrite_watermarks").select("generation").where("session_id", "=", projection.resolved.sessionId))?.generation;
		if (!generation) return { kind: "missing" };
		const initialCursor = createVisibleMessageCursor({
			agentId: projection.resolved.agentId,
			generation,
			sessionId: projection.resolved.sessionId
		});
		const reset = (reason) => ({
			kind: "reset",
			cursor: encodeVisibleMessageCursor(initialCursor),
			reason
		});
		const cursor = limits.cursor !== void 0 ? parseVisibleMessageCursor(limits.cursor) : initialCursor;
		if (!cursor) return reset("invalid_cursor");
		if (cursor.agentId !== projection.resolved.agentId || cursor.sessionId !== projection.resolved.sessionId) return reset("scope_mismatch");
		if (cursor.generation !== generation) return reset("generation_mismatch");
		let startPosition = 0;
		if (cursor.lastEventSeq >= 0) {
			const anchor = executeSqliteQueryTakeFirstSync(projection.database.db, db.selectFrom("session_transcript_active_events").select("message_position").where("session_id", "=", projection.resolved.sessionId).where("event_seq", "=", cursor.lastEventSeq).where("message_position", "is not", null));
			if (anchor?.message_position === null || anchor?.message_position === void 0) return reset("anchor_missing");
			if (anchor.message_position !== cursor.lastMessagePosition) return reset("anchor_moved");
			startPosition = anchor.message_position + 1;
		}
		const metadata = executeSqliteQuerySync(projection.database.db, db.selectFrom("session_transcript_active_events as active").innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "active.session_id").onRef("event.seq", "=", "active.event_seq")).select([
			"active.event_seq",
			"active.message_position",
			sql`LENGTH(CAST(event.event_json AS BLOB)) + 1`.as("serialized_bytes")
		]).where("active.session_id", "=", projection.resolved.sessionId).where("active.message_position", "is not", null).where("active.message_position", ">=", startPosition).orderBy("active.message_position", "asc").limit(maxMessages + 1)).rows;
		let serializedBytes = 0;
		let selectedCount = 0;
		for (const row of metadata) {
			if (selectedCount >= maxMessages || serializedBytes + row.serialized_bytes > maxBytes) break;
			serializedBytes += row.serialized_bytes;
			selectedCount += 1;
		}
		const selected = metadata.slice(0, selectedCount);
		const lastEventSeq = selected.at(-1)?.event_seq ?? cursor.lastEventSeq;
		const lastMessagePosition = selected.at(-1)?.message_position ?? cursor.lastMessagePosition;
		const rows = selectedCount === 0 ? [] : executeSqliteQuerySync(projection.database.db, db.selectFrom("session_transcript_active_events as active").innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "active.session_id").onRef("event.seq", "=", "active.event_seq")).leftJoin("session_transcript_active_events as parent_active", (join) => join.onRef("parent_active.session_id", "=", "active.session_id").on((eb) => eb("parent_active.active_position", "=", eb("active.active_position", "-", 1)))).leftJoin("transcript_event_identities as parent_identity", (join) => join.onRef("parent_identity.session_id", "=", "parent_active.session_id").onRef("parent_identity.seq", "=", "parent_active.event_seq")).select([
			"active.event_seq",
			"active.message_position",
			"event.event_json",
			"parent_identity.event_id as parent_id"
		]).where("active.session_id", "=", projection.resolved.sessionId).where("active.message_position", ">=", startPosition).where("active.message_position", "<=", lastMessagePosition).orderBy("active.message_position", "asc")).rows.map((row) => {
			if (row.message_position === null) throw new Error("Active transcript message row is missing its message position");
			return {
				event: JSON.parse(row.event_json),
				eventSeq: row.event_seq,
				parentId: row.parent_id,
				seq: row.message_position + 1
			};
		});
		const requiredBytes = selectedCount === 0 && metadata[0] ? metadata[0].serialized_bytes : void 0;
		return {
			kind: "page",
			cursor: encodeVisibleMessageCursor({
				...cursor,
				lastEventSeq,
				lastMessagePosition
			}),
			events: rows,
			hasMore: selectedCount < metadata.length,
			...requiredBytes !== void 0 ? { requiredBytes } : {},
			serializedBytes
		};
	});
}
/** Reads a bounded active-path tail while preserving transcript line and byte caps. */
function readRecentSessionTranscriptMessageEvents(scope, options) {
	return withCurrentProjectionSnapshot(scope, (projection) => {
		const visible = resolveVisibleMessagePositions(projection);
		const maxMessages = Math.min(MAX_VISIBLE_MESSAGE_MAX_MESSAGES, Math.max(0, Math.floor(Number.isFinite(options.maxMessages) ? options.maxMessages : 0)));
		const maxLines = Math.max(0, Math.floor(Number.isFinite(options.maxLines) ? options.maxLines : 0));
		if (maxMessages === 0 || maxLines === 0) return {
			activeLeafEntryId: projection.state.leafEventId,
			events: [],
			totalMessages: visible.total
		};
		const maxBytes = Math.max(1024, Math.floor(Number.isFinite(options.maxBytes) ? options.maxBytes : 8 * 1024 * 1024));
		const candidates = readVisibleMessageRange(projection, Math.max(0, visible.total - maxLines), visible.total);
		const selected = [];
		let bytes = 0;
		for (const event of candidates.toReversed()) {
			const eventBytes = Buffer.byteLength(JSON.stringify(event.event)) + 1;
			if (selected.length >= maxMessages || selected.length > 0 && bytes + eventBytes > maxBytes) break;
			selected.push(event);
			bytes += eventBytes;
		}
		return {
			activeLeafEntryId: projection.state.leafEventId,
			events: selected.toReversed(),
			totalMessages: visible.total
		};
	});
}
/** Reads one tail-relative message page with index range predicates, never OFFSET scanning. */
function readSessionTranscriptMessageEventPage(scope, options) {
	return withCurrentProjectionSnapshot(scope, (projection) => {
		const totalMessages = resolveVisibleMessagePositions(projection).total;
		const offset = Math.min(Math.max(0, Math.floor(Number.isFinite(options.offset) ? options.offset : 0)), totalMessages);
		const maxMessages = Math.max(0, Math.floor(Number.isFinite(options.maxMessages) ? options.maxMessages : 0));
		const endExclusive = Math.max(0, totalMessages - offset);
		const start = Math.max(0, endExclusive - maxMessages);
		return {
			activeLeafEntryId: projection.state.leafEventId,
			events: readVisibleMessageRange(projection, start, endExclusive),
			totalMessages
		};
	});
}
/** Reads a tail page whose materialized event payloads fit a hard byte budget. */
function readSessionTranscriptBoundedMessageTailPage(scope, options) {
	return withCurrentProjectionSnapshot(scope, (projection) => {
		const totalMessages = resolveVisibleMessagePositions(projection).total;
		const offset = Math.min(Math.max(0, Math.floor(Number.isFinite(options.offset) ? options.offset : 0)), totalMessages);
		const maxMessages = Math.min(MAX_VISIBLE_MESSAGE_MAX_MESSAGES, Math.max(0, Math.floor(Number.isFinite(options.maxMessages) ? options.maxMessages : 0)));
		const maxBytes = Math.max(0, Math.floor(Number.isFinite(options.maxBytes) ? options.maxBytes : 0));
		const endExclusive = Math.max(0, totalMessages - offset);
		const positions = resolveVisibleMessagePositionRange(projection, Math.max(0, endExclusive - maxMessages), endExclusive);
		if (positions.length === 0 || maxBytes === 0) return {
			activeLeafEntryId: projection.state.leafEventId,
			events: [],
			scannedMessages: positions.length,
			serializedBytes: 0,
			totalMessages
		};
		const db = getActiveTranscriptKysely(projection.database);
		const metadata = executeSqliteQuerySync(projection.database.db, db.selectFrom("session_transcript_active_events as active").innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "active.session_id").onRef("event.seq", "=", "active.event_seq")).select(["active.message_position", sql`LENGTH(CAST(event.event_json AS BLOB)) + 1`.as("serialized_bytes")]).where("active.session_id", "=", projection.resolved.sessionId).where("active.message_position", "in", positions).orderBy("active.message_position", "desc")).rows;
		const selectedPositions = [];
		let serializedBytes = 0;
		for (const row of metadata) {
			if (row.message_position === null || serializedBytes + row.serialized_bytes > maxBytes) continue;
			selectedPositions.push(row.message_position);
			serializedBytes += row.serialized_bytes;
		}
		const events = selectedPositions.length === 0 ? [] : executeSqliteQuerySync(projection.database.db, db.selectFrom("session_transcript_active_events as active").innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "active.session_id").onRef("event.seq", "=", "active.event_seq")).select(["active.message_position", "event.event_json"]).where("active.session_id", "=", projection.resolved.sessionId).where("active.message_position", "in", selectedPositions).orderBy("active.message_position", "asc")).rows.map(parseMessageEventRow);
		return {
			activeLeafEntryId: projection.state.leafEventId,
			events,
			scannedMessages: positions.length,
			serializedBytes,
			totalMessages
		};
	});
}
function readSessionTranscriptMessageEventCount(scope) {
	return withCurrentProjectionSnapshot(scope, (projection) => resolveVisibleMessagePositions(projection).total);
}
/** Reads one active message by event id without materializing sibling rows. */
function readSessionTranscriptMessageEventById(scope, messageId) {
	return withCurrentProjectionSnapshot(scope, (projection) => {
		const db = getActiveTranscriptKysely(projection.database);
		const row = executeSqliteQueryTakeFirstSync(projection.database.db, db.selectFrom("transcript_event_identities as identity").innerJoin("session_transcript_active_events as active", (join) => join.onRef("active.session_id", "=", "identity.session_id").onRef("active.event_seq", "=", "identity.seq")).innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "active.session_id").onRef("event.seq", "=", "active.event_seq")).select(["active.message_position", "event.event_json"]).where("identity.session_id", "=", projection.resolved.sessionId).where("identity.event_id", "=", messageId).where("active.message_position", "is not", null));
		if (!row || row.message_position === null) return;
		const visible = resolveVisibleMessagePositions(projection);
		return row.message_position >= visible.postStart || visible.kept.includes(row.message_position) ? parseMessageEventRow(row) : void 0;
	});
}
/** Reads a centered active-message page plus one older context row for split rendering. */
function readSessionTranscriptMessageAnchorPage(scope, options) {
	return withCurrentProjectionSnapshot(scope, (projection) => {
		const db = getActiveTranscriptKysely(projection.database);
		const anchor = executeSqliteQueryTakeFirstSync(projection.database.db, db.selectFrom("transcript_event_identities as identity").innerJoin("session_transcript_active_events as active", (join) => join.onRef("active.session_id", "=", "identity.session_id").onRef("active.event_seq", "=", "identity.seq")).select("active.message_position").where("identity.session_id", "=", projection.resolved.sessionId).where("identity.event_id", "=", options.messageId).where("active.message_position", "is not", null));
		const visible = resolveVisibleMessagePositions(projection);
		const totalMessages = visible.total;
		if (anchor?.message_position === null || anchor?.message_position === void 0) return {
			events: [],
			found: false,
			hasOverreadContext: false,
			offset: 0,
			totalMessages
		};
		const anchorVisiblePosition = anchor.message_position >= visible.postStart ? visible.kept.length + anchor.message_position - visible.postStart : visible.kept.indexOf(anchor.message_position);
		if (anchorVisiblePosition < 0) return {
			events: [],
			found: false,
			hasOverreadContext: false,
			offset: 0,
			totalMessages
		};
		const pageSize = Math.max(1, Math.floor(Number.isFinite(options.maxMessages) ? options.maxMessages : 1));
		const olderMessages = pageSize - Math.floor(pageSize / 2) - 1;
		const latestStart = Math.max(0, totalMessages - pageSize);
		const start = Math.min(Math.max(0, anchorVisiblePosition - olderMessages), latestStart);
		const endExclusive = Math.min(totalMessages, start + pageSize);
		const readStart = Math.max(0, start - 1);
		return {
			events: readVisibleMessageRange(projection, readStart, endExclusive),
			found: true,
			hasOverreadContext: readStart < start,
			offset: totalMessages - endExclusive,
			totalMessages
		};
	});
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-title-probes.ts
const SESSION_TITLE_PROBE_MESSAGES = 20;
const SESSION_TITLE_PROBE_QUERY_CHUNK_SIZE = 400;
function getTitleProbeKysely(database) {
	return getNodeSqliteKysely(database.db);
}
function parseEventType(eventJson) {
	if (!eventJson) return;
	try {
		const event = JSON.parse(eventJson);
		return typeof event.type === "string" ? event.type : void 0;
	} catch {
		return;
	}
}
function sqliteTranscriptBoundaryEventType() {
	return sql`json_extract(boundary_event.event_json, '$.type')`;
}
function readTitleProbeChunk(database, sessionIds) {
	const db = getTitleProbeKysely(database);
	const rows = runSqliteDeferredTransactionSync(database.db, () => executeSqliteQuerySync(database.db, db.selectFrom("session_windows as window").leftJoin("session_transcript_index_state as state", "state.session_id", "window.session_id").leftJoin("transcript_rewrite_watermarks as rewrite", "rewrite.session_id", "window.session_id").leftJoin("session_transcript_active_events as active", (join) => join.onRef("active.session_id", "=", "window.session_id").on("active.message_position", "is not", null).on((eb) => eb.or([eb("active.message_position", "<", SESSION_TITLE_PROBE_MESSAGES), eb("active.message_position", ">=", eb("state.active_message_count", "-", SESSION_TITLE_PROBE_MESSAGES))]))).leftJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "active.session_id").onRef("event.seq", "=", "active.event_seq")).select((eb) => [
		"window.session_id",
		"state.active_message_count",
		"state.indexed_seq",
		"state.needs_rebuild",
		"rewrite.generation",
		"active.message_position",
		"event.event_json",
		eb.selectFrom("transcript_events as latest").select("latest.seq").whereRef("latest.session_id", "=", "window.session_id").orderBy("latest.seq", "desc").limit(1).as("latest_seq"),
		eb.selectFrom("session_transcript_active_events as boundary").innerJoin("transcript_events as boundary_event", (join) => join.onRef("boundary_event.session_id", "=", "boundary.session_id").onRef("boundary_event.seq", "=", "boundary.event_seq")).select("boundary_event.event_json").whereRef("boundary.session_id", "=", "window.session_id").where("boundary.message_position", "is", null).where(sqliteTranscriptBoundaryEventType(), "in", ["reset", "compaction"]).orderBy("boundary.active_position", "desc").limit(1).as("latest_boundary_json")
	]).where("window.session_id", "in", sessionIds).orderBy("window.session_id", "asc").orderBy("active.message_position", "asc")).rows, {
		databaseLabel: database.path,
		operationLabel: "sessions.list.title-probes"
	});
	const probes = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const emptyTranscript = row.latest_seq === null;
		const projectionCurrent = row.needs_rebuild === 0 && row.indexed_seq === row.latest_seq;
		if (!emptyTranscript && !projectionCurrent || parseEventType(row.latest_boundary_json) === "reset") continue;
		const totalMessages = row.active_message_count ?? 0;
		const probe = probes.get(row.session_id) ?? {
			generation: row.generation ?? null,
			head: [],
			maxSeq: row.latest_seq ?? null,
			tail: [],
			totalMessages
		};
		if (row.event_json !== null && row.message_position !== null) {
			const event = {
				event: JSON.parse(row.event_json),
				seq: row.message_position + 1
			};
			if (row.message_position < SESSION_TITLE_PROBE_MESSAGES) probe.head.push(event);
			if (row.message_position >= totalMessages - SESSION_TITLE_PROBE_MESSAGES) probe.tail.push(event);
		}
		probes.set(row.session_id, probe);
	}
	return probes;
}
/** Reads bounded title probes in one statement per opened store (chunked for SQLite limits). */
function readSessionTranscriptTitleProbeBatch(scopes) {
	const results = Array.from({ length: scopes.length });
	const groups = /* @__PURE__ */ new Map();
	const targetCache = /* @__PURE__ */ new Map();
	for (const [index, scope] of scopes.entries()) {
		const resolved = resolveSqliteTranscriptReadScope(scope, targetCache);
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		const group = groups.get(database.path) ?? {
			database,
			items: []
		};
		group.items.push({
			index,
			sessionId: resolved.sessionId
		});
		groups.set(database.path, group);
	}
	for (const group of groups.values()) {
		const sessionIds = [...new Set(group.items.map((item) => item.sessionId))];
		const probes = /* @__PURE__ */ new Map();
		for (let offset = 0; offset < sessionIds.length; offset += SESSION_TITLE_PROBE_QUERY_CHUNK_SIZE) {
			const chunk = sessionIds.slice(offset, offset + SESSION_TITLE_PROBE_QUERY_CHUNK_SIZE);
			for (const [sessionId, probe] of readTitleProbeChunk(group.database, chunk)) probes.set(sessionId, probe);
		}
		for (const item of group.items) results[item.index] = probes.get(item.sessionId);
	}
	return results;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-transcript-watermark.ts
const SESSION_TRANSCRIPT_WATERMARK_QUERY_CHUNK_SIZE = 400;
/** Reads the append and rewrite tokens that validate transcript-derived caches. */
function readSessionTranscriptWatermark(scope) {
	const resolved = resolveSqliteTranscriptReadScope(scope);
	const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
	const db = getNodeSqliteKysely(database.db);
	const maxSeq = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("transcript_events").select((eb) => eb.fn.max("seq").as("max_seq")).where("session_id", "=", resolved.sessionId))?.max_seq;
	return {
		generation: executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("transcript_rewrite_watermarks").select("generation").where("session_id", "=", resolved.sessionId))?.generation ?? null,
		maxSeq: maxSeq ?? null
	};
}
function readSessionTranscriptWatermarkChunk(database, sessionIds) {
	const db = getNodeSqliteKysely(database.db);
	const rows = executeSqliteQuerySync(database.db, db.selectFrom("session_windows as window").leftJoin("transcript_rewrite_watermarks as rewrite", "rewrite.session_id", "window.session_id").select((eb) => [
		"window.session_id",
		"rewrite.generation",
		eb.selectFrom("transcript_events as event").select((inner) => inner.fn.max("event.seq").as("max_seq")).whereRef("event.session_id", "=", "window.session_id").as("max_seq")
	]).where("window.session_id", "in", sessionIds)).rows;
	return new Map(rows.map((row) => [row.session_id, {
		generation: row.generation ?? null,
		maxSeq: row.max_seq ?? null
	}]));
}
/** Reads cache-validation tokens in one statement per opened store and SQLite-sized chunk. */
function readSessionTranscriptWatermarkBatch(scopes) {
	const results = Array.from({ length: scopes.length });
	const groups = /* @__PURE__ */ new Map();
	const targetCache = /* @__PURE__ */ new Map();
	for (const [index, scope] of scopes.entries()) {
		const resolved = resolveSqliteTranscriptReadScope(scope, targetCache);
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		const group = groups.get(database.path) ?? {
			database,
			items: []
		};
		group.items.push({
			index,
			sessionId: resolved.sessionId
		});
		groups.set(database.path, group);
	}
	for (const group of groups.values()) {
		const sessionIds = [...new Set(group.items.map((item) => item.sessionId))];
		const watermarks = /* @__PURE__ */ new Map();
		for (let offset = 0; offset < sessionIds.length; offset += SESSION_TRANSCRIPT_WATERMARK_QUERY_CHUNK_SIZE) {
			const chunk = sessionIds.slice(offset, offset + SESSION_TRANSCRIPT_WATERMARK_QUERY_CHUNK_SIZE);
			for (const [sessionId, watermark] of readSessionTranscriptWatermarkChunk(group.database, chunk)) watermarks.set(sessionId, watermark);
		}
		for (const item of group.items) results[item.index] = watermarks.get(item.sessionId) ?? {
			generation: null,
			maxSeq: null
		};
	}
	return results.map((result) => result ?? {
		generation: null,
		maxSeq: null
	});
}
//#endregion
//#region src/config/sessions/session-accessor.transcript-target.ts
function resolveRuntimeContext(scope) {
	const agentId = scope.agentId ?? resolveAgentIdFromSessionKey(scope.sessionKey);
	if (!agentId) throw new Error(`Cannot resolve transcript scope without an agent id: ${scope.sessionKey}`);
	const configuredStorePath = resolveConcreteSessionStorePath(scope.storePath) ?? resolveStorePath(getRuntimeConfig().session?.store, {
		agentId,
		env: scope.env
	});
	const storePath = resolveSessionStorePathForScope({
		agentId,
		env: scope.env,
		sessionKey: scope.sessionKey,
		storePath: configuredStorePath
	});
	return {
		agentId,
		sessionKey: resolveSessionEntrySelection({
			agentId,
			...scope.env ? { env: scope.env } : {},
			sessionKey: scope.sessionKey,
			storePath
		})?.normalizedKey ?? scope.sessionKey,
		storePath
	};
}
/** Resolves the canonical SQLite identity for runtime transcript access. */
async function resolveSessionTranscriptRuntimeTarget(scope) {
	return {
		...resolveRuntimeContext(scope),
		sessionId: scope.sessionId
	};
}
/** Read-only resolution shares the same identity without persisting metadata locators. */
async function resolveSessionTranscriptRuntimeReadTarget(scope) {
	return await resolveSessionTranscriptRuntimeTarget(scope);
}
function resolveSessionTranscriptReadTarget(scope) {
	const sessionKey = scope.sessionKey?.trim();
	const agentId = scope.agentId ?? resolveAgentIdFromSessionKey(sessionKey);
	if (!agentId) throw new Error(`Cannot resolve transcript scope without an agent id: ${sessionKey}`);
	const configuredStorePath = resolveConcreteSessionStorePath(scope.storePath) ?? resolveStorePath(getRuntimeConfig().session?.store, {
		agentId,
		env: scope.env
	});
	const storePath = resolveSessionStorePathForScope({
		agentId,
		env: scope.env,
		sessionKey,
		storePath: configuredStorePath
	});
	const hasMatchingSessionEntry = scope.sessionEntry?.sessionId === scope.sessionId;
	const resolved = sessionKey && !hasMatchingSessionEntry ? resolveSessionEntrySelection({
		agentId,
		...scope.env ? { env: scope.env } : {},
		sessionKey,
		storePath
	}, { readOnly: true }) : void 0;
	const resolvedSessionKey = hasMatchingSessionEntry ? sessionKey : resolved?.normalizedKey;
	return {
		agentId,
		sessionId: scope.sessionId,
		storePath,
		...resolvedSessionKey ? { sessionKey: resolvedSessionKey } : {}
	};
}
function resolveConcreteSessionStorePath(storePath) {
	const trimmed = storePath?.trim();
	if (!trimmed || trimmed === "(multiple)" || trimmed.includes("{agentId}")) return;
	return trimmed;
}
//#endregion
export { listSessionEntries as $, SessionInitializationAgentScopeMismatchError as A, forkSessionEntryFromParentTarget as B, acquireOwnedSessionTranscriptWriteLock as C, findTranscriptEvent as D, withOwnedSessionTranscriptWrites as E, listSessionBranches as F, resolveSessionParentForkDecision as G, markSessionAbortTarget as H, resolveSessionTranscriptActiveLeafEntryId as I, applySessionPatchProjection as J, updateSessionEntry as K, rewindSessionToMessage as L, loadReplySessionInitializationSnapshot as M, persistSessionResetLifecycle as N, preflightSessionTranscriptForManualCompact as O, forkSessionAtMessage as P, restoreSessionFromCompactionCheckpoint as Q, switchSessionBranch as R, persistSessionTranscriptTurn as S, runWithoutOwnedSessionTranscriptWrites as T, recordInboundSessionMeta as U, forkSessionFromParentTranscript as V, resolveSessionAbortTarget as W, cleanupPluginHostSessionStore as X, branchSessionFromCompactionCheckpoint as Y, preserveTemporarySessionMapping as Z, readSessionTranscriptMessageEvents as _, readSessionTranscriptWatermark as a, updateResolvedSessionEntry as at, isSessionTranscriptProjectionUnavailableError as b, readRecentSessionTranscriptActiveEvents as c, listSessionTranscriptInstances as ct, readSessionTranscriptActiveStats as d, openSessionEntryReadView as et, readSessionTranscriptBoundedMessageTailPage as f, readSessionTranscriptMessageEventPage as g, readSessionTranscriptMessageEventCount as h, resolveSessionTranscriptRuntimeTarget as i, resolveSessionEntrySelection as it, commitReplySessionInitialization as j, trimSessionTranscriptForManualCompact as k, readRecentSessionTranscriptMessageEvents as l, readSessionTranscriptMessageEventById as m, resolveSessionTranscriptReadTarget as n, resolveSessionEntryAccessTarget as nt, readSessionTranscriptWatermarkBatch as o, clearPluginOwnedSessionState as ot, readSessionTranscriptMessageAnchorPage as p, updateSessionLastRoute as q, resolveSessionTranscriptRuntimeReadTarget as r, resolveSessionEntryCandidateTarget as rt, readSessionTranscriptTitleProbeBatch as s, listSessionEntriesByStatus as st, resolveConcreteSessionStorePath as t, patchSessionEntryWithKey as tt, readSessionTranscriptActiveLeafEvents as u, readSessionTranscriptVisibleMessageDelta as v, bindOwnedSessionTranscriptWrites as w, appendTranscriptMessages as x, SessionTranscriptProjectionUnavailableError as y, createSessionEntryWithTranscript as z };
