import { A as withPluginRuntimeGatewayRequestScope, d as getActivePluginRegistry, k as getPluginRuntimeGatewayRequestScope, l as getActivePluginHttpRouteRegistry } from "./runtime-yJAYArQt.js";
import { h as createPluginGatewayMethodDescriptors, m as createGatewayMethodRegistry, p as createGatewayMethodDescriptorsFromHandlers } from "./loader-si71apUX.js";
import { i as gatewayStartupUnavailableDetails } from "./startup-unavailable-CRTM-3cy.js";
import { n as authorizeOperatorScopesForMethod, r as authorizeOperatorScopesForRequiredScope, s as resolveLeastPrivilegeOperatorScopesForMethod } from "./method-scopes-ChuOr7sh.js";
import { n as createCoreGatewayMethodDescriptors, r as isCoreGatewayMethodClassified, s as listCoreGatewayHandlerMethodNames } from "./core-descriptors-Bngx0C2m.js";
import { l as isOperatorScope, t as ADMIN_SCOPE } from "./operator-scopes-Dw7Gu2cA.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as getGatewaySuspendAdmissionPhase, g as tryBeginGatewayRootWorkAdmission, o as isGatewayRestartDraining } from "./gateway-work-admission-D_DdbtmL.js";
import { a as errorShape, o as missingScopeErrorShape } from "./error-codes-P4fBo0lR.js";
import { f as resolveSessionMutationAuthorization, t as SessionMutationAuthorizationChangedError } from "./session-sharing-CSGmZX63.js";
import { n as consumeControlPlaneWriteBudget, t as CONTROL_PLANE_RATE_LIMIT_WINDOW_MS } from "./control-plane-rate-limit-BtKY9m7Q.js";
import { n as resolveControlPlaneActor, t as formatControlPlaneActor } from "./control-plane-audit-CN8L3SYx.js";
import { n as parseGatewayRole, t as isRoleAuthorizedForMethod } from "./role-policy-D31GMZVt.js";
//#region src/gateway/server-methods/lazy-core-handlers.ts
function lazyHandlerModule(loadModule, selectHandlers) {
	let handlersPromise = null;
	return () => handlersPromise ??= loadModule().then(selectHandlers);
}
function createLazyCoreHandlers(params) {
	return Object.fromEntries(params.methods.map((method) => [method, async (opts) => {
		const handler = (await params.loadHandlers())[method];
		if (!handler) throw new Error(`lazy gateway handler not found: ${method}`);
		await handler(opts);
	}]));
}
//#endregion
//#region src/gateway/server-methods.ts
const CORE_GATEWAY_HANDLER_MODULES = {
	agent: () => import("./agent-pnuVIat8.js").then((module) => module.agentHandlers),
	"agent-identity": () => import("./agent-identity-BDBliwMO.js").then((module) => module.agentIdentityHandlers),
	agents: () => import("./agents-CN8HKY-S.js").then((module) => module.agentsHandlers),
	"agents-workspace": () => import("./agents-workspace-B0zysbXZ.js").then((module) => module.agentsWorkspaceHandlers),
	artifacts: () => import("./artifacts-_ksCefUL.js").then((module) => module.artifactsHandlers),
	board: () => import("./board-jHY1QK8X.js").then((module) => module.boardHandlers),
	audit: () => import("./audit-DSRrwRuj.js").then((module) => module.auditHandlers),
	users: () => import("./users-BDKP4CBL.js").then((module) => module.usersHandlers),
	attach: () => import("./attach-C8t2Lbbo.js").then((module) => module.attachHandlers),
	channels: () => import("./channels-Ccm4_eGZ.js").then((module) => module.channelsHandlers),
	"channel-pairing": () => import("./channel-pairing-wWNFc_wg.js").then((module) => module.channelPairingHandlers),
	chat: () => import("./chat-Dienltb-.js").then((module) => module.chatHandlers),
	commands: () => import("./commands-CCDqHZFr.js").then((module) => module.commandsHandlers),
	config: () => import("./config-C-JrfQGC.js").then((module) => module.configHandlers),
	conversations: () => import("./conversations-TTk6LB6c.js").then((module) => module.conversationHandlers),
	connect: () => import("./connect-Culw5M5d.js").then((module) => module.connectHandlers),
	"control-ui": () => import("./control-ui-D8a5uzeZ.js").then((module) => module.controlUiHandlers),
	cron: () => import("./cron-DzZArlEY.js").then((module) => module.cronHandlers),
	devices: () => import("./devices-BjMbXcxC.js").then((module) => module.deviceHandlers),
	"device-pair-setup": () => import("./device-pair-setup-CdaAtb2k.js").then((module) => module.devicePairSetupHandlers),
	diagnostics: () => import("./diagnostics-DG_b8IT9.js").then((module) => module.diagnosticsHandlers),
	doctor: () => import("./doctor-CRl-xk-l.js").then((module) => module.doctorHandlers),
	environments: () => import("./environments-CYwZ22Pt.js").then((module) => module.environmentsHandlers),
	worktrees: () => import("./worktrees-DGuUvmFt.js").then((module) => module.worktreesHandlers),
	"exec-approvals": () => import("./exec-approvals-CJiPY2IT.js").then((module) => module.execApprovalsHandlers),
	fs: () => import("./fs-CeS-XPOH.js").then((module) => module.fsHandlers),
	health: () => import("./health-Cct1bd65.js").then((module) => module.healthHandlers),
	logs: () => import("./logs-CKcMVdRF.js").then((module) => module.logsHandlers),
	"memory-search": () => import("./memory-search-BF4rEwEJ.js").then((module) => module.memorySearchHandlers),
	terminal: () => import("./terminal-CroYfatB.js").then((module) => module.terminalHandlers),
	"ui-command": () => import("./ui-command-BVkyadDV.js").then((module) => module.uiCommandHandlers),
	"models-auth-status": () => import("./models-auth-status-6sNztK64.js").then((module) => module.modelsAuthStatusHandlers),
	models: () => import("./models-BTD4lPza.js").then((module) => module.modelsHandlers),
	"models-probe": () => import("./models-probe-D96MfU0a.js").then((module) => module.modelsProbeHandlers),
	"native-hook-relay": () => import("./native-hook-relay-t76v959m.js").then((module) => module.nativeHookRelayHandlers),
	"nodes-pending": () => import("./nodes-pending-DATCs5rb.js").then((module) => module.nodePendingHandlers),
	nodes: () => import("./nodes-KhueBa9l.js").then((module) => module.nodeHandlers),
	"plugin-host-hooks": () => import("./plugin-host-hooks-CPVxynKl.js").then((module) => module.pluginHostHookHandlers),
	plugins: () => import("./plugins-CJ8Zbje5.js").then((module) => module.pluginsHandlers),
	migrations: () => import("./migrations-CzI5vo8V.js").then((module) => module.migrationsHandlers),
	push: () => import("./push-KKAxDzeF.js").then((module) => module.pushHandlers),
	restart: () => import("./restart-BCwl6cLu.js").then((module) => module.restartHandlers),
	suspend: () => import("./suspend-BT8iG85G.js").then((module) => module.suspendHandlers),
	send: () => import("./send-DG2-d4hP.js").then((module) => module.sendHandlers),
	"sessions-files": () => import("./sessions-files-B3CDCm_t.js").then((module) => module.sessionsFilesHandlers),
	"sessions-diff": () => import("./sessions-diff-DLL8Yf19.js").then((module) => module.sessionsDiffHandlers),
	"sessions-abort": () => import("./sessions-abort-DpN8Dlpi.js").then((module) => module.sessionAbortHandlers),
	"sessions-compact": () => import("./sessions-compact-COrbXpkZ.js").then((module) => module.sessionCompactHandlers),
	"sessions-compaction-checkpoints": () => import("./sessions-compaction-checkpoints-CMO-Wnem.js").then((module) => module.sessionCheckpointHandlers),
	"sessions-compaction-queries": () => import("./sessions-compaction-queries-D1Xy-LgE.js").then((module) => module.sessionCheckpointQueryHandlers),
	"sessions-create": () => import("./sessions-create-Cb3WkaZ_.js").then((module) => module.sessionCreateHandlers),
	"sessions-delete": () => import("./sessions-delete-BQ0JtRLx.js").then((module) => module.sessionDeleteHandlers),
	"sessions-dispatch": () => import("./sessions-dispatch-CIl_szOB.js").then((module) => module.sessionDispatchHandlers),
	"sessions-groups": () => import("./sessions-groups-T6xIKP9E.js").then((module) => module.sessionGroupHandlers),
	"sessions-messaging": () => import("./sessions-messaging-DraIN6jW.js").then((module) => module.sessionMessagingHandlers),
	"sessions-mutations": () => import("./sessions-mutations-DXYZBPkA.js").then((module) => module.sessionMutationHandlers),
	"sessions-read": () => import("./sessions-read-Cnzr2BV1.js").then((module) => module.sessionReadHandlers),
	"sessions-rewind": () => import("./sessions-rewind-RSb8_xKN.js").then((module) => module.sessionRewindHandlers),
	"sessions-sharing": () => import("./sessions-sharing-D1ZPL_ap.js").then((module) => module.sessionSharingHandlers),
	"sessions-subscriptions": () => import("./sessions-subscriptions-CWgTV8ij.js").then((module) => module.sessionSubscriptionHandlers),
	"sessions-suggestions": () => import("./sessions-suggestions-B5d1c7Sb.js").then((module) => module.sessionSuggestionHandlers),
	"session-catalog": () => import("./session-catalog-CP_mqskv.js").then((module) => module.sessionCatalogHandlers),
	"session-discussion": () => import("./session-discussion-U8p70l53.js").then((module) => module.sessionDiscussionHandlers),
	"session-observer-rpc": () => import("./session-observer-rpc-B0fBqz9q.js").then((module) => module.sessionObserverHandlers),
	"session-companion-rpc": () => import("./session-companion-rpc-YhmqzQWr.js").then((module) => module.sessionCompanionHandlers),
	"hooks-status": () => import("./hooks-status-DOI02mN_.js").then((module) => module.hooksStatusHandlers),
	skills: () => import("./skills-DCXsuQ3G.js").then((module) => module.skillsHandlers),
	system: () => import("./system-4y4EJle9.js").then((module) => module.systemHandlers),
	talk: () => import("./talk-B6cGpCRW.js").then((module) => module.talkHandlers),
	tasks: () => import("./tasks-cZR95TlR.js").then((module) => module.tasksHandlers),
	"task-suggestions": () => import("./task-suggestions-Ba_A9Y4E.js").then((module) => module.taskSuggestionsHandlers),
	"tools-catalog": () => import("./tools-catalog-o8GHR2Od.js").then((module) => module.toolsCatalogHandlers),
	"tools-effective": () => import("./tools-effective-D2YP_c_S.js").then((module) => module.toolsEffectiveHandlers),
	"tools-invoke": () => import("./tools-invoke-DwOXrrAR.js").then((module) => module.toolsInvokeHandlers),
	"mcp-app": () => import("./mcp-app-CBuB77Ya.js").then((module) => module.mcpAppHandlers),
	tts: () => import("./tts-Df5xuhVc.js").then((module) => module.ttsHandlers),
	update: () => import("./update-BxbhIWEf.js").then((module) => module.updateHandlers),
	usage: () => import("./usage-P8QoX3d-.js").then((module) => module.usageHandlers),
	"voicewake-routing": () => import("./voicewake-routing-DYVfeguB.js").then((module) => module.voicewakeRoutingHandlers),
	voicewake: () => import("./voicewake-BXyDZX8Q.js").then((module) => module.voicewakeHandlers),
	web: () => import("./web-JvP-V5lR.js").then((module) => module.webHandlers),
	"system-agent": () => import("./system-agent-CiMPN2PY.js").then((module) => module.systemAgentHandlers),
	"system-changes": () => import("./system-changes-CQ0LRloY.js").then((module) => module.systemChangesHandlers),
	wizard: () => import("./wizard-BtFCxWIQ.js").then((module) => module.wizardHandlers)
};
function authorizeGatewayMethod(method, client, params, methodRegistry) {
	if (!client?.connect) return null;
	if (method === "health") return null;
	const roleRaw = client.connect.role ?? "operator";
	const role = parseGatewayRole(roleRaw);
	if (!role) return errorShape(ErrorCodes.INVALID_REQUEST, `unauthorized role: ${roleRaw}`);
	const scopes = client.connect.scopes ?? [];
	if (!isRoleAuthorizedForMethod(role, method)) return errorShape(ErrorCodes.INVALID_REQUEST, `unauthorized role: ${role}`);
	if (role === "node") return null;
	if (scopes.includes("operator.admin")) return null;
	const registeredScope = methodRegistry.getScope(method);
	const scopeAuth = isOperatorScope(registeredScope) ? authorizeOperatorScopesForRequiredScope(registeredScope, scopes) : authorizeOperatorScopesForMethod(method, scopes, params);
	if (!scopeAuth.allowed) {
		const resolvedRequiredScopes = isOperatorScope(registeredScope) ? [registeredScope] : resolveLeastPrivilegeOperatorScopesForMethod(method, params);
		return missingScopeErrorShape({
			missingScope: scopeAuth.missingScope,
			requiredScopes: resolvedRequiredScopes.length > 0 ? resolvedRequiredScopes : [scopeAuth.missingScope]
		});
	}
	return null;
}
const SUSPEND_CONTROL_METHODS = /* @__PURE__ */ new Set([
	"gateway.suspend.prepare",
	"gateway.suspend.status",
	"gateway.suspend.resume"
]);
function isGatewayMethodAllowedDuringSuspension(method) {
	return SUSPEND_CONTROL_METHODS.has(method);
}
const coreGatewayHandlerMethodNames = listCoreGatewayHandlerMethodNames();
const coreGatewayHandlerModules = Object.entries(CORE_GATEWAY_HANDLER_MODULES);
const coreGatewayHandlers = Object.fromEntries(coreGatewayHandlerModules.flatMap(([family, loadModule]) => Object.entries(createLazyCoreHandlers({
	methods: coreGatewayHandlerMethodNames.get(family) ?? [],
	loadHandlers: lazyHandlerModule(loadModule, (handlers) => handlers)
}))));
/** Builds the per-request method registry from core, plugin, and explicit extra handlers. */
function createRequestGatewayMethodRegistry(extraHandlers) {
	const gatewayPluginRegistry = getActivePluginHttpRouteRegistry();
	const gatewayPluginHandlers = gatewayPluginRegistry?.gatewayHandlers ?? {};
	const extraHandlerEntries = Object.entries(extraHandlers ?? {});
	const pluginMethodNames = new Set(Object.keys(gatewayPluginHandlers));
	const coreDescriptorHandlers = { ...coreGatewayHandlers };
	for (const [method, extraHandler] of extraHandlerEntries) if (!pluginMethodNames.has(method) && isCoreGatewayMethodClassified(method)) coreDescriptorHandlers[method] = extraHandler;
	const coreDescriptors = createCoreGatewayMethodDescriptors(coreDescriptorHandlers);
	for (const descriptor of coreDescriptors) {
		const extraHandler = extraHandlers?.[descriptor.name];
		if (extraHandler && !pluginMethodNames.has(descriptor.name)) descriptor.handler = extraHandler;
	}
	const coreMethodNames = new Set(coreDescriptors.map((descriptor) => descriptor.name));
	const auxHandlers = Object.fromEntries(extraHandlerEntries.filter(([method]) => !pluginMethodNames.has(method) && !coreMethodNames.has(method)));
	return createGatewayMethodRegistry([
		...coreDescriptors,
		...gatewayPluginRegistry ? createPluginGatewayMethodDescriptors(gatewayPluginRegistry) : [],
		...createGatewayMethodDescriptorsFromHandlers({
			handlers: auxHandlers,
			owner: {
				kind: "aux",
				area: "gateway-extra"
			},
			defaultScope: ADMIN_SCOPE
		})
	], gatewayPluginRegistry ?? void 0);
}
/** Authorizes and dispatches one gateway JSON-RPC-style request. */
async function handleGatewayRequest(opts) {
	const { req, respond, client, isWebchatConnect, context, signal } = opts;
	const methodRegistry = opts.methodRegistry?.getHandler(req.method) !== void 0 ? opts.methodRegistry : createRequestGatewayMethodRegistry(opts.extraHandlers);
	const authError = authorizeGatewayMethod(req.method, client, req.params, methodRegistry);
	if (authError) {
		respond(false, void 0, authError);
		return;
	}
	const sessionMutation = resolveSessionMutationAuthorization({
		client: client ?? null,
		method: req.method,
		requestParams: req.params,
		context
	});
	if (sessionMutation.error) {
		respond(false, void 0, sessionMutation.error);
		return;
	}
	if (client?.connect.role === "node" && (!client.connId || !await context.nodeRegistry.isConnectionCurrentPairingState(client.connId))) {
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "node pairing changed before request dispatch", {
			retryable: true,
			details: { code: "PAIRING_CHANGED" }
		}));
		return;
	}
	if (context.unavailableGatewayMethods?.has(req.method)) {
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `${req.method} unavailable during gateway startup`, {
			retryable: true,
			retryAfterMs: 500,
			details: {
				...gatewayStartupUnavailableDetails(),
				method: req.method
			}
		}));
		return;
	}
	const rejectRateLimitedControlPlaneWrite = () => {
		if (!methodRegistry.isControlPlaneWrite(req.method)) return false;
		const budget = consumeControlPlaneWriteBudget({
			client,
			method: req.method
		});
		if (budget.allowed) return false;
		const actor = resolveControlPlaneActor(client);
		context.logGateway.warn(`control-plane write rate-limited method=${req.method} ${formatControlPlaneActor(actor)} retryAfterMs=${budget.retryAfterMs} key=${budget.key}`);
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `rate limit exceeded for ${req.method}; retry after ${Math.ceil(budget.retryAfterMs / 1e3)}s`, {
			retryable: true,
			retryAfterMs: budget.retryAfterMs,
			details: {
				method: req.method,
				limit: `30 per ${CONTROL_PLANE_RATE_LIMIT_WINDOW_MS / 1e3}s`
			}
		}));
		return true;
	};
	const isSuspendPrepare = req.method === "gateway.suspend.prepare";
	if (isSuspendPrepare && rejectRateLimitedControlPlaneWrite()) return;
	const handler = methodRegistry.getHandler(req.method);
	if (!handler) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `unknown method: ${req.method}`));
		return;
	}
	const rootWorkAdmission = tryBeginGatewayRootWorkAdmission();
	if (req.method === "gateway.suspend.prepare" && rootWorkAdmission && !rootWorkAdmission.ownsRoot) {
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "gateway suspension cannot begin from a nested request", {
			retryable: true,
			retryAfterMs: 1e3,
			details: {
				method: req.method,
				reason: "nested-gateway-request"
			}
		}));
		return;
	}
	if (!rootWorkAdmission && !isGatewayMethodAllowedDuringSuspension(req.method)) {
		const restartDraining = isGatewayRestartDraining();
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `${req.method} unavailable during gateway ${restartDraining ? "restart" : "suspension"}`, {
			retryable: true,
			retryAfterMs: 1e3,
			details: {
				method: req.method,
				reason: restartDraining ? "gateway-restarting" : "gateway-suspending",
				phase: getGatewaySuspendAdmissionPhase()
			}
		}));
		return;
	}
	if (!isSuspendPrepare && rejectRateLimitedControlPlaneWrite()) {
		rootWorkAdmission?.release();
		return;
	}
	const invokeHandler = () => handler({
		req,
		params: req.params ?? {},
		client,
		isWebchatConnect,
		respond,
		context,
		...signal ? { signal } : {},
		...sessionMutation.authorization ? { sessionMutationAuthorization: sessionMutation.authorization } : {}
	});
	const invokeWithRequestScope = async () => {
		try {
			const pluginRegistry = methodRegistry.pluginRegistry ?? getPluginRuntimeGatewayRequestScope()?.pluginRegistry ?? getActivePluginRegistry() ?? void 0;
			await withPluginRuntimeGatewayRequestScope({
				context,
				client,
				isWebchatConnect,
				...pluginRegistry ? { pluginRegistry } : {}
			}, invokeHandler);
		} catch (error) {
			if (error instanceof SessionMutationAuthorizationChangedError) {
				respond(false, void 0, error.error);
				return;
			}
			throw error;
		}
	};
	if (!rootWorkAdmission) {
		await invokeWithRequestScope();
		return;
	}
	try {
		await rootWorkAdmission.run(invokeWithRequestScope);
	} finally {
		rootWorkAdmission.release();
	}
}
//#endregion
export { handleGatewayRequest as n, coreGatewayHandlers as t };
