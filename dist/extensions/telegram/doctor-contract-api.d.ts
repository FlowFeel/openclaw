import { n as OpenClawConfig } from "../../types.openclaw-B_WTBPdp.js";
import { m as ChannelDoctorLegacyConfigRule, p as ChannelDoctorConfigMutation } from "../../setup-wizard-types-CdHl9mdg.js";
//#region extensions/telegram/src/doctor-contract.d.ts
declare const legacyConfigRules: ChannelDoctorLegacyConfigRule[];
declare function normalizeCompatibilityConfig({
  cfg
}: {
  cfg: OpenClawConfig;
}): ChannelDoctorConfigMutation;
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig };