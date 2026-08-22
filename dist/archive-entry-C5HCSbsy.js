import { u as resolveSafeBaseDir } from "./path-D8zNGPJM.js";
import path from "node:path";
//#region node_modules/@openclaw/fs-safe/dist/archive-errors.js
var ArchiveSecurityError = class extends Error {
	code;
	constructor(code, message, options) {
		super(message, options);
		this.code = code;
		this.name = "ArchiveSecurityError";
	}
};
var ArchiveFormatError = class extends Error {
	code;
	constructor(message, options) {
		super(message, options);
		this.name = "ArchiveFormatError";
		this.code = "archive-header-invalid";
	}
};
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/archive-entry.js
function isWindowsDrivePath(value) {
	return /^[a-zA-Z]:[\\/]/.test(value);
}
function normalizeArchiveEntryPath(raw) {
	return raw.replaceAll("\\", "/");
}
function validateArchiveEntryPath(entryPath, params) {
	if (!entryPath || entryPath === "." || entryPath === "./") return;
	if (isWindowsDrivePath(entryPath)) throw new ArchiveSecurityError("entry-path", `archive entry uses a drive path: ${entryPath}`);
	const normalized = path.posix.normalize(normalizeArchiveEntryPath(entryPath));
	const escapeLabel = params?.escapeLabel ?? "destination";
	if (normalized === ".." || normalized.startsWith("../")) throw new ArchiveSecurityError("entry-path", `archive entry escapes ${escapeLabel}: ${entryPath}`);
	if (path.posix.isAbsolute(normalized) || normalized.startsWith("//")) throw new ArchiveSecurityError("entry-path", `archive entry is absolute: ${entryPath}`);
}
function stripArchivePath(entryPath, stripComponents) {
	const raw = normalizeArchiveEntryPath(entryPath);
	if (!raw || raw === "." || raw === "./") return null;
	const parts = raw.split("/").filter((part) => part.length > 0 && part !== ".");
	const strip = Math.max(0, Math.floor(stripComponents));
	const stripped = strip === 0 ? parts.join("/") : parts.slice(strip).join("/");
	const result = path.posix.normalize(stripped);
	if (!result || result === "." || result === "./") return null;
	return result;
}
function resolveArchiveOutputPath(params) {
	const safeBase = resolveSafeBaseDir(params.rootDir);
	const outPath = path.resolve(params.rootDir, params.relPath);
	const escapeLabel = params.escapeLabel ?? "destination";
	if (!outPath.startsWith(safeBase)) throw new ArchiveSecurityError("entry-path", `archive entry escapes ${escapeLabel}: ${params.originalPath}`);
	return outPath;
}
//#endregion
export { validateArchiveEntryPath as a, stripArchivePath as i, normalizeArchiveEntryPath as n, ArchiveFormatError as o, resolveArchiveOutputPath as r, ArchiveSecurityError as s, isWindowsDrivePath as t };
