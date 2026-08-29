/**
 * Pure Parameter Condenser & Semantic Intent Extractor.
 * Goldilocks decomposition unit (< 85 LOC).
 * 
 * @dft:axiom A1 (Pure Decision Core)
 * @dft:axiom A4 (Bounded Channel Economics <= 180B)
 */

import type { ToolCallCommandEntry } from "./tool-command-types.js";

const MAX_SUMMARY_CHARS = 100;

export function condenseToolParameters(toolName: string, rawParams: unknown): string {
  if (!rawParams || typeof rawParams !== "object") {
    return String(rawParams ?? "").slice(0, MAX_SUMMARY_CHARS);
  }

  const record = rawParams as Record<string, unknown>;

  switch (toolName.toLowerCase()) {
    case "exec":
    case "bash":
    case "terminal": {
      const cmd = String(record.command ?? record.cmd ?? record.script ?? "").trim();
      return cmd.replace(/\s+/g, " ").slice(0, MAX_SUMMARY_CHARS);
    }
    case "web_search":
    case "search": {
      const query = String(record.query ?? record.q ?? "").trim();
      return `query: ${query}`.slice(0, MAX_SUMMARY_CHARS);
    }
    case "sessions_spawn":
    case "subagent": {
      const task = String(record.task ?? record.prompt ?? "").trim();
      const agent = record.agentId ? ` [${record.agentId}]` : "";
      return `task:${agent} ${task}`.replace(/\s+/g, " ").slice(0, MAX_SUMMARY_CHARS);
    }
    case "read":
    case "write":
    case "view_file":
    case "edit_file": {
      const path = String(record.path ?? record.file ?? record.targetFile ?? record.absolutePath ?? "").trim();
      return `path: ${path}`.slice(0, MAX_SUMMARY_CHARS);
    }
    default: {
      // General fallback: pick first 2 non-empty string fields
      const parts: string[] = [];
      for (const [key, val] of Object.entries(record)) {
        if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
          parts.push(`${key}=${val}`);
          if (parts.length >= 2) break;
        }
      }
      return parts.join(", ").slice(0, MAX_SUMMARY_CHARS);
    }
  }
}

export function formatFlightLogLine(entry: ToolCallCommandEntry): string {
  const cleanSummary = entry.paramsSummary.replace(/[\r\n\t]+/g, " ").trim();
  const payload = {
    tool: entry.tool,
    params: cleanSummary,
    ts: entry.ts,
    session: entry.sessionKey,
    turn: entry.turn,
    ...(entry.callId ? { id: entry.callId } : {}),
    ...(typeof entry.heapPct === "number" ? { heap: Math.round(entry.heapPct) } : {}),
    ...(entry.rawResult !== undefined ? { result: entry.rawResult } : {}),
  };
  return JSON.stringify(payload);
}
