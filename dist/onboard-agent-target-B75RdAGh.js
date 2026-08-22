import { c as resolveAgentDir, f as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { n as normalizeAgentModelRefForConfig, r as resolveAgentModelFallbackValues, t as normalizeAgentModelMapForConfig } from "./model-input-BofPWz0k.js";
import { t as applyPrimaryModel } from "./provider-model-primary-D9OQNboR.js";
import { i as ensureWorkspaceAndSessions } from "./onboard-helpers-BlDftc97.js";
//#region src/commands/onboard-agent-target.ts
function resolveOnboardingAgentTarget(config, explicitAgentId) {
	const agentId = normalizeAgentId(explicitAgentId ?? resolveDefaultAgentId(config));
	return {
		agentId,
		agentDir: resolveAgentDir(config, agentId),
		workspaceDir: resolveAgentWorkspaceDir(config, agentId)
	};
}
async function ensureOnboardingAgentWorkspace(target, runtime, options) {
	return ensureWorkspaceAndSessions(target.workspaceDir, runtime, {
		...options,
		agentId: target.agentId
	});
}
function applyOnboardingPrimaryModel(config, target, model) {
	const entry = config.agents?.entries?.[target.agentId];
	if (entry?.model === void 0) return applyPrimaryModel(config, model);
	const primary = normalizeAgentModelRefForConfig(model);
	const fallbackValues = resolveAgentModelFallbackValues(entry.model).map((fallback) => normalizeAgentModelRefForConfig(fallback));
	const models = normalizeAgentModelMapForConfig(entry.models ?? {});
	return {
		...config,
		agents: {
			...config.agents,
			entries: {
				...config.agents?.entries,
				[target.agentId]: {
					...entry,
					model: {
						...fallbackValues.length > 0 ? { fallbacks: fallbackValues } : {},
						primary
					},
					models: {
						...models,
						[primary]: models[primary] ?? {}
					}
				}
			}
		}
	};
}
//#endregion
export { ensureOnboardingAgentWorkspace as n, resolveOnboardingAgentTarget as r, applyOnboardingPrimaryModel as t };
