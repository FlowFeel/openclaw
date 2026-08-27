import { s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { d as getActivePluginRegistry, k as getPluginRuntimeGatewayRequestScope } from "./runtime-yJAYArQt.js";
import "./message-channel-constants-76XnXM8q.js";
import { n as getLoadedChannelPlugin, t as getChannelPlugin } from "./registry-B1AiP2IQ.js";
import "./plugins-1tM2ZjdA.js";
import { i as normalizeMessageChannel, t as isDeliverableMessageChannel } from "./message-channel-normalize-Bmutiks_.js";
import "./message-channel-1n7hD5_u.js";
import { t as bootstrapOutboundChannelPlugin } from "./channel-bootstrap.runtime-rGYfk5fF.js";
//#region src/infra/outbound/channel-resolution.ts
/** Normalizes a raw channel id and rejects non-deliverable/internal channels. */
function normalizeDeliverableOutboundChannel(raw) {
	const normalized = normalizeMessageChannel(raw);
	if (!normalized || !isDeliverableMessageChannel(normalized)) return;
	return normalized;
}
function maybeBootstrapChannelPlugin(params) {
	return bootstrapOutboundChannelPlugin(params);
}
function getOutboundRuntimeRegistry() {
	return getPluginRuntimeGatewayRequestScope()?.pluginRegistry ?? getActivePluginRegistry();
}
function normalizeOutboundChannelForResolution(params) {
	const normalized = normalizeMessageChannel(params.channel);
	const deliverable = normalizeDeliverableOutboundChannel(normalized);
	if (deliverable || !normalized || normalized === "webchat") return {
		channel: deliverable,
		didBootstrap: false
	};
	const activeRuntimePlugin = resolveActivatedOutboundPluginFromRuntimeRegistry(normalized, getOutboundRuntimeRegistry() ?? void 0);
	if (activeRuntimePlugin) return {
		channel: activeRuntimePlugin.id,
		didBootstrap: false
	};
	if (params.allowBootstrap !== true) return {
		channel: void 0,
		didBootstrap: false
	};
	const bootstrapRegistry = maybeBootstrapChannelPlugin({
		channel: normalized,
		cfg: params.cfg
	});
	return {
		channel: resolveActivatedOutboundPluginFromRuntimeRegistry(normalized, bootstrapRegistry)?.id ?? normalized,
		didBootstrap: true,
		...bootstrapRegistry ? { bootstrapRegistry } : {}
	};
}
function resolveDirectFromRegistry(registry, channel) {
	if (!registry) return;
	const normalizedChannel = normalizeOptionalLowercaseString(channel);
	if (!normalizedChannel) return;
	for (const entry of registry.channels) {
		const plugin = entry?.plugin;
		if (normalizeOptionalLowercaseString(plugin?.id) === normalizedChannel || plugin?.meta?.aliases?.some((alias) => normalizeOptionalLowercaseString(alias) === normalizedChannel)) return plugin;
	}
}
function messageAdapterCanSendText(message) {
	return typeof message?.send?.text === "function";
}
function resolveSendCapableMessageAdapter(plugin) {
	const message = plugin?.message;
	return messageAdapterCanSendText(message) ? message : void 0;
}
function channelPluginHasRuntimeOutboundSurface(plugin) {
	return Boolean(plugin?.outbound ?? resolveSendCapableMessageAdapter(plugin));
}
function channelPluginHasActivatedOutboundSurface(plugin) {
	return Boolean(plugin?.outbound?.sendText || plugin?.outbound?.deliveryMode === "gateway" || resolveSendCapableMessageAdapter(plugin));
}
function resolveRuntimeOutboundPlugin(plugin) {
	return channelPluginHasRuntimeOutboundSurface(plugin) ? plugin : void 0;
}
function resolveActivatedOutboundPlugin(plugin) {
	return channelPluginHasActivatedOutboundSurface(plugin) ? plugin : void 0;
}
function resolveRuntimeOutboundPluginCandidate(params) {
	const hasRuntimeSurface = params.requireActivatedRuntime ? channelPluginHasActivatedOutboundSurface : channelPluginHasRuntimeOutboundSurface;
	if (hasRuntimeSurface(params.loaded)) return params.loaded;
	if (hasRuntimeSurface(params.runtime)) return params.runtime;
	if (hasRuntimeSurface(params.bundled)) return params.bundled;
	if (params.allowSetupShell) return params.loaded ?? params.setupFallback ?? params.bundled;
}
function resolveValueFromRuntimeRegistry(channel, resolveValue, registry = getOutboundRuntimeRegistry()) {
	const plugin = resolveDirectFromRegistry(registry ?? null, channel);
	return plugin ? resolveValue(plugin) : void 0;
}
function resolveDirectFromRuntimeRegistry(channel, registry) {
	return resolveValueFromRuntimeRegistry(channel, (plugin) => plugin, registry);
}
function resolveRuntimeOutboundPluginFromRuntimeRegistry(channel, registry) {
	return resolveValueFromRuntimeRegistry(channel, resolveRuntimeOutboundPlugin, registry);
}
function resolveActivatedOutboundPluginFromRuntimeRegistry(channel, registry) {
	return resolveValueFromRuntimeRegistry(channel, resolveActivatedOutboundPlugin, registry);
}
/** Resolves a deliverable outbound channel plugin, optionally bootstrapping it. */
function resolveOutboundChannelPlugin(params) {
	const { channel: normalized, didBootstrap, bootstrapRegistry } = normalizeOutboundChannelForResolution(params);
	if (!normalized) return;
	const resolveLoaded = () => getLoadedChannelPlugin(normalized);
	const resolve = () => getChannelPlugin(normalized);
	const current = resolveLoaded();
	const requireActivatedRuntime = params.allowBootstrap === true;
	const candidate = resolveRuntimeOutboundPluginCandidate({
		loaded: current,
		runtime: requireActivatedRuntime ? resolveActivatedOutboundPluginFromRuntimeRegistry(normalized, bootstrapRegistry) : resolveRuntimeOutboundPluginFromRuntimeRegistry(normalized, bootstrapRegistry),
		setupFallback: resolveDirectFromRuntimeRegistry(normalized, bootstrapRegistry),
		bundled: resolve(),
		allowSetupShell: params.allowBootstrap !== true,
		requireActivatedRuntime
	});
	if (candidate) return candidate;
	if (params.allowBootstrap !== true || didBootstrap) return;
	const registry = maybeBootstrapChannelPlugin({
		channel: normalized,
		cfg: params.cfg
	});
	return resolveRuntimeOutboundPluginCandidate({
		loaded: resolveLoaded(),
		runtime: resolveActivatedOutboundPluginFromRuntimeRegistry(normalized, registry),
		setupFallback: resolveDirectFromRuntimeRegistry(normalized, registry),
		bundled: resolve(),
		requireActivatedRuntime: true
	});
}
/** Resolves the message adapter for a deliverable outbound channel. */
function resolveOutboundChannelMessageAdapter(params) {
	const { channel: normalized, didBootstrap, bootstrapRegistry } = normalizeOutboundChannelForResolution(params);
	if (!normalized) return;
	const current = resolveSendCapableMessageAdapter(getLoadedChannelPlugin(normalized)) ?? resolveValueFromRuntimeRegistry(normalized, resolveSendCapableMessageAdapter, bootstrapRegistry) ?? resolveSendCapableMessageAdapter(getChannelPlugin(normalized));
	if (current || params.allowBootstrap !== true || didBootstrap) return current;
	const registry = maybeBootstrapChannelPlugin({
		channel: normalized,
		cfg: params.cfg
	});
	return resolveSendCapableMessageAdapter(getLoadedChannelPlugin(normalized)) ?? resolveValueFromRuntimeRegistry(normalized, resolveSendCapableMessageAdapter, registry) ?? resolveSendCapableMessageAdapter(getChannelPlugin(normalized));
}
//#endregion
export { resolveOutboundChannelMessageAdapter as n, resolveOutboundChannelPlugin as r, normalizeDeliverableOutboundChannel as t };
