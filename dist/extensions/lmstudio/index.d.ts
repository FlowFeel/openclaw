import { t as OpenClawPluginDefinition } from "../../types-CAQ6JuHx.js";
import { c as OpenClawPluginConfigSchema, l as OpenClawPluginDefinition$1 } from "../../plugin-entry-i32wLQY9.js";

//#region extensions/lmstudio/index.d.ts
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition$1["register"]>;
} & Pick<OpenClawPluginDefinition, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
//#endregion
export { _default as default };