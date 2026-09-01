/**
 * Execution Boundary: Live Session Telemetry Bus Tap.
 * Goldilocks decomposition unit (< 150 LOC).
 *
 * Axiom:
 * Taps active transcript accounting directly, bridging live 95k tokens
 * and 4-way per-source breakdown to peek("F1") and live sensors.
 */

import { getSessionLoopPenalties } from "../../agents/tools/loop-guard/command-loop-breaker.js";
import {
  calculateTranscriptPerSourceBreakdown,
  type TranscriptPerSourceBreakdown,
} from "../../agents/tools/session-status/transcript-usage.js";
import { getMonotonicSessionUsage } from "../../auto-reply/usage-bar/session-usage-accumulator.js";
import { readRecentSessionUsageFromTranscript } from "../../gateway/session-transcript-readers.js";
import { calculateSNR } from "../tokenomics/snr-calculator.js";
import type { TurnMessage } from "../tokenomics/types.js";
import type { Frame1Position, InFlightChainMetrics, LiveTelemetrySnapshot } from "./types.js";

const DEFAULT_MODEL_LIMIT = 128000;
const FORECLOSURE_THRESHOLD_RATIO = 0.85;

export interface LiveSessionContext {
  agentSessionKey?: string;
  runSessionKey?: string;
  sessionId?: string;
  agentId?: string;
  config?: unknown;
}

interface InFlightTurnState {
  callsCount: number;
  callsLimit: number;
  tier: "Diamond" | "Gold" | "Silver" | "Bronze";
  score: number;
  spread: number;
  turnStartTimeMs: number;
  timeoutMs: number;
}

const activeInFlightTurns = new Map<string, InFlightTurnState>();

export function startInFlightTurn(params: {
  sessionId?: string;
  tier?: "Diamond" | "Gold" | "Silver" | "Bronze";
  score?: number;
  spread?: number;
  timeoutSeconds?: number;
}): void {
  const sessionId = params.sessionId?.trim() || "default";
  const score = params.score ?? 100;
  const spread = params.spread ?? 1.0;
  let tier: "Diamond" | "Gold" | "Silver" | "Bronze" = params.tier ?? "Gold";
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
    timeoutMs: (params.timeoutSeconds ?? 300) * 1000,
  });
}

export function recordInFlightToolCall(sessionId?: string): {
  callsUsed: number;
  callsLimit: number;
  budgetExhausted: boolean;
} {
  const key = sessionId?.trim() || "default";
  let state = activeInFlightTurns.get(key);
  if (!state) {
    startInFlightTurn({ sessionId: key });
    state = activeInFlightTurns.get(key)!;
  }
  state.callsCount += 1;
  const budgetExhausted = state.callsCount >= state.callsLimit;
  return {
    callsUsed: state.callsCount,
    callsLimit: state.callsLimit,
    budgetExhausted,
  };
}

export function getInFlightChainMetrics(sessionId?: string): InFlightChainMetrics {
  const key = sessionId?.trim() || "default";
  const state = activeInFlightTurns.get(key);
  const loopPenalty = getSessionLoopPenalties(key);

  const callsUsed = state?.callsCount ?? 0;
  const callsLimit = state?.callsLimit ?? 8;
  const rawScore = state?.score ?? 100;
  const adjustedScore = Math.max(0, rawScore - loopPenalty);
  const spread = state?.spread ?? 1.0;
  const tier = state?.tier ?? "Gold";

  const elapsedSec = state ? Math.floor((Date.now() - state.turnStartTimeMs) / 1000) : 0;
  const totalTimeoutSec = state ? Math.floor(state.timeoutMs / 1000) : 300;
  const runwaySecondsLeft = Math.max(0, totalTimeoutSec - elapsedSec);

  return {
    callsUsed,
    callsLimit,
    spread,
    score: adjustedScore,
    tier,
    runwaySecondsLeft,
    inFlightBudgetExhausted: callsUsed >= callsLimit,
  };
}

export function clearInFlightTurn(sessionId?: string): void {
  if (!sessionId) return;
  activeInFlightTurns.delete(sessionId.trim());
}

// Active in-process session tap state
let activeTranscriptPath: string | null = null;
let activeTurnsCache: TurnMessage[] = [];
let activeModelLimitTokens: number = DEFAULT_MODEL_LIMIT;
let activeReleaseVersion = "2026.08.31-phosphene (73126114)";
let activeChangelog: string[] = [
  "Monotonic Usage Gauge Engine (CAP-GAUGE-01)",
  "Literate Markdown Surface Resolver (CAP-LIT-01)",
  "In-Flight Intra-Turn Scoreboard & Chain Telemetry (CAP-SCORE-01)",
  "Command Loop Breaker & Repeat Penalty (CAP-EXEC-03)",
  "Sovereign Prompt Directives & Group Chat Lurk Purge",
  "Fast-Path differential deployment runtime",
];

export function registerActiveSessionTap(params: {
  transcriptPath?: string;
  turns?: TurnMessage[];
  modelLimitTokens?: number;
  releaseVersion?: string;
  changelog?: string[];
}): void {
  if (params.transcriptPath) activeTranscriptPath = params.transcriptPath;
  if (params.turns) activeTurnsCache = [...params.turns];
  if (params.modelLimitTokens) activeModelLimitTokens = params.modelLimitTokens;
  if (params.releaseVersion) activeReleaseVersion = params.releaseVersion;
  if (params.changelog) activeChangelog = [...params.changelog];
}

export function getActiveSessionTurns(): TurnMessage[] {
  return [...activeTurnsCache];
}

export async function resolveLivePositionFrame(
  context?: LiveSessionContext,
): Promise<Frame1Position> {
  let breakdown: TranscriptPerSourceBreakdown;

  if (activeTranscriptPath) {
    breakdown = await calculateTranscriptPerSourceBreakdown(activeTranscriptPath);
  } else if (activeTurnsCache.length > 0) {
    // In-memory estimation fallback
    let systemPromptTokens = 0;
    let historyTurnsTokens = 0;
    for (const t of activeTurnsCache) {
      const len = Math.max(1, Math.ceil((t.content?.length ?? 0) / 4));
      if (t.role === "system") systemPromptTokens += len;
      else historyTurnsTokens += len;
    }
    const total = systemPromptTokens + historyTurnsTokens;
    breakdown = {
      totalTokens: total,
      systemPromptTokens,
      historyTurnsTokens,
      toolResultsTokens: 0,
      workspaceMemoryTokens: 0,
      turnCount: activeTurnsCache.length,
    };
  } else {
    // Live session context resolution (SQLite + Monotonic Accumulator)
    const effectiveSessionId =
      context?.sessionId ?? context?.runSessionKey ?? context?.agentSessionKey;
    const effectiveSessionKey =
      context?.runSessionKey ?? context?.agentSessionKey ?? context?.sessionId;
    const monotonic =
      getMonotonicSessionUsage(effectiveSessionId) ??
      (effectiveSessionKey ? getMonotonicSessionUsage(effectiveSessionKey) : undefined);

    let logUsage: ReturnType<typeof readRecentSessionUsageFromTranscript> | null = null;
    if (effectiveSessionId || effectiveSessionKey) {
      try {
        logUsage = readRecentSessionUsageFromTranscript(
          {
            sessionId: effectiveSessionId ?? "",
            sessionKey: effectiveSessionKey,
            agentId: context?.agentId,
          },
          256 * 1024,
        );
      } catch {
        logUsage = null;
      }
    }

    const logPromptTokens = logUsage?.inputTokens ?? 0;
    const logTotalTokens = logUsage?.totalTokens ?? logPromptTokens + (logUsage?.outputTokens ?? 0);
    const monotonicTokens = monotonic?.usedTokens ?? 0;

    const usedTokens = Math.max(logTotalTokens, monotonicTokens);
    const systemPromptTokens =
      logPromptTokens > 0 ? logPromptTokens : Math.round(usedTokens * 0.15);
    const historyTurnsTokens = Math.max(0, usedTokens - systemPromptTokens);
    const turnCount = monotonic?.observationCount ?? (logUsage ? 1 : 0);

    breakdown = {
      totalTokens: usedTokens,
      systemPromptTokens,
      historyTurnsTokens,
      toolResultsTokens: 0,
      workspaceMemoryTokens: 0,
      turnCount,
    };
  }

  const usedTokens = breakdown.totalTokens;
  const limitTokens = activeModelLimitTokens;
  const headroomTokens = Math.max(0, limitTokens - usedTokens);
  const capacityPct = Math.min(100, Math.round((usedTokens / limitTokens) * 100));
  const isForeclosureImminent = usedTokens / limitTokens >= FORECLOSURE_THRESHOLD_RATIO;

  const snrReport = calculateSNR(activeTurnsCache);
  const effectiveSessionId =
    context?.sessionId ?? context?.runSessionKey ?? context?.agentSessionKey;
  const chainMetrics = getInFlightChainMetrics(effectiveSessionId);

  return {
    usedTokens,
    limitTokens,
    headroomTokens,
    capacityPct,
    snrScore: snrReport.snrPercent,
    isForeclosureImminent,
    breakdown,
    chainMetrics,
  };
}

export async function resolveLiveTelemetrySnapshot(
  context?: LiveSessionContext,
): Promise<LiveTelemetrySnapshot> {
  const F1 = await resolveLivePositionFrame(context);

  return {
    F1,
    F2: {
      totalCompactionEvents: 0,
    },
    F3: {
      activeRoute: "fits",
      reason: F1.isForeclosureImminent ? "Capacity >= 85%; compaction recommended" : "Nominal",
    },
    F4: {
      inContextTurnsCount: F1.breakdown.turnCount,
      coldArchiveCount: 0,
    },
    platform: {
      version: activeReleaseVersion,
      deployedAt: new Date().toISOString(),
      recentChangelog: Object.freeze([...activeChangelog]),
    },
  };
}
