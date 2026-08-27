import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { w as resolveDefaultModelForAgent } from "./codex-route-model-ref-B7v0y8up.js";
import { i as resolveAllowedModelRef } from "./model-selection-4mvNeCA1.js";
import { a as resolveEffectiveAgentRuntime } from "./thinking-runtime-93ZQ8Ibj.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import "./agent-runtime-CVIwE66V.js";
import "./command-auth-native-DJj9Kwam.js";
import { s as listSessionCatalogEntries } from "./session-catalog-BNXEx0co.js";
import { n as CLAUDE_CLI_BACKEND_ID, s as CLAUDE_CLI_ROUTE_PROBE_MODEL_IDS } from "./cli-constants-BoJ2vZl0.js";
import { r as adoptedSourceKey, t as CLAUDE_LOCAL_SESSION_HOST_ID } from "./session-catalog-adoption-C3d_naEs.js";
//#region extensions/anthropic/session-catalog-runtime.ts
function currentClaudeSessionCatalogConfig(api) {
	return api.runtime.config?.current?.() ?? api.config ?? {};
}
function boundClaudeSource(pluginId, entry) {
	const anthropic = isRecord(entry.pluginExtensions) ? entry.pluginExtensions.anthropic : void 0;
	const marker = isRecord(anthropic) ? anthropic.sessionCatalog : void 0;
	const hostId = isRecord(marker) && typeof marker.sourceHostId === "string" ? marker.sourceHostId : entry.execHost === "node" && typeof entry.execNode === "string" && entry.execNode.trim() ? `node:${entry.execNode.trim()}` : CLAUDE_LOCAL_SESSION_HOST_ID;
	const binding = (isRecord(entry.cliSessionBindings) ? entry.cliSessionBindings : void 0)?.[CLAUDE_CLI_BACKEND_ID];
	if (isRecord(binding) && typeof binding.sessionId === "string" && binding.sessionId) return {
		hostId,
		threadId: binding.sessionId
	};
	if (entry.pluginOwnerId !== pluginId || entry.modelSelectionLocked !== true) return;
	return isRecord(marker) && typeof marker.sourceThreadId === "string" ? {
		hostId,
		threadId: marker.sourceThreadId
	} : void 0;
}
function listBoundClaudeSessions(api, sessionEntries) {
	const config = currentClaudeSessionCatalogConfig(api);
	const bound = /* @__PURE__ */ new Map();
	for (const { sessionKey, entry } of listSessionCatalogEntries({
		config,
		runtime: api.runtime,
		sessionEntries
	})) {
		const source = boundClaudeSource(api.id, entry);
		if (source) bound.set(adoptedSourceKey(source.hostId, source.threadId), sessionKey);
	}
	return bound;
}
/**
* Resolve the Claude model an agent actually routes to the Claude CLI backend.
* Callers must not assume the current default is routed: existing configs pin
* older Claude models, and stamping the default onto their sessions would
* select a model the operator never routed or allowed.
*/
function resolveClaudeCliRoutedModelId(config, agentId) {
	return CLAUDE_CLI_ROUTE_PROBE_MODEL_IDS.find((modelId) => resolveEffectiveAgentRuntime({
		cfg: config,
		provider: "anthropic",
		modelId,
		agentId
	}) === CLAUDE_CLI_BACKEND_ID);
}
function resolveClaudeCatalogCreateSession(api, requestedAgentId) {
	const config = currentClaudeSessionCatalogConfig(api);
	const agentId = requestedAgentId ?? resolveDefaultAgentId(config);
	const routedModelId = resolveClaudeCliRoutedModelId(config, agentId);
	if (!routedModelId) return;
	const routedModelRef = `anthropic/${routedModelId}`;
	const defaultModel = resolveDefaultModelForAgent({
		cfg: config,
		agentId
	});
	return "error" in resolveAllowedModelRef({
		cfg: config,
		catalog: [],
		raw: routedModelRef,
		defaultProvider: defaultModel.provider,
		defaultModel: defaultModel.model,
		agentId
	}) ? void 0 : {
		model: routedModelRef,
		agentRuntime: CLAUDE_CLI_BACKEND_ID
	};
}
//#endregion
export { resolveClaudeCliRoutedModelId as i, listBoundClaudeSessions as n, resolveClaudeCatalogCreateSession as r, currentClaudeSessionCatalogConfig as t };
