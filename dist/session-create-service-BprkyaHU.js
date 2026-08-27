import { c as normalizeOptionalString, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import { f as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { a as isSubagentSessionKey, c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { t as isIncognitoSessionKey } from "./incognito-session-key-BwpD1Lwd.js";
import { f as resolveAgentIdFromSessionKey, y as toAgentStoreSessionKey } from "./session-key-DtTE9-Tg.js";
import { v as normalizeOptionalAgentRuntimeId } from "./openai-routing-G4z6ipSe.js";
import "./agent-scope-DyEposw2.js";
import { T as resolveSubagentConfiguredModelSelection, w as resolveDefaultModelForAgent } from "./codex-route-model-ref-B7v0y8up.js";
import { t as ADMIN_SCOPE } from "./operator-scopes-Dw7Gu2cA.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { c as normalizeSessionDeliveryState } from "./delivery-context.shared-B-QSuGw_.js";
import { r as resolveAgentMainSessionKey } from "./main-session-Bjm_i_Af.js";
import { r as resolveSessionStoreKey } from "./session-store-key-DmGCpash.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { Ct as buildSessionCreationStamp, S as inheritSessionSelection, nt as listSqliteSessionEntriesReadOnly } from "./session-accessor.sqlite-B9iW7DOt.js";
import { bt as isSessionWorkAdmissionActive, g as isAgentHarnessSessionKeyOwnedBy, h as isAgentHarnessSessionKey, p as AGENT_HARNESS_SESSION_KEY_RESERVED_MESSAGE, xt as runExclusiveSessionLifecycleMutation } from "./session-entry-slot-keys-DR5d2mKt.js";
import { nt as resolveSessionEntryAccessTarget, z as createSessionEntryWithTranscript } from "./session-accessor-t3qUoTeV.js";
import { a as errorShape, o as missingScopeErrorShape } from "./error-codes-P4fBo0lR.js";
import "./model-selection-4mvNeCA1.js";
import { u as recordSessionCreated } from "./session-state-events-MWtkoPhW.js";
import { u as isEmbeddedAgentRunActive } from "./runs-Bw__iUSb.js";
import { n as resolveSessionModelRef } from "./session-model-ref-SCzh_dh2.js";
import { C as loadSessionEntryReadOnly, k as resolveGatewaySessionStoreTarget } from "./session-utils-row-BDvhdN3C.js";
import "./session-utils-C8yYh4dv.js";
import { n as buildMainSessionRecoveryClearPatch } from "./main-session-recovery-clear-BngYLTap.js";
import { c as normalizeInheritedToolDenylist, s as normalizeInheritedToolAllowlist } from "./inherited-tool-deny-CDzxUNVk.js";
import { i as hasInternalHookListeners, m as triggerInternalHook, n as createInternalHookEvent } from "./internal-hooks-glvlO_hY.js";
import { a as isModelSelectionLocked } from "./model-overrides-BT6Lelev.js";
import { i as resolveParentForkDecision, r as forkSessionFromParent, t as MODEL_SELECTION_LOCKED_PARENT_FORK_MESSAGE } from "./session-fork-BU0em0SK.js";
import { n as shouldPreserveSessionAuthProfileOverride } from "./session-model-patch-origin-6p5iNAyq.js";
import "./embedded-agent-SSHfXmvH.js";
import { t as resolvePluginSessionOwnershipError } from "./session-plugin-ownership-Dlx-UDnP.js";
import { d as isSessionVisibilityAllowed, h as resolveSessionVisibility } from "./session-sharing-C3cQJ56a.js";
import { t as resolveRequestedSessionAgentId } from "./session-request-agent-0PlHUzcN.js";
import { r as resolveSessionPatchModelSelection, t as applySessionsPatchToStore } from "./sessions-patch-BeO7rXKb.js";
import { randomUUID } from "node:crypto";
//#region src/gateway/session-create-fork-entry.ts
function buildForkedGatewaySessionEntry(entry, fork, forkSource, previousEntry) {
	return {
		...entry,
		...buildMainSessionRecoveryClearPatch(entry),
		sessionId: fork.sessionId,
		forkSource: previousEntry?.forkSource ?? forkSource,
		...previousEntry?.sessionId && previousEntry.sessionId !== fork.sessionId ? { previousSessionId: previousEntry.sessionId } : {},
		totalTokens: void 0,
		totalTokensFresh: false
	};
}
//#endregion
//#region src/gateway/session-create-service.ts
const loadSessionLifecycleRuntime = createLazyRuntimeModule(() => import("./sessions.runtime.js"));
async function existingModelSelectionWouldChange(params) {
	if (params.catalogModel) return true;
	const requestedThinkingLevel = normalizeOptionalString(params.requestedThinkingLevel);
	if (requestedThinkingLevel && requestedThinkingLevel !== normalizeOptionalString(params.existingEntry.thinkingLevel)) return true;
	const requestedModel = normalizeOptionalString(params.requestedModel);
	if (!requestedModel) return false;
	if (!params.loadGatewayModelCatalog) return true;
	const catalog = await params.loadGatewayModelCatalog();
	const resolved = resolveSessionPatchModelSelection({
		cfg: params.cfg,
		catalog,
		raw: requestedModel,
		defaultProvider: params.defaultProvider,
		defaultModel: params.defaultModel,
		subagentModelHint: params.subagentModelHint
	});
	if (!resolved.ok) return true;
	let existingProvider = normalizeOptionalString(params.existingEntry.providerOverride) ?? params.defaultProvider;
	let existingModel = normalizeOptionalString(params.existingEntry.modelOverride) ?? params.defaultModel;
	if (!normalizeOptionalString(params.existingEntry.modelOverride) && params.subagentModelHint) {
		const resolvedSubagentDefault = resolveSessionPatchModelSelection({
			cfg: params.cfg,
			catalog,
			raw: params.subagentModelHint,
			defaultProvider: params.defaultProvider,
			defaultModel: params.defaultModel
		});
		if (!resolvedSubagentDefault.ok) return true;
		if (!normalizeOptionalString(params.existingEntry.providerOverride)) existingProvider = resolvedSubagentDefault.provider;
		existingModel = resolvedSubagentDefault.model;
	}
	const existingProfile = normalizeOptionalString(params.existingEntry.authProfileOverride);
	const requestedProfile = normalizeOptionalString(resolved.profile);
	const profileWouldChange = requestedProfile !== void 0 ? requestedProfile !== existingProfile : existingProfile !== void 0 && !shouldPreserveSessionAuthProfileOverride({
		cfg: params.cfg,
		currentProvider: params.existingEntry.providerOverride ?? params.existingEntry.modelProvider ?? params.defaultProvider,
		entry: params.existingEntry,
		provider: resolved.provider
	});
	return resolved.provider !== existingProvider || resolved.model !== existingModel || profileWouldChange;
}
function buildDashboardSessionKey(agentId, options = {}) {
	return `agent:${agentId}:dashboard:${`${options.incognito ? "incognito-" : ""}${randomUUID()}`}`;
}
async function createGatewaySession(params) {
	const requestedKey = normalizeOptionalString(params.key);
	const parentSessionKey = normalizeOptionalString(params.parentSessionKey);
	const generatedDisplayName = normalizeOptionalString(params.generatedDisplayName);
	const agentId = normalizeAgentId(normalizeOptionalString(params.agentId) ?? resolveDefaultAgentId(params.cfg));
	const catalogModel = normalizeOptionalString(params.catalogTarget?.model);
	const catalogAgentRuntime = normalizeOptionalAgentRuntimeId(params.catalogTarget?.agentRuntime);
	const catalogPluginOwnerId = normalizeOptionalString(params.catalogTarget?.pluginOwnerId);
	if (params.catalogTarget && (!catalogModel || !catalogAgentRuntime || !catalogPluginOwnerId)) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "invalid catalog session target")
	};
	if (params.succeedsParent !== void 0) {
		if (!parentSessionKey) return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, "succeedsParent requires parentSessionKey")
		};
		if (params.emitCommandHooks !== true) return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, "succeedsParent requires emitCommandHooks")
		};
		if (params.succeedsParent && params.fork === true) return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, "succeedsParent conflicts with fork: a fork runs in parallel to its parent")
		};
	}
	if (requestedKey) {
		const requestedAgentId = parseAgentSessionKey(requestedKey)?.agentId;
		if (requestedAgentId && requestedAgentId !== agentId && normalizeOptionalString(params.agentId)) return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, `sessions.create key agent (${requestedAgentId}) does not match agentId (${agentId})`)
		};
	}
	const loweredRequestedKey = normalizeOptionalLowercaseString(requestedKey);
	const explicitTargetKey = requestedKey ? loweredRequestedKey === "global" || loweredRequestedKey === "unknown" ? loweredRequestedKey : toAgentStoreSessionKey({
		agentId,
		requestKey: requestedKey,
		mainKey: params.cfg.session?.mainKey
	}) : void 0;
	const explicitTargetParts = parseAgentSessionKey(explicitTargetKey);
	const explicitIncognito = isIncognitoSessionKey(explicitTargetKey);
	const explicitDashboardIncognito = explicitIncognito && explicitTargetParts?.agentId === agentId && explicitTargetParts.rest.startsWith("dashboard:");
	if (explicitIncognito && params.incognito !== true) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "incognito-shaped session keys require incognito: true")
	};
	if (params.incognito === true && explicitTargetKey) {
		if (!explicitDashboardIncognito) return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, "incognito sessions are web-only")
		};
		if (listSqliteSessionEntriesReadOnly({
			agentId,
			storePath: resolveStorePath(params.cfg.session?.store, { agentId })
		}).some(({ sessionKey }) => sessionKey === explicitTargetKey) || loadSessionEntryReadOnly(explicitTargetKey).entry) return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, "incognito is immutable and requires a new session key")
		};
	}
	if (params.catalogTarget && explicitTargetKey && !explicitTargetKey.startsWith(`agent:${agentId}:dashboard:`)) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "catalog sessions require a generated dashboard key")
	};
	const authorizedHarnessCreation = Boolean(explicitTargetKey && params.initialEntry && normalizeOptionalAgentRuntimeId(params.authorizedAgentHarnessId) === normalizeOptionalAgentRuntimeId(params.initialEntry.agentHarnessId) && isAgentHarnessSessionKeyOwnedBy(explicitTargetKey, params.authorizedAgentHarnessId));
	const authorizedPluginCreation = Boolean(explicitTargetKey && params.initialEntry?.pluginOwnerId && params.authorizedPluginId === params.initialEntry.pluginOwnerId);
	if (params.initialEntry?.pluginOwnerId && !authorizedPluginCreation) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "trusted plugin session owner is not authorized")
	};
	const existingHarnessEntry = explicitTargetKey && isAgentHarnessSessionKey(explicitTargetKey) ? resolveSessionEntryAccessTarget({
		cfg: params.cfg,
		sessionKey: explicitTargetKey
	}).entry : void 0;
	if (explicitTargetKey && isAgentHarnessSessionKey(explicitTargetKey) && !authorizedHarnessCreation && (!existingHarnessEntry || existingHarnessEntry.modelSelectionLocked === true)) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, AGENT_HARNESS_SESSION_KEY_RESERVED_MESSAGE)
	};
	if (params.fork === true && !parentSessionKey) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "fork requires parentSessionKey")
	};
	if (params.spawnDepth !== void 0) {
		if (!Number.isInteger(params.spawnDepth) || params.spawnDepth < 1) return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, "spawnDepth must be an integer >= 1")
		};
		if (!parentSessionKey) return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, "spawnDepth requires parentSessionKey")
		};
	}
	if (params.spawnToolPolicy && params.spawnDepth === void 0) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "spawn tool policy requires spawnDepth")
	};
	let canonicalParentSessionKey;
	let parentSessionEntry;
	let parentSelectedAgentId;
	let parentSessionTarget;
	if (parentSessionKey) {
		if (resolveSessionStoreKey({
			cfg: params.cfg,
			sessionKey: parentSessionKey
		}) === "global") {
			const parentRequestedAgent = resolveRequestedSessionAgentId(params.cfg, parentSessionKey, params.agentId);
			if (!parentRequestedAgent.ok) return parentRequestedAgent;
			parentSelectedAgentId = parentRequestedAgent.agentId;
		}
		const parent = loadSessionEntryReadOnly(parentSessionKey, parentSelectedAgentId ? { agentId: parentSelectedAgentId } : void 0);
		if (!parent.entry?.sessionId) return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, `unknown parent session: ${parentSessionKey}`)
		};
		const parentOwnershipError = resolvePluginSessionOwnershipError({
			action: params.fork === true ? "fork" : "link",
			entry: parent.entry,
			key: parent.canonicalKey,
			pluginOwnerId: params.authorizedPluginId
		});
		if (parentOwnershipError) return {
			ok: false,
			error: parentOwnershipError
		};
		if (isModelSelectionLocked(parent.entry)) return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, MODEL_SELECTION_LOCKED_PARENT_FORK_MESSAGE)
		};
		canonicalParentSessionKey = parent.canonicalKey;
		parentSessionEntry = parent.entry;
		parentSessionTarget = resolveGatewaySessionStoreTarget({
			cfg: params.cfg,
			key: parentSessionKey,
			...canonicalParentSessionKey === "global" && parentSelectedAgentId ? { agentId: parentSelectedAgentId } : {}
		});
	}
	const parentIncognito = parentSessionEntry?.incognito === true || isIncognitoSessionKey(canonicalParentSessionKey);
	const incognito = params.incognito === true || parentIncognito;
	if (incognito && params.requestingOperatorScopes !== void 0 && !params.requestingOperatorScopes.includes("operator.admin")) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, `incognito sessions require gateway scope: ${ADMIN_SCOPE}`)
	};
	if (incognito && canonicalParentSessionKey && !parentIncognito) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "incognito sessions cannot have durable parents")
	};
	if (parentIncognito && explicitTargetKey) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "incognito sessions are web-only")
	};
	if (canonicalParentSessionKey && explicitTargetKey && resolveGatewaySessionStoreTarget({
		cfg: params.cfg,
		key: explicitTargetKey,
		agentId
	}).canonicalKey === canonicalParentSessionKey) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, "sessions.create key must differ from parentSessionKey")
	};
	const targetSessionKey = explicitTargetKey ?? buildDashboardSessionKey(agentId, { incognito });
	const creationTarget = resolveGatewaySessionStoreTarget({
		cfg: params.cfg,
		key: targetSessionKey,
		agentId
	});
	if (explicitTargetKey && !params.initialEntry) {
		if (resolveSessionEntryAccessTarget({
			cfg: params.cfg,
			sessionKey: creationTarget.canonicalKey
		}).entry?.initializationPending === true) return {
			ok: false,
			error: errorShape(ErrorCodes.UNAVAILABLE, `Session ${creationTarget.canonicalKey} is still initializing; retry creation later.`)
		};
	}
	const agentMainSessionKey = resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId
	});
	const dashboardParentSessionKey = !parentSessionKey && !params.authorizedPluginId && !incognito && params.fork !== true && (params.cfg.session?.dmScope ?? "main") === "main" && params.cfg.session?.scope !== "global" && targetSessionKey !== agentMainSessionKey ? agentMainSessionKey : void 0;
	if (canonicalParentSessionKey && params.fork !== true && params.emitCommandHooks === true && !requestedKey && params.resetMainWhenUnspecified === true && !parentIncognito && !params.catalogTarget && params.cfg.session?.dmScope === "main") {
		const parentAgentId = normalizeAgentId(parentSelectedAgentId ?? resolveAgentIdFromSessionKey(canonicalParentSessionKey) ?? resolveDefaultAgentId(params.cfg));
		const parentMainKey = resolveAgentMainSessionKey({
			cfg: params.cfg,
			agentId: parentAgentId
		});
		if (canonicalParentSessionKey === parentMainKey) {
			if (params.visibility) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, "sessions.create visibility requires a new session")
			};
			const { performGatewaySessionReset } = await loadSessionLifecycleRuntime();
			const spawnedCwd = normalizeOptionalString(params.spawnedCwd);
			const execCwd = normalizeOptionalString(params.execCwd);
			const resetResult = await performGatewaySessionReset({
				key: canonicalParentSessionKey,
				...canonicalParentSessionKey === "global" && parentSelectedAgentId ? { agentId: parentSelectedAgentId } : {},
				reason: "new",
				commandSource: params.commandSource,
				...params.creation ? { creation: params.creation } : {},
				...spawnedCwd ? { spawnedCwd } : {},
				...params.worktree ? { worktree: params.worktree } : {},
				...params.execNode ? { execNode: params.execNode } : {},
				...execCwd ? { execCwd } : {},
				...params.clearExecBinding ? { clearExecBinding: true } : {},
				...params.clearSpawnedCwd && !spawnedCwd ? { clearSpawnedCwd: true } : {}
			});
			if (!resetResult.ok) return resetResult;
			if ("incognitoDeleted" in resetResult) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, "incognito sessions cannot reset in place")
			};
			return {
				ok: true,
				key: resetResult.key,
				agentId: resetResult.agentId,
				entry: resetResult.entry,
				resolved: resetResult.resolved,
				resetExisting: true
			};
		}
	}
	let createdContext;
	let createdNewEntry = false;
	const spawnToolPolicy = params.spawnToolPolicy && canonicalParentSessionKey ? {
		completionOwnerSessionKey: normalizeOptionalString(params.spawnToolPolicy.completionOwnerSessionKey),
		allow: normalizeInheritedToolAllowlist(params.spawnToolPolicy.allow),
		deny: normalizeInheritedToolDenylist(params.spawnToolPolicy.deny),
		parentSessionKey: canonicalParentSessionKey
	} : void 0;
	const createChildSession = async () => {
		let currentParentSessionEntry = parentSessionEntry;
		if (canonicalParentSessionKey && parentSessionTarget && (params.emitCommandHooks === true || params.fork === true || params.authorizedPluginId !== void 0)) {
			const currentParentEntry = loadSessionEntryReadOnly(canonicalParentSessionKey, parentSelectedAgentId ? { agentId: parentSelectedAgentId } : void 0).entry;
			if (!currentParentEntry?.sessionId || currentParentEntry.sessionId !== parentSessionEntry?.sessionId) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, `Parent session ${parentSessionKey} changed before ${params.fork === true ? "fork" : "/new"}; retry.`)
			};
			currentParentSessionEntry = currentParentEntry;
			const parentOwnershipError = resolvePluginSessionOwnershipError({
				action: params.fork === true ? "fork" : "link",
				entry: currentParentEntry,
				key: canonicalParentSessionKey,
				pluginOwnerId: params.authorizedPluginId
			});
			if (parentOwnershipError) return {
				ok: false,
				error: parentOwnershipError
			};
			if ((params.emitCommandHooks === true || params.fork === true) && isModelSelectionLocked(currentParentEntry)) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, MODEL_SELECTION_LOCKED_PARENT_FORK_MESSAGE)
			};
			if ((params.emitCommandHooks === true || params.fork === true) && (isEmbeddedAgentRunActive(currentParentEntry.sessionId) || isSessionWorkAdmissionActive(parentSessionTarget.storePath, [canonicalParentSessionKey, currentParentEntry.sessionId]))) return {
				ok: false,
				error: errorShape(ErrorCodes.UNAVAILABLE, `Parent session ${parentSessionKey} is still active; try again in a moment.`)
			};
		}
		if (canonicalParentSessionKey && parentSessionTarget && params.emitCommandHooks === true) {
			const parentEntry = currentParentSessionEntry;
			const parentAgentId = normalizeAgentId(parentSelectedAgentId ?? resolveAgentIdFromSessionKey(canonicalParentSessionKey) ?? resolveDefaultAgentId(params.cfg));
			const workspaceDir = resolveAgentWorkspaceDir(params.cfg, parentAgentId);
			if (hasInternalHookListeners("command", "new")) await triggerInternalHook(createInternalHookEvent("command", "new", canonicalParentSessionKey, {
				sessionEntry: parentEntry,
				previousSessionEntry: parentEntry,
				commandSource: params.commandSource,
				cfg: params.cfg,
				workspaceDir
			}));
			const { emitGatewayBeforeResetPluginHook } = await loadSessionLifecycleRuntime();
			await emitGatewayBeforeResetPluginHook({
				cfg: params.cfg,
				key: canonicalParentSessionKey,
				target: parentSessionTarget,
				storePath: parentSessionTarget.storePath,
				entry: parentEntry,
				reason: "new"
			});
		}
		const target = creationTarget;
		const created = await createSessionEntryWithTranscript({
			agentId: target.agentId,
			sessionKey: target.canonicalKey,
			storePath: target.storePath
		}, async ({ existingEntry, sessionEntries }) => {
			const existingOwnershipError = resolvePluginSessionOwnershipError({
				action: "adopt",
				entry: existingEntry,
				key: target.canonicalKey,
				pluginOwnerId: params.authorizedPluginId
			});
			if (existingOwnershipError) return {
				ok: false,
				error: existingOwnershipError
			};
			if (isAgentHarnessSessionKey(target.canonicalKey) && !authorizedHarnessCreation && (!existingEntry || existingEntry.modelSelectionLocked === true)) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, AGENT_HARNESS_SESSION_KEY_RESERVED_MESSAGE)
			};
			if (!params.initialEntry && existingEntry?.initializationPending === true) return {
				ok: false,
				error: errorShape(ErrorCodes.UNAVAILABLE, `Session ${target.canonicalKey} is still initializing; retry creation later.`)
			};
			if (params.initialEntry && existingEntry !== void 0) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, "trusted initial session state requires a new session")
			};
			if (params.catalogTarget && existingEntry !== void 0) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, "catalog session target requires a new session")
			};
			if (spawnToolPolicy && existingEntry !== void 0) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, "spawn tool policy requires a new session")
			};
			if (params.visibility && existingEntry === void 0 && !isSessionVisibilityAllowed(params.cfg, params.visibility)) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, `session visibility is disabled: ${params.visibility}`, { details: {
					code: "SESSION_VISIBILITY_DISABLED",
					visibility: params.visibility
				} })
			};
			if (params.visibility && existingEntry !== void 0 && resolveSessionVisibility(existingEntry) !== params.visibility) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, "sessions.create visibility requires a new session")
			};
			createdNewEntry = existingEntry === void 0;
			const requestedModel = normalizeOptionalString(params.model);
			const requestedThinkingLevel = normalizeOptionalString(params.thinkingLevel);
			if (existingEntry?.sessionId && params.allowExistingModelSelection !== true) {
				const gateDefaultModel = resolveDefaultModelForAgent({
					cfg: params.cfg,
					agentId: target.agentId
				});
				if (await existingModelSelectionWouldChange({
					cfg: params.cfg,
					catalogModel,
					defaultModel: gateDefaultModel.model,
					defaultProvider: gateDefaultModel.provider,
					existingEntry,
					loadGatewayModelCatalog: params.loadGatewayModelCatalog,
					requestedModel,
					requestedThinkingLevel,
					subagentModelHint: isSubagentSessionKey(target.canonicalKey) ? resolveSubagentConfiguredModelSelection({
						cfg: params.cfg,
						agentId: target.agentId
					}) : void 0
				})) return {
					ok: false,
					error: missingScopeErrorShape({
						missingScope: ADMIN_SCOPE,
						requiredScopes: [ADMIN_SCOPE]
					})
				};
			}
			const patched = await applySessionsPatchToStore({
				cfg: params.cfg,
				store: sessionEntries,
				storeKey: target.canonicalKey,
				agentId: target.agentId,
				patch: {
					key: target.canonicalKey,
					label: normalizeOptionalString(params.label),
					model: catalogModel ?? requestedModel,
					thinkingLevel: requestedThinkingLevel
				},
				loadGatewayModelCatalog: params.loadGatewayModelCatalog,
				authorizedAgentHarnessId: params.authorizedAgentHarnessId
			});
			if (!patched.ok) return patched;
			const spawnedCwd = normalizeOptionalString(params.spawnedCwd);
			const execNode = normalizeOptionalString(params.execNode);
			const execCwd = normalizeOptionalString(params.execCwd);
			const initialAgentHarnessId = params.initialEntry ? normalizeOptionalString(params.initialEntry.agentHarnessId) : void 0;
			if (params.initialEntry && !initialAgentHarnessId && !authorizedPluginCreation) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, params.initialEntry?.agentHarnessId !== void 0 ? "initial agentHarnessId must be non-empty" : "trusted initial session state requires an authorized owner")
			};
			if (params.initialEntry?.modelSelectionLocked !== void 0 && !params.initialEntry.modelSelectionLocked) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, "initial modelSelectionLocked must be true when provided")
			};
			const catalogResolvedModel = params.catalogTarget ? resolveSessionModelRef(params.cfg, patched.entry, target.agentId) : void 0;
			const initializedEntry = {
				...patched.entry,
				...existingEntry === void 0 && patched.entry.delivery === void 0 ? { delivery: normalizeSessionDeliveryState() } : {},
				...params.creation && createdNewEntry ? buildSessionCreationStamp(params.creation) : {},
				...params.visibility && createdNewEntry ? { visibility: params.visibility } : {},
				...generatedDisplayName && createdNewEntry ? { displayName: generatedDisplayName } : {},
				...catalogResolvedModel && catalogAgentRuntime ? {
					providerOverride: catalogResolvedModel.provider,
					modelOverride: catalogResolvedModel.model,
					modelOverrideSource: "user",
					modelOverrideRouteResolution: "resolved",
					agentRuntimeOverride: catalogAgentRuntime,
					modelSelectionLocked: true,
					pluginOwnerId: catalogPluginOwnerId
				} : {},
				...spawnedCwd ? { spawnedCwd } : {},
				...params.worktree ? { worktree: params.worktree } : {},
				...execNode ? {
					execHost: "node",
					execNode,
					...execCwd ? { execCwd } : {}
				} : {},
				...initialAgentHarnessId ? { agentHarnessId: initialAgentHarnessId } : {},
				...createdNewEntry && params.authorizedPluginId && !params.catalogTarget ? { pluginOwnerId: params.authorizedPluginId } : {},
				...authorizedPluginCreation && params.initialEntry?.providerOverride ? { providerOverride: params.initialEntry.providerOverride } : {},
				...authorizedPluginCreation && params.initialEntry?.modelOverride ? { modelOverride: params.initialEntry.modelOverride } : {},
				...authorizedPluginCreation && params.initialEntry?.modelOverrideRouteResolution ? { modelOverrideRouteResolution: params.initialEntry.modelOverrideRouteResolution } : {},
				...authorizedPluginCreation && params.initialEntry?.cliSessionBindings ? { cliSessionBindings: structuredClone(params.initialEntry.cliSessionBindings) } : {},
				...params.initialEntry?.initializationPending === true ? { initializationPending: true } : {},
				...params.initialEntry?.modelSelectionLocked === true ? { modelSelectionLocked: true } : {},
				...params.initialEntry?.pluginExtensions !== void 0 ? { pluginExtensions: structuredClone(params.initialEntry.pluginExtensions) } : {},
				...existingEntry === void 0 ? { spawnDepth: params.spawnDepth ?? 0 } : {},
				...existingEntry === void 0 && spawnToolPolicy ? {
					spawnedBy: spawnToolPolicy.parentSessionKey,
					...spawnToolPolicy.completionOwnerSessionKey ? { completionOwnerSessionKey: spawnToolPolicy.completionOwnerSessionKey } : {},
					inheritedToolPolicyVersion: 1,
					...spawnToolPolicy.allow.length > 0 ? { inheritedToolAllow: spawnToolPolicy.allow } : {},
					...spawnToolPolicy.deny.length > 0 ? { inheritedToolDeny: spawnToolPolicy.deny } : {}
				} : {},
				...existingEntry === void 0 && incognito ? { incognito: true } : {}
			};
			sessionEntries[target.canonicalKey] = initializedEntry;
			const initialized = {
				...patched,
				entry: initializedEntry
			};
			const storedParentSessionKey = canonicalParentSessionKey ?? normalizeOptionalString(initializedEntry.parentSessionKey) ?? dashboardParentSessionKey;
			if (!storedParentSessionKey) return initialized;
			const inheritedSelection = !canonicalParentSessionKey || catalogModel || normalizeOptionalString(params.model) ? {} : inheritSessionSelection(currentParentSessionEntry);
			const entry = {
				...initializedEntry,
				...inheritedSelection,
				parentSessionKey: storedParentSessionKey
			};
			if (params.fork !== true) return {
				...initialized,
				entry
			};
			const forkParentSessionKey = canonicalParentSessionKey;
			if (!forkParentSessionKey || !currentParentSessionEntry || !parentSessionTarget) return {
				ok: false,
				error: errorShape(ErrorCodes.UNAVAILABLE, "failed to resolve parent session for fork")
			};
			const forkDecision = await resolveParentForkDecision({
				parentEntry: currentParentSessionEntry,
				agentId: parentSessionTarget.agentId,
				storePath: parentSessionTarget.storePath
			});
			if (forkDecision.status === "skip") return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, `parent session is too large to fork (${forkDecision.parentTokens}/${forkDecision.maxTokens} tokens)`)
			};
			const fork = await forkSessionFromParent({
				parentEntry: currentParentSessionEntry,
				agentId: parentSessionTarget.agentId,
				parentSessionKey: forkParentSessionKey,
				sessionKey: target.canonicalKey,
				storePath: parentSessionTarget.storePath,
				targetStorePath: target.storePath
			});
			if (!fork) return {
				ok: false,
				error: errorShape(ErrorCodes.UNAVAILABLE, "failed to fork parent session transcript")
			};
			return {
				...initialized,
				entry: buildForkedGatewaySessionEntry(entry, fork, {
					sessionKey: forkParentSessionKey,
					sessionId: currentParentSessionEntry.sessionId
				}, existingEntry)
			};
		}, params.initialEntry ? {
			activeSessionKey: target.canonicalKey,
			requireWriteSuccess: true
		} : void 0);
		if (!created.ok) return {
			ok: false,
			error: created.phase === "transcript" ? errorShape(ErrorCodes.UNAVAILABLE, `failed to create session transcript: ${created.error}`) : created.error
		};
		createdContext = {
			key: target.canonicalKey,
			agentId: target.agentId,
			entry: created.entry,
			storePath: target.storePath
		};
		if (canonicalParentSessionKey && parentSessionTarget && params.emitCommandHooks === true) {
			const parentEntry = currentParentSessionEntry;
			const { emitGatewaySessionEndPluginHook, emitGatewaySessionStartPluginHook } = await loadSessionLifecycleRuntime();
			if (params.succeedsParent !== false) emitGatewaySessionEndPluginHook({
				cfg: params.cfg,
				sessionKey: canonicalParentSessionKey,
				sessionId: parentEntry?.sessionId,
				storePath: parentSessionTarget.storePath,
				sessionFile: canonicalParentSessionKey,
				agentId: parentSessionTarget.agentId,
				reason: "new",
				nextSessionId: created.entry.sessionId,
				nextSessionKey: target.canonicalKey
			});
			emitGatewaySessionStartPluginHook({
				cfg: params.cfg,
				sessionKey: target.canonicalKey,
				sessionId: created.entry.sessionId,
				resumedFrom: parentEntry?.sessionId,
				storePath: target.storePath,
				sessionFile: target.canonicalKey,
				agentId: target.agentId
			});
		}
		const selectedModel = resolveSessionModelRef(params.cfg, created.entry, target.agentId);
		return {
			ok: true,
			key: target.canonicalKey,
			agentId: target.agentId,
			entry: created.entry,
			resolved: {
				modelProvider: selectedModel.provider,
				model: selectedModel.model
			},
			resetExisting: false
		};
	};
	const lifecycleTargets = [{
		scope: creationTarget.storePath,
		identities: [creationTarget.canonicalKey]
	}];
	if (canonicalParentSessionKey && parentSessionEntry?.sessionId && parentSessionTarget && (params.emitCommandHooks === true || params.fork === true || params.authorizedPluginId !== void 0)) lifecycleTargets.push({
		scope: parentSessionTarget.storePath,
		identities: [canonicalParentSessionKey, parentSessionEntry.sessionId]
	});
	const result = await runExclusiveSessionLifecycleMutation({
		targets: lifecycleTargets,
		run: createChildSession
	});
	if (result.ok && !result.resetExisting && createdContext) {
		if (createdNewEntry) recordSessionCreated({
			sessionKey: createdContext.key,
			agentId: createdContext.agentId,
			entry: createdContext.entry
		});
		await params.afterCreate?.(createdContext);
	}
	return result;
}
//#endregion
export { createGatewaySession as n, buildDashboardSessionKey as t };
