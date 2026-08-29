/**
 * Standalone Tool Result Fetcher from Gateway Cold Storage Flight Recorder.
 * 
 * @dft:axiom A3 (Observability & Controllability)
 * Hook H3: tool_result_fetch(call_id) re-hydrates un-truncated raw outputs.
 */

import { Type } from "typebox";
import { globalToolCommandLogger } from "../../infra/tool-command-log/index.js";
import type { AgentTool } from "../runtime/index.js";
import { jsonResult, readStringParam } from "./common.js";

const TOOL_RESULT_FETCH_DISPLAY_SUMMARY = "Fetch un-truncated tool execution payload by call ID";

const ToolResultFetchSchema = Type.Object(
  {
    call_id: Type.Optional(Type.String({ description: "The tool call ID to look up in flight recorder" })),
    callId: Type.Optional(Type.String({ description: "Alias for call_id" })),
  },
  { additionalProperties: false },
);

export function createToolResultFetchTool(): AgentTool {
  return {
    label: "Tool Result Fetch",
    name: "tool_result_fetch",
    displaySummary: TOOL_RESULT_FETCH_DISPLAY_SUMMARY,
    description:
      "Fetch the 100% full untruncated raw output payload of a previous tool execution from the flight recorder by call ID.",
    parameters: ToolResultFetchSchema,
    execute: async (_toolCallId, args) => {
      const params = args as Record<string, unknown>;
      const callId = readStringParam(params, "call_id") ?? readStringParam(params, "callId");

      if (!callId || !callId.trim()) {
        return jsonResult({
          status: "error",
          error: "Missing required parameter: call_id",
        });
      }

      const entry = globalToolCommandLogger.readByCallId(callId.trim());
      if (!entry) {
        return jsonResult({
          status: "error",
          callId: callId.trim(),
          error: `Tool call ID "${callId.trim()}" was not found in the flight recorder log.`,
        });
      }

      return jsonResult({
        status: "ok",
        callId: entry.callId,
        tool: entry.tool,
        rawResult: entry.rawResult ?? entry.paramsSummary,
        paramsSummary: entry.paramsSummary,
        timestamp: entry.ts,
        sessionKey: entry.sessionKey,
        turn: entry.turn,
        heapPct: entry.heapPct,
      });
    },
  };
}
