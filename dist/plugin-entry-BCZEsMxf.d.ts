import { C as ProviderPrepareRuntimeAuthContext$1, D as ProviderAuthContext$1, E as ProviderResolvedUsageAuth$1, O as ProviderAuthMethod$1, S as ProviderFetchUsageSnapshotContext$1, T as ProviderResolveUsageAuthContext$1, c as OpenClawPluginServiceContext$1, d as OpenClawPluginNodeHostCommand$1, f as PluginLogger$1, gt as AnyAgentTool$1, n as OpenClawPluginConfigSchema$1, o as OpenClawPluginNodeInvokePolicy$1, p as OpenClawPluginToolContext$1, r as OpenClawPluginApi$1, s as OpenClawPluginService$1, t as OpenClawPluginDefinition$1, v as ProviderDefaultThinkingPolicyContext$1, w as ProviderPreparedRuntimeAuth$1, x as ProviderWrapStreamFnContext$1, y as ProviderThinkingProfile$1 } from "./types-DOjBC-h-.js";

//#region src/plugin-sdk/plugin-entry.d.ts
type AnyAgentTool = AnyAgentTool$1;
type OpenClawPluginApi = OpenClawPluginApi$1;
type OpenClawPluginConfigSchema = OpenClawPluginConfigSchema$1;
type OpenClawPluginDefinition = OpenClawPluginDefinition$1;
type OpenClawPluginNodeHostCommand = OpenClawPluginNodeHostCommand$1;
type OpenClawPluginNodeInvokePolicy = OpenClawPluginNodeInvokePolicy$1;
type OpenClawPluginService = OpenClawPluginService$1;
type OpenClawPluginServiceContext = OpenClawPluginServiceContext$1;
type OpenClawPluginToolContext = OpenClawPluginToolContext$1;
type PluginLogger = PluginLogger$1;
type ProviderAuthContext = ProviderAuthContext$1;
type ProviderAuthMethod = ProviderAuthMethod$1;
type ProviderDefaultThinkingPolicyContext = ProviderDefaultThinkingPolicyContext$1;
type ProviderFetchUsageSnapshotContext = ProviderFetchUsageSnapshotContext$1;
type ProviderPrepareRuntimeAuthContext = ProviderPrepareRuntimeAuthContext$1;
type ProviderPreparedRuntimeAuth = ProviderPreparedRuntimeAuth$1;
type ProviderResolveUsageAuthContext = ProviderResolveUsageAuthContext$1;
type ProviderResolvedUsageAuth = ProviderResolvedUsageAuth$1;
type ProviderThinkingProfile = ProviderThinkingProfile$1;
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
export { ProviderResolveUsageAuthContext as _, OpenClawPluginNodeHostCommand as a, ProviderWrapStreamFnContext as b, OpenClawPluginServiceContext as c, ProviderAuthContext as d, ProviderAuthMethod as f, ProviderPreparedRuntimeAuth as g, ProviderPrepareRuntimeAuthContext as h, OpenClawPluginDefinition as i, OpenClawPluginToolContext as l, ProviderFetchUsageSnapshotContext as m, OpenClawPluginApi as n, OpenClawPluginNodeInvokePolicy as o, ProviderDefaultThinkingPolicyContext as p, OpenClawPluginConfigSchema as r, OpenClawPluginService as s, AnyAgentTool as t, PluginLogger as u, ProviderResolvedUsageAuth as v, definePluginEntry as x, ProviderThinkingProfile as y };