import { n as MAX_TIMER_TIMEOUT_MS } from "./number-coercion-Crk_c9KW.js";
import "./number-coercion-IpMOa8nH.js";
import { t as loggingState } from "./state-B1ZXWHS1.js";
import { h as getNodeSqliteKysely, m as executeSqliteQueryTakeFirstSync, p as executeSqliteQuerySync, s as isSqliteLockError } from "./node-sqlite-B_0DgpUE.js";
import { d as openOpenClawStateDatabase, h as runOpenClawStateWriteTransaction } from "./openclaw-state-db-D9eH245j.js";
import { n as computeBackoff, s as sleepWithAbort } from "./src-DKBD8PDy.js";
import { _ as runOpenClawAgentWriteTransaction, h as openOpenClawAgentDatabase } from "./openclaw-agent-db-DemdumbZ.js";
import "./backoff-CCtTkmwj.js";
import { randomUUID } from "node:crypto";
//#region src/state/openclaw-state-lease.ts
var OpenClawStateLeaseError = class extends Error {
	constructor(message, options) {
		super(message, { cause: options.cause });
		this.name = "OpenClawStateLeaseError";
		this.code = options.code;
	}
};
const ACQUIRE_BACKOFF = {
	initialMs: 25,
	maxMs: 250,
	factor: 1.5,
	jitter: .25
};
const MIN_LEASE_MS = 1e3;
const LEASE_DB_BUSY_TIMEOUT_MS = 0;
const RELEASE_RETRY_TIMEOUT_MS = 2e3;
const processExitLeaseCleanups = /* @__PURE__ */ new Set();
let processExitListenerInstalled = false;
function runProcessExitLeaseCleanups() {
	processExitListenerInstalled = false;
	const previousForceConsoleToStderr = loggingState.forceConsoleToStderr;
	loggingState.forceConsoleToStderr = true;
	try {
		for (const cleanup of processExitLeaseCleanups) try {
			cleanup();
		} catch {}
		processExitLeaseCleanups.clear();
	} finally {
		loggingState.forceConsoleToStderr = previousForceConsoleToStderr;
	}
}
function registerProcessExitLeaseCleanup(cleanup) {
	processExitLeaseCleanups.add(cleanup);
	if (!processExitListenerInstalled) {
		process.once("exit", runProcessExitLeaseCleanups);
		processExitListenerInstalled = true;
	}
	return () => {
		processExitLeaseCleanups.delete(cleanup);
		if (processExitLeaseCleanups.size === 0 && processExitListenerInstalled) {
			process.removeListener("exit", runProcessExitLeaseCleanups);
			processExitListenerInstalled = false;
		}
	};
}
function leaseError(code, message, cause) {
	return new OpenClawStateLeaseError(message, {
		code,
		...cause === void 0 ? {} : { cause }
	});
}
function invalidInput(message) {
	return leaseError("OPENCLAW_STATE_LEASE_INVALID_INPUT", message);
}
function validateDuration(value, label, minimum, maximum) {
	if (!Number.isInteger(value) || value < minimum || value > maximum) throw invalidInput(`${label} must be an integer between ${minimum} and ${maximum}`);
	return value;
}
function validateNonEmptyString(value, label) {
	if (typeof value !== "string" || !value.trim() || value.includes("\0")) throw invalidInput(`${label} must be a non-empty string without NUL bytes`);
	return value;
}
function validateOptions(options) {
	if (typeof options !== "object" || options === null || Array.isArray(options)) throw invalidInput("state lease options must be an object");
	if (options.signal !== void 0 && !(options.signal instanceof AbortSignal)) throw invalidInput("state lease signal must be an AbortSignal");
	const database = options.database;
	if (typeof database !== "object" || database === null || Array.isArray(database)) throw invalidInput("state lease database must be an object");
	if (database.scope !== "shared" && database.scope !== "agent") throw invalidInput("state lease database scope must be shared or agent");
	if (database.scope === "agent") validateNonEmptyString(database.agentId, "state lease agent database agentId");
	const leaseLabel = options.leaseLabel === void 0 ? "state lease" : validateNonEmptyString(options.leaseLabel, "state lease label");
	const operationLabel = options.operationLabel === void 0 ? "state.lease" : validateNonEmptyString(options.operationLabel, "state lease operationLabel");
	return {
		scope: validateNonEmptyString(options.scope, `${leaseLabel} scope`),
		key: validateNonEmptyString(options.key, `${leaseLabel} key`),
		database,
		leaseMs: validateDuration(options.leaseMs, `${leaseLabel} leaseMs`, MIN_LEASE_MS, MAX_TIMER_TIMEOUT_MS),
		waitMs: validateDuration(options.waitMs, `${leaseLabel} waitMs`, 0, MAX_TIMER_TIMEOUT_MS),
		signal: options.signal,
		leaseLabel,
		operationLabel,
		processOwner: options.processOwner,
		strictRelease: options.strictRelease === true
	};
}
function readBusyTimeout(database) {
	const row = database.prepare("PRAGMA busy_timeout").get();
	const value = row?.busy_timeout ?? row?.timeout;
	return typeof value === "bigint" ? Number(value) : Number(value ?? 0);
}
function withBusyTimeout(database, busyTimeoutMs, run) {
	const previousBusyTimeoutMs = readBusyTimeout(database);
	if (previousBusyTimeoutMs === busyTimeoutMs) return run();
	database.exec(`PRAGMA busy_timeout = ${busyTimeoutMs}`);
	try {
		return run();
	} finally {
		if (database.isOpen) database.exec(`PRAGMA busy_timeout = ${previousBusyTimeoutMs}`);
	}
}
function withLeaseWriteTransaction(database, operationLabel, operation, busyTimeoutMs = LEASE_DB_BUSY_TIMEOUT_MS) {
	if (database.scope === "shared") {
		const stateDatabase = openOpenClawStateDatabase(database.options);
		const run = () => runOpenClawStateWriteTransaction(({ db }) => operation(db, getNodeSqliteKysely(db)), database.options, {
			operationLabel,
			busyTimeoutMs
		});
		return withBusyTimeout(stateDatabase.db, busyTimeoutMs, run);
	}
	const agentOptions = {
		agentId: database.agentId,
		...database.path ? { path: database.path } : {}
	};
	const agentDatabase = openOpenClawAgentDatabase(agentOptions);
	const run = () => runOpenClawAgentWriteTransaction(({ db }) => operation(db, getNodeSqliteKysely(db)), agentOptions, {
		operationLabel,
		busyTimeoutMs
	});
	return withBusyTimeout(agentDatabase.db, busyTimeoutMs, run);
}
function withLeaseRead(database, operation) {
	const sqlite = database.scope === "shared" ? openOpenClawStateDatabase(database.options).db : openOpenClawAgentDatabase({
		agentId: database.agentId,
		...database.path ? { path: database.path } : {}
	}).db;
	return operation(sqlite, getNodeSqliteKysely(sqlite));
}
function processLeaseIsReclaimable(row, processOwner) {
	let payload;
	try {
		payload = row.payload_json ? JSON.parse(row.payload_json) : void 0;
	} catch {}
	const pid = payload?.pid;
	if (typeof pid !== "number" || !Number.isInteger(pid) || pid <= 0) return Number(row.expires_at) <= Date.now();
	if (!processOwner.isAlive(pid)) return true;
	const observedStartTime = processOwner.readStartTime(pid);
	return typeof payload?.starttime === "number" && Number.isInteger(payload.starttime) && payload.starttime >= 0 && observedStartTime !== null && payload.starttime !== observedStartTime;
}
function tryAcquire(params) {
	const observed = params.processOwner ? withLeaseRead(params.database, (db, kysely) => executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("state_leases").select([
		"owner",
		"expires_at",
		"payload_json"
	]).where("scope", "=", params.scope).where("lease_key", "=", params.key))) : void 0;
	const reclaimableOwner = observed && params.processOwner && processLeaseIsReclaimable(observed, params.processOwner) ? observed.owner : void 0;
	return withLeaseWriteTransaction(params.database, params.operationLabel, (db, kysely) => {
		const now = Date.now();
		if (!params.processOwner || reclaimableOwner) {
			let stale = kysely.deleteFrom("state_leases").where("scope", "=", params.scope).where("lease_key", "=", params.key);
			stale = reclaimableOwner ? stale.where("owner", "=", reclaimableOwner) : stale.where("expires_at", "<=", now);
			executeSqliteQuerySync(db, stale);
		}
		const expiresAt = now + params.leaseMs;
		return executeSqliteQuerySync(db, kysely.insertInto("state_leases").values({
			scope: params.scope,
			lease_key: params.key,
			owner: params.owner,
			expires_at: expiresAt,
			heartbeat_at: now,
			payload_json: params.processOwner ? JSON.stringify({
				pid: params.processOwner.pid,
				...params.processOwner.startTime === null ? {} : { starttime: params.processOwner.startTime }
			}) : null,
			created_at: now,
			updated_at: now
		}).onConflict((conflict) => conflict.columns(["scope", "lease_key"]).doNothing())).numAffectedRows === 1n ? expiresAt : void 0;
	});
}
function renew(params) {
	return withLeaseWriteTransaction(params.database, params.operationLabel, (db, kysely) => {
		const now = Date.now();
		const expiresAt = now + params.leaseMs;
		let update = kysely.updateTable("state_leases").set({
			expires_at: expiresAt,
			heartbeat_at: now,
			updated_at: now
		}).where("scope", "=", params.scope).where("lease_key", "=", params.key).where("owner", "=", params.owner);
		if (!params.processOwner) update = update.where("expires_at", ">", now);
		if (executeSqliteQuerySync(db, update).numAffectedRows !== 1n) throw leaseError("OPENCLAW_STATE_LEASE_LOST", `${params.leaseLabel} ${params.scope}/${params.key} was lost`);
		return expiresAt;
	});
}
function assertLeaseOwnedInDatabase(database, kysely, params) {
	const now = Date.now();
	let query = kysely.selectFrom("state_leases").select("owner").where("scope", "=", params.scope).where("lease_key", "=", params.key).where("owner", "=", params.owner);
	if (!params.processOwner) query = query.where("expires_at", ">", now);
	if (!executeSqliteQueryTakeFirstSync(database, query)) throw leaseError("OPENCLAW_STATE_LEASE_LOST", `${params.leaseLabel} ${params.scope}/${params.key} was lost`);
}
function verifyLeaseOwnership(params) {
	try {
		if (params.transaction) {
			assertLeaseOwnedInDatabase(params.transaction, getNodeSqliteKysely(params.transaction), params);
			return;
		}
		if (!params.database) throw new Error("state lease ownership check requires a database");
		withLeaseRead(params.database, (db, kysely) => assertLeaseOwnedInDatabase(db, kysely, params));
	} catch (error) {
		if (error instanceof OpenClawStateLeaseError) throw error;
		throw leaseError("OPENCLAW_STATE_LEASE_STORAGE_FAILED", `failed to verify ${params.leaseLabel} ${params.scope}/${params.key}`, error);
	}
}
function release(params) {
	withLeaseWriteTransaction(params.database, params.operationLabel, (db, kysely) => {
		executeSqliteQuerySync(db, kysely.deleteFrom("state_leases").where("scope", "=", params.scope).where("lease_key", "=", params.key).where("owner", "=", params.owner));
	});
}
async function releaseBestEffort(params, strict = false) {
	const deadline = performance.now() + RELEASE_RETRY_TIMEOUT_MS;
	let attempt = 0;
	while (true) try {
		release(params);
		return;
	} catch (error) {
		const now = performance.now();
		if (!isSqliteLockError(error) || now >= deadline) {
			if (strict) throw error;
			return;
		}
		attempt += 1;
		await sleepWithAbort(Math.min(deadline - now, computeBackoff(ACQUIRE_BACKOFF, attempt)));
	}
}
function abortError(signal, label, leaseLabel) {
	return leaseError("OPENCLAW_STATE_LEASE_ABORTED", `${leaseLabel} ${label} was aborted`, signal.reason);
}
/** Acquire a host-owned SQLite lease for callers whose lifecycle spans callbacks. */
async function acquireOpenClawStateLease(options) {
	const validated = validateOptions(options);
	if (validated.signal?.aborted) throw abortError(validated.signal, "acquisition", validated.leaseLabel);
	const owner = randomUUID();
	const deadline = performance.now() + validated.waitMs;
	let attempt = 0;
	let confirmedExpiresAt;
	while (confirmedExpiresAt === void 0) {
		if (validated.signal?.aborted) throw abortError(validated.signal, "acquisition", validated.leaseLabel);
		try {
			confirmedExpiresAt = tryAcquire({
				database: validated.database,
				operationLabel: validated.operationLabel,
				scope: validated.scope,
				key: validated.key,
				owner,
				leaseMs: validated.leaseMs,
				leaseLabel: validated.leaseLabel,
				processOwner: validated.processOwner
			});
		} catch (error) {
			if (error instanceof OpenClawStateLeaseError) throw error;
			if (!isSqliteLockError(error)) throw leaseError("OPENCLAW_STATE_LEASE_STORAGE_FAILED", `failed to acquire ${validated.leaseLabel} ${validated.scope}/${validated.key}`, error);
		}
		const now = performance.now();
		if (confirmedExpiresAt !== void 0) {
			if (validated.signal?.aborted || validated.waitMs > 0 && now >= deadline) {
				await releaseBestEffort({
					database: validated.database,
					operationLabel: validated.operationLabel,
					scope: validated.scope,
					key: validated.key,
					owner,
					leaseLabel: validated.leaseLabel
				});
				if (validated.signal?.aborted) throw abortError(validated.signal, "acquisition", validated.leaseLabel);
				throw leaseError("OPENCLAW_STATE_LEASE_TIMEOUT", `timed out waiting for ${validated.leaseLabel} ${validated.scope}/${validated.key}`);
			}
			break;
		}
		if (now >= deadline) throw leaseError("OPENCLAW_STATE_LEASE_TIMEOUT", `timed out waiting for ${validated.leaseLabel} ${validated.scope}/${validated.key}`);
		attempt += 1;
		const delayMs = Math.min(deadline - now, computeBackoff(ACQUIRE_BACKOFF, attempt));
		try {
			await sleepWithAbort(delayMs, validated.signal);
		} catch (error) {
			if (validated.signal?.aborted) throw abortError(validated.signal, "acquisition", validated.leaseLabel);
			throw error;
		}
	}
	const identity = {
		scope: validated.scope,
		key: validated.key,
		owner,
		leaseLabel: validated.leaseLabel,
		processOwner: validated.processOwner
	};
	const unregisterProcessExitCleanup = registerProcessExitLeaseCleanup(() => {
		release({
			...identity,
			database: validated.database,
			operationLabel: validated.operationLabel
		});
	});
	const leaseLost = new AbortController();
	const operationSignal = validated.signal ? AbortSignal.any([validated.signal, leaseLost.signal]) : leaseLost.signal;
	const heartbeatMs = Math.max(250, Math.min(3e4, Math.floor(validated.leaseMs / 3)));
	let expiryTimer;
	const abortLost = (cause) => {
		if (!leaseLost.signal.aborted) leaseLost.abort(cause instanceof OpenClawStateLeaseError ? cause : leaseError("OPENCLAW_STATE_LEASE_LOST", `${validated.leaseLabel} ${validated.scope}/${validated.key} expired`, cause));
	};
	const scheduleExpiry = () => {
		if (expiryTimer) clearTimeout(expiryTimer);
		expiryTimer = setTimeout(() => abortLost(), Math.max(1, (confirmedExpiresAt ?? Date.now()) - Date.now()));
		expiryTimer.unref?.();
	};
	if (!validated.processOwner) scheduleExpiry();
	const heartbeat = setInterval(() => {
		try {
			confirmedExpiresAt = renew({
				...identity,
				database: validated.database,
				operationLabel: validated.operationLabel,
				leaseMs: validated.leaseMs
			});
			if (!validated.processOwner) scheduleExpiry();
		} catch (error) {
			if (error instanceof OpenClawStateLeaseError && error.code === "OPENCLAW_STATE_LEASE_LOST") abortLost(error);
			else if (!validated.processOwner && confirmedExpiresAt !== void 0 && Date.now() >= confirmedExpiresAt) abortLost(error);
		}
	}, heartbeatMs);
	heartbeat.unref?.();
	const assertOperationOwned = () => {
		if (leaseLost.signal.aborted) throw leaseLost.signal.reason;
		if (validated.signal?.aborted) throw abortError(validated.signal, "operation", validated.leaseLabel);
		verifyLeaseOwnership({
			...identity,
			database: validated.database
		});
	};
	const assertOperationOwnedInTransaction = (database) => {
		if (leaseLost.signal.aborted) throw leaseLost.signal.reason;
		if (validated.signal?.aborted) throw abortError(validated.signal, "operation", validated.leaseLabel);
		verifyLeaseOwnership({
			...identity,
			transaction: database
		});
	};
	let released = false;
	let releasePromise;
	const clearLeaseLifecycle = () => {
		unregisterProcessExitCleanup();
		clearInterval(heartbeat);
		if (expiryTimer) clearTimeout(expiryTimer);
	};
	const releaseSynchronously = () => {
		if (released) return;
		release({
			...identity,
			database: validated.database,
			operationLabel: validated.operationLabel
		});
		released = true;
		clearLeaseLifecycle();
	};
	return {
		signal: operationSignal,
		assertOwned: assertOperationOwned,
		assertOwnedInTransaction: assertOperationOwnedInTransaction,
		releaseSynchronously,
		release: () => {
			if (released) return Promise.resolve();
			releasePromise ??= releaseBestEffort({
				...identity,
				database: validated.database,
				operationLabel: validated.operationLabel
			}, validated.strictRelease).then(() => {
				released = true;
				clearLeaseLifecycle();
			}, (error) => {
				releasePromise = void 0;
				throw error;
			});
			return releasePromise;
		}
	};
}
/** Run one trusted operation under a host-owned SQLite lease. */
async function withOpenClawStateLease(options, run) {
	const lease = await acquireOpenClawStateLease(options);
	try {
		lease.assertOwned();
		const result = await run(lease);
		lease.assertOwned();
		return result;
	} catch (error) {
		if (options.signal?.aborted) throw abortError(options.signal, "operation", options.leaseLabel ?? "state lease");
		if (lease.signal.aborted) throw lease.signal.reason;
		throw error;
	} finally {
		await lease.release();
	}
}
//#endregion
export { acquireOpenClawStateLease as n, withOpenClawStateLease as r, OpenClawStateLeaseError as t };
