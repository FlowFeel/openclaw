import { n as OpenClawConfig } from "../../types.openclaw-DZDgdSgX.js";
import { S as LegacyConfigRule, i as ChannelDoctorLegacyConfigRule } from "../../types.public-DAdSmWXH.js";
import { ELEVENLABS_TALK_PROVIDER_ID } from "./config-compat.js";

//#region extensions/elevenlabs/doctor-contract.d.ts
declare function hasLegacyTalkFields(value: unknown): boolean;
declare const legacyConfigRules: ChannelDoctorLegacyConfigRule[];
declare const ELEVENLABS_TALK_LEGACY_CONFIG_RULES: LegacyConfigRule[];
declare function normalizeCompatibilityConfig({
  cfg
}: {
  cfg: OpenClawConfig;
}): {
  config: OpenClawConfig;
  changes: string[];
};
//#endregion
export { ELEVENLABS_TALK_LEGACY_CONFIG_RULES, ELEVENLABS_TALK_PROVIDER_ID, hasLegacyTalkFields, legacyConfigRules, normalizeCompatibilityConfig };