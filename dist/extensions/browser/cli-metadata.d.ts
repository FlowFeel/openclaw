import { M as OpenClawPluginDefinition$1, c as OpenClawPluginConfigSchema, l as OpenClawPluginDefinition } from "../../plugin-entry-d4GRo0oQ.js";

//#region extensions/browser/cli-metadata.d.ts
/** Plugin entry that contributes Browser CLI commands. */
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition["register"]>;
} & Pick<OpenClawPluginDefinition$1, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
//#endregion
export { _default as default };