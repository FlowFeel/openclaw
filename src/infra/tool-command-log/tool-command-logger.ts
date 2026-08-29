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

function resolveDefaultLogPath(): string {
  if (process.env.OPENCLAW_TOOL_FLIGHT_LOG) {
    return process.env.OPENCLAW_TOOL_FLIGHT_LOG;
  }
  const persistentDir = "/home/node/.openclaw/workspace/logs";
  try {
    if (fs.existsSync(persistentDir) || fs.mkdirSync(persistentDir, { recursive: true })) {
      return path.join(persistentDir, "tool-call-commands.jsonl");
    }
  } catch {
    // Fall back to /tmp if workspace/logs is unwritable
  }
  return "/tmp/openclaw/tool-call-commands.jsonl";
}

function ensureLegacySymlink(targetPath: string): void {
  const legacyPath = "/tmp/openclaw/tool-call-commands.jsonl";
  if (targetPath === legacyPath) return;
  try {
    const legacyDir = path.dirname(legacyPath);
    if (!fs.existsSync(legacyDir)) {
      fs.mkdirSync(legacyDir, { recursive: true });
    }
    const stat = fs.existsSync(legacyPath) ? fs.lstatSync(legacyPath) : null;
    if (stat) {
      if (stat.isSymbolicLink()) {
        try {
          if (fs.readlinkSync(legacyPath) === targetPath) return;
        } catch {}
      }
      fs.unlinkSync(legacyPath);
    }
    fs.symlinkSync(targetPath, legacyPath);
  } catch {
    // Non-blocking symlink guarantee
  }
}

const DEFAULT_CONFIG: FlightRecorderConfig = {
  logFilePath: resolveDefaultLogPath(),
  maxFileSizeBytes: 10 * 1024 * 1024, // 10MB
  enabled: true,
};

export class ToolCommandLogger {
  private config: FlightRecorderConfig;

  constructor(config?: Partial<FlightRecorderConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  private getLogFilePath(): string {
    return process.env.OPENCLAW_TOOL_FLIGHT_LOG ?? this.config.logFilePath;
  }

  public record(entry: ToolCallCommandEntry): void {
    if (!this.config.enabled) return;

    try {
      const logPath = this.getLogFilePath();
      const line = formatFlightLogLine(entry) + "\n";
      const dir = path.dirname(logPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      ensureLegacySymlink(logPath);

      this.checkAndRotate(line.length);
      fs.appendFileSync(logPath, line, "utf8");
    } catch {
      // Non-blocking failure guarantee: recording never throws into the active turn
    }
  }

  public readRecent(limit: number = 20): ToolCallCommandEntry[] {
    const logPath = this.getLogFilePath();
    if (!fs.existsSync(logPath)) {
      return [];
    }

    try {
      const content = fs.readFileSync(logPath, "utf8");
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
          rawResult: raw.result,
        };
      });
    } catch {
      return [];
    }
  }

  public readByCallId(callId: string): ToolCallCommandEntry | null {
    const logPath = this.getLogFilePath();
    const candidates = [logPath, `${logPath}.1`];
    for (const filePath of candidates) {
      if (!fs.existsSync(filePath)) continue;

      try {
        const content = fs.readFileSync(filePath, "utf8");
        const lines = content.trim().split("\n").filter(Boolean);
        for (let i = lines.length - 1; i >= 0; i--) {
          const raw = JSON.parse(lines[i]);
          if (raw.id === callId) {
            return {
              tool: raw.tool,
              paramsSummary: raw.params,
              ts: raw.ts,
              sessionKey: raw.session,
              turn: raw.turn,
              callId: raw.id,
              heapPct: raw.heap,
              rawResult: raw.result,
            };
          }
        }
      } catch {
        // Continue checking next candidate log file
      }
    }
    return null;
  }

  private checkAndRotate(incomingBytes: number): void {
    try {
      const logPath = this.getLogFilePath();
      if (!fs.existsSync(logPath)) return;
      const stat = fs.statSync(logPath);
      if (stat.size + incomingBytes > this.config.maxFileSizeBytes) {
        const rotated = `${logPath}.1`;
        if (fs.existsSync(rotated)) {
          fs.unlinkSync(rotated);
        }
        fs.renameSync(logPath, rotated);
      }
    } catch {
      // Ignore rotation errors
    }
  }
}

export const globalToolCommandLogger = new ToolCommandLogger();

