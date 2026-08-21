import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-DW4mBlAt.js";
import { n as safeParseJson } from "./src-COWbwBfI.js";
import { i as asOptionalRecord } from "./record-coerce-DHZ4bFlT.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { r as getRuntimeConfig } from "./io-BsQc3Kgy.js";
import { h as getNodeSqliteKysely, m as executeSqliteQueryTakeFirstSync, p as executeSqliteQuerySync } from "./node-sqlite-B_0DgpUE.js";
import { d as openOpenClawStateDatabase, h as runOpenClawStateWriteTransaction } from "./openclaw-state-db-D9eH245j.js";
import "./config-BBVHtcXg.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { ot as loadExactSqliteSessionEntryReadOnly, rt as listSqliteSessionEntryKeysReadOnly } from "./session-accessor.sqlite-CtCo5VZ6.js";
import { D as mergeSessionEntry } from "./session-entry-slot-keys-DPRQmSpa.js";
import { tt as patchSessionEntryWithKey } from "./session-accessor-D5Or7WgI.js";
//#region src/acp/runtime/session-meta-store.ts
/** Store binding for ACP session metadata: resolves which session-store row owns a key. */
/**
* Resolve one session's store key and entry with targeted single-row probes.
* Gateway sessions.list calls this per row; listing the whole store here made
* that path O(rows²) in JSON parsing (12.7s of a 78.5s production profile).
* The full scan survives only as the fallback for legacy case-variant keys
* that neither the exact nor the lowercased probe can hit.
*/
function resolveStoreEntryForSessionKey(params) {
	const scope = {
		...params.agentId ? { agentId: params.agentId } : {},
		storePath: params.storePath,
		...params.clone === false ? { clone: false } : {}
	};
	const normalized = params.sessionKey.trim();
	if (!normalized) return { storeSessionKey: "" };
	const exact = loadExactSqliteSessionEntryReadOnly({
		...scope,
		sessionKey: normalized
	});
	if (exact) return {
		storeSessionKey: normalized,
		entry: exact.entry
	};
	const lower = normalizeLowercaseStringOrEmpty(normalized);
	if (lower !== normalized) {
		const lowered = loadExactSqliteSessionEntryReadOnly({
			...scope,
			sessionKey: lower
		});
		if (lowered) return {
			storeSessionKey: lower,
			entry: lowered.entry
		};
	}
	const variant = listSqliteSessionEntryKeysReadOnly(scope).find((candidate) => normalizeLowercaseStringOrEmpty(candidate) === lower);
	if (variant === void 0) return { storeSessionKey: lower };
	return {
		storeSessionKey: variant,
		entry: loadExactSqliteSessionEntryReadOnly({
			...scope,
			sessionKey: variant
		})?.entry
	};
}
/** Resolves the session store path that owns an ACP session key. */
function resolveSessionStorePathForAcp(params) {
	const cfg = params.cfg ?? getRuntimeConfig();
	const agentId = parseAgentSessionKey(params.sessionKey)?.agentId ?? resolveDefaultAgentId(cfg);
	return {
		cfg,
		agentId,
		storePath: resolveStorePath(cfg.session?.store, {
			agentId,
			env: params.env
		})
	};
}
/** Reads one session's store binding, falling back to a lowercased key on store errors. */
function readSessionEntryFromStore(params) {
	const { cfg, agentId, storePath } = resolveSessionStorePathForAcp({
		sessionKey: params.sessionKey,
		cfg: params.cfg,
		env: params.env
	});
	try {
		const { storeSessionKey, entry } = resolveStoreEntryForSessionKey({
			...agentId ? { agentId } : {},
			storePath,
			sessionKey: params.sessionKey,
			...params.clone === false ? { clone: false } : {}
		});
		return {
			cfg,
			agentId,
			storePath,
			storeSessionKey,
			entry
		};
	} catch {
		return {
			cfg,
			agentId,
			storePath,
			storeSessionKey: normalizeLowercaseStringOrEmpty(params.sessionKey),
			storeReadFailed: true
		};
	}
}
//#endregion
//#region src/acp/runtime/session-meta.ts
function getAcpSessionKysely(db) {
	return getNodeSqliteKysely(db);
}
function rowToAcpSessionMeta(row) {
	const identity = asOptionalRecord(safeParseJson(row.identity_json ?? ""));
	const runtimeOptions = asOptionalRecord(safeParseJson(row.runtime_options_json ?? ""));
	return {
		backend: row.backend,
		agent: row.agent,
		runtimeSessionName: row.runtime_session_name,
		...identity ? { identity } : {},
		mode: row.mode === "oneshot" ? "oneshot" : "persistent",
		...runtimeOptions ? { runtimeOptions } : {},
		...row.cwd != null ? { cwd: row.cwd } : {},
		state: row.state === "running" || row.state === "error" ? row.state : "idle",
		lastActivityAt: row.last_activity_at,
		...row.last_error != null ? { lastError: row.last_error } : {}
	};
}
function bindAcpSessionMeta(params) {
	return {
		session_key: params.sessionKey,
		session_id: params.lifecycleRevision ?? params.sessionId ?? null,
		backend: params.meta.backend,
		agent: params.meta.agent,
		runtime_session_name: params.meta.runtimeSessionName,
		identity_json: params.meta.identity ? JSON.stringify(params.meta.identity) : null,
		mode: params.meta.mode,
		runtime_options_json: params.meta.runtimeOptions ? JSON.stringify(params.meta.runtimeOptions) : null,
		cwd: params.meta.cwd ?? null,
		state: params.meta.state,
		last_activity_at: params.meta.lastActivityAt,
		last_error: params.meta.lastError ?? null,
		updated_at: params.updatedAt
	};
}
function selectAcpSessionRow(db, sessionKey) {
	return executeSqliteQueryTakeFirstSync(db, getAcpSessionKysely(db).selectFrom("acp_sessions").selectAll().where("session_key", "=", sessionKey));
}
function acpSessionRowMatchesEntry(row, entry) {
	return row.session_id == null || row.session_id === entry?.lifecycleRevision || row.session_id === entry?.sessionId && (entry?.sessionStartedAt === void 0 || row.updated_at >= entry.sessionStartedAt);
}
function resolveReadableAcpSessionRow(params) {
	const { row, entry } = params;
	if (!row || !acpSessionRowMatchesEntry(row, entry)) return;
	const legacySessionId = entry?.sessionId;
	const lifecycleRevision = entry?.lifecycleRevision;
	if (!legacySessionId || !lifecycleRevision || row.session_id !== legacySessionId || row.session_id === lifecycleRevision) return row;
	return runOpenClawStateWriteTransaction((database) => {
		const current = selectAcpSessionRow(database.db, row.session_key);
		if (!current || current.session_id === lifecycleRevision || current.session_id == null) return current;
		if (current.session_id !== legacySessionId) return;
		executeSqliteQuerySync(database.db, getAcpSessionKysely(database.db).updateTable("acp_sessions").set({ session_id: lifecycleRevision }).where("session_key", "=", row.session_key).where("session_id", "=", legacySessionId));
		return {
			...current,
			session_id: lifecycleRevision
		};
	}, {
		env: params.env,
		path: params.databasePath
	});
}
function readAcpSessionMeta(params) {
	const sessionKey = params.sessionKey.trim();
	if (!sessionKey) return;
	const storeEntry = readSessionEntryFromStore({
		sessionKey,
		cfg: params.cfg,
		env: params.env,
		clone: false
	});
	const row = resolveReadableAcpSessionRow({
		row: selectAcpSessionRow(openOpenClawStateDatabase({
			env: params.env,
			path: params.databasePath
		}).db, storeEntry.storeSessionKey),
		entry: storeEntry.entry,
		env: params.env,
		databasePath: params.databasePath
	});
	if (!row) return;
	return rowToAcpSessionMeta(row);
}
function readAcpSessionMetaForEntry(params) {
	const sessionKey = params.sessionKey.trim();
	if (!sessionKey) return;
	const row = resolveReadableAcpSessionRow({
		row: selectAcpSessionRow(openOpenClawStateDatabase({
			env: params.env,
			path: params.databasePath
		}).db, sessionKey),
		entry: params.entry,
		env: params.env,
		databasePath: params.databasePath
	});
	if (!row) return;
	return rowToAcpSessionMeta(row);
}
function readAcpSessionMetaBatch(params) {
	const result = /* @__PURE__ */ new Map();
	const entriesByKey = /* @__PURE__ */ new Map();
	for (const item of params.entries) {
		const sessionKey = item.sessionKey.trim();
		if (!sessionKey) continue;
		if (item.entry?.acp) {
			result.set(item.entry, item.entry.acp);
			continue;
		}
		const entries = entriesByKey.get(sessionKey) ?? [];
		entries.push(item.entry);
		entriesByKey.set(sessionKey, entries);
	}
	if (entriesByKey.size === 0) return result;
	const database = openOpenClawStateDatabase({
		env: params.env,
		path: params.databasePath
	});
	const db = getAcpSessionKysely(database.db);
	const requestedKeys = [...entriesByKey.keys()];
	const keyChunks = [];
	for (let index = 0; index < requestedKeys.length; index += 500) keyChunks.push(requestedKeys.slice(index, index + 500));
	const rows = keyChunks.flatMap((chunk) => executeSqliteQuerySync(database.db, db.selectFrom("acp_sessions").selectAll().where("session_key", "in", chunk)).rows);
	const rowsByKey = new Map(rows.map((row) => [row.session_key, row]));
	for (const [sessionKey, entries] of entriesByKey) for (const entry of entries) {
		const row = resolveReadableAcpSessionRow({
			row: rowsByKey.get(sessionKey),
			entry,
			env: params.env,
			databasePath: params.databasePath
		});
		result.set(entry, row ? rowToAcpSessionMeta(row) : void 0);
	}
	return result;
}
function selectAcpSessionRows(options = {}) {
	const database = openOpenClawStateDatabase(options);
	return executeSqliteQuerySync(database.db, getAcpSessionKysely(database.db).selectFrom("acp_sessions").selectAll().orderBy("last_activity_at", "desc").orderBy("session_key", "asc")).rows;
}
function writeAcpSessionMetaForMigration(params) {
	const sessionKey = params.sessionKey.trim();
	if (!sessionKey) return;
	const row = bindAcpSessionMeta({
		sessionKey,
		sessionId: params.sessionId,
		lifecycleRevision: params.lifecycleRevision,
		meta: params.meta,
		updatedAt: params.now?.() ?? Date.now()
	});
	runOpenClawStateWriteTransaction((database) => {
		upsertAcpSessionMetaRow(database.db, row);
	}, {
		env: params.env,
		path: params.databasePath
	});
}
function repairAcpSessionMetaKeyForMigration(params) {
	const sessionKey = params.sessionKey.trim();
	if (!sessionKey) return false;
	let repaired = false;
	runOpenClawStateWriteTransaction((database) => {
		const currentRow = selectAcpSessionRow(database.db, sessionKey);
		if (currentRow && acpSessionRowMatchesEntry(currentRow, params.entry)) return;
		const normalizedSessionKey = normalizeLowercaseStringOrEmpty(sessionKey);
		const candidateKeys = /* @__PURE__ */ new Set();
		candidateKeys.add(normalizedSessionKey);
		for (const candidate of params.candidateSessionKeys ?? []) {
			const trimmed = typeof candidate === "string" ? candidate.trim() : "";
			if (trimmed && trimmed !== sessionKey && normalizeLowercaseStringOrEmpty(trimmed) === normalizedSessionKey) candidateKeys.add(trimmed);
		}
		let row;
		for (const candidateKey of candidateKeys) {
			const candidateRow = selectAcpSessionRow(database.db, candidateKey);
			if (candidateRow && acpSessionRowMatchesEntry(candidateRow, params.entry)) {
				row = candidateRow;
				break;
			}
		}
		row ??= executeSqliteQuerySync(database.db, getAcpSessionKysely(database.db).selectFrom("acp_sessions").selectAll().where((eb) => eb.fn("lower", ["session_key"]), "=", normalizedSessionKey).orderBy("last_activity_at", "desc").orderBy("session_key", "asc")).rows.find((candidate) => candidate.session_key !== sessionKey && acpSessionRowMatchesEntry(candidate, params.entry));
		if (!row) return;
		upsertAcpSessionMetaRow(database.db, {
			...row,
			session_key: sessionKey,
			updated_at: params.now?.() ?? Date.now()
		});
		executeSqliteQuerySync(database.db, getAcpSessionKysely(database.db).deleteFrom("acp_sessions").where("session_key", "=", row.session_key));
		repaired = true;
	}, {
		env: params.env,
		path: params.databasePath
	});
	return repaired;
}
function upsertAcpSessionMetaRow(db, row) {
	executeSqliteQuerySync(db, getAcpSessionKysely(db).insertInto("acp_sessions").values(row).onConflict((conflict) => conflict.column("session_key").doUpdateSet({
		session_id: (eb) => eb.ref("excluded.session_id"),
		backend: (eb) => eb.ref("excluded.backend"),
		agent: (eb) => eb.ref("excluded.agent"),
		runtime_session_name: (eb) => eb.ref("excluded.runtime_session_name"),
		identity_json: (eb) => eb.ref("excluded.identity_json"),
		mode: (eb) => eb.ref("excluded.mode"),
		runtime_options_json: (eb) => eb.ref("excluded.runtime_options_json"),
		cwd: (eb) => eb.ref("excluded.cwd"),
		state: (eb) => eb.ref("excluded.state"),
		last_activity_at: (eb) => eb.ref("excluded.last_activity_at"),
		last_error: (eb) => eb.ref("excluded.last_error"),
		updated_at: (eb) => eb.ref("excluded.updated_at")
	})));
}
function readAcpSessionEntry(params) {
	const sessionKey = params.sessionKey.trim();
	if (!sessionKey) return null;
	const storeEntry = readSessionEntryFromStore(params);
	const row = resolveReadableAcpSessionRow({
		row: selectAcpSessionRow(openOpenClawStateDatabase({
			env: params.env,
			path: params.databasePath
		}).db, storeEntry.storeSessionKey),
		entry: storeEntry.entry,
		env: params.env,
		databasePath: params.databasePath
	});
	const acp = row ? rowToAcpSessionMeta(row) : void 0;
	return {
		cfg: storeEntry.cfg,
		agentId: storeEntry.agentId,
		storePath: storeEntry.storePath,
		sessionKey,
		storeSessionKey: storeEntry.storeSessionKey,
		entry: storeEntry.entry,
		acp,
		storeReadFailed: storeEntry.storeReadFailed
	};
}
async function listAcpSessionEntries(params) {
	const cfg = params.cfg ?? getRuntimeConfig();
	const rows = selectAcpSessionRows({
		env: params.env,
		path: params.databasePath
	});
	const entries = [];
	for (const row of rows) {
		const sessionKey = row.session_key;
		const { agentId, storePath } = resolveSessionStorePathForAcp({
			sessionKey,
			cfg,
			env: params.env
		});
		let storeSessionKey;
		let entry;
		try {
			({storeSessionKey, entry} = resolveStoreEntryForSessionKey({
				...agentId ? { agentId } : {},
				storePath,
				sessionKey,
				...params.clone === false ? { clone: false } : {}
			}));
		} catch {
			continue;
		}
		const readableRow = resolveReadableAcpSessionRow({
			row,
			entry,
			env: params.env,
			databasePath: params.databasePath
		});
		if (!entry || !readableRow) continue;
		entries.push({
			cfg,
			agentId,
			storePath,
			sessionKey,
			storeSessionKey,
			entry,
			acp: rowToAcpSessionMeta(readableRow)
		});
	}
	return entries;
}
function mergeAcpForReturn(entry, acp) {
	return mergeSessionEntry(entry, { acp });
}
function sessionStoreUpdateOptions(params) {
	return {
		activeSessionKey: normalizeLowercaseStringOrEmpty(params.sessionKey),
		...params.skipMaintenance === true ? { skipMaintenance: true } : {},
		...params.takeCacheOwnership === true ? { takeCacheOwnership: true } : {}
	};
}
async function clearLegacyEmbeddedAcpMetadata(params) {
	const sessionKeys = new Set(Array.from(params.sessionKeys, (sessionKey) => sessionKey?.trim()).filter((sessionKey) => Boolean(sessionKey)));
	if (sessionKeys.size === 0) return;
	for (const sessionKey of sessionKeys) await patchSessionEntryWithKey({
		storePath: params.storePath,
		sessionKey
	}, (entry) => {
		if (!entry.acp) return null;
		const next = { ...entry };
		delete next.acp;
		return next;
	}, {
		replaceEntry: true,
		skipMaintenance: true
	});
}
async function upsertAcpSessionMeta(params) {
	const sessionKey = params.sessionKey.trim();
	if (!sessionKey) return null;
	const storeEntry = readSessionEntryFromStore({
		sessionKey,
		cfg: params.cfg,
		env: params.env,
		clone: false
	});
	const { entry } = storeEntry;
	const storageSessionKey = storeEntry.storeSessionKey;
	let current;
	let nextMeta;
	let preparedEntry;
	const updatedAt = params.now?.() ?? Date.now();
	runOpenClawStateWriteTransaction((database) => {
		const currentRow = selectAcpSessionRow(database.db, storageSessionKey);
		current = currentRow && acpSessionRowMatchesEntry(currentRow, entry) ? rowToAcpSessionMeta(currentRow) : void 0;
		preparedEntry = mergeSessionEntry(entry, { updatedAt });
		nextMeta = params.mutate(current, current ? mergeAcpForReturn(preparedEntry, current) : entry);
	}, {
		env: params.env,
		path: params.databasePath
	});
	const metaToPersist = nextMeta;
	if (metaToPersist === void 0) return current ? mergeAcpForReturn(entry, current) : entry ?? null;
	if (metaToPersist === null) {
		const patched = entry ? await patchSessionEntryWithKey({
			...storeEntry.agentId ? { agentId: storeEntry.agentId } : {},
			storePath: storeEntry.storePath,
			sessionKey: storageSessionKey
		}, (currentEntry) => {
			const next = { ...currentEntry };
			delete next.acp;
			return next;
		}, {
			...sessionStoreUpdateOptions({
				...params,
				sessionKey: storageSessionKey
			}),
			replaceEntry: true
		}) : null;
		runOpenClawStateWriteTransaction((database) => {
			const sessionKeysToDelete = /* @__PURE__ */ new Set([storageSessionKey]);
			if (patched?.sessionKey) sessionKeysToDelete.add(patched.sessionKey);
			for (const key of sessionKeysToDelete) executeSqliteQuerySync(database.db, getAcpSessionKysely(database.db).deleteFrom("acp_sessions").where("session_key", "=", key));
		}, {
			env: params.env,
			path: params.databasePath
		});
		await clearLegacyEmbeddedAcpMetadata({
			storePath: storeEntry.storePath,
			sessionKeys: [storageSessionKey, patched?.sessionKey]
		});
		return patched?.entry ?? null;
	}
	const persisted = await patchSessionEntryWithKey({
		...storeEntry.agentId ? { agentId: storeEntry.agentId } : {},
		storePath: storeEntry.storePath,
		sessionKey: storageSessionKey
	}, (currentEntry) => {
		const next = mergeSessionEntry(currentEntry, { updatedAt });
		delete next.acp;
		return next;
	}, {
		...sessionStoreUpdateOptions({
			...params,
			sessionKey: storageSessionKey
		}),
		fallbackEntry: preparedEntry,
		replaceEntry: true
	});
	if (!persisted) return null;
	await clearLegacyEmbeddedAcpMetadata({
		storePath: storeEntry.storePath,
		sessionKeys: [storageSessionKey, persisted.sessionKey]
	});
	runOpenClawStateWriteTransaction((database) => {
		upsertAcpSessionMetaRow(database.db, bindAcpSessionMeta({
			sessionKey: persisted.sessionKey,
			sessionId: persisted.entry.sessionId,
			lifecycleRevision: persisted.entry.lifecycleRevision,
			meta: metaToPersist,
			updatedAt
		}));
		if (persisted.sessionKey !== storageSessionKey) executeSqliteQuerySync(database.db, getAcpSessionKysely(database.db).deleteFrom("acp_sessions").where("session_key", "=", storageSessionKey));
	}, {
		env: params.env,
		path: params.databasePath
	});
	return mergeAcpForReturn(persisted.entry, metaToPersist);
}
//#endregion
export { readAcpSessionMetaForEntry as a, writeAcpSessionMetaForMigration as c, readAcpSessionMetaBatch as i, resolveSessionStorePathForAcp as l, readAcpSessionEntry as n, repairAcpSessionMetaKeyForMigration as o, readAcpSessionMeta as r, upsertAcpSessionMeta as s, listAcpSessionEntries as t };
