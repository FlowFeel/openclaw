import { r as normalizeProviderId } from "./provider-id-BIcU_2-A.js";
import { h as tryResolveDefaultAgentId, i as listAgentIds } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import "./agent-scope-DyEposw2.js";
import { a as hasAvailableAuthForProvider } from "./model-auth-D-tc_3Dn.js";
import { i as verifySetupInference } from "./setup-inference-DNf3aB5F.js";
import { i as resolveSystemAgentTargetAgentId, r as resolveSystemAgentConfiguredRouteFromConfig } from "./inference-route-fxRKzhD7.js";
//#region src/system-agent/inference-fallback.ts
const RETRYABLE_INFERENCE_STATUSES = /* @__PURE__ */ new Set([
	"auth",
	"rate_limit",
	"billing",
	"timeout",
	"unavailable"
]);
const CREDENTIAL_SCOPED_FAILURE_STATUSES = /* @__PURE__ */ new Set([
	"auth",
	"billing",
	"rate_limit"
]);
async function readCurrentConfig() {
	const { readConfigFileSnapshot } = await import("./config/config.js");
	const snapshot = await readConfigFileSnapshot();
	if (!snapshot.exists || !snapshot.valid) return {};
	return snapshot.runtimeConfig ?? snapshot.config;
}
/** Requester first. Other configured, authenticated providers: provider-id order. */
async function verifySystemAgentInferenceWithFallback(params) {
	const deps = params.deps ?? {};
	const config = await (deps.readConfig ?? readCurrentConfig)();
	const defaultAgentId = params.requestingAgentId ? tryResolveDefaultAgentId(config) : resolveSystemAgentTargetAgentId(config);
	const requestedAgentId = normalizeAgentId(params.requestingAgentId ?? defaultAgentId);
	const candidateAgentIds = [requestedAgentId, ...listAgentIds(config).map((agentId) => normalizeAgentId(agentId))];
	const resolveRoute = deps.resolveRoute ?? resolveSystemAgentConfiguredRouteFromConfig;
	const routes = [];
	for (const agentId of candidateAgentIds) {
		const route = await resolveRoute(config, agentId);
		if (!route) continue;
		const provider = normalizeProviderId(route.provider);
		if (!provider) continue;
		routes.push({
			agentId,
			provider,
			route
		});
	}
	const first = routes.find((candidate) => candidate.agentId === requestedAgentId);
	const ordered = [...first ? [first] : [], ...routes.filter((candidate) => candidate !== first).toSorted((left, right) => left.provider.localeCompare(right.provider) || left.agentId.localeCompare(right.agentId))];
	const hasAuth = deps.hasAuth ?? hasAvailableAuthForProvider;
	const verify = deps.verify ?? verifySetupInference;
	let lastFailure;
	const failedProviders = /* @__PURE__ */ new Set();
	const attemptedOwners = /* @__PURE__ */ new Set();
	for (const candidate of ordered) {
		if (failedProviders.has(candidate.provider)) continue;
		const ownerKey = JSON.stringify([
			candidate.provider,
			candidate.route.authProfileId ?? null,
			candidate.route.agentDir ?? null
		]);
		if (attemptedOwners.has(ownerKey)) continue;
		if (candidate !== first && !await hasAuth({
			provider: candidate.provider,
			cfg: config,
			preferredProfile: candidate.route.authProfileId,
			agentDir: candidate.route.agentDir,
			modelId: candidate.route.model
		})) continue;
		attemptedOwners.add(ownerKey);
		const result = await verify({
			runtime: params.runtime,
			bindSession: true,
			agentId: candidate.agentId
		});
		if (result.ok) return result;
		lastFailure = result;
		if (!RETRYABLE_INFERENCE_STATUSES.has(result.status)) return result;
		if (!CREDENTIAL_SCOPED_FAILURE_STATUSES.has(result.status)) failedProviders.add(candidate.provider);
	}
	return lastFailure ?? {
		ok: false,
		status: "unavailable",
		error: "No configured authenticated inference provider is available."
	};
}
//#endregion
export { verifySystemAgentInferenceWithFallback };
