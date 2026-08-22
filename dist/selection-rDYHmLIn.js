import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { E as getActiveDiagnosticTraceContext, S as createDiagnosticTraceContext, T as freezeDiagnosticTraceContext, j as runWithDiagnosticTraceContext, o as emitTrustedDiagnosticEvent, s as emitTrustedDiagnosticEventWithPrivateData, x as createChildDiagnosticTraceContext } from "./diagnostic-events-Dt41CZkD.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { g as isDefaultAgentRuntimeId, v as normalizeOptionalAgentRuntimeId } from "./openai-routing-G4z6ipSe.js";
import { t as resolveAgentHarnessPolicy } from "./policy-BxKGFISr.js";
import { c as mergeAlsoAllowPolicy, h as normalizeToolName, p as expandToolGroups } from "./tool-policy-CrjVfI-s.js";
import { n as getRegisteredAgentHarness, r as listRegisteredAgentHarnesses } from "./registry-BjwLx-0R.js";
import { a as unwrapSecretSentinelsForProviderEgress, i as unwrapModelHeaderSentinelsForProviderEgress } from "./provider-secret-egress-J5B4EL1L.js";
import { f as resolveProviderRefOwnership } from "./providers-CqF04KXu.js";
import { i as isCliRuntimeAliasForProvider } from "./model-runtime-aliases-DphvzCQU.js";
import { n as resolveSandboxRuntimeStatus } from "./runtime-status-BsZayE7D.js";
import { _ as MissingAgentHarnessError, b as recordAgentHarnessPreflightOwner } from "./failover-error-CMC-wGmM.js";
import { d as projectAgentRunAttemptTerminal, u as normalizeAgentRunAttemptTerminal } from "./agent-run-terminal-outcome-Bl2pG_Kc.js";
import { t as resolveAgentHarnessAutoSelectionHint } from "./auto-selection-Cid2o--p.js";
import { c as resolveAgentHarnessPreparedAuthSupport, l as resolveAgentHarnessPreparedRouteSupport, o as buildAgentHarnessSupportContext, s as compareHarnessSupport } from "./thinking-runtime-1FRCPyWR.js";
import { t as createOpenClawAgentHarness } from "./builtin-openclaw-CYuvs_0I.js";
import { r as assertContextEngineHostSupport } from "./host-compat-BibWlia2.js";
import { i as resolveGroupToolPolicy } from "./agent-tools.policy-Bw6_eMDn.js";
import { l as runWithAgentRingZeroTools, s as isHostScopedAgentToolActive } from "./local-model-lean-CeG7_aMD.js";
import { t as resolveConversationCapabilityProfile } from "./conversation-capability-profile-DmJDM--X.js";
import { r as diagnosticErrorMessage, t as diagnosticErrorCategory } from "./diagnostic-error-metadata-CxJn_BAC.js";
import { t as assertSettledTurnFinalizationResult } from "./settled-turn-finalization-result-CnDUUCjr.js";
//#region src/agents/harness/result-classification.ts
/** Applies a harness classifier while replacing any stale prior classification. */
function applyAgentHarnessResultClassification(harness, result, params) {
	if (!harness.classify) return {
		...result,
		agentHarnessId: harness.id
	};
	const { agentHarnessResultClassification: _previousClassification, ...resultWithoutPrevious } = result;
	const classification = harness.classify(resultWithoutPrevious, params);
	if (!classification || classification === "ok") return {
		...resultWithoutPrevious,
		agentHarnessId: harness.id
	};
	return {
		...resultWithoutPrevious,
		agentHarnessId: harness.id,
		agentHarnessResultClassification: classification
	};
}
//#endregion
//#region src/agents/harness/lifecycle.ts
/**
* Agent harness lifecycle diagnostics wrapper.
*
* This module wraps harness attempts with context-engine support checks,
* diagnostic events, trace propagation, and result classification.
*/
function buildAgentHarnessContextEngineHostSupport(harness) {
	return {
		id: `agent-harness:${harness.id}`,
		label: `agent harness "${harness.id}"`,
		capabilities: harness.contextEngineHostCapabilities ?? []
	};
}
function assertAgentHarnessContextEngineSupport(harness, params) {
	if (!params.contextEngine || params.contextEngine.info.id === "legacy") return;
	assertContextEngineHostSupport({
		contextEngine: params.contextEngine,
		operation: "agent-run",
		host: buildAgentHarnessContextEngineHostSupport(harness)
	});
}
function agentHarnessDiagnosticBase(harness, params, trace) {
	const diagnosticTrace = trace ?? getActiveDiagnosticTraceContext();
	const channel = diagnosticChannel(params);
	return {
		runId: params.runId,
		sessionId: params.sessionId,
		provider: params.provider,
		model: params.modelId,
		harnessId: harness.id,
		...harness.pluginId ? { pluginId: harness.pluginId } : {},
		...params.sessionKey ? { sessionKey: params.sessionKey } : {},
		...params.trigger ? { trigger: params.trigger } : {},
		...channel ? { channel } : {},
		...diagnosticTrace ? { trace: freezeDiagnosticTraceContext(diagnosticTrace) } : {}
	};
}
function normalizeAgentHarnessAttemptResult(result) {
	const { aborted, externalAbort, idleTimedOut, promptError, promptErrorSource, timedOut, timedOutByRunBudget, timedOutDuringCompaction, timedOutDuringToolExecution, ...canonical } = result;
	if ("terminal" in canonical) return canonical;
	const terminal = normalizeAgentRunAttemptTerminal({
		aborted,
		externalAbort,
		idleTimedOut,
		promptError,
		promptErrorSource,
		timedOut,
		timedOutByRunBudget,
		timedOutDuringCompaction,
		timedOutDuringToolExecution
	});
	return {
		...canonical,
		terminal
	};
}
function agentHarnessRunOutcome(result) {
	const terminal = projectAgentRunAttemptTerminal(result.terminal);
	if (terminal.timedOut) return "timed_out";
	if (terminal.externalAbort || terminal.aborted) return "aborted";
	if (terminal.promptErrorSource !== null) return "error";
	return "completed";
}
function shouldEmitAgentRunDiagnostics(harness) {
	return harness.id !== "openclaw";
}
function diagnosticChannel(params) {
	return params.messageChannel ?? params.messageProvider;
}
function agentRunDiagnosticBase(params, trace) {
	const channel = diagnosticChannel(params);
	return {
		runId: params.runId,
		...params.sessionKey ? { sessionKey: params.sessionKey } : {},
		...params.sessionId ? { sessionId: params.sessionId } : {},
		provider: params.provider,
		model: params.modelId,
		...params.trigger ? { trigger: params.trigger } : {},
		...channel ? { channel } : {},
		trace
	};
}
function agentRunCompletion(result) {
	const terminal = projectAgentRunAttemptTerminal(result.terminal);
	if (terminal.timedOut || terminal.externalAbort || terminal.aborted) return { outcome: "aborted" };
	if (terminal.promptErrorSource === "hook:before_agent_run") return {
		outcome: "blocked",
		blockedBy: "before_agent_run"
	};
	if (terminal.promptErrorSource !== null) return {
		outcome: "error",
		error: terminal.promptError
	};
	return { outcome: "completed" };
}
function withFallbackDiagnosticTrace(result, trace) {
	if (result.diagnosticTrace || !trace) return result;
	return {
		...result,
		diagnosticTrace: freezeDiagnosticTraceContext(trace)
	};
}
function withFallbackFinalizationDiagnosticTrace(result, trace) {
	if (result.diagnosticTrace || !trace) return result;
	return {
		...result,
		diagnosticTrace: freezeDiagnosticTraceContext(trace)
	};
}
function emitAgentHarnessRunStarted(harness, params, trace) {
	emitTrustedDiagnosticEvent({
		type: "harness.run.started",
		...agentHarnessDiagnosticBase(harness, params, trace)
	});
}
function emitAgentHarnessRunCompleted(params) {
	const { harness, attemptParams, result, startedAt, trace } = params;
	const outcome = agentHarnessRunOutcome(result);
	const terminal = projectAgentRunAttemptTerminal(result.terminal);
	const errorMessage = outcome === "error" ? diagnosticErrorMessage(terminal.promptError) : void 0;
	emitTrustedDiagnosticEventWithPrivateData({
		type: "harness.run.completed",
		...agentHarnessDiagnosticBase(harness, attemptParams, trace ?? result.diagnosticTrace),
		durationMs: Date.now() - startedAt,
		outcome,
		...result.agentHarnessResultClassification ? { resultClassification: result.agentHarnessResultClassification } : {},
		...typeof result.yieldDetected === "boolean" ? { yieldDetected: result.yieldDetected } : {},
		itemLifecycle: { ...result.itemLifecycle }
	}, errorMessage ? { errorMessage } : void 0);
}
function emitAgentHarnessRunError(params) {
	const { harness, attemptParams, startedAt, phase, error, trace } = params;
	const errorMessage = diagnosticErrorMessage(error);
	emitTrustedDiagnosticEventWithPrivateData({
		type: "harness.run.error",
		...agentHarnessDiagnosticBase(harness, attemptParams, trace),
		durationMs: Date.now() - startedAt,
		phase,
		errorCategory: diagnosticErrorCategory(error)
	}, errorMessage ? { errorMessage } : void 0);
}
/** Runs one harness attempt with diagnostics, tracing, and result classification. */
async function runAgentHarnessLifecycleAttempt(harness, params, execute = (attemptParams) => harness.runAttempt(attemptParams)) {
	let result;
	let phase = "prepare";
	const startedAt = Date.now();
	const activeHarnessTrace = getActiveDiagnosticTraceContext();
	let agentRunTrace;
	let agentRunStartedAt = 0;
	let agentRunCompleted = false;
	const emitAgentRunCompleted = (completion) => {
		if (!agentRunTrace || agentRunCompleted) return;
		agentRunCompleted = true;
		const failed = completion.outcome === "error" && completion.error != null;
		const errorMessage = failed ? diagnosticErrorMessage(completion.error) : void 0;
		emitTrustedDiagnosticEventWithPrivateData({
			type: "run.completed",
			...agentRunDiagnosticBase(params, agentRunTrace),
			durationMs: Date.now() - agentRunStartedAt,
			outcome: completion.outcome,
			...completion.blockedBy ? { blockedBy: completion.blockedBy } : {},
			...failed ? { errorCategory: diagnosticErrorCategory(completion.error) } : {}
		}, errorMessage ? { errorMessage } : void 0);
	};
	emitAgentHarnessRunStarted(harness, params, activeHarnessTrace);
	try {
		phase = "prepare";
		assertAgentHarnessContextEngineSupport(harness, params);
		if (shouldEmitAgentRunDiagnostics(harness) && activeHarnessTrace) {
			agentRunTrace = freezeDiagnosticTraceContext(createChildDiagnosticTraceContext(activeHarnessTrace));
			agentRunStartedAt = Date.now();
			emitTrustedDiagnosticEvent({
				type: "run.started",
				...agentRunDiagnosticBase(params, agentRunTrace)
			});
		}
		const runAndClassify = async () => {
			phase = "send";
			const rawResult = await execute(params);
			phase = "resolve";
			return normalizeAgentHarnessAttemptResult(applyAgentHarnessResultClassification(harness, rawResult, params));
		};
		result = agentRunTrace ? await runWithDiagnosticTraceContext(agentRunTrace, runAndClassify) : await runAndClassify();
		result = withFallbackDiagnosticTrace(result, activeHarnessTrace);
	} catch (error) {
		recordAgentHarnessPreflightOwner(error, harness.id);
		emitAgentHarnessRunError({
			harness,
			attemptParams: params,
			startedAt,
			phase,
			error,
			trace: activeHarnessTrace
		});
		emitAgentRunCompleted({
			outcome: "error",
			error
		});
		throw error;
	}
	emitAgentRunCompleted(agentRunCompletion(result));
	emitAgentHarnessRunCompleted({
		harness,
		attemptParams: params,
		result,
		startedAt,
		trace: activeHarnessTrace
	});
	return result;
}
/** Runs one isolated finalization with diagnostics and its narrow result validator. */
async function runAgentHarnessLifecycleFinalization(harness, params, execute) {
	let phase = "prepare";
	const startedAt = Date.now();
	const activeHarnessTrace = getActiveDiagnosticTraceContext();
	const agentRunTrace = shouldEmitAgentRunDiagnostics(harness) && activeHarnessTrace ? freezeDiagnosticTraceContext(createChildDiagnosticTraceContext(activeHarnessTrace)) : void 0;
	emitAgentHarnessRunStarted(harness, params, activeHarnessTrace);
	if (agentRunTrace) emitTrustedDiagnosticEvent({
		type: "run.started",
		...agentRunDiagnosticBase(params, agentRunTrace)
	});
	try {
		const runAndValidate = async () => {
			phase = "send";
			const rawResult = await execute();
			phase = "resolve";
			return assertSettledTurnFinalizationResult(rawResult);
		};
		const result = withFallbackFinalizationDiagnosticTrace(agentRunTrace ? await runWithDiagnosticTraceContext(agentRunTrace, runAndValidate) : await runAndValidate(), activeHarnessTrace);
		if (agentRunTrace) emitTrustedDiagnosticEvent({
			type: "run.completed",
			...agentRunDiagnosticBase(params, agentRunTrace),
			durationMs: Date.now() - startedAt,
			outcome: "completed"
		});
		emitTrustedDiagnosticEvent({
			type: "harness.run.completed",
			...agentHarnessDiagnosticBase(harness, params, result.diagnosticTrace ?? activeHarnessTrace),
			durationMs: Date.now() - startedAt,
			outcome: "completed",
			itemLifecycle: {
				startedCount: 0,
				completedCount: 0,
				activeCount: 0
			}
		});
		return result;
	} catch (error) {
		emitAgentHarnessRunError({
			harness,
			attemptParams: params,
			startedAt,
			phase,
			error,
			trace: activeHarnessTrace
		});
		if (agentRunTrace) {
			const errorMessage = diagnosticErrorMessage(error);
			emitTrustedDiagnosticEventWithPrivateData({
				type: "run.completed",
				...agentRunDiagnosticBase(params, agentRunTrace),
				durationMs: Date.now() - startedAt,
				outcome: "error",
				errorCategory: diagnosticErrorCategory(error)
			}, errorMessage ? { errorMessage } : void 0);
		}
		throw error;
	}
}
//#endregion
//#region src/agents/harness/selection.ts
const log = createSubsystemLogger("agents/harness");
const PLUGIN_HARNESS_SENDER_DENY_ALL_PROMPT = "Tool and file actions are disabled for this sender by chat policy. If asked to edit files or use tools, say this sender is not allowed by policy; do not imply retrying will help.";
const PLUGIN_HARNESS_GROUP_DENY_ALL_PROMPT = "Tool and file actions are disabled for this chat by policy. If asked to edit files or use tools, say this chat is not allowed by policy.";
const PLUGIN_HARNESS_RUNTIME_DENY_ALL_PROMPT = "Tool and file actions are disabled by runtime policy. If asked to edit files or use tools, say tools are disabled by policy.";
function listPluginAgentHarnesses() {
	return listRegisteredAgentHarnesses().map((entry) => entry.harness);
}
function resolveAvailableAgentHarnessPolicy(params) {
	return resolveAgentHarnessAvailabilityDecision(params).policy;
}
function resolveAgentHarnessAvailabilityDecision(params) {
	const policy = resolveAgentHarnessPolicy({
		...params,
		modelApi: params.modelProvider?.api,
		modelBaseUrl: params.modelProvider?.baseUrl,
		requestTransportOverrides: params.modelProvider?.requestTransportOverrides
	});
	if (policy.runtime !== "codex" || policy.runtimeSource !== "implicit") return {
		kind: "available",
		policy
	};
	const codexHarness = getRegisteredAgentHarness("codex");
	if (!codexHarness) return {
		kind: "implicit-unavailable",
		policy: {
			...policy,
			runtime: "openclaw"
		}
	};
	const provider = params.provider?.trim();
	if (!provider) return {
		kind: "available",
		policy
	};
	if (codexHarness.harness.supports(buildAgentHarnessSupportContext({
		provider,
		modelId: params.modelId,
		modelProvider: params.modelProvider,
		requestedRuntime: policy.runtime,
		config: params.config,
		agentId: params.agentId,
		sessionKey: params.sessionKey,
		preparedModelProvider: params.preparedModelProvider
	})).supported) return {
		kind: "available",
		policy
	};
	return {
		kind: "implicit-unsupported",
		policy: {
			...policy,
			runtime: "openclaw"
		}
	};
}
function selectAgentHarness(params) {
	return selectAgentHarnessDecision(params).harness;
}
/** Selects one harness that can preserve every prepared route/auth retry candidate. */
function selectAgentHarnessForPreparedModelProviders(params) {
	const { modelProviders, ...selectionParams } = params;
	if (modelProviders.length === 0) return selectAgentHarness(selectionParams);
	const decisions = modelProviders.map((modelProvider) => selectAgentHarnessDecision({
		...selectionParams,
		modelProvider,
		preparedModelProvider: true
	}));
	const first = decisions[0];
	if (!first || decisions.every((decision) => decision.selectedHarnessId === first.selectedHarnessId)) return first?.harness ?? selectAgentHarness(selectionParams);
	return decisions.find((decision) => decision.selectedHarnessId === "openclaw")?.harness ?? createOpenClawAgentHarness();
}
/** Returns whether a plugin harness constructs OpenClaw tools inside its runtime. */
function agentHarnessBuildsOpenClawTools(harnessId) {
	return harnessId === "codex" || harnessId === "copilot";
}
/** Returns whether the selected harness exposes OpenClaw's agent-tool surface. */
function agentHarnessExposesOpenClawTools(harnessId) {
	return harnessId === "openclaw" || agentHarnessBuildsOpenClawTools(harnessId);
}
function selectAgentHarnessDecision(params) {
	const pinnedHarnessId = normalizeOptionalAgentRuntimeId(params.agentHarnessId);
	const runtimeOverride = normalizeOptionalAgentRuntimeId(params.agentHarnessRuntimeOverride);
	const requestedRuntimeOverride = pinnedHarnessId ?? runtimeOverride;
	const selectedRuntimeOverride = requestedRuntimeOverride && !isDefaultAgentRuntimeId(requestedRuntimeOverride) ? requestedRuntimeOverride : void 0;
	const availability = selectedRuntimeOverride ? {
		kind: "available",
		policy: resolveAgentHarnessPolicy({
			...params,
			modelApi: params.modelProvider?.api,
			modelBaseUrl: params.modelProvider?.baseUrl,
			requestTransportOverrides: params.modelProvider?.requestTransportOverrides
		})
	} : resolveAgentHarnessAvailabilityDecision(params);
	const resolvedPolicy = availability.policy;
	const policy = selectedRuntimeOverride ? {
		...resolvedPolicy,
		runtime: selectedRuntimeOverride,
		runtimeSource: "model"
	} : resolvedPolicy;
	const pluginHarnesses = listPluginAgentHarnesses();
	const openClawHarness = createOpenClawAgentHarness();
	const runtime = policy.runtime;
	if (runtime === "openclaw") return buildSelectionDecision({
		harness: openClawHarness,
		policy,
		selectedReason: selectedRuntimeOverride ? "forced_openclaw" : availability.kind === "implicit-unavailable" ? "implicit_plugin_unavailable_openclaw" : availability.kind === "implicit-unsupported" ? "implicit_plugin_unsupported_openclaw" : "forced_openclaw",
		candidates: listHarnessCandidates(pluginHarnesses)
	});
	if (runtime !== "auto") {
		const forced = pluginHarnesses.find((entry) => entry.id === runtime);
		if (forced) {
			if (pinnedHarnessId === runtime && !params.preparedModelProvider) return buildSelectionDecision({
				harness: forced,
				policy,
				selectedReason: "forced_plugin",
				candidates: listHarnessCandidates(pluginHarnesses)
			});
			const supportContext = buildAgentHarnessSupportContext({
				provider: params.provider,
				modelId: params.modelId,
				modelProvider: params.modelProvider,
				requestedRuntime: runtime,
				config: params.config,
				agentId: params.agentId,
				sessionKey: params.sessionKey,
				preparedModelProvider: params.preparedModelProvider,
				providerOwnership: resolveProviderRefOwnership({
					provider: params.provider,
					config: params.config
				})
			});
			const support = forced.supports(supportContext);
			if (support.supported) return buildSelectionDecision({
				harness: forced,
				policy,
				selectedReason: "forced_plugin",
				candidates: listHarnessCandidates(pluginHarnesses)
			});
			if (isCliRuntimeAliasForProvider({
				runtime,
				provider: params.provider
			})) return buildSelectionDecision({
				harness: openClawHarness,
				policy: {
					...policy,
					runtime: "openclaw"
				},
				selectedReason: "cli_runtime_passthrough_openclaw",
				candidates: listHarnessCandidates(pluginHarnesses)
			});
			throw new Error(`Requested agent harness "${runtime}" does not support ${formatProviderModel(params)}${support.reason ? ` (${support.reason})` : ""}.`);
		}
		if (runtime === "codex" && policy.runtimeSource === "implicit") return buildSelectionDecision({
			harness: openClawHarness,
			policy: {
				...policy,
				runtime: "openclaw"
			},
			selectedReason: "implicit_plugin_unavailable_openclaw",
			candidates: listHarnessCandidates(pluginHarnesses)
		});
		if (isCliRuntimeAliasForProvider({
			runtime,
			provider: params.provider,
			cfg: params.config
		})) return buildSelectionDecision({
			harness: openClawHarness,
			policy: {
				...policy,
				runtime: "openclaw"
			},
			selectedReason: "cli_runtime_passthrough_openclaw",
			candidates: listHarnessCandidates(pluginHarnesses)
		});
		throw new MissingAgentHarnessError(runtime);
	}
	const hintedCandidates = pluginHarnesses.map((harness) => ({
		harness,
		support: resolveAgentHarnessAutoSelectionHint({
			harness,
			provider: params.provider
		})
	}));
	const candidates = hintedCandidates.some((entry) => entry.support === void 0) ? (() => {
		const supportContext = buildAgentHarnessSupportContext({
			provider: params.provider,
			modelId: params.modelId,
			modelProvider: params.modelProvider,
			requestedRuntime: runtime,
			config: params.config,
			agentId: params.agentId,
			sessionKey: params.sessionKey,
			preparedModelProvider: params.preparedModelProvider,
			providerOwnership: resolveProviderRefOwnership({
				provider: params.provider,
				config: params.config
			})
		});
		return hintedCandidates.map(({ harness, support }) => ({
			harness,
			support: support ?? harness.supports(supportContext)
		}));
	})() : hintedCandidates.map(({ harness, support }) => ({
		harness,
		support
	}));
	const selected = candidates.filter((entry) => entry.support.supported).toSorted(compareHarnessSupport)[0]?.harness;
	if (selected) return buildSelectionDecision({
		harness: selected,
		policy,
		selectedReason: "auto_plugin",
		candidates: candidates.map(toSelectionCandidate)
	});
	return buildSelectionDecision({
		harness: openClawHarness,
		policy,
		selectedReason: "auto_openclaw",
		candidates: candidates.map(toSelectionCandidate)
	});
}
async function runAgentHarnessAttempt(params) {
	return runSelectedAgentHarnessAttempt(params);
}
/** Runs the selected harness's fail-closed settled-turn finalization operation. */
async function runAgentHarnessSettledTurnFinalization(params, settledAttempt, harness) {
	const internalParams = params;
	const finalizeSettledTurn = harness.finalizeSettledTurn?.bind(harness);
	if (!finalizeSettledTurn) throw new Error(`Agent harness ${harness.id} cannot safely finalize a settled tool turn.`);
	if (internalParams.systemAgentTool && !isSystemAgentOnlyAllowlist(internalParams.toolsAllow)) throw new Error("OpenClaw host authority requires toolsAllow: [\"openclaw\"]");
	const pluginParams = withoutInternalHarnessAuthority({
		...internalParams,
		operation: "settled-tool-finalization"
	});
	const attemptParams = harness.id === "openclaw" ? pluginParams : preparePluginHarnessParams(pluginParams);
	return runAgentHarnessOperation(harness, params, () => runWithAgentRingZeroTools([], () => runAgentHarnessLifecycleFinalization(harness, attemptParams, () => finalizeSettledTurn({
		attempt: attemptParams,
		settledAttempt
	}))));
}
async function runSelectedAgentHarnessAttempt(params) {
	const internalParams = params;
	const selection = selectPreparedAgentHarness(params);
	const harness = selection.harness;
	if (internalParams.systemAgentTool && !isSystemAgentOnlyAllowlist(internalParams.toolsAllow)) throw new Error("OpenClaw host authority requires toolsAllow: [\"openclaw\"]");
	const ringZeroTools = internalParams.systemAgentTool ? [(await import("./system-agent-tool-dwACRuH9.js")).createSystemAgentTool(internalParams.systemAgentTool)] : [];
	const pluginParams = withoutInternalHarnessAuthority(internalParams);
	logAgentHarnessSelection(selection, {
		provider: params.provider,
		modelId: params.modelId,
		sessionKey: params.sessionKey,
		agentId: params.agentId
	});
	return runAgentHarnessOperation(harness, params, () => runWithAgentRingZeroTools(ringZeroTools, () => {
		const attemptParams = harness.id === "openclaw" ? pluginParams : preparePluginHarnessParams(pluginParams);
		return runAgentHarnessLifecycleAttempt(harness, attemptParams);
	}));
}
function selectPreparedAgentHarness(params) {
	return selectAgentHarnessDecision({
		provider: params.provider,
		modelId: params.modelId,
		modelProvider: {
			api: params.model.api,
			baseUrl: params.model.baseUrl,
			...resolveAgentHarnessPreparedRouteSupport(params.runtimePlan?.auth),
			preparedAuth: resolveAgentHarnessPreparedAuthSupport({ plan: params.runtimePlan?.auth })
		},
		config: params.config,
		agentId: params.agentId,
		sessionKey: params.sessionKey,
		agentHarnessId: params.agentHarnessId,
		agentHarnessRuntimeOverride: params.agentHarnessRuntimeOverride,
		preparedModelProvider: params.runtimePlan?.auth !== void 0
	});
}
async function runAgentHarnessOperation(harness, params, execute) {
	const activeTrace = getActiveDiagnosticTraceContext();
	const harnessTrace = freezeDiagnosticTraceContext(activeTrace ? createChildDiagnosticTraceContext(activeTrace) : createDiagnosticTraceContext());
	if (harness.id === "openclaw") return await runWithDiagnosticTraceContext(harnessTrace, execute);
	try {
		return await runWithDiagnosticTraceContext(harnessTrace, execute);
	} catch (error) {
		log.warn(`${harness.label} failed; not falling back to embedded OpenClaw backend`, {
			harnessId: harness.id,
			provider: params.provider,
			modelId: params.modelId,
			error: formatErrorMessage(error)
		});
		throw error;
	}
}
function isSystemAgentOnlyAllowlist(toolsAllow) {
	return toolsAllow?.length === 1 && normalizeToolName(toolsAllow[0] ?? "") === "openclaw";
}
function withoutInternalHarnessAuthority(params) {
	if (!Object.hasOwn(params, "systemAgentTool")) return params;
	const { systemAgentTool: _systemAgentTool, ...pluginParams } = params;
	return pluginParams;
}
function preparePluginHarnessParams(params) {
	const boundary = "plugin harness handoff";
	const resolvedApiKey = params.resolvedApiKey ? unwrapSecretSentinelsForProviderEgress(params.resolvedApiKey, boundary) : params.resolvedApiKey;
	const model = unwrapModelHeaderSentinelsForProviderEgress(params.model, boundary);
	if (model === params.model && resolvedApiKey === params.resolvedApiKey) return applyPluginHarnessDenyAllToolPolicy(params);
	return applyPluginHarnessDenyAllToolPolicy({
		...params,
		model,
		resolvedApiKey
	});
}
function applyPluginHarnessDenyAllToolPolicy(params) {
	if (isHostScopedAgentToolActive("openclaw") && params.toolsAllow?.length === 1 && normalizeToolName(params.toolsAllow[0] ?? "") === "openclaw") return params;
	const prompt = resolvePluginHarnessDenyAllToolPolicyPrompt(params);
	if (!prompt) return params;
	return {
		...params,
		toolsAllow: [],
		extraSystemPrompt: appendPluginHarnessToolPolicyPrompt(params.extraSystemPrompt, prompt)
	};
}
function resolvePluginHarnessPolicyToolsAllow(params) {
	const policies = resolvePluginHarnessToolPolicies(params);
	return [
		policies.senderPolicy,
		policies.groupPolicy,
		...policies.runtimePolicies
	].some(policyRestrictsNativeTools) ? [] : void 0;
}
function resolvePluginHarnessDenyAllToolPolicyPrompt(params) {
	const policies = resolvePluginHarnessToolPolicies(params);
	if (policyDeniesAllTools(policies.senderPolicy) || policyDeniesAllTools(policies.senderScopedGroupPolicy)) return PLUGIN_HARNESS_SENDER_DENY_ALL_PROMPT;
	if (policyDeniesAllTools(policies.groupPolicy)) return PLUGIN_HARNESS_GROUP_DENY_ALL_PROMPT;
	return policies.runtimePolicies.some(policyDeniesAllTools) ? PLUGIN_HARNESS_RUNTIME_DENY_ALL_PROMPT : void 0;
}
function resolvePluginHarnessToolPolicies(params) {
	const messageProvider = params.messageProvider ?? params.messageChannel;
	const sandboxSessionKey = params.sandboxSessionKey ?? params.sessionKey;
	const capabilityProfile = resolveConversationCapabilityProfile({
		config: params.config,
		sessionId: params.sessionId,
		sessionKey: params.sessionKey,
		sandboxSessionKey,
		agentId: params.agentId,
		modelProvider: params.provider,
		modelId: params.modelId,
		messageProvider,
		messageChannel: params.messageChannel,
		agentAccountId: params.agentAccountId,
		groupId: params.groupId,
		groupChannel: params.groupChannel,
		groupSpace: params.groupSpace,
		spawnedBy: params.spawnedBy,
		senderId: params.senderId,
		senderName: params.senderName,
		senderUsername: params.senderUsername,
		senderE164: params.senderE164,
		senderIsOwner: params.senderIsOwner,
		inputProvenance: params.inputProvenance,
		trustedInternalHandoff: params.trustedInternalHandoff,
		scheduledToolPolicy: params.scheduledToolPolicy
	});
	const groupPolicyParams = {
		config: params.config,
		sessionKey: params.scheduledToolPolicy?.ownerSessionKey ?? params.sessionKey,
		spawnedBy: params.spawnedBy,
		messageProvider,
		groupId: params.groupId,
		groupChannel: params.groupChannel,
		groupSpace: params.groupSpace,
		accountId: params.scheduledToolPolicy?.ownerAccountId ?? params.agentAccountId,
		requireConfiguredAccount: params.scheduledToolPolicy?.mode === "account",
		senderId: params.senderId,
		senderName: params.senderName,
		senderUsername: params.senderUsername,
		senderE164: params.senderE164,
		senderPolicyMode: params.scheduledToolPolicy ? "never" : "always"
	};
	const { policy } = capabilityProfile;
	const sandboxRuntime = resolveSandboxRuntimeStatus({
		cfg: params.config,
		sessionKey: sandboxSessionKey
	});
	const sandboxPolicy = sandboxRuntime.sandboxed ? sandboxRuntime.toolPolicy : void 0;
	return {
		senderPolicy: policy.senderPolicy,
		senderScopedGroupPolicy: resolveSenderScopedGroupToolPolicy(params, groupPolicyParams, policy.groupPolicy),
		groupPolicy: policy.groupPolicy,
		runtimePolicies: [
			mergeAlsoAllowPolicy(policy.profilePolicy, policy.profileAlsoAllow),
			mergeAlsoAllowPolicy(policy.providerProfilePolicy, policy.providerProfileAlsoAllow),
			policy.globalPolicy,
			policy.globalProviderPolicy,
			policy.agentPolicy,
			policy.agentProviderPolicy,
			sandboxPolicy,
			policy.subagentPolicy,
			policy.inheritedToolPolicy
		]
	};
}
function resolveSenderScopedGroupToolPolicy(params, groupPolicyParams, groupPolicy) {
	if (!policyDeniesAllTools(groupPolicy) || !hasSenderIdentity(params)) return;
	return policyDeniesAllTools(resolveGroupToolPolicy({
		...groupPolicyParams,
		senderId: void 0,
		senderName: void 0,
		senderUsername: void 0,
		senderE164: void 0
	})) ? void 0 : groupPolicy;
}
function hasSenderIdentity(params) {
	return Boolean(params.senderId?.trim() || params.senderName?.trim() || params.senderUsername?.trim() || params.senderE164?.trim());
}
function appendPluginHarnessToolPolicyPrompt(existing, prompt) {
	const trimmed = existing?.trim();
	if (!trimmed) return prompt;
	return trimmed.includes(prompt) ? trimmed : `${trimmed}\n\n${prompt}`;
}
function policyDeniesAllTools(policy) {
	return expandToolGroups(policy?.deny ?? []).some((entry) => normalizeToolName(entry) === "*");
}
function policyRestrictsNativeTools(policy) {
	if (!policy) return false;
	if (expandToolGroups(policy.deny ?? []).some((entry) => Boolean(normalizeToolName(entry)))) return true;
	return Array.isArray(policy.allow) && policy.allow.length > 0 && !expandToolGroups(policy.allow).some((entry) => normalizeToolName(entry) === "*");
}
function listHarnessCandidates(harnesses) {
	return harnesses.map((harness) => ({
		id: harness.id,
		label: harness.label,
		pluginId: harness.pluginId
	}));
}
function toSelectionCandidate(entry) {
	return {
		id: entry.harness.id,
		label: entry.harness.label,
		pluginId: entry.harness.pluginId,
		supported: entry.support.supported,
		priority: entry.support.supported ? entry.support.priority : void 0,
		reason: entry.support.reason
	};
}
function buildSelectionDecision(params) {
	return {
		harness: params.harness,
		policy: params.policy,
		selectedHarnessId: params.harness.id,
		selectedReason: params.selectedReason,
		candidates: params.candidates
	};
}
function logAgentHarnessSelection(selection, params) {
	if (!log.isEnabled("debug")) return;
	log.debug("agent harness selected", {
		provider: params.provider,
		modelId: params.modelId,
		sessionKey: params.sessionKey,
		agentId: params.agentId,
		selectedHarnessId: selection.selectedHarnessId,
		selectedReason: selection.selectedReason,
		runtime: selection.policy.runtime,
		candidates: selection.candidates
	});
}
function formatProviderModel(params) {
	return params.modelId ? `${params.provider}/${params.modelId}` : params.provider;
}
//#endregion
export { runAgentHarnessAttempt as a, selectAgentHarnessForPreparedModelProviders as c, resolvePluginHarnessPolicyToolsAllow as i, agentHarnessExposesOpenClawTools as n, runAgentHarnessSettledTurnFinalization as o, resolveAvailableAgentHarnessPolicy as r, selectAgentHarness as s, agentHarnessBuildsOpenClawTools as t };
