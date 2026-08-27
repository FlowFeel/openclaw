import { n as OpenClawConfig } from "../../types.openclaw-DZDgdSgX.js";
import { i as ChannelDoctorLegacyConfigRule, r as ChannelDoctorConfigMutation } from "../../types.public-DAdSmWXH.js";
import { t as PluginDoctorStateMigration } from "../../runtime-doctor-C5vGzI3l.js";
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