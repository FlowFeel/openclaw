import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { t as expectDefined } from "./expect-CyE8FADM.js";
import "./src-COWbwBfI.js";
import { i as isPathInside } from "./path-D8zNGPJM.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { f as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import "./path-guards-C3glTcy2.js";
import "./agent-scope-DyEposw2.js";
import { w as resolveDefaultModelForAgent } from "./codex-route-model-ref-BDwklqCa.js";
import { r as authorizeOperatorScopesForRequiredScope } from "./method-scopes-BPNMlnDQ.js";
import { t as ADMIN_SCOPE } from "./operator-scopes-Dw7Gu2cA.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { r as resolveAgentMainSessionKey } from "./main-session-Bjm_i_Af.js";
import { n as resolveSessionStoreAgentId } from "./session-store-key-DmGCpash.js";
import { wt as sessionEntryForkedFromParent } from "./session-accessor.sqlite-CtCo5VZ6.js";
import { sr as validateSessionsCreateParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import "./model-selection-CZlE_kEq.js";
import { p as ensureAgentWorkspace } from "./workspace-aPJlJwqC.js";
import { n as resolveSandboxRuntimeStatus } from "./runtime-status-CS3ZCTG9.js";
import { i as stripInlineDirectiveTagsForDisplay } from "./directive-tags-XkukyPkv.js";
import { s as readSessionMessageCountAsync } from "./session-transcript-readers-O8pyQfzE.js";
import { C as loadSessionEntryReadOnly, k as resolveGatewaySessionStoreTarget } from "./session-utils-row-Br8x7LNG.js";
import { i as insideGitCheckout } from "./git-Ba83QtEc.js";
import "./session-utils-P5pxtsqu.js";
import { t as ensureSessionDiffBaseline } from "./session-diff-baseline-DObkGj0C.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as chatHandlers } from "./chat-Bz6gypcV.js";
import { t as normalizeRpcAttachmentsToChatAttachments } from "./attachment-normalize-CKQigle-.js";
import { t as generateDashboardSessionTitle } from "./dashboard-session-title-bu6ZzXU0.js";
import { t as emitSessionsChanged } from "./session-change-event-CX3Vh0EN.js";
import { n as resolveOperatorSessionCreation } from "./session-creation-provenance-CX5dCIoC.js";
import { a as WorktreeRepositoryError, l as slugifyWorktreeTitle, s as managedWorktrees } from "./service-BBNHKAQG.js";
import { t as resolveRequestedSessionAgentId } from "./session-request-agent-0PlHUzcN.js";
import { m as sessionLog } from "./sessions-shared-gU-TXhNf.js";
import { n as resolveSessionCatalogCreateTarget } from "./session-catalog-CON0j9e6.js";
import { n as createGatewaySession, t as buildDashboardSessionKey } from "./session-create-service-46E63uaP.js";
import { r as resolveSessionPatchModelSelection } from "./sessions-patch-nAcfcf1t.js";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
//#region src/gateway/server-methods/session-create-initial-turn.ts
function resolveOptionalInitialSessionMessage(params) {
	if (typeof params.task === "string" && params.task.trim()) return params.task;
	if (typeof params.message === "string" && params.message.trim()) return params.message;
}
function resolveSessionCreateInitialTurn(params) {
	const message = resolveOptionalInitialSessionMessage(params);
	const normalizedAttachments = normalizeRpcAttachmentsToChatAttachments(params.attachments);
	if (params.attachments?.length && !message && normalizedAttachments.length === 0) return null;
	const attachments = normalizedAttachments.length ? normalizedAttachments : void 0;
	return {
		attachments,
		hasInitialTurn: message !== void 0 || attachments !== void 0,
		message
	};
}
function shouldAttachPendingMessageSeq(params) {
	if (params.cached) return false;
	return (params.payload && typeof params.payload === "object" ? params.payload.status : void 0) === "started";
}
//#endregion
//#region src/gateway/server-methods/sessions-create.ts
async function prepareOperatorSessionDiffBaseline(params) {
	const workspace = await ensureAgentWorkspace({
		dir: resolveAgentWorkspaceDir(params.cfg, params.agentId),
		ensureBootstrapFiles: !params.cfg.agents?.defaults?.skipBootstrap,
		skipOptionalBootstrapFiles: params.cfg.agents?.defaults?.skipOptionalBootstrapFiles
	});
	return await ensureSessionDiffBaseline({
		cwd: normalizeOptionalString(params.entry.spawnedCwd) ?? normalizeOptionalString(params.entry.spawnedWorkspaceDir) ?? workspace.dir,
		entry: params.entry,
		force: true,
		isNewSession: true,
		sessionKey: params.sessionKey,
		storePath: params.storePath
	});
}
const sessionCreateHandlers = { "sessions.create": async ({ req, params, respond, context, client, isWebchatConnect }) => {
	if (!assertValidParams(params, validateSessionsCreateParams, "sessions.create", respond)) return;
	const p = params;
	const cfg = context.getRuntimeConfig();
	const catalogId = normalizeOptionalString(p.catalogId);
	if (catalogId && p.model) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "sessions.create catalogId cannot include model"));
		return;
	}
	if (catalogId && p.key) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "sessions.create catalogId cannot include key"));
		return;
	}
	const catalogRequestedKey = normalizeOptionalString(p.key) ?? "global";
	const catalogAgentId = catalogId ? normalizeAgentId(normalizeOptionalString(p.agentId) ?? parseAgentSessionKey(catalogRequestedKey)?.agentId ?? resolveDefaultAgentId(cfg)) : void 0;
	const catalogRequestedAgent = catalogAgentId ? resolveRequestedSessionAgentId(cfg, catalogRequestedKey, catalogAgentId) : void 0;
	if (catalogRequestedAgent && !catalogRequestedAgent.ok) {
		respond(false, void 0, catalogRequestedAgent.error);
		return;
	}
	const catalogTarget = catalogId && catalogAgentId ? resolveSessionCatalogCreateTarget(catalogId, catalogAgentId, cfg) : void 0;
	if (catalogTarget && !catalogTarget.ok) {
		respond(false, void 0, errorShape(catalogTarget.unknownCatalog ? ErrorCodes.INVALID_REQUEST : ErrorCodes.UNAVAILABLE, catalogTarget.message));
		return;
	}
	const initialTurn = resolveSessionCreateInitialTurn(p);
	if (!initialTurn) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "sessions.create attachments require usable content"));
		return;
	}
	const { attachments: initialAttachments, hasInitialTurn, message: initialMessage } = initialTurn;
	const requestedCwd = normalizeOptionalString(p.cwd);
	const requestedExecNode = normalizeOptionalString(p.execNode);
	if (!(!requestedCwd || (requestedExecNode ? path.isAbsolute(requestedCwd) || path.win32.isAbsolute(requestedCwd) : path.isAbsolute(requestedCwd)))) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "sessions.create cwd must be absolute"));
		return;
	}
	if (requestedExecNode && p.worktree === true) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "sessions.create worktree cannot target execNode"));
		return;
	}
	const requestedWorktreeBaseRef = normalizeOptionalString(p.worktreeBaseRef);
	const requestedWorktreeName = normalizeOptionalString(p.worktreeName);
	if ((requestedWorktreeBaseRef || requestedWorktreeName) && p.worktree !== true) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "sessions.create worktreeBaseRef/worktreeName require worktree=true"));
		return;
	}
	let sessionKey = p.key;
	let sessionAgentId = catalogAgentId ?? p.agentId;
	let sessionWorktree;
	const sessionExecCwd = requestedExecNode ? requestedCwd : void 0;
	let sessionCwd = requestedExecNode ? void 0 : requestedCwd;
	let sessionSourceRoot;
	let provisionedSessionWorktree = false;
	let generatedDisplayName;
	if (requestedCwd && !requestedExecNode && p.worktree !== true) {
		const targetAgentId = normalizeAgentId(sessionAgentId ?? parseAgentSessionKey(sessionKey ?? "")?.agentId ?? resolveDefaultAgentId(cfg));
		if (resolveSandboxRuntimeStatus({
			cfg,
			agentId: targetAgentId,
			sessionKey: sessionKey ?? `agent:${targetAgentId}:dashboard:pending`
		}).sandboxed && !isPathInside(resolveUserPath(resolveAgentWorkspaceDir(cfg, targetAgentId)), resolveUserPath(requestedCwd))) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "sessions.create cwd is outside the sandboxed agent workspace"));
			return;
		}
	}
	if (p.worktree === true) {
		const explicitKey = normalizeOptionalString(p.key);
		const requestedKey = explicitKey ?? "global";
		const requestedAgent = resolveRequestedSessionAgentId(cfg, requestedKey, p.agentId);
		if (!requestedAgent.ok) {
			respond(false, void 0, requestedAgent.error);
			return;
		}
		const agentId = normalizeAgentId(requestedAgent.agentId ?? normalizeOptionalString(p.agentId) ?? parseAgentSessionKey(requestedKey)?.agentId ?? resolveDefaultAgentId(cfg));
		let targetKey = explicitKey;
		let preservesUnspecifiedKey = false;
		const parentSessionKey = normalizeOptionalString(p.parentSessionKey);
		if (!targetKey && parentSessionKey && p.emitCommandHooks === true && !hasInitialTurn && cfg.session?.dmScope === "main") {
			const parent = loadSessionEntryReadOnly(parentSessionKey, requestedAgent.agentId ? { agentId: requestedAgent.agentId } : void 0);
			const parentAgentId = normalizeAgentId(requestedAgent.agentId ?? resolveSessionStoreAgentId(cfg, parent.canonicalKey));
			if (parent.entry?.sessionId && parent.canonicalKey === resolveAgentMainSessionKey({
				cfg,
				agentId: parentAgentId
			})) {
				targetKey = parent.canonicalKey;
				preservesUnspecifiedKey = true;
			}
		}
		targetKey ??= buildDashboardSessionKey(agentId);
		const target = resolveGatewaySessionStoreTarget({
			cfg,
			key: targetKey,
			agentId
		});
		sessionKey = preservesUnspecifiedKey ? void 0 : targetKey;
		sessionAgentId = target.agentId;
		const workspace = requestedCwd ?? resolveAgentWorkspaceDir(cfg, target.agentId);
		if (!insideGitCheckout(workspace)) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "agent workspace is not a git checkout"));
			return;
		}
		try {
			const requestedRepository = await managedWorktrees.resolveRepositoryPaths(workspace);
			sessionSourceRoot = requestedRepository.sourceRoot;
			const existing = managedWorktrees.findLiveByOwner("session", target.canonicalKey);
			let existingDirectory = false;
			if (existing) try {
				existingDirectory = fs.lstatSync(existing.path).isDirectory();
			} catch {}
			if (existing && existingDirectory) {
				if (existing.repoRoot !== requestedRepository.canonicalRoot) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "session worktree belongs to a different repository"));
					return;
				}
				if (requestedWorktreeName && existing.name !== requestedWorktreeName || requestedWorktreeBaseRef) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `session is already bound to worktree ${existing.name} (${existing.branch})`));
					return;
				}
				sessionWorktree = existing;
			} else {
				const scopes = Array.isArray(client?.connect.scopes) ? client.connect.scopes : [];
				if (!requestedWorktreeName && !normalizeOptionalString(p.label) && initialMessage) try {
					const requestedTitleModel = catalogTarget?.target.model ?? normalizeOptionalString(p.model);
					let titleModelEntry;
					if (requestedTitleModel) {
						const defaultModel = resolveDefaultModelForAgent({
							cfg,
							agentId: target.agentId
						});
						const selection = resolveSessionPatchModelSelection({
							cfg,
							catalog: await context.loadGatewayModelCatalog({ agentId: target.agentId }),
							raw: requestedTitleModel,
							defaultProvider: defaultModel.provider,
							defaultModel: defaultModel.model
						});
						if (selection.ok) titleModelEntry = {
							providerOverride: selection.provider,
							modelOverride: selection.model,
							...selection.profile ? { authProfileOverride: selection.profile } : {}
						};
					}
					generatedDisplayName = await generateDashboardSessionTitle({
						cfg,
						agentId: target.agentId,
						entry: titleModelEntry,
						userMessage: stripInlineDirectiveTagsForDisplay(initialMessage).text
					}) ?? void 0;
				} catch (error) {
					sessionLog.warn(`worktree title generation failed: ${formatErrorMessage(error)}`);
				}
				sessionWorktree = await managedWorktrees.create({
					repoRoot: workspace,
					ownerKind: "session",
					ownerId: target.canonicalKey,
					name: requestedWorktreeName,
					suggestedName: slugifyWorktreeTitle(normalizeOptionalString(p.label) ?? generatedDisplayName ?? ""),
					baseRef: requestedWorktreeBaseRef,
					runSetupScript: scopes.includes(ADMIN_SCOPE)
				});
				provisionedSessionWorktree = true;
			}
		} catch (error) {
			if (error instanceof WorktreeRepositoryError) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "agent workspace is not a git checkout"));
				return;
			}
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(error)));
			return;
		}
		sessionCwd = sessionWorktree.path;
		try {
			const relative = path.relative(sessionSourceRoot ?? fs.realpathSync(sessionWorktree.repoRoot), fs.realpathSync(workspace));
			if (relative && !relative.startsWith("..") && !path.isAbsolute(relative)) {
				sessionCwd = path.join(sessionWorktree.path, relative);
				fs.mkdirSync(sessionCwd, { recursive: true });
			}
		} catch {
			sessionCwd = sessionWorktree.path;
		}
	}
	let runPayload;
	let runError;
	let runMeta;
	let messageSeq;
	const clientScopes = Array.isArray(client?.connect?.scopes) ? client.connect.scopes : [];
	const sessionCreation = resolveOperatorSessionCreation(client, { allowTrustedHint: true });
	const spawnActorSessionKey = sessionCreation.via === "spawn" && sessionCreation.actor?.type === "agent" ? normalizeOptionalString(sessionCreation.actor.id) : void 0;
	if (sessionCreation.inheritedToolPolicy && spawnActorSessionKey && normalizeOptionalString(p.parentSessionKey) !== spawnActorSessionKey) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "spawn parent must match the trusted agent caller"));
		return;
	}
	const allowExistingModelSelection = authorizeOperatorScopesForRequiredScope(ADMIN_SCOPE, clientScopes).allowed;
	const modelCatalogAgentId = normalizeAgentId(sessionAgentId ?? parseAgentSessionKey(sessionKey ?? "")?.agentId ?? resolveDefaultAgentId(cfg));
	const captureCreatedSessionBaseline = async (created) => {
		try {
			Object.assign(created.entry, await prepareOperatorSessionDiffBaseline({
				agentId: created.agentId,
				cfg,
				entry: created.entry,
				sessionKey: created.key,
				storePath: created.storePath
			}));
		} catch (error) {
			sessionLog.warn(`session diff baseline capture failed for ${created.key}: ${formatErrorMessage(error)}`);
		}
	};
	const created = await createGatewaySession({
		cfg,
		key: sessionKey,
		agentId: sessionAgentId,
		label: p.label,
		generatedDisplayName,
		...catalogTarget ? { catalogTarget: catalogTarget.target } : { model: p.model },
		thinkingLevel: p.thinkingLevel,
		incognito: p.incognito,
		...client?.connect ? { requestingOperatorScopes: clientScopes } : {},
		visibility: p.visibility,
		allowExistingModelSelection,
		parentSessionKey: p.parentSessionKey,
		spawnDepth: p.spawnDepth,
		spawnToolPolicy: sessionCreation.via === "spawn" && sessionCreation.inheritedToolPolicy ? {
			...sessionCreation.inheritedToolPolicy,
			...sessionCreation.completionOwnerSessionKey ? { completionOwnerSessionKey: sessionCreation.completionOwnerSessionKey } : {}
		} : void 0,
		spawnedCwd: sessionCwd,
		worktree: sessionWorktree ? {
			id: sessionWorktree.id,
			branch: sessionWorktree.branch,
			repoRoot: sessionWorktree.repoRoot
		} : void 0,
		execNode: requestedExecNode,
		execCwd: sessionExecCwd,
		clearExecBinding: !requestedExecNode,
		clearSpawnedCwd: !sessionCwd,
		fork: p.fork,
		succeedsParent: p.succeedsParent,
		emitCommandHooks: p.emitCommandHooks,
		resetMainWhenUnspecified: !hasInitialTurn,
		commandSource: "webchat",
		creation: sessionCreation,
		authorizedPluginId: normalizeOptionalString(client?.internal?.pluginRuntimeOwnerId),
		loadGatewayModelCatalog: () => context.loadGatewayModelCatalog({ agentId: modelCatalogAgentId }),
		afterCreate: async ({ key, agentId, entry, storePath }) => {
			await captureCreatedSessionBaseline({
				key,
				agentId,
				entry,
				storePath
			});
			if (hasInitialTurn) {
				messageSeq = await readSessionMessageCountAsync({
					agentId,
					sessionEntry: entry,
					sessionId: entry.sessionId,
					sessionKey: key,
					storePath
				}) + 1;
				await expectDefined(chatHandlers["chat.send"], "chat.send handler")({
					req,
					params: {
						sessionKey: key,
						...key === "global" ? { agentId } : {},
						message: initialMessage ?? "",
						idempotencyKey: randomUUID(),
						...initialAttachments ? { attachments: initialAttachments } : {}
					},
					respond: (ok, payload, error, meta) => {
						if (ok && payload && typeof payload === "object") runPayload = payload;
						else runError = error;
						runMeta = meta;
					},
					context,
					client,
					isWebchatConnect
				});
			}
		}
	});
	if (!created.ok) {
		if (sessionWorktree && provisionedSessionWorktree) try {
			await managedWorktrees.remove({
				id: sessionWorktree.id,
				reason: "session-create-failed",
				force: true
			});
		} catch (error) {
			sessionLog.warn(`failed to clean up worktree after session creation failed: ${formatErrorMessage(error)}`);
		}
		respond(false, void 0, created.error);
		return;
	}
	if (p.worktree !== true) try {
		const owned = managedWorktrees.findLiveByOwner("session", created.key);
		if (owned) await managedWorktrees.removeIfLossless(owned.id);
	} catch (error) {
		sessionLog.warn(`failed to release worktree for reset session ${created.key}: ${formatErrorMessage(error)}`);
	}
	if (created.resetExisting) await captureCreatedSessionBaseline({
		key: created.key,
		agentId: created.agentId,
		entry: created.entry,
		storePath: resolveGatewaySessionStoreTarget({
			cfg,
			key: created.key,
			agentId: created.agentId
		}).storePath
	});
	const createdWorktree = sessionWorktree ? {
		id: sessionWorktree.id,
		path: sessionWorktree.path,
		branch: sessionWorktree.branch
	} : void 0;
	const responseEntry = sessionEntryForkedFromParent(created.entry) ? {
		...created.entry,
		forkedFromParent: true
	} : created.entry;
	if (created.resetExisting) {
		respond(true, {
			ok: true,
			key: created.key,
			sessionId: created.entry.sessionId,
			entry: responseEntry,
			resolved: created.resolved,
			runStarted: false,
			...createdWorktree ? { worktree: createdWorktree } : {}
		}, void 0);
		emitSessionsChanged(context, {
			sessionKey: created.key,
			...created.key === "global" ? { agentId: created.agentId } : {},
			reason: "new"
		});
		return;
	}
	const runStarted = runPayload !== void 0 && shouldAttachPendingMessageSeq({
		payload: runPayload,
		cached: runMeta?.cached === true
	});
	respond(true, {
		ok: true,
		key: created.key,
		sessionId: created.entry.sessionId,
		entry: responseEntry,
		runStarted,
		...runPayload ? runPayload : {},
		...runStarted && typeof messageSeq === "number" ? { messageSeq } : {},
		...runError ? { runError } : {},
		resolved: created.resolved,
		...createdWorktree ? { worktree: createdWorktree } : {}
	}, void 0);
	emitSessionsChanged(context, {
		sessionKey: created.key,
		...created.key === "global" ? { agentId: created.agentId } : {},
		reason: "create"
	});
	if (runStarted) emitSessionsChanged(context, {
		sessionKey: created.key,
		...created.key === "global" ? { agentId: created.agentId } : {},
		reason: "send"
	});
} };
//#endregion
export { shouldAttachPendingMessageSeq as n, sessionCreateHandlers as t };
