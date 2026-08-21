import { g as sortUniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { r as loadPluginMetadataSnapshot } from "./plugin-metadata-snapshot-DtW_P3kZ.js";
import { i as listAvailableManifestContractPlugins, t as hasManifestContractValue } from "./manifest-contract-eligibility-Bwf0kZYI.js";
//#region src/plugins/manifest-contract-runtime.ts
function resolveManifestContractRuntimePluginResolution(params) {
	const snapshot = loadPluginMetadataSnapshot({
		config: params.cfg ?? {},
		env: process.env
	});
	const allContractPlugins = snapshot.plugins.filter((plugin) => hasManifestContractValue({
		plugin,
		contract: params.contract,
		value: params.value
	}));
	const bundledCompatPluginIds = allContractPlugins.filter((plugin) => plugin.origin === "bundled").map((plugin) => plugin.id);
	return {
		pluginIds: sortUniqueStrings(listAvailableManifestContractPlugins({
			snapshot: {
				index: snapshot.index,
				plugins: allContractPlugins
			},
			contract: params.contract,
			value: params.value,
			config: params.cfg
		}).map((plugin) => plugin.id)),
		bundledCompatPluginIds: sortUniqueStrings(bundledCompatPluginIds)
	};
}
//#endregion
export { resolveManifestContractRuntimePluginResolution as t };
