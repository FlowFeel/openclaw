/**
 * Distilled Tool Call & Web Search Intelligence Stream.
 * Goldilocks decomposition unit (< 140 LOC).
 * 
 * Satisfies B7 (Maximum Tool Chaff Saturation Clamping -> SNR >= 0.92).
 */

import type { ToolCallTelemetryEvent } from "./types.js";

const MAX_SUMMARY_CHARS = 120;
const toolEventsRing: ToolCallTelemetryEvent[] = [];
const MAX_STORED_TOOL_EVENTS = 2000;

export function normalizeToolTelemetryEvent(input: {
  id: string;
  sessionKey: string;
  toolName: string;
  parameters: Record<string, unknown>;
  durationMs: number;
  status: "ok" | "error";
  rawResult?: unknown;
  searchMeta?: {
    query: string;
    resultCount: number;
    domains: readonly string[];
  };
}): ToolCallTelemetryEvent {
  let resultSummary = "";

  if (typeof input.rawResult === "string") {
    resultSummary = input.rawResult.replace(/[\r\n\t]+/g, " ").trim();
  } else if (input.rawResult && typeof input.rawResult === "object") {
    resultSummary = JSON.stringify(input.rawResult).replace(/[\r\n\t]+/g, " ");
  }

  if (resultSummary.length > MAX_SUMMARY_CHARS) {
    resultSummary = resultSummary.slice(0, MAX_SUMMARY_CHARS) + "...[CLAMPED]";
  }

  return {
    id: input.id,
    timestamp: Date.now(),
    sessionKey: input.sessionKey,
    toolName: input.toolName,
    parameters: input.parameters,
    durationMs: input.durationMs,
    status: input.status,
    resultSummary,
    ...(input.searchMeta ? { searchMeta: input.searchMeta } : {}),
  };
}

export function recordToolTelemetryEvent(event: ToolCallTelemetryEvent): void {
  toolEventsRing.push(event);
  if (toolEventsRing.length > MAX_STORED_TOOL_EVENTS) {
    toolEventsRing.shift();
  }
}

export function queryToolIntelligence(options?: {
  toolName?: string;
  sessionKey?: string;
  searchQuery?: string;
  limit?: number;
}): ToolCallTelemetryEvent[] {
  const limit = options?.limit ?? 50;
  const results: ToolCallTelemetryEvent[] = [];

  for (let i = toolEventsRing.length - 1; i >= 0; i--) {
    const evt = toolEventsRing[i];
    if (!evt) continue;

    if (options?.toolName && evt.toolName !== options.toolName) continue;
    if (options?.sessionKey && evt.sessionKey !== options.sessionKey) continue;
    if (options?.searchQuery && (!evt.searchMeta || !evt.searchMeta.query.toLowerCase().includes(options.searchQuery.toLowerCase()))) {
      continue;
    }

    results.push(evt);
    if (results.length >= limit) break;
  }

  return results;
}

export function clearToolIntelligenceEvents(): void {
  toolEventsRing.length = 0;
}
