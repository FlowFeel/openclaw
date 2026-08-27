/**
 * Per-Session Long-Run Disk Delta & Resource Attribution.
 * Goldilocks decomposition unit (< 100 LOC).
 */

import fs from "node:fs";
import type { ResourceAttributionRecord } from "./types.js";

const sessionResourceLedger = new Map<string, { lastBytes: number; accumulatedLogGrowth: number }>();

/**
 * Pure & boundary measurement of per-session transcript file disk contribution.
 */
export function recordSessionDiskAttribution(sessionKey: string, transcriptPath: string): ResourceAttributionRecord {
  let transcriptBytes = 0;
  try {
    if (fs.existsSync(transcriptPath)) {
      const stats = fs.statSync(transcriptPath);
      transcriptBytes = stats.size;
    }
  } catch {
    // Non-fatal if transcript is inaccessible
  }

  const prev = sessionResourceLedger.get(sessionKey) ?? { lastBytes: 0, accumulatedLogGrowth: 0 };
  const delta = Math.max(0, transcriptBytes - prev.lastBytes);
  const accumulatedLogGrowth = prev.accumulatedLogGrowth + delta;

  sessionResourceLedger.set(sessionKey, {
    lastBytes: transcriptBytes,
    accumulatedLogGrowth,
  });

  return {
    sessionKey,
    timestamp: Date.now(),
    transcriptBytes,
    logBytesDelta: delta,
    memoryAllocMb: parseFloat((process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2)),
  };
}

export function getSessionResourceUsage(sessionKey: string): { transcriptBytes: number; accumulatedLogGrowth: number } {
  return sessionResourceLedger.get(sessionKey) ?? { transcriptBytes: 0, accumulatedLogGrowth: 0 };
}

export function getAllSessionResourceUsage(): Record<string, { transcriptBytes: number; accumulatedLogGrowth: number }> {
  const result: Record<string, { transcriptBytes: number; accumulatedLogGrowth: number }> = {};
  for (const [key, val] of sessionResourceLedger.entries()) {
    result[key] = { ...val };
  }
  return result;
}
