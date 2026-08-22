import { Hi as AnyAgentTool$1, Nn as ProviderNormalizeToolSchemasContext$1, Rn as ProviderToolSchemaDiagnostic$1, c as MigrationDetection$1, d as MigrationProviderContext$1, f as MigrationProviderPlugin$1, l as MigrationItem$1, n as OpenClawPluginConfigSchema$1, o as MigrationApplyResult$1, p as MigrationSummary$1, r as OpenClawPluginApi$1, t as OpenClawPluginDefinition$1, u as MigrationPlan$1 } from "./types-DdUyjaEr.js";
//#region src/plugin-sdk/plugin-entry.d.ts
type AnyAgentTool = AnyAgentTool$1;
type MigrationApplyResult = MigrationApplyResult$1;
type MigrationDetection = MigrationDetection$1;
type MigrationItem = MigrationItem$1;
type MigrationPlan = MigrationPlan$1;
type MigrationProviderContext = MigrationProviderContext$1;
type MigrationProviderPlugin = MigrationProviderPlugin$1;
type MigrationSummary = MigrationSummary$1;
type OpenClawPluginApi = OpenClawPluginApi$1;
type OpenClawPluginConfigSchema = OpenClawPluginConfigSchema$1;
type OpenClawPluginDefinition = OpenClawPluginDefinition$1;
type ProviderNormalizeToolSchemasContext = ProviderNormalizeToolSchemasContext$1;
type ProviderToolSchemaDiagnostic = ProviderToolSchemaDiagnostic$1;
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
export { MigrationPlan as a, MigrationSummary as c, OpenClawPluginDefinition as d, ProviderNormalizeToolSchemasContext as f, MigrationItem as i, OpenClawPluginApi as l, definePluginEntry as m, MigrationApplyResult as n, MigrationProviderContext as o, ProviderToolSchemaDiagnostic as p, MigrationDetection as r, MigrationProviderPlugin as s, AnyAgentTool as t, OpenClawPluginConfigSchema as u };