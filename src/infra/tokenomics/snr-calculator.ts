/**
 * @dft:axiom A1, A2
 * Pure Signal-to-Noise Ratio (SNR) Calculator
 */

import {
  TurnMessage,
  SNRReport,
  SNRTier,
  SNR_NOMINAL_PERCENT,
  SNR_WARNING_PERCENT,
} from "./types.js";

const NOISE_PATTERNS = [
  /^heartbeat/i,
  /^got it[\.!\s]*$/i,
  /^makes sense[\.!\s]*$/i,
  /^thanks?[\.!\s]*$/i,
  /^\/status@faustyrollbot/i,
  /let me clarify|actually,|i was wrong/i,
];

export function estimateTokens(content: string): number {
  if (!content) return 0;
  return Math.max(1, Math.ceil(content.length / 4));
}

export function isTurnNoise(msg: TurnMessage, seenToolOutputs: Set<string>): boolean {
  const text = msg.content.trim();
  if (text.length === 0) return true;

  if (NOISE_PATTERNS.some((p) => p.test(text))) {
    return true;
  }

  if (msg.role === "tool") {
    if (seenToolOutputs.has(text)) {
      return true; // duplicate tool output is noise
    }
    seenToolOutputs.add(text);
  }

  return false;
}

export function calculateSNR(turns: TurnMessage[]): SNRReport {
  if (turns.length === 0) {
    return {
      totalTokens: 0,
      signalTokens: 0,
      noiseTokens: 0,
      snrPercent: 100,
      tier: "nominal",
      isAdequate: true,
      recommendation: "Context empty; signal adequate.",
    };
  }

  let totalTokens = 0;
  let noiseTokens = 0;
  const seenToolOutputs = new Set<string>();

  for (const turn of turns) {
    const tokens = turn.tokens ?? estimateTokens(turn.content);
    totalTokens += tokens;

    if (isTurnNoise(turn, seenToolOutputs)) {
      noiseTokens += tokens;
    }
  }

  const signalTokens = Math.max(0, totalTokens - noiseTokens);
  const snrPercent = totalTokens === 0 ? 100 : Math.round((signalTokens / totalTokens) * 100);

  let tier: SNRTier = "nominal";
  let recommendation = "Signal adequate. No compaction required.";

  if (snrPercent < SNR_WARNING_PERCENT) {
    tier = "critical";
    recommendation = "Severe noise pollution (<50% SNR). Compaction strongly recommended.";
  } else if (snrPercent < SNR_NOMINAL_PERCENT) {
    tier = "warning";
    recommendation = "Degraded signal density (<70% SNR). Consider compaction at next threshold.";
  }

  return {
    totalTokens,
    signalTokens,
    noiseTokens,
    snrPercent,
    tier,
    isAdequate: snrPercent >= SNR_NOMINAL_PERCENT,
    recommendation,
  };
}
