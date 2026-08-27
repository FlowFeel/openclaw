import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { l as hasProjectedAgentRunForSession } from "./agent-run-registry-BluEqSPq.js";
import { f as isEmbeddedAgentRunInProgress } from "./runs-Bw__iUSb.js";
//#region src/gateway/server-methods/session-active-runs.ts
function collectTrackedActiveSessionRuns(context) {
	const runs = [];
	if (!(context.chatAbortControllers instanceof Map)) return runs;
	for (const [runId, active] of context.chatAbortControllers) if (active.projectSessionActive !== false && active.controlUiVisible !== false) {
		const sessionKey = active.sessionKey?.trim();
		const sessionId = active.sessionId?.trim();
		if (!sessionKey && !sessionId) continue;
		runs.push({
			runId,
			...sessionKey ? { sessionKey } : {},
			...sessionId ? { sessionId } : {},
			agentId: typeof active.agentId === "string" ? normalizeAgentId(active.agentId) : void 0
		});
	}
	return runs;
}
function isTrackedActiveSessionRunForKey(active, key, agentId, defaultAgentId) {
	if (!active.sessionKey || active.sessionKey !== key) return false;
	if (key !== "global") return true;
	const requestedAgentId = agentId ?? defaultAgentId;
	if (!requestedAgentId) return true;
	const activeAgentId = active.agentId ?? defaultAgentId;
	return activeAgentId ? normalizeAgentId(activeAgentId) === normalizeAgentId(requestedAgentId) : false;
}
/** Returns true when either requested or canonical session key has a visible active run. */
function hasTrackedActiveSessionRun(params) {
	return collectTrackedActiveSessionRuns(params.context).some((active) => !params.excludeRunIds?.has(active.runId) && (isTrackedActiveSessionRunForKey(active, params.canonicalKey, params.agentId, params.defaultAgentId) || isTrackedActiveSessionRunForKey(active, params.requestedKey, params.agentId, params.defaultAgentId)));
}
function resolveVisibleActiveSessionRunState(params) {
	const sessionId = params.sessionId?.trim();
	const runIds = (params.trackedActiveRuns ?? collectTrackedActiveSessionRuns(params.context)).filter((active) => isTrackedActiveSessionRunForKey(active, params.canonicalKey, params.agentId, params.defaultAgentId) || isTrackedActiveSessionRunForKey(active, params.requestedKey, params.agentId, params.defaultAgentId) || sessionId !== void 0 && active.sessionId === sessionId).map((active) => active.runId).toSorted();
	const hasProjectedRun = hasProjectedAgentRunForSession({
		sessionKeys: [params.requestedKey, params.canonicalKey],
		...sessionId ? { sessionId } : {},
		...params.projectedAgentRunIndex ? { index: params.projectedAgentRunIndex } : {}
	});
	const embeddedRunInProgress = sessionId !== void 0 && isEmbeddedAgentRunInProgress(sessionId);
	return {
		active: runIds.length > 0 || hasProjectedRun || embeddedRunInProgress,
		runIds
	};
}
function hasVisibleActiveSessionRun(params) {
	return resolveVisibleActiveSessionRunState(params).active;
}
//#endregion
export { resolveVisibleActiveSessionRunState as i, hasTrackedActiveSessionRun as n, hasVisibleActiveSessionRun as r, collectTrackedActiveSessionRuns as t };
