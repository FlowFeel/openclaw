import { f as SsrFPolicy } from "./provider-request-config-GOnSMChb.js";
//#region src/plugin-sdk/ssrf-policy.d.ts
/** Compatibility wrapper for callers that already use the canonical dangerous flag name. */
declare function ssrfPolicyFromDangerouslyAllowPrivateNetwork(dangerouslyAllowPrivateNetwork: boolean | null | undefined): SsrFPolicy | undefined;
//#endregion
export { ssrfPolicyFromDangerouslyAllowPrivateNetwork as t };