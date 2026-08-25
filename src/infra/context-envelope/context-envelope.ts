/**
 * Pure Context Budget Envelope & Adaptive Compression Pipeline.
 *
 * @dft
 * - A1 / A2: Zero I/O, deterministic turn reduction and token calculation.
 */

import { calculateSNR } from "../tokenomics/snr-calculator.js";
import { generateTokenomicsContextCue } from "../tokenomics/tokenomics-prompt-injector.js";
import type { TurnMessage } from "../tokenomics/types.js";
import type {
  ContextEnvelopeOptions,
  ResolvedContextEnvelope,
  TurnCompressionSummary,
} from "./types.js";

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

/**
 * Resolves a context envelope, guaranteeing budget constraints and injecting cognitive SNR cues.
 */
export function resolveContextEnvelope(
  turns: readonly TurnMessage[],
  options: ContextEnvelopeOptions,
): ResolvedContextEnvelope {
  const budgetLimit = Math.max(
    100,
    options.maxContextTokens - options.reservedResponseTokens,
  );

  let currentTurns = [...turns];
  let initialTotalTokens = 0;
  for (const t of currentTurns) {
    initialTotalTokens += t.tokens ?? estimateTokens(t.content);
  }

  let compressionSummary: TurnCompressionSummary | undefined;

  // If budget exceeded and we have compressible turn history (>2 turns)
  if (initialTotalTokens > budgetLimit && currentTurns.length > 2) {
    const systemTurns = currentTurns.filter((t) => t.role === "system");
    const nonSystem = currentTurns.filter((t) => t.role !== "system");

    // Preserve the very latest turn
    const latestTurn = nonSystem.pop();
    let remainingBudget =
      budgetLimit -
      systemTurns.reduce((acc, t) => acc + (t.tokens ?? estimateTokens(t.content)), 0) -
      (latestTurn ? (latestTurn.tokens ?? estimateTokens(latestTurn.content)) : 0);

    // Keep most recent non-system turns that fit into remaining budget
    const keptTurns: TurnMessage[] = [];
    for (let i = nonSystem.length - 1; i >= 0; i--) {
      const turn = nonSystem[i];
      if (!turn) continue;
      const turnTokens = turn.tokens ?? estimateTokens(turn.content);
      if (remainingBudget - turnTokens >= 0) {
        keptTurns.unshift(turn);
        remainingBudget -= turnTokens;
      }
    }

    const compressedTurns = [...systemTurns, ...keptTurns];
    if (latestTurn) {
      compressedTurns.push(latestTurn);
    }

    let postTokens = 0;
    for (const t of compressedTurns) {
      postTokens += t.tokens ?? estimateTokens(t.content);
    }

    compressionSummary = {
      turnsBefore: currentTurns.length,
      turnsAfter: compressedTurns.length,
      tokensBefore: initialTotalTokens,
      tokensAfter: postTokens,
      compactedTurnCount: currentTurns.length - compressedTurns.length,
      freedTokens: Math.max(0, initialTotalTokens - postTokens),
    };

    currentTurns = compressedTurns;
  }

  // Calculate Shannon-Weaver SNR on final turns
  const snrReport = calculateSNR(currentTurns);
  const promptCue =
    options.enableProactiveCues ?? true
      ? generateTokenomicsContextCue({
          totalTokens: snrReport.totalTokens,
          signalTokens: snrReport.signalTokens,
        })?.promptDirective
      : undefined;

  return {
    turns: Object.freeze(currentTurns),
    totalTokens: snrReport.totalTokens,
    snrPercent: snrReport.snrPercent,
    tier: snrReport.tier,
    promptCue,
    compressionSummary,
    isWithinBudget: snrReport.totalTokens <= budgetLimit,
  };
}
