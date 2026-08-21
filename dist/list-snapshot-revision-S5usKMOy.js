import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import "./src-COWbwBfI.js";
import { t as stableStringify } from "./stable-stringify-DoZ6Yalc.js";
import { v as uniqueValues } from "./string-normalization-CRyoFBPt.js";
import { $ as cronTaskRecordToRunLogEntry, Q as cronTaskRecordStoreKey } from "./openclaw-state-db-D9eH245j.js";
import { t as normalizeAnyChannelId } from "./registry-normalize-0Yw0pQqw.js";
import { n as sha256Base64Url } from "./crypto-digest-CmUwt1S-.js";
import { s as listTaskRegistryRecordsByRuntimeSourceIdFromSqlite } from "./task-registry.store.sqlite-Cr1yxp4f.js";
import { r as stripTargetProviderPrefix, t as resolveTargetPrefixedChannel } from "./channel-target-prefix-VFVVF5j7.js";
//#region src/cron/service/failure-alerts.ts
/** Resolves and emits cron failure-alert notifications. */
const DEFAULT_FAILURE_ALERT_AFTER = 2;
const DEFAULT_FAILURE_ALERT_COOLDOWN_MS = 60 * 6e4;
/** Returns the last failure-notification delivery trace persisted on a cron job. */
function failureNotificationDeliveryFromJobState(job) {
	const status = job.state.lastFailureNotificationDeliveryStatus;
	if (!status || status === "not-requested") return;
	return {
		delivered: job.state.lastFailureNotificationDelivered,
		status,
		error: job.state.lastFailureNotificationDeliveryError
	};
}
function normalizeCronMessageChannel(input) {
	const channel = normalizeOptionalLowercaseString(input);
	return channel ? channel : void 0;
}
function resolveFailureAlertChannel(channel, to) {
	const normalized = normalizeCronMessageChannel(channel);
	if (normalized && normalized !== "last") return normalizeAnyChannelId(normalized) ?? normalized;
	return normalizeCronMessageChannel(resolveTargetPrefixedChannel(to)) ?? normalized;
}
function normalizeFailureAlertRecipient(channel, to) {
	if (resolveTargetPrefixedChannel(to) !== channel) return to;
	return stripTargetProviderPrefix(to, to.slice(0, to.indexOf(":")));
}
function normalizeTo(input) {
	if (typeof input !== "string") return;
	const to = input.trim();
	return to ? to : void 0;
}
function clampPositiveInt(value, fallback) {
	if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
	const floored = Math.floor(value);
	return floored >= 1 ? floored : fallback;
}
function clampNonNegativeInt(value, fallback) {
	if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
	const floored = Math.floor(value);
	return floored >= 0 ? floored : fallback;
}
/** Resolves effective failure-alert policy from job config, delivery defaults, and global cron config. */
function resolveFailureAlert(state, job) {
	const globalConfig = state.deps.cronConfig?.failureAlert;
	const jobConfig = job.failureAlert === false ? void 0 : job.failureAlert;
	if (job.failureAlert === false) return null;
	if (!jobConfig && globalConfig?.enabled !== true) return null;
	const mode = jobConfig?.mode ?? globalConfig?.mode;
	const inheritsGlobalMode = !jobConfig?.mode || jobConfig.mode === (globalConfig?.mode ?? "announce");
	const jobTo = normalizeTo(jobConfig?.to);
	const jobChannel = resolveFailureAlertChannel(jobConfig?.channel, jobTo);
	const configuredGlobalTo = inheritsGlobalMode ? normalizeTo(globalConfig?.to) : void 0;
	const globalChannel = inheritsGlobalMode ? resolveFailureAlertChannel(globalConfig?.channel, configuredGlobalTo) : void 0;
	const inheritsGlobalRoute = inheritsGlobalMode && (mode === "webhook" || !jobChannel || jobChannel === globalChannel);
	const globalTo = inheritsGlobalRoute ? configuredGlobalTo : void 0;
	const deliveryTo = normalizeTo(job.delivery?.to);
	const deliveryChannel = resolveFailureAlertChannel(job.delivery?.channel, deliveryTo);
	const channel = jobChannel ?? globalChannel ?? deliveryChannel ?? "last";
	const inheritsDeliveryChannel = channel === deliveryChannel || channel === "last" && !deliveryChannel;
	const compatibleDeliveryTo = inheritsDeliveryChannel ? deliveryTo : void 0;
	const explicitTo = jobTo ?? globalTo;
	const inheritsDeliveryRoute = inheritsDeliveryChannel && (explicitTo === void 0 || explicitTo === deliveryTo || deliveryTo !== void 0 && normalizeFailureAlertRecipient(channel, explicitTo) === normalizeFailureAlertRecipient(channel, deliveryTo));
	const inheritedDeliveryAccountId = mode !== "webhook" && inheritsDeliveryRoute ? job.delivery?.accountId : void 0;
	const accountId = jobConfig?.accountId ?? (inheritsGlobalRoute ? globalConfig?.accountId : void 0) ?? inheritedDeliveryAccountId;
	const inheritsDeliveryThread = mode !== "webhook" && inheritsDeliveryRoute && accountId === job.delivery?.accountId;
	return {
		after: clampPositiveInt(jobConfig?.after ?? globalConfig?.after, DEFAULT_FAILURE_ALERT_AFTER),
		cooldownMs: clampNonNegativeInt(jobConfig?.cooldownMs ?? globalConfig?.cooldownMs, DEFAULT_FAILURE_ALERT_COOLDOWN_MS),
		channel,
		to: mode === "webhook" ? explicitTo : explicitTo ?? compatibleDeliveryTo,
		mode,
		accountId,
		threadId: inheritsDeliveryThread ? job.delivery?.threadId : void 0,
		includeSkipped: jobConfig?.includeSkipped ?? globalConfig?.includeSkipped ?? false
	};
}
function emitFailureAlert(state, params) {
	const safeJobName = params.job.name || params.job.id;
	const truncatedError = truncateUtf16Safe(params.error?.trim() || "unknown reason", 200);
	const errorReason = params.status === "error" ? params.errorReason : void 0;
	const statusVerb = params.status === "skipped" ? "skipped" : "failed";
	const detailLabel = params.status === "skipped" ? "Skip reason" : "Last error";
	const text = [
		`Automation "${safeJobName}" ${statusVerb} ${params.consecutiveErrors} times`,
		...errorReason ? [`Cause: ${errorReason}`] : [],
		`${detailLabel}: ${truncatedError}`
	].join("\n");
	if (state.deps.sendCronFailureAlert) {
		state.deps.sendCronFailureAlert({
			job: params.job,
			text,
			runAtMs: params.runAtMs,
			channel: params.channel,
			to: params.to,
			mode: params.mode,
			accountId: params.accountId,
			threadId: params.threadId
		}).catch((err) => {
			state.deps.log.warn({
				jobId: params.job.id,
				err: String(err)
			}, "cron: failure alert delivery failed");
		});
		return;
	}
	state.deps.enqueueSystemEvent(text, { agentId: params.job.agentId });
	if (params.job.wakeMode === "now") state.deps.requestHeartbeat({
		source: "cron",
		intent: "immediate",
		reason: `cron:${params.job.id}:failure-alert`
	});
}
/** Emits a failure alert when threshold, best-effort, and cooldown policy allow it. */
function maybeEmitFailureAlert(state, params) {
	const alertConfig = params.alertConfig;
	if (!alertConfig || params.consecutiveCount < alertConfig.after) return;
	if (params.status === "error" && !params.job.failureAlert && params.job.delivery?.failureDestination) return;
	if (params.job.delivery?.bestEffort === true && !params.job.failureAlert) return;
	const now = params.occurredAtMs ?? state.deps.nowMs();
	const lastAlert = params.job.state.lastFailureAlertAtMs;
	if (typeof lastAlert === "number" && now - lastAlert < Math.max(0, alertConfig.cooldownMs)) return;
	params.job.state.lastFailureAlertAtMs = now;
	if (params.delivery === "record-only") return;
	const job = structuredClone(params.job);
	const notify = () => emitFailureAlert(state, {
		job,
		error: params.error,
		errorReason: params.errorReason,
		runAtMs: params.runAtMs,
		consecutiveErrors: params.consecutiveCount,
		channel: alertConfig.channel,
		to: alertConfig.to,
		mode: alertConfig.mode,
		accountId: alertConfig.accountId,
		threadId: alertConfig.threadId,
		status: params.status
	});
	if (params.deferredNotifications) params.deferredNotifications.push(notify);
	else notify();
}
//#endregion
//#region src/cron/task-run-history.ts
/** Cron run-history reads backed by authoritative task-ledger rows. */
const INVALID_CRON_TASK_RUN_JOB_ID_MESSAGE = "invalid cron task run job id";
function normalizeCronTaskRunJobId(jobId) {
	const trimmed = jobId.trim();
	if (!trimmed || trimmed.includes("/") || trimmed.includes("\\") || trimmed.includes("\0")) throw new Error(INVALID_CRON_TASK_RUN_JOB_ID_MESSAGE);
	return trimmed;
}
function isInvalidCronTaskRunJobIdError(error) {
	return error instanceof Error && error.message === INVALID_CRON_TASK_RUN_JOB_ID_MESSAGE;
}
function normalizeStatuses(options) {
	if (options.statuses?.length) {
		const statuses = options.statuses.filter(isCronRunStatus);
		if (statuses.length > 0) return uniqueValues(statuses);
	}
	return isCronRunStatus(options.status) ? [options.status] : null;
}
function isCronRunStatus(value) {
	return value === "ok" || value === "error" || value === "skipped";
}
function isCronDeliveryStatus(value) {
	return value === "delivered" || value === "not-delivered" || value === "unknown" || value === "not-requested";
}
function normalizeDeliveryStatuses(options) {
	if (options.deliveryStatuses?.length) {
		const statuses = options.deliveryStatuses.filter(isCronDeliveryStatus);
		if (statuses.length > 0) return uniqueValues(statuses);
	}
	return isCronDeliveryStatus(options.deliveryStatus) ? [options.deliveryStatus] : null;
}
function queryText(entry, jobNameById) {
	return [
		entry.summary ?? "",
		entry.error ?? "",
		entry.errorReason ?? "",
		entry.diagnostics?.summary ?? "",
		...(entry.diagnostics?.entries ?? []).map((diagnostic) => diagnostic.message),
		entry.jobId,
		jobNameById?.[entry.jobId] ?? "",
		entry.delivery?.intended?.channel ?? "",
		entry.delivery?.resolved?.channel ?? "",
		...(entry.delivery?.messageToolSentTo ?? []).map((target) => target.channel)
	].join(" ");
}
function compareHistoryRows(left, right, direction) {
	const multiplier = direction === "asc" ? 1 : -1;
	return multiplier * (left.entry.ts - right.entry.ts) || multiplier * (left.task.createdAt - right.task.createdAt) || multiplier * left.task.taskId.localeCompare(right.task.taskId);
}
function attachJobNames(entries, jobNameById) {
	for (const entry of entries) {
		const jobName = jobNameById?.[entry.jobId];
		if (jobName) entry.jobName = jobName;
	}
}
/** Reads and filters cron task rows with the legacy run-history paging contract. */
function readCronTaskRunHistoryPage(options) {
	const jobId = options.jobId ? normalizeCronTaskRunJobId(options.jobId) : void 0;
	const limit = Math.max(1, Math.min(200, Math.floor(options.limit ?? 50)));
	const offset = Math.max(0, Math.floor(options.offset ?? 0));
	const statuses = normalizeStatuses(options);
	const deliveryStatuses = normalizeDeliveryStatuses(options);
	const runId = normalizeOptionalString(options.runId);
	const jobIds = options.jobIds ? new Set(options.jobIds) : void 0;
	const query = normalizeLowercaseStringOrEmpty(options.query);
	const sortDir = options.sortDir === "asc" ? "asc" : "desc";
	const rows = listTaskRegistryRecordsByRuntimeSourceIdFromSqlite({
		runtime: "cron",
		sourceId: jobId
	}).filter((task) => cronTaskRecordStoreKey(task) === options.storeKey).map((task) => ({
		task,
		entry: cronTaskRecordToRunLogEntry(task)
	})).filter((row) => row.entry !== null).filter(({ entry }) => {
		if (jobIds && !jobIds.has(entry.jobId)) return false;
		if (runId && entry.runId !== runId) return false;
		if (statuses && (!entry.status || !statuses.includes(entry.status))) return false;
		if (deliveryStatuses && !deliveryStatuses.includes(entry.deliveryStatus ?? "not-requested")) return false;
		return !query || normalizeLowercaseStringOrEmpty(queryText(entry, options.jobNameById)).includes(query);
	}).toSorted((left, right) => compareHistoryRows(left, right, sortDir));
	const total = rows.length;
	const boundedOffset = Math.min(total, offset);
	const entries = rows.slice(boundedOffset, boundedOffset + limit).map(({ entry }) => entry);
	attachJobNames(entries, options.jobNameById);
	const nextOffset = boundedOffset + entries.length;
	return {
		entries,
		total,
		offset: boundedOffset,
		limit,
		hasMore: nextOffset < total,
		nextOffset: nextOffset < total ? nextOffset : null
	};
}
//#endregion
//#region src/cron/list-snapshot-revision.ts
function resolveCronListSnapshotRevision(jobs) {
	return `sha256:${sha256Base64Url(stableStringify(jobs))}`;
}
//#endregion
export { failureNotificationDeliveryFromJobState as a, readCronTaskRunHistoryPage as i, isInvalidCronTaskRunJobIdError as n, maybeEmitFailureAlert as o, normalizeCronTaskRunJobId as r, resolveFailureAlert as s, resolveCronListSnapshotRevision as t };
