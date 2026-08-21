import { f as resolveDefaultAgentId, i as listAgentIds } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as classifySessionKeyShape, f as resolveAgentIdFromSessionKey, l as isUnscopedSessionKeySentinel, u as normalizeMainKey } from "./session-key-DtTE9-Tg.js";
import "./agent-scope-DyEposw2.js";
import { s as normalizeThinkLevel, u as normalizeVerboseLevel } from "./thinking.shared-k6K-6JHM.js";
import "./thinking-CLPqbAwx.js";
import { u as sessionDeliveryChannel } from "./delivery-context.shared-B-QSuGw_.js";
import { i as resolveExplicitAgentSessionKey, n as canonicalizeMainSessionAlias } from "./main-session-Bjm_i_Af.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { $ as listSessionEntries } from "./session-accessor-t3qUoTeV.js";
import { i as hasTerminalMainSessionTranscriptNewerThanRegistrySync, o as resolveSessionLifecycleTimestamps } from "./lifecycle-CeMojaXs.js";
import { n as resolveSessionResetPolicy, t as evaluateSessionFreshness } from "./reset-policy-efjZRFhj.js";
import { n as resolveSessionResetType, t as resolveChannelResetConfig } from "./reset--HEclQZS.js";
import { n as resolveSessionKey } from "./session-key-CY0q26lB.js";
import { i as transitionMainSessionRecovery } from "./main-session-recovery-state-CUJxZLgx.js";
import { n as resolveSessionIdMatchSelection } from "./session-id-resolution-joL8CTWk.js";
import { r as clearBootstrapSnapshotOnSessionRollover } from "./bootstrap-cache-8R0DvXGI.js";
import { a as isModelSelectionLocked } from "./model-overrides-BT6Lelev.js";
import { t as hasProviderOwnedSession } from "./entry-freshness-DBBZM9T5.js";
import { t as clearAllCliSessions } from "./cli-session-DdlOOOSD.js";
import crypto from "node:crypto";
//#region src/agents/command/session.ts
/**
* Resolves command session ids, keys, stores, and persisted thinking state.
*/
function clearRotatedSessionMetadata(entry) {
	const next = {
		...entry,
		sessionFile: void 0,
		status: void 0,
		startedAt: void 0,
		endedAt: void 0,
		runtimeMs: void 0,
		abortedLastRun: void 0,
		restartRecoveryForceSafeTools: void 0,
		restartRecoveryDeliveryContext: void 0,
		restartRecoveryDeliveryMediaUrls: void 0,
		restartRecoveryDisableMessageTool: void 0,
		restartRecoverySuppressTextDelivery: void 0,
		restartRecoveryDeliveryRequestFingerprint: void 0,
		restartRecoveryDeliveryRunId: void 0,
		restartRecoveryDeliverySourceRunId: void 0,
		restartRecoveryBeforeAgentReplyState: void 0,
		restartRecoveryDeliveryReceiptState: void 0,
		restartRecoveryDeliveryToolCallId: void 0,
		restartRecoveryRequesterAccountId: void 0,
		restartRecoveryRequesterSenderId: void 0,
		restartRecoverySameChannelThreadRequired: void 0,
		restartRecoverySourceIngress: void 0,
		restartRecoverySourceReplyDeliveryMode: void 0,
		restartRecoveryTerminalDeliveryEvidence: void 0,
		restartRecoveryTerminalRunIds: void 0,
		sessionStartedAt: void 0,
		sessionDiffBaseline: void 0,
		lastInteractionAt: void 0,
		pendingTranscriptRepair: void 0
	};
	transitionMainSessionRecovery(next, { kind: "clear" });
	clearAllCliSessions(next);
	return next;
}
function loadCommandSessionStore(params) {
	return Object.fromEntries(listSessionEntries({
		storePath: params.storePath,
		...params.agentId ? { agentId: params.agentId } : {},
		...params.clone === false ? { clone: false } : {}
	}).map(({ sessionKey, entry }) => [sessionKey, entry]));
}
/** Builds the synthetic session key used for explicit session-id runs. */
function buildExplicitSessionIdSessionKey(params) {
	return `agent:${normalizeAgentId(params.agentId)}:explicit:${params.sessionId.trim()}`;
}
function collectSessionIdMatchesForRequest(opts) {
	const matches = [];
	const primaryStoreMatches = [];
	const storeByKey = /* @__PURE__ */ new Map();
	const addMatches = (candidateStore, candidateStorePath, options) => {
		for (const [candidateKey, candidateEntry] of Object.entries(candidateStore)) {
			if (candidateEntry?.sessionId !== opts.sessionId) continue;
			matches.push([candidateKey, candidateEntry]);
			if (options?.primary) primaryStoreMatches.push([candidateKey, candidateEntry]);
			storeByKey.set(candidateKey, {
				sessionKey: candidateKey,
				sessionStore: candidateStore,
				storePath: candidateStorePath
			});
		}
	};
	addMatches(opts.sessionStore, opts.storePath, { primary: true });
	if (!opts.searchOtherAgentStores) return {
		matches,
		primaryStoreMatches,
		storeByKey
	};
	for (const agentId of listAgentIds(opts.cfg)) {
		if (agentId === opts.storeAgentId) continue;
		const candidateStorePath = resolveStorePath(opts.cfg.session?.store, { agentId });
		addMatches(loadCommandSessionStore({
			agentId,
			storePath: candidateStorePath,
			...opts.clone === false ? { clone: false } : {}
		}), candidateStorePath);
	}
	return {
		matches,
		primaryStoreMatches,
		storeByKey
	};
}
/**
* Resolve an existing stored session key for a session id from a specific agent store.
* This scopes the lookup to the target store without implicitly converting `agentId`
* into that agent's main session key.
*/
function resolveStoredSessionKeyForSessionId(opts) {
	const sessionId = opts.sessionId.trim();
	const storeAgentId = opts.agentId?.trim() ? normalizeAgentId(opts.agentId) : resolveDefaultAgentId(opts.cfg);
	const storePath = resolveStorePath(opts.cfg.session?.store, { agentId: storeAgentId });
	const sessionStore = loadCommandSessionStore({
		storePath,
		agentId: storeAgentId
	});
	if (!sessionId) return {
		sessionKey: void 0,
		sessionStore,
		storePath
	};
	const selection = resolveSessionIdMatchSelection(Object.entries(sessionStore).filter(([, entry]) => entry?.sessionId === sessionId), sessionId);
	return {
		sessionKey: selection.kind === "selected" ? selection.sessionKey : void 0,
		sessionStore,
		storePath
	};
}
/** Resolves the session key/store targeted by one command request. */
function resolveSessionKeyForRequest(opts) {
	const sessionCfg = opts.cfg.session;
	const scope = sessionCfg?.scope ?? "per-sender";
	const mainKey = normalizeMainKey(sessionCfg?.mainKey);
	const defaultAgentId = normalizeAgentId(resolveDefaultAgentId(opts.cfg));
	const requestedAgentId = opts.agentId?.trim() ? normalizeAgentId(opts.agentId) : void 0;
	const requestedSessionId = opts.sessionId?.trim() || void 0;
	const requestedSessionKey = opts.sessionKey?.trim() || void 0;
	const toSessionKey = !requestedSessionKey && !requestedSessionId && classifySessionKeyShape(opts.to) === "agent" ? opts.to?.trim() : void 0;
	const explicitSessionKey = requestedSessionKey || toSessionKey || (!requestedSessionId ? resolveExplicitAgentSessionKey({
		cfg: opts.cfg,
		agentId: requestedAgentId
	}) : void 0);
	const storeAgentId = explicitSessionKey ? isUnscopedSessionKeySentinel(explicitSessionKey) ? requestedAgentId ?? defaultAgentId : resolveAgentIdFromSessionKey(explicitSessionKey, defaultAgentId) : requestedAgentId ?? defaultAgentId;
	const storePath = resolveStorePath(sessionCfg?.store, { agentId: storeAgentId });
	const sessionStore = loadCommandSessionStore({
		storePath,
		agentId: storeAgentId,
		...(opts.clone === false ? { clone: false } : void 0) ? { clone: false } : {}
	});
	const ctx = opts.to?.trim() ? { From: opts.to } : void 0;
	let sessionKey = (explicitSessionKey ? canonicalizeMainSessionAlias({
		cfg: opts.cfg,
		agentId: storeAgentId,
		sessionKey: explicitSessionKey
	}) : void 0) ?? (ctx ? resolveSessionKey(scope, ctx, mainKey, storeAgentId) : void 0);
	if (requestedSessionId && !explicitSessionKey && (!sessionKey || sessionStore[sessionKey]?.sessionId !== requestedSessionId)) {
		const { matches, primaryStoreMatches, storeByKey } = collectSessionIdMatchesForRequest({
			cfg: opts.cfg,
			sessionStore,
			storePath,
			storeAgentId,
			sessionId: requestedSessionId,
			searchOtherAgentStores: requestedAgentId === void 0,
			...opts.clone === false ? { clone: false } : {}
		});
		const preferredSelection = resolveSessionIdMatchSelection(matches, requestedSessionId);
		const currentStoreSelection = preferredSelection.kind === "selected" ? preferredSelection : resolveSessionIdMatchSelection(primaryStoreMatches, requestedSessionId);
		if (currentStoreSelection.kind === "selected") {
			const preferred = storeByKey.get(currentStoreSelection.sessionKey);
			if (preferred) return preferred;
			sessionKey = currentStoreSelection.sessionKey;
		}
	}
	if (requestedSessionId && !sessionKey) sessionKey = buildExplicitSessionIdSessionKey({
		sessionId: requestedSessionId,
		agentId: opts.agentId
	});
	return {
		sessionKey,
		sessionStore,
		storePath
	};
}
/** Resolves or creates the session used by one agent command request. */
function resolveSession(opts) {
	const sessionCfg = opts.cfg.session;
	const { sessionKey, sessionStore, storePath } = resolveSessionKeyForRequest({
		cfg: opts.cfg,
		to: opts.to,
		sessionId: opts.sessionId,
		sessionKey: opts.sessionKey,
		agentId: opts.agentId,
		...opts.clone === false ? { clone: false } : {}
	});
	const now = Date.now();
	const sessionEntry = sessionKey ? sessionStore[sessionKey] : void 0;
	const sessionAgentId = opts.agentId?.trim() ? normalizeAgentId(opts.agentId) : resolveAgentIdFromSessionKey(sessionKey, resolveDefaultAgentId(opts.cfg));
	const resetPolicy = resolveSessionResetPolicy({
		sessionCfg,
		resetType: resolveSessionResetType({ sessionKey }),
		resetOverride: resolveChannelResetConfig({
			sessionCfg,
			channel: sessionDeliveryChannel(sessionEntry)
		})
	});
	const requestedSessionId = opts.sessionId?.trim() || void 0;
	const terminalMainTranscriptNewerThanRegistry = sessionEntry && !requestedSessionId ? hasTerminalMainSessionTranscriptNewerThanRegistrySync({
		entry: sessionEntry,
		sessionScope: sessionCfg?.scope,
		sessionKey,
		agentId: sessionAgentId,
		mainKey: sessionCfg?.mainKey,
		storePath
	}) : false;
	const lockedModelSelection = isModelSelectionLocked(sessionEntry);
	const skipImplicitExpiry = resetPolicy.configured !== true && hasProviderOwnedSession(sessionEntry);
	const fresh = sessionEntry ? lockedModelSelection || !terminalMainTranscriptNewerThanRegistry && (skipImplicitExpiry || evaluateSessionFreshness({
		updatedAt: sessionEntry.updatedAt,
		...resolveSessionLifecycleTimestamps({
			entry: sessionEntry,
			agentId: sessionAgentId,
			sessionKey,
			storePath
		}),
		now,
		policy: resetPolicy
	}).fresh) : false;
	const sessionId = requestedSessionId || (fresh ? sessionEntry?.sessionId : void 0) || crypto.randomUUID();
	const isNewSession = !fresh && !requestedSessionId;
	const resolvedSessionEntry = isNewSession && sessionEntry ? clearRotatedSessionMetadata(sessionEntry) : sessionEntry;
	clearBootstrapSnapshotOnSessionRollover({
		sessionKey,
		previousSessionId: isNewSession ? sessionEntry?.sessionId : void 0
	});
	const persistedThinking = sessionEntry?.thinkingLevel ? normalizeThinkLevel(sessionEntry.thinkingLevel) : void 0;
	const persistedVerbose = sessionEntry?.verboseLevel ? normalizeVerboseLevel(sessionEntry.verboseLevel) : void 0;
	return {
		sessionId,
		sessionKey,
		sessionEntry: resolvedSessionEntry,
		sessionStore,
		storePath,
		isNewSession,
		previousSessionId: isNewSession ? sessionEntry?.sessionId : void 0,
		persistedThinking,
		persistedVerbose
	};
}
//#endregion
export { resolveStoredSessionKeyForSessionId as a, resolveSessionKeyForRequest as i, clearRotatedSessionMetadata as n, resolveSession as r, buildExplicitSessionIdSessionKey as t };
