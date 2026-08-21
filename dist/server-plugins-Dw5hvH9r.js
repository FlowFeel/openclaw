import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { C as resolveExpiresAtMsFromDurationMs, m as isFutureDateTimestampMs } from "./number-coercion-Crk_c9KW.js";
import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { i as resolveGlobalSingleton, n as resolveGlobalMap } from "./global-singleton-Dc_stLtU.js";
import { a as parseModelCatalogRef } from "./model-catalog-refs-C_8nyypZ.js";
import { f as stripSelfProviderModelPrefix, s as normalizeBuiltInProviderModelId } from "./plugin-metadata-lifecycle-NcA0EWhA.js";
import { I as createEmptyPluginRegistry, d as getActivePluginRegistry, k as getPluginRuntimeGatewayRequestScope } from "./runtime-yJAYArQt.js";
import { M as activatePluginRegistry, t as loadAndActivateRootPluginRegistry } from "./loader-si71apUX.js";
import { i as getPluginModuleLoaderStats } from "./plugin-module-loader-cache-17a12qxQ.js";
import { d as extractPluginInstallRecordsFromInstalledPluginIndex } from "./installed-plugin-index-CqNI0grC.js";
import { c as normalizePluginsConfig } from "./config-state-B6-Feb6H.js";
import { o as normalizeModelRef } from "./model-ref-shared-BCBRWGJh.js";
import { n as parseModelRef } from "./model-selection-normalize-Bae-aoqX.js";
import "./method-scopes-ChuOr7sh.js";
import { t as ADMIN_SCOPE, u as normalizeOperatorScopeList } from "./operator-scopes-Dw7Gu2cA.js";
import { t as applyPluginAutoEnable } from "./plugin-auto-enable-_DwpU41E.js";
import { p as resolvePluginSubagentCompletionRequester } from "./hook-runner-global-CRNklGqK.js";
import { r as createPluginRuntimeLoaderLogger } from "./load-context-JWg4gtu_.js";
import { t as loadPluginLookUpTable } from "./plugin-lookup-table-C32fpUrq.js";
import { a as dispatchGatewayRequestInProcessRaw, n as mergePluginRuntimeClientInternal, o as unwrapGatewayMethodDispatchResponse, r as resolvePluginSubagentToolsAlsoAllow, t as createSyntheticPluginRuntimeClient } from "./server-plugin-runtime-client-LQdhZpKE.js";
import { n as getFallbackGatewayContext } from "./server-plugin-fallback-context-CA_ZMhwm.js";
import { l as resolveNodeCommandAllowlist, o as isNodeCommandAllowed } from "./node-command-policy-DdvZ7E6j.js";
import { randomUUID } from "node:crypto";
import { performance } from "node:perf_hooks";
//#region src/gateway/server-plugin-subagent-runtime.ts
function normalizePluginSubagentAllowedModelRef(raw) {
	const trimmed = raw.trim();
	if (!trimmed) return null;
	if (trimmed === "*") return "*";
	const parsed = parseModelCatalogRef(trimmed);
	if (!parsed) return null;
	const modelId = normalizeBuiltInProviderModelId(parsed.provider, stripSelfProviderModelPrefix(parsed.provider, parsed.modelId));
	return `${parsed.provider}/${modelId}`;
}
function resolvePluginSubagentRequestedModelRef(params) {
	if (params.provider && params.model) {
		const normalizedRequest = normalizeModelRef(params.provider, params.model);
		return `${normalizedRequest.provider}/${normalizedRequest.model}`;
	}
	const rawModel = params.model?.trim();
	if (!rawModel || !rawModel.includes("/")) return null;
	const parsed = parseModelRef(rawModel, "");
	if (!parsed?.provider || !parsed.model) return null;
	return `${parsed.provider}/${parsed.model}`;
}
function normalizePluginSubagentRunRuntime(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return;
	const record = value;
	const harness = typeof record.harness === "string" ? record.harness.trim() : "";
	const provider = typeof record.provider === "string" ? record.provider.trim() : "";
	const model = typeof record.model === "string" ? record.model.trim() : "";
	return harness && provider && model ? {
		harness,
		provider,
		model
	} : void 0;
}
//#endregion
//#region src/gateway/server-plugins-node-runtime.ts
function hasInProcessGatewayContext() {
	return Boolean(getPluginRuntimeGatewayRequestScope()?.context ?? getFallbackGatewayContext());
}
function projectGatewayRuntimeNodes(nodes) {
	const context = getPluginRuntimeGatewayRequestScope()?.context ?? getFallbackGatewayContext();
	return nodes.map((node) => {
		if (!node || typeof node !== "object" || Array.isArray(node) || !context?.nodeRegistry?.get || !context.getRuntimeConfig) return node;
		const nodeRecord = node;
		const nodeId = typeof nodeRecord.nodeId === "string" ? nodeRecord.nodeId : "";
		const liveNode = nodeId ? context.nodeRegistry.get(nodeId) : void 0;
		if (!liveNode) return node;
		const allowlist = resolveNodeCommandAllowlist(context.getRuntimeConfig(), {
			...liveNode,
			approvedCommands: liveNode.commands
		});
		const invocableCommands = liveNode.commands.filter((command) => isNodeCommandAllowed({
			command,
			declaredCommands: liveNode.commands,
			allowlist
		}).ok);
		return Object.assign({}, nodeRecord, { invocableCommands });
	});
}
//#endregion
//#region src/gateway/subagent-completion-tool-handoff.ts
const SUBAGENT_COMPLETION_TOOL_HANDOFF_TTL_MS = 300 * 1e3;
const handoffs = resolveGlobalMap(Symbol.for("openclaw.subagentCompletionToolHandoffs"), "close-and-restart");
function normalizeRegistration(params) {
	const sourceSessionKey = normalizeOptionalString(params.sourceSessionKey);
	const sourceSessionId = normalizeOptionalString(params.sourceSessionId);
	const targetSessionKey = normalizeOptionalString(params.targetSessionKey);
	const targetSessionId = normalizeOptionalString(params.targetSessionId);
	const idempotencyKey = normalizeOptionalString(params.idempotencyKey);
	if (!sourceSessionKey || !targetSessionKey || !targetSessionId || !idempotencyKey) return;
	return {
		sourceSessionKey,
		...sourceSessionId ? { sourceSessionId } : {},
		targetSessionKey,
		targetSessionId,
		idempotencyKey
	};
}
function pruneExpired(nowMs) {
	for (const [handoffId, entry] of handoffs) if (!isFutureDateTimestampMs(entry.expiresAtMs, { nowMs })) handoffs.delete(handoffId);
}
/** Register one short-lived capability for the exact completion delivery request. */
function registerSubagentCompletionToolHandoff(params) {
	const normalized = normalizeRegistration(params);
	if (!normalized) return;
	const nowMs = params.nowMs ?? Date.now();
	pruneExpired(nowMs);
	const expiresAtMs = resolveExpiresAtMsFromDurationMs(SUBAGENT_COMPLETION_TOOL_HANDOFF_TTL_MS, { nowMs });
	if (expiresAtMs === void 0) return;
	const handoffId = randomUUID();
	handoffs.set(handoffId, {
		...normalized,
		expiresAtMs
	});
	return handoffId;
}
/** Remove an unconsumed capability after its in-process dispatch finishes or fails. */
function cancelSubagentCompletionToolHandoff(handoffId) {
	const normalized = normalizeOptionalString(handoffId);
	return normalized ? handoffs.delete(normalized) : false;
}
/**
* Consume the capability once and bind it to the model route admitted for this run.
* Mismatches do not burn the capability; only the exact request may consume it.
*/
function consumeSubagentCompletionToolHandoff(params) {
	const handoffId = normalizeOptionalString(params.handoffId);
	const sourceSessionKey = normalizeOptionalString(params.sourceSessionKey);
	const sourceSessionId = normalizeOptionalString(params.sourceSessionId);
	const targetSessionKey = normalizeOptionalString(params.targetSessionKey);
	const targetSessionId = normalizeOptionalString(params.targetSessionId);
	const idempotencyKey = normalizeOptionalString(params.idempotencyKey);
	const provider = normalizeOptionalString(params.provider)?.toLowerCase();
	const model = normalizeOptionalString(params.model);
	if (!handoffId || !sourceSessionKey || !targetSessionKey || !targetSessionId || !idempotencyKey || !provider || !model) return;
	pruneExpired(params.nowMs ?? Date.now());
	const entry = handoffs.get(handoffId);
	if (!entry || entry.sourceSessionKey !== sourceSessionKey || entry.sourceSessionId !== sourceSessionId || entry.targetSessionKey !== targetSessionKey || entry.targetSessionId !== targetSessionId || entry.idempotencyKey !== idempotencyKey) return;
	handoffs.delete(handoffId);
	return {
		kind: "subagent-completion",
		sourceSessionKey,
		...sourceSessionId ? { sourceSessionId } : {},
		targetSessionKey,
		targetSessionId,
		provider,
		model
	};
}
//#endregion
//#region src/gateway/server-plugins.ts
const PLUGIN_SUBAGENT_POLICY_STATE_KEY = Symbol.for("openclaw.pluginSubagentOverridePolicyState");
const getPluginSubagentPolicyState = () => resolveGlobalSingleton(PLUGIN_SUBAGENT_POLICY_STATE_KEY, () => ({ policies: {} }));
function setPluginSubagentOverridePolicies(cfg) {
	const pluginSubagentPolicyState = getPluginSubagentPolicyState();
	const normalized = normalizePluginsConfig(cfg.plugins);
	const policies = {};
	for (const [pluginId, entry] of Object.entries(normalized.entries)) {
		const allowModelOverride = entry.subagent?.allowModelOverride === true;
		const hasConfiguredAllowlist = entry.subagent?.hasAllowedModelsConfig === true;
		const configuredAllowedModels = entry.subagent?.allowedModels ?? [];
		const allowedModels = /* @__PURE__ */ new Set();
		let allowAnyModel = false;
		for (const modelRef of configuredAllowedModels) {
			const normalizedModelRef = normalizePluginSubagentAllowedModelRef(modelRef);
			if (!normalizedModelRef) continue;
			if (normalizedModelRef === "*") {
				allowAnyModel = true;
				continue;
			}
			allowedModels.add(normalizedModelRef);
		}
		if (!allowModelOverride && !hasConfiguredAllowlist && allowedModels.size === 0 && !allowAnyModel) continue;
		policies[pluginId] = {
			allowModelOverride,
			allowAnyModel,
			hasConfiguredAllowlist,
			allowedModels
		};
	}
	pluginSubagentPolicyState.policies = policies;
}
function authorizeFallbackModelOverride(params) {
	const pluginSubagentPolicyState = getPluginSubagentPolicyState();
	const pluginId = params.pluginId?.trim();
	if (!pluginId) return {
		allowed: false,
		reason: "provider/model override requires plugin identity in fallback subagent runs."
	};
	const policy = pluginSubagentPolicyState.policies[pluginId];
	if (!policy?.allowModelOverride) return {
		allowed: false,
		reason: `plugin "${pluginId}" is not trusted for fallback provider/model override requests. See https://docs.openclaw.ai/plugins/sdk-runtime#api-runtime-subagent and search for: plugins.entries.<id>.subagent.allowModelOverride`
	};
	if (policy.allowAnyModel) return { allowed: true };
	if (policy.hasConfiguredAllowlist && policy.allowedModels.size === 0) return {
		allowed: false,
		reason: `plugin "${pluginId}" configured subagent.allowedModels, but none of the entries normalized to a valid provider/model target.`
	};
	if (policy.allowedModels.size === 0) return { allowed: true };
	const requestedModelRef = resolvePluginSubagentRequestedModelRef(params);
	if (!requestedModelRef) return {
		allowed: false,
		reason: "fallback provider/model overrides that use an allowlist must resolve to a canonical provider/model target."
	};
	if (policy.allowedModels.has(requestedModelRef)) return { allowed: true };
	return {
		allowed: false,
		reason: `model override "${requestedModelRef}" is not allowlisted for plugin "${pluginId}".`
	};
}
function hasAdminScope(client) {
	return (Array.isArray(client?.connect?.scopes) ? client.connect.scopes : []).includes(ADMIN_SCOPE);
}
function canClientUseModelOverride(client) {
	return hasAdminScope(client) || client?.internal?.allowModelOverride === true;
}
function canTrustedOfficialPluginRequestScopes(params) {
	if (!params.pluginId) return false;
	if (params.pluginOrigin === "bundled" || params.pluginTrustedOfficialInstall === true) return true;
	const record = getActivePluginRegistry()?.plugins.find((entry) => entry.id === params.pluginId);
	return record?.origin === "bundled" || record?.trustedOfficialInstall === true;
}
function resolveRuntimeNodeInvokeSyntheticScopes(params) {
	return params.requestedScopes && canTrustedOfficialPluginRequestScopes(params) ? params.requestedScopes : void 0;
}
async function dispatchGatewayMethodInProcessRaw(method, params, options) {
	const scope = getPluginRuntimeGatewayRequestScope();
	const context = scope?.context ?? getFallbackGatewayContext();
	const isWebchatConnect = scope?.isWebchatConnect ?? (() => false);
	if (!context) throw new Error(`In-process gateway dispatch requires a gateway request scope (method: ${method}). No scope set and no fallback context available.`);
	if (options?.requireScopedClient === true && !scope?.client) throw new Error(`In-process gateway dispatch requires an authenticated plugin request scope (method: ${method}).`);
	const pluginRuntimeOwnerId = typeof options?.pluginRuntimeOwnerId === "string" && options.pluginRuntimeOwnerId.trim() ? options.pluginRuntimeOwnerId.trim() : void 0;
	const delegatedToolPolicyHandoffId = options?.delegatedToolPolicyHandoff ? registerSubagentCompletionToolHandoff(options.delegatedToolPolicyHandoff) : void 0;
	const syntheticClient = createSyntheticPluginRuntimeClient({
		allowModelOverride: options?.allowSyntheticModelOverride === true,
		agentRunTracking: options?.agentRunTracking,
		cronRunContinuation: options?.allowSyntheticCronRunContinuation === true,
		internalDeliveryMediaUrls: options?.internalDeliveryMediaUrls,
		internalDeliverySuppressText: options?.internalDeliverySuppressText,
		...pluginRuntimeOwnerId ? { pluginRuntimeOwnerId } : {},
		...options?.pluginSubagentRequester ? { pluginSubagentRequester: options.pluginSubagentRequester } : {},
		...options?.runtimePluginToolGrant ? { runtimePluginToolGrant: options.runtimePluginToolGrant } : {},
		delegatedToolPolicyHandoffId,
		...options?.sessionCreation ? { sessionCreation: options.sessionCreation } : {},
		scopes: options?.syntheticScopes
	});
	const scopedClient = mergePluginRuntimeClientInternal(scope?.client, pluginRuntimeOwnerId || options?.agentRunTracking || options?.pluginSubagentRequester || options?.runtimePluginToolGrant || options?.delegatedToolPolicyHandoff || scope?.client?.internal?.delegatedToolPolicyHandoffId ? {
		...options?.agentRunTracking ? { agentRunTracking: options.agentRunTracking } : {},
		...pluginRuntimeOwnerId ? { pluginRuntimeOwnerId } : {},
		...options?.pluginSubagentRequester ? { pluginSubagentRequester: options.pluginSubagentRequester } : {},
		runtimePluginToolGrant: options?.runtimePluginToolGrant,
		delegatedToolPolicyHandoffId
	} : void 0);
	if (options?.disableSyntheticClient === true && !scopedClient) throw new Error(`In-process gateway dispatch requires a scoped client (method: ${method}).`);
	try {
		return await dispatchGatewayRequestInProcessRaw(method, params, {
			client: options?.forceSyntheticClient === true ? syntheticClient : scopedClient ?? (options?.disableSyntheticClient === true ? null : syntheticClient),
			context,
			expectFinal: options?.expectFinal,
			isWebchatConnect,
			onAccepted: options?.onAccepted,
			requestIdPrefix: "plugin-subagent",
			timeoutMs: options?.timeoutMs,
			...options?.signal ? { signal: options.signal } : {}
		});
	} finally {
		cancelSubagentCompletionToolHandoff(delegatedToolPolicyHandoffId);
	}
}
/** Live request context for trusted built-in tools that need direct runtime state. */
function getInProcessGatewayRequestContext() {
	return getPluginRuntimeGatewayRequestScope()?.context ?? getFallbackGatewayContext();
}
async function dispatchGatewayMethodInProcess(method, params, options) {
	return unwrapGatewayMethodDispatchResponse(method, await dispatchGatewayMethodInProcessRaw(method, params, options));
}
async function dispatchTrustedPluginGatewayMethod(method, params = {}, options) {
	const scope = getPluginRuntimeGatewayRequestScope();
	const pluginId = scope?.pluginId?.trim();
	if (!canTrustedOfficialPluginRequestScopes(scope ?? {})) throw new Error("Gateway requests are only available to bundled or trusted official plugins.");
	const syntheticScopes = normalizeOperatorScopeList(options?.scopes);
	return await dispatchGatewayMethodInProcess(method, params, {
		forceSyntheticClient: true,
		pluginRuntimeOwnerId: pluginId,
		...syntheticScopes ? { syntheticScopes } : {},
		...options?.timeoutMs !== void 0 ? { timeoutMs: options.timeoutMs } : {}
	});
}
const PLUGIN_SUBAGENT_SESSION_MESSAGES_MAX_LIMIT = 1e3;
function createGatewaySubagentRuntime() {
	const getSessionMessages = async (params) => {
		const limit = params.limit == null || !Number.isFinite(params.limit) ? void 0 : Math.min(PLUGIN_SUBAGENT_SESSION_MESSAGES_MAX_LIMIT, Math.max(1, Math.floor(params.limit)));
		const payload = await dispatchGatewayMethodInProcess("sessions.get", {
			key: params.sessionKey,
			...limit != null && { limit }
		});
		return { messages: Array.isArray(payload?.messages) ? payload.messages : [] };
	};
	return {
		async run(params) {
			const pluginSubagentRequester = resolvePluginSubagentCompletionRequester(params.completionDelivery);
			const scope = getPluginRuntimeGatewayRequestScope();
			const pluginId = typeof scope?.pluginId === "string" && scope.pluginId.trim() ? scope.pluginId.trim() : void 0;
			const runtimePluginToolGrant = resolvePluginSubagentToolsAlsoAllow({
				pluginId,
				toolsAlsoAllow: params.toolsAlsoAllow
			});
			const overrideRequested = Boolean(params.provider || params.model);
			const hasRequestScopeClient = Boolean(scope?.client);
			let allowOverride = hasRequestScopeClient && canClientUseModelOverride(scope?.client ?? null);
			let allowSyntheticModelOverride = false;
			if (overrideRequested && !allowOverride && !hasRequestScopeClient) {
				const fallbackAuth = authorizeFallbackModelOverride({
					pluginId: scope?.pluginId,
					provider: params.provider,
					model: params.model
				});
				if (!fallbackAuth.allowed) throw new Error(fallbackAuth.reason);
				allowOverride = true;
				allowSyntheticModelOverride = true;
			}
			if (overrideRequested && !allowOverride) throw new Error("provider/model override is not authorized for this plugin subagent run.");
			const payload = await dispatchGatewayMethodInProcess("agent", {
				sessionKey: params.sessionKey,
				message: params.message,
				deliver: params.deliver ?? false,
				...allowOverride && params.provider && { provider: params.provider },
				...allowOverride && params.model && { model: params.model },
				...params.extraSystemPrompt && { extraSystemPrompt: params.extraSystemPrompt },
				...params.lane && { lane: params.lane },
				...params.cwd && { cwd: params.cwd },
				...params.lightContext === true && { bootstrapContextMode: "lightweight" },
				idempotencyKey: params.idempotencyKey || randomUUID()
			}, {
				allowSyntheticModelOverride,
				agentRunTracking: "plugin_subagent",
				...pluginId ? { pluginRuntimeOwnerId: pluginId } : {},
				...pluginSubagentRequester ? { pluginSubagentRequester } : {},
				...runtimePluginToolGrant ? { runtimePluginToolGrant } : {}
			});
			const runId = payload?.runId;
			if (typeof runId !== "string" || !runId) throw new Error("Gateway agent method returned an invalid runId.");
			const runtime = normalizePluginSubagentRunRuntime(payload?.runtime);
			return {
				runId,
				...runtime ? { runtime } : {}
			};
		},
		async waitForRun(params) {
			const payload = await dispatchGatewayMethodInProcess("agent.wait", {
				runId: params.runId,
				...params.timeoutMs != null && { timeoutMs: params.timeoutMs }
			});
			let status = payload?.status;
			if (status === "completed" || status === "succeeded") status = "ok";
			else if (status === "error" && payload?.error?.trim().toLowerCase() === "completed") status = "ok";
			if (status !== "ok" && status !== "error" && status !== "timeout") throw new Error(`Gateway agent.wait returned unexpected status: ${payload?.status}`);
			return {
				status,
				...status !== "ok" && typeof payload?.error === "string" && payload.error && { error: payload.error }
			};
		},
		getSessionMessages,
		async deleteSession(params) {
			const scope = getPluginRuntimeGatewayRequestScope();
			const pluginId = typeof scope?.pluginId === "string" && scope.pluginId.trim() ? scope.pluginId.trim() : void 0;
			const pluginOwnedCleanupOptions = pluginId ? {
				pluginRuntimeOwnerId: pluginId,
				...!hasAdminScope(scope?.client) ? {
					forceSyntheticClient: true,
					syntheticScopes: [ADMIN_SCOPE]
				} : {}
			} : void 0;
			await dispatchGatewayMethodInProcess("sessions.delete", {
				key: params.sessionKey,
				deleteTranscript: params.deleteTranscript ?? true
			}, pluginOwnedCleanupOptions);
		}
	};
}
function createGatewayNodesRuntime() {
	return {
		async list(params) {
			const payload = await dispatchGatewayMethodInProcess("node.list", {});
			const nodes = Array.isArray(payload?.nodes) ? payload.nodes : [];
			return { nodes: projectGatewayRuntimeNodes(params?.connected === true ? nodes.filter((node) => typeof node === "object" && node?.connected === true) : nodes) };
		},
		async invoke(params) {
			const scope = getPluginRuntimeGatewayRequestScope();
			const pluginId = typeof scope?.pluginId === "string" && scope.pluginId.trim() ? scope.pluginId.trim() : void 0;
			const syntheticScopes = resolveRuntimeNodeInvokeSyntheticScopes({
				pluginId,
				pluginOrigin: scope?.pluginOrigin,
				pluginTrustedOfficialInstall: scope?.pluginTrustedOfficialInstall,
				requestedScopes: normalizeOperatorScopeList(params.scopes)
			});
			return await dispatchGatewayMethodInProcess("node.invoke", {
				nodeId: params.nodeId,
				command: params.command,
				...params.params !== void 0 && { params: params.params },
				timeoutMs: params.timeoutMs,
				idempotencyKey: params.idempotencyKey || randomUUID()
			}, {
				...pluginId ? { pluginRuntimeOwnerId: pluginId } : {},
				...syntheticScopes ? {
					forceSyntheticClient: true,
					syntheticScopes
				} : {},
				...params.signal ? { signal: params.signal } : {}
			});
		}
	};
}
const GATEWAY_PLUGIN_RUNTIME_BINDINGS_KEY = Symbol.for("openclaw.gatewayPluginRuntimeBindings");
function getGatewayPluginRuntimeBindings() {
	return resolveGlobalSingleton(GATEWAY_PLUGIN_RUNTIME_BINDINGS_KEY, () => ({
		nodes: createGatewayNodesRuntime(),
		subagent: createGatewaySubagentRuntime()
	}));
}
function createGatewayPluginRegistrationLogger(params) {
	const logger = createPluginRuntimeLoaderLogger();
	if (params?.suppressInfoLogs !== true) return logger;
	return {
		...logger,
		info: (_message) => void 0
	};
}
function loadGatewayPlugins(params) {
	const started = performance.now();
	const activationAutoEnabled = params.activationSourceConfig !== void 0 && params.autoEnabledReasons === void 0 ? applyPluginAutoEnable({
		config: params.activationSourceConfig,
		env: process.env,
		...params.pluginLookUpTable?.manifestRegistry ? { manifestRegistry: params.pluginLookUpTable.manifestRegistry } : {},
		discovery: params.pluginLookUpTable?.discovery,
		ambientEnvTriggers: params.ambientEnvTriggers
	}) : void 0;
	const autoEnableMs = performance.now() - started;
	const autoEnabled = params.activationSourceConfig !== void 0 ? {
		config: params.cfg,
		changes: activationAutoEnabled?.changes ?? [],
		autoEnabledReasons: params.autoEnabledReasons ?? activationAutoEnabled?.autoEnabledReasons ?? {}
	} : params.autoEnabledReasons !== void 0 ? {
		config: params.cfg,
		changes: [],
		autoEnabledReasons: params.autoEnabledReasons
	} : applyPluginAutoEnable({
		config: params.cfg,
		env: process.env,
		...params.pluginLookUpTable?.manifestRegistry ? { manifestRegistry: params.pluginLookUpTable.manifestRegistry } : {},
		discovery: params.pluginLookUpTable?.discovery,
		ambientEnvTriggers: params.ambientEnvTriggers
	});
	const resolvedConfigMs = performance.now() - started;
	const resolvedConfig = autoEnabled.config;
	const pluginIds = params.pluginIds ?? [...(params.pluginLookUpTable ?? loadPluginLookUpTable({
		config: resolvedConfig,
		activationSourceConfig: params.activationSourceConfig,
		workspaceDir: params.workspaceDir,
		env: process.env,
		ambientEnvTriggers: params.ambientEnvTriggers
	})).startup.pluginIds];
	const pluginIdsMs = performance.now() - started;
	if (pluginIds.length === 0) {
		const pluginRegistry = createEmptyPluginRegistry();
		activatePluginRegistry(pluginRegistry, null, "gateway-bindable", params.workspaceDir);
		params.startupTrace?.detail("plugins.gateway-load", [
			["autoEnableMs", autoEnableMs],
			["resolvedConfigMs", resolvedConfigMs],
			["pluginIdsMs", pluginIdsMs],
			["loadMs", 0],
			["pluginIds", "0"],
			["pluginCount", 0],
			["gatewayHandlerCount", 0]
		]);
		return {
			pluginRegistry,
			gatewayMethods: [...params.baseMethods]
		};
	}
	const beforeLoad = performance.now();
	const loaderStatsBefore = getPluginModuleLoaderStats();
	const gatewayRuntimeBindings = getGatewayPluginRuntimeBindings();
	const pluginRegistry = loadAndActivateRootPluginRegistry({
		config: resolvedConfig,
		activationSourceConfig: params.activationSourceConfig ?? params.cfg,
		autoEnabledReasons: autoEnabled.autoEnabledReasons,
		workspaceDir: params.workspaceDir,
		onlyPluginIds: pluginIds,
		logger: createGatewayPluginRegistrationLogger({ suppressInfoLogs: params.suppressPluginInfoLogs }),
		...params.coreGatewayHandlers !== void 0 && { coreGatewayHandlers: params.coreGatewayHandlers },
		...params.coreGatewayMethodNames !== void 0 && { coreGatewayMethodNames: params.coreGatewayMethodNames },
		...params.hostServices !== void 0 && { hostServices: params.hostServices },
		runtimeOptions: {
			allowGatewaySubagentBinding: true,
			...gatewayRuntimeBindings
		},
		channelPluginLoadIntent: params.channelPluginLoadIntent,
		preferBuiltPluginArtifacts: true,
		...params.startupTrace !== void 0 && { startupTrace: params.startupTrace },
		...params.pluginLookUpTable ? {
			manifestRegistry: params.pluginLookUpTable.manifestRegistry,
			installRecords: extractPluginInstallRecordsFromInstalledPluginIndex(params.pluginLookUpTable.index)
		} : {}
	});
	const loadMs = performance.now() - beforeLoad;
	const loaderStatsAfter = getPluginModuleLoaderStats();
	const pluginMethods = Object.keys(pluginRegistry.gatewayHandlers);
	const gatewayMethods = uniqueStrings([...params.baseMethods, ...pluginMethods]);
	params.startupTrace?.detail("plugins.gateway-load", [
		["autoEnableMs", autoEnableMs],
		["resolvedConfigMs", resolvedConfigMs],
		["pluginIdsMs", pluginIdsMs],
		["loadMs", loadMs],
		["pluginIds", String(pluginIds.length)],
		["pluginCount", pluginIds.length],
		["gatewayHandlers", String(pluginMethods.length)],
		["gatewayHandlerCount", pluginMethods.length],
		["loaderCallsCount", loaderStatsAfter.calls - loaderStatsBefore.calls],
		["loaderNativeHitsCount", loaderStatsAfter.nativeHits - loaderStatsBefore.nativeHits],
		["loaderNativeMissesCount", loaderStatsAfter.nativeMisses - loaderStatsBefore.nativeMisses],
		["loaderSourceTransformForcedCount", loaderStatsAfter.sourceTransformForced - loaderStatsBefore.sourceTransformForced],
		["loaderSourceTransformFallbacksCount", loaderStatsAfter.sourceTransformFallbacks - loaderStatsBefore.sourceTransformFallbacks],
		["loaderTopSourceTransformTargets", loaderStatsAfter.topSourceTransformTargets.slice(0, 3).map((entry) => `${entry.count}:${entry.target}`).join(",")]
	]);
	return {
		pluginRegistry,
		gatewayMethods
	};
}
//#endregion
export { dispatchTrustedPluginGatewayMethod as a, setPluginSubagentOverridePolicies as c, dispatchGatewayMethodInProcessRaw as i, consumeSubagentCompletionToolHandoff as l, createGatewaySubagentRuntime as n, getInProcessGatewayRequestContext as o, dispatchGatewayMethodInProcess as r, loadGatewayPlugins as s, createGatewayNodesRuntime as t, hasInProcessGatewayContext as u };
