import { n as OpenClawConfig } from "../../types.openclaw-hJEKisz6.js";
import { B as LegacyConfigRule, f as ChannelDoctorConfigMutation } from "../../setup-wizard-types-B72aypBk.js";
//#region extensions/tlon/src/doctor-contract.d.ts
declare const legacyConfigRules: LegacyConfigRule[];
declare const normalizeCompatibilityConfig: (params: {
  cfg: OpenClawConfig;
}) => ChannelDoctorConfigMutation;
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig };