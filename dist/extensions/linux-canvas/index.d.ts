import { t as OpenClawPluginDefinition } from "../../types-DCnZ_KP9.js";
import { i as OpenClawPluginDefinition$1, r as OpenClawPluginConfigSchema } from "../../plugin-entry-CUAoWLy3.js";

//#region extensions/linux-canvas/index.d.ts
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition$1["register"]>;
} & Pick<OpenClawPluginDefinition, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
//#endregion
export { _default as default };