import { g as sortUniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { n as registerPluginMetadataProcessMemoLifecycleClear } from "./plugin-metadata-lifecycle-NcA0EWhA.js";
import { n as isInstalledPluginEnabled } from "./installed-plugin-index-DXmBG059.js";
import { c as normalizePluginsConfig } from "./config-state-DrPZVhOu.js";
import { a as resolveManifestOwnerBasePolicyBlock } from "./manifest-owner-policy-Cvik9_1s.js";
import { t as readBundledDiscoveryMode } from "./bundled-discovery-state-DRAhRrnE.js";
import { a as resolvePluginMetadataSnapshot } from "./plugin-metadata-snapshot-B_ZQ9Mbo.js";
import { r as resolveChannelConfigRecord, t as hasMeaningfulChannelConfigShallow } from "./channel-configured-shared-BZd1_o90.js";
//#region src/plugins/manifest-contract-eligibility.ts
let bundledDiscoveryMode;
registerPluginMetadataProcessMemoLifecycleClear(() => {
	bundledDiscoveryMode = void 0;
});
/** Enforces owner-specific policy while preserving bundled speech/global compatibility. */
function isManifestPluginOwnerAllowedByControlPlanePolicy(params) {
	if (!params.config?.plugins) return true;
	const config = params.config;
	const normalized = normalizePluginsConfig(config.plugins);
	const normalizedConfig = normalized.enabled ? normalized : {
		...normalized,
		enabled: true
	};
	const block = resolveManifestOwnerBasePolicyBlock({
		plugin: params.plugin,
		normalizedConfig,
		allowRestrictiveAllowlistBypass: params.plugin.origin === "bundled" && params.allowRestrictiveAllowlistBypass === true
	});
	if (block !== "not-in-allowlist") return block === null;
	if (params.plugin.origin !== "bundled") return false;
	if ((params.plugin.channels ?? [params.plugin.id]).some((channelId) => {
		const channelConfig = resolveChannelConfigRecord(config, channelId);
		return channelConfig?.enabled !== false && hasMeaningfulChannelConfigShallow(channelConfig);
	})) return true;
	bundledDiscoveryMode ??= { value: readBundledDiscoveryMode() };
	return bundledDiscoveryMode.value === "compat";
}
function isManifestPluginAvailableForControlPlane(params) {
	if (!isManifestPluginOwnerAllowedByControlPlanePolicy(params)) return false;
	if (params.plugin.origin === "bundled") return true;
	return isInstalledPluginEnabled(params.snapshot.index, params.plugin.id, params.config);
}
function hasManifestContractValue(params) {
	const values = params.plugin.contracts?.[params.contract] ?? [];
	return values.length > 0 && (!params.value || values.includes(params.value));
}
function listAvailableManifestContractPlugins(params) {
	return params.snapshot.plugins.filter((plugin) => hasManifestContractValue({
		plugin,
		contract: params.contract,
		value: params.value
	}) && isManifestPluginAvailableForControlPlane({
		snapshot: params.snapshot,
		plugin,
		config: params.config
	}));
}
function listAvailableManifestContractValues(params) {
	const values = /* @__PURE__ */ new Set();
	for (const plugin of listAvailableManifestContractPlugins(params)) for (const value of plugin.contracts?.[params.contract] ?? []) values.add(value);
	return sortUniqueStrings(values);
}
function loadManifestContractSnapshot(params) {
	const snapshot = loadManifestMetadataSnapshot(params);
	return {
		index: snapshot.index,
		plugins: snapshot.plugins
	};
}
function loadManifestMetadataRegistry(params) {
	const snapshot = loadManifestMetadataSnapshot(params);
	return {
		index: snapshot.index,
		manifestRegistry: snapshot.manifestRegistry
	};
}
function loadManifestMetadataSnapshot(params) {
	return resolvePluginMetadataSnapshot({
		config: params.config ?? {},
		env: params.env ?? process.env,
		...params.workspaceDir ? { workspaceDir: params.workspaceDir } : {},
		allowWorkspaceScopedCurrent: params.workspaceDir === void 0
	});
}
//#endregion
export { listAvailableManifestContractValues as a, loadManifestMetadataSnapshot as c, listAvailableManifestContractPlugins as i, isManifestPluginAvailableForControlPlane as n, loadManifestContractSnapshot as o, isManifestPluginOwnerAllowedByControlPlanePolicy as r, loadManifestMetadataRegistry as s, hasManifestContractValue as t };
