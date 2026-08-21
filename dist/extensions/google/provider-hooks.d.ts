import { D as ProviderReplayPolicyContext, E as ProviderReplayPolicy, O as ProviderSanitizeReplayHistoryContext, T as ProviderReasoningOutputModeContext, v as ProviderThinkingProfile, w as ProviderReasoningOutputMode } from "../../types-SqiTFKjU.js";
import { y as StreamFn } from "../../types.openclaw-hJEKisz6.js";
import { Bt as AgentMessage } from "../../setup-wizard-types-B72aypBk.js";
import { c as ProviderDefaultThinkingPolicyContext, d as ProviderNormalizeToolSchemasContext, h as ProviderWrapStreamFnContext, l as ProviderFailoverErrorContext, m as ProviderToolSchemaDiagnostic, t as AnyAgentTool } from "../../plugin-entry-Cqz1CRwl.js";
//#region extensions/google/provider-hooks.d.ts
declare function wrapGoogleThinkingStream(ctx: ProviderWrapStreamFnContext): StreamFn;
declare const GOOGLE_GEMINI_PROVIDER_HOOKS: {
  resolveThinkingProfile: (context: ProviderDefaultThinkingPolicyContext) => ProviderThinkingProfile | undefined;
  wrapStreamFn: typeof wrapGoogleThinkingStream;
  classifyFailoverReason: ({
    code
  }: ProviderFailoverErrorContext) => "overloaded" | "timeout" | "server_error" | undefined;
  normalizeToolSchemas: (ctx: ProviderNormalizeToolSchemasContext) => AnyAgentTool[];
  inspectToolSchemas: (ctx: ProviderNormalizeToolSchemasContext) => ProviderToolSchemaDiagnostic[];
  buildReplayPolicy?: ((ctx: ProviderReplayPolicyContext) => ProviderReplayPolicy | null | undefined) | undefined;
  sanitizeReplayHistory?: ((ctx: ProviderSanitizeReplayHistoryContext) => Promise<AgentMessage[] | null | undefined> | AgentMessage[] | null | undefined) | undefined;
  resolveReasoningOutputMode?: ((ctx: ProviderReasoningOutputModeContext) => ProviderReasoningOutputMode | null | undefined) | undefined;
};
//#endregion
export { GOOGLE_GEMINI_PROVIDER_HOOKS };