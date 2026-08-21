import { D as hasSessionAutoModelFallbackProvenance } from "./agent-scope-DyEposw2.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { st as loadSqliteSessionEntry } from "./session-accessor.sqlite-B9iW7DOt.js";
import { $ as listSessionEntries } from "./session-accessor-t3qUoTeV.js";
import { o as resolveSessionLifecycleTimestamps, s as resolveSessionWorkStartError } from "./lifecycle-CeMojaXs.js";
import { n as resolveSessionResetPolicy, t as evaluateSessionFreshness } from "./reset-policy-efjZRFhj.js";
import { r as clearBootstrapSnapshotOnSessionRollover } from "./bootstrap-cache-8R0DvXGI.js";
import { t as hasProviderOwnedSession } from "./entry-freshness-DBBZM9T5.js";
import { t as clearAllCliSessions } from "./cli-session-DdlOOOSD.js";
import crypto from "node:crypto";
//#region src/cron/isolated-agent/session.ts
/** Resolves session rollover and carried state for isolated cron runs. */
const FRESH_CRON_CARRIED_PREFERENCE_FIELDS = [
	"chatType",
	"thinkingLevel",
	"fastMode",
	"verboseLevel",
	"traceLevel",
	"reasoningLevel",
	"ttsAuto",
	"responseUsage",
	"pinnedAt",
	"label",
	"displayName"
];
const AMBIENT_SESSION_CONTEXT_FIELDS = [
	"elevatedLevel",
	"groupActivation",
	"groupActivationNeedsSystemIntro",
	"sendPolicy",
	"queueMode",
	"queueDebounceMs",
	"queueCap",
	"queueDrop",
	"groupId",
	"subject",
	"groupChannel",
	"space",
	"acp"
];
function cloneSessionField(value) {
	return globalThis.structuredClone(value);
}
function copySessionFields(target, entry, fields) {
	for (const field of fields) if (entry[field] !== void 0) target[field] = cloneSessionField(entry[field]);
}
function preserveNonAutoModelOverride(target, entry) {
	const recoveredAutoFallbackOverride = entry.modelOverrideSource === void 0 && hasSessionAutoModelFallbackProvenance(entry);
	if (entry.modelOverrideSource !== "auto" && !recoveredAutoFallbackOverride) {
		let preservedModelSelection = false;
		if (entry.modelOverride !== void 0) {
			target.modelOverride = entry.modelOverride;
			preservedModelSelection = true;
		}
		if (entry.providerOverride !== void 0) target.providerOverride = entry.providerOverride;
		if (entry.modelOverrideSource !== void 0) target.modelOverrideSource = entry.modelOverrideSource;
		if (entry.modelOverrideRouteResolution !== void 0) target.modelOverrideRouteResolution = entry.modelOverrideRouteResolution;
		if (preservedModelSelection && entry.agentRuntimeOverride !== void 0) target.agentRuntimeOverride = entry.agentRuntimeOverride;
	}
}
function preserveUserAuthOverride(target, entry) {
	if (entry.authProfileOverrideSource === "user") {
		if (entry.authProfileOverride !== void 0) target.authProfileOverride = entry.authProfileOverride;
		target.authProfileOverrideSource = entry.authProfileOverrideSource;
		if (entry.authProfileOverrideCompactionCount !== void 0) target.authProfileOverrideCompactionCount = entry.authProfileOverrideCompactionCount;
	}
}
function sanitizeFreshCronSessionEntry(entry, options) {
	const next = {};
	copySessionFields(next, entry, FRESH_CRON_CARRIED_PREFERENCE_FIELDS);
	if (options.preserveAmbientContext) copySessionFields(next, entry, AMBIENT_SESSION_CONTEXT_FIELDS);
	preserveNonAutoModelOverride(next, entry);
	preserveUserAuthOverride(next, entry);
	return next;
}
/**
* Reads the current cron session row without an in-process cache snapshot.
* Lifecycle admission guards compare this against the run's initial entry, so
* the read must bypass cached store snapshots (accessor readConsistency
* "latest"). Cron keys are canonicalized before use, so accessor key
* resolution selects the same row the cron persist path writes.
*/
function loadCronSessionEntryLatest(storePath, sessionKey) {
	return loadSqliteSessionEntry({
		sessionKey,
		storePath,
		readConsistency: "latest"
	});
}
/** Resolves or rolls over the cron session entry for one isolated-agent run. */
function resolveCronSession(params) {
	const sessionCfg = params.cfg.session;
	const storePath = resolveStorePath(sessionCfg?.store, { agentId: params.agentId });
	const store = params.store ?? Object.fromEntries(listSessionEntries({
		agentId: params.agentId,
		storePath
	}).map(({ sessionKey, entry }) => [sessionKey, entry]));
	const sourceSessionKey = params.sourceSessionKey?.trim();
	const sourceSessionDiffers = Boolean(sourceSessionKey && sourceSessionKey !== params.sessionKey);
	const targetEntry = store[params.sessionKey];
	const entry = store[sourceSessionKey || params.sessionKey];
	const archivedSessionError = resolveSessionWorkStartError(params.sessionKey, targetEntry);
	if (archivedSessionError) throw new Error(archivedSessionError);
	let sessionId;
	let isNewSession;
	let systemSent;
	let resetBoundaryPending;
	let staleBoundaryReset = false;
	if (!params.forceNew && entry?.sessionId) {
		const resetPolicy = resolveSessionResetPolicy({
			sessionCfg,
			resetType: "direct"
		});
		if ((resetPolicy.configured !== true && hasProviderOwnedSession(entry) ? { fresh: true } : evaluateSessionFreshness({
			updatedAt: entry.updatedAt,
			...resolveSessionLifecycleTimestamps({
				entry,
				agentId: params.agentId,
				sessionKey: params.sessionKey,
				storePath
			}),
			now: params.nowMs,
			policy: resetPolicy
		})).fresh) {
			sessionId = entry.sessionId;
			isNewSession = false;
			systemSent = entry.systemSent ?? false;
		} else {
			sessionId = sourceSessionDiffers ? crypto.randomUUID() : entry.sessionId;
			isNewSession = true;
			systemSent = false;
			if (!sourceSessionDiffers) {
				staleBoundaryReset = true;
				resetBoundaryPending = {
					reason: "cron-stale",
					sessionFile: params.sessionKey
				};
			}
		}
	} else {
		sessionId = crypto.randomUUID();
		isNewSession = true;
		systemSent = false;
	}
	const previousSessionId = isNewSession && !sourceSessionDiffers && !staleBoundaryReset ? entry?.sessionId : void 0;
	clearBootstrapSnapshotOnSessionRollover({
		sessionKey: params.sessionKey,
		previousSessionId
	});
	const baseEntry = entry ? isNewSession ? sanitizeFreshCronSessionEntry(entry, { preserveAmbientContext: !params.forceNew }) : entry : void 0;
	const lifecycleRevision = crypto.randomUUID();
	const sessionEntry = {
		...baseEntry,
		sessionId,
		lifecycleRevision,
		updatedAt: params.nowMs,
		sessionStartedAt: isNewSession ? params.nowMs : baseEntry?.sessionStartedAt ?? resolveSessionLifecycleTimestamps({
			entry,
			agentId: params.agentId,
			sessionKey: params.sessionKey,
			storePath
		}).sessionStartedAt,
		lastInteractionAt: isNewSession ? params.nowMs : baseEntry?.lastInteractionAt,
		...params.hookExternalContentSource ? { hookExternalContentSource: params.hookExternalContentSource } : {},
		systemSent
	};
	if (resetBoundaryPending) {
		clearAllCliSessions(sessionEntry);
		sessionEntry.agentHarnessId = void 0;
		sessionEntry.compactionCount = 0;
	}
	return {
		storePath,
		store,
		sessionEntry,
		lifecycleRevision,
		systemSent,
		isNewSession,
		previousSessionId,
		resetBoundaryPending,
		initialSessionEntry: targetEntry
	};
}
//#endregion
export { resolveCronSession as n, loadCronSessionEntryLatest as t };
