import { s as normalizeDeliveryContext } from "./delivery-context.shared-B-QSuGw_.js";
import { b as subagentRuns } from "./subagent-registry.store.sqlite-gBhFvyR2.js";
import { C as resolveRequesterForChildSessionFromRuns, S as listRunsForRequesterFromRuns, h as countPendingDescendantRunsFromRuns, i as getSubagentRunsSnapshotForRead, m as countPendingDescendantRunsExcludingRunFromRuns, v as hasDescendantRunAwaitingSettleFromRuns, w as shouldIgnorePostCompletionAnnounceForSessionFromRuns, y as isSubagentSessionRunActiveFromRuns } from "./subagent-registry-state-D0eZgp5g.js";
import { a as getLatestSubagentRunByChildSessionKey, r as countActiveDescendantRuns } from "./subagent-registry-read-DBYMH4dZ.js";
//#region src/agents/subagent-registry-announce-read.ts
/**
* Read-side helpers for subagent completion announcements. These wrappers keep
* announce delivery code on normalized registry snapshots instead of reaching
* into persistence or mutation paths.
*/
/** Resolves the requester session and origin for a child subagent session. */
function resolveRequesterForChildSession(childSessionKey) {
	const resolved = resolveRequesterForChildSessionFromRuns(getSubagentRunsSnapshotForRead(subagentRuns), childSessionKey);
	if (!resolved) return null;
	return {
		requesterSessionKey: resolved.requesterSessionKey,
		requesterOrigin: normalizeDeliveryContext(resolved.requesterOrigin)
	};
}
/** True when a subagent session still has an active run record. */
function isSubagentSessionRunActive(childSessionKey) {
	return isSubagentSessionRunActiveFromRuns(subagentRuns, childSessionKey);
}
/** True when post-completion announce should be skipped for a child session. */
function shouldIgnorePostCompletionAnnounceForSession(childSessionKey) {
	return shouldIgnorePostCompletionAnnounceForSessionFromRuns(getSubagentRunsSnapshotForRead(subagentRuns), childSessionKey);
}
/** Lists subagent runs requested by one session key. */
function listSubagentRunsForRequester(requesterSessionKey, options) {
	return listRunsForRequesterFromRuns(subagentRuns, requesterSessionKey, options);
}
/** Counts pending descendant subagent runs below a root session. */
function countPendingDescendantRuns(rootSessionKey) {
	return countPendingDescendantRunsFromRuns(getSubagentRunsSnapshotForRead(subagentRuns), rootSessionKey);
}
/** Counts pending descendant runs while excluding one run id. */
function countPendingDescendantRunsExcludingRun(rootSessionKey, excludeRunId) {
	return countPendingDescendantRunsExcludingRunFromRuns(getSubagentRunsSnapshotForRead(subagentRuns), rootSessionKey, excludeRunId);
}
/** True when any descendant run still awaits terminal settle (suspended delivery counts as settled). */
function hasDescendantRunAwaitingSettle(rootSessionKey, excludeRunId) {
	return hasDescendantRunAwaitingSettleFromRuns(getSubagentRunsSnapshotForRead(subagentRuns), rootSessionKey, excludeRunId);
}
//#endregion
//#region src/agents/subagent-registry-runtime.ts
async function replaceSubagentRunAfterSteer(params) {
	return (await import("./subagent-registry-XK4iQvAp.js")).replaceSubagentRunAfterSteer(params);
}
//#endregion
export { countActiveDescendantRuns, countPendingDescendantRuns, countPendingDescendantRunsExcludingRun, getLatestSubagentRunByChildSessionKey, hasDescendantRunAwaitingSettle, isSubagentSessionRunActive, listSubagentRunsForRequester, replaceSubagentRunAfterSteer, resolveRequesterForChildSession, shouldIgnorePostCompletionAnnounceForSession };
