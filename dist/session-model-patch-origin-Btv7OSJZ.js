import { c as normalizeOptionalString, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { n as resolveProviderIdForAuth } from "./provider-auth-aliases-BxGzIxtp.js";
import { n as resolveSessionModelRef } from "./session-model-ref-D6sDGDAK.js";
import { AsyncLocalStorage } from "node:async_hooks";
//#region src/config/sessions/session-model-fallback.ts
function createAgentPatchedSessionModelFallback(params) {
	const { entry } = params;
	return {
		prevModel: params.model,
		prevProvider: params.provider,
		...entry.modelOverride ? { prevModelOverride: entry.modelOverride } : {},
		...entry.providerOverride ? { prevProviderOverride: entry.providerOverride } : {},
		...entry.modelOverrideSource ? { prevModelOverrideSource: entry.modelOverrideSource } : {},
		...entry.modelOverrideRouteResolution ? { prevModelOverrideRouteResolution: entry.modelOverrideRouteResolution } : {},
		...entry.modelOverrideFallbackOriginProvider ? { prevModelOverrideFallbackOriginProvider: entry.modelOverrideFallbackOriginProvider } : {},
		...entry.modelOverrideFallbackOriginModel ? { prevModelOverrideFallbackOriginModel: entry.modelOverrideFallbackOriginModel } : {},
		...entry.authProfileOverride ? { prevAuthProfileOverride: entry.authProfileOverride } : {},
		...entry.authProfileOverrideSource ? { prevAuthProfileOverrideSource: entry.authProfileOverrideSource } : {},
		...entry.authProfileOverrideCompactionCount !== void 0 ? { prevAuthProfileOverrideCompactionCount: entry.authProfileOverrideCompactionCount } : {},
		...entry.thinkingLevel ? { prevThinkingLevel: entry.thinkingLevel } : {},
		ts: params.ts,
		source: "agent-patch"
	};
}
//#endregion
//#region src/gateway/session-model-patch-origin.ts
const agentSessionModelPatch = new AsyncLocalStorage();
function withAgentSessionModelPatchOrigin(run) {
	return agentSessionModelPatch.run(true, run);
}
function isAgentSessionModelPatchOrigin() {
	return agentSessionModelPatch.getStore() === true;
}
function shouldPreserveSessionAuthProfileOverride(params) {
	const profileOverride = normalizeOptionalString(params.entry.authProfileOverride);
	const provider = normalizeOptionalLowercaseString(params.provider);
	if (!profileOverride || !provider) return false;
	const resolvesToTargetProvider = (rawProvider) => {
		const candidate = normalizeOptionalLowercaseString(rawProvider);
		const lookupParams = {
			config: params.cfg,
			...params.metadataSnapshot ? { metadataSnapshot: params.metadataSnapshot } : {}
		};
		return Boolean(candidate && resolveProviderIdForAuth(candidate, lookupParams) === resolveProviderIdForAuth(provider, lookupParams));
	};
	const delimiterIndex = profileOverride.indexOf(":");
	if (delimiterIndex < 0) return resolvesToTargetProvider(params.currentProvider);
	return resolvesToTargetProvider(profileOverride.slice(0, delimiterIndex));
}
function snapshotAgentModelFallback(cfg, entry, agentId, now) {
	const prior = resolveSessionModelRef(cfg, entry, agentId);
	return createAgentPatchedSessionModelFallback({
		model: prior.model,
		provider: prior.provider,
		entry,
		ts: now
	});
}
//#endregion
export { createAgentPatchedSessionModelFallback as a, withAgentSessionModelPatchOrigin as i, shouldPreserveSessionAuthProfileOverride as n, snapshotAgentModelFallback as r, isAgentSessionModelPatchOrigin as t };
