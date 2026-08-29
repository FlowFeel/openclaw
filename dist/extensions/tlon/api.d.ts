import { G as ReplyPayload, U as PluginRuntime } from "../../types-t45BJFXe.js";
import { n as OpenClawConfig } from "../../types.openclaw-DPyC_juj.js";
import { f as RuntimeEnv } from "../../manifest-registry-2pewMkeN.js";
import { a as isBlockedHostnameOrIp, i as SsrFPolicy, r as SsrFBlockedError, t as LookupFn } from "../../ssrf-CR70xC7h.js";
import { t as fetchWithSsrFGuard } from "../../fetch-guard-DwlBl7X1.js";
import { n as createDedupeCache, t as createLoggerBackedRuntime } from "../../runtime-api-DjTXMEfu.js";
import { t as ssrfPolicyFromDangerouslyAllowPrivateNetwork } from "../../ssrf-runtime-zyiL3pO1.js";
import { t as tlonPlugin } from "../../channel-BtTIHLEf.js";

//#region extensions/tlon/src/runtime.d.ts
declare const setTlonRuntime: (next: PluginRuntime) => void, getTlonRuntime: () => PluginRuntime;
//#endregion
export { type LookupFn, type OpenClawConfig, type ReplyPayload, type RuntimeEnv, SsrFBlockedError, type SsrFPolicy, createDedupeCache, createLoggerBackedRuntime, fetchWithSsrFGuard, isBlockedHostnameOrIp, setTlonRuntime, ssrfPolicyFromDangerouslyAllowPrivateNetwork, tlonPlugin };