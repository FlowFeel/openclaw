import { a as requiresClaudeMandatoryAdaptiveThinking, c as resolveClaudeMythos5ModelIdentity, d as resolveClaudeSonnet5ModelIdentity, g as supportsClaudeNativeXhighEffort, h as supportsClaudeNativeMaxEffort, i as requiresClaudeDefaultSampling, l as resolveClaudeNativeThinkingLevelMap, o as resolveClaudeFable5ModelIdentity, p as supportsClaudeAdaptiveThinking, s as resolveClaudeModelIdentity, u as resolveClaudeOpus5ModelIdentity } from "../anthropic-SrGtwsJu.mjs";
import { t as AssistantMessageDiagnostic } from "../diagnostics-BaTA9eVl.mjs";
import { E as Model, F as SimpleStreamOptions, I as StopReason, R as StreamFunction, X as Usage, u as Context } from "../types-CH7ReIcU.mjs";
import { n as AnthropicOptions, r as AnthropicThinkingDisplay, t as AnthropicEffort } from "../provider-options-C5kYML7i.mjs";
//#region packages/ai/src/providers/anthropic.d.ts
declare const streamAnthropic: StreamFunction<"anthropic-messages", AnthropicOptions>;
type AnthropicSimpleStreamOptions = SimpleStreamOptions & {
  toolChoice?: AnthropicOptions["toolChoice"];
};
declare const streamSimpleAnthropic: StreamFunction<"anthropic-messages", AnthropicSimpleStreamOptions>;
//#endregion
//#region packages/ai/src/providers/anthropic-auth-headers.d.ts
type AnthropicAuthModel = {
  provider?: string;
  authHeader?: boolean;
  headers?: Record<string, string>;
};
declare function usesFoundryBearerAuth(model: AnthropicAuthModel): boolean;
declare function omitFoundryBearerCredentialHeaders(headers?: Record<string, string>): Record<string, string> | undefined;
//#endregion
//#region packages/ai/src/providers/anthropic-model-contract.d.ts
declare const ANTHROPIC_CLAUDE_CODE_VERSION = "2.1.75";
declare const ANTHROPIC_CLAUDE_CODE_BILLING_SYSTEM_BLOCK = "x-anthropic-billing-header: cc_version=2.1.75; cc_entrypoint=sdk-cli;";
type ReplayModelRef = {
  provider?: string;
  api?: string;
  modelId?: string;
  responseModelId?: string;
  modelParams?: Record<string, unknown>;
};
declare function usesClaudeFable5MessagesContract(model: {
  id?: string;
  params?: Record<string, unknown>;
  api?: string;
}): boolean;
/** Return whether streamed output must wait for the terminal refusal decision. */
declare function usesClaudeStreamingRefusalContract(model: {
  id?: string;
  params?: Record<string, unknown>;
  api?: string;
}): boolean;
declare function requiresClaudeAdaptiveThinking(model: {
  id?: string;
  params?: Record<string, unknown>;
  api?: string;
}): boolean;
/** Return whether omitted thinking should default to adaptive/high. */
declare function defaultsClaudeAdaptiveThinking(model: {
  id?: string;
  params?: Record<string, unknown>;
  api?: string;
}): boolean;
/** Resolve provider-native effort once for direct and managed Claude requests. */
declare function resolveAnthropicThinkingEffort(model: Model<"anthropic-messages">, level: SimpleStreamOptions["reasoning"]): AnthropicEffort;
/** Normalize Anthropic and Anthropic-compatible terminal reasons identically. */
declare function mapAnthropicStopReason(reason: string | undefined): StopReason;
/** Remove unsupported assistant prefills while preserving completed tool-use turns. */
declare function prepareClaudeNoPrefillRequestContext(model: Model, context: Context): Context;
declare function applyClaudeRequestContract(params: Record<string, unknown>, model: {
  id?: string;
  params?: Record<string, unknown>;
  api?: string;
}): void;
declare function resolveModelBoundThinkingReplayMode(params: {
  source: ReplayModelRef;
  target: ReplayModelRef;
}): "default" | "preserve" | "drop";
//#endregion
//#region packages/ai/src/providers/anthropic-refusal.d.ts
type AnthropicRefusalOutput = {
  stopReason: string;
  errorMessage?: string;
  diagnostics?: AssistantMessageDiagnostic[];
};
declare function applyAnthropicRefusal(output: AnthropicRefusalOutput, stopDetails: unknown, provider: string): void;
//#endregion
//#region packages/ai/src/providers/anthropic-server-fallback.d.ts
/** Anthropic beta that re-serves safety refusals on an allowed fallback model. */
declare const ANTHROPIC_SERVER_SIDE_FALLBACK_BETA = "server-side-fallback-2026-07-01";
/** Let Anthropic select the recommended model for each refusal category. */
declare const ANTHROPIC_SERVER_SIDE_FALLBACKS: "default";
declare const CLAUDE_OPUS_FALLBACK_MODEL_COST: {
  readonly input: 5;
  readonly output: 25;
  readonly cacheRead: 0.5;
  readonly cacheWrite: 6.25;
};
type AnthropicFallbackBoundary = {
  fromModel: string | null;
  toModel: string | null;
};
/** Resolve billed rates from the serving model reported by Anthropic's fallback stream. */
declare function resolveAnthropicFallbackServingModelCost(params: {
  requestedModelId: string;
  servingModelId: string | null;
  requestedCost: Model["cost"];
}): Model["cost"];
/** Reads a `fallback` content block marking where one model's output gives way to the next. */
declare function readAnthropicFallbackBoundary(block: unknown): AnthropicFallbackBoundary | null;
/**
 * Drops pre-fallback thinking/tool calls while preserving the text prefix that
 * the serving model continued. Dropped tool calls must never execute or replay.
 */
declare function applyAnthropicFallbackBoundary(params: {
  output: {
    content: Array<{
      type: string;
    }>;
    responseModel?: string;
    diagnostics?: AssistantMessageDiagnostic[];
  };
  boundary: AnthropicFallbackBoundary;
  provider: string;
}): void;
//#endregion
//#region packages/ai/src/providers/anthropic-thinking-replay.d.ts
declare const ANTHROPIC_OMITTED_REASONING_TEXT = "[assistant reasoning omitted]";
/**
 * Anthropic tool results continue the preceding assistant turn. Preserve that
 * turn's signed thinking even when the next request disables new thinking.
 */
declare function findActiveAnthropicToolTurnAssistantIndex(messages: readonly unknown[]): number;
//#endregion
//#region packages/ai/src/providers/anthropic-tool-projection.d.ts
type AnthropicToolDescriptor = {
  readonly name: string;
  readonly description: string;
  readonly parameters: unknown;
};
type AnthropicProjectedTool = {
  readonly originalName: string;
  readonly wireName: string;
  readonly description?: string;
  readonly inputSchema: {
    readonly type: "object";
    readonly properties: Record<string, unknown>;
    readonly required: string[];
  };
};
type AnthropicToolProjection = {
  readonly inputToolCount: number;
  readonly unavailableOriginalNames: ReadonlySet<string>;
  readonly tools: readonly AnthropicProjectedTool[];
};
type AnthropicParallelToolChoice = {
  readonly disable_parallel_tool_use?: boolean;
};
type AnthropicProjectedToolChoice = ({
  readonly type: "auto";
} & AnthropicParallelToolChoice) | ({
  readonly type: "any";
} & AnthropicParallelToolChoice) | {
  readonly type: "none";
} | ({
  readonly type: "tool";
  readonly name: string;
} & AnthropicParallelToolChoice);
/** Preserve Claude Code's canonical tool casing for subscription OAuth requests. */
declare function toClaudeCodeToolName(name: string): string;
/** Anthropic rejects forced tools while extended thinking is enabled. */
declare function normalizeAnthropicToolChoice(thinkingEnabled: boolean, toolChoice: NonNullable<AnthropicOptions["toolChoice"]>): AnthropicProjectedToolChoice;
/** Anthropic tool identifiers accept only ASCII word characters and dashes. */
declare function normalizeAnthropicToolCallId(id: string): string;
/** Snapshots direct/custom tool descriptors before Anthropic payload construction. */
declare function projectAnthropicTools(tools: readonly AnthropicToolDescriptor[], toWireName: (name: string) => string): AnthropicToolProjection;
/** Keeps forced Anthropic tool choices aligned with the projected wire names. */
declare function reconcileAnthropicToolChoice(choice: AnthropicProjectedToolChoice, projection: AnthropicToolProjection): AnthropicProjectedToolChoice | undefined;
/** Maps Claude Code wire names without trusting every direct/custom descriptor. */
declare function resolveOriginalAnthropicToolName(name: string, projection: AnthropicToolProjection | undefined): string;
//#endregion
//#region packages/ai/src/providers/anthropic-usage.d.ts
type AnthropicUsagePayload = {
  input_tokens?: unknown;
  output_tokens?: unknown;
  cache_read_input_tokens?: unknown;
  cache_creation_input_tokens?: unknown;
  cache_creation?: unknown;
  iterations?: unknown;
};
type AnthropicCacheWriteUsage = {
  cacheWrite5m?: number;
  cacheWrite1h?: number;
};
type AnthropicPromptUsageSnapshot = {
  input: number;
  cacheRead: number;
  cacheWrite: number;
};
type AnthropicIterationUsageSnapshot = {
  contextPromptTokens: number;
  totalTokens: number;
};
type AnthropicIterationUsageResult = {
  state: "absent";
} | {
  state: "invalid";
} | {
  state: "valid";
  usage: AnthropicIterationUsageSnapshot;
};
declare function readAnthropicUsageTokenCount(value: unknown): number | undefined;
declare function readAnthropicCacheWriteUsage(usage: AnthropicUsagePayload): AnthropicCacheWriteUsage;
declare function readAnthropicPromptUsageSnapshot(usage: AnthropicUsagePayload): AnthropicPromptUsageSnapshot | undefined;
declare function readLastAnthropicIterationUsage(usage: AnthropicUsagePayload): AnthropicIterationUsageResult;
/** Record independent billing buckets without treating zero placeholders as context proof. */
declare function applyAnthropicMessageStartUsage(target: Usage, payload: AnthropicUsagePayload): AnthropicPromptUsageSnapshot | undefined;
/** Keep cumulative billing separate from the final server-side iteration context. */
declare function applyAnthropicMessageDeltaUsage(target: Usage, payload: AnthropicUsagePayload | undefined, messageStartPromptUsage: AnthropicPromptUsageSnapshot | undefined): void;
//#endregion
export { ANTHROPIC_CLAUDE_CODE_BILLING_SYSTEM_BLOCK, ANTHROPIC_CLAUDE_CODE_VERSION, ANTHROPIC_OMITTED_REASONING_TEXT, ANTHROPIC_SERVER_SIDE_FALLBACKS, ANTHROPIC_SERVER_SIDE_FALLBACK_BETA, AnthropicCacheWriteUsage, type AnthropicEffort, AnthropicFallbackBoundary, AnthropicIterationUsageResult, AnthropicIterationUsageSnapshot, type AnthropicOptions, AnthropicProjectedToolChoice, AnthropicPromptUsageSnapshot, type AnthropicThinkingDisplay, AnthropicToolProjection, CLAUDE_OPUS_FALLBACK_MODEL_COST, applyAnthropicFallbackBoundary, applyAnthropicMessageDeltaUsage, applyAnthropicMessageStartUsage, applyAnthropicRefusal, applyClaudeRequestContract, defaultsClaudeAdaptiveThinking, findActiveAnthropicToolTurnAssistantIndex, mapAnthropicStopReason, normalizeAnthropicToolCallId, normalizeAnthropicToolChoice, omitFoundryBearerCredentialHeaders, prepareClaudeNoPrefillRequestContext, projectAnthropicTools, readAnthropicCacheWriteUsage, readAnthropicFallbackBoundary, readAnthropicPromptUsageSnapshot, readAnthropicUsageTokenCount, readLastAnthropicIterationUsage, reconcileAnthropicToolChoice, requiresClaudeAdaptiveThinking, requiresClaudeDefaultSampling, requiresClaudeMandatoryAdaptiveThinking, resolveAnthropicFallbackServingModelCost, resolveAnthropicThinkingEffort, resolveClaudeFable5ModelIdentity, resolveClaudeModelIdentity, resolveClaudeMythos5ModelIdentity, resolveClaudeNativeThinkingLevelMap, resolveClaudeOpus5ModelIdentity, resolveClaudeSonnet5ModelIdentity, resolveModelBoundThinkingReplayMode, resolveOriginalAnthropicToolName, streamAnthropic, streamSimpleAnthropic, supportsClaudeAdaptiveThinking, supportsClaudeNativeMaxEffort, supportsClaudeNativeXhighEffort, toClaudeCodeToolName, usesClaudeFable5MessagesContract, usesClaudeStreamingRefusalContract, usesFoundryBearerAuth };