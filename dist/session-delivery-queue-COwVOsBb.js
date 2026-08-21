import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { n as computeBackoff } from "./src-DKBD8PDy.js";
import { a as generateSecureUuid } from "./secure-random-Ds4AFLgz.js";
import { a as sha256Hex } from "./crypto-digest-CmUwt1S-.js";
import { c as loadDeliveryQueueEntries, d as moveDeliveryQueueEntryToFailed, l as loadDeliveryQueueEntry, m as upsertDeliveryQueueEntry, n as completeDeliveryQueueEntry, p as updateDeliveryQueueEntry, s as getDeliveryQueueEntryStatus } from "./delivery-queue-sqlite-C2mJ-TeJ.js";
import { a as getErrnoCode, c as resolveDeliveryRecoveryDeadlineMs, n as createDeliveryRecoveryCoordinator, o as isDeliveryRecoveryRetryEligible, r as createEmptyDeliveryRecoverySummary } from "./delivery-recovery.shared-CehMLTLc.js";
//#region src/infra/session-delivery-queue-storage.ts
const SESSION_DELIVERY_QUEUE_NAME = "session";
function prepareClaimedSessionDelivery(params, initialAttemptLeaseMs, now = Date.now()) {
	return {
		...params,
		id: buildEntryId(params.idempotencyKey),
		enqueuedAt: now,
		retryCount: 0,
		availableAt: now + Math.max(0, initialAttemptLeaseMs)
	};
}
var SessionDeliveryDeferredError = class extends Error {
	constructor(..._args) {
		super(..._args);
		this.name = "SessionDeliveryDeferredError";
	}
};
/** Signals that retry budget was already persisted before a later transition failed. */
var SessionDeliveryRetryChargedError = class extends Error {
	constructor(..._args2) {
		super(..._args2);
		this.name = "SessionDeliveryRetryChargedError";
	}
};
/** Signals that durable pre-delivery ownership could not be established. */
var SessionDeliveryAttemptStartError = class extends Error {
	constructor(..._args3) {
		super(..._args3);
		this.name = "SessionDeliveryAttemptStartError";
	}
};
/** Signals that delivery proved no external or transcript side effect committed. */
var SessionDeliverySafeRetryError = class extends Error {
	constructor(..._args4) {
		super(..._args4);
		this.name = "SessionDeliverySafeRetryError";
	}
};
/** Signals that recovery must settle this pending row as failed without replaying delivery. */
var SessionDeliveryDeadLetteredError = class extends Error {
	constructor(..._args5) {
		super(..._args5);
		this.name = "SessionDeliveryDeadLetteredError";
	}
};
function buildEntryId(idempotencyKey) {
	if (!idempotencyKey) return generateSecureUuid();
	return sha256Hex(idempotencyKey);
}
/** Enqueue a session delivery and return its durable id. */
async function enqueueSessionDelivery(params, stateDir) {
	const id = buildEntryId(params.idempotencyKey);
	const entry = {
		...params,
		id,
		enqueuedAt: Date.now(),
		retryCount: 0
	};
	upsertDeliveryQueueEntry({
		queueName: SESSION_DELIVERY_QUEUE_NAME,
		entry,
		stateDir,
		...params.completionRetention === "permanent" ? { insertOnly: true } : { reviveFailedOrCorruptPending: Boolean(params.idempotencyKey) }
	});
	return id;
}
/** Enqueue and lease the first attempt to one caller before recovery can see it as eligible. */
async function enqueueClaimedSessionDelivery(params, initialAttemptLeaseMs, stateDir) {
	const entry = prepareClaimedSessionDelivery(params, initialAttemptLeaseMs);
	const id = entry.id;
	const claimed = upsertDeliveryQueueEntry({
		queueName: SESSION_DELIVERY_QUEUE_NAME,
		entry,
		stateDir,
		insertOnly: true
	});
	let status;
	try {
		status = claimed ? "pending" : getDeliveryQueueEntryStatus(SESSION_DELIVERY_QUEUE_NAME, id, stateDir);
	} catch {
		return {
			id,
			claimed,
			status: "unknown"
		};
	}
	return {
		id,
		claimed,
		status: status ?? "completed"
	};
}
/** Release the initial-attempt lease so runtime recovery can retry immediately. */
async function releaseSessionDeliveryClaim(id, stateDir) {
	updateDeliveryQueueEntry(SESSION_DELIVERY_QUEUE_NAME, id, stateDir, (entry) => ({
		...entry,
		availableAt: Date.now()
	}));
}
/** Defer a currently owned delivery without consuming its retry budget. */
async function deferSessionDelivery(id, delayMs, stateDir) {
	updateDeliveryQueueEntry(SESSION_DELIVERY_QUEUE_NAME, id, stateDir, (entry) => ({
		...entry,
		availableAt: Date.now() + Math.max(0, delayMs)
	}));
}
/** Advance only after a completed agent turn proves a fresh run is safe. */
async function advanceSessionDeliveryAgentRun(id, updates, stateDir) {
	updateDeliveryQueueEntry(SESSION_DELIVERY_QUEUE_NAME, id, stateDir, (entry) => {
		const queued = entry;
		if (queued.kind !== "agentTurn") return queued;
		return {
			...queued,
			agentRunAttempt: (queued.agentRunAttempt ?? 0) + 1,
			deliveryStartedAt: void 0,
			...updates?.message ? { message: updates.message } : {},
			...updates?.expectedMediaUrls ? { expectedMediaUrls: updates.expectedMediaUrls } : {},
			...updates?.suppressTextDelivery === true ? { suppressTextDelivery: true } : {}
		};
	});
}
/** Mark an agent turn before it can commit transcript or channel side effects. */
async function markSessionDeliveryAttemptStarted(entry, stateDir) {
	try {
		if (!upsertDeliveryQueueEntry({
			queueName: "session",
			entry: {
				...entry,
				deliveryStartedAt: entry.deliveryStartedAt ?? Date.now()
			},
			stateDir,
			updatePendingOnly: true
		})) throw new Error(`Session delivery ${entry.id} is no longer pending`);
	} catch (error) {
		throw new SessionDeliveryAttemptStartError(`Session delivery ${entry.id} could not persist attempt ownership`, { cause: error });
	}
}
/** Signals that a delivered result still needs durable settlement finalization. */
var SessionDeliveryAcknowledgementFinalizeError = class extends Error {
	constructor(id, options) {
		super(`Session delivery ${id} still needs settlement finalization`, options);
		this.name = "SessionDeliveryAcknowledgementFinalizeError";
	}
};
/** Persist terminal delivery state while retaining settlement cleanup metadata. */
async function markSessionDeliverySettlement(entry, outcome, stateDir) {
	try {
		if (upsertDeliveryQueueEntry({
			queueName: "session",
			entry: {
				...entry,
				settlementOutcome: outcome,
				...outcome === "recovered" ? { acknowledgedAt: entry.acknowledgedAt ?? Date.now() } : {}
			},
			stateDir,
			updatePendingOnly: true
		})) return;
		if (getDeliveryQueueEntryStatus("session", entry.id, stateDir) === "completed") return;
		throw new Error(`Session delivery ${entry.id} is no longer pending`);
	} catch (error) {
		try {
			if (getDeliveryQueueEntryStatus("session", entry.id, stateDir) === "completed") return;
		} catch {}
		throw new SessionDeliveryAcknowledgementFinalizeError(entry.id, { cause: error });
	}
}
/** Replace a settled pending row with its completed idempotency tombstone. */
async function completeSessionDelivery(id, stateDir) {
	try {
		completeDeliveryQueueEntry(SESSION_DELIVERY_QUEUE_NAME, id, stateDir);
	} catch (error) {
		try {
			if (getDeliveryQueueEntryStatus("session", id, stateDir) === "completed") return;
		} catch {}
		throw new SessionDeliveryAcknowledgementFinalizeError(id, { cause: error });
	}
}
/** Record a failed delivery attempt and increment retry metadata. */
async function failSessionDelivery(id, error, stateDir, options) {
	updateDeliveryQueueEntry(SESSION_DELIVERY_QUEUE_NAME, id, stateDir, (entry) => {
		const queued = entry;
		const retryCount = queued.retryCount + 1;
		const now = Date.now();
		return {
			...queued,
			retryCount,
			...queued.kind === "agentTurn" ? { lastChargedAgentRunAttempt: queued.agentRunAttempt ?? 0 } : {},
			...options?.releaseAttemptOwnership === true ? { deliveryStartedAt: void 0 } : {},
			lastAttemptAt: now,
			...queued.kind === "agentTurn" && queued.owner?.kind === "subagent_completion" ? { availableAt: now + computeBackoff({
				initialMs: 15e3,
				factor: 2,
				maxMs: 5 * 6e4,
				jitter: .2
			}, retryCount) } : {},
			lastError: error
		};
	});
}
/** Load one pending session delivery by durable id. */
async function loadPendingSessionDelivery(id, stateDir) {
	return loadDeliveryQueueEntry(SESSION_DELIVERY_QUEUE_NAME, id, stateDir);
}
/** Load all pending session deliveries in retry order. */
async function loadPendingSessionDeliveries(stateDir) {
	return loadDeliveryQueueEntries(SESSION_DELIVERY_QUEUE_NAME, stateDir);
}
/** Move an exhausted session delivery out of the pending queue. */
async function moveSessionDeliveryToFailed(id, stateDir) {
	try {
		moveDeliveryQueueEntryToFailed(SESSION_DELIVERY_QUEUE_NAME, id, stateDir);
	} catch (error) {
		try {
			if (getDeliveryQueueEntryStatus("session", id, stateDir) === "failed") return;
		} catch {}
		throw error;
	}
}
//#endregion
//#region src/infra/session-delivery-queue-recovery.ts
const MAX_SESSION_DELIVERY_RETRIES = 5;
const recoveryCoordinator = createDeliveryRecoveryCoordinator();
async function notifySessionDeliverySettled(params) {
	try {
		await params.onSettled?.(params.entry, params.outcome);
		return true;
	} catch (error) {
		params.log.error(`session delivery: settled callback failed for ${params.entry.id}: ${String(error)}`);
		return false;
	}
}
async function finalizeSessionDeliverySettlement(params) {
	if (!await notifySessionDeliverySettled(params)) return false;
	try {
		if (params.outcome === "recovered") await completeSessionDelivery(params.entry.id, params.stateDir);
		else await moveSessionDeliveryToFailed(params.entry.id, params.stateDir);
		return true;
	} catch (error) {
		params.log.error(`session delivery: ${params.outcome} finalization failed for ${params.entry.id}: ${String(error)}`);
		return false;
	}
}
function resolvePendingSettlementOutcome(entry) {
	return entry.settlementOutcome ?? (entry.acknowledgedAt !== void 0 ? "recovered" : void 0);
}
function resolveSessionDeliveryMaxRetries(entry) {
	return entry.maxRetries ?? MAX_SESSION_DELIVERY_RETRIES;
}
function canReconcileStartedAgentAttemptAtRetryLimit(entry) {
	return entry.kind === "agentTurn" && entry.deliveryStartedAt !== void 0 && entry.retryCount === resolveSessionDeliveryMaxRetries(entry);
}
function resolveSessionRetryEligibility(entry, now) {
	if (entry.kind === "agentTurn" && entry.owner?.kind === "subagent_completion") {
		if (now >= entry.owner.deadlineAt) return { eligible: true };
		const remainingBackoffMs = Math.max(0, (entry.availableAt ?? 0) - now);
		return remainingBackoffMs > 0 ? {
			eligible: false,
			remainingBackoffMs
		} : { eligible: true };
	}
	return isDeliveryRecoveryRetryEligible(entry, now);
}
async function drainQueuedEntry(opts) {
	const { entry } = opts;
	try {
		const pendingOutcome = resolvePendingSettlementOutcome(entry);
		if (pendingOutcome) return pendingOutcome;
		await opts.deliver(entry, { stateDir: opts.stateDir });
		await markSessionDeliverySettlement(entry, "recovered", opts.stateDir);
		return "recovered";
	} catch (err) {
		if (err instanceof SessionDeliveryDeadLetteredError) {
			try {
				await markSessionDeliverySettlement(entry, "moved-to-failed", opts.stateDir);
			} catch (markError) {
				if (markError instanceof SessionDeliveryAcknowledgementFinalizeError) return "deferred";
				throw markError;
			}
			return "moved-to-failed";
		}
		if (err instanceof SessionDeliveryDeferredError) return "deferred";
		if (err instanceof SessionDeliveryAcknowledgementFinalizeError) return "deferred";
		if (err instanceof SessionDeliveryAttemptStartError) return "deferred";
		const errMsg = formatErrorMessage(err);
		opts.onFailed?.(entry, errMsg);
		if (err instanceof SessionDeliveryRetryChargedError) return "failed";
		try {
			await failSessionDelivery(entry.id, errMsg, opts.stateDir, { releaseAttemptOwnership: err instanceof SessionDeliverySafeRetryError });
			return "failed";
		} catch (failErr) {
			if (getErrnoCode(failErr) === "ENOENT") return "already-gone";
			throw failErr;
		}
	}
}
/** Drain matching queued session deliveries with retry/backoff protection. */
async function drainPendingSessionDeliveries(opts) {
	if (!await recoveryCoordinator.withDrain(opts.drainKey, async () => {
		const matchingEntries = (await loadPendingSessionDeliveries(opts.stateDir)).filter((entry) => opts.selectEntry(entry, Date.now()).match);
		await recoveryCoordinator.scan({
			entries: matchingEntries,
			loadEntry: (id) => loadPendingSessionDelivery(id, opts.stateDir),
			onClaimConflict: (entry) => {
				opts.log.info(`${opts.logLabel}: entry ${entry.id} is already being recovered`);
			},
			onEntry: async (currentEntry) => {
				const currentDecision = opts.selectEntry(currentEntry, Date.now());
				if (!currentDecision.match) return;
				const pendingSettlementOutcome = resolvePendingSettlementOutcome(currentEntry);
				if (!pendingSettlementOutcome && !canReconcileStartedAgentAttemptAtRetryLimit(currentEntry) && currentEntry.retryCount >= resolveSessionDeliveryMaxRetries(currentEntry)) {
					await markSessionDeliverySettlement(currentEntry, "moved-to-failed", opts.stateDir);
					if (await finalizeSessionDeliverySettlement({
						entry: currentEntry,
						log: opts.log,
						onSettled: opts.onSettled,
						outcome: "moved-to-failed",
						stateDir: opts.stateDir
					})) opts.log.warn(`${opts.logLabel}: entry ${currentEntry.id} exceeded max retries and was moved to failed`);
					return;
				}
				if (!pendingSettlementOutcome && !currentDecision.bypassBackoff) {
					const retryEligibility = resolveSessionRetryEligibility(currentEntry, Date.now());
					if (!retryEligibility.eligible) {
						opts.log.info(`${opts.logLabel}: entry ${currentEntry.id} not ready for retry yet — backoff ${retryEligibility.remainingBackoffMs}ms remaining`);
						return;
					}
				}
				const result = await drainQueuedEntry({
					entry: currentEntry,
					deliver: opts.deliver,
					stateDir: opts.stateDir,
					onFailed: (failedEntry, errMsg) => {
						opts.log.warn(`${opts.logLabel}: retry failed for entry ${failedEntry.id}: ${errMsg}`);
					}
				});
				if (result === "recovered" || result === "moved-to-failed") await finalizeSessionDeliverySettlement({
					entry: currentEntry,
					log: opts.log,
					onSettled: opts.onSettled,
					outcome: result,
					stateDir: opts.stateDir
				});
			}
		});
	})) opts.log.info(`${opts.logLabel}: already in progress for ${opts.drainKey}, skipping`);
}
/** Replay pending session deliveries until the recovery budget is exhausted. */
async function recoverPendingSessionDeliveries(opts) {
	const pending = (await loadPendingSessionDeliveries(opts.stateDir)).filter((entry) => opts.maxEnqueuedAt == null || entry.enqueuedAt <= opts.maxEnqueuedAt);
	if (pending.length === 0) return createEmptyDeliveryRecoverySummary();
	const summary = createEmptyDeliveryRecoverySummary();
	const deadline = resolveDeliveryRecoveryDeadlineMs(opts.maxRecoveryMs);
	const onDeadlineExceeded = () => {
		opts.log.warn("Session delivery recovery time budget exceeded — remaining entries deferred");
	};
	await recoveryCoordinator.scan({
		entries: pending,
		loadEntry: (id) => loadPendingSessionDelivery(id, opts.stateDir),
		deadlineMs: deadline,
		onDeadlineExceeded,
		onEntry: async (currentEntry) => {
			if (opts.maxEnqueuedAt != null && currentEntry.enqueuedAt > opts.maxEnqueuedAt) return "continue";
			const pendingSettlementOutcome = resolvePendingSettlementOutcome(currentEntry);
			if (!pendingSettlementOutcome && !canReconcileStartedAgentAttemptAtRetryLimit(currentEntry) && currentEntry.retryCount >= resolveSessionDeliveryMaxRetries(currentEntry)) {
				summary.skippedMaxRetries += 1;
				await markSessionDeliverySettlement(currentEntry, "moved-to-failed", opts.stateDir);
				await finalizeSessionDeliverySettlement({
					entry: currentEntry,
					log: opts.log,
					onSettled: opts.onSettled,
					outcome: "moved-to-failed",
					stateDir: opts.stateDir
				});
				return "continue";
			}
			if (!pendingSettlementOutcome) {
				if (!resolveSessionRetryEligibility(currentEntry, Date.now()).eligible) {
					summary.deferredBackoff += 1;
					return "continue";
				}
				if (await recoveryCoordinator.waitForReplay(deadline) === "deadline-exceeded") {
					onDeadlineExceeded();
					return "stop";
				}
			}
			const result = await drainQueuedEntry({
				entry: currentEntry,
				deliver: opts.deliver,
				stateDir: opts.stateDir,
				onFailed: (_failedEntry, errMsg) => {
					summary.failed += 1;
					opts.log.warn(`Session delivery retry failed: ${errMsg}`);
				}
			});
			if (result === "recovered" || result === "moved-to-failed") {
				if (await finalizeSessionDeliverySettlement({
					entry: currentEntry,
					log: opts.log,
					onSettled: opts.onSettled,
					outcome: result,
					stateDir: opts.stateDir
				}) && result === "recovered") {
					summary.recovered += 1;
					opts.log.info(`Recovered session delivery ${currentEntry.id}`);
				}
			}
			return "continue";
		}
	});
	return summary;
}
//#endregion
export { prepareClaimedSessionDelivery as _, SessionDeliveryDeferredError as a, advanceSessionDeliveryAgentRun as c, enqueueSessionDelivery as d, failSessionDelivery as f, markSessionDeliverySettlement as g, markSessionDeliveryAttemptStarted as h, SessionDeliveryDeadLetteredError as i, deferSessionDelivery as l, loadPendingSessionDelivery as m, recoverPendingSessionDeliveries as n, SessionDeliveryRetryChargedError as o, loadPendingSessionDeliveries as p, SESSION_DELIVERY_QUEUE_NAME as r, SessionDeliverySafeRetryError as s, drainPendingSessionDeliveries as t, enqueueClaimedSessionDelivery as u, releaseSessionDeliveryClaim as v };
