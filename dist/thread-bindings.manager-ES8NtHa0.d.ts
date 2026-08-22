import { n as OpenClawConfig } from "./types.openclaw-DlZm98yj.js";
//#region extensions/discord/src/monitor/thread-bindings.types.d.ts
type ThreadBindingTargetKind = "subagent" | "acp";
type ThreadBindingRecord = {
  accountId: string;
  channelId: string;
  threadId: string;
  targetKind: ThreadBindingTargetKind;
  targetSessionKey: string;
  agentId: string;
  label?: string;
  webhookId?: string;
  webhookToken?: string;
  boundBy: string;
  boundAt: number;
  lastActivityAt: number; /** Inactivity timeout window in milliseconds (0 disables inactivity auto-unfocus). */
  idleTimeoutMs?: number; /** Hard max-age window in milliseconds from bind time (0 disables hard cap). */
  maxAgeMs?: number;
  metadata?: Record<string, unknown>;
};
type ThreadBindingManager = {
  accountId: string;
  getIdleTimeoutMs: () => number;
  getMaxAgeMs: () => number;
  getByThreadId: (threadId: string) => ThreadBindingRecord | undefined;
  getBySessionKey: (targetSessionKey: string) => ThreadBindingRecord | undefined;
  listBySessionKey: (targetSessionKey: string) => ThreadBindingRecord[];
  listBindings: () => ThreadBindingRecord[];
  touchThread: (params: {
    threadId: string;
    at?: number;
    persist?: boolean;
  }) => ThreadBindingRecord | null;
  bindTarget: (params: {
    threadId?: string | number;
    channelId?: string;
    createThread?: boolean;
    threadName?: string;
    targetKind: ThreadBindingTargetKind;
    targetSessionKey: string;
    agentId?: string;
    label?: string;
    boundBy?: string;
    introText?: string;
    webhookId?: string;
    webhookToken?: string;
    metadata?: Record<string, unknown>;
  }) => Promise<ThreadBindingRecord | null>;
  unbindThread: (params: {
    threadId: string;
    reason?: string;
    sendFarewell?: boolean;
    farewellText?: string;
  }) => ThreadBindingRecord | null;
  unbindBySessionKey: (params: {
    targetSessionKey: string;
    targetKind?: ThreadBindingTargetKind;
    reason?: string;
    sendFarewell?: boolean;
    farewellText?: string;
  }) => ThreadBindingRecord[];
  stop: () => void;
};
//#endregion
//#region src/channels/thread-bindings-messages.d.ts
/** Formats thread-binding timeout durations for compact user-facing messages. */
declare function formatThreadBindingDurationLabel(durationMs: number): string;
/** Builds the native thread name for a focused thread-bound session. */
declare function resolveThreadBindingThreadName(params: {
  agentId?: string;
  label?: string;
}): string;
/** Builds the system-prefixed intro text posted when a thread binding becomes active. */
declare function resolveThreadBindingIntroText(params: {
  agentId?: string;
  label?: string;
  idleTimeoutMs?: number;
  maxAgeMs?: number;
  sessionCwd?: string;
  sessionDetails?: string[];
}): string;
//#endregion
//#region extensions/discord/src/monitor/thread-bindings.state.d.ts
declare function resolveThreadBindingIdleTimeoutMs(params: {
  record: Pick<ThreadBindingRecord, "idleTimeoutMs">;
  defaultIdleTimeoutMs: number;
}): number;
declare function resolveThreadBindingMaxAgeMs(params: {
  record: Pick<ThreadBindingRecord, "maxAgeMs">;
  defaultMaxAgeMs: number;
}): number;
declare function resolveThreadBindingInactivityExpiresAt(params: {
  record: Pick<ThreadBindingRecord, "lastActivityAt" | "idleTimeoutMs">;
  defaultIdleTimeoutMs: number;
}): number | undefined;
declare function resolveThreadBindingMaxAgeExpiresAt(params: {
  record: Pick<ThreadBindingRecord, "boundAt" | "maxAgeMs">;
  defaultMaxAgeMs: number;
}): number | undefined;
declare function resetThreadBindingsForTests(): void;
//#endregion
//#region extensions/discord/src/monitor/thread-bindings.manager.d.ts
declare function createThreadBindingManager(params: {
  accountId?: string;
  token?: string;
  cfg: OpenClawConfig;
  persist?: boolean;
  enableSweeper?: boolean;
  idleTimeoutMs?: number;
  maxAgeMs?: number;
}): ThreadBindingManager;
declare function createNoopThreadBindingManager(accountId?: string): ThreadBindingManager;
declare function getThreadBindingManager(accountId?: string): ThreadBindingManager | null;
declare const testing: {
  resolveThreadBindingThreadName: typeof resolveThreadBindingThreadName;
  resetThreadBindingsForTests: typeof resetThreadBindingsForTests;
  runThreadBindingSweepForAccount: (accountId?: string) => Promise<void>;
};
//#endregion
export { resolveThreadBindingIdleTimeoutMs as a, resolveThreadBindingMaxAgeMs as c, resolveThreadBindingThreadName as d, ThreadBindingManager as f, testing as i, formatThreadBindingDurationLabel as l, ThreadBindingTargetKind as m, createThreadBindingManager as n, resolveThreadBindingInactivityExpiresAt as o, ThreadBindingRecord as p, getThreadBindingManager as r, resolveThreadBindingMaxAgeExpiresAt as s, createNoopThreadBindingManager as t, resolveThreadBindingIntroText as u };