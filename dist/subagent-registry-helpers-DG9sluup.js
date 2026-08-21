import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { s as asFiniteNumber } from "./number-coercion-Crk_c9KW.js";
import { r as defaultRuntime } from "./runtime-DOr96aVu.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { r as getRuntimeConfig } from "./io-BsQc3Kgy.js";
import { k as selectDeliverableSessionsReply } from "./openclaw-state-db-D9eH245j.js";
import { n as computeBackoff } from "./src-DKBD8PDy.js";
import "./config-BBVHtcXg.js";
import { t as truncateUtf8Prefix } from "./utf8-truncate-Dro7v_iB.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { ct as loadSqliteSessionEntryReadOnly, lt as patchSqliteSessionEntry, nt as listSqliteSessionEntriesReadOnly } from "./session-accessor.sqlite-CtCo5VZ6.js";
import "./session-accessor-D5Or7WgI.js";
import "./backoff-CCtTkmwj.js";
import "./sessions-BqBqRT1f.js";
import { f as getDeliveryAttemptCount, p as getDeliveryLastError } from "./subagent-registry.store.sqlite-CnKtxK9F.js";
import { h as SUBAGENT_ENDED_REASON_KILLED, i as isStaleUnendedSubagentRun, l as resolveSubagentSessionStatus, m as SUBAGENT_ENDED_REASON_ERROR, o as getSubagentSessionRuntimeMs, p as SUBAGENT_ENDED_REASON_COMPLETE, s as getSubagentSessionStartedAt } from "./subagent-run-liveness-CjxLH_UA.js";
import fs, { promises } from "node:fs";
import path from "node:path";
//#region src/agents/subagent-completion-result.ts
/** Selects the canonical operator-visible result from captured completion state. */
function resolveSubagentCompletionResultText(entry) {
	const terminalReply = entry.completion?.terminalReply;
	if (terminalReply) return terminalReply.disposition === "visible" ? terminalReply.text : void 0;
	const primary = entry.completion?.resultText;
	const fallback = entry.completion?.fallbackResultText;
	if (entry.execution.outcome?.status === "ok") return selectDeliverableSessionsReply(primary, fallback);
	return (primary ?? fallback)?.trim() || void 0;
}
//#endregion
//#region src/agents/subagent-session-reconciliation.ts
/**
* Subagent session-store reconciliation.
*
* Infers child completion from persisted session entries when registry updates arrive late.
*/
function finiteTimestamp(value) {
	return asFiniteNumber(value);
}
function terminalSessionTimestamp(sessionEntry) {
	return finiteTimestamp(sessionEntry?.endedAt) ?? finiteTimestamp(sessionEntry?.updatedAt);
}
function isFreshForRun(sessionEntry, notBeforeMs) {
	if (notBeforeMs === void 0) return true;
	const terminalAt = terminalSessionTimestamp(sessionEntry);
	return terminalAt !== void 0 && terminalAt >= notBeforeMs;
}
function freshSessionStartedAt(sessionEntry, notBeforeMs) {
	const startedAt = finiteTimestamp(sessionEntry?.startedAt);
	if (startedAt === void 0) return;
	return notBeforeMs === void 0 || startedAt >= notBeforeMs ? startedAt : void 0;
}
function findSessionEntryByKey(store, sessionKey) {
	const direct = store[sessionKey];
	if (direct) return direct;
	const normalized = sessionKey.trim().toLowerCase();
	for (const [key, entry] of Object.entries(store)) if (key.trim().toLowerCase() === normalized) return entry;
}
/** Load a child session entry using the agent-specific session store path. */
function loadSubagentSessionEntry(params) {
	const key = params.childSessionKey.trim();
	if (!key) return;
	const agentId = resolveAgentIdFromSessionKey(key);
	const storePath = resolveStorePath((params.cfg ?? getRuntimeConfig()).session?.store, { agentId });
	let store = params.storeCache?.get(storePath);
	if (!store) {
		store = Object.fromEntries(listSqliteSessionEntriesReadOnly({
			storePath,
			clone: false
		}).map(({ sessionKey, entry }) => [sessionKey, entry]));
		params.storeCache?.set(storePath, store);
	}
	return findSessionEntryByKey(store, key);
}
/** Resolve a child session entry without depending on the file-backed store shape. */
function loadSubagentSessionEntryForAccessor(params) {
	const key = params.childSessionKey.trim();
	if (!key) return;
	const agentId = resolveAgentIdFromSessionKey(key);
	return loadSqliteSessionEntryReadOnly({
		storePath: resolveStorePath((params.cfg ?? getRuntimeConfig()).session?.store, { agentId }),
		sessionKey: key,
		clone: false
	});
}
/** Resolves whether a registry row is orphaned from its child session entry. */
function resolveSubagentRunOrphanReason(params) {
	const childSessionKey = params.entry.childSessionKey?.trim();
	if (!childSessionKey) return "missing-session-entry";
	try {
		const sessionEntry = loadSubagentSessionEntryForAccessor({
			childSessionKey,
			cfg: params.cfg
		});
		if (!sessionEntry) return "missing-session-entry";
		if (typeof sessionEntry.sessionId !== "string" || !sessionEntry.sessionId.trim()) return "missing-session-id";
		if (params.includeStaleUnended === true && sessionEntry.abortedLastRun !== true && isStaleUnendedSubagentRun(params.entry, params.now)) return "stale-unended-run";
		return null;
	} catch {
		return null;
	}
}
/** Convert persisted session status into a subagent completion outcome. */
function resolveCompletionFromSessionEntry(sessionEntry, fallbackEndedAt, opts) {
	const status = sessionEntry?.status;
	const startedAt = freshSessionStartedAt(sessionEntry, opts?.notBeforeMs);
	const endedAt = finiteTimestamp(sessionEntry?.endedAt) ?? finiteTimestamp(sessionEntry?.updatedAt) ?? fallbackEndedAt;
	if (status === "done") {
		if (!isFreshForRun(sessionEntry, opts?.notBeforeMs)) return null;
		return {
			startedAt,
			endedAt,
			outcome: { status: "ok" },
			reason: SUBAGENT_ENDED_REASON_COMPLETE
		};
	}
	if (status === "timeout") {
		if (!isFreshForRun(sessionEntry, opts?.notBeforeMs)) return null;
		return {
			startedAt,
			endedAt,
			outcome: { status: "timeout" },
			reason: SUBAGENT_ENDED_REASON_COMPLETE
		};
	}
	if (status === "failed") {
		if (!isFreshForRun(sessionEntry, opts?.notBeforeMs)) return null;
		return {
			startedAt,
			endedAt,
			outcome: {
				status: "error",
				error: "session completed before registry settled"
			},
			reason: SUBAGENT_ENDED_REASON_ERROR
		};
	}
	if (status === "killed") {
		if (!isFreshForRun(sessionEntry, opts?.notBeforeMs)) return null;
		return {
			startedAt,
			endedAt,
			outcome: {
				status: "error",
				error: "subagent run terminated"
			},
			reason: SUBAGENT_ENDED_REASON_KILLED
		};
	}
	if (status !== "running" && typeof sessionEntry?.endedAt === "number") {
		if (!isFreshForRun(sessionEntry, opts?.notBeforeMs)) return null;
		return {
			startedAt,
			endedAt,
			outcome: { status: "ok" },
			reason: SUBAGENT_ENDED_REASON_COMPLETE
		};
	}
	return null;
}
/** Resolve child completion by reading its persisted session entry. */
function resolveSubagentSessionCompletion(params) {
	return resolveCompletionFromSessionEntry(loadSubagentSessionEntry({
		childSessionKey: params.childSessionKey,
		storeCache: params.storeCache,
		cfg: params.cfg
	}), params.fallbackEndedAt, { notBeforeMs: params.notBeforeMs });
}
/** Resolve a fresh child session start time for lifecycle reconciliation. */
function resolveSubagentSessionStartedAt(params) {
	const sessionEntry = loadSubagentSessionEntry({
		childSessionKey: params.childSessionKey,
		storeCache: params.storeCache,
		cfg: params.cfg
	});
	return isFreshForRun(sessionEntry, params.notBeforeMs) ? freshSessionStartedAt(sessionEntry, params.notBeforeMs) : void 0;
}
//#endregion
//#region src/agents/subagent-registry-helpers.ts
/**
* Subagent registry persistence and recovery helpers.
*
* Handles frozen result caps, orphan detection, timing persistence, and announce retry logging.
*/
const PROVISIONAL_KILL_RECONCILIATION_MS = 5 * 6e4;
const MIN_ANNOUNCE_RETRY_DELAY_MS = 15e3;
const MAX_ANNOUNCE_RETRY_DELAY_MS = 5 * 6e4;
const ANNOUNCE_RETRY_JITTER = .2;
const ANNOUNCE_EXPIRY_MS = 5 * 6e4;
const ANNOUNCE_COMPLETION_HARD_EXPIRY_MS = 30 * 6e4;
const ANNOUNCE_RETRY_BACKOFF = {
	initialMs: MIN_ANNOUNCE_RETRY_DELAY_MS,
	maxMs: MAX_ANNOUNCE_RETRY_DELAY_MS,
	factor: 2,
	jitter: ANNOUNCE_RETRY_JITTER
};
const FROZEN_RESULT_TEXT_MAX_BYTES = 100 * 1024;
/** Caps frozen completion text stored for later announce/recovery delivery. */
function capFrozenResultText(resultText) {
	const trimmed = resultText.trim();
	if (!trimmed) return "";
	const totalBytes = Buffer.byteLength(trimmed, "utf8");
	if (totalBytes <= FROZEN_RESULT_TEXT_MAX_BYTES) return trimmed;
	const notice = `\n\n[truncated: frozen completion output exceeded ${Math.round(FROZEN_RESULT_TEXT_MAX_BYTES / 1024)}KB (${Math.round(totalBytes / 1024)}KB)]`;
	return `${truncateUtf8Prefix(trimmed, Math.max(0, FROZEN_RESULT_TEXT_MAX_BYTES - Buffer.byteLength(notice, "utf8")))}${notice}`;
}
/** Computes bounded exponential backoff for subagent announce retries. */
function resolveAnnounceRetryDelayMs(retryCount) {
	return computeBackoff(ANNOUNCE_RETRY_BACKOFF, Math.max(1, retryCount));
}
function formatAnnounceGiveUpLogField(value) {
	const normalized = value.replace(/\s+/g, " ").trim();
	return JSON.stringify(normalized.length > 2e3 ? `${truncateUtf16Safe(normalized, 2e3)}…` : normalized);
}
/** Logs a sanitized final give-up line for failed subagent announce delivery. */
function logAnnounceGiveUp(entry, reason) {
	const retryCount = getDeliveryAttemptCount(entry);
	const endedAt = entry.execution.endedAt;
	const endedAgoMs = typeof endedAt === "number" ? Math.max(0, Date.now() - endedAt) : void 0;
	const endedAgoLabel = endedAgoMs != null ? `${Math.round(endedAgoMs / 1e3)}s` : "n/a";
	const lastDeliveryError = getDeliveryLastError(entry);
	const deliveryError = lastDeliveryError ? ` deliveryError=${formatAnnounceGiveUpLogField(lastDeliveryError)}` : "";
	defaultRuntime.log(`[warn] Subagent announce give up (${reason}) run=${entry.runId} child=${entry.childSessionKey} requester=${entry.requesterSessionKey} retries=${retryCount} endedAgo=${endedAgoLabel}${deliveryError}`);
}
/** Persists child session timing/status derived from the subagent registry row. */
async function persistSubagentSessionTiming(entry, options) {
	const childSessionKey = entry.childSessionKey?.trim();
	if (!childSessionKey) return;
	const cfg = getRuntimeConfig();
	const agentId = resolveAgentIdFromSessionKey(childSessionKey);
	const storePath = resolveStorePath(cfg.session?.store, { agentId });
	const startedAt = getSubagentSessionStartedAt(entry);
	const endedAt = typeof entry.execution.endedAt === "number" && Number.isFinite(entry.execution.endedAt) ? entry.execution.endedAt : void 0;
	const runtimeMs = endedAt !== void 0 ? getSubagentSessionRuntimeMs(entry, endedAt) : getSubagentSessionRuntimeMs(entry);
	const status = resolveSubagentSessionStatus(entry);
	await patchSqliteSessionEntry({
		storePath,
		sessionKey: childSessionKey
	}, (sessionEntry) => {
		if (options?.isCurrentGeneration && !options.isCurrentGeneration()) return null;
		if (status === "killed") {
			const existingCompletion = resolveCompletionFromSessionEntry(sessionEntry, Date.now(), { notBeforeMs: entry.execution.startedAt ?? entry.createdAt });
			if (existingCompletion && existingCompletion.reason !== "subagent-killed") {
				if (sessionEntry.abortedLastRun !== true) return null;
				const completedEntry = { ...sessionEntry };
				delete completedEntry.abortedLastRun;
				return completedEntry;
			}
		}
		const next = { ...sessionEntry };
		if (typeof startedAt === "number" && Number.isFinite(startedAt)) next.startedAt = startedAt;
		else delete next.startedAt;
		if (typeof endedAt === "number" && Number.isFinite(endedAt)) next.endedAt = endedAt;
		else delete next.endedAt;
		if (typeof runtimeMs === "number" && Number.isFinite(runtimeMs)) next.runtimeMs = runtimeMs;
		else delete next.runtimeMs;
		if (status) next.status = status;
		else delete next.status;
		if (status && status !== "killed") delete next.abortedLastRun;
		return next;
	}, {
		assertCommitAllowed: options?.assertCommitAllowed,
		replaceEntry: true
	});
}
function isResolvedChildPath(params) {
	const rootWithSep = params.rootPath.endsWith(path.sep) ? params.rootPath : `${params.rootPath}${path.sep}`;
	return params.childPath.startsWith(rootWithSep);
}
/** Best-effort async removal for a subagent attachment directory. */
async function safeRemoveAttachmentsDir(entry) {
	if (!entry.attachmentsDir || !entry.attachmentsRootDir) return true;
	const resolveReal = async (targetPath) => {
		try {
			return await promises.realpath(targetPath);
		} catch (err) {
			if (err?.code === "ENOENT") return null;
			throw err;
		}
	};
	try {
		const [rootReal, dirReal] = await Promise.all([resolveReal(entry.attachmentsRootDir), resolveReal(entry.attachmentsDir)]);
		if (!dirReal) return true;
		const rootBase = rootReal ?? path.resolve(entry.attachmentsRootDir);
		const dirBase = dirReal;
		if (!isResolvedChildPath({
			childPath: dirBase,
			rootPath: rootBase
		})) return false;
		await promises.rm(dirBase, {
			recursive: true,
			force: true
		});
		return true;
	} catch {
		return false;
	}
}
function safeRemoveAttachmentsDirSync(entry) {
	if (!entry.attachmentsDir || !entry.attachmentsRootDir) return;
	const resolveReal = (targetPath) => {
		try {
			return fs.realpathSync.native(targetPath);
		} catch (err) {
			if (err?.code === "ENOENT") return null;
			throw err;
		}
	};
	try {
		const rootReal = resolveReal(entry.attachmentsRootDir);
		const dirReal = resolveReal(entry.attachmentsDir);
		if (!dirReal) return;
		if (!isResolvedChildPath({
			childPath: dirReal,
			rootPath: rootReal ?? path.resolve(entry.attachmentsRootDir)
		})) return;
		fs.rmSync(dirReal, {
			recursive: true,
			force: true
		});
	} catch {}
}
/** Marks an orphaned registry run finished, cleans attachments, and removes it. */
function reconcileOrphanedRun(params) {
	if (params.entry.cleanup === "delete" || !params.entry.retainAttachmentsOnKeep) safeRemoveAttachmentsDirSync(params.entry);
	const removed = params.runs.delete(params.runId);
	params.resumedRuns.delete(params.runId);
	if (!removed) return false;
	defaultRuntime.log(`[warn] Subagent orphan run pruned source=${params.source} run=${params.runId} child=${params.entry.childSessionKey} reason=${params.reason}`);
	return true;
}
/** Reconciles orphaned runs found when restoring persisted subagent registry state. */
function reconcileOrphanedRestoredRuns(params) {
	const now = Date.now();
	let changed = false;
	for (const [runId, entry] of params.runs.entries()) {
		if (entry.collect && entry.collectorCompletion) continue;
		if (entry.requesterSettleWake) continue;
		if (entry.killReconciliation || entry.killIntent || entry.execution.restartRecovery || entry.terminalOwner === "interrupted-recovery") continue;
		const orphanReason = resolveSubagentRunOrphanReason({
			entry,
			includeStaleUnended: true,
			now
		});
		if (!orphanReason) continue;
		if (reconcileOrphanedRun({
			runId,
			entry,
			reason: orphanReason,
			source: "restore",
			runs: params.runs,
			resumedRuns: params.resumedRuns
		})) changed = true;
	}
	return changed;
}
/** Resolves the completed subagent archive delay from config. */
function resolveArchiveAfterMs(cfg) {
	const minutes = (cfg ?? getRuntimeConfig()).agents?.defaults?.subagents?.archiveAfterMinutes ?? 60;
	if (!Number.isFinite(minutes) || minutes < 0) return;
	if (minutes === 0) return;
	return Math.max(1, Math.floor(minutes)) * 6e4;
}
/** Resolves the archive deadline for one newly registered run. */
function resolveSubagentArchiveAtMs(params) {
	if (params.spawnMode === "session" || params.collect || params.cleanup === "keep") return;
	const archiveAfterMs = resolveArchiveAfterMs(params.cfg);
	return archiveAfterMs ? params.now + archiveAfterMs : void 0;
}
/** Backfills the retention deadline added after collector groups first shipped. */
function backfillCollectorArchiveAtMs(entry, cfg) {
	if (!entry.collect) return false;
	const endedAt = typeof entry.execution.endedAt === "number" && Number.isFinite(entry.execution.endedAt) ? entry.execution.endedAt : void 0;
	const capturedAt = endedAt === void 0 && !entry.collectorCompletion ? void 0 : typeof entry.completion?.capturedAt === "number" && Number.isFinite(entry.completion.capturedAt) ? entry.completion.capturedAt : endedAt;
	const archiveAfterMs = entry.spawnMode === "session" ? void 0 : resolveArchiveAfterMs(cfg);
	const expectedArchiveAt = capturedAt !== void 0 && archiveAfterMs !== void 0 ? capturedAt + archiveAfterMs : void 0;
	if (entry.archiveAtMs === expectedArchiveAt) return false;
	if (expectedArchiveAt === void 0) delete entry.archiveAtMs;
	else entry.archiveAtMs = expectedArchiveAt;
	return true;
}
//#endregion
export { resolveSubagentSessionCompletion as _, backfillCollectorArchiveAtMs as a, persistSubagentSessionTiming as c, resolveAnnounceRetryDelayMs as d, resolveSubagentArchiveAtMs as f, resolveSubagentRunOrphanReason as g, resolveCompletionFromSessionEntry as h, PROVISIONAL_KILL_RECONCILIATION_MS as i, reconcileOrphanedRestoredRuns as l, loadSubagentSessionEntry as m, ANNOUNCE_EXPIRY_MS as n, capFrozenResultText as o, safeRemoveAttachmentsDir as p, MIN_ANNOUNCE_RETRY_DELAY_MS as r, logAnnounceGiveUp as s, ANNOUNCE_COMPLETION_HARD_EXPIRY_MS as t, reconcileOrphanedRun as u, resolveSubagentSessionStartedAt as v, resolveSubagentCompletionResultText as y };
