import { _ as normalizeLowercaseStringOrEmpty, b as isRecord, i as transformMessages } from "./host-Bl7Kgddo.mjs";
import { t as sanitizeSurrogates } from "./sanitize-unicode-DT5o51ur.mjs";
import { a as isImageWithMediaPayload, h as stripSystemPromptCacheBoundary, o as truncateUtf16Safe, r as extractToolResultText, t as describeToolResultMediaPlaceholder } from "./tool-result-text-Dvkp2Dus.mjs";
import { o as resolveProviderRequestCapabilities } from "./tool-schema-json-projection-B1b-XCn5.mjs";
import { randomUUID } from "node:crypto";
//#region packages/ai/src/utils/assistant-text-phase.ts
function isAssistantTextPhaseBlock(block) {
	if (!block || typeof block !== "object") return false;
	const record = block;
	return record.type === "text" && typeof record.text === "string";
}
function encodeAssistantTextSignatureV1(id, phase) {
	return JSON.stringify({
		v: 1,
		id,
		...phase ? { phase } : {}
	});
}
/** Tags unphased narration before a tool-call event becomes consumer-visible. */
function tagPendingCommentaryText(content) {
	const textBlocks = content.filter(isAssistantTextPhaseBlock);
	let commentaryIndex = textBlocks.filter((block) => block.textSignature !== void 0).length;
	const tagged = /* @__PURE__ */ new Map();
	for (const block of textBlocks) {
		if (block.text.trim().length === 0 || block.textSignature !== void 0) continue;
		const signature = encodeAssistantTextSignatureV1(`commentary-${commentaryIndex}`, "commentary");
		block.textSignature = signature;
		tagged.set(block, signature);
		commentaryIndex += 1;
	}
	return tagged;
}
/** Rolls back only the exact provisional signatures created by this transport turn. */
function clearPendingCommentaryText(tags) {
	for (const [block, signature] of tags) if (block.textSignature === signature) delete block.textSignature;
	tags.clear();
}
function rememberPendingCommentaryTags(target, tagged) {
	for (const [block, signature] of tagged) target.set(block, signature);
}
//#endregion
//#region packages/ai/src/providers/openai-response-format.ts
const JSON_SCHEMA_RESPONSE_FORMAT_NAME = "openclaw_response";
const OLLAMA_CLOUD_ORIGIN = "https://ollama.com";
function isKnownOpenAIJsonSchemaModelId(modelId) {
	if (typeof modelId !== "string") return false;
	if (/^gpt-5(?:[.-]|$)/i.test(modelId) || /^gpt-4\.1(?:-|$)/i.test(modelId)) return true;
	const gpt4o = /^gpt-4o(-mini)?(?:-(\d{4}-\d{2}-\d{2}))?$/i.exec(modelId);
	if (gpt4o) {
		const snapshot = gpt4o[2];
		return !snapshot || snapshot >= (gpt4o[1] ? "2024-07-18" : "2024-08-06");
	}
	return /^(?:o1|o3(?:-mini|-pro)?|o4-mini)(?:-\d{4}-\d{2}-\d{2})?$/i.test(modelId);
}
function shouldOmitOllamaCompatResponseFormat(params) {
	if (!params.provider.includes("ollama")) return false;
	if (params.hasTools()) return true;
	try {
		return new URL(params.baseUrl).origin === OLLAMA_CLOUD_ORIGIN;
	} catch {
		return false;
	}
}
/**
* Maps the shared JSON Schema option to Chat Completions while preserving the
* older provider-shaped json_object/json_schema inputs accepted by model params.
*/
function resolveOpenAICompletionsResponseFormat(responseFormat, supportsJsonSchemaResponseFormat) {
	if (!responseFormat) return;
	if (responseFormat.type === "json_object") return responseFormat;
	if (responseFormat.type === "text") return responseFormat;
	if (responseFormat.type === "json_schema" && isRecord(responseFormat.json_schema)) return responseFormat;
	if (!supportsJsonSchemaResponseFormat) return;
	return {
		type: "json_schema",
		json_schema: {
			name: JSON_SCHEMA_RESPONSE_FORMAT_NAME,
			schema: responseFormat
		}
	};
}
//#endregion
//#region packages/ai/src/transports/openai-completions-compat.ts
function isDefaultRouteProvider(provider, ...ids) {
	return provider !== void 0 && ids.includes(provider);
}
/** Resolves default request flags for an OpenAI-compatible completions endpoint. */
function resolveOpenAICompletionsCompatDefaults(input) {
	const { provider, modelId, endpointClass, knownProviderFamily, supportsNativeStreamingUsageCompat = false, supportsOpenAICompletionsStreamingUsageCompat = false, usesExplicitProxyLikeEndpoint = false } = input;
	const isDefaultRoute = endpointClass === "default";
	const usesConfiguredNonOpenAIEndpoint = endpointClass !== "default" && endpointClass !== "openai-public";
	const isMoonshot = knownProviderFamily === "moonshot" || endpointClass === "moonshot-native";
	const isMoonshotLike = isMoonshot || knownProviderFamily === "modelstudio" || endpointClass === "modelstudio-native";
	const isModelStudioLike = knownProviderFamily === "modelstudio" || endpointClass === "modelstudio-native" || isDefaultRoute && isDefaultRouteProvider(provider, "dashscope", "modelstudio", "qwen");
	const isZai = endpointClass === "zai-native" || isDefaultRoute && isDefaultRouteProvider(input.provider, "zai");
	const isDeepSeek = endpointClass === "deepseek-native" || isDefaultRoute && isDefaultRouteProvider(input.provider, "deepseek");
	const isTogether = knownProviderFamily === "together" || input.baseUrl?.includes("api.together.ai") === true || input.baseUrl?.includes("api.together.xyz") === true || isDefaultRoute && isDefaultRouteProvider(input.provider, "together");
	const isCloudflareAiGateway = provider === "cloudflare-ai-gateway" || input.baseUrl?.includes("gateway.ai.cloudflare.com") === true;
	const isXiaomi = endpointClass === "xiaomi-native" || isDefaultRoute && isDefaultRouteProvider(input.provider, "xiaomi");
	const isNonStandard = endpointClass === "cerebras-native" || endpointClass === "chutes-native" || endpointClass === "deepseek-native" || endpointClass === "mistral-public" || endpointClass === "opencode-native" || endpointClass === "xai-native" || isXiaomi || isZai || isDefaultRoute && isDefaultRouteProvider(input.provider, "cerebras", "chutes", "deepseek", "opencode", "xai");
	const isOpenRouterLike = input.provider === "openrouter" || endpointClass === "openrouter";
	const isLocalEndpoint = endpointClass === "local";
	const usesMaxTokens = endpointClass === "chutes-native" || endpointClass === "mistral-public" || knownProviderFamily === "mistral" || isMoonshot || isCloudflareAiGateway || isZai || isTogether || isDefaultRoute && isDefaultRouteProvider(provider, "chutes");
	return {
		supportsStore: !isNonStandard && knownProviderFamily !== "mistral" && !usesExplicitProxyLikeEndpoint,
		supportsDeveloperRole: !isNonStandard && !isMoonshotLike && !usesConfiguredNonOpenAIEndpoint,
		supportsReasoningEffort: !isZai && !isTogether && knownProviderFamily !== "mistral" && endpointClass !== "xai-native" && !usesExplicitProxyLikeEndpoint,
		supportsUsageInStreaming: supportsOpenAICompletionsStreamingUsageCompat || !isNonStandard && (isLocalEndpoint || !usesConfiguredNonOpenAIEndpoint || supportsNativeStreamingUsageCompat),
		maxTokensField: usesMaxTokens ? "max_tokens" : "max_completion_tokens",
		thinkingFormat: isDeepSeek || isXiaomi ? "deepseek" : isZai ? "zai" : isTogether ? "together" : isOpenRouterLike ? "openrouter" : "openai",
		visibleReasoningDetailTypes: isOpenRouterLike ? ["response.output_text", "response.text"] : [],
		supportsStrictMode: !isZai && !usesConfiguredNonOpenAIEndpoint,
		supportsJsonSchemaResponseFormat: (endpointClass === "openai-public" || isDefaultRoute && isDefaultRouteProvider(provider, "openai")) && isKnownOpenAIJsonSchemaModelId(modelId),
		requiresReasoningContentOnAssistantMessages: isDeepSeek || isXiaomi,
		requiresNonEmptyUserOrAssistantMessage: isModelStudioLike,
		cacheControlFormat: provider === "openrouter" && modelId?.startsWith("anthropic/") === true ? "anthropic" : void 0,
		sessionAffinityFormat: isOpenRouterLike ? "openrouter" : "openai",
		supportsLongCacheRetention: provider !== "cloudflare-workers-ai" && provider !== "cloudflare-ai-gateway" && knownProviderFamily !== "together" && !input.baseUrl?.includes("api.cloudflare.com") && !input.baseUrl?.includes("gateway.ai.cloudflare.com") && !input.baseUrl?.includes("api.together.ai") && !input.baseUrl?.includes("api.together.xyz")
	};
}
function resolveOpenAICompletionsCompatDefaultsFromCapabilities(input) {
	return resolveOpenAICompletionsCompatDefaults(input);
}
/** Detects endpoint capabilities and defaults for an OpenAI-completions model. */
function detectOpenAICompletionsCompat(model, resolveCapabilities = resolveProviderRequestCapabilities) {
	const capabilities = resolveCapabilities({
		provider: model.provider,
		api: "openai-completions",
		baseUrl: model.baseUrl,
		capability: "llm",
		transport: "stream",
		modelId: model.id,
		compat: model.compat && typeof model.compat === "object" ? model.compat : void 0
	});
	return {
		capabilities,
		defaults: resolveOpenAICompletionsCompatDefaultsFromCapabilities({
			provider: model.provider,
			modelId: model.id,
			baseUrl: model.baseUrl,
			...capabilities
		})
	};
}
function resolveSessionAffinity(model, detectedFormat) {
	if (model.compat?.sendSessionAffinityHeaders !== true) return "none";
	if (detectedFormat === "openrouter" || model.compat.thinkingFormat === "openrouter" || model.compat.openRouterRouting !== void 0) return "openrouter";
	return "openai";
}
/** Applies explicit model overrides once on top of the canonical transport defaults. */
function resolveOpenAICompletionsCompat(model, resolveCapabilities = resolveProviderRequestCapabilities) {
	const { defaults } = detectOpenAICompletionsCompat(model, resolveCapabilities);
	const configured = model.compat;
	return {
		supportsStore: configured?.supportsStore ?? defaults.supportsStore,
		supportsDeveloperRole: configured?.supportsDeveloperRole ?? defaults.supportsDeveloperRole,
		supportsReasoningEffort: configured?.supportsReasoningEffort ?? defaults.supportsReasoningEffort,
		supportsUsageInStreaming: configured?.supportsUsageInStreaming ?? defaults.supportsUsageInStreaming,
		maxTokensField: configured?.maxTokensField ?? defaults.maxTokensField,
		requiresToolResultName: configured?.requiresToolResultName ?? false,
		requiresAssistantAfterToolResult: configured?.requiresAssistantAfterToolResult ?? false,
		requiresThinkingAsText: configured?.requiresThinkingAsText ?? false,
		requiresReasoningContentOnAssistantMessages: configured?.requiresReasoningContentOnAssistantMessages ?? defaults.requiresReasoningContentOnAssistantMessages,
		thinkingFormat: configured?.thinkingFormat ?? defaults.thinkingFormat,
		openRouterRouting: configured?.openRouterRouting,
		vercelGatewayRouting: configured?.vercelGatewayRouting ?? {},
		zaiToolStream: configured?.zaiToolStream ?? false,
		supportsStrictMode: configured?.supportsStrictMode ?? defaults.supportsStrictMode,
		supportsJsonSchemaResponseFormat: configured?.supportsJsonSchemaResponseFormat ?? defaults.supportsJsonSchemaResponseFormat,
		cacheControlFormat: configured?.cacheControlFormat ?? defaults.cacheControlFormat,
		sessionAffinity: resolveSessionAffinity(model, defaults.sessionAffinityFormat),
		supportsPromptCacheKey: configured?.supportsPromptCacheKey ?? false,
		supportsLongCacheRetention: configured?.supportsLongCacheRetention ?? defaults.supportsLongCacheRetention,
		visibleReasoningDetailTypes: configured && "visibleReasoningDetailTypes" in configured ? configured.visibleReasoningDetailTypes ?? defaults.visibleReasoningDetailTypes : defaults.visibleReasoningDetailTypes,
		requiresNonEmptyUserOrAssistantMessage: defaults.requiresNonEmptyUserOrAssistantMessage
	};
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.openAICompletionsCompatTestApi")] = { resolveOpenAICompletionsCompatDefaults };
//#endregion
//#region packages/ai/src/openai-completions-messages.ts
const EMPTY_TOOL_RESULT_TEXT = "(no output)";
function isTextContentBlock(block) {
	return block.type === "text";
}
function isThinkingContentBlock(block) {
	return block.type === "thinking";
}
function isToolCallBlock(block) {
	return block.type === "toolCall";
}
function sanitizeToolResultText(text, fallback) {
	const sanitized = sanitizeSurrogates(text);
	return sanitized.trim().length > 0 ? sanitized : fallback;
}
/** Convert a normalized transcript to OpenAI Chat Completions messages. */
function convertMessages(model, context, compat, options = {}) {
	const params = [];
	const normalizeToolCallId = (id) => {
		if (id.includes("|")) return id.slice(0, id.indexOf("|")).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
		if (model.provider === "openai") return id.length > 40 ? truncateUtf16Safe(id, 40) : id;
		return id;
	};
	const transformedMessages = transformMessages(context.messages, model, (id) => normalizeToolCallId(id));
	if (context.systemPrompt) {
		const role = model.reasoning && compat.supportsDeveloperRole ? "developer" : "system";
		const systemPrompt = options.preserveSystemPromptCacheBoundary ? context.systemPrompt : stripSystemPromptCacheBoundary(context.systemPrompt);
		params.push({
			role,
			content: sanitizeSurrogates(systemPrompt)
		});
	}
	let lastRole = null;
	for (let i = 0; i < transformedMessages.length; i++) {
		const msg = transformedMessages[i];
		if (!msg) continue;
		if (compat.requiresAssistantAfterToolResult && lastRole === "toolResult" && msg.role === "user") params.push({
			role: "assistant",
			content: "I have processed the tool results."
		});
		if (msg.role === "user") {
			const isRuntimeContextCarrier = msg.runtimeContextCarrier === true;
			if (typeof msg.content === "string") {
				const userParam = {
					role: "user",
					content: sanitizeSurrogates(msg.content)
				};
				if (isRuntimeContextCarrier) options.cacheOptOutIndexes?.add(params.length);
				params.push(userParam);
			} else {
				const content = msg.content.map((item) => {
					if (item.type === "text") return {
						type: "text",
						text: sanitizeSurrogates(item.text)
					};
					return {
						type: "image_url",
						image_url: { url: `data:${item.mimeType};base64,${item.data}` }
					};
				});
				if (content.length === 0) continue;
				const userParam = {
					role: "user",
					content
				};
				if (isRuntimeContextCarrier) options.cacheOptOutIndexes?.add(params.length);
				params.push(userParam);
			}
		} else if (msg.role === "assistant") {
			const assistantMsg = {
				role: "assistant",
				content: compat.requiresAssistantAfterToolResult ? "" : null
			};
			const assistantTextParts = msg.content.filter(isTextContentBlock).filter((block) => block.text.trim().length > 0).map((block) => ({
				type: "text",
				text: sanitizeSurrogates(block.text)
			}));
			const assistantText = assistantTextParts.map((part) => part.text).join("\n");
			const nonEmptyThinkingBlocks = msg.content.filter(isThinkingContentBlock).filter((block) => block.thinking.trim().length > 0);
			if (nonEmptyThinkingBlocks.length > 0) if (compat.requiresThinkingAsText) assistantMsg.content = [{
				type: "text",
				text: nonEmptyThinkingBlocks.map((block) => sanitizeSurrogates(block.thinking)).join("\n\n")
			}, ...assistantTextParts];
			else {
				if (assistantText.length > 0) assistantMsg.content = assistantText;
				let signature = nonEmptyThinkingBlocks.at(0)?.thinkingSignature;
				if (model.provider === "opencode-go" && signature === "reasoning") signature = "reasoning_content";
				if (signature && signature.length > 0) assistantMsg[signature] = nonEmptyThinkingBlocks.map((block) => block.thinking).join("\n");
			}
			else if (assistantText.length > 0) assistantMsg.content = assistantText;
			const toolCalls = msg.content.filter(isToolCallBlock);
			if (toolCalls.length > 0) {
				assistantMsg.tool_calls = toolCalls.map((toolCall) => ({
					id: toolCall.id,
					type: "function",
					function: {
						name: toolCall.name,
						arguments: JSON.stringify(toolCall.arguments)
					}
				}));
				const reasoningDetails = toolCalls.flatMap((toolCall) => {
					const signature = toolCall.thoughtSignature;
					if (!signature) return [];
					try {
						const parsed = JSON.parse(signature);
						return parsed ? [parsed] : [];
					} catch {
						return [];
					}
				});
				if (reasoningDetails.length > 0) assistantMsg.reasoning_details = reasoningDetails;
			}
			if (compat.requiresReasoningContentOnAssistantMessages && model.reasoning && assistantMsg.reasoning_content === void 0) assistantMsg.reasoning_content = "";
			const content = assistantMsg.content;
			if (!(content !== null && content !== void 0 && (typeof content === "string" ? content.length > 0 : content.length > 0)) && !assistantMsg.tool_calls) continue;
			params.push(assistantMsg);
		} else if (msg.role === "toolResult") {
			const imageBlocks = [];
			let j = i;
			while (j < transformedMessages.length) {
				const toolMsg = transformedMessages.at(j);
				if (toolMsg?.role !== "toolResult") break;
				const textResult = extractToolResultText(toolMsg.content);
				const mediaPlaceholder = describeToolResultMediaPlaceholder(toolMsg.content);
				const hasImages = toolMsg.content.some(isImageWithMediaPayload);
				const toolResultMsg = {
					role: "tool",
					content: sanitizeToolResultText(textResult, mediaPlaceholder ?? EMPTY_TOOL_RESULT_TEXT),
					tool_call_id: toolMsg.toolCallId
				};
				if (compat.requiresToolResultName && toolMsg.toolName) toolResultMsg.name = toolMsg.toolName;
				params.push(toolResultMsg);
				if (hasImages && model.input.includes("image")) {
					for (const block of toolMsg.content) if (isImageWithMediaPayload(block)) imageBlocks.push({
						type: "image_url",
						image_url: { url: `data:${block.mimeType};base64,${block.data}` }
					});
				}
				j += 1;
			}
			i = j - 1;
			if (imageBlocks.length > 0) {
				if (compat.requiresAssistantAfterToolResult) params.push({
					role: "assistant",
					content: "I have processed the tool results."
				});
				params.push({
					role: "user",
					content: [{
						type: "text",
						text: "Attached image(s) from tool result:"
					}, ...imageBlocks]
				});
				lastRole = "user";
			} else lastRole = "toolResult";
			continue;
		}
		lastRole = msg.role;
	}
	return params;
}
//#endregion
//#region packages/ai/src/providers/openai-completions-tool-calls.ts
const MAX_BUFFERED_LEGACY_TOOL_CALL_ARGUMENT_BYTES = 256e3;
const MAX_BUFFERED_LEGACY_FOLLOWING_DELTA_BYTES = 256e3;
const MAX_BUFFERED_LEGACY_FOLLOWING_DELTAS = 1024;
/** Normalize the SDK's legacy single-function lane into its modern tool-call shape. */
function createOpenAICompletionsToolCallDeltaNormalizer() {
	let sawModernToolCall = false;
	let pendingLegacyArgumentBytes = 0;
	let pendingFollowingDeltaBytes = 0;
	let pendingLegacyToolCall;
	const pendingFollowingDeltas = [];
	const takePendingFollowingDeltas = () => {
		pendingFollowingDeltaBytes = 0;
		return pendingFollowingDeltas.splice(0).map((delta) => ({
			delta,
			toolCalls: []
		}));
	};
	const bufferFollowingDelta = (delta) => {
		const nextDeltaBytes = Buffer.byteLength(JSON.stringify(delta), "utf8");
		if (pendingFollowingDeltaBytes + nextDeltaBytes > MAX_BUFFERED_LEGACY_FOLLOWING_DELTA_BYTES || pendingFollowingDeltas.length >= MAX_BUFFERED_LEGACY_FOLLOWING_DELTAS) throw new Error("Exceeded legacy tool-call content buffer limit");
		pendingFollowingDeltaBytes += nextDeltaBytes;
		pendingFollowingDeltas.push(delta);
	};
	const withoutToolCalls = (delta) => {
		const ordinaryDelta = { ...delta };
		delete ordinaryDelta.function_call;
		delete ordinaryDelta.tool_calls;
		return ordinaryDelta;
	};
	const hasObservableContent = (value) => {
		if (typeof value === "string") return value.length > 0;
		if (Array.isArray(value)) return value.some(hasObservableContent);
		if (isRecord(value)) return Object.entries(value).some(([field, nestedValue]) => field !== "type" && field !== "id" && field !== "index" && hasObservableContent(nestedValue));
		return false;
	};
	const hasOrdinaryContent = (delta) => Object.entries(delta).some(([field, value]) => field !== "role" && hasObservableContent(value));
	return (delta, finishReason) => {
		const ordinaryDelta = withoutToolCalls(delta);
		if (delta.tool_calls && delta.tool_calls.length > 0) {
			const precedingDeltas = takePendingFollowingDeltas();
			sawModernToolCall = true;
			pendingLegacyArgumentBytes = 0;
			pendingLegacyToolCall = void 0;
			return [...precedingDeltas, {
				delta: ordinaryDelta,
				toolCalls: delta.tool_calls
			}];
		}
		const functionCall = delta.function_call;
		if (sawModernToolCall) return [{
			delta: ordinaryDelta,
			toolCalls: []
		}];
		const hadPendingLegacyCall = pendingLegacyToolCall !== void 0;
		const leadingDeltas = [];
		if (hasOrdinaryContent(ordinaryDelta)) if (hadPendingLegacyCall) bufferFollowingDelta(ordinaryDelta);
		else leadingDeltas.push({
			delta: ordinaryDelta,
			toolCalls: []
		});
		if (functionCall && (functionCall.name || functionCall.arguments)) {
			const nextFunctionName = pendingLegacyToolCall?.function?.name ? void 0 : functionCall.name;
			const nextArgumentBytes = Buffer.byteLength(functionCall.arguments ?? "", "utf8") + Buffer.byteLength(nextFunctionName ?? "", "utf8");
			if (pendingLegacyArgumentBytes + nextArgumentBytes > MAX_BUFFERED_LEGACY_TOOL_CALL_ARGUMENT_BYTES) throw new Error("Exceeded tool-call argument buffer limit");
			pendingLegacyArgumentBytes += nextArgumentBytes;
			pendingLegacyToolCall ??= {
				index: 0,
				id: `call_${randomUUID().replaceAll("-", "").slice(0, 24)}`,
				type: "function",
				function: {}
			};
			const pendingFunction = pendingLegacyToolCall.function ??= {};
			if (nextFunctionName) pendingFunction.name = nextFunctionName;
			if (functionCall.arguments) pendingFunction.arguments = (pendingFunction.arguments ?? "") + functionCall.arguments;
		}
		if (!pendingLegacyToolCall) return leadingDeltas.length > 0 ? leadingDeltas : [{
			delta: ordinaryDelta,
			toolCalls: []
		}];
		if (finishReason === "function_call") {
			const confirmedLegacyToolCall = pendingLegacyToolCall;
			pendingLegacyToolCall = void 0;
			pendingLegacyArgumentBytes = 0;
			return [
				...leadingDeltas,
				{
					delta: {},
					toolCalls: [confirmedLegacyToolCall]
				},
				...takePendingFollowingDeltas()
			];
		}
		if (finishReason) {
			pendingLegacyArgumentBytes = 0;
			pendingLegacyToolCall = void 0;
			return [...leadingDeltas, ...takePendingFollowingDeltas()];
		}
		return leadingDeltas;
	};
}
/** Publish only executable calls; streaming scratch state never belongs in replay. */
function finalizeOpenAICompletionsToolCalls(output, options = {}) {
	const isToolCall = (block) => block.type === "toolCall";
	const hasToolCalls = output.content.some(isToolCall);
	if (output.stopReason === "toolUse" && !hasToolCalls) output.stopReason = "stop";
	if (output.stopReason === "stop" && hasToolCalls && options.allowSilentToolCallPromotion !== false && !output.content.some((block) => {
		const candidate = block;
		return candidate.type === "text" && typeof candidate.text === "string" && candidate.text.trim().length > 0;
	})) output.stopReason = "toolUse";
	if (output.stopReason !== "toolUse") {
		if (hasToolCalls) output.content = output.content.filter((block) => !isToolCall(block));
		return;
	}
	for (const block of output.content) {
		if (!isToolCall(block)) continue;
		const toolCall = block;
		let completeArguments;
		try {
			completeArguments = typeof toolCall.partialArgs === "string" && toolCall.partialArgs.trim().length > 0 ? JSON.parse(toolCall.partialArgs) : void 0;
		} catch {
			completeArguments = void 0;
		}
		if (typeof toolCall.name !== "string" || toolCall.name.trim().length === 0 || !isRecord(completeArguments)) {
			output.stopReason = "error";
			output.errorMessage = "Provider returned an incomplete or malformed tool call";
			output.content = output.content.filter((candidate) => !isToolCall(candidate));
			return;
		}
		toolCall.arguments = completeArguments;
	}
	for (let contentIndex = 0; contentIndex < output.content.length; contentIndex += 1) {
		const block = output.content[contentIndex];
		if (!block || !isToolCall(block)) continue;
		delete block.partialArgs;
		delete block.streamIndex;
		options.onConfirmedToolCall?.(block, contentIndex);
	}
}
//#endregion
//#region packages/ai/src/providers/openai-stop-reason.ts
function mapOpenAIStopReason(reason, options) {
	if (reason === null) return { stopReason: "stop" };
	switch (reason) {
		case "stop":
		case "end": return { stopReason: "stop" };
		case "length": return { stopReason: "length" };
		case "function_call":
		case "tool_calls": return { stopReason: "toolUse" };
		case "tool_call":
			if (options?.allowSingularToolCall) return { stopReason: "toolUse" };
			break;
		case "content_filter": return {
			stopReason: "error",
			errorMessage: "Provider finish_reason: content_filter"
		};
		case "network_error": return {
			stopReason: "error",
			errorMessage: "Provider finish_reason: network_error"
		};
	}
	return {
		stopReason: "error",
		errorMessage: `Provider finish_reason: ${reason}`
	};
}
//#endregion
//#region packages/ai/src/transports/openai-reasoning-compat.ts
/**
* OpenAI reasoning-effort compatibility helpers.
*
* Keeps provider metadata and built-in model exceptions on one path before request payloads are built.
*/
const OPENAI_MEDIUM_ONLY_REASONING_MODEL_IDS = /* @__PURE__ */ new Set(["gpt-5.1-codex-mini"]);
function readCompatReasoningEffortMap(compat) {
	if (!compat || typeof compat !== "object") return {};
	const rawMap = compat.reasoningEffortMap;
	if (!rawMap || typeof rawMap !== "object") return {};
	return Object.fromEntries(Object.entries(rawMap).filter((entry) => typeof entry[0] === "string" && typeof entry[1] === "string"));
}
/** Resolves the reasoning effort remap for an OpenAI-compatible model. */
function resolveOpenAIReasoningEffortMap(model, fallbackMap = {}) {
	const provider = normalizeLowercaseStringOrEmpty(model.provider ?? "");
	const id = normalizeLowercaseStringOrEmpty(model.id ?? "");
	const builtinMap = provider === "openai" && OPENAI_MEDIUM_ONLY_REASONING_MODEL_IDS.has(id) ? {
		minimal: "medium",
		low: "medium"
	} : {};
	return {
		...fallbackMap,
		...builtinMap,
		...readCompatReasoningEffortMap(model.compat)
	};
}
//#endregion
export { convertMessages as a, resolveOpenAICompletionsResponseFormat as c, rememberPendingCommentaryTags as d, tagPendingCommentaryText as f, finalizeOpenAICompletionsToolCalls as i, shouldOmitOllamaCompatResponseFormat as l, mapOpenAIStopReason as n, detectOpenAICompletionsCompat as o, createOpenAICompletionsToolCallDeltaNormalizer as r, resolveOpenAICompletionsCompat as s, resolveOpenAIReasoningEffortMap as t, clearPendingCommentaryText as u };
