import { t as getBootstrapChannelPlugin } from "./bootstrap-registry-BbgWhNaU.js";
import { t as findLegacyConfigIssues } from "./legacy-C8NOAlee.js";
import { i as listPluginDoctorLegacyConfigRules, n as collectRelevantDoctorPluginIds, r as collectRelevantDoctorPluginIdsForTouchedPaths } from "./doctor-contract-registry-CGDRj2Pj.js";
import { t as loadBundledChannelDoctorContractApi } from "./doctor-contract-api-Crs0UF6e.js";
//#region src/channels/plugins/legacy-config.ts
function collectConfiguredChannelIds$1(raw) {
	if (!raw || typeof raw !== "object") return [];
	const channels = raw.channels;
	if (!channels || typeof channels !== "object" || Array.isArray(channels)) return [];
	return Object.keys(channels).filter((channelId) => channelId !== "defaults").map((channelId) => channelId);
}
function shouldIncludeLegacyRuleForTouchedPaths(rulePath, touchedPaths) {
	if (!touchedPaths || touchedPaths.length === 0) return true;
	return touchedPaths.some((touchedPath) => {
		const sharedLength = Math.min(rulePath.length, touchedPath.length);
		for (let index = 0; index < sharedLength; index += 1) if (rulePath[index] !== touchedPath[index]) return false;
		return true;
	});
}
function collectRelevantChannelIdsForTouchedPaths(params) {
	const channelIds = collectConfiguredChannelIds$1(params.raw);
	const filteredChannelIds = params.excludedChannelIds?.size ? channelIds.filter((channelId) => !params.excludedChannelIds?.has(channelId)) : channelIds;
	if (!params.touchedPaths || params.touchedPaths.length === 0) return filteredChannelIds;
	const touchedChannelIds = /* @__PURE__ */ new Set();
	for (const touchedPath of params.touchedPaths) {
		const [first, second] = touchedPath;
		if (first !== "channels") continue;
		if (!second) return filteredChannelIds;
		if (second === "defaults") continue;
		touchedChannelIds.add(second);
	}
	if (touchedChannelIds.size === 0) return [];
	return filteredChannelIds.filter((channelId) => touchedChannelIds.has(channelId));
}
function collectChannelLegacyConfigRules(raw, touchedPaths, excludedChannelIds) {
	const channelIds = collectRelevantChannelIdsForTouchedPaths({
		raw,
		touchedPaths,
		excludedChannelIds
	});
	const rules = [];
	const unresolvedChannelIds = [];
	for (const channelId of channelIds) {
		const contractRules = loadBundledChannelDoctorContractApi(channelId)?.legacyConfigRules;
		if (Array.isArray(contractRules)) {
			rules.push(...contractRules);
			continue;
		}
		const plugin = getBootstrapChannelPlugin(channelId);
		if (plugin?.doctor?.legacyConfigRules?.length) {
			rules.push(...plugin.doctor.legacyConfigRules);
			continue;
		}
		if (plugin) continue;
		unresolvedChannelIds.push(channelId);
	}
	if (unresolvedChannelIds.length > 0) rules.push(...listPluginDoctorLegacyConfigRules({
		config: raw,
		pluginIds: unresolvedChannelIds
	}));
	const seen = /* @__PURE__ */ new Set();
	return rules.filter((rule) => {
		if (!shouldIncludeLegacyRuleForTouchedPaths(rule.path, touchedPaths)) return false;
		const key = `${rule.path.join(".")}::${rule.message}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
//#endregion
//#region src/commands/doctor/shared/legacy-config-issues.ts
function collectConfiguredChannelIds(raw) {
	if (!raw || typeof raw !== "object") return /* @__PURE__ */ new Set();
	const channels = raw.channels;
	if (!channels || typeof channels !== "object" || Array.isArray(channels)) return /* @__PURE__ */ new Set();
	return new Set(Object.keys(channels).filter((channelId) => channelId !== "defaults"));
}
function collectPluginLegacyConfigRules(raw, touchedPaths) {
	const channelIds = collectConfiguredChannelIds(raw);
	const pluginIds = (touchedPaths ? collectRelevantDoctorPluginIdsForTouchedPaths({
		raw,
		touchedPaths
	}) : collectRelevantDoctorPluginIds(raw)).filter((pluginId) => !channelIds.has(pluginId));
	if (pluginIds.length === 0) return [];
	return listPluginDoctorLegacyConfigRules({
		config: raw,
		pluginIds
	});
}
/** Find legacy config issues using core rules plus relevant channel/plugin doctor contracts. */
function findDoctorLegacyConfigIssues(raw, sourceRaw, touchedPaths) {
	return findLegacyConfigIssues(raw, sourceRaw, [...collectChannelLegacyConfigRules(raw, touchedPaths), ...collectPluginLegacyConfigRules(raw, touchedPaths)], touchedPaths);
}
//#endregion
export { findDoctorLegacyConfigIssues as t };
