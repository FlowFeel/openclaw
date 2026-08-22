import { t as OpenClawPluginDefinition } from "../../types-BNfDyER-.js";
import { n as OpenClawPluginConfigSchema, r as OpenClawPluginDefinition$1 } from "../../plugin-entry-gpekaL9C.js";

//#region extensions/linux-node/index.d.ts
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition$1["register"]>;
} & Pick<OpenClawPluginDefinition, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
//#endregion
export { _default as default };