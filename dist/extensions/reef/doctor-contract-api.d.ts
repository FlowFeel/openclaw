import { n as OpenClawConfig } from "../../types.openclaw-CXX8ljmy.js";
import { i as ChannelDoctorLegacyConfigRule } from "../../types.public-DrgteDAF.js";
import { t as PluginDoctorStateMigration } from "../../runtime-doctor-DnmyFDWc.js";
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