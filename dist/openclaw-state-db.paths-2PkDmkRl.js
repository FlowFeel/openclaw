import { y as parseStrictNonNegativeInteger } from "./number-coercion-Crk_c9KW.js";
import "./parse-finite-number-CG8VFQF4.js";
import { n as resolveOpenClawPackageRootSync } from "./openclaw-root-DSkQ6e_8.js";
import { C as resolveStateDir } from "./paths-CL43LNS6.js";
import { n as VERSION } from "./version-CeFj_iGk.js";
import { t as resolveCommitHash } from "./git-commit-BNs9G2AE.js";
import path from "node:path";
import os from "node:os";
import { isMainThread, threadId } from "node:worker_threads";
//#region src/state/openclaw-state-db-contract.ts
const OPENCLAW_STATE_SCHEMA_VERSION = 6;
const LAZY_ADDITIVE_STATE_TABLES = [
	"model_catalog_remote",
	"sidebar_sections",
	"skill_workshop_proposal_events",
	"skill_workshop_proposal_origin_runs",
	"skill_workshop_proposal_rollbacks",
	"skill_workshop_proposals"
];
/** Maximum time one synchronous SQLite call may wait for a lock. */
const OPENCLAW_SQLITE_BUSY_TIMEOUT_MS = 5e3;
/** User-facing guide for schema refusals; lives here so error sites avoid import cycles. */
const OPENCLAW_DATABASE_SCHEMA_DOCS_URL = "https://docs.openclaw.ai/reference/database-schemas";
//#endregion
//#region src/infra/sqlite-user-version.ts
function readSqliteUserVersion(db) {
	const row = db.prepare("PRAGMA user_version").get();
	return Number(row?.user_version ?? 0);
}
/**
* Name the refusing install the way `--version` does, plus the root it runs from.
* The path is the only part an operator can always act on: one release version
* string spans many commits, and a linked source checkout reports its git HEAD
* even when the built output actually executing is older.
*/
function describeRunningOpenClawBuild() {
	const moduleUrl = import.meta.url;
	const commit = resolveCommitHash({ moduleUrl });
	const root = resolveOpenClawPackageRootSync({ moduleUrl });
	const identity = commit ? `OpenClaw ${VERSION} (${commit})` : `OpenClaw ${VERSION}`;
	return root ? `${identity} installed at ${root}` : identity;
}
function createNewerSqliteSchemaVersionError(databaseLabel, pathname, schemaVersion, supportedVersion) {
	const error = /* @__PURE__ */ new Error(`${databaseLabel} ${pathname} uses newer schema version ${schemaVersion}; this build supports ${supportedVersion}. Refused by ${describeRunningOpenClawBuild()}. Identify installs by that path: one version string spans many builds, and a linked source checkout reports its git HEAD even when its built output is older. Run a build that supports schema ${schemaVersion} or newer against this state directory — rebuild or update the install above — or point this build at a different OPENCLAW_STATE_DIR. See ${OPENCLAW_DATABASE_SCHEMA_DOCS_URL}.`);
	error.name = "SqliteSchemaVersionError";
	return error;
}
//#endregion
//#region src/state/openclaw-state-db.paths.ts
/**
* Path helpers for the shared OpenClaw SQLite state database.
*
* Tests get worker-scoped temp state roots unless they explicitly provide
* `OPENCLAW_STATE_DIR`, which prevents parallel Vitest workers from sharing WAL files.
*/
function resolveOpenClawStateRootDir(env) {
	if (env.OPENCLAW_STATE_DIR?.trim()) return resolveStateDir(env);
	if (env.VITEST || env.NODE_ENV === "test") {
		const workerId = parseStrictNonNegativeInteger(env.VITEST_WORKER_ID ?? env.VITEST_POOL_ID ?? "");
		const shardSuffix = workerId !== void 0 ? `${process.pid}-${workerId}` : isMainThread ? String(process.pid) : `${process.pid}-${threadId}`;
		return path.join(os.tmpdir(), "openclaw-test-state", shardSuffix);
	}
	return resolveStateDir(env);
}
/** Resolve the directory that contains the shared state SQLite file. */
function resolveOpenClawStateSqliteDir(env = process.env) {
	return path.join(resolveOpenClawStateRootDir(env), "state");
}
/** Resolve the shared state SQLite file path. */
function resolveOpenClawStateSqlitePath(env = process.env) {
	return path.join(resolveOpenClawStateSqliteDir(env), "openclaw.sqlite");
}
//#endregion
export { readSqliteUserVersion as a, OPENCLAW_SQLITE_BUSY_TIMEOUT_MS as c, describeRunningOpenClawBuild as i, OPENCLAW_STATE_SCHEMA_VERSION as l, resolveOpenClawStateSqlitePath as n, LAZY_ADDITIVE_STATE_TABLES as o, createNewerSqliteSchemaVersionError as r, OPENCLAW_DATABASE_SCHEMA_DOCS_URL as s, resolveOpenClawStateSqliteDir as t };
