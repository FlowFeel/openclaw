import { c as normalizeOptionalString, u as normalizeOptionalThreadValue } from "./string-coerce-DW4mBlAt.js";
import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { t as expectDefined } from "./expect-CyE8FADM.js";
import "./src-COWbwBfI.js";
import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { A as compileSafeRegexDetailed } from "./redact-DUpJZuMu.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { r as normalizeOptionalAccountId } from "./account-id-CIVg1QNG.js";
import { d as normalizeOptionalAgentId } from "./session-key-DtTE9-Tg.js";
import { t as shouldDefaultCronDeliveryToAnnounce } from "./delivery-defaults-vgPfq_jw.js";
import { t as parseAbsoluteTimeMs } from "./parse-mvoz8PbH.js";
import { i as coerceFiniteScheduleNumber, n as normalizePayloadToSystemText, r as normalizeRequiredName } from "./normalize-BHdv6zWT.js";
import { i as resolveCronScheduledToolPolicy, n as createTrustedCronScheduledToolPolicy } from "./scheduled-tool-policy-wGs9bS6c.js";
import { t as assertSafeCronSessionTargetId } from "./session-target-DJsUULzX.js";
import { n as resolveCronStaggerMs, r as resolveDefaultCronStaggerMs, t as normalizeCronStaggerMs } from "./stagger-D-EV0PpM.js";
import { c as resolveCronStreamBatching, i as createCronStreamSourceIdentity, t as parseCronPacingBounds } from "./pacing-BxtLSQjv.js";
import { s as isCronJobActive } from "./active-jobs-BGi1uzPV.js";
import { t as normalizeHttpWebhookUrl } from "./webhook-url-DqjLJiFy.js";
import { n as resolveCronTriggerMinIntervalMs } from "./cron-limits-txevLFpr.js";
import { n as parseCodeModeScriptSyntax } from "./code-mode-script-syntax-DZwdESO8.js";
import { n as resolveCronDeliveryPlan } from "./delivery-plan-DDDxfQ61.js";
import { n as cronJobUsesToolRuntime, t as applyDefaultCronToolsAllow } from "./tools-allow-BSqnFkMT.js";
import { n as computePreviousRunAtMs, t as computeNextRunAtMs } from "./schedule-DgfSgRvu.js";
import crypto from "node:crypto";
function clampPositiveInteger(value, fallback, maximum) {
	if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return fallback;
	return Math.min(maximum, Math.max(1, Math.floor(value)));
}
/** Applies the persisted defaults and hard caps for unattended script payloads. */
function normalizeCronScriptPayload(payload) {
	return {
		...payload,
		script: payload.script.trim(),
		timeoutSeconds: clampPositiveInteger(payload.timeoutSeconds, 300, 900),
		toolBudget: clampPositiveInteger(payload.toolBudget, 50, 200)
	};
}
//#endregion
//#region src/cron/service/initial-delivery.ts
/** Resolves create-time default delivery for new cron jobs. */
/**
* Resolves default cron delivery for new jobs when callers omit explicit delivery config.
* This is the direct-service contract: supported creation paths (gateway `cron.add`,
* agent cron tool) already fill delivery in `normalizeCronJobCreate`, so this default
* only governs callers that reach `CronService.add`/declarative convergence directly.
* The shared predicate keeps this contract consistent across write-time,
* read-time, and service-bypass paths.
*/
function resolveInitialCronDelivery(input) {
	if (input.delivery) return input.delivery;
	if (shouldDefaultCronDeliveryToAnnounce({
		payloadKind: input.payload.kind,
		sessionTarget: input.sessionTarget
	})) return { mode: "announce" };
}
//#endregion
//#region src/cron/service/auto-disable.ts
/** Shared state and owner-notification policy for cron auto-disable transitions. */
/**
* Run failures get more room than schedule errors (10 vs. 3) because provider
* and network errors are often transient, and restart-interrupted runs count too.
*/
const MAX_CONSECUTIVE_RUN_FAILURES = 10;
function autoDisableReasonLabel(reason) {
	return reason === "consecutive-failures" ? "run failures" : "schedule errors";
}
/** Records one canonical auto-disable fact and queues its owning-agent notification. */
function autoDisableCronJob(params) {
	const { state, job } = params;
	if (!job.enabled || job.state.autoDisabled) return false;
	job.enabled = false;
	job.state.nextRunAtMs = void 0;
	job.state.autoDisabled = {
		reason: params.reason,
		atMs: params.atMs,
		consecutiveErrors: params.consecutiveErrors
	};
	const name = truncateUtf16Safe((job.name || job.id).replace(/\s+/g, " ").trim(), 120);
	const error = truncateUtf16Safe(String(params.error).trim() || "unknown reason", 200);
	const text = [
		`⚠️ Automation "${name}" (${job.id}) was auto-disabled after ${params.consecutiveErrors} consecutive ${autoDisableReasonLabel(params.reason)}.`,
		`Last error: ${error}`,
		`Fix the underlying cause, then run \`openclaw automations enable ${job.id}\` to re-enable it.`
	].join("\n");
	const notify = () => {
		const agentId = normalizeOptionalAgentId(job.agentId) ?? normalizeOptionalAgentId(parseAgentSessionKey(job.sessionKey)?.agentId) ?? normalizeOptionalAgentId(state.deps.resolveDefaultAgentId?.()) ?? normalizeOptionalAgentId(state.deps.defaultAgentId);
		const deliveryContext = agentId || job.sessionKey ? state.deps.resolveOriginDeliveryContext?.({
			agentId,
			sessionKey: job.sessionKey
		}) : void 0;
		state.deps.enqueueSystemEvent(text, {
			agentId,
			sessionKey: job.sessionKey,
			contextKey: `cron:${job.id}:auto-disabled`,
			...deliveryContext ? { deliveryContext } : {}
		});
		state.deps.requestHeartbeat({
			source: "cron",
			intent: "event",
			reason: `cron:${job.id}:auto-disabled`,
			agentId,
			sessionKey: job.sessionKey
		});
	};
	if (params.deferredNotifications) params.deferredNotifications.push(notify);
	else notify();
	return true;
}
/** Auto-disables only time-based recurring jobs once their run-error streak reaches the limit. */
function maybeAutoDisableCronJobAfterRunFailure(params) {
	const consecutiveErrors = params.job.state.consecutiveErrors ?? 0;
	if (params.job.schedule.kind !== "cron" && params.job.schedule.kind !== "every" || consecutiveErrors < MAX_CONSECUTIVE_RUN_FAILURES) return false;
	return autoDisableCronJob({
		...params,
		reason: "consecutive-failures",
		consecutiveErrors
	});
}
//#endregion
//#region src/cron/service/jobs-scheduling.ts
/** Scheduling state and next-run computation for cron jobs. */
const STUCK_RUN_MS = 7200 * 1e3;
const STAGGER_OFFSET_CACHE_MAX = 4096;
const staggerOffsetCache = /* @__PURE__ */ new Map();
function ownsCronRunMarker(state, jobId, markerAtMs, requireForce = false) {
	const reservation = state.queuedRunReservationsByJobId.get(jobId);
	return reservation?.markerAtMs === markerAtMs && (!requireForce || reservation.preserveWhenDisabled);
}
function normalizeStreamScheduleBounds(schedule) {
	if (schedule.kind !== "stream") return schedule;
	const resolved = resolveCronStreamBatching(schedule);
	return {
		...schedule,
		...schedule.batchMs !== void 0 ? { batchMs: resolved.batchMs } : {},
		...schedule.maxBatchBytes !== void 0 ? { maxBatchBytes: resolved.maxBatchBytes } : {}
	};
}
/** Default retry delays applied after consecutive cron execution errors. */
const DEFAULT_ERROR_BACKOFF_SCHEDULE_MS = [
	3e4,
	6e4,
	5 * 6e4,
	15 * 6e4,
	60 * 6e4
];
function isFiniteTimestamp(value) {
	return typeof value === "number" && Number.isFinite(value);
}
/** Returns whether a stored next-run timestamp is finite and schedulable. */
function hasScheduledNextRunAtMs(value) {
	return isFiniteTimestamp(value) && value > 0;
}
/** Resolves the newest persisted cron run status while older state is still readable. */
function resolveJobLastRunStatus(job) {
	return job.state.lastRunStatus ?? job.state.lastStatus;
}
/** Resolves the retry backoff delay for a one-based consecutive error count. */
function errorBackoffMs(consecutiveErrors, scheduleMs = DEFAULT_ERROR_BACKOFF_SCHEDULE_MS) {
	const idx = Math.min(consecutiveErrors - 1, scheduleMs.length - 1);
	return expectDefined(scheduleMs[Math.max(0, idx)], "schedule ms entry at math.max(0, idx)") ?? DEFAULT_ERROR_BACKOFF_SCHEDULE_MS[0];
}
/** Returns the earliest retry timestamp after a failed cron run and its runtime duration. */
function resolveJobErrorBackoffUntilMs(job, scheduleMs = DEFAULT_ERROR_BACKOFF_SCHEDULE_MS) {
	if (resolveJobLastRunStatus(job) !== "error" || !isFiniteTimestamp(job.state.lastRunAtMs)) return;
	const consecutiveErrorsRaw = job.state.consecutiveErrors;
	const consecutiveErrors = typeof consecutiveErrorsRaw === "number" && Number.isFinite(consecutiveErrorsRaw) ? Math.max(1, Math.floor(consecutiveErrorsRaw)) : 1;
	const lastDurationMs = typeof job.state.lastDurationMs === "number" && Number.isFinite(job.state.lastDurationMs) ? Math.max(0, Math.floor(job.state.lastDurationMs)) : 0;
	return job.state.lastRunAtMs + lastDurationMs + errorBackoffMs(consecutiveErrors, scheduleMs);
}
function resolveStableCronOffsetMs(jobId, staggerMs) {
	if (staggerMs <= 1) return 0;
	const cacheKey = `${staggerMs}:${jobId}`;
	const cached = staggerOffsetCache.get(cacheKey);
	if (cached !== void 0) return cached;
	const offset = crypto.createHash("sha256").update(jobId).digest().readUInt32BE(0) % staggerMs;
	pruneMapToMaxSize(staggerOffsetCache, STAGGER_OFFSET_CACHE_MAX - 1);
	staggerOffsetCache.set(cacheKey, offset);
	return offset;
}
function computeStaggeredCronNextRunAtMs(job, nowMs) {
	if (job.schedule.kind !== "cron") return computeNextRunAtMs(job.schedule, nowMs);
	const staggerMs = resolveCronStaggerMs(job.schedule);
	const offsetMs = resolveStableCronOffsetMs(job.id, staggerMs);
	if (offsetMs <= 0) return computeNextRunAtMs(job.schedule, nowMs);
	let cursorMs = Math.max(0, nowMs - offsetMs);
	for (let attempt = 0; attempt < 4; attempt += 1) {
		const baseNext = computeNextRunAtMs(job.schedule, cursorMs);
		if (baseNext === void 0) return;
		const shifted = baseNext + offsetMs;
		if (shifted > nowMs) return shifted;
		cursorMs = Math.max(cursorMs + 1, baseNext + 1e3);
	}
}
function computeStaggeredCronPreviousRunAtMs(job, nowMs) {
	if (job.schedule.kind !== "cron") return;
	const staggerMs = resolveCronStaggerMs(job.schedule);
	const offsetMs = resolveStableCronOffsetMs(job.id, staggerMs);
	if (offsetMs <= 0) return computePreviousRunAtMs(job.schedule, nowMs);
	let cursorMs = Math.max(0, nowMs - offsetMs);
	for (let attempt = 0; attempt < 4; attempt += 1) {
		const basePrevious = computePreviousRunAtMs(job.schedule, cursorMs);
		if (basePrevious === void 0) return;
		const shifted = basePrevious + offsetMs;
		if (shifted <= nowMs) return shifted;
		cursorMs = Math.max(0, basePrevious - 1e3);
	}
}
function computeStaggeredCronPreviousRunAtOrBeforeMs(job, nowMs) {
	const previous = computeStaggeredCronPreviousRunAtMs(job, nowMs);
	const probeMs = nowMs + 1e3;
	if (!Number.isFinite(probeMs)) return previous;
	const boundary = computeStaggeredCronPreviousRunAtMs(job, probeMs);
	if (isFiniteTimestamp(boundary) && boundary <= nowMs && (!isFiniteTimestamp(previous) || boundary > previous)) return boundary;
	return previous;
}
function isStaggeredCronRunAtMs(job, runAtMs) {
	if (job.schedule.kind !== "cron" || !isFiniteTimestamp(runAtMs)) return false;
	return computeStaggeredCronPreviousRunAtOrBeforeMs(job, runAtMs) === runAtMs;
}
function isPendingErrorBackoffSlot(params) {
	const { job, nextRunAtMs, nowMs } = params;
	const backoffUntilMs = resolveJobErrorBackoffUntilMs(job, DEFAULT_ERROR_BACKOFF_SCHEDULE_MS);
	return backoffUntilMs !== void 0 && nowMs < backoffUntilMs && nextRunAtMs <= backoffUntilMs;
}
function shouldRepairFutureCronNextRunAtMs(params) {
	const { state, job, nowMs } = params;
	const nextRun = job.state.nextRunAtMs;
	if (job.schedule.kind !== "cron" || !hasScheduledNextRunAtMs(nextRun) || nowMs >= nextRun || typeof job.state.queuedAtMs === "number" || typeof job.state.runningAtMs === "number") return false;
	if (isPendingErrorBackoffSlot({
		state,
		job,
		nextRunAtMs: nextRun,
		nowMs
	})) return false;
	let naturalNext;
	try {
		naturalNext = computeStaggeredCronNextRunAtMs(job, nowMs);
	} catch {
		return false;
	}
	if (!isFiniteTimestamp(naturalNext)) return false;
	let isScheduledSlot;
	try {
		isScheduledSlot = isStaggeredCronRunAtMs(job, nextRun);
	} catch {
		return false;
	}
	if (isScheduledSlot) return false;
	if (nextRun < naturalNext) return job.payload.kind !== "agentTurn";
	if (nextRun === naturalNext) return false;
	let followingNaturalNext;
	try {
		followingNaturalNext = computeStaggeredCronNextRunAtMs(job, naturalNext);
	} catch {
		return false;
	}
	if (!isFiniteTimestamp(followingNaturalNext)) return false;
	const naturalIntervalMs = followingNaturalNext - naturalNext;
	return naturalIntervalMs > 0 && nextRun >= followingNaturalNext + naturalIntervalMs;
}
function resolveEveryAnchorMs(params) {
	const coerced = coerceFiniteScheduleNumber(params.schedule.anchorMs);
	if (coerced !== void 0) return Math.max(0, Math.floor(coerced));
	if (isFiniteTimestamp(params.fallbackAnchorMs)) return Math.max(0, Math.floor(params.fallbackAnchorMs));
	return 0;
}
/** Finds an in-memory cron job or throws the public unknown-id error. */
function findJobOrThrow(state, id) {
	const job = state.store?.jobs.find((j) => j.id === id);
	if (!job) throw new Error(`unknown cron job id: ${id}`);
	return job;
}
/** Returns the effective enabled flag, defaulting missing values to enabled. */
function isJobEnabled(job) {
	return job.enabled ?? true;
}
/** Computes the next run timestamp for enabled jobs across every/at/cron schedules. */
function computeJobNextRunAtMs(job, nowMs) {
	if (!isJobEnabled(job)) return;
	if (job.schedule.kind === "every") {
		const everyMsRaw = coerceFiniteScheduleNumber(job.schedule.everyMs);
		if (everyMsRaw === void 0) return;
		const everyMs = Math.max(1, Math.floor(everyMsRaw));
		const lastRunAtMs = job.state.lastRunAtMs;
		if (typeof lastRunAtMs === "number" && Number.isFinite(lastRunAtMs)) {
			const nextFromLastRun = Math.floor(lastRunAtMs) + everyMs;
			if (nextFromLastRun > nowMs) return nextFromLastRun;
		}
		const fallbackAnchorMs = isFiniteTimestamp(job.createdAtMs) ? job.createdAtMs : nowMs;
		const anchorMs = resolveEveryAnchorMs({
			schedule: job.schedule,
			fallbackAnchorMs
		});
		const next = computeNextRunAtMs({
			...job.schedule,
			everyMs,
			anchorMs
		}, nowMs);
		return isFiniteTimestamp(next) ? next : void 0;
	}
	if (job.schedule.kind === "at") {
		const atMs = parseAbsoluteTimeMs(job.schedule.at);
		if (resolveJobLastRunStatus(job) === "ok" && job.state.lastRunAtMs) {
			if (atMs !== null && Number.isFinite(atMs) && atMs > job.state.lastRunAtMs) return atMs;
			return;
		}
		return atMs !== null && Number.isFinite(atMs) ? atMs : void 0;
	}
	const next = computeStaggeredCronNextRunAtMs(job, nowMs);
	if (next === void 0 && job.schedule.kind === "cron") return computeStaggeredCronNextRunAtMs(job, Math.floor(nowMs / 1e3) * 1e3 + 1e3);
	return isFiniteTimestamp(next) ? next : void 0;
}
/** Computes the latest effective cron timestamp at or before the supplied time. */
function computeJobPreviousRunAtOrBeforeMs(job, nowMs) {
	if (!isJobEnabled(job) || job.schedule.kind !== "cron") return;
	const previous = computeStaggeredCronPreviousRunAtOrBeforeMs(job, nowMs);
	return isFiniteTimestamp(previous) ? previous : void 0;
}
/** Maximum consecutive schedule errors before auto-disabling a job. */
const MAX_SCHEDULE_ERRORS = 3;
/** Records a schedule-computation failure and auto-disables after repeated errors. */
function recordScheduleComputeError(params) {
	const { state, job, err } = params;
	const errorCount = (job.state.scheduleErrorCount ?? 0) + 1;
	const errText = String(err);
	job.state.scheduleErrorCount = errorCount;
	job.state.nextRunAtMs = void 0;
	job.state.lastError = `schedule error: ${errText}`;
	if (errorCount >= MAX_SCHEDULE_ERRORS) {
		autoDisableCronJob({
			state,
			job,
			reason: "schedule-errors",
			atMs: state.deps.nowMs(),
			consecutiveErrors: errorCount,
			error: errText,
			deferredNotifications: params.deferredNotifications
		});
		state.deps.log.error({
			jobId: job.id,
			name: job.name,
			errorCount,
			err: errText
		}, "cron: auto-disabled job after repeated schedule errors");
	} else state.deps.log.warn({
		jobId: job.id,
		name: job.name,
		errorCount,
		err: errText
	}, "cron: failed to compute next run for job (skipping)");
	return true;
}
function normalizeJobTickState(params) {
	const { state, job, nowMs } = params;
	let changed = false;
	if (!job.state) {
		job.state = {};
		changed = true;
	}
	if (job.schedule.kind === "stream" && !job.state.streamSourceIdentity?.trim()) {
		job.state.streamSourceIdentity = createCronStreamSourceIdentity();
		changed = true;
	}
	if (job.schedule.kind === "every") {
		const normalizedAnchorMs = resolveEveryAnchorMs({
			schedule: job.schedule,
			fallbackAnchorMs: isFiniteTimestamp(job.createdAtMs) ? job.createdAtMs : nowMs
		});
		if (job.schedule.anchorMs !== normalizedAnchorMs) {
			job.schedule = {
				...job.schedule,
				anchorMs: normalizedAnchorMs
			};
			job.state.pacedNextRunAtMs = void 0;
			job.state.forcePreservedNextRunAtMs = void 0;
			changed = true;
		}
	}
	if (!isJobEnabled(job)) {
		for (const key of [
			"startupCatchupAtMs",
			"pacedNextRunAtMs",
			"forcePreservedNextRunAtMs",
			"nextRunAtMs"
		]) if (job.state[key] !== void 0) {
			job.state[key] = void 0;
			changed = true;
		}
		if (job.state.queuedAtMs !== void 0 && !ownsCronRunMarker(state, job.id, job.state.queuedAtMs, true)) {
			job.state.queuedAtMs = void 0;
			changed = true;
		}
		if (job.state.runningAtMs !== void 0 && !ownsCronRunMarker(state, job.id, job.state.runningAtMs, true) && !isCronJobActive(job.id)) {
			job.state.runningAtMs = void 0;
			changed = true;
		}
		return {
			changed,
			skip: true
		};
	}
	if (!hasScheduledNextRunAtMs(job.state.nextRunAtMs) && job.state.nextRunAtMs !== void 0) {
		job.state.nextRunAtMs = void 0;
		changed = true;
	}
	const forcePreservedNextRunAtMs = job.state.forcePreservedNextRunAtMs;
	if (forcePreservedNextRunAtMs !== void 0 && (!isFiniteTimestamp(forcePreservedNextRunAtMs) || forcePreservedNextRunAtMs !== job.state.nextRunAtMs)) {
		job.state.forcePreservedNextRunAtMs = void 0;
		changed = true;
	}
	const queuedAt = job.state.queuedAtMs;
	if (typeof queuedAt === "number" && Math.abs(nowMs - queuedAt) > STUCK_RUN_MS && !ownsCronRunMarker(state, job.id, queuedAt)) {
		state.deps.log.warn({
			jobId: job.id,
			queuedAtMs: queuedAt
		}, "cron: clearing stuck queued marker");
		job.state.queuedAtMs = void 0;
		changed = true;
	}
	const runningAt = job.state.runningAtMs;
	if (typeof runningAt === "number" && Math.abs(nowMs - runningAt) > STUCK_RUN_MS && !ownsCronRunMarker(state, job.id, runningAt)) {
		state.deps.log.warn({
			jobId: job.id,
			runningAtMs: runningAt
		}, "cron: clearing stuck running marker");
		job.state.runningAtMs = void 0;
		changed = true;
		const nextRun = job.state.nextRunAtMs;
		const lastRun = job.state.lastRunAtMs;
		const alreadyExecutedSlot = hasScheduledNextRunAtMs(nextRun) && isFiniteTimestamp(lastRun) && lastRun >= nextRun;
		return {
			changed,
			skip: !alreadyExecutedSlot
		};
	}
	return {
		changed,
		skip: false
	};
}
function walkSchedulableJobs(state, fn, nowMs = state.deps.nowMs()) {
	if (!state.store) return false;
	let changed = false;
	for (const job of state.store.jobs) {
		const tick = normalizeJobTickState({
			state,
			job,
			nowMs
		});
		if (tick.changed) changed = true;
		if (tick.skip) continue;
		if (fn({
			job,
			nowMs
		})) changed = true;
	}
	return changed;
}
function recomputeJobNextRunAtMs(params) {
	let changed = false;
	try {
		let newNext = computeJobNextRunAtMs(params.job, params.nowMs);
		if (params.job.schedule.kind !== "at" && resolveJobLastRunStatus(params.job) === "error" && isFiniteTimestamp(params.job.state.lastRunAtMs)) {
			const backoffFloor = resolveJobErrorBackoffUntilMs(params.job, DEFAULT_ERROR_BACKOFF_SCHEDULE_MS);
			if (newNext !== void 0) newNext = backoffFloor !== void 0 ? Math.max(newNext, backoffFloor) : newNext;
		}
		if (params.job.state.nextRunAtMs !== newNext) {
			params.job.state.nextRunAtMs = newNext;
			changed = true;
		}
		if (params.job.state.scheduleErrorCount) {
			params.job.state.scheduleErrorCount = void 0;
			changed = true;
		}
	} catch (err) {
		if (params.skipScheduleErrorHandling) return false;
		if (recordScheduleComputeError({
			state: params.state,
			job: params.job,
			err,
			deferredNotifications: params.deferredNotifications
		})) changed = true;
	}
	return changed;
}
/** Recomputes missing, due, or repairable next-run timestamps for all schedulable jobs. */
function recomputeNextRuns(state) {
	return walkSchedulableJobs(state, ({ job, nowMs: now }) => {
		const nextRun = job.state.nextRunAtMs;
		const hasForcePreservedNextRun = isFiniteTimestamp(job.state.forcePreservedNextRunAtMs) && hasScheduledNextRunAtMs(nextRun) && job.state.forcePreservedNextRunAtMs === nextRun;
		const isDueOrMissing = !hasScheduledNextRunAtMs(nextRun) || now >= nextRun;
		return !hasForcePreservedNextRun && (isDueOrMissing || shouldRepairFutureCronNextRunAtMs({
			state,
			job,
			nowMs: now
		})) && recomputeJobNextRunAtMs({
			state,
			job,
			nowMs: now
		});
	});
}
/**
* Maintenance-only version of recomputeNextRuns that handles disabled jobs
* and stuck markers, but does NOT recompute nextRunAtMs for enabled jobs
* with existing values. Used during timer ticks when no due jobs were found
* to prevent silently advancing past-due nextRunAtMs values without execution
* (see #13992).
*/
function recomputeNextRunsForMaintenance(state, opts) {
	const recomputeExpired = opts?.recomputeExpired ?? false;
	const repairFutureCronNextRunAtMs = opts?.repairFutureCronNextRunAtMs ?? true;
	const recomputeJob = (job, nowMs) => recomputeJobNextRunAtMs({
		state,
		job,
		nowMs,
		deferredNotifications: opts?.deferredNotifications,
		skipScheduleErrorHandling: opts?.skipScheduleErrorHandling
	});
	return walkSchedulableJobs(state, ({ job, nowMs: now }) => {
		let changed = false;
		const startupCatchupAtMs = job.state.startupCatchupAtMs;
		const pacedNextRunAtMs = job.state.pacedNextRunAtMs;
		const nextRunAtMs = job.state.nextRunAtMs;
		const hasForcePreservedNextRun = isFiniteTimestamp(job.state.forcePreservedNextRunAtMs) && hasScheduledNextRunAtMs(nextRunAtMs) && job.state.forcePreservedNextRunAtMs === nextRunAtMs;
		const hasPendingStartupCatchup = isFiniteTimestamp(startupCatchupAtMs) && hasScheduledNextRunAtMs(nextRunAtMs) && startupCatchupAtMs === nextRunAtMs && now < startupCatchupAtMs;
		if (startupCatchupAtMs !== void 0 && !hasPendingStartupCatchup) {
			job.state.startupCatchupAtMs = void 0;
			changed = true;
		}
		const hasPendingPacedNextRun = isFiniteTimestamp(pacedNextRunAtMs) && hasScheduledNextRunAtMs(nextRunAtMs) && pacedNextRunAtMs === nextRunAtMs && (now < pacedNextRunAtMs || opts?.preserveExpiredPacedNextRunJobId === job.id);
		if (pacedNextRunAtMs !== void 0 && !hasPendingPacedNextRun) {
			job.state.pacedNextRunAtMs = void 0;
			changed = true;
		}
		if (!hasScheduledNextRunAtMs(job.state.nextRunAtMs)) changed = recomputeJob(job, now) || changed;
		else if (repairFutureCronNextRunAtMs && !hasPendingStartupCatchup && !hasPendingPacedNextRun && !hasForcePreservedNextRun && shouldRepairFutureCronNextRunAtMs({
			state,
			job,
			nowMs: now
		})) changed = recomputeJob(job, now) || changed;
		else if (recomputeExpired && !hasForcePreservedNextRun && now >= job.state.nextRunAtMs && typeof job.state.queuedAtMs !== "number" && typeof job.state.runningAtMs !== "number") {
			const lastRun = job.state.lastRunAtMs;
			const alreadyExecutedSlot = isFiniteTimestamp(lastRun) && lastRun >= job.state.nextRunAtMs;
			const backoffUntilMs = resolveJobErrorBackoffUntilMs(job, DEFAULT_ERROR_BACKOFF_SCHEDULE_MS);
			const isStaleBackoffSlot = backoffUntilMs !== void 0 && now < backoffUntilMs && job.state.nextRunAtMs < backoffUntilMs;
			if (alreadyExecutedSlot || isStaleBackoffSlot) changed = recomputeJob(job, now) || changed;
		}
		return changed;
	}, opts?.nowMs);
}
/** Returns the next enabled wake timestamp from the in-memory cron store. */
function nextWakeAtMs(state) {
	let nextWake;
	for (const job of state.store?.jobs ?? []) {
		const nextRun = job.state.nextRunAtMs;
		if (isJobEnabled(job) && hasScheduledNextRunAtMs(nextRun)) nextWake = nextWake === void 0 ? nextRun : Math.min(nextWake, nextRun);
	}
	return nextWake;
}
/** Applies one canonical server-authored authority envelope to a tool-bearing job. */
function hasActiveCronRun(job) {
	return typeof job.state.queuedAtMs === "number" || typeof job.state.runningAtMs === "number" || isCronJobActive(job.id);
}
/** Returns whether a cron job should execute at `nowMs`, honoring force mode and active runs. */
function isJobDue(job, nowMs, opts) {
	if (!job.state) job.state = {};
	if (hasActiveCronRun(job)) return false;
	if (opts.forced) return true;
	return isJobEnabled(job) && hasScheduledNextRunAtMs(job.state.nextRunAtMs) && nowMs >= job.state.nextRunAtMs;
}
/** Returns main-session queue text for system-event jobs, or undefined when empty/unsupported. */
function resolveJobPayloadTextForMain(job) {
	if (job.payload.kind !== "systemEvent") return;
	const text = normalizePayloadToSystemText(job.payload);
	return text.trim() ? text : void 0;
}
//#endregion
//#region src/cron/service/jobs-validation.ts
/** Validation helpers for cron schedules, targets, payloads, and delivery. */
/** Validates that session target and payload kind form a supported cron job shape. */
function assertSupportedJobSpec(job) {
	if (typeof job.sessionTarget !== "string") throw new Error("cron job is missing sessionTarget; expected \"main\", \"isolated\", \"current\", or \"session:<id>\"");
	const isIsolatedLike = job.sessionTarget === "isolated" || job.sessionTarget === "current" || job.sessionTarget.startsWith("session:");
	if (job.sessionTarget.startsWith("session:")) assertSafeCronSessionTargetId(job.sessionTarget.slice(8));
	if (job.sessionTarget === "main" && job.payload.kind !== "systemEvent" && job.payload.kind !== "script" && job.payload.kind !== "heartbeat") throw new Error("main cron jobs require payload.kind=\"systemEvent\" or \"script\"");
	if (job.payload.kind === "script" && job.sessionTarget !== "main" && job.sessionTarget !== "isolated") throw new Error("script cron jobs require sessionTarget=\"main\" or \"isolated\"");
	if (isIsolatedLike && job.payload.kind !== "agentTurn" && job.payload.kind !== "command" && !(job.sessionTarget === "isolated" && job.payload.kind === "script")) throw new Error("isolated cron jobs require payload.kind=\"agentTurn\", \"command\", or \"script\"; script payloads do not support current/session targets");
}
function assertScriptPayloadSupport(job, opts) {
	if (job.payload.kind !== "script") return;
	if (!job.payload.script.trim()) throw new Error("cron script payload must not be empty");
	if (opts?.validateSyntax !== false) {
		const parsed = parseCodeModeScriptSyntax(job.payload.script);
		if (!parsed.ok) throw new Error(`cron script payload has a syntax error: ${parsed.message} (line ${parsed.line}, column ${parsed.column})`);
	}
	if (job.trigger) throw new Error("cron script payloads cannot be combined with a condition trigger");
	if (opts?.requireEnabled && opts.cronConfig?.triggers?.enabled !== true) throw new Error("cron script payloads are disabled; set cron.triggers.enabled=true to allow unattended scripts");
}
function assertTriggerSupport(job, opts) {
	if (!job.trigger) return;
	if (opts?.requireEnabled && opts.cronConfig?.triggers?.enabled !== true) throw new Error("cron triggers are disabled; set cron.triggers.enabled=true");
	if (job.schedule.kind !== "every" && job.schedule.kind !== "cron" && job.schedule.kind !== "stream") throw new Error("cron triggers require an every, cron, or stream schedule");
	const minIntervalMs = resolveCronTriggerMinIntervalMs();
	if (job.schedule.kind === "every" && job.schedule.everyMs < minIntervalMs) throw new Error(`cron trigger every interval must be at least ${minIntervalMs}ms`);
}
function assertPacingSupport(job) {
	if (job.pacing === void 0) return;
	parseCronPacingBounds(job.pacing);
	if (job.schedule.kind !== "every" && job.schedule.kind !== "cron") throw new Error("cron pacing requires an every or cron schedule");
}
function assertStreamScheduleSupport(job, opts) {
	if (job.schedule.kind !== "stream") return;
	if (opts?.requireEnabled && opts.cronConfig?.triggers?.enabled !== true) throw new Error("cron stream schedules are disabled; set cron.triggers.enabled=true");
	const { command, mode = "line", match } = job.schedule;
	if (!Array.isArray(command) || command.length === 0 || command.some((entry) => typeof entry !== "string" || entry.length === 0)) throw new Error("cron stream schedule requires a non-empty command argv array");
	if (mode !== "line" && mode !== "match") throw new Error("cron stream mode must be \"line\" or \"match\"");
	if (mode === "match") {
		if (typeof match !== "string" || !match) throw new Error("cron stream match is required when mode=\"match\"");
		const compiled = compileSafeRegexDetailed(match);
		if (!compiled.regex) throw new Error(`cron stream match is not a safe regular expression (${compiled.reason})`);
	} else if (match !== void 0) throw new Error("cron stream match requires mode=\"match\"");
	if (job.payload.kind === "command") throw new Error("cron stream schedules cannot use command payloads");
}
function assertCronExpressionSatisfiable(job, nowMs, computeJobNextRunAtMs) {
	if (job.schedule.kind !== "cron") return;
	if (computeJobNextRunAtMs({
		...job,
		enabled: true
	}, nowMs) !== void 0) return;
	throw new Error(`cron expression "${job.schedule.expr}" has no upcoming run time and would never fire`);
}
function assertMainSessionAgentId(job, defaultAgentId) {
	if (job.sessionTarget !== "main") return;
	if (!job.agentId) return;
	if (job.payload.kind === "script" || job.payload.kind === "heartbeat") return;
	if (normalizeAgentId(job.agentId) !== normalizeAgentId(defaultAgentId)) throw new Error(`cron: sessionTarget "main" is only valid for the default agent. Use sessionTarget "isolated" with payload.kind "agentTurn" for non-default agents (agentId: ${job.agentId})`);
}
function assertDeliverySupport(job) {
	if (!job.delivery) return;
	if (job.delivery.mode === "none" && !job.delivery.completionDestination) return;
	if (job.delivery.mode === "webhook") {
		const target = normalizeHttpWebhookUrl(job.delivery.to);
		if (!target) throw new Error("cron webhook delivery requires delivery.to to be a valid http(s) URL");
		job.delivery.to = target;
	}
	if (job.delivery.completionDestination?.mode === "webhook") {
		if (job.delivery.mode !== "announce") throw new Error("cron completion destination webhook is only supported with delivery.mode=\"announce\"");
		const target = normalizeHttpWebhookUrl(job.delivery.completionDestination.to);
		if (!target) throw new Error("cron completion destination webhook requires delivery.completionDestination.to to be a valid http(s) URL");
		job.delivery.completionDestination.to = target;
	}
	if (job.delivery.mode === "none") return;
	if (job.delivery.mode === "webhook") return;
	if (!(job.sessionTarget === "isolated" || job.sessionTarget === "current" || job.sessionTarget.startsWith("session:"))) throw new Error("cron channel delivery config is only supported for sessionTarget=\"isolated\"");
}
function assertAnnounceDeliveryChannelSupport(job, configuredChannels, patch) {
	if (patch && !cronPatchTouchesDeliveryResolution(patch)) return;
	const plan = resolveCronDeliveryPlan(job);
	const channels = [...new Set(configuredChannels ?? [])].toSorted();
	const targetMaySelectChannel = /^[a-z][a-z0-9_-]*:/i.test(plan.to ?? "");
	if (job.sessionTarget !== "isolated" || job.sessionKey?.trim() || plan.mode !== "announce" || plan.channel !== void 0 && plan.channel !== "last" || targetMaySelectChannel || job.delivery?.bestEffort === true || channels.length < 2) return;
	throw new Error(`cron announce delivery requires an explicit channel when multiple channels are configured (${channels.join(", ")}): set --channel <id> or use --best-effort-deliver`);
}
function cronPatchTouchesDeliveryResolution(patch) {
	return patch.delivery !== void 0 || patch.sessionTarget !== void 0 || "agentId" in patch || "sessionKey" in patch;
}
function hasConcreteFailureDestination(destination) {
	return Boolean(destination && (destination.channel !== void 0 || destination.to !== void 0 || destination.accountId !== void 0 || destination.mode !== void 0));
}
function assertFailureDestinationSupport(job) {
	const failureDestination = job.delivery?.failureDestination;
	if (!failureDestination) return;
	if (!hasConcreteFailureDestination(failureDestination)) return;
	if (job.sessionTarget === "main" && job.delivery?.mode !== "webhook") throw new Error("cron delivery.failureDestination is only supported for sessionTarget=\"isolated\" unless delivery.mode=\"webhook\"");
	if (failureDestination.mode === "webhook") {
		const target = normalizeHttpWebhookUrl(failureDestination.to);
		if (!target) throw new Error("cron failure destination webhook requires delivery.failureDestination.to to be a valid http(s) URL");
		failureDestination.to = target;
	}
}
//#endregion
//#region src/cron/service/payload-merge.ts
function applyToolsAllowPatch(payload, patch, existing) {
	if (Array.isArray(patch.toolsAllow)) {
		payload.toolsAllow = patch.toolsAllow;
		const existingDefaultUnchanged = existing?.toolsAllowIsDefault === true && toolsAllowEqual(existing, patch);
		const installsDefault = patch.toolsAllowIsDefault === true && existing?.toolsAllowIsDefault !== true;
		if (existingDefaultUnchanged || installsDefault) payload.toolsAllowIsDefault = true;
		else delete payload.toolsAllowIsDefault;
	} else if (patch.toolsAllow === null) {
		delete payload.toolsAllow;
		delete payload.toolsAllowIsDefault;
	}
}
function toolsAllowEqual(left, right) {
	const rightToolsAllow = right.toolsAllow;
	return Array.isArray(left.toolsAllow) && Array.isArray(rightToolsAllow) && left.toolsAllow.length === rightToolsAllow.length && left.toolsAllow.every((toolName, index) => toolName === rightToolsAllow[index]);
}
function mergeCronPayload(existing, patch) {
	if (patch.kind !== existing.kind) {
		const next = buildPayloadFromPatch(patch);
		if (patch.toolsAllow === void 0 && Array.isArray(existing.toolsAllow)) {
			next.toolsAllow = [...existing.toolsAllow];
			if (existing.toolsAllowIsDefault === true) next.toolsAllowIsDefault = true;
		}
		return next;
	}
	if (patch.kind === "systemEvent") {
		if (existing.kind !== "systemEvent") return buildPayloadFromPatch(patch);
		const text = typeof patch.text === "string" ? patch.text : existing.text;
		const next = {
			...existing,
			text
		};
		applyToolsAllowPatch(next, patch, existing);
		return next;
	}
	if (patch.kind === "command") {
		if (existing.kind !== "command") return buildPayloadFromPatch(patch);
		const next = { ...existing };
		if (Array.isArray(patch.argv)) next.argv = patch.argv;
		if (typeof patch.cwd === "string") next.cwd = patch.cwd;
		if (patch.env && typeof patch.env === "object" && !Array.isArray(patch.env)) next.env = patch.env;
		if (typeof patch.input === "string") next.input = patch.input;
		if (typeof patch.timeoutSeconds === "number") next.timeoutSeconds = patch.timeoutSeconds;
		if (typeof patch.noOutputTimeoutSeconds === "number") next.noOutputTimeoutSeconds = patch.noOutputTimeoutSeconds;
		if (typeof patch.outputMaxBytes === "number") next.outputMaxBytes = patch.outputMaxBytes;
		applyToolsAllowPatch(next, patch, existing);
		return next;
	}
	if (patch.kind === "script") {
		if (existing.kind !== "script") return buildPayloadFromPatch(patch);
		const next = { ...existing };
		if (typeof patch.script === "string") next.script = patch.script;
		if (typeof patch.timeoutSeconds === "number") next.timeoutSeconds = patch.timeoutSeconds;
		if (typeof patch.toolBudget === "number") next.toolBudget = patch.toolBudget;
		applyToolsAllowPatch(next, patch, existing);
		return next;
	}
	if (patch.kind === "heartbeat") return { kind: "heartbeat" };
	if (existing.kind !== "agentTurn") return buildPayloadFromPatch(patch);
	const next = { ...existing };
	if (typeof patch.message === "string") next.message = patch.message;
	if (typeof patch.model === "string") next.model = patch.model;
	else if (patch.model === null) delete next.model;
	if (Array.isArray(patch.fallbacks)) next.fallbacks = patch.fallbacks;
	else if (patch.fallbacks === null) delete next.fallbacks;
	applyToolsAllowPatch(next, patch, existing);
	if (typeof patch.thinking === "string") next.thinking = patch.thinking;
	else if (patch.thinking === null) delete next.thinking;
	if (typeof patch.timeoutSeconds === "number") next.timeoutSeconds = patch.timeoutSeconds;
	if (typeof patch.lightContext === "boolean") next.lightContext = patch.lightContext;
	if (typeof patch.allowUnsafeExternalContent === "boolean") next.allowUnsafeExternalContent = patch.allowUnsafeExternalContent;
	return next;
}
function buildPayloadFromPatch(patch) {
	if (patch.kind === "systemEvent") {
		if (typeof patch.text !== "string" || patch.text.length === 0) throw new Error("cron.update payload.kind=\"systemEvent\" requires text");
		const next = {
			kind: "systemEvent",
			text: patch.text
		};
		applyToolsAllowPatch(next, patch);
		return next;
	}
	if (patch.kind === "command") {
		if (!Array.isArray(patch.argv) || patch.argv.length === 0) throw new Error("cron.update payload.kind=\"command\" requires argv");
		const next = {
			kind: "command",
			argv: patch.argv,
			cwd: patch.cwd,
			env: patch.env,
			input: patch.input,
			timeoutSeconds: patch.timeoutSeconds,
			noOutputTimeoutSeconds: patch.noOutputTimeoutSeconds,
			outputMaxBytes: patch.outputMaxBytes
		};
		applyToolsAllowPatch(next, patch);
		return next;
	}
	if (patch.kind === "script") {
		if (typeof patch.script !== "string" || patch.script.trim().length === 0) throw new Error("cron.update payload.kind=\"script\" requires script");
		const next = {
			kind: "script",
			script: patch.script,
			timeoutSeconds: patch.timeoutSeconds,
			toolBudget: patch.toolBudget
		};
		applyToolsAllowPatch(next, patch);
		return next;
	}
	if (patch.kind === "heartbeat") return { kind: "heartbeat" };
	if (typeof patch.message !== "string" || patch.message.length === 0) throw new Error("cron.update payload.kind=\"agentTurn\" requires message");
	const next = {
		kind: "agentTurn",
		message: patch.message,
		model: typeof patch.model === "string" ? patch.model : void 0,
		fallbacks: Array.isArray(patch.fallbacks) ? patch.fallbacks : void 0,
		thinking: typeof patch.thinking === "string" ? patch.thinking : void 0,
		timeoutSeconds: patch.timeoutSeconds,
		lightContext: patch.lightContext,
		allowUnsafeExternalContent: patch.allowUnsafeExternalContent
	};
	applyToolsAllowPatch(next, patch);
	return next;
}
//#endregion
//#region src/cron/service/jobs.ts
/** Cron job scheduling, validation, creation, and patch helpers. */
const CRON_DECLARATIVE_LABEL_MAX_LENGTH = 200;
function stampScheduledToolPolicy(job, scheduledToolPolicy) {
	if (!cronJobUsesToolRuntime(job) || job.payload.toolsAllow === void 0) {
		delete job.scheduledToolPolicy;
		return;
	}
	const policy = scheduledToolPolicy ?? createTrustedCronScheduledToolPolicy();
	if (policy.mode === "account" && (job.owner?.sessionKey !== policy.ownerSessionKey || job.owner?.accountId !== policy.ownerAccountId)) throw new Error("scheduled account policy must match the persisted job owner");
	job.scheduledToolPolicy = structuredClone(policy);
}
function reconcileScheduledToolPolicy(params) {
	const { job } = params;
	if (!cronJobUsesToolRuntime(job) || job.payload.toolsAllow === void 0) {
		delete job.scheduledToolPolicy;
		return;
	}
	const current = resolveCronScheduledToolPolicy({
		toolsAllow: job.payload.toolsAllow,
		scheduledToolPolicy: job.scheduledToolPolicy,
		owner: job.owner
	});
	if (current) {
		job.scheduledToolPolicy = current;
		return;
	}
	delete job.scheduledToolPolicy;
	if (params.explicitlyMutatesToolsAllow || !params.previouslyUsedToolRuntime) stampScheduledToolPolicy(job, params.scheduledToolPolicy);
}
/** Creates a normalized cron job row from public add input and computes its initial schedule. */
function createJob(state, input, opts) {
	const now = state.deps.nowMs();
	const id = normalizeOptionalString(input.id) ?? crypto.randomUUID();
	const schedule = input.schedule.kind === "every" ? {
		...input.schedule,
		anchorMs: resolveEveryAnchorMs({
			schedule: input.schedule,
			fallbackAnchorMs: now
		})
	} : input.schedule.kind === "cron" ? (() => {
		const explicitStaggerMs = normalizeCronStaggerMs(input.schedule.staggerMs);
		if (explicitStaggerMs !== void 0) return {
			...input.schedule,
			staggerMs: explicitStaggerMs
		};
		const defaultStaggerMs = resolveDefaultCronStaggerMs(input.schedule.expr);
		return defaultStaggerMs !== void 0 ? {
			...input.schedule,
			staggerMs: defaultStaggerMs
		} : input.schedule;
	})() : normalizeStreamScheduleBounds(input.schedule);
	const deleteAfterRun = typeof input.deleteAfterRun === "boolean" ? input.deleteAfterRun : schedule.kind === "at" ? true : void 0;
	const enabled = typeof input.enabled === "boolean" ? input.enabled : true;
	const declarationKey = normalizeOptionalString(input.declarationKey);
	if (input.declarationKey !== void 0 && !declarationKey) throw new Error("cron declarationKey must not be blank");
	if (declarationKey && declarationKey.length > CRON_DECLARATIVE_LABEL_MAX_LENGTH) throw new Error(`cron declarationKey must be at most ${CRON_DECLARATIVE_LABEL_MAX_LENGTH} characters`);
	const displayName = normalizeOptionalString(input.displayName);
	if (input.displayName !== void 0 && !displayName) throw new Error("cron displayName must not be blank");
	if (displayName && displayName.length > CRON_DECLARATIVE_LABEL_MAX_LENGTH) throw new Error(`cron displayName must be at most ${CRON_DECLARATIVE_LABEL_MAX_LENGTH} characters`);
	const ownerAgentId = normalizeOptionalAgentId(input.owner?.agentId);
	const ownerSessionKey = normalizeOptionalString(input.owner?.sessionKey);
	const ownerAccountId = normalizeOptionalAccountId(input.owner?.accountId);
	const initialState = { ...input.state };
	delete initialState.scheduleActivatedAtMs;
	const job = {
		id,
		...declarationKey ? { declarationKey } : {},
		...displayName ? { displayName } : {},
		...ownerAgentId || ownerSessionKey || ownerAccountId ? { owner: {
			...ownerAgentId ? { agentId: ownerAgentId } : {},
			...ownerSessionKey ? { sessionKey: ownerSessionKey } : {},
			...ownerAccountId ? { accountId: ownerAccountId } : {}
		} } : {},
		agentId: normalizeOptionalAgentId(input.agentId),
		sessionKey: normalizeOptionalString(input.sessionKey),
		name: normalizeRequiredName(input.name),
		description: normalizeOptionalString(input.description),
		enabled,
		deleteAfterRun,
		createdAtMs: now,
		updatedAtMs: now,
		schedule,
		...input.pacing !== void 0 ? { pacing: structuredClone(input.pacing) } : {},
		sessionTarget: input.sessionTarget,
		wakeMode: input.wakeMode,
		payload: input.payload.kind === "script" ? normalizeCronScriptPayload(structuredClone(input.payload)) : structuredClone(input.payload),
		delivery: resolveInitialCronDelivery(input),
		failureAlert: input.failureAlert,
		...input.trigger ? { trigger: structuredClone(input.trigger) } : {},
		state: {
			...initialState,
			...schedule.kind === "stream" ? { streamSourceIdentity: createCronStreamSourceIdentity() } : {}
		}
	};
	applyDefaultCronToolsAllow(job);
	stampScheduledToolPolicy(job, opts?.scheduledToolPolicy);
	assertSupportedJobSpec(job);
	assertPacingSupport(job);
	assertTriggerSupport(job, {
		cronConfig: state.deps.cronConfig,
		requireEnabled: job.trigger !== void 0
	});
	assertScriptPayloadSupport(job, {
		cronConfig: state.deps.cronConfig,
		requireEnabled: job.payload.kind === "script"
	});
	assertStreamScheduleSupport(job, {
		cronConfig: state.deps.cronConfig,
		requireEnabled: true
	});
	assertMainSessionAgentId(job, state.deps.defaultAgentId);
	assertDeliverySupport(job);
	assertAnnounceDeliveryChannelSupport(job, opts?.configuredChannels);
	assertFailureDestinationSupport(job);
	assertCronExpressionSatisfiable(job, now, computeJobNextRunAtMs);
	job.state.nextRunAtMs = computeJobNextRunAtMs(job, now);
	return job;
}
/** Applies a public cron patch in-place, preserving omitted nested fields and validating the result. */
function applyJobPatch(job, patch, opts) {
	const previouslyUsedToolRuntime = cronJobUsesToolRuntime(job);
	const explicitlyClearsToolsAllow = patch.payload?.toolsAllow === null;
	const previousScheduleKind = job.schedule.kind;
	if ("name" in patch) job.name = normalizeRequiredName(patch.name);
	if ("description" in patch) job.description = normalizeOptionalString(patch.description);
	if ("displayName" in patch) {
		const displayName = normalizeOptionalString(patch.displayName);
		if (patch.displayName !== null && patch.displayName !== void 0 && !displayName) throw new Error("cron displayName must not be blank");
		if (displayName && displayName.length > CRON_DECLARATIVE_LABEL_MAX_LENGTH) throw new Error(`cron displayName must be at most ${CRON_DECLARATIVE_LABEL_MAX_LENGTH} characters`);
		if (displayName) job.displayName = displayName;
		else delete job.displayName;
	}
	if (typeof patch.enabled === "boolean") job.enabled = patch.enabled;
	if (typeof patch.deleteAfterRun === "boolean") job.deleteAfterRun = patch.deleteAfterRun;
	else if (patch.schedule?.kind === "at" && (previousScheduleKind === "every" || previousScheduleKind === "cron")) job.deleteAfterRun = true;
	else if (previousScheduleKind === "at" && (patch.schedule?.kind === "every" || patch.schedule?.kind === "cron")) delete job.deleteAfterRun;
	if (patch.schedule) if (patch.schedule.kind === "cron") {
		const explicitStaggerMs = normalizeCronStaggerMs(patch.schedule.staggerMs);
		if (explicitStaggerMs !== void 0) job.schedule = {
			...patch.schedule,
			staggerMs: explicitStaggerMs
		};
		else if (job.schedule.kind === "cron" && job.schedule.expr === patch.schedule.expr) job.schedule = {
			...patch.schedule,
			staggerMs: job.schedule.staggerMs
		};
		else {
			const defaultStaggerMs = resolveDefaultCronStaggerMs(patch.schedule.expr);
			job.schedule = defaultStaggerMs !== void 0 ? {
				...patch.schedule,
				staggerMs: defaultStaggerMs
			} : patch.schedule;
		}
	} else job.schedule = normalizeStreamScheduleBounds(patch.schedule);
	if ("trigger" in patch) if (patch.trigger === null || patch.trigger === void 0) delete job.trigger;
	else job.trigger = structuredClone(patch.trigger);
	if ("pacing" in patch) if (patch.pacing === null || patch.pacing === void 0) delete job.pacing;
	else job.pacing = structuredClone(patch.pacing);
	if (patch.sessionTarget) job.sessionTarget = patch.sessionTarget;
	if (patch.wakeMode) job.wakeMode = patch.wakeMode;
	if (patch.payload) {
		job.payload = mergeCronPayload(job.payload, patch.payload);
		if (job.payload.kind === "script") job.payload = normalizeCronScriptPayload(job.payload);
	}
	if (cronJobUsesToolRuntime(job) && (!previouslyUsedToolRuntime || explicitlyClearsToolsAllow)) applyDefaultCronToolsAllow(job);
	reconcileScheduledToolPolicy({
		job,
		previouslyUsedToolRuntime,
		explicitlyMutatesToolsAllow: patch.payload !== void 0 && Object.hasOwn(patch.payload, "toolsAllow"),
		scheduledToolPolicy: opts?.scheduledToolPolicy
	});
	if (patch.delivery) {
		const implicitMode = resolveCronDeliveryPlan(job).mode;
		job.delivery = mergeCronDelivery(job.delivery, patch.delivery, implicitMode);
	}
	if ("failureAlert" in patch) job.failureAlert = mergeCronFailureAlert(job.failureAlert, patch.failureAlert);
	if (job.sessionTarget === "main" && job.delivery?.mode !== "webhook" && hasConcreteFailureDestination(job.delivery?.failureDestination)) throw new Error("cron delivery.failureDestination is only supported for sessionTarget=\"isolated\" unless delivery.mode=\"webhook\"");
	if (job.sessionTarget === "main" && job.delivery?.mode !== "webhook") {
		const failureDestination = job.delivery?.failureDestination;
		job.delivery = failureDestination && !hasConcreteFailureDestination(failureDestination) ? {
			mode: "none",
			failureDestination
		} : void 0;
	}
	if (patch.state) {
		const statePatch = { ...patch.state };
		delete statePatch.scheduleActivatedAtMs;
		delete statePatch.autoDisabled;
		job.state = {
			...job.state,
			...statePatch
		};
	}
	if (patch.enabled === true) {
		delete job.state.autoDisabled;
		job.state.consecutiveErrors = 0;
		job.state.scheduleErrorCount = 0;
	}
	if ("agentId" in patch) job.agentId = normalizeOptionalAgentId(patch.agentId);
	if ("sessionKey" in patch) job.sessionKey = normalizeOptionalString(patch.sessionKey);
	if (job.schedule.kind === "stream" && patch.enabled === true) {
		job.state.streamRestartExhausted = void 0;
		job.state.streamConsecutiveFailures = 0;
		job.state.streamError = void 0;
	}
	if (previousScheduleKind === "stream" && job.schedule.kind !== "stream") {
		job.state.streamStatus = void 0;
		job.state.streamError = void 0;
		job.state.streamConsecutiveFailures = void 0;
		job.state.streamRestartExhausted = void 0;
		job.state.streamSourceIdentity = void 0;
		job.state.streamDroppedBatches = void 0;
		job.state.streamCoalescedBatches = void 0;
		job.state.streamLastStartedAtMs = void 0;
		job.state.streamLastExitAtMs = void 0;
	}
	assertSupportedJobSpec(job);
	assertPacingSupport(job);
	assertTriggerSupport(job, {
		cronConfig: opts?.cronConfig,
		requireEnabled: patch.trigger !== null && patch.trigger !== void 0
	});
	assertScriptPayloadSupport(job, {
		cronConfig: opts?.cronConfig,
		requireEnabled: patch.payload?.kind === "script",
		validateSyntax: patch.payload !== void 0
	});
	assertStreamScheduleSupport(job, {
		cronConfig: opts?.cronConfig,
		requireEnabled: patch.enabled === true || patch.schedule?.kind === "stream"
	});
	assertMainSessionAgentId(job, opts?.defaultAgentId);
	assertDeliverySupport(job);
	assertAnnounceDeliveryChannelSupport(job, opts?.configuredChannels, patch);
	assertFailureDestinationSupport(job);
	if (opts?.scheduleValidationNowMs !== void 0 && (patch.schedule !== void 0 || patch.enabled === true)) assertCronExpressionSatisfiable(job, opts.scheduleValidationNowMs, computeJobNextRunAtMs);
}
/** Converges the declared schedule, payload, delivery, and display label only. */
function applyDeclarativeJobSpec(job, input, opts) {
	const previouslyUsedToolRuntime = cronJobUsesToolRuntime(job);
	const explicitlyDeclaresToolsAllow = input.payload.toolsAllow !== void 0;
	const previousToolsAllow = job.payload.toolsAllow;
	const previousToolsAllowIsDefault = job.payload.toolsAllowIsDefault;
	const displayName = normalizeOptionalString(input.displayName);
	if (input.displayName !== void 0 && !displayName) throw new Error("cron displayName must not be blank");
	if (displayName && displayName.length > CRON_DECLARATIVE_LABEL_MAX_LENGTH) throw new Error(`cron displayName must be at most ${CRON_DECLARATIVE_LABEL_MAX_LENGTH} characters`);
	if (displayName) job.displayName = displayName;
	else delete job.displayName;
	if (input.schedule.kind === "every" && input.schedule.anchorMs === void 0 && job.schedule.kind === "every" && job.schedule.everyMs === input.schedule.everyMs) job.schedule = {
		...input.schedule,
		anchorMs: job.schedule.anchorMs
	};
	else if (input.schedule.kind === "every" && input.schedule.anchorMs === void 0) job.schedule = {
		...input.schedule,
		anchorMs: opts.nowMs
	};
	else if (input.schedule.kind === "cron") {
		const explicitStaggerMs = normalizeCronStaggerMs(input.schedule.staggerMs);
		const defaultStaggerMs = resolveDefaultCronStaggerMs(input.schedule.expr);
		job.schedule = {
			...input.schedule,
			...explicitStaggerMs !== void 0 ? { staggerMs: explicitStaggerMs } : defaultStaggerMs !== void 0 ? { staggerMs: defaultStaggerMs } : {}
		};
	} else job.schedule = normalizeStreamScheduleBounds(structuredClone(input.schedule));
	if (input.pacing !== void 0) job.pacing = structuredClone(input.pacing);
	else delete job.pacing;
	job.payload = input.payload.kind === "script" ? normalizeCronScriptPayload(structuredClone(input.payload)) : structuredClone(input.payload);
	if (input.trigger) job.trigger = structuredClone(input.trigger);
	else delete job.trigger;
	if (cronJobUsesToolRuntime(job) && job.payload.toolsAllow === void 0) {
		if (previousToolsAllow !== void 0) {
			job.payload.toolsAllow = [...previousToolsAllow];
			if (previousToolsAllowIsDefault === true) job.payload.toolsAllowIsDefault = true;
		} else if (!previouslyUsedToolRuntime) applyDefaultCronToolsAllow(job);
	}
	reconcileScheduledToolPolicy({
		job,
		previouslyUsedToolRuntime,
		explicitlyMutatesToolsAllow: explicitlyDeclaresToolsAllow,
		scheduledToolPolicy: opts.scheduledToolPolicy
	});
	const delivery = resolveInitialCronDelivery(input);
	if (delivery) job.delivery = structuredClone(delivery);
	else delete job.delivery;
	if (opts.enabledExplicit) job.enabled = input.enabled;
	assertTriggerSupport(job, {
		cronConfig: opts.cronConfig,
		requireEnabled: input.trigger !== void 0
	});
	assertScriptPayloadSupport(job, {
		cronConfig: opts.cronConfig,
		requireEnabled: input.payload.kind === "script"
	});
	assertStreamScheduleSupport(job, {
		cronConfig: opts.cronConfig,
		requireEnabled: true
	});
	assertSupportedJobSpec(job);
	assertPacingSupport(job);
	assertMainSessionAgentId(job, opts.defaultAgentId);
	assertDeliverySupport(job);
	assertAnnounceDeliveryChannelSupport(job, opts.configuredChannels);
	assertFailureDestinationSupport(job);
	assertCronExpressionSatisfiable(job, opts.nowMs, computeJobNextRunAtMs);
}
function mergeCronDelivery(existing, patch, implicitMode) {
	const hasCompletionDestinationPatch = "completionDestination" in patch;
	const next = {
		mode: existing?.mode ?? implicitMode,
		channel: existing?.channel,
		to: existing?.to,
		threadId: existing?.threadId,
		accountId: existing?.accountId,
		bestEffort: existing?.bestEffort,
		completionDestination: existing?.completionDestination,
		failureDestination: existing?.failureDestination
	};
	if (typeof patch.mode === "string") {
		const previousMode = next.mode;
		next.mode = patch.mode === "deliver" ? "announce" : patch.mode;
		if (previousMode !== next.mode && (previousMode === "webhook" || next.mode === "webhook")) next.to = void 0;
		if (next.mode === "webhook") {
			next.channel = void 0;
			next.threadId = void 0;
			next.accountId = void 0;
		}
		if (!hasCompletionDestinationPatch && (next.mode === "none" || next.mode === "webhook")) next.completionDestination = void 0;
	}
	if ("channel" in patch) next.channel = normalizeOptionalString(patch.channel);
	if ("to" in patch) next.to = normalizeOptionalString(patch.to);
	if ("threadId" in patch) next.threadId = normalizeOptionalThreadValue(patch.threadId);
	if ("accountId" in patch) next.accountId = normalizeOptionalString(patch.accountId);
	if (typeof patch.bestEffort === "boolean") next.bestEffort = patch.bestEffort;
	if (hasCompletionDestinationPatch) if (patch.completionDestination == null) next.completionDestination = void 0;
	else {
		const to = normalizeOptionalString(patch.completionDestination.to);
		next.completionDestination = {
			mode: "webhook",
			...to ? { to } : {}
		};
	}
	if ("failureDestination" in patch) if (patch.failureDestination == null) next.failureDestination = void 0;
	else {
		const existingFd = next.failureDestination;
		const patchFd = patch.failureDestination;
		const nextFd = {};
		if (existingFd) {
			if (Object.hasOwn(existingFd, "channel")) nextFd.channel = existingFd.channel;
			if (Object.hasOwn(existingFd, "to")) nextFd.to = existingFd.to;
			if (Object.hasOwn(existingFd, "accountId")) nextFd.accountId = existingFd.accountId;
			if (Object.hasOwn(existingFd, "mode")) nextFd.mode = existingFd.mode;
		}
		if (patchFd) {
			if ("channel" in patchFd) {
				const channel = normalizeOptionalString(patchFd.channel) ?? "";
				nextFd.channel = channel ? channel : void 0;
			}
			if ("to" in patchFd) {
				const to = normalizeOptionalString(patchFd.to) ?? "";
				nextFd.to = to ? to : void 0;
			}
			if ("accountId" in patchFd) {
				const accountId = normalizeOptionalString(patchFd.accountId) ?? "";
				nextFd.accountId = accountId ? accountId : void 0;
			}
			if ("mode" in patchFd) {
				const mode = normalizeOptionalString(patchFd.mode) ?? "";
				nextFd.mode = mode === "announce" || mode === "webhook" ? mode : void 0;
			}
		}
		next.failureDestination = Object.hasOwn(nextFd, "channel") || Object.hasOwn(nextFd, "to") || Object.hasOwn(nextFd, "accountId") || Object.hasOwn(nextFd, "mode") ? nextFd : void 0;
	}
	if (existing === void 0 && !("mode" in patch) && next.channel === void 0 && next.to === void 0 && next.threadId === void 0 && next.accountId === void 0 && next.bestEffort === void 0 && next.completionDestination === void 0 && next.failureDestination === void 0) return;
	return next;
}
function mergeCronFailureAlert(existing, patch) {
	if (patch === false) return false;
	if (patch === null) return;
	if (patch === void 0) return existing;
	const next = { ...existing === false || existing === void 0 ? {} : existing };
	if ("after" in patch) {
		const after = typeof patch.after === "number" && Number.isFinite(patch.after) ? patch.after : 0;
		next.after = after > 0 ? Math.floor(after) : void 0;
	}
	if ("channel" in patch) next.channel = normalizeOptionalString(patch.channel);
	if ("to" in patch) next.to = normalizeOptionalString(patch.to);
	if ("cooldownMs" in patch) {
		const cooldownMs = typeof patch.cooldownMs === "number" && Number.isFinite(patch.cooldownMs) ? patch.cooldownMs : -1;
		next.cooldownMs = cooldownMs >= 0 ? Math.floor(cooldownMs) : void 0;
	}
	if ("includeSkipped" in patch) next.includeSkipped = typeof patch.includeSkipped === "boolean" ? patch.includeSkipped : void 0;
	if ("mode" in patch) {
		const mode = normalizeOptionalString(patch.mode) ?? "";
		next.mode = mode === "announce" || mode === "webhook" ? mode : void 0;
	}
	if ("accountId" in patch) {
		const accountId = normalizeOptionalString(patch.accountId) ?? "";
		next.accountId = accountId ? accountId : void 0;
	}
	return next;
}
/**
* Covers both durable reservations and the process marker that survives mutable job state.
* Every timer/manual admission path must use this or disable/re-enable can duplicate a run.
*/
//#endregion
export { maybeAutoDisableCronJobAfterRunFailure as S, recomputeNextRunsForMaintenance as _, cronPatchTouchesDeliveryResolution as a, resolveJobLastRunStatus as b, computeJobPreviousRunAtOrBeforeMs as c, hasActiveCronRun as d, hasScheduledNextRunAtMs as f, recomputeNextRuns as g, nextWakeAtMs as h, assertSupportedJobSpec as i, errorBackoffMs as l, isJobEnabled as m, applyJobPatch as n, DEFAULT_ERROR_BACKOFF_SCHEDULE_MS as o, isJobDue as p, createJob as r, computeJobNextRunAtMs as s, applyDeclarativeJobSpec as t, findJobOrThrow as u, recordScheduleComputeError as v, resolveJobPayloadTextForMain as x, resolveJobErrorBackoffUntilMs as y };
