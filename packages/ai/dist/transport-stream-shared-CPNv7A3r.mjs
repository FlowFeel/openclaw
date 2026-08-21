import { r as createAssistantMessageEventStream } from "./event-stream-CEV9t6da.mjs";
import { n as getAiTransportHost, v as normalizeOptionalString } from "./host-Bl7Kgddo.mjs";
import { t as sanitizeSurrogates } from "./sanitize-unicode-DT5o51ur.mjs";
import { o as truncateUtf16Safe } from "./tool-result-text-Dvkp2Dus.mjs";
import { i as parseStrictNonNegativeInteger, r as parseStrictFiniteNumber, t as asFiniteNumberInRange } from "./number-coercion-1Miyb5MO.mjs";
import { parseRetryAfterHttpDateMs } from "./internal/retry-after.mjs";
import { createHash } from "node:crypto";
//#region packages/ai/src/transports/transport-utils.ts
const MALFORMED_STREAMING_FRAGMENT_ERROR_MESSAGE = "OpenClaw transport error: malformed_streaming_fragment";
const NON_LATIN_RE = /[\u2E80-\u9FFF\uA000-\uA4FF\uAC00-\uD7AF\uF900-\uFAFF\uFF01-\uFF60\uFFE0-\uFFE6\u{20000}-\u{2FA1F}]/gu;
const CJK_SURROGATE_HIGH_RE = /[\uD840-\uD87E][\uDC00-\uDFFF]/g;
function sha256Hex(value) {
	return createHash("sha256").update(value).digest("hex");
}
function sha256HexPrefix(value, length) {
	return sha256Hex(value).slice(0, length);
}
function redactIdentifier(value, opts) {
	const trimmed = normalizeOptionalString(value);
	if (!trimmed) return "-";
	return `sha256:${sha256HexPrefix(trimmed, Number.isFinite(opts?.len) ? Math.max(1, Math.floor(opts?.len ?? 12)) : 12)}`;
}
function redactSensitiveText(text, _options) {
	return getAiTransportHost().redactToolPayloadText(text);
}
function resolveSecretSentinel(value) {
	return getAiTransportHost().resolveSecretSentinel(value);
}
function resolveModelHeaderSentinels(model) {
	if (!model.headers) return model;
	let headers;
	for (const [name, value] of Object.entries(model.headers)) {
		const resolved = resolveSecretSentinel(value);
		if (resolved !== value) {
			headers ??= { ...model.headers };
			headers[name] = resolved;
		}
	}
	return headers ? {
		...model,
		headers
	} : model;
}
function createAbortError(message, options) {
	const error = new Error(message, options);
	error.name = "AbortError";
	return error;
}
function estimateStringChars(text) {
	if (!text) return 0;
	const nonLatinCount = (text.match(NON_LATIN_RE) ?? []).length;
	return (nonLatinCount === 0 ? text.length : text.length - (text.match(CJK_SURROGATE_HIGH_RE) ?? []).length) + nonLatinCount * 3;
}
function supportsModelTools(model) {
	return (model.compat && typeof model.compat === "object" ? model.compat : void 0)?.supportsTools !== false;
}
function isCodeModeModelVisibleToolName(name, visibleToolNames) {
	return visibleToolNames.has(name);
}
function isGoogleGemini3Model(modelId, family) {
	const normalized = modelId.trim().toLowerCase();
	const suffix = family === "pro" ? "pro" : "flash";
	return new RegExp(`(?:^|/)gemini-(?:3(?:\\.\\d+)?-${suffix}|${suffix}${family === "flash" ? "(?:-lite)?" : ""}-latest)(?:-|$)`).test(normalized);
}
function isGoogleGemini3ProModel(modelId) {
	return isGoogleGemini3Model(modelId, "pro");
}
function isGoogleGemini3FlashModel(modelId) {
	return isGoogleGemini3Model(modelId, "flash");
}
function parseRetryAfterSeconds(headers) {
	const retryAfterMs = headers.get("retry-after-ms");
	if (retryAfterMs) {
		const trimmed = retryAfterMs.trim();
		if (/^\d+(?:\.\d+)?$/.test(trimmed)) {
			const milliseconds = asFiniteNumberInRange(parseStrictFiniteNumber(trimmed), {
				min: 0,
				max: Number.MAX_SAFE_INTEGER
			});
			return milliseconds === void 0 ? Number.POSITIVE_INFINITY : milliseconds / 1e3;
		}
	}
	const retryAfter = headers.get("retry-after")?.trim();
	if (!retryAfter) return;
	if (/^\d+$/.test(retryAfter)) return parseStrictNonNegativeInteger(retryAfter) ?? Number.POSITIVE_INFINITY;
	const retryAt = parseRetryAfterHttpDateMs(retryAfter);
	return retryAt === void 0 ? void 0 : Math.max(0, (retryAt - Date.now()) / 1e3);
}
async function readChunkWithIdleTimeout(reader, timeoutMs, onIdleTimeout) {
	let timer;
	try {
		return await Promise.race([reader.read(), new Promise((_resolve, reject) => {
			timer = setTimeout(() => reject(onIdleTimeout?.({ chunkTimeoutMs: timeoutMs }) ?? /* @__PURE__ */ new Error("Read timed out")), timeoutMs);
		})]);
	} finally {
		if (timer) clearTimeout(timer);
	}
}
async function readResponseTextSnippet(response, options) {
	const maxBytes = options?.maxBytes ?? 8 * 1024;
	const maxChars = options?.maxChars ?? 200;
	const reader = response.body?.getReader();
	if (!reader) return;
	const chunks = [];
	let bytes = 0;
	let truncated = false;
	try {
		while (bytes < maxBytes) {
			const result = options?.chunkTimeoutMs ? await readChunkWithIdleTimeout(reader, options.chunkTimeoutMs, options.onIdleTimeout) : await reader.read();
			if (result.done) break;
			if (!result.value?.length) continue;
			const remaining = maxBytes - bytes;
			chunks.push(result.value.subarray(0, remaining));
			bytes += Math.min(result.value.length, remaining);
			if (result.value.length >= remaining) {
				truncated = true;
				await reader.cancel().catch(() => void 0);
				break;
			}
		}
	} catch (error) {
		await reader.cancel(error).catch(() => void 0);
		throw error;
	} finally {
		reader.releaseLock();
	}
	const merged = new Uint8Array(bytes);
	let offset = 0;
	for (const chunk of chunks) {
		merged.set(chunk, offset);
		offset += chunk.length;
	}
	const collapsed = new TextDecoder().decode(merged).replace(/\s+/g, " ").trim();
	if (!collapsed) return;
	if (collapsed.length > maxChars) return `${truncateUtf16Safe(collapsed, maxChars)}…`;
	return truncated ? `${collapsed}…` : collapsed;
}
//#endregion
//#region packages/ai/src/transports/transport-stream-shared.ts
const EMPTY_TOOL_RESULT_TEXT = "(no output)";
function sanitizeTransportPayloadText(text) {
	if (typeof text !== "string") return "";
	return sanitizeSurrogates(text);
}
function sanitizeNonEmptyTransportPayloadText(text, fallback = EMPTY_TOOL_RESULT_TEXT) {
	const sanitized = sanitizeTransportPayloadText(text);
	return sanitized.trim().length > 0 ? sanitized : fallback;
}
function coerceTransportToolCallArguments(argumentsValue) {
	if (argumentsValue && typeof argumentsValue === "object" && !Array.isArray(argumentsValue)) return argumentsValue;
	if (typeof argumentsValue === "string") try {
		const parsed = JSON.parse(argumentsValue);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
	} catch {}
	return {};
}
function mergeTransportHeaders(...headerSources) {
	const merged = {};
	for (const headers of headerSources) if (headers) Object.assign(merged, headers);
	return Object.keys(merged).length > 0 ? merged : void 0;
}
function mergeTransportMetadata(payload, metadata) {
	if (!metadata || Object.keys(metadata).length === 0) return payload;
	const existingMetadata = payload.metadata && typeof payload.metadata === "object" && !Array.isArray(payload.metadata) ? payload.metadata : void 0;
	return {
		...payload,
		metadata: {
			...existingMetadata,
			...metadata
		}
	};
}
function createEmptyTransportUsage() {
	return {
		input: 0,
		output: 0,
		cacheRead: 0,
		cacheWrite: 0,
		totalTokens: 0,
		cost: {
			input: 0,
			output: 0,
			cacheRead: 0,
			cacheWrite: 0,
			total: 0
		}
	};
}
function createWritableTransportEventStream() {
	const eventStream = createAssistantMessageEventStream();
	return {
		eventStream,
		stream: eventStream
	};
}
/**
* Abort error to surface for an aborted `signal`.
*
* Rethrows the caller's abort reason only when it carries a `code`, so that code
* survives into `errorCode` on the persisted assistant message and consumers can
* recognize an abort's origin without matching error text. A default
* `abort()` reason is an uncoded DOMException that carries nothing the synthetic
* error does not, so it keeps the "Request was aborted" text every transport
* already emits rather than churning it.
*/
function transportAbortError(signal) {
	const reason = signal?.reason;
	return reason instanceof Error && typeof reason.code === "string" ? reason : /* @__PURE__ */ new Error("Request was aborted");
}
function finalizeTransportStream(params) {
	const { stream, output, signal } = params;
	if (signal?.aborted) throw transportAbortError(signal);
	if (output.stopReason === "aborted" || output.stopReason === "error") throw new Error(output.errorMessage ?? "An unknown error occurred");
	stream.push({
		type: "done",
		reason: output.stopReason,
		message: output
	});
	stream.end();
}
const MAX_TRANSPORT_ERROR_CAUSE_DEPTH = 8;
function readStringLikeProperty(value, key) {
	if (!value || typeof value !== "object") return;
	const raw = value[key];
	if (typeof raw === "string") return raw.trim() || void 0;
	if (typeof raw === "number" && Number.isFinite(raw)) return String(raw);
}
function readObjectProperty(value, key) {
	if (!value || typeof value !== "object") return;
	const raw = value[key];
	return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : void 0;
}
function readCauseChainErrorCode(value) {
	const seen = /* @__PURE__ */ new Set();
	let cause = readObjectProperty(value, "cause");
	for (let depth = 0; cause && depth < MAX_TRANSPORT_ERROR_CAUSE_DEPTH && !seen.has(cause); depth += 1) {
		seen.add(cause);
		const code = readStringLikeProperty(cause, "code");
		if (code) return code;
		cause = readObjectProperty(cause, "cause");
	}
}
function stringifyErrorBody(value) {
	if (typeof value === "string") return value;
	if (value === void 0 || value === null) return;
	try {
		return JSON.stringify(value);
	} catch {
		return;
	}
}
function stringifyTransportErrorMessage(value) {
	if (value instanceof Error) return value.message;
	const encoded = stringifyErrorBody(value);
	if (encoded !== void 0) return encoded;
	try {
		return String(value);
	} catch {
		return;
	}
}
function normalizeTransportErrorBody(value) {
	const text = stringifyErrorBody(value);
	if (!text?.trim()) return;
	const redacted = redactSensitiveText(text);
	return redacted.length > 500 ? `${truncateUtf16Safe(redacted, 499)}…` : redacted;
}
function extractTransportErrorDetails(error) {
	const errorObject = error && typeof error === "object" ? error : void 0;
	const nestedError = readObjectProperty(errorObject, "error");
	const errorCode = readStringLikeProperty(errorObject, "errorCode") ?? readStringLikeProperty(errorObject, "code") ?? readStringLikeProperty(nestedError, "code") ?? readCauseChainErrorCode(errorObject);
	const errorType = readStringLikeProperty(errorObject, "errorType") ?? readStringLikeProperty(errorObject, "type") ?? readStringLikeProperty(nestedError, "type");
	const errorBody = normalizeTransportErrorBody(readStringLikeProperty(errorObject, "errorBody")) ?? normalizeTransportErrorBody(readStringLikeProperty(errorObject, "body")) ?? normalizeTransportErrorBody(readObjectProperty(errorObject, "body")) ?? normalizeTransportErrorBody(nestedError);
	return {
		...errorCode ? { errorCode } : {},
		...errorType ? { errorType } : {},
		...errorBody ? { errorBody } : {}
	};
}
function assignTransportErrorDetails(output, error, signal) {
	output.stopReason = signal?.aborted ? "aborted" : "error";
	output.errorMessage = stringifyTransportErrorMessage(error);
	Object.assign(output, extractTransportErrorDetails(error));
}
function failTransportStream(params) {
	const { stream, output, signal, error, cleanup } = params;
	cleanup?.();
	assignTransportErrorDetails(output, error, signal);
	stream.push({
		type: "error",
		reason: output.stopReason,
		error: output
	});
	stream.end();
}
//#endregion
export { resolveSecretSentinel as C, resolveModelHeaderSentinels as S, supportsModelTools as T, isGoogleGemini3ProModel as _, failTransportStream as a, redactIdentifier as b, mergeTransportMetadata as c, transportAbortError as d, MALFORMED_STREAMING_FRAGMENT_ERROR_MESSAGE as f, isGoogleGemini3FlashModel as g, isCodeModeModelVisibleToolName as h, createWritableTransportEventStream as i, sanitizeNonEmptyTransportPayloadText as l, estimateStringChars as m, coerceTransportToolCallArguments as n, finalizeTransportStream as o, createAbortError as p, createEmptyTransportUsage as r, mergeTransportHeaders as s, assignTransportErrorDetails as t, sanitizeTransportPayloadText as u, parseRetryAfterSeconds as v, sha256Hex as w, redactSensitiveText as x, readResponseTextSnippet as y };
