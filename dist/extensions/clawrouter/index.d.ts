import { t as OpenClawPluginDefinition } from "../../types-t45BJFXe.js";
import { i as OpenClawPluginDefinition$1, r as OpenClawPluginConfigSchema } from "../../plugin-entry-h8MjCePN.js";

//#region extensions/clawrouter/index.d.ts
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition$1["register"]>;
} & Pick<OpenClawPluginDefinition, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
//#endregion
export { _default as default };