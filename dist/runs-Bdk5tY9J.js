import { j as resolveTimerTimeoutMs } from "./number-coercion-Crk_c9KW.js";
import "./number-coercion-IpMOa8nH.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { r as getRuntimeConfig } from "./io-BsQc3Kgy.js";
import { c as isAgentEventLifecycleGenerationCurrent, s as getAgentEventLifecycleGeneration } from "./agent-events-COCf-9-O.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { st as loadSqliteSessionEntry } from "./session-accessor.sqlite-CtCo5VZ6.js";
import { K as updateSessionEntry } from "./session-accessor-D5Or7WgI.js";
import { a as getDiagnosticSessionActivitySnapshot, c as markDiagnosticEmbeddedRunStarted, d as resolveRunStaleThresholdMs, s as markDiagnosticEmbeddedRunEnded } from "./diagnostic-run-activity-3mcrQxEA.js";
import { a as logMessageQueuedWithBacklogPolicy, t as diagnosticLogger } from "./diagnostic-runtime-D23gjKvk.js";
import { C as queueReplyRunMessage, E as resolveActiveReplyRunSessionId, N as waitForReplyRunEndBySessionId, O as resolveReplyBackendQueueMessageMismatch, T as resolveActiveReplyOperationForSessionId, a as abortActiveReplyRuns, b as listActiveReplyRunSessionIds, d as forceClearReplyOperation, g as isReplyRunActiveForSessionId, k as resolveReplyRunPhaseForSessionId, m as isReplyRunAbortableForCompaction, o as abortReplyRunBySessionId, u as expireStaleReplyRunBySessionId, v as isReplyRunEvidenceStaleBySessionId, y as isReplyRunStreamingForSessionId } from "./reply-run-registry-CFY_Ts2Y.js";
import { d as logSessionStateChange } from "./diagnostic-CdMjo2Fb.js";
import { n as resolveTopicIsolation } from "./topic-isolation-policy-CKfDqoAd.js";
import { a as ACTIVE_EMBEDDED_RUNS_BY_RUN_ID, c as ACTIVE_EMBEDDED_RUN_SNAPSHOTS, d as getActiveEmbeddedRunCount, h as setActiveEmbeddedRunLifecycleGeneration, i as ACTIVE_EMBEDDED_RUNS, l as EMBEDDED_RUN_WAITERS, n as ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_FILE, o as ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_FILE, r as ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_KEY, s as ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_KEY, t as ABANDONED_EMBEDDED_RUNS_BY_SESSION_ID, u as RETAINED_EMBEDDED_RUN_ABORTABILITY_RUN_IDS } from "./run-state-oGYwHnd-.js";
import fs from "node:fs";
import path from "node:path";
//#region src/agents/embedded-agent-runner/runs.ts
/**
* Manages active embedded-agent run handles, queues, aborts, and waiters.
*/
function createQueueFailureOutcome(sessionId, reason, errorMessage) {
	return {
		queued: false,
		sessionId,
		reason,
		gatewayHealth: "live",
		...errorMessage ? { errorMessage } : {}
	};
}
function formatEmbeddedAgentQueueFailureSummary(outcome) {
	if (outcome.queued) return;
	const errorPart = outcome.errorMessage ? ` error=${outcome.errorMessage}` : "";
	return `queue_message_failed reason=${outcome.reason} sessionId=${outcome.sessionId} gatewayHealth=${outcome.gatewayHealth}${errorPart}`;
}
const ACTIVE_RUN_WORKER_ASSIGNMENTS = /* @__PURE__ */ new Map();
/** Records the topic-isolation routing decision for an active run. */
function recordActiveRunTopicIsolation(sessionId, sessionKey, poolConfig) {
	const topicKey = sessionKey?.trim() || sessionId;
	const decision = resolveTopicIsolation({
		topicKey,
		workerCount: poolConfig?.workerCount ?? 1,
		isolationMode: poolConfig?.isolationMode
	});
	ACTIVE_RUN_WORKER_ASSIGNMENTS.set(sessionId, decision);
	if (decision.isolate) diagnosticLogger.debug(`topic isolation: sessionId=${sessionId} topicKey=${topicKey} worker=${decision.assignment.workerKey}`);
	return decision;
}
/** Returns the recorded worker assignment for an active run, if any. */
function getActiveRunWorkerAssignment(sessionId) {
	return ACTIVE_RUN_WORKER_ASSIGNMENTS.get(sessionId);
}
/** Clears the worker assignment for a run (called when the run ends). */
function clearActiveRunWorkerAssignment(sessionId) {
	ACTIVE_RUN_WORKER_ASSIGNMENTS.delete(sessionId);
}
function setActiveRunSessionKey(sessionKey, sessionId) {
	const normalizedSessionKey = sessionKey?.trim();
	if (!normalizedSessionKey) return;
	ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_KEY.set(normalizedSessionKey, sessionId);
}
function clearActiveRunSessionKeys(sessionId, sessionKey) {
	const normalizedSessionKey = sessionKey?.trim();
	if (normalizedSessionKey) {
		if (ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_KEY.get(normalizedSessionKey) === sessionId) ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_KEY.delete(normalizedSessionKey);
		return;
	}
	for (const [key, activeSessionId] of ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_KEY) if (activeSessionId === sessionId) ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_KEY.delete(key);
}
function normalizeSessionFileRegistryKey(sessionFile) {
	const normalized = sessionFile?.trim();
	if (!normalized) return;
	if (normalized.startsWith("agent:") || normalized.startsWith("sqlite:") || normalized.startsWith("in-memory:")) return normalized;
	const resolved = path.resolve(normalized);
	const parent = path.dirname(resolved);
	try {
		return path.join(fs.realpathSync(parent), path.basename(resolved));
	} catch {
		return resolved;
	}
}
function setActiveRunSessionFile(sessionFile, sessionId) {
	const normalizedSessionFile = normalizeSessionFileRegistryKey(sessionFile);
	if (!normalizedSessionFile) return;
	ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_FILE.set(normalizedSessionFile, sessionId);
}
function clearEmbeddedRunAbandonmentBySessionId(sessionId) {
	const abandonedRun = ABANDONED_EMBEDDED_RUNS_BY_SESSION_ID.get(sessionId);
	if (!abandonedRun) return;
	ABANDONED_EMBEDDED_RUNS_BY_SESSION_ID.delete(sessionId);
	const normalizedSessionKey = abandonedRun.sessionKey?.trim();
	if (normalizedSessionKey && ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_KEY.get(normalizedSessionKey) === sessionId) ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_KEY.delete(normalizedSessionKey);
	const normalizedSessionFile = normalizeSessionFileRegistryKey(abandonedRun.sessionFile);
	if (normalizedSessionFile) {
		const sessionFileKey = normalizedSessionFile;
		if (ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_FILE.get(sessionFileKey) === sessionId) ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_FILE.delete(sessionFileKey);
	}
}
function clearEmbeddedRunAbandonmentBySessionKey(sessionKey) {
	const normalizedSessionKey = sessionKey?.trim();
	if (!normalizedSessionKey) return;
	const sessionId = ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_KEY.get(normalizedSessionKey);
	if (sessionId) clearEmbeddedRunAbandonmentBySessionId(sessionId);
}
function clearEmbeddedRunAbandonmentBySessionFile(sessionFile) {
	const normalizedSessionFile = normalizeSessionFileRegistryKey(sessionFile);
	if (!normalizedSessionFile) return;
	const sessionFileKey = normalizedSessionFile;
	const sessionId = ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_FILE.get(sessionFileKey);
	if (sessionId) clearEmbeddedRunAbandonmentBySessionId(sessionId);
}
function clearEmbeddedRunAbandonment(params) {
	const normalizedSessionId = params.sessionId?.trim();
	if (normalizedSessionId) clearEmbeddedRunAbandonmentBySessionId(normalizedSessionId);
	clearEmbeddedRunAbandonmentBySessionKey(params.sessionKey);
	clearEmbeddedRunAbandonmentBySessionFile(params.sessionFile);
}
function markEmbeddedRunAbandoned(params) {
	const sessionId = params.sessionId.trim();
	if (!sessionId) return;
	clearEmbeddedRunAbandonment({
		sessionId,
		sessionKey: params.sessionKey,
		sessionFile: params.sessionFile
	});
	const normalizedSessionFile = normalizeSessionFileRegistryKey(params.sessionFile);
	const abandonedRun = {
		sessionId,
		abandonedAtMs: Date.now(),
		reason: params.reason,
		...params.sessionKey?.trim() ? { sessionKey: params.sessionKey.trim() } : {},
		...normalizedSessionFile ? { sessionFile: normalizedSessionFile } : {}
	};
	ABANDONED_EMBEDDED_RUNS_BY_SESSION_ID.set(sessionId, abandonedRun);
	if (abandonedRun.sessionKey) ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_KEY.set(abandonedRun.sessionKey, sessionId);
	if (abandonedRun.sessionFile) ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_FILE.set(abandonedRun.sessionFile, sessionId);
}
function markActiveEmbeddedRunAbandoned(params) {
	const sessionId = params.sessionId.trim();
	if (!sessionId || ACTIVE_EMBEDDED_RUNS.get(sessionId) !== params.handle) return false;
	markEmbeddedRunAbandoned(params);
	return true;
}
function isEmbeddedRunAbandoned(params) {
	const normalizedSessionId = params.sessionId?.trim();
	if (normalizedSessionId && ABANDONED_EMBEDDED_RUNS_BY_SESSION_ID.has(normalizedSessionId)) return true;
	const normalizedSessionKey = params.sessionKey?.trim();
	if (normalizedSessionKey && ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_KEY.has(normalizedSessionKey)) return true;
	const normalizedSessionFile = normalizeSessionFileRegistryKey(params.sessionFile);
	return Boolean(normalizedSessionFile && ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_FILE.has(normalizedSessionFile));
}
function clearActiveRunSessionFiles(sessionId, sessionFile) {
	const normalizedSessionFile = normalizeSessionFileRegistryKey(sessionFile);
	if (normalizedSessionFile) {
		if (ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_FILE.get(normalizedSessionFile) === sessionId) ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_FILE.delete(normalizedSessionFile);
	}
	for (const [sessionFileKey, activeSessionId] of ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_FILE) if (activeSessionId === sessionId) ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_FILE.delete(sessionFileKey);
}
/**
* @deprecated Prefer queueEmbeddedAgentMessageWithOutcomeAsync when callers need to
* know whether steering was accepted. This sync helper is fire-and-forget after
* initial eligibility and only logs later runtime rejection.
*/
function queueEmbeddedAgentMessageWithOutcome(sessionId, text, options) {
	const prepared = prepareEmbeddedAgentQueueMessage(sessionId, text, options);
	if (prepared.kind === "complete") return prepared.outcome;
	logActiveRunMessageAccepted(sessionId);
	prepared.handle.queueMessage(text, options ?? { steeringMode: "all" }).catch((err) => {
		diagnosticLogger.debug(`queue message rejected after enqueue: sessionId=${sessionId} err=${formatErrorMessage(err)}`);
	});
	return {
		queued: true,
		sessionId,
		target: "embedded_run",
		gatewayHealth: "live",
		enqueuedAtMs: Date.now()
	};
}
function logActiveRunMessageAccepted(sessionId) {
	logMessageQueuedWithBacklogPolicy({
		sessionId,
		source: "embedded-agent-runner"
	}, false);
}
function isEmbeddedQueueHandleMessageInjectable(sessionId, handle) {
	try {
		return handle.isStopped === void 0 ? handle.isStreaming() : !handle.isStopped();
	} catch (err) {
		diagnosticLogger.warn(`queue message failed: sessionId=${sessionId} reason=injectable_check_failed err=${String(err)}`);
		return false;
	}
}
function isEmbeddedRunHandleAbortable(sessionId, handle) {
	try {
		return handle.isAbortable?.() !== false;
	} catch (err) {
		diagnosticLogger.warn(`abort failed: sessionId=${sessionId} reason=abortable_check_failed err=${String(err)}`);
		return false;
	}
}
function isEmbeddedAgentRunAbortableForRunId(runId) {
	const normalizedRunId = runId.trim();
	if (!normalizedRunId) return true;
	const handle = ACTIVE_EMBEDDED_RUNS_BY_RUN_ID.get(normalizedRunId);
	return handle ? isEmbeddedRunHandleAbortable(normalizedRunId, handle) : true;
}
function clearEmbeddedAgentRunAbortabilityForRunId(runId) {
	const normalizedRunId = runId.trim();
	if (normalizedRunId) {
		ACTIVE_EMBEDDED_RUNS_BY_RUN_ID.delete(normalizedRunId);
		RETAINED_EMBEDDED_RUN_ABORTABILITY_RUN_IDS.delete(normalizedRunId);
	}
}
function retainEmbeddedAgentRunAbortabilityForRunId(runId) {
	const normalizedRunId = runId.trim();
	if (normalizedRunId) RETAINED_EMBEDDED_RUN_ABORTABILITY_RUN_IDS.add(normalizedRunId);
}
function clearEmbeddedRunAbortability(handle, opts) {
	if (!handle.runId || ACTIVE_EMBEDDED_RUNS_BY_RUN_ID.get(handle.runId) !== handle) return;
	if (opts?.retainFinalizing && RETAINED_EMBEDDED_RUN_ABORTABILITY_RUN_IDS.has(handle.runId) && !isEmbeddedRunHandleAbortable(handle.runId, handle)) return;
	ACTIVE_EMBEDDED_RUNS_BY_RUN_ID.delete(handle.runId);
}
async function queueEmbeddedAgentMessageWithOutcomeAsync(sessionId, text, options) {
	const prepared = prepareEmbeddedAgentQueueMessage(sessionId, text, options);
	if (prepared.kind === "complete") return prepared.outcome;
	try {
		const enqueuedAtMs = Date.now();
		await prepared.handle.queueMessage(text, options ?? { steeringMode: "all" });
		const deliveredAtMs = options?.waitForTranscriptCommit ? Date.now() : void 0;
		logActiveRunMessageAccepted(sessionId);
		return {
			queued: true,
			sessionId,
			target: "embedded_run",
			gatewayHealth: "live",
			...deliveredAtMs !== void 0 ? { deliveredAtMs } : {},
			enqueuedAtMs
		};
	} catch (err) {
		const errorMessage = formatErrorMessage(err);
		diagnosticLogger.debug(`queue message rejected: sessionId=${sessionId} err=${errorMessage}`);
		return createQueueFailureOutcome(sessionId, "runtime_rejected", errorMessage);
	}
}
function prepareEmbeddedAgentQueueMessage(sessionId, text, options) {
	const handle = ACTIVE_EMBEDDED_RUNS.get(sessionId);
	if (!handle) {
		if (isReplyRunEvidenceStaleBySessionId(sessionId)) {
			diagnosticLogger.debug(`queue message failed: sessionId=${sessionId} reason=stale_run`);
			return {
				kind: "complete",
				outcome: createQueueFailureOutcome(sessionId, "stale_run")
			};
		}
		if (options?.waitForTranscriptCommit === true) {
			diagnosticLogger.debug(`queue message failed: sessionId=${sessionId} reason=transcript_commit_wait_unsupported`);
			return {
				kind: "complete",
				outcome: createQueueFailureOutcome(sessionId, "transcript_commit_wait_unsupported")
			};
		}
		if (queueReplyRunMessage(sessionId, text, options)) {
			logActiveRunMessageAccepted(sessionId);
			return {
				kind: "complete",
				outcome: {
					queued: true,
					sessionId,
					target: "reply_run",
					gatewayHealth: "live",
					enqueuedAtMs: Date.now()
				}
			};
		}
		diagnosticLogger.debug(`queue message failed: sessionId=${sessionId} reason=no_active_run`);
		return {
			kind: "complete",
			outcome: createQueueFailureOutcome(sessionId, "no_active_run")
		};
	}
	if (!isEmbeddedQueueHandleMessageInjectable(sessionId, handle)) {
		diagnosticLogger.debug(`queue message failed: sessionId=${sessionId} reason=not_streaming`);
		return {
			kind: "complete",
			outcome: createQueueFailureOutcome(sessionId, "not_streaming")
		};
	}
	const activity = getDiagnosticSessionActivitySnapshot({ sessionId });
	if (typeof activity.lastProgressAgeMs === "number" && activity.lastProgressAgeMs > resolveRunStaleThresholdMs(activity)) {
		diagnosticLogger.debug(`queue message failed: sessionId=${sessionId} reason=stale_run`);
		return {
			kind: "complete",
			outcome: createQueueFailureOutcome(sessionId, "stale_run")
		};
	}
	if (handle.isCompacting()) {
		diagnosticLogger.debug(`queue message failed: sessionId=${sessionId} reason=compacting`);
		return {
			kind: "complete",
			outcome: createQueueFailureOutcome(sessionId, "compacting")
		};
	}
	if (options?.waitForTranscriptCommit === true && handle.supportsTranscriptCommitWait !== true) {
		diagnosticLogger.debug(`queue message failed: sessionId=${sessionId} reason=transcript_commit_wait_unsupported`);
		return {
			kind: "complete",
			outcome: createQueueFailureOutcome(sessionId, "transcript_commit_wait_unsupported")
		};
	}
	const deliveryModeMismatch = resolveReplyBackendQueueMessageMismatch(handle, options);
	if (deliveryModeMismatch) {
		diagnosticLogger.debug(`queue message failed: sessionId=${sessionId} reason=${deliveryModeMismatch}`);
		return {
			kind: "complete",
			outcome: createQueueFailureOutcome(sessionId, deliveryModeMismatch)
		};
	}
	return {
		kind: "embedded_run",
		handle
	};
}
function abortEmbeddedAgentRun(sessionId, opts) {
	if (typeof sessionId === "string" && sessionId.length > 0) {
		const handle = ACTIVE_EMBEDDED_RUNS.get(sessionId);
		if (!handle) {
			if (abortReplyRunBySessionId(sessionId)) return true;
			diagnosticLogger.debug(`abort failed: sessionId=${sessionId} reason=no_active_run`);
			return false;
		}
		if (!isEmbeddedRunHandleAbortable(sessionId, handle)) {
			diagnosticLogger.debug(`abort failed: sessionId=${sessionId} reason=not_abortable`);
			return false;
		}
		diagnosticLogger.debug(`aborting run: sessionId=${sessionId}`);
		try {
			handle.abort(opts?.reason);
		} catch (err) {
			diagnosticLogger.warn(`abort failed: sessionId=${sessionId} err=${String(err)}`);
			return false;
		}
		return true;
	}
	const abortActiveEmbeddedRunHandles = (params) => {
		let aborted = false;
		for (const [id, handle] of ACTIVE_EMBEDDED_RUNS) {
			if (params.skipSessionIds?.has(id)) continue;
			if (!params.shouldAbort(handle)) continue;
			if (!isEmbeddedRunHandleAbortable(id, handle)) continue;
			diagnosticLogger.debug(params.formatDebugMessage(id));
			try {
				handle.abort(opts?.reason);
				aborted = true;
			} catch (err) {
				diagnosticLogger.warn(`abort failed: sessionId=${id} err=${String(err)}`);
			}
		}
		return aborted;
	};
	const mode = opts?.mode;
	if (mode === "compacting") {
		const replyOwnedSessionIds = new Set(listActiveReplyRunSessionIds());
		const replyAborted = abortActiveReplyRuns({
			mode,
			onAbortError: (id, err) => diagnosticLogger.warn(`abort failed: sessionId=${id} owner=reply_run err=${String(err)}`)
		});
		const aborted = abortActiveEmbeddedRunHandles({
			shouldAbort: (handle) => handle.isCompacting(),
			formatDebugMessage: (id) => `aborting compacting run: sessionId=${id}`,
			skipSessionIds: replyOwnedSessionIds
		});
		return replyAborted || aborted;
	}
	if (mode === "all") {
		const replyOwnedSessionIds = new Set(listActiveReplyRunSessionIds());
		const replyAborted = abortActiveReplyRuns({
			mode,
			onAbortError: (id, err) => diagnosticLogger.warn(`abort failed: sessionId=${id} owner=reply_run err=${String(err)}`)
		});
		const aborted = abortActiveEmbeddedRunHandles({
			shouldAbort: () => true,
			formatDebugMessage: (id) => `aborting run: sessionId=${id}`,
			skipSessionIds: replyOwnedSessionIds
		});
		return replyAborted || aborted;
	}
	return false;
}
function isEmbeddedAgentRunActive(sessionId) {
	const active = ACTIVE_EMBEDDED_RUNS.has(sessionId) || isReplyRunActiveForSessionId(sessionId);
	if (active) diagnosticLogger.debug(`run active check: sessionId=${sessionId} active=true`);
	return active;
}
/**
* Returns whether a registry-owned run is still doing user-visible work.
* Terminal reply operations and aborted handles retain their lane for cleanup,
* but must not keep session activity projections in the running state.
*/
function isEmbeddedAgentRunInProgress(sessionId) {
	const replyPhase = resolveReplyRunPhaseForSessionId(sessionId);
	const replyInProgress = replyPhase !== void 0 && replyPhase !== "completed" && replyPhase !== "failed" && replyPhase !== "aborted";
	const handle = ACTIVE_EMBEDDED_RUNS.get(sessionId);
	let handleInProgress = handle !== void 0;
	if (handle?.isAborted) try {
		if (handle.isAborted()) handleInProgress = false;
	} catch {
		handleInProgress = true;
	}
	return replyInProgress || handleInProgress;
}
function resolveEmbeddedAgentReplyRunPhase(sessionId) {
	return resolveReplyRunPhaseForSessionId(sessionId);
}
function isEmbeddedAgentRunHandleActive(sessionId) {
	const active = ACTIVE_EMBEDDED_RUNS.has(sessionId);
	if (active) diagnosticLogger.debug(`run handle active check: sessionId=${sessionId} active=true`);
	return active;
}
function isEmbeddedAgentRunAbortableForCompaction(sessionId) {
	const active = ACTIVE_EMBEDDED_RUNS.get(sessionId) ? true : isReplyRunAbortableForCompaction(sessionId);
	if (active) diagnosticLogger.debug(`run compact coordination check: sessionId=${sessionId} active=true`);
	return active;
}
function isEmbeddedAgentRunStreaming(sessionId) {
	const handle = ACTIVE_EMBEDDED_RUNS.get(sessionId);
	if (!handle) return isReplyRunStreamingForSessionId(sessionId);
	return handle.isStreaming();
}
function resolveActiveEmbeddedRunHandleSessionId(sessionKey) {
	const normalizedSessionKey = sessionKey.trim();
	if (!normalizedSessionKey) return;
	return ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_KEY.get(normalizedSessionKey);
}
function resolveActiveEmbeddedRunHandleSessionIdBySessionFile(sessionFile) {
	const normalizedSessionFile = normalizeSessionFileRegistryKey(sessionFile);
	if (!normalizedSessionFile) return;
	return ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_FILE.get(normalizedSessionFile);
}
function resolveActiveEmbeddedRunSessionIdBySessionFile(sessionFile) {
	return resolveActiveEmbeddedRunHandleSessionIdBySessionFile(sessionFile);
}
function getActiveEmbeddedRunSnapshot(sessionId) {
	return ACTIVE_EMBEDDED_RUN_SNAPSHOTS.get(sessionId);
}
/**
* Wait for active embedded runs to drain.
*
* Used during restarts so in-flight runs can release session write locks before
* the next lifecycle starts. If no timeout is passed, waits indefinitely.
*/
async function waitForActiveEmbeddedRuns(timeoutMs, opts) {
	const pollMs = resolveTimerTimeoutMs(opts?.pollMs ?? 250, 250, 10);
	if (timeoutMs !== void 0 && timeoutMs <= 0) return { drained: getActiveEmbeddedRunCount() === 0 };
	const maxWaitMs = typeof timeoutMs === "number" && Number.isFinite(timeoutMs) ? Math.max(pollMs, Math.floor(timeoutMs)) : void 0;
	const startedAt = Date.now();
	while (true) {
		if (getActiveEmbeddedRunCount() === 0) return { drained: true };
		const elapsedMs = Date.now() - startedAt;
		if (maxWaitMs !== void 0 && elapsedMs >= maxWaitMs) {
			diagnosticLogger.warn(`wait for active embedded runs timed out: activeRuns=${getActiveEmbeddedRunCount()} timeoutMs=${maxWaitMs}`);
			return { drained: false };
		}
		await new Promise((resolve) => {
			setTimeout(resolve, pollMs);
		});
	}
}
function waitForCurrentEmbeddedAgentRunEnd(sessionId, timeoutMs) {
	if (!ACTIVE_EMBEDDED_RUNS.has(sessionId)) return waitForReplyRunEndBySessionId(sessionId, timeoutMs);
	const timeoutLabel = timeoutMs === null ? "none" : String(timeoutMs);
	diagnosticLogger.debug(`waiting for run end: sessionId=${sessionId} timeoutMs=${timeoutLabel}`);
	return new Promise((resolve) => {
		const waiters = EMBEDDED_RUN_WAITERS.get(sessionId) ?? /* @__PURE__ */ new Set();
		const waiter = { resolve };
		if (timeoutMs !== null) waiter.timer = setTimeout(() => {
			waiters.delete(waiter);
			if (waiters.size === 0) EMBEDDED_RUN_WAITERS.delete(sessionId);
			diagnosticLogger.warn(`wait timeout: sessionId=${sessionId} timeoutMs=${timeoutMs}`);
			resolve(false);
		}, resolveTimerTimeoutMs(timeoutMs, 100, 100));
		waiters.add(waiter);
		EMBEDDED_RUN_WAITERS.set(sessionId, waiters);
		if (!ACTIVE_EMBEDDED_RUNS.has(sessionId)) {
			waiters.delete(waiter);
			if (waiters.size === 0) EMBEDDED_RUN_WAITERS.delete(sessionId);
			if (waiter.timer) clearTimeout(waiter.timer);
			resolve(true);
		}
	});
}
async function waitForEmbeddedAgentRunEnd(sessionId, timeoutMs = 15e3) {
	if (!sessionId) return true;
	const deadline = timeoutMs === null ? void 0 : Date.now() + timeoutMs;
	while (isEmbeddedAgentRunActive(sessionId)) {
		const remainingMs = deadline === void 0 ? null : deadline - Date.now();
		if (remainingMs !== null && remainingMs <= 0) return false;
		if (!await waitForCurrentEmbeddedAgentRunEnd(sessionId, remainingMs)) return false;
	}
	return true;
}
async function abortAndDrainEmbeddedAgentRun(params) {
	const settleMs = params.settleMs ?? 15e3;
	const embeddedRunHandle = ACTIVE_EMBEDDED_RUNS.get(params.sessionId);
	const replyOperation = resolveActiveReplyOperationForSessionId(params.sessionId);
	const expiredReplyRun = params.reason === "stuck_recovery" && expireStaleReplyRunBySessionId(params.sessionId, "stuck_recovery");
	if (expiredReplyRun && !ACTIVE_EMBEDDED_RUNS.has(params.sessionId)) {
		await new Promise((resolve) => {
			setImmediate(resolve);
		});
		return {
			aborted: true,
			drained: await waitForEmbeddedAgentRunEnd(params.sessionId, settleMs),
			forceCleared: false
		};
	}
	const aborted = abortEmbeddedAgentRun(params.sessionId) || expiredReplyRun;
	const drained = aborted ? await waitForEmbeddedAgentRunEnd(params.sessionId, settleMs) : false;
	const persistenceSnapshot = params.forceClear === true && params.sessionKey ? tryLoadForceClearSessionSnapshot(params.sessionKey) : void 0;
	const forceCleared = params.forceClear === true && (!aborted || !drained) ? forceClearEmbeddedAgentRun(params.sessionId, embeddedRunHandle, replyOperation, params.sessionKey, params.reason) : false;
	if (forceCleared && params.sessionKey && persistenceSnapshot) await persistForceClearedEmbeddedRunTerminalState({
		...persistenceSnapshot,
		sessionId: params.sessionId,
		sessionKey: params.sessionKey
	});
	return {
		aborted,
		drained,
		forceCleared
	};
}
function tryLoadForceClearSessionSnapshot(sessionKey) {
	try {
		const cfg = getRuntimeConfig();
		const agentId = resolveAgentIdFromSessionKey(sessionKey);
		const storePath = resolveStorePath(cfg.session?.store, { agentId });
		const entry = loadSqliteSessionEntry({
			sessionKey,
			storePath
		});
		if (!entry || entry.status !== "running") return;
		return {
			...entry.startedAt === void 0 ? {} : { startedAt: entry.startedAt },
			storePath,
			updatedAt: entry.updatedAt
		};
	} catch (err) {
		diagnosticLogger.warn(`load force-clear session snapshot failed: sessionKey=${sessionKey} error=${String(err)}`);
		return;
	}
}
/** Persists terminal state when a forced registry clear cannot emit normal lifecycle. */
async function persistForceClearedEmbeddedRunTerminalState(params) {
	try {
		await updateSessionEntry({
			sessionKey: params.sessionKey,
			storePath: params.storePath
		}, (entry) => {
			if (ACTIVE_EMBEDDED_RUNS.has(params.sessionId) || ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_KEY.has(params.sessionKey) || isReplyRunActiveForSessionId(params.sessionId) || resolveActiveReplyRunSessionId(params.sessionKey) !== void 0 || entry.sessionId !== params.sessionId || entry.status !== "running" || entry.updatedAt !== params.updatedAt || entry.startedAt !== params.startedAt) return null;
			const endedAt = Date.now();
			return {
				status: "killed",
				abortedLastRun: true,
				endedAt,
				updatedAt: endedAt
			};
		}, {
			skipMaintenance: true,
			takeCacheOwnership: true,
			requireWriteSuccess: false
		});
	} catch (err) {
		diagnosticLogger.warn(`persist force-cleared terminal state failed: sessionKey=${params.sessionKey} error=${String(err)}`);
	}
}
function notifyEmbeddedRunEnded(sessionId) {
	clearActiveRunWorkerAssignment(sessionId);
	const waiters = EMBEDDED_RUN_WAITERS.get(sessionId);
	if (!waiters || waiters.size === 0) return;
	EMBEDDED_RUN_WAITERS.delete(sessionId);
	diagnosticLogger.debug(`notifying waiters: sessionId=${sessionId} waiterCount=${waiters.size}`);
	for (const waiter of waiters) {
		if (waiter.timer) clearTimeout(waiter.timer);
		waiter.resolve(true);
	}
}
function setActiveEmbeddedRun(sessionId, handle, sessionKey, sessionFile) {
	if (!isAgentEventLifecycleGenerationCurrent(setActiveEmbeddedRunLifecycleGeneration(handle, getAgentEventLifecycleGeneration()))) {
		try {
			handle.abort("restart");
		} catch (error) {
			diagnosticLogger.warn(`stale run registration abort failed: sessionId=${sessionId} err=${String(error)}`);
			throw error;
		}
		return;
	}
	const previousHandle = ACTIVE_EMBEDDED_RUNS.get(sessionId);
	const wasActive = previousHandle !== void 0;
	if (previousHandle) clearEmbeddedRunAbortability(previousHandle, { retainFinalizing: true });
	clearEmbeddedRunAbandonment({
		sessionId,
		sessionKey,
		sessionFile
	});
	ACTIVE_EMBEDDED_RUNS.set(sessionId, handle);
	if (handle.runId) ACTIVE_EMBEDDED_RUNS_BY_RUN_ID.set(handle.runId, handle);
	clearActiveRunSessionKeys(sessionId);
	setActiveRunSessionKey(sessionKey, sessionId);
	recordActiveRunTopicIsolation(sessionId, sessionKey);
	clearActiveRunSessionFiles(sessionId);
	setActiveRunSessionFile(sessionFile, sessionId);
	logSessionStateChange({
		sessionId,
		sessionKey,
		sessionFile,
		state: "processing",
		reason: wasActive ? "run_replaced" : "run_started"
	});
	markDiagnosticEmbeddedRunStarted({
		sessionId,
		sessionKey,
		runId: handle.runId
	});
	if (!sessionId.startsWith("probe-")) diagnosticLogger.debug(`run registered: sessionId=${sessionId} totalActive=${ACTIVE_EMBEDDED_RUNS.size}`);
}
function updateActiveEmbeddedRunSnapshot(sessionId, snapshot) {
	if (!ACTIVE_EMBEDDED_RUNS.has(sessionId)) return;
	ACTIVE_EMBEDDED_RUN_SNAPSHOTS.set(sessionId, snapshot);
}
function clearActiveEmbeddedRun(sessionId, handle, sessionKey, sessionFile, reason = "run_completed") {
	const activeHandle = ACTIVE_EMBEDDED_RUNS.get(sessionId);
	if (activeHandle === void 0) return;
	if (activeHandle === handle) {
		ACTIVE_EMBEDDED_RUNS.delete(sessionId);
		clearEmbeddedRunAbortability(handle, { retainFinalizing: true });
		ACTIVE_EMBEDDED_RUN_SNAPSHOTS.delete(sessionId);
		clearActiveRunSessionKeys(sessionId, sessionKey);
		clearActiveRunSessionFiles(sessionId, sessionFile);
		logSessionStateChange({
			sessionId,
			sessionKey,
			sessionFile,
			state: "idle",
			reason
		});
		markDiagnosticEmbeddedRunEnded({
			sessionId,
			sessionKey
		});
		if (!sessionId.startsWith("probe-")) diagnosticLogger.debug(`run cleared: sessionId=${sessionId} totalActive=${ACTIVE_EMBEDDED_RUNS.size}`);
		notifyEmbeddedRunEnded(sessionId);
	} else diagnosticLogger.debug(`run clear skipped: sessionId=${sessionId} reason=handle_mismatch`);
}
function forceClearEmbeddedAgentRun(sessionId, expectedHandle, expectedReplyOperation, sessionKey, reason = "stuck_recovery") {
	let cleared = false;
	const handle = ACTIVE_EMBEDDED_RUNS.get(sessionId);
	if (handle && handle === expectedHandle) {
		ACTIVE_EMBEDDED_RUNS.delete(sessionId);
		clearEmbeddedRunAbortability(handle);
		ACTIVE_EMBEDDED_RUN_SNAPSHOTS.delete(sessionId);
		clearActiveRunSessionKeys(sessionId, sessionKey);
		clearActiveRunSessionFiles(sessionId);
		logSessionStateChange({
			sessionId,
			sessionKey,
			state: "idle",
			reason
		});
		markDiagnosticEmbeddedRunEnded({
			sessionId,
			sessionKey
		});
		notifyEmbeddedRunEnded(sessionId);
		cleared = true;
	}
	const cause = /* @__PURE__ */ new Error(`Embedded run force-cleared by ${reason}`);
	return (expectedReplyOperation ? forceClearReplyOperation(expectedReplyOperation, cause) : false) || cleared;
}
const testing = { resetActiveEmbeddedRuns() {
	for (const waiters of EMBEDDED_RUN_WAITERS.values()) for (const waiter of waiters) {
		if (waiter.timer) clearTimeout(waiter.timer);
		waiter.resolve(true);
	}
	EMBEDDED_RUN_WAITERS.clear();
	ACTIVE_EMBEDDED_RUNS.clear();
	ACTIVE_EMBEDDED_RUNS_BY_RUN_ID.clear();
	RETAINED_EMBEDDED_RUN_ABORTABILITY_RUN_IDS.clear();
	ACTIVE_EMBEDDED_RUN_SNAPSHOTS.clear();
	ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_KEY.clear();
	ACTIVE_EMBEDDED_RUN_SESSION_IDS_BY_FILE.clear();
	ABANDONED_EMBEDDED_RUNS_BY_SESSION_ID.clear();
	ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_KEY.clear();
	ABANDONED_EMBEDDED_RUN_SESSION_IDS_BY_FILE.clear();
} };
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.embeddedRunsTestApi")] = testing;
//#endregion
export { retainEmbeddedAgentRunAbortabilityForRunId as C, waitForEmbeddedAgentRunEnd as D, waitForActiveEmbeddedRuns as E, resolveEmbeddedAgentReplyRunPhase as S, updateActiveEmbeddedRunSnapshot as T, queueEmbeddedAgentMessageWithOutcomeAsync as _, formatEmbeddedAgentQueueFailureSummary as a, resolveActiveEmbeddedRunHandleSessionIdBySessionFile as b, isEmbeddedAgentRunAbortableForCompaction as c, isEmbeddedAgentRunHandleActive as d, isEmbeddedAgentRunInProgress as f, queueEmbeddedAgentMessageWithOutcome as g, markActiveEmbeddedRunAbandoned as h, clearEmbeddedAgentRunAbortabilityForRunId as i, isEmbeddedAgentRunAbortableForRunId as l, isEmbeddedRunAbandoned as m, abortEmbeddedAgentRun as n, getActiveEmbeddedRunSnapshot as o, isEmbeddedAgentRunStreaming as p, clearActiveEmbeddedRun as r, getActiveRunWorkerAssignment as s, abortAndDrainEmbeddedAgentRun as t, isEmbeddedAgentRunActive as u, recordActiveRunTopicIsolation as v, setActiveEmbeddedRun as w, resolveActiveEmbeddedRunSessionIdBySessionFile as x, resolveActiveEmbeddedRunHandleSessionId as y };
