import { M as OpenClawPluginDefinition$1, P as ProviderPlugin, c as OpenClawPluginConfigSchema, l as OpenClawPluginDefinition } from "../../plugin-entry-DICCbWcY.js";

//#region extensions/openai/setup-api.d.ts
declare function buildOpenAISetupProvider(): ProviderPlugin;
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition["register"]>;
} & Pick<OpenClawPluginDefinition$1, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
//#endregion
export { buildOpenAISetupProvider, _default as default };