import { M as OpenClawPluginDefinition$1, c as OpenClawPluginConfigSchema, l as OpenClawPluginDefinition } from "../../plugin-entry-D2U6D_c3.js";

//#region extensions/bonjour/index.d.ts
/** Plugin entry for Bonjour/mDNS gateway discovery. */
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition["register"]>;
} & Pick<OpenClawPluginDefinition$1, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
//#endregion
export { _default as default };