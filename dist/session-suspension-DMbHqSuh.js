import { C as resolveExpiresAtMsFromDurationMs, j as resolveTimerTimeoutMs } from "./number-coercion-Crk_c9KW.js";
import "./number-coercion-IpMOa8nH.js";
import { i as resolveGlobalSingleton } from "./global-singleton-Dc_stLtU.js";
import { X as resolveAgentMaxConcurrent, Z as resolveSubagentMaxConcurrent } from "./io-DCw4R0kD.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { lt as patchSqliteSessionEntry } from "./session-accessor.sqlite-B9iW7DOt.js";
import "./session-accessor-t3qUoTeV.js";
import { g as setCommandLaneConcurrency } from "./command-queue-BbrEP4i9.js";
import { t as resolveCronMaxConcurrentRuns } from "./cron-limits-txevLFpr.js";
import { a as resolveStoredSessionKeyForSessionId } from "./session-BfLchzC-.js";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
//#region src/agents/session-suspension.ts
/**
* Session suspension and lane auto-resume helpers.
*
* Records quota/manual/circuit suspensions and temporarily lowers command-lane concurrency.
*/
const log = createSubsystemLogger("session-suspension");
const DEFAULT_CUSTOM_LANE_RESUME_CONCURRENCY = 1;
const DEFAULT_QUOTA_SUSPENSION_RESUME_MS = 1800 * 1e3;
/**
* Keep timer shutdown state process-global so bundled gateway chunks cannot
* leave one module copy scheduling lane resumes after another copy cleaned up.
*/
const SESSION_SUSPENSION_STATE_KEY = Symbol.for("openclaw.sessionSuspensionRuntimeState");
function getSessionSuspensionState() {
	const state = resolveGlobalSingleton(SESSION_SUSPENSION_STATE_KEY, () => ({
		laneResumeTimers: /* @__PURE__ */ new Map(),
		clearedLaneResumes: /* @__PURE__ */ new Map(),
		gatewayLaneResumeConcurrencies: /* @__PURE__ */ new Map(),
		pendingSuspensionWrites: /* @__PURE__ */ new Map(),
		suspensionWriteChain: Promise.resolve(),
		cleanupGeneration: 0,
		cleanupActive: false
	}));
	if (!state.clearedLaneResumes) state.clearedLaneResumes = /* @__PURE__ */ new Map();
	if (!state.gatewayLaneResumeConcurrencies) state.gatewayLaneResumeConcurrencies = /* @__PURE__ */ new Map();
	if (!state.pendingSuspensionWrites) state.pendingSuspensionWrites = /* @__PURE__ */ new Map();
	if (state.suspensionWriteChain === void 0) state.suspensionWriteChain = Promise.resolve();
	return state;
}
const deferredSessionSuspension = new AsyncLocalStorage();
function resolveLaneResumeConcurrency(cfg, laneId) {
	switch (laneId) {
		case "main": return resolveAgentMaxConcurrent(cfg);
		case "subagent": return resolveSubagentMaxConcurrent(cfg);
		case "cron":
		case "cron-nested":
		case "hook-dispatch": return resolveCronMaxConcurrentRuns();
		default: return DEFAULT_CUSTOM_LANE_RESUME_CONCURRENCY;
	}
}
function isGatewayManagedLane(laneId) {
	const lane = laneId;
	return lane === "main" || lane === "subagent" || lane === "cron" || lane === "cron-nested" || lane === "hook-dispatch" || lane === "nested";
}
function resolveSessionSuspensionReason(reason) {
	if (reason === "billing") return "manual";
	if (reason === "rate_limit") return "quota_exhausted";
	return "circuit_open";
}
function runWithDeferredSessionSuspension(run, onDeferred) {
	return deferredSessionSuspension.run({
		claimed: false,
		onDeferred
	}, run);
}
function resolveSessionSuspensionTarget() {
	const scope = deferredSessionSuspension.getStore();
	if (!scope || scope.claimed) return { mode: "suspend" };
	scope.claimed = true;
	return {
		mode: "defer",
		defer: (params) => scope.onDeferred?.(params)
	};
}
function scheduleLaneAutoResume(laneId, delayMs, resumeConcurrency, opts = {}) {
	const nowMs = opts.nowMs ?? Date.now();
	const state = getSessionSuspensionState();
	const existing = state.laneResumeTimers.get(laneId);
	if (existing) clearTimeout(existing.timer);
	const entry = {
		timer: void 0,
		resumeConcurrency: isGatewayManagedLane(laneId) ? state.gatewayLaneResumeConcurrencies.get(laneId) ?? resumeConcurrency : resumeConcurrency,
		resumeAtMs: nowMs + delayMs
	};
	const timer = setTimeout(() => {
		if (state.laneResumeTimers.get(laneId) !== entry) return;
		state.laneResumeTimers.delete(laneId);
		setCommandLaneConcurrency(laneId, entry.resumeConcurrency);
		log.info("auto-resumed lane after suspension TTL", {
			laneId,
			delayMs,
			resumeConcurrency: entry.resumeConcurrency
		});
	}, delayMs);
	entry.timer = timer;
	if (typeof timer.unref === "function") timer.unref();
	state.laneResumeTimers.set(laneId, entry);
}
function clearSessionSuspensionTimers() {
	const state = getSessionSuspensionState();
	state.cleanupGeneration += 1;
	state.cleanupActive = true;
	let cleared = 0;
	for (const [laneId, entry] of state.laneResumeTimers) {
		clearTimeout(entry.timer);
		state.clearedLaneResumes.set(laneId, {
			resumeConcurrency: entry.resumeConcurrency,
			resumeAtMs: entry.resumeAtMs
		});
		cleared += 1;
	}
	state.laneResumeTimers.clear();
	return cleared;
}
function enableSessionSuspensionTimersForGatewayStart() {
	const state = getSessionSuspensionState();
	state.cleanupGeneration += 1;
	state.cleanupActive = false;
	const suspendedLaneIds = /* @__PURE__ */ new Set();
	const nowMs = Date.now();
	for (const [laneId, cleared] of state.clearedLaneResumes) {
		const remainingMs = resolveTimerTimeoutMs(cleared.resumeAtMs - nowMs, 0, 0);
		if (remainingMs > 0) {
			setCommandLaneConcurrency(laneId, 0);
			scheduleLaneAutoResume(laneId, remainingMs, cleared.resumeConcurrency, { nowMs });
			suspendedLaneIds.add(laneId);
			continue;
		}
		if (isGatewayManagedLane(laneId)) continue;
		setCommandLaneConcurrency(laneId, cleared.resumeConcurrency);
	}
	state.clearedLaneResumes.clear();
	return suspendedLaneIds;
}
function setGatewayLaneResumeConcurrencies(concurrencies) {
	const state = getSessionSuspensionState();
	for (const [laneId, rawConcurrency] of Object.entries(concurrencies)) {
		if (!isGatewayManagedLane(laneId)) continue;
		const resumeConcurrency = Math.max(0, Math.floor(rawConcurrency));
		state.gatewayLaneResumeConcurrencies.set(laneId, resumeConcurrency);
		const activeTimer = state.laneResumeTimers.get(laneId);
		if (activeTimer) activeTimer.resumeConcurrency = resumeConcurrency;
		const clearedResume = state.clearedLaneResumes.get(laneId);
		if (clearedResume) clearedResume.resumeConcurrency = resumeConcurrency;
	}
}
function getSuspendedLaneIdsForGatewayPublication() {
	const state = getSessionSuspensionState();
	const suspended = state.cleanupActive ? state.clearedLaneResumes : state.laneResumeTimers;
	return new Set(suspended.keys());
}
async function suspendSession(params) {
	const state = getSessionSuspensionState();
	const queuedGeneration = state.cleanupGeneration;
	const run = state.suspensionWriteChain.catch(() => void 0).then(() => suspendSessionQueued(params, queuedGeneration));
	state.suspensionWriteChain = run.then(() => void 0, () => void 0);
	await run;
}
async function suspendSessionQueued(params, queuedGeneration) {
	if (!params.cfg) return;
	const { sessionKey, storePath } = resolveStoredSessionKeyForSessionId({
		cfg: params.cfg,
		sessionId: params.sessionId,
		agentId: params.agentDir ? path.basename(params.agentDir) : void 0
	});
	if (!sessionKey) return;
	const ttlMs = resolveTimerTimeoutMs(params.ttlMs, DEFAULT_QUOTA_SUSPENSION_RESUME_MS, 0);
	const now = Date.now();
	const expectedResumeBy = resolveExpiresAtMsFromDurationMs(ttlMs, { nowMs: now }) ?? now;
	const state = getSessionSuspensionState();
	if (state.cleanupActive || state.cleanupGeneration !== queuedGeneration) return;
	const suspensionGeneration = state.cleanupGeneration;
	const pendingWriteKey = `${storePath}\0${sessionKey}`;
	const existingPendingWrite = state.pendingSuspensionWrites.get(pendingWriteKey);
	const pendingWrite = existingPendingWrite?.generation === suspensionGeneration ? existingPendingWrite : {
		generation: suspensionGeneration,
		previousQuotaSuspension: void 0,
		previousSnapshotCaptured: false,
		activeCount: 0
	};
	pendingWrite.activeCount += 1;
	state.pendingSuspensionWrites.set(pendingWriteKey, pendingWrite);
	const releasePendingWrite = () => {
		pendingWrite.activeCount -= 1;
		if (pendingWrite.activeCount <= 0 && getSessionSuspensionState().pendingSuspensionWrites.get(pendingWriteKey) === pendingWrite) getSessionSuspensionState().pendingSuspensionWrites.delete(pendingWriteKey);
	};
	const throttleLane = () => {
		if (!params.laneId) return;
		setCommandLaneConcurrency(params.laneId, 0);
		scheduleLaneAutoResume(params.laneId, ttlMs, resolveLaneResumeConcurrency(params.cfg, params.laneId));
	};
	let persistedSuspension;
	try {
		persistedSuspension = await patchSqliteSessionEntry({
			storePath,
			sessionKey
		}, (entry) => {
			if (getSessionSuspensionState().cleanupGeneration !== suspensionGeneration) return null;
			if (!pendingWrite.previousSnapshotCaptured) {
				pendingWrite.previousQuotaSuspension = entry.quotaSuspension;
				pendingWrite.previousSnapshotCaptured = true;
			}
			return { quotaSuspension: {
				schemaVersion: 1,
				suspendedAt: now,
				reason: params.reason,
				failedProvider: params.failedProvider,
				failedModel: params.failedModel,
				summary: params.summary,
				laneId: params.laneId,
				expectedResumeBy,
				state: "suspended"
			} };
		}, {
			skipMaintenance: true,
			takeCacheOwnership: true
		}) !== null;
	} catch (err) {
		log.warn("failed to persist quota suspension; applying transient lane throttle", {
			sessionId: params.sessionId,
			laneId: params.laneId,
			error: err instanceof Error ? err.message : String(err)
		});
		releasePendingWrite();
		if (!getSessionSuspensionState().cleanupActive && suspensionGeneration === getSessionSuspensionState().cleanupGeneration) throttleLane();
		return;
	}
	const postPatchState = getSessionSuspensionState();
	if (persistedSuspension && (postPatchState.cleanupActive || suspensionGeneration !== postPatchState.cleanupGeneration)) {
		try {
			await patchSqliteSessionEntry({
				storePath,
				sessionKey
			}, (entry) => entry.quotaSuspension?.suspendedAt === now && entry.quotaSuspension.reason === params.reason && entry.quotaSuspension.failedProvider === params.failedProvider && entry.quotaSuspension.failedModel === params.failedModel && entry.quotaSuspension.laneId === params.laneId ? { quotaSuspension: pendingWrite.previousQuotaSuspension } : null, {
				skipMaintenance: true,
				takeCacheOwnership: true
			});
		} catch (err) {
			log.warn("failed to clear quota suspension after shutdown cleanup", {
				sessionId: params.sessionId,
				laneId: params.laneId,
				error: err instanceof Error ? err.message : String(err)
			});
		}
		releasePendingWrite();
		return;
	}
	if (persistedSuspension) throttleLane();
	releasePendingWrite();
}
function resetSessionSuspensionStateForTest() {
	const state = getSessionSuspensionState();
	state.cleanupGeneration += 1;
	for (const entry of state.laneResumeTimers.values()) clearTimeout(entry.timer);
	state.laneResumeTimers.clear();
	state.clearedLaneResumes.clear();
	state.gatewayLaneResumeConcurrencies.clear();
	state.pendingSuspensionWrites.clear();
	state.suspensionWriteChain = Promise.resolve();
	state.cleanupActive = false;
}
function seedClearedLaneResumeForTest(laneId, cleared) {
	const state = getSessionSuspensionState();
	state.cleanupActive = true;
	state.clearedLaneResumes.set(laneId, cleared);
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.sessionSuspensionTestApi")] = {
	resetSessionSuspensionStateForTest,
	seedClearedLaneResumeForTest
};
//#endregion
export { resolveSessionSuspensionTarget as a, suspendSession as c, resolveSessionSuspensionReason as i, enableSessionSuspensionTimersForGatewayStart as n, runWithDeferredSessionSuspension as o, getSuspendedLaneIdsForGatewayPublication as r, setGatewayLaneResumeConcurrencies as s, clearSessionSuspensionTimers as t };
