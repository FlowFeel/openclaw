import { t as matchesApprovalRequestFilters } from "./approval-request-filters-CgLc9W0p.js";
import { n as isChannelExecApprovalClientEnabledFromConfig } from "./approval-client-helpers-DU-rFdOk.js";
import { a as doesApprovalRequestMatchChannelAccount } from "./exec-approval-session-target-D4nFVPAh.js";
import "./approval-native-runtime-0Oh7zrKt.js";
import { s as resolveDiscordAccount } from "./accounts-Bu1tgR5z.js";
import { t as getDiscordExecApprovalApprovers } from "./exec-approvals-tR8nlZmx.js";
//#region extensions/discord/src/approval-shared.ts
function shouldHandleDiscordApprovalRequest(params) {
	const config = params.configOverride ?? resolveDiscordAccount({
		cfg: params.cfg,
		accountId: params.accountId
	}).config.execApprovals;
	const approvers = getDiscordExecApprovalApprovers({
		cfg: params.cfg,
		accountId: params.accountId,
		configOverride: params.configOverride
	});
	if (!doesApprovalRequestMatchChannelAccount({
		cfg: params.cfg,
		request: params.request,
		channel: "discord",
		accountId: params.accountId
	})) return false;
	if (!isChannelExecApprovalClientEnabledFromConfig({
		enabled: config?.enabled,
		approverCount: approvers.length
	})) return false;
	return matchesApprovalRequestFilters({
		request: params.request.request,
		agentFilter: config?.agentFilter,
		sessionFilter: config?.sessionFilter
	});
}
//#endregion
export { shouldHandleDiscordApprovalRequest as t };
