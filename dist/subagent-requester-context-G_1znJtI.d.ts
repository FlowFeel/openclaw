import { g as DeliveryContext } from "./types-CEcJgDdy.js";
//#region src/plugins/runtime/subagent-requester-context.d.ts
type PluginSubagentRequesterContext = Readonly<{
  sessionKey: string;
  origin: Readonly<DeliveryContext>;
}>;
//#endregion
export { PluginSubagentRequesterContext as t };