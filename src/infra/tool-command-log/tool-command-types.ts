/**
 * Pure Data Models & Types for Gateway Tool Command Flight Recorder.
 * Goldilocks decomposition unit (< 40 LOC).
 * 
 * @dft:axiom A1 (Pure Decision Core)
 */

export type ToolCallCommandEntry = {
  tool: string;
  paramsSummary: string;
  ts: number;
  sessionKey: string;
  turn: number;
  callId?: string;
  heapPct?: number;
  rawResult?: string;
};

export type FlightRecorderConfig = {
  logFilePath: string;
  maxFileSizeBytes: number;
  maxEntries?: number;
  enabled?: boolean;
};

export type ToolCommandSummary = {
  tool: string;
  paramsSummary: string;
};
