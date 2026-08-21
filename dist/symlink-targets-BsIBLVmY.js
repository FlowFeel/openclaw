import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { i as isPathInside } from "./path-D8zNGPJM.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import "./path-guards-C3glTcy2.js";
import fs from "node:fs";
import path from "node:path";
//#region src/skills/runtime/refresh-state.ts
const listeners = /* @__PURE__ */ new Set();
const workspaceVersions = /* @__PURE__ */ new Map();
const INITIAL_SKILLS_SNAPSHOT_VERSION = Date.now();
let globalVersion = INITIAL_SKILLS_SNAPSHOT_VERSION;
let listenerErrorHandler;
function bumpVersion(current) {
	const now = Date.now();
	return now <= current ? current + 1 : now;
}
function emit(event) {
	for (const listener of listeners) try {
		listener(event);
	} catch (err) {
		listenerErrorHandler?.(err);
	}
}
function setSkillsChangeListenerErrorHandler(handler) {
	listenerErrorHandler = handler;
}
function registerSkillsChangeListener(listener) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
function bumpSkillsSnapshotVersion(params) {
	const reason = params?.reason ?? "manual";
	const changedPath = params?.changedPath;
	if (params?.workspaceDir) {
		const next = bumpVersion(Math.max(globalVersion, workspaceVersions.get(params.workspaceDir) ?? 0));
		workspaceVersions.set(params.workspaceDir, next);
		emit({
			workspaceDir: params.workspaceDir,
			reason,
			changedPath
		});
		return next;
	}
	globalVersion = bumpVersion(globalVersion);
	emit({
		reason,
		changedPath
	});
	return globalVersion;
}
function getSkillsSnapshotVersion(workspaceDir) {
	if (!workspaceDir) return globalVersion;
	const local = workspaceVersions.get(workspaceDir) ?? 0;
	return Math.max(globalVersion, local);
}
function clearSkillsSnapshotVersionForWorkspace(workspaceDir) {
	const local = workspaceVersions.get(workspaceDir);
	if (typeof local === "number" && local > globalVersion) globalVersion = local;
	workspaceVersions.delete(workspaceDir);
}
function shouldRefreshSnapshotForVersion(cachedVersion, nextVersion) {
	const cached = typeof cachedVersion === "number" ? cachedVersion : 0;
	const next = typeof nextVersion === "number" ? nextVersion : 0;
	return next === 0 ? cached > 0 : cached < next;
}
function resetSkillsRefreshStateForTest() {
	listeners.clear();
	workspaceVersions.clear();
	globalVersion = INITIAL_SKILLS_SNAPSHOT_VERSION;
	listenerErrorHandler = void 0;
}
//#endregion
//#region src/skills/loading/symlink-targets.ts
function resolveAllowedSkillSymlinkTargetRealPaths(config) {
	return uniqueStrings((config?.skills?.load?.allowSymlinkTargets ?? []).map((dir) => normalizeOptionalString(dir) ?? "").filter(Boolean).map((dir) => tryRealpath(resolveUserPath(dir))).filter((dir) => Boolean(dir)));
}
function findContainingAllowedSkillSymlinkTarget(rootRealPaths, candidateRealPath) {
	const resolvedCandidate = path.resolve(candidateRealPath);
	for (const rootRealPath of rootRealPaths) {
		const resolvedRoot = path.resolve(rootRealPath);
		if (isPathInside(resolvedRoot, resolvedCandidate)) return resolvedRoot;
	}
	return null;
}
function tryRealpath(filePath) {
	try {
		return fs.realpathSync(filePath);
	} catch {
		return null;
	}
}
//#endregion
export { clearSkillsSnapshotVersionForWorkspace as a, resetSkillsRefreshStateForTest as c, bumpSkillsSnapshotVersion as i, setSkillsChangeListenerErrorHandler as l, resolveAllowedSkillSymlinkTargetRealPaths as n, getSkillsSnapshotVersion as o, tryRealpath as r, registerSkillsChangeListener as s, findContainingAllowedSkillSymlinkTarget as t, shouldRefreshSnapshotForVersion as u };
