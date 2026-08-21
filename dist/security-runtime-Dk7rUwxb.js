import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import "./redact-DUpJZuMu.js";
import "./fs-safe-defaults-BsoUVa5C.js";
import "./fs-safe-DVaClkIX.js";
import { s as statRegularFileSync } from "./regular-file-jv7y-frB.js";
import "./errors-D-7D3ZtF.js";
import "./path-guards-C3glTcy2.js";
import "./proxy-env-sKZhlk0j.js";
import "./ssrf-C889LYfv.js";
import "./replace-file-BYn355zQ.js";
import "./private-file-store-f-NxGizc.js";
import "./ports-DvrijSVP.js";
import { a as wrapExternalContent } from "./external-content-NkkZExk2.js";
import "./dm-policy-shared-B0DvumLR.js";
//#region src/security/channel-metadata.ts
const DEFAULT_MAX_CHARS = 800;
const DEFAULT_MAX_ENTRY_CHARS = 400;
function normalizeEntry(entry) {
	return entry.replace(/\s+/g, " ").trim();
}
function truncateText(value, maxChars) {
	if (maxChars <= 0) return "";
	if (value.length <= maxChars) return value;
	return `${truncateUtf16Safe(value, Math.max(0, maxChars - 3)).trimEnd()}...`;
}
/**
* Build bounded, externally wrapped channel metadata for prompt context.
* Channel-provided labels can be user-controlled, so keep the result externally wrapped.
*/
function buildChannelMetadata(params) {
	const deduped = uniqueStrings(params.entries.map((entry) => typeof entry === "string" ? normalizeEntry(entry) : "").filter((entry) => Boolean(entry)).map((entry) => truncateText(entry, DEFAULT_MAX_ENTRY_CHARS)));
	if (deduped.length === 0) return;
	const body = deduped.join("\n");
	return wrapExternalContent(truncateText(`${`Channel metadata (${params.source})`}\n${`${params.label}:\n${body}`}`, params.maxChars ?? DEFAULT_MAX_CHARS), {
		source: "channel_metadata",
		includeWarning: false
	});
}
/** @deprecated Use buildChannelMetadata. Removal: after 2026-09-08 (see sdk-untrusted-context-identifier-aliases). */
const buildUntrustedChannelMetadata = buildChannelMetadata;
//#endregion
//#region src/plugin-sdk/security-runtime.ts
/** Public security runtime helpers for plugin-side trust boundaries. */
/** Return whether a path resolves to a regular file, treating filesystem errors as missing. */
function fileExists(filePath) {
	try {
		return !statRegularFileSync(filePath).missing;
	} catch {
		return false;
	}
}
//#endregion
export { buildChannelMetadata as n, buildUntrustedChannelMetadata as r, fileExists as t };
