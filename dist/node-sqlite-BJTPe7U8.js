import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { t as installProcessWarningFilter } from "./warning-filter-z3hZGeVP.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { createRequire } from "node:module";
import path from "node:path";
import { InsertQueryNode, Kysely, SqliteDialect } from "kysely";
//#region src/infra/kysely-sync.ts
const kyselyByDatabase = /* @__PURE__ */ new WeakMap();
const queryErrorHandlerByDatabase = /* @__PURE__ */ new WeakMap();
const statementCacheSymbol = Symbol("openclaw.kyselySyncStatementCache");
const statementInvalidationSymbol = Symbol("openclaw.kyselySyncStatementInvalidation");
const statementCacheEnabledSymbol = Symbol("openclaw.kyselySyncStatementCacheEnabled");
const authorizerActiveSymbol = Symbol("openclaw.kyselySyncAuthorizerActive");
const statementCacheCapacity = 32;
const statementCacheEntryBytes = 64 * 1024;
const compileOnlySqliteDialect = new SqliteDialect({ database: async () => {
	throw new Error("getNodeSqliteKysely() returns a compile-only Kysely facade; use executeSqliteQuerySync() to execute node:sqlite queries.");
} });
function getNodeSqliteKysely(db) {
	const existing = kyselyByDatabase.get(db);
	if (existing) return existing;
	const kysely = new Kysely({ dialect: compileOnlySqliteDialect });
	kyselyByDatabase.set(db, kysely);
	return kysely;
}
/** Register the lifecycle owner's handler for synchronous Kysely query failures. */
function registerNodeSqliteKyselyQueryErrorHandler(db, handler) {
	queryErrorHandlerByDatabase.set(db, handler);
}
function reportNodeSqliteKyselyQueryError(db, error) {
	try {
		queryErrorHandlerByDatabase.get(db)?.(error);
	} catch {}
}
function installStatementInvalidation(owner) {
	if (owner[statementInvalidationSymbol]) return;
	if (typeof owner.setAuthorizer === "function") {
		const setAuthorizer = owner.setAuthorizer.bind(owner);
		Object.defineProperty(owner, "setAuthorizer", {
			configurable: true,
			writable: true,
			value(callback) {
				setAuthorizer(callback);
				this[authorizerActiveSymbol] = callback !== null;
				delete this[statementCacheSymbol];
			}
		});
	}
	if (typeof owner.deserialize === "function") {
		const deserialize = owner.deserialize.bind(owner);
		Object.defineProperty(owner, "deserialize", {
			configurable: true,
			writable: true,
			value(...args) {
				try {
					deserialize(...args);
				} finally {
					delete this[statementCacheSymbol];
				}
			}
		});
	}
	if (typeof owner.close === "function") {
		const close = owner.close.bind(owner);
		Object.defineProperty(owner, "close", {
			configurable: true,
			writable: true,
			value() {
				clearNodeSqliteKyselyCacheForDatabase(this);
				return close();
			}
		});
	}
	if (typeof owner[Symbol.dispose] === "function") {
		const dispose = owner[Symbol.dispose].bind(owner);
		Object.defineProperty(owner, Symbol.dispose, {
			configurable: true,
			writable: true,
			value() {
				clearNodeSqliteKyselyCacheForDatabase(this);
				return dispose();
			}
		});
	}
	Object.defineProperty(owner, statementInvalidationSymbol, {
		configurable: true,
		value: true
	});
}
/**
* Enable bounded statement caching for a lifecycle-owned database that has not
* installed an authorizer before this call.
*/
function enableNodeSqliteKyselyStatementCache(db) {
	const owner = db;
	installStatementInvalidation(owner);
	owner[statementCacheEnabledSymbol] = true;
}
function queryFitsStatementCache(sql, parameters) {
	let bytes = Buffer.byteLength(sql);
	if (bytes > statementCacheEntryBytes) return false;
	for (const parameter of parameters) {
		if (typeof parameter === "string") bytes += Buffer.byteLength(parameter);
		else if (ArrayBuffer.isView(parameter)) bytes += parameter.byteLength;
		if (bytes > statementCacheEntryBytes) return false;
	}
	return true;
}
function executeWithCachedStatement(db, sql, parameters, execute) {
	const owner = db;
	installStatementInvalidation(owner);
	if (!owner[statementCacheEnabledSymbol] || owner[authorizerActiveSymbol] || !queryFitsStatementCache(sql, parameters)) return execute(db.prepare(sql));
	let cache = owner[statementCacheSymbol];
	if (!cache) {
		cache = {
			statements: /* @__PURE__ */ new Map(),
			candidates: /* @__PURE__ */ new Set(),
			active: /* @__PURE__ */ new WeakSet()
		};
		Object.defineProperty(owner, statementCacheSymbol, {
			configurable: true,
			value: cache
		});
	}
	const cached = cache.statements.get(sql);
	let statement;
	if (cached && !cache.active.has(cached)) {
		cache.statements.delete(sql);
		cache.statements.set(sql, cached);
		statement = cached;
	} else {
		statement = db.prepare(sql);
		if (!cached && cache.candidates.delete(sql)) {
			cache.statements.set(sql, statement);
			pruneMapToMaxSize(cache.statements, statementCacheCapacity);
		} else if (!cached) {
			cache.candidates.add(sql);
			if (cache.candidates.size > statementCacheCapacity) {
				const oldestCandidate = cache.candidates.values().next().value;
				if (oldestCandidate !== void 0) cache.candidates.delete(oldestCandidate);
			}
		}
	}
	cache.active.add(statement);
	try {
		return execute(statement);
	} finally {
		cache.active.delete(statement);
	}
}
/** Execute a compiled Kysely query synchronously against node:sqlite. */
function executeCompiledSqliteQuerySync(db, compiledQuery) {
	const parameters = compiledQuery.parameters;
	try {
		return executeWithCachedStatement(db, compiledQuery.sql, parameters, (statement) => {
			if (statement.columns().length > 0) {
				const iterator = statement.iterate(...parameters);
				try {
					return { rows: [...iterator] };
				} catch (error) {
					try {
						iterator.return?.();
					} catch {}
					throw error;
				}
			}
			const { changes, lastInsertRowid } = statement.run(...parameters);
			const result = {
				numAffectedRows: BigInt(changes),
				rows: []
			};
			if (InsertQueryNode.is(compiledQuery.query) && changes > 0) return {
				...result,
				insertId: BigInt(lastInsertRowid)
			};
			return result;
		});
	} catch (error) {
		reportNodeSqliteKyselyQueryError(db, error);
		throw error;
	}
}
/** Compile and execute a Kysely query synchronously. */
function executeSqliteQuerySync(db, query) {
	return executeCompiledSqliteQuerySync(db, query.compile());
}
/** Compile and lazily iterate a Kysely query synchronously against node:sqlite. */
function* iterateSqliteQuerySync(db, query) {
	const compiledQuery = query.compile();
	try {
		const statement = db.prepare(compiledQuery.sql);
		if (statement.columns().length === 0) return;
		const parameters = compiledQuery.parameters;
		const iterator = statement.iterate(...parameters);
		try {
			yield* iterator;
		} catch (error) {
			try {
				iterator.return?.();
			} catch {}
			throw error;
		}
	} catch (error) {
		reportNodeSqliteKyselyQueryError(db, error);
		throw error;
	}
}
/** Execute a Kysely query synchronously and return its first row. */
function executeSqliteQueryTakeFirstSync(db, query) {
	return executeSqliteQuerySync(db, query).rows[0];
}
/** Drop cached Kysely state for a DatabaseSync. */
function clearNodeSqliteKyselyCacheForDatabase(db) {
	delete db[statementCacheSymbol];
	kyselyByDatabase.delete(db);
	queryErrorHandlerByDatabase.delete(db);
}
//#endregion
//#region src/infra/sqlite-runtime-version.ts
const SQLITE_WAL_RESET_FIXED_VERSION = {
	major: 3,
	minor: 51,
	patch: 3
};
const SQLITE_WAL_RESET_BACKPORTS = [{
	major: 3,
	minor: 44,
	patch: 6
}, {
	major: 3,
	minor: 50,
	patch: 7
}];
const SQLITE_VERSION_PATTERN = /^(\d+)\.(\d+)\.(\d+)$/u;
function parseSqliteVersion(value) {
	const match = SQLITE_VERSION_PATTERN.exec(value.trim());
	if (!match) return null;
	const major = Number.parseInt(match[1] ?? "", 10);
	const minor = Number.parseInt(match[2] ?? "", 10);
	const patch = Number.parseInt(match[3] ?? "", 10);
	if (![
		major,
		minor,
		patch
	].every(Number.isSafeInteger)) return null;
	return {
		major,
		minor,
		patch
	};
}
function compareSqliteVersions(left, right) {
	if (left.major !== right.major) return left.major - right.major;
	if (left.minor !== right.minor) return left.minor - right.minor;
	return left.patch - right.patch;
}
function isSqliteWalResetSafeVersion(value) {
	const version = parseSqliteVersion(value);
	if (!version) return false;
	if (compareSqliteVersions(version, SQLITE_WAL_RESET_FIXED_VERSION) >= 0) return true;
	return SQLITE_WAL_RESET_BACKPORTS.some((backport) => version.major === backport.major && version.minor === backport.minor && version.patch >= backport.patch);
}
//#endregion
//#region src/infra/sqlite-transaction.ts
const transactionDepthByDatabase = /* @__PURE__ */ new WeakMap();
const SQLITE_LOCK_ERROR_CODES = /* @__PURE__ */ new Set(["SQLITE_BUSY", "SQLITE_LOCKED"]);
const SQLITE_BUSY_RESULT_CODE = 5;
const SQLITE_LOCKED_RESULT_CODE = 6;
const SQLITE_CORRUPT_RESULT_CODE = 11;
const SQLITE_NOTADB_RESULT_CODE = 26;
const SQLITE_PRIMARY_RESULT_CODE_MASK = 255;
const DEFAULT_SLOW_BUSY_WAIT_MS = 1e3;
const DEFAULT_SLOW_TRANSACTION_HOLD_MS = 1e3;
let nextSavepointId = 0;
const transactionLog = createSubsystemLogger("sqlite/transaction");
function nextSavepointName() {
	nextSavepointId += 1;
	return `openclaw_tx_${nextSavepointId}`;
}
function isPromiseLike(value) {
	return Boolean(value && typeof value.then === "function");
}
function assertSyncTransactionResult(value) {
	if (isPromiseLike(value)) throw new Error("SQLite write transactions must be synchronous; Promise returns are not supported.");
}
function sqliteErrorCode(error) {
	const code = error && typeof error === "object" ? error.code : void 0;
	return typeof code === "string" ? code : void 0;
}
function sqliteExtendedResultCode(error) {
	const errcode = error && typeof error === "object" ? error.errcode : void 0;
	return typeof errcode === "number" && Number.isInteger(errcode) ? errcode : void 0;
}
function sqlitePrimaryResultCode(error) {
	const errcode = sqliteExtendedResultCode(error);
	return errcode === void 0 ? void 0 : errcode & SQLITE_PRIMARY_RESULT_CODE_MASK;
}
function isSqliteLockError(error) {
	const code = sqliteErrorCode(error);
	if (code !== void 0 && SQLITE_LOCK_ERROR_CODES.has(code)) return true;
	const primaryCode = sqlitePrimaryResultCode(error);
	return primaryCode === SQLITE_BUSY_RESULT_CODE || primaryCode === SQLITE_LOCKED_RESULT_CODE;
}
/** Report proven file damage (corrupt page or non-database header), not transient failure. */
function isSqliteCorruptionError(error) {
	const primaryCode = sqlitePrimaryResultCode(error);
	return primaryCode === SQLITE_CORRUPT_RESULT_CODE || primaryCode === SQLITE_NOTADB_RESULT_CODE;
}
function slowBusyWaitThresholdMs(options) {
	if (options?.busyTimeoutMs === void 0 || options.busyTimeoutMs <= 0) return DEFAULT_SLOW_BUSY_WAIT_MS;
	return Math.min(DEFAULT_SLOW_BUSY_WAIT_MS, options.busyTimeoutMs);
}
function slowTransactionHoldThresholdMs(options) {
	return options?.slowTransactionHoldMs ?? DEFAULT_SLOW_TRANSACTION_HOLD_MS;
}
function transactionLogger(options) {
	return options?.logger ?? transactionLog;
}
function logSlowTransactionHold(params) {
	if (params.elapsedMs < slowTransactionHoldThresholdMs(params.options)) return;
	transactionLogger(params.options).warn("slow SQLite transaction hold", {
		async: false,
		...params.options?.databaseLabel ? { database: params.options.databaseLabel } : {},
		elapsedMs: params.elapsedMs,
		...params.options?.operationLabel ? { operation: params.options.operationLabel } : {},
		pid: process.pid,
		thresholdMs: slowTransactionHoldThresholdMs(params.options)
	});
}
function logSlowTransactionStep(params) {
	if (params.elapsedMs < slowBusyWaitThresholdMs(params.options)) return;
	transactionLogger(params.options).warn("slow SQLite transaction lock wait", {
		async: false,
		...params.options?.busyTimeoutMs !== void 0 ? { busyTimeoutMs: params.options.busyTimeoutMs } : {},
		...params.options?.databaseLabel ? { database: params.options.databaseLabel } : {},
		elapsedMs: params.elapsedMs,
		...params.options?.operationLabel ? { operation: params.options.operationLabel } : {},
		pid: process.pid,
		step: params.step
	});
}
function execTimedTransactionStep(params) {
	const startedAt = Date.now();
	try {
		params.db.exec(params.sql);
		const elapsedMs = Date.now() - startedAt;
		logSlowTransactionStep({
			elapsedMs,
			options: params.options,
			step: params.step
		});
		return elapsedMs;
	} catch (error) {
		const elapsedMs = Date.now() - startedAt;
		if (isSqliteLockError(error)) {
			const sqliteErrcode = sqliteExtendedResultCode(error);
			const sqlitePrimaryCode = sqlitePrimaryResultCode(error);
			transactionLogger(params.options).warn("SQLite transaction lock wait failed", {
				async: false,
				...params.options?.busyTimeoutMs !== void 0 ? { busyTimeoutMs: params.options.busyTimeoutMs } : {},
				...params.options?.databaseLabel ? { database: params.options.databaseLabel } : {},
				code: sqliteErrorCode(error),
				elapsedMs,
				failureKind: "lock-contention",
				...params.options?.operationLabel ? { operation: params.options.operationLabel } : {},
				pid: process.pid,
				...sqliteErrcode !== void 0 ? { sqliteErrcode } : {},
				...sqlitePrimaryCode !== void 0 ? { sqlitePrimaryCode } : {},
				step: params.step
			});
		}
		throw error;
	}
}
function beginTransaction(db, options, mode) {
	execTimedTransactionStep({
		db,
		options,
		sql: mode === "immediate" ? "BEGIN IMMEDIATE" : "BEGIN",
		step: "begin"
	});
}
function commitImmediateTransaction(db, options) {
	execTimedTransactionStep({
		db,
		options,
		sql: "COMMIT",
		step: "commit"
	});
}
function abortImmediateTransaction(db) {
	try {
		db.exec("ROLLBACK");
	} catch {
		try {
			clearNodeSqliteKyselyCacheForDatabase(db);
			db.close();
		} catch {}
	}
}
function getTransactionDepth(db) {
	return transactionDepthByDatabase.get(db) ?? 0;
}
function setTransactionDepth(db, depth) {
	if (depth <= 0) {
		transactionDepthByDatabase.delete(db);
		return;
	}
	transactionDepthByDatabase.set(db, depth);
}
function runSqliteTransactionSync(db, operation, mode, options) {
	const depth = getTransactionDepth(db);
	if (depth > 0) {
		const savepointName = nextSavepointName();
		db.exec(`SAVEPOINT ${savepointName}`);
		setTransactionDepth(db, depth + 1);
		try {
			const result = operation();
			assertSyncTransactionResult(result);
			db.exec(`RELEASE SAVEPOINT ${savepointName}`);
			return result;
		} catch (error) {
			try {
				db.exec(`ROLLBACK TO SAVEPOINT ${savepointName}`);
			} finally {
				db.exec(`RELEASE SAVEPOINT ${savepointName}`);
			}
			throw error;
		} finally {
			setTransactionDepth(db, depth);
		}
	}
	beginTransaction(db, options, mode);
	setTransactionDepth(db, 1);
	let transactionStillActive = true;
	let result;
	const transactionStartedAt = Date.now();
	try {
		result = operation();
		assertSyncTransactionResult(result);
	} catch (error) {
		try {
			abortImmediateTransaction(db);
			transactionStillActive = false;
		} catch {}
		throw error;
	} finally {
		if (!transactionStillActive) setTransactionDepth(db, 0);
	}
	try {
		logSlowTransactionHold({
			elapsedMs: Date.now() - transactionStartedAt,
			options
		});
		commitImmediateTransaction(db, options);
		transactionStillActive = false;
		return result;
	} catch (error) {
		try {
			abortImmediateTransaction(db);
			transactionStillActive = false;
		} catch {}
		throw error;
	} finally {
		if (!transactionStillActive) setTransactionDepth(db, 0);
	}
}
/** Run synchronous reads against one deferred SQLite snapshot. */
function runSqliteDeferredTransactionSync(db, operation, options) {
	return runSqliteTransactionSync(db, operation, "deferred", options);
}
function runSqliteImmediateTransactionSync(db, operation, options) {
	return runSqliteTransactionSync(db, operation, "immediate", options);
}
//#endregion
//#region src/infra/node-sqlite.ts
const require = createRequire(import.meta.url);
let validatedSqliteModule;
function resolveSqliteFilesystemPath(pathname) {
	if (process.platform !== "win32") return pathname;
	return path.toNamespacedPath(path.resolve(pathname));
}
function resolveNodeSqliteLocation(location) {
	if (location === "" || location === ":memory:" || location.startsWith("file:")) return location;
	return resolveSqliteFilesystemPath(location);
}
function assertSqliteWalResetSafeVersion(version, nodeVersion) {
	if (isSqliteWalResetSafeVersion(version)) return;
	const variables = process.config?.variables;
	const isShared = variables?.node_shared_sqlite === true || variables?.node_shared_sqlite === "true";
	throw new Error(`OpenClaw requires SQLite 3.51.3+, 3.50.7+ within 3.50.x, or 3.44.6+ within 3.44.x for WAL safety; Node ${nodeVersion} ${isShared ? "uses shared system" : "embeds"} SQLite ${version}, which is affected by the upstream WAL-reset database corruption bug. ${isShared ? "Upgrade the system SQLite library to one of those safe versions, or use a Node build embedding a safe version." : "Upgrade to Node 22.22.3+, 24.15.0+, or 25.9.0+ before retrying."}`);
}
function assertSafeSqliteRuntime(sqlite) {
	if (validatedSqliteModule === sqlite) return;
	const database = new sqlite.DatabaseSync(":memory:");
	try {
		const row = database.prepare("SELECT sqlite_version() AS version").get();
		assertSqliteWalResetSafeVersion(typeof row?.version === "string" ? row.version : "unknown", process.versions.node);
		validatedSqliteModule = sqlite;
	} finally {
		database.close();
	}
}
/** Load node:sqlite after installing the process warning filter. */
function requireNodeSqlite() {
	installProcessWarningFilter();
	try {
		const sqlite = require("node:sqlite");
		assertSafeSqliteRuntime(sqlite);
		return sqlite;
	} catch (err) {
		const message = formatErrorMessage(err);
		throw new Error(`SQLite support is unavailable or unsafe in this Node runtime. ${message}`, { cause: err });
	}
}
/** Open node:sqlite through OpenClaw's runtime and filesystem-location boundary. */
function openNodeSqliteDatabase(location, options) {
	const sqlite = requireNodeSqlite();
	const resolvedLocation = resolveNodeSqliteLocation(location);
	return options === void 0 ? new sqlite.DatabaseSync(resolvedLocation) : new sqlite.DatabaseSync(resolvedLocation, options);
}
/** Hold a raw exclusive transaction until release for cross-process coordination. */
function tryAcquireExclusiveSqliteCoordinator(location) {
	const database = openNodeSqliteDatabase(location);
	try {
		database.exec("PRAGMA busy_timeout = 0; BEGIN EXCLUSIVE;");
	} catch (error) {
		database.close();
		if (isSqliteLockError(error)) return null;
		throw error;
	}
	return { release: () => {
		try {
			database.exec("ROLLBACK");
		} finally {
			database.close();
		}
	} };
}
//#endregion
export { registerNodeSqliteKyselyQueryErrorHandler as _, tryAcquireExclusiveSqliteCoordinator as a, runSqliteDeferredTransactionSync as c, clearNodeSqliteKyselyCacheForDatabase as d, enableNodeSqliteKyselyStatementCache as f, iterateSqliteQuerySync as g, getNodeSqliteKysely as h, resolveSqliteFilesystemPath as i, runSqliteImmediateTransactionSync as l, executeSqliteQueryTakeFirstSync as m, requireNodeSqlite as n, isSqliteCorruptionError as o, executeSqliteQuerySync as p, resolveNodeSqliteLocation as r, isSqliteLockError as s, openNodeSqliteDatabase as t, isSqliteWalResetSafeVersion as u };
