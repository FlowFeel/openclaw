import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import "./provider-model-shared-D9A9VaW7.js";
import "./provider-catalog-shared-BFBHaHNZ.js";
import { c as buildProviderStreamFamilyHooks } from "./provider-stream-D3LutjYS.js";
import "./provider-stream-family-3-SAZ5iJ.js";
import { t as createOpenAINativeWebSearchWrapper } from "./native-web-search-Bv7TDKS2.js";
import { t as buildOpenAIReplayPolicy } from "./replay-policy-JEpwmvIo.js";
import { n as resolveOpenAIWebSocketSessionPolicy, t as resolveOpenAITransportTurnState } from "./transport-policy-DGLOJqrU.js";
//#region extensions/openai/shared.ts
const OPENAI_API_BASE_URL = "https://api.openai.com/v1";
const OPENAI_DEFAULT_RUNTIME_CONTEXT_TOKENS = 272e3;
function resolveConfiguredOpenAIBaseUrl(cfg) {
	return normalizeOptionalString(cfg?.models?.providers?.openai?.baseUrl) ?? OPENAI_API_BASE_URL;
}
function hasSupportedOpenAIResponsesTransport(transport) {
	return transport === "auto" || transport === "sse" || transport === "websocket";
}
function defaultOpenAIResponsesExtraParams(extraParams, options) {
	const hasSupportedTransport = hasSupportedOpenAIResponsesTransport(extraParams?.transport);
	const defaultTransport = options?.transport ?? "auto";
	if (hasSupportedTransport) return extraParams;
	return {
		...extraParams,
		transport: defaultTransport
	};
}
const resolveOpenAIResponsesTransportTurnState = (ctx) => resolveOpenAITransportTurnState(ctx);
const resolveOpenAIResponsesWebSocketSessionPolicy = (ctx) => resolveOpenAIWebSocketSessionPolicy(ctx);
const openAIResponsesStreamHooks = buildProviderStreamFamilyHooks("openai-responses-defaults");
const wrapOpenAIResponsesStreamFn = openAIResponsesStreamHooks.wrapStreamFn;
const wrapOpenAIResponsesProviderStreamFn = (ctx) => createOpenAINativeWebSearchWrapper(wrapOpenAIResponsesStreamFn?.(ctx) ?? ctx.streamFn, {
	config: ctx.config,
	agentId: ctx.agentId,
	nativeWebSearchAllowedByToolPolicy: ctx.nativeWebSearchAllowedByToolPolicy
});
function buildOpenAIResponsesProviderHooks(options) {
	return {
		buildReplayPolicy: buildOpenAIReplayPolicy,
		prepareExtraParams: (ctx) => defaultOpenAIResponsesExtraParams(ctx.extraParams, options),
		...openAIResponsesStreamHooks,
		wrapStreamFn: wrapOpenAIResponsesProviderStreamFn,
		resolveTransportTurnState: resolveOpenAIResponsesTransportTurnState,
		resolveWebSocketSessionPolicy: resolveOpenAIResponsesWebSocketSessionPolicy
	};
}
function buildOpenAISyntheticCatalogEntry(template, entry) {
	if (!template) return;
	return {
		...template,
		id: entry.id,
		name: entry.id,
		reasoning: entry.reasoning,
		input: [...entry.input],
		contextWindow: entry.contextWindow,
		...entry.contextTokens === void 0 ? {} : { contextTokens: entry.contextTokens },
		...entry.cost === void 0 ? {} : { cost: entry.cost }
	};
}
//#endregion
export { resolveConfiguredOpenAIBaseUrl as i, buildOpenAIResponsesProviderHooks as n, buildOpenAISyntheticCatalogEntry as r, OPENAI_DEFAULT_RUNTIME_CONTEXT_TOKENS as t };
