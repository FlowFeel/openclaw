import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { _t as interruptSessionWorkAdmissions, lt as SESSION_WORK_ADMISSION_DRAIN_TIMEOUT_MS, xt as runExclusiveSessionLifecycleMutation } from "./session-entry-slot-keys-DR5d2mKt.js";
import { er as validateSessionsCompactionBranchParams, rr as validateSessionsCompactionRestoreParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import "./sessions-CBo4LOdS.js";
import { t as SESSION_LIFECYCLE_CHANGED_ERROR_REASON } from "./lifecycle-CeMojaXs.js";
import { t as clearSessionQueues } from "./cleanup-BVUOa8It.js";
import { n as getSessionCompactionCheckpoint, t as createFileBackedCompactionCheckpointStore } from "./session-compaction-checkpoints-RZwlLjEx.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as emitSessionsChanged } from "./session-change-event-B3NeuBYI.js";
import { t as resolveRequestedSessionAgentId } from "./session-request-agent-0PlHUzcN.js";
import { a as loadAccessorSessionEntryForGatewayTarget, d as resolveSessionWorkerPlacementMutationError, l as requireSessionKey, p as respondSessionWorkerPlacementMutationError } from "./sessions-shared-Bp8CoLGN.js";
import { t as buildDashboardSessionKey } from "./session-create-service-aL32duv_.js";
import { t as interruptSessionRunIfActive } from "./sessions-messaging--5l7uzmU.js";
//#region src/gateway/server-methods/sessions-compaction-checkpoints.ts
const compactionCheckpointStore = createFileBackedCompactionCheckpointStore();
const MODEL_SELECTION_LOCKED_CHECKPOINT_MESSAGE = "Checkpoint branch and restore are unavailable while model selection is locked.";
const sessionCheckpointHandlers = {
	"sessions.compaction.branch": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateSessionsCompactionBranchParams, "sessions.compaction.branch", respond)) return;
		const p = params;
		const key = requireSessionKey(p.key, respond);
		if (!key) return;
		const checkpointId = typeof p.checkpointId === "string" && p.checkpointId.trim() ? p.checkpointId.trim() : "";
		if (!checkpointId) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "checkpointId required"));
			return;
		}
		const cfg = context.getRuntimeConfig();
		const requestedAgent = resolveRequestedSessionAgentId(cfg, key, p.agentId);
		if (!requestedAgent.ok) {
			respond(false, void 0, requestedAgent.error);
			return;
		}
		const { entry, canonicalKey, sessionStoreKey, target, storePath } = loadAccessorSessionEntryForGatewayTarget({
			key,
			cfg,
			agentId: requestedAgent.agentId
		});
		if (!entry?.sessionId) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `session not found: ${key}`));
			return;
		}
		if (!getSessionCompactionCheckpoint({
			entry,
			checkpointId
		})) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `checkpoint not found: ${checkpointId}`));
			return;
		}
		const nextKey = buildDashboardSessionKey(target.agentId);
		const branchedSession = await compactionCheckpointStore.branchCheckpointSession({
			agentId: target.agentId,
			storePath,
			sourceKey: canonicalKey,
			sourceStoreKey: sessionStoreKey,
			nextKey,
			checkpointId
		});
		if (branchedSession.status === "missing-checkpoint" || branchedSession.status === "missing-boundary") {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `checkpoint not found: ${checkpointId}`));
			return;
		}
		if (branchedSession.status === "missing-session") {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `session not found: ${key}`));
			return;
		}
		if (branchedSession.status === "model-selection-locked") {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, MODEL_SELECTION_LOCKED_CHECKPOINT_MESSAGE));
			return;
		}
		if (branchedSession.status === "failed") {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "failed to create checkpoint branch transcript"));
			return;
		}
		respond(true, {
			ok: true,
			sourceKey: canonicalKey,
			key: branchedSession.key,
			sessionId: branchedSession.entry.sessionId,
			checkpoint: branchedSession.checkpoint,
			entry: branchedSession.entry
		}, void 0);
		emitSessionsChanged(context, {
			sessionKey: canonicalKey,
			...canonicalKey === "global" && requestedAgent.agentId ? { agentId: requestedAgent.agentId } : {},
			reason: "checkpoint-branch"
		});
		emitSessionsChanged(context, {
			sessionKey: branchedSession.key,
			reason: "checkpoint-branch"
		});
	},
	"sessions.compaction.restore": async ({ req, params, respond, context, client, isWebchatConnect }) => {
		if (!assertValidParams(params, validateSessionsCompactionRestoreParams, "sessions.compaction.restore", respond)) return;
		const p = params;
		const key = requireSessionKey(p.key, respond);
		if (!key) return;
		const checkpointId = typeof p.checkpointId === "string" && p.checkpointId.trim() ? p.checkpointId.trim() : "";
		if (!checkpointId) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "checkpointId required"));
			return;
		}
		const cfg = context.getRuntimeConfig();
		const requestedAgent = resolveRequestedSessionAgentId(cfg, key, p.agentId);
		if (!requestedAgent.ok) {
			respond(false, void 0, requestedAgent.error);
			return;
		}
		const { entry, canonicalKey, sessionStoreKey, storePath } = loadAccessorSessionEntryForGatewayTarget({
			key,
			cfg,
			agentId: requestedAgent.agentId
		});
		if (!entry?.sessionId) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `session not found: ${key}`));
			return;
		}
		if (!getSessionCompactionCheckpoint({
			entry,
			checkpointId
		})) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `checkpoint not found: ${checkpointId}`));
			return;
		}
		const initialPlacementError = resolveSessionWorkerPlacementMutationError({
			action: "restore",
			context,
			key,
			sessionId: entry.sessionId
		});
		if (initialPlacementError) {
			respondSessionWorkerPlacementMutationError(initialPlacementError, respond);
			return;
		}
		const lifecycleIdentities = [
			key,
			canonicalKey,
			sessionStoreKey,
			entry.sessionId,
			entry.lifecycleRevision
		];
		const restoreLockIdentities = [entry.sessionId, entry.lifecycleRevision];
		let admittedWorkReleased = true;
		let restoreTargetStillCurrent = true;
		let restoreBlockedByModelLock = false;
		let restorePlacementError;
		await runExclusiveSessionLifecycleMutation({
			scope: storePath,
			identities: restoreLockIdentities,
			prepare: async () => {
				const current = loadAccessorSessionEntryForGatewayTarget({
					key,
					cfg,
					agentId: requestedAgent.agentId
				});
				const currentCheckpoint = current.entry ? getSessionCompactionCheckpoint({
					entry: current.entry,
					checkpointId
				}) : void 0;
				restoreTargetStillCurrent = current.entry?.sessionId === entry.sessionId && current.entry.lifecycleRevision === entry.lifecycleRevision && currentCheckpoint !== void 0;
				if (!restoreTargetStillCurrent) return;
				restoreBlockedByModelLock = current.entry?.modelSelectionLocked === true;
				if (restoreBlockedByModelLock) return;
				restorePlacementError = resolveSessionWorkerPlacementMutationError({
					action: "restore",
					context,
					key,
					sessionId: current.entry?.sessionId
				});
				if (restorePlacementError) return;
				clearSessionQueues([
					key,
					current.canonicalKey,
					current.sessionStoreKey,
					current.entry?.sessionId
				]);
				admittedWorkReleased = await interruptSessionWorkAdmissions({
					scope: storePath,
					identities: lifecycleIdentities,
					timeoutMs: SESSION_WORK_ADMISSION_DRAIN_TIMEOUT_MS
				});
			},
			run: async () => {
				if (!restoreTargetStillCurrent) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `Session ${key} changed before checkpoint restore. Retry.`, { details: { reason: SESSION_LIFECYCLE_CHANGED_ERROR_REASON } }));
					return;
				}
				if (restoreBlockedByModelLock) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, MODEL_SELECTION_LOCKED_CHECKPOINT_MESSAGE));
					return;
				}
				if (restorePlacementError) {
					respondSessionWorkerPlacementMutationError(restorePlacementError, respond);
					return;
				}
				if (!admittedWorkReleased) {
					respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `Session ${key} is still active; try again.`));
					return;
				}
				const current = loadAccessorSessionEntryForGatewayTarget({
					key,
					cfg,
					agentId: requestedAgent.agentId
				});
				if (!current.entry?.sessionId) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `session not found: ${key}`));
					return;
				}
				if (current.entry.modelSelectionLocked === true) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, MODEL_SELECTION_LOCKED_CHECKPOINT_MESSAGE));
					return;
				}
				if (!getSessionCompactionCheckpoint({
					entry: current.entry,
					checkpointId
				})) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `checkpoint not found: ${checkpointId}`));
					return;
				}
				const interruptResult = await interruptSessionRunIfActive({
					req,
					context,
					client,
					isWebchatConnect,
					requestedKey: key,
					canonicalKey: current.canonicalKey,
					agentId: requestedAgent.agentId,
					sessionId: current.entry.sessionId
				});
				if (interruptResult.error) {
					respond(false, void 0, interruptResult.error);
					return;
				}
				const restoredSession = await compactionCheckpointStore.restoreCheckpointSession({
					agentId: requestedAgent.agentId,
					storePath,
					sessionKey: current.canonicalKey,
					sessionStoreKey: current.sessionStoreKey,
					checkpointId
				});
				if (restoredSession.status === "missing-checkpoint" || restoredSession.status === "missing-boundary") {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `checkpoint not found: ${checkpointId}`));
					return;
				}
				if (restoredSession.status === "missing-session") {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `session not found: ${key}`));
					return;
				}
				if (restoredSession.status === "model-selection-locked") {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, MODEL_SELECTION_LOCKED_CHECKPOINT_MESSAGE));
					return;
				}
				if (restoredSession.status === "failed") {
					respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "failed to restore checkpoint transcript"));
					return;
				}
				respond(true, {
					ok: true,
					key: restoredSession.key,
					sessionId: restoredSession.entry.sessionId,
					checkpoint: restoredSession.checkpoint,
					entry: restoredSession.entry
				}, void 0);
				emitSessionsChanged(context, {
					sessionKey: current.canonicalKey,
					...current.canonicalKey === "global" && requestedAgent.agentId ? { agentId: requestedAgent.agentId } : {},
					reason: "checkpoint-restore"
				});
			}
		});
	}
};
//#endregion
export { sessionCheckpointHandlers };
