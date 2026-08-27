import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { Ar as validateSessionsReclaimParams, dr as validateSessionsDispatchParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as SessionMutationAuthorizationChangedError } from "./session-sharing-C3cQJ56a.js";
import { s as managedWorktrees } from "./service-Dwy8AYem.js";
import { t as resolveRequestedSessionAgentId } from "./session-request-agent-0PlHUzcN.js";
import { t as projectWorkerSessionPlacement } from "./placement-projector-BxasoToR.js";
import { n as resolveWorkerPlacementSessionRuntime, t as isWorkerPlacementSessionRuntimeSupported } from "./placement-session-runtime-nz_Kc5M8.js";
import { a as loadAccessorSessionEntryForGatewayTarget, i as isWorkerDispatchInputError, l as requireSessionKey } from "./sessions-shared-CHN04gbr.js";
//#region src/gateway/server-methods/sessions-dispatch.ts
function respondInvalidWorkerSession(respond, message) {
	respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, message));
}
function resolveWorkerSessionTarget(params) {
	const cfg = params.context.getRuntimeConfig();
	const requestedAgent = resolveRequestedSessionAgentId(cfg, params.key, params.agentId);
	if (!requestedAgent.ok) {
		params.respond(false, void 0, requestedAgent.error);
		return;
	}
	if (params.profileId !== void 0 && !Object.hasOwn(cfg.cloudWorkers?.profiles ?? {}, params.profileId)) {
		respondInvalidWorkerSession(params.respond, `cloud worker profile is not configured: ${params.profileId}`);
		return;
	}
	const target = loadAccessorSessionEntryForGatewayTarget({
		key: params.key,
		cfg,
		agentId: requestedAgent.agentId
	});
	const entry = target.entry;
	const sessionId = normalizeOptionalString(entry?.sessionId);
	if (!entry || !sessionId) {
		respondInvalidWorkerSession(params.respond, `session not found: ${params.key}`);
		return;
	}
	return {
		cfg,
		target,
		entry,
		sessionId
	};
}
function hasManagedSessionWorktree(params) {
	const worktree = managedWorktrees.findLiveByOwner("session", params.sessionKey);
	if (params.entry.worktree?.id && worktree && worktree.id === params.entry.worktree.id && worktree.ownerId === params.sessionKey) return true;
	const article = params.method === "sessions.dispatch" ? "a" : "the";
	respondInvalidWorkerSession(params.respond, `${params.method} requires ${article} session-owned managed worktree`);
	return false;
}
function respondWorkerPlacement(params) {
	params.respond(true, {
		ok: true,
		key: params.key,
		sessionId: params.sessionId,
		placement: projectWorkerSessionPlacement(params.placement)
	}, void 0);
}
function respondWorkerDispatchError(error, respond) {
	if (error instanceof SessionMutationAuthorizationChangedError) throw error;
	respond(false, void 0, errorShape(isWorkerDispatchInputError(error) ? ErrorCodes.INVALID_REQUEST : ErrorCodes.UNAVAILABLE, formatErrorMessage(error)));
}
const sessionDispatchHandlers = {
	"sessions.dispatch": async ({ params, respond, context, sessionMutationAuthorization }) => {
		if (!assertValidParams(params, validateSessionsDispatchParams, "sessions.dispatch", respond)) return;
		const key = requireSessionKey(params.key, respond);
		if (!key) return;
		const dispatchService = context.workerPlacementDispatchService;
		const placementReader = context.workerSessionPlacementService;
		if (!dispatchService || !placementReader) {
			respondInvalidWorkerSession(respond, "cloud worker dispatch is not configured");
			return;
		}
		const resolved = resolveWorkerSessionTarget({
			key,
			agentId: params.agentId,
			profileId: params.profileId,
			context,
			respond
		});
		if (!resolved) return;
		const { cfg, target, entry, sessionId } = resolved;
		if (entry.archivedAt !== void 0) {
			respondInvalidWorkerSession(respond, "cannot dispatch an archived session");
			return;
		}
		const sessionRuntime = resolveWorkerPlacementSessionRuntime({
			cfg,
			entry,
			agentId: target.target.agentId,
			sessionKey: target.canonicalKey
		});
		if (!isWorkerPlacementSessionRuntimeSupported(sessionRuntime)) {
			respondInvalidWorkerSession(respond, `cloud worker dispatch requires the OpenClaw runtime, not ${sessionRuntime}`);
			return;
		}
		const existingPlacement = placementReader.getMany([sessionId]).get(sessionId);
		if (existingPlacement && existingPlacement.state !== "local" && existingPlacement.state !== "reclaimed") {
			respondInvalidWorkerSession(respond, `session cannot dispatch from placement ${existingPlacement.state}`);
			return;
		}
		if (!hasManagedSessionWorktree({
			entry,
			sessionKey: target.canonicalKey,
			method: "sessions.dispatch",
			respond
		})) return;
		try {
			sessionMutationAuthorization?.assertCurrent();
			const placement = await dispatchService.dispatch({
				sessionId,
				sessionKey: target.canonicalKey,
				agentId: target.target.agentId,
				profileId: params.profileId
			});
			respondWorkerPlacement({
				respond,
				key: target.canonicalKey,
				sessionId,
				placement
			});
		} catch (error) {
			respondWorkerDispatchError(error, respond);
		}
	},
	"sessions.reclaim": async ({ params, respond, context, sessionMutationAuthorization }) => {
		if (!assertValidParams(params, validateSessionsReclaimParams, "sessions.reclaim", respond)) return;
		const key = requireSessionKey(params.key, respond);
		if (!key) return;
		const placementService = context.workerPlacementDispatchService;
		const placementReader = context.workerSessionPlacementService;
		if (!placementService?.reclaim || !placementReader) {
			respondInvalidWorkerSession(respond, "cloud worker stop is not configured");
			return;
		}
		const resolved = resolveWorkerSessionTarget({
			key,
			agentId: params.agentId,
			context,
			respond
		});
		if (!resolved) return;
		const { target, entry, sessionId } = resolved;
		const existingPlacement = placementReader.getMany([sessionId]).get(sessionId);
		if (existingPlacement?.state === "reclaimed") {
			respondWorkerPlacement({
				respond,
				key: target.canonicalKey,
				sessionId,
				placement: existingPlacement
			});
			return;
		}
		if (existingPlacement?.state !== "active") {
			respondInvalidWorkerSession(respond, `session cannot stop cloud worker from placement ${existingPlacement?.state ?? "local"}`);
			return;
		}
		if (!hasManagedSessionWorktree({
			entry,
			sessionKey: target.canonicalKey,
			method: "sessions.reclaim",
			respond
		})) return;
		try {
			sessionMutationAuthorization?.assertCurrent();
			const placement = await placementService.reclaim({
				sessionId,
				sessionKey: target.canonicalKey,
				agentId: target.target.agentId
			});
			respondWorkerPlacement({
				respond,
				key: target.canonicalKey,
				sessionId,
				placement
			});
		} catch (error) {
			respondWorkerDispatchError(error, respond);
		}
	}
};
//#endregion
export { sessionDispatchHandlers };
