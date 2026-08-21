import { r as OpenClawConfig } from "./types.openclaw-DqdTE9e3.js";
import { a as ExecApprovalRequest } from "./exec-approvals-core-ByvfWxmW.js";
import { c as PluginApprovalRequest } from "./plugin-approvals-BeZNQzQv.js";

//#region src/infra/approval-request-account-binding.d.ts
type ApprovalRequestLike = ExecApprovalRequest | PluginApprovalRequest;
/** Resolves the account id an approval request belongs to for an optional channel filter. */
declare function resolveApprovalRequestAccountId(params: {
  cfg: OpenClawConfig;
  request: ApprovalRequestLike;
  channel?: string | null;
}): string | null;
/** Resolves an approval request account only when the request can be routed to a channel. */
declare function resolveApprovalRequestChannelAccountId(params: {
  cfg: OpenClawConfig;
  request: ApprovalRequestLike;
  channel: string;
}): string | null;
/** Checks whether a channel/account pair is eligible to handle an approval request. */
declare function doesApprovalRequestMatchChannelAccount(params: {
  cfg: OpenClawConfig;
  request: ApprovalRequestLike;
  channel: string;
  accountId?: string | null;
}): boolean;
//#endregion
export { resolveApprovalRequestAccountId as n, resolveApprovalRequestChannelAccountId as r, doesApprovalRequestMatchChannelAccount as t };