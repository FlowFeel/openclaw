import { p as ThreadBindingRecord } from "./thread-bindings.manager-ES8NtHa0.js";
//#region extensions/discord/src/monitor/thread-bindings.persona.d.ts
declare function resolveThreadBindingPersona(params: {
  label?: string;
  agentId?: string;
}): string;
declare function resolveThreadBindingPersonaFromRecord(record: ThreadBindingRecord): string;
//#endregion
//#region extensions/discord/src/monitor/thread-bindings.session-updates.d.ts
declare function setThreadBindingIdleTimeoutBySessionKey(params: {
  targetSessionKey: string;
  accountId?: string;
  idleTimeoutMs: number;
}): ThreadBindingRecord[];
declare function setThreadBindingMaxAgeBySessionKey(params: {
  targetSessionKey: string;
  accountId?: string;
  maxAgeMs: number;
}): ThreadBindingRecord[];
//#endregion
export { resolveThreadBindingPersonaFromRecord as i, setThreadBindingMaxAgeBySessionKey as n, resolveThreadBindingPersona as r, setThreadBindingIdleTimeoutBySessionKey as t };