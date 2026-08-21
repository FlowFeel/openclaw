import { n as getEnvApiKey } from "./env-api-keys-DrgeBuva.mjs";
import { d as resolveClaudeSonnet5ModelIdentity, g as supportsClaudeNativeXhighEffort, p as supportsClaudeAdaptiveThinking, u as resolveClaudeOpus5ModelIdentity } from "./src-QkygScBs.mjs";
import { r as createAssistantMessageEventStream } from "./event-stream-CEV9t6da.mjs";
import { _ as normalizeLowercaseStringOrEmpty, a as ANTHROPIC_CLAUDE_CODE_BILLING_SYSTEM_BLOCK, b as isRecord, c as defaultsClaudeAdaptiveThinking, d as requiresClaudeAdaptiveThinking, f as resolveAnthropicThinkingEffort, g as hasNonEmptyString, h as usesClaudeStreamingRefusalContract, l as mapAnthropicStopReason, m as usesClaudeFable5MessagesContract, n as getAiTransportHost, o as ANTHROPIC_CLAUDE_CODE_VERSION, r as resolveAiTransportHeaderSentinels, s as applyClaudeRequestContract, u as prepareClaudeNoPrefillRequestContext, y as readStringValue } from "./host-Bl7Kgddo.mjs";
import { n as calculateCost } from "./model-utils-Dau5dlgm.mjs";
import { n as clampOpenAIPromptCacheKey } from "./openai-prompt-cache-mZTCdRPo.mjs";
import { t as resolveCacheRetention } from "./cache-retention-0x979a5V.mjs";
import { a as isImageWithMediaPayload, h as stripSystemPromptCacheBoundary, n as extractToolResultBlockText, r as extractToolResultText, s as adjustMaxTokensForThinking, t as describeToolResultMediaPlaceholder, v as sortPromptCacheToolsByName } from "./tool-result-text-Dvkp2Dus.mjs";
import { a as resolveProviderEndpoint, c as transformTransportMessages, i as resolveOpenAIStrictToolSetting, n as buildGuardedModelFetch, r as resolveModelRequestTimeoutMs, s as resolveProviderRequestPolicyConfig } from "./tool-schema-json-projection-B1b-XCn5.mjs";
import { A as applyAnthropicPayloadPolicyToParams, C as usesFoundryBearerAuth, D as canonicalizeBase64, E as resolveAnthropicImageMediaType, M as resolveAnthropicPayloadPolicy, O as applyAnthropicCacheControlToMessages, S as omitFoundryBearerCredentialHeaders, T as normalizeAnthropicInlineContent, b as resolveAnthropicFallbackServingModelCost, c as normalizeAnthropicToolChoice, d as resolveOriginalAnthropicToolName, f as toClaudeCodeToolName, g as ANTHROPIC_SERVER_SIDE_FALLBACK_BETA, h as ANTHROPIC_SERVER_SIDE_FALLBACKS, j as resolveAnthropicEphemeralCacheControl, k as applyAnthropicEphemeralCacheControlMarkers, l as projectAnthropicTools, m as findActiveAnthropicToolTurnAssistantIndex, n as applyAnthropicMessageStartUsage, p as ANTHROPIC_OMITTED_REASONING_TEXT, s as normalizeAnthropicToolCallId, t as applyAnthropicMessageDeltaUsage, u as reconcileAnthropicToolChoice, v as applyAnthropicFallbackBoundary, w as createAnthropicInlineImageBudget, x as applyAnthropicRefusal, y as readAnthropicFallbackBoundary } from "./anthropic-usage-Ma4iX6uG.mjs";
import { t as toErrorObject } from "./error-coercion-DgxlWC0n.mjs";
import { a as convertMessages, c as resolveOpenAICompletionsResponseFormat, d as rememberPendingCommentaryTags, f as tagPendingCommentaryText, i as finalizeOpenAICompletionsToolCalls, l as shouldOmitOllamaCompatResponseFormat, n as mapOpenAIStopReason, o as detectOpenAICompletionsCompat, r as createOpenAICompletionsToolCallDeltaNormalizer, s as resolveOpenAICompletionsCompat, t as resolveOpenAIReasoningEffortMap, u as clearPendingCommentaryText } from "./openai-reasoning-compat-DKebnIBL.mjs";
import { t as createDeferredEventBuffer } from "./deferred-event-buffer-DAvyP7qA.mjs";
import { n as parseStreamingJson } from "./json-parse-BvXNt1-7.mjs";
import { t as notifyLlmRequestActivity } from "./llm-request-activity-BjtkplhG.mjs";
import { A as normalizeResponsesFailedEvent, B as resolveReplayableResponsesMessageId, C as prepareOpenAIResponsesReasoningItemForReplay, D as applyServiceTierPricing, E as tagOpenAIResponsesReasoningReplayItem, F as summarizeResponsesFailedNoDetailsObservation, H as findOpenAIStrictToolProjectionDiagnostics, I as summarizeResponsesPayload, K as resolveOpenAIProjectedToolsStrictToolFlag, L as summarizeResponsesTools, M as stringifyRedactedEvent, N as stringifyRedactedPayload, O as buildResponsesFailedNoDetailsObservation, P as summarizeOpenAITransportError, R as AZURE_RESPONSES_FIRST_EVENT_TIMEOUT_MS, S as isInvalidEncryptedContentError, T as stripResponsesRequestEncryptedContent, W as normalizeOpenAIStrictToolParameters, _t as parseJsonObjectPreservingUnsafeIntegers, at as isOpenAIGpt54MiniModel, b as convertResponsesMessages, ct as normalizeOpenAIReasoningEffort, dt as supportsOpenAIReasoningEffort, gt as resolveModelSseDebugMode, ht as resolveModelPayloadDebugMode, j as safeDebugValue, k as logResponsesFailedNoDetails, lt as resolveOpenAIReasoningEffortForModel, mt as emitModelTransportDebug, n as processResponsesStream, o as observeResponsesStream, ot as isOpenAIGpt55Model, pt as uniqueStrings, st as isOpenAIGpt56Model, t as ResponsesStreamFailure, v as buildOpenAIResponsesReasoningReplayMetadata, vt as parseJsonPreservingUnsafeIntegers, w as resolveAzureOpenAIApiVersion, x as createResponsesStreamWithEncryptedContentRetry, y as buildResponsesInputMessage, yt as quoteUnsafeIntegerLiterals, z as OPENAI_CODEX_RESPONSES_DEFAULT_INSTRUCTIONS } from "./openai-responses-stream-internal-BW8Vqzup.mjs";
import { a as parseStrictPositiveInteger } from "./number-coercion-1Miyb5MO.mjs";
import { C as resolveSecretSentinel, S as resolveModelHeaderSentinels$1, T as supportsModelTools, _ as isGoogleGemini3ProModel, a as failTransportStream, c as mergeTransportMetadata, d as transportAbortError, f as MALFORMED_STREAMING_FRAGMENT_ERROR_MESSAGE, g as isGoogleGemini3FlashModel, h as isCodeModeModelVisibleToolName, i as createWritableTransportEventStream, l as sanitizeNonEmptyTransportPayloadText, m as estimateStringChars, n as coerceTransportToolCallArguments, o as finalizeTransportStream, p as createAbortError$1, r as createEmptyTransportUsage, s as mergeTransportHeaders, t as assignTransportErrorDetails, u as sanitizeTransportPayloadText, v as parseRetryAfterSeconds, w as sha256Hex, y as readResponseTextSnippet } from "./transport-stream-shared-CPNv7A3r.mjs";
import { a as parseOpenAICompletionsUsage, c as throwIfModelStreamAborted, d as reconcileOpenAIResponsesToolChoice, i as log, l as projectOpenAITools, n as createModelStreamCooperativeScheduler, o as readOpenAICompletionsContentDeltas, r as isOpenAICompletionsThinkingEnabled, s as resolvePromptCacheKey, t as GEMINI_THOUGHT_SIGNATURE_VALIDATOR_SKIP, u as reconcileOpenAICompletionsToolChoice } from "./openai-transport-shared-Cipt7egQ.mjs";
import { t as createReasoningTagTextPartitioner } from "./reasoning-tag-text-partitioner-CGDyLWUR.mjs";
import { a as withFirstStreamEventTimeout, i as getFirstStreamEventTimeoutMs, r as getFirstStreamEventTimeoutHandler, t as createFirstStreamEventAbortController } from "./stream-first-event-timeout-BIBomOGq.mjs";
import { i as resolveAzureDeploymentNameFromMap, t as isOpenAICompatibleAzureResponsesBaseUrl } from "./azure-openai-responses-client-compat-C7K7QfUE.mjs";
import { t as headersToRecord } from "./headers-B_e4-1J0.mjs";
import { randomUUID } from "node:crypto";
import OpenAI, { AzureOpenAI } from "openai";
//#region packages/ai/src/transports/anthropic-transport-stream.ts
/**
* Native Anthropic Messages streaming transport.
* Converts OpenClaw contexts/tools into Anthropic payloads, streams SSE events
* back into runtime output blocks, and applies provider request policy.
*/
const ANTHROPIC_MESSAGES_ERROR_BODY_MAX_BYTES = 8 * 1024;
const ANTHROPIC_MESSAGES_ERROR_BODY_MAX_CHARS = 400;
const ANTHROPIC_MESSAGES_ERROR_BODY_READ_IDLE_TIMEOUT_MS = 1e4;
const ANTHROPIC_MESSAGES_DEFAULT_MAX_TOKENS = 4096;
const ANTHROPIC_MESSAGES_FALLBACK_CONTEXT_DIVISOR = 4;
const ANTHROPIC_MESSAGES_SSE_PENDING_BUFFER_MAX_CHARS = 16 * 1024 * 1024;
function resolveAnthropicRequestModelId(model) {
	if (isDirectAnthropicModel(model) && /^anthropic\//i.test(model.id)) return model.id.replace(/^anthropic\//i, "");
	return model.id;
}
const EMPTY_ANTHROPIC_MESSAGES_FALLBACK_TEXT = ".";
function resolvePositiveAnthropicTokenLimit(value) {
	if (typeof value !== "number" || !Number.isFinite(value)) return;
	const floored = Math.floor(value);
	return floored > 0 ? floored : void 0;
}
function resolveAnthropicMessagesMaxTokens(params) {
	const requested = resolvePositiveAnthropicTokenLimit(params.requestedMaxTokens);
	if (requested !== void 0) return requested;
	const modelMax = resolvePositiveAnthropicTokenLimit(params.modelMaxTokens);
	if (modelMax !== void 0) return params.useModelDefault ? modelMax : Math.min(modelMax, 32e3);
	if (params.modelMaxTokens !== void 0) return;
	const contextWindow = resolvePositiveAnthropicTokenLimit(params.modelContextWindow);
	return contextWindow === void 0 ? ANTHROPIC_MESSAGES_DEFAULT_MAX_TOKENS : Math.max(1, Math.min(ANTHROPIC_MESSAGES_DEFAULT_MAX_TOKENS, Math.floor(contextWindow / ANTHROPIC_MESSAGES_FALLBACK_CONTEXT_DIVISOR)));
}
function isAnthropicOAuthToken(apiKey) {
	return (resolveSecretSentinel(apiKey) ?? apiKey).includes("sk-ant-oat");
}
function isDirectAnthropicModel(model) {
	if (normalizeLowercaseStringOrEmpty(model.provider) !== "anthropic") return false;
	const endpointClass = resolveProviderEndpoint(model.baseUrl).endpointClass;
	return endpointClass === "default" || endpointClass === "anthropic-public";
}
function isKimiAnthropicProvider(provider) {
	return /^kimi(?:-|$)/.test(normalizeLowercaseStringOrEmpty(provider ?? ""));
}
/**
* Server-side refusal fallback is a first-party Claude API beta: proxies and
* Bedrock/Vertex/Foundry reject the `fallbacks` param, and OAuth (Claude Code
* identity) requests are excluded until the beta is verified there.
*/
function useAnthropicServerSideFallback(model) {
	return (usesClaudeFable5MessagesContract(model) || resolveClaudeOpus5ModelIdentity(model) !== void 0) && isDirectAnthropicModel(model);
}
function supportsReasoningContentReplay(model) {
	return resolveProviderEndpoint(model.baseUrl).endpointClass === "xiaomi-native";
}
function buildAnthropicBetaHeader(model, betaFeatures, params) {
	if (!isDirectAnthropicModel(model)) return;
	return params.oauth ? `claude-code-20250219,oauth-2025-04-20,${betaFeatures.join(",")}` : betaFeatures.join(",");
}
const NON_VISION_USER_IMAGE_PLACEHOLDER = "(image omitted: model does not support images)";
async function convertContentBlocks(content, model, imageBudget) {
	const text = extractToolResultText(content);
	const mediaPlaceholder = describeToolResultMediaPlaceholder(content);
	if (!(model.input.includes("image") && content.some(isImageWithMediaPayload))) return sanitizeNonEmptyTransportPayloadText(text, mediaPlaceholder ?? "(no output)");
	const blocks = [];
	let hasTextBlock = false;
	for (const block of content) {
		if (!block || typeof block !== "object") continue;
		const record = block;
		const blockText = extractToolResultBlockText(block);
		if (blockText) {
			blocks.push({
				type: "text",
				text: sanitizeTransportPayloadText(blockText)
			});
			hasTextBlock = true;
		}
		if (!isImageWithMediaPayload(record)) continue;
		const [normalizedImage] = await normalizeAnthropicInlineContent([{
			type: "image",
			data: typeof record.data === "string" ? record.data : "",
			mimeType: typeof record.mimeType === "string" ? record.mimeType : "image/png"
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
async function convertAnthropicMessages(messages, model, isOAuthToken, options) {
	const params = [];
	const imageBudget = createAnthropicInlineImageBudget();
	const allowReasoningContentReplay = options.allowReasoningContentReplay === true;
	const replayThinkingEnabled = options.replayThinkingEnabled !== false;
	const transformedMessages = transformTransportMessages(messages, model, normalizeAnthropicToolCallId);
	const activeToolTurnAssistantIndex = replayThinkingEnabled ? -1 : findActiveAnthropicToolTurnAssistantIndex(transformedMessages);
	for (let i = 0; i < transformedMessages.length; i += 1) {
		const msg = transformedMessages[i];
		if (!msg) continue;
		if (msg.role === "user") {
			const isRuntimeContextCarrier = msg.runtimeContextCarrier === true;
			if (typeof msg.content === "string") {
				if (msg.content.trim().length > 0) {
					const userParam = {
						role: "user",
						content: sanitizeTransportPayloadText(msg.content)
					};
					if (isRuntimeContextCarrier) options.cacheBreakpointOptOutMessageIndexes.add(params.length);
					params.push(userParam);
				}
				continue;
			}
			const blocks = (model.input.includes("image") ? await normalizeAnthropicInlineContent(msg.content, imageBudget) : msg.content.map((item) => item.type === "image" ? {
				type: "text",
				text: NON_VISION_USER_IMAGE_PLACEHOLDER
			} : item)).map((item) => item.type === "text" ? {
				type: "text",
				text: sanitizeTransportPayloadText(item.text)
			} : {
				type: "image",
				source: {
					type: "base64",
					media_type: resolveAnthropicImageMediaType(item.mimeType),
					data: item.data
				}
			});
			let filteredBlocks = model.input.includes("image") ? blocks : blocks.filter((block) => block.type !== "image");
			filteredBlocks = filteredBlocks.filter((block) => block.type !== "text" || block.text.trim().length > 0);
			if (filteredBlocks.length === 0) continue;
			const userParam = {
				role: "user",
				content: filteredBlocks
			};
			if (isRuntimeContextCarrier) options.cacheBreakpointOptOutMessageIndexes.add(params.length);
			params.push(userParam);
			continue;
		}
		if (msg.role === "assistant") {
			const blocks = [];
			const reasoningContent = [];
			let omittedThinking = false;
			for (const block of msg.content) {
				if (block.type === "text") {
					if (block.text.trim().length > 0) blocks.push({
						type: "text",
						text: sanitizeTransportPayloadText(block.text)
					});
					continue;
				}
				if (block.type === "thinking") {
					const thinkingSignature = block.thinkingSignature?.trim();
					const isReasoningContent = thinkingSignature === "reasoning_content";
					if (!replayThinkingEnabled && i !== activeToolTurnAssistantIndex && !isReasoningContent) {
						omittedThinking = true;
						continue;
					}
					if (block.redacted) {
						blocks.push({
							type: "redacted_thinking",
							data: block.thinkingSignature
						});
						continue;
					}
					const hasNativeThinkingSignature = Boolean(thinkingSignature) && !isReasoningContent;
					if (block.thinking.trim().length === 0 && !hasNativeThinkingSignature) continue;
					if (!thinkingSignature) blocks.push({
						type: "text",
						text: sanitizeTransportPayloadText(block.thinking)
					});
					else {
						const thinking = thinkingSignature === "reasoning_content" ? sanitizeTransportPayloadText(block.thinking) : block.thinking;
						if (thinkingSignature === "reasoning_content") {
							if (allowReasoningContentReplay) {
								blocks.push({
									type: "thinking",
									thinking,
									signature: thinkingSignature
								});
								reasoningContent.push(thinking);
							}
							continue;
						}
						blocks.push({
							type: "thinking",
							thinking,
							signature: thinkingSignature
						});
					}
					continue;
				}
				if (block.type === "toolCall") blocks.push({
					type: "tool_use",
					id: block.id,
					name: isOAuthToken ? toClaudeCodeToolName(block.name) : block.name,
					input: coerceTransportToolCallArguments(block.arguments)
				});
			}
			if (blocks.length === 0 && omittedThinking) blocks.push({
				type: "text",
				text: ANTHROPIC_OMITTED_REASONING_TEXT
			});
			if (blocks.length > 0) {
				const assistantMsg = {
					role: "assistant",
					content: blocks
				};
				if (reasoningContent.length > 0) assistantMsg.reasoning_content = reasoningContent.join("\n");
				else if (allowReasoningContentReplay) blocks.unshift({
					type: "thinking",
					thinking: "",
					signature: "reasoning_content"
				});
				params.push(assistantMsg);
			}
			continue;
		}
		if (msg.role === "toolResult") {
			const toolResult = msg;
			const toolResults = [{
				type: "tool_result",
				tool_use_id: toolResult.toolCallId,
				content: await convertContentBlocks(toolResult.content, model, imageBudget),
				is_error: toolResult.isError
			}];
			let j = i + 1;
			while (j < transformedMessages.length) {
				const nextMsg = transformedMessages.at(j);
				if (nextMsg?.role !== "toolResult") break;
				toolResults.push({
					type: "tool_result",
					tool_use_id: nextMsg.toolCallId,
					content: await convertContentBlocks(nextMsg.content, model, imageBudget),
					is_error: nextMsg.isError
				});
				j += 1;
			}
			i = j - 1;
			params.push({
				role: "user",
				content: toolResults
			});
		}
	}
	return params;
}
function ensureNonEmptyAnthropicMessages(messages) {
	return messages.length > 0 ? messages : [{
		role: "user",
		content: EMPTY_ANTHROPIC_MESSAGES_FALLBACK_TEXT
	}];
}
function convertAnthropicTools(tools, isOAuthToken) {
	const projection = projectAnthropicTools(tools ?? [], (name) => isOAuthToken ? toClaudeCodeToolName(name) : name);
	const converted = [];
	for (const tool of projection.tools) converted.push({
		name: tool.wireName,
		description: tool.description,
		input_schema: tool.inputSchema
	});
	return {
		projection,
		tools: converted
	};
}
function parseAnthropicToolCallArguments(inputJson) {
	return parseJsonObjectPreservingUnsafeIntegers(inputJson) ?? parseStreamingJson(inputJson);
}
const DEFAULT_ANTHROPIC_BASE_URL = "https://api.anthropic.com";
/** Resolve the effective Anthropic API base URL from model or environment. */
function resolveAnthropicBaseUrl(baseUrl) {
	return baseUrl?.trim() || process.env.ANTHROPIC_BASE_URL?.trim() || DEFAULT_ANTHROPIC_BASE_URL;
}
/** Resolve the Anthropic Messages endpoint URL for the effective base URL. */
function resolveAnthropicMessagesUrl(baseUrl) {
	const normalized = resolveAnthropicBaseUrl(baseUrl).replace(/\/+$/, "");
	return normalized.endsWith("/v1") ? `${normalized}/messages` : `${normalized}/v1/messages`;
}
function withEffectiveAnthropicBaseUrl(model) {
	const baseUrl = resolveAnthropicBaseUrl(model.baseUrl);
	return baseUrl === model.baseUrl ? model : {
		...model,
		baseUrl
	};
}
function createAbortError(signal) {
	const reason = signal.reason;
	if (reason instanceof Error) return reason;
	return createAbortError$1("Request was aborted", reason === void 0 ? void 0 : { cause: reason });
}
function readAnthropicSseChunk(reader, signal) {
	if (!signal) return reader.read();
	return new Promise((resolve, reject) => {
		let settled = false;
		const onAbort = () => {
			if (settled) return;
			settled = true;
			signal.removeEventListener("abort", onAbort);
			reader.cancel(signal.reason).catch(() => void 0);
			reject(createAbortError(signal));
		};
		if (signal.aborted) {
			onAbort();
			return;
		}
		signal.addEventListener("abort", onAbort, { once: true });
		reader.read().then((result) => {
			if (settled) return;
			settled = true;
			signal.removeEventListener("abort", onAbort);
			resolve(result);
		}, (error) => {
			if (settled) return;
			settled = true;
			signal.removeEventListener("abort", onAbort);
			reject(toErrorObject(error, "Non-Error rejection"));
		});
	});
}
function parseAnthropicSseEventData(data) {
	try {
		return JSON.parse(data);
	} catch (error) {
		if (error instanceof SyntaxError) throw new Error(MALFORMED_STREAMING_FRAGMENT_ERROR_MESSAGE, { cause: error });
		throw error;
	}
}
function assertAnthropicSsePendingBufferWithinLimit(pendingChars) {
	if (pendingChars <= ANTHROPIC_MESSAGES_SSE_PENDING_BUFFER_MAX_CHARS) return;
	throw new Error(`Anthropic Messages SSE response exceeded max pending buffer size (${ANTHROPIC_MESSAGES_SSE_PENDING_BUFFER_MAX_CHARS} chars) without event boundary`);
}
async function* parseAnthropicSseBody(body, signal) {
	const reader = body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";
	let completed = false;
	try {
		while (true) {
			const { done, value } = await readAnthropicSseChunk(reader, signal);
			if (done) {
				completed = true;
				break;
			}
			buffer = `${buffer}${decoder.decode(value, { stream: true })}`.replaceAll("\r\n", "\n");
			let frameEnd = buffer.indexOf("\n\n");
			while (frameEnd >= 0) {
				assertAnthropicSsePendingBufferWithinLimit(frameEnd);
				const frame = buffer.slice(0, frameEnd);
				buffer = buffer.slice(frameEnd + 2);
				const data = frame.split("\n").filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trimStart()).join("\n");
				if (data && data !== "[DONE]") yield parseAnthropicSseEventData(data);
				frameEnd = buffer.indexOf("\n\n");
			}
			assertAnthropicSsePendingBufferWithinLimit(buffer.length);
		}
		const tailBuffer = `${buffer}${decoder.decode()}`.replaceAll("\r\n", "\n");
		assertAnthropicSsePendingBufferWithinLimit(tailBuffer.length);
		const tail = tailBuffer.trim();
		if (tail) {
			const data = tail.split("\n").filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trimStart()).join("\n");
			if (data && data !== "[DONE]") yield parseAnthropicSseEventData(data);
		}
	} finally {
		if (!completed) await reader.cancel(signal?.reason).catch(() => void 0);
		reader.releaseLock();
	}
}
function createAnthropicMessagesClient(params) {
	const url = resolveAnthropicMessagesUrl(params.baseURL);
	return { messages: { async *stream(body, options) {
		const headers = mergeTransportHeaders({
			"content-type": "application/json",
			"anthropic-version": "2023-06-01",
			...params.apiKey ? { "x-api-key": params.apiKey } : {},
			...params.authToken ? { authorization: `Bearer ${params.authToken}` } : {}
		}, params.defaultHeaders);
		const response = await params.fetch(url, {
			method: "POST",
			headers,
			body: JSON.stringify(body),
			signal: options?.signal
		});
		if (!response.ok) {
			const detail = await readAnthropicMessagesErrorBodySnippet(response);
			throw new Error(formatAnthropicMessagesHttpError(response, detail));
		}
		if (!response.body) return;
		yield* parseAnthropicSseBody(response.body, options?.signal);
	} } };
}
function formatAnthropicMessagesHttpError(response, detail) {
	const retryAfterSeconds = parseRetryAfterSeconds(response.headers);
	const retryAfterSuffix = Number.isFinite(retryAfterSeconds) ? `; Retry-After: ${Math.ceil(retryAfterSeconds ?? 0)} seconds` : "";
	return `HTTP ${response.status}: ${detail || "Anthropic Messages request failed"}${retryAfterSuffix}`;
}
async function readAnthropicMessagesErrorBodySnippet(response) {
	try {
		return await readResponseTextSnippet(response, {
			maxBytes: ANTHROPIC_MESSAGES_ERROR_BODY_MAX_BYTES,
			maxChars: ANTHROPIC_MESSAGES_ERROR_BODY_MAX_CHARS,
			chunkTimeoutMs: ANTHROPIC_MESSAGES_ERROR_BODY_READ_IDLE_TIMEOUT_MS,
			onIdleTimeout: ({ chunkTimeoutMs }) => /* @__PURE__ */ new Error(`Anthropic Messages error response stalled: no data received for ${chunkTimeoutMs}ms`)
		}) ?? "";
	} catch (error) {
		if (error instanceof Error && error.message.startsWith("Anthropic Messages error response stalled:")) return error.message;
		return "";
	}
}
function createAnthropicTransportClient(params) {
	const { model, context, apiKey, options } = params;
	const needsInterleavedBeta = (options?.interleavedThinking ?? true) && !supportsClaudeAdaptiveThinking(model);
	const fetch = isKimiAnthropicProvider(model.provider) && options?.thinkingEnabled === true ? buildGuardedModelFetch(model, void 0, { sanitizeSse: false }) : buildGuardedModelFetch(model);
	if (model.provider === "github-copilot") {
		const betaFeatures = needsInterleavedBeta ? ["interleaved-thinking-2025-05-14"] : [];
		return {
			client: createAnthropicMessagesClient({
				apiKey: null,
				authToken: apiKey,
				baseURL: model.baseUrl,
				defaultHeaders: mergeTransportHeaders({
					accept: "application/json",
					"anthropic-dangerous-direct-browser-access": "true",
					...betaFeatures.length > 0 ? { "anthropic-beta": betaFeatures.join(",") } : {}
				}, model.headers, getAiTransportHost().buildCopilotDynamicHeaders(context.messages), options?.headers),
				fetch
			}),
			isOAuthToken: false
		};
	}
	if (usesFoundryBearerAuth(resolveModelHeaderSentinels$1(model))) {
		const betaFeatures = needsInterleavedBeta ? ["interleaved-thinking-2025-05-14"] : [];
		return {
			client: createAnthropicMessagesClient({
				apiKey: null,
				authToken: apiKey,
				baseURL: model.baseUrl,
				defaultHeaders: mergeTransportHeaders({
					accept: "application/json",
					"anthropic-dangerous-direct-browser-access": "true",
					...betaFeatures.length > 0 ? { "anthropic-beta": betaFeatures.join(",") } : {}
				}, omitFoundryBearerCredentialHeaders(model.headers), options?.headers),
				fetch
			}),
			isOAuthToken: false
		};
	}
	const betaFeatures = ["fine-grained-tool-streaming-2025-05-14"];
	if (needsInterleavedBeta) betaFeatures.push("interleaved-thinking-2025-05-14");
	if (isAnthropicOAuthToken(apiKey)) {
		const betaHeader = buildAnthropicBetaHeader(model, betaFeatures, { oauth: true });
		return {
			client: createAnthropicMessagesClient({
				apiKey: null,
				authToken: apiKey,
				baseURL: model.baseUrl,
				defaultHeaders: mergeTransportHeaders({
					accept: "application/json",
					"anthropic-dangerous-direct-browser-access": "true",
					...betaHeader ? { "anthropic-beta": betaHeader } : {},
					"user-agent": `claude-cli/${ANTHROPIC_CLAUDE_CODE_VERSION}`,
					"x-app": "cli"
				}, model.headers, options?.headers),
				fetch
			}),
			isOAuthToken: true
		};
	}
	if (useAnthropicServerSideFallback(model)) betaFeatures.push(ANTHROPIC_SERVER_SIDE_FALLBACK_BETA);
	const betaHeader = buildAnthropicBetaHeader(model, betaFeatures, { oauth: false });
	return {
		client: createAnthropicMessagesClient({
			apiKey,
			baseURL: model.baseUrl,
			defaultHeaders: mergeTransportHeaders({
				accept: "application/json",
				"anthropic-dangerous-direct-browser-access": "true",
				...betaHeader ? { "anthropic-beta": betaHeader } : {}
			}, model.headers, options?.headers),
			fetch
		}),
		isOAuthToken: false
	};
}
async function buildAnthropicParams(model, context, isOAuthToken, options) {
	const mandatoryAdaptiveThinking = requiresClaudeAdaptiveThinking(model);
	const replayThinkingEnabled = mandatoryAdaptiveThinking || options?.thinkingEnabled === true;
	const maxTokens = resolveAnthropicMessagesMaxTokens({
		modelContextWindow: model.contextWindow,
		modelMaxTokens: model.maxTokens,
		requestedMaxTokens: options?.maxTokens
	});
	if (maxTokens === void 0) throw new Error(`Anthropic Messages transport requires a positive maxTokens value for ${model.provider}/${model.id}`);
	const payloadPolicy = resolveAnthropicPayloadPolicy({
		provider: model.provider,
		api: model.api,
		baseUrl: model.baseUrl,
		cacheRetention: options?.cacheRetention,
		enableCacheControl: true
	});
	const cacheBreakpointOptOutMessageIndexes = /* @__PURE__ */ new Set();
	const messages = await convertAnthropicMessages(context.messages, model, isOAuthToken, {
		allowReasoningContentReplay: supportsReasoningContentReplay(model),
		cacheBreakpointOptOutMessageIndexes,
		replayThinkingEnabled
	});
	const params = {
		model: resolveAnthropicRequestModelId(model),
		messages: ensureNonEmptyAnthropicMessages(messages),
		max_tokens: maxTokens,
		stream: true
	};
	if (!isOAuthToken && useAnthropicServerSideFallback(model)) params.fallbacks = ANTHROPIC_SERVER_SIDE_FALLBACKS;
	if (isOAuthToken) params.system = [
		{
			type: "text",
			text: ANTHROPIC_CLAUDE_CODE_BILLING_SYSTEM_BLOCK
		},
		{
			type: "text",
			text: "You are Claude Code, Anthropic's official CLI for Claude."
		},
		...context.systemPrompt ? [{
			type: "text",
			text: sanitizeTransportPayloadText(context.systemPrompt)
		}] : []
	];
	else if (context.systemPrompt) params.system = [{
		type: "text",
		text: sanitizeTransportPayloadText(context.systemPrompt)
	}];
	if (options?.temperature !== void 0 && !options.thinkingEnabled && !supportsClaudeNativeXhighEffort(model)) params.temperature = options.temperature;
	if (options?.stop !== void 0 && options.stop.length > 0) params.stop_sequences = options.stop;
	let toolProjection;
	if (context.tools) {
		const convertedTools = convertAnthropicTools(context.tools, isOAuthToken);
		toolProjection = convertedTools.projection;
		if (convertedTools.tools.length > 0) params.tools = convertedTools.tools;
	}
	if (mandatoryAdaptiveThinking || model.reasoning || supportsClaudeAdaptiveThinking(model)) {
		if (mandatoryAdaptiveThinking || options?.thinkingEnabled) if (supportsClaudeAdaptiveThinking(model)) {
			params.thinking = {
				type: "adaptive",
				display: options?.thinkingDisplay ?? "summarized"
			};
			const effort = options?.effort ?? (mandatoryAdaptiveThinking ? "high" : void 0);
			if (effort) params.output_config = { effort };
		} else params.thinking = {
			type: "enabled",
			budget_tokens: options?.thinkingBudgetTokens ?? 1024
		};
		else if (options?.thinkingEnabled === false) params.thinking = { type: "disabled" };
	}
	if (options?.metadata && typeof options.metadata.user_id === "string") params.metadata = { user_id: options.metadata.user_id };
	if (options?.toolChoice) {
		const normalizedToolChoice = normalizeAnthropicToolChoice(replayThinkingEnabled, options.toolChoice);
		const projectedToolChoice = toolProjection ? reconcileAnthropicToolChoice(normalizedToolChoice, toolProjection) : normalizedToolChoice;
		if (projectedToolChoice) params.tool_choice = projectedToolChoice;
	}
	applyAnthropicPayloadPolicyToParams(params, payloadPolicy, cacheBreakpointOptOutMessageIndexes);
	return {
		params,
		toolProjection
	};
}
function resolveAnthropicTransportOptions(model, options, apiKey) {
	const baseMaxTokens = resolveAnthropicMessagesMaxTokens({
		modelContextWindow: model.contextWindow,
		modelMaxTokens: model.maxTokens,
		requestedMaxTokens: options?.maxTokens,
		useModelDefault: resolveClaudeSonnet5ModelIdentity(model) !== void 0 || resolveClaudeOpus5ModelIdentity(model) !== void 0
	});
	if (baseMaxTokens === void 0) throw new Error(`Anthropic Messages transport requires a positive maxTokens value for ${model.provider}/${model.id}`);
	const reasoningModelMaxTokens = resolvePositiveAnthropicTokenLimit(model.maxTokens) ?? baseMaxTokens;
	const mandatoryAdaptiveThinking = requiresClaudeAdaptiveThinking(model);
	const reasoning = options?.reasoning === "off" && mandatoryAdaptiveThinking ? "low" : options?.reasoning;
	const resolved = {
		temperature: options?.temperature,
		stop: options?.stop,
		maxTokens: baseMaxTokens,
		signal: options?.signal,
		apiKey,
		cacheRetention: options?.cacheRetention,
		sessionId: options?.sessionId,
		headers: options?.headers,
		onPayload: options?.onPayload,
		maxRetryDelayMs: options?.maxRetryDelayMs,
		metadata: options?.metadata,
		interleavedThinking: options?.interleavedThinking,
		toolChoice: options?.toolChoice,
		thinkingBudgets: options?.thinkingBudgets,
		reasoning
	};
	if (reasoning === "off") {
		resolved.thinkingEnabled = false;
		return resolved;
	}
	if (!reasoning) {
		resolved.thinkingEnabled = defaultsClaudeAdaptiveThinking(model);
		if (resolved.thinkingEnabled) resolved.effort = "high";
		return resolved;
	}
	if (supportsClaudeAdaptiveThinking(model)) {
		resolved.thinkingEnabled = true;
		resolved.effort = resolveAnthropicThinkingEffort(model, reasoning);
		return resolved;
	}
	const adjusted = adjustMaxTokensForThinking(baseMaxTokens, reasoningModelMaxTokens, reasoning === "max" ? "high" : reasoning, options?.thinkingBudgets);
	const thinkingEnabled = adjusted.thinkingBudget >= 1024;
	resolved.maxTokens = adjusted.maxTokens;
	resolved.thinkingEnabled = thinkingEnabled;
	resolved.thinkingBudgetTokens = thinkingEnabled ? adjusted.thinkingBudget : void 0;
	return resolved;
}
/** Create the stream function used by Anthropic Messages transport models. */
function createAnthropicMessagesTransportStreamFn() {
	return (rawModel, context, rawOptions) => {
		const model = withEffectiveAnthropicBaseUrl(rawModel);
		const options = rawOptions;
		const { eventStream, stream } = createWritableTransportEventStream();
		(async () => {
			const output = {
				role: "assistant",
				content: [],
				api: "anthropic-messages",
				provider: model.provider,
				model: model.id,
				usage: createEmptyTransportUsage(),
				stopReason: "stop",
				timestamp: Date.now()
			};
			const refusalBuffer = usesClaudeStreamingRefusalContract(model) ? createDeferredEventBuffer(stream, () => notifyLlmRequestActivity(options?.signal)) : void 0;
			const eventSink = refusalBuffer ?? stream;
			let costModel = model;
			let messageStartPromptUsage;
			try {
				const apiKey = options?.apiKey ?? getEnvApiKey(model.provider) ?? "";
				if (!apiKey) throw new Error(`No API key for provider: ${model.provider}`);
				const transportOptions = resolveAnthropicTransportOptions(model, options, apiKey);
				const requestContext = prepareClaudeNoPrefillRequestContext(model, context);
				const { client, isOAuthToken } = createAnthropicTransportClient({
					model,
					context: requestContext,
					apiKey,
					options: transportOptions
				});
				const builtParams = await buildAnthropicParams(model, requestContext, isOAuthToken, transportOptions);
				let params = builtParams.params;
				const toolProjection = builtParams.toolProjection;
				const nextParams = await transportOptions.onPayload?.(params, model);
				if (nextParams !== void 0) params = nextParams;
				applyClaudeRequestContract(params, model);
				const anthropicStream = client.messages.stream({
					...params,
					stream: true
				}, transportOptions.signal ? { signal: transportOptions.signal } : void 0);
				const blocks = output.content;
				const blockIndexes = /* @__PURE__ */ new Map();
				const pendingThinkingSignatures = /* @__PURE__ */ new Map();
				const allowReasoningContentReplay = supportsReasoningContentReplay(model);
				const reasoningContentThinkingBlocks = /* @__PURE__ */ new Map();
				const reasoningContentTextBlocks = /* @__PURE__ */ new Map();
				let sawMessageStop = false;
				const pendingTextEnds = [];
				const flushPendingTextEnds = () => {
					for (const event of pendingTextEnds) eventSink.push(event);
					pendingTextEnds.length = 0;
				};
				const eventIndexKey = (eventIndex) => typeof eventIndex === "number" ? eventIndex : -1;
				const appendReasoningContentThinkingDelta = (eventIndex, rawText) => {
					if (typeof rawText !== "string") return false;
					const text = sanitizeTransportPayloadText(rawText);
					if (text.length === 0) return false;
					const key = eventIndexKey(eventIndex);
					let contentIndex = reasoningContentThinkingBlocks.get(key);
					let block = contentIndex === void 0 ? void 0 : output.content[contentIndex];
					if (!block || block.type !== "thinking") {
						block = {
							type: "thinking",
							thinking: "",
							thinkingSignature: "reasoning_content"
						};
						output.content.push(block);
						contentIndex = output.content.length - 1;
						reasoningContentThinkingBlocks.set(key, contentIndex);
						eventSink.push({
							type: "thinking_start",
							contentIndex,
							partial: output
						});
					}
					block.thinking += text;
					block.thinkingSignature = "reasoning_content";
					eventSink.push({
						type: "thinking_delta",
						contentIndex,
						delta: text,
						partial: output
					});
					return true;
				};
				const appendReasoningContentTextDelta = (eventIndex, rawText) => {
					if (typeof rawText !== "string") return false;
					const text = sanitizeTransportPayloadText(rawText);
					if (text.length === 0) return false;
					const key = eventIndexKey(eventIndex);
					let contentIndex = reasoningContentTextBlocks.get(key);
					let block = contentIndex === void 0 ? void 0 : output.content[contentIndex];
					if (!block || block.type !== "text") {
						block = {
							type: "text",
							text: ""
						};
						output.content.push(block);
						contentIndex = output.content.length - 1;
						reasoningContentTextBlocks.set(key, contentIndex);
						eventSink.push({
							type: "text_start",
							contentIndex,
							partial: output
						});
					}
					block.text += text;
					eventSink.push({
						type: "text_delta",
						contentIndex,
						delta: text,
						partial: output
					});
					return true;
				};
				const finishReasoningContentSidecars = (eventIndex) => {
					const key = eventIndexKey(eventIndex);
					const thinkingContentIndex = reasoningContentThinkingBlocks.get(key);
					if (thinkingContentIndex !== void 0) {
						reasoningContentThinkingBlocks.delete(key);
						const block = output.content[thinkingContentIndex];
						if (block?.type === "thinking") eventSink.push({
							type: "thinking_end",
							contentIndex: thinkingContentIndex,
							content: block.thinking,
							partial: output
						});
					}
					const textContentIndex = reasoningContentTextBlocks.get(key);
					if (textContentIndex === void 0) return;
					reasoningContentTextBlocks.delete(key);
					const block = output.content[textContentIndex];
					if (block?.type === "text") eventSink.push({
						type: "text_end",
						contentIndex: textContentIndex,
						content: block.text,
						partial: output
					});
				};
				for await (const event of anthropicStream) {
					if (event.type === "error") {
						const error = event.error;
						throw new Error(error?.message || "Anthropic Messages stream failed");
					}
					if (event.type === "message_start") {
						const message = event.message;
						const usage = message?.usage ?? {};
						output.responseId = typeof message?.id === "string" ? message.id : void 0;
						output.responseModel = typeof message?.model === "string" ? message.model : void 0;
						messageStartPromptUsage = applyAnthropicMessageStartUsage(output.usage, usage);
						calculateCost(costModel, output.usage);
						eventSink.push({
							type: "start",
							partial: output
						});
						continue;
					}
					if (event.type === "message_stop") {
						sawMessageStop = true;
						continue;
					}
					if (event.type === "content_block_start") {
						const contentBlock = event.content_block;
						const index = typeof event.index === "number" ? event.index : -1;
						const fallbackBoundary = refusalBuffer ? readAnthropicFallbackBoundary(contentBlock) : null;
						if (fallbackBoundary) {
							refusalBuffer?.discard();
							pendingTextEnds.length = 0;
							blockIndexes.clear();
							pendingThinkingSignatures.clear();
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
							for (const [i, block] of output.content.entries()) {
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
								pendingTextEnds.push({
									type: "text_end",
									contentIndex: i,
									content: block.text,
									partial: output
								});
							}
							continue;
						}
						pendingThinkingSignatures.delete(index);
						if (contentBlock?.type === "text") {
							const text = typeof contentBlock.text === "string" ? sanitizeTransportPayloadText(contentBlock.text) : "";
							const block = {
								type: "text",
								text,
								index
							};
							output.content.push(block);
							const contentIndex = output.content.length - 1;
							blockIndexes.set(index, contentIndex);
							eventSink.push({
								type: "text_start",
								contentIndex,
								partial: output
							});
							if (text.length > 0) eventSink.push({
								type: "text_delta",
								contentIndex,
								delta: text,
								partial: output
							});
							continue;
						}
						if (contentBlock?.type === "thinking") {
							const thinking = typeof contentBlock.thinking === "string" ? contentBlock.thinking : "";
							const block = {
								type: "thinking",
								thinking,
								thinkingSignature: typeof contentBlock.signature === "string" ? contentBlock.signature : "",
								index
							};
							output.content.push(block);
							const contentIndex = output.content.length - 1;
							blockIndexes.set(index, contentIndex);
							eventSink.push({
								type: "thinking_start",
								contentIndex,
								partial: output
							});
							if (thinking.length > 0) eventSink.push({
								type: "thinking_delta",
								contentIndex,
								delta: thinking,
								partial: output
							});
							continue;
						}
						if (contentBlock?.type === "redacted_thinking") {
							const block = {
								type: "thinking",
								thinking: "[Reasoning redacted]",
								thinkingSignature: typeof contentBlock.data === "string" ? contentBlock.data : "",
								redacted: true,
								index
							};
							output.content.push(block);
							blockIndexes.set(index, output.content.length - 1);
							eventSink.push({
								type: "thinking_start",
								contentIndex: output.content.length - 1,
								partial: output
							});
							continue;
						}
						if (contentBlock?.type === "tool_use") {
							tagPendingCommentaryText(output.content);
							flushPendingTextEnds();
							const block = {
								type: "toolCall",
								id: typeof contentBlock.id === "string" ? contentBlock.id : "",
								name: typeof contentBlock.name === "string" ? isOAuthToken ? resolveOriginalAnthropicToolName(contentBlock.name, toolProjection) : contentBlock.name : "",
								arguments: contentBlock.input && typeof contentBlock.input === "object" ? contentBlock.input : {},
								partialJson: "",
								index
							};
							output.content.push(block);
							blockIndexes.set(index, output.content.length - 1);
							eventSink.push({
								type: "toolcall_start",
								contentIndex: output.content.length - 1,
								partial: output
							});
						}
						continue;
					}
					if (event.type === "content_block_delta") {
						const delta = event.delta;
						const eventIndex = typeof event.index === "number" ? event.index : void 0;
						let index = eventIndex === void 0 ? void 0 : blockIndexes.get(eventIndex);
						let block = index === void 0 ? void 0 : blocks[index];
						if (allowReasoningContentReplay) {
							const appendedThinking = appendReasoningContentThinkingDelta(event.index, delta?.reasoning_content);
							const hasNativeAnthropicDelta = delta?.type === "text_delta" && typeof delta.text === "string" || delta?.type === "thinking_delta" && typeof delta.thinking === "string" || delta?.type === "input_json_delta" && typeof delta.partial_json === "string" || delta?.type === "signature_delta" && typeof delta.signature === "string";
							let appendedContent = false;
							if (!hasNativeAnthropicDelta && typeof delta?.content === "string" && delta.content.length > 0) {
								const text = sanitizeTransportPayloadText(delta.content);
								if (text.length > 0) if (block?.type === "text") {
									block.text += text;
									eventSink.push({
										type: "text_delta",
										contentIndex: index,
										delta: text,
										partial: output
									});
									appendedContent = true;
								} else appendedContent = appendReasoningContentTextDelta(event.index, text);
							}
							if ((appendedThinking || appendedContent) && !hasNativeAnthropicDelta) continue;
						}
						if (!block && delta?.type === "text_delta" && typeof delta.text === "string") {
							block = {
								type: "text",
								text: "",
								index: typeof event.index === "number" ? event.index : blocks.length
							};
							output.content.push(block);
							index = output.content.length - 1;
							if (typeof event.index === "number") blockIndexes.set(event.index, index);
							eventSink.push({
								type: "text_start",
								contentIndex: index,
								partial: output
							});
						}
						if (block?.type === "text" && delta?.type === "text_delta" && typeof delta.text === "string") {
							block.text += delta.text;
							eventSink.push({
								type: "text_delta",
								contentIndex: index,
								delta: delta.text,
								partial: output
							});
							continue;
						}
						if (block?.type === "thinking" && delta?.type === "thinking_delta" && typeof delta.thinking === "string") {
							block.thinking += delta.thinking;
							eventSink.push({
								type: "thinking_delta",
								contentIndex: index,
								delta: delta.thinking,
								partial: output
							});
							continue;
						}
						if (block?.type === "toolCall" && delta?.type === "input_json_delta" && typeof delta.partial_json === "string") {
							const partialJson = `${block.partialJson ?? ""}${delta.partial_json}`;
							block.partialJson = partialJson;
							block.arguments = parseAnthropicToolCallArguments(partialJson);
							eventSink.push({
								type: "toolcall_delta",
								contentIndex: index,
								delta: delta.partial_json,
								partial: output
							});
							continue;
						}
						if (block?.type === "thinking" && delta?.type === "signature_delta" && typeof delta.signature === "string") {
							const signatureIndex = eventIndexKey(event.index);
							const pendingSignature = pendingThinkingSignatures.get(signatureIndex);
							if (pendingSignature === void 0) {
								block.thinkingSignature = "";
								pendingThinkingSignatures.set(signatureIndex, delta.signature);
							} else pendingThinkingSignatures.set(signatureIndex, pendingSignature + delta.signature);
						}
						continue;
					}
					if (event.type === "content_block_stop") {
						const eventIndex = typeof event.index === "number" ? event.index : void 0;
						const pendingSignature = eventIndex === void 0 ? void 0 : pendingThinkingSignatures.get(eventIndex);
						if (eventIndex !== void 0) pendingThinkingSignatures.delete(eventIndex);
						const index = eventIndex === void 0 ? void 0 : blockIndexes.get(eventIndex);
						const block = index === void 0 ? void 0 : blocks[index];
						if (eventIndex === void 0 || index === void 0 || !block) {
							finishReasoningContentSidecars(event.index);
							continue;
						}
						blockIndexes.delete(eventIndex);
						delete block.index;
						if (block.type === "text") {
							pendingTextEnds.push({
								type: "text_end",
								contentIndex: index,
								content: block.text,
								partial: output
							});
							finishReasoningContentSidecars(event.index);
							continue;
						}
						if (block.type === "thinking") {
							if (pendingSignature !== void 0) block.thinkingSignature = pendingSignature;
							eventSink.push({
								type: "thinking_end",
								contentIndex: index,
								content: block.thinking,
								partial: output
							});
							finishReasoningContentSidecars(event.index);
							continue;
						}
						if (block.type === "toolCall") {
							delete block.partialJson;
							eventSink.push({
								type: "toolcall_end",
								contentIndex: index,
								toolCall: block,
								partial: output
							});
							finishReasoningContentSidecars(event.index);
						}
						continue;
					}
					if (event.type === "message_delta") {
						const delta = event.delta;
						const usage = event.usage;
						if (delta?.stop_reason) if (delta.stop_reason === "refusal") applyAnthropicRefusal(output, delta.stop_details, model.provider);
						else output.stopReason = mapAnthropicStopReason(delta.stop_reason);
						applyAnthropicMessageDeltaUsage(output.usage, usage, messageStartPromptUsage);
						calculateCost(costModel, output.usage);
						if (output.stopReason === "toolUse" || output.content.some((block) => block.type === "toolCall")) tagPendingCommentaryText(output.content);
						flushPendingTextEnds();
					}
				}
				if (refusalBuffer && !sawMessageStop) throw new Error("Anthropic stream ended before message_stop");
				if (transportOptions.signal?.aborted) throw transportAbortError(transportOptions.signal);
				if (output.stopReason === "aborted" || output.stopReason === "error") throw new Error(output.errorMessage ?? "An unknown error occurred");
				refusalBuffer?.flush();
				if (output.stopReason === "toolUse" || output.content.some((block) => block.type === "toolCall")) tagPendingCommentaryText(output.content);
				flushPendingTextEnds();
				finalizeTransportStream({
					stream,
					output
				});
			} catch (error) {
				if (refusalBuffer) {
					refusalBuffer.discard();
					output.content = [];
				}
				failTransportStream({
					stream,
					output,
					signal: options?.signal,
					error,
					cleanup: () => {
						for (const block of output.content) delete block.index;
					}
				});
			}
		})();
		return eventStream;
	};
}
//#endregion
//#region packages/ai/src/transports/deepseek-text-filter.ts
/**
* DeepSeek DSML streaming text filter.
* Removes provider-emitted DSML tool markup while buffering split tag prefixes
* across streamed chunks.
*/
const DSML_KINDS = [
	"tool_use_error",
	"tool_calls",
	"tool_call",
	"function_calls"
];
const DSML_BARS = ["|", "｜"];
const DSML_OPEN_TOKENS = DSML_BARS.flatMap((bar) => DSML_KINDS.map((kind) => `<${bar}DSML${bar}${kind}>`));
const DSML_CLOSE_TOKENS = DSML_BARS.flatMap((bar) => DSML_KINDS.map((kind) => `</${bar}DSML${bar}${kind}>`));
const MAX_OPEN_TOKEN_LEN = Math.max(...DSML_OPEN_TOKENS.map((token) => token.length));
const MAX_CLOSE_TOKEN_LEN = Math.max(...DSML_CLOSE_TOKENS.map((token) => token.length));
/** Create an incremental text filter that strips DeepSeek DSML tool blocks. */
function createDeepSeekTextFilter() {
	let buffer = "";
	let insideDsml = false;
	const consume = (final) => {
		const output = [];
		const emit = (text) => {
			if (text) output.push(text);
		};
		while (buffer) {
			if (insideDsml) {
				const close = findEarliestToken(buffer, DSML_CLOSE_TOKENS);
				if (close) {
					buffer = buffer.slice(close.index + close.token.length);
					insideDsml = false;
					continue;
				}
				const keep = final ? 0 : Math.min(buffer.length, MAX_CLOSE_TOKEN_LEN - 1);
				buffer = buffer.slice(buffer.length - keep);
				if (final) insideDsml = false;
				return output;
			}
			const open = findEarliestToken(buffer, DSML_OPEN_TOKENS);
			if (open) {
				emit(buffer.slice(0, open.index));
				buffer = buffer.slice(open.index + open.token.length);
				insideDsml = true;
				continue;
			}
			if (final) {
				emit(buffer);
				buffer = "";
				return output;
			}
			const keep = longestDsmlOpenPrefixSuffixLength(buffer);
			const emitLength = buffer.length - keep;
			if (emitLength <= 0) return output;
			emit(buffer.slice(0, emitLength));
			buffer = buffer.slice(emitLength);
			return output;
		}
		return output;
	};
	return {
		push(chunk) {
			buffer += chunk;
			return consume(false);
		},
		flush() {
			return consume(true);
		}
	};
}
function findEarliestToken(text, tokens) {
	let best = null;
	for (const token of tokens) {
		const index = text.indexOf(token);
		if (index !== -1 && (!best || index < best.index)) best = {
			index,
			token
		};
	}
	return best;
}
function longestDsmlOpenPrefixSuffixLength(text) {
	const maxLength = Math.min(text.length, MAX_OPEN_TOKEN_LEN - 1);
	for (let length = maxLength; length > 0; length--) {
		const suffix = text.slice(text.length - length);
		if (DSML_OPEN_TOKENS.some((token) => token.startsWith(suffix))) return length;
	}
	return 0;
}
//#endregion
//#region packages/ai/src/transports/model-max-tokens-params.ts
/**
* Max-token parameter normalization across provider/native naming variants.
* Callers canonicalize aliases before dispatch so payloads cannot carry
* conflicting limits.
*/
const MAX_TOKENS_PARAM_KEYS = [
	"maxTokens",
	"max_completion_tokens",
	"max_tokens"
];
/** Return a finite non-negative max-token value, or undefined for invalid input. */
function resolveNonNegativeMaxTokensParam(value) {
	return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : void 0;
}
/** Resolve the first supported max-token parameter present in a params object. */
function resolveMaxTokensParam(params) {
	if (!params) return;
	for (const key of MAX_TOKENS_PARAM_KEYS) {
		const resolved = resolveNonNegativeMaxTokensParam(params[key]);
		if (resolved !== void 0) return resolved;
	}
}
/**
* Canonicalize merged params to `maxTokens`, preserving source precedence from
* left to right across the provided source objects.
*/
function canonicalizeMaxTokensParam(params) {
	let resolved;
	for (const source of params.sources) {
		const sourceValue = resolveMaxTokensParam(source);
		if (sourceValue !== void 0) resolved = sourceValue;
	}
	if (resolved === void 0) return;
	for (const key of MAX_TOKENS_PARAM_KEYS) delete params.merged[key];
	params.merged.maxTokens = resolved;
}
//#endregion
//#region packages/ai/src/transports/model-transport-url.ts
/**
* Debug formatting helpers for model transport endpoints.
* Keeps logs useful without exposing credentials, request params, or fragments.
*/
/** Return a sanitized URL suitable for logs and diagnostics. */
function formatModelTransportDebugUrl(rawUrl) {
	try {
		const parsed = new URL(rawUrl);
		parsed.username = "";
		parsed.password = "";
		parsed.search = "";
		parsed.hash = "";
		return parsed.toString();
	} catch {
		return "<invalid-url>";
	}
}
/** Format a configured base URL for debug output, or the implicit default. */
function formatModelTransportDebugBaseUrl(rawUrl) {
	return rawUrl ? formatModelTransportDebugUrl(rawUrl) : "default";
}
//#endregion
//#region packages/ai/src/transports/openai-compatible-conversation-turn.ts
/**
* OpenAI-compatible conversation turn detector.
*
* Some providers reject requests without a non-empty user/assistant turn; this
* helper checks the loose message payload shape before transport submission.
*/
function hasNonEmptyContentPart(part) {
	if (!part || typeof part !== "object") return false;
	const record = part;
	if (record.type === "text") return hasNonEmptyString(record.text);
	return true;
}
function hasNonEmptyMessageContent(content) {
	if (hasNonEmptyString(content)) return true;
	if (!Array.isArray(content)) return false;
	return content.some(hasNonEmptyContentPart);
}
function hasAssistantToolCall(message) {
	const toolCalls = message.tool_calls;
	return Array.isArray(toolCalls) && toolCalls.some((toolCall) => {
		return Boolean(toolCall && typeof toolCall === "object");
	});
}
/** Returns whether an OpenAI-compatible messages payload contains a usable turn. */
function hasOpenAICompatibleConversationTurn(messages) {
	if (!Array.isArray(messages)) return false;
	return messages.some((message) => {
		if (!message || typeof message !== "object") return false;
		const record = message;
		if (record.role === "user") return hasNonEmptyMessageContent(record.content);
		if (record.role === "assistant") return hasNonEmptyMessageContent(record.content) || hasAssistantToolCall(record);
		return false;
	});
}
//#endregion
//#region packages/ai/src/transports/openai-completions-string-content.ts
/**
* OpenAI Chat Completions compatibility helpers. Some providers only accept
* role/content messages with plain string content instead of text block arrays.
*/
function flattenStringOnlyCompletionContent(content) {
	if (!Array.isArray(content)) return content;
	const textParts = [];
	for (const item of content) {
		if (!item || typeof item !== "object" || item.type !== "text" || typeof item.text !== "string") return content;
		textParts.push(item.text);
	}
	return textParts.join("\n");
}
/** Flatten string-only text block content arrays into newline-joined strings. */
function flattenCompletionMessagesToStringContent(messages) {
	return messages.map((message) => {
		if (!message || typeof message !== "object") return message;
		const content = message.content;
		const flattenedContent = flattenStringOnlyCompletionContent(content);
		if (flattenedContent === content) return message;
		return {
			...message,
			content: flattenedContent
		};
	});
}
/** Strip completion messages to role/content fields for strict providers. */
function stripCompletionMessagesToRoleContent(messages) {
	return messages.map((message) => {
		if (!message || typeof message !== "object" || Array.isArray(message)) return message;
		const record = message;
		const stripped = {};
		if (Object.hasOwn(record, "role")) stripped.role = record.role;
		if (Object.hasOwn(record, "content")) stripped.content = record.content;
		return stripped;
	});
}
//#endregion
//#region packages/ai/src/transports/openai-transport-params.ts
const MAX_OPENAI_STRICT_TOOL_DOWNGRADE_DIAGNOSTIC_KEYS = 256;
const OPENAI_CODEX_RESPONSES_PROVIDERS = /* @__PURE__ */ new Set(["openai"]);
const loggedOpenAIStrictToolDowngradeDiagnosticKeys = /* @__PURE__ */ new Set();
function readToolPayloadField(record, field) {
	try {
		return Object.hasOwn(record, field) ? record[field] : void 0;
	} catch {
		return;
	}
}
function readCodeModePayloadToolName(tool) {
	if (!isRecord(tool)) return;
	const name = readToolPayloadField(tool, "name");
	if (typeof name === "string") return name;
	const fn = readToolPayloadField(tool, "function");
	if (!isRecord(fn)) return;
	const fnName = readToolPayloadField(fn, "name");
	return typeof fnName === "string" ? fnName : void 0;
}
function filterCodeModePayloadTools(payload, visibleToolNames) {
	if (!isRecord(payload)) return;
	const tools = readToolPayloadField(payload, "tools");
	if (!Array.isArray(tools)) return;
	payload.tools = tools.flatMap((tool) => {
		const name = readCodeModePayloadToolName(tool);
		if (typeof name === "string" && isCodeModeModelVisibleToolName(name, visibleToolNames)) return [tool];
		if (!isRecord(tool)) return [];
		const filteredGroups = {};
		for (const key of ["functionDeclarations", "function_declarations"]) {
			const declarations = readToolPayloadField(tool, key);
			if (!Array.isArray(declarations)) continue;
			const filtered = declarations.filter((declaration) => {
				const declarationName = readCodeModePayloadToolName(declaration);
				return typeof declarationName === "string" && isCodeModeModelVisibleToolName(declarationName, visibleToolNames);
			});
			if (filtered.length > 0) filteredGroups[key] = filtered;
		}
		return Object.keys(filteredGroups).length > 0 ? [filteredGroups] : [];
	});
}
function resolveCodeModeResponsesVisibleToolNames(context) {
	return new Set((context.tools ?? []).map(readCodeModePayloadToolName).filter((name) => typeof name === "string"));
}
function enforceCodeModeResponsesToolSurface(payload, visibleToolNames) {
	if (!isRecord(payload)) return;
	const tools = readToolPayloadField(payload, "tools");
	if (!Array.isArray(tools)) return;
	payload.tools = tools.filter((tool) => {
		const name = readCodeModePayloadToolName(tool);
		return typeof name === "string" && isCodeModeModelVisibleToolName(name, visibleToolNames);
	});
}
function assertCodeModeResponsesToolSurface(payload, visibleToolNames) {
	const tools = isRecord(payload) ? readToolPayloadField(payload, "tools") : void 0;
	if (!Array.isArray(tools)) throw new Error("Code mode payload tool surface violation: expected exec,wait; got no tools");
	const names = tools.map(readCodeModePayloadToolName).filter((name) => typeof name === "string" && name.length > 0).toSorted((left, right) => left.localeCompare(right));
	if (names.length >= 2 && names.length === tools.length && new Set(names).size === names.length && names.includes("exec") && names.includes("wait") && names.every((name) => isCodeModeModelVisibleToolName(name, visibleToolNames))) return;
	throw new Error(`Code mode payload tool surface violation: expected exec,wait plus direct-only tools; got ${names.length > 0 ? names.join(",") : "none"}`);
}
function buildOpenAIStrictToolDowngradeDiagnosticKey(diagnostics, context) {
	return sha256Hex(JSON.stringify({
		transport: context.transport,
		provider: context.model.provider ?? null,
		model: context.model.id ?? null,
		diagnostics: diagnostics.map((entry) => ({
			toolIndex: entry.toolIndex,
			toolName: entry.toolName ?? null,
			violations: entry.violations
		}))
	}));
}
function shouldLogOpenAIStrictToolDowngradeDiagnostic(diagnostics, context) {
	const key = buildOpenAIStrictToolDowngradeDiagnosticKey(diagnostics, context);
	if (loggedOpenAIStrictToolDowngradeDiagnosticKeys.has(key)) return false;
	if (loggedOpenAIStrictToolDowngradeDiagnosticKeys.size >= MAX_OPENAI_STRICT_TOOL_DOWNGRADE_DIAGNOSTIC_KEYS) loggedOpenAIStrictToolDowngradeDiagnosticKeys.clear();
	loggedOpenAIStrictToolDowngradeDiagnosticKeys.add(key);
	return true;
}
function resolveOpenAIStrictToolFlagWithDiagnostics(projection, strictSetting, context) {
	const strict = resolveOpenAIProjectedToolsStrictToolFlag(projection, strictSetting);
	if (strictSetting === true && strict === false) {
		const diagnostics = findOpenAIStrictToolProjectionDiagnostics(projection);
		getAiTransportHost().logDebug("openai-transport", () => {
			if (!shouldLogOpenAIStrictToolDowngradeDiagnostic(diagnostics, context)) return null;
			const sample = diagnostics.slice(0, 5).map((entry) => ({
				tool: entry.toolName ?? `tool[${entry.toolIndex}]`,
				violations: entry.violations.slice(0, 8)
			}));
			return {
				message: `OpenAI ${context.transport} tool schema strict mode downgraded to strict=false for ${context.model.provider ?? "unknown"}/${context.model.id ?? "unknown"} because ${diagnostics.length} tool schema(s) are not strict-compatible`,
				data: {
					transport: context.transport,
					provider: context.model.provider,
					model: context.model.id,
					incompatibleToolCount: diagnostics.length,
					sample
				}
			};
		});
	}
	return strict;
}
function isOpenAICodexResponsesModel(model) {
	return OPENAI_CODEX_RESPONSES_PROVIDERS.has(model.provider) && (model.api === "openai-chatgpt-responses" || model.api === "openclaw-openai-chatgpt-responses-transport");
}
function isNativeOpenAICodexResponsesBaseUrl(baseUrl) {
	const trimmed = typeof baseUrl === "string" ? baseUrl.trim() : "";
	if (!trimmed) return false;
	try {
		const url = new URL(trimmed);
		if (url.protocol !== "http:" && url.protocol !== "https:") return false;
		if (url.hostname.toLowerCase() !== "chatgpt.com") return false;
		const pathname = url.pathname.replace(/\/+$/u, "").toLowerCase();
		return [
			"/backend-api",
			"/backend-api/v1",
			"/backend-api/codex",
			"/backend-api/codex/v1"
		].includes(pathname);
	} catch {
		return false;
	}
}
function usesNativeOpenAICodexResponsesBackend(model) {
	return isOpenAICodexResponsesModel(model) && isNativeOpenAICodexResponsesBaseUrl(model.baseUrl);
}
function buildOpenAIClientHeaders(model, context, optionHeaders, turnHeaders, sessionId) {
	const providerHeaders = { ...model.headers };
	if (model.provider === "github-copilot") Object.assign(providerHeaders, getAiTransportHost().buildCopilotDynamicHeaders(context.messages));
	const callerHeaders = {
		...optionHeaders,
		...turnHeaders
	};
	const resolvedHeaders = resolveProviderRequestPolicyConfig({
		provider: model.provider,
		api: model.api,
		baseUrl: model.baseUrl,
		capability: "llm",
		transport: "stream",
		providerHeaders,
		callerHeaders: Object.keys(callerHeaders).length > 0 ? callerHeaders : void 0,
		precedence: "caller-wins"
	}).headers ?? {};
	if (sessionId && !Object.keys(resolvedHeaders).some((key) => normalizeLowercaseStringOrEmpty(key) === "session_id") && usesNativeOpenAICodexResponsesBackend(model)) resolvedHeaders.session_id = clampOpenAIPromptCacheKey(sessionId) ?? sessionId;
	return resolvedHeaders;
}
function resolveOpenAISdkTimeoutMs(model, timeoutMs) {
	return resolveModelRequestTimeoutMs(model, timeoutMs);
}
function buildOpenAISdkClientOptions(model) {
	const timeout = resolveOpenAISdkTimeoutMs(model);
	return timeout === void 0 ? {} : { timeout };
}
function buildOpenAISdkRequestOptions(model, signal, options) {
	const timeout = resolveOpenAISdkTimeoutMs(model, options?.timeoutMs);
	const headers = options?.stream === true && usesNativeOpenAICodexResponsesBackend(model) ? { Accept: "text/event-stream" } : void 0;
	if (timeout === void 0 && options?.maxRetries === void 0 && !signal && !headers) return;
	return {
		...headers ? { headers } : {},
		...signal ? { signal } : {},
		...timeout !== void 0 ? { timeout } : {},
		...options?.maxRetries !== void 0 ? { maxRetries: options.maxRetries } : {}
	};
}
function getCompat(model) {
	const resolved = resolveOpenAICompletionsCompat(model);
	const compat = model.compat ?? {};
	return {
		...resolved,
		cacheControlFormat: resolved.cacheControlFormat,
		reasoningEffortMap: resolveOpenAIReasoningEffortMap(model, {}),
		openRouterRouting: resolved.openRouterRouting ?? {},
		vercelGatewayRouting: resolved.vercelGatewayRouting,
		requiresStringContent: compat.requiresStringContent ?? false,
		strictMessageKeys: compat.strictMessageKeys === true
	};
}
//#endregion
//#region packages/ai/src/transports/openai-completions-transport.ts
function hasToolHistory(messages) {
	return messages.some((message) => message.role === "toolResult" || message.role === "assistant" && Array.isArray(message.content) && message.content.some((block) => block.type === "toolCall"));
}
function assertOpenAICompletionsPayloadHasConversationTurn(params, model) {
	const messages = params.messages;
	if (!Array.isArray(messages) || hasOpenAICompatibleConversationTurn(messages)) return;
	throw new Error(`OpenAI-compatible chat payload for ${model.provider}/${model.id} contains no non-empty user or assistant messages after compaction and transport transforms; refusing to send a system/tool-only request. Start a new user turn or repair the compacted session history.`);
}
const SSE_DONE_LINE_RE = /^data:[ \t]*\[DONE\][ \t]*$/i;
const SSE_DONE_MAX_LINE_CHARS = 1024;
function createSseDoneDetector() {
	const decoder = new TextDecoder();
	let line = "";
	let lineOverflowed = false;
	let sawDone = false;
	const finishLine = () => {
		if (!lineOverflowed && SSE_DONE_LINE_RE.test(line)) sawDone = true;
		line = "";
		lineOverflowed = false;
	};
	const observeText = (text) => {
		for (const char of text) {
			if (char === "\n" || char === "\r") {
				finishLine();
				continue;
			}
			if (!lineOverflowed && line.length < SSE_DONE_MAX_LINE_CHARS) line += char;
			else lineOverflowed = true;
		}
	};
	return {
		observe(chunk) {
			if (!sawDone) observeText(decoder.decode(chunk, { stream: true }));
		},
		finish() {
			if (sawDone) return;
			observeText(decoder.decode());
			if (line || lineOverflowed) finishLine();
		},
		sawDone: () => sawDone
	};
}
function createOpenAICompletionsClient(model, context, apiKey, optionHeaders, opts) {
	const clientConfig = buildOpenAICompletionsClientConfig(model, context, optionHeaders);
	return new OpenAI({
		apiKey,
		baseURL: clientConfig.baseURL,
		dangerouslyAllowBrowser: true,
		defaultHeaders: clientConfig.defaultHeaders,
		defaultQuery: clientConfig.defaultQuery,
		fetch: opts?.fetch ?? buildGuardedModelFetch(model),
		...buildOpenAISdkClientOptions(model)
	});
}
function isAzureOpenAICompatibleHost(hostname) {
	return hostname.endsWith(".openai.azure.com") || hostname.endsWith(".services.ai.azure.com") || hostname.endsWith(".cognitiveservices.azure.com");
}
function isKnownOpenAICompletionsEndpoint(model) {
	if (!model.baseUrl.trim()) return true;
	const endpointClass = resolveProviderEndpoint(model.baseUrl).endpointClass;
	if (endpointClass === "openai-public" || endpointClass === "azure-openai") return true;
	try {
		return isAzureOpenAICompatibleHost(new URL(model.baseUrl).hostname.toLowerCase());
	} catch {
		return false;
	}
}
function buildOpenAICompletionsClientConfig(model, context, optionHeaders) {
	const headers = buildOpenAIClientHeaders(model, context, optionHeaders);
	const defaultQuery = {};
	let baseURL = model.baseUrl;
	let isAzureHost = false;
	try {
		const parsed = new URL(model.baseUrl);
		isAzureHost = isAzureOpenAICompatibleHost(parsed.hostname.toLowerCase());
		parsed.searchParams.forEach((value, key) => {
			if (value) defaultQuery[key] = value;
		});
		parsed.search = "";
		baseURL = parsed.toString().replace(/\/$/, "");
	} catch {}
	if (isAzureHost) {
		const apiVersionHeader = Object.keys(headers).find((key) => key.toLowerCase() === "api-version");
		if (apiVersionHeader) {
			const apiVersion = headers[apiVersionHeader]?.trim();
			delete headers[apiVersionHeader];
			if (apiVersion && !defaultQuery["api-version"]) defaultQuery["api-version"] = apiVersion;
		}
	}
	return {
		baseURL,
		defaultHeaders: headers,
		defaultQuery: Object.keys(defaultQuery).length > 0 ? defaultQuery : void 0
	};
}
function createOpenAICompletionsTransportStreamFn() {
	return (model, context, options) => {
		const eventStream = createAssistantMessageEventStream();
		const stream = eventStream;
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
			let firstEventAbort;
			try {
				const apiKey = options?.apiKey || getEnvApiKey(model.provider) || "";
				const doneDetector = createSseDoneDetector();
				const baseFetch = buildGuardedModelFetch(model);
				const doneDetectingFetch = async (url, init) => {
					const response = await baseFetch(url, init);
					if (!response.body || !response.ok) return response;
					if (typeof TransformStream === "undefined" || !response.body.pipeThrough) return response;
					const transformed = response.body.pipeThrough(new TransformStream({
						transform(chunk, controller) {
							doneDetector.observe(chunk);
							controller.enqueue(chunk);
						},
						flush() {
							doneDetector.finish();
						}
					}));
					return new Response(transformed, {
						headers: response.headers,
						status: response.status,
						statusText: response.statusText
					});
				};
				const client = createOpenAICompletionsClient(model, context, apiKey, options?.headers, { fetch: doneDetectingFetch });
				let params = buildOpenAICompletionsParams(model, context, options);
				const nextParams = await options?.onPayload?.(params, model);
				if (nextParams !== void 0) params = nextParams;
				if (options?.openclawCodeModeToolSurface === true) {
					const visibleToolNames = resolveCodeModeResponsesVisibleToolNames(context);
					enforceCodeModeResponsesToolSurface(params, visibleToolNames);
					assertCodeModeResponsesToolSurface(params, visibleToolNames);
				}
				if (getCompat(model).requiresNonEmptyUserOrAssistantMessage) assertOpenAICompletionsPayloadHasConversationTurn(params, model);
				const emitReasoning = shouldEmitOpenAICompletionsReasoning(model, options);
				firstEventAbort = createFirstStreamEventAbortController(options?.signal);
				const responseStream = await client.chat.completions.create(params, buildOpenAISdkRequestOptions(model, firstEventAbort.signal, {
					timeoutMs: options?.timeoutMs,
					maxRetries: options?.maxRetries
				}));
				stream.push({
					type: "start",
					partial: output
				});
				await processOpenAICompletionsStream(responseStream, output, model, stream, {
					signal: options?.signal,
					emitReasoning,
					firstEventTimeoutMs: getFirstStreamEventTimeoutMs(options),
					abortFirstEventStream: firstEventAbort.abort,
					onFirstEventTimeout: getFirstStreamEventTimeoutHandler(options),
					sawStreamDONE: doneDetector.sawDone
				});
				finalizeTransportStream({
					stream,
					output,
					signal: options?.signal
				});
			} catch (error) {
				failTransportStream({
					stream,
					output,
					signal: options?.signal,
					error,
					cleanup: () => {
						output.stopReason = options?.signal?.aborted ? "aborted" : "error";
						finalizeOpenAICompletionsToolCalls(output, { allowSilentToolCallPromotion: false });
					}
				});
			} finally {
				firstEventAbort?.dispose();
			}
		})();
		return eventStream;
	};
}
async function processOpenAICompletionsStream(responseStream, output, model, stream, options) {
	const MAX_POST_TOOL_CALL_BUFFER_BYTES = 256e3;
	const MAX_TOOL_CALL_ARGUMENT_BUFFER_BYTES = 256e3;
	const emitReasoning = options?.emitReasoning ?? true;
	const compat = getCompat(model);
	const deepSeekTextFilter = shouldFilterDeepSeekDsmlText(compat) ? createDeepSeekTextFilter() : null;
	const deepSeekToolCallRecoverer = shouldFilterDeepSeekDsmlText(compat) ? createDeepSeekDsmlToolCallRecoverer() : null;
	const reasoningTagTextPartitioner = createReasoningTagTextPartitioner();
	let currentBlock = null;
	let pendingPostToolCallDeltas = [];
	let pendingPostToolCallBytes = 0;
	let isFlushingPendingPostToolCallDeltas = false;
	const toolCallBlocksByIndex = /* @__PURE__ */ new Map();
	const toolCallBlocksById = /* @__PURE__ */ new Map();
	const provisionalCommentaryTags = /* @__PURE__ */ new Map();
	const toolCallBlockBytes = /* @__PURE__ */ new WeakMap();
	const toolCallBlockIndices = /* @__PURE__ */ new WeakMap();
	const normalizeToolCallDeltas = createOpenAICompletionsToolCallDeltaNormalizer();
	let sawStopFinishReason = false;
	let sawNativeToolCallDelta = false;
	const blockIndex = () => output.content.length - 1;
	const measureUtf8Bytes = (text) => Buffer.byteLength(text, "utf8");
	let chunkPushedEvent = false;
	const pushStreamEvent = (event) => {
		chunkPushedEvent = true;
		stream.push(event);
	};
	const queuePostToolCallDelta = (next) => {
		const nextBytes = measureUtf8Bytes(next.text);
		if (pendingPostToolCallBytes + nextBytes > MAX_POST_TOOL_CALL_BUFFER_BYTES) throw new Error("Exceeded post-tool-call delta buffer limit");
		pendingPostToolCallBytes += nextBytes;
		const previous = pendingPostToolCallDeltas[pendingPostToolCallDeltas.length - 1];
		if (!previous || previous.kind !== next.kind) {
			pendingPostToolCallDeltas.push(next);
			return;
		}
		if (next.kind === "thinking" && previous.kind === "thinking") {
			if (previous.signature !== next.signature) {
				pendingPostToolCallDeltas.push(next);
				return;
			}
			previous.text += next.text;
			return;
		}
		previous.text += next.text;
	};
	const appendThinkingDeltaInternal = (reasoningDelta) => {
		if (!currentBlock || currentBlock.type !== "thinking") {
			currentBlock = {
				type: "thinking",
				thinking: "",
				...reasoningDelta.signature ? { thinkingSignature: reasoningDelta.signature } : {}
			};
			output.content.push(currentBlock);
			pushStreamEvent({
				type: "thinking_start",
				contentIndex: blockIndex(),
				partial: output
			});
		}
		currentBlock.thinking += reasoningDelta.text;
		pushStreamEvent({
			type: "thinking_delta",
			contentIndex: blockIndex(),
			delta: reasoningDelta.text,
			partial: output
		});
	};
	const appendTextDeltaInternal = (text) => {
		if (!currentBlock || currentBlock.type !== "text") {
			currentBlock = {
				type: "text",
				text: ""
			};
			output.content.push(currentBlock);
			pushStreamEvent({
				type: "text_start",
				contentIndex: blockIndex(),
				partial: output
			});
		}
		currentBlock.text += text;
		pushStreamEvent({
			type: "text_delta",
			contentIndex: blockIndex(),
			delta: text
		});
	};
	const flushPendingPostToolCallDeltas = () => {
		if (isFlushingPendingPostToolCallDeltas || currentBlock?.type === "toolCall" || pendingPostToolCallDeltas.length === 0) return;
		isFlushingPendingPostToolCallDeltas = true;
		const bufferedDeltas = pendingPostToolCallDeltas;
		pendingPostToolCallDeltas = [];
		pendingPostToolCallBytes = 0;
		for (const delta of bufferedDeltas) if (delta.kind === "text") appendTextDeltaInternal(delta.text);
		else if (emitReasoning) appendThinkingDeltaInternal(delta);
		isFlushingPendingPostToolCallDeltas = false;
	};
	const appendThinkingDelta = (reasoningDelta) => {
		flushPendingPostToolCallDeltas();
		appendThinkingDeltaInternal(reasoningDelta);
	};
	const appendTextDelta = (text) => {
		flushPendingPostToolCallDeltas();
		appendTextDeltaInternal(text);
	};
	const appendVisibleTextDelta = (text) => {
		if (!text) return;
		if (currentBlock?.type === "toolCall") queuePostToolCallDelta({
			kind: "text",
			text
		});
		else appendTextDelta(text);
	};
	const appendRecoveredToolCall = (toolCall) => {
		if (currentBlock?.type === "toolCall") {
			currentBlock = null;
			flushPendingPostToolCallDeltas();
		}
		rememberPendingCommentaryTags(provisionalCommentaryTags, tagPendingCommentaryText(output.content));
		const block = {
			type: "toolCall",
			id: `call_${randomUUID().replaceAll("-", "").slice(0, 24)}`,
			name: toolCall.name,
			arguments: toolCall.arguments,
			partialArgs: toolCall.partialArgs
		};
		currentBlock = block;
		output.content.push(block);
		toolCallBlockIndices.set(block, output.content.length - 1);
		pushStreamEvent({
			type: "toolcall_start",
			contentIndex: toolCallBlockIndices.get(block) ?? -1,
			partial: output
		});
		pushStreamEvent({
			type: "toolcall_delta",
			contentIndex: toolCallBlockIndices.get(block) ?? -1,
			delta: toolCall.partialArgs,
			partial: output
		});
	};
	const appendFilteredVisibleTextDelta = (text) => {
		const recoveredParts = deepSeekToolCallRecoverer?.push(text) ?? [{
			kind: "text",
			text
		}];
		for (const recoveredPart of recoveredParts) {
			if (recoveredPart.kind === "toolCall") {
				appendRecoveredToolCall(recoveredPart);
				continue;
			}
			const parts = deepSeekTextFilter?.push(recoveredPart.text) ?? [recoveredPart.text];
			for (const part of parts) appendVisibleTextDelta(part);
		}
	};
	const flushDeepSeekToolCallRecovererAtEnd = () => {
		const recoveredParts = deepSeekToolCallRecoverer?.flush();
		if (!recoveredParts) return;
		for (const recoveredPart of recoveredParts) {
			if (recoveredPart.kind === "toolCall") {
				appendRecoveredToolCall(recoveredPart);
				continue;
			}
			const parts = deepSeekTextFilter?.push(recoveredPart.text) ?? [recoveredPart.text];
			for (const part of parts) appendVisibleTextDelta(part);
		}
	};
	const flushDeepSeekTextFilterAtEnd = () => {
		const parts = deepSeekTextFilter?.flush();
		if (!parts) return;
		for (const part of parts) appendVisibleTextDelta(part);
	};
	const appendRoutedContentDelta = (delta) => {
		if (delta.kind === "text") {
			appendFilteredVisibleTextDelta(delta.text);
			return;
		}
		if (!emitReasoning) return;
		if (currentBlock?.type === "toolCall") queuePostToolCallDelta(delta);
		else appendThinkingDelta(delta);
	};
	const appendPartitionedVisibleDelta = (delta) => {
		if (delta.kind === "text") appendFilteredVisibleTextDelta(delta.text);
	};
	const emitReasoningUsageActivity = (hasReasoningUsageActivity) => {
		if (!hasReasoningUsageActivity || chunkPushedEvent || !emitReasoning) return;
		const latestBlock = output.content[output.content.length - 1];
		if (currentBlock?.type === "text" || currentBlock?.type === "toolCall") return;
		if (latestBlock?.type === "text" || latestBlock?.type === "toolCall") return;
		appendThinkingDelta({ text: "" });
	};
	const flushReasoningTagTextPartitionerAtEnd = () => {
		for (const delta of reasoningTagTextPartitioner.flush()) appendPartitionedVisibleDelta(delta);
	};
	const cooperativeScheduler = createModelStreamCooperativeScheduler(options?.signal);
	const guardedStream = withFirstStreamEventTimeout(responseStream, {
		provider: model.provider,
		api: model.api,
		model: model.id,
		timeoutMs: options?.firstEventTimeoutMs ?? 0,
		stage: "completions",
		abort: options?.abortFirstEventStream,
		onTimeout: options?.onFirstEventTimeout,
		hint: "The provider may be stalled while parsing the tool payload; retry with a smaller tool surface or enable OPENCLAW_DEBUG_MODEL_PAYLOAD=tools to inspect exposed tools."
	});
	for await (const rawChunk of guardedStream) {
		throwIfModelStreamAborted(options?.signal);
		chunkPushedEvent = false;
		if (!rawChunk || typeof rawChunk !== "object") {
			await cooperativeScheduler.afterEvent();
			continue;
		}
		notifyLlmRequestActivity(options?.signal);
		const chunk = rawChunk;
		output.responseId ||= chunk.id;
		let hasReasoningUsageActivity = false;
		if (chunk.usage) {
			output.usage = parseOpenAICompletionsUsage(chunk.usage, model);
			hasReasoningUsageActivity = hasOpenAICompletionsReasoningUsageActivity(chunk.usage);
		}
		const choice = Array.isArray(chunk.choices) ? chunk.choices[0] : void 0;
		if (!choice) {
			emitReasoningUsageActivity(hasReasoningUsageActivity);
			await cooperativeScheduler.afterEvent();
			continue;
		}
		const choiceUsage = choice.usage;
		if (!chunk.usage && choiceUsage) {
			output.usage = parseOpenAICompletionsUsage(choiceUsage, model);
			hasReasoningUsageActivity = hasOpenAICompletionsReasoningUsageActivity(choiceUsage);
		}
		if (choice.finish_reason) {
			const finishReasonResult = mapOpenAIStopReason(choice.finish_reason, { allowSingularToolCall: true });
			output.stopReason = finishReasonResult.stopReason;
			if (finishReasonResult.stopReason === "stop") sawStopFinishReason = true;
			if (finishReasonResult.errorMessage) output.errorMessage = finishReasonResult.errorMessage;
		}
		const rawChoiceDelta = choice.delta ?? choice.message;
		if (!rawChoiceDelta) {
			emitReasoningUsageActivity(hasReasoningUsageActivity);
			await cooperativeScheduler.afterEvent();
			continue;
		}
		for (const normalizedDelta of normalizeToolCallDeltas(rawChoiceDelta, choice.finish_reason)) {
			const choiceDelta = normalizedDelta.delta;
			const reasoningDeltas = getCompletionsReasoningDeltas(choiceDelta, compat.visibleReasoningDetailTypes);
			const hasMirroredReasoning = reasoningDeltas.some((delta) => delta.kind === "thinking");
			if (hasMirroredReasoning) reasoningTagTextPartitioner.markStrict();
			const contentDeltas = readOpenAICompletionsContentDeltas(choiceDelta.content, choiceDelta.refusal, reasoningDeltas.filter((reasoningDelta) => reasoningDelta.kind === "thinking").map((reasoningDelta) => reasoningDelta.text));
			const appendReasoningDeltas = () => {
				for (const reasoningDelta of reasoningDeltas) {
					if (reasoningDelta.kind === "thinking" && !emitReasoning) continue;
					if (currentBlock?.type === "toolCall") {
						queuePostToolCallDelta({ ...reasoningDelta });
						continue;
					}
					if (reasoningDelta.kind === "text") appendTextDelta(reasoningDelta.text);
					else if (emitReasoning) appendThinkingDelta(reasoningDelta);
				}
			};
			if (hasMirroredReasoning) appendReasoningDeltas();
			for (const contentDelta of contentDeltas) if (contentDelta.kind === "text") {
				const routedDeltas = hasMirroredReasoning ? reasoningTagTextPartitioner.push(contentDelta.text) : reasoningTagTextPartitioner.pushVisible(contentDelta.text);
				for (const routedDelta of routedDeltas) appendPartitionedVisibleDelta(routedDelta);
			} else {
				if (reasoningTagTextPartitioner.hasPending()) reasoningTagTextPartitioner.markStrict();
				appendRoutedContentDelta(contentDelta);
			}
			if (!hasMirroredReasoning) appendReasoningDeltas();
			const toolCallDeltas = normalizedDelta.toolCalls;
			if (toolCallDeltas.length > 0) {
				sawNativeToolCallDelta = true;
				flushReasoningTagTextPartitionerAtEnd();
				rememberPendingCommentaryTags(provisionalCommentaryTags, tagPendingCommentaryText(output.content));
				for (const toolCall of toolCallDeltas) {
					const streamIndex = typeof toolCall.index === "number" ? toolCall.index : void 0;
					let block = streamIndex !== void 0 ? toolCallBlocksByIndex.get(streamIndex) : void 0;
					if (!block && toolCall.id) block = toolCallBlocksById.get(toolCall.id);
					if (!block) {
						if (currentBlock?.type === "toolCall") {
							currentBlock = null;
							flushPendingPostToolCallDeltas();
						}
						const initialSig = extractGoogleThoughtSignature(toolCall);
						block = {
							type: "toolCall",
							id: toolCall.id || "",
							name: toolCall.function?.name || "",
							arguments: {},
							partialArgs: "",
							...initialSig ? { thoughtSignature: initialSig } : {}
						};
						output.content.push(block);
						toolCallBlockIndices.set(block, output.content.length - 1);
						pushStreamEvent({
							type: "toolcall_start",
							contentIndex: toolCallBlockIndices.get(block) ?? -1,
							partial: output
						});
					}
					if (streamIndex !== void 0 && !toolCallBlocksByIndex.has(streamIndex)) toolCallBlocksByIndex.set(streamIndex, block);
					if (toolCall.id) {
						block.id = toolCall.id;
						toolCallBlocksById.set(toolCall.id, block);
					}
					currentBlock = block;
					if (toolCall.function?.name) block.name = toolCall.function.name;
					const deltaSig = extractGoogleThoughtSignature(toolCall);
					if (deltaSig) block.thoughtSignature = deltaSig;
					if (toolCall.function?.arguments) {
						const nextArgumentBytes = measureUtf8Bytes(toolCall.function.arguments);
						const currentBlockArgBytes = toolCallBlockBytes.get(block) ?? 0;
						if (currentBlockArgBytes + nextArgumentBytes > MAX_TOOL_CALL_ARGUMENT_BUFFER_BYTES) throw new Error("Exceeded tool-call argument buffer limit");
						toolCallBlockBytes.set(block, currentBlockArgBytes + nextArgumentBytes);
						block.partialArgs += toolCall.function.arguments;
						block.arguments = parseStreamingJson(block.partialArgs);
						pushStreamEvent({
							type: "toolcall_delta",
							contentIndex: toolCallBlockIndices.get(block) ?? -1,
							delta: toolCall.function.arguments,
							partial: output
						});
					}
				}
			}
		}
		flushPendingPostToolCallDeltas();
		emitReasoningUsageActivity(hasReasoningUsageActivity);
		await cooperativeScheduler.afterEvent();
	}
	flushReasoningTagTextPartitionerAtEnd();
	flushDeepSeekToolCallRecovererAtEnd();
	flushDeepSeekTextFilterAtEnd();
	currentBlock = null;
	flushPendingPostToolCallDeltas();
	finalizeOpenAICompletionsToolCalls(output, {
		allowSilentToolCallPromotion: sawStopFinishReason || sawNativeToolCallDelta && (options?.sawStreamDONE?.() ?? false),
		onConfirmedToolCall(block, contentIndex) {
			pushStreamEvent({
				type: "toolcall_end",
				contentIndex,
				toolCall: block,
				partial: output
			});
		}
	});
	if (output.stopReason !== "toolUse") clearPendingCommentaryText(provisionalCommentaryTags);
	if (output.stopReason === "toolUse") tagPendingCommentaryText(output.content);
}
function shouldFilterDeepSeekDsmlText(compat) {
	return compat.thinkingFormat === "deepseek";
}
const DEEPSEEK_DSML_BARS = ["|", "｜"];
const DEEPSEEK_DSML_TOOL_KINDS = [
	"tool_calls",
	"tool_call",
	"function_calls"
];
const DEEPSEEK_DSML_TOOL_OPEN_TOKENS = DEEPSEEK_DSML_BARS.flatMap((bar) => DEEPSEEK_DSML_TOOL_KINDS.map((kind) => `<${bar}DSML${bar}${kind}>`));
const DEEPSEEK_DSML_TOOL_CLOSE_TOKENS = DEEPSEEK_DSML_BARS.flatMap((bar) => DEEPSEEK_DSML_TOOL_KINDS.map((kind) => `</${bar}DSML${bar}${kind}>`));
const DEEPSEEK_DSML_INVOKE_OPEN_PREFIXES = DEEPSEEK_DSML_BARS.map((bar) => `<${bar}DSML${bar}invoke`);
const DEEPSEEK_DSML_INVOKE_CLOSE_TOKENS = DEEPSEEK_DSML_BARS.map((bar) => `</${bar}DSML${bar}invoke>`);
const DEEPSEEK_DSML_TOOL_MAX_OPEN_TOKEN_LEN = Math.max(...DEEPSEEK_DSML_TOOL_OPEN_TOKENS.map((token) => token.length));
const DEEPSEEK_DSML_RECOVERY_MAX_BOUNDARY_LEN = Math.max(...DEEPSEEK_DSML_TOOL_OPEN_TOKENS.map((token) => token.length), ...DEEPSEEK_DSML_TOOL_CLOSE_TOKENS.map((token) => token.length), ...DEEPSEEK_DSML_INVOKE_OPEN_PREFIXES.map((token) => token.length), ...DEEPSEEK_DSML_INVOKE_CLOSE_TOKENS.map((token) => token.length));
const MAX_DSML_RECOVERY_BUFFER_BYTES = 256e3;
const DEEPSEEK_DSML_SCAN_BATCH_CHARS = 64 * 1024;
function createDeepSeekDsmlToolCallRecoverer() {
	let buffer = "";
	let bufferBytes = 0;
	let bufferEndsWithHighSurrogate = false;
	let pendingScanChars = 0;
	let activeOpenToken = null;
	let blockScanState = {
		offset: 0,
		mode: "outer",
		invokeOpenStart: -1
	};
	const resetBlockScan = () => {
		activeOpenToken = null;
		pendingScanChars = 0;
		blockScanState = {
			offset: 0,
			mode: "outer",
			invokeOpenStart: -1
		};
	};
	const consume = (final) => {
		const output = [];
		while (buffer) {
			const open = activeOpenToken ? {
				index: 0,
				token: activeOpenToken
			} : findEarliestStringToken(buffer, DEEPSEEK_DSML_TOOL_OPEN_TOKENS);
			if (!open) {
				resetBlockScan();
				if (final) {
					output.push({
						kind: "text",
						text: buffer
					});
					buffer = "";
					bufferBytes = 0;
					bufferEndsWithHighSurrogate = false;
					return output;
				}
				const keep = longestDeepSeekDsmlToolOpenPrefixSuffixLength(buffer);
				const emitLength = buffer.length - keep;
				if (emitLength > 0) {
					const emitted = buffer.slice(0, emitLength);
					output.push({
						kind: "text",
						text: emitted
					});
					bufferBytes -= Buffer.byteLength(emitted, "utf8");
					buffer = buffer.slice(emitted.length);
					if (!buffer) bufferEndsWithHighSurrogate = false;
				}
				return output;
			}
			if (open.index > 0) {
				const prefix = buffer.slice(0, open.index);
				output.push({
					kind: "text",
					text: prefix
				});
				bufferBytes -= Buffer.byteLength(prefix, "utf8");
				buffer = buffer.slice(prefix.length);
				resetBlockScan();
			}
			activeOpenToken = open.token;
			if (blockScanState.offset === 0) blockScanState.offset = open.token.length;
			const blockScan = scanDeepSeekDsmlToolBlock(buffer, open.token.replace("<", "</"), open.token.length, blockScanState);
			if (blockScan.kind === "nested-open") throw new Error("Nested DeepSeek DSML recovery wrappers are not supported");
			const close = blockScan.kind === "close" ? blockScan : null;
			if (!close) {
				if (final) {
					output.push({
						kind: "text",
						text: buffer
					});
					buffer = "";
					bufferBytes = 0;
					bufferEndsWithHighSurrogate = false;
					return output;
				}
				if (bufferBytes > MAX_DSML_RECOVERY_BUFFER_BYTES) throw new Error("Exceeded DeepSeek DSML recovery buffer limit");
				return output;
			}
			resetBlockScan();
			const body = buffer.slice(open.token.length, close.index);
			const blockText = buffer.slice(0, close.index + close.token.length);
			if (Buffer.byteLength(blockText, "utf8") > MAX_DSML_RECOVERY_BUFFER_BYTES) throw new Error("Exceeded DeepSeek DSML recovery buffer limit");
			const recoveredToolCalls = parseDeepSeekDsmlToolCallBlock(body);
			if (recoveredToolCalls.length > 0) output.push(...recoveredToolCalls);
			else output.push({
				kind: "text",
				text: blockText
			});
			bufferBytes -= Buffer.byteLength(blockText, "utf8");
			buffer = buffer.slice(blockText.length);
			if (!buffer) bufferEndsWithHighSurrogate = false;
		}
		return output;
	};
	return {
		push(chunk) {
			const append = utf8ByteLengthForAppend(bufferEndsWithHighSurrogate, chunk);
			bufferBytes += append.bytes;
			bufferEndsWithHighSurrogate = append.endsWithHighSurrogate;
			buffer += chunk;
			pendingScanChars += chunk.length;
			if (activeOpenToken && pendingScanChars < DEEPSEEK_DSML_SCAN_BATCH_CHARS && !chunk.includes("<") && !chunk.includes(">") && bufferBytes <= MAX_DSML_RECOVERY_BUFFER_BYTES) return [];
			pendingScanChars = 0;
			return consume(false);
		},
		flush() {
			return consume(true);
		}
	};
}
function parseDeepSeekDsmlToolCallBlock(body) {
	const toolCalls = [];
	const invokeOpenRegex = /<[|｜]DSML[|｜]invoke\b([^<>]*)>/g;
	let openMatch;
	while ((openMatch = invokeOpenRegex.exec(body)) !== null) {
		const invokeBodyStart = openMatch.index + openMatch[0].length;
		const invokeClose = findEarliestStringToken(body.slice(invokeBodyStart), ["</|DSML|invoke>", "</｜DSML｜invoke>"]);
		if (!invokeClose) break;
		const invokeBody = body.slice(invokeBodyStart, invokeBodyStart + invokeClose.index);
		invokeOpenRegex.lastIndex = invokeBodyStart + invokeClose.index + invokeClose.token.length;
		const invokeName = parseXmlAttribute(openMatch[1] ?? "", "name");
		if (!invokeName) continue;
		const parsedArguments = parseDeepSeekDsmlInvokeArguments(invokeBody);
		if (!parsedArguments) continue;
		toolCalls.push({
			kind: "toolCall",
			name: invokeName,
			arguments: parsedArguments,
			partialArgs: JSON.stringify(parsedArguments)
		});
	}
	return toolCalls;
}
function parseDeepSeekDsmlInvokeArguments(body) {
	const args = {};
	const parameterRegex = /<[|｜]DSML[|｜]parameter\b([^>]*)>([\s\S]*?)<\/[|｜]DSML[|｜]parameter>/g;
	let parameterMatch;
	while ((parameterMatch = parameterRegex.exec(body)) !== null) {
		const name = parseXmlAttribute(parameterMatch[1] ?? "", "name");
		if (!name) continue;
		const rawValue = parameterMatch[2] ?? "";
		if (rawValue.length === 0) continue;
		args[name] = decodeDeepSeekDsmlText(rawValue);
	}
	if (Object.keys(args).length > 0) return args;
	const trimmed = body.trim();
	if (!trimmed.startsWith("{")) return null;
	try {
		const parsed = JSON.parse(trimmed);
		if (isRecord(parsed) && Object.keys(parsed).length > 0) return parsed;
	} catch {
		return null;
	}
	return null;
}
const xmlAttributeRegexCache = /* @__PURE__ */ new Map();
function xmlAttributeRegex(name) {
	const cached = xmlAttributeRegexCache.get(name);
	if (cached) return cached;
	const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const pattern = new RegExp(`\\b${escaped}=("([^"]*)"|'([^']*)'|([^\\s>]+))`);
	xmlAttributeRegexCache.set(name, pattern);
	return pattern;
}
function parseXmlAttribute(attributes, name) {
	const match = xmlAttributeRegex(name).exec(attributes);
	const value = match?.[2] ?? match?.[3] ?? match?.[4];
	return value ? decodeDeepSeekDsmlText(value) : null;
}
function decodeDeepSeekDsmlText(value) {
	return value.replaceAll("&quot;", "\"").replaceAll("&apos;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
}
function findEarliestStringToken(text, tokens, fromIndex = 0) {
	let best = null;
	for (const token of tokens) {
		const index = text.indexOf(token, fromIndex);
		if (index !== -1 && (!best || index < best.index)) best = {
			index,
			token
		};
	}
	return best;
}
function scanDeepSeekDsmlToolBlock(text, closeToken, contentStartIndex, state) {
	while (state.offset < text.length) {
		if (state.mode === "invoke-open") {
			const nextOpen = text.indexOf("<", state.offset);
			const nextClose = text.indexOf(">", state.offset);
			if (nextClose === -1 && nextOpen === -1) {
				state.offset = text.length;
				return { kind: "incomplete" };
			}
			if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
				state.mode = "outer";
				state.offset = nextOpen;
				state.invokeOpenStart = -1;
				continue;
			}
			const invokeOpenTag = text.slice(state.invokeOpenStart, nextClose + 1);
			if (!/^<[|｜]DSML[|｜]invoke\b[^<>]*>$/.test(invokeOpenTag)) {
				state.mode = "outer";
				state.offset = state.invokeOpenStart + 1;
				state.invokeOpenStart = -1;
				continue;
			}
			state.mode = "invoke-body";
			state.offset = nextClose + 1;
			state.invokeOpenStart = -1;
			continue;
		}
		if (state.mode === "invoke-body") {
			const invokeClose = findEarliestStringToken(text, DEEPSEEK_DSML_INVOKE_CLOSE_TOKENS, state.offset);
			if (!invokeClose) {
				state.offset = Math.max(0, text.length - DEEPSEEK_DSML_RECOVERY_MAX_BOUNDARY_LEN + 1);
				return { kind: "incomplete" };
			}
			state.mode = "outer";
			state.offset = invokeClose.index + invokeClose.token.length;
			continue;
		}
		const toolOpen = findEarliestStringToken(text, DEEPSEEK_DSML_TOOL_OPEN_TOKENS, state.offset);
		const toolCloseIndex = text.indexOf(closeToken, state.offset);
		const invokeOpen = findEarliestStringToken(text, DEEPSEEK_DSML_INVOKE_OPEN_PREFIXES, state.offset);
		const next = [
			toolOpen ? {
				kind: "nested-open",
				...toolOpen
			} : null,
			toolCloseIndex === -1 ? null : {
				kind: "close",
				index: toolCloseIndex,
				token: closeToken
			},
			invokeOpen ? {
				kind: "invoke-open",
				...invokeOpen
			} : null
		].filter((candidate) => candidate !== null).toSorted((left, right) => left.index - right.index)[0];
		if (!next) {
			state.offset = Math.max(contentStartIndex, text.length - DEEPSEEK_DSML_RECOVERY_MAX_BOUNDARY_LEN + 1);
			return { kind: "incomplete" };
		}
		if (next.kind === "invoke-open") {
			state.mode = "invoke-open";
			state.invokeOpenStart = next.index;
			state.offset = next.index + next.token.length;
			continue;
		}
		return next;
	}
	return { kind: "incomplete" };
}
function utf8ByteLengthForAppend(bufferEndsWithHighSurrogate, chunk) {
	let bytes = Buffer.byteLength(chunk, "utf8");
	if (!chunk) return {
		bytes,
		endsWithHighSurrogate: bufferEndsWithHighSurrogate
	};
	const nextCodeUnit = chunk.charCodeAt(0);
	if (bufferEndsWithHighSurrogate && nextCodeUnit >= 56320 && nextCodeUnit <= 57343) bytes -= 2;
	const finalCodeUnit = chunk.charCodeAt(chunk.length - 1);
	return {
		bytes,
		endsWithHighSurrogate: finalCodeUnit >= 55296 && finalCodeUnit <= 56319
	};
}
function longestDeepSeekDsmlToolOpenPrefixSuffixLength(text) {
	const maxLength = Math.min(text.length, DEEPSEEK_DSML_TOOL_MAX_OPEN_TOKEN_LEN - 1);
	for (let length = maxLength; length > 0; length -= 1) {
		const suffix = text.slice(text.length - length);
		if (DEEPSEEK_DSML_TOOL_OPEN_TOKENS.some((token) => token.startsWith(suffix))) return length;
	}
	return 0;
}
function getCompletionsReasoningDeltas(delta, visibleReasoningDetailTypes) {
	const output = [];
	const pushDelta = (next) => {
		const previous = output[output.length - 1];
		if (!previous || previous.kind !== next.kind) {
			output.push(next);
			return;
		}
		if (next.kind === "thinking" && previous.kind === "thinking") {
			if (previous.signature !== next.signature) {
				output.push(next);
				return;
			}
			previous.text += next.text;
			return;
		}
		previous.text += next.text;
	};
	const reasoningDetails = delta.reasoning_details;
	let usedReasoningThinkingDetails = false;
	if (Array.isArray(reasoningDetails)) {
		const visibleTypes = new Set(visibleReasoningDetailTypes);
		for (const item of reasoningDetails) {
			const detail = item;
			if (typeof detail.text !== "string" || !detail.text) continue;
			if (detail.type === "reasoning.text") {
				usedReasoningThinkingDetails = true;
				pushDelta({
					kind: "thinking",
					signature: "reasoning_details",
					text: detail.text
				});
				continue;
			}
			if (typeof detail.type === "string" && visibleTypes.has(detail.type)) pushDelta({
				kind: "text",
				text: detail.text
			});
		}
	}
	if (!usedReasoningThinkingDetails) for (const field of [
		"reasoning_content",
		"reasoning",
		"reasoning_text"
	]) {
		const value = delta[field];
		if (typeof value === "string" && value.length > 0) {
			pushDelta({
				kind: "thinking",
				signature: field,
				text: value
			});
			break;
		}
	}
	return output;
}
function resolveOpenAICompletionsReasoningEffort(options) {
	return options?.reasoningEffort ?? options?.reasoning ?? "high";
}
function shouldEmitOpenAICompletionsReasoning(model, options) {
	if (!model.reasoning) return false;
	const effort = resolveOpenAICompletionsReasoningEffort(options);
	if (!effort || !isOpenAICompletionsThinkingEnabled(effort)) return false;
	return true;
}
function shouldEmitOpenAICompletionsReasoningForModel(model, options) {
	return shouldEmitOpenAICompletionsReasoning(model, options);
}
function resolveOpenAICompletionsMaxTokens(model, options) {
	if (options?.maxTokens) return {
		maxTokens: options.maxTokens,
		clampToModelMaxTokens: true
	};
	const paramsMaxTokens = resolveMaxTokensParam(model.params);
	if (paramsMaxTokens) return {
		maxTokens: paramsMaxTokens,
		clampToModelMaxTokens: false
	};
	return {
		maxTokens: model.maxTokens,
		clampToModelMaxTokens: false
	};
}
function resolveOpenAICompletionsModelMaxTokens(model) {
	return typeof model.maxTokens === "number" && Number.isFinite(model.maxTokens) && model.maxTokens > 0 ? Math.floor(model.maxTokens) : void 0;
}
const OPENAI_COMPLETIONS_INPUT_TOKEN_SAFETY_MARGIN = 1.25;
const OPENAI_COMPLETIONS_IMAGE_CHAR_ESTIMATE = 8e3;
function estimateOpenAICompletionsInputTokens(payload) {
	let adjustedChars = 0;
	adjustedChars += estimateOpenAICompletionsMessagesChars(payload.messages);
	if (Array.isArray(payload.tools) && payload.tools.length > 0) try {
		adjustedChars += estimateStringChars(JSON.stringify(payload.tools));
	} catch {
		adjustedChars += 1024;
	}
	if (payload.response_format !== void 0) try {
		adjustedChars += estimateStringChars(JSON.stringify(payload.response_format));
	} catch {
		adjustedChars += 256;
	}
	return Math.ceil(adjustedChars / 4 * OPENAI_COMPLETIONS_INPUT_TOKEN_SAFETY_MARGIN);
}
function estimateOpenAICompletionsMessagesChars(messages) {
	if (!Array.isArray(messages)) return 0;
	let adjustedChars = 0;
	for (const message of messages) {
		if (!message || typeof message !== "object") continue;
		const record = message;
		adjustedChars += estimateOpenAICompletionsContentChars(record.content);
		for (const field of COMPLETIONS_REASONING_REPLAY_FIELDS) adjustedChars += estimateOpenAICompletionsContentChars(record[field]);
		if (record.tool_calls !== void 0) try {
			adjustedChars += estimateStringChars(JSON.stringify(record.tool_calls));
		} catch {
			adjustedChars += 256;
		}
	}
	return adjustedChars;
}
function estimateOpenAICompletionsContentChars(value) {
	if (typeof value === "string") return estimateStringChars(value);
	if (!Array.isArray(value)) return 0;
	let adjustedChars = 0;
	for (const block of value) {
		if (!block || typeof block !== "object") continue;
		const record = block;
		if (record.type === "image_url" || record.type === "input_image") {
			adjustedChars += OPENAI_COMPLETIONS_IMAGE_CHAR_ESTIMATE;
			continue;
		}
		const text = record.text;
		if (typeof text === "string") {
			adjustedChars += estimateStringChars(text);
			continue;
		}
		try {
			adjustedChars += estimateStringChars(JSON.stringify(block));
		} catch {
			adjustedChars += 256;
		}
	}
	return adjustedChars;
}
function resolveOpenAICompletionsEffectiveContextTokens(model) {
	const contextTokens = model.contextTokens;
	if (typeof contextTokens === "number" && Number.isFinite(contextTokens) && contextTokens > 0) return contextTokens;
	return typeof model.contextWindow === "number" && Number.isFinite(model.contextWindow) && model.contextWindow > 0 ? model.contextWindow : void 0;
}
function isQwenOpenAICompletionsThinkingFormat(format) {
	return format === "qwen" || format === "qwen-chat-template";
}
function setQwenChatTemplateThinking(params, enabled) {
	const existing = params.chat_template_kwargs;
	params.chat_template_kwargs = existing && typeof existing === "object" && !Array.isArray(existing) ? {
		...existing,
		enable_thinking: enabled
	} : { enable_thinking: enabled };
}
function applyQwenOpenAICompletionsThinkingParams(params) {
	if (!params.modelReasoning || !isQwenOpenAICompletionsThinkingFormat(params.compatThinkingFormat)) return false;
	const enabled = isOpenAICompletionsThinkingEnabled(params.requestedEffort);
	if (params.compatThinkingFormat === "qwen-chat-template") setQwenChatTemplateThinking(params.payload, enabled);
	else params.payload.enable_thinking = enabled;
	return true;
}
function applyTogetherOpenAICompletionsThinkingParams(params) {
	if (!params.modelReasoning || params.compatThinkingFormat !== "together") return false;
	params.payload.reasoning = { enabled: isOpenAICompletionsThinkingEnabled(params.requestedEffort) };
	return true;
}
function convertTools(tools, compat, model) {
	const projection = projectOpenAITools(tools);
	const strict = resolveOpenAIStrictToolFlagWithDiagnostics(projection, resolveOpenAIStrictToolSetting(model, {
		transport: "stream",
		supportsStrictMode: compat?.supportsStrictMode
	}), {
		transport: "completions",
		model
	});
	return {
		projection,
		tools: sortPromptCacheToolsByName(projection.tools).map((tool) => {
			const functionTool = {
				name: tool.name,
				description: tool.description,
				parameters: normalizeOpenAIStrictToolParameters(tool.parameters, strict === true, model.compat)
			};
			if (strict !== void 0) functionTool.strict = strict;
			return {
				type: "function",
				function: functionTool
			};
		})
	};
}
function extractGoogleThoughtSignature(toolCall) {
	const tc = toolCall;
	if (!tc) return;
	const fromExtra = (tc.extra_content?.google)?.thought_signature;
	if (typeof fromExtra === "string" && fromExtra.length > 0) return fromExtra;
	const fromFunction = tc.function?.thought_signature;
	return typeof fromFunction === "string" && fromFunction.length > 0 ? fromFunction : void 0;
}
function isGoogleOpenAICompatModel(model) {
	const endpointClass = detectOpenAICompletionsCompat(model).capabilities.endpointClass;
	return model.provider === "google" || endpointClass === "google-generative-ai" || endpointClass === "google-vertex";
}
function requiresGoogleCompatToolCallThoughtSignature(model) {
	return isGoogleGemini3ProModel(model.id) || isGoogleGemini3FlashModel(model.id);
}
const GOOGLE_COMPAT_THOUGHT_SIGNATURE_ELLIPSIS_RE = /[\u2026]|\.\.\./;
const GOOGLE_COMPAT_THOUGHT_SIGNATURE_BASE64_RE = /^[A-Za-z0-9+/=]+$/;
function hasGoogleCompatThoughtSignatureTruncationFootprint(value) {
	return GOOGLE_COMPAT_THOUGHT_SIGNATURE_ELLIPSIS_RE.test(value) || GOOGLE_COMPAT_THOUGHT_SIGNATURE_BASE64_RE.test(value) && value.length % 4 !== 0;
}
function injectToolCallThoughtSignatures(outgoingMessages, context, model) {
	if (!isGoogleOpenAICompatModel(model)) return;
	const sigById = /* @__PURE__ */ new Map();
	const fallbackSig = requiresGoogleCompatToolCallThoughtSignature(model) ? GEMINI_THOUGHT_SIGNATURE_VALIDATOR_SKIP : void 0;
	for (const msg of context.messages ?? []) {
		if (msg.role !== "assistant") continue;
		const source = msg;
		if (!Array.isArray(source.content)) continue;
		for (const block of source.content) {
			if (block.type !== "toolCall") continue;
			const id = block.id;
			const sig = block.thoughtSignature;
			if (typeof id === "string" && typeof sig === "string" && sig.length > 0) {
				const isSameRoute = source.api === model.api && source.provider === model.provider && source.model === model.id;
				if (!isSameRoute && !fallbackSig) continue;
				sigById.set(id, isSameRoute ? sig : fallbackSig ?? sig);
			}
		}
	}
	if (sigById.size === 0 && !fallbackSig) return;
	for (const message of outgoingMessages) {
		const toolCalls = message.tool_calls;
		if (!Array.isArray(toolCalls)) continue;
		for (const toolCall of toolCalls) {
			const id = toolCall.id;
			if (typeof id !== "string") continue;
			let sig = sigById.get(id) ?? fallbackSig;
			if (typeof sig === "string" && sig.length > 0) {
				if (hasGoogleCompatThoughtSignatureTruncationFootprint(sig.trim())) sig = fallbackSig;
			}
			if (typeof sig !== "string" || sig.length === 0) continue;
			const extra = toolCall.extra_content && typeof toolCall.extra_content === "object" ? toolCall.extra_content : {};
			toolCall.extra_content = extra;
			const google = extra.google && typeof extra.google === "object" ? extra.google : {};
			extra.google = google;
			google.thought_signature = sig;
		}
	}
}
const COMPLETIONS_REASONING_REPLAY_FIELDS = [
	"reasoning_details",
	"reasoning_content",
	"reasoning",
	"reasoning_text"
];
function stripCompletionsReasoningReplayFields(record) {
	for (const field of COMPLETIONS_REASONING_REPLAY_FIELDS) if (field in record) delete record[field];
}
function sanitizeOpenRouterReasoningReplayFields(record) {
	const reasoningDetails = record.reasoning_details;
	if (typeof reasoningDetails === "string") {
		if (reasoningDetails.length > 0 && typeof record.reasoning !== "string") record.reasoning = reasoningDetails;
		delete record.reasoning_details;
	} else if (reasoningDetails !== void 0 && !Array.isArray(reasoningDetails)) delete record.reasoning_details;
	if ("reasoning" in record && (typeof record.reasoning !== "string" || record.reasoning === "")) delete record.reasoning;
	if ("reasoning_content" in record && (typeof record.reasoning_content !== "string" || record.reasoning_content === "")) delete record.reasoning_content;
	const reasoningText = record.reasoning_text;
	if (typeof reasoningText === "string" && reasoningText.length > 0 && typeof record.reasoning !== "string" && typeof record.reasoning_content !== "string") record.reasoning = reasoningText;
	if ("reasoning_text" in record) delete record.reasoning_text;
}
function sanitizeReasoningContentReplayFields(record) {
	if ("reasoning_content" in record && typeof record.reasoning_content !== "string") delete record.reasoning_content;
	delete record.reasoning_details;
	delete record.reasoning;
	delete record.reasoning_text;
}
const REASONING_CONTENT_REPLAY_MODEL_IDS = /* @__PURE__ */ new Set([
	"deepseek-v4-flash",
	"deepseek-v4-pro",
	"kimi-for-coding",
	"kimi-k2.5",
	"kimi-k2.6",
	"kimi-k2.7-code",
	"kimi-k2.7-code-highspeed",
	"kimi-k3",
	"kimi-k2-thinking",
	"kimi-k2-thinking-turbo",
	"mimo-v2-pro",
	"mimo-v2-omni",
	"mimo-v2.5",
	"mimo-v2.5-pro",
	"mimo-v2.6-pro"
]);
const REASONING_CONTENT_REPLAY_TIER_SUFFIXES = [
	"-free",
	"-paid",
	"-trial"
];
function stripReasoningContentReplayTierSuffix(modelId) {
	for (const suffix of REASONING_CONTENT_REPLAY_TIER_SUFFIXES) if (modelId.length > suffix.length && modelId.endsWith(suffix)) return modelId.slice(0, -suffix.length);
	return modelId;
}
function getReasoningContentReplayModelIdCandidates(modelId) {
	if (typeof modelId !== "string") return [];
	const normalized = modelId.trim().toLowerCase();
	if (!normalized) return [];
	const parts = normalized.split("/").filter(Boolean);
	const finalPart = parts[parts.length - 1] ?? normalized;
	const candidates = [finalPart];
	const colonParts = finalPart.split(":").filter(Boolean);
	if (colonParts.length > 1) candidates.push(colonParts[0] ?? "", colonParts[colonParts.length - 1] ?? "");
	const baseCount = candidates.length;
	for (let index = 0; index < baseCount; index += 1) {
		const candidate = candidates[index];
		if (typeof candidate !== "string") continue;
		const stripped = stripReasoningContentReplayTierSuffix(candidate);
		if (stripped !== candidate) candidates.push(stripped);
	}
	return uniqueStrings(candidates.filter(Boolean));
}
function shouldPreserveReasoningContentReplay(model, compat) {
	if (compat.requiresReasoningContentOnAssistantMessages || compat.thinkingFormat === "deepseek" || compat.thinkingFormat === "zai" || shouldTrustReasoningContentReplayMetadata(model)) return true;
	return getReasoningContentReplayModelIdCandidates(model.id).some((modelId) => REASONING_CONTENT_REPLAY_MODEL_IDS.has(modelId));
}
function shouldPreserveOpenRouterReasoningReplay(model) {
	if (model.provider !== "openrouter") return true;
	const normalizedModelId = model.id.trim().toLowerCase();
	return !(normalizedModelId.startsWith("anthropic/") || normalizedModelId.startsWith("x-ai/"));
}
function shouldTrustReasoningContentReplayMetadata(model) {
	if (!model.reasoning) return false;
	if (model.provider.trim().toLowerCase() === "openai") return false;
	return shouldPreserveOpenRouterReasoningReplay(model);
}
function sanitizeCompletionsReasoningReplayFields(messages, options) {
	if (!Array.isArray(messages)) return;
	for (const msg of messages) {
		if (!msg || typeof msg !== "object") continue;
		const record = msg;
		if (record.role !== "assistant") continue;
		if (options.preserveOpenRouterReasoning) sanitizeOpenRouterReasoningReplayFields(record);
		else if (options.preserveReasoningContent) sanitizeReasoningContentReplayFields(record);
		else stripCompletionsReasoningReplayFields(record);
	}
}
function buildOpenAICompletionsParams(model, context, options) {
	const compat = getCompat(model);
	const compatDetection = detectOpenAICompletionsCompat(model);
	let messages = convertMessages(model, context.systemPrompt ? {
		...context,
		systemPrompt: stripSystemPromptCacheBoundary(context.systemPrompt)
	} : context, compat);
	injectToolCallThoughtSignatures(messages, context, model);
	sanitizeCompletionsReasoningReplayFields(messages, {
		preserveOpenRouterReasoning: compat.thinkingFormat === "openrouter" && shouldPreserveOpenRouterReasoningReplay(model),
		preserveReasoningContent: shouldPreserveReasoningContentReplay(model, compat)
	});
	if (compat.strictMessageKeys) messages = stripCompletionMessagesToRoleContent(messages);
	const cacheRetention = resolveCacheRetention(options?.cacheRetention);
	const promptCacheKey = resolvePromptCacheKey(options, cacheRetention);
	const params = {
		model: model.id,
		messages: compat.requiresStringContent ? flattenCompletionMessagesToStringContent(messages) : messages,
		stream: true
	};
	if (compat.supportsUsageInStreaming) params.stream_options = { include_usage: true };
	if (compat.supportsStore) params.store = false;
	if (compat.supportsPromptCacheKey && promptCacheKey) {
		params.prompt_cache_key = promptCacheKey;
		if (cacheRetention === "long" && compat.supportsLongCacheRetention) params.prompt_cache_retention = "24h";
	}
	if (options?.temperature !== void 0) params.temperature = options.temperature;
	if (options?.topP !== void 0) params.top_p = options.topP;
	const responseFormat = resolveOpenAICompletionsResponseFormat(shouldOmitOllamaCompatResponseFormat({
		provider: model.provider,
		baseUrl: model.baseUrl,
		hasTools: () => Boolean(context.tools?.length)
	}) ? void 0 : options?.responseFormat, compat.supportsJsonSchemaResponseFormat);
	if (responseFormat !== void 0) params.response_format = responseFormat;
	if (options?.frequencyPenalty !== void 0) params.frequency_penalty = options.frequencyPenalty;
	if (options?.presencePenalty !== void 0) params.presence_penalty = options.presencePenalty;
	if (options?.seed !== void 0) params.seed = options.seed;
	if (options?.stop !== void 0 && options.stop.length > 0) params.stop = options.stop;
	if (supportsModelTools(model)) {
		if (context.tools) {
			const converted = convertTools(context.tools, compat, model);
			if (converted.tools.length > 0 || converted.projection.inputToolCount === 0 && converted.projection.diagnostics.length === 0) params.tools = converted.tools;
			else if (hasToolHistory(context.messages)) params.tools = [];
			if (options?.toolChoice) {
				const toolChoice = reconcileOpenAICompletionsToolChoice(options.toolChoice, converted.projection);
				if (toolChoice !== void 0) params.tool_choice = toolChoice;
			} else if (compatDetection.capabilities.usesExplicitProxyLikeEndpoint && Array.isArray(params.tools) && params.tools.length > 0) params.tool_choice = "auto";
		} else if (hasToolHistory(context.messages)) params.tools = [];
		if (compatDetection.capabilities.usesExplicitProxyLikeEndpoint && Array.isArray(params.tools) && params.tools.length === 0) {
			delete params.tools;
			delete params.tool_choice;
		}
	}
	{
		const maxTokenBudget = resolveOpenAICompletionsMaxTokens(model, options);
		const effectiveMaxTokens = maxTokenBudget.maxTokens;
		const effectiveContextTokens = resolveOpenAICompletionsEffectiveContextTokens(model);
		let clampedMaxTokens = effectiveMaxTokens;
		const modelMaxTokens = resolveOpenAICompletionsModelMaxTokens(model);
		if (maxTokenBudget.clampToModelMaxTokens && clampedMaxTokens !== void 0 && modelMaxTokens !== void 0 && clampedMaxTokens > modelMaxTokens) {
			clampedMaxTokens = modelMaxTokens;
			emitModelTransportDebug(log, `[completions] clamp_max_tokens provider=${model.provider} api=${model.api} model=${model.id} requested=${effectiveMaxTokens} output=${clampedMaxTokens} modelMaxTokens=${modelMaxTokens}`);
		}
		if (compatDetection.capabilities.usesExplicitProxyLikeEndpoint && clampedMaxTokens !== void 0 && effectiveContextTokens !== void 0) {
			const estimatedInputTokens = estimateOpenAICompletionsInputTokens(params);
			const remainingBudget = Math.max(1, effectiveContextTokens - estimatedInputTokens - 1);
			if (clampedMaxTokens > remainingBudget) {
				clampedMaxTokens = remainingBudget;
				emitModelTransportDebug(log, `[completions] clamp_max_tokens provider=${model.provider} api=${model.api} model=${model.id} requested=${effectiveMaxTokens} output=${clampedMaxTokens} effectiveContext=${effectiveContextTokens} estimatedInput=${estimatedInputTokens}`);
			}
		}
		if (clampedMaxTokens) if (compat.maxTokensField === "max_tokens") params.max_tokens = clampedMaxTokens;
		else params.max_completion_tokens = clampedMaxTokens;
	}
	const completionsReasoningEffort = resolveOpenAICompletionsReasoningEffort(options);
	const resolvedCompletionsReasoningEffort = completionsReasoningEffort ? resolveOpenAIReasoningEffortForModel({
		model,
		effort: completionsReasoningEffort,
		fallbackMap: compat.reasoningEffortMap
	}) : void 0;
	const omitChatCompletionsToolReasoningEffort = Array.isArray(params.tools) && params.tools.length > 0 && (isOpenAIGpt54MiniModel(model) || isOpenAIGpt55Model(model) && isKnownOpenAICompletionsEndpoint(model));
	const disableChatCompletionsToolReasoning = Array.isArray(params.tools) && params.tools.length > 0 && isOpenAIGpt56Model(model) && isKnownOpenAICompletionsEndpoint(model);
	const handledQwenThinkingFormat = applyQwenOpenAICompletionsThinkingParams({
		compatThinkingFormat: compat.thinkingFormat,
		modelReasoning: model.reasoning,
		payload: params,
		requestedEffort: completionsReasoningEffort
	});
	applyTogetherOpenAICompletionsThinkingParams({
		compatThinkingFormat: compat.thinkingFormat,
		modelReasoning: model.reasoning,
		payload: params,
		requestedEffort: completionsReasoningEffort
	});
	if (disableChatCompletionsToolReasoning) params.reasoning_effort = "none";
	else if (compat.thinkingFormat === "openrouter" && model.reasoning && resolvedCompletionsReasoningEffort) params.reasoning = { effort: resolvedCompletionsReasoningEffort };
	else if (resolvedCompletionsReasoningEffort && model.reasoning && compat.supportsReasoningEffort && !handledQwenThinkingFormat && !omitChatCompletionsToolReasoningEffort) params.reasoning_effort = resolvedCompletionsReasoningEffort;
	return params;
}
function hasOpenAICompletionsReasoningUsageActivity(rawUsage) {
	const reasoningTokens = rawUsage.completion_tokens_details?.reasoning_tokens;
	return typeof reasoningTokens === "number" && Number.isFinite(reasoningTokens) && reasoningTokens > 0;
}
const completionsTesting = {
	getCompat,
	createSseDoneDetector,
	createOpenAICompletionsClient,
	buildOpenAICompletionsClientConfig,
	parseTransportChunkUsage: parseOpenAICompletionsUsage,
	processOpenAICompletionsStream,
	shouldEmitOpenAICompletionsReasoningForModel
};
if (process.env.VITEST || false) globalThis.openclawOpenAICompletionsTransportTestApi = completionsTesting;
//#endregion
//#region packages/ai/src/transports/openai-responses-payload-policy.ts
/**
* OpenAI Responses payload policy.
* Classifies endpoint capabilities and applies store, prompt-cache,
* server-compaction, service-tier, and reasoning payload rules.
*/
const OPENAI_RESPONSES_APIS = /* @__PURE__ */ new Set([
	"openai-responses",
	"azure-openai-responses",
	"openai-chatgpt-responses",
	"openclaw-openai-responses-transport",
	"openclaw-openai-chatgpt-responses-transport"
]);
const OPENAI_RESPONSES_PROVIDERS = /* @__PURE__ */ new Set([
	"openai",
	"azure-openai",
	"azure-openai-responses"
]);
const LOCAL_ENDPOINT_HOSTS = /* @__PURE__ */ new Set([
	"localhost",
	"127.0.0.1",
	"::1",
	"[::1]"
]);
const MODELSTUDIO_NATIVE_BASE_URLS = /* @__PURE__ */ new Set([
	"https://coding-intl.dashscope.aliyuncs.com/v1",
	"https://coding.dashscope.aliyuncs.com/v1",
	"https://dashscope.aliyuncs.com/compatible-mode/v1",
	"https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
]);
const MOONSHOT_NATIVE_BASE_URLS = /* @__PURE__ */ new Set(["https://api.moonshot.ai/v1", "https://api.moonshot.cn/v1"]);
function normalizeLowercaseString(value) {
	const stringValue = readStringValue(value)?.trim().toLowerCase();
	return stringValue ? stringValue : void 0;
}
function normalizeComparableBaseUrl(value) {
	const trimmed = readStringValue(value)?.trim();
	if (!trimmed) return;
	const parsedValue = /^[a-z0-9.[\]-]+(?::\d+)?(?:[/?#].*)?$/i.test(trimmed) ? `https://${trimmed}` : trimmed;
	try {
		const url = new URL(parsedValue);
		if (url.protocol !== "http:" && url.protocol !== "https:") return;
		url.hash = "";
		url.search = "";
		return url.toString().replace(/\/+$/, "").toLowerCase();
	} catch {
		return;
	}
}
function resolveUrlHostname(value) {
	const trimmed = readStringValue(value)?.trim();
	if (!trimmed) return;
	try {
		return new URL(trimmed).hostname.toLowerCase();
	} catch {
		try {
			return new URL(`https://${trimmed}`).hostname.toLowerCase();
		} catch {
			return;
		}
	}
}
function hostMatchesSuffix(host, suffix) {
	return suffix.startsWith(".") || suffix.startsWith("-") ? host.endsWith(suffix) : host === suffix || host.endsWith(`.${suffix}`);
}
function isLocalEndpointHost(host) {
	return LOCAL_ENDPOINT_HOSTS.has(host) || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal");
}
function resolveBundledOpenAIResponsesEndpointClass(baseUrl) {
	const trimmed = readStringValue(baseUrl)?.trim();
	if (!trimmed) return "default";
	const host = resolveUrlHostname(trimmed);
	if (!host) return "invalid";
	const comparableBaseUrl = normalizeComparableBaseUrl(trimmed);
	switch (host) {
		case "api.anthropic.com": return "anthropic-public";
		case "api.cerebras.ai": return "cerebras-native";
		case "llm.chutes.ai": return "chutes-native";
		case "api.deepseek.com": return "deepseek-native";
		case "api.groq.com": return "groq-native";
		case "api.mistral.ai": return "mistral-public";
		case "api.openai.com": return "openai-public";
		case "chatgpt.com": return "openai";
		case "generativelanguage.googleapis.com": return "google-generative-ai";
		case "aiplatform.googleapis.com": return "google-vertex";
		case "api.x.ai": return "xai-native";
		case "api.z.ai": return "zai-native";
	}
	if (hostMatchesSuffix(host, ".githubcopilot.com")) return "github-copilot-native";
	if (hostMatchesSuffix(host, ".openai.azure.com")) return "azure-openai";
	if (hostMatchesSuffix(host, "openrouter.ai")) return "openrouter";
	if (hostMatchesSuffix(host, "opencode.ai")) return "opencode-native";
	if (hostMatchesSuffix(host, "-aiplatform.googleapis.com")) return "google-vertex";
	if (comparableBaseUrl && MOONSHOT_NATIVE_BASE_URLS.has(comparableBaseUrl)) return "moonshot-native";
	if (comparableBaseUrl && MODELSTUDIO_NATIVE_BASE_URLS.has(comparableBaseUrl)) return "modelstudio-native";
	if (isLocalEndpointHost(host)) return "local";
	return "custom";
}
function isOpenAIResponsesApi(api) {
	return api !== void 0 && OPENAI_RESPONSES_APIS.has(api);
}
function readCompatPayloadBoolean(compat, key) {
	if (!compat || typeof compat !== "object") return;
	const value = compat[key];
	return typeof value === "boolean" ? value : void 0;
}
function resolveOpenAIResponsesPayloadCapabilities(model) {
	const provider = normalizeLowercaseString(model.provider);
	const api = normalizeLowercaseString(model.api);
	const isOpenAIProvider = provider === "openai";
	const endpointClass = resolveBundledOpenAIResponsesEndpointClass(model.baseUrl);
	const isResponsesApi = isOpenAIResponsesApi(api);
	const usesConfiguredBaseUrl = endpointClass !== "default";
	const usesKnownNativeOpenAIEndpoint = endpointClass === "openai-public" || endpointClass === "openai" || endpointClass === "azure-openai";
	const usesKnownNativeOpenAIRoute = endpointClass === "default" ? provider === "openai" : usesKnownNativeOpenAIEndpoint;
	const usesExplicitProxyLikeEndpoint = usesConfiguredBaseUrl && !usesKnownNativeOpenAIEndpoint;
	const promptCacheKeySupport = readCompatPayloadBoolean(model.compat, "supportsPromptCacheKey");
	const shouldStripResponsesPromptCache = promptCacheKeySupport === true ? false : promptCacheKeySupport === false ? isResponsesApi : isResponsesApi && usesExplicitProxyLikeEndpoint;
	const supportsResponsesStoreField = readCompatPayloadBoolean(model.compat, "supportsStore") !== false && isResponsesApi;
	return {
		allowsOpenAIServiceTier: provider === "openai" && (api === "openai-responses" || api === "openclaw-openai-responses-transport") && endpointClass === "openai-public" || isOpenAIProvider && (api === "openai-chatgpt-responses" || api === "openclaw-openai-chatgpt-responses-transport" || api === "openai-responses" || api === "openclaw-openai-responses-transport") && endpointClass === "openai",
		allowsResponsesStore: supportsResponsesStoreField && api !== "openai-chatgpt-responses" && api !== "openclaw-openai-chatgpt-responses-transport" && provider !== void 0 && OPENAI_RESPONSES_PROVIDERS.has(provider) && usesKnownNativeOpenAIEndpoint,
		shouldStripResponsesPromptCache,
		supportsResponsesStoreField,
		usesKnownNativeOpenAIRoute
	};
}
function parsePositiveInteger(value) {
	if (typeof value === "number" && Number.isFinite(value) && value > 0) return Math.floor(value);
	if (typeof value === "string") return parseStrictPositiveInteger(value);
}
function resolveOpenAIResponsesCompactThreshold(model) {
	const contextWindow = parsePositiveInteger(model.contextWindow);
	if (contextWindow) return Math.max(1e3, Math.floor(contextWindow * .7));
	return 8e4;
}
function shouldEnableOpenAIResponsesServerCompaction(explicitStore, provider, extraParams) {
	const configured = extraParams?.responsesServerCompaction;
	if (configured === false) return false;
	if (explicitStore !== true) return false;
	if (configured === true) return true;
	return provider === "openai";
}
function stripDisabledOpenAIReasoningPayload(payloadObj) {
	const reasoning = payloadObj.reasoning;
	if (reasoning === "none") {
		delete payloadObj.reasoning;
		return;
	}
	if (!reasoning || typeof reasoning !== "object" || Array.isArray(reasoning)) return;
	if (reasoning.effort === "none") delete payloadObj.reasoning;
}
/** Strip returned-item metadata rejected by strict Responses-compatible endpoints. */
function stripInputItemStatuses(input) {
	if (!Array.isArray(input)) return;
	for (const item of input) if (item && typeof item === "object" && !Array.isArray(item)) delete item.status;
}
/** Resolve payload mutation policy for one OpenAI Responses-style model endpoint. */
function resolveOpenAIResponsesPayloadPolicy(model, options = {}) {
	const capabilities = resolveOpenAIResponsesPayloadCapabilities(model);
	const storeMode = options.storeMode ?? "provider-policy";
	const explicitStore = storeMode === "preserve" ? void 0 : storeMode === "disable" ? capabilities.supportsResponsesStoreField ? false : void 0 : capabilities.allowsResponsesStore ? true : void 0;
	const isResponsesApi = isOpenAIResponsesApi(normalizeLowercaseString(model.api));
	const shouldStripDisabledReasoningPayload = isResponsesApi && (!capabilities.usesKnownNativeOpenAIRoute || !supportsOpenAIReasoningEffort(model, "none"));
	const shouldStripInputStatus = isResponsesApi && !capabilities.usesKnownNativeOpenAIRoute;
	return {
		allowsServiceTier: capabilities.allowsOpenAIServiceTier,
		compactThreshold: parsePositiveInteger(options.extraParams?.responsesCompactThreshold) ?? resolveOpenAIResponsesCompactThreshold(model),
		explicitStore,
		shouldStripDisabledReasoningPayload,
		shouldStripInputStatus,
		shouldStripPromptCache: options.enablePromptCacheStripping === true && capabilities.shouldStripResponsesPromptCache,
		shouldStripStore: explicitStore !== true && readCompatPayloadBoolean(model.compat, "supportsStore") === false && isResponsesApi,
		useServerCompaction: options.enableServerCompaction === true && shouldEnableOpenAIResponsesServerCompaction(explicitStore, model.provider, options.extraParams)
	};
}
/** Mutate a Responses request payload according to the resolved endpoint policy. */
function applyOpenAIResponsesPayloadPolicy(payloadObj, policy) {
	if (policy.explicitStore !== void 0) payloadObj.store = policy.explicitStore;
	if (policy.shouldStripStore) delete payloadObj.store;
	if (policy.shouldStripPromptCache) {
		delete payloadObj.prompt_cache_key;
		delete payloadObj.prompt_cache_retention;
	}
	if (policy.useServerCompaction && payloadObj.context_management === void 0) payloadObj.context_management = [{
		type: "compaction",
		compact_threshold: policy.compactThreshold
	}];
	if (policy.shouldStripDisabledReasoningPayload) stripDisabledOpenAIReasoningPayload(payloadObj);
	if (policy.shouldStripInputStatus) stripInputItemStatuses(payloadObj.input);
}
//#endregion
//#region packages/ai/src/transports/openai-responses-params-internal.ts
function convertResponsesTools(tools, model, options) {
	const projection = projectOpenAITools(tools);
	const strict = resolveOpenAIStrictToolFlagWithDiagnostics(projection, options?.strict, {
		transport: "responses",
		model
	});
	return {
		projection,
		tools: sortPromptCacheToolsByName(projection.tools).map((tool) => {
			const result = {
				type: "function",
				name: tool.name,
				description: tool.description,
				parameters: normalizeOpenAIStrictToolParameters(tool.parameters, strict === true, model.compat)
			};
			if (strict !== void 0) result.strict = strict;
			return result;
		})
	};
}
function getPromptCacheRetention(baseUrl, cacheRetention) {
	if (cacheRetention !== "long") return;
	return baseUrl?.includes("api.openai.com") ? "24h" : void 0;
}
function resolveOpenAIReasoningEffort(options) {
	return normalizeOpenAIReasoningEffort(options?.reasoningEffort ?? options?.reasoning ?? "high");
}
function hasResponsesWebSearchTool(tools) {
	if (!Array.isArray(tools)) return false;
	return tools.some((tool) => {
		if (!isRecord(tool)) return false;
		if (tool.type === "web_search") return true;
		if (tool.type === "function" && tool.name === "web_search") return true;
		const fn = tool.function;
		return isRecord(fn) && fn.name === "web_search";
	});
}
function raiseMinimalReasoningForResponsesWebSearch(params) {
	if (params.effort !== "minimal" || !hasResponsesWebSearchTool(params.tools)) return params.effort;
	for (const effort of [
		"low",
		"medium",
		"high"
	]) {
		const resolved = resolveOpenAIReasoningEffortForModel({
			model: params.model,
			effort
		});
		if (resolved && resolved !== "none" && resolved !== "minimal") return resolved;
	}
	return params.effort;
}
const OPENAI_CODEX_RESPONSES_UNSUPPORTED_PARAMS = [
	"max_output_tokens",
	"metadata",
	"prompt_cache_retention",
	"service_tier",
	"temperature",
	"top_p"
];
function stripOpenAICodexResponsesUnsupportedTextFields(params) {
	const text = params.text;
	if (!text || typeof text !== "object" || Array.isArray(text)) return;
	const sanitizedText = { ...text };
	delete sanitizedText.format;
	if (Object.keys(sanitizedText).length > 0) params.text = sanitizedText;
	else delete params.text;
}
function sanitizeOpenAICodexResponsesParams(model, params) {
	if (!usesNativeOpenAICodexResponsesBackend(model)) return params;
	for (const key of OPENAI_CODEX_RESPONSES_UNSUPPORTED_PARAMS) delete params[key];
	stripOpenAICodexResponsesUnsupportedTextFields(params);
	return params;
}
function buildOpenAICodexResponsesInstructions(context) {
	if (!context.systemPrompt) return;
	return sanitizeTransportPayloadText(stripSystemPromptCacheBoundary(context.systemPrompt));
}
function resolveOpenAICodexResponsesInstructions(model, context) {
	const instructions = buildOpenAICodexResponsesInstructions(context);
	if (instructions && instructions.trim().length > 0) return instructions;
	return usesNativeOpenAICodexResponsesBackend(model) ? OPENAI_CODEX_RESPONSES_DEFAULT_INSTRUCTIONS : void 0;
}
function ensureOpenAICodexResponsesInput(messages, context) {
	if (messages.length > 0 || !context.systemPrompt) return;
	if (!buildOpenAICodexResponsesInstructions(context)) throw new Error("OpenAI Codex Responses requires non-empty input when only systemPrompt is provided.");
	messages.push(buildResponsesInputMessage("user", [{
		type: "input_text",
		text: " "
	}]));
}
function resolveOpenAIResponsesTextFormat(responseFormat) {
	if (responseFormat.type === "json_schema" && responseFormat.json_schema && typeof responseFormat.json_schema === "object" && !Array.isArray(responseFormat.json_schema)) return {
		...responseFormat.json_schema,
		type: "json_schema"
	};
	return responseFormat;
}
function buildOpenAIResponsesParams(model, context, options, metadata) {
	const isCodexResponses = isOpenAICodexResponsesModel(model);
	const isNativeCodexResponses = usesNativeOpenAICodexResponsesBackend(model);
	const compat = getCompat(model);
	const supportsDeveloperRole = typeof compat.supportsDeveloperRole === "boolean" ? compat.supportsDeveloperRole : void 0;
	const payloadPolicy = resolveOpenAIResponsesPayloadPolicy(model, { storeMode: "disable" });
	const policyAllowsReplayIds = payloadPolicy.explicitStore !== false && !payloadPolicy.shouldStripStore;
	const replayResponsesItemIds = !isNativeCodexResponses && (options?.replayResponsesItemIds ?? policyAllowsReplayIds);
	const messages = convertResponsesMessages(model, context, /* @__PURE__ */ new Set([
		"openai",
		"opencode",
		"azure-openai-responses",
		"github-copilot"
	]), {
		includeSystemPrompt: !isCodexResponses,
		supportsDeveloperRole,
		replayReasoningItems: true,
		replayResponsesItemIds,
		authProfileId: options?.authProfileId,
		sessionId: options?.sessionId
	});
	if (isCodexResponses) ensureOpenAICodexResponsesInput(messages, context);
	const cacheRetention = resolveCacheRetention(options?.cacheRetention);
	const promptCacheKey = resolvePromptCacheKey(options, cacheRetention);
	const params = {
		model: model.id,
		input: messages,
		stream: true,
		prompt_cache_key: promptCacheKey,
		prompt_cache_retention: getPromptCacheRetention(model.baseUrl, cacheRetention),
		...isCodexResponses ? { instructions: resolveOpenAICodexResponsesInstructions(model, context) } : {},
		...metadata ? { metadata } : {}
	};
	const effectiveMaxTokens = options?.maxTokens || model.maxTokens;
	if (effectiveMaxTokens) params.max_output_tokens = effectiveMaxTokens;
	if (options?.temperature !== void 0) params.temperature = options.temperature;
	if (options?.topP !== void 0) params.top_p = options.topP;
	if (options?.responseFormat !== void 0) params.text = {
		...params.text,
		format: resolveOpenAIResponsesTextFormat(options.responseFormat)
	};
	if (options?.serviceTier !== void 0 && payloadPolicy.allowsServiceTier) params.service_tier = options.serviceTier;
	if (context.tools) {
		const converted = convertResponsesTools(context.tools, model, { strict: resolveOpenAIStrictToolSetting(model, { transport: "stream" }) });
		if (converted.tools.length > 0 || converted.projection.inputToolCount === 0 && converted.projection.diagnostics.length === 0) params.tools = converted.tools;
		if (options?.toolChoice) {
			const toolChoice = reconcileOpenAIResponsesToolChoice(options.toolChoice, converted.projection);
			if (toolChoice !== void 0) params.tool_choice = toolChoice;
		}
	}
	if (model.reasoning) {
		if (options?.reasoningEffort || options?.reasoning || options?.reasoningSummary) {
			const resolvedReasoningEffort = resolveOpenAIReasoningEffortForModel({
				model,
				effort: resolveOpenAIReasoningEffort(options)
			});
			const reasoningEffort = resolvedReasoningEffort ? raiseMinimalReasoningForResponsesWebSearch({
				model,
				effort: resolvedReasoningEffort,
				tools: params.tools
			}) : void 0;
			if (reasoningEffort) {
				params.reasoning = {
					effort: reasoningEffort,
					...reasoningEffort === "none" ? {} : { summary: options?.reasoningSummary || "auto" }
				};
				if (reasoningEffort !== "none") params.include = ["reasoning.encrypted_content"];
			}
		} else if (model.provider !== "github-copilot") {
			const reasoningEffort = resolveOpenAIReasoningEffortForModel({
				model,
				effort: "none"
			});
			if (reasoningEffort) params.reasoning = { effort: reasoningEffort };
		}
	}
	applyOpenAIResponsesPayloadPolicy(params, payloadPolicy);
	return sanitizeOpenAICodexResponsesParams(model, params);
}
//#endregion
//#region packages/media-core/src/inline-image-data-url.ts
/** Prefix used to distinguish inline data URLs from remote/local image references. */
const INLINE_IMAGE_DATA_URL_PREFIX = "data:";
const IMAGE_SIGNATURES = [
	{
		mime: "image/png",
		matches: (buffer) => buffer.length >= 8 && buffer[0] === 137 && buffer[1] === 80 && buffer[2] === 78 && buffer[3] === 71 && buffer[4] === 13 && buffer[5] === 10 && buffer[6] === 26 && buffer[7] === 10
	},
	{
		mime: "image/jpeg",
		matches: (buffer) => buffer.length >= 3 && buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255
	},
	{
		mime: "image/webp",
		matches: (buffer) => buffer.length >= 12 && buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP"
	},
	{
		mime: "image/gif",
		matches: (buffer) => buffer.length >= 6 && (buffer.subarray(0, 6).toString("ascii") === "GIF87a" || buffer.subarray(0, 6).toString("ascii") === "GIF89a")
	},
	{
		mime: "image/bmp",
		matches: (buffer) => buffer.length >= 2 && buffer[0] === 66 && buffer[1] === 77
	}
];
const HEIC_BRANDS = /* @__PURE__ */ new Set([
	"heic",
	"heix",
	"hevc",
	"hevx",
	"heis",
	"heim",
	"hevm",
	"hevs"
]);
const HEIF_BRANDS = /* @__PURE__ */ new Set(["mif1", "msf1"]);
const IMAGE_SIGNATURE_PREFIX_BASE64_CHARS = 128;
const INLINE_IMAGE_DATA_URL_MIMES = /* @__PURE__ */ new Set([
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/gif"
]);
function startsWithDataUrl(value) {
	return value.slice(0, 5).toLowerCase() === INLINE_IMAGE_DATA_URL_PREFIX;
}
function sniffIsoBmffImageMime(buffer) {
	if (buffer.length < 12 || buffer.subarray(4, 8).toString("ascii") !== "ftyp") return;
	const brands = [buffer.subarray(8, 12).toString("ascii")];
	for (let offset = 16; offset + 4 <= buffer.length; offset += 4) brands.push(buffer.subarray(offset, offset + 4).toString("ascii"));
	if (brands.some((brand) => HEIC_BRANDS.has(brand))) return "image/heic";
	if (brands.some((brand) => HEIF_BRANDS.has(brand))) return "image/heif";
}
/** Sniffs supported inline image formats from decoded bytes. */
function sniffInlineImageMime(buffer) {
	return IMAGE_SIGNATURES.find((signature) => signature.matches(buffer))?.mime ?? sniffIsoBmffImageMime(buffer);
}
function isImageMimeType(value) {
	return value.trim().toLowerCase().startsWith("image/");
}
/** Canonicalizes trusted inline image base64 and rejects malformed or non-image payloads. */
function sanitizeInlineImageBase64(params) {
	if (!isImageMimeType(params.mimeType)) return;
	const canonicalPayload = canonicalizeBase64(params.base64);
	if (!canonicalPayload) return;
	const sniffedMimeType = sniffInlineImageMime(Buffer.from(canonicalPayload.slice(0, IMAGE_SIGNATURE_PREFIX_BASE64_CHARS), "base64"));
	if (!sniffedMimeType) return;
	return {
		mimeType: sniffedMimeType,
		base64: canonicalPayload
	};
}
function parseInlineImageDataUrl(value) {
	if (!startsWithDataUrl(value)) return {
		metadata: [],
		payload: value
	};
	const commaIndex = value.indexOf(",");
	if (commaIndex < 0) return;
	return {
		metadata: value.slice(5, commaIndex).split(";").map((part) => part.trim()),
		payload: value.slice(commaIndex + 1)
	};
}
function metadataAllowsImageBase64(metadata) {
	const [mimeType, ...options] = metadata;
	return mimeType !== void 0 && isImageMimeType(mimeType) && options.some((part) => part.toLowerCase() === "base64");
}
function sanitizeInlineImageDataUrlWithAllowedMimes(imageUrl, allowedMimes) {
	const parsed = parseInlineImageDataUrl(imageUrl);
	if (!parsed) return;
	if (parsed.metadata.length === 0) return imageUrl;
	if (!metadataAllowsImageBase64(parsed.metadata)) return;
	const [mimeType] = parsed.metadata;
	const sanitized = sanitizeInlineImageBase64({
		mimeType: mimeType ?? "",
		base64: parsed.payload
	});
	if (!sanitized) return;
	if (allowedMimes && !allowedMimes.has(sanitized.mimeType)) return;
	return `data:${sanitized.mimeType};base64,${sanitized.base64}`;
}
/** Canonicalizes provider-safe inline image data URLs and rejects unsupported formats. */
function sanitizeInlineImageDataUrl(imageUrl) {
	return sanitizeInlineImageDataUrlWithAllowedMimes(imageUrl, INLINE_IMAGE_DATA_URL_MIMES);
}
//#endregion
//#region packages/ai/src/transports/responses-image-payload-sanitizer.ts
/**
* Sanitizes OpenAI Responses payloads before transport. Invalid inline images
* are replaced with text placeholders so the request remains valid and
* auditable.
*/
const IMAGE_OMITTED_TEXT = "omitted image payload: invalid inline image data";
function invalidSnakeImage() {
	return {
		type: "input_text",
		text: `[${IMAGE_OMITTED_TEXT}]`
	};
}
function sanitizeValue(value) {
	if (Array.isArray(value)) return value.map(sanitizeValue);
	if (!isRecord(value)) return value;
	if (value.type === "input_image" && typeof value.image_url === "string") {
		const imageUrl = sanitizeInlineImageDataUrl(value.image_url);
		return imageUrl ? {
			...value,
			image_url: imageUrl
		} : invalidSnakeImage();
	}
	const next = {};
	for (const [key, child] of Object.entries(value)) next[key] = sanitizeValue(child);
	return next;
}
/** Sanitize inline image fields inside a Responses API payload. */
function sanitizeResponsesImagePayload(params) {
	if (!Array.isArray(params.input)) return params;
	return {
		...params,
		input: sanitizeValue(params.input)
	};
}
//#endregion
//#region packages/ai/src/transports/openai-responses-client.ts
function resolveProviderTransportTurnState(model, params) {
	const normalizedProvider = model.provider.trim().toLowerCase();
	const allowRuntimePluginLoad = normalizedProvider === "openai" || normalizedProvider === "azure-openai" || normalizedProvider === "azure-openai-responses";
	return getAiTransportHost().plugin.resolveTransportTurnState({
		provider: model.provider,
		modelId: model.id,
		allowRuntimePluginLoad,
		context: {
			provider: model.provider,
			modelId: model.id,
			model,
			sessionId: params.sessionId,
			turnId: params.turnId,
			attempt: params.attempt,
			transport: params.transport
		}
	});
}
function createOpenAIResponsesClient(model, context, apiKey, optionHeaders, turnHeaders, sessionId) {
	return new OpenAI({
		apiKey,
		baseURL: model.baseUrl,
		dangerouslyAllowBrowser: true,
		defaultHeaders: buildOpenAIClientHeaders(model, context, optionHeaders, turnHeaders, sessionId),
		fetch: buildGuardedModelFetch(model),
		...buildOpenAISdkClientOptions(model)
	});
}
function createResponsesTransportExecutor(config) {
	return (model, context, options) => {
		const responsesOptions = options;
		const eventStream = createAssistantMessageEventStream();
		const stream = eventStream;
		(async () => {
			const output = {
				role: "assistant",
				content: [],
				api: config.outputApi ?? model.api,
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
			let firstEventAbort;
			try {
				const apiKey = options?.apiKey || getEnvApiKey(model.provider) || "";
				const turnState = resolveProviderTransportTurnState(model, {
					sessionId: options?.sessionId,
					turnId: randomUUID(),
					attempt: 1,
					transport: "stream"
				});
				const client = config.createClient(model, context, apiKey, options?.headers, turnState?.headers, options?.sessionId);
				let params = config.buildRequest(model, context, responsesOptions, turnState?.metadata);
				const nextParams = await options?.onPayload?.(params, model);
				if (nextParams !== void 0) params = nextParams;
				if (!isOpenAICodexResponsesModel(model)) params = mergeTransportMetadata(params, turnState?.metadata);
				params = sanitizeOpenAICodexResponsesParams(model, params);
				params = sanitizeResponsesImagePayload(params);
				if (options?.openclawCodeModeToolSurface === true) {
					const visibleToolNames = resolveCodeModeResponsesVisibleToolNames(context);
					enforceCodeModeResponsesToolSurface(params, visibleToolNames);
					assertCodeModeResponsesToolSurface(params, visibleToolNames);
				}
				const requestStartedAt = Date.now();
				firstEventAbort = createFirstStreamEventAbortController(options?.signal);
				const requestOptions = buildOpenAISdkRequestOptions(model, firstEventAbort.signal, {
					stream: config.streamRequest,
					timeoutMs: options?.timeoutMs,
					maxRetries: options?.maxRetries
				});
				emitModelTransportDebug(log, `[responses] start provider=${model.provider} api=${model.api} model=${model.id} baseUrl=${formatModelTransportDebugBaseUrl(model.baseUrl)} timeoutMs=${safeDebugValue(requestOptions?.timeout)} apiKey=${apiKey ? "present" : "missing"} ${summarizeResponsesPayload(params)}`);
				const { stream: responseStream, response } = await config.createResponseStream({
					client,
					request: params,
					requestOptions,
					model
				});
				await options?.onResponse?.({
					status: response.status,
					headers: headersToRecord(response.headers)
				}, model);
				emitModelTransportDebug(log, `[responses] headers provider=${model.provider} api=${model.api} model=${model.id} elapsedMs=${Date.now() - requestStartedAt}`);
				stream.push({
					type: "start",
					partial: output
				});
				await processResponsesStream(observeResponsesStream(responseStream, model), output, stream, model, {
					...config.pricingOptions?.(responsesOptions),
					firstEventTimeoutMs: getFirstStreamEventTimeoutMs(options) ?? config.firstEventTimeoutMs,
					abortFirstEventStream: firstEventAbort.abort,
					onFirstEventTimeout: getFirstStreamEventTimeoutHandler(options),
					signal: options?.signal,
					reasoningReplayMetadata: buildOpenAIResponsesReasoningReplayMetadata(model, {
						authProfileId: responsesOptions?.authProfileId,
						sessionId: options?.sessionId
					})
				});
				if (options?.signal?.aborted) throw transportAbortError(options.signal);
				if (output.stopReason === "aborted" || output.stopReason === "error") throw new Error("An unknown error occurred");
				stream.push({
					type: "done",
					reason: output.stopReason,
					message: output
				});
				stream.end();
			} catch (error) {
				if (error instanceof ResponsesStreamFailure && error.observation) logResponsesFailedNoDetails(error.observation);
				log.warn(`[responses] error provider=${model.provider} api=${model.api} model=${model.id} ` + summarizeOpenAITransportError(error));
				assignTransportErrorDetails(output, error, options?.signal);
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
		return eventStream;
	};
}
function createOpenAIResponsesTransportStreamFn() {
	return createResponsesTransportExecutor({
		streamRequest: true,
		createClient: createOpenAIResponsesClient,
		buildRequest: buildOpenAIResponsesParams,
		createResponseStream: createResponsesStreamWithEncryptedContentRetry,
		pricingOptions: (options) => ({
			serviceTier: options?.serviceTier,
			applyServiceTierPricing
		})
	});
}
function createAzureOpenAIResponsesTransportStreamFn() {
	return createResponsesTransportExecutor({
		outputApi: "azure-openai-responses",
		firstEventTimeoutMs: AZURE_RESPONSES_FIRST_EVENT_TIMEOUT_MS,
		createClient: createAzureOpenAIClient,
		buildRequest: (model, context, options, metadata) => buildAzureOpenAIResponsesParams(model, context, options, resolveAzureDeploymentName(model), metadata),
		createResponseStream: async ({ client, request, requestOptions }) => {
			const { data, response } = await client.responses.create(request, requestOptions).withResponse();
			return {
				stream: data,
				response
			};
		}
	});
}
function normalizeAzureBaseUrl(baseUrl) {
	return baseUrl.replace(/\/+$/, "");
}
function resolveAzureDeploymentName(model) {
	return resolveAzureDeploymentNameFromMap({
		modelId: model.id,
		deploymentMap: process.env.AZURE_OPENAI_DEPLOYMENT_NAME_MAP
	});
}
function createAzureOpenAIClient(model, context, apiKey, optionHeaders, turnHeaders) {
	const baseURL = normalizeAzureBaseUrl(model.baseUrl);
	const clientOptions = {
		apiKey,
		dangerouslyAllowBrowser: true,
		defaultHeaders: buildOpenAIClientHeaders(model, context, optionHeaders, turnHeaders),
		baseURL,
		fetch: buildGuardedModelFetch(model),
		...buildOpenAISdkClientOptions(model)
	};
	if (isOpenAICompatibleAzureResponsesBaseUrl(baseURL)) return new OpenAI(clientOptions);
	return new AzureOpenAI({
		...clientOptions,
		apiVersion: resolveAzureOpenAIApiVersion()
	});
}
function buildAzureOpenAIResponsesParams(model, context, options, deploymentName, metadata) {
	const params = buildOpenAIResponsesParams(model, context, options, metadata);
	params.model = deploymentName;
	delete params.store;
	return params;
}
//#endregion
//#region packages/ai/src/transports/openai-responses-transport.ts
/** OpenAI Responses transport facade. */
const responsesTesting = {
	getCompat,
	assertCodeModeResponsesToolSurface,
	buildOpenAIResponsesParams,
	buildOpenAIClientHeaders,
	buildOpenAISdkClientOptions,
	buildOpenAISdkRequestOptions,
	createAzureOpenAIClient,
	createOpenAIResponsesClient,
	enforceCodeModeResponsesToolSurface,
	sanitizeOpenAICodexResponsesParams,
	processResponsesStream,
	formatModelTransportDebugBaseUrl,
	buildResponsesFailedNoDetailsObservation,
	buildOpenAIResponsesReasoningReplayMetadata,
	isInvalidEncryptedContentError,
	normalizeResponsesFailedEvent,
	prepareOpenAIResponsesReasoningItemForReplay,
	createResponsesStreamWithEncryptedContentRetry,
	resolveAzureOpenAIApiVersion,
	stripResponsesRequestEncryptedContent,
	tagOpenAIResponsesReasoningReplayItem,
	summarizeResponsesFailedNoDetailsObservation,
	summarizeResponsesPayload,
	summarizeResponsesTools,
	stringifyRedactedEvent,
	stringifyRedactedPayload
};
if (process.env.VITEST || false) globalThis.openclawOpenAIResponsesTransportTestApi = responsesTesting;
//#endregion
//#region packages/ai/src/transports/provider-transport-stream.ts
const SUPPORTED_TRANSPORT_APIS = /* @__PURE__ */ new Set([
	"openai-responses",
	"openai-chatgpt-responses",
	"openai-completions",
	"azure-openai-responses",
	"anthropic-messages",
	"google-generative-ai"
]);
const SIMPLE_TRANSPORT_API_ALIAS = {
	"openai-responses": "openclaw-openai-responses-transport",
	"openai-chatgpt-responses": "openclaw-openai-chatgpt-responses-transport",
	"openai-completions": "openclaw-openai-completions-transport",
	"azure-openai-responses": "openclaw-azure-openai-responses-transport",
	"anthropic-messages": "openclaw-anthropic-messages-transport",
	"google-generative-ai": "openclaw-google-generative-ai-transport"
};
function createProviderOwnedGoogleTransportStreamFn(model, ctx) {
	return getAiTransportHost().plugin.resolveProviderStream({
		provider: model.provider,
		config: ctx?.cfg,
		workspaceDir: ctx?.workspaceDir,
		env: ctx?.env,
		context: {
			config: ctx?.cfg,
			agentDir: ctx?.agentDir,
			workspaceDir: ctx?.workspaceDir,
			provider: model.provider,
			modelId: model.id,
			model
		}
	}) ?? getAiTransportHost().plugin.resolveProviderStream({
		provider: "google",
		config: ctx?.cfg,
		workspaceDir: ctx?.workspaceDir,
		env: ctx?.env,
		context: {
			config: ctx?.cfg,
			agentDir: ctx?.agentDir,
			workspaceDir: ctx?.workspaceDir,
			provider: model.provider,
			modelId: model.id,
			model
		}
	}) ?? void 0;
}
function createSupportedTransportStreamFn(model, ctx) {
	switch (model.api) {
		case "openai-responses":
		case "openai-chatgpt-responses": return createOpenAIResponsesTransportStreamFn();
		case "openai-completions": return createOpenAICompletionsTransportStreamFn();
		case "azure-openai-responses": return createAzureOpenAIResponsesTransportStreamFn();
		case "anthropic-messages": return createAnthropicMessagesTransportStreamFn();
		case "google-generative-ai": return createProviderOwnedGoogleTransportStreamFn(model, ctx);
		default: return;
	}
}
function hasOpenClawTransportRequirement(model) {
	return getAiTransportHost().requiresManagedTransport(model);
}
/** Returns whether OpenClaw has a managed transport implementation for this API. */
function isTransportAwareApiSupported(api) {
	return SUPPORTED_TRANSPORT_APIS.has(api);
}
/** Maps public model APIs to the internal transport API id used by simple runtime dispatch. */
function resolveTransportAwareSimpleApi(api) {
	return SIMPLE_TRANSPORT_API_ALIAS[api];
}
/** Creates a managed transport stream only when request overrides require it. */
function createTransportAwareStreamFnForModel(model, ctx) {
	if (!hasOpenClawTransportRequirement(model)) return;
	if (!isTransportAwareApiSupported(model.api)) throw new Error(`Model-provider request.proxy/request.tls/localService is not yet supported for api "${model.api}"`);
	const streamFn = createSupportedTransportStreamFn(model, ctx);
	if (!streamFn) throw new Error(`Managed transport stream is unavailable for api "${model.api}"`);
	return streamFn;
}
/** Creates a managed OpenClaw transport stream for explicit fallback/runtime callers. */
function createOpenClawTransportStreamFnForModel(model, ctx) {
	if (!isTransportAwareApiSupported(model.api)) return;
	return createSupportedTransportStreamFn(model, ctx);
}
function createBoundaryAwareStreamFnForModel(model, ctx) {
	if (!isTransportAwareApiSupported(model.api)) return;
	return createSupportedTransportStreamFn(model, ctx);
}
function prepareTransportAwareSimpleModel(model, ctx) {
	const streamFn = createTransportAwareStreamFnForModel(model, ctx);
	const alias = resolveTransportAwareSimpleApi(model.api);
	if (!streamFn || !alias) return model;
	return getAiTransportHost().inheritManagedTransport(model, {
		...model,
		api: alias
	});
}
function buildTransportAwareSimpleStreamFn(model, ctx) {
	return createTransportAwareStreamFnForModel(model, ctx);
}
//#endregion
//#region packages/ai/src/transports/simple-completion-transport.ts
const PROVIDER_SIMPLE_COMPLETION_API_PREFIX = "openclaw-provider-simple:";
const PROVIDER_STREAM_API_PREFIX = "openclaw-provider-stream:";
const INVALID_CODEX_BASE_URL_MESSAGE = "OpenAI Codex Responses baseUrl must not include query parameters or fragments";
function registerCustomApi(registry, api, streamFn) {
	getAiTransportHost().registerCustomApi(registry, api, streamFn);
	return registry.getApiProvider(api) !== void 0;
}
function projectModel(model, patch) {
	return getAiTransportHost().inheritManagedTransport(model, {
		...model,
		...patch
	});
}
function resolveAnthropicVertexSimpleApi(baseUrl) {
	return `openclaw-anthropic-vertex-simple:${baseUrl?.trim() ? encodeURIComponent(baseUrl.trim()) : "default"}`;
}
function normalizeCodexResponsesBaseUrlForOpenAISdk(baseUrl) {
	const normalized = baseUrl?.trim() || "https://chatgpt.com/backend-api";
	try {
		const parsed = new URL(normalized);
		const pathname = parsed.pathname.replace(/\/+$/u, "");
		const path = pathname.toLowerCase();
		if (parsed.hostname.toLowerCase() === "chatgpt.com" && [
			"/backend-api",
			"/backend-api/v1",
			"/backend-api/codex",
			"/backend-api/codex/v1",
			"/backend-api/codex/responses"
		].includes(path)) {
			parsed.pathname = "/backend-api/codex";
			parsed.search = "";
			parsed.hash = "";
			return parsed.toString().replace(/\/$/u, "");
		}
		if (normalized.includes("?") || normalized.includes("#")) throw new Error(INVALID_CODEX_BASE_URL_MESSAGE);
		parsed.pathname = path.endsWith("/codex/responses") ? pathname.slice(0, -10) : path.endsWith("/codex") ? pathname : `${pathname}/codex`;
		return parsed.toString();
	} catch (error) {
		if (error instanceof Error && error.message === INVALID_CODEX_BASE_URL_MESSAGE) throw error;
	}
	if (normalized.includes("?") || normalized.includes("#")) throw new Error(INVALID_CODEX_BASE_URL_MESSAGE);
	const path = normalized.replace(/\/+$/u, "");
	if (path.endsWith("/codex/responses")) return path.slice(0, -10);
	return path.endsWith("/codex") ? path : `${path}/codex`;
}
function resolveProviderSimpleCompletionApi(model) {
	const parts = [
		model.provider,
		model.id,
		model.api,
		model.baseUrl || "default"
	];
	return `${PROVIDER_SIMPLE_COMPLETION_API_PREFIX}${parts.map((part) => encodeURIComponent(part)).join(":")}`;
}
function resolveProviderStreamApi(model) {
	const parts = [
		model.provider,
		model.id,
		model.api,
		model.baseUrl || "default"
	];
	return `${PROVIDER_STREAM_API_PREFIX}${parts.map((part) => encodeURIComponent(part)).join(":")}`;
}
function applyProviderSimpleCompletionWrapper(registry, model, cfg) {
	if (model.api.startsWith(PROVIDER_SIMPLE_COMPLETION_API_PREFIX)) return model;
	const sourceProvider = registry.getApiProvider(model.api);
	if (!sourceProvider) return model;
	const sourceApi = model.api;
	const sourceStreamFn = (runtimeModel, context, options) => sourceProvider.streamSimple(projectModel(runtimeModel, { api: sourceApi }), context, options);
	const streamFn = getAiTransportHost().plugin.wrapSimpleCompletionStream({
		provider: model.provider,
		config: cfg,
		context: {
			config: cfg,
			provider: model.provider,
			modelId: model.id,
			model,
			streamFn: sourceStreamFn
		}
	});
	if (!streamFn) return model;
	const api = resolveProviderSimpleCompletionApi(model);
	return registerCustomApi(registry, api, streamFn) ? projectModel(model, { api }) : model;
}
function prepareCodexSimpleTransportModel(registry, model, cfg) {
	if (model.provider !== "openai" || model.api !== "openai-chatgpt-responses") return;
	const transportModel = projectModel(model, { baseUrl: normalizeCodexResponsesBaseUrlForOpenAISdk(model.baseUrl) });
	const api = resolveTransportAwareSimpleApi(model.api);
	const streamFn = createOpenClawTransportStreamFnForModel(transportModel, { cfg });
	if (!api || !streamFn) return;
	if (!registerCustomApi(registry, api, streamFn)) return;
	return projectModel(transportModel, { api });
}
function resolveModelHeaderSentinels(model) {
	const headers = resolveAiTransportHeaderSentinels(model.headers);
	return headers === model.headers ? model : projectModel(model, { headers });
}
function wrapPluginProviderStream(streamFn) {
	return (model, context, options) => {
		const host = getAiTransportHost();
		const apiKey = options?.apiKey ? host.resolveSecretSentinel(options.apiKey) : options?.apiKey;
		const headers = resolveAiTransportHeaderSentinels(options?.headers);
		return streamFn(resolveModelHeaderSentinels(model), context, apiKey === options?.apiKey && headers === options?.headers ? options : {
			...options,
			apiKey,
			headers
		});
	};
}
function prepareProviderStreamModel(params) {
	if (params.model.api === "google-generative-ai") return;
	const pluginModel = resolveModelHeaderSentinels(params.model);
	const providerStreamFn = getAiTransportHost().plugin.resolveProviderStream({
		provider: params.model.provider,
		config: params.cfg,
		context: {
			config: params.cfg,
			provider: params.model.provider,
			modelId: params.model.id,
			model: pluginModel
		}
	});
	const transportFallback = providerStreamFn ? void 0 : createTransportAwareStreamFnForModel(params.model.api === "google-generative-ai" ? pluginModel : params.model, { cfg: params.cfg });
	const streamFn = providerStreamFn ? wrapPluginProviderStream(providerStreamFn) : transportFallback && params.model.api === "google-generative-ai" ? wrapPluginProviderStream(transportFallback) : transportFallback;
	if (!streamFn) return;
	const api = params.apiRegistry.getApiProvider(params.model.api) ? resolveProviderStreamApi(params.model) : params.model.api;
	if (!registerCustomApi(params.apiRegistry, api, streamFn)) return;
	return api === params.model.api ? params.model : projectModel(params.model, { api });
}
function prepareModelForSimpleCompletion(params) {
	const { apiRegistry, model, cfg } = params;
	const providerStreamModel = prepareProviderStreamModel({
		model,
		cfg,
		apiRegistry
	});
	if (providerStreamModel) return applyProviderSimpleCompletionWrapper(apiRegistry, providerStreamModel, cfg);
	const codexTransportModel = prepareCodexSimpleTransportModel(apiRegistry, model, cfg);
	if (codexTransportModel) return applyProviderSimpleCompletionWrapper(apiRegistry, codexTransportModel, cfg);
	const transportAwareModel = prepareTransportAwareSimpleModel(model, { cfg });
	if (transportAwareModel !== model) {
		const streamFn = buildTransportAwareSimpleStreamFn(model, { cfg });
		if (streamFn && registerCustomApi(apiRegistry, transportAwareModel.api, streamFn)) return applyProviderSimpleCompletionWrapper(apiRegistry, transportAwareModel, cfg);
	}
	if (model.api === "google-generative-ai") return applyProviderSimpleCompletionWrapper(apiRegistry, getAiTransportHost().prepareGoogleSimpleCompletionModel(apiRegistry, model), cfg);
	if (model.provider === "anthropic-vertex") {
		const api = resolveAnthropicVertexSimpleApi(model.baseUrl);
		if (registerCustomApi(apiRegistry, api, getAiTransportHost().plugin.createAnthropicVertexStream(model))) return applyProviderSimpleCompletionWrapper(apiRegistry, projectModel(model, { api }), cfg);
	}
	return applyProviderSimpleCompletionWrapper(apiRegistry, model, cfg);
}
//#endregion
export { GEMINI_THOUGHT_SIGNATURE_VALIDATOR_SKIP, applyAnthropicCacheControlToMessages, applyAnthropicEphemeralCacheControlMarkers, applyAnthropicPayloadPolicyToParams, applyOpenAIResponsesPayloadPolicy, assertCodeModeResponsesToolSurface, assignTransportErrorDetails, buildOpenAIClientHeaders, buildOpenAICompletionsParams, buildOpenAISdkClientOptions, buildOpenAISdkRequestOptions, buildTransportAwareSimpleStreamFn, canonicalizeMaxTokensParam, coerceTransportToolCallArguments, createAnthropicMessagesTransportStreamFn, createAzureOpenAIResponsesTransportStreamFn, createBoundaryAwareStreamFnForModel, createDeepSeekTextFilter, createEmptyTransportUsage, createModelStreamCooperativeScheduler, createOpenAICompletionsTransportStreamFn, createOpenAIResponsesTransportStreamFn, createOpenClawTransportStreamFnForModel, createTransportAwareStreamFnForModel, createWritableTransportEventStream, detectOpenAICompletionsCompat, emitModelTransportDebug, enforceCodeModeResponsesToolSurface, failTransportStream, filterCodeModePayloadTools, finalizeTransportStream, flattenCompletionMessagesToStringContent, formatModelTransportDebugBaseUrl, formatModelTransportDebugUrl, getCompat, hasOpenAICompatibleConversationTurn, isCodeModeModelVisibleToolName, isOpenAICodexResponsesModel, isOpenAICompletionsThinkingEnabled, log, mergeTransportHeaders, mergeTransportMetadata, normalizeCodexResponsesBaseUrlForOpenAISdk, parseJsonObjectPreservingUnsafeIntegers, parseJsonPreservingUnsafeIntegers, parseOpenAICompletionsUsage, prepareModelForSimpleCompletion, prepareTransportAwareSimpleModel, quoteUnsafeIntegerLiterals, readCodeModePayloadToolName, readOpenAICompletionsContentDeltas, resolveAnthropicEphemeralCacheControl, resolveAnthropicMessagesUrl, resolveAnthropicPayloadPolicy, resolveCodeModeResponsesVisibleToolNames, resolveMaxTokensParam, resolveModelPayloadDebugMode, resolveModelSseDebugMode, resolveOpenAICompletionsCompat, resolveOpenAIReasoningEffortMap, resolveOpenAIResponsesPayloadPolicy, resolveOpenAIStrictToolFlagWithDiagnostics, resolvePromptCacheKey, resolveReplayableResponsesMessageId, resolveTransportAwareSimpleApi, sanitizeNonEmptyTransportPayloadText, sanitizeResponsesImagePayload, sanitizeTransportPayloadText, sortPromptCacheToolsByName as sortTransportToolsByName, stripCompletionMessagesToRoleContent, throwIfModelStreamAborted, transportAbortError, usesNativeOpenAICodexResponsesBackend };
