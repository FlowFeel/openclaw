import { A as withPluginRuntimeGatewayRequestScope, d as getActivePluginRegistry, k as getPluginRuntimeGatewayRequestScope, l as getActivePluginHttpRouteRegistry } from "./runtime-CaHHk1Cp.js";
import { h as createPluginGatewayMethodDescriptors, m as createGatewayMethodRegistry, p as createGatewayMethodDescriptorsFromHandlers } from "./loader-K91ivsg3.js";
import { i as gatewayStartupUnavailableDetails } from "./startup-unavailable-CRTM-3cy.js";
import { n as authorizeOperatorScopesForMethod, r as authorizeOperatorScopesForRequiredScope, s as resolveLeastPrivilegeOperatorScopesForMethod } from "./method-scopes-BjvieIQW.js";
import { n as createCoreGatewayMethodDescriptors, r as isCoreGatewayMethodClassified, s as listCoreGatewayHandlerMethodNames } from "./core-descriptors-Bngx0C2m.js";
import { l as isOperatorScope, t as ADMIN_SCOPE } from "./operator-scopes-Dw7Gu2cA.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as getGatewaySuspendAdmissionPhase, g as tryBeginGatewayRootWorkAdmission, o as isGatewayRestartDraining } from "./gateway-work-admission-D_DdbtmL.js";
import { a as errorShape, o as missingScopeErrorShape } from "./error-codes-P4fBo0lR.js";
import { f as resolveSessionMutationAuthorization, t as SessionMutationAuthorizationChangedError } from "./session-sharing-Bfvp5krg.js";
import { n as consumeControlPlaneWriteBudget, t as CONTROL_PLANE_RATE_LIMIT_WINDOW_MS } from "./control-plane-rate-limit-BtKY9m7Q.js";
import { n as resolveControlPlaneActor, t as formatControlPlaneActor } from "./control-plane-audit-CN8L3SYx.js";
import { n as parseGatewayRole, t as isRoleAuthorizedForMethod } from "./role-policy-B6Kfcqkk.js";
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
	agent: () => import("./agent-BfDikKlA.js").then((module) => module.agentHandlers),
	"agent-identity": () => import("./agent-identity-D0ooF_MY.js").then((module) => module.agentIdentityHandlers),
	agents: () => import("./agents-DvHApgkq.js").then((module) => module.agentsHandlers),
	"agents-workspace": () => import("./agents-workspace-B0zysbXZ.js").then((module) => module.agentsWorkspaceHandlers),
	artifacts: () => import("./artifacts-leKm6bH8.js").then((module) => module.artifactsHandlers),
	board: () => import("./board-CArMu1JG.js").then((module) => module.boardHandlers),
	audit: () => import("./audit-DSRrwRuj.js").then((module) => module.auditHandlers),
	users: () => import("./users-BDKP4CBL.js").then((module) => module.usersHandlers),
	attach: () => import("./attach-BvKuNlCD.js").then((module) => module.attachHandlers),
	channels: () => import("./channels-qf9YrD4y.js").then((module) => module.channelsHandlers),
	"channel-pairing": () => import("./channel-pairing-CUiyMyCr.js").then((module) => module.channelPairingHandlers),
	chat: () => import("./chat-BrsX-W7C.js").then((module) => module.chatHandlers),
	commands: () => import("./commands-DW7_pAMu.js").then((module) => module.commandsHandlers),
	config: () => import("./config-DA3oV4_H.js").then((module) => module.configHandlers),
	conversations: () => import("./conversations-DH5wfmcb.js").then((module) => module.conversationHandlers),
	connect: () => import("./connect-Culw5M5d.js").then((module) => module.connectHandlers),
	"control-ui": () => import("./control-ui-DQkYGDN9.js").then((module) => module.controlUiHandlers),
	cron: () => import("./cron-B8cMxYiZ.js").then((module) => module.cronHandlers),
	devices: () => import("./devices-Bw3dKOWx.js").then((module) => module.deviceHandlers),
	"device-pair-setup": () => import("./device-pair-setup-CdaAtb2k.js").then((module) => module.devicePairSetupHandlers),
	diagnostics: () => import("./diagnostics-DG_b8IT9.js").then((module) => module.diagnosticsHandlers),
	doctor: () => import("./doctor-ADJnFKZE.js").then((module) => module.doctorHandlers),
	environments: () => import("./environments-CYwZ22Pt.js").then((module) => module.environmentsHandlers),
	worktrees: () => import("./worktrees-DQI6iYKr.js").then((module) => module.worktreesHandlers),
	"exec-approvals": () => import("./exec-approvals-CUtaV32X.js").then((module) => module.execApprovalsHandlers),
	fs: () => import("./fs-CzQMw4Kk.js").then((module) => module.fsHandlers),
	health: () => import("./health-gZAprBou.js").then((module) => module.healthHandlers),
	logs: () => import("./logs-CKcMVdRF.js").then((module) => module.logsHandlers),
	"memory-search": () => import("./memory-search-BgsZ5Ziu.js").then((module) => module.memorySearchHandlers),
	terminal: () => import("./terminal-DwaEwMoY.js").then((module) => module.terminalHandlers),
	"ui-command": () => import("./ui-command-BVkyadDV.js").then((module) => module.uiCommandHandlers),
	"models-auth-status": () => import("./models-auth-status-BLe3a5yk.js").then((module) => module.modelsAuthStatusHandlers),
	models: () => import("./models-uOAQz8_g.js").then((module) => module.modelsHandlers),
	"models-probe": () => import("./models-probe-Ddgbkf_t.js").then((module) => module.modelsProbeHandlers),
	"native-hook-relay": () => import("./native-hook-relay-DkokWu8r.js").then((module) => module.nativeHookRelayHandlers),
	"nodes-pending": () => import("./nodes-pending-CMLOvBvy.js").then((module) => module.nodePendingHandlers),
	nodes: () => import("./nodes-BzC0_kIO.js").then((module) => module.nodeHandlers),
	"plugin-host-hooks": () => import("./plugin-host-hooks-DJjusq23.js").then((module) => module.pluginHostHookHandlers),
	plugins: () => import("./plugins-Q03JacR5.js").then((module) => module.pluginsHandlers),
	migrations: () => import("./migrations-CWA_RvyC.js").then((module) => module.migrationsHandlers),
	push: () => import("./push-KKAxDzeF.js").then((module) => module.pushHandlers),
	restart: () => import("./restart-Bnwzbgi9.js").then((module) => module.restartHandlers),
	suspend: () => import("./suspend-gVFmYMU7.js").then((module) => module.suspendHandlers),
	send: () => import("./send-CIvVsE_M.js").then((module) => module.sendHandlers),
	"sessions-files": () => import("./sessions-files-DhJW9i1j.js").then((module) => module.sessionsFilesHandlers),
	"sessions-diff": () => import("./sessions-diff-Ca7UZuve.js").then((module) => module.sessionsDiffHandlers),
	"sessions-abort": () => import("./sessions-abort-DzGYuTZv.js").then((module) => module.sessionAbortHandlers),
	"sessions-compact": () => import("./sessions-compact-C8jdHg2a.js").then((module) => module.sessionCompactHandlers),
	"sessions-compaction-checkpoints": () => import("./sessions-compaction-checkpoints-DcT5ntpA.js").then((module) => module.sessionCheckpointHandlers),
	"sessions-compaction-queries": () => import("./sessions-compaction-queries-aXC3V52Q.js").then((module) => module.sessionCheckpointQueryHandlers),
	"sessions-create": () => import("./sessions-create-zsZzZ8bB.js").then((module) => module.sessionCreateHandlers),
	"sessions-delete": () => import("./sessions-delete-DXuUgwpv.js").then((module) => module.sessionDeleteHandlers),
	"sessions-dispatch": () => import("./sessions-dispatch-CkTq9YpQ.js").then((module) => module.sessionDispatchHandlers),
	"sessions-groups": () => import("./sessions-groups-SREcEVLG.js").then((module) => module.sessionGroupHandlers),
	"sessions-messaging": () => import("./sessions-messaging-B0jWVg-E.js").then((module) => module.sessionMessagingHandlers),
	"sessions-mutations": () => import("./sessions-mutations-CD8Bcdq2.js").then((module) => module.sessionMutationHandlers),
	"sessions-read": () => import("./sessions-read-By6bOiqJ.js").then((module) => module.sessionReadHandlers),
	"sessions-rewind": () => import("./sessions-rewind-BwcYP-T4.js").then((module) => module.sessionRewindHandlers),
	"sessions-sharing": () => import("./sessions-sharing-hu-NK4sf.js").then((module) => module.sessionSharingHandlers),
	"sessions-subscriptions": () => import("./sessions-subscriptions-0HoObrR-.js").then((module) => module.sessionSubscriptionHandlers),
	"sessions-suggestions": () => import("./sessions-suggestions-cx7ZmD8x.js").then((module) => module.sessionSuggestionHandlers),
	"session-catalog": () => import("./session-catalog-CPICnPVj.js").then((module) => module.sessionCatalogHandlers),
	"session-discussion": () => import("./session-discussion-DjYwjMb2.js").then((module) => module.sessionDiscussionHandlers),
	"session-observer-rpc": () => import("./session-observer-rpc-B0fBqz9q.js").then((module) => module.sessionObserverHandlers),
	"session-companion-rpc": () => import("./session-companion-rpc-CJI7nxzF.js").then((module) => module.sessionCompanionHandlers),
	"hooks-status": () => import("./hooks-status-CkuhBVam.js").then((module) => module.hooksStatusHandlers),
	skills: () => import("./skills-pbYiMMYw.js").then((module) => module.skillsHandlers),
	system: () => import("./system-CcWJGRf5.js").then((module) => module.systemHandlers),
	talk: () => import("./talk-BZMGb_vB.js").then((module) => module.talkHandlers),
	tasks: () => import("./tasks-1PADInJA.js").then((module) => module.tasksHandlers),
	"task-suggestions": () => import("./task-suggestions-CErw8gNu.js").then((module) => module.taskSuggestionsHandlers),
	"tools-catalog": () => import("./tools-catalog-DKx8bzvM.js").then((module) => module.toolsCatalogHandlers),
	"tools-effective": () => import("./tools-effective-CcB2Y1yt.js").then((module) => module.toolsEffectiveHandlers),
	"tools-invoke": () => import("./tools-invoke-YYBXhYnn.js").then((module) => module.toolsInvokeHandlers),
	"mcp-app": () => import("./mcp-app-BlMkPnTV.js").then((module) => module.mcpAppHandlers),
	tts: () => import("./tts-svYGuD_0.js").then((module) => module.ttsHandlers),
	update: () => import("./update-BpFE8XOu.js").then((module) => module.updateHandlers),
	usage: () => import("./usage-Bc9N2zK2.js").then((module) => module.usageHandlers),
	"voicewake-routing": () => import("./voicewake-routing-DYVfeguB.js").then((module) => module.voicewakeRoutingHandlers),
	voicewake: () => import("./voicewake-BXyDZX8Q.js").then((module) => module.voicewakeHandlers),
	web: () => import("./web-C70X-cl7.js").then((module) => module.webHandlers),
	"system-agent": () => import("./system-agent-BIV8h2A0.js").then((module) => module.systemAgentHandlers),
	"system-changes": () => import("./system-changes-CQ0LRloY.js").then((module) => module.systemChangesHandlers),
	wizard: () => import("./wizard-Cm9XcuTV.js").then((module) => module.wizardHandlers)
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
