import { a as normalizeLowercaseStringOrEmpty, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { t as formatErrorMessage } from "./error-utils-F_0lOXMP.js";
import "./engine-qmd-B5ZbsK-2.js";
//#region packages/memory-host-sdk/src/host/qmd-query-parser.ts
/** Parse qmd stdout/stderr into normalized results, accepting known no-result markers. */
function parseQmdQueryJson(stdout, stderr) {
	const trimmedStdout = stdout.trim();
	const trimmedStderr = stderr.trim();
	const stderrIsMarker = trimmedStderr.length > 0 && isQmdNoResultsOutput(trimmedStderr);
	if (!trimmedStdout && stderrIsMarker) return [];
	if (!trimmedStdout) {
		const message = `stdout empty${trimmedStderr ? ` (stderr: ${summarizeQmdStderr(trimmedStderr)})` : ""}`;
		warnQmdQueryParseError(message);
		throw new Error(`qmd query returned invalid JSON: ${message}`);
	}
	try {
		const parsed = parseQmdQueryResultArray(trimmedStdout);
		if (parsed !== null) return parsed;
		const noisyPayload = extractFirstJsonArray(trimmedStdout);
		if (!noisyPayload) {
			if (isQmdNoResultsOutput(trimmedStdout)) return [];
			throw new Error("qmd query JSON response was not an array");
		}
		const fallback = parseQmdQueryResultArray(noisyPayload);
		if (fallback !== null) return fallback;
		throw new Error("qmd query JSON response was not an array");
	} catch (err) {
		const message = formatErrorMessage(err);
		warnQmdQueryParseError(message);
		throw new Error(`qmd query returned invalid JSON: ${message}`, { cause: err });
	}
}
/** Emit parse warnings outside tests so broken qmd output is visible to operators. */
function warnQmdQueryParseError(message) {
	if (process.env.VITEST || false) return;
	console.warn(`qmd query returned invalid JSON: ${message}`);
}
/** Detect qmd no-result marker output on stdout or stderr. */
function isQmdNoResultsOutput(raw) {
	return raw.split(/\r?\n/).map((line) => normalizeLowercaseStringOrEmpty(line).replace(/\s+/g, " ")).filter((line) => line.length > 0).some((line) => isQmdNoResultsLine(line));
}
/** Match qmd no-result lines with optional warning/info prefixes. */
function isQmdNoResultsLine(line) {
	if (line === "no results found" || line === "no results found.") return true;
	return /^(?:\[[^\]]+\]\s*)?(?:(?:warn(?:ing)?|info|error|qmd)\s*:\s*)+no results found\.?$/.test(line);
}
/** Bound stderr context included in parse errors. */
function summarizeQmdStderr(raw) {
	return raw.length <= 120 ? raw : `${truncateUtf16Safe(raw, 117)}...`;
}
/** Parse and normalize a strict qmd JSON array payload. */
function parseQmdQueryResultArray(raw) {
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed) || parsed.some((item) => typeof item !== "object" || item === null || Array.isArray(item))) return null;
		return parsed.map((item) => {
			const record = item;
			return {
				docid: typeof record.docid === "string" ? record.docid : void 0,
				score: typeof record.score === "number" && Number.isFinite(record.score) ? record.score : void 0,
				collection: typeof record.collection === "string" ? record.collection : void 0,
				file: typeof record.file === "string" ? record.file : void 0,
				snippet: typeof record.snippet === "string" ? record.snippet : void 0,
				body: typeof record.body === "string" ? record.body : void 0,
				startLine: parseQmdLineNumber(record.start_line ?? record.startLine),
				endLine: parseQmdLineNumber(record.end_line ?? record.endLine)
			};
		});
	} catch {
		return null;
	}
}
/** Normalize qmd line numbers, rejecting zero, negative, and non-integer values. */
function parseQmdLineNumber(value) {
	return typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : void 0;
}
/** Extract the first complete, standalone JSON result array from noisy stdout. */
function extractFirstJsonArray(raw) {
	let start = -1;
	let depth = 0;
	let inString = false;
	let escaped = false;
	let atLineStart = true;
	for (let i = 0; i < raw.length; i += 1) {
		const char = raw[i];
		if (char === void 0) break;
		if (start < 0) {
			if (char === "\n") {
				atLineStart = true;
				continue;
			}
			if (atLineStart && (char === " " || char === "	" || char === "\r")) continue;
			if (!atLineStart || char !== "[") {
				atLineStart = false;
				continue;
			}
			start = i;
			depth = 1;
			atLineStart = false;
			continue;
		}
		if (inString) {
			if (escaped) escaped = false;
			else if (char === "\\") escaped = true;
			else if (char === "\"") inString = false;
			continue;
		}
		if (char === "\"") {
			inString = true;
			continue;
		}
		if (char === "[") {
			depth += 1;
			continue;
		}
		if (char !== "]" || --depth !== 0) continue;
		const candidate = raw.slice(start, i + 1);
		if (parseQmdQueryResultArray(candidate) !== null) return candidate;
		start = -1;
	}
	return null;
}
//#endregion
//#region packages/memory-host-sdk/src/host/qmd-scope.ts
function isQmdScopeAllowed(scope, sessionKey) {
	if (!scope) return true;
	const parsed = parseQmdSessionScope(sessionKey);
	const channel = parsed.channel;
	const chatType = parsed.chatType;
	const normalizedKey = parsed.normalizedKey ?? "";
	const rawKey = normalizeLowercaseStringOrEmpty(sessionKey ?? "");
	for (const rule of scope.rules ?? []) {
		if (!rule) continue;
		const match = rule.match ?? {};
		if (match.channel && match.channel !== channel) continue;
		if (match.chatType && match.chatType !== chatType) continue;
		const normalizedPrefix = normalizeOptionalLowercaseString(match.keyPrefix) || void 0;
		const rawPrefix = normalizeOptionalLowercaseString(match.rawKeyPrefix) || void 0;
		if (rawPrefix && !rawKey.startsWith(rawPrefix)) continue;
		if (normalizedPrefix) {
			if (normalizedPrefix.startsWith("agent:")) {
				if (!rawKey.startsWith(normalizedPrefix)) continue;
			} else if (!normalizedKey.startsWith(normalizedPrefix)) continue;
		}
		return rule.action === "allow";
	}
	return (scope.default ?? "allow") === "allow";
}
function deriveQmdScopeChannel(key) {
	return parseQmdSessionScope(key).channel;
}
function deriveQmdScopeChatType(key) {
	return parseQmdSessionScope(key).chatType;
}
function parseQmdSessionScope(key) {
	const normalized = normalizeQmdSessionKey(key);
	if (!normalized) return {};
	const parts = normalized.split(":").filter(Boolean);
	let chatType;
	if (parts.length >= 2 && (parts[1] === "group" || parts[1] === "channel" || parts[1] === "direct" || parts[1] === "dm")) {
		if (parts.includes("group")) chatType = "group";
		else if (parts.includes("channel")) chatType = "channel";
		return {
			normalizedKey: normalized,
			channel: normalizeOptionalLowercaseString(parts[0]),
			chatType: chatType ?? "direct"
		};
	}
	if (normalized.includes(":group:")) return {
		normalizedKey: normalized,
		chatType: "group"
	};
	if (normalized.includes(":channel:")) return {
		normalizedKey: normalized,
		chatType: "channel"
	};
	return {
		normalizedKey: normalized,
		chatType: "direct"
	};
}
function normalizeQmdSessionKey(key) {
	if (!key) return;
	const trimmed = key.trim();
	if (!trimmed) return;
	const normalized = normalizeLowercaseStringOrEmpty(parseAgentSessionKey(trimmed)?.rest ?? trimmed);
	if (normalized.startsWith("subagent:")) return;
	return normalized;
}
function parseAgentSessionKey(sessionKey) {
	const raw = normalizeOptionalLowercaseString(sessionKey);
	if (!raw) return null;
	const parts = raw.split(":").filter(Boolean);
	if (parts.length < 3 || parts[0] !== "agent") return null;
	const rest = parts.slice(2).join(":");
	return rest ? { rest } : null;
}
//#endregion
export { parseQmdQueryJson as i, deriveQmdScopeChatType as n, isQmdScopeAllowed as r, deriveQmdScopeChannel as t };
