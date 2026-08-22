import { i as transformMessages, n as getAiTransportHost } from "./host-Bl7Kgddo.mjs";
import { r as clampThinkingLevel } from "./model-utils-Dau5dlgm.mjs";
import { t as sanitizeSurrogates } from "./sanitize-unicode-DT5o51ur.mjs";
import { a as isImageWithMediaPayload, h as stripSystemPromptCacheBoundary, r as extractToolResultText, t as describeToolResultMediaPlaceholder, v as sortPromptCacheToolsByName } from "./tool-result-text-Dvkp2Dus.mjs";
import { H as findOpenAIStrictToolProjectionDiagnostics, K as resolveOpenAIProjectedToolsStrictToolFlag, W as normalizeOpenAIStrictToolParameters, dt as supportsOpenAIReasoningEffort, ft as supportsOpenAITemperature, lt as resolveOpenAIReasoningEffortForModel, n as processResponsesStream } from "./openai-responses-stream-internal-BW8Vqzup.mjs";
import { d as transportAbortError } from "./transport-stream-shared-CPNv7A3r.mjs";
import { l as projectOpenAITools } from "./openai-transport-shared-Cipt7egQ.mjs";
import { i as getFirstStreamEventTimeoutMs, r as getFirstStreamEventTimeoutHandler, t as createFirstStreamEventAbortController } from "./stream-first-event-timeout-BIBomOGq.mjs";
import { t as headersToRecord } from "./headers-B_e4-1J0.mjs";
import { t as shortHash } from "./hash-CHgqbJmD.mjs";
import "./transform-messages-DfjpNXNQ.mjs";
import { createHash } from "node:crypto";
//#region packages/ai/src/providers/openai-responses-tools.ts
const LOG_SUBSYSTEM = "llm/openai-responses";
const MAX_STRICT_TOOL_DOWNGRADE_DIAGNOSTIC_KEYS = 64;
const loggedStrictToolDowngradeDiagnosticKeys = /* @__PURE__ */ new Set();
/** Converts and returns the projection used to reconcile tool choices. */
function convertResponsesToolPayload(tools, options) {
	const projection = projectOpenAITools(tools);
	const strict = resolveResponsesStrictToolFlag(projection, resolveResponsesStrictToolSetting(options), options?.model);
	return {
		projection,
		tools: sortPromptCacheToolsByName(projection.tools).map((tool) => {
			const result = {
				type: "function",
				name: tool.name,
				description: tool.description,
				parameters: normalizeOpenAIStrictToolParameters(tool.parameters, strict === true, options?.model?.compat)
			};
			if (strict !== void 0) result.strict = strict;
			return result;
		})
	};
}
function resolveResponsesStrictToolSetting(options) {
	if (options?.strict !== void 0) return options.strict;
	if (options?.model) return getAiTransportHost().resolveOpenAIStrictToolSetting(options.model, {
		transport: "stream",
		supportsStrictMode: options.supportsStrictMode
	});
	return false;
}
function resolveResponsesStrictToolFlag(projection, strictSetting, model) {
	const strict = resolveOpenAIProjectedToolsStrictToolFlag(projection, strictSetting);
	if (strictSetting === true && strict === false && model) getAiTransportHost().logDebug(LOG_SUBSYSTEM, () => {
		const diagnostics = findOpenAIStrictToolProjectionDiagnostics(projection);
		if (!shouldLogStrictToolDowngradeDiagnostic(diagnostics, model)) return null;
		const sample = diagnostics.slice(0, 5).map((entry) => ({
			tool: entry.toolName ?? `tool[${entry.toolIndex}]`,
			violations: entry.violations.slice(0, 8)
		}));
		return {
			message: `OpenAI responses tool schema strict mode downgraded to strict=false for ${model.provider ?? "unknown"}/${model.id ?? "unknown"} because ${diagnostics.length} tool schema(s) are not strict-compatible`,
			data: {
				provider: model.provider,
				model: model.id,
				incompatibleToolCount: diagnostics.length,
				sample
			}
		};
	});
	return strict;
}
function shouldLogStrictToolDowngradeDiagnostic(diagnostics, model) {
	const key = createHash("sha256").update(JSON.stringify({
		provider: model.provider,
		model: model.id,
		diagnostics: diagnostics.map((entry) => ({
			toolIndex: entry.toolIndex,
			toolName: entry.toolName ?? null,
			violations: entry.violations
		}))
	})).digest("hex");
	if (loggedStrictToolDowngradeDiagnosticKeys.has(key)) return false;
	if (loggedStrictToolDowngradeDiagnosticKeys.size >= MAX_STRICT_TOOL_DOWNGRADE_DIAGNOSTIC_KEYS) loggedStrictToolDowngradeDiagnosticKeys.clear();
	loggedStrictToolDowngradeDiagnosticKeys.add(key);
	return true;
}
//#endregion
//#region packages/ai/src/providers/openai-responses-shared.ts
const EMPTY_TOOL_RESULT_TEXT = "(no output)";
function splitResponsesToolCallId(id) {
	const separatorIndex = id.indexOf("|");
	return separatorIndex === -1 ? [id, void 0] : [id.slice(0, separatorIndex), id.slice(separatorIndex + 1)];
}
function sanitizeToolResultText(text, fallback) {
	const sanitized = sanitizeSurrogates(text);
	return sanitized.trim().length > 0 ? sanitized : fallback;
}
function normalizeResponsesReasoningReplayItem(params) {
	const next = { ...params.item };
	if (!Array.isArray(next.summary)) next.summary = [];
	if (!params.replayResponsesItemIds) delete next.id;
	return next;
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
function resolveReplayableResponsesMessageId(params) {
	if (!params.textSignatureId) return params.fallbackOrdinal === 0 ? params.fallbackId : `${params.fallbackId}_${params.fallbackOrdinal}`;
	return params.previousReplayItemWasReasoning ? params.textSignatureId : void 0;
}
function isResponsesReasoningEffort(effort) {
	return effort === "minimal" || effort === "low" || effort === "medium" || effort === "high" || effort === "xhigh" || effort === "max";
}
function convertResponsesMessages(model, context, allowedToolCallProviders, options) {
	const messages = [];
	const shouldReplayResponsesItemIds = options?.replayResponsesItemIds ?? true;
	const normalizeIdPart = (part) => {
		const sanitized = part.replace(/[^a-zA-Z0-9_-]/g, "_");
		return (sanitized.length > 64 ? sanitized.slice(0, 64) : sanitized).replace(/_+$/, "");
	};
	const buildForeignResponsesItemId = (itemId) => {
		const normalized = `fc_${shortHash(itemId)}`;
		return normalized.length > 64 ? normalized.slice(0, 64) : normalized;
	};
	const normalizeToolCallId = (id, targetModel, source) => {
		if (!allowedToolCallProviders.has(model.provider)) return normalizeIdPart(id);
		if (!id.includes("|")) return normalizeIdPart(id);
		const [callId, itemId = ""] = splitResponsesToolCallId(id);
		const normalizedCallId = normalizeIdPart(callId);
		let normalizedItemId = source.provider !== model.provider || source.api !== model.api ? buildForeignResponsesItemId(itemId) : normalizeIdPart(itemId);
		if (!normalizedItemId.startsWith("fc_")) normalizedItemId = normalizeIdPart(`fc_${normalizedItemId}`);
		return `${normalizedCallId}|${normalizedItemId}`;
	};
	const transformedMessages = transformMessages(context.messages, model, normalizeToolCallId);
	if ((options?.includeSystemPrompt ?? true) && context.systemPrompt) {
		const compat = model.compat;
		const role = model.reasoning && compat?.supportsDeveloperRole !== false ? "developer" : "system";
		messages.push({
			type: "message",
			role,
			content: [{
				type: "input_text",
				text: sanitizeSurrogates(stripSystemPromptCacheBoundary(context.systemPrompt))
			}]
		});
	}
	let msgIndex = 0;
	for (const msg of transformedMessages) {
		if (msg.role === "user") if (typeof msg.content === "string") messages.push({
			type: "message",
			role: "user",
			content: [{
				type: "input_text",
				text: sanitizeSurrogates(msg.content)
			}]
		});
		else {
			const content = msg.content.map((item) => {
				if (item.type === "text") return {
					type: "input_text",
					text: sanitizeSurrogates(item.text)
				};
				return {
					type: "input_image",
					detail: "auto",
					image_url: `data:${item.mimeType};base64,${item.data}`
				};
			});
			if (content.length === 0) continue;
			messages.push({
				type: "message",
				role: "user",
				content
			});
		}
		else if (msg.role === "assistant") {
			const output = [];
			let textFallbackOrdinal = 0;
			const assistantMsg = msg;
			let previousReplayItemWasReasoning = false;
			const isDifferentModel = assistantMsg.model !== model.id && assistantMsg.provider === model.provider && assistantMsg.api === model.api;
			for (const block of msg.content) if (block.type === "thinking") {
				if (block.thinkingSignature) {
					const reasoningItem = normalizeResponsesReasoningReplayItem({
						item: JSON.parse(block.thinkingSignature),
						replayResponsesItemIds: shouldReplayResponsesItemIds
					});
					output.push(reasoningItem);
					previousReplayItemWasReasoning = true;
				}
			} else if (block.type === "text") {
				const textBlock = block;
				const parsedSignature = parseTextSignature(textBlock.textSignature);
				let msgId = shouldReplayResponsesItemIds ? resolveReplayableResponsesMessageId({
					textSignatureId: parsedSignature?.id,
					fallbackId: `msg_${msgIndex}`,
					fallbackOrdinal: textFallbackOrdinal,
					previousReplayItemWasReasoning
				}) : void 0;
				if (!parsedSignature?.id) textFallbackOrdinal += 1;
				if (msgId && msgId.length > 64) msgId = `msg_${shortHash(msgId)}`;
				const messageItem = {
					type: "message",
					role: "assistant",
					content: [{
						type: "output_text",
						text: sanitizeSurrogates(textBlock.text),
						annotations: []
					}],
					status: "completed",
					...msgId ? { id: msgId } : {},
					phase: parsedSignature?.phase
				};
				output.push(messageItem);
				previousReplayItemWasReasoning = false;
			} else if (block.type === "toolCall") {
				const toolCall = block;
				const [callId, itemIdRaw] = splitResponsesToolCallId(toolCall.id);
				let itemId = shouldReplayResponsesItemIds ? itemIdRaw : void 0;
				if (shouldReplayResponsesItemIds && isDifferentModel && itemId?.startsWith("fc_")) itemId = void 0;
				output.push({
					type: "function_call",
					...itemId ? { id: itemId } : {},
					call_id: callId,
					name: toolCall.name,
					arguments: JSON.stringify(toolCall.arguments)
				});
				previousReplayItemWasReasoning = false;
			}
			if (output.length === 0) continue;
			messages.push(...output);
		} else if (msg.role === "toolResult") {
			const textResult = extractToolResultText(msg.content);
			const sanitizedTextResult = sanitizeSurrogates(textResult);
			const hasImages = msg.content.some(isImageWithMediaPayload);
			const mediaPlaceholder = describeToolResultMediaPlaceholder(msg.content);
			const hasText = sanitizedTextResult.trim().length > 0;
			const [callId] = splitResponsesToolCallId(msg.toolCallId);
			let output;
			if (hasImages && model.input.includes("image")) {
				const contentParts = [];
				if (hasText) contentParts.push({
					type: "input_text",
					text: sanitizedTextResult
				});
				else if (mediaPlaceholder === "(see attached media)") contentParts.push({
					type: "input_text",
					text: mediaPlaceholder
				});
				for (const block of msg.content) if (isImageWithMediaPayload(block)) contentParts.push({
					type: "input_image",
					detail: "auto",
					image_url: `data:${block.mimeType};base64,${block.data}`
				});
				output = contentParts;
			} else output = sanitizeToolResultText(textResult, mediaPlaceholder ?? EMPTY_TOOL_RESULT_TEXT);
			messages.push({
				type: "function_call_output",
				call_id: callId,
				output
			});
		}
		msgIndex++;
	}
	return messages;
}
function createResponsesAssistantOutput(model, api = model.api) {
	return {
		role: "assistant",
		content: [],
		api,
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
}
function applyResponsesServiceTierPricing(usage, serviceTier, model) {
	let multiplier = 1;
	if (serviceTier === "flex") multiplier = .5;
	else if (serviceTier === "priority") multiplier = model.id === "gpt-5.5" ? 2.5 : 2;
	if (multiplier === 1) return;
	usage.cost.input *= multiplier;
	usage.cost.output *= multiplier;
	usage.cost.cacheRead *= multiplier;
	usage.cost.cacheWrite *= multiplier;
	usage.cost.total = usage.cost.input + usage.cost.output + usage.cost.cacheRead + usage.cost.cacheWrite;
}
function resolveResponsesReasoningEffort(model, reasoning) {
	const clampedReasoning = reasoning ? clampThinkingLevel(model, reasoning) : void 0;
	if (!clampedReasoning || clampedReasoning === "off") return;
	if (clampedReasoning === "max") return supportsOpenAIReasoningEffort(model, "max") ? "max" : "xhigh";
	if (clampedReasoning === "minimal" && model.provider === "openai" && supportsOpenAIReasoningEffort(model, "max")) {
		const effort = resolveOpenAIReasoningEffortForModel({
			model,
			effort: "minimal"
		});
		return isResponsesReasoningEffort(effort) ? effort : void 0;
	}
	return clampedReasoning;
}
function applyCommonResponsesParams(params, model, context, options, config) {
	if (options?.maxTokens) params.max_output_tokens = Math.max(options.maxTokens, 16);
	if (options?.temperature !== void 0 && supportsOpenAITemperature(model)) params.temperature = options.temperature;
	if (context.tools) {
		const converted = convertResponsesToolPayload(context.tools, { model });
		if (converted.tools.length > 0) params.tools = converted.tools;
	}
	if (!model.reasoning) return;
	if (options?.reasoningEffort || options?.reasoningSummary) {
		params.reasoning = {
			effort: options?.reasoningEffort ? model.thinkingLevelMap?.[options.reasoningEffort] ?? options.reasoningEffort : "medium",
			summary: options?.reasoningSummary || "auto"
		};
		params.include = ["reasoning.encrypted_content"];
	} else if ((config?.setDefaultReasoningOff ?? true) && model.thinkingLevelMap?.off !== null) params.reasoning = { effort: model.thinkingLevelMap?.off ?? "none" };
}
function buildResponsesRequestOptions(options) {
	return {
		...options?.signal ? { signal: options.signal } : {},
		...options?.timeoutMs !== void 0 ? { timeout: options.timeoutMs } : {},
		maxRetries: options?.maxRetries ?? 0
	};
}
function cleanStreamingScratchBuffers(output) {
	for (const block of output.content) {
		delete block.index;
		delete block.partialJson;
	}
}
async function runResponsesStreamLifecycle(params) {
	const { stream, model, output, options } = params;
	let firstEventAbort;
	try {
		const client = params.createClient();
		let requestParams = params.buildParams();
		const nextParams = await options?.onPayload?.(requestParams, model);
		if (nextParams !== void 0) requestParams = nextParams;
		firstEventAbort = createFirstStreamEventAbortController(options?.signal);
		const { data: openaiStream, response } = await client.responses.create(requestParams, {
			...buildResponsesRequestOptions(options),
			signal: firstEventAbort.signal
		}).withResponse();
		await options?.onResponse?.({
			status: response.status,
			headers: headersToRecord(response.headers)
		}, model);
		stream.push({
			type: "start",
			partial: output
		});
		const firstEventTimeoutMs = getFirstStreamEventTimeoutMs(options);
		const onFirstEventTimeout = getFirstStreamEventTimeoutHandler(options);
		await processResponsesStream(openaiStream, output, stream, model, params.processStreamOptions || firstEventTimeoutMs !== void 0 || onFirstEventTimeout !== void 0 ? {
			...params.processStreamOptions,
			firstEventTimeoutMs: params.processStreamOptions?.firstEventTimeoutMs ?? firstEventTimeoutMs,
			abortFirstEventStream: params.processStreamOptions?.abortFirstEventStream ?? firstEventAbort.abort,
			onFirstEventTimeout: params.processStreamOptions?.onFirstEventTimeout ?? onFirstEventTimeout,
			signal: params.processStreamOptions?.signal ?? options?.signal
		} : void 0);
		if (options?.signal?.aborted) throw transportAbortError(options.signal);
		if (output.stopReason === "aborted" || output.stopReason === "error") throw new Error(output.errorMessage ?? "An unknown error occurred");
		stream.push({
			type: "done",
			reason: output.stopReason,
			message: output
		});
		stream.end();
	} catch (error) {
		cleanStreamingScratchBuffers(output);
		output.stopReason = options?.signal?.aborted ? "aborted" : "error";
		output.errorMessage = params.formatError(error);
		stream.push({
			type: "error",
			reason: output.stopReason,
			error: output
		});
		stream.end();
	} finally {
		firstEventAbort?.dispose();
	}
}
//#endregion
export { resolveResponsesReasoningEffort as a, createResponsesAssistantOutput as i, applyResponsesServiceTierPricing as n, runResponsesStreamLifecycle as o, convertResponsesMessages as r, convertResponsesToolPayload as s, applyCommonResponsesParams as t };
