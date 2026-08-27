import { n as OpenClawConfig } from "../../types.openclaw-DZDgdSgX.js";
import { i as ChannelDoctorLegacyConfigRule } from "../../types.public-DAdSmWXH.js";
import { t as PluginDoctorStateMigration } from "../../runtime-doctor-C5vGzI3l.js";
//#region extensions/reef/doctor-contract-api.d.ts
declare const legacyConfigRules: ChannelDoctorLegacyConfigRule[];
declare function normalizeCompatibilityConfig({
  cfg
}: {
  cfg: OpenClawConfig;
}): {
  config: OpenClawConfig;
  changes: string[];
};
declare const stateMigrations: PluginDoctorStateMigration[];
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig, stateMigrations };