import { u as asObjectRecord } from "../../runtime-doctor-BHX5ardJ.js";
/** Retired CUA daemon configuration that `openclaw doctor --fix` removes. */
const legacyConfigRules = [{
	path: [
		"plugins",
		"entries",
		"cua-computer",
		"config",
		"driverPath"
	],
	message: "plugins.entries.cua-computer.config.driverPath is retired; the CUA Driver SDK is configured directly by OpenClaw. Run \"openclaw doctor --fix\"."
}];
/** Removes the retired daemon path without making it a runtime compatibility key. */
function normalizeCompatibilityConfig({ cfg }) {
	const pluginConfig = asObjectRecord(asObjectRecord(cfg.plugins?.entries?.["cua-computer"])?.config);
	if (!pluginConfig || !Object.hasOwn(pluginConfig, "driverPath")) return {
		config: cfg,
		changes: []
	};
	const nextConfig = structuredClone(cfg);
	const nextPluginConfig = asObjectRecord(asObjectRecord(nextConfig.plugins?.entries?.["cua-computer"])?.config);
	if (!nextPluginConfig) return {
		config: cfg,
		changes: []
	};
	delete nextPluginConfig.driverPath;
	return {
		config: nextConfig,
		changes: ["Removed retired plugins.entries.cua-computer.config.driverPath; CUA Driver SDK is configured directly by OpenClaw."]
	};
}
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig };
