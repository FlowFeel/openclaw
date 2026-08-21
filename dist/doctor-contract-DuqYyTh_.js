import { a as defineChannelAliasMigration } from "./runtime-doctor-BHX5ardJ.js";
import { r as createLegacyPrivateNetworkDoctorContract } from "./ssrf-policy-BhrO0_v9.js";
import "./ssrf-runtime-BKWYxujx.js";
//#region extensions/nextcloud-talk/src/doctor-contract.ts
const networkContract = createLegacyPrivateNetworkDoctorContract({ channelKey: "nextcloud-talk" });
const streamingAliasMigration = defineChannelAliasMigration({
	channelId: "nextcloud-talk",
	streaming: {
		defaultMode: "partial",
		deliveryOnly: true
	},
	accountStreamingReplacesRoot: true
});
const legacyConfigRules = [...networkContract.legacyConfigRules, ...streamingAliasMigration.legacyConfigRules];
function normalizeCompatibilityConfig({ cfg }) {
	const network = networkContract.normalizeCompatibilityConfig({ cfg });
	return streamingAliasMigration.normalizeChannelConfig({
		cfg: network.config,
		changes: network.changes
	});
}
//#endregion
export { normalizeCompatibilityConfig as n, legacyConfigRules as t };
