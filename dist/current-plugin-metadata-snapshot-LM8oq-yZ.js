import { l as normalizeStringEntries } from "./string-normalization-CRyoFBPt.js";
import { a as setCurrentPluginMetadataSnapshotState, i as getCurrentPluginMetadataSnapshotState, r as currentPluginMetadataConfigIdentityCache } from "./plugin-metadata-lifecycle-NcA0EWhA.js";
import { p as resolveInstalledPluginIndexPolicyHash } from "./installed-plugin-index-DXmBG059.js";
import { n as resolvePluginControlPlaneFingerprint } from "./plugin-control-plane-context-BLIc52iG.js";
//#region src/plugins/plugin-scope.ts
/** Normalizes plugin id scope input into a sorted unique string list. */
function normalizePluginIdScope(ids) {
	if (ids === void 0) return;
	return Array.from(new Set(normalizeStringEntries(ids.filter((id) => typeof id === "string")))).toSorted();
}
/** True when plugin scope was explicitly provided, including an empty scope. */
function hasExplicitPluginIdScope(ids) {
	return ids !== void 0;
}
/** True when plugin scope was explicitly provided with at least one id. */
function hasNonEmptyPluginIdScope(ids) {
	return ids !== void 0 && ids.length > 0;
}
/** Creates a lookup set for explicit plugin scope, or null when unscoped. */
function createPluginIdScopeSet(ids) {
	if (ids === void 0) return null;
	return new Set(ids);
}
/** Serializes plugin scope for cache keys. */
function serializePluginIdScope(ids) {
	return ids === void 0 ? "__unscoped__" : JSON.stringify(ids);
}
//#endregion
//#region src/plugins/current-plugin-metadata-snapshot.ts
let activeTemporaryPluginMetadataSnapshotLease;
function resolvePluginMetadataControlPlaneFingerprint(config, options = {}) {
	return resolvePluginControlPlaneFingerprint({
		config,
		...options
	});
}
function publishCurrentPluginMetadataSnapshot(snapshot, options) {
	currentPluginMetadataConfigIdentityCache.clear();
	const compatiblePolicyHashes = snapshot ? options.compatibleConfigs?.map((config) => resolveInstalledPluginIndexPolicyHash(config)) : void 0;
	const compatibleConfigFingerprints = snapshot ? options.compatibleConfigs?.map((config, index) => resolvePluginMetadataControlPlaneFingerprint(config, {
		env: options.env,
		index: snapshot.index,
		policyHash: compatiblePolicyHashes?.[index],
		workspaceDir: options.workspaceDir ?? snapshot.workspaceDir
	})) : void 0;
	const configFingerprint = snapshot ? resolvePluginMetadataControlPlaneFingerprint(options.config, {
		env: options.env,
		index: snapshot.index,
		policyHash: snapshot.policyHash,
		workspaceDir: options.workspaceDir ?? snapshot.workspaceDir
	}) : void 0;
	const defaultDiscoveryConfigFingerprint = snapshot ? resolvePluginMetadataControlPlaneFingerprint({}, {
		env: options.env,
		index: snapshot.index,
		policyHash: snapshot.policyHash,
		workspaceDir: options.workspaceDir ?? snapshot.workspaceDir
	}) : void 0;
	const revision = setCurrentPluginMetadataSnapshotState(snapshot, configFingerprint, compatiblePolicyHashes, compatibleConfigFingerprints, snapshot && defaultDiscoveryConfigFingerprint && (configFingerprint === defaultDiscoveryConfigFingerprint || snapshot.configFingerprint === defaultDiscoveryConfigFingerprint || Boolean(compatibleConfigFingerprints?.includes(defaultDiscoveryConfigFingerprint))) ? snapshot.plugins : void 0);
	if (!snapshot) return revision;
	if (options.config) {
		const policyHash = resolveInstalledPluginIndexPolicyHash(options.config);
		if (policyHash === snapshot.policyHash || Boolean(compatiblePolicyHashes?.includes(policyHash))) currentPluginMetadataConfigIdentityCache.add(options.config);
	}
	for (const config of options.compatibleConfigs ?? []) currentPluginMetadataConfigIdentityCache.add(config);
	return revision;
}
function setCurrentPluginMetadataSnapshot(snapshot, options = {}) {
	activeTemporaryPluginMetadataSnapshotLease = void 0;
	publishCurrentPluginMetadataSnapshot(snapshot, options);
}
function captureCurrentPluginMetadataSnapshotState() {
	return {
		...getCurrentPluginMetadataSnapshotState(),
		configIdentities: currentPluginMetadataConfigIdentityCache.capture()
	};
}
function restoreCapturedCurrentPluginMetadataSnapshotState(state) {
	currentPluginMetadataConfigIdentityCache.restore(state.configIdentities);
	return setCurrentPluginMetadataSnapshotState(state.snapshot, state.configFingerprint, state.compatiblePolicyHashes, state.compatibleConfigFingerprints, state.manifestModelIdNormalizationRecords);
}
function resolveTemporaryPluginMetadataSnapshotLeaseParent() {
	const active = activeTemporaryPluginMetadataSnapshotLease;
	if (active && getCurrentPluginMetadataSnapshotState().revision !== active.revision) {
		activeTemporaryPluginMetadataSnapshotLease = void 0;
		return;
	}
	return active;
}
function releaseTemporaryPluginMetadataSnapshotLease(lease) {
	if (lease.released) return false;
	lease.released = true;
	if (activeTemporaryPluginMetadataSnapshotLease !== lease) return false;
	let restored = false;
	while (activeTemporaryPluginMetadataSnapshotLease?.released) {
		const current = activeTemporaryPluginMetadataSnapshotLease;
		if (getCurrentPluginMetadataSnapshotState().revision !== current.revision) {
			activeTemporaryPluginMetadataSnapshotLease = void 0;
			return restored;
		}
		const restoredRevision = restoreCapturedCurrentPluginMetadataSnapshotState(current.previousState);
		activeTemporaryPluginMetadataSnapshotLease = current.parent;
		if (activeTemporaryPluginMetadataSnapshotLease) activeTemporaryPluginMetadataSnapshotLease.revision = restoredRevision;
		restored = true;
	}
	return restored;
}
/** Temporarily publishes metadata without restoring over lifecycle-owned replacements. */
function installTemporaryCurrentPluginMetadataSnapshot(snapshot, options = {}) {
	const lease = {
		parent: resolveTemporaryPluginMetadataSnapshotLeaseParent(),
		previousState: captureCurrentPluginMetadataSnapshotState(),
		revision: publishCurrentPluginMetadataSnapshot(snapshot, options),
		released: false
	};
	activeTemporaryPluginMetadataSnapshotLease = lease;
	return { release: () => releaseTemporaryPluginMetadataSnapshotLease(lease) };
}
function getCurrentPluginMetadataSnapshot(params = {}) {
	const { snapshot: rawSnapshot, configFingerprint, compatiblePolicyHashes, compatibleConfigFingerprints } = getCurrentPluginMetadataSnapshotState();
	const snapshot = rawSnapshot;
	if (!snapshot) return;
	const env = params.env ?? process.env;
	const requestedPluginIds = normalizePluginIdScope(params.pluginIds ?? params.pluginIdScope?.resolve({ index: snapshot.index }));
	const snapshotPluginIds = normalizePluginIdScope(snapshot.pluginIds);
	if (requestedPluginIds !== void 0 && serializePluginIdScope(snapshotPluginIds) !== serializePluginIdScope(requestedPluginIds)) return;
	if (snapshotPluginIds !== void 0 && requestedPluginIds === void 0 && params.allowScopedSnapshot !== true) return;
	const requestedWorkspaceDir = params.workspaceDir ?? (params.allowWorkspaceScopedSnapshot === true ? snapshot.workspaceDir : void 0);
	if (snapshot.workspaceDir !== void 0 && requestedWorkspaceDir === void 0) return;
	if (requestedWorkspaceDir !== void 0 && (snapshot.workspaceDir ?? "") !== (requestedWorkspaceDir ?? "")) return;
	const canReuseCachedConfig = Boolean(params.config && currentPluginMetadataConfigIdentityCache.has(params.config));
	if (canReuseCachedConfig && params.requireDefaultDiscoveryContext !== true) return snapshot;
	const requestedPolicyHash = params.config && !canReuseCachedConfig ? resolveInstalledPluginIndexPolicyHash(params.config) : void 0;
	if (requestedPolicyHash && snapshot.policyHash !== requestedPolicyHash) {
		if (!compatiblePolicyHashes?.includes(requestedPolicyHash)) return;
	}
	if (params.config && !canReuseCachedConfig) {
		const requestedConfigFingerprint = resolvePluginMetadataControlPlaneFingerprint(params.config, {
			env,
			index: snapshot.index,
			policyHash: requestedPolicyHash,
			workspaceDir: requestedWorkspaceDir
		});
		if (!(configFingerprint === requestedConfigFingerprint || snapshot.configFingerprint === requestedConfigFingerprint || Boolean(compatibleConfigFingerprints?.includes(requestedConfigFingerprint)))) return;
	}
	if (params.requireDefaultDiscoveryContext === true) {
		const defaultDiscoveryConfigFingerprint = resolvePluginMetadataControlPlaneFingerprint({}, {
			env: params.env,
			index: snapshot.index,
			policyHash: snapshot.policyHash,
			workspaceDir: requestedWorkspaceDir
		});
		if (!(configFingerprint === defaultDiscoveryConfigFingerprint || snapshot.configFingerprint === defaultDiscoveryConfigFingerprint || Boolean(compatibleConfigFingerprints?.includes(defaultDiscoveryConfigFingerprint)))) return;
	}
	return snapshot;
}
//#endregion
export { hasExplicitPluginIdScope as a, serializePluginIdScope as c, createPluginIdScopeSet as i, installTemporaryCurrentPluginMetadataSnapshot as n, hasNonEmptyPluginIdScope as o, setCurrentPluginMetadataSnapshot as r, normalizePluginIdScope as s, getCurrentPluginMetadataSnapshot as t };
