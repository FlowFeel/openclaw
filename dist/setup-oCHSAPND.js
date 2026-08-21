import "./utils-Bs67j6-3.js";
import "./types.secrets-BvApkFoj.js";
import "./detect-binary-vcrV2MAh.js";
import "./setup-helpers-t3GC4Z1N.js";
import "./setup-wizard-helpers-C8pTV3Ti.js";
import "./setup-credential-ASZO-4c5.js";
//#region src/plugin-sdk/resolution-notes.ts
/** Format a short note that separates successfully resolved targets from unresolved passthrough values. */
function formatResolvedUnresolvedNote(params) {
	if (params.resolved.length === 0 && params.unresolved.length === 0) return;
	return [params.resolved.length > 0 ? `Resolved: ${params.resolved.join(", ")}` : void 0, params.unresolved.length > 0 ? `Unresolved (kept as typed): ${params.unresolved.join(", ")}` : void 0].filter(Boolean).join("\n");
}
//#endregion
export { formatResolvedUnresolvedNote as t };
