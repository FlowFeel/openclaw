import { r as OpenClawConfig } from "./types.openclaw-DqdTE9e3.js";
import { r as LogLevel } from "./subsystem-RmDRaRJV.js";
import { t as appendRegularFile } from "./regular-file-DpzSrl_i.js";
import { Logger } from "tslog";

//#region src/logging/config.d.ts
/** Avoids config reads that can mutate or validate config while schema/config commands run. */
declare function shouldSkipMutatingLoggingConfigRead(argv?: string[]): boolean;
//#endregion
//#region src/logging/logger-file-transport.d.ts
type FileLogAppender = typeof appendRegularFile;
/** Enqueues one serialized record without waiting for filesystem I/O. */
/** Waits until every record currently queued for the async transport has settled. */
declare function flushFileLogQueue(): Promise<void>;
/** Synchronously rescues pending records for process.exit() and crash-adjacent paths. */
declare function drainFileLogQueueSync(): void;
declare function setFileLogQueueMaxRecordsForTests(value?: number): void;
declare function setFileLogAppenderForTests(value?: FileLogAppender): void;
declare function resetFileLogTransportForTests(): void;
//#endregion
//#region src/logging/types.d.ts
type ConsoleStyle = "pretty" | "compact" | "json";
/** User-configurable logger settings after config/env normalization. */
type LoggerSettings = {
  level?: LogLevel;
  file?: string;
  maxFileBytes?: number;
  consoleLevel?: LogLevel;
  consoleStyle?: ConsoleStyle;
};
//#endregion
//#region src/logging/logger.d.ts
declare const DEFAULT_LOG_DIR: string;
declare const DEFAULT_LOG_FILE: string;
type LogObj = {
  date?: Date;
} & Record<string, unknown>;
type ResolvedSettings = {
  level: LogLevel;
  file: string;
  maxFileBytes: number;
};
type LoggerResolvedSettings = ResolvedSettings;
type LoggerConfigLoader = () => OpenClawConfig["logging"] | undefined;
type HostnameResolver = () => string;
declare function setLoggerConfigLoaderForTests(loader?: LoggerConfigLoader): void;
declare function isFileLogLevelEnabled(level: LogLevel): boolean;
declare function getLogger(): Logger<LogObj>;
declare function getChildLogger(bindings?: Record<string, unknown>, opts?: {
  level?: LogLevel;
}): Logger<LogObj>;
declare function toPinoLikeLogger(logger: Logger<LogObj>, level: LogLevel): PinoLikeLogger;
type PinoLikeLogger = {
  level: string;
  child: (bindings?: Record<string, unknown>) => PinoLikeLogger;
  trace: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  fatal: (...args: unknown[]) => void;
};
declare function getResolvedLoggerSettings(): LoggerResolvedSettings;
/** Flushes queued file logs before a graceful owner exits the process. */
declare function flushLogger(): Promise<void>;
declare function setLoggerOverride(settings: LoggerSettings | null): void;
declare function resetLogger(): void;
declare const testApi: {
  drainFileLogQueueSyncForTests: typeof drainFileLogQueueSync;
  flushFileLogQueueForTests: typeof flushFileLogQueue;
  resetFileLogTransportForTests: typeof resetFileLogTransportForTests;
  resolveActiveLogFile: typeof resolveActiveLogFile;
  setFileLogAppenderForTests: typeof setFileLogAppenderForTests;
  setFileLogQueueMaxRecordsForTests: typeof setFileLogQueueMaxRecordsForTests;
  setHostnameResolverForTests: (resolver?: HostnameResolver) => void;
  shouldSkipMutatingLoggingConfigRead: typeof shouldSkipMutatingLoggingConfigRead;
};
declare function resolveActiveLogFile(file: string): string;
//#endregion
export { flushLogger as a, getResolvedLoggerSettings as c, setLoggerConfigLoaderForTests as d, setLoggerOverride as f, LoggerSettings as h, PinoLikeLogger as i, isFileLogLevelEnabled as l, toPinoLikeLogger as m, DEFAULT_LOG_FILE as n, getChildLogger as o, testApi as p, LoggerResolvedSettings as r, getLogger as s, DEFAULT_LOG_DIR as t, resetLogger as u };