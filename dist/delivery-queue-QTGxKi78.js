import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { d as parseSessionDeliveryRoute, s as normalizeSessionPeerId } from "./session-key-utils-02xWdGSz.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { t as getGlobalHookRunner, v as fireAndForgetHook } from "./hook-runner-global-CRNklGqK.js";
import { n as stripTargetKindPrefix, r as stripTargetProviderPrefix, t as resolveTargetPrefixedChannel } from "./channel-target-prefix-DsuLTMRz.js";
import { m as triggerInternalHook, n as createInternalHookEvent } from "./internal-hooks-glvlO_hY.js";
import { i as isOutboundDeliveryError, r as countPhysicalOutboundSends, t as OutboundDeliveryError } from "./deliver-types-BGUCRKo2.js";
import { a as getErrnoCode, c as resolveDeliveryRecoveryDeadlineMs, i as findPlatformMessageRejectedError, n as createDeliveryRecoveryCoordinator, o as isDeliveryRecoveryRetryEligible, r as createEmptyDeliveryRecoverySummary, s as isProvenDeliveryNotSentError } from "./delivery-recovery.shared-5qX8QsGe.js";
import { n as resolveOutboundChannelMessageAdapter } from "./channel-resolution-9przSS8z.js";
import { C as failDeliveryBeforePlatformSend, D as loadPendingDeliveries, F as reserveDeliveryAttempt, H as renewDeliveryQueueEntryPlatformSendLease, J as buildPayloadSummary, M as markDeliveryPlatformSendAttemptStarted, O as loadPendingDelivery, P as moveToFailed, S as failDeliveryAfterPlatformSend, U as acceptedPreparedOutboundEntries, V as claimDeliveryQueueEntryPlatformSend, _ as claimDeliveryPlatformSendAttempt, a as markDurableDeliveryQueued, dt as runOutboundDeliveryCommitHooks, g as ackDelivery, i as failDurableDelivery, j as markDeliveryPlatformOutcomeUnknown, n as reconcileUnknownQueuedDelivery, o as rejectDurableDelivery, r as completeDurableDelivery, s as suppressDurableDelivery, t as buildUnknownSendContext, ut as isOutboundDeliveryResultArray, w as failPendingDelivery, x as failDelivery } from "./delivery-queue-reconciliation-C_fJ0Zgy.js";
import { d as toPluginMessageSentEvent, l as toPluginMessageContext, o as toInternalMessageSentContext, t as buildCanonicalSentMessageHookContext } from "./message-hook-mappers-B6i6KSrI.js";
import { a as OUTBOUND_DELIVERY_QUEUE_NAME, l as createDeliveryQueueMediaRecoveryLease, s as cancelDeliveryQueueMediaRecoveryLease } from "./delivery-queue-media-staging-BXDYd5bo.js";
import { r as releaseSpoolArtifacts, t as collectEntrySpoolPaths } from "./delivery-queue-media-spool-zRDf89Bg.js";
import { n as hasTrustedMessageAuditListeners, t as emitTrustedMessageAuditEvent } from "./message-audit-events-DZQxEKuQ.js";
//#region src/infra/outbound/deferred-delivery-admission.ts
function resolveDeferredDeliveryAdmission(params) {
	return resolveOutboundChannelMessageAdapter({
		channel: params.channel,
		cfg: params.cfg,
		allowBootstrap: true
	})?.durableFinal?.admitDeferredDelivery?.(params) ?? { status: "allowed" };
}
//#endregion
//#region src/infra/outbound/deliver-log.ts
const OUTBOUND_DELIVERY_LOG_SCOPE = ["deliver", "OutboundPayloads"].join("");
//#endregion
//#region src/infra/outbound/delivery-queue-platform-lease.ts
/** Claim and atomically upgrade a live reusable producer to renewable ownership. */
async function claimReusableDeliveryPlatformSendAttempt(id, stateDir) {
	return claimDeliveryQueueEntryPlatformSend({
		queueName: OUTBOUND_DELIVERY_QUEUE_NAME,
		id,
		stateDir,
		requiresProducerClaim: true
	});
}
/** Extend the exact active reusable producer lease without changing ownership. */
async function renewDeliveryPlatformSendLease(id, stateDir, claimId) {
	return renewDeliveryQueueEntryPlatformSendLease({
		queueName: OUTBOUND_DELIVERY_QUEUE_NAME,
		id,
		stateDir,
		claimId
	});
}
//#endregion
//#region src/infra/outbound/deliver-queue-state.ts
const log$1 = createSubsystemLogger("outbound/deliver");
const isAbortError = (err) => err instanceof Error && err.name === "AbortError";
const isDeliveryAbortError = (err) => isAbortError(err) || err instanceof OutboundDeliveryError && isAbortError(err.cause);
/** Keeps live and recovered queue transitions on the same producer claim. */
function createQueuedDeliveryOwner(params) {
	const resolveExpectedPlatformSendAttemptId = () => typeof params.expectedPlatformSendAttemptId === "function" ? params.expectedPlatformSendAttemptId() : params.expectedPlatformSendAttemptId;
	return {
		ack(options) {
			const expectedPlatformSendAttemptId = resolveExpectedPlatformSendAttemptId();
			if (expectedPlatformSendAttemptId !== void 0) return ackDelivery(params.queueId, params.stateDir, {
				...options,
				expectedPlatformSendAttemptId
			});
			return options ? ackDelivery(params.queueId, params.stateDir, options) : params.stateDir !== void 0 ? ackDelivery(params.queueId, params.stateDir) : ackDelivery(params.queueId);
		},
		fail(record, error) {
			const expectedPlatformSendAttemptId = resolveExpectedPlatformSendAttemptId();
			if (expectedPlatformSendAttemptId !== void 0) return record(params.queueId, error, params.stateDir, expectedPlatformSendAttemptId);
			return params.stateDir !== void 0 ? record(params.queueId, error, params.stateDir) : record(params.queueId, error);
		}
	};
}
async function persistQueuedPreSendState(params) {
	try {
		const route = { replyToId: params.route.replyToId ?? null };
		if (params.producerClaimId) await markDeliveryPlatformSendAttemptStarted(params.queueId, params.stateDir, route, params.producerClaimId);
		else await markDeliveryPlatformSendAttemptStarted(params.queueId, params.stateDir, route);
		return "marked";
	} catch (markErr) {
		if (params.queuePolicy === "required" || params.producerClaimId) throw markErr;
		log$1.warn(`failed to mark queued delivery ${params.queueId} as platform-send-attempt-started; removing replay intent before best-effort send: ${formatErrorMessage(markErr)}`);
		if (params.retainSpoolArtifacts) await ackDelivery(params.queueId, params.stateDir, { retainSpoolArtifacts: true });
		else await ackDelivery(params.queueId, params.stateDir);
		return "acked";
	}
}
async function persistQueuedPostSendState(params) {
	const expectedPlatformSendAttemptId = params.producerClaimId ?? params.expectedPlatformSendAttemptId;
	const owner = createQueuedDeliveryOwner({
		queueId: params.queueId,
		stateDir: params.stateDir,
		expectedPlatformSendAttemptId
	});
	try {
		if (expectedPlatformSendAttemptId !== void 0) await markDeliveryPlatformOutcomeUnknown(params.queueId, params.stateDir, expectedPlatformSendAttemptId);
		else if (params.stateDir !== void 0) await markDeliveryPlatformOutcomeUnknown(params.queueId, params.stateDir);
		else await markDeliveryPlatformOutcomeUnknown(params.queueId);
		return "marked";
	} catch (markErr) {
		if (params.producerClaimId) {
			await failDeliveryAfterPlatformSend(params.queueId, `post-send state persistence failed: ${formatErrorMessage(markErr)}`, params.stateDir, params.producerClaimId);
			return "failed";
		}
		params.onPostSendMarkerError?.(markErr);
		log$1.warn(`failed to mark queued delivery ${params.queueId} as platform-outcome-unknown; falling back to direct ack (${params.queuePolicy}): ${formatErrorMessage(markErr)}`);
		try {
			await owner.ack(params.retainSpoolArtifacts ? { retainSpoolArtifacts: true } : void 0);
			return "acked";
		} catch (ackErr) {
			const error = `post-send state persistence failed: marker=${formatErrorMessage(markErr)}; ack=${formatErrorMessage(ackErr)}`;
			await owner.fail(failDeliveryAfterPlatformSend, error);
			return "failed";
		}
	}
}
//#endregion
//#region src/infra/outbound/message-sent-hook.ts
const log = createSubsystemLogger("outbound/message-sent-hook");
/** Creates a best-effort emitter shared by direct and inbound-turn delivery owners. */
function createMessageSentEmitter(params) {
	const hasMessageSentHooks = params.hookRunner?.hasHooks("message_sent") ?? false;
	const canEmitInternalHook = Boolean(params.sessionKeyForInternalHooks);
	const emitMessageSent = (event) => {
		if (!hasMessageSentHooks && !canEmitInternalHook) return;
		const canonical = buildCanonicalSentMessageHookContext({
			to: params.to,
			content: event.content,
			success: event.success,
			error: event.error,
			channelId: params.channel,
			accountId: params.accountId,
			conversationId: params.to,
			sessionKey: params.sessionKeyForInternalHooks,
			runId: params.runId,
			messageId: event.messageId,
			isGroup: params.isGroup,
			groupId: params.groupId
		});
		if (hasMessageSentHooks) fireAndForgetHook(params.hookRunner.runMessageSent(toPluginMessageSentEvent(canonical), toPluginMessageContext(canonical)), `${params.logPrefix}: message_sent plugin hook failed`, (message) => {
			log.warn(message);
		});
		if (!canEmitInternalHook) return;
		fireAndForgetHook(triggerInternalHook(createInternalHookEvent("message", "sent", params.sessionKeyForInternalHooks, toInternalMessageSentContext(canonical))), `${params.logPrefix}: message:sent internal hook failed`, (message) => {
			log.warn(message);
		});
	};
	return {
		emitMessageSent,
		hasMessageSentHooks
	};
}
//#endregion
//#region src/infra/outbound/outbound-audit.ts
function outboundQueueAuditSourceId(queueId, payloadIndex) {
	return `message:outbound:queue:${queueId}:payload:${payloadIndex}`;
}
function outcomesByPayload(outcomes) {
	const indexed = /* @__PURE__ */ new Map();
	for (const outcome of outcomes) {
		const history = indexed.get(outcome.index) ?? [];
		history.push(outcome);
		indexed.set(outcome.index, history);
	}
	return indexed;
}
function sentResults(history) {
	return history.findLast((outcome) => outcome.status === "sent")?.results ?? [];
}
function projectRecordedOutboundAuditTerminal(history) {
	if (history.some((outcome) => outcome.status === "suppressed" && outcome.reason === "adapter_returned_no_identity")) return {
		outcome: "unknown",
		failureStage: "platform_send"
	};
	const latest = history.at(-1);
	if (latest?.status === "sent") return {
		outcome: "sent",
		results: latest.results,
		...latest.deliveryKind ? { deliveryKind: latest.deliveryKind } : {}
	};
	if (latest?.status === "suppressed") {
		if (latest.reason === "adapter_returned_no_identity") return {
			outcome: "unknown",
			failureStage: "platform_send"
		};
		return {
			outcome: "suppressed",
			reasonCode: latest.reason
		};
	}
}
function completedOutboundAuditTerminals(params) {
	const indexed = outcomesByPayload(params.payloadOutcomes);
	return Array.from({ length: params.payloadCount }, (_, payloadIndex) => {
		const recordedTerminal = projectRecordedOutboundAuditTerminal(indexed.get(payloadIndex) ?? []);
		if (recordedTerminal) return {
			payloadIndex,
			terminal: recordedTerminal
		};
		if (params.payloadCount === 1 && params.results.length > 0) return {
			payloadIndex,
			terminal: {
				outcome: "sent",
				results: params.results
			}
		};
		return {
			payloadIndex,
			terminal: {
				outcome: "suppressed",
				reasonCode: "no_visible_payload"
			}
		};
	});
}
function failedOutboundAuditTerminals(params) {
	const indexed = outcomesByPayload(params.payloadOutcomes);
	return Array.from({ length: params.payloadCount }, (_, payloadIndex) => {
		const history = indexed.get(payloadIndex) ?? [];
		const recordedTerminal = projectRecordedOutboundAuditTerminal(history);
		if (recordedTerminal) return {
			payloadIndex,
			terminal: recordedTerminal
		};
		const latest = history.at(-1);
		const failedResults = latest?.status === "failed" ? latest.results ?? [] : [];
		const payloadResults = failedResults.length > 0 ? failedResults : sentResults(history);
		const fallbackResults = params.payloadCount === 1 ? params.results : [];
		const results = payloadResults.length > 0 ? payloadResults : fallbackResults;
		return {
			payloadIndex,
			terminal: {
				outcome: "failed",
				failureStage: latest?.status === "failed" ? latest.stage : params.failureStage,
				results,
				sentBeforeError: results.length > 0 || latest?.status === "failed" && latest.sentBeforeError,
				...latest?.status === "failed" && latest.deliveryKind ? { deliveryKind: latest.deliveryKind } : {}
			}
		};
	});
}
function uniformOutboundAuditTerminals(payloadCount, terminal) {
	return Array.from({ length: payloadCount }, (_, payloadIndex) => ({
		payloadIndex,
		terminal
	}));
}
const TARGET_KIND_TO_ROUTE_KINDS = {
	channel: ["channel"],
	conversation: ["channel"],
	thread: ["channel"],
	group: ["group"],
	room: ["group"],
	direct: ["direct", "dm"],
	dm: ["direct", "dm"],
	user: ["direct", "dm"]
};
const TARGET_PREFIX_RE = /^\s*([a-z][a-z0-9_-]*):/i;
function resolveOutboundTargetFacts(context) {
	const channel = context.channel.toLowerCase();
	const aliasChannel = resolveTargetPrefixedChannel(context.to);
	const targetPrefix = TARGET_PREFIX_RE.exec(context.to)?.[1];
	const providerPrefixes = aliasChannel === channel ? [context.channel, targetPrefix ?? context.channel] : [context.channel];
	const withoutProvider = stripTargetProviderPrefix(context.to, ...providerPrefixes);
	const kindPrefix = TARGET_PREFIX_RE.exec(withoutProvider)?.[1]?.toLowerCase();
	const allowedRouteKinds = kindPrefix ? TARGET_KIND_TO_ROUTE_KINDS[kindPrefix] : void 0;
	return {
		conversationId: stripTargetKindPrefix(withoutProvider, Object.keys(TARGET_KIND_TO_ROUTE_KINDS)),
		withoutProvider,
		allowedRouteKinds
	};
}
/** True when a parsed session route provably names this delivery's destination. */
function routeNamesDestination(route, context) {
	if (!route || route.channel !== context.channel.toLowerCase()) return false;
	const { conversationId, withoutProvider, allowedRouteKinds } = resolveOutboundTargetFacts(context);
	if (allowedRouteKinds && !allowedRouteKinds.includes(route.peerKind)) return false;
	return [
		context.to,
		withoutProvider,
		conversationId
	].some((candidate) => {
		const normalized = normalizeSessionPeerId({
			channel: route.channel,
			peerKind: route.peerKind,
			peerId: candidate
		});
		return normalized !== "" && normalized.toLowerCase() === route.peerId.toLowerCase();
	});
}
function resolveConversationKind(context) {
	if (context.session?.conversationKind) return context.session.conversationKind;
	const routeCandidates = [
		context.session?.policyKey,
		context.session?.key,
		context.mirror?.sessionKey
	];
	for (const candidate of routeCandidates) {
		const route = parseSessionDeliveryRoute(candidate);
		if (routeNamesDestination(route, context)) return route.peerKind === "dm" || route.peerKind === "direct" ? "direct" : route.peerKind;
	}
	if (context.session?.conversationType === "group" || context.mirror?.isGroup === true) return "group";
	return "unknown";
}
function firstIdentifier(...values) {
	for (const value of values) {
		const normalized = value?.trim();
		if (normalized && normalized !== "unknown" && normalized !== "suppressed") return normalized;
	}
}
function resolveResultIdentifiers(context, results) {
	const last = results.at(-1);
	const conversationId = firstIdentifier(last?.conversationId, last?.chatId, last?.channelId, last?.roomId, last?.toJid) ?? resolveOutboundTargetFacts(context).conversationId;
	const messageId = firstIdentifier(last?.messageId, last?.receipt?.primaryPlatformMessageId, last?.receipt?.platformMessageIds.at(-1));
	return {
		...conversationId ? { conversationId } : {},
		...messageId ? { messageId } : {}
	};
}
/**
* Emits only after the owning lifecycle has made the delivery terminal.
* Queue retries share one source id, so recovery cannot duplicate the final row.
*/
function emitOutboundAuditTerminal(params) {
	try {
		const { context, terminal } = params;
		const results = terminal.results ?? [];
		const agentId = context.session?.agentId ?? context.mirror?.agentId;
		const identifiers = resolveResultIdentifiers(context, results);
		const sentBeforeError = (terminal.outcome === "failed" || terminal.outcome === "unknown") && terminal.sentBeforeError === true;
		const terminalFields = terminal.outcome === "sent" ? {
			status: "succeeded",
			outcome: "sent",
			...terminal.deliveryKind ? { deliveryKind: terminal.deliveryKind } : {}
		} : terminal.outcome === "suppressed" ? {
			status: "blocked",
			outcome: "suppressed",
			reasonCode: terminal.reasonCode
		} : terminal.outcome === "unknown" ? {
			status: "unknown",
			outcome: "unknown",
			failureStage: terminal.failureStage
		} : {
			status: "failed",
			outcome: "failed",
			errorCode: results.length > 0 || sentBeforeError ? "message_delivery_partial_failure" : "message_delivery_failed",
			failureStage: terminal.failureStage,
			...terminal.deliveryKind ? { deliveryKind: terminal.deliveryKind } : {}
		};
		emitTrustedMessageAuditEvent({
			...params.sourceId ? { sourceId: params.sourceId } : {},
			kind: "message",
			action: "message.outbound.finished",
			occurredAt: Date.now(),
			...terminalFields,
			actorType: agentId ? "agent" : "system",
			actorId: agentId ?? "gateway",
			...agentId ? { agentId } : {},
			...context.preparedBatch?.runId ?? context.replyPayloadSendingHook?.runId ? { runId: context.preparedBatch?.runId ?? context.replyPayloadSendingHook?.runId } : {},
			direction: "outbound",
			channel: context.channel,
			conversationKind: resolveConversationKind(context),
			durationMs: Math.max(0, Date.now() - params.startedAt),
			resultCount: countPhysicalOutboundSends(results),
			...context.accountId ? { accountId: context.accountId } : {},
			targetId: context.to,
			...identifiers
		});
	} catch {}
}
/** Emits only after the owning lifecycle has made each logical payload terminal. */
function emitOutboundAuditTerminals(params) {
	if (!hasTrustedMessageAuditListeners()) return;
	let terminals;
	try {
		terminals = typeof params.terminals === "function" ? params.terminals() : params.terminals;
	} catch {
		return;
	}
	for (const indexed of terminals) emitOutboundAuditTerminal({
		context: params.context,
		terminal: indexed.terminal,
		startedAt: params.startedAt,
		payloadIndex: indexed.payloadIndex,
		...params.queueId ? { sourceId: outboundQueueAuditSourceId(params.queueId, indexed.payloadIndex) } : {}
	});
}
//#endregion
//#region src/infra/outbound/delivery-queue-recovery.ts
const DEFAULT_MAX_RETRIES = 5;
const PERMANENT_ERROR_PATTERNS = [
	/no conversation reference found/i,
	/chat not found/i,
	/user not found/i,
	/bot.*not.*member/i,
	/bot was blocked by the user/i,
	/forbidden: bot was kicked/i,
	/chat_id is empty/i,
	/recipient is not a valid/i,
	/outbound not configured for channel/i,
	/ambiguous .* recipient/i,
	/User .* not in room/i
];
const recoveryCoordinator = createDeliveryRecoveryCoordinator();
function queuedPayloads(entry) {
	return acceptedPreparedOutboundEntries(entry.preparedBatch).map((prepared) => prepared.payload);
}
function queuedPayloadCount(entry) {
	return entry.preparedBatch.sourcePayloadCount;
}
function emitRecoveredMessageSentEvents(entry, events) {
	const { emitMessageSent } = createMessageSentEmitter({
		hookRunner: getGlobalHookRunner(),
		channel: entry.channel,
		to: entry.to,
		accountId: entry.accountId,
		sessionKeyForInternalHooks: entry.mirror?.sessionKey ?? entry.session?.key,
		isGroup: entry.mirror?.isGroup,
		groupId: entry.mirror?.groupId,
		runId: entry.preparedBatch.runId,
		logPrefix: OUTBOUND_DELIVERY_LOG_SCOPE
	});
	for (const event of events) emitMessageSent(event);
}
function queuedTerminalFailureEvents(entry, error) {
	return acceptedPreparedOutboundEntries(entry.preparedBatch).map((prepared) => {
		const summary = buildPayloadSummary(prepared.payload);
		return {
			sourceIndex: prepared.sourceIndex,
			event: {
				success: false,
				content: summary.hookContent ?? summary.text,
				error
			}
		};
	});
}
function emitRecoveredTerminalFailure(entry, error, collected = []) {
	if (entry.legacyPreparedContentUnavailable) return;
	const fallbackEvents = queuedTerminalFailureEvents(entry, error);
	const collectedBySourceIndex = new Map(collected.map(({ sourceIndex, event }) => [sourceIndex, event]));
	emitRecoveredMessageSentEvents(entry, fallbackEvents.map(({ sourceIndex, event }) => collectedBySourceIndex.get(sourceIndex) ?? event));
}
function emitRecoveredTerminalSuccess(entry, result) {
	if (entry.legacyPreparedContentUnavailable) return;
	const preparedEntries = acceptedPreparedOutboundEntries(entry.preparedBatch);
	if (preparedEntries.length === 0) return;
	const receiptMessageIds = result.receipt?.parts.length ? result.receipt.parts.toSorted((left, right) => left.index - right.index).map((part) => part.platformMessageId) : result.receipt?.platformMessageIds;
	const messageIds = preparedEntries.length === 1 ? [result.messageId || receiptMessageIds?.[0]] : receiptMessageIds?.length === preparedEntries.length ? receiptMessageIds : [];
	emitRecoveredMessageSentEvents(entry, preparedEntries.map((prepared, index) => {
		const summary = buildPayloadSummary(prepared.payload);
		const messageId = messageIds[index];
		const event = {
			success: true,
			content: summary.hookContent ?? summary.text
		};
		if (messageId) event.messageId = messageId;
		return event;
	}));
}
function resolveMaxRetries(entry) {
	const configured = entry.maxRetries;
	return typeof configured === "number" && Number.isInteger(configured) && configured > 0 ? configured : DEFAULT_MAX_RETRIES;
}
function resolveAttemptCount(entry) {
	const persisted = entry.attemptCount;
	return Math.max(typeof persisted === "number" && Number.isInteger(persisted) && persisted >= 0 ? persisted : 0, entry.retryCount);
}
function emitQueuedAuditTerminals(entry, terminals) {
	emitOutboundAuditTerminals({
		context: entry,
		terminals,
		startedAt: entry.enqueuedAt,
		queueId: entry.id
	});
}
function needsUnknownSendReconciliation(entry) {
	return entry.recoveryState === "send_attempt_started" || entry.recoveryState === "unknown_after_send";
}
function hasActiveStableDeliveryOwner(entry, now) {
	return (typeof entry.completionRetention === "object" || entry.completionRetention === "permanent" || entry.requiresProducerClaim === true) && (entry.recoveryState === "producer_claimed" || (entry.recoveryState === "send_attempt_started" || entry.recoveryState === "unknown_after_send") && entry.requiresProducerClaim === true) && typeof entry.availableAt === "number" && entry.availableAt > now;
}
function queuedDeadLetterAuditTerminals(entry) {
	if (needsUnknownSendReconciliation(entry)) return uniformOutboundAuditTerminals(queuedPayloadCount(entry), {
		outcome: "unknown",
		failureStage: "queue"
	});
	return uniformOutboundAuditTerminals(queuedPayloadCount(entry), {
		outcome: "failed",
		failureStage: "queue"
	});
}
function queuedUnknownAuditTerminals(entry) {
	return uniformOutboundAuditTerminals(queuedPayloadCount(entry), {
		outcome: "unknown",
		failureStage: "queue"
	});
}
async function withActiveDeliveryClaim(entryId, fn) {
	return recoveryCoordinator.withClaim(entryId, fn);
}
function buildRecoveryDeliverParams(entry, cfg, stateDir, producerClaimId) {
	return {
		cfg,
		channel: entry.channel,
		to: entry.to,
		accountId: entry.accountId,
		...entry.queuePolicy !== void 0 ? { queuePolicy: entry.queuePolicy } : {},
		...entry.requireUnknownSendReconciliation === true ? { requireUnknownSendReconciliation: true } : {},
		payloads: queuedPayloads(entry),
		preparedBatch: entry.preparedBatch,
		renderedBatchPlan: entry.renderedBatchPlan,
		threadId: entry.threadId,
		replyToId: entry.replyToId,
		replyToMode: entry.replyToMode,
		formatting: entry.formatting,
		identity: entry.identity,
		bestEffort: entry.bestEffort,
		gifPlayback: entry.gifPlayback,
		forceDocument: entry.forceDocument,
		silent: entry.silent,
		mirror: entry.mirror,
		session: entry.session,
		gatewayClientScopes: entry.gatewayClientScopes,
		preparedMessageId: entry.preparedMessageId,
		deliveryCompletion: entry.deliveryCompletion,
		deliveryQueueId: entry.id,
		deliveryQueueStateDir: stateDir,
		...producerClaimId ? { deliveryProducerClaimId: producerClaimId } : {},
		...entry.requiresProducerClaim === true ? { deliveryProducerLeaseRequired: true } : {},
		skipQueue: true,
		deferredDeliveryAdmissionPassed: true,
		deferCommitHooks: true
	};
}
async function applyRecoveryDeliveryAdmission(params) {
	const admission = resolveDeferredDeliveryAdmission({
		cfg: params.cfg,
		channel: params.entry.channel,
		to: params.entry.to,
		accountId: params.entry.accountId,
		phase: "recovery"
	});
	if (admission.status === "allowed") return "allowed";
	markDurableDeliveryFailedBestEffort(params.entry, params.log);
	if ((await failPendingDelivery({
		id: params.entry.id,
		expectedStatus: "pending",
		lastError: admission.reason,
		entry: params.entry
	}, params.stateDir)).status === "failed") {
		await runUnknownSendTerminalCleanup({
			entry: params.entry,
			cfg: params.cfg,
			log: params.log
		});
		emitRecoveredTerminalFailure(params.entry, admission.reason);
		emitQueuedAuditTerminals(params.entry, () => queuedDeadLetterAuditTerminals(params.entry));
		params.log.warn(`${params.logLabel}: entry ${params.entry.id} permanently rejected before recovery: ${admission.reason}`);
		return "failed";
	}
	params.log.info(`${params.logLabel}: entry ${params.entry.id} changed status before admission failure was persisted`);
	return "not_pending";
}
async function runUnknownSendTerminalCleanup(params) {
	if (!needsUnknownSendReconciliation(params.entry)) return;
	const cleanup = resolveOutboundChannelMessageAdapter({
		channel: params.entry.channel,
		cfg: params.cfg,
		allowBootstrap: true
	})?.durableFinal?.afterUnknownSendTerminal;
	if (!cleanup) return;
	try {
		await cleanup(buildUnknownSendContext({
			entry: params.entry,
			payloads: queuedPayloads(params.entry),
			cfg: params.cfg
		}));
	} catch (error) {
		params.log.warn(`Delivery entry ${params.entry.id} unknown-send terminal cleanup failed: ${formatErrorMessage(error)}`);
	}
}
async function moveEntryToFailedAndCleanup(params) {
	await (params.attemptId !== void 0 ? moveToFailed(params.entry.id, params.stateDir, params.attemptId) : moveToFailed(params.entry.id, params.stateDir));
	await runUnknownSendTerminalCleanup(params);
}
function buildReconciledSentResult(entry, reconciliation) {
	return {
		channel: entry.channel,
		messageId: reconciliation.messageId ?? reconciliation.receipt.primaryPlatformMessageId ?? reconciliation.receipt.platformMessageIds[0] ?? "",
		receipt: reconciliation.receipt
	};
}
function buildReconciledCommitContext(params) {
	const payload = queuedPayloads(params.entry)[0] ?? {};
	const result = {
		messageId: params.result.messageId,
		receipt: params.result.receipt ?? {
			platformMessageIds: [params.result.messageId].filter(Boolean),
			parts: [],
			sentAt: Date.now()
		}
	};
	const base = {
		cfg: params.cfg,
		to: params.entry.to,
		deliveryQueueId: params.entry.id,
		accountId: params.entry.accountId,
		replyToId: params.entry.effectiveReplyToId !== void 0 ? params.entry.effectiveReplyToId : params.entry.replyToId,
		replyToMode: params.entry.replyToMode,
		threadId: params.entry.threadId,
		silent: params.entry.silent,
		result
	};
	if (payload.presentation !== void 0 || payload.delivery !== void 0 || payload.interactive !== void 0 || payload.channelData !== void 0 && Object.keys(payload.channelData).length > 0) return {
		...base,
		kind: "payload",
		text: payload.text ?? "",
		mediaUrl: payload.mediaUrl,
		payload
	};
	const mediaUrl = payload.mediaUrl ?? payload.mediaUrls?.find((url) => url);
	if (mediaUrl) return {
		...base,
		kind: "media",
		text: payload.text ?? "",
		mediaUrl,
		audioAsVoice: payload.audioAsVoice,
		gifPlayback: params.entry.gifPlayback,
		forceDocument: params.entry.forceDocument
	};
	return {
		...base,
		kind: "text",
		text: payload.text ?? ""
	};
}
async function runReconciledSentCommitHooks(params) {
	if (params.entry.legacyPreparedContentUnavailable) return;
	const afterCommit = resolveOutboundChannelMessageAdapter({
		channel: params.entry.channel,
		cfg: params.cfg,
		allowBootstrap: true
	})?.send?.lifecycle?.afterCommit;
	if (!afterCommit) return;
	const result = buildReconciledSentResult(params.entry, params.reconciliation);
	try {
		await afterCommit(buildReconciledCommitContext({
			entry: params.entry,
			cfg: params.cfg,
			result
		}));
	} catch (err) {
		params.log.warn(`Delivery entry ${params.entry.id} reconciled sent afterCommit hook failed: ${formatErrorMessage(err)}`);
	}
}
async function moveEntryToFailedWithLogging(entry, cfg, log, stateDir) {
	markDurableDeliveryFailedBestEffort(entry, log);
	try {
		await moveEntryToFailedAndCleanup({
			entry,
			cfg,
			log,
			stateDir,
			attemptId: recoveryPlatformAttemptId(entry)
		});
		emitRecoveredTerminalFailure(entry, "delivery retry budget exhausted");
		return true;
	} catch (err) {
		log.error(`Failed to move entry ${entry.id} to failed/: ${String(err)}`);
		return false;
	}
}
function recoveryPlatformAttemptId(entry, claimedAttemptId) {
	return claimedAttemptId !== void 0 ? claimedAttemptId : typeof entry.completionRetention === "object" || entry.requiresProducerClaim === true ? null : void 0;
}
async function ackRecoveredDelivery(entry, stateDir, options, claimedAttemptId) {
	await createQueuedDeliveryOwner({
		queueId: entry.id,
		stateDir,
		expectedPlatformSendAttemptId: recoveryPlatformAttemptId(entry, claimedAttemptId)
	}).ack(options);
}
async function recordRecoveredFailure(record, entry, error, stateDir, claimedAttemptId) {
	await createQueuedDeliveryOwner({
		queueId: entry.id,
		stateDir,
		expectedPlatformSendAttemptId: recoveryPlatformAttemptId(entry, claimedAttemptId)
	}).fail(record, error);
}
function markDurableDeliveryFailedBestEffort(entry, log) {
	if (!entry.deliveryCompletion) return;
	try {
		failDurableDelivery(entry.deliveryCompletion);
	} catch (error) {
		log.warn(`Delivery entry ${entry.id} owner state could not be marked unknown: ${formatErrorMessage(error)}`);
	}
}
async function resolveCompletedOwnerBeforeRecovery(opts) {
	const completion = opts.entry.deliveryCompletion;
	if (!completion) return "continue";
	let operation;
	try {
		operation = markDurableDeliveryQueued(completion, opts.entry.id);
	} catch (error) {
		const errMsg = `delivery owner state unavailable: ${formatErrorMessage(error)}`;
		await recordRecoveredFailure(failDelivery, opts.entry, errMsg, opts.stateDir).catch(() => void 0);
		opts.onFailed?.(opts.entry, errMsg);
		opts.log.warn(`Delivery entry ${opts.entry.id} ${errMsg}`);
		return "failed";
	}
	if (operation.status === "sent" || operation.status === "replied") {
		try {
			await ackRecoveredDelivery(opts.entry, opts.stateDir);
		} catch (error) {
			const errMsg = `failed to ack owner-completed delivery: ${formatErrorMessage(error)}`;
			opts.onFailed?.(opts.entry, errMsg);
			opts.log.warn(`Delivery entry ${opts.entry.id} ${errMsg}`);
			return "failed";
		}
		const messageId = operation.platformMessageId ?? operation.preparedMessageId;
		if (messageId) {
			const result = {
				channel: opts.entry.channel,
				messageId
			};
			emitRecoveredTerminalSuccess(opts.entry, result);
			await runOutboundDeliveryCommitHooks([result]);
			emitQueuedAuditTerminals(opts.entry, () => completedOutboundAuditTerminals({
				payloadCount: queuedPayloadCount(opts.entry),
				results: [result],
				payloadOutcomes: []
			}));
		}
		opts.onRecovered?.(opts.entry);
		return "recovered";
	}
	if (operation.status === "suppressed") {
		try {
			await (typeof opts.entry.completionRetention === "object" ? ackRecoveredDelivery(opts.entry, opts.stateDir, { suppressCompletionReceipt: true }) : ackRecoveredDelivery(opts.entry, opts.stateDir));
		} catch (error) {
			const errMsg = `failed to ack owner-suppressed delivery: ${formatErrorMessage(error)}`;
			opts.onFailed?.(opts.entry, errMsg);
			opts.log.warn(`Delivery entry ${opts.entry.id} ${errMsg}`);
			return "failed";
		}
		opts.onRecovered?.(opts.entry);
		return "recovered";
	}
	if (operation.status === "rejected") {
		try {
			await (typeof opts.entry.completionRetention === "object" ? ackRecoveredDelivery(opts.entry, opts.stateDir, { suppressCompletionReceipt: true }) : ackRecoveredDelivery(opts.entry, opts.stateDir));
		} catch (error) {
			const errMsg = `failed to ack owner-rejected delivery: ${formatErrorMessage(error)}`;
			opts.onFailed?.(opts.entry, errMsg);
			opts.log.warn(`Delivery entry ${opts.entry.id} ${errMsg}`);
			return "failed";
		}
		emitQueuedAuditTerminals(opts.entry, () => failedOutboundAuditTerminals({
			payloadCount: queuedPayloadCount(opts.entry),
			results: [],
			payloadOutcomes: [],
			failureStage: "platform_send"
		}));
		emitRecoveredTerminalFailure(opts.entry, operation.rejectionError ?? "delivery permanently rejected before platform dispatch");
		opts.onFailed?.(opts.entry, operation.rejectionError ?? "delivery permanently rejected before platform dispatch");
		return "failed";
	}
	if (operation.status === "unknown") return await moveEntryToFailedWithLogging(opts.entry, opts.cfg, opts.log, opts.stateDir) ? "moved-to-failed" : "failed";
	return "continue";
}
function isPermanentDeliveryError(error) {
	return PERMANENT_ERROR_PATTERNS.some((re) => re.test(error));
}
async function persistRecoveredPostSendState(opts) {
	return persistQueuedPostSendState({
		queueId: opts.entry.id,
		queuePolicy: opts.entry.queuePolicy ?? "best_effort",
		stateDir: opts.stateDir,
		producerClaimId: opts.producerClaimId,
		expectedPlatformSendAttemptId: recoveryPlatformAttemptId(opts.entry, opts.producerClaimId),
		retainSpoolArtifacts: true,
		onPostSendMarkerError: (error) => {
			opts.log.warn(`Delivery entry ${opts.entry.id} failed to persist post-send state; falling back to direct ack: ${formatErrorMessage(error)}`);
		}
	});
}
async function drainQueuedEntry(opts) {
	const { entry } = opts;
	const maxRetries = resolveMaxRetries(entry);
	const attemptBudgetExhausted = resolveAttemptCount(entry) >= maxRetries;
	let reconciledPlatformSendAttemptId;
	let reconciledPlatformSendStartedAt;
	const ownerState = await resolveCompletedOwnerBeforeRecovery(opts);
	if (ownerState !== "continue") return ownerState;
	if (needsUnknownSendReconciliation(entry)) {
		const reconciliation = entry.legacyUnknownSendReconciliation ?? await reconcileUnknownQueuedDelivery({
			entry,
			payloads: queuedPayloads(entry),
			cfg: opts.cfg,
			warn: (message) => opts.log.warn(message)
		});
		if (reconciliation?.status === "sent") try {
			const result = buildReconciledSentResult(entry, reconciliation);
			if (entry.deliveryCompletion) completeDurableDelivery(entry.deliveryCompletion, result);
			await ackRecoveredDelivery(entry, opts.stateDir, void 0, entry.platformSendAttemptId);
			emitRecoveredTerminalSuccess(entry, result);
			await runReconciledSentCommitHooks({
				entry,
				cfg: opts.cfg,
				reconciliation,
				log: opts.log
			});
			emitQueuedAuditTerminals(entry, () => completedOutboundAuditTerminals({
				payloadCount: queuedPayloadCount(entry),
				results: [result],
				payloadOutcomes: []
			}));
			opts.onRecovered?.(entry);
			opts.log.info(`Delivery entry ${entry.id} reconciled unknown_after_send as already sent`);
			return "recovered";
		} catch (ackErr) {
			if (getErrnoCode(ackErr) === "ENOENT") return "already-gone";
			const errMsg = `failed to ack reconciled sent delivery: ${formatErrorMessage(ackErr)}`;
			opts.log.warn(`Delivery entry ${entry.id} ${errMsg}`);
			opts.onFailed?.(entry, errMsg);
			try {
				await recordRecoveredFailure(failDelivery, entry, errMsg, opts.stateDir, entry.platformSendAttemptId);
				return "failed";
			} catch (failErr) {
				if (getErrnoCode(failErr) === "ENOENT") return "already-gone";
			}
			return "failed";
		}
		if (reconciliation?.status === "not_sent" && entry.recoveryState === "send_attempt_started") {
			reconciledPlatformSendAttemptId = entry.platformSendAttemptId;
			reconciledPlatformSendStartedAt = entry.platformSendStartedAt;
			opts.log.info(`Delivery entry ${entry.id} reconciled ${entry.recoveryState} as not sent; replaying`);
		} else {
			let errMsg = `delivery state is ${entry.recoveryState}; refusing blind replay without adapter reconciliation`;
			if (reconciliation?.status === "not_sent") errMsg = `delivery state is ${entry.recoveryState}; refusing full replay after post-send evidence`;
			else if (reconciliation?.status === "unresolved" && reconciliation.error) errMsg = `delivery state is ${entry.recoveryState} and reconciliation is unresolved: ${reconciliation.error}`;
			opts.log.warn(`Delivery entry ${entry.id} ${errMsg}`);
			opts.onFailed?.(entry, errMsg);
			if (reconciliation?.status === "unresolved" && reconciliation.retryable === true && !attemptBudgetExhausted) {
				try {
					await recordRecoveredFailure(failDelivery, entry, errMsg, opts.stateDir);
					return "failed";
				} catch (failErr) {
					if (getErrnoCode(failErr) === "ENOENT") return "already-gone";
				}
				return "failed";
			}
			try {
				markDurableDeliveryFailedBestEffort(entry, opts.log);
				const attemptId = recoveryPlatformAttemptId(entry);
				await moveEntryToFailedAndCleanup({
					entry,
					cfg: opts.cfg,
					log: opts.log,
					stateDir: opts.stateDir,
					attemptId
				});
				emitRecoveredTerminalFailure(entry, errMsg);
				emitQueuedAuditTerminals(entry, () => queuedUnknownAuditTerminals(entry));
				return "moved-to-failed";
			} catch (moveErr) {
				if (getErrnoCode(moveErr) === "ENOENT") return "already-gone";
			}
			return "failed";
		}
	}
	const payloadOutcomes = [];
	const messageSentEvents = [];
	let postSendState;
	let deliveredResults = [];
	let commitHooksRun = false;
	const collectResults = (results) => {
		for (const result of results) if (!deliveredResults.includes(result)) deliveredResults.push(result);
	};
	const collectPayloadOutcome = (outcome) => {
		if (!payloadOutcomes.includes(outcome)) payloadOutcomes.push(outcome);
	};
	const runCommitHooksAfterAck = async () => {
		if (postSendState !== "acked" || commitHooksRun) return;
		commitHooksRun = true;
		emitRecoveredMessageSentEvents(entry, messageSentEvents.map(({ event }) => event));
		if (deliveredResults.length > 0) await runOutboundDeliveryCommitHooks(deliveredResults);
	};
	const requiresProducerClaim = typeof entry.completionRetention === "object" || entry.requiresProducerClaim === true || typeof entry.producerClaimId === "string" || typeof entry.platformSendAttemptId === "string";
	const producerClaimId = requiresProducerClaim ? await claimDeliveryPlatformSendAttempt(entry.id, opts.stateDir, reconciledPlatformSendStartedAt, reconciledPlatformSendAttemptId) : void 0;
	if (requiresProducerClaim && !producerClaimId) {
		opts.log.info(`Recovery skipped for delivery ${entry.id}: producer ownership already claimed`);
		return "already-gone";
	}
	const reservation = producerClaimId ? await reserveDeliveryAttempt(entry.id, maxRetries, opts.stateDir, producerClaimId) : await reserveDeliveryAttempt(entry.id, maxRetries, opts.stateDir);
	if (reservation.status === "exhausted") {
		const errMsg = `delivery retry budget exhausted (${reservation.attemptCount}/${maxRetries})`;
		markDurableDeliveryFailedBestEffort(entry, opts.log);
		try {
			await moveEntryToFailedAndCleanup({
				entry,
				cfg: opts.cfg,
				log: opts.log,
				stateDir: opts.stateDir,
				attemptId: producerClaimId
			});
			emitRecoveredTerminalFailure(entry, errMsg);
		} catch (moveErr) {
			if (getErrnoCode(moveErr) === "ENOENT") return "already-gone";
			throw moveErr;
		}
		emitQueuedAuditTerminals(entry, () => queuedDeadLetterAuditTerminals(entry));
		opts.onFailed?.(entry, errMsg);
		return "moved-to-failed";
	}
	const recoverySpoolPaths = collectEntrySpoolPaths(queuedPayloads(entry), opts.stateDir);
	let mediaRecoveryLeaseId;
	try {
		mediaRecoveryLeaseId = recoverySpoolPaths.length > 0 ? createDeliveryQueueMediaRecoveryLease(recoverySpoolPaths, opts.stateDir) : void 0;
		const result = await opts.deliver({
			...buildRecoveryDeliverParams(entry, opts.cfg, opts.stateDir, producerClaimId),
			onPayloadDeliveryOutcome: collectPayloadOutcome,
			onMessageSentEvent: (event, sourceIndex) => messageSentEvents.push({
				sourceIndex,
				event
			}),
			onDeliveryResult: async (deliveryResult) => {
				collectResults([deliveryResult]);
				postSendState ??= await persistRecoveredPostSendState({
					entry,
					log: opts.log,
					stateDir: opts.stateDir,
					...producerClaimId ? { producerClaimId } : {}
				});
			}
		});
		const results = isOutboundDeliveryResultArray(result) ? result : [];
		if (producerClaimId !== void 0 && payloadOutcomes.some((outcome) => outcome.status === "suppressed" && outcome.reason === "adapter_returned_no_identity")) {
			const error = "recovered platform send returned no delivery identity";
			await recordRecoveredFailure(failDeliveryAfterPlatformSend, entry, error, opts.stateDir, producerClaimId);
			opts.onFailed?.(entry, error);
			opts.log.warn(`Delivery entry ${entry.id} ${error}; preserving unknown_after_send`);
			emitQueuedAuditTerminals(entry, () => queuedUnknownAuditTerminals(entry));
			return "failed";
		}
		if (results.length > 0) {
			deliveredResults = [...results];
			if (entry.deliveryCompletion) completeDurableDelivery(entry.deliveryCompletion, results.at(-1));
		} else if (entry.deliveryCompletion) suppressDurableDelivery(entry.deliveryCompletion);
		const failedOutcomes = payloadOutcomes.filter((outcome) => outcome.status === "failed");
		const failedOutcome = failedOutcomes[0];
		if (failedOutcome) {
			const errMsg = formatErrorMessage(failedOutcome.error);
			opts.onFailed?.(entry, errMsg);
			if (results.length > 0 || failedOutcomes.some((outcome) => outcome.sentBeforeError)) {
				postSendState ??= await persistRecoveredPostSendState({
					entry,
					log: opts.log,
					stateDir: opts.stateDir,
					...producerClaimId ? { producerClaimId } : {}
				});
				opts.log.warn(`Delivery entry ${entry.id} partially sent before best-effort recovery failed; preserving unknown_after_send`);
				if (postSendState === "acked") {
					await runCommitHooksAfterAck();
					emitQueuedAuditTerminals(entry, () => failedOutboundAuditTerminals({
						payloadCount: queuedPayloadCount(entry),
						results: deliveredResults,
						payloadOutcomes,
						failureStage: "platform_send"
					}));
				}
			} else await recordRecoveredFailure(failedOutcomes.every((outcome) => isProvenDeliveryNotSentError(outcome.error)) ? failDeliveryBeforePlatformSend : failDelivery, entry, errMsg, opts.stateDir, producerClaimId);
			return "failed";
		}
		postSendState ??= results.length > 0 ? await persistRecoveredPostSendState({
			entry,
			log: opts.log,
			stateDir: opts.stateDir,
			...producerClaimId ? { producerClaimId } : {}
		}) : void 0;
		if (postSendState === "failed") {
			const errMsg = "recovered send completed but queue finalization failed";
			opts.onFailed?.(entry, errMsg);
			opts.log.warn(`Delivery entry ${entry.id} ${errMsg}; preserving unknown_after_send`);
			return "failed";
		}
		if (postSendState !== "acked") try {
			await (results.length === 0 && typeof entry.completionRetention === "object" ? ackRecoveredDelivery(entry, opts.stateDir, { suppressCompletionReceipt: true }, producerClaimId) : ackRecoveredDelivery(entry, opts.stateDir, void 0, producerClaimId));
			postSendState = "acked";
		} catch (ackErr) {
			const ackError = `failed to ack recovered delivery: ${formatErrorMessage(ackErr)}`;
			if (results.length > 0) {
				await recordRecoveredFailure(failDeliveryAfterPlatformSend, entry, ackError, opts.stateDir, producerClaimId);
				postSendState = "failed";
			} else await recordRecoveredFailure(failDelivery, entry, ackError, opts.stateDir, producerClaimId);
			opts.onFailed?.(entry, ackError);
			opts.log.warn(`Delivery entry ${entry.id} ${ackError}`);
			return "failed";
		}
		await runCommitHooksAfterAck();
		emitQueuedAuditTerminals(entry, () => completedOutboundAuditTerminals({
			payloadCount: queuedPayloadCount(entry),
			results,
			payloadOutcomes
		}));
		opts.onRecovered?.(entry);
		return "recovered";
	} catch (err) {
		const errMsg = formatErrorMessage(err);
		opts.onFailed?.(entry, errMsg);
		if (isOutboundDeliveryError(err) && err.results.length > 0) deliveredResults = [...err.results];
		if (deliveredResults.length > 0 || postSendState !== void 0 || isOutboundDeliveryError(err) && err.sentBeforeError) {
			try {
				postSendState ??= await persistRecoveredPostSendState({
					entry,
					log: opts.log,
					stateDir: opts.stateDir,
					...producerClaimId ? { producerClaimId } : {}
				});
			} catch (persistErr) {
				opts.log.error(`Delivery entry ${entry.id} could not persist post-send evidence: ${formatErrorMessage(persistErr)}`);
			}
			if (postSendState === "acked") {
				await runCommitHooksAfterAck();
				emitQueuedAuditTerminals(entry, () => failedOutboundAuditTerminals({
					payloadCount: queuedPayloadCount(entry),
					results: deliveredResults,
					payloadOutcomes,
					failureStage: isOutboundDeliveryError(err) ? err.stage : "platform_send"
				}));
			}
			opts.log.warn(`Delivery entry ${entry.id} partially sent before recovery failed; preserving unknown_after_send`);
			return "failed";
		}
		if (!await loadPendingDelivery(entry.id, opts.stateDir)) {
			emitQueuedAuditTerminals(entry, () => failedOutboundAuditTerminals({
				payloadCount: queuedPayloadCount(entry),
				results: deliveredResults,
				payloadOutcomes,
				failureStage: isOutboundDeliveryError(err) ? err.stage : "platform_send"
			}));
			return "failed";
		}
		const permanentPlatformRejection = findPlatformMessageRejectedError(err);
		if (permanentPlatformRejection || isPermanentDeliveryError(errMsg)) try {
			if (permanentPlatformRejection && entry.deliveryCompletion) rejectDurableDelivery(entry.deliveryCompletion, permanentPlatformRejection.message);
			else markDurableDeliveryFailedBestEffort(entry, opts.log);
			await moveEntryToFailedAndCleanup({
				entry,
				cfg: opts.cfg,
				log: opts.log,
				stateDir: opts.stateDir,
				attemptId: producerClaimId
			});
			emitRecoveredTerminalFailure(entry, errMsg, messageSentEvents);
			emitQueuedAuditTerminals(entry, () => failedOutboundAuditTerminals({
				payloadCount: queuedPayloadCount(entry),
				results: deliveredResults,
				payloadOutcomes,
				failureStage: "queue"
			}));
			return "moved-to-failed";
		} catch (moveErr) {
			if (getErrnoCode(moveErr) === "ENOENT") return "already-gone";
		}
		else try {
			await recordRecoveredFailure(isProvenDeliveryNotSentError(err) ? failDeliveryBeforePlatformSend : failDelivery, entry, errMsg, opts.stateDir, producerClaimId);
			return "failed";
		} catch (failErr) {
			if (getErrnoCode(failErr) === "ENOENT") return "already-gone";
		}
		return "failed";
	} finally {
		cancelDeliveryQueueMediaRecoveryLease(mediaRecoveryLeaseId, opts.stateDir);
		if (!await loadPendingDelivery(entry.id, opts.stateDir).catch(() => entry)) await releaseSpoolArtifacts(recoverySpoolPaths, opts.stateDir);
	}
}
async function drainPendingDeliveries(opts) {
	if (!await recoveryCoordinator.withDrain(opts.drainKey, async () => {
		const now = Date.now();
		const matchingEntries = (await loadPendingDeliveries(opts.stateDir)).filter((entry) => opts.selectEntry(entry, now).match);
		await recoveryCoordinator.scan({
			entries: matchingEntries,
			loadEntry: (id) => loadPendingDelivery(id, opts.stateDir),
			onMissingEntry: (entry) => {
				opts.log.info(`${opts.logLabel}: entry ${entry.id} already gone, skipping`);
			},
			onEntry: async (currentEntry) => {
				if (hasActiveStableDeliveryOwner(currentEntry, Date.now())) return;
				if (await applyRecoveryDeliveryAdmission({
					entry: currentEntry,
					cfg: opts.cfg,
					log: opts.log,
					stateDir: opts.stateDir,
					logLabel: opts.logLabel
				}) !== "allowed") return;
				const currentDecision = opts.selectEntry(currentEntry, Date.now());
				if (!currentDecision.match) {
					opts.log.info(`${opts.logLabel}: entry ${currentEntry.id} no longer matches, skipping`);
					return;
				}
				const maxRetries = resolveMaxRetries(currentEntry);
				if (resolveAttemptCount(currentEntry) >= maxRetries && !needsUnknownSendReconciliation(currentEntry)) {
					try {
						markDurableDeliveryFailedBestEffort(currentEntry, opts.log);
						const attemptId = recoveryPlatformAttemptId(currentEntry);
						await moveEntryToFailedAndCleanup({
							entry: currentEntry,
							cfg: opts.cfg,
							log: opts.log,
							stateDir: opts.stateDir,
							attemptId
						});
						emitRecoveredTerminalFailure(currentEntry, "delivery retry budget exhausted");
					} catch (err) {
						if (getErrnoCode(err) === "ENOENT") {
							opts.log.info(`${opts.logLabel}: entry ${currentEntry.id} already gone, skipping`);
							return;
						}
						throw err;
					}
					emitQueuedAuditTerminals(currentEntry, () => queuedDeadLetterAuditTerminals(currentEntry));
					opts.log.warn(`${opts.logLabel}: entry ${currentEntry.id} exceeded max retries and was moved to failed/`);
					return;
				}
				if (!currentDecision.bypassBackoff) {
					const retryEligibility = isDeliveryRecoveryRetryEligible(currentEntry, Date.now());
					if (!retryEligibility.eligible) {
						opts.log.info(`${opts.logLabel}: entry ${currentEntry.id} not ready for retry yet — backoff ${retryEligibility.remainingBackoffMs}ms remaining`);
						return;
					}
				}
				await recoveryCoordinator.waitForReplay();
				if (await drainQueuedEntry({
					entry: currentEntry,
					cfg: opts.cfg,
					deliver: opts.deliver,
					log: opts.log,
					stateDir: opts.stateDir,
					onFailed: (failedEntry, errMsg) => {
						if (isPermanentDeliveryError(errMsg)) {
							opts.log.warn(`${opts.logLabel}: entry ${failedEntry.id} hit permanent error — moving to failed/: ${errMsg}`);
							return;
						}
						opts.log.warn(`${opts.logLabel}: retry failed for entry ${failedEntry.id}: ${errMsg}`);
					}
				}) === "recovered") opts.log.info(`${opts.logLabel}: drained delivery ${currentEntry.id} on ${currentEntry.channel}`);
			}
		});
	})) opts.log.info(`${opts.logLabel}: already in progress for ${opts.drainKey}, skipping`);
}
/**
* On gateway startup, scan the delivery queue and retry any pending entries.
* Uses exponential backoff and moves entries that exhaust their retry budget to failed/.
*/
async function recoverPendingDeliveries(opts) {
	const { migrateLegacyPendingOutboundDeliveries } = await import("./delivery-queue-migration-CUaKsygQ.js");
	await migrateLegacyPendingOutboundDeliveries({
		cfg: opts.cfg,
		log: opts.log,
		stateDir: opts.stateDir
	});
	const pending = await loadPendingDeliveries(opts.stateDir);
	if (pending.length === 0) return createEmptyDeliveryRecoverySummary();
	opts.log.info(`Found ${pending.length} pending delivery entries — starting recovery`);
	const deadline = resolveDeliveryRecoveryDeadlineMs(opts.maxRecoveryMs);
	const summary = createEmptyDeliveryRecoverySummary();
	const onDeadlineExceeded = () => {
		opts.log.warn(`Recovery time budget exceeded — remaining entries deferred to next startup`);
	};
	await recoveryCoordinator.scan({
		entries: pending,
		loadEntry: (id) => loadPendingDelivery(id, opts.stateDir),
		deadlineMs: deadline,
		onDeadlineExceeded,
		onClaimConflict: (entry) => {
			opts.log.info(`Recovery skipped for delivery ${entry.id}: already being processed`);
		},
		onMissingEntry: (entry) => {
			opts.log.info(`Recovery skipped for delivery ${entry.id}: already gone`);
		},
		onEntry: async (currentEntry) => {
			if (hasActiveStableDeliveryOwner(currentEntry, Date.now())) {
				opts.log.info(`Recovery skipped for delivery ${currentEntry.id}: active platform owner`);
				return "continue";
			}
			const admission = await applyRecoveryDeliveryAdmission({
				entry: currentEntry,
				cfg: opts.cfg,
				log: opts.log,
				stateDir: opts.stateDir,
				logLabel: "Recovery"
			});
			if (admission !== "allowed") {
				if (admission === "failed") summary.failed += 1;
				return "continue";
			}
			const maxRetries = resolveMaxRetries(currentEntry);
			const attemptCount = resolveAttemptCount(currentEntry);
			if (attemptCount >= maxRetries && !needsUnknownSendReconciliation(currentEntry)) {
				opts.log.warn(`Delivery ${currentEntry.id} exceeded max retries (${attemptCount}/${maxRetries}) — moving to failed/`);
				if (await moveEntryToFailedWithLogging(currentEntry, opts.cfg, opts.log, opts.stateDir)) emitQueuedAuditTerminals(currentEntry, () => queuedDeadLetterAuditTerminals(currentEntry));
				summary.skippedMaxRetries += 1;
				return "continue";
			}
			const currentRetryEligibility = isDeliveryRecoveryRetryEligible(currentEntry, Date.now());
			if (!currentRetryEligibility.eligible) {
				summary.deferredBackoff += 1;
				opts.log.info(`Delivery ${currentEntry.id} not ready for retry yet — backoff ${currentRetryEligibility.remainingBackoffMs}ms remaining`);
				return "continue";
			}
			if (await recoveryCoordinator.waitForReplay(deadline) === "deadline-exceeded") {
				onDeadlineExceeded();
				return "stop";
			}
			await drainQueuedEntry({
				entry: currentEntry,
				cfg: opts.cfg,
				deliver: opts.deliver,
				log: opts.log,
				stateDir: opts.stateDir,
				onRecovered: (recoveredEntry) => {
					summary.recovered += 1;
					opts.log.info(`Recovered delivery ${recoveredEntry.id} on ${recoveredEntry.channel}`);
				},
				onFailed: (failedEntry, errMsg) => {
					summary.failed += 1;
					if (isPermanentDeliveryError(errMsg)) {
						opts.log.warn(`Delivery ${failedEntry.id} hit permanent error — moving to failed/: ${errMsg}`);
						return;
					}
					opts.log.warn(`Retry failed for delivery ${failedEntry.id}: ${errMsg}`);
				}
			});
			return "continue";
		}
	});
	opts.log.info(`Delivery recovery complete: ${summary.recovered} recovered, ${summary.failed} failed, ${summary.skippedMaxRetries} skipped (max retries), ${summary.deferredBackoff} deferred (backoff)`);
	return summary;
}
//#endregion
export { emitOutboundAuditTerminals as a, createMessageSentEmitter as c, persistQueuedPostSendState as d, persistQueuedPreSendState as f, resolveDeferredDeliveryAdmission as g, OUTBOUND_DELIVERY_LOG_SCOPE as h, completedOutboundAuditTerminals as i, createQueuedDeliveryOwner as l, renewDeliveryPlatformSendLease as m, recoverPendingDeliveries as n, failedOutboundAuditTerminals as o, claimReusableDeliveryPlatformSendAttempt as p, withActiveDeliveryClaim as r, uniformOutboundAuditTerminals as s, drainPendingDeliveries as t, isDeliveryAbortError as u };
