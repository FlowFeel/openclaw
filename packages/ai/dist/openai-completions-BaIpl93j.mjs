import { n as getEnvApiKey, r as __exportAll } from "./env-api-keys-DrgeBuva.mjs";
import { t as AssistantMessageEventStream } from "./event-stream-CEV9t6da.mjs";
import { n as getAiTransportHost } from "./host-Bl7Kgddo.mjs";
import { r as clampThinkingLevel } from "./model-utils-Dau5dlgm.mjs";
import { n as clampOpenAIPromptCacheKey } from "./openai-prompt-cache-mZTCdRPo.mjs";
import { t as resolveCacheRetention } from "./cache-retention-0x979a5V.mjs";
import { c as buildBaseOptions, m as splitSystemPromptCacheBoundary } from "./tool-result-text-Dvkp2Dus.mjs";
import { a as convertMessages, c as resolveOpenAICompletionsResponseFormat, d as rememberPendingCommentaryTags, f as tagPendingCommentaryText, i as finalizeOpenAICompletionsToolCalls, l as shouldOmitOllamaCompatResponseFormat, n as mapOpenAIStopReason, r as createOpenAICompletionsToolCallDeltaNormalizer, s as resolveOpenAICompletionsCompat, t as resolveOpenAIReasoningEffortMap, u as clearPendingCommentaryText } from "./openai-reasoning-compat-DKebnIBL.mjs";
import { n as parseStreamingJson } from "./json-parse-BvXNt1-7.mjs";
import { t as notifyLlmRequestActivity } from "./llm-request-activity-BjtkplhG.mjs";
import { d as transportAbortError } from "./transport-stream-shared-CPNv7A3r.mjs";
import { a as parseOpenAICompletionsUsage, l as projectOpenAITools, o as readOpenAICompletionsContentDeltas, r as isOpenAICompletionsThinkingEnabled, u as reconcileOpenAICompletionsToolChoice } from "./openai-transport-shared-Cipt7egQ.mjs";
import { t as createReasoningTagTextPartitioner } from "./reasoning-tag-text-partitioner-CGDyLWUR.mjs";
import { a as withFirstStreamEventTimeout, i as getFirstStreamEventTimeoutMs, r as getFirstStreamEventTimeoutHandler, t as createFirstStreamEventAbortController } from "./stream-first-event-timeout-BIBomOGq.mjs";
import { t as headersToRecord } from "./headers-B_e4-1J0.mjs";
import { t as formatProviderError } from "./provider-error-DI0Ts28U.mjs";
import { i as resolveCloudflareBaseUrl, n as hasCopilotVisionInput, r as isCloudflareProvider, t as buildCopilotDynamicHeaders } from "./github-copilot-headers-NCJtz9i0.mjs";
import OpenAI from "openai";
//#region packages/ai/src/providers/openai-completions.ts
var openai_completions_exports = /* @__PURE__ */ __exportAll({
	convertMessages: () => convertMessages,
	streamOpenAICompletions: () => streamOpenAICompletions,
	streamSimpleOpenAICompletions: () => streamSimpleOpenAICompletions
});
/**
* Check if conversation messages contain tool calls or tool results.
* This is needed because Anthropic (via proxy) requires the tools param
* to be present when messages include tool_calls or tool role messages.
*/
function hasToolHistory(messages) {
	for (const msg of messages) {
		if (msg.role === "toolResult") return true;
		if (msg.role === "assistant") {
			if (Array.isArray(msg.content) && msg.content.some((block) => block.type === "toolCall")) return true;
		}
	}
	return false;
}
function isEncryptedReasoningDetail(detail) {
	if (typeof detail !== "object" || detail === null) return false;
	const candidate = detail;
	return candidate.type === "reasoning.encrypted" && typeof candidate.id === "string" && candidate.id.length > 0 && typeof candidate.data === "string" && candidate.data.length > 0;
}
const streamOpenAICompletions = (model, context, options) => {
	const stream = new AssistantMessageEventStream();
	(async () => {
		const output = {
			role: "assistant",
			content: [],
			api: model.api,
			provider: model.provider,
			model: model.id,
			usage: {
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
			},
			stopReason: "stop",
			timestamp: Date.now()
		};
		const provisionalCommentaryTags = /* @__PURE__ */ new Map();
		let firstEventAbort;
		try {
			const apiKey = options?.apiKey || getEnvApiKey(model.provider) || "";
			const compat = resolveOpenAICompletionsCompat(model);
			const cacheRetention = resolveCacheRetention(options?.cacheRetention);
			const cacheSessionId = cacheRetention === "none" ? void 0 : options?.sessionId;
			const client = createClient(model, context, apiKey, options?.headers, cacheSessionId, compat);
			let params = buildParams(model, context, options, compat, cacheRetention);
			const nextParams = await options?.onPayload?.(params, model);
			if (nextParams !== void 0) params = nextParams;
			firstEventAbort = createFirstStreamEventAbortController(options?.signal);
			const requestOptions = {
				signal: firstEventAbort.signal,
				...options?.timeoutMs !== void 0 ? { timeout: options.timeoutMs } : {},
				maxRetries: options?.maxRetries ?? 0
			};
			const { data: openaiStream, response } = await client.chat.completions.create(params, requestOptions).withResponse();
			await options?.onResponse?.({
				status: response.status,
				headers: headersToRecord(response.headers)
			}, model);
			stream.push({
				type: "start",
				partial: output
			});
			let textBlock = null;
			let thinkingBlock = null;
			let hasFinishReason = false;
			const toolCallBlocksByIndex = /* @__PURE__ */ new Map();
			const toolCallBlocksById = /* @__PURE__ */ new Map();
			const toolCallBlocksByFirstId = /* @__PURE__ */ new Map();
			const normalizeToolCallDeltas = createOpenAICompletionsToolCallDeltaNormalizer();
			const pendingReasoningDetailsByToolCallId = /* @__PURE__ */ new Map();
			const blocks = output.content;
			const finishedBlocks = /* @__PURE__ */ new Set();
			const contentIndices = /* @__PURE__ */ new WeakMap();
			const appendBlock = (block) => {
				contentIndices.set(block, blocks.length);
				blocks.push(block);
			};
			const getContentIndex = (block) => contentIndices.get(block) ?? -1;
			const rememberFirstToolCallById = (id, block) => {
				if (toolCallBlocksByFirstId.has(id)) return;
				toolCallBlocksByFirstId.set(id, block);
				const pendingDetail = pendingReasoningDetailsByToolCallId.get(id);
				if (pendingDetail) {
					block.thoughtSignature = pendingDetail;
					pendingReasoningDetailsByToolCallId.delete(id);
				}
			};
			const finishBlock = (block) => {
				const contentIndex = getContentIndex(block);
				if (contentIndex === -1 || finishedBlocks.has(block)) return;
				finishedBlocks.add(block);
				if (block.type === "text") stream.push({
					type: "text_end",
					contentIndex,
					content: block.text,
					partial: output
				});
				else if (block.type === "thinking") stream.push({
					type: "thinking_end",
					contentIndex,
					content: block.thinking,
					partial: output
				});
				else if (block.type === "toolCall") stream.push({
					type: "toolcall_end",
					contentIndex,
					toolCall: block,
					partial: output
				});
			};
			const ensureTextBlock = () => {
				if (!textBlock) {
					textBlock = {
						type: "text",
						text: ""
					};
					appendBlock(textBlock);
					stream.push({
						type: "text_start",
						contentIndex: getContentIndex(textBlock),
						partial: output
					});
				}
				return textBlock;
			};
			const ensureThinkingBlock = (thinkingSignature) => {
				if (!thinkingBlock) {
					thinkingBlock = {
						type: "thinking",
						thinking: "",
						...thinkingSignature ? { thinkingSignature } : {}
					};
					appendBlock(thinkingBlock);
					stream.push({
						type: "thinking_start",
						contentIndex: getContentIndex(thinkingBlock),
						partial: output
					});
				}
				return thinkingBlock;
			};
			const sealNativeReasoningBeforeText = () => {
				if (thinkingBlock && !reasoningTagTextPartitioner.isInsideReasoning()) {
					finishBlock(thinkingBlock);
					thinkingBlock = null;
				}
			};
			const appendTextDelta = (delta) => {
				sealNativeReasoningBeforeText();
				const block = ensureTextBlock();
				block.text += delta;
				stream.push({
					type: "text_delta",
					contentIndex: getContentIndex(block),
					delta,
					partial: output
				});
			};
			const appendThinkingDelta = (thinkingSignature, delta) => {
				const block = ensureThinkingBlock(thinkingSignature);
				block.thinking += delta;
				stream.push({
					type: "thinking_delta",
					contentIndex: getContentIndex(block),
					delta,
					partial: output
				});
			};
			const ensureToolCallBlock = (toolCall) => {
				const streamIndex = typeof toolCall.index === "number" ? toolCall.index : void 0;
				let block = streamIndex !== void 0 ? toolCallBlocksByIndex.get(streamIndex) : void 0;
				if (!block && toolCall.id) block = toolCallBlocksById.get(toolCall.id);
				if (!block) {
					block = {
						type: "toolCall",
						id: toolCall.id || "",
						name: toolCall.function?.name || "",
						arguments: {},
						partialArgs: "",
						streamIndex
					};
					if (streamIndex !== void 0) toolCallBlocksByIndex.set(streamIndex, block);
					if (toolCall.id) {
						toolCallBlocksById.set(toolCall.id, block);
						rememberFirstToolCallById(toolCall.id, block);
					}
					appendBlock(block);
					stream.push({
						type: "toolcall_start",
						contentIndex: getContentIndex(block),
						partial: output
					});
				}
				if (streamIndex !== void 0 && block.streamIndex === void 0) {
					block.streamIndex = streamIndex;
					toolCallBlocksByIndex.set(streamIndex, block);
				}
				if (toolCall.id) toolCallBlocksById.set(toolCall.id, block);
				return block;
			};
			const reasoningTagTextPartitioner = createReasoningTagTextPartitioner();
			const appendPartitionedContent = (text, hasMirroredReasoning) => {
				const routedDeltas = hasMirroredReasoning ? reasoningTagTextPartitioner.push(text) : reasoningTagTextPartitioner.pushVisible(text);
				for (const delta of routedDeltas) if (delta.kind === "text") appendTextDelta(delta.text);
			};
			const flushPartitionedContent = () => {
				for (const delta of reasoningTagTextPartitioner.flush()) if (delta.kind === "text") appendTextDelta(delta.text);
			};
			const guardedOpenaiStream = withFirstStreamEventTimeout(openaiStream, {
				provider: model.provider,
				api: model.api,
				model: model.id,
				timeoutMs: getFirstStreamEventTimeoutMs(options) ?? 0,
				stage: "completions",
				abort: firstEventAbort.abort,
				onTimeout: getFirstStreamEventTimeoutHandler(options),
				hint: "The provider may be stalled while parsing the tool payload; retry with a smaller tool surface or enable OPENCLAW_DEBUG_MODEL_PAYLOAD=tools to inspect exposed tools."
			});
			for await (const chunk of guardedOpenaiStream) {
				if (!chunk || typeof chunk !== "object") continue;
				notifyLlmRequestActivity(options?.signal);
				output.responseId ||= chunk.id;
				if (typeof chunk.model === "string" && chunk.model.length > 0 && chunk.model !== model.id) output.responseModel ||= chunk.model;
				if (chunk.usage) output.usage = parseOpenAICompletionsUsage(chunk.usage, model, { includeReasoningTokens: false });
				const choice = Array.isArray(chunk.choices) ? chunk.choices[0] : void 0;
				if (!choice) continue;
				const choiceUsage = choice.usage;
				if (!chunk.usage && choiceUsage) output.usage = parseOpenAICompletionsUsage(choiceUsage, model, { includeReasoningTokens: false });
				if (choice.finish_reason) {
					const finishReasonResult = mapOpenAIStopReason(choice.finish_reason);
					output.stopReason = finishReasonResult.stopReason;
					if (finishReasonResult.errorMessage) output.errorMessage = finishReasonResult.errorMessage;
					hasFinishReason = true;
				}
				const rawChoiceDelta = choice.delta ?? choice.message;
				if (rawChoiceDelta) for (const normalizedDelta of normalizeToolCallDeltas(rawChoiceDelta, choice.finish_reason)) {
					const choiceDelta = normalizedDelta.delta;
					const reasoningFields = [
						"reasoning_content",
						"reasoning",
						"reasoning_text"
					];
					const deltaFields = choiceDelta;
					const shouldEmitReasoning = Boolean(model.reasoning && options?.reasoningEffort && isOpenAICompletionsThinkingEnabled(options.reasoningEffort));
					let foundReasoningField = null;
					for (const field of reasoningFields) {
						const value = deltaFields[field];
						if (typeof value === "string" && value.length > 0) {
							foundReasoningField = field;
							break;
						}
					}
					if (foundReasoningField) reasoningTagTextPartitioner.markStrict();
					if (shouldEmitReasoning && foundReasoningField) {
						const delta = deltaFields[foundReasoningField];
						if (typeof delta === "string" && delta.length > 0) appendThinkingDelta(model.provider === "opencode-go" && foundReasoningField === "reasoning" ? "reasoning_content" : foundReasoningField, delta);
					}
					for (const contentDelta of readOpenAICompletionsContentDeltas(choiceDelta.content, choiceDelta.refusal, foundReasoningField ? [deltaFields[foundReasoningField]] : [])) if (contentDelta.kind === "thinking") {
						if (reasoningTagTextPartitioner.hasPending()) reasoningTagTextPartitioner.markStrict();
						if (shouldEmitReasoning) appendThinkingDelta(contentDelta.signature, contentDelta.text);
					} else appendPartitionedContent(contentDelta.text, Boolean(foundReasoningField));
					const toolCallDeltas = normalizedDelta.toolCalls;
					if (toolCallDeltas.length > 0) {
						flushPartitionedContent();
						sealNativeReasoningBeforeText();
						rememberPendingCommentaryTags(provisionalCommentaryTags, tagPendingCommentaryText(output.content));
						for (const toolCall of toolCallDeltas) {
							const block = ensureToolCallBlock(toolCall);
							if (!block.id && toolCall.id) {
								block.id = toolCall.id;
								toolCallBlocksById.set(toolCall.id, block);
								rememberFirstToolCallById(toolCall.id, block);
							}
							if (!block.name && toolCall.function?.name) block.name = toolCall.function.name;
							let delta = "";
							if (toolCall.function?.arguments) {
								delta = toolCall.function.arguments;
								block.partialArgs = (block.partialArgs ?? "") + toolCall.function.arguments;
								block.arguments = parseStreamingJson(block.partialArgs);
							}
							stream.push({
								type: "toolcall_delta",
								contentIndex: getContentIndex(block),
								delta,
								partial: output
							});
						}
					}
					const reasoningDetails = choiceDelta.reasoning_details;
					if (Array.isArray(reasoningDetails)) {
						for (const detail of reasoningDetails) if (isEncryptedReasoningDetail(detail)) {
							const serializedDetail = JSON.stringify(detail);
							const matchingToolCall = toolCallBlocksByFirstId.get(detail.id);
							if (matchingToolCall) matchingToolCall.thoughtSignature = serializedDetail;
							else pendingReasoningDetailsByToolCallId.set(detail.id, serializedDetail);
						}
					}
				}
			}
			flushPartitionedContent();
			let terminalError;
			if (options?.signal?.aborted) terminalError = transportAbortError(options.signal);
			else if (output.stopReason === "aborted") terminalError = /* @__PURE__ */ new Error("Request was aborted");
			else if (output.stopReason === "error") terminalError = new Error(output.errorMessage || "Provider returned an error stop reason");
			else if (!hasFinishReason) terminalError = /* @__PURE__ */ new Error("Stream ended without finish_reason");
			if (terminalError) {
				for (const block of blocks) if (block.type !== "toolCall") finishBlock(block);
				throw terminalError;
			}
			finalizeOpenAICompletionsToolCalls(output);
			if (output.stopReason === "aborted" || output.stopReason === "error") {
				for (const block of blocks) if (block.type !== "toolCall") finishBlock(block);
				throw new Error(output.errorMessage || (output.stopReason === "aborted" ? "Request was aborted" : "Provider returned an invalid tool call"));
			}
			for (const block of blocks) if (block.type !== "toolCall" || output.stopReason === "toolUse") finishBlock(block);
			if (output.stopReason !== "toolUse") clearPendingCommentaryText(provisionalCommentaryTags);
			if (output.stopReason === "toolUse") tagPendingCommentaryText(output.content);
			stream.push({
				type: "done",
				reason: output.stopReason,
				message: output
			});
			stream.end();
		} catch (error) {
			output.stopReason = options?.signal?.aborted ? "aborted" : "error";
			finalizeOpenAICompletionsToolCalls(output, { allowSilentToolCallPromotion: false });
			for (const block of output.content) {
				delete block.index;
				delete block.partialArgs;
				delete block.streamIndex;
			}
			output.errorMessage = formatProviderError(error);
			const rawMetadata = error?.error?.metadata?.raw;
			if (rawMetadata && !output.errorMessage.includes(rawMetadata)) output.errorMessage += `\n${rawMetadata}`;
			stream.push({
				type: "error",
				reason: output.stopReason,
				error: output
			});
			stream.end();
		} finally {
			firstEventAbort?.dispose();
		}
	})();
	return stream;
};
const streamSimpleOpenAICompletions = (model, context, options) => {
	const apiKey = options?.apiKey || getEnvApiKey(model.provider);
	if (!apiKey) throw new Error(`No API key for provider: ${model.provider}`);
	const base = buildBaseOptions(model, options, apiKey);
	const clampedReasoning = options?.reasoning ? clampThinkingLevel(model, options.reasoning) : void 0;
	const reasoningEffort = clampedReasoning === "off" ? void 0 : clampedReasoning === "max" ? "xhigh" : clampedReasoning;
	const toolChoice = options?.toolChoice;
	return streamOpenAICompletions(model, context, {
		...base,
		reasoningEffort,
		toolChoice
	});
};
function createClient(model, context, apiKey, optionsHeaders, sessionId, compat = resolveOpenAICompletionsCompat(model)) {
	if (!apiKey) throw new Error(`No API key for provider: ${model.provider}`);
	const headers = { ...model.headers };
	if (model.provider === "github-copilot") {
		const hasImages = hasCopilotVisionInput(context.messages);
		const copilotHeaders = buildCopilotDynamicHeaders({
			messages: context.messages,
			hasImages
		});
		Object.assign(headers, copilotHeaders);
	}
	if (sessionId && compat.sessionAffinity !== "none") if (compat.sessionAffinity === "openrouter") headers["x-session-id"] = sessionId;
	else {
		headers.session_id = sessionId;
		headers["x-client-request-id"] = sessionId;
		headers["x-session-affinity"] = sessionId;
	}
	if (optionsHeaders) Object.assign(headers, optionsHeaders);
	const defaultHeaders = model.provider === "cloudflare-ai-gateway" ? {
		...headers,
		Authorization: headers.Authorization ?? null,
		"cf-aig-authorization": `Bearer ${apiKey}`
	} : headers;
	return new OpenAI({
		apiKey,
		baseURL: isCloudflareProvider(model.provider) ? resolveCloudflareBaseUrl(model) : model.baseUrl,
		dangerouslyAllowBrowser: true,
		defaultHeaders,
		fetch: getAiTransportHost().buildModelFetch(model)
	});
}
function buildParams(model, context, options, compat = resolveOpenAICompletionsCompat(model), cacheRetention = resolveCacheRetention(options?.cacheRetention)) {
	const cacheControl = getCompatCacheControl(compat, cacheRetention);
	const cacheOptOutIndexes = /* @__PURE__ */ new Set();
	const messages = convertMessages(model, context, compat, {
		cacheOptOutIndexes,
		preserveSystemPromptCacheBoundary: cacheControl !== void 0
	});
	const supportsPromptCacheKey = model.baseUrl.includes("api.openai.com") || compat.supportsPromptCacheKey;
	const promptCacheKey = supportsPromptCacheKey && cacheRetention !== "none" ? clampOpenAIPromptCacheKey(options?.promptCacheKey ?? options?.sessionId) : void 0;
	const params = {
		model: model.id,
		messages,
		stream: true,
		prompt_cache_key: promptCacheKey,
		prompt_cache_retention: supportsPromptCacheKey && cacheRetention === "long" && compat.supportsLongCacheRetention ? "24h" : void 0
	};
	if (compat.supportsUsageInStreaming) params.stream_options = { include_usage: true };
	if (compat.supportsStore) params.store = false;
	if (options?.maxTokens) {
		const maxTokens = clampOpenAICompletionsMaxTokens(model, options.maxTokens);
		if (compat.maxTokensField === "max_tokens") params.max_tokens = maxTokens;
		else params.max_completion_tokens = maxTokens;
	}
	if (options?.temperature !== void 0) params.temperature = options.temperature;
	if (options?.stop !== void 0 && options.stop.length > 0) params.stop = options.stop;
	const requestedResponseFormat = options?.responseFormat;
	const responseFormat = requestedResponseFormat === void 0 ? void 0 : resolveOpenAICompletionsResponseFormat(shouldOmitOllamaCompatResponseFormat({
		provider: model.provider,
		baseUrl: model.baseUrl,
		hasTools: () => Boolean(context.tools?.length)
	}) ? void 0 : requestedResponseFormat, compat.supportsJsonSchemaResponseFormat);
	if (responseFormat !== void 0) params.response_format = responseFormat;
	let toolProjection;
	if (context.tools) {
		const converted = convertTools(context.tools, compat);
		toolProjection = converted.projection;
		if (converted.tools.length > 0) params.tools = converted.tools;
		else if (hasToolHistory(context.messages)) params.tools = [];
		if (compat.zaiToolStream && converted.tools.length > 0) params.tool_stream = true;
	} else if (hasToolHistory(context.messages)) params.tools = [];
	if (cacheControl) applyAnthropicCacheControl(messages, params.tools, cacheControl, cacheOptOutIndexes);
	if (options?.toolChoice) {
		const toolChoice = reconcileOpenAICompletionsToolChoice(options.toolChoice, toolProjection ?? projectOpenAITools([]));
		if (toolChoice !== void 0) params.tool_choice = toolChoice;
	}
	const reasoningEffortMap = resolveOpenAIReasoningEffortMap(model);
	const thinkingLevelMap = model.thinkingLevelMap;
	const reasoningEffort = options?.reasoningEffort === void 0 ? void 0 : reasoningEffortMap[options.reasoningEffort] ?? thinkingLevelMap?.[options.reasoningEffort] ?? options.reasoningEffort;
	const reasoningEnabled = reasoningEffort !== void 0 && reasoningEffort !== "none";
	const offReasoningEffort = reasoningEffortMap.off ?? model.thinkingLevelMap?.off;
	if (compat.thinkingFormat === "zai" && model.reasoning) params.thinking = reasoningEnabled ? {
		type: "enabled",
		clear_thinking: false
	} : { type: "disabled" };
	else if (compat.thinkingFormat === "qwen" && model.reasoning) params.enable_thinking = reasoningEnabled;
	else if (compat.thinkingFormat === "qwen-chat-template" && model.reasoning) params.chat_template_kwargs = {
		enable_thinking: reasoningEnabled,
		preserve_thinking: true
	};
	else if (compat.thinkingFormat === "deepseek" && model.reasoning) {
		params.thinking = { type: reasoningEnabled ? "enabled" : "disabled" };
		if (reasoningEnabled && compat.supportsReasoningEffort) params.reasoning_effort = reasoningEffort;
	} else if (compat.thinkingFormat === "openrouter" && model.reasoning) {
		const openRouterParams = params;
		if (reasoningEnabled) openRouterParams.reasoning = { effort: reasoningEffort };
		else if (offReasoningEffort !== null) openRouterParams.reasoning = { effort: offReasoningEffort ?? "none" };
	} else if (compat.thinkingFormat === "together" && model.reasoning) {
		const togetherParams = params;
		togetherParams.reasoning = { enabled: reasoningEnabled };
		if (reasoningEnabled && compat.supportsReasoningEffort) togetherParams.reasoning_effort = reasoningEffort;
	} else if (reasoningEnabled && model.reasoning && compat.supportsReasoningEffort) params.reasoning_effort = reasoningEffort;
	else if (model.reasoning && compat.supportsReasoningEffort) {
		if (typeof offReasoningEffort === "string") params.reasoning_effort = offReasoningEffort;
	}
	if (compat.openRouterRouting) params.provider = compat.openRouterRouting;
	if (model.baseUrl.includes("ai-gateway.vercel.sh") && model.compat?.vercelGatewayRouting) {
		const routing = model.compat.vercelGatewayRouting;
		if (routing.only || routing.order) {
			const gatewayOptions = {};
			if (routing.only) gatewayOptions.only = routing.only;
			if (routing.order) gatewayOptions.order = routing.order;
			params.providerOptions = { gateway: gatewayOptions };
		}
	}
	return params;
}
function clampOpenAICompletionsMaxTokens(model, requestedMaxTokens) {
	const modelMaxTokens = typeof model.maxTokens === "number" && Number.isFinite(model.maxTokens) && model.maxTokens > 0 ? Math.floor(model.maxTokens) : void 0;
	return modelMaxTokens === void 0 || requestedMaxTokens <= modelMaxTokens ? requestedMaxTokens : modelMaxTokens;
}
function getCompatCacheControl(compat, cacheRetention) {
	if (compat.cacheControlFormat !== "anthropic" || cacheRetention === "none") return;
	const ttl = cacheRetention === "long" && compat.supportsLongCacheRetention ? "1h" : void 0;
	return {
		type: "ephemeral",
		...ttl ? { ttl } : {}
	};
}
function applyAnthropicCacheControl(messages, tools, cacheControl, cacheOptOutIndexes) {
	addCacheControlToSystemPrompt(messages, cacheControl);
	addCacheControlToLastTool(tools, cacheControl);
	addCacheControlToLastConversationMessage(messages, cacheControl, cacheOptOutIndexes);
}
function addCacheControlToSystemPrompt(messages, cacheControl) {
	for (const message of messages) if (message.role === "system" || message.role === "developer") {
		addCacheControlToInstructionMessage(message, cacheControl);
		return;
	}
}
function addCacheControlToLastConversationMessage(messages, cacheControl, cacheOptOutIndexes) {
	for (let i = messages.length - 1; i >= 0; i--) {
		const message = messages[i];
		if (!message || cacheOptOutIndexes.has(i)) continue;
		if (message.role === "user" || message.role === "assistant") {
			if (addCacheControlToMessage(message, cacheControl)) return;
		}
	}
}
function addCacheControlToLastTool(tools, cacheControl) {
	if (!tools || tools.length === 0) return;
	const lastTool = tools.at(-1);
	if (!lastTool) return;
	lastTool.cache_control = cacheControl;
}
function addCacheControlToInstructionMessage(message, cacheControl) {
	return addCacheControlToTextContent(message, cacheControl);
}
function addCacheControlToMessage(message, cacheControl) {
	if (message.role === "user" || message.role === "assistant") return addCacheControlToTextContent(message, cacheControl);
	return false;
}
function addCacheControlToTextContent(message, cacheControl) {
	const content = message.content;
	if (typeof content === "string") {
		if (content.length === 0) return false;
		message.content = buildCacheControlledTextParts(content, cacheControl);
		return true;
	}
	if (!Array.isArray(content)) return false;
	for (let i = content.length - 1; i >= 0; i--) {
		const part = content[i];
		if (part?.type === "text") {
			const text = part.text;
			content.splice(i, 1, ...buildCacheControlledTextParts(text, cacheControl));
			return true;
		}
	}
	return false;
}
function buildCacheControlledTextParts(text, cacheControl) {
	const split = splitSystemPromptCacheBoundary(text);
	if (!split) return [{
		type: "text",
		text,
		cache_control: cacheControl
	}];
	const parts = [];
	if (split.stablePrefix) parts.push({
		type: "text",
		text: split.stablePrefix,
		cache_control: cacheControl
	});
	if (split.dynamicSuffix) parts.push({
		type: "text",
		text: split.dynamicSuffix
	});
	return parts.length > 0 ? parts : [{
		type: "text",
		text: ""
	}];
}
function convertTools(tools, compat) {
	const projection = projectOpenAITools(tools);
	return {
		projection,
		tools: projection.tools.map((tool) => ({
			type: "function",
			function: {
				name: tool.name,
				description: tool.description,
				parameters: tool.parameters,
				...compat.supportsStrictMode && { strict: false }
			}
		}))
	};
}
//#endregion
export { streamOpenAICompletions as n, streamSimpleOpenAICompletions as r, openai_completions_exports as t };
