import { n as getEnvApiKey, r as __exportAll } from "./env-api-keys-DrgeBuva.mjs";
import { d as resolveClaudeSonnet5ModelIdentity, g as supportsClaudeNativeXhighEffort, p as supportsClaudeAdaptiveThinking, u as resolveClaudeOpus5ModelIdentity } from "./src-QkygScBs.mjs";
import { t as AssistantMessageEventStream } from "./event-stream-CEV9t6da.mjs";
import { a as ANTHROPIC_CLAUDE_CODE_BILLING_SYSTEM_BLOCK, d as requiresClaudeAdaptiveThinking, f as resolveAnthropicThinkingEffort, h as usesClaudeStreamingRefusalContract, i as transformMessages, l as mapAnthropicStopReason, m as usesClaudeFable5MessagesContract, n as getAiTransportHost, o as ANTHROPIC_CLAUDE_CODE_VERSION, r as resolveAiTransportHeaderSentinels, s as applyClaudeRequestContract, u as prepareClaudeNoPrefillRequestContext } from "./host-Bl7Kgddo.mjs";
import { n as calculateCost } from "./model-utils-Dau5dlgm.mjs";
import { t as resolveCacheRetention } from "./cache-retention-0x979a5V.mjs";
import { t as sanitizeSurrogates } from "./sanitize-unicode-DT5o51ur.mjs";
import { a as isImageWithMediaPayload, c as buildBaseOptions, h as stripSystemPromptCacheBoundary, l as clampMaxTokensToModel, m as splitSystemPromptCacheBoundary, n as extractToolResultBlockText, r as extractToolResultText, s as adjustMaxTokensForThinking, t as describeToolResultMediaPlaceholder } from "./tool-result-text-Dvkp2Dus.mjs";
import { C as usesFoundryBearerAuth, E as resolveAnthropicImageMediaType, O as applyAnthropicCacheControlToMessages, S as omitFoundryBearerCredentialHeaders, T as normalizeAnthropicInlineContent, b as resolveAnthropicFallbackServingModelCost, c as normalizeAnthropicToolChoice, d as resolveOriginalAnthropicToolName, f as toClaudeCodeToolName, g as ANTHROPIC_SERVER_SIDE_FALLBACK_BETA, h as ANTHROPIC_SERVER_SIDE_FALLBACKS, l as projectAnthropicTools, m as findActiveAnthropicToolTurnAssistantIndex, n as applyAnthropicMessageStartUsage, p as ANTHROPIC_OMITTED_REASONING_TEXT, s as normalizeAnthropicToolCallId, t as applyAnthropicMessageDeltaUsage, u as reconcileAnthropicToolChoice, v as applyAnthropicFallbackBoundary, w as createAnthropicInlineImageBudget, x as applyAnthropicRefusal, y as readAnthropicFallbackBoundary } from "./anthropic-usage-Ma4iX6uG.mjs";
import { t as createDeferredEventBuffer } from "./deferred-event-buffer-DAvyP7qA.mjs";
import { n as parseStreamingJson, t as parseJsonWithRepair } from "./json-parse-BvXNt1-7.mjs";
import { t as notifyLlmRequestActivity } from "./llm-request-activity-BjtkplhG.mjs";
import { d as transportAbortError, f as MALFORMED_STREAMING_FRAGMENT_ERROR_MESSAGE } from "./transport-stream-shared-CPNv7A3r.mjs";
import { t as headersToRecord } from "./headers-B_e4-1J0.mjs";
import { t as formatProviderError } from "./provider-error-DI0Ts28U.mjs";
import { i as resolveCloudflareBaseUrl, n as hasCopilotVisionInput, t as buildCopilotDynamicHeaders } from "./github-copilot-headers-NCJtz9i0.mjs";
import "./transform-messages-DfjpNXNQ.mjs";
import Anthropic from "@anthropic-ai/sdk";
import { Stream } from "@anthropic-ai/sdk/core/streaming.js";
//#region packages/ai/src/providers/anthropic.ts
var anthropic_exports = /* @__PURE__ */ __exportAll({
	streamAnthropic: () => streamAnthropic,
	streamSimpleAnthropic: () => streamSimpleAnthropic
});
const ANTHROPIC_CACHE_CONTROL_LIMIT = 4;
const EMPTY_ERROR_TOOL_RESULT_TEXT = "[tool error with no output]";
function getCacheControl(model, cacheRetention) {
	const retention = resolveCacheRetention(cacheRetention);
	if (retention === "none") return { retention };
	const ttl = retention === "long" && getAnthropicCompat(model).supportsLongCacheRetention ? "1h" : void 0;
	return {
		retention,
		cacheControl: {
			type: "ephemeral",
			...ttl && { ttl }
		}
	};
}
/**
* Convert content blocks to Anthropic API format
*/
async function convertContentBlocks(content, isError, imageBudget) {
	const text = extractToolResultText(content);
	const mediaPlaceholder = describeToolResultMediaPlaceholder(content);
	if (!content.some(isImageWithMediaPayload)) {
		const sanitized = sanitizeSurrogates(text);
		return sanitized.trim().length > 0 ? sanitized : mediaPlaceholder ?? (isError ? EMPTY_ERROR_TOOL_RESULT_TEXT : "");
	}
	const blocks = [];
	let hasTextBlock = false;
	for (const block of content) {
		if (!block || typeof block !== "object") continue;
		const record = block;
		const blockText = extractToolResultBlockText(block);
		if (blockText) {
			blocks.push({
				type: "text",
				text: sanitizeSurrogates(blockText)
			});
			hasTextBlock = true;
		}
		if (!isImageWithMediaPayload(record)) continue;
		const [normalizedImage] = await normalizeAnthropicInlineContent([{
			type: "image",
			data: typeof record.data === "string" ? record.data : "",
			mimeType: typeof record.mimeType === "string" ? record.mimeType : "image/jpeg"
		}], imageBudget);
		if (normalizedImage?.type !== "image") continue;
		blocks.push({
			type: "image",
			source: {
				type: "base64",
				media_type: resolveAnthropicImageMediaType(normalizedImage.mimeType),
				data: normalizedImage.data
			}
		});
	}
	if (!hasTextBlock) blocks.unshift({
		type: "text",
		text: mediaPlaceholder ?? "(see attached image)"
	});
	return blocks;
}
const FINE_GRAINED_TOOL_STREAMING_BETA = "fine-grained-tool-streaming-2025-05-14";
const INTERLEAVED_THINKING_BETA = "interleaved-thinking-2025-05-14";
const ANTHROPIC_MIN_THINKING_BUDGET_TOKENS = 1024;
function getAnthropicCompat(model) {
	const isFireworks = model.provider === "fireworks";
	const isCloudflareAiGatewayAnthropic = model.provider === "cloudflare-ai-gateway" && model.baseUrl.includes("anthropic");
	return {
		supportsEagerToolInputStreaming: model.compat?.supportsEagerToolInputStreaming ?? !isFireworks,
		supportsLongCacheRetention: model.compat?.supportsLongCacheRetention ?? !isFireworks,
		sendSessionAffinityHeaders: model.compat?.sendSessionAffinityHeaders ?? (isFireworks || isCloudflareAiGatewayAnthropic),
		supportsCacheControlOnTools: model.compat?.supportsCacheControlOnTools ?? !isFireworks,
		allowEmptySignature: model.compat?.allowEmptySignature ?? false
	};
}
function mergeHeaders(...headerSources) {
	const merged = {};
	for (const headers of headerSources) if (headers) Object.assign(merged, headers);
	return merged;
}
const ANTHROPIC_MESSAGE_EVENTS = /* @__PURE__ */ new Set([
	"message_start",
	"message_delta",
	"message_stop",
	"content_block_start",
	"content_block_delta",
	"content_block_stop"
]);
async function* iterateAnthropicEvents(response, requireMessageStop = false) {
	if (!response.body) throw new Error("Attempted to iterate over an Anthropic response with no body");
	let sawMessageStart = false;
	let sawMessageEnd = false;
	for await (const sse of Stream.rawEvents(response)) {
		if (sse.event === "error") throw new Error(sse.data);
		if (!ANTHROPIC_MESSAGE_EVENTS.has(sse.event ?? "")) continue;
		try {
			const event = parseJsonWithRepair(sse.data);
			if (event.type === "message_start") sawMessageStart = true;
			else if (event.type === "message_stop") sawMessageEnd = true;
			yield event;
		} catch (error) {
			if (error instanceof SyntaxError) throw new Error(MALFORMED_STREAMING_FRAGMENT_ERROR_MESSAGE, { cause: error });
			throw error;
		}
	}
	if ((sawMessageStart || requireMessageStop) && !sawMessageEnd) throw new Error("Anthropic stream ended before message_stop");
}
const streamAnthropic = (model, context, options) => {
	const stream = new AssistantMessageEventStream();
	const requestContext = prepareClaudeNoPrefillRequestContext(model, context);
	const requestOptions = normalizeAnthropicThinkingOptions(model, options);
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
		const refusalBuffer = usesClaudeStreamingRefusalContract(model) ? createDeferredEventBuffer(stream, () => notifyLlmRequestActivity(requestOptions?.signal)) : void 0;
		const eventSink = refusalBuffer ?? stream;
		let costModel = model;
		let messageStartPromptUsage;
		try {
			let client;
			let isOAuth;
			let serverSideFallback = false;
			if (requestOptions?.client) {
				client = requestOptions.client;
				isOAuth = false;
			} else {
				const apiKey = requestOptions?.apiKey ?? getEnvApiKey(model.provider) ?? "";
				let copilotDynamicHeaders;
				if (model.provider === "github-copilot") {
					const hasImages = hasCopilotVisionInput(requestContext.messages);
					copilotDynamicHeaders = buildCopilotDynamicHeaders({
						messages: requestContext.messages,
						hasImages
					});
				}
				const cacheSessionId = (requestOptions?.cacheRetention ?? resolveCacheRetention()) === "none" ? void 0 : requestOptions?.sessionId;
				const created = createClient(model, apiKey, requestOptions?.thinkingEnabled === true, requestOptions?.interleavedThinking ?? true, shouldUseFineGrainedToolStreamingBeta(model, requestContext), requestOptions?.headers, copilotDynamicHeaders, cacheSessionId);
				client = created.client;
				isOAuth = created.isOAuthToken;
				serverSideFallback = created.serverSideFallback;
			}
			const builtParams = await buildParams(model, requestContext, isOAuth, requestOptions, serverSideFallback);
			let params = builtParams.params;
			const toolProjection = builtParams.toolProjection;
			const nextParams = await requestOptions?.onPayload?.(params, model);
			if (nextParams !== void 0) params = nextParams;
			applyClaudeRequestContract(params, model);
			const sdkRequestOptions = {
				...requestOptions?.signal ? { signal: requestOptions.signal } : {},
				...requestOptions?.timeoutMs !== void 0 ? { timeout: requestOptions.timeoutMs } : {},
				maxRetries: requestOptions?.maxRetries ?? 0
			};
			const response = await client.messages.create({
				...params,
				stream: true
			}, sdkRequestOptions).asResponse();
			await requestOptions?.onResponse?.({
				status: response.status,
				headers: headersToRecord(response.headers)
			}, model);
			const blocks = output.content;
			const blockIndexes = /* @__PURE__ */ new Map();
			for await (const event of iterateAnthropicEvents(response, refusalBuffer !== void 0)) if (event.type === "message_start") {
				output.responseId = event.message.id;
				output.responseModel = event.message.model;
				messageStartPromptUsage = applyAnthropicMessageStartUsage(output.usage, event.message.usage);
				calculateCost(costModel, output.usage);
				eventSink.push({
					type: "start",
					partial: output
				});
			} else if (event.type === "content_block_start") {
				const fallbackBoundary = refusalBuffer ? readAnthropicFallbackBoundary(event.content_block) : null;
				if (fallbackBoundary) {
					refusalBuffer?.discard();
					blockIndexes.clear();
					applyAnthropicFallbackBoundary({
						output,
						boundary: fallbackBoundary,
						provider: model.provider
					});
					costModel = {
						...model,
						cost: resolveAnthropicFallbackServingModelCost({
							requestedModelId: model.id,
							servingModelId: fallbackBoundary.toModel,
							requestedCost: model.cost
						})
					};
					calculateCost(costModel, output.usage);
					eventSink.push({
						type: "start",
						partial: output
					});
					for (const [i, block] of blocks.entries()) {
						if (block.type !== "text") continue;
						delete block.index;
						eventSink.push({
							type: "text_start",
							contentIndex: i,
							partial: output
						});
						if (block.text) eventSink.push({
							type: "text_delta",
							contentIndex: i,
							delta: block.text,
							partial: output
						});
						eventSink.push({
							type: "text_end",
							contentIndex: i,
							content: block.text,
							partial: output
						});
					}
				} else if (event.content_block.type === "text") {
					const block = {
						type: "text",
						text: "",
						index: event.index
					};
					output.content.push(block);
					blockIndexes.set(event.index, output.content.length - 1);
					eventSink.push({
						type: "text_start",
						contentIndex: output.content.length - 1,
						partial: output
					});
				} else if (event.content_block.type === "thinking") {
					const block = {
						type: "thinking",
						thinking: "",
						thinkingSignature: "",
						index: event.index
					};
					output.content.push(block);
					blockIndexes.set(event.index, output.content.length - 1);
					eventSink.push({
						type: "thinking_start",
						contentIndex: output.content.length - 1,
						partial: output
					});
				} else if (event.content_block.type === "redacted_thinking") {
					const block = {
						type: "thinking",
						thinking: "[Reasoning redacted]",
						thinkingSignature: event.content_block.data,
						redacted: true,
						index: event.index
					};
					output.content.push(block);
					blockIndexes.set(event.index, output.content.length - 1);
					eventSink.push({
						type: "thinking_start",
						contentIndex: output.content.length - 1,
						partial: output
					});
				} else if (event.content_block.type === "tool_use") {
					const block = {
						type: "toolCall",
						id: event.content_block.id,
						name: isOAuth ? resolveOriginalAnthropicToolName(event.content_block.name, toolProjection) : event.content_block.name,
						arguments: event.content_block.input ?? {},
						partialJson: "",
						index: event.index
					};
					output.content.push(block);
					blockIndexes.set(event.index, output.content.length - 1);
					eventSink.push({
						type: "toolcall_start",
						contentIndex: output.content.length - 1,
						partial: output
					});
				}
			} else if (event.type === "content_block_delta") {
				if (event.delta.type === "text_delta") {
					const index = blockIndexes.get(event.index);
					const block = index === void 0 ? void 0 : blocks[index];
					if (index !== void 0 && block?.type === "text") {
						block.text += event.delta.text;
						eventSink.push({
							type: "text_delta",
							contentIndex: index,
							delta: event.delta.text,
							partial: output
						});
					}
				} else if (event.delta.type === "thinking_delta") {
					const index = blockIndexes.get(event.index);
					const block = index === void 0 ? void 0 : blocks[index];
					if (index !== void 0 && block?.type === "thinking") {
						block.thinking += event.delta.thinking;
						eventSink.push({
							type: "thinking_delta",
							contentIndex: index,
							delta: event.delta.thinking,
							partial: output
						});
					}
				} else if (event.delta.type === "input_json_delta") {
					const index = blockIndexes.get(event.index);
					const block = index === void 0 ? void 0 : blocks[index];
					if (index !== void 0 && block?.type === "toolCall") {
						block.partialJson += event.delta.partial_json;
						block.arguments = parseStreamingJson(block.partialJson);
						eventSink.push({
							type: "toolcall_delta",
							contentIndex: index,
							delta: event.delta.partial_json,
							partial: output
						});
					}
				} else if (event.delta.type === "signature_delta") {
					const index = blockIndexes.get(event.index);
					const block = index === void 0 ? void 0 : blocks[index];
					if (index !== void 0 && block?.type === "thinking") {
						block.thinkingSignature = block.thinkingSignature || "";
						block.thinkingSignature += event.delta.signature;
					}
				}
			} else if (event.type === "content_block_stop") {
				const index = blockIndexes.get(event.index);
				const block = index === void 0 ? void 0 : blocks[index];
				if (index !== void 0 && block) {
					blockIndexes.delete(event.index);
					delete block.index;
					if (block.type === "text") eventSink.push({
						type: "text_end",
						contentIndex: index,
						content: block.text,
						partial: output
					});
					else if (block.type === "thinking") eventSink.push({
						type: "thinking_end",
						contentIndex: index,
						content: block.thinking,
						partial: output
					});
					else if (block.type === "toolCall") {
						block.arguments = parseStreamingJson(block.partialJson);
						delete block.partialJson;
						eventSink.push({
							type: "toolcall_end",
							contentIndex: index,
							toolCall: block,
							partial: output
						});
					}
				}
			} else if (event.type === "message_delta") {
				if (event.delta.stop_reason) if (event.delta.stop_reason === "refusal") applyAnthropicRefusal(output, event.delta.stop_details, model.provider);
				else output.stopReason = mapAnthropicStopReason(event.delta.stop_reason);
				if (event.usage) applyAnthropicMessageDeltaUsage(output.usage, event.usage, messageStartPromptUsage);
				calculateCost(costModel, output.usage);
			}
			if (requestOptions?.signal?.aborted) throw transportAbortError(requestOptions.signal);
			if (output.stopReason === "aborted" || output.stopReason === "error") throw new Error(output.errorMessage ?? "An unknown error occurred");
			refusalBuffer?.flush();
			stream.push({
				type: "done",
				reason: output.stopReason,
				message: output
			});
			stream.end();
		} catch (error) {
			for (const block of output.content) {
				delete block.index;
				delete block.partialJson;
			}
			if (refusalBuffer) {
				refusalBuffer.discard();
				output.content = [];
			}
			output.stopReason = requestOptions?.signal?.aborted ? "aborted" : "error";
			output.errorMessage = formatProviderError(error);
			stream.push({
				type: "error",
				reason: output.stopReason,
				error: output
			});
			stream.end();
		}
	})();
	return stream;
};
function normalizeAnthropicThinkingOptions(model, options) {
	if (options?.thinkingEnabled !== true || supportsClaudeAdaptiveThinking(model)) return options;
	const budgetTokens = options.thinkingBudgetTokens ?? ANTHROPIC_MIN_THINKING_BUDGET_TOKENS;
	const maxTokens = options.maxTokens ?? model.maxTokens;
	if (budgetTokens >= ANTHROPIC_MIN_THINKING_BUDGET_TOKENS && budgetTokens < maxTokens) return options;
	return {
		...options,
		thinkingEnabled: false,
		thinkingBudgetTokens: void 0
	};
}
const streamSimpleAnthropic = (model, context, options) => {
	const apiKey = options?.apiKey || getEnvApiKey(model.provider);
	if (!apiKey) throw new Error(`No API key for provider: ${model.provider}`);
	const base = {
		...buildBaseOptions(model, options, apiKey),
		maxTokens: clampMaxTokensToModel(model, options?.maxTokens ?? model.maxTokens),
		toolChoice: options?.toolChoice
	};
	const mandatoryAdaptiveThinking = requiresClaudeAdaptiveThinking(model);
	if (options?.reasoning === "off" && !mandatoryAdaptiveThinking) return streamAnthropic(model, context, {
		...base,
		thinkingEnabled: false
	});
	const reasoning = options?.reasoning === "off" ? mandatoryAdaptiveThinking ? "low" : "high" : options?.reasoning;
	if (resolveClaudeOpus5ModelIdentity(model) || resolveClaudeSonnet5ModelIdentity(model)) return streamAnthropic(model, context, {
		...base,
		thinkingEnabled: true,
		effort: resolveAnthropicThinkingEffort(model, reasoning ?? "high")
	});
	if (!reasoning) return streamAnthropic(model, context, {
		...base,
		thinkingEnabled: mandatoryAdaptiveThinking,
		...mandatoryAdaptiveThinking ? { effort: "high" } : {}
	});
	if (supportsClaudeAdaptiveThinking(model)) {
		const effort = resolveAnthropicThinkingEffort(model, reasoning);
		return streamAnthropic(model, context, {
			...base,
			thinkingEnabled: true,
			effort
		});
	}
	const adjusted = adjustMaxTokensForThinking(base.maxTokens, model.maxTokens, reasoning, options?.thinkingBudgets);
	const thinkingEnabled = adjusted.thinkingBudget >= ANTHROPIC_MIN_THINKING_BUDGET_TOKENS;
	const maxTokens = thinkingEnabled ? adjusted.maxTokens : clampMaxTokensToModel(model, options?.maxTokens ?? model.maxTokens);
	return streamAnthropic(model, context, {
		...base,
		maxTokens,
		thinkingEnabled,
		thinkingBudgetTokens: thinkingEnabled ? adjusted.thinkingBudget : void 0
	});
};
function isOAuthToken(apiKey) {
	return getAiTransportHost().resolveSecretSentinel(apiKey).includes("sk-ant-oat");
}
function isAnthropicPublicEndpoint(baseUrl) {
	if (!baseUrl) return true;
	try {
		return new URL(baseUrl).hostname.toLowerCase() === "api.anthropic.com";
	} catch {
		return false;
	}
}
/**
* Server-side refusal fallback is a first-party Claude API beta: proxies and
* Bedrock/Vertex/Foundry reject the `fallbacks` param, and OAuth (Claude Code
* identity) requests are excluded until the beta is verified there.
*/
function supportsAnthropicServerSideFallback(model) {
	if (!usesClaudeFable5MessagesContract(model) && resolveClaudeOpus5ModelIdentity(model) === void 0 || model.provider !== "anthropic") return false;
	return isAnthropicPublicEndpoint(model.baseUrl);
}
function createClient(model, apiKey, thinkingEnabled, interleavedThinking, useFineGrainedToolStreamingBeta, optionsHeaders, dynamicHeaders, sessionId) {
	const needsInterleavedBeta = interleavedThinking && !supportsClaudeAdaptiveThinking(model);
	const betaFeatures = [];
	if (useFineGrainedToolStreamingBeta) betaFeatures.push(FINE_GRAINED_TOOL_STREAMING_BETA);
	if (needsInterleavedBeta) betaFeatures.push(INTERLEAVED_THINKING_BETA);
	const fetchOptions = /^kimi(?:-|$)/.test(model.provider) && thinkingEnabled ? { sanitizeSse: false } : void 0;
	const fetch = getAiTransportHost().buildModelFetch(model, void 0, fetchOptions);
	if (model.provider === "cloudflare-ai-gateway") return {
		client: new Anthropic({
			apiKey,
			authToken: null,
			baseURL: resolveCloudflareBaseUrl(model),
			dangerouslyAllowBrowser: true,
			defaultHeaders: mergeHeaders({
				accept: "application/json",
				"anthropic-dangerous-direct-browser-access": "true",
				Authorization: null,
				...betaFeatures.length > 0 ? { "anthropic-beta": betaFeatures.join(",") } : {}
			}, model.headers, optionsHeaders),
			fetch
		}),
		isOAuthToken: false,
		serverSideFallback: false
	};
	if (model.provider === "github-copilot") return {
		client: new Anthropic({
			apiKey: null,
			authToken: apiKey,
			baseURL: model.baseUrl,
			dangerouslyAllowBrowser: true,
			defaultHeaders: mergeHeaders({
				accept: "application/json",
				"anthropic-dangerous-direct-browser-access": "true",
				...betaFeatures.length > 0 ? { "anthropic-beta": betaFeatures.join(",") } : {}
			}, model.headers, dynamicHeaders, optionsHeaders),
			fetch
		}),
		isOAuthToken: false,
		serverSideFallback: false
	};
	if (usesFoundryBearerAuth({
		...model,
		headers: resolveAiTransportHeaderSentinels(model.headers)
	})) return {
		client: new Anthropic({
			apiKey: null,
			authToken: apiKey,
			baseURL: model.baseUrl,
			dangerouslyAllowBrowser: true,
			defaultHeaders: mergeHeaders({
				accept: "application/json",
				"anthropic-dangerous-direct-browser-access": "true",
				...betaFeatures.length > 0 ? { "anthropic-beta": betaFeatures.join(",") } : {}
			}, omitFoundryBearerCredentialHeaders(model.headers), dynamicHeaders, optionsHeaders),
			fetch
		}),
		isOAuthToken: false,
		serverSideFallback: false
	};
	if (isOAuthToken(apiKey)) return {
		client: new Anthropic({
			apiKey: null,
			authToken: apiKey,
			baseURL: model.baseUrl,
			dangerouslyAllowBrowser: true,
			defaultHeaders: mergeHeaders({
				accept: "application/json",
				"anthropic-dangerous-direct-browser-access": "true",
				"anthropic-beta": [
					"claude-code-20250219",
					"oauth-2025-04-20",
					...betaFeatures
				].join(","),
				"user-agent": `claude-cli/${ANTHROPIC_CLAUDE_CODE_VERSION}`,
				"x-app": "cli"
			}, model.headers, optionsHeaders),
			fetch
		}),
		isOAuthToken: true,
		serverSideFallback: false
	};
	const serverSideFallback = supportsAnthropicServerSideFallback(model);
	if (serverSideFallback) betaFeatures.push(ANTHROPIC_SERVER_SIDE_FALLBACK_BETA);
	const sessionAffinityHeaders = sessionId && getAnthropicCompat(model).sendSessionAffinityHeaders ? { "x-session-affinity": sessionId } : {};
	return {
		client: new Anthropic({
			apiKey,
			authToken: null,
			baseURL: model.baseUrl,
			dangerouslyAllowBrowser: true,
			defaultHeaders: mergeHeaders({
				accept: "application/json",
				"anthropic-dangerous-direct-browser-access": "true",
				...betaFeatures.length > 0 ? { "anthropic-beta": betaFeatures.join(",") } : {}
			}, sessionAffinityHeaders, model.headers, optionsHeaders),
			fetch
		}),
		isOAuthToken: false,
		serverSideFallback
	};
}
async function buildParams(model, context, isOAuthTokenResult, options, serverSideFallback = false) {
	const mandatoryAdaptiveThinking = requiresClaudeAdaptiveThinking(model);
	const replayThinkingEnabled = mandatoryAdaptiveThinking || options?.thinkingEnabled === true;
	const { cacheControl } = getCacheControl(model, options?.cacheRetention);
	const system = buildAnthropicSystemBlocks(context.systemPrompt, isOAuthTokenResult, cacheControl);
	const compat = getAnthropicCompat(model);
	const convertedTools = context.tools ? convertTools(context.tools, isOAuthTokenResult, compat.supportsEagerToolInputStreaming, compat.supportsCacheControlOnTools ? cacheControl : void 0) : void 0;
	const tools = convertedTools?.tools;
	const toolProjection = convertedTools?.projection;
	const systemCacheControlCount = countNativeCacheControlMarkers(system);
	const toolCacheControlCount = countNativeCacheControlMarkers(tools);
	const messageCacheControlLimit = Math.max(0, ANTHROPIC_CACHE_CONTROL_LIMIT - systemCacheControlCount - toolCacheControlCount);
	const params = {
		model: model.id,
		messages: await convertMessages(context.messages, model, isOAuthTokenResult, cacheControl, messageCacheControlLimit, replayThinkingEnabled, compat.allowEmptySignature),
		max_tokens: options?.maxTokens ?? model.maxTokens,
		stream: true
	};
	if (system) params.system = system;
	if (serverSideFallback) params.fallbacks = ANTHROPIC_SERVER_SIDE_FALLBACKS;
	if (options?.temperature !== void 0 && !options?.thinkingEnabled && !supportsClaudeNativeXhighEffort(model)) params.temperature = options.temperature;
	if (options?.stop !== void 0 && options.stop.length > 0) params.stop_sequences = options.stop;
	if (tools && tools.length > 0) params.tools = tools;
	if (mandatoryAdaptiveThinking || model.reasoning || supportsClaudeAdaptiveThinking(model)) {
		if (mandatoryAdaptiveThinking || options?.thinkingEnabled) {
			const display = options?.thinkingDisplay ?? "summarized";
			if (supportsClaudeAdaptiveThinking(model)) {
				params.thinking = {
					type: "adaptive",
					display
				};
				const effort = options?.effort ?? (mandatoryAdaptiveThinking ? "high" : void 0);
				if (effort) params.output_config = effort === "xhigh" ? { effort } : { effort };
			} else params.thinking = {
				type: "enabled",
				budget_tokens: options?.thinkingBudgetTokens ?? ANTHROPIC_MIN_THINKING_BUDGET_TOKENS,
				display
			};
		} else if (options?.thinkingEnabled === false) params.thinking = { type: "disabled" };
	}
	if (options?.metadata) {
		const userId = options.metadata.user_id;
		if (typeof userId === "string") params.metadata = { user_id: userId };
	}
	if (options?.toolChoice) {
		const normalizedToolChoice = normalizeAnthropicToolChoice(replayThinkingEnabled, options.toolChoice);
		const projectedToolChoice = toolProjection ? reconcileAnthropicToolChoice(normalizedToolChoice, toolProjection) : normalizedToolChoice;
		if (projectedToolChoice) params.tool_choice = projectedToolChoice;
	}
	return {
		params,
		toolProjection
	};
}
async function convertMessages(messages, model, isOAuthTokenValue, cacheControl, messageCacheControlLimit = 4, replayThinkingEnabled = true, allowEmptySignature = false) {
	const params = [];
	const imageBudget = createAnthropicInlineImageBudget();
	const cacheBreakpointOptOutParamIndexes = /* @__PURE__ */ new Set();
	const transformedMessages = transformMessages(messages, model, normalizeAnthropicToolCallId);
	const activeToolTurnAssistantIndex = replayThinkingEnabled ? -1 : findActiveAnthropicToolTurnAssistantIndex(transformedMessages);
	for (let i = 0; i < transformedMessages.length; i++) {
		const msg = transformedMessages[i];
		if (!msg) continue;
		if (msg.role === "user") {
			const isRuntimeContextCarrier = msg.runtimeContextCarrier === true;
			if (typeof msg.content === "string") {
				if (msg.content.trim().length > 0) {
					if (isRuntimeContextCarrier) cacheBreakpointOptOutParamIndexes.add(params.length);
					params.push({
						role: "user",
						content: sanitizeSurrogates(msg.content)
					});
				}
			} else {
				const filteredBlocks = (await normalizeAnthropicInlineContent(msg.content, imageBudget)).map((item) => {
					if (item.type === "text") return {
						type: "text",
						text: sanitizeSurrogates(item.text)
					};
					return {
						type: "image",
						source: {
							type: "base64",
							media_type: resolveAnthropicImageMediaType(item.mimeType),
							data: item.data
						}
					};
				}).filter((b) => {
					if (b.type === "text") return b.text.trim().length > 0;
					return true;
				});
				if (filteredBlocks.length === 0) continue;
				if (isRuntimeContextCarrier) cacheBreakpointOptOutParamIndexes.add(params.length);
				params.push({
					role: "user",
					content: filteredBlocks
				});
			}
		} else if (msg.role === "assistant") {
			const blocks = [];
			let omittedThinking = false;
			for (const block of msg.content) if (block.type === "text") {
				if (block.text.trim().length === 0) continue;
				blocks.push({
					type: "text",
					text: sanitizeSurrogates(block.text)
				});
			} else if (block.type === "thinking") {
				if (!replayThinkingEnabled && i !== activeToolTurnAssistantIndex) {
					omittedThinking = true;
					continue;
				}
				if (block.redacted) {
					if (!block.thinkingSignature) throw new Error("redacted thinking block is missing its opaque signature");
					blocks.push({
						type: "redacted_thinking",
						data: block.thinkingSignature
					});
					continue;
				}
				const thinkingSignature = block.thinkingSignature?.trim();
				const hasNativeThinkingSignature = Boolean(thinkingSignature) && thinkingSignature !== "reasoning_content";
				if (block.thinking.trim().length === 0 && !hasNativeThinkingSignature) continue;
				if (!thinkingSignature && !allowEmptySignature) blocks.push({
					type: "text",
					text: sanitizeSurrogates(block.thinking)
				});
				else {
					if (thinkingSignature === "reasoning_content") continue;
					blocks.push({
						type: "thinking",
						thinking: block.thinking,
						signature: thinkingSignature ?? ""
					});
				}
			} else if (block.type === "toolCall") blocks.push({
				type: "tool_use",
				id: block.id,
				name: isOAuthTokenValue ? toClaudeCodeToolName(block.name) : block.name,
				input: block.arguments ?? {}
			});
			if (blocks.length === 0 && omittedThinking) blocks.push({
				type: "text",
				text: ANTHROPIC_OMITTED_REASONING_TEXT
			});
			if (blocks.length === 0) continue;
			params.push({
				role: "assistant",
				content: blocks
			});
		} else if (msg.role === "toolResult") {
			const toolResults = [];
			toolResults.push({
				type: "tool_result",
				tool_use_id: msg.toolCallId,
				content: await convertContentBlocks(msg.content, msg.isError, imageBudget),
				is_error: msg.isError
			});
			let j = i + 1;
			while (j < transformedMessages.length) {
				const nextMsg = transformedMessages.at(j);
				if (nextMsg?.role !== "toolResult") break;
				toolResults.push({
					type: "tool_result",
					tool_use_id: nextMsg.toolCallId,
					content: await convertContentBlocks(nextMsg.content, nextMsg.isError, imageBudget),
					is_error: nextMsg.isError
				});
				j++;
			}
			i = j - 1;
			params.push({
				role: "user",
				content: toolResults
			});
		}
	}
	if (cacheControl) applyAnthropicCacheControlToMessages(params, cacheControl, messageCacheControlLimit, cacheBreakpointOptOutParamIndexes);
	return params;
}
function buildAnthropicSystemBlocks(systemPrompt, isOAuthTokenResult, cacheControl) {
	const blocks = [];
	if (isOAuthTokenResult) {
		blocks.push({
			type: "text",
			text: ANTHROPIC_CLAUDE_CODE_BILLING_SYSTEM_BLOCK
		});
		blocks.push({
			type: "text",
			text: "You are Claude Code, Anthropic's official CLI for Claude.",
			...cacheControl ? { cache_control: cacheControl } : {}
		});
	}
	if (systemPrompt) blocks.push(...buildSystemPromptBlocks(systemPrompt, cacheControl));
	return blocks.length > 0 ? blocks : void 0;
}
function buildSystemPromptBlocks(systemPrompt, cacheControl) {
	if (!cacheControl) return [{
		type: "text",
		text: sanitizeSurrogates(stripSystemPromptCacheBoundary(systemPrompt))
	}];
	const split = splitSystemPromptCacheBoundary(systemPrompt);
	if (!split) return [{
		type: "text",
		text: sanitizeSurrogates(systemPrompt),
		cache_control: cacheControl
	}];
	const blocks = [];
	if (split.stablePrefix) blocks.push({
		type: "text",
		text: sanitizeSurrogates(split.stablePrefix),
		cache_control: cacheControl
	});
	if (split.dynamicSuffix) blocks.push({
		type: "text",
		text: sanitizeSurrogates(split.dynamicSuffix)
	});
	return blocks.length > 0 ? blocks : [{
		type: "text",
		text: ""
	}];
}
function countNativeCacheControlMarkers(blocks) {
	if (!Array.isArray(blocks)) return 0;
	let count = 0;
	for (const block of blocks) if (block && typeof block === "object" && "cache_control" in block) count += 1;
	return count;
}
function shouldUseFineGrainedToolStreamingBeta(model, context) {
	return Boolean(context.tools?.length) && !getAnthropicCompat(model).supportsEagerToolInputStreaming;
}
function convertTools(tools, isOAuthTokenLocal, supportsEagerToolInputStreaming, cacheControl) {
	const projection = projectAnthropicTools(tools, (name) => isOAuthTokenLocal ? toClaudeCodeToolName(name) : name);
	const convertedTools = [];
	for (const [index, tool] of projection.tools.entries()) {
		const convertedTool = {
			name: tool.wireName,
			description: tool.description,
			input_schema: tool.inputSchema
		};
		if (supportsEagerToolInputStreaming) convertedTool.eager_input_streaming = true;
		if (cacheControl && index === projection.tools.length - 1) convertedTool.cache_control = cacheControl;
		convertedTools.push(convertedTool);
	}
	return {
		projection,
		tools: convertedTools
	};
}
//#endregion
export { streamAnthropic as n, streamSimpleAnthropic as r, anthropic_exports as t };
