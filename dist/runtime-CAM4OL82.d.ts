import { n as OpenClawConfig } from "./types.openclaw-szgVaeve.js";
import { r as AgentToolResult } from "./index-4iyL9Wnl.js";
import { t as DiscordMessagingActionOptions } from "./runtime.messaging.shared-BRYPLw3k.js";

//#region extensions/discord/src/actions/runtime.d.ts
declare function handleDiscordAction(params: Record<string, unknown>, cfg: OpenClawConfig, options?: DiscordMessagingActionOptions): Promise<AgentToolResult<unknown>>;
//#endregion
export { handleDiscordAction as t };