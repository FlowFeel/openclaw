import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { n as sliceUtf16Safe, r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { j as resolveTimerTimeoutMs, o as asDateTimestampMs, s as asFiniteNumber } from "./number-coercion-Crk_c9KW.js";
import { a as redactSensitiveFieldValue, u as redactToolPayloadText } from "./redact-DUpJZuMu.js";
import { r as root } from "./fs-safe-DVaClkIX.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { c as resolveAgentDir, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { t as isIncognitoSessionKey } from "./incognito-session-key-BwpD1Lwd.js";
import { C as createDiagnosticTraceContextFromActiveScope, T as freezeDiagnosticTraceContext, h as onInternalDiagnosticEvent, o as emitTrustedDiagnosticEvent, s as emitTrustedDiagnosticEventWithPrivateData } from "./diagnostic-events-Dt41CZkD.js";
import { c as isBlockedHostnameOrIp, t as SsrFBlockedError } from "./ssrf-C889LYfv.js";
import { n as MESSAGE_TOOL_DELIVERY_HINTS } from "./message-tool-delivery-hints-8OSBEg_c.js";
import { i as emitAgentEvent } from "./agent-events-COCf-9-O.js";
import { _ as resolveSessionAgentIds } from "./agent-scope-DyEposw2.js";
import { c as resolveContextEngineOwnerPluginId } from "./registry-DxqpqZwd.js";
import { t as FAST_MODE_AUTO_PROGRESS_KIND } from "./reply-payload-BtIUrr9c.js";
import { n as parseSqliteSessionFileMarker } from "./legacy-sqlite-marker-COPKCuIN.js";
import { p as getBeforeToolCallPolicyDiagnosticState } from "./agent-tools.before-tool-call-Cp_0kD4x.js";
import { r as markAuthProfileBlockedUntil } from "./usage-CM9l2_CL.js";
import { f as parseSessionEntries, o as migrateSessionEntries, t as buildSessionContext } from "./session-manager-codec-qDky9Jof.js";
import { u as saveMediaBuffer } from "./store-BDR50q7S.js";
import { h as AgentHarnessPreflightError } from "./failover-error-BSBBvfXF.js";
import { u as resolveAgentRunAbortLifecycleFields } from "./run-termination-nrLSEQ_b.js";
import { c as resolveFastModeForElapsed, n as formatFastModeAutoProgressText } from "./fast-mode-BORk623r.js";
import { r as clearActiveEmbeddedRun, w as setActiveEmbeddedRun } from "./runs-Du_qIW6W.js";
import { r as assertContextEngineHostSupport, t as CODEX_APP_SERVER_CONTEXT_ENGINE_HOST } from "./host-compat-BibWlia2.js";
import { r as prepareMemorySystemPromptAddition } from "./delegate-DToCRvR4.js";
import { a as buildHarnessContextEngineRuntimeContext, c as isActiveHarnessContextEngine, i as bootstrapHarnessContextEngine, l as runHarnessContextEngineMaintenance, n as runAgentEndSideEffects, o as buildHarnessContextEngineRuntimeContextFromUsage, r as assembleHarnessContextEngine, s as finalizeHarnessContextEngineTurn, t as awaitAgentEndSideEffects } from "./agent-end-side-effects-BrmMcpME.js";
import { s as isHostScopedAgentToolActive } from "./local-model-lean-CeG7_aMD.js";
import { t as callGatewayTool } from "./gateway-CRcKH8Wu.js";
import { n as resolveDiagnosticModelContentCapturePolicy } from "./diagnostic-llm-content-BiTOBguG.js";
import { K as loadExecApprovals } from "./exec-approvals-DpQk_nvk.js";
import { t as log } from "./logger-BeJ7WAxI.js";
import { I as formatToolAggregate } from "./streaming-B45j2FQx.js";
import { r as resolveGeneratedMediaMaxBytes } from "./configured-max-bytes-DnjCdIxf.js";
import { B as claimPendingAgentQuestionAnswer, G as emptyAgentHarnessUserInputAnswers, U as buildAgentHarnessUserInputAnswers, V as runAgentHarnessGatewayQuestion, W as deliverAgentHarnessUserInputPrompt, a as supportsModelTools, z as cancelPendingAgentQuestionForSession } from "./openclaw-tools-CoDz4vSH.js";
import { n as buildBootstrapContextForFiles, o as resolveBootstrapFilesForRun } from "./bootstrap-files-BmlEwlGk.js";
import { t as runAgentHarnessAfterToolCallHook } from "./hook-helpers-CF3av4GZ.js";
import { t as projectAgentHarnessTranscriptMessageForDisplay } from "./transcript-visibility-0PUROgcA.js";
import { h as resolveTranscriptSessionKeyBySessionId, r as getSessionEntry } from "./session-store-runtime-dul9f0ER.js";
import { a as runAgentCleanupStep } from "./settled-turn-finalization-result--gesCUtm.js";
import { a as runAgentHarnessLlmInputHook, n as getAgentHarnessHookRunner, o as runAgentHarnessLlmOutputHook } from "./lifecycle-hook-helpers-CVo05dyc.js";
import { n as resolveSandboxContext } from "./context-C139Uthy.js";
import "./number-runtime-C6TGSEc_.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import { s as readSessionTranscriptEvents } from "./session-transcript-runtime-Cvc8VErx.js";
import "./core-Djf8nMCZ.js";
import "./file-access-runtime-CtVtBVxP.js";
import "./exec-approvals-runtime-DYzzWDMM.js";
import "./ssrf-runtime-B8V5-MiN.js";
import "./media-store-tQpeoMw5.js";
import "./media-generation-runtime-L2P3yzs8.js";
import "./agent-runtime-DUspTi2a.js";
import { n as deliverAgentHarnessTaskCompletion, r as isDurableAgentHarnessCompletionDelivery, t as createAgentHarnessTaskRuntime } from "./agent-harness-task-runtime-tUASnRE2.js";
import { c as loadCodexBundleMcpThreadConfig, h as runAgentHarnessBeforeCompactionHook, i as classifyAgentHarnessTerminalOutcome, l as materializeRequesterScopedMcpToolsForHarnessRun, m as runAgentHarnessAfterCompactionHook, n as agentHarnessAttemptTerminal, o as formatToolProgressOutput, p as resolveAgentHarnessBeforePromptBuildResult, r as buildWatchedSessionsHarnessContext, s as inferToolMetaFromArgs, t as TOOL_PROGRESS_OUTPUT_MAX_CHARS, u as prepareHarnessNativeMcpAppPreview } from "./agent-harness-runtime-9ey5acpS.js";
import "./logging-core-BQkJNQAk.js";
import "./diagnostic-runtime-t3-hjps6.js";
import { n as generatedImageAssetFromBase64 } from "./image-generation-CBVzN_gj.js";
import "./text-utility-runtime-D52Cj1WO.js";
import "./agent-sessions-DpeBceLg.js";
import { D as shouldAutoApproveCodexAppServerApprovals, F as resolveCodexPluginsPolicy, I as resolveOpenClawExecPolicyForCodexAppServer, M as isCodexAppServerApprovalPolicyAllowedByRequirements, N as isCodexSandboxExecServerEnabled, O as withMcpElicitationsApprovalPolicy, P as readCodexPluginConfig, _ as scopeCodexRunBindingStore, g as resolveCodexRunSessionBindingAuthority, j as resolveCodexModelBackedReviewerPolicyContext, m as reclaimCurrentCodexSessionGeneration, o as createCodexSessionGenerationSupersededError, v as sessionBindingIdentity, w as resolveCodexComputerUseConfig, x as resolveCodexAppServerHomeScope } from "./session-binding-0S_Sm_to.js";
import { A as resolveCodexAppServerPreparedApiKeyCacheKey, B as resolveCodexTurnAssistantCompletionIdleTimeoutMs, C as readCodexRateLimitsRevision, D as resolveCodexAppServerAuthProfileId, E as resolveCodexAppServerAuthAccountCacheKey, F as CodexAppServerStartupError, G as getCodexAppServerClientInstanceId, H as resolveCodexTurnTerminalIdleTimeoutMs, I as isCodexAppServerStartupError, J as isCodexAppServerConnectionClosedError, K as isCodexAppServerApprovalRequest, N as resolveCodexAppServerHomeDir, O as resolveCodexAppServerAuthProfileIdForAgent, P as CODEX_POST_REASONING_REPLY_IDLE_TIMEOUT_MS, Q as isCodexAppServerRequestTimeoutError, R as resolveCodexPostToolRawAssistantCompletionIdleTimeoutMs, S as retainCodexAppServerLiveThread, T as rememberCodexRateLimitsRead, U as withCodexStartupTimeout, V as resolveCodexTurnCompletionIdleTimeoutMs, W as CodexAppServerRpcError, Y as isCodexAppServerIndeterminateRequestCancellationError, at as isJsonObject, c as getSharedCodexAppServerClient, d as releaseLeasedSharedCodexAppServerClient, et as resolveCodexAppServerClientInstanceId, g as retireSharedCodexAppServerClientIfCurrent, h as retainSharedCodexAppServerClientIfCurrent, i as clearSharedCodexAppServerClientIfCurrentAndUnclaimed, it as flattenCodexDynamicToolFunctions, j as resolveCodexAppServerPreparedAuthHandoff, k as resolveCodexAppServerFallbackApiKeyCacheKey, l as isCodexAppServerStartSelectionChangedError, q as isCodexAppServerBrokenPipeError, r as clearSharedCodexAppServerClientIfCurrent, s as getLeasedSharedCodexAppServerClient, w as readRecentCodexRateLimits, x as ensureCodexAppServerClientRuntime, z as resolveCodexStartupTimeoutMs } from "./shared-client-CnGB-otu.js";
import { A as shouldSynthesizeToolProgressForItem, B as readNullableString$1, C as isSideEffectingNativeToolItem, D as itemTitle, E as itemStatus, F as readItem, H as readString$6, I as readItemString, L as readNonEmptyString$1, M as normalizeNonEmptyString, N as readCodexErrorNotificationMessage, O as shouldClearTerminalPresentationForNativeItem, P as readHookOutputEntries, R as readNonEmptyStringArray, S as isNonSuccessItemStatus, T as itemName, U as splitPlanText, V as readNumber, _ as readCodexNotificationTurnId, a as closeCodexStartupClientBestEffort, d as unsubscribeCodexThreadBestEffort, f as CODEX_APP_SERVER_NATIVE_TURN_WAIT_TIMEOUT_MS, g as readCodexNotificationThreadId, h as isCodexNotificationForTurn, i as CodexAppServerUnsafeSubscriptionError, j as extractRawAssistantText, k as shouldRecordNativeToolTranscript, l as retireCodexAppServerClientAfterTimedOutTurn, m as CodexProjectionDiagnostics, n as CODEX_APP_SERVER_INTERRUPT_TIMEOUT_MS, o as interruptCodexTurnAndWaitBestEffort, p as getCodexAppServerTurnRouter, u as retireUnsafeCodexTurnClientBestEffort, w as itemKind, x as isMutatingNativeToolItem, z as readNonNegativeInteger } from "./thread-resume-CS79vfOk.js";
import { S as updateActiveTurnItemIds, _ as readCodexNotificationItem, a as isCodexTurnAbortMarkerNotification, b as shouldDisarmAssistantCompletionIdleWatch, c as isPendingOpenClawDynamicToolCompletionNotification, d as isRawReasoningCompletionNotification, f as isRawToolOutputCompletionNotification, g as isTerminalTurnStatus, h as isRetryableErrorNotification, i as isAssistantCompletionReleaseNotification, l as isRawAssistantProgressNotification, m as isReasoningProgressNotification, n as describeNotificationActivity, o as isFileChangePatchUpdatedNotification, p as isReasoningItemCompletionNotification, r as isAssistantCommentaryCompletionNotification, s as isNativeToolProgressNotification, t as codexExecutionToolName, u as isRawFunctionToolOutputCompletionNotification, v as readNotificationItemId, x as updateActiveCompletionBlockerItemIds, y as readRawResponseToolCallId } from "./attempt-notifications-DacePFA1.js";
import { r as projectCodexThreadUsageUpdate, t as CodexResponseCompletionProjection } from "./event-projector-usage-DOlsPmVW.js";
import { l as readCodexTurn, o as assertCodexTurnStartResponse, s as readCodexDynamicToolCallParams, u as readCodexTurnCompletedNotification } from "./protocol-validators-Cf6MSlge.js";
import { i as defaultCodexAppInventoryCache, n as buildCodexAppServerRuntimeFingerprint, r as buildCodexPluginAppCacheKey } from "./plugin-app-cache-key-LETu0pbh.js";
import { A as resolveCodexDynamicToolsLoadingForRuntime, D as isSystemAgentOnlyCodexDynamicToolAllowlist, F as isContextEngineBindingCompatible, G as shouldBuildCodexPluginThreadConfig, H as buildCodexPluginThreadConfigInputFingerprint, I as fitCodexProjectedContextForTurnStart, L as projectContextEngineAssemblyForCodex, M as codexDynamicToolsFingerprint, N as codexLegacyDynamicToolsFingerprint, P as buildContextEngineBinding, R as resolveCodexContextEngineProjectionMaxChars, U as buildCodexPluginThreadConfigTimeoutFallback, V as buildCodexPluginThreadConfig, W as mergeCodexThreadConfigs, Y as resolveRecoverableCodexPluginConfigKeys, a as sanitizeCodexHistoryImagePayloads, b as resolveCodexAppServerThreadModelSelection, c as isCodexAppServerProfilerEnabled, g as buildDeveloperInstructions, h as resolveCodexWebSearchPlan, j as areCodexDynamicToolFingerprintsCompatible, n as buildTurnStartParams, r as buildCodexUserInput, s as startOrResumeThread, t as buildTurnCollaborationMode, w as filterCodexDynamicTools, z as resolveCodexContextEngineProjectionReserveTokens } from "./thread-lifecycle-CVkB7aUX.js";
import "./incognito-session-C8lb8Cnn.js";
import { d as attachCodexMirrorIdentity, f as attachUpstreamUserText, i as mirrorPromptAtTurnStartBestEffort, l as readCodexMirrorSourceFingerprint, m as readUpstreamUserText, n as createCodexAppServerUserMessagePersistenceNotifier, o as buildCodexUserPromptMessage, p as readMirrorIdentity, s as promptSnapshot, t as codexTranscriptMirrorRuntime, u as serializeCodexMirrorSourceEvidence } from "./transcript-mirror-B4fqXFpv.js";
import { t as CODEX_CONTROL_METHODS } from "./capabilities-CNmnJnWv.js";
import { a as shouldRefreshCodexRateLimitsForUsageLimitMessage, i as resolveCodexUsageLimitResetAtMs, n as formatCodexUsageLimitErrorMessage } from "./rate-limits-u4j7h7Qb.js";
import { r as formatCodexDisplayText } from "./command-formatters-CPF_ToJS.js";
import { n as resolveCodexAppServerForOpenClawToolPolicy, t as resolveCodexAppServerForModelProvider } from "./app-server-policy-DxUWS3XE.js";
import { n as resolveCodexBindingAppServerConnection } from "./binding-connection-C84pMIpK.js";
import { n as prepareCodexAppServerAuthBinding } from "./auth-binding-7in0zkBs.js";
import { i as resolveCodexLocalRuntimeAttribution, n as createAssistantMessage, r as createAssistantMirrorMessage, t as createAssistantCommentaryMessage } from "./event-projector-assistant-message-VZy0kZ1J.js";
import { A as createCodexNativeHookRelay, B as resolveTerminalDynamicToolBatchAction, D as CODEX_NATIVE_HOOK_RELAY_TTL_GRACE_MS, F as handleDynamicToolCallWithTimeout, G as resolveCodexToolAbortTerminalReason, H as shouldReleaseTurnAfterTerminalDynamicTool, I as hasPendingDynamicToolTerminalDiagnostic, L as isDynamicToolTerminalDiagnosticEvent, M as resolveCodexNativeHookRelayEvents, N as resolveCodexNativeHookRelayTtlMs, O as buildCodexNativeHookRelayConfig, P as scheduleCodexNativeHookRelayUnregister, R as isMatchingDynamicToolTerminalDiagnostic, S as shouldWarnCodexDynamicToolBuildStageSummary, T as CodexNativeToolLifecycleProjector, U as toCodexDynamicToolProgressResponse, V as shouldBlockTerminalReleaseForNonTerminalDynamicToolResult, W as toCodexDynamicToolProtocolResponse, _ as resolveCodexExternalSandboxPolicyForOpenClawSandbox, a as emitDynamicToolStartedDiagnostic, b as shouldEnableCodexAppServerNativeToolSurface, d as buildDynamicTools, f as createCodexDynamicToolBuildStageTracker, g as resolveCodexAppServerHookChannelId, h as resolveCodexAppServerExecutionCwd, i as emitDynamicToolErrorDiagnostic, j as emitCodexNativePreToolUseFailureDiagnostic, k as buildCodexNativeHookRelayDisabledConfig, l as buildCodexHookRequester, m as formatCodexDynamicToolBuildStageSummary, n as handleCodexAppServerApprovalRequest, o as emitDynamicToolTerminalDiagnostic, p as disableCodexPluginThreadConfig, r as handleCodexAppServerElicitationRequest, s as resolveCodexProviderWebSearchSupport, t as createCodexDynamicToolBridge, u as settleCodexSourceReplyFinality, v as resolveCodexMessageToolProvider, w as readBoundedCodexRemoteWorkspaceFile, x as shouldRequireCodexSandboxExecServerEnvironment, y as resolveCodexSandboxEnvironmentSelection, z as resolveDynamicToolCallTimeoutMs } from "./dynamic-tools-D5z0EqiM.js";
import { a as killStaleComputerUseMcpChildren, i as runCodexComputerUseLiveTest, t as ensureCodexComputerUse } from "./computer-use-DnjESMrU.js";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHash, randomUUID } from "node:crypto";
import path, { posix } from "node:path";
import fs from "node:fs/promises";
import { spawn } from "node:child_process";
import { isIP } from "node:net";
import { once } from "node:events";
import { WebSocketServer } from "ws";
//#region extensions/codex/src/app-server/attempt-steering.ts
/**
* Debounced steering queue for forwarding user messages to an active Codex
* app-server turn.
*/
const CODEX_STEER_ALL_DEBOUNCE_MS = 500;
/**
* Creates a queue that batches steer messages while still serializing
* app-server `turn/steer` requests.
*/
function createCodexSteeringQueue(params) {
	let batchedMessages = [];
	const dispatchedBatches = /* @__PURE__ */ new Map();
	const pendingMessages = /* @__PURE__ */ new Set();
	let batchTimer;
	let batchSequence = 0;
	let sendChain = Promise.resolve();
	let closedError;
	const clearBatchTimer = () => {
		if (batchTimer) {
			clearTimeout(batchTimer);
			batchTimer = void 0;
		}
	};
	const resolveItem = (item) => {
		if (item.settled) return;
		item.settled = true;
		pendingMessages.delete(item);
		item.resolve();
	};
	const rejectItem = (item, error) => {
		if (item.settled) return;
		item.settled = true;
		pendingMessages.delete(item);
		item.reject(error);
	};
	const closeQueue = (error) => {
		if (closedError) return;
		closedError = error;
		params.signal.removeEventListener("abort", abortQueue);
		clearBatchTimer();
		batchedMessages = [];
		dispatchedBatches.clear();
		for (const item of pendingMessages) rejectItem(item, error);
	};
	const abortQueue = () => {
		closeQueue(/* @__PURE__ */ new Error("codex app-server steering queue aborted"));
	};
	const cancelQueue = () => {
		closeQueue(/* @__PURE__ */ new Error("codex app-server steering queue cancelled"));
	};
	const sendBatch = async (items) => {
		const liveItems = items.filter((item) => !item.settled);
		if (liveItems.length === 0) return;
		const unavailableError = closedError ?? (params.signal.aborted ? /* @__PURE__ */ new Error("codex app-server steering queue aborted") : void 0);
		if (unavailableError) {
			for (const item of liveItems) rejectItem(item, unavailableError);
			throw unavailableError;
		}
		const clientUserMessageId = `openclaw:${params.turnId}:steer:${++batchSequence}`;
		const batch = { items: liveItems };
		dispatchedBatches.set(clientUserMessageId, batch);
		try {
			await params.client.request("turn/steer", {
				threadId: params.threadId,
				expectedTurnId: params.turnId,
				input: liveItems.flatMap((item) => buildCodexUserInput(item.text, item.images)),
				clientUserMessageId
			}, {
				timeoutMs: params.requestTimeoutMs,
				signal: params.signal
			});
		} catch (error) {
			dispatchedBatches.delete(clientUserMessageId);
			for (const item of liveItems) rejectItem(item, error);
			throw error;
		}
	};
	const enqueueSend = (items) => {
		const send = sendChain.then(() => sendBatch(items));
		sendChain = send;
		send.catch((error) => {
			for (const item of items) rejectItem(item, error);
			log.debug("codex app-server queued steer failed", { error });
		});
		return send;
	};
	const flushBatch = () => {
		clearBatchTimer();
		const items = batchedMessages;
		batchedMessages = [];
		if (items.length === 0) return sendChain;
		const send = enqueueSend(items);
		send.catch(() => void 0);
		return send;
	};
	const createPendingMessage = (text, images) => {
		let resolveDelivery;
		let rejectDelivery;
		const delivery = new Promise((resolve, reject) => {
			resolveDelivery = resolve;
			rejectDelivery = reject;
		});
		const item = {
			text,
			images,
			resolve: resolveDelivery,
			reject: rejectDelivery,
			settled: false
		};
		pendingMessages.add(item);
		return {
			item,
			delivery
		};
	};
	params.signal.addEventListener("abort", abortQueue, { once: true });
	if (params.signal.aborted) abortQueue();
	return {
		async queue(text, options) {
			const pendingUserInput = params.claimPendingUserInput();
			if (pendingUserInput) {
				if (!options?.images?.length) {
					pendingUserInput.answer(text);
					return;
				}
				flushBatch().catch(() => void 0);
				const { item, delivery } = createPendingMessage(text, options.images);
				await Promise.all([enqueueSend([item]).finally(() => pendingUserInput.cancel()), delivery]);
				return;
			}
			if (closedError) throw closedError;
			if (params.signal.aborted) throw new Error("codex app-server steering queue aborted");
			const { item, delivery } = createPendingMessage(text, options?.images);
			batchedMessages.push(item);
			clearBatchTimer();
			const debounceMs = normalizeCodexSteerDebounceMs(options?.debounceMs);
			if (debounceMs === 0) flushBatch();
			else batchTimer = setTimeout(() => {
				batchTimer = void 0;
				flushBatch();
			}, debounceMs);
			return await delivery;
		},
		async flushPending() {
			if (closedError) return;
			await flushBatch().catch(() => void 0);
		},
		confirmConsumed(clientUserMessageId) {
			const batch = dispatchedBatches.get(clientUserMessageId);
			if (!batch) return false;
			dispatchedBatches.delete(clientUserMessageId);
			for (const item of batch.items) resolveItem(item);
			return true;
		},
		cancel: cancelQueue
	};
}
/** Normalizes steer debounce milliseconds, preserving explicit zero. */
function normalizeCodexSteerDebounceMs(value) {
	return typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.floor(value) : CODEX_STEER_ALL_DEBOUNCE_MS;
}
//#endregion
//#region extensions/codex/src/app-server/attempt-terminal.ts
const attemptTerminal = agentHarnessAttemptTerminal;
//#endregion
//#region extensions/codex/src/app-server/event-projector-assistant.ts
var CodexAssistantProjection = class {
	constructor(params, emitAgentEvent, matchesToolProgressEcho, nextTranscriptTimestamp) {
		this.params = params;
		this.emitAgentEvent = emitAgentEvent;
		this.matchesToolProgressEcho = matchesToolProgressEcho;
		this.nextTranscriptTimestamp = nextTranscriptTimestamp;
		this.assistantTextByItem = /* @__PURE__ */ new Map();
		this.assistantItemOrder = [];
		this.assistantTimestampByItem = /* @__PURE__ */ new Map();
		this.assistantPhaseByItem = /* @__PURE__ */ new Map();
		this.latestTerminalAssistantCandidateSuperseded = false;
		this.latestTerminalAssistantCandidateCanReleaseAfterToolHandoff = false;
		this.terminalAssistantCandidateEarlierActiveItemIds = /* @__PURE__ */ new Set();
		this.lastCommentaryProgressTextByItem = /* @__PURE__ */ new Map();
		this.lastAnswerCandidateEventByItem = /* @__PURE__ */ new Map();
		this.pendingRawCommentaryEchoes = 0;
		this.rawPromotedAssistantItemIds = /* @__PURE__ */ new Set();
		this.assistantStarted = false;
		this.streamedPartialAssistantItemReplaceable = false;
	}
	hasCompletedTerminalAssistantText(completedItemIds) {
		const latestCompletedItemId = this.latestCompletedTerminalAssistantItemId;
		if (!latestCompletedItemId) return false;
		const finalItem = this.resolveFinalAssistantTextItem();
		return this.latestCompletedItemId === latestCompletedItemId && finalItem?.itemId === latestCompletedItemId && completedItemIds.has(latestCompletedItemId);
	}
	getLatestTerminalAssistantCandidate() {
		const itemId = this.latestTerminalAssistantCandidateItemId;
		if (!itemId) return;
		const text = this.assistantTextByItem.get(itemId)?.trim();
		return {
			itemId,
			hasText: Boolean(text && !this.isToolProgressEchoText(itemId, text))
		};
	}
	hasLatestTerminalAssistantCandidateText() {
		return !this.latestTerminalAssistantCandidateSuperseded && this.getLatestTerminalAssistantCandidate()?.hasText === true;
	}
	canReleaseLatestTerminalAssistantAfterToolHandoff() {
		return this.latestTerminalAssistantCandidateCanReleaseAfterToolHandoff && this.hasLatestTerminalAssistantCandidateText();
	}
	async handleAssistantDelta(params) {
		const itemId = readString$6(params, "itemId") ?? "assistant";
		const delta = readString$6(params, "delta") ?? "";
		if (!delta) return;
		if (itemId !== this.pendingRawTerminalAssistantEchoItemId) this.pendingRawTerminalAssistantEchoItemId = void 0;
		const isCommentary = this.isCommentaryAssistantItem(itemId);
		if (!isCommentary && itemId !== this.latestTerminalAssistantCandidateItemId) this.markTerminalAssistantCandidateSupersededBy();
		if (!this.assistantStarted) {
			this.assistantStarted = true;
			await this.params.onAssistantMessageStart?.();
		}
		this.rememberAssistantItem(itemId);
		const text = `${this.assistantTextByItem.get(itemId) ?? ""}${delta}`;
		this.assistantTextByItem.set(itemId, text);
		if (isCommentary) {
			this.emitCommentaryProgress({
				itemId,
				text
			});
			return;
		}
		if (this.isFinalAnswerAssistantItem(itemId)) this.emitAnswerCandidate(itemId, "candidate");
		const knownFinalAnswer = this.shouldStreamAssistantPartial(itemId);
		const replace = this.streamedPartialAssistantItemId !== void 0 && this.streamedPartialAssistantItemId !== itemId;
		if (replace && (!knownFinalAnswer || this.streamedPartialAssistantItemReplaceable)) this.streamedPartialAssistantItemReplaceable = true;
		else if (this.streamedPartialAssistantItemId === void 0) this.streamedPartialAssistantItemReplaceable = !knownFinalAnswer;
		this.streamedPartialAssistantItemId = itemId;
		const replaceable = this.streamedPartialAssistantItemReplaceable;
		const replacement = replace && replaceable;
		const streamPayload = {
			text,
			delta: replacement ? "" : delta,
			...replacement ? { replace: true } : {}
		};
		this.emitAgentEvent({
			stream: "assistant",
			data: {
				...streamPayload,
				...replaceable ? { replaceable: true } : {}
			}
		});
		if (knownFinalAnswer && !replaceable) await this.params.onPartialReply?.(streamPayload);
	}
	recordItemStarted(item, itemId) {
		if (item?.type === "agentMessage" && itemId && itemId !== this.pendingRawTerminalAssistantEchoItemId) this.pendingRawTerminalAssistantEchoItemId = void 0;
		this.rememberAssistantPhase(item);
		if (item?.type === "agentMessage" && itemId) this.rememberAssistantItem(itemId);
		if (itemId && itemId !== this.latestTerminalAssistantCandidateItemId) {
			this.markTerminalAssistantCandidateSupersededBy(itemId, { preserveEarlierActiveItem: true });
			if (this.latestTerminalAssistantCandidateSuperseded) this.pendingRawTerminalAssistantEchoItemId = void 0;
		}
	}
	recordItemCompleted(item, itemId, activeItemIds) {
		if (item?.type === "agentMessage" && itemId && itemId !== this.pendingRawTerminalAssistantEchoItemId) this.pendingRawTerminalAssistantEchoItemId = void 0;
		if (itemId) this.latestCompletedItemId = itemId;
		this.rememberAssistantPhase(item);
		if (item?.type === "agentMessage" && !this.isCommentaryAssistantItem(item.id)) {
			this.latestCompletedTerminalAssistantItemId = item.id;
			this.markLatestTerminalAssistantCandidate(item.id, activeItemIds);
			this.pendingRawTerminalAssistantEchoItemId = item.id;
		} else if (itemId) {
			this.markTerminalAssistantCandidateSupersededBy(itemId, { preserveEarlierActiveItem: true });
			if (this.latestTerminalAssistantCandidateSuperseded) this.pendingRawTerminalAssistantEchoItemId = void 0;
		}
		if (item?.type === "agentMessage" && typeof item.text === "string") {
			this.rememberAssistantItem(item.id);
			this.assistantTextByItem.set(item.id, item.text);
			if (item.text && this.isCommentaryAssistantItem(item.id)) {
				this.emitCommentaryProgress({
					itemId: item.id,
					text: item.text
				});
				this.pendingRawCommentaryEchoes += 1;
			} else if (item.text && this.isFinalAnswerAssistantItem(item.id)) this.emitAnswerCandidate(item.id, "candidate");
		}
	}
	recordSnapshotItem(item) {
		this.rememberAssistantPhase(item);
		if (item.type === "agentMessage" && typeof item.text === "string") {
			this.rememberAssistantItem(item.id);
			this.assistantTextByItem.set(item.id, item.text);
		}
	}
	handleRawResponseItemCompleted(item, activeItemIds) {
		const role = readString$6(item, "role");
		const phase = readString$6(item, "phase");
		const rawItemId = readString$6(item, "id");
		const candidateWasSupersededBeforeRaw = this.latestTerminalAssistantCandidateSuperseded;
		const pendingTerminalAssistantEchoItemId = this.pendingRawTerminalAssistantEchoItemId;
		const isPendingTerminalAssistantEcho = role === "assistant" && phase !== "commentary" && pendingTerminalAssistantEchoItemId !== void 0 && (rawItemId === void 0 || rawItemId === pendingTerminalAssistantEchoItemId);
		if (pendingTerminalAssistantEchoItemId !== void 0 && !isPendingTerminalAssistantEcho) this.pendingRawTerminalAssistantEchoItemId = void 0;
		if (!isPendingTerminalAssistantEcho) {
			this.latestCompletedItemId = void 0;
			this.markTerminalAssistantCandidateSupersededBy(rawItemId);
		}
		if (role !== "assistant") return;
		if (phase === "commentary" && this.pendingRawCommentaryEchoes > 0) {
			this.pendingRawCommentaryEchoes -= 1;
			return;
		}
		const text = extractRawAssistantText(item);
		if (isPendingTerminalAssistantEcho) {
			const typedItemId = pendingTerminalAssistantEchoItemId;
			this.pendingRawTerminalAssistantEchoItemId = void 0;
			if (this.assistantTextByItem.get(typedItemId)?.trim() || !text) return;
			this.rememberAssistantItem(typedItemId);
			this.assistantTextByItem.set(typedItemId, text);
			return;
		}
		if (text === void 0 || !text && (phase === "commentary" || activeItemIds.size > 0 || readString$6(item, "type") !== "message")) return;
		const itemId = rawItemId ?? `raw-assistant-${this.assistantItemOrder.length + 1}`;
		const isIdlessTerminalAssistantAfterCompletedWork = candidateWasSupersededBeforeRaw && rawItemId === void 0 && pendingTerminalAssistantEchoItemId === void 0 && activeItemIds.size === 0;
		if (text && phase !== "commentary" && candidateWasSupersededBeforeRaw && itemId !== this.streamedPartialAssistantItemId && !isIdlessTerminalAssistantAfterCompletedWork) return;
		if (phase) this.assistantPhaseByItem.set(itemId, phase);
		this.rememberAssistantItem(itemId);
		this.assistantTextByItem.set(itemId, text);
		if (!text) return;
		this.rawPromotedAssistantItemIds.add(itemId);
		if (phase === "commentary") this.emitCommentaryProgress({
			itemId,
			text
		});
		else this.markLatestTerminalAssistantCandidate(itemId, activeItemIds, { canReleaseAfterToolHandoff: isIdlessTerminalAssistantAfterCompletedWork });
	}
	collectAssistantTexts() {
		const finalText = this.resolveFinalAssistantTextItem()?.text;
		return finalText ? [finalText] : [];
	}
	collectCommentaryMessages() {
		return this.assistantItemOrder.flatMap((itemId) => {
			if (!this.isCommentaryAssistantItem(itemId)) return [];
			const text = this.assistantTextByItem.get(itemId)?.trim();
			const timestamp = this.assistantTimestampByItem.get(itemId);
			if (!text || timestamp === void 0) return [];
			return [{
				itemId,
				message: createAssistantCommentaryMessage(this.params, text, itemId, timestamp)
			}];
		});
	}
	finalizeAnswerCandidate(turn) {
		if (turn.status !== "completed") {
			this.supersedeVisibleAnswerCandidate();
			return;
		}
		const turnItems = turn.items ?? [];
		const authoritativeIndex = turnItems.findLastIndex((item) => {
			if (item.type !== "agentMessage" || typeof item.text !== "string" || item.text.trim().length === 0) return false;
			const phase = readItemString(item, "phase");
			return phase === "final_answer" || phase === void 0;
		});
		const authoritative = authoritativeIndex >= 0 ? turnItems[authoritativeIndex] : void 0;
		if (turnItems.slice(authoritativeIndex + 1).some(shouldClearTerminalPresentationForNativeItem) || authoritative?.id === this.latestTerminalAssistantCandidateItemId && this.latestTerminalAssistantCandidateSuperseded) {
			this.supersedeVisibleAnswerCandidate();
			return;
		}
		const itemId = authoritative?.id ?? this.visibleAnswerCandidateItemId;
		if (!itemId) return;
		if (itemId !== this.visibleAnswerCandidateItemId) {
			this.supersedeVisibleAnswerCandidate();
			this.visibleAnswerCandidateItemId = itemId;
		}
		this.emitAnswerCandidate(itemId, "selected");
	}
	hasAssistantItemTextForSynthesis() {
		for (let i = this.assistantItemOrder.length - 1; i >= 0; i -= 1) {
			const itemId = this.assistantItemOrder[i];
			if (!itemId || this.assistantPhaseByItem.get(itemId) === "commentary") continue;
			const text = this.assistantTextByItem.get(itemId);
			if (text && text.length > 0) return true;
		}
		return false;
	}
	createCurrentAttemptAssistantMessage(options) {
		for (let i = this.assistantItemOrder.length - 1; i >= 0; i -= 1) {
			const itemId = this.assistantItemOrder[i];
			if (!itemId || this.isCommentaryAssistantItem(itemId) || !this.assistantTextByItem.has(itemId)) continue;
			const text = this.assistantTextByItem.get(itemId) ?? "";
			const normalizedText = text.trim();
			if (normalizedText && this.isToolProgressEchoText(itemId, normalizedText)) continue;
			return this.createAssistantMessage(text, options);
		}
	}
	createAssistantMessage(text, options) {
		return createAssistantMessage(this.params, text, options);
	}
	createAssistantMirrorMessage(title, text) {
		return createAssistantMirrorMessage(this.params, title, text);
	}
	rememberAssistantPhase(item) {
		if (item?.type !== "agentMessage") return;
		const phase = readItemString(item, "phase");
		if (phase) this.assistantPhaseByItem.set(item.id, phase);
	}
	isCommentaryAssistantItem(itemId) {
		return this.assistantPhaseByItem.get(itemId) === "commentary";
	}
	isFinalAnswerAssistantItem(itemId) {
		return this.assistantPhaseByItem.get(itemId) === "final_answer";
	}
	shouldStreamAssistantPartial(itemId) {
		return this.assistantPhaseByItem.get(itemId) === "final_answer";
	}
	emitCommentaryProgress(params) {
		const progressText = params.text.replace(/\s+/g, " ").trim();
		if (!progressText || this.lastCommentaryProgressTextByItem.get(params.itemId) === progressText) return;
		this.lastCommentaryProgressTextByItem.set(params.itemId, progressText);
		this.emitAgentEvent({
			stream: "item",
			data: {
				itemId: params.itemId,
				kind: "preamble",
				title: "Preamble",
				phase: "update",
				progressText,
				source: "codex-app-server"
			}
		});
	}
	emitAnswerCandidate(itemId, status) {
		const text = this.assistantTextByItem.get(itemId)?.trim();
		if (!text) return;
		if (status === "candidate" && this.visibleAnswerCandidateItemId !== itemId) {
			this.supersedeVisibleAnswerCandidate();
			this.visibleAnswerCandidateItemId = itemId;
		}
		const signature = `${status}\0${text}`;
		if (this.lastAnswerCandidateEventByItem.get(itemId) === signature) return;
		this.lastAnswerCandidateEventByItem.set(itemId, signature);
		this.emitAgentEvent({
			stream: "item",
			data: {
				itemId,
				kind: "answer_candidate",
				title: "Answer candidate",
				phase: "update",
				status,
				progressText: text,
				source: "codex-app-server",
				hideFromChannelProgress: true
			}
		});
	}
	supersedeVisibleAnswerCandidate() {
		const itemId = this.visibleAnswerCandidateItemId;
		if (!itemId) return;
		this.emitAnswerCandidate(itemId, "superseded");
		this.visibleAnswerCandidateItemId = void 0;
	}
	markLatestTerminalAssistantCandidate(itemId, activeItemIds, options) {
		this.latestTerminalAssistantCandidateItemId = itemId;
		this.latestTerminalAssistantCandidateSuperseded = false;
		this.latestTerminalAssistantCandidateCanReleaseAfterToolHandoff = options?.canReleaseAfterToolHandoff === true;
		this.terminalAssistantCandidateEarlierActiveItemIds = new Set(activeItemIds);
	}
	markTerminalAssistantCandidateSupersededBy(itemId, options) {
		if (!this.latestTerminalAssistantCandidateItemId) return;
		if (itemId && this.terminalAssistantCandidateEarlierActiveItemIds.has(itemId)) {
			if (!options?.preserveEarlierActiveItem) this.terminalAssistantCandidateEarlierActiveItemIds.delete(itemId);
			return;
		}
		this.latestTerminalAssistantCandidateSuperseded = true;
		this.latestTerminalAssistantCandidateCanReleaseAfterToolHandoff = false;
		this.terminalAssistantCandidateEarlierActiveItemIds.clear();
		this.supersedeVisibleAnswerCandidate();
	}
	resolveFinalAssistantTextItem() {
		for (let i = this.assistantItemOrder.length - 1; i >= 0; i -= 1) {
			const itemId = this.assistantItemOrder[i];
			if (!itemId) continue;
			const text = this.assistantTextByItem.get(itemId)?.trim();
			if (this.assistantPhaseByItem.get(itemId) === "commentary") continue;
			if (text && !this.isToolProgressEchoText(itemId, text)) return {
				itemId,
				text
			};
		}
	}
	rememberAssistantItem(itemId) {
		if (!itemId || this.assistantItemOrder.includes(itemId)) return;
		this.assistantItemOrder.push(itemId);
		this.assistantTimestampByItem.set(itemId, this.nextTranscriptTimestamp());
	}
	isToolProgressEchoText(itemId, text) {
		return this.rawPromotedAssistantItemIds.has(itemId) && this.matchesToolProgressEcho(text);
	}
};
//#endregion
//#region extensions/codex/src/app-server/event-projector-tool-output.ts
const TOOL_TRANSCRIPT_OUTPUT_MAX_CHARS = 1e4;
const TOOL_OUTPUT_TRUNCATION_NOTICE_PREFIX = "...(OpenClaw truncated Codex native tool output";
var ToolOutputAccumulator = class {
	constructor() {
		this.prefixByItem = /* @__PURE__ */ new Map();
		this.originalLengthByItem = /* @__PURE__ */ new Map();
		this.normalizedLengthByItem = /* @__PURE__ */ new Map();
		this.trimStateByItem = /* @__PURE__ */ new Map();
		this.truncatedItemIds = /* @__PURE__ */ new Set();
		this.textByItem = /* @__PURE__ */ new Map();
	}
	append(itemId, delta) {
		const originalLength = (this.originalLengthByItem.get(itemId) ?? this.textByItem.get(itemId)?.length ?? 0) + delta.length;
		this.originalLengthByItem.set(itemId, originalLength);
		const normalizedLength = updateToolOutputTrimState(this.trimStateByItem, itemId, delta);
		this.normalizedLengthByItem.set(itemId, normalizedLength);
		if (this.truncatedItemIds.has(itemId)) {
			const next = appendBoundedToolTranscriptText(this.prefixByItem.get(itemId) ?? this.textByItem.get(itemId) ?? "", "", originalLength);
			this.prefixByItem.set(itemId, next.rawPrefix);
			this.textByItem.set(itemId, next.text);
			return {
				text: next.text,
				originalLength,
				normalizedLength,
				rawPrefix: next.rawPrefix
			};
		}
		const next = appendBoundedToolTranscriptText(this.prefixByItem.get(itemId) ?? this.textByItem.get(itemId) ?? "", delta, originalLength);
		this.prefixByItem.set(itemId, next.rawPrefix);
		this.textByItem.set(itemId, next.text);
		if (originalLength > 1e4) this.truncatedItemIds.add(itemId);
		return {
			text: next.text,
			originalLength,
			normalizedLength,
			rawPrefix: next.rawPrefix
		};
	}
};
function updateToolOutputTrimState(trimStateByItem, itemId, delta) {
	const state = trimStateByItem.get(itemId) ?? {
		totalLength: 0,
		leadingWhitespaceLength: 0,
		trailingWhitespaceLength: 0,
		sawNonWhitespace: false
	};
	state.totalLength += delta.length;
	const firstNonWhitespace = delta.search(/\S/u);
	if (firstNonWhitespace === -1) {
		if (!state.sawNonWhitespace) state.leadingWhitespaceLength += delta.length;
		state.trailingWhitespaceLength += delta.length;
		trimStateByItem.set(itemId, state);
		return state.sawNonWhitespace ? state.totalLength - state.leadingWhitespaceLength - state.trailingWhitespaceLength : 0;
	}
	if (!state.sawNonWhitespace) {
		state.leadingWhitespaceLength += firstNonWhitespace;
		state.sawNonWhitespace = true;
	}
	state.trailingWhitespaceLength = delta.match(/\s*$/u)?.[0].length ?? 0;
	trimStateByItem.set(itemId, state);
	return state.totalLength - state.leadingWhitespaceLength - state.trailingWhitespaceLength;
}
function toolOutputRawEchoSignature(text) {
	const trimmed = text.trim();
	if (!trimmed) return;
	return {
		rawLength: trimmed.length,
		rawPrefix: trimmed.slice(0, TOOL_TRANSCRIPT_OUTPUT_MAX_CHARS)
	};
}
function normalizeToolTranscriptArguments(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return {};
	return value;
}
function collectDynamicToolContentText(contentItems) {
	if (!Array.isArray(contentItems)) return "";
	return contentItems.flatMap((entry) => {
		if (!isJsonObject(entry)) return [];
		const text = readString$6(entry, "text");
		return text ? [text] : [];
	}).join("\n");
}
function appendBoundedToolTranscriptText(currentPrefix, delta, originalLength) {
	if (originalLength <= 1e4) {
		const rawPrefix = currentPrefix + delta;
		return {
			text: rawPrefix,
			rawPrefix
		};
	}
	const notice = toolTranscriptTruncationNotice(originalLength);
	if (notice.length >= 1e4) return {
		text: notice.slice(0, TOOL_TRANSCRIPT_OUTPUT_MAX_CHARS),
		rawPrefix: ""
	};
	const textBudget = TOOL_TRANSCRIPT_OUTPUT_MAX_CHARS - notice.length;
	const remaining = Math.max(0, textBudget - currentPrefix.length);
	const rawPrefix = truncateUtf16Safe(remaining > 0 ? `${currentPrefix}${truncateUtf16Safe(delta, remaining)}` : currentPrefix, textBudget);
	return {
		text: `${rawPrefix}${notice}`,
		rawPrefix
	};
}
function toolTranscriptTruncationNotice(originalLength) {
	return `\n${`${TOOL_OUTPUT_TRUNCATION_NOTICE_PREFIX}: original ${originalLength} chars, showing ${TOOL_TRANSCRIPT_OUTPUT_MAX_CHARS}; rerun with narrower args.)`}`;
}
function truncateToolTranscriptText(text, originalLength = text.length) {
	if (originalLength <= 1e4 && text.length <= 1e4) return text;
	const notice = toolTranscriptTruncationNotice(originalLength);
	if (notice.length >= 1e4) return notice.slice(1, 10001);
	return `${truncateUtf16Safe(text, TOOL_TRANSCRIPT_OUTPUT_MAX_CHARS - notice.length)}${notice}`;
}
function formatToolSummary(toolName, meta) {
	const trimmedMeta = meta?.trim();
	return formatToolAggregate(toolName, trimmedMeta ? [trimmedMeta] : void 0, { markdown: true });
}
function formatToolOutput(toolName, meta, output) {
	const formattedOutput = formatToolProgressOutput(output);
	if (!formattedOutput) return formatToolSummary(toolName, meta);
	const fence = markdownFenceForText(formattedOutput);
	return `${formatToolSummary(toolName, meta)}\n${fence}txt\n${formattedOutput}\n${fence}`;
}
function markdownFenceForText(text) {
	return "`".repeat(Math.max(3, longestBacktickRun(text) + 1));
}
function longestBacktickRun(value) {
	let longest = 0;
	let current = 0;
	for (const char of value) {
		if (char === "`") {
			current += 1;
			longest = Math.max(longest, current);
			continue;
		}
		current = 0;
	}
	return longest;
}
//#endregion
//#region extensions/codex/src/app-server/tool-progress-normalization.ts
/**
* Normalizes and sanitizes Codex dynamic-tool progress payloads before they are
* emitted into OpenClaw events or logs.
*/
/** Maps OpenClaw tool-progress config to the mode used by Codex progress metadata. */
function resolveCodexToolProgressDetailMode(value) {
	return value === "raw" ? "raw" : "explain";
}
/** Recursively redacts sensitive strings and handles circular values in event payloads. */
function sanitizeCodexAgentEventValue(value, seen = /* @__PURE__ */ new WeakSet()) {
	if (typeof value === "string") return redactToolPayloadText(value);
	if (Array.isArray(value)) {
		if (seen.has(value)) return "[Circular]";
		seen.add(value);
		return value.map((entry) => sanitizeCodexAgentEventValue(entry, seen));
	}
	if (value && typeof value === "object") {
		if (seen.has(value)) return "[Circular]";
		seen.add(value);
		const out = {};
		for (const [key, child] of Object.entries(value)) out[key] = typeof child === "string" ? redactSensitiveFieldValue(key, child) : sanitizeCodexAgentEventValue(child, seen);
		return out;
	}
	return value;
}
/** Sanitizes a record-shaped Codex agent event payload. */
function sanitizeCodexAgentEventRecord(value) {
	return sanitizeCodexAgentEventValue(value);
}
/** Sanitizes dynamic-tool arguments before diagnostic/event emission. */
function sanitizeCodexToolArguments(value) {
	if (!isJsonObject(value)) return;
	return sanitizeCodexAgentEventRecord(value);
}
/** Sanitizes a Codex dynamic-tool response before diagnostic/event emission. */
function sanitizeCodexToolResponse(response) {
	return sanitizeCodexAgentEventRecord(response);
}
/** Infers compact human-readable tool metadata from Codex dynamic-tool arguments. */
function inferCodexDynamicToolMeta(call, detailMode) {
	return inferToolMetaFromArgs(call.tool, call.arguments, { detailMode });
}
//#endregion
//#region extensions/codex/src/app-server/event-projector-tool-items.ts
function nativeToolActionFingerprint(item) {
	if (item.type === "commandExecution" && typeof item.command === "string") return JSON.stringify({
		type: item.type,
		command: item.command,
		cwd: typeof item.cwd === "string" ? item.cwd : ""
	});
	if (item.type === "fileChange") return JSON.stringify({
		type: item.type,
		changes: itemFileChanges(item)
	});
}
function isNativePostToolUseRelayItem(item) {
	switch (item.type) {
		case "commandExecution":
		case "fileChange":
		case "mcpToolCall": return true;
		default: return false;
	}
}
function shouldSuppressChannelProgressForItem(item) {
	if (shouldSynthesizeToolProgressForItem(item)) return true;
	return item.type === "dynamicToolCall";
}
function itemToolArgs(item) {
	if (item.type === "commandExecution") return sanitizeCodexAgentEventRecord({
		command: item.command,
		...typeof item.cwd === "string" ? { cwd: item.cwd } : {}
	});
	if (item.type === "fileChange") return sanitizeCodexAgentEventRecord({ changes: itemFileChangesForTranscript(item) });
	if (item.type === "webSearch") return webSearchToolArgs(item);
	if (item.type === "dynamicToolCall" || item.type === "mcpToolCall") return sanitizeCodexToolArguments(item.arguments);
}
function webSearchToolArgs(item) {
	const action = isJsonObject(item.action) ? item.action : void 0;
	const actionType = action ? readNonEmptyString$1(action, "type") : void 0;
	const queries = action && actionType === "search" ? readNonEmptyStringArray(action, "queries") : [];
	const query = normalizeNonEmptyString(item.query) ?? (action && actionType === "search" ? readNonEmptyString$1(action, "query") : void 0) ?? queries[0];
	const url = action ? readNonEmptyString$1(action, "url") : void 0;
	const pattern = action ? readNonEmptyString$1(action, "pattern") : void 0;
	const args = {};
	if (query) args.query = query;
	if (queries.length > 0) args.queries = queries;
	if (actionType && actionType !== "search") args.action = actionType;
	if (url) args.url = url;
	if (pattern) args.pattern = pattern;
	if (!query && !url && !pattern) args.queryUnavailable = true;
	return sanitizeCodexAgentEventRecord(args);
}
function itemToolResult(item) {
	if (item.type === "commandExecution") return { result: sanitizeCodexAgentEventRecord({
		status: item.status,
		exitCode: item.exitCode,
		durationMs: item.durationMs
	}) };
	if (item.type === "fileChange") return { result: sanitizeCodexAgentEventRecord({
		status: item.status,
		changes: itemFileChanges(item)
	}) };
	if (item.type === "mcpToolCall") return { result: sanitizeCodexAgentEventRecord({
		status: item.status,
		durationMs: item.durationMs,
		...item.error ? { error: item.error } : {},
		...item.result ? { result: item.result } : {}
	}) };
	if (item.type === "webSearch") return { result: webSearchToolResult(item) };
	return {};
}
function webSearchToolResult(item) {
	return sanitizeCodexAgentEventRecord({
		status: itemStatus(item),
		...typeof item.durationMs === "number" ? { durationMs: item.durationMs } : {},
		...webSearchToolArgs(item)
	});
}
function itemFileChangeRecords(item) {
	const changes = item.changes;
	return Array.isArray(changes) ? changes.filter(isJsonObject) : [];
}
function itemFileChanges(item) {
	return itemFileChangeRecords(item).flatMap((change) => {
		const path = normalizeNonEmptyString(change.path);
		if (!path || change.kind === void 0) return [];
		return [{
			path,
			kind: change.kind
		}];
	});
}
function fileChangeKindType(kind) {
	if (typeof kind === "string") return kind;
	return isJsonObject(kind) ? normalizeNonEmptyString(kind.type) : void 0;
}
function countFileContentLines(content) {
	if (!content) return 0;
	const lines = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
	if (lines.length > 1 && lines.at(-1) === "") lines.pop();
	return lines.length;
}
function fileChangeDiffStat(diff, kind) {
	const kindType = fileChangeKindType(kind);
	if (kindType === "add") return {
		added: countFileContentLines(diff),
		removed: 0
	};
	if (kindType === "delete") return {
		added: 0,
		removed: countFileContentLines(diff)
	};
	let added = 0;
	let removed = 0;
	let inHunk = false;
	for (const line of diff.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n")) {
		if (line.startsWith("@@")) {
			inHunk = true;
			continue;
		}
		if (!inHunk) continue;
		if (line.startsWith("+")) added += 1;
		else if (line.startsWith("-")) removed += 1;
	}
	return {
		added,
		removed
	};
}
function truncateFileChangeDiffAtLineBoundary(diff, maxChars) {
	if (diff.length <= maxChars) return { diff };
	if (maxChars <= 0) return { diffTruncated: true };
	const boundary = diff.lastIndexOf("\n", maxChars - 1);
	return boundary >= 0 ? {
		diff: diff.slice(0, boundary + 1),
		diffTruncated: true
	} : { diffTruncated: true };
}
function itemFileChangesForTranscript(item) {
	let remainingDiffChars = 1e4;
	return itemFileChangeRecords(item).flatMap((change) => {
		const path = normalizeNonEmptyString(change.path);
		if (!path || change.kind === void 0) return [];
		const result = {
			path,
			kind: change.kind
		};
		if (typeof change.diff !== "string") return [result];
		result.stat = fileChangeDiffStat(change.diff, change.kind);
		const bounded = truncateFileChangeDiffAtLineBoundary(change.diff, remainingDiffChars);
		if (bounded.diff !== void 0) {
			result.diff = bounded.diff;
			remainingDiffChars -= bounded.diff.length;
		}
		if (bounded.diffTruncated) result.diffTruncated = true;
		return [result];
	});
}
function itemToolError(item, status, outputTextByItem) {
	if (status === "blocked") return "codex native tool blocked";
	if (status !== "failed") return;
	return itemOutputText(item, outputTextByItem) ?? "codex native tool failed";
}
function itemMeta(item, detailMode = "explain") {
	if (item.type === "commandExecution" && typeof item.command === "string") return inferToolMetaFromArgs("exec", {
		command: item.command,
		cwd: typeof item.cwd === "string" ? item.cwd : void 0
	}, { detailMode });
	if (item.type === "webSearch") return inferToolMetaFromArgs("web_search", webSearchToolArgs(item), { detailMode });
	const toolName = itemName(item);
	if ((item.type === "dynamicToolCall" || item.type === "mcpToolCall") && toolName) return inferToolMetaFromArgs(toolName, item.arguments, { detailMode });
}
function itemOutputText(item, outputTextByItem) {
	if (item.type === "commandExecution") {
		const output = item.aggregatedOutput?.trim() || outputTextByItem?.get(item.id)?.trim();
		return output ? truncateToolTranscriptText(output) : void 0;
	}
	if (item.type === "dynamicToolCall") {
		const output = collectDynamicToolContentText(item.contentItems).trim();
		return output ? truncateToolTranscriptText(output) : void 0;
	}
	if (item.type === "mcpToolCall") {
		const output = item.error ? stringifyJsonValue(item.error) : item.result ? stringifyJsonValue(item.result) : void 0;
		return output ? truncateToolTranscriptText(output) : void 0;
	}
}
function itemTranscriptResultText(item, outputTextByItem) {
	const output = itemOutputText(item, outputTextByItem);
	if (output) return output;
	const result = itemToolResult(item).result;
	const resultText = result ? stringifyJsonValue(result) : void 0;
	return resultText ? truncateToolTranscriptText(resultText) : itemStatus(item);
}
function stringifyJsonValue(value) {
	try {
		return JSON.stringify(value, null, 2);
	} catch {
		return;
	}
}
//#endregion
//#region extensions/codex/src/app-server/event-projector-tool-progress.ts
const TRANSCRIPT_PROGRESS_SUPPRESSED_TOOL_NAMES = /* @__PURE__ */ new Set([
	"message",
	"messages",
	"reply",
	"send",
	"reaction",
	"react",
	"typing"
]);
function shouldEmitTranscriptToolProgress(toolName, _args) {
	const normalized = typeof toolName === "string" ? toolName.trim().toLowerCase() : "";
	return Boolean(normalized && !TRANSCRIPT_PROGRESS_SUPPRESSED_TOOL_NAMES.has(normalized));
}
var CodexToolProgressProjection = class {
	constructor(params) {
		this.params = params;
		this.echoesByItem = /* @__PURE__ */ new Map();
		this.resultSummaryItemIds = /* @__PURE__ */ new Set();
		this.resultOutputItemIds = /* @__PURE__ */ new Set();
		this.resultOutputStreamedItemIds = /* @__PURE__ */ new Set();
		this.transcriptProgressSuppressedIds = /* @__PURE__ */ new Set();
		this.transcriptArgumentsById = /* @__PURE__ */ new Map();
		this.resultOutputDeltaState = /* @__PURE__ */ new Map();
		this.output = new ToolOutputAccumulator();
		this.metas = /* @__PURE__ */ new Map();
		this.sideEffectingNativeIds = /* @__PURE__ */ new Set();
		this.sideEffectingDynamicIds = /* @__PURE__ */ new Set();
		this.transcriptProgressCallIds = /* @__PURE__ */ new Set();
	}
	get outputTextByItem() {
		return this.output.textByItem;
	}
	get toolMetas() {
		return [...this.metas.values()];
	}
	getToolMeta(itemId) {
		return this.metas.get(itemId);
	}
	get lastToolError() {
		return this.lastNativeToolError;
	}
	get hasPotentialSideEffects() {
		return this.sideEffectingNativeIds.size > 0 || this.sideEffectingDynamicIds.size > 0;
	}
	setLastToolError(error) {
		if (!error) {
			this.lastNativeToolError = void 0;
			return;
		}
		const terminalResolution = this.params.observeToolTerminal?.({
			toolName: error.toolName,
			...error.meta ? { meta: error.meta } : {},
			outcome: "failure",
			failure: {
				...error.errorCode ? { errorCode: error.errorCode } : {},
				...error.error ? { error: error.error } : {},
				...error.validationErrorSummary ? { validationErrorSummary: error.validationErrorSummary } : {},
				...error.timedOut ? { timedOut: true } : {},
				...error.middlewareError ? { middlewareError: true } : {}
			},
			nativeMutation: {
				mutatingAction: error.mutatingAction === true,
				replaySafe: error.mutatingAction !== true,
				...error.actionFingerprint ? { actionFingerprint: error.actionFingerprint } : {},
				...error.fileTarget ? { fileTarget: error.fileTarget } : {}
			}
		});
		this.lastNativeToolError = terminalResolution?.lastToolError ?? (this.lastNativeToolError?.mutatingAction && error.mutatingAction !== true ? this.lastNativeToolError : error);
	}
	recordDynamicToolResult(params) {
		const resultText = collectDynamicToolContentText(params.contentItems);
		const existing = this.metas.get(params.callId);
		this.metas.set(params.callId, {
			toolName: existing?.toolName ?? params.tool,
			...existing?.meta ? { meta: existing.meta } : {},
			...params.asyncStarted === true ? { asyncStarted: true } : {},
			...!params.success ? { isError: true } : {}
		});
		if (params.terminalResolution) this.lastNativeToolError = params.terminalResolution.lastToolError;
		else if (!params.success) this.lastNativeToolError = {
			toolName: params.tool,
			error: resultText || (params.terminalType === "blocked" ? "codex dynamic tool blocked" : "codex dynamic tool failed")
		};
		else if (this.lastNativeToolError?.mutatingAction !== true) this.lastNativeToolError = void 0;
		if (params.sideEffectEvidence === true) this.sideEffectingDynamicIds.add(params.callId);
	}
	handleOutputDelta(params, toolName) {
		const itemId = readString$6(params, "itemId");
		const delta = readString$6(params, "delta");
		if (!itemId || !delta) return;
		const storedOutput = this.output.append(itemId, delta);
		this.rememberEcho(itemId, {
			displayText: storedOutput.text,
			rawLength: storedOutput.normalizedLength,
			rawPrefix: storedOutput.rawPrefix,
			streamedDisplay: true
		});
		if (!this.shouldEmitToolOutput()) return;
		if (this.transcriptProgressSuppressedIds.has(itemId) || !shouldEmitTranscriptToolProgress(toolName, this.transcriptArgumentsById.get(itemId))) return;
		const state = this.resultOutputDeltaState.get(itemId) ?? {
			chars: 0,
			messages: 0,
			truncated: false
		};
		if (state.truncated) return;
		const remainingChars = Math.max(0, TOOL_PROGRESS_OUTPUT_MAX_CHARS - state.chars);
		const remainingMessages = Math.max(0, 20 - state.messages);
		if (remainingChars === 0 || remainingMessages === 0) {
			state.truncated = true;
			this.resultOutputDeltaState.set(itemId, state);
			this.emitToolResultMessage({
				itemId,
				text: formatToolOutput(toolName, void 0, "(output truncated)")
			});
			return;
		}
		const chunk = delta.length > remainingChars ? truncateUtf16Safe(delta, remainingChars) : delta;
		state.chars += chunk.length;
		state.messages += 1;
		const reachedLimit = delta.length > remainingChars || state.chars >= 8e3 || state.messages >= 20;
		if (reachedLimit) state.truncated = true;
		this.resultOutputDeltaState.set(itemId, state);
		this.resultOutputStreamedItemIds.add(itemId);
		this.emitToolResultMessage({
			itemId,
			text: formatToolOutput(toolName, void 0, reachedLimit ? `${chunk}\n...(truncated)...` : chunk)
		});
	}
	recordNativeToolError(params) {
		const executionStarted = params.status !== "blocked";
		const mutatingAction = executionStarted && isMutatingNativeToolItem(params.item);
		const actionFingerprint = mutatingAction ? nativeToolActionFingerprint(params.item) : void 0;
		const isFailure = isNonSuccessItemStatus(params.status);
		const error = isFailure ? itemToolError(params.item, params.status, this.output.textByItem) : void 0;
		const terminalResolution = this.params.observeToolTerminal?.({
			toolCallId: params.item.id,
			toolName: params.name,
			arguments: itemToolArgs(params.item),
			...params.meta ? { meta: params.meta } : {},
			executionStarted,
			outcome: isFailure ? "failure" : "success",
			...isFailure ? { failure: error ? { error } : {} } : {},
			nativeMutation: {
				mutatingAction,
				replaySafe: !mutatingAction,
				...actionFingerprint ? { actionFingerprint } : {}
			}
		});
		if (terminalResolution) {
			this.lastNativeToolError = terminalResolution.lastToolError;
			return;
		}
		if (isFailure) this.lastNativeToolError = {
			toolName: params.name,
			...params.meta ? { meta: params.meta } : {},
			...error ? { error } : {},
			...mutatingAction ? { mutatingAction: true } : {},
			...actionFingerprint ? { actionFingerprint } : {}
		};
		else if (this.lastNativeToolError?.mutatingAction !== true) this.lastNativeToolError = void 0;
	}
	emitToolResultSummary(item) {
		if (!item || !this.params.onToolResult || !this.shouldEmitToolResult()) return;
		if (this.resultSummaryItemIds.has(item.id)) return;
		const toolName = itemName(item);
		if (!toolName || !shouldEmitTranscriptToolProgress(toolName, itemToolArgs(item))) return;
		this.resultSummaryItemIds.add(item.id);
		this.emitToolResultMessage({
			itemId: item.id,
			text: formatToolSummary(toolName, itemMeta(item, this.toolProgressDetailMode()))
		});
	}
	emitToolResultOutput(item) {
		if (!item || !this.params.onToolResult || !this.shouldEmitToolOutput()) return;
		if (this.resultOutputItemIds.has(item.id) || this.resultOutputStreamedItemIds.has(item.id)) return;
		const toolName = itemName(item);
		const output = itemOutputText(item, this.output.textByItem);
		if (!toolName || !output || !shouldEmitTranscriptToolProgress(toolName, itemToolArgs(item))) return;
		this.emitToolResultMessage({
			itemId: item.id,
			text: formatToolOutput(toolName, itemMeta(item, this.toolProgressDetailMode()), output),
			finalOutput: true,
			isError: isNonSuccessItemStatus(itemStatus(item))
		});
	}
	recordToolMeta(item) {
		if (!item) return;
		if (isSideEffectingNativeToolItem(item)) this.sideEffectingNativeIds.add(item.id);
		else this.sideEffectingNativeIds.delete(item.id);
		const toolName = itemName(item);
		if (!toolName) return;
		const meta = itemMeta(item, this.toolProgressDetailMode());
		const status = itemStatus(item);
		const existing = this.metas.get(item.id);
		this.metas.set(item.id, {
			toolName,
			...meta ? { meta } : {},
			...existing?.asyncStarted ? { asyncStarted: true } : {},
			...status !== "running" && isNonSuccessItemStatus(status) ? { isError: true } : {}
		});
	}
	recordTranscriptCall(params) {
		this.transcriptArgumentsById.set(params.id, params.arguments);
		if (!shouldEmitTranscriptToolProgress(params.name, params.arguments)) this.transcriptProgressSuppressedIds.add(params.id);
		else this.transcriptProgressSuppressedIds.delete(params.id);
		this.emitTranscriptToolCallProgress(params);
	}
	recordTranscriptResult(params) {
		this.emitTranscriptToolResultProgress(params);
	}
	matchesEcho(text) {
		for (const state of this.echoesByItem.values()) {
			if (state.streamedDisplayText === text || state.displayTexts.includes(text)) return true;
			if (state.streamedRawSignature && text.length === state.streamedRawSignature.length && text.startsWith(state.streamedRawSignature.prefix)) return true;
			for (const signature of state.rawSignatures) if (text.length === signature.length && text.startsWith(signature.prefix)) return true;
		}
		return false;
	}
	rememberCommandAggregateOutputEcho(item) {
		if (item?.type !== "commandExecution" || typeof item.aggregatedOutput !== "string") return;
		const signature = toolOutputRawEchoSignature(item.aggregatedOutput);
		if (signature) this.rememberEcho(item.id, signature);
	}
	toolProgressDetailMode() {
		return resolveCodexToolProgressDetailMode(this.params.toolProgressDetail);
	}
	emitToolResultMessage(params) {
		const rawText = params.text.trim();
		const text = truncateToolTranscriptText(rawText);
		if (!text) return;
		this.rememberEcho(params.itemId, {
			displayText: text,
			rawText
		});
		if (params.finalOutput) this.resultOutputItemIds.add(params.itemId);
		try {
			Promise.resolve(this.params.onToolResult?.({
				text,
				...params.isError === true ? { isError: true } : {}
			})).catch(() => {});
		} catch {}
	}
	shouldEmitToolResult() {
		return typeof this.params.shouldEmitToolResult === "function" ? this.params.shouldEmitToolResult() : this.params.verboseLevel === "on" || this.params.verboseLevel === "full";
	}
	shouldEmitToolOutput() {
		return typeof this.params.shouldEmitToolOutput === "function" ? this.params.shouldEmitToolOutput() : this.params.verboseLevel === "full";
	}
	emitTranscriptToolCallProgress(params) {
		if (!shouldEmitTranscriptToolProgress(params.name, params.arguments)) return;
		this.transcriptProgressCallIds.add(params.id);
		const args = normalizeToolTranscriptArguments(params.arguments);
		const meta = inferToolMetaFromArgs(params.name, args, { detailMode: this.toolProgressDetailMode() });
		if (!this.params.onToolResult || !this.shouldEmitToolResult() || this.resultSummaryItemIds.has(params.id) || this.resultOutputStreamedItemIds.has(params.id)) return;
		this.resultSummaryItemIds.add(params.id);
		this.emitToolResultMessage({
			itemId: params.id,
			text: formatToolSummary(params.name, meta)
		});
	}
	emitTranscriptToolResultProgress(params) {
		if (this.transcriptProgressSuppressedIds.has(params.id) || !shouldEmitTranscriptToolProgress(params.name, this.transcriptArgumentsById.get(params.id))) return;
		if (!this.transcriptProgressCallIds.has(params.id)) this.emitTranscriptToolCallProgress({
			id: params.id,
			name: params.name,
			arguments: {}
		});
		if (!this.params.onToolResult || !this.shouldEmitToolOutput() || this.resultOutputItemIds.has(params.id) || this.resultOutputStreamedItemIds.has(params.id)) return;
		const text = params.text?.trim();
		if (text) this.emitToolResultMessage({
			itemId: params.id,
			text: formatToolOutput(params.name, void 0, text),
			finalOutput: true,
			isError: params.isError
		});
	}
	rememberEcho(itemId, signature) {
		if (!itemId) return;
		const existing = this.echoesByItem.get(itemId) ?? {
			displayTexts: [],
			rawSignatures: []
		};
		const displayText = signature.displayText?.trim();
		if (displayText) {
			if (signature.streamedDisplay) existing.streamedDisplayText = displayText;
			else if (!existing.displayTexts.includes(displayText)) {
				if (existing.displayTexts.length >= 24) existing.displayTexts.shift();
				existing.displayTexts.push(displayText);
			}
		}
		const rawText = signature.rawText?.trim();
		const rawLength = signature.rawLength ?? rawText?.length;
		const rawPrefix = signature.rawPrefix?.trim() ?? rawText;
		if (rawLength !== void 0 && rawPrefix && rawPrefix.length >= 1024) {
			const next = {
				length: rawLength,
				prefix: rawPrefix.slice(0, TOOL_TRANSCRIPT_OUTPUT_MAX_CHARS)
			};
			if (signature.streamedDisplay) existing.streamedRawSignature = next;
			else {
				const matchIndex = existing.rawSignatures.findIndex((entry) => entry.prefix === next.prefix);
				if (matchIndex >= 0) existing.rawSignatures[matchIndex] = next;
				else {
					if (existing.rawSignatures.length >= 24) existing.rawSignatures.shift();
					existing.rawSignatures.push(next);
				}
			}
		}
		this.echoesByItem.set(itemId, existing);
	}
};
//#endregion
//#region extensions/codex/src/app-server/session-history.ts
/**
* Reads OpenClaw session history for Codex transcript mirroring and sanitizes
* image payloads before replaying messages into the app-server projector.
*/
function isMissingFileError(error) {
	return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}
/** Returns sanitized session-context messages for a Codex mirrored session file. */
async function readCodexMirroredSessionHistoryMessages(target) {
	try {
		const entries = await readCodexMirroredSessionEntries(target);
		if (entries.length === 0) return [];
		const firstEntry = entries[0];
		if (firstEntry?.type !== "session") return [];
		if (typeof firstEntry.id !== "string") return;
		migrateSessionEntries(entries);
		return sanitizeCodexHistoryImagePayloads(buildSessionContext(entries.filter((entry) => {
			return entry !== null && typeof entry === "object" && !Array.isArray(entry) && entry.type !== "session";
		})).messages, "codex mirrored history");
	} catch (error) {
		if (isMissingFileError(error)) return [];
		return;
	}
}
async function readCodexMirroredSessionEntries(target) {
	if (target.sessionTarget) {
		const { agentId, sessionId, sessionKey, storePath } = target.sessionTarget;
		if (!agentId || !sessionId || !sessionKey || !storePath || sessionId !== target.sessionId || target.agentId !== void 0 && agentId !== target.agentId || target.sessionKey !== void 0 && sessionKey !== target.sessionKey) return [];
		return await readSessionTranscriptEvents({
			agentId,
			sessionId,
			sessionKey,
			storePath
		});
	}
	const sqliteMarker = parseSqliteSessionFileMarker(target.sessionFile);
	if (sqliteMarker) {
		if (sqliteMarker.sessionId !== target.sessionId || target.agentId !== void 0 && sqliteMarker.agentId !== target.agentId) return [];
		const sessionKey = resolveSqliteMarkerSessionKey(target, sqliteMarker);
		if (!sessionKey) return [];
		return await readSessionTranscriptEvents({
			agentId: sqliteMarker.agentId,
			sessionId: sqliteMarker.sessionId,
			sessionKey,
			storePath: sqliteMarker.storePath
		});
	}
	return parseSessionEntries(await fs.readFile(target.sessionFile, "utf-8"));
}
function resolveSqliteMarkerSessionKey(target, marker) {
	const explicitSessionKey = target.sessionKey?.trim();
	if (explicitSessionKey) {
		const explicitEntry = getSessionEntry({
			agentId: marker.agentId,
			sessionKey: explicitSessionKey,
			storePath: marker.storePath
		});
		if (explicitEntry) return explicitEntry.sessionId === marker.sessionId ? explicitSessionKey : void 0;
	}
	return resolveTranscriptSessionKeyBySessionId({
		agentId: marker.agentId,
		sessionId: marker.sessionId,
		storePath: marker.storePath
	});
}
//#endregion
//#region extensions/codex/src/app-server/event-projector-tool-transcript.ts
const ZERO_USAGE = {
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
};
const MISSING_TOOL_RESULT_ERROR = "OpenClaw recorded a native Codex tool.call without a matching tool.result before the turn completed.";
const NATIVE_PATCH_REJECTION_RE = /^\s*patch rejected:\s*writing outside of the project;\s*rejected by user approval settings\s*$/iu;
const CODE_MODE_NATIVE_PATCH_SOURCE_RE = /^\s*(?:\/\/[^\r\n]*\r?\n\s*)?(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*await\s+tools\.apply_patch\(\s*("(?:\\[\s\S]|[^"\\])*")\s*\)\s*;?\s*text\(\s*\1\s*\)\s*;?\s*$/u;
const CODE_MODE_NATIVE_PATCH_RESULT_RE = /^\s*Script (completed|failed)\s*\r?\nWall time\s+\d+(?:\.\d+)?\s+seconds\s*\r?\nOutput:\s*([\s\S]*?)\s*$/iu;
function readCodeModeNativePatchInput(source) {
	if (typeof source !== "string") return;
	const match = CODE_MODE_NATIVE_PATCH_SOURCE_RE.exec(source);
	if (!match?.[2]) return;
	try {
		const patch = JSON.parse(match[2]);
		return typeof patch === "string" && /^\*\*\* Begin Patch\r?\n[\s\S]*\r?\n\*\*\* End Patch(?:\r?\n)?$/u.test(patch) ? patch : void 0;
	} catch {
		return;
	}
}
function readInterceptedNativePatchInput(command) {
	if (typeof command !== "string") return;
	const lines = command.replace(/\r\n?/gu, "\n").split("\n");
	const patchStart = lines.indexOf("*** Begin Patch");
	const invocation = /^[\t ]*(?:cd[\t ]+(?:'([^'\n]+)'|([A-Za-z0-9_./-]+))[\t ]+&&[\t ]+)?apply_patch[\t ]*<<-?[\t ]*'([^'\n]+)'[\t ]*$/u.exec(lines[0] ?? "");
	if (!invocation || patchStart !== 1) return;
	const patchEnd = lines.indexOf("*** End Patch", patchStart + 1);
	const cwd = invocation[1] ?? invocation[2];
	const delimiter = invocation[3];
	if (patchEnd < 0 || lines[patchEnd + 1] !== delimiter || lines.slice(patchEnd + 2).some((line) => line.trim().length > 0)) return;
	return {
		input: `${lines.slice(patchStart, patchEnd + 1).join("\n")}\n`,
		...cwd ? { cwd } : {}
	};
}
var CodexToolTranscriptProjection = class {
	constructor(params, threadId, turnId, progress, nextTranscriptTimestamp, options = {}) {
		this.params = params;
		this.threadId = threadId;
		this.turnId = turnId;
		this.progress = progress;
		this.nextTranscriptTimestamp = nextTranscriptTimestamp;
		this.options = options;
		this.messages = [];
		this.callIds = /* @__PURE__ */ new Set();
		this.resultIds = /* @__PURE__ */ new Set();
		this.namesById = /* @__PURE__ */ new Map();
		this.trajectoryCallIds = /* @__PURE__ */ new Set();
		this.trajectoryResultIds = /* @__PURE__ */ new Set();
		this.trajectoryNamesById = /* @__PURE__ */ new Map();
		this.trajectoryItemsById = /* @__PURE__ */ new Map();
		this.afterToolCallObservedItemIds = /* @__PURE__ */ new Set();
		this.nativeMcpAppResultDetails = /* @__PURE__ */ new Map();
		this.nativeMcpAppResultDetailsAttempted = /* @__PURE__ */ new Set();
		this.rawNativeToolOutputByCallId = /* @__PURE__ */ new Map();
		this.codeModeNativePatchInputsByCallId = /* @__PURE__ */ new Map();
	}
	get transcriptMessages() {
		return this.messages;
	}
	recordDynamicToolCall(params) {
		this.recordToolCall({
			id: params.callId,
			name: params.tool,
			arguments: sanitizeCodexToolArguments(params.arguments)
		});
	}
	recordDynamicToolResult(params, resultContentSource) {
		this.recordToolResult({
			id: params.callId,
			name: params.tool,
			text: collectDynamicToolContentText(params.contentItems),
			isError: !params.success,
			details: params.details,
			...resultContentSource ? { resultContentSource } : {}
		});
	}
	recordNativeToolCall(item) {
		if (!item || !shouldRecordNativeToolTranscript(item)) return;
		const name = itemName(item);
		if (name) this.recordToolCall({
			id: item.id,
			name,
			arguments: itemToolArgs(item)
		});
	}
	recordNativeToolResult(item, details) {
		if (!item || !shouldRecordNativeToolTranscript(item)) return;
		const name = itemName(item);
		if (name) this.recordToolResult({
			id: item.id,
			name,
			text: this.rawNativeToolOutputByCallId.get(item.id) ?? itemTranscriptResultText(item, this.progress.outputTextByItem),
			isError: isNonSuccessItemStatus(itemStatus(item)),
			details,
			...item.type === "webSearch" ? { resultContentSource: "network" } : {}
		});
	}
	recordRawNativeToolItem(item) {
		const type = typeof item.type === "string" ? item.type : void 0;
		const callId = typeof item.call_id === "string" ? item.call_id : typeof item.callId === "string" ? item.callId : void 0;
		if (!callId) return;
		if ((type === "custom_tool_call" || type === "function_call") && (item.name === "apply_patch" || item.name === "exec_command" || item.name === "exec")) {
			let args;
			if (type === "custom_tool_call" && item.name === "apply_patch" && typeof item.input === "string") args = { input: item.input };
			else if (type === "custom_tool_call" && item.name === "exec") {
				const input = readCodeModeNativePatchInput(item.input);
				if (input) this.codeModeNativePatchInputsByCallId.set(callId, input);
				return;
			} else if (type === "function_call" && typeof item.arguments === "string") try {
				const parsed = JSON.parse(item.arguments);
				if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
					const parsedArguments = parsed;
					if (item.name === "apply_patch") args = parsedArguments;
					else {
						const patch = readInterceptedNativePatchInput(typeof parsedArguments.cmd === "string" ? parsedArguments.cmd : typeof parsedArguments.command === "string" ? parsedArguments.command : void 0);
						if (patch) {
							const workdir = typeof parsedArguments.workdir === "string" ? parsedArguments.workdir : typeof parsedArguments.cwd === "string" ? parsedArguments.cwd : void 0;
							const cwd = patch.cwd ? workdir && !path.isAbsolute(patch.cwd) ? path.join(workdir, patch.cwd) : patch.cwd : workdir;
							args = {
								input: patch.input,
								...cwd ? { cwd } : {}
							};
						}
					}
				}
			} catch {
				return;
			}
			if (args) this.recordToolCall({
				id: callId,
				name: "apply_patch",
				arguments: args
			});
			return;
		}
		if (type !== "custom_tool_call_output" && type !== "function_call_output" || this.namesById.get(callId) !== "apply_patch" && !this.codeModeNativePatchInputsByCallId.has(callId)) return;
		const text = typeof item.output === "string" ? item.output : Array.isArray(item.output) ? collectDynamicToolContentText(item.output) : "";
		if (!text.trim()) return;
		const codeModePatchInput = this.codeModeNativePatchInputsByCallId.get(callId);
		if (codeModePatchInput) {
			this.codeModeNativePatchInputsByCallId.delete(callId);
			const execution = CODE_MODE_NATIVE_PATCH_RESULT_RE.exec(text);
			if (execution?.[1]?.toLowerCase() === "completed" && execution[2]?.trim() === "{}") return;
			if (execution?.[1]?.toLowerCase() === "failed") {
				const failure = execution[2]?.replace(/^Script error:\s*/iu, "").trim() || text;
				this.recordToolCall({
					id: callId,
					name: "apply_patch",
					arguments: { input: codeModePatchInput }
				});
				this.recordToolResult({
					id: callId,
					name: "apply_patch",
					text: failure,
					isError: true
				});
			}
			return;
		}
		this.rawNativeToolOutputByCallId.set(callId, text);
		const result = this.messages.find((message) => message.role === "toolResult" && message.toolCallId === callId);
		if (!result) {
			if (NATIVE_PATCH_REJECTION_RE.test(text)) this.recordToolResult({
				id: callId,
				name: "apply_patch",
				text,
				isError: true
			});
			return;
		}
		result.content = this.createToolResultMessage({
			id: callId,
			name: "apply_patch",
			text,
			isError: result.isError === true
		}).content;
	}
	async recordNativeToolResultWithDetails(item) {
		this.recordNativeToolResult(item, await this.prepareNativeMcpAppResultDetails(item));
	}
	async prepareNativeMcpAppResultDetails(item) {
		if (!item || item.type !== "mcpToolCall" || itemStatus(item) === "running") return;
		if (this.nativeMcpAppResultDetails.has(item.id)) return this.nativeMcpAppResultDetails.get(item.id);
		if (this.nativeMcpAppResultDetailsAttempted.has(item.id) || !this.options.prepareNativeMcpAppResultDetails) return;
		this.nativeMcpAppResultDetailsAttempted.add(item.id);
		try {
			const details = await this.options.prepareNativeMcpAppResultDetails(item);
			if (details !== void 0) this.nativeMcpAppResultDetails.set(item.id, details);
			return details;
		} catch (error) {
			log.debug("codex native MCP App preview preparation failed", {
				itemId: item.id,
				error
			});
			return;
		}
	}
	recordTrajectoryEvent(params) {
		if (params.phase === "start") {
			this.trajectoryCallIds.add(params.item.id);
			this.trajectoryNamesById.set(params.item.id, params.name);
			this.trajectoryItemsById.set(params.item.id, params.item);
			this.options.trajectoryRecorder?.recordEvent("tool.call", {
				threadId: this.threadId,
				turnId: this.turnId,
				itemId: params.item.id,
				toolCallId: params.item.id,
				name: params.name,
				arguments: params.args
			});
			return;
		}
		this.trajectoryResultIds.add(params.item.id);
		const toolResult = itemToolResult(params.item).result;
		const output = itemOutputText(params.item, this.progress.outputTextByItem);
		this.options.trajectoryRecorder?.recordEvent("tool.result", {
			threadId: this.threadId,
			turnId: this.turnId,
			itemId: params.item.id,
			toolCallId: params.item.id,
			name: params.name,
			status: params.status,
			isError: isNonSuccessItemStatus(params.status),
			...toolResult ? { result: toolResult } : {},
			...output ? { output } : {}
		});
	}
	emitAfterToolCallObservation(item) {
		if (!this.shouldEmitAfterToolCallObservation(item)) return;
		const name = itemName(item);
		const status = itemStatus(item);
		if (!name || status === "running") return;
		this.afterToolCallObservedItemIds.add(item.id);
		const result = itemToolResult(item).result;
		const error = itemToolError(item, status, this.progress.outputTextByItem);
		const startedAt = resolveStartedAtFromDurationMs(item.durationMs);
		const hookParams = {
			toolName: name,
			toolCallId: item.id,
			runId: this.params.runId,
			agentId: this.params.agentId,
			sessionId: this.params.sessionId,
			sessionKey: this.params.sessionKey,
			startArgs: itemToolArgs(item) ?? {},
			...result !== void 0 ? { result } : {},
			...error ? { error } : {},
			...startedAt !== void 0 ? { startedAt } : {}
		};
		setImmediate(() => {
			runAgentHarnessAfterToolCallHook(hookParams);
		});
	}
	synthesizeMissingToolResults(params) {
		if (!params.synthesize) return;
		const missingTranscriptIds = [...this.callIds].filter((id) => !this.resultIds.has(id));
		const missingTrajectoryIds = [...this.trajectoryCallIds].filter((id) => !this.trajectoryResultIds.has(id));
		if (missingTranscriptIds.length === 0 && missingTrajectoryIds.length === 0) return;
		for (const id of missingTranscriptIds) {
			const name = this.namesById.get(id) ?? this.trajectoryNamesById.get(id);
			if (name) this.recordToolResult({
				id,
				name,
				text: formatMissingToolResultError({
					id,
					name
				}),
				isError: true
			});
		}
		for (const id of missingTrajectoryIds) {
			const name = this.trajectoryNamesById.get(id) ?? this.namesById.get(id);
			if (!name) continue;
			this.trajectoryResultIds.add(id);
			const text = formatMissingToolResultError({
				id,
				name
			});
			this.options.trajectoryRecorder?.recordEvent("tool.result", {
				threadId: this.threadId,
				turnId: this.turnId,
				itemId: id,
				toolCallId: id,
				name,
				status: "failed",
				isError: true,
				result: {
					status: "failed",
					reason: "missing_tool_result"
				},
				output: text
			});
		}
		if (params.terminalDisposition === "tool_error") {
			this.recordMissingToolError(missingTranscriptIds, missingTrajectoryIds);
			return;
		}
		if (params.terminalDisposition === "diagnostic_only") return;
		const missingCount = (/* @__PURE__ */ new Set([...missingTranscriptIds, ...missingTrajectoryIds])).size;
		return missingCount === 1 ? MISSING_TOOL_RESULT_ERROR : `${MISSING_TOOL_RESULT_ERROR} missingToolResultCount=${missingCount}`;
	}
	async readMirroredSessionMessages() {
		return await readCodexMirroredSessionHistoryMessages({
			agentId: this.params.agentId,
			sessionFile: this.params.sessionFile,
			sessionId: this.params.sessionId,
			sessionKey: this.params.sessionKey
		}) ?? [];
	}
	recordToolCall(params) {
		if (!params.id || !params.name || this.callIds.has(params.id)) return;
		this.callIds.add(params.id);
		this.namesById.set(params.id, params.name);
		this.progress.recordTranscriptCall(params);
		this.messages.push(attachCodexMirrorIdentity(this.createToolCallMessage(params), `${this.turnId}:tool:${params.id}:call`));
	}
	recordToolResult(params) {
		if (!params.id || !params.name || this.resultIds.has(params.id)) return;
		this.resultIds.add(params.id);
		this.progress.recordTranscriptResult(params);
		this.messages.push(attachCodexMirrorIdentity(this.createToolResultMessage(params), `${this.turnId}:tool:${params.id}:result`));
	}
	recordMissingToolError(missingTranscriptIds, missingTrajectoryIds) {
		const firstMissingId = missingTranscriptIds.find((id) => Boolean(this.namesById.get(id))) ?? missingTrajectoryIds.find((id) => Boolean(this.trajectoryNamesById.get(id) ?? this.namesById.get(id)));
		if (!firstMissingId) return;
		const name = this.namesById.get(firstMissingId) ?? this.trajectoryNamesById.get(firstMissingId);
		if (!name) return;
		const item = this.trajectoryItemsById.get(firstMissingId);
		const meta = item ? itemMeta(item, this.progress.toolProgressDetailMode()) : this.progress.getToolMeta(firstMissingId)?.meta;
		const actionFingerprint = item ? nativeToolActionFingerprint(item) : void 0;
		this.progress.setLastToolError({
			toolName: name,
			...meta ? { meta } : {},
			error: formatMissingToolResultError({
				id: firstMissingId,
				name
			}),
			...item && isMutatingNativeToolItem(item) ? { mutatingAction: true } : {},
			...actionFingerprint ? { actionFingerprint } : {}
		});
	}
	shouldEmitAfterToolCallObservation(item) {
		if (!shouldSynthesizeToolProgressForItem(item) || this.afterToolCallObservedItemIds.has(item.id)) return false;
		return !(this.options.nativePostToolUseRelayEnabled && isNativePostToolUseRelayItem(item));
	}
	createToolCallMessage(params) {
		const args = normalizeToolTranscriptArguments(params.arguments);
		const attribution = resolveCodexLocalRuntimeAttribution(this.params);
		return {
			role: "assistant",
			content: [{
				type: "toolCall",
				id: params.id,
				name: params.name,
				arguments: args,
				input: args
			}],
			api: attribution.api ?? "openai-chatgpt-responses",
			provider: attribution.provider,
			model: this.params.modelId,
			usage: ZERO_USAGE,
			stopReason: "toolUse",
			timestamp: this.nextTranscriptTimestamp()
		};
	}
	createToolResultMessage(params) {
		const text = truncateToolTranscriptText(params.text?.trim() || toolResultStatusText(params));
		return {
			role: "toolResult",
			toolCallId: params.id,
			toolName: params.name,
			isError: params.isError,
			content: [{
				type: "toolResult",
				id: params.id,
				name: params.name,
				toolName: params.name,
				toolCallId: params.id,
				toolUseId: params.id,
				tool_use_id: params.id,
				content: text,
				text
			}],
			...params.details !== void 0 ? { details: params.details } : {},
			...params.resultContentSource ? { __openclaw: { resultContentSource: params.resultContentSource } } : {},
			timestamp: this.nextTranscriptTimestamp()
		};
	}
};
function formatMissingToolResultError(params) {
	return `${MISSING_TOOL_RESULT_ERROR} toolCallId=${params.id}; toolName=${params.name}`;
}
function toolResultStatusText(params) {
	return params.isError ? `${params.name} failed` : `${params.name} completed`;
}
function resolveStartedAtFromDurationMs(durationMs) {
	if (typeof durationMs !== "number" || !Number.isFinite(durationMs)) return;
	return asDateTimestampMs(Date.now() - Math.max(0, durationMs));
}
//#endregion
//#region extensions/codex/src/app-server/event-projector-events.ts
var CodexEventProjection = class {
	constructor(threadId, turnId, emitAgentEvent, toolProgress, toolTranscript, onNativeToolResultRecorded) {
		this.threadId = threadId;
		this.turnId = turnId;
		this.emitAgentEvent = emitAgentEvent;
		this.toolProgress = toolProgress;
		this.toolTranscript = toolTranscript;
		this.onNativeToolResultRecorded = onNativeToolResultRecorded;
		this.reviewCount = 0;
	}
	get guardianReviewCount() {
		return this.reviewCount;
	}
	handleGuardianReview(method, params) {
		this.reviewCount += 1;
		const review = isJsonObject(params.review) ? params.review : void 0;
		const action = isJsonObject(params.action) ? params.action : void 0;
		this.emitAgentEvent({
			stream: "codex_app_server.guardian",
			data: {
				method,
				phase: method.endsWith("/started") ? "started" : "completed",
				reviewId: readString$6(params, "reviewId"),
				targetItemId: readNullableString$1(params, "targetItemId"),
				decisionSource: readString$6(params, "decisionSource"),
				status: review ? readString$6(review, "status") : void 0,
				riskLevel: review ? readString$6(review, "riskLevel") : void 0,
				userAuthorization: review ? readString$6(review, "userAuthorization") : void 0,
				rationale: review ? readNullableString$1(review, "rationale") : void 0,
				actionType: action ? readString$6(action, "type") : void 0
			}
		});
	}
	handleGuardianWarning(params) {
		this.emitAgentEvent({
			stream: "codex_app_server.guardian",
			data: {
				phase: "warning",
				message: readString$6(params, "message")
			}
		});
	}
	handleHook(method, params) {
		const run = isJsonObject(params.run) ? params.run : void 0;
		if (!run) return;
		const durationMs = readNumber(run, "durationMs");
		const entries = readHookOutputEntries(run.entries);
		const hookTurnId = readNullableString$1(params, "turnId");
		this.emitAgentEvent({
			stream: "codex_app_server.hook",
			data: {
				phase: method === "hook/started" ? "started" : "completed",
				threadId: this.threadId,
				turnId: hookTurnId === void 0 ? this.turnId : hookTurnId,
				hookRunId: readString$6(run, "id"),
				eventName: readString$6(run, "eventName"),
				handlerType: readString$6(run, "handlerType"),
				executionMode: readString$6(run, "executionMode"),
				scope: readString$6(run, "scope"),
				source: readString$6(run, "source"),
				sourcePath: readString$6(run, "sourcePath"),
				status: readString$6(run, "status"),
				statusMessage: readNullableString$1(run, "statusMessage"),
				...durationMs !== void 0 ? { durationMs } : {},
				...entries.length > 0 ? { entries } : {}
			}
		});
	}
	emitStandardItemEvent(params) {
		const { item } = params;
		if (!item) return;
		const kind = itemKind(item);
		if (!kind) return;
		const meta = itemMeta(item, this.toolProgress.toolProgressDetailMode());
		const suppressChannelProgress = shouldSuppressChannelProgressForItem(item);
		this.emitAgentEvent({
			stream: "item",
			data: {
				itemId: item.id,
				phase: params.phase,
				kind,
				title: itemTitle(item),
				status: params.phase === "start" ? "running" : itemStatus(item),
				...itemName(item) ? { name: itemName(item) } : {},
				...meta ? { meta } : {},
				...suppressChannelProgress ? { suppressChannelProgress: true } : {}
			}
		});
	}
	async emitNormalizedToolItemEvent(params) {
		const { item } = params;
		if (!item || !shouldSynthesizeToolProgressForItem(item)) return;
		const name = itemName(item);
		if (!name) return;
		const status = params.phase === "result" ? itemStatus(item) : "running";
		const args = itemToolArgs(item);
		const meta = itemMeta(item, this.toolProgress.toolProgressDetailMode());
		this.toolTranscript.recordTrajectoryEvent({
			phase: params.phase,
			item,
			name,
			args,
			status
		});
		if (params.phase === "result") this.toolProgress.recordNativeToolError({
			item,
			name,
			meta,
			status
		});
		if (!shouldEmitTranscriptToolProgress(name, args)) {
			if (params.phase === "result") {
				this.toolTranscript.emitAfterToolCallObservation(item);
				await this.onNativeToolResultRecorded?.();
			}
			return;
		}
		this.emitAgentEvent({
			stream: "tool",
			data: {
				phase: params.phase,
				name,
				itemId: item.id,
				toolCallId: item.id,
				...meta ? { meta } : {},
				...params.phase === "start" && args ? { args } : {},
				...params.phase === "result" ? {
					status,
					isError: isNonSuccessItemStatus(status),
					...itemToolResult(item)
				} : {}
			}
		});
		if (params.phase === "result") {
			this.toolTranscript.emitAfterToolCallObservation(item);
			await this.onNativeToolResultRecorded?.();
		}
	}
};
//#endregion
//#region extensions/codex/src/app-server/event-projector-media.ts
const GENERATED_IMAGE_MEDIA_SUBDIR = "tool-image-generation";
var CodexGeneratedMediaProjection = class {
	constructor(config, remote) {
		this.config = config;
		this.remote = remote;
		this.itemIds = /* @__PURE__ */ new Set();
		this.urlsByItemId = /* @__PURE__ */ new Map();
		this.gatewayMaterializedItemIds = /* @__PURE__ */ new Set();
		this.pendingMaterializationsByItemId = /* @__PURE__ */ new Map();
	}
	hasGeneratedMedia() {
		return this.itemIds.size > 0;
	}
	async recordNative(item) {
		if (item?.type !== "imageGeneration") return;
		this.itemIds.add(item.id);
		const result = readItemString(item, "result");
		if (result) {
			await this.recordImage({
				itemId: item.id,
				result,
				revisedPrompt: readItemString(item, "revisedPrompt"),
				source: "native"
			});
			return;
		}
		const savedPath = readItemString(item, "savedPath")?.trim();
		if (savedPath) {
			if (this.remote?.remoteWorkspaceRoot) {
				if (!this.remote.readFile) {
					log.warn("codex remote image has no app-server file transfer", { itemId: item.id });
					return;
				}
				try {
					const response = await this.remote.readFile({
						path: savedPath,
						maxBytes: resolveGeneratedMediaMaxBytes(this.config, "image"),
						signal: this.remote.signal,
						timeoutMs: this.remote.requestTimeoutMs
					});
					if (!response || typeof response.dataBase64 !== "string" || !response.dataBase64) {
						log.warn("codex remote image file returned no inline bytes", { itemId: item.id });
						return;
					}
					await this.recordImage({
						itemId: item.id,
						result: response.dataBase64,
						revisedPrompt: readItemString(item, "revisedPrompt"),
						source: "native"
					});
				} catch (error) {
					log.warn("codex app-server remote image file read failed", {
						itemId: item.id,
						error
					});
				}
				return;
			}
			this.recordUrl({
				itemId: item.id,
				mediaUrl: savedPath
			});
		}
	}
	async recordRaw(item) {
		if (readString$6(item, "type") !== "image_generation_call") return;
		const result = readString$6(item, "result");
		if (!result) return;
		const itemId = readString$6(item, "id") ?? `raw-image-${this.itemIds.size}`;
		await this.recordImage({
			itemId,
			result,
			revisedPrompt: readString$6(item, "revised_prompt") ?? readString$6(item, "revisedPrompt"),
			source: "raw"
		});
	}
	async recordImage(params) {
		this.itemIds.add(params.itemId);
		if (this.gatewayMaterializedItemIds.has(params.itemId)) return;
		let pending = this.pendingMaterializationsByItemId.get(params.itemId);
		while (pending) {
			await pending;
			if (this.gatewayMaterializedItemIds.has(params.itemId)) return;
			pending = this.pendingMaterializationsByItemId.get(params.itemId);
		}
		const materialization = this.materializeImage(params);
		this.pendingMaterializationsByItemId.set(params.itemId, materialization);
		try {
			await materialization;
		} finally {
			if (this.pendingMaterializationsByItemId.get(params.itemId) === materialization) this.pendingMaterializationsByItemId.delete(params.itemId);
		}
	}
	async materializeImage(params) {
		const maxBytes = resolveGeneratedMediaMaxBytes(this.config, "image");
		const estimatedDecodedBytes = estimateBase64DecodedBytes(params.result);
		if (estimatedDecodedBytes !== void 0 && estimatedDecodedBytes > maxBytes) {
			log.warn(`codex app-server ${params.source} image generation result exceeds media limit`, {
				itemId: params.itemId,
				estimatedDecodedBytes,
				maxBytes
			});
			return;
		}
		const asset = generatedImageAssetFromBase64({
			base64: params.result,
			index: this.itemIds.size,
			revisedPrompt: params.revisedPrompt,
			fileNamePrefix: "codex-image-generation",
			sniffMimeType: true
		});
		if (!asset) return;
		try {
			const saved = await saveMediaBuffer(asset.buffer, asset.mimeType, GENERATED_IMAGE_MEDIA_SUBDIR, maxBytes, asset.fileName);
			this.gatewayMaterializedItemIds.add(params.itemId);
			this.recordUrl({
				itemId: params.itemId,
				mediaUrl: saved.path,
				replaceExisting: true
			});
		} catch (error) {
			log.warn(`codex app-server ${params.source} image generation result save failed`, {
				itemId: params.itemId,
				error
			});
		}
	}
	buildToolMediaUrls(params) {
		const mediaUrls = new Set(params.toolMediaUrls?.map((url) => url.trim()).filter(Boolean) ?? []);
		if ((params.messagingToolSentMediaUrls?.length ?? 0) === 0) for (const mediaUrl of this.urlsByItemId.values()) mediaUrls.add(mediaUrl);
		return mediaUrls.size > 0 ? [...mediaUrls] : params.toolMediaUrls;
	}
	buildHostOwnedMediaUrls(params) {
		if ((params.messagingToolSentMediaUrls?.length ?? 0) > 0) return;
		const mediaUrls = [...this.urlsByItemId.values()];
		return mediaUrls.length > 0 ? mediaUrls : void 0;
	}
	recordUrl(params) {
		if (this.urlsByItemId.has(params.itemId) && params.replaceExisting !== true) {
			this.itemIds.add(params.itemId);
			return;
		}
		this.urlsByItemId.set(params.itemId, params.mediaUrl);
		this.itemIds.add(params.itemId);
	}
};
function estimateBase64DecodedBytes(base64) {
	let nonWhitespaceLength = 0;
	let previousCode = -1;
	let lastCode = -1;
	for (let i = 0; i < base64.length; i += 1) {
		const code = base64.charCodeAt(i);
		if (isBase64WhitespaceCode(code)) continue;
		nonWhitespaceLength += 1;
		previousCode = lastCode;
		lastCode = code;
	}
	if (nonWhitespaceLength === 0) return;
	const equalsCode = "=".charCodeAt(0);
	const padding = lastCode === equalsCode ? previousCode === equalsCode ? 2 : 1 : 0;
	return Math.max(0, Math.floor(nonWhitespaceLength * 3 / 4) - padding);
}
function isBase64WhitespaceCode(code) {
	return code === 32 || code === 9 || code === 10 || code === 13;
}
//#endregion
//#region extensions/codex/src/app-server/event-projector-reasoning.ts
var CodexReasoningProjection = class {
	constructor(params, emitAgentEvent) {
		this.params = params;
		this.emitAgentEvent = emitAgentEvent;
		this.reasoningTextByGroup = /* @__PURE__ */ new Map();
		this.reasoningItemOrder = /* @__PURE__ */ new Map();
		this.planTextByItem = /* @__PURE__ */ new Map();
		this.reasoningStarted = false;
		this.reasoningEnded = false;
	}
	async handleReasoningDelta(method, params) {
		const itemId = readString$6(params, "itemId") ?? "reasoning";
		const delta = readString$6(params, "delta") ?? "";
		if (!delta) return;
		this.reasoningStarted = true;
		if (!this.reasoningItemOrder.has(itemId)) this.reasoningItemOrder.set(itemId, this.reasoningItemOrder.size);
		const groupIndex = method === "item/reasoning/textDelta" ? readNonNegativeInteger(params, "contentIndex") ?? 0 : readNonNegativeInteger(params, "summaryIndex") ?? 0;
		const groupKey = `${method}\0${itemId}\0${groupIndex}`;
		const current = this.reasoningTextByGroup.get(groupKey);
		this.reasoningTextByGroup.set(groupKey, {
			itemId,
			method,
			index: groupIndex,
			text: `${current?.text ?? ""}${delta}`
		});
		await this.params.onReasoningStream?.({
			text: this.reasoningText(),
			isReasoningSnapshot: true
		});
	}
	handlePlanDelta(params) {
		const itemId = readString$6(params, "itemId") ?? "plan";
		const delta = readString$6(params, "delta") ?? "";
		if (!delta) return;
		const text = `${this.planTextByItem.get(itemId) ?? ""}${delta}`;
		this.planTextByItem.set(itemId, text);
		this.emitPlanUpdate({
			explanation: void 0,
			steps: splitPlanText(text).map((step) => ({
				step,
				status: "pending"
			}))
		});
	}
	handleTurnPlanUpdated(params) {
		const explanation = readNullableString$1(params, "explanation");
		const plan = Array.isArray(params.plan) ? params.plan.flatMap((entry) => {
			if (!entry || typeof entry !== "object" || Array.isArray(entry)) return [];
			const record = entry;
			const step = readString$6(record, "step");
			if (!step) return [];
			return [{
				step,
				status: normalizePlanStepStatus(readString$6(record, "status"))
			}];
		}) : void 0;
		const planText = [explanation, ...(plan ?? []).map(({ step, status }) => `- [${status}] ${step}`)].filter((part) => Boolean(part)).join("\n");
		if (planText) this.turnPlanText = planText;
		this.emitPlanUpdate({
			explanation,
			steps: plan
		});
	}
	recordItem(item) {
		if (item?.type === "plan" && typeof item.text === "string" && item.text) {
			this.planTextByItem.set(item.id, item.text);
			this.emitPlanUpdate({
				explanation: void 0,
				steps: splitPlanText(item.text).map((step) => ({
					step,
					status: "pending"
				}))
			});
		}
	}
	async maybeEndReasoning() {
		if (!this.reasoningStarted || this.reasoningEnded) return;
		this.reasoningEnded = true;
		await this.params.onReasoningEnd?.();
	}
	reasoningText() {
		return collectReasoningTextValues(this.reasoningTextByGroup, this.reasoningItemOrder).join("\n\n");
	}
	planText() {
		return this.turnPlanText ?? [...this.planTextByItem.values()].filter((text) => text.trim().length > 0).join("\n\n");
	}
	emitPlanUpdate(params) {
		if (!params.explanation && (!params.steps || params.steps.length === 0)) return;
		this.emitAgentEvent({
			stream: "plan",
			data: {
				phase: "update",
				title: "Plan updated",
				source: "codex-app-server",
				...params.explanation ? { explanation: params.explanation } : {},
				...params.steps && params.steps.length > 0 ? { steps: params.steps } : {}
			}
		});
	}
};
function normalizePlanStepStatus(status) {
	if (status === "inProgress" || status === "in_progress") return "in_progress";
	return status === "completed" ? "completed" : "pending";
}
function collectReasoningTextValues(groups, itemOrder) {
	return [...groups.values()].toSorted((left, right) => {
		const itemDelta = (itemOrder.get(left.itemId) ?? Number.MAX_SAFE_INTEGER) - (itemOrder.get(right.itemId) ?? Number.MAX_SAFE_INTEGER);
		if (itemDelta !== 0) return itemDelta;
		const methodDelta = reasoningMethodOrder(left.method) - reasoningMethodOrder(right.method);
		return methodDelta !== 0 ? methodDelta : left.index - right.index;
	}).map((group) => group.text).filter((text) => text.trim().length > 0);
}
function reasoningMethodOrder(method) {
	return method === "item/reasoning/summaryTextDelta" ? 0 : 1;
}
//#endregion
//#region extensions/codex/src/app-server/event-projector-snapshot.ts
function readTurnTaintMetadata(message) {
	const metadata = message["__openclaw"];
	return metadata && typeof metadata === "object" && !Array.isArray(metadata) ? metadata : void 0;
}
function applyStickyTurnTaint(messages) {
	let tainted = false;
	return messages.map((message) => {
		if (message.role === "user") {
			tainted = false;
			return message;
		}
		const metadata = readTurnTaintMetadata(message);
		tainted ||= metadata?.turnTainted === true || metadata?.resultContentSource === "network";
		return message.role === "assistant" && tainted ? {
			...message,
			__openclaw: {
				...metadata,
				turnTainted: true
			}
		} : message;
	});
}
function buildCodexMessagesSnapshot(params) {
	const messages = promptSnapshot(params.runParams, params.turnId, params.upstreamUserText);
	if (params.reasoningText) messages.push(attachCodexMirrorIdentity(params.createAssistantMirrorMessage("Codex reasoning", params.reasoningText), `${params.turnId}:reasoning`));
	if (params.planText) messages.push(attachCodexMirrorIdentity(params.createAssistantMirrorMessage("Codex plan", params.planText), `${params.turnId}:plan`));
	const visibleWorkMessages = [...params.runParams.config?.ui?.prefs?.chatPersistCommentary === false ? [] : params.commentaryMessages.map(({ itemId, message }) => attachCodexMirrorIdentity(message, `${params.turnId}:commentary:${itemId}`)), ...params.toolMessages].toSorted((left, right) => (asDateTimestampMs(left.timestamp) ?? 0) - (asDateTimestampMs(right.timestamp) ?? 0));
	messages.push(...visibleWorkMessages);
	if (params.lastAssistant) messages.push(attachCodexMirrorIdentity(params.lastAssistant, `${params.turnId}:assistant`));
	return applyStickyTurnTaint(messages).map((message) => projectAgentHarnessTranscriptMessageForDisplay({
		hidden: params.runParams.trigger === "memory",
		message
	}));
}
//#endregion
//#region extensions/codex/src/app-server/usage-limit-error.ts
/**
* Enriches Codex usage-limit failures with current rate-limit information and
* marks blocked auth profiles when Codex exposes a reset time.
*/
const CODEX_USAGE_LIMIT_RATE_LIMIT_REFRESH_TIMEOUT_MS = 5e3;
function createCodexUsageLimitPromptError(message) {
	return Object.assign(new Error(message), { status: 429 });
}
function isCodexUsageLimitPromptError(error) {
	return error instanceof Error && "status" in error && error.status === 429;
}
/** Marks a Codex auth profile blocked until the reset time advertised by rate limits. */
async function markCodexAuthProfileBlockedFromRateLimits(params) {
	const authProfileId = params.authProfileId?.trim();
	if (!authProfileId || !params.params.authProfileStore) return;
	const blockedUntil = resolveCodexUsageLimitResetAtMs(params.rateLimits);
	if (!blockedUntil) return;
	try {
		await markAuthProfileBlockedUntil({
			store: params.params.authProfileStore,
			profileId: authProfileId,
			blockedUntil,
			source: "codex_rate_limits",
			agentDir: params.params.agentDir,
			runId: params.params.runId,
			modelId: params.params.modelId
		});
	} catch (error) {
		log.debug("failed to mark Codex auth profile blocked from app-server limits", {
			authProfileId,
			error: formatErrorMessage(error)
		});
	}
}
/** Formats a turn-start usage-limit error, refreshing rate limits when needed. */
async function formatCodexTurnStartUsageLimitError(params) {
	return refreshCodexUsageLimitError({
		client: params.client,
		source: readCodexTurnStartUsageLimitErrorSource(params.client, params.error, params.errorNotification, params.rateLimitsRevisionBeforeTurnStart),
		timeoutMs: params.timeoutMs,
		signal: params.signal
	});
}
/** Refreshes a generic prompt usage-limit message into a reset-aware message. */
async function refreshCodexUsageLimitPromptError(params) {
	if (!shouldRefreshCodexRateLimitsForUsageLimitMessage(params.message)) return;
	return refreshCodexUsageLimitError({
		client: params.client,
		source: {
			message: params.message,
			codexErrorInfo: "usageLimitExceeded",
			rateLimits: readRecentCodexRateLimits(params.client)
		},
		timeoutMs: params.timeoutMs,
		signal: params.signal
	});
}
async function refreshCodexUsageLimitError(params) {
	const initialMessage = formatCodexUsageLimitErrorMessage(params.source);
	if (!shouldRefreshCodexRateLimitsForUsageLimitMessage(initialMessage)) return initialMessage ? {
		message: initialMessage,
		...params.source.rateLimitsTrustedForProfile ? { rateLimitsForProfile: params.source.rateLimits } : {}
	} : void 0;
	const rateLimits = await readCodexRateLimitsFromAppServerForUsageLimitError({
		client: params.client,
		timeoutMs: params.timeoutMs,
		signal: params.signal
	});
	if (!rateLimits) return initialMessage ? {
		message: initialMessage,
		...params.source.rateLimitsTrustedForProfile ? { rateLimitsForProfile: params.source.rateLimits } : {}
	} : void 0;
	const message = formatCodexUsageLimitErrorMessage({
		message: params.source.message,
		codexErrorInfo: params.source.codexErrorInfo,
		rateLimits,
		rateLimitsAuthoritative: true
	}) ?? initialMessage;
	return message ? {
		message,
		rateLimitsForProfile: rateLimits
	} : void 0;
}
async function readCodexRateLimitsFromAppServerForUsageLimitError(params) {
	if (params.signal?.aborted) return;
	try {
		const rateLimits = await params.client.request(CODEX_CONTROL_METHODS.rateLimits, void 0, {
			timeoutMs: resolveCodexUsageLimitRateLimitRefreshTimeoutMs(params.timeoutMs),
			signal: params.signal
		});
		rememberCodexRateLimitsRead(params.client, rateLimits);
		return rateLimits;
	} catch (error) {
		log.debug("codex app-server rate-limit refresh failed after usage-limit error", { error: formatErrorMessage(error) });
		return;
	}
}
function resolveCodexUsageLimitRateLimitRefreshTimeoutMs(timeoutMs) {
	if (timeoutMs === void 0 || !Number.isFinite(timeoutMs) || timeoutMs <= 0) return CODEX_USAGE_LIMIT_RATE_LIMIT_REFRESH_TIMEOUT_MS;
	return Math.max(100, Math.min(timeoutMs, CODEX_USAGE_LIMIT_RATE_LIMIT_REFRESH_TIMEOUT_MS));
}
function readCodexTurnStartUsageLimitErrorSource(client, error, errorNotification, rateLimitsRevisionBeforeTurnStart) {
	const notificationError = readCodexErrorNotification(errorNotification);
	const errorPayload = readCodexErrorPayload(error);
	const rateLimits = errorPayload.rateLimits ?? readRecentCodexRateLimits(client);
	const cacheUpdatedDuringTurnStart = rateLimitsRevisionBeforeTurnStart !== void 0 && readCodexRateLimitsRevision(client) > rateLimitsRevisionBeforeTurnStart;
	return {
		message: notificationError?.message ?? errorPayload.message ?? formatErrorMessage(error),
		codexErrorInfo: notificationError?.codexErrorInfo ?? errorPayload.codexErrorInfo,
		rateLimits,
		rateLimitsTrustedForProfile: errorPayload.rateLimits !== void 0 || cacheUpdatedDuringTurnStart
	};
}
function readCodexErrorNotification(notification) {
	if (notification?.method !== "error" || !isJsonObject(notification.params)) return;
	const error = notification.params.error;
	return isJsonObject(error) ? {
		message: readString$5(error, "message"),
		codexErrorInfo: error.codexErrorInfo
	} : void 0;
}
function readCodexErrorPayload(error) {
	const message = error instanceof Error ? error.message : void 0;
	if (!error || typeof error !== "object" || !("data" in error)) return { message };
	const data = error.data;
	if (!isJsonObject(data)) return { message };
	const nestedError = isJsonObject(data.error) ? data.error : data;
	const rateLimits = nestedError.rateLimits ?? data.rateLimits;
	return {
		message: readString$5(nestedError, "message") ?? message,
		codexErrorInfo: nestedError.codexErrorInfo,
		rateLimits
	};
}
function readString$5(record, key) {
	const value = record[key];
	return typeof value === "string" ? value : void 0;
}
//#endregion
//#region extensions/codex/src/app-server/event-projector.ts
var CodexAppServerEventProjector = class {
	constructor(params, threadId, turnId, options = {}) {
		this.params = params;
		this.threadId = threadId;
		this.turnId = turnId;
		this.options = options;
		this.activeItemIds = /* @__PURE__ */ new Set();
		this.completedItemIds = /* @__PURE__ */ new Set();
		this.activeCompactionItemIds = /* @__PURE__ */ new Set();
		this.terminalPresentationClearedItemIds = /* @__PURE__ */ new Set();
		this.nativeToolOutcomeOrdinals = /* @__PURE__ */ new Map();
		this.promptErrorSource = null;
		this.synthesizedMissingToolResultError = null;
		this.aborted = false;
		this.responseCompletions = new CodexResponseCompletionProjection();
		this.completedCompactionCount = 0;
		this.lastTranscriptTimestamp = 0;
		this.diagnostics = new CodexProjectionDiagnostics(threadId, turnId);
		this.nativeToolLifecycleProjector = new CodexNativeToolLifecycleProjector(params, threadId, turnId, { runAbortSignal: options.runAbortSignal });
		this.generatedMediaProjection = new CodexGeneratedMediaProjection(params.config, {
			remoteWorkspaceRoot: options.remoteWorkspaceRoot,
			readFile: options.readRemoteWorkspaceFile,
			requestTimeoutMs: options.remoteWorkspaceRequestTimeoutMs,
			signal: options.runAbortSignal
		});
		this.toolProgressProjection = new CodexToolProgressProjection(params);
		this.toolTranscriptProjection = new CodexToolTranscriptProjection(params, threadId, turnId, this.toolProgressProjection, () => this.nextTranscriptTimestamp(), {
			nativePostToolUseRelayEnabled: options.nativePostToolUseRelayEnabled,
			prepareNativeMcpAppResultDetails: options.prepareNativeMcpAppResultDetails,
			trajectoryRecorder: options.trajectoryRecorder
		});
		this.eventProjection = new CodexEventProjection(threadId, turnId, (event) => this.emitAgentEvent(event), this.toolProgressProjection, this.toolTranscriptProjection, options.onNativeToolResultRecorded);
		this.assistantProjection = new CodexAssistantProjection(params, (event) => this.emitAgentEvent(event), (text) => this.toolProgressProjection.matchesEcho(text), () => this.nextTranscriptTimestamp());
		this.reasoningProjection = new CodexReasoningProjection(params, (event) => this.emitAgentEvent(event));
	}
	nextTranscriptTimestamp() {
		this.lastTranscriptTimestamp = Math.max(Date.now(), this.lastTranscriptTimestamp + 1);
		return this.lastTranscriptTimestamp;
	}
	getCompletedTurnStatus() {
		return this.completedTurn?.status;
	}
	hasCompletedTerminalAssistantText() {
		return this.assistantProjection.hasCompletedTerminalAssistantText(this.completedItemIds);
	}
	getLatestTerminalAssistantCandidate() {
		return this.assistantProjection.getLatestTerminalAssistantCandidate();
	}
	hasLatestTerminalAssistantCandidateText() {
		return this.assistantProjection.hasLatestTerminalAssistantCandidateText();
	}
	canReleaseLatestTerminalAssistantAfterToolHandoff() {
		return this.assistantProjection.canReleaseLatestTerminalAssistantAfterToolHandoff();
	}
	/** Restores a completed final item after only the enclosing turn timeout fired. */
	recoverCompletedTerminalAssistantAfterTurnWatchTimeout() {
		if (!this.aborted || this.promptError !== "codex app-server attempt timed out" || !this.hasCompletedTerminalAssistantText()) return false;
		this.aborted = false;
		this.promptError = void 0;
		this.promptErrorSource = null;
		return true;
	}
	/** Resolves the shared model-order position for a native tool item. */
	recordNativeToolOutcome(item) {
		if (!item || this.nativeToolOutcomeOrdinals.has(item.id) || !shouldClearTerminalPresentationForNativeItem(item)) return;
		const ordinal = this.params.allocateToolOutcomeOrdinal?.(item.id);
		if (ordinal !== void 0) this.nativeToolOutcomeOrdinals.set(item.id, ordinal);
	}
	recordNativeToolApprovalFailure(toolCallId, disposition) {
		this.nativeToolLifecycleProjector.recordApprovalFailureDisposition(toolCallId, disposition);
	}
	recordNativeToolPreToolUseFailure(failure) {
		this.nativeToolLifecycleProjector.recordPreToolUseFailure(failure);
	}
	async handleNotification(notification) {
		const params = isJsonObject(notification.params) ? notification.params : void 0;
		if (!params) return;
		if (isHookNotificationMethod(notification.method)) {
			if (!this.isHookNotificationForCurrentThread(params)) return;
		} else if (notification.method === "guardianWarning") {
			if (readCodexNotificationThreadId(params) !== this.threadId) return;
		} else if (!this.isNotificationForTurn(params)) return;
		this.nativeToolLifecycleProjector.handleNotification(notification);
		switch (notification.method) {
			case "item/agentMessage/delta":
				await this.assistantProjection.handleAssistantDelta(params);
				break;
			case "item/reasoning/summaryTextDelta":
			case "item/reasoning/textDelta":
				await this.reasoningProjection.handleReasoningDelta(notification.method, params);
				break;
			case "item/plan/delta":
				this.reasoningProjection.handlePlanDelta(params);
				break;
			case "turn/plan/updated":
				this.reasoningProjection.handleTurnPlanUpdated(params);
				break;
			case "item/started":
				await this.handleItemStarted(params);
				break;
			case "item/completed":
				await this.handleItemCompleted(params);
				break;
			case "item/commandExecution/outputDelta":
				this.toolProgressProjection.handleOutputDelta(params, "bash");
				break;
			case "item/autoApprovalReview/started":
			case "item/autoApprovalReview/completed":
				this.eventProjection.handleGuardianReview(notification.method, params);
				break;
			case "guardianWarning":
				this.eventProjection.handleGuardianWarning(params);
				break;
			case "hook/started":
			case "hook/completed":
				this.eventProjection.handleHook(notification.method, params);
				break;
			case "thread/tokenUsage/updated":
				projectCodexThreadUsageUpdate(params, this.tokenUsage, (usage) => this.tokenUsage = usage, (data) => this.emitAgentEvent({
					stream: "codex_app_server.usage",
					data
				}));
				break;
			case "turn/completed":
				await this.handleTurnCompleted(params);
				break;
			case "rawResponse/completed":
				this.responseCompletions.record(params);
				break;
			case "rawResponseItem/completed":
				await this.handleRawResponseItemCompleted(params);
				break;
			case "error":
				this.responseCompletions.clear();
				if (params.willRetry === true) break;
				this.promptError = this.formatCodexErrorMessage(params) ?? "codex app-server error";
				this.promptErrorSource = "prompt";
				break;
			case "thread/compacted":
			case "turn/started":
			case "turn/diff/updated":
			case "item/reasoning/summaryPartAdded":
			case "item/commandExecution/terminalInteraction":
			case "item/fileChange/outputDelta":
			case "item/fileChange/patchUpdated":
			case "item/mcpToolCall/progress":
			case "model/rerouted":
			case "model/verification":
			case "turn/moderationMetadata":
			case "model/safetyBuffering/updated": break;
			default:
				this.diagnostics.warnUnknownEvent(notification, params);
				break;
		}
	}
	buildResult(toolTelemetry, options) {
		this.nativeToolLifecycleProjector.finalizeActive();
		const assistantTexts = this.assistantProjection.collectAssistantTexts();
		const commentaryMessages = this.assistantProjection.collectCommentaryMessages();
		const reasoningText = this.reasoningProjection.reasoningText();
		const planText = this.reasoningProjection.planText();
		const completedUsage = this.responseCompletions.usage ?? this.tokenUsage;
		const projectedUsage = this.aborted ? this.tokenUsage : completedUsage;
		const hasAssistantItemText = this.assistantProjection.hasAssistantItemTextForSynthesis();
		const legacyFailClosed = !this.completedTurn || this.completedTurn.status !== "completed" || hasAssistantItemText;
		const hasDeliverableAssistantOnCompletedTurn = this.completedTurn?.status === "completed" && assistantTexts.some((text) => text.trim().length > 0);
		const synthesizedMissingToolResultError = this.toolTranscriptProjection.synthesizeMissingToolResults({
			synthesize: legacyFailClosed,
			terminalDisposition: this.aborted ? "tool_error" : hasDeliverableAssistantOnCompletedTurn ? "diagnostic_only" : "prompt_error"
		});
		if (synthesizedMissingToolResultError) {
			this.synthesizedMissingToolResultError = synthesizedMissingToolResultError;
			this.promptErrorSource = this.promptErrorSource ?? "prompt";
		}
		const assistantMessageOptions = {
			tokenUsage: projectedUsage,
			aborted: this.aborted,
			promptError: this.promptError
		};
		const lastAssistant = assistantTexts.length ? this.assistantProjection.createAssistantMessage(assistantTexts.join("\n\n"), assistantMessageOptions) : void 0;
		const currentAttemptAssistant = this.assistantProjection.createCurrentAttemptAssistantMessage(assistantMessageOptions);
		const messagesSnapshot = buildCodexMessagesSnapshot({
			runParams: this.params,
			turnId: this.turnId,
			upstreamUserText: this.options.upstreamUserText,
			reasoningText,
			planText,
			commentaryMessages,
			toolMessages: this.toolTranscriptProjection.transcriptMessages,
			lastAssistant,
			createAssistantMirrorMessage: (title, text) => this.assistantProjection.createAssistantMirrorMessage(title, text)
		});
		const turnFailed = this.completedTurn?.status === "failed";
		const promptError = this.promptError ?? this.synthesizedMissingToolResultError ?? (turnFailed ? this.completedTurn?.error?.message ?? "codex app-server turn failed" : null);
		const agentHarnessResultClassification = classifyAgentHarnessTerminalOutcome({
			assistantTexts,
			reasoningText,
			planText,
			promptError,
			turnCompleted: Boolean(this.completedTurn)
		});
		const toolMetas = this.toolProgressProjection.toolMetas;
		const hadPotentialSideEffects = toolTelemetry.didSendViaMessagingTool || Boolean(toolTelemetry.successfulCronAdds || toolTelemetry.acceptedSessionSpawns?.length) || this.generatedMediaProjection.hasGeneratedMedia() || this.toolProgressProjection.hasPotentialSideEffects;
		return {
			terminal: attemptTerminal.normalize({
				aborted: this.aborted,
				promptError,
				promptErrorSource: promptError ? this.promptErrorSource || "prompt" : null
			}),
			sessionIdUsed: this.params.sessionId,
			...agentHarnessResultClassification ? { agentHarnessResultClassification } : {},
			bootstrapPromptWarningSignaturesSeen: this.params.bootstrapPromptWarningSignaturesSeen,
			bootstrapPromptWarningSignature: this.params.bootstrapPromptWarningSignature,
			...this.responseCompletions.modelIterations > 0 ? { modelIterations: this.responseCompletions.modelIterations } : {},
			messagesSnapshot,
			assistantTexts,
			toolMetas,
			lastAssistant,
			currentAttemptAssistant,
			...this.toolProgressProjection.lastToolError ? { lastToolError: this.toolProgressProjection.lastToolError } : {},
			didSendViaMessagingTool: toolTelemetry.didSendViaMessagingTool,
			didDeliverSourceReplyViaMessageTool: toolTelemetry.didDeliverSourceReplyViaMessageTool === true,
			messagingToolSentTexts: toolTelemetry.messagingToolSentTexts,
			messagingToolSentMediaUrls: toolTelemetry.messagingToolSentMediaUrls,
			messagingToolSentTargets: toolTelemetry.messagingToolSentTargets,
			messagingToolSourceReplyPayloads: toolTelemetry.messagingToolSourceReplyPayloads ?? [],
			heartbeatToolResponse: toolTelemetry.heartbeatToolResponse,
			toolMediaUrls: this.generatedMediaProjection.buildToolMediaUrls(toolTelemetry),
			hostOwnedToolMediaUrls: this.generatedMediaProjection.buildHostOwnedMediaUrls(toolTelemetry),
			toolAudioAsVoice: toolTelemetry.toolAudioAsVoice,
			successfulCronAdds: toolTelemetry.successfulCronAdds,
			acceptedSessionSpawns: toolTelemetry.acceptedSessionSpawns,
			cloudCodeAssistFormatError: false,
			attemptUsage: projectedUsage,
			...this.completedCompactionCount > 0 ? { compactionCount: this.completedCompactionCount } : {},
			replayMetadata: {
				hadPotentialSideEffects,
				replaySafe: !hadPotentialSideEffects
			},
			itemLifecycle: {
				startedCount: this.activeItemIds.size + this.completedItemIds.size,
				completedCount: this.completedItemIds.size,
				activeCount: this.activeItemIds.size
			},
			yieldDetected: options?.yieldDetected || false,
			didSendDeterministicApprovalPrompt: this.eventProjection.guardianReviewCount > 0 ? false : void 0
		};
	}
	recordDynamicToolCall(params) {
		this.toolTranscriptProjection.recordDynamicToolCall(params);
	}
	recordDynamicToolResult(params) {
		this.toolProgressProjection.recordDynamicToolResult(params);
		const source = this.options.resolveDynamicToolResultContentSource?.(params.tool);
		this.toolTranscriptProjection.recordDynamicToolResult(params, source);
	}
	markTimedOut() {
		this.aborted = true;
		this.promptError = "codex app-server attempt timed out";
		this.promptErrorSource = "prompt";
	}
	markAborted() {
		this.aborted = true;
		this.responseCompletions.clear();
	}
	isCompacting() {
		return this.activeCompactionItemIds.size > 0;
	}
	async handleItemStarted(params) {
		const item = readItem(params.item);
		const itemId = item?.id ?? readString$6(params, "itemId");
		this.assistantProjection.recordItemStarted(item, itemId);
		if (itemId) this.activeItemIds.add(itemId);
		this.recordNativeToolOutcome(item);
		if (item?.type === "contextCompaction" && itemId) {
			this.activeCompactionItemIds.add(itemId);
			await runAgentHarnessBeforeCompactionHook({
				sessionFile: this.params.sessionFile,
				messages: await this.toolTranscriptProjection.readMirroredSessionMessages(),
				ctx: {
					runId: this.params.runId,
					agentId: this.params.agentId,
					sessionKey: this.params.sessionKey,
					sessionId: this.params.sessionId,
					workspaceDir: this.params.workspaceDir,
					messageProvider: this.params.messageProvider ?? void 0,
					trigger: this.params.trigger,
					channelId: this.params.messageChannel ?? this.params.messageProvider ?? void 0
				}
			});
			this.emitAgentEvent({
				stream: "compaction",
				data: {
					phase: "start",
					backend: "codex-app-server",
					threadId: this.threadId,
					turnId: this.turnId,
					itemId
				}
			});
		}
		this.toolProgressProjection.recordToolMeta(item);
		this.eventProjection.emitStandardItemEvent({
			phase: "start",
			item
		});
		await this.eventProjection.emitNormalizedToolItemEvent({
			phase: "start",
			item
		});
		this.toolTranscriptProjection.recordNativeToolCall(item);
		this.toolProgressProjection.emitToolResultSummary(item);
		this.emitAgentEvent({
			stream: "codex_app_server.item",
			data: {
				phase: "started",
				itemId,
				type: item?.type
			}
		});
	}
	async handleItemCompleted(params) {
		const item = readItem(params.item);
		this.diagnostics.warnUnknownItemStatus(item);
		this.recordNativeToolOutcome(item);
		this.clearTerminalPresentationForNativeItem(item);
		const itemId = item?.id ?? readString$6(params, "itemId");
		if (itemId) {
			this.activeItemIds.delete(itemId);
			this.completedItemIds.add(itemId);
		}
		this.assistantProjection.recordItemCompleted(item, itemId, this.activeItemIds);
		this.reasoningProjection.recordItem(item);
		await this.generatedMediaProjection.recordNative(item);
		if (item?.type === "contextCompaction" && itemId) {
			this.activeCompactionItemIds.delete(itemId);
			this.completedCompactionCount += 1;
			this.options.onContextCompacted?.();
			await runAgentHarnessAfterCompactionHook({
				sessionFile: this.params.sessionFile,
				messages: await this.toolTranscriptProjection.readMirroredSessionMessages(),
				compactedCount: -1,
				ctx: {
					runId: this.params.runId,
					agentId: this.params.agentId,
					sessionKey: this.params.sessionKey,
					sessionId: this.params.sessionId,
					workspaceDir: this.params.workspaceDir,
					messageProvider: this.params.messageProvider ?? void 0,
					trigger: this.params.trigger,
					channelId: this.params.messageChannel ?? this.params.messageProvider ?? void 0
				}
			});
			this.emitAgentEvent({
				stream: "compaction",
				data: {
					phase: "end",
					backend: "codex-app-server",
					completed: true,
					threadId: this.threadId,
					turnId: this.turnId,
					itemId
				}
			});
		}
		this.toolProgressProjection.recordToolMeta(item);
		this.toolProgressProjection.rememberCommandAggregateOutputEcho(item);
		this.eventProjection.emitStandardItemEvent({
			phase: "end",
			item
		});
		await this.eventProjection.emitNormalizedToolItemEvent({
			phase: "result",
			item
		});
		this.toolTranscriptProjection.recordNativeToolCall(item);
		await this.toolTranscriptProjection.recordNativeToolResultWithDetails(item);
		this.toolProgressProjection.emitToolResultSummary(item);
		this.toolProgressProjection.emitToolResultOutput(item);
		this.emitAgentEvent({
			stream: "codex_app_server.item",
			data: {
				phase: "completed",
				itemId,
				type: item?.type
			}
		});
	}
	async handleTurnCompleted(params) {
		const turn = readCodexTurn(params.turn);
		if (!turn || turn.id !== this.turnId) return;
		this.completedTurn = turn;
		if (turn.status !== "completed") this.responseCompletions.clear();
		if (turn.status === "failed") {
			const usageLimitMessage = formatCodexUsageLimitErrorMessage({
				message: turn.error?.message,
				codexErrorInfo: turn.error?.codexErrorInfo,
				rateLimits: this.options.readRecentRateLimits?.()
			});
			this.promptError = usageLimitMessage ? createCodexUsageLimitPromptError(usageLimitMessage) : turn.error?.message ?? "codex app-server turn failed";
			this.promptErrorSource = "prompt";
		}
		const turnItems = turn.items ?? [];
		for (let index = turnItems.length - 1; index >= 0; index -= 1) {
			const item = turnItems[index];
			if (!item || !this.isCurrentTurnSnapshotItem(item)) continue;
			if (item?.type === "dynamicToolCall") break;
			if (shouldClearTerminalPresentationForNativeItem(item)) {
				this.clearTerminalPresentationForNativeItem(item);
				break;
			}
		}
		for (const item of turnItems) {
			this.diagnostics.warnUnknownItemStatus(item);
			this.assistantProjection.recordSnapshotItem(item);
			this.reasoningProjection.recordItem(item);
			await this.generatedMediaProjection.recordNative(item);
			this.toolProgressProjection.recordToolMeta(item);
			this.toolProgressProjection.rememberCommandAggregateOutputEcho(item);
			await this.emitSnapshotOnlyNativeToolProgress(item);
			this.toolTranscriptProjection.recordNativeToolCall(item);
			await this.toolTranscriptProjection.recordNativeToolResultWithDetails(item);
			this.toolTranscriptProjection.emitAfterToolCallObservation(item);
			this.toolProgressProjection.emitToolResultSummary(item);
			this.toolProgressProjection.emitToolResultOutput(item);
		}
		this.assistantProjection.finalizeAnswerCandidate(turn);
		this.activeCompactionItemIds.clear();
		await this.reasoningProjection.maybeEndReasoning();
	}
	async emitSnapshotOnlyNativeToolProgress(item) {
		if (!shouldSynthesizeToolProgressForItem(item) || !this.isCurrentTurnSnapshotItem(item) || this.completedItemIds.has(item.id) || itemStatus(item) === "running") return;
		if (!this.activeItemIds.has(item.id)) {
			this.eventProjection.emitStandardItemEvent({
				phase: "start",
				item
			});
			await this.eventProjection.emitNormalizedToolItemEvent({
				phase: "start",
				item
			});
		}
		this.activeItemIds.delete(item.id);
		this.eventProjection.emitStandardItemEvent({
			phase: "end",
			item
		});
		await this.eventProjection.emitNormalizedToolItemEvent({
			phase: "result",
			item
		});
		this.completedItemIds.add(item.id);
	}
	isCurrentTurnSnapshotItem(item) {
		const itemTurnId = readItemString(item, "turnId");
		return itemTurnId === void 0 || itemTurnId === this.turnId;
	}
	async handleRawResponseItemCompleted(params) {
		const item = isJsonObject(params.item) ? params.item : void 0;
		if (!item) return;
		this.toolTranscriptProjection.recordRawNativeToolItem(item);
		this.assistantProjection.handleRawResponseItemCompleted(item, this.activeItemIds);
		await this.generatedMediaProjection.recordRaw(item);
	}
	clearTerminalPresentationForNativeItem(item) {
		if (!item || this.terminalPresentationClearedItemIds.has(item.id) || !shouldClearTerminalPresentationForNativeItem(item)) return;
		const toolCallOrdinal = this.nativeToolOutcomeOrdinals.get(item.id);
		this.terminalPresentationClearedItemIds.add(item.id);
		this.params.onToolOutcome?.({
			toolName: itemName(item) ?? item.type,
			argsHash: "",
			resultHash: "",
			...toolCallOrdinal !== void 0 ? { toolCallOrdinal } : {},
			terminalPresentation: void 0,
			presentationOnly: true
		});
	}
	formatCodexErrorMessage(params) {
		const error = isJsonObject(params.error) ? params.error : void 0;
		const usageLimitMessage = formatCodexUsageLimitErrorMessage({
			message: error ? readString$6(error, "message") : void 0,
			codexErrorInfo: error?.codexErrorInfo,
			rateLimits: this.options.readRecentRateLimits?.()
		});
		return usageLimitMessage ? createCodexUsageLimitPromptError(usageLimitMessage) : readCodexErrorNotificationMessage(params);
	}
	emitAgentEvent(event) {
		try {
			emitAgentEvent({
				runId: this.params.runId,
				stream: event.stream,
				data: event.data,
				...this.params.sessionKey ? { sessionKey: this.params.sessionKey } : {}
			});
		} catch (error) {
			log.debug("codex app-server global agent event emit failed", { error });
		}
		try {
			const maybePromise = this.params.onAgentEvent?.(event);
			Promise.resolve(maybePromise).catch((error) => {
				log.debug("codex app-server agent event handler rejected", { error });
			});
		} catch (error) {
			log.debug("codex app-server agent event handler threw", { error });
		}
	}
	isNotificationForTurn(params) {
		const threadId = readCodexNotificationThreadId(params);
		const turnId = readCodexNotificationTurnId(params);
		return threadId === this.threadId && turnId === this.turnId;
	}
	isHookNotificationForCurrentThread(params) {
		const threadId = readString$6(params, "threadId");
		const turnId = params.turnId;
		return threadId === this.threadId && (turnId === this.turnId || turnId === null);
	}
};
function isHookNotificationMethod(method) {
	return method === "hook/started" || method === "hook/completed";
}
//#endregion
//#region extensions/codex/src/app-server/native-mcp-app.ts
function asRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : void 0;
}
function readString$4(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function readMcpAppResourceUri(item) {
	const uri = readString$4(asRecord(item.appContext)?.resourceUri) ?? readString$4(item.mcpAppResourceUri);
	return uri?.startsWith("ui://") ? uri : void 0;
}
function readMcpToolResult(item) {
	const result = asRecord(item.result);
	if (!result || !Array.isArray(result.content)) return;
	const resultMeta = asRecord(result["_meta"]);
	return {
		content: result.content,
		...result.structuredContent !== void 0 ? { structuredContent: result.structuredContent } : {},
		...result.isError === true ? { isError: true } : {},
		...resultMeta ? { _meta: resultMeta } : {}
	};
}
function statusTools(status) {
	return Object.entries(status.tools).map(([name, value]) => Object.assign({}, asRecord(value), { name }));
}
function createNativeMcpRuntime(params) {
	let catalog = null;
	let statuses;
	const createdAt = Date.now();
	const loadStatuses = async () => {
		if (statuses) return statuses;
		statuses = (await params.client.request("mcpServerStatus/list", {
			threadId: params.threadId,
			detail: "full"
		})).data;
		return statuses;
	};
	const getCatalog = async () => {
		if (catalog) return catalog;
		const loaded = await loadStatuses();
		catalog = {
			version: 1,
			generatedAt: Date.now(),
			servers: Object.fromEntries(loaded.map((status) => [status.name, {
				serverName: status.name,
				launchSummary: "Codex native MCP connection",
				toolCount: Object.keys(status.tools).length
			}])),
			tools: loaded.flatMap((status) => statusTools(status).map((tool) => ({
				serverName: status.name,
				safeServerName: status.name,
				toolName: String(tool.name),
				inputSchema: asRecord(tool.inputSchema) ?? { type: "object" },
				fallbackDescription: readString$4(tool.description) ?? String(tool.name)
			})))
		};
		return catalog;
	};
	const runtime = {
		sessionId: params.attempt.sessionId,
		sessionKey: params.attempt.sessionKey,
		workspaceDir: params.attempt.workspaceDir,
		configFingerprint: `${getCodexAppServerClientInstanceId(params.client)}:${params.threadId}`,
		mcpAppsEnabled: true,
		createdAt,
		lastUsedAt: createdAt,
		acquireLease: () => retainSharedCodexAppServerClientIfCurrent(params.client) ?? (() => {}),
		getCatalog,
		peekCatalog: () => catalog,
		markUsed: () => {
			runtime.lastUsedAt = Date.now();
		},
		callTool: async (serverName, toolName, input) => await params.client.request("mcpServer/tool/call", {
			threadId: params.threadId,
			server: serverName,
			tool: toolName,
			arguments: asRecord(input) ?? {}
		}),
		listTools: async (serverName) => {
			const status = (await loadStatuses()).find((entry) => entry.name === serverName);
			return { tools: status ? statusTools(status) : [] };
		},
		readResource: async (serverName, uri) => await params.client.request("mcpServer/resource/read", {
			threadId: params.threadId,
			server: serverName,
			uri
		}),
		listResources: async (serverName) => {
			return { resources: (await loadStatuses()).find((entry) => entry.name === serverName)?.resources ?? [] };
		},
		listResourceTemplates: async (serverName) => {
			return { resourceTemplates: (await loadStatuses()).find((entry) => entry.name === serverName)?.resourceTemplates ?? [] };
		},
		dispose: async () => {}
	};
	return runtime;
}
function createCodexNativeMcpAppResultDetailsPreparer(params) {
	if (params.attempt.config?.mcp?.apps?.enabled !== true) return;
	const runtime = createNativeMcpRuntime(params);
	return async (item) => {
		const serverName = readString$4(item.server);
		const toolName = readString$4(item.tool);
		const uiResourceUri = readMcpAppResourceUri(item);
		const toolResult = readMcpToolResult(item);
		if (!serverName || !toolName || !uiResourceUri || !toolResult) return;
		const allowedAppToolNames = new Set((await runtime.getCatalog()).tools.filter((tool) => tool.serverName === serverName).map((tool) => tool.toolName));
		if (allowedAppToolNames.size === 0) return;
		return await prepareHarnessNativeMcpAppPreview({
			runtime,
			serverName,
			toolName,
			uiResourceUri,
			toolCallId: item.id,
			toolInput: item.arguments ?? {},
			toolResult,
			allowedAppToolNames,
			...toolResult["_meta"] !== void 0 ? { resultMetaState: "unavailable" } : {}
		});
	};
}
//#endregion
//#region extensions/codex/src/app-server/user-input-bridge.ts
/** Bridges Codex request_user_input calls to gateway questions and secret text prompts. */
const DEFAULT_USER_INPUT_TIMEOUT_MS = 15 * 6e4;
/** Creates a per-turn bridge for pending Codex user-input requests. */
function createCodexUserInputBridge(params) {
	let sensitiveInput;
	let pendingGateway;
	const gatewayCall = params.gatewayCall ?? callGatewayTool;
	const resolveSecret = (value) => {
		const current = sensitiveInput;
		if (!current) return;
		sensitiveInput = void 0;
		current.cleanup();
		current.resolve(value);
	};
	const resolveSecretIfCurrent = (current, value) => {
		if (sensitiveInput !== current) return false;
		resolveSecret(value);
		return true;
	};
	const cancelGateway = () => {
		pendingGateway?.abort.abort(/* @__PURE__ */ new Error("Codex user input request cancelled"));
	};
	return {
		async handleRequest(request) {
			const requestParams = readUserInputParams(request.params);
			if (!requestParams) return;
			if (requestParams.threadId !== params.threadId || requestParams.turnId !== params.turnId) return;
			if (requestParams.questions.length === 0) return emptyUserInputResponse();
			resolveSecret(emptyUserInputResponse());
			cancelGateway();
			if (requestParams.questions.some((question) => question.isSecret)) return new Promise((resolve) => {
				const abortListener = () => resolveSecret(emptyUserInputResponse());
				const cleanup = () => params.signal?.removeEventListener("abort", abortListener);
				sensitiveInput = {
					requestId: request.id,
					threadId: requestParams.threadId,
					questions: requestParams.questions,
					claimed: false,
					resolve,
					cleanup
				};
				params.signal?.addEventListener("abort", abortListener, { once: true });
				if (params.signal?.aborted) {
					resolveSecret(emptyUserInputResponse());
					return;
				}
				deliverAgentHarnessUserInputPrompt(params.paramsForRun, requestParams.questions, {
					formatText: formatCodexDisplayText,
					intro: "Codex needs input:"
				}).catch((error) => {
					log.warn("failed to deliver secret codex user input prompt", { error });
				});
			});
			const abort = new AbortController();
			const abortFromRun = () => abort.abort(params.signal?.reason);
			params.signal?.addEventListener("abort", abortFromRun, { once: true });
			if (params.signal?.aborted) abortFromRun();
			pendingGateway = {
				requestId: request.id,
				threadId: requestParams.threadId,
				abort
			};
			try {
				const result = await runAgentHarnessGatewayQuestion({
					questions: requestParams.questions,
					sessionKey: params.paramsForRun.sessionKey ?? params.paramsForRun.sessionId,
					agentId: params.paramsForRun.agentId,
					runId: params.paramsForRun.runId,
					timeoutMs: requestParams.autoResolutionMs ?? params.paramsForRun.timeoutMs ?? DEFAULT_USER_INPUT_TIMEOUT_MS,
					gatewayCall,
					delivery: params.paramsForRun,
					promptOptions: {
						formatText: formatCodexDisplayText,
						intro: "Codex needs input:"
					},
					signal: abort.signal
				});
				return result.status === "answered" ? gatewayAnswersToCodexResponse(result.answers.answers) : emptyUserInputResponse();
			} catch (error) {
				log.warn("failed to bridge codex user input through gateway", { error });
				return emptyUserInputResponse();
			} finally {
				params.signal?.removeEventListener("abort", abortFromRun);
				if (pendingGateway?.abort === abort) pendingGateway = void 0;
			}
		},
		claimPendingRequest() {
			const current = sensitiveInput;
			if (!current || current.claimed) return;
			current.claimed = true;
			return {
				answer: (text) => resolveSecretIfCurrent(current, buildUserInputResponse(current.questions, text)),
				cancel: () => resolveSecretIfCurrent(current, emptyUserInputResponse())
			};
		},
		handleNotification(notification) {
			if (notification.method !== "serverRequest/resolved") return;
			const notificationParams = isJsonObject(notification.params) ? notification.params : void 0;
			const requestId = notificationParams ? readRequestId(notificationParams) : void 0;
			if (!notificationParams || requestId === void 0) return;
			if (sensitiveInput && readString$3(notificationParams, "threadId") === sensitiveInput.threadId && String(requestId) === String(sensitiveInput.requestId)) resolveSecret(emptyUserInputResponse());
			if (pendingGateway && readString$3(notificationParams, "threadId") === pendingGateway.threadId && String(requestId) === String(pendingGateway.requestId)) pendingGateway.abort.abort(/* @__PURE__ */ new Error("Codex server request resolved"));
		},
		cancelPending() {
			resolveSecret(emptyUserInputResponse());
			cancelGateway();
		}
	};
}
function readUserInputParams(value) {
	if (!isJsonObject(value)) return;
	const threadId = readString$3(value, "threadId");
	const turnId = readString$3(value, "turnId");
	const itemId = readString$3(value, "itemId");
	const questionsRaw = value.questions;
	if (!threadId || !turnId || !itemId || !Array.isArray(questionsRaw)) return;
	return {
		threadId,
		turnId,
		itemId,
		questions: questionsRaw.map((rawQuestion) => {
			const question = readQuestion(rawQuestion);
			if (question && isJsonObject(rawQuestion) && rawQuestion.multiSelect === true) question.multiSelect = true;
			return question;
		}).filter((question) => Boolean(question)),
		autoResolutionMs: typeof value.autoResolutionMs === "number" && value.autoResolutionMs > 0 ? value.autoResolutionMs : void 0
	};
}
function readQuestion(value) {
	if (!isJsonObject(value)) return;
	const id = readString$3(value, "id");
	const header = readString$3(value, "header");
	const question = readString$3(value, "question");
	if (!id || !header || !question) return;
	return {
		id,
		header,
		question,
		isOther: value.isOther === true,
		isSecret: value.isSecret === true,
		options: readOptions(value.options)
	};
}
function readOptions(value) {
	if (!Array.isArray(value)) return null;
	const options = value.map(readOption).filter((option) => Boolean(option));
	return options.length > 0 ? options : null;
}
function readOption(value) {
	if (!isJsonObject(value)) return;
	const label = readString$3(value, "label");
	const description = readString$3(value, "description") ?? "";
	return label ? {
		label,
		description
	} : void 0;
}
function buildUserInputResponse(questions, inputText) {
	return buildAgentHarnessUserInputAnswers(questions, inputText);
}
function gatewayAnswersToCodexResponse(answers) {
	return { answers: Object.fromEntries(Object.entries(answers).map(([questionId, values]) => [questionId, { answers: values }])) };
}
function emptyUserInputResponse() {
	return emptyAgentHarnessUserInputAnswers();
}
function readString$3(record, key) {
	const value = record[key];
	return typeof value === "string" ? value : void 0;
}
function readRequestId(record) {
	const value = record.requestId;
	return typeof value === "string" || typeof value === "number" ? value : void 0;
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-active-turn.ts
async function activateCodexAttemptTurn(resources, turnRuntime, lifecycle, notifications, turn) {
	const { prompt, state: resourceState, projectorRef, trajectoryRecorder, pendingNativePreToolUseFailures } = resources;
	const { context, turnState } = prompt;
	const { runtime, attemptTools } = context;
	const { connection } = runtime;
	const { params, runAbortController, terminalState, abortExplicitly, abortFromUpstream, bindingStore, bindingIdentity, sessionAgentId, sandboxSessionKey, effectiveCwd } = connection;
	const { dynamicToolParams, computerContextEpoch, toolBridge } = attemptTools;
	const { state, userInputBridgeRef, steeringQueueRef, turnWatches, completeTurn, interruptTurn } = turnRuntime;
	const { emitExecutionPhaseOnce, emitLifecycleStart, maybeAnnounceFastModeAutoOff } = lifecycle;
	const { enqueueNotification } = notifications;
	const activeTurnId = turn.turn.id;
	const prepareNativeMcpAppResultDetails = createCodexNativeMcpAppResultDetailsPreparer({
		client: resourceState.client,
		threadId: resourceState.thread.threadId,
		attempt: dynamicToolParams
	});
	const streamState = {
		eventEmitted: false,
		needsTerminalSnapshot: false
	};
	emitExecutionPhaseOnce("turn_accepted", { phase: "turn_accepted" });
	userInputBridgeRef.current = createCodexUserInputBridge({
		paramsForRun: params,
		threadId: resourceState.thread.threadId,
		turnId: activeTurnId,
		signal: runAbortController.signal
	});
	trajectoryRecorder?.recordEvent("prompt.submitted", {
		threadId: resourceState.thread.threadId,
		turnId: activeTurnId,
		prompt: turnState.codexTurnPromptText,
		imagesCount: params.images?.length ?? 0
	});
	projectorRef.current = new CodexAppServerEventProjector({
		...dynamicToolParams,
		onAgentEvent: (event) => {
			if (event.stream === "assistant" && typeof event.data.delta === "string") {
				streamState.eventEmitted = true;
				streamState.needsTerminalSnapshot ||= event.data.replaceable === true;
			}
			return dynamicToolParams.onAgentEvent?.(event);
		}
	}, resourceState.thread.threadId, activeTurnId, {
		nativePostToolUseRelayEnabled: resourceState.nativeHookRelay?.allowedEvents.includes("post_tool_use") === true && resourceState.nativeHookRelay.shouldRelayEvent("post_tool_use"),
		readRecentRateLimits: () => readRecentCodexRateLimits(resourceState.client),
		runAbortSignal: runAbortController.signal,
		remoteWorkspaceRoot: connection.appServer.remoteWorkspaceRoot,
		remoteWorkspaceRequestTimeoutMs: connection.appServer.requestTimeoutMs,
		readRemoteWorkspaceFile: ({ path, maxBytes, signal, timeoutMs }) => readBoundedCodexRemoteWorkspaceFile({
			client: resourceState.client,
			path,
			maxBytes,
			signal,
			timeoutMs
		}),
		trajectoryRecorder,
		resolveDynamicToolResultContentSource: toolBridge.resultContentSourceForTool,
		onNativeToolResultRecorded: maybeAnnounceFastModeAutoOff,
		...prepareNativeMcpAppResultDetails ? { prepareNativeMcpAppResultDetails } : {},
		upstreamUserText: turnState.codexTurnPromptText,
		onContextCompacted: () => {
			computerContextEpoch.value += 1;
			delete computerContextEpoch.frameToolCallId;
			delete computerContextEpoch.frameImageIdentity;
		}
	});
	if (isTerminalTurnStatus(turn.turn.status)) state.terminalTurnNotificationQueued = true;
	emitLifecycleStart();
	const activeProjector = projectorRef.current;
	turnWatches.armTerminalIdleWatch();
	turnWatches.touchActivity("turn:start", { arm: true });
	turnWatches.armAttemptIdleWatch();
	turnWatches.touchActivity("turn:start", { attemptProgress: true });
	for (const failure of pendingNativePreToolUseFailures.splice(0)) activeProjector.recordNativeToolPreToolUseFailure(failure);
	if (resourceState.turnRoute) try {
		await resourceState.turnRoute.bindTurn(activeTurnId);
	} catch (error) {
		if (!state.terminalTurnNotificationQueued) throw error;
		await resourceState.turnRoute.drain();
		if (!state.completed) {
			turnWatches.clearAllTimers();
			throw error;
		}
	}
	if (!state.completed && isTerminalTurnStatus(turn.turn.status)) await enqueueNotification({
		method: "turn/completed",
		params: {
			threadId: resourceState.thread.threadId,
			turnId: activeTurnId,
			turn: turn.turn
		}
	}, {
		threadId: resourceState.thread.threadId,
		turnId: activeTurnId
	});
	const activeSteeringQueue = createCodexSteeringQueue({
		client: resourceState.client,
		threadId: resourceState.thread.threadId,
		turnId: activeTurnId,
		requestTimeoutMs: connection.appServer.requestTimeoutMs,
		claimPendingUserInput: () => userInputBridgeRef.current?.claimPendingRequest(),
		signal: runAbortController.signal
	});
	steeringQueueRef.current = activeSteeringQueue;
	const handle = {
		kind: "embedded",
		runId: params.runId,
		queueMessage: async (text, optionsLocal) => {
			const isInboundUserMessage = optionsLocal?.isInboundUserMessage === true;
			if (isInboundUserMessage && !optionsLocal?.images?.length) {
				if (await claimPendingAgentQuestionAnswer({
					sessionKey: params.sessionKey ?? params.sessionId,
					text
				})) return;
			} else if (isInboundUserMessage) try {
				await cancelPendingAgentQuestionForSession({
					sessionKey: params.sessionKey ?? params.sessionId,
					resolvedBy: "image-reply"
				});
			} catch (error) {
				log.warn("failed to cancel codex gateway question before image steering", { error });
			}
			await activeSteeringQueue.queue(text, optionsLocal);
		},
		isStreaming: () => !state.completed && !runAbortController.signal.aborted,
		isAborted: () => runAbortController.signal.aborted,
		isStopped: () => state.completed || state.timedOut || runAbortController.signal.aborted,
		isAbortable: () => !terminalState.terminalOutcomeFrozen || terminalState.sharedAbortAllowedAfterTerminalOutcome,
		isCompacting: () => projectorRef.current?.isCompacting() ?? false,
		supportsTranscriptCommitWait: true,
		supportsQueueMessageImages: true,
		sourceReplyDeliveryMode: params.sourceReplyDeliveryMode,
		cancel: () => abortExplicitly("cancelled"),
		abort: () => abortExplicitly("aborted")
	};
	params.replyOperation?.attachBackend(handle);
	setActiveEmbeddedRun(params.sessionId, handle, params.sessionKey, params.sessionFile);
	const freezeRunTerminalOutcome = () => {
		if (terminalState.terminalOutcomeFrozen) return;
		terminalState.terminalOutcomeFrozen = true;
		params.abortSignal?.removeEventListener("abort", abortFromUpstream);
	};
	const notifyUserMessagePersisted = createCodexAppServerUserMessagePersistenceNotifier(params);
	mirrorPromptAtTurnStartBestEffort({
		params,
		agentId: sessionAgentId,
		notifyUserMessagePersisted,
		sessionKey: sandboxSessionKey,
		cwd: effectiveCwd,
		threadId: resourceState.thread.threadId,
		turnId: activeTurnId,
		upstreamUserText: turnState.codexTurnPromptText
	});
	const abortListener = () => {
		if (state.timedOut) {
			(async () => {
				if (resourceState.thread.connectionScope !== "supervision") await bindingStore.mutate(bindingIdentity, {
					kind: "clear",
					threadId: resourceState.thread.threadId
				});
				await retireCodexAppServerClientAfterTimedOutTurn(resourceState.client, {
					threadId: resourceState.thread.threadId,
					turnId: activeTurnId,
					reason: String(runAbortController.signal.reason ?? "timeout"),
					suspectPhysicalClient: state.turnWatchTimeoutKind === "terminal"
				});
			})().finally(completeTurn);
			return;
		}
		interruptTurn(activeTurnId).finally(completeTurn);
	};
	runAbortController.signal.addEventListener("abort", abortListener, { once: true });
	if (runAbortController.signal.aborted) abortListener();
	return {
		activeTurnId,
		activeProjector,
		streamState,
		handle,
		freezeRunTerminalOutcome,
		notifyUserMessagePersisted,
		abortListener
	};
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-cleanup.ts
async function cleanupCodexAttempt(resources, turnRuntime, lifecycle, requestRuntime, activeTurn) {
	const { prompt, state: resourceState, trajectoryRecorder, releaseCurrentRoute, releaseSharedClientLeaseAndRetireOneShotClient, releaseSandboxExecEnvironment } = resources;
	const { connection } = prompt.context.runtime;
	const { params, options, runAbortController, terminalState, bindingStore, bindingIdentity } = connection;
	const { state, steeringQueueRef, userInputBridgeRef, turnWatches } = turnRuntime;
	const { maybeEmitFastModeAutoResetBestEffort, emitLifecycleTerminal, buildLifecycleTerminalMeta } = lifecycle;
	const { codexModelCallDiagnostics } = requestRuntime;
	const { activeTurnId, abortListener, handle, freezeRunTerminalOutcome } = activeTurn;
	if (params.isFinalFallbackAttempt !== false) await maybeEmitFastModeAutoResetBestEffort();
	codexModelCallDiagnostics.emitError("codex app-server run completed without model-call terminal event");
	emitLifecycleTerminal({
		phase: "error",
		error: "codex app-server run completed without lifecycle terminal event",
		...buildLifecycleTerminalMeta({
			aborted: runAbortController.signal.aborted && !state.clientClosedAbort,
			timedOut: state.timedOut
		})
	});
	if (trajectoryRecorder && !resourceState.trajectoryEndRecorded) trajectoryRecorder.recordEvent("session.ended", {
		status: state.timedOut || runAbortController.signal.aborted && !state.clientClosedAbort ? "interrupted" : "cleanup",
		threadId: resourceState.thread.threadId,
		turnId: activeTurnId,
		timedOut: state.timedOut,
		aborted: runAbortController.signal.aborted && !state.clientClosedAbort
	});
	await runAgentCleanupStep({
		runId: params.runId,
		sessionId: params.sessionId,
		step: "codex-trajectory-flush",
		log,
		cleanup: async () => trajectoryRecorder?.flush()
	});
	if (!state.timedOut && !runAbortController.signal.aborted) await steeringQueueRef.current?.flushPending();
	const retainLiveIncognitoThread = terminalState.turnSucceeded && isIncognitoSessionKey(params.sessionKey);
	const retainedPersistentThread = terminalState.turnSucceeded && !isIncognitoSessionKey(params.sessionKey) && params.cleanupBundleMcpOnRunEnd !== true && !connection.activeContextEngine && resourceState.thread.liveThreadConfigFingerprint !== void 0 && resourceState.thread.clientId === resolveCodexAppServerClientInstanceId(resourceState.client) && resourceState.thread.preserveNativeModel !== true && resourceState.thread.connectionScope !== "supervision" && !resourceState.thread.ringZeroConfigFingerprint && !resourceState.thread.contextEngine ? await retainCodexAppServerLiveThread(resourceState.client, resourceState.thread.threadId, async (previousThreadId) => {
		if (!await unsubscribeCodexThreadBestEffort(resourceState.client, {
			threadId: previousThreadId,
			timeoutMs: 5e3
		})) {
			await closeCodexStartupClientBestEffort(resourceState.client);
			throw new CodexAppServerUnsafeSubscriptionError(`Codex retained thread subscription could not be released: ${previousThreadId}`);
		}
	}, resourceState.thread.liveThreadConfigFingerprint) : void 0;
	const retainLiveThread = retainLiveIncognitoThread || retainedPersistentThread !== void 0;
	const bindingReleased = isIncognitoSessionKey(params.sessionKey) && !retainLiveIncognitoThread ? await bindingStore.mutate(bindingIdentity, {
		kind: "clear",
		threadId: resourceState.thread.threadId
	}) : true;
	if (!state.timedOut && !retainLiveThread) {
		if (bindingReleased) {
			if (!await unsubscribeCodexThreadBestEffort(resourceState.client, {
				threadId: resourceState.thread.threadId,
				timeoutMs: 5e3
			})) await closeCodexStartupClientBestEffort(resourceState.client);
		}
	}
	userInputBridgeRef.current?.cancelPending();
	turnWatches.clearAllTimers();
	releaseCurrentRoute();
	await releaseSharedClientLeaseAndRetireOneShotClient();
	if (resourceState.nativeHookRelay) if (state.shouldDelayNativeHookRelayUnregister) scheduleCodexNativeHookRelayUnregister({
		relay: resourceState.nativeHookRelay,
		hookTimeoutSec: options.nativeHookRelay?.hookTimeoutSec
	});
	else resourceState.nativeHookRelay.unregister();
	await releaseSandboxExecEnvironment();
	await runAgentCleanupStep({
		runId: params.runId,
		sessionId: params.sessionId,
		step: "codex-scoped-mcp-dispose",
		log,
		cleanup: async () => {
			await prompt.context.attemptTools.scopedMcpTools?.dispose();
		}
	});
	runAbortController.signal.removeEventListener("abort", abortListener);
	steeringQueueRef.current?.cancel();
	freezeRunTerminalOutcome();
	params.replyOperation?.detachBackend(handle);
	clearActiveEmbeddedRun(params.sessionId, handle, params.sessionKey, params.sessionFile);
}
//#endregion
//#region extensions/codex/src/app-server/workspace-dir-cache.ts
/** Process-local cache of Codex workspaces already created by the run loop. */
const codexWorkspaceDirCache = /* @__PURE__ */ new Set();
//#endregion
//#region extensions/codex/src/app-server/run-attempt-lifecycle.ts
const CODEX_APP_SERVER_PROJECTED_CHARS_PER_TOKEN = 4;
function shouldKeepCodexSharedAbortOpen(params) {
	const terminal = attemptTerminal.project(params.result.terminal);
	if (params.explicitCancellationObserved || terminal.aborted || terminal.externalAbort) return false;
	return params.trigger === "memory" || !params.attemptSucceeded;
}
function withCodexAppServerFastModeServiceTier(appServer, params) {
	const fastMode = typeof params.fastMode === "function" ? params.fastMode() : params.fastMode;
	const serviceTier = fastMode === void 0 ? appServer.serviceTier : fastMode ? "priority" : void 0;
	if (serviceTier === appServer.serviceTier) return appServer;
	if (serviceTier) return {
		...appServer,
		serviceTier
	};
	return {
		...appServer,
		serviceTier: null
	};
}
function estimateCodexAppServerProjectedTurnTokens(params) {
	const inputChars = params.prompt.length + (params.developerInstructions?.length ?? 0);
	return Math.max(1, Math.ceil(inputChars / CODEX_APP_SERVER_PROJECTED_CHARS_PER_TOKEN));
}
async function ensureCodexWorkspaceDirOnce(workspaceDir) {
	const normalized = path.resolve(workspaceDir);
	if (codexWorkspaceDirCache.has(normalized)) return;
	await fs.mkdir(normalized, { recursive: true });
	codexWorkspaceDirCache.add(normalized);
}
async function emitCodexAppServerEvent(params, event) {
	try {
		emitAgentEvent({
			runId: params.runId,
			stream: event.stream,
			data: event.data,
			...params.sessionKey ? { sessionKey: params.sessionKey } : {}
		});
	} catch (error) {
		log.debug("codex app-server global agent event emit failed", { error });
	}
	try {
		await params.onAgentEvent?.(event);
	} catch (error) {
		log.debug("codex app-server agent event handler threw", { error });
	}
}
async function runCodexAgentEndHook(params, hookParams) {
	const sideEffectParams = {
		...hookParams,
		ctx: {
			...hookParams.ctx,
			config: params.config
		}
	};
	if (!params.messageChannel && !params.messageProvider) {
		await awaitAgentEndSideEffects(sideEffectParams);
		return;
	}
	runAgentEndSideEffects(sideEffectParams);
}
//#endregion
//#region extensions/codex/src/app-server/startup-binding.ts
const CODEX_APP_SERVER_NATIVE_THREAD_FALLBACK_MAX_TOKENS = 3e5;
const CODEX_APP_SERVER_NATIVE_THREAD_DEFAULT_RESERVE_TOKENS = 2e4;
const CODEX_APP_SERVER_NATIVE_THREAD_MIN_PROMPT_BUDGET_TOKENS = 8e3;
const CODEX_APP_SERVER_NATIVE_THREAD_MIN_PROMPT_BUDGET_RATIO = .5;
const CODEX_APP_SERVER_ROLLOUT_TAIL_READ_BYTES = 64 * 1024;
const CODEX_APP_SERVER_BYTE_UNITS = {
	b: 1,
	k: 1024,
	kb: 1024,
	kib: 1024,
	m: 1024 * 1024,
	mb: 1024 * 1024,
	mib: 1024 * 1024,
	g: 1024 * 1024 * 1024,
	gb: 1024 * 1024 * 1024,
	gib: 1024 * 1024 * 1024,
	t: 1024 * 1024 * 1024 * 1024,
	tb: 1024 * 1024 * 1024 * 1024,
	tib: 1024 * 1024 * 1024 * 1024
};
const codexSessionRecordCache = /* @__PURE__ */ new Map();
function parseCodexAppServerByteLimit(value) {
	if (typeof value === "number" && Number.isFinite(value) && value > 0) return Math.floor(value);
	if (typeof value !== "string") return;
	const match = value.trim().match(/^(\d+(?:\.\d+)?)\s*([a-z]+)?$/i);
	if (!match) return;
	const amount = Number(match[1]);
	if (!Number.isFinite(amount) || amount <= 0) return;
	const unit = (match[2] ?? "b").toLowerCase();
	const multiplier = CODEX_APP_SERVER_BYTE_UNITS[unit];
	if (multiplier === void 0) return;
	return Math.max(1, Math.round(amount * multiplier));
}
async function listCodexAppServerRolloutFilesForThread(agentDir, threadId, codexHome, rolloutPath) {
	const resolvedAgentDir = path.resolve(agentDir);
	const resolvedCodexHome = codexHome?.trim() ? path.resolve(codexHome) : resolveCodexAppServerHomeDir(resolvedAgentDir);
	const roots = [
		path.join(resolvedCodexHome, "sessions"),
		path.join(resolveCodexAppServerHomeDir(resolvedAgentDir), "sessions"),
		path.join(resolvedAgentDir, "agent", "codex-home", "sessions"),
		path.join(path.dirname(resolvedAgentDir), "codex-home", "sessions")
	];
	const rolloutRoot = rolloutPath ? roots.find((root) => {
		const relativePath = path.relative(root, rolloutPath);
		return relativePath !== "" && relativePath !== ".." && !relativePath.startsWith(`..${path.sep}`) && !path.isAbsolute(relativePath);
	}) : void 0;
	if (rolloutPath && rolloutRoot && path.isAbsolute(rolloutPath) && path.extname(rolloutPath) === ".jsonl" && path.basename(rolloutPath).includes(threadId)) try {
		const opened = await (await root(rolloutRoot, {
			hardlinks: "reject",
			maxBytes: Number.MAX_SAFE_INTEGER,
			symlinks: "reject"
		})).open(path.relative(rolloutRoot, rolloutPath));
		return [{
			path: opened.realPath,
			bytes: opened.stat.size,
			handle: opened.handle
		}];
	} catch {}
	const files = [];
	const visited = /* @__PURE__ */ new Set();
	for (const root of roots) {
		if (visited.has(root)) continue;
		visited.add(root);
		const stack = [root];
		while (stack.length > 0) {
			const dir = stack.pop();
			if (!dir) continue;
			let entries;
			try {
				entries = await fs.readdir(dir, { withFileTypes: true });
			} catch {
				continue;
			}
			for (const entry of entries) {
				const file = path.join(dir, entry.name);
				if (entry.isDirectory()) {
					stack.push(file);
					continue;
				}
				if (!entry.isFile() || !entry.name.endsWith(".jsonl") || !entry.name.includes(threadId)) continue;
				try {
					files.push({
						path: file,
						bytes: (await fs.stat(file)).size
					});
				} catch {}
			}
		}
	}
	return files;
}
async function readCodexSessionRecordForSessionFile(sessionFile) {
	if (isSqliteSessionFileMarker(sessionFile)) return;
	const sessionsFile = path.join(path.dirname(sessionFile), "sessions.json");
	const resolvedSessionFile = path.resolve(sessionFile);
	let stat;
	try {
		stat = await fs.stat(sessionsFile);
	} catch {
		codexSessionRecordCache.delete(resolvedSessionFile);
		return;
	}
	const cached = codexSessionRecordCache.get(resolvedSessionFile);
	if (cached?.sessionsFile === sessionsFile && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) return cached.record;
	let store;
	try {
		store = JSON.parse(await fs.readFile(sessionsFile, "utf8"));
	} catch {
		codexSessionRecordCache.delete(resolvedSessionFile);
		return;
	}
	if (!isJsonObject(store)) {
		codexSessionRecordCache.delete(resolvedSessionFile);
		return;
	}
	let found;
	for (const [sessionKey, record] of Object.entries(store)) {
		if (!isJsonObject(record) || typeof record.sessionFile !== "string") continue;
		if (path.resolve(record.sessionFile) !== resolvedSessionFile) continue;
		found = {
			sessionKey,
			...record
		};
		break;
	}
	codexSessionRecordCache.set(resolvedSessionFile, {
		sessionsFile,
		mtimeMs: stat.mtimeMs,
		size: stat.size,
		record: found
	});
	return found;
}
function isSqliteSessionFileMarker(sessionFile) {
	return parseSqliteSessionFileMarker(sessionFile) !== void 0;
}
async function readCodexAppServerRolloutTokenSnapshot(file, openedHandle) {
	let handle = openedHandle;
	if (!handle) try {
		handle = await fs.open(file, "r");
	} catch {
		return;
	}
	let snapshot;
	try {
		let position = (await handle.stat()).size;
		const partialLineFragments = [];
		const applySnapshotLine = (line) => {
			const lineSnapshot = readCodexAppServerRolloutTokenSnapshotLine(line);
			if (lineSnapshot === void 0) return false;
			snapshot ??= {};
			snapshot.totalTokens ??= lineSnapshot.totalTokens;
			snapshot.modelContextWindow ??= lineSnapshot.modelContextWindow;
			return snapshot.totalTokens !== void 0 && snapshot.modelContextWindow !== void 0;
		};
		while (position > 0) {
			const bytesToRead = Math.min(position, CODEX_APP_SERVER_ROLLOUT_TAIL_READ_BYTES);
			const nextPosition = position - bytesToRead;
			const chunk = Buffer.allocUnsafe(bytesToRead);
			let bytesRead = 0;
			while (bytesRead < bytesToRead) {
				const result = await handle.read(chunk, bytesRead, bytesToRead - bytesRead, nextPosition + bytesRead);
				if (result.bytesRead === 0) return snapshot;
				bytesRead += result.bytesRead;
			}
			let lineEnd = bytesRead;
			for (let index = bytesRead - 1; index >= 0; index -= 1) {
				if (chunk[index] !== 10) continue;
				const lineFragment = chunk.subarray(index + 1, lineEnd);
				const line = partialLineFragments.length === 0 ? lineFragment.toString("utf8") : Buffer.concat([lineFragment, ...partialLineFragments.toReversed()]).toString("utf8");
				partialLineFragments.length = 0;
				if (applySnapshotLine(line)) return snapshot;
				lineEnd = index;
			}
			if (lineEnd > 0) partialLineFragments.push(chunk.subarray(0, lineEnd));
			position = nextPosition;
		}
		if (partialLineFragments.length > 0) applySnapshotLine(Buffer.concat(partialLineFragments.toReversed()).toString("utf8"));
	} finally {
		await handle.close();
	}
	return snapshot;
}
function readCodexAppServerRolloutTokenSnapshotLine(line) {
	if (!line.trim()) return;
	try {
		const parsed = JSON.parse(line);
		const payload = isJsonObject(parsed) ? parsed.payload : void 0;
		const info = isJsonObject(payload) && payload.type === "token_count" && isJsonObject(payload.info) ? payload.info : void 0;
		if (!info) return;
		const usage = isJsonObject(info.last_token_usage) ? info.last_token_usage : isJsonObject(info.total_token_usage) ? info.total_token_usage : void 0;
		const value = usage?.total_tokens ?? usage?.totalTokens;
		const totalTokens = typeof value === "number" && Number.isFinite(value) ? value : void 0;
		const windowValue = info.model_context_window ?? info.modelContextWindow;
		const modelContextWindow = typeof windowValue === "number" && Number.isFinite(windowValue) && windowValue > 0 ? Math.floor(windowValue) : void 0;
		const snapshot = {};
		if (totalTokens !== void 0) snapshot.totalTokens = totalTokens;
		if (modelContextWindow !== void 0) snapshot.modelContextWindow = modelContextWindow;
		return snapshot.totalTokens !== void 0 || snapshot.modelContextWindow !== void 0 ? snapshot : void 0;
	} catch {
		return;
	}
}
function readCompactionConfig(config) {
	return isJsonObject(config?.agents?.defaults?.compaction) ? config.agents.defaults.compaction : void 0;
}
function resolveCodexAppServerNativeThreadReserveTokens(_config) {
	return CODEX_APP_SERVER_NATIVE_THREAD_DEFAULT_RESERVE_TOKENS;
}
function resolveCodexAppServerNativeThreadTokenFuse(params) {
	const projectedTurnTokens = typeof params.projectedTurnTokens === "number" && Number.isFinite(params.projectedTurnTokens) && params.projectedTurnTokens > 0 ? Math.floor(params.projectedTurnTokens) : 0;
	const contextWindow = params.modelContextWindow ?? CODEX_APP_SERVER_NATIVE_THREAD_FALLBACK_MAX_TOKENS;
	const minPromptBudget = Math.min(CODEX_APP_SERVER_NATIVE_THREAD_MIN_PROMPT_BUDGET_TOKENS, Math.max(1, Math.floor(contextWindow * CODEX_APP_SERVER_NATIVE_THREAD_MIN_PROMPT_BUDGET_RATIO)));
	const effectiveReserveTokens = Math.min(params.reserveTokens, Math.max(0, contextWindow - minPromptBudget));
	return Math.max(1, contextWindow - effectiveReserveTokens - projectedTurnTokens);
}
function maxFiniteNumber(values) {
	const nums = values.filter((value) => typeof value === "number" && Number.isFinite(value));
	if (nums.length === 0) return;
	return Math.max(...nums);
}
function minFiniteNumber(values) {
	const nums = values.filter((value) => typeof value === "number" && Number.isFinite(value));
	if (nums.length === 0) return;
	return Math.min(...nums);
}
function hasContextEngineThreadBootstrapProjection(binding) {
	return binding.contextEngine?.projection?.mode === "thread_bootstrap";
}
/** Clears and drops a binding when the native Codex thread is too large to resume safely. */
async function rotateOversizedCodexAppServerStartupBinding(params) {
	const binding = params.binding;
	if (!binding?.threadId) return binding;
	if (binding.connectionScope === "supervision") return binding;
	const sessionRecord = await readCodexSessionRecordForSessionFile(params.sessionFile);
	const rolloutFiles = await listCodexAppServerRolloutFilesForThread(params.agentDir, binding.threadId, params.codexHome, binding.rolloutPath);
	const maxBytes = parseCodexAppServerByteLimit(readCompactionConfig(params.config)?.maxActiveTranscriptBytes);
	if (maxBytes !== void 0 && params.contextEngineActive === true && hasContextEngineThreadBootstrapProjection(binding)) log.debug("codex app-server deferring native transcript byte guard for context-engine thread bootstrap", {
		threadId: binding.threadId,
		engineId: binding.contextEngine?.engineId,
		epoch: binding.contextEngine?.projection?.epoch,
		fingerprint: binding.contextEngine?.projection?.fingerprint
	});
	else if (maxBytes !== void 0) {
		const oversizedFiles = rolloutFiles.filter((file) => file.bytes >= maxBytes);
		if (oversizedFiles.length > 0) {
			await Promise.all(rolloutFiles.map(async (file) => {
				await file.handle?.close();
			}));
			log.warn("codex app-server native transcript exceeded active byte limit; starting a fresh thread", {
				threadId: binding.threadId,
				maxBytes,
				files: oversizedFiles.map((file) => ({
					path: file.path,
					bytes: file.bytes
				}))
			});
			await params.bindingStore.mutate(params.identity, {
				kind: "clear",
				threadId: binding.threadId
			});
			return;
		}
	}
	const nativeTokenSnapshots = await Promise.all(rolloutFiles.map(async (file) => readCodexAppServerRolloutTokenSnapshot(file.path, file.handle)));
	const nativeTokens = maxFiniteNumber(nativeTokenSnapshots.map((snapshot) => snapshot?.totalTokens));
	const nativeModelContextWindow = maxFiniteNumber(nativeTokenSnapshots.map((snapshot) => snapshot?.modelContextWindow));
	const sessionModelContextWindow = typeof sessionRecord?.contextTokens === "number" && Number.isFinite(sessionRecord.contextTokens) && sessionRecord.contextTokens > 0 ? Math.floor(sessionRecord.contextTokens) : void 0;
	const reserveTokens = resolveCodexAppServerNativeThreadReserveTokens(params.config);
	const maxTokens = resolveCodexAppServerNativeThreadTokenFuse({
		modelContextWindow: minFiniteNumber([nativeModelContextWindow, sessionModelContextWindow]),
		reserveTokens,
		projectedTurnTokens: params.projectedTurnTokens
	});
	const sessionTokens = sessionRecord?.totalTokensFresh !== false && typeof sessionRecord?.totalTokens === "number" && Number.isFinite(sessionRecord.totalTokens) ? sessionRecord.totalTokens : void 0;
	const tokenCount = maxFiniteNumber([sessionTokens, nativeTokens]);
	if (tokenCount !== void 0 && tokenCount >= maxTokens) {
		log.warn("codex app-server native transcript exceeded active token limit; starting a fresh thread", {
			threadId: binding.threadId,
			maxTokens,
			sessionKey: sessionRecord?.sessionKey,
			sessionTokens,
			nativeTokens,
			nativeModelContextWindow,
			sessionModelContextWindow,
			reserveTokens,
			projectedTurnTokens: params.projectedTurnTokens
		});
		await params.bindingStore.mutate(params.identity, {
			kind: "clear",
			threadId: binding.threadId
		});
		return;
	}
	return binding;
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-connection.ts
function applyStoredBindingPermissions(params) {
	if (params.execPolicyTouched || params.binding?.connectionScope === "supervision") return params.appServer;
	return {
		...params.appServer,
		approvalPolicy: params.binding?.approvalPolicy ?? params.appServer.approvalPolicy,
		sandbox: params.binding?.sandbox ?? params.appServer.sandbox
	};
}
async function prepareCodexAttemptConnection({ params, options }) {
	const attemptStartedAt = Date.now();
	const profilerEnabled = isCodexAppServerProfilerEnabled(params.config);
	const codexModelCallTrace = freezeDiagnosticTraceContext(createDiagnosticTraceContextFromActiveScope());
	const codexModelContentCapture = resolveDiagnosticModelContentCapturePolicy(params.config);
	const codexModelCallId = `${params.runId}:codex-model:1`;
	const fastModeAutoStartedAtMs = typeof params.fastModeStartedAtMs === "number" && Number.isFinite(params.fastModeStartedAtMs) ? params.fastModeStartedAtMs : void 0;
	const fastModeAutoProgressState = params.fastModeAutoProgressState ?? {
		offAnnounced: false,
		resetAnnounced: false
	};
	const preDynamicStartupStages = createCodexDynamicToolBuildStageTracker({ enabled: profilerEnabled });
	const attemptClientFactory = options.clientFactory ?? getLeasedSharedCodexAppServerClient;
	const runtimeArtifactRequest = params.captureRuntimeArtifact || params.expectedRuntimeArtifact ? params.expectedRuntimeArtifact ? { expected: params.expectedRuntimeArtifact } : {} : void 0;
	const pluginConfig = readCodexPluginConfig(options.pluginConfig);
	const computerUseConfig = resolveCodexComputerUseConfig({ pluginConfig });
	const { sessionAgentId } = resolveSessionAgentIds({
		sessionKey: params.sessionKey,
		config: params.config,
		agentId: params.agentId
	});
	const beforeToolCallPolicy = getBeforeToolCallPolicyDiagnosticState();
	preDynamicStartupStages.mark("config");
	const resolvedWorkspace = resolveUserPath(params.workspaceDir);
	await ensureCodexWorkspaceDirOnce(resolvedWorkspace);
	preDynamicStartupStages.mark("workspace");
	const sandboxSessionKey = params.sandboxSessionKey?.trim() || params.sessionKey?.trim() || params.sessionId;
	const contextSessionKey = params.sessionKey?.trim() || sandboxSessionKey;
	const sandbox = await resolveSandboxContext({
		config: params.config,
		sessionKey: sandboxSessionKey,
		workspaceDir: resolvedWorkspace
	});
	preDynamicStartupStages.mark("sandbox");
	const execPolicy = resolveOpenClawExecPolicyForCodexAppServer({
		execOverrides: params.execOverrides,
		approvals: loadExecApprovals(),
		config: params.config,
		agentId: sessionAgentId
	});
	const agentDir = params.agentDir ?? resolveAgentDir(params.config ?? {}, sessionAgentId);
	let bindingIdentity = sessionBindingIdentity({
		sessionId: params.sessionId,
		sessionKey: params.sessionKey,
		agentId: params.agentId,
		config: params.config
	});
	let bindingStore = options.bindingStore;
	preDynamicStartupStages.mark("session-agent");
	let activeContextEngine = isActiveHarnessContextEngine(params.contextEngine) ? params.contextEngine : void 0;
	const isInactiveThreadBootstrapBinding = (binding) => !activeContextEngine && binding?.contextEngine?.projection?.mode === "thread_bootstrap";
	if (bindingIdentity.kind === "session" && bindingIdentity.sessionKey && (params.sessionTarget?.storePath || params.config?.session?.store)) {
		const authority = resolveCodexRunSessionBindingAuthority({
			identity: bindingIdentity,
			config: params.config,
			storePath: params.sessionTarget?.storePath
		});
		if (authority === "superseded") throw createCodexSessionGenerationSupersededError(bindingIdentity.sessionId);
		if (authority === "ephemeral") {
			const logicalIdentity = bindingIdentity;
			const physicalIdentity = {
				kind: "session",
				agentId: bindingIdentity.agentId,
				sessionId: bindingIdentity.sessionId
			};
			bindingStore = scopeCodexRunBindingStore({
				bindingStore,
				logicalIdentity,
				physicalIdentity
			});
			bindingIdentity = physicalIdentity;
		}
	}
	let startupBinding = await bindingStore.read(bindingIdentity);
	if (!startupBinding && bindingIdentity.kind === "session" && bindingIdentity.sessionKey) {
		if (!await reclaimCurrentCodexSessionGeneration({
			bindingStore,
			identity: bindingIdentity,
			config: params.config,
			storePath: params.sessionTarget?.storePath
		})) throw createCodexSessionGenerationSupersededError(bindingIdentity.sessionId);
		startupBinding = await bindingStore.read(bindingIdentity);
	}
	preDynamicStartupStages.mark("read-binding");
	const usesSupervisionConnection = startupBinding?.connectionScope === "supervision";
	if (usesSupervisionConnection) activeContextEngine = void 0;
	if (usesSupervisionConnection && pluginConfig.supervision?.enabled !== true) throw new Error("Codex supervision is disabled; refusing to open a native user-home supervised session");
	const resolveRuntimeOptionsForBinding = (selection) => applyStoredBindingPermissions({
		appServer: resolveCodexBindingAppServerConnection({
			binding: startupBinding,
			pluginConfig,
			execPolicy,
			modelProvider: selection.modelProvider,
			model: selection.model,
			config: params.config,
			agentDir,
			openClawSandboxActive: sandbox?.enabled === true
		}).appServer,
		binding: startupBinding,
		execPolicyTouched: execPolicy.touched
	});
	const initialStartupBindingHadInactiveThreadBootstrap = isInactiveThreadBootstrapBinding(startupBinding);
	const preparedAuthRoute = usesSupervisionConnection ? void 0 : params.runtimePlan?.auth.modelRoute;
	const startupAuthProfileCandidate = usesSupervisionConnection ? void 0 : preparedAuthRoute ? params.runtimePlan?.auth.forwardedAuthProfileId : params.runtimePlan?.auth.forwardedAuthProfileId ?? params.authProfileId ?? startupBinding?.authProfileId;
	const resolvedStartupAuthProfileId = usesSupervisionConnection ? void 0 : preparedAuthRoute ? startupAuthProfileCandidate : params.authProfileStore ? resolveCodexAppServerAuthProfileId({
		authProfileId: startupAuthProfileCandidate,
		store: params.authProfileStore,
		config: params.config
	}) : resolveCodexAppServerAuthProfileIdForAgent({
		authProfileId: startupAuthProfileCandidate,
		agentDir,
		config: params.config
	});
	const { authProfileId: startupAuthProfileId, nativeAuthProfile, preparedAuth: startupPreparedAuth } = usesSupervisionConnection ? {
		authProfileId: void 0,
		nativeAuthProfile: true,
		preparedAuth: void 0
	} : await resolveCodexAppServerPreparedAuthHandoff({
		authRequirement: preparedAuthRoute?.authRequirement,
		resolvedApiKey: params.resolvedApiKey,
		authProfileId: resolvedStartupAuthProfileId,
		authProfileStore: params.authProfileStore,
		agentDir,
		homeScope: resolveCodexAppServerHomeScope({ appServer: pluginConfig.appServer }),
		config: params.config,
		subscriptionProfileRequiredError: "Prepared Codex subscription route requires a forwarded OpenAI OAuth or token profile.",
		subscriptionProfileUnusableError: "Prepared Codex subscription auth profile is unusable."
	});
	const startupClientAuthProfileId = usesSupervisionConnection || startupPreparedAuth?.kind === "api-key" ? null : startupAuthProfileId;
	const resolveReviewerPolicyContext = (binding) => {
		const nativeModelOwned = binding?.preserveNativeModel === true;
		return resolveCodexModelBackedReviewerPolicyContext({
			provider: nativeModelOwned ? "codex" : params.provider,
			model: nativeModelOwned ? binding.model : params.modelId,
			bindingModelProvider: binding?.modelProvider,
			bindingModel: binding?.model,
			nativeAuthProfile
		});
	};
	let reviewerPolicyContext = resolveReviewerPolicyContext(startupBinding);
	preDynamicStartupStages.mark("auth-profile");
	let configuredAppServer = resolveRuntimeOptionsForBinding({
		modelProvider: reviewerPolicyContext.modelProvider,
		model: reviewerPolicyContext.model
	});
	const effectiveWorkspace = sandbox?.enabled ? sandbox.workspaceAccess === "rw" ? resolvedWorkspace : sandbox.workspaceDir : resolvedWorkspace;
	const requestedCwd = params.cwd ? resolveUserPath(params.cwd) : void 0;
	if (sandbox?.enabled && requestedCwd && requestedCwd !== resolvedWorkspace) throw new Error("cwd override is not supported for sandboxed Codex app-server runs; omit cwd or use the agent workspace as cwd");
	const effectiveCwd = sandbox?.enabled ? effectiveWorkspace : requestedCwd ?? effectiveWorkspace;
	if (effectiveWorkspace !== resolvedWorkspace) await ensureCodexWorkspaceDirOnce(effectiveWorkspace);
	preDynamicStartupStages.mark("effective-workspace");
	const shouldPromoteApprovalPolicy = beforeToolCallPolicy.hasBeforeToolCallHook || beforeToolCallPolicy.trustedToolPolicies.length > 0;
	const resolvePolicyAppServer = () => resolveCodexAppServerForOpenClawToolPolicy({
		appServer: configuredAppServer,
		pluginConfig,
		env: process.env,
		shouldPromote: shouldPromoteApprovalPolicy,
		execPolicy,
		canUseUntrustedApprovalPolicy: shouldPromoteApprovalPolicy && configuredAppServer.approvalPolicy === "never" && (configuredAppServer.start.transport !== "stdio" || isCodexAppServerApprovalPolicyAllowedByRequirements("untrusted"))
	});
	let policyAppServer = resolvePolicyAppServer();
	let appServer = resolveCodexAppServerForModelProvider({
		appServer: policyAppServer,
		provider: reviewerPolicyContext.modelProvider,
		model: reviewerPolicyContext.model,
		config: params.config,
		env: process.env,
		agentDir
	});
	let approvalPolicyPromotedForOpenClawToolPolicy = configuredAppServer.approvalPolicy === "never" && appServer.approvalPolicy === "untrusted";
	if (approvalPolicyPromotedForOpenClawToolPolicy) log.info("codex app-server approval policy promoted for OpenClaw tool policy", {
		from: "never",
		to: "untrusted",
		beforeToolCallHook: beforeToolCallPolicy.hasBeforeToolCallHook,
		trustedToolPolicies: beforeToolCallPolicy.trustedToolPolicies
	});
	preDynamicStartupStages.mark("app-server-policy");
	preDynamicStartupStages.mark("native-hook-relay");
	const terminalState = {
		turnSucceeded: false,
		explicitCancellationObserved: false,
		explicitCancellationReason: void 0,
		terminalOutcomeFrozen: false,
		sharedAbortAllowedAfterTerminalOutcome: false
	};
	const runAbortController = new AbortController();
	let attemptAbortNotified = false;
	const notifyAttemptAbort = () => {
		if (attemptAbortNotified) return;
		attemptAbortNotified = true;
		params.onAttemptAbort?.();
	};
	const abortExplicitly = (reason) => {
		if (terminalState.terminalOutcomeFrozen) {
			if (terminalState.sharedAbortAllowedAfterTerminalOutcome) notifyAttemptAbort();
			return;
		}
		notifyAttemptAbort();
		terminalState.explicitCancellationObserved = true;
		terminalState.explicitCancellationReason ??= reason;
		runAbortController.abort(reason);
	};
	const abortFromUpstream = () => {
		abortExplicitly(params.abortSignal?.reason ?? "upstream_abort");
	};
	if (params.abortSignal?.aborted) abortFromUpstream();
	else params.abortSignal?.addEventListener("abort", abortFromUpstream, { once: true });
	const startupBindingBeforeRotation = startupBinding;
	startupBinding = await rotateOversizedCodexAppServerStartupBinding({
		binding: startupBinding,
		bindingStore,
		identity: bindingIdentity,
		sessionFile: params.sessionFile,
		agentDir,
		codexHome: appServer.start.env?.CODEX_HOME,
		config: params.config,
		contextEngineActive: Boolean(activeContextEngine)
	});
	const initialInactiveThreadBootstrapBindingForcedFreshStart = initialStartupBindingHadInactiveThreadBootstrap && !startupBinding?.threadId;
	preDynamicStartupStages.mark("rotate-binding");
	if (startupBinding !== startupBindingBeforeRotation) {
		reviewerPolicyContext = resolveReviewerPolicyContext(startupBinding);
		configuredAppServer = resolveRuntimeOptionsForBinding({
			modelProvider: reviewerPolicyContext.modelProvider,
			model: reviewerPolicyContext.model
		});
		policyAppServer = resolvePolicyAppServer();
		appServer = resolveCodexAppServerForModelProvider({
			appServer: policyAppServer,
			provider: reviewerPolicyContext.modelProvider,
			model: reviewerPolicyContext.model,
			config: params.config,
			env: process.env,
			agentDir
		});
		approvalPolicyPromotedForOpenClawToolPolicy = configuredAppServer.approvalPolicy === "never" && appServer.approvalPolicy === "untrusted";
	}
	const nativeHookRelayEvents = resolveCodexNativeHookRelayEvents({
		configuredEvents: options.nativeHookRelay?.events,
		appServer
	});
	const mutable = {
		startupBinding,
		pluginAppServer: appServer
	};
	const resolveRuntimeOptionsForCurrentBinding = (selection) => applyStoredBindingPermissions({
		appServer: resolveCodexBindingAppServerConnection({
			binding: mutable.startupBinding,
			pluginConfig,
			execPolicy,
			modelProvider: selection.modelProvider,
			model: selection.model,
			config: params.config,
			agentDir,
			openClawSandboxActive: sandbox?.enabled === true
		}).appServer,
		binding: mutable.startupBinding,
		execPolicyTouched: execPolicy.touched
	});
	return {
		params,
		options,
		attemptStartedAt,
		profilerEnabled,
		codexModelCallTrace,
		codexModelContentCapture,
		codexModelCallId,
		fastModeAutoStartedAtMs,
		fastModeAutoProgressState,
		preDynamicStartupStages,
		attemptClientFactory,
		runtimeArtifactRequest,
		pluginConfig,
		computerUseConfig,
		sessionAgentId,
		resolvedWorkspace,
		sandboxSessionKey,
		contextSessionKey,
		sandbox,
		agentDir,
		bindingIdentity,
		bindingStore,
		activeContextEngine,
		isInactiveThreadBootstrapBinding,
		usesSupervisionConnection,
		startupAuthProfileId,
		startupAuthRequirement: preparedAuthRoute?.authRequirement,
		startupPreparedAuth,
		startupClientAuthProfileId,
		effectiveWorkspace,
		effectiveCwd,
		appServer,
		approvalPolicyPromotedForOpenClawToolPolicy,
		nativeHookRelayEvents,
		runAbortController,
		terminalState,
		abortExplicitly,
		abortFromUpstream,
		resolveReviewerPolicyContext,
		resolveRuntimeOptionsForCurrentBinding,
		mutable,
		initialStartupBindingHadInactiveThreadBootstrap,
		initialInactiveThreadBootstrapBindingForcedFreshStart
	};
}
//#endregion
//#region extensions/codex/src/app-server/attempt-context.ts
/**
* Builds Codex app-server prompt context, workspace bootstrap injections,
* system-prompt reports, and context-engine projection decisions.
*/
const CODEX_NATIVE_PROJECT_DOC_BASENAMES = /* @__PURE__ */ new Set(["agents.md"]);
const CODEX_TURN_SCOPED_WORKSPACE_DEVELOPER_CONTEXT_BASENAMES = /* @__PURE__ */ new Set([
	"identity.md",
	"soul.md",
	"user.md"
]);
const CODEX_WORKSPACE_DEVELOPER_CONTEXT_BASENAMES = new Set(CODEX_TURN_SCOPED_WORKSPACE_DEVELOPER_CONTEXT_BASENAMES);
const CODEX_MEMORY_CONTEXT_BASENAME = "memory.md";
const CODEX_MEMORY_TOOL_NAMES = /* @__PURE__ */ new Set(["memory_search", "memory_get"]);
const CODEX_BOOTSTRAP_CONTEXT_ORDER = /* @__PURE__ */ new Map([
	["soul.md", 10],
	["identity.md", 20],
	["user.md", 30],
	["bootstrap.md", 50],
	["memory.md", 60]
]);
/** Reads mirrored Codex session history for harness hooks. */
async function readMirroredSessionHistoryMessages(params) {
	const messages = await readCodexMirroredSessionHistoryMessages(params);
	if (!messages) log.warn("failed to read mirrored session history for codex harness hooks", { sessionFile: params.sessionFile });
	return messages;
}
/** Reads a valid thread-bootstrap projection request from context-engine output. */
function readContextEngineThreadBootstrapProjection(projection) {
	if (projection?.mode !== "thread_bootstrap") return;
	const epoch = projection.epoch?.trim();
	if (!epoch) {
		log.warn("context engine requested Codex thread-bootstrap projection without an epoch; using per-turn projection");
		return;
	}
	const fingerprint = projection.fingerprint?.trim();
	return {
		mode: "thread_bootstrap",
		epoch,
		...fingerprint ? { fingerprint } : {}
	};
}
/**
* Decides whether an existing Codex thread can reuse its context-engine
* bootstrap projection or must be reprojected.
*/
function resolveContextEngineBootstrapProjectionDecision(params) {
	const bindingProjection = params.startupBinding?.contextEngine?.projection;
	if (!params.startupBinding?.threadId || !bindingProjection) return {
		project: true,
		reason: !params.startupBinding?.threadId ? "missing-thread-binding" : "missing-projection-binding"
	};
	if (!params.expectedBinding || !isContextEngineBindingCompatible(params.startupBinding.contextEngine, params.expectedBinding)) return {
		project: true,
		reason: "context-engine-binding-mismatch"
	};
	if (!areCodexDynamicToolFingerprintsCompatible({
		previous: params.startupBinding.dynamicToolsFingerprint,
		next: params.dynamicToolsFingerprint,
		nextLegacy: params.legacyDynamicToolsFingerprint
	})) return {
		project: true,
		reason: "dynamic-tools-mismatch"
	};
	return bindingProjection.mode !== "thread_bootstrap" || bindingProjection.epoch !== params.projection.epoch || bindingProjection.fingerprint !== params.projection.fingerprint ? {
		project: true,
		reason: "projection-mismatch"
	} : {
		project: false,
		reason: "matching-thread-bootstrap-binding"
	};
}
/**
* Loads workspace bootstrap files and partitions them into Codex-native prompt,
* developer-instruction, heartbeat, and memory-tool contexts.
*/
async function buildCodexWorkspaceBootstrapContext(params) {
	try {
		const memoryToolsAvailable = params.memoryToolNames.length > 0 && canRouteCodexWorkspaceMemoryThroughTools({
			config: params.params.config,
			agentId: params.params.agentId ?? params.sessionAgentId,
			workspaceDir: params.effectiveWorkspace
		});
		const bootstrapFiles = await resolveBootstrapFilesForRun({
			workspaceDir: params.resolvedWorkspace,
			config: params.params.config,
			sessionKey: params.sessionKey,
			sessionId: params.params.sessionId,
			agentId: params.params.agentId ?? params.sessionAgentId,
			warn: (message) => log.warn(message),
			contextMode: params.params.bootstrapContextMode,
			runKind: params.params.bootstrapContextRunKind
		});
		const memoryToolRoutedBootstrapFiles = memoryToolsAvailable ? selectCodexWorkspaceMemoryReferenceFiles({
			bootstrapFiles,
			workspaceDir: params.resolvedWorkspace
		}) : [];
		const memoryReferenceFiles = memoryToolRoutedBootstrapFiles.map((file) => remapCodexContextFilePath({
			file: toCodexEmbeddedContextFile(file),
			sourceWorkspaceDir: params.resolvedWorkspace,
			targetWorkspaceDir: params.effectiveWorkspace
		}));
		const contextFiles = buildBootstrapContextForFiles(memoryToolsAvailable ? bootstrapFiles.filter((file) => !isCodexWorkspaceRootMemoryBootstrapFile({
			file,
			workspaceDir: params.resolvedWorkspace
		})) : bootstrapFiles, {
			config: params.params.config,
			agentId: params.params.agentId ?? params.sessionAgentId,
			warn: (message) => log.warn(message)
		}).map((file) => remapCodexContextFilePath({
			file,
			sourceWorkspaceDir: params.resolvedWorkspace,
			targetWorkspaceDir: params.effectiveWorkspace
		}));
		const promptContextFiles = selectCodexWorkspacePromptContextFiles(contextFiles, {
			excludeMemory: memoryToolsAvailable,
			memoryWorkspaceDir: params.effectiveWorkspace
		});
		const turnScopedDeveloperInstructionFiles = shouldInjectCodexOpenClawPromptContext(params.params) ? selectCodexWorkspaceTurnScopedDeveloperInstructionFiles(contextFiles) : [];
		return {
			bootstrapFiles,
			contextFiles,
			promptContextFiles,
			turnScopedDeveloperInstructionFiles,
			memoryReferenceFiles,
			memoryToolRoutedBootstrapFiles,
			memoryToolNames: [...params.memoryToolNames],
			memoryToolRouted: memoryToolsAvailable,
			promptContext: renderCodexWorkspaceBootstrapPromptContext(promptContextFiles),
			turnScopedDeveloperInstructions: renderCodexWorkspaceCollaborationDeveloperInstructions(turnScopedDeveloperInstructionFiles),
			memoryCollaborationInstructions: shouldInjectCodexOpenClawPromptContext(params.params) ? await renderCodexWorkspaceMemoryCollaborationInstructions({
				files: memoryReferenceFiles,
				toolNames: params.memoryToolNames,
				memoryToolRouted: memoryToolsAvailable,
				citationsMode: params.params.config?.memory?.citations,
				agentId: params.params.agentId ?? params.sessionAgentId,
				agentSessionKey: params.sessionKey,
				sandboxed: params.sandboxed
			}) : void 0
		};
	} catch (error) {
		log.warn("failed to load codex workspace bootstrap instructions", { error });
		return {
			bootstrapFiles: [],
			contextFiles: []
		};
	}
}
/**
* Builds the prompt-size, bootstrap-file, skill, and tool-schema accounting
* report for a Codex run.
*/
function buildCodexSystemPromptReport(params) {
	const toolEntries = flattenCodexDynamicToolFunctions(params.tools).map(buildCodexToolReportEntry);
	const schemaChars = toolEntries.reduce((sum, tool) => sum + tool.schemaChars, 0);
	const skillsPrompt = params.skillsPrompt.trim();
	const bootstrapMaxChars = readPositiveNumber(params.attempt.config?.agents?.defaults?.bootstrapMaxChars);
	const bootstrapTotalMaxChars = readPositiveNumber(params.attempt.config?.agents?.defaults?.bootstrapTotalMaxChars);
	return {
		source: "run",
		generatedAt: Date.now(),
		sessionId: params.attempt.sessionId,
		sessionKey: params.sessionKey,
		provider: params.attempt.provider,
		model: params.attempt.modelId,
		workspaceDir: params.workspaceDir,
		...bootstrapMaxChars ? { bootstrapMaxChars } : {},
		...bootstrapTotalMaxChars ? { bootstrapTotalMaxChars } : {},
		systemPrompt: {
			chars: params.developerInstructions.length,
			projectContextChars: 0,
			nonProjectContextChars: params.developerInstructions.length,
			hash: sha256Text(params.developerInstructions)
		},
		injectedWorkspaceFiles: buildCodexBootstrapInjectionStats({
			bootstrapFiles: params.workspaceBootstrapContext.bootstrapFiles,
			injectedFiles: params.workspaceBootstrapContext.promptContextFiles ?? [],
			developerInstructionFiles: params.workspaceBootstrapContext.turnScopedDeveloperInstructionFiles ?? [],
			memoryToolRoutedBootstrapFiles: params.workspaceBootstrapContext.memoryToolRoutedBootstrapFiles ?? [],
			memoryToolRouted: params.workspaceBootstrapContext.memoryToolRouted === true
		}),
		skills: {
			promptChars: skillsPrompt.length,
			hash: sha256Text(skillsPrompt),
			entries: buildCodexSkillReportEntries(skillsPrompt)
		},
		tools: {
			listChars: 0,
			schemaChars,
			entries: toolEntries
		}
	};
}
function buildCodexSkillReportEntries(skillsPrompt) {
	if (!skillsPrompt) return [];
	return Array.from(skillsPrompt.matchAll(/<skill>[\s\S]*?<\/skill>/gi)).map((match) => match[0] ?? "").map((block) => ({
		name: block.match(/<name>\s*([^<]+?)\s*<\/name>/i)?.[1]?.trim() || "(unknown)",
		blockChars: block.length
	})).filter((entry) => entry.blockChars > 0);
}
function buildCodexToolReportEntry(tool) {
	const summary = tool.description.trim();
	if (tool.deferLoading === true) return {
		name: tool.name,
		summaryChars: summary.length,
		summaryHash: sha256Text(summary),
		schemaChars: 0,
		schemaHash: stableJsonHash(null),
		propertiesCount: null
	};
	return {
		name: tool.name,
		summaryChars: summary.length,
		summaryHash: sha256Text(summary),
		...buildCodexToolSchemaStats(tool.inputSchema)
	};
}
function buildCodexToolSchemaStats(schema) {
	const schemaChars = (() => {
		try {
			return JSON.stringify(schema).length;
		} catch {
			return 0;
		}
	})();
	const properties = isJsonObject(schema) && isJsonObject(schema.properties) ? schema.properties : null;
	return {
		schemaChars,
		schemaHash: stableJsonHash(schema),
		propertiesCount: properties ? Object.keys(properties).length : null
	};
}
function sha256Text(value) {
	return createHash("sha256").update(value).digest("hex");
}
function normalizeForStableHash(value) {
	if (Array.isArray(value)) return value.map((entry) => normalizeForStableHash(entry));
	if (value && typeof value === "object") {
		const record = value;
		return Object.fromEntries(Object.keys(record).toSorted((left, right) => left.localeCompare(right)).map((key) => [key, normalizeForStableHash(record[key])]));
	}
	return value;
}
function stableJsonHash(value) {
	return sha256Text(JSON.stringify(normalizeForStableHash(value)) ?? "null");
}
function buildCodexBootstrapInjectionStats(params) {
	const injectedIndex = indexCodexContextFileContent(params.injectedFiles);
	const developerInstructionIndex = indexCodexContextFileContent(params.developerInstructionFiles ?? []);
	const memoryToolRoutedPaths = new Set((params.memoryToolRoutedBootstrapFiles ?? []).map((file) => readNonEmptyString(file.path)).filter(isNonEmptyString$1).map(normalizeCodexContextFilePath));
	return params.bootstrapFiles.map((file) => {
		const fileName = readNonEmptyString(file.name);
		const pathValue = readNonEmptyString(file.path) ?? fileName ?? "";
		const displayName = (fileName ?? getCodexContextFileDisplayBasename(pathValue)) || pathValue;
		const baseName = getCodexContextFileBasename(pathValue || fileName || "");
		const rawChars = file.missing ? 0 : (file.content ?? "").trimEnd().length;
		const memoryToolRoutedFile = baseName === CODEX_MEMORY_CONTEXT_BASENAME && params.memoryToolRouted === true && memoryToolRoutedPaths.has(normalizeCodexContextFilePath(pathValue));
		const injected = memoryToolRoutedFile ? void 0 : readCodexIndexedContextFileContent(injectedIndex, pathValue, fileName) ?? readCodexIndexedContextFileContent(developerInstructionIndex, pathValue, fileName);
		let injectedChars = memoryToolRoutedFile ? 0 : injected?.length ?? 0;
		let truncated = memoryToolRoutedFile ? false : !file.missing && injectedChars < rawChars;
		if (injected === void 0 && CODEX_NATIVE_PROJECT_DOC_BASENAMES.has(baseName)) {
			injectedChars = rawChars;
			truncated = false;
		}
		return {
			name: displayName,
			path: pathValue,
			missing: file.missing,
			rawChars,
			injectedChars,
			truncated
		};
	});
}
function indexCodexContextFileContent(files) {
	const byPath = /* @__PURE__ */ new Map();
	const byBaseName = /* @__PURE__ */ new Map();
	for (const file of files) {
		const pathValue = readNonEmptyString(file.path);
		if (!pathValue) continue;
		if (!byPath.has(pathValue)) byPath.set(pathValue, file.content);
		const baseName = getCodexContextFileBasename(pathValue);
		if (baseName && !byBaseName.has(baseName)) byBaseName.set(baseName, file.content);
	}
	return {
		byPath,
		byBaseName
	};
}
function readCodexIndexedContextFileContent(index, pathValue, fileName) {
	const pathContent = index.byPath.get(pathValue);
	if (pathContent !== void 0) return pathContent;
	if (fileName) {
		const nameContent = index.byPath.get(fileName);
		if (nameContent !== void 0) return nameContent;
	}
	const baseName = getCodexContextFileBasename(fileName ?? pathValue);
	return baseName ? index.byBaseName.get(baseName) : void 0;
}
function readPositiveNumber(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : void 0;
}
function readNonEmptyString(value) {
	return typeof value === "string" && value.trim().length > 0 ? value : void 0;
}
/**
* Builds OpenClaw-provided workspace prompt context for the current Codex turn.
*/
function buildCodexOpenClawPromptContext(params) {
	if (!shouldInjectCodexOpenClawPromptContext(params.params)) return;
	const sections = [params.workspacePromptContext?.trim() ? [
		"## OpenClaw Workspace Context",
		"",
		params.workspacePromptContext.trim()
	].join("\n") : void 0, params.watchedSessionsContext?.trim() || void 0].filter(isNonEmptyString$1);
	if (sections.length === 0) return;
	return [
		"OpenClaw runtime context for this turn:",
		"Treat this OpenClaw-provided context as supporting project/user reference for the current request.",
		"",
		...sections
	].join("\n");
}
/**
* Renders the watched-sessions block for the Codex per-turn runtime context.
* Codex builds its own instruction layers, so the embedded prompt's Watched
* Sessions section must be re-surfaced here or Codex-backed main sessions
* keep refusing cross-session questions (openclaw#114797).
*/
function buildCodexWatchedSessionsContext(params) {
	if (!shouldInjectCodexOpenClawPromptContext(params.attempt)) return;
	return buildWatchedSessionsHarnessContext({
		config: params.attempt.config,
		sessionKey: params.sessionKey,
		sandboxed: params.sandboxed,
		toolNames: flattenCodexDynamicToolFunctions(params.dynamicTools).map((tool) => normalizeCodexDynamicToolName(tool.name))
	});
}
function shouldInjectCodexOpenClawPromptContext(params) {
	return !(params.bootstrapContextMode === "lightweight" && params.bootstrapContextRunKind === "cron");
}
/** Renders loaded OpenClaw skill prompts as Codex collaboration instructions. */
function renderCodexSkillsCollaborationInstructions(params) {
	if (!shouldInjectCodexOpenClawPromptContext(params.attempt)) return;
	return params.skillsPrompt?.trim() ? [
		"## OpenClaw Skills",
		"",
		params.skillsPrompt.trim()
	].join("\n") : void 0;
}
/**
* Prepends OpenClaw context while preserving leading delivery metadata as
* routing guidance instead of user request text.
*/
function prependCodexOpenClawPromptContext(prompt, context, options = {}) {
	const { deliveryHint, prompt: promptWithoutDeliveryHint } = splitLeadingCodexDeliveryHint(prompt);
	if (!context?.trim() && (!deliveryHint || options.preservePromptWithoutContext)) return prompt;
	const promptSection = promptWithoutDeliveryHint.startsWith("OpenClaw assembled context for this turn:") ? promptWithoutDeliveryHint : ["Current user request:", promptWithoutDeliveryHint].join("\n");
	const deliverySection = deliveryHint ? [
		"OpenClaw delivery metadata:",
		"This delivery metadata is runtime routing guidance, not the user's request.",
		deliveryHint
	].join("\n") : void 0;
	return [
		context?.trim(),
		deliverySection,
		promptSection
	].filter(Boolean).join("\n\n");
}
/**
* Maps the surviving user-request portion of an input range after delivery
* metadata has been relocated before the request.
*/
function resolveCodexDeliveryHintPreservedInputRange(params) {
	const { prompt, promptInputRange, decoratedPrompt } = params;
	const { deliveryHint, prompt: promptWithoutDeliveryHint } = splitLeadingCodexDeliveryHint(prompt);
	if (!deliveryHint || !promptInputRange || promptInputRange.start < 0 || promptInputRange.end < promptInputRange.start || promptInputRange.end > prompt.length || !decoratedPrompt.endsWith(promptWithoutDeliveryHint)) return;
	const promptWithoutDeliveryHintStart = prompt.length - promptWithoutDeliveryHint.length;
	const inputStart = Math.max(promptInputRange.start, promptWithoutDeliveryHintStart);
	const inputEnd = Math.max(inputStart, Math.min(promptInputRange.end, promptWithoutDeliveryHint.length + promptWithoutDeliveryHintStart));
	const decoratedPromptSuffixStart = decoratedPrompt.length - promptWithoutDeliveryHint.length;
	const requestHeader = "Current user request:\n";
	const requestHeaderStart = decoratedPromptSuffixStart - 22;
	return {
		start: inputStart === promptWithoutDeliveryHintStart && decoratedPrompt.slice(requestHeaderStart, decoratedPromptSuffixStart) === requestHeader ? requestHeaderStart : decoratedPromptSuffixStart + inputStart - promptWithoutDeliveryHintStart,
		end: decoratedPromptSuffixStart + inputEnd - promptWithoutDeliveryHintStart
	};
}
function splitLeadingCodexDeliveryHint(prompt) {
	const trimmedStart = prompt.trimStart();
	const matchedHint = MESSAGE_TOOL_DELIVERY_HINTS.find((hint) => trimmedStart.startsWith(hint));
	if (!matchedHint) return { prompt };
	return {
		deliveryHint: matchedHint,
		prompt: trimmedStart.slice(matchedHint.length).replace(/^\s*\n/, "").trimStart()
	};
}
function renderCodexWorkspaceBootstrapPromptContext(contextFiles) {
	const files = contextFiles;
	if (files.length === 0) return;
	const lines = [
		"OpenClaw loaded these user-editable workspace files for the current turn. Codex loads AGENTS.md natively. SOUL.md, IDENTITY.md, and USER.md are provided as turn-scoped collaboration instructions so native Codex subagents do not inherit them. Those files are not repeated here.",
		"",
		"# Project Context",
		"",
		"The following project context files have been loaded:"
	];
	lines.push("");
	for (const file of files) lines.push(`## ${file.path}`, "", file.content, "");
	return lines.join("\n").trim();
}
function selectCodexWorkspacePromptContextFiles(contextFiles, options = {}) {
	const excludeMemory = options.excludeMemory ?? true;
	return contextFiles.filter((file) => {
		const baseName = getCodexContextFileBasename(file.path);
		return baseName && !CODEX_NATIVE_PROJECT_DOC_BASENAMES.has(baseName) && !CODEX_WORKSPACE_DEVELOPER_CONTEXT_BASENAMES.has(baseName) && (!excludeMemory || !isCodexWorkspaceRootMemoryContextFile({
			file,
			workspaceDir: options.memoryWorkspaceDir
		})) && !isMissingCodexBootstrapContextFile(file);
	}).toSorted(compareCodexContextFiles);
}
function selectCodexWorkspaceTurnScopedDeveloperInstructionFiles(contextFiles) {
	return selectCodexWorkspaceDeveloperInstructionFiles(contextFiles, CODEX_TURN_SCOPED_WORKSPACE_DEVELOPER_CONTEXT_BASENAMES);
}
function selectCodexWorkspaceDeveloperInstructionFiles(contextFiles, basenames) {
	return contextFiles.filter((file) => {
		const baseName = getCodexContextFileBasename(file.path);
		return baseName && basenames.has(baseName) && !isMissingCodexBootstrapContextFile(file) && file.content.trim().length > 0;
	}).toSorted(compareCodexContextFiles);
}
function renderCodexWorkspaceCollaborationDeveloperInstructions(files) {
	return renderCodexWorkspaceDeveloperInstructions({
		files,
		header: "## OpenClaw Agent Soul",
		preamble: "OpenClaw loaded these workspace instruction files from the active agent workspace. They are the canonical definitions of who you are, how you think and work, and the human you work alongside. Internalize and follow them accordingly.",
		wrapperTag: "AGENT_SOUL"
	});
}
function renderCodexWorkspaceDeveloperInstructions(params) {
	const { files, header, preamble, wrapperTag } = params;
	if (files.length === 0) return;
	const lines = [
		header,
		"",
		preamble,
		""
	];
	if (wrapperTag) lines.push(`<${wrapperTag}>`, "");
	for (const file of files) lines.push(`### ${file.path}`, "", file.content, "");
	if (wrapperTag) lines.push(`</${wrapperTag}>`);
	return lines.join("\n").trim();
}
function selectCodexWorkspaceMemoryReferenceFiles(params) {
	return params.bootstrapFiles.filter((file) => {
		return isCodexWorkspaceRootMemoryBootstrapFile({
			file,
			workspaceDir: params.workspaceDir
		}) && !file.missing && (file.content ?? "").trim().length > 0;
	}).toSorted(compareCodexBootstrapFiles);
}
/**
* Renders a memory-file reference that points Codex at memory tools instead of
* embedding MEMORY.md contents.
*/
function renderCodexWorkspaceMemoryReference(params) {
	if (params.files.length === 0) return;
	const lines = [
		"## OpenClaw Workspace Memory",
		"",
		`MEMORY.md exists in the active agent workspace as a memory file, not an instruction file. OpenClaw does not paste its contents into native Codex turns; use ${(params.toolNames?.length ? params.toolNames : Array.from(CODEX_MEMORY_TOOL_NAMES)).join(" or ")} when durable memory is relevant and the tools are available.`,
		""
	];
	for (const file of params.files) lines.push(`- ${file.path}`);
	return lines.join("\n").trim();
}
async function renderCodexWorkspaceMemoryCollaborationInstructions(params) {
	const sections = [params.memoryToolRouted ? await renderCodexMemoryRecallInstructions({
		toolNames: params.toolNames,
		citationsMode: params.citationsMode,
		agentId: params.agentId,
		agentSessionKey: params.agentSessionKey,
		sandboxed: params.sandboxed
	}) : void 0, renderCodexWorkspaceMemoryReference({
		files: params.files,
		toolNames: params.toolNames
	})].filter(isNonEmptyString$1);
	return sections.length > 0 ? sections.join("\n\n") : void 0;
}
async function renderCodexMemoryRecallInstructions(params) {
	const memoryPrompt = await prepareMemorySystemPromptAddition({
		availableTools: new Set(params.toolNames),
		citationsMode: params.citationsMode,
		agentId: params.agentId,
		agentSessionKey: params.agentSessionKey,
		sandboxed: params.sandboxed
	});
	if (!memoryPrompt) return;
	return [memoryPrompt, renderCodexMemoryToolSearchBridge(params.toolNames)].filter(isNonEmptyString$1).join("\n").trim();
}
function renderCodexMemoryToolSearchBridge(toolNames) {
	const memoryToolNames = toolNames.map((name) => normalizeCodexDynamicToolName(name)).filter((name) => CODEX_MEMORY_TOOL_NAMES.has(name)).toSorted();
	if (memoryToolNames.length === 0) return;
	return `Codex may expose ${memoryToolNames.join(" and ")} as deferred tools. When the memory guidance above calls for memory recall, use an already-loaded memory tool directly. If the needed memory tool is deferred and not currently callable, use \`tool_search\` to load it, then call that memory tool.`;
}
/** Lists available memory tool names understood by Codex workspace memory routing. */
function getCodexWorkspaceMemoryToolNames(tools) {
	const availableToolNames = new Set(flattenCodexDynamicToolFunctions(tools).map((tool) => normalizeCodexDynamicToolName(tool.name)));
	return Array.from(CODEX_MEMORY_TOOL_NAMES).filter((name) => availableToolNames.has(name));
}
function canRouteCodexWorkspaceMemoryThroughTools(params) {
	if (!params.config) return false;
	return isSameCodexWorkspacePath(resolveAgentWorkspaceDir(params.config, params.agentId), params.workspaceDir);
}
function isMissingCodexBootstrapContextFile(file) {
	return file.content.trimStart().startsWith("[MISSING] Expected at:");
}
function toCodexEmbeddedContextFile(file) {
	return {
		path: readNonEmptyString(file.path) ?? readNonEmptyString(file.name) ?? "",
		content: file.content ?? ""
	};
}
function isCodexWorkspaceRootMemoryBootstrapFile(params) {
	return isCodexWorkspaceRootMemoryPath({
		filePath: readNonEmptyString(params.file.path) ?? readNonEmptyString(params.file.name) ?? "",
		workspaceDir: params.workspaceDir
	});
}
function isCodexWorkspaceRootMemoryContextFile(params) {
	if (!params.workspaceDir) return false;
	return isCodexWorkspaceRootMemoryPath({
		filePath: params.file.path,
		workspaceDir: params.workspaceDir
	});
}
function isCodexWorkspaceRootMemoryPath(params) {
	const filePath = params.filePath.trim();
	if (!filePath) return false;
	return (path.isAbsolute(filePath) ? path.resolve(filePath) : path.resolve(params.workspaceDir, filePath)) === path.join(path.resolve(params.workspaceDir), "MEMORY.md");
}
function isSameCodexWorkspacePath(left, right) {
	return path.resolve(left) === path.resolve(right);
}
/**
* Remaps bootstrap file paths from the resolved workspace to the effective Codex
* workspace while preserving platform path separators.
*/
function remapCodexContextFilePath(params) {
	const relativePath = path.relative(params.sourceWorkspaceDir, params.file.path);
	if (!relativePath || relativePath === ".." || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath) || params.sourceWorkspaceDir === params.targetWorkspaceDir) return params.file;
	const targetUsesPosixSeparators = params.targetWorkspaceDir.includes("/") && !params.targetWorkspaceDir.includes("\\");
	const normalizedRelativePath = targetUsesPosixSeparators ? relativePath.replaceAll("\\", "/") : relativePath.replaceAll("/", "\\");
	return {
		...params.file,
		path: targetUsesPosixSeparators ? path.posix.join(params.targetWorkspaceDir, normalizedRelativePath) : path.win32.join(params.targetWorkspaceDir, normalizedRelativePath)
	};
}
function compareCodexContextFiles(left, right) {
	const leftPath = normalizeCodexContextFilePath(left.path);
	const rightPath = normalizeCodexContextFilePath(right.path);
	const leftBase = getCodexContextFileBasename(left.path);
	const rightBase = getCodexContextFileBasename(right.path);
	const leftOrder = CODEX_BOOTSTRAP_CONTEXT_ORDER.get(leftBase) ?? Number.MAX_SAFE_INTEGER;
	const rightOrder = CODEX_BOOTSTRAP_CONTEXT_ORDER.get(rightBase) ?? Number.MAX_SAFE_INTEGER;
	if (leftOrder !== rightOrder) return leftOrder - rightOrder;
	if (leftBase !== rightBase) return leftBase.localeCompare(rightBase);
	return leftPath.localeCompare(rightPath);
}
function compareCodexBootstrapFiles(left, right) {
	return compareCodexContextFiles(toCodexEmbeddedContextFile(left), toCodexEmbeddedContextFile(right));
}
function normalizeCodexContextFilePath(filePath) {
	return filePath.trim().replaceAll("\\", "/").toLowerCase();
}
function getCodexContextFileDisplayBasename(filePath) {
	return filePath.trim().replaceAll("\\", "/").split("/").pop()?.trim() ?? "";
}
function getCodexContextFileBasename(filePath) {
	return normalizeCodexContextFilePath(filePath).split("/").pop() ?? "";
}
function normalizeCodexDynamicToolName(name) {
	return name.trim().toLowerCase();
}
function isNonEmptyString$1(value) {
	return typeof value === "string" && value.length > 0;
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-context.ts
async function prepareCodexAttemptContext(runtime, attemptTools) {
	const { connection, runtimeParams, activeSessionId, activeSessionFile, buildActiveRunAttemptParams, effectiveContextWindowInfo, effectiveContextTokenBudget, effectiveRuntimeProviderId, effectiveRuntimeModelId, hookChannelId } = runtime;
	const { params, sessionAgentId, contextSessionKey, activeContextEngine, initialStartupBindingHadInactiveThreadBootstrap, sandboxSessionKey, effectiveWorkspace, effectiveCwd, agentDir, usesSupervisionConnection, resolvedWorkspace, initialInactiveThreadBootstrapBindingForcedFreshStart, sandbox } = connection;
	const { toolBridge } = attemptTools;
	const activeTranscriptTarget = {
		agentId: sessionAgentId,
		sessionFile: activeSessionFile,
		sessionId: activeSessionId,
		sessionKey: contextSessionKey,
		sessionTarget: params.sessionTarget
	};
	const historyState = { messages: !activeContextEngine && initialStartupBindingHadInactiveThreadBootstrap ? [] : await readMirroredSessionHistoryMessages(activeTranscriptTarget) ?? [] };
	const hadSessionTranscriptState = historyState.messages.length > 0;
	const hookContextWindowFields = {
		...effectiveContextWindowInfo?.tokens ? { contextTokenBudget: effectiveContextWindowInfo.tokens } : effectiveContextTokenBudget ? { contextTokenBudget: effectiveContextTokenBudget } : {},
		...effectiveContextWindowInfo?.source ? { contextWindowSource: effectiveContextWindowInfo.source } : {},
		...effectiveContextWindowInfo?.referenceTokens ? { contextWindowReferenceTokens: effectiveContextWindowInfo.referenceTokens } : {}
	};
	const hookContext = {
		runId: params.runId,
		agentId: sessionAgentId,
		sessionKey: sandboxSessionKey,
		sessionId: params.sessionId,
		workspaceDir: params.workspaceDir,
		messageProvider: params.messageProvider ?? void 0,
		trigger: params.trigger,
		channelId: hookChannelId,
		...hookContextWindowFields
	};
	const hookRunner = getAgentHarnessHookRunner();
	const activeContextEnginePluginId = activeContextEngine ? resolveContextEngineOwnerPluginId(activeContextEngine) : void 0;
	const buildActiveContextEngineRuntimeContext = () => buildHarnessContextEngineRuntimeContext({
		attempt: buildActiveRunAttemptParams(),
		workspaceDir: effectiveWorkspace,
		cwd: effectiveCwd,
		agentDir,
		activeAgentId: sessionAgentId,
		contextEnginePluginId: activeContextEnginePluginId,
		tokenBudget: effectiveContextTokenBudget
	});
	if (activeContextEngine) {
		await bootstrapHarnessContextEngine({
			hadSessionFile: hadSessionTranscriptState,
			contextEngine: activeContextEngine,
			sessionId: activeSessionId,
			sessionKey: contextSessionKey,
			sessionFile: activeSessionFile,
			sessionTarget: params.sessionTarget,
			runtimeContext: buildActiveContextEngineRuntimeContext(),
			contextEngineHostSupport: CODEX_APP_SERVER_CONTEXT_ENGINE_HOST,
			providerId: effectiveRuntimeProviderId,
			requestedModelId: usesSupervisionConnection ? void 0 : params.requestedModelId,
			modelId: effectiveRuntimeModelId,
			fallbackReason: usesSupervisionConnection ? void 0 : params.fallbackReason,
			degradedReason: usesSupervisionConnection ? void 0 : params.degradedReason,
			runMaintenance: runHarnessContextEngineMaintenance,
			config: params.config,
			warn: (message) => log.warn(message)
		});
		historyState.messages = await readMirroredSessionHistoryMessages(activeTranscriptTarget) ?? historyState.messages;
	}
	const workspaceBootstrapContext = await buildCodexWorkspaceBootstrapContext({
		params: runtimeParams,
		resolvedWorkspace,
		effectiveWorkspace,
		sessionKey: contextSessionKey,
		sessionAgentId,
		memoryToolNames: getCodexWorkspaceMemoryToolNames(toolBridge.availableSpecs),
		sandboxed: sandbox?.enabled === true
	});
	const baseDeveloperInstructions = buildDeveloperInstructions(runtimeParams, { dynamicTools: toolBridge.availableSpecs });
	return {
		runtime,
		attemptTools,
		activeTranscriptTarget,
		historyState,
		hookContext,
		hookContextWindowFields,
		hookRunner,
		buildActiveContextEngineRuntimeContext,
		workspaceBootstrapContext,
		baseDeveloperInstructions,
		openClawPromptContext: buildCodexOpenClawPromptContext({
			params: runtimeParams,
			workspacePromptContext: workspaceBootstrapContext.promptContext,
			watchedSessionsContext: buildCodexWatchedSessionsContext({
				attempt: runtimeParams,
				dynamicTools: toolBridge.availableSpecs,
				sessionKey: contextSessionKey,
				sandboxed: sandbox?.enabled === true
			})
		}),
		skillsCollaborationInstructions: renderCodexSkillsCollaborationInstructions({
			attempt: runtimeParams,
			skillsPrompt: params.skillsSnapshot?.prompt
		}),
		promptState: {
			promptText: params.prompt,
			promptContextRange: void 0,
			developerInstructions: baseDeveloperInstructions,
			prePromptMessageCount: historyState.messages.length,
			contextEngineProjection: void 0,
			precomputedStaleBindingContinuityProjectionApplied: false,
			staleBindingContinuityForcedFreshStart: false,
			inactiveThreadBootstrapBindingForcedFreshStart: initialInactiveThreadBootstrapBindingForcedFreshStart
		},
		codexContextProjectionMaxChars: resolveCodexContextEngineProjectionMaxChars({
			contextTokenBudget: effectiveContextTokenBudget,
			reserveTokens: resolveCodexContextEngineProjectionReserveTokens()
		})
	};
}
//#endregion
//#region extensions/codex/src/app-server/attempt-diagnostics.ts
/**
* Diagnostic helpers for Codex app-server model calls and plugin-thread config
* eligibility.
*/
/** Reads a tool schema field in either app-server or OpenClaw naming. */
function readCodexDiagnosticToolParameters(tool) {
	return tool.inputSchema ?? tool.parameters;
}
/** Builds compact diagnostic tool definitions for trusted private telemetry. */
function buildCodexDiagnosticToolDefinitions(tools) {
	return tools.map((tool) => ({
		name: tool.name,
		description: tool.description,
		parameters: readCodexDiagnosticToolParameters(tool)
	}));
}
/** Returns the serialized UTF-8 byte length for a JSON-compatible value. */
function utf8JsonByteLength(value) {
	try {
		return Buffer.byteLength(JSON.stringify(value), "utf8");
	} catch {
		return;
	}
}
/** Builds a short namespaced fingerprint for sensitive log values. */
function fingerprintCodexLogValue(namespace, value) {
	const hash = createHash("sha256");
	hash.update(namespace);
	hash.update("\0");
	hash.update(value);
	return `sha256:${hash.digest("hex").slice(0, 16)}`;
}
/**
* Builds redacted diagnostics explaining whether plugin thread config was
* eligible for a Codex app-server attempt.
*/
function buildCodexPluginThreadConfigEligibilityLogData(params) {
	return {
		sessionId: params.sessionId,
		sessionKey: params.sessionKey,
		enabled: params.pluginThreadConfigRequired,
		policyConfigured: params.resolvedPluginPolicy?.configured === true,
		policyEnabled: params.resolvedPluginPolicy?.enabled === true,
		allowAllPlugins: params.resolvedPluginPolicy?.allowAllPlugins === true,
		pluginConfigKeys: params.resolvedPluginPolicy?.pluginPolicies.map((plugin) => plugin.configKey).toSorted(),
		enabledPluginConfigKeys: params.enabledPluginConfigKeys,
		appCacheKeyFingerprint: fingerprintCodexLogValue("openclaw:codex:plugin-app-cache-key:v1", params.pluginAppCacheKey),
		authProfileId: params.startupAuthProfileId,
		appServerTransport: params.appServer.start.transport,
		appServerCommandSource: params.appServer.start.commandSource
	};
}
/**
* Creates lifecycle emitters for trusted model-call diagnostics with optional
* private payload capture.
*/
function createCodexModelCallDiagnosticEmitter(params) {
	const now = params.now ?? (() => Date.now());
	const toolDefinitions = params.capture.toolDefinitions ? buildCodexDiagnosticToolDefinitions(params.tools) : void 0;
	let startedAt = now();
	let started = false;
	let terminalEmitted = false;
	let requestPayloadBytes;
	const privateData = (modelContent) => modelContent && Object.keys(modelContent).length > 0 ? { modelContent } : void 0;
	const buildContent = () => {
		const modelContent = {
			...params.capture.inputMessages ? { inputMessages: params.buildInputMessages() } : {},
			...params.capture.systemPrompt ? { systemPrompt: params.buildSystemPrompt() } : {},
			...toolDefinitions ? { toolDefinitions } : {}
		};
		return Object.keys(modelContent).length > 0 ? modelContent : void 0;
	};
	const requestPayloadBytesField = () => requestPayloadBytes !== void 0 ? { requestPayloadBytes } : {};
	return {
		setRequestPayloadBytes(bytes) {
			requestPayloadBytes = bytes;
		},
		emitStarted() {
			startedAt = now();
			started = true;
			emitTrustedDiagnosticEventWithPrivateData({
				type: "model.call.started",
				...params.baseFields
			}, privateData(buildContent()));
		},
		emitCompleted(result) {
			if (!started || terminalEmitted) return;
			terminalEmitted = true;
			emitTrustedDiagnosticEventWithPrivateData({
				type: "model.call.completed",
				...params.baseFields,
				durationMs: Math.max(0, now() - startedAt),
				...requestPayloadBytesField()
			}, privateData({
				...buildContent(),
				...params.capture.outputMessages ? { outputMessages: result.lastAssistant ? [result.lastAssistant] : result.assistantTexts } : {}
			}));
		},
		emitError(error, fields = {}) {
			if (!started || terminalEmitted) return;
			terminalEmitted = true;
			emitTrustedDiagnosticEventWithPrivateData({
				type: "model.call.error",
				...params.baseFields,
				durationMs: Math.max(0, now() - startedAt),
				errorCategory: fields.failureKind ?? "error",
				...fields.failureKind ? { failureKind: fields.failureKind } : {},
				...requestPayloadBytesField()
			}, privateData({
				...buildContent(),
				...params.capture.outputMessages ? { outputMessages: [] } : {}
			}));
			params.onErrorDiagnostic?.(error);
		}
	};
}
/** Classifies model-call failures into timeout/abort buckets for diagnostics. */
function classifyCodexModelCallFailureKind(params) {
	if (params.timedOut || params.turnCompletionIdleTimedOut) return "timeout";
	const errorMessage = params.error ? params.formatError(params.error).toLowerCase() : "";
	if (errorMessage.includes("timed out") || errorMessage.includes("timeout")) return "timeout";
	if (params.runAborted && !params.clientClosedAbort) return (typeof params.abortReason === "string" ? params.abortReason.toLowerCase() : params.abortReason ? params.formatError(params.abortReason).toLowerCase() : "").includes("timeout") ? "timeout" : "aborted";
	return errorMessage.includes("aborted") ? "aborted" : void 0;
}
//#endregion
//#region extensions/codex/src/app-server/attempt-results.ts
const CODEX_APP_SERVER_MISSING_TERMINAL_EVENT_USER_MESSAGE = "Codex stopped before confirming the turn was complete. The response may be incomplete; retry if needed.";
const CODEX_APP_SERVER_MISSING_TERMINAL_EVENT_SIDE_EFFECT_USER_MESSAGE = "Codex stopped before confirming the turn was complete. Some work may already have been performed; verify the current state before retrying.";
const CODEX_APP_SERVER_TERMINAL_IDLE_USER_MESSAGE = "Codex stopped responding: no activity arrived for the turn's liveness window, so the turn was ended and the connection was replaced. Retry to continue on a fresh session.";
/** Joins terminal assistant text blocks into the final attempt answer. */
function collectTerminalAssistantText(result) {
	return result.assistantTexts.join("\n\n").trim();
}
/**
* Builds the user-facing timeout outcome when Codex stops without a terminal
* turn event.
*/
function buildCodexAppServerPromptTimeoutOutcome(params) {
	if (!params.turnCompletionIdleTimedOut) return;
	if (params.turnWatchTimeoutKind === "terminal") {
		if (collectTerminalAssistantText(params.result)) return;
		const terminalReplayBlockedReason = resolveCodexAppServerReplayBlockedReason(params.result);
		return {
			message: CODEX_APP_SERVER_TERMINAL_IDLE_USER_MESSAGE,
			...terminalReplayBlockedReason ? {
				replayInvalid: true,
				livenessState: "abandoned"
			} : {}
		};
	}
	if (params.turnWatchTimeoutKind !== void 0 && params.turnWatchTimeoutKind !== "completion") return;
	const replayBlockedReason = resolveCodexAppServerReplayBlockedReason(params.result);
	return {
		message: replayBlockedReason === "tool_activity" || replayBlockedReason === "potential_side_effect" || replayBlockedReason === "active_item" ? CODEX_APP_SERVER_MISSING_TERMINAL_EVENT_SIDE_EFFECT_USER_MESSAGE : CODEX_APP_SERVER_MISSING_TERMINAL_EVENT_USER_MESSAGE,
		...replayBlockedReason ? {
			replayInvalid: true,
			livenessState: "abandoned"
		} : {}
	};
}
/** Explains why an incomplete app-server turn cannot be safely replayed. */
function resolveCodexAppServerReplayBlockedReason(result) {
	if (result.replayMetadata.hadPotentialSideEffects) return "potential_side_effect";
	if (result.assistantTexts.some((text) => text.trim().length > 0)) return "assistant_output";
	if (result.toolMetas.length > 0 || result.clientToolCalls || result.lastToolError || result.didSendDeterministicApprovalPrompt) return "tool_activity";
	if (result.itemLifecycle.startedCount > 0 || result.itemLifecycle.activeCount > 0) return "active_item";
}
/** Builds an attempt result for failures before the app-server turn starts. */
function buildCodexTurnStartFailureResult(params) {
	return {
		terminal: attemptTerminal.normalize({
			promptError: params.promptError ?? params.message,
			promptErrorSource: "prompt"
		}),
		sessionIdUsed: params.params.sessionId,
		messagesSnapshot: params.messagesSnapshot,
		assistantTexts: [],
		toolMetas: [],
		lastAssistant: void 0,
		currentAttemptAssistant: void 0,
		didSendViaMessagingTool: false,
		messagingToolSentTexts: [],
		messagingToolSentMediaUrls: [],
		messagingToolSentTargets: [],
		messagingToolSourceReplyPayloads: [],
		cloudCodeAssistFormatError: false,
		replayMetadata: {
			hadPotentialSideEffects: false,
			replaySafe: true
		},
		itemLifecycle: {
			startedCount: 0,
			completedCount: 0,
			activeCount: 0
		},
		systemPromptReport: params.systemPromptReport
	};
}
/** Detects app-server errors caused by invalid image payload data. */
function isInvalidCodexImagePayloadError(message) {
	if (typeof message !== "string" || !message.trim()) return false;
	const normalizedMessage = message.replace(/[_-]+/gu, " ");
	return /\b(?:invalid|malformed)\b[\s\S]{0,120}\b(?:image|image url|base64)\b/iu.test(normalizedMessage) || /\b(?:image|image url|base64)\b[\s\S]{0,120}\b(?:invalid|malformed)\b/iu.test(normalizedMessage);
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-state.ts
async function clearCodexBindingAfterInvalidImagePayload(bindingStore, identity, fields) {
	const currentBinding = await bindingStore.read(identity);
	const expectedThreadId = fields.threadId ?? currentBinding?.threadId;
	if (!expectedThreadId) return;
	if (currentBinding && currentBinding.threadId !== expectedThreadId) {
		log.warn("codex app-server image payload error detected for unbound thread; preserving thread binding", {
			...fields,
			boundThreadId: currentBinding.threadId
		});
		return;
	}
	if (currentBinding?.connectionScope === "supervision") {
		log.warn("codex app-server image payload error detected for supervised thread; preserving native binding", fields);
		return;
	}
	log.warn("codex app-server image payload error detected; clearing thread binding", fields);
	await bindingStore.mutate(identity, {
		kind: "clear",
		threadId: expectedThreadId
	});
}
async function markCodexAppServerBindingCoveredThroughTurn(params) {
	await params.bindingStore.mutate(params.identity, {
		kind: "patch",
		threadId: params.threadId,
		patch: { historyCoveredThrough: (/* @__PURE__ */ new Date()).toISOString() }
	});
}
function isNonEmptyString(value) {
	return typeof value === "string" && value.length > 0;
}
function shouldUseFreshCodexThreadAfterContextEngineOverflow(params) {
	if (!params.contextEngineActive || params.thread.lifecycle.action !== "resumed") return false;
	const message = formatErrorMessage(params.error);
	return /ran out of room in the model'?s context window/iu.test(message) || /context window/iu.test(message) || /context length/iu.test(message) || /maximum context/iu.test(message) || /too many tokens/iu.test(message);
}
function isCodexActiveCompactTurnError(error) {
	if (!(error instanceof CodexAppServerRpcError)) return false;
	const data = isJsonObject(error.data) ? error.data : void 0;
	const codexErrorInfo = isJsonObject(data?.codexErrorInfo) ? data.codexErrorInfo : void 0;
	return (isJsonObject(codexErrorInfo?.activeTurnNotSteerable) ? codexErrorInfo.activeTurnNotSteerable : void 0)?.turnKind === "compact";
}
function readCodexFinalizationHookNotification(notification, threadId, turnId) {
	if (notification.method !== "hook/started" && notification.method !== "hook/completed") return;
	const params = isJsonObject(notification.params) ? notification.params : void 0;
	const run = params && isJsonObject(params.run) ? params.run : void 0;
	if (params?.threadId !== threadId || params.turnId !== turnId || run?.eventName !== "stop" && run?.eventName !== "subagentStop" || typeof run.id !== "string" || !run.id) return;
	if (notification.method === "hook/started") return {
		phase: "started",
		runId: run.id
	};
	return {
		phase: "completed",
		runId: run.id,
		status: typeof run.status === "string" ? run.status : void 0
	};
}
function joinPresentSections(...sections) {
	return sections.filter((section) => Boolean(section?.trim())).join("\n\n");
}
function prependCurrentInboundContext(prompt, context) {
	const text = context?.text.trim();
	return text ? [text, prompt].filter(Boolean).join("\n\n") : prompt;
}
function waitForCodexNotificationDispatchTurn() {
	return new Promise((resolve) => {
		setImmediate(resolve);
	});
}
function buildCodexAppServerTimeoutDiagnostics(params) {
	const readString = (key) => {
		const value = params.details?.[key];
		return typeof value === "string" && value.trim() ? value : void 0;
	};
	const readNumber = (key) => {
		const value = params.details?.[key];
		return typeof value === "number" && Number.isFinite(value) ? value : void 0;
	};
	const readBoolean = (key) => {
		const value = params.details?.[key];
		return typeof value === "boolean" ? value : void 0;
	};
	return {
		...params.idleMs !== void 0 ? { idleMs: params.idleMs } : {},
		...params.timeoutMs !== void 0 ? { timeoutMs: params.timeoutMs } : {},
		...params.lastActivityReason ? { lastActivityReason: params.lastActivityReason } : {},
		...readString("lastNotificationMethod") ? { lastNotificationMethod: readString("lastNotificationMethod") } : {},
		...readString("lastNotificationItemId") ? { lastNotificationItemId: readString("lastNotificationItemId") } : {},
		...readString("lastNotificationItemType") ? { lastNotificationItemType: readString("lastNotificationItemType") } : {},
		...readString("lastNotificationItemRole") ? { lastNotificationItemRole: readString("lastNotificationItemRole") } : {},
		...readString("lastAssistantTextPreview") ? { lastAssistantTextPreview: readString("lastAssistantTextPreview") } : {},
		...readNumber("activeAppServerTurnRequests") !== void 0 ? { activeAppServerTurnRequests: readNumber("activeAppServerTurnRequests") } : {},
		...readNumber("activeTurnItemCount") !== void 0 ? { activeTurnItemCount: readNumber("activeTurnItemCount") } : {},
		...readBoolean("terminalTurnNotificationQueued") !== void 0 ? { terminalTurnNotificationQueued: readBoolean("terminalTurnNotificationQueued") } : {},
		...readBoolean("completionIdleWatchArmed") !== void 0 ? { completionIdleWatchArmed: readBoolean("completionIdleWatchArmed") } : {},
		...readBoolean("assistantCompletionIdleWatchArmed") !== void 0 ? { assistantCompletionIdleWatchArmed: readBoolean("assistantCompletionIdleWatchArmed") } : {},
		...readBoolean("terminalIdleWatchArmed") !== void 0 ? { terminalIdleWatchArmed: readBoolean("terminalIdleWatchArmed") } : {}
	};
}
//#endregion
//#region extensions/codex/src/app-server/settled-turn-context.ts
function collectUniqueMessageIdentities(messages) {
	const identities = /* @__PURE__ */ new Map();
	for (const [index, message] of messages.entries()) {
		const identity = readMirrorIdentity(message);
		if (!identity) continue;
		if (identities.has(identity)) return;
		identities.set(identity, index);
	}
	return identities;
}
function adoptPersistedHostPrompt(params) {
	const promptIdentity = `${params.turnId}:prompt`;
	if (params.mirroredMessages.some((message) => readMirrorIdentity(message) === promptIdentity)) return params;
	const sourcePrompt = params.settledMessages[0];
	const sourceKey = sourcePrompt?.idempotencyKey;
	if (sourcePrompt?.role !== "user" || readMirrorIdentity(sourcePrompt) !== promptIdentity || typeof sourceKey !== "string" || sourceKey.trim().length === 0) return params;
	const matches = params.historyMessages.flatMap((message, index) => message.role === "user" && message.idempotencyKey === sourceKey ? [{
		index,
		message
	}] : []);
	const persistedPrompt = matches.length === 1 ? matches[0] : void 0;
	const persistedMetadata = persistedPrompt?.message;
	if (!persistedPrompt || readMirrorIdentity(persistedPrompt.message) !== void 0 || readCodexMirrorSourceFingerprint(persistedPrompt.message) !== void 0 || persistedMetadata?.["__openclaw"]?.mirrorOrigin === "codex-app-server") return params;
	const sourceUpstreamText = readUpstreamUserText(sourcePrompt);
	const persistedUpstreamText = readUpstreamUserText(persistedPrompt.message);
	if (persistedUpstreamText !== void 0 && persistedUpstreamText !== sourceUpstreamText) return params;
	let logicalPrompt = attachCodexMirrorIdentity(persistedPrompt.message, promptIdentity);
	if (sourceUpstreamText !== void 0) logicalPrompt = attachUpstreamUserText(logicalPrompt, sourceUpstreamText);
	if (serializeCodexMirrorSourceEvidence(logicalPrompt) !== serializeCodexMirrorSourceEvidence(sourcePrompt)) return params;
	const historyMessages = [...params.historyMessages];
	historyMessages[persistedPrompt.index] = logicalPrompt;
	return {
		historyMessages,
		mirroredMessages: [logicalPrompt, ...params.mirroredMessages]
	};
}
/** Freezes one complete active transcript branch through the settled tool-result boundary. */
function buildCodexSettledTurnFinalizationContext(params) {
	const { historyMessages, mirroredMessages } = adoptPersistedHostPrompt(params);
	const boundaryMessage = params.settledMessages.findLast((message) => message.role === "toolResult");
	const boundaryIdentity = boundaryMessage ? readMirrorIdentity(boundaryMessage) : void 0;
	if (!boundaryMessage || !boundaryIdentity || !boundaryIdentity.startsWith(`${params.turnId}:tool:`)) return;
	const settledBoundaryIndex = params.settledMessages.indexOf(boundaryMessage);
	const requiredIdentities = params.settledMessages.slice(0, settledBoundaryIndex + 1).map(readMirrorIdentity);
	if (requiredIdentities.length === 0 || requiredIdentities.some((identity) => !identity) || new Set(requiredIdentities).size !== requiredIdentities.length || !requiredIdentities.includes(`${params.turnId}:prompt`)) return;
	const historyIdentities = collectUniqueMessageIdentities(historyMessages);
	const mirroredIdentities = collectUniqueMessageIdentities(mirroredMessages);
	if (!historyIdentities || !mirroredIdentities) return;
	const mirroredBoundaryIndex = mirroredIdentities.get(boundaryIdentity);
	if (mirroredBoundaryIndex === void 0) return;
	const mirroredThroughBoundary = mirroredMessages.slice(0, mirroredBoundaryIndex + 1);
	if (mirroredThroughBoundary.length !== requiredIdentities.length || mirroredThroughBoundary.some((message, index) => readMirrorIdentity(message) !== requiredIdentities[index])) return;
	const historyBoundaryIndex = historyIdentities.get(boundaryIdentity);
	if (historyBoundaryIndex === void 0) return;
	let previousHistoryIndex = -1;
	for (const mirroredMessage of mirroredThroughBoundary) {
		const identity = readMirrorIdentity(mirroredMessage);
		const historyIndex = identity ? historyIdentities.get(identity) : void 0;
		const historyMessage = historyIndex === void 0 ? void 0 : historyMessages[historyIndex];
		if (historyIndex === void 0 || historyIndex <= previousHistoryIndex || historyIndex > historyBoundaryIndex || !historyMessage || serializeCodexMirrorSourceEvidence(historyMessage) !== serializeCodexMirrorSourceEvidence(mirroredMessage)) return;
		previousHistoryIndex = historyIndex;
	}
	return {
		source: "openclaw-transcript",
		messages: Object.freeze(structuredClone(params.historyMessages.slice(0, historyBoundaryIndex + 1)))
	};
}
/** Reads and freezes the current active transcript branch after mirroring has settled. */
async function captureCodexSettledTurnFinalizationContext(params) {
	try {
		const historyMessages = await readCodexMirroredSessionHistoryMessages(params);
		if (!historyMessages) return;
		return buildCodexSettledTurnFinalizationContext({
			historyMessages,
			mirroredMessages: params.mirroredMessages,
			settledMessages: params.settledMessages,
			turnId: params.turnId
		});
	} catch (error) {
		log.warn("codex settled-turn finalization context capture failed", {
			error: formatErrorMessage(error),
			turnId: params.turnId
		});
		return;
	}
}
//#endregion
//#region extensions/codex/src/app-server/trajectory.ts
const SENSITIVE_FIELD_RE = /(?:authorization|cookie|credential|key|password|passwd|secret|token)/iu;
const PRIVATE_PAYLOAD_FIELD_RE = /(?:image|screenshot|attachment|fileData|dataUri)/iu;
const AUTHORIZATION_VALUE_RE = /\b(Bearer|Basic)\s+[A-Za-z0-9+/._~=-]{8,}/giu;
const JWT_VALUE_RE = /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/gu;
const COOKIE_PAIR_RE = /\b([A-Za-z][A-Za-z0-9_.-]{1,64})=([A-Za-z0-9+/._~%=-]{16,})(?=;|\s|$)/gu;
const TRAJECTORY_RUNTIME_EVENT_MAX_BYTES = 256 * 1024;
const TRAJECTORY_RUNTIME_OVERSIZE_PRESERVED_DATA_KEYS = ["usage", "promptCache"];
function boundedTrajectoryEvent(event) {
	const line = JSON.stringify(event);
	const bytes = Buffer.byteLength(line, "utf8");
	if (bytes <= TRAJECTORY_RUNTIME_EVENT_MAX_BYTES) return event;
	const originalData = event.data && typeof event.data === "object" && !Array.isArray(event.data) ? event.data : {};
	const originalDataKeys = Object.keys(originalData);
	const preservedDataKeys = /* @__PURE__ */ new Set();
	const baseData = {
		truncated: true,
		originalBytes: bytes,
		limitBytes: TRAJECTORY_RUNTIME_EVENT_MAX_BYTES,
		reason: "trajectory-event-size-limit"
	};
	const buildTruncatedEvent = (includeDroppedFields) => {
		const data = { ...baseData };
		for (const key of TRAJECTORY_RUNTIME_OVERSIZE_PRESERVED_DATA_KEYS) if (preservedDataKeys.has(key)) data[key] = originalData[key];
		if (includeDroppedFields) {
			const droppedFields = originalDataKeys.filter((key) => !preservedDataKeys.has(key));
			if (droppedFields.length > 0) data.droppedFields = droppedFields;
		}
		const truncatedEvent = {
			...event,
			data
		};
		const truncated = JSON.stringify(truncatedEvent);
		if (Buffer.byteLength(truncated, "utf8") <= TRAJECTORY_RUNTIME_EVENT_MAX_BYTES) return truncatedEvent;
	};
	let best = buildTruncatedEvent(true) ?? buildTruncatedEvent(false);
	if (!best) return;
	for (const key of TRAJECTORY_RUNTIME_OVERSIZE_PRESERVED_DATA_KEYS) {
		if (!Object.hasOwn(originalData, key)) continue;
		preservedDataKeys.add(key);
		const next = buildTruncatedEvent(true) ?? buildTruncatedEvent(false);
		if (next) {
			best = next;
			continue;
		}
		preservedDataKeys.delete(key);
	}
	return best;
}
function createCodexHostTrajectorySink(params) {
	return {
		write: (event) => {
			params.recorder.recordEvent(event.type, event.data);
		},
		flush: async () => {
			await params.recorder.flush();
		}
	};
}
/** Creates a trajectory recorder when trajectory capture is enabled for the environment. */
function createCodexTrajectoryRecorder(params) {
	if (!parseTrajectoryEnabled(params.env ?? process.env)) return null;
	if (!params.trajectoryRecorder) {
		params.warn?.("codex trajectory capture requires the SQLite host recorder", {
			sessionId: params.attempt.sessionId,
			reason: "sqlite-recorder-unavailable"
		});
		return null;
	}
	const sink = createCodexHostTrajectorySink({ recorder: params.trajectoryRecorder });
	let seq = 0;
	const attribution = resolveCodexLocalRuntimeAttribution(params.attempt);
	return {
		recordEvent: (type, data) => {
			const event = boundedTrajectoryEvent({
				traceSchema: "openclaw-trajectory",
				schemaVersion: 1,
				traceId: params.attempt.sessionId,
				source: "runtime",
				type,
				ts: (/* @__PURE__ */ new Date()).toISOString(),
				seq: seq += 1,
				sourceSeq: seq,
				sessionId: params.attempt.sessionId,
				sessionKey: params.attempt.sessionKey,
				runId: params.attempt.runId,
				workspaceDir: params.cwd,
				provider: attribution.provider,
				modelId: params.attempt.modelId,
				modelApi: attribution.api,
				data: data ? sanitizeValue(data) : void 0
			});
			if (event) sink.write(event);
		},
		flush: sink.flush
	};
}
/** Records compiled prompt/tool context at the start of a Codex runtime attempt. */
function recordCodexTrajectoryContext(recorder, params) {
	if (!recorder) return;
	recorder.recordEvent("context.compiled", {
		systemPrompt: params.developerInstructions,
		prompt: params.prompt ?? params.attempt.prompt,
		imagesCount: params.attempt.images?.length ?? 0,
		tools: toTrajectoryToolDefinitions(params.tools)
	});
}
/** Records final Codex model completion metadata and assistant snapshots. */
function recordCodexTrajectoryCompletion(recorder, params) {
	if (!recorder) return;
	const terminal = attemptTerminal.project(params.result.terminal);
	recorder.recordEvent("model.completed", {
		threadId: params.threadId,
		turnId: params.turnId,
		timedOut: params.timedOut,
		yieldDetected: params.yieldDetected ?? false,
		aborted: terminal.aborted,
		promptError: normalizeCodexTrajectoryError(terminal.promptError),
		usage: params.result.attemptUsage,
		assistantTexts: params.result.assistantTexts,
		messagesSnapshot: params.result.messagesSnapshot
	});
}
function parseTrajectoryEnabled(env) {
	const value = env.OPENCLAW_TRAJECTORY?.trim().toLowerCase();
	if (value === "1" || value === "true" || value === "yes" || value === "on") return true;
	if (value === "0" || value === "false" || value === "no" || value === "off") return false;
	return true;
}
function toTrajectoryToolDefinitions(tools) {
	if (!tools || tools.length === 0) return;
	return flattenCodexDynamicToolFunctions(tools).flatMap((tool) => {
		const name = tool.name?.trim();
		if (!name) return [];
		return [{
			name,
			description: tool.description,
			parameters: sanitizeValue(tool.inputSchema)
		}];
	}).toSorted((left, right) => left.name.localeCompare(right.name));
}
function sanitizeValue(value, depth = 0, key = "") {
	if (value == null || typeof value === "boolean" || typeof value === "number") return value;
	if (typeof value === "string") {
		if (SENSITIVE_FIELD_RE.test(key)) return "<redacted>";
		if (value.startsWith("data:") && value.length > 256) return `<redacted data-uri ${value.slice(0, value.indexOf(",")).length} chars>`;
		if (PRIVATE_PAYLOAD_FIELD_RE.test(key) && value.length > 256) return "<redacted payload>";
		const redacted = redactSensitiveString(value);
		return redacted.length > 2e4 ? `${truncateUtf16Safe(redacted, 2e4)}…` : redacted;
	}
	if (depth >= 6) return "<truncated>";
	if (Array.isArray(value)) return value.slice(0, 100).map((entry) => sanitizeValue(entry, depth + 1, key));
	if (typeof value === "object") {
		const next = {};
		for (const [keyLocal, child] of Object.entries(value).slice(0, 100)) next[keyLocal] = sanitizeValue(child, depth + 1, keyLocal);
		return next;
	}
	return JSON.stringify(value);
}
function redactSensitiveString(value) {
	return value.replace(AUTHORIZATION_VALUE_RE, "$1 <redacted>").replace(JWT_VALUE_RE, "<redacted-jwt>").replace(COOKIE_PAIR_RE, "$1=<redacted>");
}
/** Converts arbitrary prompt errors into trajectory-safe text. */
function normalizeCodexTrajectoryError(value) {
	if (!value) return null;
	if (value instanceof Error) return value.message;
	if (typeof value === "string") return value;
	try {
		return JSON.stringify(value);
	} catch {
		return "Unknown error";
	}
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-finalize.ts
async function finalizeCodexAttempt(resources, turnRuntime, lifecycle, notifications, requestRuntime, activeTurn) {
	const { prompt, state: resourceState, trajectoryRecorder, markTrajectoryEndRecorded } = resources;
	const { context, systemPromptReport } = prompt;
	const { runtime, attemptTools, activeTranscriptTarget, historyState, hookContext } = context;
	const { hookContextWindowFields, hookRunner, promptState } = context;
	const { connection, preparedAuthBinding, activeSessionId, activeSessionFile } = runtime;
	const { buildActiveRunAttemptParams, effectiveContextTokenBudget, effectiveRuntimeProviderId, effectiveRuntimeModelId } = runtime;
	const { params, terminalState, runAbortController, activeContextEngine, bindingStore, bindingIdentity, appServer, usesSupervisionConnection, sessionAgentId, contextSessionKey, effectiveCwd, effectiveWorkspace, agentDir, attemptStartedAt, startupAuthProfileId } = connection;
	const { toolBridge, toolState } = attemptTools;
	const { state, completion, pendingOpenClawDynamicToolCompletionIds, activeTurnItemIds, activeCompletionBlockerItemIds, activeFinalizationHookRunIds, turnWatches } = turnRuntime;
	const { emitLifecycleTerminal, buildLifecycleTerminalMeta } = lifecycle;
	const { drainNotificationQueue } = notifications;
	const { codexModelCallDiagnostics } = requestRuntime;
	const { activeTurnId, activeProjector, streamState, freezeRunTerminalOutcome, notifyUserMessagePersisted } = activeTurn;
	await completion;
	await drainNotificationQueue();
	const hasQuiescentCompletedAssistant = activeProjector.hasCompletedTerminalAssistantText() && state.activeAppServerTurnRequests === 0 && activeTurnItemIds.size === 0 && activeCompletionBlockerItemIds.size === 0 && pendingOpenClawDynamicToolCompletionIds.size === 0 && activeFinalizationHookRunIds.size === 0 && state.unsettledFinalizationHookCount === 0 && state.rejectedFinalizationHookAssistant === void 0;
	const hasRecoverableCompletedAssistant = !turnWatches.isCompletionIdleWatchPinnedByTerminalError() && turnWatches.isAssistantCompletionIdleWatchArmed() && hasQuiescentCompletedAssistant;
	const recoveredTurnWatchTimeout = state.turnCompletionIdleTimedOut && !terminalState.explicitCancellationObserved && hasRecoverableCompletedAssistant && activeProjector.recoverCompletedTerminalAssistantAfterTurnWatchTimeout();
	if (recoveredTurnWatchTimeout) {
		log.warn("codex app-server recovered completed assistant output after missing turn completion", {
			threadId: resourceState.thread.threadId,
			turnId: activeTurnId,
			timeoutKind: state.turnWatchTimeoutKind,
			idleMs: state.turnWatchTimeoutIdleMs,
			timeoutMs: state.turnWatchTimeoutMs
		});
		trajectoryRecorder?.recordEvent("turn.watch_timeout_recovered", {
			threadId: resourceState.thread.threadId,
			turnId: activeTurnId,
			timeoutKind: state.turnWatchTimeoutKind,
			idleMs: state.turnWatchTimeoutIdleMs,
			timeoutMs: state.turnWatchTimeoutMs
		});
	}
	const result = activeProjector.buildResult(toolBridge.telemetry, { yieldDetected: toolState.yieldDetected });
	const projectedTerminal = attemptTerminal.project(result.terminal);
	const effectiveTimedOut = state.timedOut && !recoveredTurnWatchTimeout;
	const effectiveTurnCompletionIdleTimedOut = state.turnCompletionIdleTimedOut && !recoveredTurnWatchTimeout;
	const isFinalAborted = () => projectedTerminal.aborted || terminalState.explicitCancellationObserved || runAbortController.signal.aborted && !state.clientClosedAbort && !recoveredTurnWatchTimeout;
	const clientClosedPromptErrorForFinal = state.clientClosedPromptError && hasRecoverableCompletedAssistant ? void 0 : state.clientClosedPromptError;
	let finalPromptError = clientClosedPromptErrorForFinal ?? (effectiveTurnCompletionIdleTimedOut ? state.turnCompletionIdleTimeoutMessage : effectiveTimedOut ? "codex app-server attempt timed out" : projectedTerminal.promptError);
	const finalPromptErrorMessage = typeof finalPromptError === "string" ? finalPromptError : finalPromptError instanceof Error ? finalPromptError.message : finalPromptError ? formatErrorMessage(finalPromptError) : void 0;
	if (isInvalidCodexImagePayloadError(finalPromptErrorMessage)) await clearCodexBindingAfterInvalidImagePayload(bindingStore, bindingIdentity, {
		phase: "turn_completed",
		threadId: resourceState.thread.threadId,
		turnId: activeTurnId,
		error: finalPromptErrorMessage
	});
	if (resourceState.thread.connectionScope !== "supervision" && shouldUseFreshCodexThreadAfterContextEngineOverflow({
		error: finalPromptError,
		contextEngineActive: Boolean(activeContextEngine),
		thread: resourceState.thread
	})) {
		log.warn("codex app-server context-engine turn overflowed after resume; clearing thread binding for recovery", {
			threadId: resourceState.thread.threadId,
			turnId: activeTurnId,
			error: finalPromptErrorMessage
		});
		await bindingStore.mutate(bindingIdentity, {
			kind: "clear",
			threadId: resourceState.thread.threadId
		});
	}
	const refreshedUsageLimitPromptError = await refreshCodexUsageLimitPromptError({
		client: resourceState.client,
		message: finalPromptErrorMessage,
		timeoutMs: appServer.requestTimeoutMs,
		signal: runAbortController.signal
	});
	if (refreshedUsageLimitPromptError) {
		await markCodexAuthProfileBlockedFromRateLimits({
			params,
			authProfileId: startupAuthProfileId,
			rateLimits: refreshedUsageLimitPromptError.rateLimitsForProfile
		});
		finalPromptError = createCodexUsageLimitPromptError(refreshedUsageLimitPromptError.message);
	} else if (isCodexUsageLimitPromptError(finalPromptError) && state.rateLimitsRevisionBeforeLastTurnStart !== void 0 && readCodexRateLimitsRevision(resourceState.client) > state.rateLimitsRevisionBeforeLastTurnStart) await markCodexAuthProfileBlockedFromRateLimits({
		params,
		authProfileId: startupAuthProfileId,
		rateLimits: readRecentCodexRateLimits(resourceState.client)
	});
	const finalPromptErrorSource = effectiveTimedOut || clientClosedPromptErrorForFinal ? "prompt" : projectedTerminal.promptErrorSource;
	const codexAppServerFailureKind = clientClosedPromptErrorForFinal ? "client_closed_before_turn_completed" : effectiveTurnCompletionIdleTimedOut ? "turn_completion_idle_timeout" : void 0;
	const replayBlockedReason = codexAppServerFailureKind ? resolveCodexAppServerReplayBlockedReason(result) : void 0;
	const promptTimeoutOutcome = buildCodexAppServerPromptTimeoutOutcome({
		result,
		turnCompletionIdleTimedOut: effectiveTurnCompletionIdleTimedOut,
		turnWatchTimeoutKind: state.turnWatchTimeoutKind
	});
	const failureDiagnostics = codexAppServerFailureKind === "client_closed_before_turn_completed" && state.clientClosedDiagnostic ? { transportError: state.clientClosedDiagnostic } : codexAppServerFailureKind === "turn_completion_idle_timeout" && state.turnWatchTimeoutKind === "completion" ? buildCodexAppServerTimeoutDiagnostics({
		idleMs: state.turnWatchTimeoutIdleMs,
		timeoutMs: state.turnWatchTimeoutMs,
		lastActivityReason: state.turnWatchTimeoutLastActivityReason,
		details: state.turnWatchTimeoutDetails
	}) : void 0;
	const codexAppServerFailure = codexAppServerFailureKind ? {
		kind: codexAppServerFailureKind,
		...codexAppServerFailureKind === "turn_completion_idle_timeout" && state.turnWatchTimeoutKind ? { turnWatchTimeoutKind: state.turnWatchTimeoutKind } : {},
		transport: appServer.start.transport,
		threadId: resourceState.thread.threadId,
		turnId: activeTurnId,
		replaySafe: replayBlockedReason === void 0,
		...replayBlockedReason ? { replayBlockedReason } : {},
		...failureDiagnostics ? { diagnostics: failureDiagnostics } : {}
	} : void 0;
	const finalAborted = isFinalAborted();
	const completedTurnStatus = activeProjector.getCompletedTurnStatus();
	const locallyCompletedTurn = state.completed && (state.localCompletionRequested || !state.terminalTurnNotificationQueued) && !state.timedOut && clientClosedPromptErrorForFinal === void 0;
	const turnSucceeded = !finalAborted && !effectiveTimedOut && (finalPromptError === null || finalPromptError === void 0) && (completedTurnStatus === "completed" || recoveredTurnWatchTimeout || locallyCompletedTurn);
	if (settleCodexSourceReplyFinality(toolBridge.telemetry, turnSucceeded)) result.agentHarnessResultClassification = void 0;
	const attemptSucceeded = turnSucceeded && result.agentHarnessResultClassification === void 0;
	terminalState.turnSucceeded = turnSucceeded;
	terminalState.sharedAbortAllowedAfterTerminalOutcome = shouldKeepCodexSharedAbortOpen({
		trigger: params.trigger,
		result,
		attemptSucceeded,
		explicitCancellationObserved: terminalState.explicitCancellationObserved
	});
	freezeRunTerminalOutcome();
	const modelCallFailureKind = classifyCodexModelCallFailureKind({
		error: finalPromptError,
		timedOut: effectiveTimedOut,
		turnCompletionIdleTimedOut: effectiveTurnCompletionIdleTimedOut,
		runAborted: finalAborted,
		abortReason: terminalState.explicitCancellationReason ?? runAbortController.signal.reason,
		clientClosedAbort: state.clientClosedAbort,
		formatError: formatErrorMessage
	}) ?? (finalAborted ? "aborted" : void 0);
	if (modelCallFailureKind) codexModelCallDiagnostics.emitError(finalPromptError ?? "codex app-server attempt interrupted", { failureKind: modelCallFailureKind });
	else if (finalPromptError) codexModelCallDiagnostics.emitError(finalPromptError);
	else codexModelCallDiagnostics.emitCompleted(result);
	const mirrorOutcome = await codexTranscriptMirrorRuntime.mirrorBestEffort({
		params,
		agentId: sessionAgentId,
		notifyUserMessagePersisted,
		result,
		sessionKey: contextSessionKey,
		cwd: effectiveCwd,
		threadId: resourceState.thread.threadId,
		turnId: activeTurnId
	});
	const { assistantTranscriptOwned, assistantTranscriptIdempotencyKey } = mirrorOutcome;
	const shouldCaptureSettledTurnFinalizationContext = turnSucceeded && result.assistantTexts.every((text) => !text.trim()) && result.messagesSnapshot.some((message) => message.role === "toolResult");
	const settledTurnFinalizationContext = shouldCaptureSettledTurnFinalizationContext ? await captureCodexSettledTurnFinalizationContext({
		...activeTranscriptTarget,
		mirroredMessages: mirrorOutcome.mirroredMessages,
		settledMessages: result.messagesSnapshot,
		turnId: activeTurnId
	}) : void 0;
	if (shouldCaptureSettledTurnFinalizationContext && !settledTurnFinalizationContext) log.warn("codex settled-turn finalization context is unavailable", {
		threadId: resourceState.thread.threadId,
		turnId: activeTurnId
	});
	if (activeContextEngine) {
		const contextEnginePluginId = resolveContextEngineOwnerPluginId(activeContextEngine);
		const isHeartbeat = params.bootstrapContextRunKind === "heartbeat" || params.bootstrapContextRunKind === "commitment-only";
		const finalMessages = await readMirroredSessionHistoryMessages(activeTranscriptTarget) ?? historyState.messages.concat(result.messagesSnapshot);
		await finalizeHarnessContextEngineTurn({
			contextEngine: activeContextEngine,
			promptError: Boolean(finalPromptError),
			aborted: finalAborted,
			yieldAborted: Boolean(result.yieldDetected),
			sessionIdUsed: activeSessionId,
			sessionKey: contextSessionKey,
			sessionFile: activeSessionFile,
			sessionTarget: params.sessionTarget,
			messagesSnapshot: finalMessages,
			prePromptMessageCount: promptState.prePromptMessageCount,
			tokenBudget: effectiveContextTokenBudget,
			runtimeContext: buildHarnessContextEngineRuntimeContextFromUsage({
				attempt: buildActiveRunAttemptParams(),
				workspaceDir: effectiveWorkspace,
				cwd: effectiveCwd,
				agentDir,
				activeAgentId: sessionAgentId,
				contextEnginePluginId,
				tokenBudget: effectiveContextTokenBudget,
				lastCallUsage: result.attemptUsage,
				promptCache: result.promptCache
			}),
			contextEngineHostSupport: CODEX_APP_SERVER_CONTEXT_ENGINE_HOST,
			providerId: usesSupervisionConnection ? resourceState.thread.modelProvider ?? effectiveRuntimeProviderId : params.provider,
			requestedModelId: usesSupervisionConnection ? void 0 : params.requestedModelId,
			modelId: usesSupervisionConnection ? resourceState.thread.model ?? effectiveRuntimeModelId : params.modelId,
			fallbackReason: usesSupervisionConnection ? void 0 : params.fallbackReason,
			degradedReason: usesSupervisionConnection ? void 0 : params.degradedReason,
			runMaintenance: runHarnessContextEngineMaintenance,
			config: params.config,
			warn: (message) => log.warn(message),
			isHeartbeat
		});
	}
	runAgentHarnessLlmOutputHook({
		event: {
			runId: params.runId,
			sessionId: params.sessionId,
			provider: usesSupervisionConnection ? resourceState.thread.modelProvider ?? effectiveRuntimeProviderId : params.provider,
			model: usesSupervisionConnection ? resourceState.thread.model ?? effectiveRuntimeModelId : params.modelId,
			...hookContextWindowFields,
			resolvedRef: usesSupervisionConnection ? `${resourceState.thread.modelProvider ?? effectiveRuntimeProviderId}/${resourceState.thread.model ?? effectiveRuntimeModelId}` : params.runtimePlan?.observability.resolvedRef ?? `${params.provider}/${params.modelId}`,
			...!usesSupervisionConnection && params.runtimePlan?.observability.harnessId ? { harnessId: params.runtimePlan.observability.harnessId } : {},
			assistantTexts: result.assistantTexts,
			...result.lastAssistant ? { lastAssistant: result.lastAssistant } : {},
			...result.attemptUsage ? { usage: result.attemptUsage } : {}
		},
		ctx: hookContext,
		hookRunner
	});
	await runCodexAgentEndHook(params, {
		event: {
			messages: result.messagesSnapshot,
			success: !finalAborted && !finalPromptError,
			...finalPromptError ? { error: formatErrorMessage(finalPromptError) } : {},
			durationMs: Date.now() - attemptStartedAt
		},
		ctx: {
			...hookContext,
			modelProviderId: resourceState.thread.modelProvider ?? effectiveRuntimeProviderId,
			modelId: resourceState.thread.model ?? effectiveRuntimeModelId,
			authProfileId: resourceState.thread.authProfileId ?? startupAuthProfileId,
			modelIterations: result.modelIterations ?? 0,
			skillWorkshopAvailable: flattenCodexDynamicToolFunctions(attemptTools.toolBridge.availableSpecs).some((tool) => tool.name === "skill_workshop"),
			compacted: (result.compactionCount ?? 0) > 0,
			messageChannel: params.messageChannel,
			messageProvider: params.messageProvider,
			chatType: params.chatType,
			agentAccountId: params.agentAccountId,
			groupId: params.groupId,
			groupChannel: params.groupChannel,
			groupSpace: params.groupSpace,
			memberRoleIds: params.memberRoleIds,
			spawnedBy: params.spawnedBy,
			senderId: params.senderId ?? void 0,
			senderName: params.senderName,
			senderUsername: params.senderUsername,
			senderE164: params.senderE164,
			senderIsOwner: params.senderIsOwner
		},
		hookRunner
	});
	state.shouldDelayNativeHookRelayUnregister = completedTurnStatus === "completed" && !effectiveTimedOut && !runAbortController.signal.aborted && !finalAborted && !finalPromptError;
	if (state.shouldDelayNativeHookRelayUnregister) try {
		await markCodexAppServerBindingCoveredThroughTurn({
			bindingStore,
			identity: bindingIdentity,
			threadId: resourceState.thread.threadId
		});
	} catch (error) {
		if (resourceState.thread.connectionScope === "supervision") throw error;
		if (!await bindingStore.mutate(bindingIdentity, {
			kind: "clear",
			threadId: resourceState.thread.threadId
		})) throw error;
		log.warn("codex app-server binding coverage update failed after completed turn; cleared stale binding", {
			threadId: resourceState.thread.threadId,
			turnId: activeTurnId,
			error
		});
	}
	recordCodexTrajectoryCompletion(trajectoryRecorder, {
		attempt: params,
		result,
		threadId: resourceState.thread.threadId,
		turnId: activeTurnId,
		timedOut: effectiveTimedOut,
		yieldDetected: toolState.yieldDetected
	});
	trajectoryRecorder?.recordEvent("session.ended", {
		status: finalPromptError ? "error" : finalAborted || effectiveTimedOut ? "interrupted" : "success",
		threadId: resourceState.thread.threadId,
		turnId: activeTurnId,
		timedOut: effectiveTimedOut,
		yieldDetected: toolState.yieldDetected,
		promptError: normalizeCodexTrajectoryError(finalPromptError)
	});
	markTrajectoryEndRecorded();
	const terminalAssistantText = collectTerminalAssistantText(result);
	if (terminalAssistantText && (!streamState.eventEmitted || streamState.needsTerminalSnapshot) && !finalAborted && !finalPromptError) emitCodexAppServerEvent(params, {
		stream: "assistant",
		data: { text: terminalAssistantText }
	});
	emitLifecycleTerminal(finalPromptError ? {
		phase: "error",
		error: formatErrorMessage(finalPromptError),
		...buildLifecycleTerminalMeta({
			aborted: finalAborted,
			timedOut: effectiveTimedOut
		})
	} : {
		phase: "end",
		...buildLifecycleTerminalMeta({
			aborted: finalAborted,
			timedOut: effectiveTimedOut,
			yielded: toolState.yieldDetected
		})
	});
	return {
		...result,
		terminal: attemptTerminal.normalize({
			timedOut: effectiveTimedOut,
			aborted: finalAborted,
			promptError: finalPromptError,
			promptErrorSource: finalPromptErrorSource
		}),
		...codexAppServerFailure ? { codexAppServerFailure } : {},
		...promptTimeoutOutcome ? { promptTimeoutOutcome } : {},
		...assistantTranscriptOwned ? { assistantTranscriptOwned: true } : {},
		...assistantTranscriptIdempotencyKey ? { assistantTranscriptIdempotencyKey } : {},
		...settledTurnFinalizationContext ? { settledTurnFinalizationContext } : {},
		...resourceState.runtimeArtifact ? { runtimeArtifact: resourceState.runtimeArtifact } : {},
		...!finalAborted && !effectiveTimedOut && !finalPromptError && preparedAuthBinding ? { authBindingFingerprint: preparedAuthBinding.fingerprint } : {},
		systemPromptReport
	};
}
//#endregion
//#region extensions/codex/src/app-server/attempt-notification-state.ts
/**
* State machine for Codex app-server turn notifications and idle-watch updates.
*/
/** Emits coarse execution phases exactly once from app-server notifications. */
function reportCodexExecutionNotification(params) {
	const { notification } = params;
	if (notification.method === "turn/started") {
		params.emitExecutionPhaseOnce("turn_accepted", { phase: "turn_accepted" });
		return;
	}
	if (notification.method === "item/agentMessage/delta") {
		params.emitExecutionPhaseOnce("assistant_output_started", { phase: "assistant_output_started" });
		return;
	}
	if (notification.method !== "item/started") return;
	const item = readCodexNotificationItem(notification.params);
	const tool = item ? codexExecutionToolName(item) : void 0;
	if (!item || !tool) return;
	params.emitExecutionPhaseOnce(`tool:${item.id}`, {
		phase: "tool_execution_started",
		tool,
		itemId: item.id
	});
}
/** Returns true when a notification ends the current app-server turn. */
function isTerminalCodexTurnNotificationForTurn(params) {
	if (!isCodexNotificationForTurn(params.notification.params, params.threadId, params.turnId)) return false;
	return params.notification.method === "turn/completed";
}
/**
* Applies one notification to active item tracking, idle watches, and terminal
* turn state.
*/
function applyCodexTurnNotificationState(params) {
	const { notification, turnWatches } = params;
	const isCurrentTurnNotification = isCodexNotificationForTurn(notification.params, params.threadId, params.turnId);
	const isTurnCompletion = notification.method === "turn/completed" && isCurrentTurnNotification;
	let turnCrossedToolHandoff = params.turnCrossedToolHandoff;
	if (isCurrentTurnNotification) {
		turnWatches.touchActivity(`notification:${notification.method}`, {
			details: describeNotificationActivity(notification),
			attemptProgress: true
		});
		params.onReportExecutionNotification(notification);
		updateActiveTurnItemIds(notification, params.activeTurnItemIds);
		updateActiveCompletionBlockerItemIds(notification, params.activeCompletionBlockerItemIds);
		if (notification.method === "item/completed" && params.activeTurnItemIds.size === 0) params.onScheduleTerminalDynamicToolReleaseCheck();
	}
	const unblockedAssistantCompletionRelease = isCurrentTurnNotification && turnWatches.isAssistantCompletionIdleWatchArmed() && notification.method === "item/completed" && params.activeTurnItemIds.size === 0;
	const trackedDynamicToolCompletion = isPendingOpenClawDynamicToolCompletionNotification(notification, params.pendingOpenClawDynamicToolCompletionIds);
	const rawToolOutputCompletion = isRawToolOutputCompletionNotification(notification);
	if (isCurrentTurnNotification && (rawToolOutputCompletion || isNativeToolProgressNotification(notification))) turnCrossedToolHandoff = true;
	const assistantCompletionCanRelease = isAssistantCompletionReleaseNotification(notification, turnCrossedToolHandoff);
	const postToolProgressNeedsTerminalGuard = isCurrentTurnNotification && turnCrossedToolHandoff && ((isRawAssistantProgressNotification(notification) || isRawReasoningCompletionNotification(notification)) && params.activeTurnItemIds.size === 0 || isReasoningProgressNotification(notification));
	const postToolPatchUpdateNeedsTerminalGuard = isCurrentTurnNotification && turnCrossedToolHandoff && isFileChangePatchUpdatedNotification(notification);
	const rawResponseItemCompletedWithNoActiveItems = isCurrentTurnNotification && notification.method === "rawResponseItem/completed" && params.activeTurnItemIds.size === 0 && params.activeAppServerTurnRequests === 0 && !assistantCompletionCanRelease && !postToolProgressNeedsTerminalGuard && !rawToolOutputCompletion;
	const shouldArmNoToolPostProgressReplyWatch = isCurrentTurnNotification && !turnCrossedToolHandoff && params.activeTurnItemIds.size === 0 && (isReasoningItemCompletionNotification(notification) || isAssistantCommentaryCompletionNotification(notification));
	const shouldArmNoToolPostRawProgressReplyWatch = !turnCrossedToolHandoff && rawResponseItemCompletedWithNoActiveItems && (isRawReasoningCompletionNotification(notification) || isRawAssistantProgressNotification(notification));
	const shouldRearmCompletionIdleWatchAfterLastCurrentTurnItem = isCurrentTurnNotification && notification.method === "item/completed" && params.activeTurnItemIds.size === 0 && !trackedDynamicToolCompletion && !assistantCompletionCanRelease && !shouldArmNoToolPostProgressReplyWatch;
	const shouldUsePostToolContinuationWatch = turnCrossedToolHandoff && (postToolProgressNeedsTerminalGuard || postToolPatchUpdateNeedsTerminalGuard || rawToolOutputCompletion || trackedDynamicToolCompletion || shouldRearmCompletionIdleWatchAfterLastCurrentTurnItem);
	const armPostToolContinuationWatch = () => {
		turnWatches.armCompletionIdleWatch({ timeoutMs: params.postToolRawAssistantCompletionIdleTimeoutMs });
		turnWatches.extendAttemptIdleWatch(params.postToolRawAssistantCompletionIdleTimeoutMs);
	};
	const armPostProgressReplyWatch = () => {
		turnWatches.armCompletionIdleWatch({ timeoutMs: CODEX_POST_REASONING_REPLY_IDLE_TIMEOUT_MS });
		turnWatches.extendAttemptIdleWatch(CODEX_POST_REASONING_REPLY_IDLE_TIMEOUT_MS);
	};
	if (isCurrentTurnNotification && notification.method === "error") {
		if (isRetryableErrorNotification(notification.params)) turnWatches.disarmCompletionIdleWatch();
		else turnWatches.armCompletionIdleWatch({ pinnedByTerminalError: true });
		turnWatches.disarmAssistantCompletionIdleWatch();
	} else if (isTurnCompletion) turnWatches.disarmAssistantCompletionIdleWatch();
	else if (isCurrentTurnNotification && assistantCompletionCanRelease) turnWatches.armAssistantCompletionIdleWatch(describeNotificationActivity(notification));
	else if (postToolProgressNeedsTerminalGuard || postToolPatchUpdateNeedsTerminalGuard) armPostToolContinuationWatch();
	else if (shouldArmNoToolPostProgressReplyWatch || shouldArmNoToolPostRawProgressReplyWatch) armPostProgressReplyWatch();
	else if (trackedDynamicToolCompletion) armPostToolContinuationWatch();
	else if (unblockedAssistantCompletionRelease) turnWatches.armAssistantCompletionIdleWatch(describeNotificationActivity(notification));
	else if (shouldRearmCompletionIdleWatchAfterLastCurrentTurnItem) if (shouldUsePostToolContinuationWatch) armPostToolContinuationWatch();
	else turnWatches.armCompletionIdleWatch();
	else if (rawResponseItemCompletedWithNoActiveItems) turnWatches.armCompletionIdleWatch();
	else if (isCurrentTurnNotification && rawToolOutputCompletion) armPostToolContinuationWatch();
	else if (isCurrentTurnNotification && shouldDisarmAssistantCompletionIdleWatch(notification)) turnWatches.disarmAssistantCompletionIdleWatch();
	if (turnWatches.isCompletionIdleWatchArmed() && !turnWatches.isCompletionIdleWatchPinnedByTerminalError() && notification.method !== "turn/completed" && isCurrentTurnNotification && !trackedDynamicToolCompletion && !rawToolOutputCompletion && !postToolProgressNeedsTerminalGuard && !postToolPatchUpdateNeedsTerminalGuard && !rawResponseItemCompletedWithNoActiveItems && !shouldArmNoToolPostProgressReplyWatch && !shouldArmNoToolPostRawProgressReplyWatch && !shouldRearmCompletionIdleWatchAfterLastCurrentTurnItem) turnWatches.disarmCompletionIdleWatch();
	if (trackedDynamicToolCompletion) {
		const itemId = readNotificationItemId(notification);
		if (itemId) {
			params.pendingOpenClawDynamicToolCompletionIds.delete(itemId);
			params.onScheduleTerminalDynamicToolReleaseCheck();
		}
	}
	return {
		isCurrentTurnNotification,
		isTurnAbortMarker: isCurrentTurnNotification && isCodexTurnAbortMarkerNotification(notification, { currentPromptTexts: params.currentPromptTexts }),
		isTurnTerminal: isTerminalCodexTurnNotificationForTurn({
			notification,
			threadId: params.threadId,
			turnId: params.turnId
		}),
		turnCrossedToolHandoff
	};
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-lifecycle-terminal.ts
function buildCodexLifecycleTerminalMeta(input) {
	if (input.timedOut || input.abortStopReason === "timeout") return {
		aborted: true,
		status: "timed_out",
		stopReason: "timeout",
		timeoutPhase: "provider",
		providerStarted: true
	};
	if (input.yielded && !input.aborted) return {
		yielded: true,
		livenessState: "paused",
		stopReason: "end_turn"
	};
	return input.aborted ? {
		aborted: true,
		status: "cancelled",
		stopReason: "stop"
	} : void 0;
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-lifecycle-controller.ts
function createCodexAttemptLifecycleController(resources, turnRuntime) {
	const { prompt, trajectoryRecorder } = resources;
	const { connection } = prompt.context.runtime;
	const { params, attemptStartedAt, runAbortController, fastModeAutoStartedAtMs, fastModeAutoProgressState } = connection;
	const { state, activeTurnItemIds, pendingOpenClawDynamicToolCompletionIds } = turnRuntime;
	const releaseTurnAfterTerminalDynamicTool = (value) => {
		if (!shouldReleaseTurnAfterTerminalDynamicTool({
			completed: state.completed,
			aborted: runAbortController.signal.aborted,
			responseSuccess: value.response.success,
			currentTurnHadNonTerminalDynamicToolResult: state.currentTurnHadNonTerminalDynamicToolResult,
			activeAppServerTurnRequests: state.activeAppServerTurnRequests,
			activeTurnItemIdsCount: activeTurnItemIds.size,
			pendingOpenClawDynamicToolCompletionIdsCount: pendingOpenClawDynamicToolCompletionIds.size
		})) return;
		state.pendingTerminalDynamicToolRelease = void 0;
		trajectoryRecorder?.recordEvent("turn.dynamic_tool_terminal_release", {
			threadId: value.call.threadId,
			turnId: value.call.turnId,
			toolCallId: value.call.callId,
			name: value.call.tool,
			durationMs: value.durationMs
		});
		log.info("codex app-server turn released after terminal dynamic tool result", {
			threadId: value.call.threadId,
			turnId: value.call.turnId,
			toolCallId: value.call.callId,
			tool: value.call.tool,
			durationMs: value.durationMs
		});
		turnRuntime.steeringQueueRef.current?.cancel();
		turnRuntime.interruptTurn(value.call.turnId, { locallyCompleted: true }).then(turnRuntime.completeTurn);
	};
	const scheduleTerminalDynamicToolReleaseCheck = () => {
		if (state.terminalDynamicToolReleaseCheckScheduled || !state.pendingTerminalDynamicToolRelease && !state.currentTurnHadNonTerminalDynamicToolResult) return;
		state.terminalDynamicToolReleaseCheckScheduled = true;
		setImmediate(() => {
			state.terminalDynamicToolReleaseCheckScheduled = false;
			if (state.pendingTerminalDynamicToolRelease?.response.success === true && !state.currentTurnHadNonTerminalDynamicToolResult && state.activeAppServerTurnRequests === 0 && pendingOpenClawDynamicToolCompletionIds.size === 0) turnRuntime.steeringQueueRef.current?.cancel();
			const action = resolveTerminalDynamicToolBatchAction({
				activeAppServerTurnRequests: state.activeAppServerTurnRequests,
				activeTurnItemIdsCount: activeTurnItemIds.size,
				pendingOpenClawDynamicToolCompletionIdsCount: pendingOpenClawDynamicToolCompletionIds.size,
				currentTurnHadNonTerminalDynamicToolResult: state.currentTurnHadNonTerminalDynamicToolResult,
				hasPendingTerminalDynamicToolRelease: state.pendingTerminalDynamicToolRelease !== void 0
			});
			if (action === "release-pending-terminal" && state.pendingTerminalDynamicToolRelease) releaseTurnAfterTerminalDynamicTool(state.pendingTerminalDynamicToolRelease);
			else if (action === "clear-nonterminal-batch") {
				state.pendingTerminalDynamicToolRelease = void 0;
				state.currentTurnHadNonTerminalDynamicToolResult = false;
			}
		}).unref?.();
	};
	const scheduleTurnReleaseAfterTerminalDynamicTool = (value) => {
		state.pendingTerminalDynamicToolRelease = value;
		scheduleTerminalDynamicToolReleaseCheck();
	};
	const emitLifecycleStart = () => {
		emitCodexAppServerEvent(params, {
			stream: "lifecycle",
			data: {
				phase: "start",
				startedAt: attemptStartedAt
			}
		});
		state.lifecycleStarted = true;
	};
	const emitLifecycleTerminal = (data) => {
		if (!state.lifecycleStarted || state.lifecycleTerminalEmitted) return;
		emitCodexAppServerEvent(params, {
			stream: "lifecycle",
			data: {
				startedAt: attemptStartedAt,
				endedAt: Date.now(),
				...data,
				...params.deferTerminalLifecycle ? { phase: "finishing" } : {}
			}
		});
		state.lifecycleTerminalEmitted = true;
	};
	const buildLifecycleTerminalMeta = (input) => {
		const abortFields = input.aborted ? resolveAgentRunAbortLifecycleFields(runAbortController.signal) : void 0;
		return buildCodexLifecycleTerminalMeta({
			...input,
			abortStopReason: abortFields?.stopReason
		});
	};
	const executionPhaseKeys = /* @__PURE__ */ new Set();
	const emitExecutionPhaseOnce = (key, info) => {
		if (executionPhaseKeys.has(key)) return;
		executionPhaseKeys.add(key);
		params.onExecutionPhase?.({
			provider: params.provider,
			model: params.modelId,
			backend: "codex-app-server",
			...info
		});
	};
	const reportExecutionNotification = (notification) => {
		reportCodexExecutionNotification({
			notification,
			emitExecutionPhaseOnce
		});
	};
	const emitFastModeAutoProgress = async (payload) => {
		const summary = formatFastModeAutoProgressText(payload);
		await emitCodexAppServerEvent(params, {
			stream: "item",
			data: {
				kind: "status",
				title: "Fast",
				phase: "update",
				summary
			}
		});
		try {
			await params.onToolResult?.({
				text: summary,
				channelData: { openclawProgressKind: FAST_MODE_AUTO_PROGRESS_KIND }
			});
		} catch (error) {
			log.debug("codex app-server fast mode auto progress delivery failed", { error });
		}
	};
	const maybeAnnounceFastModeAutoOff = async () => {
		if (params.fastModeAuto !== true || fastModeAutoStartedAtMs === void 0 || fastModeAutoProgressState.offAnnounced) return;
		const next = resolveFastModeForElapsed({
			mode: "auto",
			startedAtMs: fastModeAutoStartedAtMs,
			fastAutoOnSeconds: params.fastModeAutoOnSeconds
		});
		if (next.enabled) return;
		fastModeAutoProgressState.offAnnounced = true;
		await emitFastModeAutoProgress(next);
	};
	const maybeEmitFastModeAutoReset = async () => {
		if (params.fastModeAuto !== true || !fastModeAutoProgressState.offAnnounced || fastModeAutoProgressState.resetAnnounced) return;
		fastModeAutoProgressState.resetAnnounced = true;
		await emitFastModeAutoProgress({
			enabled: true,
			elapsedSeconds: 0,
			fastAutoOnSeconds: params.fastModeAutoOnSeconds
		});
	};
	const maybeEmitFastModeAutoResetBestEffort = async () => {
		try {
			await maybeEmitFastModeAutoReset();
		} catch (error) {
			log.warn(`codex app-server fast mode auto reset progress failed: ${formatErrorMessage(error)}`);
		}
	};
	return {
		scheduleTerminalDynamicToolReleaseCheck,
		scheduleTurnReleaseAfterTerminalDynamicTool,
		emitLifecycleStart,
		emitLifecycleTerminal,
		buildLifecycleTerminalMeta,
		emitExecutionPhaseOnce,
		reportExecutionNotification,
		maybeAnnounceFastModeAutoOff,
		maybeEmitFastModeAutoResetBestEffort
	};
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-notification-controller.ts
function createCodexAttemptNotificationController(resources, turnRuntime, lifecycle) {
	const { prompt, state: resourceState, projectorRef, registerNativeSubagentMonitor } = resources;
	const { context, turnState } = prompt;
	const { attemptTools, runtime } = context;
	const { connection } = runtime;
	const { appServer, runAbortController } = connection;
	const { allocateCodexToolOutcomeOrdinal } = attemptTools;
	const { state, turnIdRef, userInputBridgeRef, steeringQueueRef, turnWatches, activeTurnItemIds, activeCompletionBlockerItemIds, activeFinalizationHookRunIds, finalizationHookBatchStatuses, pendingOpenClawDynamicToolCompletionIds, postToolRawAssistantCompletionIdleTimeoutMs, completeTurn } = turnRuntime;
	const { scheduleTerminalDynamicToolReleaseCheck, reportExecutionNotification, maybeAnnounceFastModeAutoOff } = lifecycle;
	const isTerminalTurnNotificationForTurn = (notification, notificationTurnId) => isTerminalCodexTurnNotificationForTurn({
		notification,
		threadId: resourceState.thread.threadId,
		turnId: notificationTurnId
	});
	const handleNotification = async (notification) => {
		const projector = projectorRef.current;
		const turnId = turnIdRef.current;
		const steeringQueue = steeringQueueRef.current;
		userInputBridgeRef.current?.handleNotification(notification);
		if (!projector || !turnId) {
			if (notification.method === "error") state.latestStartupErrorNotification = notification;
			return;
		}
		if ((state.timedOut || state.localCompletionRequested) && notification.method === "turn/completed" && readCodexTurnCompletedNotification(notification.params)?.turn.status === "interrupted") {
			completeTurn();
			return;
		}
		const notificationState = applyCodexTurnNotificationState({
			notification,
			threadId: resourceState.thread.threadId,
			turnId,
			currentPromptTexts: [turnState.codexTurnPromptText],
			turnWatches,
			activeTurnItemIds,
			activeCompletionBlockerItemIds,
			activeAppServerTurnRequests: state.activeAppServerTurnRequests,
			pendingOpenClawDynamicToolCompletionIds,
			turnCrossedToolHandoff: state.turnCrossedToolHandoff,
			postToolRawAssistantCompletionIdleTimeoutMs,
			onScheduleTerminalDynamicToolReleaseCheck: scheduleTerminalDynamicToolReleaseCheck,
			onReportExecutionNotification: reportExecutionNotification
		});
		state.turnCrossedToolHandoff = notificationState.turnCrossedToolHandoff;
		if (notificationState.isCurrentTurnNotification && notification.method === "item/completed") {
			const item = readCodexNotificationItem(notification.params);
			if (item?.type === "userMessage" && typeof item.clientId === "string") steeringQueue?.confirmConsumed(item.clientId);
		}
		if (notificationState.isTurnAbortMarker) state.sawCodexInterruptMarker = true;
		const hookNotification = readCodexFinalizationHookNotification(notification, resourceState.thread.threadId, turnId);
		if (hookNotification?.phase === "started") {
			if (activeFinalizationHookRunIds.size === 0) finalizationHookBatchStatuses.clear();
			activeFinalizationHookRunIds.add(hookNotification.runId);
			turnWatches.disarmAssistantCompletionIdleWatch();
		}
		if (notificationState.isTurnTerminal) state.terminalTurnNotificationQueued = true;
		try {
			await waitForCodexNotificationDispatchTurn();
			await projector.handleNotification(notification);
			const canRelease = isAssistantCompletionReleaseNotification(notification, state.turnCrossedToolHandoff) || notificationState.isCurrentTurnNotification && state.turnCrossedToolHandoff && notification.method === "rawResponseItem/completed" && projector.canReleaseLatestTerminalAssistantAfterToolHandoff();
			if (notificationState.isCurrentTurnNotification && canRelease) {
				const itemId = projector.getLatestTerminalAssistantCandidate()?.itemId;
				if (state.rejectedFinalizationHookAssistant && itemId && itemId !== state.rejectedFinalizationHookAssistant.itemId) state.rejectedFinalizationHookAssistant = void 0;
				else if (state.rejectedFinalizationHookAssistant) turnWatches.disarmAssistantCompletionIdleWatch();
				else if (activeFinalizationHookRunIds.size === 0 && !state.terminalTurnNotificationQueued && state.activeAppServerTurnRequests === 0 && activeTurnItemIds.size === 0 && activeCompletionBlockerItemIds.size === 0 && pendingOpenClawDynamicToolCompletionIds.size === 0 && projector.hasLatestTerminalAssistantCandidateText()) turnWatches.armAssistantCompletionIdleWatch(describeNotificationActivity(notification));
			}
			if (notificationState.isCurrentTurnNotification && activeTurnItemIds.size === 0 && isRawFunctionToolOutputCompletionNotification(notification)) await maybeAnnounceFastModeAutoOff();
		} catch (error) {
			log.debug("codex app-server projector notification threw", {
				method: notification.method,
				error
			});
		} finally {
			if (hookNotification?.phase === "completed") {
				state.unsettledFinalizationHookCount = Math.max(0, state.unsettledFinalizationHookCount - 1);
				activeFinalizationHookRunIds.delete(hookNotification.runId);
				finalizationHookBatchStatuses.set(hookNotification.runId, hookNotification.status);
				if (activeFinalizationHookRunIds.size === 0) {
					const statuses = new Set(finalizationHookBatchStatuses.values());
					if (statuses.has("blocked") && !statuses.has("stopped")) {
						const itemId = projector.getLatestTerminalAssistantCandidate()?.itemId;
						state.rejectedFinalizationHookAssistant = itemId ? { itemId } : {};
						turnWatches.disarmAssistantCompletionIdleWatch();
					} else state.rejectedFinalizationHookAssistant = void 0;
				}
				if (activeFinalizationHookRunIds.size === 0 && state.rejectedFinalizationHookAssistant === void 0 && !state.terminalTurnNotificationQueued && state.activeAppServerTurnRequests === 0 && activeTurnItemIds.size === 0 && activeCompletionBlockerItemIds.size === 0 && pendingOpenClawDynamicToolCompletionIds.size === 0 && projector.hasLatestTerminalAssistantCandidateText()) turnWatches.armAssistantCompletionIdleWatch({
					lastNotificationMethod: notification.method,
					hookRunId: hookNotification.runId,
					hookStatus: hookNotification.status
				});
			}
			if (notificationState.isTurnTerminal) {
				if ((readCodexTurnCompletedNotification(notification.params)?.turn)?.status === "interrupted" && state.sawCodexInterruptMarker) projector.markAborted();
				if (!state.timedOut && !runAbortController.signal.aborted) await steeringQueue?.flushPending();
				completeTurn();
			}
		}
	};
	const waitForActiveNativeTurnCompletion = async () => {
		const route = resourceState.turnRoute;
		const activeNativeTurnId = resourceState.thread.lifecycle.activeTurnIds?.at(-1) ?? route?.observedNativeTurnId;
		if (!route || !activeNativeTurnId) return false;
		const watch = resourceState.turnRouter.watchNativeTurnCompletion({
			threadId: route.threadId,
			turnId: activeNativeTurnId,
			timeoutMs: Math.min(appServer.requestTimeoutMs, CODEX_APP_SERVER_NATIVE_TURN_WAIT_TIMEOUT_MS),
			signal: runAbortController.signal
		});
		try {
			return await watch.completion;
		} finally {
			watch.cancel();
		}
	};
	const noteNotificationReceived = (notification, scope, receivedAtMs) => {
		const projector = projectorRef.current;
		const turnId = turnIdRef.current;
		if (!projector || !turnId) return;
		if (isTerminalTurnNotificationForTurn(notification, turnId)) state.terminalTurnNotificationQueued = true;
		if (scope.turnId === turnId) {
			const modelToolCallId = readRawResponseToolCallId(notification);
			if (modelToolCallId) allocateCodexToolOutcomeOrdinal?.(modelToolCallId);
			const nativeItem = readCodexNotificationItem(notification.params);
			if (nativeItem?.type === "webSearch") projector.recordNativeToolOutcome(nativeItem);
		}
		if (readCodexFinalizationHookNotification(notification, resourceState.thread.threadId, turnId)?.phase === "started") {
			state.unsettledFinalizationHookCount += 1;
			turnWatches.disarmAssistantCompletionIdleWatch();
		}
		turnWatches.noteNotificationReceived(notification.method, { receivedAtMs });
	};
	const enqueueNotification = async (notification, scope) => {
		log.trace("codex app-server raw notification received", {
			method: notification.method,
			...scope
		});
		await handleNotification(notification);
	};
	const drainNotificationQueue = async () => {
		await resourceState.turnRoute?.drain();
	};
	registerNativeSubagentMonitor(resourceState.thread.threadId);
	return {
		waitForActiveNativeTurnCompletion,
		noteNotificationReceived,
		enqueueNotification,
		drainNotificationQueue
	};
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-prompt.ts
function isRestrictivePromptToolsAllow(toolsAllow) {
	return toolsAllow !== void 0 && !toolsAllow.some((name) => name.trim() === "*");
}
async function prepareCodexAttemptPrompt(context) {
	const { runtime, attemptTools, historyState, hookContext, workspaceBootstrapContext, baseDeveloperInstructions, openClawPromptContext, skillsCollaborationInstructions, promptState, codexContextProjectionMaxChars } = context;
	const { connection, buildActiveRunAttemptParams, effectiveContextTokenBudget, effectiveRuntimeModelId, effectiveRuntimeProviderId } = runtime;
	const { params, activeContextEngine, usesSupervisionConnection, mutable, isInactiveThreadBootstrapBinding, bindingStore, bindingIdentity, agentDir, appServer, contextSessionKey, effectiveWorkspace, sandbox } = connection;
	const { toolBridge } = attemptTools;
	const applyFreshThreadContinuityProjection = () => {
		const projection = projectContextEngineAssemblyForCodex({
			assembledMessages: historyState.messages,
			originalHistoryMessages: historyState.messages,
			prompt: params.prompt,
			maxRenderedContextChars: codexContextProjectionMaxChars
		});
		promptState.promptText = projection.promptText;
		promptState.promptContextRange = projection.promptContextRange;
		promptState.prePromptMessageCount = projection.prePromptMessageCount;
	};
	const applyActiveContextEngineProjection = async (decisionStartupBinding) => {
		if (!activeContextEngine) return;
		const assembled = await assembleHarnessContextEngine({
			contextEngine: activeContextEngine,
			sessionId: runtime.activeSessionId,
			sessionKey: contextSessionKey,
			messages: historyState.messages,
			tokenBudget: effectiveContextTokenBudget,
			availableTools: new Set(flattenCodexDynamicToolFunctions(toolBridge.availableSpecs).map((tool) => tool.name).filter(isNonEmptyString)),
			citationsMode: params.config?.memory?.citations,
			sandboxed: sandbox?.enabled === true,
			modelId: effectiveRuntimeModelId,
			contextEngineHostSupport: CODEX_APP_SERVER_CONTEXT_ENGINE_HOST,
			providerId: effectiveRuntimeProviderId,
			requestedModelId: usesSupervisionConnection ? void 0 : params.requestedModelId,
			fallbackReason: usesSupervisionConnection ? void 0 : params.fallbackReason,
			degradedReason: usesSupervisionConnection ? void 0 : params.degradedReason,
			prompt: params.prompt
		});
		if (!assembled) throw new Error("context engine assemble returned no result");
		const contextEngineProjection = readContextEngineThreadBootstrapProjection(assembled.contextProjection);
		const projection = projectContextEngineAssemblyForCodex({
			assembledMessages: assembled.messages,
			originalHistoryMessages: historyState.messages,
			prompt: params.prompt,
			systemPromptAddition: assembled.systemPromptAddition,
			maxRenderedContextChars: codexContextProjectionMaxChars,
			toolPayloadMode: contextEngineProjection ? "preserve" : "elide"
		});
		const projectionDecision = contextEngineProjection ? resolveContextEngineBootstrapProjectionDecision({
			startupBinding: decisionStartupBinding,
			expectedBinding: buildContextEngineBinding(buildActiveRunAttemptParams(), contextEngineProjection),
			projection: contextEngineProjection,
			dynamicToolsFingerprint: codexDynamicToolsFingerprint(toolBridge.specs),
			legacyDynamicToolsFingerprint: codexLegacyDynamicToolsFingerprint(toolBridge.specs)
		}) : {
			project: true,
			reason: "per-turn-projection"
		};
		const decisionBinding = decisionStartupBinding;
		log.info("codex app-server context-engine projection decision", {
			sessionId: params.sessionId,
			sessionKey: contextSessionKey,
			engineId: activeContextEngine.info.id,
			mode: contextEngineProjection?.mode ?? assembled.contextProjection?.mode ?? "per_turn",
			epoch: contextEngineProjection?.epoch,
			fingerprint: contextEngineProjection?.fingerprint,
			previousThreadId: decisionBinding?.threadId,
			previousEpoch: decisionBinding?.contextEngine?.projection?.epoch,
			previousFingerprint: decisionBinding?.contextEngine?.projection?.fingerprint,
			projected: projectionDecision.project,
			reason: projectionDecision.reason,
			assembledMessages: assembled.messages.length,
			originalHistoryMessages: historyState.messages.length,
			projectedPromptChars: projection.promptText.length,
			developerInstructionAdditionChars: projection.developerInstructionAddition?.length ?? 0
		});
		promptState.contextEngineProjection = contextEngineProjection;
		promptState.promptText = projectionDecision.project ? projection.promptText : params.prompt;
		promptState.promptContextRange = projectionDecision.project ? projection.promptContextRange : void 0;
		promptState.developerInstructions = joinPresentSections(baseDeveloperInstructions, projection.developerInstructionAddition);
		promptState.prePromptMessageCount = projection.prePromptMessageCount;
	};
	if (activeContextEngine) try {
		await applyActiveContextEngineProjection(runtime.nativeToolSurfaceEnabled ? mutable.startupBinding : void 0);
	} catch (assembleErr) {
		log.warn("context engine assemble failed; using Codex baseline prompt", { error: formatErrorMessage(assembleErr) });
	}
	const codexModelInputHistoryMessages = [];
	const buildPromptFromCurrentInputs = async () => {
		const result = await resolveAgentHarnessBeforePromptBuildResult({
			prompt: prependCurrentInboundContext(promptState.promptText, params.currentInboundContext),
			developerInstructions: promptState.developerInstructions,
			messages: structuredClone(historyState.messages),
			ctx: hookContext,
			bootstrapContextRunKind: params.bootstrapContextRunKind
		});
		if (isRestrictivePromptToolsAllow(result.toolsAllow)) throw new Error("Codex app-server cannot enforce before_prompt_build toolsAllow; use the embedded or Copilot runtime for turn-scoped tool policy.");
		return result;
	};
	const resolveShiftedPromptInputRange = (prompt, promptInputRange, turnPromptText) => {
		if (!promptInputRange || promptInputRange.start < 0 || promptInputRange.end < promptInputRange.start || promptInputRange.end > prompt.length || !turnPromptText.endsWith(prompt)) return;
		const turnPromptOffset = turnPromptText.length - prompt.length;
		return {
			start: turnPromptOffset + promptInputRange.start,
			end: turnPromptOffset + promptInputRange.end
		};
	};
	const resolveShiftedPromptContextRange = (prompt, promptInputRange, turnPromptText) => {
		const promptTextInputOffset = promptInputRange ? promptInputRange.end - promptState.promptText.length : void 0;
		if (!promptState.promptContextRange || !promptInputRange || promptTextInputOffset === void 0 || promptInputRange.start < 0 || promptInputRange.end < promptInputRange.start || promptInputRange.end > prompt.length || promptTextInputOffset < promptInputRange.start || prompt.slice(promptTextInputOffset, promptInputRange.end) !== promptState.promptText || !turnPromptText.endsWith(prompt)) return;
		const promptTextOffset = prompt.endsWith(promptState.promptText) ? prompt.length - promptState.promptText.length : promptTextInputOffset;
		if (promptTextOffset < 0) return;
		const turnPromptOffset = turnPromptText.length - prompt.length + promptTextOffset;
		const contextRange = {
			start: turnPromptOffset + promptState.promptContextRange.start,
			end: turnPromptOffset + promptState.promptContextRange.end
		};
		return {
			contextRange,
			requestRange: {
				start: contextRange.end,
				end: turnPromptOffset + promptState.promptText.length
			}
		};
	};
	const decorateCodexTurnPromptText = (promptBuildResult) => {
		const turnPromptText = prependCodexOpenClawPromptContext(promptBuildResult.prompt, openClawPromptContext, { preservePromptWithoutContext: params.bootstrapContextMode === "lightweight" && params.bootstrapContextRunKind === "cron" });
		const projectedRanges = resolveShiftedPromptContextRange(promptBuildResult.prompt, promptBuildResult.promptInputRange, turnPromptText);
		const preservedRange = resolveShiftedPromptInputRange(promptBuildResult.prompt, promptBuildResult.promptInputRange, turnPromptText) ?? resolveCodexDeliveryHintPreservedInputRange({
			prompt: promptBuildResult.prompt,
			promptInputRange: promptBuildResult.promptInputRange,
			decoratedPrompt: turnPromptText
		});
		return fitCodexProjectedContextForTurnStart({
			promptText: turnPromptText,
			contextRange: projectedRanges?.contextRange,
			requestRange: projectedRanges?.requestRange,
			preservedRange
		});
	};
	const firstPromptBuild = await buildPromptFromCurrentInputs();
	const turnState = {
		promptBuild: firstPromptBuild,
		codexTurnPromptText: decorateCodexTurnPromptText(firstPromptBuild)
	};
	const buildRenderedCodexDeveloperInstructions = () => joinPresentSections(turnState.promptBuild.developerInstructions, buildTurnCollaborationMode(params, {
		turnScopedDeveloperInstructions: workspaceBootstrapContext.turnScopedDeveloperInstructions,
		skillsCollaborationInstructions,
		memoryCollaborationInstructions: workspaceBootstrapContext.memoryCollaborationInstructions
	}).settings.developer_instructions ?? void 0);
	const rebuildCodexPromptBuildFromCurrentProjection = async () => {
		turnState.promptBuild = await buildPromptFromCurrentInputs();
		turnState.codexTurnPromptText = decorateCodexTurnPromptText(turnState.promptBuild);
	};
	const rebuildCodexTurnPromptTextFromCurrentProjection = async () => {
		const nextPromptBuild = await buildPromptFromCurrentInputs();
		turnState.promptBuild = {
			...turnState.promptBuild,
			prompt: nextPromptBuild.prompt,
			promptInputRange: nextPromptBuild.promptInputRange
		};
		turnState.codexTurnPromptText = decorateCodexTurnPromptText(nextPromptBuild);
	};
	const selectNewerVisibleHistoryAfterBinding = (binding) => {
		const cutoff = Date.parse(binding.historyCoveredThrough ?? "");
		return historyState.messages.filter((message) => {
			if (message.role !== "user" && message.role !== "assistant") return false;
			const record = message;
			const meta = record["__openclaw"];
			const mirrorIdentity = meta && typeof meta === "object" && !Array.isArray(meta) ? meta.mirrorIdentity : void 0;
			const mirrorOrigin = meta && typeof meta === "object" && !Array.isArray(meta) ? meta.mirrorOrigin : void 0;
			const timestamp = typeof message.timestamp === "number" ? message.timestamp : typeof message.timestamp === "string" ? Date.parse(message.timestamp) : NaN;
			return !(typeof record.idempotencyKey === "string" && record.idempotencyKey.startsWith("codex-app-server:")) && mirrorOrigin !== "codex-app-server" && !(typeof mirrorIdentity === "string" && mirrorIdentity.startsWith("codex-app-server:")) && Number.isFinite(timestamp) && timestamp > (Number.isFinite(cutoff) ? cutoff : 0);
		});
	};
	const applyResumeStaleBindingContinuityProjection = (binding) => {
		const newerVisibleMessages = selectNewerVisibleHistoryAfterBinding(binding);
		if (newerVisibleMessages.length === 0) return false;
		const projection = projectContextEngineAssemblyForCodex({
			assembledMessages: newerVisibleMessages,
			originalHistoryMessages: historyState.messages,
			prompt: params.prompt,
			maxRenderedContextChars: codexContextProjectionMaxChars
		});
		promptState.promptText = projection.promptText;
		promptState.promptContextRange = projection.promptContextRange;
		promptState.prePromptMessageCount = projection.prePromptMessageCount;
		return true;
	};
	const precomputeNoContextEngineStaleBindingProjection = () => {
		promptState.precomputedStaleBindingContinuityProjectionApplied = false;
		promptState.staleBindingContinuityForcedFreshStart = false;
		const binding = mutable.startupBinding;
		if (activeContextEngine || !binding?.threadId || binding.pendingSupervisionBranch) return false;
		if (isInactiveThreadBootstrapBinding(binding)) {
			promptState.inactiveThreadBootstrapBindingForcedFreshStart = true;
			return false;
		}
		const projected = applyResumeStaleBindingContinuityProjection(binding);
		promptState.precomputedStaleBindingContinuityProjectionApplied = projected;
		return projected;
	};
	const applyNoContextEngineContinuityProjection = (action, binding) => {
		if (activeContextEngine || !historyState.messages.some((message) => message.role === "user")) return false;
		if (action === "resumed" && promptState.precomputedStaleBindingContinuityProjectionApplied) return true;
		if (action === "started" && promptState.staleBindingContinuityForcedFreshStart) return true;
		if (action === "started" && promptState.inactiveThreadBootstrapBindingForcedFreshStart) return false;
		if (action === "resumed" && binding) return applyResumeStaleBindingContinuityProjection(binding);
		if (action === "started") {
			applyFreshThreadContinuityProjection();
			return true;
		}
		return false;
	};
	if (precomputeNoContextEngineStaleBindingProjection()) await rebuildCodexPromptBuildFromCurrentProjection();
	const rotateStartupBindingForProjectedTurn = async () => {
		const binding = mutable.startupBinding;
		if (!binding?.threadId) return;
		const previousThreadId = binding.threadId;
		const hadInactiveThreadBootstrapBinding = isInactiveThreadBootstrapBinding(binding);
		mutable.startupBinding = await rotateOversizedCodexAppServerStartupBinding({
			binding,
			bindingStore,
			identity: bindingIdentity,
			sessionFile: params.sessionFile,
			agentDir,
			codexHome: appServer.start.env?.CODEX_HOME,
			config: params.config,
			contextEngineActive: Boolean(activeContextEngine),
			projectedTurnTokens: estimateCodexAppServerProjectedTurnTokens({
				prompt: turnState.codexTurnPromptText,
				developerInstructions: buildRenderedCodexDeveloperInstructions()
			})
		});
		if (mutable.startupBinding?.threadId) return;
		promptState.inactiveThreadBootstrapBindingForcedFreshStart = hadInactiveThreadBootstrapBinding;
		promptState.staleBindingContinuityForcedFreshStart = promptState.precomputedStaleBindingContinuityProjectionApplied && !promptState.inactiveThreadBootstrapBindingForcedFreshStart;
		if (promptState.staleBindingContinuityForcedFreshStart) applyFreshThreadContinuityProjection();
		if (activeContextEngine) {
			promptState.contextEngineProjection = void 0;
			try {
				await applyActiveContextEngineProjection(void 0);
			} catch (assembleErr) {
				log.warn("context engine assemble failed; using Codex baseline prompt", { error: formatErrorMessage(assembleErr) });
			}
		}
		await rebuildCodexPromptBuildFromCurrentProjection();
		log.info("codex app-server rebuilt turn prompt after native thread rotation", {
			sessionId: params.sessionId,
			sessionKey: contextSessionKey,
			previousThreadId,
			promptChars: turnState.codexTurnPromptText.length,
			developerInstructionChars: buildRenderedCodexDeveloperInstructions()?.length ?? 0
		});
	};
	await rotateStartupBindingForProjectedTurn();
	return {
		context,
		codexModelInputHistoryMessages,
		turnState,
		buildRenderedCodexDeveloperInstructions,
		rebuildCodexTurnPromptTextFromCurrentProjection,
		applyNoContextEngineContinuityProjection,
		systemPromptReport: buildCodexSystemPromptReport({
			attempt: params,
			sessionKey: contextSessionKey,
			workspaceDir: effectiveWorkspace,
			developerInstructions: buildRenderedCodexDeveloperInstructions(),
			workspaceBootstrapContext,
			skillsPrompt: skillsCollaborationInstructions ? params.skillsSnapshot?.prompt ?? "" : "",
			tools: toolBridge.availableSpecs
		})
	};
}
//#endregion
//#region extensions/codex/src/app-server/native-subagent-notification.ts
const CODEX_SUBAGENT_NOTIFICATION_START = "<subagent_notification>";
const CODEX_SUBAGENT_NOTIFICATION_END = "</subagent_notification>";
/** Extracts trusted subagent completion payloads from a Codex server notification. */
function extractCodexNativeSubagentCompletions(notification) {
	const params = isJsonObject(notification.params) ? notification.params : void 0;
	if (!params) return [];
	const item = isJsonObject(params.item) ? params.item : void 0;
	if (!item) return [];
	const text = readTrustedInterAgentCommunicationContent(item);
	if (!text) return [];
	const author = readTrustedInterAgentCommunicationAuthor(item);
	return extractCodexNativeSubagentCompletionsFromText(text).filter((completion) => completion.agentPath === author);
}
/** Parses one or more tagged subagent completion payloads from commentary text. */
function extractCodexNativeSubagentCompletionsFromText(text) {
	const completions = [];
	let cursor = 0;
	while (cursor < text.length) {
		const start = text.indexOf(CODEX_SUBAGENT_NOTIFICATION_START, cursor);
		if (start < 0) break;
		const bodyStart = start + 23;
		const end = text.indexOf(CODEX_SUBAGENT_NOTIFICATION_END, bodyStart);
		if (end < 0) break;
		const parsed = parseCodexNativeSubagentNotificationBody(text.slice(bodyStart, end));
		if (parsed) completions.push(parsed);
		cursor = end + 24;
	}
	return completions;
}
const codexNativeSubagentNotifications = {
	fromNotification: extractCodexNativeSubagentCompletions,
	fromText: extractCodexNativeSubagentCompletionsFromText
};
function parseCodexNativeSubagentNotificationBody(body) {
	let payload;
	try {
		payload = JSON.parse(body.trim());
	} catch {
		return;
	}
	if (!isJsonObject(payload)) return;
	const agentPath = readString$2(payload, "agent_path")?.trim();
	const status = isJsonObject(payload.status) ? payload.status : void 0;
	if (!agentPath || !status) return;
	const statusEntry = readCompletionStatus(status);
	if (!statusEntry) return;
	return {
		agentPath,
		status: statusEntry.status,
		statusLabel: statusEntry.label,
		result: statusEntry.result
	};
}
function readCompletionStatus(status) {
	for (const [rawKey, value] of Object.entries(status)) {
		const mappedStatus = mapCompletionStatus(normalizeStatusKey(rawKey));
		if (!mappedStatus) continue;
		const result = stringifyResult(value, mappedStatus);
		return {
			status: mappedStatus,
			label: mappedStatus === "succeeded" && result.kind === "no_final_assistant_message" ? "completed_without_final_message" : rawKey,
			result: result.text
		};
	}
}
function mapCompletionStatus(value) {
	if (value === "completed" || value === "succeeded" || value === "success") return "succeeded";
	if (value === "cancelled" || value === "canceled" || value === "interrupted" || value === "shutdown") return "cancelled";
	if (value === "failed" || value === "error" || value === "errored" || value === "systemerror" || value === "notfound") return "failed";
}
function stringifyResult(value, status) {
	if (typeof value === "string") {
		const text = value.trim();
		if (text) return { text };
		return status === "succeeded" ? completedWithoutFinalAssistantMessage() : { text: "(no output)" };
	}
	if (value === null || value === void 0) return status === "succeeded" ? completedWithoutFinalAssistantMessage() : { text: "(no output)" };
	try {
		return { text: JSON.stringify(value) };
	} catch {
		return { text: "(unserializable output)" };
	}
}
function completedWithoutFinalAssistantMessage() {
	return {
		text: "Codex native subagent completed without a final assistant message.",
		kind: "no_final_assistant_message"
	};
}
function readTrustedInterAgentCommunicationContent(item) {
	const communication = readTrustedInterAgentCommunication(item);
	return typeof communication?.content === "string" ? communication.content : void 0;
}
function readTrustedInterAgentCommunicationAuthor(item) {
	const communication = readTrustedInterAgentCommunication(item);
	return typeof communication?.author === "string" ? communication.author : void 0;
}
function readTrustedInterAgentCommunication(item) {
	if (readString$2(item, "type") !== "message" || readString$2(item, "role") !== "assistant" || readString$2(item, "phase") !== "commentary") return;
	const text = extractSingleTextPart(item);
	if (!text) return;
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		return;
	}
	if (!isJsonObject(parsed)) return;
	if (typeof parsed.author !== "string" || typeof parsed.recipient !== "string" || typeof parsed.content !== "string" || parsed.trigger_turn !== false) return;
	return parsed;
}
function extractSingleTextPart(item) {
	const content = item.content;
	if (!Array.isArray(content) || content.length !== 1) return;
	const [entry] = content;
	if (!isJsonObject(entry)) return;
	const type = readString$2(entry, "type");
	if (type !== "output_text" && type !== "text") return;
	return readString$2(entry, "text")?.trim();
}
function readString$2(record, key) {
	const value = record[key];
	return typeof value === "string" ? value : void 0;
}
function normalizeStatusKey(value) {
	return value.replace(/[^a-z0-9]/giu, "").toLowerCase();
}
//#endregion
//#region extensions/codex/src/app-server/native-subagent-task-ids.ts
/**
* Shared identifiers for representing Codex native subagents as OpenClaw task
* runtime rows.
*/
/** Task runtime namespace for Codex native subagent task rows. */
const CODEX_NATIVE_SUBAGENT_RUNTIME = "subagent";
/** Task kind used to distinguish native Codex subagents from other subagent runtimes. */
const CODEX_NATIVE_SUBAGENT_TASK_KIND = "codex-native";
/** Run id prefix for task rows keyed by Codex child thread ids. */
const CODEX_NATIVE_SUBAGENT_RUN_ID_PREFIX = "codex-thread:";
//#endregion
//#region extensions/codex/src/app-server/native-subagent-task-mirror.ts
/** Projects Codex thread and collab-agent notifications into task lifecycle updates. */
var CodexNativeSubagentTaskMirror = class {
	constructor(params, runtime) {
		this.params = params;
		this.runtime = runtime;
		this.mirrorStateByThreadId = /* @__PURE__ */ new Map();
		this.terminalRunIds = /* @__PURE__ */ new Set();
		this.authoritativeRunIds = /* @__PURE__ */ new Set();
		this.expectedAuthoritativeRunIds = /* @__PURE__ */ new Set();
		this.now = params.now ?? Date.now;
	}
	markAuthoritativeCompletion(childThreadId) {
		const runId = codexNativeSubagentRunId(childThreadId);
		this.authoritativeRunIds.add(runId);
		this.terminalRunIds.add(runId);
	}
	markAuthoritativeCompletionExpected(childThreadId) {
		this.expectedAuthoritativeRunIds.add(codexNativeSubagentRunId(childThreadId));
	}
	handleNotification(notification) {
		const params = isJsonObject(notification.params) ? notification.params : void 0;
		if (!params) return;
		if (notification.method === "thread/started") {
			this.handleThreadStarted(params);
			return;
		}
		if (notification.method === "thread/status/changed") {
			this.handleThreadStatusChanged(params);
			return;
		}
		if (notification.method === "item/started" || notification.method === "item/completed") {
			const item = isJsonObject(params.item) ? params.item : void 0;
			if (notification.method === "item/completed" && item && readString$1(item, "type") === "subAgentActivity") {
				this.handleSubagentActivityItem(params);
				return;
			}
			this.handleCollabAgentItem(params);
		}
	}
	handleThreadStarted(params) {
		const notification = readThreadStartedNotification(params);
		if (!notification) return;
		const thread = notification.thread;
		const spawn = readSubagentThreadSpawnSource(thread.source, this.params.parentThreadId);
		if (!spawn) return;
		const threadId = thread.id.trim();
		const label = trimOptional(spawn.agent_nickname) ?? trimOptional(thread.agentNickname) ?? trimOptional(spawn.agent_role) ?? trimOptional(thread.agentRole) ?? "Codex subagent";
		const task = trimOptional(thread.preview) ?? `Codex native subagent${label === "Codex subagent" ? "" : ` ${label}`}`;
		const createdAt = secondsToMillis(thread.createdAt) ?? this.now();
		if (!this.createRunningTask({
			threadId,
			label,
			task,
			startedAt: createdAt,
			progressSummary: "Codex native subagent started."
		})) return;
		this.applyStatus(threadId, thread.status);
	}
	handleThreadStatusChanged(params) {
		const notification = readThreadStatusChangedNotification(params);
		if (!notification) return;
		this.applyStatus(notification.threadId, notification.status);
	}
	applyStatus(threadId, status) {
		if (this.mirrorStateByThreadId.get(threadId) === "failed") return;
		const statusType = status?.type;
		if (!statusType) return;
		const runId = codexNativeSubagentRunId(threadId);
		if (this.authoritativeRunIds.has(runId)) return;
		if (this.terminalRunIds.has(runId) && statusType !== "systemError") return;
		const eventAt = this.now();
		if (statusType === "active") {
			this.runtime.recordTaskRunProgressByRunId({
				runId,
				lastEventAt: eventAt,
				progressSummary: "Codex native subagent is active."
			});
			return;
		}
		if (statusType === "idle") {
			this.runtime.recordTaskRunProgressByRunId({
				runId,
				lastEventAt: eventAt,
				progressSummary: "Codex native subagent is idle."
			});
			return;
		}
		if (statusType === "systemError") {
			if (this.expectedAuthoritativeRunIds.has(runId)) {
				this.terminalRunIds.delete(runId);
				this.runtime.recordTaskRunProgressByRunId({
					runId,
					lastEventAt: eventAt,
					progressSummary: "Codex native subagent hit a system error; awaiting recovery."
				});
				return;
			}
			this.terminalRunIds.add(runId);
			this.runtime.finalizeTaskRunByRunId({
				runId,
				status: "failed",
				endedAt: eventAt,
				lastEventAt: eventAt,
				error: "Codex app-server reported a system error for the native subagent thread.",
				progressSummary: "Codex native subagent hit a system error.",
				terminalSummary: "Codex native subagent failed."
			});
			return;
		}
		if (statusType === "notLoaded") this.runtime.recordTaskRunProgressByRunId({
			runId,
			lastEventAt: eventAt,
			progressSummary: "Codex native subagent is not loaded."
		});
	}
	handleCollabAgentItem(params) {
		const item = isJsonObject(params.item) ? params.item : void 0;
		if (!item || readString$1(item, "type") !== "collabAgentToolCall") return;
		if ((readString$1(item, "senderThreadId") ?? readString$1(params, "threadId")) !== this.params.parentThreadId) return;
		const isSpawnAgentTool = normalizeToolName(readString$1(item, "tool")) === "spawnagent";
		const receiverThreadIds = readStringArray$1(item.receiverThreadIds);
		const agentsStates = readAgentsStates(item.agentsStates);
		const spawnChildThreadIds = /* @__PURE__ */ new Set([...receiverThreadIds, ...agentsStates.keys()]);
		if (isSpawnAgentTool) for (const childThreadId of spawnChildThreadIds) this.createTaskFromCollabSpawnItem(childThreadId, item);
		const toolCallStatus = normalizeCollabToolCallStatus(readString$1(item, "status"));
		const terminalToolCallThreadIds = /* @__PURE__ */ new Set();
		if (isSpawnAgentTool && isBlockedOrFailedCollabToolCallStatus(toolCallStatus)) {
			for (const threadId of spawnChildThreadIds) terminalToolCallThreadIds.add(threadId);
			for (const threadId of agentsStates.keys()) terminalToolCallThreadIds.add(threadId);
		}
		const terminalAgentStateThreadIds = /* @__PURE__ */ new Set();
		for (const [threadId, state] of agentsStates) {
			const normalizedStatus = normalizeAgentStateStatus(state.status);
			if (terminalToolCallThreadIds.has(threadId) && isNonTerminalAgentStateStatus(normalizedStatus)) continue;
			this.applyCollabAgentStatus(threadId, normalizedStatus, state.message);
			if (isTerminalAgentStateStatus(normalizedStatus)) terminalAgentStateThreadIds.add(threadId);
		}
		if (isBlockedOrFailedCollabToolCallStatus(toolCallStatus)) for (const threadId of terminalToolCallThreadIds) {
			if (terminalAgentStateThreadIds.has(threadId)) continue;
			const state = agentsStates.get(threadId);
			this.applyCollabAgentStatus(threadId, toolCallStatus, state?.message);
		}
	}
	handleSubagentActivityItem(params) {
		const item = isJsonObject(params.item) ? params.item : void 0;
		if (!item || readString$1(item, "type") !== "subAgentActivity" || readString$1(params, "threadId") !== this.params.parentThreadId) return;
		const threadId = trimOptional(readString$1(item, "agentThreadId"));
		const kind = normalizeSubagentActivityKind(readString$1(item, "kind"));
		if (!threadId || !kind) return;
		if (kind === "started") {
			this.createTaskFromSubagentActivity(threadId, trimOptional(readString$1(item, "agentPath")));
			return;
		}
		if (this.mirrorStateByThreadId.get(threadId) !== "mirrored") return;
		const message = kind === "interacted" ? "Codex native subagent received more input." : "Codex native subagent was interrupted.";
		this.applyCollabAgentStatus(threadId, kind === "interacted" ? "running" : "interrupted", message);
	}
	createTaskFromSubagentActivity(threadId, agentPath) {
		const eventAt = this.now();
		this.createRunningTask({
			threadId,
			label: "Codex subagent",
			task: agentPath ? `Codex native subagent ${agentPath}` : "Codex native subagent",
			startedAt: eventAt,
			progressSummary: "Codex native subagent started."
		});
	}
	createTaskFromCollabSpawnItem(threadId, item) {
		const prompt = trimOptional(readString$1(item, "prompt"));
		const createdAt = this.now();
		this.createRunningTask({
			threadId,
			label: "Codex subagent",
			task: prompt ?? "Codex native subagent",
			startedAt: createdAt,
			progressSummary: "Codex native subagent spawned."
		});
	}
	createRunningTask(params) {
		const threadId = params.threadId.trim();
		if (!threadId || this.mirrorStateByThreadId.get(threadId) === "mirrored") return false;
		this.mirrorStateByThreadId.set(threadId, "mirrored");
		const runId = codexNativeSubagentRunId(threadId);
		if (!this.runtime.tryCreateRunningTaskRun({
			sourceId: runId,
			agentId: this.params.agentId,
			runId,
			label: params.label,
			task: params.task,
			notifyPolicy: "silent",
			deliveryStatus: "not_applicable",
			preferMetadata: true,
			startedAt: params.startedAt,
			lastEventAt: this.now(),
			progressSummary: params.progressSummary
		})) {
			this.mirrorStateByThreadId.set(threadId, "failed");
			return false;
		}
		this.terminalRunIds.delete(runId);
		this.authoritativeRunIds.delete(runId);
		return true;
	}
	applyCollabAgentStatus(threadId, status, message) {
		if (this.mirrorStateByThreadId.get(threadId) === "failed") return;
		const normalizedStatus = normalizeAgentStateStatus(status);
		if (!normalizedStatus) return;
		const runId = codexNativeSubagentRunId(threadId);
		if (this.authoritativeRunIds.has(runId)) return;
		if (this.terminalRunIds.has(runId) && isNonTerminalAgentStateStatus(normalizedStatus)) return;
		const eventAt = this.now();
		if (normalizedStatus === "pendingInit" || normalizedStatus === "running") {
			this.runtime.recordTaskRunProgressByRunId({
				runId,
				lastEventAt: eventAt,
				progressSummary: trimOptional(message) ?? (normalizedStatus === "pendingInit" ? "Codex native subagent is initializing." : "Codex native subagent is running.")
			});
			return;
		}
		if (normalizedStatus === "completed") {
			this.terminalRunIds.add(runId);
			const summary = trimOptional(message) ?? "Codex native subagent completed.";
			if (this.expectedAuthoritativeRunIds.has(runId)) this.runtime.recordTaskRunProgressByRunId({
				runId,
				lastEventAt: eventAt,
				progressSummary: summary
			});
			else this.runtime.finalizeTaskRunByRunId({
				runId,
				status: "succeeded",
				endedAt: eventAt,
				lastEventAt: eventAt,
				progressSummary: summary,
				terminalSummary: summary
			});
			return;
		}
		if (normalizedStatus === "blocked") {
			this.terminalRunIds.add(runId);
			this.runtime.finalizeTaskRunByRunId({
				runId,
				status: "succeeded",
				endedAt: eventAt,
				lastEventAt: eventAt,
				progressSummary: trimOptional(message) ?? "Codex native subagent blocked.",
				terminalSummary: trimOptional(message) ?? "Codex native subagent blocked.",
				terminalOutcome: "blocked"
			});
			return;
		}
		this.terminalRunIds.add(runId);
		this.runtime.finalizeTaskRunByRunId({
			runId,
			status: normalizedStatus === "interrupted" || normalizedStatus === "shutdown" ? "cancelled" : "failed",
			endedAt: eventAt,
			lastEventAt: eventAt,
			error: trimOptional(message) ?? `Codex native subagent status: ${normalizedStatus}`,
			progressSummary: trimOptional(message) ?? `Codex native subagent ${normalizedStatus}.`,
			terminalSummary: trimOptional(message) ?? "Codex native subagent did not complete."
		});
	}
};
/** Converts a Codex child thread id into the OpenClaw task-runtime run id. */
function codexNativeSubagentRunId(threadId) {
	return `${CODEX_NATIVE_SUBAGENT_RUN_ID_PREFIX}${threadId.trim()}`;
}
/** Reads a subagent thread-spawn source only when it belongs to the expected parent thread. */
function readSubagentThreadSpawnSource(source, parentThreadId) {
	if (!source || typeof source !== "object" || !("subAgent" in source)) return;
	const subAgent = source.subAgent;
	if (!subAgent || typeof subAgent !== "object" || !("thread_spawn" in subAgent)) return;
	const spawn = subAgent.thread_spawn;
	if (!spawn || typeof spawn !== "object") return;
	return spawn.parent_thread_id === parentThreadId ? spawn : void 0;
}
function readThreadStartedNotification(params) {
	const thread = params.thread;
	if (!isJsonObject(thread) || typeof thread.id !== "string") return;
	return { thread };
}
function readThreadStatusChangedNotification(params) {
	if (typeof params.threadId !== "string") return;
	const status = params.status;
	if (!isJsonObject(status) || !isCodexThreadStatusType(status.type)) return;
	return {
		threadId: params.threadId,
		status
	};
}
function isCodexThreadStatusType(value) {
	return value === "notLoaded" || value === "idle" || value === "systemError" || value === "active";
}
function readAgentsStates(value) {
	const states = /* @__PURE__ */ new Map();
	if (!isJsonObject(value)) return states;
	for (const [threadId, rawState] of Object.entries(value)) {
		if (!isJsonObject(rawState)) continue;
		const status = readString$1(rawState, "status");
		const message = readNullableString(rawState, "message");
		states.set(threadId, {
			status,
			message
		});
	}
	return states;
}
function readStringArray$1(value) {
	if (!Array.isArray(value)) return [];
	return value.filter((entry) => typeof entry === "string" && entry.trim() !== "");
}
function readString$1(value, key) {
	const entry = value[key];
	return typeof entry === "string" ? entry : void 0;
}
function readNullableString(value, key) {
	const entry = value[key];
	return typeof entry === "string" || entry === null ? entry : void 0;
}
function normalizeToolName(value) {
	return value?.replace(/[^a-z0-9]/giu, "").toLowerCase();
}
function normalizeSubagentActivityKind(value) {
	const key = value?.replace(/[^a-z]/giu, "").toLowerCase();
	return key === "started" || key === "interacted" || key === "interrupted" ? key : void 0;
}
function normalizeCollabToolCallStatus(value) {
	const key = value?.replace(/[^a-z0-9]/giu, "").toLowerCase();
	if (key === "completed" || key === "succeeded" || key === "success") return "completed";
	if (key === "failed" || key === "error" || key === "errored") return "failed";
	if (key === "blocked" || key === "declined") return "blocked";
	if (key === "inprogress" || key === "running") return "running";
	return value?.trim();
}
function isBlockedOrFailedCollabToolCallStatus(value) {
	return value === "failed" || value === "blocked";
}
function isNonTerminalAgentStateStatus(value) {
	return value === "pendingInit" || value === "running";
}
function isTerminalAgentStateStatus(value) {
	return value !== void 0 && !isNonTerminalAgentStateStatus(value);
}
function normalizeAgentStateStatus(value) {
	const key = value?.replace(/[^a-z0-9]/giu, "").toLowerCase();
	if (!key) return;
	if (key === "pendinginit") return "pendingInit";
	if (key === "inprogress" || key === "running") return "running";
	if (key === "completed" || key === "succeeded" || key === "success") return "completed";
	if (key === "interrupted" || key === "cancelled" || key === "canceled" || key === "shutdown") return key === "shutdown" ? "shutdown" : "interrupted";
	if (key === "failed" || key === "error" || key === "systemerror") return "failed";
	if (key === "blocked" || key === "declined") return "blocked";
	return value?.trim();
}
function secondsToMillis(value) {
	if (typeof value !== "number" || !Number.isFinite(value)) return;
	return value * 1e3;
}
function trimOptional(value) {
	const trimmed = value?.trim();
	return trimmed ? trimmed : void 0;
}
//#endregion
//#region extensions/codex/src/app-server/native-subagent-monitor.ts
/**
* Mirrors Codex native subagent lifecycle and completion into OpenClaw task
* runtime records, with app-server history as the recovery source.
*/
const DEFAULT_RECOVERY_POLL_DELAYS_MS = [
	2e3,
	5e3,
	1e4,
	15e3,
	3e4,
	6e4,
	12e4,
	3e5
];
const DEFAULT_COMPLETION_DELIVERY_RETRY_DELAYS_MS = [
	5e3,
	15e3,
	3e4,
	6e4,
	12e4,
	3e5
];
const RECENT_TERMINAL_TASK_RECONCILE_GRACE_MS = 6e4;
const THREAD_READ_TIMEOUT_MS = 3e4;
const NATIVE_SUBAGENT_NOTIFICATION_METHODS = /* @__PURE__ */ new Set([
	"thread/started",
	"thread/status/changed",
	"turn/started",
	"turn/completed",
	"item/agentMessage/delta",
	"item/started",
	"item/completed",
	"rawResponseItem/completed"
]);
const RECOVERY_REVISION_NOTIFICATION_METHODS = /* @__PURE__ */ new Set([
	"thread/started",
	"thread/status/changed",
	"turn/started",
	"turn/completed"
]);
const defaultRuntime = {
	createAgentHarnessTaskRuntime,
	deliverAgentHarnessTaskCompletion
};
const monitors = /* @__PURE__ */ new WeakMap();
const completionDeliveryOwners = /* @__PURE__ */ new Map();
function registerMonitor(params) {
	let monitor = monitors.get(params.client);
	if (!monitor) {
		monitor = new Monitor(params.client, params.runtime ?? defaultRuntime, { retainClient: params.retainClient });
		monitors.set(params.client, monitor);
	}
	return monitor.registerParent({
		parentThreadId: params.parentThreadId,
		requesterSessionKey: params.requesterSessionKey,
		taskRuntimeScope: params.taskRuntimeScope,
		agentId: params.agentId
	});
}
var Monitor = class {
	constructor(client, runtime = defaultRuntime, options = {}) {
		this.client = client;
		this.runtime = runtime;
		this.parentStates = /* @__PURE__ */ new Map();
		this.childStates = /* @__PURE__ */ new Map();
		this.childThreadIdsByAgentPath = /* @__PURE__ */ new Map();
		this.taskReconciliations = /* @__PURE__ */ new Map();
		this.taskReconciliationTimers = /* @__PURE__ */ new Map();
		this.threadStatusRevisions = /* @__PURE__ */ new Map();
		this.disposed = false;
		this.recoveryPollDelaysMs = options.recoveryPollDelaysMs ?? DEFAULT_RECOVERY_POLL_DELAYS_MS;
		this.completionDeliveryRetryDelaysMs = options.completionDeliveryRetryDelaysMs ?? DEFAULT_COMPLETION_DELIVERY_RETRY_DELAYS_MS;
		this.completionDeliveryMaxRetries = options.completionDeliveryMaxRetries ?? this.completionDeliveryRetryDelaysMs.length;
		this.now = options.now ?? Date.now;
		this.retainClient = options.retainClient;
		this.removeNotificationHandler = client.addNotificationHandler(async (notification) => {
			if (!NATIVE_SUBAGENT_NOTIFICATION_METHODS.has(notification.method)) return;
			await this.handleNotification(notification);
		});
		this.removeCloseHandler = client.addCloseHandler(() => this.dispose());
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.removeNotificationHandler();
		this.removeCloseHandler();
		for (const timer of this.taskReconciliationTimers.values()) clearTimeout(timer);
		this.taskReconciliationTimers.clear();
		for (const childState of this.childStates.values()) {
			if (childState.terminal && childState.pendingCompletion) {
				this.clearRecoveryTimers(childState);
				continue;
			}
			this.unregisterChild(childState);
		}
		this.releaseRetainedClient();
		for (const state of this.parentStates.values()) state.ownerCount = 0;
		for (const [parentThreadId] of this.parentStates) if (![...this.childStates.values()].some((childState) => childState.parentThreadId === parentThreadId)) this.parentStates.delete(parentThreadId);
	}
	registerParent(params) {
		const parentThreadId = params.parentThreadId.trim();
		if (!parentThreadId) throw new Error("Codex native subagent monitor requires a parent thread id");
		if (this.disposed) throw new Error("Codex native subagent monitor is closed");
		let state = this.parentStates.get(parentThreadId);
		if (state?.requesterSessionKey && params.requesterSessionKey && state.requesterSessionKey !== params.requesterSessionKey) throw new Error(`Codex thread ${parentThreadId} is already bound to another session`);
		if (!state) {
			state = {
				parentThreadId,
				ownerCount: 0
			};
			this.parentStates.set(parentThreadId, state);
		}
		state.ownerCount += 1;
		state.requesterSessionKey ??= params.requesterSessionKey;
		state.taskRuntimeScope ??= params.taskRuntimeScope;
		state.agentId ??= params.agentId;
		this.prepareParentTaskRuntime(state);
		for (const childState of this.childStates.values()) if (childState.parentThreadId === parentThreadId && childState.pendingCompletion) this.deliverPendingCompletion(state, childState);
		let registered = true;
		const registeredState = state;
		this.reconcileTaskRowsForParent(registeredState).catch((error) => {
			log.warn("Failed to reconcile Codex native subagent task rows", {
				parentThreadId,
				error: formatErrorMessage(error)
			});
		});
		return { unregister: () => {
			if (!registered) return;
			registered = false;
			const current = this.parentStates.get(parentThreadId);
			if (current) {
				current.ownerCount -= 1;
				this.pruneParentIfUnused(current);
			}
		} };
	}
	prepareParentTaskRuntime(state) {
		if (!state.requesterSessionKey || !state.taskRuntimeScope) return;
		state.taskRuntime ??= this.runtime.createAgentHarnessTaskRuntime({
			runtime: CODEX_NATIVE_SUBAGENT_RUNTIME,
			taskKind: CODEX_NATIVE_SUBAGENT_TASK_KIND,
			scope: state.taskRuntimeScope,
			runIdPrefix: CODEX_NATIVE_SUBAGENT_RUN_ID_PREFIX
		});
		state.mirror ??= new CodexNativeSubagentTaskMirror({
			parentThreadId: state.parentThreadId,
			requesterSessionKey: state.requesterSessionKey,
			agentId: state.agentId
		}, state.taskRuntime);
	}
	/** Handles one notification from the client-wide router observer. */
	async handleNotification(notification) {
		if (this.disposed) return;
		const state = this.resolveMirrorState(notification);
		const params = isJsonObject(notification.params) ? notification.params : void 0;
		const startedThread = isJsonObject(params?.thread) ? params.thread : void 0;
		const threadId = readString(params, "threadId")?.trim() ?? readString(startedThread, "id")?.trim();
		const threadStatus = isJsonObject(params?.status) ? normalizeIdentifier(readString(params.status, "type")) : void 0;
		const tracksRecoveryRevision = Boolean(threadId && this.threadStatusRevisions.has(threadId));
		if (RECOVERY_REVISION_NOTIFICATION_METHODS.has(notification.method) && threadId && tracksRecoveryRevision) this.threadStatusRevisions.get(threadId).value += 1;
		if (!state && (!threadId || !this.parentStates.has(threadId) && !this.childStates.has(threadId) && !tracksRecoveryRevision)) return;
		if (state?.mirror) try {
			state.mirror.handleNotification(notification);
		} catch (error) {
			log.warn("Failed to mirror Codex native subagent lifecycle event", {
				method: notification.method,
				error: formatErrorMessage(error)
			});
		}
		const childState = threadId ? this.childStates.get(threadId) : void 0;
		if (notification.method === "turn/started" && childState) this.resumeChild(childState);
		this.captureChildAssistantMessage(notification);
		await this.handleChildTurnCompletion(notification);
		if (notification.method === "thread/status/changed" && threadId && threadStatus) if (threadStatus !== "systemerror") {
			if (childState) this.clearSystemErrorFallback(childState);
		} else {
			if (childState) {
				this.resumeChild(childState, { scheduleRecovery: false });
				this.setRecoveryFallback(childState, systemErrorFallbackCompletion(childState.childThreadId), this.now());
			}
			this.reconcileChildThread(threadId).catch((error) => {
				this.logRecoveryFailure(threadId, error);
				return false;
			}).then((reconciled) => {
				if (!reconciled && childState && this.childStates.get(threadId) === childState) this.scheduleRecoveryPoll(childState);
			});
		}
		await this.handleCompletionNotification(notification);
	}
	resumeChild(childState, options = {}) {
		if (childState.terminal) return;
		this.observeActiveChild(childState);
		this.clearRecoveryTimers(childState);
		childState.recoveryAttempt = 0;
		if (options.scheduleRecovery !== false) this.scheduleRecoveryPoll(childState);
	}
	observeActiveChild(childState) {
		childState.settledWithoutCompletion = false;
		childState.fallbackCompletion = void 0;
		this.releaseClientRetention ??= this.retainClient?.();
	}
	settleResumableChild(childState) {
		if (childState.terminal) return;
		childState.settledWithoutCompletion = true;
		childState.fallbackCompletion = void 0;
		this.clearRecoveryTimers(childState);
		this.releaseClientRetentionIfIdle();
	}
	captureChildAssistantMessage(notification) {
		const params = isJsonObject(notification.params) ? notification.params : void 0;
		const childThreadId = readString(params, "threadId")?.trim();
		const childState = childThreadId ? this.childStates.get(childThreadId) : void 0;
		if (!childState || childState.terminal) return;
		if (notification.method === "item/agentMessage/delta") {
			const turnId = readString(params, "turnId");
			const itemId = readString(params, "itemId");
			const delta = readString(params, "delta");
			if (turnId && itemId && delta) this.recordChildAssistantMessage(childState, turnId, itemId, delta);
			return;
		}
		if (notification.method !== "item/started" && notification.method !== "item/completed") return;
		this.captureChildAssistantMessageItem(childState, readString(params, "turnId"), isJsonObject(params?.item) ? params.item : void 0);
	}
	captureChildAssistantMessageItem(childState, turnId, item) {
		if (readString(item, "type") !== "agentMessage" || !turnId) return;
		const itemId = readString(item, "id");
		if (!itemId) return;
		const messages = this.getChildAssistantMessages(childState, turnId);
		if (readString(item, "phase") === "commentary") messages.commentaryIds.add(itemId);
		else messages.finalMessageIds.add(itemId);
		const text = readString(item, "text");
		if (text) this.recordChildAssistantMessage(childState, turnId, itemId, text, { replace: true });
	}
	captureChildTurnAssistantMessages(childState, turn) {
		const turnId = readString(turn, "id");
		if (!turnId || !Array.isArray(turn.items)) return;
		for (const item of turn.items) this.captureChildAssistantMessageItem(childState, turnId, isJsonObject(item) ? item : void 0);
	}
	recordChildAssistantMessage(childState, turnId, itemId, text, options = {}) {
		const messages = this.getChildAssistantMessages(childState, turnId);
		if (!messages.texts.has(itemId)) messages.order.push(itemId);
		const existing = messages.texts.get(itemId) ?? "";
		messages.texts.set(itemId, options.replace ? text : `${existing}${text}`);
	}
	getChildAssistantMessages(childState, turnId) {
		let messages = childState.assistantMessagesByTurn.get(turnId);
		if (!messages) {
			messages = {
				texts: /* @__PURE__ */ new Map(),
				order: [],
				commentaryIds: /* @__PURE__ */ new Set(),
				finalMessageIds: /* @__PURE__ */ new Set()
			};
			childState.assistantMessagesByTurn.set(turnId, messages);
		}
		return messages;
	}
	async handleChildTurnCompletion(notification) {
		if (notification.method !== "turn/completed") return;
		const params = isJsonObject(notification.params) ? notification.params : void 0;
		const childThreadId = readString(params, "threadId")?.trim();
		const childState = childThreadId ? this.childStates.get(childThreadId) : void 0;
		const state = childState ? this.parentStates.get(childState.parentThreadId) : void 0;
		const turn = isJsonObject(params?.turn) ? params.turn : void 0;
		if (!state || !childState || !turn || childState.terminal) return;
		const turnId = readString(turn, "id");
		if (normalizeIdentifier(readString(turn, "status")) === "interrupted") {
			if (turnId) childState.assistantMessagesByTurn.delete(turnId);
			this.settleResumableChild(childState);
			return;
		}
		this.captureChildTurnAssistantMessages(childState, turn);
		const completion = toChildTurnCompletion(childState, turn);
		if (!completion) return;
		await this.processObservedCompletion(state, childState, completion);
	}
	/** Reads one child through app-server history and delivers a terminal result when present. */
	async reconcileChildThread(childThreadIdInput) {
		const childState = this.childStates.get(childThreadIdInput.trim());
		if (!childState || childState.terminal || this.disposed) return false;
		if (childState.recoveryInFlight) return await childState.recoveryInFlight;
		const recovery = this.reconcileChildState(childState);
		childState.recoveryInFlight = recovery;
		try {
			return await recovery;
		} finally {
			if (childState.recoveryInFlight === recovery) childState.recoveryInFlight = void 0;
		}
	}
	resolveMirrorState(notification) {
		const params = isJsonObject(notification.params) ? notification.params : void 0;
		if (!params) return;
		if (notification.method === "thread/started") {
			const thread = isJsonObject(params.thread) ? params.thread : void 0;
			const parentThreadId = readThreadParentThreadId(thread);
			const childThreadId = thread ? readString(thread, "id")?.trim() : void 0;
			const agentPath = readString(readThreadSpawnSource(thread), "agent_path")?.trim();
			const state = parentThreadId ? this.parentStates.get(parentThreadId) : void 0;
			if (state && childThreadId && parentThreadId) return this.registerChildThread(parentThreadId, childThreadId, agentPath === void 0 ? {} : { agentPath }) ? state : void 0;
			return state;
		}
		if (notification.method === "thread/status/changed" || notification.method === "turn/started" || notification.method === "turn/completed" || notification.method === "item/agentMessage/delta") {
			const childThreadId = readString(params, "threadId")?.trim();
			const parentThreadId = childThreadId ? this.childStates.get(childThreadId)?.parentThreadId : void 0;
			return parentThreadId ? this.parentStates.get(parentThreadId) : void 0;
		}
		if (notification.method === "item/started" || notification.method === "item/completed") {
			const item = isJsonObject(params.item) ? params.item : void 0;
			const parentThreadId = item ? (readString(item, "senderThreadId") ?? readString(params, "threadId"))?.trim() : void 0;
			const state = parentThreadId ? this.parentStates.get(parentThreadId) : void 0;
			if (state && parentThreadId) {
				if (notification.method === "item/completed" && readString(item, "type") === "subAgentActivity") {
					const childThreadId = readString(item, "agentThreadId")?.trim();
					const agentPath = readString(item, "agentPath");
					if (childThreadId) this.registerChildThread(parentThreadId, childThreadId, agentPath === void 0 ? {} : { agentPath });
					return state;
				}
				const childThreadIds = normalizeIdentifier(readString(item, "tool")) === "spawnagent" ? /* @__PURE__ */ new Set([...readStringArray(item?.receiverThreadIds), ...readObjectStringKeys(item?.agentsStates)]) : new Set(readStringArray(item?.receiverThreadIds));
				let accepted = true;
				for (const childThreadId of childThreadIds) accepted = Boolean(this.registerChildThread(parentThreadId, childThreadId)) && accepted;
				if (!accepted) return;
			}
			return state;
		}
	}
	async handleCompletionNotification(notification) {
		const params = isJsonObject(notification.params) ? notification.params : void 0;
		const parentThreadId = params ? readString(params, "threadId")?.trim() : void 0;
		const state = parentThreadId ? this.parentStates.get(parentThreadId) : void 0;
		if (!state) return;
		for (const nativeCompletion of codexNativeSubagentNotifications.fromNotification(notification)) {
			const childThreadId = this.childThreadIdsByAgentPath.get(buildParentAgentPathKey(state.parentThreadId, nativeCompletion.agentPath));
			const childState = childThreadId ? this.childStates.get(childThreadId) : void 0;
			if (!childState || childState.parentThreadId !== state.parentThreadId || childState.terminal) {
				log.warn("Ignoring Codex native subagent completion for unknown child thread", {
					parentThreadId: state.parentThreadId,
					agentPath: nativeCompletion.agentPath
				});
				continue;
			}
			const completion = {
				childThreadId: childState.childThreadId,
				status: nativeCompletion.status,
				statusLabel: nativeCompletion.statusLabel,
				result: nativeCompletion.result
			};
			await this.processObservedCompletion(state, childState, completion);
		}
	}
	async processObservedCompletion(state, childState, completion) {
		if (!isNoFinalCompletion(completion)) {
			await this.processCompletion(state, childState, completion);
			return;
		}
		this.resumeChild(childState, { scheduleRecovery: false });
		this.setRecoveryFallback(childState, completion, this.now());
		await this.reconcileChildThread(childState.childThreadId).catch((error) => {
			this.logRecoveryFailure(childState.childThreadId, error);
			return false;
		});
	}
	async reconcileChildState(childState) {
		const state = this.parentStates.get(childState.parentThreadId);
		if (!state) return false;
		const statusRead = this.retainThreadStatusRevision(childState.childThreadId);
		try {
			const recovery = await this.readThreadRecovery(childState.childThreadId);
			if (!statusRead.isCurrent() || this.childStates.get(childState.childThreadId) !== childState) return false;
			if (recovery.parentThreadId && recovery.parentThreadId !== childState.parentThreadId) {
				log.warn("Codex native subagent parent did not match monitor state", {
					childThreadId: childState.childThreadId,
					expectedParentThreadId: childState.parentThreadId,
					actualParentThreadId: recovery.parentThreadId
				});
				this.unregisterChild(childState);
				return false;
			}
			if (recovery.threadState === "active") {
				this.observeActiveChild(childState);
				return false;
			}
			if (recovery.threadState === "other") this.clearSystemErrorFallback(childState);
			if (recovery.resumable) {
				this.settleResumableChild(childState);
				return false;
			}
			const completion = recovery.completion;
			if (!completion) {
				if (recovery.fallbackCompletion) this.setRecoveryFallback(childState, recovery.fallbackCompletion, recovery.fallbackCompletion.completedAt ?? this.now());
				return false;
			}
			if (isNoFinalCompletion(completion)) {
				this.setRecoveryFallback(childState, completion, completion.completedAt ?? this.now());
				return false;
			}
			await this.processCompletion(state, childState, completion, completion.completedAt);
			return true;
		} finally {
			statusRead.release();
		}
	}
	requestThreadRead(childThreadId, includeTurns) {
		return this.client.request("thread/read", {
			threadId: childThreadId,
			includeTurns
		}, { timeoutMs: THREAD_READ_TIMEOUT_MS });
	}
	requestLatestThreadTurn(childThreadId) {
		return this.client.request("thread/turns/list", {
			threadId: childThreadId,
			limit: 1,
			sortDirection: "desc",
			itemsView: "full"
		}, { timeoutMs: THREAD_READ_TIMEOUT_MS });
	}
	async readThreadRecovery(childThreadId) {
		const response = await this.requestThreadRead(childThreadId, true).catch(() => this.requestThreadRead(childThreadId, false));
		const thread = isJsonObject(response.thread) ? response.thread : void 0;
		if (!thread || readString(thread, "id")?.trim() !== childThreadId) return {
			resumable: false,
			threadState: "unavailable"
		};
		const threadStatus = isJsonObject(thread.status) ? normalizeIdentifier(readString(thread.status, "type")) : void 0;
		let completion;
		let fallbackCompletion;
		let resumable = false;
		let threadState = threadStatus === "active" ? "active" : threadStatus === "systemerror" ? "system_error" : threadStatus ? "other" : "unavailable";
		if (threadStatus === "systemerror") {
			const turnsResponse = await this.requestLatestThreadTurn(childThreadId).catch(() => void 0);
			const data = isJsonObject(turnsResponse) && Array.isArray(turnsResponse.data) ? turnsResponse.data : [];
			const latestTurn = isJsonObject(data[0]) ? data[0] : void 0;
			const latestTurnStatus = normalizeIdentifier(readString(latestTurn, "status"));
			completion = latestTurn && latestTurnStatus === "failed" ? readTurnCompletion(latestTurn, childThreadId) : void 0;
			if (latestTurnStatus === "inprogress") threadState = "active";
			else if (!completion) fallbackCompletion = systemErrorFallbackCompletion(childThreadId);
		} else if (threadStatus !== "active") {
			const turnRecovery = readThreadTurnRecovery(thread, childThreadId);
			completion = turnRecovery.completion;
			resumable = turnRecovery.resumable;
		}
		return {
			parentThreadId: readThreadParentThreadId(thread),
			completion,
			fallbackCompletion,
			resumable,
			threadState
		};
	}
	async processCompletion(state, childState, completion, eventAt = this.now()) {
		if (childState.terminal) return;
		if (!this.claimCompletionDelivery(state, childState)) {
			this.unregisterChild(childState);
			return;
		}
		childState.terminal = true;
		this.clearRecoveryTimers(childState);
		state.mirror?.markAuthoritativeCompletion(completion.childThreadId);
		state.taskRuntime?.finalizeTaskRunByRunId({
			runId: codexNativeSubagentRunId(completion.childThreadId),
			status: completion.status,
			endedAt: eventAt,
			lastEventAt: eventAt,
			...completion.status === "succeeded" ? {} : { error: completion.result },
			progressSummary: completion.result,
			terminalSummary: completion.result
		});
		if (!state.requesterSessionKey || !state.taskRuntimeScope) {
			this.unregisterChild(childState);
			return;
		}
		childState.pendingCompletion = completion;
		state.taskRuntime?.setDetachedTaskDeliveryStatusByRunId({
			runId: codexNativeSubagentRunId(completion.childThreadId),
			deliveryStatus: "pending"
		});
		this.releaseClientRetentionIfIdle();
		await this.deliverPendingCompletion(state, childState);
	}
	async deliverPendingCompletion(state, childState) {
		const completion = childState.pendingCompletion;
		if (!completion || !state.requesterSessionKey || !state.taskRuntimeScope) return;
		if (childState.deliveringCompletion || childState.completionDeliveryTimer) return;
		childState.deliveringCompletion = true;
		try {
			const delivery = await this.runtime.deliverAgentHarnessTaskCompletion({
				scope: state.taskRuntimeScope,
				childSessionKey: codexNativeSubagentRunId(completion.childThreadId),
				childSessionId: completion.childThreadId,
				announceId: `codex-native:${state.parentThreadId}:${completion.childThreadId}:${completion.status}`,
				announceType: "Codex native subagent",
				taskLabel: "Codex native subagent",
				status: completion.status,
				statusLabel: completion.statusLabel,
				result: completion.result,
				replyInstruction: "Use the Codex native subagent result to continue or wrap up the parent task. If this is a Discord/channel session, send the visible response with the message tool instead of only writing a transcript final answer. Reply in your normal assistant voice and do not expose internal notification markup."
			});
			if (isDurableAgentHarnessCompletionDelivery(delivery)) {
				childState.pendingCompletion = void 0;
				childState.completionDeliveryAttempt = 0;
				state.taskRuntime?.setDetachedTaskDeliveryStatusByRunId({
					runId: codexNativeSubagentRunId(completion.childThreadId),
					deliveryStatus: "delivered"
				});
				this.unregisterChild(childState);
				return;
			}
			const error = delivery.error ?? "completion delivery did not produce a parent response";
			state.taskRuntime?.setDetachedTaskDeliveryStatusByRunId({
				runId: codexNativeSubagentRunId(completion.childThreadId),
				deliveryStatus: "pending",
				error
			});
			this.scheduleCompletionDeliveryRetry(childState, error);
		} catch (error) {
			const message = formatErrorMessage(error);
			state.taskRuntime?.setDetachedTaskDeliveryStatusByRunId({
				runId: codexNativeSubagentRunId(completion.childThreadId),
				deliveryStatus: "pending",
				error: message
			});
			this.scheduleCompletionDeliveryRetry(childState, message);
			log.warn("Failed to deliver Codex native subagent completion", {
				parentThreadId: state.parentThreadId,
				childThreadId: completion.childThreadId,
				error: message
			});
		} finally {
			childState.deliveringCompletion = false;
		}
	}
	scheduleCompletionDeliveryRetry(childState, error) {
		if (!childState.pendingCompletion || childState.completionDeliveryTimer || this.childStates.get(childState.childThreadId) !== childState) return;
		if (childState.completionDeliveryAttempt >= this.completionDeliveryMaxRetries) {
			this.parentStates.get(childState.parentThreadId)?.taskRuntime?.setDetachedTaskDeliveryStatusByRunId({
				runId: codexNativeSubagentRunId(childState.childThreadId),
				deliveryStatus: "failed",
				error
			});
			this.unregisterChild(childState);
			return;
		}
		const delayMs = delayForAttempt(this.completionDeliveryRetryDelaysMs, childState.completionDeliveryAttempt++);
		childState.completionDeliveryTimer = setTimeout(() => {
			childState.completionDeliveryTimer = void 0;
			if (this.childStates.get(childState.childThreadId) !== childState) return;
			const state = this.parentStates.get(childState.parentThreadId);
			if (state) this.deliverPendingCompletion(state, childState);
		}, delayMs);
		unrefTimer(childState.completionDeliveryTimer);
	}
	registerChildThread(parentThreadIdInput, childThreadIdInput, options = {}) {
		const parentThreadId = parentThreadIdInput.trim();
		const childThreadId = childThreadIdInput.trim();
		if (!parentThreadId || !childThreadId || this.disposed) return;
		let childState = this.childStates.get(childThreadId);
		if (childState && childState.parentThreadId !== parentThreadId) {
			log.warn("Ignoring Codex native subagent child reparenting", {
				childThreadId,
				existingParentThreadId: childState.parentThreadId,
				attemptedParentThreadId: parentThreadId
			});
			return;
		}
		if (!childState) {
			this.releaseClientRetention ??= this.retainClient?.();
			childState = {
				childThreadId,
				parentThreadId,
				agentPathKeys: /* @__PURE__ */ new Set(),
				assistantMessagesByTurn: /* @__PURE__ */ new Map(),
				recoveryAttempt: 0,
				terminal: false,
				settledWithoutCompletion: false,
				completionDeliveryAttempt: 0,
				deliveringCompletion: false
			};
			this.childStates.set(childThreadId, childState);
			this.threadStatusRevisions.set(childThreadId, this.threadStatusRevisions.get(childThreadId) ?? {
				value: 0,
				readers: 0
			});
		}
		this.registerAgentPath(childState, childThreadId);
		this.parentStates.get(parentThreadId)?.mirror?.markAuthoritativeCompletionExpected(childThreadId);
		const agentPath = normalizeOptionalString(options.agentPath);
		if (agentPath) this.registerAgentPath(childState, agentPath);
		this.scheduleRecoveryPoll(childState);
		return childState;
	}
	registerAgentPath(childState, agentPath) {
		const key = buildParentAgentPathKey(childState.parentThreadId, agentPath);
		const existingChild = this.childThreadIdsByAgentPath.get(key);
		if (existingChild && existingChild !== childState.childThreadId) {
			log.warn("Ignoring conflicting Codex native subagent agent path", {
				parentThreadId: childState.parentThreadId,
				agentPath,
				existingChildThreadId: existingChild,
				attemptedChildThreadId: childState.childThreadId
			});
			return;
		}
		this.childThreadIdsByAgentPath.set(key, childState.childThreadId);
		childState.agentPathKeys.add(key);
	}
	unregisterChild(childState) {
		this.clearRecoveryTimers(childState);
		if (childState.completionDeliveryTimer) clearTimeout(childState.completionDeliveryTimer);
		const deliveryOwnerKey = childState.deliveryOwnerKey;
		if (deliveryOwnerKey && completionDeliveryOwners.get(deliveryOwnerKey) === childState) completionDeliveryOwners.delete(deliveryOwnerKey);
		childState.deliveryOwnerKey = void 0;
		for (const key of childState.agentPathKeys) if (this.childThreadIdsByAgentPath.get(key) === childState.childThreadId) this.childThreadIdsByAgentPath.delete(key);
		if (this.childStates.get(childState.childThreadId) === childState) this.childStates.delete(childState.childThreadId);
		if (this.threadStatusRevisions.get(childState.childThreadId)?.readers === 0) this.threadStatusRevisions.delete(childState.childThreadId);
		this.releaseClientRetentionIfIdle();
		const state = this.parentStates.get(childState.parentThreadId);
		if (state) this.pruneParentIfUnused(state);
	}
	releaseClientRetentionIfIdle() {
		if ([...this.childStates.values()].some((childState) => !childState.terminal && !childState.settledWithoutCompletion)) return;
		this.releaseRetainedClient();
	}
	releaseRetainedClient() {
		const release = this.releaseClientRetention;
		this.releaseClientRetention = void 0;
		release?.();
	}
	claimCompletionDelivery(state, childState) {
		const requesterSessionKey = state.requesterSessionKey?.trim();
		if (!requesterSessionKey) return true;
		const key = `${requesterSessionKey}\0${childState.childThreadId}`;
		const owner = completionDeliveryOwners.get(key);
		if (owner) return owner === childState;
		const runId = codexNativeSubagentRunId(childState.childThreadId);
		if (state.taskRuntime?.listTaskRecords().some((task) => task.runId === runId && task.deliveryStatus === "delivered")) return false;
		completionDeliveryOwners.set(key, childState);
		childState.deliveryOwnerKey = key;
		return true;
	}
	pruneParentIfUnused(state) {
		if (state.ownerCount > 0) return;
		for (const childState of this.childStates.values()) if (childState.parentThreadId === state.parentThreadId) return;
		if (this.parentStates.get(state.parentThreadId) === state) this.parentStates.delete(state.parentThreadId);
	}
	scheduleRecoveryPoll(childState) {
		if (childState.terminal || childState.settledWithoutCompletion || childState.recoveryTimer || this.disposed || this.recoveryPollDelaysMs.length === 0) return;
		const delayMs = delayForAttempt(this.recoveryPollDelaysMs, childState.recoveryAttempt++);
		childState.recoveryTimer = setTimeout(() => {
			childState.recoveryTimer = void 0;
			this.reconcileChildThread(childState.childThreadId).catch((error) => {
				this.logRecoveryFailure(childState.childThreadId, error);
				return false;
			}).then(async (reconciled) => {
				if (reconciled || this.childStates.get(childState.childThreadId) !== childState) return;
				const fallback = childState.fallbackCompletion;
				const state = this.parentStates.get(childState.parentThreadId);
				if (fallback && state && childState.recoveryAttempt >= 2) {
					await this.processCompletion(state, childState, fallback, fallback.completedAt ?? this.now());
					return;
				}
				this.scheduleRecoveryPoll(childState);
			});
		}, delayMs);
		unrefTimer(childState.recoveryTimer);
	}
	setRecoveryFallback(childState, completion, eventAt) {
		if (childState.terminal) return;
		const current = childState.fallbackCompletion;
		if (current?.status === completion.status && current.statusLabel === completion.statusLabel && current.result === completion.result) return;
		if (childState.recoveryTimer) {
			clearTimeout(childState.recoveryTimer);
			childState.recoveryTimer = void 0;
		}
		childState.recoveryAttempt = 0;
		childState.fallbackCompletion = {
			...completion,
			completedAt: eventAt
		};
		this.scheduleRecoveryPoll(childState);
	}
	clearSystemErrorFallback(childState) {
		if (childState.fallbackCompletion?.statusLabel !== "system_error") return;
		childState.fallbackCompletion = void 0;
	}
	retainThreadStatusRevision(threadId) {
		const revision = this.threadStatusRevisions.get(threadId) ?? {
			value: 0,
			readers: 0
		};
		this.threadStatusRevisions.set(threadId, revision);
		revision.readers += 1;
		const capturedValue = revision.value;
		let retained = true;
		return {
			isCurrent: () => this.threadStatusRevisions.get(threadId) === revision && revision.value === capturedValue,
			release: () => {
				if (!retained) return;
				retained = false;
				revision.readers -= 1;
				if (revision.readers === 0 && !this.childStates.has(threadId) && this.threadStatusRevisions.get(threadId) === revision) this.threadStatusRevisions.delete(threadId);
			}
		};
	}
	clearRecoveryTimers(childState) {
		if (childState.recoveryTimer) {
			clearTimeout(childState.recoveryTimer);
			childState.recoveryTimer = void 0;
		}
	}
	async reconcileTaskRowsForParent(state) {
		if (this.disposed || this.parentStates.get(state.parentThreadId) !== state || !state.taskRuntime || !state.requesterSessionKey || !state.taskRuntimeScope) return;
		const candidates = /* @__PURE__ */ new Map();
		for (const task of state.taskRuntime.listTaskRecords()) {
			if (task.requesterSessionKey !== state.requesterSessionKey || !this.shouldReconcileCodexNativeTask(task)) continue;
			const childThreadId = task.runId.slice(13).trim();
			candidates.set(childThreadId, {
				requesterSessionKey: state.requesterSessionKey,
				childThreadId,
				recoveryAttempt: 0,
				taskRuntimeScope: state.taskRuntimeScope,
				agentId: state.agentId,
				taskRuntime: state.taskRuntime
			});
		}
		for (const candidate of candidates.values()) await this.reconcileTaskCandidate(candidate);
	}
	async reconcileTaskCandidate(candidate) {
		const key = `${candidate.requesterSessionKey}\0${candidate.childThreadId}`;
		const scheduled = this.taskReconciliationTimers.get(key);
		if (scheduled) {
			clearTimeout(scheduled);
			this.taskReconciliationTimers.delete(key);
		}
		const existing = this.taskReconciliations.get(key);
		if (existing) {
			await existing;
			return;
		}
		const reconciliation = this.reconcileTaskCandidateOnce(candidate);
		this.taskReconciliations.set(key, reconciliation);
		try {
			await reconciliation;
		} finally {
			if (this.taskReconciliations.get(key) === reconciliation) this.taskReconciliations.delete(key);
		}
	}
	scheduleTaskCandidateReconciliation(candidate) {
		const key = `${candidate.requesterSessionKey}\0${candidate.childThreadId}`;
		if (this.disposed || this.recoveryPollDelaysMs.length === 0 || this.taskReconciliationTimers.has(key)) return;
		const delayMs = delayForAttempt(this.recoveryPollDelaysMs, candidate.recoveryAttempt++);
		const timer = setTimeout(() => {
			this.taskReconciliationTimers.delete(key);
			this.reconcileTaskCandidate(candidate).catch((error) => {
				this.logRecoveryFailure(candidate.childThreadId, error);
				this.scheduleTaskCandidateReconciliation(candidate);
			});
		}, delayMs);
		this.taskReconciliationTimers.set(key, timer);
		unrefTimer(timer);
	}
	async reconcileTaskCandidateOnce(candidate) {
		const runId = codexNativeSubagentRunId(candidate.childThreadId);
		const task = candidate.taskRuntime.listTaskRecords().find((record) => record.runId === runId);
		if (!task || task.requesterSessionKey !== candidate.requesterSessionKey || !this.shouldReconcileCodexNativeTask(task)) return;
		const childBeforeRead = this.childStates.get(candidate.childThreadId);
		const statusRead = this.retainThreadStatusRevision(candidate.childThreadId);
		try {
			let recovery;
			try {
				recovery = await this.readThreadRecovery(candidate.childThreadId);
			} catch (error) {
				this.logRecoveryFailure(candidate.childThreadId, error);
				this.scheduleTaskCandidateReconciliation(candidate);
				return;
			}
			if (!statusRead.isCurrent() || this.childStates.get(candidate.childThreadId) !== childBeforeRead) {
				this.scheduleTaskCandidateReconciliation(candidate);
				return;
			}
			const parentThreadId = recovery.parentThreadId;
			if (!parentThreadId) {
				this.scheduleTaskCandidateReconciliation(candidate);
				return;
			}
			let state = this.parentStates.get(parentThreadId);
			if (state && state.requesterSessionKey !== candidate.requesterSessionKey) return;
			if (!state) {
				state = {
					parentThreadId,
					ownerCount: 0,
					requesterSessionKey: candidate.requesterSessionKey,
					taskRuntimeScope: candidate.taskRuntimeScope,
					agentId: candidate.agentId,
					taskRuntime: candidate.taskRuntime
				};
				this.prepareParentTaskRuntime(state);
				this.parentStates.set(parentThreadId, state);
			}
			const childState = this.registerChildThread(parentThreadId, candidate.childThreadId);
			if (!childState) {
				this.pruneParentIfUnused(state);
				return;
			}
			if (recovery.threadState === "active") this.observeActiveChild(childState);
			if (recovery.threadState === "other") this.clearSystemErrorFallback(childState);
			if (recovery.resumable) {
				this.settleResumableChild(childState);
				return;
			}
			const completion = recovery.completion;
			if (!completion) {
				if (recovery.fallbackCompletion) {
					this.setRecoveryFallback(childState, recovery.fallbackCompletion, recovery.fallbackCompletion.completedAt ?? this.now());
					return;
				}
				this.scheduleRecoveryPoll(childState);
				return;
			}
			if (isNoFinalCompletion(completion)) {
				this.setRecoveryFallback(childState, completion, completion.completedAt ?? this.now());
				return;
			}
			await this.processCompletion(state, childState, completion, completion.completedAt);
		} finally {
			statusRead.release();
		}
	}
	shouldReconcileCodexNativeTask(task) {
		if (task.status === "queued" || task.status === "running" || task.deliveryStatus === "pending") return true;
		if (task.deliveryStatus !== "not_applicable" || task.endedAt === void 0) return false;
		return task.endedAt >= this.now() - RECENT_TERMINAL_TASK_RECONCILE_GRACE_MS;
	}
	logRecoveryFailure(childThreadId, error) {
		log.debug("Codex native subagent history is not ready", {
			childThreadId,
			error: formatErrorMessage(error)
		});
	}
};
const codexNativeSubagentMonitorRuntime = {
	Monitor,
	register: registerMonitor
};
function readThreadTurnRecovery(thread, childThreadId) {
	const turns = Array.isArray(thread.turns) ? thread.turns : [];
	for (let index = turns.length - 1; index >= 0; index -= 1) {
		const turn = turns[index];
		if (!isJsonObject(turn)) continue;
		const status = normalizeIdentifier(readString(turn, "status"));
		return {
			completion: readTurnCompletion(turn, childThreadId),
			resumable: status === "interrupted"
		};
	}
	return { resumable: false };
}
function toChildTurnCompletion(childState, turn) {
	const status = normalizeIdentifier(readString(turn, "status"));
	if (status === "completed") {
		const turnId = readString(turn, "id");
		const result = turnId ? lastChildAssistantMessage(childState, turnId) : void 0;
		return {
			childThreadId: childState.childThreadId,
			status: "succeeded",
			statusLabel: result ? "turn_completed" : "completed_without_final_message",
			result: result ?? "Codex native subagent completed without a final assistant message."
		};
	}
	if (status === "failed") return {
		childThreadId: childState.childThreadId,
		status: "failed",
		statusLabel: "turn_failed",
		result: readTurnErrorMessage(turn) ?? "Codex native subagent failed."
	};
}
function lastChildAssistantMessage(childState, turnId) {
	const messages = childState.assistantMessagesByTurn.get(turnId);
	if (!messages) return;
	for (const itemId of messages.order.toReversed()) if (messages.finalMessageIds.has(itemId) && !messages.commentaryIds.has(itemId)) {
		const text = normalizeOptionalString(messages.texts.get(itemId));
		if (text) return text;
	}
}
function readTurnErrorMessage(turn) {
	const error = isJsonObject(turn.error) ? turn.error : void 0;
	return normalizeOptionalString(readString(error, "message")) ?? normalizeOptionalString(isJsonObject(error?.codexErrorInfo) ? readString(error.codexErrorInfo, "message") : void 0);
}
function systemErrorFallbackCompletion(childThreadId) {
	return {
		childThreadId,
		status: "failed",
		statusLabel: "system_error",
		result: "Codex app-server reported a system error for the native subagent thread."
	};
}
function readTurnCompletion(turn, childThreadId) {
	const status = normalizeIdentifier(readString(turn, "status"));
	if (status === "inprogress" || !status) return;
	const result = readLastAgentMessage(turn);
	const completedAtSeconds = asFiniteNumber(turn.completedAt);
	const completedAt = completedAtSeconds === void 0 ? void 0 : Math.round(completedAtSeconds * 1e3);
	if (status === "completed") return {
		childThreadId,
		status: "succeeded",
		statusLabel: result ? "task_complete" : "completed_without_final_message",
		result: result ?? "Codex native subagent completed without a final assistant message.",
		completedAt
	};
	if (status === "interrupted") return;
	if (status === "failed") return {
		childThreadId,
		status: "failed",
		statusLabel: "task_failed",
		result: readTurnErrorMessage(turn) ?? result ?? "Codex native subagent failed.",
		completedAt
	};
}
function readLastAgentMessage(turn) {
	const items = Array.isArray(turn.items) ? turn.items : [];
	let legacyResult;
	for (let index = items.length - 1; index >= 0; index -= 1) {
		const item = items[index];
		if (!isJsonObject(item)) continue;
		if (normalizeIdentifier(readString(item, "type")) !== "agentmessage") continue;
		const text = readString(item, "text")?.trim();
		if (!text) continue;
		const phase = normalizeIdentifier(readString(item, "phase"));
		if (phase === "finalanswer") return text;
		if (!phase) legacyResult ??= text;
	}
	return legacyResult;
}
function buildParentAgentPathKey(parentThreadId, agentPath) {
	return `${parentThreadId}\0${agentPath}`;
}
function isNoFinalCompletion(completion) {
	return completion.status === "succeeded" && completion.statusLabel === "completed_without_final_message";
}
function delayForAttempt(delays, attempt) {
	return Math.max(1, delays[Math.min(attempt, delays.length - 1)] ?? 1);
}
function readThreadParentThreadId(thread) {
	return readString(thread, "parentThreadId")?.trim() ?? readString(readThreadSpawnSource(thread), "parent_thread_id")?.trim();
}
function readThreadSpawnSource(thread) {
	const source = isJsonObject(thread?.source) ? thread.source : void 0;
	const subAgent = isJsonObject(source?.subAgent) ? source.subAgent : void 0;
	return isJsonObject(subAgent?.thread_spawn) ? subAgent.thread_spawn : void 0;
}
function readString(record, key) {
	const value = record?.[key];
	return typeof value === "string" ? value : void 0;
}
function readStringArray(value) {
	if (!Array.isArray(value)) return [];
	return value.filter((entry) => typeof entry === "string" && entry.trim() !== "");
}
function readObjectStringKeys(value) {
	return isJsonObject(value) ? Object.keys(value).filter((entry) => entry.trim() !== "") : [];
}
function normalizeIdentifier(value) {
	return value?.replace(/[^a-z0-9]/giu, "").toLowerCase();
}
function unrefTimer(timer) {
	if (typeof timer === "object" && timer && "unref" in timer) timer.unref();
}
//#endregion
//#region extensions/codex/src/app-server/sandbox-exec-server-registry.ts
const sandboxExecServerRegistry = {
	servers: /* @__PURE__ */ new Map(),
	async closeAll() {
		const servers = await Promise.allSettled(this.servers.values());
		this.servers.clear();
		await Promise.all(servers.map(async (entry) => {
			if (entry.status !== "fulfilled") return;
			const server = entry.value;
			server.refCount = 0;
			if (server.closed) return;
			server.closed = true;
			for (const client of server.server.clients) client.close(1001, "shutdown");
			await new Promise((resolve) => {
				server.server.close(() => resolve());
			});
		}));
	}
};
//#endregion
//#region extensions/codex/src/app-server/sandbox-exec-server/json-rpc.ts
/** JSON-RPC error code used when a sandbox filesystem resource does not exist. */
const JSON_RPC_NOT_FOUND = -32004;
/** JSON-RPC error code used when a sandbox exec-server method is unsupported. */
const JSON_RPC_METHOD_NOT_FOUND = -32601;
/** Protocol-level error carrying the JSON-RPC error code to send to the client. */
var JsonRpcProtocolError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
	}
};
/** Parses raw WebSocket data into a JSON-RPC request object. */
function parseRequest(data) {
	const text = (Array.isArray(data) ? Buffer.concat(data) : Buffer.isBuffer(data) ? data : Buffer.from(data)).toString("utf8");
	return requireObject(JSON.parse(text), "JSON-RPC request");
}
/** Validates that a JSON value is a non-array object. */
function requireObject(value, label) {
	if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object.`);
	return value;
}
/** Validates a non-empty string JSON-RPC parameter. */
function requireString(value, label) {
	if (typeof value !== "string" || !value) throw new Error(`${label} must be a non-empty string.`);
	return value;
}
/** Validates a base64 payload parameter as a string; decoding happens at call sites. */
function requireBase64String(value, label) {
	if (typeof value !== "string") throw new Error(`${label} must be a string.`);
	return value;
}
/** Validates a finite numeric JSON-RPC parameter. */
function requireNumber(value, label) {
	if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`${label} must be a finite number.`);
	return value;
}
/** Validates a non-empty string-array JSON-RPC parameter. */
function requireStringArray(value, label) {
	if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) throw new Error(`${label} must be a string array.`);
	if (value.length === 0) throw new Error(`${label} must not be empty.`);
	return value;
}
/** Reads HTTP headers from JSON-RPC params, defaulting to an empty header list. */
function readHttpHeaders(value) {
	if (!Array.isArray(value)) return [];
	return value.map((entry, index) => {
		const record = requireObject(entry, `header ${index}`);
		return {
			name: requireString(record.name, "header name"),
			value: requireString(record.value, "header value")
		};
	});
}
/** Sends a JSON-RPC success response over the WebSocket. */
function sendResult(socket, id, result) {
	socket.send(JSON.stringify({
		jsonrpc: "2.0",
		id,
		result: result === void 0 ? {} : result
	}));
}
/** Sends a JSON-RPC error response over the WebSocket. */
function sendError(socket, id, code, message) {
	socket.send(JSON.stringify({
		jsonrpc: "2.0",
		id: id ?? null,
		error: {
			code,
			message
		}
	}));
}
//#endregion
//#region extensions/codex/src/app-server/sandbox-exec-server/path-uri.ts
/** Converts Codex PathUri protocol values into sandbox-backend path strings. */
const WINDOWS_DRIVE_PATH_RE = /^\/[A-Za-z]:(?:\/|$)/u;
/** Resolves one Codex exec-server PathUri into a POSIX sandbox path. */
function resolveExecServerPath(rawPath, label) {
	let pathUrl;
	try {
		pathUrl = new URL(rawPath);
	} catch (error) {
		throw new Error(`${label} must be a valid file URI: ${error instanceof Error ? error.message : String(error)}`, { cause: error });
	}
	if (pathUrl.protocol !== "file:") throw new Error(`${label} URI must use the file scheme, received ${pathUrl.protocol.slice(0, -1)}.`);
	if (pathUrl.search || pathUrl.hash) throw new Error(`${label} file URI must not include a query or fragment.`);
	let resolved;
	try {
		resolved = fileURLToPath(pathUrl, { windows: false });
	} catch (error) {
		throw new Error(`${label} file URI is not valid for the sandbox: ${error instanceof Error ? error.message : String(error)}`, { cause: error });
	}
	if (WINDOWS_DRIVE_PATH_RE.test(resolved)) throw new Error(`${label} Windows file URI is not supported by the sandbox.`);
	if (resolved.includes("\0")) throw new Error(`${label} file URI must not contain a null byte.`);
	return resolved;
}
//#endregion
//#region extensions/codex/src/app-server/sandbox-exec-server/fs-policy.ts
/**
* Resolves Codex filesystem sandbox policy payloads into OpenClaw path/glob
* checks for sandbox exec-server filesystem operations.
*/
/** Resolves request-local sandbox policy and asserts each requested path has the needed access. */
function assertFsSandboxAccess(execServer, record, requests) {
	assertResolvedFsSandboxAccess(resolveFsSandboxPolicy(execServer, record), requests);
}
/** Parses a Codex managed filesystem sandbox context into normalized access entries. */
function resolveFsSandboxPolicy(execServer, record) {
	if (record.sandbox === void 0 || record.sandbox === null) return;
	const sandbox = requireObject(record.sandbox, "fs sandbox context");
	const permissions = requireObject(sandbox.permissions, "fs sandbox permissions");
	const permissionType = requireString(permissions.type, "fs sandbox permissions type");
	if (permissionType === "disabled" || permissionType === "external") return {
		unrestricted: true,
		entries: []
	};
	if (permissionType !== "managed") throw new Error(`Unsupported Codex fs sandbox permission type: ${permissionType}`);
	const fileSystem = requireObject(permissions.file_system, "fs sandbox file system permissions");
	const fileSystemType = requireString(fileSystem.type, "fs sandbox file system permissions type");
	if (fileSystemType === "unrestricted") return {
		unrestricted: true,
		entries: []
	};
	if (fileSystemType !== "restricted") throw new Error(`Unsupported Codex fs sandbox file system type: ${fileSystemType}`);
	if (!Array.isArray(fileSystem.entries)) throw new Error("fs sandbox file system entries must be an array.");
	const cwd = readFsSandboxCwd(execServer, sandbox);
	return {
		unrestricted: false,
		entries: fileSystem.entries.flatMap((entry, index) => {
			const resolved = resolveFsSandboxEntry(requireObject(entry, `fs sandbox entry ${index}`), cwd);
			return resolved ? [resolved] : [];
		})
	};
}
function readFsSandboxCwd(execServer, sandbox) {
	if (sandbox.cwd === void 0 || sandbox.cwd === null) return normalizeSandboxAbsolutePath(execServer.sandbox.containerWorkdir, "sandbox cwd");
	return normalizeSandboxAbsolutePath(resolveExecServerPath(requireString(sandbox.cwd, "sandbox cwd"), "sandbox cwd"), "sandbox cwd");
}
function resolveFsSandboxEntry(entry, cwd) {
	const access = readFsAccessMode(entry.access);
	const pathSpec = requireObject(entry.path, "fs sandbox entry path");
	const pathType = requireString(pathSpec.type, "fs sandbox entry path type");
	if (pathType === "path") return {
		kind: "path",
		path: normalizeSandboxAbsolutePath(resolveExecServerPath(requireString(pathSpec.path, "fs sandbox path"), "fs sandbox path"), "fs sandbox path"),
		access
	};
	if (pathType === "special") {
		if (isNonGrantingFsSpecialPath(requireObject(pathSpec.value, "fs sandbox special path"))) return;
		return {
			kind: "path",
			path: resolveFsSpecialPath(requireObject(pathSpec.value, "fs sandbox special path"), cwd),
			access
		};
	}
	if (pathType === "glob_pattern") {
		const pattern = requireString(pathSpec.pattern, "fs sandbox glob pattern");
		const absolutePattern = normalizeSandboxGlobPattern(pattern.startsWith("/") ? pattern : posix.join(cwd, pattern));
		return {
			kind: "glob",
			pattern: absolutePattern,
			matcher: compileSandboxGlobPattern(absolutePattern),
			literalPrefix: sandboxGlobLiteralPrefix(absolutePattern),
			access
		};
	}
	throw new Error(`Unsupported Codex fs sandbox path type: ${pathType}`);
}
function isNonGrantingFsSpecialPath(value) {
	const kind = requireString(value.kind, "fs sandbox special path kind");
	return kind === "minimal" || kind === "unknown";
}
function readFsAccessMode(value) {
	if (value === "read" || value === "write" || value === "none") return value;
	if (value === "deny") return "none";
	throw new Error("fs sandbox entry access must be read, write, none, or deny.");
}
function resolveFsSpecialPath(value, cwd) {
	const kind = requireString(value.kind, "fs sandbox special path kind");
	if (kind === "root") return "/";
	if (kind === "project_roots" || kind === "current_working_directory") {
		const subpath = value.subpath === void 0 || value.subpath === null ? void 0 : requireString(value.subpath, "fs sandbox project roots subpath");
		return normalizeSandboxAbsolutePath(subpath ? posix.join(cwd, subpath) : cwd, "fs sandbox project roots path");
	}
	if (kind === "slash_tmp" || kind === "tmpdir") return "/tmp";
	throw new Error(`Unsupported Codex fs sandbox special path: ${kind}`);
}
/** Asserts access against an already resolved filesystem sandbox policy. */
function assertResolvedFsSandboxAccess(policy, requests) {
	if (!policy?.unrestricted && policy) for (const request of requests) {
		const access = resolveFsAccess(policy, request.path);
		if (request.access === "read" && access === "none") throw new Error(`Codex fs sandbox denied read access to ${request.path}`);
		if (request.access === "write" && access !== "write") throw new Error(`Codex fs sandbox denied write access to ${request.path}`);
	}
}
function resolveFsAccess(policy, rawPath) {
	if (policy.unrestricted) return "write";
	const target = normalizeSandboxAbsolutePath(rawPath, "fs path");
	let selected;
	for (const entry of policy.entries) {
		if (!fsSandboxEntryMatches(entry, target)) continue;
		const candidate = {
			specificity: fsSandboxEntrySpecificity(entry),
			rank: fsAccessRank(entry.access),
			access: entry.access
		};
		if (!selected || candidate.specificity > selected.specificity || candidate.specificity === selected.specificity && candidate.rank > selected.rank) selected = candidate;
	}
	return selected?.access ?? "none";
}
/** Rejects recursive writes/removes that would cross protected read-only descendants. */
function assertNoReadOnlyDescendant(policy, rawPath, operation) {
	if (!policy || policy.unrestricted) return;
	const target = normalizeSandboxAbsolutePath(rawPath, "fs path");
	const protectedDescendant = policy.entries.find((entry) => {
		if (entry.access === "write" || !fsSandboxEntryCanAffectDescendant(entry, target)) return false;
		if (entry.kind === "glob") return true;
		const protectedPath = entry.path;
		return protectedPath && resolveFsAccess(policy, protectedPath) !== "write";
	});
	if (protectedDescendant) {
		const protectedPath = protectedDescendant.kind === "path" ? protectedDescendant.path : protectedDescendant.pattern;
		throw new Error(`Codex fs sandbox denied recursive ${operation} of ${rawPath} because ${protectedPath} is not writable.`);
	}
}
/** Normalizes and validates an absolute POSIX path inside the sandbox namespace. */
function normalizeSandboxAbsolutePath(rawPath, label) {
	if (!rawPath || rawPath.includes("\0") || !rawPath.startsWith("/")) throw new Error(`${label} must be an absolute sandbox path.`);
	const normalized = posix.normalize(rawPath);
	return normalized === "//" ? "/" : normalized;
}
/** Returns true when target is root itself or a descendant of root. */
function pathContains(root, target) {
	return root === "/" || target === root || target.startsWith(`${root}/`);
}
function fsSandboxEntryMatches(entry, target) {
	if (entry.kind === "path") return pathContains(entry.path, target);
	return entry.matcher.test(target);
}
function fsSandboxEntryCanAffectDescendant(entry, target) {
	if (entry.kind === "path") return pathContains(target, entry.path) && target !== entry.path;
	return pathContains(target, entry.literalPrefix) || pathContains(entry.literalPrefix, target);
}
function fsSandboxEntrySpecificity(entry) {
	return pathSpecificity(entry.kind === "path" ? entry.path : entry.literalPrefix);
}
function pathSpecificity(filePath) {
	return filePath === "/" ? 0 : filePath.split("/").filter(Boolean).length;
}
function fsAccessRank(access) {
	if (access === "none") return 2;
	if (access === "write") return 1;
	return 0;
}
function normalizeSandboxGlobPattern(pattern) {
	if (!pattern || pattern.includes("\0") || !pattern.startsWith("/")) throw new Error("fs sandbox glob pattern must be absolute.");
	return pattern.replace(/\/{2,}/gu, "/");
}
function compileSandboxGlobPattern(pattern) {
	let source = "^";
	for (let index = 0; index < pattern.length; index += 1) {
		const char = pattern[index];
		const next = pattern[index + 1];
		if (char === "*" && next === "*" && pattern[index + 2] === "/") {
			source += "(?:.*/)?";
			index += 2;
		} else if (char === "*" && next === "*") {
			source += ".*";
			index += 1;
		} else if (char === "*") source += "[^/]*";
		else if (char === "?") source += "[^/]";
		else if (char === "[") {
			const compiledClass = compileSandboxGlobCharacterClass(pattern, index);
			source += compiledClass.source;
			index = compiledClass.endIndex;
		} else source += char?.replace(/[\\^$+?.()|[\]{}]/gu, "\\$&") ?? "";
	}
	source += "$";
	return new RegExp(source, "u");
}
function compileSandboxGlobCharacterClass(pattern, startIndex) {
	let index = startIndex + 1;
	if (index >= pattern.length) throw new Error("fs sandbox glob character class must be closed.");
	const negated = pattern[index] === "!" || pattern[index] === "^";
	if (negated) index += 1;
	let body = "";
	for (; index < pattern.length; index += 1) {
		const char = pattern[index];
		if (char === "]" && body) return {
			source: `[${negated ? "^" : ""}${body}]`,
			endIndex: index
		};
		if (!char || char === "/") throw new Error("fs sandbox glob character class cannot match path separators.");
		body += escapeSandboxGlobCharacterClassChar(char, body.length === 0);
	}
	throw new Error("fs sandbox glob character class must be closed.");
}
function escapeSandboxGlobCharacterClassChar(char, first) {
	if (char === "\\" || char === "]") return `\\${char}`;
	if (first && char === "^") return "\\^";
	return char;
}
function sandboxGlobLiteralPrefix(pattern) {
	const wildcardIndex = pattern.search(/[*?[]/u);
	const prefix = wildcardIndex === -1 ? pattern : pattern.slice(0, wildcardIndex);
	const slash = prefix.lastIndexOf("/");
	if (slash <= 0) return "/";
	return normalizeSandboxAbsolutePath(prefix.slice(0, slash), "fs sandbox glob prefix");
}
/** Safely joins a single directory entry name onto a sandbox parent path. */
function joinSandboxChildPath(parent, child) {
	if (!child || child === "." || child === ".." || child.includes("/") || child.includes("\0")) throw new Error(`Invalid sandbox directory entry name: ${child}`);
	return parent.endsWith("/") ? `${parent}${child}` : `${parent}/${child}`;
}
//#endregion
//#region extensions/codex/src/app-server/sandbox-exec-server/runtime.ts
/** Returns the configured sandbox backend or fails the current JSON-RPC request. */
function requireBackend(execServer) {
	const backend = execServer.sandbox.backend;
	if (!backend) throw new Error("OpenClaw sandbox backend is unavailable.");
	return backend;
}
/** Returns the configured filesystem bridge or fails the current JSON-RPC request. */
function requireFsBridge(execServer) {
	const fsBridge = execServer.sandbox.fsBridge;
	if (!fsBridge) throw new Error("Sandbox filesystem bridge is unavailable.");
	return fsBridge;
}
//#endregion
//#region extensions/codex/src/app-server/sandbox-exec-server/filesystem.ts
/**
* Implements filesystem JSON-RPC handlers for the Codex sandbox exec-server
* with OpenClaw sandbox policy checks before every bridge operation.
*/
const CODEX_SANDBOX_EXEC_SERVER_MAX_READ_FILE_BYTES = 512 * 1024 * 1024;
const CODEX_SANDBOX_EXEC_SERVER_MAX_OPEN_FILE_READS = 128;
const CODEX_SANDBOX_EXEC_SERVER_MAX_BUFFERED_FILE_READ_BYTES = 64 * 1024 * 1024;
const CODEX_SANDBOX_EXEC_SERVER_MAX_READ_BLOCK_BYTES = 1024 * 1024;
const CODEX_SANDBOX_EXEC_SERVER_MAX_FILE_READ_HANDLE_ID_BYTES = 32;
/** Opens a policy-checked sandbox file under a bounded, connection-owned handle. */
async function openFile(execServer, handles, params) {
	const record = requireObject(params, "fs/open params");
	const handleId = requireFileReadHandleId(record.handleId);
	if (handles.closed) throw new JsonRpcProtocolError(JSON_RPC_NOT_FOUND, `unknown file read handle \`${handleId}\``);
	if (handles.has(handleId)) throw new JsonRpcProtocolError(-32600, `file read handle \`${handleId}\` already exists`);
	if (handles.size >= CODEX_SANDBOX_EXEC_SERVER_MAX_OPEN_FILE_READS) throw new JsonRpcProtocolError(-32600, `at most ${CODEX_SANDBOX_EXEC_SERVER_MAX_OPEN_FILE_READS} file reads may be open per connection`);
	const filePath = resolveExecServerPath(requireString(record.path, "path"), "read path");
	assertFsSandboxAccess(execServer, record, [{
		path: filePath,
		access: "read"
	}]);
	const fsBridge = requireFsBridge(execServer);
	const handle = {
		abortController: new AbortController(),
		closeRequested: false,
		reservedBytes: 0
	};
	handles.set(handleId, handle);
	try {
		const stat = await fsBridge.stat({
			filePath,
			signal: handle.abortController.signal
		});
		if (handles.get(handleId) !== handle || handle.closeRequested || handles.closed) throw new JsonRpcProtocolError(JSON_RPC_NOT_FOUND, `unknown file read handle \`${handleId}\``);
		if (!stat) throw new JsonRpcProtocolError(JSON_RPC_NOT_FOUND, "file not found");
		if (stat.type !== "file") throw new JsonRpcProtocolError(-32600, "file read handle requires a regular file");
		if (!Number.isSafeInteger(stat.size) || stat.size < 0) throw new JsonRpcProtocolError(-32600, "file size must be a non-negative safe integer");
		if (stat.size > CODEX_SANDBOX_EXEC_SERVER_MAX_BUFFERED_FILE_READ_BYTES - bufferedFileReadBytes(handles)) throw new JsonRpcProtocolError(-32600, "sandbox file read exceeds the per-connection buffered file limit");
		handle.reservedBytes = stat.size;
		const data = await fsBridge.readFile({
			filePath,
			maxBytes: handle.reservedBytes,
			signal: handle.abortController.signal
		});
		if (handles.get(handleId) !== handle || handle.closeRequested || handles.closed) throw new JsonRpcProtocolError(JSON_RPC_NOT_FOUND, `unknown file read handle \`${handleId}\``);
		if (data.byteLength > handle.reservedBytes) throw new JsonRpcProtocolError(-32600, "sandbox file read exceeds the per-connection buffered file limit");
		handle.reservedBytes = data.byteLength;
		handle.data = data;
		return { handleId };
	} catch (error) {
		if (handles.get(handleId) === handle) handles.delete(handleId);
		throw error;
	}
}
/** Reads a bounded base64 block from a handle belonging to this connection. */
function readFileBlock(handles, params) {
	const record = requireObject(params, "fs/readBlock params");
	const handleId = requireFileReadHandleId(record.handleId);
	const handle = handles.get(handleId);
	if (!handle?.data) throw new JsonRpcProtocolError(JSON_RPC_NOT_FOUND, `unknown file read handle \`${handleId}\``);
	const offset = requireNumber(record.offset, "offset");
	const length = requireNumber(record.len, "len");
	if (!Number.isSafeInteger(offset) || offset < 0) throw new JsonRpcProtocolError(-32600, "file read offset must be a non-negative safe integer");
	if (!Number.isSafeInteger(length) || length < 1 || length > CODEX_SANDBOX_EXEC_SERVER_MAX_READ_BLOCK_BYTES) throw new JsonRpcProtocolError(-32600, `file read block length must be between 1 and ${CODEX_SANDBOX_EXEC_SERVER_MAX_READ_BLOCK_BYTES}`);
	const chunk = handle.data.subarray(offset, Math.min(offset + length, handle.data.byteLength));
	return {
		chunk: chunk.toString("base64"),
		eof: offset + chunk.byteLength >= handle.data.byteLength
	};
}
/** Closes one connection-owned file handle; repeated closes are harmless. */
function closeFile(handles, params) {
	closeFileReadHandle(handles, requireFileReadHandleId(requireObject(params, "fs/close params").handleId));
	return {};
}
/** Cancels a disconnected socket without releasing unsettled read reservations. */
function closeAllFileReads(handles) {
	handles.closed = true;
	for (const handleId of handles.keys()) closeFileReadHandle(handles, handleId);
}
function closeFileReadHandle(handles, handleId) {
	const handle = handles.get(handleId);
	if (!handle) return;
	handle.closeRequested = true;
	if (handle.data !== void 0) {
		handles.delete(handleId);
		return;
	}
	handle.abortController.abort();
}
function bufferedFileReadBytes(handles) {
	let total = 0;
	for (const handle of handles.values()) total += handle.reservedBytes;
	return total;
}
function requireFileReadHandleId(value) {
	const handleId = requireString(value, "handleId");
	if (Buffer.byteLength(handleId, "utf8") > CODEX_SANDBOX_EXEC_SERVER_MAX_FILE_READ_HANDLE_ID_BYTES) throw new JsonRpcProtocolError(-32600, `file read handle ID must not exceed ${CODEX_SANDBOX_EXEC_SERVER_MAX_FILE_READ_HANDLE_ID_BYTES} bytes`);
	return handleId;
}
/** Reads a sandbox file as base64 after read-policy and size checks. */
async function readFile$1(execServer, params) {
	const record = requireObject(params, "fs/readFile params");
	const filePath = resolveExecServerPath(requireString(record.path, "path"), "read path");
	assertFsSandboxAccess(execServer, record, [{
		path: filePath,
		access: "read"
	}]);
	const fsBridge = requireFsBridge(execServer);
	const stat = await fsBridge.stat({ filePath });
	if (!stat) throw new JsonRpcProtocolError(JSON_RPC_NOT_FOUND, "file not found");
	assertSandboxFileReadWithinLimit(stat);
	return { dataBase64: (await fsBridge.readFile({
		filePath,
		maxBytes: CODEX_SANDBOX_EXEC_SERVER_MAX_READ_FILE_BYTES
	})).toString("base64") };
}
/** Writes base64 data to an existing sandbox directory after write-policy checks. */
async function writeFile$1(execServer, params) {
	const record = requireObject(params, "fs/writeFile params");
	const filePath = resolveExecServerPath(requireString(record.path, "path"), "write path");
	assertFsSandboxAccess(execServer, record, [{
		path: filePath,
		access: "write"
	}]);
	const fsBridge = requireFsBridge(execServer);
	if ((await fsBridge.stat({ filePath: posix.dirname(filePath) }))?.type !== "directory") throw new JsonRpcProtocolError(JSON_RPC_NOT_FOUND, "parent directory not found");
	await fsBridge.writeFile({
		filePath,
		data: Buffer.from(requireBase64String(record.dataBase64, "dataBase64"), "base64"),
		mkdir: false
	});
}
/** Creates a sandbox directory, respecting recursive and parent-directory semantics. */
async function createDirectory(execServer, params) {
	const record = requireObject(params, "fs/createDirectory params");
	const filePath = resolveExecServerPath(requireString(record.path, "path"), "create-directory path");
	assertFsSandboxAccess(execServer, record, [{
		path: filePath,
		access: "write"
	}]);
	const fsBridge = requireFsBridge(execServer);
	if (record.recursive === false) {
		const parentPath = posix.dirname(filePath);
		if ((await fsBridge.stat({ filePath: parentPath }))?.type !== "directory") throw new JsonRpcProtocolError(JSON_RPC_NOT_FOUND, "parent directory not found");
	}
	await fsBridge.mkdirp({ filePath });
}
/** Returns normalized metadata for a sandbox path. */
async function getMetadata(execServer, params) {
	const record = requireObject(params, "fs/getMetadata params");
	const filePath = resolveExecServerPath(requireString(record.path, "path"), "metadata path");
	assertFsSandboxAccess(execServer, record, [{
		path: filePath,
		access: "read"
	}]);
	const stat = await requireFsBridge(execServer).stat({ filePath });
	if (!stat) throw new JsonRpcProtocolError(JSON_RPC_NOT_FOUND, "file not found");
	return metadataResponse(stat);
}
/** Lists sandbox directory entries visible under the resolved filesystem policy. */
async function readDirectory(execServer, params) {
	const record = requireObject(params, "fs/readDirectory params");
	return { entries: await listDirectoryEntries(execServer, resolveExecServerPath(requireString(record.path, "path"), "read-directory path"), resolveFsSandboxPolicy(execServer, record)) };
}
async function listDirectoryEntries(execServer, filePath, fsSandboxPolicy) {
	assertResolvedFsSandboxAccess(fsSandboxPolicy, [{
		path: filePath,
		access: "read"
	}]);
	const fsBridge = requireFsBridge(execServer);
	const backend = requireBackend(execServer);
	const resolved = fsBridge.resolvePath({ filePath });
	if (!resolved) throw new Error(`Cannot resolve sandbox path: ${filePath}`);
	const result = await backend.runShellCommand({
		script: "find \"$1\" -mindepth 1 -maxdepth 1 -exec sh -c 'for path do name=${path##*/}; if [ -L \"$path\" ]; then kind=o; elif [ -d \"$path\" ]; then kind=d; elif [ -f \"$path\" ]; then kind=f; else kind=o; fi; printf \"%s\\t%s\\n\" \"$kind\" \"$name\"; done' sh {} +",
		args: [resolved.containerPath],
		allowFailure: true
	});
	if (result.code !== 0) {
		const stderr = result.stderr.toString("utf8").trim();
		throw new Error(stderr || `sandbox directory listing failed with code ${result.code}`);
	}
	return result.stdout.toString("utf8").split("\n").filter(Boolean).map((line) => {
		const [kind = "o", fileName = ""] = line.split("	");
		return {
			fileName,
			isDirectory: kind === "d",
			isFile: kind === "f"
		};
	});
}
/** Removes a sandbox path after rejecting writes outside policy or under read-only descendants. */
async function removePath(execServer, params) {
	const record = requireObject(params, "fs/remove params");
	const filePath = resolveExecServerPath(requireString(record.path, "path"), "remove path");
	const fsSandboxPolicy = resolveFsSandboxPolicy(execServer, record);
	assertResolvedFsSandboxAccess(fsSandboxPolicy, [{
		path: filePath,
		access: "write"
	}]);
	if (record.recursive !== false) assertNoReadOnlyDescendant(fsSandboxPolicy, filePath, "remove");
	await requireFsBridge(execServer).remove({
		filePath,
		recursive: record.recursive !== false,
		force: record.force !== false
	});
}
/** Copies sandbox files or recursive directories while enforcing source and destination policy. */
async function copyPath(execServer, params) {
	const record = requireObject(params, "fs/copy params");
	const sourcePath = resolveExecServerPath(requireString(record.sourcePath ?? record.source, "sourcePath"), "copy source path");
	const destinationPath = resolveExecServerPath(requireString(record.destinationPath ?? record.destination, "destinationPath"), "copy destination path");
	const fsSandboxPolicy = resolveFsSandboxPolicy(execServer, record);
	assertResolvedFsSandboxAccess(fsSandboxPolicy, [{
		path: sourcePath,
		access: "read"
	}, {
		path: destinationPath,
		access: "write"
	}]);
	await copySandboxPath(execServer, {
		sourcePath,
		destinationPath,
		recursive: record.recursive === true,
		fsSandboxPolicy
	});
}
async function copySandboxPath(execServer, params) {
	const fsBridge = execServer.sandbox.fsBridge;
	if (!fsBridge) throw new Error("Sandbox filesystem bridge is unavailable.");
	assertResolvedFsSandboxAccess(params.fsSandboxPolicy, [{
		path: params.sourcePath,
		access: "read"
	}, {
		path: params.destinationPath,
		access: "write"
	}]);
	const sourceStat = await fsBridge.stat({ filePath: params.sourcePath });
	if (!sourceStat) throw new JsonRpcProtocolError(JSON_RPC_NOT_FOUND, "file not found");
	if (sourceStat?.type === "directory") {
		if (!params.recursive) throw new Error(`Cannot copy directory without recursive=true: ${params.sourcePath}`);
		if (pathContains(normalizeSandboxAbsolutePath(params.sourcePath, "copy source path"), normalizeSandboxAbsolutePath(params.destinationPath, "copy destination path"))) throw new Error("Cannot recursively copy a directory into itself.");
		await fsBridge.mkdirp({ filePath: params.destinationPath });
		for (const entry of await listDirectoryEntries(execServer, params.sourcePath, params.fsSandboxPolicy)) {
			if (!entry.isDirectory && !entry.isFile) throw new Error(`Cannot copy unsupported filesystem entry: ${entry.fileName}`);
			await copySandboxPath(execServer, {
				sourcePath: joinSandboxChildPath(params.sourcePath, entry.fileName),
				destinationPath: joinSandboxChildPath(params.destinationPath, entry.fileName),
				recursive: true,
				fsSandboxPolicy: params.fsSandboxPolicy
			});
		}
		return;
	}
	if (sourceStat.type === "file" && fsBridge.copyFile) {
		await fsBridge.copyFile({
			sourcePath: params.sourcePath,
			destinationPath: params.destinationPath,
			mkdir: true
		});
		return;
	}
	assertSandboxFileReadWithinLimit(sourceStat);
	const data = await fsBridge.readFile({
		filePath: params.sourcePath,
		maxBytes: CODEX_SANDBOX_EXEC_SERVER_MAX_READ_FILE_BYTES
	});
	await fsBridge.writeFile({
		filePath: params.destinationPath,
		data,
		mkdir: true
	});
}
function assertSandboxFileReadWithinLimit(stat) {
	if (stat.type === "file" && stat.size > CODEX_SANDBOX_EXEC_SERVER_MAX_READ_FILE_BYTES) throw new Error(`file is too large to read through Codex sandbox exec-server: ${stat.size} bytes`);
}
function metadataResponse(stat) {
	return {
		isDirectory: stat?.type === "directory",
		isFile: stat?.type === "file",
		isSymlink: false,
		size: stat?.size ?? 0,
		createdAtMs: 0,
		modifiedAtMs: stat?.mtimeMs ?? 0
	};
}
//#endregion
//#region extensions/codex/src/app-server/sandbox-exec-server/http.ts
/**
* Implements sandboxed HTTP requests for Codex native tools by routing network
* access through the active OpenClaw sandbox backend.
*/
/** Maximum JSON-line size accepted from the streaming HTTP helper process. */
const SANDBOX_HTTP_STREAM_LINE_MAX_CHARS = 256 * 1024;
/** Handles one sandbox HTTP JSON-RPC request, optionally streaming response body deltas. */
async function httpRequest(execServer, socket, params) {
	const record = requireObject(params, "http/request params");
	const requestId = requireString(record.requestId, "requestId");
	const url = requireString(record.url, "url");
	assertSandboxHttpRequestTargetAllowed(url);
	const request = {
		method: requireString(record.method, "method"),
		url,
		headers: readHttpHeaders(record.headers),
		bodyBase64: typeof record.bodyBase64 === "string" ? record.bodyBase64 : void 0,
		timeoutMs: typeof record.timeoutMs === "number" && record.timeoutMs > 0 ? Math.floor(record.timeoutMs) : void 0,
		streamResponse: record.streamResponse === true
	};
	if (request.streamResponse) return await runStreamingSandboxHttpRequest(execServer, socket, requestId, request);
	return await runSandboxHttpRequest(execServer, {
		...request,
		streamResponse: false
	});
}
function assertSandboxHttpRequestTargetAllowed(url) {
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		throw new SsrFBlockedError("Invalid URL supplied to sandbox http/request");
	}
	if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new SsrFBlockedError(`Blocked non-HTTP(S) protocol in sandbox http/request: ${parsed.protocol}`);
	if (isBlockedHostnameOrIp(parsed.hostname)) throw new SsrFBlockedError(`Blocked hostname or private/internal IP in sandbox http/request: ${parsed.hostname}`);
}
async function runSandboxHttpRequest(execServer, params) {
	const result = await requireBackend(execServer).runShellCommand({
		script: SANDBOX_HTTP_REQUEST_SCRIPT,
		stdin: JSON.stringify(params),
		allowFailure: true
	});
	if (result.code !== 0) {
		const stderr = result.stderr.toString("utf8").trim();
		throw new Error(stderr || `sandbox http/request failed with code ${result.code}`);
	}
	const parsed = JSON.parse(result.stdout.toString("utf8"));
	if (typeof parsed.status !== "number" || !Array.isArray(parsed.headers)) throw new Error("sandbox http/request returned an invalid response envelope");
	return {
		status: parsed.status,
		headers: readHttpHeaders(parsed.headers),
		bodyBase64: typeof parsed.bodyBase64 === "string" ? parsed.bodyBase64 : ""
	};
}
async function runStreamingSandboxHttpRequest(execServer, socket, requestId, params) {
	const backend = requireBackend(execServer);
	const execSpec = await backend.buildExecSpec({
		command: SANDBOX_HTTP_REQUEST_SCRIPT,
		workdir: execServer.sandbox.containerWorkdir,
		env: {},
		usePty: false
	});
	let child;
	try {
		const [command, ...args] = execSpec.argv;
		if (!command) throw new Error("OpenClaw sandbox HTTP exec spec did not provide a command.");
		child = spawn(command, args, {
			env: execSpec.env,
			stdio: [
				"pipe",
				"pipe",
				"pipe"
			]
		});
	} catch (error) {
		try {
			await backend.finalizeExec?.({
				status: "failed",
				exitCode: null,
				timedOut: false,
				token: execSpec.finalizeToken
			});
		} catch (finalizeError) {
			log.warn("codex sandbox http/request finalize after start failure failed", { error: finalizeError });
		}
		throw error;
	}
	const abortOnSocketClose = () => child.kill("SIGTERM");
	socket.once("close", abortOnSocketClose);
	child.once("close", () => {
		socket.off("close", abortOnSocketClose);
	});
	child.stdin.on("error", (error) => {
		if (error.code === "EPIPE" || error.code === "ERR_STREAM_DESTROYED") return;
		log.warn("codex sandbox http/request stdin write failed", { error });
	});
	child.stdin.end(JSON.stringify(params));
	return await readStreamingSandboxHttpResponse({
		child,
		execSpec,
		finalizeExec: backend.finalizeExec,
		requestId,
		socket
	});
}
function readStreamingSandboxHttpResponse(params) {
	return new Promise((resolve, reject) => {
		let headerResolved = false;
		let failed = false;
		let childFailure = null;
		let lastBodySeq = 0;
		let stdoutBuffer = "";
		let stderr = "";
		const finalize = async (status, exitCode) => {
			await params.finalizeExec?.({
				status,
				exitCode,
				timedOut: false,
				token: params.execSpec.finalizeToken
			});
		};
		const fail = (message, exitCode) => {
			if (failed) return;
			failed = true;
			finalize("failed", exitCode).catch((error) => {
				log.warn("codex sandbox http/request finalize failed", { error });
			});
			if (headerResolved) {
				sendHttpBodyDelta(params.socket, {
					requestId: params.requestId,
					seq: lastBodySeq + 1,
					deltaBase64: "",
					done: true,
					error: message
				});
				return;
			}
			reject(new Error(message));
		};
		params.child.stdout.setEncoding("utf8");
		params.child.stdout.on("data", (chunk) => {
			stdoutBuffer += chunk;
			let newline = stdoutBuffer.indexOf("\n");
			while (newline >= 0) {
				const line = stdoutBuffer.slice(0, newline).trim();
				stdoutBuffer = stdoutBuffer.slice(newline + 1);
				if (line) try {
					const message = requireObject(JSON.parse(line), "http stream message");
					const type = requireString(message.type, "http stream message type");
					if (type === "headers") {
						headerResolved = true;
						resolve({
							status: requireNumber(message.status, "http status"),
							headers: readHttpHeaders(message.headers),
							bodyBase64: ""
						});
					} else if (type === "bodyDelta") {
						const seq = requireNumber(message.seq, "http body sequence");
						lastBodySeq = Math.max(lastBodySeq, seq);
						sendHttpBodyDelta(params.socket, {
							requestId: params.requestId,
							seq,
							deltaBase64: typeof message.deltaBase64 === "string" ? message.deltaBase64 : "",
							done: message.done === true,
							error: typeof message.error === "string" ? message.error : null
						});
					}
				} catch (error) {
					fail(error instanceof Error ? error.message : String(error), null);
				}
				newline = stdoutBuffer.indexOf("\n");
			}
			if (stdoutBuffer.length > SANDBOX_HTTP_STREAM_LINE_MAX_CHARS) {
				params.child.kill("SIGKILL");
				fail(`sandbox http/request produced an unterminated stdout line longer than ${SANDBOX_HTTP_STREAM_LINE_MAX_CHARS} characters`, null);
			}
		});
		params.child.stderr.setEncoding("utf8");
		params.child.stderr.on("data", (chunk) => {
			stderr = sliceUtf16Safe(`${stderr}${chunk}`, -4096);
		});
		params.child.once("error", (error) => {
			childFailure ??= error.message;
		});
		params.child.once("close", (code) => {
			const exitCode = code ?? 1;
			if (failed) return;
			if (childFailure) {
				fail(childFailure, exitCode);
				return;
			}
			if (exitCode === 0) {
				finalize("completed", exitCode).catch((error) => {
					log.warn("codex sandbox http/request finalize failed", { error });
				});
				if (!headerResolved) reject(/* @__PURE__ */ new Error("sandbox http/request exited before returning headers"));
				return;
			}
			fail(stderr.trim() || `sandbox http/request failed with code ${exitCode}`, exitCode);
		});
	});
}
const SANDBOX_HTTP_REQUEST_SCRIPT = String.raw`
tmp=$(mktemp "$TMPDIR/openclaw-http.XXXXXX.py" 2>/dev/null || mktemp "/tmp/openclaw-http.XXXXXX.py") || exit 1
trap 'rm -f "$tmp"' EXIT
cat > "$tmp" <<'PY'
import base64
import json
import ipaddress
import socket
import sys
import urllib.error
import urllib.parse
import urllib.request

def emit(payload):
    print(json.dumps(payload, separators=(",", ":")), flush=True)

def response_headers(response):
    return [{"name": name, "value": value} for name, value in response.headers.items()]

BLOCKED_HOSTNAMES = {
    "localhost",
    "localhost.localdomain",
    "metadata.google.internal",
}
CLOUD_METADATA_IP_ADDRESSES = {
    "100.100.100.200",
    "fd00:ec2::254",
}
BLOCKED_IPV4_NETWORKS = tuple(
    ipaddress.ip_network(network)
    for network in (
        "100.64.0.0/10",
        "198.18.0.0/15",
    )
)
BLOCKED_IPV6_NETWORKS = tuple(
    ipaddress.ip_network(network)
    for network in (
        "100::/64",
        "2001:2::/48",
        "2001:20::/28",
        "2001:db8::/32",
        "fec0::/10",
    )
)
PINNED_ADDRESSES = {}

def normalize_hostname(hostname):
    return (hostname or "").strip("[]").rstrip(".").lower()

def is_blocked_hostname(hostname):
    normalized = normalize_hostname(hostname)
    return (
        normalized in BLOCKED_HOSTNAMES
        or normalized.endswith(".localhost")
        or normalized.endswith(".local")
        or normalized.endswith(".internal")
    )

def is_blocked_ip(address):
    try:
        parsed = ipaddress.ip_address(address)
    except ValueError:
        return False
    embedded_ipv4 = extract_embedded_ipv4(parsed)
    if embedded_ipv4 is not None and is_blocked_ip(str(embedded_ipv4)):
        return True
    if str(parsed).lower() in CLOUD_METADATA_IP_ADDRESSES:
        return True
    if isinstance(parsed, ipaddress.IPv4Address):
        if any(parsed in network for network in BLOCKED_IPV4_NETWORKS):
            return True
    else:
        if any(parsed in network for network in BLOCKED_IPV6_NETWORKS):
            return True
    return (
        parsed.is_loopback
        or parsed.is_private
        or parsed.is_link_local
        or parsed.is_multicast
        or parsed.is_reserved
        or parsed.is_unspecified
    )

def ipv4_from_int(value):
    return ipaddress.IPv4Address(value & 0xffffffff)

def extract_embedded_ipv4(address):
    if not isinstance(address, ipaddress.IPv6Address):
        return None
    if address.ipv4_mapped is not None:
        return address.ipv4_mapped
    value = int(address)
    hextets = [(value >> shift) & 0xffff for shift in range(112, -1, -16)]
    if hextets[:6] == [0, 0, 0, 0, 0, 0]:
        return ipv4_from_int(value)
    if hextets[:6] == [0x64, 0xff9b, 0, 0, 0, 0]:
        return ipv4_from_int(value)
    if hextets[:6] == [0x64, 0xff9b, 1, 0, 0, 0]:
        return ipv4_from_int(value)
    if hextets[0] == 0x2002:
        return ipv4_from_int((hextets[1] << 16) | hextets[2])
    if hextets[0] == 0x2001 and hextets[1] == 0:
        return ipv4_from_int(((hextets[6] << 16) | hextets[7]) ^ 0xffffffff)
    if (hextets[4] & 0xfcff) == 0 and hextets[5] == 0x5efe:
        return ipv4_from_int((hextets[6] << 16) | hextets[7])
    return None

def assert_url_allowed(url):
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme not in ("http", "https"):
        raise ValueError("http/request only supports http and https URLs")
    hostname = normalize_hostname(parsed.hostname)
    if not hostname or is_blocked_hostname(hostname) or is_blocked_ip(hostname):
        raise ValueError("Blocked hostname or private/internal/special-use IP address")
    try:
        results = socket.getaddrinfo(hostname, parsed.port, proto=socket.IPPROTO_TCP)
    except socket.gaierror as error:
        raise ValueError(f"Unable to resolve hostname: {hostname}") from error
    addresses = {entry[4][0] for entry in results if entry[4]}
    if not addresses or any(is_blocked_ip(address) for address in addresses):
        raise ValueError("Blocked: resolves to private/internal/special-use IP address")
    PINNED_ADDRESSES[hostname] = sorted(addresses)

class GuardedRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        assert_url_allowed(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)

def pinned_getaddrinfo(original_getaddrinfo):
    def getaddrinfo(host, port, family=0, type=0, proto=0, flags=0):
        pinned = PINNED_ADDRESSES.get(normalize_hostname(host))
        if not pinned:
            return original_getaddrinfo(host, port, family, type, proto, flags)
        results = []
        for address in pinned:
            results.extend(original_getaddrinfo(address, port, family, type, proto, flags))
        return results
    return getaddrinfo

def handle_response(input_data, response):
    headers = response_headers(response)
    status = int(getattr(response, "status", getattr(response, "code", 0)))
    if input_data.get("streamResponse"):
        emit({"type": "headers", "status": status, "headers": headers})
        seq = 1
        while True:
            chunk = response.read(65536)
            if not chunk:
                break
            emit({
                "type": "bodyDelta",
                "seq": seq,
                "deltaBase64": base64.b64encode(chunk).decode("ascii"),
                "done": False,
            })
            seq += 1
        emit({"type": "bodyDelta", "seq": seq, "deltaBase64": "", "done": True})
        return
    body = response.read()
    emit({
        "status": status,
        "headers": headers,
        "bodyBase64": base64.b64encode(body).decode("ascii"),
    })

def main():
    input_data = json.load(sys.stdin)
    url = str(input_data.get("url", ""))
    assert_url_allowed(url)
    body_base64 = input_data.get("bodyBase64")
    data = base64.b64decode(body_base64) if isinstance(body_base64, str) else None
    request = urllib.request.Request(
        url,
        data=data,
        method=str(input_data.get("method", "GET")),
    )
    for header in input_data.get("headers") or []:
        request.add_header(str(header.get("name", "")), str(header.get("value", "")))
    timeout_ms = input_data.get("timeoutMs")
    timeout = None
    if isinstance(timeout_ms, (int, float)) and timeout_ms > 0:
        timeout = timeout_ms / 1000
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), GuardedRedirectHandler)
    original_getaddrinfo = socket.getaddrinfo
    socket.getaddrinfo = pinned_getaddrinfo(original_getaddrinfo)
    try:
        with opener.open(request, timeout=timeout) as response:
            handle_response(input_data, response)
    except urllib.error.HTTPError as response:
        handle_response(input_data, response)
    finally:
        socket.getaddrinfo = original_getaddrinfo

if __name__ == "__main__":
    main()
PY
python3 "$tmp"
`.trim();
function sendHttpBodyDelta(socket, params) {
	if (socket.readyState !== 1) return;
	socket.send(JSON.stringify({
		jsonrpc: "2.0",
		method: "http/request/bodyDelta",
		params: {
			requestId: params.requestId,
			seq: params.seq,
			deltaBase64: params.deltaBase64,
			done: params.done,
			error: params.error ?? null
		}
	}));
}
//#endregion
//#region extensions/codex/src/app-server/sandbox-exec-server/processes.ts
/**
* Manages subprocess lifecycle, streaming output buffers, stdin writes, and
* termination for Codex sandbox exec-server process RPCs.
*/
const ENV_KEY_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;
const RETAINED_PROCESS_OUTPUT_BYTES = 1024 * 1024;
const CLOSED_PROCESS_EVICTION_MS = 6e4;
/** Starts a sandbox-backed process and registers it in the connection-local process table. */
async function startProcess(execServer, processes, socket, params) {
	const record = requireObject(params, "process/start params");
	const processId = requireString(record.processId, "processId");
	if (processes.has(processId)) throw new Error(`process already exists: ${processId}`);
	const argv = requireStringArray(record.argv, "argv");
	const cwd = resolveExecServerPath(requireString(record.cwd, "cwd"), "process cwd");
	rejectUnsupportedArg0(record.arg0);
	const env = readProcessEnv(record);
	const managed = {
		processId,
		chunks: [],
		retainedOutputBytes: 0,
		nextSeq: 1,
		exited: false,
		exitCode: null,
		closed: false,
		failure: null,
		tty: record.tty === true,
		pipeStdin: record.pipeStdin === true,
		abortController: new AbortController(),
		child: null,
		finalized: false,
		waiters: [],
		emitNotification: (method, notificationParams) => {
			if (socket.readyState === 1) socket.send(JSON.stringify({
				jsonrpc: "2.0",
				method,
				params: notificationParams
			}));
		},
		evictProcess: () => {
			if (managed.evictionTimer) return;
			managed.evictionTimer = setTimeout(() => {
				if (processes.get(processId) === managed && managed.closed) processes.delete(processId);
			}, CLOSED_PROCESS_EVICTION_MS);
			managed.evictionTimer.unref?.();
		}
	};
	processes.set(processId, managed);
	try {
		await runProcess(execServer, managed, {
			argv,
			cwd,
			env
		});
	} catch (error) {
		processes.delete(processId);
		managed.failure = error instanceof Error ? error.message : String(error);
		managed.exitCode = null;
		managed.exited = true;
		managed.closed = true;
		notifyProcessWaiters(managed);
		throw error;
	}
	return { processId };
}
async function runProcess(execServer, managed, params) {
	const backend = execServer.sandbox.backend;
	if (!backend) throw new Error("OpenClaw sandbox backend is unavailable.");
	throwIfProcessStartCancelled(managed);
	const execSpec = await backend.buildExecSpec({
		command: shellCommandFromArgv(params.argv),
		workdir: params.cwd,
		env: params.env,
		usePty: false
	});
	managed.finalizeToken = execSpec.finalizeToken;
	managed.finalizeExec = backend.finalizeExec;
	let child;
	try {
		if (managed.abortController.signal.aborted) throw new Error("process start cancelled");
		const [command, ...args] = execSpec.argv;
		if (!command) throw new Error("OpenClaw sandbox exec spec did not provide a command.");
		child = spawn(command, args, {
			env: execSpec.env,
			stdio: [
				"pipe",
				"pipe",
				"pipe"
			]
		});
	} catch (error) {
		managed.failure = error instanceof Error ? error.message : String(error);
		await finalizeProcess(managed).catch((finalizeError) => {
			log.warn("codex sandbox exec-server finalize after start failure failed", {
				processId: managed.processId,
				error: finalizeError instanceof Error ? finalizeError.message : String(finalizeError)
			});
		});
		throw error;
	}
	managed.child = child;
	const abortListener = () => child.kill("SIGTERM");
	managed.abortController.signal.addEventListener("abort", abortListener, { once: true });
	child.stdout.on("data", (chunk) => appendProcessChunk(managed, managed.tty ? "pty" : "stdout", chunk));
	child.stderr.on("data", (chunk) => appendProcessChunk(managed, "stderr", chunk));
	child.once("error", (error) => {
		managed.failure ??= error.message;
		notifyProcessWaiters(managed);
	});
	child.once("close", (code) => {
		managed.abortController.signal.removeEventListener("abort", abortListener);
		emitProcessClosed(managed, code ?? 1);
	});
	if (!managed.tty && !managed.pipeStdin) child.stdin.end();
}
function throwIfProcessStartCancelled(managed) {
	if (managed.abortController.signal.aborted) throw new Error("process start cancelled");
}
function appendProcessChunk(managed, stream, data) {
	if (data.length === 0) return;
	const chunk = {
		seq: managed.nextSeq,
		stream,
		chunk: data.toString("base64")
	};
	managed.chunks.push(chunk);
	managed.retainedOutputBytes += data.length;
	while (managed.retainedOutputBytes > RETAINED_PROCESS_OUTPUT_BYTES && managed.chunks.length > 1) {
		const removed = managed.chunks.shift();
		if (!removed) break;
		managed.retainedOutputBytes -= Buffer.from(removed.chunk, "base64").byteLength;
	}
	managed.nextSeq += 1;
	managed.emitNotification("process/output", {
		processId: managed.processId,
		seq: chunk.seq,
		stream: chunk.stream,
		chunk: chunk.chunk
	});
	notifyProcessWaiters(managed);
}
function emitProcessClosed(managed, exitCode) {
	if (!managed.exited) {
		const exitSeq = managed.nextSeq;
		managed.nextSeq += 1;
		managed.exitCode = exitCode;
		managed.exited = true;
		if (exitCode !== null) managed.emitNotification("process/exited", {
			processId: managed.processId,
			seq: exitSeq,
			exitCode
		});
	}
	if (!managed.closed) {
		const closeSeq = managed.nextSeq;
		managed.nextSeq += 1;
		managed.closed = true;
		managed.emitNotification("process/closed", {
			processId: managed.processId,
			seq: closeSeq
		});
	}
	finalizeProcess(managed).catch((error) => {
		const message = error instanceof Error ? error.message : String(error);
		managed.failure ??= message;
		log.warn("codex sandbox exec-server finalize failed", {
			processId: managed.processId,
			error: message
		});
	});
	managed.evictProcess();
	notifyProcessWaiters(managed);
}
async function finalizeProcess(managed) {
	if (managed.finalized) return;
	managed.finalized = true;
	managed.child?.stdin.destroy();
	await managed.finalizeExec?.({
		status: managed.failure ? "failed" : "completed",
		exitCode: managed.exitCode,
		timedOut: false,
		token: managed.finalizeToken
	});
}
function limitProcessChunks(chunks, maxBytes) {
	if (!maxBytes) return chunks;
	const retained = [];
	let retainedBytes = 0;
	for (const chunk of chunks) {
		const byteLength = Buffer.from(chunk.chunk, "base64").byteLength;
		if (retained.length > 0 && retainedBytes + byteLength > maxBytes) break;
		retained.push(chunk);
		retainedBytes += byteLength;
		if (retainedBytes >= maxBytes) break;
	}
	return retained;
}
/** Reads buffered process output, optionally waiting for new output or process close. */
async function readProcess(processes, params) {
	const record = requireObject(params, "process/read params");
	const managed = requireProcess(processes, requireString(record.processId, "processId"));
	const afterSeq = typeof record.afterSeq === "number" ? record.afterSeq : 0;
	const waitMs = typeof record.waitMs === "number" && record.waitMs > 0 ? record.waitMs : 0;
	if (!managed.exited && !hasChunksAtOrAfter(managed, afterSeq) && waitMs > 0) await waitForProcessUpdate(managed, waitMs);
	const chunks = limitProcessChunks(managed.chunks.filter((chunk) => chunk.seq > afterSeq), typeof record.maxBytes === "number" && record.maxBytes > 0 ? record.maxBytes : void 0);
	const lastChunk = chunks.at(-1);
	return {
		chunks,
		nextSeq: lastChunk ? lastChunk.seq + 1 : managed.nextSeq,
		exited: managed.exited,
		exitCode: managed.exitCode,
		closed: managed.closed,
		failure: managed.failure
	};
}
/** Writes base64 stdin data to a running process when stdin is still open. */
function writeProcess(processes, params) {
	const record = requireObject(params, "process/write params");
	const processId = requireString(record.processId, "processId");
	const managed = processes.get(processId);
	if (!managed) return { status: "unknownProcess" };
	const chunk = Buffer.from(requireString(record.chunk, "chunk"), "base64");
	if (!managed.tty && !managed.pipeStdin || managed.closed || !managed.child?.stdin.writable) return { status: "stdinClosed" };
	managed.child.stdin.write(chunk);
	return { status: "accepted" };
}
/** Requests process termination and reports whether it was running at call time. */
function terminateProcess(processes, params) {
	const processId = requireString(requireObject(params, "process/terminate params").processId, "processId");
	const managed = processes.get(processId);
	if (!managed) return { running: false };
	const running = !managed.exited;
	managed.abortController.abort();
	managed.child?.kill("SIGTERM");
	if (running && !managed.child) emitProcessClosed(managed, null);
	return { running };
}
function waitForProcessUpdate(managed, waitMs) {
	return new Promise((resolve) => {
		const timer = setTimeout(done, Math.min(waitMs, 3e4));
		function done() {
			clearTimeout(timer);
			managed.waiters = managed.waiters.filter((waiter) => waiter !== done);
			resolve();
		}
		managed.waiters.push(done);
	});
}
function notifyProcessWaiters(managed) {
	const waiters = managed.waiters;
	managed.waiters = [];
	for (const waiter of waiters) waiter();
}
function hasChunksAtOrAfter(managed, afterSeq) {
	return managed.chunks.some((chunk) => chunk.seq > afterSeq);
}
function shellCommandFromArgv(argv) {
	return argv.map(shellEscape).join(" ");
}
function shellEscape(value) {
	return `'${value.replaceAll("'", `'"'"'`)}'`;
}
function requireProcess(processes, processId) {
	const managed = processes.get(processId);
	if (!managed) throw new Error(`unknown process: ${processId}`);
	return managed;
}
function rejectUnsupportedArg0(value) {
	if (value === void 0 || value === null) return;
	if (typeof value === "string") throw new Error("Codex sandbox exec-server does not support arg0 overrides.");
	throw new Error("arg0 must be a string or null.");
}
function readEnv(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return {};
	const env = {};
	for (const [key, rawValue] of Object.entries(value)) if (typeof rawValue === "string" && ENV_KEY_RE.test(key)) env[key] = rawValue;
	return env;
}
function readProcessEnv(record) {
	return {
		...buildEnvFromPolicy(record.envPolicy),
		...readEnv(record.env)
	};
}
function buildEnvFromPolicy(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return {};
	const policy = value;
	const inheritedEnv = readEnv(policy.set);
	const includeOnly = readStringList(policy.includeOnly);
	if (includeOnly.length > 0) filterEnvKeys(inheritedEnv, includeOnly, true);
	return inheritedEnv;
}
function filterEnvKeys(env, patterns, keepMatches) {
	if (patterns.length === 0) return;
	const regexes = patterns.map((pattern) => wildcardPatternToRegex(pattern));
	for (const key of Object.keys(env)) if (regexes.some((regex) => regex.test(key)) !== keepMatches) delete env[key];
}
function wildcardPatternToRegex(pattern) {
	const escaped = pattern.replace(/[.+^${}()|[\]\\]/gu, "\\$&");
	return new RegExp(`^${escaped.replaceAll("*", ".*").replaceAll("?", ".")}$`, "iu");
}
function readStringList(value) {
	return Array.isArray(value) ? value.filter((entry) => typeof entry === "string") : [];
}
//#endregion
//#region extensions/codex/src/app-server/sandbox-exec-server.ts
/**
* Hosts the local OpenClaw sandbox exec-server that Codex app-server native
* execution can register as an external environment.
*/
const CODEX_SANDBOX_EXEC_SERVER_MAX_INBOUND_MESSAGE_BYTES = 100 * 1024 * 1024;
/** Starts or reuses a sandbox exec-server and registers it with Codex app-server. */
async function ensureCodexSandboxExecServerEnvironment(params) {
	if (!params.sandbox?.enabled || !params.sandbox.backend) return;
	if (!canExposeLocalExecServerToAppServer(params.appServerStartOptions)) throw new Error("OpenClaw Codex exec-server uses a local loopback URL and cannot be registered with a remote Codex app-server.");
	const execServer = await acquireOpenClawExecServer(params.sandbox);
	try {
		await params.client.request("environment/add", {
			environmentId: execServer.environmentId,
			execServerUrl: execServer.url
		}, {
			timeoutMs: params.timeoutMs,
			signal: params.signal
		});
	} catch (error) {
		await releaseOpenClawExecServer(execServer);
		if (isEnvironmentAddUnsupported(error)) {
			log.warn("codex app-server does not support remote environments yet", { environmentId: execServer.environmentId });
			return;
		}
		throw error;
	}
	return {
		environmentId: execServer.environmentId,
		cwd: params.sandbox.containerWorkdir
	};
}
/** Releases the sandbox exec-server lease associated with a sandbox runtime. */
async function releaseCodexSandboxExecServerEnvironment(sandbox) {
	if (!sandbox?.enabled) return;
	const server = await sandboxExecServerRegistry.servers.get(sandbox.runtimeId)?.catch(() => void 0);
	if (server) await releaseOpenClawExecServer(server);
}
function isEnvironmentAddUnsupported(error) {
	if (!(error instanceof Error)) return false;
	return error.message.includes("environment/add") && (error.message.includes("unknown variant") || error.message.includes("Method not found"));
}
function canExposeLocalExecServerToAppServer(startOptions) {
	if (!startOptions || startOptions.transport !== "websocket") return true;
	if (typeof startOptions.url !== "string") return false;
	try {
		const host = new URL(startOptions.url).hostname.toLowerCase();
		const ipHost = host.startsWith("[") && host.endsWith("]") ? host.slice(1, -1) : host;
		if (host === "localhost" || ipHost === "::1") return true;
		return isIP(ipHost) === 4 && ipHost.split(".")[0] === "127";
	} catch {
		return false;
	}
}
async function acquireOpenClawExecServer(sandbox) {
	const key = sandbox.runtimeId;
	while (true) {
		const promise = sandboxExecServerRegistry.servers.get(key) ?? startAndRememberOpenClawExecServer(sandbox);
		const server = await promise;
		if (!server.closed && sandboxExecServerRegistry.servers.get(key) === promise) {
			server.refCount += 1;
			return server;
		}
	}
}
function startAndRememberOpenClawExecServer(sandbox) {
	const created = startOpenClawExecServer(sandbox);
	const key = sandbox.runtimeId;
	sandboxExecServerRegistry.servers.set(key, created);
	created.catch(() => {
		if (sandboxExecServerRegistry.servers.get(key) === created) sandboxExecServerRegistry.servers.delete(key);
	});
	return created;
}
async function startOpenClawExecServer(sandbox) {
	const server = new WebSocketServer({
		host: "127.0.0.1",
		port: 0,
		maxPayload: CODEX_SANDBOX_EXEC_SERVER_MAX_INBOUND_MESSAGE_BYTES
	});
	await once(server, "listening");
	const address = server.address();
	if (!address || typeof address === "string") throw new Error("OpenClaw Codex exec-server did not bind to a TCP port.");
	const environmentId = buildEnvironmentId(sandbox);
	const authPath = `/openclaw-${randomUUID()}`;
	const execServer = {
		authPath,
		closed: false,
		environmentId,
		refCount: 0,
		url: `ws://127.0.0.1:${address.port}${authPath}`,
		sandbox,
		server
	};
	server.on("connection", (socket, request) => {
		socket.on("error", handleExecServerSocketError);
		if (!isAuthorizedExecServerRequest(execServer, request)) {
			socket.close(1008, "unauthorized");
			return;
		}
		handleConnection(execServer, socket);
	});
	log.info("codex sandbox exec-server started", {
		environmentId,
		runtimeId: sandbox.runtimeId,
		backendId: sandbox.backendId
	});
	return execServer;
}
async function releaseOpenClawExecServer(execServer) {
	if (execServer.closed) return;
	execServer.refCount = Math.max(0, execServer.refCount - 1);
	if (execServer.refCount > 0) return;
	const current = await sandboxExecServerRegistry.servers.get(execServer.sandbox.runtimeId)?.catch(() => void 0);
	if (execServer.refCount > 0 || execServer.closed) return;
	if (current === execServer) sandboxExecServerRegistry.servers.delete(execServer.sandbox.runtimeId);
	await closeOpenClawExecServer(execServer);
}
async function closeOpenClawExecServer(execServer) {
	if (execServer.closed) return;
	execServer.closed = true;
	for (const client of execServer.server.clients) client.close(1001, "shutdown");
	await new Promise((resolve) => {
		execServer.server.close(() => resolve());
	});
}
function buildEnvironmentId(sandbox) {
	return `openclaw-sandbox-${createHash("sha256").update(sandbox.runtimeId).digest("hex").slice(0, 16)}`;
}
function isAuthorizedExecServerRequest(execServer, request) {
	return new URL(request.url ?? "", "ws://127.0.0.1").pathname === execServer.authPath;
}
function handleConnection(execServer, socket) {
	const processes = /* @__PURE__ */ new Map();
	const fileReads = /* @__PURE__ */ new Map();
	socket.on("message", (data) => {
		handleMessage(execServer, processes, fileReads, socket, data).catch((error) => {
			log.warn("codex sandbox exec-server message failed", { error });
		});
	});
	socket.on("close", () => {
		closeAllFileReads(fileReads);
		for (const process of processes.values()) process.abortController.abort();
	});
}
function handleExecServerSocketError(error) {
	log.debug("codex sandbox exec-server websocket failed", { error });
}
async function handleMessage(execServer, processes, fileReads, socket, data) {
	const request = parseRequest(data);
	if (!request.method) {
		sendError(socket, request.id, -32600, "Invalid Request");
		return;
	}
	const method = request.method;
	if (request.id === void 0) {
		if (method !== "initialized") sendError(socket, -1, -32600, `Unexpected notification: ${method}`);
		return;
	}
	try {
		const result = await dispatchRequest(execServer, processes, fileReads, socket, {
			...request,
			method
		});
		sendResult(socket, request.id, result);
	} catch (error) {
		sendError(socket, request.id, error instanceof JsonRpcProtocolError ? error.code : -32603, error instanceof Error ? error.message : String(error));
	}
}
async function dispatchRequest(execServer, processes, fileReads, socket, request) {
	switch (request.method) {
		case "initialize": return { sessionId: randomUUID() };
		case "environment/info": return {
			shell: {
				name: "sh",
				path: "/bin/sh"
			},
			cwd: pathToFileURL(execServer.sandbox.containerWorkdir, { windows: false }).href,
			capabilities: { networkProxyLaunch: false }
		};
		case "environment/status": return { status: "ready" };
		case "process/start": return startProcess(execServer, processes, socket, request.params);
		case "process/read": return await readProcess(processes, request.params);
		case "process/write": return writeProcess(processes, request.params);
		case "process/terminate": return terminateProcess(processes, request.params);
		case "fs/open": return await openFile(execServer, fileReads, request.params);
		case "fs/readBlock": return readFileBlock(fileReads, request.params);
		case "fs/close": return closeFile(fileReads, request.params);
		case "fs/readFile": return await readFile$1(execServer, request.params);
		case "fs/writeFile":
			await writeFile$1(execServer, request.params);
			return {};
		case "fs/createDirectory":
			await createDirectory(execServer, request.params);
			return {};
		case "fs/getMetadata": return await getMetadata(execServer, request.params);
		case "fs/readDirectory": return await readDirectory(execServer, request.params);
		case "fs/remove":
			await removePath(execServer, request.params);
			return {};
		case "fs/copy":
			await copyPath(execServer, request.params);
			return {};
		case "http/request": return await httpRequest(execServer, socket, request.params);
		default: throw new JsonRpcProtocolError(JSON_RPC_METHOD_NOT_FOUND, `Unsupported OpenClaw sandbox exec-server method: ${request.method}`);
	}
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-resources.ts
function prepareCodexAttemptResources(prompt) {
	const { context, turnState, buildRenderedCodexDeveloperInstructions } = prompt;
	const { runtime, attemptTools } = context;
	const { connection, hookChannelId } = runtime;
	const { appServer, params, effectiveCwd, sessionAgentId, sandboxSessionKey, runAbortController, sandbox, options, nativeHookRelayEvents } = connection;
	const { toolBridge } = attemptTools;
	const hostTrajectoryRecorder = params.trajectoryRecorder;
	const trajectoryRecorder = createCodexTrajectoryRecorder({
		attempt: params,
		cwd: effectiveCwd,
		developerInstructions: buildRenderedCodexDeveloperInstructions(),
		prompt: turnState.codexTurnPromptText,
		trajectoryRecorder: hostTrajectoryRecorder,
		tools: toolBridge.availableSpecs,
		warn: (message, fields) => log.warn(message, fields)
	});
	const state = {
		client: void 0,
		thread: void 0,
		runtimeArtifact: void 0,
		turnRouter: void 0,
		turnRoute: void 0,
		routeActivated: false,
		detachRouteAbort: (() => void 0),
		trajectoryEndRecorded: false,
		nativeHookRelay: void 0,
		nativeSubagentMonitor: void 0,
		nativePreToolUseFailureFallbackActive: false,
		nativePreToolUseFailureFallbackTerminalReason: void 0,
		releaseSharedClientLease: void 0,
		startupClientUnsafe: false,
		sharedCodexClientRetiredForOneShotCleanup: false,
		sandboxExecEnvironmentAcquired: false,
		codexEnvironmentSelection: void 0,
		codexExecutionCwd: effectiveCwd,
		codexSandboxPolicy: void 0,
		restartContextEngineCodexThread: void 0
	};
	const pendingNativePreToolUseFailures = [];
	const projectorRef = {};
	const emitNativePreToolUseFailure = (failure) => {
		emitCodexNativePreToolUseFailureDiagnostic({
			agentId: sessionAgentId,
			sessionId: params.sessionId,
			sessionKey: sandboxSessionKey,
			runId: params.runId,
			signal: runAbortController.signal,
			failure,
			...state.nativePreToolUseFailureFallbackActive ? { terminalReason: state.nativePreToolUseFailureFallbackTerminalReason ?? failure.disposition } : {}
		});
	};
	const flushPendingNativePreToolUseFailures = () => {
		for (const failure of pendingNativePreToolUseFailures.splice(0)) emitNativePreToolUseFailure(failure);
	};
	const activateNativePreToolUseFailureFallback = () => {
		if (!state.nativePreToolUseFailureFallbackActive) {
			state.nativePreToolUseFailureFallbackTerminalReason = runAbortController.signal.aborted ? resolveCodexToolAbortTerminalReason(runAbortController.signal) : void 0;
			state.nativePreToolUseFailureFallbackActive = true;
		}
		flushPendingNativePreToolUseFailures();
	};
	const releaseSharedClientLeaseOnce = () => {
		const release = state.releaseSharedClientLease;
		if (!release) return;
		state.releaseSharedClientLease = void 0;
		release();
	};
	const retireSharedCodexClientForOneShotCleanup = async () => {
		if (params.cleanupBundleMcpOnRunEnd !== true || state.sharedCodexClientRetiredForOneShotCleanup) return;
		state.sharedCodexClientRetiredForOneShotCleanup = true;
		const retired = clearSharedCodexAppServerClientIfCurrentAndUnclaimed(state.client);
		log.info("codex app-server one-shot cleanup checked shared client retirement", {
			runId: params.runId,
			sessionId: params.sessionId,
			sessionKey: params.sessionKey,
			activeLeases: retired.activeLeases,
			pendingAcquires: retired.pendingAcquires,
			closed: retired.closed,
			matchedSharedClient: retired.found
		});
		if (retired.closed) await state.client.closeAndWait({
			exitTimeoutMs: 2e3,
			forceKillDelayMs: 250
		});
	};
	const releaseSharedClientLeaseAndRetireOneShotClient = async () => {
		releaseSharedClientLeaseOnce();
		await retireSharedCodexClientForOneShotCleanup();
	};
	const releaseSandboxExecEnvironment = async () => {
		if (state.sandboxExecEnvironmentAcquired) {
			state.sandboxExecEnvironmentAcquired = false;
			await releaseCodexSandboxExecServerEnvironment(sandbox);
		}
	};
	const unregisterNativeSubagentMonitor = () => {
		state.nativeSubagentMonitor?.unregister();
		state.nativeSubagentMonitor = void 0;
	};
	const registerNativeSubagentMonitor = (parentThreadId) => {
		unregisterNativeSubagentMonitor();
		state.nativeSubagentMonitor = codexNativeSubagentMonitorRuntime.register({
			client: state.client,
			parentThreadId,
			requesterSessionKey: params.sessionKey,
			taskRuntimeScope: params.agentHarnessTaskRuntimeScope,
			agentId: sessionAgentId,
			retainClient: () => retainSharedCodexAppServerClientIfCurrent(state.client)
		});
	};
	const releaseCurrentRoute = () => {
		state.detachRouteAbort();
		state.detachRouteAbort = () => void 0;
		state.turnRoute?.release();
		state.turnRoute = void 0;
		state.routeActivated = false;
		unregisterNativeSubagentMonitor();
	};
	const startupTimeoutMs = resolveCodexStartupTimeoutMs({
		timeoutMs: params.timeoutMs,
		timeoutFloorMs: options.startupTimeoutFloorMs
	});
	const requesterChannel = params.messageChannel ?? params.messageProvider;
	const requester = buildCodexHookRequester(params);
	const buildNativeHookRelayFinalConfigPatch = (decision) => {
		state.nativeHookRelay?.unregister();
		state.nativeHookRelay = createCodexNativeHookRelay({
			options: options.nativeHookRelay,
			generation: decision.action === "resume" ? decision.binding.nativeHookRelayGeneration : void 0,
			generationMismatchGraceMs: decision.action === "resume" && !decision.binding.nativeHookRelayGeneration ? CODEX_NATIVE_HOOK_RELAY_TTL_GRACE_MS : void 0,
			events: nativeHookRelayEvents,
			agentId: sessionAgentId,
			sessionId: params.sessionId,
			sessionKey: sandboxSessionKey,
			config: params.config,
			runId: params.runId,
			channelId: hookChannelId,
			...requester ? { requester } : {},
			approvalContext: {
				trigger: params.trigger,
				approvalReviewerDeviceId: params.approvalReviewerDeviceId,
				turnSourceChannel: requesterChannel,
				turnSourceTo: params.currentMessagingTarget ?? params.currentChannelId,
				turnSourceAccountId: params.agentAccountId,
				turnSourceThreadId: params.currentThreadTs
			},
			attemptTimeoutMs: params.timeoutMs,
			startupTimeoutMs,
			turnStartTimeoutMs: params.timeoutMs,
			loopDetectionPreToolUseRelay: appServer.loopDetectionPreToolUseRelay,
			signal: runAbortController.signal,
			onPreToolUseFailure: (failure) => {
				const projector = projectorRef.current;
				if (projector) projector.recordNativeToolPreToolUseFailure(failure);
				else if (state.nativePreToolUseFailureFallbackActive) emitNativePreToolUseFailure(failure);
				else pendingNativePreToolUseFailures.push(failure);
			}
		});
		return {
			configPatch: state.nativeHookRelay ? buildCodexNativeHookRelayConfig({
				relay: state.nativeHookRelay,
				events: nativeHookRelayEvents,
				hookTimeoutSec: options.nativeHookRelay?.hookTimeoutSec,
				loopDetectionPreToolUseRelay: appServer.loopDetectionPreToolUseRelay
			}) : options.nativeHookRelay?.enabled === false ? buildCodexNativeHookRelayDisabledConfig() : void 0,
			nativeHookRelayGeneration: state.nativeHookRelay?.generation
		};
	};
	return {
		prompt,
		trajectoryRecorder,
		state,
		projectorRef,
		pendingNativePreToolUseFailures,
		markTrajectoryEndRecorded: () => {
			state.trajectoryEndRecorded = true;
		},
		activateNativePreToolUseFailureFallback,
		releaseSharedClientLeaseOnce,
		releaseSharedClientLeaseAndRetireOneShotClient,
		releaseSandboxExecEnvironment,
		registerNativeSubagentMonitor,
		releaseCurrentRoute,
		startupTimeoutMs,
		buildNativeHookRelayFinalConfigPatch
	};
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-route.ts
async function prepareCodexAttemptRoute(resources, turnRuntime, notifications, handleServerRequest) {
	const { prompt, state: resourceState, trajectoryRecorder, releaseCurrentRoute, registerNativeSubagentMonitor, activateNativePreToolUseFailureFallback, releaseSandboxExecEnvironment, releaseSharedClientLeaseOnce } = resources;
	const { connection } = prompt.context.runtime;
	const { params, runAbortController, abortFromUpstream } = connection;
	const { state, turnIdRef, completeTurn } = turnRuntime;
	const { noteNotificationReceived, enqueueNotification } = notifications;
	const attachRouteAbort = (route) => {
		const onAbort = () => {
			if (state.completed || state.terminalTurnNotificationQueued || runAbortController.signal.aborted) return;
			const reasonText = formatErrorMessage(route.signal.reason);
			const closedClient = reasonText.includes("turn router closed");
			const closeCause = route.signal.reason instanceof Error && route.signal.reason.cause instanceof Error ? route.signal.reason.cause : void 0;
			state.clientClosedPromptError = closedClient ? "codex app-server client closed before turn completed" : `codex app-server turn route closed before turn completed: ${reasonText}`;
			state.clientClosedDiagnostic = closedClient && closeCause ? formatErrorMessage(closeCause) : void 0;
			state.clientClosedAbort = closedClient;
			const activeTurnId = turnIdRef.current;
			if (activeTurnId) trajectoryRecorder?.recordEvent("turn.client_closed", {
				threadId: resourceState.thread.threadId,
				turnId: activeTurnId
			});
			log.warn(state.clientClosedPromptError, {
				threadId: resourceState.thread.threadId,
				turnId: activeTurnId,
				...state.clientClosedDiagnostic ? { transportError: state.clientClosedDiagnostic } : {}
			});
			runAbortController.abort(closedClient ? "client_closed" : "turn_route_closed");
			completeTurn();
		};
		route.signal.addEventListener("abort", onAbort, { once: true });
		if (route.signal.aborted) onAbort();
		return () => route.signal.removeEventListener("abort", onAbort);
	};
	const ensureCurrentThreadRoute = async () => {
		if (resourceState.turnRoute?.threadId !== resourceState.thread.threadId) {
			releaseCurrentRoute();
			resourceState.turnRoute = resourceState.turnRouter.reserveThread({ threadId: resourceState.thread.threadId });
		}
		if (!resourceState.turnRoute) throw new Error("codex app-server turn route was not reserved");
		if (!resourceState.routeActivated) {
			if (!resourceState.nativeSubagentMonitor) registerNativeSubagentMonitor(resourceState.thread.threadId);
			resourceState.detachRouteAbort = attachRouteAbort(resourceState.turnRoute);
			await resourceState.turnRoute.activate({
				onNotificationReceived: noteNotificationReceived,
				onNotification: enqueueNotification,
				onRequest: handleServerRequest
			});
			resourceState.routeActivated = true;
		}
		return resourceState.turnRoute;
	};
	try {
		await ensureCurrentThreadRoute();
	} catch (error) {
		activateNativePreToolUseFailureFallback();
		releaseCurrentRoute();
		resourceState.nativeHookRelay?.unregister();
		await releaseSandboxExecEnvironment();
		releaseSharedClientLeaseOnce();
		params.abortSignal?.removeEventListener("abort", abortFromUpstream);
		throw error;
	}
	return { ensureCurrentThreadRoute };
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-client-prewarm.ts
/** Starts the shared process while tools and prompt context are still being prepared. */
function prewarmCodexAttemptClient(params) {
	const { connection, authProfileStore, authBindingFingerprint } = params;
	const { appServer, attemptClientFactory, options, pluginConfig, runtimeArtifactRequest, startupAuthRequirement, startupClientAuthProfileId, startupPreparedAuth, agentDir, params: runParams, runAbortController } = connection;
	if (options.clientFactory || attemptClientFactory !== getLeasedSharedCodexAppServerClient || runtimeArtifactRequest) return;
	getSharedCodexAppServerClient({
		startOptions: appServer.start,
		pluginConfig,
		...startupPreparedAuth ? { preparedAuth: startupPreparedAuth } : { authProfileId: startupClientAuthProfileId },
		authRequirement: startupAuthRequirement,
		authProfileStore,
		authBindingFingerprint,
		agentDir,
		config: runParams.config,
		timeoutMs: appServer.requestTimeoutMs,
		abandonSignal: runAbortController.signal
	}).catch((error) => {
		log.debug("codex app-server client prewarm failed", { error });
	});
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-runtime.ts
async function prepareCodexAttemptRuntime(connection) {
	const { params, pluginConfig, usesSupervisionConnection, appServer, startupAuthProfileId, startupPreparedAuth, startupClientAuthProfileId, agentDir, preDynamicStartupStages, effectiveWorkspace, contextSessionKey, sandboxSessionKey, sessionAgentId, sandbox, attemptClientFactory, runAbortController, activeContextEngine, mutable } = connection;
	const preparedAuthBinding = !usesSupervisionConnection && appServer.start.homeScope !== "user" && startupAuthProfileId ? await prepareCodexAppServerAuthBinding({
		authProfileId: startupAuthProfileId,
		authProfileStore: params.authProfileStore,
		agentDir,
		config: params.config
	}) : void 0;
	const attemptAuthProfileStore = preparedAuthBinding?.authProfileStore ?? params.authProfileStore;
	prewarmCodexAttemptClient({
		connection,
		authProfileStore: attemptAuthProfileStore,
		authBindingFingerprint: preparedAuthBinding?.fingerprint
	});
	const effectiveContextWindowInfo = usesSupervisionConnection ? void 0 : params.contextWindowInfo;
	const effectiveContextTokenBudget = usesSupervisionConnection ? void 0 : params.contextTokenBudget;
	const effectiveRuntimeProviderId = usesSupervisionConnection ? mutable.startupBinding?.modelProvider ?? "codex" : params.provider;
	const effectiveRuntimeModelId = usesSupervisionConnection ? mutable.startupBinding?.model ?? "codex-native" : params.modelId;
	const { authProfileId: _outerAuthProfileId, contextWindowInfo: _outerContextWindowInfo, contextTokenBudget: _outerContextTokenBudget, model: _outerModel, modelId: _outerModelId, provider: _outerProvider, runtimePlan: _outerRuntimePlan, requestedModelId: _outerRequestedModelId, fallbackReason: _outerFallbackReason, degradedReason: _outerDegradedReason, thinkLevel: _outerThinkLevel, fastMode: _outerFastMode, ...paramsWithoutOuterNativeOwnership } = params;
	const supervisedRuntimeModel = {
		id: effectiveRuntimeModelId,
		name: effectiveRuntimeModelId,
		provider: effectiveRuntimeProviderId,
		api: "openai-chatgpt-responses",
		reasoning: true,
		input: ["text", "image"],
		cost: {
			input: 0,
			output: 0,
			cacheRead: 0,
			cacheWrite: 0
		},
		contextWindow: void 0,
		maxTokens: void 0
	};
	const runtimeParams = usesSupervisionConnection ? {
		...paramsWithoutOuterNativeOwnership,
		provider: "codex",
		modelId: effectiveRuntimeModelId,
		model: supervisedRuntimeModel,
		thinkLevel: _outerThinkLevel,
		fastMode: _outerFastMode,
		sessionKey: contextSessionKey
	} : {
		...params,
		authProfileStore: attemptAuthProfileStore,
		sessionKey: contextSessionKey,
		...startupAuthProfileId ? { authProfileId: startupAuthProfileId } : {}
	};
	const activeSessionId = params.sessionId;
	const activeSessionFile = params.sessionFile;
	const buildActiveRunAttemptParams = () => ({
		...runtimeParams,
		sessionId: activeSessionId,
		sessionFile: activeSessionFile
	});
	const startupAuthAccountCacheKey = usesSupervisionConnection ? void 0 : startupPreparedAuth?.kind === "api-key" ? resolveCodexAppServerPreparedApiKeyCacheKey(startupPreparedAuth.apiKey) : startupPreparedAuth?.kind === "profile" ? startupPreparedAuth.snapshot?.secretFreeCacheKey : await resolveCodexAppServerAuthAccountCacheKey({
		authProfileId: startupAuthProfileId,
		authProfileStore: attemptAuthProfileStore,
		agentDir,
		config: params.config
	});
	const startupEnvApiKeyCacheKey = usesSupervisionConnection ? void 0 : startupPreparedAuth || startupAuthProfileId ? void 0 : resolveCodexAppServerFallbackApiKeyCacheKey({ startOptions: appServer.start });
	preDynamicStartupStages.mark("auth-cache");
	const bundleMcpThreadConfig = await loadCodexBundleMcpThreadConfig({
		workspaceDir: effectiveWorkspace,
		cfg: params.config,
		toolsEnabled: usesSupervisionConnection || supportsModelTools(params.model),
		disableTools: params.disableTools,
		toolsAllow: params.toolsAllow,
		toolOverrides: params.toolOverrides
	});
	preDynamicStartupStages.mark("bundle-mcp");
	const sandboxExecServerEnabled = isCodexSandboxExecServerEnabled(pluginConfig);
	const nativeToolSurfaceEnabled = shouldEnableCodexAppServerNativeToolSurface(runtimeParams, sandbox, {
		agentId: sessionAgentId,
		runtimeSessionKey: sandboxSessionKey,
		sandboxExecServerEnabled
	});
	preDynamicStartupStages.mark("native-tool-surface");
	const nativeProviderWebSearchSupport = resolveCodexWebSearchPlan({
		config: params.config,
		disableTools: params.disableTools,
		nativeToolSurfaceEnabled
	}).kind === "native-hosted" ? await resolveCodexProviderWebSearchSupport({
		clientFactory: attemptClientFactory,
		appServer,
		authProfileId: startupClientAuthProfileId,
		preparedAuth: startupPreparedAuth,
		agentDir,
		config: params.config,
		modelProviderOverride: usesSupervisionConnection ? mutable.startupBinding?.modelProvider : resolveCodexAppServerThreadModelSelection({
			provider: params.provider,
			model: params.modelId,
			binding: mutable.startupBinding,
			authProfileId: startupAuthProfileId,
			authProfileStore: attemptAuthProfileStore,
			agentDir,
			config: params.config
		}).modelProvider,
		signal: runAbortController.signal
	}) : "unsupported";
	preDynamicStartupStages.mark("provider-capabilities");
	for (const diagnostic of bundleMcpThreadConfig.diagnostics) log.warn(`bundle-mcp: ${diagnostic.pluginId}: ${diagnostic.message}`);
	if (activeContextEngine) assertContextEngineHostSupport({
		contextEngine: activeContextEngine,
		operation: "agent-run",
		host: CODEX_APP_SERVER_CONTEXT_ENGINE_HOST
	});
	const hookChannelId = resolveCodexAppServerHookChannelId(params, sandboxSessionKey);
	preDynamicStartupStages.mark("context-engine-support");
	return {
		connection,
		preparedAuthBinding,
		runtimeParams,
		activeSessionId,
		activeSessionFile,
		buildActiveRunAttemptParams,
		attemptAuthProfileStore,
		effectiveContextWindowInfo,
		effectiveContextTokenBudget,
		effectiveRuntimeProviderId,
		effectiveRuntimeModelId,
		startupAuthAccountCacheKey,
		startupEnvApiKeyCacheKey,
		bundleMcpThreadConfig,
		sandboxExecServerEnabled,
		nativeToolSurfaceEnabled,
		nativeProviderWebSearchSupport,
		hookChannelId
	};
}
//#endregion
//#region extensions/codex/src/app-server/dynamic-tool-result-projection.ts
/** Project one OpenClaw dynamic-tool response with its executed mutation identity. */
function recordCodexDynamicToolResult(projector, call, response, protocolResponse) {
	projector?.recordDynamicToolResult({
		callId: call.callId,
		tool: call.tool,
		asyncStarted: response.asyncStarted === true,
		terminalResolution: response.terminalResolution,
		success: protocolResponse.success,
		terminalType: response.diagnosticTerminalType ?? (protocolResponse.success ? "completed" : "error"),
		sideEffectEvidence: response.sideEffectEvidence === true || response.terminalResolution?.sideEffectEvidence === true,
		contentItems: protocolResponse.contentItems,
		details: response.transcriptDetails
	});
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-tools.ts
function toTranscriptToolResult(response) {
	const sanitized = sanitizeCodexToolResponse(response);
	const contentItems = Array.isArray(sanitized.contentItems) ? sanitized.contentItems : [];
	const result = {
		...sanitized,
		content: contentItems.map(toTranscriptToolResultContentItem)
	};
	delete result.contentItems;
	delete result.success;
	return result;
}
function toTranscriptToolResultContentItem(item) {
	if (!item || typeof item !== "object") return {
		type: "text",
		text: ""
	};
	const record = item;
	if (record.type === "inputText") return {
		type: "text",
		text: typeof record.text === "string" ? record.text : ""
	};
	if (record.type === "inputImage") return typeof record.imageUrl === "string" ? {
		type: "image",
		url: record.imageUrl
	} : {
		type: "text",
		text: formatUnsupportedCodexDynamicToolOutput(record.type)
	};
	return {
		type: "text",
		text: formatUnsupportedCodexDynamicToolOutput(record.type)
	};
}
function formatUnsupportedCodexDynamicToolOutput(type) {
	const rawType = typeof type === "string" ? type.replace(/\s+/g, " ").trim() : "";
	return `[Unsupported Codex dynamic tool output: ${rawType ? truncateUtf16Safe(rawType, 80) : "unknown"}${rawType.length > 80 ? "..." : ""}]`;
}
function createCodexDynamicToolExecutionRegistry() {
	const executions = /* @__PURE__ */ new Map();
	const keyFor = (call) => JSON.stringify([
		call.threadId,
		call.turnId,
		call.callId
	]);
	return {
		get(call) {
			return executions.get(keyFor(call));
		},
		claim(call, start) {
			const existing = executions.get(keyFor(call));
			if (existing) return {
				execution: existing,
				replayed: true
			};
			const execution = start();
			executions.set(keyFor(call), execution);
			return {
				execution,
				replayed: false
			};
		}
	};
}
function handleApprovalRequest(params) {
	return handleCodexAppServerApprovalRequest({
		method: params.method,
		requestParams: params.params,
		paramsForRun: params.paramsForRun,
		threadId: params.threadId,
		turnId: params.turnId,
		nativeHookRelay: params.nativeHookRelay,
		autoApprove: params.autoApprove,
		autoApproveOpenClawToolPolicy: params.autoApproveOpenClawToolPolicy,
		signal: params.signal,
		onNativeToolFailureDisposition: params.onNativeToolFailureDisposition
	});
}
function resolveCodexDynamicToolDirectNames(params, hostSystemAgentActive = false) {
	const names = [];
	if (hostSystemAgentActive && isSystemAgentOnlyCodexDynamicToolAllowlist(params.toolsAllow)) names.push("openclaw");
	if (params.sourceReplyDeliveryMode === "message_tool_only") names.push("message");
	return names;
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-server-requests.ts
function createCodexAttemptServerRequestController(resources, turnRuntime, lifecycle) {
	const { prompt, state: resourceState, projectorRef, trajectoryRecorder } = resources;
	const { context } = prompt;
	const { runtime, attemptTools } = context;
	const { connection } = runtime;
	const { params, computerUseConfig, runAbortController, appServer, approvalPolicyPromotedForOpenClawToolPolicy, sessionAgentId } = connection;
	const { toolBridge, toolOutcomeOrdinals, suppressedDynamicToolOutcomeOrdinals, allocateCodexToolOutcomeOrdinal } = attemptTools;
	const { state, turnIdRef, userInputBridgeRef, openClawDynamicToolExecutions, pendingOpenClawDynamicToolCompletionIds, postToolRawAssistantCompletionIdleTimeoutMs, turnWatches } = turnRuntime;
	const { emitExecutionPhaseOnce, scheduleTurnReleaseAfterTerminalDynamicTool, scheduleTerminalDynamicToolReleaseCheck } = lifecycle;
	const handleServerRequest = async (request, scope, requestSignal = new AbortController().signal) => {
		const signal = AbortSignal.any([runAbortController.signal, requestSignal]);
		const turnId = turnIdRef.current;
		const projector = projectorRef.current;
		let armCompletionWatchOnResponse = false;
		let requestCountsAsTurnActivity = false;
		const markCurrentTurnRequestProgress = () => {
			state.activeAppServerTurnRequests += 1;
			turnWatches.clearCompletionIdleTimer();
			turnWatches.disarmAssistantCompletionIdleWatch();
			requestCountsAsTurnActivity = true;
			turnWatches.touchActivity(`request:${request.method}:start`, { attemptProgress: true });
		};
		try {
			if (!turnId) return;
			if (request.method === "mcpServer/elicitation/request") {
				if (!scope.turnId || scope.turnId === turnId) {
					armCompletionWatchOnResponse = true;
					markCurrentTurnRequestProgress();
				}
				return await handleCodexAppServerElicitationRequest({
					requestParams: request.params,
					paramsForRun: params,
					threadId: resourceState.thread.threadId,
					turnId,
					pluginAppPolicyContext: resourceState.thread.pluginAppPolicyContext,
					...computerUseConfig.enabled ? { computerUseMcpServerName: computerUseConfig.mcpServerName } : {},
					signal
				});
			}
			if (request.method === "item/tool/requestUserInput") {
				if (scope.turnId === turnId) {
					armCompletionWatchOnResponse = true;
					markCurrentTurnRequestProgress();
				}
				return userInputBridgeRef.current?.handleRequest({
					id: request.id,
					params: request.params
				});
			}
			if (request.method !== "item/tool/call") {
				if (isCodexAppServerApprovalRequest(request.method)) {
					if (scope.turnId === turnId) {
						armCompletionWatchOnResponse = true;
						markCurrentTurnRequestProgress();
					}
					return handleApprovalRequest({
						method: request.method,
						params: request.params,
						paramsForRun: params,
						threadId: resourceState.thread.threadId,
						turnId,
						nativeHookRelay: resourceState.nativeHookRelay,
						autoApprove: shouldAutoApproveCodexAppServerApprovals(appServer),
						autoApproveOpenClawToolPolicy: approvalPolicyPromotedForOpenClawToolPolicy,
						signal,
						onNativeToolFailureDisposition: (itemId, disposition) => projector?.recordNativeToolApprovalFailure(itemId, disposition)
					});
				}
				return;
			}
			const call = readCodexDynamicToolCallParams(request.params);
			if (!call || call.threadId !== resourceState.thread.threadId || call.turnId !== turnId) return;
			const replayedExecution = openClawDynamicToolExecutions.get(call);
			if (replayedExecution) {
				armCompletionWatchOnResponse = true;
				markCurrentTurnRequestProgress();
				state.turnCrossedToolHandoff = true;
				return toCodexDynamicToolProtocolResponse(await replayedExecution);
			}
			const toolCallOrdinal = allocateCodexToolOutcomeOrdinal?.(call.callId);
			armCompletionWatchOnResponse = true;
			markCurrentTurnRequestProgress();
			state.turnCrossedToolHandoff = true;
			pendingOpenClawDynamicToolCompletionIds.add(call.callId);
			trajectoryRecorder?.recordEvent("tool.call", {
				threadId: call.threadId,
				turnId: call.turnId,
				toolCallId: call.callId,
				name: call.tool,
				arguments: call.arguments
			});
			projector?.recordDynamicToolCall({
				callId: call.callId,
				tool: call.tool,
				arguments: call.arguments
			});
			emitExecutionPhaseOnce(`tool:${call.callId}`, {
				phase: "tool_execution_started",
				tool: call.tool,
				toolCallId: call.callId
			});
			emitDynamicToolStartedDiagnostic({
				call,
				agentId: sessionAgentId,
				runId: params.runId,
				sessionId: params.sessionId,
				sessionKey: params.sessionKey
			});
			const toolMeta = inferCodexDynamicToolMeta(call, resolveCodexToolProgressDetailMode(params.toolProgressDetail));
			const toolArgs = sanitizeCodexToolArguments(call.arguments);
			const shouldEmitDynamicToolProgress = shouldEmitTranscriptToolProgress(call.tool, toolArgs);
			if (shouldEmitDynamicToolProgress) emitCodexAppServerEvent(params, {
				stream: "tool",
				data: {
					phase: "start",
					name: call.tool,
					toolCallId: call.callId,
					...toolMeta ? { meta: toolMeta } : {},
					...toolArgs ? { args: toolArgs } : {}
				}
			});
			const dynamicToolTimeoutMs = resolveDynamicToolCallTimeoutMs({
				call,
				config: params.config
			});
			const toolStartedAt = Date.now();
			let terminalDiagnosticObserved = false;
			const unsubscribeToolDiagnosticObserver = onInternalDiagnosticEvent((event) => {
				if (isDynamicToolTerminalDiagnosticEvent(event) && isMatchingDynamicToolTerminalDiagnostic({
					event,
					call,
					runId: params.runId,
					sessionId: params.sessionId,
					sessionKey: params.sessionKey
				})) terminalDiagnosticObserved = true;
			});
			try {
				const { execution } = openClawDynamicToolExecutions.claim(call, () => handleDynamicToolCallWithTimeout({
					call,
					toolBridge,
					signal,
					timeoutMs: dynamicToolTimeoutMs,
					toolMeta,
					toolCallOrdinal,
					onAgentToolResult: params.onAgentToolResult,
					observeToolTerminal: params.observeToolTerminal,
					onFallbackSelected: () => {
						if (toolCallOrdinal !== void 0) suppressedDynamicToolOutcomeOrdinals.add(toolCallOrdinal);
					},
					onTimeout: () => {
						trajectoryRecorder?.recordEvent("tool.timeout", {
							threadId: call.threadId,
							turnId: call.turnId,
							toolCallId: call.callId,
							name: call.tool,
							timeoutMs: dynamicToolTimeoutMs
						});
					}
				}));
				const response = await execution;
				const protocolResponse = toCodexDynamicToolProtocolResponse(response);
				if (!protocolResponse.success && toolCallOrdinal !== void 0) {
					suppressedDynamicToolOutcomeOrdinals.add(toolCallOrdinal);
					params.onToolOutcome?.({
						toolName: call.tool,
						argsHash: "",
						resultHash: "",
						toolCallOrdinal,
						terminalPresentation: void 0,
						presentationOnly: true
					});
				}
				const toolDurationMs = Math.max(0, Date.now() - toolStartedAt);
				trajectoryRecorder?.recordEvent("tool.result", {
					threadId: call.threadId,
					turnId: call.turnId,
					toolCallId: call.callId,
					name: call.tool,
					success: protocolResponse.success,
					contentItems: protocolResponse.contentItems
				});
				recordCodexDynamicToolResult(projector, call, response, protocolResponse);
				if (shouldEmitDynamicToolProgress) {
					const progressResponse = toCodexDynamicToolProgressResponse(response, protocolResponse);
					emitCodexAppServerEvent(params, {
						stream: "tool",
						data: {
							phase: "result",
							name: call.tool,
							toolCallId: call.callId,
							...toolMeta ? { meta: toolMeta } : {},
							isError: !protocolResponse.success,
							result: toTranscriptToolResult(progressResponse)
						}
					});
				}
				if (!terminalDiagnosticObserved && !hasPendingDynamicToolTerminalDiagnostic({
					call,
					runId: params.runId,
					sessionId: params.sessionId,
					sessionKey: params.sessionKey
				})) emitDynamicToolTerminalDiagnostic({
					response,
					call,
					agentId: sessionAgentId,
					runId: params.runId,
					sessionId: params.sessionId,
					sessionKey: params.sessionKey,
					durationMs: toolDurationMs
				});
				pendingOpenClawDynamicToolCompletionIds.delete(call.callId);
				if (response.terminate === true && response.success) scheduleTurnReleaseAfterTerminalDynamicTool({
					call,
					response,
					durationMs: toolDurationMs
				});
				else if (!shouldBlockTerminalReleaseForNonTerminalDynamicToolResult(response)) scheduleTerminalDynamicToolReleaseCheck();
				else {
					state.currentTurnHadNonTerminalDynamicToolResult = true;
					state.pendingTerminalDynamicToolRelease = void 0;
				}
				return protocolResponse;
			} catch (error) {
				pendingOpenClawDynamicToolCompletionIds.delete(call.callId);
				if (!terminalDiagnosticObserved && !hasPendingDynamicToolTerminalDiagnostic({
					call,
					runId: params.runId,
					sessionId: params.sessionId,
					sessionKey: params.sessionKey
				})) emitDynamicToolErrorDiagnostic({
					call,
					agentId: sessionAgentId,
					runId: params.runId,
					sessionId: params.sessionId,
					sessionKey: params.sessionKey,
					durationMs: Math.max(0, Date.now() - toolStartedAt)
				});
				throw error;
			} finally {
				toolOutcomeOrdinals.delete(call.callId);
				unsubscribeToolDiagnosticObserver();
			}
		} finally {
			if (requestCountsAsTurnActivity) {
				state.activeAppServerTurnRequests = Math.max(0, state.activeAppServerTurnRequests - 1);
				const postToolContinuationTimeoutMs = request.method === "item/tool/call" && state.turnCrossedToolHandoff ? postToolRawAssistantCompletionIdleTimeoutMs : void 0;
				turnWatches.touchActivity(`request:${request.method}:response`, {
					arm: armCompletionWatchOnResponse,
					attemptProgress: true,
					...postToolContinuationTimeoutMs !== void 0 ? { attemptTimeoutMs: postToolContinuationTimeoutMs } : {}
				});
				if (armCompletionWatchOnResponse && postToolContinuationTimeoutMs !== void 0) turnWatches.armCompletionIdleWatch({ timeoutMs: postToolContinuationTimeoutMs });
				scheduleTerminalDynamicToolReleaseCheck();
			} else turnWatches.scheduleProgressWatches();
		}
	};
	return { handleServerRequest };
}
//#endregion
//#region extensions/codex/src/app-server/computer-use-health.ts
const COMPUTER_USE_HEALTH_MONITOR_STATE = Symbol.for("openclaw.codexComputerUseHealthMonitorState");
function getComputerUseHealthMonitorState() {
	const globalState = globalThis;
	globalState[COMPUTER_USE_HEALTH_MONITOR_STATE] ??= { monitors: /* @__PURE__ */ new WeakMap() };
	return globalState[COMPUTER_USE_HEALTH_MONITOR_STATE];
}
function startCodexComputerUseHealthMonitor(params) {
	const state = getComputerUseHealthMonitorState();
	const existing = state.monitors.get(params.client);
	if (!params.config.enabled || !params.config.healthCheckEnabled) {
		if (existing) clearComputerUseHealthMonitor(params.client, existing);
		return {
			started: false,
			reason: params.config.enabled ? "health_disabled" : "disabled"
		};
	}
	const fingerprint = buildComputerUseHealthMonitorFingerprint(params.config);
	const intervalMs = params.config.healthCheckIntervalMinutes * 6e4;
	if (existing?.fingerprint === fingerprint && existing.repairComputerUseMcpChildren === params.repairComputerUseMcpChildren) return {
		started: false,
		intervalMs,
		reason: "already_started"
	};
	if (existing) clearComputerUseHealthMonitor(params.client, existing);
	const repairComputerUseMcpChildren = params.repairComputerUseMcpChildren ?? (() => killStaleComputerUseMcpChildren({ ancestorPid: params.client.getTransportPid() }));
	const monitor = {
		fingerprint,
		intervalMs,
		repairComputerUseMcpChildren: params.repairComputerUseMcpChildren,
		timer: setInterval(() => {
			runCodexComputerUseHealthProbe(params.client, params.config, monitor, { repairComputerUseMcpChildren });
		}, intervalMs),
		disposeCloseHandler: () => void 0,
		running: false
	};
	monitor.timer.unref?.();
	monitor.disposeCloseHandler = params.client.addCloseHandler((client) => {
		const active = state.monitors.get(client);
		if (active) clearComputerUseHealthMonitor(client, active);
	});
	state.monitors.set(params.client, monitor);
	return {
		started: true,
		intervalMs
	};
}
function buildComputerUseHealthMonitorFingerprint(config) {
	return JSON.stringify({
		autoRepair: config.autoRepair,
		healthCheckIntervalMinutes: config.healthCheckIntervalMinutes,
		liveTestTimeoutMs: config.liveTestTimeoutMs,
		mcpServerName: config.mcpServerName,
		toolCallTimeoutMs: config.toolCallTimeoutMs
	});
}
async function runCodexComputerUseHealthProbe(client, config, monitor, options) {
	if (monitor.running) return;
	monitor.running = true;
	try {
		const { liveTest, repair } = await runCodexComputerUseLiveTest({
			config,
			repairComputerUseMcpChildren: options.repairComputerUseMcpChildren,
			request: async (method, requestParams, requestOptions) => await client.request(method, requestParams, { timeoutMs: requestOptions?.timeoutMs ?? config.liveTestTimeoutMs })
		});
		if (!liveTest.ok) {
			log.warn("codex computer-use periodic health failed", {
				mcpServerName: config.mcpServerName,
				attempts: liveTest.attempts,
				timeoutMs: liveTest.timeoutMs,
				error: liveTest.error,
				repair
			});
			return;
		}
		if (repair?.killedPids.length) log.info("codex computer-use periodic health repaired stale children", {
			mcpServerName: config.mcpServerName,
			killedPids: repair.killedPids
		});
	} catch (error) {
		log.warn("codex computer-use periodic health probe crashed", {
			mcpServerName: config.mcpServerName,
			error: error instanceof Error ? error.message : String(error)
		});
	} finally {
		monitor.running = false;
	}
}
function clearComputerUseHealthMonitor(client, monitor) {
	clearInterval(monitor.timer);
	monitor.disposeCloseHandler();
	getComputerUseHealthMonitorState().monitors.delete(client);
}
//#endregion
//#region extensions/codex/src/app-server/plugin-metadata-cache.ts
const CODEX_PLUGIN_METADATA_CACHE_TTL_MS = 3600 * 1e3;
/** Process-local plugin metadata cache with coalesced loads per query. */
var CodexPluginMetadataCache = class {
	constructor(nowMs = Date.now) {
		this.nowMs = nowMs;
		this.entries = /* @__PURE__ */ new Map();
		this.inFlight = /* @__PURE__ */ new Map();
		this.generations = /* @__PURE__ */ new Map();
		this.clearGeneration = 0;
	}
	/** Returns a fresh cached snapshot without issuing a request. */
	read(appCacheKey, queryKind, requestParams) {
		const entryKey = buildMetadataCacheEntryKey(appCacheKey, queryKind, requestParams);
		const entry = this.entries.get(entryKey);
		if (!entry) return;
		if (entry.expiresAtMs <= this.nowMs()) {
			this.entries.delete(entryKey);
			return;
		}
		return entry.snapshot;
	}
	/** Returns a fresh snapshot or coalesces one catalog or installed-plugin request. */
	async load(params) {
		const entryKey = buildMetadataCacheEntryKey(params.appCacheKey, params.queryKind, params.requestParams);
		const cached = this.read(params.appCacheKey, params.queryKind, params.requestParams);
		if (cached) return cached;
		const pending = this.inFlight.get(entryKey);
		if (pending) try {
			return await pending.promise;
		} catch {
			if (this.inFlight.get(entryKey) === pending) this.inFlight.delete(entryKey);
			return await this.load(params);
		}
		const generation = this.generations.get(params.appCacheKey) ?? 0;
		const clearGeneration = this.clearGeneration;
		const promise = (async () => {
			const method = params.queryKind === "installed" ? "plugin/installed" : "plugin/list";
			const response = await params.request(method, params.requestParams);
			const snapshot = {
				appCacheKey: params.appCacheKey,
				queryKind: params.queryKind,
				response
			};
			if (generation === (this.generations.get(params.appCacheKey) ?? 0) && clearGeneration === this.clearGeneration && !hasMarketplaceLoadErrors(response) && (params.cacheable?.(response) ?? true)) this.entries.set(entryKey, {
				snapshot,
				expiresAtMs: this.nowMs() + CODEX_PLUGIN_METADATA_CACHE_TTL_MS
			});
			return snapshot;
		})();
		this.inFlight.set(entryKey, {
			appCacheKey: params.appCacheKey,
			promise
		});
		try {
			return await promise;
		} finally {
			if (this.inFlight.get(entryKey)?.promise === promise) this.inFlight.delete(entryKey);
		}
	}
	/** Invalidates all plugin metadata queries for one app-server runtime. */
	invalidate(appCacheKey) {
		this.generations.set(appCacheKey, (this.generations.get(appCacheKey) ?? 0) + 1);
		for (const [entryKey, entry] of this.entries) if (entry.snapshot.appCacheKey === appCacheKey) this.entries.delete(entryKey);
		for (const [entryKey, pending] of this.inFlight) if (pending.appCacheKey === appCacheKey) this.inFlight.delete(entryKey);
	}
	/** Clears snapshots and prevents late in-flight loads from repopulating them. */
	clear() {
		this.clearGeneration += 1;
		this.generations.clear();
		this.entries.clear();
		this.inFlight.clear();
	}
};
/** Shared plugin metadata cache used by Codex app-server runtime paths. */
const defaultCodexPluginMetadataCache = new CodexPluginMetadataCache();
function hasMarketplaceLoadErrors(response) {
	return response.marketplaceLoadErrors.length > 0;
}
function buildMetadataCacheEntryKey(appCacheKey, queryKind, requestParams) {
	if (queryKind !== "installed") return JSON.stringify([appCacheKey, queryKind]);
	const installedParams = requestParams;
	return JSON.stringify([
		appCacheKey,
		queryKind,
		installedParams?.cwds ?? [],
		Array.from(new Set(installedParams?.installSuggestionPluginNames ?? [])).toSorted()
	]);
}
//#endregion
//#region extensions/codex/src/app-server/plugin-thread-config-deadline.ts
/** Enforces one bounded startup budget across Codex plugin config discovery. */
const CODEX_PLUGIN_THREAD_CONFIG_MAX_TIMEOUT_MS = 6e4;
const CODEX_PLUGIN_THREAD_CONFIG_TIMEOUT_DIVISOR = 4;
const CODEX_PLUGIN_THREAD_CONFIG_MIN_TIMEOUT_MS = 100;
var CodexPluginThreadConfigDeadlineError = class extends Error {
	constructor() {
		super("Codex plugin thread config deadline elapsed");
		this.name = "CodexPluginThreadConfigDeadlineError";
	}
};
/** Resolves the plugin policy state reused throughout app-server startup. */
function resolveCodexPluginThreadConfigStartupPolicy(params) {
	const pluginThreadConfigRequired = !params.nativeToolSurfaceEnabled || shouldBuildCodexPluginThreadConfig(params.pluginConfig);
	const pluginThreadConfigPluginConfig = params.nativeToolSurfaceEnabled ? params.pluginConfig : disableCodexPluginThreadConfig(params.pluginConfig);
	const resolvedPluginPolicy = pluginThreadConfigRequired ? resolveCodexPluginsPolicy(pluginThreadConfigPluginConfig) : void 0;
	return {
		pluginThreadConfigRequired,
		pluginThreadConfigPluginConfig,
		resolvedPluginPolicy,
		enabledPluginConfigKeys: resolvedPluginPolicy ? resolvedPluginPolicy.pluginPolicies.filter((plugin) => plugin.enabled).map((plugin) => plugin.configKey).toSorted() : void 0
	};
}
/** Builds plugin config without allowing sequential RPC timeouts to consume the turn. */
async function buildCodexPluginThreadConfigWithinDeadline(params) {
	const { requestTimeoutMs, signal, request, ...buildParams } = params;
	const timeoutMs = resolveCodexPluginThreadConfigTimeoutMs(requestTimeoutMs);
	const deadlineMs = Date.now() + timeoutMs;
	try {
		return await waitForCodexPluginThreadConfigBuild({
			signal,
			timeoutMs,
			build: () => buildCodexPluginThreadConfig({
				...buildParams,
				request: (method, requestParams) => {
					const remainingTimeoutMs = deadlineMs - Date.now();
					if (remainingTimeoutMs <= 0) throw new CodexPluginThreadConfigDeadlineError();
					return request(method, requestParams, {
						timeoutMs: remainingTimeoutMs,
						signal
					});
				}
			})
		});
	} catch (error) {
		if (signal.aborted || !isCodexPluginThreadConfigTimeoutError(error)) throw error;
		return buildCodexPluginThreadConfigTimeoutFallback({
			pluginConfig: buildParams.pluginConfig,
			appCacheKey: buildParams.appCacheKey,
			message: `Codex plugin discovery exceeded its ${timeoutMs} ms startup budget; plugin apps were disabled for this turn.`
		});
	}
}
function waitForCodexPluginThreadConfigBuild(params) {
	if (params.signal.aborted) return Promise.reject(resolveAbortReason(params.signal));
	return new Promise((resolve, reject) => {
		let settled = false;
		const finish = () => {
			if (settled) return false;
			settled = true;
			clearTimeout(timer);
			params.signal.removeEventListener("abort", onAbort);
			return true;
		};
		const resolveOnce = (config) => {
			if (finish()) resolve(config);
		};
		const rejectOnce = (error) => {
			if (finish()) reject(error instanceof Error ? error : new Error(String(error)));
		};
		const onAbort = () => rejectOnce(resolveAbortReason(params.signal));
		const timer = setTimeout(() => rejectOnce(new CodexPluginThreadConfigDeadlineError()), params.timeoutMs);
		params.signal.addEventListener("abort", onAbort, { once: true });
		params.build().then(resolveOnce, rejectOnce);
	});
}
function resolveAbortReason(signal) {
	return signal.reason instanceof Error ? signal.reason : /* @__PURE__ */ new Error("Codex plugin thread config aborted");
}
/** Creates the recovery metadata and bounded builder used by thread startup. */
function createCodexPluginThreadConfigStartupProvider(params) {
	const { client, policy, inputFingerprint, enabledPluginConfigKeys, appCache, metadataCache: configuredMetadataCache, ...buildParams } = params;
	const metadataCache = configuredMetadataCache ?? defaultCodexPluginMetadataCache;
	return {
		enabled: true,
		inputFingerprint,
		enabledPluginConfigKeys,
		accountAppRecoveryEnabled: policy?.allowAllPlugins,
		recoverablePluginConfigKeys: policy ? resolveRecoverableCodexPluginConfigKeys({
			policy,
			metadataCache,
			appCacheKey: params.appCacheKey,
			configCwd: params.configCwd
		}) : void 0,
		build: () => buildCodexPluginThreadConfigWithinDeadline({
			...buildParams,
			appCache: appCache ?? defaultCodexAppInventoryCache,
			metadataCache,
			request: (method, requestParams, options) => client.request(method, requestParams, options)
		})
	};
}
function resolveCodexPluginThreadConfigTimeoutMs(requestTimeoutMs) {
	return Math.min(CODEX_PLUGIN_THREAD_CONFIG_MAX_TIMEOUT_MS, Math.max(CODEX_PLUGIN_THREAD_CONFIG_MIN_TIMEOUT_MS, Math.floor((Number.isFinite(requestTimeoutMs) && requestTimeoutMs > 0 ? requestTimeoutMs : CODEX_PLUGIN_THREAD_CONFIG_MAX_TIMEOUT_MS * CODEX_PLUGIN_THREAD_CONFIG_TIMEOUT_DIVISOR) / CODEX_PLUGIN_THREAD_CONFIG_TIMEOUT_DIVISOR)));
}
function isCodexPluginThreadConfigTimeoutError(error) {
	return error instanceof CodexPluginThreadConfigDeadlineError || error instanceof Error && "code" in error && error.code === "CODEX_APP_SERVER_LOCAL_REQUEST_CANCELLED" && error.message.endsWith(" timed out");
}
//#endregion
//#region extensions/codex/src/app-server/attempt-startup.ts
/**
* Startup orchestration for Codex app-server attempts, including shared-client
* leasing, plugin thread config, sandbox environment, and thread lifecycle binding.
*/
const CODEX_APP_SERVER_STARTUP_CONNECTION_CLOSE_MAX_ATTEMPTS = 3;
const CODEX_APP_SERVER_CONTEXT_RESTART_SELECTION_CHANGED = "CODEX_APP_SERVER_CONTEXT_RESTART_SELECTION_CHANGED";
/** True when a pre-write context restart must replay on the newly selected owner. */
function isCodexContextRestartSelectionChangedError(error) {
	return error instanceof Error && "code" in error && error.code === CODEX_APP_SERVER_CONTEXT_RESTART_SELECTION_CHANGED;
}
/**
* Starts or resumes the Codex app-server thread and returns the resources the
* run loop must later release.
*/
async function startCodexAttemptThread(params) {
	let pluginAppServer = params.appServer;
	const startupRuntimeAuthProfileId = params.startupPreparedAuth?.kind === "profile" ? params.startupPreparedAuth.profileId : params.startupAuthProfileId ?? void 0;
	const startupRuntimeAuthProfileStore = params.startupPreparedAuth?.kind === "profile" ? params.startupPreparedAuth.store : void 0;
	let releaseSharedClientLease;
	let startupClientForAbandonedRequestCleanup;
	let releaseStartupResourcesOnTimeout;
	let startupAbandoned = false;
	const startupAbandonController = new AbortController();
	const abandonStartupAcquire = () => startupAbandonController.abort();
	params.signal.addEventListener("abort", abandonStartupAcquire, { once: true });
	try {
		const startupResult = await withCodexStartupTimeout({
			timeoutMs: params.startupTimeoutMs,
			signal: params.signal,
			onTimeout: async () => {
				startupAbandoned = true;
				startupAbandonController.abort();
				await params.onStartupTimeout();
				await releaseStartupResourcesOnTimeout?.();
				releaseSharedClientLease?.();
				releaseSharedClientLease = void 0;
				await closeCodexStartupClientBestEffort(startupClientForAbandonedRequestCleanup);
				startupClientForAbandonedRequestCleanup = void 0;
			},
			operation: async () => {
				const threadConfig = mergeCodexThreadConfigs(params.bundleMcpThreadConfig?.configPatch);
				const { pluginThreadConfigRequired, pluginThreadConfigPluginConfig, resolvedPluginPolicy, enabledPluginConfigKeys } = resolveCodexPluginThreadConfigStartupPolicy({
					pluginConfig: params.pluginConfig,
					nativeToolSurfaceEnabled: params.nativeToolSurfaceEnabled
				});
				const computerUseMcpElicitationDelegationRequired = params.computerUseConfig.enabled;
				pluginAppServer = resolvedPluginPolicy?.enabled === true || computerUseMcpElicitationDelegationRequired ? {
					...params.appServer,
					approvalPolicy: withMcpElicitationsApprovalPolicy(params.appServer.approvalPolicy)
				} : params.appServer;
				let attemptedClient;
				const startupAttempt = async () => {
					let startupClientLease;
					let startupClient;
					let startupAttemptError;
					let startupAttemptSucceeded = false;
					try {
						const attemptParams = params.buildAttemptParams();
						startupClient = await params.attemptClientFactory({
							startOptions: params.appServer.start,
							pluginConfig: params.pluginConfig,
							...params.startupPreparedAuth ? { preparedAuth: params.startupPreparedAuth } : { authProfileId: params.startupAuthProfileId },
							authRequirement: params.startupAuthRequirement,
							authProfileStore: attemptParams.authProfileStore,
							authBindingFingerprint: params.startupAuthBindingFingerprint,
							...params.runtimeArtifactRequest ? {
								runtimeArtifactMode: "capture",
								...params.runtimeArtifactRequest.expected ? { expectedRuntimeArtifact: params.runtimeArtifactRequest.expected } : {}
							} : {},
							agentId: params.sessionAgentId,
							agentDir: params.agentDir,
							config: params.config,
							onStartedClient: (client) => {
								startupClientForAbandonedRequestCleanup = client;
								if (startupAbandoned || startupAbandonController.signal.aborted) closeCodexStartupClientBestEffort(client);
							},
							abandonSignal: startupAbandonController.signal,
							timeoutMs: params.appServer.requestTimeoutMs
						});
						const activeStartupClient = startupClient;
						let startupClientLeaseReleased = false;
						startupClientLease = () => {
							if (startupClientLeaseReleased) return;
							startupClientLeaseReleased = true;
							releaseLeasedSharedCodexAppServerClient(activeStartupClient);
						};
						releaseSharedClientLease = startupClientLease;
						attemptedClient = activeStartupClient;
						startupClientForAbandonedRequestCleanup = activeStartupClient;
						if (startupAbandoned) throw new CodexAppServerStartupError("timed_out");
						if (startupAbandonController.signal.aborted) throw new CodexAppServerStartupError("aborted");
						let runtimeArtifact;
						if (params.runtimeArtifactRequest) {
							const { readCodexAppServerClientRuntimeArtifact, validateCodexAppServerRuntimeArtifact } = await import("./runtime-artifact-DymhEMQa.js");
							runtimeArtifact = readCodexAppServerClientRuntimeArtifact(activeStartupClient);
							const expected = params.runtimeArtifactRequest.expected;
							const matchesExpected = !expected || Boolean(runtimeArtifact && runtimeArtifact.id === expected.id && runtimeArtifact.fingerprint === expected.fingerprint);
							if (!runtimeArtifact || !matchesExpected || !await validateCodexAppServerRuntimeArtifact(runtimeArtifact, startupAbandonController.signal)) {
								retireSharedCodexAppServerClientIfCurrent(activeStartupClient);
								throw new Error(expected ? "Codex app-server runtime artifact does not match verified inference" : "Codex app-server runtime artifact is unavailable or stale");
							}
						}
						ensureCodexAppServerClientRuntime(activeStartupClient, {
							agentDir: params.agentDir,
							authProfileId: startupRuntimeAuthProfileId,
							authMode: params.startupPreparedAuth?.kind === "api-key" ? "prepared-api-key" : "profile",
							authProfileStore: startupRuntimeAuthProfileStore ?? attemptParams.authProfileStore,
							config: params.config
						});
						const turnRouter = getCodexAppServerTurnRouter(activeStartupClient);
						try {
							await ensureCodexComputerUse({
								client: activeStartupClient,
								pluginConfig: params.pluginConfig,
								config: params.config,
								agentDir: params.agentDir,
								timeoutMs: params.appServer.requestTimeoutMs,
								signal: startupAbandonController.signal
							});
						} catch (error) {
							if (startupAbandonController.signal.aborted) throw error;
							throw new AgentHarnessPreflightError(`Codex Computer Use readiness failed: ${formatErrorMessage(error)}`, {
								cause: error,
								scope: "harness"
							});
						}
						const startupRuntimeIdentity = activeStartupClient.getRuntimeIdentity();
						const pluginAppCacheKey = buildCodexPluginAppCacheKey({
							appServer: params.appServer,
							agentDir: params.agentDir,
							authProfileId: startupRuntimeAuthProfileId,
							accountId: params.startupAuthAccountCacheKey,
							envApiKeyFingerprint: params.startupEnvApiKeyCacheKey,
							appServerVersion: activeStartupClient.getServerVersion(),
							runtimeIdentity: startupRuntimeIdentity
						});
						const appServerRuntimeFingerprint = buildCodexAppServerRuntimeFingerprint({
							appServer: params.appServer,
							appServerVersion: activeStartupClient.getServerVersion(),
							runtimeIdentity: startupRuntimeIdentity
						});
						const pluginThreadConfigInputFingerprint = pluginThreadConfigRequired ? buildCodexPluginThreadConfigInputFingerprint({
							pluginConfig: pluginThreadConfigPluginConfig,
							appCacheKey: pluginAppCacheKey
						}) : void 0;
						log.debug("codex plugin thread config eligibility", buildCodexPluginThreadConfigEligibilityLogData({
							sessionId: attemptParams.sessionId,
							sessionKey: attemptParams.sessionKey ?? "",
							pluginThreadConfigRequired,
							resolvedPluginPolicy,
							enabledPluginConfigKeys,
							pluginAppCacheKey,
							startupAuthProfileId: startupRuntimeAuthProfileId,
							appServer: params.appServer
						}));
						let startupSandboxEnvironment;
						let startupSandboxEnvironmentAcquired = false;
						const releaseStartupSandboxEnvironment = async () => {
							if (startupSandboxEnvironmentAcquired) {
								startupSandboxEnvironmentAcquired = false;
								await releaseCodexSandboxExecServerEnvironment(params.sandbox);
							}
						};
						releaseStartupResourcesOnTimeout = releaseStartupSandboxEnvironment;
						try {
							startupSandboxEnvironment = shouldRequireCodexSandboxExecServerEnvironment({
								sandbox: params.sandbox,
								nativeToolSurfaceEnabled: params.nativeToolSurfaceEnabled,
								sandboxExecServerEnabled: params.sandboxExecServerEnabled
							}) ? await ensureCodexSandboxExecServerEnvironment({
								client: activeStartupClient,
								sandbox: params.sandbox ?? null,
								appServerStartOptions: params.appServer.start,
								timeoutMs: params.appServer.requestTimeoutMs,
								signal: startupAbandonController.signal
							}) : void 0;
							startupSandboxEnvironmentAcquired = Boolean(startupSandboxEnvironment);
							if (startupAbandonController.signal.aborted) {
								await releaseStartupSandboxEnvironment();
								throw new CodexAppServerStartupError("aborted");
							}
							if (params.sandbox?.enabled && params.nativeToolSurfaceEnabled && params.sandboxExecServerEnabled && !startupSandboxEnvironment) throw new Error("Codex app-server did not register an OpenClaw sandbox exec-server environment.");
						} catch (error) {
							await releaseStartupSandboxEnvironment();
							throw error;
						}
						const startupEnvironmentSelection = resolveCodexSandboxEnvironmentSelection(startupSandboxEnvironment, params.nativeToolSurfaceEnabled);
						const startupExecutionCwd = resolveCodexAppServerExecutionCwd({
							effectiveCwd: params.effectiveCwd,
							localWorkspaceRoot: params.effectiveWorkspace,
							environment: startupSandboxEnvironment,
							nativeToolSurfaceEnabled: params.nativeToolSurfaceEnabled,
							remoteWorkspaceRoot: params.appServer.remoteWorkspaceRoot
						});
						const startupSandboxPolicy = startupSandboxEnvironment ? resolveCodexExternalSandboxPolicyForOpenClawSandbox(params.sandbox) : void 0;
						let startupReservation;
						const releaseStartupReservation = () => {
							startupReservation?.release();
							startupReservation = void 0;
						};
						const reserveStartupThread = (threadId) => {
							if (startupReservation) {
								if (startupReservation.threadId !== threadId) throw new Error(`codex app-server reserved ${startupReservation.threadId} but started ${threadId}`);
								return { release: releaseStartupReservation };
							}
							startupReservation = turnRouter.reserveThread({ threadId });
							return { release: releaseStartupReservation };
						};
						const releaseStartupResources = async () => {
							releaseStartupReservation();
							await releaseStartupSandboxEnvironment();
						};
						releaseStartupResourcesOnTimeout = releaseStartupResources;
						const buildThreadLifecycleParams = (signal, reserveResumeThread) => ({
							client: activeStartupClient,
							reserveResumeThread,
							bindingStore: params.bindingStore,
							params: params.buildAttemptParams(),
							agentId: params.sessionAgentId,
							cwd: startupExecutionCwd,
							dynamicTools: params.dynamicTools,
							persistentWebSearchAllowed: params.persistentWebSearchAllowed,
							webSearchAllowed: params.webSearchAllowed,
							appServer: pluginAppServer,
							developerInstructions: params.developerInstructions,
							config: threadConfig,
							finalConfigPatch: params.finalConfigPatch,
							buildFinalConfigPatch: params.buildFinalConfigPatch,
							nativeHookRelayGeneration: params.nativeHookRelayGeneration,
							nativeCodeModeEnabled: params.nativeToolSurfaceEnabled,
							nativeProviderWebSearchSupport: params.nativeProviderWebSearchSupport,
							nativeCodeModeOnlyEnabled: params.appServer.codeModeOnly,
							userMcpServersEnabled: params.nativeToolSurfaceEnabled,
							mcpServersFingerprint: params.bundleMcpThreadConfig.fingerprint,
							mcpServersFingerprintEvaluated: params.bundleMcpThreadConfig.evaluated,
							environmentSelection: startupEnvironmentSelection,
							appServerRuntimeFingerprint,
							contextEngineProjection: params.contextEngineProjection,
							signal,
							pluginThreadConfig: pluginThreadConfigRequired ? createCodexPluginThreadConfigStartupProvider({
								inputFingerprint: pluginThreadConfigInputFingerprint,
								enabledPluginConfigKeys,
								policy: resolvedPluginPolicy,
								requestTimeoutMs: params.appServer.requestTimeoutMs,
								signal,
								pluginConfig: pluginThreadConfigPluginConfig,
								client: activeStartupClient,
								configCwd: startupExecutionCwd,
								appCacheKey: pluginAppCacheKey
							}) : void 0
						});
						try {
							const startupThread = await startOrResumeThread(buildThreadLifecycleParams(startupAbandonController.signal, reserveStartupThread));
							try {
								reserveStartupThread(startupThread.threadId);
							} catch (error) {
								if (!await unsubscribeCodexThreadBestEffort(activeStartupClient, {
									threadId: startupThread.threadId,
									timeoutMs: 5e3
								})) throw new CodexAppServerUnsafeSubscriptionError("Codex startup subscription cleanup failed", { cause: error });
								throw error;
							}
							if (startupAbandonController.signal.aborted) throw new CodexAppServerStartupError("aborted");
							const startupRoute = startupReservation;
							if (!startupRoute) throw new Error("codex app-server startup did not reserve its thread route");
							startupSandboxEnvironmentAcquired = false;
							startCodexComputerUseHealthMonitor({
								client: activeStartupClient,
								config: params.computerUseConfig
							});
							startupAttemptSucceeded = true;
							return {
								client: activeStartupClient,
								turnRouter,
								turnRoute: startupRoute,
								thread: startupThread,
								sandboxEnvironment: startupSandboxEnvironment,
								environmentSelection: startupEnvironmentSelection,
								executionCwd: startupExecutionCwd,
								sandboxPolicy: startupSandboxPolicy,
								...runtimeArtifact ? { runtimeArtifact } : {},
								restartContextEngineCodexThread: async () => {
									try {
										return await startOrResumeThread(buildThreadLifecycleParams(params.signal));
									} catch (error) {
										if (!isCodexAppServerStartSelectionChangedError(error)) throw error;
										retireSharedCodexAppServerClientIfCurrent(activeStartupClient);
										throw Object.assign(new Error("codex app-server client is closed", { cause: error }), { code: CODEX_APP_SERVER_CONTEXT_RESTART_SELECTION_CHANGED });
									}
								}
							};
						} catch (error) {
							await releaseStartupResources();
							throw error;
						} finally {
							if (releaseStartupResourcesOnTimeout === releaseStartupResources) releaseStartupResourcesOnTimeout = void 0;
						}
					} catch (error) {
						startupAttemptError = error;
						if (!startupAbandoned && !params.signal.aborted && !startupClient) {
							const sharedClient = clearSharedCodexAppServerClientIfCurrentAndUnclaimed(startupClientForAbandonedRequestCleanup);
							if (sharedClient.found && !sharedClient.closed) startupClientForAbandonedRequestCleanup = void 0;
						}
						throw error;
					} finally {
						if (!startupAttemptSucceeded) {
							if (releaseSharedClientLease === startupClientLease) releaseSharedClientLease = void 0;
							startupClientLease?.();
							if (startupAbandoned || params.signal.aborted) {
								if (startupClientForAbandonedRequestCleanup === startupClient) startupClientForAbandonedRequestCleanup = void 0;
								await closeCodexStartupClientBestEffort(startupClient);
							} else if (!isCodexAppServerStartSelectionChangedError(startupAttemptError) && (shouldClearSharedClientAfterStartupRace(startupAttemptError) || shouldClearSharedClientAfterStartupFailure({
								error: startupAttemptError,
								spawnedBy: params.spawnedBy
							}))) {
								if (startupClientForAbandonedRequestCleanup === startupClient) startupClientForAbandonedRequestCleanup = void 0;
								await closeCodexStartupClientBestEffort(startupClient);
							}
						}
					}
				};
				for (let attempt = 1; attempt <= CODEX_APP_SERVER_STARTUP_CONNECTION_CLOSE_MAX_ATTEMPTS; attempt += 1) try {
					return await startupAttempt();
				} catch (error) {
					const selectionChanged = isCodexAppServerStartSelectionChangedError(error);
					if (startupAbandoned || params.signal.aborted || !selectionChanged && !isCodexAppServerConnectionClosedError(error)) throw error;
					const failedClient = attemptedClient;
					const refreshedSharedClient = selectionChanged ? retireSharedCodexAppServerClientIfCurrent(failedClient) : clearSharedCodexAppServerClientIfCurrent(failedClient);
					if (startupClientForAbandonedRequestCleanup === failedClient) startupClientForAbandonedRequestCleanup = void 0;
					if (attempt >= CODEX_APP_SERVER_STARTUP_CONNECTION_CLOSE_MAX_ATTEMPTS) {
						log.warn(selectionChanged ? "codex app-server executable selection kept changing during startup; retries exhausted" : "codex app-server connection closed during startup; retries exhausted", {
							attempt,
							maxAttempts: CODEX_APP_SERVER_STARTUP_CONNECTION_CLOSE_MAX_ATTEMPTS,
							refreshedSharedClient,
							error: formatErrorMessage(error)
						});
						throw error;
					}
					log.warn(selectionChanged ? "codex app-server executable selection changed during startup; restarting app-server and retrying" : "codex app-server connection closed during startup; restarting app-server and retrying", {
						attempt,
						nextAttempt: attempt + 1,
						maxAttempts: CODEX_APP_SERVER_STARTUP_CONNECTION_CLOSE_MAX_ATTEMPTS,
						refreshedSharedClient,
						error: formatErrorMessage(error)
					});
				}
				throw new Error("codex app-server startup retry loop exited unexpectedly");
			}
		});
		startupClientForAbandonedRequestCleanup = void 0;
		if (!releaseSharedClientLease) throw new Error("codex app-server startup succeeded without a shared client lease");
		return {
			...startupResult,
			pluginAppServer,
			releaseSharedClientLease
		};
	} catch (error) {
		if (params.signal.aborted || shouldClearSharedClientAfterStartupAbandon(error)) {
			releaseSharedClientLease?.();
			releaseSharedClientLease = void 0;
			await closeCodexStartupClientBestEffort(startupClientForAbandonedRequestCleanup);
			startupClientForAbandonedRequestCleanup = void 0;
		} else if (!isCodexAppServerStartSelectionChangedError(error) && (shouldClearSharedClientAfterStartupRace(error) || shouldClearSharedClientAfterStartupFailure({
			error,
			spawnedBy: params.spawnedBy
		}))) {
			releaseSharedClientLease?.();
			releaseSharedClientLease = void 0;
			await closeCodexStartupClientBestEffort(startupClientForAbandonedRequestCleanup);
			startupClientForAbandonedRequestCleanup = void 0;
		}
		throw error;
	} finally {
		params.signal.removeEventListener("abort", abandonStartupAcquire);
	}
}
function shouldClearSharedClientAfterStartupAbandon(error) {
	return isCodexAppServerStartupError(error);
}
function shouldClearSharedClientAfterStartupRace(error) {
	return shouldClearSharedClientAfterStartupAbandon(error) || isCodexAppServerRequestTimeoutError(error);
}
function shouldClearSharedClientAfterStartupFailure(params) {
	if (!(params.error instanceof Error)) return !params.spawnedBy;
	if (isCodexAppServerBrokenPipeError(params.error)) return true;
	return !params.spawnedBy;
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-start.ts
async function startCodexAttemptRuntime(resources) {
	const { prompt, state, trajectoryRecorder, activateNativePreToolUseFailureFallback, releaseSandboxExecEnvironment, releaseSharedClientLeaseOnce, releaseCurrentRoute, startupTimeoutMs, buildNativeHookRelayFinalConfigPatch } = resources;
	const { context, turnState, buildRenderedCodexDeveloperInstructions, rebuildCodexTurnPromptTextFromCurrentProjection, applyNoContextEngineContinuityProjection } = prompt;
	const { runtime, attemptTools, promptState } = context;
	const { connection, runtimeParams, preparedAuthBinding, buildActiveRunAttemptParams, startupAuthAccountCacheKey, startupEnvApiKeyCacheKey, bundleMcpThreadConfig, nativeToolSurfaceEnabled, nativeProviderWebSearchSupport, sandboxExecServerEnabled } = runtime;
	const { toolBridge, toolState } = attemptTools;
	const { params, attemptClientFactory, bindingStore, appServer, pluginConfig, computerUseConfig, startupClientAuthProfileId, runtimeArtifactRequest, startupPreparedAuth, agentDir, sessionAgentId, effectiveWorkspace, effectiveCwd, sandbox, runAbortController, usesSupervisionConnection, resolveReviewerPolicyContext, resolveRuntimeOptionsForCurrentBinding, startupAuthProfileId, startupAuthRequirement, abortFromUpstream } = connection;
	let pluginAppServer = withCodexAppServerFastModeServiceTier(appServer, runtimeParams);
	try {
		emitCodexAppServerEvent(params, {
			stream: "codex_app_server.lifecycle",
			data: { phase: "startup" }
		});
		const startupResult = await startCodexAttemptThread({
			attemptClientFactory,
			bindingStore,
			appServer: pluginAppServer,
			pluginConfig,
			computerUseConfig,
			startupAuthProfileId: startupClientAuthProfileId,
			startupAuthRequirement,
			startupAuthBindingFingerprint: preparedAuthBinding?.fingerprint,
			...runtimeArtifactRequest ? { runtimeArtifactRequest } : {},
			startupPreparedAuth,
			startupAuthAccountCacheKey,
			startupEnvApiKeyCacheKey,
			agentDir,
			config: params.config,
			buildAttemptParams: buildActiveRunAttemptParams,
			sessionAgentId,
			effectiveWorkspace,
			effectiveCwd,
			dynamicTools: toolBridge.specs,
			persistentWebSearchAllowed: toolState.persistentWebSearchAllowed,
			webSearchAllowed: toolState.webSearchAllowed,
			developerInstructions: turnState.promptBuild.developerInstructions,
			buildFinalConfigPatch: buildNativeHookRelayFinalConfigPatch,
			bundleMcpThreadConfig,
			nativeToolSurfaceEnabled,
			nativeProviderWebSearchSupport,
			sandboxExecServerEnabled,
			sandbox,
			contextEngineProjection: promptState.contextEngineProjection,
			startupTimeoutMs,
			signal: runAbortController.signal,
			onStartupTimeout: () => runAbortController.abort("codex_startup_timeout"),
			spawnedBy: params.spawnedBy
		});
		state.client = startupResult.client;
		toolBridge.setRemoteWorkspaceFileReader?.(({ path, maxBytes, workspaceRoot, signal, timeoutMs }) => readBoundedCodexRemoteWorkspaceFile({
			client: startupResult.client,
			path,
			maxBytes,
			workspaceRoot,
			signal,
			timeoutMs
		}));
		state.thread = startupResult.thread;
		state.runtimeArtifact = startupResult.runtimeArtifact;
		state.turnRouter = startupResult.turnRouter;
		state.turnRoute = startupResult.turnRoute;
		state.sandboxExecEnvironmentAcquired = Boolean(startupResult.sandboxEnvironment);
		state.releaseSharedClientLease = startupResult.releaseSharedClientLease;
		state.restartContextEngineCodexThread = startupResult.restartContextEngineCodexThread;
		pluginAppServer = startupResult.pluginAppServer;
		if (usesSupervisionConnection && (state.thread.connectionScope !== "supervision" || state.thread.supervisionSourceThreadId !== connection.mutable.startupBinding?.supervisionSourceThreadId)) throw new Error("Codex supervised thread lost its private connection ownership");
		if (state.thread.lifecycle.action === "started" || state.thread.lifecycle.action === "forked") {
			const activePolicy = resolveReviewerPolicyContext(state.thread);
			const activeAppServer = resolveCodexAppServerForModelProvider({
				appServer: resolveRuntimeOptionsForCurrentBinding({
					modelProvider: activePolicy.modelProvider,
					model: activePolicy.model
				}),
				provider: activePolicy.modelProvider,
				model: activePolicy.model,
				config: params.config,
				env: process.env,
				agentDir
			});
			const previousReviewer = pluginAppServer.approvalsReviewer;
			pluginAppServer = {
				...pluginAppServer,
				approvalsReviewer: activeAppServer.approvalsReviewer
			};
			if (pluginAppServer.approvalsReviewer !== previousReviewer) log.info("codex app-server approval reviewer updated from active thread model provider", {
				from: previousReviewer,
				to: pluginAppServer.approvalsReviewer,
				modelProvider: activePolicy.modelProvider
			});
		}
		state.codexEnvironmentSelection = startupResult.environmentSelection;
		state.codexExecutionCwd = startupResult.executionCwd;
		state.codexSandboxPolicy = startupResult.sandboxPolicy;
		emitCodexAppServerEvent(params, {
			stream: "codex_app_server.lifecycle",
			data: {
				phase: "thread_ready",
				threadId: state.thread.threadId,
				action: state.thread.lifecycle.action,
				clientId: state.client.getInstanceId()
			}
		});
	} catch (error) {
		activateNativePreToolUseFailureFallback();
		releaseCurrentRoute();
		state.nativeHookRelay?.unregister();
		await releaseSandboxExecEnvironment();
		releaseSharedClientLeaseOnce();
		params.abortSignal?.removeEventListener("abort", abortFromUpstream);
		throw error;
	}
	if (applyNoContextEngineContinuityProjection(state.thread.lifecycle.action, state.thread)) await rebuildCodexTurnPromptTextFromCurrentProjection();
	trajectoryRecorder?.recordEvent("session.started", {
		sessionFile: params.sessionFile,
		threadId: state.thread.threadId,
		authProfileId: startupAuthProfileId,
		workspaceDir: effectiveWorkspace,
		toolCount: flattenCodexDynamicToolFunctions(toolBridge.specs).length
	});
	recordCodexTrajectoryContext(trajectoryRecorder, {
		attempt: params,
		cwd: effectiveCwd,
		developerInstructions: buildRenderedCodexDeveloperInstructions(),
		prompt: turnState.codexTurnPromptText,
		tools: toolBridge.availableSpecs
	});
	connection.mutable.pluginAppServer = pluginAppServer;
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-tool-setup.ts
async function prepareCodexAttemptTools(runtime) {
	const { connection, bundleMcpThreadConfig, runtimeParams, effectiveRuntimeModelId, nativeToolSurfaceEnabled, nativeProviderWebSearchSupport, hookChannelId } = runtime;
	const { params, preDynamicStartupStages, mutable, startupAuthProfileId, resolvedWorkspace, effectiveWorkspace, effectiveCwd, sandboxSessionKey, sandbox, runAbortController, sessionAgentId, pluginConfig, profilerEnabled, agentDir } = connection;
	const preDynamicSummary = preDynamicStartupStages.snapshot();
	if (shouldWarnCodexDynamicToolBuildStageSummary(preDynamicSummary)) log.warn(`codex app-server pre-dynamic startup timings runId=${params.runId} sessionId=${params.sessionId} totalMs=${preDynamicSummary.totalMs} stages=${formatCodexDynamicToolBuildStageSummary(preDynamicSummary)}`, {
		runId: params.runId,
		sessionId: params.sessionId,
		totalMs: preDynamicSummary.totalMs,
		stages: preDynamicSummary.stages,
		hasStartupBinding: Boolean(mutable.startupBinding?.threadId),
		startupAuthProfileId: startupAuthProfileId ?? null,
		bundleMcpDiagnosticCount: bundleMcpThreadConfig.diagnostics.length,
		nativeToolSurfaceEnabled
	});
	const toolState = {
		yieldDetected: false,
		persistentWebSearchAllowed: void 0,
		webSearchAllowed: false
	};
	const toolOutcomeOrdinals = /* @__PURE__ */ new Map();
	const suppressedDynamicToolOutcomeOrdinals = /* @__PURE__ */ new Set();
	const onCodexToolOutcome = params.onToolOutcome ? (observation) => {
		if (observation.toolCallOrdinal !== void 0 && suppressedDynamicToolOutcomeOrdinals.has(observation.toolCallOrdinal)) return;
		params.onToolOutcome?.(observation);
	} : void 0;
	const baseAllocateToolOutcomeOrdinal = params.allocateToolOutcomeOrdinal;
	const allocateCodexToolOutcomeOrdinal = baseAllocateToolOutcomeOrdinal ? (toolCallId) => {
		const reservedOrdinal = toolCallId ? toolOutcomeOrdinals.get(toolCallId) : void 0;
		if (reservedOrdinal !== void 0) return reservedOrdinal;
		const ordinal = baseAllocateToolOutcomeOrdinal(toolCallId);
		if (toolCallId) toolOutcomeOrdinals.set(toolCallId, ordinal);
		return ordinal;
	} : void 0;
	const dynamicToolParams = allocateCodexToolOutcomeOrdinal || onCodexToolOutcome ? {
		...runtimeParams,
		...allocateCodexToolOutcomeOrdinal ? { allocateToolOutcomeOrdinal: allocateCodexToolOutcomeOrdinal } : {},
		...onCodexToolOutcome ? { onToolOutcome: onCodexToolOutcome } : {}
	} : runtimeParams;
	const computerContextEpoch = { value: 0 };
	const commonToolParams = {
		params: dynamicToolParams,
		resolvedWorkspace,
		effectiveWorkspace,
		effectiveCwd,
		sandboxSessionKey,
		sandbox,
		nativeToolSurfaceEnabled,
		nativeProviderWebSearchSupport,
		runAbortController,
		sessionAgentId,
		pluginConfig,
		profilerEnabled,
		onYieldDetected: () => {
			toolState.yieldDetected = true;
		},
		onCodexAppServerEvent: (event) => {
			emitCodexAppServerEvent(params, event);
		},
		computerContextEpoch
	};
	const tools = await buildDynamicTools({
		...commonToolParams,
		onPersistentWebSearchPolicyResolved: (allowed) => {
			toolState.persistentWebSearchAllowed = allowed;
		},
		onWebSearchPolicyResolved: (allowed) => {
			toolState.webSearchAllowed = allowed;
		}
	});
	const registeredTools = await buildDynamicTools({
		...commonToolParams,
		forceHeartbeatTool: true,
		ignoreDisableMessageTool: true,
		ignoreRuntimePlan: true
	});
	const scopedMcpTools = await materializeRequesterScopedMcpToolsForHarnessRun({
		sessionId: params.sessionId,
		sessionKey: params.sessionKey,
		workspaceDir: effectiveWorkspace,
		agentDir: agentDir ?? resolveAgentDir(params.config ?? {}, sessionAgentId),
		cfg: params.config,
		requesterSenderId: params.senderId,
		agentAccountId: params.agentAccountId,
		messageChannel: params.messageChannel ?? params.messageProvider,
		reservedToolNames: [...tools.map((tool) => tool.name), ...registeredTools.map((tool) => tool.name)],
		toolsAllow: params.toolsAllow,
		policyContext: {
			config: params.config,
			sessionKey: sandboxSessionKey,
			runSessionKey: params.sessionKey && params.sessionKey !== sandboxSessionKey ? params.sessionKey : void 0,
			sessionId: params.sessionId,
			runId: params.runId,
			agentId: sessionAgentId,
			agentDir: agentDir ?? resolveAgentDir(params.config ?? {}, sessionAgentId),
			agentAccountId: params.agentAccountId,
			messageProvider: params.messageProvider ?? params.messageChannel,
			messageChannel: params.messageChannel,
			chatType: params.chatType,
			messageTo: params.messageTo,
			messageThreadId: params.messageThreadId,
			currentChannelId: params.currentChannelId,
			currentMessagingTarget: params.currentMessagingTarget,
			currentThreadTs: params.currentThreadTs,
			currentMessageId: params.currentMessageId,
			groupId: params.groupId,
			groupChannel: params.groupChannel,
			groupSpace: params.groupSpace,
			memberRoleIds: params.memberRoleIds,
			spawnedBy: params.spawnedBy,
			senderId: params.senderId,
			senderName: params.senderName,
			senderUsername: params.senderUsername,
			senderE164: params.senderE164,
			senderIsOwner: params.senderIsOwner,
			modelProvider: params.provider,
			modelId: params.modelId,
			modelApi: params.model.api,
			modelContextWindowTokens: params.model.contextWindow,
			modelHasVision: params.model.input?.includes("image") ?? false,
			workspaceDir: effectiveWorkspace,
			cwd: effectiveCwd ?? effectiveWorkspace,
			sandboxToolPolicy: sandbox?.tools
		},
		warn: (message) => log.warn(message)
	});
	const scopedExecutable = scopedMcpTools ? filterCodexDynamicTools(scopedMcpTools.tools, pluginConfig) : [];
	const scopedAdvertised = scopedMcpTools ? filterCodexDynamicTools(scopedMcpTools.advertisedTools, pluginConfig) : [];
	const toolsWithScopedMcp = scopedExecutable.length > 0 ? [...tools, ...scopedExecutable] : tools;
	const registeredWithScopedMcp = scopedAdvertised.length > 0 ? [...registeredTools, ...scopedAdvertised] : registeredTools;
	return {
		tools: toolsWithScopedMcp,
		registeredTools: registeredWithScopedMcp,
		scopedMcpTools,
		dynamicToolParams,
		computerContextEpoch,
		toolBridge: createCodexDynamicToolBridge({
			tools: toolsWithScopedMcp,
			registeredTools: registeredWithScopedMcp,
			signal: runAbortController.signal,
			computerContextEpoch,
			loading: resolveCodexDynamicToolsLoadingForRuntime(pluginConfig, effectiveRuntimeModelId, { connectionClass: connection.appServer.connectionClass }),
			directToolNames: resolveCodexDynamicToolDirectNames(params, isHostScopedAgentToolActive("openclaw")),
			hookContext: {
				agentId: sessionAgentId,
				config: params.config,
				contextWindowTokens: params.contextTokenBudget ?? params.model.contextWindow,
				workspaceDir: effectiveWorkspace,
				remoteWorkspaceRoot: connection.appServer.remoteWorkspaceRoot,
				remoteWorkspaceRequestTimeoutMs: connection.appServer.requestTimeoutMs,
				sessionId: params.sessionId,
				sessionKey: sandboxSessionKey,
				runId: params.runId,
				channelId: hookChannelId,
				currentChannelProvider: resolveCodexMessageToolProvider(params),
				currentChannelId: params.currentChannelId,
				currentMessagingTarget: params.currentMessagingTarget,
				currentMessageId: params.currentMessageId,
				currentThreadId: params.currentThreadTs,
				replyToMode: params.replyToMode,
				hasRepliedRef: params.hasRepliedRef,
				sourceReplyDeliveryMode: params.sourceReplyDeliveryMode,
				onToolOutcome: onCodexToolOutcome,
				allocateToolOutcomeOrdinal: allocateCodexToolOutcomeOrdinal
			}
		}),
		toolState,
		toolOutcomeOrdinals,
		suppressedDynamicToolOutcomeOrdinals,
		onCodexToolOutcome,
		allocateCodexToolOutcomeOrdinal
	};
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-turn-request.ts
async function prepareCodexAttemptTurnRequest(resources, turnRuntime, ensureCurrentThreadRoute, waitForActiveNativeTurnCompletion) {
	const { prompt, state: resourceState, releaseCurrentRoute } = resources;
	const { context, turnState, buildRenderedCodexDeveloperInstructions } = prompt;
	const { runtime, attemptTools, hookContextWindowFields, workspaceBootstrapContext } = context;
	const { connection, runtimeParams, effectiveRuntimeProviderId, effectiveRuntimeModelId } = runtime;
	const { tools } = attemptTools;
	const { params, usesSupervisionConnection, codexModelCallId, codexModelCallTrace, codexModelContentCapture, appServer, runAbortController } = connection;
	const { state } = turnRuntime;
	const buildCodexModelInputMessages = () => [...prompt.codexModelInputHistoryMessages, buildCodexUserPromptMessage({
		...runtimeParams,
		prompt: turnState.codexTurnPromptText
	})];
	const codexModelCallDiagnostics = createCodexModelCallDiagnosticEmitter({
		baseFields: {
			runId: params.runId,
			callId: codexModelCallId,
			...params.sessionKey ? { sessionKey: params.sessionKey } : {},
			sessionId: params.sessionId,
			provider: usesSupervisionConnection ? resourceState.thread.modelProvider ?? effectiveRuntimeProviderId : params.provider,
			model: usesSupervisionConnection ? resourceState.thread.model ?? effectiveRuntimeModelId : params.modelId,
			api: usesSupervisionConnection ? runtimeParams.model.api : params.model.api,
			transport: appServer.start.transport,
			observationUnit: "turn",
			...hookContextWindowFields,
			trace: codexModelCallTrace
		},
		capture: codexModelContentCapture,
		tools,
		buildInputMessages: buildCodexModelInputMessages,
		buildSystemPrompt: buildRenderedCodexDeveloperInstructions,
		onErrorDiagnostic: (error) => {
			log.debug("codex app-server model call diagnostic ended with error", { error: formatErrorMessage(error) });
		}
	});
	const throwIfTurnStartAcceptedAfterAbort = () => {
		if (!runAbortController.signal.aborted) return;
		const reason = runAbortController.signal.reason;
		if (reason instanceof Error) throw reason;
		const error = new Error(typeof reason === "string" && reason.length > 0 ? reason : "codex app-server turn start aborted before acceptance");
		error.name = "AbortError";
		throw error;
	};
	const startCodexTurn = async () => {
		const activeTurnRoute = await ensureCurrentThreadRoute();
		const turnAppServer = withCodexAppServerFastModeServiceTier(connection.mutable.pluginAppServer, runtimeParams);
		connection.mutable.pluginAppServer = turnAppServer;
		const turnStartParams = buildTurnStartParams(runtimeParams, {
			threadId: resourceState.thread.threadId,
			cwd: resourceState.codexExecutionCwd,
			appServer: turnAppServer,
			promptText: turnState.codexTurnPromptText,
			sandboxPolicy: resourceState.codexSandboxPolicy,
			environmentSelection: resourceState.codexEnvironmentSelection,
			...usesSupervisionConnection ? {} : {
				model: resourceState.thread.model,
				modelProvider: resourceState.thread.modelProvider
			},
			turnScopedDeveloperInstructions: workspaceBootstrapContext.turnScopedDeveloperInstructions,
			skillsCollaborationInstructions: context.skillsCollaborationInstructions,
			memoryCollaborationInstructions: workspaceBootstrapContext.memoryCollaborationInstructions,
			preserveNativeTurnSettings: usesSupervisionConnection
		});
		codexModelCallDiagnostics.setRequestPayloadBytes(utf8JsonByteLength(turnStartParams));
		state.latestStartupErrorNotification = void 0;
		state.rateLimitsRevisionBeforeLastTurnStart = readCodexRateLimitsRevision(resourceState.client);
		activeTurnRoute.armTurn();
		emitCodexAppServerEvent(params, {
			stream: "codex_app_server.lifecycle",
			data: {
				phase: "turn_starting",
				threadId: resourceState.thread.threadId,
				model: turnStartParams.model,
				effort: turnStartParams.effort,
				collaborationEffort: turnStartParams.collaborationMode?.settings.reasoning_effort
			}
		});
		let acceptedTurnId;
		try {
			const startedTurn = assertCodexTurnStartResponse(await resourceState.client.request("turn/start", turnStartParams, {
				timeoutMs: params.timeoutMs,
				signal: runAbortController.signal
			}));
			acceptedTurnId = startedTurn.turn.id;
			throwIfTurnStartAcceptedAfterAbort();
			return startedTurn;
		} catch (error) {
			if (acceptedTurnId || isCodexAppServerIndeterminateRequestCancellationError(error)) try {
				resourceState.startupClientUnsafe = !await interruptCodexTurnAndWaitBestEffort(resourceState.client, {
					threadId: resourceState.thread.threadId,
					turnId: acceptedTurnId ?? ""
				});
				if (resourceState.startupClientUnsafe) await retireUnsafeCodexTurnClientBestEffort(resourceState.client, "startup interrupt");
			} finally {
				releaseCurrentRoute();
			}
			else await activeTurnRoute.cancelTurn();
			throw error;
		}
	};
	if (resourceState.thread.lifecycle.action === "resumed" && (resourceState.thread.lifecycle.activeTurnIds?.length ?? 0) > 0) {
		log.info("codex app-server resumed thread has active native turn; waiting before turn/start", { threadId: resourceState.thread.threadId });
		emitCodexAppServerEvent(params, {
			stream: "codex_app_server.lifecycle",
			data: {
				phase: "turn_start_waiting_for_native_turn",
				threadId: resourceState.thread.threadId
			}
		});
		if (await waitForActiveNativeTurnCompletion()) await resourceState.turnRoute?.drain();
		else if (!runAbortController.signal.aborted) log.warn("codex app-server active native turn did not complete before turn/start wait timed out", { threadId: resourceState.thread.threadId });
	}
	const buildLlmInputEvent = () => ({
		runId: params.runId,
		sessionId: params.sessionId,
		provider: usesSupervisionConnection ? resourceState.thread.modelProvider ?? effectiveRuntimeProviderId : params.provider,
		model: usesSupervisionConnection ? resourceState.thread.model ?? effectiveRuntimeModelId : params.modelId,
		systemPrompt: buildRenderedCodexDeveloperInstructions(),
		prompt: turnState.codexTurnPromptText,
		historyMessages: prompt.codexModelInputHistoryMessages,
		imagesCount: params.images?.length ?? 0,
		tools
	});
	return {
		codexModelCallDiagnostics,
		startCodexTurn,
		buildLlmInputEvent
	};
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-turn-start.ts
async function startCodexAttemptTurn(resources, turnRuntime, notifications, requestRuntime) {
	const { prompt, state: resourceState, trajectoryRecorder, markTrajectoryEndRecorded, activateNativePreToolUseFailureFallback, releaseCurrentRoute, releaseSandboxExecEnvironment, releaseSharedClientLeaseAndRetireOneShotClient } = resources;
	const { context, turnState, systemPromptReport } = prompt;
	const { runtime, historyState, hookContext, hookContextWindowFields, hookRunner } = context;
	const { connection, runtimeParams, effectiveRuntimeProviderId, effectiveRuntimeModelId } = runtime;
	const { params, usesSupervisionConnection, runAbortController, activeContextEngine, bindingStore, bindingIdentity, appServer, attemptStartedAt, startupAuthProfileId, abortFromUpstream } = connection;
	const { state, turnIdRef } = turnRuntime;
	const { waitForActiveNativeTurnCompletion } = notifications;
	const { codexModelCallDiagnostics, startCodexTurn, buildLlmInputEvent } = requestRuntime;
	let turn;
	try {
		codexModelCallDiagnostics.emitStarted();
		runAgentHarnessLlmInputHook({
			event: buildLlmInputEvent(),
			ctx: hookContext,
			hookRunner
		});
		turn = await startCodexTurn();
	} catch (error) {
		let turnStartError = error;
		if (isCodexActiveCompactTurnError(turnStartError)) {
			log.info("codex app-server turn/start blocked by active compact turn; waiting to retry", { threadId: resourceState.thread.threadId });
			if (await waitForActiveNativeTurnCompletion() && !runAbortController.signal.aborted) {
				emitCodexAppServerEvent(params, {
					stream: "codex_app_server.lifecycle",
					data: {
						phase: "turn_start_retry_after_compact",
						threadId: resourceState.thread.threadId
					}
				});
				try {
					turn = await startCodexTurn();
				} catch (retryError) {
					turnStartError = retryError;
				}
			}
		}
		if (turn === void 0 && resourceState.thread.connectionScope !== "supervision" && shouldUseFreshCodexThreadAfterContextEngineOverflow({
			error: turnStartError,
			contextEngineActive: Boolean(activeContextEngine),
			thread: resourceState.thread
		}) && resourceState.restartContextEngineCodexThread) {
			log.warn("codex app-server context-engine turn overflowed on resume; retrying with fresh thread", {
				threadId: resourceState.thread.threadId,
				error: formatErrorMessage(turnStartError)
			});
			try {
				if (!await bindingStore.mutate(bindingIdentity, {
					kind: "clear",
					threadId: resourceState.thread.threadId
				})) log.warn("codex app-server preserved newer context-engine binding after resume overflow; skipping fresh retry", {
					threadId: resourceState.thread.threadId,
					error: formatErrorMessage(turnStartError)
				});
				else {
					resourceState.thread = await resourceState.restartContextEngineCodexThread();
					const retryBinding = await bindingStore.read(bindingIdentity);
					if (retryBinding && retryBinding.threadId === resourceState.thread.threadId && retryBinding.contextEngine?.projection) {
						await bindingStore.mutate(bindingIdentity, {
							kind: "patch",
							threadId: retryBinding.threadId,
							patch: { contextEngine: {
								...retryBinding.contextEngine,
								projection: void 0
							} }
						});
						log.info("codex app-server cleared stale context-engine projection after overflow retry", {
							threadId: resourceState.thread.threadId,
							previousEpoch: retryBinding.contextEngine.projection.epoch
						});
					}
					emitCodexAppServerEvent(params, {
						stream: "codex_app_server.lifecycle",
						data: {
							phase: "thread_ready_retry",
							threadId: resourceState.thread.threadId
						}
					});
					try {
						turn = await startCodexTurn();
					} catch (retryError) {
						turnStartError = retryError;
					}
				}
			} catch (retrySetupError) {
				turnStartError = retrySetupError;
			}
		}
		if (turn === void 0) {
			const usageLimitError = await formatCodexTurnStartUsageLimitError({
				client: resourceState.client,
				error: turnStartError,
				errorNotification: state.latestStartupErrorNotification,
				rateLimitsRevisionBeforeTurnStart: state.rateLimitsRevisionBeforeLastTurnStart,
				timeoutMs: appServer.requestTimeoutMs,
				signal: runAbortController.signal
			});
			const message = usageLimitError?.message ?? formatErrorMessage(turnStartError);
			if (isInvalidCodexImagePayloadError(message)) await clearCodexBindingAfterInvalidImagePayload(bindingStore, bindingIdentity, {
				phase: "turn_start",
				threadId: resourceState.thread.threadId,
				error: message
			});
			emitCodexAppServerEvent(params, {
				stream: "codex_app_server.lifecycle",
				data: {
					phase: "turn_start_failed",
					error: message
				}
			});
			trajectoryRecorder?.recordEvent("session.ended", {
				status: "error",
				threadId: resourceState.thread.threadId,
				timedOut: state.timedOut,
				aborted: runAbortController.signal.aborted,
				promptError: message
			});
			markTrajectoryEndRecorded();
			runAgentHarnessLlmOutputHook({
				event: {
					runId: params.runId,
					sessionId: params.sessionId,
					provider: usesSupervisionConnection ? resourceState.thread.modelProvider ?? effectiveRuntimeProviderId : params.provider,
					model: usesSupervisionConnection ? resourceState.thread.model ?? effectiveRuntimeModelId : params.modelId,
					...hookContextWindowFields,
					resolvedRef: usesSupervisionConnection ? `${resourceState.thread.modelProvider ?? effectiveRuntimeProviderId}/${resourceState.thread.model ?? effectiveRuntimeModelId}` : params.runtimePlan?.observability.resolvedRef ?? `${params.provider}/${params.modelId}`,
					...!usesSupervisionConnection && params.runtimePlan?.observability.harnessId ? { harnessId: params.runtimePlan.observability.harnessId } : {},
					assistantTexts: []
				},
				ctx: hookContext,
				hookRunner
			});
			const failureKind = classifyCodexModelCallFailureKind({
				error: turnStartError,
				timedOut: state.timedOut,
				turnCompletionIdleTimedOut: state.turnCompletionIdleTimedOut,
				runAborted: runAbortController.signal.aborted,
				abortReason: runAbortController.signal.reason,
				clientClosedAbort: state.clientClosedAbort,
				formatError: formatErrorMessage
			});
			codexModelCallDiagnostics.emitError(message, failureKind ? { failureKind } : {});
			const messagesSnapshot = [...historyState.messages, buildCodexUserPromptMessage({
				...runtimeParams,
				prompt: turnState.codexTurnPromptText
			})];
			await runCodexAgentEndHook(params, {
				event: {
					messages: messagesSnapshot,
					success: false,
					error: message,
					durationMs: Date.now() - attemptStartedAt
				},
				ctx: hookContext,
				hookRunner
			});
			const bindingReleased = isIncognitoSessionKey(params.sessionKey) ? await bindingStore.mutate(bindingIdentity, {
				kind: "clear",
				threadId: resourceState.thread.threadId
			}) : true;
			if (!state.timedOut && bindingReleased && !resourceState.startupClientUnsafe) {
				if (!await unsubscribeCodexThreadBestEffort(resourceState.client, {
					threadId: resourceState.thread.threadId,
					timeoutMs: 5e3
				})) await runAgentCleanupStep({
					runId: params.runId,
					sessionId: params.sessionId,
					step: "codex-retire-unsafe-startup-client",
					log,
					cleanup: async () => closeCodexStartupClientBestEffort(resourceState.client)
				});
			}
			releaseCurrentRoute();
			activateNativePreToolUseFailureFallback();
			resourceState.nativeHookRelay?.unregister();
			await releaseSandboxExecEnvironment();
			await runAgentCleanupStep({
				runId: params.runId,
				sessionId: params.sessionId,
				step: "codex-trajectory-flush-startup-failure",
				log,
				cleanup: async () => trajectoryRecorder?.flush()
			});
			params.abortSignal?.removeEventListener("abort", abortFromUpstream);
			await releaseSharedClientLeaseAndRetireOneShotClient();
			if (usageLimitError) {
				await markCodexAuthProfileBlockedFromRateLimits({
					params,
					authProfileId: startupAuthProfileId,
					rateLimits: usageLimitError.rateLimitsForProfile
				});
				return { result: buildCodexTurnStartFailureResult({
					params,
					message: usageLimitError.message,
					promptError: createCodexUsageLimitPromptError(usageLimitError.message),
					messagesSnapshot,
					systemPromptReport
				}) };
			}
			if (isCodexContextRestartSelectionChangedError(turnStartError)) return { result: {
				...buildCodexTurnStartFailureResult({
					params,
					message,
					messagesSnapshot,
					systemPromptReport
				}),
				codexAppServerFailure: {
					kind: "client_closed_before_turn_completed",
					transport: appServer.start.transport,
					threadId: resourceState.thread.threadId,
					replaySafe: true
				}
			} };
			throw turnStartError;
		}
	}
	if (!turn) {
		activateNativePreToolUseFailureFallback();
		await releaseSharedClientLeaseAndRetireOneShotClient();
		throw new Error("codex app-server turn/start failed without an error");
	}
	turnIdRef.current = turn.turn.id;
	return { turn };
}
//#endregion
//#region extensions/codex/src/app-server/attempt-turn-watches.ts
/**
* Idle-watch controller for Codex app-server turn progress, completion, and
* terminal-event gaps.
*/
/**
* Creates a controller that arms/disarms timers as Codex app-server
* notifications and tool handoffs progress.
*/
function createCodexAttemptTurnWatchController(params) {
	const timers = {};
	let completionIdleWatchArmed = false;
	let completionIdleWatchPinnedByTerminalError = false;
	let completionIdleTimeoutOverrideMs;
	let assistantCompletionIdleWatchArmed = false;
	let assistantCompletionLastActivityAt = Date.now();
	let assistantCompletionLastActivityDetails;
	let attemptIdleWatchArmed = false;
	let terminalIdleWatchArmed = false;
	let completionLastActivityAt = Date.now();
	let completionLastActivityReason = "startup";
	let completionLastActivityDetails;
	let attemptIdleTimeoutOverrideMs;
	let attemptLastProgressAt = Date.now();
	let attemptLastProgressReason = "startup";
	let attemptLastProgressDetails;
	const turnCompletionIdleTimeoutMs = resolveTimerTimeoutMs(params.turnCompletionIdleTimeoutMs, 1);
	const turnAssistantCompletionIdleTimeoutMs = resolveTimerTimeoutMs(params.turnAssistantCompletionIdleTimeoutMs, 1);
	const turnAttemptIdleTimeoutMs = resolveTimerTimeoutMs(params.turnAttemptIdleTimeoutMs, 1);
	const turnTerminalIdleTimeoutMs = resolveTimerTimeoutMs(params.turnTerminalIdleTimeoutMs, 1);
	const interruptTimeoutMs = resolveTimerTimeoutMs(params.interruptTimeoutMs, 1);
	const resolveWatchTimeoutMs = (timeoutMs) => resolveTimerTimeoutMs(timeoutMs, 1);
	const clearTimer = (kind) => {
		const timer = timers[kind];
		if (timer) {
			clearTimeout(timer);
			delete timers[kind];
		}
	};
	const clearCompletionIdleTimer = () => clearTimer("completion");
	const clearAllTimers = () => {
		for (const kind of Object.keys(timers)) clearTimer(kind);
	};
	function scheduleWatch(kind, callback, lastActivityAt, timeoutMs, ready) {
		clearTimer(kind);
		if (!ready || params.isCompleted() || params.signal.aborted) return;
		const elapsedMs = Math.max(0, Date.now() - lastActivityAt);
		const timer = setTimeout(callback, Math.max(1, timeoutMs - elapsedMs));
		timer.unref?.();
		timers[kind] = timer;
	}
	function scheduleCompletionIdleWatch() {
		scheduleWatch("completion", fireCompletionIdleTimeout, completionLastActivityAt, completionIdleTimeoutOverrideMs ?? turnCompletionIdleTimeoutMs, completionIdleWatchArmed && params.getActiveAppServerTurnRequests() === 0 && params.getActiveCompletionBlockerItemCount() === 0);
	}
	function scheduleAssistantCompletionIdleWatch() {
		scheduleWatch("assistant", fireAssistantCompletionIdleRelease, assistantCompletionLastActivityAt, turnAssistantCompletionIdleTimeoutMs, assistantCompletionIdleWatchArmed && params.getActiveFinalizationHookCount() === 0);
	}
	function scheduleAttemptIdleWatch() {
		scheduleWatch("attempt", fireAttemptIdleTimeout, attemptLastProgressAt, attemptIdleTimeoutOverrideMs ?? turnAttemptIdleTimeoutMs, attemptIdleWatchArmed);
	}
	function scheduleTerminalIdleWatch() {
		scheduleWatch("terminal", fireTerminalIdleTimeout, completionLastActivityAt, turnTerminalIdleTimeoutMs, terminalIdleWatchArmed && params.getActiveAppServerTurnRequests() === 0);
	}
	function scheduleProgressWatches() {
		scheduleAttemptIdleWatch();
		scheduleCompletionIdleWatch();
		scheduleTerminalIdleWatch();
	}
	function isCompletionIdleTimeoutDueBeforeAttempt(timeoutMs) {
		if (params.isCompleted() || params.isTerminalTurnNotificationQueued() || params.signal.aborted || !completionIdleWatchArmed || params.getActiveAppServerTurnRequests() > 0 || params.getActiveCompletionBlockerItemCount() > 0) return false;
		const completionTimeoutMs = completionIdleTimeoutOverrideMs ?? turnCompletionIdleTimeoutMs;
		if (completionTimeoutMs > timeoutMs) return false;
		return Math.max(0, Date.now() - completionLastActivityAt) >= completionTimeoutMs;
	}
	function recordAttemptProgress(reason, options) {
		attemptIdleTimeoutOverrideMs = options?.attemptTimeoutMs !== void 0 ? resolveWatchTimeoutMs(options.attemptTimeoutMs) : void 0;
		attemptLastProgressAt = completionLastActivityAt;
		attemptLastProgressReason = reason;
		attemptLastProgressDetails = options?.details;
		params.onAttemptProgress(reason, options?.details);
		scheduleAttemptIdleWatch();
	}
	function fireAssistantCompletionIdleRelease() {
		if (params.isCompleted() || params.signal.aborted || !assistantCompletionIdleWatchArmed) return;
		if (params.getActiveAppServerTurnRequests() > 0 || params.getActiveTurnItemCount() > 0 || params.getActiveFinalizationHookCount() > 0) {
			scheduleAssistantCompletionIdleWatch();
			return;
		}
		if (!params.canReleaseAssistantCompletionIdle()) {
			assistantCompletionIdleWatchArmed = false;
			assistantCompletionLastActivityDetails = void 0;
			clearTimer("assistant");
			return;
		}
		const idleMs = Math.max(0, Date.now() - assistantCompletionLastActivityAt);
		if (idleMs < turnAssistantCompletionIdleTimeoutMs) {
			scheduleAssistantCompletionIdleWatch();
			return;
		}
		assistantCompletionIdleWatchArmed = false;
		clearCompletionIdleTimer();
		clearTimer("terminal");
		const turnId = params.getTurnId();
		const fields = {
			threadId: params.threadId,
			turnId,
			idleMs,
			timeoutMs: turnAssistantCompletionIdleTimeoutMs,
			...assistantCompletionLastActivityDetails
		};
		params.onRecordEvent("turn.assistant_completion_idle_release", fields);
		log.warn("codex app-server turn released after completed assistant item without terminal event", fields);
		if (turnId) {
			params.onInterruptTurn({
				threadId: params.threadId,
				turnId,
				timeoutMs: interruptTimeoutMs
			}).finally(params.onCompleted);
			return;
		}
		params.onCompleted();
	}
	function reportTimeout(timeout) {
		params.onTimeout(timeout);
		const fields = {
			threadId: params.threadId,
			turnId: params.getTurnId(),
			idleMs: timeout.idleMs,
			timeoutMs: timeout.timeoutMs,
			lastActivityReason: timeout.lastActivityReason,
			...timeout.details
		};
		params.onRecordEvent(`turn.${timeout.kind}_idle_timeout`, fields);
		log.warn(`codex app-server turn idle timed out waiting for ${timeout.kind === "terminal" ? "terminal event" : timeout.kind}`, fields);
		params.onAbort(`turn_${timeout.kind}_idle_timeout`);
	}
	function fireAttemptIdleTimeout() {
		if (params.isCompleted() || params.signal.aborted || !attemptIdleWatchArmed) return;
		const idleMs = Math.max(0, Date.now() - attemptLastProgressAt);
		const timeoutMs = attemptIdleTimeoutOverrideMs ?? turnAttemptIdleTimeoutMs;
		if (idleMs < timeoutMs) {
			scheduleAttemptIdleWatch();
			return;
		}
		if (isCompletionIdleTimeoutDueBeforeAttempt(timeoutMs)) {
			fireCompletionIdleTimeout();
			return;
		}
		reportTimeout({
			kind: "progress",
			idleMs,
			timeoutMs,
			lastActivityReason: attemptLastProgressReason,
			details: attemptLastProgressDetails
		});
	}
	function fireCompletionIdleTimeout() {
		if (params.isCompleted() || params.isTerminalTurnNotificationQueued() || params.signal.aborted || !completionIdleWatchArmed || params.getActiveAppServerTurnRequests() > 0 || params.getActiveCompletionBlockerItemCount() > 0) return;
		const timeoutMs = completionIdleTimeoutOverrideMs ?? turnCompletionIdleTimeoutMs;
		const idleMs = Math.max(0, Date.now() - completionLastActivityAt);
		if (idleMs < timeoutMs) {
			scheduleCompletionIdleWatch();
			return;
		}
		const details = {
			...completionLastActivityDetails,
			activeAppServerTurnRequests: params.getActiveAppServerTurnRequests(),
			activeTurnItemCount: params.getActiveTurnItemCount(),
			terminalTurnNotificationQueued: params.isTerminalTurnNotificationQueued(),
			completionIdleWatchArmed,
			assistantCompletionIdleWatchArmed,
			terminalIdleWatchArmed
		};
		reportTimeout({
			kind: "completion",
			idleMs,
			timeoutMs,
			lastActivityReason: completionLastActivityReason,
			details
		});
	}
	function fireTerminalIdleTimeout() {
		if (params.isCompleted() || params.isTerminalTurnNotificationQueued() || params.signal.aborted || !terminalIdleWatchArmed || params.getActiveAppServerTurnRequests() > 0) return;
		const idleMs = Math.max(0, Date.now() - completionLastActivityAt);
		if (idleMs < turnTerminalIdleTimeoutMs) {
			scheduleTerminalIdleWatch();
			return;
		}
		reportTimeout({
			kind: "terminal",
			idleMs,
			timeoutMs: turnTerminalIdleTimeoutMs,
			lastActivityReason: completionLastActivityReason,
			details: completionLastActivityDetails
		});
	}
	return {
		isCompletionIdleWatchArmed: () => completionIdleWatchArmed,
		isCompletionIdleWatchPinnedByTerminalError: () => completionIdleWatchPinnedByTerminalError,
		isAssistantCompletionIdleWatchArmed: () => assistantCompletionIdleWatchArmed,
		armAttemptIdleWatch: () => {
			attemptIdleWatchArmed = true;
			scheduleAttemptIdleWatch();
		},
		armTerminalIdleWatch: () => {
			terminalIdleWatchArmed = true;
			scheduleTerminalIdleWatch();
		},
		armCompletionIdleWatch: (options) => {
			completionIdleWatchArmed = true;
			completionIdleWatchPinnedByTerminalError = options?.pinnedByTerminalError === true;
			completionIdleTimeoutOverrideMs = options?.timeoutMs !== void 0 ? resolveWatchTimeoutMs(options.timeoutMs) : void 0;
			scheduleCompletionIdleWatch();
		},
		disarmCompletionIdleWatch: () => {
			completionIdleWatchArmed = false;
			completionIdleWatchPinnedByTerminalError = false;
			completionIdleTimeoutOverrideMs = void 0;
			clearCompletionIdleTimer();
		},
		armAssistantCompletionIdleWatch: (details) => {
			assistantCompletionIdleWatchArmed = true;
			assistantCompletionLastActivityAt = Date.now();
			assistantCompletionLastActivityDetails = details;
			scheduleAssistantCompletionIdleWatch();
		},
		disarmAssistantCompletionIdleWatch: () => {
			assistantCompletionIdleWatchArmed = false;
			assistantCompletionLastActivityDetails = void 0;
			clearTimer("assistant");
		},
		touchActivity: (reason, options) => {
			completionLastActivityAt = Date.now();
			completionLastActivityReason = reason;
			completionLastActivityDetails = options?.details;
			completionIdleTimeoutOverrideMs = void 0;
			if (options?.attemptProgress) recordAttemptProgress(reason, options);
			params.onProgressDiagnostic(reason);
			if (options?.arm) {
				completionIdleWatchArmed = true;
				completionIdleWatchPinnedByTerminalError = false;
			}
			scheduleProgressWatches();
		},
		noteNotificationReceived: (method, options) => {
			const now = Date.now();
			completionLastActivityAt = Math.max(completionLastActivityAt, Math.min(now, options?.receivedAtMs ?? now));
			completionLastActivityReason = `notification:${method}`;
			if (options?.details !== void 0) completionLastActivityDetails = options.details;
			if (options?.attemptProgress) recordAttemptProgress(completionLastActivityReason, options);
		},
		extendAttemptIdleWatch: (timeoutMs) => {
			attemptIdleTimeoutOverrideMs = resolveWatchTimeoutMs(timeoutMs);
			scheduleAttemptIdleWatch();
		},
		scheduleProgressWatches,
		clearCompletionIdleTimer,
		clearAllTimers
	};
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt-turn-state.ts
const CODEX_NATIVE_HOOK_RELAY_RENEW_INTERVAL_MS = 6e4;
function createCodexAttemptTurnState(resources) {
	const { prompt, state: resourceState, projectorRef, trajectoryRecorder, startupTimeoutMs } = resources;
	const { context } = prompt;
	const { connection } = context.runtime;
	const { params, options, appServer, runAbortController } = connection;
	const state = {
		latestStartupErrorNotification: void 0,
		rateLimitsRevisionBeforeLastTurnStart: void 0,
		completed: false,
		localCompletionRequested: false,
		terminalTurnNotificationQueued: false,
		sawCodexInterruptMarker: false,
		timedOut: false,
		turnCompletionIdleTimedOut: false,
		turnWatchTimeoutKind: void 0,
		turnWatchTimeoutIdleMs: void 0,
		turnWatchTimeoutMs: void 0,
		turnWatchTimeoutLastActivityReason: void 0,
		turnWatchTimeoutDetails: void 0,
		turnCompletionIdleTimeoutMessage: void 0,
		clientClosedPromptError: void 0,
		clientClosedDiagnostic: void 0,
		clientClosedAbort: false,
		shouldDelayNativeHookRelayUnregister: false,
		lifecycleStarted: false,
		lifecycleTerminalEmitted: false,
		nativeHookRelayLastRenewedAt: 0,
		activeAppServerTurnRequests: 0,
		unsettledFinalizationHookCount: 0,
		rejectedFinalizationHookAssistant: void 0,
		turnCrossedToolHandoff: false,
		pendingTerminalDynamicToolRelease: void 0,
		terminalDynamicToolReleaseCheckScheduled: false,
		currentTurnHadNonTerminalDynamicToolResult: false
	};
	let resolveCompletion;
	const completion = new Promise((resolve) => {
		resolveCompletion = resolve;
	});
	const turnCompletionIdleTimeoutMs = resolveCodexTurnCompletionIdleTimeoutMs(options.turnCompletionIdleTimeoutMs ?? appServer.turnCompletionIdleTimeoutMs);
	const turnAssistantCompletionIdleTimeoutMs = resolveCodexTurnAssistantCompletionIdleTimeoutMs(options.turnAssistantCompletionIdleTimeoutMs ?? appServer.turnAssistantCompletionIdleTimeoutMs);
	const postToolRawAssistantCompletionIdleTimeoutMs = resolveCodexPostToolRawAssistantCompletionIdleTimeoutMs(options.postToolRawAssistantCompletionIdleTimeoutMs ?? appServer.postToolRawAssistantCompletionIdleTimeoutMs, turnAssistantCompletionIdleTimeoutMs);
	const turnTerminalIdleTimeoutMs = resolveCodexTurnTerminalIdleTimeoutMs(options.turnTerminalIdleTimeoutMs, params.runTimeoutOverrideMs);
	const turnAttemptIdleTimeoutMs = Math.max(100, Math.floor(params.timeoutMs));
	const pendingOpenClawDynamicToolCompletionIds = /* @__PURE__ */ new Set();
	const openClawDynamicToolExecutions = createCodexDynamicToolExecutionRegistry();
	const activeTurnItemIds = /* @__PURE__ */ new Set();
	const activeCompletionBlockerItemIds = /* @__PURE__ */ new Set();
	const activeFinalizationHookRunIds = /* @__PURE__ */ new Set();
	const finalizationHookBatchStatuses = /* @__PURE__ */ new Map();
	const turnIdRef = {};
	const userInputBridgeRef = {};
	const steeringQueueRef = {};
	const completeTurn = () => {
		if (state.completed) return;
		state.completed = true;
		turnWatches.clearAllTimers();
		resolveCompletion();
	};
	const interruptTurn = async (turnId, completionOptions) => {
		if (completionOptions?.locallyCompleted) state.localCompletionRequested = true;
		const completed = await interruptCodexTurnAndWaitBestEffort(resourceState.client, {
			threadId: resourceState.thread.threadId,
			turnId,
			timeoutMs: completionOptions?.timeoutMs
		});
		if (!completed) await closeCodexStartupClientBestEffort(resourceState.client);
		return completed;
	};
	const renewNativeHookRelayForTurnProgress = () => {
		if (!resourceState.nativeHookRelay || options.nativeHookRelay?.ttlMs !== void 0) return;
		const now = Date.now();
		const renewsRecently = now - state.nativeHookRelayLastRenewedAt < CODEX_NATIVE_HOOK_RELAY_RENEW_INTERVAL_MS;
		const expiresSoon = now >= resourceState.nativeHookRelay.expiresAtMs - CODEX_NATIVE_HOOK_RELAY_TTL_GRACE_MS;
		if (renewsRecently && !expiresSoon) return;
		state.nativeHookRelayLastRenewedAt = now;
		resourceState.nativeHookRelay.renew(resolveCodexNativeHookRelayTtlMs({
			explicitTtlMs: void 0,
			attemptTimeoutMs: turnAttemptIdleTimeoutMs,
			startupTimeoutMs,
			turnStartTimeoutMs: params.timeoutMs
		}));
	};
	const turnWatches = createCodexAttemptTurnWatchController({
		threadId: resourceState.thread.threadId,
		signal: runAbortController.signal,
		getTurnId: () => turnIdRef.current,
		isCompleted: () => state.completed,
		isTerminalTurnNotificationQueued: () => state.terminalTurnNotificationQueued,
		getActiveAppServerTurnRequests: () => state.activeAppServerTurnRequests,
		getActiveTurnItemCount: () => activeTurnItemIds.size,
		getActiveCompletionBlockerItemCount: () => activeCompletionBlockerItemIds.size,
		getActiveFinalizationHookCount: () => state.unsettledFinalizationHookCount,
		canReleaseAssistantCompletionIdle: () => projectorRef.current?.hasLatestTerminalAssistantCandidateText() === true,
		turnCompletionIdleTimeoutMs,
		turnAssistantCompletionIdleTimeoutMs,
		turnAttemptIdleTimeoutMs,
		turnTerminalIdleTimeoutMs,
		interruptTimeoutMs: CODEX_APP_SERVER_INTERRUPT_TIMEOUT_MS,
		onInterruptTurn: ({ turnId, timeoutMs }) => interruptTurn(turnId, {
			locallyCompleted: true,
			timeoutMs
		}),
		onTimeout: (timeout) => {
			state.timedOut = true;
			state.turnCompletionIdleTimedOut = true;
			state.turnWatchTimeoutKind = timeout.kind;
			state.turnWatchTimeoutIdleMs = timeout.idleMs;
			state.turnWatchTimeoutMs = timeout.timeoutMs;
			state.turnWatchTimeoutLastActivityReason = timeout.lastActivityReason;
			state.turnWatchTimeoutDetails = timeout.details;
			state.turnCompletionIdleTimeoutMessage = "codex app-server turn idle timed out waiting for turn/completed";
			projectorRef.current?.markTimedOut();
		},
		onAbort: (reason) => runAbortController.abort(reason),
		onCompleted: completeTurn,
		onRecordEvent: (name, fields) => trajectoryRecorder?.recordEvent(name, fields),
		onAttemptProgress: (reason) => {
			renewNativeHookRelayForTurnProgress();
			params.onRunProgress?.({
				reason,
				provider: params.provider,
				model: params.modelId,
				backend: "codex-app-server"
			});
		},
		onProgressDiagnostic: (reason) => {
			emitTrustedDiagnosticEvent({
				type: "run.progress",
				runId: params.runId,
				sessionId: params.sessionId,
				sessionKey: params.sessionKey,
				reason: `codex_app_server:${reason}`
			});
		}
	});
	return {
		state,
		completion,
		turnCompletionIdleTimeoutMs,
		turnAssistantCompletionIdleTimeoutMs,
		postToolRawAssistantCompletionIdleTimeoutMs,
		turnTerminalIdleTimeoutMs,
		turnAttemptIdleTimeoutMs,
		pendingOpenClawDynamicToolCompletionIds,
		openClawDynamicToolExecutions,
		activeTurnItemIds,
		activeCompletionBlockerItemIds,
		activeFinalizationHookRunIds,
		finalizationHookBatchStatuses,
		turnIdRef,
		userInputBridgeRef,
		steeringQueueRef,
		completeTurn,
		interruptTurn,
		renewNativeHookRelayForTurnProgress,
		turnWatches
	};
}
//#endregion
//#region extensions/codex/src/app-server/run-attempt.ts
async function runCodexAppServerAttempt(params, options) {
	const runtime = await prepareCodexAttemptRuntime(await prepareCodexAttemptConnection({
		params,
		options
	}));
	const resources = prepareCodexAttemptResources(await prepareCodexAttemptPrompt(await prepareCodexAttemptContext(runtime, await prepareCodexAttemptTools(runtime))));
	await startCodexAttemptRuntime(resources);
	const turnRuntime = createCodexAttemptTurnState(resources);
	const lifecycle = createCodexAttemptLifecycleController(resources, turnRuntime);
	const notifications = createCodexAttemptNotificationController(resources, turnRuntime, lifecycle);
	const { ensureCurrentThreadRoute } = await prepareCodexAttemptRoute(resources, turnRuntime, notifications, createCodexAttemptServerRequestController(resources, turnRuntime, lifecycle).handleServerRequest);
	const turnRequest = await prepareCodexAttemptTurnRequest(resources, turnRuntime, ensureCurrentThreadRoute, notifications.waitForActiveNativeTurnCompletion);
	const turnStart = await startCodexAttemptTurn(resources, turnRuntime, notifications, turnRequest);
	if ("result" in turnStart) return turnStart.result;
	const activeTurn = await activateCodexAttemptTurn(resources, turnRuntime, lifecycle, notifications, turnStart.turn);
	try {
		return await finalizeCodexAttempt(resources, turnRuntime, lifecycle, notifications, turnRequest, activeTurn);
	} finally {
		await cleanupCodexAttempt(resources, turnRuntime, lifecycle, turnRequest, activeTurn);
	}
}
//#endregion
export { runCodexAppServerAttempt };
