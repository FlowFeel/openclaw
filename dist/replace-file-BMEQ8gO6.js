import { t as FsSafeError } from "./errors-CIm_ZhaM.js";
import { t as sameFileIdentity } from "./file-identity-C0fBiekR.js";
import { n as registerTempPathForExit, t as serializePathWrite } from "./write-queue-Cq_SK85X.js";
import { t as assertSafePathPrefix } from "./safe-path-segment-D57WdWAH.js";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
//#region node_modules/@openclaw/fs-safe/dist/replace-file-copy-fallback.js
const NOFOLLOW = process.platform !== "win32" && "O_NOFOLLOW" in fs.constants ? fs.constants.O_NOFOLLOW : 0;
const OPEN_READ_FLAGS = fs.constants.O_RDONLY | NOFOLLOW;
const OPEN_READ_WRITE_FLAGS = fs.constants.O_RDWR | NOFOLLOW;
const OPEN_WRITE_EXCLUSIVE_FLAGS = fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_EXCL | NOFOLLOW;
const READ_CHUNK_BYTES = 64 * 1024;
function notFound(error) {
	return error.code === "ENOENT";
}
function assertPinnedDestination(pathname, opened, dest, hardlinks) {
	if (pathname.isSymbolicLink()) throw new FsSafeError("symlink", `Refusing copy fallback through symlink destination: ${dest}`);
	if (!pathname.isFile() || !opened.isFile()) throw new FsSafeError("not-file", `Copy fallback destination must be a regular file: ${dest}`);
	if (!sameFileIdentity(pathname, opened)) throw new FsSafeError("path-mismatch", `Copy fallback destination changed while opening: ${dest}`);
	if (hardlinks === "reject" && opened.nlink > 1) throw new FsSafeError("hardlink", `Hardlinked copy fallback destination not allowed: ${dest}`);
}
async function openPinnedDestination(fsModule, dest, hardlinks) {
	const preview = await fsModule.lstat(dest).catch((error) => {
		if (notFound(error)) return null;
		throw error;
	});
	if (!preview) return null;
	if (preview.isSymbolicLink()) throw new FsSafeError("symlink", `Refusing copy fallback through symlink destination: ${dest}`);
	const handle = await fsModule.open(dest, OPEN_READ_WRITE_FLAGS);
	try {
		const opened = await handle.stat();
		assertPinnedDestination(await fsModule.lstat(dest), opened, dest, hardlinks);
		return {
			handle,
			stat: opened
		};
	} catch (error) {
		await handle.close().catch(() => void 0);
		throw error;
	}
}
function openPinnedDestinationSync(fsModule, dest, hardlinks) {
	let preview;
	try {
		preview = fsModule.lstatSync(dest);
	} catch (error) {
		if (notFound(error)) return null;
		throw error;
	}
	if (preview.isSymbolicLink()) throw new FsSafeError("symlink", `Refusing copy fallback through symlink destination: ${dest}`);
	const fd = fsModule.openSync(dest, OPEN_READ_WRITE_FLAGS);
	try {
		const opened = fsModule.fstatSync(fd);
		assertPinnedDestination(fsModule.lstatSync(dest), opened, dest, hardlinks);
		return {
			fd,
			stat: opened
		};
	} catch (error) {
		fsModule.closeSync(fd);
		throw error;
	}
}
async function assertDestinationHardlinkPolicy(fsModule, dest, policy) {
	if (policy !== "reject") return;
	const preview = await fsModule.lstat(dest).catch((error) => {
		if (notFound(error)) return null;
		throw error;
	});
	if (!preview || preview.isSymbolicLink() || !preview.isFile()) return;
	const handle = await fsModule.open(dest, OPEN_READ_FLAGS);
	try {
		const opened = await handle.stat();
		const current = await fsModule.lstat(dest);
		if (current.isSymbolicLink() || !current.isFile() || !sameFileIdentity(current, opened)) throw new FsSafeError("path-mismatch", `Atomic replace destination changed while opening: ${dest}`);
		if (opened.nlink > 1) throw new FsSafeError("hardlink", `Hardlinked atomic replace destination not allowed: ${dest}`);
	} finally {
		await handle.close().catch(() => void 0);
	}
}
function assertDestinationHardlinkPolicySync(fsModule, dest, policy) {
	if (policy !== "reject") return;
	let preview;
	try {
		preview = fsModule.lstatSync(dest);
	} catch (error) {
		if (notFound(error)) return;
		throw error;
	}
	if (preview.isSymbolicLink() || !preview.isFile()) return;
	const fd = fsModule.openSync(dest, OPEN_READ_FLAGS);
	try {
		const opened = fsModule.fstatSync(fd);
		const current = fsModule.lstatSync(dest);
		if (current.isSymbolicLink() || !current.isFile() || !sameFileIdentity(current, opened)) throw new FsSafeError("path-mismatch", `Atomic replace destination changed while opening: ${dest}`);
		if (opened.nlink > 1) throw new FsSafeError("hardlink", `Hardlinked atomic replace destination not allowed: ${dest}`);
	} finally {
		fsModule.closeSync(fd);
	}
}
async function readBounded(handle, maxBytes) {
	const chunks = [];
	let position = 0;
	while (position <= maxBytes) {
		const buffer = Buffer.allocUnsafe(Math.min(READ_CHUNK_BYTES, maxBytes - position + 1));
		const { bytesRead } = await handle.read(buffer, 0, buffer.length, position);
		if (bytesRead === 0) break;
		position += bytesRead;
		if (position > maxBytes) throw new FsSafeError("too-large", `Atomic replace restore snapshot exceeds maxRestoreBytes (${maxBytes})`);
		chunks.push(buffer.subarray(0, bytesRead));
	}
	return Buffer.concat(chunks, position);
}
function readBoundedSync(fsModule, fd, maxBytes) {
	const chunks = [];
	let position = 0;
	while (position <= maxBytes) {
		const buffer = Buffer.allocUnsafe(Math.min(READ_CHUNK_BYTES, maxBytes - position + 1));
		const bytesRead = fsModule.readSync(fd, buffer, 0, buffer.length, position);
		if (bytesRead === 0) break;
		position += bytesRead;
		if (position > maxBytes) throw new FsSafeError("too-large", `Atomic replace restore snapshot exceeds maxRestoreBytes (${maxBytes})`);
		chunks.push(buffer.subarray(0, bytesRead));
	}
	return Buffer.concat(chunks, position);
}
async function writeAll(handle, data) {
	await handle.truncate(0);
	let written = 0;
	while (written < data.length) {
		const result = await handle.write(data, written, data.length - written, written);
		if (result.bytesWritten === 0) throw new Error("Copy fallback write made no progress");
		written += result.bytesWritten;
	}
	await handle.truncate(data.length);
}
function writeAllSync(fsModule, fd, data) {
	fsModule.ftruncateSync(fd, 0);
	let written = 0;
	while (written < data.length) {
		const bytesWritten = fsModule.writeSync(fd, data, written, data.length - written, written);
		if (bytesWritten === 0) throw new Error("Copy fallback write made no progress");
		written += bytesWritten;
	}
	fsModule.ftruncateSync(fd, data.length);
}
function restoreFailure(writeError, cleanup, restoreError) {
	const primary = writeError instanceof Error ? writeError : new Error(String(writeError));
	const details = { cleanup };
	const cause = restoreError ? new AggregateError([primary, restoreError], "copy fallback and original restoration both failed") : primary;
	return new FsSafeError("helper-failed", cleanup === "restored" ? `Atomic copy fallback failed; original destination restored: ${primary.message}` : `Atomic copy fallback failed and original restoration failed: ${primary.message}`, {
		cause,
		details
	});
}
async function replacePinnedWithRestore(handle, replacement, maxRestoreBytes) {
	const original = await readBounded(handle, maxRestoreBytes);
	try {
		await writeAll(handle, replacement);
		await handle.sync();
	} catch (writeError) {
		try {
			await writeAll(handle, original);
			await handle.sync();
			throw restoreFailure(writeError, "restored");
		} catch (restoreError) {
			if (restoreError instanceof FsSafeError && restoreError.details?.cleanup === "restored") throw restoreError;
			throw restoreFailure(writeError, "restore-failed", restoreError);
		}
	}
}
function replacePinnedWithRestoreSync(fsModule, fd, replacement, maxRestoreBytes) {
	const original = readBoundedSync(fsModule, fd, maxRestoreBytes);
	try {
		writeAllSync(fsModule, fd, replacement);
		fsModule.fsyncSync(fd);
	} catch (writeError) {
		try {
			writeAllSync(fsModule, fd, original);
			fsModule.fsyncSync(fd);
			throw restoreFailure(writeError, "restored");
		} catch (restoreError) {
			if (restoreError instanceof FsSafeError && restoreError.details?.cleanup === "restored") throw restoreError;
			throw restoreFailure(writeError, "restore-failed", restoreError);
		}
	}
}
async function copyFallbackReplace(params) {
	const sourcePreview = await params.fsModule.lstat(params.src);
	if (sourcePreview.isSymbolicLink() || !sourcePreview.isFile()) throw new Error(`Refusing copy fallback from non-file source: ${params.src}`);
	const sourceHandle = await params.fsModule.open(params.src, OPEN_READ_FLAGS);
	let destHandle = null;
	try {
		const sourceStat = await sourceHandle.stat();
		const sourceCurrent = await params.fsModule.lstat(params.src);
		if (!sourceStat.isFile() || sourceCurrent.isSymbolicLink() || !sameFileIdentity(sourceStat, sourceCurrent)) throw new FsSafeError("path-mismatch", `Copy fallback source changed while opening: ${params.src}`);
		const replacement = await sourceHandle.readFile();
		if (params.restore === "restore-original") {
			const pinned = await openPinnedDestination(params.fsModule, params.dest, params.destinationHardlinks);
			if (pinned) {
				destHandle = pinned.handle;
				await replacePinnedWithRestore(destHandle, replacement, params.maxRestoreBytes);
			}
		}
		if (!destHandle) {
			const destStat = await params.fsModule.lstat(params.dest).catch((error) => {
				if (notFound(error)) return null;
				throw error;
			});
			if (destStat?.isSymbolicLink()) throw new FsSafeError("symlink", `Refusing copy fallback through symlink destination: ${params.dest}`);
			if (destStat) {
				await assertDestinationHardlinkPolicy(params.fsModule, params.dest, params.destinationHardlinks);
				await params.fsModule.rm(params.dest, { force: true });
			}
			destHandle = await params.fsModule.open(params.dest, OPEN_WRITE_EXCLUSIVE_FLAGS, sourceStat.mode & 511);
			await destHandle.writeFile(replacement);
		}
	} finally {
		await destHandle?.close().catch(() => void 0);
		await sourceHandle.close().catch(() => void 0);
	}
	await params.fsModule.unlink(params.src).catch(() => void 0);
}
function copyFallbackReplaceSync(params) {
	const sourcePreview = params.fsModule.lstatSync(params.src);
	if (sourcePreview.isSymbolicLink() || !sourcePreview.isFile()) throw new Error(`Refusing copy fallback from non-file source: ${params.src}`);
	const sourceFd = params.fsModule.openSync(params.src, OPEN_READ_FLAGS);
	let destFd;
	try {
		const sourceStat = params.fsModule.fstatSync(sourceFd);
		const sourceCurrent = params.fsModule.lstatSync(params.src);
		if (!sourceStat.isFile() || sourceCurrent.isSymbolicLink() || !sameFileIdentity(sourceStat, sourceCurrent)) throw new FsSafeError("path-mismatch", `Copy fallback source changed while opening: ${params.src}`);
		const replacement = readBoundedSync(params.fsModule, sourceFd, Number.MAX_SAFE_INTEGER);
		if (params.restore === "restore-original") {
			const pinned = openPinnedDestinationSync(params.fsModule, params.dest, params.destinationHardlinks);
			if (pinned) {
				destFd = pinned.fd;
				replacePinnedWithRestoreSync(params.fsModule, destFd, replacement, params.maxRestoreBytes);
			}
		}
		if (destFd === void 0) {
			let destStat = null;
			try {
				destStat = params.fsModule.lstatSync(params.dest);
			} catch (error) {
				if (!notFound(error)) throw error;
			}
			if (destStat?.isSymbolicLink()) throw new FsSafeError("symlink", `Refusing copy fallback through symlink destination: ${params.dest}`);
			if (destStat) {
				assertDestinationHardlinkPolicySync(params.fsModule, params.dest, params.destinationHardlinks);
				params.fsModule.rmSync(params.dest, { force: true });
			}
			destFd = params.fsModule.openSync(params.dest, OPEN_WRITE_EXCLUSIVE_FLAGS, sourceStat.mode & 511);
			writeAllSync(params.fsModule, destFd, replacement);
		}
	} finally {
		if (destFd !== void 0) try {
			params.fsModule.closeSync(destFd);
		} catch {}
		try {
			params.fsModule.closeSync(sourceFd);
		} catch {}
	}
	try {
		params.fsModule.unlinkSync(params.src);
	} catch {}
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/replace-file.js
function isRetryableRenameError(error) {
	return error.code === "EBUSY";
}
function isPermissionRenameError(error) {
	const code = error.code;
	return code === "EPERM" || code === "EEXIST";
}
async function sleep(ms) {
	await new Promise((resolve) => setTimeout(resolve, ms));
}
async function renameWithRetry(params) {
	for (let attempt = 0; attempt <= params.maxRetries; attempt++) try {
		await params.fsModule.rename(params.src, params.dest);
		return { method: "rename" };
	} catch (error) {
		if (isRetryableRenameError(error) && attempt < params.maxRetries) {
			await sleep(params.baseDelayMs * 2 ** attempt);
			continue;
		}
		if (params.copyFallbackOnPermissionError && isPermissionRenameError(error)) {
			await copyFallbackReplace({
				fsModule: params.fsModule,
				src: params.src,
				dest: params.dest,
				destinationHardlinks: params.destinationHardlinks,
				restore: params.copyFallbackRestore,
				maxRestoreBytes: params.maxRestoreBytes
			});
			return { method: "copy-fallback" };
		}
		throw error;
	}
	throw new Error("Atomic rename retry loop exhausted.");
}
function sleepSync(ms) {
	if (ms <= 0) return;
	Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}
function renameWithRetrySync(params) {
	for (let attempt = 0; attempt <= params.maxRetries; attempt++) try {
		params.fsModule.renameSync(params.src, params.dest);
		return { method: "rename" };
	} catch (error) {
		if (isRetryableRenameError(error) && attempt < params.maxRetries) {
			sleepSync(params.baseDelayMs * 2 ** attempt);
			continue;
		}
		if (params.copyFallbackOnPermissionError && isPermissionRenameError(error)) {
			copyFallbackReplaceSync({
				fsModule: params.fsModule,
				src: params.src,
				dest: params.dest,
				destinationHardlinks: params.destinationHardlinks,
				restore: params.copyFallbackRestore,
				maxRestoreBytes: params.maxRestoreBytes
			});
			return { method: "copy-fallback" };
		}
		throw error;
	}
	throw new Error("Atomic rename retry loop exhausted.");
}
function validateReplaceFilePath(filePath) {
	if (!filePath || filePath.includes("\0")) throw new Error("Atomic replace file path must be non-empty.");
}
function validateRestoreOptions(options) {
	if (options.copyFallbackRestore !== "restore-original") return;
	if (options.maxRestoreBytes === void 0) throw new RangeError("maxRestoreBytes is required when copyFallbackRestore is restore-original");
	if (!Number.isSafeInteger(options.maxRestoreBytes) || options.maxRestoreBytes < 0) throw new RangeError("maxRestoreBytes must be a non-negative safe integer");
}
function buildReplaceTempPath(filePath, tempPrefix) {
	const dir = path.dirname(filePath);
	const safePrefix = assertSafePathPrefix(tempPrefix ?? ".fs-safe-replace", { label: "atomic replace temp prefix" });
	return path.join(dir, `${safePrefix}.${process.pid}.${randomUUID()}.tmp`);
}
async function resolveMode(options) {
	const defaultMode = options.mode ?? 384;
	if (!options.preserveExistingMode) return defaultMode;
	const stat = await (options.fileSystem?.promises ?? fs$1).stat(options.filePath).catch((error) => {
		if (error.code === "ENOENT") return null;
		throw error;
	});
	return stat ? stat.mode : defaultMode;
}
function resolveModeSync(options) {
	const defaultMode = options.mode ?? 384;
	if (!options.preserveExistingMode) return defaultMode;
	const fsModule = options.fileSystem ?? fs;
	let stat;
	try {
		stat = fsModule.statSync(options.filePath);
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
	}
	return stat ? stat.mode : defaultMode;
}
async function syncTempFile(fsModule, tempPath) {
	const handle = await fsModule.open(tempPath, "r+");
	try {
		await handle.sync();
	} catch (error) {
		if (error.code !== "EPERM") throw error;
	} finally {
		await handle.close();
	}
}
function syncTempFileSync(fsModule, tempPath) {
	const fd = fsModule.openSync(tempPath, "r+");
	try {
		fsModule.fsyncSync(fd);
	} catch (error) {
		if (error.code !== "EPERM") throw error;
	} finally {
		fsModule.closeSync(fd);
	}
}
async function syncDirectoryBestEffort(fsModule, dirPath) {
	let handle;
	try {
		handle = await fsModule.open(dirPath, "r");
		await handle.sync();
	} catch {} finally {
		await handle?.close().catch(() => void 0);
	}
}
function syncDirectoryBestEffortSync(fsModule, dirPath) {
	let fd;
	try {
		fd = fsModule.openSync(dirPath, "r");
		fsModule.fsyncSync(fd);
	} catch {} finally {
		if (fd !== void 0) try {
			fsModule.closeSync(fd);
		} catch {}
	}
}
async function cleanupTempFile(params) {
	const cleanupError = await params.fsModule.rm(params.tempPath, { force: true }).catch((error) => error);
	if (cleanupError && params.throwOnCleanupError && params.originalError !== void 0) throw new Error(`Atomic file replace failed (${String(params.originalError)}); cleanup also failed (${String(cleanupError)})`, { cause: params.originalError });
}
async function replaceFileAtomic(options) {
	const filePath = options.filePath;
	validateReplaceFilePath(filePath);
	validateRestoreOptions(options);
	return await serializePathWrite(path.resolve(filePath), async () => {
		return await replaceFileAtomicUnserialized(options);
	});
}
async function replaceFileAtomicUnserialized(options) {
	const filePath = options.filePath;
	const fsModule = options.fileSystem?.promises ?? fs$1;
	const dir = path.dirname(filePath);
	const dirMode = options.dirMode ?? 448;
	const mode = await resolveMode(options);
	const tempPath = buildReplaceTempPath(filePath, options.tempPrefix);
	const unregisterTempPath = registerTempPathForExit(tempPath);
	let tempExists = false;
	let originalError;
	await fsModule.mkdir(dir, {
		recursive: true,
		mode: dirMode
	});
	await fsModule.chmod(dir, dirMode).catch(() => void 0);
	try {
		tempExists = true;
		await fsModule.writeFile(tempPath, options.content, {
			mode,
			flag: "wx"
		});
		unregisterTempPath.setIdentity(await fsModule.lstat(tempPath));
		if (options.syncTempFile) await syncTempFile(fsModule, tempPath);
		if (options.beforeRename) await options.beforeRename({
			filePath,
			tempPath
		});
		await assertDestinationHardlinkPolicy(fsModule, filePath, options.destinationHardlinks);
		const result = await renameWithRetry({
			fsModule,
			src: tempPath,
			dest: filePath,
			maxRetries: options.renameMaxRetries ?? 0,
			baseDelayMs: options.renameRetryBaseDelayMs ?? 50,
			copyFallbackOnPermissionError: options.copyFallbackOnPermissionError === true,
			copyFallbackRestore: options.copyFallbackRestore ?? "none",
			maxRestoreBytes: options.maxRestoreBytes,
			destinationHardlinks: options.destinationHardlinks
		});
		tempExists = false;
		unregisterTempPath();
		await fsModule.chmod(filePath, mode).catch(() => void 0);
		if (options.syncParentDir) await syncDirectoryBestEffort(fsModule, dir);
		return result;
	} catch (error) {
		originalError = error;
		throw error;
	} finally {
		if (tempExists) await cleanupTempFile({
			fsModule,
			tempPath,
			originalError,
			throwOnCleanupError: options.throwOnCleanupError === true
		});
		unregisterTempPath();
	}
}
function replaceFileAtomicSync(options) {
	const filePath = options.filePath;
	validateReplaceFilePath(filePath);
	validateRestoreOptions(options);
	const fsModule = options.fileSystem ?? fs;
	const dir = path.dirname(filePath);
	const dirMode = options.dirMode ?? 448;
	const mode = resolveModeSync(options);
	const tempPath = buildReplaceTempPath(filePath, options.tempPrefix);
	const unregisterTempPath = registerTempPathForExit(tempPath);
	let tempExists = false;
	let originalError;
	fsModule.mkdirSync(dir, {
		recursive: true,
		mode: dirMode
	});
	try {
		fsModule.chmodSync(dir, dirMode);
	} catch {}
	try {
		tempExists = true;
		fsModule.writeFileSync(tempPath, options.content, {
			mode,
			flag: "wx"
		});
		unregisterTempPath.setIdentity(fsModule.lstatSync(tempPath));
		if (options.syncTempFile) syncTempFileSync(fsModule, tempPath);
		if (options.beforeRename) options.beforeRename({
			filePath,
			tempPath
		});
		assertDestinationHardlinkPolicySync(fsModule, filePath, options.destinationHardlinks);
		const result = renameWithRetrySync({
			fsModule,
			src: tempPath,
			dest: filePath,
			maxRetries: options.renameMaxRetries ?? 0,
			baseDelayMs: options.renameRetryBaseDelayMs ?? 50,
			copyFallbackOnPermissionError: options.copyFallbackOnPermissionError === true,
			copyFallbackRestore: options.copyFallbackRestore ?? "none",
			maxRestoreBytes: options.maxRestoreBytes,
			destinationHardlinks: options.destinationHardlinks
		});
		tempExists = false;
		unregisterTempPath();
		try {
			fsModule.chmodSync(filePath, mode);
		} catch {}
		if (options.syncParentDir) syncDirectoryBestEffortSync(fsModule, dir);
		return result;
	} catch (error) {
		originalError = error;
		throw error;
	} finally {
		if (tempExists) try {
			fsModule.rmSync(tempPath, { force: true });
		} catch (cleanupError) {
			if (options.throwOnCleanupError && originalError !== void 0) throw new Error(`Atomic file replace failed (${String(originalError)}); cleanup also failed (${String(cleanupError)})`, { cause: originalError });
		}
		unregisterTempPath();
	}
}
//#endregion
export { replaceFileAtomicSync as n, replaceFileAtomic as t };
