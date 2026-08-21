import { g as isDefaultAgentRuntimeId, h as OPENCLAW_AGENT_RUNTIME_ID } from "./openai-routing-G4z6ipSe.js";
import { n as resolveSessionModelRef } from "./session-model-ref-D6sDGDAK.js";
import { n as resolvePersistedSessionRuntimeId } from "./session-runtime-compat-C7DAZITa.js";
import { a as resolveEffectiveAgentRuntime } from "./thinking-runtime-1FRCPyWR.js";
//#region src/gateway/worker-environments/placement-session-runtime.ts
function resolveWorkerPlacementSessionRuntime(params) {
	const persistedRuntime = resolvePersistedSessionRuntimeId(params.entry);
	if (persistedRuntime && !isDefaultAgentRuntimeId(persistedRuntime)) return persistedRuntime;
	const selectedModel = resolveSessionModelRef(params.cfg, params.entry, params.agentId);
	return resolveEffectiveAgentRuntime({
		cfg: params.cfg,
		provider: selectedModel.provider,
		modelId: selectedModel.model,
		agentId: params.agentId,
		sessionKey: params.sessionKey
	});
}
function isWorkerPlacementSessionRuntimeSupported(runtime) {
	return runtime === OPENCLAW_AGENT_RUNTIME_ID;
}
//#endregion
export { resolveWorkerPlacementSessionRuntime as n, isWorkerPlacementSessionRuntimeSupported as t };
