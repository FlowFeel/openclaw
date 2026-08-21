import { t as inspectDiscordAccount } from "../../account-inspect-Ch6tdYPm.js";
//#region extensions/discord/account-inspect-api.ts
function inspectDiscordReadOnlyAccount(cfg, accountId) {
	return inspectDiscordAccount({
		cfg,
		accountId
	});
}
//#endregion
export { inspectDiscordReadOnlyAccount };
