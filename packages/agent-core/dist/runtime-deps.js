//#region packages/agent-core/src/runtime-deps.ts
function missingRuntimeDep(name) {
	return /* @__PURE__ */ new Error(`@openclaw/agent-core runtime dependency "${name}" is not configured. Pass an AgentCoreRuntimeDeps instance or a streamFn explicitly.`);
}
/** Resolve the stream function, preferring an explicit override over injected runtime deps. */
function resolveAgentCoreStreamFn(runtime, streamFn) {
	if (streamFn) return streamFn;
	if (runtime?.streamSimple) return runtime.streamSimple;
	throw missingRuntimeDep("streamSimple");
}
/** Resolve the completion function used by non-streaming helper flows. */
function resolveAgentCoreCompleteFn(runtime) {
	if (runtime?.completeSimple) return runtime.completeSimple;
	throw missingRuntimeDep("completeSimple");
}
//#endregion
export { resolveAgentCoreCompleteFn, resolveAgentCoreStreamFn };
