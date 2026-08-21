import { i as fetchChannelPermissionsDiscord } from "./send.permissions-CmxH56EG.js";
import { t as inspectDiscordAccount } from "./account-inspect-Ch6tdYPm.js";
import "./send-CqR7ElMC.js";
import { n as collectDiscordAuditChannelIdsForAccount, t as auditDiscordChannelPermissionsWithFetcher } from "./audit-core-fZVFz0C1.js";
//#region extensions/discord/src/audit.ts
function collectDiscordAuditChannelIds(params) {
	return collectDiscordAuditChannelIdsForAccount(inspectDiscordAccount({
		cfg: params.cfg,
		accountId: params.accountId
	}).config);
}
async function auditDiscordChannelPermissions(params) {
	return await auditDiscordChannelPermissionsWithFetcher({
		...params,
		fetchChannelPermissions: fetchChannelPermissionsDiscord
	});
}
//#endregion
export { collectDiscordAuditChannelIds as n, auditDiscordChannelPermissions as t };
