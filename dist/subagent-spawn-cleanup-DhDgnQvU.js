import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { t as isFastTestRuntimeEnv } from "./test-runtime-env-DQDRzsLt.js";
import "./env-Bnf0Z-yF.js";
import { s as asFiniteNumber } from "./number-coercion-Crk_c9KW.js";
import { n as safeParseJson } from "./src-COWbwBfI.js";
import { i as asOptionalRecord } from "./record-coerce-DHZ4bFlT.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { n as readTrimmedStringAlias } from "./string-readers-D5JFJAtV.js";
import { E as isAnnounceSkip, k as selectDeliverableSessionsReply } from "./openclaw-state-db-BU55lNCH.js";
import { o as isSilentReplyText } from "./tokens-CMI0yx54.js";
import "./agent-scope-DyEposw2.js";
import "./config-UtpOr1Uw.js";
import { c as callGateway } from "./call-YSl9HPoR.js";
import { s as resolveLeastPrivilegeOperatorScopesForMethod } from "./method-scopes-ChuOr7sh.js";
import "./operator-scopes-Dw7Gu2cA.js";
import { s as resolveContextEngine } from "./registry-DxqpqZwd.js";
import { t as getGlobalHookRunner } from "./hook-runner-global-CRNklGqK.js";
import "./delivery-context.shared-B-QSuGw_.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { st as loadSqliteSessionEntry } from "./session-accessor.sqlite-B9iW7DOt.js";
import "./session-accessor-t3qUoTeV.js";
import { n as loadPreparedModelCatalog } from "./prepared-model-catalog-CdxSfQZ8.js";
import { t as formatDurationCompact } from "./format-duration-DKk9BtRb.js";
import "./runtime-status-BsZayE7D.js";
import { a as buildAgentRunTerminalOutcomeFromWaitResult } from "./agent-run-terminal-outcome-9kJP3Yn1.js";
import "./session-binding-service-DW9rA35s.js";
import "./runs-Bw__iUSb.js";
import "./sessions-CBo4LOdS.js";
import "./lifecycle-CeMojaXs.js";
import { c as readSessionMessagesAsync } from "./session-transcript-readers-O3pZVV3x.js";
import { T as compareSubagentRunGeneration } from "./subagent-registry-state-D0eZgp5g.js";
import { y as resolveSubagentRunTimerDelayMs } from "./subagent-run-liveness-CjxLH_UA.js";
import "./session-utils-C8yYh4dv.js";
import { t as ensureContextEnginesInitialized } from "./init-C6QlmRxy.js";
import { r as dispatchGatewayMethodInProcess, u as hasInProcessGatewayContext } from "./server-plugins-B7M_VHf6.js";
import { n as wrapPromptDataBlock } from "./sanitize-for-prompt-Drdy09dw.js";
import { n as sanitizeTextContent, t as extractAssistantText } from "./chat-history-text-C4F8vx3h.js";
import { n as forkSessionEntryFromParent } from "./session-fork-BU0em0SK.js";
import "./lanes-CI0_P-yC.js";
import "./sessions-helpers-DfU6Cl-T.js";
import { promises } from "node:fs";
//#region src/agents/subagent-session-cleanup.ts
/**
* Cleanup helper for subagent sessions. It deletes child session state through
* the gateway and preserves lifecycle-hook behavior for session-mode spawns.
*/
function isSessionLifecycleChangedGatewayError$1(error) {
	if (!(error instanceof Error) || error.name !== "GatewayClientRequestError") return false;
	const requestError = error;
	const details = requestError.details;
	return requestError.gatewayCode === "INVALID_REQUEST" && typeof details === "object" && details !== null && details.reason === "session-changed";
}
/** Deletes a child subagent session and optionally emits session-mode lifecycle hooks. */
async function deleteSubagentSessionForCleanup(params) {
	if (!params.expectedSessionId || !params.expectedLifecycleRevision) return "failed";
	try {
		await params.callGateway({
			method: "sessions.delete",
			params: {
				key: params.childSessionKey,
				deleteTranscript: true,
				emitLifecycleHooks: params.spawnMode === "session",
				...params.expectedSessionId ? { expectedSessionId: params.expectedSessionId } : {},
				...params.expectedLifecycleRevision ? { expectedLifecycleRevision: params.expectedLifecycleRevision } : {}
			},
			timeoutMs: 1e4
		});
		return "deleted";
	} catch (error) {
		if (isSessionLifecycleChangedGatewayError$1(error)) return "changed";
		params.onError?.(error);
		return "failed";
	}
}
//#endregion
//#region src/agents/subagent-announce-capture.ts
/**
* Helpers for capturing the latest subagent completion reply after a run ends.
*
* Completion output can lag behind lifecycle state, so callers can retry briefly
* before sending an empty or stale announcement.
*/
/** Reads subagent output repeatedly until non-empty text appears or the bounded wait expires. */
async function readLatestSubagentOutputWithRetryUsing(params) {
	const maxWaitMs = Math.max(0, Math.min(params.maxWaitMs, 15e3));
	if (!(maxWaitMs > 0)) return;
	const deadlineAt = performance.now() + maxWaitMs;
	for (;;) {
		const result = await params.readSubagentOutput(params.sessionKey, params.outcome);
		if (result?.trim()) return result;
		const remainingMs = deadlineAt - performance.now();
		if (remainingMs <= 0) return result;
		const sleepMs = Math.min(params.retryIntervalMs, remainingMs);
		await new Promise((resolve) => {
			setTimeout(resolve, sleepMs);
		});
	}
}
/** Captures immediate output first, then optionally waits for a delayed completion reply. */
async function captureSubagentCompletionReplyUsing(params) {
	const immediate = await params.readSubagentOutput(params.sessionKey);
	if (immediate?.trim()) return immediate;
	if (params.waitForReply === false) return;
	return await readLatestSubagentOutputWithRetryUsing({
		sessionKey: params.sessionKey,
		maxWaitMs: params.maxWaitMs,
		retryIntervalMs: params.retryIntervalMs,
		readSubagentOutput: params.readSubagentOutput
	});
}
//#endregion
//#region src/agents/subagent-announce.runtime.ts
function readSessionEntry(storePath, sessionKey) {
	return loadSqliteSessionEntry({
		storePath,
		sessionKey
	});
}
//#endregion
//#region src/infra/attribution-telemetry/attribution-ring.ts
var AttributionRingBuffer = class {
	constructor(capacity = 1e3) {
		this.head = 0;
		this.count = 0;
		this.capacity = Math.max(10, capacity);
		this.buffer = new Array(this.capacity).fill(null);
	}
	/**
	* O(1) Append turn record into the ring buffer.
	*/
	recordTurn(record) {
		this.buffer[this.head] = record;
		this.head = (this.head + 1) % this.capacity;
		if (this.count < this.capacity) this.count++;
	}
	/**
	* Returns records in chronological order matching optional filter criteria.
	*/
	querySlice(options) {
		if (this.count === 0) return {
			records: [],
			totalSampled: 0
		};
		const minTimestamp = Date.now() - (options?.windowMinutes ?? 60) * 60 * 1e3;
		const limit = options?.limit ?? this.capacity;
		const results = [];
		const startIndex = (this.head - this.count + this.capacity) % this.capacity;
		for (let i = 0; i < this.count; i++) {
			const idx = (startIndex + i) % this.capacity;
			const record = this.buffer[idx];
			if (!record) continue;
			if (record.timestamp < minTimestamp) continue;
			if (options?.sessionKey && record.sessionKey !== options.sessionKey) continue;
			results.push(record);
			if (results.length >= limit) break;
		}
		return {
			records: results,
			totalSampled: this.count
		};
	}
	/**
	* Calculates Mean Queue Dwell (ms).
	*/
	getMeanQueueDwellMs() {
		if (this.count === 0) return 0;
		let totalDwell = 0;
		let validCount = 0;
		for (const r of this.buffer) if (r) {
			totalDwell += r.queueDwellMs;
			validCount++;
		}
		return validCount > 0 ? Math.round(totalDwell / validCount) : 0;
	}
	/**
	* Discretizes the historical window into 1-minute time-series buckets.
	*/
	getConcurrencyTimeSeries(options) {
		const windowMinutes = typeof options === "number" ? options : options?.windowMinutes ?? 15;
		const { records } = this.querySlice({ windowMinutes });
		if (records.length === 0) return [];
		const bucketMs = 60 * 1e3;
		const buckets = /* @__PURE__ */ new Map();
		for (const r of records) {
			const bucketKey = Math.floor(r.timestamp / bucketMs) * bucketMs;
			const b = buckets.get(bucketKey) ?? {
				sessionKeys: /* @__PURE__ */ new Set(),
				dwells: [],
				count: 0
			};
			b.sessionKeys.add(r.sessionKey);
			b.dwells.push(r.queueDwellMs);
			b.count++;
			buckets.set(bucketKey, b);
		}
		return Array.from(buckets.entries()).sort(([a], [b]) => a - b).map(([timestamp, data]) => ({
			timestamp,
			activeSessions: data.sessionKeys.size,
			inFlightTurns: data.count,
			meanQueueDwellMs: data.dwells.length > 0 ? Math.round(data.dwells.reduce((a, b) => a + b, 0) / data.dwells.length) : 0
		}));
	}
	/**
	* Aggregates turn latency and token throughput per session.
	*/
	getSessionPerformanceBreakdown(windowMinutes = 60) {
		const { records } = this.querySlice({ windowMinutes });
		if (records.length === 0) return [];
		const sessions = /* @__PURE__ */ new Map();
		for (const r of records) {
			const list = sessions.get(r.sessionKey) ?? [];
			list.push(r);
			sessions.set(r.sessionKey, list);
		}
		return Array.from(sessions.entries()).map(([sessionKey, items]) => {
			const latencies = items.map((r) => r.wallClockMs).sort((a, b) => a - b);
			const meanLatencyMs = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
			const p95LatencyMs = latencies[Math.min(latencies.length - 1, Math.floor(latencies.length * .95))] ?? 0;
			const cacheHits = items.filter((r) => r.cacheHit).length;
			const compactionEvents = items.filter((r) => r.compactionFired).length;
			const totalTokens = items.reduce((acc, r) => acc + r.totalTokens, 0);
			const promptTokens = items.reduce((acc, r) => acc + r.promptTokens, 0);
			const completionTokens = items.reduce((acc, r) => acc + r.completionTokens, 0);
			return {
				sessionKey,
				turnCount: items.length,
				meanLatencyMs,
				p95LatencyMs,
				cacheHitRatio: Math.round(cacheHits / items.length * 100) / 100,
				totalTokens,
				promptTokens,
				completionTokens,
				compactionEvents
			};
		}).sort((a, b) => b.turnCount - a.turnCount);
	}
	/**
	* Calculates Fleet Concurrency Snapshot.
	*/
	getConcurrencySnapshot() {
		const { records } = this.querySlice({ windowMinutes: 15 });
		const timeSeries = this.getConcurrencyTimeSeries(15);
		if (records.length === 0) return {
			activeSessions: 0,
			meanQueueDwellMs: 0,
			p95QueueDwellMs: 0,
			contentionDragIndex: 1,
			timeSeries
		};
		const sessionKeys = new Set(records.map((r) => r.sessionKey));
		const dwells = records.map((r) => r.queueDwellMs).sort((a, b) => a - b);
		const meanDwell = Math.round(dwells.reduce((a, b) => a + b, 0) / dwells.length);
		const p95Dwell = dwells[Math.min(dwells.length - 1, Math.floor(dwells.length * .95))] ?? 0;
		const contentionDragIndex = Math.max(1, parseFloat((1 + p95Dwell / 50).toFixed(2)));
		return {
			activeSessions: sessionKeys.size,
			meanQueueDwellMs: meanDwell,
			p95QueueDwellMs: p95Dwell,
			contentionDragIndex,
			timeSeries
		};
	}
	/**
	* Calculates Fleet Cache Efficiency Summary.
	*/
	getFleetCacheSummary() {
		const { records } = this.querySlice({ windowMinutes: 60 });
		if (records.length === 0) return {
			fleetPromptCacheHitRatio: 0,
			totalTurnsSampled: 0,
			meanIncrementalTokenCost: 0,
			classification: "MODERATE_REUSE"
		};
		const hits = records.filter((r) => r.cacheHit).length;
		const ratio = parseFloat((hits / records.length).toFixed(2));
		const totalTokens = records.reduce((sum, r) => sum + r.totalTokens, 0);
		const meanTokens = Math.round(totalTokens / records.length);
		let classification = "MODERATE_REUSE";
		if (ratio >= .7) classification = "HIGH_REUSE";
		else if (ratio < .3) classification = "COLD_INFERENCE_HEAVY";
		return {
			fleetPromptCacheHitRatio: ratio,
			totalTurnsSampled: records.length,
			meanIncrementalTokenCost: meanTokens,
			classification
		};
	}
};
const globalAttributionRing = new AttributionRingBuffer(1e3);
//#endregion
//#region src/agents/subagent-yield-output.ts
/**
* sessions_yield transcript detectors.
*
* Accepts provider-specific tool-call and tool-result shapes used by transcript repair and announce capture.
*/
function readToolName(value) {
	const record = asOptionalRecord(value);
	if (!record) return;
	const aliases = [
		"name",
		"toolName",
		"tool_name",
		"functionName",
		"function_name"
	];
	const direct = readTrimmedStringAlias(record, aliases);
	if (direct) return direct;
	const nestedFunction = asOptionalRecord(record.function);
	return nestedFunction ? readTrimmedStringAlias(nestedFunction, aliases) : void 0;
}
function isToolCallBlock(value) {
	const record = asOptionalRecord(value);
	if (!record) return false;
	return record.type === "toolCall" || record.type === "tool_use" || record.type === "toolUse" || record.type === "functionCall" || record.type === "function_call";
}
/** Returns true when an assistant message requested the sessions_yield tool. */
function assistantCallsSessionsYield(message) {
	const record = asOptionalRecord(message);
	if (!record || record.role !== "assistant") return false;
	if (Array.isArray(record.content) && record.content.some((block) => isToolCallBlock(block) && readToolName(block) === "sessions_yield")) return true;
	return [record.toolCalls, record.tool_calls].some((toolCalls) => Array.isArray(toolCalls) && toolCalls.some((toolCall) => readToolName(toolCall) === "sessions_yield"));
}
function parseJsonObject(text) {
	const trimmed = text.trim();
	if (!trimmed.startsWith("{")) return;
	return asOptionalRecord(safeParseJson(trimmed));
}
function readStructuredToolPayload(content) {
	const record = asOptionalRecord(content);
	if (record) return record;
	if (typeof content === "string") return parseJsonObject(content);
	if (!Array.isArray(content)) return;
	for (const block of content) {
		const blockRecord = asOptionalRecord(block);
		if (!blockRecord) continue;
		const text = blockRecord.text;
		if (typeof text !== "string") continue;
		const parsed = parseJsonObject(text);
		if (parsed) return parsed;
	}
}
/** Returns true when a tool result represents a completed sessions_yield handoff. */
function isSessionsYieldToolResult(message, previousAssistantCalledYield) {
	const record = asOptionalRecord(message);
	if (!record || record.role !== "toolResult" && record.role !== "tool") return false;
	if (readToolName(record) === "sessions_yield") return true;
	if (!previousAssistantCalledYield) return false;
	if (asOptionalRecord(record.details)?.status === "yielded") return true;
	return readStructuredToolPayload(record.content)?.status === "yielded";
}
//#endregion
//#region src/agents/subagent-announce-output.ts
/**
* Subagent completion output capture.
*
* Reads child session output, detects waiting states, and formats completion findings for announcements.
*/
const FAST_TEST_RETRY_INTERVAL_MS = 8;
const MAX_CHILD_COMPLETION_RESULT_CHARS = 512;
const MAX_CHILD_COMPLETION_FIELD_CHARS = 256;
const MAX_CHILD_COMPLETION_FINDINGS_CHARS = 4096;
const CHILD_RESULT_TRUNCATION_NOTICE = "\n[child result truncated]";
const ASSISTANT_TOOL_CALL_BLOCK_TYPES = /* @__PURE__ */ new Set([
	"toolCall",
	"tool_use",
	"toolUse",
	"functionCall",
	"function_call"
]);
const defaultSubagentAnnounceOutputDeps = {
	callGateway,
	getRuntimeConfig,
	readSessionEntry,
	readSessionMessagesAsync,
	resolveAgentIdFromSessionKey,
	resolveStorePath
};
let subagentAnnounceOutputDeps = defaultSubagentAnnounceOutputDeps;
function isFastTestMode() {
	return isFastTestRuntimeEnv();
}
function withSubagentOutcomeTiming(outcome, timing) {
	const startedAt = asFiniteNumber(timing.startedAt) ?? asFiniteNumber(outcome.startedAt);
	const endedAt = asFiniteNumber(timing.endedAt) ?? asFiniteNumber(outcome.endedAt);
	const nextTiming = {};
	if (typeof startedAt === "number") nextTiming.startedAt = startedAt;
	if (typeof endedAt === "number") nextTiming.endedAt = endedAt;
	if (typeof startedAt === "number" && typeof endedAt === "number") nextTiming.elapsedMs = Math.max(0, endedAt - startedAt);
	return {
		...outcome,
		...nextTiming
	};
}
function extractSubagentAssistantText(message) {
	if (!message || typeof message !== "object") return "";
	if (message.role !== "assistant") return "";
	const content = message.content;
	if (typeof content === "string") return sanitizeTextContent(content);
	return extractAssistantText(message) ?? "";
}
function countAssistantToolCalls(message) {
	if (!message || typeof message !== "object") return 0;
	const content = message.content;
	const contentToolCalls = Array.isArray(content) ? content.filter((block) => block && typeof block === "object" && ASSISTANT_TOOL_CALL_BLOCK_TYPES.has(block.type ?? "")).length : 0;
	const toolCalls = message.toolCalls ?? message.tool_calls;
	return contentToolCalls + (Array.isArray(toolCalls) ? toolCalls.length : 0);
}
function summarizeSubagentOutputHistory(messages) {
	const snapshot = {};
	let previousAssistantCalledYield = false;
	for (const message of messages) {
		if (!message || typeof message !== "object") continue;
		const role = message.role;
		const provenance = message.provenance;
		if (role === "user" || provenance && typeof provenance === "object" && !Array.isArray(provenance) && provenance.kind === "inter_session") {
			snapshot.latestAssistantText = void 0;
			snapshot.latestSilentText = void 0;
			snapshot.latestToolCallCount = void 0;
			snapshot.waitingForContinuation = false;
			previousAssistantCalledYield = false;
			continue;
		}
		if (role === "assistant") {
			if (assistantCallsSessionsYield(message)) {
				snapshot.latestAssistantText = void 0;
				snapshot.latestSilentText = void 0;
				snapshot.waitingForContinuation = true;
				previousAssistantCalledYield = true;
				continue;
			}
			const text = extractSubagentAssistantText(message).trim();
			if (!text) {
				snapshot.latestToolCallCount = (snapshot.latestToolCallCount ?? 0) + countAssistantToolCalls(message);
				snapshot.waitingForContinuation = false;
				previousAssistantCalledYield = false;
				continue;
			}
			if (isAnnounceSkip(text) || isSilentReplyText(text, "NO_REPLY")) {
				snapshot.latestSilentText = text;
				snapshot.latestAssistantText = void 0;
				snapshot.waitingForContinuation = false;
				previousAssistantCalledYield = false;
				continue;
			}
			snapshot.latestSilentText = void 0;
			snapshot.latestAssistantText = text;
			snapshot.waitingForContinuation = false;
			previousAssistantCalledYield = false;
			continue;
		}
		if (isSessionsYieldToolResult(message, previousAssistantCalledYield)) {
			snapshot.latestAssistantText = void 0;
			snapshot.latestSilentText = void 0;
			snapshot.waitingForContinuation = true;
			previousAssistantCalledYield = false;
			continue;
		}
		previousAssistantCalledYield = false;
	}
	return snapshot;
}
function selectSubagentOutputText(snapshot, outcome) {
	if (snapshot.waitingForContinuation) return;
	if (snapshot.latestSilentText) return snapshot.latestSilentText;
	if (snapshot.latestAssistantText) return snapshot.latestAssistantText;
	if (outcome?.status === "timeout" && snapshot.latestToolCallCount && snapshot.latestToolCallCount > 0) return `${snapshot.latestToolCallCount} tool call(s) made without visible output.`;
}
async function readSubagentOutput(sessionKey, outcome, options) {
	let messages;
	if (options?.sessionTarget) messages = await subagentAnnounceOutputDeps.readSessionMessagesAsync(options.sessionTarget, {
		mode: "recent",
		maxMessages: 100,
		maxBytes: 1024 * 1024
	});
	const history = messages === void 0 ? await subagentAnnounceOutputDeps.callGateway({
		method: "chat.history",
		params: {
			sessionKey,
			limit: 100
		}
	}) : void 0;
	const selected = selectSubagentOutputText(summarizeSubagentOutputHistory(messages ?? (Array.isArray(history?.messages) ? history.messages : [])), outcome);
	if (selected?.trim()) return selected;
}
async function readLatestSubagentOutputWithRetry(params) {
	return await readLatestSubagentOutputWithRetryUsing({
		sessionKey: params.sessionKey,
		maxWaitMs: params.maxWaitMs,
		outcome: params.outcome,
		retryIntervalMs: isFastTestMode() ? FAST_TEST_RETRY_INTERVAL_MS : 100,
		readSubagentOutput
	});
}
async function readSubagentTimeoutProgress(sessionKey, maxWaitMs, outcome) {
	const initial = await readSubagentOutput(sessionKey, outcome);
	const progress = initial?.trim() ? initial : await readLatestSubagentOutputWithRetry({
		sessionKey,
		maxWaitMs,
		outcome
	});
	return progress && !isAnnounceSkip(progress) && !isSilentReplyText(progress, "NO_REPLY") ? progress : void 0;
}
async function waitForSubagentRunOutcome(runId, timeoutMs) {
	const waitMs = Math.max(0, Math.floor(timeoutMs));
	return await subagentAnnounceOutputDeps.callGateway({
		method: "agent.wait",
		params: {
			runId,
			timeoutMs: waitMs
		},
		timeoutMs: waitMs + 2e3
	});
}
function applySubagentWaitOutcome(params) {
	const next = {
		outcome: params.outcome,
		startedAt: params.startedAt,
		endedAt: params.endedAt
	};
	if (typeof params.wait?.startedAt === "number" && typeof next.startedAt !== "number") next.startedAt = params.wait.startedAt;
	if (typeof params.wait?.endedAt === "number" && typeof next.endedAt !== "number") next.endedAt = params.wait.endedAt;
	const waitError = typeof params.wait?.error === "string" ? params.wait.error : void 0;
	const terminalOutcome = buildAgentRunTerminalOutcomeFromWaitResult(params.wait);
	let outcome = next.outcome;
	if (terminalOutcome?.status === "timeout") outcome = { status: "timeout" };
	else if (terminalOutcome?.reason === "aborted" || terminalOutcome?.reason === "cancelled") outcome = {
		status: "error",
		error: "subagent run terminated"
	};
	else if (terminalOutcome?.reason === "blocked" || terminalOutcome?.reason === "abandoned" || terminalOutcome?.reason === "failed") outcome = {
		status: "error",
		error: terminalOutcome.error ?? waitError
	};
	else if (terminalOutcome?.reason === "completed") outcome = { status: "ok" };
	next.outcome = outcome ? withSubagentOutcomeTiming(outcome, next) : void 0;
	return next;
}
async function captureSubagentCompletionReply(sessionKey, options) {
	return await captureSubagentCompletionReplyUsing({
		sessionKey,
		waitForReply: options?.waitForReply,
		maxWaitMs: isFastTestMode() ? 50 : 1500,
		retryIntervalMs: isFastTestMode() ? FAST_TEST_RETRY_INTERVAL_MS : 100,
		readSubagentOutput: async (nextSessionKey) => await readSubagentOutput(nextSessionKey, options?.outcome, { sessionTarget: options?.sessionTarget })
	});
}
function describeSubagentOutcome(outcome) {
	if (!outcome) return "unknown";
	if (outcome.status === "ok") return "ok";
	if (outcome.status === "timeout") return "timeout";
	if (outcome.status === "error") return outcome.error?.trim() ? `error: ${outcome.error.trim()}` : "error";
	return "unknown";
}
function formatChildResultData(resultText) {
	const text = resultText?.trim() || "(no output)";
	return wrapPromptDataBlock({
		label: "Child result",
		text: text.length > MAX_CHILD_COMPLETION_RESULT_CHARS ? `${truncateUtf16Safe(text, MAX_CHILD_COMPLETION_RESULT_CHARS - 25)}${CHILD_RESULT_TRUNCATION_NOTICE}` : text,
		maxChars: MAX_CHILD_COMPLETION_RESULT_CHARS
	}) || "Child result: (no output)";
}
function truncateChildCompletionField(value) {
	return value.length > MAX_CHILD_COMPLETION_FIELD_CHARS ? `${truncateUtf16Safe(value, MAX_CHILD_COMPLETION_FIELD_CHARS - 1)}…` : value;
}
function selectChildCompletionResultText(child) {
	const primary = child.completion?.resultText;
	const fallback = child.completion?.fallbackResultText ?? child.frozenResultText;
	if (child.execution.outcome?.status === "ok") return selectDeliverableSessionsReply(primary, fallback);
	return (primary ?? fallback)?.trim() || void 0;
}
function hasCapturedChildCompletionReply(child) {
	return [
		child.completion?.resultText,
		child.completion?.fallbackResultText,
		child.frozenResultText
	].some((value) => Boolean(value?.trim()));
}
function buildChildCompletionFindings(children) {
	const sorted = [...children].toSorted((a, b) => {
		if (a.createdAt !== b.createdAt) return a.createdAt - b.createdAt;
		const aEnded = typeof a.execution.endedAt === "number" ? a.execution.endedAt : Number.MAX_SAFE_INTEGER;
		const bEnded = typeof b.execution.endedAt === "number" ? b.execution.endedAt : Number.MAX_SAFE_INTEGER;
		if (aEnded !== bEnded) return aEnded - bEnded;
		return a.childSessionKey < b.childSessionKey ? -1 : a.childSessionKey > b.childSessionKey ? 1 : 0;
	});
	const sections = [];
	for (const [index, child] of sorted.entries()) {
		const resultText = selectChildCompletionResultText(child);
		const outcome = describeSubagentOutcome(child.execution.outcome);
		if (child.execution.outcome?.status === "ok" && !resultText && hasCapturedChildCompletionReply(child)) continue;
		const title = child.label?.trim() || child.task.trim() || child.childSessionKey.trim() || `child ${index + 1}`;
		const displayIndex = sections.length + 1;
		const childTurns = globalAttributionRing.querySlice({ sessionKey: child.childSessionKey }).records;
		const totalTok = childTurns.reduce((acc, t) => acc + t.totalTokens, 0);
		const totalMs = childTurns.reduce((acc, t) => acc + t.wallClockMs, 0);
		const telemetryStats = childTurns.length > 0 ? `telemetry: ${childTurns.length} turn(s), ${totalTok} tokens, ${totalMs}ms` : void 0;
		sections.push({
			index: displayIndex,
			actionable: child.execution.outcome?.status !== "ok",
			text: [
				`${displayIndex}. ${truncateChildCompletionField(title)}`,
				`status: ${truncateChildCompletionField(outcome)}`,
				...telemetryStats ? [telemetryStats] : [],
				formatChildResultData(resultText)
			].join("\n")
		});
	}
	if (sections.length === 0) return;
	const render = (visibleSections, omittedCount = 0) => [
		"Child completion results:",
		"",
		...visibleSections,
		...omittedCount > 0 ? [`[${omittedCount} additional child completion result${omittedCount === 1 ? "" : "s"} omitted to fit the context budget.]`] : []
	].join("\n\n");
	const allSections = sections.map((section) => section.text);
	if (render(allSections).length <= MAX_CHILD_COMPLETION_FINDINGS_CHARS) return render(allSections);
	const prioritizedSections = [...sections.filter((section) => section.actionable), ...sections.filter((section) => !section.actionable)];
	let visibleSections = [];
	for (const section of prioritizedSections) {
		const nextSections = [...visibleSections, section].toSorted((left, right) => left.index - right.index);
		const omittedCount = sections.length - nextSections.length;
		if (render(nextSections.map((entry) => entry.text), omittedCount).length <= MAX_CHILD_COMPLETION_FINDINGS_CHARS) visibleSections = nextSections;
	}
	return render(visibleSections.map((section) => section.text), sections.length - visibleSections.length);
}
function dedupeLatestChildCompletionRows(children) {
	const latestByChildSessionKey = /* @__PURE__ */ new Map();
	for (const child of children) {
		const existing = latestByChildSessionKey.get(child.childSessionKey);
		if (!existing || compareSubagentRunGeneration(child, existing) > 0) latestByChildSessionKey.set(child.childSessionKey, child);
	}
	return [...latestByChildSessionKey.values()];
}
function filterCurrentDirectChildCompletionRows(children, params) {
	if (typeof params.getLatestSubagentRunByChildSessionKey !== "function") return children;
	return children.filter((child) => {
		const latest = params.getLatestSubagentRunByChildSessionKey?.(child.childSessionKey);
		if (!latest) return true;
		return latest.runId === child.runId && latest.requesterSessionKey === params.requesterSessionKey;
	});
}
function formatTokenCount(value) {
	if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return "0";
	if (value >= 1e6) return `${(value / 1e6).toFixed(1)}m`;
	if (value >= 1e3) {
		const formattedThousands = (value / 1e3).toFixed(1);
		if (Number(formattedThousands) >= 1e3) return `${(value / 1e6).toFixed(1)}m`;
		return `${formattedThousands}k`;
	}
	return String(Math.round(value));
}
async function buildCompactAnnounceStatsLine(params) {
	const cfg = subagentAnnounceOutputDeps.getRuntimeConfig();
	const agentId = subagentAnnounceOutputDeps.resolveAgentIdFromSessionKey(params.sessionKey);
	const storePath = subagentAnnounceOutputDeps.resolveStorePath(cfg.session?.store, { agentId });
	let entry = subagentAnnounceOutputDeps.readSessionEntry(storePath, params.sessionKey);
	const tokenWaitAttempts = isFastTestMode() ? 1 : 3;
	for (let attempt = 0; attempt < tokenWaitAttempts; attempt += 1) {
		if (typeof entry?.inputTokens === "number" || typeof entry?.outputTokens === "number" || typeof entry?.totalTokens === "number") break;
		if (!isFastTestMode()) await new Promise((resolve) => {
			setTimeout(resolve, 150);
		});
		entry = subagentAnnounceOutputDeps.readSessionEntry(storePath, params.sessionKey);
	}
	const input = typeof entry?.inputTokens === "number" ? entry.inputTokens : 0;
	const output = typeof entry?.outputTokens === "number" ? entry.outputTokens : 0;
	const ioTotal = input + output;
	const promptCache = typeof entry?.totalTokens === "number" ? entry.totalTokens : void 0;
	const parts = [`runtime ${formatDurationCompact(typeof params.startedAt === "number" && typeof params.endedAt === "number" ? Math.max(0, params.endedAt - params.startedAt) : void 0) ?? "n/a"}`, `tokens ${formatTokenCount(ioTotal)} (in ${formatTokenCount(input)} / out ${formatTokenCount(output)})`];
	if (typeof promptCache === "number" && promptCache > ioTotal) parts.push(`prompt/cache ${formatTokenCount(promptCache)}`);
	return `Stats: ${parts.join(" • ")}`;
}
const testing = { setDepsForTest(overrides) {
	subagentAnnounceOutputDeps = overrides ? {
		...defaultSubagentAnnounceOutputDeps,
		...overrides
	} : defaultSubagentAnnounceOutputDeps;
} };
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.subagentAnnounceOutputTestApi")] = testing;
//#endregion
//#region src/agents/subagent-launch-authorization.ts
/** Applies only the exact model choice authorized during spawn planning. */
function applySubagentLaunchAuthorization(request, authorization) {
	const modelOverride = authorization?.modelOverride;
	if (!modelOverride) return request;
	return {
		...request,
		...modelOverride.provider ? { provider: modelOverride.provider } : {},
		model: modelOverride.model
	};
}
//#endregion
//#region src/agents/subagent-spawn-deps.ts
const defaultSubagentSpawnDeps = {
	callGateway,
	dispatchGatewayMethodInProcess,
	forkSessionEntryFromParent,
	getGlobalHookRunner,
	getRuntimeConfig,
	hasInProcessGatewayContext,
	ensureContextEnginesInitialized,
	loadPreparedModelCatalog,
	resolveContextEngine
};
let subagentSpawnDeps = defaultSubagentSpawnDeps;
function getSubagentSpawnDeps() {
	return subagentSpawnDeps;
}
function setSubagentSpawnDepsForTest(overrides) {
	subagentSpawnDeps = overrides ? {
		...defaultSubagentSpawnDeps,
		...overrides
	} : defaultSubagentSpawnDeps;
}
//#endregion
//#region src/agents/subagent-spawn-gateway.ts
const DEFAULT_SUBAGENT_AGENT_GATEWAY_TIMEOUT_MS = 6e4;
const MAX_SUBAGENT_AGENT_GATEWAY_TIMEOUT_MS = 3e5;
async function callSubagentGateway(params, authorization) {
	const authorizedParams = params.params != null && typeof params.params === "object" && !Array.isArray(params.params) ? applySubagentLaunchAuthorization(params.params, authorization) : params.params;
	const leastPrivilegeScopes = resolveLeastPrivilegeOperatorScopesForMethod(params.method, authorizedParams);
	const allowModelOverride = authorization !== void 0;
	const deps = getSubagentSpawnDeps();
	const hasInProcessGateway = deps.hasInProcessGatewayContext();
	const needsOutOfProcessModelOverrideAuth = allowModelOverride && !hasInProcessGateway;
	const scopes = params.scopes ?? (leastPrivilegeScopes.includes("operator.admin") || needsOutOfProcessModelOverrideAuth ? ["operator.admin"] : void 0);
	const request = {
		...params,
		params: authorizedParams,
		...scopes != null ? { scopes } : {}
	};
	if (hasInProcessGateway && request.params != null && typeof request.params === "object" && !Array.isArray(request.params)) {
		const forceSyntheticClient = request.method === "agent" || scopes != null;
		return await deps.dispatchGatewayMethodInProcess(request.method, request.params, {
			expectFinal: request.expectFinal,
			...allowModelOverride ? { allowSyntheticModelOverride: true } : {},
			...forceSyntheticClient ? { forceSyntheticClient: true } : {},
			...typeof request.timeoutMs === "number" ? { timeoutMs: request.timeoutMs } : {},
			...scopes != null ? { syntheticScopes: scopes } : {}
		});
	}
	return await deps.callGateway(request);
}
function readGatewayRunId(response) {
	if (!response || typeof response !== "object") return;
	const { runId } = response;
	return typeof runId === "string" && runId.trim() ? runId.trim() : void 0;
}
function resolveSubagentAgentGatewayTimeoutMs(runTimeoutSeconds) {
	const runTimeoutMs = resolveSubagentRunTimerDelayMs(runTimeoutSeconds) ?? 0;
	if (runTimeoutMs <= 0) return DEFAULT_SUBAGENT_AGENT_GATEWAY_TIMEOUT_MS;
	return Math.min(MAX_SUBAGENT_AGENT_GATEWAY_TIMEOUT_MS, Math.max(DEFAULT_SUBAGENT_AGENT_GATEWAY_TIMEOUT_MS, runTimeoutMs + 5e3));
}
//#endregion
//#region src/agents/subagent-spawn-cleanup.ts
const SUBAGENT_CONTROL_GATEWAY_TIMEOUT_MS = 6e4;
function isSessionLifecycleChangedGatewayError(error) {
	if (!(error instanceof Error) || error.name !== "GatewayClientRequestError") return false;
	const requestError = error;
	const details = requestError.details;
	return requestError.gatewayCode === "INVALID_REQUEST" && typeof details === "object" && details !== null && details.reason === "session-changed";
}
function isMatchingAbortResponse(response, gatewayRunId) {
	if (!response || typeof response !== "object") return false;
	const result = response;
	return result.aborted === true && Array.isArray(result.runIds) && result.runIds.some((runId) => runId === gatewayRunId);
}
async function retrySubagentCleanup(attempt, options) {
	for (;;) {
		try {
			if (await attempt()) return true;
		} catch (error) {
			options?.onError?.(error);
		}
		if (options?.shouldRetry?.() === false) return false;
		await new Promise((resolve) => {
			setTimeout(resolve, isFastTestRuntimeEnv() ? 1 : 1e3).unref?.();
		});
	}
}
async function requestProvisionalSessionCleanup(childSessionKey, options) {
	if (!options?.expectedSessionId || !options.expectedLifecycleRevision) return "failed";
	try {
		await (options?.callGateway ?? callSubagentGateway)({
			method: "sessions.delete",
			params: {
				key: childSessionKey,
				emitLifecycleHooks: options?.emitLifecycleHooks === true,
				deleteTranscript: options?.deleteTranscript === true,
				...options?.expectedSessionId ? { expectedSessionId: options.expectedSessionId } : {},
				...options?.expectedLifecycleRevision ? { expectedLifecycleRevision: options.expectedLifecycleRevision } : {}
			},
			timeoutMs: options?.timeoutMs ?? SUBAGENT_CONTROL_GATEWAY_TIMEOUT_MS
		});
		return "deleted";
	} catch (error) {
		if (isSessionLifecycleChangedGatewayError(error)) return "changed";
		return "failed";
	}
}
async function cleanupProvisionalSession(childSessionKey, options) {
	return await requestProvisionalSessionCleanup(childSessionKey, options) === "deleted";
}
async function waitForProvisionalSessionDeletion(childSessionKey, options) {
	let deleted = false;
	await retrySubagentCleanup(async () => {
		const outcome = await requestProvisionalSessionCleanup(childSessionKey, options);
		deleted = outcome === "deleted";
		return outcome !== "failed";
	});
	return deleted;
}
async function cleanupFailedSpawnBeforeAgentStart(params) {
	let attachmentsRemoved = true;
	if (params.attachmentAbsDir) try {
		await promises.rm(params.attachmentAbsDir, {
			recursive: true,
			force: true
		});
	} catch {
		attachmentsRemoved = false;
	}
	const sessionCleanupOptions = {
		emitLifecycleHooks: params.emitLifecycleHooks,
		deleteTranscript: params.deleteTranscript,
		expectedSessionId: params.expectedSessionId,
		expectedLifecycleRevision: params.expectedLifecycleRevision
	};
	if (params.waitForSessionDeletion) {
		const sessionDeleted = await waitForProvisionalSessionDeletion(params.childSessionKey, sessionCleanupOptions);
		return {
			attachmentsRemoved,
			sessionDeleted
		};
	}
	return {
		attachmentsRemoved,
		sessionDeleted: await cleanupProvisionalSession(params.childSessionKey, sessionCleanupOptions)
	};
}
async function terminateAcceptedCollectorRun(params) {
	const call = params.callGateway ?? callSubagentGateway;
	const timeoutMs = params.timeoutMs ?? SUBAGENT_CONTROL_GATEWAY_TIMEOUT_MS;
	await retrySubagentCleanup(async () => {
		try {
			if (isMatchingAbortResponse(await call({
				method: "chat.abort",
				params: {
					sessionKey: params.childSessionKey,
					runId: params.gatewayRunId
				},
				timeoutMs
			}), params.gatewayRunId)) return true;
		} catch {}
		return await requestProvisionalSessionCleanup(params.childSessionKey, {
			deleteTranscript: true,
			expectedSessionId: params.expectedSessionId,
			expectedLifecycleRevision: params.expectedLifecycleRevision,
			callGateway: call,
			timeoutMs
		}) !== "failed";
	});
}
//#endregion
export { deleteSubagentSessionForCleanup as C, globalAttributionRing as S, readLatestSubagentOutputWithRetry as _, callSubagentGateway as a, waitForSubagentRunOutcome as b, getSubagentSpawnDeps as c, applySubagentWaitOutcome as d, buildChildCompletionFindings as f, filterCurrentDirectChildCompletionRows as g, dedupeLatestChildCompletionRows as h, terminateAcceptedCollectorRun as i, setSubagentSpawnDepsForTest as l, captureSubagentCompletionReply as m, cleanupProvisionalSession as n, readGatewayRunId as o, buildCompactAnnounceStatsLine as p, retrySubagentCleanup as r, resolveSubagentAgentGatewayTimeoutMs as s, cleanupFailedSpawnBeforeAgentStart as t, applySubagentLaunchAuthorization as u, readSubagentOutput as v, isSessionLifecycleChangedGatewayError$1 as w, withSubagentOutcomeTiming as x, readSubagentTimeoutProgress as y };
