import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { d as clearNodeSqliteKyselyCacheForDatabase, h as getNodeSqliteKysely, p as executeSqliteQuerySync, t as openNodeSqliteDatabase } from "./node-sqlite-BJTPe7U8.js";
import "./openclaw-state-db-BU55lNCH.js";
import { a as readSqliteUserVersion, c as OPENCLAW_SQLITE_BUSY_TIMEOUT_MS, i as describeRunningOpenClawBuild, n as resolveOpenClawStateSqlitePath, s as OPENCLAW_DATABASE_SCHEMA_DOCS_URL } from "./openclaw-state-db.paths-2PkDmkRl.js";
import { existsSync } from "node:fs";
import path from "node:path";
//#region src/state/openclaw-database-preflight.ts
function formatDoctorIncompatibleDatabase(database) {
	const agent = database.agentId ? ` for agent ${database.agentId}` : "";
	const writer = database.writerAppVersion ? `; writer build ${database.writerAppVersion}` : "";
	return `${database.kind} database${agent} ${database.path} uses schema ${database.foundVersion}; this build supports ${database.supportedVersion}${writer}.`;
}
/** Fatal refusal when persisted schemas were written by a newer build. */
var OpenClawDatabaseSchemaPreflightError = class extends Error {
	constructor(incompatibleDatabases, options = {}) {
		const operation = options.operation ?? "gateway-startup";
		const prefix = operation === "doctor" ? "Doctor refused to continue" : "Gateway refused startup";
		const doctorGuidance = operation === "doctor" ? ` ${incompatibleDatabases.map(formatDoctorIncompatibleDatabase).join(" ")} Run Doctor with the OpenClaw install that wrote this state (typically the active Gateway install), or another build that supports these schemas.` : "";
		super(`${prefix} because ${incompatibleDatabases.length} OpenClaw database schema(s) are newer than this build. Refused by ${describeRunningOpenClawBuild()}.${doctorGuidance} See ${OPENCLAW_DATABASE_SCHEMA_DOCS_URL}.`);
		this.incompatibleDatabases = incompatibleDatabases;
		this.name = "OpenClawDatabaseSchemaPreflightError";
	}
};
function readWriterAppVersion(database) {
	try {
		const row = database.prepare("SELECT app_version FROM schema_meta WHERE meta_key = 'primary' LIMIT 1").get();
		return typeof row?.app_version === "string" && row.app_version.length > 0 ? row.app_version : void 0;
	} catch {
		return;
	}
}
function readRegisteredAgentDatabases(database) {
	if (!database.prepare("SELECT 1 AS ok FROM sqlite_master WHERE type = 'table' AND name = 'agent_databases'").get()) return [];
	return executeSqliteQuerySync(database, getNodeSqliteKysely(database).selectFrom("agent_databases").select(["agent_id", "path"])).rows.flatMap((row) => typeof row.agent_id === "string" && typeof row.path === "string" ? [{
		agentId: row.agent_id,
		path: row.path
	}] : []);
}
/** Read schema headers; report unreadable existing files without diagnosing or repairing them. */
function preflightOpenClawDatabaseSchemas(options) {
	const result = {
		incompatible: [],
		indeterminate: []
	};
	const statePath = path.resolve(resolveOpenClawStateSqlitePath(options.env));
	if (!existsSync(statePath)) return result;
	let stateDatabase;
	try {
		stateDatabase = openNodeSqliteDatabase(statePath, { readOnly: true });
		stateDatabase.exec(`PRAGMA busy_timeout = ${OPENCLAW_SQLITE_BUSY_TIMEOUT_MS};`);
		const stateVersion = readSqliteUserVersion(stateDatabase);
		if (stateVersion > options.supportedVersions.state) {
			const writerAppVersion = readWriterAppVersion(stateDatabase);
			result.incompatible.push({
				kind: "state",
				path: statePath,
				foundVersion: stateVersion,
				supportedVersion: options.supportedVersions.state,
				...writerAppVersion ? { writerAppVersion } : {}
			});
		}
		let registeredDatabases;
		try {
			registeredDatabases = readRegisteredAgentDatabases(stateDatabase);
		} catch (error) {
			result.indeterminate.push({
				kind: "state",
				path: statePath,
				reason: `agent database registry query failed: ${formatErrorMessage(error)}`
			});
			return result;
		}
		for (const row of registeredDatabases) {
			const agentPath = path.resolve(row.path);
			if (!existsSync(agentPath)) continue;
			let agentDatabase;
			try {
				agentDatabase = openNodeSqliteDatabase(agentPath, { readOnly: true });
				agentDatabase.exec(`PRAGMA busy_timeout = ${OPENCLAW_SQLITE_BUSY_TIMEOUT_MS};`);
				const agentVersion = readSqliteUserVersion(agentDatabase);
				if (agentVersion <= options.supportedVersions.agent) continue;
				const writerAppVersion = readWriterAppVersion(agentDatabase);
				result.incompatible.push({
					kind: "agent",
					path: agentPath,
					agentId: row.agentId,
					foundVersion: agentVersion,
					supportedVersion: options.supportedVersions.agent,
					...writerAppVersion ? { writerAppVersion } : {}
				});
			} catch (error) {
				result.indeterminate.push({
					kind: "agent",
					path: agentPath,
					reason: formatErrorMessage(error)
				});
			} finally {
				agentDatabase?.close();
			}
		}
		return result;
	} catch (error) {
		result.indeterminate.push({
			kind: "state",
			path: statePath,
			reason: formatErrorMessage(error)
		});
		return result;
	} finally {
		if (stateDatabase) {
			clearNodeSqliteKyselyCacheForDatabase(stateDatabase);
			stateDatabase.close();
		}
	}
}
//#endregion
export { preflightOpenClawDatabaseSchemas as n, OpenClawDatabaseSchemaPreflightError as t };
