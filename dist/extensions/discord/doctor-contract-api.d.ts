import { n as OpenClawConfig } from "../../types.openclaw-lExroEnq.js";
import { f as ChannelDoctorConfigMutation, p as ChannelDoctorLegacyConfigRule } from "../../setup-wizard-types-Bj4z83z4.js";
//#region extensions/discord/src/doctor-contract.d.ts
declare const legacyConfigRules: ChannelDoctorLegacyConfigRule[];
declare function normalizeCompatibilityConfig({
  cfg
}: {
  cfg: OpenClawConfig;
}): ChannelDoctorConfigMutation;
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig };