import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { dn as validatePluginApprovalResolveParams, un as validatePluginApprovalRequestParams } from "./src-BSn6va4B.js";
import { f as resolvePluginApprovalTimeoutMs } from "./plugin-approvals-DmWtM_Ej.js";
import { t as resolveCanonicalPluginApprovalRequestAllowedDecisions } from "./plugin-approval-canonical-decisions-CtBpKRPA.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { a as handleApprovalResolve, d as resolveApprovalDecisionParams, i as buildRequestedApprovalEvent, l as listVisiblePendingApprovalRequests, n as bindApprovalReviewerDeviceIds, o as handleApprovalWaitDecision, s as handlePendingApprovalRequest, t as bindApprovalRequesterMetadata, u as registerPendingApprovalRecord } from "./approval-shared-Cs2GHmag.js";
import { t as runApprovalRequestDeliveries } from "./approval-request-delivery-oM94Dk36.js";
import { randomUUID } from "node:crypto";
//#region src/gateway/server-methods/plugin-approval.ts
/** Create plugin approval handlers backed by the shared approval manager. */
function createPluginApprovalHandlers(manager, opts) {
	return {
		"plugin.approval.list": async ({ respond, client }) => {
			respond(true, listVisiblePendingApprovalRequests({
				manager,
				client
			}), void 0);
		},
		"plugin.approval.request": async ({ params, client, respond, context }) => {
			if (!assertValidParams(params, validatePluginApprovalRequestParams, "plugin.approval.request", respond)) return;
			const p = params;
			const twoPhase = p.twoPhase === true;
			const timeoutMs = resolvePluginApprovalTimeoutMs(p.timeoutMs);
			const normalizeTrimmedString = (value) => normalizeOptionalString(value) || null;
			const request = {
				pluginId: p.pluginId ?? null,
				title: p.title,
				description: p.description,
				detail: normalizeTrimmedString(p.detail),
				severity: p.severity ?? null,
				toolName: p.toolName ?? null,
				toolCallId: p.toolCallId ?? null,
				...Array.isArray(p.allowedDecisions) ? { allowedDecisions: resolveCanonicalPluginApprovalRequestAllowedDecisions({ allowedDecisions: p.allowedDecisions }) } : {},
				agentId: p.agentId ?? null,
				sessionKey: p.sessionKey ?? null,
				turnSourceChannel: normalizeTrimmedString(p.turnSourceChannel),
				turnSourceTo: normalizeTrimmedString(p.turnSourceTo),
				turnSourceAccountId: normalizeTrimmedString(p.turnSourceAccountId),
				turnSourceThreadId: p.turnSourceThreadId ?? null
			};
			const record = manager.create(request, timeoutMs, `plugin:${randomUUID()}`);
			bindApprovalRequesterMetadata({
				record,
				client
			});
			if (client?.internal?.approvalRuntime === true) bindApprovalReviewerDeviceIds({
				record,
				deviceIds: p.approvalReviewerDeviceIds
			});
			const decisionPromise = registerPendingApprovalRecord({
				manager,
				record,
				timeoutMs,
				respond,
				context
			});
			if (!decisionPromise) return;
			const requestEvent = buildRequestedApprovalEvent(record);
			const forwardRequest = opts?.forwarder?.handlePluginApprovalRequested?.bind(opts.forwarder);
			const iosPushRequest = opts?.iosPushDelivery?.handleRequested?.bind(opts.iosPushDelivery);
			await handlePendingApprovalRequest({
				manager,
				record,
				decisionPromise,
				respond,
				context,
				clientConnId: client?.connId,
				requestEventName: "plugin.approval.requested",
				requestEvent,
				twoPhase,
				approvalKind: "plugin",
				deliverRequest: () => runApprovalRequestDeliveries({
					context,
					record,
					forward: forwardRequest ? [() => forwardRequest(requestEvent), "plugin approvals: forward request failed"] : void 0,
					iosPush: iosPushRequest ? [(isTargetVisible) => iosPushRequest(requestEvent, { isTargetVisible }), "plugin approvals: iOS push request failed"] : void 0
				}),
				afterDecision: async (decision) => {
					if (decision === null) await opts?.iosPushDelivery?.handleExpired?.(requestEvent);
				},
				afterDecisionErrorLabel: "plugin approvals: iOS push expire failed"
			});
		},
		"plugin.approval.waitDecision": async ({ params, respond, client }) => {
			await handleApprovalWaitDecision({
				manager,
				inputId: params.id,
				client,
				respond
			});
		},
		"plugin.approval.resolve": async ({ params, respond, client, context }) => {
			const resolveParams = resolveApprovalDecisionParams({
				rawParams: params,
				validate: validatePluginApprovalResolveParams,
				methodName: "plugin.approval.resolve",
				respond
			});
			if (!resolveParams) return;
			const { inputId, decision } = resolveParams;
			await handleApprovalResolve({
				approvalKind: "plugin",
				manager,
				inputId,
				decision,
				respond,
				context,
				client,
				exposeAmbiguousPrefixError: false,
				validateDecision: (snapshot) => resolveCanonicalPluginApprovalRequestAllowedDecisions(snapshot.request).includes(decision) ? null : {
					message: `${decision} is unavailable for this plugin approval`,
					details: { allowedDecisions: resolveCanonicalPluginApprovalRequestAllowedDecisions(snapshot.request) }
				},
				forwardResolved: (resolvedEvent) => opts?.forwarder?.handlePluginApprovalResolved?.(resolvedEvent),
				forwardResolvedErrorLabel: "plugin approvals: forward resolve failed",
				extraResolvedHandlers: opts?.iosPushDelivery?.handleResolved ? [{
					run: (resolvedEvent) => opts.iosPushDelivery.handleResolved(resolvedEvent),
					errorLabel: "plugin approvals: iOS push resolve failed"
				}] : void 0
			});
		}
	};
}
//#endregion
export { createPluginApprovalHandlers };
