import { d as movePathToTrash$1 } from "./fs-safe-DVaClkIX.js";
import { t as CONFIG_DIR } from "./utils-Bs67j6-3.js";
import { t as normalizeHostname } from "./hostname-DAZapKzN.js";
import { p as matchesHostnameAllowlist } from "./ssrf-CLKoEH8E.js";
import "./browser-config-y8Xi4vs-.js";
import "./config-B2k8sZ1m.js";
import { v as withExactHostnamePolicy } from "./tmp-openclaw-dir-BK3eq-mf.js";
import { t as getBrowserProfileCapabilities } from "./profile-capabilities-DqO0AgW7.js";
import path from "node:path";
//#region extensions/browser/src/browser/cdp-reachability-policy.ts
function withCdpControlHostname(profile, ssrfPolicy, requireAllowlistMatch = false) {
	const cdpHost = normalizeHostname(profile.cdpHost);
	if (!ssrfPolicy || !cdpHost) return ssrfPolicy;
	const allowedHostnames = (ssrfPolicy.allowedHostnames ?? []).map((pattern) => normalizeHostname(pattern)).filter((pattern) => pattern && pattern !== "*" && pattern !== "*.");
	if (requireAllowlistMatch && allowedHostnames.length > 0 && !matchesHostnameAllowlist(cdpHost, allowedHostnames)) return ssrfPolicy;
	return withExactHostnamePolicy(ssrfPolicy, cdpHost);
}
function resolveCdpReachabilityPolicy(profile, ssrfPolicy) {
	const capabilities = getBrowserProfileCapabilities(profile);
	if (!capabilities.isRemote && profile.cdpIsLoopback && profile.driver === "openclaw") return;
	return withCdpControlHostname(profile, ssrfPolicy, capabilities.isRemote);
}
/** Alias used by callers that treat reachability and control as one CDP policy. */
const resolveCdpControlPolicy = resolveCdpReachabilityPolicy;
//#endregion
//#region extensions/browser/src/browser/trash.ts
/**
* Trash helpers for data under the Browser-owned config subtree.
*/
/** Moves a path to trash only when it lives under allowed Browser roots. */
async function movePathToTrash(targetPath) {
	return await movePathToTrash$1(targetPath, { allowedRoots: [path.join(CONFIG_DIR, "browser")] });
}
//#endregion
export { resolveCdpControlPolicy as n, resolveCdpReachabilityPolicy as r, movePathToTrash as t };
