import { f as resolveDefaultAgentId, m as toAgentEntriesRecord, n as listAgentEntries } from "./agent-scope-config-Dusa8eSA.js";
import { l as readConfigFileSnapshot } from "./io-BsQc3Kgy.js";
import { n as createMergePatch, t as applyMergePatch } from "./merge-patch-DNAwVDQs.js";
import "./config-BBVHtcXg.js";
import { t as createAgent } from "./agent-create-D_QgN2Cx.js";
//#region src/commands/onboard-agent.ts
function isInjectedMainRoster(config) {
	const roster = listAgentEntries(config);
	const entry = roster[0];
	return roster.length === 1 && entry?.id === "main" && entry?.default === true && Object.keys(entry).every((key) => key === "id" || key === "default");
}
function mergeOnboardingCandidate(params) {
	const proposalPatch = createMergePatch(params.base, params.candidate);
	const merged = applyMergePatch(params.currentRuntime, proposalPatch);
	const { list: _legacyList, ...agents } = merged.agents ?? {};
	return {
		...merged,
		agents: {
			...agents,
			entries: toAgentEntriesRecord(listAgentEntries(params.currentRuntime))
		}
	};
}
async function ensureOnboardingAgent(params) {
	if (listAgentEntries(params.config).length > 0 && (params.preserveCandidateRoster || !isInjectedMainRoster(params.config))) return {
		config: params.config,
		agentId: resolveDefaultAgentId(params.config),
		bootstrapPending: false
	};
	const before = await readConfigFileSnapshot();
	if (before.exists && !before.valid) throw new Error("Cannot create the first agent from an invalid OpenClaw config.");
	const effective = before.config;
	const candidateBase = params.baseConfig ?? effective;
	if (before.exists && listAgentEntries(effective).length > 0) return {
		config: mergeOnboardingCandidate({
			base: candidateBase,
			candidate: params.config,
			currentRuntime: effective
		}),
		agentId: resolveDefaultAgentId(effective),
		bootstrapPending: false
	};
	const created = await createAgent({
		entry: {
			id: "main",
			name: "main",
			default: true,
			workspace: params.workspace
		},
		skipBootstrap: params.config.agents?.defaults?.skipBootstrap,
		skipOptionalBootstrapFiles: params.config.agents?.defaults?.skipOptionalBootstrapFiles
	});
	if (created.status === "error") throw new Error(created.message);
	const after = await readConfigFileSnapshot();
	if (!after.valid) throw new Error("Agent creation wrote an invalid OpenClaw config.");
	return {
		config: mergeOnboardingCandidate({
			base: candidateBase,
			candidate: params.config,
			currentRuntime: after.config
		}),
		agentId: created.agentId,
		bootstrapPending: created.bootstrapPending,
		...after.hash !== void 0 ? { configHash: after.hash } : {}
	};
}
function ensureOnboardingConfig(config, workspace, preserveCandidateRoster = false, baseConfig) {
	return ensureOnboardingAgent({
		config,
		workspace,
		preserveCandidateRoster,
		baseConfig
	});
}
//#endregion
export { ensureOnboardingAgent, ensureOnboardingConfig };
