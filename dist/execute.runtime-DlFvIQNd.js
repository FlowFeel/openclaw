import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { n as isTruthyEnvValue } from "./env-vD3tMcRW.js";
import { r as toErrorObject } from "./error-coercion-CrJRoLe1.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { t as createAbortError } from "./abort-signal-DEbc_zqk.js";
import { s as sanitizeHostExecEnv } from "./host-env-security-D4EXCIbD.js";
import { n as compareValidSemver } from "./semver-aYpwYdrQ.js";
import { C as createDiagnosticTraceContextFromActiveScope, M as hasInternalDiagnosticEventListeners, T as freezeDiagnosticTraceContext, o as emitTrustedDiagnosticEvent, s as emitTrustedDiagnosticEventWithPrivateData, t as areDiagnosticsEnabledForProcess } from "./diagnostic-events-Dt41CZkD.js";
import { i as emitAgentEvent, t as assertAgentRunLifecycleGenerationCurrent } from "./agent-events-COCf-9-O.js";
import { i as shouldLogVerbose } from "./globals-Cw62Mq_M.js";
import { n as truncateUtf8Suffix } from "./utf8-truncate-Dro7v_iB.js";
import { t as NODE_AGENT_CLI_CLAUDE_RUN_COMMAND } from "./node-commands-CeG5w7c2.js";
import { n as applyPluginTextReplacements } from "./text-transforms.runtime-DMVbPf9Z.js";
import { a as resolveCliRuntimeOwnerFingerprint, o as resolveCliExecutableIdentity, t as fingerprintCliRuntimeArtifact } from "./cli-auth-epoch-B8qvN1lA.js";
import { i as classifyFailoverReason } from "./errors-Bujrccyt.js";
import { c as isFailoverError, p as resolveFailoverStatus, t as FailoverError } from "./failover-error-DBKQENP4.js";
import { a as requestHeartbeat } from "./heartbeat-wake-D9__uym3.js";
import { a as enqueueSystemEvent } from "./system-events-BNZxjP0P.js";
import { f as resolveCliToolTerminalReason } from "./run-termination-CczpQCyZ.js";
import "./embedded-agent-helpers-dlCGQLQ2.js";
import { t as getProcessSupervisor } from "./supervisor-D9SmsI10.js";
import { n as diagnosticErrorFailureKind, r as diagnosticErrorMessage, t as diagnosticErrorCategory } from "./diagnostic-error-metadata-CxJn_BAC.js";
import { n as resolveDiagnosticModelContentCapturePolicy, t as cloneDiagnosticContentValue } from "./diagnostic-llm-content-BiTOBguG.js";
import { a as isMessagingToolSendAction, i as isMessagingToolDeliveryAction, o as isMessagingToolTargetEvidenceAction, r as isMessagingTool } from "./embedded-agent-messaging-Bc7tsqQd.js";
import { a as extractMessagingToolSend, h as sanitizeToolResult, i as collectMessagingMediaUrlsFromToolResult, m as sanitizeToolArgs, o as extractMessagingToolSendResult, r as collectMessagingMediaUrlsFromRecord, s as extractMessagingToolSourceReplyPayload } from "./embedded-agent-subscribe.tools-agHp_6fR.js";
import { n as isDeliveredMessageToolOnlySourceReplyResult, r as isDeliveredMessagingToolResult } from "./embedded-agent-message-tool-source-reply-x3_0ZuNB.js";
import { n as appendBootstrapPromptWarning } from "./bootstrap-budget-U6QVxuxs.js";
import { i as scopedHeartbeatWakeOptionsForPolicy, n as resolveEventSessionRoutingPolicy, t as resolveEventSessionKeyForPolicy } from "./event-session-routing-BY6OxTFh.js";
import { n as getFallbackGatewayContext } from "./server-plugin-fallback-context-CA_ZMhwm.js";
import { l as resolveNodeCommandAllowlist, o as isNodeCommandAllowed } from "./node-command-policy-BdDcKUU6.js";
import { t as shouldUseInternalSourceReplySink } from "./internal-source-reply-BMt-7Md_.js";
import { a as hasHydratableMediaImages, n as detectImageReferences } from "./images-BC0m77Nb.js";
import { n as applySkillEnvOverridesFromSnapshot } from "./env-overrides-Vj8e0EdA.js";
import { r as stripOpenClawMcpToolPrefix, t as buildCliBackendToolAvailability } from "./tool-policy-Cq4UBQeI.js";
import { a as resolveRegisteredExecApprovalDecision, i as registerExecApprovalRequestForHostOrThrow } from "./bash-tools.exec-approval-request-MXN-i1m6.js";
import { a as runClaudeLiveSessionTurn, c as createCliJsonlStreamingParser, d as prepareCliBundleMcpCaptureAttempt, i as rotateClaudeLiveMcpCaptureKeyForContext, l as extractCliErrorMessage, o as shouldUseClaudeLiveSession, s as createCliOutputFailoverError, t as closeClaudeLiveSessionForContext, u as parseCliOutput } from "./claude-live-session-CU8M79P4.js";
import { c as resolveCliRunQueueKey, d as resolveSystemPromptUsage, f as writeCliSystemPromptFile, h as resolveCliRunTimeoutOverrideMs, i as enqueueCliRun, l as resolvePromptInput, m as resolveCliNoOutputTimeoutMs, p as buildCliSupervisorScopeKey, r as buildCliArgs, s as prepareCliPromptImagePayload, t as buildClaudeOwnerKey, u as resolveSessionIdToSend, v as cliBackendLog, y as formatCliBackendOutputDigest } from "./helpers-Dc_1XotW.js";
import { t as prepareClaudeCliSkillsPlugin } from "./claude-skills-plugin-R4jccSoX.js";
import { g as waitForMcpLoopbackToolCallCaptureIdle, r as clearMcpLoopbackToolCallCapture, t as beginMcpLoopbackToolCallCapture } from "./mcp-http.loopback-runtime-CrkkrSyL.js";
import { t as attachCliMessagingDeliveryEvidence } from "./delivery-evidence-Cmz7UHq4.js";
import crypto, { randomUUID } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import { parse } from "semver";
//#region src/gateway/node-agent-cli-runtime.ts
/** In-process Gateway seam for streaming a Claude CLI turn from a paired node. */
async function invokeNodeClaudeCliRun(params) {
	const context = getFallbackGatewayContext();
	if (!context) return {
		ok: false,
		error: {
			code: "UNAVAILABLE",
			message: "Gateway node runtime unavailable"
		}
	};
	const node = context.nodeRegistry.get(params.nodeId);
	if (!node || !node.commands.includes("agent.cli.claude.run.v1")) return {
		ok: false,
		error: {
			code: "UNAVAILABLE",
			message: "paired node does not advertise Claude CLI agent runs"
		}
	};
	const allowlist = resolveNodeCommandAllowlist(context.getRuntimeConfig(), {
		...node,
		approvedCommands: node.commands
	});
	const allowed = isNodeCommandAllowed({
		command: NODE_AGENT_CLI_CLAUDE_RUN_COMMAND,
		declaredCommands: node.commands,
		allowlist
	});
	if (!allowed.ok) return {
		ok: false,
		error: {
			code: "PERMISSION_DENIED",
			message: `paired-node Claude CLI agent runs are blocked by node command policy (${allowed.reason})`
		}
	};
	return await context.nodeRegistry.invoke({
		nodeId: params.nodeId,
		expectedConnId: node.connId,
		...node.pairingGeneration ? { expectedPairingGeneration: node.pairingGeneration } : {},
		command: NODE_AGENT_CLI_CLAUDE_RUN_COMMAND,
		params: {
			argv: params.argv,
			stdin: params.stdin,
			...params.cwd ? { cwd: params.cwd } : {},
			...params.env ? { env: params.env } : {},
			...params.clearEnv ? { clearEnv: params.clearEnv } : {},
			...params.systemPrompt !== void 0 ? { systemPrompt: params.systemPrompt } : {},
			...params.agentId ? { agentId: params.agentId } : {},
			...params.sessionKey ? { sessionKey: params.sessionKey } : {},
			...params.approvalDecision ? { approvalDecision: params.approvalDecision } : {},
			...params.systemRunPlan ? { systemRunPlan: params.systemRunPlan } : {},
			idleTimeoutMs: params.idleTimeoutMs,
			timeoutMs: params.timeoutMs
		},
		timeoutMs: params.timeoutMs,
		idleTimeoutMs: params.idleTimeoutMs,
		idempotencyKey: randomUUID(),
		onProgress: params.onProgress,
		...params.signal ? { signal: params.signal } : {}
	});
}
//#endregion
//#region src/agents/cli-runner/execute-deps.ts
const executeDeps = {
	getProcessSupervisor,
	enqueueSystemEvent,
	requestHeartbeat,
	writeCliSystemPromptFile,
	invokeNodeClaudeCliRun,
	registerExecApprovalRequestForHostOrThrow,
	resolveRegisteredExecApprovalDecision
};
//#endregion
//#region src/agents/cli-runner/execute-events.ts
function resolveCliToolSource(name, kind) {
	return kind === "mcp_tool_use" || name.startsWith("mcp__") ? "mcp" : "core";
}
function createCliEventHandlers(params) {
	const context = params.context;
	const runParams = context.params;
	const emitLiveEvents = runParams.executionMode !== "side-question";
	let observedCliActivity = false;
	let signaledToolExecutionStarted = false;
	let signaledAssistantOutputStarted = false;
	let commentaryCounter = 0;
	const toolSummaryById = /* @__PURE__ */ new Map();
	const toolArgsByCallId = /* @__PURE__ */ new Map();
	const toolSummaryNames = [];
	const toolSummaryNameSet = /* @__PURE__ */ new Set();
	const activeParsedTools = /* @__PURE__ */ new Map();
	const rememberToolName = (name) => {
		if (!name || toolSummaryNameSet.has(name)) return;
		toolSummaryNameSet.add(name);
		toolSummaryNames.push(name);
	};
	const recordToolStart = (event) => {
		if (event.args && Object.keys(event.args).length > 0) toolArgsByCallId.set(event.toolCallId, event.args);
		const current = toolSummaryById.get(event.toolCallId);
		if (!current) toolSummaryById.set(event.toolCallId, {
			name: event.name,
			failed: false
		});
		else if (!current.name && event.name) current.name = event.name;
		rememberToolName(event.name);
	};
	const recordToolResult = (event) => {
		const current = toolSummaryById.get(event.toolCallId);
		if (current) {
			current.failed ||= event.isError;
			if (!current.name && event.name) current.name = event.name;
		} else toolSummaryById.set(event.toolCallId, {
			name: event.name,
			failed: event.isError
		});
		rememberToolName(event.name);
	};
	const getToolSummary = () => ({
		calls: toolSummaryById.size,
		tools: toolSummaryNames.slice(),
		failures: Array.from(toolSummaryById.values()).filter((entry) => entry.failed).length
	});
	const emitCliToolUseStart = (event) => {
		observedCliActivity = true;
		recordToolStart(event);
		if (!signaledToolExecutionStarted) {
			signaledToolExecutionStarted = true;
			runParams.onExecutionPhase?.({
				phase: "tool_execution_started",
				provider: runParams.provider,
				model: context.modelId,
				backend: context.backendResolved.id
			});
		}
		params.toolTracking.handleCliToolUseStart(event);
		if (emitLiveEvents) emitAgentEvent({
			runId: runParams.runId,
			stream: "tool",
			data: {
				phase: "start",
				name: event.name,
				toolCallId: event.toolCallId,
				args: sanitizeToolArgs(event.args)
			}
		});
	};
	const emitCliToolResult = (event) => {
		observedCliActivity = true;
		recordToolResult(event);
		params.toolTracking.handleCliToolResult(event);
		if (emitLiveEvents) {
			const resultContentSource = context.resultContentSourceByToolName?.get(stripOpenClawMcpToolPrefix(event.name));
			const startedArgs = toolArgsByCallId.get(event.toolCallId);
			toolArgsByCallId.delete(event.toolCallId);
			emitAgentEvent({
				runId: runParams.runId,
				stream: "tool",
				data: {
					phase: "result",
					name: event.name,
					toolCallId: event.toolCallId,
					isError: event.isError,
					result: sanitizeToolResult(event.result),
					...startedArgs ? { args: startedArgs } : {},
					...resultContentSource ? { resultContentSource } : {}
				}
			});
		}
	};
	const emitCliDisplayToolUseStart = (event) => {
		observedCliActivity = true;
		recordToolStart(event);
		if (!signaledToolExecutionStarted) {
			signaledToolExecutionStarted = true;
			runParams.onExecutionPhase?.({
				phase: "tool_execution_started",
				provider: runParams.provider,
				model: context.modelId,
				backend: context.backendResolved.id
			});
		}
		if (emitLiveEvents) emitAgentEvent({
			runId: runParams.runId,
			stream: "tool",
			data: {
				phase: "start",
				name: event.name,
				toolCallId: event.toolCallId,
				args: sanitizeToolArgs(event.args)
			}
		});
	};
	const emitCliDisplayToolResult = (event) => {
		observedCliActivity = true;
		recordToolResult(event);
		if (emitLiveEvents) emitAgentEvent({
			runId: runParams.runId,
			stream: "tool",
			data: {
				phase: "result",
				name: event.name,
				toolCallId: event.toolCallId,
				isError: event.isError,
				result: sanitizeToolResult(event.result)
			}
		});
	};
	const emitParsedToolUseStart = (event) => {
		const startedAt = Date.now();
		activeParsedTools.set(event.toolCallId, {
			startedAt,
			toolName: event.name,
			kind: event.kind
		});
		emitTrustedDiagnosticEvent({
			type: "tool.execution.started",
			runId: runParams.runId,
			sessionId: runParams.sessionId,
			...runParams.sessionKey ? { sessionKey: runParams.sessionKey } : {},
			...runParams.agentId ? { agentId: runParams.agentId } : {},
			toolName: event.name,
			toolSource: resolveCliToolSource(event.name, event.kind),
			toolOwner: "cli-runner",
			toolCallId: event.toolCallId
		});
		emitCliToolUseStart(event);
	};
	const emitParsedToolTerminal = (event) => {
		const activeTool = activeParsedTools.get(event.toolCallId);
		activeParsedTools.delete(event.toolCallId);
		const trustedOutcome = params.toolTracking.resolveCliLoopbackTerminalOutcome(event.toolCallId);
		const toolName = activeTool?.toolName ?? event.name;
		const now = Date.now();
		const trustedTerminalReason = trustedOutcome && trustedOutcome.outcome !== "blocked" && trustedOutcome.outcome !== "completed" && trustedOutcome.outcome !== "unknown" ? trustedOutcome.outcome : void 0;
		const runState = params.getRunState();
		const terminalReason = trustedTerminalReason ?? resolveCliToolTerminalReason({
			error: event.incomplete ? runState.error : void 0,
			abortSignal: runParams.abortSignal
		});
		const useEnclosingTerminalReason = event.incomplete && runState.failed && activeTool !== void 0 && activeTool.kind !== "server_tool_use";
		const diagnosticBase = {
			runId: runParams.runId,
			sessionId: runParams.sessionId,
			...runParams.sessionKey ? { sessionKey: runParams.sessionKey } : {},
			...runParams.agentId ? { agentId: runParams.agentId } : {},
			toolName,
			toolSource: resolveCliToolSource(toolName, activeTool?.kind),
			toolOwner: "cli-runner",
			toolCallId: event.toolCallId,
			durationMs: Math.max(0, now - (activeTool?.startedAt ?? now))
		};
		if (trustedOutcome?.outcome === "unknown" && !useEnclosingTerminalReason) {
			emitTrustedDiagnosticEvent({
				type: "tool.execution.error",
				...diagnosticBase,
				errorCategory: "cli_tool_ambiguous",
				errorCode: "tool_outcome_unknown"
			});
			return;
		}
		if (event.incomplete && activeTool?.kind === "server_tool_use" && !trustedOutcome) {
			emitTrustedDiagnosticEvent({
				type: "tool.execution.error",
				...diagnosticBase,
				errorCategory: "cli_tool_ambiguous",
				errorCode: "tool_outcome_unknown"
			});
			return;
		}
		const trustedFailure = trustedOutcome !== void 0 && trustedOutcome.outcome !== "completed";
		emitTrustedDiagnosticEvent(trustedOutcome?.outcome === "blocked" ? {
			type: "tool.execution.blocked",
			...diagnosticBase,
			deniedReason: trustedOutcome.deniedReason,
			reason: "blocked by before-tool policy"
		} : trustedFailure || !trustedOutcome && event.isError ? {
			type: "tool.execution.error",
			...diagnosticBase,
			errorCategory: terminalReason === "cancelled" ? "aborted" : event.incomplete && (!trustedOutcome || useEnclosingTerminalReason) ? "cli_tool_incomplete" : "cli_tool",
			terminalReason
		} : {
			type: "tool.execution.completed",
			...diagnosticBase
		});
	};
	const emitParsedToolResult = (event) => {
		emitParsedToolTerminal(event);
		emitCliToolResult(event);
	};
	const finalizeParsedTools = () => {
		for (const [toolCallId, activeTool] of Array.from(activeParsedTools)) emitParsedToolTerminal({
			toolCallId,
			name: activeTool.toolName,
			isError: true,
			incomplete: true
		});
	};
	const emitCliCommentaryText = (text) => {
		if (!emitLiveEvents) return;
		commentaryCounter += 1;
		emitAgentEvent({
			runId: runParams.runId,
			stream: "item",
			data: {
				kind: "preamble",
				itemId: `commentary-${runParams.runId}-${commentaryCounter}`,
				phase: "update",
				title: "commentary",
				status: "running",
				progressText: applyPluginTextReplacements(text, context.backendResolved.textTransforms?.output)
			}
		});
	};
	const emitCliAssistantDelta = ({ text, delta }) => {
		if (text || delta) {
			observedCliActivity = true;
			if (!signaledAssistantOutputStarted) {
				signaledAssistantOutputStarted = true;
				runParams.onExecutionPhase?.({
					phase: "assistant_output_started",
					provider: runParams.provider,
					model: context.modelId,
					backend: context.backendResolved.id
				});
			}
		}
		if (emitLiveEvents) emitAgentEvent({
			runId: runParams.runId,
			stream: "assistant",
			data: {
				text: applyPluginTextReplacements(text, context.backendResolved.textTransforms?.output),
				delta: applyPluginTextReplacements(delta, context.backendResolved.textTransforms?.output)
			}
		});
	};
	const emitCliThinkingDelta = ({ text, delta, isReasoningSnapshot }) => {
		if (text || delta) observedCliActivity = true;
		if (emitLiveEvents) emitAgentEvent({
			runId: runParams.runId,
			stream: "thinking",
			data: {
				text,
				delta,
				...isReasoningSnapshot ? { isReasoningSnapshot } : {}
			}
		});
	};
	const emitCliThinkingProgress = ({ progressTokens }) => {
		observedCliActivity = true;
		if (emitLiveEvents) emitAgentEvent({
			runId: runParams.runId,
			stream: "thinking",
			data: { progressTokens }
		});
	};
	const emitCliPlanUpdate = ({ steps }) => {
		observedCliActivity = true;
		if (emitLiveEvents) emitAgentEvent({
			runId: runParams.runId,
			stream: "plan",
			data: {
				phase: "update",
				title: "Plan updated",
				source: "codex-exec",
				steps
			}
		});
	};
	return {
		emitLiveEvents,
		emitCliToolUseStart,
		emitCliToolResult,
		emitCliDisplayToolUseStart,
		emitCliDisplayToolResult,
		emitParsedToolUseStart,
		emitParsedToolResult,
		finalizeParsedTools,
		emitCliCommentaryText,
		emitCliAssistantDelta,
		emitCliThinkingDelta,
		emitCliThinkingProgress,
		emitCliPlanUpdate,
		hasObservedCliActivity: () => observedCliActivity,
		activeParsedToolCount: () => activeParsedTools.size,
		getToolSummary
	};
}
//#endregion
//#region src/agents/cli-runner/execute-logging.ts
function buildCliLogArgs(params) {
	const logArgs = [];
	for (let i = 0; i < params.args.length; i += 1) {
		const arg = params.args[i] ?? "";
		if (arg === params.systemPromptArg) {
			const systemPromptValue = params.args[i + 1] ?? "";
			logArgs.push(arg, `<systemPrompt:${systemPromptValue.length} chars>`);
			i += 1;
			continue;
		}
		if (arg === params.modelArg) {
			logArgs.push(arg, params.args[i + 1] ?? "");
			i += 1;
			continue;
		}
		if (arg === params.imageArg) {
			logArgs.push(arg, "<image>");
			i += 1;
			continue;
		}
		logArgs.push(arg);
	}
	if (params.argsPrompt) {
		const promptIndex = logArgs.indexOf(params.argsPrompt);
		if (promptIndex >= 0) logArgs[promptIndex] = `<prompt:${params.argsPrompt.length} chars>`;
	}
	return logArgs;
}
const CLI_ENV_AUTH_LOG_KEYS = [
	"AI_GATEWAY_API_KEY",
	"ANTHROPIC_API_KEY",
	"ANTHROPIC_API_KEY_OLD",
	"ANTHROPIC_API_TOKEN",
	"ANTHROPIC_AUTH_TOKEN",
	"ANTHROPIC_BASE_URL",
	"ANTHROPIC_CUSTOM_HEADERS",
	"ANTHROPIC_OAUTH_TOKEN",
	"ANTHROPIC_UNIX_SOCKET",
	"AZURE_OPENAI_API_KEY",
	"CLAUDE_CODE_OAUTH_TOKEN",
	"CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST",
	"OPENAI_API_KEY",
	"OPENAI_STEIPETE_API_KEY",
	"OPENROUTER_API_KEY"
];
const CLI_ENV_RUNTIME_LOG_KEYS = ["GEMINI_CLI_HOME", "GEMINI_CLI_SYSTEM_SETTINGS_PATH"];
const CLAUDE_SELECTED_AUTH_ENV_KEYS = /* @__PURE__ */ new Set(["ANTHROPIC_API_KEY", "CLAUDE_CODE_OAUTH_TOKEN"]);
const NODE_CLAUDE_FORWARD_ENV_KEYS = /* @__PURE__ */ new Set(["CLAUDE_CODE_AUTO_COMPACT_WINDOW"]);
function resolveNodeClaudeAuthEnv(context) {
	const secretInput = context.preparedBackend.secretInput;
	if (!secretInput) return {};
	const descriptorEnv = context.preparedBackend.env ?? {};
	const requestEnv = Object.hasOwn(descriptorEnv, "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR") ? "CLAUDE_CODE_OAUTH_TOKEN" : Object.hasOwn(descriptorEnv, "CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR") ? "ANTHROPIC_API_KEY" : void 0;
	if (!requestEnv) return {};
	const data = secretInput.createData();
	try {
		return { [requestEnv]: data.toString("utf8") };
	} finally {
		data.fill(0);
	}
}
const CLI_BACKEND_PRESERVE_ENV = "OPENCLAW_LIVE_CLI_BACKEND_PRESERVE_ENV";
function parseCliBackendPreserveEnv(raw) {
	const trimmed = raw?.trim();
	if (!trimmed) return /* @__PURE__ */ new Set();
	if (trimmed.startsWith("[")) try {
		const parsed = JSON.parse(trimmed);
		return new Set(Array.isArray(parsed) ? parsed.filter((entry) => typeof entry === "string") : []);
	} catch {
		return /* @__PURE__ */ new Set();
	}
	return new Set(trimmed.split(/[,\s]+/).map((entry) => entry.trim()).filter((entry) => entry.length > 0));
}
function listPresentCliEnvKeys(env, keys) {
	return keys.filter((key) => {
		const value = env[key];
		return typeof value === "string" && value.length > 0;
	});
}
function formatCliEnvKeyList(keys) {
	return keys.length > 0 ? keys.join(",") : "none";
}
function buildCliEnvMcpLog(childEnv) {
	return [`token=${childEnv.OPENCLAW_MCP_TOKEN ? "set" : "missing"}`, `capture=${childEnv.OPENCLAW_MCP_CLI_CAPTURE_KEY ? "set" : "missing"}`].join(" ");
}
function fingerprintCliSessionId(sessionId) {
	const trimmed = sessionId?.trim();
	if (!trimmed) return "none";
	return crypto.createHash("sha256").update(trimmed).digest("hex").slice(0, 12);
}
function formatCliSessionReuseLogState(reusableSession) {
	switch (reusableSession.mode) {
		case "reuse": return "reusable";
		case "reuse-with-drift": return `reusable-drift:${reusableSession.drift.reasons.join(",")}`;
		case "invalidate": return `invalidated:${reusableSession.invalidatedReason}`;
		case "none": return "none";
	}
	return reusableSession;
}
/** Builds the compact execution summary logged before a CLI backend run. */
function buildCliExecLogLine(params) {
	return [
		`cli exec: provider=${params.provider}`,
		`model=${params.model}`,
		`promptChars=${params.promptChars}`,
		`trigger=${params.trigger ?? "unknown"}`,
		`useResume=${params.useResume ? "true" : "false"}`,
		`session=${params.cliSessionId ? "present" : "none"}`,
		`resumeSession=${params.useResume ? fingerprintCliSessionId(params.resolvedSessionId) : "none"}`,
		`reuse=${formatCliSessionReuseLogState(params.reusableSession)}`,
		`historyPrompt=${params.hasHistoryPrompt ? "present" : "none"}`
	].join(" ");
}
/** Summarizes auth-related env keys preserved or cleared for a CLI child process. */
function buildCliEnvAuthLog(childEnv) {
	const hostKeys = listPresentCliEnvKeys(process.env, CLI_ENV_AUTH_LOG_KEYS);
	const childKeys = listPresentCliEnvKeys(childEnv, CLI_ENV_AUTH_LOG_KEYS);
	const childKeySet = new Set(childKeys);
	const clearedKeys = hostKeys.filter((key) => !childKeySet.has(key));
	const runtimeHostKeys = listPresentCliEnvKeys(process.env, CLI_ENV_RUNTIME_LOG_KEYS);
	const runtimeChildKeys = listPresentCliEnvKeys(childEnv, CLI_ENV_RUNTIME_LOG_KEYS);
	const runtimeChildKeySet = new Set(runtimeChildKeys);
	const runtimeClearedKeys = runtimeHostKeys.filter((key) => !runtimeChildKeySet.has(key));
	return [
		`host=${formatCliEnvKeyList(hostKeys)}`,
		`child=${formatCliEnvKeyList(childKeys)}`,
		`cleared=${formatCliEnvKeyList(clearedKeys)}`,
		`runtimeHost=${formatCliEnvKeyList(runtimeHostKeys)}`,
		`runtimeChild=${formatCliEnvKeyList(runtimeChildKeys)}`,
		`runtimeCleared=${formatCliEnvKeyList(runtimeClearedKeys)}`
	].join(" ");
}
function logCliInvocation(params) {
	const logArgs = buildCliLogArgs(params);
	params.log(`cli argv: ${params.command} ${logArgs.join(" ")}`);
	params.log(`cli env auth: ${buildCliEnvAuthLog(params.env)}`);
	if (params.env.OPENCLAW_MCP_TOKEN) params.log(`cli env mcp: ${buildCliEnvMcpLog(params.env)}`);
}
//#endregion
//#region src/agents/cli-runner/execute-node-claude.ts
const NODE_CLI_MAX_TIMEOUT_MS = 1440 * 60 * 1e3;
const NODE_CLI_MAX_IDLE_TIMEOUT_MS = 1800 * 1e3;
function resolveNodeClaudePlacement(context) {
	const entry = context.params.sessionEntry;
	const nodeId = entry?.execNode?.trim();
	if (context.backendResolved.id !== "claude-cli" || entry?.execHost !== "node") return null;
	if (!nodeId) throw new Error("node-placed Claude CLI session is missing execNode");
	return {
		nodeId,
		...entry.execCwd?.trim() ? { cwd: entry.execCwd.trim() } : {}
	};
}
const NODE_CLI_OMIT_BARE_ARGS = /* @__PURE__ */ new Set(["--strict-mcp-config"]);
const NODE_CLI_OMIT_VALUE_ARGS = /* @__PURE__ */ new Set([
	"--permission-mode",
	"--plugin-dir",
	"--plugin-dir-no-mcp"
]);
const NODE_CLI_OMIT_VARIADIC_ARGS = /* @__PURE__ */ new Set([
	"--mcp-config",
	"--allowedTools",
	"--allowed-tools"
]);
/** Remove Gateway-local file, plugin, MCP, and allow-list arguments. */
function stripGatewayLocalClaudeArgs(args) {
	const result = [];
	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index] ?? "";
		const equalsIndex = arg.indexOf("=");
		const name = equalsIndex > 0 ? arg.slice(0, equalsIndex) : arg;
		if (NODE_CLI_OMIT_BARE_ARGS.has(name)) continue;
		if (NODE_CLI_OMIT_VALUE_ARGS.has(name)) {
			if (equalsIndex < 0) index += 1;
			continue;
		}
		if (NODE_CLI_OMIT_VARIADIC_ARGS.has(name)) {
			if (equalsIndex < 0) while (typeof args[index + 1] === "string" && !args[index + 1]?.startsWith("-")) index += 1;
			continue;
		}
		result.push(arg);
	}
	return result;
}
function parseNodeClaudeResultPayload(result) {
	const value = result.payloadJSON ? JSON.parse(result.payloadJSON) : result.payload;
	if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("paired node returned an invalid Claude CLI result");
	const record = value;
	if (!Number.isInteger(record.exitCode) || typeof record.stderrTail !== "string" || typeof record.truncated !== "boolean" || record.timeoutKind !== void 0 && record.timeoutKind !== "hard" && record.timeoutKind !== "idle") throw new Error("paired node returned an invalid Claude CLI result");
	return {
		exitCode: record.exitCode,
		stderrTail: record.stderrTail,
		truncated: record.truncated,
		...record.timeoutKind ? { timeoutKind: record.timeoutKind } : {}
	};
}
function parseNodeClaudeApprovalRequired(result) {
	if (!result.ok) return null;
	const value = result.payloadJSON ? JSON.parse(result.payloadJSON) : result.payload;
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const record = value;
	if (record.approvalRequired !== true || !record.systemRunPlan || typeof record.systemRunPlan !== "object" || Array.isArray(record.systemRunPlan) || record.security !== "deny" && record.security !== "allowlist" && record.security !== "full" || record.ask !== "off" && record.ask !== "on-miss" && record.ask !== "always") return null;
	return {
		systemRunPlan: record.systemRunPlan,
		security: record.security,
		ask: record.ask
	};
}
function createCliAbortError() {
	return createAbortError("CLI run aborted");
}
async function waitForNodeOperation(params) {
	if (!params.signal) return await params.operation;
	if (params.signal.aborted) throw createCliAbortError();
	return await new Promise((resolve, reject) => {
		const onAbort = () => reject(createCliAbortError());
		params.signal?.addEventListener("abort", onAbort, { once: true });
		params.operation.then(resolve, reject).finally(() => {
			params.signal?.removeEventListener("abort", onAbort);
		});
	});
}
async function executeNodeClaudeRun(params) {
	const contextParams = params.context.params;
	const startedAt = Date.now();
	const hardTimeoutMs = Math.min(contextParams.timeoutMs, NODE_CLI_MAX_TIMEOUT_MS);
	const hardDeadlineAt = startedAt + hardTimeoutMs;
	const nodeAbortController = new AbortController();
	const nodeRunAbortSignal = nodeAbortController.signal;
	let hardDeadlineReached = false;
	const hardDeadlineTimer = setTimeout(() => {
		hardDeadlineReached = true;
		nodeAbortController.abort();
	}, hardTimeoutMs);
	const abortNodeRun = () => nodeAbortController.abort();
	contextParams.abortSignal?.addEventListener("abort", abortNodeRun, { once: true });
	if (contextParams.abortSignal?.aborted) abortNodeRun();
	let replyBackendCompleted = false;
	const replyBackendHandle = contextParams.replyOperation ? {
		kind: "cli",
		cancel: abortNodeRun,
		isStreaming: () => !replyBackendCompleted
	} : void 0;
	if (replyBackendHandle) contextParams.replyOperation?.attachBackend(replyBackendHandle);
	let nodeResult;
	try {
		const invokeNode = async (approval) => {
			const remainingTimeoutMs = hardDeadlineAt - Date.now();
			if (remainingTimeoutMs <= 0) {
				hardDeadlineReached = true;
				nodeAbortController.abort();
				return {
					ok: false,
					error: {
						code: "TIMEOUT",
						message: "paired-node Claude CLI invocation exceeded its hard timeout"
					}
				};
			}
			return await params.deps.invokeNodeClaudeCliRun({
				nodeId: params.nodePlacement.nodeId,
				argv: params.executionArgs,
				stdin: params.stdinPayload,
				...params.nodePlacement.cwd ? { cwd: params.nodePlacement.cwd } : {},
				...params.nodeSystemPrompt !== void 0 ? { systemPrompt: params.nodeSystemPrompt } : {},
				...params.nodeEnv ? { env: params.nodeEnv } : {},
				...params.nodeClearEnv ? { clearEnv: params.nodeClearEnv } : {},
				...contextParams.agentId ? { agentId: contextParams.agentId } : {},
				...contextParams.sessionKey ? { sessionKey: contextParams.sessionKey } : {},
				...approval ? {
					approvalDecision: approval.decision,
					systemRunPlan: approval.plan
				} : {},
				timeoutMs: remainingTimeoutMs,
				idleTimeoutMs: Math.max(1e3, Math.min(params.noOutputTimeoutMs, NODE_CLI_MAX_IDLE_TIMEOUT_MS)),
				onProgress: params.consumeStdout,
				signal: nodeAbortController.signal
			});
		};
		nodeResult = await invokeNode();
		const approval = parseNodeClaudeApprovalRequired(nodeResult);
		if (approval) {
			const approvalId = crypto.randomUUID();
			const registration = await waitForNodeOperation({
				operation: params.deps.registerExecApprovalRequestForHostOrThrow({
					approvalId,
					command: approval.systemRunPlan.commandText,
					commandArgv: approval.systemRunPlan.argv,
					systemRunPlan: approval.systemRunPlan,
					workdir: approval.systemRunPlan.cwd ?? void 0,
					host: "node",
					nodeId: params.nodePlacement.nodeId,
					security: approval.security,
					ask: approval.ask,
					unavailableDecisions: ["allow-always"],
					agentId: contextParams.agentId,
					sessionKey: contextParams.sessionKey,
					...contextParams.approvalReviewerDeviceId ? { approvalReviewerDeviceIds: [contextParams.approvalReviewerDeviceId] } : {}
				}),
				signal: nodeAbortController.signal
			});
			const decision = await waitForNodeOperation({
				operation: params.deps.resolveRegisteredExecApprovalDecision({
					approvalId: registration.id,
					preResolvedDecision: registration.finalDecision
				}),
				signal: nodeAbortController.signal
			});
			if (decision === "allow-once" || decision === "allow-always") nodeResult = await invokeNode({
				decision,
				plan: approval.systemRunPlan
			});
			else nodeResult = {
				ok: false,
				error: {
					code: "PERMISSION_DENIED",
					message: "paired-node Claude CLI agent run was not approved"
				}
			};
		}
	} catch (error) {
		if (!hardDeadlineReached) throw error;
		nodeResult = {
			ok: false,
			error: {
				code: "TIMEOUT",
				message: "paired-node Claude CLI invocation exceeded its hard timeout"
			}
		};
	} finally {
		clearTimeout(hardDeadlineTimer);
		replyBackendCompleted = true;
		if (replyBackendHandle) contextParams.replyOperation?.detachBackend(replyBackendHandle);
		contextParams.abortSignal?.removeEventListener("abort", abortNodeRun);
	}
	if (hardDeadlineReached) nodeResult = {
		ok: false,
		error: {
			code: "TIMEOUT",
			message: "paired-node Claude CLI invocation exceeded its hard timeout"
		}
	};
	if (!nodeResult.ok) {
		const code = nodeResult.error?.code;
		const timedOut = code === "TIMEOUT" || code === "IDLE_TIMEOUT";
		const result = {
			reason: code === "IDLE_TIMEOUT" ? "no-output-timeout" : code === "TIMEOUT" ? "overall-timeout" : code === "ABORTED" ? "manual-cancel" : "exit",
			exitCode: timedOut || code === "ABORTED" ? null : 1,
			exitSignal: null,
			durationMs: Date.now() - startedAt,
			stdout: "",
			stderr: nodeResult.error?.message ?? "paired-node Claude CLI invocation failed",
			timedOut,
			noOutputTimedOut: code === "IDLE_TIMEOUT"
		};
		params.consumeStderr(result.stderr);
		return {
			result,
			nodeRunAbortSignal,
			nodeRunTruncated: false
		};
	}
	const payload = parseNodeClaudeResultPayload(nodeResult);
	if (payload.stderrTail) params.consumeStderr(payload.stderrTail);
	return {
		result: {
			reason: payload.timeoutKind === "idle" ? "no-output-timeout" : payload.timeoutKind === "hard" ? "overall-timeout" : "exit",
			exitCode: payload.timeoutKind ? null : payload.exitCode,
			exitSignal: null,
			durationMs: Date.now() - startedAt,
			stdout: "",
			stderr: payload.stderrTail,
			timedOut: payload.timeoutKind !== void 0,
			noOutputTimedOut: payload.timeoutKind === "idle"
		},
		nodeRunAbortSignal,
		nodeRunTruncated: payload.truncated
	};
}
//#endregion
//#region src/agents/cli-runner/execute-output-buffer.ts
const CLI_RUNNER_OUTPUT_TAIL_BYTES = 64 * 1024;
function appendCliOutputTail(tail, chunk) {
	return truncateUtf8Suffix(`${tail}${chunk}`, CLI_RUNNER_OUTPUT_TAIL_BYTES);
}
//#endregion
//#region src/agents/cli-runner/execute-process.ts
const CLI_RUNNER_OUTPUT_PARSE_BYTES = 1024 * 1024;
function appendCliOutputParseBuffer(buffer, chunk) {
	if (!chunk) return {
		buffer,
		exceeded: false
	};
	const chunkBuffer = Buffer.from(chunk);
	if (buffer.byteLength + chunkBuffer.byteLength <= CLI_RUNNER_OUTPUT_PARSE_BYTES) return {
		buffer: Buffer.concat([buffer, chunkBuffer], buffer.byteLength + chunkBuffer.byteLength),
		exceeded: false
	};
	const remainingBytes = CLI_RUNNER_OUTPUT_PARSE_BYTES - buffer.byteLength;
	return {
		buffer: remainingBytes <= 0 ? buffer : Buffer.concat([buffer, chunkBuffer.subarray(0, remainingBytes)], CLI_RUNNER_OUTPUT_PARSE_BYTES),
		exceeded: true
	};
}
async function executeCliProcess(params) {
	const context = params.context;
	const runParams = context.params;
	const failoverContext = {
		provider: runParams.provider,
		model: context.modelId,
		sessionId: runParams.sessionId,
		lane: runParams.lane
	};
	const outputErrorContext = {
		...failoverContext,
		runId: runParams.runId
	};
	const hasJsonlOutput = params.outputMode === "jsonl";
	if (params.useManagedClaudeLiveSession) {
		if (!hasJsonlOutput) throw new Error("Claude live session requires JSONL streaming parser");
		runParams.onExecutionPhase?.({
			phase: "process_spawned",
			provider: runParams.provider,
			model: context.modelId,
			backend: context.backendResolved.id
		});
		params.claimFallbackCleanup();
		const liveResult = await runClaudeLiveSessionTurn({
			context,
			args: params.executionArgs,
			executableCommand: params.executionCommand,
			executableLeadingArgv: params.executionLeadingArgv,
			env: params.env,
			prompt: params.prompt,
			useResume: params.useResume,
			forceNewSession: params.cliSessionIdToUse === void 0 && context.openClawHistoryPrompt !== void 0,
			requiredSessionGeneration: params.cliSessionIdToUse ? context.requiredClaudeLiveSessionGeneration : void 0,
			noOutputTimeoutMs: params.noOutputTimeoutMs,
			getProcessSupervisor: params.deps.getProcessSupervisor,
			onAssistantDelta: params.events.emitCliAssistantDelta,
			onThinkingDelta: params.events.emitCliThinkingDelta,
			onThinkingProgress: params.events.emitCliThinkingProgress,
			onToolUseStart: params.events.emitCliToolUseStart,
			onToolResult: params.events.emitCliToolResult,
			resolveToolResultTerminalOutcome: (event) => {
				const outcome = params.toolTracking.resolveCliLoopbackTerminalOutcome(event.toolCallId);
				return outcome?.outcome === "completed" ? void 0 : outcome;
			},
			onCommentaryText: params.events.emitLiveEvents && runParams.emitCommentaryText ? params.events.emitCliCommentaryText : void 0,
			onMcpCaptureReady: params.toolTracking.beginGatewayCapture,
			cleanup: async () => {
				await params.fallbackCleanup?.();
			},
			onSessionId: params.observeForkSuccessor,
			onAssistantMessage: params.diagnostics?.observeAssistantMessage,
			onUsage: params.diagnostics?.observeUsage,
			onCliOutput: params.diagnostics?.observeCliOutput,
			onRequestPayload: params.diagnostics?.observeRequestPayload,
			onPhase: params.options?.onPhase
		});
		params.options?.onPhase?.("resolve");
		const rawText = liveResult.output.text;
		return {
			...liveResult.output,
			rawText,
			finalPromptText: params.prompt,
			text: applyPluginTextReplacements(rawText, context.backendResolved.textTransforms?.output)
		};
	}
	const streamingParser = hasJsonlOutput ? createCliJsonlStreamingParser({
		backend: params.backend,
		providerId: context.backendResolved.id,
		parseJsonlEvent: context.backendResolved.parseJsonlEvent,
		onAssistantDelta: params.events.emitCliAssistantDelta,
		onThinkingDelta: params.events.emitCliThinkingDelta,
		onThinkingProgress: params.events.emitCliThinkingProgress,
		onPlanUpdate: params.events.emitCliPlanUpdate,
		onToolUseStart: params.events.emitParsedToolUseStart,
		onToolResult: params.events.emitParsedToolResult,
		onDisplayToolUseStart: params.events.emitCliDisplayToolUseStart,
		onDisplayToolResult: params.events.emitCliDisplayToolResult,
		onCommentaryText: params.events.emitLiveEvents && runParams.emitCommentaryText ? params.events.emitCliCommentaryText : void 0,
		onSessionId: params.observeForkSuccessor,
		onAssistantMessage: params.diagnostics?.observeAssistantMessage,
		onUsage: params.diagnostics?.observeUsage
	}) : null;
	let stdoutTail = "";
	let stdoutParseBuffer = Buffer.alloc(0);
	let stdoutBytes = 0;
	const stdoutHash = crypto.createHash("sha256");
	let stdoutParseExceeded = false;
	let stderrTail = "";
	let stderrParseBuffer = Buffer.alloc(0);
	let stderrBytes = 0;
	const stderrHash = crypto.createHash("sha256");
	let stderrParseExceeded = false;
	const consumeStdout = (chunk) => {
		const chunkBytes = Buffer.byteLength(chunk);
		params.diagnostics?.observeCliOutput(chunk, "stdout", chunkBytes);
		stdoutBytes += chunkBytes;
		stdoutHash.update(chunk);
		stdoutTail = appendCliOutputTail(stdoutTail, chunk);
		if (!stdoutParseExceeded) {
			const next = appendCliOutputParseBuffer(stdoutParseBuffer, chunk);
			stdoutParseBuffer = next.buffer;
			stdoutParseExceeded = next.exceeded;
		}
		streamingParser?.push(chunk);
	};
	const consumeStderr = (chunk) => {
		params.diagnostics?.observeCliOutput(chunk, "stderr");
		stderrBytes += Buffer.byteLength(chunk);
		stderrHash.update(chunk);
		stderrTail = appendCliOutputTail(stderrTail, chunk);
		if (!stderrParseExceeded) {
			const next = appendCliOutputParseBuffer(stderrParseBuffer, chunk);
			stderrParseBuffer = next.buffer;
			stderrParseExceeded = next.exceeded;
		}
	};
	runParams.onExecutionPhase?.({
		phase: "process_spawned",
		provider: runParams.provider,
		model: context.modelId,
		backend: context.backendResolved.id
	});
	let managedRunPid;
	let nodeRunAbortSignal;
	let nodeRunTruncated = false;
	let result;
	params.diagnostics?.observeRequestPayload(params.stdin ?? params.argsPrompt ?? "");
	if (params.nodePlacement) {
		const nodeRun = await executeNodeClaudeRun({
			context,
			nodePlacement: params.nodePlacement,
			executionArgs: params.executionArgs,
			stdinPayload: params.stdin ?? "",
			...params.nodeSystemPrompt !== void 0 ? { nodeSystemPrompt: params.nodeSystemPrompt } : {},
			...params.nodeEnv ? { nodeEnv: params.nodeEnv } : {},
			...params.nodeClearEnv ? { nodeClearEnv: params.nodeClearEnv } : {},
			noOutputTimeoutMs: params.noOutputTimeoutMs,
			consumeStdout,
			consumeStderr,
			deps: params.deps
		});
		result = nodeRun.result;
		nodeRunAbortSignal = nodeRun.nodeRunAbortSignal;
		nodeRunTruncated = nodeRun.nodeRunTruncated;
	} else {
		const supervisor = params.deps.getProcessSupervisor();
		const scopeKey = buildCliSupervisorScopeKey({
			backend: params.backend,
			backendId: context.backendResolved.id,
			cliSessionId: params.useResume ? params.resolvedSessionId : void 0
		});
		if (runParams.abortSignal?.aborted) throw createCliAbortError();
		const abortManagedRun = () => supervisor.cancel(runParams.runId, "manual-cancel");
		runParams.abortSignal?.addEventListener("abort", abortManagedRun, { once: true });
		try {
			const managedRun = await supervisor.spawn({
				runId: runParams.runId,
				sessionId: runParams.sessionId,
				backendId: context.backendResolved.id,
				scopeKey,
				replaceExistingScope: Boolean(params.useResume && scopeKey),
				mode: "child",
				argv: [
					params.executionCommand,
					...params.executionLeadingArgv,
					...params.executionArgs
				],
				timeoutMs: runParams.timeoutMs,
				noOutputTimeoutMs: params.noOutputTimeoutMs,
				cwd: context.cwd ?? context.workspaceDir,
				env: params.env,
				input: params.stdin ?? "",
				secretInput: context.preparedBackend.secretInput,
				captureOutput: false,
				onStdout: consumeStdout,
				onStderr: consumeStderr
			});
			managedRunPid = managedRun.pid;
			let replyBackendCompleted = false;
			const replyBackendHandle = runParams.replyOperation ? {
				kind: "cli",
				cancel: () => managedRun.cancel("manual-cancel"),
				isStreaming: () => !replyBackendCompleted
			} : void 0;
			if (replyBackendHandle) runParams.replyOperation?.attachBackend(replyBackendHandle);
			try {
				result = await managedRun.wait();
			} finally {
				replyBackendCompleted = true;
				if (replyBackendHandle) runParams.replyOperation?.detachBackend(replyBackendHandle);
			}
		} finally {
			runParams.abortSignal?.removeEventListener("abort", abortManagedRun);
		}
	}
	if ((runParams.abortSignal?.aborted || nodeRunAbortSignal?.aborted) && result.reason === "manual-cancel") throw createCliAbortError();
	params.options?.onPhase?.("resolve");
	streamingParser?.finish();
	const streamingParserErrorText = params.outputMode === "jsonl" ? streamingParser?.getErrorText() ?? null : null;
	if (streamingParserErrorText) throw new FailoverError(streamingParserErrorText, {
		reason: "format",
		...failoverContext,
		status: resolveFailoverStatus("format")
	});
	if (nodeRunTruncated && result.exitCode === 0 && !result.timedOut && !streamingParser?.getOutput()) throw new FailoverError("paired node truncated the Claude CLI stream before the terminal result; refusing to accept partial output.", {
		reason: "format",
		...failoverContext,
		status: resolveFailoverStatus("format")
	});
	const stdout = stdoutParseBuffer.toString("utf8").trim();
	const stdoutDiagnostic = stdoutTail.trim();
	const stderr = stderrParseBuffer.toString("utf8").trim();
	const stderrDiagnostic = stderrTail.trim();
	const processDiagnostics = {
		backendId: context.backendResolved.id,
		processReason: result.reason,
		exitCode: result.exitCode,
		exitSignal: result.exitSignal,
		durationMs: result.durationMs,
		stdoutBytes,
		stdoutHash: stdoutHash.digest("hex").slice(0, 12),
		stderrBytes,
		stderrHash: stderrHash.digest("hex").slice(0, 12),
		useResume: params.useResume
	};
	if (params.logOutputText) {
		if (stdoutDiagnostic) cliBackendLog.info(`cli stdout:\n${stdoutDiagnostic}`);
		if (stderrDiagnostic) cliBackendLog.info(`cli stderr:\n${stderrDiagnostic}`);
	}
	if (shouldLogVerbose()) {
		if (stdoutDiagnostic) cliBackendLog.debug(`cli stdout:\n${stdoutDiagnostic}`);
		if (stderrDiagnostic) cliBackendLog.debug(`cli stderr:\n${stderrDiagnostic}`);
	}
	const streamedJsonlOutput = params.outputMode === "jsonl" ? streamingParser?.getOutput() ?? null : null;
	const parsedStructuredOutput = streamedJsonlOutput ?? (params.outputMode === "json" && !stdoutParseExceeded ? parseCliOutput({
		raw: stdout,
		backend: params.backend,
		providerId: context.backendResolved.id,
		outputMode: params.outputMode,
		fallbackSessionId: params.resolvedSessionId
	}) : null);
	if (parsedStructuredOutput?.terminalFailure) {
		const terminalError = createCliOutputFailoverError({
			output: parsedStructuredOutput,
			...outputErrorContext
		});
		if (terminalError) throw terminalError;
	}
	if (result.exitCode !== 0 || result.reason !== "exit") {
		params.options?.onPhase?.("send");
		if (result.reason === "no-output-timeout" || result.noOutputTimedOut) {
			const timeoutSeconds = Math.round(params.noOutputTimeoutMs / 1e3);
			cliBackendLog.warn(`cli watchdog timeout: provider=${runParams.provider} model=${context.modelId} session=${params.resolvedSessionId ?? runParams.sessionId} noOutputTimeoutMs=${params.noOutputTimeoutMs} pid=${managedRunPid ?? "node"}`);
			const retryable = !params.events.hasObservedCliActivity() && !stdoutDiagnostic && !stderrDiagnostic;
			const deferNotice = retryable && Boolean(params.cliSessionIdToUse) && Boolean(params.resolvedSessionId) && Boolean(context.openClawHistoryPrompt) && Boolean(runParams.sessionKey) && runParams.timeoutMs - (Date.now() - context.started) > 0;
			if (runParams.sessionKey && params.events.emitLiveEvents && !deferNotice) {
				const stallNotice = [
					`CLI agent (${runParams.provider}) produced no output for ${timeoutSeconds}s and was terminated.`,
					"It may have been waiting for interactive input or an approval prompt.",
					...params.nodePlacement ? ["Check the node's Claude permission settings for pending prompts."] : ["For Claude Code, prefer --permission-mode bypassPermissions --print."]
				].join(" ");
				const routing = resolveEventSessionRoutingPolicy({
					cfg: runParams.config,
					sessionKey: runParams.sessionKey,
					channel: runParams.messageProvider,
					accountId: runParams.agentAccountId
				});
				params.deps.enqueueSystemEvent(stallNotice, { sessionKey: resolveEventSessionKeyForPolicy(runParams.sessionKey, routing) });
				params.deps.requestHeartbeat(scopedHeartbeatWakeOptionsForPolicy(runParams.sessionKey, {
					source: "cli-watchdog",
					intent: "event",
					reason: "cli:watchdog:stall"
				}, routing));
			}
			throw new FailoverError(`CLI produced no output for ${timeoutSeconds}s and was terminated.`, {
				reason: "timeout",
				...failoverContext,
				status: resolveFailoverStatus("timeout"),
				code: retryable ? "cli_no_output_timeout" : void 0,
				cliTimeout: {
					mode: "no-output",
					timeoutSeconds,
					observedActivity: params.events.hasObservedCliActivity(),
					activeToolCount: params.events.activeParsedToolCount(),
					backgroundTaskCount: 0
				}
			});
		}
		if (result.reason === "overall-timeout") {
			const timeoutSeconds = Math.round(runParams.timeoutMs / 1e3);
			throw new FailoverError(`CLI exceeded timeout (${timeoutSeconds}s) and was terminated.`, {
				reason: "timeout",
				...failoverContext,
				status: resolveFailoverStatus("timeout"),
				code: "cli_overall_timeout",
				cliTimeout: {
					mode: "overall",
					timeoutSeconds,
					observedActivity: params.events.hasObservedCliActivity(),
					activeToolCount: params.events.activeParsedToolCount(),
					backgroundTaskCount: 0
				}
			});
		}
		const errorCandidates = [
			stderr,
			stdout,
			stderrDiagnostic,
			stdoutDiagnostic
		].filter(Boolean);
		const structuredError = errorCandidates.map((candidate) => extractCliErrorMessage(candidate)).find(Boolean) ?? null;
		let classifiedErrorText = structuredError;
		let reason = structuredError ? classifyFailoverReason(structuredError, { provider: runParams.provider }) : null;
		if (!reason) for (const candidate of errorCandidates) {
			reason = classifyFailoverReason(candidate, { provider: runParams.provider });
			if (reason) {
				classifiedErrorText = candidate;
				break;
			}
		}
		const errorText = structuredError || classifiedErrorText || errorCandidates[0] || "CLI failed.";
		reason ??= "unknown";
		const retryCode = reason === "context_overflow" ? "cli_context_overflow" : reason === "unknown" && result.reason === "exit" && errorCandidates.length === 0 && !params.events.hasObservedCliActivity() ? "cli_unknown_empty_failure" : void 0;
		throw new FailoverError(errorText, {
			reason,
			...failoverContext,
			status: resolveFailoverStatus(reason),
			code: retryCode
		});
	}
	if (stdoutParseExceeded && !streamedJsonlOutput) throw new FailoverError(`CLI stdout exceeded ${CLI_RUNNER_OUTPUT_PARSE_BYTES} bytes; refusing to parse truncated output.`, {
		reason: "format",
		...failoverContext,
		status: resolveFailoverStatus("format")
	});
	const parsed = parsedStructuredOutput ?? parseCliOutput({
		raw: stdout,
		backend: params.backend,
		providerId: context.backendResolved.id,
		outputMode: params.outputMode,
		fallbackSessionId: params.resolvedSessionId
	});
	const parsedError = createCliOutputFailoverError({
		output: parsed,
		...outputErrorContext
	});
	if (parsedError) throw parsedError;
	const rawText = parsed.text;
	cliBackendLog.info(`cli turn: provider=${runParams.provider} model=${context.modelId} durationMs=${Date.now() - params.cliTurnStartedAt} ${formatCliBackendOutputDigest(rawText)}`);
	return {
		...parsed,
		diagnostics: {
			...parsed.diagnostics,
			process: processDiagnostics
		},
		rawText,
		finalPromptText: params.prompt,
		text: applyPluginTextReplacements(rawText, context.backendResolved.textTransforms?.output)
	};
}
const normalizeCliMessagingToolName = stripOpenClawMcpToolPrefix;
function extractCliMessagingTarget(context, toolName, args) {
	const normalizedToolName = normalizeCliMessagingToolName(toolName);
	const currentProvider = context.params.messageChannel ?? context.params.messageProvider;
	const hasExplicitProvider = typeof args.provider === "string" && args.provider.trim().length > 0 || typeof args.channel === "string" && args.channel.trim().length > 0;
	const targetArgs = normalizedToolName === "message" && currentProvider && !hasExplicitProvider ? {
		...args,
		provider: currentProvider
	} : args;
	if (!isMessagingToolTargetEvidenceAction(normalizedToolName, targetArgs)) return;
	return extractMessagingToolSend(normalizedToolName, targetArgs, {
		config: context.params.config,
		currentChannelId: context.params.currentChannelId,
		currentThreadId: context.params.currentThreadTs,
		currentMessageId: context.params.currentMessageId
	});
}
function buildMessagingToolSendEvidenceKey(send) {
	return crypto.createHash("sha256").update(JSON.stringify([
		send.tool,
		send.provider,
		send.accountId,
		send.to,
		send.threadId,
		send.threadImplicit,
		send.threadSuppressed,
		send.text,
		send.mediaUrls
	])).digest("hex");
}
function extractCliMessagingContent(args, result) {
	const text = [
		"message",
		"SendMessage",
		"content",
		"text",
		"caption"
	].map((key) => args[key]).find((value) => typeof value === "string" && value.trim().length > 0);
	const mediaUrls = [...collectMessagingMediaUrlsFromRecord(args), ...collectMessagingMediaUrlsFromToolResult(result)].filter((url, index, all) => all.indexOf(url) === index);
	return {
		...text ? { text } : {},
		...mediaUrls.length > 0 ? { mediaUrls } : {}
	};
}
function appendUniqueCliMessagingEvidence(values, valueKeys, additions) {
	for (const addition of additions) {
		if (!addition || valueKeys.has(addition)) continue;
		if (values.length >= 64) {
			const removed = values.shift();
			if (removed) valueKeys.delete(removed);
		}
		values.push(addition);
		valueKeys.add(addition);
	}
}
//#endregion
//#region src/agents/cli-runner/execute-tool-tracking.ts
const CLI_LOOPBACK_CORRELATION_MAX_CALLS = 64;
const CLI_MCP_DELIVERY_DRAIN_GRACE_MS = 5e3;
const CLI_MCP_REQUEST_ADMISSION_GRACE_MS = 250;
function createCliToolTracking(context) {
	let gatewayCaptureKey;
	let yielded = false;
	let didSendViaMessagingTool = false;
	let didDeliverSourceReplyViaMessageTool = false;
	let inFlightUnclassifiedMcpRequests = 0;
	let inFlightMessagingToolCalls = 0;
	const inFlightPreparedMessagingCalls = /* @__PURE__ */ new Set();
	const pendingMessagingCalls = /* @__PURE__ */ new Map();
	const cliLoopbackCalls = [];
	const activeCliTools = /* @__PURE__ */ new Map();
	let cliLoopbackCorrelationOverflowed = false;
	const messagingToolSentTexts = [];
	const messagingToolSentTextKeys = /* @__PURE__ */ new Set();
	const messagingToolSentMediaUrls = [];
	const messagingToolSentMediaUrlKeys = /* @__PURE__ */ new Set();
	const messagingToolSentTargets = [];
	const messagingToolSentTargetKeys = /* @__PURE__ */ new Set();
	const messagingToolSourceReplyPayloads = [];
	const matchesCliLoopbackCall = (toolName, toolArgs, call) => normalizeCliMessagingToolName(toolName) === call.toolName && isDeepStrictEqual(toolArgs, call.args);
	const markCliLoopbackCallsAmbiguous = (calls, activeEntries = Array.from(activeCliTools.entries()).filter(([, activeTool]) => activeTool.loopbackCall !== void 0 && calls.includes(activeTool.loopbackCall))) => {
		const groups = /* @__PURE__ */ new Set();
		for (const call of calls) if (call.ambiguityGroup) groups.add(call.ambiguityGroup);
		for (const [, activeTool] of activeEntries) if (activeTool.ambiguityGroup) groups.add(activeTool.ambiguityGroup);
		const group = groups.values().next().value ?? {
			calls: /* @__PURE__ */ new Set(),
			activeToolCallIds: /* @__PURE__ */ new Set()
		};
		for (const existing of groups) {
			if (existing === group) continue;
			for (const call of existing.calls) {
				call.ambiguityGroup = group;
				group.calls.add(call);
			}
			for (const toolCallId of existing.activeToolCallIds) {
				const activeTool = activeCliTools.get(toolCallId);
				if (activeTool) {
					activeTool.ambiguityGroup = group;
					group.activeToolCallIds.add(toolCallId);
				}
			}
			existing.calls.clear();
			existing.activeToolCallIds.clear();
		}
		for (const call of calls) {
			call.ambiguous = true;
			call.ambiguityGroup = group;
			group.calls.add(call);
		}
		for (const [toolCallId, activeTool] of activeEntries) {
			activeTool.loopbackAmbiguous = true;
			activeTool.ambiguityGroup = group;
			group.activeToolCallIds.add(toolCallId);
		}
	};
	const matchingActiveCliTools = (call) => Array.from(activeCliTools.entries()).filter(([, activeTool]) => matchesCliLoopbackCall(activeTool.toolName, activeTool.args, call));
	const markCliLoopbackSignatureAmbiguous = (call) => {
		const calls = cliLoopbackCalls.filter((candidate) => matchesCliLoopbackCall(call.toolName, call.args, candidate.admitted));
		markCliLoopbackCallsAmbiguous(calls, matchingActiveCliTools(call));
	};
	const retainCliLoopbackCall = (call) => {
		if (cliLoopbackCalls.length >= CLI_LOOPBACK_CORRELATION_MAX_CALLS) {
			cliLoopbackCorrelationOverflowed = true;
			for (const activeTool of activeCliTools.values()) if (activeTool.loopbackCall || activeTool.toolName.startsWith("mcp__")) activeTool.loopbackAmbiguous = true;
			cliLoopbackCalls.length = 0;
			return;
		}
		const retained = {
			admitted: call,
			current: call,
			ambiguous: false
		};
		cliLoopbackCalls.push(retained);
		return retained;
	};
	const bindCliLoopbackCall = (call, toolCallId, activeTool) => {
		call.boundToolCallId = toolCallId;
		activeTool.loopbackCall = call;
		activeTool.loopbackAmbiguous ||= call.ambiguous;
		if (call.ambiguityGroup) {
			activeTool.ambiguityGroup = call.ambiguityGroup;
			call.ambiguityGroup.activeToolCallIds.add(toolCallId);
		}
	};
	const removeCliLoopbackCall = (call) => {
		if (!call) return;
		const index = cliLoopbackCalls.indexOf(call);
		if (index >= 0) cliLoopbackCalls.splice(index, 1);
	};
	const retireCliLoopbackCorrelation = (toolCallId, activeTool) => {
		removeCliLoopbackCall(activeTool?.loopbackCall);
		const group = activeTool?.ambiguityGroup;
		if (!group) return;
		group.activeToolCallIds.delete(toolCallId);
		const hasUnboundCall = Array.from(group.calls).some((call) => call.boundToolCallId === void 0 && cliLoopbackCalls.includes(call));
		if (group.activeToolCallIds.size > 0 || hasUnboundCall) return;
		for (const call of group.calls) removeCliLoopbackCall(call);
		group.calls.clear();
	};
	const commitMessagingToolResult = (params) => {
		if (!isDeliveredMessagingToolResult(params)) return;
		didSendViaMessagingTool = true;
		const toolArgs = params.args ?? {};
		const isMessagingSend = isMessagingToolSendAction(params.toolName, toolArgs);
		const content = isMessagingSend ? extractCliMessagingContent(toolArgs, params.result) : {};
		if (isMessagingSend) {
			appendUniqueCliMessagingEvidence(messagingToolSentTexts, messagingToolSentTextKeys, content.text ? [content.text] : []);
			appendUniqueCliMessagingEvidence(messagingToolSentMediaUrls, messagingToolSentMediaUrlKeys, content.mediaUrls ?? []);
			if (isDeliveredMessageToolOnlySourceReplyResult({
				sourceReplyDeliveryMode: context.params.sourceReplyDeliveryMode,
				toolName: params.toolName,
				args: params.args,
				result: params.result,
				isError: params.isError
			})) {
				didDeliverSourceReplyViaMessageTool = true;
				const payload = extractMessagingToolSourceReplyPayload(params.result);
				if (payload) {
					if (messagingToolSourceReplyPayloads.length >= 64) messagingToolSourceReplyPayloads.shift();
					messagingToolSourceReplyPayloads.push(payload);
				}
			}
		}
		if (!params.target) return;
		const targetWithContent = {
			...extractMessagingToolSendResult(params.target, params.result),
			...content
		};
		const evidenceKey = buildMessagingToolSendEvidenceKey(targetWithContent);
		if (messagingToolSentTargetKeys.has(evidenceKey)) return;
		if (messagingToolSentTargets.length >= 64) {
			const removed = messagingToolSentTargets.shift();
			if (removed) messagingToolSentTargetKeys.delete(buildMessagingToolSendEvidenceKey(removed));
		}
		messagingToolSentTargets.push(targetWithContent);
		messagingToolSentTargetKeys.add(evidenceKey);
	};
	const isPreparedInternalSourceReply = async (call) => {
		if (context.params.sourceReplyDeliveryMode !== "message_tool_only" || normalizeCliMessagingToolName(call.toolName) !== "message" || call.args.action !== "send" || !context.params.config) return false;
		return await shouldUseInternalSourceReplySink({
			cfg: context.params.config,
			action: "send",
			sessionKey: context.params.sessionKey,
			sourceReplyDeliveryMode: context.params.sourceReplyDeliveryMode,
			toolContext: {
				currentChannelProvider: context.params.messageChannel ?? context.params.messageProvider,
				currentChannelId: context.params.currentChannelId,
				currentThreadTs: context.params.currentThreadTs,
				currentMessageId: context.params.currentMessageId
			}
		}, call.args);
	};
	const beginGatewayCapture = (captureKey) => {
		if (!captureKey || gatewayCaptureKey === captureKey) return;
		if (gatewayCaptureKey) throw new Error("CLI MCP capture key changed during an active attempt");
		context.preparedBackend.mcpClientGrantCapture?.activate(captureKey);
		gatewayCaptureKey = captureKey;
		const isPotentialDelivery = (toolName) => isMessagingTool(normalizeCliMessagingToolName(toolName));
		const isPreparedDelivery = (toolName, toolArgs) => toolArgs.dryRun !== true && isMessagingToolDeliveryAction(normalizeCliMessagingToolName(toolName), toolArgs);
		beginMcpLoopbackToolCallCapture({
			captureKey,
			onYield: () => {
				yielded = true;
			},
			onRequestStart: () => {
				inFlightUnclassifiedMcpRequests += 1;
			},
			onRequestClassified: () => {
				inFlightUnclassifiedMcpRequests = Math.max(0, inFlightUnclassifiedMcpRequests - 1);
			},
			onToolCallStart: (call) => {
				const retained = retainCliLoopbackCall(call);
				const candidates = matchingActiveCliTools(call);
				let matched = retained && candidates.length === 1 && !candidates[0]?.[1].loopbackCall && !candidates[0]?.[1].loopbackAmbiguous ? candidates[0] : void 0;
				if (retained && matched) bindCliLoopbackCall(retained, matched[0], matched[1]);
				else if (retained && candidates.length > 0) {
					markCliLoopbackSignatureAmbiguous(call);
					matched = candidates.find(([, activeTool]) => !activeTool.loopbackCall);
					if (matched) bindCliLoopbackCall(retained, matched[0], matched[1]);
				}
				if (isPotentialDelivery(call.toolName)) inFlightMessagingToolCalls += 1;
				return matched?.[0];
			},
			onToolCallUpdate: ({ previous, current }) => {
				const candidates = cliLoopbackCalls.filter((candidate) => matchesCliLoopbackCall(previous.toolName, previous.args, candidate.current));
				const candidate = candidates.at(0);
				if (candidates.length === 1 && candidate && !candidate.ambiguous) candidate.current = current;
				else if (candidates.length > 0) markCliLoopbackCallsAmbiguous(candidates);
				inFlightPreparedMessagingCalls.delete(previous);
				const wasDelivery = isPotentialDelivery(previous.toolName);
				const isDelivery = isPreparedDelivery(current.toolName, current.args);
				if (wasDelivery !== isDelivery) inFlightMessagingToolCalls = Math.max(0, inFlightMessagingToolCalls + (isDelivery ? 1 : -1));
				if (isDelivery) inFlightPreparedMessagingCalls.add(current);
			},
			onToolCallFinish: (call, { prepared }) => {
				if (prepared ? isPreparedDelivery(call.toolName, call.args) : isPotentialDelivery(call.toolName)) inFlightMessagingToolCalls = Math.max(0, inFlightMessagingToolCalls - 1);
				inFlightPreparedMessagingCalls.delete(call);
			},
			onToolCallResult: (call) => {
				const terminalOutcome = call.outcome === "blocked" ? {
					outcome: call.outcome,
					deniedReason: call.deniedReason
				} : { outcome: call.outcome };
				const correlated = call.correlationId ? cliLoopbackCalls.find((candidate) => candidate.boundToolCallId === call.correlationId) : void 0;
				const candidates = correlated ? [correlated] : cliLoopbackCalls.filter((candidate) => matchesCliLoopbackCall(call.toolName, call.args, candidate.current));
				if (candidates.length === 1 && candidates[0]) candidates[0].outcome = terminalOutcome;
				else if (candidates.length > 1) markCliLoopbackCallsAmbiguous(candidates);
				const toolName = normalizeCliMessagingToolName(call.toolName);
				if (isMessagingToolDeliveryAction(toolName, call.args)) commitMessagingToolResult({
					toolName,
					target: extractCliMessagingTarget(context, toolName, call.args),
					args: call.args,
					result: "result" in call ? call.result : void 0,
					isError: call.outcome !== "completed"
				});
			}
		});
	};
	const handleCliToolUseStart = (event) => {
		if (event.kind !== "server_tool_use") {
			const activeTool = {
				toolName: event.name,
				args: event.args,
				loopbackAmbiguous: cliLoopbackCorrelationOverflowed && event.name.startsWith("mcp__")
			};
			activeCliTools.set(event.toolCallId, activeTool);
			const admittedCall = {
				toolName: normalizeCliMessagingToolName(event.name),
				args: event.args
			};
			const pendingCandidates = cliLoopbackCalls.filter((candidate) => candidate.boundToolCallId === void 0 && matchesCliLoopbackCall(event.name, event.args, candidate.admitted));
			const hasAssociatedPeer = matchingActiveCliTools(admittedCall).some(([toolCallId, peer]) => toolCallId !== event.toolCallId && (peer.loopbackCall !== void 0 || peer.loopbackAmbiguous));
			const pending = pendingCandidates[0];
			if (hasAssociatedPeer || pendingCandidates.length > 1 || pending?.ambiguous) {
				markCliLoopbackSignatureAmbiguous(admittedCall);
				if (pending) bindCliLoopbackCall(pending, event.toolCallId, activeTool);
			} else if (pendingCandidates.length === 1 && pending) bindCliLoopbackCall(pending, event.toolCallId, activeTool);
		}
		const toolName = normalizeCliMessagingToolName(event.name);
		if (event.kind === "server_tool_use" || gatewayCaptureKey || event.args.dryRun === true || !isMessagingToolDeliveryAction(toolName, event.args)) return;
		if (pendingMessagingCalls.size >= 64) {
			const oldestToolCallId = pendingMessagingCalls.keys().next().value;
			if (oldestToolCallId !== void 0) {
				pendingMessagingCalls.delete(oldestToolCallId);
				didSendViaMessagingTool = true;
			}
		}
		pendingMessagingCalls.set(event.toolCallId, {
			toolName,
			args: event.args,
			target: extractCliMessagingTarget(context, toolName, event.args)
		});
	};
	const handleCliToolResult = (event) => {
		const activeTool = activeCliTools.get(event.toolCallId);
		activeCliTools.delete(event.toolCallId);
		retireCliLoopbackCorrelation(event.toolCallId, activeTool);
		const pending = pendingMessagingCalls.get(event.toolCallId);
		if (pending) {
			pendingMessagingCalls.delete(event.toolCallId);
			commitMessagingToolResult({
				toolName: pending.toolName,
				target: pending.target,
				args: pending.args,
				result: event.result,
				isError: event.isError
			});
		}
	};
	const resolveCliLoopbackTerminalOutcome = (toolCallId) => {
		const activeTool = activeCliTools.get(toolCallId);
		if (activeTool?.loopbackAmbiguous) return { outcome: "unknown" };
		return activeTool?.loopbackCall?.outcome;
	};
	const finishDeliveryTracking = async (params) => {
		try {
			if (!gatewayCaptureKey && pendingMessagingCalls.size > 0) {
				const calls = Array.from(pendingMessagingCalls.values());
				if ((await Promise.all(calls.map(isPreparedInternalSourceReply))).some((internal) => !internal)) {
					didSendViaMessagingTool = true;
					params.recordRunError(/* @__PURE__ */ new Error("CLI JSONL message tool call remained unresolved after exit"));
				} else params.recordRunError(/* @__PURE__ */ new Error("CLI JSONL source reply call remained unresolved after exit"));
			}
			if (!gatewayCaptureKey) return;
			if (await waitForMcpLoopbackToolCallCaptureIdle(gatewayCaptureKey, {
				timeoutMs: CLI_MCP_DELIVERY_DRAIN_GRACE_MS,
				admissionGraceMs: CLI_MCP_REQUEST_ADMISSION_GRACE_MS
			})) return;
			if (params.useManagedClaudeLiveSession) await rotateClaudeLiveMcpCaptureKeyForContext(context);
			const internalCount = (await Promise.all(Array.from(inFlightPreparedMessagingCalls).map(isPreparedInternalSourceReply))).filter(Boolean).length;
			if (inFlightUnclassifiedMcpRequests > 0 || inFlightMessagingToolCalls > internalCount) {
				didSendViaMessagingTool = true;
				params.recordRunError(/* @__PURE__ */ new Error("CLI message tool call remained in flight after exit"));
			} else if (inFlightMessagingToolCalls > 0) params.recordRunError(/* @__PURE__ */ new Error("CLI source reply call remained in flight after exit"));
		} catch (error) {
			if (pendingMessagingCalls.size > 0 || inFlightUnclassifiedMcpRequests > 0 || inFlightMessagingToolCalls > 0) didSendViaMessagingTool = true;
			params.recordRunError(error);
		}
	};
	const finalizeCapture = (finalizeParsedTools) => {
		try {
			finalizeParsedTools();
		} finally {
			if (gatewayCaptureKey) try {
				context.preparedBackend.mcpClientGrantCapture?.deactivate(gatewayCaptureKey);
			} finally {
				clearMcpLoopbackToolCallCapture(gatewayCaptureKey);
			}
		}
	};
	const evidence = () => ({
		didSendViaMessagingTool,
		didDeliverSourceReplyViaMessageTool,
		messagingToolSentTexts,
		messagingToolSentMediaUrls,
		messagingToolSentTargets,
		messagingToolSourceReplyPayloads
	});
	return {
		beginGatewayCapture,
		handleCliToolUseStart,
		handleCliToolResult,
		resolveCliLoopbackTerminalOutcome,
		finishDeliveryTracking,
		finalizeCapture,
		withExecutionEvidence(output) {
			const current = evidence();
			return {
				...output,
				...yielded ? { yielded: true } : {},
				...current.didSendViaMessagingTool ? { didSendViaMessagingTool: true } : {},
				...current.didDeliverSourceReplyViaMessageTool ? { didDeliverSourceReplyViaMessageTool: true } : {},
				...current.messagingToolSentTexts.length > 0 ? { messagingToolSentTexts: current.messagingToolSentTexts.slice() } : {},
				...current.messagingToolSentMediaUrls.length > 0 ? { messagingToolSentMediaUrls: current.messagingToolSentMediaUrls.slice() } : {},
				...current.messagingToolSentTargets.length > 0 ? { messagingToolSentTargets: current.messagingToolSentTargets.slice() } : {},
				...current.messagingToolSourceReplyPayloads.length > 0 ? { messagingToolSourceReplyPayloads: current.messagingToolSourceReplyPayloads.slice() } : {}
			};
		},
		attachDeliveryEvidence(error) {
			return attachCliMessagingDeliveryEvidence(error, evidence());
		}
	};
}
//#endregion
//#region src/agents/cli-runner/model-call-diagnostics.ts
/** Trusted turn-level model-call diagnostics for the Claude Code CLI runtime. */
const MAX_CAPTURED_CONTENT_BYTES = 128 * 1024;
const FALLBACK_RESPONSE_RESERVE_BYTES = 16 * 1024;
const MAX_CAPTURED_OUTPUT_MESSAGES = 200;
const MAX_CAPTURED_OUTPUT_BLOCKS = 200;
const TRUNCATED_CONTENT_SUFFIX = "...(truncated)";
const MAX_CAPTURED_OUTPUT_STRUCTURE_BYTES = Buffer.byteLength(JSON.stringify(Array.from({ length: MAX_CAPTURED_OUTPUT_MESSAGES }, () => ({
	role: "assistant",
	content: [{
		type: "tool_call",
		name: "",
		id: ""
	}],
	stopReason: ""
}))), "utf8");
function serializedStringContentBytes(value) {
	return Buffer.byteLength(JSON.stringify(value), "utf8") - 2;
}
const TRUNCATED_CONTENT_SUFFIX_BYTES = serializedStringContentBytes(TRUNCATED_CONTENT_SUFFIX);
function truncateSerializedStringSafe(value, maxBytes) {
	if (maxBytes <= 0) return "";
	if (serializedStringContentBytes(value) <= maxBytes) return value;
	let low = 0;
	let high = Math.min(value.length, maxBytes);
	let captured = "";
	while (low <= high) {
		const middle = Math.floor((low + high) / 2);
		const candidate = truncateUtf16Safe(value, middle);
		if (serializedStringContentBytes(candidate) <= maxBytes) {
			captured = candidate;
			low = middle + 1;
		} else high = middle - 1;
	}
	return captured;
}
function releaseFallbackReserve(budget) {
	budget.remainingBytes += budget.fallbackReserveBytes;
	budget.remainingItems += budget.fallbackReserveItems;
	budget.fallbackReserveBytes = 0;
	budget.fallbackReserveItems = 0;
}
function captureTextWithinBudget(value, budget) {
	if (budget.remainingBytes <= 0) {
		budget.truncated = true;
		return;
	}
	const valueBytes = serializedStringContentBytes(value);
	if (valueBytes <= budget.remainingBytes) {
		budget.remainingBytes -= valueBytes;
		return value;
	}
	const suffix = truncateSerializedStringSafe(TRUNCATED_CONTENT_SUFFIX, budget.remainingBytes);
	const captured = `${truncateSerializedStringSafe(value, Math.max(0, budget.remainingBytes - serializedStringContentBytes(suffix)))}${suffix}`;
	budget.remainingBytes -= serializedStringContentBytes(captured);
	budget.truncated = true;
	return captured;
}
function captureBoundedText(value) {
	return captureTextWithinBudget(value, {
		remainingBytes: MAX_CAPTURED_CONTENT_BYTES,
		remainingItems: 1,
		fallbackReserveBytes: 0,
		fallbackReserveItems: 0,
		truncated: false
	}) ?? "";
}
function assistantContentBlock(block, budget) {
	if (!isRecord(block)) return;
	if (block.type === "text" && typeof block.text === "string" && block.text.length > 0) {
		const text = captureTextWithinBudget(block.text, budget);
		return text === void 0 ? void 0 : {
			type: "text",
			text
		};
	}
	if (block.type === "thinking" && typeof block.thinking === "string") {
		const thinking = captureTextWithinBudget(block.thinking, budget);
		return thinking === void 0 ? void 0 : {
			type: "thinking",
			thinking
		};
	}
	if ((block.type === "tool_use" || block.type === "server_tool_use" || block.type === "mcp_tool_use") && typeof block.name === "string") {
		const name = captureTextWithinBudget(block.name, budget);
		if (name === void 0) return;
		const id = typeof block.id === "string" ? captureTextWithinBudget(block.id, budget) : void 0;
		return {
			type: "tool_call",
			name,
			...id !== void 0 ? { id } : {}
		};
	}
}
function isCapturableAssistantContentBlock(block) {
	if (!isRecord(block)) return false;
	return block.type === "text" && typeof block.text === "string" || block.type === "thinking" && typeof block.thinking === "string" || (block.type === "tool_use" || block.type === "server_tool_use" || block.type === "mcp_tool_use") && typeof block.name === "string";
}
function isTextAssistantContentBlock(block) {
	return isRecord(block) && block.type === "text" && typeof block.text === "string" && block.text.length > 0;
}
function assistantMessageHasText(message) {
	if (!isRecord(message)) return false;
	if (typeof message.content === "string") return message.content.length > 0;
	if (!Array.isArray(message.content)) return false;
	const limit = Math.min(message.content.length, MAX_CAPTURED_OUTPUT_BLOCKS);
	for (let index = 0; index < limit; index += 1) if (isTextAssistantContentBlock(message.content[index])) return true;
	return false;
}
function normalizeClaudeAssistantMessage(message, budget) {
	if (!isRecord(message)) return;
	const content = [];
	if (typeof message.content === "string") {
		if (message.content.length === 0) return;
		releaseFallbackReserve(budget);
		const text = captureTextWithinBudget(message.content, budget);
		if (text !== void 0 && budget.remainingItems > 0) {
			content.push({
				type: "text",
				text
			});
			budget.remainingItems -= 1;
		} else if (text !== void 0) budget.truncated = true;
	} else if (Array.isArray(message.content)) {
		const sourceBlocks = message.content.slice(0, MAX_CAPTURED_OUTPUT_BLOCKS);
		if (sourceBlocks.length < message.content.length) budget.truncated = true;
		for (const [index, sourceBlock] of sourceBlocks.entries()) {
			if (isTextAssistantContentBlock(sourceBlock)) releaseFallbackReserve(budget);
			const block = assistantContentBlock(sourceBlock, budget);
			if (block) if (budget.remainingItems > 0) {
				content.push(block);
				budget.remainingItems -= 1;
			} else budget.truncated = true;
			if (budget.remainingBytes <= 0 || budget.remainingItems <= 0) {
				if (sourceBlocks.slice(index + 1).some(isCapturableAssistantContentBlock)) budget.truncated = true;
				break;
			}
		}
	}
	if (content.length === 0) return;
	const stopReason = typeof message.stop_reason === "string" ? captureTextWithinBudget(message.stop_reason, budget) : void 0;
	return {
		role: "assistant",
		content,
		...stopReason !== void 0 ? { stopReason } : {}
	};
}
function hasTextContent(messages) {
	return messages.some((message) => Array.isArray(message.content) && message.content.some((block) => isRecord(block) && block.type === "text" && typeof block.text === "string" && block.text.length > 0));
}
function appendOutputTruncationMarker(messages) {
	const marker = {
		type: "text",
		text: TRUNCATED_CONTENT_SUFFIX
	};
	if (messages.length < MAX_CAPTURED_OUTPUT_MESSAGES) {
		messages.push({
			role: "assistant",
			content: [marker]
		});
		return;
	}
	const lastIndex = messages.length - 1;
	const lastMessage = messages[lastIndex];
	messages[lastIndex] = {
		...lastMessage,
		content: [...Array.isArray(lastMessage?.content) ? lastMessage.content : [], marker]
	};
}
function privateData(params) {
	if (!params.modelContent && !params.errorMessage) return;
	return {
		...params.errorMessage ? { errorMessage: params.errorMessage } : {},
		...params.modelContent ? { modelContent: params.modelContent } : {}
	};
}
function failureKindForClaudeCli(error, abortSignal) {
	if (isFailoverError(error) && error.reason === "timeout") return "timeout";
	const inferred = diagnosticErrorFailureKind(error);
	if (inferred) return inferred;
	return abortSignal?.aborted ? "aborted" : void 0;
}
function usageField(usage) {
	return usage ? { usage } : {};
}
/** Creates one exactly-once Claude CLI model-call lifecycle for a prepared turn. */
function createClaudeCliModelCallDiagnostics(params) {
	if (params.context.backendResolved.id !== "claude-cli" || !areDiagnosticsEnabledForProcess() || !hasInternalDiagnosticEventListeners()) return;
	const now = params.now ?? (() => Date.now());
	const capture = resolveDiagnosticModelContentCapturePolicy(params.context.params.config ?? params.context.contextEngineConfig);
	const contextWindow = params.context.contextWindowInfo;
	const trace = freezeDiagnosticTraceContext(createDiagnosticTraceContextFromActiveScope());
	const baseFields = {
		runId: params.context.params.runId,
		callId: `${params.context.params.runId}:claude-cli:${crypto.randomUUID()}`,
		...params.context.params.sessionKey ? { sessionKey: params.context.params.sessionKey } : {},
		sessionId: params.context.params.sessionId,
		provider: params.context.backendResolved.modelProvider ?? params.context.params.modelProvider ?? "anthropic",
		model: params.context.normalizedModel,
		api: "claude-code",
		transport: params.transport,
		observationUnit: "turn",
		...contextWindow ? {
			contextTokenBudget: contextWindow.tokens,
			contextWindowSource: contextWindow.source,
			...contextWindow.referenceTokens ? { contextWindowReferenceTokens: contextWindow.referenceTokens } : {}
		} : {},
		promptStats: {
			inputMessagesCount: 1,
			inputMessagesChars: params.prompt.length,
			...params.systemPrompt ? { systemPromptChars: params.systemPrompt.length } : {},
			totalChars: params.prompt.length + (params.systemPrompt?.length ?? 0)
		},
		trace
	};
	const capturedAssistantMessages = [];
	const outputContentBudget = {
		remainingBytes: MAX_CAPTURED_CONTENT_BYTES - MAX_CAPTURED_OUTPUT_STRUCTURE_BYTES - TRUNCATED_CONTENT_SUFFIX_BYTES - FALLBACK_RESPONSE_RESERVE_BYTES,
		remainingItems: MAX_CAPTURED_OUTPUT_BLOCKS - 2,
		fallbackReserveBytes: FALLBACK_RESPONSE_RESERVE_BYTES,
		fallbackReserveItems: 1,
		truncated: false
	};
	let started = false;
	let terminalEmitted = false;
	let startedAt = 0;
	let requestPayloadBytes;
	let responseStreamBytes = 0;
	let firstCliOutputAt;
	let observedUsage;
	let observedTerminalUsage;
	const baseModelContent = () => {
		if (!capture.anyModelContent) return;
		const content = {
			...capture.inputMessages ? { inputMessages: cloneDiagnosticContentValue([{
				role: "user",
				content: [{
					type: "text",
					text: captureBoundedText(params.prompt)
				}]
			}]) } : {},
			...capture.systemPrompt && params.systemPrompt ? { systemPrompt: captureBoundedText(params.systemPrompt) } : {}
		};
		return Object.keys(content).length > 0 ? content : void 0;
	};
	const outputMessages = (output) => {
		const messages = capturedAssistantMessages.slice();
		const responseText = output?.rawText ?? output?.text;
		if (!hasTextContent(messages) && responseText && messages.length < MAX_CAPTURED_OUTPUT_MESSAGES) {
			const fallback = normalizeClaudeAssistantMessage({ content: responseText }, outputContentBudget);
			if (fallback) messages.push(fallback);
		}
		if (outputContentBudget.truncated) appendOutputTruncationMarker(messages);
		return cloneDiagnosticContentValue(messages);
	};
	const completedModelContent = (output) => {
		const base = baseModelContent();
		if (!capture.outputMessages) return base;
		return {
			...base,
			outputMessages: outputMessages(output)
		};
	};
	const sizeTimingFields = () => ({
		...requestPayloadBytes !== void 0 ? { requestPayloadBytes } : {},
		...responseStreamBytes > 0 ? { responseStreamBytes } : {},
		...firstCliOutputAt !== void 0 ? { timeToFirstByteMs: Math.max(0, firstCliOutputAt - startedAt) } : {}
	});
	return {
		emitStarted: () => {
			if (started) return;
			started = true;
			startedAt = now();
			emitTrustedDiagnosticEventWithPrivateData({
				type: "model.call.started",
				...baseFields
			}, privateData({ modelContent: baseModelContent() }));
		},
		observeRequestPayload: (payload) => {
			requestPayloadBytes = Buffer.byteLength(payload, "utf8");
		},
		observeCliOutput: (chunk, stream, knownByteLength) => {
			if (!chunk) return;
			firstCliOutputAt ??= now();
			if (stream === "stdout") responseStreamBytes += knownByteLength ?? Buffer.byteLength(chunk, "utf8");
		},
		observeAssistantMessage: (message) => {
			if (!capture.outputMessages || (outputContentBudget.remainingBytes <= 0 || outputContentBudget.remainingItems <= 0) && !(outputContentBudget.fallbackReserveItems > 0 && assistantMessageHasText(message)) || capturedAssistantMessages.length >= MAX_CAPTURED_OUTPUT_MESSAGES - 1) {
				if (capture.outputMessages) outputContentBudget.truncated = true;
				return;
			}
			const normalized = normalizeClaudeAssistantMessage(message, outputContentBudget);
			if (normalized) capturedAssistantMessages.push(normalized);
		},
		observeUsage: (usage, terminal) => {
			observedUsage = usage;
			if (terminal) observedTerminalUsage = usage;
		},
		emitCompleted: (output) => {
			if (!started || terminalEmitted) return;
			terminalEmitted = true;
			emitTrustedDiagnosticEventWithPrivateData({
				type: "model.call.completed",
				...baseFields,
				durationMs: Math.max(0, now() - startedAt),
				...sizeTimingFields(),
				...usageField(output.diagnosticUsage ?? observedTerminalUsage ?? output.usage ?? observedUsage)
			}, privateData({ modelContent: completedModelContent(output) }));
		},
		emitError: (error) => {
			if (!started || terminalEmitted) return;
			terminalEmitted = true;
			const failureKind = failureKindForClaudeCli(error, params.context.params.abortSignal);
			emitTrustedDiagnosticEventWithPrivateData({
				type: "model.call.error",
				...baseFields,
				durationMs: Math.max(0, now() - startedAt),
				errorCategory: (isFailoverError(error) ? error.reason : void 0) ?? failureKind ?? diagnosticErrorCategory(error),
				...failureKind ? { failureKind } : {},
				...sizeTimingFields(),
				...usageField(observedTerminalUsage ?? observedUsage)
			}, privateData({
				modelContent: completedModelContent(),
				errorMessage: diagnosticErrorMessage(error)
			}));
		}
	};
}
//#endregion
//#region src/agents/cli-runner/execute.ts
/** Executes prepared CLI backend runs and owns their queue and resource lifecycle. */
function normalizeCliBackendThinkingLevel(level) {
	return level === "ultra" ? "max" : level;
}
function exactToolAvailabilityError(params) {
	if (!params.isolatedCompletion) return new Error(params.message);
	const error = new Error(params.message);
	error.name = "IsolatedCompletionRuntimeError";
	error.code = params.code;
	return error;
}
function assertExactToolAvailabilityRuntimeVersion(params) {
	const artifact = params.executableIdentity?.runtimeArtifact;
	const packageVersion = artifact?.kind === "package-tree" ? artifact.packageVersion : void 0;
	const parsedVersion = packageVersion ? parse(packageVersion) : null;
	const prereleaseChannel = parsedVersion?.prerelease[0];
	const minimumVersion = parsedVersion?.prerelease.length === 0 ? params.policy?.stableMinimum : typeof prereleaseChannel === "string" ? params.policy?.prereleaseMinimums?.[prereleaseChannel] : void 0;
	const comparison = packageVersion && minimumVersion ? compareValidSemver(packageVersion, minimumVersion) : null;
	if (comparison !== null && comparison >= 0) return;
	throw exactToolAvailabilityError({
		code: "unsupported",
		isolatedCompletion: params.isolatedCompletion,
		message: `CLI backend ${params.backendId} requires a supported package version for exact per-run tool availability${minimumVersion ? ` (requires >=${minimumVersion}` : " (unsupported release line"}${packageVersion ? `; found ${packageVersion})` : ")"}`
	});
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.cliRunnerExecuteTestApi")] = {
	buildCliEnvAuthLog,
	buildCliExecLogLine,
	setCliRunnerExecuteTestDeps: (overrides) => {
		Object.assign(executeDeps, overrides);
	}
};
/** Executes a prepared CLI run context and returns normalized CLI output. */
async function executePreparedCliRun(context, cliSessionIdToUse, options) {
	const params = context.params;
	if (params.abortSignal?.aborted) throw createCliAbortError();
	const backend = context.preparedBackend.backend;
	const nodePlacement = resolveNodeClaudePlacement(context);
	const { sessionId: resolvedSessionId, isNew } = resolveSessionIdToSend({
		backend,
		cliSessionId: cliSessionIdToUse
	});
	const useResume = Boolean(cliSessionIdToUse && resolvedSessionId && backend.resumeArgs && backend.resumeArgs.length > 0);
	const resendSystemPromptForSoftResume = context.reusableCliSession.mode === "reuse-with-drift";
	const systemPromptArg = resolveSystemPromptUsage({
		backend,
		isNewSession: isNew || resendSystemPromptForSoftResume,
		systemPrompt: context.systemPrompt
	});
	const shouldSendSystemPrompt = systemPromptArg && (!useResume || backend.systemPromptWhen === "always" || resendSystemPromptForSoftResume);
	const systemPromptFile = !nodePlacement && shouldSendSystemPrompt ? await executeDeps.writeCliSystemPromptFile({
		backend,
		systemPrompt: systemPromptArg
	}) : void 0;
	const nodeSystemPrompt = nodePlacement && shouldSendSystemPrompt ? systemPromptArg : void 0;
	const basePrompt = cliSessionIdToUse ? params.prompt : context.openClawHistoryPrompt ?? params.prompt;
	let prompt = applyPluginTextReplacements(appendBootstrapPromptWarning(basePrompt, context.bootstrapPromptWarningLines, { preserveExactPrompt: context.heartbeatPrompt }), context.backendResolved.textTransforms?.input);
	if (nodePlacement && ((params.images?.length ?? 0) > 0 || hasHydratableMediaImages(params.media) || (params.imagePrompt ? detectImageReferences(params.imagePrompt).length > 0 : false))) throw new Error("paired-node Claude CLI sessions do not support attachments or images");
	const imagePayload = nodePlacement ? {
		prompt,
		imagePaths: [],
		cleanupImages: async () => {}
	} : await prepareCliPromptImagePayload({
		backend,
		prompt,
		imagePrompt: params.imagePrompt,
		workspaceDir: context.workspaceDir,
		images: params.images,
		imageOrder: params.imageOrder,
		media: params.media
	});
	prompt = imagePayload.prompt;
	const { argsPrompt, stdin } = resolvePromptInput({
		backend,
		prompt
	});
	const baseArgs = useResume ? backend.resumeArgs ?? backend.args ?? [] : backend.args ?? [];
	const resolvedArgs = useResume ? baseArgs.map((entry) => entry.replaceAll("{sessionId}", resolvedSessionId ?? "")) : baseArgs;
	const fallbackClaudeSkillsPlugin = !nodePlacement && context.claudeSkillsPluginArgs === void 0 ? await prepareClaudeCliSkillsPlugin({
		backendId: context.backendResolved.id,
		skillsSnapshot: params.skillsSnapshot
	}) : void 0;
	let fallbackClaudeSkillsPluginCleanupOwned = false;
	const claudeSkillsPluginArgs = nodePlacement ? [] : context.claudeSkillsPluginArgs ?? fallbackClaudeSkillsPlugin?.args ?? [];
	const baseArgsWithSkills = claudeSkillsPluginArgs.length > 0 ? [...resolvedArgs, ...claudeSkillsPluginArgs] : resolvedArgs;
	const resolvedExecutionArgs = context.backendResolved.resolveExecutionArgs?.({
		config: params.config,
		workspaceDir: context.workspaceDir,
		provider: params.provider,
		modelId: context.modelId,
		authProfileId: context.effectiveAuthProfileId,
		thinkingLevel: normalizeCliBackendThinkingLevel(params.thinkLevel),
		executionMode: params.executionMode ?? "agent",
		toolAvailability: params.cliToolAvailability ? buildCliBackendToolAvailability(nodePlacement ? {
			native: params.cliToolAvailability.native,
			openClaw: []
		} : params.cliToolAvailability) : void 0,
		useResume,
		baseArgs: baseArgsWithSkills
	});
	if (params.cliToolAvailability && context.backendResolved.toolAvailabilityEnforcement === "execution-args" && !resolvedExecutionArgs) throw new Error(`CLI backend ${context.backendResolved.id} did not enforce exact per-run tool availability`);
	const executionBaseArgs = nodePlacement ? stripGatewayLocalClaudeArgs(resolvedExecutionArgs ?? baseArgsWithSkills) : resolvedExecutionArgs ?? baseArgsWithSkills;
	const args = buildCliArgs({
		backend: nodePlacement ? {
			...backend,
			systemPromptArg: void 0,
			systemPromptFileArg: void 0
		} : backend,
		baseArgs: Array.from(executionBaseArgs),
		modelId: context.normalizedModel,
		sessionId: resolvedSessionId,
		systemPrompt: nodePlacement ? void 0 : systemPromptArg,
		systemPromptFilePath: systemPromptFile?.filePath,
		imagePaths: imagePayload.imagePaths,
		promptArg: argsPrompt,
		useResume,
		forkResume: params.forkCliSessionOnResume,
		resumeAt: params.cliSessionResumeAt,
		sendSystemPromptOnResume: resendSystemPromptForSoftResume
	});
	const claudeOwnerKey = buildClaudeOwnerKey({
		agentAccountId: params.agentAccountId,
		agentId: params.agentId,
		authProfileId: context.effectiveAuthProfileId,
		sessionId: params.sessionId,
		sessionKey: params.sessionKey
	});
	const queueKey = resolveCliRunQueueKey({
		backendId: context.backendResolved.id,
		liveSession: backend.liveSession,
		serialize: backend.serialize,
		runId: params.runId,
		workspaceDir: context.workspaceDir,
		cliSessionId: useResume ? resolvedSessionId : void 0,
		ownerKey: claudeOwnerKey
	});
	const useManagedClaudeLiveSession = shouldUseClaudeLiveSession(context) && !params.onSuccessfulAuthBinding;
	const diagnostics = createClaudeCliModelCallDiagnostics({
		context,
		prompt,
		systemPrompt: systemPromptArg ?? void 0,
		transport: nodePlacement ? "paired-node-cli" : useManagedClaudeLiveSession ? "stdio-live" : "stdio"
	});
	let completedOutput;
	let executionError;
	let outerCleanupError;
	let forkResumeClaimed = false;
	let forkSuccessorObserved = false;
	let forkSuccessorPersistence;
	const observeForkSuccessor = (sessionId) => {
		if (forkSuccessorObserved || !forkResumeClaimed || !resolvedSessionId || sessionId === resolvedSessionId) return;
		forkSuccessorObserved = true;
		forkSuccessorPersistence = params.persistCliSessionForkSuccessor?.(sessionId);
		forkSuccessorPersistence?.catch(() => void 0);
	};
	const finishForkSuccessorPersistence = async () => {
		try {
			await forkSuccessorPersistence;
		} catch (error) {
			forkSuccessorObserved = false;
			throw error;
		}
	};
	const cleanupOuterResource = async (cleanup) => {
		try {
			await cleanup?.();
		} catch (error) {
			if (completedOutput?.didSendViaMessagingTool) {
				cliBackendLog.warn(`CLI outer resource cleanup failed after confirmed message delivery: ${formatErrorMessage(error)}`);
				return;
			}
			if (executionError !== void 0) {
				cliBackendLog.warn(`CLI outer resource cleanup also failed after run error: ${formatErrorMessage(error)}`);
				return;
			}
			throw error;
		}
	};
	const executeAttempt = async () => {
		await context.preparedBackend.beforeExecution?.();
		if (params.abortSignal?.aborted) throw createCliAbortError();
		const cliTurnStartedAt = Date.now();
		const restoreSkillEnv = params.skillsSnapshot ? applySkillEnvOverridesFromSnapshot({
			snapshot: params.skillsSnapshot,
			config: params.config
		}) : void 0;
		let cleanupMcpCaptureAttempt;
		let runOutput;
		let runError;
		let runFailed = false;
		const recordRunError = (error) => {
			if (!runFailed) {
				runFailed = true;
				runError = error;
			}
		};
		const toolTracking = createCliToolTracking(context);
		const events = createCliEventHandlers({
			context,
			toolTracking,
			getRunState: () => ({
				failed: runFailed,
				error: runError
			})
		});
		try {
			cliBackendLog.info(buildCliExecLogLine({
				provider: params.provider,
				model: context.normalizedModel,
				promptChars: basePrompt.length,
				trigger: params.trigger,
				useResume,
				cliSessionId: cliSessionIdToUse,
				resolvedSessionId,
				reusableSession: context.reusableCliSession,
				hasHistoryPrompt: Boolean(context.openClawHistoryPrompt)
			}));
			const logOutputText = isTruthyEnvValue(process.env["OPENCLAW_CLI_BACKEND_LOG_OUTPUT"]) || isTruthyEnvValue(process.env["OPENCLAW_CLAUDE_CLI_LOG_OUTPUT"]);
			const outputMode = useResume ? backend.resumeOutput ?? backend.output : backend.output;
			const initialGatewayCaptureKey = useManagedClaudeLiveSession || nodePlacement || !context.mcpDeliveryCapture ? void 0 : crypto.randomUUID();
			const mcpCaptureAttempt = nodePlacement ? {
				env: {},
				cleanup: void 0
			} : await prepareCliBundleMcpCaptureAttempt({
				mode: context.backendResolved.bundleMcpMode,
				backend,
				env: context.preparedBackend.env,
				captureKey: initialGatewayCaptureKey
			});
			cleanupMcpCaptureAttempt = mcpCaptureAttempt.cleanup;
			const preparedBackendEnv = context.preparedBackend.env ?? {};
			const selectedClaudeClearEnv = Boolean(context.preparedBackend.secretInput) || [...CLAUDE_SELECTED_AUTH_ENV_KEYS].some((key) => Object.hasOwn(preparedBackendEnv, key)) ? new Set(backend.clearEnv ?? []) : void 0;
			const backendEnv = {
				...Object.fromEntries(Object.entries(backend.env ?? {}).filter(([key]) => !selectedClaudeClearEnv?.has(key))),
				...preparedBackendEnv
			};
			const nodeEnvEntries = Object.entries(preparedBackendEnv).filter(([key]) => NODE_CLAUDE_FORWARD_ENV_KEYS.has(key));
			const nodeEnv = nodePlacement ? {
				...Object.fromEntries(nodeEnvEntries),
				...resolveNodeClaudeAuthEnv(context)
			} : void 0;
			const env = sanitizeHostExecEnv({
				baseEnv: process.env,
				blockPathOverrides: true
			});
			const preservedEnv = parseCliBackendPreserveEnv(process.env[CLI_BACKEND_PRESERVE_ENV]);
			for (const key of backend.clearEnv ?? []) if (!preservedEnv.has(key) || selectedClaudeClearEnv?.has(key)) delete env[key];
			if (Object.keys(backendEnv).length > 0) Object.assign(env, sanitizeHostExecEnv({
				baseEnv: {},
				overrides: backendEnv,
				blockPathOverrides: true
			}));
			Object.assign(env, mcpCaptureAttempt.env);
			delete env.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST;
			let executionCommand = backend.command;
			let executionLeadingArgv = [];
			context.runtimeOwnerFingerprint = void 0;
			context.runtimeArtifactFingerprint = void 0;
			const exactToolAvailabilityVersionPolicy = params.cliToolAvailability ? context.backendResolved.runtimeArtifact?.exactToolAvailabilityVersionPolicy : void 0;
			if (exactToolAvailabilityVersionPolicy && nodePlacement) throw exactToolAvailabilityError({
				code: "unsupported",
				isolatedCompletion: params.isolatedCompletion === true,
				message: `CLI backend ${context.backendResolved.id} cannot verify its exact tool-availability runtime on a paired node`
			});
			if ((params.onSuccessfulAuthBinding || exactToolAvailabilityVersionPolicy) && !nodePlacement) {
				const executableIdentity = await resolveCliExecutableIdentity({
					command: backend.command,
					cwd: context.cwd ?? context.workspaceDir,
					env,
					...context.backendResolved.runtimeArtifact ? { runtimeArtifact: context.backendResolved.runtimeArtifact } : {}
				});
				if (!executableIdentity) throw exactToolAvailabilityError({
					code: "runtime-unavailable",
					isolatedCompletion: params.isolatedCompletion === true && exactToolAvailabilityVersionPolicy !== void 0,
					message: `CLI backend ${context.backendResolved.id} executable cannot be bound to one durable absolute owner`
				});
				if (exactToolAvailabilityVersionPolicy) assertExactToolAvailabilityRuntimeVersion({
					backendId: context.backendResolved.id,
					policy: exactToolAvailabilityVersionPolicy,
					executableIdentity,
					isolatedCompletion: params.isolatedCompletion === true
				});
				executionCommand = executableIdentity.invocation.command;
				executionLeadingArgv = executableIdentity.invocation.leadingArgv;
				context.runtimeArtifactFingerprint = fingerprintCliRuntimeArtifact({
					provider: params.provider,
					backendId: context.backendResolved.id,
					executableIdentity
				});
				if (params.onSuccessfulAuthBinding && !context.authBindingFingerprint) context.runtimeOwnerFingerprint = await resolveCliRuntimeOwnerFingerprint({
					provider: params.provider,
					config: params.config ?? context.contextEngineConfig,
					...context.agentDir ? { agentDir: context.agentDir } : {},
					agentId: params.agentId,
					runtimeOwnerId: context.backendResolved.id,
					...context.effectiveAuthProfileId ? { authProfileId: context.effectiveAuthProfileId } : {},
					...context.authBindingSkipsLocalCredential ? { skipLocalCredential: true } : {},
					runtimeArtifactFingerprint: context.runtimeArtifactFingerprint
				});
			}
			if (logOutputText) logCliInvocation({
				args,
				command: executionCommand,
				env,
				systemPromptArg: backend.systemPromptArg,
				modelArg: backend.modelArg,
				imageArg: backend.imageArg,
				argsPrompt,
				log: (message) => cliBackendLog.info(message)
			});
			const runTimeoutOverrideMs = resolveCliRunTimeoutOverrideMs({
				config: params.config,
				lane: params.lane,
				timeoutMs: params.timeoutMs,
				runTimeoutOverrideMs: params.runTimeoutOverrideMs
			});
			const noOutputTimeoutMs = resolveCliNoOutputTimeoutMs({
				backend,
				timeoutMs: params.timeoutMs,
				runTimeoutOverrideMs,
				useResume,
				trigger: params.trigger
			});
			toolTracking.beginGatewayCapture(initialGatewayCaptureKey);
			runOutput = await executeCliProcess({
				context,
				backend,
				deps: executeDeps,
				events,
				toolTracking,
				diagnostics,
				nodePlacement,
				nodeSystemPrompt,
				nodeEnv: nodeEnv && Object.keys(nodeEnv).length > 0 ? nodeEnv : void 0,
				nodeClearEnv: selectedClaudeClearEnv ? [...selectedClaudeClearEnv] : void 0,
				useManagedClaudeLiveSession,
				useResume,
				cliSessionIdToUse,
				resolvedSessionId,
				executionCommand,
				executionLeadingArgv,
				executionArgs: args,
				env,
				prompt,
				argsPrompt,
				stdin,
				noOutputTimeoutMs,
				outputMode,
				logOutputText,
				cliTurnStartedAt,
				fallbackCleanup: fallbackClaudeSkillsPlugin?.cleanup,
				claimFallbackCleanup: () => {
					fallbackClaudeSkillsPluginCleanupOwned = fallbackClaudeSkillsPlugin !== void 0;
				},
				observeForkSuccessor,
				options
			});
		} catch (error) {
			recordRunError(error);
		} finally {
			await toolTracking.finishDeliveryTracking({
				useManagedClaudeLiveSession,
				recordRunError
			});
			toolTracking.finalizeCapture(events.finalizeParsedTools);
			try {
				await cleanupMcpCaptureAttempt?.();
			} catch (error) {
				recordRunError(error);
			}
			try {
				restoreSkillEnv?.();
			} catch (error) {
				recordRunError(error);
			}
		}
		if (runFailed) throw toolTracking.attachDeliveryEvidence(runError);
		if (!runOutput) throw new Error("CLI run completed without output");
		return toolTracking.withExecutionEvidence({
			...runOutput,
			toolSummary: events.getToolSummary()
		});
	};
	try {
		completedOutput = await enqueueCliRun(queueKey, async () => {
			if (params.abortSignal?.aborted) throw createCliAbortError();
			if (params.lifecycleGeneration) assertAgentRunLifecycleGenerationCurrent(params.lifecycleGeneration);
			diagnostics?.emitStarted();
			if (params.forkCliSessionOnResume && useResume) {
				if (!params.persistCliSessionForkSuccessor) throw new Error("CLI session fork successor persistence is unavailable");
				forkResumeClaimed = await params.claimCliSessionFork?.() === true;
				if (!forkResumeClaimed) throw new Error("CLI session fork marker is no longer available");
				await closeClaudeLiveSessionForContext(context);
			}
			return await executeAttempt();
		});
		if (completedOutput.sessionId) observeForkSuccessor(completedOutput.sessionId);
		await finishForkSuccessorPersistence();
		if (forkResumeClaimed && !forkSuccessorObserved) {
			await params.restoreCliSessionFork?.();
			forkResumeClaimed = false;
			throw new Error("forked CLI session did not report a successor session id");
		}
	} catch (error) {
		executionError = error;
		diagnostics?.emitError(error);
		let failure = error;
		try {
			await finishForkSuccessorPersistence();
		} catch (persistenceError) {
			failure = new AggregateError([error, persistenceError], "CLI turn failed and its fork successor could not be persisted");
		}
		if (forkResumeClaimed && !forkSuccessorObserved) await params.restoreCliSessionFork?.();
		throw failure;
	} finally {
		try {
			if (!fallbackClaudeSkillsPluginCleanupOwned) await cleanupOuterResource(fallbackClaudeSkillsPlugin?.cleanup);
			await cleanupOuterResource(systemPromptFile?.cleanup);
			await cleanupOuterResource(imagePayload.cleanupImages);
		} catch (error) {
			outerCleanupError = toErrorObject(error, "CLI outer resource cleanup failed");
		}
	}
	if (outerCleanupError) {
		options?.onPhase?.("cleanup");
		diagnostics?.emitError(outerCleanupError);
		throw outerCleanupError;
	}
	if (!completedOutput) {
		const error = /* @__PURE__ */ new Error("CLI run completed without output");
		diagnostics?.emitError(error);
		throw error;
	}
	diagnostics?.emitCompleted(completedOutput);
	return completedOutput;
}
//#endregion
export { executePreparedCliRun as t };
