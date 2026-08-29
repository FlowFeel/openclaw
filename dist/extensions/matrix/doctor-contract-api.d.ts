import { n as OpenClawConfig } from "../../types.openclaw-szgVaeve.js";
import { f as ChannelDoctorConfigMutation, p as ChannelDoctorLegacyConfigRule } from "../../setup-wizard-types-BLKR4ulg.js";
import { t as PluginDoctorStateMigration } from "../../runtime-doctor-LUjvM2kG.js";
//#region extensions/matrix/src/doctor-contract.d.ts
declare const legacyConfigRules: ChannelDoctorLegacyConfigRule[];
declare function normalizeCompatibilityConfig({
  cfg
}: {
  cfg: OpenClawConfig;
}): ChannelDoctorConfigMutation;
//#endregion
//#region extensions/matrix/doctor-contract-api.d.ts
declare const stateMigrations: PluginDoctorStateMigration[];
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig, stateMigrations };