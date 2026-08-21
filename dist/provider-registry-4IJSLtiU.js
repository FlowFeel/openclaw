import { r as normalizeCapabilityProviderId, t as buildCapabilityProviderMaps } from "./provider-registry-shared-DpBO0Uka.js";
import { i as resolvePluginCapabilityProviders, r as resolvePluginCapabilityProvider } from "./capability-provider-runtime-C2mQcSwc.js";
//#region src/transcripts/provider-registry.ts
/**
* Transcript source provider registry.
*
* Transcript providers are plugin capability providers; this module exposes
* canonical/alias lookup through the shared capability runtime.
*/
/** Normalize transcript source provider ids for registry lookup. */
function normalizeTranscriptSourceProviderId(providerId) {
	return normalizeCapabilityProviderId(providerId);
}
function resolveTranscriptsSourceProviderEntries(cfg) {
	return resolvePluginCapabilityProviders({
		key: "transcriptSourceProviders",
		cfg
	});
}
function buildProviderMaps(cfg) {
	return buildCapabilityProviderMaps(resolveTranscriptsSourceProviderEntries(cfg));
}
/** List canonical transcript source providers for a config snapshot. */
function listTranscriptSourceProviders(cfg) {
	return [...buildProviderMaps(cfg).canonical.values()];
}
/** Resolve a transcript provider by canonical id or alias. */
function getTranscriptSourceProvider(providerId, cfg) {
	const normalized = normalizeTranscriptSourceProviderId(providerId);
	if (!normalized) return;
	return resolvePluginCapabilityProvider({
		key: "transcriptSourceProviders",
		providerId: normalized,
		cfg
	});
}
//#endregion
export { listTranscriptSourceProviders as n, normalizeTranscriptSourceProviderId as r, getTranscriptSourceProvider as t };
