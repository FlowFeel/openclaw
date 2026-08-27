import { n as OpenClawConfig } from "../../types.openclaw-rejpcq0R.js";
import { m as ChannelDoctorLegacyConfigRule, p as ChannelDoctorConfigMutation } from "../../setup-wizard-types-D2FWxWEi.js";
//#region extensions/feishu/src/doctor-contract.d.ts
declare const legacyConfigRules: ChannelDoctorLegacyConfigRule[];
declare function normalizeCompatibilityConfig({
  cfg
}: {
  cfg: OpenClawConfig;
}): ChannelDoctorConfigMutation;
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig };