import { n as OpenClawConfig } from "./types.openclaw-szgVaeve.js";
import { t as AcpSessionStoreEntry } from "./manager-Dbcozl2i.js";
import { m as ThreadBindingTargetKind, p as ThreadBindingRecord } from "./thread-bindings.manager-Bp7YA_6W.js";
//#region extensions/discord/src/monitor/thread-bindings.config.d.ts
declare function resolveDiscordThreadBindingIdleTimeoutMs(params: {
  cfg: OpenClawConfig;
  accountId?: string;
}): number;
declare function resolveDiscordThreadBindingMaxAgeMs(params: {
  cfg: OpenClawConfig;
  accountId?: string;
}): number;
//#endregion
//#region extensions/discord/src/monitor/thread-bindings.lifecycle.d.ts
type AcpThreadBindingReconciliationResult = {
  checked: number;
  removed: number;
  staleSessionKeys: string[];
};
type AcpThreadBindingHealthStatus = "healthy" | "stale" | "uncertain";
type AcpThreadBindingHealthProbe = (params: {
  cfg: OpenClawConfig;
  accountId: string;
  sessionKey: string;
  binding: ThreadBindingRecord;
  session: AcpSessionStoreEntry;
}) => Promise<{
  status: AcpThreadBindingHealthStatus;
  reason?: string;
}>;
declare function listThreadBindingsForAccount(accountId?: string): ThreadBindingRecord[];
declare function listThreadBindingsBySessionKey(params: {
  targetSessionKey: string;
  accountId?: string;
  targetKind?: ThreadBindingTargetKind;
}): ThreadBindingRecord[];
declare function autoBindSpawnedDiscordSubagent(params: {
  cfg: OpenClawConfig;
  accountId?: string;
  channel?: string;
  to?: string;
  threadId?: string | number;
  childSessionKey: string;
  agentId: string;
  label?: string;
  boundBy?: string;
}): Promise<ThreadBindingRecord | null>;
declare function unbindThreadBindingsBySessionKey(params: {
  targetSessionKey: string;
  accountId?: string;
  targetKind?: ThreadBindingTargetKind;
  reason?: string;
  sendFarewell?: boolean;
  farewellText?: string;
}): ThreadBindingRecord[];
declare function reconcileAcpThreadBindingsOnStartup(params: {
  cfg: OpenClawConfig;
  accountId?: string;
  sendFarewell?: boolean;
  healthProbe?: AcpThreadBindingHealthProbe;
}): Promise<AcpThreadBindingReconciliationResult>;
//#endregion
export { reconcileAcpThreadBindingsOnStartup as a, resolveDiscordThreadBindingMaxAgeMs as c, listThreadBindingsForAccount as i, autoBindSpawnedDiscordSubagent as n, unbindThreadBindingsBySessionKey as o, listThreadBindingsBySessionKey as r, resolveDiscordThreadBindingIdleTimeoutMs as s, AcpThreadBindingReconciliationResult as t };