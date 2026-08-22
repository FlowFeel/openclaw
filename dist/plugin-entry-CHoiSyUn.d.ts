import { A as ProviderAuthDoctorHintContext$1, B as ProviderCatalogResult$1, I as ProviderAuthResult$1, L as ProviderSanitizeReplayHistoryContext$1, M as ProviderResolveDynamicModelContext$1, N as ProviderAppGuidedSetupContext$1, O as ProviderDefaultThinkingPolicyContext$1, P as ProviderAuthContext$1, _ as PluginLogger$1, a as OpenClawPluginService$1, c as MigrationItem$1, d as MigrationProviderPlugin$1, i as OpenClawPluginHttpRouteHandler$1, it as AnyAgentTool$1, j as ProviderPrepareDynamicModelContext$1, k as ProviderWrapStreamFnContext$1, l as MigrationPlan$1, n as OpenClawPluginConfigSchema$1, o as OpenClawPluginServiceContext$1, r as OpenClawPluginApi$1, s as MigrationApplyResult$1, t as OpenClawPluginDefinition$1, u as MigrationProviderContext$1, w as OpenClawPluginToolContext$1, z as ProviderCatalogContext$1 } from "./types-CJY5tURi.js";

//#region src/plugin-sdk/plugin-entry.d.ts
type AnyAgentTool = AnyAgentTool$1;
type MigrationApplyResult = MigrationApplyResult$1;
type MigrationItem = MigrationItem$1;
type MigrationPlan = MigrationPlan$1;
type MigrationProviderContext = MigrationProviderContext$1;
type MigrationProviderPlugin = MigrationProviderPlugin$1;
type OpenClawPluginApi = OpenClawPluginApi$1;
type OpenClawPluginConfigSchema = OpenClawPluginConfigSchema$1;
type OpenClawPluginDefinition = OpenClawPluginDefinition$1;
type OpenClawPluginHttpRouteHandler = OpenClawPluginHttpRouteHandler$1;
type OpenClawPluginService = OpenClawPluginService$1;
type OpenClawPluginServiceContext = OpenClawPluginServiceContext$1;
type OpenClawPluginToolContext = OpenClawPluginToolContext$1;
type PluginLogger = PluginLogger$1;
type ProviderAuthContext = ProviderAuthContext$1;
type ProviderAuthDoctorHintContext = ProviderAuthDoctorHintContext$1;
type ProviderAppGuidedSetupContext = ProviderAppGuidedSetupContext$1;
type ProviderAuthResult = ProviderAuthResult$1;
type ProviderCatalogContext = ProviderCatalogContext$1;
type ProviderCatalogResult = ProviderCatalogResult$1;
type ProviderDefaultThinkingPolicyContext = ProviderDefaultThinkingPolicyContext$1;
type ProviderPrepareDynamicModelContext = ProviderPrepareDynamicModelContext$1;
type ProviderResolveDynamicModelContext = ProviderResolveDynamicModelContext$1;
type ProviderSanitizeReplayHistoryContext = ProviderSanitizeReplayHistoryContext$1;
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
export { ProviderResolveDynamicModelContext as C, definePluginEntry as E, ProviderPrepareDynamicModelContext as S, ProviderWrapStreamFnContext as T, ProviderAuthDoctorHintContext as _, MigrationProviderContext as a, ProviderCatalogResult as b, OpenClawPluginConfigSchema as c, OpenClawPluginService as d, OpenClawPluginServiceContext as f, ProviderAuthContext as g, ProviderAppGuidedSetupContext as h, MigrationPlan as i, OpenClawPluginDefinition as l, PluginLogger as m, MigrationApplyResult as n, MigrationProviderPlugin as o, OpenClawPluginToolContext as p, MigrationItem as r, OpenClawPluginApi as s, AnyAgentTool as t, OpenClawPluginHttpRouteHandler as u, ProviderAuthResult as v, ProviderSanitizeReplayHistoryContext as w, ProviderDefaultThinkingPolicyContext as x, ProviderCatalogContext as y };