import { CompleteSimpleFn, StreamFn } from "@openclaw/llm-core";

//#region packages/agent-core/src/runtime-deps.d.ts
/** Runtime functions injected by host packages so agent-core stays provider-agnostic. */
interface AgentCoreRuntimeDeps {
  /** Streaming completion implementation used for normal agent turns. */
  streamSimple: StreamFn;
  /** Non-streaming completion implementation used by summarization helpers. */
  completeSimple: CompleteSimpleFn;
}
/** Runtime dependency subset required by streaming agent loops. */
type AgentCoreStreamRuntimeDeps = Pick<AgentCoreRuntimeDeps, "streamSimple">;
/** Runtime dependency subset required by summarization helpers. */
type AgentCoreCompletionRuntimeDeps = Pick<AgentCoreRuntimeDeps, "completeSimple">;
/** Resolve the stream function, preferring an explicit override over injected runtime deps. */
declare function resolveAgentCoreStreamFn(runtime: AgentCoreStreamRuntimeDeps | undefined, streamFn?: StreamFn): StreamFn;
/** Resolve the completion function used by non-streaming helper flows. */
declare function resolveAgentCoreCompleteFn(runtime: AgentCoreCompletionRuntimeDeps | undefined): CompleteSimpleFn;
//#endregion
export { AgentCoreCompletionRuntimeDeps, AgentCoreRuntimeDeps, AgentCoreStreamRuntimeDeps, resolveAgentCoreCompleteFn, resolveAgentCoreStreamFn };