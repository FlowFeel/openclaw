import { r as createLegacyPrivateNetworkDoctorContract } from "./ssrf-policy-CHmrygRA.js";
import "./ssrf-runtime-B8V5-MiN.js";
//#region extensions/tlon/src/doctor-contract.ts
const contract = createLegacyPrivateNetworkDoctorContract({ channelKey: "tlon" });
const legacyConfigRules = contract.legacyConfigRules;
const normalizeCompatibilityConfig = contract.normalizeCompatibilityConfig;
//#endregion
export { normalizeCompatibilityConfig as n, legacyConfigRules as t };
