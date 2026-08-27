import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { a as isSubagentSessionKey, c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { c as isAgentEventLifecycleGenerationCurrent, s as getAgentEventLifecycleGeneration } from "./agent-events-COCf-9-O.js";
import { r as logVerbose } from "./globals-DHQUG86L.js";
import { c as callGateway } from "./call-YSl9HPoR.js";
import { t as INTERNAL_MESSAGE_CHANNEL } from "./message-channel-constants-76XnXM8q.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { lt as patchSqliteSessionEntry, st as loadSqliteSessionEntry } from "./session-accessor.sqlite-B9iW7DOt.js";
import "./message-channel-1n7hD5_u.js";
import { _t as interruptSessionWorkAdmissions, lt as SESSION_WORK_ADMISSION_DRAIN_TIMEOUT_MS, xt as runExclusiveSessionLifecycleMutation } from "./session-entry-slot-keys-DR5d2mKt.js";
import "./session-accessor-t3qUoTeV.js";
import { U as SUBAGENT_KILL_TASK_ERROR } from "./task-registry-ZiNcN-Vv.js";
import { b as subagentRuns } from "./subagent-registry.store.sqlite-gBhFvyR2.js";
import { d as buildSubagentRunReadIndexFromRuns, i as getSubagentRunsSnapshotForRead } from "./subagent-registry-state-D0eZgp5g.js";
import "./subagent-run-liveness-CjxLH_UA.js";
import { i as getLatestLiveSubagentRunByChildSessionKey, l as listSubagentRunsForController } from "./subagent-registry-read-DBYMH4dZ.js";
import { r as resolveStoredSubagentCapabilities } from "./subagent-capabilities-nSrXwosf.js";
import { E as replaceSubagentRunAfterSteer, I as resolveFinalizedSubagentTaskState, L as resolveKilledSubagentTaskEndedAt, T as releaseSubagentRunKillClaim, b as markSubagentRunForSteerRestart, n as claimSubagentRunKill, r as clearSubagentRunSteerRestart, s as countPendingDescendantRuns, x as markSubagentRunTerminated } from "./subagent-registry-QAwU6DFV.js";
import { i as terminateAcceptedCollectorRun } from "./subagent-spawn-cleanup-BY01Sfes.js";
import { i as readLatestAssistantReplySnapshot, o as waitForAgentRunAndReadUpdatedAssistantReply } from "./run-wait-gFl975OK.js";
import { t as AGENT_LANE_SUBAGENT } from "./lanes-CI0_P-yC.js";
import { c as resolveMainSessionAlias, s as resolveInternalSessionKey } from "./sessions-helpers-DfU6Cl-T.js";
import { i as sortSubagentRuns, n as resolveSubagentLabel } from "./subagents-utils-Co2UgCFq.js";
import { n as resolveSessionEntryForKey } from "./subagent-list-C-We1n9B.js";
import crypto from "node:crypto";
//#region src/agents/subagent-control.ts
/** Controller-authorized subagent list, kill, steer, and message operations. */
/** Maximum recent-run window accepted by subagent control UI/tools. */
const MAX_RECENT_MINUTES = 1440;
const STEER_RATE_LIMIT_MS = 2e3;
const STEER_ABORT_SETTLE_TIMEOUT_MS = 5e3;
const SUBAGENT_REPLY_HISTORY_LIMIT = 50;
const steerRateLimit = /* @__PURE__ */ new Map();
const defaultSubagentControlDeps = {
	callGateway,
	patchSessionEntry: patchSqliteSessionEntry
};
let subagentControlDeps = defaultSubagentControlDeps;
const subagentControlRuntimeLoader = createLazyImportLoader(() => import("./subagent-control.runtime.js"));
function loadSubagentControlRuntime() {
	return subagentControlRuntimeLoader.load();
}
async function resolveSubagentControlRuntime() {
	if (subagentControlDeps.abortEmbeddedAgentRun && subagentControlDeps.isEmbeddedAgentRunActive && subagentControlDeps.clearSessionQueues) return {
		abortEmbeddedAgentRun: subagentControlDeps.abortEmbeddedAgentRun,
		isEmbeddedAgentRunActive: subagentControlDeps.isEmbeddedAgentRunActive,
		clearSessionQueues: subagentControlDeps.clearSessionQueues
	};
	const runtime = await loadSubagentControlRuntime();
	return {
		abortEmbeddedAgentRun: subagentControlDeps.abortEmbeddedAgentRun ?? runtime.abortEmbeddedAgentRun,
		isEmbeddedAgentRunActive: subagentControlDeps.isEmbeddedAgentRunActive ?? runtime.isEmbeddedAgentRunActive,
		clearSessionQueues: subagentControlDeps.clearSessionQueues ?? runtime.clearSessionQueues
	};
}
/** Resolves which subagent runs the caller is allowed to control. */
function resolveSubagentController(params) {
	const { mainKey, alias } = resolveMainSessionAlias(params.cfg);
	const callerSessionKey = resolveInternalSessionKey({
		key: params.agentSessionKey?.trim() || alias,
		alias,
		mainKey
	});
	if (!isSubagentSessionKey(callerSessionKey)) return {
		controllerSessionKey: callerSessionKey,
		callerSessionKey,
		callerIsSubagent: false,
		controlScope: "children"
	};
	return {
		controllerSessionKey: callerSessionKey,
		callerSessionKey,
		callerIsSubagent: true,
		controlScope: resolveStoredSubagentCapabilities(callerSessionKey, { cfg: params.cfg }).controlScope
	};
}
function isSubagentRunVisibleToSession(entry, sessionKey) {
	const controllerKey = entry.controllerSessionKey?.trim();
	const requesterKey = entry.requesterSessionKey.trim();
	return controllerKey === sessionKey || requesterKey === sessionKey;
}
/** Builds one stable snapshot for controlled-run listing and descendant status reads. */
function buildControlledSubagentRunsReadContext(controllerSessionKey) {
	const key = controllerSessionKey.trim();
	if (!key) return {
		runs: [],
		countPendingDescendantRuns: () => 0
	};
	const readIndex = buildSubagentRunReadIndexFromRuns({ runs: getSubagentRunsSnapshotForRead(subagentRuns) });
	return {
		runs: sortSubagentRuns(Array.from(readIndex.latestRunsByChildSessionKey.values()).filter((entry) => isSubagentRunVisibleToSession(entry, key))),
		countPendingDescendantRuns: (rootSessionKey) => readIndex.countPendingDescendantRuns(rootSessionKey)
	};
}
/** Lists latest child runs controlled by a session key. */
function listControlledSubagentRuns(controllerSessionKey) {
	return buildControlledSubagentRunsReadContext(controllerSessionKey).runs;
}
function ensureControllerOwnsRun(params) {
	if ((params.entry.controllerSessionKey?.trim() || params.entry.requesterSessionKey) === params.controller.controllerSessionKey) return;
	return "Subagents can only control runs spawned from their own session.";
}
function isFinishedForSteerControl(entry, hasPendingDescendants) {
	return Boolean(entry.execution.endedAt) && entry.pauseReason !== "sessions_yield" && !hasPendingDescendants;
}
function isCurrentSubagentRun(entry) {
	return getLatestLiveSubagentRunByChildSessionKey(entry.childSessionKey) === entry;
}
function isSameSubagentRunGeneration(live, snapshot) {
	return live.childSessionKey === snapshot.childSessionKey && live.runId === snapshot.runId && live.generation === snapshot.generation && live.createdAt === snapshot.createdAt;
}
function resolveSubagentKillTargetState(entry) {
	if (entry.endedReason === "subagent-killed" && entry.suppressAnnounceReason !== "steer-restart") {
		const taskEndedAt = resolveKilledSubagentTaskEndedAt(entry);
		return typeof taskEndedAt === "number" ? {
			state: "terminal",
			task: {
				status: "cancelled",
				endedAt: taskEndedAt,
				lastEventAt: taskEndedAt,
				error: SUBAGENT_KILL_TASK_ERROR,
				progressSummary: entry.completion?.resultText ?? void 0,
				terminalSummary: null
			}
		} : void 0;
	}
	const terminal = resolveFinalizedSubagentTaskState(entry);
	if (terminal) return {
		state: "terminal",
		task: terminal
	};
	return typeof entry.execution.endedAt === "number" && entry.pauseReason !== "sessions_yield" && (entry.endedReason !== "subagent-killed" || entry.suppressAnnounceReason === "steer-restart") ? { state: "finalizing" } : void 0;
}
async function persistSubagentAbortedLastRun(params) {
	if (!params.hasSessionEntry) return true;
	try {
		await subagentControlDeps.patchSessionEntry({
			storePath: params.storePath,
			sessionKey: params.childSessionKey
		}, (current) => current.sessionId !== params.expectedSessionId || current.lifecycleRevision !== params.expectedLifecycleRevision || params.isCurrent?.(current) === false ? null : {
			...current,
			abortedLastRun: params.abortedLastRun,
			updatedAt: Date.now()
		}, {
			assertCommitAllowed: params.assertCommitAllowed,
			replaceEntry: true
		});
		return true;
	} catch (error) {
		if (params.strict) throw error;
		logVerbose(`subagents control kill: failed to persist abortedLastRun=${params.abortedLastRun} for ${params.childSessionKey}: ${formatErrorMessage(error)}`);
		return false;
	}
}
function markSubagentRunTerminatedBestEffort(params) {
	try {
		return markSubagentRunTerminated(params);
	} catch (error) {
		logVerbose(`subagents control kill: failed to persist ${params.runId ?? params.childSessionKey ?? "unknown"}: ${formatErrorMessage(error)}`);
		return 0;
	}
}
async function killSubagentRun(params) {
	const initialTargetState = resolveSubagentKillTargetState(params.entry);
	if (initialTargetState) {
		if (params.entry.endedReason === "subagent-killed" && params.entry.suppressAnnounceReason !== "steer-restart") markSubagentRunTerminatedBestEffort({
			runId: params.entry.runId,
			reason: "killed",
			suppressTaskDelivery: params.suppressTaskDelivery
		});
		return {
			killed: false,
			targetState: initialTargetState
		};
	}
	if (params.entry.execution.endedAt && params.entry.pauseReason !== "sessions_yield") return { killed: false };
	const childSessionKey = params.entry.childSessionKey;
	const resolved = resolveSessionEntryForKey({
		cfg: params.cfg,
		key: childSessionKey,
		cache: params.cache
	});
	const sessionId = resolved.entry?.sessionId;
	const sessionLifecycleRevision = resolved.entry?.lifecycleRevision;
	const runtime = await resolveSubagentControlRuntime();
	let admittedWorkReleased = true;
	return await runExclusiveSessionLifecycleMutation({
		scope: resolved.storePath,
		identities: [childSessionKey, sessionId],
		prepare: async () => {
			if (!isCurrentSubagentRun(params.entry)) return;
			admittedWorkReleased = await interruptSessionWorkAdmissions({
				scope: resolved.storePath,
				identities: [childSessionKey, sessionId],
				timeoutMs: SESSION_WORK_ADMISSION_DRAIN_TIMEOUT_MS
			});
		},
		run: async () => {
			if (!admittedWorkReleased) return {
				killed: false,
				sessionId,
				error: "Subagent is still active; try the kill again in a moment."
			};
			if (!isCurrentSubagentRun(params.entry)) return {
				killed: false,
				sessionId,
				superseded: true
			};
			const targetStateAfterRuntimeLoad = resolveSubagentKillTargetState(params.entry);
			if (targetStateAfterRuntimeLoad) {
				if (params.entry.endedReason === "subagent-killed" && params.entry.suppressAnnounceReason !== "steer-restart") markSubagentRunTerminatedBestEffort({
					runId: params.entry.runId,
					reason: "killed",
					suppressTaskDelivery: params.suppressTaskDelivery
				});
				return {
					killed: false,
					sessionId,
					targetState: targetStateAfterRuntimeLoad
				};
			}
			let killClaim;
			const killOwnerCurrent = () => isCurrentSubagentRun(params.entry) && (!killClaim || (params.entry.killIntent === killClaim || params.entry.endedReason === "subagent-killed" && params.entry.killReconciliation !== void 0 && params.entry.execution.lifecycleGeneration === killClaim.lifecycleGeneration) && (killClaim.lifecycleGeneration === void 0 || isAgentEventLifecycleGenerationCurrent(killClaim.lifecycleGeneration)));
			const persistAbortedLastRun = (abortedLastRun, strict = false) => persistSubagentAbortedLastRun({
				childSessionKey,
				storePath: resolved.storePath,
				hasSessionEntry: resolved.entry !== void 0,
				expectedSessionId: sessionId,
				expectedLifecycleRevision: sessionLifecycleRevision,
				abortedLastRun,
				isCurrent: () => killOwnerCurrent(),
				assertCommitAllowed: () => {
					if (!killOwnerCurrent()) throw new Error("subagent kill lifecycle retired before abort-marker commit");
				},
				strict
			});
			try {
				killClaim = claimSubagentRunKill({
					runId: params.entry.runId,
					expected: params.entry,
					sessionId,
					sessionLifecycleRevision,
					suppressTaskDelivery: params.suppressTaskDelivery
				});
			} catch (error) {
				return {
					killed: false,
					sessionId,
					error: `Failed to persist subagent kill intent: ${formatErrorMessage(error)}`
				};
			}
			if (!killClaim || !killOwnerCurrent()) return {
				killed: false,
				sessionId,
				superseded: true
			};
			const claimedKill = killClaim;
			const ownsSessionIncarnation = () => {
				const currentSessionEntry = loadSqliteSessionEntry({
					storePath: resolved.storePath,
					sessionKey: childSessionKey,
					clone: false,
					readConsistency: "latest"
				});
				return currentSessionEntry !== void 0 === (resolved.entry !== void 0) && currentSessionEntry?.sessionId === sessionId && currentSessionEntry?.lifecycleRevision === sessionLifecycleRevision;
			};
			const releaseChangedSessionKill = () => {
				try {
					releaseSubagentRunKillClaim({
						runId: params.entry.runId,
						expected: params.entry,
						claim: claimedKill
					});
				} catch (error) {
					return {
						killed: false,
						sessionId,
						error: `Subagent session changed and its kill intent could not be released: ${formatErrorMessage(error)}`
					};
				}
				return {
					killed: false,
					sessionId,
					error: "Subagent session changed while the kill was pending; retry."
				};
			};
			if (!ownsSessionIncarnation()) return releaseChangedSessionKill();
			const active = sessionId ? runtime.isEmbeddedAgentRunActive(sessionId) : false;
			if (!ownsSessionIncarnation()) return releaseChangedSessionKill();
			const aborted = sessionId ? runtime.abortEmbeddedAgentRun(sessionId) : false;
			if (!ownsSessionIncarnation()) return releaseChangedSessionKill();
			const cleared = runtime.clearSessionQueues([childSessionKey, sessionId]);
			if (cleared.followupCleared > 0 || cleared.laneCleared > 0) logVerbose(`subagents control kill: cleared followups=${cleared.followupCleared} lane=${cleared.laneCleared} keys=${cleared.keys.join(",")}`);
			if (active && !aborted) {
				try {
					releaseSubagentRunKillClaim({
						runId: params.entry.runId,
						expected: params.entry,
						claim: killClaim
					});
				} catch (error) {
					return {
						killed: false,
						sessionId,
						error: `Subagent remained active and its kill intent could not be released: ${formatErrorMessage(error)}`
					};
				}
				return {
					killed: false,
					sessionId,
					error: "Subagent is still active; try the kill again in a moment."
				};
			}
			const targetState = resolveSubagentKillTargetState(params.entry);
			if (targetState) {
				const killedTarget = targetState.state === "terminal" && targetState.task.status === "cancelled" && targetState.task.error === "Subagent run killed.";
				if (killedTarget) markSubagentRunTerminatedBestEffort({
					runId: params.entry.runId,
					reason: "killed",
					suppressTaskDelivery: params.suppressTaskDelivery
				});
				else try {
					releaseSubagentRunKillClaim({
						runId: params.entry.runId,
						expected: params.entry,
						claim: killClaim
					});
				} catch (error) {
					return {
						killed: false,
						sessionId,
						targetState,
						error: `Completed subagent kill intent could not be released: ${formatErrorMessage(error)}`
					};
				}
				return {
					killed: killedTarget,
					sessionId,
					targetState
				};
			}
			let marked;
			try {
				marked = markSubagentRunTerminated({
					runId: params.entry.runId,
					reason: "killed",
					suppressTaskDelivery: params.suppressTaskDelivery
				});
			} catch (error) {
				return {
					killed: false,
					sessionId,
					error: `Failed to persist subagent kill tombstone: ${formatErrorMessage(error)}`
				};
			}
			await persistAbortedLastRun(true);
			return {
				killed: marked > 0,
				sessionId
			};
		}
	});
}
async function killLatestSubagentRun(params) {
	let entry = params.entry;
	for (let attempt = 0; attempt < 3; attempt += 1) {
		const result = await killSubagentRun({
			...params,
			entry
		});
		if (!result.superseded) return {
			entry,
			result
		};
		const latest = getLatestLiveSubagentRunByChildSessionKey(entry.childSessionKey);
		if (!latest || latest === entry) return {
			entry,
			result
		};
		if (entry.execution.restartRecovery?.idempotencyKey !== latest.runId) return {
			entry,
			result
		};
		entry = latest;
	}
	return {
		entry,
		result: {
			killed: false,
			superseded: true,
			error: "Subagent changed generations repeatedly during kill; retry in a moment."
		}
	};
}
async function killSubagentRunTree(params) {
	let killed = 0;
	const labels = [];
	const errors = [];
	for (const run of params.runs) {
		const childKey = run.childSessionKey?.trim();
		if (!childKey || params.seenChildSessionKeys.has(childKey)) continue;
		const latest = getLatestLiveSubagentRunByChildSessionKey(childKey);
		if (!latest || !isSameSubagentRunGeneration(latest, run)) continue;
		const latestControllerSessionKey = latest.controllerSessionKey?.trim() || latest.requesterSessionKey?.trim();
		if (params.controllerSessionKey && latestControllerSessionKey !== params.controllerSessionKey) continue;
		params.seenChildSessionKeys.add(childKey);
		const entry = latest;
		if (!entry.execution.endedAt || entry.pauseReason === "sessions_yield") {
			const stopped = await killLatestSubagentRun({
				cfg: params.cfg,
				entry,
				cache: params.cache,
				suppressTaskDelivery: params.suppressTaskDelivery
			});
			const stopResult = stopped.result;
			if (stopResult.error) errors.push(`${resolveSubagentLabel(stopped.entry)}: ${stopResult.error}`);
			const stoppedEntryIsCurrent = isCurrentSubagentRun(stopped.entry);
			if (stopResult.superseded || !stopResult.killed && !stoppedEntryIsCurrent) continue;
			if (stopResult.killed) {
				killed += 1;
				labels.push(resolveSubagentLabel(stopped.entry));
			}
			if (!stoppedEntryIsCurrent) continue;
		}
		const cascade = await killSubagentRunTree({
			cfg: params.cfg,
			runs: listSubagentRunsForController(childKey),
			cache: params.cache,
			seenChildSessionKeys: params.seenChildSessionKeys,
			controllerSessionKey: childKey,
			suppressTaskDelivery: params.suppressTaskDelivery
		});
		killed += cascade.killed;
		labels.push(...cascade.labels);
		errors.push(...cascade.errors);
	}
	return {
		killed,
		labels,
		errors
	};
}
async function cascadeKillChildren(params) {
	return killSubagentRunTree({
		cfg: params.cfg,
		runs: listSubagentRunsForController(params.parentChildSessionKey),
		cache: params.cache,
		seenChildSessionKeys: params.seenChildSessionKeys ?? /* @__PURE__ */ new Set(),
		controllerSessionKey: params.parentChildSessionKey,
		suppressTaskDelivery: params.suppressTaskDelivery
	});
}
/** Kills every currently controlled child run and its descendants. */
async function killAllControlledSubagentRuns(params) {
	if (params.controller.controlScope !== "children") return {
		status: "forbidden",
		error: "Leaf subagents cannot control other sessions.",
		killed: 0,
		labels: []
	};
	const result = await killSubagentRunTree({
		cfg: params.cfg,
		runs: params.runs,
		cache: /* @__PURE__ */ new Map(),
		seenChildSessionKeys: /* @__PURE__ */ new Set(),
		controllerSessionKey: params.controller.controllerSessionKey
	});
	if (result.errors.length > 0) return {
		status: "error",
		error: result.errors.join("; "),
		killed: result.killed,
		labels: result.labels
	};
	return {
		status: "ok",
		killed: result.killed,
		labels: result.labels
	};
}
/** Kills one controlled subagent run and any active descendants. */
async function killControlledSubagentRun(params) {
	if (params.controller.controlScope !== "children") return {
		status: "forbidden",
		runId: params.entry.runId,
		sessionKey: params.entry.childSessionKey,
		error: "Leaf subagents cannot control other sessions."
	};
	const currentEntry = getLatestLiveSubagentRunByChildSessionKey(params.entry.childSessionKey);
	if (!currentEntry || !isSameSubagentRunGeneration(currentEntry, params.entry)) return {
		status: "done",
		runId: params.entry.runId,
		sessionKey: params.entry.childSessionKey,
		label: resolveSubagentLabel(params.entry),
		text: `${resolveSubagentLabel(params.entry)} is already finished.`
	};
	const ownershipError = ensureControllerOwnsRun({
		controller: params.controller,
		entry: currentEntry
	});
	if (ownershipError) return {
		status: "forbidden",
		runId: currentEntry.runId,
		sessionKey: currentEntry.childSessionKey,
		error: ownershipError
	};
	const killCache = /* @__PURE__ */ new Map();
	const stopped = await killLatestSubagentRun({
		cfg: params.cfg,
		entry: currentEntry,
		cache: killCache,
		suppressTaskDelivery: params.suppressTaskDelivery
	});
	const stopResult = stopped.result;
	if (stopResult.error) return {
		status: "error",
		runId: params.entry.runId,
		sessionKey: params.entry.childSessionKey,
		error: stopResult.error
	};
	const stoppedEntryIsCurrent = isCurrentSubagentRun(stopped.entry);
	if (stopResult.superseded || !stopResult.killed && !stoppedEntryIsCurrent) return {
		status: "done",
		runId: params.entry.runId,
		sessionKey: params.entry.childSessionKey,
		label: resolveSubagentLabel(params.entry),
		text: `${resolveSubagentLabel(params.entry)} is already finished.`
	};
	if (!stoppedEntryIsCurrent) return {
		status: "ok",
		runId: params.entry.runId,
		sessionKey: params.entry.childSessionKey,
		label: resolveSubagentLabel(params.entry),
		killed: true,
		cascadeKilled: 0,
		cascadeLabels: void 0,
		text: `killed ${resolveSubagentLabel(params.entry)}.`
	};
	const seenChildSessionKeys = /* @__PURE__ */ new Set();
	const targetChildKey = params.entry.childSessionKey?.trim();
	if (targetChildKey) seenChildSessionKeys.add(targetChildKey);
	const cascade = await cascadeKillChildren({
		cfg: params.cfg,
		parentChildSessionKey: params.entry.childSessionKey,
		cache: killCache,
		seenChildSessionKeys,
		suppressTaskDelivery: params.suppressTaskDelivery
	});
	if (cascade.errors.length > 0) return {
		status: "error",
		runId: params.entry.runId,
		sessionKey: params.entry.childSessionKey,
		error: cascade.errors.join("; "),
		...stopResult.killed ? { killed: true } : {},
		cascadeKilled: cascade.killed,
		cascadeLabels: cascade.killed > 0 ? cascade.labels : void 0
	};
	if (!stopResult.killed && cascade.killed === 0) return {
		status: "done",
		runId: params.entry.runId,
		sessionKey: params.entry.childSessionKey,
		label: resolveSubagentLabel(params.entry),
		text: `${resolveSubagentLabel(params.entry)} is already finished.`
	};
	const cascadeText = cascade.killed > 0 ? ` (+ ${cascade.killed} descendant${cascade.killed === 1 ? "" : "s"})` : "";
	return {
		status: "ok",
		runId: params.entry.runId,
		sessionKey: params.entry.childSessionKey,
		label: resolveSubagentLabel(params.entry),
		...stopResult.killed ? { killed: true } : {},
		cascadeKilled: cascade.killed,
		cascadeLabels: cascade.killed > 0 ? cascade.labels : void 0,
		text: stopResult.killed ? `killed ${resolveSubagentLabel(params.entry)}${cascadeText}.` : `killed ${cascade.killed} descendant${cascade.killed === 1 ? "" : "s"} of ${resolveSubagentLabel(params.entry)}.`
	};
}
/** Admin kill path for a subagent session key, bypassing caller ownership checks. */
async function killSubagentRunAdmin(params) {
	const targetSessionKey = params.sessionKey.trim();
	if (!targetSessionKey) return {
		found: false,
		killed: false
	};
	const entry = getLatestLiveSubagentRunByChildSessionKey(targetSessionKey);
	if (!entry) return {
		found: false,
		killed: false
	};
	const killCache = /* @__PURE__ */ new Map();
	const stopped = await killLatestSubagentRun({
		cfg: params.cfg,
		entry,
		cache: killCache
	});
	const stopResult = stopped.result;
	if (stopResult.error) return {
		found: true,
		killed: false,
		runId: stopped.entry.runId,
		sessionKey: stopped.entry.childSessionKey,
		cascadeKilled: 0,
		error: stopResult.error
	};
	const stoppedEntryIsCurrent = isCurrentSubagentRun(stopped.entry);
	if (stopResult.superseded || !stopResult.killed && !stoppedEntryIsCurrent) return {
		found: true,
		killed: false,
		runId: stopped.entry.runId,
		sessionKey: stopped.entry.childSessionKey,
		cascadeKilled: 0
	};
	if (!stoppedEntryIsCurrent) return {
		found: true,
		killed: stopResult.killed,
		...stopResult.targetState ? { targetState: stopResult.targetState } : {},
		runId: stopped.entry.runId,
		sessionKey: stopped.entry.childSessionKey,
		cascadeKilled: 0
	};
	const seenChildSessionKeys = /* @__PURE__ */ new Set([targetSessionKey]);
	const cascade = await cascadeKillChildren({
		cfg: params.cfg,
		parentChildSessionKey: targetSessionKey,
		cache: killCache,
		seenChildSessionKeys
	});
	const targetState = resolveSubagentKillTargetState(stopped.entry) ?? stopResult.targetState;
	const killedTarget = targetState?.state === "terminal" && targetState.task.status === "cancelled" && targetState.task.error === "Subagent run killed.";
	const stopResultAlreadyClearedAbort = stopResult.targetState !== void 0 && !(stopResult.targetState.state === "terminal" && stopResult.targetState.task.status === "cancelled" && stopResult.targetState.task.error === "Subagent run killed.");
	if (targetState && !killedTarget && !stopResultAlreadyClearedAbort) {
		const resolved = resolveSessionEntryForKey({
			cfg: params.cfg,
			key: targetSessionKey,
			cache: killCache
		});
		await persistSubagentAbortedLastRun({
			childSessionKey: targetSessionKey,
			storePath: resolved.storePath,
			hasSessionEntry: resolved.entry !== void 0,
			expectedSessionId: resolved.entry?.sessionId,
			expectedLifecycleRevision: resolved.entry?.lifecycleRevision,
			abortedLastRun: false,
			isCurrent: () => isCurrentSubagentRun(stopped.entry)
		});
	}
	return {
		found: true,
		killed: stopResult.killed || cascade.killed > 0,
		...targetState ? { targetState } : {},
		runId: stopped.entry.runId,
		sessionKey: stopped.entry.childSessionKey,
		cascadeKilled: cascade.killed,
		cascadeLabels: cascade.killed > 0 ? cascade.labels : void 0
	};
}
/** Restarts a controlled subagent run with a new steering message. */
async function steerControlledSubagentRun(params) {
	if (params.controller.controlScope !== "children") return {
		status: "forbidden",
		runId: params.entry.runId,
		sessionKey: params.entry.childSessionKey,
		error: "Leaf subagents cannot control other sessions."
	};
	if (params.controller.callerSessionKey === params.entry.childSessionKey) return {
		status: "forbidden",
		runId: params.entry.runId,
		sessionKey: params.entry.childSessionKey,
		error: "Subagents cannot steer themselves."
	};
	const currentEntry = getLatestLiveSubagentRunByChildSessionKey(params.entry.childSessionKey);
	const currentHasPendingDescendants = currentEntry ? countPendingDescendantRuns(currentEntry.childSessionKey) > 0 : false;
	if (!currentEntry || !isSameSubagentRunGeneration(currentEntry, params.entry) || isFinishedForSteerControl(currentEntry, currentHasPendingDescendants)) return {
		status: "done",
		runId: params.entry.runId,
		sessionKey: params.entry.childSessionKey,
		text: `${resolveSubagentLabel(params.entry)} is already finished.`
	};
	const ownershipError = ensureControllerOwnsRun({
		controller: params.controller,
		entry: currentEntry
	});
	if (ownershipError) return {
		status: "forbidden",
		runId: currentEntry.runId,
		sessionKey: currentEntry.childSessionKey,
		error: ownershipError
	};
	if (currentEntry.collect) return {
		status: "forbidden",
		runId: currentEntry.runId,
		sessionKey: currentEntry.childSessionKey,
		error: "Collector subagents cannot be steered; use agents_wait or cancel the task."
	};
	const rateKey = `${params.controller.callerSessionKey}:${params.entry.childSessionKey}`;
	if (process.env.VITEST !== "true") {
		const now = Date.now();
		if (now - (steerRateLimit.get(rateKey) ?? 0) < STEER_RATE_LIMIT_MS) return {
			status: "rate_limited",
			runId: params.entry.runId,
			sessionKey: params.entry.childSessionKey,
			error: "Steer rate limit exceeded. Wait a moment before sending another steer."
		};
		steerRateLimit.set(rateKey, now);
	}
	let ownsSteerRestart;
	try {
		ownsSteerRestart = markSubagentRunForSteerRestart(params.entry.runId, currentEntry);
	} catch (error) {
		return {
			status: "error",
			runId: params.entry.runId,
			sessionKey: params.entry.childSessionKey,
			error: `Failed to persist steer restart ownership: ${formatErrorMessage(error)}`
		};
	}
	if (!ownsSteerRestart) return {
		status: "error",
		runId: params.entry.runId,
		sessionKey: params.entry.childSessionKey,
		error: "Another subagent restart already owns this session; retry after it settles."
	};
	const targetSession = resolveSessionEntryForKey({
		cfg: params.cfg,
		key: params.entry.childSessionKey,
		cache: /* @__PURE__ */ new Map()
	});
	const sessionId = typeof targetSession.entry?.sessionId === "string" && targetSession.entry.sessionId.trim() ? targetSession.entry.sessionId.trim() : void 0;
	const restartSessionId = sessionId ? crypto.randomUUID() : void 0;
	const runtime = await resolveSubagentControlRuntime();
	if (sessionId) {
		const active = runtime.isEmbeddedAgentRunActive(sessionId);
		const aborted = runtime.abortEmbeddedAgentRun(sessionId);
		if (active && !aborted) {
			clearSubagentRunSteerRestart(params.entry.runId, currentEntry);
			return {
				status: "error",
				runId: params.entry.runId,
				sessionKey: params.entry.childSessionKey,
				sessionId,
				error: "Subagent reply is already finalizing and can no longer be restarted."
			};
		}
	}
	const cleared = runtime.clearSessionQueues([params.entry.childSessionKey, sessionId]);
	if (cleared.followupCleared > 0 || cleared.laneCleared > 0) logVerbose(`subagents control steer: cleared followups=${cleared.followupCleared} lane=${cleared.laneCleared} keys=${cleared.keys.join(",")}`);
	try {
		await subagentControlDeps.callGateway({
			method: "agent.wait",
			params: {
				runId: params.entry.runId,
				timeoutMs: STEER_ABORT_SETTLE_TIMEOUT_MS
			},
			timeoutMs: 7e3
		});
	} catch {}
	const idempotencyKey = crypto.randomUUID();
	let runId = idempotencyKey;
	const latestAfterWait = getLatestLiveSubagentRunByChildSessionKey(currentEntry.childSessionKey);
	const hasPendingDescendantsAfterWait = countPendingDescendantRuns(currentEntry.childSessionKey) > 0;
	if (latestAfterWait !== currentEntry || currentEntry.suppressAnnounceReason !== "steer-restart" || currentEntry.execution.restartRecovery || currentEntry.killIntent || currentEntry.killReconciliation || isFinishedForSteerControl(currentEntry, hasPendingDescendantsAfterWait)) {
		clearSubagentRunSteerRestart(params.entry.runId, currentEntry);
		return {
			status: "done",
			runId: params.entry.runId,
			sessionKey: params.entry.childSessionKey,
			text: `${resolveSubagentLabel(params.entry)} is already finished.`
		};
	}
	try {
		const steerLifecycleGeneration = getAgentEventLifecycleGeneration();
		const response = await subagentControlDeps.callGateway({
			method: "agent",
			params: {
				message: params.message,
				sessionKey: params.entry.childSessionKey,
				sessionId: restartSessionId,
				idempotencyKey,
				deliver: false,
				channel: INTERNAL_MESSAGE_CHANNEL,
				lane: AGENT_LANE_SUBAGENT,
				timeout: 0
			},
			timeoutMs: 1e4
		});
		if (typeof response?.runId === "string" && response.runId) runId = response.runId;
		let acceptedSessionEntry;
		try {
			acceptedSessionEntry = loadSqliteSessionEntry({
				storePath: targetSession.storePath,
				sessionKey: params.entry.childSessionKey,
				clone: false,
				readConsistency: "latest"
			});
		} catch {}
		if (!isAgentEventLifecycleGenerationCurrent(steerLifecycleGeneration)) {
			await terminateAcceptedCollectorRun({
				childSessionKey: params.entry.childSessionKey,
				gatewayRunId: runId,
				expectedSessionId: acceptedSessionEntry?.sessionId,
				expectedLifecycleRevision: acceptedSessionEntry?.lifecycleRevision,
				callGateway: subagentControlDeps.callGateway,
				timeoutMs: 1e4
			});
			clearSubagentRunSteerRestart(params.entry.runId, currentEntry);
			return {
				status: "error",
				runId,
				sessionKey: params.entry.childSessionKey,
				sessionId: restartSessionId,
				error: "Gateway lifecycle changed before the steered run could be registered."
			};
		}
		if (!replaceSubagentRunAfterSteer({
			previousRunId: params.entry.runId,
			nextRunId: runId,
			fallback: currentEntry,
			expected: currentEntry,
			allowEndedSource: true,
			runTimeoutSeconds: currentEntry.runTimeoutSeconds ?? 0,
			lifecycleGeneration: steerLifecycleGeneration,
			task: params.message
		})) {
			await terminateAcceptedCollectorRun({
				childSessionKey: params.entry.childSessionKey,
				gatewayRunId: runId,
				expectedSessionId: acceptedSessionEntry?.sessionId,
				expectedLifecycleRevision: acceptedSessionEntry?.lifecycleRevision,
				callGateway: subagentControlDeps.callGateway,
				timeoutMs: 1e4
			});
			clearSubagentRunSteerRestart(params.entry.runId, currentEntry);
			return {
				status: "error",
				runId,
				sessionKey: params.entry.childSessionKey,
				sessionId: restartSessionId,
				error: "failed to replace steered subagent run"
			};
		}
	} catch (err) {
		clearSubagentRunSteerRestart(params.entry.runId, currentEntry);
		const error = formatErrorMessage(err);
		return {
			status: "error",
			runId,
			sessionKey: params.entry.childSessionKey,
			sessionId: restartSessionId,
			error
		};
	}
	return {
		status: "accepted",
		runId,
		sessionKey: params.entry.childSessionKey,
		sessionId: restartSessionId,
		mode: "restart",
		label: resolveSubagentLabel(params.entry),
		text: `steered ${resolveSubagentLabel(params.entry)}.`
	};
}
/** Sends a follow-up message to a controlled subagent and waits for a reply. */
async function sendControlledSubagentMessage(params) {
	const ownershipError = ensureControllerOwnsRun({
		controller: params.controller,
		entry: params.entry
	});
	if (ownershipError) return {
		status: "forbidden",
		error: ownershipError
	};
	if (params.entry.collect) return {
		status: "forbidden",
		error: "Collector subagents cannot receive follow-up messages; use agents_wait."
	};
	if (params.controller.controlScope !== "children") return {
		status: "forbidden",
		error: "Leaf subagents cannot control other sessions."
	};
	const currentEntry = getLatestLiveSubagentRunByChildSessionKey(params.entry.childSessionKey);
	if (!currentEntry || currentEntry.runId !== params.entry.runId) return {
		status: "done",
		runId: params.entry.runId,
		text: `${resolveSubagentLabel(params.entry)} is already finished.`
	};
	const targetSessionKey = params.entry.childSessionKey;
	const parsed = parseAgentSessionKey(targetSessionKey);
	const targetSessionEntry = loadSqliteSessionEntry({
		storePath: resolveStorePath(params.cfg.session?.store, { agentId: parsed?.agentId }),
		sessionKey: targetSessionKey,
		clone: false
	});
	const targetSessionId = typeof targetSessionEntry?.sessionId === "string" && targetSessionEntry.sessionId.trim() ? targetSessionEntry.sessionId.trim() : void 0;
	const idempotencyKey = crypto.randomUUID();
	let runId = idempotencyKey;
	try {
		const baselineReply = await readLatestAssistantReplySnapshot({
			sessionKey: targetSessionKey,
			limit: SUBAGENT_REPLY_HISTORY_LIMIT,
			callGateway: subagentControlDeps.callGateway
		});
		const response = await subagentControlDeps.callGateway({
			method: "agent",
			params: {
				message: params.message,
				sessionKey: targetSessionKey,
				sessionId: targetSessionId,
				idempotencyKey,
				deliver: false,
				channel: INTERNAL_MESSAGE_CHANNEL,
				lane: AGENT_LANE_SUBAGENT,
				timeout: 0
			},
			timeoutMs: 1e4
		});
		const responseRunId = typeof response?.runId === "string" ? response.runId : void 0;
		if (responseRunId) runId = responseRunId;
		const result = await waitForAgentRunAndReadUpdatedAssistantReply({
			runId,
			sessionKey: targetSessionKey,
			timeoutMs: 3e4,
			limit: SUBAGENT_REPLY_HISTORY_LIMIT,
			baseline: baselineReply,
			callGateway: subagentControlDeps.callGateway
		});
		if (result.status === "timeout") return {
			status: "timeout",
			runId
		};
		if (result.status === "error") return {
			status: "error",
			runId,
			error: result.error ?? "unknown error"
		};
		return {
			status: "ok",
			runId,
			replyText: result.replyText
		};
	} catch (err) {
		const error = formatErrorMessage(err);
		return {
			status: "error",
			runId,
			error
		};
	}
}
const testing = { setDepsForTest(overrides) {
	subagentControlDeps = overrides ? {
		...defaultSubagentControlDeps,
		...overrides
	} : defaultSubagentControlDeps;
} };
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.subagentControlTestApi")] = testing;
//#endregion
export { killSubagentRunAdmin as a, sendControlledSubagentMessage as c, killControlledSubagentRun as i, steerControlledSubagentRun as l, buildControlledSubagentRunsReadContext as n, listControlledSubagentRuns as o, killAllControlledSubagentRuns as r, resolveSubagentController as s, MAX_RECENT_MINUTES as t };
