import { n as RuntimeEnv } from "./runtime-DRcp7-j9.js";

//#region src/logger.d.ts
declare function logInfo(message: string, runtime?: RuntimeEnv): void;
declare function logWarn(message: string, runtime?: RuntimeEnv): void;
declare function logSuccess(message: string, runtime?: RuntimeEnv): void;
declare function logError(message: string, runtime?: RuntimeEnv): void;
declare function logDebug(message: string): void;
//#endregion
//#region src/logging/redact-identifier.d.ts
/** Returns a stable sha256 hex prefix for non-secret identifier correlation. */
declare function sha256HexPrefix(value: string, len?: number): string;
/** Redacts an identifier to a stable hash label, or "-" for missing values. */
declare function redactIdentifier(value: string | undefined, opts?: {
  len?: number;
}): string;
//#endregion
export { logInfo as a, logError as i, sha256HexPrefix as n, logSuccess as o, logDebug as r, logWarn as s, redactIdentifier as t };