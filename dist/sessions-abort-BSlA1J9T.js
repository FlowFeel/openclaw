import { c as normalizeOptionalString, p as readStringValue } from "./string-coerce-DW4mBlAt.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import "./agent-scope-DyEposw2.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as resolveStoredSessionOwnerAgentId, i as resolveStoredSessionKeyForAgentStore, n as resolveSessionStoreAgentId, r as resolveSessionStoreKey } from "./session-store-key-DmGCpash.js";
import { c as resolveExistingAgentSessionStoreTargetsSync, t as isConfiguredSessionStoreAgentId } from "./targets-Dooi6t13.js";
import { Gn as validateSessionsAbortParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { n as abortEmbeddedAgentRun } from "./runs-Bw__iUSb.js";
import "./sessions-CBo4LOdS.js";
import { S as loadSessionEntry } from "./session-utils-row-BDvhdN3C.js";
import "./session-utils-C8yYh4dv.js";
import { t as clearSessionQueues } from "./cleanup-BVUOa8It.js";
import { t as asWorkerInferenceControl } from "./inference-control-CDvM08Nt.js";
import { t as setGatewayDedupeEntry } from "./agent-job-CpqqlG4n.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { n as handleChatAbortRequestWithLifecycle } from "./chat-abort-handler-DNFQf_fD.js";
import { t as emitSessionsChanged } from "./session-change-event-B3NeuBYI.js";
import { n as resolveSessionKeyForRun } from "./server-session-key-uQ1KtR4V.js";
import { t as resolveRequestedSessionAgentId } from "./session-request-agent-0PlHUzcN.js";
import { l as requireSessionKey } from "./sessions-shared-Bp8CoLGN.js";
import { t as resolveWorkerSessionTarget } from "./session-target-CA24rHje.js";
//#region src/gateway/server-methods/sessions-abort.ts
function resolveAbortSessionKey(params) {
	if (params.activeRunSessionKey) return params.activeRunSessionKey;
	const candidates = [
		params.canonicalKey,
		params.requestedKey,
		...params.aliasKeys ?? []
	];
	for (const active of params.context.chatAbortControllers.values()) {
		if (active.controlUiVisible === false) continue;
		for (const candidate of candidates) if (active.sessionKey === candidate) return candidate;
	}
	return params.requestedKey;
}
function resolveSessionKeyAgentId(sessionKey, cfg) {
	const key = normalizeOptionalString(sessionKey);
	if (!key) return;
	if (!parseAgentSessionKey(key) && key.toLowerCase().startsWith("agent:")) return;
	return resolveSessionStoreAgentId(cfg, resolveSessionStoreKey({
		cfg,
		sessionKey: key
	}));
}
function sessionKeyBelongsToAgent(sessionKey, agentId, cfg) {
	const key = normalizeOptionalString(sessionKey);
	if (cfg.session?.scope === "global" && key?.toLowerCase() === "global") return true;
	const sessionAgentId = resolveSessionKeyAgentId(sessionKey, cfg);
	return Boolean(sessionAgentId && sessionAgentId === normalizeAgentId(agentId));
}
function resolveScopedAbortKey(params) {
	const key = normalizeOptionalString(params.key);
	if (!key) return;
	const requestedAgentId = normalizeOptionalString(params.agentId);
	if (!requestedAgentId) return key;
	const scopedAgentId = normalizeAgentId(requestedAgentId);
	const ownerAgentId = resolveStoredSessionOwnerAgentId({
		cfg: params.cfg,
		agentId: scopedAgentId,
		sessionKey: key
	});
	if (ownerAgentId && ownerAgentId !== scopedAgentId) return;
	return resolveStoredSessionKeyForAgentStore({
		cfg: params.cfg,
		agentId: scopedAgentId,
		sessionKey: key
	});
}
const sessionAbortHandlers = { "sessions.abort": async ({ req, params, respond, context, client, isWebchatConnect }) => {
	if (!assertValidParams(params, validateSessionsAbortParams, "sessions.abort", respond)) return;
	const p = params;
	const cfg = context.getRuntimeConfig();
	const requestedRunId = readStringValue(p.runId);
	const requestedKey = normalizeOptionalString(p.key);
	const requestedParamAgentId = normalizeOptionalString(p.agentId);
	const clearQueued = p.clearQueued === true;
	const workerRunSessionId = requestedRunId ? asWorkerInferenceControl(context.workerEnvironmentService)?.resolveInferenceSessionForRunId(requestedRunId) : void 0;
	const workerRunTarget = workerRunSessionId ? resolveWorkerSessionTarget(cfg, workerRunSessionId) : void 0;
	const scopedRequestedKey = resolveScopedAbortKey({
		cfg,
		key: requestedKey,
		agentId: requestedParamAgentId
	});
	if (requestedKey && requestedParamAgentId && !scopedRequestedKey) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "session key agent does not match agentId"));
		return;
	}
	const requestedKeyAgentId = scopedRequestedKey ? resolveSessionKeyAgentId(scopedRequestedKey, cfg) : void 0;
	const activeRun = requestedRunId ? context.chatAbortControllers.get(requestedRunId) : void 0;
	const activeRunSessionKey = activeRun?.sessionKey;
	const activeRunAgentId = normalizeOptionalString(activeRun?.agentId);
	const inferredRunAgentId = requestedParamAgentId ?? (requestedRunId && scopedRequestedKey?.toLowerCase() === "global" ? activeRunAgentId : void 0) ?? requestedKeyAgentId ?? workerRunTarget?.agentId ?? (requestedRunId && !activeRunSessionKey ? resolveDefaultAgentId(cfg) : void 0);
	const requestedRunAgentId = requestedRunId ? inferredRunAgentId ? normalizeAgentId(inferredRunAgentId) : void 0 : void 0;
	const scopedActiveRunSessionKey = activeRunSessionKey ? requestedRunAgentId ? sessionKeyBelongsToAgent(activeRunSessionKey, requestedRunAgentId, cfg) ? activeRunSessionKey : void 0 : activeRunSessionKey : void 0;
	const keyCandidate = scopedRequestedKey ?? scopedActiveRunSessionKey ?? (requestedRunId ? resolveSessionKeyForRun(requestedRunId, { agentId: requestedRunAgentId ?? resolveDefaultAgentId(cfg) }) : void 0) ?? workerRunTarget?.sessionKey;
	if (!keyCandidate && requestedRunId) {
		respond(true, {
			ok: true,
			abortedRunId: null,
			status: "no-active-run"
		});
		return;
	}
	const key = requireSessionKey(keyCandidate, respond);
	if (!key) return;
	const requestedGlobalAgent = resolveRequestedSessionAgentId(cfg, key, requestedParamAgentId ?? requestedRunAgentId);
	if (!requestedGlobalAgent.ok) {
		respond(false, void 0, requestedGlobalAgent.error);
		return;
	}
	const requestedGlobalAgentId = requestedGlobalAgent.agentId;
	const targetAgentId = requestedGlobalAgentId ?? resolveSessionStoreAgentId(cfg, resolveSessionStoreKey({
		cfg,
		sessionKey: key
	}));
	const configuredTarget = isConfiguredSessionStoreAgentId(cfg, targetAgentId);
	const existingTargets = configuredTarget ? [] : resolveExistingAgentSessionStoreTargetsSync(cfg, targetAgentId);
	const hasExactActiveRun = requestedRunId ? scopedActiveRunSessionKey === key : [...context.chatAbortControllers.values()].some((entry) => entry.controlUiVisible !== false && entry.sessionKey === key);
	if (!configuredTarget && existingTargets.length === 0 && !hasExactActiveRun) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `agent "${targetAgentId}" not found`));
		return;
	}
	const loadedSession = configuredTarget || existingTargets.length > 0 ? loadSessionEntry(key, { agentId: requestedGlobalAgentId }) : void 0;
	const canonicalKey = loadedSession?.canonicalKey ?? resolveSessionStoreKey({
		cfg,
		sessionKey: key,
		...requestedGlobalAgentId ? { storeAgentId: requestedGlobalAgentId } : {}
	});
	const sessionEntry = loadedSession?.entry;
	const requestedKeyAliases = requestedKey && requestedKey !== key && (!requestedParamAgentId || sessionKeyBelongsToAgent(requestedKey, requestedParamAgentId, cfg)) ? [requestedKey] : void 0;
	const resolvedAbortSessionKey = resolveAbortSessionKey({
		context,
		requestedKey: key,
		canonicalKey,
		activeRunSessionKey: scopedActiveRunSessionKey,
		aliasKeys: requestedKeyAliases
	});
	const abortSessionKey = canonicalKey === "global" && requestedGlobalAgentId ? "global" : resolvedAbortSessionKey;
	const abortAgentId = abortSessionKey === "global" ? requestedGlobalAgentId ?? activeRunAgentId : void 0;
	const preAbortRunKinds = /* @__PURE__ */ new Map();
	if (requestedRunId) preAbortRunKinds.set(requestedRunId, activeRun?.kind);
	else for (const [rid, entry] of context.chatAbortControllers) preAbortRunKinds.set(rid, entry.kind);
	let abortedRunId = null;
	let aborted = false;
	let chatAbortSucceeded = false;
	let responseMeta;
	const persistedSessionId = sessionEntry?.sessionId;
	const onAuthorizedAfterQueuedAbort = !requestedRunId && canonicalKey !== "global" && (clearQueued || persistedSessionId) ? () => {
		let queueCleared = false;
		if (clearQueued) {
			const cleared = clearSessionQueues([
				key,
				...requestedKeyAliases ?? [],
				canonicalKey,
				...persistedSessionId ? [persistedSessionId] : []
			]);
			queueCleared = cleared.followupCleared > 0 || cleared.laneCleared > 0;
		}
		return (persistedSessionId ? abortEmbeddedAgentRun(persistedSessionId) : false) || queueCleared;
	} : void 0;
	await handleChatAbortRequestWithLifecycle({
		req,
		params: {
			sessionKey: abortSessionKey,
			runId: requestedRunId,
			...abortAgentId ? { agentId: abortAgentId } : {}
		},
		respond: (ok, payload, error, meta) => {
			if (!ok) {
				respond(ok, payload, error, meta);
				return;
			}
			chatAbortSucceeded = true;
			responseMeta = meta;
			const firstAbortedRunId = (payload && typeof payload === "object" && Array.isArray(payload.runIds) ? payload.runIds.filter((value) => Boolean(normalizeOptionalString(value))) : [])[0] ?? null;
			abortedRunId = firstAbortedRunId;
			aborted = firstAbortedRunId !== null || payload !== null && typeof payload === "object" && payload.aborted === true;
			if (firstAbortedRunId && !Boolean(workerRunSessionId && !activeRun)) {
				const endedAt = Date.now();
				const dedupePrefix = preAbortRunKinds.get(firstAbortedRunId) === "agent" ? "agent" : "chat";
				setGatewayDedupeEntry({
					dedupe: context.dedupe,
					key: `${dedupePrefix}:${firstAbortedRunId}`,
					entry: {
						ts: endedAt,
						ok: true,
						payload: {
							status: "timeout",
							runId: firstAbortedRunId,
							...abortAgentId ? { agentId: abortAgentId } : {},
							stopReason: "rpc",
							endedAt
						}
					}
				});
			}
		},
		context,
		client,
		isWebchatConnect
	}, onAuthorizedAfterQueuedAbort ? { onAuthorizedAfterQueuedAbort } : {});
	if (!chatAbortSucceeded) return;
	respond(true, {
		ok: true,
		abortedRunId,
		status: aborted ? "aborted" : "no-active-run"
	}, void 0, responseMeta);
	if (aborted) emitSessionsChanged(context, {
		sessionKey: canonicalKey,
		...canonicalKey === "global" && abortAgentId ? { agentId: abortAgentId } : {},
		reason: "abort"
	});
} };
//#endregion
export { sessionAbortHandlers as n, resolveAbortSessionKey as t };
