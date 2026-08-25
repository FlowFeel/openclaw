/**
 * Shannon-Weaver Tokenomics Prompt Injector.
 * Injects proactive cognitive cues into agent context when Signal-to-Noise Ratio (SNR) degrades.
 *
 * @dft
 * - A1 / A2: Pure mathematical formatting, zero I/O, deterministic.
 */

import { calculateRawSNR } from "./snr-calculator.js";
import type { ShannonSNROptions, TokenomicsContextCue } from "./types.js";

/**
 * Evaluates whether an SNR diagnostic cue should be injected into the prompt context.
 */
export function generateTokenomicsContextCue(
  params: {
    totalTokens: number;
    signalTokens: number;
    options?: ShannonSNROptions;
  },
): TokenomicsContextCue | undefined {
  const { snrPercentage, tier } = calculateRawSNR(params.totalTokens, params.signalTokens);

  // Nominal SNR requires 0 prompt tax (Zero-Tax Invariant)
  if (tier === "nominal") {
    return undefined;
  }

  const promptDirective =
    tier === "critical"
      ? `[TOKENOMICS ALERT: Critical SNR ${snrPercentage.toFixed(1)}% (<50%) — Prompt context contains high noise. Execute compaction via \`compaction_preview\` or filter conversational chaff immediately.]`
      : `[TOKENOMICS NOTICE: Warning SNR ${snrPercentage.toFixed(1)}% (<70%) — Context noise elevated. Consider consolidating background memory.]`;

  return {
    snrPercentage,
    tier,
    promptDirective,
    tokenOverhead: Math.ceil(promptDirective.length / 4),
  };
}

