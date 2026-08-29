import { n as OpenClawConfig } from "../../types.openclaw-BsftVpqJ.js";
import { i as ChannelDoctorLegacyConfigRule } from "../../types.public-CFhLhhWm.js";
import { t as PluginDoctorStateMigration } from "../../runtime-doctor-BPlcx0N8.js";
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