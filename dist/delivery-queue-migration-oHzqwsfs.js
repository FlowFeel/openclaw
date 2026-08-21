import { i as getOrCreatePromise } from "./lazy-promise-DGqyc4Y4.js";
import { i as resolveOutboundMediaMaxBytes } from "./configured-max-bytes-BA_x-zfE.js";
import { o as failPendingDeliveryQueueEntry } from "./delivery-queue-sqlite-C2mJ-TeJ.js";
import { h as createRenderedMessageBatchPlan, n as prepareOutboundPayloadBatch } from "./deliver-prepare-BY6KbNM2.js";
import { A as loadPendingLegacyDeliveryPreparations, E as loadLegacyPendingDeliveries, G as mapPreparedOutboundAcceptedPayloads, R as movePendingDeliveryQueueEntryNamespace, U as acceptedPreparedOutboundEntries, W as createUnavailablePreparedOutboundBatch, Y as collectPayloadMediaSources, i as failDurableDelivery, k as loadPendingDeliveryMigrations, n as reconcileUnknownQueuedDelivery, ot as resolveOutboundMediaAccessForSend, q as projectPreparedOutboundBatchForStorage, z as replacePendingDeliveryQueueEntry } from "./delivery-queue-reconciliation-D8stEE20.js";
import { a as OUTBOUND_DELIVERY_QUEUE_NAME, c as cancelDeliveryQueueMediaStage, o as OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME, r as OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME, t as DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME } from "./delivery-queue-media-staging-BhHC5im7.js";
import { i as stageQueuePayloadMedia, r as releaseSpoolArtifacts, t as collectEntrySpoolPaths } from "./delivery-queue-media-spool-BuMco1ng.js";
import { randomUUID } from "node:crypto";
//#region src/infra/outbound/delivery-queue-migration.ts
const LEGACY_PREPARATION_LEASE_MS = 5 * 6e4;
const LEGACY_PREPARATION_LEASE_RENEW_MS = 3e4;
function withLegacyPreparationLease(entry, ownerId, now = Date.now()) {
	return {
		...entry,
		legacyPreparationOwnerId: ownerId,
		legacyPreparationLeaseExpiresAt: now + LEGACY_PREPARATION_LEASE_MS
	};
}
function hasActiveLegacyPreparationLease(entry, now = Date.now()) {
	return Boolean(entry.legacyPreparationOwnerId && typeof entry.legacyPreparationLeaseExpiresAt === "number" && entry.legacyPreparationLeaseExpiresAt > now);
}
function buildLegacyPreparationParams(entry, cfg) {
	return {
		cfg,
		channel: entry.channel,
		to: entry.to,
		accountId: entry.accountId,
		queuePolicy: entry.queuePolicy,
		requireUnknownSendReconciliation: entry.requireUnknownSendReconciliation,
		payloads: entry.payloads,
		renderedBatchPlan: entry.renderedBatchPlan,
		threadId: entry.threadId,
		replyToId: entry.replyToId,
		replyToMode: entry.replyToMode,
		formatting: entry.formatting,
		identity: entry.identity,
		bestEffort: entry.bestEffort,
		gifPlayback: entry.gifPlayback,
		forceDocument: entry.forceDocument,
		replyPayloadSendingHook: entry.replyPayloadSendingHook,
		silent: entry.silent,
		mirror: entry.mirror,
		session: entry.session,
		gatewayClientScopes: entry.gatewayClientScopes,
		preparedMessageId: entry.preparedMessageId,
		deliveryCompletion: entry.deliveryCompletion,
		completionRetention: entry.completionRetention,
		skipQueue: true
	};
}
async function prepareLegacyEntryCheckpoint(params) {
	const preparationParams = buildLegacyPreparationParams(params.entry, params.cfg);
	const needsUnknownReconciliation = params.entry.recoveryState === "send_attempt_started" || params.entry.recoveryState === "unknown_after_send";
	const legacyUnknownSendReconciliation = needsUnknownReconciliation ? await reconcileUnknownQueuedDelivery({
		entry: params.entry,
		payloads: params.entry.payloads,
		cfg: params.cfg,
		warn: (message) => params.log.warn(message)
	}) : void 0;
	if (needsUnknownReconciliation && (legacyUnknownSendReconciliation == null || legacyUnknownSendReconciliation.status === "unresolved")) {
		const reconciliationError = legacyUnknownSendReconciliation?.status === "unresolved" ? legacyUnknownSendReconciliation.error : void 0;
		const error = reconciliationError ? `legacy unknown-send reconciliation did not settle: ${reconciliationError}` : "legacy unknown-send reconciliation is unavailable";
		await failInterruptedLegacyPreparation({
			entry: params.entry,
			error,
			log: params.log,
			stateDir: params.stateDir
		});
		return "skipped";
	}
	const prepareForReplay = !needsUnknownReconciliation || params.entry.recoveryState === "send_attempt_started" && legacyUnknownSendReconciliation?.status === "not_sent";
	let sourceEntry = params.entry;
	let preparedBatch;
	if (prepareForReplay) {
		let modifiersStarted = false;
		let leaseLost = false;
		const renewLease = () => {
			if (leaseLost) return;
			const renewed = withLegacyPreparationLease(sourceEntry, params.ownerId);
			if (!replacePendingDeliveryQueueEntry({
				queueName: "outbound-legacy-preparing-v1",
				expectedEntry: sourceEntry,
				replacementEntry: renewed,
				stateDir: params.stateDir
			})) {
				leaseLost = true;
				return;
			}
			sourceEntry = renewed;
		};
		const renewLeaseSafely = () => {
			try {
				renewLease();
			} catch (error) {
				leaseLost = true;
				params.log.warn(`Legacy delivery ${params.entry.id} preparation lease renewal failed: ${String(error)}`);
			}
		};
		const leaseTimer = setInterval(renewLeaseSafely, LEGACY_PREPARATION_LEASE_RENEW_MS);
		leaseTimer.unref();
		try {
			preparedBatch = await prepareOutboundPayloadBatch(preparationParams, { onBeforeFirstModifier: () => {
				if (leaseLost) throw new Error(`Legacy delivery ${params.entry.id} preparation lease was lost`);
				const startedEntry = {
					...sourceEntry,
					legacyPreparationState: "modifiers_started"
				};
				if (!replacePendingDeliveryQueueEntry({
					queueName: "outbound-legacy-preparing-v1",
					expectedEntry: sourceEntry,
					replacementEntry: startedEntry,
					stateDir: params.stateDir
				})) throw new Error(`Legacy delivery ${params.entry.id} preparation ownership changed`);
				sourceEntry = startedEntry;
				modifiersStarted = true;
			} });
			if (leaseLost) throw new Error(`Legacy delivery ${params.entry.id} preparation lease was lost`);
		} catch (error) {
			clearInterval(leaseTimer);
			if (modifiersStarted) await failInterruptedLegacyPreparation({
				entry: sourceEntry,
				error: "legacy modifier preparation failed after policy entry",
				log: params.log,
				stateDir: params.stateDir
			});
			else if (!leaseLost) {
				const releasedEntry = {
					...sourceEntry,
					legacyPreparationOwnerId: void 0,
					legacyPreparationLeaseExpiresAt: void 0
				};
				replacePendingDeliveryQueueEntry({
					queueName: OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME,
					expectedEntry: sourceEntry,
					replacementEntry: releasedEntry,
					stateDir: params.stateDir
				});
			}
			throw error;
		}
		clearInterval(leaseTimer);
	} else preparedBatch = createUnavailablePreparedOutboundBatch(params.entry.payloads.length);
	const acceptedPayloads = acceptedPreparedOutboundEntries(preparedBatch).map((entry) => entry.payload);
	const { payloads: _legacyPayloads, replyPayloadSendingHook: _legacyReplyHook, legacyPreparationState: _legacyPreparationState, legacyPreparationOwnerId: _legacyPreparationOwnerId, legacyPreparationLeaseExpiresAt: _legacyPreparationLeaseExpiresAt, ...retained } = params.entry;
	let canonicalRetained = retained;
	if (prepareForReplay && needsUnknownReconciliation) {
		const { availableAt: _availableAt, producerClaimId: _producerClaimId, platformSendAttemptId: _platformSendAttemptId, platformSendStartedAt: _platformSendStartedAt, effectiveReplyToId: _effectiveReplyToId, recoveryState: _recoveryState, ...resetAttempt } = retained;
		canonicalRetained = resetAttempt;
	}
	const checkpoint = {
		...canonicalRetained,
		preparedBatch: projectPreparedOutboundBatchForStorage(preparedBatch),
		renderedBatchPlan: createRenderedMessageBatchPlan(acceptedPayloads),
		...!prepareForReplay && (legacyUnknownSendReconciliation?.status === "sent" || legacyUnknownSendReconciliation?.status === "not_sent") ? { legacyUnknownSendReconciliation } : {},
		...!prepareForReplay ? { legacyPreparedContentUnavailable: true } : {}
	};
	const result = movePendingDeliveryQueueEntryNamespace({
		sourceQueueName: OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME,
		destinationQueueName: OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME,
		expectedSourceEntry: sourceEntry,
		destinationEntry: checkpoint,
		stateDir: params.stateDir
	});
	if (result !== "moved") {
		params.log.warn(`Legacy delivery ${params.entry.id} preparation deferred: ${result}`);
		return "skipped";
	}
	return "checkpointed";
}
async function failInterruptedLegacyPreparation(params) {
	if (failPendingDeliveryQueueEntry({
		queueName: "outbound-legacy-preparing-v1",
		id: params.entry.id,
		expectedStatus: "pending",
		lastError: params.error,
		entry: params.entry,
		failedEntry: {
			id: params.entry.id,
			enqueuedAt: params.entry.enqueuedAt,
			retryCount: params.entry.retryCount,
			attemptCount: params.entry.attemptCount
		},
		stateDir: params.stateDir
	}).status !== "failed") {
		params.log.warn(`Legacy delivery ${params.entry.id} preparation owner was already settled`);
		return;
	}
	if (params.entry.deliveryCompletion) try {
		failDurableDelivery(params.entry.deliveryCompletion);
	} catch (error) {
		params.log.warn(`Legacy delivery ${params.entry.id} interrupted preparation owner could not be marked unknown: ${String(error)}`);
	}
	await releaseSpoolArtifacts(collectEntrySpoolPaths(params.entry.payloads, params.stateDir), params.stateDir).catch((error) => {
		params.log.warn(`Legacy delivery ${params.entry.id} failed preparation media cleanup failed: ${String(error)}`);
	});
}
function claimLegacyEntryForPreparation(params) {
	const claimed = withLegacyPreparationLease({
		...params.entry,
		legacyPreparationState: "claimed"
	}, params.ownerId);
	return movePendingDeliveryQueueEntryNamespace({
		sourceQueueName: "outbound",
		destinationQueueName: "outbound-legacy-preparing-v1",
		expectedSourceEntry: params.entry,
		destinationEntry: claimed,
		retainSourceCompletionFence: params.entry.requiresProducerClaim === true || params.entry.completionRetention !== void 0,
		stateDir: params.stateDir
	}) === "moved" ? claimed : null;
}
function reclaimLegacyPreparation(params) {
	const claimed = withLegacyPreparationLease(params.entry, params.ownerId);
	return replacePendingDeliveryQueueEntry({
		queueName: "outbound-legacy-preparing-v1",
		expectedEntry: params.entry,
		replacementEntry: claimed,
		stateDir: params.stateDir
	}) ? claimed : null;
}
async function finalizePreparedMigration(params) {
	const acceptedPayloads = acceptedPreparedOutboundEntries(params.entry.preparedBatch).map((entry) => entry.payload);
	const stageForReplay = params.entry.legacyPreparedContentUnavailable !== true;
	let stagedPayloads = acceptedPayloads;
	let mediaStageId;
	let stagedArtifacts = [];
	if (stageForReplay) {
		const staged = await stageQueuePayloadMedia({
			payloads: acceptedPayloads,
			mediaAccess: resolveOutboundMediaAccessForSend({
				...params.entry,
				cfg: params.cfg,
				payloads: acceptedPayloads,
				skipQueue: true
			}, params.entry.channel, collectPayloadMediaSources(acceptedPayloads)),
			maxBytes: resolveOutboundMediaMaxBytes({
				cfg: params.cfg,
				channel: params.entry.channel,
				accountId: params.entry.accountId
			}),
			stateDir: params.stateDir
		});
		if (staged.status !== "staged") {
			params.log.warn(`Legacy delivery ${params.entry.id} cannot be migrated: ${staged.reason} is not durable`);
			return "skipped";
		}
		stagedPayloads = staged.payloads;
		mediaStageId = staged.mediaStageId;
		stagedArtifacts = staged.artifacts;
	}
	let stagedArtifactsTransferred = false;
	try {
		const queuedPreparedBatch = mapPreparedOutboundAcceptedPayloads(params.entry.preparedBatch, stagedPayloads);
		const destination = {
			...params.entry,
			preparedBatch: queuedPreparedBatch,
			renderedBatchPlan: params.entry.renderedBatchPlan ?? createRenderedMessageBatchPlan(acceptedPayloads)
		};
		const result = movePendingDeliveryQueueEntryNamespace({
			sourceQueueName: OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME,
			destinationQueueName: OUTBOUND_DELIVERY_QUEUE_NAME,
			expectedSourceEntry: params.entry,
			destinationEntry: destination,
			...mediaStageId ? {
				stagingQueueName: DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME,
				stagingId: mediaStageId
			} : {},
			stateDir: params.stateDir
		});
		if (result !== "moved") {
			params.log.warn(`Legacy delivery ${params.entry.id} migration deferred: ${result}`);
			return "skipped";
		}
		stagedArtifactsTransferred = true;
		if (stageForReplay) await releaseSpoolArtifacts(collectEntrySpoolPaths(acceptedPayloads, params.stateDir), params.stateDir).catch((error) => {
			params.log.warn(`Legacy delivery ${params.entry.id} moved but old media cleanup failed: ${String(error)}`);
		});
		return "moved";
	} finally {
		if (!stagedArtifactsTransferred) {
			cancelDeliveryQueueMediaStage(mediaStageId, params.stateDir);
			await releaseSpoolArtifacts(stagedArtifacts, params.stateDir);
		}
	}
}
const activeLegacyMigrations = /* @__PURE__ */ new Map();
/** Migrates every unchanged pre-D4 pending row before canonical recovery scans. */
async function migrateLegacyPendingOutboundDeliveries(params) {
	const migrationKey = params.stateDir ?? "<default-state>";
	return await getOrCreatePromise(activeLegacyMigrations, migrationKey, () => migrateLegacyPendingOutboundDeliveriesOwned(params), { evictOnSettled: true });
}
async function migrateLegacyPendingOutboundDeliveriesOwned(params) {
	let moved = 0;
	let skipped = 0;
	const ownerId = randomUUID();
	const claimedPreparations = [];
	for (const entry of loadPendingLegacyDeliveryPreparations(params.stateDir)) {
		if (hasActiveLegacyPreparationLease(entry)) {
			skipped += 1;
			params.log.info(`Legacy delivery ${entry.id} preparation is leased by another owner`);
			continue;
		}
		if (entry.legacyPreparationState !== "claimed") {
			await failInterruptedLegacyPreparation({
				...params,
				entry,
				error: "legacy modifier preparation was interrupted before publication"
			});
			skipped += 1;
			continue;
		}
		const claimed = reclaimLegacyPreparation({
			entry,
			ownerId,
			stateDir: params.stateDir
		});
		if (!claimed) {
			skipped += 1;
			params.log.info(`Legacy delivery ${entry.id} preparation ownership changed`);
			continue;
		}
		claimedPreparations.push(claimed);
	}
	for (const entry of loadLegacyPendingDeliveries(params.stateDir)) {
		const claimed = claimLegacyEntryForPreparation({
			entry,
			ownerId,
			stateDir: params.stateDir
		});
		if (!claimed) {
			skipped += 1;
			params.log.warn(`Legacy delivery ${entry.id} could not acquire preparation ownership`);
			continue;
		}
		claimedPreparations.push(claimed);
	}
	for (const entry of claimedPreparations) try {
		if (await prepareLegacyEntryCheckpoint({
			...params,
			entry,
			ownerId
		}) === "skipped") skipped += 1;
	} catch (error) {
		skipped += 1;
		params.log.warn(`Legacy delivery ${entry.id} migration failed: ${String(error)}`);
	}
	for (const entry of loadPendingDeliveryMigrations(params.stateDir)) try {
		if (await finalizePreparedMigration({
			...params,
			entry
		}) === "moved") moved += 1;
		else skipped += 1;
	} catch (error) {
		skipped += 1;
		params.log.warn(`Prepared delivery ${entry.id} migration failed: ${String(error)}`);
	}
	if (moved > 0 || skipped > 0) params.log.info(`Legacy delivery migration settled moved=${moved} skipped=${skipped}`);
	return {
		moved,
		skipped
	};
}
//#endregion
export { migrateLegacyPendingOutboundDeliveries };
