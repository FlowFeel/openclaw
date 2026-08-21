import { r as createLegacyPrivateNetworkDoctorContract } from "./ssrf-policy-BhrO0_v9.js";
import "./ssrf-runtime-BKWYxujx.js";
//#region extensions/tlon/src/doctor-contract.ts
const contract = createLegacyPrivateNetworkDoctorContract({ channelKey: "tlon" });
const legacyConfigRules = contract.legacyConfigRules;
const normalizeCompatibilityConfig = contract.normalizeCompatibilityConfig;
//#endregion
export { normalizeCompatibilityConfig as n, legacyConfigRules as t };
