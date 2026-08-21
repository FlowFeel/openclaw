import { h as shortenHomePath } from "./utils-Bs67j6-3.js";
import { C as resolveStateDir } from "./paths-CL43LNS6.js";
import { n as createFileLockManager } from "./file-lock-CLjy2n00.js";
import "./file-lock-manager-BdC0K4tY.js";
import { r as readGatewayProcessArgsSync } from "./gateway-processes-CwKuXMZo.js";
import { t as resolveAgentSessionDirs } from "./session-dirs-D4v_ujH0.js";
import { a as resolveSessionWriteLockStaleMs } from "./session-write-lock-CDkoLPi5.js";
import { t as note } from "./note-uiKX_qfX.js";
import { n as parseSessionLockFilePayload, t as inspectSessionLockFileContention } from "./session-lock-file-inspection-Cj5iI-9P.js";
import "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
import { scheduler } from "node:timers/promises";
//#region src/commands/doctor-session-lock-files.ts
const LOCK_RECLAIMS = createFileLockManager("openclaw.doctor.session-lock-reclaim");
const MALFORMED_OWNER_GRACE_MS = 3e4;
async function readPayload(lockPath) {
	try {
		return parseSessionLockFilePayload(await fs$1.readFile(lockPath, "utf8"));
	} catch {
		return null;
	}
}
async function reclaimIfUnchanged(params) {
	const approve = async (payload) => (await inspectSessionLockFileContention({
		lockPath: params.lockPath,
		payload,
		staleMs: params.staleMs,
		nowMs: params.nowMs,
		orphanGraceMs: MALFORMED_OWNER_GRACE_MS,
		readOwnerProcessArgs: params.readOwnerProcessArgs
	})).removable;
	try {
		await (await LOCK_RECLAIMS.acquire(params.lockPath, {
			lockPath: params.lockPath,
			staleMs: params.staleMs,
			timeoutMs: 0,
			retry: { retries: 0 },
			staleRecovery: "remove-if-unchanged",
			payload: () => ({
				pid: process.pid,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}),
			parsePayload: parseSessionLockFilePayload,
			shouldReclaim: ({ payload }) => approve(payload),
			shouldRemoveStaleLock: ({ payload }) => approve(payload)
		})).release();
		return true;
	} catch (error) {
		const code = error.code;
		if (code === "file_lock_timeout" || code === "file_lock_stale") return false;
		throw error;
	}
}
async function cleanStaleSessionLockFiles(params) {
	const sessionsDir = path.resolve(params.sessionsDir);
	const nowMs = params.nowMs ?? Date.now();
	let entries;
	try {
		entries = await fs$1.readdir(sessionsDir, { withFileTypes: true });
	} catch (error) {
		if (error.code === "ENOENT") return {
			locks: [],
			cleaned: []
		};
		throw error;
	}
	const ownerArgs = params.readOwnerProcessArgs ?? readGatewayProcessArgsSync;
	const argsByPid = /* @__PURE__ */ new Map();
	const readOwnerProcessArgs = (pid) => {
		if (!argsByPid.has(pid)) try {
			argsByPid.set(pid, ownerArgs(pid));
		} catch {
			return null;
		}
		return argsByPid.get(pid) ?? null;
	};
	const locks = [];
	const cleaned = [];
	for (const entry of entries.filter((candidate) => candidate.name.endsWith(".jsonl.lock")).toSorted((left, right) => left.name.localeCompare(right.name))) {
		await scheduler.yield();
		const lockPath = path.join(sessionsDir, entry.name);
		const { inspection: inspected, removable } = await inspectSessionLockFileContention({
			lockPath,
			payload: await readPayload(lockPath),
			staleMs: params.staleMs,
			nowMs,
			orphanGraceMs: MALFORMED_OWNER_GRACE_MS,
			readOwnerProcessArgs
		});
		const lock = {
			lockPath,
			...inspected,
			removable,
			removed: false
		};
		if (params.removeStale !== false && removable) {
			lock.removed = await reclaimIfUnchanged({
				lockPath,
				staleMs: params.staleMs,
				nowMs,
				readOwnerProcessArgs
			});
			if (lock.removed) cleaned.push(lock);
		}
		locks.push(lock);
	}
	return {
		locks,
		cleaned
	};
}
//#endregion
//#region src/commands/doctor-session-locks.ts
/** Doctor diagnostics and cleanup for stale session write lock files. */
const SESSION_LOCKS_CHECK_ID = "core/doctor/session-locks";
const REPORT_ONLY_STALE_LOCK_REASONS = /* @__PURE__ */ new Set(["too-old", "hold-exceeded"]);
function isReportOnlyStaleLock(lock) {
	return lock.staleReasons.length > 0 && lock.staleReasons.every((reason) => REPORT_ONLY_STALE_LOCK_REASONS.has(reason));
}
function formatAge(ageMs) {
	if (ageMs === null) return "unknown";
	const seconds = Math.floor(ageMs / 1e3);
	if (seconds < 60) return `${seconds}s`;
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	if (minutes < 60) return `${minutes}m${remainingSeconds}s`;
	return `${Math.floor(minutes / 60)}h${minutes % 60}m`;
}
function formatLockLine(lock) {
	const pidStatus = lock.pid === null ? "pid=missing" : `pid=${lock.pid} (${lock.pidAlive ? "alive" : "dead"})`;
	const ageStatus = `age=${formatAge(lock.ageMs)}`;
	const staleStatus = lock.stale ? `stale=yes (${lock.staleReasons.join(", ") || "unknown"})` : "stale=no";
	const removedStatus = lock.removed ? " [removed]" : "";
	return `- ${shortenHomePath(lock.lockPath)} ${pidStatus} ${ageStatus} ${staleStatus}${removedStatus}`;
}
async function detectStaleSessionLocks(params) {
	const staleMs = params?.staleMs ?? resolveSessionWriteLockStaleMs(params?.config, params?.env);
	const sessionDirs = await resolveAgentSessionDirs(resolveStateDir(params?.env ?? process.env));
	const staleLocks = [];
	for (const sessionsDir of sessionDirs) {
		const result = await cleanStaleSessionLockFiles({
			sessionsDir,
			staleMs,
			removeStale: false,
			readOwnerProcessArgs: params?.readOwnerProcessArgs
		});
		staleLocks.push(...result.locks.filter((lock) => lock.stale));
	}
	return staleLocks.toSorted((a, b) => a.lockPath.localeCompare(b.lockPath));
}
function sessionLockToHealthFinding(lock) {
	const fixHint = lock.removable ? "Run \"openclaw doctor --fix\" to remove this stale lock file automatically." : isReportOnlyStaleLock(lock) ? "OpenClaw is preserving this live owned lock; inspect the owning process if it appears stuck." : "Run \"openclaw doctor --fix\" after the cleanup grace period if this stale lock remains.";
	return {
		checkId: SESSION_LOCKS_CHECK_ID,
		severity: "warning",
		message: `Stale session lock file: ${shortenHomePath(lock.lockPath)} (${lock.staleReasons.join(", ") || "unknown"})`,
		path: lock.lockPath,
		fixHint
	};
}
function sessionLockToRepairEffect(lock) {
	return {
		kind: "state",
		action: lock.removable ? "would-remove-stale-session-lock" : isReportOnlyStaleLock(lock) ? "would-preserve-report-only-stale-session-lock" : "would-preserve-mtime-gated-stale-session-lock",
		target: lock.lockPath,
		dryRunSafe: false
	};
}
/** Reports session write locks and removes stale locks when doctor repair is enabled. */
async function noteSessionLockHealth(params) {
	const shouldRepair = params?.shouldRepair === true;
	const staleMs = params?.staleMs ?? resolveSessionWriteLockStaleMs(params?.config, params?.env);
	let sessionDirs;
	try {
		sessionDirs = await resolveAgentSessionDirs(resolveStateDir(process.env));
	} catch (err) {
		note(`- Failed to inspect session lock files: ${String(err)}`, "Session locks");
		return;
	}
	if (sessionDirs.length === 0) return;
	const allLocks = [];
	for (const sessionsDir of sessionDirs) {
		const result = await cleanStaleSessionLockFiles({
			sessionsDir,
			staleMs,
			removeStale: shouldRepair,
			readOwnerProcessArgs: params?.readOwnerProcessArgs
		});
		allLocks.push(...result.locks);
	}
	if (allLocks.length === 0) return;
	const staleCount = allLocks.filter((lock) => lock.stale).length;
	const removedCount = allLocks.filter((lock) => lock.removed).length;
	const lines = [`- Found ${allLocks.length} session lock file${allLocks.length === 1 ? "" : "s"}.`, ...allLocks.toSorted((a, b) => a.lockPath.localeCompare(b.lockPath)).map(formatLockLine)];
	if (staleCount > 0 && !shouldRepair) {
		lines.push(`- ${staleCount} lock file${staleCount === 1 ? " is" : "s are"} stale.`);
		lines.push("- Run \"openclaw doctor --fix\" to remove stale lock files automatically.");
	}
	if (shouldRepair && removedCount > 0) lines.push(`- Removed ${removedCount} stale session lock file${removedCount === 1 ? "" : "s"}.`);
	note(lines.join("\n"), "Session locks");
}
//#endregion
export { sessionLockToRepairEffect as i, noteSessionLockHealth as n, sessionLockToHealthFinding as r, detectStaleSessionLocks as t };
