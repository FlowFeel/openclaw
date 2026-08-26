/**
 * Agent-Facing Attribution & Tool Intelligence Query Tools.
 * Goldilocks decomposition unit (< 140 LOC).
 * 
 * @dft:axiom A5 (Certified Tool Arity k <= 2)
 */

import { Type } from "typebox";
import { type AnyAgentTool, jsonResult } from "./common.js";
import {
  AttributionRingBuffer,
  queryToolIntelligence,
} from "../../infra/attribution-telemetry/index.js";

// Global in-memory instance
export const globalAttributionRing = new AttributionRingBuffer(1000);

export function createAttributionTools(): AnyAgentTool[] {
  return [
    {
      name: "attribution_inspect",
      label: "Attribution Inspect",
      description: "Query cross-session time-series attribution metrics: turn latency history, queue dwell (p50/p95), concurrency contention drag index, and fleet cache hit ratio.",
      parameters: Type.Object(
        {
          sessionKey: Type.Optional(Type.String({ description: "Target session key (omitted for fleet-wide)." })),
          windowMinutes: Type.Optional(Type.Number({ description: "Sliding window horizon in minutes (default 60)." })),
          limit: Type.Optional(Type.Number({ description: "Max turn records to return (default 20)." })),
        },
        { additionalProperties: false },
      ),
      execute: async (_toolCallId: string, params: { sessionKey?: string; windowMinutes?: number; limit?: number }) => {
        const slice = globalAttributionRing.querySlice({
          sessionKey: params.sessionKey,
          windowMinutes: params.windowMinutes,
          limit: params.limit ?? 20,
        });
        const concurrency = globalAttributionRing.getConcurrencySnapshot();
        const cache = globalAttributionRing.getFleetCacheSummary();

        return jsonResult({
          concurrency,
          cache,
          totalSampled: slice.totalSampled,
          recentTurns: slice.records.map((r) => ({
            id: r.id,
            sessionKey: r.sessionKey,
            wallClockMs: r.wallClockMs,
            queueDwellMs: r.queueDwellMs,
            modelInferenceMs: r.modelInferenceMs,
            tokens: { prompt: r.promptTokens, completion: r.completionTokens, total: r.totalTokens },
            cacheHit: r.cacheHit,
          })),
        });
      },
    },
    {
      name: "tool_intelligence_query",
      label: "Tool Intelligence Query",
      description: "Query structured, zero-chaff tool execution logs and web search history for feedback and intelligence.",
      parameters: Type.Object(
        {
          toolName: Type.Optional(Type.String({ description: "Filter by tool name (e.g. 'web_search', 'view_file')." })),
          searchQuery: Type.Optional(Type.String({ description: "Filter by search query substring." })),
          limit: Type.Optional(Type.Number({ description: "Max events to return (default 20)." })),
        },
        { additionalProperties: false },
      ),
      execute: async (_toolCallId: string, params: { toolName?: string; searchQuery?: string; limit?: number }) => {
        const events = queryToolIntelligence({
          toolName: params.toolName,
          searchQuery: params.searchQuery,
          limit: params.limit ?? 20,
        });

        return jsonResult({
          count: events.length,
          events,
        });
      },
    },
  ];
}
