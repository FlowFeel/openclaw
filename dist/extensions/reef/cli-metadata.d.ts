import { r as OpenClawPluginApi, t as OpenClawPluginDefinition } from "../../types-BNrl3zyK.js";
import { c as OpenClawPluginConfigSchema, l as OpenClawPluginDefinition$1 } from "../../plugin-entry-CS8C3z51.js";
//#region extensions/reef/src/cli-metadata.d.ts
declare function registerReefCliMetadata(api: OpenClawPluginApi): void;
//#endregion
//#region extensions/reef/cli-metadata.d.ts
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition$1["register"]>;
} & Pick<OpenClawPluginDefinition, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
//#endregion
export { _default as default, registerReefCliMetadata };