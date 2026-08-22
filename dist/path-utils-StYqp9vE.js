import { v as pathExistsSync } from "./fs-safe-DVaClkIX.js";
import { fileURLToPath } from "node:url";
import { isAbsolute, resolve } from "node:path";
import * as os$1 from "node:os";
//#region src/agents/sessions/tools/path-utils.ts
/**
* Session tool path normalization helpers.
*
* Expands user/file URL inputs and resolves read/write paths against the active cwd with macOS filename variants.
*/
const UNICODE_SPACES = /[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g;
const NARROW_NO_BREAK_SPACE = " ";
function normalizeUnicodeSpaces(str) {
	return str.replace(UNICODE_SPACES, " ");
}
function tryMacOSScreenshotPath(filePath) {
	return filePath.replace(/ (AM|PM)\./gi, `${NARROW_NO_BREAK_SPACE}$1.`);
}
function tryNFDVariant(filePath) {
	return filePath.normalize("NFD");
}
function tryCurlyQuoteVariant(filePath) {
	return filePath.replace(/'/g, "’");
}
function normalizeAtPrefix(filePath) {
	return filePath.startsWith("@") ? filePath.slice(1) : filePath;
}
function expandPath(filePath) {
	const normalized = normalizeUnicodeSpaces(normalizeAtPrefix(filePath));
	if (normalized.startsWith("file://")) try {
		return fileURLToPath(normalized);
	} catch {
		return normalized;
	}
	if (normalized === "~") return os$1.homedir();
	if (normalized.startsWith("~/")) return os$1.homedir() + normalized.slice(1);
	return normalized;
}
/**
* Resolve a path relative to the given cwd.
* Handles ~ expansion and absolute paths.
*/
function resolveToCwd(filePath, cwd) {
	const expanded = expandPath(filePath);
	if (isAbsolute(expanded)) return expanded;
	return resolve(cwd, expanded);
}
function resolveReadPath(filePath, cwd) {
	const resolved = resolveToCwd(filePath, cwd);
	if (pathExistsSync(resolved)) return resolved;
	const amPmVariant = tryMacOSScreenshotPath(resolved);
	if (amPmVariant !== resolved && pathExistsSync(amPmVariant)) return amPmVariant;
	const nfdVariant = tryNFDVariant(resolved);
	if (nfdVariant !== resolved && pathExistsSync(nfdVariant)) return nfdVariant;
	const curlyVariant = tryCurlyQuoteVariant(resolved);
	if (curlyVariant !== resolved && pathExistsSync(curlyVariant)) return curlyVariant;
	const nfdCurlyVariant = tryCurlyQuoteVariant(nfdVariant);
	if (nfdCurlyVariant !== resolved && pathExistsSync(nfdCurlyVariant)) return nfdCurlyVariant;
	return resolved;
}
//#endregion
export { resolveToCwd as n, resolveReadPath as t };
