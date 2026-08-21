import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import "./registry-Ddw5GtUg.js";
import { t as normalizeAnyChannelId } from "./registry-normalize-0Yw0pQqw.js";
import { i as listLoadedChannelPlugins, n as getLoadedChannelPluginEntryById, t as getLoadedChannelPluginById } from "./registry-loaded-BSz-9sMZ.js";
import { n as getBundledChannelPlugin } from "./bundled-C1enQlWY.js";
//#region src/channels/plugins/registry.ts
/**
* Runtime channel plugin registry facade.
*
* Lists, resolves, and normalizes active channel plugins with bundled fallback.
*/
/**
* Lists currently loaded channel plugins in registry order.
*/
function listChannelPlugins() {
	return listLoadedChannelPlugins();
}
/**
* Returns a loaded channel plugin without falling back to bundled metadata.
*/
function getLoadedChannelPlugin(id) {
	return getLoadedChannelPluginById(id);
}
/**
* Returns the package/install origin for a loaded channel plugin.
*/
function getLoadedChannelPluginOrigin(id) {
	return normalizeOptionalString(getLoadedChannelPluginEntryById(id)?.origin);
}
/**
* Resolves the active channel implementation together with host-owned provenance.
*/
function resolveChannelPluginRegistration(id) {
	const resolvedId = normalizeOptionalString(id) ?? "";
	if (!resolvedId) return;
	const loadedEntry = getLoadedChannelPluginEntryById(resolvedId);
	if (loadedEntry) {
		const origin = normalizeOptionalString(loadedEntry.origin) ?? void 0;
		return {
			plugin: loadedEntry.plugin,
			...origin ? { origin } : {}
		};
	}
	const plugin = getBundledChannelPlugin(resolvedId);
	return plugin ? {
		plugin,
		origin: "bundled"
	} : void 0;
}
/**
* Returns the active channel plugin, with bundled fallback for built-in channels.
*/
function getChannelPlugin(id) {
	return resolveChannelPluginRegistration(id)?.plugin;
}
/**
* Normalizes user-facing channel aliases to canonical channel ids.
*/
function normalizeChannelId(raw) {
	return normalizeAnyChannelId(raw);
}
//#endregion
export { normalizeChannelId as a, listChannelPlugins as i, getLoadedChannelPlugin as n, resolveChannelPluginRegistration as o, getLoadedChannelPluginOrigin as r, getChannelPlugin as t };
