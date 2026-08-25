/**
 * Pure Ambient Position Marker Formatter.
 * Formats a terse, deterministic header line (<= 15 tokens) for continuous agent self-orientation.
 *
 * @dft
 * - A1 / A2: Zero I/O, deterministic formatting.
 */

import type { SelfStateEnvelope } from "./types.js";

function formatK(tokens: number): string {
  if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(1)}k`;
  }
  return `${tokens}`;
}

/**
 * Formats the ambient position marker line riding in turn headers.
 * Guarantee: <= 15 tokens.
 */
export function formatAmbientPositionMarker(envelope: SelfStateEnvelope): string {
  const { F1, F2, F3 } = envelope;
  const usedStr = formatK(F1.usedTokens);
  const limitStr = formatK(F1.limitTokens);
  const capPct = F1.capacityPercentage;
  const snr = F1.snrPercentage;
  const route = F3.activeRoute;
  const eventsCount = F2.totalCompactionEvents;

  return `[ENV: F1=${usedStr}/${limitStr} (${capPct}%) SNR=${snr}% | F3=${route} | F2_events=${eventsCount}]`;
}
