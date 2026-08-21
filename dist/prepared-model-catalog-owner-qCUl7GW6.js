import { c as resolveAgentDir, i as listAgentIds, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import "./agent-scope-DyEposw2.js";
//#region src/agents/prepared-model-catalog-owner.ts
var PublishedModelCatalogOwnerResolutionError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "PublishedModelCatalogOwnerResolutionError";
	}
};
function resolvePublishedModelCatalogOwner(snapshot) {
	const configuredAgentIds = listAgentIds(snapshot.config);
	const directoryAgentIds = configuredAgentIds.filter((candidate) => resolveAgentDir(snapshot.config, candidate) === snapshot.agentDir);
	const agentId = snapshot.agentId ? configuredAgentIds.find((candidate) => normalizeAgentId(candidate) === normalizeAgentId(snapshot.agentId)) : directoryAgentIds.length === 1 ? directoryAgentIds[0] : void 0;
	if (!agentId || resolveAgentDir(snapshot.config, agentId) !== snapshot.agentDir) throw new PublishedModelCatalogOwnerResolutionError(`published model catalog owner did not identify one configured agent (${snapshot.agentDir})`);
	const workspaceDir = snapshot.workspaceDir ?? resolveAgentWorkspaceDir(snapshot.config, agentId);
	if (!workspaceDir) throw new PublishedModelCatalogOwnerResolutionError(`published model catalog owner did not identify a workspace (${agentId})`);
	return Object.freeze({
		agentId,
		agentDir: snapshot.agentDir,
		workspaceDir,
		config: snapshot.config,
		modelCatalog: snapshot.modelCatalog
	});
}
function publishedModelCatalogOwnerMatchesAgent(owner, agentId) {
	return owner.agentId === normalizeAgentId(agentId);
}
//#endregion
export { resolvePublishedModelCatalogOwner as n, publishedModelCatalogOwnerMatchesAgent as t };
