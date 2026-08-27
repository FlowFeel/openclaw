import { n as OpenClawConfig } from "../../types.openclaw-lExroEnq.js";
import { f as ChannelDoctorConfigMutation, p as ChannelDoctorLegacyConfigRule } from "../../setup-wizard-types-Bj4z83z4.js";
import { t as PluginDoctorStateMigration } from "../../runtime-doctor-M8C1YjRv.js";
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