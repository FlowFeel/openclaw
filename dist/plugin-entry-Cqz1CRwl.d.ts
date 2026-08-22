import { C as ProviderNormalizeToolSchemasContext$1, S as ProviderResolveDynamicModelContext$1, _ as ProviderDefaultThinkingPolicyContext$1, a as OpenClawPluginHttpRouteHandler$1, b as ProviderWrapStreamFnContext$1, d as PluginLogger$1, it as AnyAgentTool$1, k as ProviderToolSchemaDiagnostic$1, n as OpenClawPluginConfigSchema$1, o as OpenClawPluginService$1, r as OpenClawPluginApi$1, t as OpenClawPluginDefinition$1, v as ProviderThinkingProfile$1, x as ProviderNormalizeResolvedModelContext$1, y as ProviderFailoverErrorContext$1 } from "./types-SqiTFKjU.js";
//#region src/plugin-sdk/plugin-entry.d.ts
type AnyAgentTool = AnyAgentTool$1;
type OpenClawPluginApi = OpenClawPluginApi$1;
type OpenClawPluginConfigSchema = OpenClawPluginConfigSchema$1;
type OpenClawPluginDefinition = OpenClawPluginDefinition$1;
type OpenClawPluginHttpRouteHandler = OpenClawPluginHttpRouteHandler$1;
type OpenClawPluginService = OpenClawPluginService$1;
type PluginLogger = PluginLogger$1;
type ProviderDefaultThinkingPolicyContext = ProviderDefaultThinkingPolicyContext$1;
type ProviderFailoverErrorContext = ProviderFailoverErrorContext$1;
type ProviderNormalizeResolvedModelContext = ProviderNormalizeResolvedModelContext$1;
type ProviderNormalizeToolSchemasContext = ProviderNormalizeToolSchemasContext$1;
type ProviderResolveDynamicModelContext = ProviderResolveDynamicModelContext$1;
type ProviderThinkingProfile = ProviderThinkingProfile$1;
type ProviderToolSchemaDiagnostic = ProviderToolSchemaDiagnostic$1;
type ProviderWrapStreamFnContext = ProviderWrapStreamFnContext$1;
/** Options for a plugin entry that registers providers, tools, commands, or services. */
type DefinePluginEntryOptions = {
  id: string;
  name: string;
  description: string;
  /**
   * @deprecated Declare exclusive plugin kind in `openclaw.plugin.json` via
   * manifest `kind`. Runtime-entry `kind` remains only as a compatibility
   * fallback for older plugins.
   */
  kind?: OpenClawPluginDefinition["kind"];
  configSchema?: OpenClawPluginConfigSchema | (() => OpenClawPluginConfigSchema);
  reload?: OpenClawPluginDefinition["reload"];
  nodeHostCommands?: OpenClawPluginDefinition["nodeHostCommands"];
  securityAuditCollectors?: OpenClawPluginDefinition["securityAuditCollectors"];
  register: (api: OpenClawPluginApi) => void;
};
/** Normalized object shape that OpenClaw loads from a plugin entry module. */
type DefinedPluginEntry = {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition["register"]>;
} & Pick<OpenClawPluginDefinition, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
/**
 * Canonical entry helper for non-channel plugins.
 *
 * Use this for provider, tool, command, service, memory, and context-engine
 * plugins. Channel plugins should use `defineChannelPluginEntry(...)` from
 * `openclaw/plugin-sdk/core` so they inherit the channel capability wiring.
 */
declare function definePluginEntry({
  id,
  name,
  description,
  kind,
  configSchema,
  reload,
  nodeHostCommands,
  securityAuditCollectors,
  register
}: DefinePluginEntryOptions): DefinedPluginEntry;
//#endregion
export { OpenClawPluginHttpRouteHandler as a, ProviderDefaultThinkingPolicyContext as c, ProviderNormalizeToolSchemasContext as d, ProviderResolveDynamicModelContext as f, definePluginEntry as g, ProviderWrapStreamFnContext as h, OpenClawPluginDefinition as i, ProviderFailoverErrorContext as l, ProviderToolSchemaDiagnostic as m, OpenClawPluginApi as n, OpenClawPluginService as o, ProviderThinkingProfile as p, OpenClawPluginConfigSchema as r, PluginLogger as s, AnyAgentTool as t, ProviderNormalizeResolvedModelContext as u };