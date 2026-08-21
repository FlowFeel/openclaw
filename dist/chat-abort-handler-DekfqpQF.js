import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import "./agent-scope-DyEposw2.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { r as resolveSessionStoreKey } from "./session-store-key-DmGCpash.js";
import { z as validateChatAbortParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { S as loadSessionEntry } from "./session-utils-row-Cby7i9PV.js";
import "./session-utils-DRzriWC1.js";
import { t as abortChatRunById } from "./chat-abort-BvCyxb9W.js";
import { t as abortQueuedChatTurnById } from "./chat-queued-turns-DWyXqGgL.js";
import { n as pendingChatSendDedupeKey } from "./server-shared-C-7Ahu3n.js";
import { t as asWorkerInferenceControl } from "./inference-control-CDvM08Nt.js";
import { A as canRequesterAbortQueuedChatTurnWithoutSessionMatch, D as canRequesterAbortChatRunWithoutSessionMatch, E as canRequesterAbortChatRun, F as writePreRegisteredAgentAbort, I as writePreRegisteredChatAbort, L as normalizeOptionalChatText, N as resolveChatAbortRequester, O as canRequesterAbortPreRegisteredRun, P as resolveStoredGlobalRunAgentId, R as normalizeUnknownChatText, a as persistAbortedPartials, i as ensureChatQueuedTurns, j as readPreRegisteredAgentDedupePayloadForSession, k as canRequesterAbortQueuedChatTurn, n as cancelWorkerInferenceForSession, r as createChatAbortOps, t as abortChatRunsForSessionKeyWithPartials } from "./chat-abort-runtime-yp6tfbBb.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
//#region src/gateway/server-methods/chat-abort-handler.ts
async function handleChatAbortRequestWithLifecycle({ params, respond, context, client }, lifecycle = {}) {
	if (!assertValidParams(params, validateChatAbortParams, "chat.abort", respond)) return;
	const { sessionKey: rawSessionKey, runId, preserveSideRuns } = params;
	const agentIdOverride = normalizeOptionalChatText(params.agentId);
	const abortCfg = context.getRuntimeConfig();
	const defaultAgentId = resolveDefaultAgentId(abortCfg);
	const parsedAbortSessionKey = parseAgentSessionKey(rawSessionKey);
	const abortSessionResolvesGlobal = resolveSessionStoreKey({
		cfg: abortCfg,
		sessionKey: rawSessionKey
	}) === "global";
	const inferredGlobalAgentId = !agentIdOverride && parsedAbortSessionKey && abortSessionResolvesGlobal ? normalizeAgentId(parsedAbortSessionKey.agentId) : void 0;
	const abortAgentId = agentIdOverride ?? inferredGlobalAgentId ?? (abortSessionResolvesGlobal ? defaultAgentId : void 0);
	if (agentIdOverride && parsedAbortSessionKey && normalizeAgentId(parsedAbortSessionKey.agentId) !== normalizeAgentId(agentIdOverride)) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `agentId "${agentIdOverride}" does not match session key "${rawSessionKey}"`));
		return;
	}
	const canonicalAbortSessionKey = abortAgentId && abortSessionResolvesGlobal ? "global" : rawSessionKey;
	const ops = createChatAbortOps(context);
	const requester = resolveChatAbortRequester(client);
	const { entry: abortSessionEntry } = loadSessionEntry(rawSessionKey, abortAgentId ? { agentId: abortAgentId } : void 0);
	const cancelWorkerRun = (sessionId = abortSessionEntry?.sessionId) => requester.isAdmin ? cancelWorkerInferenceForSession({
		context,
		sessionId,
		...runId ? { runId } : {}
	}) : [];
	const respondWithWorkerRuns = (localRunIds, sessionId) => {
		const runIds = [.../* @__PURE__ */ new Set([...localRunIds, ...cancelWorkerRun(sessionId)])];
		respond(true, {
			ok: true,
			aborted: runIds.length > 0,
			runIds
		});
	};
	if (!runId) {
		const res = await abortChatRunsForSessionKeyWithPartials({
			context,
			ops,
			sessionKey: canonicalAbortSessionKey,
			sessionKeyAliases: canonicalAbortSessionKey === rawSessionKey ? void 0 : [rawSessionKey],
			agentId: abortAgentId,
			sessionId: abortSessionEntry?.sessionId,
			defaultAgentId,
			abortOrigin: "rpc",
			stopReason: "rpc",
			requester,
			preserveSideRuns,
			excludeRunIds: lifecycle.excludeRunIds,
			onAuthorizedAfterQueuedAbort: lifecycle.onAuthorizedAfterQueuedAbort
		});
		if (res.unauthorized) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "unauthorized"));
			return;
		}
		respond(true, {
			ok: true,
			aborted: res.aborted,
			runIds: res.runIds
		});
		return;
	}
	const normalizedAgentIdOverride = abortAgentId?.toLowerCase();
	const active = context.chatAbortControllers.get(runId);
	if (!active) {
		const readPendingRunForAbort = (entry) => {
			const canonicalMatch = readPreRegisteredAgentDedupePayloadForSession({
				entry,
				runId,
				sessionKey: canonicalAbortSessionKey,
				agentId: abortAgentId,
				defaultAgentId,
				includeHidden: true
			});
			if (canonicalMatch) return {
				sessionKey: normalizeUnknownChatText(canonicalMatch.sessionKey) ? canonicalAbortSessionKey : void 0,
				payload: canonicalMatch
			};
			if (rawSessionKey === canonicalAbortSessionKey) return;
			const aliasMatch = readPreRegisteredAgentDedupePayloadForSession({
				entry,
				runId,
				sessionKey: rawSessionKey,
				agentId: abortAgentId,
				defaultAgentId,
				includeHidden: true
			});
			return aliasMatch ? {
				sessionKey: normalizeUnknownChatText(aliasMatch.sessionKey) ? rawSessionKey : void 0,
				payload: aliasMatch
			} : void 0;
		};
		const pendingChatMatch = readPendingRunForAbort(context.dedupe.get(pendingChatSendDedupeKey(runId)));
		if (pendingChatMatch) {
			if (!canRequesterAbortPreRegisteredRun(pendingChatMatch.payload, requester)) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "unauthorized"));
				return;
			}
			writePreRegisteredChatAbort({
				context,
				runId,
				stopReason: "rpc",
				attemptId: normalizeUnknownChatText(pendingChatMatch.payload.attemptId)
			});
			respondWithWorkerRuns([runId]);
			return;
		}
		const pendingAgentMatch = readPendingRunForAbort(context.dedupe.get(`agent:${runId}`));
		if (pendingAgentMatch) {
			const pendingAgentPayload = pendingAgentMatch.payload;
			if (!canRequesterAbortPreRegisteredRun(pendingAgentPayload, requester)) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "unauthorized"));
				return;
			}
			writePreRegisteredAgentAbort({
				context,
				runId,
				sessionKey: pendingAgentMatch.sessionKey,
				payload: pendingAgentPayload,
				stopReason: "rpc"
			});
			respondWithWorkerRuns([runId]);
			return;
		}
		const chatQueuedTurns = ensureChatQueuedTurns(context);
		const queued = chatQueuedTurns.get(runId);
		if (queued) {
			if (!(/* @__PURE__ */ new Set([rawSessionKey, canonicalAbortSessionKey])).has(queued.sessionKey) && !canRequesterAbortQueuedChatTurnWithoutSessionMatch(queued, requester)) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "runId does not match sessionKey"));
				return;
			}
			if (normalizedAgentIdOverride && queued.sessionKey === "global" && resolveStoredGlobalRunAgentId(queued.agentId, defaultAgentId) !== normalizedAgentIdOverride) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "runId does not match agentId"));
				return;
			}
			if (!canRequesterAbortQueuedChatTurn(queued, requester)) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "unauthorized"));
				return;
			}
			respondWithWorkerRuns(abortQueuedChatTurnById(chatQueuedTurns, {
				runId,
				sessionKey: queued.sessionKey,
				stopReason: "rpc",
				allowSessionMismatch: true
			}).aborted ? [runId] : []);
			return;
		}
		const workerSessionId = abortSessionEntry?.sessionId;
		if (!workerSessionId || !asWorkerInferenceControl(context.workerEnvironmentService)?.hasInferenceForSession(workerSessionId, runId)) {
			respond(true, {
				ok: true,
				aborted: false,
				runIds: []
			});
			return;
		}
		if (!requester.isAdmin) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "unauthorized"));
			return;
		}
		respondWithWorkerRuns([]);
		return;
	}
	if (!(/* @__PURE__ */ new Set([rawSessionKey, canonicalAbortSessionKey])).has(active.sessionKey) && !canRequesterAbortChatRunWithoutSessionMatch(active, requester)) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "runId does not match sessionKey"));
		return;
	}
	if (normalizedAgentIdOverride && active.sessionKey === "global" && resolveStoredGlobalRunAgentId(active.agentId, defaultAgentId) !== normalizedAgentIdOverride) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "runId does not match agentId"));
		return;
	}
	if (!canRequesterAbortChatRun(active, requester)) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "unauthorized"));
		return;
	}
	const partialText = context.chatRunState.resolveBuffer(runId).text;
	const res = abortChatRunById(ops, {
		runId,
		sessionKey: active.sessionKey,
		stopReason: "rpc"
	});
	if (res.aborted && active.controlUiVisible !== false && partialText && partialText.trim()) await persistAbortedPartials({
		context,
		sessionKey: active.sessionKey,
		snapshots: [{
			runId,
			sessionId: active.sessionId,
			agentId: active.agentId,
			text: partialText,
			abortOrigin: "rpc"
		}]
	});
	respondWithWorkerRuns(res.aborted ? [runId] : [], active.sessionId);
}
async function handleChatAbortRequest(options) {
	await handleChatAbortRequestWithLifecycle(options);
}
//#endregion
export { handleChatAbortRequestWithLifecycle as n, handleChatAbortRequest as t };
