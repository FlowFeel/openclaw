import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-DW4mBlAt.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { nt as listSqliteSessionEntriesReadOnly } from "./session-accessor.sqlite-CtCo5VZ6.js";
import "./session-accessor-D5Or7WgI.js";
import { t as formatDurationCompact } from "./format-duration-DKk9BtRb.js";
import { b as subagentRuns } from "./subagent-registry.store.sqlite-CnKtxK9F.js";
import { d as buildSubagentRunReadIndexFromRuns, i as getSubagentRunsSnapshotForRead } from "./subagent-registry-state-jajoFCVZ.js";
import { a as shouldKeepSubagentRunChildLink, c as resolveSubagentDisplayStatus, o as getSubagentSessionRuntimeMs, r as isLiveUnendedSubagentRun, s as getSubagentSessionStartedAt } from "./subagent-run-liveness-CjxLH_UA.js";
import "./subagent-registry-read-CIgozRhQ.js";
import { i as sortSubagentRuns, n as resolveSubagentLabel } from "./subagents-utils-Co2UgCFq.js";
import { n as resolveTotalTokens, r as truncateLine, t as formatTokenUsageDisplay } from "./subagents-format-Qpy9yX8Z.js";
import { n as resolveModelDisplayRef, t as resolveModelDisplayName } from "./model-selection-display-C8q7c9oG.js";
//#region src/agents/subagent-list.ts
/**
* Subagent list builder.
*
* Combines live registry runs and persisted session metadata for sessions_list/subagents views.
*/
function resolveStorePathForKey(cfg, parsed) {
	return resolveStorePath(cfg.session?.store, { agentId: parsed?.agentId });
}
/** Resolve persisted session metadata for a session key, caching per store path. */
function resolveSessionEntryForKey(params) {
	const parsed = parseAgentSessionKey(params.key);
	const storePath = resolveStorePathForKey(params.cfg, parsed);
	let store = params.cache.get(storePath);
	if (!store) {
		store = Object.fromEntries(listSqliteSessionEntriesReadOnly({
			storePath,
			clone: false
		}).map(({ sessionKey, entry }) => [sessionKey, entry]));
		params.cache.set(storePath, store);
	}
	return {
		storePath,
		entry: store[params.key]
	};
}
/** Build child-session indexes from the latest run associated with each child key. */
function buildLatestSubagentRunIndex(runs, options) {
	const now = options?.now ?? Date.now();
	const readIndex = buildSubagentRunReadIndexFromRuns({
		runs,
		now
	});
	const latestByChildSessionKey = new Map(readIndex.latestRunsByChildSessionKey);
	const childSessionsByController = /* @__PURE__ */ new Map();
	for (const [childSessionKey, entry] of latestByChildSessionKey.entries()) {
		const controllerSessionKey = entry.controllerSessionKey?.trim() || entry.requesterSessionKey?.trim();
		if (!controllerSessionKey) continue;
		if (!shouldKeepSubagentRunChildLink(entry, {
			activeDescendants: readIndex.countActiveDescendantRuns(childSessionKey),
			now
		})) continue;
		const existing = childSessionsByController.get(controllerSessionKey);
		if (existing) {
			existing.push(childSessionKey);
			continue;
		}
		childSessionsByController.set(controllerSessionKey, [childSessionKey]);
	}
	for (const [controllerSessionKey, childSessions] of childSessionsByController) childSessionsByController.set(controllerSessionKey, childSessions.toSorted());
	return {
		latestByChildSessionKey,
		childSessionsByController,
		readIndex
	};
}
/** Return whether a run should be shown in the active subagent section. */
function isActiveSubagentRun(entry, pendingDescendantCount) {
	return isLiveUnendedSubagentRun(entry) || pendingDescendantCount(entry.childSessionKey) > 0;
}
function resolveModelRef(entry, fallbackModel) {
	return resolveModelDisplayRef({
		runtimeProvider: entry?.modelProvider,
		runtimeModel: entry?.model,
		overrideProvider: entry?.providerOverride,
		overrideModel: entry?.modelOverride,
		fallbackModel
	});
}
function resolveModelDisplay(entry, fallbackModel) {
	return resolveModelDisplayName({
		runtimeProvider: entry?.modelProvider,
		runtimeModel: entry?.model,
		overrideProvider: entry?.providerOverride,
		overrideModel: entry?.modelOverride,
		fallbackModel
	});
}
function buildListText(params) {
	const lines = [];
	lines.push("active subagents:");
	if (params.active.length === 0) lines.push("(none)");
	else lines.push(...params.active.map((entry) => entry.line));
	lines.push("");
	lines.push(`recent (last ${params.recentMinutes}m):`);
	if (params.recent.length === 0) lines.push("(none)");
	else lines.push(...params.recent.map((entry) => entry.line));
	return lines.join("\n");
}
/** Build structured and text views for active and recent subagent runs. */
function buildSubagentList(params) {
	const now = Date.now();
	const recentCutoff = now - params.recentMinutes * 6e4;
	const dedupedRuns = [];
	const seenChildSessionKeys = /* @__PURE__ */ new Set();
	for (const entry of sortSubagentRuns(params.runs)) {
		if (seenChildSessionKeys.has(entry.childSessionKey)) continue;
		seenChildSessionKeys.add(entry.childSessionKey);
		dedupedRuns.push(entry);
	}
	const cache = /* @__PURE__ */ new Map();
	const { childSessionsByController, readIndex } = buildLatestSubagentRunIndex(getSubagentRunsSnapshotForRead(subagentRuns));
	const pendingDescendantCount = (sessionKey) => readIndex.countPendingDescendantRuns(sessionKey);
	let index = 1;
	const buildListEntry = (entry, runtimeMs) => {
		const sessionEntry = resolveSessionEntryForKey({
			cfg: params.cfg,
			key: entry.childSessionKey,
			cache
		}).entry;
		const totalTokens = resolveTotalTokens(sessionEntry);
		const usageText = formatTokenUsageDisplay(sessionEntry);
		const pendingDescendants = pendingDescendantCount(entry.childSessionKey);
		const status = resolveSubagentDisplayStatus(entry, pendingDescendants);
		const childSessions = childSessionsByController.get(entry.childSessionKey) ?? [];
		const runtime = formatDurationCompact(runtimeMs) ?? "n/a";
		const label = truncateLine(resolveSubagentLabel(entry), 48);
		const task = truncateLine(entry.task.trim(), params.taskMaxChars ?? 72);
		const taskName = entry.taskName?.trim();
		const taskNamePrefix = taskName ? `${taskName}: ` : "";
		const line = `${index}. ${taskNamePrefix}${label} (${resolveModelDisplay(sessionEntry, entry.model)}, ${runtime}${usageText ? `, ${usageText}` : ""}) ${status}${normalizeLowercaseStringOrEmpty(task) !== normalizeLowercaseStringOrEmpty(label) ? ` - ${task}` : ""}`;
		const view = {
			index,
			line,
			runId: entry.runId,
			sessionKey: entry.childSessionKey,
			...taskName ? { taskName } : {},
			label,
			task,
			status,
			pendingDescendants,
			runtime,
			runtimeMs,
			...childSessions.length > 0 ? { childSessions } : {},
			model: resolveModelRef(sessionEntry, entry.model),
			totalTokens,
			startedAt: getSubagentSessionStartedAt(entry),
			...entry.execution.endedAt ? { endedAt: entry.execution.endedAt } : {}
		};
		index += 1;
		return view;
	};
	const active = dedupedRuns.filter((entry) => isActiveSubagentRun(entry, pendingDescendantCount)).map((entry) => buildListEntry(entry, getSubagentSessionRuntimeMs(entry, now) ?? 0));
	const recent = dedupedRuns.filter((entry) => !isActiveSubagentRun(entry, pendingDescendantCount) && Boolean(entry.execution.endedAt) && (entry.execution.endedAt ?? 0) >= recentCutoff).map((entry) => buildListEntry(entry, getSubagentSessionRuntimeMs(entry, entry.execution.endedAt ?? now) ?? 0));
	return {
		total: dedupedRuns.length,
		active,
		recent,
		text: buildListText({
			active,
			recent,
			recentMinutes: params.recentMinutes
		})
	};
}
//#endregion
export { resolveSessionEntryForKey as n, buildSubagentList as t };
