import { n as OpenClawConfig } from "../../types.openclaw-CN87qdMl.js";
import { m as ChannelDoctorLegacyConfigRule, p as ChannelDoctorConfigMutation } from "../../setup-wizard-types-BZVz3uzu.js";
//#region extensions/feishu/src/doctor-contract.d.ts
declare const legacyConfigRules: ChannelDoctorLegacyConfigRule[];
declare function normalizeCompatibilityConfig({
  cfg
}: {
  cfg: OpenClawConfig;
}): ChannelDoctorConfigMutation;
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig };