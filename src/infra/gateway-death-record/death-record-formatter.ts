/**
 * Pure Formatter & Sanitizer for Gateway Death Records.
 * Goldilocks decomposition unit (< 65 LOC).
 * 
 * @dft:axiom A1 (Pure Decision Core)
 */

import type { ToolCallCommandEntry } from "../tool-command-log/tool-command-types.js";
import type { GatewayDeathRecord, ProcessMemorySnapshot } from "./death-record-types.js";

export function captureProcessMemorySnapshot(): ProcessMemorySnapshot {
  const mem = process.memoryUsage();
  const rssMb = Math.round((mem.rss / (1024 * 1024)) * 10) / 10;
  const heapUsedMb = Math.round((mem.heapUsed / (1024 * 1024)) * 10) / 10;
  const heapTotalMb = Math.round((mem.heapTotal / (1024 * 1024)) * 10) / 10;
  const heapPct = heapTotalMb > 0 ? Math.round((heapUsedMb / heapTotalMb) * 1000) / 10 : 0;

  return { rssMb, heapUsedMb, heapTotalMb, heapPct };
}

export function buildDeathRecord(params: {
  exitCode?: number;
  signal?: string;
  reason?: string;
  startTimeMs: number;
  lastToolCommands: ToolCallCommandEntry[];
}): GatewayDeathRecord {
  const now = Date.now();
  const uptimeSeconds = Math.max(0, Math.round((now - params.startTimeMs) / 1000));

  return {
    timestamp: now,
    uptimeSeconds,
    exitCode: params.exitCode,
    signal: params.signal,
    reason: params.reason ? String(params.reason).slice(0, 300) : undefined,
    memory: captureProcessMemorySnapshot(),
    lastToolCommands: params.lastToolCommands.slice(-5),
  };
}
