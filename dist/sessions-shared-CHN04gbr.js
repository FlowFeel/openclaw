import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { r as resolveAgentMainSessionKey } from "./main-session-Bjm_i_Af.js";
import { n as resolveSessionStoreAgentId, r as resolveSessionStoreKey } from "./session-store-key-DmGCpash.js";
import { r as listConfiguredSessionStoreAgentIds } from "./targets-Dooi6t13.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import "./sessions-CBo4LOdS.js";
import { A as resolveGatewaySessionStoreTargetWithStore, E as resolveCanonicalSessionEntryFromStoreKeys, k as resolveGatewaySessionStoreTarget } from "./session-utils-row-BDvhdN3C.js";
import "./session-utils-C8yYh4dv.js";
import { t as resolvePluginSessionOwnershipError } from "./session-plugin-ownership-Dlx-UDnP.js";
import { n as resolveWorkerPlacementSessionRuntime, t as isWorkerPlacementSessionRuntimeSupported } from "./placement-session-runtime-nz_Kc5M8.js";
//#region src/gateway/server-methods/sessions-shared.ts
const sessionLog = createSubsystemLogger("gateway/sessions");
var SessionWorkerPlacementMutationError = class extends Error {
	constructor(placementState, action, key) {
		super(`Session ${key} cannot ${action} while cloud worker placement is ${placementState}.`);
		this.placementState = placementState;
	}
};
function resolveSessionWorkerPlacementMutationError(params) {
	if (!params.sessionId) return;
	const placement = params.context.workerSessionPlacementService?.getMany([params.sessionId]).get(params.sessionId);
	const failedPlacementCanDelete = params.action === "delete" && placement?.state === "failed" && (placement.environmentId === null || params.context.workerEnvironmentService?.get(placement.environmentId)?.state === "destroyed");
	if (!placement || placement.state === "local" || params.action === "delete" && placement.state === "reclaimed" || failedPlacementCanDelete) return;
	return new SessionWorkerPlacementMutationError(placement.state, params.action, params.key);
}
function respondSessionWorkerPlacementMutationError(error, respond) {
	respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, error.message));
}
function resolveSessionWorkerPlacementPatchError(params) {
	const placement = params.entry?.sessionId ? params.context.workerSessionPlacementService?.getMany([params.entry.sessionId]).get(params.entry.sessionId) : void 0;
	if (!placement || placement.state === "local") return;
	if (params.patch.archived !== void 0) return `Session ${params.key} cannot change archive state while cloud worker placement is ${placement.state}.`;
	if (!params.validateModelRuntime || params.patch.model === void 0 || !params.entry) return;
	const runtime = resolveWorkerPlacementSessionRuntime({
		cfg: params.cfg,
		entry: params.entry,
		agentId: params.agentId,
		sessionKey: params.sessionKey
	});
	if (isWorkerPlacementSessionRuntimeSupported(runtime)) return;
	return `Session ${params.key} cannot select the ${runtime} runtime while cloud worker placement is ${placement.state}.`;
}
function filterSessionStoreToConfiguredAgents(cfg, store) {
	const configuredAgentIds = new Set(listConfiguredSessionStoreAgentIds(cfg));
	const isConfiguredSessionKey = (key) => {
		const normalizedKey = normalizeOptionalString(key);
		if (!normalizedKey) return false;
		const agentId = resolveSessionStoreAgentId(cfg, resolveSessionStoreKey({
			cfg,
			sessionKey: normalizedKey
		}));
		return configuredAgentIds.has(normalizeAgentId(agentId));
	};
	return Object.fromEntries(Object.entries(store).filter(([key, entry]) => {
		if (key === "global" || key === "unknown") return true;
		if (isConfiguredSessionKey(key)) return true;
		return isConfiguredSessionKey(entry?.spawnedBy) || isConfiguredSessionKey(entry?.parentSessionKey);
	}));
}
const loadSessionsRuntimeModule = createLazyRuntimeModule(() => import("./sessions.runtime.js"));
function requireSessionKey(key, respond) {
	const normalized = normalizeOptionalString(typeof key === "string" ? key : typeof key === "number" ? String(key) : typeof key === "bigint" ? String(key) : "") ?? "";
	if (!normalized) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "key required"));
		return null;
	}
	return normalized;
}
function rejectPluginRuntimeSessionOwnershipMismatch(params) {
	const error = resolvePluginSessionOwnershipError({
		action: params.action,
		entry: params.entry,
		key: params.key,
		pluginOwnerId: params.client?.internal?.pluginRuntimeOwnerId
	});
	if (!error) return false;
	params.respond(false, void 0, error);
	return true;
}
function resolveGatewaySessionTargetFromKey(key, cfg, opts) {
	const target = resolveGatewaySessionStoreTarget({
		cfg,
		key,
		...opts?.agentId ? { agentId: opts.agentId } : {}
	});
	return {
		cfg,
		target,
		storePath: target.storePath
	};
}
function loadAccessorSessionEntryForGatewayTarget(params) {
	const target = resolveGatewaySessionStoreTargetWithStore({
		cfg: params.cfg,
		key: params.key,
		clone: false,
		...params.agentId ? { agentId: params.agentId } : {}
	});
	let best;
	for (const sessionStoreKey of target.storeKeys) {
		const entry = target.store[sessionStoreKey];
		if (entry) {
			if (!best || (entry.updatedAt ?? 0) > (best.entry.updatedAt ?? 0)) best = {
				entry,
				sessionStoreKey
			};
		}
	}
	if (best) return {
		target,
		storePath: target.storePath,
		entry: best.entry,
		canonicalKey: target.canonicalKey,
		sessionStoreKey: best.sessionStoreKey
	};
	return {
		target,
		storePath: target.storePath,
		entry: void 0,
		canonicalKey: target.canonicalKey,
		sessionStoreKey: target.canonicalKey
	};
}
function loadSessionEntriesForTarget(params) {
	const target = resolveGatewaySessionStoreTargetWithStore({
		cfg: params.cfg,
		key: params.key,
		clone: false,
		...params.agentId ? { agentId: params.agentId } : {}
	});
	const store = target.store;
	const entry = resolveCanonicalSessionEntryFromStoreKeys(store, target.storeKeys);
	return {
		target,
		storePath: target.storePath,
		store,
		entry
	};
}
function emitSessionOperation(context, payload) {
	const connIds = context.getSessionEventSubscriberConnIds();
	if (connIds.size === 0) return;
	context.broadcastToConnIds("session.operation", {
		...payload,
		ts: Date.now()
	}, connIds, { dropIfSlow: true });
}
function isWorkerDispatchInputError(error) {
	if (typeof error !== "object" || error === null || !("code" in error)) return false;
	const code = error.code;
	return code === "invalid_profile" || code === "profile_not_found" || code === "invalid_state";
}
function isAgentMainSessionKey(cfg, sessionKey) {
	const parsed = parseAgentSessionKey(sessionKey);
	if (!parsed) return false;
	return sessionKey === resolveAgentMainSessionKey({
		cfg,
		agentId: parsed.agentId
	});
}
//#endregion
export { loadAccessorSessionEntryForGatewayTarget as a, rejectPluginRuntimeSessionOwnershipMismatch as c, resolveSessionWorkerPlacementMutationError as d, resolveSessionWorkerPlacementPatchError as f, isWorkerDispatchInputError as i, requireSessionKey as l, sessionLog as m, filterSessionStoreToConfiguredAgents as n, loadSessionEntriesForTarget as o, respondSessionWorkerPlacementMutationError as p, isAgentMainSessionKey as r, loadSessionsRuntimeModule as s, emitSessionOperation as t, resolveGatewaySessionTargetFromKey as u };
