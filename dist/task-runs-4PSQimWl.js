import { s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { $ as cronTaskRecordToRunLogEntry, Q as cronTaskRecordStoreKey, X as cronRunLogEntryToTaskDetail, Z as cronRunStatusToTaskStatus, et as cronTaskRecordToScriptRunResult, pt as isCronTimeoutErrorText, rt as resolveCronTaskRecordTimestamp, tt as cronTaskRecordToTriggerEval } from "./openclaw-state-db-BU55lNCH.js";
import { f as resolveFailoverReasonFromError } from "./failover-error-CMC-wGmM.js";
import "./task-registry-BbNCFm_L.js";
import { c as finalizeTaskRunById, f as listTaskRecordsUnsorted, l as finalizeTaskRunByRunId, o as createRunningTaskRun, p as recordTaskRunProgressByRunId, u as findTaskByRunId } from "./task-executor-ScxdxD3G.js";
import { t as cronStoreKey } from "./key-BBZ40bDq.js";
import { i as normalizeCronRunErrorText } from "./execution-errors-nWe2GBKd.js";
import { t as resolveCronJobEffectiveAgentId } from "./agent-id-Bkj7XHtc.js";
import { t as createCronExecutionId } from "./run-id-kGde0n7U.js";
import { randomUUID } from "node:crypto";
//#region src/cron/run-error-reason.ts
/** Resolve one cron-owned classification before falling back to provider error inference. */
function resolveCronRunErrorReason(error, provider, classification) {
	if (classification?.kind === "permanent") return;
	if (classification?.kind === "reason") return classification.reason;
	return resolveFailoverReasonFromError(error, provider) ?? void 0;
}
//#endregion
//#region src/cron/task-run-event-codec.ts
/** Write-side cron codec: converts a finished service event into a run-history entry.
* Kept separate from task-run-detail.ts so the read/history codec stays free of the
* agents failover tree (which transitively pulls the sandbox module graph). */
/** Uses execution timing for one timestamp shared by ledger and legacy dual-write paths. */
function resolveCronRunEndedAt(event, fallbackTs) {
	if (typeof event.runAtMs === "number" && Number.isFinite(event.runAtMs) && typeof event.durationMs === "number" && Number.isFinite(event.durationMs)) return event.runAtMs + event.durationMs;
	return fallbackTs;
}
/** Builds the legacy run-history record from one finished service event. */
function cronRunLogEntryFromEvent(event, fallbackTs, errorClassification) {
	const errorReason = resolveCronRunErrorReason(event.error, event.provider, errorClassification);
	return {
		ts: resolveCronRunEndedAt(event, fallbackTs),
		jobId: event.jobId,
		action: "finished",
		status: event.status,
		error: event.error,
		errorReason,
		summary: event.summary,
		diagnostics: event.diagnostics,
		delivered: event.delivered,
		deliveryStatus: event.deliveryStatus,
		deliveryError: event.deliveryError,
		failureNotificationDelivery: event.failureNotificationDelivery,
		delivery: event.delivery,
		sessionId: event.sessionId,
		sessionKey: event.sessionKey,
		runId: event.runId,
		runAtMs: event.runAtMs,
		durationMs: event.durationMs,
		nextRunAtMs: event.nextRunAtMs,
		triggerFired: event.triggerFired,
		model: event.model,
		provider: event.provider,
		usage: event.usage
	};
}
//#endregion
//#region src/cron/service/task-runs.ts
/** Detached task-ledger integration for cron runs. */
function requireCronAgentId(agentId) {
	if (!agentId?.trim()) throw new Error("Cron task run requires an agent id or prepared configured default.");
	return normalizeAgentId(agentId);
}
function resolveCurrentDefaultAgentId(state) {
	return state.deps.resolveDefaultAgentId?.() ?? state.deps.defaultAgentId;
}
/** Converts cron ids into bounded session-key path segments with a fallback for empty input. */
function normalizeCronLaneSegment(value, fallback) {
	return normalizeOptionalLowercaseString(value)?.replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64) || fallback;
}
/** Builds the main-session child key used to isolate one cron run's task transcript. */
function resolveMainSessionCronRunSessionKey(job, startedAt, configuredDefaultAgentId) {
	return `agent:${resolveCronJobEffectiveAgentId(job, configuredDefaultAgentId)}:cron:${normalizeCronLaneSegment(job.id, "job")}:run:${normalizeCronLaneSegment(String(Math.max(0, Math.floor(startedAt))), "run")}`;
}
function resolveCronTaskChildSessionKey(params) {
	if (params.job.sessionTarget === "main" && params.job.payload.kind === "systemEvent") return resolveMainSessionCronRunSessionKey(params.job, params.startedAt, resolveCurrentDefaultAgentId(params.state));
}
/** Updates an active cron task with the exact transcript identity reported by its runner. */
function tryUpdateCronTaskRunSession(state, taskRunId, sessionKey) {
	const childSessionKey = sessionKey?.trim();
	if (!taskRunId || !childSessionKey) return;
	try {
		if (recordTaskRunProgressByRunId({
			runId: taskRunId,
			runtime: "cron",
			childSessionKey
		}).length === 0) state.deps.log.warn({ runId: taskRunId }, "cron: task ledger session was not updated");
	} catch (error) {
		state.deps.log.warn({
			runId: taskRunId,
			error
		}, "cron: failed to update task ledger session");
	}
}
/** Creates a best-effort detached task row keyed to the persisted execution start. */
function tryCreateCronTaskRun(params) {
	const runId = createCronTaskRunId(params.job.id, params.startedAt, params.publicRunId);
	return tryCreateCronTaskRunRecord({
		state: params.state,
		job: params.job,
		jobId: params.job.id,
		startedAt: params.startedAt,
		runId
	});
}
function createCronTaskRunId(jobId, startedAt, publicRunId) {
	const discriminator = publicRunId?.trim() || randomUUID();
	return `${createCronExecutionId(jobId, startedAt)}:${discriminator}`;
}
function findLatestCronTaskRunForRecovery(jobId, startedAt, storeKey) {
	const executionRunId = createCronExecutionId(jobId, startedAt);
	const prefix = `${executionRunId}:`;
	return listTaskRecordsUnsorted().filter((task) => {
		if (task.runtime !== "cron" || task.sourceId !== jobId) return false;
		const taskStoreKey = cronTaskRecordStoreKey(task);
		if (taskStoreKey === void 0) return task.runId === executionRunId;
		return taskStoreKey === storeKey && (task.runId === executionRunId || task.runId?.startsWith(prefix) || task.startedAt === startedAt);
	}).toSorted((left, right) => Number(left.endedAt !== void 0) - Number(right.endedAt !== void 0) || resolveCronTaskRecordTimestamp(right) - resolveCronTaskRecordTimestamp(left) || right.createdAt - left.createdAt || right.taskId.localeCompare(left.taskId))[0];
}
/** Finds the unique task identity owned by one persisted cron reservation. */
function tryFindCronTaskRunIdForRecovery(state, jobId, startedAt) {
	try {
		return findLatestCronTaskRunForRecovery(jobId, startedAt, cronStoreKey(state.deps.storePath))?.runId;
	} catch (error) {
		state.deps.log.warn({
			jobId,
			error
		}, "cron: failed to read task ledger recovery record");
		return;
	}
}
/** Finds a completed canonical cron row for startup crash recovery. */
function tryFindFinalizedCronTaskRun(state, jobId, startedAt) {
	try {
		const task = findLatestCronTaskRunForRecovery(jobId, startedAt, cronStoreKey(state.deps.storePath));
		if (task?.runtime !== "cron" || task.sourceId !== jobId || task.endedAt === void 0) return;
		const entry = cronTaskRecordToRunLogEntry(task);
		if (!entry?.status) return;
		const triggerEval = cronTaskRecordToTriggerEval(task);
		const scriptResult = cronTaskRecordToScriptRunResult(task);
		return {
			entry: {
				...entry,
				status: entry.status
			},
			...scriptResult ? { scriptResult } : {},
			...triggerEval ? { triggerEval } : {}
		};
	} catch (error) {
		state.deps.log.warn({
			jobId,
			error
		}, "cron: failed to read finalized task ledger record");
		return;
	}
}
function tryCreateCronTaskRunRecord(params) {
	try {
		const explicitJobAgentId = params.job?.agentId?.trim();
		const childSessionKey = params.childSessionKey ?? (params.job ? resolveCronTaskChildSessionKey({
			state: params.state,
			job: params.job,
			startedAt: params.startedAt
		}) : void 0);
		const effectiveJobAgentId = params.job ? resolveCronJobEffectiveAgentId(params.job, resolveCurrentDefaultAgentId(params.state)) : void 0;
		if (!createRunningTaskRun({
			runtime: "cron",
			taskKind: "automation_run",
			sourceId: params.jobId,
			ownerKey: "",
			scopeKind: "system",
			childSessionKey,
			agentId: effectiveJobAgentId ?? (explicitJobAgentId ? normalizeAgentId(explicitJobAgentId) : void 0) ?? (childSessionKey ? resolveAgentIdFromSessionKey(childSessionKey, resolveCurrentDefaultAgentId(params.state)) : requireCronAgentId(resolveCurrentDefaultAgentId(params.state))),
			runId: params.runId,
			label: params.job?.name,
			task: params.job?.name || params.jobId,
			deliveryStatus: "not_applicable",
			notifyPolicy: "silent",
			startedAt: params.startedAt,
			lastEventAt: params.startedAt,
			progressSummary: "Running automation.",
			detail: { storeKey: cronStoreKey(params.state.deps.storePath) }
		})) {
			params.state.deps.log.warn({ jobId: params.jobId }, "cron: task ledger record was not persisted");
			return;
		}
		return params.runId;
	} catch (error) {
		params.state.deps.log.warn({
			jobId: params.jobId,
			error
		}, "cron: failed to create task ledger record");
		return;
	}
}
/** Finalizes executions that intentionally do not produce a run-history row. */
function tryFinishCronTaskRunWithoutHistory(state, result) {
	if (!result.taskRunId) return;
	const error = result.status === "error" ? normalizeCronRunErrorText(result.error) : void 0;
	try {
		finalizeTaskRunByRunId({
			runId: result.taskRunId,
			runtime: "cron",
			status: result.status === "ok" || result.status === "skipped" ? "succeeded" : isCronTimeoutErrorText(error) ? "timed_out" : "failed",
			endedAt: result.endedAt,
			lastEventAt: result.endedAt,
			error,
			terminalSummary: result.summary,
			childSessionKey: result.childSessionKey ?? result.sessionKey ?? null
		});
	} catch (cause) {
		state.deps.log.warn({
			runId: result.taskRunId,
			jobStatus: result.status,
			error: cause
		}, "cron: failed to update task ledger record");
	}
}
/** Finalizes the authoritative task row, creating one for terminal-only cron events. */
function tryFinishCronTaskRun(state, result) {
	const entry = cronRunLogEntryFromEvent(result.event, state.deps.nowMs(), result.errorClassification);
	const startedAt = entry.runAtMs ?? entry.ts;
	const candidateRunId = result.taskRunId ?? createCronTaskRunId(entry.jobId, startedAt, entry.runId);
	try {
		const taskRunId = findTaskByRunId(candidateRunId)?.runtime === "cron" ? candidateRunId : tryCreateCronTaskRunRecord({
			state,
			job: result.job ?? result.event.job,
			jobId: entry.jobId,
			startedAt,
			runId: candidateRunId,
			childSessionKey: entry.sessionKey
		});
		if (!taskRunId) return;
		const storeKey = cronStoreKey(state.deps.storePath);
		const legacyRecoveryRunId = createCronExecutionId(entry.jobId, startedAt);
		const detail = cronRunLogEntryToTaskDetail(entry, {
			storeKey,
			...result.scriptResult ? { scriptResult: result.scriptResult } : {},
			...result.triggerEval ? { triggerEval: result.triggerEval } : {}
		});
		const finalize = (runId, status = cronRunStatusToTaskStatus(entry)) => finalizeTaskRunByRunId({
			runId,
			runtime: "cron",
			status,
			endedAt: entry.ts,
			lastEventAt: entry.ts,
			error: entry.error,
			clearError: entry.error === void 0,
			terminalSummary: entry.summary ?? null,
			preserveTerminalSummary: true,
			childSessionKey: entry.sessionKey ?? null,
			detail
		});
		let updated = finalize(taskRunId);
		if (updated.length === 0) {
			const existing = findTaskByRunId(taskRunId);
			if (existing?.runtime === "cron" && existing.status === "cancelled") updated = finalize(taskRunId, "cancelled");
			else if (existing?.runtime === "cron" && (existing.status === "lost" || cronTaskRecordStoreKey(existing) === storeKey && cronTaskRecordToRunLogEntry(existing) === null || existing.detail === void 0 && existing.runId === legacyRecoveryRunId)) {
				const recovered = finalizeTaskRunById({
					taskId: existing.taskId,
					status: cronRunStatusToTaskStatus(entry),
					childSessionKey: entry.sessionKey ?? null,
					endedAt: entry.ts,
					lastEventAt: entry.ts,
					error: entry.error,
					terminalSummary: entry.summary ?? null,
					preserveTerminalSummary: true,
					detail
				});
				updated = recovered ? [recovered] : [];
			} else if (existing?.runtime === "cron") updated = finalize(taskRunId);
			else {
				const recreatedRunId = tryCreateCronTaskRunRecord({
					state,
					job: result.job ?? result.event.job,
					jobId: entry.jobId,
					startedAt,
					runId: taskRunId,
					childSessionKey: entry.sessionKey
				});
				if (recreatedRunId) updated = finalize(recreatedRunId);
			}
		}
		if (updated.length === 0) state.deps.log.warn({ runId: taskRunId }, "cron: task ledger record was not finalized");
	} catch (error) {
		state.deps.log.warn({
			runId: candidateRunId,
			jobStatus: entry.status,
			error
		}, "cron: failed to update task ledger record");
	}
}
//#endregion
export { tryFindFinalizedCronTaskRun as a, tryUpdateCronTaskRunSession as c, tryFindCronTaskRunIdForRecovery as i, resolveCronRunErrorReason as l, resolveMainSessionCronRunSessionKey as n, tryFinishCronTaskRun as o, tryCreateCronTaskRun as r, tryFinishCronTaskRunWithoutHistory as s, normalizeCronLaneSegment as t };
