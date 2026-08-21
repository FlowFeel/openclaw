import { n as MAX_TIMER_TIMEOUT_MS } from "./number-coercion-Crk_c9KW.js";
import { i as resolvePathViaExistingAncestorSync } from "./root-path-B97MrUcQ.js";
import "./boundary-path-8uj3r-Aa.js";
import { i as resolveGlobalSingleton } from "./global-singleton-Dc_stLtU.js";
import { f as resolveAgentIdFromSessionKey, r as LEGACY_IMPLICIT_AGENT_ID } from "./session-key-DtTE9-Tg.js";
import { r as isPidAlive, t as getFileLockProcessStartTime } from "./pid-alive-ClLrY9h9.js";
import { a as readWindowsProcessStartTimeSync } from "./windows-port-pids-DA0cG5BM.js";
import { h as openOpenClawAgentDatabase } from "./openclaw-agent-db-DemdumbZ.js";
import { r as resolveSqliteTargetFromSessionStorePath } from "./session-sqlite-target-boHOxXgo.js";
import { n as acquireOpenClawStateLease, t as OpenClawStateLeaseError } from "./openclaw-state-lease-DLXouRV4.js";
import { n as SessionWriteLockTimeoutError, t as SessionWriteLockStaleError } from "./session-write-lock-error-5gHYmvxH.js";
//#region src/agents/session-write-lock.ts
const DEFAULT_SESSION_WRITE_LOCK_STALE_MS = 1800 * 1e3;
const DEFAULT_SESSION_WRITE_LOCK_MAX_HOLD_MS = 300 * 1e3;
const DEFAULT_SESSION_WRITE_LOCK_ACQUIRE_TIMEOUT_MS = 6e4;
const DEFAULT_TIMEOUT_GRACE_MS = 120 * 1e3;
const SESSION_WRITE_LEASE_SCOPE = "session-write";
const SESSION_WRITE_LEASE_STATE_KEY = Symbol.for("openclaw.sessionWriteLeaseState");
const defaultProcessStartTimeForLock = (pid) => process.platform === "win32" ? readWindowsProcessStartTimeSync(pid, 1e3) : getFileLockProcessStartTime(pid);
let resolveProcessStartTimeForLock = defaultProcessStartTimeForLock;
const sessionWriteLeaseState = resolveGlobalSingleton(SESSION_WRITE_LEASE_STATE_KEY, () => ({ held: /* @__PURE__ */ new Map() }));
const SESSION_WRITE_LOCK_ENV = {
	acquireTimeoutMs: "OPENCLAW_SESSION_WRITE_LOCK_ACQUIRE_TIMEOUT_MS",
	staleMs: "OPENCLAW_SESSION_WRITE_LOCK_STALE_MS",
	maxHoldMs: "OPENCLAW_SESSION_WRITE_LOCK_MAX_HOLD_MS"
};
function parsePositiveMs(value, options = {}) {
	if (typeof value !== "number" || Number.isNaN(value) || value <= 0) return;
	if (value === Number.POSITIVE_INFINITY) return options.allowInfinity ? value : void 0;
	return Number.isSafeInteger(value) ? value : void 0;
}
function resolvePositiveMs(value, fallback, options = {}) {
	if (value === Number.POSITIVE_INFINITY) return options.allowInfinity ? value : fallback;
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : fallback;
}
function readPositiveMsEnv(env, key, options = {}) {
	const raw = env[key]?.trim();
	if (!raw) return;
	if (raw === "Infinity") return options.allowInfinity ? Number.POSITIVE_INFINITY : void 0;
	return /^\d+$/.test(raw) ? parsePositiveMs(Number(raw), options) : void 0;
}
function resolveSessionWriteLockMs(params) {
	return readPositiveMsEnv(params.env ?? process.env, SESSION_WRITE_LOCK_ENV[params.key], { allowInfinity: params.allowInfinity }) ?? params.fallback;
}
function resolveSessionWriteLockAcquireTimeoutMs(_config, env) {
	return resolveSessionWriteLockMs({
		env,
		key: "acquireTimeoutMs",
		fallback: DEFAULT_SESSION_WRITE_LOCK_ACQUIRE_TIMEOUT_MS,
		allowInfinity: true
	});
}
function resolveSessionWriteLockStaleMs(_config, env) {
	return resolveSessionWriteLockMs({
		env,
		key: "staleMs",
		fallback: DEFAULT_SESSION_WRITE_LOCK_STALE_MS
	});
}
function resolveSessionWriteLockMaxHoldMs(_config, params = {}) {
	return resolveSessionWriteLockMs({
		env: params.env,
		key: "maxHoldMs",
		fallback: params.fallback ?? DEFAULT_SESSION_WRITE_LOCK_MAX_HOLD_MS
	});
}
function resolveSessionWriteLockOptions(config, params = {}) {
	return {
		timeoutMs: resolveSessionWriteLockAcquireTimeoutMs(config, params.env),
		staleMs: resolveSessionWriteLockStaleMs(config, params.env),
		maxHoldMs: resolveSessionWriteLockMaxHoldMs(config, {
			env: params.env,
			fallback: params.maxHoldMsFallback
		})
	};
}
function resolveSessionLockMaxHoldFromTimeout(params) {
	const minMs = resolvePositiveMs(params.minMs, DEFAULT_SESSION_WRITE_LOCK_MAX_HOLD_MS);
	const timeoutMs = resolvePositiveMs(params.timeoutMs, minMs, { allowInfinity: true });
	if (timeoutMs === Number.POSITIVE_INFINITY) return MAX_TIMER_TIMEOUT_MS;
	const graceMs = resolvePositiveMs(params.graceMs, DEFAULT_TIMEOUT_GRACE_MS);
	return Math.min(MAX_TIMER_TIMEOUT_MS, Math.max(minMs, timeoutMs + graceMs));
}
function resolveSessionWriteLockTargetKey(target) {
	const databaseTarget = resolveSqliteTargetFromSessionStorePath(target.storePath, { agentId: target.agentId });
	return JSON.stringify([
		target.agentId,
		resolvePathViaExistingAncestorSync(databaseTarget.path),
		target.sessionId
	]);
}
function resolveSessionWriteLeaseDatabaseOptions(sessionKey) {
	let parsed;
	try {
		parsed = JSON.parse(sessionKey);
	} catch {}
	if (Array.isArray(parsed) && parsed.length === 3 && parsed.every((value) => typeof value === "string" && value.trim().length > 0)) {
		const [agentId, storePath] = parsed;
		const target = resolveSqliteTargetFromSessionStorePath(storePath, { agentId });
		return {
			agentId: target.agentId ?? agentId,
			path: target.path
		};
	}
	const agentId = resolveAgentIdFromSessionKey(sessionKey, LEGACY_IMPLICIT_AGENT_ID);
	return {
		agentId,
		path: openOpenClawAgentDatabase({ agentId }).path
	};
}
function leaseDurationMs(value, minimum) {
	if (!Number.isFinite(value)) return MAX_TIMER_TIMEOUT_MS;
	return Math.min(MAX_TIMER_TIMEOUT_MS, Math.max(minimum, Math.floor(value)));
}
function leasePath(sessionKey) {
	return `sqlite:${SESSION_WRITE_LEASE_SCOPE}:${sessionKey}`;
}
function leaseLost(sessionKey) {
	return new SessionWriteLockStaleError({
		owner: "expired or replaced SQLite lease",
		lockPath: leasePath(sessionKey),
		staleReasons: ["lease-lost"]
	});
}
function createLeaseHandle(sessionKey, entry) {
	let released = false;
	let releasePromise;
	return {
		assertOwned: () => {
			if (sessionWriteLeaseState.held.get(sessionKey) !== entry) throw leaseLost(sessionKey);
			try {
				entry.lease.assertOwned();
			} catch (error) {
				if (error instanceof OpenClawStateLeaseError && error.code === "OPENCLAW_STATE_LEASE_LOST") throw leaseLost(sessionKey);
				throw error;
			}
		},
		release: () => {
			if (released) return Promise.resolve();
			releasePromise ??= (async () => {
				const current = sessionWriteLeaseState.held.get(sessionKey);
				if (current !== entry) return;
				if (current.refCount > 1) {
					current.refCount -= 1;
					return;
				}
				sessionWriteLeaseState.held.delete(sessionKey);
				try {
					await current.lease.release();
				} catch (error) {
					if (!sessionWriteLeaseState.held.has(sessionKey)) sessionWriteLeaseState.held.set(sessionKey, current);
					throw error;
				}
			})().then(() => {
				released = true;
			}, (error) => {
				releasePromise = void 0;
				throw error;
			});
			return releasePromise;
		}
	};
}
async function acquireSessionWriteLock(params) {
	if (params.signal?.aborted) throw params.signal.reason;
	const defaults = resolveSessionWriteLockOptions();
	const timeoutMs = resolvePositiveMs(params.timeoutMs, defaults.timeoutMs, { allowInfinity: true });
	const maxHoldMs = resolvePositiveMs(params.maxHoldMs, defaults.maxHoldMs);
	const existing = sessionWriteLeaseState.held.get(params.sessionFile);
	if (params.allowReentrant === true && existing) {
		existing.refCount += 1;
		return createLeaseHandle(params.sessionFile, existing);
	}
	const databaseOptions = resolveSessionWriteLeaseDatabaseOptions(params.sessionFile);
	openOpenClawAgentDatabase(databaseOptions);
	const admission = new AbortController();
	const abortAdmission = () => admission.abort(params.signal?.reason);
	params.signal?.addEventListener("abort", abortAdmission, { once: true });
	try {
		const lease = await acquireOpenClawStateLease({
			scope: SESSION_WRITE_LEASE_SCOPE,
			key: params.sessionFile,
			database: {
				scope: "agent",
				agentId: databaseOptions.agentId,
				...databaseOptions.path ? { path: databaseOptions.path } : {}
			},
			leaseMs: leaseDurationMs(maxHoldMs, 1e3),
			waitMs: leaseDurationMs(timeoutMs, 0),
			signal: admission.signal,
			leaseLabel: "session write lease",
			operationLabel: "session.write-lease",
			strictRelease: true,
			processOwner: {
				pid: process.pid,
				startTime: resolveProcessStartTimeForLock(process.pid),
				isAlive: isPidAlive,
				readStartTime: resolveProcessStartTimeForLock
			}
		});
		params.signal?.removeEventListener("abort", abortAdmission);
		const entry = {
			lease,
			refCount: 1
		};
		sessionWriteLeaseState.held.set(params.sessionFile, entry);
		return createLeaseHandle(params.sessionFile, entry);
	} catch (error) {
		if (params.signal?.aborted) throw params.signal.reason;
		if (error instanceof OpenClawStateLeaseError && error.code === "OPENCLAW_STATE_LEASE_TIMEOUT") throw new SessionWriteLockTimeoutError({
			timeoutMs,
			owner: "another OpenClaw process",
			lockPath: leasePath(params.sessionFile)
		});
		throw error;
	} finally {
		params.signal?.removeEventListener("abort", abortAdmission);
	}
}
function releaseAllSessionWriteLeasesSynchronously() {
	for (const entry of sessionWriteLeaseState.held.values()) try {
		entry.lease.releaseSynchronously();
	} catch {}
	sessionWriteLeaseState.held.clear();
}
function resetSessionWriteLockStateForTest() {
	releaseAllSessionWriteLeasesSynchronously();
	resolveProcessStartTimeForLock = defaultProcessStartTimeForLock;
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.sessionWriteLockTestApi")] = {
	resetSessionWriteLockStateForTest,
	testing: {
		releaseAllLocksSync: releaseAllSessionWriteLeasesSynchronously,
		setProcessStartTimeResolverForTest(resolver) {
			resolveProcessStartTimeForLock = resolver ?? defaultProcessStartTimeForLock;
		}
	}
};
//#endregion
export { resolveSessionWriteLockStaleMs as a, resolveSessionWriteLockOptions as i, resolveSessionLockMaxHoldFromTimeout as n, resolveSessionWriteLockTargetKey as o, resolveSessionWriteLockAcquireTimeoutMs as r, acquireSessionWriteLock as t };
