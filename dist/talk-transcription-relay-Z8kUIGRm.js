import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { C as resolveExpiresAtMsFromDurationMs, g as parseFiniteNumber, o as asDateTimestampMs } from "./number-coercion-Crk_c9KW.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { n as resolveGlobalMap } from "./global-singleton-Dc_stLtU.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { r as normalizeTalkSection } from "./talk-tpRQh2VT.js";
import { t as canonicalizeBase64 } from "./base64-KcXAb-1x.js";
import { O as VOICE_TRANSCRIPT_QUEUE_POLICY, S as createOrResumeClientVoiceSession, _ as appendRelayVoiceTranscript, b as closeRelayVoiceSessionRecord, k as normalizeVoiceTranscriptText, w as registerClientVoiceConsultRun } from "./agent-tools.before-tool-call-QIXc-Jm8.js";
import { s as registerChatAbortController, t as abortChatRunById } from "./chat-abort-dteij8GM.js";
import { t as createPluginRuntime } from "./runtime-B7Rc56TK.js";
import { H as REALTIME_VOICE_AUDIO_FORMAT_PCM16_24KHZ, M as createTalkSessionController, P as recordTalkObservabilityEvent, f as consultRealtimeVoiceAgent, j as readSpeakableRealtimeVoiceToolResult, m as REALTIME_VOICE_AGENT_CONSULT_TOOL_NAME, t as createRealtimeVoiceSessionHarness, y as buildRealtimeVoiceAgentConsultWorkingResponse } from "./realtime-session-harness-bu55PsqP.js";
import { a as buildRealtimeVoiceAgentCancelProviderResult, d as shouldAutoControlRealtimeVoiceAgentText, o as buildRealtimeVoiceAgentControlSpeechMessage, t as controlRealtimeVoiceAgentRun } from "./agent-run-control-DL07gYjz.js";
import "./server-utils-Z6YDwlLk.js";
import { randomUUID } from "node:crypto";
import { Buffer as Buffer$1 } from "node:buffer";
//#region src/talk/agent-target.ts
/** Resolves the configured owner for Talk work that has no agent-scoped session key. */
function resolveTalkTargetAgentId(config) {
	return normalizeAgentId(normalizeOptionalString(config.talk?.agentId) ?? resolveDefaultAgentId(config));
}
/** Agent-scoped keys own their Talk session; legacy/unscoped aliases use the Talk target. */
function resolveTalkSessionAgentId(config, sessionKey) {
	return resolveAgentIdFromSessionKey(sessionKey, resolveTalkTargetAgentId(config));
}
//#endregion
//#region src/gateway/talk-realtime-relay-state.ts
const RELAY_SESSION_TTL_MS = 1800 * 1e3;
const RELAY_EVENT = "talk.event";
const RELAY_TRANSCRIPT_ECHO_LOOKBACK_MS = 12e3;
const noFallbackRelayOutputFlush = () => {};
const relaySessions = /* @__PURE__ */ new Map();
const drainingRelaySessions = /* @__PURE__ */ new Set();
function adoptRelayProviderToolCallId(session, providerCallId) {
	const current = session.relayToolCallIdsByProviderId.get(providerCallId);
	if (current) {
		if (session.toolCalls.isAgentCompleted(current) || session.toolCalls.isProviderCompleted(providerCallId)) return;
		return current;
	}
	const relayCallId = session.toolCalls.isAgentCompleted(providerCallId) ? `relay-${randomUUID()}` : providerCallId;
	if (!session.toolCalls.tryAdmit([providerCallId, relayCallId])) return;
	session.toolCalls.deleteProviderCompleted(providerCallId);
	session.toolCalls.deleteAgentCompleted(relayCallId);
	session.providerToolCallIds.set(relayCallId, providerCallId);
	session.relayToolCallIdsByProviderId.set(providerCallId, relayCallId);
	return relayCallId;
}
function resolveRelayProviderToolCallId(session, relayCallId) {
	return session.providerToolCallIds.get(relayCallId) ?? relayCallId;
}
function broadcastToOwner$1(context, connId, event) {
	const delivery = relayEventDeliveryOptions(event, event.talkEvent);
	context.broadcastToConnIds(RELAY_EVENT, event, /* @__PURE__ */ new Set([connId]), delivery);
}
function relayEventDeliveryOptions(event, talkEvent) {
	switch (event.type) {
		case "audio":
		case "inputAudio": return { dropIfSlow: true };
		case "transcript": return { dropIfSlow: !event.final };
		case "toolProgress":
		case "toolResult": return { dropIfSlow: talkEvent?.final !== true };
		default: return { dropIfSlow: false };
	}
}
function ensureRelayTurn(session) {
	const turn = session.harness.talk.ensureTurn();
	if (turn.event) broadcastToOwner$1(session.context, session.connId, {
		relaySessionId: session.id,
		type: "inputAudio",
		byteLength: 0,
		talkEvent: turn.event
	});
	return turn.turnId;
}
//#endregion
//#region src/gateway/talk-realtime-relay-provider-results.ts
function suppressedToolResultOptions(session) {
	return session.bridge.bridge.supportsToolResultSuppression === false ? void 0 : { suppressResponse: true };
}
function broadcastToolResultToOwner(session, params) {
	const payload = params.forced === true ? {
		result: params.result,
		forced: true
	} : { result: params.result };
	broadcastToOwner$1(session.context, session.connId, {
		relaySessionId: session.id,
		type: "toolResult",
		callId: params.callId,
		talkEvent: session.harness.talk.emit({
			type: "tool.result",
			callId: params.callId,
			turnId: params.turnId,
			payload,
			final: params.final
		})
	});
}
function completeAfterToolResultSubmissions(session, submissions, onAccepted) {
	const pending = submissions.filter((submission) => submission !== void 0);
	const complete = () => {
		if (relaySessions.get(session.id) === session) onAccepted();
	};
	if (pending.length === 0) {
		complete();
		return;
	}
	return Promise.all(pending).then(complete);
}
function submitFinalProviderToolResult(params) {
	const epoch = params.session.toolResultEpoch;
	const providerCallId = resolveRelayProviderToolCallId(params.session, params.callId);
	if (params.session.toolCalls.isProviderCompleted(providerCallId)) {
		if (relaySessions.get(params.session.id) === params.session && params.session.toolResultEpoch === epoch) params.onAccepted?.();
		return;
	}
	const pending = params.session.pendingProviderToolResults.get(params.callId);
	if (pending) return pending;
	const submit = () => params.session.bridge.submitToolResult(providerCallId, params.result, params.options);
	const working = params.session.pendingWorkingToolResults.get(params.callId);
	const submitAfterWorking = async () => {
		if (relaySessions.get(params.session.id) !== params.session) return false;
		if (params.session.toolResultEpoch !== epoch) {
			if (!params.session.toolCalls.hasCancelled(params.callId)) return false;
			await params.session.bridge.submitToolResult(providerCallId, buildRealtimeVoiceAgentCancelProviderResult("OpenClaw cancelled this consult before completion. Do not restart it."), suppressedToolResultOptions(params.session));
			if (!params.session.toolCalls.markProviderCompleted([providerCallId]) || !params.session.toolCalls.markAgentCompleted([params.callId])) return false;
			params.session.toolCalls.deleteCancelled(params.callId);
			return false;
		}
		await submit();
		return true;
	};
	const submission = working ? working.then(submitAfterWorking, submitAfterWorking) : submit();
	const accept = () => {
		if (params.session.toolResultEpoch !== epoch) return;
		if (!params.session.toolCalls.markProviderCompleted([providerCallId])) return;
		if (relaySessions.get(params.session.id) === params.session) params.onAccepted?.();
	};
	if (!submission) {
		accept();
		return;
	}
	const tracked = submission.then((submitted) => {
		if (submitted !== false) accept();
	}).finally(() => {
		if (params.session.pendingProviderToolResults.get(params.callId) === tracked) params.session.pendingProviderToolResults.delete(params.callId);
	});
	params.session.pendingProviderToolResults.set(params.callId, tracked);
	return tracked;
}
function trackAgentFinalToolResult(session, callId, completion) {
	if (!completion) return;
	const tracked = completion.finally(() => {
		if (session.pendingFinalToolResults.get(callId) === tracked) session.pendingFinalToolResults.delete(callId);
	});
	session.pendingFinalToolResults.set(callId, tracked);
	return tracked;
}
function trackPendingWorkingToolResult(session, callId, completion) {
	if (!completion) return;
	const tracked = completion.finally(() => {
		if (session.pendingWorkingToolResults.get(callId) === tracked) session.pendingWorkingToolResults.delete(callId);
	});
	session.pendingWorkingToolResults.set(callId, tracked);
	return tracked;
}
function clearRelayAgentToolCall(session, callId) {
	const runId = session.activeAgentToolCalls.get(callId);
	session.activeAgentToolCalls.delete(callId);
	if (!runId) return;
	if (![...session.activeAgentToolCalls.values()].includes(runId)) session.activeAgentRuns.delete(runId);
}
//#endregion
//#region src/gateway/talk-realtime-relay-forced-consults.ts
const FORCED_CONSULT_FALLBACK_DELAY_MS = 200;
const FORCED_CONSULT_RESULT_MAX_CHARS = 1800;
function isWorkingToolResult(result) {
	return Boolean(result) && typeof result === "object" && !Array.isArray(result) && result.status === "working";
}
function buildForcedConsultCheckingPrompt() {
	return ["Briefly tell the person that you are checking with OpenClaw.", "Do not answer the request yet. Wait for the OpenClaw result before giving the actual answer."].join(" ");
}
function buildForcedConsultSpeechPrompt(text) {
	return [
		"OpenClaw finished checking. Speak this result naturally and concisely.",
		"Do not mention tool calls, JSON, or internal routing.",
		"",
		text
	].join("\n");
}
function buildAlreadyDeliveredToolResult() {
	return {
		status: "already_delivered",
		message: "OpenClaw already delivered this consult result internally. Do not repeat it."
	};
}
function cancelForcedConsults(session) {
	for (const handle of session.harness.forcedConsults.handles()) session.harness.forcedConsults.markCancelled(handle);
}
function submitRelayAgentControlProviderResults(session, result, turnId) {
	if (result.mode !== "cancel" || !result.ok || !result.providerResult) return;
	const providerResult = result.providerResult;
	const epoch = session.toolResultEpoch;
	const callIds = [...session.activeAgentToolCalls.keys()];
	const activeCallIds = callIds.filter((callId) => !session.pendingFinalToolResults.has(callId));
	const submissions = callIds.map((callId) => session.pendingFinalToolResults.get(callId)).filter((pending) => pending !== void 0);
	const toolResultOptions = suppressedToolResultOptions(session);
	let providerResponseStarted = toolResultOptions === void 0 && submissions.length > 0;
	const finalizeAgentCall = (callId, forcedConsult) => {
		if (session.toolResultEpoch !== epoch) return;
		if (forcedConsult) session.harness.forcedConsults.markCancelled(forcedConsult);
		broadcastToolResultToOwner(session, {
			callId,
			turnId,
			result: providerResult,
			final: true
		});
		clearRelayAgentToolCall(session, callId);
		session.toolCalls.markAgentCompleted([callId]);
	};
	for (const callId of activeCallIds) {
		const forcedConsult = session.harness.forcedConsults.handles().find((handle) => handle.id === callId);
		if (forcedConsult) {
			const nativeCallIds = session.harness.forcedConsults.nativeCallIds(forcedConsult);
			providerResponseStarted ||= toolResultOptions === void 0 && nativeCallIds.length > 0;
			const terminal = {
				result: providerResult,
				options: toolResultOptions,
				turnId,
				epoch
			};
			session.forcedTerminalProviderResults.set(callId, terminal);
			const clearTerminal = () => {
				if (session.forcedTerminalProviderResults.get(callId) === terminal) session.forcedTerminalProviderResults.delete(callId);
			};
			const tracked = trackAgentFinalToolResult(session, callId, completeAfterToolResultSubmissions(session, [drainForcedTerminalProviderResultsAfterPending(session, forcedConsult, terminal)], () => {
				clearTerminal();
				finalizeAgentCall(callId, forcedConsult);
			})?.finally(clearTerminal));
			submissions.push(tracked);
			continue;
		}
		providerResponseStarted ||= toolResultOptions === void 0;
		const submitted = submitFinalProviderToolResult({
			session,
			callId,
			result: providerResult,
			options: toolResultOptions,
			onAccepted: () => finalizeAgentCall(callId)
		});
		submissions.push(trackAgentFinalToolResult(session, callId, submitted));
	}
	const completion = completeAfterToolResultSubmissions(session, submissions, () => {});
	return {
		...completion ? { completion } : {},
		providerResponseStarted
	};
}
function scheduleForcedAgentConsult(session, question) {
	if (!session || !question.trim()) return;
	if (session.harness.forcedConsults.hasRecentNativeConsult(question)) return;
	session.harness.forcedConsults.clearPending();
	const handle = session.harness.forcedConsults.prepare(question);
	if (!handle) return;
	session.harness.forcedConsults.schedule(handle, FORCED_CONSULT_FALLBACK_DELAY_MS, () => {
		if (!relaySessions.has(session.id)) return;
		if (!session.toolCalls.tryAdmit([handle.id])) return;
		const turnId = ensureRelayTurn(session);
		const callId = handle.id;
		const itemId = `forced-consult-item-${randomUUID()}`;
		session.harness.forcedConsults.markStarted(handle);
		session.harness.handleBargeIn({
			audioPlaybackActive: true,
			force: true
		}, noFallbackRelayOutputFlush);
		broadcastToOwner$1(session.context, session.connId, {
			relaySessionId: session.id,
			type: "toolCall",
			itemId,
			callId,
			name: REALTIME_VOICE_AGENT_CONSULT_TOOL_NAME,
			forced: true,
			args: {
				question: handle.question,
				context: "The realtime provider produced a final user transcript without invoking openclaw_agent_consult, so OpenClaw is forcing the consult for realtime Talk.",
				responseStyle: "Reply in a concise spoken tone."
			},
			talkEvent: session.harness.talk.emit({
				type: "tool.call",
				itemId,
				callId,
				turnId,
				payload: {
					name: REALTIME_VOICE_AGENT_CONSULT_TOOL_NAME,
					args: { question: handle.question },
					forced: true
				}
			})
		});
	});
}
function submitForcedConsultProviderResult(session, callId, result, options) {
	return submitFinalProviderToolResult({
		session,
		callId,
		result,
		options
	});
}
function drainForcedTerminalProviderResults(session, handle, terminal) {
	if (session.forcedTerminalProviderResults.get(handle.id) !== terminal) return;
	const pending = session.harness.forcedConsults.nativeCallIds(handle).map((callId) => submitForcedConsultProviderResult(session, callId, terminal.result, terminal.options)).filter((submission) => submission !== void 0);
	if (pending.length > 0) return Promise.all(pending).then(() => drainForcedTerminalProviderResults(session, handle, terminal));
	if (session.harness.forcedConsults.nativeCallIds(handle).some((callId) => !session.toolCalls.isProviderCompleted(callId))) return drainForcedTerminalProviderResults(session, handle, terminal);
}
function drainForcedTerminalProviderResultsAfterPending(session, handle, terminal) {
	const pending = session.harness.forcedConsults.nativeCallIds(handle).map((callId) => session.pendingProviderToolResults.get(callId)).filter((submission) => submission !== void 0);
	if (pending.length === 0) return drainForcedTerminalProviderResults(session, handle, terminal);
	return Promise.allSettled(pending).then(() => drainForcedTerminalProviderResults(session, handle, terminal));
}
function submitRealtimeAgentConsultWorkingResponse(session, callId, turnId = ensureRelayTurn(session)) {
	if (!session.bridge.bridge.supportsToolResultContinuation) return;
	const epoch = session.toolResultEpoch;
	return trackPendingWorkingToolResult(session, callId, completeAfterToolResultSubmissions(session, [session.bridge.submitToolResult(resolveRelayProviderToolCallId(session, callId), buildRealtimeVoiceAgentConsultWorkingResponse("person"), { willContinue: true })], () => {
		if (session.toolResultEpoch !== epoch) return;
		broadcastToOwner$1(session.context, session.connId, {
			relaySessionId: session.id,
			type: "toolResult",
			callId,
			talkEvent: session.harness.talk.emit({
				type: "tool.progress",
				callId,
				turnId,
				payload: {
					name: REALTIME_VOICE_AGENT_CONSULT_TOOL_NAME,
					status: "working"
				}
			})
		});
	}));
}
function submitForcedTalkRealtimeRelayToolResult(session, forcedConsult, params) {
	const cancelled = session.harness.forcedConsults.isCancelled(forcedConsult);
	const turnId = cancelled ? session.toolCalls.cancelledTurnId(params.callId) ?? session.harness.talk.activeTurnId : ensureRelayTurn(session);
	if (!turnId) throw new Error("Cancelled realtime consult is missing its original turn");
	if (cancelled) {
		const providerResult = buildRealtimeVoiceAgentCancelProviderResult("OpenClaw cancelled this consult before completion. Do not restart it.");
		const terminal = {
			result: providerResult,
			options: suppressedToolResultOptions(session),
			turnId,
			epoch: session.toolResultEpoch
		};
		session.forcedTerminalProviderResults.set(forcedConsult.id, terminal);
		const clearTerminal = () => {
			if (session.forcedTerminalProviderResults.get(forcedConsult.id) === terminal) session.forcedTerminalProviderResults.delete(forcedConsult.id);
		};
		const completion = completeAfterToolResultSubmissions(session, [drainForcedTerminalProviderResultsAfterPending(session, forcedConsult, terminal)], () => {
			clearTerminal();
			if (session.toolResultEpoch !== terminal.epoch) return;
			session.harness.forcedConsults.markCancelled(forcedConsult);
			clearRelayAgentToolCall(session, params.callId);
			session.toolCalls.deleteCancelled(params.callId);
			if (!session.toolCalls.markAgentCompleted([params.callId])) return;
			broadcastToolResultToOwner(session, {
				callId: params.callId,
				turnId,
				result: providerResult,
				forced: true,
				final: true
			});
		});
		return trackAgentFinalToolResult(session, params.callId, completion?.finally(clearTerminal));
	}
	if (!(params.options?.willContinue !== true)) {
		if (isWorkingToolResult(params.result)) session.bridge.sendUserMessage(buildForcedConsultCheckingPrompt());
		broadcastToolResultToOwner(session, {
			callId: params.callId,
			turnId,
			result: params.result,
			forced: true,
			final: false
		});
		return;
	}
	const text = readSpeakableRealtimeVoiceToolResult(params.result, { maxChars: FORCED_CONSULT_RESULT_MAX_CHARS });
	const providerOptions = suppressedToolResultOptions(session);
	const terminal = {
		result: providerOptions ? buildAlreadyDeliveredToolResult() : params.result,
		options: providerOptions,
		turnId,
		epoch: session.toolResultEpoch
	};
	session.forcedTerminalProviderResults.set(forcedConsult.id, terminal);
	const submission = drainForcedTerminalProviderResults(session, forcedConsult, terminal);
	const clearTerminal = () => {
		if (session.forcedTerminalProviderResults.get(forcedConsult.id) === terminal) session.forcedTerminalProviderResults.delete(forcedConsult.id);
	};
	const trackedCompletion = completeAfterToolResultSubmissions(session, [submission], () => {
		clearTerminal();
		if (session.toolResultEpoch !== terminal.epoch) return;
		session.harness.forcedConsults.markDelivered(forcedConsult);
		clearRelayAgentToolCall(session, params.callId);
		if (!session.toolCalls.markAgentCompleted([params.callId])) return;
		const hasNativeCalls = session.harness.forcedConsults.nativeCallIds(forcedConsult).length > 0;
		if (text && (!hasNativeCalls || providerOptions)) session.bridge.sendUserMessage(buildForcedConsultSpeechPrompt(text));
		broadcastToolResultToOwner(session, {
			callId: params.callId,
			turnId,
			result: params.result,
			forced: true,
			final: true
		});
	})?.finally(clearTerminal);
	return trackAgentFinalToolResult(session, params.callId, trackedCompletion);
}
//#endregion
//#region src/gateway/talk-realtime-relay-issues.ts
function createTalkRealtimeRelayIssue(params) {
	return {
		code: "realtime_unavailable",
		message: params.message,
		provider: params.provider,
		...params.model ? { model: params.model } : {},
		transport: "gateway-relay",
		phase: params.phase
	};
}
function buildTalkRealtimeRelayIssuePayload(relaySessionId, issue) {
	return {
		relaySessionId,
		type: "error",
		message: issue.message,
		code: issue.code,
		provider: issue.provider,
		...issue.model ? { model: issue.model } : {},
		transport: issue.transport,
		phase: issue.phase
	};
}
//#endregion
//#region src/gateway/talk-realtime-relay-voice.ts
const RELAY_TRANSCRIPT_RETRY_DELAYS_MS = [
	0,
	500,
	2e3
];
function logRelayVoiceFailure(session, message, error) {
	session.context.logGateway?.warn(`${message}: ${formatErrorMessage(error)}`);
}
function resolveRelayAgentIdFromCurrentConfig(session, sessionKey) {
	return resolveTalkSessionAgentId(session.voiceConfig ?? session.context.getRuntimeConfig(), sessionKey);
}
function bindRelaySessionKey(session, sessionKey) {
	const normalizedSessionKey = sessionKey.trim();
	if (!normalizedSessionKey) throw new Error("Realtime relay session key must be non-empty");
	if (session.sessionKey && session.sessionKey !== normalizedSessionKey) throw new Error("Realtime relay session belongs to another agent session");
	if (!session.sessionKey) {
		session.sessionKey = normalizedSessionKey;
		session.agentId = resolveRelayAgentIdFromCurrentConfig(session, normalizedSessionKey);
	}
}
function resolveRelayAgentId(session, sessionKey) {
	bindRelaySessionKey(session, sessionKey);
	if (!session.agentId) throw new Error("Realtime relay session has no pinned agent owner");
	return session.agentId;
}
function ensureRelayVoiceSession(session) {
	if (session.voiceSessionCreated) return true;
	if (!session.sessionKey) return false;
	try {
		createOrResumeClientVoiceSession({
			agentId: resolveRelayAgentId(session, session.sessionKey),
			sessionKey: session.sessionKey,
			provider: session.provider,
			origin: "relay",
			voiceSessionId: session.id
		});
		session.voiceSessionCreated = true;
		return true;
	} catch (error) {
		logRelayVoiceFailure(session, "realtime relay voice session create failed", error);
		return false;
	}
}
function enqueueRelayVoiceTranscript(session, role, text) {
	const normalizedText = normalizeVoiceTranscriptText(text);
	if (!normalizedText) return true;
	if (!session.sessionKey) {
		session.pendingVoiceTranscripts.push({
			role,
			text: normalizedText
		});
		if (session.pendingVoiceTranscripts.length > VOICE_TRANSCRIPT_QUEUE_POLICY.maxPendingCount) session.pendingVoiceTranscripts.shift();
		return true;
	}
	if (!ensureRelayVoiceSession(session)) return true;
	const transcriptSeq = session.voiceTranscriptSeq + 1;
	const entryId = String(transcriptSeq);
	const sessionKey = session.sessionKey;
	const admission = session.voiceTranscriptQueue.enqueue(async () => {
		let lastError;
		for (const delayMs of RELAY_TRANSCRIPT_RETRY_DELAYS_MS) {
			if (delayMs > 0) await new Promise((resolve) => {
				setTimeout(resolve, delayMs);
			});
			try {
				await appendRelayVoiceTranscript({
					agentId: resolveRelayAgentId(session, sessionKey),
					sessionKey,
					voiceSessionId: session.id,
					entryId,
					role,
					text: normalizedText,
					...session.voiceConfig ? { config: session.voiceConfig } : {}
				});
				return;
			} catch (error) {
				lastError = error;
			}
		}
		throw lastError;
	}, { weight: normalizedText.length });
	if (!admission.accepted) {
		if (admission.reason === "overflow") session.failSession(VOICE_TRANSCRIPT_QUEUE_POLICY.overflowMessage);
		return false;
	}
	session.voiceTranscriptSeq = transcriptSeq;
	admission.completion.catch((error) => {
		logRelayVoiceFailure(session, "realtime relay transcript append failed", error);
	});
	return true;
}
function closeRelayVoiceSession(session) {
	if (session.voiceSessionClose) return session.voiceSessionClose;
	session.voiceTranscriptQueue.seal();
	if (!session.sessionKey || !ensureRelayVoiceSession(session)) {
		session.voiceSessionClose = Promise.resolve();
		return session.voiceSessionClose;
	}
	const sessionKey = session.sessionKey;
	session.voiceSessionClose = session.voiceTranscriptQueue.flush().then(async () => {
		const config = session.voiceConfig ?? session.context.getRuntimeConfig();
		await closeRelayVoiceSessionRecord({
			agentId: resolveRelayAgentId(session, sessionKey),
			sessionKey,
			voiceSessionId: session.id,
			config
		});
	}).catch((error) => {
		logRelayVoiceFailure(session, "realtime relay voice session close failed", error);
	});
	drainingRelaySessions.add(session);
	session.voiceSessionClose.finally(() => {
		drainingRelaySessions.delete(session);
	});
	return session.voiceSessionClose;
}
//#endregion
//#region src/gateway/talk-relay-audio-base64.ts
function decodeTalkRelayAudioBase64(base64, label) {
	const canonicalBase64 = canonicalizeBase64(base64.replace(/-/gu, "+").replace(/_/gu, "/"));
	if (!canonicalBase64) throw new Error(`${label} audio frame is invalid base64`);
	const audio = Buffer.from(canonicalBase64, "base64");
	if (audio.toString("base64") !== canonicalBase64) throw new Error(`${label} audio frame is invalid base64`);
	return audio;
}
//#endregion
//#region src/gateway/talk-relay-session-lifecycle.ts
function isExpiredTalkRelaySession(session, validNowMs) {
	const expiresAtMs = asDateTimestampMs(session.expiresAtMs);
	return expiresAtMs === void 0 || validNowMs > expiresAtMs;
}
/** Closes every expired relay session in the provided process-local map. */
function closeExpiredTalkRelaySessions(params) {
	const validNowMs = asDateTimestampMs(params.nowMs ?? Date.now());
	if (validNowMs === void 0) return;
	for (const session of params.sessions) if (isExpiredTalkRelaySession(session, validNowMs)) params.closeSession(session);
}
/** Closes every relay session owned by a disconnected gateway connection. */
function closeTalkRelaySessionsForConnection(params) {
	for (const session of params.sessions) {
		if (session.connId !== params.connId) continue;
		try {
			params.closeSession(session);
		} catch (error) {
			params.onCloseError(error, session);
		}
	}
}
/** Returns the active session only when it belongs to the current connection. */
function requireActiveTalkRelaySession(params) {
	const session = params.sessions.get(params.sessionId);
	const nowMs = asDateTimestampMs(Date.now());
	if (!session || session.connId !== params.connId || nowMs === void 0 || isExpiredTalkRelaySession(session, nowMs)) {
		if (session) params.closeSession(session);
		throw new Error(params.unknownSessionMessage);
	}
	return session;
}
//#endregion
//#region src/gateway/talk-session-registry.ts
/**
* Process-local registry that lets Talk protocol methods resolve opaque
* `sessionId` values to the concrete relay or managed-room backend.
*/
const unifiedTalkSessions = resolveGlobalMap(Symbol.for("openclaw.unifiedTalkSessions"), "close-and-restart");
/** Associates a public Talk session id with its concrete gateway backend. */
function rememberUnifiedTalkSession(sessionId, session) {
	unifiedTalkSessions.set(sessionId, session);
}
/** Resolves a Talk session id or throws the protocol-facing unknown-session error. */
function getUnifiedTalkSession(sessionId) {
	const session = unifiedTalkSessions.get(sessionId);
	if (!session) throw new Error("Unknown Talk session");
	return session;
}
/** Removes a Talk session id after the concrete backend closes. */
function forgetUnifiedTalkSession(sessionId) {
	unifiedTalkSessions.delete(sessionId);
}
/** Enforces that a relay-backed Talk session is controlled by its owner socket. */
function requireUnifiedTalkSessionConn(session, connId) {
	if (!connId || session.connId !== connId) throw new Error("Talk session is not owned by this connection");
	return connId;
}
//#endregion
//#region src/gateway/talk-realtime-relay-operations.ts
/** Ensure a gateway-relay call has its durable record before transcript-free RPCs. */
function ensureTalkRealtimeRelayVoiceSession(params) {
	const session = getRelaySession(params.relaySessionId, params.connId);
	bindRelaySessionKey(session, params.sessionKey);
	if (!ensureRelayVoiceSession(session)) throw new Error("Realtime relay voice session could not be created");
	const buffered = session.pendingVoiceTranscripts.splice(0);
	for (const entry of buffered) enqueueRelayVoiceTranscript(session, entry.role, entry.text);
}
function abortRelayAgentRuns(session, reason) {
	for (const [runId, sessionKey] of session.activeAgentRuns) abortChatRunById(session.context, {
		runId,
		sessionKey,
		stopReason: reason
	});
	session.activeAgentRuns.clear();
	session.activeAgentToolCalls.clear();
}
function pruneInactiveRelayAgentRuns(session) {
	for (const runId of session.activeAgentRuns.keys()) if (!session.context.chatAbortControllers.has(runId)) session.activeAgentRuns.delete(runId);
	for (const [callId, runId] of session.activeAgentToolCalls) if (!session.activeAgentRuns.has(runId)) session.activeAgentToolCalls.delete(callId);
	return session.activeAgentRuns.size;
}
function closeRelaySession(session, reason) {
	session.harness.close();
	relaySessions.delete(session.id);
	forgetUnifiedTalkSession(session.id);
	clearTimeout(session.cleanupTimer);
	abortRelayAgentRuns(session, reason === "error" ? "relay-error" : "relay-closed");
	try {
		session.bridge.close();
	} finally {
		closeRelayVoiceSession(session);
		broadcastToOwner$1(session.context, session.connId, {
			relaySessionId: session.id,
			type: "close",
			reason,
			talkEvent: session.harness.talk.emit({
				type: "session.closed",
				payload: { reason },
				final: true
			})
		});
	}
}
/** Releases every realtime relay session owned by a disconnected gateway connection. */
function closeTalkRealtimeRelaySessionsForConnection(connId) {
	closeTalkRelaySessionsForConnection({
		sessions: relaySessions.values(),
		connId,
		closeSession: (session) => closeRelaySession(session, "completed"),
		onCloseError: (error, session) => {
			session.context.logGateway.warn(`failed to close realtime relay session after connection disconnect: ${formatErrorMessage(error)}`);
		}
	});
}
function pruneExpiredRelaySessions(nowMs = Date.now()) {
	closeExpiredTalkRelaySessions({
		sessions: relaySessions.values(),
		closeSession: (session) => closeRelaySession(session, "completed"),
		nowMs
	});
}
function countRelaySessionsForConn(connId) {
	let count = 0;
	for (const session of relaySessions.values()) if (session.connId === connId) count += 1;
	for (const session of drainingRelaySessions.values()) if (session.connId === connId) count += 1;
	return count;
}
function enforceRelaySessionLimits(connId) {
	pruneExpiredRelaySessions();
	if (relaySessions.size + drainingRelaySessions.size >= 64) throw new Error("Too many active realtime relay sessions");
	if (countRelaySessionsForConn(connId) >= 2) throw new Error("Too many active realtime relay sessions for this connection");
}
function getRelaySession(relaySessionId, connId) {
	return requireActiveTalkRelaySession({
		sessions: relaySessions,
		sessionId: relaySessionId,
		connId,
		closeSession: (session) => closeRelaySession(session, "completed"),
		unknownSessionMessage: "Unknown realtime relay session"
	});
}
/** Streams one base64-encoded browser audio frame into the owning relay. */
function sendTalkRealtimeRelayAudio(params) {
	if (params.audioBase64.length > 524288) throw new Error("Realtime relay audio frame is too large");
	const session = getRelaySession(params.relaySessionId, params.connId);
	const audio = decodeTalkRelayAudioBase64(params.audioBase64, "Realtime relay");
	const turnId = ensureRelayTurn(session);
	session.bridge.sendAudio(audio);
	broadcastToOwner$1(session.context, session.connId, {
		relaySessionId: session.id,
		type: "inputAudio",
		byteLength: audio.byteLength,
		talkEvent: session.harness.talk.emit({
			type: "input.audio.delta",
			turnId,
			payload: { byteLength: audio.byteLength }
		})
	});
	if (typeof params.timestamp === "number" && Number.isFinite(params.timestamp)) session.bridge.setMediaTimestamp(params.timestamp);
}
/** Confirms that an owning relay client finished playing through a provider mark. */
function acknowledgeTalkRealtimeRelayMark(params) {
	getRelaySession(params.relaySessionId, params.connId).bridge.acknowledgeMark(params.markName);
}
/** Delivers a tool result from the browser/client side back to the provider. */
function submitTalkRealtimeRelayToolResult(params) {
	const session = getRelaySession(params.relaySessionId, params.connId);
	if (session.toolCalls.isAgentCompleted(params.callId)) return;
	if (!session.toolCalls.tryAdmit([params.callId])) return;
	const pendingFinal = session.pendingFinalToolResults.get(params.callId);
	const cancelledAgentCall = session.toolCalls.hasCancelled(params.callId);
	if (pendingFinal && !cancelledAgentCall) return pendingFinal;
	const forcedConsult = session.harness.forcedConsults.handles().find((handle) => handle.id === params.callId);
	if (forcedConsult) return submitForcedTalkRealtimeRelayToolResult(session, forcedConsult, {
		callId: params.callId,
		result: params.result,
		options: params.options
	});
	if (cancelledAgentCall) {
		const providerResult = buildRealtimeVoiceAgentCancelProviderResult("OpenClaw cancelled this consult before completion. Do not restart it.");
		const submitCancellation = () => submitFinalProviderToolResult({
			session,
			callId: params.callId,
			result: providerResult,
			options: suppressedToolResultOptions(session),
			onAccepted: () => {
				session.toolCalls.deleteCancelled(params.callId);
				session.toolCalls.markAgentCompleted([params.callId]);
			}
		});
		const pendingProvider = session.pendingProviderToolResults.get(params.callId);
		const completion = pendingProvider ? pendingProvider.then(submitCancellation, submitCancellation) : submitCancellation();
		return trackAgentFinalToolResult(session, params.callId, completion);
	}
	if (params.options?.suppressResponse === true && session.bridge.bridge.supportsToolResultSuppression === false) throw new Error("Realtime provider does not support suppressed tool results");
	const final = params.options?.willContinue !== true;
	const turnId = ensureRelayTurn(session);
	const epoch = session.toolResultEpoch;
	const onAccepted = () => {
		if (session.toolResultEpoch !== epoch) return;
		if (final) {
			clearRelayAgentToolCall(session, params.callId);
			if (!session.toolCalls.markAgentCompleted([params.callId])) return;
		}
		broadcastToolResultToOwner(session, {
			callId: params.callId,
			turnId,
			result: params.result,
			final
		});
	};
	if (final) {
		const completion = submitFinalProviderToolResult({
			session,
			callId: params.callId,
			result: params.result,
			options: params.options,
			onAccepted
		});
		return trackAgentFinalToolResult(session, params.callId, completion);
	}
	const submit = () => session.bridge.submitToolResult(resolveRelayProviderToolCallId(session, params.callId), params.result, params.options);
	const pendingWorking = session.pendingWorkingToolResults.get(params.callId);
	if (pendingWorking) {
		const completion = pendingWorking.then(async () => {
			if (relaySessions.get(session.id) !== session || session.toolResultEpoch !== epoch) return false;
			await submit();
			return true;
		}).then((submitted) => {
			if (submitted && relaySessions.get(session.id) === session) onAccepted();
		});
		return trackPendingWorkingToolResult(session, params.callId, completion);
	}
	const completion = completeAfterToolResultSubmissions(session, [submit()], onAccepted);
	return trackPendingWorkingToolResult(session, params.callId, completion);
}
/** Tracks the chat run started for a realtime agent-consult tool call. */
function registerTalkRealtimeRelayAgentRun(params) {
	const session = getRelaySession(params.relaySessionId, params.connId);
	const callId = params.callId?.trim();
	if (callId && session.toolCalls.isAgentCompleted(callId)) {
		abortChatRunById(session.context, {
			runId: params.runId,
			sessionKey: params.sessionKey,
			stopReason: "realtime provider cancelled tool call"
		});
		throw new Error("Realtime provider cancelled the tool call before run registration");
	}
	if (callId && !session.toolCalls.tryAdmit([callId])) throw new Error("Realtime relay tool-call session limit exceeded");
	if (!session.sessionKey) bindRelaySessionKey(session, params.sessionKey);
	session.activeAgentRuns.set(params.runId, params.sessionKey);
	if (callId) session.activeAgentToolCalls.set(callId, params.runId);
	if (!ensureRelayVoiceSession(session)) throw new Error("Realtime relay voice session could not be created for agent consult");
	const voiceSessionKey = session.sessionKey;
	if (!voiceSessionKey) throw new Error("Realtime relay voice session has no pinned session key");
	registerClientVoiceConsultRun({
		agentId: resolveRelayAgentId(session, voiceSessionKey),
		sessionKey: voiceSessionKey,
		voiceSessionId: session.id,
		runId: params.runId
	});
}
/** Retires one provider-owned tool call and aborts its exact relay consult, if started. */
function cancelTalkRealtimeRelayProviderToolCall(session, providerCallId) {
	const mappedRelayCallId = session.relayToolCallIdsByProviderId.get(providerCallId);
	if (!mappedRelayCallId) return;
	const forcedConsult = session.harness.forcedConsults.handles().find((handle) => session.harness.forcedConsults.nativeCallIds(handle).includes(providerCallId));
	const relayCallId = forcedConsult?.id ?? mappedRelayCallId;
	if (session.toolCalls.isAgentCompleted(relayCallId) || session.toolCalls.isAgentCompleted(mappedRelayCallId) || session.toolCalls.isProviderCompleted(providerCallId)) return;
	if (forcedConsult) {
		session.harness.forcedConsults.markCancelled(forcedConsult);
		if (!session.toolCalls.markCancelled([relayCallId], ensureRelayTurn(session))) return;
	} else session.toolCalls.deleteCancelled(relayCallId);
	if (!session.toolCalls.markAgentCompleted([relayCallId, mappedRelayCallId]) || !session.toolCalls.markProviderCompleted([providerCallId])) return;
	const runId = session.activeAgentToolCalls.get(relayCallId);
	const sessionKey = runId ? session.activeAgentRuns.get(runId) : void 0;
	if (runId && sessionKey) abortChatRunById(session.context, {
		runId,
		sessionKey,
		stopReason: "realtime provider cancelled tool call"
	});
	clearRelayAgentToolCall(session, relayCallId);
	session.providerToolCallIds.delete(mappedRelayCallId);
	session.relayToolCallIdsByProviderId.delete(providerCallId);
	return relayCallId;
}
/** Wait for server-owned final transcript appends before a relay consult is authorized. */
async function flushTalkRealtimeRelayVoiceWrites(params) {
	await getRelaySession(params.relaySessionId, params.connId).voiceTranscriptQueue.flush();
}
/** Applies realtime voice-control text to the active agent-consult chat run. */
async function steerTalkRealtimeRelayAgentRun(params) {
	const session = getRelaySession(params.relaySessionId, params.connId);
	const sessionKey = session.sessionKey;
	if (!sessionKey) throw new Error("Realtime relay steering requires a session key");
	const requestedSessionKey = params.sessionKey?.trim();
	if (requestedSessionKey && requestedSessionKey !== sessionKey) throw new Error("Realtime relay steering session key does not match the relay session");
	const result = await controlRealtimeVoiceAgentRun({
		sessionKey,
		text: params.text,
		mode: params.mode,
		recentEvents: session.harness.talk.recentEvents
	});
	if (relaySessions.get(session.id) !== session) throw new Error("Realtime relay session closed while steering the agent run");
	const turnId = ensureRelayTurn(session);
	const providerSubmission = submitRelayAgentControlProviderResults(session, result, turnId);
	if (providerSubmission?.completion) await providerSubmission.completion;
	const finalResult = providerSubmission?.providerResponseStarted ? {
		...result,
		suppress: true
	} : result;
	if (relaySessions.get(session.id) !== session) return finalResult;
	broadcastToOwner$1(session.context, session.connId, {
		relaySessionId: session.id,
		type: "toolProgress",
		result: finalResult,
		talkEvent: session.harness.talk.emit({
			type: "tool.progress",
			turnId,
			payload: {
				name: "openclaw_agent_control",
				phase: finalResult.mode,
				result: finalResult
			},
			final: finalResult.mode === "cancel" || finalResult.mode === "status"
		})
	});
	return finalResult;
}
/** Cancels the active relay turn, aborts agent work, and clears provider audio. */
function cancelTalkRealtimeRelayTurn(params) {
	const session = getRelaySession(params.relaySessionId, params.connId);
	session.toolResultEpoch += 1;
	session.forcedTerminalProviderResults.clear();
	const turnId = ensureRelayTurn(session);
	const reason = params.reason ?? "client-cancelled";
	cancelForcedConsults(session);
	for (const callId of session.activeAgentToolCalls.keys()) if (!session.toolCalls.markCancelled([callId], turnId)) return;
	for (const forcedConsult of session.harness.forcedConsults.handles()) if (session.harness.forcedConsults.isCancelled(forcedConsult)) {
		if (!session.toolCalls.markCancelled([forcedConsult.id, ...session.harness.forcedConsults.nativeCallIds(forcedConsult)], turnId)) return;
	}
	session.harness.handleBargeIn({ audioPlaybackActive: true }, noFallbackRelayOutputFlush);
	abortRelayAgentRuns(session, reason);
	const cancelled = session.harness.talk.cancelTurn({
		turnId,
		payload: { reason }
	});
	broadcastToOwner$1(session.context, session.connId, {
		relaySessionId: session.id,
		type: "clear",
		talkEvent: cancelled.ok ? cancelled.event : void 0
	});
}
/** Drops one provider generation without sending cancellation into its replacement. */
function resetTalkRealtimeRelayContinuity(session, reason = "session.continuity.reset") {
	session.toolResultEpoch += 1;
	const retiredCallIds = /* @__PURE__ */ new Set([
		...session.activeAgentToolCalls.keys(),
		...session.toolCalls.cancelledCallIds(),
		...session.providerToolCallIds.keys(),
		...session.providerToolCallIds.values(),
		...session.pendingFinalToolResults.keys(),
		...session.pendingProviderToolResults.keys(),
		...session.pendingWorkingToolResults.keys(),
		...session.forcedTerminalProviderResults.keys()
	]);
	for (const handle of session.harness.forcedConsults.handles()) {
		retiredCallIds.add(handle.id);
		for (const nativeCallId of session.harness.forcedConsults.nativeCallIds(handle)) retiredCallIds.add(nativeCallId);
	}
	if (!session.toolCalls.markAgentCompleted(retiredCallIds)) return;
	session.toolCalls.clearCancelled();
	session.providerToolCallIds.clear();
	session.relayToolCallIdsByProviderId.clear();
	session.pendingFinalToolResults.clear();
	session.toolCalls.clearProviderCompleted();
	session.pendingProviderToolResults.clear();
	session.pendingWorkingToolResults.clear();
	session.forcedTerminalProviderResults.clear();
	session.harness.forcedConsults.clear();
	abortRelayAgentRuns(session, reason);
	const turnId = session.harness.talk.activeTurnId;
	session.harness.flushOutput(noFallbackRelayOutputFlush);
	session.harness.finishOutputAudio(reason);
	if (!turnId) return;
	const cancelled = session.harness.talk.cancelTurn({
		turnId,
		payload: { reason }
	});
	return cancelled.ok ? cancelled.event : void 0;
}
/** Closes a realtime relay session owned by the current connection. */
function stopTalkRealtimeRelaySession(params) {
	closeRelaySession(getRelaySession(params.relaySessionId, params.connId), "completed");
}
//#endregion
//#region src/gateway/talk-realtime-relay-tool-call-ledger.ts
const MAX_RELAY_TOOL_CALL_IDENTITIES = 2048;
const MAX_RELAY_TOOL_CALL_IDENTITY_BYTES = 1024 * 1024;
var RelayToolCallLedger = class {
	constructor(options) {
		this.options = options;
		this.entries = /* @__PURE__ */ new Map();
		this.retainedBytes = 0;
		this.overflowReported = false;
	}
	get size() {
		return this.entries.size;
	}
	has(callId) {
		return this.entries.has(callId);
	}
	tryAdmit(callIds) {
		const uniqueCallIds = new Set(callIds);
		const additions = [];
		let additionBytes = 0;
		for (const callId of uniqueCallIds) if (callId && !this.entries.has(callId)) {
			const bytes = Buffer$1.byteLength(callId, "utf8");
			additions.push({
				callId,
				bytes
			});
			additionBytes += bytes;
		}
		const maxEntries = this.options.maxEntries ?? 2048;
		const maxBytes = this.options.maxBytes ?? 1048576;
		if (this.entries.size + additions.length > maxEntries || this.retainedBytes + additionBytes > maxBytes) {
			if (!this.overflowReported) {
				this.overflowReported = true;
				this.options.onOverflow();
			}
			return false;
		}
		for (const addition of additions) {
			this.entries.set(addition.callId, {});
			this.retainedBytes += addition.bytes;
		}
		return true;
	}
	mark(callIds, mutate) {
		const retainedCallIds = [...callIds];
		if (!this.tryAdmit(retainedCallIds)) return false;
		for (const callId of retainedCallIds) {
			const entry = this.entries.get(callId);
			if (entry) mutate(entry);
		}
		return true;
	}
	isAgentCompleted(callId) {
		return this.entries.get(callId)?.agentCompleted === true;
	}
	markAgentCompleted(callIds) {
		return this.mark(callIds, (entry) => {
			entry.agentCompleted = true;
			delete entry.cancelledTurnId;
		});
	}
	deleteAgentCompleted(callId) {
		delete this.entries.get(callId)?.agentCompleted;
	}
	isProviderCompleted(callId) {
		return this.entries.get(callId)?.providerCompleted === true;
	}
	markProviderCompleted(callIds) {
		return this.mark(callIds, (entry) => {
			entry.providerCompleted = true;
		});
	}
	deleteProviderCompleted(callId) {
		delete this.entries.get(callId)?.providerCompleted;
	}
	clearProviderCompleted() {
		for (const entry of this.entries.values()) delete entry.providerCompleted;
	}
	hasCancelled(callId) {
		return this.entries.get(callId)?.cancelledTurnId !== void 0;
	}
	cancelledTurnId(callId) {
		return this.entries.get(callId)?.cancelledTurnId;
	}
	markCancelled(callIds, turnId) {
		return this.mark(callIds, (entry) => {
			if (!entry.agentCompleted && entry.cancelledTurnId === void 0) entry.cancelledTurnId = turnId;
		});
	}
	deleteCancelled(callId) {
		delete this.entries.get(callId)?.cancelledTurnId;
	}
	cancelledCallIds() {
		return [...this.entries].filter(([, entry]) => entry.cancelledTurnId !== void 0).map(([callId]) => callId);
	}
	clearCancelled() {
		for (const entry of this.entries.values()) delete entry.cancelledTurnId;
	}
};
//#endregion
//#region src/gateway/talk-realtime-relay-session-create.ts
function isRelayAssistantEchoTranscript(session, text) {
	return session?.harness.isLikelyAssistantEchoTranscript(text) ?? false;
}
/** Creates a realtime voice relay session and returns the browser audio contract. */
function createTalkRealtimeRelaySession(params) {
	enforceRelaySessionLimits(params.connId);
	const forceAgentConsultOnFinalTranscript = params.forceAgentConsultOnFinalTranscript === true;
	const relaySessionId = randomUUID();
	const expiresAtMs = resolveExpiresAtMsFromDurationMs(RELAY_SESSION_TTL_MS);
	if (expiresAtMs === void 0) throw new Error("Realtime relay session expiry is outside the supported Date range");
	const harness = createRealtimeVoiceSessionHarness({
		talk: {
			sessionId: relaySessionId,
			mode: "realtime",
			transport: "gateway-relay",
			brain: "agent-consult",
			provider: params.provider.id,
			maxRecentEvents: 20
		},
		talkPayloads: {
			turnStarted: () => ({}),
			turnEnded: (reason) => ({ reason }),
			inputAudioDelta: (audio) => ({ byteLength: audio.byteLength }),
			outputAudioStarted: () => ({}),
			outputAudioDelta: (audio) => ({ byteLength: audio.byteLength }),
			outputAudioDone: (reason) => ({ reason })
		},
		transcriptLookbackMs: RELAY_TRANSCRIPT_ECHO_LOOKBACK_MS,
		captureBridgeEvents: false
	});
	const emit = (event, talkEvent) => broadcastToOwner$1(params.context, params.connId, {
		...event,
		...talkEvent ? { talkEvent: harness.emit(talkEvent) } : {}
	});
	let currentOutputItemId;
	let currentOutputResponseId;
	let ready = false;
	let continuityResetActive = false;
	let failureEmitted = false;
	let sessionFailureRequested = false;
	const constructionTerminal = {};
	const relayRef = {};
	const getActiveRelay = () => {
		const relay = relayRef.current;
		return relay && relaySessions.get(relay.id) === relay ? relay : void 0;
	};
	let consultAgentRuntime;
	const relaySessionKey = params.sessionKey?.trim();
	const relayAgentId = relaySessionKey ? resolveTalkSessionAgentId(params.cfg ?? params.context.getRuntimeConfig(), relaySessionKey) : void 0;
	const runAgentConsult = async ({ prompt, signal }) => {
		if (!getActiveRelay()) throw new Error("Realtime gateway-relay session is closed");
		const runtimeConfig = params.cfg ?? params.context.getRuntimeConfig();
		const sessionKey = relaySessionKey;
		if (!sessionKey) throw new Error("Realtime gateway-relay agent consult requires a pinned session key");
		const agentId = relayAgentId ?? resolveTalkSessionAgentId(runtimeConfig, sessionKey);
		consultAgentRuntime ??= createPluginRuntime().agent;
		const talkConfig = normalizeTalkSection(runtimeConfig.talk);
		return await consultRealtimeVoiceAgent({
			cfg: runtimeConfig,
			agentRuntime: consultAgentRuntime,
			logger: params.context.logGateway,
			agentId,
			sessionKey,
			messageProvider: "webchat",
			lane: "talk",
			runIdPrefix: "talk-realtime-relay-consult",
			args: { question: prompt },
			transcript: [],
			surface: "a gateway-relay Talk session",
			userLabel: "User",
			questionSourceLabel: "user",
			thinkLevel: talkConfig?.consultThinkingLevel,
			fastMode: talkConfig?.consultFastMode,
			abortSignal: signal,
			onRunStarted: ({ runId, sessionId, timeoutMs }) => {
				registerTalkRealtimeRelayAgentRun({
					relaySessionId,
					connId: params.connId,
					sessionKey,
					runId
				});
				const registration = registerChatAbortController({
					chatAbortControllers: params.context.chatAbortControllers,
					runId,
					sessionId,
					sessionKey,
					agentId,
					timeoutMs,
					ownerConnId: params.connId,
					controlUiVisible: false,
					kind: "chat-send"
				});
				return {
					abortSignal: registration.controller.signal,
					cleanup: registration.cleanup
				};
			}
		});
	};
	const relayProvider = {
		...params.provider,
		createBridge: (request) => params.provider.createBridge({
			...request,
			...relayAgentId ? { agentId: relayAgentId } : {},
			runAgentConsult
		})
	};
	const bridge = harness.createBridge({
		provider: relayProvider,
		cfg: params.cfg,
		providerConfig: params.providerConfig,
		audioFormat: REALTIME_VOICE_AUDIO_FORMAT_PCM16_24KHZ,
		instructions: params.instructions,
		language: params.language,
		autoRespondToAudio: !forceAgentConsultOnFinalTranscript,
		interruptResponseOnInputAudio: !forceAgentConsultOnFinalTranscript,
		tools: params.tools,
		markStrategy: "transport",
		audioSink: {
			isOpen: () => Boolean(getActiveRelay()),
			sendAudio: (audio) => {
				const relay = getActiveRelay();
				if (!relay) return;
				const turnId = ensureRelayTurn(relay);
				emit({
					relaySessionId,
					type: "audio",
					audioBase64: audio.toString("base64"),
					...currentOutputItemId ? { itemId: currentOutputItemId } : {},
					...currentOutputResponseId ? { responseId: currentOutputResponseId } : {}
				}, {
					type: "output.audio.delta",
					turnId,
					payload: { byteLength: audio.length }
				});
			},
			clearAudio: (reason) => {
				const relay = getActiveRelay();
				if (!relay) return;
				const turnId = ensureRelayTurn(relay);
				emit({
					relaySessionId,
					type: "clear",
					...reason ? { reason } : {}
				}, {
					type: "output.audio.done",
					turnId,
					payload: { reason: reason ?? "clear" },
					final: true
				});
			},
			sendMark: (markName) => {
				const relay = getActiveRelay();
				if (!relay) return;
				const turnId = ensureRelayTurn(relay);
				emit({
					relaySessionId,
					type: "mark",
					markName
				}, {
					type: "output.audio.done",
					turnId,
					payload: { markName },
					final: true
				});
			}
		},
		onEvent: (event) => {
			const relay = getActiveRelay();
			if (!relay) return;
			if (event.direction === "client" && event.type === "session.continuity.reset") {
				if (continuityResetActive) return;
				continuityResetActive = true;
				ready = false;
				currentOutputItemId = void 0;
				currentOutputResponseId = void 0;
				const talkEvent = resetTalkRealtimeRelayContinuity(relay, event.type);
				if (!getActiveRelay()) return;
				const clearEvent = {
					relaySessionId,
					type: "clear"
				};
				broadcastToOwner$1(params.context, params.connId, {
					...clearEvent,
					...talkEvent ? { talkEvent } : {}
				});
				return;
			}
			if (event.direction !== "server") return;
			if (event.type === "session.created") continuityResetActive = false;
			if (event.type === "tool.call.cancelled" && event.itemId) {
				const relayCallId = cancelTalkRealtimeRelayProviderToolCall(relay, event.itemId);
				if (relayCallId) {
					const cancelledEvent = {
						relaySessionId,
						type: "toolCallCancelled",
						callId: relayCallId
					};
					broadcastToOwner$1(params.context, params.connId, cancelledEvent);
				}
				return;
			}
			if (event.type === "conversation.output_audio.delta" || event.type === "response.audio.delta" || event.type === "response.output_audio.delta") {
				currentOutputItemId = event.itemId ?? currentOutputItemId;
				currentOutputResponseId = event.responseId ?? currentOutputResponseId;
				return;
			}
			if (event.type === "response.audio.done" || event.type === "response.output_audio.done" || event.type === "conversation.output_audio.done" || event.type === "response.done" || event.type === "response.cancelled") {
				emit({
					relaySessionId,
					type: "audioDone",
					...event.itemId ?? currentOutputItemId ? { itemId: event.itemId ?? currentOutputItemId } : {},
					...event.responseId ?? currentOutputResponseId ? { responseId: event.responseId ?? currentOutputResponseId } : {}
				});
				currentOutputItemId = void 0;
				currentOutputResponseId = void 0;
			}
		},
		onTranscript: (role, text, final) => {
			const relay = getActiveRelay();
			if (!relay) return;
			if (final && !enqueueRelayVoiceTranscript(relay, role, text)) return;
			const turnId = ensureRelayTurn(relay);
			emit({
				relaySessionId,
				type: "transcript",
				role,
				text,
				final
			}, {
				type: role === "assistant" ? final ? "output.text.done" : "output.text.delta" : final ? "transcript.done" : "transcript.delta",
				turnId,
				payload: role === "assistant" ? { text } : {
					role,
					text
				},
				final
			});
			if (role === "user" && final && text.trim()) {
				const question = text.trim();
				if (isRelayAssistantEchoTranscript(relay, question)) return;
				if (pruneInactiveRelayAgentRuns(relay) > 0 && shouldAutoControlRealtimeVoiceAgentText(question)) {
					steerTalkRealtimeRelayAgentRun({
						relaySessionId,
						connId: params.connId,
						text: question
					}).then((result) => {
						if (!getActiveRelay()) return;
						if (result.speak && !result.suppress && result.message.trim()) bridge.sendUserMessage(buildRealtimeVoiceAgentControlSpeechMessage(result.message));
					}).catch((error) => {
						if (!getActiveRelay()) return;
						emit({
							relaySessionId,
							type: "error",
							message: formatErrorMessage(error)
						}, {
							type: "session.error",
							payload: { message: formatErrorMessage(error) },
							final: true
						});
					});
					return;
				}
				if (forceAgentConsultOnFinalTranscript) scheduleForcedAgentConsult(relay, question);
			}
		},
		onToolCall: (toolCall) => {
			const relay = getActiveRelay();
			if (!relay) return;
			const providerCallId = toolCall.callId;
			const relayCallId = adoptRelayProviderToolCallId(relay, providerCallId);
			if (!relayCallId) return;
			let shouldSubmitWorkingResult = false;
			if (toolCall.name === "openclaw_agent_consult") {
				const forcedConsult = relay.harness.forcedConsults.recordNativeConsult(toolCall.args, providerCallId);
				if (forcedConsult.kind === "in_flight" || forcedConsult.kind === "already_delivered") {
					if (forcedConsult.kind === "already_delivered") return submitForcedConsultProviderResult(relay, providerCallId, relay.harness.forcedConsults.isCancelled(forcedConsult.handle) ? buildRealtimeVoiceAgentCancelProviderResult("OpenClaw cancelled this consult before completion. Do not restart it.") : buildAlreadyDeliveredToolResult(), suppressedToolResultOptions(relay));
					if (relay.forcedTerminalProviderResults.has(forcedConsult.handle.id)) return relay.pendingFinalToolResults.get(forcedConsult.handle.id);
					return submitRealtimeAgentConsultWorkingResponse(relay, relayCallId);
				}
				shouldSubmitWorkingResult = true;
			}
			const turnId = ensureRelayTurn(relay);
			emit({
				relaySessionId,
				type: "toolCall",
				itemId: toolCall.itemId,
				callId: relayCallId,
				name: toolCall.name,
				args: toolCall.args
			}, {
				type: "tool.call",
				itemId: toolCall.itemId,
				callId: relayCallId,
				turnId,
				payload: {
					name: toolCall.name,
					args: toolCall.args
				}
			});
			if (shouldSubmitWorkingResult) return submitRealtimeAgentConsultWorkingResponse(relay, relayCallId, turnId);
		},
		onReady: () => {
			if (!getActiveRelay()) return;
			ready = true;
			continuityResetActive = false;
			emit({
				relaySessionId,
				type: "ready"
			}, {
				type: "session.ready",
				payload: null
			});
		},
		onError: (error) => {
			if (!getActiveRelay()) {
				if (!relayRef.current) constructionTerminal.current ??= {
					kind: "error",
					error
				};
				return;
			}
			const issue = createTalkRealtimeRelayIssue({
				message: formatErrorMessage(error),
				provider: params.provider.id,
				model: params.model,
				phase: ready ? "stream" : "connect"
			});
			failureEmitted = true;
			emit(buildTalkRealtimeRelayIssuePayload(relaySessionId, issue), {
				type: "session.error",
				payload: issue,
				final: true
			});
		},
		onClose: (reason) => {
			const active = relaySessions.get(relaySessionId);
			if (!active || active !== relayRef.current) {
				if (!relayRef.current) constructionTerminal.current ??= {
					kind: "close",
					reason
				};
				return;
			}
			active.harness.close();
			relaySessions.delete(relaySessionId);
			forgetUnifiedTalkSession(relaySessionId);
			clearTimeout(active.cleanupTimer);
			abortRelayAgentRuns(active, "relay-closed");
			closeRelayVoiceSession(active);
			if (!ready && !failureEmitted) {
				const issue = createTalkRealtimeRelayIssue({
					message: "Realtime provider closed before the session became ready.",
					provider: params.provider.id,
					model: params.model,
					phase: "connect"
				});
				emit(buildTalkRealtimeRelayIssuePayload(relaySessionId, issue), {
					type: "session.error",
					payload: issue,
					final: true
				});
			}
			emit({
				relaySessionId,
				type: "close",
				reason
			}, {
				type: "session.closed",
				payload: { reason },
				final: true
			});
		}
	});
	const earlyTerminal = constructionTerminal.current;
	if (earlyTerminal) {
		harness.close();
		try {
			bridge.close();
		} catch (error) {
			params.context.logGateway.warn(`failed to close realtime relay bridge after provider terminated during creation: ${formatErrorMessage(error)}`);
		}
		if (earlyTerminal.kind === "error") throw earlyTerminal.error;
		throw new Error(`Realtime provider closed during session creation: ${earlyTerminal.reason}`);
	}
	const initialSessionKey = params.sessionKey?.trim() || void 0;
	const failSession = (message) => {
		const active = relaySessions.get(relaySessionId);
		if (!active || sessionFailureRequested) return;
		sessionFailureRequested = true;
		if (!failureEmitted) {
			failureEmitted = true;
			emit({
				relaySessionId,
				type: "error",
				message
			}, {
				type: "session.error",
				payload: { message },
				final: true
			});
		}
		closeRelaySession(active, "error");
	};
	const relay = {
		id: relaySessionId,
		connId: params.connId,
		context: params.context,
		bridge,
		harness,
		sessionKey: initialSessionKey,
		...initialSessionKey ? { agentId: resolveTalkSessionAgentId(params.cfg ?? params.context.getRuntimeConfig(), initialSessionKey) } : {},
		expiresAtMs,
		cleanupTimer: setTimeout(() => {
			const active = relaySessions.get(relaySessionId);
			if (active) closeRelaySession(active, "completed");
		}, RELAY_SESSION_TTL_MS),
		activeAgentRuns: /* @__PURE__ */ new Map(),
		provider: params.provider.id,
		activeAgentToolCalls: /* @__PURE__ */ new Map(),
		toolCalls: new RelayToolCallLedger({ onOverflow: () => failSession(`Realtime relay tool-call session limit exceeded (${MAX_RELAY_TOOL_CALL_IDENTITIES} identities or ${MAX_RELAY_TOOL_CALL_IDENTITY_BYTES} UTF-8 bytes)`) }),
		providerToolCallIds: /* @__PURE__ */ new Map(),
		relayToolCallIdsByProviderId: /* @__PURE__ */ new Map(),
		pendingFinalToolResults: /* @__PURE__ */ new Map(),
		pendingProviderToolResults: /* @__PURE__ */ new Map(),
		pendingWorkingToolResults: /* @__PURE__ */ new Map(),
		forcedTerminalProviderResults: /* @__PURE__ */ new Map(),
		toolResultEpoch: 0,
		...params.cfg ? { voiceConfig: params.cfg } : {},
		voiceSessionCreated: false,
		voiceTranscriptSeq: 0,
		voiceTranscriptQueue: VOICE_TRANSCRIPT_QUEUE_POLICY.createQueue(),
		failSession,
		pendingVoiceTranscripts: []
	};
	relayRef.current = relay;
	relay.cleanupTimer.unref?.();
	relaySessions.set(relaySessionId, relay);
	bridge.connect().catch((error) => {
		const active = relaySessions.get(relaySessionId);
		if (active !== relay) return;
		const issue = createTalkRealtimeRelayIssue({
			message: formatErrorMessage(error),
			provider: params.provider.id,
			model: params.model,
			phase: "connect"
		});
		failureEmitted = true;
		emit(buildTalkRealtimeRelayIssuePayload(relaySessionId, issue), {
			type: "session.error",
			payload: issue,
			final: true
		});
		closeRelaySession(active, "error");
	});
	return {
		provider: params.provider.id,
		transport: "gateway-relay",
		relaySessionId,
		audio: {
			inputEncoding: "pcm16",
			inputSampleRateHz: REALTIME_VOICE_AUDIO_FORMAT_PCM16_24KHZ.sampleRateHz,
			outputEncoding: "pcm16",
			outputSampleRateHz: REALTIME_VOICE_AUDIO_FORMAT_PCM16_24KHZ.sampleRateHz
		},
		...params.model ? { model: params.model } : {},
		...params.voice ? { voice: params.voice } : {},
		expiresAt: Math.floor(expiresAtMs / 1e3)
	};
}
//#endregion
//#region src/gateway/talk-transcription-relay.ts
/**
* Gateway-owned relay for streaming speech-to-text providers used by Talk.
*
* The relay accepts browser audio on one WebSocket connection, forwards it to a
* realtime transcription provider, and mirrors provider callbacks into Talk
* events for the same connection.
*/
const TRANSCRIPTION_SESSION_TTL_MS = 1800 * 1e3;
const TRANSCRIPTION_PROVIDER_FINAL_DRAIN_MS = 5e3;
const MAX_AUDIO_BASE64_BYTES = 512 * 1024;
const MAX_TRANSCRIPTION_SESSIONS_PER_CONN = 2;
const MAX_TRANSCRIPTION_SESSIONS_GLOBAL = 64;
const TRANSCRIPTION_EVENT = "talk.event";
const RELAY_INPUT_ENCODING = "g711_ulaw";
const RELAY_INPUT_SAMPLE_RATE_HZ = 8e3;
const transcriptionSessions = /* @__PURE__ */ new Map();
/** Normalizes common provider audio-format aliases into the relay contract. */
function normalizeRelayInputEncoding(value) {
	if (typeof value !== "string") return;
	const normalized = value.trim().toLowerCase();
	if (!normalized) return;
	if (normalized === "mulaw" || normalized === "ulaw" || normalized === "g711_ulaw" || normalized === "g711-mulaw" || normalized === "pcm_mulaw" || normalized === "audio/pcmu" || normalized === "ulaw_8000") return "g711_ulaw";
	if (normalized === "alaw" || normalized === "g711_alaw" || normalized === "g711-alaw" || normalized === "pcm_alaw") return "g711_alaw";
	if (normalized === "pcm" || normalized === "pcm16" || normalized === "linear16" || normalized === "pcm_s16le") return "pcm16";
}
function inferSampleRateFromAudioFormat(value) {
	if (typeof value !== "string") return;
	const match = value.match(/_(\d+)$/);
	return match ? parseFiniteNumber(match[1]) : void 0;
}
/** Verifies provider config matches the audio format the browser relay emits. */
function assertRelayInputAudioConfig(providerConfig) {
	const encodingValue = providerConfig.encoding ?? providerConfig.audioFormat ?? providerConfig.audio_format;
	const encoding = normalizeRelayInputEncoding(encodingValue);
	if (encoding && encoding !== RELAY_INPUT_ENCODING) throw new Error(`Gateway transcription relay requires ${RELAY_INPUT_ENCODING}/${RELAY_INPUT_SAMPLE_RATE_HZ} audio`);
	const sampleRate = parseFiniteNumber(providerConfig.sampleRate ?? providerConfig.sample_rate) ?? inferSampleRateFromAudioFormat(encodingValue);
	if (sampleRate && sampleRate !== RELAY_INPUT_SAMPLE_RATE_HZ) throw new Error(`Gateway transcription relay requires ${RELAY_INPUT_ENCODING}/${RELAY_INPUT_SAMPLE_RATE_HZ} audio`);
}
function broadcastToOwner(context, connId, event) {
	context.broadcastToConnIds(TRANSCRIPTION_EVENT, event, /* @__PURE__ */ new Set([connId]), { dropIfSlow: event.type === "inputAudio" || event.type === "partial" });
}
function ensureTranscriptionTurn(session) {
	const turn = session.talk.ensureTurn();
	if (turn.event) broadcastToOwner(session.context, session.connId, {
		transcriptionSessionId: session.id,
		type: "speechStart",
		talkEvent: turn.event
	});
	return turn.turnId;
}
function closeTranscriptionSession(session, reason) {
	if (session.closed) return;
	session.closed = true;
	transcriptionSessions.delete(session.id);
	forgetUnifiedTalkSession(session.id);
	clearTimeout(session.cleanupTimer);
	try {
		if (!session.draining) session.sttSession.close();
	} finally {
		broadcastToOwner(session.context, session.connId, {
			transcriptionSessionId: session.id,
			type: "close",
			reason,
			talkEvent: session.talk.emit({
				type: "session.closed",
				payload: { reason },
				final: true
			})
		});
	}
}
/** Releases every transcription relay owned by a disconnected gateway connection. */
function closeTalkTranscriptionRelaySessionsForConnection(connId) {
	closeTalkRelaySessionsForConnection({
		sessions: transcriptionSessions.values(),
		connId,
		closeSession: (session) => closeTranscriptionSession(session, "completed"),
		onCloseError: (error, session) => {
			session.context.logGateway.warn(`failed to close transcription relay session after connection disconnect: ${formatErrorMessage(error)}`);
		}
	});
}
function pruneExpiredTranscriptionSessions(nowMs = Date.now()) {
	closeExpiredTalkRelaySessions({
		sessions: transcriptionSessions.values(),
		closeSession: (session) => closeTranscriptionSession(session, "completed"),
		nowMs
	});
}
function countTranscriptionSessionsForConn(connId) {
	let count = 0;
	for (const session of transcriptionSessions.values()) if (session.connId === connId) count += 1;
	return count;
}
function enforceTranscriptionSessionLimits(connId) {
	pruneExpiredTranscriptionSessions();
	if (transcriptionSessions.size >= MAX_TRANSCRIPTION_SESSIONS_GLOBAL) throw new Error("Too many active transcription Talk sessions");
	if (countTranscriptionSessionsForConn(connId) >= MAX_TRANSCRIPTION_SESSIONS_PER_CONN) throw new Error("Too many active transcription Talk sessions for this connection");
}
/** Creates a transcription relay session and returns its browser audio contract. */
function createTalkTranscriptionRelaySession(params) {
	enforceTranscriptionSessionLimits(params.connId);
	assertRelayInputAudioConfig(params.providerConfig);
	const transcriptionSessionId = randomUUID();
	const expiresAtMs = resolveExpiresAtMsFromDurationMs(TRANSCRIPTION_SESSION_TTL_MS);
	if (expiresAtMs === void 0) throw new Error("Transcription relay session expiry is outside the supported Date range");
	const talk = createTalkSessionController({
		sessionId: transcriptionSessionId,
		mode: "transcription",
		transport: "gateway-relay",
		brain: "none",
		provider: params.provider.id
	}, { onEvent: recordTalkObservabilityEvent });
	const emit = (event, talkEvent) => {
		broadcastToOwner(params.context, params.connId, {
			...event,
			...talkEvent ? { talkEvent: talk.emit(talkEvent) } : {}
		});
	};
	const relayRef = {};
	const getActiveRelay = () => {
		const relay = relayRef.current;
		return relay && transcriptionSessions.get(relay.id) === relay ? relay : void 0;
	};
	const sttSession = params.provider.createSession({
		cfg: params.context.getRuntimeConfig(),
		providerConfig: params.providerConfig,
		onSpeechStart: () => {
			const relay = getActiveRelay();
			if (!relay || relay.draining) return;
			ensureTranscriptionTurn(relay);
		},
		onPartial: (text) => {
			const relay = getActiveRelay();
			if (!relay) return;
			const turnId = ensureTranscriptionTurn(relay);
			emit({
				transcriptionSessionId,
				type: "partial",
				text
			}, {
				type: "transcript.delta",
				turnId,
				payload: { text }
			});
		},
		onTranscript: (text) => {
			const relay = getActiveRelay();
			if (!relay) return;
			const turnId = ensureTranscriptionTurn(relay);
			emit({
				transcriptionSessionId,
				type: "transcript",
				text,
				final: true
			}, {
				type: "transcript.done",
				turnId,
				payload: { text },
				final: true
			});
			const ended = relay.talk.endTurn({
				turnId,
				payload: {}
			});
			if (ended.ok) broadcastToOwner(relay.context, relay.connId, {
				transcriptionSessionId,
				type: "transcript",
				text: "",
				final: true,
				talkEvent: ended.event
			});
		},
		onError: (error) => {
			const relay = getActiveRelay();
			if (!relay) return;
			emit({
				transcriptionSessionId,
				type: "error",
				message: error.message
			}, {
				type: "session.error",
				payload: { message: error.message },
				final: true
			});
			closeTranscriptionSession(relay, "error");
		}
	});
	const relay = {
		id: transcriptionSessionId,
		connId: params.connId,
		context: params.context,
		provider: params.provider,
		sttSession,
		talk,
		expiresAtMs,
		cleanupTimer: setTimeout(() => {
			const active = transcriptionSessions.get(transcriptionSessionId);
			if (active) closeTranscriptionSession(active, "completed");
		}, TRANSCRIPTION_SESSION_TTL_MS),
		receivedAudio: false,
		draining: false,
		closed: false
	};
	relayRef.current = relay;
	relay.cleanupTimer.unref?.();
	transcriptionSessions.set(transcriptionSessionId, relay);
	sttSession.connect().then(() => {
		if (transcriptionSessions.get(transcriptionSessionId) !== relay || relay.draining) return;
		emit({
			transcriptionSessionId,
			type: "ready"
		}, {
			type: "session.ready",
			payload: null
		});
	}).catch((error) => {
		const active = transcriptionSessions.get(transcriptionSessionId);
		if (active !== relay) return;
		emit({
			transcriptionSessionId,
			type: "error",
			message: error instanceof Error ? error.message : String(error)
		}, {
			type: "session.error",
			payload: { message: error instanceof Error ? error.message : String(error) },
			final: true
		});
		closeTranscriptionSession(active, "error");
	});
	return {
		provider: params.provider.id,
		mode: "transcription",
		transport: "gateway-relay",
		transcriptionSessionId,
		audio: {
			inputEncoding: RELAY_INPUT_ENCODING,
			inputSampleRateHz: RELAY_INPUT_SAMPLE_RATE_HZ
		},
		expiresAt: Math.floor(expiresAtMs / 1e3)
	};
}
function getTranscriptionSession(transcriptionSessionId, connId) {
	const relay = requireActiveTalkRelaySession({
		sessions: transcriptionSessions,
		sessionId: transcriptionSessionId,
		connId,
		closeSession: (session) => closeTranscriptionSession(session, "completed"),
		unknownSessionMessage: "Unknown transcription Talk session"
	});
	if (relay.draining) throw new Error("Unknown transcription Talk session");
	return relay;
}
/** Streams one base64-encoded audio frame into the owning transcription relay. */
function sendTalkTranscriptionRelayAudio(params) {
	if (params.audioBase64.length > MAX_AUDIO_BASE64_BYTES) throw new Error("Transcription Talk audio frame is too large");
	const session = getTranscriptionSession(params.transcriptionSessionId, params.connId);
	const audio = decodeTalkRelayAudioBase64(params.audioBase64, "Transcription Talk");
	const turnId = ensureTranscriptionTurn(session);
	session.sttSession.sendAudio(audio);
	session.receivedAudio = true;
	broadcastToOwner(session.context, session.connId, {
		transcriptionSessionId: session.id,
		type: "inputAudio",
		byteLength: audio.byteLength,
		talkEvent: session.talk.emit({
			type: "input.audio.delta",
			turnId,
			payload: { byteLength: audio.byteLength }
		})
	});
}
/** Commits the current transcription turn and closes the relay. */
function stopTalkTranscriptionRelaySession(params) {
	const session = getTranscriptionSession(params.transcriptionSessionId, params.connId);
	const turnId = session.talk.activeTurnId;
	if (!turnId && !session.receivedAudio) {
		closeTranscriptionSession(session, "completed");
		return;
	}
	if (turnId) broadcastToOwner(session.context, session.connId, {
		transcriptionSessionId: session.id,
		type: "transcript",
		text: "",
		final: true,
		talkEvent: session.talk.emit({
			type: "input.audio.committed",
			turnId,
			payload: {},
			final: true
		})
	});
	session.draining = true;
	clearTimeout(session.cleanupTimer);
	session.cleanupTimer = setTimeout(() => {
		if (transcriptionSessions.get(session.id) === session) closeTranscriptionSession(session, "completed");
	}, TRANSCRIPTION_PROVIDER_FINAL_DRAIN_MS);
	session.cleanupTimer.unref?.();
	try {
		session.sttSession.close();
	} catch (error) {
		closeTranscriptionSession(session, "completed");
		throw error;
	}
}
/** Cancels the active transcription turn and closes the relay. */
function cancelTalkTranscriptionRelayTurn(params) {
	const session = getTranscriptionSession(params.transcriptionSessionId, params.connId);
	const turnId = ensureTranscriptionTurn(session);
	const cancelled = session.talk.cancelTurn({
		turnId,
		payload: { reason: params.reason ?? "client-cancelled" }
	});
	broadcastToOwner(session.context, session.connId, {
		transcriptionSessionId: session.id,
		type: "transcript",
		text: "",
		final: true,
		talkEvent: cancelled.ok ? cancelled.event : void 0
	});
	closeTranscriptionSession(session, "completed");
}
//#endregion
export { resolveTalkTargetAgentId as S, forgetUnifiedTalkSession as _, stopTalkTranscriptionRelaySession as a, requireUnifiedTalkSessionConn as b, cancelTalkRealtimeRelayTurn as c, flushTalkRealtimeRelayVoiceWrites as d, registerTalkRealtimeRelayAgentRun as f, submitTalkRealtimeRelayToolResult as g, stopTalkRealtimeRelaySession as h, sendTalkTranscriptionRelayAudio as i, closeTalkRealtimeRelaySessionsForConnection as l, steerTalkRealtimeRelayAgentRun as m, closeTalkTranscriptionRelaySessionsForConnection as n, createTalkRealtimeRelaySession as o, sendTalkRealtimeRelayAudio as p, createTalkTranscriptionRelaySession as r, acknowledgeTalkRealtimeRelayMark as s, cancelTalkTranscriptionRelayTurn as t, ensureTalkRealtimeRelayVoiceSession as u, getUnifiedTalkSession as v, resolveTalkSessionAgentId as x, rememberUnifiedTalkSession as y };
