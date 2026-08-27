/**
 * Process Lifecycle Exit & Crash Hook Installer.
 * Goldilocks decomposition unit (< 90 LOC).
 * 
 * @dft:axiom A3 (Observability & Controllability)
 */

import { globalToolCommandLogger } from "../tool-command-log/tool-command-logger.js";
import { buildDeathRecord } from "./death-record-formatter.js";
import { globalDeathRecordStorage } from "./death-record-storage.js";

let isHookInstalled = false;
let processStartTime = Date.now();

export function installGatewayDeathRecordHook(startTimeMs: number = Date.now()): void {
  if (isHookInstalled) return;
  isHookInstalled = true;
  processStartTime = startTimeMs;

  const handleTermination = (signal?: string, exitCode?: number, reason?: string) => {
    try {
      const recent = globalToolCommandLogger.readRecent(5);
      const record = buildDeathRecord({
        exitCode,
        signal,
        reason,
        startTimeMs: processStartTime,
        lastToolCommands: recent,
      });
      globalDeathRecordStorage.write(record);
    } catch {
      // Never throw in exit handler
    }
  };

  process.once("exit", (code) => handleTermination(undefined, code, "process.exit"));
  process.once("SIGTERM", () => handleTermination("SIGTERM", 143, "SIGTERM received"));
  process.once("SIGINT", () => handleTermination("SIGINT", 130, "SIGINT received"));

  process.on("uncaughtException", (err) => {
    handleTermination(undefined, 1, `uncaughtException: ${err?.message ?? err}`);
  });

  process.on("unhandledRejection", (reason) => {
    handleTermination(undefined, 1, `unhandledRejection: ${String(reason)}`);
  });
}
