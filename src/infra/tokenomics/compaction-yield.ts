/**
 * @dft:axiom A6
 * Pure Compaction Yield Report Calculator (Check-Result)
 */

import { CompactionYieldReport } from "./types.js";

export interface YieldCalculationInput {
  tokensBefore: number;
  tokensAfter: number;
  bytesBefore?: number;
  bytesAfter?: number;
  snrBefore?: number;
  snrAfter?: number;
}

export function computeCompactionYield(input: YieldCalculationInput): CompactionYieldReport {
  const tokensBefore = Math.max(1, input.tokensBefore);
  const tokensAfter = Math.max(0, input.tokensAfter);
  const bytesBefore = input.bytesBefore ?? Math.round(tokensBefore * 12.5);
  const bytesAfter = input.bytesAfter ?? Math.round(tokensAfter * 12.5);
  const snrBefore = input.snrBefore ?? 55;
  const snrAfter = input.snrAfter ?? 85;

  const tokenReductionPercent = Math.max(
    0,
    Math.round(((tokensBefore - tokensAfter) / tokensBefore) * 100)
  );

  const byteReductionPercent = Math.max(
    0,
    Math.round(((bytesBefore - bytesAfter) / Math.max(1, bytesBefore)) * 100)
  );

  const snrDeltaPoints = Math.round(snrAfter - snrBefore);

  const kbBefore = (bytesBefore / 1024).toFixed(1);
  const kbAfter = (bytesAfter / 1024).toFixed(1);

  const summary =
    `Compaction Yield: ${tokensBefore} → ${tokensAfter} tokens (-${tokenReductionPercent}%) | ` +
    `${kbBefore}KB → ${kbAfter}KB (-${byteReductionPercent}%) | ` +
    `SNR: ${snrBefore}% → ${snrAfter}% (+${snrDeltaPoints}pp)`;

  return {
    tokensBefore,
    tokensAfter,
    bytesBefore,
    bytesAfter,
    snrBefore,
    snrAfter,
    tokenReductionPercent,
    byteReductionPercent,
    snrDeltaPoints,
    summary,
  };
}
