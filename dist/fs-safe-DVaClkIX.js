import { t as FsSafeError } from "./errors-CIm_ZhaM.js";
import "./fs-safe-defaults-BsoUVa5C.js";
import { r as readFileHandleBounded } from "./bounded-read-Cox0d2jX.js";
import { b as isWindowsNetworkPath, i as isPathInside, m as assertNoUnsafeDeviceReadPath, o as isPathRelativeEscape, r as isNotFoundPathError, s as isSymlinkOpenError, x as safeFileURLToPath, y as isWindowsDriveLetterPath } from "./path-D8zNGPJM.js";
import { t as sameFileIdentity } from "./file-identity-C0fBiekR.js";
import { E as createAsyncDirectoryGuard, c as guardedRmSync, g as expandHomePrefix, l as withAsyncDirectoryGuards, m as syncDirectoryBestEffort, o as guardedRenameSync, r as getFsSafeTestHooks, v as resolveUserPath, x as findExistingAncestor } from "./pinned-write-CO4XA8tE.js";
import { i as root$1 } from "./root-impl-DYBxk3hn.js";
import { n as registerTempPathForExit, t as serializePathWrite } from "./write-queue-Cq_SK85X.js";
import { t as tempFile } from "./temp-target-CTNQantz.js";
import { a as inspectPathPermissions, c as isWorldReadable, l as isWorldWritable, o as isGroupReadable, s as isGroupWritable, u as modeBits } from "./permissions-CvYj0JYg.js";
import { randomUUID } from "node:crypto";
import fs, { constants } from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
import os from "node:os";
//#region node_modules/@openclaw/fs-safe/dist/filename.js
const WINDOWS_INVALID_FILE_NAME_CHARACTERS = /* @__PURE__ */ new Set("<>:\"/\\|?*");
function sanitizeUntrustedFileName$1(fileName, fallbackName) {
	const trimmed = typeof fileName === "string" ? fileName.trim() : "";
	if (!trimmed) return fallbackName;
	let base = path.posix.basename(trimmed);
	base = path.win32.basename(base);
	let cleaned = "";
	for (let i = 0; i < base.length; i++) {
		const code = base.charCodeAt(i);
		if (code < 32 || code >= 127 && code <= 159 || WINDOWS_INVALID_FILE_NAME_CHARACTERS.has(base[i])) continue;
		cleaned += base[i];
	}
	base = cleaned.trim();
	if (!base || base === "." || base === "..") return fallbackName;
	if (base.length > 200) base = base.slice(0, 200);
	return base;
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/fs.js
/**
* Returns true when `fs.stat()` can stat the path.
*
* This follows stat semantics: broken symlinks return false, while symlinks to
* existing targets return true.
*/
async function pathExists(filePath) {
	try {
		await fs$1.stat(filePath);
		return true;
	} catch {
		return false;
	}
}
/**
* Synchronous counterpart to `pathExists()`, with the same `fs.statSync()`
* semantics.
*/
function pathExistsSync(filePath) {
	try {
		fs.statSync(filePath);
		return true;
	} catch {
		return false;
	}
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/local-roots.js
function resolveLocalPathInput(input, label) {
	if (input.startsWith("file://")) try {
		return safeFileURLToPath(input);
	} catch {
		const location = label === "file path" ? "" : ` in ${label}`;
		throw new Error(`Invalid file:// URL${location}: ${input}`);
	}
	if (input.includes("\0")) throw new FsSafeError("invalid-path", `${label} must not contain NUL bytes`);
	return resolveUserPath(input);
}
function resolveLocalRootInput(input, label) {
	const trimmed = input.trim();
	if (!trimmed) throw new FsSafeError("invalid-path", `${label} entry is required`);
	const resolved = trimmed.startsWith("file://") ? resolveLocalPathInput(trimmed, label) : expandHomePrefix(trimmed);
	if (resolved.includes("\0")) throw new FsSafeError("invalid-path", `${label} entry must not contain NUL bytes`);
	if (!path.isAbsolute(resolved)) throw new FsSafeError("invalid-path", `${label} entries must be absolute paths: ${input}`);
	return path.resolve(resolved);
}
function isPathInsideRoot(candidate, rootDir) {
	return isPathInside(rootDir, candidate);
}
function resolveRootRealSync(rootDir) {
	try {
		if (!fs.lstatSync(rootDir).isDirectory()) return null;
		return fs.realpathSync(rootDir);
	} catch {
		return null;
	}
}
function resolveCandidateCanonicalSync(filePath) {
	let sawExistingLeaf = false;
	try {
		const stat = fs.lstatSync(filePath);
		sawExistingLeaf = true;
		return {
			exists: true,
			canonicalPath: fs.realpathSync(filePath),
			isFile: stat.isFile()
		};
	} catch (err) {
		if (err.code !== "ENOENT") throw err;
	}
	if (sawExistingLeaf) throw new FsSafeError("symlink", "local roots candidate is a dangling symlink");
	let cursor = filePath;
	const missingSegments = [];
	while (true) {
		const parent = path.dirname(cursor);
		if (parent === cursor) return {
			exists: false,
			canonicalPath: filePath
		};
		missingSegments.unshift(path.basename(cursor));
		cursor = parent;
		try {
			fs.lstatSync(cursor);
			const ancestorReal = fs.realpathSync(cursor);
			return {
				exists: false,
				canonicalPath: path.join(ancestorReal, ...missingSegments)
			};
		} catch (err) {
			if (err.code !== "ENOENT") throw err;
		}
	}
}
function resolveLocalPathFromRootsSync(options) {
	const label = options.label ?? "local roots";
	const requestedPath = path.resolve(resolveLocalPathInput(options.filePath, "file path"));
	for (const rootEntry of options.roots) {
		const rootReal = resolveRootRealSync(resolveLocalRootInput(rootEntry, label));
		if (!rootReal) continue;
		let candidate;
		try {
			candidate = resolveCandidateCanonicalSync(requestedPath);
		} catch {
			continue;
		}
		if (!candidate.exists && options.allowMissing !== true) continue;
		if (candidate.exists && options.requireFile === true && !candidate.isFile) continue;
		if (isPathInsideRoot(candidate.canonicalPath, rootReal)) return {
			path: candidate.canonicalPath,
			root: rootReal
		};
	}
	return null;
}
async function readLocalFileFromRoots(options) {
	const label = options.label ?? "local roots";
	const requestedPath = path.resolve(resolveLocalPathInput(options.filePath, "file path"));
	for (const rootEntry of options.roots) {
		const rootDir = resolveLocalRootInput(rootEntry, label);
		let scopedRoot;
		try {
			scopedRoot = await root$1(rootDir);
		} catch {
			continue;
		}
		const relativePath = path.relative(scopedRoot.rootDir, requestedPath);
		if (!relativePath || relativePath === ".." || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath)) continue;
		try {
			const readOptions = {
				hardlinks: options.hardlinks,
				nonBlockingRead: options.nonBlockingRead,
				symlinks: options.symlinks
			};
			if (options.maxBytes !== void 0) readOptions.maxBytes = options.maxBytes;
			return {
				...await scopedRoot.read(relativePath, readOptions),
				root: scopedRoot.rootReal
			};
		} catch {
			continue;
		}
	}
	return null;
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/root-paths.js
function invalidPath(scopeLabel) {
	return {
		ok: false,
		error: `Invalid path: must stay within ${scopeLabel}`
	};
}
function pathStaysWithinRoot(rootDir, candidatePath) {
	const relative = path.relative(rootDir, candidatePath);
	return Boolean(relative) && !isPathRelativeEscape(relative);
}
async function resolveRealPathIfExists(targetPath) {
	try {
		return await fs$1.realpath(targetPath);
	} catch {
		return;
	}
}
async function resolveTrustedRootRealPath(rootDir) {
	try {
		const rootLstat = await fs$1.lstat(rootDir);
		if (!rootLstat.isDirectory() || rootLstat.isSymbolicLink()) return;
		return await fs$1.realpath(rootDir);
	} catch {
		return;
	}
}
async function validateCanonicalPathWithinRoot(params) {
	try {
		const candidateLstat = await fs$1.lstat(params.candidatePath);
		if (candidateLstat.isSymbolicLink()) return "invalid";
		if (params.expect === "directory" && !candidateLstat.isDirectory()) return "invalid";
		if (params.expect === "file" && !candidateLstat.isFile()) return "invalid";
		if (params.expect === "file" && candidateLstat.nlink > 1) return "invalid";
		const candidateRealPath = await fs$1.realpath(params.candidatePath);
		return isPathInside(params.rootRealPath, candidateRealPath) ? "ok" : "invalid";
	} catch (err) {
		return isNotFoundPathError(err) ? "not-found" : "invalid";
	}
}
function resolvePathWithinRoot(params) {
	const root = path.resolve(params.rootDir);
	const raw = params.requestedPath.trim();
	if (!raw) {
		if (!params.defaultFileName) return {
			ok: false,
			error: "path is required"
		};
		const defaultPath = path.resolve(root, params.defaultFileName);
		if (!pathStaysWithinRoot(root, defaultPath)) return {
			ok: false,
			error: `Invalid path: must stay within ${params.scopeLabel}`
		};
		return {
			ok: true,
			path: defaultPath
		};
	}
	const resolved = path.resolve(root, raw);
	if (!pathStaysWithinRoot(root, resolved)) return {
		ok: false,
		error: `Invalid path: must stay within ${params.scopeLabel}`
	};
	return {
		ok: true,
		path: resolved
	};
}
async function resolveWritablePathWithinRoot(params) {
	const lexical = resolvePathWithinRoot(params);
	if (!lexical.ok) return lexical;
	const rootRealPath = await resolveTrustedRootRealPath(path.resolve(params.rootDir));
	if (!rootRealPath) return invalidPath(params.scopeLabel);
	const requestedPath = lexical.path;
	if (await validateCanonicalPathWithinRoot({
		rootRealPath,
		candidatePath: path.dirname(requestedPath),
		expect: "directory"
	}) !== "ok") return invalidPath(params.scopeLabel);
	if (await validateCanonicalPathWithinRoot({
		rootRealPath,
		candidatePath: requestedPath,
		expect: "file"
	}) === "invalid") return invalidPath(params.scopeLabel);
	return lexical;
}
async function resolveNearestExistingPath(targetPath) {
	let current = path.resolve(targetPath);
	while (true) {
		try {
			await fs$1.lstat(current);
			return current;
		} catch (err) {
			if (!isNotFoundPathError(err)) throw err;
		}
		const parent = path.dirname(current);
		if (parent === current) throw new Error(`failed to resolve existing path for ${targetPath}`);
		current = parent;
	}
}
async function assertNoSymlinkSegments(params) {
	const relative = path.relative(params.rootDir, params.targetPath);
	if (isPathRelativeEscape(relative)) throw new Error(`Invalid path: must stay within ${params.scopeLabel}`);
	let current = params.rootDir;
	for (const segment of relative.split(path.sep).filter(Boolean)) {
		current = path.join(current, segment);
		try {
			const stat = await fs$1.lstat(current);
			if (stat.isSymbolicLink()) throw new Error(`Invalid path: must not traverse symlinks within ${params.scopeLabel}`);
			if (!stat.isDirectory()) throw new Error(`Invalid path: existing segment must be a directory within ${params.scopeLabel}`);
		} catch (err) {
			if (isNotFoundPathError(err)) return;
			throw err;
		}
	}
}
async function ensureDirectoryWithinRoot(params) {
	const lexical = resolvePathWithinRoot({
		rootDir: params.rootDir,
		requestedPath: params.requestedPath,
		scopeLabel: params.scopeLabel,
		defaultFileName: params.defaultDirName
	});
	if (!lexical.ok) return lexical;
	const rootDir = path.resolve(params.rootDir);
	const targetPath = path.resolve(lexical.path);
	try {
		const rootStat = await fs$1.lstat(rootDir);
		if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) return invalidPath(params.scopeLabel);
		await assertNoSymlinkSegments({
			rootDir,
			targetPath,
			scopeLabel: params.scopeLabel
		});
		const rootReal = await fs$1.realpath(rootDir);
		const nearestExistingPath = await resolveNearestExistingPath(targetPath);
		if (!isPathInside(rootReal, await fs$1.realpath(nearestExistingPath))) return invalidPath(params.scopeLabel);
		const relative = path.relative(rootDir, targetPath);
		let current = rootDir;
		for (const segment of relative.split(path.sep).filter(Boolean)) {
			current = path.join(current, segment);
			while (true) try {
				const stat = await fs$1.lstat(current);
				if (stat.isSymbolicLink() || !stat.isDirectory()) return invalidPath(params.scopeLabel);
				break;
			} catch (err) {
				if (!isNotFoundPathError(err)) throw err;
				try {
					await fs$1.mkdir(current, { mode: params.mode });
				} catch (mkdirErr) {
					if (isNotFoundPathError(mkdirErr)) throw mkdirErr;
					if (mkdirErr.code === "EEXIST") continue;
					throw mkdirErr;
				}
			}
			if (!isPathInside(rootReal, await fs$1.realpath(current))) return invalidPath(params.scopeLabel);
		}
		if (!isPathInside(rootReal, await fs$1.realpath(targetPath))) return invalidPath(params.scopeLabel);
		return {
			ok: true,
			path: targetPath
		};
	} catch {
		return invalidPath(params.scopeLabel);
	}
}
function resolvePathsWithinRoot(params) {
	const resolvedPaths = [];
	for (const raw of params.requestedPaths) {
		const pathResult = resolvePathWithinRoot({
			rootDir: params.rootDir,
			requestedPath: raw,
			scopeLabel: params.scopeLabel
		});
		if (!pathResult.ok) return {
			ok: false,
			error: pathResult.error
		};
		resolvedPaths.push(pathResult.path);
	}
	return {
		ok: true,
		paths: resolvedPaths
	};
}
async function resolveExistingPathsWithinRoot(params) {
	return await resolveCheckedPathsWithinRoot(params, true);
}
async function resolveStrictExistingPathsWithinRoot(params) {
	return await resolveCheckedPathsWithinRoot(params, false);
}
function pathScope(rootDir, options) {
	const base = {
		rootDir,
		scopeLabel: options.label
	};
	return {
		rootDir,
		label: options.label,
		resolve: (requestedPath, pathOptions) => resolvePathWithinRoot({
			...base,
			requestedPath,
			defaultFileName: pathOptions?.defaultName
		}),
		resolveAll: (requestedPaths) => resolvePathsWithinRoot({
			...base,
			requestedPaths
		}),
		existing: (requestedPaths) => resolveExistingPathsWithinRoot({
			...base,
			requestedPaths
		}),
		files: (requestedPaths) => resolveStrictExistingPathsWithinRoot({
			...base,
			requestedPaths
		}),
		writable: (requestedPath, pathOptions) => resolveWritablePathWithinRoot({
			...base,
			requestedPath,
			defaultFileName: pathOptions?.defaultName
		}),
		ensureDir: (requestedPath, pathOptions) => ensureDirectoryWithinRoot({
			...base,
			requestedPath,
			defaultDirName: pathOptions?.defaultName,
			mode: pathOptions?.mode
		})
	};
}
async function resolveCheckedPathsWithinRoot(params, allowMissingFallback) {
	const rootDir = path.resolve(params.rootDir);
	const rootRealPath = await resolveRealPathIfExists(rootDir);
	const root = rootRealPath ? await root$1(rootDir) : void 0;
	const isInRoot = (relativePath) => Boolean(relativePath) && relativePath !== ".." && !relativePath.startsWith(`..${path.sep}`) && !path.isAbsolute(relativePath);
	const resolveExistingRelativePath = async (requestedPath) => {
		const raw = requestedPath.trim();
		const lexicalPathResult = resolvePathWithinRoot({
			rootDir,
			requestedPath,
			scopeLabel: params.scopeLabel
		});
		if (lexicalPathResult.ok) return {
			ok: true,
			relativePath: path.relative(rootDir, lexicalPathResult.path),
			fallbackPath: lexicalPathResult.path
		};
		if (!rootRealPath || !raw || !path.isAbsolute(raw)) return lexicalPathResult;
		try {
			const resolvedExistingPath = await fs$1.realpath(raw);
			const relativePath = path.relative(rootRealPath, resolvedExistingPath);
			if (!isInRoot(relativePath)) return lexicalPathResult;
			return {
				ok: true,
				relativePath,
				fallbackPath: resolvedExistingPath
			};
		} catch {
			return lexicalPathResult;
		}
	};
	const resolvedPaths = [];
	for (const raw of params.requestedPaths) {
		const pathResult = await resolveExistingRelativePath(raw);
		if (!pathResult.ok) return {
			ok: false,
			error: pathResult.error
		};
		let opened;
		try {
			if (!root) throw new FsSafeError("not-found", "root dir not found");
			opened = await root.open(pathResult.relativePath);
			resolvedPaths.push(opened.realPath);
		} catch (err) {
			if (allowMissingFallback && err instanceof FsSafeError && err.code === "not-found") {
				if (!rootRealPath) {
					resolvedPaths.push(pathResult.fallbackPath);
					continue;
				}
				try {
					await assertNoSymlinkSegments({
						rootDir,
						targetPath: pathResult.fallbackPath,
						scopeLabel: params.scopeLabel
					});
					const existingPath = await resolveNearestExistingPath(pathResult.fallbackPath);
					if (!isPathInside(rootRealPath, await fs$1.realpath(existingPath))) return invalidPath(params.scopeLabel);
				} catch {
					return invalidPath(params.scopeLabel);
				}
				resolvedPaths.push(pathResult.fallbackPath);
				continue;
			}
			if (err instanceof FsSafeError && err.code === "outside-workspace") return {
				ok: false,
				error: `File is outside ${params.scopeLabel}`
			};
			return {
				ok: false,
				error: `Invalid path: must stay within ${params.scopeLabel} and be a regular non-symlink file`
			};
		} finally {
			await opened?.handle.close().catch(() => {});
		}
	}
	return {
		ok: true,
		paths: resolvedPaths
	};
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/trash.js
const TRASH_DESTINATION_COLLISION_CODES = /* @__PURE__ */ new Set([
	"EEXIST",
	"ENOTEMPTY",
	"ERR_FS_CP_EEXIST"
]);
const TRASH_DESTINATION_RETRY_LIMIT = 4;
function getFsErrorCode(error) {
	if (!error || typeof error !== "object" || !("code" in error)) return;
	const code = error.code;
	return typeof code === "string" ? code : void 0;
}
function isTrashDestinationCollision(error) {
	const code = getFsErrorCode(error);
	return Boolean(code && TRASH_DESTINATION_COLLISION_CODES.has(code));
}
function isSameOrChildPath(candidate, parent) {
	return candidate === parent || candidate.startsWith(`${parent}${path.sep}`);
}
function resolveAllowedTrashRoots(allowedRoots) {
	const roots = [...allowedRoots ?? [os.homedir(), os.tmpdir()]].flatMap((root) => {
		const lexicalRoot = path.resolve(root);
		try {
			return [path.resolve(fs.realpathSync.native(root)), lexicalRoot];
		} catch {
			return [lexicalRoot];
		}
	});
	return [...new Set(roots)];
}
function resolveTrashTargetPath(targetPath) {
	try {
		return {
			path: path.resolve(fs.realpathSync.native(targetPath)),
			resolved: true
		};
	} catch {
		return {
			path: path.resolve(targetPath),
			resolved: false
		};
	}
}
function assertAllowedTrashTarget(targetPath, allowedRoots) {
	const stat = fs.lstatSync(path.resolve(targetPath));
	const resolvedTarget = resolveTrashTargetPath(targetPath);
	const resolvedTargetPath = resolvedTarget.path;
	if (!resolveAllowedTrashRoots(allowedRoots).some((root) => resolvedTargetPath !== root && isSameOrChildPath(resolvedTargetPath, root))) throw new Error(`Refusing to trash path outside allowed roots: ${targetPath}`);
	return {
		path: path.resolve(targetPath),
		realPath: resolvedTargetPath,
		realPathResolved: resolvedTarget.resolved,
		stat
	};
}
function assertTrashTargetGuard(guard) {
	if (!sameFileIdentity(fs.lstatSync(guard.path), guard.stat)) throw new Error(`Refusing to trash path after it changed: ${guard.path}`);
	const current = resolveTrashTargetPath(guard.path);
	if (guard.realPathResolved && (!current.resolved || current.path !== guard.realPath)) throw new Error(`Refusing to trash path after it changed: ${guard.path}`);
	if (!guard.realPathResolved && current.resolved) throw new Error(`Refusing to trash path after it changed: ${guard.path}`);
}
function resolveTrashDir() {
	const homeDir = os.homedir();
	const trashDir = path.join(homeDir, ".Trash");
	fs.mkdirSync(trashDir, {
		recursive: true,
		mode: 448
	});
	const trashDirStat = fs.lstatSync(trashDir);
	if (!trashDirStat.isDirectory() || trashDirStat.isSymbolicLink()) throw new Error(`Refusing to use non-directory/symlink trash directory: ${trashDir}`);
	const realHome = path.resolve(fs.realpathSync.native(homeDir));
	const resolvedTrashDir = path.resolve(fs.realpathSync.native(trashDir));
	if (resolvedTrashDir === realHome || !isSameOrChildPath(resolvedTrashDir, realHome)) throw new Error(`Trash directory escaped home directory: ${trashDir}`);
	return resolvedTrashDir;
}
function trashBaseName(targetPath) {
	const resolvedTargetPath = path.resolve(targetPath);
	if (resolvedTargetPath === path.parse(resolvedTargetPath).root) throw new Error(`Refusing to trash root path: ${targetPath}`);
	const base = path.basename(resolvedTargetPath).replace(/[\\/]+/g, "");
	if (!base) throw new Error(`Unable to derive safe trash basename for: ${targetPath}`);
	return base;
}
function resolveContainedPath(root, leaf) {
	const resolvedRoot = path.resolve(root);
	const resolvedPath = path.resolve(resolvedRoot, leaf);
	if (!isSameOrChildPath(resolvedPath, resolvedRoot) || resolvedPath === resolvedRoot) throw new Error(`Trash destination escaped trash directory: ${resolvedPath}`);
	return resolvedPath;
}
function reserveTrashDestination(trashDir, base, timestamp) {
	const containerPrefix = resolveContainedPath(trashDir, `${base}-${timestamp}-`);
	const container = fs.mkdtempSync(containerPrefix);
	const resolvedContainer = path.resolve(container);
	const resolvedTrashDir = path.resolve(trashDir);
	if (resolvedContainer === resolvedTrashDir || !isSameOrChildPath(resolvedContainer, resolvedTrashDir)) throw new Error(`Trash destination escaped trash directory: ${container}`);
	return resolveContainedPath(container, base);
}
function movePathToDestination(target, dest) {
	getFsSafeTestHooks()?.beforeTrashMove?.(target.path, dest);
	assertTrashTargetGuard(target);
	try {
		guardedRenameSync({
			from: target.path,
			to: dest
		});
		return true;
	} catch (error) {
		if (getFsErrorCode(error) !== "EXDEV") {
			if (isTrashDestinationCollision(error)) return false;
			throw error;
		}
	}
	try {
		assertTrashTargetGuard(target);
		fs.cpSync(target.path, dest, {
			recursive: true,
			force: false,
			errorOnExist: true
		});
		assertTrashTargetGuard(target);
		guardedRmSync({
			target: target.path,
			recursive: true,
			force: false,
			verifyAfter: false
		});
		return true;
	} catch (error) {
		if (isTrashDestinationCollision(error)) return false;
		throw error;
	}
}
async function movePathToTrash(targetPath, options = {}) {
	const base = trashBaseName(targetPath);
	const target = assertAllowedTrashTarget(targetPath, options.allowedRoots);
	const trashDir = resolveTrashDir();
	const timestamp = Date.now();
	for (let attempt = 0; attempt < TRASH_DESTINATION_RETRY_LIMIT; attempt += 1) {
		const dest = reserveTrashDestination(trashDir, base, timestamp);
		if (movePathToDestination(target, dest)) return dest;
	}
	throw new Error(`Unable to choose a unique trash destination for ${targetPath}`);
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/timing.js
async function withTimeout(promise, timeoutMs, labelOrOptions = { message: "timeout" }) {
	if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) return await promise;
	const options = typeof labelOrOptions === "string" ? { label: labelOrOptions } : labelOrOptions;
	const createError = options.createError ?? (() => new Error(options.message ?? `${options.label ?? "operation"} timed out after ${timeoutMs}ms`));
	let timeoutId;
	try {
		return await Promise.race([promise, new Promise((_, reject) => {
			timeoutId = setTimeout(() => {
				try {
					reject(createError());
				} catch (error) {
					reject(error);
				}
			}, timeoutMs);
		})]);
	} finally {
		if (timeoutId) clearTimeout(timeoutId);
	}
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/output-sibling.js
const OPEN_READ_WRITE_NOFOLLOW = fs.constants.O_RDWR | (process.platform !== "win32" && typeof fs.constants.O_NOFOLLOW === "number" ? fs.constants.O_NOFOLLOW : 0);
function safeFallbackFileName(fallbackFileName) {
	return sanitizeUntrustedFileName$1(fallbackFileName ?? "output.bin", "output.bin");
}
function buildSiblingTempPath(targetPath, fallbackFileName) {
	const safeTail = sanitizeUntrustedFileName$1(path.basename(targetPath), safeFallbackFileName(fallbackFileName));
	return path.join(path.dirname(targetPath), `.fs-safe-output-${process.pid}-${randomUUID()}-${safeTail}.part`);
}
function assertStagedFile(pathname, opened, maxBytes) {
	if (pathname.isSymbolicLink() || !pathname.isFile() || !opened.isFile()) throw new FsSafeError("not-file", "sibling-staged output must be a regular file");
	if (!sameFileIdentity(pathname, opened)) throw new FsSafeError("path-mismatch", "sibling-staged output changed while opening");
	if (opened.nlink > 1) throw new FsSafeError("hardlink", "hardlinked sibling-staged output not allowed");
	if (maxBytes !== void 0 && opened.size > maxBytes) throw new FsSafeError("too-large", `sibling-staged output exceeds maxBytes (${maxBytes})`);
}
async function openPinnedStagedFile(tempPath, maxBytes) {
	if ((await fs$1.lstat(tempPath)).isSymbolicLink()) throw new FsSafeError("symlink", "symlink sibling-staged output not allowed");
	const handle = await fs$1.open(tempPath, OPEN_READ_WRITE_NOFOLLOW);
	try {
		const identity = await handle.stat();
		assertStagedFile(await fs$1.lstat(tempPath), identity, maxBytes);
		return {
			handle,
			identity
		};
	} catch (error) {
		await handle.close().catch(() => void 0);
		throw error;
	}
}
async function syncFile(handle) {
	try {
		await handle.sync();
	} catch (error) {
		if (error.code !== "EPERM") throw error;
	}
}
async function cleanupTempPath(tempPath, identity) {
	try {
		const current = await fs$1.lstat(tempPath);
		if (!identity || !current.isSymbolicLink() && sameFileIdentity(current, identity)) await fs$1.rm(tempPath, { force: true });
	} catch (error) {
		if (error.code !== "ENOENT") {}
	}
}
async function writeExternalFileViaSibling(params) {
	const finalPath = path.resolve(params.finalPath);
	const parentPath = path.dirname(finalPath);
	const parentGuard = await createAsyncDirectoryGuard(parentPath);
	const tempPath = buildSiblingTempPath(finalPath, params.fallbackFileName);
	const unregisterTempPath = registerTempPathForExit(tempPath);
	let stagedIdentity;
	let renamed = false;
	try {
		const result = await params.write(tempPath);
		const pinned = await openPinnedStagedFile(tempPath, params.maxBytes);
		stagedIdentity = pinned.identity;
		unregisterTempPath.setIdentity(stagedIdentity);
		try {
			if (params.mode !== void 0) await pinned.handle.chmod(params.mode);
			await syncFile(pinned.handle);
			await serializePathWrite(finalPath, async () => {
				await withAsyncDirectoryGuards([parentGuard], async () => {
					const currentIdentity = await pinned.handle.stat();
					assertStagedFile(await fs$1.lstat(tempPath), currentIdentity, params.maxBytes);
					if (!sameFileIdentity(currentIdentity, stagedIdentity)) throw new FsSafeError("path-mismatch", "sibling-staged output changed before rename");
					await fs$1.rename(tempPath, finalPath);
					renamed = true;
					const published = await fs$1.lstat(finalPath);
					if (published.isSymbolicLink() || !sameFileIdentity(published, currentIdentity)) throw new FsSafeError("path-mismatch", "sibling-staged output changed during rename");
				});
				await syncDirectoryBestEffort(parentPath);
			});
		} finally {
			await pinned.handle.close().catch(() => void 0);
		}
		return result;
	} finally {
		if (!renamed) await cleanupTempPath(tempPath, stagedIdentity);
		unregisterTempPath();
	}
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/output.js
const NON_PORTABLE_FILE_NAME_CHARACTERS = /[\u0000-\u001f\u007f-\u009f<>:"/\\|?*]/u;
function tempFileNameForTarget(targetPath, fallbackFileName) {
	const fallback = sanitizeUntrustedFileName$1(fallbackFileName ?? "output.bin", "output.bin");
	return sanitizeUntrustedFileName$1(path.basename(targetPath), fallback);
}
function sanitizedTargetPath(targetPath, fallbackFileName) {
	const basename = path.basename(targetPath);
	if (!NON_PORTABLE_FILE_NAME_CHARACTERS.test(basename)) return targetPath;
	const sanitized = tempFileNameForTarget(targetPath, fallbackFileName);
	return sanitized === basename ? targetPath : path.join(path.dirname(targetPath), sanitized);
}
function ensureTrailingSep(value) {
	return value.endsWith(path.sep) ? value : `${value}${path.sep}`;
}
function toRootPathInput(params) {
	if (!path.isAbsolute(params.targetPath)) return params.targetPath;
	const absoluteTarget = path.resolve(params.targetPath);
	const rootDir = path.resolve(params.rootDir);
	if (isPathInside(ensureTrailingSep(rootDir), absoluteTarget)) return path.relative(rootDir, absoluteTarget);
	if (isPathInside(ensureTrailingSep(params.rootReal), absoluteTarget)) return path.relative(params.rootReal, absoluteTarget);
	return params.targetPath;
}
function assertFileTargetPath(targetPath) {
	const basename = path.basename(targetPath);
	if (!targetPath || targetPath === "." || targetPath.endsWith("/") || targetPath.endsWith("\\") || !basename || basename === "." || basename === "..") throw new FsSafeError("invalid-path", "target path must name a file");
}
async function writeExternalFileWithinRoot$1(options) {
	const targetRoot = await root$1(options.rootDir);
	const requestedTargetPath = options.path;
	if (requestedTargetPath.length === 0) throw new FsSafeError("invalid-path", "target path is required");
	assertFileTargetPath(requestedTargetPath);
	const rawTargetPath = toRootPathInput({
		rootDir: targetRoot.rootDir,
		rootReal: targetRoot.rootReal,
		targetPath: requestedTargetPath
	});
	assertFileTargetPath(rawTargetPath);
	const targetPath = sanitizedTargetPath(rawTargetPath, options.fallbackFileName);
	const finalPath = await targetRoot.resolve(targetPath);
	if (options.staging === "sibling") {
		const parentPath = path.dirname(targetPath);
		if (parentPath !== ".") await targetRoot.mkdir(parentPath);
		const siblingFinalPath = await targetRoot.resolve(targetPath);
		return {
			path: siblingFinalPath,
			result: await writeExternalFileViaSibling({
				finalPath: siblingFinalPath,
				write: options.write,
				fallbackFileName: options.fallbackFileName,
				maxBytes: options.maxBytes,
				mode: options.mode
			})
		};
	}
	const staged = await tempFile({
		prefix: "fs-safe-output",
		fileName: tempFileNameForTarget(targetPath, options.fallbackFileName)
	});
	try {
		const result = await options.write(staged.path);
		await targetRoot.copyIn(targetPath, staged.path, {
			maxBytes: options.maxBytes,
			mode: options.mode,
			mkdir: true,
			sourceHardlinks: "reject"
		});
		return {
			path: finalPath,
			result
		};
	} finally {
		await staged.cleanup();
	}
}
//#endregion
//#region src/infra/fs-safe-advanced.ts
/** Preserve the shipped Plugin SDK filename contract while fs-safe owns path basename handling. */
function sanitizeUntrustedFileName(fileName, fallbackName) {
	const trimmed = typeof fileName === "string" ? fileName.trim() : "";
	if (!trimmed) return fallbackName;
	let base = path.win32.basename(path.posix.basename(trimmed));
	let cleaned = "";
	for (let index = 0; index < base.length; index += 1) {
		const code = base.charCodeAt(index);
		if (code < 32 || code === 127) continue;
		cleaned += base[index];
	}
	base = cleaned.trim();
	if (!base || base === "." || base === "..") return fallbackName;
	return base.length > 200 ? base.slice(0, 200) : base;
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/secure-file.js
const SUPPORTS_NOFOLLOW = process.platform !== "win32" && "O_NOFOLLOW" in constants;
const OPEN_READ_FLAGS = constants.O_RDONLY | (SUPPORTS_NOFOLLOW ? constants.O_NOFOLLOW : 0);
function isAbsolutePathname(value) {
	return path.isAbsolute(value) || process.platform === "win32" && (isWindowsDriveLetterPath(value, "win32") || isWindowsNetworkPath(value, "win32"));
}
function label(options) {
	return options.label ?? "Secure file";
}
async function openSecureHandle(options) {
	assertNoUnsafeDeviceReadPath(options.filePath);
	if (isWindowsNetworkPath(options.filePath, "win32") && !options.trust?.allowNetworkPath) throw new FsSafeError("invalid-path", `${label(options)} must be a local absolute path.`);
	if (!isAbsolutePathname(options.filePath)) throw new FsSafeError("invalid-path", `${label(options)} must be an absolute path.`);
	const preStat = await fs$1.lstat(options.filePath).catch((err) => {
		throw new FsSafeError("not-found", `${label(options)} is not readable: ${options.filePath}`, { cause: err });
	});
	if (preStat.isDirectory()) throw new FsSafeError("not-file", `${label(options)} must be a file: ${options.filePath}`);
	if (preStat.isSymbolicLink() && !options.trust?.allowSymlink) throw new FsSafeError("symlink", `${label(options)} must not be a symlink: ${options.filePath}`);
	let handle;
	try {
		handle = await fs$1.open(options.filePath, options.trust?.allowSymlink ? constants.O_RDONLY : OPEN_READ_FLAGS);
	} catch (err) {
		if (isSymlinkOpenError(err)) throw new FsSafeError("symlink", `${label(options)} symlink open blocked`, { cause: err });
		throw err;
	}
	try {
		const openedStat = await handle.stat();
		if (!openedStat.isFile()) throw new FsSafeError("not-file", `${label(options)} must be a file: ${options.filePath}`);
		const pathStat = options.trust?.allowSymlink ? await fs$1.stat(options.filePath) : await fs$1.lstat(options.filePath);
		if (!options.trust?.allowSymlink && pathStat.isSymbolicLink()) throw new FsSafeError("symlink", `${label(options)} must not be a symlink: ${options.filePath}`);
		if (!sameFileIdentity(pathStat, openedStat)) throw new FsSafeError("path-mismatch", `${label(options)} changed during open.`);
		const realPath = await fs$1.realpath(options.filePath);
		if (!sameFileIdentity(await fs$1.stat(realPath), openedStat)) throw new FsSafeError("path-mismatch", `${label(options)} real path changed during open.`);
		if (options.io?.maxBytes !== void 0 && openedStat.size > options.io.maxBytes) throw new FsSafeError("too-large", `${label(options)} exceeded maxBytes (${options.io.maxBytes}).`);
		return {
			handle,
			pathStat: openedStat,
			realPath
		};
	} catch (err) {
		await handle.close().catch(() => void 0);
		throw err;
	}
}
async function assertTrustedDirs(options, realPath) {
	if (!options.trust?.trustedDirs || options.trust.trustedDirs.length === 0) return;
	if (!(await Promise.all(options.trust.trustedDirs.map(async (dir) => {
		const resolved = path.resolve(dir);
		return await fs$1.realpath(resolved).catch(() => resolved);
	}))).some((dir) => isPathInside(dir, realPath))) throw new FsSafeError("outside-workspace", `${label(options)} is outside trustedDirs: ${realPath}`);
}
function inspectOpenedPermissions(stat, platform) {
	const bits = modeBits(typeof stat.mode === "number" ? stat.mode : null);
	return {
		ok: true,
		isSymlink: false,
		isDir: stat.isDirectory(),
		mode: typeof stat.mode === "number" ? stat.mode : null,
		bits,
		source: platform === "win32" ? "unknown" : "posix",
		worldWritable: isWorldWritable(bits),
		groupWritable: isGroupWritable(bits),
		worldReadable: isWorldReadable(bits),
		groupReadable: isGroupReadable(bits)
	};
}
async function assertSecurePermissions(options, stat, realPath) {
	if (options.permissions?.allowInsecure) return;
	const platform = options.inject?.platform ?? process.platform;
	const permissions = platform === "win32" ? await inspectPathPermissions(realPath, options.inject) : inspectOpenedPermissions(stat, platform);
	if (!permissions.ok) throw new FsSafeError("permission-unverified", `${label(options)} permissions could not be verified: ${realPath}`);
	if (platform === "win32" && permissions.source === "unknown") throw new FsSafeError("permission-unverified", `${label(options)} ACL verification unavailable on Windows for ${realPath}.`);
	if (platform === "win32" && permissions.ownerTrusted !== true) throw new FsSafeError(permissions.ownerTrusted === false ? "not-owned" : "permission-unverified", `${label(options)} owner could not be trusted on Windows: ${realPath}`);
	const writableByOthers = permissions.worldWritable || permissions.groupWritable;
	const readableByOthers = permissions.worldReadable || permissions.groupReadable;
	if (writableByOthers || !options.permissions?.allowReadableByOthers && readableByOthers) throw new FsSafeError("insecure-permissions", `${label(options)} permissions are too open: ${realPath}`);
	if (platform !== "win32" && typeof process.getuid === "function" && stat.uid != null) {
		const uid = process.getuid();
		if (stat.uid !== uid) throw new FsSafeError("not-owned", `${label(options)} must be owned by the current user (uid=${uid}): ${realPath}`);
	}
	return permissions;
}
async function readHandleWithTimeout(handle, timeoutMs, maxBytes) {
	const read = () => maxBytes === void 0 ? handle.readFile() : readFileHandleBounded(handle, maxBytes);
	if (timeoutMs === void 0 || !Number.isFinite(timeoutMs) || timeoutMs <= 0) return await read();
	let timeout;
	try {
		return await Promise.race([read(), new Promise((_resolve, reject) => {
			timeout = setTimeout(() => {
				handle.close().catch(() => void 0);
				reject(new FsSafeError("timeout", `secure file read timed out after ${timeoutMs}ms`));
			}, timeoutMs);
		})]);
	} finally {
		if (timeout) clearTimeout(timeout);
	}
}
async function readSecureFile(options) {
	const opened = await openSecureHandle(options);
	try {
		await assertTrustedDirs(options, opened.realPath);
		const permissions = await assertSecurePermissions(options, opened.pathStat, opened.realPath);
		return {
			buffer: await readHandleWithTimeout(opened.handle, options.io?.timeoutMs, options.io?.maxBytes),
			realPath: opened.realPath,
			stat: opened.pathStat,
			permissions
		};
	} finally {
		await opened.handle.close().catch(() => void 0);
	}
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/walk.js
function kindForDirent(dirent) {
	if (dirent.isDirectory()) return "directory";
	if (dirent.isFile()) return "file";
	if (dirent.isSymbolicLink()) return "symlink";
	return "other";
}
function shouldStop(result, options) {
	return options.maxEntries !== void 0 && result.scannedEntryCount >= Math.max(0, options.maxEntries);
}
function buildEntry(params) {
	const fullPath = path.join(params.dir, params.dirent.name);
	const relativePath = path.relative(params.rootDir, fullPath) || params.dirent.name;
	return {
		name: params.dirent.name,
		path: fullPath,
		relativePath,
		depth: params.depth,
		kind: params.kind ?? kindForDirent(params.dirent),
		dirent: params.dirent
	};
}
function recordFailedDir(result, root, dir, depth, error) {
	const relativePath = path.relative(root, dir);
	result.failedDirs.push({
		path: dir,
		relativePath,
		depth: relativePath === "" ? 0 : depth - 1,
		error
	});
}
function resolveSyncKind(fullPath, dirent, symlinks) {
	const kind = kindForDirent(dirent);
	if (kind !== "symlink") return kind;
	if (symlinks === "skip") return null;
	if (symlinks === "include") return "symlink";
	try {
		const stat = fs.statSync(fullPath);
		if (stat.isDirectory()) return "directory";
		if (stat.isFile()) return "file";
	} catch {
		return null;
	}
	return "other";
}
async function resolveAsyncKind(fullPath, dirent, symlinks) {
	const kind = kindForDirent(dirent);
	if (kind !== "symlink") return kind;
	if (symlinks === "skip") return null;
	if (symlinks === "include") return "symlink";
	try {
		const stat = await fs$1.stat(fullPath);
		if (stat.isDirectory()) return "directory";
		if (stat.isFile()) return "file";
	} catch {
		return null;
	}
	return "other";
}
function walkDirectorySync(rootDir, options = {}) {
	const root = path.resolve(rootDir);
	const symlinks = options.symlinks ?? "skip";
	const result = {
		entries: [],
		scannedEntryCount: 0,
		truncated: false,
		failedDirs: []
	};
	const visitedDirs = /* @__PURE__ */ new Set();
	function visit(dir, depth) {
		if (options.maxDepth !== void 0 && depth > options.maxDepth) return;
		let realDir;
		try {
			realDir = fs.realpathSync(dir);
		} catch (error) {
			recordFailedDir(result, root, dir, depth, error);
			return;
		}
		if (visitedDirs.has(realDir)) return;
		visitedDirs.add(realDir);
		let entries;
		try {
			entries = fs.readdirSync(dir, { withFileTypes: true });
		} catch (error) {
			recordFailedDir(result, root, dir, depth, error);
			return;
		}
		for (const dirent of entries) {
			if (shouldStop(result, options)) {
				result.truncated = true;
				return;
			}
			result.scannedEntryCount += 1;
			const fullPath = path.join(dir, dirent.name);
			const kind = resolveSyncKind(fullPath, dirent, symlinks);
			if (!kind) continue;
			const entry = buildEntry({
				rootDir: root,
				dir,
				dirent,
				depth,
				kind
			});
			if (options.include?.(entry) ?? true) result.entries.push(entry);
			if (kind === "directory" && (options.maxDepth === void 0 || depth < options.maxDepth) && (options.descend?.(entry) ?? true)) {
				visit(fullPath, depth + 1);
				if (result.truncated) return;
			}
		}
	}
	visit(root, 1);
	return result;
}
async function walkDirectory(rootDir, options = {}) {
	const root = path.resolve(rootDir);
	const symlinks = options.symlinks ?? "skip";
	const result = {
		entries: [],
		scannedEntryCount: 0,
		truncated: false,
		failedDirs: []
	};
	const visitedDirs = /* @__PURE__ */ new Set();
	async function visit(dir, depth) {
		if (options.maxDepth !== void 0 && depth > options.maxDepth) return;
		let realDir;
		try {
			realDir = await fs$1.realpath(dir);
		} catch (error) {
			recordFailedDir(result, root, dir, depth, error);
			return;
		}
		if (visitedDirs.has(realDir)) return;
		visitedDirs.add(realDir);
		let entries;
		try {
			entries = await fs$1.readdir(dir, { withFileTypes: true });
		} catch (error) {
			recordFailedDir(result, root, dir, depth, error);
			return;
		}
		for (const dirent of entries) {
			if (shouldStop(result, options)) {
				result.truncated = true;
				return;
			}
			result.scannedEntryCount += 1;
			const fullPath = path.join(dir, dirent.name);
			const kind = await resolveAsyncKind(fullPath, dirent, symlinks);
			if (!kind) continue;
			const entry = buildEntry({
				rootDir: root,
				dir,
				dirent,
				depth,
				kind
			});
			if (options.include?.(entry) ?? true) result.entries.push(entry);
			if (kind === "directory" && (options.maxDepth === void 0 || depth < options.maxDepth) && (options.descend?.(entry) ?? true)) {
				await visit(fullPath, depth + 1);
				if (result.truncated) return;
			}
		}
	}
	await visit(root, 1);
	return result;
}
//#endregion
//#region src/infra/fs-safe.ts
async function root(rootDir, defaults) {
	return await root$1(rootDir, defaults);
}
async function ensureAbsoluteDirectory(dirPath, options) {
	const absolutePath = path.resolve(dirPath);
	const scopeLabel = options?.scopeLabel ?? "directory";
	const existingAncestor = await findExistingAncestor(absolutePath);
	if (!existingAncestor) return {
		ok: false,
		error: /* @__PURE__ */ new Error(`Invalid path: must stay within ${scopeLabel}`)
	};
	if (existingAncestor === absolutePath) {
		try {
			const stat = await fs$1.lstat(absolutePath);
			if (!stat.isSymbolicLink() && stat.isDirectory()) return {
				ok: true,
				path: absolutePath
			};
		} catch {}
		return {
			ok: false,
			error: /* @__PURE__ */ new Error(`Invalid path: must stay within ${scopeLabel}`)
		};
	}
	const result = await ensureDirectoryWithinRoot({
		rootDir: existingAncestor,
		requestedPath: path.relative(existingAncestor, absolutePath),
		scopeLabel,
		mode: options?.mode
	});
	if (result.ok) return result;
	return {
		ok: false,
		error: new Error(result.error)
	};
}
async function writeExternalFileWithinRoot(options) {
	const requestedPath = path.resolve(options.rootDir, options.path);
	const result = await writeExternalFileWithinRoot$1({
		rootDir: options.rootDir,
		path: options.path,
		write: options.write,
		staging: "sibling",
		fallbackFileName: options.fallbackFileName ?? options.tempPrefix
	});
	return { path: path.join(path.dirname(requestedPath), path.basename(result.path)) };
}
/** @deprecated Use root(rootDir).read(relativePath, options). */
async function readFileWithinRoot(params) {
	return await (await root$1(params.rootDir)).read(params.relativePath, {
		hardlinks: params.rejectHardlinks === false ? "allow" : "reject",
		maxBytes: params.maxBytes,
		nonBlockingRead: params.nonBlockingRead,
		symlinks: params.allowSymlinkTargetWithinRoot === true ? "follow-within-root" : "reject"
	});
}
/** @deprecated Use root(rootDir).write(relativePath, data, options). */
async function writeFileWithinRoot(params) {
	await (await root$1(params.rootDir)).write(params.relativePath, params.data, {
		encoding: params.encoding,
		mkdir: params.mkdir
	});
}
//#endregion
export { pathExists as _, writeFileWithinRoot as a, readSecureFile as c, movePathToTrash as d, pathScope as f, resolveLocalPathFromRootsSync as g, readLocalFileFromRoots as h, writeExternalFileWithinRoot as i, sanitizeUntrustedFileName as l, resolveStrictExistingPathsWithinRoot as m, readFileWithinRoot as n, walkDirectory as o, resolveExistingPathsWithinRoot as p, root as r, walkDirectorySync as s, ensureAbsoluteDirectory as t, withTimeout as u, pathExistsSync as v };
