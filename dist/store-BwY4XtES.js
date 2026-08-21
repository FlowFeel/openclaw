import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { t as expandHomePrefix } from "./home-dir-Cs7bTrwJ.js";
import { d as resolveConfigDir } from "./utils-Bs67j6-3.js";
import { h as getNodeSqliteKysely, p as executeSqliteQuerySync, t as openNodeSqliteDatabase } from "./node-sqlite-B_0DgpUE.js";
import { d as openOpenClawStateDatabase, h as runOpenClawStateWriteTransaction } from "./openclaw-state-db-D9eH245j.js";
import { n as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-2PkDmkRl.js";
import { t as withExistingOpenClawStateDatabaseReadOnly } from "./openclaw-state-db-readonly-CdeeU5HX.js";
import { n as readConfigMachineState } from "./config-machine-state-i7eWuJLs.js";
import { t as createSqliteAuditRecordStore } from "./sqlite-audit-record-store-Ckg99dh0.js";
import { t as cronStoreKey } from "./key-BBZ40bDq.js";
import { i as loadedCronStoreFromRows, n as deleteStaleCronJobFamilyRows, o as replaceCronRows, r as loadCronRows, s as updateCronRuntimeRows, t as assertCronStoreCanPersist } from "./row-codec-CUrTP2BZ.js";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
//#region src/cron/store/config-state.ts
function readCronStoreStatePath(env = process.env) {
	const value = readConfigMachineState("cron.store", { env });
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
//#endregion
//#region src/cron/store/quarantine.ts
/** Durable malformed-cron recovery records stored in the shared SQLite database. */
function cronQuarantineScope(storePath) {
	return `cron.quarantine:${cronStoreKey(storePath)}`;
}
function cronQuarantineEntryKey(entry) {
	const identity = JSON.stringify({
		sourceIndex: entry.sourceIndex,
		reason: entry.reason,
		job: entry.job ?? null,
		raw: entry.raw ?? null,
		state: entry.state ?? null,
		updatedAtMs: entry.updatedAtMs ?? null,
		scheduleIdentity: entry.scheduleIdentity ?? null
	});
	return createHash("sha256").update(identity).digest("hex");
}
/** Reads quarantined cron rows without creating or migrating a state database. */
function loadCronQuarantinedJobs(storePath, env = process.env) {
	const scope = cronQuarantineScope(storePath);
	return withExistingOpenClawStateDatabaseReadOnly(({ db }) => executeSqliteQuerySync(db, getNodeSqliteKysely(db).selectFrom("diagnostic_events").select("payload_json").where("scope", "=", scope).orderBy("sequence", "asc")).rows.map((row) => JSON.parse(row.payload_json)), { env }) ?? [];
}
/** Writes recovery records into the caller-owned SQLite transaction when provided. */
function saveCronQuarantinedJobs(params) {
	if (params.entries.length === 0) return;
	const store = createSqliteAuditRecordStore({
		scope: cronQuarantineScope(params.storePath),
		maxEntries: Number.MAX_SAFE_INTEGER,
		...params.database ? { database: params.database } : {}
	});
	const records = params.entries.map((entry) => {
		const quarantinedAtMs = "quarantinedAtMs" in entry ? entry.quarantinedAtMs : params.nowMs;
		return {
			key: cronQuarantineEntryKey(entry),
			value: {
				...entry,
				quarantinedAtMs
			},
			createdAt: quarantinedAtMs
		};
	});
	store.registerLegacyMany(records);
}
//#endregion
//#region src/cron/store.ts
/** Public cron store load/save API backed entirely by shared SQLite state. */
const MAX_TRACKED_CRON_STORE_REVISIONS = 64;
const cronStoreRevisions = /* @__PURE__ */ new Map();
let nextCronStoreRevision = 0;
/** Reads the process-local committed revision for one canonical SQLite partition. */
function getCronJobsStoreRevision(storePath) {
	return cronStoreRevisions.get(cronStoreKey(storePath)) ?? 0;
}
function noteCronJobsStoreCommit(storeKey) {
	cronStoreRevisions.delete(storeKey);
	cronStoreRevisions.set(storeKey, ++nextCronStoreRevision);
	pruneMapToMaxSize(cronStoreRevisions, MAX_TRACKED_CRON_STORE_REVISIONS);
}
function resolveDefaultCronDir(env) {
	return path.join(resolveConfigDir(env), "cron");
}
function resolveDefaultCronStorePath(env) {
	return path.join(resolveDefaultCronDir(env), "jobs.json");
}
/** Resolves the cron jobs store path, expanding home-relative user input. */
function resolveCronJobsStorePath(storePath, env = process.env) {
	const selected = storePath?.trim() || readCronStoreStatePath(env);
	if (selected) {
		const raw = selected.trim();
		if (raw.startsWith("~")) return path.resolve(expandHomePrefix(raw, { env }));
		return path.resolve(raw);
	}
	return resolveDefaultCronStorePath(env);
}
/** Resolves the active cron partition from runtime config and environment. */
function resolveCronJobsStorePathFromConfig(cfg, env = process.env) {
	const store = cfg.cron?.store;
	return resolveCronJobsStorePath(typeof store === "string" ? store : void 0, env);
}
/** Loads cron jobs plus config/runtime sidecars from the SQLite-backed store. */
async function loadCronJobsStoreWithConfigJobs(storePath) {
	const storeKey = cronStoreKey(path.resolve(storePath));
	const database = openOpenClawStateDatabase().db;
	const rows = loadCronRows(database, storeKey);
	if (rows.length > 0) return loadedCronStoreFromRows(rows);
	return {
		store: {
			version: 1,
			jobs: []
		},
		configJobs: [],
		configJobIndexes: [],
		configJobRuntimeEntries: [],
		invalidConfigRows: []
	};
}
/** Removes an owned declarative job family left under obsolete absolute store keys. */
function removeStaleCronJobFamilyRows(storePath, family) {
	const activeStoreKey = cronStoreKey(path.resolve(storePath));
	return runOpenClawStateWriteTransaction(({ db }) => deleteStaleCronJobFamilyRows(db, activeStoreKey, family), {}, { operationLabel: "cron.job-family-adoption" });
}
function emptyLoadedCronStore() {
	return {
		store: {
			version: 1,
			jobs: []
		},
		configJobs: [],
		configJobIndexes: [],
		configJobRuntimeEntries: [],
		invalidConfigRows: []
	};
}
function tableExists(db, tableName) {
	return db.prepare("SELECT 1 AS ok FROM sqlite_master WHERE type = 'table' AND name = ?").get(tableName) !== void 0;
}
/** Loads cron jobs from an existing SQLite store without creating or migrating state. */
async function loadCronJobsStoreWithConfigJobsReadOnly(storePath, env = process.env) {
	const statePath = resolveOpenClawStateSqlitePath(env);
	if (!fs.existsSync(statePath)) return emptyLoadedCronStore();
	const storeKey = cronStoreKey(path.resolve(storePath));
	const db = openNodeSqliteDatabase(statePath, { readOnly: true });
	try {
		if (!tableExists(db, "cron_jobs")) return emptyLoadedCronStore();
		const rows = loadCronRows(db, storeKey);
		if (rows.length > 0) return loadedCronStoreFromRows(rows);
		return emptyLoadedCronStore();
	} finally {
		db.close();
	}
}
/** Loads only the persisted cron job store payload. */
async function loadCronJobsStore(storePath) {
	return (await loadCronJobsStoreWithConfigJobs(storePath)).store;
}
/** Synchronously loads only the persisted cron job store payload. */
function loadCronJobsStoreSync(storePath) {
	const storeKey = cronStoreKey(path.resolve(storePath));
	const database = openOpenClawStateDatabase().db;
	const rows = loadCronRows(database, storeKey);
	if (rows.length > 0) return loadedCronStoreFromRows(rows).store;
	return {
		version: 1,
		jobs: []
	};
}
/** Persists cron jobs, or only mutable runtime state when stateOnly is set. */
async function saveCronJobsStore(storePath, store, opts) {
	const resolvedStorePath = path.resolve(storePath);
	const storeKey = cronStoreKey(resolvedStorePath);
	const stateOnly = opts?.stateOnly === true && !opts.quarantine?.entries.length;
	if (!stateOnly) assertCronStoreCanPersist(store);
	runOpenClawStateWriteTransaction((database) => {
		if (opts?.quarantine?.entries.length) saveCronQuarantinedJobs({
			storePath: resolvedStorePath,
			entries: opts.quarantine.entries,
			nowMs: opts.quarantine.nowMs,
			database
		});
		if (stateOnly) {
			updateCronRuntimeRows(database.db, storeKey, store);
			return;
		}
		replaceCronRows(database.db, storeKey, store);
	});
	noteCronJobsStoreCommit(storeKey);
}
/** Atomically acquire doctor migration metadata and replace cron rows only for the winner. */
async function saveCronJobsStoreWithMetadata(storePath, store, acquireMetadata, quarantine) {
	const resolvedStorePath = path.resolve(storePath);
	const storeKey = cronStoreKey(resolvedStorePath);
	assertCronStoreCanPersist(store);
	const committed = runOpenClawStateWriteTransaction((database) => {
		if (!acquireMetadata(database.db)) return false;
		if (quarantine?.entries.length) saveCronQuarantinedJobs({
			storePath: resolvedStorePath,
			entries: quarantine.entries,
			nowMs: quarantine.nowMs,
			database
		});
		replaceCronRows(database.db, storeKey, store);
		return true;
	});
	if (committed) noteCronJobsStoreCommit(storeKey);
	return committed;
}
/** Resolves the public plugin-SDK cron store path. */
function resolveCronStorePath(storePath) {
	return resolveCronJobsStorePath(storePath);
}
/** Plugin-SDK alias for loading the cron store. */
async function loadCronStore(storePath) {
	return await loadCronJobsStore(storePath);
}
/** Plugin-SDK alias for saving the cron store. */
async function saveCronStore(storePath, store, opts) {
	await saveCronJobsStore(storePath, store, opts);
}
//#endregion
export { loadCronJobsStoreWithConfigJobsReadOnly as a, resolveCronJobsStorePath as c, saveCronJobsStore as d, saveCronJobsStoreWithMetadata as f, saveCronQuarantinedJobs as h, loadCronJobsStoreWithConfigJobs as i, resolveCronJobsStorePathFromConfig as l, loadCronQuarantinedJobs as m, loadCronJobsStore as n, loadCronStore as o, saveCronStore as p, loadCronJobsStoreSync as r, removeStaleCronJobFamilyRows as s, getCronJobsStoreRevision as t, resolveCronStorePath as u };
