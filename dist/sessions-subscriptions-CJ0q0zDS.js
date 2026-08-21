import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import "./agent-scope-DyEposw2.js";
import { n as APPROVALS_SCOPE } from "./operator-scopes-Dw7Gu2cA.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { r as resolveSessionStoreKey } from "./session-store-key-DmGCpash.js";
import { Lr as validateSessionsViewerPresenceSetParams, Tr as validateSessionsMessagesUnsubscribeParams, wr as validateSessionsMessagesSubscribeParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import "./session-utils-P5pxtsqu.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { r as canReviewOperatorApproval } from "./operator-approval-authorization-BRZVExhJ.js";
import { t as resolveRequestedSessionAgentId } from "./session-request-agent-0PlHUzcN.js";
import { l as requireSessionKey } from "./sessions-shared-gU-TXhNf.js";
import { m as sessionObserverScopeKey } from "./session-observer-model-QD0FdBWC.js";
//#region src/gateway/server-methods/sessions-subscriptions.ts
const sessionSubscriptionHandlers = {
	"sessions.subscribe": ({ client, context, respond }) => {
		const connId = client?.connId?.trim();
		if (connId) context.subscribeSessionEvents(connId);
		respond(true, { subscribed: Boolean(connId) }, void 0);
	},
	"sessions.unsubscribe": ({ client, context, respond }) => {
		const connId = client?.connId?.trim();
		if (connId) context.unsubscribeSessionEvents(connId);
		respond(true, { subscribed: false }, void 0);
	},
	"sessions.viewers.set": ({ params, client, context, respond }) => {
		if (!assertValidParams(params, validateSessionsViewerPresenceSetParams, "sessions.viewers.set", respond)) return;
		const connId = client?.connId?.trim();
		const declarations = context.sessionViewerPresence;
		if (!connId || !declarations) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "session viewer presence unavailable"));
			return;
		}
		const cfg = context.getRuntimeConfig();
		const canonicalKeys = [];
		for (const rawKey of params.sessionKeys) {
			const trimmed = rawKey.trim();
			if (!trimmed) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "invalid sessions.viewers.set params"));
				return;
			}
			canonicalKeys.push(resolveSessionStoreKey({
				cfg,
				sessionKey: trimmed
			}));
		}
		respond(true, { sessionKeys: declarations.replace(connId, canonicalKeys) }, void 0);
	},
	"sessions.messages.subscribe": ({ params, client, context, respond }) => {
		if (!assertValidParams(params, validateSessionsMessagesSubscribeParams, "sessions.messages.subscribe", respond)) return;
		const connId = client?.connId?.trim();
		const p = params;
		const key = requireSessionKey(p.key, respond);
		if (!key) return;
		if (p.includeApprovals === true && !canReviewOperatorApproval(client)) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `sessions.messages.subscribe includeApprovals requires a paired device and gateway scope: ${APPROVALS_SCOPE}`));
			return;
		}
		const cfg = context.getRuntimeConfig();
		const requestedAgent = resolveRequestedSessionAgentId(cfg, key, p.agentId);
		if (!requestedAgent.ok) {
			respond(false, void 0, requestedAgent.error);
			return;
		}
		const requestedAgentId = requestedAgent.agentId;
		const canonicalKey = resolveSessionStoreKey({
			cfg,
			sessionKey: key,
			...requestedAgentId ? { storeAgentId: requestedAgentId } : {}
		});
		const subscriptionKey = sessionObserverScopeKey(canonicalKey, requestedAgentId ?? resolveDefaultAgentId(cfg));
		if (connId) {
			let approvalReplay;
			if (p.includeApprovals === true) {
				const rollbackSubscription = context.subscribeSessionMessageEvents(connId, subscriptionKey, {
					includeApprovals: true,
					provisional: true
				});
				try {
					approvalReplay = context.listSessionPendingApprovals?.(subscriptionKey, client);
				} catch (error) {
					rollbackSubscription?.();
					context.logGateway.error(`session approval replay failed: ${String(error)}`);
					respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "session approval replay unavailable"));
					return;
				}
				if (!approvalReplay) {
					rollbackSubscription?.();
					respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "session approval replay unavailable"));
					return;
				}
				rollbackSubscription?.commit?.();
			} else context.subscribeSessionMessageEvents(connId, subscriptionKey);
			respond(true, {
				subscribed: true,
				key: canonicalKey,
				...p.includeApprovals === true ? { approvalReplay } : {}
			}, void 0);
			return;
		}
		respond(true, {
			subscribed: false,
			key: canonicalKey
		}, void 0);
	},
	"sessions.messages.unsubscribe": ({ params, client, context, respond }) => {
		if (!assertValidParams(params, validateSessionsMessagesUnsubscribeParams, "sessions.messages.unsubscribe", respond)) return;
		const connId = client?.connId?.trim();
		const p = params;
		const key = requireSessionKey(p.key, respond);
		if (!key) return;
		const cfg = context.getRuntimeConfig();
		const requestedAgent = resolveRequestedSessionAgentId(cfg, key, p.agentId);
		if (!requestedAgent.ok) {
			respond(false, void 0, requestedAgent.error);
			return;
		}
		const requestedAgentId = requestedAgent.agentId;
		const canonicalKey = resolveSessionStoreKey({
			cfg,
			sessionKey: key,
			...requestedAgentId ? { storeAgentId: requestedAgentId } : {}
		});
		const subscriptionKey = sessionObserverScopeKey(canonicalKey, requestedAgentId ?? resolveDefaultAgentId(cfg));
		if (connId) context.unsubscribeSessionMessageEvents(connId, subscriptionKey);
		respond(true, {
			subscribed: false,
			key: canonicalKey
		}, void 0);
	}
};
//#endregion
export { sessionSubscriptionHandlers };
