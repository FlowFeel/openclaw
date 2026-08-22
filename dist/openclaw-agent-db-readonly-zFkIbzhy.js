import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { d as clearNodeSqliteKyselyCacheForDatabase, t as openNodeSqliteDatabase } from "./node-sqlite-BJTPe7U8.js";
import "./openclaw-state-db-BU55lNCH.js";
import { c as OPENCLAW_SQLITE_BUSY_TIMEOUT_MS } from "./openclaw-state-db.paths-2PkDmkRl.js";
import { A as assertSupportedAgentSchemaVersion, D as assertCanonicalAgentMediaPersistenceVersion, O as assertExistingAgentSchemaOwner, it as resolveOpenClawAgentSqlitePath, j as readExistingAgentSchemaMeta, nt as isIncognitoOpenClawAgentSqlitePath, u as getOpenClawAgentDatabaseIfOpen } from "./openclaw-agent-db--PLC25lY.js";
import fs from "node:fs";
//#region src/state/openclaw-agent-db-readonly.ts
function isMissingTableError(error) {
	return error instanceof Error && error.code === "ERR_SQLITE_ERROR" && /\bno such table:/iu.test(error.message);
}
/**
* Look up a process-held handle without adopting writer-side failures.
*
* Read-only reads are meant to survive a latched open failure or an ownership
* mismatch that only the writable lifecycle cares about; those callers fall
* back to a fresh connection, which reports the precise reason.
*/
function findOpenAgentDatabase(options) {
	try {
		return getOpenClawAgentDatabaseIfOpen(options);
	} catch {
		return;
	}
}
/** Read agent state without creating, registering, migrating, or joining its writable lifecycle. */
function withOpenClawAgentDatabaseReadOnly(operation, options) {
	const agentId = normalizeAgentId(options.agentId);
	const pathname = resolveOpenClawAgentSqlitePath({
		...options,
		agentId
	});
	if (isIncognitoOpenClawAgentSqlitePath(pathname, {
		agentId,
		env: options.env
	})) {
		const database = getOpenClawAgentDatabaseIfOpen({
			...options,
			agentId
		});
		return database ? {
			found: true,
			value: operation(database)
		} : {
			found: false,
			reason: "database-missing"
		};
	}
	const opened = findOpenAgentDatabase({
		...options,
		agentId
	});
	if (opened && !opened.db.isTransaction) {
		assertSupportedAgentSchemaVersion(opened.db, pathname);
		try {
			return {
				found: true,
				value: operation(opened)
			};
		} catch (error) {
			if (isMissingTableError(error)) return {
				found: false,
				reason: "table-missing"
			};
			throw error;
		}
	}
	if (!fs.existsSync(pathname)) return {
		found: false,
		reason: "database-missing"
	};
	const db = openNodeSqliteDatabase(pathname, { readOnly: true });
	try {
		db.exec(`PRAGMA busy_timeout = ${OPENCLAW_SQLITE_BUSY_TIMEOUT_MS};`);
		assertSupportedAgentSchemaVersion(db, pathname);
		assertCanonicalAgentMediaPersistenceVersion(db, pathname);
		const schemaMeta = readExistingAgentSchemaMeta(db);
		if (!schemaMeta) return {
			found: false,
			reason: "schema-missing"
		};
		assertExistingAgentSchemaOwner(schemaMeta, agentId, pathname);
		try {
			return {
				found: true,
				value: operation({
					agentId,
					db,
					path: pathname
				})
			};
		} catch (error) {
			if (isMissingTableError(error)) return {
				found: false,
				reason: "table-missing"
			};
			throw error;
		}
	} finally {
		clearNodeSqliteKyselyCacheForDatabase(db);
		db.close();
	}
}
//#endregion
export { withOpenClawAgentDatabaseReadOnly as t };
