import { n as OpenClawConfig } from "../../types.openclaw-BsftVpqJ.js";
//#region extensions/cua-computer/doctor-contract-api.d.ts
/** Retired CUA daemon configuration that `openclaw doctor --fix` removes. */
declare const legacyConfigRules: {
  path: string[];
  message: string;
}[];
/** Removes the retired daemon path without making it a runtime compatibility key. */
declare function normalizeCompatibilityConfig({
  cfg
}: {
  cfg: OpenClawConfig;
}): {
  config: OpenClawConfig;
  changes: string[];
};
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig };