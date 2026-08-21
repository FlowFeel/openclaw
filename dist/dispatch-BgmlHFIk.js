import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.js";
import { t as isParentOwnedBackgroundAcpSession } from "./session-interaction-mode-OIH_Dwbr.js";
import { o as asDateTimestampMs } from "./number-coercion-Crk_c9KW.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { n as isAbortError } from "./abort-signal-DEbc_zqk.js";
import { i as resolveGlobalSingleton, n as resolveGlobalMap } from "./global-singleton-Dc_stLtU.js";
import { o as resolveAgentConfig, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { c as parseAgentSessionKey, n as isAcpSessionKey } from "./session-key-utils-02xWdGSz.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { f as isDiagnosticsEnabled } from "./diagnostic-events-Dt41CZkD.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { n as resolveGlobalDedupeCache } from "./dedupe-B4sBOca4.js";
import { N as withPluginRuntimeRegistryScope } from "./runtime-yJAYArQt.js";
import { i as shouldCleanTtsDirectiveText, o as normalizeTtsAutoMode, r as shouldAttemptTtsPayload, t as resolveConfiguredTtsMode } from "./tts-config-CZ8JKgjp.js";
import { g as resolveSessionAgentId } from "./agent-scope-DyEposw2.js";
import { u as normalizeVerboseLevel } from "./thinking.shared-k6K-6JHM.js";
import { a as measureDiagnosticsTimelineSpan, o as measureDiagnosticsTimelineSpanSync } from "./diagnostics-timeline--Yi1HEPC.js";
import { a as getRuntimeConfigSnapshot } from "./runtime-snapshot-DLOCFXOE.js";
import "./thinking-CLPqbAwx.js";
import { C as resolveModelRefFromString, a as buildModelAliasIndex } from "./model-selection-shared-BDTPW9Jk.js";
import { w as resolveDefaultModelForAgent } from "./codex-route-model-ref-B7v0y8up.js";
import { _ as resolveToolProfilePolicy, c as mergeAlsoAllowPolicy } from "./tool-policy-CrjVfI-s.js";
import { n as isToolAllowedByPolicies } from "./tool-policy-match-BJgxicXr.js";
import { r as logVerbose } from "./globals-DHQUG86L.js";
import { t as applyMergePatch } from "./merge-patch-DNAwVDQs.js";
import "./config-UtpOr1Uw.js";
import { C as buildConversationRef } from "./openclaw-agent-db--PLC25lY.js";
import { t as normalizeChatType } from "./chat-type-BARlA53h.js";
import { f as createPluginSubagentRequesterContext, n as getGlobalPluginRegistry, t as getGlobalHookRunner, v as fireAndForgetHook } from "./hook-runner-global-CRNklGqK.js";
import { a as getReplyPayloadMetadata, f as markReplyPayloadAsTtsSupplement, h as setReplyPayloadMetadata, i as copyReplyPayloadMetadata, l as isReplyPayloadStatusNotice, s as isFastModeAutoProgressPayload } from "./reply-payload-BtIUrr9c.js";
import { n as channelRouteDedupeKey } from "./channel-route-BmrWdIq2.js";
import { d as sessionDeliveryOrigin, u as sessionDeliveryChannel } from "./delivery-context.shared-B-QSuGw_.js";
import "./message-channel-constants-76XnXM8q.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { a as appendSqliteTranscriptEventSync, ct as loadSqliteSessionEntryReadOnly } from "./session-accessor.sqlite-B9iW7DOt.js";
import { a as normalizeChannelId, t as getChannelPlugin } from "./registry-B1AiP2IQ.js";
import { i as normalizeMessageChannel } from "./message-channel-normalize-Bmutiks_.js";
import "./message-channel-1n7hD5_u.js";
import { a as resolveGroupSessionKey } from "./store-entry-shape-DB6qjwcl.js";
import { $ as conversationIdentityFromMsgContext } from "./targets-Dooi6t13.js";
import { h as redactTranscriptMessage } from "./session-accessor.sqlite-transcript-store-Si6-bv-m.js";
import { g as stripLegacyMediaContextFields } from "./media-facts-D_wLZOa9.js";
import { K as updateSessionEntry } from "./session-accessor-t3qUoTeV.js";
import "./model-selection-D5gxVbBh.js";
import { a as isNativeCommandTurn, c as resolveCommandTurnTargetSessionKey, s as resolveCommandTurnContext } from "./command-turn-context-chpcv6RY.js";
import { r as matchPluginCommand } from "./commands-Y6NBpPIv.js";
import { t as getSessionBindingService } from "./session-binding-service-DW9rA35s.js";
import { d as isPluginOwnedSessionBindingRecord, f as markPluginBindingFallbackNoticeShown, g as toPluginConversationBinding, i as buildPluginBindingErrorText, r as buildPluginBindingDeclinedText, s as buildPluginBindingUnavailableText, u as hasShownPluginBindingFallbackNotice, v as resolveConversationBindingRecord, y as touchConversationBindingRecord } from "./conversation-binding-BSvU9WdK.js";
import { i as resolveTextCommand, r as normalizeCommandBody } from "./commands-registry-normalize-CdLMZZiE.js";
import { a as resolveSourceReplyVisibilityPolicy, r as isUnauthorizedTextSlashCommand, t as isExplicitSourceReplyCommand } from "./source-reply-delivery-mode-DkxcVgZe.js";
import { r as readAcpSessionMeta } from "./session-meta-DqFXJodN.js";
import { n as RUN_STALE_TAKEOVER_MS } from "./diagnostic-run-activity-3mcrQxEA.js";
import { F as beginReplyOperationFinalizationWork, M as waitForReplyBarrierSettlement, f as forceClearReplyRunBySessionId, w as replyRunRegistry } from "./reply-run-registry-CA3-OJtf.js";
import { _ as markDiagnosticSessionProgress, a as logMessageDispatchStarted, c as logMessageReceived, i as logMessageDispatchCompleted } from "./diagnostic-DiTvyQCh.js";
import { r as normalizeExplicitSessionKey } from "./session-key-CY0q26lB.js";
import { t as appendAssistantMessageToSessionTranscript } from "./transcript-CkD940e8.js";
import { n as resolveSessionModelRef } from "./session-model-ref-D6sDGDAK.js";
import { r as resolveSessionRuntimeOverrideForProvider } from "./session-runtime-compat-C7DAZITa.js";
import { a as hasOutboundReplyContent } from "./reply-payload-BE_j43tQ.js";
import { a as resolveSendableOutboundReplyParts } from "./reply-payload-parts-Djg03PGA.js";
import { a as resolveReplyDeliveryAccountId, o as resolveReplyToMode, t as createReplyDeliveryContext } from "./reply-threading-DWyGycTp.js";
import { t as extractShortModelName } from "./response-prefix-template-DdRpfl7D.js";
import { n as buildPendingFinalDeliveryText, o as sanitizePendingFinalDeliveryText } from "./pending-final-delivery-BzZojDaN.js";
import { n as resolveSendPolicy } from "./send-policy-BKJvZqJK.js";
import { r as buildPersistedUserTurnMessage, s as preparePersistedUserTurnMessageForTranscriptWrite } from "./user-turn-transcript-Cd8sokau.js";
import { s as resolveSubagentCapabilityStore, t as isSubagentEnvelopeSession } from "./subagent-capabilities-nSrXwosf.js";
import { a as resolveInheritedToolPolicyForSession, i as resolveGroupToolPolicy, o as resolveSubagentToolPolicyForSession, r as resolveEffectiveToolPolicy } from "./agent-tools.policy-Bw6_eMDn.js";
import { h as normalizeAgentPlanSteps, l as formatPlanChecklistLines } from "./streaming-B45j2FQx.js";
import { P as isAskUserPromptPending } from "./openclaw-tools-CoDz4vSH.js";
import { m as triggerInternalHook, n as createInternalHookEvent } from "./internal-hooks-glvlO_hY.js";
import { i as isOutboundDeliveryError } from "./deliver-types-BGUCRKo2.js";
import { n as runAgentHarnessBeforeMessageWriteHook } from "./hook-helpers-CF3av4GZ.js";
import { n as resolveAgentIdentity } from "./identity-DxC7SNFJ.js";
import { a as buildLegacyInboundMessageSendingBeforeDeliver, i as buildInboundReplyPayloadSendingBeforeDeliver, o as buildProjectedInboundMessageSendingBeforeDeliver } from "./deliver-prepare-JLX8zdoA.js";
import { m as markConversationDeliverySent, p as markConversationDeliveryReplied, u as findConversationTurnDeliveryByReplyTarget } from "./delivery-queue-reconciliation-C_fJ0Zgy.js";
import { r as isFinalizedInboundContext, t as finalizeInboundContext } from "./inbound-context-BIpjK7pv.js";
import { a as createReplyDispatcherWithTyping, i as createReplyDispatcher, n as captureReplyDispatchDeliveryOutcome, o as markReplyDispatchBeforeDeliverDeadlineOwned, r as composeReplyDispatchBeforeDeliver, s as waitForReplyDispatcherIdle, t as appendReplyDispatcherBeforeDeliverCancelled } from "./reply-dispatcher-NfCXyJeT.js";
import { a as toInternalMessageReceivedContext, c as toPluginInboundClaimPair, l as toPluginMessageContext, n as deriveInboundMessageHookContext, u as toPluginMessageReceivedEvent } from "./message-hook-mappers-B6i6KSrI.js";
import { n as listMessageReceiptPlatformIds } from "./receipt-DSE0BXtY.js";
import { n as hasTrustedMessageAuditListeners, t as emitTrustedMessageAuditEvent } from "./message-audit-events-DZQxEKuQ.js";
import { t as createTtsDirectiveTextStreamCleaner } from "./directives-rfUF-x-9.js";
import { s as selectAgentHarness } from "./selection-C25zbbCu.js";
import { i as setChannelSourceTurnId, n as readChannelSourceTurnId, o as shouldMintChannelSourceTurnId, t as buildChannelSourceTurnId } from "./source-turn-id-DBX5_no8.js";
import { t as createDiagnosticMessageLifecycle } from "./message-lifecycle-D_yWG8Fo.js";
import { n as resolveReplyOperationRunState, t as REPLY_OPERATION_RUN_STATE } from "./reply-operation-run-state-CvJ5Aaoa.js";
import { t as readDispatcherFailedCounts } from "./reply-dispatcher.types-DSYZye0N.js";
import { n as createBlockReplyContentKey } from "./block-reply-pipeline-CpHTf1YD.js";
import { a as createReplyTimingTracker, c as resolveReplyTurnKind, f as resolveSilentReplyPolicyFromPolicies, i as resolveEffectiveReplyRoute, l as runWithReplyOperationLifecycleAdmission, o as isReplyProfilerEnabled, s as admitReplyTurn } from "./session-entry-handle-CBoQLEKo.js";
import { n as isDuplicateRestartRecoverySource, u as buildTerminalAgentRunFailureReplyPayload } from "./restart-recovery-claim-CBnKHrN-.js";
import { o as takeCommandSessionMetadataChanges } from "./commands-goal-CjxjuA9q.js";
import { i as resolveConversationBindingContextFromMessage } from "./conversation-binding-input-CMVPiS7Y.js";
import { n as resolveRoutedDeliveryThreadId, t as isSlackDirectRoutedThreadTurn } from "./routed-delivery-thread-0bKUtkYC.js";
import { t as resolveChannelModelOverride } from "./model-overrides-B3jI4eCi.js";
import { i as resolveStoredModelOverride } from "./stored-model-override-COLDiva4.js";
import { t as isRecoverableTerminalSessionStatus } from "./terminal-status-BFa5n9vV.js";
import { t as hasInboundAudio } from "./inbound-media-D2C7tI4T.js";
import { l as withFullRuntimeReplyConfig, p as stageRemoteInboundMediaIfNeeded, t as resolveRunTypingPolicy, u as withPublishedRuntimeReplyConfig } from "./typing-policy-DLpKm5K2.js";
import { n as claimPendingConversationTurnReply } from "./conversation-turns-BOzEqcJN.js";
import { n as resolveOriginMessageProvider } from "./origin-routing-DR55bzxd.js";
import { t as getGatewayNativeApprovalRuntime } from "./approval-gateway-runtime-context-BSAo6TQe.js";
import { r as hasActiveApprovalNativeRouteRuntime } from "./approval-native-route-coordinator-BXI6mT2o.js";
import { n as shouldHandleTextCommands } from "./commands-text-routing-CutKlF0B.js";
import { r as findCommandByNativeName } from "./commands-registry-BlZ2e_EW.js";
import { t as resolveCommandAuthorization } from "./command-auth-C7VE93x4.js";
import { n as resolveCommandContextText } from "./context-text-D3m6Fy9M.js";
import crypto from "node:crypto";
//#region src/channels/turn/delivery-result.ts
const CHANNEL_PARTIAL_DELIVERY_ERROR_CODE = "CHANNEL_PARTIAL_DELIVERY";
/** Preserves provider-visible delivery facts when a later native operation fails. */
function createChannelPartialDeliveryError(cause, deliveryResult) {
	return Object.assign(new Error(formatErrorMessage(cause), { cause }), {
		code: "CHANNEL_PARTIAL_DELIVERY",
		deliveryResult,
		sentBeforeError: true,
		visibleReplySent: true
	});
}
function isChannelPartialDeliveryError(error) {
	if (!error || typeof error !== "object" || Array.isArray(error)) return false;
	const candidate = error;
	return candidate.code === CHANNEL_PARTIAL_DELIVERY_ERROR_CODE && Boolean(candidate.deliveryResult && typeof candidate.deliveryResult === "object" && !Array.isArray(candidate.deliveryResult) && candidate.deliveryResult.visibleReplySent === true);
}
/** Converts a normalized message receipt into the delivery result shape used by channel turns. */
function createChannelDeliveryResultFromReceipt(params) {
	const messageIds = listMessageReceiptPlatformIds(params.receipt);
	return {
		...messageIds.length > 0 ? { messageIds } : {},
		receipt: params.receipt,
		...params.threadId ? { threadId: params.threadId } : {},
		...params.replyToId ? { replyToId: params.replyToId } : {},
		...params.visibleReplySent === void 0 ? {} : { visibleReplySent: params.visibleReplySent },
		...params.content === void 0 ? {} : { content: params.content },
		...params.deliveryIntent ? { deliveryIntent: params.deliveryIntent } : {}
	};
}
//#endregion
//#region src/auto-reply/dispatch-dispatcher.ts
const settledTasksByDispatcher = /* @__PURE__ */ new WeakMap();
/** Register post-delivery work owned by the dispatcher's settle lifecycle. */
function registerReplyDispatcherSettledTask(dispatcher, task) {
	const tasks = settledTasksByDispatcher.get(dispatcher) ?? /* @__PURE__ */ new Set();
	tasks.add(task);
	settledTasksByDispatcher.set(dispatcher, tasks);
}
async function runReplyDispatcherSettledTasks(dispatcher) {
	const tasks = settledTasksByDispatcher.get(dispatcher);
	if (!tasks) return;
	settledTasksByDispatcher.delete(dispatcher);
	for (const task of tasks) await task();
}
/** Mark a dispatcher complete, wait for pending work, then run optional cleanup. */
async function settleReplyDispatcher(params) {
	params.dispatcher.markComplete();
	try {
		await params.dispatcher.waitForIdle();
		await runReplyDispatcherSettledTasks(params.dispatcher);
	} finally {
		settledTasksByDispatcher.delete(params.dispatcher);
		await params.onSettled?.();
	}
}
/** Run work with a dispatcher and always drain it before returning or throwing. */
async function withReplyDispatcher(params) {
	try {
		return await params.run();
	} finally {
		await settleReplyDispatcher(params);
	}
}
//#endregion
//#region src/auto-reply/foreground-reply-fence-state.ts
function notifyForegroundReplyFenceWaiters(state) {
	const waiters = [...state.waiters];
	state.waiters.clear();
	for (const resolve of waiters) resolve();
}
const foregroundReplyFenceByKey = resolveGlobalMap(Symbol.for("openclaw.foregroundReplyFences"), (fences) => {
	for (const state of fences.values()) notifyForegroundReplyFenceWaiters(state);
	fences.clear();
}, "close-only");
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.abort.ts
var DispatchReplyOperationAbortedError = class extends Error {
	constructor() {
		super("Dispatch reply operation aborted");
		this.name = "AbortError";
	}
};
function isDispatchReplyOperationAbortedError(error) {
	return error instanceof DispatchReplyOperationAbortedError;
}
function runWithDispatchAbortSignal(signal, run, onWorkStarted) {
	if (signal?.aborted) return Promise.reject(new DispatchReplyOperationAbortedError());
	const shouldStopForAbort = () => signal?.aborted === true;
	let settled = false;
	let abortHandler;
	const work = Promise.resolve().then(run).then((value) => {
		settled = true;
		return value;
	}, (error) => {
		settled = true;
		if (shouldStopForAbort() && isAbortError(error)) throw new DispatchReplyOperationAbortedError();
		throw error;
	});
	onWorkStarted?.(work);
	if (!signal) return work;
	const aborted = new Promise((_, reject) => {
		abortHandler = () => {
			if (!settled && shouldStopForAbort()) reject(new DispatchReplyOperationAbortedError());
		};
		signal.addEventListener("abort", abortHandler, { once: true });
	});
	return Promise.race([work, aborted]).finally(() => {
		settled = true;
		if (abortHandler) signal.removeEventListener("abort", abortHandler);
	});
}
function createAbortAwareDispatcher(params) {
	const sendIfActive = (send) => (payload) => params.isAborted() ? false : send(payload);
	const dispatcher = {
		sendToolResult: sendIfActive(params.dispatcher.sendToolResult),
		sendBlockReply: sendIfActive(params.dispatcher.sendBlockReply),
		sendFinalReply: sendIfActive(params.dispatcher.sendFinalReply),
		waitForIdle: () => params.dispatcher.waitForIdle(),
		getQueuedCounts: () => params.dispatcher.getQueuedCounts(),
		getFailedCounts: () => readDispatcherFailedCounts(params.dispatcher),
		markComplete: () => {
			if (!params.isAborted()) params.dispatcher.markComplete();
		}
	};
	if (params.dispatcher.getCancelledCounts) dispatcher.getCancelledCounts = () => params.dispatcher.getCancelledCounts();
	return dispatcher;
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.audit.ts
function resolveCompletedInboundAuditReason(reason) {
	switch (reason) {
		case "fast_abort": return "fast_abort";
		case "plugin-bound-handled": return "plugin_bound_handled";
		case "plugin-bound-fallback-missing-plugin":
		case "plugin-bound-fallback-no-handler": return "plugin_bound_unavailable";
		case "plugin-bound-declined": return "plugin_bound_declined";
		case "before_dispatch_handled": return "before_dispatch_handled";
		case "acp_dispatch": return "acp_dispatch_completed";
		case "acp_empty_prompt": return "acp_dispatch_empty";
		default: return;
	}
}
function resolveSkippedInboundAuditReason(reason) {
	switch (reason) {
		case "duplicate": return "duplicate";
		case "reply-operation-active": return "reply_operation_active";
		case "reply_operation_aborted": return "reply_operation_aborted";
		default: return;
	}
}
function resolveInboundMessageAuditTerminal(outcome, reason) {
	if (reason === "plugin-bound-error") return {
		status: "failed",
		outcome: "failed",
		errorCode: "message_processing_failed",
		reasonCode: "plugin_bound_error"
	};
	if (reason?.startsWith("acp_error:")) return {
		status: "failed",
		outcome: "failed",
		errorCode: "message_processing_failed",
		reasonCode: "acp_dispatch_failed"
	};
	if (reason === "reply_operation_aborted") return {
		status: "blocked",
		outcome: "skipped",
		reasonCode: "reply_operation_aborted"
	};
	if (reason === "acp_aborted") return {
		status: "blocked",
		outcome: "skipped",
		reasonCode: "acp_dispatch_aborted"
	};
	if (outcome === "completed") {
		const reasonCode = resolveCompletedInboundAuditReason(reason);
		return {
			status: "succeeded",
			outcome: "completed",
			...reasonCode ? { reasonCode } : {}
		};
	}
	if (outcome === "skipped") {
		const reasonCode = resolveSkippedInboundAuditReason(reason);
		return {
			status: "blocked",
			outcome: "skipped",
			...reasonCode ? { reasonCode } : {}
		};
	}
	return {
		status: "failed",
		outcome: "failed",
		errorCode: "message_processing_failed"
	};
}
/**
* Captures one terminal event for the reply-processing boundary. Channel admission and
* pre-dispatch drops remain outside this boundary and need their own ingress projection.
*/
function createInboundMessageAuditTerminal(params) {
	if (!hasTrustedMessageAuditListeners()) return;
	const startedAt = Date.now();
	let notedTerminal;
	let observedRunId = normalizeOptionalString(params.replyOptions?.runId);
	let finished = false;
	const emitTerminal = (terminal, counts) => {
		if (finished) return;
		finished = true;
		const { ctx, cfg } = params;
		const occurredAt = Date.now();
		const sessionKey = normalizeOptionalString(ctx.SessionKey) ?? normalizeOptionalString(ctx.CommandTargetSessionKey);
		const actorId = normalizeOptionalString(ctx.SenderId);
		const accountId = normalizeOptionalString(ctx.AccountId);
		const conversationId = normalizeOptionalString(ctx.NativeChannelId) ?? normalizeOptionalString(ctx.OriginatingTo) ?? normalizeOptionalString(ctx.To) ?? normalizeOptionalString(ctx.From);
		const messageId = normalizeOptionalString(ctx.MessageSidFull) ?? normalizeOptionalString(ctx.MessageSid) ?? normalizeOptionalString(ctx.MessageSidFirst) ?? normalizeOptionalString(ctx.MessageSidLast);
		const terminalFields = resolveInboundMessageAuditTerminal(terminal.outcome, terminal.options?.reason);
		let agentId = normalizeOptionalString(ctx.AgentId);
		try {
			agentId = resolveSessionAgentId({
				sessionKey,
				config: cfg,
				agentId: ctx.AgentId
			});
		} catch {}
		try {
			emitTrustedMessageAuditEvent({
				occurredAt,
				kind: "message",
				action: "message.inbound.processed",
				...terminalFields,
				actorType: actorId ? "channel_sender" : "system",
				actorId: actorId ?? "gateway",
				...agentId ? { agentId } : {},
				...observedRunId ? { runId: observedRunId } : {},
				direction: "inbound",
				channel: normalizeLowercaseStringOrEmpty(ctx.OriginatingChannel) || normalizeLowercaseStringOrEmpty(ctx.Surface) || normalizeLowercaseStringOrEmpty(ctx.Provider) || "unknown",
				conversationKind: normalizeChatType(ctx.ChatType) ?? "unknown",
				durationMs: Math.max(0, occurredAt - startedAt),
				resultCount: counts.tool + counts.block + counts.final,
				...accountId ? { accountId } : {},
				...conversationId ? { conversationId } : {},
				...messageId ? { messageId } : {}
			});
		} catch {}
	};
	return {
		note(outcome, options) {
			notedTerminal = {
				outcome,
				...options ? { options } : {}
			};
		},
		observeRunId(runId) {
			observedRunId = normalizeOptionalString(runId) ?? observedRunId;
		},
		finishSuccess(result) {
			emitTerminal(notedTerminal ?? { outcome: "completed" }, result.counts);
		},
		finishError() {
			let counts = {
				tool: 0,
				block: 0,
				final: 0
			};
			try {
				counts = params.dispatcher.getQueuedCounts();
			} catch {}
			emitTerminal({ outcome: "error" }, counts);
		}
	};
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.events.ts
function createReplyDispatchEvent(params) {
	const { shouldSendToolSummaries, ...event } = params;
	return Object.defineProperty(event, "shouldSendToolSummaries", {
		enumerable: true,
		get: shouldSendToolSummaries
	});
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.dispatchFromConfigTestApi")] = { createReplyDispatchEvent };
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.phase-state.ts
function extendPreparedDispatchState(state, values) {
	return Object.assign(state, values);
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.transcript.ts
async function mirrorDeliveredReplyToTranscript(params) {
	const mirror = params.metadata;
	if (!mirror) return;
	try {
		const result = await appendAssistantMessageToSessionTranscript({
			sessionKey: mirror.sessionKey,
			agentId: mirror.agentId,
			...mirror.expectedSessionId ? { expectedSessionId: mirror.expectedSessionId } : {},
			text: mirror.text,
			mediaUrls: mirror.preferText && mirror.text ? void 0 : mirror.mediaUrls,
			idempotencyKey: mirror.idempotencyKey,
			...mirror.deliveryMirror ? { deliveryMirror: mirror.deliveryMirror } : {},
			...mirror.storePath ? { storePath: mirror.storePath } : {},
			updateMode: "inline",
			config: params.cfg,
			beforeMessageWrite: runAgentHarnessBeforeMessageWriteHook
		});
		if (!result.ok) logVerbose(`dispatch-from-config: transcript mirror skipped: ${result.reason}`);
	} catch (error) {
		logVerbose(`dispatch-from-config: transcript mirror failed after delivery: ${formatErrorMessage(error)}`);
	}
}
/** Reads final outcome counters from dispatchers that expose them. */
function getDispatcherFinalOutcomeCounts(dispatcher) {
	return {
		cancelled: dispatcher.getCancelledCounts?.().final ?? 0,
		failed: readDispatcherFailedCounts(dispatcher).final
	};
}
function transcriptMirrorForDeliveredPayload(metadata, payload) {
	const sendable = resolveSendableOutboundReplyParts(payload);
	if (!sendable.text && sendable.mediaUrls.length === 0) return;
	return {
		...metadata,
		text: sendable.text,
		mediaUrls: sendable.mediaUrls.length > 0 ? sendable.mediaUrls : void 0
	};
}
const STALE_FOREGROUND_SUPPRESSED_FINAL_TEXT = "Channel final suppressed before delivery: stale foreground";
function captureSuppressedTranscriptMirror(params) {
	const payloadMetadata = getReplyPayloadMetadata(params.payload);
	if (!params.metadata.transcriptOwner || payloadMetadata?.foregroundDeliverySuppression?.reason !== "stale-foreground") return;
	const deliveryMirror = params.metadata.deliveryMirror;
	if (!deliveryMirror) return;
	const sourceMessageId = normalizeOptionalString(deliveryMirror.sourceMessageId);
	if (!sourceMessageId) return;
	const { transcriptOwner: _transcriptOwner, ...metadata } = params.metadata;
	return {
		...metadata,
		text: STALE_FOREGROUND_SUPPRESSED_FINAL_TEXT,
		mediaUrls: void 0,
		preferText: true,
		idempotencyKey: `channel-final-suppressed:${sourceMessageId}:${params.deliveryId ?? "single"}`,
		deliveryMirror: {
			kind: "channel-final-suppressed",
			reason: "stale-foreground",
			sourceMessageId
		}
	};
}
function captureDeliveredTranscriptMirror(params) {
	if (!params.metadata || !params.dispatcher.appendBeforeDeliver) return () => params.metadata?.transcriptOwner ? void 0 : params.metadata;
	const metadata = params.metadata;
	let deliveredMetadata;
	let suppressedMetadata;
	let observedFinal = false;
	const { idempotencyKey, sessionKey } = metadata;
	params.dispatcher.appendBeforeDeliver((payload, info) => {
		if (info.kind !== "final") return payload;
		if (getReplyPayloadMetadata(payload)?.finalDeliveryCapture !== params.captureToken) return payload;
		observedFinal = true;
		const payloadMirror = getReplyPayloadMetadata(payload)?.sourceReplyTranscriptMirror;
		if (payloadMirror && payloadMirror.idempotencyKey === idempotencyKey && payloadMirror.sessionKey === sessionKey) deliveredMetadata = transcriptMirrorForDeliveredPayload({
			...payloadMirror,
			...metadata.expectedSessionId ? { expectedSessionId: metadata.expectedSessionId } : {},
			storePath: metadata.storePath
		}, payload);
		else if (!payloadMirror && !metadata.transcriptOwner && (!idempotencyKey || metadata.deliveryMirror)) deliveredMetadata = transcriptMirrorForDeliveredPayload(metadata, payload);
		return payload;
	});
	appendReplyDispatcherBeforeDeliverCancelled(params.dispatcher, (payload, info) => {
		if (info.kind !== "final") return;
		if (getReplyPayloadMetadata(payload)?.finalDeliveryCapture !== params.captureToken) return;
		observedFinal = true;
		suppressedMetadata = captureSuppressedTranscriptMirror({
			metadata,
			payload,
			deliveryId: params.deliveryId
		});
	});
	return () => observedFinal ? suppressedMetadata ?? deliveredMetadata : metadata.transcriptOwner ? void 0 : metadata;
}
async function mirrorTranscriptAfterDispatcherSettled(params) {
	const after = getDispatcherFinalOutcomeCounts(params.dispatcher);
	const metadata = params.metadata();
	if (!metadata) return;
	if (!(metadata.deliveryMirror?.kind === "channel-final-suppressed") && (after.cancelled > params.before.cancelled || after.failed > params.before.failed)) return;
	await mirrorDeliveredReplyToTranscript({
		metadata,
		cfg: params.cfg
	});
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.choose-route.ts
async function chooseDispatchRoute(state) {
	const { acpDispatchSessionKey, attachSourceReplyDeliveryMode, cfg, commitInboundDedupeIfClaimed, completeDispatchReplyOperation, ctx, deliveryChannel, dispatcher, getPreDispatchAbortSignal, hookRunner, isRoutedReplyDelivered, markIdle, markInboundDedupeReplayUnsafe, params, recordProcessed, replyContextAccountId, replyRoute, resolvePreparedTranscriptBinding, routeReplyChannel, routeReplyThreadId, routeReplyTo, runWithDispatchLifecycleAdmission, sendPayloadAsync, sendPolicyDenied, sessionAgentId, sessionKey, sessionStoreEntry, sessionTtsAuto, shouldEmitVerboseProgress, shouldRouteToOriginating, sourceReplyDeliveryMode, suppressAutomaticSourceDelivery, suppressDelivery, traceReplyPhase, trackDispatchLifecycleWork, turnLedger } = state;
	const shouldSuppressProgressDelivery = () => sendPolicyDenied || suppressDelivery && !shouldDeliverVerboseProgressDespiteSourceSuppression();
	const shouldSuppressDefaultToolProgressMessages = () => !shouldEmitVerboseProgress();
	const shouldSendVerboseProgressMessages = () => !shouldSuppressDefaultToolProgressMessages();
	const shouldSendToolSummaries = () => shouldSendVerboseProgressMessages();
	const notifiedSessionMetadataChangeKeys = /* @__PURE__ */ new Set();
	const routeState = {};
	const notifySessionMetadataChanges = (changes) => {
		if (!changes?.length) return;
		const freshChanges = [];
		for (const change of changes) {
			const key = JSON.stringify([
				change.sessionKey,
				change.agentId ?? null,
				change.reason
			]);
			if (notifiedSessionMetadataChangeKeys.has(key)) continue;
			notifiedSessionMetadataChangeKeys.add(key);
			freshChanges.push(change);
		}
		if (freshChanges.length === 0) return;
		routeState.sessionMetadataChangesForResult = [...routeState.sessionMetadataChangesForResult ?? [], ...freshChanges];
		params.onSessionMetadataChanges?.(freshChanges);
	};
	const shouldDeliverVerboseProgressDespiteSourceSuppression = () => suppressAutomaticSourceDelivery && sourceReplyDeliveryMode === "message_tool_only" && ctx.InboundEventKind !== "room_event" && !sendPolicyDenied && shouldEmitVerboseProgress() && shouldSendVerboseProgressMessages();
	const shouldDeliverForcedToolProgressDespiteSourceSuppression = () => suppressAutomaticSourceDelivery && sourceReplyDeliveryMode === "message_tool_only" && ctx.InboundEventKind !== "room_event" && !sendPolicyDenied && params.replyOptions?.forceToolResultProgress === true;
	const shouldDeliverFastModeAutoProgressDespiteSourceSuppression = () => suppressAutomaticSourceDelivery && sourceReplyDeliveryMode === "message_tool_only" && ctx.InboundEventKind !== "room_event" && !sendPolicyDenied;
	let finalReplyDeliveryStarted = false;
	const hasExecApprovalPayload = (payload) => {
		const execApproval = payload.channelData && typeof payload.channelData === "object" && !Array.isArray(payload.channelData) ? payload.channelData.execApproval : void 0;
		return execApproval && typeof execApproval === "object" && !Array.isArray(execApproval);
	};
	const hasAskUserPayload = (payload) => {
		const askUser = payload.channelData?.askUser;
		return askUser && typeof askUser === "object" && !Array.isArray(askUser);
	};
	const readAskUserQuestionId = (payload) => {
		const askUser = payload.channelData?.askUser;
		if (!askUser || typeof askUser !== "object" || Array.isArray(askUser)) return;
		const questionId = askUser.questionId;
		return typeof questionId === "string" ? questionId : void 0;
	};
	const shouldSuppressLateTextOnlyToolProgress = (payload) => {
		if (!finalReplyDeliveryStarted) return false;
		return !resolveSendableOutboundReplyParts(payload).hasMedia && !hasExecApprovalPayload(payload) && !hasAskUserPayload(payload);
	};
	let pendingCommentaryProgress = null;
	const deliverCommentaryProgressMessage = async (text) => {
		if (!shouldSendToolSummaries() || shouldSuppressProgressDelivery()) return;
		const payload = { text: `💬 ${text}` };
		if (shouldSuppressLateTextOnlyToolProgress(payload)) return;
		if (shouldRouteToOriginating) await sendPayloadAsync(payload, void 0, false);
		else {
			markInboundDedupeReplayUnsafe();
			turnLedger.sendQueued("tool", payload);
		}
	};
	const flushPendingCommentaryProgress = async () => {
		const pending = pendingCommentaryProgress;
		pendingCommentaryProgress = null;
		const text = pending?.text.trim();
		if (!text) return;
		await deliverCommentaryProgressMessage(text);
	};
	const noteCommentaryProgress = async (payload) => {
		const itemId = payload.itemId?.trim() || void 0;
		const text = payload.progressText ?? "";
		const repeatsBufferedText = pendingCommentaryProgress !== null && pendingCommentaryProgress.text.trim() === text.trim();
		const updatesBufferedItem = pendingCommentaryProgress !== null && (pendingCommentaryProgress.itemId !== void 0 && pendingCommentaryProgress.itemId === itemId || repeatsBufferedText);
		if (!text.trim()) {
			if (updatesBufferedItem) pendingCommentaryProgress = null;
			return;
		}
		if (pendingCommentaryProgress && !updatesBufferedItem) await flushPendingCommentaryProgress();
		pendingCommentaryProgress = {
			itemId,
			text
		};
	};
	const shouldSuppressMessageToolOnlyTextErrorProgress = (payload) => {
		if (sourceReplyDeliveryMode !== "message_tool_only" || state.shouldEmitFullVerboseProgress() || payload.isError !== true) return false;
		return !resolveSendableOutboundReplyParts(payload).hasMedia && !hasExecApprovalPayload(payload);
	};
	const deliveredBlockContentKeys = /* @__PURE__ */ new Set();
	const pendingBlockDeliveryOutcomes = /* @__PURE__ */ new Map();
	const sendTrackedBlockReply = (payload) => {
		const contentKey = createBlockReplyContentKey(payload);
		const delivery = turnLedger.sendQueued("block", payload);
		if (!delivery.queued || !delivery.outcome) return delivery.queued;
		const outcomes = pendingBlockDeliveryOutcomes.get(contentKey);
		if (outcomes) outcomes.push(delivery.outcome);
		else pendingBlockDeliveryOutcomes.set(contentKey, [delivery.outcome]);
		return delivery.queued;
	};
	const recordRoutedBlockReplyDelivery = (payload, result) => {
		if (result && isRoutedReplyDelivered(result)) deliveredBlockContentKeys.add(createBlockReplyContentKey(payload));
	};
	const wasReplyDeliveredAsBlock = async (payload, abortSignal) => {
		const contentKey = createBlockReplyContentKey(payload);
		if (deliveredBlockContentKeys.has(contentKey)) return true;
		const outcomes = pendingBlockDeliveryOutcomes.get(contentKey);
		if (!outcomes) return false;
		pendingBlockDeliveryOutcomes.delete(contentKey);
		const settlement = Promise.all(outcomes).then((settledOutcomes) => ({
			kind: "settled",
			outcomes: settledOutcomes
		}));
		if (abortSignal?.aborted) return false;
		let removeAbortListener;
		const result = abortSignal ? await Promise.race([settlement, new Promise((resolve) => {
			const onAbort = () => resolve({ kind: "aborted" });
			abortSignal.addEventListener("abort", onAbort, { once: true });
			removeAbortListener = () => abortSignal.removeEventListener("abort", onAbort);
		})]).finally(() => removeAbortListener?.()) : await settlement;
		if (result.kind === "aborted") return false;
		const delivered = result.outcomes.some((outcome) => outcome === "delivered");
		if (delivered) deliveredBlockContentKeys.add(contentKey);
		return delivered;
	};
	const sendFinalPayload = async (payload, options = {}) => {
		const abortSignal = options.abortSignal ?? state.getDispatchAbortSignal();
		const throwIfFinalDeliveryAborted = () => {
			if (abortSignal?.aborted) throw new DispatchReplyOperationAbortedError();
		};
		throwIfFinalDeliveryAborted();
		await flushPendingCommentaryProgress();
		throwIfFinalDeliveryAborted();
		const payloadMetadata = getReplyPayloadMetadata(payload);
		const sourceReplySessionBinding = resolvePreparedTranscriptBinding(payloadMetadata?.sourceReplyTranscriptMirror?.sessionKey);
		const sourceReplyTranscriptMirror = payloadMetadata?.sourceReplyTranscriptMirror ? {
			...payloadMetadata.sourceReplyTranscriptMirror,
			...sourceReplySessionBinding ? { expectedSessionId: sourceReplySessionBinding.sessionId } : {},
			storePath: sourceReplySessionBinding?.storePath ?? sessionStoreEntry.storePath
		} : void 0;
		const hasTranscriptOwner = payloadMetadata?.assistantMessageIndex !== void 0 || payloadMetadata?.assistantTranscriptOwned === true;
		const hasVisibleFinalContent = hasOutboundReplyContent(payload, { trimText: true });
		if (hasVisibleFinalContent) {
			markInboundDedupeReplayUnsafe();
			finalReplyDeliveryStarted = true;
		}
		const ttsPayload = payload.isReasoning === true || payload.isCommentary === true ? payload : await state.maybeApplyTtsWithFinalizationLease({
			payload,
			cfg,
			channel: deliveryChannel,
			kind: "final",
			ttsAuto: sessionTtsAuto,
			agentId: sessionAgentId,
			accountId: replyRoute.accountId
		});
		throwIfFinalDeliveryAborted();
		let normalizedPayload = await state.normalizeReplyMediaPayload(ttsPayload);
		throwIfFinalDeliveryAborted();
		const deliveredAsBlock = await wasReplyDeliveredAsBlock(payload, abortSignal);
		throwIfFinalDeliveryAborted();
		if (deliveredAsBlock) {
			if (createBlockReplyContentKey(normalizedPayload) === createBlockReplyContentKey(payload)) return {
				dedupedAgainstBlock: true,
				queuedFinal: false,
				routedFinalCount: 0
			};
			normalizedPayload = copyReplyPayloadMetadata(normalizedPayload, {
				...normalizedPayload,
				text: void 0
			});
			if (!hasOutboundReplyContent(normalizedPayload, { trimText: true })) return {
				dedupedAgainstBlock: true,
				queuedFinal: false,
				routedFinalCount: 0
			};
		}
		const result = await state.routeReplyToOriginating(normalizedPayload, {
			abortSignal,
			kind: "final",
			...hasTranscriptOwner ? { mirror: false } : {}
		});
		if (result) {
			if (!result.ok) logVerbose(`dispatch-from-config: route-reply (final) failed: ${result.error ?? "unknown error"}`);
			if (isRoutedReplyDelivered(result)) await mirrorDeliveredReplyToTranscript({
				metadata: sourceReplyTranscriptMirror,
				cfg
			});
			return {
				queuedFinal: result.ok,
				routedFinalCount: isRoutedReplyDelivered(result) ? 1 : 0
			};
		}
		throwIfFinalDeliveryAborted();
		const transcriptMirrorSessionKey = acpDispatchSessionKey ?? sessionStoreEntry.sessionKey ?? sessionKey;
		const transcriptMirrorSourceId = normalizeOptionalString(state.messageIdForHook) ?? normalizeOptionalString(params.replyOptions?.runId);
		const transcriptMirrorSessionBinding = resolvePreparedTranscriptBinding(transcriptMirrorSessionKey);
		const transcriptMirror = sourceReplyTranscriptMirror ?? (state.normalizedCurrentSurface === "slack" && hasVisibleFinalContent && transcriptMirrorSessionKey ? transcriptMirrorForDeliveredPayload({
			sessionKey: transcriptMirrorSessionKey,
			agentId: sessionAgentId,
			...transcriptMirrorSessionBinding ? { expectedSessionId: transcriptMirrorSessionBinding.sessionId } : {},
			storePath: transcriptMirrorSessionBinding?.storePath ?? sessionStoreEntry.storePath,
			preferText: true,
			...hasTranscriptOwner ? { transcriptOwner: true } : {},
			idempotencyKey: transcriptMirrorSourceId ? `channel-final:${transcriptMirrorSourceId}:${options.deliveryId ?? "single"}` : void 0,
			deliveryMirror: {
				kind: "channel-final",
				...transcriptMirrorSourceId ? { sourceMessageId: transcriptMirrorSourceId } : {}
			}
		}, normalizedPayload) : void 0);
		markInboundDedupeReplayUnsafe();
		const finalOutcomeBefore = transcriptMirror ? getDispatcherFinalOutcomeCounts(dispatcher) : void 0;
		const finalDeliveryCapture = transcriptMirror ? {} : void 0;
		const deliveredTranscriptMirror = transcriptMirror ? captureDeliveredTranscriptMirror({
			dispatcher,
			metadata: transcriptMirror,
			deliveryId: options.deliveryId,
			captureToken: finalDeliveryCapture
		}) : void 0;
		if (finalDeliveryCapture) setReplyPayloadMetadata(normalizedPayload, { finalDeliveryCapture });
		const { queued: queuedFinal, outcome: dispatcherOutcome } = turnLedger.sendQueued("final", normalizedPayload);
		if (queuedFinal && deliveredTranscriptMirror && finalOutcomeBefore) registerReplyDispatcherSettledTask(dispatcher, () => mirrorTranscriptAfterDispatcherSettled({
			dispatcher,
			before: finalOutcomeBefore,
			metadata: deliveredTranscriptMirror,
			cfg
		}));
		return {
			queuedFinal,
			routedFinalCount: 0,
			...queuedFinal && dispatcherOutcome ? { dispatcherOutcome } : {}
		};
	};
	if (hookRunner?.hasHooks("before_dispatch")) {
		const beforeDispatchSessionKey = sessionStoreEntry.sessionKey ?? sessionKey;
		const pluginSubagentRequester = createPluginSubagentRequesterContext({
			sessionKey: beforeDispatchSessionKey,
			origin: {
				channel: routeReplyChannel,
				to: routeReplyTo,
				accountId: replyContextAccountId,
				threadId: routeReplyThreadId
			}
		});
		const beforeDispatchResult = await traceReplyPhase("reply.before_dispatch_hooks", () => runWithDispatchLifecycleAdmission(async () => await runWithDispatchAbortSignal(getPreDispatchAbortSignal(), () => hookRunner.runBeforeDispatch({
			messageId: state.hookState.hookContext.messageId,
			content: state.hookState.hookContext.content,
			body: state.hookState.hookContext.bodyForAgent ?? state.hookState.hookContext.body,
			channel: state.hookState.hookContext.channelId,
			sessionKey: beforeDispatchSessionKey,
			senderId: state.hookState.hookContext.senderId,
			replyToId: state.hookState.hookContext.replyToId,
			replyToIdFull: state.hookState.hookContext.replyToIdFull,
			replyToBody: state.hookState.hookContext.replyToBody,
			replyToSender: state.hookState.hookContext.replyToSender,
			replyToIsQuote: state.hookState.hookContext.replyToIsQuote,
			isGroup: state.hookState.hookContext.isGroup,
			timestamp: state.hookState.hookContext.timestamp
		}, {
			messageId: state.hookState.hookContext.messageId,
			channelId: state.hookState.hookContext.channelId,
			accountId: state.hookState.hookContext.accountId,
			conversationId: state.hookState.inboundClaimContext.conversationId,
			sessionKey: beforeDispatchSessionKey,
			senderId: state.hookState.hookContext.senderId,
			replyToId: state.hookState.hookContext.replyToId,
			replyToIdFull: state.hookState.hookContext.replyToIdFull,
			replyToBody: state.hookState.hookContext.replyToBody,
			replyToSender: state.hookState.hookContext.replyToSender,
			replyToIsQuote: state.hookState.hookContext.replyToIsQuote
		}, pluginSubagentRequester), trackDispatchLifecycleWork)));
		if (beforeDispatchResult?.handled) {
			const text = beforeDispatchResult.text;
			let queuedFinal = false;
			let routedFinalCount = 0;
			if (text && !suppressDelivery) {
				const handledReply = await sendFinalPayload({ text }, {
					abortSignal: getPreDispatchAbortSignal(),
					deliveryId: "before-dispatch"
				});
				queuedFinal = handledReply.queuedFinal;
				routedFinalCount += handledReply.routedFinalCount;
			}
			const counts = dispatcher.getQueuedCounts();
			counts.final += routedFinalCount;
			recordProcessed("completed", { reason: "before_dispatch_handled" });
			markIdle("message_completed");
			commitInboundDedupeIfClaimed();
			completeDispatchReplyOperation();
			return {
				status: "complete",
				result: attachSourceReplyDeliveryMode({
					queuedFinal,
					counts
				})
			};
		}
	}
	if (hookRunner?.hasHooks("reply_dispatch")) {
		const replyDispatchResult = await traceReplyPhase("reply.reply_dispatch_hooks", () => runWithDispatchLifecycleAdmission(async () => await runWithDispatchAbortSignal(getPreDispatchAbortSignal(), () => hookRunner.runReplyDispatch(createReplyDispatchEvent({
			ctx,
			runId: params.replyOptions?.runId,
			sessionKey: acpDispatchSessionKey,
			toolsAllow: params.replyOptions?.toolsAllow,
			images: params.replyOptions?.images,
			inboundAudio: state.inboundAudio,
			sessionTtsAuto,
			ttsChannel: deliveryChannel,
			suppressUserDelivery: state.suppressHookUserDelivery,
			suppressReplyLifecycle: state.suppressHookReplyLifecycle,
			sourceReplyDeliveryMode,
			shouldRouteToOriginating,
			originatingChannel: routeReplyChannel,
			originatingTo: routeReplyTo,
			originatingAccountId: replyContextAccountId,
			originatingThreadId: routeReplyThreadId,
			originatingChatType: replyRoute.chatType,
			shouldSendToolSummaries,
			sendPolicy: state.sendPolicy
		}), {
			cfg,
			dispatcher: state.dispatchHookDispatcher,
			abortSignal: getPreDispatchAbortSignal() ?? params.replyOptions?.abortSignal,
			onReplyStart: params.replyOptions?.onReplyStart,
			recordProcessed,
			markIdle
		}), trackDispatchLifecycleWork)));
		if (replyDispatchResult?.handled) {
			commitInboundDedupeIfClaimed();
			completeDispatchReplyOperation();
			return {
				status: "complete",
				result: attachSourceReplyDeliveryMode({
					queuedFinal: replyDispatchResult.queuedFinal,
					counts: replyDispatchResult.counts
				})
			};
		}
	}
	const dispatchAcquisition = await state.ensureDispatchReplyOperation("dispatch");
	if (dispatchAcquisition.status === "aborted") return {
		status: "complete",
		result: state.finishReplyOperationAbortedDispatch()
	};
	if (dispatchAcquisition.status === "busy") return {
		status: "complete",
		result: state.finishReplyOperationBusyDispatch({ dedupeDisposition: "release" })
	};
	return {
		status: "ready",
		state: extendPreparedDispatchState(state, {
			shouldSuppressDefaultToolProgressMessages,
			shouldSendVerboseProgressMessages,
			shouldSendToolSummaries,
			notifySessionMetadataChanges,
			shouldDeliverVerboseProgressDespiteSourceSuppression,
			shouldDeliverForcedToolProgressDespiteSourceSuppression,
			shouldDeliverFastModeAutoProgressDespiteSourceSuppression,
			hasExecApprovalPayload,
			hasAskUserPayload,
			readAskUserQuestionId,
			shouldSuppressLateTextOnlyToolProgress,
			flushPendingCommentaryProgress,
			noteCommentaryProgress,
			shouldSuppressMessageToolOnlyTextErrorProgress,
			sendTrackedBlockReply,
			recordRoutedBlockReplyDelivery,
			wasReplyDeliveredAsBlock,
			sendFinalPayload,
			routeState
		})
	};
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.execute.ts
async function executeDispatch(state) {
	const { cfg, cleanBlockTtsDirectiveText, commentaryPayloadsEnabled, ctx, deliveryChannel, dispatcher, failDispatchReplyOperation, flushPendingCommentaryProgress, getDispatchAbortOperation, getDispatchAbortSignal, hasAskUserPayload, hookRunner, isDispatchOperationAborted, markInboundDedupeReplayUnsafe, markProgress, markVisibleToolErrorProgress, maybeApplyTtsWithFinalizationLease, normalizeReplyMediaPayload, notifySessionMetadataChanges, onToolResultFromReplyOptions, params, reasoningPayloadsEnabled, recordAgentDispatchCompleted, replyConfig, replyRoute, resolveToolDeliveryPayload, runWithDispatchLifecycleAdmission, sendPayloadAsync, sessionAgentId, sessionTtsAuto, shouldForwardProgressCallback, shouldRouteToOriginating, shouldSuppressDefaultToolProgressMessages, sourceReplyDeliveryMode, trackDispatchLifecycleWork, typing, waitForPendingDirectBlockReplyDelivery, wrapProgressCallback } = state;
	let deliberateSilentTerminalReply = false;
	let pendingContinuation = false;
	let didDeliverVisiblePartialReply = false;
	const replyResult = await runWithDispatchLifecycleAdmission(async () => await runWithDispatchAbortSignal(getDispatchAbortSignal(), () => state.traceReplyPhase("reply.run_reply_resolver", () => state.replyResolver(ctx, {
		...state.getReplyOptions(),
		[REPLY_OPERATION_RUN_STATE]: state.replyOperationRunState,
		sourceReplyDeliveryMode,
		sessionPromptSourceReplyDeliveryMode: state.sessionStableSourceReplyDeliveryMode,
		onDeliberateSilentTerminalReply: () => {
			deliberateSilentTerminalReply = true;
		},
		onPendingContinuation: () => {
			pendingContinuation = true;
		},
		onSessionMetadataChanges: notifySessionMetadataChanges,
		onSessionPrepared: state.notePreparedSession,
		onObservedReplyDelivery: state.markObservedReplyDelivery,
		suppressToolErrorWarnings: state.suppressToolErrorWarnings,
		shouldSuppressToolErrorWarnings: state.shouldSuppressToolErrorWarnings,
		typingPolicy: typing.typingPolicy,
		suppressTyping: typing.suppressTyping,
		onPartialReply: wrapProgressCallback(params.replyOptions?.onPartialReply, { onVisible: (payload) => {
			if (hasOutboundReplyContent(payload, { trimText: true })) didDeliverVisiblePartialReply = true;
		} }),
		onReasoningStream: wrapProgressCallback(params.replyOptions?.onReasoningStream),
		streamReasoningInNonStreamModes: params.replyOptions?.streamReasoningInNonStreamModes,
		onReasoningEnd: wrapProgressCallback(params.replyOptions?.onReasoningEnd),
		onAssistantMessageStart: wrapProgressCallback(params.replyOptions?.onAssistantMessageStart),
		onBlockReplyQueued: wrapProgressCallback(params.replyOptions?.onBlockReplyQueued),
		onToolStart: wrapProgressCallback(params.replyOptions?.onToolStart, {
			allowWhenToolSummariesHidden: params.replyOptions?.allowToolLifecycleWhenProgressHidden === true,
			forwardWhenSourceDeliverySuppressed: true,
			requiresToolSummaryVisibility: true,
			waitForDirectBlockReplyDelivery: true,
			onForward: async () => {
				await flushPendingCommentaryProgress();
			}
		}),
		onItemEvent: state.onItemEvent,
		commentaryProgressEnabled: state.deliverStandaloneCommentaryProgress || state.canForwardSuppressedSourceItemEvents || params.replyOptions?.commentaryProgressEnabled,
		reasoningPayloadsEnabled,
		commentaryPayloadsEnabled,
		onCommandOutput: wrapProgressCallback(params.replyOptions?.onCommandOutput, {
			forwardWhenSourceDeliverySuppressed: true,
			requiresToolSummaryVisibility: true,
			waitForDirectBlockReplyDelivery: true,
			onVisible: (payload) => {
				if (state.hasFailedProgressStatus(payload)) markVisibleToolErrorProgress();
			}
		}),
		onCompactionStart: wrapProgressCallback(params.replyOptions?.onCompactionStart, {
			allowWhenToolSummariesHidden: params.replyOptions?.allowToolLifecycleWhenProgressHidden === true,
			forwardWhenSourceDeliverySuppressed: true,
			requiresToolSummaryVisibility: true,
			waitForDirectBlockReplyDelivery: true
		}),
		onCompactionEnd: wrapProgressCallback(params.replyOptions?.onCompactionEnd, {
			allowWhenToolSummariesHidden: params.replyOptions?.allowToolLifecycleWhenProgressHidden === true,
			forwardWhenSourceDeliverySuppressed: true,
			requiresToolSummaryVisibility: true,
			waitForDirectBlockReplyDelivery: true
		}),
		onToolResult: (payload) => {
			state.getDispatchReplyOperation()?.recordActivity();
			markProgress();
			const run = async () => {
				if (isDispatchOperationAborted()) return;
				await waitForPendingDirectBlockReplyDelivery(getDispatchAbortOperation()?.abortSignal);
				if (isDispatchOperationAborted()) return;
				markInboundDedupeReplayUnsafe();
				await flushPendingCommentaryProgress();
				if (payload.isError === true && replyConfig.messages?.suppressToolErrors === true) return;
				const isFastModeAutoProgress = isFastModeAutoProgressPayload(payload);
				const isFastModeAutoProgressDelivery = isFastModeAutoProgress && state.shouldDeliverFastModeAutoProgressDespiteSourceSuppression();
				const isForcedToolProgress = state.shouldDeliverForcedToolProgressDespiteSourceSuppression();
				const progressCallbackForwarded = state.shouldForwardToolResultProgressCallback(payload, isFastModeAutoProgress);
				if (progressCallbackForwarded) await onToolResultFromReplyOptions?.(payload);
				if (isDispatchOperationAborted()) return;
				if (isFastModeAutoProgress && progressCallbackForwarded && onToolResultFromReplyOptions) return;
				if (state.sendPolicyDenied) return;
				if (state.shouldSuppressProgressDelivery() && !isFastModeAutoProgressDelivery && !isForcedToolProgress && !hasAskUserPayload(payload)) return;
				const visibleToolPayload = isForcedToolProgress ? payload : resolveToolDeliveryPayload(payload);
				if (!visibleToolPayload) return;
				const ttsPayload = await maybeApplyTtsWithFinalizationLease({
					payload: visibleToolPayload,
					cfg,
					channel: deliveryChannel,
					kind: "tool",
					ttsAuto: sessionTtsAuto,
					agentId: sessionAgentId,
					accountId: replyRoute.accountId
				});
				const normalizedPayload = await normalizeReplyMediaPayload(ttsPayload);
				const deliveryPayload = isForcedToolProgress ? normalizedPayload : resolveToolDeliveryPayload(normalizedPayload);
				if (!deliveryPayload) return;
				if (isDispatchOperationAborted()) return;
				if (state.shouldSuppressLateTextOnlyToolProgress(deliveryPayload) && !isFastModeAutoProgressPayload(deliveryPayload) && !isForcedToolProgress) return;
				if (state.shouldSuppressMessageToolOnlyTextErrorProgress(deliveryPayload)) return;
				if (shouldSuppressDefaultToolProgressMessages() && !isFastModeAutoProgressPayload(deliveryPayload) && !isForcedToolProgress) {
					if (!resolveSendableOutboundReplyParts(deliveryPayload).hasMedia && !state.hasExecApprovalPayload(deliveryPayload) && !hasAskUserPayload(deliveryPayload)) return;
				}
				if (deliveryPayload.isError === true) markVisibleToolErrorProgress();
				const askUserQuestionId = state.readAskUserQuestionId(deliveryPayload);
				if (askUserQuestionId !== void 0 && !await isAskUserPromptPending(askUserQuestionId)) return;
				if (isDispatchOperationAborted()) return;
				if (shouldRouteToOriginating) await sendPayloadAsync(deliveryPayload, void 0, false);
				else {
					markInboundDedupeReplayUnsafe();
					if (state.turnLedger.sendQueued("tool", deliveryPayload).queued && hasAskUserPayload(deliveryPayload)) await waitForReplyDispatcherIdle(dispatcher, getDispatchAbortOperation()?.abortSignal);
				}
			};
			return run();
		},
		onPlanUpdate: async (payload) => {
			if (isDispatchOperationAborted()) return;
			const steps = normalizeAgentPlanSteps(payload.steps);
			const normalized = {
				phase: payload.phase,
				title: payload.title,
				explanation: payload.explanation,
				steps,
				source: payload.source
			};
			markProgress();
			await waitForPendingDirectBlockReplyDelivery(getDispatchAbortOperation()?.abortSignal);
			if (isDispatchOperationAborted()) return;
			markInboundDedupeReplayUnsafe();
			if (shouldForwardProgressCallback({
				forwardWhenSourceDeliverySuppressed: true,
				requiresToolSummaryVisibility: true
			})) await state.onPlanUpdateFromReplyOptions?.(normalized);
			if (isDispatchOperationAborted()) return;
			if (payload.phase !== "update" || shouldSuppressDefaultToolProgressMessages()) return;
			await state.sendPlanUpdate({
				explanation: normalized.explanation,
				steps
			});
		},
		onApprovalEvent: async (payload) => {
			if (isDispatchOperationAborted()) return;
			markProgress();
			await waitForPendingDirectBlockReplyDelivery(getDispatchAbortOperation()?.abortSignal);
			if (isDispatchOperationAborted()) return;
			markInboundDedupeReplayUnsafe();
			if (shouldForwardProgressCallback({
				forwardWhenSourceDeliverySuppressed: true,
				requiresToolSummaryVisibility: true
			})) await state.onApprovalEventFromReplyOptions?.(payload);
		},
		onPatchSummary: async (payload) => {
			if (isDispatchOperationAborted()) return;
			markProgress();
			await waitForPendingDirectBlockReplyDelivery(getDispatchAbortOperation()?.abortSignal);
			if (isDispatchOperationAborted()) return;
			markInboundDedupeReplayUnsafe();
			if (shouldForwardProgressCallback({
				forwardWhenSourceDeliverySuppressed: true,
				requiresToolSummaryVisibility: true
			})) await state.onPatchSummaryFromReplyOptions?.(payload);
		},
		onBlockReply: (payload, context) => {
			markProgress();
			const run = async () => {
				if (isDispatchOperationAborted()) return;
				if (payload.isReasoning !== true && payload.isCommentary !== true && hasOutboundReplyContent(payload, { trimText: true })) markInboundDedupeReplayUnsafe();
				await flushPendingCommentaryProgress();
				if (state.suppressDelivery) return;
				if (payload.isReasoning === true && !reasoningPayloadsEnabled) return;
				if (payload.isCommentary === true && !commentaryPayloadsEnabled) return;
				const isStatusNotice = isReplyPayloadStatusNotice(payload);
				if (payload.text && !isStatusNotice && payload.isReasoning !== true && payload.isCommentary !== true) {
					const joinsBufferedTtsDirective = cleanBlockTtsDirectiveText?.hasBufferedDirectiveText() === true;
					if (state.progressState.accumulatedBlockText.length > 0) state.progressState.accumulatedBlockText += "\n";
					state.progressState.accumulatedBlockText += payload.text;
					if (state.progressState.accumulatedBlockTtsText.length > 0 && !joinsBufferedTtsDirective) state.progressState.accumulatedBlockTtsText += "\n";
					state.progressState.accumulatedBlockTtsText += payload.text;
					state.progressState.blockCount++;
				}
				const visiblePayload = payload.text && cleanBlockTtsDirectiveText && !isStatusNotice && payload.isReasoning !== true && payload.isCommentary !== true ? (() => {
					const text = cleanBlockTtsDirectiveText.push(payload.text);
					return copyReplyPayloadMetadata(payload, {
						...payload,
						text: text.trim() ? text : void 0
					});
				})() : payload;
				if (!hasOutboundReplyContent(visiblePayload, { trimText: true })) return;
				const payloadMetadata = getReplyPayloadMetadata(payload);
				const queuedContext = payloadMetadata?.assistantMessageIndex !== void 0 ? {
					...context,
					assistantMessageIndex: payloadMetadata.assistantMessageIndex
				} : context;
				if (!state.suppressAutomaticSourceDelivery) await params.replyOptions?.onBlockReplyQueued?.(visiblePayload, queuedContext);
				if (isDispatchOperationAborted()) return;
				const ttsPayload = payload.isReasoning === true || payload.isCommentary === true ? visiblePayload : await maybeApplyTtsWithFinalizationLease({
					payload: visiblePayload,
					cfg,
					channel: deliveryChannel,
					kind: "block",
					ttsAuto: sessionTtsAuto,
					agentId: sessionAgentId,
					accountId: replyRoute.accountId
				});
				const normalizedPayload = await normalizeReplyMediaPayload(ttsPayload);
				if (isDispatchOperationAborted()) return;
				if (shouldRouteToOriginating) {
					const result = await sendPayloadAsync(normalizedPayload, context?.abortSignal, false, "block");
					state.recordRoutedBlockReplyDelivery(normalizedPayload, result);
				} else {
					markInboundDedupeReplayUnsafe();
					if (state.sendTrackedBlockReply(normalizedPayload)) state.progressState.hasPendingDirectBlockReplyDelivery = true;
				}
			};
			return run();
		}
	}, replyConfig)), trackDispatchLifecycleWork)).catch((error) => {
		if (params.replyOptions?.isHeartbeat === true || !didDeliverVisiblePartialReply || isDispatchOperationAborted()) throw error;
		failDispatchReplyOperation(error);
		return buildTerminalAgentRunFailureReplyPayload({
			visibleReplyDelivered: true,
			sessionCtx: ctx,
			cfg: replyConfig
		});
	});
	notifySessionMetadataChanges(takeCommandSessionMetadataChanges(ctx));
	const finalDispatchAcquisition = await state.ensureDispatchReplyOperation("dispatch");
	if (finalDispatchAcquisition.status === "aborted") return {
		status: "complete",
		result: state.finishReplyOperationAbortedDispatch()
	};
	if (finalDispatchAcquisition.status === "busy") return {
		status: "complete",
		result: state.finishReplyOperationBusyDispatch({
			recordAgentDispatchCompleted: true,
			...state.routeState.sessionMetadataChangesForResult ? { sessionMetadataChanges: state.routeState.sessionMetadataChangesForResult } : {}
		})
	};
	if (ctx.AcpDispatchTailAfterReset === true) {
		ctx.AcpDispatchTailAfterReset = false;
		if (hookRunner?.hasHooks("reply_dispatch")) {
			const tailDispatchResult = await runWithDispatchLifecycleAdmission(async () => await runWithDispatchAbortSignal(getDispatchAbortSignal(), () => hookRunner.runReplyDispatch(createReplyDispatchEvent({
				ctx,
				runId: params.replyOptions?.runId,
				sessionKey: state.acpDispatchSessionKey,
				toolsAllow: params.replyOptions?.toolsAllow,
				images: params.replyOptions?.images,
				inboundAudio: state.inboundAudio,
				sessionTtsAuto,
				ttsChannel: deliveryChannel,
				suppressUserDelivery: state.suppressHookUserDelivery,
				suppressReplyLifecycle: state.suppressHookReplyLifecycle,
				sourceReplyDeliveryMode,
				shouldRouteToOriginating,
				originatingChannel: state.routeReplyChannel,
				originatingTo: state.routeReplyTo,
				originatingAccountId: state.replyContextAccountId,
				originatingThreadId: state.routeReplyThreadId,
				originatingChatType: replyRoute.chatType,
				shouldSendToolSummaries: state.shouldSendToolSummaries,
				sendPolicy: state.sendPolicy,
				isTailDispatch: true
			}), {
				cfg,
				dispatcher: state.dispatchHookDispatcher,
				abortSignal: state.getPreDispatchAbortSignal() ?? params.replyOptions?.abortSignal,
				onReplyStart: params.replyOptions?.onReplyStart,
				recordProcessed: state.recordProcessed,
				markIdle: state.markIdle
			}), trackDispatchLifecycleWork));
			if (tailDispatchResult?.handled) {
				recordAgentDispatchCompleted("completed");
				state.completeDispatchReplyOperation();
				return {
					status: "complete",
					result: state.attachSourceReplyDeliveryMode({
						queuedFinal: tailDispatchResult.queuedFinal,
						counts: tailDispatchResult.counts,
						...state.routeState.sessionMetadataChangesForResult ? { sessionMetadataChanges: state.routeState.sessionMetadataChangesForResult } : {}
					})
				};
			}
		}
	}
	return {
		status: "ready",
		state: extendPreparedDispatchState(state, {
			deliberateSilentTerminalReply,
			pendingContinuation,
			replyResult
		})
	};
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.payloads.ts
const ttsRuntimeLoader = createLazyImportLoader(() => import("./tts.runtime.js"));
const NO_VISIBLE_REPLY_FALLBACK_TEXT = "No reply was generated for this message. This is usually a temporary model failure - please try again.";
function createFinalDispatchPayloadDedupeKey(payload) {
	const metadata = getReplyPayloadMetadata(payload);
	return JSON.stringify({
		payload: {
			text: payload.text,
			mediaUrl: payload.mediaUrl,
			mediaUrls: payload.mediaUrls,
			trustedLocalMedia: payload.trustedLocalMedia,
			sensitiveMedia: payload.sensitiveMedia,
			presentation: payload.presentation,
			presentationTextMode: payload.presentationTextMode,
			delivery: payload.delivery,
			interactive: payload.interactive,
			btw: payload.btw,
			replyToId: payload.replyToId,
			replyToTag: payload.replyToTag,
			replyToCurrent: payload.replyToCurrent,
			audioAsVoice: payload.audioAsVoice,
			spokenText: payload.spokenText,
			ttsSupplement: payload.ttsSupplement,
			isError: payload.isError,
			isReasoning: payload.isReasoning,
			isCommentary: payload.isCommentary,
			isReasoningSnapshot: payload.isReasoningSnapshot,
			isCompactionNotice: payload.isCompactionNotice,
			isFallbackNotice: payload.isFallbackNotice,
			isStatusNotice: payload.isStatusNotice,
			channelData: payload.channelData
		},
		identity: {
			assistantMessageIndex: metadata?.assistantMessageIndex,
			assistantTranscriptOwned: metadata?.assistantTranscriptOwned,
			replyToIdExplicit: metadata?.replyToIdExplicit,
			replyDelivery: metadata?.replyDelivery,
			replyDeliverySource: metadata?.replyDeliverySource,
			sourceReplyTranscriptMirror: metadata?.sourceReplyTranscriptMirror
		}
	});
}
function formatSuppressedReplyPayloadForLog(reply) {
	const metadata = getReplyPayloadMetadata(reply);
	const text = normalizeOptionalString(reply.text);
	const textPreview = text ? truncateUtf16Safe(text.replace(/\s+/g, " "), 160) : void 0;
	const sendableParts = resolveSendableOutboundReplyParts(reply);
	const richParts = [
		reply.presentation ? "presentation" : void 0,
		reply.interactive ? "interactive" : void 0,
		reply.channelData ? "channelData" : void 0
	].filter(Boolean);
	return [
		`textChars=${text?.length ?? 0}`,
		`media=${sendableParts.mediaCount}`,
		`rich=${richParts.length ? richParts.join("|") : "none"}`,
		`error=${reply.isError === true}`,
		`beforeAgentRunBlocked=${metadata?.beforeAgentRunBlocked === true}`,
		`deliverDespiteSuppression=${metadata?.deliverDespiteSourceReplySuppression === true}`,
		textPreview ? `textPreview=${JSON.stringify(textPreview)}` : void 0
	].filter(Boolean).join(" ");
}
async function maybeApplyTtsToReplyPayload(params) {
	if (isReplyPayloadStatusNotice(params.payload)) return params.payload;
	if (!shouldAttemptTtsPayload({
		cfg: params.cfg,
		ttsAuto: params.ttsAuto,
		agentId: params.agentId,
		channelId: params.channel,
		accountId: params.accountId
	})) return params.payload;
	const { maybeApplyTtsToPayload } = await ttsRuntimeLoader.load();
	const ttsPayload = await maybeApplyTtsToPayload(params);
	return ttsPayload === params.payload ? ttsPayload : copyReplyPayloadMetadata(params.payload, ttsPayload);
}
function createFinalizationAwareTtsPayloadApplier(params) {
	return async (ttsParams) => {
		const replyOperation = params.getReplyOperation();
		const finishFinalizationWork = replyOperation ? beginReplyOperationFinalizationWork(replyOperation, RUN_STALE_TAKEOVER_MS) : void 0;
		try {
			return await maybeApplyTtsToReplyPayload({
				...ttsParams,
				inboundAudio: params.hasInboundAudio()
			});
		} finally {
			finishFinalizationWork?.();
			replyOperation?.recordActivity();
		}
	};
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.pending-final.ts
function buildPendingFinalDeliveryCleanupPatch(entry) {
	const clearsRestartRecoveryProof = normalizeOptionalString(entry.restartRecoveryDeliveryRunId) === void 0;
	const endedAt = clearsRestartRecoveryProof && (entry.restartRecoveryBeforeAgentReplyState === "handled-reply" || entry.restartRecoveryBeforeAgentReplyState === "handled-unrecoverable") ? Date.now() : void 0;
	return {
		pendingFinalDelivery: void 0,
		...clearsRestartRecoveryProof ? {
			restartRecoveryBeforeAgentReplyState: void 0,
			restartRecoverySourceIngress: void 0,
			restartRecoveryForceSafeTools: void 0
		} : {},
		...endedAt !== void 0 ? {
			abortedLastRun: false,
			endedAt,
			runtimeMs: typeof entry.startedAt === "number" ? Math.max(0, endedAt - entry.startedAt) : void 0,
			status: "done"
		} : {}
	};
}
function matchesPendingFinalDeliveryIdentity(entry, expected) {
	const pending = entry.pendingFinalDelivery;
	if (pending !== void 0 !== expected.present) return false;
	if (expected.intentId) return pending?.intentId === expected.intentId;
	return pending?.createdAt === expected.createdAt && (pending?.kind === "replayable" ? pending.text : void 0) === expected.text;
}
async function clearPendingFinalDeliveryAfterSuccess(params) {
	const identity = params.identity;
	if (!params.storePath || !params.sessionKey || !identity?.present) return;
	await updateSessionEntry({
		storePath: params.storePath,
		sessionKey: params.sessionKey
	}, async (entry) => {
		if (!matchesPendingFinalDeliveryIdentity(entry, identity)) return null;
		if (!entry.pendingFinalDelivery) return null;
		return {
			...buildPendingFinalDeliveryCleanupPatch(entry),
			updatedAt: Date.now()
		};
	}, {
		skipMaintenance: true,
		takeCacheOwnership: true
	});
}
function capturePendingFinalDeliveryIdentity(params) {
	if (!params.storePath || !params.sessionKey) return;
	try {
		const pending = loadSqliteSessionEntryReadOnly({
			storePath: params.storePath,
			sessionKey: params.sessionKey,
			hydrateSkillPromptRefs: false,
			readConsistency: "latest"
		})?.pendingFinalDelivery;
		if (params.intentId && pending?.intentId !== params.intentId) return { present: false };
		return {
			present: pending !== void 0,
			intentId: params.intentId ?? pending?.intentId,
			createdAt: pending?.createdAt,
			text: pending?.kind === "replayable" ? pending.text : void 0
		};
	} catch {
		return params.intentId ? {
			present: true,
			intentId: params.intentId
		} : void 0;
	}
}
function buildPendingFinalDeliveryRetryText(payloads) {
	return sanitizePendingFinalDeliveryText(payloads.map((payload) => getReplyPayloadMetadata(payload)?.pendingFinalDeliveryRetryText ?? buildPendingFinalDeliveryText([payload])).filter(Boolean).join("\n\n"));
}
function resolvePendingFinalDeliveryPayloads(params) {
	const intentReplies = params.intentId ? params.replies.filter((reply) => {
		const metadata = getReplyPayloadMetadata(reply);
		return metadata?.pendingFinalDeliveryIntentId === params.intentId && metadata?.pendingFinalDeliveryRetryText !== void 0;
	}) : [];
	const intentContributors = intentReplies.filter((reply) => getReplyPayloadMetadata(reply)?.pendingFinalDeliveryRetryText);
	const intentText = buildPendingFinalDeliveryRetryText(intentContributors);
	if (intentReplies.length > 0 && intentText.replace(/\s+/g, " ").trim() === params.pendingText.replace(/\s+/g, " ").trim()) return intentContributors;
	const contributingReplies = params.replies.filter((reply) => buildPendingFinalDeliveryText([reply]) !== "");
	if (buildPendingFinalDeliveryText(contributingReplies) === params.pendingText) return contributingReplies;
	const exactMatches = contributingReplies.filter((reply) => buildPendingFinalDeliveryText([reply]) === params.pendingText);
	return exactMatches.length === 1 ? exactMatches : void 0;
}
async function reconcilePendingFinalDeliveryAfterSettlement(params) {
	const identity = params.identity;
	if (!params.storePath || !params.sessionKey || !identity?.present) return;
	await updateSessionEntry({
		storePath: params.storePath,
		sessionKey: params.sessionKey
	}, async (entry) => {
		if (!matchesPendingFinalDeliveryIdentity(entry, identity)) return null;
		const pending = entry.pendingFinalDelivery;
		if (!pending) return null;
		const pendingPayloads = pending.kind === "replayable" ? resolvePendingFinalDeliveryPayloads({
			intentId: identity.intentId,
			pendingText: pending.text,
			replies: params.replies
		}) : void 0;
		const pendingPayloadSet = pendingPayloads ? new Set(pendingPayloads) : void 0;
		const relevantDeliveries = pendingPayloadSet ? params.deliveries.filter((delivery) => pendingPayloadSet.has(delivery.payload)) : params.deliveries;
		const ownsEveryPendingPayload = !pendingPayloadSet || relevantDeliveries.length === pendingPayloadSet.size;
		const failedBeforeDeliver = relevantDeliveries.filter((delivery) => delivery.outcome === "failed-before-deliver");
		if (relevantDeliveries.length > 0 && failedBeforeDeliver.length === relevantDeliveries.length) return null;
		if (pendingPayloadSet && ownsEveryPendingPayload && failedBeforeDeliver.length > 0) {
			const retryText = buildPendingFinalDeliveryRetryText(failedBeforeDeliver.map((delivery) => delivery.payload));
			if (retryText && pending.kind === "replayable") return {
				pendingFinalDelivery: {
					...pending,
					text: retryText
				},
				updatedAt: Date.now()
			};
		}
		return {
			...buildPendingFinalDeliveryCleanupPatch(entry),
			updatedAt: Date.now()
		};
	}, {
		skipMaintenance: true,
		takeCacheOwnership: true
	});
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.finalize.ts
async function finalizeDispatchAndAudit(state) {
	const { cfg, chatType, ctx, deliveryChannel, deliberateSilentTerminalReply, dispatcher, emptyFinalAllowedAsSilent, getDispatchAbortSignal, getObservedReplyDelivery, isRoutedReplyDelivered, markInboundDedupeReplayUnsafe, noVisibleReplyFallbackDirected, pendingContinuation, replyResult, replyRoute, routeReplyToOriginating, sendPolicyDenied, sessionAgentId, sessionKey, sessionStoreEntry, suppressDelivery, throwIfDispatchOperationAborted, turnLedger, waitForPendingDirectBlockReplyDelivery } = state;
	const replies = replyResult ? Array.isArray(replyResult) ? replyResult : [replyResult] : [];
	const pendingFinalDelivery = {
		storePath: sessionStoreEntry.storePath,
		sessionKey: sessionStoreEntry.sessionKey ?? sessionKey
	};
	const replyPendingIntentIds = new Set(replies.map((reply) => getReplyPayloadMetadata(reply)?.pendingFinalDeliveryIntentId).filter((intentId) => Boolean(intentId)));
	const pendingFinalDeliveryIdentity = capturePendingFinalDeliveryIdentity({
		...pendingFinalDelivery,
		intentId: replyPendingIntentIds.size === 1 ? [...replyPendingIntentIds][0] : void 0
	});
	if (state.preserveProgressCallbackStartOrder) await state.progressState.progressCallbackStartTail;
	await state.flushPendingCommentaryProgress();
	const beforeAgentRunBlocked = replies.some((reply) => getReplyPayloadMetadata(reply)?.beforeAgentRunBlocked === true);
	let queuedFinal = false;
	let routedFinalCount = 0;
	let attemptedFinalDelivery = false;
	let finalDeliveryFailed = false;
	const finalDeliveries = [];
	let allQueuedFinalsObserved = true;
	const shouldDeliverDespiteSourceReplySuppression = (reply) => state.suppressAutomaticSourceDelivery && !sendPolicyDenied && getReplyPayloadMetadata(reply)?.deliverDespiteSourceReplySuppression === true && (ctx.InboundEventKind !== "room_event" || state.explicitCommandTurnCtx);
	const sentFinalPayloadDedupeKeys = /* @__PURE__ */ new Set();
	for (const [replyIndex, reply] of replies.entries()) {
		throwIfDispatchOperationAborted();
		if (reply.isReasoning === true && !state.reasoningPayloadsEnabled) continue;
		if (reply.isCommentary === true && !state.commentaryPayloadsEnabled) continue;
		if (suppressDelivery && !shouldDeliverDespiteSourceReplySuppression(reply)) {
			if (hasOutboundReplyContent(reply, { trimText: true })) logVerbose([
				`dispatch-from-config: final reply suppressed by ${state.deliverySuppressionReason || "source delivery policy"}`,
				`(session=${state.acpDispatchSessionKey ?? sessionKey ?? "unknown"}`,
				`provider=${ctx.Provider ?? "unknown"}`,
				`surface=${ctx.Surface ?? "unknown"}`,
				`chatType=${chatType ?? "unknown"}`,
				`inboundEventKind=${ctx.InboundEventKind ?? "unknown"}`,
				`message=${ctx.MessageSidFull ?? ctx.MessageSid ?? "unknown"}`,
				`${formatSuppressedReplyPayloadForLog(reply)})`
			].join(" "));
			continue;
		}
		const finalPayloadDedupeKey = createFinalDispatchPayloadDedupeKey(reply);
		if (sentFinalPayloadDedupeKeys.has(finalPayloadDedupeKey)) continue;
		sentFinalPayloadDedupeKeys.add(finalPayloadDedupeKey);
		const finalReply = await state.sendFinalPayload(reply, { deliveryId: String(replyIndex) });
		if (finalReply.dedupedAgainstBlock) continue;
		attemptedFinalDelivery = true;
		queuedFinal = finalReply.queuedFinal || queuedFinal;
		routedFinalCount += finalReply.routedFinalCount;
		if (finalReply.queuedFinal) if (finalReply.dispatcherOutcome) finalDeliveries.push({
			outcome: finalReply.dispatcherOutcome,
			payload: reply
		});
		else allQueuedFinalsObserved = false;
		if (!finalReply.queuedFinal && finalReply.routedFinalCount === 0) finalDeliveryFailed = true;
	}
	if (attemptedFinalDelivery && !finalDeliveryFailed) {
		if (queuedFinal && allQueuedFinalsObserved) {
			const reconcilePendingFinal = Promise.all(finalDeliveries.map(async (delivery) => ({
				outcome: await delivery.outcome,
				payload: delivery.payload
			}))).then(async (deliveries) => {
				await reconcilePendingFinalDeliveryAfterSettlement({
					...pendingFinalDelivery,
					deliveries,
					identity: pendingFinalDeliveryIdentity,
					replies
				});
			}).catch((error) => {
				logVerbose(`dispatch-from-config: pending final reconciliation failed: ${formatErrorMessage(error)}`);
			});
			registerReplyDispatcherSettledTask(dispatcher, () => reconcilePendingFinal);
		} else await clearPendingFinalDeliveryAfterSuccess({
			...pendingFinalDelivery,
			identity: pendingFinalDeliveryIdentity
		});
		throwIfDispatchOperationAborted();
	}
	if (!suppressDelivery) {
		if (resolveConfiguredTtsMode(cfg, {
			agentId: sessionAgentId,
			channelId: deliveryChannel,
			accountId: replyRoute.accountId
		}) === "final" && replies.length === 0 && state.progressState.blockCount > 0 && state.progressState.accumulatedBlockTtsText.trim()) try {
			await waitForPendingDirectBlockReplyDelivery(getDispatchAbortSignal());
			throwIfDispatchOperationAborted();
			const ttsSyntheticReply = await state.maybeApplyTtsWithFinalizationLease({
				payload: { text: state.progressState.accumulatedBlockTtsText },
				cfg,
				channel: deliveryChannel,
				kind: "final",
				ttsAuto: state.sessionTtsAuto,
				agentId: sessionAgentId,
				accountId: replyRoute.accountId
			});
			throwIfDispatchOperationAborted();
			if (ttsSyntheticReply.mediaUrl) {
				const ttsOnlyPayload = markReplyPayloadAsTtsSupplement({
					mediaUrl: ttsSyntheticReply.mediaUrl,
					audioAsVoice: ttsSyntheticReply.audioAsVoice,
					spokenText: state.progressState.accumulatedBlockTtsText,
					trustedLocalMedia: true
				}, state.progressState.accumulatedBlockTtsText, { visibleTextAlreadyDelivered: true });
				const normalizedTtsOnlyPayload = await state.normalizeReplyMediaPayload(ttsOnlyPayload);
				throwIfDispatchOperationAborted();
				const result = await routeReplyToOriginating(normalizedTtsOnlyPayload, {
					abortSignal: getDispatchAbortSignal(),
					kind: "final"
				});
				if (result) {
					queuedFinal = result.ok || queuedFinal;
					if (isRoutedReplyDelivered(result)) routedFinalCount += 1;
					if (!result.ok) logVerbose(`dispatch-from-config: route-reply (tts-only) failed: ${result.error ?? "unknown error"}`);
				} else {
					throwIfDispatchOperationAborted();
					markInboundDedupeReplayUnsafe();
					queuedFinal = turnLedger.sendQueued("final", normalizedTtsOnlyPayload).queued || queuedFinal;
				}
			}
		} catch (err) {
			if (isDispatchReplyOperationAbortedError(err)) throw err;
			logVerbose(`dispatch-from-config: accumulated block TTS failed: ${formatErrorMessage(err)}`);
		}
	}
	await waitForPendingDirectBlockReplyDelivery(getDispatchAbortSignal());
	const replyAcceptedByActiveRun = state.replyOperationRunState.admission?.status === "accepted";
	const noVisibleReplyFallbackAllowed = () => noVisibleReplyFallbackDirected && !suppressDelivery && !sendPolicyDenied && state.sourceReplyDeliveryMode !== "message_tool_only" && !emptyFinalAllowedAsSilent && !deliberateSilentTerminalReply && !pendingContinuation && !getObservedReplyDelivery() && !replyAcceptedByActiveRun && !turnLedger.hasVisibleDelivery() && !turnLedger.hasForeignQueuedAdmissions();
	let queuedSettleResult = "settled";
	if (noVisibleReplyFallbackAllowed()) queuedSettleResult = await turnLedger.settleQueued(getDispatchAbortSignal());
	let counts = dispatcher.getQueuedCounts();
	let noVisibleReplyFallbackDelivered = false;
	if (queuedSettleResult === "settled" && noVisibleReplyFallbackAllowed()) try {
		throwIfDispatchOperationAborted();
		const fallbackPayload = { text: NO_VISIBLE_REPLY_FALLBACK_TEXT };
		const result = await routeReplyToOriginating(fallbackPayload, {
			abortSignal: getDispatchAbortSignal(),
			kind: "final"
		});
		if (result) {
			if (isRoutedReplyDelivered(result)) {
				queuedFinal = true;
				noVisibleReplyFallbackDelivered = true;
				routedFinalCount += 1;
			} else if (!result.ok) logVerbose(`dispatch-from-config: route-reply (no-visible-reply fallback) failed: ${result.error ?? "unknown error"}`);
		} else {
			throwIfDispatchOperationAborted();
			markInboundDedupeReplayUnsafe();
			if (turnLedger.sendQueued("final", fallbackPayload).queued) {
				const fallbackSettle = await turnLedger.settleQueued(getDispatchAbortSignal());
				throwIfDispatchOperationAborted();
				if (fallbackSettle !== "settled" || turnLedger.hasVisibleDelivery()) {
					queuedFinal = true;
					noVisibleReplyFallbackDelivered = true;
					counts = dispatcher.getQueuedCounts();
				}
			}
		}
	} catch (err) {
		if (isDispatchReplyOperationAbortedError(err)) throw err;
		logVerbose(`dispatch-from-config: no-visible-reply fallback failed: ${formatErrorMessage(err)}`);
	}
	counts.final += routedFinalCount;
	state.commitInboundDedupeIfClaimed();
	state.recordAgentDispatchCompleted("completed");
	state.recordProcessed("completed", state.bindingState.pluginFallbackReason ? { reason: state.bindingState.pluginFallbackReason } : void 0);
	state.markIdle("message_completed");
	state.completeDispatchReplyOperation();
	return {
		status: "complete",
		result: state.attachSourceReplyDeliveryMode({
			queuedFinal,
			counts,
			...state.routeState.sessionMetadataChangesForResult ? { sessionMetadataChanges: state.routeState.sessionMetadataChangesForResult } : {},
			...getObservedReplyDelivery() ? { observedReplyDelivery: true } : {},
			...noVisibleReplyFallbackDirected && queuedSettleResult === "settled" && !turnLedger.hasVisibleDelivery() && !noVisibleReplyFallbackDelivered && !getObservedReplyDelivery() && !replyAcceptedByActiveRun && !emptyFinalAllowedAsSilent && !deliberateSilentTerminalReply && !pendingContinuation ? { noVisibleReplyFallbackEligible: true } : {},
			...noVisibleReplyFallbackDelivered ? { noVisibleReplyFallbackDelivered: true } : {},
			...beforeAgentRunBlocked ? { beforeAgentRunBlocked } : {}
		})
	};
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.runtime.ts
/** Runtime-only dispatch dependencies shared by config-driven reply delivery. */
/** Runtime-only dispatch dependencies shared by config-driven reply delivery. */
function loadSessionStoreEntry(params) {
	return loadSqliteSessionEntryReadOnly(params);
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.context.ts
function routeThreadIdsDiffer(left, right) {
	if (left === void 0 || right === void 0) return false;
	return String(left) !== String(right);
}
function shouldLetSlackRoutedThreadBypassBusyReplyOperation(params) {
	return isSlackDirectRoutedThreadTurn(params.ctx) && routeThreadIdsDiffer(params.activeOperation?.routeThreadId, params.routeThreadId);
}
function resolveRoutedPolicyConversationType(ctx) {
	const commandTargetSessionKey = resolveCommandTurnTargetSessionKey(ctx);
	if (commandTargetSessionKey && commandTargetSessionKey !== ctx.SessionKey) return;
	const chatType = normalizeChatType(ctx.ChatType);
	if (chatType === "direct") return "direct";
	if (chatType === "group" || chatType === "channel") return "group";
}
function resolveSessionStoreLookup(ctx, cfg) {
	const sessionKey = normalizeOptionalString(resolveCommandTurnTargetSessionKey(ctx) ?? ctx.SessionKey);
	if (!sessionKey) return {};
	const agentId = resolveSessionAgentId({
		sessionKey,
		config: cfg,
		fallbackAgentId: ctx.AgentId
	});
	const storePath = resolveStorePath(cfg.session?.store, { agentId });
	try {
		const entry = loadSessionStoreEntry({
			agentId,
			storePath,
			sessionKey,
			readConsistency: "latest",
			clone: false
		});
		return {
			sessionKey,
			storePath,
			entry,
			store: entry ? { [sessionKey]: entry } : void 0
		};
	} catch {
		return {
			sessionKey,
			storePath
		};
	}
}
function resolveBoundAcpDispatchSessionKey(params) {
	const bindingContext = resolveConversationBindingContextFromMessage({
		cfg: params.cfg,
		ctx: params.ctx
	});
	if (!bindingContext) return;
	const binding = getSessionBindingService().resolveByConversation({
		channel: bindingContext.channel,
		accountId: bindingContext.accountId,
		conversationId: bindingContext.conversationId,
		...bindingContext.parentConversationId ? { parentConversationId: bindingContext.parentConversationId } : {}
	});
	const targetSessionKey = normalizeOptionalString(binding?.targetSessionKey);
	if (!binding || !targetSessionKey || !isAcpSessionKey(targetSessionKey)) return;
	if (isPluginOwnedSessionBindingRecord(binding)) return;
	getSessionBindingService().touch(binding.bindingId);
	return targetSessionKey;
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.harness-defaults.ts
function createShouldEmitVerboseProgress(params) {
	const resolveCurrentExplicitLevel = () => {
		if (params.sessionKey && params.storePath) try {
			return normalizeVerboseLevel(loadSessionStoreEntry({
				...params.agentId ? { agentId: params.agentId } : {},
				storePath: params.storePath,
				sessionKey: params.sessionKey,
				readConsistency: "latest",
				clone: false
			})?.verboseLevel ?? "");
		} catch {}
		return normalizeVerboseLevel(params.initialExplicitLevel ?? "");
	};
	const resolveLevel = () => {
		const explicitLevel = resolveCurrentExplicitLevel();
		if (explicitLevel) return explicitLevel;
		return normalizeVerboseLevel(params.fallbackLevel) ?? "off";
	};
	return {
		shouldEmit: () => resolveLevel() !== "off",
		shouldEmitFull: () => resolveLevel() === "full"
	};
}
function resolveHarnessDefaultChannel(params) {
	const originatingChannel = typeof params.ctx.OriginatingChannel === "string" ? params.ctx.OriginatingChannel : void 0;
	return sessionDeliveryChannel(params.entry) ?? originatingChannel ?? params.ctx.Provider ?? params.ctx.Surface;
}
function resolveHarnessDefaultParentSessionKey(params) {
	return params.entry?.parentSessionKey ?? params.ctx.ModelParentSessionKey ?? params.ctx.ParentSessionKey;
}
function resolveTurnModelOverride(replyOptions) {
	if (replyOptions?.isHeartbeat !== true) return;
	return normalizeOptionalString(replyOptions.heartbeatModelOverride);
}
function resolveChannelModelCandidate(params) {
	if (!params.cfg.channels?.modelByChannel) return;
	const channel = resolveHarnessDefaultChannel({
		ctx: params.ctx,
		entry: params.entry
	});
	const channelModelOverride = resolveChannelModelOverride({
		cfg: params.cfg,
		channel,
		groupId: params.entry?.groupId,
		groupChatType: params.entry?.chatType ?? params.ctx.ChatType,
		groupChannel: params.entry?.groupChannel ?? params.ctx.GroupChannel,
		groupSubject: params.entry?.subject ?? params.ctx.GroupSubject,
		parentSessionKey: params.parentSessionKey,
		directUserIds: [
			sessionDeliveryOrigin(params.entry)?.nativeDirectUserId,
			sessionDeliveryOrigin(params.entry)?.from,
			sessionDeliveryOrigin(params.entry)?.to,
			params.ctx.OriginatingTo,
			params.ctx.From,
			params.ctx.SenderId
		]
	});
	if (!channelModelOverride) return;
	return resolveModelRefFromString({
		raw: channelModelOverride.model,
		defaultProvider: params.defaultProvider,
		aliasIndex: params.aliasIndex
	})?.ref;
}
function resolveStoredModelCandidate(params) {
	const storedModelRef = resolveStoredModelOverride({
		loadSessionEntry: (sessionKey) => {
			const agentId = resolveSessionAgentId({
				sessionKey,
				config: params.cfg,
				fallbackAgentId: params.sessionAgentId
			});
			return loadSessionStoreEntry({
				agentId,
				storePath: resolveStorePath(params.cfg.session?.store, { agentId }),
				sessionKey,
				readConsistency: "latest",
				clone: false
			});
		},
		sessionEntry: params.entry,
		sessionStore: params.sessionStore,
		sessionKey: params.sessionKey,
		parentSessionKey: params.parentSessionKey,
		defaultProvider: params.defaultProvider
	});
	if (!storedModelRef) return;
	return {
		provider: storedModelRef.provider ?? params.defaultProvider,
		model: storedModelRef.model
	};
}
function resolveModelOverrideCandidate(params) {
	if (!params.modelOverride) return;
	return resolveModelRefFromString({
		raw: params.modelOverride,
		defaultProvider: params.defaultProvider,
		aliasIndex: params.aliasIndex
	})?.ref;
}
function resolveHarnessSourceVisibleRepliesDefault(params) {
	if (isNativeCommandTurn(resolveCommandTurnContext(params.ctx))) return;
	try {
		const defaultModelRef = resolveDefaultModelForAgent({
			cfg: params.cfg,
			agentId: params.sessionAgentId
		});
		const aliasIndex = buildModelAliasIndex({
			cfg: params.cfg,
			defaultProvider: defaultModelRef.provider
		});
		const parentSessionKey = resolveHarnessDefaultParentSessionKey(params);
		const channelModelCandidate = resolveChannelModelCandidate({
			aliasIndex,
			cfg: params.cfg,
			ctx: params.ctx,
			defaultProvider: defaultModelRef.provider,
			entry: params.entry,
			parentSessionKey
		});
		const storedModelCandidate = resolveStoredModelCandidate({
			cfg: params.cfg,
			defaultProvider: defaultModelRef.provider,
			entry: params.entry,
			parentSessionKey,
			sessionAgentId: params.sessionAgentId,
			sessionKey: params.sessionKey,
			sessionStore: params.sessionStore
		});
		const turnModelCandidate = resolveModelOverrideCandidate({
			aliasIndex,
			defaultProvider: defaultModelRef.provider,
			modelOverride: params.turnModelOverride
		});
		const resolveCandidateDefault = (candidate) => {
			const agentHarnessRuntimeOverride = resolveSessionRuntimeOverrideForProvider({
				provider: candidate.provider,
				entry: params.entry,
				cfg: params.cfg
			});
			const harness = selectAgentHarness({
				provider: candidate.provider,
				modelId: candidate.model,
				config: params.cfg,
				agentId: params.sessionAgentId,
				sessionKey: params.sessionKey,
				agentHarnessId: params.entry?.modelSelectionLocked === true ? params.entry.agentHarnessId : void 0,
				agentHarnessRuntimeOverride
			});
			return harness.deliveryDefaults?.visibleReplies ?? harness.deliveryDefaults?.sourceVisibleReplies;
		};
		const selectedModelCandidate = turnModelCandidate ?? storedModelCandidate ?? channelModelCandidate;
		if (selectedModelCandidate) return resolveCandidateDefault(selectedModelCandidate);
		const sourceProvider = normalizeOptionalString(sessionDeliveryOrigin(params.entry)?.provider ?? params.ctx.Provider ?? params.ctx.Surface);
		if (sourceProvider) {
			const sourceDefault = resolveCandidateDefault({ provider: sourceProvider });
			if (sourceDefault) return sourceDefault;
		}
		return resolveCandidateDefault(defaultModelRef);
	} catch (error) {
		logVerbose(`dispatch-from-config: could not resolve harness visible-reply defaults: ${formatErrorMessage(error)}`);
		return;
	}
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.turn-ledger.ts
const SETTLE_QUEUED_TIMEOUT_MS = 3e4;
function createReplyTurnLedger(dispatcher) {
	let visibleDeliveries = 0;
	let queuedAdmissions = 0;
	const pendingOutcomes = [];
	const enqueue = (kind, payload) => {
		if (kind === "tool") return dispatcher.sendToolResult(payload);
		if (kind === "block") return dispatcher.sendBlockReply(payload);
		return dispatcher.sendFinalReply(payload);
	};
	return {
		sendQueued(kind, payload) {
			const capture = captureReplyDispatchDeliveryOutcome(payload);
			if (!enqueue(kind, payload)) return { queued: false };
			queuedAdmissions += 1;
			const contentful = hasOutboundReplyContent(payload, { trimText: true });
			if (!capture.isTracked()) {
				if (contentful) visibleDeliveries += 1;
				return { queued: true };
			}
			pendingOutcomes.push(capture.promise.then((outcome) => {
				if (contentful && outcome !== "cancelled" && outcome !== "failed-before-deliver") visibleDeliveries += 1;
			}));
			return {
				queued: true,
				outcome: capture.promise
			};
		},
		recordRoutedDelivery(payload, delivered) {
			if (delivered && hasOutboundReplyContent(payload, { trimText: true })) visibleDeliveries += 1;
		},
		async settleQueued(abortSignal) {
			let timedOut = false;
			let timer;
			const deadline = new Promise((resolve) => {
				timer = setTimeout(() => {
					timedOut = true;
					resolve();
				}, SETTLE_QUEUED_TIMEOUT_MS);
				timer.unref?.();
			});
			let removeAbortListener;
			const aborted = abortSignal ? new Promise((resolve) => {
				const onAbort = () => resolve();
				abortSignal.addEventListener("abort", onAbort, { once: true });
				removeAbortListener = () => abortSignal.removeEventListener("abort", onAbort);
			}) : void 0;
			try {
				let settledCount = 0;
				while (settledCount < pendingOutcomes.length) {
					if (abortSignal?.aborted) return "aborted";
					if (timedOut) return "timed-out";
					const batch = pendingOutcomes.slice(settledCount);
					const batchTarget = pendingOutcomes.length;
					const settled = Promise.all(batch).then(() => void 0);
					await Promise.race([
						settled,
						deadline,
						...aborted ? [aborted] : []
					]);
					if (abortSignal?.aborted) return "aborted";
					if (timedOut) return "timed-out";
					settledCount = batchTarget;
				}
				return "settled";
			} finally {
				if (timer) clearTimeout(timer);
				removeAbortListener?.();
			}
		},
		hasVisibleDelivery: () => visibleDeliveries > 0,
		hasForeignQueuedAdmissions: () => {
			const counts = dispatcher.getQueuedCounts();
			return counts.tool + counts.block + counts.final > queuedAdmissions;
		}
	};
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.lifecycle.ts
function createDispatchReplyOperationCoordinator(params) {
	let dispatchReplyOperation;
	let dispatchAbortOperation;
	let preDispatchAbortOperation;
	let preDispatchLifecycleAdmission;
	let preDispatchLifecycleAbortController;
	let dispatchLifecycleAbortController;
	let preDispatchLifecycleInterrupted = false;
	const dispatchLifecycleWork = /* @__PURE__ */ new Set();
	const trackDispatchLifecycleWork = (work) => {
		if (!dispatchReplyOperation && !preDispatchLifecycleAdmission) return;
		const settled = work.then(() => {}, () => {});
		dispatchLifecycleWork.add(settled);
		settled.then(() => {
			dispatchLifecycleWork.delete(settled);
		});
	};
	const waitForDispatchLifecycleWorkAndDelivery = async () => {
		await Promise.allSettled(Array.from(dispatchLifecycleWork));
		await waitForReplyDispatcherIdle(params.dispatcher);
	};
	const releasePreDispatchLifecycleAdmission = async (afterWorkBarrier) => {
		const admission = preDispatchLifecycleAdmission;
		const preDispatchAbortController = preDispatchLifecycleAbortController;
		const dispatchAbortController = dispatchLifecycleAbortController;
		preDispatchLifecycleAdmission = void 0;
		if (!admission) return;
		const pendingWork = Array.from(dispatchLifecycleWork);
		const clearAbortControllers = () => {
			if (preDispatchLifecycleAbortController === preDispatchAbortController) preDispatchLifecycleAbortController = void 0;
			if (dispatchLifecycleAbortController === dispatchAbortController) dispatchLifecycleAbortController = void 0;
		};
		if (!afterWorkBarrier && pendingWork.length === 0) {
			clearAbortControllers();
			admission.release();
			return;
		}
		try {
			await Promise.allSettled(pendingWork);
			if (afterWorkBarrier) await waitForReplyBarrierSettlement(afterWorkBarrier(), params.dispatcher.resolveFollowupAdmissionBarrierTimeoutPolicy?.());
		} finally {
			clearAbortControllers();
			admission.release();
		}
	};
	const runWithDispatchLifecycleAdmission = async (run) => {
		if (dispatchReplyOperation) return await runWithReplyOperationLifecycleAdmission(dispatchReplyOperation, run);
		return preDispatchLifecycleAdmission ? await preDispatchLifecycleAdmission.run(run) : await run();
	};
	const ensureDispatchReplyOperation = async (phase) => {
		if (phase === "dispatch") {
			await releasePreDispatchLifecycleAdmission(() => waitForReplyDispatcherIdle(params.dispatcher));
			if (preDispatchLifecycleInterrupted) return { status: dispatchReplyOperation ? "aborted" : "busy" };
		}
		if (dispatchReplyOperation) return { status: "ready" };
		if (dispatchAbortOperation && !dispatchAbortOperation.result) return dispatchReplyOperation ? { status: "ready" } : { status: "busy" };
		if (phase === "dispatch" && preDispatchAbortOperation?.result && preDispatchAbortOperation.result.kind !== "completed" && !dispatchReplyOperation) {
			dispatchAbortOperation = preDispatchAbortOperation;
			return { status: "busy" };
		}
		if (!params.dispatchOperationSessionKey) return { status: "ready" };
		const operationSessionId = dispatchAbortOperation?.sessionId ?? params.operationSessionStoreEntry.entry?.sessionId ?? crypto.randomUUID();
		const replyTurnKind = resolveReplyTurnKind(params.replyOptions);
		const allowActivePreDispatch = phase === "pre_dispatch" && replyTurnKind === "visible";
		if (phase === "dispatch" && replyTurnKind === "visible" && params.replyOptions?.turnAdoptionLifecycle !== void 0 && replyRunRegistry.get(params.dispatchOperationSessionKey) !== void 0) return { status: "ready" };
		const allowSlackRoutedThreadBypass = phase === "dispatch" && shouldLetSlackRoutedThreadBypassBusyReplyOperation({
			activeOperation: replyRunRegistry.get(params.dispatchOperationSessionKey),
			ctx: params.ctx,
			routeThreadId: params.routeThreadId
		});
		const lifecycleOnlyAbortController = allowActivePreDispatch || allowSlackRoutedThreadBypass ? new AbortController() : void 0;
		const onLifecycleInterrupt = () => {
			preDispatchLifecycleInterrupted = true;
			lifecycleOnlyAbortController?.abort();
		};
		let admission = await admitReplyTurn({
			sessionKey: params.dispatchOperationSessionKey,
			sessionId: operationSessionId,
			expectedSessionId: params.resolveOperationExpectedSessionId(),
			expectedActiveOperation: params.initialDispatchReplyOperation,
			storePath: params.operationSessionStoreEntry.storePath,
			kind: replyTurnKind,
			resetTriggered: false,
			routeThreadId: params.routeThreadId,
			upstreamAbortSignal: params.replyOptions?.abortSignal,
			waitForActive: !allowActivePreDispatch && !allowSlackRoutedThreadBypass,
			retainLifecycleAdmissionOnActive: allowActivePreDispatch || allowSlackRoutedThreadBypass,
			onLifecycleInterrupt,
			onReplyAdmissionWaitChange: params.replyOptions?.onReplyAdmissionWaitChange
		});
		if (admission.status === "skipped" && admission.reason === "active-run" && replyTurnKind === "visible" && isRecoverableTerminalSessionStatus(params.operationSessionStoreEntry.entry?.status) && admission.activeOperation?.sessionId === params.operationSessionStoreEntry.entry?.sessionId && !admission.activeOperation?.terminalRecovery) {
			if (forceClearReplyRunBySessionId(admission.activeOperation?.sessionId ?? operationSessionId, /* @__PURE__ */ new Error("clearing stale terminal reply operation"))) {
				admission.lifecycleAdmission?.release();
				logVerbose(`dispatch-from-config: cleared stale active reply operation for terminal session ${params.dispatchOperationSessionKey}`);
				admission = await admitReplyTurn({
					sessionKey: params.dispatchOperationSessionKey,
					sessionId: operationSessionId,
					expectedSessionId: params.resolveOperationExpectedSessionId(),
					expectedActiveOperation: params.initialDispatchReplyOperation,
					storePath: params.operationSessionStoreEntry.storePath,
					kind: replyTurnKind,
					resetTriggered: false,
					routeThreadId: params.routeThreadId,
					upstreamAbortSignal: params.replyOptions?.abortSignal,
					waitForActive: !allowActivePreDispatch && !allowSlackRoutedThreadBypass,
					retainLifecycleAdmissionOnActive: allowActivePreDispatch || allowSlackRoutedThreadBypass,
					onLifecycleInterrupt,
					onReplyAdmissionWaitChange: params.replyOptions?.onReplyAdmissionWaitChange
				});
			}
		}
		if (admission.status === "skipped") {
			if (allowActivePreDispatch && admission.reason === "active-run") {
				preDispatchAbortOperation = admission.activeOperation;
				preDispatchLifecycleAdmission = admission.lifecycleAdmission;
				preDispatchLifecycleAbortController = lifecycleOnlyAbortController;
				return { status: "ready" };
			}
			if (admission.reason === "active-run" && shouldLetSlackRoutedThreadBypassBusyReplyOperation({
				activeOperation: admission.activeOperation,
				ctx: params.ctx,
				routeThreadId: params.routeThreadId
			})) {
				preDispatchLifecycleAdmission = admission.lifecycleAdmission;
				dispatchLifecycleAbortController = lifecycleOnlyAbortController;
				logVerbose(`dispatch-from-config: allowing Slack routed thread ${params.routeThreadId} while ${params.dispatchOperationSessionKey} has an active reply operation in another Slack thread`);
				return { status: "ready" };
			}
			admission.lifecycleAdmission?.release();
			dispatchAbortOperation = admission.activeOperation;
			logVerbose(`dispatch-from-config: skipped reply operation admission for ${params.dispatchOperationSessionKey}; reason=${admission.reason}`);
			return { status: "busy" };
		}
		if (replyTurnKind === "visible" && isRecoverableTerminalSessionStatus(params.operationSessionStoreEntry.entry?.status) && operationSessionId === params.operationSessionStoreEntry.entry?.sessionId) admission.operation.markTerminalRecovery();
		dispatchReplyOperation = admission.operation;
		dispatchReplyOperation.retainFailureUntilComplete();
		dispatchAbortOperation = admission.operation;
		return { status: "ready" };
	};
	const getPreDispatchAbortOperation = () => dispatchAbortOperation ?? preDispatchAbortOperation;
	let cachedPreDispatchAbortSignal;
	let cachedDispatchAbortSignal;
	const getPreDispatchAbortSignal = () => {
		const operationSignal = getPreDispatchAbortOperation()?.abortSignal;
		const lifecycleSignal = preDispatchLifecycleAbortController?.signal;
		const upstreamSignal = params.replyOptions?.abortSignal;
		if (cachedPreDispatchAbortSignal && cachedPreDispatchAbortSignal.operationSignal === operationSignal && cachedPreDispatchAbortSignal.lifecycleSignal === lifecycleSignal && cachedPreDispatchAbortSignal.upstreamSignal === upstreamSignal) return cachedPreDispatchAbortSignal.signal;
		const abortSignals = [
			operationSignal,
			lifecycleSignal,
			upstreamSignal
		].filter((signal) => Boolean(signal));
		const signal = abortSignals.length > 1 ? AbortSignal.any(abortSignals) : abortSignals[0];
		cachedPreDispatchAbortSignal = {
			operationSignal,
			lifecycleSignal,
			upstreamSignal,
			signal
		};
		return signal;
	};
	const getDispatchAbortSignal = () => {
		const operationSignal = dispatchReplyOperation?.abortSignal ?? dispatchLifecycleAbortController?.signal;
		const upstreamSignal = operationSignal ? void 0 : params.replyOptions?.abortSignal;
		if (cachedDispatchAbortSignal && cachedDispatchAbortSignal.operationSignal === operationSignal && cachedDispatchAbortSignal.upstreamSignal === upstreamSignal) return cachedDispatchAbortSignal.signal;
		const signal = operationSignal ?? upstreamSignal;
		cachedDispatchAbortSignal = {
			operationSignal,
			upstreamSignal,
			signal
		};
		return signal;
	};
	const getQueuedFollowupAbortSignal = () => dispatchReplyOperation?.abortSignal ?? params.replyOptions?.abortSignal;
	let observedReplyDelivery = false;
	const markObservedReplyDelivery = async () => {
		if (observedReplyDelivery) return;
		observedReplyDelivery = true;
		await params.replyOptions?.onObservedReplyDelivery?.();
	};
	const getReplyOptions = () => {
		const abortSignal = getDispatchAbortSignal();
		const onAgentRunStart = params.messageAuditTerminal ? (runId) => {
			params.messageAuditTerminal?.observeRunId(runId);
			params.replyOptions?.onAgentRunStart?.(runId);
		} : void 0;
		if (!abortSignal && !onAgentRunStart) return params.replyOptions;
		return {
			...params.replyOptions,
			...abortSignal ? {
				abortSignal,
				queuedFollowupAbortSignal: getQueuedFollowupAbortSignal()
			} : {},
			...onAgentRunStart ? { onAgentRunStart } : {},
			...dispatchReplyOperation ? { replyOperation: dispatchReplyOperation } : {}
		};
	};
	const completeDispatchReplyOperation = () => {
		const completionBarrier = waitForDispatchLifecycleWorkAndDelivery();
		releasePreDispatchLifecycleAdmission(() => waitForReplyDispatcherIdle(params.dispatcher));
		if (dispatchReplyOperation) dispatchReplyOperation.completeWithAfterClearBarrier(completionBarrier, params.dispatcher.resolveFollowupAdmissionBarrierTimeoutPolicy?.());
	};
	const failDispatchReplyOperation = (error) => {
		const completionBarrier = waitForDispatchLifecycleWorkAndDelivery();
		releasePreDispatchLifecycleAdmission(() => waitForReplyDispatcherIdle(params.dispatcher));
		if (!dispatchReplyOperation) return;
		dispatchReplyOperation.freezeAbort();
		if (!dispatchReplyOperation.result) dispatchReplyOperation.fail("run_failed", error);
		dispatchReplyOperation.completeWithAfterClearBarrier(completionBarrier, params.dispatcher.resolveFollowupAdmissionBarrierTimeoutPolicy?.());
	};
	const isDispatchOperationAborted = () => getDispatchAbortSignal()?.aborted === true;
	const isPreDispatchOperationAborted = () => getPreDispatchAbortSignal()?.aborted === true;
	const throwIfDispatchOperationAborted = () => {
		if (isDispatchOperationAborted()) throw new DispatchReplyOperationAbortedError();
	};
	const turnLedger = createReplyTurnLedger(params.dispatcher);
	return {
		completeDispatchReplyOperation,
		dispatchHookDispatcher: createAbortAwareDispatcher({
			dispatcher: {
				...params.dispatcher,
				sendToolResult: (payload) => turnLedger.sendQueued("tool", payload).queued,
				sendBlockReply: (payload) => turnLedger.sendQueued("block", payload).queued,
				sendFinalReply: (payload) => turnLedger.sendQueued("final", payload).queued
			},
			isAborted: isPreDispatchOperationAborted
		}),
		turnLedger,
		ensureDispatchReplyOperation,
		failDispatchReplyOperation,
		getDispatchAbortOperation: () => dispatchAbortOperation,
		getDispatchAbortSignal,
		getDispatchReplyOperation: () => dispatchReplyOperation,
		getReplyOptions,
		getObservedReplyDelivery: () => observedReplyDelivery,
		getPreDispatchAbortSignal,
		isDispatchOperationAborted,
		isPreDispatchOperationAborted,
		markObservedReplyDelivery,
		releasePreDispatchLifecycleAdmission,
		runWithDispatchLifecycleAdmission,
		throwIfDispatchOperationAborted,
		trackDispatchLifecycleWork
	};
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.runtime-loaders.ts
const routeReplyRuntimeLoader = createLazyImportLoader(() => import("./route-reply.runtime.js"));
const getReplyFromConfigRuntimeLoader = createLazyImportLoader(() => import("./get-reply-from-config.runtime.js"));
const abortRuntimeLoader = createLazyImportLoader(() => import("./abort.runtime.js"));
const fastApproveRuntimeLoader = createLazyImportLoader(() => import("./fast-approve.runtime.js"));
const replyMediaPathsRuntimeLoader = createLazyImportLoader(() => import("./reply-media-paths.runtime.js"));
const runtimePluginsLoader = createLazyImportLoader(() => import("./runtime-plugins-DeslGTeX.js"));
function loadRouteReplyRuntime() {
	return routeReplyRuntimeLoader.load();
}
function loadGetReplyFromConfigRuntime() {
	return getReplyFromConfigRuntimeLoader.load();
}
function loadAbortRuntime() {
	return abortRuntimeLoader.load();
}
function loadFastApproveRuntime() {
	return fastApproveRuntimeLoader.load();
}
function loadReplyMediaPathsRuntime() {
	return replyMediaPathsRuntimeLoader.load();
}
function loadRuntimePlugins() {
	return runtimePluginsLoader.load();
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.timing.ts
const replyHotPathTimingLog = createSubsystemLogger("auto-reply/reply-timing");
function createReplyHotPathTimingTracker(options = {}) {
	const timing = createReplyTimingTracker({
		log: replyHotPathTimingLog,
		enabled: options.profilerEnabled === true,
		formatMessage: (params, summary, stages) => `reply hot path timings channel=${params.channel} messageId=${params.messageId ?? "unknown"} sessionKey=${params.sessionKey ?? "unknown"} outcome=${params.outcome} totalMs=${summary.totalMs} stages=${stages}${params.reason ? ` reason=${params.reason}` : ""}`,
		detailKeys: () => [
			"channel",
			"messageId",
			"sessionKey",
			"outcome",
			"reason"
		]
	});
	return {
		measure: timing.measure,
		logIfSlow(params) {
			timing.logIfSlow(params);
		}
	};
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.gather.ts
async function gatherDispatchRequest(params, messageAuditTerminal) {
	const ctx = isFinalizedInboundContext(params.ctx) ? params.ctx : finalizeInboundContext(params.ctx);
	const normalizedParams = ctx === params.ctx ? params : {
		...params,
		ctx
	};
	const state = {
		params: normalizedParams,
		messageAuditTerminal,
		inboundDedupeReplayUnsafe: false
	};
	const { cfg, dispatcher } = normalizedParams;
	const replyOperationRunState = resolveReplyOperationRunState(normalizedParams.replyOptions) ?? {};
	if (params.replyOptions?.abortSignal?.aborted) {
		messageAuditTerminal?.note("skipped", { reason: "reply_operation_aborted" });
		return {
			status: "complete",
			result: {
				queuedFinal: false,
				counts: dispatcher.getQueuedCounts()
			}
		};
	}
	const diagnosticsEnabled = isDiagnosticsEnabled(cfg);
	const channel = normalizeLowercaseStringOrEmpty(ctx.Surface ?? ctx.Provider ?? "unknown");
	const chatId = ctx.To ?? ctx.From;
	const messageId = ctx.MessageSidFull ?? ctx.MessageSid ?? ctx.MessageSidFirst ?? ctx.MessageSidLast;
	const sessionKey = normalizeOptionalString(ctx.SessionKey) ?? normalizeOptionalString(ctx.CommandTargetSessionKey);
	const startTime = diagnosticsEnabled ? Date.now() : 0;
	const canTrackSession = diagnosticsEnabled && Boolean(sessionKey);
	const initialSessionStoreEntry = resolveSessionStoreLookup(ctx, cfg);
	const messageLifecycle = createDiagnosticMessageLifecycle({
		enabled: diagnosticsEnabled,
		channel,
		chatId,
		messageId,
		sessionKey,
		sessionId: initialSessionStoreEntry.sessionKey === sessionKey ? initialSessionStoreEntry.entry?.sessionId : void 0,
		source: "dispatch",
		processingReason: "message_start",
		startedAtMs: startTime,
		trackSessionState: canTrackSession
	});
	const traceAttributes = {
		surface: channel,
		hasSessionKey: Boolean(sessionKey),
		hasRunId: typeof params.replyOptions?.runId === "string"
	};
	const replyHotPathTiming = createReplyHotPathTimingTracker({ profilerEnabled: isReplyProfilerEnabled({ config: cfg }) });
	const traceReplyPhase = (name, run) => replyHotPathTiming.measure(name, () => measureDiagnosticsTimelineSpan(name, run, {
		phase: "agent-turn",
		config: cfg,
		attributes: traceAttributes
	}));
	let agentDispatchStartedAt = 0;
	const recordProcessed = (outcome, opts) => {
		messageAuditTerminal?.note(outcome, opts);
		if (diagnosticsEnabled) replyHotPathTiming.logIfSlow({
			channel,
			messageId,
			sessionKey,
			outcome,
			reason: opts?.reason
		});
		messageLifecycle.markProcessed(outcome, opts);
	};
	const recordAgentDispatchStarted = () => {
		if (!diagnosticsEnabled || agentDispatchStartedAt > 0) return;
		agentDispatchStartedAt = Date.now();
		logMessageDispatchStarted({
			channel,
			sessionKey: acpDispatchSessionKey,
			source: "replyResolver"
		});
	};
	const recordAgentDispatchCompleted = (outcome, opts) => {
		if (!diagnosticsEnabled || agentDispatchStartedAt <= 0) return;
		logMessageDispatchCompleted({
			channel,
			sessionKey: acpDispatchSessionKey,
			source: "replyResolver",
			durationMs: Date.now() - agentDispatchStartedAt,
			outcome,
			reason: opts?.reason,
			error: opts?.error
		});
	};
	const markProcessing = () => {
		messageLifecycle.markProcessing();
	};
	const markIdle = (reason) => {
		messageLifecycle.markIdle(reason);
	};
	const markInboundDedupeReplayUnsafe = () => {
		state.inboundDedupeReplayUnsafe = true;
	};
	const boundAcpDispatchSessionKey = resolveBoundAcpDispatchSessionKey({
		ctx,
		cfg
	});
	const acpDispatchSessionKey = boundAcpDispatchSessionKey ?? initialSessionStoreEntry.sessionKey ?? sessionKey;
	const sourceSessionKey = normalizeOptionalString(ctx.SessionKey);
	const dispatchOperationSessionKey = sourceSessionKey ?? initialSessionStoreEntry.sessionKey ?? sessionKey ?? acpDispatchSessionKey;
	const operationSessionStoreEntry = sourceSessionKey && initialSessionStoreEntry.sessionKey && sourceSessionKey !== initialSessionStoreEntry.sessionKey ? resolveSessionStoreLookup({
		...ctx,
		CommandTargetSessionKey: void 0
	}, cfg) : initialSessionStoreEntry;
	const initialDispatchReplyOperation = dispatchOperationSessionKey ? replyRunRegistry.get(dispatchOperationSessionKey) : void 0;
	if (params.replyOptions?.isHeartbeat === true && dispatchOperationSessionKey && initialDispatchReplyOperation) {
		messageAuditTerminal?.note("skipped", { reason: "reply-operation-active" });
		return {
			status: "complete",
			result: {
				queuedFinal: false,
				counts: dispatcher.getQueuedCounts()
			}
		};
	}
	const markProgress = () => {
		if (!canTrackSession || !sessionKey) return;
		markDiagnosticSessionProgress({ sessionKey });
		if (acpDispatchSessionKey && acpDispatchSessionKey !== sessionKey) markDiagnosticSessionProgress({ sessionKey: acpDispatchSessionKey });
	};
	const sessionStoreEntry = boundAcpDispatchSessionKey ? resolveSessionStoreLookup({
		...ctx,
		SessionKey: boundAcpDispatchSessionKey
	}, cfg) : initialSessionStoreEntry;
	let preparedSessionBinding = sessionStoreEntry.sessionKey && sessionStoreEntry.entry?.sessionId ? {
		sessionKey: sessionStoreEntry.sessionKey,
		sessionId: sessionStoreEntry.entry.sessionId,
		storePath: sessionStoreEntry.storePath
	} : void 0;
	let preparedOperationSessionBinding = operationSessionStoreEntry.sessionKey && operationSessionStoreEntry.entry?.sessionId ? {
		sessionKey: operationSessionStoreEntry.sessionKey,
		sessionId: operationSessionStoreEntry.entry.sessionId,
		storePath: operationSessionStoreEntry.storePath
	} : void 0;
	const sessionKeysMatch = (left, right) => Boolean(left && right && normalizeExplicitSessionKey(left, ctx) === normalizeExplicitSessionKey(right, ctx));
	const notePreparedSession = (binding) => {
		if (sessionKeysMatch(binding.sessionKey, sessionStoreEntry.sessionKey)) preparedSessionBinding = binding;
		if (sessionKeysMatch(binding.sessionKey, operationSessionStoreEntry.sessionKey)) preparedOperationSessionBinding = binding;
		params.replyOptions?.onSessionPrepared?.(binding);
	};
	const resolveOperationExpectedSessionId = () => preparedOperationSessionBinding?.sessionId ?? operationSessionStoreEntry.entry?.sessionId;
	const resolvePreparedTranscriptBinding = (mirrorSessionKey) => {
		if (!preparedSessionBinding || !sessionKeysMatch(mirrorSessionKey, preparedSessionBinding.sessionKey)) return;
		return preparedSessionBinding;
	};
	const sessionAgentId = resolveSessionAgentId({
		sessionKey: acpDispatchSessionKey,
		config: cfg,
		fallbackAgentId: ctx.AgentId
	});
	const sessionAgentCfg = resolveAgentConfig(cfg, sessionAgentId);
	const verboseProgress = createShouldEmitVerboseProgress({
		agentId: sessionAgentId,
		sessionKey: acpDispatchSessionKey,
		storePath: sessionStoreEntry.storePath,
		initialExplicitLevel: sessionStoreEntry.entry?.verboseLevel,
		fallbackLevel: normalizeVerboseLevel(sessionStoreEntry.entry?.verboseLevel ?? sessionAgentCfg?.verboseDefault ?? cfg.agents?.defaults?.verboseDefault ?? "") ?? "off"
	});
	const shouldEmitVerboseProgress = verboseProgress.shouldEmit;
	const shouldEmitFullVerboseProgress = verboseProgress.shouldEmitFull;
	const replyRoute = resolveEffectiveReplyRoute({
		ctx,
		entry: sessionStoreEntry.entry
	});
	const routeThreadId = resolveRoutedDeliveryThreadId({
		ctx,
		sessionKey: acpDispatchSessionKey
	});
	const routeReplyThreadId = replyRoute.threadId ?? routeThreadId;
	const inboundAudio = hasInboundAudio(ctx);
	const sessionTtsAuto = normalizeTtsAutoMode(sessionStoreEntry.entry?.ttsAuto);
	const workspaceDir = resolveAgentWorkspaceDir(cfg, sessionAgentId);
	const { completeDispatchReplyOperation, dispatchHookDispatcher, ensureDispatchReplyOperation, failDispatchReplyOperation, getDispatchAbortOperation, getDispatchAbortSignal, getDispatchReplyOperation, getObservedReplyDelivery, getPreDispatchAbortSignal, getReplyOptions, isDispatchOperationAborted, isPreDispatchOperationAborted, markObservedReplyDelivery, releasePreDispatchLifecycleAdmission, runWithDispatchLifecycleAdmission, throwIfDispatchOperationAborted, trackDispatchLifecycleWork, turnLedger } = createDispatchReplyOperationCoordinator({
		ctx,
		dispatcher,
		dispatchOperationSessionKey,
		initialDispatchReplyOperation,
		messageAuditTerminal,
		operationSessionStoreEntry,
		replyOptions: params.replyOptions,
		resolveOperationExpectedSessionId,
		routeThreadId
	});
	const maybeApplyTtsWithFinalizationLease = createFinalizationAwareTtsPayloadApplier({
		getReplyOperation: getDispatchReplyOperation,
		hasInboundAudio: () => inboundAudio || getDispatchReplyOperation()?.acceptedSteeredInboundAudio === true
	});
	const { loadAgentRuntimePluginRegistryHandle } = await traceReplyPhase("reply.load_runtime_plugins", loadRuntimePlugins);
	const pluginRegistry = await traceReplyPhase("reply.load_runtime_plugin_registry_handle", () => loadAgentRuntimePluginRegistryHandle({
		config: cfg,
		workspaceDir,
		allowGatewaySubagentBinding: true
	}));
	return await withPluginRuntimeRegistryScope(pluginRegistry, async () => {
		const hookRunner = getGlobalHookRunner();
		const timestamp = typeof ctx.Timestamp === "number" && Number.isFinite(ctx.Timestamp) ? ctx.Timestamp : void 0;
		const messageIdForHook = ctx.MessageSidFull ?? ctx.MessageSid ?? ctx.MessageSidFirst ?? ctx.MessageSidLast;
		const hookCtx = { ...ctx };
		const buildHookState = (sourceCtx) => {
			const nextHookContext = deriveInboundMessageHookContext(sourceCtx, { messageId: messageIdForHook });
			const inboundClaim = toPluginInboundClaimPair(nextHookContext, {
				commandAuthorized: typeof ctx.CommandAuthorized === "boolean" ? ctx.CommandAuthorized : void 0,
				wasMentioned: typeof ctx.WasMentioned === "boolean" ? ctx.WasMentioned : void 0
			});
			return {
				hookContext: nextHookContext,
				inboundClaimContext: inboundClaim.context,
				inboundClaimEvent: inboundClaim.event
			};
		};
		const hookState = buildHookState(hookCtx);
		const { isGroup, groupId } = hookState.hookContext;
		let hookMediaPrepared = false;
		let hookMediaMetadataStaged = false;
		const prepareHookMediaMetadata = async () => {
			if (hookMediaPrepared) return;
			hookMediaPrepared = true;
			if (await traceReplyPhase("reply.stage_remote_media_for_dispatch", () => stageRemoteInboundMediaIfNeeded({
				ctx: hookCtx,
				cfg,
				sessionKey: acpDispatchSessionKey,
				workspaceDir,
				remoteMediaMode: "cache"
			}))) {
				hookMediaMetadataStaged = true;
				Object.assign(hookState, buildHookState(hookCtx));
			}
		};
		const buildMessageReceivedHookContext = () => {
			const mediaRemoteHost = normalizeOptionalString(ctx.MediaRemoteHost);
			const { hookContext } = hookState;
			const hasUnstagedRemoteMediaMetadata = Boolean(hookContext.media?.length);
			if (hookMediaMetadataStaged || !mediaRemoteHost || !hasUnstagedRemoteMediaMetadata) return hookContext;
			const messageReceivedCtx = { ...hookCtx };
			stripLegacyMediaContextFields(messageReceivedCtx);
			delete messageReceivedCtx.media;
			return {
				...buildHookState(messageReceivedCtx).hookContext,
				mediaRemoteHost,
				mediaStagingPending: true,
				originalMedia: hookContext.media?.map((entry) => ({ ...entry })),
				originalMediaPath: hookContext.mediaPath,
				originalMediaUrl: hookContext.mediaUrl,
				originalMediaType: hookContext.mediaType,
				originalMediaPaths: hookContext.mediaPaths,
				originalMediaUrls: hookContext.mediaUrls,
				originalMediaTypes: hookContext.mediaTypes
			};
		};
		return {
			status: "ready",
			state: extendPreparedDispatchState(state, {
				ctx,
				cfg,
				dispatcher,
				sessionKey,
				traceReplyPhase,
				recordProcessed,
				recordAgentDispatchStarted,
				recordAgentDispatchCompleted,
				markProcessing,
				markIdle,
				markInboundDedupeReplayUnsafe,
				acpDispatchSessionKey,
				markProgress,
				sessionStoreEntry,
				notePreparedSession,
				resolvePreparedTranscriptBinding,
				sessionAgentId,
				shouldEmitVerboseProgress,
				shouldEmitFullVerboseProgress,
				replyRoute,
				routeReplyThreadId,
				inboundAudio,
				sessionTtsAuto,
				workspaceDir,
				pluginRegistry,
				replyOperationRunState,
				completeDispatchReplyOperation,
				dispatchHookDispatcher,
				ensureDispatchReplyOperation,
				failDispatchReplyOperation,
				getDispatchAbortOperation,
				getDispatchAbortSignal,
				getDispatchReplyOperation,
				getObservedReplyDelivery,
				getPreDispatchAbortSignal,
				getReplyOptions,
				isDispatchOperationAborted,
				isPreDispatchOperationAborted,
				markObservedReplyDelivery,
				releasePreDispatchLifecycleAdmission,
				runWithDispatchLifecycleAdmission,
				throwIfDispatchOperationAborted,
				trackDispatchLifecycleWork,
				turnLedger,
				maybeApplyTtsWithFinalizationLease,
				hookRunner,
				timestamp,
				messageIdForHook,
				isGroup,
				groupId,
				hookState,
				prepareHookMediaMetadata,
				buildMessageReceivedHookContext
			})
		};
	});
}
//#endregion
//#region src/auto-reply/reply/conversation-turn-capture.ts
const EPOCH_MILLISECONDS_THRESHOLD = 0xe8d4a51000;
const CONVERSATION_TURN_REPLY_CUSTOM_TYPE = "openclaw.conversation-turn-reply";
function readPersistedReplyText(message) {
	const content = message?.content;
	if (typeof content === "string") return normalizeOptionalString(content);
	if (!Array.isArray(content)) return;
	return normalizeOptionalString(content.flatMap((part) => {
		if (!part || typeof part !== "object") return [];
		const record = part;
		return record.type === "text" && typeof record.text === "string" ? [record.text] : [];
	}).join("\n"));
}
function normalizeTimestamp(value) {
	const timestamp = typeof value === "number" && Number.isFinite(value) ? value : void 0;
	if (timestamp === void 0 || timestamp <= 0) return;
	return asDateTimestampMs(timestamp < EPOCH_MILLISECONDS_THRESHOLD ? Math.trunc(timestamp * 1e3) : timestamp);
}
async function capturePendingConversationTurnReplyUnsafe(params) {
	if (params.ctx.InboundAccessAuthorized !== true) return false;
	const sessionKey = normalizeOptionalString(params.ctx.SessionKey);
	const messageId = normalizeOptionalString(params.ctx.MessageSidFull) ?? normalizeOptionalString(params.ctx.MessageSid) ?? normalizeOptionalString(params.ctx.MessageSidFirst) ?? normalizeOptionalString(params.ctx.MessageSidLast);
	const replyText = normalizeOptionalString(params.ctx.agentText);
	if (!sessionKey || !messageId || !replyText) return false;
	const conversation = conversationIdentityFromMsgContext({ ctx: params.ctx });
	if (!conversation) return false;
	const replyToId = normalizeOptionalString(params.ctx.ReplyToIdFull) ?? normalizeOptionalString(params.ctx.ReplyToId);
	const threadId = params.ctx.MessageThreadId == null ? void 0 : normalizeOptionalString(String(params.ctx.MessageThreadId));
	const agentId = normalizeOptionalString(params.ctx.AgentId) ?? resolveAgentIdFromSessionKey(sessionKey);
	const storePath = resolveStorePath(params.cfg.session?.store, { agentId });
	const sessionEntry = loadSqliteSessionEntryReadOnly({
		agentId,
		sessionKey,
		storePath,
		readConsistency: "latest"
	});
	if (!sessionEntry) return false;
	const timestamp = normalizeTimestamp(params.ctx.Timestamp);
	const parentConversationRef = threadId ? conversation.parentConversationRef ?? buildConversationRef({
		channel: conversation.channel,
		accountId: conversation.accountId,
		kind: conversation.kind,
		peerId: conversation.peerId
	}) : void 0;
	const input = {
		text: replyText,
		timestamp,
		idempotencyKey: `conversation-inbound:${conversation.conversationRef}:${messageId}`,
		...params.ctx.InputProvenance ? { provenance: params.ctx.InputProvenance } : {},
		transport: {
			channel: conversation.channel,
			conversationRef: conversation.conversationRef,
			messageId,
			...replyToId ? { replyToId } : {},
			...threadId ? { threadId } : {}
		},
		sender: conversation.kind === "group" || conversation.kind === "channel" ? {
			id: normalizeOptionalString(params.ctx.SenderId),
			name: normalizeOptionalString(params.ctx.SenderName),
			username: normalizeOptionalString(params.ctx.SenderUsername)
		} : void 0
	};
	const claim = await claimPendingConversationTurnReply({
		agentId,
		conversationRef: conversation.conversationRef,
		...parentConversationRef ? { parentConversationRef } : {},
		sessionId: sessionEntry.sessionId,
		messageId,
		replyToId,
		threadId,
		text: replyText,
		timestamp
	});
	if (!claim) {
		if (replyToId) {
			const operation = findConversationTurnDeliveryByReplyTarget({
				agentId,
				storePath
			}, {
				conversationRef: conversation.conversationRef,
				replyToId
			}) ?? (parentConversationRef && parentConversationRef !== conversation.conversationRef ? findConversationTurnDeliveryByReplyTarget({
				agentId,
				storePath
			}, {
				conversationRef: parentConversationRef,
				replyToId
			}) : void 0);
			if (operation?.status === "replied" && operation.reply?.messageId === messageId) return true;
			if (operation && operation.status !== "replied") markConversationDeliverySent({
				agentId,
				storePath
			}, operation.operationId, replyToId);
		}
		return false;
	}
	try {
		if (sessionEntry.sessionId !== claim.sessionId) throw new Error(`session changed before captured reply persistence: ${sessionKey}`);
		const prepared = preparePersistedUserTurnMessageForTranscriptWrite(buildPersistedUserTurnMessage(input), {
			agentId,
			sessionKey,
			beforeMessageWrite: runAgentHarnessBeforeMessageWriteHook
		});
		if (!prepared) throw new Error("captured conversation turn reply was blocked before persistence");
		const persistedMessage = redactTranscriptMessage(prepared, params.cfg);
		const persistedReplyText = readPersistedReplyText(persistedMessage);
		if (!persistedReplyText) throw new Error("captured conversation turn reply has no persistable text");
		const artifactId = `conversation-turn-reply-${claim.turnId}`;
		markConversationDeliveryReplied({
			agentId,
			storePath
		}, {
			operationId: claim.turnId,
			reply: {
				messageId,
				...replyToId ? { replyToId } : {},
				...threadId ? { threadId } : {},
				text: persistedReplyText,
				timestamp: timestamp ?? Date.now()
			}
		});
		let persisted = false;
		try {
			persisted = appendSqliteTranscriptEventSync({
				agentId,
				sessionId: sessionEntry.sessionId,
				sessionKey,
				storePath
			}, {
				type: "custom",
				id: artifactId,
				customType: CONVERSATION_TURN_REPLY_CUSTOM_TYPE,
				appendMode: "side",
				timestamp: timestamp ?? Date.now(),
				data: {
					turnId: claim.turnId,
					conversationRef: conversation.conversationRef,
					messageId,
					...replyToId ? { replyToId } : {},
					...threadId ? { threadId } : {},
					message: persistedMessage
				}
			});
		} catch (error) {
			logVerbose(`captured conversation turn reply audit persistence failed: ${String(error)}`);
		}
		if (!persisted) logVerbose("captured conversation turn reply audit artifact was not persisted");
		claim.complete(persisted ? { transcriptArtifactId: artifactId } : void 0);
		return true;
	} catch (error) {
		claim.release();
		logVerbose(`conversation turn reply capture failed: ${String(error)}`);
		return false;
	}
}
/** Consumes a correlated channel reply before it can start a second local agent turn. */
async function capturePendingConversationTurnReply(params) {
	try {
		return await capturePendingConversationTurnReplyUnsafe(params);
	} catch (error) {
		logVerbose(`conversation turn reply capture unavailable: ${String(error)}`);
		return false;
	}
}
//#endregion
//#region src/auto-reply/reply/inbound-dedupe.ts
const DEFAULT_INBOUND_DEDUPE_TTL_MS = 20 * 6e4;
const DEFAULT_INBOUND_DEDUPE_MAX = 5e3;
/**
* Keep inbound dedupe shared across bundled chunks so the same provider
* message cannot bypass dedupe by entering through a different chunk copy.
*/
const INBOUND_DEDUPE_CACHE_KEY = Symbol.for("openclaw.inboundDedupeCache");
const INBOUND_DEDUPE_INFLIGHT_KEY = Symbol.for("openclaw.inboundDedupeInflight");
const inboundDedupeCache = resolveGlobalDedupeCache(INBOUND_DEDUPE_CACHE_KEY, {
	ttlMs: DEFAULT_INBOUND_DEDUPE_TTL_MS,
	maxSize: DEFAULT_INBOUND_DEDUPE_MAX
});
const inboundDedupeInFlight = resolveGlobalSingleton(INBOUND_DEDUPE_INFLIGHT_KEY, () => /* @__PURE__ */ new Set());
const resolveInboundPeerId = (ctx) => ctx.OriginatingTo ?? ctx.To ?? ctx.From ?? ctx.SessionKey;
function resolveInboundDedupeSessionScope(ctx) {
	const sessionKey = resolveCommandTurnTargetSessionKey(ctx) || normalizeOptionalString(ctx.SessionKey) || "";
	if (!sessionKey) return "";
	const parsed = parseAgentSessionKey(sessionKey);
	if (!parsed) return sessionKey;
	return `agent:${parsed.agentId}`;
}
function buildInboundDedupeKey(ctx) {
	const provider = normalizeOptionalLowercaseString(ctx.OriginatingChannel ?? ctx.Provider ?? ctx.Surface) || "";
	const messageId = normalizeOptionalString(ctx.MessageSid);
	if (!provider || !messageId) return null;
	const peerId = resolveInboundPeerId(ctx);
	if (!peerId) return null;
	const sessionScope = resolveInboundDedupeSessionScope(ctx);
	const routeKey = channelRouteDedupeKey({
		channel: provider,
		to: peerId,
		accountId: normalizeOptionalString(ctx.AccountId) ?? "",
		threadId: ctx.MessageThreadId
	});
	return JSON.stringify([
		sessionScope,
		routeKey,
		messageId
	]);
}
function claimInboundDedupe(ctx, opts) {
	const key = buildInboundDedupeKey(ctx);
	if (!key) return { status: "invalid" };
	if ((opts?.cache ?? inboundDedupeCache).peek(key, opts?.now)) return {
		status: "duplicate",
		key
	};
	const inFlight = opts?.inFlight ?? inboundDedupeInFlight;
	if (inFlight.has(key)) return {
		status: "inflight",
		key
	};
	inFlight.add(key);
	return {
		status: "claimed",
		key
	};
}
function commitInboundDedupe(key, opts) {
	(opts?.cache ?? inboundDedupeCache).check(key, opts?.now);
	(opts?.inFlight ?? inboundDedupeInFlight).delete(key);
}
function releaseInboundDedupe(key, opts) {
	(opts?.inFlight ?? inboundDedupeInFlight).delete(key);
}
function resetInboundDedupe() {
	inboundDedupeCache.clear();
	inboundDedupeInFlight.clear();
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.prepare-context.ts
async function prepareDispatchOperationContext(state) {
	const { acpDispatchSessionKey, buildMessageReceivedHookContext, cfg, ctx, dispatcher, hookRunner, isInternalWebchatTurn, markIdle, params, recordAgentDispatchCompleted, recordProcessed, replyRoute, sessionAgentId, sessionKey, sessionStoreEntry } = state;
	const sendBindingNotice = async (payload, mode, transcriptOwner) => {
		if (suppressAutomaticSourceDelivery) return false;
		return await state.deliverBindingPayload(payload, mode, transcriptOwner);
	};
	const pluginBindingConversation = resolveConversationBindingContextFromMessage({
		cfg,
		ctx
	});
	const pluginOwnedBindingRecord = pluginBindingConversation ? resolveConversationBindingRecord({
		channel: pluginBindingConversation.channel,
		accountId: pluginBindingConversation.accountId,
		conversationId: pluginBindingConversation.conversationId,
		parentConversationId: pluginBindingConversation.parentConversationId
	}) : null;
	const pluginOwnedBinding = isPluginOwnedSessionBindingRecord(pluginOwnedBindingRecord) ? toPluginConversationBinding(pluginOwnedBindingRecord) : null;
	const pluginBindingSessionKey = normalizeOptionalString(pluginOwnedBindingRecord?.targetSessionKey);
	const persistPluginBindingUserTurn = async () => {
		const recorder = params.replyOptions?.userTurnTranscriptRecorder;
		if (!recorder || !pluginBindingSessionKey) return;
		const targetAgentId = resolveSessionAgentId({
			sessionKey: pluginBindingSessionKey,
			config: cfg,
			fallbackAgentId: ctx.AgentId
		});
		const blockedOwner = (expectedSessionId) => ({
			agentId: targetAgentId,
			sessionKey: pluginBindingSessionKey,
			...expectedSessionId ? { expectedSessionId } : {},
			transcriptWriteBlocked: true
		});
		if (recorder.hasPersisted()) return blockedOwner();
		let attemptedSessionId;
		let lastOwner;
		for (let attempt = 0; attempt < 2; attempt += 1) {
			const targetSessionStoreEntry = resolveSessionStoreLookup({
				...ctx,
				CommandTargetSessionKey: void 0,
				SessionKey: pluginBindingSessionKey
			}, cfg);
			const targetSessionEntry = targetSessionStoreEntry.entry;
			if (!targetSessionEntry || targetSessionEntry.sessionId === attemptedSessionId) break;
			attemptedSessionId = targetSessionEntry.sessionId;
			lastOwner = {
				agentId: targetAgentId,
				expectedSessionId: targetSessionEntry.sessionId,
				sessionKey: pluginBindingSessionKey
			};
			if (await recorder.persistApproved({
				target: {
					sessionId: targetSessionEntry.sessionId,
					sessionKey: pluginBindingSessionKey,
					sessionEntry: targetSessionEntry,
					...targetSessionStoreEntry.store ? { sessionStore: targetSessionStoreEntry.store } : {},
					storePath: targetSessionStoreEntry.storePath,
					agentId: targetAgentId,
					cwd: resolveAgentWorkspaceDir(cfg, targetAgentId),
					config: cfg
				},
				expectedSessionId: targetSessionEntry.sessionId,
				retryIfUnpersisted: true
			})) return lastOwner;
		}
		if (!lastOwner) {
			recorder.markBlocked();
			return blockedOwner();
		}
		recorder.markBlocked();
		logVerbose(`plugin-bound user-turn persistence skipped after the target session changed`);
		return blockedOwner(lastOwner.expectedSessionId);
	};
	const sendPolicy = resolveSendPolicy({
		cfg,
		entry: sessionStoreEntry.entry,
		sessionKey: sessionStoreEntry.sessionKey ?? sessionKey,
		channel: (state.shouldRouteToOriginating ? state.routeReplyChannel : void 0) ?? sessionDeliveryChannel(sessionStoreEntry.entry) ?? replyRoute.channel ?? ctx.Surface ?? ctx.Provider ?? void 0,
		chatType: sessionStoreEntry.entry?.chatType
	});
	const { globalPolicy, globalProviderPolicy, agentPolicy, agentProviderPolicy, profile, providerProfile, profileAlsoAllow, providerProfileAlsoAllow } = resolveEffectiveToolPolicy({
		config: cfg,
		sessionKey: acpDispatchSessionKey,
		agentId: sessionAgentId
	});
	const chatType = normalizeChatType(ctx.ChatType);
	const silentReplyConversationType = resolveRoutedPolicyConversationType(ctx);
	const silentReplySurface = normalizeLowercaseStringOrEmpty(ctx.Surface ?? ctx.Provider);
	const emptyFinalAllowedAsSilent = ctx.WasMentioned !== true && silentReplyConversationType !== void 0 && resolveSilentReplyPolicyFromPolicies({
		conversationType: silentReplyConversationType,
		defaultPolicy: cfg.agents?.defaults?.silentReply,
		surfacePolicy: silentReplySurface ? cfg.surfaces?.[silentReplySurface]?.silentReply : void 0
	}) === "allow";
	const configuredVisibleReplies = chatType === "group" || chatType === "channel" ? cfg.messages?.groupChat?.visibleReplies ?? cfg.messages?.visibleReplies : cfg.messages?.visibleReplies;
	const harnessDefaultVisibleReplies = configuredVisibleReplies === void 0 && chatType !== "group" && chatType !== "channel" ? resolveHarnessSourceVisibleRepliesDefault({
		cfg,
		ctx,
		entry: sessionStoreEntry.entry,
		sessionAgentId,
		sessionKey: acpDispatchSessionKey,
		sessionStore: sessionStoreEntry.store,
		turnModelOverride: resolveTurnModelOverride(params.replyOptions)
	}) : void 0;
	const effectiveVisibleReplies = configuredVisibleReplies ?? harnessDefaultVisibleReplies;
	const runtimeProfileAlsoAllow = params.replyOptions?.sourceReplyDeliveryMode === "message_tool_only" || ctx.InboundEventKind === "room_event" && !isInternalWebchatTurn || params.replyOptions?.sourceReplyDeliveryMode === void 0 && !isExplicitSourceReplyCommand(ctx, cfg) && (configuredVisibleReplies === "message_tool" || !isInternalWebchatTurn && effectiveVisibleReplies === "message_tool") ? ["message"] : [];
	const profilePolicy = mergeAlsoAllowPolicy(resolveToolProfilePolicy(profile), [...profileAlsoAllow ?? [], ...runtimeProfileAlsoAllow]);
	const providerProfilePolicy = mergeAlsoAllowPolicy(resolveToolProfilePolicy(providerProfile), [...providerProfileAlsoAllow ?? [], ...runtimeProfileAlsoAllow]);
	const groupResolution = resolveGroupSessionKey(ctx);
	const groupPolicy = resolveGroupToolPolicy({
		config: cfg,
		sessionKey: acpDispatchSessionKey,
		messageProvider: resolveOriginMessageProvider({
			originatingChannel: ctx.OriginatingChannel,
			provider: ctx.Provider ?? ctx.Surface
		}),
		groupId: groupResolution?.id,
		groupChannel: normalizeOptionalString(ctx.GroupChannel) ?? normalizeOptionalString(ctx.GroupSubject),
		groupSpace: normalizeOptionalString(ctx.GroupSpace),
		accountId: ctx.AccountId,
		senderId: normalizeOptionalString(ctx.SenderId),
		senderName: normalizeOptionalString(ctx.SenderName),
		senderUsername: normalizeOptionalString(ctx.SenderUsername),
		senderE164: normalizeOptionalString(ctx.SenderE164)
	});
	const subagentStore = resolveSubagentCapabilityStore(acpDispatchSessionKey, { cfg });
	const messageToolAvailable = isToolAllowedByPolicies("message", [
		profilePolicy,
		providerProfilePolicy,
		globalProviderPolicy,
		agentProviderPolicy,
		globalPolicy,
		agentPolicy,
		groupPolicy,
		acpDispatchSessionKey && isSubagentEnvelopeSession(acpDispatchSessionKey, {
			cfg,
			store: subagentStore
		}) ? resolveSubagentToolPolicyForSession(cfg, acpDispatchSessionKey, { store: subagentStore }) : void 0,
		resolveInheritedToolPolicyForSession(cfg, acpDispatchSessionKey, { store: subagentStore })
	]);
	const sourceReplyPolicy = resolveSourceReplyVisibilityPolicy({
		cfg,
		ctx,
		requested: params.replyOptions?.sourceReplyDeliveryMode,
		strictMessageToolOnly: ctx.InboundEventKind === "room_event" && !isInternalWebchatTurn,
		sendPolicy,
		suppressAcpChildUserDelivery: state.suppressAcpChildUserDelivery,
		explicitSuppressTyping: params.replyOptions?.suppressTyping === true,
		shouldSuppressTyping: state.shouldSuppressTyping,
		messageToolAvailable,
		defaultVisibleReplies: harnessDefaultVisibleReplies
	});
	const { sourceReplyDeliveryMode, sessionStableSourceReplyDeliveryMode, suppressAutomaticSourceDelivery, suppressDelivery, sendPolicyDenied, deliverySuppressionReason, suppressHookUserDelivery, suppressHookReplyLifecycle } = sourceReplyPolicy;
	const reasoningPayloadsEnabled = params.replyOptions?.reasoningPayloadsEnabled === true;
	const commentaryPayloadsEnabled = params.replyOptions?.commentaryPayloadsEnabled === true;
	const attachSourceReplyDeliveryMode = (result) => sourceReplyDeliveryMode === "message_tool_only" || sendPolicyDenied ? {
		...result,
		...sourceReplyDeliveryMode === "message_tool_only" ? { sourceReplyDeliveryMode } : {},
		...sendPolicyDenied ? { sendPolicyDenied: true } : {}
	} : result;
	const explicitCommandTurnCtx = isExplicitSourceReplyCommand(ctx, cfg);
	const unauthorizedTextSlashSourceReplyCtx = (chatType === "group" || chatType === "channel") && isUnauthorizedTextSlashCommand(ctx);
	const noVisibleReplyFallbackDirected = explicitCommandTurnCtx || ctx.InboundEventKind !== "room_event" && (chatType === "direct" || ctx.WasMentioned === true);
	const shouldDeliverPluginBindingReply = !suppressAutomaticSourceDelivery || explicitCommandTurnCtx || ctx.InboundEventKind !== "room_event" && !unauthorizedTextSlashSourceReplyCtx;
	const durableSourceTurnId = readChannelSourceTurnId(ctx) ?? (shouldMintChannelSourceTurnId(ctx.Provider ?? ctx.Surface) ? buildChannelSourceTurnId({
		provider: resolveOriginMessageProvider({
			originatingChannel: replyRoute.channel,
			provider: ctx.Provider ?? ctx.Surface
		}),
		accountId: replyRoute.accountId,
		conversationId: replyRoute.to,
		messageId: normalizeOptionalString(ctx.MessageSidFull) ?? normalizeOptionalString(ctx.MessageSid)
	}) : void 0);
	setChannelSourceTurnId(ctx, durableSourceTurnId);
	if (isDuplicateRestartRecoverySource(sessionStoreEntry.entry, durableSourceTurnId)) {
		recordProcessed("skipped", { reason: "duplicate" });
		return {
			status: "complete",
			result: attachSourceReplyDeliveryMode({
				queuedFinal: false,
				counts: dispatcher.getQueuedCounts()
			})
		};
	}
	const inboundDedupeClaim = claimInboundDedupe(ctx);
	if (inboundDedupeClaim.status === "duplicate" || inboundDedupeClaim.status === "inflight") {
		recordProcessed("skipped", { reason: "duplicate" });
		return {
			status: "complete",
			result: attachSourceReplyDeliveryMode({
				queuedFinal: false,
				counts: dispatcher.getQueuedCounts()
			})
		};
	}
	const commitInboundDedupeIfClaimed = () => {
		if (inboundDedupeClaim.status === "claimed") commitInboundDedupe(inboundDedupeClaim.key);
	};
	const releaseInboundDedupeIfClaimed = () => {
		if (inboundDedupeClaim.status === "claimed") releaseInboundDedupe(inboundDedupeClaim.key);
	};
	const finishReplyOperationBusyDispatch = (opts) => {
		state.releasePreDispatchLifecycleAdmission(() => waitForReplyDispatcherIdle(dispatcher));
		if (opts?.recordAgentDispatchCompleted) recordAgentDispatchCompleted("completed", { reason: "reply-operation-active" });
		recordProcessed("skipped", { reason: "reply-operation-active" });
		markIdle("message_completed");
		if (opts?.dedupeDisposition === "release") releaseInboundDedupeIfClaimed();
		else commitInboundDedupeIfClaimed();
		return attachSourceReplyDeliveryMode({
			queuedFinal: false,
			counts: dispatcher.getQueuedCounts(),
			...opts?.sessionMetadataChanges ? { sessionMetadataChanges: opts.sessionMetadataChanges } : {}
		});
	};
	const finishReplyOperationAbortedDispatch = () => {
		const operation = state.getDispatchReplyOperation();
		const queuedFinal = operation?.result?.kind === "failed" && operation.result.code === "run_stalled" && (operation.staleExpiryReason === "no_activity" || operation.staleExpiryReason === "stuck_recovery") ? dispatcher.sendFinalReply({
			text: "⚠️ This turn was interrupted because it stopped making progress. Please try again.",
			isError: true
		}) : false;
		commitInboundDedupeIfClaimed();
		recordProcessed("completed", { reason: "reply_operation_aborted" });
		markIdle("message_completed");
		state.completeDispatchReplyOperation();
		return attachSourceReplyDeliveryMode({
			queuedFinal,
			counts: dispatcher.getQueuedCounts()
		});
	};
	const bindingState = {};
	const emitMessageReceivedHooks = () => {
		if (ctx.SuppressMessageReceivedHooks !== true && hookRunner?.hasHooks("message_received") === true) {
			const messageReceivedHookContext = buildMessageReceivedHookContext();
			fireAndForgetHook(hookRunner.runMessageReceived(toPluginMessageReceivedEvent(messageReceivedHookContext), toPluginMessageContext(messageReceivedHookContext)), "dispatch-from-config: message_received plugin hook failed");
		}
		if (ctx.SuppressMessageReceivedHooks !== true && sessionKey) {
			const messageReceivedHookContext = buildMessageReceivedHookContext();
			fireAndForgetHook(triggerInternalHook(createInternalHookEvent("message", "received", sessionKey, {
				...toInternalMessageReceivedContext(messageReceivedHookContext),
				timestamp: state.timestamp
			})), "dispatch-from-config: message_received internal hook failed");
		}
	};
	state.markProcessing();
	if (await capturePendingConversationTurnReply({
		cfg,
		ctx
	})) {
		emitMessageReceivedHooks();
		commitInboundDedupeIfClaimed();
		recordProcessed("completed", { reason: "conversation-turn-reply" });
		markIdle("message_completed");
		return {
			status: "complete",
			result: attachSourceReplyDeliveryMode({
				queuedFinal: false,
				counts: dispatcher.getQueuedCounts(),
				observedReplyDelivery: true
			})
		};
	}
	return {
		status: "ready",
		state: extendPreparedDispatchState(state, {
			sendBindingNotice,
			pluginOwnedBinding,
			persistPluginBindingUserTurn,
			sendPolicy,
			chatType,
			emptyFinalAllowedAsSilent,
			noVisibleReplyFallbackDirected,
			sourceReplyPolicy,
			sourceReplyDeliveryMode,
			sessionStableSourceReplyDeliveryMode,
			suppressAutomaticSourceDelivery,
			suppressDelivery,
			sendPolicyDenied,
			deliverySuppressionReason,
			suppressHookUserDelivery,
			suppressHookReplyLifecycle,
			reasoningPayloadsEnabled,
			commentaryPayloadsEnabled,
			attachSourceReplyDeliveryMode,
			explicitCommandTurnCtx,
			shouldDeliverPluginBindingReply,
			inboundDedupeClaim,
			commitInboundDedupeIfClaimed,
			finishReplyOperationBusyDispatch,
			finishReplyOperationAbortedDispatch,
			emitMessageReceivedHooks,
			bindingState
		})
	};
}
//#endregion
//#region src/auto-reply/reply/routing-policy.ts
/** Resolves whether replies should route to the originating channel or current surface. */
/** Computes source-routing and typing suppression for a reply turn. */
function resolveReplyRoutingDecision(params) {
	const originatingChannel = normalizeMessageChannel(params.originatingChannel);
	const providerChannel = normalizeMessageChannel(params.provider);
	const surfaceChannel = normalizeMessageChannel(params.surface);
	const currentSurface = providerChannel ?? surfaceChannel;
	const isInternalWebchatTurn = currentSurface === "webchat" && (surfaceChannel === "webchat" || !surfaceChannel) && params.explicitDeliverRoute !== true;
	const shouldRouteToOriginating = Boolean(!params.suppressDirectUserDelivery && !isInternalWebchatTurn && params.isRoutableChannel(originatingChannel) && params.originatingTo && originatingChannel !== currentSurface);
	return {
		originatingChannel,
		currentSurface,
		isInternalWebchatTurn,
		shouldRouteToOriginating,
		shouldSuppressTyping: params.suppressDirectUserDelivery === true || shouldRouteToOriginating || originatingChannel === "webchat"
	};
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.prepare-delivery.ts
async function prepareDispatchDelivery(state) {
	const { cfg, ctx, groupId, markInboundDedupeReplayUnsafe, replyRoute, sessionStoreEntry, turnLedger } = state;
	const sessionAcpMeta = sessionStoreEntry.sessionKey ? readAcpSessionMeta({ sessionKey: sessionStoreEntry.sessionKey }) : void 0;
	const suppressAcpChildUserDelivery = isParentOwnedBackgroundAcpSession(sessionAcpMeta && sessionStoreEntry.entry ? {
		...sessionStoreEntry.entry,
		acp: sessionAcpMeta
	} : sessionStoreEntry.entry);
	const normalizedRouteReplyChannel = normalizeMessageChannel(replyRoute.channel);
	const normalizedProviderChannel = normalizeMessageChannel(ctx.Provider);
	const normalizedSurfaceChannel = normalizeMessageChannel(ctx.Surface);
	const normalizedCurrentSurface = normalizedProviderChannel ?? normalizedSurfaceChannel;
	const effectiveExplicitDeliverRoute = ctx.ExplicitDeliverRoute === true || replyRoute.inheritedExternalRoute === true;
	const isInternalWebchatTurn = normalizedCurrentSurface === "webchat" && (normalizedSurfaceChannel === "webchat" || !normalizedSurfaceChannel) && !effectiveExplicitDeliverRoute;
	const routeReplyRuntime = Boolean(!suppressAcpChildUserDelivery && !isInternalWebchatTurn && normalizedRouteReplyChannel && replyRoute.to && normalizedRouteReplyChannel !== normalizedCurrentSurface) ? await loadRouteReplyRuntime() : void 0;
	const { originatingChannel: routeReplyChannel, currentSurface, shouldRouteToOriginating, shouldSuppressTyping } = resolveReplyRoutingDecision({
		provider: ctx.Provider,
		surface: ctx.Surface,
		explicitDeliverRoute: effectiveExplicitDeliverRoute,
		originatingChannel: replyRoute.channel,
		originatingTo: replyRoute.to,
		suppressDirectUserDelivery: suppressAcpChildUserDelivery,
		isRoutableChannel: routeReplyRuntime?.isRoutableChannel ?? (() => false)
	});
	const routeReplyTo = replyRoute.to;
	const deliveryChannel = shouldRouteToOriginating ? routeReplyChannel : currentSurface;
	const shouldPrepareRoutedReplyDelivery = shouldRouteToOriginating && Boolean(routeReplyChannel);
	const replyContextAccountId = routeReplyChannel ? resolveReplyDeliveryAccountId(cfg, routeReplyChannel, replyRoute.accountId) : void 0;
	const routedReplyAccountId = shouldPrepareRoutedReplyDelivery ? replyContextAccountId : void 0;
	const routedReplyDelivery = shouldPrepareRoutedReplyDelivery ? createReplyDeliveryContext(resolveReplyToMode(cfg, routeReplyChannel, routedReplyAccountId, replyRoute.chatType), replyRoute.chatType) : void 0;
	let normalizeReplyMediaPaths;
	const getNormalizeReplyMediaPaths = async () => {
		if (normalizeReplyMediaPaths) return normalizeReplyMediaPaths;
		const { createReplyMediaPathNormalizer } = await loadReplyMediaPathsRuntime();
		normalizeReplyMediaPaths = createReplyMediaPathNormalizer({
			cfg,
			sessionKey: state.acpDispatchSessionKey,
			workspaceDir: state.workspaceDir,
			messageProvider: deliveryChannel,
			accountId: replyContextAccountId,
			groupId,
			groupChannel: ctx.GroupChannel,
			groupSpace: ctx.GroupSpace,
			requesterSenderId: ctx.SenderId,
			requesterSenderName: ctx.SenderName,
			requesterSenderUsername: ctx.SenderUsername,
			requesterSenderE164: ctx.SenderE164
		});
		return normalizeReplyMediaPaths;
	};
	const normalizeReplyMediaPayload = async (payload) => {
		if (!resolveSendableOutboundReplyParts(payload).hasMedia) return payload;
		return await (await getNormalizeReplyMediaPaths())(payload);
	};
	const routeReplyToOriginating = async (payload, options) => {
		if (!shouldRouteToOriginating || !routeReplyChannel || !routeReplyTo || !routeReplyRuntime) return null;
		markInboundDedupeReplayUnsafe();
		const agentRuntimeSessionKey = options?.sessionKey ?? (ctx.CommandSource === "native" ? resolveCommandTurnTargetSessionKey(ctx) ?? ctx.SessionKey : ctx.SessionKey);
		const result = await routeReplyRuntime.routeReply({
			payload,
			channel: routeReplyChannel,
			to: routeReplyTo,
			sessionKey: agentRuntimeSessionKey,
			policySessionKey: options?.sessionKey ?? resolveCommandTurnTargetSessionKey(ctx) ?? ctx.SessionKey,
			policyConversationType: resolveRoutedPolicyConversationType(ctx),
			accountId: routedReplyAccountId,
			requesterSenderId: ctx.SenderId,
			requesterSenderName: ctx.SenderName,
			requesterSenderUsername: ctx.SenderUsername,
			requesterSenderE164: ctx.SenderE164,
			threadId: state.routeReplyThreadId,
			replyDelivery: routedReplyDelivery,
			cfg,
			abortSignal: options?.abortSignal,
			mirror: options?.mirror,
			isGroup: state.isGroup,
			groupId,
			replyKind: options?.kind ?? "final",
			runId: state.params.replyOptions?.runId,
			responsePrefixContext: options?.responsePrefixContext
		});
		turnLedger.recordRoutedDelivery(payload, isRoutedReplyDelivered(result));
		return result;
	};
	const isRoutedReplyDelivered = (result) => result.delivered;
	/**
	* Helper to send a payload via route-reply (async).
	* Only used when actually routing to a different provider.
	* Note: Only called when shouldRouteToOriginating is true, so
	* routeReplyChannel and routeReplyTo are guaranteed to be defined.
	*/
	const sendPayloadAsync = async (payload, abortSignal, mirror, kind = "tool") => {
		if (!routeReplyRuntime || !routeReplyChannel || !routeReplyTo) return null;
		const effectiveAbortSignal = abortSignal ?? state.getDispatchAbortSignal();
		if (effectiveAbortSignal?.aborted) return null;
		const result = await routeReplyToOriginating(payload, {
			abortSignal: effectiveAbortSignal,
			mirror,
			kind
		});
		if (result && !result.ok) logVerbose(`dispatch-from-config: route-reply failed: ${result.error ?? "unknown error"}`);
		return result;
	};
	const deliverBindingPayload = async (payload, mode, transcriptOwner) => {
		const bindingPayload = setReplyPayloadMetadata(copyReplyPayloadMetadata(payload, { ...payload }), { sourceReplyTranscriptMirror: transcriptOwner ? {
			sessionKey: transcriptOwner.sessionKey,
			agentId: transcriptOwner.agentId,
			...transcriptOwner.expectedSessionId ? { expectedSessionId: transcriptOwner.expectedSessionId } : {},
			...transcriptOwner.transcriptWriteBlocked ? { transcriptWriteBlocked: true } : {}
		} : void 0 });
		const result = await routeReplyToOriginating(bindingPayload, {
			kind: mode === "terminal" ? "final" : "tool",
			sessionKey: transcriptOwner?.sessionKey
		});
		if (result) {
			if (!result.ok) logVerbose(`dispatch-from-config: route-reply (plugin binding notice) failed: ${result.error ?? "unknown error"}`);
			return result.delivered || result.suppressed === true;
		}
		markInboundDedupeReplayUnsafe();
		return mode === "additive" ? turnLedger.sendQueued("tool", bindingPayload).queued : turnLedger.sendQueued("final", bindingPayload).queued;
	};
	return {
		status: "ready",
		state: extendPreparedDispatchState(state, {
			suppressAcpChildUserDelivery,
			normalizedCurrentSurface,
			isInternalWebchatTurn,
			routeReplyChannel,
			shouldRouteToOriginating,
			shouldSuppressTyping,
			routeReplyTo,
			deliveryChannel,
			replyContextAccountId,
			normalizeReplyMediaPayload,
			routeReplyToOriginating,
			isRoutedReplyDelivered,
			sendPayloadAsync,
			deliverBindingPayload
		})
	};
}
//#endregion
//#region src/channels/plugins/exec-approval-local.ts
function shouldSuppressLocalExecApprovalPrompt(params) {
	const channel = params.channel ? normalizeChannelId(params.channel) : null;
	if (!channel) return false;
	return getChannelPlugin(channel)?.outbound?.shouldSuppressLocalPayloadPrompt?.({
		cfg: params.cfg,
		accountId: params.accountId,
		payload: params.payload,
		hint: {
			kind: "approval-pending",
			approvalKind: "exec",
			nativeRouteActive: getGatewayNativeApprovalRuntime()?.routeCoordinator.hasActiveRuntime({
				channel,
				accountId: params.accountId,
				approvalKind: "exec"
			}) ?? hasActiveApprovalNativeRouteRuntime({
				channel,
				accountId: params.accountId,
				approvalKind: "exec"
			})
		}
	}) ?? false;
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.prepare-execution.ts
async function prepareDispatchExecution(state) {
	const { cfg, ctx, dispatcher, isDispatchOperationAborted, markInboundDedupeReplayUnsafe, markProgress, noteCommentaryProgress, params, sendPayloadAsync, sendPolicyDenied, sessionKey, shouldEmitVerboseProgress, shouldRouteToOriginating, shouldSendToolSummaries, shouldSendVerboseProgressMessages, suppressAutomaticSourceDelivery, suppressDelivery, turnLedger } = state;
	if (suppressDelivery) logVerbose(`Delivery suppressed by ${state.deliverySuppressionReason} for session ${state.sessionStoreEntry.sessionKey ?? sessionKey ?? "unknown"} — agent will still process the message`);
	let didSendPlanStatusNotice = false;
	const formatPlanUpdateText = (payload) => {
		const explanation = payload.explanation?.replace(/\s+/g, " ").trim();
		const steps = (payload.steps ?? []).map((entry) => ({
			step: entry.step.replace(/\s+/g, " ").trim(),
			status: entry.status
		})).filter((entry) => entry.step);
		if (steps.length > 0) return formatPlanChecklistLines(steps, {
			maxLines: steps.length,
			maxLineChars: 120
		}).join("\n");
		return explanation || "Planning next steps.";
	};
	const sendPlanUpdate = async (payload) => {
		if (shouldSuppressProgressDelivery() || !shouldSendVerboseProgressMessages() || didSendPlanStatusNotice) return;
		didSendPlanStatusNotice = true;
		const replyPayload = {
			text: formatPlanUpdateText(payload),
			isStatusNotice: true
		};
		if (shouldRouteToOriginating) {
			await sendPayloadAsync(replyPayload, void 0, false);
			return;
		}
		markInboundDedupeReplayUnsafe();
		turnLedger.sendQueued("tool", replyPayload);
	};
	const progressState = {
		accumulatedBlockText: "",
		accumulatedBlockTtsText: "",
		blockCount: 0,
		hasPendingDirectBlockReplyDelivery: false,
		progressCallbackStartTail: Promise.resolve()
	};
	const cleanBlockTtsDirectiveText = shouldCleanTtsDirectiveText({
		cfg,
		ttsAuto: state.sessionTtsAuto,
		agentId: state.sessionAgentId,
		channelId: state.deliveryChannel,
		accountId: state.replyRoute.accountId
	}) ? createTtsDirectiveTextStreamCleaner() : void 0;
	const resolveToolDeliveryPayload = (payload) => {
		if (shouldSuppressLocalExecApprovalPrompt({
			channel: normalizeMessageChannel(ctx.Surface ?? ctx.Provider),
			cfg,
			accountId: ctx.AccountId,
			payload
		})) return null;
		if (shouldSendToolSummaries()) return payload;
		const execApproval = payload.channelData && typeof payload.channelData === "object" && !Array.isArray(payload.channelData) ? payload.channelData.execApproval : void 0;
		if (execApproval && typeof execApproval === "object" && !Array.isArray(execApproval)) return payload;
		if (state.hasAskUserPayload(payload)) return payload;
		if (isFastModeAutoProgressPayload(payload)) return payload;
		if (!resolveSendableOutboundReplyParts(payload).hasMedia) return null;
		return {
			...payload,
			text: void 0
		};
	};
	const typing = resolveRunTypingPolicy({
		requestedPolicy: params.replyOptions?.typingPolicy,
		suppressTyping: state.sourceReplyPolicy.suppressTyping,
		originatingChannel: state.routeReplyChannel,
		systemEvent: shouldRouteToOriginating
	});
	const shouldSuppressProgressDelivery = () => sendPolicyDenied || suppressDelivery && !state.shouldDeliverVerboseProgressDespiteSourceSuppression();
	const hasVisibleRegularVerboseToolProgress = () => shouldEmitVerboseProgress() && !state.shouldEmitFullVerboseProgress() && shouldSendVerboseProgressMessages() && ctx.InboundEventKind !== "room_event" && !shouldSuppressProgressDelivery();
	let observedVisibleToolErrorProgress = false;
	const markVisibleToolErrorProgress = () => {
		if (hasVisibleRegularVerboseToolProgress()) observedVisibleToolErrorProgress = true;
	};
	const hasFailedProgressStatus = (payload) => payload.phase === "error" || payload.status === "failed" || payload.status === "error" || typeof payload.exitCode === "number" && payload.exitCode !== 0;
	const shouldSuppressToolErrorWarnings = () => {
		if (params.replyOptions?.suppressToolErrorWarnings !== void 0) return params.replyOptions.suppressToolErrorWarnings;
		if (!shouldEmitVerboseProgress()) return false;
		return observedVisibleToolErrorProgress ? true : void 0;
	};
	const suppressToolErrorWarnings = params.replyOptions?.suppressToolErrorWarnings ?? (observedVisibleToolErrorProgress ? true : void 0);
	const onToolResultFromReplyOptions = params.replyOptions?.onToolResult;
	const onPlanUpdateFromReplyOptions = params.replyOptions?.onPlanUpdate;
	const onApprovalEventFromReplyOptions = params.replyOptions?.onApprovalEvent;
	const onPatchSummaryFromReplyOptions = params.replyOptions?.onPatchSummary;
	const allowSuppressedSourceProgressCallbacks = params.replyOptions?.allowProgressCallbacksWhenSourceDeliverySuppressed === true;
	const isChannelOwnedToolResultProgressPayload = (payload) => {
		const text = normalizeOptionalString(payload.text);
		return Boolean(text?.startsWith("🛠️") || text?.startsWith("🔧"));
	};
	const shouldForwardToolResultProgressCallback = (payload, isFastModeAutoProgress) => {
		if (isFastModeAutoProgress) return shouldForwardProgressCallback({ forwardWhenSourceDeliverySuppressed: true });
		if (allowSuppressedSourceProgressCallbacks && isChannelOwnedToolResultProgressPayload(payload)) return shouldForwardProgressCallback({ forwardWhenSourceDeliverySuppressed: true });
		return shouldSendToolSummaries() && shouldForwardProgressCallback();
	};
	const shouldAllowQuietChannelOwnedProgressCallbacks = (options) => options?.requiresToolSummaryVisibility === true && (params.replyOptions?.suppressDefaultToolProgressMessages === true || options.allowWhenToolSummariesHidden === true);
	const waitForPendingDirectBlockReplyDelivery = async (abortSignal) => {
		if (!progressState.hasPendingDirectBlockReplyDelivery) return;
		progressState.hasPendingDirectBlockReplyDelivery = false;
		await waitForReplyDispatcherIdle(dispatcher, abortSignal);
	};
	const shouldForwardProgressCallback = (options) => {
		if (options?.requiresToolSummaryVisibility === true && !shouldSendToolSummaries() && !shouldAllowQuietChannelOwnedProgressCallbacks(options)) return false;
		return !suppressAutomaticSourceDelivery || allowSuppressedSourceProgressCallbacks && !sendPolicyDenied && options?.forwardWhenSourceDeliverySuppressed === true;
	};
	const preserveProgressCallbackStartOrder = params.replyOptions?.preserveProgressCallbackStartOrder === true;
	const reserveProgressCallbackStart = () => {
		const previousStart = progressState.progressCallbackStartTail;
		let releaseStart;
		progressState.progressCallbackStartTail = new Promise((resolve) => {
			releaseStart = resolve;
		});
		return {
			previousStart,
			releaseStart: () => releaseStart?.()
		};
	};
	const wrapProgressCallback = (callback, options) => {
		if (!callback) return;
		const runProgressCallback = async (args, noteCallbackStarted) => {
			try {
				if (isDispatchOperationAborted()) return;
				state.getDispatchReplyOperation()?.recordActivity();
				markProgress();
				if (options?.waitForDirectBlockReplyDelivery) {
					await waitForPendingDirectBlockReplyDelivery(state.getDispatchAbortOperation()?.abortSignal);
					if (isDispatchOperationAborted()) return;
				}
				if (shouldForwardProgressCallback(options)) {
					if (preserveProgressCallbackStartOrder && options?.onForward) await options.onForward(...args);
					else if (!preserveProgressCallbackStartOrder) await options?.onForward?.(...args);
					const callbackResult = callback(...args);
					noteCallbackStarted();
					const result = await callbackResult;
					if (result === false) return result;
					await options?.onVisible?.(...args);
				}
				return;
			} finally {
				noteCallbackStarted();
			}
		};
		return (...args) => {
			if (!preserveProgressCallbackStartOrder) return runProgressCallback(args, () => void 0);
			const start = reserveProgressCallbackStart();
			return (async () => {
				await start.previousStart;
				return await runProgressCallback(args, start.releaseStart);
			})();
		};
	};
	const deliverStandaloneCommentaryProgress = shouldEmitVerboseProgress();
	const itemEventForwardingOptions = {
		forwardWhenSourceDeliverySuppressed: true,
		requiresToolSummaryVisibility: true
	};
	const canForwardItemEvents = Boolean(params.replyOptions?.onItemEvent) && shouldForwardProgressCallback(itemEventForwardingOptions);
	const canForwardSuppressedSourceItemEvents = suppressAutomaticSourceDelivery && allowSuppressedSourceProgressCallbacks && canForwardItemEvents;
	const shouldDeliverDurableCommentaryProgress = (payload) => deliverStandaloneCommentaryProgress && payload.kind === "preamble" && payload.suppressDurableProgress !== true;
	const forwardItemEvent = canForwardItemEvents ? wrapProgressCallback(params.replyOptions?.onItemEvent, {
		...itemEventForwardingOptions,
		waitForDirectBlockReplyDelivery: true,
		onForward: (payload) => preserveProgressCallbackStartOrder && shouldDeliverDurableCommentaryProgress(payload) ? noteCommentaryProgress(payload) : void 0,
		onVisible: (payload) => {
			if (hasFailedProgressStatus(payload)) markVisibleToolErrorProgress();
		}
	}) : void 0;
	const onItemEvent = deliverStandaloneCommentaryProgress || canForwardItemEvents ? async (payload) => {
		if (isDispatchOperationAborted()) return;
		if (!forwardItemEvent) markProgress();
		if ((!forwardItemEvent || !preserveProgressCallbackStartOrder) && shouldDeliverDurableCommentaryProgress(payload)) await noteCommentaryProgress(payload);
		return await forwardItemEvent?.(payload);
	} : void 0;
	params.replyOptions?.onVerboseProgressVisibility?.(() => deliverStandaloneCommentaryProgress && shouldSendVerboseProgressMessages() && !shouldSuppressProgressDelivery());
	const replyResolver = params.replyResolver ?? (await state.traceReplyPhase("reply.load_reply_resolver", () => loadGetReplyFromConfigRuntime())).getReplyFromConfig;
	const publishedRuntimeReplyConfig = getRuntimeConfigSnapshot();
	const runtimeReplyConfig = publishedRuntimeReplyConfig ?? cfg;
	const replyConfig = params.configOverride ? withFullRuntimeReplyConfig(applyMergePatch(runtimeReplyConfig, params.configOverride)) : params.usePublishedModelRuntime || publishedRuntimeReplyConfig ? withPublishedRuntimeReplyConfig(runtimeReplyConfig) : withFullRuntimeReplyConfig(cfg);
	state.recordAgentDispatchStarted();
	return {
		status: "ready",
		state: extendPreparedDispatchState(state, {
			sendPlanUpdate,
			cleanBlockTtsDirectiveText,
			resolveToolDeliveryPayload,
			typing,
			shouldSuppressProgressDelivery,
			markVisibleToolErrorProgress,
			hasFailedProgressStatus,
			shouldSuppressToolErrorWarnings,
			suppressToolErrorWarnings,
			onToolResultFromReplyOptions,
			onPlanUpdateFromReplyOptions,
			onApprovalEventFromReplyOptions,
			onPatchSummaryFromReplyOptions,
			shouldForwardToolResultProgressCallback,
			waitForPendingDirectBlockReplyDelivery,
			shouldForwardProgressCallback,
			preserveProgressCallbackStartOrder,
			wrapProgressCallback,
			deliverStandaloneCommentaryProgress,
			canForwardSuppressedSourceItemEvents,
			onItemEvent,
			replyResolver,
			replyConfig,
			progressState
		})
	};
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.plugin-binding.ts
function shouldBypassPluginOwnedBindingForCommand(ctx, cfg) {
	if (ctx.CommandAuthorized !== void 0 && typeof ctx.CommandAuthorized !== "boolean") return false;
	const commandTurn = resolveCommandTurnContext(ctx);
	if ((commandTurn.kind === "native" || commandTurn.kind === "text-slash") && !commandTurn.authorized) return false;
	if (isNativeCommandTurn(commandTurn) && commandTurn.authorized) return true;
	if (!(commandTurn.kind === "text-slash" && commandTurn.authorized || commandTurn.kind === "normal" && typeof ctx.CommandAuthorized === "boolean" && ctx.CommandAuthorized) || !shouldHandleTextCommands({
		cfg,
		surface: ctx.Surface ?? ctx.Provider ?? "",
		commandSource: ctx.CommandSource
	})) return false;
	const commandBody = normalizeCommandBody(commandTurn.body ?? resolveCommandContextText(ctx), { botUsername: ctx.BotUsername });
	if (!commandBody.startsWith("/")) return false;
	if (matchPluginCommand(commandBody, { channel: normalizeOptionalString(ctx.Surface ?? ctx.Provider) })) return true;
	if (!isExplicitSourceReplyCommand(ctx, cfg)) return false;
	if (resolveTextCommand(commandBody)) return true;
	const provider = normalizeOptionalString(ctx.Provider ?? ctx.Surface);
	if (commandTurn.commandName && findCommandByNativeName(commandTurn.commandName, provider, { includeBundledChannelFallback: true })) return true;
	return false;
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.prepare-operation.ts
async function prepareDispatchOperation(state) {
	const { attachSourceReplyDeliveryMode, cfg, chatType, commitInboundDedupeIfClaimed, completeDispatchReplyOperation, ctx, deliverySuppressionReason, dispatcher, emitMessageReceivedHooks, finishReplyOperationAbortedDispatch, hookRunner, isPreDispatchOperationAborted, markIdle, params, persistPluginBindingUserTurn, pluginOwnedBinding, recordProcessed, sendBindingNotice, sessionAgentId, sessionKey, sessionStoreEntry, suppressDelivery } = state;
	const abortRuntime = params.fastAbortResolver ? null : await loadAbortRuntime();
	const fastAbortResolver = params.fastAbortResolver ?? abortRuntime?.tryFastAbortFromMessage;
	const formatAbortReplyTextResolver = params.formatAbortReplyTextResolver ?? abortRuntime?.formatAbortReplyText;
	if (!fastAbortResolver || !formatAbortReplyTextResolver) throw new Error("abort runtime unavailable");
	const finishFastCommand = async (fast) => {
		if (pluginOwnedBinding) touchConversationBindingRecord(pluginOwnedBinding.bindingId);
		emitMessageReceivedHooks();
		let queuedFinal = false;
		let routedFinalCount = 0;
		if (!suppressDelivery && fast.payload) {
			const selectedModel = resolveSessionModelRef(cfg, sessionStoreEntry.entry, sessionAgentId);
			const modelSelection = {
				...selectedModel,
				thinkLevel: sessionStoreEntry.entry?.thinkingLevel
			};
			const responsePrefixContext = {
				identityName: normalizeOptionalString(resolveAgentIdentity(cfg, sessionAgentId)?.name),
				provider: selectedModel.provider,
				model: extractShortModelName(selectedModel.model),
				modelFull: `${selectedModel.provider}/${selectedModel.model}`,
				thinkingLevel: modelSelection.thinkLevel ?? "off"
			};
			const result = await state.routeReplyToOriginating(fast.payload, { responsePrefixContext });
			if (result) {
				queuedFinal = result.ok;
				if (state.isRoutedReplyDelivered(result)) routedFinalCount += 1;
				if (!result.ok) logVerbose(`dispatch-from-config: route-reply (${fast.logKind}) failed: ${result.error ?? "unknown error"}`);
			} else {
				state.markInboundDedupeReplayUnsafe();
				params.replyOptions?.onModelSelected?.(modelSelection);
				queuedFinal = dispatcher.sendFinalReply(fast.payload);
			}
		} else if (suppressDelivery) logVerbose(`dispatch-from-config: ${fast.logKind} reply suppressed by ${deliverySuppressionReason} (session=${sessionKey ?? "unknown"})`);
		const counts = dispatcher.getQueuedCounts();
		counts.final += routedFinalCount;
		recordProcessed("completed", { reason: fast.reason });
		markIdle("message_completed");
		commitInboundDedupeIfClaimed();
		completeDispatchReplyOperation();
		return {
			status: "complete",
			result: attachSourceReplyDeliveryMode({
				queuedFinal,
				counts
			})
		};
	};
	const fastAbort = await fastAbortResolver({
		ctx,
		cfg
	});
	if (fastAbort.handled) return await finishFastCommand({
		payload: { text: formatAbortReplyTextResolver(fastAbort.stoppedSubagents, fastAbort.rejectionReason, fastAbort.failedSubagents) },
		reason: "fast_abort",
		logKind: "fast_abort"
	});
	if (/^\s*\/approve(?:@[^\s]+)?(?:\s|$)/i.test(ctx.commandText)) {
		const fastApprove = await (await loadFastApproveRuntime()).tryFastApproveFromMessage({
			ctx,
			cfg,
			agentId: sessionAgentId,
			sessionKey
		});
		if (fastApprove.handled) return await finishFastCommand({
			...fastApprove.reply ? { payload: fastApprove.reply } : {},
			reason: "before_dispatch_handled",
			logKind: "fast_approve"
		});
	}
	const preDispatchAcquisition = await state.ensureDispatchReplyOperation("pre_dispatch");
	if (preDispatchAcquisition.status === "aborted") return {
		status: "complete",
		result: finishReplyOperationAbortedDispatch()
	};
	if (preDispatchAcquisition.status === "busy") return {
		status: "complete",
		result: state.finishReplyOperationBusyDispatch({ dedupeDisposition: "release" })
	};
	if (pluginOwnedBinding) {
		if (isPreDispatchOperationAborted()) return {
			status: "complete",
			result: finishReplyOperationAbortedDispatch()
		};
		touchConversationBindingRecord(pluginOwnedBinding.bindingId);
		if (shouldBypassPluginOwnedBindingForCommand(ctx, cfg)) logVerbose(`plugin-bound inbound command escaped plugin binding (plugin=${pluginOwnedBinding.pluginId} session=${sessionKey ?? "unknown"}); falling through to command processing`);
		else if (state.sendPolicyDenied || suppressDelivery && !state.suppressAutomaticSourceDelivery) logVerbose(`plugin-bound inbound skipped under ${deliverySuppressionReason} (plugin=${pluginOwnedBinding.pluginId} session=${sessionKey ?? "unknown"}); falling through to suppressed agent processing`);
		else {
			logVerbose(`plugin-bound inbound routed to ${pluginOwnedBinding.pluginId} conversation=${pluginOwnedBinding.conversationId}`);
			const bindingAuthorization = resolveCommandAuthorization({
				ctx,
				cfg,
				commandAuthorized: ctx.CommandAuthorized
			});
			const targetedClaimOutcome = hookRunner?.runInboundClaimForPluginOutcome ? await (async () => {
				await state.prepareHookMediaMetadata();
				if (isPreDispatchOperationAborted()) throw new DispatchReplyOperationAbortedError();
				const authorizedInboundClaimEvent = {
					...state.hookState.inboundClaimEvent,
					senderIsOwner: bindingAuthorization.senderIsOwner
				};
				return await state.runWithDispatchLifecycleAdmission(async () => await hookRunner.runInboundClaimForPluginOutcome(pluginOwnedBinding.pluginId, authorizedInboundClaimEvent, {
					...state.hookState.inboundClaimContext,
					pluginBinding: pluginOwnedBinding
				}));
			})() : (() => {
				return getGlobalPluginRegistry()?.plugins.some((plugin) => plugin.id === pluginOwnedBinding.pluginId && plugin.status === "loaded") ?? false ? { status: "no_handler" } : { status: "missing_plugin" };
			})();
			if (isPreDispatchOperationAborted()) return {
				status: "complete",
				result: finishReplyOperationAbortedDispatch()
			};
			switch (targetedClaimOutcome.status) {
				case "handled": {
					const transcriptOwner = await persistPluginBindingUserTurn();
					if (targetedClaimOutcome.result.reply && state.shouldDeliverPluginBindingReply) await state.deliverBindingPayload(targetedClaimOutcome.result.reply, "terminal", transcriptOwner);
					markIdle("plugin_binding_dispatch");
					recordProcessed("completed", { reason: "plugin-bound-handled" });
					commitInboundDedupeIfClaimed();
					completeDispatchReplyOperation();
					return {
						status: "complete",
						result: attachSourceReplyDeliveryMode({
							queuedFinal: false,
							counts: dispatcher.getQueuedCounts()
						})
					};
				}
				case "missing_plugin":
				case "no_handler":
					state.bindingState.pluginFallbackReason = targetedClaimOutcome.status === "missing_plugin" ? "plugin-bound-fallback-missing-plugin" : "plugin-bound-fallback-no-handler";
					if ((chatType === "group" || chatType === "channel") && ctx.WasMentioned === false && !state.explicitCommandTurnCtx && ctx.GroupRequireMention !== false) {
						markIdle("plugin_binding_fallback_unmentioned");
						recordProcessed("completed", { reason: state.bindingState.pluginFallbackReason });
						commitInboundDedupeIfClaimed();
						completeDispatchReplyOperation();
						return {
							status: "complete",
							result: attachSourceReplyDeliveryMode({
								queuedFinal: false,
								counts: dispatcher.getQueuedCounts()
							})
						};
					}
					if (!hasShownPluginBindingFallbackNotice(pluginOwnedBinding.bindingId)) {
						if (await sendBindingNotice({ text: buildPluginBindingUnavailableText(pluginOwnedBinding) }, "additive")) markPluginBindingFallbackNoticeShown(pluginOwnedBinding.bindingId);
					}
					break;
				case "declined": {
					const transcriptOwner = await persistPluginBindingUserTurn();
					await sendBindingNotice({ text: buildPluginBindingDeclinedText(pluginOwnedBinding) }, "terminal", transcriptOwner);
					markIdle("plugin_binding_declined");
					recordProcessed("completed", { reason: "plugin-bound-declined" });
					commitInboundDedupeIfClaimed();
					completeDispatchReplyOperation();
					return {
						status: "complete",
						result: attachSourceReplyDeliveryMode({
							queuedFinal: false,
							counts: dispatcher.getQueuedCounts()
						})
					};
				}
				case "error": {
					const transcriptOwner = await persistPluginBindingUserTurn();
					logVerbose(`plugin-bound inbound claim failed for ${pluginOwnedBinding.pluginId}: ${targetedClaimOutcome.error}`);
					await sendBindingNotice({ text: buildPluginBindingErrorText(pluginOwnedBinding) }, "terminal", transcriptOwner);
					markIdle("plugin_binding_error");
					recordProcessed("completed", { reason: "plugin-bound-error" });
					commitInboundDedupeIfClaimed();
					completeDispatchReplyOperation();
					return {
						status: "complete",
						result: attachSourceReplyDeliveryMode({
							queuedFinal: false,
							counts: dispatcher.getQueuedCounts()
						})
					};
				}
			}
		}
	}
	emitMessageReceivedHooks();
	return {
		status: "ready",
		state
	};
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.ts
/** Main reply dispatch pipeline from finalized config/context to delivery payloads. */
/** Dispatches a reply from config, context, command handling, agent run, and delivery policy. */
async function dispatchReplyFromConfig(params) {
	const messageAuditTerminal = createInboundMessageAuditTerminal(params);
	try {
		const result = await dispatchReplyFromConfigInner(params, messageAuditTerminal);
		messageAuditTerminal?.finishSuccess(result);
		return result;
	} catch (error) {
		messageAuditTerminal?.finishError();
		throw error;
	}
}
async function dispatchReplyFromConfigInner(params, messageAuditTerminal) {
	const gathered = await gatherDispatchRequest(params, messageAuditTerminal);
	if (gathered.status === "complete") return gathered.result;
	return await withPluginRuntimeRegistryScope(gathered.state.pluginRegistry, async () => {
		const context = await prepareDispatchOperationContext((await prepareDispatchDelivery(gathered.state)).state);
		if (context.status === "complete") return context.result;
		const errorState = context.state;
		try {
			const operation = await prepareDispatchOperation(context.state);
			if (operation.status === "complete") return operation.result;
			const route = await chooseDispatchRoute(operation.state);
			if (route.status === "complete") return route.result;
			const executed = await executeDispatch((await prepareDispatchExecution(route.state)).state);
			if (executed.status === "complete") return executed.result;
			return (await finalizeDispatchAndAudit(executed.state)).result;
		} catch (err) {
			const { failDispatchReplyOperation, finishReplyOperationAbortedDispatch, inboundDedupeClaim, markIdle, recordAgentDispatchCompleted, recordProcessed } = errorState;
			if (isDispatchReplyOperationAbortedError(err)) return finishReplyOperationAbortedDispatch();
			if (inboundDedupeClaim.status === "claimed") if (errorState.inboundDedupeReplayUnsafe) commitInboundDedupe(inboundDedupeClaim.key);
			else releaseInboundDedupe(inboundDedupeClaim.key);
			recordAgentDispatchCompleted("error", { error: String(err) });
			recordProcessed("error", { error: String(err) });
			markIdle("message_error");
			failDispatchReplyOperation(err);
			throw err;
		}
	});
}
//#endregion
//#region src/auto-reply/dispatch.ts
/** Auto-reply dispatch orchestration, hook composition, and foreground delivery fencing. */
const replyPayloadSendingDispatchers = /* @__PURE__ */ new WeakSet();
function applyRuntimeToolsAllow(replyOptions, toolsAllow) {
	if (toolsAllow === void 0) return replyOptions;
	return {
		...replyOptions,
		toolsAllow
	};
}
function normalizeForegroundReplyFencePart(value) {
	if (typeof value !== "string") return;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : void 0;
}
function resolveForegroundReplyFenceKey(finalized) {
	const sessionKey = normalizeForegroundReplyFencePart(finalized.SessionKey);
	const channel = normalizeForegroundReplyFencePart(finalized.OriginatingChannel) ?? normalizeForegroundReplyFencePart(finalized.Surface) ?? normalizeForegroundReplyFencePart(finalized.Provider);
	const target = normalizeForegroundReplyFencePart(finalized.OriginatingTo) ?? normalizeForegroundReplyFencePart(finalized.NativeChannelId) ?? normalizeForegroundReplyFencePart(finalized.From) ?? normalizeForegroundReplyFencePart(finalized.To);
	if (!sessionKey || !channel || !target) return;
	return JSON.stringify([
		"foreground",
		channel,
		normalizeForegroundReplyFencePart(finalized.AccountId) ?? "default",
		sessionKey,
		normalizeChatType(finalized.ChatType) ?? "unknown",
		target
	]);
}
function beginForegroundReplyFence(finalized) {
	const key = resolveForegroundReplyFenceKey(finalized);
	if (!key) return;
	const state = foregroundReplyFenceByKey.get(key) ?? {
		generation: 0,
		visibleDeliveryGeneration: 0,
		activeDispatches: 0,
		activeGenerations: /* @__PURE__ */ new Map(),
		suspendedGenerations: /* @__PURE__ */ new Set(),
		waiters: /* @__PURE__ */ new Set()
	};
	state.generation += 1;
	state.activeDispatches += 1;
	state.activeGenerations.set(state.generation, (state.activeGenerations.get(state.generation) ?? 0) + 1);
	foregroundReplyFenceByKey.set(key, state);
	return {
		key,
		generation: state.generation,
		state
	};
}
function setForegroundReplyFenceAdmissionWaiting(snapshot, waiting) {
	if (!snapshot) return;
	const state = foregroundReplyFenceByKey.get(snapshot.key);
	if (state !== snapshot.state) return;
	if (waiting) {
		if (state.activeGenerations.delete(snapshot.generation)) state.suspendedGenerations.add(snapshot.generation);
	} else if (state.suspendedGenerations.delete(snapshot.generation)) state.activeGenerations.set(snapshot.generation, 1);
	notifyForegroundReplyFenceWaiters(state);
}
function hasNewerActiveForegroundReplyFenceGeneration(state, generation) {
	for (const [activeGeneration, count] of state.activeGenerations) if (activeGeneration > generation && count > 0) return true;
	return false;
}
async function shouldCancelForegroundReplyDelivery(snapshot) {
	if (!snapshot) return false;
	while (true) {
		const state = foregroundReplyFenceByKey.get(snapshot.key);
		if (!state) return false;
		if (state.visibleDeliveryGeneration > snapshot.generation) return true;
		if (!hasNewerActiveForegroundReplyFenceGeneration(state, snapshot.generation)) return false;
		await new Promise((resolve) => {
			state.waiters.add(resolve);
		});
	}
}
function markForegroundReplyFenceVisibleDelivery(snapshot, payload, deliveryResult) {
	if (!snapshot || !hasOutboundReplyContent(payload, { trimText: true })) return;
	if (isExplicitlyNonVisibleDelivery(deliveryResult)) return;
	markForegroundReplyFenceVisibleDeliveryGeneration(snapshot);
}
function markForegroundReplyFenceVisibleDeliveryGeneration(snapshot) {
	if (!snapshot) return;
	const state = foregroundReplyFenceByKey.get(snapshot.key);
	if (!state) return;
	state.visibleDeliveryGeneration = Math.max(state.visibleDeliveryGeneration, snapshot.generation);
	notifyForegroundReplyFenceWaiters(state);
}
function isExplicitlyNonVisibleDelivery(deliveryResult) {
	return typeof deliveryResult === "object" && deliveryResult !== null && !Array.isArray(deliveryResult) && "visibleReplySent" in deliveryResult && deliveryResult.visibleReplySent === false;
}
function isExplicitlyVisibleDelivery(deliveryResult) {
	return typeof deliveryResult === "object" && deliveryResult !== null && !Array.isArray(deliveryResult) && deliveryResult.visibleReplySent === true;
}
function isVisiblePartialDeliveryError(error) {
	if (isOutboundDeliveryError(error)) return error.sentBeforeError;
	if (isChannelPartialDeliveryError(error)) return true;
	return typeof error === "object" && error !== null && !Array.isArray(error) && (error.visibleReplySent === true || error.sentBeforeError === true);
}
async function runForegroundReplyFenceFreshSettledDelivery(snapshot, onFreshSettledDelivery) {
	if (!onFreshSettledDelivery) return;
	if (await shouldCancelForegroundReplyDelivery(snapshot)) return;
	try {
		if (isExplicitlyVisibleDelivery(await onFreshSettledDelivery())) markForegroundReplyFenceVisibleDeliveryGeneration(snapshot);
	} catch (err) {
		if (isVisiblePartialDeliveryError(err)) markForegroundReplyFenceVisibleDeliveryGeneration(snapshot);
		throw err;
	}
}
function endForegroundReplyFence(snapshot) {
	const state = foregroundReplyFenceByKey.get(snapshot.key);
	if (!state) return;
	const activeGenerationCount = state.activeGenerations.get(snapshot.generation) ?? 0;
	if (activeGenerationCount <= 1) state.activeGenerations.delete(snapshot.generation);
	else state.activeGenerations.set(snapshot.generation, activeGenerationCount - 1);
	state.suspendedGenerations.delete(snapshot.generation);
	state.activeDispatches -= 1;
	notifyForegroundReplyFenceWaiters(state);
	if (state.activeDispatches <= 0) foregroundReplyFenceByKey.delete(snapshot.key);
}
function resolveDispatcherSilentReplyContext(ctx, cfg) {
	const finalized = finalizeInboundContext(ctx);
	const commandTargetSessionKey = resolveCommandTurnTargetSessionKey(finalized);
	const policySessionKey = commandTargetSessionKey ?? finalized.SessionKey;
	const chatType = normalizeChatType(finalized.ChatType);
	const conversationType = commandTargetSessionKey && commandTargetSessionKey !== finalized.SessionKey ? void 0 : chatType === "direct" ? "direct" : chatType === "group" || chatType === "channel" ? "group" : void 0;
	return {
		cfg,
		sessionKey: policySessionKey,
		surface: finalized.Surface ?? finalized.Provider,
		conversationType
	};
}
function bindReplyPayloadRunState(replyOptions, runState) {
	const onAgentRunStart = replyOptions?.onAgentRunStart;
	return {
		...replyOptions,
		onAgentRunStart: (runId) => {
			runState.runId = runId;
			onAgentRunStart?.(runId);
		}
	};
}
function installReplyPayloadSendingBeforeDeliver(dispatcher, ctx, runState) {
	if (replyPayloadSendingDispatchers.has(dispatcher)) return;
	const beforeDeliver = buildInboundReplyPayloadSendingBeforeDeliver(ctx, runState);
	if (!beforeDeliver || !dispatcher.appendBeforeDeliver) return;
	dispatcher.appendBeforeDeliver(beforeDeliver);
	replyPayloadSendingDispatchers.add(dispatcher);
}
function markReplyPayloadSendingBeforeDeliverInstalled(dispatcher, beforeDeliver) {
	if (beforeDeliver) replyPayloadSendingDispatchers.add(dispatcher);
}
function buildDispatchTimelineAttributes(ctx) {
	const commandTurn = resolveCommandTurnContext(ctx);
	return {
		surface: typeof ctx.Surface === "string" ? ctx.Surface : typeof ctx.Provider === "string" ? ctx.Provider : "unknown",
		hasSessionKey: typeof ctx.SessionKey === "string" || typeof ctx.CommandTargetSessionKey === "string",
		commandSource: commandTurn.source
	};
}
function finalizeDispatchResult(result, dispatcher) {
	const cancelledCounts = dispatcher.getCancelledCounts?.();
	const failedCounts = dispatcher.getFailedCounts?.();
	if (!cancelledCounts && !failedCounts) return result;
	const resultCounts = {
		tool: result.counts?.tool ?? 0,
		block: result.counts?.block ?? 0,
		final: result.counts?.final ?? 0
	};
	const counts = {
		tool: Math.max(0, resultCounts.tool - (cancelledCounts?.tool ?? 0) - (failedCounts?.tool ?? 0)),
		block: Math.max(0, resultCounts.block - (cancelledCounts?.block ?? 0) - (failedCounts?.block ?? 0)),
		final: Math.max(0, resultCounts.final - (cancelledCounts?.final ?? 0) - (failedCounts?.final ?? 0))
	};
	const hasFailedCounts = (failedCounts?.tool ?? 0) > 0 || (failedCounts?.block ?? 0) > 0 || (failedCounts?.final ?? 0) > 0;
	return {
		...result,
		queuedFinal: result.queuedFinal && counts.final > 0,
		counts,
		...hasFailedCounts ? { failedCounts } : {}
	};
}
/** Dispatches one finalized inbound message through reply resolution and queued delivery. */
async function dispatchInboundMessage(params) {
	const replyOptions = applyRuntimeToolsAllow(params.replyOptions, params.toolsAllow);
	const replyPayloadRunState = params.replyPayloadRunState ?? { runId: replyOptions?.runId };
	const replyOptionsWithRunState = bindReplyPayloadRunState(replyOptions, replyPayloadRunState);
	const finalized = measureDiagnosticsTimelineSpanSync("auto_reply.finalize_context", () => finalizeInboundContext(params.ctx), {
		phase: "agent-turn",
		config: params.cfg,
		attributes: buildDispatchTimelineAttributes(params.ctx)
	});
	if (isDiagnosticsEnabled(params.cfg)) logMessageReceived({
		sessionKey: finalized.SessionKey,
		channel: finalized.Surface ?? finalized.Provider,
		chatId: finalized.To ?? finalized.From,
		messageId: finalized.MessageSid ?? finalized.MessageSidFirst ?? finalized.MessageSidLast,
		source: "dispatchInboundMessage"
	});
	if (params.outboundHooks !== "disabled") installReplyPayloadSendingBeforeDeliver(params.dispatcher, finalized, replyPayloadRunState);
	return finalizeDispatchResult(await withReplyDispatcher({
		dispatcher: params.dispatcher,
		onSettled: params.onSettled,
		run: () => measureDiagnosticsTimelineSpan("auto_reply.dispatch_reply_from_config", () => dispatchReplyFromConfig({
			ctx: finalized,
			cfg: params.cfg,
			dispatcher: params.dispatcher,
			replyOptions: replyOptionsWithRunState,
			replyResolver: params.replyResolver,
			onSessionMetadataChanges: params.onSessionMetadataChanges,
			usePublishedModelRuntime: true
		}), {
			phase: "agent-turn",
			config: params.cfg,
			attributes: buildDispatchTimelineAttributes(finalized)
		})
	}), params.dispatcher);
}
async function dispatchInboundMessageWithBufferedDispatcherCore(params, ownership) {
	const finalized = finalizeInboundContext(params.ctx);
	const foregroundReplyFence = beginForegroundReplyFence(finalized);
	const silentReplyContext = resolveDispatcherSilentReplyContext(finalized, params.cfg);
	const replyPayloadRunState = { runId: params.replyOptions?.runId };
	const replyPayloadBeforeDeliver = ownership.outboundHooks === "disabled" ? void 0 : buildInboundReplyPayloadSendingBeforeDeliver(finalized, replyPayloadRunState, ownership.onReplyPayloadSuppressed);
	const globalBeforeDeliver = ownership.messageSending === "dispatcher" ? composeReplyDispatchBeforeDeliver(replyPayloadBeforeDeliver, buildLegacyInboundMessageSendingBeforeDeliver(finalized)) : replyPayloadBeforeDeliver;
	const configuredBeforeDeliver = params.dispatcherOptions.beforeDeliver ? composeReplyDispatchBeforeDeliver({
		hook: params.dispatcherOptions.beforeDeliver,
		options: params.dispatcherOptions.beforeDeliverOptions
	}, replyPayloadBeforeDeliver) : globalBeforeDeliver;
	const beforeDeliver = foregroundReplyFence || configuredBeforeDeliver ? markReplyDispatchBeforeDeliverDeadlineOwned(async (payload, info) => {
		if (await shouldCancelForegroundReplyDelivery(foregroundReplyFence)) {
			setReplyPayloadMetadata(payload, { foregroundDeliverySuppression: { reason: "stale-foreground" } });
			return null;
		}
		const deliverPayload = configuredBeforeDeliver ? await configuredBeforeDeliver(payload, info) : payload;
		if (!deliverPayload) return null;
		if (await shouldCancelForegroundReplyDelivery(foregroundReplyFence)) {
			setReplyPayloadMetadata(payload, { foregroundDeliverySuppression: { reason: "stale-foreground" } });
			return null;
		}
		return deliverPayload;
	}) : void 0;
	const deliver = async (payload, info) => {
		try {
			const result = await params.dispatcherOptions.deliver(payload, info);
			markForegroundReplyFenceVisibleDelivery(foregroundReplyFence, payload, result);
			return result;
		} catch (err) {
			if (isVisiblePartialDeliveryError(err)) markForegroundReplyFenceVisibleDelivery(foregroundReplyFence, payload, { visibleReplySent: true });
			throw err;
		}
	};
	const { dispatcher, replyOptions, markDispatchIdle, markRunComplete } = createReplyDispatcherWithTyping({
		...params.dispatcherOptions,
		deliver,
		beforeDeliver,
		silentReplyContext: params.dispatcherOptions.silentReplyContext ?? silentReplyContext
	});
	const onTypingController = params.replyOptions?.onTypingController ? (typing) => {
		replyOptions.onTypingController?.(typing);
		params.replyOptions?.onTypingController?.(typing);
	} : replyOptions.onTypingController;
	markReplyPayloadSendingBeforeDeliverInstalled(dispatcher, replyPayloadBeforeDeliver);
	try {
		return await dispatchInboundMessage({
			ctx: finalized,
			cfg: params.cfg,
			dispatcher,
			toolsAllow: params.toolsAllow,
			replyResolver: params.replyResolver,
			replyOptions: {
				...params.replyOptions,
				...replyOptions,
				onTypingController,
				onReplyAdmissionWaitChange: (waiting) => {
					setForegroundReplyFenceAdmissionWaiting(foregroundReplyFence, waiting);
				}
			},
			replyPayloadRunState,
			outboundHooks: ownership.outboundHooks,
			onSessionMetadataChanges: params.onSessionMetadataChanges
		});
	} finally {
		try {
			if (isExplicitlyVisibleDelivery(await params.dispatcherOptions.onSettled?.())) markForegroundReplyFenceVisibleDeliveryGeneration(foregroundReplyFence);
			await runForegroundReplyFenceFreshSettledDelivery(foregroundReplyFence, params.dispatcherOptions.onFreshSettledDelivery);
		} finally {
			if (foregroundReplyFence) endForegroundReplyFence(foregroundReplyFence);
			markRunComplete();
			markDispatchIdle();
		}
	}
}
async function dispatchInboundMessageWithBufferedDispatcher(params) {
	return await dispatchInboundMessageWithBufferedDispatcherCore(params, { messageSending: "dispatcher" });
}
async function dispatchInboundMessageWithRoutedChannelDispatcher(params) {
	const { onReplyPayloadSuppressed, suppressOutboundHooks, ...dispatcherParams } = params;
	return await dispatchInboundMessageWithBufferedDispatcherCore(dispatcherParams, {
		messageSending: "channel-delivery",
		...suppressOutboundHooks ? { outboundHooks: "disabled" } : { onReplyPayloadSuppressed }
	});
}
async function dispatchInboundMessageWithPlainDispatcherCore(params, messageSending) {
	const silentReplyContext = resolveDispatcherSilentReplyContext(params.ctx, params.cfg);
	const replyPayloadRunState = { runId: params.replyOptions?.runId };
	const replyPayloadBeforeDeliver = buildInboundReplyPayloadSendingBeforeDeliver(params.ctx, replyPayloadRunState);
	const globalBeforeDeliver = composeReplyDispatchBeforeDeliver(replyPayloadBeforeDeliver, messageSending === "projected" ? buildProjectedInboundMessageSendingBeforeDeliver(params.ctx) : buildLegacyInboundMessageSendingBeforeDeliver(params.ctx));
	const composedBeforeDeliver = params.dispatcherOptions.beforeDeliver ? composeReplyDispatchBeforeDeliver({
		hook: params.dispatcherOptions.beforeDeliver,
		options: params.dispatcherOptions.beforeDeliverOptions
	}, replyPayloadBeforeDeliver) : globalBeforeDeliver;
	const dispatcher = createReplyDispatcher({
		...params.dispatcherOptions,
		beforeDeliver: composedBeforeDeliver,
		silentReplyContext: params.dispatcherOptions.silentReplyContext ?? silentReplyContext
	});
	markReplyPayloadSendingBeforeDeliverInstalled(dispatcher, replyPayloadBeforeDeliver);
	return await dispatchInboundMessage({
		ctx: params.ctx,
		cfg: params.cfg,
		dispatcher,
		toolsAllow: params.toolsAllow,
		replyResolver: params.replyResolver,
		replyOptions: params.replyOptions,
		replyPayloadRunState,
		onSessionMetadataChanges: params.onSessionMetadataChanges
	});
}
/** Creates a plain dispatcher, installs global send hooks, and dispatches the inbound message. */
async function dispatchInboundMessageWithDispatcher(params) {
	return await dispatchInboundMessageWithPlainDispatcherCore(params, "legacy");
}
/** Creates a core-owned dispatcher whose modifiers fence projected output capture. */
async function dispatchInboundMessageWithProjectedDispatcher(params) {
	return await dispatchInboundMessageWithPlainDispatcherCore(params, "projected");
}
//#endregion
export { dispatchInboundMessageWithRoutedChannelDispatcher as a, settleReplyDispatcher as c, createChannelPartialDeliveryError as d, isChannelPartialDeliveryError as f, dispatchInboundMessageWithProjectedDispatcher as i, withReplyDispatcher as l, dispatchInboundMessageWithBufferedDispatcher as n, dispatchReplyFromConfig as o, dispatchInboundMessageWithDispatcher as r, resetInboundDedupe as s, dispatchInboundMessage as t, createChannelDeliveryResultFromReceipt as u };
