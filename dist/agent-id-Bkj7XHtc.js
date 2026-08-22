import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
//#region src/cron/agent-id.ts
/** Resolves cron ownership: explicit non-blank id, scoped session key, then configured default. */
function resolveCronJobEffectiveAgentId(job, configuredDefaultAgentId) {
	const agentId = job.agentId?.trim() || parseAgentSessionKey(job.sessionKey)?.agentId || configuredDefaultAgentId?.trim();
	if (!agentId) throw new Error("Cron job has no agent id and no configured default was provided.");
	return normalizeAgentId(agentId);
}
//#endregion
export { resolveCronJobEffectiveAgentId as t };
