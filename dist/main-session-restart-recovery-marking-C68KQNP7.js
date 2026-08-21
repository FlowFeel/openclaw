import { C as resolveStateDir } from "./paths-CL43LNS6.js";
import { s as getAgentEventLifecycleGeneration } from "./agent-events-COCf-9-O.js";
import { u as listAgentRunsForSession } from "./agent-run-registry-BluEqSPq.js";
import { R as applySqliteSessionEntryReplacements } from "./session-accessor.sqlite-B9iW7DOt.js";
import { s as resolveAllAgentSessionStoreTargetsSync } from "./targets-Dooi6t13.js";
import "./session-accessor-t3qUoTeV.js";
import { t as resolveAgentSessionDirs } from "./session-dirs-D4v_ujH0.js";
import { f as listActiveEmbeddedRunSessionIds, p as listActiveEmbeddedRunSessionKeys } from "./run-state-D3E5NYGs.js";
import "./sessions-CBo4LOdS.js";
import { k as resolveGatewaySessionStoreTarget } from "./session-utils-row-Cby7i9PV.js";
import "./session-utils-DRzriWC1.js";
import { c as hasCurrentProcessOwner, d as normalizeStringSet, f as resolveRestartRecoveryStorePaths, i as transitionMainSessionRecovery, l as log, r as normalizeMainSessionRecoveryRunFences, t as isMainRestartRecoveryCandidate, u as normalizeFiniteTimestamp } from "./main-session-recovery-state-CUJxZLgx.js";
import { randomUUID } from "node:crypto";
import path from "node:path";
//#region src/agents/main-session-restart-recovery-marking.ts
async function markRecoveryStore(params) {
	return await applySqliteSessionEntryReplacements({
		storePath: params.storePath,
		statuses: params.statuses,
		requireWriteSuccess: true,
		update: (entries) => {
			const replacements = [];
			const counts = {
				marked: 0,
				skipped: 0
			};
			for (const { sessionKey, entry } of entries) {
				const plan = params.plan(entry, sessionKey);
				if (!plan) continue;
				if (!isMainRestartRecoveryCandidate(entry, sessionKey)) {
					counts.skipped++;
					continue;
				}
				if (plan.replaceRuns) entry.restartRecoveryRuns = plan.runs;
				transitionMainSessionRecovery(entry, {
					kind: "mark_interrupted",
					cycleId: randomUUID(),
					now: Date.now(),
					...plan
				});
				replacements.push({
					sessionKey,
					entry
				});
				counts.marked++;
			}
			return {
				result: counts,
				replacements
			};
		}
	});
}
async function markRestartAbortedMainSessions(params) {
	const sessionKeys = normalizeStringSet(params.sessionKeys);
	const sessionIds = normalizeStringSet(params.sessionIds);
	const preferSessionIdMatch = sessionIds.size > 0;
	const activeRuns = [...params.activeRuns ?? []].map((run) => ({
		runId: run.runId.trim(),
		lifecycleGeneration: run.lifecycleGeneration.trim(),
		sessionKey: run.sessionKey.trim(),
		sessionId: run.sessionId.trim(),
		observedAt: normalizeFiniteTimestamp(run.observedAt)
	})).filter((run) => run.runId && run.lifecycleGeneration && (run.sessionKey || run.sessionId));
	const currentLifecycleGeneration = getAgentEventLifecycleGeneration();
	const result = {
		marked: 0,
		skipped: 0
	};
	if (sessionKeys.size === 0 && sessionIds.size === 0) return result;
	const storePaths = /* @__PURE__ */ new Set();
	const env = params.stateDir === void 0 ? process.env : {
		...process.env,
		OPENCLAW_STATE_DIR: params.stateDir
	};
	const stateDir = resolveStateDir(env);
	const configs = [params.cfg, ...params.additionalCfgs ?? []].filter((cfg) => Boolean(cfg));
	for (const cfg of configs) {
		try {
			for (const target of resolveAllAgentSessionStoreTargetsSync(cfg, { env })) storePaths.add(path.resolve(target.storePath));
		} catch (err) {
			log.warn(`failed to resolve configured session stores for restart marker: ${String(err)}`);
		}
		for (const sessionKey of sessionKeys) try {
			const target = resolveGatewaySessionStoreTarget({
				cfg,
				key: sessionKey
			});
			storePaths.add(path.resolve(target.storePath));
			for (const storeKey of target.storeKeys) {
				const trimmed = storeKey.trim();
				if (trimmed) sessionKeys.add(trimmed);
			}
		} catch (err) {
			log.warn(`failed to resolve session store for restart marker ${sessionKey}: ${String(err)}`);
		}
	}
	for (const sessionsDir of await resolveAgentSessionDirs(stateDir)) storePaths.add(path.join(sessionsDir, "sessions.json"));
	for (const storePath of storePaths) {
		const storeResult = await markRecoveryStore({
			storePath,
			plan: (entry, sessionKey) => {
				const registeredActiveRuns = listAgentRunsForSession({
					sessionKey,
					sessionId: entry.sessionId
				});
				const matchingActiveRuns = activeRuns.filter((run) => (run.sessionId ? run.sessionId === entry.sessionId : run.sessionKey === sessionKey) && (entry.status === "running" || run.observedAt === void 0 || normalizeFiniteTimestamp(entry.updatedAt) === void 0 || entry.updatedAt < run.observedAt && run.lifecycleGeneration !== currentLifecycleGeneration) && params.isActiveRun?.(run) !== false);
				if (entry.status !== "running" && matchingActiveRuns.length === 0 && registeredActiveRuns.length === 0) return;
				if (!(typeof entry.sessionId === "string" && sessionIds.has(entry.sessionId) ? true : !preferSessionIdMatch && sessionKeys.has(sessionKey))) return;
				const wasRunning = entry.status === "running";
				const runs = normalizeMainSessionRecoveryRunFences([
					...(entry.restartRecoveryRuns ?? []).filter((run) => run.lifecycleGeneration === currentLifecycleGeneration),
					...registeredActiveRuns,
					...matchingActiveRuns.map(({ runId, lifecycleGeneration }) => ({
						runId,
						lifecycleGeneration
					}))
				]);
				return {
					replaceRuns: true,
					resetRuntime: !wasRunning,
					runs
				};
			}
		});
		result.marked += storeResult.marked;
		result.skipped += storeResult.skipped;
	}
	if (result.marked > 0) log.warn(`marked ${result.marked} interrupted main session(s) for restart recovery${params.reason ? ` (${params.reason})` : ""}`);
	return result;
}
async function markStartupOrphanedMainSessionsForRecovery(params) {
	const result = {
		marked: 0,
		skipped: 0
	};
	const providedActiveSessionIds = params.activeSessionIds === void 0 ? void 0 : normalizeStringSet(params.activeSessionIds);
	const providedActiveSessionKeys = params.activeSessionKeys === void 0 ? void 0 : normalizeStringSet(params.activeSessionKeys);
	const updatedBeforeMs = normalizeFiniteTimestamp(params.updatedBeforeMs);
	const resolveActiveSessionIds = () => providedActiveSessionIds ?? normalizeStringSet(listActiveEmbeddedRunSessionIds());
	const resolveActiveSessionKeys = () => providedActiveSessionKeys ?? normalizeStringSet(listActiveEmbeddedRunSessionKeys());
	for (const storePath of await resolveRestartRecoveryStorePaths(params)) {
		const storeResult = await markRecoveryStore({
			storePath,
			statuses: ["running"],
			plan: (entry, sessionKey) => {
				if (entry.status !== "running" || entry.abortedLastRun === true) return;
				const updatedAt = normalizeFiniteTimestamp(entry.updatedAt);
				if (updatedBeforeMs !== void 0 && updatedAt !== void 0 && updatedAt > updatedBeforeMs) return;
				if (hasCurrentProcessOwner({
					activeSessionIds: resolveActiveSessionIds(),
					activeSessionKeys: resolveActiveSessionKeys(),
					entry,
					sessionKey
				})) return;
				return {};
			}
		});
		result.marked += storeResult.marked;
		result.skipped += storeResult.skipped;
	}
	if (result.marked > 0) log.warn(`marked ${result.marked} startup-orphaned main session(s) for restart recovery`);
	return result;
}
//#endregion
export { markStartupOrphanedMainSessionsForRecovery as n, markRestartAbortedMainSessions as t };
