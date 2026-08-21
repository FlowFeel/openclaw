import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { t as parseDurationMs } from "./parse-duration-Be19e01j.js";
import { randomUUID } from "node:crypto";
//#region src/cron/stream-schedule.ts
const DEFAULT_CRON_STREAM_BATCH_MS = 250;
const MIN_CRON_STREAM_BATCH_MS = 50;
const MAX_CRON_STREAM_BATCH_MS = 5e3;
const DEFAULT_CRON_STREAM_MAX_BATCH_BYTES = 16384;
const MIN_CRON_STREAM_MAX_BATCH_BYTES = 1024;
const MAX_CRON_STREAM_MAX_BATCH_BYTES = 65536;
const CRON_STREAM_TRUNCATED_MARKER = "[truncated]";
/** Opaque identity for one logical stream source across child-process restarts. */
function createCronStreamSourceIdentity() {
	return randomUUID();
}
function clampInteger(value, fallback, min, max) {
	if (value === void 0) return fallback;
	if (typeof value !== "number" || !Number.isSafeInteger(value)) throw new Error("stream schedule batching values must be integers");
	return Math.max(min, Math.min(max, value));
}
/** Resolve stream batching defaults without rewriting omitted public fields. */
function resolveCronStreamBatching(schedule) {
	return {
		batchMs: clampInteger(schedule.batchMs, DEFAULT_CRON_STREAM_BATCH_MS, MIN_CRON_STREAM_BATCH_MS, MAX_CRON_STREAM_BATCH_MS),
		maxBatchBytes: clampInteger(schedule.maxBatchBytes, DEFAULT_CRON_STREAM_MAX_BATCH_BYTES, MIN_CRON_STREAM_MAX_BATCH_BYTES, MAX_CRON_STREAM_MAX_BATCH_BYTES)
	};
}
/** Stable key for the source definition, with omitted defaults resolved. */
function cronStreamScheduleKey(schedule) {
	const batching = resolveCronStreamBatching(schedule);
	return JSON.stringify({
		command: schedule.command,
		cwd: schedule.cwd,
		mode: schedule.mode ?? "line",
		match: schedule.match,
		batchMs: batching.batchMs,
		maxBatchBytes: batching.maxBatchBytes
	});
}
/** Clamp explicitly supplied stream batching fields during create/update normalization. */
function normalizeCronStreamBatching(schedule) {
	if (schedule.batchMs !== void 0) {
		if (typeof schedule.batchMs !== "number" || !Number.isSafeInteger(schedule.batchMs)) throw new Error("stream schedule batchMs must be an integer");
		schedule.batchMs = clampInteger(schedule.batchMs, DEFAULT_CRON_STREAM_BATCH_MS, MIN_CRON_STREAM_BATCH_MS, MAX_CRON_STREAM_BATCH_MS);
	}
	if (schedule.maxBatchBytes !== void 0) {
		if (typeof schedule.maxBatchBytes !== "number" || !Number.isSafeInteger(schedule.maxBatchBytes)) throw new Error("stream schedule maxBatchBytes must be an integer");
		schedule.maxBatchBytes = clampInteger(schedule.maxBatchBytes, DEFAULT_CRON_STREAM_MAX_BATCH_BYTES, MIN_CRON_STREAM_MAX_BATCH_BYTES, MAX_CRON_STREAM_MAX_BATCH_BYTES);
	}
}
function renderTruncatedCronStreamBatch(text, maxBytes) {
	const markerBytes = Buffer.byteLength(CRON_STREAM_TRUNCATED_MARKER, "utf8");
	const contentBudget = Math.max(0, maxBytes - markerBytes);
	let low = 0;
	let high = text.length;
	while (low < high) {
		const mid = Math.ceil((low + high) / 2);
		const candidate = truncateUtf16Safe(text, mid);
		if (Buffer.byteLength(candidate, "utf8") <= contentBudget) low = mid;
		else high = mid - 1;
	}
	return `${truncateUtf16Safe(text, low)}${CRON_STREAM_TRUNCATED_MARKER}`;
}
/** Render known-truncated source text without exposing the marker to match filters. */
function markCronStreamBatchTruncated(text, maxBytes) {
	return renderTruncatedCronStreamBatch(text, maxBytes);
}
/** Keep a UTF-8 batch inside its byte budget and reserve room for the marker. */
function truncateCronStreamBatch(text, maxBytes) {
	return Buffer.byteLength(text, "utf8") <= maxBytes ? text : renderTruncatedCronStreamBatch(text, maxBytes);
}
/** Append event text through the same payload seam used by trigger messages. */
function appendCronPayloadText(payload, text) {
	if (payload.kind === "systemEvent") return {
		...payload,
		text: `${payload.text}\n\n${text}`
	};
	if (payload.kind === "agentTurn") return {
		...payload,
		message: `${payload.message}\n\n${text}`
	};
	return payload;
}
//#endregion
//#region src/cron/pacing.ts
function parsePositivePacingDuration(value, field) {
	let durationMs;
	try {
		durationMs = parseDurationMs(value);
	} catch {
		throw new Error(`cron pacing ${field} must be a positive duration`);
	}
	if (durationMs <= 0) throw new Error(`cron pacing ${field} must be a positive duration`);
	return durationMs;
}
/** Validates pacing strings and returns their millisecond bounds. */
function parseCronPacingBounds(pacing) {
	if (pacing.min === void 0 && pacing.max === void 0) throw new Error("cron pacing requires at least one of min or max");
	const minMs = pacing.min === void 0 ? void 0 : parsePositivePacingDuration(pacing.min, "min");
	const maxMs = pacing.max === void 0 ? void 0 : parsePositivePacingDuration(pacing.max, "max");
	if (minMs !== void 0 && maxMs !== void 0 && minMs > maxMs) throw new Error("cron pacing min must not exceed max");
	return {
		minMs,
		maxMs
	};
}
/** Clamps one successful run's proposal against its job-local pacing bounds. */
function resolvePacedNextRunAtMs(params) {
	const { minMs, maxMs } = parseCronPacingBounds(params.pacing);
	const proposedAtMs = params.nowMs + params.delayMs;
	return Math.min(params.nowMs + (maxMs ?? Number.POSITIVE_INFINITY), Math.max(params.nowMs + (minMs ?? 0), proposedAtMs));
}
//#endregion
export { cronStreamScheduleKey as a, resolveCronStreamBatching as c, createCronStreamSourceIdentity as i, truncateCronStreamBatch as l, resolvePacedNextRunAtMs as n, markCronStreamBatchTruncated as o, appendCronPayloadText as r, normalizeCronStreamBatching as s, parseCronPacingBounds as t };
