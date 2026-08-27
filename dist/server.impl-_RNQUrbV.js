import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { n as createLazyPromise, r as createLazyPromiseLoader } from "./lazy-promise-DGqyc4Y4.js";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import { n as isVitestRuntimeEnv } from "./test-runtime-env-DQDRzsLt.js";
import { n as isTruthyEnvValue, r as logAcceptedEnvOption } from "./env-Bnf0Z-yF.js";
import { D as resolveIntegerOption, b as parseStrictPositiveInteger } from "./number-coercion-Crk_c9KW.js";
import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import "./utils-Bs67j6-3.js";
import { t as sleep } from "./sleep-Ce8zcpEF.js";
import { c as normalizeStateDirEnv, s as isNixMode } from "./paths-CL43LNS6.js";
import { t as clearPluginMetadataLifecycleCaches } from "./plugin-metadata-lifecycle-NcA0EWhA.js";
import { B as captureConfigOverrideApplier, l as readConfigFileSnapshot, o as promoteConfigSnapshotToLastKnownGood, r as getRuntimeConfig, u as readConfigFileSnapshotForRuntimeTransaction, v as registerConfigWriteListener } from "./io-DCw4R0kD.js";
import { S as createDiagnosticTraceContext, f as isDiagnosticsEnabled, j as runWithDiagnosticTraceContext, y as setDiagnosticsEnabledForProcess } from "./diagnostic-events-Dt41CZkD.js";
import { r as runtimeForLogger, t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { u as isSecretRef } from "./types.secrets-BvApkFoj.js";
import { h as createPluginGatewayMethodDescriptors, m as createGatewayMethodRegistry, p as createGatewayMethodDescriptorsFromHandlers } from "./loader-BmgwYkg7.js";
import { i as listLoadedChannelPlugins, n as getLoadedChannelPluginEntryById } from "./registry-loaded-BSz-9sMZ.js";
import { r as setCurrentPluginMetadataSnapshot } from "./current-plugin-metadata-snapshot-krwg-Yx5.js";
import { d as prepareConfigRuntimeEnv, l as initializePublishedConfigRuntimeEnv, r as collectConfigRuntimeEnvOwnership } from "./config-env-vars-DwleMuU3.js";
import { n as assertGatewayConfigEnvSelectionUnchanged } from "./gateway-env-selection-Dq0mJD7k.js";
import { S as setAppliedRuntimeConfigSnapshot, c as getRuntimeConfigSourceSnapshot } from "./runtime-snapshot-DLOCFXOE.js";
import { t as KeyedAsyncQueue } from "./keyed-async-queue-CTreGrmR.js";
import { n as ensureControlUiAllowedOriginsForNonLoopbackBind } from "./gateway-control-ui-origins-JQOYrYru.js";
import { t as GatewayLockError } from "./gateway-lock-BPZGOtDB.js";
import { t as isContainerEnvironment } from "./container-environment-CNsJSTpY.js";
import { b as resolveRequestClientIp, g as resolveGatewayListenHosts, o as isLoopbackHost, r as isLocalDirectRequest } from "./net-B22ilI8B.js";
import { l as buildRateLimitIdentityKey, o as AUTH_RATE_LIMIT_SCOPE_NODE_REAPPROVAL, u as createAuthRateLimiter } from "./auth-rate-limit-D67GPKfj.js";
import { n as authorizeHttpGatewayConnect } from "./auth-uTW579rj.js";
import { n as resolveGatewayAuth } from "./auth-resolve-C_gCVWQ8.js";
import { n as isRestartEnabled } from "./commands.flags-DOAG7Eoj.js";
import { a as hasGatewayClientCap, t as GATEWAY_CLIENT_CAPS } from "./client-info-Dlrmm4mP.js";
import { a as normalizeDevicePublicKeyBase64Url } from "./device-identity-P-Q23TDZ.js";
import { t as loadGatewayTlsRuntime$1 } from "./gateway-Bzbbc295.js";
import { r as roleScopesAllow } from "./operator-scope-compat-C7_b0yme.js";
import "./method-scopes-ChuOr7sh.js";
import { c as listCoreGatewayMethodNames, n as createCoreGatewayMethodDescriptors, r as isCoreGatewayMethodClassified, t as STARTUP_UNAVAILABLE_GATEWAY_METHODS } from "./core-descriptors-Bngx0C2m.js";
import { a as READ_SCOPE, i as QUESTIONS_SCOPE, n as APPROVALS_SCOPE, o as TALK_SCOPE, r as PAIRING_SCOPE, t as ADMIN_SCOPE } from "./operator-scopes-Dw7Gu2cA.js";
import { c as isGatewayWorkAdmissionClosed, i as getActiveGatewayRootWorkCount } from "./gateway-work-admission-D_DdbtmL.js";
import { f as setGatewaySigusr1RestartPolicy, p as setPreRestartDeferralCheck } from "./restart-jUtKzygH.js";
import { r as readGatewayRestartHandoffSync } from "./restart-handoff-C0ckZoc8.js";
import { a as resolveMainSessionKey } from "./main-session-Bjm_i_Af.js";
import { t as isBrowserCopilotClient } from "./message-channel-1n7hD5_u.js";
import { i as tryLoadActivatedBundledPluginPublicSurfaceModule } from "./facade-runtime-aiGYP9iC.js";
import { i as streamSimple } from "./stream-Cgu09Ime.js";
import { t as event_stream_exports } from "./event-stream-MHM-_qcK.js";
import { r as installModelExecutionPort } from "./sessions-Cj7BqXHP.js";
import { a as enqueueSystemEvent } from "./system-events-fsxpbPNB.js";
import { C as stopDiagnosticHeartbeat, S as startDiagnosticHeartbeat } from "./diagnostic-Ba_lpTat.js";
import { l as resolveCronJobsStorePathFromConfig } from "./store-865CL89i.js";
import { d as getActiveEmbeddedRunCount, m as resolveActiveEmbeddedRunSessionId } from "./run-state-ewY1D1VR.js";
import "./sessions-CBo4LOdS.js";
import { n as matchUserProfileAvatarPath } from "./user-profiles-http-path-CvR7l2ks.js";
import { s as getActiveBackgroundExecSessionCount } from "./bash-process-registry--IqPmVga.js";
import { t as getTotalPendingReplies } from "./dispatcher-registry-B2AzyUtN.js";
import { r as getActiveCronJobCount } from "./active-jobs-BGi1uzPV.js";
import { c as getTotalQueueSize, d as isGatewayDraining } from "./command-queue-Cl58ne2E.js";
import { a as decodeSandboxHostCsp, i as buildSandboxHostProxyHtml, n as buildSandboxHostContentSecurityPolicy, s as resolveSandboxHostPort } from "./sandbox-host-B69R9JsG.js";
import { t as createDeferred } from "./deferred-DJrEoFQk.js";
import { i as withCoreCanvasNodeCapability, n as isCanvasDocumentHttpPath, r as resolveCanvasNodeCapability } from "./constants-Cm4bJJ1Q.js";
import { t as isCoreCanvasHostEnabled } from "./config-BV0DT6TY.js";
import { i as setFallbackGatewayContextResolver } from "./server-plugin-fallback-context-CA_ZMhwm.js";
import "./server-plugins-D28cwNc7.js";
import { i as getActiveSecretsRuntimeConfigSnapshot, r as clearSecretsRuntimeSnapshot } from "./runtime-state-CdeDRMxT.js";
import { t as clearSessionSuspensionTimers } from "./session-suspension-pn3EIaA1.js";
import { t as isTerminalConfigEnabled } from "./enabled-BSjeiWpO.js";
import { a as terminateCompactionPlanningPool, o as TopicAffineWorkerPool, s as WorkerPoolError } from "./compaction-planning-worker-4bCm00Vh.js";
import { t as installSessionPlacementAdmissionProvider } from "./session-placement-admission-BEJd445g.js";
import { n as applyGatewayLaneConcurrency, r as resolveGatewayLaneConcurrency, t as resolveHookClientIpConfig } from "./hook-client-ip-config-YNKPUR6u.js";
import { n as DEFAULT_CHANNEL_STALE_EVENT_THRESHOLD_MS, r as evaluateChannelHealth, t as DEFAULT_CHANNEL_CONNECT_GRACE_MS } from "./channel-health-policy-DwVWbiKo.js";
import { a as enforceSharedGatewaySessionGenerationForConfigWrite, s as getRequiredSharedGatewaySessionGeneration } from "./server-shared-auth-generation-BKVola-Y.js";
import { n as mergeGatewayAuthConfig, r as mergeGatewayTailscaleConfig } from "./startup-auth-CC1KE9pL.js";
import { a as createSessionEventSubscriberRegistry, i as createChatRunState, o as createSessionMessageSubscriberRegistry } from "./server-chat-state-C8AVcQU8.js";
import { d as resumeGatewayRestartTraceFromHandoff, i as finishGatewayRestartTrace, n as collectGatewayProcessMemoryUsageMb, u as resumeGatewayRestartTraceFromEnv } from "./restart-trace-Cu5YQjxo.js";
import { i as upsertPresence } from "./system-presence-CeixrtPU.js";
import { t as ensureOpenClawCliOnPath } from "./path-env-tiBrEueK.js";
import { c as resolveControlUiRootSync, i as isPackageProvenControlUiRootSync, n as ensureControlUiAssetsBuilt, r as isControlUiStartupAssetsReady, s as resolveControlUiRootOverrideSync } from "./control-ui-assets-DT8FzLhP.js";
import { d as listDevicePairing, p as onEffectiveOperatorDevicePaired, y as resolveEffectiveOperatorDeviceIdentity } from "./device-pairing-pwb3Oe75.js";
import { d as requestNodePairing, f as reusePendingNodePairingForReconnect, r as finalizeNodePairingCleanupClaim } from "./node-pairing-B1-4tayK.js";
import { c as removeRemoteNodeInfoForConnection, i as recordRemoteNodeInfo, s as removeRemoteNodeInfo } from "./remote-DPqRs_jZ.js";
import { n as logRejectedLargePayload } from "./diagnostic-payload-Cvs6bzBU.js";
import { i as MAX_BUFFERED_BYTES, o as MAX_PREAUTH_PAYLOAD_BYTES } from "./server-constants-DKuFNbQH.js";
import { c as normalizePluginNodeCapabilityScopedUrl } from "./plugin-node-capability-9V7uhGk6.js";
import { i as summarizeAgentEventForWsLog, n as logWs, r as shouldLogWs } from "./ws-log-B1D_Y86r.js";
import { t as createDefaultDeps } from "./deps-DjEsu1aS.js";
import { l as revokeAttachGrantsForSession } from "./mcp-grant-store-bQkGAKnX.js";
import "./control-ui-contract-ByeBOCHr.js";
import { a as resolvePluginRoutePathContext, i as isProtectedPluginRoutePathFromContext, t as findMatchingPluginHttpRoutes } from "./route-match-CjzRe5Nj.js";
import { a as sendGatewayAuthFailure, f as setDefaultSecurityHeaders, r as finishFailedGatewayHttpResponse } from "./http-common-BAY0nK4S.js";
import { t as resolveSharedGatewaySessionGeneration } from "./ws-shared-generation-8sA0oUQm.js";
import { n as queuePluginSessionsChanged } from "./gateway-events-D7Hxt4AB.js";
import { c as canReceiveSessionEvent } from "./session-sharing-C3cQJ56a.js";
import { n as resolveAssistantIdentity } from "./assistant-identity-D3UsKBOR.js";
import { i as classifyMcpAppStandalonePath, r as classifyGatewayProbePath } from "./gateway-http-route-contracts-DHdzlPZ2.js";
import { n as isControlUiApprovalDocumentPath, r as isControlUiPluginManagerRequest } from "./control-ui-routing-ec4rBi_L.js";
import { n as resolveGatewayReloadPluginActivationCandidate, r as resolveGatewayStartupPluginActivationConfig, t as mergeActivationSectionsIntoRuntimeConfig } from "./plugin-activation-runtime-config-Cd8hUI0Q.js";
import { a as incrementPresenceVersion, i as getPresenceVersion, n as getHealthCache, o as refreshGatewayHealthSnapshot, r as getHealthVersion } from "./health-state-CCFf1_L-.js";
import { t as resolveGatewayPluginConfig } from "./runtime-plugin-config-CwjSnlUj.js";
import { t as createControlUiSessionPullRequestSubscriptions } from "./control-ui-session-pr-subscriptions-CFJGTuRz.js";
import { i as clearNodeWakeState } from "./node-wake-state-CLsta4Jn.js";
import { t as broadcastPresenceSnapshot } from "./presence-events-sa27H3eG.js";
import { t as createGatewayStartupTrace } from "./server-startup-trace-07DW45RV.js";
import { t as GATEWAY_EVENTS } from "./server-methods-list-BqH1fA41.js";
import { n as GATEWAY_WS_PREAUTH_BUDGET_PROPERTY, t as GATEWAY_WS_CONNECTION_KIND_PROPERTY } from "./ws-types-D4iS735K.js";
import { t as disposeNodeConnectionNotifications } from "./node-connection-notifications-BrOF2p7f.js";
import { a as writeGatewayUpgradeServiceUnavailable, n as shouldEnforceGatewayAuthForPluginPath, r as runWithGatewayHttpWorkAdmission } from "./route-auth-BPZJADf7.js";
import { t as findMatchingPluginNodeCapabilityRoute } from "./route-capability-UMtg-bja.js";
import { fileURLToPath, pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { MessageChannel } from "node:worker_threads";
import { monitorEventLoopDelay, performance } from "node:perf_hooks";
import { WebSocketServer } from "ws";
import { createServer } from "node:http";
import { createServer as createServer$1 } from "node:https";
//#region src/gateway/server-public.ts
function shouldRetainControlUiDeviceAuthMigrationSession(params) {
	const approvedDeviceId = params.approvedDevice.deviceId.trim();
	const approvedPublicKey = normalizeDevicePublicKeyBase64Url(params.approvedDevice.publicKey);
	return Boolean(params.sessionDevice?.id.trim() === approvedDeviceId && approvedPublicKey && normalizeDevicePublicKeyBase64Url(params.sessionDevice.publicKey) === approvedPublicKey);
}
//#endregion
//#region src/gateway/plugin-channel-reload-targets.ts
function addNormalizedTarget(targets, value) {
	const normalized = normalizeOptionalString(value);
	if (normalized) targets.add(normalized);
}
/** Lists all config ids that should trigger reload for a channel plugin target. */
function listChannelPluginConfigTargetIds(target) {
	const targets = /* @__PURE__ */ new Set();
	addNormalizedTarget(targets, target.channelId);
	addNormalizedTarget(targets, target.pluginId);
	for (const alias of target.aliases ?? []) addNormalizedTarget(targets, alias);
	return targets;
}
/** Returns true when changed config paths affect any target plugin/channel id. */
function pluginConfigTargetsChanged(targetIds, changedPaths) {
	const prefixes = Array.from(targetIds, (id) => [`plugins.entries.${id}`, `plugins.installs.${id}`]).flat();
	return changedPaths.some((path) => prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}.`)));
}
//#endregion
//#region src/gateway/server-core-runtime.ts
function listGatewayStartupChannelPlugins$1() {
	return listLoadedChannelPlugins();
}
const MAX_MEDIA_TTL_HOURS = 168;
function resolveMediaCleanupTtlMs(ttlHoursRaw) {
	const ttlMs = Math.min(Math.max(ttlHoursRaw, 1), MAX_MEDIA_TTL_HOURS) * 60 * 6e4;
	if (!Number.isFinite(ttlMs) || !Number.isSafeInteger(ttlMs)) throw new Error(`Invalid media.ttlHours: ${String(ttlHoursRaw)}`);
	return ttlMs;
}
function approvalRequestTargetsSession(request, sessionKeys, sessionId) {
	if (typeof request !== "object" || request === null) return false;
	const record = request;
	return typeof record.sessionId === "string" && record.sessionId === sessionId || typeof record.sessionKey === "string" && sessionKeys.has(record.sessionKey);
}
async function startGatewayCoreRuntime(input) {
	const { lifecycleRuntime: runtime, port, log, logDiscovery, logHealth, logChannels, loadGatewayStartupEarlyModule, loadGatewayPluginBootstrapModule, loadGatewayModelCatalog, loadGatewayModelCatalogSnapshot, readPreparedGatewayModelCatalog } = input;
	const { minimalTestGateway, cfgAtStart, gatewayTls, bindHost, tailscaleMode, nodeRegistry, pluginRuntime, broadcast, nodeSendToAllSubscribed, refreshGatewayHealthSnapshotWithRuntime, dedupe, chatAbortControllers, chatQueuedTurns, restartRecoveryCandidates, chatRunState, removeChatRun, agentRunSeq, nodeSendToSession, runtimeState, startupTrace, activeTaskCount, channelManager, workerDispatchAuthority, clients, startChannel, stopChannel, sharedGatewaySessionGenerationState, resolveSharedGatewaySessionGenerationForConfig, sessionMessageSubscribers, sessionEventSubscribers, toolEventRecipients, broadcastToConnIds, controlUiBasePath, workerEnvironmentService, workerPlacementDispatchAvailable, workerPlacementControlAvailable, listStartupChannelGatewayMethods, coreGatewayMethodNames, pluginHostServices, baseMethods, defaultWorkspaceDir, ambientEnvTriggers, workerEnvironmentStartup, broadcastPluginEvent, activateRuntimeSecrets } = runtime;
	const earlyRuntime = await startupTrace.measure("runtime.early", () => loadGatewayStartupEarlyModule().then(({ startGatewayEarlyRuntime }) => startGatewayEarlyRuntime({
		minimalTestGateway,
		cfgAtStart,
		port,
		gatewayTls,
		gatewayDirectReachable: !isLoopbackHost(bindHost),
		tailscaleMode,
		log,
		logDiscovery,
		nodeRegistry,
		pluginRegistry: pluginRuntime.registry,
		broadcast,
		nodeSendToAllSubscribed,
		getPresenceVersion,
		getHealthVersion,
		refreshGatewayHealthSnapshot: refreshGatewayHealthSnapshotWithRuntime,
		logHealth,
		dedupe,
		chatAbortControllers,
		chatQueuedTurns,
		restartRecoveryCandidates,
		chatRunState,
		removeChatRun,
		agentRunSeq,
		nodeSendToSession,
		...typeof cfgAtStart.attachments?.ttlHours === "number" ? { mediaCleanupTtlMs: resolveMediaCleanupTtlMs(cfgAtStart.attachments.ttlHours) } : {},
		skillsRefreshDelayMs: runtimeState.skillsRefreshDelayMs,
		getSkillsRefreshTimer: () => runtimeState.skillsRefreshTimer,
		setSkillsRefreshTimer: (timer) => {
			runtimeState.skillsRefreshTimer = timer;
		},
		getRuntimeConfig,
		startupTrace
	})));
	runtimeState.bonjourStop = earlyRuntime.bonjourStop;
	activeTaskCount.get = earlyRuntime.getActiveTaskCount;
	runtimeState.skillsChangeUnsub = earlyRuntime.skillsChangeUnsub;
	const [{ startGatewayEventSubscriptions }, { startGatewayRuntimeServices }] = await startupTrace.measure("runtime.post-early-imports", () => Promise.all([import("./server-runtime-subscriptions-Bg1vaKDU.js"), import("./server-runtime-startup-services-CarEcSE8.js")]));
	const { sessionCompanion, sessionObserver, ...runtimeSubscriptionUnsubs } = await startupTrace.measure("runtime.subscriptions", () => startGatewayEventSubscriptions({
		log,
		broadcast,
		broadcastToConnIds,
		nodeSendToSession,
		agentRunSeq,
		chatRunState,
		toolEventRecipients,
		sessionEventSubscribers,
		sessionMessageSubscribers,
		chatAbortControllers,
		restartRecoveryCandidates
	}));
	Object.assign(runtimeState, runtimeSubscriptionUnsubs);
	const runtimeServices = await startupTrace.measure("runtime.services", () => startGatewayRuntimeServices({
		minimalTestGateway,
		cfgAtStart,
		channelManager,
		log
	}));
	Object.assign(runtimeState, runtimeServices);
	const { createOperatorApprovalSessionEventRuntime } = await import("./operator-approval-session-events-2bFa8_WK.js");
	const approvalManagersForReplay = /* @__PURE__ */ new Map();
	const approvalSessionEvents = createOperatorApprovalSessionEventRuntime({
		clients,
		sessionMessageSubscribers,
		broadcastToConnIds,
		controlUiBasePath,
		reconcileTerminal: (record) => {
			return approvalManagersForReplay.get(record.kind)?.reconcileDurableTerminal(record) ?? false;
		}
	});
	const { execApprovalManager, cancelRunBoundApprovals, forwardPluginApprovalRequest, pluginApprovalIosPushDelivery, pluginApprovalManager, systemAgentApprovalManager, extraHandlers, coreGatewayHandlers } = await startupTrace.measure("gateway.handlers", async () => {
		const [{ createGatewayAuxHandlers }, { coreGatewayHandlers: coreGatewayHandlersLocal }] = await Promise.all([import("./server-aux-handlers-I7L9W6Mu.js"), import("./server-methods-fcBmQJqm.js")]);
		return {
			...createGatewayAuxHandlers({
				log,
				activateRuntimeSecrets,
				sharedGatewaySessionGenerationState,
				resolveSharedGatewaySessionGenerationForConfig,
				clients,
				startChannel,
				stopChannel,
				getChannelAutostartSuppression: channelManager.getAutostartSuppression,
				logChannels,
				onApprovalLifecycle: approvalSessionEvents.publish
			}),
			coreGatewayHandlers: coreGatewayHandlersLocal
		};
	});
	approvalManagersForReplay.set("exec", execApprovalManager);
	approvalManagersForReplay.set("plugin", pluginApprovalManager);
	approvalManagersForReplay.set("system-agent", systemAgentApprovalManager);
	workerDispatchAuthority.revoke = ({ sessionId, sessionKeys }) => {
		const keys = new Set(sessionKeys);
		for (const sessionKey of keys) revokeAttachGrantsForSession(sessionKey);
		for (const record of execApprovalManager.listPendingRecords()) if (approvalRequestTargetsSession(record.request, keys, sessionId)) execApprovalManager.expire(record.id, "worker-dispatch");
		for (const record of pluginApprovalManager.listPendingRecords()) if (approvalRequestTargetsSession(record.request, keys, sessionId)) pluginApprovalManager.expire(record.id, "worker-dispatch");
	};
	const attachedGatewayExtraHandlers = {
		...pluginRuntime.registry.gatewayHandlers,
		...extraHandlers
	};
	let attachedPluginGatewayHandlerKeys = new Set(Object.keys(pluginRuntime.registry.gatewayHandlers));
	const buildAttachedGatewayMethodRegistry = (nextPluginRegistry) => {
		const coreDescriptorHandlers = { ...coreGatewayHandlers };
		const auxHandlers = {};
		for (const [method, handler] of Object.entries(extraHandlers)) if (isCoreGatewayMethodClassified(method)) coreDescriptorHandlers[method] = handler;
		else auxHandlers[method] = handler;
		return createGatewayMethodRegistry([
			...createCoreGatewayMethodDescriptors(coreDescriptorHandlers).filter((descriptor) => (workerEnvironmentService || descriptor.name !== "environments.create" && descriptor.name !== "environments.destroy") && (workerPlacementDispatchAvailable || descriptor.name !== "sessions.dispatch") && (workerPlacementControlAvailable || descriptor.name !== "sessions.reclaim")),
			...createPluginGatewayMethodDescriptors(nextPluginRegistry),
			...createGatewayMethodDescriptorsFromHandlers({
				handlers: auxHandlers,
				owner: {
					kind: "aux",
					area: "gateway-extra"
				},
				defaultScope: ADMIN_SCOPE
			})
		], nextPluginRegistry);
	};
	let attachedGatewayMethodRegistry = buildAttachedGatewayMethodRegistry(pluginRuntime.registry);
	const listAttachedGatewayMethods = () => {
		const methods = attachedGatewayMethodRegistry.listAdvertisedMethods();
		methods.push(...listStartupChannelGatewayMethods());
		return uniqueStrings(methods);
	};
	runtimeState.gatewayMethods.splice(0, runtimeState.gatewayMethods.length, ...listAttachedGatewayMethods());
	const replaceAttachedPluginRuntime = (loaded) => {
		pluginRuntime.registry = loaded.pluginRegistry;
		pluginRuntime.baseGatewayMethods = loaded.gatewayMethods;
		for (const key of attachedPluginGatewayHandlerKeys) delete attachedGatewayExtraHandlers[key];
		Object.assign(attachedGatewayExtraHandlers, pluginRuntime.registry.gatewayHandlers);
		attachedPluginGatewayHandlerKeys = new Set(Object.keys(pluginRuntime.registry.gatewayHandlers));
		attachedGatewayMethodRegistry = buildAttachedGatewayMethodRegistry(pluginRuntime.registry);
		runtimeState.gatewayMethods.splice(0, runtimeState.gatewayMethods.length, ...listAttachedGatewayMethods());
		nodeRegistry.refreshNodePluginTools();
	};
	const refreshAttachedGatewayDiscovery = async (nextPluginRegistry) => {
		if (minimalTestGateway) return;
		try {
			const stopPreviousDiscovery = runtimeState.bonjourStop;
			runtimeState.bonjourStop = null;
			if (stopPreviousDiscovery) try {
				await stopPreviousDiscovery();
			} catch (err) {
				logDiscovery.warn(`gateway discovery stop failed before plugin refresh: ${String(err)}`);
			}
			const { startGatewayPluginDiscovery } = await loadGatewayStartupEarlyModule();
			runtimeState.bonjourStop = await startGatewayPluginDiscovery({
				minimalTestGateway,
				cfgAtStart,
				port,
				gatewayTls,
				gatewayDirectReachable: !isLoopbackHost(bindHost),
				tailscaleMode,
				logDiscovery,
				pluginRegistry: nextPluginRegistry
			});
		} catch (err) {
			logDiscovery.warn(`gateway discovery refresh failed after plugin load: ${String(err)}`);
		}
	};
	const listAttachedChannelConfigTargets = () => new Map(listGatewayStartupChannelPlugins$1().map((plugin) => [plugin.id, listChannelPluginConfigTargetIds({
		channelId: plugin.id,
		pluginId: getLoadedChannelPluginEntryById(plugin.id)?.pluginId,
		aliases: plugin.meta.aliases
	})]));
	const reloadAttachedGatewayPlugins = async (params) => {
		const beforeChannelTargets = listAttachedChannelConfigTargets();
		const beforeChannelIds = new Set(beforeChannelTargets.keys());
		const [{ loadPluginLookUpTable }, { listAmbientOnlyConfiguredChannelIds }, { prepareGatewayPluginLoad }, { startPluginServices }] = await Promise.all([
			import("./plugin-lookup-table-ie6s6hU7.js"),
			import("./channel-presence-policy-tmyAbfz7.js"),
			loadGatewayPluginBootstrapModule(),
			import("./services-CDjhPJ6J.js")
		]);
		const nextPluginLookUpTable = loadPluginLookUpTable({
			config: resolveGatewayStartupPluginActivationConfig({
				runtimeConfig: params.nextConfig,
				activationSourceConfig: params.nextConfig,
				env: params.env,
				ambientEnvTriggers
			}),
			workspaceDir: defaultWorkspaceDir,
			env: params.env,
			activationSourceConfig: params.nextConfig,
			workerProviderIds: workerEnvironmentStartup?.listDurableProviderIds() ?? [],
			ambientEnvTriggers
		});
		const nextAmbientAutostartSuppressedChannelIds = ambientEnvTriggers === "suppress" ? new Set(listAmbientOnlyConfiguredChannelIds({
			config: params.nextConfig,
			activationSourceConfig: params.nextConfig,
			env: params.env,
			includePersistedAuthState: false,
			manifestRecords: nextPluginLookUpTable.manifestRegistry.plugins
		})) : /* @__PURE__ */ new Set();
		const nextStartupPluginIds = new Set(nextPluginLookUpTable.startup.pluginIds);
		const nextStartupChannelIds = /* @__PURE__ */ new Set();
		for (const plugin of nextPluginLookUpTable.manifestRegistry.plugins) {
			if (!nextStartupPluginIds.has(plugin.id)) continue;
			if (plugin.channels.length === 0) {
				nextStartupChannelIds.add(plugin.id);
				continue;
			}
			for (const channelId of plugin.channels) nextStartupChannelIds.add(channelId);
		}
		const channelsToStopBeforeReplace = /* @__PURE__ */ new Set();
		for (const channelId of beforeChannelIds) {
			const targetIds = beforeChannelTargets.get(channelId) ?? /* @__PURE__ */ new Set([channelId]);
			if (!nextStartupChannelIds.has(channelId) || pluginConfigTargetsChanged(targetIds, params.changedPaths)) channelsToStopBeforeReplace.add(channelId);
		}
		await params.beforeReplace(channelsToStopBeforeReplace);
		if (params.isAborted?.()) return {
			restartChannels: /* @__PURE__ */ new Set(),
			activeChannels: new Set(beforeChannelIds),
			cancelled: true
		};
		const previousPluginServices = runtimeState.pluginServices;
		await params.commitRuntime();
		channelManager.setAmbientAutostartSuppressedChannelIds(nextAmbientAutostartSuppressedChannelIds);
		const loaded = prepareGatewayPluginLoad({
			cfg: params.nextConfig,
			workspaceDir: defaultWorkspaceDir,
			log,
			coreGatewayMethodNames,
			hostServices: pluginHostServices,
			baseMethods,
			pluginLookUpTable: nextPluginLookUpTable,
			ambientEnvTriggers
		});
		setCurrentPluginMetadataSnapshot(nextPluginLookUpTable, {
			config: params.nextConfig,
			env: params.env,
			workspaceDir: defaultWorkspaceDir
		});
		replaceAttachedPluginRuntime(loaded);
		runtimeState.pluginServices = null;
		if (previousPluginServices) await previousPluginServices.stop();
		await refreshAttachedGatewayDiscovery(loaded.pluginRegistry);
		runtimeState.pluginServices = await startPluginServices({
			registry: loaded.pluginRegistry,
			config: params.nextConfig,
			workspaceDir: defaultWorkspaceDir,
			broadcastPluginEvent
		});
		const afterChannelTargets = listAttachedChannelConfigTargets();
		const afterChannelIds = new Set(afterChannelTargets.keys());
		const restartChannels = /* @__PURE__ */ new Set();
		for (const channelId of /* @__PURE__ */ new Set([...beforeChannelIds, ...afterChannelIds])) {
			const targetIds = afterChannelTargets.get(channelId) ?? beforeChannelTargets.get(channelId) ?? /* @__PURE__ */ new Set([channelId]);
			if (afterChannelIds.has(channelId) && (beforeChannelIds.has(channelId) !== afterChannelIds.has(channelId) || pluginConfigTargetsChanged(targetIds, params.changedPaths))) restartChannels.add(channelId);
		}
		return {
			restartChannels,
			activeChannels: afterChannelIds
		};
	};
	return {
		...runtime,
		earlyRuntime,
		sessionCompanion,
		sessionObserver,
		approvalSessionEvents,
		execApprovalManager,
		cancelRunBoundApprovals,
		forwardPluginApprovalRequest,
		pluginApprovalIosPushDelivery,
		pluginApprovalManager,
		systemAgentApprovalManager,
		attachedGatewayExtraHandlers,
		getAttachedGatewayMethodRegistry: () => attachedGatewayMethodRegistry,
		replaceAttachedPluginRuntime,
		refreshAttachedGatewayDiscovery,
		reloadAttachedGatewayPlugins,
		loadGatewayModelCatalog,
		loadGatewayModelCatalogSnapshot,
		readPreparedGatewayModelCatalog
	};
}
//#endregion
//#region src/gateway/server-cron-lazy.ts
/** Creates a cron state proxy that imports the real cron service on first use. */
function createLazyGatewayCronState(params) {
	const env = params.env ?? process.env;
	const storePath = resolveCronJobsStorePathFromConfig(params.cfg, env);
	const cronEnabled = env.OPENCLAW_SKIP_CRON !== "1" && params.cfg.cron?.enabled !== false;
	let loaded = null;
	let stopped = false;
	let lifecycleGeneration = 0;
	let schedulingPaused = false;
	const schedulingResumeWaiters = /* @__PURE__ */ new Set();
	const releaseSchedulingResumeWaiters = () => {
		const waiters = Array.from(schedulingResumeWaiters);
		schedulingResumeWaiters.clear();
		for (const resolve of waiters) resolve();
	};
	const waitForSchedulingResume = async () => {
		if (!schedulingPaused) return;
		await new Promise((resolve) => {
			schedulingResumeWaiters.add(resolve);
		});
	};
	const cronStateLoader = createLazyPromiseLoader(() => import("./server-cron-D4mIaeut.js").then(({ buildGatewayCronService }) => {
		loaded = {
			state: buildGatewayCronService(params),
			phase: "idle",
			startPromise: null,
			startGeneration: null,
			schedulingPaused: false,
			underlyingStartInFlight: false,
			underlyingStarted: false
		};
		if (schedulingPaused) {
			loaded.state.cron.pauseScheduling();
			loaded.schedulingPaused = true;
		}
		return loaded;
	}), { cacheRejections: true });
	const load = async () => {
		if (loaded) return loaded;
		return await cronStateLoader.load();
	};
	const cron = {
		async start() {
			stopped = false;
			const generation = lifecycleGeneration;
			const startCancelled = () => stopped || generation !== lifecycleGeneration;
			const resolved = await load();
			const hasStarted = () => resolved.phase === "started";
			if (startCancelled()) return;
			if (hasStarted()) return;
			if (resolved.startPromise) {
				const pendingGeneration = resolved.startGeneration;
				try {
					await resolved.startPromise;
				} catch (err) {
					if (pendingGeneration === generation) throw err;
				}
				if (startCancelled() || hasStarted()) return;
				if (pendingGeneration !== generation) {
					await cron.start();
					return;
				}
			}
			resolved.phase = "starting";
			resolved.startGeneration = generation;
			const startPromise = (async () => {
				await waitForSchedulingResume();
				if (startCancelled()) {
					resolved.phase = "stopped";
					return;
				}
				if (resolved.schedulingPaused) {
					resolved.state.cron.resumeScheduling();
					resolved.schedulingPaused = false;
				}
				resolved.underlyingStartInFlight = true;
				try {
					await resolved.state.cron.start();
					resolved.underlyingStarted = true;
				} catch (err) {
					resolved.underlyingStarted = false;
					resolved.phase = startCancelled() ? "stopped" : "idle";
					throw err;
				} finally {
					resolved.underlyingStartInFlight = false;
				}
				if (startCancelled()) {
					resolved.phase = "stopped";
					resolved.underlyingStarted = false;
					resolved.state.cron.stop();
					await resolved.state.stopStreamWatchers?.();
					return;
				}
				if (schedulingPaused) {
					resolved.state.cron.pauseScheduling();
					resolved.schedulingPaused = true;
				}
				try {
					if (resolved.state.cronEnabled) await Promise.all([resolved.state.reconcileExitWatchers?.(), resolved.state.reconcileStreamWatchers?.()]);
				} catch (err) {
					resolved.phase = startCancelled() ? "stopped" : "started";
					throw err;
				}
				if (startCancelled()) {
					resolved.phase = "stopped";
					resolved.underlyingStarted = false;
					resolved.state.cron.stop();
					await resolved.state.stopStreamWatchers?.();
					return;
				}
				resolved.phase = "started";
			})();
			resolved.startPromise = startPromise;
			try {
				await startPromise;
			} finally {
				if (resolved.startPromise === startPromise) {
					resolved.startPromise = null;
					resolved.startGeneration = null;
				}
			}
		},
		stop() {
			stopped = true;
			lifecycleGeneration += 1;
			releaseSchedulingResumeWaiters();
			if (loaded) {
				loaded.phase = "stopped";
				loaded.underlyingStarted = false;
				loaded.state.cron.stop();
				return;
			}
			const loading = cronStateLoader.peek();
			if (loading) loading.then((resolved) => {
				if (!stopped) return;
				resolved.phase = "stopped";
				resolved.underlyingStarted = false;
				resolved.state.cron.stop();
			}).catch(() => {});
		},
		async stopAndDrain() {
			stopped = true;
			lifecycleGeneration += 1;
			releaseSchedulingResumeWaiters();
			const resolved = loaded ?? (cronStateLoader.peek() ? await cronStateLoader.peek() : null);
			if (!resolved) return;
			resolved.phase = "stopped";
			resolved.underlyingStarted = false;
			if (resolved.state.cron.stopAndDrain) await resolved.state.cron.stopAndDrain();
			else {
				resolved.state.cron.stop();
				await resolved.state.stopStreamWatchers?.();
			}
		},
		pauseScheduling() {
			schedulingPaused = true;
			if (loaded) {
				loaded.state.cron.pauseScheduling();
				loaded.schedulingPaused = true;
			}
		},
		resumeScheduling() {
			schedulingPaused = false;
			releaseSchedulingResumeWaiters();
			if (loaded && loaded.schedulingPaused && (loaded.underlyingStarted || loaded.underlyingStartInFlight)) {
				loaded.state.cron.resumeScheduling();
				loaded.schedulingPaused = false;
			}
		},
		getSuspensionBlockerCount() {
			const loadedBlockers = loaded?.state.cron.getSuspensionBlockerCount?.() ?? 0;
			return loaded?.phase === "starting" ? Math.max(1, loadedBlockers) : loadedBlockers;
		},
		async status() {
			return await (await load()).state.cron.status();
		},
		async list(opts) {
			return await (await load()).state.cron.list(opts);
		},
		async listPage(opts) {
			return await (await load()).state.cron.listPage(opts);
		},
		async add(input, opts) {
			return await (await load()).state.cron.add(input, opts);
		},
		async update(id, patch) {
			return await (await load()).state.cron.update(id, patch);
		},
		async updateWithPrecondition(id, patch, precondition) {
			return await (await load()).state.cron.updateWithPrecondition(id, patch, precondition);
		},
		async remove(id, opts) {
			return await (await load()).state.cron.remove(id, opts);
		},
		async removeStaleJobFamily(family) {
			return await (await load()).state.cron.removeStaleJobFamily(family);
		},
		async removeAgentJobsTransactional(agentId, commit) {
			return await (await load()).state.cron.removeAgentJobsTransactional(agentId, commit);
		},
		async run(id, mode, opts) {
			return await (await load()).state.cron.run(id, mode, opts);
		},
		async enqueueRun(id, mode) {
			return await (await load()).state.cron.enqueueRun(id, mode);
		},
		getJob(id) {
			if (!loaded) return;
			return loaded.state.cron.getJob(id);
		},
		async readJob(id) {
			return await (await load()).state.cron.readJob(id);
		},
		async readScratch(id) {
			return await (await load()).state.cron.readScratch(id);
		},
		async writeScratch(id, write) {
			return await (await load()).state.cron.writeScratch(id, write);
		},
		getDefaultAgentId() {
			if (!loaded) return;
			return loaded.state.cron.getDefaultAgentId();
		},
		async prepareWake() {
			await load();
		},
		wake(opts) {
			if (!loaded) {
				load();
				return { ok: false };
			}
			return loaded.state.cron.wake(opts);
		}
	};
	return {
		cron,
		storePath,
		cronEnabled
	};
}
//#endregion
//#region src/gateway/server-cron-reconciled.ts
function createGatewayCronReconciliation(params) {
	let lifecycleGeneration = 0;
	let activeAbortController;
	const supersedeActive = () => {
		lifecycleGeneration += 1;
		activeAbortController?.abort();
		activeAbortController = void 0;
	};
	return {
		arm: ({ reason, config, cronState }) => {
			supersedeActive();
			const generation = lifecycleGeneration;
			const abortController = new AbortController();
			activeAbortController = abortController;
			const cron = cronState.cron;
			const event = {
				reason,
				enabled: cronState.cronEnabled
			};
			let completed = false;
			return { complete: async () => {
				if (completed) return;
				completed = true;
				if (params.isClosing() || generation !== lifecycleGeneration || abortController.signal.aborted) return;
				await params.runHook(event, {
					port: params.port,
					config,
					workspaceDir: params.workspaceDir,
					getCron: () => cron,
					abortSignal: abortController.signal
				});
			} };
		},
		invalidate: supersedeActive
	};
}
//#endregion
//#region src/gateway/server-runtime-handles.ts
/** Creates gateway mutable state with inert handles that are safe to stop before startup finishes. */
function createGatewayServerMutableState() {
	const noopInterval = () => {
		const timer = setInterval(() => {}, 1 << 30);
		timer.unref?.();
		return timer;
	};
	return {
		bonjourStop: null,
		tickInterval: noopInterval(),
		healthInterval: noopInterval(),
		dedupeCleanup: noopInterval(),
		mediaCleanup: null,
		worktreeCleanup: null,
		skillCuratorCleanup: () => {},
		heartbeatRunner: {
			stop: () => {},
			updateConfig: (_cfg) => {}
		},
		stopOutboundDeliveryRecovery: async () => {},
		stopGatewayUpdateCheck: () => {},
		tailscaleCleanup: null,
		postReadySidecars: [],
		gatewayLifetimeSidecars: [],
		skillsRefreshTimer: null,
		skillsRefreshDelayMs: 3e4,
		skillsChangeUnsub: () => {},
		channelHealthMonitor: null,
		mcpServer: void 0,
		configReloader: {
			stop: async () => {},
			notifyPluginMetadataChanged: () => {}
		},
		agentUnsub: null,
		heartbeatUnsub: null,
		transcriptUnsub: null,
		lifecycleUnsub: null,
		taskUnsub: null
	};
}
//#endregion
//#region src/gateway/server-live-state.ts
/** Creates gateway live state with fresh mutable runtime handles. */
function createGatewayServerLiveState(params) {
	return {
		...createGatewayServerMutableState(),
		hooksConfig: params.hooksConfig,
		hookClientIpConfig: params.hookClientIpConfig,
		cronState: params.cronState,
		controlUiSessionPullRequests: void 0,
		sessionViewerPresence: void 0,
		pluginServices: null,
		gatewayMethods: params.gatewayMethods
	};
}
//#endregion
//#region src/gateway/session-viewer-presence.ts
function normalizedSessionKeys(sessionKeys) {
	return [...new Set(sessionKeys.map((key) => key.trim()).filter(Boolean))].toSorted();
}
function sameKeys(left, right) {
	return left !== void 0 && left.length === right.length && left.every((key, index) => key === right[index]);
}
/** Owns one replace-set per websocket connection until empty declaration or disconnect. */
function createSessionViewerPresenceDeclarations(deps) {
	const declarations = /* @__PURE__ */ new Map();
	let stopped = false;
	const replace = (connId, sessionKeys) => {
		if (stopped) return [];
		const normalizedConnId = connId.trim();
		if (!normalizedConnId) return [];
		const next = normalizedSessionKeys(sessionKeys);
		const previous = declarations.get(normalizedConnId);
		if (sameKeys(previous, next) || previous === void 0 && next.length === 0) return next;
		if (next.length === 0) declarations.delete(normalizedConnId);
		else declarations.set(normalizedConnId, next);
		deps.onReplace(normalizedConnId, next);
		return next;
	};
	const unsubscribe = (connId) => {
		const normalizedConnId = connId.trim();
		if (normalizedConnId) declarations.delete(normalizedConnId);
	};
	const stop = () => {
		stopped = true;
		declarations.clear();
	};
	return {
		replace,
		unsubscribe,
		stop
	};
}
//#endregion
//#region src/gateway/server-lifecycle.ts
async function prepareGatewayLifecycle(params) {
	const { runtime, port, log, logCron, diagnosticsEnabled, loadGatewayCloseModule, closeMcpLoopbackServerOnDemand, stopTaskRegistryMaintenanceOnDemand } = params;
	const { controlUiDeviceAuthMigration, completeControlUiDeviceAuthMigration, workerGatewayEndpoint, getWorkerIngressEndpoint, sessionMessageSubscribers, clients, broadcast, cfgAtStart, pluginRuntime, authRateLimiter, nodeReapprovalCoordinator, channelManager, deps, initialHooksConfig, initialHookClientIpConfig, runtimeStateRef, gatewayInstanceRuntimeRef, startupState, readinessEventLoopHealth, browserAuthRateLimiter, wss, httpServer, httpServers, chatRunState, chatAbortControllers, chatQueuedTurns, removeChatRun, agentRunSeq, listActiveGatewayMethods, broadcastToConnIds, getBufferedAmount, sessionEventSubscribers, watchNodeRequestHandler, defaultWorkspaceDir } = runtime;
	const completeControlUiDeviceAuthMigrationForEffectiveOperator = (device) => {
		if (!controlUiDeviceAuthMigration.pending || !roleScopesAllow({
			role: "operator",
			requestedScopes: ["operator.pairing"],
			allowedScopes: device.scopes
		})) return;
		const normalizedDeviceId = device.deviceId.trim();
		controlUiDeviceAuthMigration.pending = false;
		for (const client of clients) {
			if (!client.isControlUiDeviceAuthMigrationSession) continue;
			if (client.isControlUiDeviceAuthMigration && shouldRetainControlUiDeviceAuthMigrationSession({
				sessionDevice: client.connect.device,
				approvedDevice: device
			})) continue;
			client.invalidated = true;
			client.invalidatedReason = "device-auth-migration-completed";
			client.socket.close(4001, "device auth migration completed");
		}
		try {
			completeControlUiDeviceAuthMigration(normalizedDeviceId, { env: process.env });
		} catch (error) {
			log.warn(`failed to persist Control UI device-auth migration completion: ${String(error)}`);
		}
	};
	const unsubscribeEffectiveOperatorPairing = onEffectiveOperatorDevicePaired(completeControlUiDeviceAuthMigrationForEffectiveOperator);
	workerGatewayEndpoint.resolve = getWorkerIngressEndpoint;
	const subscribeSessionMessageEvents = (connId, sessionKey, options) => sessionMessageSubscribers.subscribe(connId, sessionKey, options);
	const unsubscribeSessionMessageEvents = (connId, sessionKey) => sessionMessageSubscribers.unsubscribe(connId, sessionKey);
	const restartRecoveryCandidates = /* @__PURE__ */ new Map();
	const { createGatewayNodeSessionRuntime } = await import("./server-node-session-runtime-KrakpRPv.js");
	const { nodeRegistry, nodePresenceTimers, nodeSendToSession, nodeSendToAllSubscribed, nodeSubscribe, nodeUnsubscribe, nodeUnsubscribeAll, broadcastVoiceWakeChanged, broadcastVoiceWakeRoutingChanged, hasTalkNodeConnected } = createGatewayNodeSessionRuntime({
		broadcast,
		sessionEventSubscribers,
		sessionMessageSubscribers,
		listRegisteredNodePluginToolCommands: () => pluginRuntime.registry.nodeHostCommands,
		nodePluginToolsEnabled: cfgAtStart.gateway?.nodes?.pluginTools?.enabled !== false,
		nodeSkillsEnabled: cfgAtStart.gateway?.nodes?.allowSkills !== false,
		onPairingInvalidated: ({ nodeId, connId }) => {
			upsertPresence(nodeId, { reason: "disconnect" });
			broadcastPresenceSnapshot({
				broadcast,
				incrementPresenceVersion,
				getHealthVersion
			});
			removeRemoteNodeInfoForConnection(nodeId, connId);
		}
	});
	const { createWatchNodeHttpRuntime } = await import("./watch-node-http-Ccs0ABZX.js");
	const watchNodeHttpRuntime = createWatchNodeHttpRuntime({
		nodeRegistry,
		getConfig: getRuntimeConfig,
		broadcast,
		rateLimiter: authRateLimiter,
		nodeReapprovalCoordinator,
		onNodeConnected: (session) => {
			upsertPresence(session.nodeId, {
				host: session.displayName ?? session.clientId ?? session.nodeId,
				ip: session.remoteIp,
				version: session.version,
				platform: session.platform,
				deviceFamily: session.deviceFamily,
				modelIdentifier: session.modelIdentifier,
				mode: session.clientMode,
				deviceId: session.nodeId,
				roles: ["node"],
				scopes: [],
				instanceId: session.nodeId,
				reason: "connect"
			});
			incrementPresenceVersion();
			recordRemoteNodeInfo({
				nodeId: session.nodeId,
				connId: session.connId,
				displayName: session.displayName,
				platform: session.platform,
				deviceFamily: session.deviceFamily,
				commands: session.commands,
				remoteIp: session.remoteIp,
				pairingGeneration: session.pairingGeneration
			});
		},
		onNodeDisconnected: (nodeId) => {
			upsertPresence(nodeId, { reason: "disconnect" });
			broadcastPresenceSnapshot({
				broadcast,
				incrementPresenceVersion,
				getHealthVersion
			});
			removeRemoteNodeInfo(nodeId);
			nodeUnsubscribeAll(nodeId);
			clearNodeWakeState(nodeId);
		},
		onError: (message, error) => log.warn(`${message}: ${String(error)}`)
	});
	watchNodeRequestHandler.current = watchNodeHttpRuntime.handleRequest;
	const { TerminalSessionManager, DEFAULT_TERMINAL_DETACH_SECONDS } = await import("./session-manager-B49q8nbZ.js");
	const { createTerminalSessionTransport } = await import("./gateway-transport-CCDhR7aF.js");
	const terminalSessions = new TerminalSessionManager({
		...createTerminalSessionTransport(broadcastToConnIds, getBufferedAmount),
		detachGraceMs: (cfgAtStart.gateway?.terminal?.detachedSessionTimeoutSeconds ?? DEFAULT_TERMINAL_DETACH_SECONDS) * 1e3
	});
	applyGatewayLaneConcurrency(resolveGatewayLaneConcurrency(cfgAtStart), { gatewayStart: true });
	runtimeStateRef.current = createGatewayServerLiveState({
		hooksConfig: initialHooksConfig,
		hookClientIpConfig: initialHookClientIpConfig,
		cronState: createLazyGatewayCronState({
			cfg: cfgAtStart,
			deps,
			broadcast
		}),
		gatewayMethods: listActiveGatewayMethods(pluginRuntime.baseGatewayMethods)
	});
	const runtimeState = runtimeStateRef.current;
	runtimeState.controlUiSessionPullRequests = createControlUiSessionPullRequestSubscriptions({ broadcastToConnIds });
	runtimeState.sessionViewerPresence = createSessionViewerPresenceDeclarations({ onReplace: (connId, sessionKeys) => {
		const client = [...clients].find((candidate) => candidate.connId === connId);
		if (!client?.presenceKey) return;
		upsertPresence(client.presenceKey, { watchedSessions: sessionKeys.length > 0 ? [...sessionKeys] : void 0 });
		broadcastPresenceSnapshot({
			broadcast,
			incrementPresenceVersion,
			getHealthVersion
		});
	} });
	deps.cron = runtimeState.cronState.cron;
	const pluginHostServices = { get cron() {
		return runtimeState.cronState.cron;
	} };
	const lifecycle = { closePreludeStarted: false };
	const cronReconciliation = createGatewayCronReconciliation({
		port,
		workspaceDir: defaultWorkspaceDir,
		isClosing: () => lifecycle.closePreludeStarted,
		runHook: async (event, ctx) => {
			try {
				const hookRunner = (await import("./plugins/hook-runner-global.js")).getGlobalHookRunner();
				if (hookRunner?.hasHooks("cron_reconciled")) await hookRunner.runCronReconciled(event, ctx);
			} catch (err) {
				logCron.error(`cron_reconciled hook failed: ${String(err)}`);
			}
		}
	});
	const postReadyState = {
		maintenanceTimer: null,
		retainedPluginCleanupHandle: null
	};
	const clearPostReadyMaintenanceTimer = () => {
		if (!postReadyState.maintenanceTimer) return;
		clearTimeout(postReadyState.maintenanceTimer);
		postReadyState.maintenanceTimer = null;
	};
	let outboundDeliveryRecoveryStopPromise = null;
	const stopOutboundDeliveryRecoveryForClose = () => {
		outboundDeliveryRecoveryStopPromise ??= runtimeState.stopOutboundDeliveryRecovery();
		return outboundDeliveryRecoveryStopPromise;
	};
	const markClosePreludeStarted = () => {
		lifecycle.closePreludeStarted = true;
		stopOutboundDeliveryRecoveryForClose();
		runtimeState.controlUiSessionPullRequests?.stop();
		runtimeState.sessionViewerPresence?.stop();
		unsubscribeEffectiveOperatorPairing();
		startupState.dispatchReady = false;
		gatewayInstanceRuntimeRef.current?.close();
		cronReconciliation.invalidate();
		clearPostReadyMaintenanceTimer();
		postReadyState.retainedPluginCleanupHandle?.stop();
		postReadyState.retainedPluginCleanupHandle = null;
	};
	let configReloaderStopPromise = null;
	const stopConfigReloaderForClose = () => {
		configReloaderStopPromise ??= runtimeState.configReloader.stop();
		return configReloaderStopPromise;
	};
	const beginClosePrelude = async () => {
		clearSessionSuspensionTimers();
		markClosePreludeStarted();
		await Promise.all([stopOutboundDeliveryRecoveryForClose(), stopConfigReloaderForClose().catch(() => {})]);
	};
	const runClosePrelude = async () => {
		await beginClosePrelude();
		disposeNodeConnectionNotifications(nodeRegistry);
		watchNodeHttpRuntime.close();
		clearPluginMetadataLifecycleCaches();
		const { runGatewayClosePrelude } = await loadGatewayCloseModule();
		await runGatewayClosePrelude({
			...diagnosticsEnabled ? { stopDiagnostics: stopDiagnosticHeartbeat } : {},
			clearSkillsRefreshTimer: () => {
				if (!runtimeState?.skillsRefreshTimer) return;
				clearTimeout(runtimeState.skillsRefreshTimer);
				runtimeState.skillsRefreshTimer = null;
			},
			skillsChangeUnsub: runtimeState.skillsChangeUnsub,
			disposeAuthRateLimiter: () => {
				authRateLimiter.dispose();
				nodeReapprovalCoordinator.dispose();
			},
			disposeBrowserAuthRateLimiter: () => browserAuthRateLimiter.dispose(),
			stopChannelHealthMonitor: async () => {
				const monitor = runtimeState?.channelHealthMonitor;
				monitor?.shutdown();
				await monitor?.waitForIdle();
			},
			stopReadinessEventLoopHealth: readinessEventLoopHealth.stop,
			closeMcpServer: closeMcpLoopbackServerOnDemand
		});
	};
	const { getRuntimeSnapshot, startChannels, startChannel, stopChannel, markChannelLoggedOut } = channelManager;
	const refreshGatewayHealthSnapshotWithRuntime = (optsResult) => refreshGatewayHealthSnapshot({
		...optsResult,
		getRuntimeSnapshot,
		getEventLoopHealth: readinessEventLoopHealth.snapshot,
		getConfigReloaderHotReloadStatus: () => runtimeState?.configReloader.hotReloadStatus?.()
	});
	const stopRegisteredPostReadySidecars = async () => {
		const postReadySidecars = runtimeState.postReadySidecars;
		runtimeState.postReadySidecars = [];
		for (const postReadySidecar of postReadySidecars) await postReadySidecar.stop();
	};
	const stopRegisteredGatewayLifetimeSidecars = async () => {
		const gatewayLifetimeSidecars = runtimeState.gatewayLifetimeSidecars;
		runtimeState.gatewayLifetimeSidecars = [];
		for (const gatewayLifetimeSidecar of gatewayLifetimeSidecars) await gatewayLifetimeSidecar.stop();
	};
	const createCloseHandler = () => async (optsValue) => {
		const channelIds = listLoadedChannelPlugins().map((plugin) => plugin.id);
		const { createGatewayCloseHandler, drainActiveSessionsForShutdown } = await loadGatewayCloseModule();
		await createGatewayCloseHandler({
			bonjourStop: runtimeState.bonjourStop,
			tailscaleCleanup: runtimeState.tailscaleCleanup,
			clearSecretsRuntimeSnapshot,
			channelIds,
			stopChannel,
			pluginServices: runtimeState.pluginServices,
			postReadySidecars: runtimeState.postReadySidecars,
			cron: runtimeState.cronState.cron,
			heartbeatRunner: runtimeState.heartbeatRunner,
			updateCheckStop: runtimeState.stopGatewayUpdateCheck,
			stopTaskRegistryMaintenance: stopTaskRegistryMaintenanceOnDemand,
			nodePresenceTimers,
			broadcast,
			tickInterval: runtimeState.tickInterval,
			healthInterval: runtimeState.healthInterval,
			dedupeCleanup: runtimeState.dedupeCleanup,
			mediaCleanup: runtimeState.mediaCleanup,
			worktreeCleanup: runtimeState.worktreeCleanup,
			skillCuratorCleanup: runtimeState.skillCuratorCleanup,
			agentUnsub: runtimeState.agentUnsub,
			heartbeatUnsub: runtimeState.heartbeatUnsub,
			transcriptUnsub: runtimeState.transcriptUnsub,
			lifecycleUnsub: runtimeState.lifecycleUnsub,
			taskUnsub: runtimeState.taskUnsub,
			chatRunState,
			chatAbortControllers,
			chatQueuedTurns,
			restartRecoveryCandidates,
			removeChatRun,
			agentRunSeq,
			nodeSendToSession,
			resolveActiveSessionIdForKey: resolveActiveEmbeddedRunSessionId,
			markMainSessionsAbortedForRestart: async ({ sessionKeys, sessionIds, activeRuns, reason, isActiveRun }) => {
				if (sessionKeys.size === 0 && sessionIds.size === 0) return;
				const { markRestartAbortedMainSessions } = await import("./main-session-restart-recovery-B_jlnGy5.js");
				await markRestartAbortedMainSessions({
					cfg: getRuntimeConfig(),
					sessionKeys,
					sessionIds,
					activeRuns,
					isActiveRun,
					reason
				});
			},
			getPendingReplyCount: getTotalPendingReplies,
			clients,
			configReloader: { stop: stopConfigReloaderForClose },
			wss,
			httpServer,
			httpServers,
			drainActiveSessionsForShutdown
		})(optsValue);
	};
	let clearFallbackGatewayContextForServer = () => {};
	const closeOnStartupFailure = async () => {
		try {
			await beginClosePrelude();
			await stopRegisteredGatewayLifetimeSidecars();
			await stopRegisteredPostReadySidecars();
			await runClosePrelude();
			await createCloseHandler()({ reason: "gateway startup failed" });
		} finally {
			clearFallbackGatewayContextForServer();
		}
	};
	if (diagnosticsEnabled) startDiagnosticHeartbeat(void 0, {
		getConfig: getRuntimeConfig,
		startupGraceMs: 6e4,
		sampleLiveness: () => {
			const sample = readinessEventLoopHealth.persistentDegradationSnapshot();
			if (!sample || sample.degradedSinceMs == null) return null;
			return {
				reasons: sample.reasons,
				intervalMs: sample.intervalMs,
				degradedSinceMs: sample.degradedSinceMs,
				eventLoopDelayP99Ms: sample.delayP99Ms,
				eventLoopDelayMaxMs: sample.delayMaxMs,
				eventLoopUtilization: sample.utilization,
				cpuCoreRatio: sample.cpuCoreRatio
			};
		}
	});
	return {
		...runtime,
		completeControlUiDeviceAuthMigrationForEffectiveOperator,
		unsubscribeEffectiveOperatorPairing,
		subscribeSessionMessageEvents,
		unsubscribeSessionMessageEvents,
		restartRecoveryCandidates,
		nodeRegistry,
		nodePresenceTimers,
		nodeSendToSession,
		nodeSendToAllSubscribed,
		nodeSubscribe,
		nodeUnsubscribe,
		nodeUnsubscribeAll,
		broadcastVoiceWakeChanged,
		broadcastVoiceWakeRoutingChanged,
		hasTalkNodeConnected,
		watchNodeHttpRuntime,
		terminalSessions,
		runtimeState,
		pluginHostServices,
		lifecycle,
		postReadyState,
		cronReconciliation,
		beginClosePrelude,
		runClosePrelude,
		getRuntimeSnapshot,
		startChannels,
		startChannel,
		stopChannel,
		markChannelLoggedOut,
		refreshGatewayHealthSnapshotWithRuntime,
		stopRegisteredPostReadySidecars,
		stopRegisteredGatewayLifetimeSidecars,
		createCloseHandler,
		clearFallbackGatewayContextForServer: {
			get: () => clearFallbackGatewayContextForServer,
			set: (cleanup) => {
				clearFallbackGatewayContextForServer = cleanup;
			}
		},
		closeOnStartupFailure
	};
}
//#endregion
//#region src/agents/embedded-agent-runner/model-execution-worker.ts
/**
* Worker model execution port — dispatches model API calls to a worker pool.
*
* Phase 3a-2: implements `ModelExecutionPort` using `TopicAffineWorkerPool`.
* Each `stream()` call:
* 1. Creates a `MessageChannel` (port1 stays on main, port2 goes to worker)
* 2. Dispatches `{ model, context, options, streamPort: port2 }` to the pool
*    (port2 is transferred, not cloned)
* 3. Returns an `AssistantMessageEventStreamContract` that iterates events
*    received on port1
*
* The worker calls `streamSimple(model, context, options)`, streams events
* back on port2, and sends a terminal ack on the pool's parentPort.
*
* Abort propagation: when the caller's `options.signal` aborts, main sends
* `{ type: "abort" }` on port1. The worker receives it and aborts the model
* fetch.
*
* Crash recovery: if the worker dies mid-stream, the pool's `dispatch()`
* promise rejects (via the pool's exit/error handler). The stream is ended
* with an error event.
*
* @dft
* - A1 (pure-io-separation): worker IPC is I/O; the stream adapter is state.
* - A4 (dft-docs): this file is documented.
*/
/**
* Resolves the model execution worker URL from the current module URL.
*
* In dev/test (`.ts`): resolves to `./model-execution.worker.ts` relative to
* this module.  In production (`/dist/`): resolves to
* `dist/agents/embedded-agent-runner/model-execution.worker.js`.
*
* Matches the pattern in `compaction-planning-worker.ts`.
*/
function resolveModelExecutionWorkerUrl(currentModuleUrl = import.meta.url) {
	const currentPath = fileURLToPath(currentModuleUrl);
	const distIndex = currentPath.replaceAll(path.sep, "/").lastIndexOf("/dist/");
	if (distIndex >= 0) {
		const distRoot = currentPath.slice(0, distIndex + 6);
		return pathToFileURL(path.join(distRoot, "agents", "embedded-agent-runner", "model-execution.worker.js"));
	}
	const extension = path.extname(currentPath) || ".js";
	return new URL(`./model-execution.worker${extension}`, currentModuleUrl);
}
/**
* Model execution port backed by a `TopicAffineWorkerPool`.
*
* At Scale 1, this replaces `DirectModelExecutionPort` for model API calls.
* The worker handles only HTTP fetch + SSE parse; all prompt/tool/wrapper
* logic stays on main.
*/
var WorkerModelExecutionPort = class {
	constructor(options) {
		this.pool = new TopicAffineWorkerPool({
			workerUrl: options.workerUrl,
			poolSize: options.poolSize,
			queueDepth: options.queueDepth,
			timeoutMs: options.timeoutMs ?? 12e4,
			workerData: { mode: "persistent" }
		});
		this.topicKey = options.topicKey ?? "model-execution";
	}
	stream(model, context, options) {
		const stream = (0, event_stream_exports.createAssistantMessageEventStream)();
		let settled = false;
		if (options?.signal?.aborted) {
			stream.push(this.makeErrorEvent(model, "aborted", "model execution aborted before dispatch"));
			return stream;
		}
		const { port1, port2 } = new MessageChannel();
		port1.unref();
		const { signal: _stripped, ...portableOptions } = options ?? {};
		const input = {
			model,
			context,
			options: portableOptions,
			streamPort: port2
		};
		const dispatchPromise = this.pool.dispatch(this.topicKey, input, [port2]);
		let abortListener;
		if (options?.signal) {
			const signal = options.signal;
			abortListener = () => {
				try {
					port1.postMessage({ type: "abort" });
				} catch {}
			};
			signal.addEventListener("abort", abortListener, { once: true });
		}
		const cleanup = () => {
			if (settled) return;
			settled = true;
			if (abortListener && options?.signal) options.signal.removeEventListener("abort", abortListener);
			try {
				port1.close();
			} catch {}
		};
		port1.on("message", (event) => {
			stream.push(event);
			if (event.type === "done" || event.type === "error") cleanup();
		});
		dispatchPromise.catch((error) => {
			if (settled) return;
			if (error instanceof WorkerPoolError && error.code === "busy") {
				try {
					port1.close();
				} catch {}
				try {
					port2.close();
				} catch {}
				if (abortListener && options?.signal) options.signal.removeEventListener("abort", abortListener);
				try {
					const directStream = streamSimple(model, context, options);
					(async () => {
						for await (const event of directStream) {
							if (settled) return;
							stream.push(event);
							if (event.type === "done" || event.type === "error") {
								settled = true;
								return;
							}
						}
					})().catch(() => {
						if (!settled) {
							settled = true;
							stream.push(this.makeErrorEvent(model, "error", "direct fallback stream failed"));
						}
					});
				} catch (directError) {
					settled = true;
					stream.push(this.makeErrorEvent(model, "error", directError instanceof Error ? directError.message : String(directError)));
				}
				return;
			}
			const message = error instanceof WorkerPoolError ? `model execution worker ${error.code}: ${error.message}` : error instanceof Error ? error.message : String(error);
			stream.push(this.makeErrorEvent(model, "error", message));
			cleanup();
		});
		return stream;
	}
	/**
	* Construct a synthetic error AssistantMessageEvent.
	*
	* Used for crash recovery (3a-4) and pre-abort (3a-4) and graceful
	* degradation failure (3a-5).
	*/
	makeErrorEvent(model, reason, message) {
		return {
			type: "error",
			reason,
			error: {
				role: "assistant",
				content: [],
				api: model.api,
				provider: model.provider,
				model: model.id,
				usage: {
					input: 0,
					output: 0,
					cacheRead: 0,
					cacheWrite: 0,
					totalTokens: 0,
					cost: {
						input: 0,
						output: 0,
						cacheRead: 0,
						cacheWrite: 0,
						total: 0
					}
				},
				stopReason: reason === "aborted" ? "aborted" : "error",
				timestamp: Date.now(),
				errorMessage: message
			}
		};
	}
	/** Terminate the worker pool. */
	async terminate() {
		await this.pool.terminateAll();
	}
};
//#endregion
//#region src/agents/turn-dispatcher.ts
/**
* Scale 0 dispatcher — runs all turns inline on the main event loop.
*
* This is the default (backward-compatible) adapter.  It is also the §3.2
* DirectExecutionDispatcher test double: instantiate it directly in tests,
* no threads spawned, deterministic.
*
* When installed as the admission provider, it preserves the exact behavior
* of "no provider": call `onAdmitted`, then run the task inline.
*/
var MainThreadDispatcher = class {
	async executeLocalTurn(_claim, runLocal) {
		return await runLocal();
	}
	async executeTurn(_claim, _params, runLocal, onAdmitted) {
		onAdmitted?.();
		return await runLocal();
	}
};
//#endregion
//#region src/agents/worker-pool-dispatcher.ts
/**
* Scale 1 dispatcher — topic-affine worker pool with main-thread turn execution.
*
* The pool is created eagerly so it's warm when the first subtask arrives.
* Turn execution delegates to `MainThreadDispatcher` (Scale 1 partial).
*/
var WorkerPoolDispatcher = class {
	constructor(options) {
		this.mainThread = new MainThreadDispatcher();
		this.pool = options.workerUrl ? new TopicAffineWorkerPool({
			workerUrl: options.workerUrl,
			poolSize: options.poolSize,
			queueDepth: options.queueDepth
		}) : null;
	}
	async executeLocalTurn(claim, runLocal) {
		return this.mainThread.executeLocalTurn(claim, runLocal);
	}
	async executeTurn(claim, params, runLocal, onAdmitted) {
		return this.mainThread.executeTurn(claim, params, runLocal, onAdmitted);
	}
	/** Terminate the worker pool (no-op when no pool is configured). */
	async terminate() {
		await this.pool?.terminateAll();
	}
};
/**
* Resolve the runtime scale from config and host capabilities.
*
* Pure — same inputs always yield the same output.
*
* @example
*   resolveRuntimeScale({}, { availableParallelism: 1 })
*     // → { scale: 0, poolSize: 0, isolation: "auto", reason: "auto: 1 CPU → Scale 0" }
*   resolveRuntimeScale({ isolation: "in-process", workerCount: 4 }, { availableParallelism: 8 })
*     // → { scale: 1, poolSize: 4, isolation: "in-process", reason: "in-process: poolSize 4" }
*   resolveRuntimeScale({ isolation: "remote" }, { availableParallelism: 8 })
*     // → { scale: 2, poolSize: 0, isolation: "remote", reason: "remote: SSH worker environments" }
*/
function resolveRuntimeScale(config, host) {
	const isolation = config.isolation ?? "auto";
	const cpus = Math.max(1, Math.floor(host.availableParallelism) || 1);
	if (isolation === "remote") return {
		scale: 2,
		poolSize: 0,
		isolation: "remote",
		reason: "remote: SSH worker environments"
	};
	if (isolation === "in-process") {
		const poolSize = clampPoolSize(config.workerCount ?? cpus);
		return {
			scale: 1,
			poolSize,
			isolation: "in-process",
			reason: `in-process: poolSize ${poolSize}`
		};
	}
	if (isolation === "disabled") return {
		scale: 0,
		poolSize: 0,
		isolation: "disabled",
		reason: "disabled: single-threaded, main loop only"
	};
	if (cpus <= 1) return {
		scale: 0,
		poolSize: 0,
		isolation: "auto",
		reason: `auto: ${cpus} CPU → Scale 0 (inline)`
	};
	const poolSize = clampPoolSize(config.workerCount ?? cpus);
	return {
		scale: 1,
		poolSize,
		isolation: "auto",
		reason: `auto: ${cpus} CPUs → Scale 1 (in-process pool, poolSize ${poolSize})`
	};
}
function clampPoolSize(requested) {
	return Math.max(1, Math.min(64, Math.floor(requested) || 1));
}
//#endregion
//#region src/process/runtime-setup.ts
/**
* Runtime setup — wires the TurnDispatcher + ModelExecutionPort based on
* config + host capabilities.
*
* Called at gateway startup.  Reads `agents.defaults.runtime` from config,
* resolves the scale via the pure `runtime-scale-policy`, and installs the
* appropriate dispatchers.
*
* Scale 0 (auto on 1-CPU, or disabled):
*   - No TurnDispatcher installed (default — turns run inline on main loop).
*   - DirectModelExecutionPort (default — model calls run on main).
*   - Per-session admission only.
*
* Scale 1 (in-process, or auto on >1-CPU):
*   - WorkerPoolDispatcher installed (for the turn admission provider
*     interface).  Turn execution still delegates to MainThreadDispatcher
*     (full turn dispatch requires serializing ~200 params — deferred).
*   - WorkerModelExecutionPort installed (3a-3): model API calls offloaded
*     to a TopicAffineWorkerPool.  This is the real Scale 1 parallelism —
*     model fetch + SSE parse runs in a worker, main loop stays I/O-free.
*
* Scale 2 (remote): the existing `worker-environments` layer handles
*   installation; this module does not override it.
*
* Cleanup (1b): returns a `cleanup()` function that uninstalls providers
* and terminates pools.  The caller registers this as a gateway lifetime
* sidecar so it runs on shutdown.
*
* @dft
* - A1 (pure-io-separation): the scale decision is pure (runtime-scale-policy);
*   the provider installation is I/O (this module).
* - A4 (dft-docs): this file is documented.
*/
/**
* Read the config, resolve the scale, and install the dispatcher if needed.
*
* @returns The resolved scale, the installed dispatcher, and a cleanup function.
*/
function setupRuntime(config) {
	const scale = resolveRuntimeScale(config?.agents?.defaults?.runtime ?? {}, { availableParallelism: typeof os.availableParallelism === "function" ? os.availableParallelism() : os.cpus().length });
	if (scale.scale === 1) {
		const dispatcher = new WorkerPoolDispatcher({ poolSize: scale.poolSize });
		const uninstallDispatcher = installSessionPlacementAdmissionProvider(dispatcher);
		const modelExecutionPort = new WorkerModelExecutionPort({
			workerUrl: resolveModelExecutionWorkerUrl(),
			poolSize: scale.poolSize
		});
		const uninstallModelPort = installModelExecutionPort(modelExecutionPort);
		const cleanup = async () => {
			uninstallDispatcher();
			uninstallModelPort();
			await dispatcher.terminate();
			await modelExecutionPort.terminate();
			await terminateCompactionPlanningPool();
		};
		return {
			scale,
			dispatcher,
			modelExecutionPort,
			cleanup
		};
	}
	return {
		scale,
		dispatcher: null,
		modelExecutionPort: null,
		cleanup: () => terminateCompactionPlanningPool()
	};
}
//#endregion
//#region src/gateway/node-reapproval-coordinator.ts
const pendingNodeReapprovalAttempts = new KeyedAsyncQueue();
function normalizeFingerprintList(value) {
	return value ? [...new Set(value.map((entry) => entry.trim()).filter((entry) => entry.length > 0))].toSorted() : void 0;
}
function buildRequestFingerprint(input) {
	const permissions = input.permissions ? Object.fromEntries(Object.entries(input.permissions).toSorted(([left], [right]) => left.localeCompare(right))) : void 0;
	return JSON.stringify({
		nodeId: input.nodeId.trim(),
		clientId: input.clientId,
		clientMode: input.clientMode,
		displayName: input.displayName,
		platform: input.platform,
		version: input.version,
		coreVersion: input.coreVersion,
		uiVersion: input.uiVersion,
		deviceFamily: input.deviceFamily,
		modelIdentifier: input.modelIdentifier,
		caps: normalizeFingerprintList(input.caps),
		commands: normalizeFingerprintList(input.commands),
		permissions,
		remoteIp: input.remoteIp,
		silent: Boolean(input.silent)
	});
}
/** Creates the gateway-lifetime owner for paired-node reapproval write limits. */
function createNodeReapprovalCoordinator(config) {
	const limiter = createAuthRateLimiter({
		...config,
		exemptLoopback: false
	});
	const requestStates = /* @__PURE__ */ new Map();
	let disposed = false;
	const executeRequest = async ({ input, cleanupClaim, baseDir }) => {
		if (disposed) return null;
		const reused = await reusePendingNodePairingForReconnect(input, cleanupClaim, baseDir);
		if (reused) return reused;
		const identityKey = buildRateLimitIdentityKey("node", input.nodeId.trim());
		if (!limiter.check(identityKey, "node-reapproval").allowed) return null;
		const result = await requestNodePairing(input, baseDir);
		limiter.recordFailure(identityKey, AUTH_RATE_LIMIT_SCOPE_NODE_REAPPROVAL);
		return result;
	};
	const finishActiveRequest = (nodeId, state, fingerprint) => {
		if (requestStates.get(nodeId) !== state || state.activeFingerprint !== fingerprint) return;
		if (!state.queued) requestStates.delete(nodeId);
	};
	const startFirstRequest = (nodeId, state, request) => {
		pendingNodeReapprovalAttempts.enqueue(`node-reapproval:${nodeId}`, async () => {
			try {
				request.deferred.resolve(await executeRequest(request.params));
			} catch (error) {
				request.deferred.reject(error);
			} finally {
				finishActiveRequest(nodeId, state, request.fingerprint);
			}
		});
	};
	const startQueuedRequest = (nodeId, state) => {
		pendingNodeReapprovalAttempts.enqueue(`node-reapproval:${nodeId}`, async () => {
			const queued = state.queued;
			if (!queued) return;
			state.queued = void 0;
			state.activeFingerprint = queued.fingerprint;
			try {
				queued.deferred.resolve(await executeRequest(queued.params));
				for (const follower of queued.followers) follower.resolve(null);
			} catch (error) {
				queued.deferred.reject(error);
				for (const follower of queued.followers) follower.reject(error);
			} finally {
				finishActiveRequest(nodeId, state, queued.fingerprint);
			}
		});
	};
	return {
		request(params) {
			if (disposed) return Promise.resolve(null);
			const nodeId = params.input.nodeId.trim();
			const fingerprint = buildRequestFingerprint(params.input);
			const state = requestStates.get(nodeId);
			if (!state) {
				const deferred = createDeferred();
				const nextState = { activeFingerprint: fingerprint };
				requestStates.set(nodeId, nextState);
				startFirstRequest(nodeId, nextState, {
					fingerprint,
					params,
					deferred,
					followers: []
				});
				return deferred.promise;
			}
			if (state.queued?.fingerprint === fingerprint) {
				const follower = createDeferred();
				state.queued.params = params;
				state.queued.followers.push(follower);
				return follower.promise;
			}
			const deferred = createDeferred();
			if (state.queued) {
				state.queued.deferred.resolve(null);
				for (const follower of state.queued.followers) follower.resolve(null);
				state.queued = {
					fingerprint,
					params,
					deferred,
					followers: []
				};
			} else {
				state.queued = {
					fingerprint,
					params,
					deferred,
					followers: []
				};
				startQueuedRequest(nodeId, state);
			}
			return deferred.promise;
		},
		async finalizeCleanup(claim) {
			return await pendingNodeReapprovalAttempts.enqueue(`node-reapproval:${claim.nodeId}`, async () => await finalizeNodePairingCleanupClaim(claim));
		},
		dispose() {
			disposed = true;
			for (const state of requestStates.values()) {
				state.queued?.deferred.resolve(null);
				for (const follower of state.queued?.followers ?? []) follower.resolve(null);
			}
			requestStates.clear();
			limiter.dispose();
		}
	};
}
//#endregion
//#region src/gateway/server-control-ui-root.ts
function resolveAutoRoot() {
	return resolveControlUiRootSync({
		moduleUrl: import.meta.url,
		argv1: process.argv[1],
		cwd: process.cwd()
	});
}
function createResolvedRootState(root, configured = false) {
	return {
		kind: !configured && isPackageProvenControlUiRootSync(root, {
			moduleUrl: import.meta.url,
			argv1: process.argv[1],
			cwd: process.cwd()
		}) ? "bundled" : "resolved",
		path: root,
		realPath: fs.realpathSync(root)
	};
}
function prepareResolvedRootState(params) {
	try {
		return createResolvedRootState(params.root, params.configured);
	} catch (error) {
		const detail = error instanceof Error ? error.message : String(error);
		const message = `Control UI assets are unavailable at ${params.root}: ${detail}`;
		params.log.warn(`gateway: ${message}`);
		return params.configured ? {
			kind: "invalid",
			path: path.resolve(params.root)
		} : { kind: "failed" };
	}
}
/** Prepare the stable root reference shared by every HTTP listener. */
function createGatewayControlUiRootLifecycle(params) {
	let state;
	if (params.controlUiRootOverride) {
		const resolvedOverride = resolveControlUiRootOverrideSync(params.controlUiRootOverride);
		const resolvedOverridePath = path.resolve(params.controlUiRootOverride);
		if (!resolvedOverride) {
			params.log.warn(`gateway: controlUi.root not found at ${resolvedOverridePath}`);
			state = {
				kind: "invalid",
				path: resolvedOverridePath
			};
		} else state = prepareResolvedRootState({
			root: resolvedOverride,
			configured: true,
			log: params.log
		});
	} else if (params.controlUiEnabled) {
		const resolvedRoot = resolveAutoRoot();
		state = resolvedRoot && isControlUiStartupAssetsReady(resolvedRoot) ? prepareResolvedRootState({
			root: resolvedRoot,
			log: params.log
		}) : { kind: "preparing" };
	}
	let buildPromise;
	const start = (isStopped, signal) => {
		if (state?.kind !== "preparing" || isStopped() || signal.aborted) return Promise.resolve();
		const preparingState = state;
		buildPromise ??= (async () => {
			try {
				const result = await ensureControlUiAssetsBuilt(params.gatewayRuntime, { signal });
				if (isStopped() || signal.aborted) return;
				if (!result.ok) {
					const message = result.message ?? "Control UI assets could not be built.";
					Object.assign(preparingState, { kind: "failed" });
					params.log.warn(`gateway: ${message}`);
					return;
				}
				const resolvedRoot = resolveAutoRoot();
				if (!resolvedRoot || !isControlUiStartupAssetsReady(resolvedRoot)) {
					const message = resolvedRoot ? `Control UI assets at ${resolvedRoot} remain incomplete. Run \`openclaw doctor --fix\` or reinstall OpenClaw.` : "Control UI build completed, but its assets are still unavailable. Run `pnpm ui:build`.";
					Object.assign(preparingState, { kind: "failed" });
					params.log.warn(`gateway: ${message}`);
					return;
				}
				Object.assign(preparingState, createResolvedRootState(resolvedRoot));
			} catch (error) {
				if (isStopped() || signal.aborted) return;
				const message = `Control UI assets build failed: ${error instanceof Error ? error.message : String(error)}`;
				Object.assign(preparingState, { kind: "failed" });
				params.log.warn(`gateway: ${message}`);
			}
		})();
		return buildPromise;
	};
	return {
		state,
		start,
		stop: async () => {
			await buildPromise;
		}
	};
}
//#endregion
//#region src/gateway/mcp-app-sandbox-http.ts
const MCP_APP_PERMISSIONS_POLICY = "camera=(), microphone=(), geolocation=(), clipboard-write=()";
function handleMcpAppSandboxHttpRequest(req, res) {
	let url;
	try {
		url = new URL(req.url ?? "/", "http://localhost");
	} catch {
		res.statusCode = 400;
		res.end("Bad Request");
		return;
	}
	if (url.pathname !== "/mcp-app-sandbox" || req.method !== "GET" && req.method !== "HEAD") {
		res.statusCode = 404;
		res.end("Not Found");
		return;
	}
	let csp;
	try {
		csp = decodeSandboxHostCsp(url.searchParams.get("csp"));
	} catch {
		res.statusCode = 400;
		res.setHeader("Content-Type", "text/plain; charset=utf-8");
		res.end("invalid MCP App sandbox policy");
		return;
	}
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html; charset=utf-8");
	res.setHeader("Cache-Control", "no-store");
	res.setHeader("Content-Security-Policy", buildSandboxHostContentSecurityPolicy(csp));
	res.setHeader("Permissions-Policy", MCP_APP_PERMISSIONS_POLICY);
	res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
	res.setHeader("Origin-Agent-Cluster", "?1");
	res.setHeader("Referrer-Policy", "no-referrer");
	res.setHeader("X-Content-Type-Options", "nosniff");
	res.end(req.method === "HEAD" ? void 0 : buildSandboxHostProxyHtml(csp));
}
/** Dedicated listener: this origin must never serve Control UI or authenticated Gateway data. */
function createSandboxHostHttpServer(tlsOptions) {
	const handler = (req, res) => {
		handleMcpAppSandboxHttpRequest(req, res);
	};
	return tlsOptions ? createServer$1(tlsOptions, handler) : createServer(handler);
}
//#endregion
//#region src/gateway/server-broadcast.ts
const EVENT_SCOPE_GUARDS = {
	agent: [READ_SCOPE],
	chat: [READ_SCOPE],
	"board.changed": [READ_SCOPE],
	"board.command": [READ_SCOPE],
	"ui.command": [READ_SCOPE],
	"chat.send_timing": [READ_SCOPE],
	"chat.side_result": [READ_SCOPE],
	cron: [READ_SCOPE],
	health: [],
	"exec.approval.requested": [APPROVALS_SCOPE],
	"exec.approval.resolved": [APPROVALS_SCOPE],
	"question.requested": [QUESTIONS_SCOPE],
	"question.resolved": [QUESTIONS_SCOPE],
	heartbeat: [],
	"plugin.approval.requested": [APPROVALS_SCOPE],
	"plugin.approval.resolved": [APPROVALS_SCOPE],
	"openclaw.approval.requested": [APPROVALS_SCOPE],
	"openclaw.approval.resolved": [APPROVALS_SCOPE],
	presence: [],
	shutdown: [],
	tick: [],
	"talk.event": [READ_SCOPE],
	"talk.mode": [TALK_SCOPE],
	task: [READ_SCOPE],
	"task.suggestion": [READ_SCOPE],
	"update.available": [],
	"config.changed": [READ_SCOPE],
	"skills.changed": [READ_SCOPE],
	"voicewake.changed": [READ_SCOPE],
	"voicewake.routing.changed": [READ_SCOPE],
	"device.pair.requested": [PAIRING_SCOPE],
	"device.pair.resolved": [PAIRING_SCOPE],
	"node.pair.requested": [PAIRING_SCOPE],
	"node.pair.resolved": [PAIRING_SCOPE],
	"node.presence": [READ_SCOPE],
	"sessions.catalog.host": [READ_SCOPE],
	"sessions.changed": [READ_SCOPE],
	"controlUi.sessionPullRequests.changed": [READ_SCOPE],
	"session.approval": [APPROVALS_SCOPE],
	"session.message": [READ_SCOPE],
	"session.observer": [READ_SCOPE],
	"session.operation": [READ_SCOPE],
	"session.sharing": [READ_SCOPE],
	"session.suggestion": [READ_SCOPE],
	"session.typing": [READ_SCOPE],
	"session.tool": [READ_SCOPE],
	"terminal.data": [ADMIN_SCOPE],
	"terminal.exit": [ADMIN_SCOPE]
};
const SESSION_SUBSCRIPTION_EVENTS = /* @__PURE__ */ new Set([
	"agent",
	"chat",
	"chat.side_result",
	"session.observer"
]);
function serializeFrameField(name, value) {
	const fieldJSON = JSON.stringify({ [name]: value });
	const keyJSON = JSON.stringify(name);
	const prefix = `{${keyJSON}:`;
	return fieldJSON.startsWith(prefix) ? `,${keyJSON}:${fieldJSON.slice(prefix.length, -1)}` : "";
}
function resolveBroadcastSessionScope(payload, explicit, explicitAgentId) {
	if (!payload || typeof payload !== "object" || Array.isArray(payload)) return {
		sessionKeys: explicit ?? [],
		...explicitAgentId ? { agentId: explicitAgentId } : {}
	};
	const record = payload;
	const source = [
		record,
		record.suggestion,
		record.request
	].find((candidate) => typeof candidate?.sessionKey === "string" && candidate.sessionKey.trim());
	const sessionKey = typeof source?.sessionKey === "string" ? source.sessionKey.trim() : "";
	const agentId = explicitAgentId ?? (typeof source?.agentId === "string" ? source.agentId.trim() || void 0 : void 0);
	return {
		sessionKeys: explicit?.length ? explicit : sessionKey ? [sessionKey] : [],
		...agentId ? { agentId } : {}
	};
}
function hasEventScope(client, event, explicitPluginScope) {
	if (client.connectionKind === "worker") return false;
	const role = client.connect.role ?? "operator";
	const scopes = Array.isArray(client.connect.scopes) ? client.connect.scopes : [];
	if (explicitPluginScope) {
		if (role !== "operator") return false;
		if (scopes.includes("operator.admin")) return true;
		return explicitPluginScope === "operator.read" ? scopes.includes("operator.read") || scopes.includes("operator.write") : explicitPluginScope === "operator.write" && scopes.includes("operator.write");
	}
	const required = EVENT_SCOPE_GUARDS[event];
	if (!required && event.startsWith("plugin.")) {
		if (role !== "operator") return false;
		return scopes.includes("operator.write") || scopes.includes("operator.admin");
	}
	if (!required) return false;
	if (required.length === 0) return true;
	if (role !== "operator") return false;
	if (scopes.includes("operator.admin")) return true;
	if (required.includes("operator.read")) return scopes.includes("operator.read") || scopes.includes("operator.write");
	if (required.includes("operator.talk")) return scopes.includes("operator.talk") || scopes.includes("operator.write");
	return required.some((scope) => scopes.includes(scope));
}
function createGatewayBroadcaster(params) {
	const clientSeq = /* @__PURE__ */ new WeakMap();
	const reportedSlowPayloadClients = /* @__PURE__ */ new WeakSet();
	const broadcastInternal = (event, payload, opts, targetConnIds, explicitPluginScope) => {
		if (event === "sessions.changed") queuePluginSessionsChanged(payload);
		if (params.clients.size === 0) return;
		const { sessionKeys, agentId } = resolveBroadcastSessionScope(payload, opts?.sessionKeys, opts?.agentId);
		const isTargeted = Boolean(targetConnIds);
		if (shouldLogWs()) {
			const logMeta = {
				event,
				seq: isTargeted ? "targeted" : "per-client",
				clients: params.clients.size,
				targets: targetConnIds ? targetConnIds.size : void 0,
				dropIfSlow: opts?.dropIfSlow,
				presenceVersion: opts?.stateVersion?.presence,
				healthVersion: opts?.stateVersion?.health
			};
			if (event === "agent") Object.assign(logMeta, summarizeAgentEventForWsLog(payload));
			logWs("out", "event", logMeta);
		}
		let frameBase;
		const getFrameBase = () => {
			if (!frameBase) frameBase = {
				eventJSON: JSON.stringify(event),
				payloadFragment: serializeFrameField("payload", payload),
				stateVersionFragment: opts?.stateVersion === void 0 ? "" : serializeFrameField("stateVersion", opts.stateVersion)
			};
			return frameBase;
		};
		for (const c of params.clients) {
			if (c.invalidated === true) continue;
			if (targetConnIds && !targetConnIds.has(c.connId)) continue;
			if (!hasEventScope(c, event, explicitPluginScope)) continue;
			if (sessionKeys.length > 0 && params.canReceiveSessionEvent && !params.canReceiveSessionEvent(c, sessionKeys, agentId, event, payload)) continue;
			if ((event === "session.typing" || (isBrowserCopilotClient(c.connect.client) || hasGatewayClientCap(c.connect.caps, GATEWAY_CLIENT_CAPS.SESSION_SCOPED_EVENTS)) && SESSION_SUBSCRIPTION_EVENTS.has(event)) && (!sessionKeys.length || !sessionKeys.some((sessionKey) => params.sessionMessageSubscribers?.get(sessionKey).has(c.connId)))) continue;
			const nextSeq = (clientSeq.get(c) ?? 0) + 1;
			const slow = c.socket.bufferedAmount > MAX_BUFFERED_BYTES;
			if (!slow) reportedSlowPayloadClients.delete(c);
			else if (!reportedSlowPayloadClients.has(c)) {
				reportedSlowPayloadClients.add(c);
				logRejectedLargePayload({
					surface: "gateway.ws.outbound_buffer",
					bytes: c.socket.bufferedAmount,
					limitBytes: MAX_BUFFERED_BYTES,
					reason: opts?.dropIfSlow ? "ws_send_buffer_drop" : "ws_send_buffer_close"
				});
			}
			if (slow && opts?.dropIfSlow) {
				if (!isTargeted) clientSeq.set(c, nextSeq);
				continue;
			}
			if (slow) {
				try {
					c.socket.close(1008, "slow consumer");
				} catch {}
				continue;
			}
			try {
				const eventSeq = isTargeted ? void 0 : nextSeq;
				if (!isTargeted) clientSeq.set(c, nextSeq);
				const base = getFrameBase();
				const seqFragment = eventSeq === void 0 ? "" : `,"seq":${eventSeq}`;
				const frame = `{"type":"event","event":${base.eventJSON}${base.payloadFragment}${seqFragment}${base.stateVersionFragment}}`;
				c.socket.send(frame);
			} catch {}
		}
	};
	const broadcast = (event, payload, opts) => broadcastInternal(event, payload, opts);
	const broadcastToConnIds = (event, payload, connIds, opts) => {
		broadcastInternal(event, payload, opts, connIds);
	};
	const getBufferedAmount = (connId) => {
		for (const client of params.clients) if (client.connId === connId) return client.socket.bufferedAmount;
	};
	const broadcastPluginEvent = (event, payload, scope) => {
		if (!event.startsWith("plugin.") || event.startsWith("plugin.approval.")) throw new Error(`invalid plugin gateway event: ${event}`);
		if (scope !== "operator.read" && scope !== "operator.write" && scope !== "operator.admin") throw new Error("invalid plugin gateway event scope");
		broadcastInternal(event, payload, void 0, void 0, scope);
	};
	return {
		broadcast,
		broadcastToConnIds,
		broadcastPluginEvent,
		getBufferedAmount
	};
}
//#endregion
//#region src/channels/plugins/gateway-auth-bypass.ts
const GATEWAY_AUTH_API_ARTIFACT_BASENAME = "gateway-auth-api.js";
const MISSING_PUBLIC_SURFACE_PREFIX = "Unable to resolve bundled plugin public surface ";
/** Resolves to null when the plugin is not activated or ships no gateway auth artifact. */
async function loadChannelGatewayAuthApi(channelId) {
	try {
		return await tryLoadActivatedBundledPluginPublicSurfaceModule({
			dirName: channelId,
			artifactBasename: GATEWAY_AUTH_API_ARTIFACT_BASENAME
		});
	} catch (error) {
		if (error instanceof Error && error.message.startsWith(MISSING_PUBLIC_SURFACE_PREFIX)) return null;
		throw error;
	}
}
/**
* Resolves configured gateway auth bypass paths from a channel plugin artifact.
*/
async function resolveBundledChannelGatewayAuthBypassPaths(params) {
	return ((await loadChannelGatewayAuthApi(params.channelId))?.resolveGatewayAuthBypassPaths?.({ cfg: params.cfg }) ?? []).flatMap((path) => typeof path === "string" && path.trim() ? [path.trim()] : []);
}
//#endregion
//#region src/gateway/server-http.ts
const getControlUiModule = createLazyRuntimeModule(() => import("./control-ui-CUsFZJtm.js"));
const getCanvasServeModule = createLazyRuntimeModule(() => import("./serve.runtime.js"));
const getBoardHttpModule = createLazyRuntimeModule(() => import("./board-http-Dp26sTMC.js"));
const getEmbeddingsHttpModule = createLazyRuntimeModule(() => import("./embeddings-http-Dpqt06Nh.js"));
const getManagedMediaAttachmentsModule = createLazyRuntimeModule(() => import("./managed-image-attachments-DVxVcA0W.js"));
const getMcpAppStandaloneModule = createLazyRuntimeModule(() => import("./mcp-app-standalone-DXIstyPM.js"));
const getPluginIconHttpModule = createLazyRuntimeModule(() => import("./plugin-icon-http-CoS05I-A.js"));
const getModelsHttpModule = createLazyRuntimeModule(() => import("./models-http-Jk735e6q.js"));
const getOpenAiHttpModule = createLazyRuntimeModule(() => import("./openai-http-L55MEEws.js"));
const getOpenResponsesHttpModule = createLazyRuntimeModule(() => import("./openresponses-http-Is2Hh47U.js"));
const getSessionHistoryHttpModule = createLazyRuntimeModule(() => import("./sessions-history-http-CBxbnH--.js"));
const getSessionKillHttpModule = createLazyRuntimeModule(() => import("./session-kill-http-BsgBDXI0.js"));
const getToolsInvokeHttpModule = createLazyRuntimeModule(() => import("./tools-invoke-http-CXjg8ajt.js"));
const getUserProfilesHttpModule = createLazyRuntimeModule(() => import("./user-profiles-http-fiIcKm-S.js"));
const getPluginNodeCapabilityAuthModule = createLazyRuntimeModule(() => import("./plugin-node-capability-auth-IMbic4UF.js"));
const getHttpAuthUtilsModule = createLazyRuntimeModule(() => import("./http-auth-utils-Baa-HMFp.js"));
const getPluginRouteRuntimeScopesModule = createLazyRuntimeModule(() => import("./plugin-route-runtime-scopes-U1QWNjH0.js"));
const pluginGatewayAuthBypassPathsCache = /* @__PURE__ */ new WeakMap();
async function resolvePluginGatewayAuthBypassPaths(configSnapshot) {
	const paths = /* @__PURE__ */ new Set();
	const configuredChannels = configSnapshot.channels;
	if (!configuredChannels || Object.keys(configuredChannels).length === 0) return paths;
	for (const channelId of Object.keys(configuredChannels)) for (const path of await resolveBundledChannelGatewayAuthBypassPaths({
		channelId,
		cfg: configSnapshot
	})) paths.add(path);
	return paths;
}
function getCachedPluginGatewayAuthBypassPaths(configSnapshot) {
	const cached = pluginGatewayAuthBypassPathsCache.get(configSnapshot);
	if (cached) return cached;
	const resolved = resolvePluginGatewayAuthBypassPaths(configSnapshot).catch((error) => {
		pluginGatewayAuthBypassPathsCache.delete(configSnapshot);
		throw error;
	});
	pluginGatewayAuthBypassPathsCache.set(configSnapshot, resolved);
	return resolved;
}
function shouldEnforceDefaultPluginGatewayAuth(pathContext) {
	return pathContext.malformedEncoding || pathContext.decodePassLimitReached || isProtectedPluginRoutePathFromContext(pathContext);
}
/** Handles live/ready probe endpoints before normal gateway routing. */
async function handleGatewayProbeRequest(req, res, requestPath, resolvedAuth, trustedProxies, allowRealIpFallback, getReadiness) {
	const status = classifyGatewayProbePath(requestPath);
	if (status === "namespace" || status === "outside") return false;
	const method = (req.method ?? "GET").toUpperCase();
	if (method !== "GET" && method !== "HEAD") {
		res.statusCode = 405;
		res.setHeader("Allow", "GET, HEAD");
		res.setHeader("Content-Type", "text/plain; charset=utf-8");
		res.end("Method Not Allowed");
		return true;
	}
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.setHeader("Cache-Control", "no-store");
	let statusCode;
	let body;
	if (status === "ready" && getReadiness) {
		let includeDetails = isLocalDirectRequest(req, trustedProxies, allowRealIpFallback);
		if (!includeDetails && resolvedAuth.mode !== "none") {
			const { getBearerToken, resolveHttpBrowserOriginPolicy } = await getHttpAuthUtilsModule();
			const bearerToken = getBearerToken(req);
			includeDetails = (await authorizeHttpGatewayConnect({
				auth: resolvedAuth,
				connectAuth: bearerToken ? {
					token: bearerToken,
					password: bearerToken
				} : null,
				req,
				trustedProxies,
				allowRealIpFallback,
				browserOriginPolicy: resolveHttpBrowserOriginPolicy(req)
			})).ok;
		}
		try {
			const result = getReadiness();
			statusCode = result.ready ? 200 : 503;
			body = JSON.stringify(includeDetails ? result : { ready: result.ready });
		} catch {
			statusCode = 503;
			body = JSON.stringify(includeDetails ? {
				ready: false,
				failing: ["internal"],
				uptimeMs: 0
			} : { ready: false });
		}
	} else {
		statusCode = 200;
		body = JSON.stringify({
			ok: true,
			status
		});
	}
	res.statusCode = statusCode;
	res.end(method === "HEAD" ? void 0 : body);
	return true;
}
function writeUpgradeAuthFailure(socket, auth) {
	if (auth.rateLimited) {
		const retryAfterSeconds = auth.retryAfterMs && auth.retryAfterMs > 0 ? Math.ceil(auth.retryAfterMs / 1e3) : void 0;
		const body = JSON.stringify({ error: {
			message: "Too many failed authentication attempts. Please try again later.",
			type: "rate_limited"
		} });
		socket.write([
			"HTTP/1.1 429 Too Many Requests",
			...retryAfterSeconds ? [`Retry-After: ${retryAfterSeconds}`] : [],
			"Content-Type: application/json; charset=utf-8",
			`Content-Length: ${Buffer.byteLength(body, "utf8")}`,
			"Connection: close",
			"",
			body
		].join("\r\n"));
		return;
	}
	socket.write("HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n");
}
function isWebSocketUpgradeRequest(req) {
	const headerContains = (value, token) => (typeof value === "string" ? [value] : value ?? []).some((entry) => entry.toLowerCase().split(",").some((part) => part.trim() === token));
	return headerContains(req.headers.upgrade, "websocket") && headerContains(req.headers.connection, "upgrade");
}
async function runGatewayHttpRequestStages(stages) {
	for (const stage of stages) try {
		if (await stage.run()) return true;
	} catch (err) {
		if (!stage.continueOnError) throw err;
		console.error(`[gateway-http] stage "${stage.name}" threw — skipping:`, err);
	}
	return false;
}
/** Creates the gateway HTTP/HTTPS server and ordered request-stage router. */
function createGatewayHttpServer(opts) {
	const { clients, controlUiEnabled, controlUiBasePath, controlUiRoot, openAiChatCompletionsEnabled, openAiChatCompletionsConfig, openResponsesEnabled, openResponsesConfig, strictTransportSecurityHeader, handleHooksRequest, handlePluginRequest, shouldEnforcePluginGatewayAuth, resolvePluginNodeCapabilityRoute, resolvedAuth, rateLimiter, getReadiness } = opts;
	const getResolvedAuth = opts.getResolvedAuth ?? (() => resolvedAuth);
	const loadGatewayConfig = opts.getRuntimeConfig ?? getRuntimeConfig;
	const openAiCompatEnabled = openAiChatCompletionsEnabled || openResponsesEnabled;
	const controlUiRouteBasePath = controlUiBasePath && controlUiBasePath !== "/" ? controlUiBasePath.replace(/\/$/, "") : "";
	const handleServerRequest = (req, res) => {
		runWithDiagnosticTraceContext(createDiagnosticTraceContext(), () => handleRequest(req, res)).catch((error) => {
			console.error("[gateway-http] failed to finalize request:", error);
			if (!res.destroyed) res.destroy(error instanceof Error ? error : void 0);
		});
	};
	const httpServer = opts.tlsOptions ? createServer$1(opts.tlsOptions, handleServerRequest) : createServer(handleServerRequest);
	async function handleRequest(req, res) {
		setDefaultSecurityHeaders(res, { strictTransportSecurity: strictTransportSecurityHeader });
		if (isWebSocketUpgradeRequest(req)) return;
		if (req.headers.upgrade !== void 0) {
			res.statusCode = 400;
			res.setHeader("Connection", "close");
			res.setHeader("Content-Type", "text/plain; charset=utf-8");
			res.end("Bad Request");
			return;
		}
		try {
			const requestPath = URL.parse(req.url ?? "/", "http://localhost")?.pathname;
			if (requestPath === void 0) {
				sendGatewayAuthFailure(res, {
					ok: false,
					reason: "unauthorized"
				});
				return;
			}
			if (classifyGatewayProbePath(requestPath) === "live") {
				await handleGatewayProbeRequest(req, res, requestPath, getResolvedAuth(), [], false, getReadiness);
				return;
			}
			const configSnapshot = loadGatewayConfig();
			const trustedProxies = configSnapshot.gateway?.trustedProxies ?? [];
			const allowRealIpFallback = configSnapshot.gateway?.allowRealIpFallback === true;
			const scopedNodeCapability = normalizePluginNodeCapabilityScopedUrl(req.url ?? "/");
			if (scopedNodeCapability.malformedScopedPath) {
				sendGatewayAuthFailure(res, {
					ok: false,
					reason: "unauthorized"
				});
				return;
			}
			if (scopedNodeCapability.rewrittenUrl) req.url = scopedNodeCapability.rewrittenUrl;
			const scopedRequestPath = scopedNodeCapability.pathname;
			const pluginPathContext = resolvePluginRoutePathContext(scopedRequestPath);
			const nodeCapability = resolvePluginNodeCapabilityRoute?.(pluginPathContext);
			const resolvedAuthValue = getResolvedAuth();
			const routeAuth = {
				auth: resolvedAuthValue,
				trustedProxies,
				allowRealIpFallback,
				rateLimiter
			};
			const controlUiRouteOptions = {
				basePath: controlUiBasePath,
				config: configSnapshot,
				...routeAuth
			};
			const handleControlUiRequest = async () => (await getControlUiModule()).handleControlUiHttpRequest(req, res, {
				...controlUiRouteOptions,
				terminalEnabled: opts.isTerminalEnabled?.() ?? isTerminalConfigEnabled(configSnapshot),
				agentId: resolveAssistantIdentity({ cfg: configSnapshot }).agentId,
				root: controlUiRoot
			});
			const requestStages = [{
				name: "gateway-probes",
				run: () => handleGatewayProbeRequest(req, res, scopedRequestPath, resolvedAuthValue, trustedProxies, allowRealIpFallback, getReadiness)
			}, {
				name: "hooks",
				run: () => handleHooksRequest(req, res)
			}];
			const addRequestStage = (name, enabled, run, admitted = false) => {
				if (enabled) requestStages.push({
					name,
					run: admitted ? () => runWithGatewayHttpWorkAdmission(res, run) : run
				});
			};
			const addAdmittedStage = (name, enabled, run) => addRequestStage(name, enabled, run, true);
			addAdmittedStage("watch-node", Boolean(opts.handleWatchNodeRequest) && scopedRequestPath.startsWith("/api/nodes/watch/"), () => opts.handleWatchNodeRequest?.(req, res) ?? false);
			addAdmittedStage("models", openAiCompatEnabled && (scopedRequestPath === "/v1/models" || scopedRequestPath.startsWith("/v1/models/")), async () => (await getModelsHttpModule()).handleOpenAiModelsHttpRequest(req, res, routeAuth));
			addAdmittedStage("embeddings", openAiCompatEnabled && scopedRequestPath === "/v1/embeddings", async () => (await getEmbeddingsHttpModule()).handleOpenAiEmbeddingsHttpRequest(req, res, routeAuth));
			addAdmittedStage("tools-invoke", scopedRequestPath === "/tools/invoke", async () => (await getToolsInvokeHttpModule()).handleToolsInvokeHttpRequest(req, res, routeAuth));
			addAdmittedStage("sessions-kill", /^\/sessions\/[^/]+\/kill$/.test(scopedRequestPath), async () => (await getSessionKillHttpModule()).handleSessionKillHttpRequest(req, res, routeAuth));
			addAdmittedStage("sessions-history", /^\/sessions\/[^/]+\/history$/.test(scopedRequestPath), async () => (await getSessionHistoryHttpModule()).handleSessionHistoryHttpRequest(req, res, {
				...routeAuth,
				getResolvedAuth
			}));
			addAdmittedStage("board-widget", scopedRequestPath.startsWith("/__openclaw__/board/"), async () => (await getBoardHttpModule()).handleBoardHttpRequest(req, res));
			addAdmittedStage("user-profile-avatar", matchUserProfileAvatarPath(scopedRequestPath) !== void 0, async () => (await getUserProfilesHttpModule()).handleUserProfileAvatarHttpRequest(req, res, scopedRequestPath, routeAuth));
			addAdmittedStage("openresponses", openResponsesEnabled && scopedRequestPath === "/v1/responses", async () => (await getOpenResponsesHttpModule()).handleOpenResponsesHttpRequest(req, res, {
				...routeAuth,
				config: openResponsesConfig
			}));
			addAdmittedStage("openai", openAiChatCompletionsEnabled && scopedRequestPath === "/v1/chat/completions", async () => (await getOpenAiHttpModule()).handleOpenAiHttpRequest(req, res, {
				...routeAuth,
				config: openAiChatCompletionsConfig
			}));
			addRequestStage("control-ui-approval-document", isControlUiApprovalDocumentPath({
				basePath: controlUiBasePath,
				pathname: scopedRequestPath
			}), async () => {
				if (!controlUiEnabled) {
					res.statusCode = 404;
					res.setHeader("Content-Type", "text/plain; charset=utf-8");
					res.end("Not Found");
					return true;
				}
				if (await handleControlUiRequest()) return true;
				res.statusCode = 404;
				res.setHeader("Content-Type", "text/plain; charset=utf-8");
				res.end("Not Found");
				return true;
			});
			addRequestStage("node-capability-auth", Boolean(nodeCapability), async () => {
				const { authorizePluginNodeCapabilityRequest } = await getPluginNodeCapabilityAuthModule();
				const ok = await authorizePluginNodeCapabilityRequest({
					req,
					auth: resolvedAuthValue,
					trustedProxies,
					allowRealIpFallback,
					clients,
					nodeCapability,
					capability: scopedNodeCapability.capability,
					malformedScopedPath: scopedNodeCapability.malformedScopedPath,
					rateLimiter
				});
				if (!ok.ok) {
					sendGatewayAuthFailure(res, ok);
					return true;
				}
				return false;
			});
			addRequestStage("canvas-documents", Boolean(nodeCapability) && isCoreCanvasHostEnabled(configSnapshot) && isCanvasDocumentHttpPath(scopedRequestPath), async () => (await getCanvasServeModule()).handleCanvasDocumentHttpRequest(req, res));
			addRequestStage("control-ui-plugin-manager", controlUiEnabled && isControlUiPluginManagerRequest({
				basePath: controlUiBasePath,
				pathname: scopedRequestPath,
				method: req.method
			}), handleControlUiRequest);
			const mcpAppRoute = classifyMcpAppStandalonePath(scopedRequestPath);
			if (configSnapshot.mcp?.apps?.enabled === true && (mcpAppRoute === "shell" || mcpAppRoute === "view")) requestStages.push({
				name: "mcp-app-standalone",
				run: async () => await runWithGatewayHttpWorkAdmission(res, async () => {
					return await (await getMcpAppStandaloneModule()).handleMcpAppStandaloneHttpRequest(req, res, {
						sandboxPort: configSnapshot.mcp?.apps?.sandboxPort,
						sandboxOrigin: configSnapshot.mcp?.apps?.sandboxOrigin
					});
				})
			});
			if (handlePluginRequest) {
				const requestClientIp = resolveRequestClientIp(req, trustedProxies, allowRealIpFallback);
				let pluginGatewayAuthSatisfied = false;
				let pluginGatewayRequestAuth;
				let pluginRequestOperatorScopes;
				requestStages.push({
					name: "plugin-auth",
					run: async () => {
						if (!(shouldEnforcePluginGatewayAuth ?? shouldEnforceDefaultPluginGatewayAuth)(pluginPathContext) || (await getCachedPluginGatewayAuthBypassPaths(configSnapshot)).has(scopedRequestPath)) return false;
						const { authorizePluginGatewayHttpRequestOrReply } = await getHttpAuthUtilsModule();
						const { resolvePluginRouteRuntimeOperatorScopes } = await getPluginRouteRuntimeScopesModule();
						const authResult = await authorizePluginGatewayHttpRequestOrReply({
							req,
							res,
							...routeAuth,
							requestPath: scopedRequestPath,
							resolveOperatorScopes: resolvePluginRouteRuntimeOperatorScopes
						});
						if (!authResult) return true;
						pluginGatewayAuthSatisfied = true;
						pluginGatewayRequestAuth = authResult.requestAuth;
						pluginRequestOperatorScopes = authResult.operatorScopes;
						return false;
					}
				}, {
					name: "plugin-http",
					continueOnError: true,
					run: () => handlePluginRequest(req, res, pluginPathContext, {
						gatewayAuthSatisfied: pluginGatewayAuthSatisfied,
						gatewayRequestAuth: pluginGatewayRequestAuth,
						gatewayRequestOperatorScopes: pluginRequestOperatorScopes,
						gatewayRequestClientIp: requestClientIp
					})
				});
			}
			addRequestStage("chat-managed-media", scopedRequestPath.startsWith("/api/chat/media/outgoing/"), async () => (await getManagedMediaAttachmentsModule()).handleManagedOutgoingMediaHttpRequest(req, res, routeAuth));
			addRequestStage("control-ui-catalog-icon", controlUiEnabled && ["/__openclaw__/plugin-icon", "/__openclaw__/catalog-icon"].some((prefix) => scopedRequestPath.startsWith(`${controlUiRouteBasePath}${prefix}/`)), async () => (await getPluginIconHttpModule()).handlePluginIconHttpRequest(req, res, controlUiRouteOptions));
			addRequestStage("control-ui-assistant-media", controlUiEnabled, async () => (await getControlUiModule()).handleControlUiAssistantMediaRequest(req, res, {
				...controlUiRouteOptions,
				agentId: resolveAssistantIdentity({ cfg: configSnapshot }).agentId
			}));
			addRequestStage("control-ui-avatar", controlUiEnabled, async () => (await getControlUiModule()).handleControlUiAvatarRequest(req, res, controlUiRouteOptions));
			addRequestStage("control-ui-http", controlUiEnabled, handleControlUiRequest);
			if (await runGatewayHttpRequestStages(requestStages)) return;
			if (opts.isStartupPluginRuntimeReady?.() === false) {
				res.statusCode = 503;
				res.setHeader("Cache-Control", "no-store");
				res.setHeader("Retry-After", "1");
				res.setHeader("Content-Type", "text/plain; charset=utf-8");
				res.end("Plugin runtime is starting");
				return;
			}
			res.statusCode = 404;
			res.setHeader("Content-Type", "text/plain; charset=utf-8");
			res.end("Not Found");
		} catch (err) {
			console.error("[gateway-http] unhandled error in request handler:", err);
			finishFailedGatewayHttpResponse(res);
		}
	}
	return httpServer;
}
function handleBudgetedGatewayWebSocketUpgrade(params) {
	const { req, socket, head, wss, preauthConnectionBudget, preauthBudgetKey, ingressName } = params;
	if (isGatewayWorkAdmissionClosed()) {
		writeGatewayUpgradeServiceUnavailable(socket, `${ingressName} websocket admission closed`);
		socket.destroy();
		return;
	}
	if (wss.listenerCount("connection") === 0) {
		writeGatewayUpgradeServiceUnavailable(socket, `${ingressName} websocket handlers unavailable`);
		socket.destroy();
		return;
	}
	if (!preauthConnectionBudget.acquire(preauthBudgetKey)) {
		writeGatewayUpgradeServiceUnavailable(socket, "Too many unauthenticated sockets");
		socket.destroy();
		return;
	}
	let budgetTransferred = false;
	const releaseUpgradeBudget = () => {
		if (!budgetTransferred) {
			budgetTransferred = true;
			preauthConnectionBudget.release(preauthBudgetKey);
		}
	};
	socket.once("close", releaseUpgradeBudget);
	try {
		wss.handleUpgrade(req, socket, head, (ws) => {
			const ingressSocket = ws;
			ingressSocket["__openclawPreauthBudgetKey"] = preauthBudgetKey;
			params.prepareSocket?.(ingressSocket);
			wss.emit("connection", ws, req);
			if (ingressSocket["__openclawPreauthBudgetClaimed"]) {
				budgetTransferred = true;
				socket.off("close", releaseUpgradeBudget);
			}
		});
	} catch (error) {
		socket.off("close", releaseUpgradeBudget);
		releaseUpgradeBudget();
		throw error;
	}
}
/** Attaches WebSocket and plugin-upgrade routing to an already-created HTTP server. */
function attachGatewayUpgradeHandler(opts) {
	const { httpServer, wss, handlePluginUpgrade, shouldEnforcePluginGatewayAuth, resolvePluginNodeCapabilityRoute, clients, preauthConnectionBudget, resolvedAuth, rateLimiter, log } = opts;
	const getResolvedAuth = opts.getResolvedAuth ?? (() => resolvedAuth);
	httpServer.on("upgrade", (req, socket, head) => {
		runWithDiagnosticTraceContext(createDiagnosticTraceContext(), async () => {
			const configSnapshot = getRuntimeConfig();
			const trustedProxies = configSnapshot.gateway?.trustedProxies ?? [];
			const allowRealIpFallback = configSnapshot.gateway?.allowRealIpFallback === true;
			const requestClientIp = resolveRequestClientIp(req, trustedProxies, allowRealIpFallback);
			const scopedNodeCapability = normalizePluginNodeCapabilityScopedUrl(req.url ?? "/");
			if (scopedNodeCapability.malformedScopedPath) {
				writeUpgradeAuthFailure(socket, {
					ok: false,
					reason: "unauthorized"
				});
				socket.destroy();
				return;
			}
			if (scopedNodeCapability.rewrittenUrl) req.url = scopedNodeCapability.rewrittenUrl;
			const resolvedAuthLocal = getResolvedAuth();
			const requestPath = scopedNodeCapability.pathname;
			const pathContext = resolvePluginRoutePathContext(requestPath);
			const nodeCapability = resolvePluginNodeCapabilityRoute?.(pathContext);
			if (nodeCapability) {
				const { authorizePluginNodeCapabilityRequest } = await getPluginNodeCapabilityAuthModule();
				const ok = await authorizePluginNodeCapabilityRequest({
					req,
					auth: resolvedAuthLocal,
					trustedProxies,
					allowRealIpFallback,
					clients,
					nodeCapability,
					capability: scopedNodeCapability.capability,
					malformedScopedPath: scopedNodeCapability.malformedScopedPath,
					rateLimiter
				});
				if (!ok.ok) {
					writeUpgradeAuthFailure(socket, ok);
					socket.destroy();
					return;
				}
			}
			if (handlePluginUpgrade) {
				let pluginGatewayAuthSatisfied = false;
				let pluginGatewayRequestAuth;
				let pluginGatewayRequestOperatorScopes;
				if ((shouldEnforcePluginGatewayAuth ?? shouldEnforceDefaultPluginGatewayAuth)(pathContext) && !(await getCachedPluginGatewayAuthBypassPaths(configSnapshot)).has(requestPath)) {
					const { checkGatewayHttpRequestAuth } = await getHttpAuthUtilsModule();
					const authCheck = await checkGatewayHttpRequestAuth({
						req,
						auth: resolvedAuthLocal,
						trustedProxies,
						allowRealIpFallback,
						rateLimiter,
						cfg: configSnapshot
					});
					if (!authCheck.ok) {
						writeUpgradeAuthFailure(socket, authCheck.authResult);
						socket.destroy();
						return;
					}
					pluginGatewayAuthSatisfied = true;
					pluginGatewayRequestAuth = authCheck.requestAuth;
					const { resolvePluginRouteRuntimeOperatorScopes } = await getPluginRouteRuntimeScopesModule();
					pluginGatewayRequestOperatorScopes = resolvePluginRouteRuntimeOperatorScopes(req, authCheck.requestAuth);
				}
				if (await handlePluginUpgrade(req, socket, head, pathContext, {
					gatewayAuthSatisfied: pluginGatewayAuthSatisfied,
					gatewayRequestAuth: pluginGatewayRequestAuth,
					gatewayRequestOperatorScopes: pluginGatewayRequestOperatorScopes,
					gatewayRequestClientIp: requestClientIp
				})) return;
			}
			try {
				handleBudgetedGatewayWebSocketUpgrade({
					req,
					socket,
					head,
					wss,
					preauthConnectionBudget,
					preauthBudgetKey: requestClientIp,
					ingressName: "Gateway"
				});
			} catch {
				throw new Error("gateway websocket upgrade failed");
			}
		}).catch((err) => {
			const remoteAddress = socket.remoteAddress ?? "unknown";
			const errorMessage = err instanceof Error ? err.message : String(err);
			log?.warn(`ws upgrade error from ${remoteAddress}: ${errorMessage}`);
			socket.destroy();
		});
	});
}
/** Attach the loopback-only worker ingress and force every accepted socket into worker mode. */
function attachWorkerGatewayUpgradeHandler(params) {
	params.httpServer.on("upgrade", (req, socket, head) => {
		try {
			handleBudgetedGatewayWebSocketUpgrade({
				req,
				socket,
				head,
				wss: params.wss,
				preauthConnectionBudget: params.preauthConnectionBudget,
				preauthBudgetKey: req.socket.remoteAddress,
				ingressName: "Worker",
				prepareSocket: (workerSocket) => {
					workerSocket[GATEWAY_WS_CONNECTION_KIND_PROPERTY] = "worker";
					workerSocket[GATEWAY_WS_PREAUTH_BUDGET_PROPERTY] = params.preauthConnectionBudget;
				}
			});
		} catch (error) {
			params.log?.warn(`worker websocket upgrade failed: ${error instanceof Error ? error.message : String(error)}`);
			socket.destroy();
		}
	});
}
//#endregion
//#region src/gateway/server/http-listen.ts
const EADDRINUSE_MAX_RETRIES = 20;
const EADDRINUSE_RETRY_INTERVAL_MS = 500;
async function closeServerQuietly(httpServer) {
	await new Promise((resolve) => {
		try {
			httpServer.close(() => resolve());
		} catch {
			resolve();
		}
	});
}
/** Listen on the configured gateway host/port, retrying transient EADDRINUSE windows. */
async function listenGatewayHttpServer(params) {
	const { httpServer, bindHost, port, retryEaddrinuse = true, serviceName = "gateway", endpointScheme = "ws" } = params;
	const maxRetries = retryEaddrinuse ? EADDRINUSE_MAX_RETRIES : 0;
	for (const attempt of Array.from({ length: maxRetries + 1 }, (_, index) => index)) try {
		await new Promise((resolve, reject) => {
			const onError = (err) => {
				httpServer.off("listening", onListening);
				reject(err);
			};
			const onListening = () => {
				httpServer.off("error", onError);
				resolve();
			};
			httpServer.once("error", onError);
			httpServer.once("listening", onListening);
			httpServer.listen(port, bindHost);
		});
		return;
	} catch (err) {
		const code = err.code;
		if (code === "EADDRINUSE" && attempt < maxRetries) {
			await closeServerQuietly(httpServer);
			await sleep(EADDRINUSE_RETRY_INTERVAL_MS);
			continue;
		}
		if (code === "EADDRINUSE") throw new GatewayLockError(`another ${serviceName} instance is already listening on ${endpointScheme}://${bindHost}:${port}`, err);
		throw new GatewayLockError(`failed to bind ${serviceName} socket on ${endpointScheme}://${bindHost}:${port}: ${String(err)}`, err);
	}
}
//#endregion
//#region src/gateway/server/preauth-connection-budget.ts
const DEFAULT_MAX_PREAUTH_CONNECTIONS_PER_IP = 32;
const UNKNOWN_CLIENT_IP_BUDGET_KEY = "__openclaw_unknown_client_ip__";
function getMaxPreauthConnectionsPerIpFromEnv(env = process.env) {
	const configured = env.OPENCLAW_MAX_PREAUTH_CONNECTIONS_PER_IP || (isVitestRuntimeEnv(env) ? env.OPENCLAW_TEST_MAX_PREAUTH_CONNECTIONS_PER_IP : void 0);
	if (!configured) return DEFAULT_MAX_PREAUTH_CONNECTIONS_PER_IP;
	const parsed = parseStrictPositiveInteger(configured);
	if (parsed === void 0) return DEFAULT_MAX_PREAUTH_CONNECTIONS_PER_IP;
	return parsed;
}
function createPreauthConnectionBudget(limit = getMaxPreauthConnectionsPerIpFromEnv()) {
	const maxConnectionsPerIp = resolveIntegerOption(limit, getMaxPreauthConnectionsPerIpFromEnv(), { min: 1 });
	const counts = /* @__PURE__ */ new Map();
	const normalizeBudgetKey = (clientIp) => {
		return clientIp?.trim() || UNKNOWN_CLIENT_IP_BUDGET_KEY;
	};
	return {
		acquire(clientIp) {
			const ip = normalizeBudgetKey(clientIp);
			const next = (counts.get(ip) ?? 0) + 1;
			if (next > maxConnectionsPerIp) return false;
			counts.set(ip, next);
			return true;
		},
		release(clientIp) {
			const ip = normalizeBudgetKey(clientIp);
			const current = counts.get(ip);
			if (current === void 0) return;
			if (current <= 1) {
				counts.delete(ip);
				return;
			}
			counts.set(ip, current - 1);
		}
	};
}
//#endregion
//#region src/gateway/server-runtime-state.ts
const loadGatewayPluginsHttpModule = async () => await import("./plugins-http-BzFKA1dw.js");
function hasMatchingGatewayPluginRoute(registry, pathContext, requiresUpgrade) {
	if (!pathContext) return (registry.httpRoutes ?? []).length > 0;
	const matchingRoutes = findMatchingPluginHttpRoutes(registry, pathContext);
	return requiresUpgrade ? matchingRoutes.some((route) => typeof route.handleUpgrade === "function") : matchingRoutes.length > 0;
}
/** Creates the HTTP/WebSocket runtime state for one gateway start. */
async function createGatewayRuntimeState(params) {
	const loadRuntimeConfig = params.getRuntimeConfig ?? (() => params.cfg);
	const resolvePluginRouteRegistry = () => params.getPluginRouteRegistry?.() ?? params.pluginRegistry;
	const clients = /* @__PURE__ */ new Set();
	const sessionEventSubscribers = createSessionEventSubscriberRegistry();
	const sessionMessageSubscribers = createSessionMessageSubscriberRegistry();
	const gatewayBroadcaster = createGatewayBroadcaster({
		clients,
		sessionMessageSubscribers,
		canReceiveSessionEvent: (client, sessionKeys, agentId, event, payload) => canReceiveSessionEvent({
			cfg: loadRuntimeConfig(),
			client,
			sessionKeys,
			agentId,
			event,
			payload
		})
	});
	let loadedHooksRequestHandler = null;
	const handleHooksRequest = async (req, res) => {
		const hooksConfig = params.hooksConfig();
		if (!hooksConfig) return false;
		const url = new URL(req.url ?? "/", "http://localhost");
		const basePath = hooksConfig.basePath;
		if (url.pathname !== basePath && !url.pathname.startsWith(`${basePath}/`)) return false;
		return await runWithGatewayHttpWorkAdmission(res, async () => {
			if (!loadedHooksRequestHandler) {
				const { createGatewayHooksRequestHandler } = await import("./hooks-Ba4ruWlU.js");
				loadedHooksRequestHandler = createGatewayHooksRequestHandler({
					deps: params.deps,
					getHooksConfig: params.hooksConfig,
					getClientIpConfig: params.getHookClientIpConfig,
					bindHost: params.bindHost,
					port: params.port,
					logHooks: params.logHooks
				});
			}
			return await loadedHooksRequestHandler(req, res);
		});
	};
	let loadedPluginRequestHandler = null;
	let loadedPluginUpgradeHandler = null;
	const handlePluginRequest = async (req, res, pathContext, dispatchContext) => {
		if (loadedPluginRequestHandler) return await loadedPluginRequestHandler(req, res, pathContext, dispatchContext);
		if (!hasMatchingGatewayPluginRoute(resolvePluginRouteRegistry(), pathContext, false)) return false;
		const { createGatewayPluginRequestHandler } = await loadGatewayPluginsHttpModule();
		loadedPluginRequestHandler = createGatewayPluginRequestHandler({
			registry: params.pluginRegistry,
			getRouteRegistry: resolvePluginRouteRegistry,
			log: params.logPlugins,
			getGatewayRequestContext: params.getGatewayRequestContext
		});
		return await loadedPluginRequestHandler(req, res, pathContext, dispatchContext);
	};
	const handlePluginUpgrade = async (req, socket, head, pathContext, dispatchContext) => {
		if (loadedPluginUpgradeHandler) return await loadedPluginUpgradeHandler(req, socket, head, pathContext, dispatchContext);
		if (!hasMatchingGatewayPluginRoute(resolvePluginRouteRegistry(), pathContext, true)) return false;
		const { createGatewayPluginUpgradeHandler } = await loadGatewayPluginsHttpModule();
		loadedPluginUpgradeHandler = createGatewayPluginUpgradeHandler({
			registry: params.pluginRegistry,
			getRouteRegistry: resolvePluginRouteRegistry,
			log: params.logPlugins,
			getGatewayRequestContext: params.getGatewayRequestContext
		});
		return await loadedPluginUpgradeHandler(req, socket, head, pathContext, dispatchContext);
	};
	const shouldEnforcePluginGatewayAuth = (pathContext) => {
		return shouldEnforceGatewayAuthForPluginPath(resolvePluginRouteRegistry(), pathContext);
	};
	const resolvePluginNodeCapabilityRoute = (pathContext) => {
		const coreCanvasCapability = isCoreCanvasHostEnabled(loadRuntimeConfig()) ? resolveCanvasNodeCapability(pathContext.candidates) : void 0;
		if (coreCanvasCapability) return coreCanvasCapability;
		return findMatchingPluginNodeCapabilityRoute(resolvePluginRouteRegistry(), pathContext)?.nodeCapability;
	};
	const bindHosts = await resolveGatewayListenHosts(params.bindHost);
	if (!isLoopbackHost(params.bindHost)) params.log.warn("⚠️  Gateway is binding to a non-loopback address. Ensure authentication is configured before exposing to public networks.");
	if (params.cfg.gateway?.controlUi?.dangerouslyAllowHostHeaderOriginFallback === true) params.log.warn("⚠️  gateway.controlUi.dangerouslyAllowHostHeaderOriginFallback=true is enabled. Host-header origin fallback weakens origin checks and should only be used as break-glass.");
	const wss = new WebSocketServer({
		noServer: true,
		maxPayload: MAX_PREAUTH_PAYLOAD_BYTES
	});
	const preauthConnectionBudget = createPreauthConnectionBudget();
	const workerPreauthConnectionBudget = createPreauthConnectionBudget();
	const httpServers = [];
	const gatewayHttpServers = [];
	const httpBindHosts = [];
	for (const _ of bindHosts) {
		const httpServer = createGatewayHttpServer({
			clients,
			controlUiEnabled: params.controlUiEnabled,
			controlUiBasePath: params.controlUiBasePath,
			controlUiRoot: params.controlUiRoot,
			openAiChatCompletionsEnabled: params.openAiChatCompletionsEnabled,
			openAiChatCompletionsConfig: params.openAiChatCompletionsConfig,
			openResponsesEnabled: params.openResponsesEnabled,
			openResponsesConfig: params.openResponsesConfig,
			strictTransportSecurityHeader: params.strictTransportSecurityHeader,
			handleWatchNodeRequest: params.handleWatchNodeRequest,
			handleHooksRequest,
			handlePluginRequest,
			shouldEnforcePluginGatewayAuth,
			resolvePluginNodeCapabilityRoute,
			resolvedAuth: params.resolvedAuth,
			getResolvedAuth: params.getResolvedAuth,
			rateLimiter: params.rateLimiter,
			getReadiness: params.getReadiness,
			getRuntimeConfig: loadRuntimeConfig,
			isStartupPluginRuntimeReady: params.isStartupPluginRuntimeReady,
			isTerminalEnabled: params.isTerminalEnabled,
			tlsOptions: params.gatewayTls?.enabled ? params.gatewayTls.tlsOptions : void 0
		});
		attachGatewayUpgradeHandler({
			httpServer,
			wss,
			handlePluginUpgrade,
			shouldEnforcePluginGatewayAuth,
			resolvePluginNodeCapabilityRoute,
			clients,
			preauthConnectionBudget,
			resolvedAuth: params.resolvedAuth,
			getResolvedAuth: params.getResolvedAuth,
			rateLimiter: params.rateLimiter,
			log: params.log
		});
		gatewayHttpServers.push(httpServer);
		httpServers.push(httpServer);
	}
	let workerIngressPort;
	const workerHttpServer = params.workerIngressEnabled ? createServer((_req, res) => {
		res.statusCode = 404;
		res.end("Not Found");
	}) : void 0;
	if (workerHttpServer) attachWorkerGatewayUpgradeHandler({
		httpServer: workerHttpServer,
		wss,
		preauthConnectionBudget: workerPreauthConnectionBudget,
		log: params.log
	});
	const httpServer = gatewayHttpServers[0];
	if (!httpServer) throw new Error("Gateway HTTP server failed to start");
	let mcpAppSandboxPort;
	let sandboxHostStartPromise = null;
	let startListeningPromise = null;
	let startListeningComplete = false;
	const startSandboxHost = async () => {
		if (sandboxHostStartPromise) return await sandboxHostStartPromise;
		sandboxHostStartPromise = (async () => {
			if (httpBindHosts.length === 0) throw new Error("Gateway listener must start before the sandbox host");
			const sandboxPort = resolveSandboxHostPort(params.port, params.cfg.mcp?.apps?.sandboxPort);
			const sandboxServers = bindHosts.map(() => createSandboxHostHttpServer(params.gatewayTls?.enabled ? params.gatewayTls.tlsOptions : void 0));
			httpServers.push(...sandboxServers);
			try {
				for (const host of httpBindHosts) {
					const server = sandboxServers[bindHosts.indexOf(host)];
					if (!server) throw new Error(`Missing sandbox host HTTP server for bind host ${host}`);
					await listenGatewayHttpServer({
						httpServer: server,
						bindHost: host,
						port: sandboxPort,
						retryEaddrinuse: false,
						serviceName: "MCP App sandbox",
						endpointScheme: params.gatewayTls?.enabled ? "https" : "http"
					});
				}
			} catch (error) {
				await Promise.all(sandboxServers.map((server) => new Promise((resolve) => {
					if (!server.listening) {
						resolve();
						return;
					}
					server.close(() => resolve());
				})));
				for (const server of sandboxServers) {
					const index = httpServers.indexOf(server);
					if (index >= 0) httpServers.splice(index, 1);
				}
				throw error;
			}
			mcpAppSandboxPort = sandboxPort;
			return sandboxPort;
		})();
		const startAttempt = sandboxHostStartPromise;
		startAttempt.catch(() => {
			if (sandboxHostStartPromise === startAttempt) sandboxHostStartPromise = null;
		});
		return await startAttempt;
	};
	const ensureSandboxHostPort = async () => {
		if (!startListeningComplete) {
			if (!startListeningPromise) throw new Error("Gateway listener must start before the sandbox host");
			await startListeningPromise;
		}
		return await startSandboxHost();
	};
	const startListening = async () => {
		if (startListeningPromise) {
			await startListeningPromise;
			return;
		}
		startListeningPromise = (async () => {
			const requiredAlias = params.bindHost !== "127.0.0.1" && bindHosts.includes("127.0.0.1") ? "127.0.0.1" : void 0;
			const listenOrder = requiredAlias ? [requiredAlias, ...bindHosts.filter((host) => host !== requiredAlias)] : bindHosts;
			const boundHosts = /* @__PURE__ */ new Set();
			for (const host of listenOrder) {
				const index = bindHosts.indexOf(host);
				const server = gatewayHttpServers[index];
				if (!server) throw new Error(`Missing gateway HTTP server for bind host ${host}`);
				const requiredLoopbackAlias = host === requiredAlias;
				try {
					await listenGatewayHttpServer({
						httpServer: server,
						bindHost: host,
						port: params.port,
						retryEaddrinuse: !requiredLoopbackAlias
					});
					boundHosts.add(host);
				} catch (err) {
					if (host === bindHosts[0] || requiredLoopbackAlias) throw err;
					params.log.warn(`gateway: failed to bind loopback alias ${host}:${params.port} (${String(err)})`);
				}
			}
			httpBindHosts.push(...bindHosts.filter((host) => boundHosts.has(host)));
			if (httpBindHosts.length === 0) throw new Error("Gateway HTTP server failed to start");
			if (params.cfg.mcp?.apps?.enabled === true) await startSandboxHost();
			if (workerHttpServer) {
				await listenGatewayHttpServer({
					httpServer: workerHttpServer,
					bindHost: "127.0.0.1",
					port: 0,
					retryEaddrinuse: false
				});
				const address = workerHttpServer.address();
				if (!address || typeof address === "string") throw new Error("Worker gateway ingress failed to resolve its loopback port");
				workerIngressPort = address.port;
				httpServers.push(workerHttpServer);
			}
			startListeningComplete = true;
		})();
		await startListeningPromise;
	};
	const agentRunSeq = /* @__PURE__ */ new Map();
	const dedupe = /* @__PURE__ */ new Map();
	const chatRunState = createChatRunState();
	const chatRunRegistry = chatRunState.registry;
	const addChatRun = chatRunRegistry.add;
	const removeChatRun = chatRunRegistry.remove;
	const chatAbortControllers = /* @__PURE__ */ new Map();
	const chatQueuedTurns = /* @__PURE__ */ new Map();
	const toolEventRecipients = chatRunState.toolEventRecipients;
	return {
		httpServer,
		httpServers,
		httpBindHosts,
		startListening,
		wss,
		preauthConnectionBudget,
		clients,
		...gatewayBroadcaster,
		agentRunSeq,
		dedupe,
		chatRunState,
		addChatRun,
		removeChatRun,
		chatAbortControllers,
		chatQueuedTurns,
		toolEventRecipients,
		sessionEventSubscribers,
		sessionMessageSubscribers,
		getWorkerIngressEndpoint: () => workerIngressPort === void 0 ? void 0 : {
			host: "127.0.0.1",
			port: workerIngressPort
		},
		getMcpAppSandboxPort: () => mcpAppSandboxPort,
		ensureSandboxHostPort
	};
}
//#endregion
//#region src/gateway/server-wizard-sessions.ts
const UNCOLLECTED_TERMINAL_RETENTION_MS = 300 * 1e3;
/** Creates the in-memory tracker used for active Gateway wizard sessions. */
function createWizardSessionTracker(options) {
	const wizardSessions = /* @__PURE__ */ new Map();
	const terminalSince = /* @__PURE__ */ new Map();
	const now = options?.now ?? Date.now;
	const findRunningWizard = () => {
		for (const [id, session] of wizardSessions) {
			if (!session.isSettled()) {
				terminalSince.delete(id);
				return id;
			}
			const observedAt = terminalSince.get(id);
			if (observedAt === void 0) terminalSince.set(id, now());
			else if (now() - observedAt >= UNCOLLECTED_TERMINAL_RETENTION_MS) {
				wizardSessions.delete(id);
				terminalSince.delete(id);
			}
		}
		return null;
	};
	const purgeWizardSession = (id) => {
		const session = wizardSessions.get(id);
		if (!session) return;
		if (!session.isSettled()) return;
		wizardSessions.delete(id);
		terminalSince.delete(id);
	};
	return {
		wizardSessions,
		findRunningWizard,
		purgeWizardSession
	};
}
//#endregion
//#region src/gateway/server/event-loop-health.ts
const EVENT_LOOP_MONITOR_RESOLUTION_MS = 20;
const EVENT_LOOP_DELAY_WARN_MS = 1e3;
const EVENT_LOOP_UTILIZATION_WARN = .95;
const CPU_CORE_RATIO_WARN = .9;
const PERSISTENT_DEGRADATION_WARN_AFTER_MS = 6e4;
const LOAD_DEGRADATION_DELAY_COEVIDENCE_MS = 25;
const SUSTAINED_LOAD_SAMPLE_MIN_INTERVAL_MS = 1e3;
function roundMetric(value, digits = 3) {
	if (!Number.isFinite(value)) return 0;
	const factor = 10 ** digits;
	return Math.round(value * factor) / factor;
}
function nanosecondsToMilliseconds(value) {
	return roundMetric(value / 1e6, 1);
}
function classifyGatewayEventLoopHealthReasons(metrics) {
	const reasons = [];
	if (metrics.delayP99Ms >= EVENT_LOOP_DELAY_WARN_MS || metrics.delayMaxMs >= EVENT_LOOP_DELAY_WARN_MS) reasons.push("event_loop_delay");
	if (metrics.intervalMs < SUSTAINED_LOAD_SAMPLE_MIN_INTERVAL_MS) return reasons;
	if (!(metrics.delayP99Ms >= LOAD_DEGRADATION_DELAY_COEVIDENCE_MS || metrics.delayMaxMs >= LOAD_DEGRADATION_DELAY_COEVIDENCE_MS)) return reasons;
	if (metrics.utilization >= EVENT_LOOP_UTILIZATION_WARN) reasons.push("event_loop_utilization");
	if (metrics.cpuCoreRatio >= CPU_CORE_RATIO_WARN) reasons.push("cpu");
	return reasons;
}
function createGatewayEventLoopHealthMonitor(deps = {}) {
	const nowMs = deps.now ?? performance.now.bind(performance);
	const readCpuUsage = deps.cpuUsage ?? process.cpuUsage.bind(process);
	const readEventLoopUtilization = deps.eventLoopUtilization ?? performance.eventLoopUtilization.bind(performance);
	const createDelayMonitor = deps.createDelayMonitor ?? ((resolutionMs) => monitorEventLoopDelay({ resolution: resolutionMs }));
	let monitor = null;
	let lastWallAt = nowMs();
	let lastCpuUsage = readCpuUsage();
	let lastEventLoopUtilization = readEventLoopUtilization();
	let lastSnapshot;
	let firstDegradedAtMs = null;
	try {
		monitor = createDelayMonitor(EVENT_LOOP_MONITOR_RESOLUTION_MS);
		monitor.enable();
		monitor.reset();
	} catch {
		monitor = null;
	}
	const snapshot = () => {
		if (!monitor || !lastCpuUsage || !lastEventLoopUtilization || lastWallAt === null) return;
		const now = nowMs();
		const intervalMs = Math.max(1, now - lastWallAt);
		const delayP99Ms = nanosecondsToMilliseconds(monitor.percentile(99));
		const delayMaxMs = nanosecondsToMilliseconds(monitor.max);
		if (!(delayP99Ms >= EVENT_LOOP_DELAY_WARN_MS || delayMaxMs >= EVENT_LOOP_DELAY_WARN_MS) && intervalMs < SUSTAINED_LOAD_SAMPLE_MIN_INTERVAL_MS) return lastSnapshot;
		const cpuUsage = readCpuUsage(lastCpuUsage);
		const currentEventLoopUtilization = readEventLoopUtilization();
		const utilization = roundMetric(readEventLoopUtilization(currentEventLoopUtilization, lastEventLoopUtilization).utilization);
		const cpuCoreRatio = roundMetric(roundMetric((cpuUsage.user + cpuUsage.system) / 1e3, 1) / intervalMs);
		const reasons = classifyGatewayEventLoopHealthReasons({
			intervalMs,
			delayP99Ms,
			delayMaxMs,
			utilization,
			cpuCoreRatio
		});
		const degraded = reasons.length > 0;
		if (degraded) firstDegradedAtMs ??= now;
		else firstDegradedAtMs = null;
		const health = {
			degraded,
			degradedSinceMs: firstDegradedAtMs === null ? null : Math.max(0, Math.round(now - firstDegradedAtMs)),
			reasons,
			intervalMs,
			delayP99Ms,
			delayMaxMs,
			utilization,
			cpuCoreRatio
		};
		monitor.reset();
		lastWallAt = now;
		lastCpuUsage = readCpuUsage();
		lastEventLoopUtilization = currentEventLoopUtilization;
		lastSnapshot = health;
		return health;
	};
	return {
		snapshot,
		persistentDegradationSnapshot: () => {
			const current = snapshot();
			return current?.degradedSinceMs != null && current.degradedSinceMs >= PERSISTENT_DEGRADATION_WARN_AFTER_MS ? current : void 0;
		},
		stop: () => {
			monitor?.disable();
			monitor = null;
			lastWallAt = null;
			lastCpuUsage = null;
			lastEventLoopUtilization = null;
			lastSnapshot = void 0;
			firstDegradedAtMs = null;
		}
	};
}
//#endregion
//#region src/gateway/server/readiness.ts
const DEFAULT_READINESS_CACHE_TTL_MS = 1e3;
function shouldIgnoreReadinessFailure(accountSnapshot, health, autostartSuppressed) {
	if (health.reason === "unmanaged" || health.reason === "stale-socket") return true;
	if (autostartSuppressed && health.reason === "not-running") return true;
	const restartableReason = health.reason === "not-running" || health.reason === "ingress-unavailable";
	const inRestartHandoff = accountSnapshot.restartPending === true && accountSnapshot.running !== true;
	return restartableReason && inRestartHandoff;
}
/** Create a cached readiness checker over channel runtime health. */
function createReadinessChecker(deps) {
	const { channelManager, startedAt } = deps;
	const cacheTtlMs = Math.max(0, deps.cacheTtlMs ?? DEFAULT_READINESS_CACHE_TTL_MS);
	let cachedAt = 0;
	let cachedState = null;
	return () => {
		const now = Date.now();
		const uptimeMs = now - startedAt;
		if (deps.getStartupPending?.()) return withEventLoopHealth({
			ready: false,
			failing: [deps.getStartupPendingReason?.() ?? "startup-sidecars"],
			uptimeMs
		}, deps.getEventLoopHealth);
		if (deps.getGatewayDraining?.()) return withEventLoopHealth({
			ready: false,
			failing: ["gateway-draining"],
			uptimeMs
		}, deps.getEventLoopHealth);
		if (deps.shouldSkipChannelReadiness?.()) return withEventLoopHealth({
			ready: true,
			failing: [],
			uptimeMs
		}, deps.getEventLoopHealth);
		if (cachedState && now - cachedAt < cacheTtlMs) return withEventLoopHealth({
			...cachedState,
			uptimeMs
		}, deps.getEventLoopHealth);
		const snapshot = channelManager.getRuntimeSnapshot();
		const globallyAutostartSuppressed = channelManager.getAutostartSuppression() !== null;
		const failing = [];
		const suppressed = [];
		for (const [channelId, accounts] of Object.entries(snapshot.channelAccounts)) {
			if (!accounts) continue;
			const autostartSuppressed = globallyAutostartSuppressed || channelManager.isAmbientAutostartSuppressed(channelId);
			for (const accountSnapshot of Object.values(accounts)) {
				if (!accountSnapshot) continue;
				const health = evaluateChannelHealth(accountSnapshot, {
					now,
					staleEventThresholdMs: DEFAULT_CHANNEL_STALE_EVENT_THRESHOLD_MS,
					channelConnectGraceMs: DEFAULT_CHANNEL_CONNECT_GRACE_MS,
					channelId
				});
				if (!health.healthy && autostartSuppressed && health.reason === "not-running") {
					if (!suppressed.includes(channelId)) suppressed.push(channelId);
					continue;
				}
				if (!health.healthy && !shouldIgnoreReadinessFailure(accountSnapshot, health, autostartSuppressed)) {
					failing.push(channelId);
					break;
				}
			}
		}
		cachedAt = now;
		cachedState = {
			ready: failing.length === 0,
			failing,
			...suppressed.length > 0 ? { suppressed } : {}
		};
		return withEventLoopHealth({
			...cachedState,
			uptimeMs
		}, deps.getEventLoopHealth);
	};
}
function withEventLoopHealth(result, getEventLoopHealth) {
	const eventLoop = getEventLoopHealth?.();
	return eventLoop ? {
		...result,
		eventLoop
	} : result;
}
//#endregion
//#region src/gateway/server/tls.ts
/** Loads certificate/key material for the gateway listener from config. */
async function loadGatewayTlsRuntime(cfg, log) {
	return await loadGatewayTlsRuntime$1(cfg, log);
}
//#endregion
//#region src/gateway/server-runtime-state-prepare.ts
function createGatewayAuthRateLimiters(rateLimitConfig) {
	return {
		rateLimiter: createAuthRateLimiter(rateLimitConfig ?? {}),
		browserRateLimiter: createAuthRateLimiter({
			...rateLimitConfig,
			exemptLoopback: false
		})
	};
}
function listGatewayStartupChannelPlugins() {
	return listLoadedChannelPlugins();
}
async function prepareGatewayRuntimeState(params) {
	const { bootstrap, port, opts, log, logChannels, logHooks, logPlugins, gatewayRuntime, resolveChannelRuntime: getChannelRuntime, loadWorkerEnvironmentStartupModule, loadWorkerPlacementStartupModule } = params;
	const { pluginBootstrap, gatewayPluginConfigAtStart, workerEnvironmentStartup, startupTrace, cfgAtStart, resolvedStartupAuthOverride, startupTailscaleOverride, ambientAutostartSuppressedChannelIds, minimalTestGateway } = bootstrap;
	const pluginRuntime = {
		registry: pluginBootstrap.pluginRegistry,
		baseGatewayMethods: pluginBootstrap.baseGatewayMethods
	};
	const runtimeSetup = setupRuntime(cfgAtStart);
	if (runtimeSetup.scale.scale === 1) log.info(`multithreaded runtime: ${runtimeSetup.scale.reason} (poolSize=${runtimeSetup.scale.poolSize}, model-execution=worker-pool)`);
	else log.info(`multithreaded runtime: ${runtimeSetup.scale.reason}`);
	const hasConfiguredWorkerProfiles = Object.keys(gatewayPluginConfigAtStart.cloudWorkers?.profiles ?? {}).length > 0;
	const shouldStartWorkerEnvironmentService = hasConfiguredWorkerProfiles || Boolean(workerEnvironmentStartup?.records.length) || Boolean(workerEnvironmentStartup?.hasNonlocalPlacementRecords);
	const workerGatewayEndpoint = { resolve: (() => void 0) };
	const { workerEnvironmentService, workerLiveEvents } = workerEnvironmentStartup && shouldStartWorkerEnvironmentService ? await startupTrace.measure("worker-environments.runtime-imports", async () => {
		return await (await loadWorkerEnvironmentStartupModule()).createGatewayWorkerEnvironmentRuntime({
			getPluginRegistry: () => pluginRuntime.registry,
			resolveWorkerGateway: () => workerGatewayEndpoint.resolve(),
			startup: workerEnvironmentStartup,
			log
		});
	}) : {};
	const workerDispatchAuthority = { revoke: (_params) => {
		throw new Error("Worker dispatch authority revocation is not ready");
	} };
	const workerPlacementRuntime = workerEnvironmentService && workerEnvironmentStartup ? await startupTrace.measure("worker-environments.placement-runtime", async () => {
		return (await loadWorkerPlacementStartupModule()).createGatewayWorkerPlacementRuntime({
			placements: workerEnvironmentStartup.placementStore,
			environments: workerEnvironmentService,
			admitNewPlacements: hasConfiguredWorkerProfiles,
			revokeSessionAuthority: (request) => workerDispatchAuthority.revoke(request),
			warn: (message) => log.warn(message)
		});
	}) : void 0;
	const workerPlacementControlAvailable = workerPlacementRuntime?.dispatchService;
	const workerPlacementDispatchAvailable = hasConfiguredWorkerProfiles ? workerPlacementControlAvailable : void 0;
	const channelLogs = Object.fromEntries(listGatewayStartupChannelPlugins().map((plugin) => [plugin.id, logChannels.child(plugin.id)]));
	const channelRuntimeEnvs = Object.fromEntries(Object.entries(channelLogs).map(([id, logger]) => [id, runtimeForLogger(logger)]));
	const listStartupChannelGatewayMethods = () => {
		const methods = [];
		for (const plugin of listGatewayStartupChannelPlugins()) {
			methods.push(...plugin.gatewayMethods ?? []);
			for (const descriptor of plugin.gatewayMethodDescriptors ?? []) methods.push(descriptor.name);
		}
		return methods;
	};
	const listActiveGatewayMethods = (nextBaseGatewayMethods) => uniqueStrings([...nextBaseGatewayMethods, ...listStartupChannelGatewayMethods()]).filter((method) => (workerPlacementDispatchAvailable || method !== "sessions.dispatch") && (workerPlacementControlAvailable || method !== "sessions.reclaim"));
	const runtimeConfig = await startupTrace.measure("runtime.config", async () => {
		const { resolveGatewayRuntimeConfig } = await import("./server-runtime-config-Bcs_GF9j.js");
		return resolveGatewayRuntimeConfig({
			cfg: cfgAtStart,
			port,
			bind: opts.bind,
			host: opts.host,
			controlUiEnabled: opts.controlUiEnabled,
			openAiChatCompletionsEnabled: opts.openAiChatCompletionsEnabled,
			openResponsesEnabled: opts.openResponsesEnabled,
			auth: resolvedStartupAuthOverride,
			tailscale: startupTailscaleOverride
		});
	});
	const { bindHost, controlUiEnabled, openAiChatCompletionsEnabled, openAiChatCompletionsConfig, openResponsesEnabled, openResponsesConfig, strictTransportSecurityHeader, controlUiBasePath, controlUiRoot: controlUiRootOverride, resolvedAuth, tailscaleConfig, tailscaleMode } = runtimeConfig;
	if (bootstrap.generatedStartupAuthToken && isLoopbackHost(bindHost)) {
		const { ensureStartupLocalCliPairing } = await import("./startup-local-cli-pairing-BlDdu-bD.js");
		const pairingResult = await startupTrace.measure("runtime.local-cli-pairing", () => ensureStartupLocalCliPairing());
		if (pairingResult === "created") log.info("runtime-only gateway auth paired the local CLI device before readiness");
		else if (pairingResult === "unavailable") log.warn("runtime-only gateway auth could not prepare local CLI device credentials; configure gateway.auth.token or gateway.auth.password for CLI access");
	}
	const getResolvedAuth = () => resolveGatewayAuth({
		authConfig: getActiveSecretsRuntimeConfigSnapshot()?.config.gateway?.auth ?? getRuntimeConfig().gateway?.auth,
		authOverride: resolvedStartupAuthOverride,
		env: process.env,
		tailscaleMode
	});
	const resolveSharedGatewaySessionGenerationForConfig = (config) => resolveSharedGatewaySessionGeneration(resolveGatewayAuth({
		authConfig: config.gateway?.auth,
		authOverride: resolvedStartupAuthOverride,
		env: process.env,
		tailscaleMode
	}), config.gateway?.trustedProxies);
	const resolveCurrentSharedGatewaySessionGeneration = () => resolveSharedGatewaySessionGeneration(getResolvedAuth(), getRuntimeConfig().gateway?.trustedProxies);
	const resolveSharedGatewaySessionGenerationForRuntimeSnapshot = () => resolveSharedGatewaySessionGeneration(resolveGatewayAuth({
		authConfig: getRuntimeConfig().gateway?.auth,
		authOverride: resolvedStartupAuthOverride,
		env: process.env,
		tailscaleMode
	}), getRuntimeConfig().gateway?.trustedProxies);
	const sharedGatewaySessionGenerationState = {
		current: resolveCurrentSharedGatewaySessionGeneration(),
		required: null
	};
	const preauthHandshakeTimeoutMs = void 0;
	const initialHooksConfig = runtimeConfig.hooksConfig;
	const initialHookClientIpConfig = resolveHookClientIpConfig(cfgAtStart);
	const rateLimitConfig = cfgAtStart.gateway?.auth?.rateLimit;
	const { rateLimiter: authRateLimiter, browserRateLimiter: browserAuthRateLimiter } = createGatewayAuthRateLimiters(rateLimitConfig);
	const nodeReapprovalCoordinator = createNodeReapprovalCoordinator(rateLimitConfig);
	const controlUiRootLifecycle = await startupTrace.measure("control-ui.root", () => createGatewayControlUiRootLifecycle({
		controlUiRootOverride,
		controlUiEnabled,
		gatewayRuntime,
		log
	}));
	const { createTerminalLaunchPolicy } = await import("./launch-BGWw6KAH.js");
	const terminalLaunchPolicy = createTerminalLaunchPolicy(cfgAtStart);
	const { runDefaultChannelSetupWizard, runDefaultSetupWizard } = await import("./wizard-Dc9ZHGLp.js");
	const wizardRunner = opts.wizardRunner ?? runDefaultSetupWizard;
	const channelWizardRunner = opts.channelWizardRunner ?? runDefaultChannelSetupWizard;
	const { wizardSessions, findRunningWizard, purgeWizardSession } = createWizardSessionTracker();
	const systemAgentSessions = /* @__PURE__ */ new Map();
	const deps = createDefaultDeps();
	const runtimeStateRef = { current: null };
	const cronStartState = { handled: false };
	const gatewayTls = await startupTrace.measure("tls.runtime", () => loadGatewayTlsRuntime(cfgAtStart.gateway?.tls, log.child("tls")));
	if (cfgAtStart.gateway?.tls?.enabled && !gatewayTls.enabled) throw new Error(gatewayTls.error ?? "gateway tls: failed to enable");
	const serverStartedAt = Date.now();
	const readinessEventLoopHealth = createGatewayEventLoopHealthMonitor();
	const startupState = {
		sidecarsReady: minimalTestGateway,
		pendingReason: "startup-sidecars",
		dispatchReady: false
	};
	let releaseStartupAccountStarts = () => {};
	const startupAccountStartsReady = new Promise((resolve) => {
		releaseStartupAccountStarts = resolve;
	});
	const gatewayInstanceRuntimeRef = { current: void 0 };
	const { createChannelManager } = await import("./server-channels-BKYt4MUY.js");
	const channelManager = createChannelManager({
		getRuntimeConfig: () => {
			return resolveGatewayPluginConfig({ config: getRuntimeConfig() });
		},
		channelLogs,
		channelRuntimeEnvs,
		resolveChannelRuntime: getChannelRuntime,
		getPluginHttpRouteRegistry: () => pluginRuntime.registry,
		startupTrace,
		deferStartupAccountStartsUntil: startupAccountStartsReady,
		getNativeApprovalRuntime: () => gatewayInstanceRuntimeRef.current?.nativeApprovals,
		ambientAutostartSuppressedChannelIds,
		...opts.tryRecoverChannelAutostartSuppression ? { tryRecoverAutostartSuppression: opts.tryRecoverChannelAutostartSuppression } : {}
	});
	channelManager.setAutostartSuppression(opts.channelAutostartSuppression ?? null);
	const sidecarStartup = opts.sidecarStartup ?? "start";
	const isGatewayStartupPending = () => !startupState.sidecarsReady && sidecarStartup === "start";
	const getReadiness = createReadinessChecker({
		channelManager,
		startedAt: serverStartedAt,
		getStartupPending: isGatewayStartupPending,
		getStartupPendingReason: () => startupState.pendingReason,
		getGatewayDraining: isGatewayDraining,
		getEventLoopHealth: readinessEventLoopHealth.snapshot,
		shouldSkipChannelReadiness: () => isTruthyEnvValue(process.env.OPENCLAW_SKIP_CHANNELS) || isTruthyEnvValue(process.env.OPENCLAW_SKIP_PROVIDERS)
	});
	log.info("starting HTTP server...");
	const pluginGatewayContext = { current: void 0 };
	const watchNodeRequestHandler = {};
	const { httpServer, httpServers, httpBindHosts, startListening, wss, preauthConnectionBudget, clients, broadcast, broadcastToConnIds, broadcastPluginEvent, getBufferedAmount, agentRunSeq, dedupe, chatRunState, addChatRun, removeChatRun, chatAbortControllers, chatQueuedTurns, toolEventRecipients, sessionEventSubscribers, sessionMessageSubscribers, getWorkerIngressEndpoint, getMcpAppSandboxPort, ensureSandboxHostPort } = await startupTrace.measure("runtime.state", () => createGatewayRuntimeState({
		cfg: cfgAtStart,
		getRuntimeConfig,
		bindHost,
		port,
		controlUiEnabled,
		controlUiBasePath,
		controlUiRoot: controlUiRootLifecycle.state,
		openAiChatCompletionsEnabled,
		openAiChatCompletionsConfig,
		openResponsesEnabled,
		openResponsesConfig,
		strictTransportSecurityHeader,
		resolvedAuth,
		rateLimiter: authRateLimiter,
		isTerminalEnabled: terminalLaunchPolicy.isEnabled,
		gatewayTls,
		getResolvedAuth,
		hooksConfig: () => runtimeStateRef.current?.hooksConfig ?? initialHooksConfig,
		getHookClientIpConfig: () => runtimeStateRef.current?.hookClientIpConfig ?? initialHookClientIpConfig,
		pluginRegistry: pluginRuntime.registry,
		getPluginRouteRegistry: () => pluginRuntime.registry,
		isStartupPluginRuntimeReady: () => startupState.sidecarsReady,
		getGatewayRequestContext: () => pluginGatewayContext.current,
		deps,
		log,
		logHooks,
		logPlugins,
		getReadiness,
		handleWatchNodeRequest: async (req, res) => await watchNodeRequestHandler.current?.(req, res) ?? false,
		workerIngressEnabled: Boolean(workerEnvironmentService)
	}));
	return {
		...bootstrap,
		pluginRuntime,
		hasConfiguredWorkerProfiles,
		workerEnvironmentService,
		workerLiveEvents,
		workerDispatchAuthority,
		workerPlacementRuntime,
		workerPlacementControlAvailable,
		workerPlacementDispatchAvailable,
		channelLogs,
		channelRuntimeEnvs,
		listStartupChannelGatewayMethods,
		listActiveGatewayMethods,
		bindHost,
		controlUiEnabled,
		controlUiRootLifecycle,
		openAiChatCompletionsEnabled,
		openAiChatCompletionsConfig,
		openResponsesEnabled,
		openResponsesConfig,
		strictTransportSecurityHeader,
		controlUiBasePath,
		resolvedAuth,
		tailscaleConfig,
		tailscaleMode,
		getResolvedAuth,
		resolveSharedGatewaySessionGenerationForConfig,
		resolveSharedGatewaySessionGenerationForRuntimeSnapshot,
		sharedGatewaySessionGenerationState,
		preauthHandshakeTimeoutMs,
		initialHooksConfig,
		initialHookClientIpConfig,
		authRateLimiter,
		browserAuthRateLimiter,
		nodeReapprovalCoordinator,
		terminalLaunchPolicy,
		wizardRunner,
		channelWizardRunner,
		wizardSessions,
		findRunningWizard,
		purgeWizardSession,
		systemAgentSessions,
		deps,
		runtimeStateRef,
		cronStartState,
		gatewayTls,
		readinessEventLoopHealth,
		startupState,
		releaseStartupAccountStarts,
		gatewayInstanceRuntimeRef,
		channelManager,
		sidecarStartup,
		isGatewayStartupPending,
		pluginGatewayContext,
		watchNodeRequestHandler,
		httpServer,
		httpServers,
		httpBindHosts,
		startListening,
		wss,
		preauthConnectionBudget,
		clients,
		broadcast,
		broadcastToConnIds,
		broadcastPluginEvent,
		getBufferedAmount,
		agentRunSeq,
		dedupe,
		chatRunState,
		addChatRun,
		removeChatRun,
		chatAbortControllers,
		chatQueuedTurns,
		toolEventRecipients,
		sessionEventSubscribers,
		sessionMessageSubscribers,
		getWorkerIngressEndpoint,
		getMcpAppSandboxPort,
		ensureSandboxHostPort,
		workerGatewayEndpoint,
		/** Runtime cleanup — terminates the worker pool + uninstalls the admission provider. */
		runtimeCleanup: runtimeSetup.cleanup
	};
}
//#endregion
//#region src/gateway/startup-control-ui-origins.ts
/**
* Seeds runtime-only Control UI origins when a non-loopback gateway bind would
* otherwise reject the browser that just opened the local UI.
*/
async function maybeSeedControlUiAllowedOriginsAtStartup(params) {
	const seeded = ensureControlUiAllowedOriginsForNonLoopbackBind(params.config, {
		isContainerEnvironment,
		runtimeBind: params.runtimeBind,
		runtimePort: params.runtimePort
	});
	if (!seeded.seededOrigins || !seeded.bind) return {
		config: params.config,
		seededAllowedOrigins: false
	};
	params.log.info(buildSeededOriginsInfoLog(seeded.seededOrigins, seeded.bind));
	return {
		config: seeded.config,
		seededAllowedOrigins: true
	};
}
function buildSeededOriginsInfoLog(origins, bind) {
	return `gateway: seeded gateway.controlUi.allowedOrigins ${JSON.stringify(origins)} for bind=${bind} (required since v2026.2.26; see issue #29385). Applied for this runtime without writing config; add other origins to gateway.controlUi.allowedOrigins if needed.`;
}
//#endregion
//#region src/gateway/server-startup-bootstrap.ts
function publishGatewayPluginRuntimeConfigAtStartup(params) {
	setAppliedRuntimeConfigSnapshot(params.runtimeConfig, params.sourceConfig);
}
async function prepareGatewayServerBootstrap(input) {
	const { port, opts, log, logSecrets, loadWorkerEnvironmentStartupModule } = input;
	const formatRuntimeGatewayAuthTokenWarning = input.formatRuntimeGatewayAuthTokenWarning;
	normalizeStateDirEnv(process.env);
	const [{ OPENCLAW_DATABASE_SCHEMA_DOCS_URL, OpenClawDatabaseSchemaPreflightError, preflightOpenClawDatabaseSchemas }, agentDatabase, stateDatabase] = await Promise.all([
		import("./openclaw-database-preflight-B5lbSnzl.js"),
		import("./openclaw-agent-db-BS0jLKqA.js"),
		import("./openclaw-state-db-BgJ_d2m9.js")
	]);
	const databaseSchemas = preflightOpenClawDatabaseSchemas({
		env: process.env,
		supportedVersions: {
			state: stateDatabase.OPENCLAW_STATE_SCHEMA_VERSION,
			agent: agentDatabase.OPENCLAW_AGENT_SCHEMA_VERSION
		}
	});
	if (databaseSchemas.incompatible.length > 0) {
		for (const database of databaseSchemas.incompatible) log.error("database schema preflight rejected newer schema", {
			kind: database.kind,
			path: database.path,
			...database.agentId ? { agentId: database.agentId } : {},
			foundVersion: database.foundVersion,
			supportedVersion: database.supportedVersion,
			writerAppVersion: database.writerAppVersion ?? "unknown",
			docsUrl: OPENCLAW_DATABASE_SCHEMA_DOCS_URL
		});
		throw new OpenClawDatabaseSchemaPreflightError(databaseSchemas.incompatible);
	}
	for (const database of databaseSchemas.indeterminate) log.warn("database schema preflight could not inspect database; continuing to real open", {
		kind: database.kind,
		path: database.path,
		reason: database.reason,
		docsUrl: OPENCLAW_DATABASE_SCHEMA_DOCS_URL
	});
	const { bootstrapGatewayNetworkRuntime } = await import("./server-network-runtime-fvMzan92.js");
	bootstrapGatewayNetworkRuntime();
	const minimalTestGateway = isVitestRuntimeEnv() && process.env.OPENCLAW_TEST_MINIMAL_GATEWAY === "1";
	const ambientEnvTriggers = opts.ambientEnvTriggers ?? "allow";
	process.env.OPENCLAW_GATEWAY_PORT = String(port);
	logAcceptedEnvOption({
		key: "OPENCLAW_RAW_STREAM",
		description: "raw stream logging enabled"
	});
	logAcceptedEnvOption({
		key: "OPENCLAW_RAW_STREAM_PATH",
		description: "raw stream log path override"
	});
	if (!resumeGatewayRestartTraceFromEnv(process.env, [["source", "env"]])) {
		const restartHandoff = readGatewayRestartHandoffSync();
		resumeGatewayRestartTraceFromHandoff(restartHandoff?.restartTrace, [
			["source", restartHandoff?.source],
			["restartKind", restartHandoff?.restartKind],
			["supervisorMode", restartHandoff?.supervisorMode]
		]);
	}
	const startupTrace = createGatewayStartupTrace(log);
	const startupConfigModulePromise = import("./server-startup-config-B63nV6cL.js");
	const loadStartupPluginsModule = createLazyPromise(() => import("./server-startup-plugins-WAb5UYAr.js"), { cacheRejections: true });
	const { loadGatewayStartupConfigSnapshot } = await startupConfigModulePromise;
	const envBeforeStartupConfigLoad = { ...process.env };
	const startupConfigLoad = await startupTrace.measure("config.snapshot", () => loadGatewayStartupConfigSnapshot({
		minimalTestGateway,
		log,
		measure: (name, run) => startupTrace.measure(name, run),
		...opts.startupConfigSnapshotRead ? { initialSnapshotRead: opts.startupConfigSnapshotRead } : {}
	}));
	const configSnapshot = startupConfigLoad.snapshot;
	const startupAuthOverride = opts.auth ? structuredClone(opts.auth) : void 0;
	const startupTailscaleOverride = opts.tailscale ? structuredClone(opts.tailscale) : void 0;
	const controlUiSeed = minimalTestGateway ? {
		config: configSnapshot.config,
		seededAllowedOrigins: false
	} : await startupTrace.measure("control-ui.seed", () => maybeSeedControlUiAllowedOriginsAtStartup({
		config: configSnapshot.config,
		log,
		runtimeBind: opts.bind,
		runtimePort: port
	}));
	const startupConfigSnapshot = controlUiSeed.seededAllowedOrigins ? {
		...configSnapshot,
		runtimeConfig: controlUiSeed.config,
		config: controlUiSeed.config
	} : configSnapshot;
	const emitSecretsStateEvent = (code, message, cfg) => {
		enqueueSystemEvent(`[${code}] ${message}`, {
			sessionKey: resolveMainSessionKey(cfg),
			contextKey: code
		});
	};
	const { createRuntimeSecretsActivator } = await startupConfigModulePromise;
	const activateRuntimeSecrets = createRuntimeSecretsActivator({
		logSecrets,
		emitStateEvent: emitSecretsStateEvent,
		channelAutostartSuppression: opts.channelAutostartSuppression,
		...startupConfigLoad.pluginMetadataSnapshot ? { pluginMetadataSnapshot: startupConfigLoad.pluginMetadataSnapshot } : {}
	});
	let startupInternalWriteHash = null;
	let startupLastGoodSnapshot = configSnapshot;
	const startupActivationSourceConfig = configSnapshot.sourceConfig;
	const startupRuntimeConfig = captureConfigOverrideApplier()(startupConfigSnapshot.config);
	startupTrace.setConfig(startupRuntimeConfig);
	const { prepareGatewayStartupConfig } = await startupConfigModulePromise;
	const authBootstrap = await startupTrace.measure("config.auth", () => prepareGatewayStartupConfig({
		configSnapshot: startupConfigSnapshot,
		authOverride: startupAuthOverride,
		tailscaleOverride: startupTailscaleOverride,
		activateRuntimeSecrets,
		log,
		measure: (name, run, measureOptions) => startupTrace.measure(name, run, measureOptions)
	}), { omitErrorMessage: true });
	const cfgAtStart = authBootstrap.cfg;
	startupTrace.setConfig(cfgAtStart);
	const { claimControlUiDeviceAuthMigration, completeControlUiDeviceAuthMigration, importPendingControlUiDeviceAuthMigration, isLegacyControlUiDeviceAuthMigrationInput, readControlUiDeviceAuthMigrationState, recoverControlUiDeviceAuthMigrationClaim, releaseControlUiDeviceAuthMigrationClaim } = await import("./control-ui-device-auth-migration-B59Mseyc.js");
	let controlUiDeviceAuthMigrationState = isLegacyControlUiDeviceAuthMigrationInput({
		disabledDeviceAuth: cfgAtStart.gateway?.controlUi?.dangerouslyDisableDeviceAuth === true,
		lastTouchedVersion: cfgAtStart.meta?.lastTouchedVersion
	}) ? importPendingControlUiDeviceAuthMigration({ env: process.env }) : readControlUiDeviceAuthMigrationState({ env: process.env });
	if (controlUiDeviceAuthMigrationState?.status === "pending" && controlUiDeviceAuthMigrationState.claimedDeviceId) controlUiDeviceAuthMigrationState = recoverControlUiDeviceAuthMigrationClaim({ env: process.env });
	if (controlUiDeviceAuthMigrationState?.status === "pending") {
		const existingOperator = (await listDevicePairing()).paired.map(resolveEffectiveOperatorDeviceIdentity).find((device) => device !== null && roleScopesAllow({
			role: "operator",
			requestedScopes: ["operator.pairing"],
			allowedScopes: device.scopes
		}));
		if (existingOperator) try {
			controlUiDeviceAuthMigrationState = completeControlUiDeviceAuthMigration(existingOperator.deviceId, { env: process.env });
		} catch (error) {
			log.warn(`failed to reconcile Control UI device-auth migration with existing operator: ${String(error)}`);
		}
	}
	const controlUiDeviceAuthMigration = { pending: controlUiDeviceAuthMigrationState?.status === "pending" };
	if (controlUiDeviceAuthMigration.pending) log.warn("Retired gateway.controlUi.dangerouslyDisableDeviceAuth config detected. Authenticated Control UI access remains available for pairing-only remediation; reopen the Control UI over HTTPS or localhost, then click Secure this browser.");
	if (authBootstrap.generatedToken) log.warn(formatRuntimeGatewayAuthTokenWarning());
	const trustedProxyDeviceAutoApprove = cfgAtStart.gateway?.auth?.trustedProxy?.deviceAutoApprove;
	if (cfgAtStart.gateway?.auth?.mode === "trusted-proxy" && trustedProxyDeviceAutoApprove?.enabled === true && trustedProxyDeviceAutoApprove.scopes?.some((scope) => scope.trim() === "operator.admin")) log.warn("SECURITY WARNING: gateway.auth.trustedProxy.deviceAutoApprove.scopes includes operator.admin; every proxy-authenticated user can auto-approve a new browser device with full admin, and requests without scopes receive full admin automatically. Remove operator.admin to require manual approval until per-identity roles are available.");
	const resolvedStartupAuthOverride = startupAuthOverride ? Object.fromEntries([
		"mode",
		"token",
		"password",
		"allowTailscale",
		"rateLimit",
		"trustedProxy"
	].flatMap((key) => {
		if (startupAuthOverride[key] === void 0) return [];
		if ((key === "token" || key === "password") && isSecretRef(startupAuthOverride[key])) return [];
		const resolvedValue = cfgAtStart.gateway?.auth?.[key];
		return resolvedValue === void 0 ? [] : [[key, structuredClone(resolvedValue)]];
	})) : void 0;
	const startupAuthSecretRefOverride = startupAuthOverride ? {
		...isSecretRef(startupAuthOverride.token) ? { token: structuredClone(startupAuthOverride.token) } : {},
		...isSecretRef(startupAuthOverride.password) ? { password: structuredClone(startupAuthOverride.password) } : {}
	} : void 0;
	const reloadAuthOverride = authBootstrap.generatedToken ? mergeGatewayAuthConfig(resolvedStartupAuthOverride, { token: authBootstrap.generatedToken }) : resolvedStartupAuthOverride;
	const diagnosticsEnabled = isDiagnosticsEnabled(cfgAtStart);
	setDiagnosticsEnabledForProcess(diagnosticsEnabled);
	setGatewaySigusr1RestartPolicy({ allowExternal: isRestartEnabled(cfgAtStart) });
	const activeTaskCount = { get: () => 0 };
	setPreRestartDeferralCheck(() => getTotalQueueSize() + getTotalPendingReplies() + getActiveEmbeddedRunCount() + getActiveCronJobCount() + getActiveBackgroundExecSessionCount() + getActiveGatewayRootWorkCount({ excludeCurrent: true }) + activeTaskCount.get());
	const seededControlUiAllowedOrigins = controlUiSeed.seededAllowedOrigins ? cfgAtStart.gateway?.controlUi?.allowedOrigins : void 0;
	const applyFixedGatewayOverlays = (config) => {
		let runtimeConfig = config;
		if (reloadAuthOverride || startupTailscaleOverride) runtimeConfig = {
			...runtimeConfig,
			gateway: {
				...runtimeConfig.gateway,
				...reloadAuthOverride ? { auth: mergeGatewayAuthConfig(runtimeConfig.gateway?.auth, reloadAuthOverride) } : {},
				...startupTailscaleOverride ? { tailscale: mergeGatewayTailscaleConfig(runtimeConfig.gateway?.tailscale, startupTailscaleOverride) } : {}
			}
		};
		if (seededControlUiAllowedOrigins && runtimeConfig.gateway?.controlUi?.allowedOrigins === void 0) runtimeConfig = {
			...runtimeConfig,
			gateway: {
				...runtimeConfig.gateway,
				controlUi: {
					...runtimeConfig.gateway?.controlUi,
					allowedOrigins: seededControlUiAllowedOrigins
				}
			}
		};
		return runtimeConfig;
	};
	const applyReloadableGatewayAuthRefs = (config) => {
		if (!startupAuthSecretRefOverride?.token && !startupAuthSecretRefOverride?.password) return config;
		return {
			...config,
			gateway: {
				...config.gateway,
				auth: mergeGatewayAuthConfig(config.gateway?.auth, startupAuthSecretRefOverride)
			}
		};
	};
	const prepareReloadCandidate = (params) => {
		const previousSourceConfig = params.previousSourceConfig ?? getRuntimeConfigSourceSnapshot() ?? startupLastGoodSnapshot.sourceConfig;
		assertGatewayConfigEnvSelectionUnchanged(previousSourceConfig, params.sourceConfig);
		const runtimeEnv = prepareConfigRuntimeEnv({
			previousConfig: previousSourceConfig,
			nextConfig: params.sourceConfig
		});
		const metadata = startupConfigLoad.pluginMetadataSnapshot;
		const pluginCandidate = minimalTestGateway ? {
			runtimeConfig: params.runtimeConfig,
			compareConfig: params.sourceConfig
		} : resolveGatewayReloadPluginActivationCandidate({
			...params,
			env: runtimeEnv.env,
			...metadata?.manifestRegistry ? { manifestRegistry: metadata.manifestRegistry } : {},
			discovery: metadata?.discovery,
			ambientEnvTriggers
		});
		const applyCandidateOverrides = captureConfigOverrideApplier();
		const reapplyCompareOverlays = (config) => applyCandidateOverrides(mergeActivationSectionsIntoRuntimeConfig({
			runtimeConfig: config,
			activationConfig: pluginCandidate.compareConfig
		}));
		const reapplyRuntimeOverlays = (config) => applyFixedGatewayOverlays(applyReloadableGatewayAuthRefs(reapplyCompareOverlays(config)));
		return {
			runtimeConfig: reapplyRuntimeOverlays(params.runtimeConfig),
			compareConfig: reapplyCompareOverlays(params.sourceConfig),
			runtimeEnv,
			reapplyRuntimeOverlays,
			reapplyCompareOverlays
		};
	};
	if (startupConfigLoad.wroteConfig || authBootstrap.persistedGeneratedToken) {
		const startupSnapshot = await startupTrace.measure("config.final-snapshot", () => readConfigFileSnapshot());
		startupInternalWriteHash = startupSnapshot.hash ?? null;
		startupLastGoodSnapshot = startupSnapshot;
	}
	setAppliedRuntimeConfigSnapshot(cfgAtStart, startupLastGoodSnapshot.sourceConfig);
	initializePublishedConfigRuntimeEnv(startupLastGoodSnapshot.sourceConfig, {
		ownedEnv: collectConfigRuntimeEnvOwnership(startupLastGoodSnapshot.sourceConfig, envBeforeStartupConfigLoad, process.env),
		preserveExistingOwnership: true
	});
	const workerEnvironmentStartup = minimalTestGateway ? void 0 : await startupTrace.measure("worker-environments.store-import", async () => {
		return await (await loadWorkerEnvironmentStartupModule()).loadGatewayWorkerEnvironmentStartupState();
	});
	const { prepareGatewayPluginBootstrap, runGatewayStartupMaintenance } = await loadStartupPluginsModule();
	await startupTrace.measure("startup.maintenance", () => runGatewayStartupMaintenance({
		cfgAtStart,
		startupRuntimeConfig,
		minimalTestGateway,
		log
	}));
	const pluginBootstrap = await startupTrace.measure("plugins.bootstrap", () => prepareGatewayPluginBootstrap({
		cfgAtStart,
		activationSourceConfig: startupActivationSourceConfig,
		pluginMetadataSnapshot: startupConfigLoad.pluginMetadataSnapshot,
		workerProviderIds: workerEnvironmentStartup?.durableProviderIds ?? [],
		minimalTestGateway,
		ambientEnvTriggers,
		log
	}));
	const { gatewayPluginConfigAtStart, defaultWorkspaceDir, startupPluginIds, pluginManifestRecords, pluginLookUpTable, baseMethods, ambientAutostartSuppressedChannelIds } = pluginBootstrap;
	publishGatewayPluginRuntimeConfigAtStartup({
		runtimeConfig: gatewayPluginConfigAtStart,
		sourceConfig: startupLastGoodSnapshot.sourceConfig
	});
	const coreGatewayMethodNames = listCoreGatewayMethodNames();
	setCurrentPluginMetadataSnapshot(pluginLookUpTable, {
		config: startupActivationSourceConfig,
		compatibleConfigs: [
			startupRuntimeConfig,
			cfgAtStart,
			gatewayPluginConfigAtStart
		],
		env: process.env,
		workspaceDir: defaultWorkspaceDir
	});
	if (pluginLookUpTable) {
		const metrics = pluginLookUpTable.metrics;
		startupTrace.detail("plugins.lookup-table", [
			["registrySnapshotMs", metrics.registrySnapshotMs],
			["manifestRegistryMs", metrics.manifestRegistryMs],
			["startupPlanMs", metrics.startupPlanMs],
			["ownerMapsMs", metrics.ownerMapsMs],
			["totalMs", metrics.totalMs],
			["indexPlugins", String(metrics.indexPluginCount)],
			["indexPluginCount", metrics.indexPluginCount],
			["manifestPlugins", String(metrics.manifestPluginCount)],
			["manifestPluginCount", metrics.manifestPluginCount],
			["startupPlugins", String(metrics.startupPluginCount)],
			["startupPluginCount", metrics.startupPluginCount]
		]);
	}
	return {
		opts,
		minimalTestGateway,
		ambientEnvTriggers,
		startupTrace,
		loadStartupPluginsModule,
		configSnapshot,
		startupConfigLoad,
		startupActivationSourceConfig,
		startupRuntimeConfig,
		cfgAtStart,
		generatedStartupAuthToken: authBootstrap.generatedToken !== void 0,
		claimControlUiDeviceAuthMigration,
		completeControlUiDeviceAuthMigration,
		releaseControlUiDeviceAuthMigrationClaim,
		controlUiDeviceAuthMigration,
		resolvedStartupAuthOverride,
		startupTailscaleOverride,
		diagnosticsEnabled,
		activeTaskCount,
		applyFixedGatewayOverlays,
		prepareReloadCandidate,
		startupInternalWriteHash,
		startupLastGoodSnapshot,
		workerEnvironmentStartup,
		pluginBootstrap,
		gatewayPluginConfigAtStart,
		defaultWorkspaceDir,
		startupPluginIds,
		pluginManifestRecords,
		pluginLookUpTable,
		baseMethods,
		ambientAutostartSuppressedChannelIds,
		coreGatewayMethodNames,
		activateRuntimeSecrets
	};
}
//#endregion
//#region src/gateway/server-startup-finish.ts
const [POST_READY_MAINTENANCE_DELAY_MS, RETAINED_PLUGIN_CLEANUP_DELAY_MS] = [250, 3e4];
async function finishGatewayStartup(params) {
	const { coreRuntime: runtime, port, opts, log, logHealth, logWsControl, logHooks, logChannels, logCron, logReload, logTailscale, loadGatewayStartupPostAttachModule } = params;
	const { minimalTestGateway, deps, runtimeState, sessionCompanion, sessionObserver, getMcpAppSandboxPort, ensureSandboxHostPort, terminalLaunchPolicy, execApprovalManager, cancelRunBoundApprovals, forwardPluginApprovalRequest, pluginApprovalIosPushDelivery, pluginApprovalManager, systemAgentApprovalManager, approvalSessionEvents, startupTrace, loadGatewayModelCatalog, loadGatewayModelCatalogSnapshot, readPreparedGatewayModelCatalog, refreshGatewayHealthSnapshotWithRuntime, getRuntimeSnapshot, broadcast, broadcastToConnIds, nodeSendToSession, nodeSendToAllSubscribed, nodeSubscribe, nodeUnsubscribe, nodeUnsubscribeAll, hasTalkNodeConnected, clients, watchNodeHttpRuntime, sharedGatewaySessionGenerationState, resolveSharedGatewaySessionGenerationForRuntimeSnapshot, completeControlUiDeviceAuthMigrationForEffectiveOperator, claimControlUiDeviceAuthMigration, releaseControlUiDeviceAuthMigrationClaim, controlUiDeviceAuthMigration, nodeRegistry, workerEnvironmentService, workerPlacementRuntime, workerPlacementControlAvailable, terminalSessions, agentRunSeq, chatAbortControllers, chatQueuedTurns, chatRunState, addChatRun, removeChatRun, subscribeSessionMessageEvents, unsubscribeSessionMessageEvents, sessionEventSubscribers, sessionMessageSubscribers, toolEventRecipients, dedupe, wizardSessions, systemAgentSessions, findRunningWizard, purgeWizardSession, startChannel, stopChannel, markChannelLoggedOut, wizardRunner, channelWizardRunner, broadcastVoiceWakeChanged, broadcastVoiceWakeRoutingChanged, pluginGatewayContext, getAttachedGatewayMethodRegistry, gatewayInstanceRuntimeRef, lifecycle, startupState, pluginRuntime, gatewayTls, bindHost, getResolvedAuth, authRateLimiter, browserAuthRateLimiter, nodeReapprovalCoordinator, preauthHandshakeTimeoutMs, isGatewayStartupPending, attachedGatewayExtraHandlers, startListening, loadStartupPluginsModule, gatewayPluginConfigAtStart, startupActivationSourceConfig, defaultWorkspaceDir, coreGatewayMethodNames, pluginHostServices, baseMethods, startupPluginIds, pluginManifestRecords, pluginLookUpTable, ambientEnvTriggers, replaceAttachedPluginRuntime, refreshAttachedGatewayDiscovery, wss, httpBindHosts, startChannels, broadcastPluginEvent, tailscaleMode, tailscaleConfig, controlUiBasePath, controlUiRootLifecycle, sidecarStartup, workerLiveEvents, earlyRuntime, cfgAtStart, resolvedAuth, preauthConnectionBudget, releaseStartupAccountStarts, cronReconciliation, postReadyState, cronStartState, prepareReloadCandidate, startupLastGoodSnapshot, startupInternalWriteHash, configSnapshot, channelManager, activateRuntimeSecrets, applyFixedGatewayOverlays, resolveSharedGatewaySessionGenerationForConfig, reloadAttachedGatewayPlugins, readinessEventLoopHealth, stopRegisteredPostReadySidecars, clearFallbackGatewayContextForServer } = runtime;
	if (runtime.runtimeCleanup) runtimeState.gatewayLifetimeSidecars.push({ stop: runtime.runtimeCleanup });
	const unavailableGatewayMethods = new Set(minimalTestGateway ? [] : STARTUP_UNAVAILABLE_GATEWAY_METHODS);
	const gatewayRequestContext = await startupTrace.measure("gateway.request-context", async () => {
		const { createGatewayRequestContext } = await import("./server-request-context-5hMbRqhv.js");
		return createGatewayRequestContext({
			deps,
			runtimeState,
			sessionCompanion,
			getRuntimeConfig,
			sessionObserver,
			getMcpAppSandboxPort,
			ensureSandboxHostPort,
			resolveTerminalLaunchPolicy: terminalLaunchPolicy.resolve,
			isTerminalEnabled: terminalLaunchPolicy.isEnabled,
			execApprovalManager,
			cancelRunBoundApprovals,
			forwardPluginApprovalRequest,
			pluginApprovalIosPushDelivery,
			pluginApprovalManager,
			systemAgentApprovalManager,
			listSessionPendingApprovals: approvalSessionEvents.replay,
			loadGatewayModelCatalog,
			loadGatewayModelCatalogSnapshot,
			readPreparedGatewayModelCatalog,
			getHealthCache,
			refreshHealthSnapshot: refreshGatewayHealthSnapshotWithRuntime,
			logHealth,
			logGateway: log,
			incrementPresenceVersion,
			getHealthVersion,
			broadcast,
			broadcastToConnIds,
			nodeSendToSession,
			nodeSendToAllSubscribed,
			nodeSubscribe,
			nodeUnsubscribe,
			nodeUnsubscribeAll,
			hasConnectedTalkNode: hasTalkNodeConnected,
			clients,
			invalidateDeviceTransports: watchNodeHttpRuntime.invalidateSessionsForDevice,
			disconnectDeviceTransports: watchNodeHttpRuntime.disconnectSessionsForDevice,
			enforceSharedGatewayAuthGenerationForConfigWrite: (nextConfig) => {
				enforceSharedGatewaySessionGenerationForConfigWrite({
					state: sharedGatewaySessionGenerationState,
					nextConfig,
					resolveRuntimeSnapshotGeneration: resolveSharedGatewaySessionGenerationForRuntimeSnapshot,
					clients
				});
			},
			completeControlUiDeviceAuthMigration: completeControlUiDeviceAuthMigrationForEffectiveOperator,
			claimControlUiDeviceAuthMigration: (deviceId) => claimControlUiDeviceAuthMigration(deviceId, { env: process.env }),
			releaseControlUiDeviceAuthMigrationClaim: (deviceId) => releaseControlUiDeviceAuthMigrationClaim(deviceId, { env: process.env }),
			nodeRegistry,
			...workerEnvironmentService ? { workerEnvironmentService } : {},
			...workerPlacementRuntime ? { workerSessionPlacementService: workerPlacementRuntime.placements } : {},
			...workerPlacementControlAvailable ? { workerPlacementDispatchService: workerPlacementControlAvailable } : {},
			terminalSessions,
			agentRunSeq,
			chatAbortControllers,
			chatQueuedTurns,
			chatRunState,
			addChatRun,
			removeChatRun,
			subscribeSessionEvents: sessionEventSubscribers.subscribe,
			unsubscribeSessionEvents: sessionEventSubscribers.unsubscribe,
			subscribeSessionMessageEvents,
			unsubscribeSessionMessageEvents,
			unsubscribeAllSessionEvents: (connId) => {
				sessionEventSubscribers.unsubscribe(connId);
				sessionMessageSubscribers.unsubscribeAll(connId);
				sessionObserver.removeConnection(connId);
			},
			getSessionEventSubscriberConnIds: sessionEventSubscribers.getAll,
			registerToolEventRecipient: toolEventRecipients.add,
			dedupe,
			wizardSessions,
			systemAgentSessions,
			findRunningWizard,
			purgeWizardSession,
			getRuntimeSnapshot,
			getEventLoopHealth: readinessEventLoopHealth.snapshot,
			startChannel,
			stopChannel,
			markChannelLoggedOut,
			wizardRunner,
			channelWizardRunner,
			broadcastVoiceWakeChanged,
			unavailableGatewayMethods,
			broadcastVoiceWakeRoutingChanged
		});
	});
	const sessionChangeSidecar = { stop: async () => {
		const { flushPendingSessionsChangedEvents } = await import("./session-change-event-CqMVwG2J.js");
		flushPendingSessionsChangedEvents(gatewayRequestContext);
	} };
	runtimeState.gatewayLifetimeSidecars.push(sessionChangeSidecar);
	pluginGatewayContext.current = gatewayRequestContext;
	const { createGatewayInstanceRuntime } = await import("./server-instance-runtime-CEhIg2We.js");
	const gatewayInstanceRuntimeLocal = createGatewayInstanceRuntime({
		getContext: () => gatewayRequestContext,
		getMethodRegistry: () => getAttachedGatewayMethodRegistry(),
		isDispatchAvailable: () => startupState.dispatchReady && !lifecycle.closePreludeStarted,
		logError: (message) => log.error(message)
	});
	gatewayInstanceRuntimeRef.current = gatewayInstanceRuntimeLocal;
	gatewayRequestContext.approvalEvents = gatewayInstanceRuntimeLocal.approvalEvents;
	gatewayRequestContext.recoveryRuntime = gatewayInstanceRuntimeLocal.recovery;
	const fallbackGatewayContextCleanup = setFallbackGatewayContextResolver(() => gatewayRequestContext);
	clearFallbackGatewayContextForServer.set(typeof fallbackGatewayContextCleanup === "function" ? () => {
		fallbackGatewayContextCleanup();
	} : () => {});
	const [{ attachGatewayWsHandlers }, { listPluginNodeCapabilities }] = await startupTrace.measure("gateway.ws-imports", () => Promise.all([import("./server-ws-runtime-qas6Nese.js"), import("./route-capability-Cjzy-wRF.js")]));
	await startupTrace.measure("gateway.ws-attach", () => attachGatewayWsHandlers({
		wss,
		clients,
		preauthConnectionBudget,
		port,
		gatewayHost: bindHost ?? void 0,
		pluginSurfaceScheme: gatewayTls.enabled ? "https" : "http",
		getPluginNodeCapabilities: () => withCoreCanvasNodeCapability(listPluginNodeCapabilities(pluginRuntime.registry), isCoreCanvasHostEnabled(getRuntimeConfig())),
		resolvedAuth,
		getResolvedAuth,
		getRequiredSharedGatewaySessionGeneration: () => getRequiredSharedGatewaySessionGeneration(sharedGatewaySessionGenerationState),
		rateLimiter: authRateLimiter,
		browserRateLimiter: browserAuthRateLimiter,
		nodeReapprovalCoordinator,
		preauthHandshakeTimeoutMs,
		isStartupPending: isGatewayStartupPending,
		isControlUiDeviceAuthMigrationPending: () => controlUiDeviceAuthMigration.pending,
		gatewayMethods: runtimeState.gatewayMethods,
		events: GATEWAY_EVENTS,
		logGateway: log,
		logHealth,
		logWsControl,
		extraHandlers: attachedGatewayExtraHandlers,
		getMethodRegistry: () => getAttachedGatewayMethodRegistry(),
		...workerEnvironmentService ? { workerConnectionService: workerEnvironmentService } : {},
		broadcast,
		context: gatewayRequestContext
	}));
	await startupTrace.measure("http.listen", () => startListening());
	startupState.dispatchReady = true;
	startupTrace.mark("http.bound");
	const sessionDeliveryRecoveryMaxEnqueuedAt = Date.now();
	let postAttachRuntimeReturned = false;
	let scheduledServicesActivated = false;
	const loadScheduledServicesModule = createLazyPromise(() => import("./server-runtime-services-DBNyXSCg.js"), { cacheRejections: true });
	const activateScheduledServicesWhenReady = () => {
		if (lifecycle.closePreludeStarted || !postAttachRuntimeReturned || !startupState.sidecarsReady || scheduledServicesActivated) return;
		scheduledServicesActivated = true;
		loadScheduledServicesModule().then((gatewayRuntimeServices) => {
			if (lifecycle.closePreludeStarted) return;
			const activated = gatewayRuntimeServices.activateGatewayScheduledServices({
				minimalTestGateway,
				cfgAtStart,
				deps,
				sessionDeliveryRecoveryMaxEnqueuedAt,
				cronState: runtimeState.cronState,
				cronReconciliation,
				startCron: false,
				logCron,
				log
			});
			runtimeState.heartbeatRunner = activated.heartbeatRunner;
			runtimeState.stopOutboundDeliveryRecovery = activated.stopOutboundDeliveryRecovery;
		});
	};
	({stopGatewayUpdateCheck: runtimeState.stopGatewayUpdateCheck, tailscaleCleanup: runtimeState.tailscaleCleanup, pluginServices: runtimeState.pluginServices} = await startupTrace.measure("runtime.post-attach", () => loadGatewayStartupPostAttachModule().then(({ startGatewayPostAttachRuntime, stopPostReadySidecarsAfterCloseStarted }) => startGatewayPostAttachRuntime({
		minimalTestGateway,
		cfgAtStart,
		getConfig: getRuntimeConfig,
		bindHost,
		bindHosts: httpBindHosts,
		port,
		tlsEnabled: gatewayTls.enabled,
		log,
		isNixMode,
		startupStartedAt: opts.startupStartedAt,
		broadcast,
		broadcastPluginEvent,
		tailscaleMode,
		resetOnExit: tailscaleConfig.resetOnExit ?? false,
		serviceName: tailscaleConfig.serviceName,
		preserveFunnel: tailscaleConfig.preserveFunnel ?? false,
		controlUiBasePath,
		controlUiRootLifecycle,
		logTailscale,
		gatewayPluginConfigAtStart,
		activationSourceConfig: startupActivationSourceConfig,
		pluginManifestRecords,
		ambientEnvTriggers,
		pluginRegistry: pluginRuntime.registry,
		defaultWorkspaceDir,
		deps,
		startChannels,
		recoveryRuntime: gatewayInstanceRuntimeLocal.recovery,
		logHooks,
		logChannels,
		unavailableGatewayMethods,
		loadStartupPlugins: async () => {
			const { loadGatewayStartupPluginRuntime } = await loadStartupPluginsModule();
			return loadGatewayStartupPluginRuntime({
				cfg: gatewayPluginConfigAtStart,
				activationSourceConfig: startupActivationSourceConfig,
				workspaceDir: defaultWorkspaceDir,
				log,
				baseMethods,
				coreGatewayMethodNames,
				hostServices: pluginHostServices,
				startupPluginIds,
				pluginLookUpTable,
				startupTrace,
				ambientEnvTriggers
			});
		},
		onStartupPluginsLoading: () => {
			startupState.pendingReason = "startup-sidecars";
		},
		onStartupPluginsLoaded: async (loaded) => {
			replaceAttachedPluginRuntime(loaded);
			startupState.pendingReason = "startup-sidecars";
			await refreshAttachedGatewayDiscovery(loaded.pluginRegistry);
		},
		getCronService: () => runtimeState?.cronState.cron,
		onChannelsStarted: () => {
			releaseStartupAccountStarts();
		},
		onPluginServices: (pluginServices) => {
			runtimeState.pluginServices = pluginServices;
		},
		onPostReadySidecars: (postReadySidecars) => {
			runtimeState.postReadySidecars = postReadySidecars;
			stopPostReadySidecarsAfterCloseStarted({
				postReadySidecars,
				closeStarted: lifecycle.closePreludeStarted
			});
			if (lifecycle.closePreludeStarted) runtimeState.postReadySidecars = [];
		},
		onGatewayLifetimeSidecars: (gatewayLifetimeSidecars) => {
			const lifetimeSidecars = [sessionChangeSidecar, ...gatewayLifetimeSidecars];
			runtimeState.gatewayLifetimeSidecars = lifetimeSidecars;
			stopPostReadySidecarsAfterCloseStarted({
				postReadySidecars: lifetimeSidecars,
				closeStarted: lifecycle.closePreludeStarted
			});
			if (lifecycle.closePreludeStarted) runtimeState.gatewayLifetimeSidecars = [];
		},
		...workerPlacementRuntime ? { startWorkerEnvironmentRuntime: async () => {
			if (lifecycle.closePreludeStarted) return null;
			return await workerPlacementRuntime.startRuntime({
				isClosePreludeStarted: () => lifecycle.closePreludeStarted,
				registerSidecar: (sidecar) => {
					runtimeState.gatewayLifetimeSidecars.push(sidecar);
				}
			});
		} } : {},
		onSidecarsReady: () => {
			startupState.sidecarsReady = true;
			activateScheduledServicesWhenReady();
		},
		isClosing: () => lifecycle.closePreludeStarted,
		startupTrace,
		sidecarStartup,
		waitForPostReadyWork: params.waitForPostReadyWork,
		providerAuthPrewarm: { getConfig: getRuntimeConfig }
	}))));
	startupTrace.detail("memory.ready", collectGatewayProcessMemoryUsageMb());
	startupTrace.mark("ready");
	if (sidecarStartup === "defer") log.info("gateway ready");
	finishGatewayRestartTrace("restart.ready", collectGatewayProcessMemoryUsageMb());
	if (!minimalTestGateway) {
		const { startOpenClawDatabaseIntegrityVerifier } = await import("./openclaw-database-verify-DsMDWOPj.js");
		runtimeState.gatewayLifetimeSidecars.push(startOpenClawDatabaseIntegrityVerifier({ env: process.env }));
	}
	postAttachRuntimeReturned = true;
	activateScheduledServicesWhenReady();
	const { startManagedGatewayConfigReloader } = await import("./server-reload-handlers-B7bYfJna.js");
	runtimeState.configReloader = startManagedGatewayConfigReloader({
		minimalTestGateway,
		initialConfig: cfgAtStart,
		initialCompareConfig: startupLastGoodSnapshot.sourceConfig,
		initialSnapshotRawHash: startupLastGoodSnapshot.exists ? startupLastGoodSnapshot.hash ?? null : null,
		initialAuthoredConfig: startupLastGoodSnapshot.parsed,
		initialIncludedPaths: startupLastGoodSnapshot.includedPaths ?? [],
		initialSnapshotValid: startupLastGoodSnapshot.valid,
		initialSnapshotIssues: startupLastGoodSnapshot.issues,
		initialInternalWriteHash: startupInternalWriteHash,
		watchPath: configSnapshot.path,
		readSnapshot: readConfigFileSnapshotForRuntimeTransaction,
		promoteSnapshot: promoteConfigSnapshotToLastKnownGood,
		subscribeToWrites: (listener) => registerConfigWriteListener(listener, {
			ownsRuntimeActivationFor: configSnapshot.path,
			preCommitRuntimePreflight: async (sourceConfig, runtimeRefresh) => {
				const candidate = prepareReloadCandidate({
					runtimeConfig: sourceConfig,
					sourceConfig
				});
				await activateRuntimeSecrets(candidate.runtimeConfig, {
					reason: "reload",
					activate: false,
					env: candidate.runtimeEnv.env,
					includeAuthStoreRefs: runtimeRefresh?.includeAuthStoreRefs
				});
				return candidate;
			}
		}),
		deps,
		broadcast,
		getState: () => ({
			hooksConfig: runtimeState.hooksConfig,
			hookClientIpConfig: runtimeState.hookClientIpConfig,
			heartbeatRunner: runtimeState.heartbeatRunner,
			cronState: runtimeState.cronState,
			channelHealthMonitor: runtimeState.channelHealthMonitor
		}),
		setState: (nextState) => {
			const cronStateChanged = nextState.cronState !== runtimeState.cronState;
			runtimeState.hooksConfig = nextState.hooksConfig;
			runtimeState.hookClientIpConfig = nextState.hookClientIpConfig;
			runtimeState.heartbeatRunner = nextState.heartbeatRunner;
			runtimeState.cronState = nextState.cronState;
			deps.cron = runtimeState.cronState.cron;
			runtimeState.channelHealthMonitor = nextState.channelHealthMonitor;
			if (cronStateChanged) cronStartState.handled = true;
		},
		startChannel,
		stopChannel,
		getChannelAutostartSuppression: channelManager.getAutostartSuppression,
		stopPostReadySidecars: stopRegisteredPostReadySidecars,
		reloadPlugins: reloadAttachedGatewayPlugins,
		logHooks,
		logChannels,
		logCron,
		logReload,
		cronReconciliation,
		onCronRestart: () => {
			cronStartState.handled = true;
		},
		prepareTerminalConfig: (plan, nextConfig) => {
			terminalLaunchPolicy.prepareConfig(nextConfig, { restartPending: plan.restartGateway });
		},
		reconcileTerminalSessions: () => {
			terminalSessions.closeDisallowedAgents((agentId) => terminalLaunchPolicy.resolve(agentId).ok);
		},
		commitTerminalConfig: (nextConfig) => {
			terminalLaunchPolicy.commitConfig();
			workerLiveEvents?.rebindAll(nextConfig);
		},
		acceptTerminalConfig: terminalLaunchPolicy.acceptConfig,
		channelManager,
		activateRuntimeSecrets,
		prepareConfigCandidate: prepareReloadCandidate,
		applyRuntimeConfigOverrides: applyFixedGatewayOverlays,
		resolveSharedGatewaySessionGenerationForConfig,
		sharedGatewaySessionGenerationState,
		clients,
		...opts.hotReloadRecovery ? { requestRecoveryRestart: opts.hotReloadRecovery } : {},
		restartRecoveryAvailable: opts.hotReloadRecovery !== void 0
	});
	await promoteConfigSnapshotToLastKnownGood(startupLastGoodSnapshot).catch((err) => {
		log.warn(`gateway: failed to promote config last-known-good backup: ${String(err)}`);
	});
	if (!minimalTestGateway) {
		const gatewayRuntimeServices = await loadScheduledServicesModule();
		postReadyState.maintenanceTimer = gatewayRuntimeServices.scheduleGatewayPostReadyMaintenance({
			delayMs: POST_READY_MAINTENANCE_DELAY_MS,
			isClosing: () => lifecycle.closePreludeStarted,
			onStarted: () => {
				postReadyState.maintenanceTimer = null;
			},
			startMaintenance: async () => {
				if (lifecycle.closePreludeStarted) return null;
				return earlyRuntime.startMaintenance();
			},
			applyMaintenance: (maintenance) => {
				if (lifecycle.closePreludeStarted) {
					clearInterval(maintenance.tickInterval);
					clearInterval(maintenance.healthInterval);
					clearInterval(maintenance.dedupeCleanup);
					if (maintenance.mediaCleanup) clearInterval(maintenance.mediaCleanup);
					clearInterval(maintenance.worktreeCleanup);
					maintenance.skillCuratorCleanup();
					return;
				}
				runtimeState.tickInterval = maintenance.tickInterval;
				runtimeState.healthInterval = maintenance.healthInterval;
				runtimeState.dedupeCleanup = maintenance.dedupeCleanup;
				runtimeState.mediaCleanup = maintenance.mediaCleanup;
				runtimeState.worktreeCleanup = maintenance.worktreeCleanup;
				runtimeState.skillCuratorCleanup = maintenance.skillCuratorCleanup;
			},
			shouldStartCron: () => !lifecycle.closePreludeStarted && !cronStartState.handled,
			markCronStartHandled: () => {
				cronStartState.handled = true;
			},
			cronState: runtimeState.cronState,
			cronReconciliation,
			cronConfig: cfgAtStart,
			logCron,
			log,
			recordPostReadyMemory: () => {
				startupTrace.detail("memory.post-ready", collectGatewayProcessMemoryUsageMb());
			}
		});
		postReadyState.retainedPluginCleanupHandle = gatewayRuntimeServices.scheduleGatewayIdleTask({
			delayMs: RETAINED_PLUGIN_CLEANUP_DELAY_MS,
			retryDelayMs: RETAINED_PLUGIN_CLEANUP_DELAY_MS,
			isClosing: () => lifecycle.closePreludeStarted,
			isBusy: () => getActiveGatewayRootWorkCount({ excludeCurrent: true }) > 0,
			run: async () => {
				const { cleanupRetainedPluginInstallGenerations } = await import("./server-retained-plugin-cleanup-xVrp4NLO.js");
				await cleanupRetainedPluginInstallGenerations({ log });
			},
			log,
			errorMessage: "retained npm generation cleanup failed"
		});
	} else startupTrace.detail("memory.post-ready", collectGatewayProcessMemoryUsageMb());
}
//#endregion
//#region src/gateway/server-start.ts
const loadGatewayModelCatalogModule = createLazyRuntimeModule(() => import("./server-model-catalog-CrlxzFgf.js"));
const loadWorkerEnvironmentStartupModule = createLazyRuntimeModule(() => import("./server-worker-environment-startup-B_86xiuy.js"));
const loadWorkerPlacementStartupModule = createLazyRuntimeModule(() => import("./server-worker-placement-startup-3jMyX5be.js"));
async function resetPreparedModelCatalogForTest() {
	const { resetPreparedModelCatalogForTest: resetPreparedModelCatalogForTestLocal } = await loadGatewayModelCatalogModule();
	await resetPreparedModelCatalogForTestLocal();
}
ensureOpenClawCliOnPath();
const loadGatewayStartupEarlyModule = createLazyRuntimeModule(() => import("./server-startup-early-DE-LqEKd.js"));
const loadGatewayStartupPostAttachModule = createLazyRuntimeModule(() => import("./server-startup-post-attach-D3Gg6SQn.js"));
const log = createSubsystemLogger("gateway");
const logDiscovery = log.child("discovery");
const logTailscale = log.child("tailscale");
const logChannels = log.child("channels");
const getChannelRuntime = createLazyRuntimeModule(() => import("./runtime-channel-DSo4d-Q8.js").then(({ createRuntimeChannel }) => createRuntimeChannel()));
async function closeMcpLoopbackServerOnDemand() {
	const { closeMcpLoopbackServer } = await import("./mcp-http-Y0K2Miqa.js");
	await closeMcpLoopbackServer();
}
const loadGatewayCloseModule = createLazyRuntimeModule(() => import("./server-close.runtime.js"));
const loadGatewayModelCatalog = async (...args) => {
	return (await loadGatewayModelCatalogModule()).loadGatewayModelCatalog(...args);
};
const loadGatewayModelCatalogSnapshot = async (...args) => {
	return (await loadGatewayModelCatalogModule()).loadGatewayModelCatalogSnapshot(...args);
};
const readPreparedGatewayModelCatalog = async (...args) => {
	return (await loadGatewayModelCatalogModule()).readPreparedGatewayModelCatalog(...args);
};
const loadGatewayPluginBootstrapModule = createLazyRuntimeModule(() => import("./server-plugin-bootstrap-DLvW3oSl.js"));
const logHealth = log.child("health");
const logCron = log.child("cron");
const logReload = log.child("reload");
const logHooks = log.child("hooks");
const logPlugins = log.child("plugins");
const logWsControl = log.child("ws");
const logSecrets = log.child("secrets");
const gatewayRuntime = runtimeForLogger(log);
const POST_READY_WORK_START_DELAY_MS = 500;
function formatRuntimeGatewayAuthTokenWarning() {
	const base = "Gateway auth token was missing. Generated a runtime token for this startup without changing config; restart will generate a different token.";
	if (!isNixMode) return `${base} Persist one with \`openclaw config set gateway.auth.mode token\` and \`openclaw config set gateway.auth.token <token>\`.`;
	return [
		base,
		"In Nix mode, set gateway.auth.token in your Nix-managed OpenClaw config and rebuild.",
		"For the first-party Nix flow, see https://github.com/openclaw/nix-openclaw#quick-start and https://docs.openclaw.ai/install/nix."
	].join(" ");
}
async function stopTaskRegistryMaintenanceOnDemand() {
	const { stopTaskRegistryMaintenance } = await import("./task-registry.maintenance-BoQDbuA7.js");
	stopTaskRegistryMaintenance();
}
async function startGatewayServer(port = 18789, opts = {}) {
	let releasePostReadyWork = () => {};
	const postReadyWorkBarrier = new Promise((resolve) => {
		releasePostReadyWork = resolve;
	});
	const bootstrap = await prepareGatewayServerBootstrap({
		port,
		opts,
		log,
		logSecrets,
		loadWorkerEnvironmentStartupModule,
		formatRuntimeGatewayAuthTokenWarning
	});
	const lifecycleRuntime = await prepareGatewayLifecycle({
		runtime: await prepareGatewayRuntimeState({
			bootstrap,
			port,
			opts,
			log,
			logChannels,
			logHooks,
			logPlugins,
			gatewayRuntime,
			resolveChannelRuntime: getChannelRuntime,
			loadWorkerEnvironmentStartupModule,
			loadWorkerPlacementStartupModule
		}),
		port,
		log,
		logCron,
		diagnosticsEnabled: bootstrap.diagnosticsEnabled,
		loadGatewayCloseModule,
		closeMcpLoopbackServerOnDemand,
		stopTaskRegistryMaintenanceOnDemand
	});
	const { beginClosePrelude, clearFallbackGatewayContextForServer, closeOnStartupFailure, createCloseHandler, runClosePrelude, stopRegisteredGatewayLifetimeSidecars, stopRegisteredPostReadySidecars, terminalSessions } = lifecycleRuntime;
	try {
		await finishGatewayStartup({
			coreRuntime: await startGatewayCoreRuntime({
				lifecycleRuntime,
				port,
				log,
				logDiscovery,
				logHealth,
				logChannels,
				loadGatewayStartupEarlyModule,
				loadGatewayPluginBootstrapModule,
				loadGatewayModelCatalog,
				loadGatewayModelCatalogSnapshot,
				readPreparedGatewayModelCatalog
			}),
			port,
			opts,
			log,
			logHealth,
			logWsControl,
			logHooks,
			logChannels,
			logCron,
			logReload,
			logTailscale,
			loadGatewayStartupPostAttachModule,
			waitForPostReadyWork: () => postReadyWorkBarrier
		});
	} catch (err) {
		await closeOnStartupFailure();
		throw err;
	}
	setTimeout(releasePostReadyWork, POST_READY_WORK_START_DELAY_MS).unref?.();
	const close = createCloseHandler();
	return { close: async (optsLocal) => {
		try {
			await beginClosePrelude();
			terminalSessions.disposeAll();
			await stopRegisteredGatewayLifetimeSidecars();
			await stopRegisteredPostReadySidecars();
			const { runGlobalGatewayStopSafely } = await import("./plugins/hook-runner-global.js");
			await runGlobalGatewayStopSafely({
				event: { reason: optsLocal?.reason ?? "gateway stopping" },
				ctx: { port },
				onError: (err) => log.warn(`gateway_stop hook failed: ${String(err)}`)
			});
			await runClosePrelude();
			await close(optsLocal);
		} finally {
			clearFallbackGatewayContextForServer.get()();
		}
	} };
}
//#endregion
export { resetPreparedModelCatalogForTest, shouldRetainControlUiDeviceAuthMigrationSession, startGatewayServer };
