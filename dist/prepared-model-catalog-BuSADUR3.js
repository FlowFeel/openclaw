import { c as resolveAgentDir, d as resolveDefaultAgentDir, f as resolveDefaultAgentId, i as listAgentIds, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import "./agent-scope-DyEposw2.js";
import "./config-UtpOr1Uw.js";
import { n as resolvePublishedModelCatalogOwner } from "./prepared-model-catalog-owner-qCUl7GW6.js";
import { n as isPreparedModelCatalogFull } from "./prepared-model-runtime.facts-CqIr_une.js";
import { d as preparedModelRuntimeConfigsMatch, f as PreparedModelRuntimeOwnerNotPublishedError, i as getPreparedModelRuntimeSnapshot, n as acquireReadOnlyPreparedModelRuntime, r as activateStandalonePreparedModelRuntime, s as prepareModelRuntimeSnapshot, t as acquireAgentRunPreparedModelRuntime } from "./prepared-model-runtime-BoxOFkXM.js";
import { n as prepareScopedReadOnlyModelCatalog } from "./prepared-model-runtime.scoped-catalog-C2aOGnGv.js";
//#region src/agents/prepared-model-catalog.errors.ts
var PreparedModelCatalogConfigReplacedError = class extends Error {
	constructor(agentDir) {
		super(`prepared model catalog owner config was replaced during the read (${agentDir})`);
		this.name = "PreparedModelCatalogConfigReplacedError";
	}
};
//#endregion
//#region src/agents/prepared-model-catalog.ts
/** Lifecycle-owned model catalog access. */
async function materializeRequestedModelCatalog(snapshot, readOnly) {
	if (readOnly === true || !snapshot.loadFullModelCatalog) return snapshot;
	const modelCatalog = await snapshot.loadFullModelCatalog();
	return modelCatalog === snapshot.modelCatalog ? snapshot : Object.freeze({
		...snapshot,
		modelCatalog
	});
}
function acceptsPreparedSnapshotConfig(snapshot, input, policy) {
	return policy === "published" || preparedModelRuntimeConfigsMatch(snapshot.config, input.config);
}
function resolveInputs(params = {}) {
	const config = params.config ?? getRuntimeConfig();
	const explicitOrDefaultAgentId = params.agentId ?? (params.agentDir === void 0 ? resolveDefaultAgentId(config) : void 0);
	const agentDir = params.agentDir ?? (explicitOrDefaultAgentId ? resolveAgentDir(config, explicitOrDefaultAgentId) : resolveDefaultAgentDir(config, params.env));
	const matchingAgentIds = params.agentDir === void 0 ? [] : listAgentIds(config).filter((candidateAgentId) => resolveAgentDir(config, candidateAgentId) === agentDir);
	const agentId = explicitOrDefaultAgentId ?? (params.agentDir === void 0 ? resolveDefaultAgentId(config) : matchingAgentIds.length === 1 ? matchingAgentIds[0] : void 0);
	const explicitWorkspaceDir = params.workspaceDir === void 0 ? void 0 : params.workspaceDir;
	const activationWorkspaceDir = explicitWorkspaceDir ?? (agentId ? resolveAgentWorkspaceDir(config, agentId) : void 0);
	const full = {
		...agentId ? { agentId } : {},
		agentDir,
		config,
		...params.env ? { env: params.env } : {},
		inheritedAuthDir: resolveDefaultAgentDir(config, params.env),
		...explicitWorkspaceDir ? { workspaceDir: explicitWorkspaceDir } : {},
		...params.allowGatewaySubagentBinding ? { allowGatewaySubagentBinding: true } : {}
	};
	const exact = params.readOnly ? {
		...full,
		readOnly: true
	} : full;
	const activationFull = activationWorkspaceDir ? {
		...full,
		workspaceDir: activationWorkspaceDir
	} : full;
	return {
		exact,
		full,
		activationFull,
		activationExact: params.readOnly ? {
			...activationFull,
			readOnly: true
		} : activationFull
	};
}
/** Returns the configured catalog for the current generation without starting discovery. */
function getPreparedModelCatalogSnapshot(params = {}) {
	const { activationExact, activationFull, exact, full } = resolveInputs(params);
	const publishedFull = getPreparedModelRuntimeSnapshot(full);
	if (publishedFull && preparedModelRuntimeConfigsMatch(publishedFull.config, full.config)) return publishedFull.modelCatalog;
	if (activationFull && activationFull.workspaceDir !== full.workspaceDir) {
		const activatedFull = getPreparedModelRuntimeSnapshot(activationFull);
		if (activatedFull && preparedModelRuntimeConfigsMatch(activatedFull.config, full.config)) return activatedFull.modelCatalog;
	}
	if (exact === full) return;
	const publishedExact = getPreparedModelRuntimeSnapshot(exact);
	if (publishedExact && preparedModelRuntimeConfigsMatch(publishedExact.config, exact.config)) return publishedExact.modelCatalog;
	if (!activationExact || activationExact.workspaceDir === exact.workspaceDir) return;
	const activatedExact = getPreparedModelRuntimeSnapshot(activationExact);
	return activatedExact && preparedModelRuntimeConfigsMatch(activatedExact.config, exact.config) ? activatedExact.modelCatalog : void 0;
}
async function resolvePreparedModelCatalogOwnerSnapshotWithPolicy(params, configPolicy) {
	const { activationExact, activationFull, exact, full } = resolveInputs(params);
	if (params.readOnly) {
		const fullCandidates = activationFull.workspaceDir === full.workspaceDir ? [full] : [full, activationFull];
		for (const candidate of fullCandidates) try {
			const prepared = await prepareModelRuntimeSnapshot(candidate);
			if (!acceptsPreparedSnapshotConfig(prepared, candidate, configPolicy)) throw new PreparedModelCatalogConfigReplacedError(candidate.agentDir);
			return prepared;
		} catch (error) {
			if (!(error instanceof PreparedModelRuntimeOwnerNotPublishedError)) throw error;
		}
		const lease = await acquireReadOnlyPreparedModelRuntime(activationExact);
		try {
			if (!acceptsPreparedSnapshotConfig(lease.snapshot, activationExact, configPolicy)) throw new PreparedModelCatalogConfigReplacedError(activationExact.agentDir);
			return lease.snapshot;
		} finally {
			lease.release();
		}
	}
	if (exact !== full) {
		const fullCandidates = activationFull.workspaceDir === full.workspaceDir ? [full] : [full, activationFull];
		for (const candidate of fullCandidates) try {
			const preparedFull = await prepareModelRuntimeSnapshot(candidate);
			if (acceptsPreparedSnapshotConfig(preparedFull, full, configPolicy)) return preparedFull;
		} catch (error) {
			if (!(error instanceof PreparedModelRuntimeOwnerNotPublishedError)) throw error;
		}
	}
	try {
		const preparedExact = await prepareModelRuntimeSnapshot(exact);
		if (acceptsPreparedSnapshotConfig(preparedExact, exact, configPolicy)) return preparedExact;
	} catch (error) {
		if (!(error instanceof PreparedModelRuntimeOwnerNotPublishedError)) throw error;
	}
	const activated = await activateStandalonePreparedModelRuntime(activationExact);
	if (activated && acceptsPreparedSnapshotConfig(activated, activationExact, configPolicy)) return activated;
	if (activated) throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared model catalog owner was not published for the requested config (${activationExact.agentDir})`);
	const lease = await acquireAgentRunPreparedModelRuntime(activationFull);
	try {
		if (!acceptsPreparedSnapshotConfig(lease.snapshot, activationFull, configPolicy)) throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared model catalog owner was not published for the requested config (${activationFull.agentDir})`);
		return lease.snapshot;
	} finally {
		lease.release();
	}
}
async function loadPreparedModelCatalogOwnerSnapshotWithPolicy(params, configPolicy) {
	return await materializeRequestedModelCatalog(await resolvePreparedModelCatalogOwnerSnapshotWithPolicy(params, configPolicy), params.readOnly);
}
async function loadScopedReadOnlyModelCatalog(params) {
	const { activationExact, activationFull, full } = resolveInputs(params);
	const fullCandidates = activationFull.workspaceDir === full.workspaceDir ? [full] : [full, activationFull];
	for (const candidate of fullCandidates) try {
		const prepared = await prepareModelRuntimeSnapshot(candidate);
		if (!preparedModelRuntimeConfigsMatch(prepared.config, candidate.config)) throw new PreparedModelCatalogConfigReplacedError(candidate.agentDir);
		if (isPreparedModelCatalogFull(prepared.modelCatalog)) return prepared.modelCatalog;
	} catch (error) {
		if (!(error instanceof PreparedModelRuntimeOwnerNotPublishedError)) throw error;
	}
	return prepareScopedReadOnlyModelCatalog(activationExact, params.providerDiscoveryProviderIds ?? []);
}
/** Resolves the lifecycle owner for an exact caller-supplied config. */
async function loadPreparedModelCatalogOwnerSnapshot(params = {}) {
	return await loadPreparedModelCatalogOwnerSnapshotWithPolicy(params, "exact");
}
/** Resolves the currently published owner when Gateway config changes during the read. */
async function loadPublishedPreparedModelCatalogOwnerSnapshot(params = {}) {
	return await loadPreparedModelCatalogOwnerSnapshotWithPolicy(params, "published");
}
/** Resolves a complete published owner for long-lived runtime consumers. */
async function loadResolvedPublishedModelCatalogOwner(params = {}) {
	return resolvePublishedModelCatalogOwner(await loadPublishedPreparedModelCatalogOwnerSnapshot(params));
}
/** Reads one atomic catalog generation, activating a lifecycle owner when needed. */
async function loadPreparedModelCatalogSnapshot(params = {}) {
	if (params.readOnly && params.providerDiscoveryProviderIds) return loadScopedReadOnlyModelCatalog(params);
	return (await loadPreparedModelCatalogOwnerSnapshot(params)).modelCatalog;
}
async function loadPreparedModelCatalog(params = {}) {
	return (await loadPreparedModelCatalogSnapshot(params)).entries;
}
/** Reads the committed owner generation for long-lived runtime work. */
async function loadPublishedPreparedModelCatalog(params = {}) {
	return (await loadPublishedPreparedModelCatalogOwnerSnapshot(params)).modelCatalog.entries;
}
//#endregion
export { loadPublishedPreparedModelCatalog as a, loadPreparedModelCatalogSnapshot as i, loadPreparedModelCatalog as n, loadPublishedPreparedModelCatalogOwnerSnapshot as o, loadPreparedModelCatalogOwnerSnapshot as r, loadResolvedPublishedModelCatalogOwner as s, getPreparedModelCatalogSnapshot as t };
