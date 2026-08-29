import { n as OpenClawConfig } from "../../types.openclaw-szgVaeve.js";
import { f as ChannelDoctorConfigMutation, p as ChannelDoctorLegacyConfigRule } from "../../setup-wizard-types-BLKR4ulg.js";
//#region extensions/discord/src/doctor-contract.d.ts
declare const legacyConfigRules: ChannelDoctorLegacyConfigRule[];
declare function normalizeCompatibilityConfig({
  cfg
}: {
  cfg: OpenClawConfig;
}): ChannelDoctorConfigMutation;
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig };