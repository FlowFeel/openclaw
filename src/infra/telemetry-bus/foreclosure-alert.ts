/**
 * Pure Decision Core: Ambient Foreclosure Alert Header Generator.
 * Goldilocks decomposition unit (< 80 LOC).
 * 
 * Axiom:
 * Emits terse ambient alert header when token capacity >= 85%,
 * enabling zero-tool proactive foreclosure awareness.
 */

import type { Frame1Position } from "./types.js";

/**
 * Purely formats an ambient turn header with foreclosure warning when above threshold.
 */
export function formatAmbientForeclosureHeader(f1: Frame1Position): string | null {
  if (!f1.isForeclosureImminent && f1.capacityPct < 85) {
    return null;
  }

  const usedK = (f1.usedTokens / 1000).toFixed(1);
  const limitK = (f1.limitTokens / 1000).toFixed(0);

  return `[⚠️ CAPACITY: ${usedK}k/${limitK}k (${f1.capacityPct}%) — FORECLOSURE IMMINENT: Externalize working state before compaction]`;
}
