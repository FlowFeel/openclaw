import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { C as resolveStateDir } from "./paths-CL43LNS6.js";
import { r as LEGACY_IMPLICIT_AGENT_ID } from "./session-key-DtTE9-Tg.js";
import { i as resolveRegisteredAgentIdForDir } from "./agent-dir-registry-DBWwXoA1.js";
import { d as clearNodeSqliteKyselyCacheForDatabase, h as getNodeSqliteKysely, m as executeSqliteQueryTakeFirstSync, p as executeSqliteQuerySync, t as openNodeSqliteDatabase } from "./node-sqlite-BJTPe7U8.js";
import { z as resolveSqliteDatabaseFilePaths } from "./openclaw-state-db-BU55lNCH.js";
import { a as readSqliteUserVersion, c as OPENCLAW_SQLITE_BUSY_TIMEOUT_MS } from "./openclaw-state-db.paths-2PkDmkRl.js";
import { o as sha256HexPrefix } from "./crypto-digest-CmUwt1S-.js";
import { _ as runOpenClawAgentWriteTransaction } from "./openclaw-agent-db--PLC25lY.js";
import "./openclaw-agent-db-migration-required-BU5hc3wx.js";
import fs from "node:fs";
import path from "node:path";
//#region src/agents/auth-profiles/shared-main-dir.ts
/** Resolve the shipped shared-main auth store, including its supported relocation. */
function resolveSharedMainAuthAgentDir(env = process.env) {
	const configured = env.OPENCLAW_AGENT_DIR?.trim();
	return configured ? resolveUserPath(configured, env) : path.join(resolveStateDir(env), "agents", LEGACY_IMPLICIT_AGENT_ID, "agent");
}
//#endregion
//#region src/agents/auth-profiles/sqlite.ts
/**
* SQLite persistence adapter for auth profile secrets and runtime state.
* The public helpers expose raw JSON payloads so normalization stays in the
* store/state layers that own compatibility rules.
*/
const PRIMARY_ROW_KEY = "primary";
function resolveAgentDir(agentDir) {
	if (agentDir) return resolveUserPath(agentDir);
	return resolveSharedMainAuthAgentDir();
}
function inferAgentIdFromDir(agentDir) {
	const normalized = path.normalize(agentDir);
	if (path.basename(normalized) === "agent") {
		const parent = path.basename(path.dirname(normalized));
		if (parent) return parent;
	}
	return `custom-${sha256HexPrefix(normalized, 12)}`;
}
function resolveAuthProfileDatabaseOptions(agentDir) {
	const dir = resolveAgentDir(agentDir);
	return {
		agentId: resolveRegisteredAgentIdForDir(dir) ?? inferAgentIdFromDir(dir),
		path: path.join(dir, "openclaw-agent.sqlite")
	};
}
/** Resolves the SQLite database path that stores auth profiles for an agent dir. */
function resolveAuthProfileDatabasePath(agentDir) {
	return resolveAuthProfileDatabaseOptions(agentDir).path;
}
/** Resolves the durable agent owner expected for an auth-profile database. */
function resolveAuthProfileDatabaseOwnerId(agentDir) {
	return resolveAuthProfileDatabaseOptions(agentDir).agentId;
}
/** Resolves the SQLite database and sidecar paths used by auth profiles. */
function resolveAuthProfileDatabaseFilePaths(agentDir) {
	return resolveSqliteDatabaseFilePaths(resolveAuthProfileDatabasePath(agentDir));
}
function parseJsonCell(raw) {
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function getAuthProfileKysely(db) {
	return getNodeSqliteKysely(db);
}
function inspectAuthProfileJsonCell(db, target) {
	const kysely = getAuthProfileKysely(db);
	let raw;
	if (target === "store") {
		const row = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("auth_profile_store").select("store_json").where("store_key", "=", PRIMARY_ROW_KEY));
		if (!row) return {
			status: "missing",
			reason: "row"
		};
		raw = row.store_json;
	} else {
		const row = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("auth_profile_state").select("state_json").where("state_key", "=", PRIMARY_ROW_KEY));
		if (!row) return {
			status: "missing",
			reason: "row"
		};
		raw = row.state_json;
	}
	try {
		return {
			status: "readable",
			raw: JSON.parse(raw)
		};
	} catch {
		return { status: "unreadable" };
	}
}
function inspectAuthProfileJsonCellReadOnly(pathname, target) {
	let db;
	try {
		db = openNodeSqliteDatabase(pathname, { readOnly: true });
		db.exec(`PRAGMA busy_timeout = ${OPENCLAW_SQLITE_BUSY_TIMEOUT_MS};`);
		if (readSqliteUserVersion(db) > 16) return { status: "unreadable" };
		const tableName = target === "store" ? "auth_profile_store" : "auth_profile_state";
		const schemaObject = db.prepare("SELECT type FROM sqlite_master WHERE name = ?").get(tableName);
		if (!schemaObject) return {
			status: "missing",
			reason: "table"
		};
		if (schemaObject.type !== "table") return { status: "unreadable" };
		return inspectAuthProfileJsonCell(db, target);
	} catch {
		return { status: "unreadable" };
	} finally {
		if (db) {
			clearNodeSqliteKyselyCacheForDatabase(db);
			db.close();
		}
	}
}
function readAuthProfileJsonCellReadOnly(pathname, target) {
	const result = inspectAuthProfileJsonCellReadOnly(pathname, target);
	return result.status === "readable" ? result.raw : null;
}
/** Distinguishes an absent auth row from a present store that could not be read. */
function inspectPersistedAuthProfileStoreRaw(agentDir, database) {
	if (database) return inspectAuthProfileJsonCell(database.db, "store");
	const databasePath = resolveAuthProfileDatabasePath(agentDir);
	if (!fs.existsSync(databasePath)) return {
		status: "missing",
		reason: "database"
	};
	return inspectAuthProfileJsonCellReadOnly(databasePath, "store");
}
/** Distinguishes an absent auth-state row from state that could not be read. */
function inspectPersistedAuthProfileStateRaw(agentDir, database) {
	if (database) return inspectAuthProfileJsonCell(database.db, "state");
	const databasePath = resolveAuthProfileDatabasePath(agentDir);
	if (!fs.existsSync(databasePath)) return {
		status: "missing",
		reason: "database"
	};
	return inspectAuthProfileJsonCellReadOnly(databasePath, "state");
}
/** Reads the raw persisted secrets-store payload without coercing the schema. */
function readPersistedAuthProfileStoreRaw(agentDir, database) {
	if (database) {
		const db = getAuthProfileKysely(database.db);
		return parseJsonCell(executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("auth_profile_store").select("store_json").where("store_key", "=", PRIMARY_ROW_KEY))?.store_json);
	}
	const databasePath = resolveAuthProfileDatabasePath(agentDir);
	if (!fs.existsSync(databasePath)) return null;
	return readAuthProfileJsonCellReadOnly(databasePath, "store");
}
/** Reads the raw persisted runtime-state payload without coercing the schema. */
function readPersistedAuthProfileStateRaw(agentDir, database) {
	if (database) {
		const db = getAuthProfileKysely(database.db);
		return parseJsonCell(executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("auth_profile_state").select("state_json").where("state_key", "=", PRIMARY_ROW_KEY))?.state_json);
	}
	const databasePath = resolveAuthProfileDatabasePath(agentDir);
	if (!fs.existsSync(databasePath)) return null;
	return readAuthProfileJsonCellReadOnly(databasePath, "state");
}
/** Writes the raw persisted secrets-store payload inside the auth database. */
function writePersistedAuthProfileStoreRaw(payload, agentDir, database) {
	const write = (target) => {
		const db = getAuthProfileKysely(target.db);
		executeSqliteQuerySync(target.db, db.insertInto("auth_profile_store").values({
			store_key: PRIMARY_ROW_KEY,
			store_json: JSON.stringify(payload),
			updated_at: Date.now()
		}).onConflict((conflict) => conflict.column("store_key").doUpdateSet({
			store_json: JSON.stringify(payload),
			updated_at: Date.now()
		})));
	};
	if (database) {
		write(database);
		return;
	}
	runOpenClawAgentWriteTransaction(write, resolveAuthProfileDatabaseOptions(agentDir));
}
/** Deletes the persisted secrets-store row while leaving runtime state intact. */
function deletePersistedAuthProfileStoreRaw(agentDir, database) {
	const remove = (target) => {
		const db = getAuthProfileKysely(target.db);
		executeSqliteQuerySync(target.db, db.deleteFrom("auth_profile_store").where("store_key", "=", PRIMARY_ROW_KEY));
	};
	if (database) {
		remove(database);
		return;
	}
	runOpenClawAgentWriteTransaction(remove, resolveAuthProfileDatabaseOptions(agentDir));
}
/** Writes or deletes the persisted runtime-state payload. */
function writePersistedAuthProfileStateRaw(payload, agentDir, database) {
	const write = (target) => {
		const db = getAuthProfileKysely(target.db);
		if (!payload) {
			executeSqliteQuerySync(target.db, db.deleteFrom("auth_profile_state").where("state_key", "=", PRIMARY_ROW_KEY));
			return;
		}
		executeSqliteQuerySync(target.db, db.insertInto("auth_profile_state").values({
			state_key: PRIMARY_ROW_KEY,
			state_json: JSON.stringify(payload),
			updated_at: Date.now()
		}).onConflict((conflict) => conflict.column("state_key").doUpdateSet({
			state_json: JSON.stringify(payload),
			updated_at: Date.now()
		})));
	};
	if (database) {
		write(database);
		return;
	}
	runOpenClawAgentWriteTransaction(write, resolveAuthProfileDatabaseOptions(agentDir));
}
/** Runs an auth-profile database write transaction for store/state updates. */
function runAuthProfileWriteTransaction(agentDir, operation, options = {}) {
	return runOpenClawAgentWriteTransaction(operation, {
		...resolveAuthProfileDatabaseOptions(agentDir),
		...options.stateDir ? { env: {
			...process.env,
			OPENCLAW_STATE_DIR: options.stateDir
		} } : {}
	});
}
//#endregion
export { readPersistedAuthProfileStoreRaw as a, resolveAuthProfileDatabasePath as c, writePersistedAuthProfileStoreRaw as d, resolveSharedMainAuthAgentDir as f, readPersistedAuthProfileStateRaw as i, runAuthProfileWriteTransaction as l, inspectPersistedAuthProfileStateRaw as n, resolveAuthProfileDatabaseFilePaths as o, inspectPersistedAuthProfileStoreRaw as r, resolveAuthProfileDatabaseOwnerId as s, deletePersistedAuthProfileStoreRaw as t, writePersistedAuthProfileStateRaw as u };
