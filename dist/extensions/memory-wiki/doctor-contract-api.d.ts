import { n as OpenClawConfig } from "../../types.openclaw-_47ZKysp.js";
import { t as PluginDoctorStateMigration } from "../../runtime-doctor-DtJ3MtfV.js";

//#region extensions/memory-wiki/src/config-compat.d.ts
type LegacyConfigRule = {
  path: Array<string | number>;
  message: string;
  match: (value: unknown) => boolean;
};
declare const legacyConfigRules: LegacyConfigRule[];
declare function normalizeCompatibilityConfig({
  cfg
}: {
  cfg: OpenClawConfig;
}): {
  config: OpenClawConfig;
  changes: string[];
};
//#endregion
//#region extensions/memory-wiki/doctor-contract-api.d.ts
declare const stateMigrations: PluginDoctorStateMigration[];
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig, stateMigrations };