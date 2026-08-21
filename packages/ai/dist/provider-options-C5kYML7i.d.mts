import { z as StreamOptions } from "./types-CH7ReIcU.mjs";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { ResponseCreateParamsStreaming } from "openai/resources/responses/responses.js";

//#region packages/ai/src/providers/openai-reasoning-effort.d.ts
type OpenAIReasoningEffort = "none" | "minimal" | "low" | "medium" | "high" | "xhigh" | "max";
type OpenAIApiReasoningEffort = OpenAIReasoningEffort | (string & {});
type OpenAIReasoningModel = {
  provider?: unknown;
  id?: unknown;
  name?: unknown;
  api?: unknown;
  baseUrl?: unknown;
  compat?: unknown;
};
/** Return whether a model is the GPT-5.4 mini family. */
declare function isOpenAIGpt54MiniModel(model: OpenAIReasoningModel): boolean;
/** Return whether a model is the GPT-5.5 family. */
declare function isOpenAIGpt55Model(model: OpenAIReasoningModel): boolean;
/** Return whether a model is the GPT-5.6 family. */
declare function isOpenAIGpt56Model(model: OpenAIReasoningModel): boolean;
/** Normalize user-facing reasoning effort names to API effort names. */
declare function normalizeOpenAIReasoningEffort(effort: string): string;
/** Resolve the reasoning efforts accepted by a specific OpenAI-compatible model. */
declare function resolveOpenAISupportedReasoningEfforts(model: OpenAIReasoningModel): readonly OpenAIApiReasoningEffort[];
/**
 * Return whether a model accepts the temperature parameter. The GPT-5.6
 * family rejects it with a 400; catalog compat can override per model.
 */
declare function supportsOpenAITemperature(model: OpenAIReasoningModel): boolean;
/** Return whether a model accepts a requested reasoning effort. */
declare function supportsOpenAIReasoningEffort(model: OpenAIReasoningModel, effort: string): boolean;
/** Resolve a requested reasoning effort to the closest value supported by the model. */
declare function resolveOpenAIReasoningEffortForModel(params: {
  model: OpenAIReasoningModel;
  effort: string;
  fallbackMap?: Record<string, string>;
}): OpenAIApiReasoningEffort | undefined;
//#endregion
//#region packages/ai/src/providers/openai-tool-projection.d.ts
type OpenAIToolDescriptor = {
  readonly name?: unknown;
  readonly description?: unknown;
  readonly parameters: unknown;
};
type OpenAIProjectedTool = {
  readonly toolIndex: number;
  readonly name: string;
  readonly description?: string;
  readonly parameters: Record<string, unknown>;
};
type OpenAIToolProjectionDiagnostic = {
  readonly toolIndex: number;
  readonly toolName?: string;
  readonly violations: readonly string[];
};
type OpenAIToolProjection = {
  readonly inputToolCount: number;
  readonly tools: readonly OpenAIProjectedTool[];
  readonly diagnostics: readonly OpenAIToolProjectionDiagnostic[];
};
type OpenAIResponsesToolChoice = ResponseCreateParamsStreaming["tool_choice"];
type OpenAICompletionsSdkToolChoice = OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming["tool_choice"];
type OpenAICompletionsToolChoice = Exclude<OpenAICompletionsSdkToolChoice, {
  type: "custom";
}>;
/** Snapshots direct/custom tool descriptors before OpenAI payload construction. */
declare function projectOpenAITools(tools: readonly OpenAIToolDescriptor[]): OpenAIToolProjection;
/** Keeps Responses tool choices aligned with surviving function schemas. */
declare function reconcileOpenAIResponsesToolChoice(choice: OpenAIResponsesToolChoice, projection: OpenAIToolProjection): OpenAIResponsesToolChoice | undefined;
/** Keeps Chat Completions tool choices aligned with surviving function schemas. */
declare function reconcileOpenAICompletionsToolChoice(choice: OpenAICompletionsSdkToolChoice, projection: OpenAIToolProjection): OpenAICompletionsSdkToolChoice | undefined;
//#endregion
//#region packages/ai/src/provider-options.d.ts
type AnthropicEffort = "low" | "medium" | "high" | "xhigh" | "max";
type AnthropicThinkingDisplay = "summarized" | "omitted";
/** Provider options shared by the Anthropic provider and canonical transport. */
interface AnthropicOptions extends StreamOptions {
  /**
   * Enable extended thinking.
   * For Opus 4.6+ and Sonnet 4.6: uses adaptive thinking (model decides when/how much to think).
   * For older models: uses budget-based thinking with thinkingBudgetTokens.
   */
  thinkingEnabled?: boolean;
  /**
   * Token budget for extended thinking (older models only).
   * Ignored for Opus 4.6+ and Sonnet 4.6, which use adaptive thinking.
   */
  thinkingBudgetTokens?: number;
  /**
   * Effort level for adaptive thinking (Opus 4.6+ and Sonnet 4.6).
   * Controls how much thinking Claude allocates:
   * - "max": Always thinks with no constraints (Opus 4.6 only)
   * - "xhigh": Highest reasoning level (Opus 4.7+)
   * - "high": Always thinks, deep reasoning (default)
   * - "medium": Moderate thinking, may skip for simple queries
   * - "low": Minimal thinking, skips for simple tasks
   * Ignored for older models.
   */
  effort?: AnthropicEffort;
  /**
   * Controls how thinking content is returned in API responses.
   * - "summarized": Thinking blocks contain summarized thinking text (default here).
   * - "omitted": Thinking blocks return an empty thinking field; the encrypted
   *   signature still travels back for multi-turn continuity. Use for faster
   *   time-to-first-text-token when your UI does not surface thinking.
   *
   * Note: Anthropic's API default for Claude Opus 4.7+ and Claude Mythos Preview
   * is "omitted". We default to "summarized" here to keep behavior consistent
   * with older Claude 4 models. Set this explicitly to "omitted" to opt in.
   */
  thinkingDisplay?: AnthropicThinkingDisplay;
  interleavedThinking?: boolean;
  toolChoice?: "auto" | "any" | "none" | {
    type: "tool";
    name: string;
  };
  /**
   * Pre-built Anthropic client instance. When provided, skips internal client
   * construction entirely. Use this to inject alternative SDK clients such as
   * `AnthropicVertex` that shares the same messaging API.
   */
  client?: Anthropic;
}
/** Options shared by the OpenAI Responses and Completions transports. */
type BaseOpenAIStreamOptions = StreamOptions & {
  topP?: number;
  authProfileId?: string;
  firstEventTimeoutMs?: number;
  onFirstEventTimeout?: (reason: Error) => void;
  openclawCodeModeToolSurface?: boolean;
  frequencyPenalty?: number;
  presencePenalty?: number;
  seed?: number;
};
/** Superset retained under the provider's published compatibility type name. */
type OpenAICompletionsOptions = BaseOpenAIStreamOptions & {
  toolChoice?: OpenAICompletionsToolChoice;
  reasoning?: OpenAIReasoningEffort;
  reasoningEffort?: OpenAIReasoningEffort;
};
//#endregion
export { resolveOpenAIReasoningEffortForModel as _, OpenAICompletionsOptions as a, supportsOpenAITemperature as b, projectOpenAITools as c, OpenAIApiReasoningEffort as d, OpenAIReasoningEffort as f, normalizeOpenAIReasoningEffort as g, isOpenAIGpt56Model as h, BaseOpenAIStreamOptions as i, reconcileOpenAICompletionsToolChoice as l, isOpenAIGpt55Model as m, AnthropicOptions as n, OpenAICompletionsToolChoice as o, isOpenAIGpt54MiniModel as p, AnthropicThinkingDisplay as r, OpenAIToolProjection as s, AnthropicEffort as t, reconcileOpenAIResponsesToolChoice as u, resolveOpenAISupportedReasoningEfforts as v, supportsOpenAIReasoningEffort as y };