import { r as normalizeCapabilityProviderId, t as buildCapabilityProviderMaps } from "./provider-registry-shared-DpBO0Uka.js";
import { i as resolvePluginCapabilityProviders, r as resolvePluginCapabilityProvider } from "./capability-provider-runtime-Clrhcxsz.js";
import { t as resolveConfiguredCapabilityProvider } from "./provider-selection-runtime-DGqZaqbE.js";
//#region src/talk/provider-registry.ts
/**
* Normalizes realtime voice provider ids so direct ids and aliases compare through one registry key.
*/
function normalizeRealtimeVoiceProviderId(providerId) {
	return normalizeCapabilityProviderId(providerId);
}
function resolveRealtimeVoiceProviderEntries(cfg) {
	return resolvePluginCapabilityProviders({
		key: "realtimeVoiceProviders",
		cfg
	});
}
function buildProviderMaps(cfg) {
	return buildCapabilityProviderMaps(resolveRealtimeVoiceProviderEntries(cfg));
}
/**
* Lists canonical realtime voice provider plugins in registry order.
*/
function listRealtimeVoiceProviders(cfg) {
	return [...buildProviderMaps(cfg).canonical.values()];
}
/**
* Resolves a realtime voice provider by canonical id or declared alias.
*/
function getRealtimeVoiceProvider(providerId, cfg) {
	const normalized = normalizeRealtimeVoiceProviderId(providerId);
	if (!normalized) return;
	return resolvePluginCapabilityProvider({
		key: "realtimeVoiceProviders",
		providerId: normalized,
		cfg
	});
}
/**
* Converts a realtime voice provider id or alias into the canonical provider id when known.
*/
function canonicalizeRealtimeVoiceProviderId(providerId, cfg) {
	const normalized = normalizeRealtimeVoiceProviderId(providerId);
	if (!normalized) return;
	return getRealtimeVoiceProvider(normalized, cfg)?.id ?? normalized;
}
//#endregion
//#region src/talk/provider-internal.ts
const INTERNAL_REALTIME_VOICE_PROVIDER = Symbol.for("openclaw.internal.realtime-voice-provider.v1");
function readInternalRealtimeVoiceProviderApi(provider) {
	const value = Reflect.get(provider, INTERNAL_REALTIME_VOICE_PROVIDER);
	if (!value || typeof value !== "object") return;
	const api = value;
	return typeof api.isBrowserSessionConfigured === "function" ? api : void 0;
}
function isInternalRealtimeVoiceBrowserSessionConfigured(params) {
	return readInternalRealtimeVoiceProviderApi(params.provider)?.isBrowserSessionConfigured({
		cfg: params.cfg,
		providerConfig: params.providerConfig,
		agentId: params.agentId
	});
}
function resolveInternalRealtimeVoiceBrowserSessionCapabilities(params) {
	return readInternalRealtimeVoiceProviderApi(params.provider)?.resolveBrowserSessionCapabilities?.({
		cfg: params.cfg,
		providerConfig: params.providerConfig,
		model: params.model
	});
}
function isInternalRealtimeVoiceGatewayRelayConfigured(params) {
	return readInternalRealtimeVoiceProviderApi(params.provider)?.isGatewayRelayConfigured?.({
		cfg: params.cfg,
		providerConfig: params.providerConfig,
		agentId: params.agentId
	});
}
function resolveInternalRealtimeVoiceGatewayRelayCapabilities(params) {
	return readInternalRealtimeVoiceProviderApi(params.provider)?.resolveGatewayRelayCapabilities?.({
		cfg: params.cfg,
		providerConfig: params.providerConfig,
		model: params.model
	});
}
function resolveInternalRealtimeVoiceGatewayRelayLaunchError(params) {
	return readInternalRealtimeVoiceProviderApi(params.provider)?.validateGatewayRelayLaunch?.({
		cfg: params.cfg,
		providerConfig: params.providerConfig,
		model: params.model,
		autoRespondToAudio: params.autoRespondToAudio
	});
}
async function cancelInternalRealtimeVoiceBrowserSession(params) {
	await readInternalRealtimeVoiceProviderApi(params.provider)?.cancelBrowserSession?.(params.request, params.session);
}
//#endregion
//#region src/talk/provider-resolver.ts
function resolveRealtimeVoiceProviderCapabilities(params) {
	if (params.surface === "browser-session") {
		const internalCapabilities = resolveInternalRealtimeVoiceBrowserSessionCapabilities(params);
		if (internalCapabilities) return internalCapabilities;
	}
	if (params.surface === "gateway-relay") {
		const internalCapabilities = resolveInternalRealtimeVoiceGatewayRelayCapabilities(params);
		if (internalCapabilities) return internalCapabilities;
	}
	return params.provider.capabilities;
}
function isRealtimeVoiceProviderConfigured(params) {
	const internalConfigured = params.surface === "browser-session" ? isInternalRealtimeVoiceBrowserSessionConfigured(params) : params.surface === "gateway-relay" ? isInternalRealtimeVoiceGatewayRelayConfigured(params) : void 0;
	if (internalConfigured !== void 0) return internalConfigured;
	return params.provider.isConfigured({
		cfg: params.cfg,
		providerConfig: params.providerConfig
	});
}
/** Resolve the configured realtime voice provider or auto-select the first configured one. */
function resolveConfiguredRealtimeVoiceProvider(params) {
	const cfgForResolve = params.cfgForResolve ?? params.cfg ?? {};
	const providers = params.providers ?? listRealtimeVoiceProviders(params.cfg);
	const resolution = resolveConfiguredCapabilityProvider({
		configuredProviderId: params.configuredProviderId,
		providerConfigs: params.providerConfigs,
		cfg: params.cfg,
		cfgForResolve,
		getConfiguredProvider: (providerId) => params.providers?.find((entry) => entry.id === providerId) ?? getRealtimeVoiceProvider(providerId, params.cfg),
		listProviders: () => providers,
		resolveProviderConfig: ({ provider, cfg, rawConfig }) => {
			const rawConfigWithOverrides = {
				...params.defaultModel && rawConfig.model === void 0 ? {
					...rawConfig,
					model: params.defaultModel
				} : rawConfig,
				...params.providerConfigOverrides
			};
			return provider.resolveConfig?.({
				cfg,
				rawConfig: rawConfigWithOverrides
			}) ?? rawConfigWithOverrides;
		},
		isProviderConfigured: ({ provider, cfg, providerConfig }) => isRealtimeVoiceProviderConfigured({
			provider,
			cfg,
			providerConfig,
			agentId: params.agentId,
			surface: params.surface
		})
	});
	if (!resolution.ok && resolution.code === "missing-configured-provider") throw new Error(`Realtime voice provider "${resolution.configuredProviderId}" is not registered`);
	if (!resolution.ok && resolution.code === "no-registered-provider") throw new Error(params.noRegisteredProviderMessage ?? "No realtime voice provider registered");
	if (!resolution.ok) throw new Error(`Realtime voice provider "${resolution.provider?.id}" is not configured`);
	return {
		provider: resolution.provider,
		providerConfig: resolution.providerConfig
	};
}
//#endregion
export { resolveInternalRealtimeVoiceGatewayRelayLaunchError as a, listRealtimeVoiceProviders as c, cancelInternalRealtimeVoiceBrowserSession as i, normalizeRealtimeVoiceProviderId as l, resolveConfiguredRealtimeVoiceProvider as n, canonicalizeRealtimeVoiceProviderId as o, resolveRealtimeVoiceProviderCapabilities as r, getRealtimeVoiceProvider as s, isRealtimeVoiceProviderConfigured as t };
