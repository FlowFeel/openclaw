import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as toErrorObject } from "./error-coercion-CrJRoLe1.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { C as createDiagnosticTraceContextFromActiveScope, j as runWithDiagnosticTraceContext } from "./diagnostic-events-Dt41CZkD.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { t as getGlobalHookRunner } from "./hook-runner-global-CRNklGqK.js";
import { c as kindFromMime, l as mimeTypeFromFilePath } from "./mime-Ir6g3Vae.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { l as normalizeMediaFacts, u as projectMediaFacts } from "./media-facts-D_wLZOa9.js";
import { t as probeMediaFilesWithinBudget } from "./media-probe-Cb2WIEbY.js";
import { l as summarizeOutboundPayloadForTransport } from "./payloads-BRd0B8mC.js";
import { t as buildOutboundSessionContext } from "./session-context-DdqCb4cM.js";
import { a as resolveLocalMediaPath } from "./local-roots-DY1lg2k6.js";
import { a as isPlatformMessageNotDispatchedError } from "./deliver-types-BGUCRKo2.js";
import { t as deriveDurableFinalDeliveryRequirements } from "./capabilities-CjTX8w_2.js";
import { p as resolveOutboundDurableFinalDeliverySupport, r as applyMessageSendingHook } from "./deliver-prepare-WWZ8N40u.js";
import { t as normalizeDeliverableOutboundChannel } from "./channel-resolution-C7D1XvuX.js";
import { c as createMessageSentEmitter } from "./delivery-queue-B6yQeeCg.js";
import { rt as normalizeEmptyPayloadForDelivery } from "./delivery-queue-reconciliation-EW7LAhB7.js";
import { n as deriveInboundMessageHookContext, r as resolveInboundReplyHookTarget } from "./message-hook-mappers-B6i6KSrI.js";
import { r as resolveMessageReceiptPrimaryId } from "./receipt-DSE0BXtY.js";
import "./deliver-BXG0uGi8.js";
import { t as sendDurableMessageBatch } from "./runtime-TCTjWbOA.js";
import { a as dispatchInboundMessageWithRoutedChannelDispatcher, f as isChannelPartialDeliveryError, u as createChannelDeliveryResultFromReceipt } from "./dispatch-hZ9KEJkT.js";
import { _ as recordChannelHistoryEntryWithMedia, f as clearChannelHistoryIfEnabled } from "./history-DLKGD0Dj.js";
import { t as recordInboundSession } from "./session-QL7UzAqR.js";
import { n as runWithSessionInitConflictRetry } from "./session-init-conflict-retry-D_-aTChM.js";
import { t as createChannelReplyPipeline } from "./reply-pipeline-BQrk7YNC.js";
import { t as isRecentOutboundMessageIdentity } from "./outbound-echo-C7XAomlW.js";
import { a as resolvePairLoopGuardSettings, r as createPairLoopGuard } from "./pair-loop-guard-runtime-D0pZ_1is.js";
import { r as hasVisibleChannelTurnDispatch, t as EMPTY_CHANNEL_TURN_DISPATCH_COUNTS } from "./dispatch-result-DaybJgme.js";
//#region src/channels/inbound-event/media.ts
const MAX_INBOUND_MEDIA_PROBES = 8;
const INBOUND_MEDIA_PROBE_CONCURRENCY = 2;
const INBOUND_MEDIA_PROBE_BUDGET_MS = 3e3;
function resolveMediaPlaceholderKind(media) {
	if (media.kind && media.kind !== "unknown") return media.kind;
	const inferredKind = kindFromMime(media.contentType) ?? kindFromMime(mimeTypeFromFilePath(media.url)) ?? kindFromMime(mimeTypeFromFilePath(media.path));
	return inferredKind && inferredKind !== "unknown" ? inferredKind : "attachment";
}
const PLURAL_MEDIA_PLACEHOLDER_LABELS = {
	image: "images",
	video: "videos",
	audio: "audio attachments",
	document: "files",
	sticker: "stickers",
	attachment: "attachments"
};
/** Renders structured media facts for channel surfaces that can carry text only. */
function formatMediaPlaceholderText(media) {
	if (media.length === 0) return "";
	const kinds = media.map(resolveMediaPlaceholderKind);
	const firstKind = kinds[0] ?? "attachment";
	const kind = kinds.every((candidate) => candidate === firstKind) ? firstKind : kinds.includes("attachment") ? "attachment" : "document";
	const tag = `<media:${kind}>`;
	return media.length === 1 ? tag : `${tag} (${media.length} ${PLURAL_MEDIA_PLACEHOLDER_LABELS[kind]})`;
}
/** Appends an unavailable-media notice to real caption text, or returns the notice alone. */
function formatInboundMediaUnavailableText(params) {
	const body = params.body?.trim() ?? "";
	const notice = params.notice.trim();
	if (!body) return notice;
	return `${body}\n\n${notice}`;
}
/** Normalizes plugin-provided attachments into ordered runtime facts. */
function toInboundMediaFacts(media, defaults = {}) {
	return normalizeMediaFacts(media, defaults);
}
function resolveProbeKind(media) {
	const kind = media.kind ?? kindFromMime(media.contentType) ?? kindFromMime(mimeTypeFromFilePath(media.path));
	return kind === "audio" || kind === "video" ? kind : void 0;
}
/** Adds best-effort audio/video metadata without probing URL-only media. */
async function toInboundMediaFactsWithMetadata(media, defaults = {}) {
	const facts = toInboundMediaFacts(media, defaults);
	const enriched = [...facts];
	const candidates = [];
	for (const [index, fact] of facts.entries()) {
		const kind = resolveProbeKind(fact);
		const localPath = fact.path ? resolveLocalMediaPath(fact.path) : void 0;
		if (kind && localPath) candidates.push({
			fact,
			index,
			kind,
			localPath
		});
	}
	const metadata = await probeMediaFilesWithinBudget(candidates.map((candidate) => ({
		filePath: candidate.localPath,
		kind: candidate.kind
	})), {
		budgetMs: INBOUND_MEDIA_PROBE_BUDGET_MS,
		concurrency: INBOUND_MEDIA_PROBE_CONCURRENCY,
		maxProbes: MAX_INBOUND_MEDIA_PROBES
	});
	for (const [candidateIndex, candidate] of candidates.entries()) enriched[candidate.index] = {
		...candidate.fact,
		...metadata[candidateIndex]
	};
	return enriched;
}
/** Projects facts into history without transient turn-only fields. */
function toHistoryMediaEntries(media, defaults = {}) {
	return toInboundMediaFacts(media, defaults).map((entry) => {
		const historyEntry = {
			path: entry.path,
			url: entry.url,
			contentType: entry.contentType,
			kind: entry.kind,
			messageId: entry.messageId
		};
		if (entry.durationMs) historyEntry.durationMs = entry.durationMs;
		if (entry.width) historyEntry.width = entry.width;
		if (entry.height) historyEntry.height = entry.height;
		return historyEntry;
	});
}
/**
* Builds the legacy singular/plural environment projection.
* @deprecated Pass ordered facts as `media`; use `toInboundMediaFacts` to normalize inputs.
*/
function buildChannelInboundMediaPayload(media) {
	return projectMediaFacts(media);
}
//#endregion
//#region src/channels/turn/durable-delivery.ts
function resolveDeliveryTarget(params) {
	return normalizeOptionalString(params.to) ?? normalizeOptionalString(params.ctxPayload.OriginatingTo) ?? normalizeOptionalString(params.ctxPayload.To);
}
function resolveDurableInboundReplyToId(params) {
	if (params.replyToId === null || params.payload.replyToId === null) return null;
	return normalizeOptionalString(params.replyToId) ?? normalizeOptionalString(params.payload.replyToId) ?? normalizeOptionalString(params.ctxPayload.ReplyToIdFull) ?? normalizeOptionalString(params.ctxPayload.ReplyToId);
}
function resolveDurableInboundReplyThreadId(params) {
	if ("threadId" in params) return params.threadId;
	return params.ctxPayload.MessageThreadId;
}
function stringifyThreadId(value) {
	return value == null ? void 0 : String(value);
}
function toDeliveryIntent(intent) {
	return {
		id: intent.id,
		kind: "outbound_queue",
		queuePolicy: intent.queuePolicy
	};
}
function resolveDurableSuppression(send) {
	const hookEffect = send.payloadOutcomes?.find((outcome) => outcome.status === "suppressed")?.hookEffect;
	return {
		reason: send.reason,
		...hookEffect?.cancelReason ? { cancelReason: hookEffect.cancelReason } : {},
		...hookEffect?.metadata ? { metadata: hookEffect.metadata } : {}
	};
}
/** Narrows durable delivery results that handled the payload without caller fallback. */
function isDurableInboundReplyDeliveryHandled(result) {
	return result.status === "handled_visible" || result.status === "handled_no_send";
}
/** Throws failed durable delivery results, preserving visible-send metadata when applicable. */
function throwIfDurableInboundReplyDeliveryFailed(result) {
	if (result.status === "failed") throw result.sentBeforeError === true ? markDurableInboundReplyDeliveryErrorVisible(result.error) : result.error;
}
function markDurableInboundReplyDeliveryErrorVisible(error) {
	if (typeof error === "object" && error !== null && Object.isExtensible(error)) {
		Object.assign(error, {
			sentBeforeError: true,
			visibleReplySent: true
		});
		return error;
	}
	const visibleError = new Error("visible durable reply delivery failed", { cause: error });
	Object.assign(visibleError, {
		sentBeforeError: true,
		visibleReplySent: true
	});
	return visibleError;
}
/** Delivers final inbound replies through the durable message-send context when supported. */
async function deliverInboundReplyWithMessageSendContext(params) {
	if (params.info.kind !== "final") return {
		status: "not_applicable",
		reason: "non_final"
	};
	const channel = normalizeDeliverableOutboundChannel(params.channel);
	const to = resolveDeliveryTarget(params);
	if (!channel) return {
		status: "unsupported",
		reason: "missing_channel"
	};
	if (!to) return {
		status: "unsupported",
		reason: "missing_target"
	};
	const replyToId = resolveDurableInboundReplyToId(params);
	const threadId = resolveDurableInboundReplyThreadId(params);
	const requiredCapabilities = params.requiredCapabilities ?? deriveDurableFinalDeliveryRequirements({
		payload: params.payload,
		replyToId,
		threadId,
		silent: params.silent
	});
	const durability = requiredCapabilities.reconcileUnknownSend === true ? "required" : "best_effort";
	let support;
	try {
		support = await resolveOutboundDurableFinalDeliverySupport({
			cfg: params.cfg,
			channel,
			requirements: requiredCapabilities
		});
	} catch (err) {
		return {
			status: "failed",
			error: err
		};
	}
	if (!support.ok) return {
		status: "unsupported",
		reason: support.reason,
		...support.capability ? { capability: support.capability } : {}
	};
	const session = buildOutboundSessionContext({
		cfg: params.cfg,
		sessionKey: params.ctxPayload.SessionKey,
		policySessionKey: params.ctxPayload.RuntimePolicySessionKey,
		conversationType: params.ctxPayload.ChatType,
		agentId: params.agentId,
		requesterAccountId: params.accountId ?? params.ctxPayload.AccountId,
		requesterSenderId: params.ctxPayload.SenderId ?? params.ctxPayload.From,
		requesterSenderName: params.ctxPayload.SenderName,
		requesterSenderUsername: params.ctxPayload.SenderUsername,
		requesterSenderE164: params.ctxPayload.SenderE164
	});
	const send = await sendDurableMessageBatch({
		cfg: params.cfg,
		channel,
		to,
		accountId: params.accountId,
		payloads: [params.payload],
		threadId,
		replyToId,
		replyToMode: params.replyToMode,
		formatting: params.formatting,
		identity: params.identity,
		deps: params.deps,
		mediaAccess: params.mediaAccess,
		silent: params.silent,
		durability,
		...durability === "required" ? { requireUnknownSendReconciliation: true } : {},
		session,
		gatewayClientScopes: params.ctxPayload.GatewayClientScopes ?? []
	});
	if (send.status === "failed") return {
		status: "failed",
		error: send.error
	};
	if (send.status === "partial_failed") return {
		status: "failed",
		error: markDurableInboundReplyDeliveryErrorVisible(send.error),
		sentBeforeError: true
	};
	const receiptDelivery = createChannelDeliveryResultFromReceipt({
		receipt: send.receipt,
		threadId: stringifyThreadId(threadId),
		...replyToId ? { replyToId } : {},
		visibleReplySent: send.status === "sent",
		...send.deliveryIntent ? { deliveryIntent: toDeliveryIntent(send.deliveryIntent) } : {}
	});
	const delivery = send.status === "suppressed" ? {
		...receiptDelivery,
		suppression: resolveDurableSuppression(send)
	} : receiptDelivery;
	if (send.status === "suppressed") return {
		status: "handled_no_send",
		reason: "no_visible_result",
		delivery
	};
	return {
		status: "handled_visible",
		delivery
	};
}
//#endregion
//#region src/channels/turn/bot-loop-protection.ts
const channelBotPairLoopGuard = createPairLoopGuard({ pruneIntervalMs: 6e4 });
/** Records a bot pair interaction and returns whether the loop guard should suppress it. */
function recordChannelBotPairLoopAndCheckSuppression(params) {
	return channelBotPairLoopGuard.recordAndCheck({
		scopeId: params.scopeId,
		conversationId: params.conversationId,
		senderId: params.senderId,
		receiverId: params.receiverId,
		settings: resolvePairLoopGuardSettings({
			config: params.config,
			defaultsConfig: params.defaultsConfig,
			defaultEnabled: params.defaultEnabled
		}),
		nowMs: params.nowMs
	});
}
//#endregion
//#region src/channels/turn/execution.ts
const NO_ADDITIONAL_DELIVERY_SIGNALS = {};
const log = createSubsystemLogger("channels/turn/execution");
function emit$1(params) {
	params.log?.({
		channel: params.channel,
		accountId: params.accountId,
		...params.event
	});
}
function clearPendingHistoryAfterTurn(params) {
	if (!params?.isGroup || !params.historyKey || !params.historyMap || params.limit === void 0) return;
	clearChannelHistoryIfEnabled({
		historyMap: params.historyMap,
		historyKey: params.historyKey,
		limit: params.limit
	});
}
function resolveObserveOnlyDispatchResult(params) {
	return params.observeOnlyDispatchResult ?? {
		queuedFinal: false,
		counts: EMPTY_CHANNEL_TURN_DISPATCH_COUNTS
	};
}
function isSystemChannelTurn(ctx) {
	return ctx.Provider === "heartbeat" || ctx.Provider === "cron-event" || ctx.Provider === "exec-event";
}
function resolveRecordSessionKey(params) {
	const explicitSessionKey = params.record?.sessionKey;
	if (explicitSessionKey === void 0) return params.ctxPayload.SessionKey ?? params.routeSessionKey;
	const normalizedSessionKey = explicitSessionKey.trim();
	if (!normalizedSessionKey) throw new Error("Channel turn record.sessionKey must be non-empty.");
	if (normalizedSessionKey !== explicitSessionKey) throw new Error("Channel turn record.sessionKey must not include surrounding whitespace.");
	return explicitSessionKey;
}
function maybeWarnZeroCountVisibleDispatch(params) {
	if (params.admission?.kind === "observeOnly" || isSystemChannelTurn(params.ctxPayload)) return;
	const dispatchResult = params.dispatchResult;
	if (hasVisibleChannelTurnDispatch(dispatchResult, NO_ADDITIONAL_DELIVERY_SIGNALS)) return;
	log.warn(`visible channel turn dispatched with no queued reply payloads: channel=${params.channel} messageId=${params.messageId ?? "unknown"} sessionKey=${params.ctxPayload.SessionKey ?? params.routeSessionKey}`);
	emit$1({
		...params,
		event: {
			stage: "dispatch",
			event: "warning",
			messageId: params.messageId,
			sessionKey: params.ctxPayload.SessionKey ?? params.routeSessionKey,
			admission: params.admission?.kind ?? "dispatch",
			reason: "zero-count-visible-dispatch"
		}
	});
}
function resolveBotLoopProtectionDrop(params) {
	if (!params.botLoopProtection) return;
	if (!recordChannelBotPairLoopAndCheckSuppression(params.botLoopProtection).suppressed) return;
	const admission = {
		kind: "drop",
		reason: "bot-loop-protection"
	};
	emit$1({
		...params,
		event: {
			stage: "authorize",
			event: "drop",
			messageId: params.messageId,
			sessionKey: params.ctxPayload.SessionKey ?? params.routeSessionKey,
			admission: admission.kind,
			reason: admission.reason
		}
	});
	return {
		admission,
		dispatched: false,
		ctxPayload: params.ctxPayload,
		routeSessionKey: params.routeSessionKey
	};
}
function resolveOutboundEchoDrop(params) {
	const conversationId = [params.ctxPayload.NativeChannelId, params.ctxPayload.ChatId].find((value) => typeof value === "string" && value.trim().length > 0);
	if (!conversationId) return;
	const matchedMessageId = [
		params.messageId,
		params.ctxPayload.MessageSidFull,
		params.ctxPayload.MessageSid
	].find((messageId) => typeof messageId === "string" && isRecentOutboundMessageIdentity({
		channel: params.channel,
		accountId: params.accountId,
		conversationId,
		messageId
	}));
	const sourceId = params.outboundEchoSourceId?.trim();
	const matchesSource = sourceId ? isRecentOutboundMessageIdentity({
		channel: params.channel,
		accountId: params.accountId,
		conversationId,
		sourceId
	}) : false;
	if (!matchedMessageId && !matchesSource) return;
	const admission = {
		kind: "drop",
		reason: "outbound-echo"
	};
	emit$1({
		...params,
		event: {
			stage: "authorize",
			event: "drop",
			messageId: params.messageId ?? matchedMessageId,
			sessionKey: params.ctxPayload.SessionKey ?? params.routeSessionKey,
			admission: admission.kind,
			reason: admission.reason
		}
	});
	return {
		admission,
		dispatched: false,
		ctxPayload: params.ctxPayload,
		routeSessionKey: params.routeSessionKey
	};
}
async function runPreparedChannelTurnCore(params, options) {
	return await runWithDiagnosticTraceContext(createDiagnosticTraceContextFromActiveScope(), () => runPreparedChannelTurnCoreInTrace(params, options));
}
async function runPreparedChannelTurnCoreInTrace(params, options) {
	const admission = params.admission ?? { kind: "dispatch" };
	const outboundEchoDrop = resolveOutboundEchoDrop(params);
	if (outboundEchoDrop) {
		clearPendingHistoryAfterTurn(params.history);
		await params.runDispatchLifecycle?.onDispatchSkipped("outboundEcho");
		return outboundEchoDrop;
	}
	const botLoopDrop = resolveBotLoopProtectionDrop(params);
	if (botLoopDrop) {
		clearPendingHistoryAfterTurn(params.history);
		await params.runDispatchLifecycle?.onDispatchSkipped("botLoopProtection");
		return botLoopDrop;
	}
	const recordSessionKey = resolveRecordSessionKey(params);
	if (params.ctxPayload.SessionTranscriptContext) {
		const { mergeSessionTranscriptContext } = await import("./session-transcript-context.runtime.js");
		await mergeSessionTranscriptContext({
			agentId: params.ctxPayload.AgentId,
			ctx: params.ctxPayload,
			sessionKey: recordSessionKey,
			storePath: params.storePath
		});
	}
	emit$1({
		...params,
		event: {
			stage: "record",
			event: "start",
			messageId: params.messageId,
			sessionKey: recordSessionKey,
			admission: admission.kind
		}
	});
	try {
		await params.recordInboundSession({
			storePath: params.storePath,
			sessionKey: recordSessionKey,
			ctx: params.ctxPayload,
			groupResolution: params.record?.groupResolution,
			createIfMissing: params.record?.createIfMissing,
			updateLastRoute: params.record?.updateLastRoute,
			onRecordError: params.record?.onRecordError ?? (() => void 0),
			trackSessionMetaTask: params.record?.trackSessionMetaTask
		});
		emit$1({
			...params,
			event: {
				stage: "record",
				event: "done",
				messageId: params.messageId,
				sessionKey: recordSessionKey,
				admission: admission.kind
			}
		});
		await params.afterRecord?.();
	} catch (err) {
		emit$1({
			...params,
			event: {
				stage: "record",
				event: "error",
				messageId: params.messageId,
				sessionKey: recordSessionKey,
				admission: admission.kind,
				error: err
			}
		});
		try {
			await params.onPreDispatchFailure?.(err);
		} catch {}
		throw err;
	}
	emit$1({
		...params,
		event: {
			stage: "dispatch",
			event: "start",
			messageId: params.messageId,
			sessionKey: params.ctxPayload.SessionKey ?? params.routeSessionKey,
			admission: admission.kind
		}
	});
	let dispatchResult;
	try {
		if (admission.kind === "observeOnly" && !options.suppressObserveOnlyDispatch) await params.runDispatch();
		else if (admission.kind === "observeOnly") await params.runDispatchLifecycle?.onDispatchSkipped("observeOnly");
		dispatchResult = admission.kind === "observeOnly" ? resolveObserveOnlyDispatchResult(params) : await params.runDispatch();
		maybeWarnZeroCountVisibleDispatch({
			...params,
			admission,
			dispatchResult
		});
	} catch (err) {
		emit$1({
			...params,
			event: {
				stage: "dispatch",
				event: "error",
				messageId: params.messageId,
				sessionKey: params.ctxPayload.SessionKey ?? params.routeSessionKey,
				admission: admission.kind,
				error: err
			}
		});
		throw err;
	}
	emit$1({
		...params,
		event: {
			stage: "dispatch",
			event: "done",
			messageId: params.messageId,
			sessionKey: params.ctxPayload.SessionKey ?? params.routeSessionKey,
			admission: admission.kind
		}
	});
	clearPendingHistoryAfterTurn(params.history);
	return {
		admission,
		dispatched: true,
		ctxPayload: params.ctxPayload,
		routeSessionKey: params.routeSessionKey,
		dispatchResult
	};
}
async function runPreparedChannelTurn(params) {
	return await runPreparedChannelTurnCore(params, { suppressObserveOnlyDispatch: true });
}
const runPreparedInboundReply$1 = runPreparedChannelTurn;
//#endregion
//#region src/channels/turn/lifecycle.ts
function resolvePartialChannelDeliveryResult(error) {
	return isChannelPartialDeliveryError(error) ? error.deliveryResult : void 0;
}
function assembleResolvedChannelTurn(value) {
	if (!("route" in value)) return value;
	if ("runDispatch" in value) {
		const { cfg, route, ...turn } = value;
		return {
			...turn,
			ctxPayload: route.dmScope ? {
				...turn.ctxPayload,
				DmScope: route.dmScope
			} : turn.ctxPayload,
			routeSessionKey: route.sessionKey,
			storePath: resolveStorePath(cfg.session?.store, { agentId: route.agentId }),
			recordInboundSession
		};
	}
	const { cfg, route, ...turn } = value;
	return {
		...turn,
		ctxPayload: route.dmScope ? {
			...turn.ctxPayload,
			DmScope: route.dmScope
		} : turn.ctxPayload,
		cfg,
		agentId: route.agentId,
		routeSessionKey: route.sessionKey,
		storePath: resolveStorePath(cfg.session?.store, { agentId: route.agentId }),
		recordInboundSession
	};
}
function resolveAssembledReplyPipeline(params) {
	const turnAdoptionLifecycle = params.turnAdoptionLifecycle ?? params.replyOptions?.turnAdoptionLifecycle;
	if (!params.replyPipeline) return {
		dispatcherOptions: params.dispatcherOptions,
		replyOptions: turnAdoptionLifecycle ? {
			...params.replyOptions,
			turnAdoptionLifecycle
		} : params.replyOptions
	};
	const { onModelSelected, ...replyPipeline } = createChannelReplyPipeline({
		cfg: params.cfg,
		agentId: params.agentId,
		channel: params.channel,
		accountId: params.accountId,
		...params.replyPipeline
	});
	return {
		dispatcherOptions: {
			...replyPipeline,
			...params.dispatcherOptions
		},
		replyOptions: {
			onModelSelected,
			...params.replyOptions,
			...turnAdoptionLifecycle ? { turnAdoptionLifecycle } : {}
		}
	};
}
function isExplicitlyNonVisibleChannelDelivery(result) {
	return typeof result === "object" && result !== null && !Array.isArray(result) && result.visibleReplySent === false;
}
function markChannelDeliveryErrorVisible(error) {
	if (typeof error === "object" && error !== null && !Array.isArray(error)) try {
		Object.assign(error, {
			sentBeforeError: true,
			visibleReplySent: true
		});
		return error;
	} catch {}
	const visibleError = new Error("visible channel reply delivery failed", { cause: error });
	Object.assign(visibleError, {
		sentBeforeError: true,
		visibleReplySent: true
	});
	return visibleError;
}
async function runChannelDeliveryObserver(params) {
	if (!params.onDelivered) return;
	try {
		await params.onDelivered(params.payload, params.info, params.result);
	} catch (error) {
		throw isExplicitlyNonVisibleChannelDelivery(params.result) ? error : markChannelDeliveryErrorVisible(error);
	}
}
function resolveChannelDeliveryMessageId(result) {
	return result?.receipt ? resolveMessageReceiptPrimaryId(result.receipt) : result?.messageIds?.find((messageId) => messageId.trim());
}
async function settleChannelDeliveryAttempts(params) {
	let preferredSettlementError;
	for (const attempt of params.attempts) try {
		const finalized = await settleChannelDeliveryAttempt({
			attempt,
			onDelivered: params.delivery.onDelivered,
			onFinalizationError: async (error) => {
				await Promise.resolve(params.delivery.onError?.(error, attempt.info));
			},
			emitMessageSent: params.emitMessageSent
		});
		params.onSettled?.(attempt.info, finalized);
	} catch (error) {
		if (preferredSettlementError === void 0 || resolvePartialChannelDeliveryResult(error) !== void 0 && resolvePartialChannelDeliveryResult(preferredSettlementError) === void 0) preferredSettlementError = error;
	}
	if (preferredSettlementError !== void 0) throw toErrorObject(preferredSettlementError, "channel delivery settlement failed");
}
async function settleChannelDeliveryAttempt(params) {
	const { attempt } = params;
	if ("error" in attempt) {
		const partial = resolvePartialChannelDeliveryResult(attempt.error);
		if (!isPlatformMessageNotDispatchedError(attempt.error)) params.emitMessageSent?.({
			success: false,
			content: partial?.content ?? attempt.payload.text ?? "",
			error: formatErrorMessage(attempt.error),
			messageId: resolveChannelDeliveryMessageId(partial)
		});
		return;
	}
	let finalized;
	try {
		const result = attempt.result;
		finalized = result ? result.finalization ? {
			...result,
			...await result.finalization,
			finalization: void 0
		} : result : void 0;
	} catch (error) {
		try {
			await params.onFinalizationError?.(error);
		} catch {}
		const partial = resolvePartialChannelDeliveryResult(error);
		if (!isPlatformMessageNotDispatchedError(error)) params.emitMessageSent?.({
			success: false,
			content: partial?.content ?? attempt.payload.text ?? "",
			error: formatErrorMessage(error),
			messageId: resolveChannelDeliveryMessageId(partial)
		});
		throw toErrorObject(error, "channel delivery finalization failed");
	}
	if (!isExplicitlyNonVisibleChannelDelivery(finalized)) params.emitMessageSent?.({
		success: true,
		content: finalized?.content ?? attempt.payload.text ?? "",
		messageId: resolveChannelDeliveryMessageId(finalized)
	});
	await runChannelDeliveryObserver({
		onDelivered: params.onDelivered,
		payload: attempt.payload,
		info: attempt.info,
		result: finalized
	});
	return finalized;
}
function createSuppressedChannelDeliveryResult(params) {
	return {
		visibleReplySent: false,
		suppression: {
			reason: params.reason,
			...params.cancelReason ? { cancelReason: params.cancelReason } : {},
			...params.metadata ? { metadata: params.metadata } : {}
		}
	};
}
async function applyRoutedDirectMessageSending(params) {
	const hookRunner = getGlobalHookRunner();
	const hookCtx = deriveInboundMessageHookContext(params.turn.ctxPayload);
	const hookResult = await applyMessageSendingHook({
		hookRunner,
		enabled: hookRunner?.hasHooks("message_sending") ?? false,
		payload: params.payload,
		payloadSummary: summarizeOutboundPayloadForTransport(params.payload),
		to: resolveInboundReplyHookTarget(params.turn.ctxPayload, hookCtx),
		channel: params.turn.channel,
		accountId: params.turn.accountId,
		replyToId: params.payload.replyToId ?? params.turn.ctxPayload.ReplyToIdFull ?? params.turn.ctxPayload.ReplyToId,
		threadId: params.turn.ctxPayload.MessageThreadId,
		sessionKey: params.turn.routeSessionKey
	});
	if (hookResult.cancelled) return {
		payload: params.payload,
		suppression: createSuppressedChannelDeliveryResult({
			reason: "cancelled_by_message_sending_hook",
			cancelReason: hookResult.cancelReason,
			metadata: hookResult.hookMetadata
		})
	};
	const payload = normalizeEmptyPayloadForDelivery(hookResult.payload);
	if (!payload) return {
		payload: hookResult.payload,
		suppression: createSuppressedChannelDeliveryResult({ reason: hookResult.contentRewritten ? "empty_after_message_sending_hook" : "no_visible_payload" })
	};
	return { payload };
}
function reconcileNonVisibleChannelDeliveries(result, nonVisibleCounts) {
	const counts = {
		tool: Math.max(0, result.counts.tool - nonVisibleCounts.tool),
		block: Math.max(0, result.counts.block - nonVisibleCounts.block),
		final: Math.max(0, result.counts.final - nonVisibleCounts.final)
	};
	return {
		...result,
		queuedFinal: result.queuedFinal && counts.final > 0,
		counts
	};
}
function createObserveOnlyDeliveryAdapter() {
	return { deliver: async () => ({ visibleReplySent: false }) };
}
async function dispatchChannelTurnWithDeliveryOwner(...args) {
	const [params, ownership] = args;
	const replyPipeline = resolveAssembledReplyPipeline(params);
	const turnAdoptionLifecycle = params.turnAdoptionLifecycle ?? params.replyOptions?.turnAdoptionLifecycle;
	const delivery = params.admission?.kind === "observeOnly" ? createObserveOnlyDeliveryAdapter() : params.delivery;
	const pendingDeliveryAttempts = [];
	const nonVisibleDeliveryCounts = {
		tool: 0,
		block: 0,
		final: 0
	};
	const recordSettledDelivery = (info, result) => {
		if (isExplicitlyNonVisibleChannelDelivery(result)) nonVisibleDeliveryCounts[info.kind] += 1;
	};
	let agentRunId;
	const onAgentRunStart = replyPipeline.replyOptions?.onAgentRunStart;
	const replyOptions = delivery.observeMessageSent ? {
		...replyPipeline.replyOptions,
		onAgentRunStart: (runId) => {
			agentRunId = runId;
			onAgentRunStart?.(runId);
		}
	} : replyPipeline.replyOptions;
	const hookCtx = delivery.observeMessageSent ? deriveInboundMessageHookContext(params.ctxPayload) : void 0;
	let messageSentEmitter;
	const getMessageSentEmitter = () => {
		if (!delivery.observeMessageSent || !hookCtx) return;
		messageSentEmitter ??= createMessageSentEmitter({
			hookRunner: getGlobalHookRunner(),
			channel: params.channel,
			to: resolveInboundReplyHookTarget(params.ctxPayload, hookCtx),
			accountId: params.accountId,
			sessionKeyForInternalHooks: params.routeSessionKey,
			runId: agentRunId,
			isGroup: hookCtx.isGroup,
			groupId: hookCtx.groupId,
			logPrefix: "dispatchAssembledChannelTurn"
		});
		return messageSentEmitter;
	};
	return await runPreparedChannelTurnCore({
		channel: params.channel,
		accountId: params.accountId,
		routeSessionKey: params.routeSessionKey,
		storePath: params.storePath,
		ctxPayload: params.ctxPayload,
		recordInboundSession: params.recordInboundSession,
		afterRecord: params.afterRecord,
		record: params.record,
		history: params.history,
		admission: params.admission,
		botLoopProtection: params.botLoopProtection,
		outboundEchoSourceId: params.outboundEchoSourceId,
		log: params.log,
		messageId: params.messageId,
		...turnAdoptionLifecycle ? { runDispatchLifecycle: {
			turnAdoptionLifecycle,
			onDispatchSkipped: async () => await turnAdoptionLifecycle.onAdopted()
		} } : {},
		runDispatch: async () => {
			let dispatchResult;
			let dispatchError;
			try {
				dispatchResult = await runWithSessionInitConflictRetry(() => (ownership === "routed-delivery" ? dispatchInboundMessageWithRoutedChannelDispatcher : params.dispatchReplyWithBufferedBlockDispatcher)({
					ctx: params.ctxPayload,
					cfg: params.cfg,
					...ownership === "routed-delivery" ? {
						...params.admission?.kind === "observeOnly" ? { suppressOutboundHooks: true } : {},
						onReplyPayloadSuppressed: async (payload, info, reason) => {
							await runChannelDeliveryObserver({
								onDelivered: delivery.onDelivered,
								payload,
								info,
								result: createSuppressedChannelDeliveryResult({ reason })
							});
						}
					} : {},
					dispatcherOptions: {
						...replyPipeline.dispatcherOptions,
						deliver: async (payload, info) => {
							const preparedPayload = delivery.preparePayload ? await delivery.preparePayload(payload, info) : payload;
							if (preparedPayload === null) {
								const suppression = createSuppressedChannelDeliveryResult({ reason: "no_visible_payload" });
								await runChannelDeliveryObserver({
									onDelivered: delivery.onDelivered,
									payload,
									info,
									result: suppression
								});
								recordSettledDelivery(info, suppression);
								return suppression;
							}
							const declaredDurable = "durable" in delivery ? delivery.durable : void 0;
							const durableOptions = typeof declaredDurable === "function" ? await declaredDurable(preparedPayload, info) : declaredDurable;
							if (durableOptions) {
								const durable = await deliverInboundReplyWithMessageSendContext({
									cfg: params.cfg,
									channel: params.channel,
									accountId: params.accountId,
									agentId: params.agentId,
									ctxPayload: params.ctxPayload,
									payload: preparedPayload,
									info,
									...durableOptions
								});
								throwIfDurableInboundReplyDeliveryFailed(durable);
								if (isDurableInboundReplyDeliveryHandled(durable)) {
									await runChannelDeliveryObserver({
										onDelivered: delivery.onDelivered,
										payload: preparedPayload,
										info,
										result: durable.delivery
									});
									recordSettledDelivery(info, durable.delivery);
									return durable.delivery;
								}
							}
							let effectivePayload = preparedPayload;
							let result = void 0;
							try {
								if (ownership === "routed-delivery" && "deliverWithProviderMessageSending" in delivery && delivery.deliverWithProviderMessageSending) result = await delivery.deliverWithProviderMessageSending(effectivePayload, info);
								else {
									if (ownership === "routed-delivery" && params.admission?.kind !== "observeOnly") {
										const hook = await applyRoutedDirectMessageSending({
											turn: params,
											payload: effectivePayload
										});
										effectivePayload = hook.payload;
										if (hook.suppression) result = hook.suppression;
									}
									if (!result) {
										if (!("deliver" in delivery) || !delivery.deliver) throw new Error("channel delivery adapter is missing a direct deliverer");
										result = await delivery.deliver(effectivePayload, info);
									}
								}
							} catch (error) {
								if (delivery.observeMessageSent) await settleChannelDeliveryAttempt({
									attempt: {
										payload: effectivePayload,
										info,
										error
									},
									onDelivered: delivery.onDelivered,
									emitMessageSent: getMessageSentEmitter()?.emitMessageSent
								});
								throw error;
							}
							if (result?.finalization) {
								result.finalization.catch(() => void 0);
								pendingDeliveryAttempts.push({
									payload: effectivePayload,
									info,
									result
								});
							} else if (delivery.observeMessageSent) {
								const finalized = await settleChannelDeliveryAttempt({
									attempt: {
										payload: effectivePayload,
										info,
										result
									},
									onDelivered: delivery.onDelivered,
									emitMessageSent: getMessageSentEmitter()?.emitMessageSent
								});
								recordSettledDelivery(info, finalized);
							} else {
								await runChannelDeliveryObserver({
									onDelivered: delivery.onDelivered,
									payload: effectivePayload,
									info,
									result
								});
								recordSettledDelivery(info, result ?? void 0);
							}
							return result;
						},
						onError: delivery.onError
					},
					toolsAllow: params.toolsAllow,
					replyOptions,
					replyResolver: params.replyResolver
				}), params.sessionInitRetry ? {
					retryDelaysMs: params.sessionInitRetry.delaysMs,
					signal: params.sessionInitRetry.signal,
					sleep: params.sessionInitRetry.sleep
				} : void 0);
			} catch (error) {
				dispatchError = error;
			}
			let settlementError;
			try {
				await settleChannelDeliveryAttempts({
					attempts: pendingDeliveryAttempts,
					delivery,
					emitMessageSent: getMessageSentEmitter()?.emitMessageSent,
					onSettled: recordSettledDelivery
				});
			} catch (error) {
				settlementError = error;
			}
			if (settlementError !== void 0 && resolvePartialChannelDeliveryResult(settlementError) !== void 0) throw toErrorObject(settlementError, "channel delivery settlement failed");
			if (dispatchError !== void 0) throw toErrorObject(dispatchError, "channel dispatch failed");
			if (settlementError !== void 0) throw toErrorObject(settlementError, "channel delivery settlement failed");
			return ownership === "routed-delivery" ? reconcileNonVisibleChannelDeliveries(dispatchResult, nonVisibleDeliveryCounts) : dispatchResult;
		}
	}, { suppressObserveOnlyDispatch: false });
}
async function dispatchAssembledChannelTurn$1(params) {
	return await dispatchChannelTurnWithDeliveryOwner(params, "legacy-dispatcher");
}
async function dispatchRoutedChannelTurn(params) {
	return await dispatchChannelTurnWithDeliveryOwner(assembleResolvedChannelTurn(params), "routed-delivery");
}
//#endregion
//#region src/channels/turn/kernel.ts
function dispatchAssembledChannelTurn(params) {
	return dispatchAssembledChannelTurn$1(params);
}
const dispatchChannelInboundReply = dispatchAssembledChannelTurn;
function dispatchChannelInboundTurn(plan) {
	return dispatchRoutedChannelTurn(plan);
}
const runPreparedInboundReply = runPreparedInboundReply$1;
const DEFAULT_EVENT_CLASS = {
	kind: "message",
	canStartAgentTurn: true
};
function isAdmission(value) {
	if (!value || typeof value !== "object") return false;
	const kind = value.kind;
	return kind === "dispatch" || kind === "observeOnly" || kind === "handled" || kind === "drop";
}
function normalizePreflight(value) {
	if (!value) return {};
	if (isAdmission(value)) return { admission: value };
	return value;
}
function assertPreparedDispatchLifecycle(turn, turnAdoptionLifecycle) {
	const lifecycle = turn.runDispatchLifecycle;
	if (!lifecycle) throw new Error("runChannelInboundEvent prepared turns must declare runDispatchLifecycle when creating runDispatch");
	if (turnAdoptionLifecycle && lifecycle.turnAdoptionLifecycle !== turnAdoptionLifecycle) throw new Error("runChannelInboundEvent prepared turn runDispatchLifecycle must own the top-level turnAdoptionLifecycle");
}
function emit(params) {
	params.log?.({
		channel: params.channel,
		accountId: params.accountId,
		...params.event
	});
}
function resolveDroppedHistorySender(input, preflight) {
	return preflight.message?.senderLabel ?? preflight.message?.envelopeFrom ?? (typeof input.raw === "object" && input.raw && "sender" in input.raw && typeof input.raw.sender === "string" ? input.raw.sender : void 0) ?? "unknown";
}
function resolveDroppedHistoryBody(input, preflight) {
	return preflight.message?.bodyForAgent ?? preflight.message?.body ?? preflight.message?.rawBody ?? input.textForAgent ?? input.rawText;
}
async function recordDroppedChannelTurnHistory(params) {
	const admission = params.admission ?? params.preflight.admission;
	if (admission?.kind !== "drop") return;
	const history = params.preflight.history;
	if (!history || history.limit <= 0 || !(history.recordOnDrop || admission.recordHistory)) return;
	const body = resolveDroppedHistoryBody(params.input, params.preflight);
	const entry = body.trim().length > 0 ? {
		sender: resolveDroppedHistorySender(params.input, params.preflight),
		body,
		timestamp: params.input.timestamp,
		messageId: params.input.id
	} : null;
	const media = params.preflight.media;
	await recordChannelHistoryEntryWithMedia({
		historyMap: history.historyMap,
		historyKey: history.key,
		limit: history.limit,
		entry,
		mediaLimit: history.mediaLimit,
		messageId: params.input.id,
		shouldRecord: history.shouldRecord,
		media: typeof media === "function" ? async () => toHistoryMediaEntries(await media(), { messageId: params.input.id }) : toHistoryMediaEntries(media, { messageId: params.input.id })
	});
}
const recordDroppedChannelInboundHistory = recordDroppedChannelTurnHistory;
async function runChannelTurn(params) {
	emit({
		...params,
		event: {
			stage: "ingest",
			event: "start"
		}
	});
	const input = await params.adapter.ingest(params.raw);
	if (!input) {
		const admission = {
			kind: "drop",
			reason: "ingest-null"
		};
		emit({
			...params,
			event: {
				stage: "ingest",
				event: "drop",
				admission: admission.kind,
				reason: admission.reason
			}
		});
		return {
			admission,
			dispatched: false
		};
	}
	emit({
		...params,
		event: {
			stage: "ingest",
			event: "done",
			messageId: input.id
		}
	});
	const eventClass = await params.adapter.classify?.(input) ?? DEFAULT_EVENT_CLASS;
	if (!eventClass.canStartAgentTurn) {
		const admission = {
			kind: "handled",
			reason: `event:${eventClass.kind}`
		};
		emit({
			...params,
			event: {
				stage: "classify",
				event: "handled",
				messageId: input.id,
				admission: admission.kind,
				reason: admission.reason
			}
		});
		return {
			admission,
			dispatched: false
		};
	}
	const preflight = normalizePreflight(await params.adapter.preflight?.(input, eventClass));
	const preflightAdmission = preflight.admission;
	if (preflightAdmission && preflightAdmission.kind !== "dispatch" && preflightAdmission.kind !== "observeOnly") {
		await recordDroppedChannelTurnHistory({
			input,
			preflight,
			admission: preflightAdmission
		});
		emit({
			...params,
			event: {
				stage: "preflight",
				event: preflightAdmission.kind === "handled" ? "handled" : "drop",
				messageId: input.id,
				admission: preflightAdmission.kind,
				reason: preflightAdmission.reason
			}
		});
		return {
			admission: preflightAdmission,
			dispatched: false
		};
	}
	const unresolved = await params.adapter.resolveTurn(input, eventClass, preflight);
	const isRoutedTurn = "route" in unresolved && !("runDispatch" in unresolved);
	const resolved = assembleResolvedChannelTurn(unresolved);
	emit({
		...params,
		accountId: resolved.accountId ?? params.accountId,
		event: {
			stage: "assemble",
			event: "done",
			messageId: input.id,
			sessionKey: resolved.routeSessionKey,
			admission: resolved.admission?.kind ?? "dispatch"
		}
	});
	const admission = resolved.admission ?? preflightAdmission ?? { kind: "dispatch" };
	let result;
	try {
		if ("runDispatch" in resolved) assertPreparedDispatchLifecycle(resolved, params.turnAdoptionLifecycle);
		const dispatchResult = "runDispatch" in resolved ? await runPreparedInboundReply({
			...resolved,
			admission,
			log: params.log,
			messageId: input.id
		}) : isRoutedTurn ? await dispatchRoutedChannelTurn({
			...unresolved,
			admission,
			log: params.log,
			messageId: input.id,
			...params.turnAdoptionLifecycle ? { turnAdoptionLifecycle: params.turnAdoptionLifecycle } : {}
		}) : await dispatchAssembledChannelTurn({
			...resolved,
			admission,
			log: params.log,
			messageId: input.id,
			...params.turnAdoptionLifecycle ? { turnAdoptionLifecycle: params.turnAdoptionLifecycle } : {}
		});
		result = dispatchResult.dispatched ? {
			...dispatchResult,
			admission
		} : dispatchResult;
	} catch (err) {
		const failedResult = {
			admission,
			dispatched: false,
			ctxPayload: resolved.ctxPayload,
			routeSessionKey: resolved.routeSessionKey
		};
		try {
			await params.adapter.onFinalize?.(failedResult);
		} catch {}
		emit({
			...params,
			accountId: resolved.accountId ?? params.accountId,
			event: {
				stage: "finalize",
				event: "done",
				messageId: input.id,
				sessionKey: resolved.routeSessionKey,
				admission: admission.kind
			}
		});
		throw err;
	}
	try {
		await params.adapter.onFinalize?.(result);
		emit({
			...params,
			accountId: resolved.accountId ?? params.accountId,
			event: {
				stage: "finalize",
				event: "done",
				messageId: input.id,
				sessionKey: resolved.routeSessionKey,
				admission: admission.kind
			}
		});
	} catch (err) {
		emit({
			...params,
			accountId: resolved.accountId ?? params.accountId,
			event: {
				stage: "finalize",
				event: "error",
				messageId: input.id,
				sessionKey: resolved.routeSessionKey,
				admission: admission.kind,
				error: err
			}
		});
		throw err;
	}
	return result;
}
const runChannelInboundEvent = runChannelTurn;
//#endregion
export { runChannelInboundEvent as a, deliverInboundReplyWithMessageSendContext as c, buildChannelInboundMediaPayload as d, formatInboundMediaUnavailableText as f, toInboundMediaFactsWithMetadata as g, toInboundMediaFacts as h, recordDroppedChannelInboundHistory as i, isDurableInboundReplyDeliveryHandled as l, toHistoryMediaEntries as m, dispatchChannelInboundReply as n, runPreparedInboundReply as o, formatMediaPlaceholderText as p, dispatchChannelInboundTurn as r, recordChannelBotPairLoopAndCheckSuppression as s, dispatchAssembledChannelTurn as t, throwIfDurableInboundReplyDeliveryFailed as u };
