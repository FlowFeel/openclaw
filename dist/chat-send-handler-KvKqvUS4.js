import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-DW4mBlAt.js";
import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { m as isFutureDateTimestampMs } from "./number-coercion-Crk_c9KW.js";
import { t as expectDefined } from "./expect-CyE8FADM.js";
import "./src-COWbwBfI.js";
import { i as asOptionalRecord } from "./record-coerce-DHZ4bFlT.js";
import { g as assertNoWindowsNetworkPath, x as safeFileURLToPath } from "./path-D8zNGPJM.js";
import "./fs-safe-DVaClkIX.js";
import { n as openLocalFileSafely } from "./root-impl-DYBxk3hn.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { f as resolveDefaultAgentId, i as listAgentIds, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { a as isSubagentSessionKey, c as parseAgentSessionKey, i as isCronSessionKey, n as isAcpSessionKey$1 } from "./session-key-utils-02xWdGSz.js";
import { t as isIncognitoSessionKey } from "./incognito-session-key-BwpD1Lwd.js";
import { g as scopeLegacySessionKeyToAgent } from "./session-key-DtTE9-Tg.js";
import { s as getAgentEventLifecycleGeneration } from "./agent-events-COCf-9-O.js";
import { n as claimAgentRunContext, r as clearAgentRunContext } from "./agent-run-registry-BluEqSPq.js";
import { g as resolveSessionAgentId } from "./agent-scope-DyEposw2.js";
import { a as measureDiagnosticsTimelineSpan, n as emitDiagnosticsTimelineEvent, o as measureDiagnosticsTimelineSpanSync } from "./diagnostics-timeline--Yi1HEPC.js";
import { n as resolveProviderIdForAuth } from "./provider-auth-aliases-BxGzIxtp.js";
import { a as hasGatewayClientCap, i as GATEWAY_CLIENT_NAMES, r as GATEWAY_CLIENT_MODES, t as GATEWAY_CLIENT_CAPS } from "./client-info-Dlrmm4mP.js";
import { i as loadOrCreateProcessDeviceIdentity } from "./device-identity-P-Q23TDZ.js";
import "./method-scopes-ChuOr7sh.js";
import { t as ADMIN_SCOPE } from "./operator-scopes-Dw7Gu2cA.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { d as retainGatewayRootWorkAdmissionContinuation, h as runWithGatewayIndependentRootWorkContinuation } from "./gateway-work-admission-D_DdbtmL.js";
import { a as getReplyPayloadMetadata, l as isReplyPayloadStatusNotice, o as getReplyPayloadTtsSupplement, r as buildTtsSupplementMediaPayload, u as isReplyPayloadTtsSupplement } from "./reply-payload-BtIUrr9c.js";
import { d as sessionDeliveryOrigin, n as deliveryContextFromSession, u as sessionDeliveryChannel } from "./delivery-context.shared-B-QSuGw_.js";
import { t as INTERNAL_MESSAGE_CHANNEL } from "./message-channel-constants-76XnXM8q.js";
import { l as mimeTypeFromFilePath, o as isAudioFileName } from "./mime-Ir6g3Vae.js";
import { t as isPassThroughRemoteMediaSource } from "./media-source-url-BL9SUd7E.js";
import "./local-file-access-8uj3r-Aa.js";
import { o as resolveSessionRoutingContract, r as resolveAgentMainSessionKey, t as SESSION_ROUTING_CHANGED_ERROR_REASON } from "./main-session-Bjm_i_Af.js";
import { r as resolveSessionStoreKey } from "./session-store-key-DmGCpash.js";
import { lt as patchSqliteSessionEntry } from "./session-accessor.sqlite-B9iW7DOt.js";
import { i as normalizeMessageChannel } from "./message-channel-normalize-Bmutiks_.js";
import { c as isOperatorUiClient, i as isGatewayCliClient, l as isWebchatClient, n as isBrowserOperatorUiClient, t as isBrowserCopilotClient } from "./message-channel-1n7hD5_u.js";
import { h as isAgentHarnessSessionKey, n as buildRestartRecoveryClaimCleanupPatch, o as hasRestartRecoveryTerminalRun, ut as beginSessionWorkAdmission, w as resolveMissingAgentHarnessSessionError } from "./session-entry-slot-keys-DR5d2mKt.js";
import { n as estimateBase64DecodedBytes } from "./base64-KcXAb-1x.js";
import { I as resolveSessionTranscriptActiveLeafEntryId, a as readSessionTranscriptWatermark, u as readSessionTranscriptActiveLeafEvents } from "./session-accessor-t3qUoTeV.js";
import { W as validateChatSendParams } from "./src-BSn6va4B.js";
import { a as errorShape, s as formatValidationErrors } from "./error-codes-P4fBo0lR.js";
import { i as deleteMediaBuffer, t as MEDIA_MAX_BYTES } from "./store-BDR50q7S.js";
import { i as parseInboundMediaUri } from "./media-reference-B9JOS1br.js";
import { i as sanitizeAssistantVisibleTextWithProfile } from "./assistant-visible-text-DONkuTGN.js";
import { o as createAgentRunRestartAbortError } from "./run-termination-7xcnysfe.js";
import { t as getSessionBindingService } from "./session-binding-service-DW9rA35s.js";
import { d as isPluginOwnedSessionBindingRecord } from "./conversation-binding-BSvU9WdK.js";
import { a as shouldComputeCommandAuthorized } from "./command-detection-5NC1E5MR.js";
import { n as resolveAgentTimeoutMs } from "./timeout-BEGWfRGM.js";
import { h as isReplyRunAbortableForSignal, w as replyRunRegistry } from "./reply-run-registry-tXvcNkN4.js";
import { f as listActiveEmbeddedRunSessionIds } from "./run-state-ewY1D1VR.js";
import "./sessions-CBo4LOdS.js";
import { s as resolveSessionWorkStartError } from "./lifecycle-CeMojaXs.js";
import { n as resolveSessionResetType, t as resolveChannelResetConfig } from "./reset--HEclQZS.js";
import { i as stripInlineDirectiveTagsForDisplay, n as sanitizeReplyDirectiveId, r as stripInlineDirectiveTagsForDelivery, t as parseInlineDirectives } from "./directive-tags-XkukyPkv.js";
import { o as readSessionMessageByIdAsync } from "./session-transcript-readers-O3pZVV3x.js";
import { n as resolveSessionModelRef } from "./session-model-ref-SCzh_dh2.js";
import { M as resolveGatewayModelSupportsImages, O as resolveDeletedAgentIdFromSessionKey, S as loadSessionEntry } from "./session-utils-row-BDvhdN3C.js";
import { u as normalizeInputProvenance } from "./input-provenance-CYGbY89H.js";
import "./session-utils-C8yYh4dv.js";
import "./reply-payload-BE_j43tQ.js";
import { a as resolveSendableOutboundReplyParts } from "./reply-payload-parts-Djg03PGA.js";
import { s as normalizeMediaReferenceForComparison } from "./reply-payloads-dedupe-CrDHl82Z.js";
import { t as findRestartRecoveryUnsafeChatAdmissionHook } from "./restart-recovery-hook-safety-D4F8bLYO.js";
import { n as resolveSendPolicy } from "./send-policy-BKJvZqJK.js";
import { a as createUserTurnTranscriptRecorder, i as buildRunUserTurnIdempotencyKey } from "./user-turn-transcript-Cd8sokau.js";
import { n as getAgentScopedMediaLocalRoots, t as appendLocalMediaParentRoots } from "./local-roots-DY1lg2k6.js";
import { n as assertLocalMediaAllowed, t as LocalMediaAccessError } from "./local-media-access-CY0b9tnn.js";
import { n as runAgentHarnessBeforeMessageWriteHook } from "./hook-helpers-CMmIshEb.js";
import { n as resolveSessionEntryResetFreshness } from "./entry-freshness-DBBZM9T5.js";
import { t as ensureSandboxWorkspaceForSession } from "./context-C139Uthy.js";
import { t as projectChatDisplayMessage } from "./chat-display-projection-BmOZbWDY.js";
import { n as isSuppressedControlReplyText } from "./control-reply-text-BXkKqW89.js";
import { i as dispatchInboundMessageWithProjectedDispatcher } from "./dispatch-hZ9KEJkT.js";
import { t as chatAbortMarkerTimestampMs } from "./server-chat-state-C8AVcQU8.js";
import { f as updateChatRunProvider, o as isChatStopCommandText, s as registerChatAbortController, u as resolveChatRunExpiresAtMs } from "./chat-abort-S5cQPsk-.js";
import { a as registerQueuedChatTurn, o as retireQueuedChatTurnCancellation, r as completeQueuedChatTurn } from "./chat-queued-turns-DWyXqGgL.js";
import { t as createChannelReplyPipeline } from "./reply-pipeline-BQrk7YNC.js";
import { n as isBtwRequestText } from "./btw-command-CsPaWKYu.js";
import { t as formatForLog } from "./ws-log-B1D_Y86r.js";
import "./channel-outbound-CmmtM-MH.js";
import { n as createReplyMediaPathNormalizer } from "./reply-media-paths.runtime-jUsRBQ4y.js";
import { n as pendingChatSendDedupeKey, t as PENDING_CHAT_SEND_DEDUPE_PREFIX } from "./server-shared-C-7Ahu3n.js";
import { t as setGatewayDedupeEntry } from "./agent-job-CpqqlG4n.js";
import { I as writePreRegisteredChatAbort, L as normalizeOptionalChatText, M as readPreRegisteredRun, N as resolveChatAbortRequester, R as normalizeUnknownChatText, S as sanitizeAssistantDisplayText, T as buildAbortedChatSendPayload, _ as hasManagedOutgoingAssistantContent, b as isMediaBearingPayload, c as publishAssistantTranscriptRewrite, d as rewriteSourceReplyTranscriptMirrors, f as buildAssistantDisplayContentFromReplyPayloads, g as hasAssistantDisplayMediaContent, h as extractAssistantDisplayTextFromContent, i as ensureChatQueuedTurns, l as rewriteAssistantTranscriptMessageByIdempotencyKey, m as extractAssistantDisplayText, o as appendAssistantTranscriptMessage, p as combineNonStreamingReplyParts, r as createChatAbortOps, s as assistantTranscriptScope, t as abortChatRunsForSessionKeyWithPartials, u as rewriteAssistantTranscriptMessageByTurnIndexAndMedia, v as hasSensitiveMediaPayload, w as stripManagedOutgoingAssistantContentBlocks, x as replaceAssistantContentTextBlocks, y as hasVisibleAssistantFinalMessage } from "./chat-abort-runtime-CEgNlbhw.js";
import { a as attachManagedOutgoingMediaToMessage } from "./managed-image-attachments-0dbUMcQF.js";
import { n as hasTrackedActiveSessionRun } from "./session-active-runs-CVvKRMMT.js";
import { t as stageSandboxMedia } from "./stage-sandbox-media-BIF4QQf7.js";
import { n as resolveChatAttachmentMaxBytes } from "./chat-attachment-policy-DrGl1Ors.js";
import { a as parseMessageWithAttachments, i as logAttachmentFailure, n as MediaOffloadError, o as persistInboundImagesForTranscript, r as UnsupportedAttachmentError, s as stripImageMediaMarkers, t as normalizeRpcAttachmentsToChatAttachments } from "./attachment-normalize-DxgB64C2.js";
import { i as maybeGenerateDashboardSessionTitle, r as isDashboardSessionTitleCandidate } from "./dashboard-session-title-BwkOHl31.js";
import { _ as gatewayClientSenderFields } from "./session-sharing-C3cQJ56a.js";
import { t as emitSessionsChanged } from "./session-change-event-B3NeuBYI.js";
import { i as persistGatewaySessionLifecycleEvent } from "./session-lifecycle-state-BoFtWO_a.js";
import { n as resolveAssistantIdentity } from "./assistant-identity-D3UsKBOR.js";
import { n as resolveOperatorSessionCreation } from "./session-creation-provenance-CX5dCIoC.js";
import { createHash, createHmac, randomUUID } from "node:crypto";
import path from "node:path";
import { performance as performance$1 } from "node:perf_hooks";
//#region src/gateway/server-methods/chat-broadcast.ts
function nextChatSeq(context, runId) {
	const next = (context.agentRunSeq.get(runId) ?? 0) + 1;
	context.agentRunSeq.set(runId, next);
	return next;
}
function resolveGlobalAwareNodeChatDeliveryKeys(params) {
	if (params.sessionKey !== "global") return [params.sessionKey];
	const defaultAgentId = resolveDefaultAgentId(params.cfg);
	const scopedAgentId = params.agentId ?? defaultAgentId;
	const keys = [`agent:${scopedAgentId}:global`];
	if (scopedAgentId === defaultAgentId) keys.push("global");
	return keys;
}
function sendGlobalAwareNodeChatPayload(params) {
	const deliveryKeys = resolveGlobalAwareNodeChatDeliveryKeys({
		cfg: params.context.getRuntimeConfig?.() ?? {},
		sessionKey: params.sessionKey,
		agentId: params.agentId
	});
	for (const deliveryKey of deliveryKeys) params.context.nodeSendToSession(deliveryKey, params.event, params.payload);
}
function broadcastChatFinal(params) {
	const seq = nextChatSeq(params.context, params.runId);
	const payloadAgentId = params.sessionKey === "global" ? params.agentId : void 0;
	const payload = {
		runId: params.runId,
		sessionKey: params.sessionKey,
		...payloadAgentId ? { agentId: payloadAgentId } : {},
		seq,
		state: "final",
		message: projectChatDisplayMessage(params.message)
	};
	params.context.broadcast("chat", payload, { sessionKeys: resolveGlobalAwareNodeChatDeliveryKeys({
		cfg: params.context.getRuntimeConfig?.() ?? {},
		sessionKey: params.sessionKey,
		agentId: payloadAgentId
	}) });
	sendGlobalAwareNodeChatPayload({
		context: params.context,
		sessionKey: params.sessionKey,
		agentId: payloadAgentId,
		event: "chat",
		payload
	});
	params.context.agentRunSeq.delete(params.runId);
}
function isBtwReplyPayload(payload) {
	return typeof payload?.btw?.question === "string" && payload.btw.question.trim().length > 0 && typeof payload.text === "string" && payload.text.trim().length > 0;
}
function broadcastSideResult(params) {
	const seq = nextChatSeq(params.context, params.payload.runId);
	const payloadAgentId = params.payload.sessionKey === "global" ? params.payload.agentId : void 0;
	const payload = {
		...params.payload,
		...payloadAgentId ? { agentId: payloadAgentId } : {},
		seq
	};
	params.context.broadcast("chat.side_result", payload, { sessionKeys: resolveGlobalAwareNodeChatDeliveryKeys({
		cfg: params.context.getRuntimeConfig?.() ?? {},
		sessionKey: params.payload.sessionKey,
		agentId: payloadAgentId
	}) });
	sendGlobalAwareNodeChatPayload({
		context: params.context,
		sessionKey: params.payload.sessionKey,
		agentId: payloadAgentId,
		event: "chat.side_result",
		payload
	});
}
function broadcastChatError(params) {
	const seq = nextChatSeq(params.context, params.runId);
	const payloadAgentId = params.sessionKey === "global" ? params.agentId : void 0;
	const payload = {
		runId: params.runId,
		sessionKey: params.sessionKey,
		...payloadAgentId ? { agentId: payloadAgentId } : {},
		seq,
		state: "error",
		errorMessage: params.errorMessage
	};
	params.context.broadcast("chat", payload, { sessionKeys: resolveGlobalAwareNodeChatDeliveryKeys({
		cfg: params.context.getRuntimeConfig?.() ?? {},
		sessionKey: params.sessionKey,
		agentId: payloadAgentId
	}) });
	sendGlobalAwareNodeChatPayload({
		context: params.context,
		sessionKey: params.sessionKey,
		agentId: payloadAgentId,
		event: "chat",
		payload
	});
	params.context.agentRunSeq.delete(params.runId);
}
function isSourceReplyTranscriptMirrorPayload(payload) {
	return Boolean(payload && getReplyPayloadMetadata(payload)?.sourceReplyTranscriptMirror);
}
//#endregion
//#region src/gateway/chat-input-sanitize.ts
const DISALLOWED_CHAT_CONTROL_RANGE = `${String.fromCharCode(0)}-${String.fromCharCode(8)}${String.fromCharCode(11)}${String.fromCharCode(12)}${String.fromCharCode(14)}-${String.fromCharCode(31)}${String.fromCharCode(127)}`;
const DISALLOWED_CHAT_CONTROL_RE = new RegExp(`[${DISALLOWED_CHAT_CONTROL_RANGE}]`, "g");
/** Drop disallowed control characters while preserving tab, line breaks, and Unicode. */
function stripDisallowedChatControlChars(message) {
	return message.replace(DISALLOWED_CHAT_CONTROL_RE, "");
}
/** Normalize chat text and reject null bytes before routing to channels. */
function sanitizeChatSendMessageInput(message) {
	const normalized = message.normalize("NFC");
	if (normalized.includes("\0")) return {
		ok: false,
		error: "message must not contain null bytes"
	};
	return {
		ok: true,
		message: stripDisallowedChatControlChars(normalized)
	};
}
//#endregion
//#region src/gateway/server-methods/chat-origin-routing.ts
const CHANNEL_AGNOSTIC_SESSION_SCOPES = /* @__PURE__ */ new Set([
	"main",
	"direct",
	"dm",
	"group",
	"channel",
	"cron",
	"run",
	"subagent",
	"acp",
	"thread",
	"topic"
]);
const CHANNEL_SCOPED_SESSION_SHAPES = /* @__PURE__ */ new Set([
	"direct",
	"dm",
	"group",
	"channel"
]);
function normalizeOptionalText(value) {
	const trimmed = value?.trim();
	return trimmed ? trimmed : void 0;
}
function normalizeExplicitChatSendOrigin(params) {
	const originatingChannel = normalizeOptionalText(params.originatingChannel);
	const originatingTo = normalizeOptionalText(params.originatingTo);
	const accountId = normalizeOptionalText(params.accountId);
	const messageThreadId = normalizeOptionalText(params.messageThreadId);
	if (!Boolean(originatingChannel || originatingTo || accountId || messageThreadId)) return { ok: true };
	const normalizedChannel = normalizeMessageChannel(originatingChannel);
	if (!normalizedChannel) return {
		ok: false,
		error: "originatingChannel is required when using originating route fields"
	};
	if (!originatingTo) return {
		ok: false,
		error: "originatingTo is required when using originating route fields"
	};
	return {
		ok: true,
		value: {
			originatingChannel: normalizedChannel,
			originatingTo,
			...accountId ? { accountId } : {},
			...messageThreadId ? { messageThreadId } : {}
		}
	};
}
function validateChatSelectedAgent(params) {
	const agentId = params.agentId ? normalizeAgentId(params.agentId) : void 0;
	if (!agentId) return { ok: true };
	if (!listAgentIds(params.cfg).includes(agentId)) return {
		ok: false,
		error: `Unknown agent id "${params.agentId}"`
	};
	const requestedSessionKey = params.requestedSessionKey.trim();
	const parsed = parseAgentSessionKey(requestedSessionKey);
	if (parsed && normalizeAgentId(parsed.agentId) !== agentId) return {
		ok: false,
		error: `agentId "${params.agentId}" does not match session key "${params.requestedSessionKey}"`
	};
	if (requestedSessionKey.toLowerCase() === "global") return {
		ok: true,
		agentId
	};
	if (resolveSessionStoreKey({
		cfg: params.cfg,
		sessionKey: requestedSessionKey
	}) === "global") return {
		ok: true,
		agentId
	};
	if (!parsed || normalizeAgentId(parsed.agentId) !== agentId) return {
		ok: false,
		error: `agentId "${params.agentId}" does not match session key "${params.requestedSessionKey}"`
	};
	return {
		ok: true,
		agentId
	};
}
function resolveRequestedChatAgentId(params) {
	const explicitAgentId = normalizeOptionalText(params.agentId);
	if (explicitAgentId) return normalizeAgentId(explicitAgentId);
	if (!params.cfg) return;
	const parsed = parseAgentSessionKey(params.requestedSessionKey.trim());
	if (!parsed?.agentId || resolveSessionStoreKey({
		cfg: params.cfg,
		sessionKey: params.requestedSessionKey
	}) !== "global") return;
	return normalizeAgentId(parsed.agentId);
}
function resolveChatSendActiveScopeKey(params) {
	if (params.sessionKey !== "global" || !params.agentId) return params.sessionKey;
	return scopeLegacySessionKeyToAgent({
		agentId: params.agentId,
		sessionKey: params.sessionKey,
		mainKey: params.mainKey
	}) ?? params.sessionKey;
}
function resolveChatSendOriginatingRoute(params) {
	if (params.explicitOrigin?.originatingChannel && params.explicitOrigin.originatingTo) return {
		originatingChannel: params.explicitOrigin.originatingChannel,
		originatingTo: params.explicitOrigin.originatingTo,
		...params.explicitOrigin.accountId ? { accountId: params.explicitOrigin.accountId } : {},
		...params.explicitOrigin.messageThreadId ? { messageThreadId: params.explicitOrigin.messageThreadId } : {},
		explicitDeliverRoute: params.deliver === true
	};
	if (params.deliver !== true) return {
		originatingChannel: INTERNAL_MESSAGE_CHANNEL,
		explicitDeliverRoute: false
	};
	const sessionDeliveryContext = deliveryContextFromSession(params.entry);
	const sessionOrigin = sessionDeliveryOrigin(params.entry);
	const routeChannelCandidate = normalizeMessageChannel(sessionDeliveryContext?.channel ?? sessionOrigin?.provider);
	const routeToCandidate = sessionDeliveryContext?.to;
	const routeAccountIdCandidate = sessionDeliveryContext?.accountId ?? sessionOrigin?.accountId;
	const routeThreadIdCandidate = sessionDeliveryContext?.threadId ?? sessionOrigin?.threadId;
	if (params.sessionKey.length > 512) return {
		originatingChannel: INTERNAL_MESSAGE_CHANNEL,
		explicitDeliverRoute: false
	};
	const sessionScopeParts = (parseAgentSessionKey(params.sessionKey)?.rest ?? params.sessionKey).split(":", 3).filter(Boolean);
	const sessionScopeHead = sessionScopeParts[0];
	const sessionChannelHint = normalizeMessageChannel(sessionScopeHead);
	const normalizedSessionScopeHead = (sessionScopeHead ?? "").trim().toLowerCase();
	const sessionPeerShapeCandidates = [sessionScopeParts[1], sessionScopeParts[2]].map((part) => (part ?? "").trim().toLowerCase()).filter(Boolean);
	const isChannelAgnosticSessionScope = CHANNEL_AGNOSTIC_SESSION_SCOPES.has(normalizedSessionScopeHead);
	const isChannelScopedSession = sessionPeerShapeCandidates.some((part) => CHANNEL_SCOPED_SESSION_SHAPES.has(part));
	const hasLegacyChannelPeerShape = !isChannelScopedSession && typeof sessionScopeParts[1] === "string" && sessionChannelHint === routeChannelCandidate;
	const isFromWebchatClient = isWebchatClient(params.client);
	const isFromGatewayCliClient = isGatewayCliClient(params.client);
	const hasClientMetadata = typeof params.client?.mode === "string" && params.client.mode.trim().length > 0 || typeof params.client?.id === "string" && params.client.id.trim().length > 0;
	const configuredMainKey = (params.mainKey ?? "main").trim().toLowerCase();
	const canInheritConfiguredMainRoute = normalizedSessionScopeHead.length > 0 && normalizedSessionScopeHead === configuredMainKey && params.hasConnectedClient && (isFromGatewayCliClient || !hasClientMetadata);
	if (!(Boolean(!isFromWebchatClient && sessionChannelHint && sessionChannelHint !== "webchat" && (!isChannelAgnosticSessionScope && (isChannelScopedSession || hasLegacyChannelPeerShape) || canInheritConfiguredMainRoute)) && routeChannelCandidate && routeChannelCandidate !== "webchat" && typeof routeToCandidate === "string" && routeToCandidate.trim().length > 0)) return {
		originatingChannel: INTERNAL_MESSAGE_CHANNEL,
		explicitDeliverRoute: false
	};
	return {
		originatingChannel: routeChannelCandidate,
		originatingTo: routeToCandidate,
		accountId: routeAccountIdCandidate,
		messageThreadId: routeThreadIdCandidate,
		explicitDeliverRoute: true
	};
}
function isAcpSessionKey(sessionKey) {
	return Boolean(sessionKey?.split(":").includes("acp"));
}
function explicitOriginTargetsAcpSession(origin) {
	if (!origin?.originatingChannel || !origin.originatingTo || !origin.accountId) return false;
	const channel = normalizeMessageChannel(origin.originatingChannel);
	if (!channel || channel === "webchat") return false;
	return isAcpSessionKey(getSessionBindingService().resolveByConversation({
		channel,
		accountId: origin.accountId,
		conversationId: origin.originatingTo
	})?.targetSessionKey);
}
function explicitOriginTargetsPluginBinding(origin) {
	if (!origin?.originatingChannel || !origin.originatingTo || !origin.accountId) return false;
	const channel = normalizeMessageChannel(origin.originatingChannel);
	if (!channel || channel === "webchat") return false;
	return isPluginOwnedSessionBindingRecord(getSessionBindingService().resolveByConversation({
		channel,
		accountId: origin.accountId,
		conversationId: origin.originatingTo
	}));
}
function normalizeOptionalChatSystemReceipt(value) {
	if (value == null) return { ok: true };
	if (typeof value !== "string") return {
		ok: false,
		error: "systemProvenanceReceipt must be a string"
	};
	const sanitized = sanitizeChatSendMessageInput(value);
	if (!sanitized.ok) return sanitized;
	return {
		ok: true,
		receipt: sanitized.message.trim() || void 0
	};
}
function isAcpBridgeClient(client) {
	const info = client?.connect?.client;
	return info?.id === GATEWAY_CLIENT_NAMES.CLI && info?.mode === GATEWAY_CLIENT_MODES.CLI && info?.displayName === "ACP" && info?.version === "acp";
}
function hasGatewayAdminScope(client) {
	return (Array.isArray(client?.connect?.scopes) ? client.connect.scopes : []).includes(ADMIN_SCOPE);
}
//#endregion
//#region src/gateway/server-methods/chat-restart-recovery.ts
const RESTART_SAFE_CHAT_REQUEST_VERIFIER_DOMAIN = "openclaw.chat.restart-retry.v1";
function hasRestartUnsafeMessageSemantics(rawMessage, cfg) {
	if (shouldComputeCommandAuthorized(rawMessage, cfg) || rawMessage.startsWith("/") || rawMessage.startsWith("!")) return true;
	const directives = parseInlineDirectives(rawMessage, {
		stripAudioTag: false,
		stripReplyTags: false
	});
	return directives.hasAudioTag || directives.hasReplyTag;
}
function fingerprintRestartSafeChatRequest(params) {
	const identity = loadOrCreateProcessDeviceIdentity();
	const digest = createHmac("sha256", identity.privateKeyPem).update(JSON.stringify([
		RESTART_SAFE_CHAT_REQUEST_VERIFIER_DOMAIN,
		params.message,
		params.senderIsOwner
	])).digest("hex");
	return `hmac-sha256:v1:${identity.deviceId}:${digest}`;
}
function createRestartSafeChatRequest(params) {
	if (!params.eligible || hasRestartUnsafeMessageSemantics(params.message, params.cfg)) return;
	return { fingerprint: fingerprintRestartSafeChatRequest({
		message: params.message,
		senderIsOwner: params.senderIsOwner
	}) };
}
function isRetryableUnadoptedChatClaim(entry, clientRunId) {
	return Boolean(entry && entry.abortedLastRun !== true && (entry.status === "failed" || entry.status === "killed") && entry.restartRecoveryDeliveryContext === void 0 && entry.restartRecoveryDeliveryRunId === clientRunId && entry.restartRecoveryDeliverySourceRunId === clientRunId && entry.restartRecoveryDeliveryRequestFingerprint);
}
function isAdoptedRestartRecoveryClaim(entry, clientRunId) {
	return Boolean(entry?.restartRecoveryDeliveryRunId && entry.restartRecoveryDeliverySourceRunId === clientRunId && !isRetryableUnadoptedChatClaim(entry, clientRunId));
}
async function resolveDurableChatClaim(params) {
	let entry = params.entry;
	if (isAdoptedRestartRecoveryClaim(entry, params.clientRunId) && entry.status === "running" && entry.abortedLastRun === true) {
		const recoverySessionError = resolveSessionWorkStartError(params.canonicalSessionKey, entry);
		if (recoverySessionError) return {
			kind: "rejected",
			message: recoverySessionError
		};
		if (!params.recoveryRuntime) return {
			kind: "pending",
			message: "accepted chat turn recovery is waiting for the Gateway runtime; retry"
		};
		try {
			const { retryRestartAbortedMainSessionRecovery } = await import("./main-session-restart-recovery-B_jlnGy5.js");
			await retryRestartAbortedMainSessionRecovery({
				canonicalSessionKey: params.canonicalSessionKey,
				cfg: params.cfg,
				expectedRecoveryRunId: entry.restartRecoveryDeliveryRunId,
				expectedRecoverySourceRunId: entry.restartRecoveryDeliverySourceRunId,
				expectedSessionId: entry.sessionId,
				sessionKey: params.persistedSessionKey,
				storePath: params.storePath,
				gatewayRuntime: params.recoveryRuntime
			});
		} catch (error) {
			params.warn(String(error));
		}
		entry = params.reloadEntry();
		if (isAdoptedRestartRecoveryClaim(entry, params.clientRunId) && entry.status === "running" && entry.abortedLastRun === true) return {
			kind: "pending",
			message: "accepted chat turn recovery is still pending; retry"
		};
		if (!isAdoptedRestartRecoveryClaim(entry, params.clientRunId) && !hasRestartRecoveryTerminalRun(entry, params.clientRunId)) return {
			kind: "rejected",
			message: "accepted chat turn recovery ownership changed; automatic retry stopped to avoid duplicate execution",
			unavailable: true
		};
	}
	return isAdoptedRestartRecoveryClaim(entry, params.clientRunId) || hasRestartRecoveryTerminalRun(entry, params.clientRunId) ? { kind: "accepted" } : {
		kind: "continue",
		entry
	};
}
function isRestartSafeChatSession(params) {
	const entry = params.entry;
	return Boolean(entry?.sessionId && params.sessionKey !== "global" && entry.status !== "running" && entry.abortedLastRun !== true && entry.archivedAt === void 0 && entry.initializationPending !== true && entry.pendingFinalDelivery === void 0 && entry.agentHarnessId === void 0 && entry.pluginOwnerId === void 0 && entry.spawnedBy === void 0 && entry.subagentRole === void 0 && (entry.spawnDepth ?? 0) === 0 && entry.acp === void 0 && entry.cronRunContinuation === void 0 && !isSubagentSessionKey(params.sessionKey) && !isCronSessionKey(params.sessionKey) && !isAcpSessionKey$1(params.sessionKey) && !isAgentHarnessSessionKey(params.sessionKey) && (params.requestedSessionId === void 0 || params.requestedSessionId === entry.sessionId));
}
function hasRestartUnsafeChatWork(params) {
	if (findRestartRecoveryUnsafeChatAdmissionHook() !== void 0 || listActiveEmbeddedRunSessionIds().includes(params.sessionId) || replyRunRegistry.isActive(params.sessionKey)) return true;
	for (const active of params.context.chatAbortControllers.values()) if (active.sessionKey === params.sessionKey || active.sessionId === params.sessionId) return true;
	for (const queued of params.context.chatQueuedTurns?.values() ?? []) if (queued.sessionKey === params.sessionKey || queued.sessionId === params.sessionId) return true;
	return false;
}
function resolveRestartSafeChatAdmission(params) {
	const request = params.request;
	const entry = params.entry;
	if (!request || !entry || !isRestartSafeChatSession(params) || resolveSessionEntryResetFreshness({
		agentId: params.agentId,
		now: params.now,
		resetOverride: resolveChannelResetConfig({
			sessionCfg: params.cfg.session,
			channel: sessionDeliveryChannel(params.entry)
		}),
		resetType: resolveSessionResetType({ sessionKey: params.sessionKey }),
		sessionCfg: params.cfg.session,
		sessionKey: params.sessionKey,
		storePath: params.storePath
	}).state !== "fresh" || hasRestartUnsafeChatWork(params)) return;
	const retryableClaim = isRetryableUnadoptedChatClaim(entry, params.clientRunId);
	if (retryableClaim && entry.restartRecoveryDeliveryRequestFingerprint !== request.fingerprint) throw new Error("chat retry does not match its durable admission");
	const mainRestartRecovery = entry.mainRestartRecovery;
	return {
		requestFingerprint: request.fingerprint,
		...retryableClaim ? { retryExpectedState: {
			abortedLastRun: entry.abortedLastRun,
			mainRestartRecoveryCycleId: mainRestartRecovery?.cycleId,
			mainRestartRecoveryRevision: mainRestartRecovery?.revision,
			restartRecoveryBeforeAgentReplyState: entry.restartRecoveryBeforeAgentReplyState,
			restartRecoveryDeliveryReceiptState: entry.restartRecoveryDeliveryReceiptState,
			restartRecoveryDeliveryToolCallId: entry.restartRecoveryDeliveryToolCallId,
			restartRecoveryDeliveryRequestFingerprint: entry.restartRecoveryDeliveryRequestFingerprint,
			restartRecoveryDeliveryRunId: entry.restartRecoveryDeliveryRunId,
			restartRecoveryDeliverySourceRunId: entry.restartRecoveryDeliverySourceRunId,
			restartRecoveryRequesterAccountId: entry.restartRecoveryRequesterAccountId,
			restartRecoveryRequesterSenderId: entry.restartRecoveryRequesterSenderId,
			restartRecoverySameChannelThreadRequired: entry.restartRecoverySameChannelThreadRequired,
			restartRecoverySourceIngress: entry.restartRecoverySourceIngress,
			restartRecoverySourceReplyDeliveryMode: entry.restartRecoverySourceReplyDeliveryMode,
			restartRecoveryTerminalRunIds: entry.restartRecoveryTerminalRunIds,
			status: entry.status
		} } : entry.restartRecoveryDeliverySourceRunId ? { priorTerminalSourceRunId: entry.restartRecoveryDeliverySourceRunId } : {}
	};
}
function buildRestartSafeChatTranscriptState(params) {
	return {
		...params.admission.retryExpectedState ? { expectedSessionState: params.admission.retryExpectedState } : {},
		sessionLifecyclePatch: {
			restartRecoveryBeforeAgentReplyState: "admitted",
			restartRecoveryDeliveryReceiptState: void 0,
			restartRecoveryDeliveryToolCallId: void 0,
			status: "running",
			startedAt: params.startedAt,
			endedAt: void 0,
			restartRecoveryDeliveryContext: void 0,
			restartRecoveryDeliveryRequestFingerprint: params.admission.requestFingerprint,
			restartRecoveryDeliveryRunId: params.clientRunId,
			restartRecoveryDeliverySourceRunId: params.clientRunId,
			restartRecoveryRequesterAccountId: void 0,
			restartRecoveryRequesterSenderId: void 0,
			restartRecoverySameChannelThreadRequired: void 0,
			restartRecoverySourceIngress: "control-ui",
			restartRecoverySourceReplyDeliveryMode: void 0,
			...params.admission.priorTerminalSourceRunId ? { restartRecoveryTerminalRunIds: [params.admission.priorTerminalSourceRunId] } : {},
			runtimeMs: void 0,
			abortedLastRun: false,
			updatedAt: params.startedAt
		}
	};
}
async function terminalizeRestartSafeChatAdmission(params) {
	const endedAt = Date.now();
	let terminalized = false;
	await patchSqliteSessionEntry({
		sessionKey: params.sessionKey,
		storePath: params.storePath
	}, (current) => {
		if (current.sessionId !== params.admittedSessionId || current.restartRecoveryDeliveryRunId !== params.clientRunId) return null;
		terminalized = true;
		return {
			abortedLastRun: params.retryable ? false : params.status === "killed",
			endedAt,
			...params.retryable ? {} : buildRestartRecoveryClaimCleanupPatch({
				entry: current,
				recordTerminalSource: true,
				terminalSourceRunId: current.restartRecoveryDeliverySourceRunId
			}),
			runtimeMs: Math.max(0, endedAt - params.startedAt),
			status: params.status,
			updatedAt: endedAt
		};
	}, {
		requireWriteSuccess: true,
		skipMaintenance: true
	});
	return terminalized;
}
//#endregion
//#region src/gateway/server-methods/chat-server-timing.ts
function roundedChatSendTimingMs(value) {
	return Math.max(0, Math.round(value * 1e3) / 1e3);
}
function chatSendAckServerTimingAttributes(timing) {
	if (!timing) return {};
	return {
		serverReceivedToAckMs: timing.receivedToAckMs,
		serverLoadSessionMs: timing.loadSessionMs,
		...timing.prepareAttachmentsMs !== void 0 ? { serverPrepareAttachmentsMs: timing.prepareAttachmentsMs } : {}
	};
}
function shouldIncludeChatSendAckServerTiming(client) {
	return isOperatorUiClient(client);
}
const CONTROL_UI_RECONNECT_RESUME_PARAM = "__controlUiReconnectResume";
function resolveControlUiReconnectResumeParams(params, clientInfo) {
	if (!params || typeof params !== "object" || Array.isArray(params)) return {
		params,
		resumeRequested: false
	};
	const record = params;
	if (!(record[CONTROL_UI_RECONNECT_RESUME_PARAM] === true && isOperatorUiClient(clientInfo))) return {
		params,
		resumeRequested: false
	};
	const validatedParams = { ...record };
	delete validatedParams[CONTROL_UI_RECONNECT_RESUME_PARAM];
	return {
		params: validatedParams,
		resumeRequested: true
	};
}
function emitOperatorChatSendServerTiming(params) {
	const connId = typeof params.client?.connId === "string" && params.client.connId.trim() ? params.client.connId.trim() : void 0;
	if (!connId || !isOperatorUiClient(params.client?.connect?.client)) return;
	const nowMs = performance.now();
	params.context.broadcastToConnIds("chat.send_timing", {
		phase: params.phase,
		runId: params.runId,
		sessionKey: params.sessionKey,
		...params.agentId ? { agentId: params.agentId } : {},
		ackToPhaseMs: roundedChatSendTimingMs(nowMs - params.ackedAtMs),
		receivedToPhaseMs: roundedChatSendTimingMs(nowMs - params.receivedAtMs),
		...params.dispatchStartedAtMs !== void 0 ? { dispatchStartedToPhaseMs: roundedChatSendTimingMs(nowMs - params.dispatchStartedAtMs) } : {},
		...params.extra
	}, /* @__PURE__ */ new Set([connId]), { dropIfSlow: true });
}
//#endregion
//#region src/gateway/server-methods/chat-send-attachments.ts
function isPdfOffloadedRef(ref) {
	const mime = ref.mimeType.trim().toLowerCase();
	if (mime === "application/pdf" || mime.endsWith("+pdf")) return true;
	return path.extname(ref.path.split(/[?#]/u)[0] ?? "").toLowerCase() === ".pdf";
}
function isManagedInboundPdfOffloadRef(ref) {
	if (!isPdfOffloadedRef(ref)) return false;
	try {
		return parseInboundMediaUri(ref.mediaRef) !== null;
	} catch {
		return false;
	}
}
function shouldPassThroughManagedInboundPdfOffloadRef(ref) {
	return ref.sizeBytes > 5242880 && isManagedInboundPdfOffloadRef(ref);
}
async function prestageMediaPathOffloads(params) {
	const mediaPathRefs = params.offloadedRefs.filter((ref) => params.includeImageRefs || !ref.mimeType.startsWith("image/"));
	if (mediaPathRefs.length === 0) return {
		paths: [],
		types: []
	};
	const refsByManagedPath = (refs) => ({
		paths: refs.map((ref) => ref.path),
		types: refs.map((ref) => ref.mimeType)
	});
	const passThroughRefs = [];
	const refsToStage = [];
	for (const ref of mediaPathRefs) (shouldPassThroughManagedInboundPdfOffloadRef(ref) ? passThroughRefs : refsToStage).push(ref);
	if (refsToStage.length === 0) return refsByManagedPath(mediaPathRefs);
	try {
		const workspaceDir = resolveAgentWorkspaceDir(params.cfg, params.agentId);
		const sandbox = await ensureSandboxWorkspaceForSession({
			config: params.cfg,
			sessionKey: params.sessionKey,
			workspaceDir
		});
		if (!sandbox) return refsByManagedPath(mediaPathRefs);
		const oversizedForSandbox = refsToStage.filter((ref) => ref.sizeBytes > MEDIA_MAX_BYTES);
		if (oversizedForSandbox.length > 0) throw new UnsupportedAttachmentError("non-image-too-large-for-sandbox", `attachments exceed sandbox staging limit (${MEDIA_MAX_BYTES} bytes): ${oversizedForSandbox.map((ref) => `${ref.label} (${ref.sizeBytes} bytes)`).join(", ")}`);
		const stagingCtx = { media: refsToStage.map((ref) => ({
			path: ref.path,
			contentType: ref.mimeType
		})) };
		let stageResult;
		try {
			stageResult = await stageSandboxMedia({
				ctx: stagingCtx,
				sessionCtx: stagingCtx,
				cfg: params.cfg,
				sessionKey: params.sessionKey,
				workspaceDir
			});
		} catch (stageErr) {
			if (refsToStage.some((ref) => !isManagedInboundPdfOffloadRef(ref))) throw stageErr;
			return refsByManagedPath(mediaPathRefs);
		}
		const stagedSources = stageResult.staged;
		const unstageable = refsToStage.filter((_ref, index) => !stagedSources.has(index)).filter((ref) => !isManagedInboundPdfOffloadRef(ref));
		if (unstageable.length > 0) throw new Error(`attachment staging incomplete: ${stagedSources.size}/${refsToStage.length} paths staged into sandbox workspace (missing: ${unstageable.map((ref) => ref.path).join(", ")})`);
		const stagedMedia = stagingCtx.media ?? [];
		const resolvedByRef = /* @__PURE__ */ new Map();
		refsToStage.forEach((ref, index) => {
			resolvedByRef.set(ref, {
				path: stagedMedia[index]?.path ?? ref.path,
				mimeType: stagedMedia[index]?.contentType ?? ref.mimeType
			});
		});
		for (const ref of passThroughRefs) resolvedByRef.set(ref, {
			path: ref.path,
			mimeType: ref.mimeType
		});
		const ordered = mediaPathRefs.map((ref) => resolvedByRef.get(ref) ?? {
			path: ref.path,
			mimeType: ref.mimeType
		});
		return {
			paths: ordered.map((entry) => entry.path),
			types: ordered.map((entry) => entry.mimeType),
			workspaceDir: sandbox.workspaceDir
		};
	} catch (err) {
		await Promise.allSettled(params.offloadedRefs.map((ref) => deleteMediaBuffer(ref.id, "inbound")));
		if (err instanceof MediaOffloadError || err instanceof UnsupportedAttachmentError) throw err;
		throw new MediaOffloadError(`[Gateway Error] Failed to stage attachments into agent workspace: ${formatErrorMessage(err)}`, { cause: err });
	}
}
/** Parse and pre-stage attachments before the caller's synchronous pre-ACK checks. */
async function prepareChatSendAttachments(params) {
	const { request, session, admission, respond, context } = params;
	const { inboundMessage, normalizedAttachments, explicitOrigin } = request;
	const { cfg, sessionKey, agentId, resolvedSessionModel, clientRunId } = session;
	const { activeRunAbort, chatSendTraceAttributes, cleanupAdmittedRun, finishAbortedChatSend, lifecycleGeneration } = admission;
	let parsedMessage = inboundMessage;
	let parsedImages = [];
	let imageOrder = [];
	let offloadedRefs = [];
	let mediaPathOffloadPaths = [];
	let mediaPathOffloadTypes = [];
	let mediaPathOffloadWorkspaceDir;
	const explicitOriginTargetsPlugin = explicitOriginTargetsPluginBinding(explicitOrigin);
	let prepareAttachmentsMs;
	if (normalizedAttachments.length > 0) {
		const prepareAttachmentsStartedAtMs = performance$1.now();
		try {
			await measureDiagnosticsTimelineSpan("gateway.chat_send.prepare_attachments", async () => {
				const supportsImages = await resolveGatewayModelSupportsImages({
					loadGatewayModelCatalog: context.loadGatewayModelCatalog,
					loadGatewayModelCatalogSnapshot: context.loadGatewayModelCatalogSnapshot,
					agentId,
					provider: resolvedSessionModel.provider,
					model: resolvedSessionModel.model
				}) || explicitOriginTargetsAcpSession(explicitOrigin) || explicitOriginTargetsPlugin;
				const parsed = await parseMessageWithAttachments(inboundMessage, normalizedAttachments, {
					maxBytes: resolveChatAttachmentMaxBytes(cfg),
					log: context.logGateway,
					supportsImages,
					acceptNonImage: true
				});
				parsedMessage = supportsImages ? parsed.message : stripImageMediaMarkers(parsed.message, parsed.offloadedRefs);
				parsedImages = parsed.images;
				imageOrder = parsed.imageOrder;
				offloadedRefs = parsed.offloadedRefs;
				({paths: mediaPathOffloadPaths, types: mediaPathOffloadTypes, workspaceDir: mediaPathOffloadWorkspaceDir} = await prestageMediaPathOffloads({
					offloadedRefs,
					includeImageRefs: !supportsImages,
					cfg,
					sessionKey,
					agentId
				}));
			}, {
				phase: "agent-turn",
				config: cfg,
				attributes: {
					...chatSendTraceAttributes,
					attachmentCount: normalizedAttachments.length
				}
			});
			prepareAttachmentsMs = roundedChatSendTimingMs(performance$1.now() - prepareAttachmentsStartedAtMs);
		} catch (err) {
			if (activeRunAbort.controller.signal.aborted && context.chatRunState.hasAbortMarker(clientRunId)) {
				finishAbortedChatSend();
				return { ok: false };
			}
			cleanupAdmittedRun({ force: true });
			clearAgentRunContext(clientRunId, lifecycleGeneration);
			logAttachmentFailure(context.logGateway, "chat.send attachment parse/stage failed", err);
			respond(false, void 0, errorShape(err instanceof MediaOffloadError ? ErrorCodes.UNAVAILABLE : ErrorCodes.INVALID_REQUEST, String(err)));
			return { ok: false };
		}
	}
	return {
		ok: true,
		value: {
			explicitOriginTargetsPlugin,
			imageOrder,
			mediaPathOffloadPaths,
			mediaPathOffloadTypes,
			mediaPathOffloadWorkspaceDir,
			offloadedRefs,
			parsedImages,
			parsedMessage,
			prepareAttachmentsMs
		}
	};
}
//#endregion
//#region src/gateway/server-methods/chat-send-background.ts
function resolveWebchatPromptCacheKey(params) {
	return `openclaw-webchat-${createHash("sha256").update([
		"v1",
		params.provider.trim().toLowerCase(),
		params.model.trim(),
		normalizeAgentId(params.agentId),
		params.sessionKey
	].join("\0"), "utf8").digest("hex").slice(0, 32)}`;
}
function scheduleChatDashboardSessionTitle(params) {
	const titleSource = stripInlineDirectiveTagsForDisplay(params.rawMessage).text;
	if (!isDashboardSessionTitleCandidate({
		sessionKey: params.sessionKey,
		userMessage: titleSource
	})) return;
	runWithGatewayIndependentRootWorkContinuation(async () => {
		const titleEntry = params.entry?.sessionId === params.admittedSessionId ? params.entry : loadSessionEntry(params.sessionKey, params.sessionLoadOptions).entry;
		const titleSessionId = titleEntry?.sessionId;
		if (!titleSessionId) return;
		if (await maybeGenerateDashboardSessionTitle({
			cfg: params.cfg,
			agentId: params.agentId,
			entry: titleEntry,
			sessionId: titleSessionId,
			sessionKey: params.sessionKey,
			storePath: params.storePath,
			userMessage: titleSource
		})) emitSessionsChanged(params.context, {
			sessionKey: params.sessionKey,
			agentId: params.agentId,
			reason: "chat.title"
		});
	}).catch((err) => {
		params.context.logGateway.warn(`dashboard session title generation failed: ${formatForLog(err)}`);
	});
}
//#endregion
//#region src/gateway/server-methods/chat-send-dispatch-errors.ts
/** Own dispatch rejection projection and post-cleanup lifecycle persistence. */
function createChatSendDispatchErrorLifecycle(params) {
	const { admission, context, isQueuedFollowupEnqueued, persistUserTurnTranscript, session, terminalizeRestartSafeAdmission, userTurnRecorder } = params;
	const { activeRunAbort, cleanupAdmittedRun, lifecycleGeneration, restartSafeAdmission } = admission;
	const { agentId, backingSessionId, cfg, clientRunId, now, rawSessionKey, sessionKey } = session;
	let pendingDispatchLifecycleError;
	let persistDispatchErrorUserTurn;
	const handleError = async (err) => {
		const errorMessage = String(err);
		if (isQueuedFollowupEnqueued()) {
			context.logGateway.warn(`webchat dispatch failed after followup queue admission: ${formatForLog(err)}`);
			if (!context.chatRunState.hasAbortMarker(clientRunId)) {
				setGatewayDedupeEntry({
					dedupe: context.dedupe,
					key: `chat:${clientRunId}`,
					entry: {
						ts: Date.now(),
						ok: true,
						payload: {
							runId: clientRunId,
							status: "ok"
						}
					}
				});
				broadcastChatFinal({
					context,
					runId: clientRunId,
					sessionKey,
					agentId
				});
			}
			return;
		}
		const abortedAtDispatchReject = activeRunAbort.controller.signal.aborted;
		const abortMarkerAtDispatchReject = context.chatRunState.runs.get(clientRunId)?.abortMarker;
		const agentTerminalPersistenceOwnedAtDispatchReject = activeRunAbort.entry?.projectSessionTerminalPending === true || activeRunAbort.entry?.projectSessionTerminalPersistence !== void 0 || activeRunAbort.entry?.projectSessionTerminalPersisted === true;
		if (abortedAtDispatchReject && abortMarkerAtDispatchReject !== void 0) {
			const endedAt = chatAbortMarkerTimestampMs(abortMarkerAtDispatchReject);
			setGatewayDedupeEntry({
				dedupe: context.dedupe,
				key: `chat:${clientRunId}`,
				entry: {
					ts: endedAt,
					ok: true,
					payload: buildAbortedChatSendPayload({
						runId: clientRunId,
						stopReason: activeRunAbort.entry?.abortStopReason ?? "rpc",
						endedAt
					})
				}
			});
			context.logGateway.warn(`chat.send post-dispatch threw after abort for runId=${clientRunId}: ${formatForLog(err)}`);
			const shouldPersistUserTurn = !userTurnRecorder.hasPersisted() && !userTurnRecorder.isBlocked();
			const releaseAbortTranscriptRoot = shouldPersistUserTurn ? retainGatewayRootWorkAdmissionContinuation() : null;
			cleanupAdmittedRun();
			clearAgentRunContext(clientRunId, lifecycleGeneration);
			if (shouldPersistUserTurn) try {
				await persistUserTurnTranscript();
			} catch (transcriptError) {
				context.logGateway.warn(`webchat user transcript update failed after abort: ${formatForLog(transcriptError)}`);
			} finally {
				releaseAbortTranscriptRoot?.();
			}
			return;
		}
		context.chatRunState.deleteAbortMarker(clientRunId);
		if (agentTerminalPersistenceOwnedAtDispatchReject && activeRunAbort.entry) {
			activeRunAbort.entry.isAbortable = () => false;
			activeRunAbort.cleanup();
		} else activeRunAbort.cleanup({ force: true });
		let restartSafeDispatchFailureTerminalized = false;
		if (restartSafeAdmission && !agentTerminalPersistenceOwnedAtDispatchReject) {
			restartSafeDispatchFailureTerminalized = await terminalizeRestartSafeAdmission({
				retryable: true,
				status: "failed"
			}).catch((terminalizeError) => {
				context.logGateway.warn(`failed to release restart-safe chat admission after dispatch error: ${formatForLog(terminalizeError)}`);
				return false;
			});
			if (restartSafeDispatchFailureTerminalized) emitSessionsChanged(context, {
				sessionKey,
				...agentId ? { agentId } : {},
				reason: "chat.dispatch-error"
			});
		}
		persistDispatchErrorUserTurn = userTurnRecorder.hasPersisted() || userTurnRecorder.isBlocked() ? void 0 : async () => {
			await persistUserTurnTranscript();
		};
		if (!restartSafeDispatchFailureTerminalized && abortMarkerAtDispatchReject === void 0 && !agentTerminalPersistenceOwnedAtDispatchReject) pendingDispatchLifecycleError = {
			endedAt: Date.now(),
			error: errorMessage,
			sessionId: activeRunAbort.entry?.sessionId ?? backingSessionId ?? clientRunId,
			startedAt: activeRunAbort.entry?.startedAtMs ?? now
		};
		if (!agentTerminalPersistenceOwnedAtDispatchReject) {
			const error = errorShape(ErrorCodes.UNAVAILABLE, errorMessage);
			setGatewayDedupeEntry({
				dedupe: context.dedupe,
				key: `chat:${clientRunId}`,
				entry: {
					ts: Date.now(),
					ok: false,
					payload: {
						runId: clientRunId,
						status: "error",
						summary: errorMessage
					},
					error
				}
			});
			broadcastChatError({
				context,
				runId: clientRunId,
				sessionKey,
				agentId,
				errorMessage
			});
		}
	};
	const finalize = () => {
		const dispatchError = pendingDispatchLifecycleError;
		const releaseDispatchErrorRoot = dispatchError ? retainGatewayRootWorkAdmissionContinuation() : null;
		cleanupAdmittedRun();
		clearAgentRunContext(clientRunId, lifecycleGeneration);
		context.removeChatRun(clientRunId, clientRunId, sessionKey);
		if (!dispatchError) return;
		const persistDispatchLifecycleError = async () => {
			if (hasTrackedActiveSessionRun({
				context,
				requestedKey: rawSessionKey,
				canonicalKey: sessionKey,
				...sessionKey === "global" && agentId ? { agentId } : {},
				defaultAgentId: resolveDefaultAgentId(cfg)
			})) return;
			try {
				await persistGatewaySessionLifecycleEvent({
					sessionKey,
					...sessionKey === "global" && agentId ? { agentId } : {},
					event: {
						runId: clientRunId,
						sessionId: dispatchError.sessionId,
						lifecycleGeneration,
						ts: dispatchError.endedAt,
						data: {
							phase: "error",
							startedAt: dispatchError.startedAt,
							endedAt: dispatchError.endedAt,
							error: dispatchError.error
						}
					}
				});
				emitSessionsChanged(context, {
					sessionKey,
					...agentId ? { agentId } : {},
					reason: "chat.dispatch-error"
				});
			} catch (persistErr) {
				context.logGateway.warn(`webchat session lifecycle persist failed after error: ${formatForLog(persistErr)}`);
			}
		};
		(async () => {
			await persistDispatchLifecycleError();
			await persistDispatchErrorUserTurn?.().catch((transcriptErr) => {
				context.logGateway.warn(`webchat user transcript update failed after error: ${formatForLog(transcriptErr)}`);
			});
		})().catch((continuationErr) => {
			context.logGateway.warn(`webchat session lifecycle continuation failed: ${formatForLog(continuationErr)}`);
		}).finally(() => releaseDispatchErrorRoot?.());
	};
	return {
		finalize,
		handleError
	};
}
//#endregion
//#region src/gateway/server-methods/chat-reply-media.ts
function isDataUrlMedia(mediaUrl) {
	return mediaUrl.trim().toLowerCase().startsWith("data:");
}
function shouldPreserveDisplayMediaUrl(payload, mediaUrl) {
	if (isDataUrlMedia(mediaUrl)) return true;
	if (!isAudioFileName(mediaUrl)) return false;
	if (isPassThroughRemoteMediaSource(mediaUrl)) return true;
	return payload.trustedLocalMedia === true;
}
/** Normalize reply media paths for webchat display without leaking sensitive media. */
async function normalizeWebchatReplyMediaPathsForDisplay(params) {
	if (params.payloads.length === 0) return params.payloads;
	const workspaceDir = params.workspaceDir ?? resolveAgentWorkspaceDir(params.cfg, params.agentId);
	if (!workspaceDir) return params.payloads;
	const normalizeMediaPaths = createReplyMediaPathNormalizer({
		cfg: params.cfg,
		sessionKey: params.sessionKey,
		agentId: params.agentId,
		workspaceDir,
		accountId: params.accountId
	});
	const normalized = [];
	for (const payload of params.payloads) {
		if (payload.sensitiveMedia === true) {
			normalized.push(payload);
			continue;
		}
		const mediaUrls = resolveSendableOutboundReplyParts(payload).mediaUrls;
		if (!mediaUrls.some((mediaUrl) => shouldPreserveDisplayMediaUrl(payload, mediaUrl))) {
			normalized.push(await normalizeMediaPaths(payload));
			continue;
		}
		if (!mediaUrls.some((mediaUrl) => !shouldPreserveDisplayMediaUrl(payload, mediaUrl))) {
			normalized.push(payload);
			continue;
		}
		const mergedMediaUrls = [];
		const text = payload.text;
		for (const mediaUrl of mediaUrls) {
			if (shouldPreserveDisplayMediaUrl(payload, mediaUrl)) {
				mergedMediaUrls.push(mediaUrl);
				continue;
			}
			const normalizedMediaUrls = resolveSendableOutboundReplyParts(await normalizeMediaPaths({
				...payload,
				mediaUrl,
				mediaUrls: [mediaUrl]
			})).mediaUrls;
			if (normalizedMediaUrls.length === 0) continue;
			mergedMediaUrls.push(...normalizedMediaUrls);
		}
		normalized.push({
			...payload,
			text,
			mediaUrl: mergedMediaUrls[0],
			mediaUrls: mergedMediaUrls
		});
	}
	return normalized;
}
//#endregion
//#region src/gateway/server-methods/chat-send-command-replies.ts
function parseReplyInlineDirectives(payload) {
	return typeof payload.text === "string" && payload.text.includes("[[") ? parseInlineDirectives(payload.text) : void 0;
}
function replyMediaUrls(payload) {
	return resolveSendableOutboundReplyParts(payload).mediaUrls;
}
function replyMediaDedupeKeys(payload) {
	return replyMediaUrls(payload).map((mediaUrl) => normalizeMediaReferenceForComparison(mediaUrl));
}
function canonicalizeReplyMedia(payload) {
	const mediaUrls = replyMediaUrls(payload);
	return {
		...payload,
		mediaUrl: void 0,
		mediaUrls: mediaUrls.length > 0 ? mediaUrls : void 0
	};
}
function mergeDefinedReplySemantics(target, source) {
	const sourceInlineDirectives = parseReplyInlineDirectives(source);
	const sourceReplyToId = sanitizeReplyDirectiveId(source.replyToId) ?? sanitizeReplyDirectiveId(sourceInlineDirectives?.replyToExplicitId);
	return {
		...target,
		...source.trustedLocalMedia === true || target.trustedLocalMedia === true ? { trustedLocalMedia: true } : {},
		...source.sensitiveMedia === true || target.sensitiveMedia === true ? { sensitiveMedia: true } : {},
		...source.presentation !== void 0 ? { presentation: source.presentation } : {},
		...source.delivery !== void 0 ? { delivery: source.delivery } : {},
		...source.interactive !== void 0 ? { interactive: source.interactive } : {},
		...sourceReplyToId !== void 0 ? { replyToId: sourceReplyToId } : {},
		...source.replyToTag === true || target.replyToTag === true ? { replyToTag: true } : {},
		...source.replyToCurrent === true || sourceInlineDirectives?.replyToCurrent === true || target.replyToCurrent === true ? { replyToCurrent: true } : {},
		...source.audioAsVoice === true || sourceInlineDirectives?.audioAsVoice === true || target.audioAsVoice === true ? { audioAsVoice: true } : {},
		...source.spokenText !== void 0 ? { spokenText: source.spokenText } : {},
		...source.ttsSupplement !== void 0 ? { ttsSupplement: source.ttsSupplement } : {},
		...source.isError === true || target.isError === true ? { isError: true } : {},
		...source.channelData !== void 0 ? { channelData: source.channelData } : {}
	};
}
function mergeMediaReplySemantics(target, source) {
	const sourceInlineDirectives = parseReplyInlineDirectives(source);
	return {
		...target,
		...source.trustedLocalMedia === true || target.trustedLocalMedia === true ? { trustedLocalMedia: true } : {},
		...source.sensitiveMedia === true || target.sensitiveMedia === true ? { sensitiveMedia: true } : {},
		...source.audioAsVoice === true || sourceInlineDirectives?.audioAsVoice === true || target.audioAsVoice === true ? { audioAsVoice: true } : {}
	};
}
function hasMergeableReplySemantics(payload) {
	const inlineDirectives = parseReplyInlineDirectives(payload);
	return Boolean(payload.trustedLocalMedia !== void 0 || payload.sensitiveMedia !== void 0 || payload.presentation || payload.delivery || payload.interactive || payload.replyToId || payload.replyToTag !== void 0 || payload.replyToCurrent !== void 0 || payload.audioAsVoice !== void 0 || inlineDirectives?.hasReplyTag || inlineDirectives?.hasAudioTag || payload.spokenText || payload.ttsSupplement || payload.isError !== void 0 || payload.channelData);
}
function hasUnmergedReplySemantics(payload) {
	return Boolean(payload.isReasoning || payload.isReasoningSnapshot || payload.isCompactionNotice || payload.isFallbackNotice || payload.isStatusNotice || payload.btw);
}
function hasReplySemantics(payload) {
	return hasMergeableReplySemantics(payload) || hasUnmergedReplySemantics(payload);
}
function mediaSetsMatch(leftMediaUrls, rightMediaUrls) {
	if (leftMediaUrls.length !== rightMediaUrls.length) return false;
	return leftMediaUrls.every((mediaUrl, index) => mediaUrl === rightMediaUrls[index]);
}
function replyDisplayText(payload) {
	return sanitizeAssistantDisplayText(payload.text) ?? "";
}
/** Fold command block replies into the final payload list without duplicating text or media. */
function selectChatSendFinalReplyPayloads(params) {
	const { deliveredReplies, foldCommandBlocks, suppressReplies } = params;
	const finalPayloadEntries = deliveredReplies.filter((entry) => entry.kind === "final");
	const commandBlockPayloadEntriesForDelivery = (foldCommandBlocks ? deliveredReplies.filter((entry) => entry.kind === "block") : []).map((entry) => ({
		kind: entry.kind,
		payload: canonicalizeReplyMedia(entry.payload)
	}));
	const sensitiveMediaDedupeKeys = new Set(finalPayloadEntries.flatMap((entry) => entry.payload.sensitiveMedia === true ? replyMediaDedupeKeys(entry.payload).filter(Boolean) : []));
	if (sensitiveMediaDedupeKeys.size > 0) {
		for (const entry of commandBlockPayloadEntriesForDelivery) if (replyMediaDedupeKeys(entry.payload).some((key) => sensitiveMediaDedupeKeys.has(key))) entry.payload = {
			...entry.payload,
			sensitiveMedia: true
		};
	}
	const finalPayloadEntriesForDelivery = foldCommandBlocks ? finalPayloadEntries.flatMap((entry) => {
		const finalMediaUrls = replyMediaUrls(entry.payload);
		const finalMediaKeys = replyMediaDedupeKeys(entry.payload);
		const finalDisplayText = replyDisplayText(entry.payload);
		const matchingMediaBlockEntry = finalMediaUrls.length > 0 ? commandBlockPayloadEntriesForDelivery.find((candidate) => mediaSetsMatch(replyMediaDedupeKeys(candidate.payload), finalMediaKeys)) : void 0;
		const matchingTextBlockEntry = finalDisplayText ? commandBlockPayloadEntriesForDelivery.find((candidate) => replyDisplayText(candidate.payload) === finalDisplayText) : void 0;
		const matchingMediaAndTextBlockEntry = finalMediaUrls.length > 0 && finalDisplayText ? commandBlockPayloadEntriesForDelivery.find((candidate) => replyDisplayText(candidate.payload) === finalDisplayText && mediaSetsMatch(replyMediaDedupeKeys(candidate.payload), finalMediaKeys)) : void 0;
		const duplicateBlockEntry = finalMediaUrls.length > 0 ? finalDisplayText ? matchingMediaAndTextBlockEntry : matchingMediaBlockEntry : finalMediaUrls.length === 0 ? matchingTextBlockEntry : void 0;
		if (duplicateBlockEntry) duplicateBlockEntry.payload = mergeDefinedReplySemantics(duplicateBlockEntry.payload, entry.payload);
		else if (matchingMediaBlockEntry) matchingMediaBlockEntry.payload = mergeMediaReplySemantics(matchingMediaBlockEntry.payload, entry.payload);
		const remainingFinalMediaUrls = matchingMediaBlockEntry ? [] : finalMediaUrls;
		if (remainingFinalMediaUrls.length === 0 && (duplicateBlockEntry && !hasUnmergedReplySemantics(entry.payload) || !duplicateBlockEntry && !finalDisplayText && !hasReplySemantics(entry.payload))) return [];
		return [{
			...entry,
			payload: {
				...entry.payload,
				mediaUrl: void 0,
				mediaUrls: remainingFinalMediaUrls.length > 0 ? remainingFinalMediaUrls : void 0
			}
		}];
	}) : finalPayloadEntries;
	if (suppressReplies) return [];
	return [...commandBlockPayloadEntriesForDelivery, ...finalPayloadEntriesForDelivery].map((entry) => entry.payload);
}
//#endregion
//#region src/gateway/server-methods/chat-tts-markers.ts
function stripVisibleTextFromTtsSupplement(payload) {
	return isReplyPayloadTtsSupplement(payload) ? buildTtsSupplementMediaPayload(payload) : payload;
}
function resolveTtsSupplementMarkerText(text) {
	const trimmed = text.trim();
	const projected = projectChatDisplayMessage({
		role: "assistant",
		content: [{
			type: "text",
			text: trimmed
		}]
	}, { maxChars: Number.MAX_SAFE_INTEGER });
	return extractAssistantDisplayTextFromContent(Array.isArray(projected?.content) ? projected.content : void 0) ?? (typeof projected?.text === "string" ? projected.text.trim() : void 0) ?? trimmed;
}
function buildTtsSupplementTranscriptMarker(payload) {
	const supplement = getReplyPayloadTtsSupplement(payload);
	if (!supplement) return;
	const visibleText = resolveTtsSupplementMarkerText(payload.text?.trim() || supplement.spokenText.trim());
	return { textSha256: createHash("sha256").update(visibleText).digest("hex") };
}
function buildMediaOnlyTtsSupplementTranscriptMarker(payload) {
	if (payload.text?.trim()) return;
	return buildTtsSupplementTranscriptMarker(payload);
}
//#endregion
//#region src/gateway/server-methods/chat-webchat-media.ts
/** Cap local audio files exposed through assistant media. */
const MAX_WEBCHAT_AUDIO_BYTES = 15 * 1024 * 1024;
const MAX_WEBCHAT_IMAGE_DATA_URL_CHARS = 2e6;
const MAX_WEBCHAT_IMAGE_DATA_BYTES = 15e5;
const ALLOWED_WEBCHAT_DATA_IMAGE_MEDIA_TYPES = /* @__PURE__ */ new Set([
	"image/apng",
	"image/avif",
	"image/bmp",
	"image/gif",
	"image/jpeg",
	"image/png",
	"image/webp"
]);
/** Map `mediaUrl` strings to an absolute filesystem path for local embedding (plain paths or `file:` URLs). */
function resolveLocalMediaPathForEmbedding(raw) {
	const trimmed = raw.trim();
	if (!trimmed) return null;
	if (/^data:/i.test(trimmed)) return null;
	if (/^https?:/i.test(trimmed)) return null;
	if (trimmed.startsWith("file:")) try {
		const p = safeFileURLToPath(trimmed);
		if (!path.isAbsolute(p)) return null;
		return p;
	} catch {
		return null;
	}
	if (!path.isAbsolute(trimmed)) return null;
	try {
		assertNoWindowsNetworkPath(trimmed, "Local media path");
	} catch {
		return null;
	}
	return trimmed;
}
async function readLocalAudioContentBlockForEmbedding(payload, raw, options) {
	if (payload.trustedLocalMedia !== true) return null;
	const resolved = resolveLocalMediaPathForEmbedding(raw);
	if (!resolved) return null;
	if (!isAudioFileName(resolved)) return null;
	let opened;
	try {
		await assertLocalMediaAllowed(resolved, options?.localRoots);
		opened = await openLocalFileSafely({ filePath: resolved });
		await assertLocalMediaAllowed(opened.realPath, options?.localRoots);
		if (opened.stat.size > MAX_WEBCHAT_AUDIO_BYTES) return null;
		return {
			path: opened.realPath,
			block: {
				type: "attachment",
				attachment: {
					url: opened.realPath,
					kind: "audio",
					label: path.basename(opened.realPath),
					mimeType: mimeTypeForPath(opened.realPath),
					...payload.audioAsVoice === true ? { isVoiceNote: true } : {}
				}
			}
		};
	} catch (err) {
		if (err instanceof LocalMediaAccessError) options?.onLocalAudioAccessDenied?.(err);
		return null;
	} finally {
		await opened?.handle.close().catch(() => {});
	}
}
async function resolveReplyMediaAudioEmbedding(payload, raw, seenAudio, options) {
	const url = raw.trim();
	if (!url) return null;
	const audio = await readLocalAudioContentBlockForEmbedding(payload, url, options);
	if (!audio || seenAudio.has(audio.path)) return { url };
	seenAudio.add(audio.path);
	return {
		url,
		audioBlock: audio.block
	};
}
function mimeTypeForPath(filePath) {
	return mimeTypeFromFilePath(filePath) ?? "audio/mpeg";
}
function isBase64DataPayload(value) {
	if (value.length === 0) return false;
	for (let index = 0; index < value.length; index += 1) {
		const code = value.charCodeAt(index);
		if (!(code >= 65 && code <= 90 || code >= 97 && code <= 122 || code >= 48 && code <= 57 || code === 43 || code === 47 || code === 61) && !(code === 9 || code === 10 || code === 11 || code === 12 || code === 13 || code === 32)) return false;
	}
	return true;
}
function resolveEmbeddableImageUrl(url) {
	const trimmed = url.trim();
	if (!trimmed) return null;
	if (trimmed.length > MAX_WEBCHAT_IMAGE_DATA_URL_CHARS) return null;
	const commaIndex = trimmed.indexOf(",");
	if (commaIndex < 0) return null;
	const metadata = trimmed.slice(0, commaIndex);
	const match = /^data:(image\/[a-z0-9.+-]+);base64$/i.exec(metadata);
	const base64Data = trimmed.slice(commaIndex + 1);
	if (!match || !isBase64DataPayload(base64Data)) return null;
	const mediaType = normalizeLowercaseStringOrEmpty(match[1]);
	if (!ALLOWED_WEBCHAT_DATA_IMAGE_MEDIA_TYPES.has(mediaType)) return null;
	if (estimateBase64DecodedBytes(base64Data) > MAX_WEBCHAT_IMAGE_DATA_BYTES) return null;
	return trimmed;
}
function resolveReplyDirectivePrefix(payload) {
	const replyToId = sanitizeReplyDirectiveId(payload.replyToId);
	if (replyToId) return `[[reply_to:${replyToId}]]`;
	if (payload.replyToCurrent) return "[[reply_to_current]]";
	return "";
}
async function buildWebchatAssistantMessageFromReplyPayloads(payloads, options) {
	const content = [];
	const transcriptTextParts = [];
	const seenAudio = /* @__PURE__ */ new Set();
	const seenImages = /* @__PURE__ */ new Set();
	let hasAudio = false;
	let hasImage = false;
	for (const payload of payloads) {
		if (payload.isReasoning === true) continue;
		const visibleText = payload.text?.trim();
		const text = visibleText && !isSuppressedControlReplyText(visibleText) ? visibleText : void 0;
		const replyDirectivePrefix = resolveReplyDirectivePrefix(payload);
		let payloadHasAudio = false;
		let payloadHasImage = false;
		const payloadMediaBlocks = [];
		const parts = resolveSendableOutboundReplyParts(payload);
		for (const raw of parts.mediaUrls) {
			const media = await resolveReplyMediaAudioEmbedding(payload, raw, seenAudio, options);
			if (!media) continue;
			if (media.audioBlock) {
				payloadMediaBlocks.push(media.audioBlock);
				hasAudio = true;
				payloadHasAudio = true;
				continue;
			}
			const imageUrl = resolveEmbeddableImageUrl(media.url);
			if (!imageUrl || seenImages.has(imageUrl)) continue;
			seenImages.add(imageUrl);
			payloadMediaBlocks.push({
				type: "input_image",
				image_url: imageUrl
			});
			hasImage = true;
			payloadHasImage = true;
		}
		const syntheticText = payloadMediaBlocks.length > 0 && (!text || replyDirectivePrefix) && transcriptTextParts.length === 0 ? payloadHasAudio && payloadHasImage ? "Media reply" : payloadHasAudio ? "Audio reply" : "Image reply" : void 0;
		const blockText = text ?? syntheticText;
		if (blockText) {
			const fullText = replyDirectivePrefix ? `${replyDirectivePrefix}${blockText}` : blockText;
			transcriptTextParts.push(fullText);
			content.push({
				type: "text",
				text: fullText
			});
		} else if (replyDirectivePrefix) {
			transcriptTextParts.push(replyDirectivePrefix);
			content.push({
				type: "text",
				text: replyDirectivePrefix
			});
		}
		content.push(...payloadMediaBlocks);
	}
	if (!hasAudio && !hasImage) return null;
	const transcriptText = transcriptTextParts.join("\n\n").trim() || (hasAudio && hasImage ? "Media reply" : hasAudio ? "Audio reply" : "Image reply");
	if (transcriptTextParts.length === 0) content.unshift({
		type: "text",
		text: transcriptText
	});
	return {
		content,
		transcriptText
	};
}
//#endregion
//#region src/gateway/server-methods/chat-send-reply-dispatch.ts
function buildTranscriptReplyText(payloads) {
	return combineNonStreamingReplyParts(payloads.map((payload) => {
		if (payload.isReasoning === true) return "";
		const parts = resolveSendableOutboundReplyParts(payload);
		const lines = [];
		const parsedText = payload.text?.includes("[[") ? parseInlineDirectives(payload.text) : void 0;
		const replyToId = sanitizeReplyDirectiveId(payload.replyToId) ?? sanitizeReplyDirectiveId(parsedText?.replyToExplicitId);
		if (replyToId) lines.push(`[[reply_to:${replyToId}]]`);
		else if (payload.replyToCurrent || parsedText?.replyToCurrent) lines.push("[[reply_to_current]]");
		const text = payload.text ? stripInlineDirectiveTagsForDelivery(payload.text).text : "";
		if (text.trim() && !isSuppressedControlReplyText(text)) lines.push(text);
		for (const mediaUrl of parts.mediaUrls) {
			if (payload.sensitiveMedia === true) continue;
			const trimmed = mediaUrl.trim();
			if (trimmed) lines.push(`Attachment: ${trimmed}`);
		}
		if ((payload.audioAsVoice || parsedText?.audioAsVoice) && parts.mediaUrls.some((mediaUrl) => isAudioFileName(mediaUrl))) lines.push("[[audio_as_voice]]");
		return lines.join("\n");
	}).filter(Boolean));
}
/** Build delivery options and capture state for the core-owned webchat dispatcher. */
function createChatSendReplyDispatch(params) {
	const { accountId, isAgentRunStarted, logGateway, session, userTurnRecorder } = params;
	const { agentId, backingSessionId, cfg, clientRunId, sessionKey, sessionLoadOptions } = session;
	let assistantTranscriptRewriteState = {
		sessionId: void 0,
		generation: null,
		afterSeq: 0
	};
	const captureAgentTranscriptStart = () => {
		const current = loadSessionEntry(sessionKey, sessionLoadOptions);
		const sessionId = current.entry?.sessionId ?? backingSessionId;
		const watermark = sessionId ? readSessionTranscriptWatermark({
			agentId,
			sessionId,
			sessionKey,
			storePath: current.storePath
		}) : {
			generation: null,
			maxSeq: null
		};
		assistantTranscriptRewriteState = {
			sessionId,
			generation: watermark.generation,
			afterSeq: watermark.maxSeq ?? 0
		};
		return true;
	};
	const { onModelSelected, ...replyPipeline } = createChannelReplyPipeline({
		cfg,
		agentId,
		channel: INTERNAL_MESSAGE_CHANNEL
	});
	const deliveredReplies = [];
	const finalizedAgentMediaTranscriptKeys = /* @__PURE__ */ new Set();
	let appendedWebchatAgentMedia = false;
	const agentMediaTranscriptKey = (payload) => {
		const metadata = getReplyPayloadMetadata(payload);
		const ownedIdempotencyKey = metadata?.assistantTranscriptOwned === true ? metadata.assistantTranscriptIdempotencyKey?.trim() : void 0;
		if (ownedIdempotencyKey) return `owned:${ownedIdempotencyKey}`;
		if (metadata?.assistantMessageIndex !== void 0) return `index:${metadata.assistantMessageIndex}`;
		return "unkeyed";
	};
	const appendWebchatAgentMediaTranscriptIfNeeded = async (payload) => {
		if (!isAgentRunStarted() || !isMediaBearingPayload(payload)) return;
		const finalizationKey = agentMediaTranscriptKey(payload);
		if (finalizedAgentMediaTranscriptKeys.has(finalizationKey)) return;
		if (isSourceReplyTranscriptMirrorPayload(payload)) return;
		const ttsSupplementMarker = buildTtsSupplementTranscriptMarker(payload);
		const [transcriptPayload] = await normalizeWebchatReplyMediaPathsForDisplay({
			cfg,
			sessionKey,
			agentId,
			accountId,
			payloads: [stripVisibleTextFromTtsSupplement(payload)]
		});
		if (!transcriptPayload) return;
		const { storePath: latestStorePath, entry: latestEntry } = loadSessionEntry(sessionKey, sessionLoadOptions);
		const sessionId = latestEntry?.sessionId ?? backingSessionId ?? clientRunId;
		const mediaLocalRoots = appendLocalMediaParentRoots(getAgentScopedMediaLocalRoots(cfg, agentId), latestStorePath ? [latestStorePath] : void 0);
		const assistantContent = await buildAssistantDisplayContentFromReplyPayloads({
			sessionKey,
			agentId,
			payloads: [transcriptPayload],
			managedMediaLocalRoots: mediaLocalRoots,
			includeSensitiveMedia: transcriptPayload.sensitiveMedia !== true,
			onManagedMediaPrepareError: (message) => {
				logGateway.warn(`webchat media embedding skipped attachment: ${message}`);
			}
		});
		const mediaMessage = await buildWebchatAssistantMessageFromReplyPayloads([transcriptPayload], {
			localRoots: mediaLocalRoots,
			onLocalAudioAccessDenied: (err) => {
				logGateway.warn(`webchat audio embedding denied local path: ${formatForLog(err)}`);
			}
		});
		const persistedAssistantContent = replaceAssistantContentTextBlocks(assistantContent, mediaMessage);
		const persistedContentForAppend = hasAssistantDisplayMediaContent(persistedAssistantContent) ? persistedAssistantContent : void 0;
		if (!persistedContentForAppend?.length) return;
		const transcriptReply = mediaMessage?.transcriptText ?? extractAssistantDisplayTextFromContent(assistantContent) ?? buildTranscriptReplyText([transcriptPayload]);
		if (!transcriptReply && !persistedAssistantContent?.length && !assistantContent?.length) return;
		const payloadMetadata = getReplyPayloadMetadata(payload);
		const ownedTranscriptIdempotencyKey = payloadMetadata?.assistantTranscriptOwned === true ? payloadMetadata.assistantTranscriptIdempotencyKey?.trim() : void 0;
		const transcriptScope = assistantTranscriptScope({
			sessionKey,
			sessionId,
			storePath: latestStorePath,
			agentId
		});
		if (ownedTranscriptIdempotencyKey && transcriptScope) {
			const rewritten = await rewriteAssistantTranscriptMessageByIdempotencyKey({
				content: persistedContentForAppend,
				idempotencyKey: ownedTranscriptIdempotencyKey,
				scope: transcriptScope
			});
			if (rewritten) {
				appendedWebchatAgentMedia = true;
				finalizedAgentMediaTranscriptKeys.add(finalizationKey);
				await publishAssistantTranscriptRewrite({
					scope: transcriptScope,
					rewritten: [rewritten]
				});
				if (assistantContent?.length) await attachManagedOutgoingMediaToMessage({
					messageId: rewritten.messageId,
					blocks: assistantContent
				});
				return;
			}
			logGateway.warn("webchat runtime-owned assistant media rewrite skipped: transcript identity not found");
			return;
		}
		const assistantMessageIndex = payloadMetadata?.assistantMessageIndex;
		if (assistantMessageIndex !== void 0 && transcriptScope) {
			const sourceMediaUrls = Array.from(new Set(payloadMetadata?.assistantTranscriptMediaUrls?.length ? payloadMetadata.assistantTranscriptMediaUrls : [...Array.isArray(payload.mediaUrls) ? payload.mediaUrls : [], ...typeof payload.mediaUrl === "string" ? [payload.mediaUrl] : []]));
			if (assistantTranscriptRewriteState.sessionId !== sessionId) assistantTranscriptRewriteState = {
				sessionId,
				generation: null,
				afterSeq: 0
			};
			const rewritten = await rewriteAssistantTranscriptMessageByTurnIndexAndMedia({
				afterSeq: assistantTranscriptRewriteState.afterSeq,
				assistantMessageIndex,
				content: persistedContentForAppend,
				expectedGeneration: assistantTranscriptRewriteState.generation,
				mediaUrls: sourceMediaUrls,
				scope: transcriptScope
			});
			if (rewritten) {
				assistantTranscriptRewriteState.generation = rewritten.generation;
				appendedWebchatAgentMedia = true;
				finalizedAgentMediaTranscriptKeys.add(finalizationKey);
				await publishAssistantTranscriptRewrite({
					scope: transcriptScope,
					rewritten: [rewritten]
				});
				if (assistantContent?.length) await attachManagedOutgoingMediaToMessage({
					messageId: rewritten.messageId,
					blocks: assistantContent
				});
				return;
			}
		}
		const appended = await appendAssistantTranscriptMessage({
			sessionKey,
			message: transcriptReply,
			...persistedContentForAppend.length ? { content: persistedContentForAppend } : {},
			sessionId,
			storePath: latestStorePath,
			agentId,
			createIfMissing: true,
			idempotencyKey: assistantMessageIndex !== void 0 && assistantMessageIndex >= 1 ? `${clientRunId}:assistant-media:${assistantMessageIndex}` : `${clientRunId}:assistant-media`,
			ttsSupplement: ttsSupplementMarker,
			cfg
		});
		if (appended.ok) {
			if (appended.messageId && assistantContent?.length) await attachManagedOutgoingMediaToMessage({
				messageId: appended.messageId,
				blocks: assistantContent
			});
			appendedWebchatAgentMedia = true;
			finalizedAgentMediaTranscriptKeys.add(finalizationKey);
			return;
		}
		logGateway.warn(`webchat transcript append failed for media reply: ${appended.error ?? "unknown error"}`);
	};
	const dispatcherOptions = {
		...replyPipeline,
		onError: (err) => {
			logGateway.warn(`webchat dispatch failed: ${formatForLog(err)}`);
		},
		deliver: async (payload, info) => {
			const payloadMetadata = getReplyPayloadMetadata(payload);
			if (payloadMetadata?.beforeAgentRunBlocked === true || payloadMetadata?.sourceReplyTranscriptMirror?.transcriptWriteBlocked === true) userTurnRecorder.markBlocked();
			switch (info.kind) {
				case "block":
				case "final":
					deliveredReplies.push({
						payload,
						kind: info.kind
					});
					break;
				case "tool":
					if (isMediaBearingPayload(payload)) deliveredReplies.push({
						payload: {
							...payload,
							text: void 0
						},
						kind: "final"
					});
					break;
			}
		}
	};
	const finalizeAgentMediaTranscript = async () => {
		const latestPayloadByKey = /* @__PURE__ */ new Map();
		const orderedKeys = [];
		for (const { payload } of deliveredReplies) {
			if (!isMediaBearingPayload(payload)) continue;
			const key = agentMediaTranscriptKey(payload);
			if (!latestPayloadByKey.has(key)) orderedKeys.push(key);
			latestPayloadByKey.set(key, payload);
		}
		for (const key of orderedKeys) {
			const payload = latestPayloadByKey.get(key);
			if (payload) try {
				await appendWebchatAgentMediaTranscriptIfNeeded(payload);
			} catch (error) {
				logGateway.warn(`webchat media finalization failed: ${formatForLog(error)}`);
			}
		}
	};
	const runAgentMediaTranscript = async (admission, operation) => {
		return await admission.run(async () => {
			try {
				return await operation();
			} finally {
				await finalizeAgentMediaTranscript();
			}
		});
	};
	return {
		captureAgentTranscriptStart,
		deliveredReplies,
		dispatcherOptions,
		hasAppendedWebchatAgentMedia: () => appendedWebchatAgentMedia,
		onModelSelected,
		runAgentMediaTranscript
	};
}
//#endregion
//#region src/gateway/server-methods/chat-send-nonagent-finalization.ts
function resolveTranscriptMirrorOwner(payloads) {
	if (payloads.length === 0) return { kind: "none" };
	const owners = payloads.map((payload) => getReplyPayloadMetadata(payload)?.sourceReplyTranscriptMirror);
	if (owners.every((owner) => owner?.expectedSessionId === void 0 && !owner?.transcriptWriteBlocked)) return { kind: "none" };
	const first = owners[0];
	if (!first) return { kind: "invalid" };
	const sessionKey = first.sessionKey.trim();
	const expectedSessionId = first.expectedSessionId?.trim();
	if (first.transcriptWriteBlocked) {
		if (!sessionKey || owners.some((owner) => !owner?.transcriptWriteBlocked || owner.sessionKey.trim() !== sessionKey || owner.expectedSessionId?.trim() !== expectedSessionId || owner.agentId !== first.agentId)) return { kind: "invalid" };
		return {
			kind: "blocked",
			owner: {
				sessionKey,
				...expectedSessionId ? { expectedSessionId } : {},
				...first.agentId ? { agentId: first.agentId } : {}
			}
		};
	}
	if (!sessionKey || !expectedSessionId || owners.some((owner) => owner?.sessionKey.trim() !== sessionKey || owner.expectedSessionId?.trim() !== expectedSessionId || owner.agentId !== first.agentId || owner.transcriptWriteBlocked === true)) return { kind: "invalid" };
	return {
		kind: "owner",
		owner: {
			sessionKey,
			expectedSessionId,
			...first.agentId ? { agentId: first.agentId } : {}
		}
	};
}
function buildChatSendBtwSideResult(deliveredReplies) {
	const replies = deliveredReplies.map((entry) => entry.payload).filter(isBtwReplyPayload);
	const text = combineNonStreamingReplyParts(replies.map((payload) => payload.text));
	if (replies.length === 0 || !text) return;
	return {
		question: expectDefined(replies[0], "btw replies entry at 0").btw.question.trim(),
		text,
		isError: replies.some((payload) => payload.isError)
	};
}
/** Persist and broadcast replies produced without a runtime-owned agent assistant turn. */
async function finalizeChatSendNonAgentReplies(params) {
	const { accountId, context, deliveredReplies, emitFirstAssistantServerTiming, foldCommandBlocks, persistUserTurnTranscript, session, suppressReplies } = params;
	const { agentId, backingSessionId, cfg, clientRunId, sessionKey, sessionLoadOptions } = session;
	const btwResult = buildChatSendBtwSideResult(deliveredReplies);
	if (btwResult) {
		broadcastSideResult({
			context,
			payload: {
				kind: "btw",
				runId: clientRunId,
				sessionKey,
				...sessionKey === "global" && agentId ? { agentId } : {},
				...btwResult,
				ts: Date.now()
			}
		});
		broadcastChatFinal({
			context,
			runId: clientRunId,
			sessionKey,
			agentId
		});
		return;
	}
	const rawFinalPayloads = selectChatSendFinalReplyPayloads({
		deliveredReplies,
		foldCommandBlocks,
		suppressReplies
	});
	const transcriptMirrorResolution = resolveTranscriptMirrorOwner(rawFinalPayloads);
	const transcriptMirrorOwner = transcriptMirrorResolution.kind === "owner" || transcriptMirrorResolution.kind === "blocked" ? transcriptMirrorResolution.owner : void 0;
	const finalPayloads = await normalizeWebchatReplyMediaPathsForDisplay({
		cfg,
		sessionKey,
		agentId,
		accountId,
		payloads: rawFinalPayloads
	});
	const requestedTranscriptSession = transcriptMirrorOwner ? loadSessionEntry(transcriptMirrorOwner.sessionKey, {
		...sessionLoadOptions,
		...transcriptMirrorOwner.agentId ? { agentId: transcriptMirrorOwner.agentId } : {}
	}) : void 0;
	const useTranscriptMirrorOwner = Boolean(transcriptMirrorResolution.kind === "owner" && transcriptMirrorOwner && requestedTranscriptSession?.entry?.sessionId === transcriptMirrorOwner.expectedSessionId);
	if (transcriptMirrorResolution.kind === "owner" && !useTranscriptMirrorOwner) context.logGateway.warn(`webchat transcript append skipped: binding-owned session changed before finalization`);
	if (transcriptMirrorResolution.kind === "invalid") context.logGateway.warn(`webchat transcript append skipped: inconsistent binding-owned transcript metadata`);
	if (transcriptMirrorResolution.kind === "blocked") context.logGateway.warn(`webchat transcript append skipped: binding-owned user turn was not persisted`);
	const canAppendAssistantTranscript = transcriptMirrorResolution.kind === "none" || useTranscriptMirrorOwner;
	const transcriptSessionKey = useTranscriptMirrorOwner && transcriptMirrorOwner ? transcriptMirrorOwner.sessionKey : sessionKey;
	const transcriptAgentId = useTranscriptMirrorOwner && transcriptMirrorOwner ? transcriptMirrorOwner.agentId ?? agentId : agentId;
	const { storePath: latestStorePath, entry: latestEntry } = useTranscriptMirrorOwner && requestedTranscriptSession ? requestedTranscriptSession : loadSessionEntry(sessionKey, sessionLoadOptions);
	const sessionId = latestEntry?.sessionId ?? backingSessionId ?? clientRunId;
	const mediaLocalRoots = appendLocalMediaParentRoots(getAgentScopedMediaLocalRoots(cfg, transcriptAgentId), latestStorePath ? [latestStorePath] : void 0);
	const assistantContent = await buildAssistantDisplayContentFromReplyPayloads({
		sessionKey,
		agentId,
		payloads: finalPayloads,
		managedMediaLocalRoots: mediaLocalRoots,
		includeSensitiveMedia: false,
		includeSensitiveDisplay: true,
		onManagedMediaPrepareError: (message) => {
			context.logGateway.warn(`webchat media embedding skipped attachment: ${message}`);
		},
		onSensitiveDisplayPrepareError: (message) => {
			context.logGateway.warn(`webchat sensitive display skipped attachment: ${message}`);
		}
	});
	const mediaMessage = await buildWebchatAssistantMessageFromReplyPayloads(finalPayloads, {
		localRoots: mediaLocalRoots,
		onLocalAudioAccessDenied: (err) => {
			context.logGateway.warn(`webchat audio embedding denied local path: ${formatForLog(err)}`);
		}
	});
	const hasSensitiveMedia = hasSensitiveMediaPayload(finalPayloads);
	const ttsSupplementMarker = finalPayloads.map((payload) => buildMediaOnlyTtsSupplementTranscriptMarker(payload)).find((marker) => Boolean(marker));
	const persistedAssistantContent = replaceAssistantContentTextBlocks(hasSensitiveMedia ? await buildAssistantDisplayContentFromReplyPayloads({
		sessionKey,
		agentId,
		payloads: finalPayloads,
		managedMediaLocalRoots: mediaLocalRoots,
		includeSensitiveMedia: false,
		onManagedMediaPrepareError: (message) => {
			context.logGateway.warn(`webchat media embedding skipped attachment: ${message}`);
		}
	}) : assistantContent, mediaMessage);
	const persistedContentForAppend = hasAssistantDisplayMediaContent(persistedAssistantContent) ? persistedAssistantContent : void 0;
	const broadcastAssistantContent = hasAssistantDisplayMediaContent(assistantContent) ? assistantContent : hasAssistantDisplayMediaContent(mediaMessage?.content) ? mediaMessage?.content : assistantContent;
	const displayReply = extractAssistantDisplayTextFromContent(assistantContent) ?? buildTranscriptReplyText(finalPayloads);
	const transcriptDisplayReply = displayReply ? stripInlineDirectiveTagsForDisplay(displayReply).text.trim() : "";
	const transcriptReply = mediaMessage?.transcriptText || buildTranscriptReplyText(finalPayloads) || transcriptDisplayReply;
	let message;
	const shouldAppendAssistantTranscript = Boolean(canAppendAssistantTranscript && (transcriptReply || persistedContentForAppend?.length));
	await persistUserTurnTranscript();
	if (shouldAppendAssistantTranscript) {
		const appended = await appendAssistantTranscriptMessage({
			sessionKey: transcriptSessionKey,
			message: transcriptReply,
			...persistedContentForAppend?.length ? { content: persistedContentForAppend } : {},
			sessionId,
			storePath: latestStorePath,
			agentId: transcriptAgentId,
			createIfMissing: true,
			idempotencyKey: clientRunId,
			ttsSupplement: ttsSupplementMarker,
			cfg
		});
		if (appended.ok) {
			if (appended.messageId && assistantContent?.length) await attachManagedOutgoingMediaToMessage({
				messageId: appended.messageId,
				blocks: assistantContent
			});
			message = broadcastAssistantContent?.length ? {
				...appended.message,
				content: broadcastAssistantContent
			} : appended.message;
		} else {
			context.logGateway.warn(`webchat transcript append failed: ${appended.error ?? "unknown error"}`);
			const fallbackAssistantContent = stripManagedOutgoingAssistantContentBlocks(persistedAssistantContent) ?? stripManagedOutgoingAssistantContentBlocks(assistantContent);
			const fallbackText = extractAssistantDisplayText(fallbackAssistantContent) ?? displayReply;
			message = {
				role: "assistant",
				...fallbackAssistantContent?.length ? { content: fallbackAssistantContent } : fallbackText ? { content: [{
					type: "text",
					text: fallbackText
				}] } : {},
				...fallbackText ? { text: fallbackText } : {},
				timestamp: Date.now(),
				...ttsSupplementMarker ? { openclawTtsSupplement: ttsSupplementMarker } : {},
				stopReason: "stop",
				usage: {
					input: 0,
					output: 0,
					totalTokens: 0
				}
			};
		}
	} else if (broadcastAssistantContent?.length) message = {
		role: "assistant",
		content: broadcastAssistantContent,
		text: extractAssistantDisplayText(broadcastAssistantContent) ?? "",
		timestamp: Date.now(),
		stopReason: "stop",
		usage: {
			input: 0,
			output: 0,
			totalTokens: 0
		}
	};
	if (hasVisibleAssistantFinalMessage(message)) emitFirstAssistantServerTiming();
	broadcastChatFinal({
		context,
		runId: clientRunId,
		sessionKey,
		agentId,
		message
	});
}
//#endregion
//#region src/gateway/server-methods/chat-send-pre-admission.ts
const ACTIVE_LEAF_CHANGED_ERROR_REASON = "active-leaf-changed";
function respondChatSessionRoutingChanged(respond) {
	respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "session routing changed; review and retry", { details: { reason: SESSION_ROUTING_CHANGED_ERROR_REASON } }));
}
function respondChatActiveLeafChanged(respond) {
	respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "active branch changed; review and resend", { details: { reason: ACTIVE_LEAF_CHANGED_ERROR_REASON } }));
}
/** Settle stop/retry/dedupe cases before reserving lifecycle admission. */
async function runChatSendPreAdmission(params) {
	const { request, session, respond, context, client } = params;
	const { stopCommand } = request;
	const { cfg, entry, sessionKey, rawSessionKey, sessionLoadKey, selectedAgent, clientRunId, pendingChatSendKey, sessionLoadOptions, storePath, legacyKey, sessionRoutingChanged } = session;
	if (resolveSendPolicy({
		cfg,
		entry,
		sessionKey,
		channel: sessionDeliveryChannel(entry),
		chatType: entry?.chatType
	}) === "deny") {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "send blocked by session policy"));
		return false;
	}
	if (stopCommand) {
		if (sessionRoutingChanged(cfg)) {
			respondChatSessionRoutingChanged(respond);
			return false;
		}
		const defaultAgentId = resolveDefaultAgentId(cfg);
		const stopAgentId = sessionKey === "global" ? selectedAgent.agentId ?? defaultAgentId : selectedAgent.agentId;
		const res = await abortChatRunsForSessionKeyWithPartials({
			context,
			ops: createChatAbortOps(context),
			sessionKey: rawSessionKey,
			sessionKeyAliases: sessionKey === rawSessionKey ? void 0 : [sessionKey],
			agentId: stopAgentId,
			sessionId: entry?.sessionId,
			persistSessionKey: sessionKey,
			defaultAgentId,
			abortOrigin: "stop-command",
			stopReason: "stop",
			requester: resolveChatAbortRequester(client)
		});
		if (res.unauthorized) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "unauthorized"));
			return false;
		}
		respond(true, {
			ok: true,
			aborted: res.aborted,
			runIds: res.runIds
		});
		return false;
	}
	const cached = context.dedupe.get(`chat:${clientRunId}`);
	if (cached) {
		respond(cached.ok, cached.payload, cached.error, { cached: true });
		return false;
	}
	const abortMarker = context.chatRunState.runs.get(clientRunId)?.abortMarker;
	if (abortMarker !== void 0) {
		const abortedAt = chatAbortMarkerTimestampMs(abortMarker);
		const payload = buildAbortedChatSendPayload({
			runId: clientRunId,
			endedAt: abortedAt
		});
		setGatewayDedupeEntry({
			dedupe: context.dedupe,
			key: `chat:${clientRunId}`,
			entry: {
				ts: abortedAt,
				ok: true,
				payload
			}
		});
		respond(true, payload, void 0, {
			cached: true,
			runId: clientRunId
		});
		return false;
	}
	if (readPreRegisteredRun({
		key: pendingChatSendKey,
		entry: context.dedupe.get(pendingChatSendKey),
		keyPrefix: "pending-chat:"
	})) {
		respond(true, {
			runId: clientRunId,
			status: "in_flight"
		}, void 0, {
			cached: true,
			runId: clientRunId
		});
		return false;
	}
	if (context.chatAbortControllers.has(clientRunId) || context.chatQueuedTurns?.has(clientRunId)) {
		respond(true, {
			runId: clientRunId,
			status: "in_flight"
		}, void 0, {
			cached: true,
			runId: clientRunId
		});
		return false;
	}
	const durableClaim = await resolveDurableChatClaim({
		canonicalSessionKey: sessionKey,
		cfg,
		clientRunId,
		entry,
		persistedSessionKey: legacyKey ?? sessionKey,
		reloadEntry: () => loadSessionEntry(sessionLoadKey, sessionLoadOptions).entry,
		storePath,
		recoveryRuntime: context.recoveryRuntime,
		warn: (message) => context.logGateway.warn(`failed to retry durable chat recovery ${clientRunId}: ${message}`)
	});
	if (durableClaim.kind === "pending" || durableClaim.kind === "rejected") {
		respond(false, void 0, errorShape(durableClaim.kind === "pending" || durableClaim.unavailable ? ErrorCodes.UNAVAILABLE : ErrorCodes.INVALID_REQUEST, durableClaim.message, { retryable: durableClaim.kind === "pending" }));
		return false;
	}
	if (durableClaim.kind === "accepted") {
		respond(true, {
			runId: clientRunId,
			status: "ok"
		}, void 0, {
			cached: true,
			runId: clientRunId
		});
		return false;
	}
	if (sessionRoutingChanged(cfg)) {
		respondChatSessionRoutingChanged(respond);
		return false;
	}
	const archivedSessionError = resolveSessionWorkStartError(sessionKey, entry);
	if (archivedSessionError) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, archivedSessionError));
		return false;
	}
	return true;
}
//#endregion
//#region src/gateway/server-methods/chat-send-reply-context.ts
const REPLY_CONTEXT_BODY_MAX_CHARS = 2e3;
function extractReplyTargetText(message) {
	const entry = asOptionalRecord(message);
	if (!entry) return;
	if (typeof entry.text === "string" && entry.text.trim()) return entry.text;
	if (typeof entry.content === "string" && entry.content.trim()) return entry.content;
	if (!Array.isArray(entry.content)) return;
	const parts = entry.content.map((block) => {
		const record = asOptionalRecord(block);
		return record && typeof record.text === "string" ? record.text : "";
	}).filter((text) => text.trim());
	return parts.length > 0 ? parts.join("\n") : void 0;
}
function resolveReplyTargetSenderLabel(params) {
	if (asOptionalRecord(params.message)?.role === "assistant") return resolveAssistantIdentity({
		cfg: params.cfg,
		agentId: params.agentId
	}).name;
	return params.userSenderLabel?.trim() || "User";
}
/** Copies hydrated reply fields onto the inbound context without clobbering unset keys. */
function applyChatSendReplyContextFields(ctx, fields) {
	if (fields.ReplyToId !== void 0) ctx.ReplyToId = fields.ReplyToId;
	if (fields.ReplyToBody !== void 0) ctx.ReplyToBody = fields.ReplyToBody;
	if (fields.ReplyToSender !== void 0) ctx.ReplyToSender = fields.ReplyToSender;
}
/**
* Resolves a webchat reply target from session history. Always preserves the
* reply_to_id linkage; body/sender hydrate only when the transcript message
* still resolves, mirroring Discord's missing-referenced-message tolerance.
*/
async function resolveChatSendReplyContext(params) {
	const replyToId = params.replyToId?.trim();
	if (!replyToId) return {};
	const fields = { ReplyToId: replyToId };
	const sessionId = params.sessionEntry?.sessionId;
	if (!sessionId) return fields;
	try {
		const resolved = await readSessionMessageByIdAsync({
			agentId: params.agentId,
			sessionEntry: params.sessionEntry,
			sessionId,
			sessionKey: params.sessionKey,
			storePath: params.storePath
		}, replyToId, { allowResetArchiveFallback: true });
		if (!resolved.found) return fields;
		const displayMessage = projectChatDisplayMessage(resolved.message);
		if (!displayMessage) return fields;
		const rawBody = extractReplyTargetText(displayMessage)?.trim();
		const body = rawBody && displayMessage.role === "assistant" ? sanitizeAssistantVisibleTextWithProfile(rawBody, "history").trim() : rawBody;
		if (!body) return fields;
		fields.ReplyToBody = truncateUtf16Safe(body, REPLY_CONTEXT_BODY_MAX_CHARS);
		fields.ReplyToSender = resolveReplyTargetSenderLabel({
			message: displayMessage,
			cfg: params.cfg,
			agentId: params.agentId,
			userSenderLabel: params.userSenderLabel
		});
		return fields;
	} catch (err) {
		params.warn?.(`chat.send reply context hydration failed for ${replyToId}: ${String(err)}`);
		return fields;
	}
}
//#endregion
//#region src/gateway/server-methods/chat-send-admission.ts
/** Reserve the session lifecycle and register the abortable run before attachment work. */
async function admitChatSend(params) {
	const { request, session, respond, context, client } = params;
	const { p, explicitOrigin, normalizedAttachments, turnKind } = request;
	const { rawSessionKey, sessionLoadKey, clientRunId, pendingChatSendKey, sessionLoadOptions, cfg, storePath, entry, sessionKey, sessionRoutingChanged, selectedAgent, requestedSessionId, backingSessionId, agentId, resolvedSessionModel, resolvedSessionAuthProvider, timeoutMs, now, restartSafeRequest, expectedLeafEntryId } = session;
	const chatSendTraceAttributes = {
		runId: clientRunId,
		sessionKey,
		agentId: selectedAgent.agentId ?? agentId,
		provider: resolvedSessionModel.provider,
		model: resolvedSessionModel.model,
		hasAttachments: normalizedAttachments.length > 0,
		hasExplicitOrigin: explicitOrigin !== void 0,
		hasConnectedClient: client?.connect !== void 0
	};
	const originatingRoute = resolveChatSendOriginatingRoute({
		client: request.clientInfo,
		deliver: p.deliver,
		entry,
		explicitOrigin,
		hasConnectedClient: client?.connect !== void 0,
		mainKey: cfg.session?.mainKey,
		sessionKey
	});
	const lifecycleGeneration = getAgentEventLifecycleGeneration();
	const pendingAttemptId = randomUUID();
	const pendingExpiresAtMs = resolveChatRunExpiresAtMs({
		now,
		timeoutMs
	});
	context.dedupe.set(pendingChatSendKey, {
		ts: now,
		ok: true,
		payload: {
			runId: clientRunId,
			attemptId: pendingAttemptId,
			status: "accepted",
			sessionKey,
			...rawSessionKey === sessionKey ? {} : { sessionKeyAliases: [rawSessionKey] },
			...sessionKey === "global" && selectedAgent.agentId ? { agentId: selectedAgent.agentId } : {},
			ownerConnId: normalizeOptionalChatText(client?.connId),
			ownerDeviceId: normalizeOptionalChatText(client?.connect?.device?.id),
			expiresAtMs: pendingExpiresAtMs,
			turnKind
		}
	});
	const clearPendingChatSendReservation = () => {
		const pending = readPreRegisteredRun({
			key: pendingChatSendKey,
			entry: context.dedupe.get(pendingChatSendKey),
			keyPrefix: PENDING_CHAT_SEND_DEDUPE_PREFIX
		});
		if (pending?.runId === clientRunId && normalizeUnknownChatText(pending.payload.attemptId) === pendingAttemptId) context.dedupe.delete(pendingChatSendKey);
	};
	let admittedSessionId = backingSessionId ?? clientRunId;
	let gatewayWorkAdmission;
	let admittedRunAbort;
	let restartSafeAdmission;
	let reservationSuperseded = false;
	let supersedingResult;
	const assertChatWorkAdmissionAllowed = (commitOutcome) => {
		if (context.chatRunState.hasAbortMarker(clientRunId)) return;
		const pendingReservation = readPreRegisteredRun({
			key: pendingChatSendKey,
			entry: context.dedupe.get(pendingChatSendKey),
			keyPrefix: PENDING_CHAT_SEND_DEDUPE_PREFIX
		});
		if (pendingReservation && normalizeUnknownChatText(pendingReservation.payload.attemptId) !== pendingAttemptId) {
			if (commitOutcome) reservationSuperseded = true;
			return;
		}
		if (!pendingReservation) {
			const terminalResult = context.dedupe.get(`chat:${clientRunId}`);
			if (terminalResult || context.chatAbortControllers.has(clientRunId)) {
				if (commitOutcome) {
					reservationSuperseded = true;
					supersedingResult = terminalResult;
				}
				return;
			}
		}
		if (lifecycleGeneration !== getAgentEventLifecycleGeneration()) {
			if (commitOutcome) writePreRegisteredChatAbort({
				context,
				runId: clientRunId,
				stopReason: "restart",
				attemptId: pendingAttemptId
			});
			return;
		}
		if (!pendingReservation || !isFutureDateTimestampMs(pendingReservation.payload.expiresAtMs, { nowMs: Date.now() })) {
			if (commitOutcome) writePreRegisteredChatAbort({
				context,
				runId: clientRunId,
				stopReason: "timeout",
				attemptId: pendingAttemptId
			});
			return;
		}
		const latestSession = loadSessionEntry(sessionLoadKey, sessionLoadOptions);
		if (sessionRoutingChanged(latestSession.cfg)) throw new Error(SESSION_ROUTING_CHANGED_ERROR_REASON);
		const latestEntry = latestSession.entry;
		if (entry && !latestEntry) throw new Error(`Session "${sessionKey}" was deleted while starting work. Retry.`);
		if (commitOutcome && expectedLeafEntryId !== void 0) {
			if (((latestEntry?.sessionId ? resolveSessionTranscriptActiveLeafEntryId(readSessionTranscriptActiveLeafEvents({
				agentId,
				sessionId: latestEntry.sessionId,
				sessionKey: latestSession.canonicalKey,
				sessionEntry: latestEntry,
				storePath: latestSession.storePath
			})) : void 0) ?? null) !== expectedLeafEntryId) throw new Error(ACTIVE_LEAF_CHANGED_ERROR_REASON);
		}
		if (backingSessionId && latestEntry?.sessionId && latestEntry.sessionId !== backingSessionId && (expectedLeafEntryId === void 0 || commitOutcome)) throw new Error(`Session "${sessionKey}" changed while starting work. Retry.`);
		const retryableClaim = isRetryableUnadoptedChatClaim(latestEntry, clientRunId);
		if (latestEntry?.restartRecoveryDeliveryRunId && latestEntry.restartRecoveryDeliverySourceRunId === clientRunId && !retryableClaim || hasRestartRecoveryTerminalRun(latestEntry, clientRunId)) {
			if (commitOutcome) {
				reservationSuperseded = true;
				supersedingResult = {
					ts: Date.now(),
					ok: true,
					payload: {
						runId: clientRunId,
						status: "ok"
					}
				};
			}
			return;
		}
		const archivedError = resolveSessionWorkStartError(sessionKey, latestEntry);
		if (archivedError) throw new Error(archivedError);
		if (!commitOutcome) return;
		admittedSessionId = latestEntry?.sessionId ?? backingSessionId ?? clientRunId;
		restartSafeAdmission = resolveRestartSafeChatAdmission({
			agentId,
			cfg: latestSession.cfg,
			clientRunId,
			context,
			entry: latestEntry,
			now: Date.now(),
			request: restartSafeRequest,
			requestedSessionId,
			sessionId: admittedSessionId,
			sessionKey: latestSession.canonicalKey,
			storePath: latestSession.storePath
		});
		if (retryableClaim && !restartSafeAdmission) throw new Error("chat retry does not match its durable admission");
		admittedRunAbort = registerChatAbortController({
			chatAbortControllers: context.chatAbortControllers,
			runId: clientRunId,
			sessionId: admittedSessionId,
			sessionKey,
			agentId: selectedAgent.agentId,
			timeoutMs,
			now,
			ownerConnId: normalizeOptionalChatText(client?.connId),
			ownerDeviceId: normalizeOptionalChatText(client?.connect?.device?.id),
			providerId: resolvedSessionModel.provider,
			authProviderId: resolvedSessionAuthProvider,
			isAbortable: (active) => isReplyRunAbortableForSignal(active.controller.signal),
			kind: "chat-send",
			turnKind,
			lifecycleGeneration
		});
	};
	try {
		gatewayWorkAdmission = await beginSessionWorkAdmission({
			scope: storePath,
			identities: [sessionKey, backingSessionId],
			assertAllowed: () => assertChatWorkAdmissionAllowed(false),
			revalidateAllowed: () => assertChatWorkAdmissionAllowed(true),
			onInterrupt: () => {
				if (admittedRunAbort?.entry) admittedRunAbort.entry.abortStopReason = "restart";
				admittedRunAbort?.controller.abort(createAgentRunRestartAbortError());
			}
		});
	} catch (err) {
		clearPendingChatSendReservation();
		if (err instanceof Error && err.message === "session-routing-changed") {
			respondChatSessionRoutingChanged(respond);
			return { ok: false };
		}
		if (err instanceof Error && err.message === "active-leaf-changed") {
			respondChatActiveLeafChanged(respond);
			return { ok: false };
		}
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, formatForLog(err)));
		return { ok: false };
	}
	clearPendingChatSendReservation();
	const activeRunAbort = admittedRunAbort;
	if (reservationSuperseded) {
		gatewayWorkAdmission.release();
		const supersedingCached = supersedingResult ?? context.dedupe.get(`chat:${clientRunId}`);
		if (supersedingCached) {
			respond(supersedingCached.ok, supersedingCached.payload, supersedingCached.error, {
				cached: true,
				runId: clientRunId
			});
			return { ok: false };
		}
		respond(true, {
			runId: clientRunId,
			status: "in_flight"
		}, void 0, {
			cached: true,
			runId: clientRunId
		});
		return { ok: false };
	}
	if (lifecycleGeneration !== getAgentEventLifecycleGeneration()) {
		if (activeRunAbort) {
			if (activeRunAbort.entry) activeRunAbort.entry.abortStopReason = "restart";
			activeRunAbort.controller.abort();
			activeRunAbort.cleanup({ force: true });
		}
		gatewayWorkAdmission.release();
		if (!context.dedupe.has(`chat:${clientRunId}`)) writePreRegisteredChatAbort({
			context,
			runId: clientRunId,
			stopReason: activeRunAbort?.entry?.abortStopReason ?? "restart",
			attemptId: pendingAttemptId
		});
		const aborted = context.dedupe.get(`chat:${clientRunId}`);
		respond(aborted?.ok ?? true, aborted?.payload, aborted?.error, {
			cached: true,
			runId: clientRunId
		});
		return { ok: false };
	}
	if (!activeRunAbort) {
		gatewayWorkAdmission.release();
		const aborted = context.dedupe.get(`chat:${clientRunId}`);
		if (aborted) {
			respond(aborted.ok, aborted.payload, aborted.error, {
				cached: true,
				runId: clientRunId
			});
			return { ok: false };
		}
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "chat run admission failed"));
		return { ok: false };
	}
	if (!activeRunAbort.registered) {
		gatewayWorkAdmission.release();
		respond(true, {
			runId: clientRunId,
			status: "in_flight"
		}, void 0, {
			cached: true,
			runId: clientRunId
		});
		return { ok: false };
	}
	if (params.onAdmissionOwned) {
		let proceed;
		try {
			proceed = await params.onAdmissionOwned();
		} catch (error) {
			activeRunAbort.cleanup({ force: true });
			gatewayWorkAdmission.release();
			throw error;
		}
		if (!proceed) {
			activeRunAbort.cleanup({ force: true });
			gatewayWorkAdmission.release();
			return { ok: false };
		}
	}
	let releaseGatewayRootContinuation;
	const cleanupAdmittedRun = (options) => {
		activeRunAbort.cleanup(options);
		gatewayWorkAdmission?.release();
		releaseGatewayRootContinuation?.();
		releaseGatewayRootContinuation = void 0;
	};
	const finishAbortedChatSend = () => {
		const stopReason = activeRunAbort.entry?.abortStopReason ?? "rpc";
		const endedAt = Date.now();
		const payload = buildAbortedChatSendPayload({
			runId: clientRunId,
			stopReason,
			endedAt
		});
		setGatewayDedupeEntry({
			dedupe: context.dedupe,
			key: `chat:${clientRunId}`,
			entry: {
				ts: endedAt,
				ok: true,
				payload
			}
		});
		cleanupAdmittedRun();
		clearAgentRunContext(clientRunId, lifecycleGeneration);
		respond(true, payload, void 0, { runId: clientRunId });
	};
	claimAgentRunContext(clientRunId, {
		sessionKey,
		sessionId: admittedSessionId,
		lifecycleGeneration
	});
	return {
		ok: true,
		value: {
			activeRunAbort,
			admittedSessionId,
			chatSendTraceAttributes,
			cleanupAdmittedRun,
			finishAbortedChatSend,
			gatewayWorkAdmission,
			lifecycleGeneration,
			originatingRoute,
			restartSafeAdmission,
			setReleaseGatewayRootContinuation: (release) => {
				releaseGatewayRootContinuation = release;
			}
		}
	};
}
//#endregion
//#region src/gateway/server-methods/chat-send-request.ts
/** Validate and normalize the wire request before session or lifecycle work begins. */
function normalizeChatSendRequest(params) {
	const chatSendReceivedAtMs = performance$1.now();
	const client = params.client;
	const clientInfo = client?.connect?.client;
	const supportsTaskSuggestions = isOperatorUiClient(clientInfo) && params.client?.connect?.scopes?.includes("operator.admin") === true && hasGatewayClientCap(params.client?.connect?.caps, GATEWAY_CLIENT_CAPS.TASK_SUGGESTIONS);
	const controlUiReconnectResume = resolveControlUiReconnectResumeParams(params.params, clientInfo);
	if (!validateChatSendParams(controlUiReconnectResume.params)) return {
		ok: false,
		error: `invalid chat.send params: ${formatValidationErrors(validateChatSendParams.errors)}`
	};
	const p = controlUiReconnectResume.params;
	const suppressCommandInterpretation = p.suppressCommandInterpretation === true;
	const explicitOriginResult = normalizeExplicitChatSendOrigin({
		originatingChannel: p.originatingChannel,
		originatingTo: p.originatingTo,
		accountId: p.originatingAccountId,
		messageThreadId: p.originatingThreadId
	});
	if (!explicitOriginResult.ok) return explicitOriginResult;
	if ((p.systemInputProvenance || p.systemProvenanceReceipt || suppressCommandInterpretation || explicitOriginResult.value) && !hasGatewayAdminScope(params.client)) return {
		ok: false,
		error: p.systemInputProvenance || p.systemProvenanceReceipt || suppressCommandInterpretation ? "system provenance fields require admin scope" : "originating route fields require admin scope"
	};
	const sanitizedMessageResult = sanitizeChatSendMessageInput(p.message);
	if (!sanitizedMessageResult.ok) return sanitizedMessageResult;
	const systemReceiptResult = normalizeOptionalChatSystemReceipt(p.systemProvenanceReceipt);
	if (!systemReceiptResult.ok) return systemReceiptResult;
	const inboundMessage = sanitizedMessageResult.message;
	const systemInputProvenance = normalizeInputProvenance(p.systemInputProvenance);
	const systemProvenanceReceipt = systemReceiptResult.receipt;
	const stopCommand = !suppressCommandInterpretation && isChatStopCommandText(inboundMessage);
	if (p.toolBindings) {
		if (!client || !isBrowserCopilotClient(clientInfo) || client.pairedClientId !== clientInfo?.id) return {
			ok: false,
			error: "run tool bindings require a paired browser copilot"
		};
		if (!hasGatewayClientCap(client.connect.caps, GATEWAY_CLIENT_CAPS.RUN_TOOL_BINDINGS)) return {
			ok: false,
			error: "run tool bindings require client capability"
		};
	}
	if (isBrowserCopilotClient(clientInfo) && !stopCommand && (!p.toolBindings || !Object.hasOwn(p.toolBindings, "browser"))) return {
		ok: false,
		error: "browser copilot runs require an explicit browser tool binding"
	};
	const turnKind = !suppressCommandInterpretation && isBtwRequestText(inboundMessage) ? "btw" : "main";
	const normalizedAttachments = normalizeRpcAttachmentsToChatAttachments(p.attachments);
	const rawMessage = inboundMessage.trim();
	if (!rawMessage && normalizedAttachments.length === 0) return {
		ok: false,
		error: "message or attachment required"
	};
	return {
		ok: true,
		value: {
			chatSendReceivedAtMs,
			clientInfo,
			supportsTaskSuggestions,
			p,
			explicitOrigin: explicitOriginResult.value,
			inboundMessage,
			systemInputProvenance,
			systemProvenanceReceipt,
			suppressCommandInterpretation,
			toolBindings: p.toolBindings,
			stopCommand,
			turnKind,
			normalizedAttachments,
			rawMessage,
			reconnectResumeRequested: controlUiReconnectResume.resumeRequested
		}
	};
}
//#endregion
//#region src/gateway/server-methods/chat-send-session.ts
function loadChatSendSessionContext(params) {
	const { request, context } = params;
	const { p, explicitOrigin, normalizedAttachments } = request;
	const rawSessionKey = p.sessionKey;
	const agentIdOverride = normalizeOptionalChatText(p.agentId);
	const clientRunId = p.idempotencyKey;
	const pendingChatSendKey = pendingChatSendDedupeKey(clientRunId);
	const runtimeConfig = context.getRuntimeConfig?.();
	const requestedAgentId = resolveRequestedChatAgentId({
		cfg: runtimeConfig,
		requestedSessionKey: rawSessionKey,
		agentId: agentIdOverride
	});
	const sessionLoadKey = runtimeConfig && runtimeConfig.session?.scope !== "global" && rawSessionKey.trim().toLowerCase() === "global" && requestedAgentId ? resolveAgentMainSessionKey({
		cfg: runtimeConfig,
		agentId: requestedAgentId
	}) : rawSessionKey;
	const sessionLoadOptions = requestedAgentId ? { agentId: requestedAgentId } : void 0;
	const sessionLoadStartedAtMs = performance$1.now();
	const sessionLoadResult = measureDiagnosticsTimelineSpanSync("gateway.chat_send.load_session", () => loadSessionEntry(sessionLoadKey, sessionLoadOptions), {
		phase: "agent-turn",
		attributes: {
			runId: clientRunId,
			hasAttachments: normalizedAttachments.length > 0,
			hasExplicitOrigin: explicitOrigin !== void 0
		}
	});
	const sessionLoadMs = roundedChatSendTimingMs(performance$1.now() - sessionLoadStartedAtMs);
	const { cfg, storePath, entry, canonicalKey: sessionKey, legacyKey } = sessionLoadResult;
	const expectedSessionRoutingContract = normalizeOptionalChatText(p.expectedSessionRoutingContract);
	const expectedLeafEntryId = p.expectedLeafEntryId === null ? null : normalizeOptionalChatText(p.expectedLeafEntryId);
	const sessionRoutingChanged = (candidateConfig) => expectedSessionRoutingContract !== void 0 && expectedSessionRoutingContract.toLowerCase() !== resolveSessionRoutingContract(candidateConfig);
	return {
		rawSessionKey,
		sessionLoadKey,
		clientRunId,
		pendingChatSendKey,
		sessionLoadOptions,
		sessionLoadMs,
		cfg,
		storePath,
		entry,
		sessionKey,
		legacyKey,
		sessionRoutingChanged,
		expectedLeafEntryId,
		requestedAgentId
	};
}
/** Load and validate the session/model facts shared by later admission and dispatch phases. */
function prepareChatSendSession(params) {
	const loaded = loadChatSendSessionContext(params);
	const { request, client } = params;
	const { p, explicitOrigin, normalizedAttachments, turnKind, rawMessage } = request;
	const { cfg, sessionKey, entry, legacyKey, rawSessionKey, requestedAgentId } = loaded;
	if (isIncognitoSessionKey(sessionKey) && !entry) return {
		ok: false,
		error: `Incognito session "${sessionKey}" was not found.`
	};
	const missingHarnessSessionError = resolveMissingAgentHarnessSessionError(sessionKey, entry);
	if (missingHarnessSessionError) return {
		ok: false,
		error: missingHarnessSessionError
	};
	const selectedAgent = validateChatSelectedAgent({
		cfg,
		requestedSessionKey: rawSessionKey,
		agentId: requestedAgentId
	});
	if (!selectedAgent.ok) return {
		ok: false,
		error: selectedAgent.error
	};
	const deletedAgentId = resolveDeletedAgentIdFromSessionKey(cfg, sessionKey, entry, { acpMetadataSessionKey: legacyKey ?? sessionKey });
	if (deletedAgentId !== null) return {
		ok: false,
		error: `Agent "${deletedAgentId}" no longer exists in configuration`
	};
	const requestedSessionId = normalizeOptionalChatText(p.sessionId);
	const backingSessionId = entry?.sessionId ?? requestedSessionId;
	const agentId = resolveSessionAgentId({
		sessionKey,
		config: cfg,
		agentId: selectedAgent.agentId
	});
	const activeRunScopeKey = resolveChatSendActiveScopeKey({
		sessionKey,
		agentId: selectedAgent.agentId,
		mainKey: cfg.session?.mainKey
	});
	const resolvedSessionModel = resolveSessionModelRef(cfg, entry, agentId);
	const resolvedSessionAuthProvider = resolveProviderIdForAuth(resolvedSessionModel.provider, { config: cfg });
	const timeoutMs = resolveAgentTimeoutMs({
		cfg,
		overrideMs: p.timeoutMs
	});
	const now = Date.now();
	const restartSafeRequest = createRestartSafeChatRequest({
		cfg,
		eligible: isBrowserOperatorUiClient(request.clientInfo) && turnKind === "main" && normalizedAttachments.length === 0 && !request.reconnectResumeRequested && explicitOrigin === void 0 && p.deliver !== true && p.thinking === void 0 && p.fastMode === void 0 && p.fastAutoOnSeconds === void 0 && p.timeoutMs === void 0 && request.systemInputProvenance === void 0 && request.systemProvenanceReceipt === void 0 && !request.suppressCommandInterpretation,
		message: rawMessage,
		senderIsOwner: hasGatewayAdminScope(client)
	});
	return {
		ok: true,
		value: {
			...loaded,
			selectedAgent,
			requestedSessionId,
			backingSessionId,
			agentId,
			activeRunScopeKey,
			resolvedSessionModel,
			resolvedSessionAuthProvider,
			timeoutMs,
			now,
			restartSafeRequest
		}
	};
}
//#endregion
//#region src/gateway/server-methods/chat-send-setup.ts
/** Normalize, prepare, and exclusively admit one new chat.send request. */
async function prepareAndAdmitChatSend({ params, respond, context, client }, onAdmissionOwned) {
	const normalizedRequest = normalizeChatSendRequest({
		params,
		client
	});
	if (!normalizedRequest.ok) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, normalizedRequest.error));
		return;
	}
	const preparedSession = prepareChatSendSession({
		request: normalizedRequest.value,
		context,
		client
	});
	if (!preparedSession.ok) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, preparedSession.error));
		return;
	}
	if (!await runChatSendPreAdmission({
		request: normalizedRequest.value,
		session: preparedSession.value,
		respond,
		context,
		client
	})) return;
	const admitted = await admitChatSend({
		request: normalizedRequest.value,
		session: preparedSession.value,
		respond,
		context,
		client,
		onAdmissionOwned
	});
	if (!admitted.ok) return;
	return {
		normalizedRequest,
		preparedSession,
		admitted
	};
}
//#endregion
//#region src/gateway/server-methods/chat-send-source-finalization.ts
function selectChatSendAgentReplyPayloads(params) {
	return params.deliveredReplies.filter((entry) => entry.kind === "final").map((entry) => entry.payload).filter((payload) => !payload.isError && isSourceReplyTranscriptMirrorPayload(payload) || !params.hasReturnedAgentErrorPayloads && isReplyPayloadStatusNotice(payload));
}
/** Persist and broadcast agent-run source/status replies that bypass the normal model turn. */
async function finalizeChatSendSourceReplies(params) {
	const { accountId, context, deliveredReplies, emitFirstAssistantServerTiming, hasReturnedAgentErrorPayloads, session } = params;
	const { agentId, backingSessionId, cfg, clientRunId, sessionKey, sessionLoadOptions } = session;
	const agentRunReplyPayloads = selectChatSendAgentReplyPayloads({
		deliveredReplies,
		hasReturnedAgentErrorPayloads
	});
	if (agentRunReplyPayloads.length === 0) return false;
	const hasSourceReplyTranscriptMirror = agentRunReplyPayloads.some(isSourceReplyTranscriptMirrorPayload);
	const finalPayloads = await normalizeWebchatReplyMediaPathsForDisplay({
		cfg,
		sessionKey,
		agentId,
		accountId,
		payloads: agentRunReplyPayloads
	});
	const { storePath: latestStorePath, entry: latestEntry } = loadSessionEntry(sessionKey, sessionLoadOptions);
	const sessionId = latestEntry?.sessionId ?? backingSessionId ?? clientRunId;
	const mediaLocalRoots = appendLocalMediaParentRoots(getAgentScopedMediaLocalRoots(cfg, agentId), latestStorePath ? [latestStorePath] : void 0);
	const buildReplyAssistantContent = async (payloads) => await buildAssistantDisplayContentFromReplyPayloads({
		sessionKey,
		agentId,
		payloads,
		managedMediaLocalRoots: mediaLocalRoots,
		includeSensitiveMedia: false,
		onManagedMediaPrepareError: (message) => {
			context.logGateway.warn(`webchat media embedding skipped attachment: ${message}`);
		}
	});
	const buildReplyMediaMessage = async (payloads) => await buildWebchatAssistantMessageFromReplyPayloads(payloads, {
		localRoots: mediaLocalRoots,
		onLocalAudioAccessDenied: (err) => {
			context.logGateway.warn(`webchat audio embedding denied local path: ${formatForLog(err)}`);
		}
	});
	const combinedAssistantContent = agentRunReplyPayloads.length === 1 ? await buildReplyAssistantContent(finalPayloads) : void 0;
	const combinedMediaMessage = agentRunReplyPayloads.length === 1 ? await buildReplyMediaMessage(finalPayloads) : void 0;
	const sourceReplyContentStates = [];
	const sourceReplyBroadcastContent = [];
	for (const [replyIndex] of agentRunReplyPayloads.entries()) {
		const finalPayload = finalPayloads[replyIndex];
		if (!finalPayload) continue;
		const replyAssistantContent = agentRunReplyPayloads.length === 1 ? combinedAssistantContent : await buildReplyAssistantContent([finalPayload]);
		const replyMediaMessage = agentRunReplyPayloads.length === 1 ? combinedMediaMessage : await buildReplyMediaMessage([finalPayload]);
		const replyBroadcastContent = hasAssistantDisplayMediaContent(replyAssistantContent) ? replyAssistantContent : hasAssistantDisplayMediaContent(replyMediaMessage?.content) ? replyMediaMessage?.content : replyAssistantContent;
		const persistedContent = replaceAssistantContentTextBlocks(replyAssistantContent, replyMediaMessage ?? null);
		const state = {
			broadcastContent: replyBroadcastContent ? [...replyBroadcastContent] : [],
			persistedContent: persistedContent ? [...persistedContent] : [],
			hasManagedOutgoingContent: hasManagedOutgoingAssistantContent(persistedContent),
			backedManagedOutgoingContent: false
		};
		sourceReplyContentStates[replyIndex] = state;
		if (state.broadcastContent.length > 0) sourceReplyBroadcastContent.push(...state.broadcastContent);
	}
	const displayReply = extractAssistantDisplayTextFromContent(sourceReplyBroadcastContent) ?? buildTranscriptReplyText(finalPayloads);
	if (!sourceReplyBroadcastContent.length && !displayReply) return false;
	const sourceReplyPersistenceRequests = [];
	for (const [replyIndex, sourceReplyPayload] of agentRunReplyPayloads.entries()) {
		const state = sourceReplyContentStates[replyIndex];
		if (!state || !hasAssistantDisplayMediaContent(state.persistedContent)) continue;
		const mirrorMetadata = getReplyPayloadMetadata(sourceReplyPayload)?.sourceReplyTranscriptMirror;
		const mirrorIdempotencyKey = mirrorMetadata?.idempotencyKey;
		if (typeof mirrorIdempotencyKey !== "string" || mirrorIdempotencyKey.trim().length === 0) continue;
		if (!state.hasManagedOutgoingContent) state.backedManagedOutgoingContent = true;
		sourceReplyPersistenceRequests.push({
			idempotencyKey: mirrorIdempotencyKey,
			metadata: mirrorMetadata,
			state
		});
	}
	const sourceReplyMirrorCandidates = [];
	for (const [replyIndex, sourceReplyPayload] of agentRunReplyPayloads.entries()) {
		if (!sourceReplyContentStates[replyIndex]) continue;
		const mirrorMetadata = getReplyPayloadMetadata(sourceReplyPayload)?.sourceReplyTranscriptMirror;
		const mirrorIdempotencyKey = mirrorMetadata?.idempotencyKey;
		if (typeof mirrorIdempotencyKey !== "string" || mirrorIdempotencyKey.trim().length === 0 || !mirrorMetadata) continue;
		sourceReplyMirrorCandidates.push({
			idempotencyKey: mirrorIdempotencyKey,
			metadata: mirrorMetadata
		});
	}
	const attachSourceReplyManagedImages = async (attachParams) => {
		if (!attachParams.request.state.hasManagedOutgoingContent) {
			attachParams.request.state.backedManagedOutgoingContent = true;
			return;
		}
		if (!attachParams.messageId) return;
		await attachManagedOutgoingMediaToMessage({
			messageId: attachParams.messageId,
			blocks: attachParams.request.state.persistedContent
		});
		attachParams.request.state.backedManagedOutgoingContent = true;
	};
	const sourceReplyScope = assistantTranscriptScope({
		sessionId,
		sessionKey,
		storePath: latestStorePath,
		agentId
	});
	if (sourceReplyScope && sourceReplyPersistenceRequests.length > 0) {
		const rewritten = await rewriteSourceReplyTranscriptMirrors({
			candidates: sourceReplyMirrorCandidates,
			requests: sourceReplyPersistenceRequests,
			scope: sourceReplyScope
		});
		if (rewritten.length > 0) {
			await publishAssistantTranscriptRewrite({
				scope: sourceReplyScope,
				rewritten
			});
			for (const target of rewritten) await attachSourceReplyManagedImages({
				messageId: target.messageId,
				request: target.request
			});
		}
	}
	const sourceReplyContent = sourceReplyContentStates.flatMap((state) => {
		if (state.hasManagedOutgoingContent && !state.backedManagedOutgoingContent) {
			const stripped = stripManagedOutgoingAssistantContentBlocks(state.broadcastContent);
			return stripped?.length ? stripped : [{
				type: "text",
				text: "Media reply could not be displayed."
			}];
		}
		return state.broadcastContent;
	}).filter((block) => Boolean(block));
	const sourceReplyText = extractAssistantDisplayTextFromContent(sourceReplyContent) ?? (sourceReplyContent.length === 0 ? displayReply : void 0);
	const message = {
		role: "assistant",
		...sourceReplyContent.length ? { content: sourceReplyContent } : sourceReplyText ? { content: [{
			type: "text",
			text: sourceReplyText
		}] } : {},
		...sourceReplyText ? { text: sourceReplyText } : {},
		timestamp: Date.now(),
		stopReason: "stop",
		usage: {
			input: 0,
			output: 0,
			totalTokens: 0
		}
	};
	if (hasVisibleAssistantFinalMessage(message)) emitFirstAssistantServerTiming();
	broadcastChatFinal({
		context,
		runId: clientRunId,
		sessionKey,
		agentId,
		message
	});
	return hasSourceReplyTranscriptMirror;
}
//#endregion
//#region src/gateway/server-methods/chat-send-user-turn.ts
async function persistChatSendImages(params) {
	if (params.images.length === 0 && params.offloadedRefs.length === 0 || isAcpBridgeClient(params.client)) return [];
	return await persistInboundImagesForTranscript({
		images: params.images,
		imageOrder: params.imageOrder,
		offloadedRefs: params.offloadedRefs,
		log: params.logGateway,
		logContext: "chat.send"
	});
}
function resolveChatSendManagedMedia(savedImages) {
	return savedImages.map((entry) => ({
		path: entry.path,
		contentType: entry.contentType ?? "application/octet-stream"
	}));
}
function applyChatSendManagedMedia(ctx, media) {
	if ((!ctx.media || ctx.media.length === 0) && media.length > 0) ctx.media = media;
}
function buildChatSendUserTurnMedia(savedMedia, offloadedRefs) {
	const offloadedRefsById = new Map(offloadedRefs.map((ref) => [ref.id, ref]));
	return savedMedia.map((entry) => {
		const offloadedRef = offloadedRefsById.get(entry.id);
		return {
			path: entry.path,
			...offloadedRef ? {
				url: offloadedRef.mediaRef,
				kind: offloadedRef.kind,
				fileName: offloadedRef.label,
				sizeBytes: offloadedRef.sizeBytes,
				...offloadedRef.durationMs !== void 0 ? { durationMs: offloadedRef.durationMs } : {},
				...offloadedRef.width !== void 0 ? { width: offloadedRef.width } : {},
				...offloadedRef.height !== void 0 ? { height: offloadedRef.height } : {},
				...offloadedRef.mimeType.startsWith("image/") ? {} : { hydrationSuppressed: true }
			} : {},
			contentType: entry.contentType,
			...offloadedRef?.durationMs ? { durationMs: offloadedRef.durationMs } : {},
			...offloadedRef?.width ? { width: offloadedRef.width } : {},
			...offloadedRef?.height ? { height: offloadedRef.height } : {}
		};
	});
}
function buildChatSendPromptMedia(attachments) {
	if (!attachments.imageOrder.includes("offloaded")) return;
	const media = attachments.offloadedRefs.filter((ref) => ref.mimeType.startsWith("image/")).map((ref) => ({
		path: ref.path,
		url: ref.mediaRef,
		contentType: ref.mimeType
	}));
	return media.length > 0 ? media : void 0;
}
function buildChatSendMessageContext(params) {
	const commandBody = params.parsedMessage;
	const commandSource = !params.suppressCommandInterpretation && params.parsedMessage.trim().startsWith("/") ? "text" : void 0;
	const messageForAgent = params.systemProvenanceReceipt ? [params.systemProvenanceReceipt, params.parsedMessage].filter(Boolean).join("\n\n") : params.parsedMessage;
	const queuedFollowupOwnerDeviceId = normalizeOptionalChatText(params.client?.connect?.device?.id);
	const queuedFollowupOwnerConnId = normalizeOptionalChatText(params.client?.connId);
	const queuedFollowupOwnerKey = queuedFollowupOwnerDeviceId ? `device:${queuedFollowupOwnerDeviceId}` : queuedFollowupOwnerConnId ? `connection:${queuedFollowupOwnerConnId}` : void 0;
	const { originatingChannel, originatingTo, accountId, messageThreadId, explicitDeliverRoute } = params.originatingRoute;
	const ctx = {
		Body: messageForAgent,
		BodyForAgent: messageForAgent,
		BodyForCommands: commandBody,
		RawBody: params.parsedMessage,
		CommandBody: commandBody,
		InputProvenance: params.systemInputProvenance,
		SessionKey: params.sessionKey,
		AgentId: params.agentId,
		Provider: INTERNAL_MESSAGE_CHANNEL,
		Surface: INTERNAL_MESSAGE_CHANNEL,
		OriginatingChannel: originatingChannel,
		OriginatingTo: originatingTo,
		ExplicitDeliverRoute: explicitDeliverRoute,
		AccountId: accountId,
		MessageThreadId: messageThreadId,
		ChatType: "direct",
		...commandSource ? { CommandSource: commandSource } : {},
		CommandAuthorized: !params.suppressCommandInterpretation,
		CommandTurn: commandSource ? {
			kind: "text-slash",
			source: commandSource,
			authorized: true,
			body: commandBody
		} : {
			kind: "normal",
			source: "message",
			authorized: false,
			body: commandBody
		},
		MessageSid: params.clientRunId,
		SessionCreation: resolveOperatorSessionCreation(params.client),
		ApprovalReviewerDeviceId: queuedFollowupOwnerDeviceId,
		...!isOperatorUiClient(params.clientInfo) ? {
			SenderId: params.clientInfo?.id,
			SenderName: params.clientInfo?.displayName,
			SenderUsername: params.clientInfo?.displayName
		} : {},
		GatewayClientScopes: params.client?.connect?.scopes ?? [],
		GatewayClientCaps: params.client?.connect?.caps ?? [],
		GatewayRunToolBindings: params.toolBindings
	};
	if (params.mediaPathOffloadPaths.length > 0) ctx.media = params.mediaPathOffloadPaths.map((pathValue, index) => ({
		path: pathValue,
		contentType: params.mediaPathOffloadTypes[index],
		workspaceDir: params.mediaPathOffloadWorkspaceDir ?? path.dirname(pathValue)
	}));
	return {
		accountId,
		ctx,
		isInternalTextSlashCommandTurn: commandSource === "text",
		queuedFollowupOwnerKey
	};
}
/** Assemble transcript media and the portable inbound context after chat.send ACK. */
function prepareChatSendUserTurn(params) {
	const { request, session, admission, attachments, client, logGateway, userTurn } = params;
	const persistedMediaForTranscriptPromise = persistChatSendImages({
		images: attachments.parsedImages,
		imageOrder: attachments.imageOrder,
		offloadedRefs: attachments.offloadedRefs,
		client,
		logGateway
	});
	const preparedUserTurnMediaPromise = request.normalizedAttachments.length > 0 ? persistedMediaForTranscriptPromise.then((media) => buildChatSendUserTurnMedia(media, attachments.offloadedRefs)) : Promise.resolve([]);
	userTurn.setInputPromise(preparedUserTurnMediaPromise.then((media) => ({
		...userTurn.baseInput,
		...media.length > 0 ? { media } : {},
		...media.length > 0 && attachments.imageOrder.length > 0 ? { mediaImageLayout: { slots: attachments.imageOrder.map((kind, factIndex) => ({
			kind,
			factIndex
		})) } } : {}
	})));
	const pluginBoundMediaPromise = attachments.explicitOriginTargetsPlugin && attachments.parsedImages.length > 0 ? persistedMediaForTranscriptPromise.then(resolveChatSendManagedMedia) : Promise.resolve([]);
	const messageContext = buildChatSendMessageContext({
		agentId: session.agentId,
		client,
		clientInfo: request.clientInfo,
		clientRunId: session.clientRunId,
		mediaPathOffloadPaths: attachments.mediaPathOffloadPaths,
		mediaPathOffloadTypes: attachments.mediaPathOffloadTypes,
		mediaPathOffloadWorkspaceDir: attachments.mediaPathOffloadWorkspaceDir,
		originatingRoute: admission.originatingRoute,
		parsedMessage: attachments.parsedMessage,
		sessionKey: session.sessionKey,
		suppressCommandInterpretation: request.suppressCommandInterpretation,
		systemInputProvenance: request.systemInputProvenance,
		systemProvenanceReceipt: request.systemProvenanceReceipt,
		toolBindings: request.toolBindings
	});
	const mediaPathOffloadsIncludeImages = attachments.mediaPathOffloadTypes.some((type) => type.startsWith("image/"));
	return {
		...messageContext,
		pluginBoundMediaPromise,
		replyOptionImages: mediaPathOffloadsIncludeImages ? void 0 : attachments.parsedImages.length > 0 ? attachments.parsedImages : void 0,
		replyOptionMedia: buildChatSendPromptMedia(attachments)
	};
}
//#endregion
//#region src/gateway/server-methods/chat-user-turn-recorder.ts
function createGatewayChatUserTurnController(params) {
	const baseInput = {
		text: params.rawMessage,
		timestamp: params.now,
		idempotencyKey: buildRunUserTurnIdempotencyKey(params.clientRunId),
		...params.sender ? { sender: params.sender } : {},
		...params.senderIsOwner ? { senderIsOwner: true } : {},
		...params.provenance ? { provenance: params.provenance } : {}
	};
	let inputPromise = Promise.resolve(baseInput);
	let acceptedSessionId = params.initialSessionId;
	const recorder = createUserTurnTranscriptRecorder({
		input: baseInput,
		resolveInput: () => inputPromise,
		target: () => {
			const { storePath, store, entry } = loadSessionEntry(params.sessionKey, params.sessionLoadOptions);
			if (!entry?.sessionId || entry.sessionId !== acceptedSessionId) return;
			return {
				sessionId: entry.sessionId,
				expectedSessionId: entry.sessionId,
				sessionKey: params.sessionKey,
				sessionEntry: entry,
				sessionStore: store,
				storePath,
				agentId: params.agentId,
				config: params.cfg
			};
		},
		...params.restartAdmission ? buildRestartSafeChatTranscriptState({
			admission: params.restartAdmission,
			clientRunId: params.clientRunId,
			startedAt: params.startedAt
		}) : {},
		errorContext: "gateway chat user turn transcript",
		beforeMessageWrite: runAgentHarnessBeforeMessageWriteHook,
		onPersistenceError: (error) => params.warn(`gateway user transcript persistence failed: ${formatForLog(error)}`)
	});
	const persist = async () => await measureDiagnosticsTimelineSpan("gateway.chat_send.persist_user_transcript", () => recorder.persistFallback(), {
		phase: "agent-turn",
		config: params.cfg,
		attributes: params.traceAttributes
	});
	return {
		baseInput,
		persist,
		persistBestEffort: async () => {
			await persist().catch(() => void 0);
		},
		recorder,
		setAcceptedSessionId: (sessionId) => {
			acceptedSessionId = sessionId;
		},
		setInputPromise: (input) => {
			inputPromise = input;
		}
	};
}
//#endregion
//#region src/gateway/server-methods/chat-send-handler.ts
async function handleChatSend({ params, respond, context, client }, onAdmissionOwned) {
	const setup = await prepareAndAdmitChatSend({
		params,
		respond,
		context,
		client
	}, onAdmissionOwned);
	if (!setup) return;
	const { normalizedRequest, preparedSession, admitted } = setup;
	const { chatSendReceivedAtMs, clientInfo, supportsTaskSuggestions, p, systemInputProvenance, rawMessage, reconnectResumeRequested } = normalizedRequest.value;
	const { clientRunId, sessionLoadOptions, sessionLoadMs, cfg, storePath, entry, sessionKey, sessionRoutingChanged, selectedAgent, requestedSessionId, backingSessionId, agentId, activeRunScopeKey, resolvedSessionModel, now } = preparedSession.value;
	const { activeRunAbort, admittedSessionId, chatSendTraceAttributes, cleanupAdmittedRun, finishAbortedChatSend, gatewayWorkAdmission, lifecycleGeneration, restartSafeAdmission, setReleaseGatewayRootContinuation } = admitted.value;
	const preparedAttachments = await prepareChatSendAttachments({
		request: normalizedRequest.value,
		session: preparedSession.value,
		admission: admitted.value,
		respond,
		context
	});
	if (!preparedAttachments.ok) return;
	if (activeRunAbort.controller.signal.aborted) {
		finishAbortedChatSend();
		return;
	}
	if (sessionRoutingChanged(context.getRuntimeConfig())) {
		cleanupAdmittedRun({ force: true });
		clearAgentRunContext(clientRunId, lifecycleGeneration);
		respondChatSessionRoutingChanged(respond);
		return;
	}
	const { imageOrder, prepareAttachmentsMs } = preparedAttachments.value;
	const admissionStartedAt = Date.now();
	const terminalizeRestartSafeAdmission = async (terminalState) => await terminalizeRestartSafeChatAdmission({
		admittedSessionId,
		clientRunId,
		sessionKey,
		startedAt: admissionStartedAt,
		storePath,
		...terminalState
	});
	try {
		const userTurn = createGatewayChatUserTurnController({
			agentId,
			cfg,
			clientRunId,
			initialSessionId: admittedSessionId,
			now,
			...systemInputProvenance ? { provenance: systemInputProvenance } : {},
			rawMessage,
			...restartSafeAdmission ? { restartAdmission: restartSafeAdmission } : {},
			...gatewayClientSenderFields(client),
			senderIsOwner: hasGatewayAdminScope(client),
			sessionKey,
			...sessionLoadOptions ? { sessionLoadOptions } : {},
			startedAt: admissionStartedAt,
			traceAttributes: chatSendTraceAttributes,
			warn: (message) => context.logGateway.warn(message)
		});
		const { persist: persistGatewayUserTurnTranscript, persistBestEffort: persistGatewayUserTurnTranscriptBestEffort, recorder: userTurnRecorder } = userTurn;
		if (restartSafeAdmission) {
			const persistedUserTurn = await persistGatewayUserTurnTranscript();
			const admittedEntry = persistedUserTurn?.sessionEntry;
			if (!persistedUserTurn || admittedEntry?.status !== "running" || admittedEntry.restartRecoveryDeliveryRunId !== clientRunId) throw new Error("chat turn was not durably admitted");
			if (lifecycleGeneration !== getAgentEventLifecycleGeneration()) {
				if (activeRunAbort.entry) activeRunAbort.entry.abortStopReason = "restart";
				activeRunAbort.controller.abort(createAgentRunRestartAbortError());
			}
			if (activeRunAbort.controller.signal.aborted) {
				if (!await terminalizeRestartSafeAdmission({
					retryable: activeRunAbort.entry?.abortStopReason === "restart",
					status: "killed"
				})) throw new Error("chat admission ownership changed before terminalization");
				finishAbortedChatSend();
				return;
			}
			if (sessionRoutingChanged(context.getRuntimeConfig())) {
				if (!await terminalizeRestartSafeAdmission({
					retryable: true,
					status: "failed"
				})) throw new Error("chat admission ownership changed before terminalization");
				cleanupAdmittedRun({ force: true });
				clearAgentRunContext(clientRunId, lifecycleGeneration);
				respondChatSessionRoutingChanged(respond);
				return;
			}
		}
		const serverTiming = shouldIncludeChatSendAckServerTiming(clientInfo) ? {
			receivedToAckMs: roundedChatSendTimingMs(performance$1.now() - chatSendReceivedAtMs),
			loadSessionMs: sessionLoadMs,
			...prepareAttachmentsMs !== void 0 ? { prepareAttachmentsMs } : {}
		} : void 0;
		const chatSendTiming = serverTiming && typeof client?.connId === "string" && client.connId.trim() ? {
			ackedAtMs: performance$1.now(),
			connId: client.connId.trim(),
			receivedAtMs: chatSendReceivedAtMs
		} : void 0;
		context.addChatRun(clientRunId, {
			sessionKey,
			agentId: selectedAgent.agentId,
			clientRunId,
			...chatSendTiming ? { chatSendTiming } : {}
		});
		const ackPayload = {
			runId: clientRunId,
			status: "started",
			...serverTiming ? { serverTiming } : {}
		};
		emitDiagnosticsTimelineEvent({
			type: "mark",
			name: "gateway.chat_send.ack_ready",
			phase: "agent-turn",
			attributes: {
				...chatSendTraceAttributes,
				ackStatus: ackPayload.status,
				...chatSendAckServerTimingAttributes(serverTiming)
			}
		}, { config: cfg });
		respond(true, ackPayload, void 0, { runId: clientRunId });
		const chatSendAckedAtMs = chatSendTiming?.ackedAtMs ?? performance$1.now();
		scheduleChatDashboardSessionTitle({
			admittedSessionId,
			agentId,
			cfg,
			context,
			entry,
			rawMessage,
			sessionKey,
			sessionLoadOptions,
			storePath
		});
		const { accountId, ctx, isInternalTextSlashCommandTurn, pluginBoundMediaPromise, queuedFollowupOwnerKey, replyOptionImages, replyOptionMedia } = prepareChatSendUserTurn({
			request: normalizedRequest.value,
			session: preparedSession.value,
			admission: admitted.value,
			attachments: preparedAttachments.value,
			client,
			logGateway: context.logGateway,
			userTurn
		});
		const replyContextFieldsPromise = p.replyToId ? resolveChatSendReplyContext({
			replyToId: p.replyToId,
			cfg,
			agentId,
			sessionKey,
			sessionEntry: entry,
			storePath,
			userSenderLabel: clientInfo?.displayName,
			warn: (message) => context.logGateway.warn(message)
		}) : void 0;
		let agentRunStarted = false;
		const replyDispatch = createChatSendReplyDispatch({
			accountId,
			isAgentRunStarted: () => agentRunStarted,
			logGateway: context.logGateway,
			session: preparedSession.value,
			userTurnRecorder
		});
		let queuedFollowupEnqueued = false;
		const dispatchErrorLifecycle = createChatSendDispatchErrorLifecycle({
			admission: admitted.value,
			context,
			isQueuedFollowupEnqueued: () => queuedFollowupEnqueued,
			persistUserTurnTranscript: persistGatewayUserTurnTranscript,
			session: preparedSession.value,
			terminalizeRestartSafeAdmission,
			userTurnRecorder
		});
		const emitServerTiming = (phase, extra, dispatchStartedAtMs) => {
			emitOperatorChatSendServerTiming({
				context,
				client,
				phase,
				runId: clientRunId,
				sessionKey,
				agentId,
				receivedAtMs: chatSendReceivedAtMs,
				ackedAtMs: chatSendAckedAtMs,
				dispatchStartedAtMs,
				extra
			});
		};
		const dispatchStartedAtMs = performance$1.now();
		if (chatSendTiming) chatSendTiming.dispatchStartedAtMs = dispatchStartedAtMs;
		emitServerTiming("dispatch-started");
		let firstAssistantServerTimingEmitted = false;
		const emitFirstAssistantServerTiming = () => {
			if (firstAssistantServerTimingEmitted || chatSendTiming?.firstAssistantEventSent) return;
			firstAssistantServerTimingEmitted = true;
			if (chatSendTiming) chatSendTiming.firstAssistantEventSent = true;
			emitServerTiming("first-assistant-event", void 0, dispatchStartedAtMs);
		};
		setReleaseGatewayRootContinuation(retainGatewayRootWorkAdmissionContinuation() ?? void 0);
		replyDispatch.runAgentMediaTranscript(gatewayWorkAdmission, () => measureDiagnosticsTimelineSpan("gateway.chat_send.dispatch_inbound", async () => {
			applyChatSendManagedMedia(ctx, await pluginBoundMediaPromise);
			if (replyContextFieldsPromise) applyChatSendReplyContextFields(ctx, await replyContextFieldsPromise);
			const dispatchResult = await dispatchInboundMessageWithProjectedDispatcher({
				ctx,
				cfg,
				dispatcherOptions: replyDispatch.dispatcherOptions,
				onSessionMetadataChanges: (changes) => {
					for (const change of changes) emitSessionsChanged(context, change);
				},
				replyOptions: {
					runId: clientRunId,
					...isOperatorUiClient(clientInfo) ? { promptCacheKey: resolveWebchatPromptCacheKey({
						agentId,
						provider: resolvedSessionModel.provider,
						model: resolvedSessionModel.model,
						sessionKey: activeRunScopeKey
					}) } : {},
					...supportsTaskSuggestions ? { taskSuggestionDeliveryMode: "gateway" } : {},
					requestedSessionId,
					...restartSafeAdmission ? {
						expectedExistingSessionId: admittedSessionId,
						pinExpectedExistingSession: true
					} : entry?.sessionId ? { expectedExistingSessionId: entry.sessionId } : {},
					resumeRequestedSession: reconnectResumeRequested,
					onSessionPrepared: (binding) => {
						if (binding.sessionKey === sessionKey) userTurn.setAcceptedSessionId(binding.sessionId);
					},
					abortSignal: activeRunAbort.controller.signal,
					turnAdoptionLifecycle: {
						admission: "cancel-only",
						ownerKey: queuedFollowupOwnerKey,
						onAdopted: async () => {},
						onDeferred: () => {
							queuedFollowupEnqueued = registerQueuedChatTurn({
								chatQueuedTurns: ensureChatQueuedTurns(context),
								runId: clientRunId,
								controller: activeRunAbort.controller,
								sessionId: backingSessionId ?? clientRunId,
								sessionKey,
								agentId: selectedAgent.agentId,
								ownerConnId: normalizeOptionalChatText(client?.connId),
								ownerDeviceId: normalizeOptionalChatText(client?.connect?.device?.id)
							});
							return queuedFollowupEnqueued;
						},
						onCancellationRetired: () => {
							retireQueuedChatTurnCancellation(ensureChatQueuedTurns(context), clientRunId, activeRunAbort.controller);
						},
						onSettled: () => {
							completeQueuedChatTurn(ensureChatQueuedTurns(context), clientRunId, activeRunAbort.controller);
						}
					},
					images: replyOptionImages,
					imageOrder: imageOrder.length > 0 ? imageOrder : void 0,
					media: replyOptionMedia,
					thinkingLevelOverride: p.thinking,
					fastModeOverride: p.fastMode,
					queueModeOverride: p.queueMode,
					userTurnTranscriptRecorder: userTurnRecorder,
					...restartSafeAdmission ? { suppressNextUserMessagePersistence: true } : {},
					fastModeAutoOnSecondsOverride: p.fastAutoOnSeconds,
					onAgentRunStart: (runId) => {
						agentRunStarted = replyDispatch.captureAgentTranscriptStart();
						emitServerTiming("agent-run-started", runId !== clientRunId ? { agentRunId: runId } : void 0, dispatchStartedAtMs);
						const connId = typeof client?.connId === "string" ? client.connId : void 0;
						const wantsToolEvents = hasGatewayClientCap(client?.connect?.caps, GATEWAY_CLIENT_CAPS.TOOL_EVENTS);
						if (connId && wantsToolEvents) {
							context.registerToolEventRecipient(runId, connId);
							const defaultAgentId = resolveDefaultAgentId(cfg);
							const selectedGlobalAgentId = sessionKey === "global" ? selectedAgent.agentId ?? defaultAgentId : void 0;
							for (const [activeRunId, active] of context.chatAbortControllers) {
								const activeGlobalAgentId = active.sessionKey === "global" ? active.agentId ?? defaultAgentId : void 0;
								const sameSelectedGlobalAgent = sessionKey === "global" && selectedGlobalAgentId !== void 0 && activeGlobalAgentId === selectedGlobalAgentId;
								const sameSession = active.sessionKey === sessionKey && (sessionKey !== "global" || sameSelectedGlobalAgent);
								if (activeRunId !== runId && sameSession) context.registerToolEventRecipient(activeRunId, connId);
							}
						}
					},
					onModelSelected: (modelSelection) => {
						updateChatRunProvider(context.chatAbortControllers, {
							runId: clientRunId,
							providerId: modelSelection.provider,
							authProviderId: resolveProviderIdForAuth(modelSelection.provider, { config: cfg })
						});
						replyDispatch.onModelSelected(modelSelection);
						emitServerTiming("model-selected", {
							provider: modelSelection.provider,
							model: modelSelection.model
						}, dispatchStartedAtMs);
					}
				}
			});
			if (dispatchResult.beforeAgentRunBlocked === true) userTurnRecorder.markBlocked();
			return dispatchResult;
		}, {
			phase: "agent-turn",
			config: cfg,
			attributes: chatSendTraceAttributes
		})).then(async () => {
			emitServerTiming("dispatch-completed", void 0, dispatchStartedAtMs);
			const postDispatchStartedAtMs = performance$1.now();
			await measureDiagnosticsTimelineSpan("gateway.chat_send.post_dispatch", async () => {
				const returnedAgentErrorPayloads = agentRunStarted ? replyDispatch.deliveredReplies.map((entryInner) => entryInner.payload).filter((payload) => payload.isError) : [];
				const returnedAgentErrorMessage = returnedAgentErrorPayloads.map((payload) => payload.text?.trim()).filter((text) => Boolean(text)).join(" | ") || void 0;
				if (agentRunStarted && returnedAgentErrorPayloads.length > 0 && !userTurnRecorder.hasPersisted() && !userTurnRecorder.isBlocked()) await persistGatewayUserTurnTranscriptBestEffort();
				if (agentRunStarted && returnedAgentErrorPayloads.length === 0 && !userTurnRecorder.hasPersisted() && !userTurnRecorder.isBlocked() && userTurnRecorder.hasRuntimePersistencePending()) await persistGatewayUserTurnTranscriptBestEffort();
				let broadcastedSourceReplyFinal = false;
				if (!agentRunStarted && !queuedFollowupEnqueued) await finalizeChatSendNonAgentReplies({
					accountId,
					context,
					deliveredReplies: replyDispatch.deliveredReplies,
					emitFirstAssistantServerTiming,
					foldCommandBlocks: isInternalTextSlashCommandTurn,
					persistUserTurnTranscript: persistGatewayUserTurnTranscriptBestEffort,
					session: preparedSession.value,
					suppressReplies: replyDispatch.hasAppendedWebchatAgentMedia()
				});
				else broadcastedSourceReplyFinal = await finalizeChatSendSourceReplies({
					accountId,
					context,
					deliveredReplies: replyDispatch.deliveredReplies,
					emitFirstAssistantServerTiming,
					hasReturnedAgentErrorPayloads: returnedAgentErrorPayloads.length > 0,
					session: preparedSession.value
				});
				const shouldBroadcastAgentError = returnedAgentErrorPayloads.length > 0 && !broadcastedSourceReplyFinal;
				if (shouldBroadcastAgentError) broadcastChatError({
					context,
					runId: clientRunId,
					sessionKey,
					agentId,
					errorMessage: returnedAgentErrorMessage
				});
				if (!context.chatRunState.hasAbortMarker(clientRunId)) {
					const returnedAgentError = shouldBroadcastAgentError ? errorShape(ErrorCodes.UNAVAILABLE, returnedAgentErrorMessage ?? "agent returned an error payload") : void 0;
					setGatewayDedupeEntry({
						dedupe: context.dedupe,
						key: `chat:${clientRunId}`,
						entry: {
							ts: Date.now(),
							ok: !shouldBroadcastAgentError,
							payload: shouldBroadcastAgentError ? {
								runId: clientRunId,
								status: "error",
								summary: returnedAgentErrorMessage ?? "agent returned an error payload"
							} : {
								runId: clientRunId,
								status: "ok"
							},
							...returnedAgentError ? { error: returnedAgentError } : {}
						}
					});
				}
			}, {
				phase: "agent-turn",
				config: cfg,
				attributes: chatSendTraceAttributes
			});
			emitServerTiming("post-dispatch-completed", { postDispatchMs: roundedChatSendTimingMs(performance$1.now() - postDispatchStartedAtMs) }, dispatchStartedAtMs);
			if (queuedFollowupEnqueued && !context.chatRunState.hasAbortMarker(clientRunId)) broadcastChatFinal({
				context,
				runId: clientRunId,
				sessionKey,
				agentId
			});
		}).catch(dispatchErrorLifecycle.handleError).finally(dispatchErrorLifecycle.finalize);
	} catch (err) {
		if (restartSafeAdmission) {
			if (await terminalizeRestartSafeAdmission({
				retryable: true,
				status: "failed"
			}).catch((terminalizeError) => {
				context.logGateway.warn(`failed to release restart-safe chat admission after setup error: ${formatForLog(terminalizeError)}`);
				return false;
			})) emitSessionsChanged(context, {
				sessionKey,
				...agentId ? { agentId } : {},
				reason: "chat.dispatch-error"
			});
		}
		cleanupAdmittedRun({ force: true });
		clearAgentRunContext(clientRunId, lifecycleGeneration);
		context.removeChatRun(clientRunId, clientRunId, sessionKey);
		const error = errorShape(ErrorCodes.UNAVAILABLE, String(err));
		const payload = {
			runId: clientRunId,
			status: "error",
			summary: String(err)
		};
		setGatewayDedupeEntry({
			dedupe: context.dedupe,
			key: `chat:${clientRunId}`,
			entry: {
				ts: Date.now(),
				ok: false,
				payload,
				error
			}
		});
		respond(false, payload, error, {
			runId: clientRunId,
			error: formatForLog(err)
		});
		broadcastChatError({
			context,
			runId: clientRunId,
			sessionKey,
			agentId,
			errorMessage: String(err)
		});
	}
}
//#endregion
export { sendGlobalAwareNodeChatPayload as a, sanitizeChatSendMessageInput as i, resolveRequestedChatAgentId as n, validateChatSelectedAgent as r, handleChatSend as t };
