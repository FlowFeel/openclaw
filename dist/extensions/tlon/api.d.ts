import { G as ReplyPayload, U as PluginRuntime } from "../../types-DJ09K2Ui.js";
import { n as OpenClawConfig } from "../../types.openclaw-Becy5MdM.js";
import { f as RuntimeEnv } from "../../manifest-registry-DvSIzEBz.js";
import { a as isBlockedHostnameOrIp, i as SsrFPolicy, r as SsrFBlockedError, t as LookupFn } from "../../ssrf-CR70xC7h.js";
import { t as fetchWithSsrFGuard } from "../../fetch-guard-DwlBl7X1.js";
import { n as createDedupeCache, t as createLoggerBackedRuntime } from "../../runtime-api-2NL1mU3z.js";
import { t as ssrfPolicyFromDangerouslyAllowPrivateNetwork } from "../../ssrf-runtime-zyiL3pO1.js";
import { t as tlonPlugin } from "../../channel-B7J5tiDq.js";

//#region extensions/tlon/src/runtime.d.ts
declare const setTlonRuntime: (next: PluginRuntime) => void, getTlonRuntime: () => PluginRuntime;
//#endregion
export { type LookupFn, type OpenClawConfig, type ReplyPayload, type RuntimeEnv, SsrFBlockedError, type SsrFPolicy, createDedupeCache, createLoggerBackedRuntime, fetchWithSsrFGuard, isBlockedHostnameOrIp, setTlonRuntime, ssrfPolicyFromDangerouslyAllowPrivateNetwork, tlonPlugin };