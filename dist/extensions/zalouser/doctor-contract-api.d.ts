import { n as OpenClawConfig } from "../../types.openclaw-BsftVpqJ.js";
import { i as ChannelDoctorLegacyConfigRule, r as ChannelDoctorConfigMutation } from "../../types.public-CFhLhhWm.js";
import { t as PluginDoctorStateMigration } from "../../runtime-doctor-BPlcx0N8.js";
//#region extensions/zalouser/src/doctor-contract.d.ts
declare const legacyConfigRules: ChannelDoctorLegacyConfigRule[];
declare function normalizeCompatibilityConfig(params: {
  cfg: OpenClawConfig;
}): ChannelDoctorConfigMutation;
//#endregion
//#region extensions/zalouser/doctor-contract-api.d.ts
declare const stateMigrations: PluginDoctorStateMigration[];
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig, stateMigrations };