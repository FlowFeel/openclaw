import { a as requiresClaudeMandatoryAdaptiveThinking, c as resolveClaudeMythos5ModelIdentity, d as resolveClaudeSonnet5ModelIdentity, g as supportsClaudeNativeXhighEffort, h as supportsClaudeNativeMaxEffort, i as requiresClaudeDefaultSampling, l as resolveClaudeNativeThinkingLevelMap, o as resolveClaudeFable5ModelIdentity, u as resolveClaudeOpus5ModelIdentity } from "./src-QkygScBs.mjs";
import { r as clampThinkingLevel } from "./model-utils-Dau5dlgm.mjs";
//#region packages/normalization-core/src/record-coerce.ts
/** Type guard for non-array object records at browser-safe boundaries. */
function isRecord(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
//#endregion
//#region packages/normalization-core/src/string-coerce.ts
/** Reads a value only when it is already a string, preserving whitespace. */
function readStringValue(value) {
	return typeof value === "string" ? value : void 0;
}
/** Trims string input and returns null for non-strings or empty strings. */
function normalizeNullableString(value) {
	if (typeof value !== "string") return null;
	const trimmed = value.trim();
	return trimmed ? trimmed : null;
}
/** Trims string input and returns undefined for non-strings or empty strings. */
function normalizeOptionalString(value) {
	return normalizeNullableString(value) ?? void 0;
}
/** Lowercases a normalized optional string. */
function normalizeOptionalLowercaseString(value) {
	return normalizeOptionalString(value)?.toLowerCase();
}
/** Lowercases a normalized string or returns an empty string when absent. */
function normalizeLowercaseStringOrEmpty(value) {
	return normalizeOptionalLowercaseString(value) ?? "";
}
/** Type guard for strings that remain non-empty after trimming. */
function hasNonEmptyString(value) {
	return normalizeOptionalString(value) !== void 0;
}
//#endregion
//#region packages/ai/src/providers/anthropic-model-contract.ts
const ANTHROPIC_CLAUDE_CODE_VERSION = "2.1.75";
const ANTHROPIC_CLAUDE_CODE_BILLING_SYSTEM_BLOCK = `x-anthropic-billing-header: cc_version=${ANTHROPIC_CLAUDE_CODE_VERSION}; cc_entrypoint=sdk-cli;`;
function normalizeModelId(modelId) {
	const normalized = normalizeLowercaseStringOrEmpty(modelId);
	return (normalized.startsWith("anthropic/") ? normalized.slice(10) : normalized).replace(/[._\s]+/g, "-");
}
function normalizeApi(api) {
	const normalized = normalizeLowercaseStringOrEmpty(api);
	return normalized === "openclaw-anthropic-messages-transport" ? "anthropic-messages" : normalized;
}
function hasConcreteResponseModel(ref) {
	const responseModelId = normalizeModelId(ref.responseModelId);
	return responseModelId.length > 0 && responseModelId !== normalizeModelId(ref.modelId);
}
function usesClaudeFable5MessagesContract(model) {
	return normalizeApi(model.api) === "anthropic-messages" && resolveClaudeFable5ModelIdentity(model) !== void 0;
}
/** Return whether streamed output must wait for the terminal refusal decision. */
function usesClaudeStreamingRefusalContract(model) {
	if (normalizeApi(model.api) !== "anthropic-messages") return false;
	return resolveClaudeFable5ModelIdentity(model) !== void 0 || resolveClaudeMythos5ModelIdentity(model) !== void 0 || resolveClaudeOpus5ModelIdentity(model) !== void 0 || resolveClaudeSonnet5ModelIdentity(model) !== void 0;
}
function requiresClaudeAdaptiveThinking(model) {
	if (normalizeApi(model.api) !== "anthropic-messages") return false;
	return requiresClaudeMandatoryAdaptiveThinking(model);
}
/** Return whether omitted thinking should default to adaptive/high. */
function defaultsClaudeAdaptiveThinking(model) {
	return requiresClaudeAdaptiveThinking(model) || normalizeApi(model.api) === "anthropic-messages" && (resolveClaudeOpus5ModelIdentity(model) !== void 0 || resolveClaudeSonnet5ModelIdentity(model) !== void 0);
}
/** Resolve provider-native effort once for direct and managed Claude requests. */
function resolveAnthropicThinkingEffort(model, level) {
	const requestedLevel = level;
	const thinkingLevelMap = resolveClaudeNativeThinkingLevelMap(model);
	const clampModel = {
		...model,
		...typeof model.params?.canonicalModelId === "string" ? { reasoning: true } : {},
		...thinkingLevelMap ? { thinkingLevelMap } : {}
	};
	const resolvedLevel = requestedLevel ? clampThinkingLevel(clampModel, requestedLevel) : void 0;
	const mapped = resolvedLevel ? thinkingLevelMap?.[resolvedLevel] : void 0;
	if (typeof mapped === "string") return mapped;
	switch (resolvedLevel) {
		case "off":
		case "minimal":
		case "low": return "low";
		case "medium": return "medium";
		case "xhigh": return supportsClaudeNativeXhighEffort(model) ? "xhigh" : "high";
		case "max": return supportsClaudeNativeMaxEffort(model) ? "max" : "high";
		default: return "high";
	}
}
/** Normalize Anthropic and Anthropic-compatible terminal reasons identically. */
function mapAnthropicStopReason(reason) {
	switch (reason) {
		case "end_turn":
		case "pause_turn":
		case "stop_sequence": return "stop";
		case "max_tokens": return "length";
		case "tool_use": return "toolUse";
		case "refusal":
		case "sensitive": return "error";
		default: throw new Error(`Unhandled stop reason: ${String(reason)}`);
	}
}
/** Remove unsupported assistant prefills while preserving completed tool-use turns. */
function prepareClaudeNoPrefillRequestContext(model, context) {
	if (!resolveClaudeOpus5ModelIdentity(model) && !resolveClaudeSonnet5ModelIdentity(model)) return context;
	let end = context.messages.length;
	while (end > 0) {
		const message = context.messages[end - 1];
		if (message?.role !== "assistant" || Array.isArray(message.content) && message.content.some((block) => block.type === "toolCall")) break;
		end -= 1;
	}
	return end === context.messages.length ? context : {
		...context,
		messages: context.messages.slice(0, end)
	};
}
function applyClaudeRequestContract(params, model) {
	if (normalizeApi(model.api) !== "anthropic-messages") return;
	const opus5 = resolveClaudeOpus5ModelIdentity(model) !== void 0;
	const sonnet5 = resolveClaudeSonnet5ModelIdentity(model) !== void 0;
	if (!requiresClaudeDefaultSampling(model) && !opus5 && !sonnet5) return;
	delete params.temperature;
	delete params.top_p;
	delete params.top_k;
	if (opus5 || sonnet5) delete params.service_tier;
}
function resolveReplayModelBoundIdentity(ref) {
	if (normalizeApi(ref.api) !== "anthropic-messages") return;
	const modelRef = hasConcreteResponseModel(ref) ? { id: ref.responseModelId } : {
		id: ref.modelId,
		params: ref.modelParams
	};
	const fableIdentity = resolveClaudeFable5ModelIdentity(modelRef);
	if (fableIdentity) return `fable:${fableIdentity}`;
	const mythosIdentity = resolveClaudeMythos5ModelIdentity(modelRef);
	if (mythosIdentity) return `mythos:${mythosIdentity}`;
	const opusIdentity = resolveClaudeOpus5ModelIdentity(modelRef);
	if (opusIdentity) return `opus:${opusIdentity}`;
	const sonnetIdentity = resolveClaudeSonnet5ModelIdentity(modelRef);
	return sonnetIdentity ? `sonnet:${sonnetIdentity}` : void 0;
}
function resolveModelBoundThinkingReplayMode(params) {
	const sourceApi = normalizeApi(params.source.api);
	const targetApi = normalizeApi(params.target.api);
	const sourceIdentity = resolveReplayModelBoundIdentity(params.source);
	const targetIdentity = resolveReplayModelBoundIdentity(params.target);
	const sameRoute = normalizeLowercaseStringOrEmpty(params.source.provider) === normalizeLowercaseStringOrEmpty(params.target.provider) && sourceApi === targetApi && normalizeModelId(params.source.modelId) === normalizeModelId(params.target.modelId);
	if (!sourceIdentity && !targetIdentity) return "default";
	if (!sourceIdentity && !hasConcreteResponseModel(params.source) && targetIdentity && sameRoute) return "preserve";
	return sourceApi === targetApi && sourceIdentity === targetIdentity ? "preserve" : "drop";
}
//#endregion
//#region packages/ai/src/transcript-transform.ts
const NON_VISION_USER_IMAGE_PLACEHOLDER = "(image omitted: model does not support images)";
const NON_VISION_TOOL_IMAGE_PLACEHOLDER = "(tool image omitted: model does not support images)";
function isImageWithMediaPayload(block) {
	return isRecord(block) && block.type === "image" && typeof block.data === "string" && block.data.trim().length > 0;
}
function replaceImagesWithPlaceholder(content, placeholder) {
	const result = [];
	let previousWasPlaceholder = false;
	for (const block of content) {
		if (block.type === "image") {
			if (!isImageWithMediaPayload(block)) continue;
			if (!previousWasPlaceholder) result.push({
				type: "text",
				text: placeholder
			});
			previousWasPlaceholder = true;
			continue;
		}
		result.push(block);
		previousWasPlaceholder = block.text === placeholder;
	}
	return result;
}
function downgradeUnsupportedImages(messages, model) {
	if (model.input.includes("image")) return messages;
	return messages.map((msg) => {
		if (msg.role === "user" && Array.isArray(msg.content)) return {
			...msg,
			content: replaceImagesWithPlaceholder(msg.content, NON_VISION_USER_IMAGE_PLACEHOLDER)
		};
		if (msg.role === "toolResult") return {
			...msg,
			content: replaceImagesWithPlaceholder(msg.content, NON_VISION_TOOL_IMAGE_PLACEHOLDER)
		};
		return msg;
	});
}
/**
* Normalize tool call ID for cross-provider compatibility.
* OpenAI Responses API generates IDs that are 450+ chars with special characters like `|`.
* Anthropic APIs require IDs matching ^[a-zA-Z0-9_-]+$ (max 64 chars).
*/
function transformMessages(messages, model, normalizeToolCallId) {
	const toolCallIdMap = /* @__PURE__ */ new Map();
	const transformed = downgradeUnsupportedImages(messages.map((msg) => msg.content == null ? {
		...msg,
		content: []
	} : msg), model).map((msg) => {
		if (msg.role === "user") return msg;
		if (msg.role === "toolResult") {
			const normalizedId = toolCallIdMap.get(msg.toolCallId);
			if (normalizedId && normalizedId !== msg.toolCallId) return Object.assign({}, msg, { toolCallId: normalizedId });
			return msg;
		}
		if (msg.role === "assistant") {
			const assistantMsg = msg;
			const modelBoundThinkingReplayMode = resolveModelBoundThinkingReplayMode({
				source: {
					provider: assistantMsg.provider,
					api: assistantMsg.api,
					modelId: assistantMsg.model,
					responseModelId: assistantMsg.responseModel
				},
				target: {
					provider: model.provider,
					api: model.api,
					modelId: model.id,
					modelParams: model.params
				}
			});
			const isSameModel = modelBoundThinkingReplayMode === "preserve" || assistantMsg.provider === model.provider && assistantMsg.api === model.api && assistantMsg.model === model.id;
			const transformedContent = (typeof assistantMsg.content === "string" ? [{
				type: "text",
				text: assistantMsg.content
			}] : assistantMsg.content).flatMap((block) => {
				if (block.type === "thinking") {
					if (modelBoundThinkingReplayMode === "drop") return [];
					if (block.redacted) return isSameModel ? block : [];
					if (isSameModel && block.thinkingSignature) return block;
					if (!block.thinking || block.thinking.trim() === "") return [];
					if (isSameModel) return block;
					return {
						type: "text",
						text: block.thinking
					};
				}
				if (block.type === "text") {
					if (isSameModel) return block;
					return {
						type: "text",
						text: block.text
					};
				}
				if (block.type === "toolCall") {
					const toolCall = block;
					let normalizedToolCall = toolCall;
					if (!isSameModel && toolCall.thoughtSignature) {
						normalizedToolCall = Object.assign({}, toolCall);
						delete normalizedToolCall.thoughtSignature;
					}
					if (!isSameModel && normalizeToolCallId) {
						const normalizedId = normalizeToolCallId(toolCall.id, model, assistantMsg);
						if (normalizedId !== toolCall.id) {
							toolCallIdMap.set(toolCall.id, normalizedId);
							normalizedToolCall = Object.assign({}, normalizedToolCall, { id: normalizedId });
						}
					}
					return normalizedToolCall;
				}
				return block;
			});
			return Object.assign({}, assistantMsg, { content: transformedContent });
		}
		return msg;
	});
	const result = [];
	let pendingToolCalls = [];
	let existingToolResultIds = /* @__PURE__ */ new Set();
	const insertSyntheticToolResults = () => {
		if (pendingToolCalls.length > 0) {
			for (const tc of pendingToolCalls) if (!existingToolResultIds.has(tc.id)) result.push({
				role: "toolResult",
				toolCallId: tc.id,
				toolName: tc.name,
				content: [{
					type: "text",
					text: "No result provided"
				}],
				isError: true,
				timestamp: Date.now()
			});
			pendingToolCalls = [];
			existingToolResultIds = /* @__PURE__ */ new Set();
		}
	};
	for (const msg of transformed) if (msg.role === "assistant") {
		insertSyntheticToolResults();
		const assistantMsg = msg;
		if (assistantMsg.stopReason === "error" || assistantMsg.stopReason === "aborted") continue;
		const toolCalls = assistantMsg.content.filter((b) => b.type === "toolCall");
		if (toolCalls.length > 0) {
			pendingToolCalls = toolCalls;
			existingToolResultIds = /* @__PURE__ */ new Set();
		}
		result.push(msg);
	} else if (msg.role === "toolResult") {
		existingToolResultIds.add(msg.toolCallId);
		result.push(msg);
	} else if (msg.role === "user") {
		insertSyntheticToolResults();
		result.push(msg);
	} else result.push(msg);
	insertSyntheticToolResults();
	return result;
}
//#endregion
//#region packages/ai/src/host.ts
const MAX_PENDING_CUSTOM_API_REGISTRATIONS = 32;
const pendingCustomApiRegistrations = [];
function queueCustomApiRegistration(registry, api, streamFn) {
	const existing = pendingCustomApiRegistrations.find((registration) => registration.registry === registry && registration.api === api);
	if (existing) {
		existing.streamFn = streamFn;
		return false;
	}
	if (pendingCustomApiRegistrations.length >= MAX_PENDING_CUSTOM_API_REGISTRATIONS) throw new Error("Too many custom transport APIs were registered before host configuration");
	pendingCustomApiRegistrations.push({
		registry,
		api,
		streamFn
	});
	return false;
}
const inertAiTransportHost = {
	buildModelFetch: () => void 0,
	resolveSecretSentinel: (value) => value,
	redactSecrets: (value) => value,
	redactToolPayloadText: (text) => text,
	normalizeAnthropicInlineContentBlocks: async (content) => [...content],
	resolveOpenAIStrictToolSetting: (_model, options) => options?.supportsStrictMode ? false : void 0,
	plugin: {
		resolveProviderStream: () => void 0,
		resolveTransportTurnState: () => void 0,
		wrapSimpleCompletionStream: () => void 0,
		createAnthropicVertexStream: () => {
			throw new Error("Anthropic Vertex transport is not configured by the embedding host");
		}
	},
	buildCopilotDynamicHeaders: () => ({}),
	resolveProviderEndpointClass: () => "default",
	resolveProviderRequestCapabilities: () => ({
		endpointClass: "default",
		knownProviderFamily: "",
		supportsNativeStreamingUsageCompat: false,
		supportsOpenAICompletionsStreamingUsageCompat: false,
		usesExplicitProxyLikeEndpoint: false,
		allowsAnthropicServiceTier: false
	}),
	resolveProviderRequestHeaders: ({ providerHeaders, callerHeaders, precedence }) => ({
		...precedence === "caller-wins" ? providerHeaders : callerHeaders,
		...precedence === "caller-wins" ? callerHeaders : providerHeaders
	}),
	resolveModelRequestTimeoutMs: () => void 0,
	requiresManagedTransport: () => false,
	inheritManagedTransport: (_source, target) => target,
	transformTransportMessages: (messages, model, normalizeToolCallId) => transformMessages(messages, model, normalizeToolCallId),
	registerCustomApi: queueCustomApiRegistration,
	prepareGoogleSimpleCompletionModel: (_registry, model) => model,
	logDebug: () => {},
	logInfo: () => {},
	logWarn: () => {}
};
let activeAiTransportHost = inertAiTransportHost;
/** Installs host implementations for the transport policy ports. */
function configureAiTransportHost(host) {
	activeAiTransportHost = {
		...inertAiTransportHost,
		...host,
		normalizeAnthropicInlineContentBlocks: host.normalizeAnthropicInlineContentBlocks ?? inertAiTransportHost.normalizeAnthropicInlineContentBlocks,
		plugin: {
			...inertAiTransportHost.plugin,
			...host.plugin
		}
	};
	const transportHost = activeAiTransportHost;
	if (transportHost.registerCustomApi === inertAiTransportHost.registerCustomApi || pendingCustomApiRegistrations.length === 0) return;
	const pending = pendingCustomApiRegistrations.splice(0);
	for (const [index, registration] of pending.entries()) try {
		transportHost.registerCustomApi(registration.registry, registration.api, registration.streamFn);
	} catch (error) {
		pendingCustomApiRegistrations.unshift(...pending.slice(index));
		throw error;
	}
}
/** Returns the active transport host (inert defaults unless configured). */
function getAiTransportHost() {
	return activeAiTransportHost;
}
/** Resolves sentinel substrings in custom headers at a no-fetch adapter boundary. */
function resolveAiTransportHeaderSentinels(headers) {
	if (!headers) return;
	const host = getAiTransportHost();
	let resolvedHeaders;
	for (const [name, value] of Object.entries(headers)) {
		const resolved = host.resolveSecretSentinel(value);
		if (resolved !== value) {
			resolvedHeaders ??= { ...headers };
			resolvedHeaders[name] = resolved;
		}
	}
	return resolvedHeaders ?? headers;
}
//#endregion
export { normalizeLowercaseStringOrEmpty as _, ANTHROPIC_CLAUDE_CODE_BILLING_SYSTEM_BLOCK as a, isRecord as b, defaultsClaudeAdaptiveThinking as c, requiresClaudeAdaptiveThinking as d, resolveAnthropicThinkingEffort as f, hasNonEmptyString as g, usesClaudeStreamingRefusalContract as h, transformMessages as i, mapAnthropicStopReason as l, usesClaudeFable5MessagesContract as m, getAiTransportHost as n, ANTHROPIC_CLAUDE_CODE_VERSION as o, resolveModelBoundThinkingReplayMode as p, resolveAiTransportHeaderSentinels as r, applyClaudeRequestContract as s, configureAiTransportHost as t, prepareClaudeNoPrefillRequestContext as u, normalizeOptionalString as v, readStringValue as y };
