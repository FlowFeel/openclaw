import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { t as isIncognitoSessionKey } from "./incognito-session-key-BwpD1Lwd.js";
import "./agent-scope-DyEposw2.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as resolveMainSessionKey } from "./main-session-Bjm_i_Af.js";
import { n as resolveSessionStoreAgentId } from "./session-store-key-DmGCpash.js";
import { G as rollbackSqlitePluginOwnedSessionEntryLifecycle, H as deleteSqliteSessionEntryLifecycle } from "./session-accessor.sqlite-CtCo5VZ6.js";
import { _t as interruptSessionWorkAdmissions, h as isAgentHarnessSessionKey, lt as SESSION_WORK_ADMISSION_DRAIN_TIMEOUT_MS, xt as runExclusiveSessionLifecycleMutation } from "./session-entry-slot-keys-DPRQmSpa.js";
import "./session-accessor-D5Or7WgI.js";
import { cr as validateSessionsDeleteParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { a as handleSessionStateSessionDeleted } from "./session-state-events-COmXZrBv.js";
import "./sessions-BqBqRT1f.js";
import { t as SESSION_LIFECYCLE_CHANGED_ERROR_REASON } from "./lifecycle-Dw-f5gZg.js";
import { S as loadSessionEntry } from "./session-utils-row-Br8x7LNG.js";
import "./session-utils-P5pxtsqu.js";
import { a as isModelSelectionLocked } from "./model-overrides-BT6Lelev.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as chatHandlers } from "./chat-Bz6gypcV.js";
import { t as emitSessionsChanged } from "./session-change-event-CX3Vh0EN.js";
import { s as managedWorktrees } from "./service-BBNHKAQG.js";
import { t as resolveRequestedSessionAgentId } from "./session-request-agent-0PlHUzcN.js";
import { a as loadAccessorSessionEntryForGatewayTarget, c as rejectPluginRuntimeSessionOwnershipMismatch, d as resolveSessionWorkerPlacementMutationError, l as requireSessionKey, m as sessionLog, p as respondSessionWorkerPlacementMutationError, s as loadSessionsRuntimeModule, u as resolveGatewaySessionTargetFromKey } from "./sessions-shared-gU-TXhNf.js";
//#region src/gateway/server-methods/sessions-delete.ts
const sessionDeleteHandlers = { "sessions.delete": async ({ req, params, respond, client, isWebchatConnect, context, sessionMutationAuthorization }) => {
	if (!assertValidParams(params, validateSessionsDeleteParams, "sessions.delete", respond)) return;
	const p = params;
	const key = requireSessionKey(p.key, respond);
	if (!key) return;
	const cfg = context.getRuntimeConfig();
	const requestedAgent = resolveRequestedSessionAgentId(cfg, key, p.agentId);
	if (!requestedAgent.ok) {
		respond(false, void 0, requestedAgent.error);
		return;
	}
	const requestedAgentId = requestedAgent.agentId;
	const { target, storePath } = resolveGatewaySessionTargetFromKey(key, cfg, { agentId: requestedAgentId });
	const mainKey = resolveMainSessionKey(cfg);
	const isSelectedNonDefaultGlobal = target.canonicalKey === "global" && requestedAgentId !== void 0 && requestedAgentId !== resolveDefaultAgentId(cfg);
	if (target.canonicalKey === mainKey && !isSelectedNonDefaultGlobal) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `Cannot delete the main session (${mainKey}).`));
		return;
	}
	const deleteTranscript = typeof p.deleteTranscript === "boolean" ? p.deleteTranscript : true;
	const { cleanupSessionBeforeMutation, emitGatewaySessionEndPluginHook, emitSessionUnboundLifecycleEvent } = await loadSessionsRuntimeModule();
	const initialDeleteEntry = loadSessionEntry(key, { agentId: requestedAgentId }).entry;
	const rejectModelSelectionLockedDelete = (entry, sessionKey) => {
		if (!isModelSelectionLocked(entry)) return false;
		if (normalizeOptionalString(entry?.pluginOwnerId) !== void 0 && entry?.agentHarnessId === void 0 && !isAgentHarnessSessionKey(sessionKey)) return false;
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "This session cannot be deleted while model selection is locked."));
		return true;
	};
	if (rejectModelSelectionLockedDelete(initialDeleteEntry, target.canonicalKey)) return;
	if (p.archivedOnly === true && initialDeleteEntry?.archivedAt === void 0) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `Session ${key} is not archived. Archive it first, then delete it.`));
		return;
	}
	const expectedSessionId = p.expectedSessionId?.trim();
	const expectedLifecycleRevision = p.expectedLifecycleRevision?.trim();
	const expectedSessionUpdatedAt = p.expectedSessionUpdatedAt;
	const expectedLifecycleRevisionMatches = (entry) => !expectedLifecycleRevision || entry?.lifecycleRevision === expectedLifecycleRevision;
	const expectedSessionIdMatches = (entry) => {
		if (!expectedSessionId || entry?.sessionId === expectedSessionId) return true;
		return false;
	};
	const respondSessionChanged = () => {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `Session ${key} changed before deletion. Retry.`, { details: { reason: SESSION_LIFECYCLE_CHANGED_ERROR_REASON } }));
	};
	const rejectExpectedSessionMismatch = (entry) => {
		const updatedAtMatches = expectedSessionUpdatedAt === void 0 || entry?.updatedAt === expectedSessionUpdatedAt;
		if (expectedLifecycleRevisionMatches(entry) && expectedSessionIdMatches(entry) && updatedAtMatches) return false;
		respondSessionChanged();
		return true;
	};
	if (rejectExpectedSessionMismatch(initialDeleteEntry)) return;
	const initialPlacementError = resolveSessionWorkerPlacementMutationError({
		action: "delete",
		context,
		key,
		sessionId: normalizeOptionalString(initialDeleteEntry?.sessionId)
	});
	if (initialPlacementError) {
		respondSessionWorkerPlacementMutationError(initialPlacementError, respond);
		return;
	}
	if (rejectPluginRuntimeSessionOwnershipMismatch({
		action: "delete",
		client,
		key: target.canonicalKey ?? key,
		entry: initialDeleteEntry,
		respond
	})) return;
	let abortResult;
	const abortSessionKey = target.canonicalKey ?? key;
	const chatAbort = chatHandlers["chat.abort"];
	if (!chatAbort) throw new Error("chat.abort handler is not registered");
	sessionMutationAuthorization?.assertCurrent();
	await chatAbort({
		req,
		params: {
			sessionKey: abortSessionKey,
			...requestedAgentId ? { agentId: requestedAgentId } : {}
		},
		respond: (ok, _payload, error) => {
			abortResult = {
				ok,
				...error ? { error } : {}
			};
		},
		context,
		client,
		isWebchatConnect,
		...sessionMutationAuthorization ? { sessionMutationAuthorization } : {}
	});
	if (abortResult?.ok === false) {
		respond(false, void 0, abortResult.error);
		return;
	}
	const deleteLifecycleIdentities = [
		target.canonicalKey,
		key,
		initialDeleteEntry?.sessionId,
		expectedSessionId
	];
	let admittedWorkReleased = true;
	let expectedSessionStillCurrent = true;
	let deleteBlockedByModelLock = false;
	let deleteBlockedByWorkerPlacement = false;
	const deletion = await runExclusiveSessionLifecycleMutation({
		scope: storePath,
		identities: deleteLifecycleIdentities,
		prepare: async () => {
			sessionMutationAuthorization?.assertCurrent();
			const preparedEntry = loadSessionEntry(key, { agentId: requestedAgentId }).entry;
			deleteBlockedByModelLock = rejectModelSelectionLockedDelete(preparedEntry, target.canonicalKey);
			if (deleteBlockedByModelLock) return;
			expectedSessionStillCurrent = !rejectExpectedSessionMismatch(preparedEntry);
			if (!expectedSessionStillCurrent) return;
			const placementError = resolveSessionWorkerPlacementMutationError({
				action: "delete",
				context,
				key,
				sessionId: normalizeOptionalString(preparedEntry?.sessionId)
			});
			if (placementError) {
				deleteBlockedByWorkerPlacement = true;
				respondSessionWorkerPlacementMutationError(placementError, respond);
				return;
			}
			admittedWorkReleased = await interruptSessionWorkAdmissions({
				scope: storePath,
				identities: deleteLifecycleIdentities,
				timeoutMs: SESSION_WORK_ADMISSION_DRAIN_TIMEOUT_MS
			});
		},
		run: async () => {
			if (deleteBlockedByModelLock || deleteBlockedByWorkerPlacement || !expectedSessionStillCurrent) return;
			if (!admittedWorkReleased) {
				respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `Session ${key} is still active; try again.`));
				return;
			}
			sessionMutationAuthorization?.assertCurrent();
			const { entry, legacyKey, canonicalKey } = loadSessionEntry(key, { agentId: requestedAgentId });
			if (rejectModelSelectionLockedDelete(entry, canonicalKey ?? target.canonicalKey)) return;
			if (rejectExpectedSessionMismatch(entry)) return;
			if (p.archivedOnly === true && entry?.archivedAt === void 0) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `Session ${key} is not archived. Archive it first, then delete it.`));
				return;
			}
			if (rejectPluginRuntimeSessionOwnershipMismatch({
				action: "delete",
				client,
				key: canonicalKey ?? key,
				entry,
				respond
			})) return;
			const mutationCleanupError = await cleanupSessionBeforeMutation({
				cfg,
				key,
				target,
				entry,
				legacyKey,
				canonicalKey,
				reason: "session-delete"
			});
			if (mutationCleanupError) {
				respond(false, void 0, mutationCleanupError);
				return;
			}
			const postCleanupTarget = loadAccessorSessionEntryForGatewayTarget({
				key,
				cfg,
				...requestedAgentId ? { agentId: requestedAgentId } : {}
			});
			const postCleanupEntry = postCleanupTarget.entry;
			sessionMutationAuthorization?.assertCurrent();
			if (!expectedLifecycleRevisionMatches(postCleanupEntry) || !expectedSessionIdMatches(postCleanupEntry)) {
				respondSessionChanged();
				return;
			}
			const pluginOwnerId = normalizeOptionalString(postCleanupEntry?.pluginOwnerId);
			const incognito = postCleanupEntry?.incognito === true || isIncognitoSessionKey(target.canonicalKey);
			const deletionParams = {
				agentId: target.agentId,
				archiveTranscript: incognito ? false : deleteTranscript,
				deleteTranscriptWithoutArchive: incognito,
				expectedEntry: postCleanupEntry,
				expectedLifecycleRevision,
				expectedSessionId,
				expectedUpdatedAt: postCleanupEntry?.updatedAt,
				storePath,
				target: {
					canonicalKey: target.canonicalKey,
					storeKeys: target.storeKeys
				}
			};
			const result = postCleanupEntry && pluginOwnerId && isModelSelectionLocked(postCleanupEntry) ? await rollbackSqlitePluginOwnedSessionEntryLifecycle({
				...deletionParams,
				expectedEntry: postCleanupEntry,
				expectedPluginOwnerId: pluginOwnerId,
				target: {
					canonicalKey: postCleanupTarget.target.canonicalKey,
					storeKeys: postCleanupTarget.target.storeKeys
				}
			}) : await deleteSqliteSessionEntryLifecycle(deletionParams);
			if (result.expectedEntryMismatch) {
				respondSessionChanged();
				return;
			}
			if (result.deleted) {
				emitGatewaySessionEndPluginHook({
					cfg,
					sessionKey: target.canonicalKey ?? key,
					sessionId: result.deletedSessionId,
					storePath,
					sessionFile: result.deletedSessionFile,
					agentId: target.agentId,
					reason: "deleted",
					archivedTranscripts: result.archivedTranscripts
				});
				await emitSessionUnboundLifecycleEvent({
					targetSessionKey: target.canonicalKey ?? key,
					reason: "session-delete",
					emitHooks: p.emitLifecycleHooks !== false
				});
			}
			return result;
		}
	});
	if (!deletion) return;
	const deleted = deletion.deleted;
	const archived = deletion.archivedTranscripts.map((entryLocal) => entryLocal.archivedPath);
	let worktreePreserved;
	if (deleted) {
		handleSessionStateSessionDeleted(target.canonicalKey ?? key, requestedAgentId ?? resolveSessionStoreAgentId(cfg, target.canonicalKey ?? key));
		let worktree = void 0;
		try {
			worktree = managedWorktrees.findLiveByOwner("session", target.canonicalKey);
			if (worktree) await managedWorktrees.remove({
				id: worktree.id,
				reason: "session-delete"
			});
		} catch (error) {
			if (worktree) worktreePreserved = {
				id: worktree.id,
				branch: worktree.branch,
				path: worktree.path
			};
			sessionLog.warn(`failed to clean up worktree for deleted session ${target.canonicalKey}: ${formatErrorMessage(error)}`);
		}
	}
	respond(true, {
		ok: true,
		key: target.canonicalKey,
		deleted,
		archived,
		...worktreePreserved ? { worktreePreserved } : {}
	}, void 0);
	if (deleted) {
		emitSessionsChanged(context, {
			sessionKey: target.canonicalKey,
			agentId: target.agentId,
			reason: "delete"
		});
		emitSessionsChanged(context, { reason: "delete" });
	}
} };
//#endregion
export { sessionDeleteHandlers as t };
