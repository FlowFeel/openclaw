import { m as ZodType } from "./types.openclaw-B2WvMv3k.js";
import { n as ChannelConfigSchema, r as ChannelConfigUiHint } from "./types.config-C6_VK-8V.js";
import { Type } from "typebox";

//#region src/channels/plugins/config-schema.d.ts
type BuildChannelConfigSchemaOptions = {
  uiHints?: Record<string, ChannelConfigUiHint>; /** Select input mode when transforms must expose accepted config values to editors. */
  jsonSchemaMode?: "input" | "output";
};
/** Build a channel config schema from Zod, exporting JSON Schema when available. */
declare function buildChannelConfigSchema(schema: ZodType, options?: BuildChannelConfigSchemaOptions): ChannelConfigSchema;
//#endregion
//#region src/channels/plugins/config-helpers.d.ts
/**
 * Clears selected fields from one account entry and reports whether configured data was removed.
 */
declare function clearAccountEntryFields<TAccountEntry extends object>(params: {
  accounts?: Record<string, TAccountEntry>;
  accountId: string;
  fields: string[];
  isValueSet?: (value: unknown) => boolean;
  markClearedOnFieldPresence?: boolean;
}): {
  nextAccounts?: Record<string, TAccountEntry>;
  changed: boolean;
  cleared: boolean;
};
//#endregion
//#region src/channels/plugins/helpers.d.ts
declare function formatPairingApproveHint(channelId: string): string;
//#endregion
export { clearAccountEntryFields as n, buildChannelConfigSchema as r, formatPairingApproveHint as t };