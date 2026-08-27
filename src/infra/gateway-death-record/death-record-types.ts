/**
 * Pure Data Models for Gateway Process Death Record.
 * Goldilocks decomposition unit (< 35 LOC).
 * 
 * @dft:axiom A1 (Pure Decision Core)
 */

import type { ToolCallCommandEntry } from "../tool-command-log/tool-command-types.js";

export type ProcessMemorySnapshot = {
  rssMb: number;
  heapUsedMb: number;
  heapTotalMb: number;
  heapPct: number;
};

export type GatewayDeathRecord = {
  timestamp: number;
  uptimeSeconds: number;
  exitCode?: number;
  signal?: string;
  reason?: string;
  memory: ProcessMemorySnapshot;
  lastToolCommands: ToolCallCommandEntry[];
};
