import { t as matchesApprovalRequestFilters } from "./approval-request-filters-CgLc9W0p.js";
import { n as isChannelExecApprovalClientEnabledFromConfig } from "./approval-client-helpers-CREHK3yB.js";
import { a as doesApprovalRequestMatchChannelAccount } from "./exec-approval-session-target-yzP3DEms.js";
import "./approval-native-runtime-CEXgabNA.js";
import { s as resolveDiscordAccount } from "./accounts-CH9MGfW0.js";
import { t as getDiscordExecApprovalApprovers } from "./exec-approvals-4Enj03WN.js";
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
