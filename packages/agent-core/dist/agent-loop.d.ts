import { AgentCoreStreamRuntimeDeps } from "./runtime-deps.js";
import { AgentContext, AgentEvent, AgentLoopConfig, AgentMessage, StreamFn as StreamFn$1 } from "./types.js";
import { EventStream } from "@openclaw/llm-core";

//#region packages/agent-core/src/agent-loop.d.ts
/** Callback used by synchronous loop runners to publish agent lifecycle events. */
type AgentEventSink = (event: AgentEvent) => Promise<void> | void;
/**
 * Start an agent loop with a new prompt message.
 * The prompt is added to the context and events are emitted for it.
 */
declare function agentLoop(prompts: AgentMessage[], context: AgentContext, config: AgentLoopConfig, signal?: AbortSignal, streamFn?: StreamFn$1, runtime?: AgentCoreStreamRuntimeDeps): EventStream<AgentEvent, AgentMessage[]>;
/**
 * Continue an agent loop from the current context without adding a new message.
 * Used for retries - context already has user message or tool results.
 *
 * **Important:** The last message in context must convert to a `user` or `toolResult` message
 * via `convertToLlm`. If it doesn't, the LLM provider will reject the request.
 * This cannot be validated here since `convertToLlm` is only called once per turn.
 */
declare function agentLoopContinue(context: AgentContext, config: AgentLoopConfig, signal?: AbortSignal, streamFn?: StreamFn$1, runtime?: AgentCoreStreamRuntimeDeps): EventStream<AgentEvent, AgentMessage[]>;
/** Run a prompt-started loop and emit events through a caller-owned sink. */
declare function runAgentLoop(prompts: AgentMessage[], context: AgentContext, config: AgentLoopConfig, emit: AgentEventSink, signal?: AbortSignal, streamFn?: StreamFn$1, runtime?: AgentCoreStreamRuntimeDeps): Promise<AgentMessage[]>;
/** Continue an existing loop context and emit only newly produced messages. */
declare function runAgentLoopContinue(context: AgentContext, config: AgentLoopConfig, emit: AgentEventSink, signal?: AbortSignal, streamFn?: StreamFn$1, runtime?: AgentCoreStreamRuntimeDeps): Promise<AgentMessage[]>;
//#endregion
export { AgentEventSink, agentLoop, agentLoopContinue, runAgentLoop, runAgentLoopContinue };