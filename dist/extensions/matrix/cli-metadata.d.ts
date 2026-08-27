import { r as OpenClawPluginApi, t as OpenClawPluginDefinition } from "../../types-BtZjyB2V.js";
import { n as OpenClawPluginConfigSchema, r as OpenClawPluginDefinition$1 } from "../../plugin-entry-CnFsf3yf.js";
//#region extensions/matrix/src/cli-metadata.d.ts
declare function registerMatrixCliMetadata(api: OpenClawPluginApi): void;
//#endregion
//#region extensions/matrix/cli-metadata.d.ts
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition$1["register"]>;
} & Pick<OpenClawPluginDefinition, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
//#endregion
export { _default as default, registerMatrixCliMetadata };