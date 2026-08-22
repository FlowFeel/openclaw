import { s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { n as createLazyPromise, r as createLazyPromiseLoader } from "./lazy-promise-DGqyc4Y4.js";
import { o as asDateTimestampMs } from "./number-coercion-Crk_c9KW.js";
import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { C as resolveStateDir } from "./paths-CL43LNS6.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { _ as onTrustedToolExecutionEvent } from "./diagnostic-events-Dt41CZkD.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import "./openclaw-state-db-BU55lNCH.js";
import { c as OPENCLAW_SQLITE_BUSY_TIMEOUT_MS } from "./openclaw-state-db.paths-2PkDmkRl.js";
import { d as onAgentRuntimeEvent, l as onAgentAuditEvent } from "./agent-events-COCf-9-O.js";
import { a as getAgentRunContext, r as clearAgentRunContext } from "./agent-run-registry-BluEqSPq.js";
import { g as resolveSessionAgentId } from "./agent-scope-DyEposw2.js";
import { i as resolveStoredSessionKeyForAgentStore } from "./session-store-key-DmGCpash.js";
import { Mt as onSessionLifecycleEvent } from "./session-accessor.sqlite-B9iW7DOt.js";
import { n as onInternalSessionTranscriptUpdate } from "./transcript-events-BG9Ai61T.js";
import { a as isAllowedToolCallName } from "./tool-call-id-BrrPYNyX.js";
import { i as buildAgentRunTerminalOutcomeFromLifecycleEvent, l as mergeAgentRunTerminalOutcome, o as classifyAgentRunTerminalOutcome } from "./agent-run-terminal-outcome-Bl2pG_Kc.js";
import { r as onTrustedMessageAuditEvent } from "./message-audit-events-DZQxEKuQ.js";
import { t as stripMarkdown } from "./strip-markdown-C5tNLXiY.js";
import { n as resolveUtilityModelRefForAgent } from "./utility-model-CX4O-g7Q.js";
import { r as onHeartbeatEvent } from "./heartbeat-events-CIgEHiJM.js";
import { c as removeChatAbortControllerEntry } from "./chat-abort-dteij8GM.js";
import { n as onGatewaySessionReset } from "./session-reset-notifications-Is8h_Auo.js";
import { a as terminalHealthFor, i as readFiniteNumber, n as flushSessionActivityAssistantNote, r as noteSessionActivityEvent, t as createSessionActivityNoteState } from "./session-activity-notes-CM8CCq6f.js";
import { a as sanitizeProgressStatusText } from "./progress-draft-status-text-DlvYwq2T.js";
import { i as resolveVisibleActiveSessionRunState } from "./session-active-runs-D55IQZ6M.js";
import { a as defaultPersistDigest, c as isTerminalLifecycleEvent, d as rememberSessionObserverDisabledRun, f as rememberSessionObserverDormantRun, h as synthesizeSessionObserverTerminalDigest, i as defaultCompleteModel, l as markSessionObserverRunSuperseded, m as sessionObserverScopeKey, n as buildSessionObserverPrompt, o as defaultPrepareModel, p as rememberSessionObserverRevisionFloor, r as createDormantSessionObserverRun, s as defaultReadSession, t as SESSION_OBSERVER_SYSTEM_PROMPT, u as normalizeSessionObserverModelOutput } from "./session-observer-model-DO7ay4UC.js";
import { t as mapTaskSummary } from "./task-summary-CtXqyWq7.js";
import { n as createSessionCompanionAskRuntime } from "./session-companion-ask-W0ahlgqD.js";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHash, randomUUID } from "node:crypto";
import path from "node:path";
import { Worker } from "node:worker_threads";
//#region src/audit/audit-config.ts
/**
* The ledger is on by default: an audit trail enabled only after an incident
* cannot explain the incident. `logging.audit.enabled: false` stops new event inserts after
* restart; audit queries still serve retained rows until they expire.
*/
function isAuditLedgerEnabled(cfg) {
	return cfg?.logging?.audit?.enabled !== false;
}
/** Message metadata remains an explicit opt-in inside the default-on ledger. */
function resolveAuditMessageMode(cfg) {
	return cfg?.logging?.audit?.messages ?? "off";
}
//#endregion
//#region src/audit/audit-event-writer.ts
/** Non-blocking worker-thread writer for Gateway audit metadata. */
const MAX_PENDING_AUDIT_EVENTS = 4096;
const AUDIT_WRITER_SHUTDOWN_TIMEOUT_MS = OPENCLAW_SQLITE_BUSY_TIMEOUT_MS + 5e3;
function resolveAuditEventWriterUrl(currentModuleUrl = import.meta.url) {
	const currentPath = fileURLToPath(currentModuleUrl);
	const distIndex = currentPath.replaceAll(path.sep, "/").lastIndexOf("/dist/");
	if (distIndex >= 0) {
		const distRoot = currentPath.slice(0, distIndex + 6);
		return pathToFileURL(path.join(distRoot, "audit", "audit-event-writer.worker.js"));
	}
	const extension = path.extname(currentPath) || ".js";
	return new URL(`./audit-event-writer.worker${extension}`, currentModuleUrl);
}
/** Start one bounded worker queue. SQLite contention never blocks the agent-event callback. */
function createAuditEventWriter(options = {}) {
	const workerUrl = options.workerUrl ?? resolveAuditEventWriterUrl();
	const sourceWorkerExecArgv = workerUrl.pathname.endsWith(".ts") ? ["--import", "tsx"] : void 0;
	const maxPending = Math.max(1, Math.floor(options.maxPending ?? MAX_PENDING_AUDIT_EVENTS));
	let worker;
	try {
		worker = new Worker(workerUrl, {
			workerData: { stateDir: options.stateDir ?? resolveStateDir(process.env) },
			execArgv: sourceWorkerExecArgv
		});
	} catch (error) {
		options.onError?.(error instanceof Error ? error.message : String(error));
		return {
			ready: Promise.resolve(),
			record: () => false,
			stop: async () => {}
		};
	}
	worker.unref?.();
	let pending = 0;
	let stopped = false;
	let unavailable = false;
	let readyResolved = false;
	let resolveReady;
	const ready = new Promise((resolve) => {
		resolveReady = resolve;
	});
	let resolveStop;
	let stopTimer;
	const markReady = () => {
		if (!readyResolved) {
			readyResolved = true;
			resolveReady();
		}
	};
	const finishStop = () => {
		if (stopTimer) {
			clearTimeout(stopTimer);
			stopTimer = void 0;
		}
		const finish = resolveStop;
		resolveStop = void 0;
		finish?.();
	};
	const fail = (error) => {
		options.onError?.(error instanceof Error ? error.message : String(error));
	};
	worker.on("message", (message) => {
		switch (message.type) {
			case "ready":
				markReady();
				return;
			case "recorded":
				pending = Math.max(0, pending - 1);
				return;
			case "record-error":
				pending = Math.max(0, pending - 1);
				fail(message.error);
				return;
			case "maintenance-error":
				fail(message.error);
				return;
			case "stopped":
				pending = 0;
				markReady();
				finishStop();
		}
	});
	worker.on("error", (error) => {
		unavailable = true;
		fail(error);
		markReady();
		finishStop();
	});
	worker.on("exit", (code) => {
		unavailable = true;
		if (!stopped) fail(`audit event writer exited with code ${code}`);
		markReady();
		finishStop();
	});
	return {
		ready,
		record: (input) => {
			if (stopped || unavailable || pending >= maxPending) {
				if (!stopped) fail(unavailable ? "audit event writer is unavailable; dropping metadata" : `audit event queue is full (${maxPending}); dropping metadata`);
				return false;
			}
			pending += 1;
			try {
				worker.postMessage({
					type: "record",
					input
				});
				return true;
			} catch (error) {
				pending -= 1;
				unavailable = true;
				fail(error);
				return false;
			}
		},
		stop: async () => {
			if (stopped) return;
			stopped = true;
			if (unavailable) return;
			await new Promise((resolve) => {
				resolveStop = resolve;
				stopTimer = setTimeout(() => {
					fail("audit event writer shutdown timed out; pending metadata may be lost");
					worker.terminate();
					finishStop();
				}, AUDIT_WRITER_SHUTDOWN_TIMEOUT_MS);
				try {
					worker.postMessage({ type: "stop" });
				} catch (error) {
					fail(error);
					finishStop();
				}
			});
		}
	};
}
//#endregion
//#region src/audit/agent-event-audit.ts
/** Redaction-safe projection from live agent events into durable audit metadata. */
const runProvenance = /* @__PURE__ */ new Map();
const MAX_TRACKED_RUN_PROVENANCE = 1024;
const log$1 = createSubsystemLogger("audit/events");
let persistenceFailureWarned$1 = false;
function nonEmptyString(value) {
	return typeof value === "string" && value.length > 0 ? value : void 0;
}
function auditToolName(value) {
	const toolName = nonEmptyString(value)?.trim();
	if (!toolName) return;
	return isAllowedToolCallName(toolName, null) ? toolName : "unknown";
}
function auditToolCallId(value) {
	const toolCallId = nonEmptyString(value);
	if (!toolCallId) return;
	return `sha256:${createHash("sha256").update(toolCallId).digest("hex")}`;
}
function legacyAuditSourceId(params) {
	return `${params.runId}:${params.sourceSequence}:${params.occurredAt}:${params.action}`;
}
function rememberRunProvenance(runId, provenance) {
	runProvenance.delete(runId);
	runProvenance.set(runId, provenance);
	pruneMapToMaxSize(runProvenance, MAX_TRACKED_RUN_PROVENANCE);
}
function resolveProvenance(runId, event) {
	const remembered = runProvenance.get(runId);
	const sessionKey = nonEmptyString(event.sessionKey) ?? remembered?.sessionKey;
	const sessionId = nonEmptyString(event.sessionId) ?? remembered?.sessionId;
	const eventAgentId = nonEmptyString(event.agentId);
	const sessionAgentId = sessionKey ? parseAgentSessionKey(sessionKey)?.agentId : void 0;
	const agentId = eventAgentId ?? sessionAgentId ?? remembered?.agentId ?? "unknown";
	return {
		actorType: eventAgentId || sessionAgentId ? "agent" : remembered?.actorType ?? "system",
		agentId,
		sessionKey,
		sessionId
	};
}
function resolveToolProvenance(runId, event) {
	const observed = resolveProvenance(runId, event);
	const remembered = runProvenance.get(runId);
	if (!remembered) return observed;
	return {
		...remembered,
		sessionKey: remembered.sessionKey ?? observed.sessionKey,
		sessionId: remembered.sessionId ?? observed.sessionId
	};
}
const AUDIT_TERMINAL_BY_CLASSIFICATION = {
	success: { status: "succeeded" },
	timeout: {
		status: "timed_out",
		errorCode: "run_timed_out"
	},
	cancellation: {
		status: "cancelled",
		errorCode: "run_cancelled"
	},
	failure: {
		status: "failed",
		errorCode: "run_failed"
	}
};
function classifyRunTerminal(data, phase) {
	const outcome = buildAgentRunTerminalOutcomeFromLifecycleEvent({
		phase,
		data
	});
	if (outcome.reason === "blocked") return {
		outcome,
		status: "blocked",
		errorCode: "run_blocked"
	};
	return {
		outcome,
		...AUDIT_TERMINAL_BY_CLASSIFICATION[classifyAgentRunTerminalOutcome(outcome)]
	};
}
function projectAgentEvent(event) {
	const runId = nonEmptyString(event.runId);
	const phase = nonEmptyString(event.data.phase);
	if (!runId || !phase) return;
	const provenance = resolveProvenance(runId, event);
	if (event.stream === "lifecycle" && phase === "start") {
		rememberRunProvenance(runId, provenance);
		const occurredAt = asDateTimestampMs(event.data.startedAt) ?? event.ts;
		const action = "agent.run.started";
		return { input: {
			sourceId: legacyAuditSourceId({
				runId,
				sourceSequence: event.seq,
				occurredAt,
				action
			}),
			sourceSequence: event.seq,
			occurredAt,
			kind: "agent_run",
			action,
			status: "started",
			actorType: provenance.actorType,
			actorId: provenance.agentId,
			agentId: provenance.agentId,
			...provenance.sessionKey ? { sessionKey: provenance.sessionKey } : {},
			...provenance.sessionId ? { sessionId: provenance.sessionId } : {},
			runId
		} };
	}
	if (event.stream === "lifecycle" && (phase === "end" || phase === "error")) {
		rememberRunProvenance(runId, provenance);
		const { outcome, ...terminal } = classifyRunTerminal(event.data, phase);
		const occurredAt = asDateTimestampMs(event.data.endedAt) ?? event.ts;
		const action = "agent.run.finished";
		return {
			input: {
				sourceId: legacyAuditSourceId({
					runId,
					sourceSequence: event.seq,
					occurredAt,
					action
				}),
				sourceSequence: event.seq,
				occurredAt,
				kind: "agent_run",
				action,
				...terminal,
				actorType: provenance.actorType,
				actorId: provenance.agentId,
				agentId: provenance.agentId,
				...provenance.sessionKey ? { sessionKey: provenance.sessionKey } : {},
				...provenance.sessionId ? { sessionId: provenance.sessionId } : {},
				runId
			},
			terminal: {
				outcome,
				phase
			}
		};
	}
}
/** Project the complete trusted tool-execution lifecycle without private diagnostic content. */
function projectToolExecutionEventToAudit(event) {
	if (event.type === "tool.execution.blocked" && event.deniedReason === "unsupported_tool_schema" && !nonEmptyString(event.toolCallId)) return;
	const runId = nonEmptyString(event.runId);
	const toolName = auditToolName(event.toolName);
	if (!runId || !toolName) return;
	const toolCallId = auditToolCallId(event.toolCallId);
	const provenance = resolveToolProvenance(runId, event);
	const occurredAt = asDateTimestampMs(event.sourceTimestampMs) ?? event.ts;
	const attribution = {
		sourceSequence: event.seq,
		occurredAt,
		kind: "tool_action",
		actorType: provenance.actorType,
		actorId: provenance.agentId,
		agentId: provenance.agentId,
		...provenance.sessionKey ? { sessionKey: provenance.sessionKey } : {},
		...provenance.sessionId ? { sessionId: provenance.sessionId } : {},
		runId,
		...toolCallId ? { toolCallId } : {},
		toolName
	};
	if (event.type === "tool.execution.started") {
		const action = "tool.action.started";
		return {
			sourceId: legacyAuditSourceId({
				runId,
				sourceSequence: event.seq,
				occurredAt,
				action
			}),
			...attribution,
			action,
			status: "started"
		};
	}
	const errorCategory = event.type === "tool.execution.error" ? normalizeOptionalLowercaseString(event.errorCategory) : void 0;
	const terminalReason = event.type === "tool.execution.error" ? event.terminalReason : void 0;
	const diagnosticErrorCode = event.type === "tool.execution.error" ? normalizeOptionalLowercaseString(event.errorCode) : void 0;
	const toolCancelled = terminalReason === "cancelled" || terminalReason === void 0 && (errorCategory === "aborted" || errorCategory === "aborterror" || errorCategory === "cancelled" || errorCategory === "canceled");
	const toolTimedOut = terminalReason === "timed_out";
	const terminal = event.type === "tool.execution.completed" ? { status: "succeeded" } : event.type === "tool.execution.blocked" ? {
		status: "blocked",
		errorCode: "tool_blocked"
	} : diagnosticErrorCode === "tool_outcome_unknown" ? {
		status: "unknown",
		errorCode: "tool_outcome_unknown"
	} : toolCancelled ? {
		status: "cancelled",
		errorCode: "tool_cancelled"
	} : toolTimedOut ? {
		status: "timed_out",
		errorCode: "tool_timed_out"
	} : {
		status: "failed",
		errorCode: "tool_failed"
	};
	const action = "tool.action.finished";
	return {
		sourceId: legacyAuditSourceId({
			runId,
			sourceSequence: event.seq,
			occurredAt,
			action
		}),
		...attribution,
		action,
		...terminal
	};
}
/** Create the Gateway-owned non-blocking audit projection and persistence handle. */
function createAgentEventAuditRecorder(options) {
	const writer = options?.writer ?? createAuditEventWriter({
		...options?.stateDir ? { stateDir: options.stateDir } : {},
		onError: (error) => {
			if (!persistenceFailureWarned$1) {
				persistenceFailureWarned$1 = true;
				log$1.warn(`audit event persistence failed: ${error}`);
			}
		}
	});
	const terminalSettleMs = Math.max(0, Math.floor(options?.terminalSettleMs ?? 15e3));
	const pendingTerminals = /* @__PURE__ */ new Map();
	const openRunInstances = /* @__PURE__ */ new Set();
	const settledRunInstances = /* @__PURE__ */ new Set();
	const rememberSettled = (runInstance) => {
		settledRunInstances.delete(runInstance);
		settledRunInstances.add(runInstance);
		if (settledRunInstances.size > MAX_TRACKED_RUN_PROVENANCE) {
			const oldest = settledRunInstances.values().next().value;
			if (oldest !== void 0) settledRunInstances.delete(oldest);
		}
	};
	const clearPending = (runInstance) => {
		const pending = pendingTerminals.get(runInstance);
		if (!pending) return;
		clearTimeout(pending.timer);
		pendingTerminals.delete(runInstance);
	};
	const flushPending = (runInstance) => {
		const pending = pendingTerminals.get(runInstance);
		if (!pending) return;
		clearPending(runInstance);
		openRunInstances.delete(runInstance);
		if (writer.record(pending.input)) rememberSettled(runInstance);
	};
	const scheduleTerminal = (runInstance, incoming) => {
		const existing = pendingTerminals.get(runInstance);
		let selected = incoming;
		if (existing) {
			if (existing.phase === "error" && incoming.phase === "end" && incoming.outcome.reason === "completed") selected = existing;
			else selected = mergeAgentRunTerminalOutcome(existing.outcome, incoming.outcome) === existing.outcome ? existing : incoming;
			clearTimeout(existing.timer);
		}
		const timer = setTimeout(() => flushPending(runInstance), terminalSettleMs);
		timer.unref?.();
		pendingTerminals.delete(runInstance);
		pendingTerminals.set(runInstance, {
			...selected,
			timer
		});
		if (pendingTerminals.size > MAX_TRACKED_RUN_PROVENANCE) {
			const oldest = pendingTerminals.keys().next().value;
			if (oldest !== void 0) flushPending(oldest);
		}
	};
	return {
		record: (event) => {
			const projection = projectAgentEvent(event);
			if (!projection) return;
			const runInstance = `${event.lifecycleGeneration ?? "unknown"}\0${event.runId}`;
			if (!projection.terminal) {
				const alreadyOpen = openRunInstances.has(runInstance);
				clearPending(runInstance);
				settledRunInstances.delete(runInstance);
				if (alreadyOpen) return;
				openRunInstances.add(runInstance);
				writer.record(projection.input);
				return;
			}
			if (settledRunInstances.has(runInstance)) return;
			if (projection.terminal.outcome.reason === "completed" && !pendingTerminals.has(runInstance)) {
				openRunInstances.delete(runInstance);
				if (writer.record(projection.input)) rememberSettled(runInstance);
				return;
			}
			scheduleTerminal(runInstance, {
				input: projection.input,
				...projection.terminal
			});
		},
		recordTool: (event) => {
			const input = projectToolExecutionEventToAudit(event);
			if (input) writer.record(input);
		},
		stop: async () => {
			for (const runInstance of pendingTerminals.keys()) flushPending(runInstance);
			await writer.stop();
		}
	};
}
//#endregion
//#region src/audit/audit-recorder.ts
/** Gateway-owned recorder joining trusted run, tool, and message lifecycle streams. */
const log = createSubsystemLogger("audit/events");
let persistenceFailureWarned = false;
function createAuditEventRecorder(options) {
	let nextAcceptedMessageSequence = 0;
	const writer = options.writer ?? createAuditEventWriter({
		...options.stateDir ? { stateDir: options.stateDir } : {},
		onError: (error) => {
			if (!persistenceFailureWarned) {
				persistenceFailureWarned = true;
				log.warn(`audit event persistence failed: ${error}`);
			}
		}
	});
	return {
		...createAgentEventAuditRecorder({
			writer,
			...options.terminalSettleMs !== void 0 ? { terminalSettleMs: options.terminalSettleMs } : {}
		}),
		recordMessage: (event) => {
			if (options.messageMode === "off") return;
			if (options.messageMode === "direct" && event.conversationKind !== "direct") return;
			nextAcceptedMessageSequence += 1;
			writer.record({
				...event,
				sourceId: event.sourceId?.trim() || `message:${randomUUID()}`,
				sourceSequence: nextAcceptedMessageSequence
			});
		}
	};
}
//#endregion
//#region src/gateway/session-companion.ts
const SESSION_COMPANION_IDLE_TTL_MS = 120 * 6e4;
const SESSION_COMPANION_SWEEP_INTERVAL_MS = 10 * 6e4;
function createSessionCompanion(deps) {
	const now = deps.now ?? Date.now;
	const setIntervalFn = deps.setIntervalFn ?? setInterval;
	const clearIntervalFn = deps.clearIntervalFn ?? clearInterval;
	const threads = /* @__PURE__ */ new Map();
	let disposed = false;
	const askRuntime = createSessionCompanionAskRuntime({
		...deps,
		now,
		threads,
		isDisposed: () => disposed
	});
	const reset = (sessionKey) => {
		const key = sessionKey.trim();
		if (!key) return;
		askRuntime.cancel(key);
		threads.delete(key);
	};
	const sweep = () => {
		const cutoff = now() - SESSION_COMPANION_IDLE_TTL_MS;
		for (const [sessionKey, thread] of threads) if (!thread.busy && thread.lastUsedAt <= cutoff) reset(sessionKey);
	};
	const sweepTimer = setIntervalFn(sweep, SESSION_COMPANION_SWEEP_INTERVAL_MS);
	sweepTimer.unref?.();
	const unsubscribeReset = onGatewaySessionReset(reset);
	return {
		ask: askRuntime.ask,
		state(sessionKey) {
			const key = sessionKey.trim();
			const thread = threads.get(key);
			if (!thread) return { exchanges: [] };
			thread.lastUsedAt = now();
			return { exchanges: thread.exchanges.map(({ question, answer, ts }) => ({
				question,
				answer,
				ts
			})) };
		},
		reset,
		dispose() {
			if (disposed) return;
			disposed = true;
			clearIntervalFn(sweepTimer);
			unsubscribeReset();
			askRuntime.dispose();
			threads.clear();
		}
	};
}
//#endregion
//#region src/gateway/session-observer-audience.ts
function createSessionObserverAudience(params) {
	const messageSubscriberKeys = (sessionKey, agentId) => {
		const scopedKey = sessionObserverScopeKey(sessionKey, agentId);
		if (sessionKey === "global" && normalizeAgentId(agentId) === normalizeAgentId(params.getDefaultAgentId())) return [scopedKey, sessionKey];
		return [scopedKey];
	};
	const messageRecipients = (sessionKey, agentId) => {
		const recipients = /* @__PURE__ */ new Set();
		for (const key of messageSubscriberKeys(sessionKey, agentId)) for (const connId of params.subscribers.get(key)) recipients.add(connId);
		return recipients;
	};
	return {
		has(sessionKey, agentId) {
			for (const connId of messageRecipients(sessionKey, agentId)) if (params.isVisible(connId)) return true;
			for (const connId of params.sessionEventSubscribers?.getAll() ?? []) if (params.isVisible(connId)) return true;
			return false;
		},
		recipients(sessionKey, agentId) {
			const recipients = messageRecipients(sessionKey, agentId);
			for (const connId of params.sessionEventSubscribers?.getAll() ?? []) if (params.isVisible(connId)) recipients.add(connId);
			return recipients;
		},
		criticalRecipients(sessionKey, agentId) {
			const recipients = messageRecipients(sessionKey, agentId);
			for (const connId of params.sessionEventSubscribers?.getAll() ?? []) recipients.add(connId);
			return recipients;
		}
	};
}
//#endregion
//#region src/gateway/session-observer-completion.ts
const MODEL_TIMEOUT_MS = 1e4;
function createSessionObserverCompletion(params) {
	const ensurePrepared = async (state) => {
		const modelRef = state.utilityModelRef;
		if (!modelRef) throw new Error("session observer utility model is unavailable");
		state.preparedPromise ??= params.prepareModel({
			cfg: params.getConfig(),
			agentId: state.agentId,
			modelRef,
			useUtilityModel: true,
			allowMissingApiKeyModes: ["aws-sdk"]
		});
		return await state.preparedPromise;
	};
	return async (state, notes) => {
		const controller = new AbortController();
		state.activeController = controller;
		const timeout = params.setTimeoutFn(() => controller.abort(), MODEL_TIMEOUT_MS);
		const aborted = new Promise((_resolve, reject) => {
			controller.signal.addEventListener("abort", () => reject(/* @__PURE__ */ new Error("session observer model call timed out or was cancelled")), { once: true });
		});
		try {
			const execute = async () => {
				const prepared = await ensurePrepared(state);
				if (!params.isCurrent(state) || controller.signal.aborted) throw new Error("session observer state is no longer active");
				if ("error" in prepared) throw new Error(prepared.error);
				for (let attempt = 0; attempt < 2; attempt += 1) {
					if (!params.isCurrent(state) || controller.signal.aborted) throw new Error("session observer state is no longer active");
					const result = await params.completeModel({
						model: prepared.model,
						auth: prepared.auth,
						cfg: params.getConfig(),
						context: {
							systemPrompt: SESSION_OBSERVER_SYSTEM_PROMPT,
							messages: [{
								role: "user",
								content: buildSessionObserverPrompt(state, notes),
								timestamp: params.now()
							}]
						},
						options: {
							maxTokens: Math.min(300, Math.floor(prepared.model.maxTokens)),
							temperature: .2,
							signal: controller.signal
						}
					});
					if (result.stopReason === "error") throw new Error(result.errorMessage?.trim() || "session observer completion failed");
					const parsed = normalizeSessionObserverModelOutput(result.content.filter((block) => block.type === "text").map((block) => block.text).join("").trim());
					if (parsed) return parsed;
				}
				throw new Error("session observer returned invalid JSON twice");
			};
			return await Promise.race([execute(), aborted]);
		} finally {
			params.clearTimeoutFn(timeout);
			if (state.activeController === controller) state.activeController = void 0;
		}
	};
}
//#endregion
//#region src/gateway/session-observer-model-slots.ts
function createSessionObserverModelSlots(params) {
	const demoted = /* @__PURE__ */ new WeakSet();
	const requestGenerations = /* @__PURE__ */ new WeakMap();
	return {
		beginRequest(state) {
			const generation = (requestGenerations.get(state) ?? 0) + 1;
			requestGenerations.set(state, generation);
			return generation;
		},
		invalidateRequest(state) {
			requestGenerations.set(state, (requestGenerations.get(state) ?? 0) + 1);
			state.activeController?.abort();
		},
		requestIsCurrent(state, generation) {
			return requestGenerations.get(state) === generation;
		},
		claim(agentId, current) {
			const resolved = params.resolve(agentId);
			if (!resolved || current?.utilityModelRef === resolved) return resolved;
			const occupied = [...params.states.values()].filter((state) => state !== current && state.utilityModelRef);
			if (current && demoted.has(current)) {
				if (occupied.length >= params.maxSessions) return;
				demoted.delete(current);
				return resolved;
			}
			if (occupied.length >= params.maxSessions) {
				const evicted = occupied.filter((state) => !state.terminalHealth && !state.finalPending).toSorted((left, right) => left.lastActivityAt - right.lastActivityAt || left.sessionKey.localeCompare(right.sessionKey))[0];
				if (!evicted) return;
				demoted.add(evicted);
				params.demote(evicted);
			}
			return resolved;
		}
	};
}
//#endregion
//#region src/gateway/session-observer-persistence.ts
const PERSIST_INTERVAL_MS = 6e4;
function createSessionObserverDigestPersister(params) {
	const preamblePersistedAt = /* @__PURE__ */ new WeakMap();
	return async (state, digest, final, kind = "model") => {
		const lastPersistedAt = kind === "preamble" ? preamblePersistedAt.get(state) : state.lastPersistedAt;
		const due = lastPersistedAt === void 0 || params.now() - lastPersistedAt >= PERSIST_INTERVAL_MS;
		if (!final && !due) return;
		const attempts = final ? 2 : 1;
		for (let attempt = 0; attempt < attempts; attempt += 1) try {
			const accepted = await params.persistDigest({
				sessionKey: state.sessionKey,
				sessionId: state.sessionId,
				agentId: state.agentId,
				digest,
				stillCurrent: params.stillCurrent(state.runId, state.sessionKey, state.agentId)
			});
			if (accepted === null) {
				params.onMissingEntry(state);
				return;
			}
			if (accepted) if (kind === "preamble") preamblePersistedAt.set(state, params.now());
			else state.lastPersistedAt = params.now();
			return;
		} catch (error) {
			if (attempt + 1 === attempts) params.onError(state, error);
		}
	};
}
//#endregion
//#region src/agents/session-preamble.ts
function normalizeSessionPreambleText(value, maxChars) {
	if (typeof value !== "string") return "";
	const sanitized = sanitizeProgressStatusText(value);
	if (!sanitized) return "";
	return truncateUtf16Safe(stripMarkdown(sanitized, { linkStyle: "label" }).replace(/\s+/gu, " ").trim(), maxChars);
}
//#endregion
//#region src/gateway/session-observer-preamble.ts
const PREAMBLE_HEADLINE_MAX_CHARS = 120;
const PREAMBLE_PUBLISH_INTERVAL_MS = 2e3;
function createSessionObserverPreamblePublisher(params) {
	const entries = /* @__PURE__ */ new Map();
	const generations = /* @__PURE__ */ new WeakMap();
	const clear = (state) => {
		const entry = entries.get(state);
		if (entry?.timer) params.clearTimeoutFn(entry.timer);
		entries.delete(state);
	};
	const publish = (state, entry) => {
		entry.timer = void 0;
		if (!params.isCurrent(state)) {
			clear(state);
			return;
		}
		const previous = state.previousDigest;
		if (previous?.runId === state.runId && previous.headline === entry.headline) {
			clear(state);
			return;
		}
		state.revision += 1;
		const digest = {
			sessionKey: state.sessionKey,
			agentId: state.agentId,
			runId: state.runId,
			revision: state.revision,
			updatedAt: Math.max(entry.updatedAt, (previous?.updatedAt ?? -1) + 1),
			headline: entry.headline,
			health: previous?.runId === state.runId && previous.health !== "done" && previous.health !== "failed" ? previous.health : "on-track",
			...state.planProgress ? { planProgress: state.planProgress } : {}
		};
		state.previousDigest = digest;
		state.lastPublishedPreambleHeadline = entry.headline;
		entry.lastPublishedAt = params.now();
		entry.published = true;
		params.publish(state, digest);
	};
	return {
		handle(state, event) {
			if (event.stream !== "item" || event.data.kind !== "preamble") return false;
			const headline = normalizeSessionPreambleText(event.data.progressText, PREAMBLE_HEADLINE_MAX_CHARS);
			if (!headline) return true;
			const existing = entries.get(state);
			const previousHeadline = state.lastPreambleHeadline ?? (state.previousDigest?.runId === state.runId ? state.previousDigest.headline : "");
			if (!existing && previousHeadline === headline) {
				state.lastPreambleHeadline = headline;
				state.lastPublishedPreambleHeadline = headline;
				return true;
			}
			const entry = existing ?? {
				headline: "",
				lastPublishedAt: 0,
				published: false,
				updatedAt: event.ts
			};
			if (previousHeadline !== headline) generations.set(state, (generations.get(state) ?? 0) + 1);
			state.lastPreambleHeadline = headline;
			entry.headline = headline;
			entry.updatedAt = event.ts;
			entries.set(state, entry);
			const elapsed = params.now() - entry.lastPublishedAt;
			if (!entry.published || elapsed >= PREAMBLE_PUBLISH_INTERVAL_MS) {
				if (entry.timer) params.clearTimeoutFn(entry.timer);
				publish(state, entry);
			} else if (!entry.timer) {
				entry.timer = params.setTimeoutFn(() => publish(state, entry), PREAMBLE_PUBLISH_INTERVAL_MS - elapsed);
				entry.timer.unref?.();
			}
			return true;
		},
		generation(state) {
			return generations.get(state) ?? 0;
		},
		flush(state) {
			const entry = entries.get(state);
			if (entry) {
				if (entry.timer) params.clearTimeoutFn(entry.timer);
				publish(state, entry);
			}
		},
		clear,
		dispose() {
			for (const state of entries.keys()) clear(state);
		}
	};
}
//#endregion
//#region src/gateway/session-observer.ts
const observerLog = createSubsystemLogger("gateway/session-observer");
const MIN_NOTES_PER_DIGEST = 4;
const MIN_DIGEST_INTERVAL_MS = 12e3;
const MAX_DIGESTS_PER_RUN = 40;
const MAX_LIVE_DIGESTS_PER_RUN = MAX_DIGESTS_PER_RUN - 1;
const MAX_CONSECUTIVE_FAILURES = 2;
const FINAL_DIGEST_MIN_RUN_MS = 3e4;
const MAX_CONCURRENT_MODEL_SESSIONS = 6;
function createSessionObserver(deps) {
	const now = deps.now ?? Date.now;
	const setTimeoutFn = deps.setTimeoutFn ?? setTimeout;
	const clearTimeoutFn = deps.clearTimeoutFn ?? clearTimeout;
	const resolveUtilityModelRef = deps.resolveUtilityModelRef ?? resolveUtilityModelRefForAgent;
	const prepareModel = deps.prepareModel ?? defaultPrepareModel;
	const completeModel = deps.completeModel ?? defaultCompleteModel;
	const readSession = deps.readSession ?? defaultReadSession;
	const persistDigest = deps.persistDigest ?? defaultPersistDigest;
	const states = /* @__PURE__ */ new Map();
	const dormantRuns = /* @__PURE__ */ new Map();
	const revisionFloors = /* @__PURE__ */ new Map();
	const supersededRuns = /* @__PURE__ */ new Map();
	const contextlessTerminalRuns = /* @__PURE__ */ new Map();
	const terminalRuns = /* @__PURE__ */ new Map();
	const disabledRuns = /* @__PURE__ */ new Set();
	const visibleConnections = /* @__PURE__ */ new Set();
	let disposed = false;
	const getCompanionSnapshot = (sessionKey) => {
		const cfg = deps.getConfig();
		const agentId = resolveSessionAgentId({
			sessionKey,
			config: cfg
		});
		const canonicalSessionKey = resolveStoredSessionKeyForAgentStore({
			cfg,
			agentId,
			sessionKey
		});
		const state = states.get(sessionObserverScopeKey(canonicalSessionKey, agentId));
		if (state) {
			flushSessionActivityAssistantNote(state);
			return {
				agentId: state.agentId,
				runId: state.runId,
				...state.previousDigest ? { digest: state.previousDigest } : {},
				notes: state.notes.map((note) => ({
					sequence: note.sequence,
					text: note.text
				}))
			};
		}
		const digest = readSession(canonicalSessionKey, agentId)?.observerDigest;
		return {
			agentId,
			...digest?.runId ? { runId: digest.runId } : {},
			...digest ? { digest } : {},
			notes: []
		};
	};
	const audience = createSessionObserverAudience({
		subscribers: deps.subscribers,
		sessionEventSubscribers: deps.sessionEventSubscribers,
		isVisible: (connId) => visibleConnections.has(connId),
		getDefaultAgentId: () => resolveDefaultAgentId(deps.getConfig())
	});
	const runStillCurrent = (runId, sessionKey, agentId) => () => !disposed && !supersededRuns.has(runId) && (states.get(sessionObserverScopeKey(sessionKey, agentId))?.runId ?? runId) === runId;
	const persistAcceptedDigest = createSessionObserverDigestPersister({
		now,
		persistDigest,
		stillCurrent: runStillCurrent,
		onMissingEntry: (state) => {
			disableModelForRun(state);
		},
		onError: (state, error) => {
			observerLog.warn("session observer digest persistence failed", {
				sessionKey: state.sessionKey,
				runId: state.runId,
				error
			});
		}
	});
	const preamblePublisher = createSessionObserverPreamblePublisher({
		now,
		setTimeoutFn,
		clearTimeoutFn,
		isCurrent: stateIsCurrent,
		publish: (state, digest) => {
			deps.broadcastToConnIds("session.observer", digest, audience.recipients(state.sessionKey, state.agentId), { dropIfSlow: true });
			persistAcceptedDigest(state, digest, false, "preamble");
		}
	});
	async function synthesizeTerminalDigest(source) {
		const runId = source.event?.runId ?? source.state?.runId;
		if (!runId) return;
		const dormant = dormantRuns.get(runId);
		const sessionKey = source.event?.sessionKey ?? source.state?.sessionKey ?? dormant?.sessionKey;
		const agentId = source.event?.agentId ?? source.state?.agentId ?? dormant?.agentId;
		if (!sessionKey || !agentId) return;
		const stillCurrent = runStillCurrent(runId, sessionKey, agentId);
		if (!stillCurrent()) return;
		try {
			const digest = await synthesizeSessionObserverTerminalDigest({
				source,
				dormant,
				readSession,
				persistDigest,
				now,
				stillCurrent
			});
			if (digest && stillCurrent()) deps.broadcastToConnIds("session.observer", digest, audience.recipients(digest.sessionKey, agentId), { dropIfSlow: true });
		} catch (error) {
			observerLog.warn("session observer terminal digest synthesis failed", {
				runId,
				error
			});
		}
	}
	const stateIsTracked = (state) => states.get(sessionObserverScopeKey(state.sessionKey, state.agentId)) === state;
	const dropState = (state) => {
		preamblePublisher.clear(state);
		if (state.timer) clearTimeoutFn(state.timer);
		modelSlots.invalidateRequest(state);
		const scopeKey = sessionObserverScopeKey(state.sessionKey, state.agentId);
		if (stateIsTracked(state)) states.delete(scopeKey);
	};
	const suspendState = (state) => {
		if (state.terminalHealth) {
			synthesizeTerminalDigest({ state });
			dormantRuns.delete(state.runId);
			dropState(state);
			return;
		}
		rememberSessionObserverDormantRun(dormantRuns, revisionFloors, createDormantSessionObserverRun(state));
		dropState(state);
	};
	const demoteUtilityModel = (state) => {
		if (state.timer) {
			clearTimeoutFn(state.timer);
			state.timer = void 0;
		}
		modelSlots.invalidateRequest(state);
		state.preparedPromise = void 0;
		state.utilityModelRef = void 0;
		state.consecutiveFailures = 0;
	};
	const modelSlots = createSessionObserverModelSlots({
		states,
		maxSessions: MAX_CONCURRENT_MODEL_SESSIONS,
		resolve: (agentId) => resolveUtilityModelRef({
			cfg: deps.getConfig(),
			agentId
		}),
		demote: demoteUtilityModel
	});
	const disableModelForRun = (state) => {
		rememberSessionObserverDisabledRun(disabledRuns, state.runId);
		demoteUtilityModel(state);
	};
	const suspendStatesWithoutAudience = () => {
		for (const state of states.values()) if (!audience.has(state.sessionKey, state.agentId)) suspendState(state);
	};
	const unsubscribeChanges = deps.subscribers.onChange(() => suspendStatesWithoutAudience());
	function stateIsCurrent(state) {
		return !disposed && stateIsTracked(state) && audience.has(state.sessionKey, state.agentId) && deps.getConfig().gateway?.controlUi?.sessionObserver !== false;
	}
	function modelStateIsCurrent(state) {
		if (!stateIsCurrent(state) || !state.utilityModelRef) return false;
		return resolveUtilityModelRef({
			cfg: deps.getConfig(),
			agentId: state.agentId
		}) === state.utilityModelRef;
	}
	const requestModelDigest = createSessionObserverCompletion({
		getConfig: deps.getConfig,
		prepareModel,
		completeModel,
		now,
		setTimeoutFn,
		clearTimeoutFn,
		isCurrent: modelStateIsCurrent
	});
	const pendingNotes = (state) => state.notes.filter((note) => note.sequence > state.lastDigestNoteSequence);
	const schedule = (state, run) => {
		if (!stateIsCurrent(state)) {
			if (disposed) dropState(state);
			else suspendState(state);
			return;
		}
		if (!modelStateIsCurrent(state)) return;
		if (state.inFlight || state.timer || state.terminalHealth) return;
		if (state.digestCount >= MAX_LIVE_DIGESTS_PER_RUN) return;
		if (pendingNotes(state).length < MIN_NOTES_PER_DIGEST) return;
		const delay = Math.max(0, MIN_DIGEST_INTERVAL_MS - (now() - state.lastRunAt));
		if (delay === 0) {
			run(state, false);
			return;
		}
		state.timer = setTimeoutFn(() => {
			state.timer = void 0;
			run(state, false);
		}, delay);
	};
	const runDigest = (state, final) => {
		if (!stateIsCurrent(state)) {
			if (disposed) dropState(state);
			else suspendState(state);
			return;
		}
		if (!modelStateIsCurrent(state)) {
			if (final) {
				synthesizeTerminalDigest({ state });
				dormantRuns.delete(state.runId);
				dropState(state);
			}
			return;
		}
		if (state.inFlight) {
			state.finalPending ||= final;
			return;
		}
		const digestLimit = final ? MAX_DIGESTS_PER_RUN : MAX_LIVE_DIGESTS_PER_RUN;
		if (state.digestCount >= digestLimit) return;
		flushSessionActivityAssistantNote(state);
		const selectedNotes = pendingNotes(state);
		if (!final && selectedNotes.length < MIN_NOTES_PER_DIGEST) return;
		if (!final && now() - state.lastRunAt < MIN_DIGEST_INTERVAL_MS) {
			schedule(state, runDigest);
			return;
		}
		if (state.timer) {
			clearTimeoutFn(state.timer);
			state.timer = void 0;
		}
		state.inFlight = true;
		state.lastRunAt = now();
		const lastSelectedSequence = selectedNotes.at(-1)?.sequence ?? state.lastDigestNoteSequence;
		const retireSelectedNotes = () => {
			state.lastDigestNoteSequence = Math.max(state.lastDigestNoteSequence, lastSelectedSequence);
		};
		const requestGeneration = modelSlots.beginRequest(state);
		state.digestCount += 1;
		(async () => {
			try {
				const modelDigest = await requestModelDigest(state, selectedNotes.map((note) => note.text));
				if (!modelStateIsCurrent(state) || !modelSlots.requestIsCurrent(state, requestGeneration) || !final && state.terminalHealth !== void 0) {
					retireSelectedNotes();
					if (final && stateIsTracked(state)) {
						synthesizeTerminalDigest({ state });
						dormantRuns.delete(state.runId);
						dropState(state);
					}
					return;
				}
				if (state.sessionId && readSession(state.sessionKey, state.agentId)?.sessionId !== state.sessionId) return;
				preamblePublisher.clear(state);
				state.consecutiveFailures = 0;
				state.revision += 1;
				retireSelectedNotes();
				const digest = {
					sessionKey: state.sessionKey,
					agentId: state.agentId,
					runId: state.runId,
					revision: state.revision,
					updatedAt: now(),
					headline: modelDigest.headline,
					...modelDigest.assessment ? { assessment: modelDigest.assessment } : {},
					health: final ? state.terminalHealth ?? modelDigest.health : modelDigest.health,
					...state.planProgress ?? modelDigest.planProgress ? { planProgress: state.planProgress ?? modelDigest.planProgress } : {}
				};
				const previous = state.previousDigest?.health;
				const next = digest.health;
				const criticalTransition = (next === "stuck" || next === "waiting-on-user") && previous !== next;
				state.previousDigest = digest;
				const recipients = criticalTransition ? audience.criticalRecipients(state.sessionKey, state.agentId) : audience.recipients(state.sessionKey, state.agentId);
				deps.broadcastToConnIds("session.observer", digest, recipients, { dropIfSlow: true });
				await persistAcceptedDigest(state, digest, final);
				if (final) dormantRuns.delete(state.runId);
			} catch (error) {
				if (!modelStateIsCurrent(state) || !modelSlots.requestIsCurrent(state, requestGeneration) || !final && state.terminalHealth !== void 0) {
					retireSelectedNotes();
					if (final && stateIsTracked(state)) {
						synthesizeTerminalDigest({ state });
						dormantRuns.delete(state.runId);
						dropState(state);
					}
					return;
				}
				state.consecutiveFailures += 1;
				if (state.consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
					observerLog.warn("session observer disabled after consecutive failures", {
						sessionKey: state.sessionKey,
						runId: state.runId,
						error
					});
					if (final || state.finalPending || state.terminalHealth) {
						synthesizeTerminalDigest({ state });
						dormantRuns.delete(state.runId);
						dropState(state);
					} else disableModelForRun(state);
				} else if (final) state.finalPending = true;
			} finally {
				if (stateIsTracked(state)) {
					state.inFlight = false;
					const runFinal = state.finalPending;
					state.finalPending = false;
					if (runFinal) runDigest(state, true);
					else if (final) dropState(state);
					else schedule(state, runDigest);
				}
			}
		})();
	};
	const admitState = (event, allowPreambleOnly, sessionKey, agentId) => {
		if (!agentId || !audience.has(sessionKey, agentId)) return;
		const scopeKey = sessionObserverScopeKey(sessionKey, agentId);
		if (deps.getConfig().gateway?.controlUi?.sessionObserver === false) return;
		const utilityModelRef = disabledRuns.has(event.runId) ? void 0 : modelSlots.claim(agentId);
		if (!utilityModelRef && !allowPreambleOnly) return;
		const dormant = dormantRuns.get(event.runId);
		if (dormant) {
			dormantRuns.delete(event.runId);
			const { utilityModelRef: _dormantModelRef, ...dormantState } = dormant;
			const state = {
				...createSessionActivityNoteState(),
				...dormantState,
				...dormantState.lastPreambleHeadline ? { lastPublishedPreambleHeadline: dormantState.lastPreambleHeadline } : {},
				...utilityModelRef ? { utilityModelRef } : {},
				lastActivityAt: event.ts,
				lastRunAt: now(),
				lastDigestNoteSequence: 0,
				inFlight: false,
				finalPending: false
			};
			states.set(scopeKey, state);
			return state;
		}
		const session = readSession(sessionKey, agentId);
		const startedAt = readFiniteNumber(event.data.startedAt) ?? session?.startedAt ?? event.ts ?? now();
		const state = {
			...createSessionActivityNoteState(),
			sessionKey,
			sessionId: event.sessionId ?? session?.sessionId,
			runId: event.runId,
			agentId,
			...utilityModelRef ? { utilityModelRef } : {},
			startedAt,
			lastActivityAt: event.ts,
			lastRunAt: startedAt,
			lastPersistedAt: session?.observerDigest?.updatedAt,
			revision: session?.observerDigest?.revision ?? 0,
			digestCount: 0,
			consecutiveFailures: 0,
			lastDigestNoteSequence: 0,
			previousDigest: session?.observerDigest,
			inFlight: false,
			finalPending: false
		};
		states.set(scopeKey, state);
		return state;
	};
	const handleEvent = (event) => {
		if (disposed || getAgentRunContext(event.runId)?.isHeartbeat) return;
		const terminal = isTerminalLifecycleEvent(event);
		if (terminalRuns.has(event.runId)) return;
		if (supersededRuns.has(event.runId)) {
			if (terminal) {
				markSessionObserverRunSuperseded(terminalRuns, event.runId, event.ts);
				contextlessTerminalRuns.delete(event.runId);
				supersededRuns.delete(event.runId);
				dormantRuns.delete(event.runId);
				disabledRuns.delete(event.runId);
			}
			return;
		}
		if (contextlessTerminalRuns.has(event.runId) && !terminal) return;
		const eventSessionKey = event.sessionKey?.trim();
		const eventAgentId = event.agentId?.trim();
		let knownRun;
		if (terminal && (!eventSessionKey || !eventAgentId)) {
			for (const candidate of states.values()) if (candidate.runId === event.runId) {
				knownRun = candidate;
				break;
			}
			knownRun ??= dormantRuns.get(event.runId);
		}
		const sessionKey = eventSessionKey || knownRun?.sessionKey;
		if (!sessionKey) {
			if (terminal) markSessionObserverRunSuperseded(contextlessTerminalRuns, event.runId, event.ts);
			return;
		}
		const agentId = eventAgentId || knownRun?.agentId;
		if (terminal) {
			contextlessTerminalRuns.delete(event.runId);
			markSessionObserverRunSuperseded(terminalRuns, event.runId, event.ts);
		}
		const isPreamble = event.stream === "item" && event.data.kind === "preamble";
		if (!agentId) {
			if (terminal) {
				synthesizeTerminalDigest({ event });
				dormantRuns.delete(event.runId);
				disabledRuns.delete(event.runId);
			}
			return;
		}
		const scopeKey = sessionObserverScopeKey(sessionKey, agentId);
		if (terminal && audience.recipients(sessionKey, agentId).size === 0) {
			synthesizeTerminalDigest({
				event,
				state: states.get(scopeKey)
			});
			dormantRuns.delete(event.runId);
			disabledRuns.delete(event.runId);
			return;
		}
		const isRunStart = event.stream === "lifecycle" && event.data.phase === "start";
		let revisionFloor = revisionFloors.get(scopeKey);
		let state = states.get(scopeKey);
		if (state && state.runId !== event.runId) {
			const candidate = {
				revision: state.revision,
				previousDigest: state.previousDigest
			};
			if (!revisionFloor || candidate.revision > revisionFloor.revision) revisionFloor = candidate;
			const supersededRunId = state.runId;
			if (isRunStart) markSessionObserverRunSuperseded(supersededRuns, supersededRunId, event.ts);
			suspendState(state);
			if (isRunStart) dormantRuns.delete(supersededRunId);
			state = void 0;
		}
		if (!state) {
			const superseded = [...dormantRuns.values()].filter((run) => sessionObserverScopeKey(run.sessionKey, run.agentId) === scopeKey && run.runId !== event.runId).toSorted((left, right) => right.revision - left.revision || left.runId.localeCompare(right.runId));
			const latest = superseded[0];
			if (latest && (!revisionFloor || latest.revision > revisionFloor.revision)) revisionFloor = {
				revision: latest.revision,
				previousDigest: latest.previousDigest
			};
			if (isRunStart) {
				if (revisionFloor) rememberSessionObserverRevisionFloor(revisionFloors, scopeKey, revisionFloor);
				for (const run of superseded) {
					markSessionObserverRunSuperseded(supersededRuns, run.runId, event.ts);
					dormantRuns.delete(run.runId);
				}
			}
		}
		if (state && (!audience.has(sessionKey, agentId) || deps.getConfig().gateway?.controlUi?.sessionObserver === false)) {
			suspendState(state);
			state = void 0;
		}
		if (!state) state = admitState(event, isPreamble, sessionKey, agentId);
		if (!state) {
			if (terminal) {
				synthesizeTerminalDigest({ event });
				dormantRuns.delete(event.runId);
				disabledRuns.delete(event.runId);
			}
			return;
		}
		if (state.terminalHealth) return;
		if (revisionFloor && revisionFloor.revision > state.revision) {
			state.revision = revisionFloor.revision;
			state.previousDigest = revisionFloor.previousDigest;
		}
		revisionFloors.delete(scopeKey);
		const utilityModelRef = disabledRuns.has(state.runId) ? void 0 : modelSlots.claim(state.agentId, state);
		if (state.utilityModelRef !== utilityModelRef) {
			modelSlots.invalidateRequest(state);
			state.preparedPromise = void 0;
			state.utilityModelRef = utilityModelRef;
			state.consecutiveFailures = 0;
		}
		state.lastActivityAt = event.ts;
		const eventStartedAt = readFiniteNumber(event.data.startedAt);
		if (eventStartedAt !== void 0) state.startedAt = Math.min(state.startedAt, eventStartedAt);
		noteSessionActivityEvent(state, event);
		preamblePublisher.handle(state, event);
		if (terminal) {
			if (!state.terminalHealth) modelSlots.invalidateRequest(state);
			preamblePublisher.flush(state);
			preamblePublisher.clear(state);
			state.terminalHealth = terminalHealthFor(event);
			disabledRuns.delete(event.runId);
			const endedAt = readFiniteNumber(event.data.endedAt) ?? now();
			if (!(state.previousDigest?.runId === state.runId) && endedAt - state.startedAt < FINAL_DIGEST_MIN_RUN_MS) {
				dormantRuns.delete(state.runId);
				dropState(state);
				return;
			}
			runDigest(state, true);
			return;
		}
		schedule(state, runDigest);
	};
	return {
		handleEvent,
		setConnectionVisibility(connId, visible) {
			if (visible) {
				visibleConnections.add(connId);
				return;
			}
			visibleConnections.delete(connId);
			suspendStatesWithoutAudience();
		},
		removeConnection(connId) {
			if (visibleConnections.delete(connId)) suspendStatesWithoutAudience();
		},
		getCompanionSnapshot,
		dispose() {
			disposed = true;
			preamblePublisher.dispose();
			unsubscribeChanges();
			for (const state of states.values()) dropState(state);
			dormantRuns.clear();
			revisionFloors.clear();
			supersededRuns.clear();
			terminalRuns.clear();
			disabledRuns.clear();
			visibleConnections.clear();
		}
	};
}
//#endregion
//#region src/gateway/server-runtime-subscriptions.ts
function dispatchEventHandler(params) {
	params.loadHandler().then((handler) => handler(params.event)).catch((error) => {
		params.log.warn(params.failureMessage, {
			...params.context,
			error
		});
	});
}
/** Register gateway runtime event subscriptions and return unsubscribe handles. */
function startGatewayEventSubscriptions(params) {
	const runtimeConfig = getRuntimeConfig();
	const auditEnabled = isAuditLedgerEnabled(runtimeConfig);
	const auditMessageMode = resolveAuditMessageMode(runtimeConfig);
	const auditRecorder = createAuditEventRecorder({ messageMode: auditEnabled ? auditMessageMode : "off" });
	const sessionObserver = createSessionObserver({
		getConfig: getRuntimeConfig,
		subscribers: params.sessionMessageSubscribers,
		sessionEventSubscribers: params.sessionEventSubscribers,
		broadcastToConnIds: params.broadcastToConnIds
	});
	const sessionCompanion = createSessionCompanion({
		getConfig: getRuntimeConfig,
		sessionObserver
	});
	const unsubscribePrivateAuditEvents = auditEnabled ? onAgentAuditEvent(auditRecorder.record) : void 0;
	const unsubscribeToolAuditEvents = auditEnabled ? onTrustedToolExecutionEvent(auditRecorder.recordTool) : void 0;
	const unsubscribeMessageAuditEvents = auditEnabled && auditMessageMode !== "off" ? onTrustedMessageAuditEvent(auditRecorder.recordMessage) : void 0;
	const agentEventHandlerLoader = createLazyPromiseLoader(() => {
		return Promise.all([import("./server-chat-B20vPYoE.js"), import("./server-session-key-AzXHpIkX.js")]).then(([{ createAgentEventHandler }, { resolveSessionKeyForRun }]) => createAgentEventHandler({
			broadcast: params.broadcast,
			broadcastToConnIds: params.broadcastToConnIds,
			nodeSendToSession: params.nodeSendToSession,
			agentRunSeq: params.agentRunSeq,
			chatRunState: params.chatRunState,
			resolveSessionKeyForRun,
			clearAgentRunContext,
			toolEventRecipients: params.toolEventRecipients,
			sessionEventSubscribers: params.sessionEventSubscribers,
			sessionMessageSubscribers: params.sessionMessageSubscribers,
			updateRunToolErrorSummary: ({ runId, clientRunId, summary }) => {
				for (const candidateRunId of /* @__PURE__ */ new Set([runId, clientRunId])) {
					const entry = params.chatAbortControllers.get(candidateRunId);
					if (entry) entry.toolErrorSummary = summary;
				}
			},
			clearTrackedActiveRun: ({ runId, clientRunId }) => {
				const candidateRunIds = runId === clientRunId ? [runId] : [runId, clientRunId];
				for (const candidateRunId of candidateRunIds) {
					const entry = params.chatAbortControllers.get(candidateRunId);
					if (entry) {
						entry.projectSessionActive = false;
						entry.projectSessionTerminalPending = false;
						entry.projectSessionTerminalPersisted = false;
						queueMicrotask(() => {
							if (params.chatAbortControllers.get(candidateRunId) === entry && entry.registrationCleanupRequested === true && !entry.projectSessionTerminalPersistence) removeChatAbortControllerEntry(params.chatAbortControllers, candidateRunId, entry);
						});
					}
				}
			},
			markTrackedRunTerminalPersisted: ({ runId, clientRunId }) => {
				const candidateRunIds = runId === clientRunId ? [runId] : [runId, clientRunId];
				for (const candidateRunId of candidateRunIds) {
					params.restartRecoveryCandidates.delete(candidateRunId);
					const entry = params.chatAbortControllers.get(candidateRunId);
					if (entry) {
						entry.projectSessionTerminalPending = false;
						entry.projectSessionTerminalPersisted = true;
						entry.projectSessionTerminalPersistence = void 0;
					}
				}
			},
			trackTrackedRunTerminalPersistence: ({ runId, clientRunId, sessionId: terminalSessionId, observedAt, persistence }) => {
				const candidateRunIds = runId === clientRunId ? [runId] : [runId, clientRunId];
				for (const candidateRunId of candidateRunIds) {
					const entry = params.chatAbortControllers.get(candidateRunId);
					if (entry) {
						entry.projectSessionTerminalPending = false;
						entry.projectSessionTerminalPersistence = persistence;
						if (entry.registrationCleanupRequested === true) persistence.catch(() => void 0).then(() => {
							if (params.chatAbortControllers.get(candidateRunId) === entry) removeChatAbortControllerEntry(params.chatAbortControllers, candidateRunId, entry);
						});
						const lifecycleGeneration = entry.lifecycleGeneration?.trim();
						const sessionKey = entry.sessionKey.trim();
						const sessionId = terminalSessionId?.trim() || entry.sessionId.trim();
						if (entry.controlUiVisible !== false && lifecycleGeneration && sessionKey && sessionId) persistence.catch(() => {
							params.restartRecoveryCandidates.set(candidateRunId, {
								runId: candidateRunId,
								lifecycleGeneration,
								sessionKey,
								sessionId,
								observedAt
							});
						});
					}
				}
			},
			isChatSendRunActive: (runId) => {
				const entry = params.chatAbortControllers.get(runId);
				return entry !== void 0 && entry.kind !== "agent";
			},
			resolveActiveLifecycleGenerationForRun: (runId) => params.chatAbortControllers.get(runId)?.lifecycleGeneration,
			resolveSessionActiveRunState: (session) => resolveVisibleActiveSessionRunState({
				context: params,
				...session,
				defaultAgentId: resolveDefaultAgentId(getRuntimeConfig())
			})
		}));
	}, { cacheRejections: true });
	const getAgentEventHandler = agentEventHandlerLoader.load;
	const getSessionEventsModule = createLazyPromise(() => import("./server-session-events-gFxD96De.js"), { cacheRejections: true });
	let transcriptUpdateHandlerPromise = null;
	const getTranscriptUpdateHandler = () => {
		transcriptUpdateHandlerPromise ??= getSessionEventsModule().then(({ createTranscriptUpdateBroadcastHandler }) => createTranscriptUpdateBroadcastHandler({
			broadcastToConnIds: params.broadcastToConnIds,
			sessionEventSubscribers: params.sessionEventSubscribers,
			sessionMessageSubscribers: params.sessionMessageSubscribers,
			chatAbortControllers: params.chatAbortControllers
		}));
		return transcriptUpdateHandlerPromise;
	};
	let lifecycleEventHandlerPromise = null;
	const getLifecycleEventHandler = () => {
		lifecycleEventHandlerPromise ??= getSessionEventsModule().then(({ createLifecycleEventBroadcastHandler }) => createLifecycleEventBroadcastHandler({
			broadcastToConnIds: params.broadcastToConnIds,
			sessionEventSubscribers: params.sessionEventSubscribers,
			chatAbortControllers: params.chatAbortControllers
		}));
		return lifecycleEventHandlerPromise;
	};
	const unsubscribeAgentEvents = onAgentRuntimeEvent((evt) => {
		sessionObserver.handleEvent(evt);
		if (auditEnabled) auditRecorder.record(evt);
		const lifecyclePhase = evt.stream === "lifecycle" && typeof evt.data?.phase === "string" ? evt.data.phase : void 0;
		if (lifecyclePhase === "end" || lifecyclePhase === "error") {
			const clientRunId = (evt.contextClaimId ? void 0 : params.chatRunState.registry.peek(evt.runId))?.clientRunId ?? evt.runId;
			const candidateRunIds = evt.runId === clientRunId ? [evt.runId] : [evt.runId, clientRunId];
			for (const candidateRunId of candidateRunIds) {
				const entry = params.chatAbortControllers.get(candidateRunId);
				const eventLifecycleGeneration = evt.lifecycleGeneration?.trim();
				if (entry && (!eventLifecycleGeneration || !entry.lifecycleGeneration || entry.lifecycleGeneration === eventLifecycleGeneration)) {
					entry.projectSessionTerminalPending = true;
					entry.projectSessionTerminalObservedAt = typeof evt.data.endedAt === "number" && Number.isFinite(evt.data.endedAt) ? evt.data.endedAt : evt.ts;
				}
			}
		} else if (lifecyclePhase === "start") {
			const clientRunId = (evt.contextClaimId ? void 0 : params.chatRunState.registry.peek(evt.runId))?.clientRunId ?? evt.runId;
			const candidateRunIds = evt.runId === clientRunId ? [evt.runId] : [evt.runId, clientRunId];
			const eventLifecycleGeneration = evt.lifecycleGeneration?.trim();
			for (const candidateRunId of candidateRunIds) {
				const entry = params.chatAbortControllers.get(candidateRunId);
				if (entry && (!eventLifecycleGeneration || !entry.lifecycleGeneration || entry.lifecycleGeneration === eventLifecycleGeneration)) {
					entry.projectSessionTerminalPending = false;
					entry.projectSessionTerminalObservedAt = void 0;
				}
			}
		}
		dispatchEventHandler({
			loadHandler: getAgentEventHandler,
			event: evt,
			log: params.log,
			failureMessage: "Agent event dispatch failed",
			context: {
				runId: evt.runId,
				stream: evt.stream
			}
		});
	});
	const agentUnsub = async () => {
		unsubscribeAgentEvents();
		sessionCompanion.dispose();
		sessionObserver.dispose();
		unsubscribePrivateAuditEvents?.();
		unsubscribeToolAuditEvents?.();
		unsubscribeMessageAuditEvents?.();
		await agentEventHandlerLoader.peek()?.then((handler) => handler.dispose()).catch(() => void 0);
		await auditRecorder.stop();
	};
	const heartbeatUnsub = onHeartbeatEvent((evt) => {
		params.broadcast("heartbeat", evt, { dropIfSlow: true });
	});
	const transcriptUnsub = onInternalSessionTranscriptUpdate((evt) => {
		dispatchEventHandler({
			loadHandler: getTranscriptUpdateHandler,
			event: evt,
			log: params.log,
			failureMessage: "Transcript update dispatch failed",
			context: { sessionKey: evt.sessionKey }
		});
	});
	const lifecycleUnsub = onSessionLifecycleEvent((evt) => {
		dispatchEventHandler({
			loadHandler: getLifecycleEventHandler,
			event: evt,
			log: params.log,
			failureMessage: "Lifecycle event dispatch failed",
			context: { sessionKey: evt.sessionKey }
		});
	});
	let taskObserverDisposed = false;
	const taskObservers = { onEvent: (event) => {
		let payload;
		switch (event.kind) {
			case "upserted":
				payload = {
					action: "upserted",
					task: mapTaskSummary(event.task)
				};
				break;
			case "deleted":
				payload = {
					action: "deleted",
					taskId: event.taskId
				};
				break;
			case "restored":
				payload = { action: "restored" };
				break;
		}
		params.broadcast("task", payload, { dropIfSlow: true });
	} };
	const taskObserverRuntimePromise = import("./task-registry.store-DUQg3J8v.js").then((module) => {
		if (!taskObserverDisposed) module.configureTaskRegistryRuntime({ observers: taskObservers });
		return module;
	});
	taskObserverRuntimePromise.catch((error) => {
		params.log.warn("Task registry observer registration failed", { error });
	});
	const taskUnsub = () => {
		taskObserverDisposed = true;
		return taskObserverRuntimePromise.then((module) => {
			if (module.getTaskRegistryObservers() === taskObservers) module.configureTaskRegistryRuntime({ observers: null });
		}).catch(() => void 0);
	};
	return {
		sessionCompanion,
		sessionObserver,
		agentUnsub,
		heartbeatUnsub,
		transcriptUnsub,
		lifecycleUnsub,
		taskUnsub
	};
}
//#endregion
export { startGatewayEventSubscriptions };
