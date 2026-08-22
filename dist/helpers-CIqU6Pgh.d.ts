import { m as ZodType } from "./schemas-Cd6yayeo.js";
import { T as ChannelConfigUiHint, w as ChannelConfigSchema } from "./manifest-registry-CMYlfEid.js";

//#region src/channels/plugins/config-schema.d.ts
type BuildChannelConfigSchemaOptions = {
  uiHints?: Record<string, ChannelConfigUiHint>; /** Select input mode when transforms must expose accepted config values to editors. */
  jsonSchemaMode?: "input" | "output";
};
/** Build a channel config schema from Zod, exporting JSON Schema when available. */
declare function buildChannelConfigSchema(schema: ZodType, options?: BuildChannelConfigSchemaOptions): ChannelConfigSchema;
//#endregion
export { buildChannelConfigSchema as t };