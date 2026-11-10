import { a as readRecentSessionUsageFromTranscript } from "./session-transcript-readers-D52NAf4G.js";
import "./tool-command-logger-CV0XqnxT.js";
import "node:fs";
import "node:readline";
//#region src/infra/tokenomics/types.ts
const DEFAULT_RETRANSMIT_BUDGET_TOKENS = 2048;
//#endregion
//#region src/infra/tokenomics/snr-calculator.ts
/**
* @dft:axiom A1, A2
* Pure Signal-to-Noise Ratio (SNR) Calculator
*/
const NOISE_PATTERNS = [
	/^heartbeat/i,
	/^got it[\.!\s]*$/i,
	/^makes sense[\.!\s]*$/i,
	/^thanks?[\.!\s]*$/i,
	/^\/status@faustyrollbot/i,
	/let me clarify|actually,|i was wrong/i
];
function estimateTokens(content) {
	if (!content) return 0;
	return Math.max(1, Math.ceil(content.length / 4));
}
function isTurnNoise(msg, seenToolOutputs) {
	const text = msg.content.trim();
	if (text.length === 0) return true;
	if (NOISE_PATTERNS.some((p) => p.test(text))) return true;
	if (msg.role === "tool") {
		if (seenToolOutputs.has(text)) return true;
		seenToolOutputs.add(text);
	}
	return false;
}
function classifySNRTier(snrPercent) {
	if (snrPercent < 50) return "critical";
	else if (snrPercent < 70) return "warning";
	return "nominal";
}
function calculateSNR(turns) {
	if (turns.length === 0) return {
		totalTokens: 0,
		signalTokens: 0,
		noiseTokens: 0,
		snrPercent: 100,
		tier: "nominal",
		isAdequate: true,
		recommendation: "Context empty; signal adequate."
	};
	let totalTokens = 0;
	let noiseTokens = 0;
	const seenToolOutputs = /* @__PURE__ */ new Set();
	for (const turn of turns) {
		const tokens = turn.tokens ?? estimateTokens(turn.content);
		totalTokens += tokens;
		if (isTurnNoise(turn, seenToolOutputs)) noiseTokens += tokens;
	}
	const signalTokens = Math.max(0, totalTokens - noiseTokens);
	const snrPercent = totalTokens === 0 ? 100 : Math.round(signalTokens / totalTokens * 100);
	const tier = classifySNRTier(snrPercent);
	let recommendation = "Signal adequate. No compaction required.";
	if (tier === "critical") recommendation = "Severe noise pollution (<50% SNR). Compaction strongly recommended.";
	else if (tier === "warning") recommendation = "Degraded signal density (<70% SNR). Consider compaction at next threshold.";
	return {
		totalTokens,
		signalTokens,
		noiseTokens,
		snrPercent,
		tier,
		isAdequate: snrPercent >= 70,
		recommendation
	};
}
//#endregion
//#region src/agents/tools/loop-guard/command-loop-breaker.ts
const MAX_TRACKED_SESSIONS = 1024;
const MAX_COMMANDS_PER_TURN = 64;
const sessionStates = /* @__PURE__ */ new Map();
function normalizeCommand(raw) {
	if (!raw || typeof raw !== "string") return "";
	return raw.trim().replace(/\s+/g, " ").replace(/(^|\s)\.\//g, "$1");
}
function canonicalizeArguments(args) {
	if (args === null || args === void 0) return "";
	if (typeof args !== "object") return normalizeCommand(String(args));
	if (Array.isArray(args)) return "[" + args.map(canonicalizeArguments).join(",") + "]";
	const obj = args;
	const keys = Object.keys(obj).filter((k) => k !== "timestamp" && k !== "_ts" && k !== "clientRequestId" && k !== "toolCallId").sort();
	const entries = [];
	for (const k of keys) {
		const val = obj[k];
		if (val === void 0) continue;
		entries.push(`${k}:${typeof val === "string" ? normalizeCommand(val) : canonicalizeArguments(val)}`);
	}
	return "{" + entries.join(",") + "}";
}
/**
* Checks an incoming tool command against the active turn history.
*/
function recordAndCheckCommandLoop(params) {
	const sessionId = params.sessionId?.trim() || "default";
	let norm = "";
	if (params.args !== void 0 && params.args !== null) norm = canonicalizeArguments(params.args);
	else norm = normalizeCommand(params.commandRaw || "");
	const currentTurn = params.turnIndex ?? 0;
	let state = sessionStates.get(sessionId);
	if (!state || state.turnIndex !== currentTurn) {
		state = {
			commands: [],
			totalPenalties: 0,
			turnIndex: currentTurn
		};
		if (sessionStates.size >= MAX_TRACKED_SESSIONS && !sessionStates.has(sessionId)) {
			const oldest = sessionStates.keys().next().value;
			if (oldest) sessionStates.delete(oldest);
		}
		sessionStates.set(sessionId, state);
	}
	if (!norm) return {
		isLoop: false,
		consecutiveCount: 0,
		penalty: 0
	};
	let matches = 0;
	for (const cmd of state.commands) if (cmd.toolName === params.toolName && cmd.commandNormalized === norm) matches++;
	state.commands.push({
		commandNormalized: norm,
		toolName: params.toolName,
		timestamp: Date.now()
	});
	if (state.commands.length > MAX_COMMANDS_PER_TURN) state.commands.shift();
	if (matches >= 1) {
		const consecutiveCount = matches + 1;
		const penalty = 5 * (consecutiveCount - 1);
		state.totalPenalties += penalty;
		return {
			isLoop: true,
			consecutiveCount,
			penalty,
			warning: "duplicate_command_detected",
			hint: "Identical command executed in this turn. Vary parameters/path or synthesize findings directly."
		};
	}
	return {
		isLoop: false,
		consecutiveCount: 1,
		penalty: 0
	};
}
/**
* Returns total loop penalties accumulated in current turn.
*/
function getSessionLoopPenalties(sessionId) {
	if (!sessionId) return 0;
	return sessionStates.get(sessionId.trim())?.totalPenalties ?? 0;
}
//#endregion
//#region src/auto-reply/usage-bar/session-usage-accumulator.ts
const MAX_SESSION_ENTRIES = 4096;
const sessionUsageStore = /* @__PURE__ */ new Map();
/**
* Records an observed token usage for a session and returns the monotonic accumulation.
*/
function recordMonotonicSessionUsage(params) {
	const now = params.now ?? Date.now();
	const sessionId = params.sessionId?.trim();
	const sample = typeof params.sampleTokens === "number" && Number.isFinite(params.sampleTokens) && params.sampleTokens > 0 ? Math.round(params.sampleTokens) : void 0;
	if (!sessionId) {
		if (sample !== void 0) return {
			usedTokens: sample,
			confidence: "live",
			isStale: false,
			lastUpdated: now,
			observationCount: 1
		};
		return {
			usedTokens: 0,
			confidence: "none",
			isStale: false,
			lastUpdated: now,
			observationCount: 0
		};
	}
	const existing = sessionUsageStore.get(sessionId);
	if (sample !== void 0) {
		const nextRecord = {
			usedTokens: existing ? Math.max(existing.usedTokens, sample) : sample,
			confidence: "live",
			isStale: false,
			lastUpdated: now,
			observationCount: (existing?.observationCount ?? 0) + 1
		};
		if (sessionUsageStore.size >= MAX_SESSION_ENTRIES && !sessionUsageStore.has(sessionId)) {
			const oldestKey = sessionUsageStore.keys().next().value;
			if (oldestKey) sessionUsageStore.delete(oldestKey);
		}
		sessionUsageStore.set(sessionId, nextRecord);
		return nextRecord;
	}
	if (existing && existing.usedTokens > 0) return {
		usedTokens: existing.usedTokens,
		confidence: "stale",
		isStale: true,
		lastUpdated: existing.lastUpdated,
		observationCount: existing.observationCount
	};
	return {
		usedTokens: 0,
		confidence: "none",
		isStale: false,
		lastUpdated: now,
		observationCount: 0
	};
}
/**
* Retrieves the current monotonic usage record without modifying it.
*/
function getMonotonicSessionUsage(sessionId) {
	if (!sessionId) return void 0;
	return sessionUsageStore.get(sessionId.trim());
}
//#endregion
//#region src/infra/telemetry-bus/live-session-tap.ts
/**
* Execution Boundary: Live Session Telemetry Bus Tap.
* Goldilocks decomposition unit (< 150 LOC).
*
* Axiom:
* Taps active transcript accounting directly, bridging live 95k tokens
* and 4-way per-source breakdown to peek("F1") and live sensors.
*/
const DEFAULT_MODEL_LIMIT = 128e3;
const FORECLOSURE_THRESHOLD_RATIO = .85;
const activeInFlightTurns = /* @__PURE__ */ new Map();
function startInFlightTurn(params) {
	const sessionId = params.sessionId?.trim() || "default";
	const score = params.score ?? 100;
	const spread = params.spread ?? 1;
	let tier = params.tier ?? "Gold";
	let callsLimit = 8;
	if (score >= 99) {
		tier = "Diamond";
		callsLimit = 12;
	} else if (score >= 95) {
		tier = "Gold";
		callsLimit = 8;
	} else if (score >= 85) {
		tier = "Silver";
		callsLimit = 5;
	} else {
		tier = "Bronze";
		callsLimit = 3;
	}
	activeInFlightTurns.set(sessionId, {
		callsCount: 0,
		callsLimit,
		tier,
		score,
		spread,
		turnStartTimeMs: Date.now(),
		timeoutMs: (params.timeoutSeconds ?? 300) * 1e3,
		hasEmittedExhaustionWarning: false
	});
}
function recordInFlightToolCall(sessionId) {
	const key = sessionId?.trim() || "default";
	let state = activeInFlightTurns.get(key);
	if (!state) {
		startInFlightTurn({ sessionId: key });
		state = activeInFlightTurns.get(key);
	}
	state.callsCount += 1;
	const budgetExhausted = state.callsCount >= state.callsLimit;
	const shouldEmitWarning = budgetExhausted && !state.hasEmittedExhaustionWarning;
	if (shouldEmitWarning) state.hasEmittedExhaustionWarning = true;
	return {
		callsUsed: Math.min(state.callsCount, state.callsLimit),
		callsLimit: state.callsLimit,
		budgetExhausted,
		shouldEmitWarning
	};
}
function getInFlightChainMetrics(sessionId) {
	const key = sessionId?.trim() || "default";
	const state = activeInFlightTurns.get(key);
	const loopPenalty = getSessionLoopPenalties(key);
	const callsUsed = state?.callsCount ?? 0;
	const callsLimit = state?.callsLimit ?? 8;
	const rawScore = state?.score ?? 100;
	const adjustedScore = Math.max(0, rawScore - loopPenalty);
	const spread = state?.spread ?? 1;
	const tier = state?.tier ?? "Gold";
	const elapsedSec = state ? Math.floor((Date.now() - state.turnStartTimeMs) / 1e3) : 0;
	const totalTimeoutSec = state ? Math.floor(state.timeoutMs / 1e3) : 300;
	return {
		callsUsed,
		callsLimit,
		spread,
		score: adjustedScore,
		tier,
		runwaySecondsLeft: Math.max(0, totalTimeoutSec - elapsedSec),
		inFlightBudgetExhausted: callsUsed >= callsLimit
	};
}
let activeTurnsCache = [];
let activeModelLimitTokens = DEFAULT_MODEL_LIMIT;
let activeReleaseVersion = "2026.08.31-phosphene (73126114)";
let activeChangelog = [
	"Monotonic Usage Gauge Engine (CAP-GAUGE-01)",
	"Literate Markdown Surface Resolver (CAP-LIT-01)",
	"In-Flight Intra-Turn Scoreboard & Chain Telemetry (CAP-SCORE-01)",
	"Command Loop Breaker & Repeat Penalty (CAP-EXEC-03)",
	"Sovereign Prompt Directives & Group Chat Lurk Purge",
	"Fast-Path differential deployment runtime"
];
function getActiveSessionTurns() {
	return [...activeTurnsCache];
}
async function resolveLivePositionFrame(context) {
	let breakdown;
	if (activeTurnsCache.length > 0) {
		let systemPromptTokens = 0;
		let historyTurnsTokens = 0;
		for (const t of activeTurnsCache) {
			const len = Math.max(1, Math.ceil((t.content?.length ?? 0) / 4));
			if (t.role === "system") systemPromptTokens += len;
			else historyTurnsTokens += len;
		}
		breakdown = {
			totalTokens: systemPromptTokens + historyTurnsTokens,
			systemPromptTokens,
			historyTurnsTokens,
			toolResultsTokens: 0,
			workspaceMemoryTokens: 0,
			turnCount: activeTurnsCache.length
		};
	} else {
		const effectiveSessionId = context?.sessionId ?? context?.runSessionKey ?? context?.agentSessionKey;
		const effectiveSessionKey = context?.runSessionKey ?? context?.agentSessionKey ?? context?.sessionId;
		const monotonic = getMonotonicSessionUsage(effectiveSessionId) ?? (effectiveSessionKey ? getMonotonicSessionUsage(effectiveSessionKey) : void 0);
		let logUsage = null;
		if (effectiveSessionId || effectiveSessionKey) try {
			logUsage = readRecentSessionUsageFromTranscript({
				sessionId: effectiveSessionId ?? "",
				sessionKey: effectiveSessionKey,
				agentId: context?.agentId
			}, 256 * 1024);
		} catch {
			logUsage = null;
		}
		const logPromptTokens = logUsage?.inputTokens ?? 0;
		const logTotalTokens = logUsage?.totalTokens ?? logPromptTokens + (logUsage?.outputTokens ?? 0);
		const monotonicTokens = monotonic?.usedTokens ?? 0;
		const usedTokens = Math.max(logTotalTokens, monotonicTokens);
		const systemPromptTokens = logPromptTokens > 0 ? logPromptTokens : Math.round(usedTokens * .15);
		breakdown = {
			totalTokens: usedTokens,
			systemPromptTokens,
			historyTurnsTokens: Math.max(0, usedTokens - systemPromptTokens),
			toolResultsTokens: 0,
			workspaceMemoryTokens: 0,
			turnCount: monotonic?.observationCount ?? (logUsage ? 1 : 0)
		};
	}
	const usedTokens = breakdown.totalTokens;
	const limitTokens = activeModelLimitTokens;
	const headroomTokens = Math.max(0, limitTokens - usedTokens);
	const capacityPct = Math.min(100, Math.round(usedTokens / limitTokens * 100));
	const isForeclosureImminent = usedTokens / limitTokens >= FORECLOSURE_THRESHOLD_RATIO;
	const snrReport = calculateSNR(activeTurnsCache);
	const chainMetrics = getInFlightChainMetrics(context?.sessionId ?? context?.runSessionKey ?? context?.agentSessionKey);
	return {
		usedTokens,
		limitTokens,
		headroomTokens,
		capacityPct,
		snrScore: snrReport.snrPercent,
		isForeclosureImminent,
		breakdown,
		chainMetrics
	};
}
async function resolveLiveTelemetrySnapshot(context) {
	const F1 = await resolveLivePositionFrame(context);
	return {
		F1,
		F2: { totalCompactionEvents: 0 },
		F3: {
			activeRoute: "fits",
			reason: F1.isForeclosureImminent ? "Capacity >= 85%; compaction recommended" : "Nominal"
		},
		F4: {
			inContextTurnsCount: F1.breakdown.turnCount,
			coldArchiveCount: 0
		},
		platform: {
			version: activeReleaseVersion,
			deployedAt: (/* @__PURE__ */ new Date()).toISOString(),
			recentChangelog: Object.freeze([...activeChangelog])
		}
	};
}
//#endregion
export { recordAndCheckCommandLoop as a, DEFAULT_RETRANSMIT_BUDGET_TOKENS as c, recordMonotonicSessionUsage as i, recordInFlightToolCall as n, calculateSNR as o, resolveLiveTelemetrySnapshot as r, estimateTokens as s, getActiveSessionTurns as t };
