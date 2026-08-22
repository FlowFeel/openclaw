import { a as getAgentRunContext } from "./agent-run-registry-BluEqSPq.js";
import { b as subagentRuns, v as getSubagentRunsForChildSession } from "./subagent-registry.store.sqlite-gBhFvyR2.js";
import { _ as getSubagentRunByChildSessionKeyFromRuns, a as getSubagentSessionListRunsSnapshotForRead, b as listDescendantRunsForRequesterFromRuns, d as buildSubagentRunReadIndexFromRuns, f as countActiveDescendantRunsFromRuns, g as getLatestSubagentRunByChildSessionKeyFromRuns, i as getSubagentRunsSnapshotForRead, n as getSubagentRunsSnapshotForChildSession, r as getSubagentRunsSnapshotForController, u as buildLatestSubagentRunReadIndexFromRuns, x as listRunsForControllerFromRuns } from "./subagent-registry-state-D0eZgp5g.js";
//#region src/agents/subagent-registry-read.ts
/**
* Read-only subagent registry accessors.
*
* Combines persisted snapshots with in-memory live runs for UI, announce, control, and recovery paths.
*/
/** Builds the session-list index without hydrating full retained registry payloads. */
function buildSubagentSessionListReadIndex(now = Date.now()) {
	return buildSubagentRunReadIndexFromRuns({
		runs: getSubagentSessionListRunsSnapshotForRead(subagentRuns),
		inMemoryRuns: subagentRuns.values(),
		now
	});
}
/** Builds an O(1) latest-run lookup from one persisted and in-memory snapshot. */
function buildLatestSubagentRunReadIndex() {
	return buildLatestSubagentRunReadIndexFromRuns(getSubagentRunsSnapshotForRead(subagentRuns));
}
/** Lists runs controlled by a session key. */
function listSubagentRunsForController(controllerSessionKey) {
	return listRunsForControllerFromRuns(getSubagentRunsSnapshotForController(subagentRuns, controllerSessionKey), controllerSessionKey);
}
/** Counts active descendant runs for a requester/session tree. */
function countActiveDescendantRuns(rootSessionKey) {
	return countActiveDescendantRunsFromRuns(getSubagentRunsSnapshotForRead(subagentRuns), rootSessionKey);
}
/** Lists descendant runs under a requester/session tree. */
function listDescendantRunsForRequester(rootSessionKey) {
	return listDescendantRunsForRequesterFromRuns(getSubagentRunsSnapshotForRead(subagentRuns), rootSessionKey);
}
/** Returns whether a registry entry still has a live agent run context. */
function isSubagentRunLive(entry) {
	if (!entry || typeof entry.execution.endedAt === "number") return false;
	return Boolean(getAgentRunContext(entry.runId));
}
/** Returns the run to display for a child session, using live memory before snapshot state. */
function getSessionDisplaySubagentRunByChildSessionKey(childSessionKey) {
	const key = childSessionKey.trim();
	if (!key) return null;
	return getLatestSubagentRunByChildSessionKeyFromRuns(getSubagentRunsForChildSession(key), key) ?? getSubagentRunByChildSessionKeyFromRuns(getSubagentRunsSnapshotForChildSession(subagentRuns, key), key);
}
/** Returns the most recently created run for a child session from readable registry state. */
function getLatestSubagentRunByChildSessionKey(childSessionKey) {
	const key = childSessionKey.trim();
	if (!key) return null;
	return getLatestSubagentRunByChildSessionKeyFromRuns(getSubagentRunsSnapshotForChildSession(subagentRuns, key), key) ?? null;
}
/** Returns the authoritative process-local run for mutation ownership checks. */
function getLatestLiveSubagentRunByChildSessionKey(childSessionKey) {
	const key = childSessionKey.trim();
	if (!key) return null;
	return getLatestSubagentRunByChildSessionKeyFromRuns(getSubagentRunsForChildSession(key), key) ?? null;
}
//#endregion
export { getLatestSubagentRunByChildSessionKey as a, listDescendantRunsForRequester as c, getLatestLiveSubagentRunByChildSessionKey as i, listSubagentRunsForController as l, buildSubagentSessionListReadIndex as n, getSessionDisplaySubagentRunByChildSessionKey as o, countActiveDescendantRuns as r, isSubagentRunLive as s, buildLatestSubagentRunReadIndex as t };
