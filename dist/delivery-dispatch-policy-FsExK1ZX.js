import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.js";
import { t as isFastTestRuntimeEnv } from "./test-runtime-env-DQDRzsLt.js";
import "./env-Bnf0Z-yF.js";
import { c as stripLeadingSilentToken, l as stripSilentToken, n as SILENT_REPLY_TOKEN, s as startsWithSilentToken } from "./tokens-CMI0yx54.js";
import { r as shouldAttemptTtsPayload } from "./tts-config-CZ8JKgjp.js";
import { s as sleepWithAbort } from "./src-DKBD8PDy.js";
import { t as retryAsync } from "./retry-Cn-q-rcX.js";
import { p as stringifyRouteThreadId } from "./channel-route-BmrWdIq2.js";
import "./backoff-CCtTkmwj.js";
import { a as normalizeTargetForProvider } from "./target-normalization-CXS-CLIN.js";
import { l as loadDeliveryQueueEntry, s as getDeliveryQueueEntryStatus } from "./delivery-queue-sqlite-C1XlYRGJ.js";
import { s as isProvenDeliveryNotSentError } from "./delivery-recovery.shared-5qX8QsGe.js";
import { a as OUTBOUND_DELIVERY_QUEUE_NAME } from "./delivery-queue-media-staging-BXDYd5bo.js";
import { n as isSuppressedControlReplyText } from "./control-reply-text-BXkKqW89.js";
import { t as cleanupCronRunSessionAfterRun } from "./session-cleanup-D6dxe-Al.js";
import { f as hasScheduledNextRunAtMs } from "./jobs-sHU1uNb7.js";
import { t as createCronExecutionId } from "./run-id-kGde0n7U.js";
//#region src/cron/isolated-agent/delivery-dispatch-policy.ts
const DIRECT_CRON_DELIVERY_COMPLETION_RETENTION = {
	idPrefix: "cron-direct-delivery:v1:",
	maxAgeMs: 1440 * 6e4,
	maxEntries: 2e3
};
/** Deletes or retires ephemeral direct-delivery cron sessions for delete-after-run jobs. */
async function cleanupDirectCronSession(params) {
	await cleanupCronRunSessionAfterRun({
		job: params.job,
		agentSessionKey: params.agentSessionKey,
		sessionId: params.sessionId,
		lifecycleRevision: params.lifecycleRevision,
		sessionUpdatedAt: params.sessionUpdatedAt,
		beforeDelete: params.beforeSessionDelete,
		reason: params.retireReason
	});
}
function normalizeDeliveryTarget(channel, to) {
	const toTrimmed = to.trim();
	return normalizeTargetForProvider(channel, toTrimmed) ?? toTrimmed;
}
function normalizeSilentReplyText(text) {
	if (!text) return {
		text,
		strippedTrailingSilentToken: false
	};
	if (isSuppressedControlReplyText(text)) return {
		text: void 0,
		strippedTrailingSilentToken: false
	};
	let next = text;
	const hasLeadingSilentToken = startsWithSilentToken(next, SILENT_REPLY_TOKEN);
	if (hasLeadingSilentToken) next = stripLeadingSilentToken(next, SILENT_REPLY_TOKEN);
	let strippedTrailingSilentToken = false;
	if (hasLeadingSilentToken || next.toLowerCase().includes("NO_REPLY".toLowerCase())) {
		const trimmedBefore = next.trim();
		const stripped = stripSilentToken(next, SILENT_REPLY_TOKEN);
		strippedTrailingSilentToken = stripped !== trimmedBefore;
		next = stripped;
	}
	if (!next.trim() || isSuppressedControlReplyText(next)) return {
		text: void 0,
		strippedTrailingSilentToken
	};
	return {
		text: next,
		strippedTrailingSilentToken
	};
}
/** Returns whether cron delivery should tolerate per-payload send failures. */
function resolveCronDeliveryBestEffort(job) {
	return job.delivery?.bestEffort === true;
}
/** Successful delivery-target resolution consumed by announce/direct delivery dispatch. */
const PERMANENT_DIRECT_CRON_DELIVERY_ERROR_PATTERNS = [
	/unsupported channel/i,
	/unknown channel/i,
	/chat not found/i,
	/user not found/i,
	/bot.*not.*member/i,
	/bot was blocked by the user/i,
	/forbidden: bot was kicked/i,
	/recipient is not a valid/i,
	/outbound not configured for channel/i
];
const STALE_CRON_DELIVERY_MAX_START_DELAY_MS = 180 * 6e4;
const deliveryLoggerRuntimeLoader = createLazyImportLoader(() => import("./delivery-logger.runtime.js"));
const ttsRuntimeLoader = createLazyImportLoader(() => import("./tts.runtime.js"));
const deliverySubagentRegistryRuntimeLoader = createLazyImportLoader(() => import("./delivery-subagent-registry.runtime.js"));
async function loadDeliveryLoggerRuntime() {
	return await deliveryLoggerRuntimeLoader.load();
}
async function loadTtsRuntime() {
	return await ttsRuntimeLoader.load();
}
async function loadDeliverySubagentRegistryRuntime() {
	return await deliverySubagentRegistryRuntimeLoader.load();
}
async function logCronDeliveryWarn(message) {
	const { logWarn } = await loadDeliveryLoggerRuntime();
	logWarn(message);
}
async function logCronDeliveryError(message) {
	const { logError } = await loadDeliveryLoggerRuntime();
	logError(message);
}
function logCronDeliveryErrorDeferred(message) {
	loadDeliveryLoggerRuntime().then(({ logError }) => {
		logError(message);
	});
}
function resolveCronDeliveryScheduledAtMs(params) {
	const scheduledAt = params.job.state?.nextRunAtMs;
	return hasScheduledNextRunAtMs(scheduledAt) ? scheduledAt : params.runStartedAt;
}
function resolveCronDeliveryStartDelayMs(params) {
	return params.runStartedAt - resolveCronDeliveryScheduledAtMs(params);
}
function isStaleCronDelivery(params) {
	return resolveCronDeliveryStartDelayMs(params) > STALE_CRON_DELIVERY_MAX_START_DELAY_MS;
}
async function maybeApplyTtsToCronPayloads(params) {
	if (!shouldAttemptTtsPayload({
		cfg: params.cfg,
		ttsAuto: params.ttsAuto,
		agentId: params.agentId,
		channelId: params.delivery.channel,
		accountId: params.delivery.accountId
	})) return params.payloads;
	const { maybeApplyTtsToPayload } = await loadTtsRuntime();
	return await Promise.all(params.payloads.map((payload) => maybeApplyTtsToPayload({
		payload,
		cfg: params.cfg,
		channel: params.delivery.channel,
		kind: "final",
		ttsAuto: params.ttsAuto,
		agentId: params.agentId,
		accountId: params.delivery.accountId
	})));
}
function buildDirectCronDeliveryIdempotencyKey(params) {
	const executionId = createCronExecutionId(params.jobId, params.runStartedAt);
	const threadId = params.delivery.threadId == null || params.delivery.threadId === "" ? "" : stringifyRouteThreadId(params.delivery.threadId) ?? "";
	const accountId = params.delivery.accountId?.trim() ?? "";
	const normalizedTo = normalizeDeliveryTarget(params.delivery.channel, params.delivery.to);
	const routeIdentity = [
		params.delivery.channel,
		accountId,
		normalizedTo,
		threadId
	].map(encodeURIComponent).join(":");
	return `${DIRECT_CRON_DELIVERY_COMPLETION_RETENTION.idPrefix}${executionId}:${routeIdentity}`;
}
/** Receipts own recipient delivery; projections never stand in for custody. */
function isCompletedDirectCronDelivery(id) {
	return getDeliveryQueueEntryStatus(OUTBOUND_DELIVERY_QUEUE_NAME, id) === "completed";
}
/** Wait only for an active recipient owner, never for crashed ambiguous sends. */
async function waitForCompletedDirectCronDelivery(params) {
	for (let attempt = 0; attempt < 120; attempt += 1) {
		const status = getDeliveryQueueEntryStatus(OUTBOUND_DELIVERY_QUEUE_NAME, params.id);
		if (status === "completed") return true;
		const owner = status === "pending" ? loadDeliveryQueueEntry(OUTBOUND_DELIVERY_QUEUE_NAME, params.id) : null;
		if (!owner && status === "pending") return isCompletedDirectCronDelivery(params.id);
		if (!owner || (owner.recoveryState === "send_attempt_started" ? typeof owner.platformSendStartedAt !== "number" || owner.platformSendStartedAt <= Date.now() - 3e4 : owner.recoveryState !== "producer_claimed" || typeof owner.availableAt !== "number" || owner.availableAt <= Date.now())) return false;
		if (attempt < 119) await sleepWithAbort(250, params.signal);
	}
	return false;
}
function summarizeDirectCronDeliveryError(error) {
	if (error instanceof Error) return error.message || "error";
	if (typeof error === "string") return error;
	try {
		return JSON.stringify(error) || String(error);
	} catch {
		return String(error);
	}
}
function isTransientDirectCronDeliveryError(error) {
	const message = summarizeDirectCronDeliveryError(error);
	if (!message) return false;
	if (PERMANENT_DIRECT_CRON_DELIVERY_ERROR_PATTERNS.some((re) => re.test(message))) return false;
	return isProvenDeliveryNotSentError(error);
}
function resolveDirectCronRetryDelaysMs() {
	return isFastTestRuntimeEnv() ? [
		0,
		0,
		0
	] : [
		5e3,
		1e4,
		2e4
	];
}
async function retryTransientDirectCronDelivery(params) {
	const retryDelaysMs = resolveDirectCronRetryDelaysMs();
	const assertActive = () => {
		if (params.signal?.aborted) throw new Error("cron delivery aborted");
		if (params.deadlineAtMs !== void 0 && Date.now() >= params.deadlineAtMs) {
			const error = /* @__PURE__ */ new Error("cron delivery deadline exceeded");
			error.name = "TimeoutError";
			throw error;
		}
	};
	assertActive();
	const runWithAbortCheck = async () => {
		assertActive();
		return await params.run();
	};
	return await retryAsync(runWithAbortCheck, {
		attempts: retryDelaysMs.length + 1,
		minDelayMs: 0,
		maxDelayMs: Math.max(...retryDelaysMs),
		delayMs: ({ attempt }) => retryDelaysMs[attempt - 1] ?? 0,
		shouldRetry: (err) => params.signal?.aborted !== true && (params.deadlineAtMs === void 0 || Date.now() < params.deadlineAtMs) && isTransientDirectCronDeliveryError(err) && (params.shouldRetryError?.(err) ?? true),
		onRetry: async ({ attempt, maxAttempts, delayMs, err }) => {
			await logCronDeliveryWarn(`[cron:${params.jobId}] transient ${params.label ?? "direct announce"} delivery failure, retrying ${attempt + 1}/${maxAttempts} in ${Math.round(delayMs / 1e3)}s: ${summarizeDirectCronDeliveryError(err)}`);
			if (delayMs === 0) await sleepWithAbort(0, params.signal);
		},
		sleep: async (delayMs) => {
			const remainingMs = params.deadlineAtMs === void 0 ? delayMs : Math.max(0, params.deadlineAtMs - Date.now());
			await sleepWithAbort(Math.min(delayMs, remainingMs), params.signal);
			assertActive();
		}
	});
}
//#endregion
export { waitForCompletedDirectCronDelivery as _, isStaleCronDelivery as a, logCronDeliveryErrorDeferred as c, normalizeDeliveryTarget as d, normalizeSilentReplyText as f, retryTransientDirectCronDelivery as g, resolveCronDeliveryStartDelayMs as h, isCompletedDirectCronDelivery as i, logCronDeliveryWarn as l, resolveCronDeliveryScheduledAtMs as m, buildDirectCronDeliveryIdempotencyKey as n, loadDeliverySubagentRegistryRuntime as o, resolveCronDeliveryBestEffort as p, cleanupDirectCronSession as r, logCronDeliveryError as s, DIRECT_CRON_DELIVERY_COMPLETION_RETENTION as t, maybeApplyTtsToCronPayloads as u };
