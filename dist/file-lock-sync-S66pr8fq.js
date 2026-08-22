import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { t as FsSafeError } from "./errors-CIm_ZhaM.js";
import { a as readSidecarLockSnapshotSync, c as serializeSidecarLockPayload, i as sidecarLockPayloadIsStale, l as sidecarLockSnapshotMatches, o as relativeSidecarLockPath, r as computeSidecarLockDelayMs, s as removeSidecarLockIfUnchangedSync } from "./sidecar-lock-DvH3ZuQw.js";
import { t as getFileLockProcessStartTime } from "./pid-alive-ClLrY9h9.js";
import { t as isLockOwnerDefinitelyStale } from "./stale-lock-file-CEuvanrm.js";
import "./file-lock-manager-BdC0K4tY.js";
import fs from "node:fs";
import path from "node:path";
//#region node_modules/@openclaw/fs-safe/dist/file-lock-sync.js
const SYNC_HELD_LOCKS_KEY = Symbol.for("fsSafe.syncSidecarLocks");
function getSyncHeldLocks() {
	const globalWithState = globalThis;
	if (!globalWithState[SYNC_HELD_LOCKS_KEY]) globalWithState[SYNC_HELD_LOCKS_KEY] = /* @__PURE__ */ new Map();
	return globalWithState[SYNC_HELD_LOCKS_KEY];
}
function verifySyncHeldLock(held) {
	const current = readSidecarLockSnapshotSync(held.lockPath, held.parsePayload);
	return !!current && sidecarLockSnapshotMatches(current, held.snapshot);
}
function releaseSyncHeldLock(held) {
	const heldLocks = getSyncHeldLocks();
	if (heldLocks.get(held.normalizedTargetPath) !== held) return false;
	held.refCount -= 1;
	if (held.refCount > 0) return false;
	heldLocks.delete(held.normalizedTargetPath);
	if (held.timer) {
		clearInterval(held.timer);
		held.timer = void 0;
	}
	fs.closeSync(held.fd);
	removeSidecarLockIfUnchangedSync(held.lockPath, held.snapshot);
	return true;
}
function createSyncHeldLockHandle(held) {
	let released = false;
	const release = () => {
		if (released) return;
		released = true;
		releaseSyncHeldLock(held);
	};
	return {
		lockPath: held.lockPath,
		normalizedTargetPath: held.normalizedTargetPath,
		verifyStillHeld: () => verifySyncHeldLock(held),
		release,
		[Symbol.dispose]: release
	};
}
function normalizeTargetPath(targetPath) {
	const resolved = path.resolve(targetPath);
	fs.mkdirSync(path.dirname(resolved), { recursive: true });
	try {
		return path.join(fs.realpathSync(path.dirname(resolved)), path.basename(resolved));
	} catch {
		return resolved;
	}
}
function boundedLockPath(lockPath, lockRoot) {
	const resolved = path.resolve(lockPath);
	if (!lockRoot) return resolved;
	relativeSidecarLockPath(lockRoot, resolved);
	const parent = path.dirname(resolved);
	const parentReal = fs.realpathSync(parent);
	const parentRelative = path.relative(lockRoot.rootReal, parentReal);
	if (parentRelative === ".." || parentRelative.startsWith(`..${path.sep}`) || path.isAbsolute(parentRelative)) throw new FsSafeError("outside-workspace", "sidecar lock parent is outside lockRoot");
	return path.join(parentReal, path.basename(resolved));
}
function defaultShouldReclaim(payload, lockPath, staleMs, nowMs) {
	if (sidecarLockPayloadIsStale(payload, staleMs, nowMs)) return true;
	try {
		return nowMs - fs.statSync(lockPath).mtimeMs > staleMs;
	} catch {
		return true;
	}
}
function sleep(milliseconds) {
	Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}
function acquireFileLockSync(targetPath, options) {
	const normalizedTargetPath = normalizeTargetPath(targetPath);
	const lockPath = boundedLockPath(options.lockPath ?? `${normalizedTargetPath}.lock`, options.lockRoot);
	const heldLocks = getSyncHeldLocks();
	const held = heldLocks.get(normalizedTargetPath);
	if (held && options.reentrantOwner !== void 0 && held.reentrantOwner !== void 0 && options.reentrantOwner === held.reentrantOwner) {
		held.refCount += 1;
		return createSyncHeldLockHandle(held);
	}
	const staleMs = options.staleMs ?? 3e4;
	const retry = options.retry ?? {};
	const startedAt = Date.now();
	let attempt = 0;
	while (true) {
		let fd;
		try {
			const payload = options.payload();
			const { raw, ownershipToken } = serializeSidecarLockPayload(payload);
			const noFollow = process.platform !== "win32" && typeof fs.constants.O_NOFOLLOW === "number" ? fs.constants.O_NOFOLLOW : 0;
			fd = fs.openSync(lockPath, fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_EXCL | noFollow, 384);
			fs.writeFileSync(fd, raw, "utf8");
			fs.fsyncSync(fd);
			const snapshot = {
				raw,
				payload,
				stat: fs.fstatSync(fd),
				ownershipToken
			};
			const createdHeld = {
				fd,
				lockPath,
				normalizedTargetPath,
				parsePayload: options.parsePayload,
				refCount: 1,
				reentrantOwner: options.reentrantOwner,
				snapshot
			};
			heldLocks.set(normalizedTargetPath, createdHeld);
			const returnedHandle = createSyncHeldLockHandle(createdHeld);
			if (options.onCompromised && (options.compromiseCheckIntervalMs ?? 0) > 0) {
				createdHeld.timer = setInterval(() => {
					if (!returnedHandle.verifyStillHeld()) {
						if (createdHeld.timer) clearInterval(createdHeld.timer);
						createdHeld.timer = void 0;
						options.onCompromised?.({
							lockPath,
							normalizedTargetPath
						});
					}
				}, options.compromiseCheckIntervalMs);
				createdHeld.timer.unref();
			}
			fd = void 0;
			return returnedHandle;
		} catch (error) {
			if (fd !== void 0) {
				const failed = {
					payload: null,
					stat: fs.fstatSync(fd)
				};
				fs.closeSync(fd);
				fd = void 0;
				removeSidecarLockIfUnchangedSync(lockPath, failed);
			}
			if (error.code !== "EEXIST") throw error;
			if (heldLocks.has(normalizedTargetPath)) {
				const elapsed = Date.now() - startedAt;
				if (options.timeoutMs !== void 0 && elapsed >= options.timeoutMs || retry.retries !== void 0 && attempt >= retry.retries) throw Object.assign(/* @__PURE__ */ new Error(`file lock timeout for ${normalizedTargetPath}`), {
					code: "file_lock_timeout",
					lockPath,
					normalizedTargetPath
				});
				sleep(computeSidecarLockDelayMs(retry, attempt));
				attempt += 1;
				continue;
			}
			const snapshot = readSidecarLockSnapshotSync(lockPath, options.parsePayload);
			if (!snapshot) continue;
			const nowMs = Date.now();
			if (options.shouldReclaim ? options.shouldReclaim({
				lockPath,
				normalizedTargetPath,
				payload: snapshot.payload,
				staleMs,
				nowMs,
				heldByThisProcess: false
			}) : defaultShouldReclaim(snapshot.payload, lockPath, staleMs, nowMs)) {
				if (options.staleRecovery === "remove-if-unchanged" && snapshot.raw !== void 0 && options.shouldRemoveStaleLock?.({
					lockPath,
					normalizedTargetPath,
					raw: snapshot.raw,
					payload: snapshot.payload
				})) {
					const reclaimGuard = `${lockPath}.reclaim`;
					try {
						fs.mkdirSync(reclaimGuard);
						if (removeSidecarLockIfUnchangedSync(lockPath, snapshot)) continue;
					} finally {
						try {
							fs.rmdirSync(reclaimGuard);
						} catch {}
					}
				}
				throw Object.assign(/* @__PURE__ */ new Error(`file lock stale for ${normalizedTargetPath}`), {
					code: "file_lock_stale",
					lockPath,
					normalizedTargetPath
				});
			}
			const elapsed = Date.now() - startedAt;
			if (options.timeoutMs !== void 0 && elapsed >= options.timeoutMs || retry.retries !== void 0 && attempt >= retry.retries) throw Object.assign(/* @__PURE__ */ new Error(`file lock timeout for ${normalizedTargetPath}`), {
				code: "file_lock_timeout",
				lockPath,
				normalizedTargetPath
			});
			sleep(computeSidecarLockDelayMs(retry, attempt));
			attempt += 1;
		}
	}
}
//#endregion
//#region src/infra/file-lock-sync.ts
let processStartTime;
/** Synchronous lock for legacy stores that cannot transact in SQLite yet. */
function acquireFileLockSyncWithRetry(path) {
	rejectUnsupportedLockPath(`${path}.lock`);
	processStartTime ??= getFileLockProcessStartTime(process.pid);
	const createPayload = () => ({
		pid: process.pid,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		...processStartTime === null ? {} : { starttime: processStartTime }
	});
	const isStale = ({ payload }) => isLockOwnerDefinitelyStale({ payload: isRecord(payload) ? payload : null });
	const lock = acquireFileLockSync(path, {
		staleMs: 3e4,
		retry: {
			retries: 9,
			factor: 1,
			minTimeout: 20,
			maxTimeout: 20,
			randomize: false
		},
		staleRecovery: "remove-if-unchanged",
		payload: createPayload,
		shouldReclaim: isStale,
		shouldRemoveStaleLock: isStale
	});
	return () => lock.release();
}
function rejectUnsupportedLockPath(lockPath) {
	let observed;
	try {
		observed = fs.lstatSync(lockPath);
	} catch (error) {
		if (error.code === "ENOENT") return;
		throw error;
	}
	if (observed.isFile() && !observed.isSymbolicLink()) return;
	if (!observed.isDirectory() || observed.isSymbolicLink()) throw new Error(`Storage lock path has an unsupported legacy type: ${lockPath}`);
	throw Object.assign(/* @__PURE__ */ new Error(`Legacy storage lock requires manual removal after verifying no older OpenClaw process is running: ${lockPath}`), {
		code: "file_lock_stale",
		lockPath
	});
}
//#endregion
export { acquireFileLockSyncWithRetry as t };
