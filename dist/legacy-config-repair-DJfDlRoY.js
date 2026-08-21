import { N as validateConfigObjectWithPlugins, l as readConfigFileSnapshot } from "./io-BsQc3Kgy.js";
import { r as replaceConfigFile } from "./mutate-dYcqgG_5.js";
import "./config-BBVHtcXg.js";
import { t as migrateLegacyConfig } from "./legacy-config-migrate-Bj6UZtJY.js";
import { n as containsAuthoredInclude, r as isSingleTopLevelIncludeMigration } from "./include-migration-ownership-BFF9HYFj.js";
//#region src/commands/doctor/legacy-config-repair.ts
/** Migrate a legacy config snapshot during update, unless validation blocks it. */
async function repairLegacyConfigForUpdateChannel(params) {
	const hasAuthoredIncludes = containsAuthoredInclude(params.configSnapshot.parsed);
	const migrated = migrateLegacyConfig(params.configSnapshot.sourceConfig);
	if (!migrated.config) return {
		snapshot: params.configSnapshot,
		repaired: false
	};
	const validated = validateConfigObjectWithPlugins(migrated.config);
	if (!validated.ok) return {
		snapshot: params.configSnapshot,
		repaired: false
	};
	const nextConfig = hasAuthoredIncludes && migrated.sourceConfig ? migrated.sourceConfig : validated.config;
	if (hasAuthoredIncludes && !isSingleTopLevelIncludeMigration({
		parsed: params.configSnapshot.parsed,
		sourceConfig: params.configSnapshot.sourceConfig,
		candidate: nextConfig
	})) return {
		snapshot: params.configSnapshot,
		repaired: false
	};
	await replaceConfigFile({
		nextConfig,
		baseHash: params.configSnapshot.hash,
		writeOptions: {
			auditOrigin: "doctor",
			allowConfigSizeDrop: true,
			skipOutputLogs: params.jsonMode
		}
	});
	const snapshot = await readConfigFileSnapshot();
	return {
		snapshot,
		repaired: snapshot.valid
	};
}
//#endregion
export { repairLegacyConfigForUpdateChannel };
