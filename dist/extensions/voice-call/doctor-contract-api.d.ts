import { n as OpenClawConfig } from "../../types.openclaw-CXX8ljmy.js";
import { t as PluginDoctorStateMigration } from "../../runtime-doctor-DnmyFDWc.js";

//#region extensions/voice-call/doctor-contract-api.d.ts
/** Return Voice Call agents whose templated core session stores need migration. */
declare function resolveSessionStoreAgentIds(params: {
  cfg: OpenClawConfig;
}): string[];
/** Doctor migrations owned by the voice-call plugin. */
declare const stateMigrations: PluginDoctorStateMigration[];
//#endregion
export { resolveSessionStoreAgentIds, stateMigrations };