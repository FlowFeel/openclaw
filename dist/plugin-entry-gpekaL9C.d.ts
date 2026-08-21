import { F as ProviderResolveDynamicModelContext$1, I as ProviderAuthMethod$1, P as ProviderWrapStreamFnContext$1, R as UnifiedModelCatalogProviderContext$1, a as OpenClawPluginService$1, n as OpenClawPluginConfigSchema$1, o as OpenClawPluginServiceContext$1, r as OpenClawPluginApi$1, t as OpenClawPluginDefinition$1, v as PluginLogger$1 } from "./types-BNfDyER-.js";
import { n as ProviderThinkingProfile$1, t as ProviderDefaultThinkingPolicyContext$1 } from "./provider-thinking.types-DOjyEqPd.js";

//#region src/plugin-sdk/plugin-entry.d.ts
type OpenClawPluginApi = OpenClawPluginApi$1;
type OpenClawPluginConfigSchema = OpenClawPluginConfigSchema$1;
type OpenClawPluginDefinition = OpenClawPluginDefinition$1;
type OpenClawPluginService = OpenClawPluginService$1;
type OpenClawPluginServiceContext = OpenClawPluginServiceContext$1;
type PluginLogger = PluginLogger$1;
type ProviderAuthMethod = ProviderAuthMethod$1;
type ProviderDefaultThinkingPolicyContext = ProviderDefaultThinkingPolicyContext$1;
type ProviderResolveDynamicModelContext = ProviderResolveDynamicModelContext$1;
type ProviderThinkingProfile = ProviderThinkingProfile$1;
type ProviderWrapStreamFnContext = ProviderWrapStreamFnContext$1;
type UnifiedModelCatalogProviderContext = UnifiedModelCatalogProviderContext$1;
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
export { OpenClawPluginServiceContext as a, ProviderDefaultThinkingPolicyContext as c, ProviderWrapStreamFnContext as d, UnifiedModelCatalogProviderContext as f, OpenClawPluginService as i, ProviderResolveDynamicModelContext as l, OpenClawPluginConfigSchema as n, PluginLogger as o, definePluginEntry as p, OpenClawPluginDefinition as r, ProviderAuthMethod as s, OpenClawPluginApi as t, ProviderThinkingProfile as u };