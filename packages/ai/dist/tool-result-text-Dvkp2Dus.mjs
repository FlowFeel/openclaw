import { _ as normalizeLowercaseStringOrEmpty, b as isRecord, n as getAiTransportHost } from "./host-Bl7Kgddo.mjs";
import { t as sanitizeSurrogates } from "./sanitize-unicode-DT5o51ur.mjs";
//#region packages/ai/src/utils/prompt-cache-stability.ts
/**
* Prompt-cache normalization helpers. They keep generated prompt sections
* deterministic across platform newlines, trailing whitespace, and input
* ordering.
*/
/** Canonicalizes provider tool order without relying on host locale settings. */
function sortPromptCacheToolsByName(tools) {
	const compareText = (left, right) => {
		const leftText = left ?? "";
		const rightText = right ?? "";
		return leftText < rightText ? -1 : leftText > rightText ? 1 : 0;
	};
	return tools.toSorted((left, right) => compareText(left.wireName ?? left.name, right.wireName ?? right.name) || compareText(left.description, right.description));
}
/** Normalize structured prompt text before hashing or snapshot comparison. */
function normalizeStructuredPromptSection(text) {
	return sanitizeSurrogates(text).replace(/\r\n?/g, "\n").replace(/[ \t]+$/gm, "").trim();
}
/** Normalize, de-dupe, and sort capability ids for stable prompt payloads. */
function normalizePromptCapabilityIds(capabilities) {
	const seen = /* @__PURE__ */ new Set();
	const normalized = [];
	for (const capability of capabilities) {
		const value = normalizeLowercaseStringOrEmpty(normalizeStructuredPromptSection(capability));
		if (!value || seen.has(value)) continue;
		seen.add(value);
		normalized.push(value);
	}
	return normalized.toSorted((left, right) => left.localeCompare(right));
}
//#endregion
//#region packages/ai/src/utils/system-prompt-cache-boundary.ts
/**
* System prompt cache-boundary helpers.
*
* Keeps stable prompt prefixes separate from dynamic runtime additions for provider prompt caching.
*/
const SYSTEM_PROMPT_CACHE_BOUNDARY = "\n<!-- OPENCLAW_CACHE_BOUNDARY -->\n";
function stripSystemPromptCacheBoundary(text) {
	return text.replaceAll(SYSTEM_PROMPT_CACHE_BOUNDARY, "\n");
}
function ensureSystemPromptCacheBoundary(systemPrompt) {
	if (systemPrompt.trim().length === 0) return systemPrompt;
	return systemPrompt.includes("\n<!-- OPENCLAW_CACHE_BOUNDARY -->\n") ? systemPrompt : `${systemPrompt}${SYSTEM_PROMPT_CACHE_BOUNDARY}`;
}
function splitSystemPromptCacheBoundary(text) {
	const boundaryIndex = text.indexOf(SYSTEM_PROMPT_CACHE_BOUNDARY);
	if (boundaryIndex === -1) return;
	return {
		stablePrefix: text.slice(0, boundaryIndex).trimEnd(),
		dynamicSuffix: text.slice(boundaryIndex + 34).trimStart()
	};
}
function prependSystemPromptAdditionAfterCacheBoundary(params) {
	const systemPromptAddition = typeof params.systemPromptAddition === "string" ? normalizeStructuredPromptSection(params.systemPromptAddition) : "";
	if (!systemPromptAddition) return params.systemPrompt;
	if (params.systemPrompt.trim().length === 0) return systemPromptAddition;
	const split = splitSystemPromptCacheBoundary(params.systemPrompt);
	if (!split) return `${systemPromptAddition}\n\n${params.systemPrompt}`;
	const dynamicSuffix = split.dynamicSuffix ? normalizeStructuredPromptSection(split.dynamicSuffix) : "";
	if (!dynamicSuffix) return `${split.stablePrefix}${SYSTEM_PROMPT_CACHE_BOUNDARY}${systemPromptAddition}`;
	return `${split.stablePrefix}${SYSTEM_PROMPT_CACHE_BOUNDARY}${systemPromptAddition}\n\n${dynamicSuffix}`;
}
//#endregion
//#region packages/ai/src/providers/simple-options.ts
function buildBaseOptions(model, options, apiKey) {
	const firstEventOptions = options;
	return {
		temperature: options?.temperature,
		maxTokens: options?.maxTokens,
		stop: options?.stop,
		signal: options?.signal,
		apiKey: apiKey || options?.apiKey,
		transport: options?.transport,
		cacheRetention: options?.cacheRetention,
		sessionId: options?.sessionId,
		promptCacheKey: options?.promptCacheKey,
		headers: options?.headers,
		onPayload: options?.onPayload,
		onResponse: options?.onResponse,
		timeoutMs: options?.timeoutMs,
		firstEventTimeoutMs: firstEventOptions?.firstEventTimeoutMs,
		onFirstEventTimeout: firstEventOptions?.onFirstEventTimeout,
		maxRetries: options?.maxRetries,
		maxRetryDelayMs: options?.maxRetryDelayMs,
		metadata: options?.metadata
	};
}
function clampMaxTokensToModel(model, requestedMaxTokens) {
	return requestedMaxTokens === void 0 ? void 0 : Math.max(1, Math.min(requestedMaxTokens, model.maxTokens));
}
function clampReasoning(effort) {
	return effort === "xhigh" ? "high" : effort;
}
function adjustMaxTokensForThinking(baseMaxTokens, modelMaxTokens, reasoningLevel, customBudgets) {
	const budgets = {
		minimal: 1024,
		low: 2048,
		medium: 8192,
		high: 16384,
		max: 32768,
		...customBudgets
	};
	const minOutputTokens = 1024;
	let thinkingBudget = budgets[clampReasoning(reasoningLevel)];
	const maxTokens = baseMaxTokens === void 0 ? modelMaxTokens : Math.min(baseMaxTokens + thinkingBudget, modelMaxTokens);
	if (maxTokens <= thinkingBudget) thinkingBudget = Math.max(0, maxTokens - minOutputTokens);
	return {
		maxTokens,
		thinkingBudget
	};
}
//#endregion
//#region packages/normalization-core/src/utf16-slice.ts
function isHighSurrogate(codeUnit) {
	return codeUnit >= 55296 && codeUnit <= 56319;
}
function isLowSurrogate(codeUnit) {
	return codeUnit >= 56320 && codeUnit <= 57343;
}
/** Slices a UTF-16 string without returning dangling surrogate halves at either edge. */
function sliceUtf16Safe(input, start, end) {
	const len = input.length;
	let from = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
	let to = end === void 0 ? len : end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
	if (to <= from) return "";
	if (from > 0 && from < len) {
		if (isLowSurrogate(input.charCodeAt(from)) && isHighSurrogate(input.charCodeAt(from - 1))) from += 1;
	}
	if (to > 0 && to < len) {
		if (isHighSurrogate(input.charCodeAt(to - 1)) && isLowSurrogate(input.charCodeAt(to))) to -= 1;
	}
	return input.slice(from, to);
}
/** Truncates a UTF-16 string without cutting a surrogate pair in half. */
function truncateUtf16Safe(input, maxLen) {
	const limit = Math.max(0, Math.floor(maxLen));
	if (input.length <= limit) return input;
	return sliceUtf16Safe(input, 0, limit);
}
//#endregion
//#region packages/ai/src/providers/tool-result-text.ts
const PROVIDER_TOOL_RESULT_MAX_CHARS = 8e3;
const IMAGE_TOOL_RESULT_TYPES = /* @__PURE__ */ new Set([
	"image",
	"image_url",
	"input_image"
]);
const AUDIO_TOOL_RESULT_TYPES = /* @__PURE__ */ new Set([
	"audio",
	"input_audio",
	"output_audio"
]);
const MEDIA_ONLY_TOOL_RESULT_TYPES = /* @__PURE__ */ new Set([...IMAGE_TOOL_RESULT_TYPES, ...AUDIO_TOOL_RESULT_TYPES]);
const INLINE_DATA_URI_PATTERN = /(^|[^A-Za-z0-9_])data:([a-z][a-z0-9.+-]*\/[a-z0-9.+-]+(?:;[a-z0-9.+-]+=[^,;"'\s]+|;base64)*,[^\s"'<>)]+)/gi;
const MIME_KEY_CANDIDATES = [
	"mimeType",
	"mime_type",
	"mediaType",
	"media_type",
	"contentType",
	"content_type"
];
const TEXTUAL_MIME_PATTERN = /^(?:text\/|application\/(?:json|ld\+json|x-ndjson|xml|javascript|x-www-form-urlencoded)|[^/]+\/[^+]+\+(?:json|xml)$)/i;
const OPAQUE_OR_BINARY_FIELD_RE = /^(?:blob|buffer|bytes|encrypted_content|encrypted_stdout)$/i;
function readMimeType(value) {
	if (!isRecord(value)) return;
	for (const key of MIME_KEY_CANDIDATES) {
		const mimeType = value[key];
		if (typeof mimeType === "string" && mimeType.trim().length > 0) return mimeType;
	}
}
function isBinaryMimeType(mimeType) {
	const normalized = mimeType.split(";", 1)[0]?.trim().toLowerCase();
	return normalized ? !TEXTUAL_MIME_PATTERN.test(normalized) : false;
}
function describeOmittedValue(value, label) {
	const length = typeof value === "string" ? value.length : JSON.stringify(value)?.length;
	return length ? `[${label} omitted: ${length} chars]` : `[${label} omitted]`;
}
function redactInlineDataUris(value) {
	return value.replace(INLINE_DATA_URI_PATTERN, (_match, prefix, uri) => `${prefix}[inline data URI: ${uri.length} chars]`);
}
function redactStructuredTextValue(value) {
	const host = getAiTransportHost();
	const redacted = host.redactToolPayloadText(value);
	const trimmed = redacted.trim();
	if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return redacted;
	try {
		const redactedWrapper = host.redactSecrets({ structuredTextValue: JSON.parse(redacted) });
		return JSON.stringify(redactedWrapper.structuredTextValue);
	} catch {
		return redacted;
	}
}
function stringifyStructuredBlock(block) {
	const seen = /* @__PURE__ */ new WeakSet();
	try {
		const redactedBlock = getAiTransportHost().redactSecrets({ structuredToolResult: block }).structuredToolResult;
		const serialized = JSON.stringify(redactedBlock, function structuredToolResultReplacer(key, value) {
			if (OPAQUE_OR_BINARY_FIELD_RE.test(key)) return `[omitted ${key}]`;
			if (key === "data") {
				const mimeType = readMimeType(this);
				if (mimeType && isBinaryMimeType(mimeType)) return describeOmittedValue(value, "binary data");
			}
			if (typeof value === "bigint") return value.toString();
			if (typeof value === "string") return redactInlineDataUris(redactStructuredTextValue(value));
			if (typeof value === "function" || typeof value === "symbol" || value === void 0) return;
			if (!value || typeof value !== "object") return value;
			if (seen.has(value)) return "[Circular]";
			seen.add(value);
			return value;
		});
		if (!serialized || serialized === "{}") return;
		return serialized;
	} catch {
		return;
	}
}
function truncateProviderToolText(text) {
	if (text.length <= PROVIDER_TOOL_RESULT_MAX_CHARS) return text;
	return `${truncateUtf16Safe(text, PROVIDER_TOOL_RESULT_MAX_CHARS)}\n…(truncated)…`;
}
/** Media metadata alone is not an attachment; provider emitters need inline bytes. */
function hasMediaPayload(block) {
	return isRecord(block) && typeof block.data === "string" && block.data.trim().length > 0;
}
/** Image metadata alone is not an attachment; provider emitters need inline bytes. */
function isImageWithMediaPayload(block) {
	return isRecord(block) && block.type === "image" && hasMediaPayload(block);
}
function describeToolResultMediaPlaceholder(blocks) {
	let hasImage = false;
	let hasAudio = false;
	for (const block of blocks) {
		if (!hasMediaPayload(block)) continue;
		const record = block;
		const type = typeof record.type === "string" ? record.type : void 0;
		const mimeType = readMimeType(record);
		if (type && IMAGE_TOOL_RESULT_TYPES.has(type) || mimeType?.toLowerCase().startsWith("image/")) hasImage = true;
		if (type && AUDIO_TOOL_RESULT_TYPES.has(type) || mimeType?.toLowerCase().startsWith("audio/")) hasAudio = true;
	}
	if (hasImage && hasAudio) return "(see attached media)";
	if (hasAudio) return "(see attached audio)";
	if (hasImage) return "(see attached image)";
}
function extractToolResultBlockText(block) {
	if (!block || typeof block !== "object") return;
	const record = block;
	if (typeof record.type === "string" && MEDIA_ONLY_TOOL_RESULT_TYPES.has(record.type)) return;
	if (record.type === "text") {
		const text = typeof record.text === "string" ? record.text : "";
		return text ? sanitizeSurrogates(text) : void 0;
	}
	const structured = stringifyStructuredBlock(record);
	return structured ? sanitizeSurrogates(truncateProviderToolText(structured)) : void 0;
}
function extractToolResultText(blocks) {
	const explicitTexts = [];
	const structuredTexts = [];
	for (const block of blocks) {
		const text = extractToolResultBlockText(block);
		if (!text) continue;
		if (block.type === "text") explicitTexts.push(text);
		else structuredTexts.push(text);
	}
	if (explicitTexts.length > 0) return sanitizeSurrogates(explicitTexts.join("\n"));
	return sanitizeSurrogates(truncateProviderToolText(structuredTexts.join("\n")));
}
//#endregion
export { normalizeStructuredPromptSection as _, isImageWithMediaPayload as a, buildBaseOptions as c, SYSTEM_PROMPT_CACHE_BOUNDARY as d, ensureSystemPromptCacheBoundary as f, normalizePromptCapabilityIds as g, stripSystemPromptCacheBoundary as h, hasMediaPayload as i, clampMaxTokensToModel as l, splitSystemPromptCacheBoundary as m, extractToolResultBlockText as n, truncateUtf16Safe as o, prependSystemPromptAdditionAfterCacheBoundary as p, extractToolResultText as r, adjustMaxTokensForThinking as s, describeToolResultMediaPlaceholder as t, clampReasoning as u, sortPromptCacheToolsByName as v };
