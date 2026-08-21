import { r as listRawChannelPluginCatalogEntries } from "./catalog-BsDV5dwW.js";
import { n as listBundledPackageChannelMetadata } from "./bundled-package-channel-metadata-uU7Uap-q.js";
import { Option } from "commander";
//#region src/channels/plugins/cli-add-options.ts
function channelCliOptionSwitchKey(flags) {
	const option = new Option(flags);
	return option.long ?? option.short ?? option.flags;
}
function compareChannels(left, right) {
	const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
	const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;
	return leftOrder === rightOrder ? (left.id ?? "").localeCompare(right.id ?? "") : leftOrder - rightOrder;
}
function channelSetupOptions(channel) {
	if (channel.setup) return channel.setup.fields.map((field) => field.cli);
	return [...channel.cliAddOptions ?? []];
}
function resolveChannelSetupCliOptionMetadata(channelId, params = {}) {
	const bundledChannels = listBundledPackageChannelMetadata().toSorted(compareChannels);
	const catalogChannels = listRawChannelPluginCatalogEntries({
		excludeWorkspace: true,
		excludeOrigins: ["bundled"]
	}).flatMap((entry) => entry.channel ? [entry.channel] : []).toSorted(compareChannels);
	const orderedChannels = [...bundledChannels, ...catalogChannels];
	const normalizedChannelId = channelId?.trim().toLowerCase();
	const selectedChannel = normalizedChannelId ? orderedChannels.find((channel) => channel.id?.toLowerCase() === normalizedChannelId) ?? orderedChannels.find((channel) => channel.aliases?.some((alias) => alias.toLowerCase() === normalizedChannelId)) : void 0;
	const optionCandidates = (params.includeAll ? orderedChannels : selectedChannel ? [selectedChannel] : []).flatMap(channelSetupOptions);
	const seenSwitches = /* @__PURE__ */ new Set();
	const options = optionCandidates.filter((option) => {
		const key = channelCliOptionSwitchKey(option.flags);
		if (seenSwitches.has(key)) return false;
		seenSwitches.add(key);
		return true;
	});
	const valueMetadataByAttributeName = /* @__PURE__ */ new Map();
	if (selectedChannel && !selectedChannel.setup) for (const option of selectedChannel.cliAddOptions ?? []) {
		if (!option.valueType) continue;
		const commanderOption = new Option(option.flags);
		valueMetadataByAttributeName.set(commanderOption.attributeName(), {
			longFlag: commanderOption.long ?? option.flags,
			valueType: option.valueType
		});
	}
	return {
		options,
		optionCandidates,
		selectedChannel,
		valueMetadataByAttributeName
	};
}
//#endregion
export { resolveChannelSetupCliOptionMetadata as n, channelCliOptionSwitchKey as t };
