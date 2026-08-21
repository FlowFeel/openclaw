import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import "./agent-harness-runtime-9ey5acpS.js";
//#region extensions/codex/src/app-server/local-runtime-attribution.ts
const OPENAI_PROVIDER_ID = "openai";
const OPENAI_RESPONSES_API = "openai-responses";
const OPENAI_CODEX_RESPONSES_API = "openai-chatgpt-responses";
function normalizeRuntimeId(value) {
	return value?.trim().toLowerCase() ?? "";
}
/** Maps local Codex runtime plans onto the provider/api pair exposed to event projection. */
function resolveCodexLocalRuntimeAttribution(params) {
	const authProfileProvider = normalizeRuntimeId(params.runtimePlan?.auth?.authProfileProviderForAuth);
	if (normalizeRuntimeId(params.runtimePlan?.observability.harnessId) === "codex" && authProfileProvider !== OPENAI_PROVIDER_ID && normalizeRuntimeId(params.model.provider) === OPENAI_PROVIDER_ID && normalizeRuntimeId(params.model.api) === OPENAI_RESPONSES_API) return {
		provider: OPENAI_PROVIDER_ID,
		api: OPENAI_CODEX_RESPONSES_API
	};
	return {
		provider: params.provider,
		api: params.model.api
	};
}
//#endregion
//#region extensions/codex/src/app-server/event-projector-assistant-message.ts
const ZERO_USAGE = {
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
};
function createAssistantMessage(params, text, options) {
	const attribution = resolveCodexLocalRuntimeAttribution(params);
	const usage = options.tokenUsage ? {
		input: options.tokenUsage.input ?? 0,
		output: options.tokenUsage.output ?? 0,
		cacheRead: options.tokenUsage.cacheRead ?? 0,
		cacheWrite: options.tokenUsage.cacheWrite ?? 0,
		...options.tokenUsage.contextUsage ? { contextUsage: options.tokenUsage.contextUsage } : {},
		totalTokens: options.tokenUsage.total ?? (options.tokenUsage.input ?? 0) + (options.tokenUsage.output ?? 0) + (options.tokenUsage.cacheRead ?? 0) + (options.tokenUsage.cacheWrite ?? 0),
		cost: ZERO_USAGE.cost
	} : ZERO_USAGE;
	return {
		role: "assistant",
		content: [{
			type: "text",
			text
		}],
		api: attribution.api ?? "openai-chatgpt-responses",
		provider: attribution.provider,
		model: params.modelId,
		usage,
		stopReason: options.aborted ? "aborted" : options.promptError ? "error" : "stop",
		errorMessage: options.promptError ? formatErrorMessage(options.promptError) : void 0,
		timestamp: Date.now()
	};
}
function createAssistantCommentaryMessage(params, text, itemId, timestamp) {
	const attribution = resolveCodexLocalRuntimeAttribution(params);
	return {
		role: "assistant",
		content: [{
			type: "text",
			text
		}],
		api: attribution.api ?? "openai-chatgpt-responses",
		provider: attribution.provider,
		model: params.modelId,
		usage: ZERO_USAGE,
		stopReason: "stop",
		timestamp,
		openclawStreamFallback: {
			replacementText: text,
			source: "segment",
			itemId
		}
	};
}
function createAssistantMirrorMessage(params, title, text) {
	const attribution = resolveCodexLocalRuntimeAttribution(params);
	return {
		role: "assistant",
		content: [{
			type: "text",
			text: `${title}:\n${text}`
		}],
		api: attribution.api ?? "openai-chatgpt-responses",
		provider: attribution.provider,
		model: params.modelId,
		usage: ZERO_USAGE,
		stopReason: "stop",
		timestamp: Date.now()
	};
}
//#endregion
export { resolveCodexLocalRuntimeAttribution as i, createAssistantMessage as n, createAssistantMirrorMessage as r, createAssistantCommentaryMessage as t };
