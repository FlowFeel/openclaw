import { n as OpenClawConfig } from "../../types.openclaw-lExroEnq.js";
import { f as ChannelDoctorConfigMutation, ln as LegacyConfigRule } from "../../setup-wizard-types-tI_i6S_W.js";
//#region extensions/nextcloud-talk/src/doctor-contract.d.ts
declare const legacyConfigRules: LegacyConfigRule[];
declare function normalizeCompatibilityConfig({
  cfg
}: {
  cfg: OpenClawConfig;
}): ChannelDoctorConfigMutation;
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig };