import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { a as emitInternalDiagnosticEvent } from "./diagnostic-events-Dt41CZkD.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { h as getNodeSqliteKysely, l as runSqliteImmediateTransactionSync, m as executeSqliteQueryTakeFirstSync, p as executeSqliteQuerySync } from "./node-sqlite-BJTPe7U8.js";
import { d as openOpenClawStateDatabase } from "./openclaw-state-db-BU55lNCH.js";
import { a as generateSecureUuid } from "./secure-random-Ds4AFLgz.js";
import { _ as runOpenClawAgentWriteTransaction, h as openOpenClawAgentDatabase } from "./openclaw-agent-db--PLC25lY.js";
import { i as getSessionKysely, o as resolveSqliteReadScope, p as toDatabaseOptions } from "./session-accessor.sqlite-scope-BFeKxPFV.js";
import { f as normalizeMessagePresentation, o as hasReplyPayloadContent, v as renderMessagePresentationFallbackText } from "./payload-BofbwVaq.js";
import { l as summarizeOutboundPayloadForTransport } from "./payloads-BRd0B8mC.js";
import { t as diagnosticErrorCategory } from "./diagnostic-error-metadata-CxJn_BAC.js";
import { c as loadDeliveryQueueEntries, d as moveDeliveryQueueEntryToFailed, f as reserveDeliveryQueueEntryAttempt, i as deleteDeliveryQueueEntry, l as loadDeliveryQueueEntry, m as upsertDeliveryQueueEntry, n as completeDeliveryQueueEntry, o as failPendingDeliveryQueueEntry, p as updateDeliveryQueueEntry, s as getDeliveryQueueEntryStatus, t as commitStagedDeliveryQueueEntry } from "./delivery-queue-sqlite-C1XlYRGJ.js";
import { n as resolveOutboundChannelMessageAdapter } from "./channel-resolution-9przSS8z.js";
import { t as adaptMessagePresentationForChannel } from "./presentation-limits-QCfBOYGO.js";
import { t as resolveAgentScopedOutboundMediaAccess } from "./read-capability-DYpFEyQ-.js";
import { n as flattenMarkdownDetails, t as stripInternalRuntimeScaffolding } from "./protocol-scaffolding-DCl0zNJ-.js";
import { a as OUTBOUND_DELIVERY_QUEUE_NAME, i as OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME, n as LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME, o as OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME, r as OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME, t as DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME } from "./delivery-queue-media-staging-BXDYd5bo.js";
import { r as releaseSpoolArtifacts, t as collectEntrySpoolPaths } from "./delivery-queue-media-spool-zRDf89Bg.js";
import { r as resolveMessageReceiptPrimaryId } from "./receipt-DSE0BXtY.js";
import crypto, { randomUUID } from "node:crypto";
//#region src/infra/outbound/delivery-commit-hooks.ts
const log$1 = createSubsystemLogger("outbound/deliver");
const outboundDeliveryCommitHooks = /* @__PURE__ */ new WeakMap();
/** Attaches an after-commit hook without changing the delivery result shape. */
function attachOutboundDeliveryCommitHook(result, hook) {
	if (!hook) return result;
	const hooks = outboundDeliveryCommitHooks.get(result) ?? [];
	hooks.push(hook);
	outboundDeliveryCommitHooks.set(result, hooks);
	return result;
}
/** Runs after-commit hooks for delivered results while isolating hook failures. */
async function runOutboundDeliveryCommitHooks(results) {
	for (const result of results) for (const hook of outboundDeliveryCommitHooks.get(result) ?? []) try {
		await hook();
	} catch (err) {
		log$1.warn("Plugin message adapter after-commit hook failed.", {
			channel: result.channel,
			messageId: result.messageId,
			error: formatErrorMessage(err)
		});
	}
}
/** Type guard for batched outbound delivery results crossing loose boundaries. */
function isOutboundDeliveryResultArray(value) {
	return Array.isArray(value);
}
//#endregion
//#region src/infra/outbound/deliver-payload.ts
const log = createSubsystemLogger("outbound/deliver");
function sessionKeyForDeliveryDiagnostics(params) {
	return params.mirror?.sessionKey ?? params.session?.key ?? params.session?.policyKey;
}
function deliveryKindForPayload(payload, payloadSummary) {
	if (payloadSummary.mediaUrls.length > 0 || payload.mediaUrl || payload.mediaUrls?.length) return "media";
	if (payload.presentation || payload.interactive || payload.channelData || payload.audioAsVoice) return "other";
	return "text";
}
function emitMessageDeliveryStarted(params) {
	emitInternalDiagnosticEvent({
		type: "message.delivery.started",
		channel: params.channel,
		deliveryKind: params.deliveryKind,
		...params.sessionKey ? { sessionKey: params.sessionKey } : {}
	});
}
function emitMessageDeliveryCompleted(params) {
	emitInternalDiagnosticEvent({
		type: "message.delivery.completed",
		channel: params.channel,
		deliveryKind: params.deliveryKind,
		durationMs: params.durationMs,
		resultCount: params.resultCount,
		...params.sessionKey ? { sessionKey: params.sessionKey } : {}
	});
}
function emitMessageDeliveryError(params) {
	emitInternalDiagnosticEvent({
		type: "message.delivery.error",
		channel: params.channel,
		deliveryKind: params.deliveryKind,
		durationMs: params.durationMs,
		errorCategory: diagnosticErrorCategory(params.error),
		...params.sessionKey ? { sessionKey: params.sessionKey } : {}
	});
}
function normalizeEmptyPayloadForDelivery(payload) {
	const text = typeof payload.text === "string" ? payload.text : "";
	if (!text.trim()) {
		if (!hasReplyPayloadContent({
			...payload,
			text
		}, { extraContent: payload.location != null })) return null;
		if (text) return {
			...payload,
			text: ""
		};
	}
	return payload;
}
function normalizePayloadsForChannelDelivery(plan, handler) {
	const normalizedPayloads = [];
	for (const entry of plan) {
		let sanitizedPayload = stripInternalRuntimeScaffoldingFromPayload(entry.payload);
		if (!handler.preserveMarkdownDetails && sanitizedPayload.text) sanitizedPayload = {
			...sanitizedPayload,
			text: flattenMarkdownDetails(sanitizedPayload.text)
		};
		if (handler.sanitizeText && sanitizedPayload.text) {
			if (!handler.shouldSkipPlainTextSanitization?.(sanitizedPayload)) sanitizedPayload = {
				...sanitizedPayload,
				text: handler.sanitizeText(sanitizedPayload)
			};
		}
		const normalizedPayload = handler.normalizePayload ? handler.normalizePayload(sanitizedPayload) : sanitizedPayload;
		const normalized = normalizedPayload ? normalizeEmptyPayloadForDelivery(stripInternalRuntimeScaffoldingFromPayload(normalizedPayload)) : null;
		if (normalized) normalizedPayloads.push({
			index: entry.sourceIndex,
			payload: normalized
		});
	}
	return handler.normalizePayloadBatch ? handler.normalizePayloadBatch(normalizedPayloads) : normalizedPayloads;
}
function stripInternalRuntimeScaffoldingFromValue(value) {
	if (typeof value === "string") return stripInternalRuntimeScaffolding(value);
	if (Array.isArray(value)) {
		let changed = false;
		const next = value.map((entry) => {
			const stripped = stripInternalRuntimeScaffoldingFromValue(entry);
			changed ||= stripped !== entry;
			return stripped;
		});
		return changed ? next : value;
	}
	if (!value || typeof value !== "object") return value;
	const proto = Object.getPrototypeOf(value);
	if (proto !== Object.prototype && proto !== null) return value;
	let changed = false;
	const next = {};
	for (const [key, entry] of Object.entries(value)) {
		const stripped = stripInternalRuntimeScaffoldingFromValue(entry);
		changed ||= stripped !== entry;
		next[key] = stripped;
	}
	return changed ? next : value;
}
/** Every media reference a payload set carries, in payload order. */
function collectPayloadMediaSources(payloads) {
	return payloads.flatMap((payload) => [...typeof payload.mediaUrl === "string" && payload.mediaUrl.trim() ? [payload.mediaUrl] : [], ...(payload.mediaUrls ?? []).filter((url) => typeof url === "string" && url.trim())]);
}
/**
* Resolves the media read capability for one send. Queue staging and the live
* send must resolve it identically: staging copies exactly the bytes the send is
* already allowed to read, so a narrower gate here would reject media the send
* would have delivered, and a wider one would widen read authority.
*/
function resolveOutboundMediaAccessForSend(params, channel, mediaSources) {
	if (mediaSources.length === 0) return params.mediaAccess ?? {};
	return resolveAgentScopedOutboundMediaAccess({
		cfg: params.cfg,
		agentId: params.session?.agentId ?? params.mirror?.agentId,
		mediaSources,
		mediaAccess: params.mediaAccess,
		sessionKey: params.session?.policyKey ?? params.session?.key,
		messageProvider: params.session?.key ? void 0 : channel,
		accountId: params.session?.requesterAccountId ?? params.accountId,
		requesterSenderId: params.session?.requesterSenderId,
		requesterSenderName: params.session?.requesterSenderName,
		requesterSenderUsername: params.session?.requesterSenderUsername,
		requesterSenderE164: params.session?.requesterSenderE164
	});
}
function stripInternalRuntimeScaffoldingFromPayload(payload) {
	const stripped = stripInternalRuntimeScaffoldingFromValue(payload);
	return stripped && typeof stripped === "object" && !Array.isArray(stripped) ? stripped : payload;
}
function buildPayloadSummary(payload) {
	return summarizeOutboundPayloadForTransport(payload);
}
function hasDeliveryResultIdentity(result) {
	return Boolean(result.messageId || result.chatId || result.channelId || result.roomId || result.conversationId || result.toJid || result.pollId);
}
function normalizeDeliveryPin(payload) {
	const pin = payload.delivery?.pin;
	if (pin === true) return { enabled: true };
	if (!pin || typeof pin !== "object" || Array.isArray(pin)) return;
	if (!pin.enabled) return;
	const normalized = { enabled: true };
	if (pin.notify === true) normalized.notify = true;
	if (pin.required === true) normalized.required = true;
	return normalized;
}
async function maybePinDeliveredMessage(params) {
	const pin = normalizeDeliveryPin(params.payload);
	if (!pin) return;
	if (!params.messageId) {
		if (pin.required) throw new Error("Delivery pin requested, but no delivered message id was returned.");
		log.warn("Delivery pin requested, but no delivered message id was returned.", {
			channel: params.target.channel,
			to: params.target.to
		});
		return;
	}
	if (!params.handler.pinDeliveredMessage) {
		if (pin.required) throw new Error(`Delivery pin is not supported by channel: ${params.target.channel}`);
		log.warn("Delivery pin requested, but channel does not support pinning delivered messages.", {
			channel: params.target.channel,
			to: params.target.to
		});
		return;
	}
	try {
		await params.handler.pinDeliveredMessage({
			target: params.target,
			messageId: params.messageId,
			pin,
			gatewayClientScopes: params.gatewayClientScopes
		});
	} catch (err) {
		if (pin.required) throw err;
		log.warn("Delivery pin requested, but channel failed to pin delivered message.", {
			channel: params.target.channel,
			to: params.target.to,
			messageId: params.messageId,
			error: formatErrorMessage(err)
		});
	}
}
async function maybeNotifyAfterDeliveredPayload(params) {
	if (!params.handler.afterDeliverPayload || params.results.length === 0) return;
	try {
		await params.handler.afterDeliverPayload({
			target: params.target,
			payload: params.payload,
			results: params.results
		});
	} catch (err) {
		log.warn("Plugin outbound adapter after-delivery hook failed.", {
			channel: params.target.channel,
			to: params.target.to,
			error: formatErrorMessage(err)
		});
	}
}
async function renderPresentationForDelivery(handler, payload) {
	const presentation = normalizeMessagePresentation(payload.presentation);
	if (!presentation) return payload;
	const adaptedPresentation = adaptMessagePresentationForChannel({
		presentation,
		capabilities: handler.presentationCapabilities
	});
	const textIsFallback = payload.presentationTextMode === "fallback";
	const adaptedPayload = {
		...payload,
		...textIsFallback ? { text: void 0 } : {},
		presentation: adaptedPresentation
	};
	const rendered = handler.renderPresentation ? await handler.renderPresentation(adaptedPayload) : null;
	if (rendered) {
		const { presentation: _presentation, presentationTextMode: _presentationTextMode, ...withoutPresentation } = rendered;
		return withoutPresentation;
	}
	const { presentation: _presentation, presentationTextMode: _presentationTextMode, ...withoutPresentation } = payload;
	return {
		...withoutPresentation,
		text: textIsFallback ? payload.text ?? renderMessagePresentationFallbackText({ presentation }) : renderMessagePresentationFallbackText({
			text: payload.text,
			presentation
		})
	};
}
/** Captures already-owned content without invoking modifying policy. */
function createUnmodifiedPreparedOutboundBatch(payloads) {
	return {
		schemaVersion: 1,
		sourcePayloadCount: payloads.length,
		entries: payloads.map((payload, sourceIndex) => ({
			sourceIndex,
			status: "accepted",
			payload,
			replyHookChanged: false,
			messageHookChanged: false,
			preparedMediaCount: summarizeOutboundPayloadForTransport(payload).mediaUrls.length
		}))
	};
}
/** Retains terminal legacy cardinality without copying unavailable pre-policy content. */
function createUnavailablePreparedOutboundBatch(sourcePayloadCount) {
	return {
		schemaVersion: 1,
		sourcePayloadCount,
		entries: []
	};
}
function acceptedPreparedOutboundEntries(batch) {
	return batch.entries.filter((entry) => entry.status === "accepted");
}
function preparedOutboundSuppressionOutcomes(batch) {
	return batch.entries.flatMap((entry) => entry.status === "suppressed" ? [{
		index: entry.sourceIndex,
		status: "suppressed",
		reason: entry.reason,
		...entry.hookEffect ? { hookEffect: entry.hookEffect } : {}
	}] : []);
}
/** Removes process-local hook details before a prepared batch enters durable custody. */
function projectPreparedOutboundBatchForStorage(batch) {
	return {
		...batch,
		entries: batch.entries.map((entry) => {
			if (entry.status !== "suppressed" || !entry.hookEffect) return entry;
			const { hookEffect: _hookEffect, ...stored } = entry;
			return stored;
		})
	};
}
function mapPreparedOutboundAcceptedPayloads(batch, payloads) {
	let acceptedIndex = 0;
	const mapped = {
		...batch,
		entries: batch.entries.map((entry) => {
			if (entry.status !== "accepted") return entry;
			const payload = payloads[acceptedIndex++];
			if (!payload) throw new Error("Prepared outbound payload map lost an accepted entry");
			return {
				...entry,
				payload
			};
		})
	};
	if (acceptedIndex !== payloads.length) throw new Error("Prepared outbound payload map received an extra payload");
	return mapped;
}
//#endregion
//#region src/infra/delivery-queue-sqlite-claim.ts
const PLATFORM_SEND_OWNER_LEASE_MS = 3e4;
/** Runs an existing queue mutation only while its exact platform owner survives. */
function transitionOwnedDeliveryQueueEntry(params, transition) {
	return runSqliteImmediateTransactionSync(openOpenClawStateDatabase({ env: params.stateDir ? {
		...process.env,
		OPENCLAW_STATE_DIR: params.stateDir
	} : process.env }).db, () => {
		const entry = loadDeliveryQueueEntry(params.queueName, params.id, params.stateDir);
		if (!entry) return false;
		if (params.platformSendAttemptId === null ? entry.platformSendAttemptId !== void 0 || entry.producerClaimId !== void 0 : entry.platformSendAttemptId !== params.platformSendAttemptId && entry.producerClaimId !== params.platformSendAttemptId) return false;
		transition(entry);
		return true;
	}, {
		databaseLabel: "openclaw-state",
		operationLabel: `mutate owned ${params.queueName} delivery platform send`
	});
}
function transitionUnsentDeliveryQueueEntry(params, operation, transition) {
	return runSqliteImmediateTransactionSync(openOpenClawStateDatabase({ env: params.stateDir ? {
		...process.env,
		OPENCLAW_STATE_DIR: params.stateDir
	} : process.env }).db, () => {
		const current = loadDeliveryQueueEntry(params.queueName, params.id, params.stateDir);
		if (!current || current.platformSendStartedAt !== void 0 && (operation !== "claim" || current.platformSendStartedAt !== params.reconciledPlatformSendStartedAt || current.platformSendAttemptId !== params.reconciledPlatformSendAttemptId || typeof current.platformSendAttemptId !== "string")) return false;
		const updated = transition(current, Date.now());
		return updated ? upsertDeliveryQueueEntry({
			queueName: params.queueName,
			entry: updated,
			stateDir: params.stateDir,
			updatePendingOnly: true
		}) : false;
	}, {
		databaseLabel: "openclaw-state",
		operationLabel: `${operation} ${params.queueName} delivery platform send`
	});
}
/** Claim a recoverable producer lease before any provider invocation. */
function claimDeliveryQueueEntryPlatformSend(params) {
	const claimId = generateSecureUuid();
	return transitionUnsentDeliveryQueueEntry(params, "claim", (entry, now) => {
		const reconciledNotSent = entry.recoveryState === "send_attempt_started" && typeof params.reconciledPlatformSendStartedAt === "number" && entry.platformSendStartedAt === params.reconciledPlatformSendStartedAt && typeof params.reconciledPlatformSendAttemptId === "string" && entry.platformSendAttemptId === params.reconciledPlatformSendAttemptId;
		if (entry.recoveryState && !reconciledNotSent && (entry.recoveryState !== "producer_claimed" || typeof entry.availableAt !== "number" || entry.availableAt > now)) return;
		return {
			...entry,
			...params.requiresProducerClaim === true ? { requiresProducerClaim: true } : {},
			availableAt: now + 3e4,
			producerClaimId: claimId,
			platformSendAttemptId: void 0,
			platformSendStartedAt: void 0,
			recoveryState: "producer_claimed"
		};
	}) ? claimId : void 0;
}
/** Renew only the exact unexpired reusable producer that already owns the row. */
function renewDeliveryQueueEntryPlatformSendLease(params) {
	return runSqliteImmediateTransactionSync(openOpenClawStateDatabase({ env: params.stateDir ? {
		...process.env,
		OPENCLAW_STATE_DIR: params.stateDir
	} : process.env }).db, () => {
		const entry = loadDeliveryQueueEntry(params.queueName, params.id, params.stateDir);
		const now = Date.now();
		const exactOwner = entry?.recoveryState === "producer_claimed" ? entry.producerClaimId === params.claimId : (entry?.recoveryState === "send_attempt_started" || entry?.recoveryState === "unknown_after_send") && entry.platformSendAttemptId === params.claimId;
		if (!entry || entry.requiresProducerClaim !== true || !exactOwner || typeof entry.availableAt !== "number" || entry.availableAt <= now) return;
		const expiresAt = now + PLATFORM_SEND_OWNER_LEASE_MS;
		return upsertDeliveryQueueEntry({
			queueName: params.queueName,
			entry: {
				...entry,
				availableAt: expiresAt
			},
			stateDir: params.stateDir,
			updatePendingOnly: true
		}) ? expiresAt : void 0;
	}, {
		databaseLabel: "openclaw-state",
		operationLabel: `renew ${params.queueName} delivery platform send`
	});
}
/** Atomically fence the exact unexpired owner at the real provider boundary. */
function promoteDeliveryQueueEntryPlatformSend(params) {
	return transitionUnsentDeliveryQueueEntry(params, "promote", (entry, now) => entry.recoveryState === "producer_claimed" && entry.producerClaimId === params.claimId && typeof entry.availableAt === "number" && entry.availableAt > now ? {
		...entry,
		availableAt: entry.requiresProducerClaim === true ? now + PLATFORM_SEND_OWNER_LEASE_MS : void 0,
		producerClaimId: void 0,
		platformSendAttemptId: params.claimId,
		platformSendStartedAt: now,
		...params.route && "replyToId" in params.route ? { effectiveReplyToId: params.route.replyToId ?? null } : {},
		recoveryState: "send_attempt_started"
	} : void 0);
}
//#endregion
//#region src/infra/delivery-queue-sqlite-namespace.ts
function openStateDatabase(stateDir) {
	return openOpenClawStateDatabase({ env: stateDir ? {
		...process.env,
		OPENCLAW_STATE_DIR: stateDir
	} : process.env });
}
/** Atomically publishes one staged owner only when retired namespaces do not own its id. */
function commitStagedDeliveryQueueEntryOnceAcrossNamespaces(params) {
	const database = openStateDatabase(params.stateDir);
	const queueDb = getNodeSqliteKysely(database.db);
	return runSqliteImmediateTransactionSync(database.db, () => {
		if (!executeSqliteQueryTakeFirstSync(database.db, queueDb.selectFrom("delivery_queue_entries").select("id").where("queue_name", "=", params.stagingQueueName).where("id", "=", params.stagingId).where("status", "=", "pending"))) return "missing";
		if (executeSqliteQueryTakeFirstSync(database.db, queueDb.selectFrom("delivery_queue_entries").select("id").where("queue_name", "in", [params.queueName, ...params.conflictQueueNames]).where("id", "=", params.entry.id))) return "existing";
		if (!upsertDeliveryQueueEntry({
			queueName: params.queueName,
			entry: params.entry,
			stateDir: params.stateDir,
			insertOnly: true
		})) return "existing";
		if (executeSqliteQuerySync(database.db, queueDb.deleteFrom("delivery_queue_entries").where("queue_name", "=", params.stagingQueueName).where("id", "=", params.stagingId).where("status", "=", "pending")).numAffectedRows !== 1n) throw new Error(`Delivery queue staging row changed during commit: ${params.stagingQueueName}/${params.stagingId}`);
		return "created";
	}, {
		databaseLabel: "openclaw-state",
		operationLabel: "commit staged stable delivery queue owner"
	});
}
/** Inserts one stable owner only when no current or retired namespace owns its id. */
function upsertDeliveryQueueEntryOnceAcrossNamespaces(params) {
	const database = openStateDatabase(params.stateDir);
	const queueDb = getNodeSqliteKysely(database.db);
	return runSqliteImmediateTransactionSync(database.db, () => {
		if (executeSqliteQueryTakeFirstSync(database.db, queueDb.selectFrom("delivery_queue_entries").select("id").where("queue_name", "in", [params.queueName, ...params.conflictQueueNames]).where("id", "=", params.entry.id))) return false;
		return upsertDeliveryQueueEntry({
			queueName: params.queueName,
			entry: params.entry,
			stateDir: params.stateDir,
			insertOnly: true
		});
	}, {
		databaseLabel: "openclaw-state",
		operationLabel: "insert stable delivery queue owner"
	});
}
/** Replaces a pending entry only while its authoritative serialized value is unchanged. */
function replacePendingDeliveryQueueEntry(params) {
	if (params.expectedEntry.id !== params.replacementEntry.id) throw new Error(`Delivery queue replacement id mismatch: ${params.expectedEntry.id} != ${params.replacementEntry.id}`);
	const database = openStateDatabase(params.stateDir);
	const queueDb = getNodeSqliteKysely(database.db);
	return runSqliteImmediateTransactionSync(database.db, () => {
		const source = executeSqliteQueryTakeFirstSync(database.db, queueDb.selectFrom("delivery_queue_entries").select(["entry_json", "status"]).where("queue_name", "=", params.queueName).where("id", "=", params.expectedEntry.id));
		if (!source || source.status !== "pending" || source.entry_json !== JSON.stringify(params.expectedEntry)) return false;
		return upsertDeliveryQueueEntry({
			queueName: params.queueName,
			entry: params.replacementEntry,
			stateDir: params.stateDir,
			updatePendingOnly: true
		});
	}, {
		databaseLabel: "openclaw-state",
		operationLabel: "replace pending delivery queue entry"
	});
}
/** Completes a pending entry only while its authoritative serialized value is unchanged. */
function completePendingDeliveryQueueEntry(params) {
	const database = openStateDatabase(params.stateDir);
	const queueDb = getNodeSqliteKysely(database.db);
	return runSqliteImmediateTransactionSync(database.db, () => {
		const source = executeSqliteQueryTakeFirstSync(database.db, queueDb.selectFrom("delivery_queue_entries").select(["entry_json", "status"]).where("queue_name", "=", params.queueName).where("id", "=", params.expectedEntry.id));
		if (!source || source.status !== "pending" || source.entry_json !== JSON.stringify(params.expectedEntry)) return false;
		completeDeliveryQueueEntry(params.queueName, params.expectedEntry.id, params.stateDir);
		return true;
	}, {
		databaseLabel: "openclaw-state",
		operationLabel: "complete pending delivery queue entry"
	});
}
/**
* Commits an asynchronously prepared replacement only if the authoritative
* source row is unchanged, then removes or terminally fences the old owner.
*/
function movePendingDeliveryQueueEntryNamespace(params) {
	const database = openStateDatabase(params.stateDir);
	const queueDb = getNodeSqliteKysely(database.db);
	return runSqliteImmediateTransactionSync(database.db, () => {
		const source = executeSqliteQueryTakeFirstSync(database.db, queueDb.selectFrom("delivery_queue_entries").select(["entry_json", "status"]).where("queue_name", "=", params.sourceQueueName).where("id", "=", params.expectedSourceEntry.id));
		if (!source || source.status !== "pending" || source.entry_json !== JSON.stringify(params.expectedSourceEntry)) return "source-changed";
		if (executeSqliteQueryTakeFirstSync(database.db, queueDb.selectFrom("delivery_queue_entries").select("id").where("queue_name", "in", [params.destinationQueueName, ...params.conflictQueueNames ?? []]).where("id", "=", params.destinationEntry.id))) return "destination-exists";
		if (params.stagingId && params.stagingQueueName) {
			if (!executeSqliteQueryTakeFirstSync(database.db, queueDb.selectFrom("delivery_queue_entries").select("id").where("queue_name", "=", params.stagingQueueName).where("id", "=", params.stagingId).where("status", "=", "pending"))) return "staging-missing";
		}
		if (!upsertDeliveryQueueEntry({
			queueName: params.destinationQueueName,
			entry: params.destinationEntry,
			stateDir: params.stateDir,
			insertOnly: true
		})) return "destination-exists";
		if (params.retainSourceCompletionFence) completeDeliveryQueueEntry(params.sourceQueueName, params.expectedSourceEntry.id, params.stateDir);
		else deleteDeliveryQueueEntry(params.sourceQueueName, params.expectedSourceEntry.id, params.stateDir);
		if (params.stagingId && params.stagingQueueName) deleteDeliveryQueueEntry(params.stagingQueueName, params.stagingId, params.stateDir);
		return "moved";
	}, {
		databaseLabel: "openclaw-state",
		operationLabel: "migrate delivery queue namespace"
	});
}
//#endregion
//#region src/infra/outbound/delivery-queue-preparation.ts
const STABLE_PREPARATION_LEASE_MS = 5 * 6e4;
const STABLE_PREPARATION_LEASE_RENEW_MS = 3e4;
var StableDeliveryPreparationLostError = class extends Error {
	constructor(id) {
		super(`Stable outbound preparation ownership was lost: ${id}`);
		this.name = "StableDeliveryPreparationLostError";
	}
};
const STABLE_PREPARATION_CONFLICT_QUEUES = [
	OUTBOUND_DELIVERY_QUEUE_NAME,
	OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME,
	OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME,
	LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME
];
function createStablePreparation(id, ownerId, now = Date.now()) {
	return {
		id,
		enqueuedAt: now,
		retryCount: 0,
		attemptCount: 0,
		preparationState: "claimed",
		preparationOwnerId: ownerId,
		preparationLeaseExpiresAt: now + STABLE_PREPARATION_LEASE_MS
	};
}
function failStablePreparation(entry, error, stateDir) {
	failPendingDeliveryQueueEntry({
		queueName: OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME,
		id: entry.id,
		expectedStatus: "pending",
		lastError: error,
		entry,
		failedEntry: {
			id: entry.id,
			enqueuedAt: entry.enqueuedAt,
			retryCount: entry.retryCount,
			attemptCount: entry.attemptCount
		},
		stateDir
	});
}
function claimStablePreparation(id, stateDir) {
	const ownerId = randomUUID();
	const proposed = createStablePreparation(id, ownerId);
	if (upsertDeliveryQueueEntryOnceAcrossNamespaces({
		queueName: "outbound-preparing-v1",
		conflictQueueNames: STABLE_PREPARATION_CONFLICT_QUEUES,
		entry: proposed,
		stateDir
	})) return {
		status: "claimed",
		entry: proposed
	};
	const current = loadDeliveryQueueEntry(OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME, id, stateDir);
	if (!current) return { status: "existing" };
	if ((current.preparationLeaseExpiresAt ?? 0) > Date.now()) return { status: "existing" };
	if (current.preparationState !== "claimed") {
		failStablePreparation(current, "stable outbound preparation was interrupted", stateDir);
		return { status: "existing" };
	}
	const reclaimed = createStablePreparation(id, ownerId);
	return replacePendingDeliveryQueueEntry({
		queueName: "outbound-preparing-v1",
		expectedEntry: current,
		replacementEntry: reclaimed,
		stateDir
	}) ? {
		status: "claimed",
		entry: reclaimed
	} : { status: "existing" };
}
async function withStableDeliveryPreparation(params) {
	const claim = claimStablePreparation(params.id, params.stateDir);
	if (claim.status === "existing") return claim;
	let entry = claim.entry;
	let leaseLost = false;
	let published = false;
	const replaceEntry = (next) => {
		if (leaseLost || !replacePendingDeliveryQueueEntry({
			queueName: "outbound-preparing-v1",
			expectedEntry: entry,
			replacementEntry: next,
			stateDir: params.stateDir
		})) {
			leaseLost = true;
			throw new StableDeliveryPreparationLostError(params.id);
		}
		entry = next;
	};
	const renewLease = () => {
		try {
			replaceEntry({
				...entry,
				preparationLeaseExpiresAt: Date.now() + STABLE_PREPARATION_LEASE_MS
			});
		} catch {
			leaseLost = true;
		}
	};
	const leaseTimer = setInterval(renewLease, STABLE_PREPARATION_LEASE_RENEW_MS);
	leaseTimer.unref();
	const owner = {
		current: () => entry,
		beforeFirstModifier: () => {
			replaceEntry({
				...entry,
				preparationState: "modifiers_started",
				preparationLeaseExpiresAt: Date.now() + STABLE_PREPARATION_LEASE_MS
			});
		},
		markPrepared: () => {
			replaceEntry({
				...entry,
				preparationState: "prepared",
				preparationLeaseExpiresAt: Date.now() + STABLE_PREPARATION_LEASE_MS
			});
		},
		markPublished: () => {
			published = true;
		}
	};
	try {
		const value = await params.run(owner);
		if (!published && !completePendingDeliveryQueueEntry({
			queueName: "outbound-preparing-v1",
			expectedEntry: entry,
			stateDir: params.stateDir
		})) throw new Error(`Stable outbound preparation could not be settled: ${params.id}`);
		return {
			status: "claimed",
			value
		};
	} catch (error) {
		if (!published && !leaseLost) if (entry.preparationState === "claimed") {
			const released = {
				...entry,
				preparationOwnerId: void 0,
				preparationLeaseExpiresAt: 0
			};
			replacePendingDeliveryQueueEntry({
				queueName: OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME,
				expectedEntry: entry,
				replacementEntry: released,
				stateDir: params.stateDir
			});
		} else failStablePreparation(entry, "stable outbound preparation failed", params.stateDir);
		throw error;
	} finally {
		clearInterval(leaseTimer);
	}
}
//#endregion
//#region src/infra/outbound/delivery-queue-storage.ts
function preparedBatchFromLowLevelInput(params) {
	if (params.preparedBatch) return params.preparedBatch;
	if (!params.payloads) throw new Error("Delivery queue entry requires a prepared payload batch");
	return createUnmodifiedPreparedOutboundBatch(params.payloads);
}
function createQueuedDelivery(params, id) {
	return {
		id,
		enqueuedAt: Date.now(),
		channel: params.channel,
		to: params.to,
		accountId: params.accountId,
		queuePolicy: params.queuePolicy,
		requireUnknownSendReconciliation: params.requireUnknownSendReconciliation,
		...params.requiresProducerClaim === true ? { requiresProducerClaim: true } : {},
		preparedBatch: projectPreparedOutboundBatchForStorage(preparedBatchFromLowLevelInput(params)),
		renderedBatchPlan: params.renderedBatchPlan,
		threadId: params.threadId,
		replyToId: params.replyToId,
		replyToMode: params.replyToMode,
		formatting: params.formatting,
		identity: params.identity,
		bestEffort: params.bestEffort,
		gifPlayback: params.gifPlayback,
		forceDocument: params.forceDocument,
		silent: params.silent,
		mirror: params.mirror,
		session: params.session,
		gatewayClientScopes: params.gatewayClientScopes,
		preparedMessageId: params.preparedMessageId,
		deliveryCompletion: params.deliveryCompletion,
		completionRetention: params.completionRetention,
		legacyUnknownSendReconciliation: params.legacyUnknownSendReconciliation,
		legacyPreparedContentUnavailable: params.legacyPreparedContentUnavailable,
		maxRetries: params.maxRetries,
		retryCount: 0,
		attemptCount: 0
	};
}
function getQueuedDeliveryPayloads(entry) {
	return acceptedPreparedOutboundEntries(entry.preparedBatch).map((prepared) => prepared.payload);
}
/** Persist a delivery entry before attempting send. Returns the entry ID. */
async function enqueueDelivery(params, stateDir, mediaStageId) {
	const id = generateSecureUuid();
	const entry = createQueuedDelivery(params, id);
	if (mediaStageId) {
		if (!commitStagedDeliveryQueueEntry({
			queueName: "outbound-prepared-v1",
			entry,
			stagingId: mediaStageId,
			stagingQueueName: "outbound-media-staging",
			stateDir
		})) throw new Error(`Delivery queue media stage expired before enqueue: ${mediaStageId}`);
	} else upsertDeliveryQueueEntry({
		queueName: OUTBOUND_DELIVERY_QUEUE_NAME,
		entry,
		stateDir
	});
	return id;
}
/** Inserts one stable queue id without replacing prior pending or completed ownership. */
async function enqueueDeliveryOnce(params, id, stateDir, mediaStageId) {
	const normalizedId = id.trim();
	if (!normalizedId) throw new Error("Stable delivery queue id is required");
	const entry = createQueuedDelivery(params, normalizedId);
	return {
		id: normalizedId,
		created: mediaStageId ? (() => {
			const result = commitStagedDeliveryQueueEntryOnceAcrossNamespaces({
				queueName: OUTBOUND_DELIVERY_QUEUE_NAME,
				entry,
				stagingId: mediaStageId,
				stagingQueueName: DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME,
				conflictQueueNames: [
					OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME,
					OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME,
					OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME,
					LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME
				],
				stateDir
			});
			if (result === "missing") throw new Error(`Delivery queue media stage expired before enqueue: ${mediaStageId}`);
			return result === "created";
		})() : upsertDeliveryQueueEntryOnceAcrossNamespaces({
			queueName: OUTBOUND_DELIVERY_QUEUE_NAME,
			conflictQueueNames: [
				OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME,
				OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME,
				OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME,
				LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME
			],
			entry,
			stateDir
		})
	};
}
/** Atomically replaces a payload-free stable preparation owner with prepared custody. */
async function enqueuePreparedDeliveryOnce(params, id, preparation, stateDir, mediaStageId) {
	const normalizedId = id.trim();
	if (!normalizedId || normalizedId !== preparation.id) throw new Error("Stable delivery preparation id is invalid");
	const entry = createQueuedDelivery(params, normalizedId);
	const result = movePendingDeliveryQueueEntryNamespace({
		sourceQueueName: OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME,
		destinationQueueName: OUTBOUND_DELIVERY_QUEUE_NAME,
		conflictQueueNames: [
			OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME,
			OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME,
			LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME
		],
		expectedSourceEntry: preparation,
		destinationEntry: entry,
		...mediaStageId ? {
			stagingQueueName: DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME,
			stagingId: mediaStageId
		} : {},
		stateDir
	});
	if (result === "staging-missing") throw new Error(`Delivery queue media stage expired before enqueue: ${mediaStageId}`);
	if (result !== "moved") throw new StableDeliveryPreparationLostError(normalizedId);
	return {
		id: normalizedId,
		created: true
	};
}
/** Spool artifacts a pending row still references; empty once it is gone or unreadable. */
function loadEntrySpoolPaths(id, stateDir) {
	const entry = loadDeliveryQueueEntry(OUTBOUND_DELIVERY_QUEUE_NAME, id, stateDir);
	return entry ? collectEntrySpoolPaths(getQueuedDeliveryPayloads(entry), stateDir) : [];
}
function lostPlatformClaim(id) {
	return /* @__PURE__ */ new Error(`Stable delivery platform claim was lost: ${id}`);
}
/** Remove a successfully delivered entry, or retain its producer-owned receipt. */
async function ackDelivery(id, stateDir, options) {
	let spoolPaths = [];
	const settle = (current) => {
		spoolPaths = current ? collectEntrySpoolPaths(getQueuedDeliveryPayloads(current), stateDir) : [];
		if (current?.completionRetention && options?.suppressCompletionReceipt !== true) completeDeliveryQueueEntry(OUTBOUND_DELIVERY_QUEUE_NAME, id, stateDir);
		else deleteDeliveryQueueEntry(OUTBOUND_DELIVERY_QUEUE_NAME, id, stateDir);
	};
	if (options && "expectedPlatformSendAttemptId" in options) {
		if (!transitionOwnedDeliveryQueueEntry({
			queueName: "outbound-prepared-v1",
			id,
			stateDir,
			platformSendAttemptId: options.expectedPlatformSendAttemptId ?? null
		}, (entry) => settle(entry))) throw lostPlatformClaim(id);
	} else settle(loadDeliveryQueueEntry(OUTBOUND_DELIVERY_QUEUE_NAME, id, stateDir));
	if (!options?.retainSpoolArtifacts) await releaseSpoolArtifacts(spoolPaths, stateDir);
}
/** Update a queue entry after a failed delivery attempt. */
async function failDelivery(id, error, stateDir, expectedPlatformSendAttemptId) {
	updateQueuedDelivery(id, stateDir, (entry) => ({
		...entry,
		retryCount: entry.retryCount + 1,
		lastAttemptAt: Date.now(),
		lastError: error
	}), expectedPlatformSendAttemptId);
}
/** Record a failed attempt whose retry provably cannot duplicate a recipient-visible send. */
async function failDeliveryBeforePlatformSend(id, error, stateDir, expectedPlatformSendAttemptId) {
	updateQueuedDelivery(id, stateDir, (entry) => ({
		...entry,
		retryCount: entry.retryCount + 1,
		lastAttemptAt: Date.now(),
		lastError: error,
		availableAt: void 0,
		producerClaimId: void 0,
		platformSendAttemptId: void 0,
		platformSendStartedAt: void 0,
		recoveryState: void 0
	}), expectedPlatformSendAttemptId);
}
/** Record a failed attempt without losing evidence that platform delivery may have completed. */
async function failDeliveryAfterPlatformSend(id, error, stateDir, expectedPlatformSendAttemptId) {
	updateQueuedDelivery(id, stateDir, (entry) => ({
		...entry,
		retryCount: entry.retryCount + 1,
		lastAttemptAt: Date.now(),
		lastError: error,
		availableAt: void 0,
		producerClaimId: void 0,
		platformSendStartedAt: entry.platformSendStartedAt ?? Date.now(),
		recoveryState: "unknown_after_send"
	}), expectedPlatformSendAttemptId);
}
/** Atomically transfer a stable pending producer intent to one platform sender. */
async function claimDeliveryPlatformSendAttempt(id, stateDir, reconciledPlatformSendStartedAt, reconciledPlatformSendAttemptId) {
	return claimDeliveryQueueEntryPlatformSend({
		queueName: OUTBOUND_DELIVERY_QUEUE_NAME,
		id,
		stateDir,
		...reconciledPlatformSendStartedAt !== void 0 ? { reconciledPlatformSendStartedAt } : {},
		...reconciledPlatformSendAttemptId !== void 0 ? { reconciledPlatformSendAttemptId } : {}
	});
}
/** Reserve one durable delivery call before invoking the provider path. */
async function reserveDeliveryAttempt(id, maxAttempts, stateDir, expectedPlatformSendAttemptId) {
	return reserveDeliveryQueueEntryAttempt({
		queueName: OUTBOUND_DELIVERY_QUEUE_NAME,
		id,
		maxAttempts,
		stateDir,
		...expectedPlatformSendAttemptId ? { expectedPlatformSendAttemptId } : {}
	});
}
function updateQueuedDelivery(id, stateDir, update, expectedPlatformSendAttemptId) {
	if (expectedPlatformSendAttemptId !== void 0) {
		if (!transitionOwnedDeliveryQueueEntry({
			queueName: "outbound-prepared-v1",
			id,
			stateDir,
			platformSendAttemptId: expectedPlatformSendAttemptId
		}, () => {
			updateDeliveryQueueEntry("outbound-prepared-v1", id, stateDir, (entry) => update(entry));
		})) throw lostPlatformClaim(id);
		return;
	}
	updateDeliveryQueueEntry(OUTBOUND_DELIVERY_QUEUE_NAME, id, stateDir, (entry) => update(entry));
}
async function markDeliveryPlatformSendAttemptStarted(id, stateDir, route, producerClaimId) {
	if (producerClaimId) {
		if (!promoteDeliveryQueueEntryPlatformSend({
			queueName: "outbound-prepared-v1",
			id,
			claimId: producerClaimId,
			stateDir,
			route
		})) throw new Error(`Stable delivery platform claim was lost: ${id}`);
		return;
	}
	updateQueuedDelivery(id, stateDir, (entry) => ({
		...entry,
		availableAt: void 0,
		producerClaimId: void 0,
		platformSendStartedAt: entry.platformSendStartedAt ?? Date.now(),
		...route && "replyToId" in route ? { effectiveReplyToId: route.replyToId ?? null } : {},
		recoveryState: "send_attempt_started"
	}));
}
/** Refresh the attempt timestamp before recipient-visible or finalizing platform I/O. */
async function markDeliveryPlatformSendDispatched(id, stateDir, route, expectedPlatformSendAttemptId) {
	updateQueuedDelivery(id, stateDir, (entry) => ({
		...entry,
		availableAt: expectedPlatformSendAttemptId ? entry.availableAt : void 0,
		producerClaimId: void 0,
		platformSendStartedAt: Date.now(),
		...route && "replyToId" in route ? { effectiveReplyToId: route.replyToId ?? null } : {},
		recoveryState: "send_attempt_started"
	}), expectedPlatformSendAttemptId);
}
async function markDeliveryPlatformOutcomeUnknown(id, stateDir, expectedPlatformSendAttemptId) {
	updateQueuedDelivery(id, stateDir, (entry) => ({
		...entry,
		availableAt: expectedPlatformSendAttemptId && entry.requiresProducerClaim === true && entry.platformSendAttemptId === expectedPlatformSendAttemptId ? entry.availableAt : void 0,
		producerClaimId: void 0,
		platformSendStartedAt: entry.platformSendStartedAt ?? Date.now(),
		recoveryState: "unknown_after_send"
	}), expectedPlatformSendAttemptId);
}
/** Load a single pending delivery entry by ID from the queue directory. */
async function loadPendingDelivery(id, stateDir) {
	return loadDeliveryQueueEntry(OUTBOUND_DELIVERY_QUEUE_NAME, id, stateDir);
}
function findDeliveryIntentOwner(id, stateDir) {
	const preparedStatus = getDeliveryQueueEntryStatus(OUTBOUND_DELIVERY_QUEUE_NAME, id, stateDir);
	if (preparedStatus) return {
		namespace: "prepared",
		status: preparedStatus
	};
	const preparationStatus = getDeliveryQueueEntryStatus(OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME, id, stateDir);
	if (preparationStatus) return {
		namespace: "preparing",
		status: preparationStatus
	};
	const migrationStatus = getDeliveryQueueEntryStatus(OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME, id, stateDir);
	if (migrationStatus) return {
		namespace: "migration",
		status: migrationStatus
	};
	const legacyPreparationStatus = getDeliveryQueueEntryStatus(OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME, id, stateDir);
	if (legacyPreparationStatus) return {
		namespace: "legacy-preparing",
		status: legacyPreparationStatus
	};
	const legacyStatus = getDeliveryQueueEntryStatus(LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME, id, stateDir);
	return legacyStatus ? {
		namespace: "legacy",
		status: legacyStatus
	} : null;
}
/** Load all pending delivery entries from the queue. */
async function loadPendingDeliveries(stateDir) {
	return loadDeliveryQueueEntries(OUTBOUND_DELIVERY_QUEUE_NAME, stateDir);
}
/** One-time migration inventory; normal recovery never reads the legacy namespace. */
function loadLegacyPendingDeliveries(stateDir) {
	return loadDeliveryQueueEntries(LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME, stateDir);
}
/** Prepared legacy rows awaiting media staging and canonical publication. */
function loadPendingDeliveryMigrations(stateDir) {
	return loadDeliveryQueueEntries(OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME, stateDir);
}
/** Claimed pre-D4 rows whose modifying policy has not safely published yet. */
function loadPendingLegacyDeliveryPreparations(stateDir) {
	return loadDeliveryQueueEntries(OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME, stateDir);
}
/** Move a queue entry out of the pending retry set. */
async function moveToFailed(id, stateDir, expectedPlatformSendAttemptId) {
	let spoolPaths;
	if (expectedPlatformSendAttemptId !== void 0) {
		spoolPaths = [];
		if (!transitionOwnedDeliveryQueueEntry({
			queueName: "outbound-prepared-v1",
			id,
			stateDir,
			platformSendAttemptId: expectedPlatformSendAttemptId
		}, (entry) => {
			spoolPaths = collectEntrySpoolPaths(getQueuedDeliveryPayloads(entry), stateDir);
			moveDeliveryQueueEntryToFailed("outbound-prepared-v1", id, stateDir);
		})) throw lostPlatformClaim(id);
	} else {
		spoolPaths = loadEntrySpoolPaths(id, stateDir);
		moveDeliveryQueueEntryToFailed(OUTBOUND_DELIVERY_QUEUE_NAME, id, stateDir);
	}
	await releaseSpoolArtifacts(spoolPaths, stateDir);
}
/** Conditionally dead-letter a freshly re-read pending entry without a claimed state. */
async function failPendingDelivery(params, stateDir) {
	let result = { status: "not_pending" };
	const attemptId = typeof params.entry.completionRetention === "object" || params.entry.requiresProducerClaim === true ? null : void 0;
	if (attemptId !== void 0) transitionOwnedDeliveryQueueEntry({
		queueName: OUTBOUND_DELIVERY_QUEUE_NAME,
		id: params.id,
		stateDir,
		platformSendAttemptId: attemptId
	}, () => {
		result = failPendingDeliveryQueueEntry({
			queueName: OUTBOUND_DELIVERY_QUEUE_NAME,
			...params,
			stateDir
		});
	});
	else result = failPendingDeliveryQueueEntry({
		queueName: OUTBOUND_DELIVERY_QUEUE_NAME,
		...params,
		stateDir
	});
	if (result.status === "failed") await releaseSpoolArtifacts(collectEntrySpoolPaths(getQueuedDeliveryPayloads(params.entry), stateDir), stateDir);
	return result;
}
//#endregion
//#region src/config/sessions/conversation-delivery-store.ts
function resolveDatabaseOptions(scope) {
	return toDatabaseOptions(resolveSqliteReadScope({
		agentId: scope.agentId,
		...scope.env ? { env: scope.env } : {},
		...scope.storePath ? { storePath: scope.storePath } : {}
	}));
}
function normalizeOperationId(value) {
	const operationId = value.trim();
	if (!operationId) throw new Error("Conversation delivery operation id is required");
	return operationId;
}
function hashMessage(message) {
	return crypto.createHash("sha256").update(message).digest("hex");
}
function normalizeStatus(value) {
	switch (value) {
		case "created":
		case "queued":
		case "sent":
		case "suppressed":
		case "rejected":
		case "unknown":
		case "replied": return value;
		default: throw new Error(`Invalid conversation delivery status: ${value}`);
	}
}
function normalizeOperationKind(value) {
	if (value === "send" || value === "turn") return value;
	throw new Error(`Invalid conversation delivery operation kind: ${value}`);
}
function mapRow(row) {
	const reply = row.reply_message_id && row.reply_text !== null && row.reply_timestamp !== null ? {
		messageId: row.reply_message_id,
		...row.reply_to_id ? { replyToId: row.reply_to_id } : {},
		...row.reply_thread_id ? { threadId: row.reply_thread_id } : {},
		text: row.reply_text,
		timestamp: row.reply_timestamp
	} : void 0;
	return {
		operationId: row.operation_id,
		operationKind: normalizeOperationKind(row.operation_kind),
		conversationRef: row.conversation_id,
		channel: row.channel,
		...row.source_session_key ? { sourceSessionKey: row.source_session_key } : {},
		messageHash: row.message_hash,
		status: normalizeStatus(row.status),
		...row.prepared_message_id ? { preparedMessageId: row.prepared_message_id } : {},
		...row.platform_message_id ? { platformMessageId: row.platform_message_id } : {},
		...row.queue_id ? { queueId: row.queue_id } : {},
		...row.rejection_error ? { rejectionError: row.rejection_error } : {},
		...reply ? { reply } : {},
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
var ConversationDeliveryInputError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "ConversationDeliveryInputError";
	}
};
function selectOperation(database, operationId) {
	const db = getSessionKysely(database.db);
	const row = executeSqliteQuerySync(database.db, db.selectFrom("conversation_deliveries as delivery").innerJoin("conversations as conversation", "conversation.conversation_id", "delivery.conversation_id").selectAll("delivery").select("conversation.channel as channel").where("delivery.operation_id", "=", operationId)).rows[0];
	return row ? mapRow(row) : void 0;
}
/** Reads one durable conversation operation by its stable id. */
function getConversationDeliveryOperation(scope, operationId) {
	return selectOperation(openOpenClawAgentDatabase(resolveDatabaseOptions(scope)), normalizeOperationId(operationId));
}
/** Creates one idempotent delivery operation or returns its authoritative prior state. */
function beginConversationDeliveryOperation(scope, params) {
	const operationId = normalizeOperationId(params.operationId);
	const sourceSessionKey = params.sourceSessionKey?.trim() || void 0;
	const messageHash = hashMessage(params.message);
	return runOpenClawAgentWriteTransaction((database) => {
		const existing = selectOperation(database, operationId);
		if (existing) {
			if (existing.conversationRef !== params.conversationRef || existing.operationKind !== params.operationKind || existing.sourceSessionKey !== sourceSessionKey || existing.messageHash !== messageHash) throw new ConversationDeliveryInputError(`Conversation delivery operation was reused with different input: ${operationId}`);
			return {
				created: false,
				record: existing
			};
		}
		const now = Date.now();
		const db = getSessionKysely(database.db);
		executeSqliteQuerySync(database.db, db.insertInto("conversation_deliveries").values({
			operation_id: operationId,
			operation_kind: params.operationKind,
			conversation_id: params.conversationRef,
			source_session_key: sourceSessionKey ?? null,
			message_hash: messageHash,
			status: "created",
			prepared_message_id: params.preparedMessageId ?? null,
			platform_message_id: null,
			queue_id: null,
			rejection_error: null,
			reply_message_id: null,
			reply_to_id: null,
			reply_thread_id: null,
			reply_text: null,
			reply_timestamp: null,
			created_at: now,
			updated_at: now
		}));
		const record = selectOperation(database, operationId);
		if (!record) throw new Error(`Conversation delivery operation was not persisted: ${operationId}`);
		return {
			created: true,
			record
		};
	}, resolveDatabaseOptions(scope), { operationLabel: "conversation-delivery.begin" });
}
function updateConversationDeliveryOperation(scope, params) {
	const operationId = normalizeOperationId(params.operationId);
	return runOpenClawAgentWriteTransaction((database) => {
		const current = selectOperation(database, operationId);
		if (!current) throw new Error(`Conversation delivery operation not found: ${operationId}`);
		if (!params.allowedFrom.includes(current.status)) return current;
		const db = getSessionKysely(database.db);
		executeSqliteQuerySync(database.db, db.updateTable("conversation_deliveries").set({
			status: params.status,
			...params.queueId !== void 0 ? { queue_id: params.queueId } : {},
			...params.platformMessageId !== void 0 ? { platform_message_id: params.platformMessageId } : {},
			...params.rejectionError !== void 0 ? { rejection_error: params.rejectionError } : {},
			...params.reply ? {
				reply_message_id: params.reply.messageId,
				reply_to_id: params.reply.replyToId ?? null,
				reply_thread_id: params.reply.threadId ?? null,
				reply_text: params.reply.text,
				reply_timestamp: params.reply.timestamp
			} : {},
			updated_at: Date.now()
		}).where("operation_id", "=", operationId));
		const record = selectOperation(database, operationId);
		if (!record) throw new Error(`Conversation delivery operation disappeared: ${operationId}`);
		return record;
	}, resolveDatabaseOptions(scope), { operationLabel: `conversation-delivery.${params.status}` });
}
function markConversationDeliveryQueued(scope, operationId, queueId) {
	return updateConversationDeliveryOperation(scope, {
		operationId,
		status: "queued",
		queueId,
		allowedFrom: ["created"]
	});
}
function markConversationDeliverySent(scope, operationId, platformMessageId) {
	return updateConversationDeliveryOperation(scope, {
		operationId,
		status: "sent",
		...platformMessageId ? { platformMessageId } : {},
		allowedFrom: ["created", "queued"]
	});
}
function markConversationDeliverySuppressed(scope, operationId) {
	return updateConversationDeliveryOperation(scope, {
		operationId,
		status: "suppressed",
		allowedFrom: ["created", "queued"]
	});
}
function markConversationDeliveryRejected(scope, operationId, rejectionError) {
	const normalizedError = rejectionError.trim();
	if (!normalizedError) throw new Error("Conversation delivery rejection error is required");
	return updateConversationDeliveryOperation(scope, {
		operationId,
		status: "rejected",
		rejectionError: normalizedError,
		allowedFrom: ["created", "queued"]
	});
}
function markConversationDeliveryUnknown(scope, operationId) {
	return updateConversationDeliveryOperation(scope, {
		operationId,
		status: "unknown",
		allowedFrom: ["created", "queued"]
	});
}
function markConversationDeliveryReplied(scope, params) {
	return updateConversationDeliveryOperation(scope, {
		operationId: params.operationId,
		status: "replied",
		reply: params.reply,
		allowedFrom: ["queued", "sent"]
	});
}
/** Finds the durable correlated turn associated with an inbound transport reply. */
function findConversationTurnDeliveryByReplyTarget(scope, params) {
	const database = openOpenClawAgentDatabase(resolveDatabaseOptions(scope));
	const db = getSessionKysely(database.db);
	const row = executeSqliteQuerySync(database.db, db.selectFrom("conversation_deliveries as delivery").innerJoin("conversations as conversation", "conversation.conversation_id", "delivery.conversation_id").selectAll("delivery").select("conversation.channel as channel").where("delivery.conversation_id", "=", params.conversationRef).where("delivery.operation_kind", "=", "turn").where((eb) => eb.or([eb("delivery.platform_message_id", "=", params.replyToId), eb("delivery.prepared_message_id", "=", params.replyToId)])).where("delivery.status", "in", [
		"queued",
		"sent",
		"replied"
	]).orderBy("delivery.updated_at", "desc").limit(1)).rows[0];
	return row ? mapRow(row) : void 0;
}
//#endregion
//#region src/infra/outbound/delivery-completion.ts
function scopeForCompletion(completion) {
	return {
		agentId: completion.agentId,
		...completion.storePath ? { storePath: completion.storePath } : {}
	};
}
function readPlatformMessageId(result) {
	return (result.receipt ? resolveMessageReceiptPrimaryId(result.receipt) : void 0) ?? (result.messageId.trim() || void 0);
}
/** Records queue ownership before either the live sender or recovery crosses platform I/O. */
function markDurableDeliveryQueued(completion, queueId) {
	return markConversationDeliveryQueued(scopeForCompletion(completion), completion.operationId, queueId);
}
/** Finalizes owner state from identified platform evidence before queue acknowledgement. */
function completeDurableDelivery(completion, result) {
	return markConversationDeliverySent(scopeForCompletion(completion), completion.operationId, readPlatformMessageId(result));
}
/** Finalizes a policy-suppressed send before its durable intent is acknowledged. */
function suppressDurableDelivery(completion) {
	return markConversationDeliverySuppressed(scopeForCompletion(completion), completion.operationId);
}
/** Finalizes a permanent provider rejection that provably preceded platform I/O. */
function rejectDurableDelivery(completion, error) {
	return markConversationDeliveryRejected(scopeForCompletion(completion), completion.operationId, error);
}
/** Makes a dead-lettered durable send terminal without allowing a blind replay. */
function failDurableDelivery(completion) {
	return markConversationDeliveryUnknown(scopeForCompletion(completion), completion.operationId);
}
//#endregion
//#region src/infra/outbound/delivery-queue-reconciliation.ts
function buildUnknownSendContext(params) {
	const { entry } = params;
	return {
		cfg: params.cfg,
		queueId: entry.id,
		channel: entry.channel,
		to: entry.to,
		...entry.accountId !== void 0 ? { accountId: entry.accountId } : {},
		enqueuedAt: entry.enqueuedAt,
		retryCount: entry.retryCount,
		...entry.platformSendStartedAt !== void 0 ? { platformSendStartedAt: entry.platformSendStartedAt } : {},
		...entry.effectiveReplyToId !== void 0 ? { effectiveReplyToId: entry.effectiveReplyToId } : {},
		payloads: params.payloads,
		...entry.renderedBatchPlan ? { renderedBatchPlan: entry.renderedBatchPlan } : {},
		...entry.replyToId !== void 0 ? { replyToId: entry.replyToId } : {},
		...entry.replyToMode !== void 0 ? { replyToMode: entry.replyToMode } : {},
		...entry.threadId !== void 0 ? { threadId: entry.threadId } : {},
		...entry.silent !== void 0 ? { silent: entry.silent } : {}
	};
}
/** Reconciles provider state without applying or rediscovering outbound policy. */
async function reconcileUnknownQueuedDelivery(params) {
	const adapter = resolveOutboundChannelMessageAdapter({
		channel: params.entry.channel,
		cfg: params.cfg,
		allowBootstrap: true
	});
	if (adapter?.durableFinal?.capabilities?.reconcileUnknownSend !== true) return null;
	const reconcileUnknownSend = adapter.durableFinal.reconcileUnknownSend;
	if (!reconcileUnknownSend) return null;
	const { entry } = params;
	try {
		return await reconcileUnknownSend(buildUnknownSendContext(params));
	} catch (error) {
		const message = formatErrorMessage(error);
		params.warn(`Delivery entry ${entry.id} unknown-send reconciliation failed: ${message}`);
		return {
			status: "unresolved",
			error: message,
			retryable: true
		};
	}
}
//#endregion
export { emitMessageDeliveryStarted as $, loadPendingLegacyDeliveryPreparations as A, PLATFORM_SEND_OWNER_LEASE_MS as B, failDeliveryBeforePlatformSend as C, loadPendingDeliveries as D, loadLegacyPendingDeliveries as E, reserveDeliveryAttempt as F, mapPreparedOutboundAcceptedPayloads as G, renewDeliveryQueueEntryPlatformSendLease as H, StableDeliveryPreparationLostError as I, buildPayloadSummary as J, preparedOutboundSuppressionOutcomes as K, withStableDeliveryPreparation as L, markDeliveryPlatformSendAttemptStarted as M, markDeliveryPlatformSendDispatched as N, loadPendingDelivery as O, moveToFailed as P, emitMessageDeliveryError as Q, movePendingDeliveryQueueEntryNamespace as R, failDeliveryAfterPlatformSend as S, findDeliveryIntentOwner as T, acceptedPreparedOutboundEntries as U, claimDeliveryQueueEntryPlatformSend as V, createUnavailablePreparedOutboundBatch as W, deliveryKindForPayload as X, collectPayloadMediaSources as Y, emitMessageDeliveryCompleted as Z, claimDeliveryPlatformSendAttempt as _, markDurableDeliveryQueued as a, renderPresentationForDelivery as at, enqueuePreparedDeliveryOnce as b, ConversationDeliveryInputError as c, stripInternalRuntimeScaffoldingFromPayload as ct, getConversationDeliveryOperation as d, runOutboundDeliveryCommitHooks as dt, hasDeliveryResultIdentity as et, markConversationDeliveryQueued as f, ackDelivery as g, markConversationDeliverySuppressed as h, failDurableDelivery as i, normalizePayloadsForChannelDelivery as it, markDeliveryPlatformOutcomeUnknown as j, loadPendingDeliveryMigrations as k, beginConversationDeliveryOperation as l, attachOutboundDeliveryCommitHook as lt, markConversationDeliverySent as m, reconcileUnknownQueuedDelivery as n, maybePinDeliveredMessage as nt, rejectDurableDelivery as o, resolveOutboundMediaAccessForSend as ot, markConversationDeliveryReplied as p, projectPreparedOutboundBatchForStorage as q, completeDurableDelivery as r, normalizeEmptyPayloadForDelivery as rt, suppressDurableDelivery as s, sessionKeyForDeliveryDiagnostics as st, buildUnknownSendContext as t, maybeNotifyAfterDeliveredPayload as tt, findConversationTurnDeliveryByReplyTarget as u, isOutboundDeliveryResultArray as ut, enqueueDelivery as v, failPendingDelivery as w, failDelivery as x, enqueueDeliveryOnce as y, replacePendingDeliveryQueueEntry as z };
