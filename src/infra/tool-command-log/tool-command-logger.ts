/**
 * File-Backed Append Logger for Gateway Tool Flight Recorder.
 * Goldilocks decomposition unit (< 115 LOC).
 * 
 * @dft:axiom A3 (Observability & Controllability)
 */

import fs from "node:fs";
import path from "node:path";
import { formatFlightLogLine } from "./tool-command-formatter.js";
import type { FlightRecorderConfig, ToolCallCommandEntry } from "./tool-command-types.js";

const DEFAULT_CONFIG: FlightRecorderConfig = {
  logFilePath: process.env.OPENCLAW_TOOL_FLIGHT_LOG ?? "/tmp/openclaw/tool-call-commands.jsonl",
  maxFileSizeBytes: 10 * 1024 * 1024, // 10MB
  enabled: true,
};

export class ToolCommandLogger {
  private config: FlightRecorderConfig;

  constructor(config?: Partial<FlightRecorderConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  public record(entry: ToolCallCommandEntry): void {
    if (!this.config.enabled) return;

    try {
      const line = formatFlightLogLine(entry) + "\n";
      const dir = path.dirname(this.config.logFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      this.checkAndRotate(line.length);
      fs.appendFileSync(this.config.logFilePath, line, "utf8");
    } catch {
      // Non-blocking failure guarantee: recording never throws into the active turn
    }
  }

  public readRecent(limit: number = 20): ToolCallCommandEntry[] {
    if (!fs.existsSync(this.config.logFilePath)) {
      return [];
    }

    try {
      const content = fs.readFileSync(this.config.logFilePath, "utf8");
      const lines = content.trim().split("\n").filter(Boolean);
      const slice = lines.slice(-limit);
      return slice.map((line) => {
        const raw = JSON.parse(line);
        return {
          tool: raw.tool,
          paramsSummary: raw.params,
          ts: raw.ts,
          sessionKey: raw.session,
          turn: raw.turn,
          callId: raw.id,
          heapPct: raw.heap,
        };
      });
    } catch {
      return [];
    }
  }

  private checkAndRotate(incomingBytes: number): void {
    try {
      if (!fs.existsSync(this.config.logFilePath)) return;
      const stat = fs.statSync(this.config.logFilePath);
      if (stat.size + incomingBytes > this.config.maxFileSizeBytes) {
        const rotated = `${this.config.logFilePath}.1`;
        if (fs.existsSync(rotated)) {
          fs.unlinkSync(rotated);
        }
        fs.renameSync(this.config.logFilePath, rotated);
      }
    } catch {
      // Ignore rotation errors
    }
  }
}

export const globalToolCommandLogger = new ToolCommandLogger();
