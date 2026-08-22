import { t as OpenClawPluginDefinition } from "../../types-odeWQ5Sn.js";
import { i as OpenClawPluginDefinition$1, r as OpenClawPluginConfigSchema } from "../../plugin-entry-D6tZQojt.js";

//#region extensions/anthropic/index.d.ts
/** Provider entry for Anthropic API, Claude CLI, and native session surfaces. */
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition$1["register"]>;
} & Pick<OpenClawPluginDefinition, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
//#endregion
export { _default as default };