import { _ as normalizeLowercaseStringOrEmpty, b as isRecord, v as normalizeOptionalString } from "./host-Bl7Kgddo.mjs";
import { n as calculateCost } from "./model-utils-Dau5dlgm.mjs";
import { a as isImageWithMediaPayload, h as stripSystemPromptCacheBoundary, o as truncateUtf16Safe, r as extractToolResultText, t as describeToolResultMediaPlaceholder } from "./tool-result-text-Dvkp2Dus.mjs";
import { c as transformTransportMessages } from "./tool-schema-json-projection-B1b-XCn5.mjs";
import { n as parseStreamingJson } from "./json-parse-BvXNt1-7.mjs";
import { b as redactIdentifier, d as transportAbortError, l as sanitizeNonEmptyTransportPayloadText, u as sanitizeTransportPayloadText, x as redactSensitiveText } from "./transport-stream-shared-CPNv7A3r.mjs";
import { i as log, n as createModelStreamCooperativeScheduler } from "./openai-transport-shared-Cipt7egQ.mjs";
import { a as withFirstStreamEventTimeout } from "./stream-first-event-timeout-BIBomOGq.mjs";
import { t as shortHash } from "./hash-CHgqbJmD.mjs";
import { randomUUID } from "node:crypto";
//#region packages/ai/src/transports/json-unsafe-integers.ts
/**
* JSON parsing helpers that preserve integer literals larger than
* Number.MAX_SAFE_INTEGER as strings before JSON.parse can round them.
*/
const MAX_SAFE_INTEGER_ABS_STR = String(Number.MAX_SAFE_INTEGER);
function isAsciiDigit(ch) {
	return ch !== void 0 && ch >= "0" && ch <= "9";
}
function parseJsonNumberToken(input, start) {
	let idx = start;
	if (input[idx] === "-") idx += 1;
	if (idx >= input.length) return null;
	if (input[idx] === "0") idx += 1;
	else if (isAsciiDigit(input[idx]) && input[idx] !== "0") while (isAsciiDigit(input[idx])) idx += 1;
	else return null;
	let isInteger = true;
	if (input[idx] === ".") {
		isInteger = false;
		idx += 1;
		if (!isAsciiDigit(input[idx])) return null;
		while (isAsciiDigit(input[idx])) idx += 1;
	}
	if (input[idx] === "e" || input[idx] === "E") {
		isInteger = false;
		idx += 1;
		if (input[idx] === "+" || input[idx] === "-") idx += 1;
		if (!isAsciiDigit(input[idx])) return null;
		while (isAsciiDigit(input[idx])) idx += 1;
	}
	return {
		token: input.slice(start, idx),
		end: idx,
		isInteger
	};
}
function isUnsafeIntegerLiteral(token) {
	const digits = token[0] === "-" ? token.slice(1) : token;
	if (digits.length < MAX_SAFE_INTEGER_ABS_STR.length) return false;
	if (digits.length > MAX_SAFE_INTEGER_ABS_STR.length) return true;
	return digits > MAX_SAFE_INTEGER_ABS_STR;
}
/** Quotes integer literals above Number.MAX_SAFE_INTEGER before JSON.parse. */
function quoteUnsafeIntegerLiterals(input) {
	let out = "";
	let inString = false;
	let escaped = false;
	let idx = 0;
	while (idx < input.length) {
		const ch = input[idx] ?? "";
		if (inString) {
			out += ch;
			if (escaped) escaped = false;
			else if (ch === "\\") escaped = true;
			else if (ch === "\"") inString = false;
			idx += 1;
			continue;
		}
		if (ch === "\"") {
			inString = true;
			out += ch;
			idx += 1;
			continue;
		}
		if (ch === "-" || isAsciiDigit(ch)) {
			const parsed = parseJsonNumberToken(input, idx);
			if (parsed) {
				if (parsed.isInteger && isUnsafeIntegerLiteral(parsed.token)) out += `"${parsed.token}"`;
				else out += parsed.token;
				idx = parsed.end;
				continue;
			}
		}
		out += ch;
		idx += 1;
	}
	return out;
}
/** Parses JSON while preserving unsafe integer literals as strings. */
function parseJsonPreservingUnsafeIntegers(input) {
	return JSON.parse(quoteUnsafeIntegerLiterals(input));
}
/** Parses or accepts an object while preserving unsafe integer literals in string input. */
function parseJsonObjectPreservingUnsafeIntegers(value) {
	if (typeof value === "string") {
		try {
			const parsed = parseJsonPreservingUnsafeIntegers(value);
			if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
		} catch {
			return null;
		}
		return null;
	}
	if (value && typeof value === "object" && !Array.isArray(value)) return value;
	return null;
}
//#endregion
//#region packages/ai/src/transports/model-transport-debug.ts
function normalizeEnv(value) {
	return typeof value === "string" ? value.trim().toLowerCase() : "";
}
function isTruthyEnv(value) {
	const normalized = normalizeEnv(value);
	return normalized.length > 0 && normalized !== "0" && normalized !== "false" && normalized !== "off" && normalized !== "no";
}
/** Resolves model payload debug verbosity from `OPENCLAW_DEBUG_MODEL_PAYLOAD`. */
function resolveModelPayloadDebugMode(env = process.env) {
	const normalized = normalizeEnv(env.OPENCLAW_DEBUG_MODEL_PAYLOAD);
	if (normalized === "tools" || normalized === "full-redacted") return normalized;
	if (normalized === "summary") return "summary";
	return "off";
}
/** Resolves SSE stream debug verbosity from `OPENCLAW_DEBUG_SSE`. */
function resolveModelSseDebugMode(env = process.env) {
	const normalized = normalizeEnv(env.OPENCLAW_DEBUG_SSE);
	if (normalized === "peek") return "peek";
	if (normalized === "events" || isTruthyEnv(normalized)) return "events";
	return "off";
}
/** Returns whether any model transport debug channel is enabled. */
function isModelTransportDebugEnabled(env = process.env) {
	return isTruthyEnv(env.OPENCLAW_DEBUG_MODEL_TRANSPORT) || resolveModelPayloadDebugMode(env) !== "off" || resolveModelSseDebugMode(env) !== "off" || isTruthyEnv(env.OPENCLAW_DEBUG_CODE_MODE);
}
function isModelFetchMetadataMessage(message) {
	return message.startsWith("[model-fetch]");
}
/** Emits model-fetch metadata at info level by default; other diagnostics require debug env. */
function emitModelTransportDebug(log, message) {
	if (isModelFetchMetadataMessage(message) || isModelTransportDebugEnabled()) {
		log.info(message);
		return;
	}
	log.debug(message);
}
//#endregion
//#region packages/normalization-core/src/string-normalization.ts
/** Coerces entries to strings, trims them, and drops empty results. */
function normalizeStringEntries(list) {
	return (list ?? []).map((entry) => normalizeOptionalString(String(entry)) ?? "").filter(Boolean);
}
/** Returns first-seen unique values while preserving insertion order. */
function uniqueValues(values) {
	return [...new Set(values)];
}
/** Returns first-seen unique strings while preserving insertion order. */
function uniqueStrings(values) {
	return uniqueValues(values);
}
//#endregion
//#region packages/ai/src/providers/openai-reasoning-effort.ts
/**
* OpenAI-compatible reasoning-effort normalization. Different GPT families
* expose different accepted effort enums, so callers map requested values here
* before constructing provider payloads.
*/
const GPT_5_REASONING_EFFORTS = [
	"minimal",
	"low",
	"medium",
	"high"
];
const GPT_51_REASONING_EFFORTS = [
	"none",
	"low",
	"medium",
	"high"
];
const GPT_52_REASONING_EFFORTS = [
	"none",
	"low",
	"medium",
	"high",
	"xhigh"
];
const GPT_56_REASONING_EFFORTS = [
	"none",
	"low",
	"medium",
	"high",
	"xhigh",
	"max"
];
const GPT_CODEX_REASONING_EFFORTS = [
	"low",
	"medium",
	"high",
	"xhigh"
];
const GPT_PRO_REASONING_EFFORTS = [
	"medium",
	"high",
	"xhigh"
];
const GPT_5_PRO_REASONING_EFFORTS = ["high"];
const GPT_51_CODEX_MAX_REASONING_EFFORTS = [
	"none",
	"medium",
	"high",
	"xhigh"
];
const GPT_51_CODEX_MINI_REASONING_EFFORTS = ["medium"];
const GENERIC_REASONING_EFFORTS = [
	"low",
	"medium",
	"high"
];
const CANONICAL_REASONING_EFFORTS = /* @__PURE__ */ new Set([
	"none",
	"minimal",
	"low",
	"medium",
	"high",
	"xhigh",
	"max",
	"off"
]);
function normalizeModelId(id) {
	return normalizeLowercaseStringOrEmpty(id ?? "").replace(/-\d{4}-\d{2}-\d{2}$/u, "");
}
/** Return whether a model is the GPT-5.4 mini family. */
function isOpenAIGpt54MiniModel(model) {
	const id = normalizeModelId(typeof model.id === "string" ? model.id : void 0);
	return /^gpt-5\.4-mini(?:-|$)/u.test(id);
}
/** Return whether a model is the GPT-5.5 family. */
function isOpenAIGpt55Model(model) {
	const id = normalizeModelId(typeof model.id === "string" ? model.id : void 0);
	const name = normalizeModelId(typeof model.name === "string" ? model.name : void 0);
	return /^gpt-5\.5(?:-|$)/u.test(id) || /^gpt-5\.5(?:\s|\(|-|$)/u.test(name);
}
/** Return whether a model is the GPT-5.6 family. */
function isOpenAIGpt56Model(model) {
	const id = normalizeModelId(typeof model.id === "string" ? model.id : void 0);
	const name = normalizeModelId(typeof model.name === "string" ? model.name : void 0);
	return /^gpt-5\.6(?:-|$)/u.test(id) || /^gpt-5\.6(?:\s|\(|-|$)/u.test(name);
}
/** Normalize user-facing reasoning effort names to API effort names. */
function normalizeOpenAIReasoningEffort(effort) {
	const trimmed = effort.trim();
	const folded = trimmed.toLowerCase();
	return CANONICAL_REASONING_EFFORTS.has(folded) ? folded : trimmed;
}
function readCompatReasoningEfforts(compat) {
	if (!compat || typeof compat !== "object") return;
	if (compat.supportsReasoningEffort === false) return [];
	const raw = compat.supportedReasoningEfforts;
	if (!Array.isArray(raw)) return;
	const supported = uniqueStrings(normalizeStringEntries(raw.filter((value) => typeof value === "string")));
	return supported.length > 0 ? supported : void 0;
}
function isDisabledReasoningEffort(effort) {
	return effort === "none" || effort === "off";
}
/** Resolve the reasoning efforts accepted by a specific OpenAI-compatible model. */
function resolveOpenAISupportedReasoningEfforts(model) {
	const compatEfforts = readCompatReasoningEfforts(model.compat);
	if (compatEfforts) return compatEfforts;
	const id = normalizeModelId(typeof model.id === "string" ? model.id : void 0);
	if (/^gpt-5\.6(?:-|$)/u.test(id)) return GPT_56_REASONING_EFFORTS;
	if (id === "gpt-5.1-codex-mini") return GPT_51_CODEX_MINI_REASONING_EFFORTS;
	if (id === "gpt-5.1-codex-max") return GPT_51_CODEX_MAX_REASONING_EFFORTS;
	if (/^gpt-5(?:\.\d+)?-codex(?:-|$)/u.test(id)) return GPT_CODEX_REASONING_EFFORTS;
	if (id === "gpt-5-pro") return GPT_5_PRO_REASONING_EFFORTS;
	if (/^gpt-5\.[2-9](?:\.\d+)?-pro(?:-|$)/u.test(id)) return GPT_PRO_REASONING_EFFORTS;
	if (/^gpt-5\.[2-9](?:\.\d+)?(?:-|$)/u.test(id)) return GPT_52_REASONING_EFFORTS;
	if (/^gpt-5\.1(?:-|$)/u.test(id)) return GPT_51_REASONING_EFFORTS;
	if (/^gpt-5(?:-|$)/u.test(id)) return GPT_5_REASONING_EFFORTS;
	return GENERIC_REASONING_EFFORTS;
}
/**
* Return whether a model accepts the temperature parameter. The GPT-5.6
* family rejects it with a 400; catalog compat can override per model.
*/
function supportsOpenAITemperature(model) {
	const compat = model.compat;
	if (compat && typeof compat === "object") {
		const declared = compat.supportsTemperature;
		if (typeof declared === "boolean") return declared;
	}
	const id = normalizeModelId(typeof model.id === "string" ? model.id : void 0);
	return !/^gpt-5\.6(?:-|$)/u.test(id);
}
/** Return whether a model accepts a requested reasoning effort. */
function supportsOpenAIReasoningEffort(model, effort) {
	return resolveOpenAISupportedReasoningEfforts(model).includes(normalizeOpenAIReasoningEffort(effort));
}
/** Resolve a requested reasoning effort to the closest value supported by the model. */
function resolveOpenAIReasoningEffortForModel(params) {
	const requested = normalizeOpenAIReasoningEffort(params.effort);
	const mapped = params.fallbackMap?.[requested] ?? (params.fallbackMap && CANONICAL_REASONING_EFFORTS.has(requested) ? Object.entries(params.fallbackMap).find(([effort]) => normalizeOpenAIReasoningEffort(effort) === requested)?.[1] : void 0);
	const normalized = mapped === void 0 ? requested : mapped.trim();
	const supported = resolveOpenAISupportedReasoningEfforts(params.model);
	if (supported.includes(normalized)) return normalized;
	if (requested === "off" && supported.includes("none")) return "none";
	if (isDisabledReasoningEffort(requested) || isDisabledReasoningEffort(normalized)) return;
	if (requested === "minimal" && supported.includes("low")) return "low";
	if ((requested === "minimal" || requested === "low") && supported.includes("medium")) return "medium";
	if (requested === "xhigh" && supported.includes("high")) return "high";
	if (requested === "max" && supported.includes("xhigh")) return "xhigh";
	return supported.find((effort) => !isDisabledReasoningEffort(normalizeOpenAIReasoningEffort(effort)));
}
//#endregion
//#region packages/ai/src/providers/clean-for-gemini.ts
const GEMINI_UNSUPPORTED_SCHEMA_KEYWORDS = /* @__PURE__ */ new Set([
	"patternProperties",
	"additionalProperties",
	"$schema",
	"$id",
	"$ref",
	"$defs",
	"definitions",
	"examples",
	"minLength",
	"maxLength",
	"minimum",
	"maximum",
	"multipleOf",
	"pattern",
	"format",
	"minItems",
	"maxItems",
	"uniqueItems",
	"minProperties",
	"maxProperties",
	"not"
]);
const SCHEMA_META_KEYS = [
	"description",
	"title",
	"default"
];
function copySchemaMeta$1(from, to) {
	for (const key of SCHEMA_META_KEYS) if (key in from && from[key] !== void 0) to[key] = from[key];
}
function stringifyGeminiEnumValue(value) {
	if (typeof value === "string") return value;
	if (typeof value === "number" && Number.isFinite(value)) return String(value);
	if (typeof value === "boolean") return String(value);
}
function cleanGeminiEnumValues(value) {
	if (!Array.isArray(value)) return;
	const values = value.flatMap((entry) => {
		const stringified = stringifyGeminiEnumValue(entry);
		return stringified === void 0 ? [] : [stringified];
	});
	const unique = [...new Set(values)];
	return unique.length > 0 ? unique : void 0;
}
function tryFlattenLiteralAnyOf(variants) {
	if (variants.length === 0) return null;
	const allValues = [];
	let commonType = null;
	for (const variant of variants) {
		if (!variant || typeof variant !== "object") return null;
		const v = variant;
		let literalValue;
		if ("const" in v) literalValue = v.const;
		else if (Array.isArray(v.enum) && v.enum.length === 1) literalValue = v.enum[0];
		else return null;
		const variantType = typeof v.type === "string" ? v.type : null;
		if (!variantType) return null;
		if (commonType === null) commonType = variantType;
		else if (commonType !== variantType) return null;
		allValues.push(literalValue);
	}
	if (commonType && allValues.length > 0) return {
		type: commonType,
		enum: allValues
	};
	return null;
}
function isNullSchema(variant) {
	if (!variant || typeof variant !== "object" || Array.isArray(variant)) return false;
	const record = variant;
	if ("const" in record && record.const === null) return true;
	if (Array.isArray(record.enum) && record.enum.length === 1) return record.enum[0] === null;
	const typeValue = record.type;
	if (typeValue === "null") return true;
	if (Array.isArray(typeValue) && typeValue.length === 1 && typeValue[0] === "null") return true;
	return false;
}
function stripNullVariants(variants) {
	if (variants.length === 0) return {
		variants,
		stripped: false
	};
	const nonNull = variants.filter((variant) => !isNullSchema(variant));
	return {
		variants: nonNull,
		stripped: nonNull.length !== variants.length
	};
}
function extendSchemaDefs$1(defs, schema) {
	const defsEntry = schema.$defs && typeof schema.$defs === "object" && !Array.isArray(schema.$defs) ? schema.$defs : void 0;
	const legacyDefsEntry = schema.definitions && typeof schema.definitions === "object" && !Array.isArray(schema.definitions) ? schema.definitions : void 0;
	if (!defsEntry && !legacyDefsEntry) return defs;
	const next = defs ? new Map(defs) : /* @__PURE__ */ new Map();
	if (defsEntry) for (const [key, value] of Object.entries(defsEntry)) next.set(key, value);
	if (legacyDefsEntry) for (const [key, value] of Object.entries(legacyDefsEntry)) next.set(key, value);
	return next;
}
function decodeJsonPointerSegment$1(segment) {
	return segment.replaceAll("~1", "/").replaceAll("~0", "~");
}
function tryResolveLocalRef$1(ref, defs) {
	if (!defs) return;
	const match = ref.match(/^#\/(?:\$defs|definitions)\/(.+)$/);
	if (!match) return;
	const name = decodeJsonPointerSegment$1(match[1] ?? "");
	if (!name) return;
	return defs.get(name);
}
function simplifyUnionVariants(params) {
	const { obj, variants } = params;
	const { variants: nonNullVariants, stripped } = stripNullVariants(variants);
	const flattened = tryFlattenLiteralAnyOf(nonNullVariants);
	if (flattened) {
		const result = {
			type: flattened.type,
			enum: flattened.enum
		};
		copySchemaMeta$1(obj, result);
		return {
			variants: nonNullVariants,
			simplified: result
		};
	}
	if (stripped && nonNullVariants.length === 1) {
		const lone = nonNullVariants[0];
		if (lone && typeof lone === "object" && !Array.isArray(lone)) {
			const result = { ...lone };
			copySchemaMeta$1(obj, result);
			return {
				variants: nonNullVariants,
				simplified: result
			};
		}
		return {
			variants: nonNullVariants,
			simplified: lone
		};
	}
	return { variants: stripped ? nonNullVariants : variants };
}
function sanitizeRequiredFields(schema) {
	if (!Array.isArray(schema.required)) return schema;
	if (!schema.properties || typeof schema.properties !== "object" || Array.isArray(schema.properties)) {
		if (schema.type === "object") delete schema.required;
		return schema;
	}
	const properties = schema.properties;
	const required = schema.required.filter((key) => typeof key === "string" && Object.hasOwn(properties, key));
	if (required.length > 0) schema.required = required;
	else delete schema.required;
	return schema;
}
function cleanSchemaForGeminiWithDefs(schema, defs, refStack) {
	if (!schema || typeof schema !== "object") return schema;
	if (Array.isArray(schema)) return schema.map((item) => cleanSchemaForGeminiWithDefs(item, defs, refStack));
	const obj = schema;
	const nextDefs = extendSchemaDefs$1(defs, obj);
	const refValue = typeof obj.$ref === "string" ? obj.$ref : void 0;
	if (refValue) {
		if (refStack?.has(refValue)) return {};
		const resolved = tryResolveLocalRef$1(refValue, nextDefs);
		if (resolved) {
			const nextRefStack = refStack ? new Set(refStack) : /* @__PURE__ */ new Set();
			nextRefStack.add(refValue);
			const cleaned = cleanSchemaForGeminiWithDefs(resolved, nextDefs, nextRefStack);
			if (!cleaned || typeof cleaned !== "object" || Array.isArray(cleaned)) return cleaned;
			const result = { ...cleaned };
			copySchemaMeta$1(obj, result);
			return result;
		}
		const result = {};
		copySchemaMeta$1(obj, result);
		return result;
	}
	const hasAnyOf = "anyOf" in obj && Array.isArray(obj.anyOf);
	const hasOneOf = "oneOf" in obj && Array.isArray(obj.oneOf);
	let cleanedAnyOf = hasAnyOf ? obj.anyOf.map((variant) => cleanSchemaForGeminiWithDefs(variant, nextDefs, refStack)) : void 0;
	let cleanedOneOf = hasOneOf ? obj.oneOf.map((variant) => cleanSchemaForGeminiWithDefs(variant, nextDefs, refStack)) : void 0;
	if (hasAnyOf) {
		const simplified = simplifyUnionVariants({
			obj,
			variants: cleanedAnyOf ?? []
		});
		cleanedAnyOf = simplified.variants;
		if ("simplified" in simplified) return simplified.simplified;
	}
	if (hasOneOf) {
		const simplified = simplifyUnionVariants({
			obj,
			variants: cleanedOneOf ?? []
		});
		cleanedOneOf = simplified.variants;
		if ("simplified" in simplified) return simplified.simplified;
	}
	const cleaned = {};
	for (const [key, value] of Object.entries(obj)) {
		if (GEMINI_UNSUPPORTED_SCHEMA_KEYWORDS.has(key)) continue;
		if (key === "const") {
			const enumValues = cleanGeminiEnumValues([value]);
			if (enumValues) cleaned.enum = enumValues;
			continue;
		}
		if (key === "enum") {
			const enumValues = cleanGeminiEnumValues(value);
			if (enumValues) cleaned.enum = enumValues;
			continue;
		}
		if (key === "required" && Array.isArray(value) && value.length === 0) continue;
		if (key === "type" && (hasAnyOf || hasOneOf)) continue;
		if (key === "type" && Array.isArray(value) && value.every((entry) => typeof entry === "string")) {
			const types = value.filter((entry) => entry !== "null");
			cleaned.type = types.length === 1 ? types[0] : types;
			continue;
		}
		if (key === "properties") if (value && typeof value === "object" && !Array.isArray(value)) cleaned[key] = Object.fromEntries(Object.entries(value).map(([k, v]) => [k, cleanSchemaForGeminiWithDefs(v, nextDefs, refStack)]));
		else cleaned[key] = {};
		else if (key === "items" && value) if (Array.isArray(value)) cleaned[key] = value.map((entry) => cleanSchemaForGeminiWithDefs(entry, nextDefs, refStack));
		else if (typeof value === "object") cleaned[key] = cleanSchemaForGeminiWithDefs(value, nextDefs, refStack);
		else cleaned[key] = value;
		else if (key === "anyOf" && Array.isArray(value)) cleaned[key] = cleanedAnyOf ?? value.map((variant) => cleanSchemaForGeminiWithDefs(variant, nextDefs, refStack));
		else if (key === "oneOf" && Array.isArray(value)) cleaned[key] = cleanedOneOf ?? value.map((variant) => cleanSchemaForGeminiWithDefs(variant, nextDefs, refStack));
		else if (key === "allOf" && Array.isArray(value)) cleaned[key] = value.map((variant) => cleanSchemaForGeminiWithDefs(variant, nextDefs, refStack));
		else cleaned[key] = value;
	}
	if (cleaned.anyOf && Array.isArray(cleaned.anyOf)) {
		const flattened = flattenUnionFallback(cleaned, cleaned.anyOf);
		if (flattened) return sanitizeRequiredFields(flattened);
	}
	if (cleaned.oneOf && Array.isArray(cleaned.oneOf)) {
		const flattened = flattenUnionFallback(cleaned, cleaned.oneOf);
		if (flattened) return sanitizeRequiredFields(flattened);
	}
	return sanitizeRequiredFields(cleaned);
}
/**
* Last-resort flattening for anyOf/oneOf arrays that could not be simplified
* by `simplifyUnionVariants`. Picks a representative type so the schema is
* accepted by Google's restricted JSON Schema validation.
*/
function flattenUnionFallback(obj, variants) {
	const objects = variants.filter((v) => Boolean(v) && typeof v === "object");
	if (objects.length === 0) return;
	const types = new Set(objects.map((v) => v.type).filter(Boolean));
	if (objects.length === 1) {
		const merged = { ...objects[0] };
		copySchemaMeta$1(obj, merged);
		return merged;
	}
	if (types.size === 1) {
		const merged = { type: Array.from(types)[0] };
		copySchemaMeta$1(obj, merged);
		return merged;
	}
	const first = objects[0];
	if (first?.type) {
		const merged = { type: first.type };
		copySchemaMeta$1(obj, merged);
		return merged;
	}
	const merged = {};
	copySchemaMeta$1(obj, merged);
	return merged;
}
function cleanSchemaForGemini(schema) {
	if (!schema || typeof schema !== "object") return schema;
	if (Array.isArray(schema)) return schema.map(cleanSchemaForGemini);
	return cleanSchemaForGeminiWithDefs(schema, extendSchemaDefs$1(void 0, schema), void 0);
}
//#endregion
//#region packages/ai/src/providers/clean-for-llamacpp-gbnf.ts
/** llama.cpp rejects grammar repetitions whose expanded rule count reaches 2000. */
const LLAMACPP_GBNF_MAX_REPETITION_THRESHOLD = 2e3;
const SCHEMA_MAP_KEYS$2 = /* @__PURE__ */ new Set([
	"$defs",
	"definitions",
	"dependentSchemas",
	"patternProperties",
	"properties"
]);
const SCHEMA_CHILD_KEYS = /* @__PURE__ */ new Set([
	"additionalItems",
	"additionalProperties",
	"allOf",
	"anyOf",
	"contains",
	"else",
	"if",
	"items",
	"not",
	"oneOf",
	"prefixItems",
	"propertyNames",
	"then",
	"unevaluatedItems",
	"unevaluatedProperties"
]);
function isSchemaRecord(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function cleanSchemaNode(node) {
	if (Array.isArray(node)) {
		let changed = false;
		const entries = node.map((entry) => {
			const next = cleanSchemaNode(entry);
			changed ||= next !== entry;
			return next;
		});
		return changed ? entries : node;
	}
	if (!isSchemaRecord(node)) return node;
	let changed = false;
	const cleaned = {};
	for (const [key, value] of Object.entries(node)) {
		if (key === "pattern") {
			changed = true;
			continue;
		}
		if (key === "maxLength" && typeof value === "number" && value >= 2e3) {
			changed = true;
			continue;
		}
		let next = value;
		if (SCHEMA_MAP_KEYS$2.has(key) && isSchemaRecord(value)) {
			let mapChanged = false;
			next = Object.fromEntries(Object.entries(value).map(([childKey, childValue]) => {
				const cleanedChild = cleanSchemaNode(childValue);
				mapChanged ||= cleanedChild !== childValue;
				return [childKey, cleanedChild];
			}));
			if (!mapChanged) next = value;
		} else if (SCHEMA_CHILD_KEYS.has(key)) next = cleanSchemaNode(value);
		cleaned[key] = next;
		changed ||= next !== value;
	}
	return changed ? cleaned : node;
}
function collectSchemaViolations(node, path, violations) {
	if (Array.isArray(node)) {
		node.forEach((entry, index) => collectSchemaViolations(entry, `${path}[${index}]`, violations));
		return;
	}
	if (!isSchemaRecord(node)) return;
	if ("pattern" in node) violations.push(`${path}.pattern`);
	if (typeof node.maxLength === "number" && node.maxLength >= 2e3) violations.push(`${path}.maxLength`);
	for (const [key, value] of Object.entries(node)) if (SCHEMA_MAP_KEYS$2.has(key) && isSchemaRecord(value)) for (const [childKey, childValue] of Object.entries(value)) collectSchemaViolations(childValue, `${path}.${key}.${childKey}`, violations);
	else if (SCHEMA_CHILD_KEYS.has(key)) collectSchemaViolations(value, `${path}.${key}`, violations);
}
/** Removes JSON Schema constraints that llama.cpp cannot compile into GBNF. */
function cleanSchemaForLlamacppGbnf(schema) {
	return cleanSchemaNode(schema);
}
/** Reports schema paths that llama.cpp cannot compile into GBNF. */
function findLlamacppGbnfSchemaViolations(schema, path) {
	const violations = [];
	collectSchemaViolations(schema, path, violations);
	return violations;
}
//#endregion
//#region packages/ai/src/providers/schema-keyword-strip.ts
const SCHEMA_MAP_KEYS$1 = /* @__PURE__ */ new Set([
	"$defs",
	"definitions",
	"dependentSchemas",
	"dependencies",
	"patternProperties",
	"properties"
]);
/** Containers whose value is a single nested schema. */
const SCHEMA_OBJECT_KEYS$1 = /* @__PURE__ */ new Set([
	"additionalItems",
	"additionalProperties",
	"contains",
	"contentSchema",
	"else",
	"if",
	"items",
	"not",
	"propertyNames",
	"then",
	"unevaluatedItems",
	"unevaluatedProperties"
]);
/** Containers whose value is a list of nested schemas. */
const SCHEMA_ARRAY_KEYS$1 = /* @__PURE__ */ new Set([
	"allOf",
	"anyOf",
	"items",
	"oneOf",
	"prefixItems"
]);
/** Recursively remove schema keywords unsupported by a target provider/tool surface. */
function stripUnsupportedSchemaKeywords(schema, unsupportedKeywords) {
	if (!schema || typeof schema !== "object") return schema;
	if (Array.isArray(schema)) return schema.map((entry) => stripUnsupportedSchemaKeywords(entry, unsupportedKeywords));
	const obj = schema;
	const cleaned = {};
	for (const [key, value] of Object.entries(obj)) {
		if (unsupportedKeywords.has(key)) continue;
		if (SCHEMA_MAP_KEYS$1.has(key) && value && typeof value === "object" && !Array.isArray(value)) {
			cleaned[key] = Object.fromEntries(Object.entries(value).map(([childKey, childValue]) => [childKey, stripUnsupportedSchemaKeywords(childValue, unsupportedKeywords)]));
			continue;
		}
		if (SCHEMA_ARRAY_KEYS$1.has(key) && Array.isArray(value)) {
			cleaned[key] = value.map((entry) => stripUnsupportedSchemaKeywords(entry, unsupportedKeywords));
			continue;
		}
		if (SCHEMA_OBJECT_KEYS$1.has(key) && value && typeof value === "object") {
			cleaned[key] = stripUnsupportedSchemaKeywords(value, unsupportedKeywords);
			continue;
		}
		cleaned[key] = value;
	}
	return cleaned;
}
//#endregion
//#region packages/ai/src/providers/agent-tools-parameter-schema.ts
/**
* Normalizes model-facing tool parameter schemas across provider quirks.
* Handles local JSON Schema refs, OpenAPI nullable syntax, top-level unions,
* and provider-specific unsupported keyword stripping.
*/
/** Extracts the compat record whether callers pass a model (`{ compat }`) or the compat itself. */
function extractToolSchemaModelCompat(modelOrCompat) {
	if (!modelOrCompat || typeof modelOrCompat !== "object") return;
	if ("compat" in modelOrCompat) {
		const compat = modelOrCompat.compat;
		return compat && typeof compat === "object" ? compat : void 0;
	}
	return modelOrCompat;
}
/** JSON Schema keywords this model/provider rejects in tool schemas. */
function resolveUnsupportedToolSchemaKeywords(modelOrCompat) {
	const keywords = extractToolSchemaModelCompat(modelOrCompat)?.unsupportedToolSchemaKeywords ?? [];
	return new Set(normalizeStringEntries(keywords.filter((keyword) => typeof keyword === "string")));
}
/** Whether empty `items: {}` on array schemas must be omitted for this model/provider. */
function shouldOmitEmptyArrayItems(modelOrCompat) {
	return extractToolSchemaModelCompat(modelOrCompat)?.omitEmptyArrayItems === true;
}
const MAX_TOOL_PARAMETER_SCHEMA_CACHE_ENTRIES_PER_SCHEMA = 8;
const toolParameterSchemaCache = /* @__PURE__ */ new WeakMap();
function resolveToolParameterSchemaCacheKey(options) {
	const normalizedProvider = normalizeLowercaseStringOrEmpty(options?.modelProvider);
	const normalizedModelId = normalizeLowercaseStringOrEmpty(options?.modelId);
	const toolSchemaProfile = normalizeLowercaseStringOrEmpty(options?.modelCompat?.toolSchemaProfile);
	const unsupportedKeywords = Array.from(resolveUnsupportedToolSchemaKeywords(options?.modelCompat)).toSorted();
	const omitEmptyArrayItems = shouldOmitEmptyArrayItems(options?.modelCompat);
	return JSON.stringify([
		normalizedProvider,
		normalizedModelId,
		toolSchemaProfile,
		unsupportedKeywords,
		omitEmptyArrayItems
	]);
}
function getCachedToolParameterSchema(schema, key) {
	return toolParameterSchemaCache.get(schema)?.find((entry) => entry.key === key)?.value;
}
function rememberCachedToolParameterSchema(schema, key, value) {
	const entries = toolParameterSchemaCache.get(schema) ?? [];
	toolParameterSchemaCache.set(schema, [{
		key,
		value
	}, ...entries.filter((entry) => entry.key !== key)].slice(0, MAX_TOOL_PARAMETER_SCHEMA_CACHE_ENTRIES_PER_SCHEMA));
	return value;
}
function isGeminiModelId(modelId) {
	return /(?:^|[/:])gemini(?:$|[-/:.])/.test(modelId);
}
function extractEnumValues(schema) {
	if (!schema || typeof schema !== "object") return;
	const record = schema;
	if (Array.isArray(record.enum)) return record.enum;
	if ("const" in record) return [record.const];
	const variants = Array.isArray(record.anyOf) ? record.anyOf : Array.isArray(record.oneOf) ? record.oneOf : null;
	if (variants) {
		const values = variants.flatMap((variant) => {
			return extractEnumValues(variant) ?? [];
		});
		return values.length > 0 ? values : void 0;
	}
}
function mergePropertySchemas(existing, incoming) {
	if (!existing) return incoming;
	if (!incoming) return existing;
	const existingEnum = extractEnumValues(existing);
	const incomingEnum = extractEnumValues(incoming);
	if (existingEnum || incomingEnum) {
		const values = uniqueValues([...existingEnum ?? [], ...incomingEnum ?? []]);
		const merged = {};
		for (const source of [existing, incoming]) {
			if (!source || typeof source !== "object") continue;
			const record = source;
			for (const key of [
				"title",
				"description",
				"default"
			]) if (!(key in merged) && key in record) merged[key] = record[key];
		}
		const types = new Set(values.map((value) => typeof value));
		if (types.size === 1) merged.type = Array.from(types)[0];
		merged.enum = values;
		return merged;
	}
	return existing;
}
function setOwnSchemaProperty(target, key, value) {
	Object.defineProperty(target, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
}
function hasTopLevelArrayKeyword(schemaRecord, key) {
	return Array.isArray(schemaRecord[key]);
}
function getFlattenableVariantKey(schemaRecord) {
	if (hasTopLevelArrayKeyword(schemaRecord, "anyOf")) return "anyOf";
	if (hasTopLevelArrayKeyword(schemaRecord, "oneOf")) return "oneOf";
	return null;
}
function getTopLevelConditionalKey(schemaRecord) {
	return getFlattenableVariantKey(schemaRecord) ?? (hasTopLevelArrayKeyword(schemaRecord, "allOf") ? "allOf" : null);
}
function hasTopLevelObjectSchema(schemaRecord, conditionalKey) {
	return schemaRecord.type === "object" && isRecord(schemaRecord.properties) && conditionalKey === null;
}
function isObjectLikeSchemaMissingType(schemaRecord, conditionalKey) {
	return !("type" in schemaRecord) && (isRecord(schemaRecord.properties) || Array.isArray(schemaRecord.required)) && conditionalKey === null;
}
function isTypedObjectSchemaMissingValidProperties(schemaRecord, conditionalKey) {
	return schemaRecord.type === "object" && !isRecord(schemaRecord.properties) && conditionalKey === null;
}
function isTrulyEmptySchema(schemaRecord) {
	return Object.keys(schemaRecord).length === 0;
}
function normalizeArraySchemasMissingItems(schema) {
	if (!isRecord(schema)) return schema;
	let changed = false;
	const nextSchema = { ...schema };
	if (nextSchema.type === "array" && nextSchema.items === void 0) {
		nextSchema.items = {};
		changed = true;
	}
	const normalizeSchemaValue = (key) => {
		if (!(key in nextSchema)) return;
		const value = nextSchema[key];
		if (Array.isArray(value)) {
			const normalized = value.map(normalizeArraySchemasMissingItems);
			if (normalized.some((entry, index) => entry !== value[index])) {
				nextSchema[key] = normalized;
				changed = true;
			}
			return;
		}
		const normalized = normalizeArraySchemasMissingItems(value);
		if (normalized !== value) {
			nextSchema[key] = normalized;
			changed = true;
		}
	};
	for (const key of [
		"items",
		"contains",
		"additionalProperties",
		"propertyNames",
		"not",
		"if",
		"then",
		"else"
	]) normalizeSchemaValue(key);
	for (const key of [
		"anyOf",
		"oneOf",
		"allOf",
		"prefixItems"
	]) normalizeSchemaValue(key);
	for (const key of [
		"properties",
		"patternProperties",
		"dependentSchemas",
		"$defs",
		"definitions"
	]) {
		const value = nextSchema[key];
		if (!isRecord(value)) continue;
		let entriesChanged = false;
		const normalizedEntries = Object.entries(value).map(([entryKey, entryValue]) => {
			const normalizedEntryValue = normalizeArraySchemasMissingItems(entryValue);
			if (normalizedEntryValue !== entryValue) entriesChanged = true;
			return [entryKey, normalizedEntryValue];
		});
		if (entriesChanged) {
			nextSchema[key] = Object.fromEntries(normalizedEntries);
			changed = true;
		}
	}
	return changed ? nextSchema : schema;
}
function schemaAllowsArrayType(schema) {
	const type = schema.type;
	return type === "array" || Array.isArray(type) && type.includes("array");
}
const ARRAY_ITEMS_SCHEMA_OBJECT_KEYS = /* @__PURE__ */ new Set([
	"additionalProperties",
	"contains",
	"else",
	"if",
	"items",
	"not",
	"propertyNames",
	"then"
]);
const ARRAY_ITEMS_SCHEMA_ARRAY_KEYS = /* @__PURE__ */ new Set([
	"allOf",
	"anyOf",
	"oneOf",
	"prefixItems"
]);
const ARRAY_ITEMS_SCHEMA_MAP_KEYS = /* @__PURE__ */ new Set([
	"$defs",
	"definitions",
	"dependentSchemas",
	"patternProperties",
	"properties"
]);
function stripEmptyArrayItemsFromArraySchemas(schema) {
	if (Array.isArray(schema)) {
		let changed = false;
		const entries = schema.map((entry) => {
			const next = stripEmptyArrayItemsFromArraySchemas(entry);
			changed ||= next !== entry;
			return next;
		});
		return changed ? entries : schema;
	}
	if (!isRecord(schema)) return schema;
	let changed = false;
	const entries = Object.entries(schema).flatMap(([key, value]) => {
		if (key === "items" && schemaAllowsArrayType(schema) && isRecord(value) && isTrulyEmptySchema(value)) {
			changed = true;
			return [];
		}
		if (ARRAY_ITEMS_SCHEMA_OBJECT_KEYS.has(key)) {
			const next = stripEmptyArrayItemsFromArraySchemas(value);
			changed ||= next !== value;
			return [[key, next]];
		}
		if (ARRAY_ITEMS_SCHEMA_ARRAY_KEYS.has(key) && Array.isArray(value)) {
			const next = stripEmptyArrayItemsFromArraySchemas(value);
			changed ||= next !== value;
			return [[key, next]];
		}
		if (ARRAY_ITEMS_SCHEMA_MAP_KEYS.has(key) && isRecord(value)) {
			let mapChanged = false;
			const next = Object.fromEntries(Object.entries(value).map(([entryKey, entryValue]) => {
				const entryNext = stripEmptyArrayItemsFromArraySchemas(entryValue);
				mapChanged ||= entryNext !== entryValue;
				return [entryKey, entryNext];
			}));
			changed ||= mapChanged;
			return [[key, mapChanged ? next : value]];
		}
		return [[key, value]];
	});
	return changed ? Object.fromEntries(entries) : schema;
}
function copySchemaMeta(from, to) {
	for (const key of [
		"title",
		"description",
		"default"
	]) if (key in from && from[key] !== void 0) to[key] = from[key];
}
function extendSchemaDefs(defs, schema) {
	const defsEntry = schema.$defs && typeof schema.$defs === "object" && !Array.isArray(schema.$defs) ? schema.$defs : void 0;
	const legacyDefsEntry = schema.definitions && typeof schema.definitions === "object" && !Array.isArray(schema.definitions) ? schema.definitions : void 0;
	if (!defsEntry && !legacyDefsEntry) return defs;
	const next = defs ? {
		$defs: new Map(defs.$defs),
		definitions: new Map(defs.definitions)
	} : {
		$defs: /* @__PURE__ */ new Map(),
		definitions: /* @__PURE__ */ new Map()
	};
	if (defsEntry) for (const [key, value] of Object.entries(defsEntry)) next.$defs.set(key, value);
	if (legacyDefsEntry) for (const [key, value] of Object.entries(legacyDefsEntry)) next.definitions.set(key, value);
	return next;
}
function decodeJsonPointerSegment(segment) {
	return segment.replaceAll("~1", "/").replaceAll("~0", "~");
}
function resolveJsonPointerPath(value, segments) {
	let current = value;
	for (const segment of segments) {
		if (!current || typeof current !== "object") return;
		const key = decodeJsonPointerSegment(segment);
		if (Array.isArray(current)) {
			const index = /^(?:0|[1-9]\d*)$/.test(key) ? Number(key) : -1;
			if (index < 0 || index >= current.length) return;
			current = current[index];
			continue;
		}
		const record = current;
		if (!Object.hasOwn(record, key)) return;
		current = record[key];
	}
	return current;
}
function resolveLocalJsonPointer(rootDocument, ref) {
	if (!ref.startsWith("#/")) return;
	return resolveJsonPointerPath(rootDocument, ref.slice(2).split("/"));
}
const SCHEMA_MAP_KEYS = /* @__PURE__ */ new Set([
	"$defs",
	"definitions",
	"dependentSchemas",
	"patternProperties",
	"properties"
]);
const SCHEMA_OBJECT_KEYS = /* @__PURE__ */ new Set([
	"additionalProperties",
	"contains",
	"else",
	"if",
	"items",
	"not",
	"propertyNames",
	"then"
]);
const SCHEMA_ARRAY_KEYS = /* @__PURE__ */ new Set([
	"allOf",
	"anyOf",
	"items",
	"oneOf",
	"prefixItems"
]);
const SCHEMA_LITERAL_KEYS = /* @__PURE__ */ new Set([
	"const",
	"default",
	"enum",
	"examples"
]);
function tryResolveLocalRef(ref, defs, rootDocument) {
	const match = ref.match(/^#\/(\$defs|definitions)\/([^/]+)(?:\/(.*))?$/);
	if (match && defs) {
		const namespace = match[1] === "$defs" ? defs.$defs : defs.definitions;
		const name = decodeJsonPointerSegment(match[2] ?? "");
		const resolved = name ? namespace.get(name) : void 0;
		if (resolved !== void 0) return resolveJsonPointerPath(resolved, match[3] ? match[3].split("/") : []);
	}
	return resolveLocalJsonPointer(rootDocument, ref);
}
function inlineLocalSchemaRefsWithDefs(schema, defs, refStack, state, rootDocument) {
	if (!schema || typeof schema !== "object") return schema;
	if (Array.isArray(schema)) return schema.map((entry) => inlineLocalSchemaRefsWithDefs(entry, defs, refStack, state, rootDocument));
	const obj = schema;
	const nextDefs = extendSchemaDefs(defs, obj);
	const refValue = typeof obj.$ref === "string" ? obj.$ref : void 0;
	if (refValue) {
		if (refStack?.has(refValue)) return {};
		const resolved = tryResolveLocalRef(refValue, nextDefs, rootDocument);
		if (resolved === void 0) {
			if (refValue.startsWith("#/")) state.unresolvedLocalRefs = true;
			return { ...obj };
		}
		const nextRefStack = refStack ? new Set(refStack) : /* @__PURE__ */ new Set();
		nextRefStack.add(refValue);
		const inlined = inlineLocalSchemaRefsWithDefs(resolved, nextDefs, nextRefStack, state, rootDocument);
		if (!inlined || typeof inlined !== "object" || Array.isArray(inlined)) return inlined;
		const result = { ...inlined };
		copySchemaMeta(obj, result);
		if (obj.nullable === true) result.nullable = true;
		return result;
	}
	const result = {};
	for (const [key, value] of Object.entries(obj)) {
		if (key === "$defs" || key === "definitions" || key === "components") continue;
		if (SCHEMA_LITERAL_KEYS.has(key)) {
			setOwnSchemaProperty(result, key, value);
			continue;
		}
		if (SCHEMA_MAP_KEYS.has(key) && isRecord(value)) {
			setOwnSchemaProperty(result, key, Object.fromEntries(Object.entries(value).map(([entryKey, entryValue]) => [entryKey, inlineLocalSchemaRefsWithDefs(entryValue, nextDefs, refStack, state, rootDocument)])));
			continue;
		}
		if (SCHEMA_OBJECT_KEYS.has(key) && isRecord(value)) {
			setOwnSchemaProperty(result, key, inlineLocalSchemaRefsWithDefs(value, nextDefs, refStack, state, rootDocument));
			continue;
		}
		if (SCHEMA_ARRAY_KEYS.has(key) && Array.isArray(value)) {
			setOwnSchemaProperty(result, key, value.map((entry) => inlineLocalSchemaRefsWithDefs(entry, nextDefs, refStack, state, rootDocument)));
			continue;
		}
		setOwnSchemaProperty(result, key, value);
	}
	if (state.unresolvedLocalRefs) {
		if ("$defs" in obj) result.$defs = obj.$defs;
		if ("definitions" in obj) result.definitions = obj.definitions;
		if ("components" in obj) result.components = obj.components;
	}
	return result;
}
/** Inline local $ref pointers so providers receive self-contained tool schemas. */
function inlineLocalToolSchemaRefs(schema) {
	if (!schema || typeof schema !== "object") return schema;
	return inlineLocalSchemaRefsWithDefs(schema, extendSchemaDefs(void 0, schema), void 0, { unresolvedLocalRefs: false }, schema);
}
const OPENAPI_SCHEMA_ANNOTATION_KEYS = /* @__PURE__ */ new Set([
	"discriminator",
	"externalDocs",
	"readOnly",
	"writeOnly",
	"xml",
	"example"
]);
function appendNullSchemaType(type) {
	if (type === "null") return type;
	if (typeof type === "string") return [type, "null"];
	if (Array.isArray(type)) return type.includes("null") ? type : [...type, "null"];
	return type;
}
function isNullSchemaLike(schema) {
	if (!isRecord(schema)) return false;
	if (schema.type === "null") return true;
	if (Array.isArray(schema.type) && schema.type.includes("null")) return true;
	if ("const" in schema && schema.const === null) return true;
	return Array.isArray(schema.enum) && schema.enum.includes(null);
}
function hasOpenApiComposition(schema) {
	return [
		"allOf",
		"anyOf",
		"oneOf"
	].some((key) => Array.isArray(schema[key]));
}
function schemaCompositionAlreadyAllowsNull(schema) {
	return Array.isArray(schema.anyOf) && schema.anyOf.some(isNullSchemaLike) || Array.isArray(schema.oneOf) && schema.oneOf.some(isNullSchemaLike);
}
function wrapNullableComposedSchema(schema) {
	if (schemaCompositionAlreadyAllowsNull(schema)) return schema;
	const wrapped = { anyOf: [schema, { type: "null" }] };
	copySchemaMeta(schema, wrapped);
	return wrapped;
}
function normalizeOpenApiSchemaKeywords(schema) {
	if (Array.isArray(schema)) {
		let changed = false;
		const normalized = schema.map((entry) => {
			const next = normalizeOpenApiSchemaKeywords(entry);
			changed ||= next !== entry;
			return next;
		});
		return changed ? normalized : schema;
	}
	if (!isRecord(schema)) return schema;
	let changed = false;
	const nullable = schema.nullable === true;
	const normalized = {};
	for (const [key, value] of Object.entries(schema)) {
		if (key === "nullable" || OPENAPI_SCHEMA_ANNOTATION_KEYS.has(key)) {
			changed = true;
			continue;
		}
		if (SCHEMA_LITERAL_KEYS.has(key)) {
			normalized[key] = value;
			continue;
		}
		if (SCHEMA_MAP_KEYS.has(key) && isRecord(value)) {
			let mapChanged = false;
			const next = Object.fromEntries(Object.entries(value).map(([entryKey, entryValue]) => {
				const nextEntry = normalizeOpenApiSchemaKeywords(entryValue);
				mapChanged ||= nextEntry !== entryValue;
				return [entryKey, nextEntry];
			}));
			normalized[key] = mapChanged ? next : value;
			changed ||= mapChanged;
			continue;
		}
		if (key === "components") {
			normalized[key] = value;
			continue;
		}
		if (SCHEMA_OBJECT_KEYS.has(key) && isRecord(value)) {
			const next = normalizeOpenApiSchemaKeywords(value);
			normalized[key] = next;
			changed ||= next !== value;
			continue;
		}
		if (SCHEMA_ARRAY_KEYS.has(key) && Array.isArray(value)) {
			const next = value.map(normalizeOpenApiSchemaKeywords);
			normalized[key] = next;
			changed ||= next.some((entry, index) => entry !== value[index]);
			continue;
		}
		normalized[key] = value;
	}
	if (nullable) {
		if (hasOpenApiComposition(normalized)) return wrapNullableComposedSchema(normalized);
		if ("type" in normalized) {
			const nextType = appendNullSchemaType(normalized.type);
			if (nextType !== normalized.type) normalized.type = nextType;
		}
		if (Array.isArray(normalized.enum) && !normalized.enum.includes(null)) normalized.enum = [...normalized.enum, null];
	}
	return changed || nullable ? normalized : schema;
}
function normalizeToolParameterSchemaUncached(schema, options) {
	const inlinedSchema = normalizeOpenApiSchemaKeywords(inlineLocalToolSchemaRefs(schema));
	const schemaRecord = inlinedSchema && typeof inlinedSchema === "object" ? inlinedSchema : void 0;
	if (!schemaRecord) return inlinedSchema;
	const normalizedProvider = normalizeLowercaseStringOrEmpty(options?.modelProvider);
	const normalizedModelId = normalizeLowercaseStringOrEmpty(options?.modelId);
	const normalizedToolSchemaProfile = normalizeLowercaseStringOrEmpty(options?.modelCompat?.toolSchemaProfile);
	const isGeminiProvider = normalizedProvider.includes("google") || normalizedProvider.includes("gemini") || isGeminiModelId(normalizedModelId) || normalizedToolSchemaProfile === "gemini";
	const isAnthropicProvider = normalizedProvider.includes("anthropic");
	const unsupportedToolSchemaKeywords = resolveUnsupportedToolSchemaKeywords(options?.modelCompat);
	const omitEmptyArrayItems = shouldOmitEmptyArrayItems(options?.modelCompat);
	const isLlamacppGbnfProfile = normalizedToolSchemaProfile === "llamacpp";
	function applyProviderCleaning(s) {
		const normalizedSchema = normalizeArraySchemasMissingItems(s);
		let arrayItemsCompatibleSchema = omitEmptyArrayItems ? stripEmptyArrayItemsFromArraySchemas(normalizedSchema) : normalizedSchema;
		if (isLlamacppGbnfProfile) arrayItemsCompatibleSchema = cleanSchemaForLlamacppGbnf(arrayItemsCompatibleSchema);
		if (isGeminiProvider && !isAnthropicProvider) {
			const geminiCompatibleSchema = cleanSchemaForGemini(arrayItemsCompatibleSchema);
			return unsupportedToolSchemaKeywords.size > 0 ? stripUnsupportedSchemaKeywords(geminiCompatibleSchema, unsupportedToolSchemaKeywords) : geminiCompatibleSchema;
		}
		if (unsupportedToolSchemaKeywords.size > 0) return stripUnsupportedSchemaKeywords(arrayItemsCompatibleSchema, unsupportedToolSchemaKeywords);
		return arrayItemsCompatibleSchema;
	}
	const conditionalKey = getTopLevelConditionalKey(schemaRecord);
	const flattenableVariantKey = getFlattenableVariantKey(schemaRecord);
	if (hasTopLevelObjectSchema(schemaRecord, conditionalKey)) return applyProviderCleaning(schemaRecord);
	if (isObjectLikeSchemaMissingType(schemaRecord, conditionalKey)) return applyProviderCleaning({
		...schemaRecord,
		type: "object",
		properties: isRecord(schemaRecord.properties) ? schemaRecord.properties : {}
	});
	if (isTypedObjectSchemaMissingValidProperties(schemaRecord, conditionalKey)) return applyProviderCleaning({
		...schemaRecord,
		properties: {}
	});
	if (!flattenableVariantKey) {
		if (isTrulyEmptySchema(schemaRecord)) return applyProviderCleaning({
			type: "object",
			properties: {}
		});
		if (conditionalKey === "allOf") return applyProviderCleaning(inlinedSchema);
		return applyProviderCleaning(inlinedSchema);
	}
	const variants = schemaRecord[flattenableVariantKey];
	const mergedProperties = {};
	const requiredCounts = /* @__PURE__ */ new Map();
	let objectVariants = 0;
	for (const entry of variants) {
		if (!entry || typeof entry !== "object") continue;
		const props = entry.properties;
		if (!props || typeof props !== "object") continue;
		objectVariants += 1;
		for (const [key, value] of Object.entries(props)) {
			if (!(key in mergedProperties)) {
				mergedProperties[key] = value;
				continue;
			}
			mergedProperties[key] = mergePropertySchemas(mergedProperties[key], value);
		}
		const required = Array.isArray(entry.required) ? entry.required : [];
		for (const key of required) {
			if (typeof key !== "string") continue;
			requiredCounts.set(key, (requiredCounts.get(key) ?? 0) + 1);
		}
	}
	const baseRequired = Array.isArray(schemaRecord.required) ? schemaRecord.required.filter((key) => typeof key === "string") : void 0;
	const mergedRequired = baseRequired && baseRequired.length > 0 ? baseRequired : objectVariants > 0 ? Array.from(requiredCounts.entries()).filter(([, count]) => count === objectVariants).map(([key]) => key) : void 0;
	const nextSchema = { ...schemaRecord };
	return applyProviderCleaning({
		type: "object",
		...typeof nextSchema.title === "string" ? { title: nextSchema.title } : {},
		...typeof nextSchema.description === "string" ? { description: nextSchema.description } : {},
		properties: Object.keys(mergedProperties).length > 0 ? mergedProperties : schemaRecord.properties ?? {},
		...mergedRequired && mergedRequired.length > 0 ? { required: mergedRequired } : {},
		additionalProperties: "additionalProperties" in schemaRecord ? schemaRecord.additionalProperties : true
	});
}
/** Return a provider-compatible JSON schema for a model-facing tool. */
function normalizeToolParameterSchema(schema, options) {
	if (!schema || typeof schema !== "object") return normalizeToolParameterSchemaUncached(schema, options);
	const cacheKey = resolveToolParameterSchemaCacheKey(options);
	const cached = getCachedToolParameterSchema(schema, cacheKey);
	if (cached) return cached;
	return rememberCachedToolParameterSchema(schema, cacheKey, normalizeToolParameterSchemaUncached(schema, options));
}
//#endregion
//#region packages/ai/src/providers/openai-tool-schema-compat.ts
const OPENAI_STRICT_COMPAT_SCHEMA_MAP_KEYS = /* @__PURE__ */ new Set([
	"$defs",
	"definitions",
	"dependentSchemas",
	"dependencies",
	"patternProperties",
	"properties"
]);
const OPENAI_NULLABLE_ANNOTATION_KEYS = /* @__PURE__ */ new Set([
	"default",
	"description",
	"examples",
	"format",
	"title"
]);
const OPENAI_STRICT_COMPAT_SCHEMA_NESTED_KEYS = /* @__PURE__ */ new Set([
	"additionalItems",
	"additionalProperties",
	"allOf",
	"anyOf",
	"contains",
	"contentSchema",
	"else",
	"if",
	"items",
	"not",
	"oneOf",
	"prefixItems",
	"propertyNames",
	"then",
	"unevaluatedItems",
	"unevaluatedProperties"
]);
function normalizeOpenAIStrictCompatSchemaMap(schema) {
	if (!schema || typeof schema !== "object" || Array.isArray(schema)) return schema;
	let changed = false;
	const normalized = {};
	for (const [key, value] of Object.entries(schema)) {
		const next = normalizeOpenAIStrictCompatSchemaRecursive(value, { promoteEmptyObject: false });
		normalized[key] = next;
		changed ||= next !== value;
	}
	return changed ? normalized : schema;
}
function normalizeOpenAIStrictCompatSchemaRecursive(schema, options) {
	if (Array.isArray(schema)) {
		let changed = false;
		const normalized = schema.map((entry) => {
			const next = normalizeOpenAIStrictCompatSchemaRecursive(entry, { promoteEmptyObject: false });
			changed ||= next !== entry;
			return next;
		});
		return changed ? normalized : schema;
	}
	if (!schema || typeof schema !== "object") return schema;
	const record = schema;
	let changed = false;
	let hadNullType = false;
	const normalized = {};
	for (const [key, value] of Object.entries(record)) {
		if (value === null && OPENAI_NULLABLE_ANNOTATION_KEYS.has(key)) {
			changed = true;
			continue;
		}
		if (value === null && key === "type") {
			hadNullType = true;
			changed = true;
			continue;
		}
		const next = OPENAI_STRICT_COMPAT_SCHEMA_MAP_KEYS.has(key) ? normalizeOpenAIStrictCompatSchemaMap(value) : OPENAI_STRICT_COMPAT_SCHEMA_NESTED_KEYS.has(key) ? normalizeOpenAIStrictCompatSchemaRecursive(value, { promoteEmptyObject: false }) : value;
		normalized[key] = next;
		changed ||= next !== value;
	}
	if (Object.keys(normalized).length === 0) {
		if (!options.promoteEmptyObject) return schema;
		return {
			type: "object",
			properties: {},
			required: [],
			additionalProperties: false
		};
	}
	const hasObjectShapeHints = normalized.properties && typeof normalized.properties === "object" && !Array.isArray(normalized.properties) || Array.isArray(normalized.required);
	const hasArrayShapeHints = "items" in normalized;
	if (!("type" in normalized) && hasObjectShapeHints !== hasArrayShapeHints) {
		normalized.type = hasObjectShapeHints ? "object" : "array";
		changed = true;
	} else if (hadNullType && !("type" in normalized)) normalized.type = null;
	if (normalized.type === "object" && !("properties" in normalized)) {
		normalized.properties = {};
		changed = true;
	}
	const hasEmptyProperties = normalized.properties && typeof normalized.properties === "object" && !Array.isArray(normalized.properties) && Object.keys(normalized.properties).length === 0;
	if (normalized.type === "object" && !Array.isArray(normalized.required) && hasEmptyProperties) {
		normalized.required = [];
		changed = true;
	}
	if (normalized.type === "object" && hasEmptyProperties && !("additionalProperties" in normalized)) {
		normalized.additionalProperties = false;
		changed = true;
	}
	return changed ? normalized : schema;
}
/** Repairs recoverable OpenAI tool-schema shapes before canonical normalization. */
function normalizeOpenAIStrictCompatSchema(schema) {
	return normalizeOpenAIStrictCompatSchemaRecursive(schema, { promoteEmptyObject: true });
}
/** Finds schema paths that violate OpenAI strict tool-schema requirements. */
function findOpenAIStrictSchemaViolations(schema, path, options) {
	if (Array.isArray(schema)) {
		if (options?.requireObjectRoot) return [`${path}.type`];
		return schema.flatMap((item, index) => findOpenAIStrictSchemaViolations(item, `${path}[${index}]`));
	}
	if (!schema || typeof schema !== "object") return options?.requireObjectRoot ? [`${path}.type`] : [];
	const record = schema;
	const violations = [];
	for (const key of [
		"anyOf",
		"oneOf",
		"allOf"
	]) if (key in record) violations.push(`${path}.${key}`);
	if (Array.isArray(record.type)) violations.push(`${path}.type`);
	const properties = record.properties && typeof record.properties === "object" && !Array.isArray(record.properties) ? record.properties : void 0;
	if (record.type === "object") {
		if (record.additionalProperties !== false) violations.push(`${path}.additionalProperties`);
		const required = Array.isArray(record.required) ? record.required.filter((entry) => typeof entry === "string") : void 0;
		if (!required) violations.push(`${path}.required`);
		else if (properties) {
			const requiredSet = new Set(required);
			for (const key of Object.keys(properties)) if (!requiredSet.has(key)) violations.push(`${path}.required.${key}`);
		}
	}
	for (const key of OPENAI_STRICT_COMPAT_SCHEMA_MAP_KEYS) {
		const schemaMap = record[key];
		if (!schemaMap || typeof schemaMap !== "object" || Array.isArray(schemaMap)) continue;
		for (const [entryKey, value] of Object.entries(schemaMap)) violations.push(...findOpenAIStrictSchemaViolations(value, `${path}.${key}.${entryKey}`));
	}
	for (const key of OPENAI_STRICT_COMPAT_SCHEMA_NESTED_KEYS) {
		const value = record[key];
		if (value && typeof value === "object") violations.push(...findOpenAIStrictSchemaViolations(value, `${path}.${key}`));
	}
	return violations;
}
//#endregion
//#region packages/ai/src/providers/openai-tool-schema.ts
/**
* OpenAI strict JSON-schema normalization for tool inventories and request payloads.
*
* Caches normalized object inputs by provider compatibility so repeated inventory builds preserve identity.
*/
const MAX_STRICT_SCHEMA_CACHE_ENTRIES_PER_SCHEMA = 8;
let strictOpenAISchemaCache = /* @__PURE__ */ new WeakMap();
function resolveToolSchemaModelCompat(compat) {
	if (!compat) return;
	const unsupportedToolSchemaKeywords = Array.isArray(compat.unsupportedToolSchemaKeywords) ? compat.unsupportedToolSchemaKeywords.filter((keyword) => typeof keyword === "string") : [];
	if (unsupportedToolSchemaKeywords.length === 0 && compat.omitEmptyArrayItems !== true) return;
	return {
		...unsupportedToolSchemaKeywords.length > 0 ? { unsupportedToolSchemaKeywords } : {},
		...compat.omitEmptyArrayItems === true ? { omitEmptyArrayItems: true } : {}
	};
}
function resolveStrictOpenAISchemaCacheKey(modelCompat) {
	const compat = resolveToolSchemaModelCompat(modelCompat);
	return JSON.stringify([[...compat?.unsupportedToolSchemaKeywords ?? []].toSorted(), shouldOmitEmptyArrayItems(compat)]);
}
function readCachedStrictOpenAISchema(schema, key) {
	return strictOpenAISchemaCache.get(schema)?.find((entry) => entry.key === key)?.value;
}
function rememberStrictOpenAISchema(schema, key, value) {
	const entries = strictOpenAISchemaCache.get(schema) ?? [];
	strictOpenAISchemaCache.set(schema, [{
		key,
		value
	}, ...entries.filter((entry) => entry.key !== key)].slice(0, MAX_STRICT_SCHEMA_CACHE_ENTRIES_PER_SCHEMA));
	return value;
}
function clearOpenAIToolSchemaCacheForTest() {
	strictOpenAISchemaCache = /* @__PURE__ */ new WeakMap();
}
/** Normalizes a tool parameter schema into the OpenAI strict JSON-schema subset. */
function normalizeStrictOpenAIJsonSchema(schema, modelCompat) {
	const schemaInput = schema ?? {};
	if (!schemaInput || typeof schemaInput !== "object") return normalizeStrictOpenAIJsonSchemaRecursive(normalizeToolParameterSchema(schemaInput, { modelCompat: resolveToolSchemaModelCompat(modelCompat) }), 0);
	const cacheKey = resolveStrictOpenAISchemaCacheKey(modelCompat);
	const cached = readCachedStrictOpenAISchema(schemaInput, cacheKey);
	if (cached !== void 0) return cached;
	return rememberStrictOpenAISchema(schemaInput, cacheKey, normalizeStrictOpenAIJsonSchemaRecursive(normalizeToolParameterSchema(schemaInput, { modelCompat: resolveToolSchemaModelCompat(modelCompat) }), 0));
}
function normalizeStrictOpenAIJsonSchemaRecursive(schema, depth) {
	if (Array.isArray(schema)) {
		let changed = false;
		const normalized = schema.map((entry) => {
			const next = normalizeStrictOpenAIJsonSchemaRecursive(entry, depth);
			changed ||= next !== entry;
			return next;
		});
		return changed ? normalized : schema;
	}
	if (!schema || typeof schema !== "object") return schema;
	const record = schema;
	let changed = false;
	const normalized = {};
	for (const [key, value] of Object.entries(record)) {
		const next = normalizeStrictOpenAIJsonSchemaRecursive(value, key === "properties" ? depth : depth + 1);
		normalized[key] = next;
		changed ||= next !== value;
	}
	if (normalized.type === "object") {
		const properties = normalized.properties && typeof normalized.properties === "object" && !Array.isArray(normalized.properties) ? normalized.properties : void 0;
		if (properties && Object.keys(properties).length === 0 && !Array.isArray(normalized.required)) {
			normalized.required = [];
			changed = true;
		}
		if (depth === 0 && !("additionalProperties" in normalized)) {
			normalized.additionalProperties = false;
			changed = true;
		}
	}
	return changed ? normalized : schema;
}
/** Normalizes tool parameters using strict OpenAI rules only when strict mode is active. */
function normalizeOpenAIStrictToolParameters(schema, strict, modelCompat) {
	const toolSchemaCompat = resolveToolSchemaModelCompat(modelCompat);
	if (!strict) return normalizeToolParameterSchema(schema ?? {}, { modelCompat: toolSchemaCompat });
	return normalizeStrictOpenAIJsonSchema(schema, toolSchemaCompat);
}
/** Returns whether a schema already satisfies OpenAI strict tool-schema constraints. */
function isStrictOpenAIJsonSchemaCompatible(schema) {
	return isStrictOpenAIJsonSchemaCompatibleRecursive(normalizeStrictOpenAIJsonSchema(schema));
}
/** Returns strict-schema diagnostics for an already materialized OpenAI tool projection. */
function findOpenAIStrictToolProjectionDiagnostics(projection) {
	return [...projection.diagnostics.map((diagnostic) => ({
		toolIndex: diagnostic.toolIndex,
		...diagnostic.toolName ? { toolName: diagnostic.toolName } : {},
		violations: [...diagnostic.violations]
	})), ...projection.tools.flatMap((tool) => {
		const violations = findOpenAIStrictSchemaViolations(normalizeStrictOpenAIJsonSchema(tool.parameters), `${tool.name}.parameters`);
		return violations.length > 0 ? [{
			toolIndex: tool.toolIndex,
			toolName: tool.name,
			violations
		}] : [];
	})];
}
function isStrictOpenAIJsonSchemaCompatibleRecursive(schema) {
	if (Array.isArray(schema)) return schema.every((entry) => isStrictOpenAIJsonSchemaCompatibleRecursive(entry));
	if (!schema || typeof schema !== "object") return true;
	const record = schema;
	if ("anyOf" in record || "oneOf" in record || "allOf" in record) return false;
	if (Array.isArray(record.type)) return false;
	if (record.type === "object" && record.additionalProperties !== false) return false;
	if (record.type === "object") {
		const properties = record.properties && typeof record.properties === "object" && !Array.isArray(record.properties) ? record.properties : {};
		const required = Array.isArray(record.required) ? record.required.filter((entry) => typeof entry === "string") : void 0;
		if (!required) return false;
		const requiredSet = new Set(required);
		if (Object.keys(properties).some((key) => !requiredSet.has(key))) return false;
	}
	return Object.entries(record).every(([key, entry]) => {
		if (key === "properties" && entry && typeof entry === "object" && !Array.isArray(entry)) return Object.values(entry).every((value) => isStrictOpenAIJsonSchemaCompatibleRecursive(value));
		return isStrictOpenAIJsonSchemaCompatibleRecursive(entry);
	});
}
/** Resolves strict mode for the projected tools that will be emitted in the request payload. */
function resolveOpenAIProjectedToolsStrictToolFlag(projection, strict) {
	if (strict !== true) return strict === false ? false : void 0;
	return projection.tools.every((tool) => isStrictOpenAIJsonSchemaCompatible(tool.parameters));
}
//#endregion
//#region packages/ai/src/transports/openai-responses-replay.ts
/** Resolves the assistant message id that can be replayed to OpenAI Responses. */
function resolveReplayableResponsesMessageId(params) {
	if (!params.replayResponsesItemIds) return;
	if (!params.textSignatureId) return params.fallbackOrdinal === 0 ? params.fallbackId : `${params.fallbackId}_${params.fallbackOrdinal}`;
	return params.previousReplayItemWasReasoning ? params.textSignatureId : void 0;
}
const OPENAI_CODEX_RESPONSES_DEFAULT_INSTRUCTIONS = "Follow the user request.";
const AZURE_RESPONSES_FIRST_EVENT_TIMEOUT_MS = 3e4;
const RESPONSE_FAILED_NO_DETAILS_MESSAGE = "Unknown error (no error details in response)";
const OPENAI_RESPONSES_REASONING_REPLAY_META_KEY = "__openclaw_replay";
const OPENAI_RESPONSES_REASONING_REPLAY_BLOCK_META_KEY = "openclawReasoningReplay";
//#endregion
//#region packages/ai/src/transports/openai-responses-debug.ts
function stringifyUnknown(value, fallback = "") {
	if (typeof value === "string") return value;
	if (typeof value === "number" || typeof value === "boolean") return String(value);
	return fallback;
}
function getServiceTierCostMultiplier(serviceTier) {
	switch (serviceTier) {
		case "flex": return .5;
		case "priority": return 2;
		default: return 1;
	}
}
function applyServiceTierPricing(usage, serviceTier) {
	const multiplier = getServiceTierCostMultiplier(serviceTier);
	if (multiplier === 1) return;
	usage.cost.input *= multiplier;
	usage.cost.output *= multiplier;
	usage.cost.cacheRead *= multiplier;
	usage.cost.cacheWrite *= multiplier;
	usage.cost.total = usage.cost.input + usage.cost.output + usage.cost.cacheRead + usage.cost.cacheWrite;
}
function safeDebugValue(value) {
	if (typeof value === "string") return value;
	if (typeof value === "number" || typeof value === "boolean") return String(value);
	if (value === null) return "null";
	if (value === void 0) return "undefined";
	return Array.isArray(value) ? "array" : typeof value;
}
function responseInputTextChars(input) {
	if (typeof input === "string") return input.length;
	if (Array.isArray(input)) return input.reduce((total, item) => total + responseInputTextChars(item), 0);
	if (!input || typeof input !== "object") return 0;
	const record = input;
	let total = 0;
	if (typeof record.text === "string") total += record.text.length;
	if (typeof record.content === "string") total += record.content.length;
	else if (Array.isArray(record.content)) total += responseInputTextChars(record.content);
	return total;
}
function responseInputRoles(input) {
	if (!Array.isArray(input)) return "";
	const roles = /* @__PURE__ */ new Set();
	for (const item of input) if (item && typeof item === "object") {
		const role = item.role;
		if (typeof role === "string" && role.trim()) roles.add(role.trim());
	}
	return [...roles].toSorted().join(",");
}
function readToolPayloadField(record, field) {
	try {
		return record[field];
	} catch {
		return;
	}
}
function readResponsesToolDisplayName(tool) {
	if (!tool || typeof tool !== "object") return "";
	const record = tool;
	const name = readToolPayloadField(record, "name");
	if (typeof name === "string") return name;
	const fn = readToolPayloadField(record, "function");
	if (fn && typeof fn === "object") {
		const fnName = readToolPayloadField(fn, "name");
		if (typeof fnName === "string") return fnName;
	}
	const type = readToolPayloadField(record, "type");
	return typeof type === "string" && type !== "function" ? type : "";
}
function summarizeResponsesTools(tools) {
	if (!Array.isArray(tools)) return "count=0";
	const names = tools.map(readResponsesToolDisplayName).filter(Boolean);
	const mode = resolveModelPayloadDebugMode();
	const maxNames = mode === "tools" || mode === "full-redacted" ? names.length : 12;
	const label = maxNames >= names.length ? "names" : "sample";
	const shown = names.slice(0, maxNames).join(",");
	return `count=${tools.length}${shown ? ` ${label}=${shown}` : ""}`;
}
function stringifyRedactedPayload(value) {
	try {
		const encoded = JSON.stringify(value);
		if (!encoded) return "<empty>";
		const redacted = redactSensitiveText(encoded, { mode: "tools" });
		return redacted.length > 8e3 ? `${truncateUtf16Safe(redacted, 8e3)}…<truncated>` : redacted;
	} catch {
		return "<unserializable>";
	}
}
function stringifyRedactedEvent(value) {
	const redacted = stringifyRedactedPayload(value);
	return redacted.length > 2e3 ? `${truncateUtf16Safe(redacted, 2e3)}…<truncated>` : redacted;
}
const RESPONSE_FAILED_FAILURE_FIELD_KEYS = [
	"error",
	"incomplete_details",
	"status_details",
	"failure_reason",
	"last_error",
	"provider_error",
	"error_details"
];
function readResponseFailedString(record, key) {
	return stringifyUnknown(record?.[key]);
}
function buildResponsesFailedEventSummary(message, responseId, observation) {
	const summary = { message };
	if (responseId) summary.responseId = responseId;
	if (observation) summary.observation = observation;
	return summary;
}
function isResponseFailedIdentifierKey(key) {
	const normalized = key.replace(/[-_\s]/g, "").toLowerCase();
	return normalized === "requestid" || normalized === "xrequestid" || normalized === "providerrequestid" || normalized === "providerresponseid" || normalized === "litellmrequestid" || normalized.includes("request") && normalized.endsWith("id") || normalized.includes("provider") && normalized.endsWith("id");
}
function collectResponseFailedIdentifierHashes(value, opts = {}) {
	const path = opts.path ?? "";
	const depth = opts.depth ?? 0;
	const identifierKey = opts.identifierKey ?? "";
	const out = opts.out ?? [];
	const seen = opts.seen ?? /* @__PURE__ */ new WeakSet();
	if (out.length >= 12 || depth > 4 || !value || typeof value !== "object") return out;
	if (seen.has(value)) return out;
	seen.add(value);
	if (Array.isArray(value)) {
		for (const [index, item] of value.entries()) {
			if (index >= 8 || out.length >= 12) break;
			const itemString = typeof item === "string" || typeof item === "number" ? String(item).trim() : "";
			if (identifierKey && isResponseFailedIdentifierKey(identifierKey) && itemString) {
				out.push(`${path}[${index}]=${redactIdentifier(itemString, { len: 12 })}`);
				continue;
			}
			collectResponseFailedIdentifierHashes(item, {
				path: `${path}[${index}]`,
				depth: depth + 1,
				identifierKey,
				out,
				seen
			});
		}
		return out;
	}
	for (const [key, child] of Object.entries(value)) {
		if (out.length >= 12) break;
		const childPath = path ? `${path}.${key}` : key;
		const childString = typeof child === "string" || typeof child === "number" ? String(child).trim() : "";
		if (isResponseFailedIdentifierKey(key) && childString) {
			out.push(`${childPath}=${redactIdentifier(childString, { len: 12 })}`);
			continue;
		}
		collectResponseFailedIdentifierHashes(child, {
			path: childPath,
			depth: depth + 1,
			identifierKey: isResponseFailedIdentifierKey(key) ? key : void 0,
			out,
			seen
		});
	}
	return out;
}
function redactResponseFailedDiagnosticValue(value, opts = {}) {
	const key = opts.key ?? "";
	const depth = opts.depth ?? 0;
	if (typeof value === "string" || typeof value === "number") return key && isResponseFailedIdentifierKey(key) ? redactIdentifier(String(value), { len: 12 }) : value;
	if (depth > 6 || !value || typeof value !== "object") return value;
	const seen = opts.seen ?? /* @__PURE__ */ new WeakSet();
	if (seen.has(value)) return "<circular>";
	seen.add(value);
	if (Array.isArray(value)) return value.slice(0, 16).map((item) => redactResponseFailedDiagnosticValue(item, {
		key,
		depth: depth + 1,
		seen
	}));
	const out = {};
	for (const [childKey, child] of Object.entries(value)) out[childKey] = redactResponseFailedDiagnosticValue(child, {
		key: childKey,
		depth: depth + 1,
		seen
	});
	return out;
}
function buildResponsesFailedFailureFields(response) {
	if (!response) return {};
	const fields = {};
	for (const key of RESPONSE_FAILED_FAILURE_FIELD_KEYS) if (response[key] !== void 0 && response[key] !== null) fields[key] = response[key];
	return fields;
}
function buildResponsesFailedNoDetailsObservation(event, model, response = isRecord(event.response) ? event.response : void 0) {
	const failureFields = redactResponseFailedDiagnosticValue(buildResponsesFailedFailureFields(response));
	const metadataKeys = isRecord(response?.metadata) ? Object.keys(response.metadata).toSorted() : [];
	const responsePreview = {
		id: readResponseFailedString(response, "id"),
		status: readResponseFailedString(response, "status"),
		model: readResponseFailedString(response, "model"),
		object: readResponseFailedString(response, "object"),
		failureFields,
		metadataKeys
	};
	return {
		event: "openai_responses_response_failed_without_details",
		provider: model.provider,
		api: model.api,
		transportModel: model.id,
		providerRuntimeFailureKind: "no_error_details",
		responseId: responsePreview.id,
		responseStatus: responsePreview.status,
		responseModel: responsePreview.model,
		responseObject: responsePreview.object,
		metadataKeys,
		requestIdHashes: collectResponseFailedIdentifierHashes(event),
		failureFieldsPreview: stringifyRedactedEvent(failureFields),
		responsePreview: stringifyRedactedEvent(responsePreview)
	};
}
function summarizeResponsesFailedNoDetailsObservation(observation) {
	const requestIds = observation.requestIdHashes.join(",");
	const metadataKeys = observation.metadataKeys.join(",");
	return `responseId=${safeDebugValue(observation.responseId || void 0)} responseStatus=${safeDebugValue(observation.responseStatus || void 0)} responseModel=${safeDebugValue(observation.responseModel || void 0)} requestIds=${requestIds || "none"} metadataKeys=${metadataKeys || "none"} failureFields=${observation.failureFieldsPreview}`;
}
function normalizeResponsesFailedEvent(event, model) {
	const response = isRecord(event.response) ? event.response : void 0;
	const responseId = readResponseFailedString(response, "id") || void 0;
	const error = isRecord(response?.error) ? response.error : void 0;
	if (error) {
		const code = readResponseFailedString(error, "code").trim();
		const message = readResponseFailedString(error, "message").trim();
		if (code || message) return buildResponsesFailedEventSummary(`${code || "unknown"}: ${message || "no message"}`, responseId);
	}
	const incompleteReason = readResponseFailedString(isRecord(response?.incomplete_details) ? response.incomplete_details : void 0, "reason");
	if (incompleteReason) return buildResponsesFailedEventSummary(`incomplete: ${incompleteReason}`, responseId);
	return buildResponsesFailedEventSummary(RESPONSE_FAILED_NO_DETAILS_MESSAGE, responseId, buildResponsesFailedNoDetailsObservation(event, model, response));
}
function logResponsesFailedNoDetails(observation) {
	log.warn(`[responses] response.failed missing error details provider=${observation.provider} api=${observation.api} model=${observation.transportModel} ` + summarizeResponsesFailedNoDetailsObservation(observation), observation);
}
function summarizeResponsesPayload(params) {
	if (!params || typeof params !== "object") return "payload=non-object";
	const record = params;
	const input = record.input;
	const reasoning = record.reasoning && typeof record.reasoning === "object" ? record.reasoning : void 0;
	const text = record.text && typeof record.text === "object" ? record.text : void 0;
	const parts = [
		`fields=${Object.keys(record).toSorted().join(",")}`,
		`model=${safeDebugValue(record.model)}`,
		`stream=${safeDebugValue(record.stream)}`,
		`inputItems=${Array.isArray(input) ? input.length : typeof input}`,
		`inputRoles=${responseInputRoles(input) || "none"}`,
		`inputTextChars=${responseInputTextChars(input)}`,
		`tools=${summarizeResponsesTools(record.tools)}`,
		`reasoningEffort=${safeDebugValue(reasoning?.effort)}`,
		`reasoningSummary=${safeDebugValue(reasoning?.summary)}`,
		`textVerbosity=${safeDebugValue(text?.verbosity)}`,
		`serviceTier=${safeDebugValue(record.service_tier)}`,
		`store=${safeDebugValue(record.store)}`,
		`promptCacheKey=${record.prompt_cache_key === void 0 ? "absent" : "present"}`,
		`metadataKeys=${record.metadata && typeof record.metadata === "object" ? Object.keys(record.metadata).toSorted().join(",") : "none"}`
	];
	if (resolveModelPayloadDebugMode() === "full-redacted") parts.push(`payload=${stringifyRedactedPayload(record)}`);
	return parts.join(" ");
}
function summarizeOpenAITransportError(error) {
	if (!error || typeof error !== "object") return `type=${typeof error} message=${safeDebugValue(error)}`;
	const record = error;
	const cause = record.cause && typeof record.cause === "object" ? record.cause : void 0;
	return [
		`name=${safeDebugValue(record.name)}`,
		`status=${safeDebugValue(record.status)}`,
		`code=${safeDebugValue(record.code)}`,
		`type=${safeDebugValue(record.type)}`,
		`causeName=${safeDebugValue(cause?.name)}`,
		`causeCode=${safeDebugValue(cause?.code)}`,
		`message=${error instanceof Error ? error.message : safeDebugValue(error)}`
	].join(" ");
}
//#endregion
//#region packages/ai/src/transports/openai-responses-replay-internal.ts
function isInvalidEncryptedContentError(error) {
	if (!error || typeof error !== "object") return false;
	const record = error;
	if (record.code === "invalid_encrypted_content" || record.code === "thinking_signature_invalid") return true;
	const message = typeof record.message === "string" ? record.message : "";
	return message.includes("invalid_encrypted_content") || message.includes("thinking_signature_invalid") || record.status === 400 && message.toLowerCase().includes("could not decrypt the provided encrypted_content");
}
function stripEncryptedContentFields(value) {
	if (!value || typeof value !== "object") return {
		value,
		changed: false
	};
	if (Array.isArray(value)) {
		let changed = false;
		const next = value.map((item) => {
			const stripped = stripEncryptedContentFields(item);
			changed ||= stripped.changed;
			return stripped.value;
		});
		return changed ? {
			value: next,
			changed: true
		} : {
			value,
			changed: false
		};
	}
	let changed = false;
	const next = {};
	for (const [key, child] of Object.entries(value)) {
		if (key === "encrypted_content") {
			changed = true;
			continue;
		}
		const stripped = stripEncryptedContentFields(child);
		changed ||= stripped.changed;
		next[key] = stripped.value;
	}
	return changed ? {
		value: next,
		changed: true
	} : {
		value,
		changed: false
	};
}
function stripResponsesRequestEncryptedContent(params) {
	const stripped = stripEncryptedContentFields(params.input);
	if (!stripped.changed) return params;
	return {
		...params,
		input: stripped.value
	};
}
function hashOptionalReplayContextValue(value) {
	const normalized = value?.trim();
	return normalized ? shortHash(normalized) : void 0;
}
function buildOpenAIResponsesReplayContext(model, options) {
	return {
		provider: model.provider,
		api: model.api,
		model: model.id,
		baseUrlHash: hashOptionalReplayContextValue(model.baseUrl),
		sessionHash: hashOptionalReplayContextValue(options?.sessionId),
		authProfileHash: hashOptionalReplayContextValue(options?.authProfileId)
	};
}
function buildOpenAIResponsesReasoningReplayMetadata(model, options) {
	return {
		v: 1,
		source: "openai-responses",
		...buildOpenAIResponsesReplayContext(model, options)
	};
}
function tagOpenAIResponsesReasoningReplayItem(item, model, options) {
	if (!("encrypted_content" in item)) return item;
	return {
		...item,
		[OPENAI_RESPONSES_REASONING_REPLAY_META_KEY]: buildOpenAIResponsesReasoningReplayMetadata(model, options)
	};
}
function isOpenAIResponsesReasoningReplayMetadata(value) {
	if (!value || typeof value !== "object") return false;
	const record = value;
	return record.v === 1 && record.source === "openai-responses" && typeof record.provider === "string" && typeof record.api === "string" && typeof record.model === "string" && (record.baseUrlHash === void 0 || typeof record.baseUrlHash === "string") && (record.sessionHash === void 0 || typeof record.sessionHash === "string") && (record.authProfileHash === void 0 || typeof record.authProfileHash === "string");
}
function encryptedReasoningReplayMetadataMatches(metadata, context) {
	if (!metadata) return false;
	return metadata.provider === context.provider && metadata.api === context.api && metadata.model === context.model && metadata.baseUrlHash === context.baseUrlHash && metadata.sessionHash === context.sessionHash && metadata.authProfileHash === context.authProfileHash;
}
function readOpenAIResponsesReasoningReplayBlockMetadata(block) {
	const value = block[OPENAI_RESPONSES_REASONING_REPLAY_BLOCK_META_KEY];
	return isOpenAIResponsesReasoningReplayMetadata(value) ? value : void 0;
}
function normalizeOpenAIResponsesReasoningReplayItem(item) {
	const record = item;
	if (record.type !== "reasoning" || Array.isArray(record.summary)) return item;
	return {
		...record,
		summary: []
	};
}
function prepareOpenAIResponsesReasoningItemForReplay(item, context, blockMetadata) {
	const { [OPENAI_RESPONSES_REASONING_REPLAY_META_KEY]: rawMetadata, ...rest } = item;
	if (!("encrypted_content" in rest)) return normalizeOpenAIResponsesReasoningReplayItem(rest);
	if (encryptedReasoningReplayMetadataMatches(blockMetadata ?? (isOpenAIResponsesReasoningReplayMetadata(rawMetadata) ? rawMetadata : void 0), context)) return normalizeOpenAIResponsesReasoningReplayItem(rest);
	return normalizeOpenAIResponsesReasoningReplayItem(stripEncryptedContentFields(rest).value);
}
async function createResponsesStreamWithEncryptedContentRetry(params) {
	try {
		const { data, response } = await params.client.responses.create(params.request, params.requestOptions).withResponse();
		return {
			stream: data,
			response
		};
	} catch (error) {
		const retryRequest = stripResponsesRequestEncryptedContent(params.request);
		if (!isInvalidEncryptedContentError(error) || retryRequest === params.request) throw error;
		log.warn(`[responses] retrying without encrypted reasoning content provider=${params.model.provider} api=${params.model.api} model=${params.model.id}`);
		const { data, response } = await params.client.responses.create(retryRequest, params.requestOptions).withResponse();
		return {
			stream: data,
			response
		};
	}
}
function resolveAzureOpenAIApiVersion(env = process.env) {
	return env.AZURE_OPENAI_API_VERSION?.trim() || "preview";
}
function normalizeResponsesReplayItemId(id, prefix) {
	if (!id) return;
	if (id.length <= 64) return id;
	return `${prefix}_${shortHash(id)}`;
}
function isSafeResponsesReplayItemId(id) {
	return typeof id === "string" && id.length > 0 && id.length <= 64;
}
function encodeTextSignatureV1(id, phase) {
	return JSON.stringify({
		v: 1,
		id,
		...phase ? { phase } : {}
	});
}
function parseTextSignature(signature) {
	if (!signature) return;
	if (signature.startsWith("{")) try {
		const parsed = JSON.parse(signature);
		if (parsed.v === 1) {
			const id = typeof parsed.id === "string" ? parsed.id : void 0;
			const phase = parsed.phase === "commentary" || parsed.phase === "final_answer" ? parsed.phase : void 0;
			if (id !== void 0 || phase !== void 0) return {
				id,
				phase
			};
			return;
		}
	} catch {}
	return { id: signature };
}
function buildResponsesInputMessage(role, content) {
	return {
		type: "message",
		role,
		content
	};
}
function convertResponsesMessages(model, context, allowedToolCallProviders, options) {
	const messages = [];
	const shouldReplayReasoningItems = options?.replayReasoningItems ?? true;
	const shouldReplayResponsesItemIds = options?.replayResponsesItemIds ?? true;
	const replayContext = buildOpenAIResponsesReplayContext(model, {
		sessionId: options?.sessionId,
		authProfileId: options?.authProfileId
	});
	const shouldNormalizeSameModelToolCallIds = model.provider === "github-copilot";
	const sanitizeIdPart = (part) => part.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+$/, "");
	const normalizeIdPart = (part) => {
		const sanitized = sanitizeIdPart(part);
		return (sanitized.length > 64 ? sanitized.slice(0, 64) : sanitized).replace(/_+$/, "");
	};
	const buildForeignResponsesItemId = (itemId) => {
		const normalized = `fc_${shortHash(itemId)}`;
		return normalized.length > 64 ? normalized.slice(0, 64) : normalized;
	};
	const buildSameProviderCopilotResponsesItemId = (itemId) => {
		const sanitized = sanitizeIdPart(itemId);
		const candidate = sanitized.startsWith("fc_") ? sanitized : `fc_${sanitized}`;
		return candidate.length > 64 ? buildForeignResponsesItemId(itemId) : candidate;
	};
	const normalizeToolCallId = (id, _targetModel, source) => {
		if (!allowedToolCallProviders.has(model.provider)) return normalizeIdPart(id);
		if (!id.includes("|")) return normalizeIdPart(id);
		const separatorIndex = id.indexOf("|");
		const callId = id.slice(0, separatorIndex);
		const itemId = id.slice(separatorIndex + 1);
		const normalizedCallId = normalizeIdPart(callId);
		let normalizedItemId = source.provider !== model.provider || source.api !== model.api ? buildForeignResponsesItemId(itemId) : model.provider === "github-copilot" ? buildSameProviderCopilotResponsesItemId(itemId) : normalizeIdPart(itemId);
		if (!normalizedItemId.startsWith("fc_")) normalizedItemId = normalizeIdPart(`fc_${normalizedItemId}`);
		return `${normalizedCallId}|${normalizedItemId}`;
	};
	const transformedMessages = transformTransportMessages(context.messages, model, normalizeToolCallId, { normalizeSameModelToolCallIds: shouldNormalizeSameModelToolCallIds });
	if ((options?.includeSystemPrompt ?? true) && context.systemPrompt) messages.push(buildResponsesInputMessage(model.reasoning && options?.supportsDeveloperRole !== false ? "developer" : "system", [{
		type: "input_text",
		text: sanitizeTransportPayloadText(stripSystemPromptCacheBoundary(context.systemPrompt))
	}]));
	let msgIndex = 0;
	for (const msg of transformedMessages) {
		if (msg.role === "user") if (typeof msg.content === "string") messages.push(buildResponsesInputMessage("user", [{
			type: "input_text",
			text: sanitizeTransportPayloadText(msg.content)
		}]));
		else {
			const content = msg.content.map((item) => item.type === "text" ? {
				type: "input_text",
				text: sanitizeTransportPayloadText(item.text)
			} : {
				type: "input_image",
				detail: "auto",
				image_url: `data:${item.mimeType};base64,${item.data}`
			}).filter((item) => model.input.includes("image") || item.type !== "input_image");
			if (content.length > 0) messages.push(buildResponsesInputMessage("user", content));
		}
		else if (msg.role === "assistant") {
			const output = [];
			let textFallbackOrdinal = 0;
			let previousReplayItemWasReasoning = false;
			const isDifferentModel = msg.model !== model.id && msg.provider === model.provider && msg.api === model.api;
			for (const block of msg.content) if (block.type === "thinking") {
				if (shouldReplayReasoningItems && block.thinkingSignature && block.thinkingSignature.startsWith("{")) {
					const replayableReasoningItem = prepareOpenAIResponsesReasoningItemForReplay(JSON.parse(block.thinkingSignature), replayContext, readOpenAIResponsesReasoningReplayBlockMetadata(block));
					if (!shouldReplayResponsesItemIds) delete replayableReasoningItem.id;
					if (shouldReplayResponsesItemIds && model.provider === "github-copilot" && !isSafeResponsesReplayItemId(replayableReasoningItem.id)) continue;
					output.push(replayableReasoningItem);
					previousReplayItemWasReasoning = true;
				}
			} else if (block.type === "text") {
				const textSignature = parseTextSignature(block.textSignature);
				let msgId = resolveReplayableResponsesMessageId({
					replayResponsesItemIds: shouldReplayResponsesItemIds,
					textSignatureId: textSignature?.id,
					fallbackId: `msg_${msgIndex}`,
					fallbackOrdinal: textFallbackOrdinal,
					previousReplayItemWasReasoning
				});
				if (!textSignature?.id) textFallbackOrdinal += 1;
				msgId = normalizeResponsesReplayItemId(msgId, "msg");
				const messageItem = {
					type: "message",
					role: "assistant",
					content: [{
						type: "output_text",
						text: sanitizeTransportPayloadText(block.text),
						annotations: []
					}],
					status: "completed",
					...msgId ? { id: msgId } : {},
					phase: textSignature?.phase
				};
				output.push(messageItem);
				previousReplayItemWasReasoning = false;
			} else if (block.type === "toolCall") {
				const separatorIndex = block.id.indexOf("|");
				const callId = separatorIndex === -1 ? block.id : block.id.slice(0, separatorIndex);
				const itemIdRaw = separatorIndex === -1 ? void 0 : block.id.slice(separatorIndex + 1);
				const itemId = shouldReplayResponsesItemIds && !(isDifferentModel && itemIdRaw?.startsWith("fc_")) ? itemIdRaw : void 0;
				output.push({
					type: "function_call",
					...itemId ? { id: itemId } : {},
					call_id: callId,
					name: block.name,
					arguments: typeof block.arguments === "string" ? block.arguments : JSON.stringify(block.arguments ?? {})
				});
				previousReplayItemWasReasoning = false;
			}
			if (output.length > 0) messages.push(...output);
		} else if (msg.role === "toolResult") {
			const textResult = extractToolResultText(msg.content);
			const sanitizedTextResult = sanitizeTransportPayloadText(textResult);
			const hasText = sanitizedTextResult.trim().length > 0;
			const mediaPlaceholder = describeToolResultMediaPlaceholder(msg.content);
			const hasImages = msg.content.some(isImageWithMediaPayload);
			const separatorIndex = msg.toolCallId.indexOf("|");
			const callId = separatorIndex === -1 ? msg.toolCallId : msg.toolCallId.slice(0, separatorIndex);
			messages.push({
				type: "function_call_output",
				call_id: callId,
				output: hasImages && model.input.includes("image") ? [...hasText ? [{
					type: "input_text",
					text: sanitizedTextResult
				}] : mediaPlaceholder === "(see attached media)" ? [{
					type: "input_text",
					text: mediaPlaceholder
				}] : [], ...msg.content.filter(isImageWithMediaPayload).map((item) => ({
					type: "input_image",
					detail: "auto",
					image_url: `data:${item.mimeType};base64,${item.data}`
				}))] : sanitizeNonEmptyTransportPayloadText(textResult, mediaPlaceholder ?? "(no output)")
			});
		}
		msgIndex += 1;
	}
	return messages;
}
//#endregion
//#region packages/ai/src/providers/openai-responses-stream-compat.ts
const OPENAI_RESPONSES_OUTPUT_TEXT_CONTENT_PART_TYPE = "output_text";
const AZURE_RESPONSES_TEXT_CONTENT_PART_TYPE = "text";
const OPENAI_RESPONSES_OUTPUT_TEXT_DELTA_EVENT_TYPE = "response.output_text.delta";
const AZURE_RESPONSES_TEXT_DELTA_EVENT_TYPE = "response.text.delta";
function isResponsesTextContentPartType(type) {
	return type === "output_text" || type === "text";
}
function isResponsesTextDeltaEventType(type) {
	return type === "response.output_text.delta" || type === "response.text.delta";
}
function isAzureResponsesTextDeltaEventType(type) {
	return type === AZURE_RESPONSES_TEXT_DELTA_EVENT_TYPE;
}
function isAzureResponsesTextDeltaEvent(event) {
	return isAzureResponsesTextDeltaEventType(event.type) && typeof event.delta === "string";
}
function resolveResponsesMessageSnapshotCollapse(params) {
	const { prior, nextText } = params;
	if (!prior?.text || !nextText || prior.phase !== params.nextPhase) return { kind: "keep" };
	if (nextText.length > prior.text.length && nextText.startsWith(prior.text)) return {
		kind: "extend",
		text: nextText
	};
	return { kind: "keep" };
}
//#endregion
//#region packages/ai/src/providers/openai-responses-tool-call-tracker.ts
function readIdentityValue(value) {
	return (typeof value === "string" ? value.trim() : "") || void 0;
}
function readOutputIndex(event) {
	return typeof event.output_index === "number" && Number.isInteger(event.output_index) && event.output_index >= 0 ? event.output_index : void 0;
}
function readEventIdentity(event) {
	return { itemId: readIdentityValue(event.item_id) };
}
function readResponsesToolCallItemIdentity(item) {
	return {
		itemId: readIdentityValue(item.id),
		callId: readIdentityValue(item.call_id)
	};
}
function createResponsesToolCallTracker() {
	const indexedCalls = /* @__PURE__ */ new Map();
	const unindexedCalls = /* @__PURE__ */ new Set();
	const identitiesConflict = (state, identity) => Boolean(state.itemId && identity.itemId && state.itemId !== identity.itemId || state.callId && identity.callId && state.callId !== identity.callId);
	const sharesIdentity = (state, identity) => Boolean(state.itemId && identity.itemId && state.itemId === identity.itemId || state.callId && identity.callId && state.callId === identity.callId);
	const adoptIdentity = (state, identity) => {
		state.itemId ??= identity.itemId;
		state.callId ??= identity.callId;
		return state;
	};
	const resolveCompatible = (candidates, identity) => {
		const uniqueCandidates = [...new Set(candidates)];
		if (!identity.itemId && !identity.callId) return uniqueCandidates.length === 1 ? uniqueCandidates.at(0) : void 0;
		const compatible = uniqueCandidates.filter((state) => !identitiesConflict(state, identity));
		const matches = compatible.filter((state) => sharesIdentity(state, identity));
		const matched = matches.length === 1 ? matches.at(0) : void 0;
		if (matched) return adoptIdentity(matched, identity);
		const soleCompatible = uniqueCandidates.length === 1 && compatible.length === 1 && matches.length === 0 ? compatible.at(0) : void 0;
		return soleCompatible ? adoptIdentity(soleCompatible, identity) : void 0;
	};
	return {
		register(event, state) {
			const outputIndex = readOutputIndex(event);
			if (outputIndex === void 0) {
				unindexedCalls.add(state);
				return;
			}
			if (indexedCalls.has(outputIndex)) throw new Error(`Responses stream reused active tool-call output index ${outputIndex}`);
			indexedCalls.set(outputIndex, state);
		},
		resolve(event, identity = readEventIdentity(event)) {
			const outputIndex = readOutputIndex(event);
			if (outputIndex !== void 0) {
				const indexed = indexedCalls.get(outputIndex);
				if (indexed) {
					if (indexed.callId && identity.callId && indexed.callId !== identity.callId) return;
					return adoptIdentity(indexed, identity);
				}
				const unindexed = resolveCompatible(unindexedCalls, identity);
				if (unindexed) {
					unindexedCalls.delete(unindexed);
					indexedCalls.set(outputIndex, unindexed);
				}
				return unindexed;
			}
			return resolveCompatible([...indexedCalls.values(), ...unindexedCalls], identity);
		},
		forget(toolCall) {
			for (const [outputIndex, tracked] of indexedCalls) if (tracked === toolCall) indexedCalls.delete(outputIndex);
			unindexedCalls.delete(toolCall);
		},
		markArgumentsUnreliable() {
			for (const toolCall of /* @__PURE__ */ new Set([...indexedCalls.values(), ...unindexedCalls])) toolCall.argumentStreamReliable = false;
		},
		hasActive() {
			return indexedCalls.size > 0 || unindexedCalls.size > 0;
		}
	};
}
//#endregion
//#region packages/ai/src/transports/openai-responses-stream-observer-internal.ts
const STRING_DELTA_EVENTS = /* @__PURE__ */ new Set([
	"response.function_call_arguments.delta",
	"response.output_text.delta",
	"response.reasoning_summary_text.delta",
	"response.reasoning_text.delta",
	"response.refusal.delta",
	"response.text.delta"
]);
async function* adaptResponsesStream(stream, signal) {
	const scheduler = createModelStreamCooperativeScheduler(signal);
	for await (const event of stream) {
		if (signal?.aborted) throw transportAbortError(signal);
		if (!isRecord(event) || typeof event.type !== "string") throw new Error("Responses stream delivered a malformed event without a string type");
		if (STRING_DELTA_EVENTS.has(event.type) && typeof event.delta !== "string") throw new Error(`Responses stream delivered malformed ${event.type} delta`);
		if ((event.type === "response.output_item.added" || event.type === "response.output_item.done") && !isRecord(event.item)) throw new Error(`Responses stream delivered malformed ${event.type} item`);
		if ((event.type === "response.created" || event.type === "response.completed" || event.type === "response.incomplete" || event.type === "response.failed") && !isRecord(event.response)) throw new Error(`Responses stream delivered malformed ${event.type} response`);
		yield event;
		await scheduler.afterEvent();
	}
}
async function* observeResponsesStream(stream, model) {
	const startedAt = Date.now();
	const eventTypes = /* @__PURE__ */ new Map();
	const debugMode = resolveModelSseDebugMode();
	let eventCount = 0;
	try {
		for await (const event of stream) {
			const type = isRecord(event) && typeof event.type === "string" ? event.type : "unknown";
			eventCount += 1;
			eventTypes.set(type, (eventTypes.get(type) ?? 0) + 1);
			if (eventCount === 1) emitModelTransportDebug(log, `[responses] first_event provider=${model.provider} api=${model.api} model=${model.id} elapsedMs=${Date.now() - startedAt} type=${type}`);
			if (debugMode === "peek" && eventCount <= 5) emitModelTransportDebug(log, `[responses] event_peek provider=${model.provider} api=${model.api} model=${model.id} index=${eventCount} type=${type} event=${stringifyRedactedEvent(event)}`);
			yield event;
		}
	} finally {
		const types = [...eventTypes].map(([type, count]) => `${type}:${count}`).join(",");
		emitModelTransportDebug(log, `[responses] stream_done provider=${model.provider} api=${model.api} model=${model.id} elapsedMs=${Date.now() - startedAt} events=${eventCount} types=${types}`);
	}
}
//#endregion
//#region packages/ai/src/transports/openai-responses-stream-slots-internal.ts
function appendResponsesPendingTextDelta(slot, delta, materialize) {
	slot.pendingText = `${slot.pendingText ?? ""}${delta}`;
	const priorText = slot.collapseCandidate?.block.text ?? "";
	if (priorText.startsWith(slot.pendingText) || slot.pendingText.startsWith(priorText)) return;
	materialize(slot);
}
function readResponsesOutputIndex(event) {
	const outputIndex = event.output_index;
	return typeof outputIndex === "number" && Number.isInteger(outputIndex) && outputIndex >= 0 ? outputIndex : void 0;
}
function createResponsesOutputSlotTracker() {
	const indexed = /* @__PURE__ */ new Map();
	let unindexed;
	return {
		register(event, slot) {
			const outputIndex = readResponsesOutputIndex(event);
			if (outputIndex === void 0) {
				if (unindexed) throw new Error("Responses stream added overlapping unindexed output items");
				unindexed = slot;
				return;
			}
			if (indexed.has(outputIndex)) throw new Error(`Responses stream reused active output index ${outputIndex}`);
			indexed.set(outputIndex, slot);
		},
		resolve(event, type) {
			const outputIndex = readResponsesOutputIndex(event);
			let slot = outputIndex === void 0 ? unindexed : indexed.get(outputIndex);
			if (outputIndex === void 0 && !slot) {
				const matches = [...indexed.values()].filter((candidate) => candidate.type === type);
				slot = matches.length === 1 ? matches[0] : void 0;
			}
			return slot?.type === type ? slot : void 0;
		},
		get(event) {
			const outputIndex = readResponsesOutputIndex(event);
			return outputIndex === void 0 ? unindexed : indexed.get(outputIndex);
		},
		values() {
			return [.../* @__PURE__ */ new Set([...indexed.values(), ...unindexed ? [unindexed] : []])];
		},
		forget(slot) {
			if (unindexed === slot) unindexed = void 0;
			for (const [outputIndex, candidate] of indexed) if (candidate === slot) indexed.delete(outputIndex);
		}
	};
}
//#endregion
//#region packages/ai/src/providers/openai-responses-terminal-usage.ts
function readCount(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
/**
* Split a terminal usage payload into the priced buckets.
*
* OpenAI includes cache reads and writes in `input_tokens`, so both are subtracted out of the
* billable input bucket. `total_tokens` comes from the payload, but never below the sum of the
* split buckets: proxies routinely omit it (reporting 0 would understate the turn), and a payload
* whose `cached_tokens` exceeds `input_tokens` clamps the input bucket, leaving the reported total
* short of what the buckets actually price.
*/
function mapResponsesTerminalUsage(usage) {
	if (!usage) return;
	const cacheRead = readCount(usage.input_tokens_details?.cached_tokens);
	const cacheWrite = readCount(usage.input_tokens_details?.cache_write_tokens);
	const input = Math.max(0, readCount(usage.input_tokens) - cacheRead - cacheWrite);
	const output = readCount(usage.output_tokens);
	const bucketTotal = input + output + cacheRead + cacheWrite;
	return {
		input,
		output,
		cacheRead,
		cacheWrite,
		totalTokens: Math.max(bucketTotal, readCount(usage.total_tokens))
	};
}
/** Reasoning tokens are reported by the agent path only; the package path does not track them. */
function readResponsesReasoningTokens(usage) {
	const reasoningTokens = usage?.output_tokens_details?.reasoning_tokens;
	return typeof reasoningTokens === "number" && Number.isFinite(reasoningTokens) ? reasoningTokens : void 0;
}
function mapResponsesTerminalStopReason(status) {
	if (!status) return "stop";
	switch (status) {
		case "completed": return "stop";
		case "incomplete": return "length";
		case "failed":
		case "cancelled": return "error";
		case "in_progress":
		case "queued": return "stop";
		default: throw new Error(`Unhandled stop reason: ${String(status)}`);
	}
}
/**
* Resolve the terminal stop reason, including the two overrides every Responses path shares: a
* content-filtered turn is a provider error rather than a truncated answer, and a turn that
* produced tool calls reports `toolUse` instead of a plain stop.
*/
function resolveResponsesTerminalStopReason(params) {
	const status = params.status ?? (params.terminalEventType === "response.incomplete" ? "incomplete" : void 0);
	if (status === "incomplete" && params.incompleteReason === "content_filter") return {
		stopReason: "error",
		errorMessage: "Provider incomplete_reason: content_filter"
	};
	const stopReason = mapResponsesTerminalStopReason(status);
	if (stopReason === "stop" && params.hasToolCall) return { stopReason: "toolUse" };
	return { stopReason };
}
//#endregion
//#region packages/ai/src/transports/openai-responses-stream-terminal-internal.ts
function splitToolCallId(id) {
	const separator = id.indexOf("|");
	return separator === -1 ? [id, void 0] : [id.slice(0, separator), id.slice(separator + 1)];
}
function resolveResponsesToolCallId(item, fallbackId) {
	const callId = typeof item.call_id === "string" ? item.call_id.trim() : "";
	const itemId = typeof item.id === "string" ? item.id.trim() : "";
	const [fallbackCallId, fallbackItemId = ""] = splitToolCallId(fallbackId ?? "");
	const resolvedCallId = callId || fallbackCallId;
	const resolvedItemId = itemId || fallbackItemId;
	if (resolvedCallId) return resolvedItemId ? `${resolvedCallId}|${resolvedItemId}` : resolvedCallId;
	const generated = `call_${randomUUID().replaceAll("-", "").slice(0, 24)}`;
	return resolvedItemId ? `${generated}|${resolvedItemId}` : generated;
}
function resolveCompletedResponsesToolCall(item, streamed) {
	if (item.status && item.status !== "completed") throw new Error("Responses stream completed with an incomplete terminal tool call");
	const streamedName = streamed?.name?.trim() || void 0;
	const completedName = typeof item.name === "string" ? item.name.trim() || void 0 : void 0;
	if (streamedName && completedName && streamedName !== completedName) throw new Error(`Responses stream changed tool-call function name from ${streamedName} to ${completedName}`);
	const name = completedName ?? streamedName;
	if (!name) throw new Error("Responses stream completed tool call without a function name");
	const argumentsValue = parseJsonObjectPreservingUnsafeIntegers(streamed?.arguments ?? item.arguments);
	if (!argumentsValue) throw new Error("Responses stream completed tool call with invalid JSON arguments");
	return {
		name,
		arguments: argumentsValue
	};
}
function createResponsesTerminalController(params) {
	const { output, stream, model, options } = params;
	const blocks = output.content;
	const backfillReasoning = (items) => {
		for (const item of items) {
			if (item.type !== "reasoning" || !item.encrypted_content) continue;
			const block = params.reasoningBlocksById.get(item.id);
			if (!block?.thinkingSignature) continue;
			const stored = JSON.parse(block.thinkingSignature);
			if (!stored.encrypted_content) block.thinkingSignature = JSON.stringify({
				...stored,
				encrypted_content: item.encrypted_content
			});
			if (options?.reasoningReplayMetadata) block[OPENAI_RESPONSES_REASONING_REPLAY_BLOCK_META_KEY] = options.reasoningReplayMetadata;
		}
	};
	const appendText = (item) => {
		const text = (Array.isArray(item.content) ? item.content : []).map((part) => {
			const content = part;
			return content.type === "output_text" || content.type === "text" ? content.text ?? "" : content.refusal ?? "";
		}).join("");
		const started = params.startedTextBlocksByItemId.get(item.id);
		if (!text && !started) return;
		const phase = item.phase ?? void 0;
		if (started) {
			const previousText = started.block.text;
			started.block.text = text;
			started.block.textSignature = encodeTextSignatureV1(item.id, phase);
			params.setLastTextBlock({
				block: started.block,
				index: started.index,
				phase
			});
			params.startedTextBlocksByItemId.delete(item.id);
			if (text.startsWith(previousText)) {
				const delta = text.slice(previousText.length);
				if (delta) stream.push({
					type: "text_delta",
					contentIndex: started.index,
					delta
				});
			}
			stream.push({
				type: "text_end",
				contentIndex: started.index,
				content: text,
				partial: output
			});
			return;
		}
		const previous = params.getLastTextBlock();
		const collapse = resolveResponsesMessageSnapshotCollapse({
			prior: previous && {
				text: previous.block.text,
				phase: previous.phase
			},
			nextText: text,
			nextPhase: phase
		});
		if (collapse.kind === "extend" && previous) {
			previous.block.text = collapse.text;
			previous.block.textSignature = encodeTextSignatureV1(item.id, phase);
			stream.push({
				type: "text_end",
				contentIndex: previous.index,
				content: collapse.text,
				partial: output
			});
			return;
		}
		const block = {
			type: "text",
			text,
			textSignature: encodeTextSignatureV1(item.id, phase)
		};
		blocks.push(block);
		const index = blocks.length - 1;
		params.setLastTextBlock({
			block,
			index,
			phase
		});
		stream.push({
			type: "text_start",
			contentIndex: index,
			partial: output
		});
		stream.push({
			type: "text_end",
			contentIndex: index,
			content: text,
			partial: output
		});
	};
	const appendToolCall = (item) => {
		const validated = resolveCompletedResponsesToolCall(item);
		const toolCall = {
			type: "toolCall",
			id: resolveResponsesToolCallId(item),
			name: validated.name,
			arguments: validated.arguments
		};
		blocks.push(toolCall);
		const contentIndex = blocks.length - 1;
		stream.push({
			type: "toolcall_start",
			contentIndex,
			partial: output
		});
		stream.push({
			type: "toolcall_end",
			contentIndex,
			toolCall,
			partial: output
		});
	};
	const recoverTerminalOutput = (items, includeToolCalls) => {
		let hasCompletedLaterOutput = false;
		for (const item of items.toReversed()) {
			if (item.type === "reasoning") {
				hasCompletedLaterOutput ||= params.reasoningBlocksById.has(item.id);
				continue;
			}
			if (item.type !== "message" && item.type !== "function_call") continue;
			const identity = item.type === "message" ? `message:${item.id}` : `function_call:${item.call_id}`;
			if (params.completedOutputItemIdentities.has(identity) || item.type === "message" && params.startedTextBlocksByItemId.has(item.id)) {
				hasCompletedLaterOutput = true;
				continue;
			}
			if (item.type === "function_call" && !includeToolCalls) continue;
			if (hasCompletedLaterOutput) throw new Error("Responses stream omitted an output item before completed output");
			if (item.type === "function_call") resolveCompletedResponsesToolCall(item);
		}
		for (const item of items) if (item.type === "message") {
			const identity = `message:${item.id}`;
			if (params.completedOutputItemIdentities.has(identity)) continue;
			appendText(item);
			params.completedOutputItemIdentities.add(identity);
		} else {
			params.setLastTextBlock(null);
			if (includeToolCalls && item.type === "function_call") {
				const identity = `function_call:${item.call_id}`;
				if (params.completedOutputItemIdentities.has(identity)) continue;
				appendToolCall(item);
				params.completedOutputItemIdentities.add(identity);
			}
		}
	};
	const finalizeResponse = (response, terminalEventType) => {
		params.markFinalized();
		backfillReasoning(response.output ?? []);
		output.responseId = response.id || output.responseId;
		const usage = mapResponsesTerminalUsage(response.usage);
		const reasoningTokens = readResponsesReasoningTokens(response.usage);
		if (usage) output.usage = {
			...usage,
			...reasoningTokens === void 0 ? {} : { reasoningTokens },
			cost: {
				input: 0,
				output: 0,
				cacheRead: 0,
				cacheWrite: 0,
				total: 0
			}
		};
		calculateCost(model, output.usage);
		if (options?.applyServiceTierPricing) {
			const tier = options.resolveServiceTier ? options.resolveServiceTier(response.service_tier, options.serviceTier) : response.service_tier ?? options.serviceTier;
			options.applyServiceTierPricing(output.usage, tier);
		}
		const terminal = resolveResponsesTerminalStopReason({
			status: response.status,
			terminalEventType,
			incompleteReason: response.incomplete_details?.reason,
			hasToolCall: blocks.some((block) => block.type === "toolCall")
		});
		output.stopReason = terminal.stopReason;
		output.errorMessage = terminal.errorMessage;
	};
	return {
		finalizeResponse,
		recoverTerminalOutput
	};
}
//#endregion
//#region packages/ai/src/transports/openai-responses-stream-internal.ts
var ResponsesStreamFailure = class extends Error {
	constructor(failure, response) {
		super(failure.message);
		this.name = "ResponsesStreamFailure";
		this.responseId = failure.responseId;
		this.response = response;
		this.observation = failure.observation;
	}
};
async function processResponsesStream(openaiStream, output, stream, model, options) {
	const streamingToolCalls = createResponsesToolCallTracker();
	const outputSlots = createResponsesOutputSlotTracker();
	const reasoningBlocksById = /* @__PURE__ */ new Map();
	const completedOutputItemIdentities = /* @__PURE__ */ new Set();
	const startedTextBlocksByItemId = /* @__PURE__ */ new Map();
	let terminalResponseEvent;
	let lastTextBlock = null;
	const blocks = output.content;
	const blockIndex = () => blocks.length - 1;
	const createOutputSlot = (event, item) => {
		if (item.type === "reasoning") {
			const block = {
				type: "thinking",
				thinking: ""
			};
			const slot = {
				type: "thinking",
				item,
				block,
				contentIndex: blocks.length
			};
			blocks.push(block);
			reasoningBlocksById.set(item.id, block);
			outputSlots.register(event, slot);
			stream.push({
				type: "thinking_start",
				contentIndex: slot.contentIndex,
				partial: output
			});
			return slot;
		}
		if (item.type === "message") {
			const messageItem = item;
			const collapseCandidate = lastTextBlock;
			const block = collapseCandidate ? null : {
				type: "text",
				text: "",
				...messageItem.phase ? { textSignature: encodeTextSignatureV1(messageItem.id, messageItem.phase) } : {}
			};
			const slot = {
				type: "text",
				item: messageItem,
				block,
				contentIndex: block ? blocks.length : void 0,
				pendingText: collapseCandidate ? "" : null,
				collapseCandidate
			};
			if (block) {
				blocks.push(block);
				startedTextBlocksByItemId.set(messageItem.id, {
					block,
					index: slot.contentIndex ?? blocks.length - 1,
					phase: messageItem.phase ?? void 0
				});
			}
			outputSlots.register(event, slot);
			if (slot.contentIndex !== void 0) stream.push({
				type: "text_start",
				contentIndex: slot.contentIndex,
				partial: output
			});
			return slot;
		}
	};
	const resolveOutputItemSlot = (event, item) => {
		if (item.type === "reasoning") return outputSlots.resolve(event, "thinking");
		if (item.type === "message") return outputSlots.resolve(event, "text");
		return readResponsesOutputIndex(event) === void 0 ? void 0 : outputSlots.get(event);
	};
	const getOrCreateOutputSlot = (event, item) => {
		return resolveOutputItemSlot(event, item) ?? createOutputSlot(event, item);
	};
	const materializeDeferredTextSlot = (slot) => {
		if (slot.block || slot.pendingText === null) return;
		const text = slot.pendingText;
		slot.block = {
			type: "text",
			text,
			...slot.item.phase ? { textSignature: encodeTextSignatureV1(slot.item.id, slot.item.phase) } : {}
		};
		blocks.push(slot.block);
		slot.contentIndex = blockIndex();
		startedTextBlocksByItemId.set(slot.item.id, {
			block: slot.block,
			index: slot.contentIndex,
			phase: slot.item.phase ?? void 0
		});
		stream.push({
			type: "text_start",
			contentIndex: slot.contentIndex,
			partial: output
		});
		if (text) stream.push({
			type: "text_delta",
			contentIndex: slot.contentIndex,
			delta: text
		});
		if (lastTextBlock === slot.collapseCandidate) lastTextBlock = null;
		slot.pendingText = null;
		slot.collapseCandidate = null;
	};
	const materializeDeferredTextSlots = (except) => {
		for (const slot of outputSlots.values()) if (slot !== except && slot.type === "text") materializeDeferredTextSlot(slot);
	};
	const { finalizeResponse, recoverTerminalOutput } = createResponsesTerminalController({
		output,
		stream,
		model,
		options,
		reasoningBlocksById,
		completedOutputItemIdentities,
		startedTextBlocksByItemId,
		getLastTextBlock: () => lastTextBlock,
		setLastTextBlock: (block) => {
			lastTextBlock = block;
		},
		markFinalized: () => {
			terminalResponseEvent = "finalized";
		}
	});
	const guardedStream = adaptResponsesStream(withFirstStreamEventTimeout(openaiStream, {
		provider: model.provider,
		api: model.api,
		model: model.id,
		timeoutMs: options?.firstEventTimeoutMs ?? 0,
		stage: "responses",
		abort: options?.abortFirstEventStream,
		onTimeout: options?.onFirstEventTimeout,
		hint: "The provider may be stalled while parsing the tool payload; retry with a smaller tool surface or enable OPENCLAW_DEBUG_MODEL_PAYLOAD=tools to inspect exposed tools."
	}), options?.signal);
	try {
		for await (const event of guardedStream) if (event.type === "response.created") output.responseId = event.response.id;
		else if (event.type === "response.output_item.added") {
			materializeDeferredTextSlots();
			const item = event.item;
			if (item.type !== "message") lastTextBlock = null;
			if (item.type === "reasoning" || item.type === "message") createOutputSlot(event, item);
			else if (item.type === "function_call") {
				const toolCallBlock = {
					type: "toolCall",
					id: resolveResponsesToolCallId(item),
					name: typeof item.name === "string" ? item.name.trim() : "",
					arguments: {},
					partialJson: item.arguments || ""
				};
				const contentIndex = output.content.length;
				const toolCallState = {
					block: toolCallBlock,
					contentIndex,
					argumentStreamReliable: true,
					...readResponsesToolCallItemIdentity(item)
				};
				streamingToolCalls.register(event, toolCallState);
				if (readResponsesOutputIndex(event) !== void 0) outputSlots.register(event, {
					type: "toolCall",
					toolCall: toolCallState
				});
				output.content.push(toolCallBlock);
				stream.push({
					type: "toolcall_start",
					contentIndex,
					partial: output
				});
			}
		} else if (event.type === "response.reasoning_summary_part.added") {
			const slot = outputSlots.resolve(event, "thinking");
			if (!slot) continue;
			slot.item.summary = slot.item.summary || [];
			slot.item.summary.push(event.part);
		} else if (event.type === "response.reasoning_summary_text.delta") {
			const slot = outputSlots.resolve(event, "thinking");
			if (!slot) continue;
			slot.item.summary = slot.item.summary || [];
			const lastPart = slot.item.summary[slot.item.summary.length - 1];
			if (!lastPart) continue;
			slot.block.thinking += event.delta;
			lastPart.text += event.delta;
			stream.push({
				type: "thinking_delta",
				contentIndex: slot.contentIndex,
				delta: event.delta,
				partial: output
			});
		} else if (event.type === "response.reasoning_summary_part.done") {
			const slot = outputSlots.resolve(event, "thinking");
			if (!slot) continue;
			slot.item.summary = slot.item.summary || [];
			const lastPart = slot.item.summary[slot.item.summary.length - 1];
			if (!lastPart) continue;
			slot.block.thinking += "\n\n";
			lastPart.text += "\n\n";
			stream.push({
				type: "thinking_delta",
				contentIndex: slot.contentIndex,
				delta: "\n\n",
				partial: output
			});
		} else if (event.type === "response.reasoning_text.delta") {
			const slot = outputSlots.resolve(event, "thinking");
			if (!slot) continue;
			slot.block.thinking += event.delta;
			stream.push({
				type: "thinking_delta",
				contentIndex: slot.contentIndex,
				delta: event.delta,
				partial: output
			});
		} else if (event.type === "response.content_part.added") {
			const slot = outputSlots.resolve(event, "text");
			if (!slot) continue;
			slot.item.content = slot.item.content || [];
			if (event.part.type === "output_text" || event.part.type === "text" || event.part.type === "refusal") slot.item.content.push(event.part);
		} else if (event.type === "response.output_text.delta") {
			const slot = outputSlots.resolve(event, "text");
			if (!slot) continue;
			slot.item.content ||= [];
			let lastPart = slot.item.content[slot.item.content.length - 1];
			if (!isResponsesTextContentPartType(lastPart?.type)) {
				lastPart = {
					type: "output_text",
					text: "",
					annotations: []
				};
				slot.item.content.push(lastPart);
			}
			lastPart.text += event.delta;
			if (slot.pendingText !== null) appendResponsesPendingTextDelta(slot, event.delta, materializeDeferredTextSlot);
			else if (slot.block && slot.contentIndex !== void 0) {
				slot.block.text += event.delta;
				stream.push({
					type: "text_delta",
					contentIndex: slot.contentIndex,
					delta: event.delta
				});
			}
		} else if (isAzureResponsesTextDeltaEvent(event)) {
			const slot = outputSlots.resolve(event, "text");
			if (!slot) continue;
			slot.item.content = slot.item.content || [];
			let lastPart = slot.item.content[slot.item.content.length - 1];
			if (lastPart?.type !== "text") {
				lastPart = {
					type: "text",
					text: ""
				};
				slot.item.content.push(lastPart);
			}
			lastPart.text += event.delta;
			if (slot.pendingText !== null) appendResponsesPendingTextDelta(slot, event.delta, materializeDeferredTextSlot);
			else if (slot.block && slot.contentIndex !== void 0) {
				slot.block.text += event.delta;
				stream.push({
					type: "text_delta",
					contentIndex: slot.contentIndex,
					delta: event.delta
				});
			}
		} else if (event.type === "response.refusal.delta") {
			const slot = outputSlots.resolve(event, "text");
			if (!slot) continue;
			slot.item.content ||= [];
			let lastPart = slot.item.content[slot.item.content.length - 1];
			if (lastPart?.type !== "refusal") {
				lastPart = {
					type: "refusal",
					refusal: ""
				};
				slot.item.content.push(lastPart);
			}
			lastPart.refusal += event.delta;
			if (slot.pendingText !== null) appendResponsesPendingTextDelta(slot, event.delta, materializeDeferredTextSlot);
			else if (slot.block && slot.contentIndex !== void 0) {
				slot.block.text += event.delta;
				stream.push({
					type: "text_delta",
					contentIndex: slot.contentIndex,
					delta: event.delta
				});
			}
		} else if (event.type === "response.function_call_arguments.delta") {
			const toolCall = streamingToolCalls.resolve(event);
			if (toolCall) {
				toolCall.block.partialJson += event.delta;
				toolCall.block.arguments = parseStreamingJson(toolCall.block.partialJson);
				stream.push({
					type: "toolcall_delta",
					contentIndex: toolCall.contentIndex,
					delta: event.delta,
					partial: output
				});
			} else if (streamingToolCalls.hasActive()) streamingToolCalls.markArgumentsUnreliable();
		} else if (event.type === "response.function_call_arguments.done") {
			const toolCall = streamingToolCalls.resolve(event);
			if (toolCall) {
				const previousPartialJson = toolCall.block.partialJson;
				const doneArguments = typeof event.arguments === "string" ? event.arguments : void 0;
				if (doneArguments !== void 0 && (doneArguments.length > 0 || previousPartialJson === "")) {
					toolCall.block.partialJson = doneArguments;
					toolCall.block.arguments = parseStreamingJson(toolCall.block.partialJson);
					toolCall.argumentStreamReliable = true;
				}
				if (doneArguments?.startsWith(previousPartialJson)) {
					const delta = doneArguments.slice(previousPartialJson.length);
					if (delta.length > 0) stream.push({
						type: "toolcall_delta",
						contentIndex: toolCall.contentIndex,
						delta,
						partial: output
					});
				}
			} else if (streamingToolCalls.hasActive()) streamingToolCalls.markArgumentsUnreliable();
		} else if (event.type === "response.output_item.done") {
			const item = event.item;
			if (item.type !== "message") lastTextBlock = null;
			const existingOutputSlot = resolveOutputItemSlot(event, item);
			materializeDeferredTextSlots(existingOutputSlot);
			const outputSlot = existingOutputSlot ?? getOrCreateOutputSlot(event, item);
			if (item.type === "reasoning" && outputSlot?.type === "thinking") {
				const summaryText = item.summary?.map((s) => s.text).join("\n\n") || "";
				const contentText = item.content?.map((c) => c.text).join("\n\n") || "";
				outputSlot.block.thinking = summaryText || contentText || outputSlot.block.thinking;
				outputSlot.block.thinkingSignature = JSON.stringify(item);
				if (item.encrypted_content && options?.reasoningReplayMetadata) outputSlot.block[OPENAI_RESPONSES_REASONING_REPLAY_BLOCK_META_KEY] = options.reasoningReplayMetadata;
				stream.push({
					type: "thinking_end",
					contentIndex: outputSlot.contentIndex,
					content: outputSlot.block.thinking,
					partial: output
				});
				outputSlots.forget(outputSlot);
			} else if (item.type === "message" && outputSlot?.type === "text" && (outputSlot.block || outputSlot.pendingText !== null)) {
				const streamedText = outputSlot.pendingText ?? outputSlot.block?.text ?? "";
				const finalText = item.content == null ? streamedText : item.content.map((c) => c.type === "output_text" || c.type === "text" ? c.text : c.refusal).join("");
				const phase = item.phase ?? void 0;
				const collapse = outputSlot.pendingText !== null ? resolveResponsesMessageSnapshotCollapse({
					prior: outputSlot.collapseCandidate && {
						text: outputSlot.collapseCandidate.block.text,
						phase: outputSlot.collapseCandidate.phase
					},
					nextText: finalText,
					nextPhase: phase
				}) : { kind: "keep" };
				outputSlot.pendingText = null;
				if (collapse.kind === "extend" && outputSlot.collapseCandidate) {
					outputSlot.collapseCandidate.block.text = collapse.text;
					outputSlot.collapseCandidate.block.textSignature = encodeTextSignatureV1(item.id, phase);
					stream.push({
						type: "text_end",
						contentIndex: outputSlot.collapseCandidate.index,
						content: collapse.text,
						partial: output
					});
					lastTextBlock = outputSlot.collapseCandidate;
				} else {
					if (!outputSlot.block) {
						outputSlot.block = {
							type: "text",
							text: "",
							...phase ? { textSignature: encodeTextSignatureV1(item.id, phase) } : {}
						};
						blocks.push(outputSlot.block);
						outputSlot.contentIndex = blockIndex();
						stream.push({
							type: "text_start",
							contentIndex: outputSlot.contentIndex,
							partial: output
						});
					}
					outputSlot.block.text = finalText;
					outputSlot.block.textSignature = encodeTextSignatureV1(item.id, phase);
					const contentIndex = outputSlot.contentIndex;
					if (contentIndex === void 0) throw new Error("Responses stream finalized text without a content index");
					lastTextBlock = {
						block: outputSlot.block,
						index: contentIndex,
						phase
					};
					stream.push({
						type: "text_end",
						contentIndex,
						content: outputSlot.block.text,
						partial: output
					});
				}
				outputSlots.forget(outputSlot);
				startedTextBlocksByItemId.delete(item.id);
				completedOutputItemIdentities.add(`message:${item.id}`);
			} else if (item.type === "function_call") {
				const streamingToolCall = streamingToolCalls.resolve(event, readResponsesToolCallItemIdentity(item));
				if (!streamingToolCall && streamingToolCalls.hasActive()) continue;
				const streamedArguments = streamingToolCall?.block.partialJson ?? "";
				const completedArguments = typeof item.arguments === "string" ? item.arguments : void 0;
				if (streamingToolCall && !streamingToolCall.argumentStreamReliable && !completedArguments) continue;
				const finalArguments = completedArguments !== void 0 && (completedArguments.length > 0 || !streamedArguments) ? completedArguments : streamedArguments;
				const validated = resolveCompletedResponsesToolCall(item, {
					name: streamingToolCall?.block.name,
					arguments: finalArguments
				});
				let toolCall;
				let contentIndex;
				if (streamingToolCall) {
					const block = streamingToolCall.block;
					block.id = resolveResponsesToolCallId(item, block.id);
					block.name = validated.name;
					block.arguments = validated.arguments;
					delete block.partialJson;
					toolCall = block;
					contentIndex = streamingToolCall.contentIndex;
				} else {
					toolCall = {
						type: "toolCall",
						id: resolveResponsesToolCallId(item),
						name: validated.name,
						arguments: validated.arguments
					};
					blocks.push(toolCall);
					contentIndex = blockIndex();
					stream.push({
						type: "toolcall_start",
						contentIndex,
						partial: output
					});
				}
				if (streamingToolCall) {
					streamingToolCalls.forget(streamingToolCall);
					for (const slot of outputSlots.values()) if (slot.type === "toolCall" && slot.toolCall === streamingToolCall) outputSlots.forget(slot);
				}
				stream.push({
					type: "toolcall_end",
					contentIndex,
					toolCall,
					partial: output
				});
				completedOutputItemIdentities.add(`function_call:${item.call_id}`);
			}
		} else if (event.type === "response.completed" || event.type === "response.incomplete") {
			if (streamingToolCalls.hasActive()) throw new Error("Responses stream completed with unresolved tool calls");
			finalizeResponse(event.response, event.type);
			if (event.type === "response.completed" || output.stopReason === "length") recoverTerminalOutput(event.response.output ?? [], event.type === "response.completed");
			if (output.stopReason === "stop" && output.content.some((block) => block.type === "toolCall")) output.stopReason = "toolUse";
			break;
		} else if (event.type === "error") throw new Error(event.message ? `Error Code ${event.code}: ${event.message}` : "Unknown error");
		else if (event.type === "response.failed") {
			const failure = normalizeResponsesFailedEvent(event, model);
			if (failure.responseId) output.responseId = failure.responseId;
			throw new ResponsesStreamFailure(failure, event.response);
		}
		if (streamingToolCalls.hasActive()) throw new Error("Responses stream ended with unresolved tool calls");
		if (!terminalResponseEvent) throw new Error("OpenAI Responses stream ended before a terminal response event");
	} finally {
		for (const block of output.content) delete block.partialJson;
	}
}
//#endregion
export { stripUnsupportedSchemaKeywords as $, normalizeResponsesFailedEvent as A, resolveReplayableResponsesMessageId as B, prepareOpenAIResponsesReasoningItemForReplay as C, applyServiceTierPricing as D, tagOpenAIResponsesReasoningReplayItem as E, summarizeResponsesFailedNoDetailsObservation as F, normalizeStrictOpenAIJsonSchema as G, findOpenAIStrictToolProjectionDiagnostics as H, summarizeResponsesPayload as I, normalizeOpenAIStrictCompatSchema as J, resolveOpenAIProjectedToolsStrictToolFlag as K, summarizeResponsesTools as L, stringifyRedactedEvent as M, stringifyRedactedPayload as N, buildResponsesFailedNoDetailsObservation as O, summarizeOpenAITransportError as P, shouldOmitEmptyArrayItems as Q, AZURE_RESPONSES_FIRST_EVENT_TIMEOUT_MS as R, isInvalidEncryptedContentError as S, stripResponsesRequestEncryptedContent as T, isStrictOpenAIJsonSchemaCompatible as U, clearOpenAIToolSchemaCacheForTest as V, normalizeOpenAIStrictToolParameters as W, normalizeToolParameterSchema as X, extractToolSchemaModelCompat as Y, resolveUnsupportedToolSchemaKeywords as Z, resolveResponsesMessageSnapshotCollapse as _, parseJsonObjectPreservingUnsafeIntegers as _t, resolveResponsesTerminalStopReason as a, isOpenAIGpt54MiniModel as at, convertResponsesMessages as b, readResponsesToolCallItemIdentity as c, normalizeOpenAIReasoningEffort as ct, OPENAI_RESPONSES_OUTPUT_TEXT_CONTENT_PART_TYPE as d, supportsOpenAIReasoningEffort as dt, LLAMACPP_GBNF_MAX_REPETITION_THRESHOLD as et, OPENAI_RESPONSES_OUTPUT_TEXT_DELTA_EVENT_TYPE as f, supportsOpenAITemperature as ft, isResponsesTextDeltaEventType as g, resolveModelSseDebugMode as gt, isResponsesTextContentPartType as h, resolveModelPayloadDebugMode as ht, readResponsesReasoningTokens as i, cleanSchemaForGemini as it, safeDebugValue as j, logResponsesFailedNoDetails as k, AZURE_RESPONSES_TEXT_CONTENT_PART_TYPE as l, resolveOpenAIReasoningEffortForModel as lt, isAzureResponsesTextDeltaEventType as m, emitModelTransportDebug as mt, processResponsesStream as n, findLlamacppGbnfSchemaViolations as nt, observeResponsesStream as o, isOpenAIGpt55Model as ot, isAzureResponsesTextDeltaEvent as p, uniqueStrings as pt, findOpenAIStrictSchemaViolations as q, mapResponsesTerminalUsage as r, GEMINI_UNSUPPORTED_SCHEMA_KEYWORDS as rt, createResponsesToolCallTracker as s, isOpenAIGpt56Model as st, ResponsesStreamFailure as t, cleanSchemaForLlamacppGbnf as tt, AZURE_RESPONSES_TEXT_DELTA_EVENT_TYPE as u, resolveOpenAISupportedReasoningEfforts as ut, buildOpenAIResponsesReasoningReplayMetadata as v, parseJsonPreservingUnsafeIntegers as vt, resolveAzureOpenAIApiVersion as w, createResponsesStreamWithEncryptedContentRetry as x, buildResponsesInputMessage as y, quoteUnsafeIntegerLiterals as yt, OPENAI_CODEX_RESPONSES_DEFAULT_INSTRUCTIONS as z };
