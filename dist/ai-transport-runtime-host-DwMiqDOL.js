import { n as resolveProviderEndpoint, r as resolveProviderRequestCapabilities } from "./provider-attribution-D6GRQEFS.js";
import { f as resolveProviderRequestPolicyConfig, o as getModelProviderRequestTransport, r as attachModelProviderRequestTransport, s as inheritModelProviderMetadataOwners } from "./provider-request-config-DZemMjbU.js";
import { r as loadBundledPluginPublicSurfaceModuleSync } from "./facade-runtime-aiGYP9iC.js";
import { f as wrapProviderSimpleCompletionStreamFn } from "./provider-hook-runtime-YtpQDbub.js";
import { A as resolveProviderStreamFn, F as resolveProviderTransportTurnStateWithPlugin } from "./provider-runtime-pe0BhJuO.js";
import "./ai-transport-host-D91RWGkz.js";
import { o as getModelProviderLocalService, t as attachModelProviderLocalService } from "./provider-local-service-BjaQaEzf.js";
import { t as event_stream_exports } from "./event-stream-MHM-_qcK.js";
import { c as hasCopilotVisionInput, o as buildCopilotDynamicHeaders } from "./copilot-dynamic-headers-C42FH9jo.js";
import { r as buildStreamErrorAssistantMessage } from "./stream-message-shared-Cyrn1UHN.js";
import { c as sanitizeGoogleThinkingPayload, t as streamWithPayloadPatch } from "./stream-payload-utils-BcOTedPh.js";
import { n as repairToolUseResultPairing } from "./repair-h5r9ZjXr.js";
import { configureAiTransportHost, getAiTransportHost } from "@openclaw/ai";
import { clampThinkingLevel } from "@openclaw/ai/internal/runtime";
import { resolveModelBoundThinkingReplayMode } from "@openclaw/ai/internal/anthropic";
//#region src/agents/anthropic-vertex-stream.ts
/**
* Anthropic Vertex stream facade.
* Keeps Vertex-specific provider implementation in the bundled provider plugin
* while core imports a small stable factory.
*/
function loadAnthropicVertexStreamFacade() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "anthropic-vertex",
		artifactBasename: "api.js"
	});
}
/** Creates an Anthropic Vertex stream function through the bundled provider facade. */
function createAnthropicVertexStreamFnForModel(model, env = process.env) {
	return loadAnthropicVertexStreamFacade().createAnthropicVertexStreamFnForModel(model, env);
}
//#endregion
//#region src/agents/custom-api-registry.ts
const CUSTOM_API_SOURCE_PREFIX = "openclaw-custom-api:";
/** Returns the registry source id used for a custom API stream function. */
function getCustomApiRegistrySourceId(api) {
	return `${CUSTOM_API_SOURCE_PREFIX}${api}`;
}
function adaptCustomStream(model, stream) {
	if (!(stream instanceof Promise)) return stream;
	const adapted = (0, event_stream_exports.createAssistantMessageEventStream)();
	(async () => {
		try {
			const resolved = await stream;
			for await (const event of resolved) adapted.push(event);
			adapted.end(await resolved.result());
		} catch (error) {
			const message = buildStreamErrorAssistantMessage({
				model,
				errorMessage: error instanceof Error ? error.message : String(error)
			});
			adapted.push({
				type: "error",
				reason: "error",
				error: message
			});
		}
	})();
	return adapted;
}
/** Registers a custom API stream function when no provider already owns it. */
function ensureCustomApiRegistered(registry, api, streamFn) {
	if (registry.getApiProvider(api)) return false;
	registry.registerApiProvider({
		api,
		stream: (model, context, options) => adaptCustomStream(model, streamFn(model, context, options)),
		streamSimple: (model, context, options) => adaptCustomStream(model, streamFn(model, context, options))
	}, getCustomApiRegistrySourceId(api));
	return true;
}
//#endregion
//#region src/agents/google-simple-completion-stream.ts
/**
* Google simple-completion stream adapter.
*
* This registers a patched Google stream API that keeps the normal Google
* backend but sanitizes unsupported thinking payload options for simple models.
*/
/** Custom API id for the Google simple-completion stream adapter. */
const GOOGLE_SIMPLE_COMPLETION_API = "openclaw-google-generative-ai-simple";
const SOURCE_API = "google-generative-ai";
function resolveGoogleSimpleThinkingLevel(model, reasoning) {
	switch (reasoning) {
		case "adaptive": return reasoning;
		case "off":
		case "minimal":
		case "low":
		case "medium":
		case "high":
		case "max":
		case "xhigh": return clampThinkingLevel(model, reasoning);
		default: return;
	}
}
function buildGoogleSimpleCompletionStreamFn(registry) {
	return (model, context, options) => {
		const googleModel = {
			...model,
			api: SOURCE_API
		};
		const sourceProvider = registry.getApiProvider(SOURCE_API);
		if (!sourceProvider) throw new Error(`No API provider registered for api: ${SOURCE_API}`);
		return streamWithPayloadPatch(sourceProvider.streamSimple, googleModel, context, options, (payload) => {
			sanitizeGoogleThinkingPayload({
				payload,
				modelId: model.id,
				thinkingLevel: resolveGoogleSimpleThinkingLevel(googleModel, options?.reasoning)
			});
		});
	};
}
/** Rewrites Google generative-ai models to the simple-completion adapter when needed. */
function prepareGoogleSimpleCompletionModel(registry, model) {
	if (model.api !== SOURCE_API) return model;
	ensureCustomApiRegistered(registry, GOOGLE_SIMPLE_COMPLETION_API, buildGoogleSimpleCompletionStreamFn(registry));
	return {
		...model,
		api: GOOGLE_SIMPLE_COMPLETION_API
	};
}
//#endregion
//#region src/agents/replay-turn-classification.ts
/** Returns true when an assistant turn contains only provider reasoning and blank text. */
function hasOnlyAssistantReasoningContent(message) {
	if (message.role !== "assistant") return false;
	const content = Array.isArray(message.content) ? message.content : message.content != null && typeof message.content === "object" ? [message.content] : [];
	let hasThinking = false;
	for (const block of content) {
		if (!block || typeof block !== "object") return false;
		const record = block;
		if (record.type === "thinking" || record.type === "redacted_thinking") {
			hasThinking = true;
			continue;
		}
		if (record.type === "text" && typeof record.text === "string" && !record.text.trim()) continue;
		return false;
	}
	return hasThinking;
}
/** Returns true when a token-limited turn contains only incomplete provider reasoning. */
function isReasoningOnlyLengthAssistantTurn(message) {
	return message.stopReason === "length" && hasOnlyAssistantReasoningContent(message);
}
//#endregion
//#region src/agents/transport-message-transform.ts
const SYNTHETIC_TOOL_RESULT_APIS = /* @__PURE__ */ new Set([
	"anthropic-messages",
	"openclaw-anthropic-messages-transport",
	"bedrock-converse-stream",
	"google-generative-ai",
	"openclaw-google-generative-ai-transport",
	"openai-responses",
	"openai-chatgpt-responses",
	"azure-openai-responses",
	"openclaw-openai-responses-transport",
	"openclaw-openai-chatgpt-responses-transport",
	"openclaw-azure-openai-responses-transport"
]);
const OPENAI_RESPONSES_ABORTED_OUTPUT_APIS = /* @__PURE__ */ new Set([
	"openai-responses",
	"openai-chatgpt-responses",
	"azure-openai-responses",
	"openclaw-openai-responses-transport",
	"openclaw-openai-chatgpt-responses-transport",
	"openclaw-azure-openai-responses-transport"
]);
function defaultAllowSyntheticToolResults(modelApi) {
	return SYNTHETIC_TOOL_RESULT_APIS.has(modelApi);
}
function isFailedAssistantTurn(message) {
	if (message.role !== "assistant") return false;
	return message.stopReason === "error" || message.stopReason === "aborted" || isReasoningOnlyLengthAssistantTurn(message);
}
function failedAssistantHasToolCalls(message) {
	return message.role === "assistant" && (message.stopReason === "error" || message.stopReason === "aborted") && Array.isArray(message.content) && message.content.some((block) => block.type === "toolCall");
}
/** Transforms transcript messages into a provider-safe replay context. */
function transformTransportMessages(messages, model, normalizeToolCallId, options) {
	const allowSyntheticToolResults = defaultAllowSyntheticToolResults(model.api);
	const syntheticToolResultText = OPENAI_RESPONSES_ABORTED_OUTPUT_APIS.has(model.api) ? "aborted" : "No result provided";
	const toolCallIdMap = /* @__PURE__ */ new Map();
	const replayable = messages.map((msg) => {
		if (msg.role === "user") return msg;
		if (msg.role === "toolResult") {
			const normalizedId = toolCallIdMap.get(msg.toolCallId);
			return normalizedId && normalizedId !== msg.toolCallId ? {
				...msg,
				toolCallId: normalizedId
			} : msg;
		}
		if (msg.role !== "assistant") return msg;
		const modelBoundThinkingReplayMode = resolveModelBoundThinkingReplayMode({
			source: {
				provider: msg.provider,
				api: msg.api,
				modelId: msg.model,
				responseModelId: msg.responseModel
			},
			target: {
				provider: model.provider,
				api: model.api,
				modelId: model.id,
				modelParams: model.params
			}
		});
		const isSameModel = modelBoundThinkingReplayMode === "preserve" || msg.provider === model.provider && msg.api === model.api && msg.model === model.id;
		const sourceContent = Array.isArray(msg.content) ? msg.content : msg.content != null && typeof msg.content === "object" ? [msg.content] : [];
		const content = [];
		for (const block of sourceContent) {
			if (block.type === "thinking") {
				if (modelBoundThinkingReplayMode === "drop") continue;
				if (block.redacted) {
					if (isSameModel) content.push(block);
					continue;
				}
				if (isSameModel && block.thinkingSignature) {
					content.push(block);
					continue;
				}
				if (!block.thinking.trim()) continue;
				content.push(isSameModel ? block : {
					type: "text",
					text: block.thinking
				});
				continue;
			}
			if (block.type === "text") {
				content.push(isSameModel ? block : {
					type: "text",
					text: block.text
				});
				continue;
			}
			if (block.type !== "toolCall") {
				content.push(block);
				continue;
			}
			let normalizedToolCall = block;
			if (!isSameModel && block.thoughtSignature && options?.preserveCrossModelToolCallThoughtSignature !== true) {
				normalizedToolCall = { ...normalizedToolCall };
				delete normalizedToolCall.thoughtSignature;
			}
			if ((!isSameModel || options?.normalizeSameModelToolCallIds === true) && normalizeToolCallId) {
				const normalizedId = normalizeToolCallId(block.id, model, msg);
				if (normalizedId !== block.id) {
					toolCallIdMap.set(block.id, normalizedId);
					normalizedToolCall = {
						...normalizedToolCall,
						id: normalizedId
					};
				}
			}
			content.push(normalizedToolCall);
		}
		return {
			...msg,
			content
		};
	}).filter((_, index) => {
		const original = messages[index];
		if (!original) return true;
		return allowSyntheticToolResults ? !isFailedAssistantTurn(original) || failedAssistantHasToolCalls(original) : !isFailedAssistantTurn(original);
	});
	if (!allowSyntheticToolResults) return replayable;
	return repairToolUseResultPairing(replayable, {
		erroredAssistantResultPolicy: "drop",
		missingToolResultText: syntheticToolResultText
	}).messages;
}
//#endregion
//#region src/agents/ai-transport-runtime-host.ts
let configured = false;
/** Installs the agent and plugin ports only on paths that execute provider runtime. */
function configureAiTransportRuntimeHost() {
	if (configured) return;
	const host = getAiTransportHost();
	configureAiTransportHost({
		...host,
		plugin: {
			...host.plugin,
			resolveProviderStream: (params) => resolveProviderStreamFn({
				...params,
				config: params.config,
				context: {
					...params.context,
					config: params.context.config,
					model: params.context.model
				}
			}),
			resolveTransportTurnState: (params) => resolveProviderTransportTurnStateWithPlugin({
				...params,
				config: params.config,
				context: {
					...params.context,
					model: params.context.model
				}
			}),
			wrapSimpleCompletionStream: (params) => wrapProviderSimpleCompletionStreamFn({
				...params,
				config: params.config,
				context: {
					...params.context,
					config: params.context.config,
					model: params.context.model
				}
			}),
			createAnthropicVertexStream: createAnthropicVertexStreamFnForModel
		},
		buildCopilotDynamicHeaders: (messages) => buildCopilotDynamicHeaders({
			messages,
			hasImages: hasCopilotVisionInput(messages)
		}),
		resolveProviderEndpointClass: (baseUrl) => resolveProviderEndpoint(baseUrl).endpointClass,
		resolveProviderRequestCapabilities: (input) => resolveProviderRequestCapabilities(input),
		resolveProviderRequestHeaders: (input) => resolveProviderRequestPolicyConfig({
			...input,
			capability: "llm",
			transport: "stream"
		}).headers,
		requiresManagedTransport: (model) => {
			const request = getModelProviderRequestTransport(model);
			return Boolean(request?.proxy || request?.tls || getModelProviderLocalService(model));
		},
		inheritManagedTransport: (source, target) => inheritModelProviderMetadataOwners(source, attachModelProviderLocalService(attachModelProviderRequestTransport(target, getModelProviderRequestTransport(source)), getModelProviderLocalService(source))),
		transformTransportMessages,
		registerCustomApi: ensureCustomApiRegistered,
		prepareGoogleSimpleCompletionModel
	});
	configured = true;
}
configureAiTransportRuntimeHost();
//#endregion
export { ensureCustomApiRegistered as a, isReasoningOnlyLengthAssistantTurn as i, transformTransportMessages as n, createAnthropicVertexStreamFnForModel as o, hasOnlyAssistantReasoningContent as r, configureAiTransportRuntimeHost as t };
