/**
 * Execution Boundary: Live Session Telemetry Bus Tap.
 * Goldilocks decomposition unit (< 150 LOC).
 * 
 * Axiom:
 * Taps active transcript accounting directly, bridging live 95k tokens
 * and 4-way per-source breakdown to peek("F1") and live sensors.
 */

import { calculateTranscriptPerSourceBreakdown, type TranscriptPerSourceBreakdown } from "../../agents/tools/session-status/transcript-usage.js";
import { calculateSNR } from "../tokenomics/snr-calculator.js";
import type { TurnMessage } from "../tokenomics/types.js";
import type { Frame1Position, LiveTelemetrySnapshot } from "./types.js";

const DEFAULT_MODEL_LIMIT = 128000;
const FORECLOSURE_THRESHOLD_RATIO = 0.85;

// Active in-process session tap state
let activeTranscriptPath: string | null = null;
let activeTurnsCache: TurnMessage[] = [];
let activeModelLimitTokens: number = DEFAULT_MODEL_LIMIT;
let activeReleaseVersion = "1.0.0";
let activeChangelog: string[] = [
  "Added live telemetry bus tap (F1 live tokens + per-source breakdown)",
  "Zero-arg live sensor mode for tokenomics_snr and noise_inspect",
  "Proactive ambient foreclosure warning header (>85% threshold)",
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

export async function resolveLivePositionFrame(): Promise<Frame1Position> {
  let breakdown: TranscriptPerSourceBreakdown;

  if (activeTranscriptPath) {
    breakdown = await calculateTranscriptPerSourceBreakdown(activeTranscriptPath);
  } else {
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
  }

  const usedTokens = breakdown.totalTokens;
  const limitTokens = activeModelLimitTokens;
  const headroomTokens = Math.max(0, limitTokens - usedTokens);
  const capacityPct = Math.min(100, Math.round((usedTokens / limitTokens) * 100));
  const isForeclosureImminent = (usedTokens / limitTokens) >= FORECLOSURE_THRESHOLD_RATIO;

  const snrReport = calculateSNR(activeTurnsCache);

  return {
    usedTokens,
    limitTokens,
    headroomTokens,
    capacityPct,
    snrScore: snrReport.snrPercent,
    isForeclosureImminent,
    breakdown,
  };
}

export async function resolveLiveTelemetrySnapshot(): Promise<LiveTelemetrySnapshot> {
  const F1 = await resolveLivePositionFrame();

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
