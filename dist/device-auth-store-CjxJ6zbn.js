import { C as resolveStateDir } from "./paths-CL43LNS6.js";
import { h as getNodeSqliteKysely, m as executeSqliteQueryTakeFirstSync, p as executeSqliteQuerySync } from "./node-sqlite-B_0DgpUE.js";
import { d as openOpenClawStateDatabase, h as runOpenClawStateWriteTransaction } from "./openclaw-state-db-D9eH245j.js";
import { n as normalizeDeviceAuthScopes, t as normalizeDeviceAuthRole } from "./device-auth-C-STNejO.js";
import fs from "node:fs";
import path from "node:path";
//#region src/infra/device-auth-store.ts
const legacyPresenceCache = /* @__PURE__ */ new Map();
function assertNoLegacyDeviceAuth(env) {
	const stateDir = resolveStateDir(env);
	let hasLegacy = legacyPresenceCache.get(stateDir);
	if (hasLegacy === void 0) {
		hasLegacy = fs.existsSync(path.join(stateDir, "identity", "device-auth.json"));
		legacyPresenceCache.set(stateDir, hasLegacy);
	}
	if (hasLegacy) throw new Error("Legacy device auth requires migration; stop the Gateway and run `openclaw doctor --fix`.");
}
/** Forget one process-local legacy-state probe after Doctor removes the source. */
function resetLegacyDeviceAuthPresenceCache(env) {
	legacyPresenceCache.delete(resolveStateDir(env));
}
function fromRow(row) {
	try {
		const scopes = JSON.parse(row.scopes_json);
		if (!Array.isArray(scopes)) return null;
		return {
			token: row.token,
			role: row.role,
			scopes: normalizeDeviceAuthScopes(scopes),
			updatedAtMs: row.updated_at_ms
		};
	} catch {
		return null;
	}
}
/** Load one cached device-auth token from the shared SQLite state store. */
function loadDeviceAuthToken(params) {
	assertNoLegacyDeviceAuth(params.env);
	const { db } = openOpenClawStateDatabase({ env: params.env });
	const row = executeSqliteQueryTakeFirstSync(db, getNodeSqliteKysely(db).selectFrom("device_auth_tokens").select([
		"token",
		"role",
		"scopes_json",
		"updated_at_ms"
	]).where("device_id", "=", params.deviceId).where("role", "=", normalizeDeviceAuthRole(params.role)));
	return row ? fromRow(row) : null;
}
/** List cached role tokens for one device from the shared SQLite state store. */
function loadDeviceAuthTokens(params) {
	assertNoLegacyDeviceAuth(params.env);
	const { db } = openOpenClawStateDatabase({ env: params.env });
	return executeSqliteQuerySync(db, getNodeSqliteKysely(db).selectFrom("device_auth_tokens").select([
		"token",
		"role",
		"scopes_json",
		"updated_at_ms"
	]).where("device_id", "=", params.deviceId).orderBy("role")).rows.flatMap((row) => {
		const entry = fromRow(row);
		return entry ? [entry] : [];
	});
}
/** Persist or replace one device-auth role token in the shared SQLite state store. */
function storeDeviceAuthToken(params) {
	assertNoLegacyDeviceAuth(params.env);
	const entry = {
		token: params.token,
		role: normalizeDeviceAuthRole(params.role),
		scopes: normalizeDeviceAuthScopes(params.scopes),
		updatedAtMs: Date.now()
	};
	runOpenClawStateWriteTransaction(({ db }) => {
		executeSqliteQuerySync(db, getNodeSqliteKysely(db).insertInto("device_auth_tokens").values({
			device_id: params.deviceId,
			role: entry.role,
			token: entry.token,
			scopes_json: JSON.stringify(entry.scopes),
			updated_at_ms: entry.updatedAtMs
		}).onConflict((conflict) => conflict.columns(["device_id", "role"]).doUpdateSet({
			token: entry.token,
			scopes_json: JSON.stringify(entry.scopes),
			updated_at_ms: entry.updatedAtMs
		})));
	}, { env: params.env });
	return entry;
}
/** Remove one role token for the current gateway device from shared SQLite state. */
function clearDeviceAuthToken(params) {
	assertNoLegacyDeviceAuth(params.env);
	runOpenClawStateWriteTransaction(({ db }) => {
		executeSqliteQuerySync(db, getNodeSqliteKysely(db).deleteFrom("device_auth_tokens").where("device_id", "=", params.deviceId).where("role", "=", normalizeDeviceAuthRole(params.role)));
	}, { env: params.env });
}
//#endregion
export { storeDeviceAuthToken as a, resetLegacyDeviceAuthPresenceCache as i, loadDeviceAuthToken as n, loadDeviceAuthTokens as r, clearDeviceAuthToken as t };
