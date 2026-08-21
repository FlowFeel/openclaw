import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { c as resolveAgentDir, d as resolveDefaultAgentDir, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { a as isSubagentSessionKey, i as isCronSessionKey } from "./session-key-utils-02xWdGSz.js";
import { E as getActiveDiagnosticTraceContext, S as createDiagnosticTraceContext, T as freezeDiagnosticTraceContext } from "./diagnostic-events-Dt41CZkD.js";
import { N as withPluginRuntimeRegistryScope } from "./runtime-WkCmQTS9.js";
import { v as normalizeOptionalAgentRuntimeId } from "./openai-routing-Db2edxk0.js";
import { r as resolveAgentModelFallbackValues } from "./model-input-BofPWz0k.js";
import { _ as resolveSessionAgentIds, h as resolveRunModelFallbacksOverride } from "./agent-scope-DyEposw2.js";
import { i as generateSecureToken } from "./secure-random-Ds4AFLgz.js";
import { t as getCurrentPluginMetadataSnapshot } from "./current-plugin-metadata-snapshot-LM8oq-yZ.js";
import { n as DEFAULT_MODEL, r as DEFAULT_PROVIDER } from "./defaults-CdX9UGcX.js";
import { i as wrapStreamFnTextTransforms } from "./text-transforms.runtime-DMVbPf9Z.js";
import { t as applyPreparedRuntimeAuthToModel } from "./provider-request-config-C5exA1l5.js";
import { a as unwrapSecretSentinelsForProviderEgress, t as protectPreparedProviderRuntimeAuth } from "./provider-secret-egress-BR0AKHwJ.js";
import { t as getGlobalHookRunner } from "./hook-runner-global-BNa5TLJ4.js";
import { i as normalizeMessageChannel } from "./message-channel-normalize-Cs-kjMZm.js";
import "./message-channel-Bo27VP7K.js";
import { t as formatSqliteSessionFileMarker } from "./legacy-sqlite-marker-COPKCuIN.js";
import { C as acquireOwnedSessionTranscriptWriteLock } from "./session-accessor-D5Or7WgI.js";
import { l as listRegisteredPluginAgentPromptGuidance } from "./command-registration-MGWB6wzh.js";
import { K as resolveChannelReactionGuidance, U as listChannelSupportedActions, W as resolveChannelMessageToolHints } from "./agent-tools.before-tool-call-uaLOAHZ3.js";
import { N as resolveProviderTextTransforms, U as transformProviderSystemPrompt, x as prepareProviderRuntimeAuth } from "./provider-runtime-DlVC1wsY.js";
import { n as extractModelCompat } from "./provider-model-compat-Rmx9B67o.js";
import { _ as estimateTokens } from "./agent-core-3hvRadZX.js";
import { at as getModelRegistryRuntime, o as agentSessionAutomaticCompaction, t as createAgentSession } from "./sessions-CxWGGmnA.js";
import { r as detectRuntimeShell } from "./shell-utils-DzYfAjux.js";
import { o as sanitizeToolUseResultPairing } from "./ai-transport-runtime-host-CchjIxjf.js";
import { t as SessionManager } from "./session-manager-Dn9JwolR.js";
import { t as MissingProviderAuthError } from "./model-auth-runtime-shared-BVzqP6NP.js";
import { r as resolveModelCandidateChain } from "./model-fallback-candidates-04-xfJ0g.js";
import { t as acquireAgentRunPreparedModelRuntime } from "./prepared-model-runtime-Cbe86whM.js";
import { n as applyLocalNoAuthHeaderOverride, o as resolveModelAuthMode, t as applyAuthHeaderOverride } from "./model-auth-yfB4tyNY.js";
import { r as resolveOpenClawReferencePaths } from "./docs-path-CIMgdwYZ.js";
import { t as ensureSelectedAgentHarnessPlugin } from "./runtime-plugin-_-F_9ggx.js";
import { a as describeFailoverError, i as coerceToFailoverError } from "./failover-error-DBKQENP4.js";
import { A as compactWithSafetyTimeout, j as resolveCompactionTimeoutMs } from "./diagnostic-CdMjo2Fb.js";
import { t as pickFallbackThinkingLevel } from "./embedded-agent-helpers-dlCGQLQ2.js";
import { A as flushPendingToolResultsAfterIdle, D as resolveAgentRunSessionTarget, E as applyAgentRunSessionTargetIdentity, J as validateReplayTurns, O as getHistoryLimitFromSessionKey, Q as logRuntimeToolSchemaQuarantine, S as createPreparedEmbeddedAgentSettingsManager, _ as hasMeaningfulConversationContent, b as consumeCompactionSafeguardCancelReason, d as collectRegisteredToolNames, f as toSessionToolAllowlist, g as buildEmbeddedExtensionFactories, h as createEmbeddedAgentResourceLoader, i as prepareAgentMemoryPrompt, k as limitHistoryTurns, m as buildEmbeddedSystemPrompt, p as applySystemPromptToSession, q as sanitizeSessionHistory, r as buildEmbeddedMessageActionDiscoveryInput, u as collectAllowedToolNames, v as isRealConversationMessage, x as setCompactionSafeguardCancelReason } from "./builtin-openclaw-0050ajkS.js";
import { n as createBundleMcpToolRuntime } from "./agent-bundle-mcp-materialize-ajBEG2-c.js";
import "./agent-bundle-mcp-tools-DIqqH-eP.js";
import { r as resolveModelAsync } from "./model-weOUIm_9.js";
import { t as materializePreparedRuntimeModel } from "./materialize-model-DPDoen5v.js";
import { n as resolvePreparedRuntimeModelAuth, t as resolvePreparedRuntimeAuthAttempts } from "./resolve-auth-BgeXSuDa.js";
import { t as resolveConversationCapabilityProfile } from "./conversation-capability-profile-Cyh2r4DT.js";
import { t as createBundleLspToolRuntime } from "./agent-bundle-lsp-runtime-BPll5JCg.js";
import { n as resolveDiagnosticModelContentCapturePolicy } from "./diagnostic-llm-content-BiTOBguG.js";
import { s as resolveSkillsPromptForRun } from "./workspace-D7s0sLcF.js";
import { t as isAcpRuntimeSpawnAvailable } from "./availability-SidB7Nke.js";
import { t as log } from "./logger-PoK3sCV7.js";
import { a as supportsModelTools } from "./openclaw-tools-B_OHwLQN.js";
import { a as resolveBootstrapContextForRun, i as makeBootstrapWarn, s as resolveContextInjectionMode } from "./bootstrap-files-DfTRxNZ7.js";
import { g as resolveEmbeddedCompactionThinkingLevel, h as resolveEmbeddedCompactionTarget, p as resolveCompactionContextTokenBudget, v as resolveHeartbeatPromptForSystemPrompt, y as listActiveProcessSessionReferences } from "./attempt.prompt-helpers-BQhqL2Eu.js";
import { n as resolveProcessToolScopeKey, t as createOpenClawCodingTools } from "./agent-tools-Df1_Fel3.js";
import { i as isFallbackSummaryError } from "./model-fallback-attempt-CwT_ozOy.js";
import { t as registerProviderStreamForModel } from "./provider-stream-CSQQqJCF.js";
import { n as mapThinkingLevelForProvider, t as mapThinkingLevel } from "./utils-CefVZRZM.js";
import { n as filterRuntimeCompatibleTools, t as filterProviderNormalizableTools } from "./tool-schema-projection-ZrMdwk4s.js";
import { t as applyFinalEffectiveToolPolicy } from "./effective-tool-policy-D8dKa8wL.js";
import { t as applyExtraParamsToAgent } from "./extra-params-BniXc1fJ.js";
import { a as resolveEmbeddedAgentStreamFn, i as resolveEmbeddedAgentBaseStreamFn, r as resolveEmbeddedAgentApiKey, t as wrapStreamFnWithDiagnosticModelCallEvents } from "./attempt.model-diagnostic-events-CM1TPKMM.js";
import { t as guardSessionManager } from "./session-tool-result-guard-wrapper-CwsoUCGs.js";
import { i as resolveUserTimezone, t as formatDateStamp } from "./date-time-BhYZ-ADP.js";
import { _ as isSilentOverflowProneModel, g as applyAgentCompactionSettingsFromConfig, h as applyAgentAutoCompactionGuard, v as resolveEffectiveCompactionMode } from "./config-utils-CIfwi7ve.js";
import { n as resolveSystemPromptRepoRoot, o as resolveAgentPromptSurfaceForSessionKey } from "./system-prompt-params-BENSLgZq.js";
import { n as prepareWatchedSessionsPrompt } from "./watched-sessions-prompt-BpQzHAn1.js";
import { r as resolveAttemptSpawnWorkspaceDir } from "./attempt.thread-helpers-wvQtocZt.js";
import { t as isReasoningTagProvider } from "./provider-utils-DQdO9BDc.js";
import { o as prepareEmbeddedSessionActiveProjectKeys } from "./session-prompt-state-6IEK6xZr.js";
import { i as resolveRuntimeOsLabel } from "./os-summary--1-t8Sb6.js";
import { i as resolveSessionWriteLockOptions, n as resolveSessionLockMaxHoldFromTimeout, o as resolveSessionWriteLockTargetKey, t as acquireSessionWriteLock } from "./session-write-lock-CDkoLPi5.js";
import { t as splitSdkTools } from "./tool-split-CxwKOMH6.js";
import { n as resolveSandboxContext } from "./context-BSQua5VL.js";
import "./sandbox-C8V7Nism.js";
import { i as resolveEmbeddedRunSkillEntries, n as mapSandboxSkillUsagePaths, r as resolveSandboxSkillRuntimeInputs, t as mapSandboxSkillEntriesForPrompt } from "./sandbox-skills-CLaOqs2l.js";
import { n as applySkillEnvOverridesFromSnapshot, t as applySkillEnvOverrides } from "./env-overrides-Vj8e0EdA.js";
import { t as getMachineDisplayName } from "./machine-name-CNKruZWW.js";
import { n as collectRuntimeChannelCapabilities } from "./system-prompt-report-BhiWei2a.js";
import { n as getCurrentActiveNodeContext, t as formatActiveNodeContextLabel } from "./active-node-context-_qYwwG99.js";
import { r as resolveEmbeddedSandboxInfoExecPolicy, t as buildEmbeddedSandboxInfo } from "./sandbox-info-CL0qtibX.js";
import { n as classifyCompactionReason, o as resolveCompactionFailureReason, r as formatUnknownCompactionReasonDetail } from "./compact-reasons-BdRFPqua.js";
import { a as buildBeforeCompactionHookMetrics, c as runBeforeCompactionHooks, d as persistCompactionCheckpoint, i as asCompactionHookRunner, l as runPostCompactionSideEffects, n as prepareCompactionHarnessAuth, o as estimateTokensAfterCompaction, r as resolveCompactionRuntimeSelection, s as runAfterCompactionHooks, t as resolveProjectKey, u as compactionCheckpointStore } from "./project-memory-scope-DulfZe6w.js";
import { n as buildAgentRuntimePlan } from "./build-BykyiSkJ.js";
import { t as runWithModelFallback } from "./model-fallback-runner-BUzbOsFW.js";
import fs from "node:fs/promises";
import os from "node:os";
//#region src/agents/embedded-agent-runner/compaction-diagnostics.ts
const hasRealConversationContent = isRealConversationMessage;
function createCompactionDiagId() {
	return `cmp-${Date.now().toString(36)}-${generateSecureToken(4)}`;
}
function resolveCompactionProviderStream(params) {
	return registerProviderStreamForModel({
		model: params.effectiveModel,
		cfg: params.config,
		agentDir: params.agentDir,
		workspaceDir: params.effectiveWorkspace,
		apiRegistry: params.apiRegistry
	});
}
function normalizeObservedTokenCount(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : void 0;
}
function getMessageTextChars(msg) {
	const content = msg.content;
	if (typeof content === "string") return content.length;
	return Array.isArray(content) ? content.reduce((total, block) => {
		const text = block && typeof block === "object" ? block.text : void 0;
		return total + (typeof text === "string" ? text.length : 0);
	}, 0) : 0;
}
function resolveMessageToolLabel(msg) {
	const candidate = msg.toolName ?? msg.name ?? msg.tool;
	return typeof candidate === "string" && candidate.trim().length > 0 ? candidate : void 0;
}
function summarizeCompactionMessages(messages) {
	let historyTextChars = 0;
	let toolResultChars = 0;
	const contributors = [];
	let estTokens = 0;
	let tokenEstimationFailed = false;
	for (const msg of messages) {
		const role = typeof msg.role === "string" ? msg.role : "unknown";
		const chars = getMessageTextChars(msg);
		historyTextChars += chars;
		if (role === "toolResult") toolResultChars += chars;
		contributors.push({
			role,
			chars,
			tool: resolveMessageToolLabel(msg)
		});
		if (!tokenEstimationFailed) try {
			estTokens += estimateTokens(msg);
		} catch {
			tokenEstimationFailed = true;
		}
	}
	return {
		messages: messages.length,
		historyTextChars,
		toolResultChars,
		estTokens: tokenEstimationFailed ? void 0 : estTokens,
		contributors: contributors.toSorted((left, right) => right.chars - left.chars).slice(0, 3)
	};
}
function containsRealConversationMessages(messages) {
	return messages.some((message, index, allMessages) => hasRealConversationContent(message, allMessages, index));
}
//#endregion
//#region src/agents/embedded-agent-runner/compaction-session-agent.ts
async function prepareCompactionSessionAgent(params) {
	const authStorage = params.authStorage && typeof params.authStorage === "object" && "getApiKey" in params.authStorage && typeof params.authStorage.getApiKey === "function" ? params.authStorage : void 0;
	const transportApiKey = authStorage ? await resolveEmbeddedAgentApiKey({
		provider: params.effectiveModel.provider,
		resolvedApiKey: params.resolvedApiKey,
		authStorage
	}) : params.resolvedApiKey;
	params.session.agent.streamFn = resolveEmbeddedAgentStreamFn({
		llmRuntime: params.llmRuntime,
		currentStreamFn: resolveEmbeddedAgentBaseStreamFn({ session: params.session }),
		providerStreamFn: params.providerStreamFn,
		sessionId: params.sessionId,
		signal: params.signal,
		model: params.effectiveModel,
		resolvedApiKey: params.resolvedApiKey,
		transportAuthAvailable: Boolean(transportApiKey?.trim()),
		authProfileId: params.runtimePlan?.auth.forwardedAuthProfileId,
		authStorage: params.authStorage
	});
	const providerTextTransforms = resolveProviderTextTransforms({
		provider: params.provider,
		config: params.config,
		workspaceDir: params.effectiveWorkspace
	});
	if (providerTextTransforms) params.session.agent.streamFn = wrapStreamFnTextTransforms({
		streamFn: params.session.agent.streamFn,
		input: providerTextTransforms.input,
		output: providerTextTransforms.output,
		transformSystemPrompt: false
	});
	const providerThinkingLevel = mapThinkingLevelForProvider(params.thinkLevel);
	const preparedRuntimeExtraParams = params.runtimePlan?.transport.resolveExtraParams({
		thinkingLevel: providerThinkingLevel,
		agentId: params.sessionAgentId,
		workspaceDir: params.effectiveWorkspace,
		model: params.effectiveModel
	});
	return applyExtraParamsToAgent(params.session.agent, params.config, params.provider, params.modelId, void 0, providerThinkingLevel, params.sessionAgentId, params.effectiveWorkspace, params.effectiveModel, params.agentDir, void 0, {
		...preparedRuntimeExtraParams ? { preparedExtraParams: preparedRuntimeExtraParams } : {},
		nativeWebSearchPolicyContext: {
			sessionKey: params.sessionKey,
			webSearchEnabled: false,
			runtimeToolAllowlist: [],
			sandboxToolPolicy: params.sandboxToolPolicy,
			messageProvider: params.messageProvider,
			agentAccountId: params.agentAccountId,
			groupId: params.groupId,
			groupChannel: params.groupChannel,
			groupSpace: params.groupSpace,
			spawnedBy: params.spawnedBy,
			senderId: params.senderId,
			senderName: params.senderName,
			senderUsername: params.senderUsername,
			senderE164: params.senderE164
		}
	});
}
//#endregion
//#region src/agents/embedded-agent-runner/compaction-duplicate-user-messages.ts
/**
* Removes short-window duplicate user turns from compaction summaries.
*/
const DEFAULT_DUPLICATE_USER_MESSAGE_WINDOW_MS = 6e4;
const MIN_DUPLICATE_USER_MESSAGE_CHARS = 24;
function normalizeUserMessageContent(content) {
	if (typeof content === "string") return content.replace(/\s+/g, " ").trim();
	if (!Array.isArray(content)) return;
	const textParts = [];
	for (const block of content) {
		if (!isRecord(block)) return;
		if (block.type === "image") return;
		if (block.type === "text" && typeof block.text === "string") textParts.push(block.text);
	}
	return textParts.join("\n").replace(/\s+/g, " ").trim();
}
function duplicateSignature(message) {
	if (!isRecord(message) || message.role !== "user" || typeof message.timestamp !== "number") return;
	const text = normalizeUserMessageContent(message.content);
	if (!text || text.length < MIN_DUPLICATE_USER_MESSAGE_CHARS) return;
	const metadata = message["__openclaw"];
	const senderId = isRecord(metadata) && typeof metadata.senderId === "string" ? metadata.senderId : "";
	return {
		key: JSON.stringify([senderId, text.normalize("NFC").toLowerCase()]),
		timestamp: message.timestamp
	};
}
/** Drop later duplicate user messages while preserving the first prompt. */
function dedupeDuplicateUserMessagesForCompaction(messages, options = {}) {
	const windowMs = options.windowMs ?? DEFAULT_DUPLICATE_USER_MESSAGE_WINDOW_MS;
	const lastSeenAtByKey = /* @__PURE__ */ new Map();
	let removed = 0;
	const result = [];
	for (const message of messages) {
		const signature = duplicateSignature(message);
		if (!signature) {
			result.push(message);
			continue;
		}
		const lastSeenAt = lastSeenAtByKey.get(signature.key);
		lastSeenAtByKey.set(signature.key, signature.timestamp);
		if (typeof lastSeenAt === "number" && signature.timestamp - lastSeenAt <= windowMs) {
			removed += 1;
			continue;
		}
		result.push(message);
	}
	return removed > 0 ? result : [...messages];
}
//#endregion
//#region src/agents/embedded-agent-runner/compaction-session-execution.ts
async function executePreparedCompactionSession(runtime) {
	const { params, diagId, trigger, attempt, maxAttempts, runId, compactionModelCallTrace, diagnosticCompactionRunId, nextDiagnosticModelCallId, agentDir, provider, modelId, attemptedThinking, fail, authStorage, modelRegistry, apiKeyInfo, hasRuntimeAuthExchange, sandboxSessionKey, sandbox, effectiveWorkspace, effectiveCwd, contextTokenBudget, effectiveModel, runtimePlan, runtimePlanModelContext, runAbortController, effectiveTools, allowedToolNames, buildSystemPromptText, resolvedMessageProvider, sessionAgentId } = runtime;
	let thinkLevel = runtime.thinkLevel;
	let compactionSessionManager = null;
	let checkpointSnapshot = null;
	let checkpointSnapshotRetained = false;
	try {
		const compactionTimeoutMs = resolveCompactionTimeoutMs(params.config);
		const sessionTarget = await resolveAgentRunSessionTarget({
			agentId: sessionAgentId,
			config: params.config,
			sessionFile: params.sessionFile,
			sessionId: params.sessionId,
			sessionKey: params.sessionKey,
			sessionTarget: params.sessionTarget
		});
		const sessionLock = await acquireOwnedSessionTranscriptWriteLock({
			sessionFile: params.sessionFile,
			sessionKey: params.sessionKey,
			sessionTarget
		}) ?? await acquireSessionWriteLock({
			sessionFile: resolveSessionWriteLockTargetKey(sessionTarget),
			targetKind: "session-key",
			...resolveSessionWriteLockOptions(params.config, { maxHoldMsFallback: resolveSessionLockMaxHoldFromTimeout({ timeoutMs: compactionTimeoutMs }) })
		});
		try {
			const transcriptPolicy = runtimePlan.transcript.resolvePolicy(runtimePlanModelContext);
			const sessionManager = guardSessionManager(SessionManager.open(sessionTarget), {
				agentId: sessionAgentId,
				sessionKey: params.sessionKey,
				config: params.config,
				contextWindowTokens: contextTokenBudget,
				allowSyntheticToolResults: transcriptPolicy.allowSyntheticToolResults,
				missingToolResultText: effectiveModel.api === "openai-responses" || effectiveModel.api === "azure-openai-responses" || effectiveModel.api === "openai-chatgpt-responses" ? "aborted" : void 0,
				allowedToolNames
			});
			checkpointSnapshot = await compactionCheckpointStore.captureSnapshot({
				sessionManager,
				sessionFile: params.sessionFile,
				sessionTarget
			});
			compactionSessionManager = sessionManager;
			const settingsManager = createPreparedEmbeddedAgentSettingsManager({
				cwd: effectiveCwd,
				agentDir,
				cfg: params.config,
				pluginMetadataSnapshot: getCurrentPluginMetadataSnapshot({
					config: params.config,
					env: process.env,
					workspaceDir: effectiveWorkspace
				}),
				contextTokenBudget
			});
			const resourceLoader = createEmbeddedAgentResourceLoader({
				cwd: effectiveCwd,
				agentDir,
				settingsManager,
				extensionFactories: buildEmbeddedExtensionFactories({
					cfg: params.config,
					sessionManager,
					provider,
					modelId,
					model: effectiveModel,
					agentId: sessionAgentId,
					sessionId: params.sessionId,
					sessionKey: params.sessionKey ?? sandboxSessionKey,
					runId
				})
			});
			await resourceLoader.reload();
			applyAgentCompactionSettingsFromConfig({
				settingsManager,
				cfg: params.config,
				contextTokenBudget
			});
			applyAgentAutoCompactionGuard({
				settingsManager,
				silentOverflowProneProvider: isSilentOverflowProneModel({
					provider,
					modelId,
					baseUrl: effectiveModel.baseUrl ?? void 0
				})
			});
			const { customTools } = splitSdkTools({
				tools: effectiveTools,
				sandboxEnabled: Boolean(sandbox?.enabled),
				toolHookContext: {
					agentId: sessionAgentId,
					config: params.config,
					cwd: effectiveCwd,
					sessionKey: sandboxSessionKey,
					sessionId: params.sessionId,
					runId: params.runId,
					channelId: params.currentChannelId
				}
			});
			const sessionToolAllowlist = toSessionToolAllowlist(collectRegisteredToolNames(customTools));
			const providerStreamFn = resolveCompactionProviderStream({
				effectiveModel,
				config: params.config,
				agentDir,
				effectiveWorkspace,
				apiRegistry: getModelRegistryRuntime(modelRegistry).apiRegistry
			});
			while (true) {
				attemptedThinking.add(thinkLevel);
				const systemPromptText = buildSystemPromptText(thinkLevel);
				let session;
				try {
					session = (await createAgentSession({
						cwd: effectiveCwd,
						agentDir,
						authStorage,
						modelRegistry,
						model: effectiveModel,
						thinkingLevel: mapThinkingLevel(thinkLevel),
						tools: sessionToolAllowlist,
						customTools,
						sessionManager,
						settingsManager,
						resourceLoader
					})).session;
					session.setActiveToolsByName(sessionToolAllowlist);
					applySystemPromptToSession(session, systemPromptText);
					await prepareCompactionSessionAgent({
						session,
						llmRuntime: getModelRegistryRuntime(modelRegistry).llmRuntime,
						providerStreamFn,
						sessionId: params.sessionId,
						signal: runAbortController.signal,
						effectiveModel,
						resolvedApiKey: hasRuntimeAuthExchange ? void 0 : apiKeyInfo?.apiKey,
						authStorage,
						config: params.config,
						provider,
						modelId,
						thinkLevel,
						sessionAgentId,
						effectiveWorkspace,
						agentDir,
						runtimePlan,
						sessionKey: sandboxSessionKey,
						sandboxToolPolicy: sandbox?.tools,
						messageProvider: resolvedMessageProvider,
						agentAccountId: params.agentAccountId,
						groupId: params.groupId,
						groupChannel: params.groupChannel,
						groupSpace: params.groupSpace,
						spawnedBy: params.spawnedBy,
						senderId: params.senderId,
						senderName: params.senderName,
						senderUsername: params.senderUsername,
						senderE164: params.senderE164
					});
					session.agent.streamFn = wrapStreamFnWithDiagnosticModelCallEvents(session.agent.streamFn, {
						runId: diagnosticCompactionRunId,
						...params.sessionKey && { sessionKey: params.sessionKey },
						sessionId: params.sessionId,
						provider,
						model: modelId,
						api: effectiveModel.api,
						transport: session.agent.transport,
						contextTokenBudget,
						trace: compactionModelCallTrace,
						contentCapture: resolveDiagnosticModelContentCapturePolicy(params.config),
						nextCallId: nextDiagnosticModelCallId
					});
					const dedupedValidated = dedupeDuplicateUserMessagesForCompaction(await validateReplayTurns({
						messages: await sanitizeSessionHistory({
							messages: session.messages,
							modelApi: effectiveModel.api,
							modelId,
							provider,
							allowedToolNames,
							config: params.config,
							workspaceDir: effectiveWorkspace,
							env: process.env,
							model: effectiveModel,
							sessionManager,
							sessionId: params.sessionId,
							policy: transcriptPolicy,
							preserveLatestAssistantThinking: false
						}),
						modelApi: effectiveModel.api,
						modelId,
						provider,
						config: params.config,
						workspaceDir: effectiveWorkspace,
						env: process.env,
						model: effectiveModel,
						sessionId: params.sessionId,
						policy: transcriptPolicy
					}));
					session.agent.state.messages = dedupedValidated;
					const originalMessages = session.messages.slice();
					const truncated = limitHistoryTurns(session.messages, getHistoryLimitFromSessionKey(params.sessionKey, params.config));
					const limited = transcriptPolicy.repairToolUseResultPairing ? sanitizeToolUseResultPairing(truncated, {
						erroredAssistantResultPolicy: "drop",
						...effectiveModel.api === "openai-responses" || effectiveModel.api === "azure-openai-responses" || effectiveModel.api === "openai-chatgpt-responses" ? { missingToolResultText: "aborted" } : {}
					}) : truncated;
					if (limited.length > 0) session.agent.state.messages = limited;
					const hookRunner = asCompactionHookRunner(getGlobalHookRunner());
					const observedTokenCount = normalizeObservedTokenCount(params.currentTokenCount);
					const beforeHookMetrics = buildBeforeCompactionHookMetrics({
						originalMessages,
						currentMessages: session.messages,
						observedTokenCount,
						estimateTokensFn: estimateTokens
					});
					const { hookSessionKey, missingSessionKey } = await runBeforeCompactionHooks({
						hookRunner,
						sessionId: params.sessionId,
						sessionKey: params.sessionKey,
						sessionAgentId,
						workspaceDir: effectiveWorkspace,
						messageProvider: resolvedMessageProvider,
						metrics: beforeHookMetrics,
						onHookMessages: params.onCompactionHookMessages
					});
					const { messageCountOriginal } = beforeHookMetrics;
					const diagEnabled = log.isEnabled("debug");
					const preMetrics = diagEnabled ? summarizeCompactionMessages(session.messages) : void 0;
					if (diagEnabled && preMetrics) {
						log.debug(`[compaction-diag] start runId=${runId} sessionKey=${params.sessionKey ?? params.sessionId} diagId=${diagId} trigger=${trigger} provider=${provider}/${modelId} attempt=${attempt} maxAttempts=${maxAttempts} pre.messages=${preMetrics.messages} pre.historyTextChars=${preMetrics.historyTextChars} pre.toolResultChars=${preMetrics.toolResultChars} pre.estTokens=${preMetrics.estTokens ?? "unknown"}`);
						log.debug(`[compaction-diag] contributors diagId=${diagId} top=${JSON.stringify(preMetrics.contributors)}`);
					}
					if (!containsRealConversationMessages(session.messages)) {
						log.info(`[compaction] skipping — no real conversation messages (sessionKey=${params.sessionKey ?? params.sessionId})`);
						return {
							ok: true,
							compacted: false,
							reason: "no real conversation messages"
						};
					}
					const compactStartedAt = Date.now();
					const messageCountCompactionInput = messageCountOriginal;
					let limitedTranscriptTokensBefore = 0;
					try {
						limitedTranscriptTokensBefore = limited.reduce((sum, msg) => sum + estimateTokens(msg), 0);
					} catch {}
					const activeSession = session;
					const result = await compactWithSafetyTimeout(() => {
						setCompactionSafeguardCancelReason(compactionSessionManager, void 0);
						return resolveEffectiveCompactionMode(params.config) === "default" && trigger !== "manual" ? activeSession[agentSessionAutomaticCompaction](params.customInstructions) : activeSession.compact(params.customInstructions);
					}, compactionTimeoutMs, {
						abortSignal: params.abortSignal,
						onCancel: () => {
							activeSession.abortCompaction();
						}
					});
					const effectiveFirstKeptEntryId = result.firstKeptEntryId;
					const postCompactionLeafId = typeof sessionManager.getLeafId === "function" ? sessionManager.getLeafId() ?? void 0 : void 0;
					const tokensAfter = estimateTokensAfterCompaction({
						messagesAfter: session.messages,
						observedTokenCount,
						fullSessionTokensBefore: limitedTranscriptTokensBefore,
						estimateTokensFn: estimateTokens
					});
					const messageCountAfter = session.messages.length;
					const compactedCount = Math.max(0, messageCountCompactionInput - messageCountAfter);
					const activeSessionId = params.sessionId;
					const activeSessionFile = formatSqliteSessionFileMarker({
						...sessionTarget,
						sessionId: activeSessionId
					});
					const activePostLeafId = postCompactionLeafId;
					await runPostCompactionSideEffects({
						config: params.config,
						sessionKey: params.sessionKey,
						sessionId: activeSessionId,
						agentId: sessionAgentId,
						sessionFile: activeSessionFile
					});
					checkpointSnapshotRetained = await persistCompactionCheckpoint({
						config: params.config,
						sessionKey: params.sessionKey,
						sessionId: activeSessionId,
						trigger: params.trigger,
						snapshot: checkpointSnapshot,
						summary: result.summary,
						firstKeptEntryId: effectiveFirstKeptEntryId,
						tokensBefore: observedTokenCount ?? result.tokensBefore,
						tokensAfter,
						sessionFile: activeSessionFile,
						leafId: activePostLeafId,
						createdAt: compactStartedAt
					});
					const postMetrics = diagEnabled ? summarizeCompactionMessages(session.messages) : void 0;
					if (diagEnabled && preMetrics && postMetrics) log.debug(`[compaction-diag] end runId=${runId} sessionKey=${params.sessionKey ?? params.sessionId} diagId=${diagId} trigger=${trigger} provider=${provider}/${modelId} attempt=${attempt} maxAttempts=${maxAttempts} outcome=compacted reason=none durationMs=${Date.now() - compactStartedAt} retrying=false post.messages=${postMetrics.messages} post.historyTextChars=${postMetrics.historyTextChars} post.toolResultChars=${postMetrics.toolResultChars} post.estTokens=${postMetrics.estTokens ?? "unknown"} delta.messages=${postMetrics.messages - preMetrics.messages} delta.historyTextChars=${postMetrics.historyTextChars - preMetrics.historyTextChars} delta.toolResultChars=${postMetrics.toolResultChars - preMetrics.toolResultChars} delta.estTokens=${typeof preMetrics.estTokens === "number" && typeof postMetrics.estTokens === "number" ? postMetrics.estTokens - preMetrics.estTokens : "unknown"}`);
					await runAfterCompactionHooks({
						hookRunner,
						sessionId: activeSessionId,
						sessionAgentId,
						hookSessionKey,
						missingSessionKey,
						workspaceDir: effectiveWorkspace,
						messageProvider: resolvedMessageProvider,
						messageCountAfter,
						tokensAfter,
						compactedCount,
						sessionFile: activeSessionFile,
						...activeSessionId !== params.sessionId ? { previousSessionId: params.sessionId } : {},
						summaryLength: typeof result.summary === "string" ? result.summary.length : void 0,
						tokensBefore: result.tokensBefore,
						firstKeptEntryId: effectiveFirstKeptEntryId,
						onHookMessages: params.onCompactionHookMessages
					});
					return {
						ok: true,
						compacted: true,
						result: {
							summary: result.summary,
							firstKeptEntryId: effectiveFirstKeptEntryId,
							tokensBefore: observedTokenCount ?? result.tokensBefore,
							tokensAfter,
							details: result.details,
							sessionId: void 0,
							sessionFile: void 0
						}
					};
				} catch (err) {
					const fallbackThinking = pickFallbackThinkingLevel({
						message: formatErrorMessage(err),
						attempted: attemptedThinking
					});
					if (fallbackThinking) {
						log.warn(`[compaction] request rejected for ${provider}/${modelId}; retrying with ${fallbackThinking}`);
						thinkLevel = fallbackThinking;
						continue;
					}
					throw err;
				} finally {
					try {
						await flushPendingToolResultsAfterIdle({
							agent: session?.agent,
							sessionManager
						});
					} catch {}
					try {
						session?.dispose();
					} catch {}
				}
			}
		} finally {
			await runtime.disposeToolRuntimes();
			await sessionLock.release();
		}
	} catch (err) {
		return fail(resolveCompactionFailureReason({
			reason: formatErrorMessage(err),
			safeguardCancelReason: consumeCompactionSafeguardCancelReason(compactionSessionManager)
		}), err);
	} finally {
		if (!checkpointSnapshotRetained) await compactionCheckpointStore.cleanupSnapshot(checkpointSnapshot);
	}
}
//#endregion
//#region src/agents/embedded-agent-runner/direct-compaction-preparation.ts
/**
* Prepares one direct embedded-agent compaction attempt through model, auth,
* workspace, and sandbox resolution.
*/
async function prepareDirectCompactionAttempt(params) {
	const startedAt = Date.now();
	const diagId = params.diagId?.trim() || createCompactionDiagId();
	const trigger = params.trigger ?? "manual";
	const attempt = params.attempt ?? 1;
	const maxAttempts = params.maxAttempts ?? 1;
	const runId = params.runId ?? params.sessionId;
	const compactionModelCallTrace = freezeDiagnosticTraceContext(getActiveDiagnosticTraceContext() ?? createDiagnosticTraceContext());
	const diagnosticCompactionRunId = `${runId}:compaction:${diagId}`;
	let diagnosticModelCallSeq = 0;
	const resolvedWorkspace = resolveUserPath(params.workspaceDir);
	const earlyAgentIds = resolveSessionAgentIds({
		sessionKey: params.sessionKey,
		config: params.config,
		agentId: params.agentId
	});
	const agentDir = params.agentDir ?? resolveAgentDir(params.config ?? {}, earlyAgentIds.sessionAgentId);
	const { runtimePolicySessionKey, runtimePolicyAgentId, boundHarnessRuntime, selectedHarnessRuntimeOverride, runtimeModelAuth: { plan: reusableRuntimeAuthPlan, authProfileId, modelAuth: initialModelAuth }, provider, runtimeProvider, contextConfigProvider, modelId } = resolveCompactionRuntimeSelection({
		...params,
		modelId: params.model,
		boundHarnessRuntime: params.agentHarnessId,
		preparedRuntimePlan: params.runtimePlan
	});
	await ensureSelectedAgentHarnessPlugin({
		config: params.config,
		provider,
		modelId,
		agentId: runtimePolicyAgentId,
		sessionKey: runtimePolicySessionKey,
		agentHarnessId: boundHarnessRuntime,
		agentHarnessRuntimeOverride: selectedHarnessRuntimeOverride,
		workspaceDir: resolvedWorkspace,
		pluginRegistry: params.preparedModelRuntime.pluginRegistry
	});
	const attemptedThinking = /* @__PURE__ */ new Set();
	const fail = (reason, err) => {
		const failureReason = classifyCompactionReason(reason);
		const failure = err ? describeFailoverError(err) : void 0;
		const detail = failureReason === "unknown" ? formatUnknownCompactionReasonDetail(reason) : void 0;
		const detailSuffix = detail ? ` detail=${detail}` : "";
		log.warn(`[compaction-diag] end runId=${runId} sessionKey=${params.sessionKey ?? params.sessionId} diagId=${diagId} trigger=${trigger} provider=${provider}/${modelId} attempt=${attempt} maxAttempts=${maxAttempts} outcome=failed reason=${failureReason}${detailSuffix} durationMs=${Date.now() - startedAt}`);
		return {
			ok: false,
			compacted: false,
			reason,
			failure: failure ? {
				reason: failure.reason,
				status: failure.status,
				code: failure.code,
				rawError: failure.rawError ?? failure.message
			} : void 0
		};
	};
	const preparedModelRuntime = params.preparedModelRuntime;
	const modelResolutionOptions = {
		...preparedModelRuntime.createStores(),
		preparedModelRuntime,
		workspaceDir: resolvedWorkspace
	};
	const { model, error, authStorage, modelRegistry } = await resolveModelAsync(runtimeProvider, modelId, agentDir, params.config, {
		...initialModelAuth,
		...modelResolutionOptions
	});
	if (!model) return {
		ok: false,
		result: fail(error ?? `Unknown model: ${runtimeProvider}/${modelId}`)
	};
	const { runtimeAuthProfileStore, runtimeAuthPreparation, selectedPreparedHarness, providerUsesProfileScopedModelMetadata } = await prepareCompactionHarnessAuth({
		...params,
		provider,
		metadataProvider: runtimeProvider,
		modelId,
		model,
		reusableRuntimeAuthPlan,
		agentDir,
		workspaceDir: resolvedWorkspace,
		authProfileId,
		runtimePolicyAgentId,
		runtimePolicySessionKey,
		agentHarnessId: boundHarnessRuntime,
		agentHarnessRuntimeOverride: selectedHarnessRuntimeOverride
	});
	const preparedHarnessRuntime = selectedPreparedHarness.id;
	const resolvePreparedModel = ({ config, authProfileId: profileId, authProfileMode: resolvedAuthProfileMode }) => resolveModelAsync(runtimeProvider, modelId, agentDir, config, {
		...modelResolutionOptions,
		skipAgentDiscovery: true,
		allowBundledStaticCatalogFallback: true,
		preferBundledStaticCatalogTransport: true,
		authProfileId: profileId,
		authProfileMode: resolvedAuthProfileMode
	});
	const materializeAuthAttemptModel = async (materializeParams) => await materializePreparedRuntimeModel({
		plan: materializeParams.plan,
		provider,
		modelId,
		config: params.config,
		model: materializeParams.model,
		forceResolve: materializeParams.forceResolve,
		resolveModel: resolvePreparedModel
	}) ?? materializeParams.model;
	const resolveRuntimeAuthAttempt = () => resolvePreparedRuntimeAuthAttempts({
		attempts: runtimeAuthPreparation.attempts,
		store: runtimeAuthProfileStore,
		modelId,
		model,
		materializeModel: materializeAuthAttemptModel,
		forceCredentialScopedDirectModelResolve: providerUsesProfileScopedModelMetadata,
		resolveAuth: async ({ attempt: preparedAttempt, model: attemptModel }) => await resolvePreparedRuntimeModelAuth({
			plan: preparedAttempt.plan,
			model: attemptModel,
			cfg: params.config,
			store: runtimeAuthProfileStore,
			agentDir,
			workspaceDir: resolvedWorkspace,
			...preparedAttempt.allowAuthProfileFallback !== void 0 ? { allowAuthProfileFallback: preparedAttempt.allowAuthProfileFallback } : {},
			secretSentinels: true
		}),
		errorMessage: `Prepared compaction auth attempts could not be resolved for ${provider}/${modelId}.`
	});
	let resolvedAuthAttempt;
	try {
		resolvedAuthAttempt = await resolveRuntimeAuthAttempt();
	} catch (err) {
		return {
			ok: false,
			result: fail(formatErrorMessage(err), err)
		};
	}
	let runtimeModel = resolvedAuthAttempt.model;
	const apiKeyInfo = resolvedAuthAttempt.auth;
	const resolvedRuntimeAuthPlan = resolvedAuthAttempt.plan;
	let hasRuntimeAuthExchange = false;
	try {
		if (!apiKeyInfo.apiKey) {
			if (apiKeyInfo.mode !== "aws-sdk") throw new MissingProviderAuthError(runtimeModel.provider, apiKeyInfo);
		} else {
			const preparedAuth = protectPreparedProviderRuntimeAuth({
				provider: runtimeModel.provider,
				preparedAuth: await prepareProviderRuntimeAuth({
					provider: runtimeModel.provider,
					config: params.config,
					workspaceDir: resolvedWorkspace,
					env: process.env,
					context: {
						config: params.config,
						agentDir,
						workspaceDir: resolvedWorkspace,
						env: process.env,
						provider: runtimeModel.provider,
						modelId,
						model: runtimeModel,
						apiKey: unwrapSecretSentinelsForProviderEgress(apiKeyInfo.apiKey, "provider runtime auth exchange"),
						authMode: apiKeyInfo.mode,
						profileId: apiKeyInfo.profileId
					}
				})
			});
			runtimeModel = applyPreparedRuntimeAuthToModel(runtimeModel, preparedAuth);
			const runtimeApiKey = preparedAuth?.apiKey ?? apiKeyInfo.apiKey;
			hasRuntimeAuthExchange = Boolean(preparedAuth?.apiKey);
			if (!runtimeApiKey) throw new Error(`Provider "${runtimeModel.provider}" runtime auth returned no apiKey.`);
			authStorage.setRuntimeApiKey(runtimeModel.provider, runtimeApiKey);
		}
	} catch (err) {
		return {
			ok: false,
			result: fail(formatErrorMessage(err), err)
		};
	}
	const runtimeCompat = runtimeModel.compat && typeof runtimeModel.compat === "object" ? runtimeModel.compat : void 0;
	const thinkingFormat = typeof runtimeCompat?.thinkingFormat === "string" ? runtimeCompat.thinkingFormat : void 0;
	const supportedReasoningEfforts = runtimeCompat?.supportedReasoningEfforts === null || Array.isArray(runtimeCompat?.supportedReasoningEfforts) && runtimeCompat.supportedReasoningEfforts.every((effort) => typeof effort === "string") ? runtimeCompat.supportedReasoningEfforts : void 0;
	const thinkingCompat = thinkingFormat !== void 0 || supportedReasoningEfforts !== void 0 ? {
		thinkingFormat,
		supportedReasoningEfforts
	} : void 0;
	const thinkingCatalogEntry = {
		provider: runtimeModel.provider,
		id: runtimeModel.id,
		api: runtimeModel.api,
		reasoning: runtimeModel.reasoning,
		params: runtimeModel.params,
		...thinkingCompat ? { compat: thinkingCompat } : {}
	};
	const thinkLevel = resolveEmbeddedCompactionThinkingLevel({
		config: params.config,
		provider: runtimeModel.provider,
		modelId: runtimeModel.id,
		inheritedLevel: params.thinkLevel,
		catalog: [thinkingCatalogEntry],
		agentId: runtimePolicyAgentId,
		sessionKey: runtimePolicySessionKey,
		agentRuntime: preparedHarnessRuntime
	});
	await fs.mkdir(resolvedWorkspace, { recursive: true });
	const sandboxSessionKey = params.sandboxSessionKey?.trim() || params.sessionKey?.trim() || params.sessionId;
	const sandbox = await resolveSandboxContext({
		config: params.config,
		execOverrides: params.execOverrides,
		sessionKey: sandboxSessionKey,
		workspaceDir: resolvedWorkspace
	});
	const effectiveWorkspace = sandbox?.enabled ? sandbox.workspaceAccess === "rw" ? resolvedWorkspace : sandbox.workspaceDir : resolvedWorkspace;
	const requestedCwd = params.cwd ? resolveUserPath(params.cwd) : void 0;
	if (sandbox?.enabled && requestedCwd && requestedCwd !== resolvedWorkspace) throw new Error("cwd override is not supported for sandboxed embedded compaction runs; omit cwd or use the agent workspace as cwd");
	const effectiveCwd = sandbox?.enabled ? effectiveWorkspace : requestedCwd ?? effectiveWorkspace;
	await fs.mkdir(effectiveWorkspace, { recursive: true });
	const isSqliteSessionTranscript = true;
	const { sessionAgentId: effectiveSkillAgentId } = earlyAgentIds;
	return {
		ok: true,
		value: {
			params,
			startedAt,
			diagId,
			trigger,
			attempt,
			maxAttempts,
			runId,
			compactionModelCallTrace,
			diagnosticCompactionRunId,
			nextDiagnosticModelCallId: () => `${diagnosticCompactionRunId}:model:${diagnosticModelCallSeq += 1}`,
			earlyAgentIds,
			agentDir,
			provider,
			contextConfigProvider,
			modelId,
			preparedHarnessRuntime,
			thinkLevel,
			attemptedThinking,
			fail,
			authStorage,
			modelRegistry,
			runtimeModel,
			apiKeyInfo,
			resolvedRuntimeAuthPlan,
			hasRuntimeAuthExchange,
			resolvedWorkspace,
			sandboxSessionKey,
			sandbox,
			effectiveWorkspace,
			effectiveCwd,
			isSqliteSessionTranscript,
			effectiveSkillAgentId
		}
	};
}
//#endregion
//#region src/agents/embedded-agent-runner/prepared-compaction-runtime.ts
/**
* Builds the skills, tools, capability profile, and system prompt used by one
* prepared direct compaction attempt.
*/
async function buildPreparedCompactionRuntime(prepared) {
	const { params, runId, agentDir, provider, contextConfigProvider, modelId, preparedHarnessRuntime, thinkLevel, runtimeModel, apiKeyInfo, resolvedRuntimeAuthPlan, hasRuntimeAuthExchange, resolvedWorkspace, sandboxSessionKey, sandbox, effectiveWorkspace, effectiveCwd, effectiveSkillAgentId } = prepared;
	let restoreSkillEnv;
	let bundleMcpRuntime;
	let bundleLspRuntime;
	let toolRuntimesDisposed = false;
	let skillEnvironmentRestored = false;
	const disposeToolRuntimes = async () => {
		if (toolRuntimesDisposed) return;
		toolRuntimesDisposed = true;
		try {
			await bundleMcpRuntime?.dispose();
		} catch {}
		try {
			await bundleLspRuntime?.dispose();
		} catch {}
	};
	const restoreSkillEnvironment = () => {
		if (skillEnvironmentRestored) return;
		skillEnvironmentRestored = true;
		restoreSkillEnv?.();
	};
	const dispose = async () => {
		await disposeToolRuntimes();
		restoreSkillEnvironment();
	};
	try {
		const { skillsEligibility, skillsPromptWorkspaceDir: effectiveSkillsPromptWorkspace, skillsSnapshot: skillsSnapshotForRun, skillsWorkspaceDir: effectiveSkillsWorkspace, workspaceOnly: loadSkillsWorkspaceOnly } = resolveSandboxSkillRuntimeInputs({
			sandbox,
			effectiveWorkspace,
			skillsSnapshot: params.skillsSnapshot
		});
		const { shouldLoadSkillEntries, skillEntries } = resolveEmbeddedRunSkillEntries({
			workspaceDir: effectiveSkillsWorkspace,
			config: params.config,
			agentId: effectiveSkillAgentId,
			eligibility: skillsEligibility,
			skillsSnapshot: skillsSnapshotForRun,
			workspaceOnly: loadSkillsWorkspaceOnly
		});
		restoreSkillEnv = skillsSnapshotForRun ? applySkillEnvOverridesFromSnapshot({
			snapshot: skillsSnapshotForRun,
			config: params.config
		}) : applySkillEnvOverrides({
			skills: skillEntries ?? [],
			config: params.config
		});
		const promptSkillEntries = mapSandboxSkillEntriesForPrompt({
			entries: shouldLoadSkillEntries ? skillEntries : void 0,
			skillsWorkspaceDir: effectiveSkillsWorkspace,
			skillsPromptWorkspaceDir: effectiveSkillsPromptWorkspace
		});
		const skillUsagePaths = mapSandboxSkillUsagePaths({
			paths: sandbox?.skillUsagePaths,
			skillsWorkspaceDir: effectiveSkillsWorkspace,
			skillsPromptWorkspaceDir: effectiveSkillsPromptWorkspace
		});
		const skillsPrompt = resolveSkillsPromptForRun({
			skillsSnapshot: skillsSnapshotForRun,
			entries: promptSkillEntries,
			config: params.config,
			workspaceDir: effectiveSkillsPromptWorkspace,
			agentId: effectiveSkillAgentId,
			eligibility: skillsEligibility
		});
		const sessionLabel = params.sessionKey ?? params.sessionId;
		const resolvedMessageProvider = params.messageChannel ?? params.messageProvider;
		const { contextFiles } = resolveContextInjectionMode(params.config, effectiveSkillAgentId) === "never" ? { contextFiles: [] } : await resolveBootstrapContextForRun({
			workspaceDir: effectiveWorkspace,
			config: params.config,
			sessionKey: params.sessionKey,
			sessionId: params.sessionId,
			agentId: effectiveSkillAgentId,
			warn: makeBootstrapWarn({
				sessionLabel,
				warn: (message) => log.warn(message)
			})
		});
		const runtimeModelWithContext = runtimeModel;
		const contextTokenBudget = resolveCompactionContextTokenBudget({
			config: params.config,
			provider: contextConfigProvider,
			modelId,
			model: runtimeModelWithContext,
			requestedTokenBudget: params.contextTokenBudget,
			fallbackTokenBudget: params.tokenBudget
		});
		const effectiveModel = applyAuthHeaderOverride(applyLocalNoAuthHeaderOverride(contextTokenBudget < (runtimeModelWithContext.contextWindow ?? Infinity) ? {
			...runtimeModelWithContext,
			contextWindow: contextTokenBudget
		} : runtimeModelWithContext, apiKeyInfo), hasRuntimeAuthExchange ? null : apiKeyInfo, params.config);
		const reuseFullRuntimePlan = params.runtimePlan?.auth === resolvedRuntimeAuthPlan;
		const preparedRuntimePlan = (reuseFullRuntimePlan ? params.runtimePlan : void 0) ?? buildAgentRuntimePlan({
			provider,
			modelId,
			model: effectiveModel,
			modelApi: effectiveModel.api,
			harnessId: preparedHarnessRuntime,
			harnessRuntime: preparedHarnessRuntime,
			authProfileMode: resolvedRuntimeAuthPlan.selectedAuthMode,
			sessionAuthProfileId: resolvedRuntimeAuthPlan.forwardedAuthProfileId,
			sessionAuthProfileSource: resolvedRuntimeAuthPlan.forwardedAuthProfileSource,
			sessionAuthProfileCandidateIds: resolvedRuntimeAuthPlan.forwardedAuthProfileCandidateIds,
			modelRoute: resolvedRuntimeAuthPlan.modelRoute,
			config: params.config,
			workspaceDir: effectiveWorkspace,
			agentDir,
			agentId: effectiveSkillAgentId,
			thinkingLevel: mapThinkingLevelForProvider(thinkLevel)
		});
		const runtimePlan = reuseFullRuntimePlan ? preparedRuntimePlan : {
			...preparedRuntimePlan,
			auth: resolvedRuntimeAuthPlan
		};
		const runAbortController = new AbortController();
		const spawnWorkspaceDir = effectiveCwd !== effectiveWorkspace ? resolvedWorkspace : resolveAttemptSpawnWorkspaceDir({
			sandbox,
			resolvedWorkspace
		});
		const runtimeCapabilityProfile = resolveConversationCapabilityProfile({
			config: params.config,
			sessionKey: sandboxSessionKey,
			runSessionKey: params.sessionKey && params.sessionKey !== sandboxSessionKey ? params.sessionKey : void 0,
			sessionId: params.sessionId,
			runId: params.runId,
			agentDir,
			agentAccountId: params.agentAccountId,
			messageProvider: resolvedMessageProvider,
			chatType: params.chatType,
			groupId: params.groupId,
			groupChannel: params.groupChannel,
			groupSpace: params.groupSpace,
			spawnedBy: params.spawnedBy,
			senderId: params.senderId,
			senderName: params.senderName,
			senderUsername: params.senderUsername,
			senderE164: params.senderE164,
			senderIsOwner: params.senderIsOwner,
			modelProvider: effectiveModel.provider,
			modelId,
			modelApi: effectiveModel.api,
			modelContextWindowTokens: contextTokenBudget,
			workspaceDir: effectiveWorkspace,
			cwd: effectiveCwd,
			spawnWorkspaceDir,
			skillsSnapshot: skillsSnapshotForRun,
			sandboxToolPolicy: sandbox?.tools,
			inputProvenance: params.inputProvenance,
			trustedInternalHandoff: params.trustedInternalHandoff
		});
		const toolsEnabled = supportsModelTools(effectiveModel);
		const toolsRaw = toolsEnabled ? createOpenClawCodingTools({
			exec: {
				...params.execOverrides,
				config: params.config,
				elevated: params.bashElevated
			},
			sandbox,
			messageProvider: resolvedMessageProvider,
			clientCaps: params.clientCaps,
			chatType: params.chatType,
			agentAccountId: params.agentAccountId,
			sessionKey: sandboxSessionKey,
			runSessionKey: params.sessionKey && params.sessionKey !== sandboxSessionKey ? params.sessionKey : void 0,
			sessionId: params.sessionId,
			runId: params.runId,
			oneShotCliRun: params.oneShotCliRun,
			groupId: params.groupId,
			groupChannel: params.groupChannel,
			groupSpace: params.groupSpace,
			spawnedBy: params.spawnedBy,
			senderId: params.senderId,
			senderName: params.senderName,
			senderUsername: params.senderUsername,
			senderE164: params.senderE164,
			allowGatewaySubagentBinding: params.allowGatewaySubagentBinding,
			agentDir,
			cwd: effectiveCwd,
			workspaceDir: effectiveWorkspace,
			spawnWorkspaceDir,
			config: params.config,
			webSearchEnabled: params.toolOverrides?.webSearch !== false,
			abortSignal: runAbortController.signal,
			sourceReplyDeliveryMode: params.sourceReplyDeliveryMode,
			modelProvider: effectiveModel.provider,
			modelId,
			modelHasVision: effectiveModel.input?.includes("image") ?? false,
			modelCompat: extractModelCompat(effectiveModel),
			modelApi: effectiveModel.api,
			modelContextWindowTokens: contextTokenBudget,
			skillsSnapshot: skillsSnapshotForRun,
			skillUsagePaths,
			conversationCapabilityProfile: runtimeCapabilityProfile,
			modelAuthMode: resolveModelAuthMode(effectiveModel.provider, params.config, void 0, { workspaceDir: effectiveWorkspace })
		}) : [];
		const runtimePlanModelContext = {
			workspaceDir: effectiveWorkspace,
			modelApi: effectiveModel.api,
			model: effectiveModel
		};
		const normalizableToolProjection = filterProviderNormalizableTools(toolsEnabled ? toolsRaw : []);
		logRuntimeToolSchemaQuarantine({
			diagnostics: normalizableToolProjection.diagnostics,
			tools: toolsEnabled ? toolsRaw : [],
			runId,
			agentId: effectiveSkillAgentId,
			sessionKey: params.sessionKey,
			sessionId: params.sessionId
		});
		const tools = runtimePlan.tools.normalize([...normalizableToolProjection.tools], runtimePlanModelContext);
		bundleMcpRuntime = toolsEnabled ? await createBundleMcpToolRuntime({
			workspaceDir: effectiveWorkspace,
			cfg: params.config,
			reservedToolNames: tools.map((tool) => tool.name)
		}) : void 0;
		bundleLspRuntime = toolsEnabled ? await createBundleLspToolRuntime({
			workspaceDir: effectiveWorkspace,
			cfg: params.config,
			reservedToolNames: [...tools.map((tool) => tool.name), ...bundleMcpRuntime?.tools.map((tool) => tool.name) ?? []]
		}) : void 0;
		const filteredBundledTools = applyFinalEffectiveToolPolicy({
			bundledTools: [...bundleMcpRuntime?.tools ?? [], ...bundleLspRuntime?.tools ?? []],
			config: params.config,
			conversationCapabilityProfile: runtimeCapabilityProfile,
			warn: (message) => log.warn(message)
		});
		const normalizableBundledToolProjection = filterProviderNormalizableTools(filteredBundledTools);
		if (normalizableBundledToolProjection.diagnostics.length > 0) logRuntimeToolSchemaQuarantine({
			diagnostics: normalizableBundledToolProjection.diagnostics,
			tools: filteredBundledTools,
			runId,
			agentId: effectiveSkillAgentId,
			sessionKey: params.sessionKey,
			sessionId: params.sessionId
		});
		const normalizedBundledTools = filteredBundledTools.length > 0 ? runtimePlan.tools.normalize([...normalizableBundledToolProjection.tools], runtimePlanModelContext) : filteredBundledTools;
		const projectedEffectiveTools = [...tools, ...normalizedBundledTools];
		const toolSchemaProjection = filterRuntimeCompatibleTools(projectedEffectiveTools);
		logRuntimeToolSchemaQuarantine({
			diagnostics: toolSchemaProjection.diagnostics,
			tools: projectedEffectiveTools,
			runId,
			agentId: effectiveSkillAgentId,
			sessionKey: params.sessionKey,
			sessionId: params.sessionId
		});
		const effectiveTools = [...toolSchemaProjection.tools];
		const allowedToolNames = collectAllowedToolNames({ tools: effectiveTools });
		runtimePlan.tools.logDiagnostics(effectiveTools, runtimePlanModelContext);
		const machineName = await getMachineDisplayName();
		const runtimeChannel = normalizeMessageChannel(params.messageChannel ?? params.messageProvider);
		const runtimeCapabilities = collectRuntimeChannelCapabilities({
			cfg: params.config,
			channel: runtimeChannel,
			accountId: params.agentAccountId
		});
		const reactionGuidance = runtimeChannel && params.config ? resolveChannelReactionGuidance({
			cfg: params.config,
			channel: runtimeChannel,
			accountId: params.agentAccountId
		}) : void 0;
		const { defaultAgentId, sessionAgentId } = resolveSessionAgentIds({
			sessionKey: params.sessionKey,
			config: params.config,
			agentId: params.agentId
		});
		const channelActions = runtimeChannel ? listChannelSupportedActions(buildEmbeddedMessageActionDiscoveryInput({
			cfg: params.config,
			channel: runtimeChannel,
			currentChannelId: params.currentChannelId,
			currentThreadTs: params.currentThreadTs,
			currentMessageId: params.currentMessageId,
			accountId: params.agentAccountId,
			sessionKey: params.sessionKey,
			sessionId: params.sessionId,
			agentId: sessionAgentId,
			senderId: params.senderId
		})) : void 0;
		const messageToolHints = runtimeChannel ? resolveChannelMessageToolHints({
			cfg: params.config,
			channel: runtimeChannel,
			accountId: params.agentAccountId
		}) : void 0;
		const runtimeInfo = {
			agentId: sessionAgentId,
			sessionKey: params.sessionKey,
			host: machineName,
			os: resolveRuntimeOsLabel(),
			arch: os.arch(),
			node: process.version,
			model: `${provider}/${modelId}`,
			shell: detectRuntimeShell(),
			channel: runtimeChannel,
			chatType: params.chatType,
			capabilities: runtimeCapabilities,
			channelActions,
			activeProcessSessions: listActiveProcessSessionReferences({ scopeKey: resolveProcessToolScopeKey({
				sessionKey: sandboxSessionKey,
				agentId: sessionAgentId
			}) }),
			activeNode: formatActiveNodeContextLabel(getCurrentActiveNodeContext())
		};
		const sandboxInfoExecPolicy = resolveEmbeddedSandboxInfoExecPolicy({
			config: params.config,
			agentId: sessionAgentId,
			sessionKey: params.sessionKey,
			sandboxAvailable: sandbox?.enabled === true,
			execOverrides: params.execOverrides
		});
		const sandboxInfo = buildEmbeddedSandboxInfo(sandbox, params.bashElevated, sandboxInfoExecPolicy);
		const reasoningTagHint = isReasoningTagProvider(provider, {
			config: params.config,
			workspaceDir: effectiveWorkspace,
			env: process.env,
			modelId,
			modelApi: effectiveModel.api,
			model: effectiveModel
		});
		const userTimezone = resolveUserTimezone(params.config?.agents?.defaults?.userTimezone);
		const userDate = formatDateStamp(Date.now(), userTimezone);
		const promptSurface = resolveAgentPromptSurfaceForSessionKey(params.sessionKey);
		const promptMode = isSubagentSessionKey(params.sessionKey) || isCronSessionKey(params.sessionKey) ? "minimal" : "full";
		const nativeCommandGuidanceLines = listRegisteredPluginAgentPromptGuidance({ surface: promptSurface });
		const openClawReferences = await resolveOpenClawReferencePaths({
			workspaceDir: effectiveWorkspace,
			argv1: process.argv[1],
			cwd: effectiveCwd,
			moduleUrl: import.meta.url
		});
		const promptContributionContext = {
			config: params.config,
			agentDir,
			workspaceDir: effectiveWorkspace,
			provider,
			modelId,
			promptMode,
			runtimeChannel,
			runtimeCapabilities,
			agentId: sessionAgentId
		};
		const promptContribution = runtimePlan.prompt.resolveSystemPromptContribution(promptContributionContext);
		const preparedMemoryPrompt = await prepareAgentMemoryPrompt({
			enabled: promptMode === "full",
			toolNames: effectiveTools.map((tool) => tool.name),
			citationsMode: params.config?.memory?.citations,
			agentId: runtimeInfo.agentId,
			agentSessionKey: runtimeInfo.sessionKey,
			sandboxed: sandboxInfo?.enabled === true
		});
		const preparedWatchedSessions = prepareWatchedSessionsPrompt({
			enabled: promptMode === "full",
			config: params.config,
			sessionKey: params.sessionKey,
			sandboxed: sandboxInfo?.enabled === true,
			toolNames: effectiveTools.map((tool) => tool.name),
			capabilityToolNames: allowedToolNames
		});
		const activeProjectKeys = params.preparedModelRuntime?.activeProjectKeys ?? [];
		const buildSystemPromptText = (defaultThinkLevel) => {
			const builtSystemPrompt = buildEmbeddedSystemPrompt({
				config: params.config,
				agentId: sessionAgentId,
				workspaceDir: effectiveWorkspace,
				defaultThinkLevel,
				reasoningLevel: params.reasoningLevel ?? "off",
				extraSystemPrompt: params.extraSystemPrompt,
				ownerNumbers: params.ownerNumbers,
				reasoningTagHint,
				heartbeatPrompt: resolveHeartbeatPromptForSystemPrompt({
					config: params.config,
					agentId: sessionAgentId,
					defaultAgentId
				}),
				skillsPrompt,
				docsPath: openClawReferences.docsPath ?? void 0,
				sourcePath: openClawReferences.sourcePath ?? void 0,
				promptMode,
				promptSurface,
				sourceReplyDeliveryMode: params.sourceReplyDeliveryMode,
				acpEnabled: isAcpRuntimeSpawnAvailable({
					config: params.config,
					sandboxed: sandboxInfo?.enabled === true
				}),
				runtimeInfo,
				reactionGuidance,
				messageToolHints,
				sandboxInfo,
				tools: effectiveTools,
				userTimezone,
				userDate,
				contextFiles,
				activeProjectKeys,
				preparedMemoryPrompt,
				preparedWatchedSessions,
				promptContribution,
				nativeCommandGuidanceLines
			});
			return transformProviderSystemPrompt({
				provider,
				config: params.config,
				workspaceDir: effectiveWorkspace,
				context: {
					config: params.config,
					agentDir,
					workspaceDir: effectiveWorkspace,
					provider,
					modelId,
					promptMode,
					runtimeChannel,
					runtimeCapabilities,
					agentId: sessionAgentId,
					systemPrompt: builtSystemPrompt
				}
			});
		};
		return {
			...prepared,
			contextTokenBudget,
			effectiveModel,
			runtimePlan,
			runtimePlanModelContext,
			runAbortController,
			effectiveTools,
			allowedToolNames,
			buildSystemPromptText,
			resolvedMessageProvider,
			sessionAgentId,
			disposeToolRuntimes,
			restoreSkillEnvironment,
			dispose
		};
	} catch (err) {
		await dispose();
		throw err;
	}
}
//#endregion
//#region src/agents/embedded-agent-runner/direct-compaction.ts
/** Coordinates one direct compaction attempt through explicit lifecycle phases. */
async function compactEmbeddedAgentSessionDirectOnce(params) {
	const preparation = await prepareDirectCompactionAttempt(params);
	if (!preparation.ok) return preparation.result;
	let runtime;
	try {
		runtime = await buildPreparedCompactionRuntime(preparation.value);
		return await executePreparedCompactionSession(runtime);
	} catch (err) {
		const reason = resolveCompactionFailureReason({
			reason: formatErrorMessage(err),
			safeguardCancelReason: void 0
		});
		return preparation.value.fail(reason, err);
	} finally {
		await runtime?.dispose();
	}
}
//#endregion
//#region src/agents/embedded-agent-runner/compact.ts
/**
* Public facade and fallback coordinator for embedded-agent compaction.
*/
function hasExplicitCompactionModel(params) {
	return Boolean(params.config?.agents?.defaults?.compaction?.model?.trim());
}
function resolveCompactionFallbacksOverride(params) {
	if (params.modelSelectionLocked) return [];
	return params.modelFallbacksOverride ?? resolveRunModelFallbacksOverride({
		cfg: params.config,
		sessionKey: params.sessionKey
	});
}
function hasCompactionModelFallbackCandidates(params) {
	const fallbacksOverride = resolveCompactionFallbacksOverride(params);
	const defaultFallbacks = resolveAgentModelFallbackValues(params.config?.agents?.defaults?.model);
	return (fallbacksOverride ?? defaultFallbacks).length > 0;
}
function classifyCompactionFallbackResult(result, provider, model) {
	if (result.ok) return null;
	const reason = result.reason?.trim();
	if (!reason) return null;
	const failoverError = coerceToFailoverError(Object.assign(new Error(result.failure?.rawError ?? reason), {
		status: result.failure?.status,
		code: result.failure?.code
	}), {
		provider,
		model
	});
	return failoverError ? { error: failoverError } : null;
}
function fallbackFailureToCompactionResult(err) {
	return {
		ok: false,
		compacted: false,
		reason: isFallbackSummaryError(err) ? err.message : formatErrorMessage(err)
	};
}
/**
* Core compaction logic without lane queueing.
* Use this when already inside a session/global lane to avoid deadlocks.
*/
async function compactEmbeddedAgentSessionDirect(paramsInput) {
	const paramsBase = applyAgentRunSessionTargetIdentity(paramsInput);
	const lockedHarnessRuntime = normalizeOptionalAgentRuntimeId(paramsBase.agentHarnessId);
	if (paramsBase.modelSelectionLocked === true && lockedHarnessRuntime !== "openclaw") return {
		ok: false,
		compacted: false,
		reason: lockedHarnessRuntime ? `Model selection is locked to native agent harness "${lockedHarnessRuntime}"; generic compaction is unavailable.` : "Model selection is locked but the persisted agent harness is unavailable.",
		failure: { reason: "model_selection_locked" }
	};
	const runSessionTarget = await resolveAgentRunSessionTarget(paramsBase);
	const requestedParams = {
		...paramsBase,
		agentId: runSessionTarget.agentId,
		sessionId: runSessionTarget.sessionId,
		sessionKey: runSessionTarget.sessionKey,
		sessionTarget: runSessionTarget,
		sessionFile: runSessionTarget.sessionKey
	};
	const requestedAgentIds = resolveSessionAgentIds({
		sessionKey: requestedParams.sessionKey,
		config: requestedParams.config,
		agentId: requestedParams.agentId
	});
	const requestedAgentDir = requestedParams.agentDir ?? resolveAgentDir(requestedParams.config ?? {}, requestedAgentIds.sessionAgentId);
	const requestedWorkspaceDir = resolveUserPath(requestedParams.workspaceDir);
	const canonicalWorkspaceDir = resolveUserPath(resolveAgentWorkspaceDir(requestedParams.config ?? {}, requestedAgentIds.sessionAgentId));
	const runtimeSelection = resolveCompactionRuntimeSelection({
		...requestedParams,
		modelId: requestedParams.model,
		boundHarnessRuntime: requestedParams.agentHarnessId,
		preparedRuntimePlan: requestedParams.runtimePlan
	});
	const pluginPlanCompactionTarget = resolveEmbeddedCompactionTarget({
		config: requestedParams.config,
		provider: requestedParams.provider,
		modelId: requestedParams.model,
		authProfileId: requestedParams.authProfileId,
		modelSelectionLocked: requestedParams.modelSelectionLocked,
		defaultProvider: DEFAULT_PROVIDER,
		defaultModel: DEFAULT_MODEL
	});
	const pluginPlanCandidates = resolveModelCandidateChain({
		cfg: requestedParams.config,
		provider: pluginPlanCompactionTarget.provider ?? "openai",
		model: pluginPlanCompactionTarget.model ?? "gpt-5.6-sol",
		requestedRouteResolution: "resolved",
		fallbacksOverride: resolveCompactionFallbacksOverride(requestedParams)
	});
	const runtimePluginSelections = [{
		provider: runtimeSelection.provider,
		modelId: runtimeSelection.modelId,
		...runtimeSelection.selectedHarnessRuntime ? { runtime: runtimeSelection.selectedHarnessRuntime } : {},
		agentId: requestedAgentIds.sessionAgentId
	}, ...pluginPlanCandidates.filter((candidate) => candidate.provider !== runtimeSelection.provider || candidate.model !== runtimeSelection.modelId).map((candidate) => runtimeSelection.boundHarnessRuntime ? {
		provider: candidate.provider,
		modelId: candidate.model,
		runtime: runtimeSelection.boundHarnessRuntime,
		agentId: requestedAgentIds.sessionAgentId
	} : {
		provider: candidate.provider,
		modelId: candidate.model,
		agentId: requestedAgentIds.sessionAgentId
	})];
	const preparedModelRuntimeLease = await acquireAgentRunPreparedModelRuntime({
		config: requestedParams.config ?? {},
		agentId: requestedAgentIds.sessionAgentId,
		agentDir: requestedAgentDir,
		inheritedAuthDir: resolveDefaultAgentDir(requestedParams.config ?? {}),
		workspaceDir: requestedWorkspaceDir,
		preserveWorkspaceDirOnRefresh: requestedWorkspaceDir !== canonicalWorkspaceDir,
		...requestedParams.allowGatewaySubagentBinding ? { allowGatewaySubagentBinding: true } : {},
		runtimePluginSelections
	});
	try {
		const preparedModelRuntimeOwnerSnapshot = preparedModelRuntimeLease.snapshot;
		const preparedWorkspaceDir = preparedModelRuntimeOwnerSnapshot.workspaceDir ?? requestedWorkspaceDir;
		const repoRoot = resolveSystemPromptRepoRoot({
			config: preparedModelRuntimeOwnerSnapshot.config,
			workspaceDir: preparedWorkspaceDir,
			cwd: requestedParams.cwd
		}) ?? null;
		const projectKey = repoRoot ? await resolveProjectKey(repoRoot) : null;
		const activeProjectKeys = prepareEmbeddedSessionActiveProjectKeys(requestedParams.sessionId, projectKey);
		const preparedModelRuntime = Object.freeze({
			...preparedModelRuntimeOwnerSnapshot,
			repoRoot,
			projectKey,
			activeProjectKeys
		});
		const params = {
			...requestedParams,
			config: preparedModelRuntime.config,
			agentId: preparedModelRuntime.agentId ?? requestedAgentIds.sessionAgentId,
			agentDir: preparedModelRuntime.agentDir,
			workspaceDir: preparedWorkspaceDir,
			preparedModelRuntime
		};
		const compactPrepared = async () => {
			if (hasExplicitCompactionModel(params) || !hasCompactionModelFallbackCandidates(params)) return await compactEmbeddedAgentSessionDirectOnce(params);
			const resolvedCompactionTarget = resolveEmbeddedCompactionTarget({
				config: params.config,
				provider: params.provider,
				modelId: params.model,
				authProfileId: params.authProfileId,
				modelSelectionLocked: params.modelSelectionLocked,
				defaultProvider: DEFAULT_PROVIDER,
				defaultModel: DEFAULT_MODEL
			});
			const primaryProvider = resolvedCompactionTarget.provider ?? "openai";
			const primaryModel = resolvedCompactionTarget.model ?? "gpt-5.6-sol";
			const requestedPrimaryProvider = params.provider?.trim() || "openai";
			const fallbacksOverride = resolveCompactionFallbacksOverride(params);
			const resolvedPrimaryCandidate = resolveModelCandidateChain({
				cfg: params.config,
				provider: primaryProvider,
				model: primaryModel,
				requestedRouteResolution: "resolved",
				fallbacksOverride
			})[0];
			const fallbackAgentId = resolveSessionAgentIds({
				sessionKey: params.sandboxSessionKey ?? params.sessionKey,
				config: params.config,
				agentId: params.agentId
			}).sessionAgentId;
			const fallbackSessionKey = params.sandboxSessionKey ?? params.sessionKey ?? params.sessionId;
			return (await runWithModelFallback({
				cfg: params.config,
				provider: primaryProvider,
				model: primaryModel,
				requestedRouteResolution: "resolved",
				runId: params.runId ?? params.sessionId,
				agentDir: params.agentDir,
				agentId: fallbackAgentId,
				sessionId: params.sessionId,
				sessionKey: fallbackSessionKey,
				abortSignal: params.abortSignal,
				prepareAgentHarnessRuntime: async ({ provider, model, agentHarnessRuntimeOverride }) => {
					await ensureSelectedAgentHarnessPlugin({
						config: params.config,
						provider,
						modelId: model,
						agentId: fallbackAgentId,
						sessionKey: fallbackSessionKey,
						agentHarnessRuntimeOverride,
						workspaceDir: params.workspaceDir,
						pluginRegistry: preparedModelRuntime.pluginRegistry
					});
				},
				fallbacksOverride,
				classifyResult: ({ result, provider, model }) => classifyCompactionFallbackResult(result, provider, model),
				run: async (provider, model) => {
					const isPrimaryCandidate = provider === resolvedPrimaryCandidate?.provider && model === resolvedPrimaryCandidate.model;
					const preservesPrimaryAuth = isPrimaryCandidate || provider === primaryProvider || provider === requestedPrimaryProvider;
					const authProfileId = preservesPrimaryAuth ? params.authProfileId : void 0;
					return await compactEmbeddedAgentSessionDirectOnce({
						...params,
						provider,
						model,
						authProfileId,
						authProfileIdSource: preservesPrimaryAuth ? params.authProfileIdSource : void 0,
						runtimeAuthPlan: isPrimaryCandidate ? params.runtimeAuthPlan : void 0,
						runtimePlan: isPrimaryCandidate ? params.runtimePlan : void 0
					});
				}
			})).result;
		};
		return await withPluginRuntimeRegistryScope(preparedModelRuntime.pluginRegistry, compactPrepared);
	} catch (err) {
		return fallbackFailureToCompactionResult(err);
	} finally {
		preparedModelRuntimeLease.release();
	}
}
const testing = {
	hasRealConversationContent,
	hasMeaningfulConversationContent,
	containsRealConversationMessages,
	estimateTokensAfterCompaction,
	buildBeforeCompactionHookMetrics,
	resolveCompactionProviderStream,
	prepareCompactionSessionAgent,
	runBeforeCompactionHooks,
	runAfterCompactionHooks,
	runPostCompactionSideEffects
};
//#endregion
export { compactEmbeddedAgentSessionDirect, testing };
