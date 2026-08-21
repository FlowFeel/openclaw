import { n as peekSystemEventEntries, r as resetSystemEventsForTest, t as enqueueSystemEvent } from "../system-events-DSDPR1Ic.js";

//#region src/config/sessions/main-session.runtime.d.ts
/** Resolves the main session key from the active runtime config. */
declare function resolveMainSessionKeyFromConfig(): string;
//#endregion
export { enqueueSystemEvent, peekSystemEventEntries, resetSystemEventsForTest, resolveMainSessionKeyFromConfig };