import { g as isDefaultAgentRuntimeId, v as normalizeOptionalAgentRuntimeId } from "./openai-routing-G4z6ipSe.js";
import { i as isCliRuntimeAliasForProvider } from "./model-runtime-aliases-DphvzCQU.js";
//#region src/agents/session-runtime-compat.ts
/** Resolves the persisted runtime id, preserving locked transcript ownership. */
function resolvePersistedSessionRuntimeId(entry) {
	const harnessRuntime = normalizeOptionalAgentRuntimeId(entry?.agentHarnessId);
	if (entry?.modelSelectionLocked === true && harnessRuntime && !isDefaultAgentRuntimeId(harnessRuntime)) return harnessRuntime;
	const runtimeOverride = normalizeOptionalAgentRuntimeId(entry?.agentRuntimeOverride);
	if (runtimeOverride && !isDefaultAgentRuntimeId(runtimeOverride)) return runtimeOverride;
	return harnessRuntime;
}
/** Resolves a runtime id only when it can serve the selected provider. */
function resolveCompatibleAgentRuntimeForProvider(params) {
	const runtime = normalizeOptionalAgentRuntimeId(params.runtime);
	if (!runtime || isDefaultAgentRuntimeId(runtime)) return;
	if (runtime === "openclaw") return runtime;
	const provider = params.provider?.trim().toLowerCase() ?? "";
	if (runtime === "codex" && (provider === "codex" || provider === "openai")) return runtime;
	return isCliRuntimeAliasForProvider({
		provider,
		runtime,
		cfg: params.cfg
	}) ? runtime : void 0;
}
/** Resolves a persisted runtime override only when it can serve the selected provider. */
function resolveSessionRuntimeOverrideForProvider(params) {
	const lockedHarness = normalizeOptionalAgentRuntimeId(params.entry?.agentHarnessId);
	if (params.entry?.modelSelectionLocked === true && lockedHarness && !isDefaultAgentRuntimeId(lockedHarness)) return lockedHarness;
	return resolveCompatibleAgentRuntimeForProvider({
		provider: params.provider,
		runtime: params.entry?.agentRuntimeOverride,
		cfg: params.cfg
	});
}
//#endregion
export { resolvePersistedSessionRuntimeId as n, resolveSessionRuntimeOverrideForProvider as r, resolveCompatibleAgentRuntimeForProvider as t };
