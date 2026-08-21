import { i as streamSimple } from "./stream-d6hZ3Hk1.js";
import { t as event_stream_exports } from "./event-stream-MHM-_qcK.js";
import { c as sanitizeGoogleThinkingPayload, t as streamWithPayloadPatch } from "./stream-payload-utils-BcOTedPh.js";
import { a as projectScrubbedPlainTextToolCallMessage, i as normalizePlainTextToolCallStreamEvents, n as createPromotedPlainTextToolCallEvents, r as projectStandalonePlainTextToolCallMessage, t as createPromotedPlainTextToolCallBlock } from "./src-BCj7auhV.js";
import { t as findCodeRegions } from "./code-regions-B1zlXqqO.js";
import "./moonshot-thinking-CTnAYwnf.js";
import { resolveOpenAIReasoningEffortForModel } from "@openclaw/ai/internal/openai";
import { applyAnthropicEphemeralCacheControlMarkers, applyAnthropicPayloadPolicyToParams, resolveAnthropicEphemeralCacheControl, resolveAnthropicPayloadPolicy, resolveOpenAIReasoningEffortMap } from "@openclaw/ai/transports";
import { createDeferredEventBuffer, notifyLlmRequestActivity, onLlmRequestActivity as onLlmRequestActivity$1 } from "@openclaw/ai/internal/runtime";
import { applyAnthropicRefusal } from "@openclaw/ai/internal/anthropic";
//#region src/llm/providers/stream-wrappers/reasoning-effort-utils.ts
/** Maps OpenClaw thinking levels onto provider reasoning-effort labels. */
function mapThinkingLevelToReasoningEffort(thinkingLevel) {
	if (thinkingLevel === "off") return "none";
	if (thinkingLevel === "adaptive") return "medium";
	if (thinkingLevel === "max" || thinkingLevel === "ultra") return "xhigh";
	return thinkingLevel;
}
//#endregion
//#region src/llm/providers/stream-wrappers/zai.ts
/**
* Inject `tool_stream=true` so tool-call deltas stream in real time.
* Providers can disable this by setting `params.tool_stream=false`.
*
* @deprecated Provider-owned stream helper; do not use from third-party plugins.
*/
function createToolStreamWrapper(baseStreamFn, enabled) {
	const underlying = baseStreamFn ?? streamSimple;
	return (model, context, options) => {
		if (!enabled) return underlying(model, context, options);
		return streamWithPayloadPatch(underlying, model, context, options, (payloadObj) => {
			payloadObj.tool_stream = true;
		});
	};
}
//#endregion
//#region src/plugin-sdk/provider-stream-shared.ts
/** Compose stream wrapper factories from left to right around a base stream function. */
function composeProviderStreamWrappers(baseStreamFn, ...wrappers) {
	return wrappers.reduce((streamFn, wrapper) => wrapper ? wrapper(streamFn) : streamFn, baseStreamFn);
}
function toRecord(value) {
	return value && typeof value === "object" ? value : void 0;
}
function resolveContextToolNames(context) {
	const tools = context.tools;
	if (!Array.isArray(tools)) return /* @__PURE__ */ new Set();
	const names = tools.map((tool) => {
		const record = toRecord(tool);
		return typeof record?.name === "string" && record.name.trim() ? record.name : void 0;
	}).filter((name) => Boolean(name));
	return new Set(names);
}
function promotePlainTextToolCalls(message, toolNames) {
	const messageRecord = toRecord(message);
	if (Array.isArray(messageRecord?.content) && messageRecord.content.some((block) => toRecord(block)?.type === "toolCall")) return;
	return projectStandalonePlainTextToolCallMessage({
		allowedToolNames: toolNames,
		createToolCallBlock: createPromotedPlainTextToolCallBlock,
		isRetainableNonTextBlock: () => true,
		message,
		resolveProtectedRanges: findCodeRegions
	});
}
function createProviderToolNameMatcher(toolNames) {
	return {
		hasExactName: (name) => toolNames.has(name),
		hasNamePrefix: (prefix) => {
			for (const toolName of toolNames) if (toolName.startsWith(prefix)) return true;
			return false;
		}
	};
}
function normalizeProviderDoneMessage(message, allowPromotion, toolNames, matcher, preserveEmptyTextBlocks = false) {
	const scrubbedMessage = scrubProviderTerminalMessage(message, matcher, preserveEmptyTextBlocks);
	if (scrubbedMessage) return {
		kind: "scrubbed",
		...scrubbedMessage
	};
	if (!allowPromotion) return;
	const promotedMessage = promotePlainTextToolCalls(message, toolNames);
	return promotedMessage ? {
		kind: "promoted",
		...promotedMessage
	} : void 0;
}
function scrubProviderTerminalMessage(message, matcher, preserveEmptyTextBlocks = false, forceKnownCandidates = false) {
	return projectScrubbedPlainTextToolCallMessage({
		forceKnownCandidates,
		matcher,
		message,
		preserveEmptyTextBlocks,
		resolveProtectedRanges: findCodeRegions
	});
}
function wrapPlainTextToolCallStream(source, context) {
	const toolNames = resolveContextToolNames(context);
	if (toolNames.size === 0) return source;
	const matcher = createProviderToolNameMatcher(toolNames);
	const output = (0, event_stream_exports.createAssistantMessageEventStream)();
	const stream = output;
	(async () => {
		let ended = false;
		const endStream = () => {
			if (!ended) {
				ended = true;
				stream.end();
			}
		};
		try {
			const normalizedEvents = normalizePlainTextToolCallStreamEvents(source, {
				createPromotedToolCallEvents: createPromotedPlainTextToolCallEvents,
				matcher,
				normalizeTerminalMessage: ({ allowPromotion, message, preserveEmptyTextBlocks }) => normalizeProviderDoneMessage(message, allowPromotion, toolNames, matcher, preserveEmptyTextBlocks),
				resolveProtectedRanges: findCodeRegions,
				stopAfterDone: true
			});
			for await (const event of normalizedEvents) stream.push(event);
		} catch (error) {
			stream.push({
				type: "error",
				reason: "error",
				error: {
					role: "assistant",
					content: [],
					stopReason: "error",
					errorMessage: error instanceof Error ? error.message : String(error)
				}
			});
		} finally {
			endStream();
		}
	})();
	return output;
}
/**
* Provider stream wrapper for local/proxy providers that sometimes emit a
* standalone textual tool-call block even when native tool calling is enabled.
*/
function createPlainTextToolCallCompatWrapper(baseStreamFn) {
	const underlying = baseStreamFn ?? streamSimple;
	return (model, context, options) => {
		const maybeStream = underlying(model, context, options);
		if (maybeStream && typeof maybeStream === "object" && "then" in maybeStream) return Promise.resolve(maybeStream).then((stream) => wrapPlainTextToolCallStream(stream, context));
		return wrapPlainTextToolCallStream(maybeStream, context);
	};
}
/** @deprecated Bundled provider stream helper; do not use from third-party plugins. */
function defaultToolStreamExtraParams(extraParams) {
	if (extraParams?.tool_stream !== void 0) return extraParams;
	return {
		...extraParams,
		tool_stream: true
	};
}
/** Wrap a provider stream so callers can patch the outbound provider payload once. */
function createPayloadPatchStreamWrapper(baseStreamFn, patchPayload, wrapperOptions) {
	const underlying = baseStreamFn ?? streamSimple;
	return (model, context, options) => {
		if (wrapperOptions?.shouldPatch && !wrapperOptions.shouldPatch({
			model,
			context,
			options
		})) return underlying(model, context, options);
		return streamWithPayloadPatch(underlying, model, context, options, (payload) => patchPayload({
			payload,
			model,
			context,
			options
		}));
	};
}
/**
* Applies explicit disabled-thinking intent to OpenAI-compatible Chat
* Completions payloads without changing enabled reasoning levels.
*/
function createOpenAICompatibleCompletionsThinkingOffWrapper(baseStreamFn, thinkingLevel) {
	const underlying = baseStreamFn ?? streamSimple;
	if (thinkingLevel !== "off") return underlying;
	return (model, context, options) => {
		if (model.api !== "openai-completions") return underlying(model, context, options);
		return streamWithPayloadPatch(underlying, model, context, options, (payload) => {
			if (!("reasoning_effort" in payload)) return;
			const disabled = resolveOpenAIReasoningEffortForModel({
				model,
				effort: "none",
				fallbackMap: resolveOpenAIReasoningEffortMap({
					provider: typeof model.provider === "string" ? model.provider : null,
					id: typeof model.id === "string" ? model.id : null,
					compat: model.compat
				})
			});
			if (disabled) payload.reasoning_effort = disabled;
			else delete payload.reasoning_effort;
		});
	};
}
function isAnthropicThinkingEnabled(payload) {
	const thinking = payload.thinking;
	if (!thinking || typeof thinking !== "object") return false;
	return thinking.type !== "disabled";
}
function assistantMessageHasAnthropicToolUse(message) {
	if (Array.isArray(message.tool_calls) && message.tool_calls.length > 0) return true;
	const content = message.content;
	if (!Array.isArray(content)) return false;
	return content.some((block) => block && typeof block === "object" && (block.type === "tool_use" || block.type === "toolCall"));
}
function stripTrailingAssistantPrefillMessages(payload) {
	if (!Array.isArray(payload.messages)) return 0;
	let stripped = 0;
	while (payload.messages.length > 0) {
		const finalMessage = payload.messages[payload.messages.length - 1];
		if (!finalMessage || typeof finalMessage !== "object") break;
		const message = finalMessage;
		if (message.role !== "assistant" || assistantMessageHasAnthropicToolUse(message)) break;
		payload.messages.pop();
		stripped += 1;
	}
	return stripped;
}
/** @deprecated Anthropic-family provider stream helper; do not use from third-party plugins. */
function stripTrailingAnthropicAssistantPrefillWhenThinking(payload) {
	if (!isAnthropicThinkingEnabled(payload)) return 0;
	return stripTrailingAssistantPrefillMessages(payload);
}
/** @deprecated Anthropic-family provider stream helper; do not use from third-party plugins. */
function createAnthropicThinkingPrefillPayloadWrapper(baseStreamFn, onStripped, wrapperOptions) {
	return createPayloadPatchStreamWrapper(baseStreamFn, ({ payload }) => {
		const stripped = stripTrailingAnthropicAssistantPrefillWhenThinking(payload);
		if (stripped > 0) onStripped?.(stripped);
	}, wrapperOptions);
}
/** @deprecated OpenAI-compatible provider stream helper; do not use from third-party plugins. */
function isOpenAICompatibleThinkingEnabled(params) {
	const options = params.options ?? {};
	const raw = options.reasoningEffort ?? options.reasoning ?? params.thinkingLevel ?? "high";
	if (typeof raw !== "string") return true;
	const normalized = raw.trim().toLowerCase();
	return normalized !== "off" && normalized !== "none";
}
/** Applies the shared reasoning payload policy used by OpenAI-compatible proxy providers. */
function normalizeOpenAICompatibleReasoningPayload(payload, thinkingLevel) {
	delete payload.reasoning_effort;
	if (!thinkingLevel || thinkingLevel === "off") return;
	const existingReasoning = payload.reasoning;
	if (existingReasoning && typeof existingReasoning === "object" && !Array.isArray(existingReasoning)) {
		const reasoning = existingReasoning;
		if (!("max_tokens" in reasoning) && !("effort" in reasoning)) reasoning.effort = mapThinkingLevelToReasoningEffort(thinkingLevel);
	} else if (!existingReasoning) payload.reasoning = { effort: mapThinkingLevelToReasoningEffort(thinkingLevel) };
}
/** Applies Qwen chat-template thinking flags without discarding provider-specific kwargs. */
function setQwenChatTemplateThinking(payload, enabled) {
	const existing = payload.chat_template_kwargs;
	if (existing && typeof existing === "object" && !Array.isArray(existing)) {
		const next = {
			...existing,
			enable_thinking: enabled
		};
		if (!Object.hasOwn(next, "preserve_thinking")) next.preserve_thinking = true;
		payload.chat_template_kwargs = next;
		return;
	}
	payload.chat_template_kwargs = {
		enable_thinking: enabled,
		preserve_thinking: true
	};
}
function isDisabledDeepSeekV4ThinkingLevel(thinkingLevel) {
	const normalized = typeof thinkingLevel === "string" ? thinkingLevel.toLowerCase() : "";
	return normalized === "off" || normalized === "none";
}
function resolveDeepSeekV4ReasoningEffort(thinkingLevel) {
	return thinkingLevel === "xhigh" || thinkingLevel === "max" ? "max" : "high";
}
/** Normalizes assistant reasoning replay shared by OpenAI-compatible provider families. */
function normalizeOpenAICompatibleReasoningReplay(payload, params) {
	if (!Array.isArray(payload.messages)) return;
	for (const message of payload.messages) {
		if (!message || typeof message !== "object") continue;
		const record = message;
		if (!params.thinkingEnabled) {
			if (!params.stripAssistantMessagesOnly || record.role === "assistant") delete record.reasoning_content;
			continue;
		}
		if (record.role !== "assistant" || params.shouldBackfillAssistantMessage && !params.shouldBackfillAssistantMessage(record)) continue;
		if (!("reasoning_content" in record) || params.replaceNullReasoningContent && record.reasoning_content == null) record.reasoning_content = "";
	}
}
/** @deprecated DeepSeek provider stream helper; do not use from third-party plugins. */
function createDeepSeekV4OpenAICompatibleThinkingWrapper(params) {
	if (!params.baseStreamFn) return;
	const underlying = params.baseStreamFn;
	const resolveReasoningEffort = params.resolveReasoningEffort ?? resolveDeepSeekV4ReasoningEffort;
	return (model, context, options) => {
		if (!params.shouldPatchModel(model)) return underlying(model, context, options);
		return streamWithPayloadPatch(underlying, model, context, options, (payload) => {
			if (isDisabledDeepSeekV4ThinkingLevel(params.thinkingLevel)) {
				payload.thinking = { type: "disabled" };
				delete payload.reasoning_effort;
				delete payload.reasoning;
				normalizeOpenAICompatibleReasoningReplay(payload, { thinkingEnabled: false });
				return;
			}
			payload.thinking = { type: "enabled" };
			payload.reasoning_effort = resolveReasoningEffort(params.thinkingLevel);
			normalizeOpenAICompatibleReasoningReplay(payload, {
				thinkingEnabled: true,
				shouldBackfillAssistantMessage: params.shouldBackfillAssistantReasoningContent
			});
		});
	};
}
function promoteThinkingOnlyFinalOutputToText(message) {
	if (!message || typeof message !== "object") return;
	const record = message;
	if (record.stopReason !== "stop" && record.stopReason !== "length") return;
	if (!Array.isArray(record.content) || record.content.length === 0) return;
	let hasVisibleText = false;
	let hasToolCall = false;
	let hasVisibleThinking = false;
	for (const block of record.content) {
		if (!block || typeof block !== "object") continue;
		const typedBlock = block;
		if (typedBlock.type === "text" && typeof typedBlock.text === "string" && typedBlock.text.trim()) hasVisibleText = true;
		if (typedBlock.type === "toolCall" || typedBlock.type === "tool_use") hasToolCall = true;
		if (typedBlock.type === "thinking" && typeof typedBlock.thinking === "string" && typedBlock.thinking.trim()) hasVisibleThinking = true;
	}
	if (hasVisibleText || hasToolCall || !hasVisibleThinking) return;
	record.content = record.content.map((block) => {
		if (!block || typeof block !== "object") return block;
		const typedBlock = block;
		if (typedBlock.type !== "thinking" || typeof typedBlock.thinking !== "string" || !typedBlock.thinking.trim()) return block;
		return {
			type: "text",
			text: typedBlock.thinking
		};
	});
}
function wrapThinkingOnlyFinalTextStream(stream) {
	const originalResult = stream.result.bind(stream);
	stream.result = async () => {
		const message = await originalResult();
		promoteThinkingOnlyFinalOutputToText(message);
		return message;
	};
	const originalAsyncIterator = stream[Symbol.asyncIterator].bind(stream);
	stream[Symbol.asyncIterator] = function() {
		const iterator = originalAsyncIterator();
		return {
			async next() {
				const result = await iterator.next();
				if (!result.done && result.value && typeof result.value === "object") {
					const event = result.value;
					promoteThinkingOnlyFinalOutputToText(event.partial);
					promoteThinkingOnlyFinalOutputToText(event.message);
				}
				return result;
			},
			async return(value) {
				return iterator.return?.(value) ?? {
					done: true,
					value: void 0
				};
			},
			async throw(error) {
				return iterator.throw?.(error) ?? {
					done: true,
					value: void 0
				};
			},
			[Symbol.asyncIterator]() {
				return this;
			}
		};
	};
	return stream;
}
/** @deprecated OpenAI-compatible provider stream helper; do not use from third-party plugins. */
function createThinkingOnlyFinalTextWrapper(params) {
	if (!params.baseStreamFn) return;
	const underlying = params.baseStreamFn;
	return (model, context, options) => {
		const maybeStream = underlying(model, context, options);
		if (!params.shouldPatchModel(model)) return maybeStream;
		if (maybeStream && typeof maybeStream === "object" && "then" in maybeStream) return Promise.resolve(maybeStream).then((stream) => wrapThinkingOnlyFinalTextStream(stream));
		return wrapThinkingOnlyFinalTextStream(maybeStream);
	};
}
/** @deprecated Google provider-owned stream helper; do not use from third-party plugins. */
function createGoogleThinkingPayloadWrapper(baseStreamFn, thinkingLevel) {
	return createPayloadPatchStreamWrapper(baseStreamFn, ({ payload, model }) => {
		if (model.api === "google-generative-ai") sanitizeGoogleThinkingPayload({
			payload,
			modelId: model.id,
			thinkingLevel
		});
	});
}
/** @deprecated Google provider-owned stream helper; do not use from third-party plugins. */
function createGoogleThinkingStreamWrapper(ctx) {
	return createGoogleThinkingPayloadWrapper(ctx.streamFn, ctx.thinkingLevel);
}
//#endregion
export { applyAnthropicEphemeralCacheControlMarkers as C, createToolStreamWrapper as S, mapThinkingLevelToReasoningEffort as T, notifyLlmRequestActivity as _, createDeepSeekV4OpenAICompatibleThinkingWrapper as a, setQwenChatTemplateThinking as b, createGoogleThinkingStreamWrapper as c, createPlainTextToolCallCompatWrapper as d, createThinkingOnlyFinalTextWrapper as f, normalizeOpenAICompatibleReasoningReplay as g, normalizeOpenAICompatibleReasoningPayload as h, createAnthropicThinkingPrefillPayloadWrapper as i, createOpenAICompatibleCompletionsThinkingOffWrapper as l, isOpenAICompatibleThinkingEnabled as m, applyAnthropicRefusal as n, createDeferredEventBuffer as o, defaultToolStreamExtraParams as p, composeProviderStreamWrappers as r, createGoogleThinkingPayloadWrapper as s, applyAnthropicPayloadPolicyToParams as t, createPayloadPatchStreamWrapper as u, onLlmRequestActivity$1 as v, resolveAnthropicEphemeralCacheControl as w, stripTrailingAnthropicAssistantPrefillWhenThinking as x, resolveAnthropicPayloadPolicy as y };
