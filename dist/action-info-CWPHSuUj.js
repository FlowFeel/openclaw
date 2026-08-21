import { P as timestampMsToIsoString } from "./number-coercion-Crk_c9KW.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { ct as loadSqliteSessionEntryReadOnly } from "./session-accessor.sqlite-B9iW7DOt.js";
import "./session-accessor-t3qUoTeV.js";
import { t as formatDurationCompact } from "./format-duration-DKk9BtRb.js";
import { o as sanitizeTaskStatusText } from "./task-status-Bo-Cq_rI.js";
import { b as subagentRuns } from "./subagent-registry.store.sqlite-gBhFvyR2.js";
import { h as countPendingDescendantRunsFromRuns, i as getSubagentRunsSnapshotForRead } from "./subagent-registry-state-D0eZgp5g.js";
import { c as resolveSubagentDisplayStatus } from "./subagent-run-liveness-CjxLH_UA.js";
import { i as findTaskByRunIdForOwner } from "./task-owner-access-BAXOqENW.js";
import { t as formatRunLabel } from "./subagents-utils-Co2UgCFq.js";
import "./subagents-format-Qpy9yX8Z.js";
import { n as formatTimeAgo } from "./format-relative-Dd106CpA.js";
import { l as stopWithText, s as resolveSubagentEntryForToken } from "./shared-BPW2e5et.js";
//#region src/auto-reply/reply/commands-subagents/action-info.ts
function formatTimestampWithAge(valueMs) {
	if (!valueMs || !Number.isFinite(valueMs) || valueMs <= 0) return "n/a";
	const timestamp = timestampMsToIsoString(valueMs);
	if (!timestamp) return "n/a";
	return `${timestamp} (${formatTimeAgo(Date.now() - valueMs, { fallback: "n/a" })})`;
}
function loadSubagentSessionEntry(params, childKey) {
	const parsed = parseAgentSessionKey(childKey);
	return { entry: loadSqliteSessionEntryReadOnly({
		storePath: resolveStorePath(params.cfg.session?.store, { agentId: parsed?.agentId }),
		sessionKey: childKey,
		clone: false
	}) };
}
function handleSubagentsInfoAction(ctx) {
	const { params, requesterKey, runs, restTokens } = ctx;
	const target = restTokens[0];
	if (!target) return stopWithText("ℹ️ Usage: /subagents info <id|#>");
	const targetResolution = resolveSubagentEntryForToken(runs, target);
	if ("reply" in targetResolution) return targetResolution.reply;
	const run = targetResolution.entry;
	const { entry: sessionEntry } = loadSubagentSessionEntry(params, run.childSessionKey);
	const runtime = run.execution.startedAt && Number.isFinite(run.execution.startedAt) ? formatDurationCompact((run.execution.endedAt ?? Date.now()) - run.execution.startedAt) ?? "n/a" : "n/a";
	const outcomeError = sanitizeTaskStatusText(run.execution.outcome?.error, { errorContext: true });
	const outcome = run.execution.outcome ? `${run.execution.outcome.status}${outcomeError ? ` (${outcomeError})` : ""}` : "n/a";
	const linkedTask = findTaskByRunIdForOwner({
		runId: run.runId,
		callerOwnerKey: requesterKey
	});
	const taskText = sanitizeTaskStatusText(run.task) || "n/a";
	const progressText = sanitizeTaskStatusText(linkedTask?.progressSummary);
	const taskSummaryText = sanitizeTaskStatusText(linkedTask?.terminalSummary, { errorContext: true });
	const taskErrorText = sanitizeTaskStatusText(linkedTask?.error, { errorContext: true });
	return stopWithText([
		"ℹ️ Subagent info",
		`Status: ${resolveSubagentDisplayStatus(run, countPendingDescendantRunsFromRuns(getSubagentRunsSnapshotForRead(subagentRuns), run.childSessionKey))}`,
		`Label: ${formatRunLabel(run)}`,
		`Task: ${taskText}`,
		`Run: ${run.runId}`,
		linkedTask ? `TaskId: ${linkedTask.taskId}` : void 0,
		linkedTask ? `TaskStatus: ${linkedTask.status}` : void 0,
		`Session: ${run.childSessionKey}`,
		`SessionId: ${sessionEntry?.sessionId ?? "n/a"}`,
		`Runtime: ${runtime}`,
		`Created: ${formatTimestampWithAge(run.createdAt)}`,
		`Started: ${formatTimestampWithAge(run.execution.startedAt)}`,
		`Ended: ${formatTimestampWithAge(run.execution.endedAt)}`,
		`Cleanup: ${run.cleanup}`,
		run.archiveAtMs ? `Archive: ${formatTimestampWithAge(run.archiveAtMs)}` : void 0,
		run.cleanupHandled ? "Cleanup handled: yes" : void 0,
		`Outcome: ${outcome}`,
		progressText ? `Progress: ${progressText}` : void 0,
		taskSummaryText ? `Task summary: ${taskSummaryText}` : void 0,
		taskErrorText ? `Task error: ${taskErrorText}` : void 0,
		linkedTask ? `Delivery: ${linkedTask.deliveryStatus}` : void 0
	].filter(Boolean).join("\n"));
}
//#endregion
export { handleSubagentsInfoAction };
