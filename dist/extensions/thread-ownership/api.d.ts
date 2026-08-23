import { n as OpenClawConfig } from "../../types.openclaw-CXX8ljmy.js";
import { l as fetchWithSsrFGuard } from "../../provider-request-config-GOnSMChb.js";
import { E as definePluginEntry, s as OpenClawPluginApi } from "../../plugin-entry-i32wLQY9.js";
import { t as ReadResponseTextPrefixOptions } from "../../http-body-6-lYGEU6.js";
import { t as ssrfPolicyFromDangerouslyAllowPrivateNetwork } from "../../ssrf-runtime-Uje4KzmN.js";
//#region src/agents/provider-http-errors.d.ts
/** Shared timeout and byte-limit options for provider response consumption. */
type ProviderResponseReadOptions = ReadResponseTextPrefixOptions & {
  maxBytes?: number;
};
/** Options for bounded provider error-body normalization. */
/**
 * Parses a provider JSON response under a byte cap and wraps malformed JSON with the caller's label.
 *
 * The body is read through the same bounded reader as binary responses so a provider that streams an
 * unbounded JSON body cannot force the runtime to buffer the whole payload before parsing.
 */
declare function readProviderJsonResponse<T>(response: Response, label: string, opts?: ProviderResponseReadOptions): Promise<T>;
//#endregion
export { type OpenClawConfig, type OpenClawPluginApi, definePluginEntry, fetchWithSsrFGuard, readProviderJsonResponse, ssrfPolicyFromDangerouslyAllowPrivateNetwork };