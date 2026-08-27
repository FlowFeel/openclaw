import { r as normalizeProviderId } from "./provider-id-BIcU_2-A.js";
import { a as getRuntimeConfigSnapshot, c as getRuntimeConfigSourceSnapshot, x as selectApplicableRuntimeConfig } from "./runtime-snapshot-DLOCFXOE.js";
import "./config-UtpOr1Uw.js";
import { i as mintSecretSentinel } from "./sentinel-DVfNmxPl.js";
import { n as SecretSurfaceUnavailableError, s as findActiveDegradedSecretOwner } from "./runtime-degraded-state-V0p9ck6P.js";
import { g as resolveLiteralProviderConfigApiKeyAuth, i as hasSecretRefProviderApiKey, u as providerConfigMatchesRuntimeSnapshot } from "./model-auth-provider-config-B5rr_zPt.js";
//#region src/agents/model-auth-runtime-config.ts
/**
* Runtime-config-backed provider auth that does not require plugin activation.
*/
/** Reads a runtime-resolved credential for a SecretRef-backed provider entry. */
function resolveManagedSecretRefRuntimeProviderAuth(params) {
	const runtimeConfig = getRuntimeConfigSnapshot();
	const runtimeSourceConfig = getRuntimeConfigSourceSnapshot();
	if (params.cfg && params.cfg !== runtimeConfig && !runtimeSourceConfig) return;
	const usesRuntimeProvider = selectApplicableRuntimeConfig({
		inputConfig: params.cfg,
		runtimeConfig,
		runtimeSourceConfig
	}) === runtimeConfig || providerConfigMatchesRuntimeSnapshot({
		inputConfig: params.cfg,
		runtimeConfig,
		provider: params.provider
	});
	if (!hasSecretRefProviderApiKey(usesRuntimeProvider ? runtimeSourceConfig ?? void 0 : params.cfg, params.provider)) return;
	if (!runtimeConfig || !usesRuntimeProvider) return;
	const resolved = resolveLiteralProviderConfigApiKeyAuth({
		cfg: runtimeConfig,
		provider: params.provider
	});
	if (!resolved?.apiKey) return;
	return {
		...resolved,
		apiKey: params.secretSentinels ? mintSecretSentinel(resolved.apiKey, { label: `model-auth:${params.provider}` }) : resolved.apiKey
	};
}
function assertRuntimeProviderSecretOwnerAvailable(params) {
	const provider = normalizeProviderId(params.provider);
	const degraded = findActiveDegradedSecretOwner("provider", provider);
	if (!degraded) return;
	const runtimeConfig = getRuntimeConfigSnapshot();
	const runtimeSourceConfig = getRuntimeConfigSourceSnapshot();
	if (!params.cfg || params.cfg === runtimeConfig || params.cfg === runtimeSourceConfig || providerConfigMatchesRuntimeSnapshot({
		inputConfig: params.cfg,
		runtimeConfig,
		provider
	})) throw new SecretSurfaceUnavailableError(degraded);
}
//#endregion
export { resolveManagedSecretRefRuntimeProviderAuth as n, assertRuntimeProviderSecretOwnerAvailable as t };
