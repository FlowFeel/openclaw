import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { C as resolveExpiresAtMsFromDurationMs, S as resolveDateTimestampMs, m as isFutureDateTimestampMs, o as asDateTimestampMs } from "./number-coercion-Crk_c9KW.js";
import { t as expectDefined } from "./expect-CyE8FADM.js";
import "./src-COWbwBfI.js";
import { i as asOptionalRecord } from "./record-coerce-DHZ4bFlT.js";
import { n as resolveGlobalMap } from "./global-singleton-Dc_stLtU.js";
import { u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { a as buildAgentMainSessionKey } from "./session-key-DtTE9-Tg.js";
import { l as readConfigFileSnapshot } from "./io-DCw4R0kD.js";
import { S as resolveSupportedVoiceModelRefs, b as providerMatchesId, y as getVoiceProviderConfig } from "./loader-si71apUX.js";
import "./agent-scope-DyEposw2.js";
import { n as sha256Base64Url } from "./crypto-digest-CmUwt1S-.js";
import { i as resolveActiveTalkProviderConfig, r as normalizeTalkSection, t as buildTalkConfigResponse } from "./talk-tpRQh2VT.js";
import "./config-UtpOr1Uw.js";
import { t as resolveConfiguredSecretInputString } from "./resolve-configured-secret-input-string-DxIa9XNX.js";
import { a as READ_SCOPE, s as TALK_SECRETS_SCOPE, t as ADMIN_SCOPE } from "./operator-scopes-Dw7Gu2cA.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { A as authorizeClientVoiceConfirmation, C as ensureClientVoiceAgentSessionEntry, D as resolveOpenClientVoiceSessionId, E as resolveClientVoiceSessionOrigin, S as createOrResumeClientVoiceSession, T as resolveClientVoiceAgentSessionId, g as appendClientVoiceTranscript, j as bindAuthorizedClientVoiceConfirmation, v as assertClientVoiceSessionOpen, w as registerClientVoiceConsultRun, x as closeStaleClientVoiceSessions, y as closeClientVoiceSession } from "./agent-tools.before-tool-call-Cp_0kD4x.js";
import { Ai as validateTalkSessionCancelTurnParams, Ci as validateTalkClientTranscriptParams, Di as validateTalkSessionAcknowledgeMarkParams, Ei as validateTalkModeParams, Fi as validateTalkSessionSubmitToolResultParams, Ii as validateTalkSessionTurnParams, Li as validateTalkSpeakParams, Mi as validateTalkSessionCreateParams, Ni as validateTalkSessionJoinParams, Oi as validateTalkSessionAppendAudioParams, Pi as validateTalkSessionSteerParams, _i as validateTalkClientCreateParams, bi as validateTalkClientSteerParams, gi as validateTalkClientCloseParams, hi as validateTalkCatalogParams, ji as validateTalkSessionCloseParams, ki as validateTalkSessionCancelOutputParams, wi as validateTalkConfigParams, xi as validateTalkClientToolCallParams } from "./src-BSn6va4B.js";
import { a as errorShape, o as missingScopeErrorShape } from "./error-codes-P4fBo0lR.js";
import { d as readSessionPreviewItemsFromTranscript } from "./session-transcript-readers-O3pZVV3x.js";
import { i as getSpeechProvider, o as listSpeechProviders, r as canonicalizeSpeechProviderId } from "./directives-rfUF-x-9.js";
import { C as withSpeakerSelectionFallbackCompat, S as withSpeakerSelectionCompat, g as resolveTtsConfig } from "./tts-settings-Cim3tOQK.js";
import { C as getResolvedSpeechProviderConfig, b as CODE_HEAVY_SPOKEN_FALLBACK, v as synthesizeSpeech, x as isCodeHeavySpeechText } from "./runtime-api-h4IEqjLu.js";
import "./tts-C8gjifd4.js";
import { n as redactConfigObject } from "./redact-snapshot-Ba1hEL2u.js";
import { s as registerChatAbortController, t as abortChatRunById } from "./chat-abort-BvCyxb9W.js";
import { t as createPluginRuntime } from "./runtime-BewV9ibn.js";
import { t as formatForLog } from "./ws-log-B1D_Y86r.js";
import { n as getRealtimeTranscriptionProvider, r as listRealtimeTranscriptionProviders, t as canonicalizeRealtimeTranscriptionProviderId } from "./provider-registry-CJkFgF4p.js";
import { n as resolveRealtimeBootstrapContextInstructions } from "./realtime-bootstrap-context-D1keR3e2.js";
import { M as createTalkSessionController, P as recordTalkObservabilityEvent, S as parseRealtimeVoiceAgentConsultArgs, f as consultRealtimeVoiceAgent, g as buildRealtimeVoiceAgentConsultChatMessage, m as REALTIME_VOICE_AGENT_CONSULT_TOOL_NAME, p as REALTIME_VOICE_AGENT_CONSULT_TOOL } from "./realtime-session-harness-bu55PsqP.js";
import { i as REALTIME_VOICE_AGENT_CONTROL_TOOL_NAME, r as REALTIME_VOICE_AGENT_CONTROL_TOOL, t as controlRealtimeVoiceAgentRun } from "./agent-run-control-D0LB37EY.js";
import { a as resolveInternalRealtimeVoiceGatewayRelayLaunchError, c as listRealtimeVoiceProviders, i as cancelInternalRealtimeVoiceBrowserSession, n as resolveConfiguredRealtimeVoiceProvider, o as canonicalizeRealtimeVoiceProviderId, r as resolveRealtimeVoiceProviderCapabilities, t as isRealtimeVoiceProviderConfigured } from "./provider-resolver-CUCSq-Dm.js";
import { n as resolveProviderRawConfig } from "./provider-selection-runtime-DGqZaqbE.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as chatHandlers } from "./chat-D_Dn1z7s.js";
import { t as resolveSessionKeyFromResolveParams } from "./sessions-resolve-fkFdEIUn.js";
import { S as resolveTalkTargetAgentId, _ as forgetUnifiedTalkSession, a as stopTalkTranscriptionRelaySession, b as requireUnifiedTalkSessionConn, c as cancelTalkRealtimeRelayTurn, d as flushTalkRealtimeRelayVoiceWrites, f as registerTalkRealtimeRelayAgentRun, g as submitTalkRealtimeRelayToolResult, h as stopTalkRealtimeRelaySession, i as sendTalkTranscriptionRelayAudio, m as steerTalkRealtimeRelayAgentRun, o as createTalkRealtimeRelaySession, p as sendTalkRealtimeRelayAudio, r as createTalkTranscriptionRelaySession, s as acknowledgeTalkRealtimeRelayMark, t as cancelTalkTranscriptionRelayTurn, u as ensureTalkRealtimeRelayVoiceSession, v as getUnifiedTalkSession, x as resolveTalkSessionAgentId, y as rememberUnifiedTalkSession } from "./talk-transcription-relay-CcEXZtdk.js";
import { t as inferSpeechMimeType } from "./speech-mime-DhqL3Zyq.js";
import { randomBytes, randomUUID } from "node:crypto";
const REALTIME_VOICE_DESCRIBE_VIEW_TOOL = {
	type: "function",
	name: "describe_view",
	description: "Capture the current browser camera frame when the caller asks what is visible or needs visual context.",
	parameters: {
		type: "object",
		properties: {}
	}
};
//#endregion
//#region src/gateway/talk-agent-consult.ts
function normalizeTalkChatSendAckStatus(result) {
	if (!result || typeof result !== "object" || Array.isArray(result)) return "started";
	const status = result.status;
	return status === "in_flight" || status === "ok" || status === "timeout" || status === "error" ? status : "started";
}
function terminalTalkChatSendAckError(status) {
	if (status === "timeout") return errorShape(ErrorCodes.UNAVAILABLE, "Realtime agent consult ended before the run started.");
	if (status === "error") return errorShape(ErrorCodes.UNAVAILABLE, "Realtime agent consult failed before the run started.");
	if (status === "ok") return errorShape(ErrorCodes.UNAVAILABLE, "Realtime agent consult completed before the tool result subscription started.");
}
/**
* Starts the agent-consult chat run that backs realtime Talk tool calls.
*/
async function startTalkRealtimeAgentConsult(params) {
	let message;
	try {
		message = buildRealtimeVoiceAgentConsultChatMessage(params.args);
	} catch (err) {
		return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, formatForLog(err))
		};
	}
	const idempotencyKey = `talk-${params.callId}-${randomUUID()}`;
	const normalizedTalk = normalizeTalkSection(params.context.getRuntimeConfig().talk);
	let acknowledgedRunId;
	const chatResponse = await new Promise((resolve) => {
		let acknowledged = false;
		const chatSendResult = expectDefined(chatHandlers["chat.send"], "chat.send handler")({
			req: {
				type: "req",
				id: `${params.requestId}:talk-tool-call`,
				method: "chat.send"
			},
			client: params.client,
			isWebchatConnect: params.isWebchatConnect,
			context: params.context,
			params: {
				sessionKey: params.sessionKey,
				message,
				idempotencyKey,
				...normalizedTalk?.consultThinkingLevel ? { thinking: normalizedTalk.consultThinkingLevel } : {},
				...typeof normalizedTalk?.consultFastMode === "boolean" ? { fastMode: normalizedTalk.consultFastMode } : {}
			},
			respond: (ok, result, error) => {
				acknowledged = true;
				if (ok && !terminalTalkChatSendAckError(normalizeTalkChatSendAckStatus(result))) {
					const candidateRunId = result && typeof result === "object" && !Array.isArray(result) ? result.runId : void 0;
					const runId = typeof candidateRunId === "string" ? candidateRunId : idempotencyKey;
					try {
						if (params.relaySessionId && params.connId) registerTalkRealtimeRelayAgentRun({
							relaySessionId: params.relaySessionId,
							connId: params.connId,
							sessionKey: params.sessionKey,
							runId,
							callId: params.callId
						});
						params.onRunStarted?.(runId);
						acknowledgedRunId = runId;
					} catch (registrationError) {
						abortChatRunById(params.context, {
							runId,
							sessionKey: params.sessionKey,
							stopReason: "voice session binding failed"
						});
						resolve({
							ok: false,
							error: errorShape(ErrorCodes.UNAVAILABLE, formatForLog(registrationError))
						});
						return;
					}
				}
				resolve(ok ? {
					ok: true,
					result
				} : {
					ok: false,
					error: error ?? errorShape(ErrorCodes.UNAVAILABLE, "chat.send failed without error")
				});
			}
		});
		Promise.resolve(chatSendResult).then(() => {
			if (!acknowledged) resolve(void 0);
		}, (error) => {
			if (acknowledged) {
				params.context.logGateway.warn(`realtime Talk agent consult failed after acknowledgement: ${formatForLog(error)}`);
				return;
			}
			resolve({
				ok: false,
				error: errorShape(ErrorCodes.UNAVAILABLE, formatForLog(error))
			});
		});
	});
	if (!chatResponse) return {
		ok: false,
		error: errorShape(ErrorCodes.UNAVAILABLE, "chat.send did not return a realtime tool result")
	};
	if (!chatResponse.ok) return {
		ok: false,
		error: chatResponse.error
	};
	const result = chatResponse.result;
	const terminalAckError = terminalTalkChatSendAckError(normalizeTalkChatSendAckStatus(result));
	if (terminalAckError) return {
		ok: false,
		error: terminalAckError
	};
	return {
		ok: true,
		runId: expectDefined(expectDefined(acknowledgedRunId, "talk agent run id"), "talk agent run id"),
		idempotencyKey
	};
}
//#endregion
//#region src/gateway/server-methods/talk-shared.ts
/** Resolve the Talk session mode, defaulting managed-room transports to stt-tts. */
function normalizeTalkSessionMode(params) {
	return normalizeOptionalLowercaseString(params.mode) ?? (normalizeOptionalLowercaseString(params.transport) === "managed-room" ? "stt-tts" : "realtime");
}
/** Resolve the Talk session transport from mode when the client omits it. */
function normalizeTalkSessionTransport(params) {
	const transport = normalizeOptionalLowercaseString(params.transport);
	if (transport) return transport;
	return params.mode === "stt-tts" ? "managed-room" : "gateway-relay";
}
/** Resolve the Talk session brain, defaulting transcription sessions to none. */
function normalizeTalkSessionBrain(params) {
	const brain = normalizeOptionalLowercaseString(params.brain);
	if (brain) return brain;
	return params.mode === "transcription" ? "none" : "agent-consult";
}
async function resolveTalkRealtimeProviderInstructions(params) {
	const requestedSessionKey = normalizeOptionalString(params.sessionKey);
	const defaultAgentId = resolveTalkTargetAgentId(params.config);
	const agentId = params.agentId ?? (requestedSessionKey ? resolveTalkSessionAgentId(params.config, requestedSessionKey) : defaultAgentId);
	const bootstrapContext = params.requireSessionKeyForProfile && !requestedSessionKey ? void 0 : await resolveRealtimeBootstrapContextInstructions({
		agentId,
		config: params.config,
		sessionKey: requestedSessionKey,
		warn: params.warn
	});
	return {
		agentId,
		instructions: [params.configuredInstructions, bootstrapContext].filter((entry) => Boolean(entry?.trim())).join("\n\n"),
		...requestedSessionKey ? { requestedSessionKey } : {}
	};
}
function canUseTalkDirectTools(client) {
	return (Array.isArray(client?.connect?.scopes) ? client.connect.scopes : []).includes(ADMIN_SCOPE);
}
function broadcastTalkRoomEvents(context, connId, params) {
	if (!connId || params.events.length === 0) return;
	for (const talkEvent of params.events) context.broadcastToConnIds("talk.event", {
		handoffId: params.handoffId,
		roomId: params.roomId,
		talkEvent
	}, /* @__PURE__ */ new Set([connId]), { dropIfSlow: true });
}
function talkHandoffErrorCode(reason) {
	return reason === "invalid_token" || reason === "no_active_turn" || reason === "stale_turn" ? ErrorCodes.INVALID_REQUEST : ErrorCodes.UNAVAILABLE;
}
function getRecord(value) {
	return asOptionalRecord(value) ?? void 0;
}
function singleRecordKey(record) {
	const keys = record ? Object.keys(record) : [];
	return keys.length === 1 ? keys[0] : void 0;
}
function normalizeRealtimeTransport(value) {
	const transport = normalizeOptionalLowercaseString(value);
	return transport === "webrtc" || transport === "provider-websocket" || transport === "gateway-relay" || transport === "managed-room" ? transport : void 0;
}
function getVoiceCallProviderConfig(config, sectionName) {
	const section = getRecord(getRecord(getRecord(getRecord(getRecord(config.plugins)?.entries)?.["voice-call"])?.config)?.[sectionName]);
	const providersRaw = getRecord(section?.providers);
	const providers = {};
	if (providersRaw) for (const [providerId, providerConfig] of Object.entries(providersRaw)) {
		const record = getRecord(providerConfig);
		if (record) providers[providerId] = record;
	}
	return {
		provider: normalizeOptionalString(section?.provider),
		providers: Object.keys(providers).length > 0 ? providers : void 0
	};
}
function getVoiceCallRealtimeConfig(config) {
	return getVoiceCallProviderConfig(config, "realtime");
}
function getVoiceCallStreamingConfig(config) {
	return getVoiceCallProviderConfig(config, "streaming");
}
function listTalkTranscriptionProviders(config, configuredProviderIds) {
	const providers = listRealtimeTranscriptionProviders(config);
	for (const providerId of configuredProviderIds) {
		const configuredProvider = getRealtimeTranscriptionProvider(providerId, config);
		if (configuredProvider && !providers.some((provider) => normalizeOptionalLowercaseString(provider.id) === normalizeOptionalLowercaseString(configuredProvider.id))) providers.push(configuredProvider);
	}
	return providers;
}
function resolveConfiguredVoiceModelDefaultRef(params) {
	const configuredProvider = normalizeOptionalString(params.provider);
	const refs = resolveSupportedVoiceModelRefs({
		config: params.config.agents?.defaults?.voiceModel,
		providers: params.providers,
		providerId: configuredProvider
	});
	for (const ref of refs) {
		const provider = params.providers.find((entry) => providerMatchesId(entry, ref.provider));
		if (!provider) continue;
		if (!configuredProvider) {
			const rawConfig = getVoiceProviderConfig({
				providerConfigs: params.providerConfigs,
				provider
			});
			const rawConfigWithModel = rawConfig.model === void 0 ? {
				...rawConfig,
				model: ref.model
			} : rawConfig;
			const providerConfig = provider.resolveConfig?.({
				cfg: params.config,
				rawConfig: rawConfigWithModel
			}) ?? rawConfigWithModel;
			if (!configuredOrFalse(() => provider.isConfigured({
				cfg: params.config,
				providerConfig
			}))) continue;
		}
		return {
			provider: provider.id,
			model: ref.model
		};
	}
}
function buildTalkRealtimeConfig(config, requestedProvider) {
	const voiceCallRealtime = getVoiceCallRealtimeConfig(config);
	const talkRealtime = getRecord(config.talk?.realtime);
	const talkRealtimeProviderConfigs = talkRealtime?.providers;
	const explicitProvider = normalizeOptionalString(requestedProvider) ?? normalizeOptionalString(talkRealtime?.provider);
	const singleConfiguredProvider = normalizeOptionalString(singleRecordKey(talkRealtimeProviderConfigs));
	const selectedProvider = explicitProvider ?? singleConfiguredProvider ?? voiceCallRealtime.provider ?? singleConfiguredProvider;
	const providerConfigs = {
		...voiceCallRealtime.providers,
		...talkRealtimeProviderConfigs
	};
	const voiceModelDefault = resolveConfiguredVoiceModelDefaultRef({
		config,
		provider: selectedProvider,
		providerConfigs,
		providers: listRealtimeVoiceProviders(config)
	});
	return {
		provider: selectedProvider ?? voiceModelDefault?.provider,
		providers: providerConfigs,
		model: normalizeOptionalString(talkRealtime?.model) ?? voiceModelDefault?.model,
		voice: normalizeOptionalString(talkRealtime?.speakerVoice) ?? normalizeOptionalString(talkRealtime?.speakerVoiceId),
		instructions: normalizeOptionalString(talkRealtime?.instructions),
		mode: normalizeOptionalLowercaseString(talkRealtime?.mode),
		transport: normalizeRealtimeTransport(talkRealtime?.transport),
		vadThreshold: typeof talkRealtime?.vadThreshold === "number" && Number.isFinite(talkRealtime.vadThreshold) ? talkRealtime.vadThreshold : void 0,
		silenceDurationMs: typeof talkRealtime?.silenceDurationMs === "number" && Number.isFinite(talkRealtime.silenceDurationMs) ? talkRealtime.silenceDurationMs : void 0,
		prefixPaddingMs: typeof talkRealtime?.prefixPaddingMs === "number" && Number.isFinite(talkRealtime.prefixPaddingMs) ? talkRealtime.prefixPaddingMs : void 0,
		reasoningEffort: normalizeOptionalString(talkRealtime?.reasoningEffort),
		brain: normalizeOptionalLowercaseString(talkRealtime?.brain),
		consultRouting: normalizeOptionalLowercaseString(talkRealtime?.consultRouting)
	};
}
function buildTalkTranscriptionConfig(config, requestedProvider) {
	const streamingConfig = getVoiceCallStreamingConfig(config);
	const provider = normalizeOptionalString(requestedProvider) ?? streamingConfig.provider;
	const providerConfigs = streamingConfig.providers ?? {};
	const voiceModelDefault = resolveConfiguredVoiceModelDefaultRef({
		config,
		provider,
		providerConfigs,
		providers: listTalkTranscriptionProviders(config, [provider, ...Object.keys(providerConfigs)])
	});
	return {
		provider: provider ?? voiceModelDefault?.provider,
		providers: providerConfigs,
		model: voiceModelDefault?.model
	};
}
function configuredOrFalse(callback) {
	try {
		return callback();
	} catch {
		return false;
	}
}
function resolveConfiguredRealtimeTranscriptionProvider(params) {
	const normalizedConfigured = normalizeOptionalLowercaseString(params.configuredProviderId);
	const providers = normalizedConfigured ? [getRealtimeTranscriptionProvider(normalizedConfigured, params.config)].filter((provider) => provider !== void 0) : listTalkTranscriptionProviders(params.config, Object.keys(params.providerConfigs));
	const orderedProviders = normalizedConfigured ? providers : providers.toSorted((a, b) => (a.autoSelectOrder ?? 1e3) - (b.autoSelectOrder ?? 1e3));
	for (const provider of orderedProviders) {
		const rawConfig = getVoiceProviderConfig({
			providerConfigs: params.providerConfigs,
			provider,
			configuredProviderId: params.configuredProviderId
		});
		const rawConfigWithModel = params.defaultModel && rawConfig.model === void 0 ? {
			...rawConfig,
			model: params.defaultModel
		} : rawConfig;
		const providerConfig = provider.resolveConfig?.({
			cfg: params.config,
			rawConfig: rawConfigWithModel
		}) ?? rawConfigWithModel;
		if (configuredOrFalse(() => provider.isConfigured({
			cfg: params.config,
			providerConfig
		}))) return {
			provider,
			providerConfig
		};
	}
	if (normalizedConfigured) throw new Error(`Realtime transcription provider "${params.configuredProviderId}" is not configured`);
	throw new Error("No realtime transcription provider registered");
}
const DEFAULT_REALTIME_INSTRUCTIONS = [
	"You are OpenClaw's realtime voice interface. Keep spoken replies concise.",
	`If the user asks for code, repository state, files, current OpenClaw context, tool-backed actions, or deeper reasoning, call ${REALTIME_VOICE_AGENT_CONSULT_TOOL_NAME} and then summarize the result naturally.`,
	`Do not claim you cannot use tools, perform actions, or reach OpenClaw unless ${REALTIME_VOICE_AGENT_CONSULT_TOOL_NAME} returns that failure.`,
	`When ${REALTIME_VOICE_AGENT_CONSULT_TOOL_NAME} is in progress, speak one brief acknowledgement such as "Let me check that for you", then wait for the final OpenClaw result before answering with the actual result.`,
	`If OpenClaw is already working through ${REALTIME_VOICE_AGENT_CONSULT_TOOL_NAME} and the user asks in any language for progress, cancellation, a redirect/change, or a follow-up, call ${REALTIME_VOICE_AGENT_CONTROL_TOOL_NAME} with the semantic mode.`,
	"For greetings and casual chatter while OpenClaw is working, answer naturally and do not redirect the active work."
].join(" ");
function buildRealtimeInstructions(configuredInstructions) {
	const extra = normalizeOptionalString(configuredInstructions);
	if (!extra) return DEFAULT_REALTIME_INSTRUCTIONS;
	return `${DEFAULT_REALTIME_INSTRUCTIONS}\n\nAdditional realtime instructions:\n${extra}`;
}
function buildRealtimeVoiceLaunchOptions(params) {
	return {
		...pickRealtimeVoiceLaunchOptions(params.defaults),
		...pickRealtimeVoiceLaunchOptions(params.requested)
	};
}
function withRealtimeBrowserOverrides(providerConfig, params) {
	const overrides = {};
	const model = normalizeOptionalString(params.model);
	const voice = normalizeOptionalString(params.voice);
	const reasoningEffort = normalizeOptionalString(params.reasoningEffort);
	if (model) overrides.model = model;
	if (voice) overrides.voice = voice;
	if (typeof params.vadThreshold === "number" && Number.isFinite(params.vadThreshold)) overrides.vadThreshold = params.vadThreshold;
	if (typeof params.silenceDurationMs === "number" && Number.isFinite(params.silenceDurationMs)) overrides.silenceDurationMs = params.silenceDurationMs;
	if (typeof params.prefixPaddingMs === "number" && Number.isFinite(params.prefixPaddingMs)) overrides.prefixPaddingMs = params.prefixPaddingMs;
	if (reasoningEffort) overrides.reasoningEffort = reasoningEffort;
	return Object.keys(overrides).length > 0 ? {
		...providerConfig,
		...overrides
	} : providerConfig;
}
function resolveTalkRealtimeGatewayRelayLaunch(params) {
	const forceAgentConsultOnFinalTranscript = params.consultRouting === "force-agent-consult";
	const providerConfig = withRealtimeBrowserOverrides(params.providerConfig, params.launchOptions);
	return {
		providerConfig,
		forceAgentConsultOnFinalTranscript,
		error: resolveInternalRealtimeVoiceGatewayRelayLaunchError({
			provider: params.provider,
			cfg: params.cfg,
			providerConfig,
			model: params.launchOptions.model,
			autoRespondToAudio: !forceAgentConsultOnFinalTranscript
		})
	};
}
function pickRealtimeVoiceLaunchOptions(params) {
	const options = {};
	const model = normalizeOptionalString(params.model);
	const voice = normalizeOptionalString(params.voice);
	const reasoningEffort = normalizeOptionalString(params.reasoningEffort);
	if (model) options.model = model;
	if (voice) options.voice = voice;
	if (typeof params.vadThreshold === "number" && Number.isFinite(params.vadThreshold)) options.vadThreshold = params.vadThreshold;
	if (typeof params.silenceDurationMs === "number" && Number.isFinite(params.silenceDurationMs)) options.silenceDurationMs = params.silenceDurationMs;
	if (typeof params.prefixPaddingMs === "number" && Number.isFinite(params.prefixPaddingMs)) options.prefixPaddingMs = params.prefixPaddingMs;
	if (reasoningEffort) options.reasoningEffort = reasoningEffort;
	return options;
}
function isUnsupportedBrowserWebRtcSession(session) {
	const provider = normalizeLowercaseStringOrEmpty(session.provider);
	const transport = session.transport ?? "webrtc";
	return provider === "google" && transport === "webrtc";
}
//#endregion
//#region src/gateway/server-methods/talk-client.ts
const LEGACY_VOICE_BINDING_TTL_MS = 360 * 6e4;
const REALTIME_VOICE_CONTEXT_MAX_ITEMS = 16;
const REALTIME_VOICE_CONTEXT_MAX_ITEM_CHARS = 800;
const REALTIME_VOICE_CONTEXT_MAX_UTF8_BYTES = 8e3;
const REALTIME_VOICE_CLIENT_SESSION_MIN_TTL_MS = 5e3;
const legacyVoiceSessionByClient = /* @__PURE__ */ new Map();
function boundRealtimeVoiceInitialItems(items) {
	let remainingBytes = REALTIME_VOICE_CONTEXT_MAX_UTF8_BYTES;
	const newestFirst = [];
	for (let index = items.length - 1; index >= 0; index -= 1) {
		const item = items[index];
		if (!item) continue;
		const itemBytes = Buffer.byteLength(item.text, "utf8");
		if (itemBytes > remainingBytes) break;
		newestFirst.push(item);
		remainingBytes -= itemBytes;
	}
	return newestFirst.toReversed();
}
function legacyVoiceBindingKey(connId, sessionKey) {
	return `${connId}\0${sessionKey}`;
}
function pruneLegacyVoiceBindings(now = Date.now()) {
	for (const [key, binding] of legacyVoiceSessionByClient) if (binding.expiresAt <= now) legacyVoiceSessionByClient.delete(key);
}
function resolveTalkClientAgentId(config, key) {
	return resolveTalkSessionAgentId(config, key);
}
/**
* Gateway methods for browser-owned realtime Talk sessions.
*
* These handlers create provider browser sessions and bridge client-owned tool
* calls back into OpenClaw agent consult runs.
*/
const talkClientHandlers = {
	"talk.client.create": async ({ params, respond, context, client }) => {
		if (!assertValidParams(params, validateTalkClientCreateParams, "talk.client.create", respond)) return;
		const typedParams = params;
		try {
			const runtimeConfig = context.getRuntimeConfig();
			const realtimeConfig = buildTalkRealtimeConfig(runtimeConfig, typedParams.provider);
			const mode = normalizeOptionalLowercaseString(typedParams.mode) ?? realtimeConfig.mode ?? "realtime";
			if (mode !== "realtime") {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `talk.client.create only supports mode="realtime"; use talk.catalog for ${mode} provider discovery`));
				return;
			}
			if ((normalizeOptionalLowercaseString(typedParams.brain) ?? realtimeConfig.brain ?? "agent-consult") !== "agent-consult") {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `talk.client.create only supports brain="agent-consult"`));
				return;
			}
			const transport = normalizeOptionalLowercaseString(typedParams.transport) ?? realtimeConfig.transport;
			const wantsCameraFrames = typedParams.capabilities?.includes("camera-frame") === true;
			if (transport === "managed-room") {
				respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "managed-room realtime Talk sessions are not available in the browser UI yet"));
				return;
			}
			if (transport === "gateway-relay") {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, wantsCameraFrames ? "gateway-relay does not support browser video frames" : `talk.client.create is client-owned; use talk.session.create for gateway-relay`));
				return;
			}
			const launchOptions = buildRealtimeVoiceLaunchOptions({
				requested: typedParams,
				defaults: realtimeConfig
			});
			const requestedAgentId = resolveTalkSessionAgentId(runtimeConfig, typedParams.sessionKey);
			const resolution = resolveConfiguredRealtimeVoiceProvider({
				configuredProviderId: realtimeConfig.provider,
				providerConfigs: realtimeConfig.providers,
				...launchOptions.model ? { providerConfigOverrides: { model: launchOptions.model } } : {},
				cfg: runtimeConfig,
				cfgForResolve: runtimeConfig,
				agentId: requestedAgentId,
				defaultModel: realtimeConfig.model,
				surface: "browser-session",
				noRegisteredProviderMessage: "No realtime voice provider registered"
			});
			const providerCapabilities = resolveRealtimeVoiceProviderCapabilities({
				provider: resolution.provider,
				providerConfig: resolution.providerConfig,
				cfg: runtimeConfig,
				model: launchOptions.model,
				surface: "browser-session"
			});
			if (wantsCameraFrames && providerCapabilities?.supportsVideoFrames !== true) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `Realtime provider ${resolution.provider.id} does not support browser video frames`));
				return;
			}
			const realtimeContext = await resolveTalkRealtimeProviderInstructions({
				config: runtimeConfig,
				agentId: requestedAgentId,
				configuredInstructions: realtimeConfig.instructions,
				sessionKey: typedParams.sessionKey,
				requireSessionKeyForProfile: true,
				warn: (message) => context.logGateway.warn(`talk realtime context: ${message}`)
			});
			const { agentId, requestedSessionKey } = realtimeContext;
			const sessionKey = requestedSessionKey ?? buildAgentMainSessionKey({ agentId });
			if (resolution.provider.createBrowserSession && transport !== "gateway-relay") {
				const agentSessionId = resolveClientVoiceAgentSessionId({
					agentId,
					sessionKey
				});
				const initialItems = agentSessionId ? boundRealtimeVoiceInitialItems(readSessionPreviewItemsFromTranscript({
					agentId,
					sessionId: agentSessionId,
					sessionKey
				}, REALTIME_VOICE_CONTEXT_MAX_ITEMS, REALTIME_VOICE_CONTEXT_MAX_ITEM_CHARS).filter((item) => item.role === "user" || item.role === "assistant")) : [];
				const tools = providerCapabilities?.supportsToolCalls === false ? [] : [REALTIME_VOICE_AGENT_CONSULT_TOOL, REALTIME_VOICE_AGENT_CONTROL_TOOL];
				if (wantsCameraFrames && tools.length > 0) tools.push(REALTIME_VOICE_DESCRIBE_VIEW_TOOL);
				const instructions = providerCapabilities?.handlesAgentConsult === true ? normalizeOptionalString(realtimeContext.instructions) : buildRealtimeInstructions(realtimeContext.instructions);
				let consultAgentRuntime;
				let activeVoiceSessionId;
				const ownerConnId = normalizeOptionalString(client?.connId);
				const runAgentConsult = async ({ prompt, signal }) => {
					consultAgentRuntime ??= createPluginRuntime().agent;
					const talkConfig = normalizeTalkSection(runtimeConfig.talk);
					return await consultRealtimeVoiceAgent({
						cfg: runtimeConfig,
						agentRuntime: consultAgentRuntime,
						logger: context.logGateway,
						agentId,
						sessionKey,
						messageProvider: "webchat",
						lane: "talk",
						runIdPrefix: "talk-realtime-consult",
						args: { question: prompt },
						transcript: initialItems,
						surface: "a browser Talk session",
						userLabel: "User",
						questionSourceLabel: "user",
						thinkLevel: talkConfig?.consultThinkingLevel,
						fastMode: talkConfig?.consultFastMode,
						abortSignal: signal,
						onRunStarted: ({ runId, sessionId, timeoutMs }) => {
							const voiceSessionId = activeVoiceSessionId;
							if (!voiceSessionId) throw new Error("Realtime browser voice session is not ready for agent consult");
							registerClientVoiceConsultRun({
								agentId,
								sessionKey,
								voiceSessionId,
								runId,
								config: runtimeConfig
							});
							if (!ownerConnId) return;
							const registration = registerChatAbortController({
								chatAbortControllers: context.chatAbortControllers,
								runId,
								sessionId,
								sessionKey,
								agentId,
								timeoutMs,
								ownerConnId,
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
				const browserSessionRequest = {
					cfg: runtimeConfig,
					agentId,
					workspaceDir: resolveAgentWorkspaceDir(runtimeConfig, agentId),
					providerConfig: resolution.providerConfig,
					instructions,
					initialItems,
					runAgentConsult,
					...tools.length > 0 ? { tools } : {},
					...launchOptions
				};
				const session = await resolution.provider.createBrowserSession(browserSessionRequest);
				if ((session.transport === "webrtc" || session.transport === "provider-websocket") && !isUnsupportedBrowserWebRtcSession(session) && (!transport || session.transport === transport)) {
					try {
						const sessionEntryDeadlineAt = session.expiresAt === void 0 ? void 0 : session.expiresAt - REALTIME_VOICE_CLIENT_SESSION_MIN_TTL_MS;
						if (sessionEntryDeadlineAt !== void 0 && Date.now() >= sessionEntryDeadlineAt) throw new Error("Realtime browser session expired during startup; try again");
						await ensureClientVoiceAgentSessionEntry({
							agentId,
							sessionKey,
							...sessionEntryDeadlineAt !== void 0 ? { deadlineAt: sessionEntryDeadlineAt } : {}
						});
					} catch (error) {
						try {
							await cancelInternalRealtimeVoiceBrowserSession({
								provider: resolution.provider,
								request: browserSessionRequest,
								session
							});
						} catch (cancelError) {
							context.logGateway.warn(`talk browser session cleanup failed: ${formatForLog(cancelError)}`);
						}
						throw error;
					}
					closeStaleClientVoiceSessions({
						agentId,
						config: runtimeConfig,
						excludeVoiceSessionId: normalizeOptionalString(typedParams.voiceSessionId),
						warn: (message) => context.logGateway.warn(`talk voice session recovery: ${message}`)
					}).catch((error) => context.logGateway.warn(`talk voice session recovery failed: ${formatForLog(error)}`));
					const voiceSessionId = createOrResumeClientVoiceSession({
						agentId,
						sessionKey,
						provider: resolution.provider.id,
						origin: "client",
						transcriptCapable: typedParams.capabilities?.includes("voice-transcript") === true,
						voiceSessionId: normalizeOptionalString(typedParams.voiceSessionId)
					});
					activeVoiceSessionId = voiceSessionId;
					const connId = ownerConnId;
					if (connId) {
						const now = Date.now();
						pruneLegacyVoiceBindings(now);
						legacyVoiceSessionByClient.set(legacyVoiceBindingKey(connId, typedParams.sessionKey?.trim() || sessionKey), {
							voiceSessionId,
							expiresAt: now + LEGACY_VOICE_BINDING_TTL_MS
						});
					}
					respond(true, {
						...session,
						voiceSessionId
					}, void 0);
					return;
				}
				try {
					await cancelInternalRealtimeVoiceBrowserSession({
						provider: resolution.provider,
						request: browserSessionRequest,
						session
					});
				} catch (cancelError) {
					context.logGateway.warn(`talk browser session cleanup failed: ${formatForLog(cancelError)}`);
				}
				if (transport) {
					respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `Realtime provider "${resolution.provider.id}" does not support requested browser transport "${transport}"`));
					return;
				}
			}
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `Realtime provider "${resolution.provider.id}" does not support client-owned realtime sessions`));
		} catch (err) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatForLog(err)));
		}
	},
	"talk.client.toolCall": async (request) => {
		const { params, respond } = request;
		if (!assertValidParams(params, validateTalkClientToolCallParams, "talk.client.toolCall", respond)) return;
		if (params.name !== "openclaw_agent_consult") {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `unsupported realtime Talk tool: ${params.name}`));
			return;
		}
		const agentId = resolveTalkClientAgentId(request.context.getRuntimeConfig(), params.sessionKey);
		const relaySessionId = normalizeOptionalString(params.relaySessionId);
		const connId = normalizeOptionalString(request.client?.connId);
		pruneLegacyVoiceBindings();
		const explicitVoiceSessionId = normalizeOptionalString(params.voiceSessionId);
		if (relaySessionId && explicitVoiceSessionId && explicitVoiceSessionId !== relaySessionId) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "relaySessionId and voiceSessionId must match"));
			return;
		}
		let confirmationGrant;
		let voiceSessionId;
		try {
			voiceSessionId = explicitVoiceSessionId ?? relaySessionId ?? (connId ? legacyVoiceSessionByClient.get(legacyVoiceBindingKey(connId, params.sessionKey))?.voiceSessionId : void 0) ?? resolveOpenClientVoiceSessionId({
				agentId,
				sessionKey: params.sessionKey
			}) ?? createOrResumeClientVoiceSession({
				agentId,
				sessionKey: params.sessionKey,
				origin: "client"
			});
			if (connId && !relaySessionId) {
				const now = Date.now();
				pruneLegacyVoiceBindings(now);
				legacyVoiceSessionByClient.set(legacyVoiceBindingKey(connId, params.sessionKey), {
					voiceSessionId,
					expiresAt: now + LEGACY_VOICE_BINDING_TTL_MS
				});
			}
			if (relaySessionId && connId) {
				await ensureClientVoiceAgentSessionEntry({
					agentId,
					sessionKey: params.sessionKey
				});
				ensureTalkRealtimeRelayVoiceSession({
					relaySessionId,
					connId,
					sessionKey: params.sessionKey
				});
				await flushTalkRealtimeRelayVoiceWrites({
					relaySessionId,
					connId
				});
			}
			const parsedArgs = parseRealtimeVoiceAgentConsultArgs(params.args ?? {});
			if (assertClientVoiceSessionOpen({
				agentId,
				sessionKey: params.sessionKey,
				voiceSessionId
			}) === "relay" && (!relaySessionId || !connId)) throw new Error("relay-owned voice sessions require relaySessionId and connection ownership");
			if (parsedArgs.confirmationId) confirmationGrant = authorizeClientVoiceConfirmation({
				agentId,
				voiceSessionId,
				confirmationId: parsedArgs.confirmationId
			});
		} catch (err) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, formatForLog(err)));
			return;
		}
		const result = await startTalkRealtimeAgentConsult({
			context: request.context,
			client: request.client,
			isWebchatConnect: request.isWebchatConnect,
			requestId: request.req.id,
			sessionKey: params.sessionKey,
			callId: params.callId,
			args: params.args ?? {},
			relaySessionId: normalizeOptionalString(params.relaySessionId),
			connId,
			onRunStarted: (runId) => {
				registerClientVoiceConsultRun({
					agentId,
					sessionKey: params.sessionKey,
					voiceSessionId,
					runId,
					config: request.context.getRuntimeConfig()
				});
				if (confirmationGrant) bindAuthorizedClientVoiceConfirmation({
					grant: confirmationGrant,
					runId
				});
			}
		});
		if (!result.ok) {
			respond(false, void 0, result.error);
			return;
		}
		respond(true, {
			runId: result.runId,
			idempotencyKey: result.idempotencyKey
		}, void 0);
	},
	"talk.client.transcript": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateTalkClientTranscriptParams, "talk.client.transcript", respond)) return;
		try {
			const config = context.getRuntimeConfig();
			await appendClientVoiceTranscript({
				agentId: resolveTalkClientAgentId(config, params.sessionKey),
				sessionKey: params.sessionKey,
				voiceSessionId: params.voiceSessionId,
				entryId: params.entryId,
				role: params.role,
				text: params.text,
				...params.timestamp !== void 0 ? { timestamp: params.timestamp } : {},
				config
			});
			respond(true, { ok: true }, void 0);
		} catch (err) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, formatForLog(err)));
		}
	},
	"talk.client.close": async ({ params, respond, context, client }) => {
		if (!assertValidParams(params, validateTalkClientCloseParams, "talk.client.close", respond)) return;
		try {
			const config = context.getRuntimeConfig();
			const agentId = resolveTalkClientAgentId(config, params.sessionKey);
			if (resolveClientVoiceSessionOrigin({
				agentId,
				sessionKey: params.sessionKey,
				voiceSessionId: params.voiceSessionId
			}) === "relay") throw new Error("relay-owned voice sessions close through talk.session.close");
			await closeClientVoiceSession({
				agentId,
				sessionKey: params.sessionKey,
				voiceSessionId: params.voiceSessionId,
				config
			});
			const connId = normalizeOptionalString(client?.connId);
			if (connId) {
				const key = legacyVoiceBindingKey(connId, params.sessionKey);
				if (legacyVoiceSessionByClient.get(key)?.voiceSessionId === params.voiceSessionId) legacyVoiceSessionByClient.delete(key);
			}
			respond(true, { ok: true }, void 0);
		} catch (err) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, formatForLog(err)));
		}
	},
	"talk.client.steer": async ({ params, respond, client, context }) => {
		if (!assertValidParams(params, validateTalkClientSteerParams, "talk.client.steer", respond)) return;
		if (!hasOwnedActiveTalkClientRun({
			context,
			clientConnId: client?.connId,
			sessionKey: params.sessionKey
		})) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "talk.client.steer requires an active browser-owned Talk run"));
			return;
		}
		try {
			respond(true, await controlRealtimeVoiceAgentRun({
				sessionKey: params.sessionKey,
				text: params.text,
				mode: params.mode
			}), void 0);
		} catch (err) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatForLog(err)));
		}
	}
};
function hasOwnedActiveTalkClientRun(params) {
	const connId = normalizeOptionalString(params.clientConnId);
	const sessionKey = params.sessionKey.trim();
	if (!connId || !sessionKey) return false;
	for (const entry of params.context.chatAbortControllers.values()) if (entry.sessionKey === sessionKey && entry.ownerConnId === connId && entry.kind !== "agent") return true;
	return false;
}
//#endregion
//#region src/gateway/talk-handoff.ts
const DEFAULT_TALK_HANDOFF_TTL_MS = 600 * 1e3;
const MAX_TALK_HANDOFF_TTL_MS = 3600 * 1e3;
const handoffs = resolveGlobalMap(Symbol.for("openclaw.talkHandoffs"), "close-and-restart");
/** Creates a short-lived Talk room and returns the only plaintext join token. */
function createTalkHandoff(params) {
	pruneExpiredTalkHandoffs();
	const rawCreatedAt = Date.now();
	const createdAt = resolveDateTimestampMs(rawCreatedAt);
	const expiresAt = resolveExpiresAtMsFromDurationMs(normalizeTtlMs(params.ttlMs), { nowMs: rawCreatedAt }) ?? 0;
	const id = randomUUID();
	const roomId = `talk_${id}`;
	const token = randomBytes(32).toString("base64url");
	const room = createTalkHandoffRoom({
		roomId,
		mode: params.mode ?? "stt-tts",
		transport: params.transport ?? "managed-room",
		brain: params.brain ?? "agent-consult",
		provider: params.provider
	});
	const record = {
		id,
		roomId,
		roomUrl: `/talk/rooms/${roomId}`,
		tokenHash: hashTalkHandoffToken(token),
		sessionKey: params.sessionKey,
		sessionId: params.sessionId,
		channel: params.channel,
		target: params.target,
		provider: params.provider,
		model: params.model,
		voice: params.voice,
		mode: params.mode ?? "stt-tts",
		transport: params.transport ?? "managed-room",
		brain: params.brain ?? "agent-consult",
		createdAt,
		expiresAt,
		room
	};
	appendTalkHandoffRoomEvent(record, {
		type: "session.started",
		payload: {
			handoffId: id,
			roomId
		}
	});
	handoffs.set(id, record);
	return {
		...toPublicTalkHandoffRecord(record),
		token
	};
}
/** Returns a non-expired handoff record for gateway-internal callers. */
function getTalkHandoff(id) {
	pruneExpiredTalkHandoffs();
	return handoffs.get(id);
}
/** Joins a managed room, replacing any previous active client for that room. */
function joinTalkHandoff(id, token, opts = {}) {
	const access = resolveTalkHandoffAccess(id, token);
	if (!access.ok) return access;
	const record = access.record;
	const previousClientId = record.room.activeClientId;
	const events = joinTalkHandoffRoom(record, opts.clientId);
	const replacedClientId = previousClientId && previousClientId !== opts.clientId ? previousClientId : void 0;
	const replacementEvents = replacedClientId ? events.filter((event) => event.type === "session.replaced") : [];
	const activeClientEvents = replacedClientId ? events.filter((event) => event.type !== "session.replaced") : events;
	return {
		ok: true,
		record: toPublicTalkHandoffRecord(record),
		events,
		replacedClientId,
		replacementEvents,
		activeClientEvents
	};
}
/** Starts a client turn in a joined managed room. */
function startTalkHandoffTurn(id, token, opts = {}) {
	const access = resolveTalkHandoffAccess(id, token);
	if (!access.ok) return access;
	const record = access.record;
	if (opts.clientId) record.room.activeClientId = opts.clientId;
	const turnId = normalizeOptionalString(opts.turnId) ?? randomUUID();
	const turn = record.room.talk.startTurn({
		turnId,
		payload: {
			handoffId: id,
			roomId: record.roomId,
			clientId: record.room.activeClientId
		}
	});
	return {
		ok: true,
		record: toPublicTalkHandoffRecord(record),
		turnId,
		events: turn.event ? [turn.event] : []
	};
}
/** Ends the active managed-room turn and returns the emitted Talk event. */
function endTalkHandoffTurn(id, token, opts = {}) {
	const access = resolveTalkHandoffAccess(id, token);
	if (!access.ok) return access;
	const record = access.record;
	const result = record.room.talk.endTurn({
		turnId: normalizeOptionalString(opts.turnId),
		payload: {
			handoffId: id,
			roomId: record.roomId
		}
	});
	if (!result.ok) return result;
	return {
		ok: true,
		record: toPublicTalkHandoffRecord(record),
		turnId: result.turnId,
		events: [result.event]
	};
}
/** Cancels the active managed-room turn with a client-visible reason. */
function cancelTalkHandoffTurn(id, token, opts = {}) {
	const access = resolveTalkHandoffAccess(id, token);
	if (!access.ok) return access;
	const record = access.record;
	const result = record.room.talk.cancelTurn({
		turnId: normalizeOptionalString(opts.turnId),
		payload: {
			handoffId: id,
			roomId: record.roomId,
			reason: opts.reason ?? "client-cancelled"
		}
	});
	if (!result.ok) return result;
	return {
		ok: true,
		record: toPublicTalkHandoffRecord(record),
		turnId: result.turnId,
		events: [result.event]
	};
}
/** Revokes a handoff and emits the final room-close event if it existed. */
function revokeTalkHandoff(id) {
	pruneExpiredTalkHandoffs();
	const record = handoffs.get(id);
	if (!record) return {
		revoked: false,
		events: []
	};
	const event = appendTalkHandoffRoomEvent(record, {
		type: "session.closed",
		payload: {
			reason: "revoked",
			handoffId: id,
			roomId: record.roomId
		},
		final: true
	});
	handoffs.delete(id);
	return {
		revoked: true,
		roomId: record.roomId,
		activeClientId: record.room.activeClientId,
		events: [event]
	};
}
/** Verifies the caller token without exposing the stored token hash. */
function verifyTalkHandoffToken(record, token) {
	return record.tokenHash === hashTalkHandoffToken(token);
}
function normalizeTtlMs(value) {
	if (!Number.isFinite(value) || value === void 0) return DEFAULT_TALK_HANDOFF_TTL_MS;
	return Math.min(Math.max(Math.trunc(value), 1e3), MAX_TALK_HANDOFF_TTL_MS);
}
function pruneExpiredTalkHandoffs(now = Date.now()) {
	const validNow = asDateTimestampMs(now);
	if (validNow === void 0) return;
	for (const [id, record] of handoffs) if (!isFutureDateTimestampMs(record.expiresAt, { nowMs: validNow })) {
		appendTalkHandoffRoomEvent(record, {
			type: "session.closed",
			payload: {
				reason: "expired",
				handoffId: id,
				roomId: record.roomId
			},
			final: true
		});
		handoffs.delete(id);
	}
}
function hashTalkHandoffToken(token) {
	return sha256Base64Url(token);
}
function toPublicTalkHandoffRecord(record) {
	const { tokenHash: _tokenHash, room: _room, ...publicRecord } = record;
	return {
		...publicRecord,
		room: {
			activeClientId: record.room.activeClientId,
			activeTurnId: record.room.talk.activeTurnId,
			recentTalkEvents: [...record.room.talk.recentEvents]
		}
	};
}
function createTalkHandoffRoom(params) {
	return { talk: createTalkSessionController({
		sessionId: params.roomId,
		mode: params.mode,
		transport: params.transport,
		brain: params.brain,
		provider: params.provider
	}, { onEvent: recordTalkObservabilityEvent }) };
}
function resolveTalkHandoffAccess(id, token) {
	const record = handoffs.get(id);
	if (!record) return {
		ok: false,
		reason: "not_found"
	};
	if (!isFutureDateTimestampMs(record.expiresAt)) {
		appendTalkHandoffRoomEvent(record, {
			type: "session.closed",
			payload: {
				reason: "expired",
				handoffId: id,
				roomId: record.roomId
			},
			final: true
		});
		handoffs.delete(id);
		return {
			ok: false,
			reason: "expired"
		};
	}
	if (!verifyTalkHandoffToken(record, token)) return {
		ok: false,
		reason: "invalid_token"
	};
	return {
		ok: true,
		record
	};
}
function appendTalkHandoffRoomEvent(record, input) {
	return record.room.talk.emit(input);
}
function joinTalkHandoffRoom(record, clientId) {
	const events = [];
	if (record.room.activeClientId && record.room.activeClientId !== clientId) events.push(appendTalkHandoffRoomEvent(record, {
		type: "session.replaced",
		payload: {
			handoffId: record.id,
			roomId: record.roomId,
			previousClientId: record.room.activeClientId,
			nextClientId: clientId
		}
	}));
	record.room.activeClientId = clientId;
	events.push(appendTalkHandoffRoomEvent(record, {
		type: "session.ready",
		payload: {
			handoffId: record.id,
			roomId: record.roomId,
			clientId
		}
	}));
	return events;
}
//#endregion
//#region src/gateway/server-methods/talk-session-mark.ts
const acknowledgeTalkSessionMark = ({ params, respond, client }) => {
	if (!assertValidParams(params, validateTalkSessionAcknowledgeMarkParams, "talk.session.acknowledgeMark", respond)) return;
	try {
		const session = getUnifiedTalkSession(params.sessionId);
		if (session.kind !== "realtime-relay") {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "talk.session.acknowledgeMark requires realtime relay"));
			return;
		}
		acknowledgeTalkRealtimeRelayMark({
			relaySessionId: session.relaySessionId,
			connId: requireUnifiedTalkSessionConn(session, client?.connId),
			markName: params.markName
		});
		respond(true, { ok: true }, void 0);
	} catch (error) {
		const message = formatForLog(error);
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, message, { details: { talkIssue: {
			code: "realtime_unavailable",
			message,
			phase: "request"
		} } }));
	}
};
//#endregion
//#region src/gateway/server-methods/talk-session.ts
function isActiveManagedRoomClient(session, connId) {
	if (!connId) return false;
	return getTalkHandoff(session.handoffId)?.room.activeClientId === connId;
}
function canCloseManagedRoomSession(session, connId) {
	const handoff = getTalkHandoff(session.handoffId);
	return !handoff?.room.activeClientId || handoff.room.activeClientId === connId;
}
function canCreateUnscopedManagedRoomSession(client) {
	return client?.connect?.scopes?.includes(ADMIN_SCOPE) === true;
}
function managedRoomOwnershipError(action) {
	return errorShape(ErrorCodes.INVALID_REQUEST, `talk.session.${action} requires the active managed-room connection`);
}
function respondInvalidRequest(respond, message) {
	respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, message));
}
function respondUnavailable(respond, err) {
	const message = formatForLog(err);
	respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, message, { details: { talkIssue: {
		code: "realtime_unavailable",
		message,
		phase: "request"
	} } }));
}
function respondOk(respond, payload = { ok: true }) {
	respond(true, payload, void 0);
}
function respondManagedRoomTurn(params) {
	if (params.session.kind !== "managed-room") {
		respondInvalidRequest(params.respond, `${params.method} requires managed-room`);
		return;
	}
	if (!isActiveManagedRoomClient(params.session, params.connId)) {
		params.respond(false, void 0, managedRoomOwnershipError(params.ownershipAction));
		return;
	}
	const result = params.run(params.session);
	if (!result.ok) {
		params.respond(false, void 0, errorShape(talkHandoffErrorCode(result.reason), `talk turn ${params.failureVerb} failed: ${result.reason}`));
		return;
	}
	broadcastTalkRoomEvents(params.context, result.record.room.activeClientId, {
		handoffId: result.record.id,
		roomId: result.record.roomId,
		events: result.events
	});
	respondOk(params.respond, {
		ok: true,
		turnId: result.turnId,
		events: result.events
	});
}
/** RPC handlers for gateway-managed Talk sessions and room lifecycle. */
const talkSessionHandlers = {
	"talk.session.create": async ({ params, respond, context, client }) => {
		if (!assertValidParams(params, validateTalkSessionCreateParams, "talk.session.create", respond)) return;
		const mode = normalizeTalkSessionMode(params);
		const transport = normalizeTalkSessionTransport({
			mode,
			transport: params.transport
		});
		const brain = normalizeTalkSessionBrain({
			mode,
			brain: params.brain
		});
		if (transport === "webrtc" || transport === "provider-websocket") {
			respondInvalidRequest(respond, `talk.session.create is Gateway-managed; use talk.client.create for client transport "${transport}"`);
			return;
		}
		try {
			if (transport === "managed-room") {
				if (brain === "direct-tools" && !canUseTalkDirectTools(client)) {
					respondInvalidRequest(respond, `talk.session.create brain="direct-tools" requires gateway scope: ${ADMIN_SCOPE}`);
					return;
				}
				const spawnedBy = normalizeOptionalString(params.spawnedBy);
				if (normalizeOptionalString(params.sessionKey) && !spawnedBy && !canCreateUnscopedManagedRoomSession(client)) {
					respondInvalidRequest(respond, `talk.session.create managed-room sessionKey requires spawnedBy or gateway scope: ${ADMIN_SCOPE}`);
					return;
				}
				const resolvedSession = await resolveSessionKeyFromResolveParams({
					cfg: context.getRuntimeConfig(),
					p: {
						key: params.sessionKey,
						...spawnedBy ? { spawnedBy } : {},
						includeGlobal: true,
						includeUnknown: true
					}
				});
				if (!resolvedSession.ok) {
					respond(false, void 0, resolvedSession.error);
					return;
				}
				if ("missing" in resolvedSession) {
					respondInvalidRequest(respond, `No session found: ${params.sessionKey}`);
					return;
				}
				const handoff = createTalkHandoff({
					sessionKey: resolvedSession.key,
					provider: normalizeOptionalString(params.provider),
					model: normalizeOptionalString(params.model),
					voice: normalizeOptionalString(params.voice),
					mode,
					transport,
					brain,
					ttlMs: params.ttlMs
				});
				rememberUnifiedTalkSession(handoff.id, {
					kind: "managed-room",
					handoffId: handoff.id,
					token: handoff.token,
					roomId: handoff.roomId
				});
				return respondOk(respond, {
					sessionId: handoff.id,
					provider: handoff.provider,
					mode: handoff.mode,
					transport: handoff.transport,
					brain: handoff.brain,
					handoffId: handoff.id,
					roomId: handoff.roomId,
					roomUrl: handoff.roomUrl,
					token: handoff.token,
					model: handoff.model,
					voice: handoff.voice,
					expiresAt: handoff.expiresAt
				});
			}
			const connId = client?.connId;
			if (!connId) {
				respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "Talk session unavailable"));
				return;
			}
			if (mode === "realtime") {
				if (transport !== "gateway-relay" || brain !== "agent-consult") return respondInvalidRequest(respond, `realtime talk.session.create requires transport="gateway-relay" and brain="agent-consult"`);
				const runtimeConfig = context.getRuntimeConfig();
				const realtimeConfig = buildTalkRealtimeConfig(runtimeConfig, params.provider);
				const launchOptions = buildRealtimeVoiceLaunchOptions({
					requested: params,
					defaults: realtimeConfig
				});
				const agentId = resolveTalkSessionAgentId(runtimeConfig, params.sessionKey);
				const resolution = resolveConfiguredRealtimeVoiceProvider({
					configuredProviderId: realtimeConfig.provider,
					providerConfigs: realtimeConfig.providers,
					providerConfigOverrides: launchOptions.model ? { model: launchOptions.model } : {},
					cfg: runtimeConfig,
					agentId,
					defaultModel: realtimeConfig.model,
					surface: "gateway-relay"
				});
				const relayLaunch = resolveTalkRealtimeGatewayRelayLaunch({
					...resolution,
					cfg: runtimeConfig,
					launchOptions,
					consultRouting: realtimeConfig.consultRouting
				});
				if (relayLaunch.error) return respondInvalidRequest(respond, relayLaunch.error);
				const realtimeContext = await resolveTalkRealtimeProviderInstructions({
					config: runtimeConfig,
					agentId,
					configuredInstructions: realtimeConfig.instructions,
					sessionKey: params.sessionKey,
					requireSessionKeyForProfile: true,
					warn: (message) => context.logGateway.warn(`talk realtime context: ${message}`)
				});
				const sessionKey = realtimeContext.requestedSessionKey ?? buildAgentMainSessionKey({ agentId: realtimeContext.agentId });
				await ensureClientVoiceAgentSessionEntry({
					agentId: realtimeContext.agentId,
					sessionKey
				});
				const session = createTalkRealtimeRelaySession({
					context,
					connId,
					cfg: runtimeConfig,
					provider: resolution.provider,
					providerConfig: relayLaunch.providerConfig,
					instructions: buildRealtimeInstructions(realtimeContext.instructions),
					tools: [REALTIME_VOICE_AGENT_CONSULT_TOOL, REALTIME_VOICE_AGENT_CONTROL_TOOL],
					model: launchOptions.model,
					sessionKey,
					voice: launchOptions.voice,
					language: normalizeOptionalLowercaseString(params.language),
					forceAgentConsultOnFinalTranscript: relayLaunch.forceAgentConsultOnFinalTranscript
				});
				rememberUnifiedTalkSession(session.relaySessionId, {
					kind: "realtime-relay",
					connId,
					relaySessionId: session.relaySessionId
				});
				respondOk(respond, {
					...session,
					sessionId: session.relaySessionId,
					voiceSessionId: session.relaySessionId,
					mode,
					brain
				});
				return;
			}
			if (mode === "transcription") {
				if (transport !== "gateway-relay" || brain !== "none") {
					respondInvalidRequest(respond, `transcription talk.session.create requires transport="gateway-relay" and brain="none"`);
					return;
				}
				const runtimeConfig = context.getRuntimeConfig();
				const transcriptionConfig = buildTalkTranscriptionConfig(runtimeConfig, params.provider);
				const resolution = resolveConfiguredRealtimeTranscriptionProvider({
					config: runtimeConfig,
					configuredProviderId: transcriptionConfig.provider,
					providerConfigs: transcriptionConfig.providers,
					defaultModel: transcriptionConfig.model
				});
				const session = createTalkTranscriptionRelaySession({
					context,
					connId,
					provider: resolution.provider,
					providerConfig: resolution.providerConfig
				});
				rememberUnifiedTalkSession(session.transcriptionSessionId, {
					kind: "transcription-relay",
					connId,
					transcriptionSessionId: session.transcriptionSessionId
				});
				respondOk(respond, {
					...session,
					sessionId: session.transcriptionSessionId,
					brain
				});
				return;
			}
			respondInvalidRequest(respond, `stt-tts talk.session.create requires transport="managed-room"`);
		} catch (err) {
			respondUnavailable(respond, err);
		}
	},
	"talk.session.join": async ({ params, respond, client, context }) => {
		if (!assertValidParams(params, validateTalkSessionJoinParams, "talk.session.join", respond)) return;
		try {
			const session = getUnifiedTalkSession(params.sessionId);
			if (session.kind !== "managed-room") {
				respondInvalidRequest(respond, "talk.session.join requires a managed-room session");
				return;
			}
			const result = joinTalkHandoff(session.handoffId, params.token, { clientId: client?.connId });
			if (!result.ok) {
				respond(false, void 0, errorShape(result.reason === "invalid_token" ? ErrorCodes.INVALID_REQUEST : ErrorCodes.UNAVAILABLE, `talk session join failed: ${result.reason}`));
				return;
			}
			broadcastTalkRoomEvents(context, result.replacedClientId, {
				handoffId: result.record.id,
				roomId: result.record.roomId,
				events: result.replacementEvents
			});
			broadcastTalkRoomEvents(context, client?.connId, {
				handoffId: result.record.id,
				roomId: result.record.roomId,
				events: result.activeClientEvents
			});
			respondOk(respond, result.record);
		} catch (err) {
			respondUnavailable(respond, err);
		}
	},
	"talk.session.appendAudio": async ({ params, respond, client }) => {
		if (!assertValidParams(params, validateTalkSessionAppendAudioParams, "talk.session.appendAudio", respond)) return;
		try {
			const session = getUnifiedTalkSession(params.sessionId);
			if (session.kind === "realtime-relay") {
				const connId = requireUnifiedTalkSessionConn(session, client?.connId);
				sendTalkRealtimeRelayAudio({
					relaySessionId: session.relaySessionId,
					connId,
					audioBase64: params.audioBase64,
					timestamp: params.timestamp
				});
				respondOk(respond);
				return;
			}
			if (session.kind === "transcription-relay") {
				const connId = requireUnifiedTalkSessionConn(session, client?.connId);
				sendTalkTranscriptionRelayAudio({
					transcriptionSessionId: session.transcriptionSessionId,
					connId,
					audioBase64: params.audioBase64
				});
				respondOk(respond);
				return;
			}
			respondInvalidRequest(respond, "talk.session.appendAudio is not supported for managed-room sessions");
		} catch (err) {
			respondUnavailable(respond, err);
		}
	},
	"talk.session.startTurn": async ({ params, respond, client, context }) => {
		if (!assertValidParams(params, validateTalkSessionTurnParams, "talk.session.startTurn", respond)) return;
		try {
			respondManagedRoomTurn({
				session: getUnifiedTalkSession(params.sessionId),
				connId: client?.connId,
				context,
				respond,
				method: "talk.session.startTurn",
				ownershipAction: "startTurn",
				failureVerb: "start",
				run: (managedSession) => startTalkHandoffTurn(managedSession.handoffId, managedSession.token, {
					turnId: params.turnId,
					clientId: client?.connId
				})
			});
		} catch (err) {
			respondUnavailable(respond, err);
		}
	},
	"talk.session.endTurn": async ({ params, respond, client, context }) => {
		if (!assertValidParams(params, validateTalkSessionTurnParams, "talk.session.endTurn", respond)) return;
		try {
			respondManagedRoomTurn({
				session: getUnifiedTalkSession(params.sessionId),
				connId: client?.connId,
				context,
				respond,
				method: "talk.session.endTurn",
				ownershipAction: "endTurn",
				failureVerb: "end",
				run: (managedSession) => endTalkHandoffTurn(managedSession.handoffId, managedSession.token, { turnId: params.turnId })
			});
		} catch (err) {
			respondUnavailable(respond, err);
		}
	},
	"talk.session.cancelTurn": async ({ params, respond, client, context }) => {
		if (!assertValidParams(params, validateTalkSessionCancelTurnParams, "talk.session.cancelTurn", respond)) return;
		try {
			const session = getUnifiedTalkSession(params.sessionId);
			if (session.kind === "realtime-relay") {
				const connId = requireUnifiedTalkSessionConn(session, client?.connId);
				cancelTalkRealtimeRelayTurn({
					relaySessionId: session.relaySessionId,
					connId,
					reason: normalizeOptionalString(params.reason)
				});
				respondOk(respond);
				return;
			}
			if (session.kind === "transcription-relay") {
				const connId = requireUnifiedTalkSessionConn(session, client?.connId);
				cancelTalkTranscriptionRelayTurn({
					transcriptionSessionId: session.transcriptionSessionId,
					connId,
					reason: normalizeOptionalString(params.reason)
				});
				respondOk(respond);
				return;
			}
			respondManagedRoomTurn({
				session,
				connId: client?.connId,
				context,
				respond,
				method: "talk.session.cancelTurn",
				ownershipAction: "cancelTurn",
				failureVerb: "cancel",
				run: (managedSession) => cancelTalkHandoffTurn(managedSession.handoffId, managedSession.token, {
					turnId: params.turnId,
					reason: params.reason
				})
			});
		} catch (err) {
			respondUnavailable(respond, err);
		}
	},
	"talk.session.cancelOutput": async ({ params, respond, client }) => {
		if (!assertValidParams(params, validateTalkSessionCancelOutputParams, "talk.session.cancelOutput", respond)) return;
		try {
			const session = getUnifiedTalkSession(params.sessionId);
			if (session.kind !== "realtime-relay") {
				respondInvalidRequest(respond, "talk.session.cancelOutput requires realtime relay");
				return;
			}
			const connId = requireUnifiedTalkSessionConn(session, client?.connId);
			cancelTalkRealtimeRelayTurn({
				relaySessionId: session.relaySessionId,
				connId,
				reason: normalizeOptionalString(params.reason) ?? "output-cancelled"
			});
			respondOk(respond);
		} catch (err) {
			respondUnavailable(respond, err);
		}
	},
	"talk.session.acknowledgeMark": acknowledgeTalkSessionMark,
	"talk.session.submitToolResult": async ({ params, respond, client }) => {
		if (!assertValidParams(params, validateTalkSessionSubmitToolResultParams, "talk.session.submitToolResult", respond)) return;
		try {
			const session = getUnifiedTalkSession(params.sessionId);
			if (session.kind !== "realtime-relay") {
				respondInvalidRequest(respond, "talk.session.submitToolResult is only supported for realtime relay sessions");
				return;
			}
			const connId = requireUnifiedTalkSessionConn(session, client?.connId);
			await submitTalkRealtimeRelayToolResult({
				relaySessionId: session.relaySessionId,
				connId,
				callId: params.callId,
				result: params.result,
				options: params.options
			});
			respondOk(respond);
		} catch (err) {
			respondUnavailable(respond, err);
		}
	},
	"talk.session.steer": async ({ params, respond, client }) => {
		if (!assertValidParams(params, validateTalkSessionSteerParams, "talk.session.steer", respond)) return;
		try {
			const session = getUnifiedTalkSession(params.sessionId);
			if (session.kind === "realtime-relay") {
				const connId = requireUnifiedTalkSessionConn(session, client?.connId);
				respondOk(respond, await steerTalkRealtimeRelayAgentRun({
					relaySessionId: session.relaySessionId,
					connId,
					sessionKey: normalizeOptionalString(params.sessionKey),
					text: params.text,
					mode: normalizeOptionalString(params.mode)
				}));
				return;
			}
			if (session.kind === "transcription-relay") {
				respondInvalidRequest(respond, "talk.session.steer requires an agent-backed Talk session");
				return;
			}
			if (!isActiveManagedRoomClient(session, client?.connId)) {
				respond(false, void 0, managedRoomOwnershipError("steer"));
				return;
			}
			const handoff = getTalkHandoff(session.handoffId);
			const sessionKey = handoff?.sessionKey;
			if (!sessionKey) {
				respondInvalidRequest(respond, "talk.session.steer requires a session key");
				return;
			}
			const requestedSessionKey = normalizeOptionalString(params.sessionKey);
			if (requestedSessionKey && requestedSessionKey !== sessionKey) {
				respondInvalidRequest(respond, "talk.session.steer sessionKey does not match the managed-room session");
				return;
			}
			respondOk(respond, await controlRealtimeVoiceAgentRun({
				sessionKey,
				text: params.text,
				mode: params.mode,
				recentEvents: handoff?.room.talk.recentEvents
			}));
		} catch (err) {
			respondUnavailable(respond, err);
		}
	},
	"talk.session.close": async ({ params, respond, client, context }) => {
		if (!assertValidParams(params, validateTalkSessionCloseParams, "talk.session.close", respond)) return;
		try {
			const session = getUnifiedTalkSession(params.sessionId);
			if (session.kind === "realtime-relay") {
				const connId = requireUnifiedTalkSessionConn(session, client?.connId);
				stopTalkRealtimeRelaySession({
					relaySessionId: session.relaySessionId,
					connId
				});
			} else if (session.kind === "transcription-relay") {
				const connId = requireUnifiedTalkSessionConn(session, client?.connId);
				stopTalkTranscriptionRelaySession({
					transcriptionSessionId: session.transcriptionSessionId,
					connId
				});
			} else {
				if (!canCloseManagedRoomSession(session, client?.connId)) {
					respond(false, void 0, managedRoomOwnershipError("close"));
					return;
				}
				const result = revokeTalkHandoff(session.handoffId);
				broadcastTalkRoomEvents(context, result.activeClientId, {
					handoffId: session.handoffId,
					roomId: session.roomId,
					events: result.events
				});
			}
			forgetUnifiedTalkSession(params.sessionId);
			respondOk(respond);
		} catch (err) {
			respondUnavailable(respond, err);
		}
	}
};
//#endregion
//#region src/gateway/server-methods/talk.ts
function resolveCatalogProviderSelection(configuredProvider, resolveAutomaticProvider) {
	try {
		return {
			activeProvider: resolveAutomaticProvider(),
			ready: true
		};
	} catch {
		return {
			...configuredProvider ? { activeProvider: configuredProvider } : {},
			ready: false
		};
	}
}
function canReadTalkSecrets(client) {
	const scopes = Array.isArray(client?.connect?.scopes) ? client.connect.scopes : [];
	return scopes.includes("operator.admin") || scopes.includes("operator.talk.secrets");
}
function asStringRecord(value) {
	const record = asOptionalRecord(value);
	if (!record) return;
	const next = {};
	for (const [key, entryValue] of Object.entries(record)) if (typeof entryValue === "string") next[key] = entryValue;
	return Object.keys(next).length > 0 ? next : void 0;
}
function normalizeAliasKey(value) {
	return normalizeLowercaseStringOrEmpty(value);
}
function resolveTalkVoiceId(providerConfig, requested) {
	if (!requested) return;
	const aliases = asStringRecord(providerConfig.voiceAliases);
	if (!aliases) return requested;
	const normalizedRequested = normalizeAliasKey(requested);
	for (const [alias, voiceId] of Object.entries(aliases)) if (normalizeAliasKey(alias) === normalizedRequested) return voiceId;
	return requested;
}
function withTalkBaseTtsSpeakerSelectionCompat(baseTts) {
	const next = withSpeakerSelectionCompat(baseTts);
	const providers = asOptionalRecord(baseTts.providers);
	if (providers) next.providers = Object.fromEntries(Object.entries(providers).map(([providerId, providerConfig]) => [providerId, withSpeakerSelectionCompat(asOptionalRecord(providerConfig) ?? {})]));
	for (const [key, value] of Object.entries(baseTts)) {
		if (key === "providers") continue;
		const record = asOptionalRecord(value);
		if (record) next[key] = withSpeakerSelectionCompat(record);
	}
	return next;
}
function buildTalkTtsConfig(config) {
	const resolved = resolveActiveTalkProviderConfig(config.talk);
	const provider = canonicalizeSpeechProviderId(resolved?.provider, config);
	if (!resolved || !provider) return {
		error: "talk.speak unavailable: talk provider not configured",
		reason: "talk_unconfigured"
	};
	const speechProvider = getSpeechProvider(provider, config);
	if (!speechProvider) return {
		error: `talk.speak unavailable: speech provider "${provider}" does not support Talk mode`,
		reason: "talk_provider_unsupported"
	};
	const baseTts = withTalkBaseTtsSpeakerSelectionCompat(asOptionalRecord(config.tts) ?? {});
	const providerConfig = withSpeakerSelectionFallbackCompat(resolved.config);
	const resolvedProviderConfig = speechProvider.resolveTalkConfig?.({
		cfg: config,
		baseTtsConfig: baseTts,
		talkProviderConfig: providerConfig,
		timeoutMs: baseTts.timeoutMs ?? 3e4
	}) ?? providerConfig;
	const talkTts = {
		...baseTts,
		auto: "always",
		provider,
		providers: {
			...asOptionalRecord(baseTts.providers) ?? {},
			[provider]: resolvedProviderConfig
		}
	};
	return {
		provider,
		providerConfig,
		cfg: {
			...config,
			tts: talkTts
		}
	};
}
function buildTalkCatalog(config) {
	const ttsConfig = resolveTtsConfig(config);
	const activeSpeechProvider = canonicalizeSpeechProviderId(resolveActiveTalkProviderConfig(config.talk)?.provider, config);
	const transcriptionConfig = buildTalkTranscriptionConfig(config);
	const transcriptionSelection = resolveCatalogProviderSelection(canonicalizeRealtimeTranscriptionProviderId(transcriptionConfig.provider, config), () => resolveConfiguredRealtimeTranscriptionProvider({
		config,
		configuredProviderId: transcriptionConfig.provider,
		providerConfigs: transcriptionConfig.providers,
		defaultModel: transcriptionConfig.model
	}).provider.id);
	const activeTranscriptionProvider = transcriptionSelection.activeProvider;
	const realtimeConfig = buildTalkRealtimeConfig(config);
	const realtimeSurface = realtimeConfig.transport === "gateway-relay" ? "gateway-relay" : "browser-session";
	const realtimeAgentId = resolveTalkSessionAgentId(config);
	const realtimeModelOverride = realtimeConfig.model ? { providerConfigOverrides: { model: realtimeConfig.model } } : {};
	const realtimeSelection = resolveCatalogProviderSelection(canonicalizeRealtimeVoiceProviderId(realtimeConfig.provider, config), () => resolveConfiguredRealtimeVoiceProvider({
		cfg: config,
		configuredProviderId: realtimeConfig.provider,
		providerConfigs: realtimeConfig.providers,
		...realtimeModelOverride,
		agentId: realtimeAgentId,
		defaultModel: realtimeConfig.model,
		surface: realtimeSurface
	}).provider.id);
	const activeRealtimeProvider = realtimeSelection.activeProvider;
	return {
		modes: [
			"realtime",
			"stt-tts",
			"transcription"
		],
		transports: [
			"webrtc",
			"provider-websocket",
			"gateway-relay",
			"managed-room"
		],
		brains: [
			"agent-consult",
			"direct-tools",
			"none"
		],
		speech: {
			...activeSpeechProvider ? { activeProvider: activeSpeechProvider } : {},
			providers: listSpeechProviders(config).map((provider) => {
				const entry = {
					id: provider.id,
					label: provider.label,
					configured: configuredOrFalse(() => provider.isConfigured({
						cfg: config,
						providerConfig: getResolvedSpeechProviderConfig(ttsConfig, provider.id, config),
						timeoutMs: ttsConfig.timeoutMs
					})),
					modes: ["stt-tts"],
					brains: ["agent-consult"]
				};
				if (provider.models) entry.models = [...provider.models];
				if (provider.aliases?.length) entry.aliases = [...provider.aliases];
				if (provider.voices) entry.voices = [...provider.voices];
				return entry;
			})
		},
		transcription: {
			ready: transcriptionSelection.ready,
			...activeTranscriptionProvider ? { activeProvider: activeTranscriptionProvider } : {},
			providers: listTalkTranscriptionProviders(config, [transcriptionConfig.provider, ...Object.keys(transcriptionConfig.providers)]).map((provider) => {
				const rawConfig = getVoiceProviderConfig({
					providerConfigs: transcriptionConfig.providers,
					provider,
					configuredProviderId: activeTranscriptionProvider && normalizeOptionalLowercaseString(provider.id) === normalizeOptionalLowercaseString(activeTranscriptionProvider) ? transcriptionConfig.provider : void 0
				});
				const rawConfigWithModel = transcriptionConfig.model && rawConfig.model === void 0 ? {
					...rawConfig,
					model: transcriptionConfig.model
				} : rawConfig;
				const providerConfig = provider.resolveConfig?.({
					cfg: config,
					rawConfig: rawConfigWithModel
				}) ?? rawConfigWithModel;
				const entry = {
					id: provider.id,
					label: provider.label,
					configured: configuredOrFalse(() => provider.isConfigured({
						cfg: config,
						providerConfig
					})),
					modes: ["transcription"],
					transports: ["gateway-relay"],
					brains: ["none"]
				};
				if (provider.defaultModel) entry.defaultModel = provider.defaultModel;
				if (provider.aliases?.length) entry.aliases = [...provider.aliases];
				return entry;
			})
		},
		realtime: {
			ready: realtimeSelection.ready,
			...activeRealtimeProvider ? { activeProvider: activeRealtimeProvider } : {},
			providers: listRealtimeVoiceProviders(config).map((provider) => {
				const rawConfig = resolveProviderRawConfig({
					providerConfigs: realtimeConfig.providers ?? {},
					providerId: provider.id,
					configuredProviderId: provider.id === activeRealtimeProvider ? realtimeConfig.provider : void 0
				});
				const rawConfigWithModel = realtimeConfig.model ? {
					...rawConfig,
					model: realtimeConfig.model
				} : rawConfig;
				const providerConfig = provider.resolveConfig?.({
					cfg: config,
					rawConfig: rawConfigWithModel
				}) ?? rawConfigWithModel;
				const capabilities = resolveRealtimeVoiceProviderCapabilities({
					provider,
					providerConfig,
					cfg: config,
					surface: realtimeSurface
				});
				const entry = {
					id: provider.id,
					label: provider.label,
					configured: configuredOrFalse(() => isRealtimeVoiceProviderConfigured({
						provider,
						cfg: config,
						providerConfig,
						agentId: realtimeAgentId,
						surface: realtimeSurface
					})),
					modes: ["realtime"],
					brains: capabilities?.supportsToolCalls === false && capabilities.handlesAgentConsult !== true ? ["none"] : ["agent-consult"],
					supportsBrowserSession: Boolean(capabilities?.supportsBrowserSession ?? provider.createBrowserSession)
				};
				if (provider.defaultModel) entry.defaultModel = provider.defaultModel;
				if (provider.models?.length) entry.models = [...provider.models];
				if (provider.voices?.length) entry.voices = [...provider.voices];
				if (provider.aliases?.length) entry.aliases = [...provider.aliases];
				if (capabilities?.transports) entry.transports = [...capabilities.transports];
				if (capabilities?.inputAudioFormats) entry.inputAudioFormats = capabilities.inputAudioFormats.map((format) => ({ ...format }));
				if (capabilities?.outputAudioFormats) entry.outputAudioFormats = capabilities.outputAudioFormats.map((format) => ({ ...format }));
				if (capabilities?.supportsBargeIn !== void 0) entry.supportsBargeIn = capabilities.supportsBargeIn;
				if (capabilities?.supportsToolCalls !== void 0) entry.supportsToolCalls = capabilities.supportsToolCalls;
				if (capabilities?.supportsVideoFrames !== void 0) entry.supportsVideoFrames = capabilities.supportsVideoFrames;
				if (capabilities?.supportsSessionResumption !== void 0) entry.supportsSessionResumption = capabilities.supportsSessionResumption;
				return entry;
			})
		}
	};
}
function isFallbackEligibleTalkReason(reason) {
	return reason === "talk_unconfigured" || reason === "talk_provider_unsupported" || reason === "method_unavailable";
}
function talkSpeakError(reason, message) {
	const details = {
		reason,
		fallbackEligible: isFallbackEligibleTalkReason(reason)
	};
	return errorShape(ErrorCodes.UNAVAILABLE, message, { details });
}
function resolveTalkSpeed(params) {
	if (typeof params.speed === "number") return params.speed;
	if (typeof params.rateWpm !== "number" || params.rateWpm <= 0) return;
	const resolved = params.rateWpm / 175;
	if (resolved <= .5 || resolved >= 2) return;
	return resolved;
}
function buildTalkSpeakOverrides(provider, providerConfig, config, params) {
	const speechProvider = getSpeechProvider(provider, config);
	if (!speechProvider?.resolveTalkOverrides) return { provider };
	const resolvedSpeed = resolveTalkSpeed(params);
	const resolvedVoiceId = resolveTalkVoiceId(providerConfig, normalizeOptionalString(params.voiceId));
	const providerOverrides = speechProvider.resolveTalkOverrides({
		talkProviderConfig: providerConfig,
		params: {
			...params,
			...resolvedVoiceId == null ? {} : { voiceId: resolvedVoiceId },
			...resolvedSpeed == null ? {} : { speed: resolvedSpeed }
		}
	});
	if (!providerOverrides || Object.keys(providerOverrides).length === 0) return { provider };
	return {
		provider,
		providerOverrides: { [provider]: providerOverrides }
	};
}
async function resolveTalkResponseFromConfig(params) {
	const normalizedTalk = normalizeTalkSection(params.sourceConfig.talk);
	const configuredPayload = normalizedTalk ? buildTalkConfigResponse(normalizedTalk) : void 0;
	const runtimeRealtime = buildTalkRealtimeConfig(params.runtimeConfig);
	const effectiveProvider = canonicalizeRealtimeVoiceProviderId(runtimeRealtime.provider, params.runtimeConfig);
	const sourceRealtime = buildTalkRealtimeConfig(params.sourceConfig, effectiveProvider);
	const sourceProviders = {};
	for (const [providerId, providerConfig] of Object.entries(sourceRealtime.providers)) {
		const canonicalProviderId = canonicalizeRealtimeVoiceProviderId(providerId, params.runtimeConfig) ?? providerId;
		sourceProviders[canonicalProviderId] = {
			...sourceProviders[canonicalProviderId],
			...providerConfig
		};
	}
	const effectiveRealtime = normalizeTalkSection({ realtime: {
		...effectiveProvider ? { provider: effectiveProvider } : {},
		...runtimeRealtime.model ? { model: runtimeRealtime.model } : {},
		...runtimeRealtime.transport ? { transport: runtimeRealtime.transport } : {},
		...Object.keys(sourceProviders).length > 0 ? { providers: sourceProviders } : {}
	} })?.realtime;
	if (!configuredPayload && !effectiveRealtime) return;
	const realtime = effectiveRealtime ? {
		...configuredPayload?.realtime,
		...effectiveRealtime
	} : configuredPayload?.realtime;
	const sourcePayload = {
		...configuredPayload,
		...realtime ? { realtime } : {}
	};
	const payload = params.includeSecrets ? projectTalkSourcePayloadForSecrets(sourcePayload) : sourcePayload;
	const sourceResolved = resolveActiveTalkProviderConfig(normalizedTalk);
	const runtimeResolved = resolveActiveTalkProviderConfig(params.runtimeConfig.talk);
	const provider = canonicalizeSpeechProviderId(sourceResolved?.provider ?? runtimeResolved?.provider, params.runtimeConfig);
	if (!provider) return payload;
	const speechProvider = getSpeechProvider(provider, params.runtimeConfig);
	const sourceBaseTts = withTalkBaseTtsSpeakerSelectionCompat(asOptionalRecord(params.sourceConfig.tts) ?? {});
	const runtimeBaseTts = withTalkBaseTtsSpeakerSelectionCompat(asOptionalRecord(params.runtimeConfig.tts) ?? {});
	const sourceProviderConfig = withSpeakerSelectionFallbackCompat(sourceResolved?.config);
	const runtimeProviderConfig = withSpeakerSelectionFallbackCompat(runtimeResolved?.config);
	const selectedBaseTts = Object.keys(runtimeBaseTts).length > 0 ? runtimeBaseTts : stripUnresolvedSecretApiKeysFromBaseTtsProviders(sourceBaseTts);
	const providerInputConfig = await resolveTalkProviderInputConfig({
		includeSecrets: params.includeSecrets,
		config: params.runtimeConfig,
		providerConfig: Object.keys(runtimeProviderConfig).length > 0 ? runtimeProviderConfig : sourceProviderConfig,
		provider
	});
	const resolvedConfig = speechProvider?.resolveTalkConfig?.({
		cfg: params.runtimeConfig,
		baseTtsConfig: selectedBaseTts,
		talkProviderConfig: providerInputConfig,
		timeoutMs: typeof selectedBaseTts.timeoutMs === "number" ? selectedBaseTts.timeoutMs : 3e4
	}) ?? providerInputConfig;
	const responseConfig = projectTalkResolvedProviderConfig({
		includeSecrets: params.includeSecrets,
		sourceProviderConfig,
		resolvedConfig
	});
	return {
		...payload,
		provider,
		resolved: {
			provider,
			config: responseConfig
		}
	};
}
function projectTalkResolvedProviderConfig(params) {
	if (!params.includeSecrets) return params.sourceProviderConfig.apiKey === void 0 ? params.resolvedConfig : {
		...params.resolvedConfig,
		apiKey: params.sourceProviderConfig.apiKey
	};
	const projected = redactConfigObject(params.resolvedConfig);
	const apiKey = normalizeOptionalString(params.resolvedConfig.apiKey);
	return apiKey === void 0 ? projected : {
		...projected,
		apiKey
	};
}
function projectTalkSourceProviderConfigForSecrets(config) {
	const projected = redactConfigObject(config);
	if (config.apiKey === void 0 || typeof config.apiKey === "string") return projected;
	return {
		...projected,
		apiKey: config.apiKey
	};
}
function projectTalkSourceProviderMapForSecrets(providers) {
	if (!providers) return;
	return Object.fromEntries(Object.entries(providers).map(([providerId, providerConfig]) => [providerId, projectTalkSourceProviderConfigForSecrets(providerConfig)]));
}
function projectTalkRealtimeForSecrets(realtime) {
	const projected = redactConfigObject(realtime);
	const providers = projectTalkSourceProviderMapForSecrets(realtime.providers);
	return providers ? {
		...projected,
		providers
	} : projected;
}
function projectTalkSourcePayloadForSecrets(payload) {
	const projected = redactConfigObject(payload);
	const providers = projectTalkSourceProviderMapForSecrets(payload.providers);
	if (providers) projected.providers = providers;
	if (payload.realtime) projected.realtime = projectTalkRealtimeForSecrets(payload.realtime);
	return projected;
}
async function resolveTalkProviderInputConfig(params) {
	const strippedConfig = stripUnresolvedSecretApiKey(params.providerConfig);
	if (!params.includeSecrets || params.providerConfig.apiKey === void 0) return strippedConfig;
	const resolved = await resolveConfiguredSecretInputString({
		config: params.config,
		env: process.env,
		value: params.providerConfig.apiKey,
		path: `talk.providers.${params.provider}.apiKey`
	});
	return resolved.value === void 0 ? strippedConfig : {
		...params.providerConfig,
		apiKey: resolved.value
	};
}
function stripUnresolvedSecretApiKey(config) {
	return stripUnresolvedSecretApiKeyFromRecord(config);
}
function stripUnresolvedSecretApiKeysFromBaseTtsProviders(base) {
	const providers = asOptionalRecord(base.providers);
	if (!providers) return base;
	let mutated = false;
	const cleaned = Object.create(null);
	for (const [providerId, providerConfig] of Object.entries(providers)) {
		const cfg = asOptionalRecord(providerConfig);
		if (!cfg) {
			cleaned[providerId] = providerConfig;
			continue;
		}
		const next = stripUnresolvedSecretApiKeyFromRecord(cfg);
		if (next !== cfg) mutated = true;
		cleaned[providerId] = next;
	}
	if (!mutated) return base;
	return {
		...base,
		providers: cleaned
	};
}
function stripUnresolvedSecretApiKeyFromRecord(config) {
	if (config.apiKey === void 0 || typeof config.apiKey === "string") return config;
	const { apiKey: _omit, ...rest } = config;
	return rest;
}
/** Gateway request handlers for Talk config, catalog, mode, sessions, and speech. */
const talkHandlers = {
	...talkSessionHandlers,
	...talkClientHandlers,
	"talk.catalog": async ({ params, respond, context }) => {
		if (!assertValidParams(params ?? {}, validateTalkCatalogParams, "talk.catalog", respond)) return;
		try {
			respond(true, buildTalkCatalog(context.getRuntimeConfig()), void 0);
		} catch (err) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatForLog(err)));
		}
	},
	"talk.config": async ({ params, respond, client, context }) => {
		if (!assertValidParams(params, validateTalkConfigParams, "talk.config", respond)) return;
		const includeSecrets = Boolean(params.includeSecrets);
		if (includeSecrets && !canReadTalkSecrets(client)) {
			respond(false, void 0, missingScopeErrorShape({
				missingScope: TALK_SECRETS_SCOPE,
				requiredScopes: [READ_SCOPE, TALK_SECRETS_SCOPE]
			}));
			return;
		}
		const snapshot = await readConfigFileSnapshot();
		const runtimeConfig = context.getRuntimeConfig();
		const configPayload = {};
		const talk = await resolveTalkResponseFromConfig({
			includeSecrets,
			sourceConfig: snapshot.config,
			runtimeConfig
		});
		if (talk) configPayload.talk = includeSecrets ? talk : redactConfigObject(talk);
		const sessionMainKey = snapshot.config.session?.mainKey;
		if (typeof sessionMainKey === "string") configPayload.session = { mainKey: sessionMainKey };
		const seamColor = snapshot.config.ui?.seamColor;
		if (typeof seamColor === "string") configPayload.ui = { seamColor };
		respond(true, { config: configPayload }, void 0);
	},
	"talk.speak": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateTalkSpeakParams, "talk.speak", respond)) return;
		const typedParams = params;
		const text = normalizeOptionalString(typedParams.text);
		if (!text) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "talk.speak requires text"));
			return;
		}
		if (typedParams.speed == null && typedParams.rateWpm != null && resolveTalkSpeed(typedParams) == null) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `invalid talk.speak params: rateWpm must resolve to speed between 0.5 and 2.0`));
			return;
		}
		try {
			const runtimeConfig = context.getRuntimeConfig();
			const setup = buildTalkTtsConfig(runtimeConfig);
			if ("error" in setup) {
				respond(false, void 0, talkSpeakError(setup.reason, setup.error));
				return;
			}
			const overrides = buildTalkSpeakOverrides(setup.provider, setup.providerConfig, runtimeConfig, typedParams);
			const result = await synthesizeSpeech({
				text: isCodeHeavySpeechText(text) ? CODE_HEAVY_SPOKEN_FALLBACK : text,
				cfg: setup.cfg,
				overrides,
				disableFallback: true
			});
			if (!result.success || !result.audioBuffer) {
				respond(false, void 0, talkSpeakError("synthesis_failed", result.error ?? "talk synthesis failed"));
				return;
			}
			if ((result.provider ?? setup.provider).trim().length === 0) {
				respond(false, void 0, talkSpeakError("invalid_audio_result", "talk synthesis returned empty provider"));
				return;
			}
			if (result.audioBuffer.length === 0) {
				respond(false, void 0, talkSpeakError("invalid_audio_result", "talk synthesis returned empty audio"));
				return;
			}
			respond(true, {
				audioBase64: result.audioBuffer.toString("base64"),
				provider: result.provider ?? setup.provider,
				outputFormat: result.outputFormat,
				voiceCompatible: result.voiceCompatible,
				mimeType: inferSpeechMimeType(result.outputFormat, result.fileExtension),
				fileExtension: result.fileExtension
			}, void 0);
		} catch (err) {
			respond(false, void 0, talkSpeakError("synthesis_failed", formatForLog(err)));
		}
	},
	"talk.mode": async ({ params, respond, context, client, isWebchatConnect }) => {
		if (client && isWebchatConnect(client.connect) && !await context.hasConnectedTalkNode()) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "talk disabled: no connected Talk-capable nodes"));
			return;
		}
		if (!assertValidParams(params, validateTalkModeParams, "talk.mode", respond)) return;
		const payload = {
			enabled: params.enabled,
			phase: params.phase ?? null,
			ts: Date.now()
		};
		context.broadcast("talk.mode", payload, { dropIfSlow: true });
		respond(true, payload, void 0);
	}
};
//#endregion
export { talkHandlers };
