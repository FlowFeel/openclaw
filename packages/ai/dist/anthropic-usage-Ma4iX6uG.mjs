import { o as resolveClaudeFable5ModelIdentity, s as resolveClaudeModelIdentity, u as resolveClaudeOpus5ModelIdentity } from "./src-QkygScBs.mjs";
import { b as isRecord, n as getAiTransportHost } from "./host-Bl7Kgddo.mjs";
import { t as resolveCacheRetention } from "./cache-retention-0x979a5V.mjs";
import { h as stripSystemPromptCacheBoundary, m as splitSystemPromptCacheBoundary, v as sortPromptCacheToolsByName } from "./tool-result-text-Dvkp2Dus.mjs";
import { o as resolveProviderRequestCapabilities, t as projectRuntimeToolInputSchema } from "./tool-schema-json-projection-B1b-XCn5.mjs";
//#region packages/ai/src/transports/anthropic-payload-policy.ts
/**
* Anthropic-family request payload policy helpers.
* Applies service-tier and cache-control markers only when provider endpoint
* capabilities allow them.
*/
const ANTHROPIC_CACHE_CONTROL_LIMIT = 4;
function resolveBaseUrlHostname(baseUrl) {
	try {
		return new URL(baseUrl).hostname;
	} catch {
		return;
	}
}
function isLongTtlEligibleEndpoint(baseUrl) {
	if (typeof baseUrl !== "string") return false;
	const hostname = resolveBaseUrlHostname(baseUrl);
	if (!hostname) return false;
	return hostname === "api.anthropic.com" || hostname === "aiplatform.googleapis.com" || hostname === "aiplatform.us.rep.googleapis.com" || hostname === "aiplatform.eu.rep.googleapis.com" || hostname.endsWith("-aiplatform.googleapis.com");
}
/** Resolve Anthropic cache-control marker retention for a request endpoint. */
function resolveAnthropicEphemeralCacheControl(baseUrl, cacheRetention) {
	const retention = resolveCacheRetention(cacheRetention);
	if (retention === "none") return;
	const ttl = retention === "long" && (cacheRetention === "long" || isLongTtlEligibleEndpoint(baseUrl)) ? "1h" : void 0;
	return {
		type: "ephemeral",
		...ttl ? { ttl } : {}
	};
}
function applyAnthropicCacheControlToSystem(system, cacheControl) {
	if (!Array.isArray(system)) return;
	const normalizedBlocks = [];
	for (const block of system) {
		if (!block || typeof block !== "object") {
			normalizedBlocks.push(block);
			continue;
		}
		const record = block;
		if (record.type !== "text" || typeof record.text !== "string") {
			normalizedBlocks.push(block);
			continue;
		}
		const split = splitSystemPromptCacheBoundary(record.text);
		if (!split) {
			if (record.cache_control === void 0) record.cache_control = cacheControl;
			normalizedBlocks.push(record);
			continue;
		}
		const { cache_control: existingCacheControl, ...rest } = record;
		if (split.stablePrefix) normalizedBlocks.push({
			...rest,
			text: split.stablePrefix,
			cache_control: existingCacheControl ?? cacheControl
		});
		if (split.dynamicSuffix) normalizedBlocks.push({
			...rest,
			text: split.dynamicSuffix
		});
	}
	system.splice(0, system.length, ...normalizedBlocks);
}
function stripAnthropicSystemPromptBoundary(system) {
	if (!Array.isArray(system)) return;
	for (const block of system) {
		if (!block || typeof block !== "object") continue;
		const record = block;
		if (record.type === "text" && typeof record.text === "string") record.text = stripSystemPromptCacheBoundary(record.text);
	}
}
/** Apply one shared deepest-stable-message cache breakpoint policy. */
function applyAnthropicCacheControlToMessages(messages, cacheControl, markerLimit, cacheBreakpointOptOutMessageIndexes) {
	if (!Array.isArray(messages) || messages.length === 0 || markerLimit <= 0) return;
	let fallbackToolResult;
	for (let i = messages.length - 1; i >= 0; i--) {
		const message = messages[i];
		if (!message || typeof message !== "object") continue;
		const record = message;
		if (record.role !== "user" || cacheBreakpointOptOutMessageIndexes.has(i)) continue;
		const content = record.content;
		if (typeof content === "string") {
			if (fallbackToolResult && markerLimit === 1) {
				fallbackToolResult.cache_control = cacheControl;
				return;
			}
			record.content = [{
				type: "text",
				text: content,
				cache_control: cacheControl
			}];
			if (fallbackToolResult && markerLimit > 1) fallbackToolResult.cache_control = cacheControl;
			return;
		}
		if (!Array.isArray(content)) continue;
		for (let j = content.length - 1; j >= 0; j--) {
			const block = content[j];
			if (!block || typeof block !== "object") continue;
			const blockRecord = block;
			if (blockRecord.type === "text" || blockRecord.type === "image") {
				if (fallbackToolResult && markerLimit === 1) {
					fallbackToolResult.cache_control = cacheControl;
					return;
				}
				blockRecord.cache_control = cacheControl;
				if (fallbackToolResult && markerLimit > 1) fallbackToolResult.cache_control = cacheControl;
				return;
			}
			if (blockRecord.type === "tool_result" && fallbackToolResult === void 0) fallbackToolResult = blockRecord;
		}
	}
	if (fallbackToolResult) fallbackToolResult.cache_control = cacheControl;
}
function countAnthropicCacheControlMarkers(blocks) {
	if (!Array.isArray(blocks)) return 0;
	let count = 0;
	for (const block of blocks) if (block && typeof block === "object" && "cache_control" in block) count += 1;
	return count;
}
/** @deprecated Anthropic-family provider payload helper; do not use from third-party plugins. */
function resolveAnthropicPayloadPolicy(input) {
	return {
		allowsServiceTier: resolveProviderRequestCapabilities({
			provider: input.provider,
			api: input.api,
			baseUrl: input.baseUrl,
			capability: "llm",
			transport: "stream"
		}).allowsAnthropicServiceTier,
		cacheControl: input.enableCacheControl === true ? resolveAnthropicEphemeralCacheControl(input.baseUrl, input.cacheRetention) : void 0,
		serviceTier: input.serviceTier
	};
}
/** @deprecated Anthropic-family provider payload helper; do not use from third-party plugins. */
function applyAnthropicPayloadPolicyToParams(payloadObj, policy, cacheBreakpointOptOutMessageIndexes) {
	if (policy.allowsServiceTier && policy.serviceTier !== void 0 && payloadObj.service_tier === void 0) payloadObj.service_tier = policy.serviceTier;
	if (policy.cacheControl) applyAnthropicCacheControlToSystem(payloadObj.system, policy.cacheControl);
	else stripAnthropicSystemPromptBoundary(payloadObj.system);
	if (!policy.cacheControl) return;
	const usedMarkers = countAnthropicCacheControlMarkers(payloadObj.system) + countAnthropicCacheControlMarkers(payloadObj.tools);
	applyAnthropicCacheControlToMessages(payloadObj.messages, policy.cacheControl, ANTHROPIC_CACHE_CONTROL_LIMIT - usedMarkers, cacheBreakpointOptOutMessageIndexes);
}
/** @deprecated Anthropic-family provider payload helper; do not use from third-party plugins. */
function applyAnthropicEphemeralCacheControlMarkers(payloadObj, cacheControl = { type: "ephemeral" }) {
	const messages = payloadObj.messages;
	if (!Array.isArray(messages)) return;
	for (const message of messages) {
		if (message.role === "system" || message.role === "developer") {
			if (!cacheControl) continue;
			if (typeof message.content === "string") {
				message.content = [{
					type: "text",
					text: message.content,
					cache_control: cacheControl
				}];
				continue;
			}
			if (Array.isArray(message.content) && message.content.length > 0) {
				const last = message.content[message.content.length - 1];
				if (last && typeof last === "object") {
					const record = last;
					if (record.type !== "thinking" && record.type !== "redacted_thinking") record.cache_control = cacheControl;
				}
			}
			continue;
		}
		if (message.role === "assistant" && Array.isArray(message.content)) for (const block of message.content) {
			if (!block || typeof block !== "object") continue;
			const record = block;
			if (record.type === "thinking" || record.type === "redacted_thinking") delete record.cache_control;
		}
	}
}
//#endregion
//#region packages/media-core/src/base64.ts
/** Estimates decoded bytes without allocating a cleaned copy of the base64 payload. */
function estimateBase64DecodedBytes(base64) {
	let effectiveLen = 0;
	for (let i = 0; i < base64.length; i += 1) {
		if (base64.charCodeAt(i) <= 32) continue;
		effectiveLen += 1;
	}
	if (effectiveLen === 0) return 0;
	let padding = 0;
	let end = base64.length - 1;
	while (end >= 0 && base64.charCodeAt(end) <= 32) end -= 1;
	if (end >= 0 && base64[end] === "=") {
		padding = 1;
		end -= 1;
		while (end >= 0 && base64.charCodeAt(end) <= 32) end -= 1;
		if (end >= 0 && base64[end] === "=") padding = 2;
	}
	const estimated = Math.floor(effectiveLen * 3 / 4) - padding;
	return Math.max(0, estimated);
}
const CANONICALIZE_BASE64_CHUNK_SIZE = 8192;
function isBase64DataChar(code) {
	return code >= 65 && code <= 90 || code >= 97 && code <= 122 || code >= 48 && code <= 57 || code === 43 || code === 47;
}
function base64DataValue(code) {
	if (code >= 65 && code <= 90) return code - 65;
	if (code >= 97 && code <= 122) return code - 97 + 26;
	if (code >= 48 && code <= 57) return code - 48 + 52;
	return code === 43 ? 62 : 63;
}
/**
* Normalizes and validates a base64 string, returning canonical no-whitespace
* base64 only when the input has valid alphabet, padding, and length.
*/
function canonicalizeBase64(base64) {
	const chunks = [];
	let current = "";
	let cleanedLength = 0;
	let padding = 0;
	let sawPadding = false;
	let lastDataCode = 0;
	const append = (char) => {
		current += char;
		cleanedLength += 1;
		if (current.length >= CANONICALIZE_BASE64_CHUNK_SIZE) {
			chunks.push(current);
			current = "";
		}
	};
	for (let i = 0; i < base64.length; i += 1) {
		const code = base64.charCodeAt(i);
		if (code <= 32) continue;
		if (code === 61) {
			padding += 1;
			if (padding > 2) return;
			sawPadding = true;
			append("=");
			continue;
		}
		if (sawPadding || !isBase64DataChar(code)) return;
		lastDataCode = code;
		append(base64[i] ?? "");
	}
	if (cleanedLength === 0) return;
	const remainder = cleanedLength % 4;
	if (remainder !== 0) {
		if (sawPadding || remainder === 1) return;
		current += "=".repeat(4 - remainder);
	}
	const effectivePadding = remainder === 0 ? padding : 4 - remainder;
	const padBitMask = effectivePadding === 2 ? 15 : effectivePadding === 1 ? 3 : 0;
	if (padBitMask !== 0 && (base64DataValue(lastDataCode) & padBitMask) !== 0) return;
	if (current) chunks.push(current);
	return chunks.join("");
}
//#endregion
//#region packages/ai/src/internal/anthropic-inline-images.ts
const ANTHROPIC_IMAGE_MEDIA_TYPE_SET = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/webp"
]);
const ANTHROPIC_INLINE_IMAGES_DECODE_SAFETY_BYTES = 64 * 1024 * 1024;
function createAnthropicInlineImageBudget() {
	return { totalBytes: 0 };
}
function resolveAnthropicImageMediaType(value) {
	if (ANTHROPIC_IMAGE_MEDIA_TYPE_SET.has(value)) return value;
	throw new Error(`Unsupported Anthropic image media type after normalization: ${value}`);
}
async function normalizeAnthropicInlineContent(content, budget) {
	if (!content.some((block) => block.type === "image")) return content.filter((block) => block.type === "text");
	const inputBytes = content.reduce((total, block) => block.type === "image" ? total + estimateBase64DecodedBytes(block.data) : total, 0);
	if (budget.totalBytes + inputBytes > ANTHROPIC_INLINE_IMAGES_DECODE_SAFETY_BYTES) throw new Error("Anthropic inline images exceed the 64 MB aggregate decoded safety limit.");
	const normalized = [];
	for (const block of content) {
		if (block.type !== "image") {
			normalized.push(block);
			continue;
		}
		const normalizedBlocks = await getAiTransportHost().normalizeAnthropicInlineContentBlocks([block]);
		const outputBytes = normalizedBlocks.reduce((total, normalizedBlock) => normalizedBlock.type === "image" ? total + estimateBase64DecodedBytes(normalizedBlock.data) : total, 0);
		if (budget.totalBytes + outputBytes > ANTHROPIC_INLINE_IMAGES_DECODE_SAFETY_BYTES) throw new Error("Anthropic inline images exceed the 64 MB aggregate decoded safety limit.");
		budget.totalBytes += outputBytes;
		normalized.push(...normalizedBlocks);
	}
	return normalized;
}
//#endregion
//#region packages/ai/src/providers/anthropic-auth-headers.ts
function usesFoundryBearerAuth(model) {
	return model.provider === "microsoft-foundry" && (model.authHeader === true || hasBearerAuthorizationHeader(model.headers));
}
function hasBearerAuthorizationHeader(headers) {
	if (!headers) return false;
	return Object.entries(headers).some(([key, value]) => key.toLowerCase() === "authorization" && /^bearer\s+\S+/i.test(value.trim()));
}
function omitFoundryBearerCredentialHeaders(headers) {
	if (!headers) return;
	const next = {};
	for (const [key, value] of Object.entries(headers)) {
		const lower = key.toLowerCase();
		if (lower === "authorization" || lower === "x-api-key" || lower === "api-key") continue;
		next[key] = value;
	}
	return Object.keys(next).length > 0 ? next : void 0;
}
//#endregion
//#region packages/ai/src/providers/anthropic-refusal.ts
function readNullableString(value) {
	return typeof value === "string" && value.trim() ? value.trim() : null;
}
function readAnthropicRefusalDetails(value) {
	if (!value || typeof value !== "object") return {
		category: null,
		explanation: null
	};
	const details = value;
	return {
		category: readNullableString(details.category),
		explanation: readNullableString(details.explanation)
	};
}
function formatAnthropicRefusalMessage(details) {
	return `Anthropic refusal${details.category ? ` (category: ${details.category})` : ""}${details.explanation ? `: ${details.explanation}` : "."}`;
}
function applyAnthropicRefusal(output, stopDetails, provider) {
	const details = readAnthropicRefusalDetails(stopDetails);
	output.stopReason = "error";
	output.errorMessage = formatAnthropicRefusalMessage(details);
	output.diagnostics = [...output.diagnostics ?? [], {
		type: "provider_refusal",
		timestamp: Date.now(),
		details: {
			provider,
			category: details.category,
			explanation: details.explanation
		}
	}];
}
//#endregion
//#region packages/ai/src/providers/anthropic-server-fallback.ts
/** Anthropic beta that re-serves safety refusals on an allowed fallback model. */
const ANTHROPIC_SERVER_SIDE_FALLBACK_BETA = "server-side-fallback-2026-07-01";
/** Let Anthropic select the recommended model for each refusal category. */
const ANTHROPIC_SERVER_SIDE_FALLBACKS = "default";
const CLAUDE_OPUS_FALLBACK_MODEL_COST = {
	input: 5,
	output: 25,
	cacheRead: .5,
	cacheWrite: 6.25
};
function resolveFallbackModelIdentity(modelId) {
	if (!modelId?.trim()) return null;
	const ref = { id: modelId };
	const normalized = resolveClaudeModelIdentity(ref);
	if (normalized === "opus" || normalized === "opus-5" || resolveClaudeOpus5ModelIdentity(ref)) return "claude-opus-5";
	if (resolveClaudeFable5ModelIdentity(ref)) return "claude-fable-5";
	if (/^claude-opus-4-8(?=$|[^a-z0-9])/.test(normalized)) return "claude-opus-4-8";
	return normalized || null;
}
function isClaudeOpusFallbackModel(modelId) {
	return modelId === "claude-opus-5" || modelId === "claude-opus-4-8";
}
/** Resolve billed rates from the serving model reported by Anthropic's fallback stream. */
function resolveAnthropicFallbackServingModelCost(params) {
	const requestedModelId = resolveFallbackModelIdentity(params.requestedModelId);
	const servingModelId = resolveFallbackModelIdentity(params.servingModelId);
	if (!servingModelId || servingModelId === requestedModelId || !isClaudeOpusFallbackModel(servingModelId)) return params.requestedCost;
	if (requestedModelId && isClaudeOpusFallbackModel(requestedModelId)) return params.requestedCost;
	return CLAUDE_OPUS_FALLBACK_MODEL_COST;
}
function readBoundaryModel(value) {
	if (!value || typeof value !== "object") return null;
	const model = value.model;
	return typeof model === "string" && model.trim() ? model : null;
}
/** Reads a `fallback` content block marking where one model's output gives way to the next. */
function readAnthropicFallbackBoundary(block) {
	if (!block || typeof block !== "object") return null;
	const record = block;
	if (record.type !== "fallback") return null;
	return {
		fromModel: readBoundaryModel(record.from),
		toModel: readBoundaryModel(record.to)
	};
}
/**
* Drops pre-fallback thinking/tool calls while preserving the text prefix that
* the serving model continued. Dropped tool calls must never execute or replay.
*/
function applyAnthropicFallbackBoundary(params) {
	const { output, boundary } = params;
	const survivors = output.content.filter((block) => block.type === "text");
	for (const survivor of survivors) delete survivor.textSignature;
	output.content.splice(0, output.content.length, ...survivors);
	if (boundary.toModel) output.responseModel = boundary.toModel;
	output.diagnostics = [...output.diagnostics ?? [], {
		type: "provider_fallback",
		timestamp: Date.now(),
		details: {
			provider: params.provider,
			fromModel: boundary.fromModel,
			toModel: boundary.toModel
		}
	}];
}
//#endregion
//#region packages/ai/src/providers/anthropic-thinking-replay.ts
const ANTHROPIC_OMITTED_REASONING_TEXT = "[assistant reasoning omitted]";
function asReplayMessage(value) {
	return value && typeof value === "object" ? value : void 0;
}
/**
* Anthropic tool results continue the preceding assistant turn. Preserve that
* turn's signed thinking even when the next request disables new thinking.
*/
function findActiveAnthropicToolTurnAssistantIndex(messages) {
	const toolResultIds = /* @__PURE__ */ new Set();
	let index = messages.length - 1;
	while (index >= 0) {
		const message = asReplayMessage(messages[index]);
		if (message?.role !== "toolResult") break;
		if (typeof message.toolCallId === "string") toolResultIds.add(message.toolCallId);
		index -= 1;
	}
	if (toolResultIds.size === 0) return -1;
	const assistant = asReplayMessage(messages[index]);
	if (assistant?.role !== "assistant" || !Array.isArray(assistant.content)) return -1;
	const toolCallIds = /* @__PURE__ */ new Set();
	for (const block of assistant.content) {
		if (!block || typeof block !== "object") continue;
		const record = block;
		if ((record.type === "toolCall" || record.type === "tool_use" || record.type === "function_call") && typeof record.id === "string") toolCallIds.add(record.id);
	}
	return [...toolResultIds].every((toolCallId) => toolCallIds.has(toolCallId)) ? index : -1;
}
//#endregion
//#region packages/ai/src/providers/anthropic-tool-projection.ts
const CLAUDE_CODE_TOOL_LOOKUP = new Map([
	"Read",
	"Write",
	"Edit",
	"Bash",
	"Grep",
	"Glob",
	"AskUserQuestion",
	"EnterPlanMode",
	"ExitPlanMode",
	"KillShell",
	"NotebookEdit",
	"Skill",
	"Task",
	"TaskOutput",
	"TodoWrite",
	"WebFetch",
	"WebSearch"
].map((name) => [name.toLowerCase(), name]));
/** Preserve Claude Code's canonical tool casing for subscription OAuth requests. */
function toClaudeCodeToolName(name) {
	return CLAUDE_CODE_TOOL_LOOKUP.get(name.toLowerCase()) ?? name;
}
/** Anthropic rejects forced tools while extended thinking is enabled. */
function normalizeAnthropicToolChoice(thinkingEnabled, toolChoice) {
	if (thinkingEnabled && (toolChoice === "any" || typeof toolChoice === "object" && toolChoice.type === "tool")) return { type: "auto" };
	return typeof toolChoice === "string" ? { type: toolChoice } : toolChoice;
}
/** Anthropic tool identifiers accept only ASCII word characters and dashes. */
function normalizeAnthropicToolCallId(id) {
	return id.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 64);
}
function isProviderSupportedViolation(violation) {
	return violation.endsWith(".$dynamicRef") || violation.endsWith(".$dynamicAnchor");
}
const schemaValueKeywords = /* @__PURE__ */ new Set([
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
const schemaArrayKeywords = /* @__PURE__ */ new Set([
	"allOf",
	"anyOf",
	"oneOf",
	"prefixItems"
]);
const schemaMapKeywords = /* @__PURE__ */ new Set([
	"$defs",
	"definitions",
	"dependencies",
	"dependentSchemas",
	"patternProperties",
	"properties"
]);
function normalizeAnthropicJsonSchema(schema) {
	if (!isRecord(schema)) return schema;
	let changed = false;
	const normalized = { ...schema };
	for (const [key, value] of Object.entries(schema)) {
		if (schemaValueKeywords.has(key) && !Array.isArray(value)) {
			const next = normalizeAnthropicJsonSchema(value);
			normalized[key] = next;
			changed ||= next !== value;
			continue;
		}
		if (schemaArrayKeywords.has(key) && Array.isArray(value)) {
			const next = value.map(normalizeAnthropicJsonSchema);
			normalized[key] = next;
			changed ||= next.some((entry, index) => entry !== value[index]);
			continue;
		}
		if (schemaMapKeywords.has(key) && isRecord(value)) {
			const next = Object.fromEntries(Object.entries(value).map(([entryKey, entryValue]) => [entryKey, normalizeAnthropicJsonSchema(entryValue)]));
			normalized[key] = next;
			changed ||= Object.entries(value).some(([entryKey, entryValue]) => next[entryKey] !== entryValue);
		}
	}
	if (Array.isArray(schema.items)) {
		normalized.prefixItems = schema.items.map(normalizeAnthropicJsonSchema);
		const additionalItems = schema.additionalItems;
		if (typeof additionalItems === "boolean" || isRecord(additionalItems)) normalized.items = normalizeAnthropicJsonSchema(additionalItems);
		else delete normalized.items;
		delete normalized.additionalItems;
		changed = true;
	}
	return changed ? normalized : schema;
}
/** Snapshots direct/custom tool descriptors before Anthropic payload construction. */
function projectAnthropicTools(tools, toWireName) {
	const projectedTools = [];
	const unavailableOriginalNames = /* @__PURE__ */ new Set();
	for (const tool of tools) {
		let projectedTool;
		let originalName;
		try {
			const name = tool.name;
			originalName = name;
			if (!name) continue;
			const schemaProjection = projectRuntimeToolInputSchema(tool.parameters, `${name}.parameters`);
			if (!isRecord(schemaProjection.schema) || schemaProjection.violations.some((violation) => !isProviderSupportedViolation(violation))) {
				unavailableOriginalNames.add(name);
				continue;
			}
			const anthropicSchema = normalizeAnthropicJsonSchema(schemaProjection.schema);
			if (!isRecord(anthropicSchema)) {
				unavailableOriginalNames.add(name);
				continue;
			}
			const properties = anthropicSchema.properties;
			const required = anthropicSchema.required;
			if (properties !== void 0 && properties !== null && !isRecord(properties) || required !== void 0 && required !== null && (!Array.isArray(required) || required.some((entry) => typeof entry !== "string"))) {
				unavailableOriginalNames.add(name);
				continue;
			}
			let description;
			try {
				description = typeof tool.description === "string" ? tool.description : void 0;
			} catch {}
			projectedTool = {
				originalName: name,
				wireName: toWireName(name),
				...description ? { description } : {},
				inputSchema: {
					type: "object",
					properties: properties ?? {},
					required: required ?? []
				}
			};
		} catch {
			if (originalName) unavailableOriginalNames.add(originalName);
			continue;
		}
		const conflictingTool = projectedTools.find((entry) => entry.wireName === projectedTool.wireName);
		if (conflictingTool && conflictingTool.originalName !== projectedTool.originalName) throw new Error(`Anthropic tool names "${conflictingTool.originalName}" and "${projectedTool.originalName}" both map to "${projectedTool.wireName}"`);
		projectedTools.push(projectedTool);
	}
	return {
		inputToolCount: tools.length,
		unavailableOriginalNames,
		tools: sortPromptCacheToolsByName(projectedTools)
	};
}
/** Keeps forced Anthropic tool choices aligned with the projected wire names. */
function reconcileAnthropicToolChoice(choice, projection) {
	if (projection.inputToolCount === 0) return choice;
	if (choice.type === "tool") {
		const requestedName = choice.name;
		const originalMatch = projection.tools.find((tool) => tool.originalName === requestedName);
		if (originalMatch) return {
			...choice,
			name: originalMatch.wireName
		};
		if (projection.unavailableOriginalNames.has(requestedName)) throw new Error(`Anthropic tool_choice requested unavailable tool "${requestedName}" after schema conversion`);
		const matchedTool = projection.tools.find((tool) => tool.wireName === requestedName);
		if (!matchedTool) throw new Error(`Anthropic tool_choice requested unavailable tool "${requestedName}" after schema conversion`);
		return {
			...choice,
			name: matchedTool.wireName
		};
	}
	if (projection.tools.length === 0) {
		if (choice.type === "auto") return;
		if (choice.type === "any") throw new Error("Anthropic tool_choice requires a tool, but no tools survived schema conversion");
	}
	return choice;
}
/** Maps Claude Code wire names without trusting every direct/custom descriptor. */
function resolveOriginalAnthropicToolName(name, projection) {
	return projection?.tools.find((tool) => tool.wireName === name)?.originalName ?? name;
}
//#endregion
//#region packages/ai/src/providers/anthropic-usage.ts
function readAnthropicUsageTokenCount(value) {
	return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : void 0;
}
function readAnthropicCacheWriteUsage(usage) {
	if (!usage.cache_creation || typeof usage.cache_creation !== "object") return {};
	const cacheCreation = usage.cache_creation;
	const cacheWrite5m = readAnthropicUsageTokenCount(cacheCreation.ephemeral_5m_input_tokens);
	const cacheWrite1h = readAnthropicUsageTokenCount(cacheCreation.ephemeral_1h_input_tokens);
	return {
		...cacheWrite5m !== void 0 ? { cacheWrite5m } : {},
		...cacheWrite1h !== void 0 ? { cacheWrite1h } : {}
	};
}
function readAnthropicPromptUsageSnapshot(usage) {
	const input = readAnthropicUsageTokenCount(usage.input_tokens);
	const cacheRead = usage.cache_read_input_tokens == null ? 0 : readAnthropicUsageTokenCount(usage.cache_read_input_tokens);
	const cacheWrite = usage.cache_creation_input_tokens == null ? 0 : readAnthropicUsageTokenCount(usage.cache_creation_input_tokens);
	if (input === void 0 || cacheRead === void 0 || cacheWrite === void 0) return;
	return {
		input,
		cacheRead,
		cacheWrite
	};
}
function readLastAnthropicIterationUsage(usage) {
	if (usage.iterations == null) return { state: "absent" };
	if (!Array.isArray(usage.iterations) || usage.iterations.length === 0) return { state: "invalid" };
	const iteration = usage.iterations.at(-1);
	if (!iteration || typeof iteration !== "object" || Array.isArray(iteration)) return { state: "invalid" };
	const record = iteration;
	const input = readAnthropicUsageTokenCount(record.input_tokens);
	const cacheRead = readAnthropicUsageTokenCount(record.cache_read_input_tokens);
	const cacheWrite = readAnthropicUsageTokenCount(record.cache_creation_input_tokens);
	const outputTokens = readAnthropicUsageTokenCount(record.output_tokens);
	if (input === void 0 || cacheRead === void 0 || cacheWrite === void 0 || outputTokens === void 0) return { state: "invalid" };
	const contextPromptTokens = input + cacheRead + cacheWrite;
	return {
		state: "valid",
		usage: {
			contextPromptTokens,
			totalTokens: contextPromptTokens + outputTokens
		}
	};
}
/** Record independent billing buckets without treating zero placeholders as context proof. */
function applyAnthropicMessageStartUsage(target, payload) {
	const promptUsage = readAnthropicPromptUsageSnapshot(payload);
	const promptTokens = promptUsage ? promptUsage.input + promptUsage.cacheRead + promptUsage.cacheWrite : 0;
	const inputTokens = readAnthropicUsageTokenCount(payload.input_tokens);
	if (inputTokens !== void 0) target.input = inputTokens;
	const outputTokens = readAnthropicUsageTokenCount(payload.output_tokens);
	if (outputTokens !== void 0) target.output = outputTokens;
	const cacheReadTokens = payload.cache_read_input_tokens == null ? 0 : readAnthropicUsageTokenCount(payload.cache_read_input_tokens);
	if (cacheReadTokens !== void 0) target.cacheRead = cacheReadTokens;
	const cacheWriteTokens = payload.cache_creation_input_tokens == null ? 0 : readAnthropicUsageTokenCount(payload.cache_creation_input_tokens);
	if (cacheWriteTokens !== void 0) target.cacheWrite = cacheWriteTokens;
	const { cacheWrite1h } = readAnthropicCacheWriteUsage(payload);
	if (cacheWrite1h !== void 0) target.cacheWrite1h = cacheWrite1h;
	target.totalTokens = target.input + target.output + target.cacheRead + target.cacheWrite;
	if (promptTokens > 0 && outputTokens !== void 0) target.contextUsage = {
		state: "available",
		promptTokens,
		totalTokens: promptTokens + target.output
	};
	return promptTokens > 0 ? promptUsage : void 0;
}
/** Keep cumulative billing separate from the final server-side iteration context. */
function applyAnthropicMessageDeltaUsage(target, payload, messageStartPromptUsage) {
	const usage = payload ?? {};
	const inputTokens = readAnthropicUsageTokenCount(usage.input_tokens);
	if (inputTokens !== void 0) target.input = inputTokens;
	const outputTokens = readAnthropicUsageTokenCount(usage.output_tokens);
	if (outputTokens !== void 0) target.output = outputTokens;
	const cacheReadTokens = readAnthropicUsageTokenCount(usage.cache_read_input_tokens);
	if (cacheReadTokens !== void 0) target.cacheRead = cacheReadTokens;
	const cacheWriteTokens = readAnthropicUsageTokenCount(usage.cache_creation_input_tokens);
	if (cacheWriteTokens !== void 0) target.cacheWrite = cacheWriteTokens;
	const { cacheWrite1h } = readAnthropicCacheWriteUsage(usage);
	if (cacheWrite1h !== void 0) target.cacheWrite1h = cacheWrite1h;
	target.totalTokens = target.input + target.output + target.cacheRead + target.cacheWrite;
	const iterationUsage = readLastAnthropicIterationUsage(usage);
	if (iterationUsage.state === "valid") target.contextUsage = {
		state: "available",
		promptTokens: iterationUsage.usage.contextPromptTokens,
		totalTokens: iterationUsage.usage.totalTokens
	};
	else if (iterationUsage.state === "invalid") target.contextUsage = { state: "unavailable" };
	else if (outputTokens !== void 0 && (messageStartPromptUsage !== void 0 || inputTokens !== void 0 && cacheReadTokens !== void 0 && cacheWriteTokens !== void 0)) {
		const promptTokens = target.input + target.cacheRead + target.cacheWrite;
		target.contextUsage = {
			state: "available",
			promptTokens,
			totalTokens: promptTokens + target.output
		};
	} else target.contextUsage = { state: "unavailable" };
}
//#endregion
export { applyAnthropicPayloadPolicyToParams as A, usesFoundryBearerAuth as C, canonicalizeBase64 as D, resolveAnthropicImageMediaType as E, resolveAnthropicPayloadPolicy as M, applyAnthropicCacheControlToMessages as O, omitFoundryBearerCredentialHeaders as S, normalizeAnthropicInlineContent as T, CLAUDE_OPUS_FALLBACK_MODEL_COST as _, readAnthropicUsageTokenCount as a, resolveAnthropicFallbackServingModelCost as b, normalizeAnthropicToolChoice as c, resolveOriginalAnthropicToolName as d, toClaudeCodeToolName as f, ANTHROPIC_SERVER_SIDE_FALLBACK_BETA as g, ANTHROPIC_SERVER_SIDE_FALLBACKS as h, readAnthropicPromptUsageSnapshot as i, resolveAnthropicEphemeralCacheControl as j, applyAnthropicEphemeralCacheControlMarkers as k, projectAnthropicTools as l, findActiveAnthropicToolTurnAssistantIndex as m, applyAnthropicMessageStartUsage as n, readLastAnthropicIterationUsage as o, ANTHROPIC_OMITTED_REASONING_TEXT as p, readAnthropicCacheWriteUsage as r, normalizeAnthropicToolCallId as s, applyAnthropicMessageDeltaUsage as t, reconcileAnthropicToolChoice as u, applyAnthropicFallbackBoundary as v, createAnthropicInlineImageBudget as w, applyAnthropicRefusal as x, readAnthropicFallbackBoundary as y };
