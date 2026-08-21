import { C as resolveStateDir, S as resolveOAuthDir, d as resolveConfigPath } from "./paths-CL43LNS6.js";
import { r as getRuntimeConfig } from "./io-BsQc3Kgy.js";
import "./config-BBVHtcXg.js";
import { t as buildCleanupPlan } from "./cleanup-utils-CGuNqv7r.js";
//#region src/commands/cleanup-plan.ts
/** Build the cleanup plan for the current runtime config/state/credential paths on disk. */
function resolveCleanupPlanFromDisk() {
	const cfg = getRuntimeConfig();
	const stateDir = resolveStateDir();
	const configPath = resolveConfigPath();
	const oauthDir = resolveOAuthDir();
	return {
		cfg,
		stateDir,
		configPath,
		oauthDir,
		...buildCleanupPlan({
			cfg,
			stateDir,
			configPath,
			oauthDir
		})
	};
}
//#endregion
export { resolveCleanupPlanFromDisk as t };
