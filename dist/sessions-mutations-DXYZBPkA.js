import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { t as isPluginJsonValue } from "./host-hook-json-CRVrIqU9.js";
import { A as patchPluginSessionExtension } from "./loader-si71apUX.js";
import "./agent-scope-DyEposw2.js";
import { t as ADMIN_SCOPE } from "./operator-scopes-Dw7Gu2cA.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { bt as isSessionWorkAdmissionActive, ct as SESSION_ARCHIVE_ACTIVE_RUN_ERROR, w as resolveMissingAgentHarnessSessionError, xt as runExclusiveSessionLifecycleMutation, yt as isSessionLifecycleMutationActive } from "./session-entry-slot-keys-DR5d2mKt.js";
import { J as applySessionPatchProjection } from "./session-accessor-t3qUoTeV.js";
import { Dr as validateSessionsPatchParams, Or as validateSessionsPluginPatchParams, jr as validateSessionsResetParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { w as replyRunRegistry } from "./reply-run-registry-CA3-OJtf.js";
import { n as resolveSessionModelRef } from "./session-model-ref-D6sDGDAK.js";
import { N as resolveGatewaySessionThinkingProjection, P as resolveSessionDisplayModelIdentityRef, S as loadSessionEntry, T as resolveCanonicalGatewaySessionStoreKey, m as disableCronJobsBoundToSession } from "./session-utils-row-Cby7i9PV.js";
import "./session-utils-DRzriWC1.js";
import { t as triggerSessionPatchHook } from "./session-patch-hooks-CD1TuQiS.js";
import { t as persistStickyModelSelectionBestEffort } from "./sticky-model-selection-DiHWwvWQ.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { r as hasVisibleActiveSessionRun } from "./session-active-runs-BJUkv4It.js";
import { v as gatewayClientSessionCreator } from "./session-sharing-CSGmZX63.js";
import { t as emitSessionsChanged } from "./session-change-event-BvS0Y-TK.js";
import { n as resolveOperatorSessionCreation } from "./session-creation-provenance-CX5dCIoC.js";
import { t as resolveRequestedSessionAgentId } from "./session-request-agent-0PlHUzcN.js";
import { c as rejectPluginRuntimeSessionOwnershipMismatch, f as resolveSessionWorkerPlacementPatchError, l as requireSessionKey, m as sessionLog, r as isAgentMainSessionKey, s as loadSessionsRuntimeModule, u as resolveGatewaySessionTargetFromKey } from "./sessions-shared-M-LlvRMb.js";
import { n as projectSessionsPatchEntry } from "./sessions-patch-Dbd-Ug7D.js";
import { n as ensureSessionGroupRegistered } from "./session-groups-Crg2lhOJ.js";
import { t as appendSessionAudit } from "./session-audit-Sjl0FGiE.js";
//#region src/gateway/server-methods/sessions-mutations.ts
const sessionMutationHandlers = {
	"sessions.patch": async ({ params, respond, context, client, sessionMutationAuthorization }) => {
		if (!assertValidParams(params, validateSessionsPatchParams, "sessions.patch", respond)) return;
		const p = params;
		const key = requireSessionKey(p.key, respond);
		if (!key) return;
		const cfg = context.getRuntimeConfig();
		const archiveActor = gatewayClientSessionCreator(client);
		const requestedAgent = resolveRequestedSessionAgentId(cfg, key, p.agentId);
		if (!requestedAgent.ok) {
			respond(false, void 0, requestedAgent.error);
			return;
		}
		const requestedAgentId = requestedAgent.agentId;
		const { target, storePath } = resolveGatewaySessionTargetFromKey(key, cfg, { agentId: requestedAgentId });
		const canonicalKey = target.canonicalKey ?? key;
		const lifecycleEntry = loadSessionEntry(key, { agentId: requestedAgentId }).entry;
		if (rejectPluginRuntimeSessionOwnershipMismatch({
			action: "patch",
			client,
			key: canonicalKey,
			entry: lifecycleEntry,
			respond
		})) return;
		const missingHarnessSessionError = resolveMissingAgentHarnessSessionError(canonicalKey, lifecycleEntry);
		if (missingHarnessSessionError) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, missingHarnessSessionError));
			return;
		}
		const initialPlacementPatchError = resolveSessionWorkerPlacementPatchError({
			agentId: target.agentId,
			cfg,
			context,
			entry: lifecycleEntry,
			key,
			patch: p,
			sessionKey: canonicalKey,
			validateModelRuntime: false
		});
		if (initialPlacementPatchError) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, initialPlacementPatchError));
			return;
		}
		const lifecycleIdentities = [
			canonicalKey,
			key,
			lifecycleEntry?.sessionId
		];
		if (p.archived === true && isSessionLifecycleMutationActive(storePath, lifecycleIdentities)) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, SESSION_ARCHIVE_ACTIVE_RUN_ERROR));
			return;
		}
		let patchModelCatalog;
		const loadPatchModelCatalog = async () => {
			const catalog = await context.loadGatewayModelCatalog({ agentId: target.agentId });
			patchModelCatalog = catalog;
			return catalog;
		};
		let wasArchivedBeforePatch = false;
		const resolvePatchTarget = ({ entries }) => {
			const store = Object.fromEntries(entries.map(({ sessionKey, entry }) => [sessionKey, entry]));
			const { target: migratedTarget, primaryKey } = resolveCanonicalGatewaySessionStoreKey({
				cfg,
				key,
				store,
				agentId: requestedAgentId
			});
			return {
				primaryKey,
				candidateKeys: migratedTarget.storeKeys
			};
		};
		const applyPatch = async () => {
			const currentLifecycleEntry = loadSessionEntry(key, { agentId: requestedAgentId }).entry;
			if (rejectPluginRuntimeSessionOwnershipMismatch({
				action: "patch",
				client,
				key: canonicalKey,
				entry: currentLifecycleEntry,
				respond
			})) return null;
			const expectedSessionChanged = p.expectedSessionId !== void 0 && currentLifecycleEntry?.sessionId !== p.expectedSessionId || p.expectedLifecycleRevision !== void 0 && currentLifecycleEntry?.lifecycleRevision !== p.expectedLifecycleRevision;
			const lifecycleEntryRemoved = lifecycleEntry !== void 0 && currentLifecycleEntry === void 0;
			const archiveTargetChanged = p.archived === true && (lifecycleEntry === void 0 ? currentLifecycleEntry !== void 0 : currentLifecycleEntry !== void 0 && (currentLifecycleEntry.sessionId !== lifecycleEntry.sessionId || currentLifecycleEntry.lifecycleRevision !== lifecycleEntry.lifecycleRevision));
			if (expectedSessionChanged || lifecycleEntryRemoved || archiveTargetChanged) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `Session ${key} changed before patch. Retry.`));
				return null;
			}
			if (p.archived === true) {
				if (canonicalKey === "global" || isAgentMainSessionKey(cfg, canonicalKey)) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "Cannot archive an agent's main session."));
					return null;
				}
				const { entry } = loadSessionEntry(key, { agentId: requestedAgentId });
				const activeIdentities = [
					canonicalKey,
					key,
					entry?.sessionId
				];
				if (isSessionWorkAdmissionActive(storePath, activeIdentities) || replyRunRegistry.isActive(canonicalKey) || replyRunRegistry.isActive(key) || hasVisibleActiveSessionRun({
					context,
					requestedKey: key,
					canonicalKey,
					sessionId: entry?.sessionId,
					defaultAgentId: resolveDefaultAgentId(cfg)
				})) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, SESSION_ARCHIVE_ACTIVE_RUN_ERROR));
					return null;
				}
			}
			return await applySessionPatchProjection({
				agentId: target.agentId,
				assertCurrent: sessionMutationAuthorization?.assertCurrent,
				storePath,
				resolveTarget: resolvePatchTarget,
				project: async ({ primaryKey, existingEntry, entries }) => {
					wasArchivedBeforePatch = existingEntry?.archivedAt !== void 0;
					const projected = await projectSessionsPatchEntry({
						cfg,
						entries,
						existingEntry,
						storeKey: primaryKey,
						agentId: requestedAgentId,
						patch: p,
						archivedBy: archiveActor,
						loadGatewayModelCatalog: loadPatchModelCatalog
					});
					if (!projected.ok) return projected;
					const placementPatchError = resolveSessionWorkerPlacementPatchError({
						agentId: target.agentId,
						cfg,
						context,
						entry: projected.entry,
						key,
						patch: p,
						sessionKey: canonicalKey,
						validateModelRuntime: true
					});
					return placementPatchError ? {
						ok: false,
						error: errorShape(ErrorCodes.INVALID_REQUEST, placementPatchError)
					} : projected;
				}
			});
		};
		const applied = await runExclusiveSessionLifecycleMutation({
			scope: storePath,
			identities: lifecycleIdentities,
			run: async () => {
				const result = await applyPatch();
				if (!result?.ok) return result;
				if (!(typeof p.archived === "boolean" && wasArchivedBeforePatch !== (result.entry.archivedAt !== void 0)) || !archiveActor) return result;
				const action = result.entry.archivedAt === void 0 ? "unarchived" : "archived";
				try {
					await appendSessionAudit({
						cfg,
						target: {
							agentId: target.agentId,
							entry: result.entry,
							sessionKey: target.canonicalKey ?? key,
							storePath
						},
						text: `${action} by ${archiveActor.label ?? archiveActor.id}`,
						now: Date.now()
					});
				} catch (error) {
					sessionLog.warn(`sessions.patch: ${action} audit note failed for ${canonicalKey}; archive kept: ${error instanceof Error ? error.message : String(error)}`);
				}
				return result;
			}
		});
		if (!applied) return;
		if (!applied.ok) {
			respond(false, void 0, applied.error);
			return;
		}
		const callerScopes = Array.isArray(client?.connect?.scopes) ? client.connect.scopes : [];
		triggerSessionPatchHook({
			cfg,
			sessionEntry: applied.entry,
			sessionKey: target.canonicalKey ?? key,
			patch: p
		});
		const callerCanManageCron = client === null || callerScopes.includes("operator.admin");
		if (p.archived === true && callerCanManageCron) try {
			const disabledJobIds = await disableCronJobsBoundToSession({
				cron: context.cron,
				cfg,
				sessionKey: target.canonicalKey ?? key
			});
			if (disabledJobIds.length > 0) sessionLog.info(`sessions.patch: disabled cron jobs bound to archived session ${target.canonicalKey ?? key}: ${disabledJobIds.join(", ")}`);
		} catch (error) {
			sessionLog.warn(`sessions.patch: failed to disable cron jobs for archived session ${target.canonicalKey ?? key}: ${formatErrorMessage(error)}`);
		}
		if (typeof p.category === "string" && p.category.trim()) ensureSessionGroupRegistered(p.category);
		const parsed = parseAgentSessionKey(target.canonicalKey ?? key);
		const agentId = normalizeAgentId(target.canonicalKey === "global" ? target.agentId : parsed?.agentId ?? resolveDefaultAgentId(cfg));
		const resolved = resolveSessionModelRef(cfg, applied.entry, agentId);
		if (typeof p.model === "string" && callerScopes.includes("operator.admin") && applied.entry.modelOverrideSource === "user" && applied.entry.providerOverride && applied.entry.modelOverride) persistStickyModelSelectionBestEffort({
			agentId,
			model: `${resolved.provider}/${resolved.model}`
		});
		const resolvedDisplayModel = resolveSessionDisplayModelIdentityRef({
			cfg,
			agentId,
			provider: resolved.provider,
			model: resolved.model
		});
		const thinkingProjection = resolveGatewaySessionThinkingProjection({
			cfg,
			agentId,
			provider: resolvedDisplayModel.provider ?? resolved.provider,
			model: resolvedDisplayModel.model ?? resolved.model,
			sessionKey: target.canonicalKey ?? key,
			entry: applied.entry,
			modelCatalog: patchModelCatalog
		});
		const resolvedThinkingMetadata = patchModelCatalog === void 0 ? {} : {
			thinkingLevel: thinkingProjection.effectiveThinkingLevel,
			thinkingLevels: thinkingProjection.thinkingLevels
		};
		respond(true, {
			ok: true,
			path: storePath,
			key: target.canonicalKey,
			entry: applied.entry,
			resolved: {
				modelProvider: resolvedDisplayModel.provider,
				model: resolvedDisplayModel.model,
				agentRuntime: thinkingProjection.agentRuntime,
				...resolvedThinkingMetadata
			}
		}, void 0);
		emitSessionsChanged(context, {
			sessionKey: target.canonicalKey,
			...target.canonicalKey === "global" && requestedAgentId ? { agentId: requestedAgentId } : {},
			reason: "patch"
		});
	},
	"sessions.pluginPatch": async ({ params, respond, context, client, sessionMutationAuthorization }) => {
		if (!assertValidParams(params, validateSessionsPluginPatchParams, "sessions.pluginPatch", respond)) return;
		const key = requireSessionKey(params.key, respond);
		if (!key) return;
		if (!(Array.isArray(client?.connect.scopes) ? client.connect.scopes : []).includes("operator.admin")) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `sessions.pluginPatch requires gateway scope: ${ADMIN_SCOPE}`));
			return;
		}
		const pluginId = normalizeOptionalString(params.pluginId);
		const namespace = normalizeOptionalString(params.namespace);
		if (!pluginId || !namespace) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "pluginId and namespace are required"));
			return;
		}
		if (params.unset === true && params.value !== void 0) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "sessions.pluginPatch cannot specify both unset and value"));
			return;
		}
		if (params.value !== void 0 && !isPluginJsonValue(params.value)) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "sessions.pluginPatch value must be JSON-compatible"));
			return;
		}
		const patched = await patchPluginSessionExtension({
			cfg: context.getRuntimeConfig(),
			sessionKey: key,
			pluginId,
			namespace,
			value: params.value,
			unset: params.unset === true,
			assertCurrent: sessionMutationAuthorization?.assertCurrent
		});
		if (!patched.ok) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, patched.error));
			return;
		}
		respond(true, {
			ok: true,
			key: patched.key,
			value: patched.value
		}, void 0);
		emitSessionsChanged(context, {
			sessionKey: patched.key,
			reason: "plugin-patch"
		});
	},
	"sessions.reset": async ({ params, respond, context, client, sessionMutationAuthorization }) => {
		if (!assertValidParams(params, validateSessionsResetParams, "sessions.reset", respond)) return;
		const p = params;
		const key = requireSessionKey(p.key, respond);
		if (!key) return;
		const reason = p.reason === "new" ? "new" : "reset";
		const { performGatewaySessionReset } = await loadSessionsRuntimeModule();
		const result = await performGatewaySessionReset({
			key,
			...p.agentId ? { agentId: p.agentId } : {},
			reason,
			commandSource: "gateway:sessions.reset",
			creation: resolveOperatorSessionCreation(client),
			authorizedPluginId: normalizeOptionalString(client?.internal?.pluginRuntimeOwnerId),
			assertAuthorizedInstance: sessionMutationAuthorization?.assertCurrent
		});
		if (!result.ok) {
			respond(false, void 0, result.error);
			return;
		}
		if ("incognitoDeleted" in result) {
			respond(true, {
				ok: true,
				key: result.key,
				deleted: true
			}, void 0);
			emitSessionsChanged(context, {
				sessionKey: result.key,
				reason
			});
			return;
		}
		respond(true, {
			ok: true,
			key: result.key,
			entry: result.entry,
			resolved: result.resolved
		}, void 0);
		emitSessionsChanged(context, {
			sessionKey: result.key,
			...result.key === "global" ? { agentId: result.agentId } : {},
			reason
		});
	}
};
//#endregion
export { sessionMutationHandlers };
