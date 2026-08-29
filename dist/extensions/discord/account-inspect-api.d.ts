import { n as OpenClawConfig } from "../../types.openclaw-szgVaeve.js";
import { t as InspectedDiscordAccount } from "../../account-inspect-CD0v8aom.js";

//#region extensions/discord/account-inspect-api.d.ts
declare function inspectDiscordReadOnlyAccount(cfg: OpenClawConfig, accountId?: string | null): InspectedDiscordAccount;
//#endregion
export { inspectDiscordReadOnlyAccount };