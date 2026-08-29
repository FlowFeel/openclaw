import { n as OpenClawConfig } from "../../types.openclaw-DPyC_juj.js";
import { f as ChannelDoctorConfigMutation, p as ChannelDoctorLegacyConfigRule } from "../../setup-wizard-types-qbnj3m4f.js";
import { t as PluginDoctorStateMigration } from "../../runtime-doctor-5ajEAr5f.js";
//#region extensions/msteams/doctor-contract-api.d.ts
declare const legacyConfigRules: ChannelDoctorLegacyConfigRule[];
declare function normalizeCompatibilityConfig({
  cfg
}: {
  cfg: OpenClawConfig;
}): ChannelDoctorConfigMutation;
declare const stateMigrations: PluginDoctorStateMigration[];
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig, stateMigrations };