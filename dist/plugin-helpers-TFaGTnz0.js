import { c as normalizeOptionalString$1, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import { A as resolvePositiveTimerTimeoutMs, a as addTimerTimeoutGraceMs } from "./number-coercion-Crk_c9KW.js";
import { a as asRecord } from "./record-coerce-DHZ4bFlT.js";
import { _ as uniqueStrings, a as normalizeOptionalTrimmedStringList } from "./string-normalization-CRyoFBPt.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as isBlockedHostnameOrIp } from "./ssrf-C889LYfv.js";
import { r as fetchWithSsrFGuard } from "./fetch-guard-CPWMHcWe.js";
import { m as readProviderJsonResponse } from "./provider-http-errors-Dm9G78mz.js";
import { t as startGatewayClientWhenEventLoopReady } from "./client-start-readiness-CnI4JKl7.js";
import { t as GatewayClient } from "./client-D7lmiXfo.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { p as readPositiveIntegerParam } from "./common-RkLs-2lL.js";
import { t as resolveTranscriptsConfig } from "./config-x4hDqrcf.js";
import "./error-runtime-Nqb-RQG4.js";
import "./number-runtime-C6TGSEc_.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import "./routing-BYqzCOl5.js";
import "./ssrf-runtime-B8V5-MiN.js";
import "./agent-runtime-DECiFwev.js";
import { n as callGatewayFromCli } from "./gateway-rpc-DDZpjK7K.js";
import "./gateway-runtime-BOoMLXP7.js";
import "./channel-actions-BCwQOL9z.js";
import "./provider-http-C8bsuM26.js";
import { C as resolveRealtimeVoiceAgentConsultToolPolicy, m as REALTIME_VOICE_AGENT_CONSULT_TOOL_NAME } from "./realtime-session-harness-bu55PsqP.js";
import "./realtime-voice-D6uheH7o.js";
import { A as startMeetingRealtimeEngine, D as createNodeMeetingRealtimeAudioTransport, E as MeetingSessionRuntime, O as createLocalMeetingRealtimeAudioTransport, T as createMeetingSession, a as joinMeetingViaVoiceCallGateway, b as openMeetingWithBrowser, c as addMeetingSetupCheck, d as createMeetingRealtimeEngineBindings, f as buildMeetingSoxAudioCommands, i as isMeetingVoiceCallMissingError, k as startMeetingAgentRealtimeEngine, l as createMeetingSetupStatus, n as endMeetingVoiceCallGatewayCall, o as speakMeetingViaVoiceCallGateway, r as getMeetingVoiceCallGatewayCall, s as MeetingPlatformAdapter, t as createMeetingVoiceCallGateway, v as leaveMeetingWithBrowser, w as resolveLocalMeetingBrowserRequest, x as recoverMeetingBrowserTab, y as readMeetingTranscriptWithBrowser } from "./meeting-runtime-DPLW1qww.js";
import "./transcripts-ClJqJaoQ.js";
import { t as googleApiError } from "./google-api-errors-D8Lo_qzW.js";
import { a as isRecoverableMeetTab, c as readMeetAuthUser, d as resolveChromeNodeInfo, f as GOOGLE_MEET_NODE_COMMAND, h as fetchGoogleMeetAttendance, i as isEnglishMeetTab, l as callBrowserProxyOnNode, m as fetchGoogleMeetArtifacts, n as isGoogleMeetBrowserManualActionError, o as isSameMeetUrlForReuse, r as forceMeetEnglishUi, s as normalizeMeetUrlForReuse, t as createMeetWithBrowserProxyOnNode, u as resolveChromeNode, v as fetchGoogleMeetSpace } from "./chrome-create-CfD75xSv.js";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
//#region extensions/google-meet/src/meet-url.ts
function normalizeOptionalString(value) {
	if (typeof value !== "string") return;
	return value.trim() || void 0;
}
function normalizeMeetUrl(input) {
	const raw = normalizeOptionalString(input);
	if (!raw) throw new Error("url required");
	let url;
	try {
		url = new URL(raw);
	} catch {
		throw new Error("url must be a valid Google Meet URL");
	}
	if (url.protocol !== "https:" || url.hostname.toLowerCase() !== "meet.google.com" || url.port || url.username || url.password) throw new Error("url must be an explicit https://meet.google.com/... URL");
	if (!/^\/[a-z]{3}-[a-z]{4}-[a-z]{3}(?:$|[/?#])/i.test(url.pathname)) throw new Error("url must include a Google Meet meeting code");
	return url.toString();
}
//#endregion
//#region extensions/google-meet/src/calendar.ts
const GOOGLE_CALENDAR_API_BASE_URL = "https://www.googleapis.com/calendar/v3";
const GOOGLE_CALENDAR_API_HOST = "www.googleapis.com";
const GOOGLE_CALENDAR_EVENTS_SCOPE = "https://www.googleapis.com/auth/calendar.events.readonly";
const GOOGLE_CALENDAR_REQUEST_TIMEOUT_MS = 3e4;
function appendQuery(url, query) {
	const parsed = new URL(url);
	for (const [key, value] of Object.entries(query)) if (value !== void 0) parsed.searchParams.set(key, String(value));
	return parsed.toString();
}
function normalizeGoogleMeetCalendarUri(value) {
	if (!value?.trim()) return;
	try {
		const url = new URL(value);
		if (url.protocol !== "http:" && url.protocol !== "https:") return;
		if (url.hostname.toLowerCase() !== "meet.google.com" || url.port || url.username || url.password) return;
		url.protocol = "https:";
		return normalizeMeetUrl(url.toString());
	} catch {
		return;
	}
}
function extractGoogleMeetUriFromText(value) {
	const matches = value?.matchAll(/https:\/\/meet\.google\.com\/[a-z0-9-]+/gi);
	for (const match of matches ?? []) {
		const uri = normalizeGoogleMeetCalendarUri(match[0]);
		if (uri) return uri;
	}
}
function findFirstGoogleMeetCalendarUri(entryPoints, predicate = () => true) {
	for (const entry of entryPoints) {
		if (!predicate(entry)) continue;
		const uri = normalizeGoogleMeetCalendarUri(entry.uri);
		if (uri) return uri;
	}
}
function extractGoogleMeetUriFromCalendarEvent(event) {
	const hangoutLink = normalizeGoogleMeetCalendarUri(event.hangoutLink);
	if (hangoutLink) return hangoutLink;
	const entryPoints = event.conferenceData?.entryPoints ?? [];
	const videoEntryUri = findFirstGoogleMeetCalendarUri(entryPoints, (entry) => entry.entryPointType === "video");
	if (videoEntryUri) return videoEntryUri;
	const meetEntryUri = findFirstGoogleMeetCalendarUri(entryPoints);
	if (meetEntryUri) return meetEntryUri;
	return extractGoogleMeetUriFromText(event.location) ?? extractGoogleMeetUriFromText(event.description);
}
function buildGoogleMeetCalendarDayWindow(now = /* @__PURE__ */ new Date()) {
	const start = new Date(now);
	start.setHours(0, 0, 0, 0);
	const end = new Date(start);
	end.setDate(start.getDate() + 1);
	return {
		timeMin: start.toISOString(),
		timeMax: end.toISOString()
	};
}
function parseCalendarEventTime(value) {
	const raw = value?.dateTime ?? value?.date;
	if (!raw) return;
	const parsed = Date.parse(raw);
	return Number.isFinite(parsed) ? parsed : void 0;
}
function rankCalendarEvent(event, nowMs) {
	const startMs = parseCalendarEventTime(event.start) ?? Number.POSITIVE_INFINITY;
	const endMs = parseCalendarEventTime(event.end) ?? startMs;
	if (startMs <= nowMs && endMs >= nowMs) return 0;
	if (startMs > nowMs) return startMs - nowMs;
	return nowMs - startMs + 720 * 60 * 60 * 1e3;
}
function chooseBestMeetCalendarEvent(events, now) {
	const nowMs = now.getTime();
	let selected;
	let selectedRank = Number.POSITIVE_INFINITY;
	for (const event of events) {
		if (event.status === "cancelled" || !extractGoogleMeetUriFromCalendarEvent(event)) continue;
		const rank = rankCalendarEvent(event, nowMs);
		if (!selected || rank < selectedRank) {
			selected = event;
			selectedRank = rank;
		}
	}
	return selected;
}
async function fetchGoogleCalendarEvents(params) {
	const calendarId = params.calendarId?.trim() || "primary";
	const now = params.now ?? /* @__PURE__ */ new Date();
	const defaultTimeMax = new Date(now);
	defaultTimeMax.setDate(defaultTimeMax.getDate() + 7);
	const { response, release } = await fetchWithSsrFGuard({
		url: appendQuery(`${GOOGLE_CALENDAR_API_BASE_URL}/calendars/${encodeURIComponent(calendarId)}/events`, {
			maxResults: params.maxResults ?? 50,
			orderBy: "startTime",
			q: params.eventQuery?.trim() || void 0,
			showDeleted: false,
			singleEvents: true,
			timeMin: params.timeMin ?? now.toISOString(),
			timeMax: params.timeMax ?? defaultTimeMax.toISOString()
		}),
		init: { headers: {
			Authorization: `Bearer ${params.accessToken}`,
			Accept: "application/json"
		} },
		policy: { allowedHostnames: [GOOGLE_CALENDAR_API_HOST] },
		auditContext: "google-meet.calendar.events.list",
		timeoutMs: GOOGLE_CALENDAR_REQUEST_TIMEOUT_MS
	});
	try {
		if (!response.ok) throw await googleApiError({
			response,
			prefix: "Google Calendar events.list",
			scopes: [GOOGLE_CALENDAR_EVENTS_SCOPE]
		});
		const payload = await readProviderJsonResponse(response, "Google Calendar events.list");
		if (payload.items !== void 0 && !Array.isArray(payload.items)) throw new Error("Google Calendar events.list response had non-array items");
		return {
			calendarId,
			events: payload.items ?? [],
			now
		};
	} finally {
		await release();
	}
}
async function listGoogleMeetCalendarEvents(params) {
	const { calendarId, events, now } = await fetchGoogleCalendarEvents(params);
	const best = chooseBestMeetCalendarEvent(events, now);
	return {
		calendarId,
		events: events.map((event) => {
			const meetingUri = extractGoogleMeetUriFromCalendarEvent(event);
			return meetingUri ? {
				event,
				meetingUri,
				selected: event === best
			} : void 0;
		}).filter((event) => Boolean(event))
	};
}
async function findGoogleMeetCalendarEvent(params) {
	const result = await listGoogleMeetCalendarEvents(params);
	const selected = result.events.find((event) => event.selected) ?? result.events[0];
	if (!selected) throw new Error("No Google Calendar event with a Google Meet link matched the query");
	return {
		calendarId: result.calendarId,
		event: selected.event,
		meetingUri: selected.meetingUri
	};
}
//#endregion
//#region extensions/google-meet/src/config.ts
function resolveGoogleMeetGatewayOperationTimeoutMs(config) {
	return Math.max(6e4, addTimerTimeoutGraceMs(config.chrome.joinTimeoutMs, 3e4) ?? 1, addTimerTimeoutGraceMs(config.voiceCall.requestTimeoutMs, 1e4) ?? 1);
}
const SOX_DEFAULT_BUFFER_BYTES = 8192;
const SOX_MIN_BUFFER_BYTES = 17;
const DEFAULT_GOOGLE_MEET_AUDIO_BUFFER_BYTES = SOX_DEFAULT_BUFFER_BYTES / 2;
const PLAIN_DECIMAL_NUMBER_RE = /^\d+(?:\.\d+)?$/;
function buildGoogleMeetSoxAudioCommands(format, bufferBytes) {
	return format === "g711-ulaw-8khz" ? buildMeetingSoxAudioCommands({
		bufferBytes,
		format: {
			sampleRate: 8e3,
			channels: 1,
			encoding: "mu-law",
			bits: 8
		}
	}) : buildMeetingSoxAudioCommands({
		bufferBytes,
		device: "BlackHole 2ch",
		deviceType: "coreaudio",
		format: {
			sampleRate: 24e3,
			channels: 1,
			encoding: "signed-integer",
			bits: 16,
			endian: "little"
		}
	});
}
const DEFAULT_GOOGLE_MEET_SOX_COMMANDS = buildGoogleMeetSoxAudioCommands("pcm16-24khz", DEFAULT_GOOGLE_MEET_AUDIO_BUFFER_BYTES);
const DEFAULT_GOOGLE_MEET_AUDIO_INPUT_COMMAND = DEFAULT_GOOGLE_MEET_SOX_COMMANDS.inputCommand;
const DEFAULT_GOOGLE_MEET_AUDIO_OUTPUT_COMMAND = DEFAULT_GOOGLE_MEET_SOX_COMMANDS.outputCommand;
const DEFAULT_GOOGLE_MEET_CHROME_AUDIO_FORMAT = "pcm16-24khz";
const DEFAULT_GOOGLE_MEET_BARGE_IN_RMS_THRESHOLD = 650;
const DEFAULT_GOOGLE_MEET_BARGE_IN_PEAK_THRESHOLD = 2500;
const DEFAULT_GOOGLE_MEET_BARGE_IN_COOLDOWN_MS = 900;
const DEFAULT_GOOGLE_MEET_REALTIME_INSTRUCTIONS = `You are joining a private Google Meet as an OpenClaw voice transport. Keep spoken replies brief and natural. In agent mode, wait for OpenClaw consult results and speak them exactly. In bidi mode, answer directly and call ${REALTIME_VOICE_AGENT_CONSULT_TOOL_NAME} for deeper reasoning, current information, or tools.`;
const DEFAULT_GOOGLE_MEET_REALTIME_INTRO_MESSAGE = "Say exactly: I'm here and listening.";
const DEFAULT_GOOGLE_MEET_CONFIG = {
	enabled: true,
	defaults: {},
	preview: { enrollmentAcknowledged: false },
	defaultTransport: "chrome",
	defaultMode: "agent",
	chrome: {
		audioBackend: "blackhole-2ch",
		audioFormat: DEFAULT_GOOGLE_MEET_CHROME_AUDIO_FORMAT,
		audioBufferBytes: DEFAULT_GOOGLE_MEET_AUDIO_BUFFER_BYTES,
		launch: true,
		guestName: "OpenClaw Agent",
		reuseExistingTab: true,
		autoJoin: true,
		joinTimeoutMs: 3e4,
		waitForInCallMs: 2e4,
		audioInputCommand: [...DEFAULT_GOOGLE_MEET_AUDIO_INPUT_COMMAND],
		audioOutputCommand: [...DEFAULT_GOOGLE_MEET_AUDIO_OUTPUT_COMMAND],
		bargeInRmsThreshold: DEFAULT_GOOGLE_MEET_BARGE_IN_RMS_THRESHOLD,
		bargeInPeakThreshold: DEFAULT_GOOGLE_MEET_BARGE_IN_PEAK_THRESHOLD,
		bargeInCooldownMs: DEFAULT_GOOGLE_MEET_BARGE_IN_COOLDOWN_MS
	},
	chromeNode: {},
	twilio: {},
	voiceCall: {
		enabled: true,
		requestTimeoutMs: 3e4,
		dtmfDelayMs: 12e3,
		postDtmfSpeechDelayMs: 5e3
	},
	realtime: {
		strategy: "agent",
		provider: "openai",
		transcriptionProvider: "openai",
		instructions: DEFAULT_GOOGLE_MEET_REALTIME_INSTRUCTIONS,
		introMessage: DEFAULT_GOOGLE_MEET_REALTIME_INTRO_MESSAGE,
		toolPolicy: "safe-read-only",
		providers: {}
	},
	oauth: {},
	auth: { provider: "google-oauth" }
};
const GOOGLE_MEET_CLIENT_ID_KEYS = ["OPENCLAW_GOOGLE_MEET_CLIENT_ID", "GOOGLE_MEET_CLIENT_ID"];
const GOOGLE_MEET_CLIENT_SECRET_KEYS = ["OPENCLAW_GOOGLE_MEET_CLIENT_SECRET", "GOOGLE_MEET_CLIENT_SECRET"];
const GOOGLE_MEET_REFRESH_TOKEN_KEYS = ["OPENCLAW_GOOGLE_MEET_REFRESH_TOKEN", "GOOGLE_MEET_REFRESH_TOKEN"];
const GOOGLE_MEET_ACCESS_TOKEN_KEYS = ["OPENCLAW_GOOGLE_MEET_ACCESS_TOKEN", "GOOGLE_MEET_ACCESS_TOKEN"];
const GOOGLE_MEET_ACCESS_TOKEN_EXPIRES_AT_KEYS = ["OPENCLAW_GOOGLE_MEET_ACCESS_TOKEN_EXPIRES_AT", "GOOGLE_MEET_ACCESS_TOKEN_EXPIRES_AT"];
const GOOGLE_MEET_DEFAULT_MEETING_KEYS = ["OPENCLAW_GOOGLE_MEET_DEFAULT_MEETING", "GOOGLE_MEET_DEFAULT_MEETING"];
const GOOGLE_MEET_PREVIEW_ACK_KEYS = ["OPENCLAW_GOOGLE_MEET_PREVIEW_ACK", "GOOGLE_MEET_PREVIEW_ACK"];
function resolveBoolean(value, fallback) {
	return typeof value === "boolean" ? value : fallback;
}
function resolveNumber(value, fallback) {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : fallback;
}
function resolveTimerConfigMs(value, fallback) {
	return resolvePositiveTimerTimeoutMs(resolveNumber(value, fallback), fallback);
}
function resolveOptionalNumber(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (typeof value === "string" && value.trim()) {
		const trimmed = value.trim();
		const parsed = PLAIN_DECIMAL_NUMBER_RE.test(trimmed) ? Number(trimmed) : NaN;
		return Number.isFinite(parsed) ? parsed : void 0;
	}
}
function readEnvString(env, keys) {
	for (const key of keys) {
		const value = normalizeOptionalString$1(env[key]);
		if (value) return value;
	}
}
function normalizeStringAllowEmpty(value) {
	return typeof value === "string" ? value.trim() : void 0;
}
function readEnvBoolean(env, keys) {
	const normalized = normalizeOptionalLowercaseString(readEnvString(env, keys));
	if (!normalized) return;
	if ([
		"1",
		"true",
		"yes",
		"on"
	].includes(normalized)) return true;
	if ([
		"0",
		"false",
		"no",
		"off"
	].includes(normalized)) return false;
}
function readEnvNumber(env, keys) {
	return resolveOptionalNumber(readEnvString(env, keys));
}
function resolveStringArray(value) {
	return normalizeOptionalTrimmedStringList(value);
}
function resolveProvidersConfig(value) {
	const raw = asRecord(value);
	const providers = {};
	for (const [key, entry] of Object.entries(raw)) {
		const providerId = normalizeOptionalLowercaseString(key);
		if (!providerId) continue;
		providers[providerId] = asRecord(entry);
	}
	return providers;
}
function resolveTransport$1(value, fallback) {
	const normalized = normalizeOptionalLowercaseString(value);
	return normalized === "chrome" || normalized === "chrome-node" || normalized === "twilio" ? normalized : fallback;
}
function resolveMode$1(value, fallback) {
	const normalized = normalizeOptionalLowercaseString(value);
	if (normalized === "realtime") return "agent";
	return normalized === "agent" || normalized === "bidi" || normalized === "transcribe" ? normalized : fallback;
}
function resolveRealtimeStrategy(value, fallback) {
	const normalized = normalizeOptionalLowercaseString(value);
	return normalized === "agent" || normalized === "bidi" ? normalized : fallback;
}
function resolveChromeAudioFormat(value) {
	switch (normalizeOptionalString$1(value)?.toLowerCase().replaceAll("_", "-")) {
		case "pcm16-24khz":
		case "pcm16-24k":
		case "pcm24":
		case "pcm": return "pcm16-24khz";
		case "g711-ulaw-8khz":
		case "g711-ulaw-8k":
		case "g711-ulaw":
		case "mulaw":
		case "mu-law": return "g711-ulaw-8khz";
		default: return;
	}
}
function resolveAudioBufferBytes(value, fallback) {
	const number = resolveNumber(value, fallback);
	if (!Number.isFinite(number) || number <= 0) return fallback;
	return Math.max(SOX_MIN_BUFFER_BYTES, Math.trunc(number));
}
function defaultAudioInputCommand(format, bufferBytes) {
	return buildGoogleMeetSoxAudioCommands(format, bufferBytes).inputCommand;
}
function defaultAudioOutputCommand(format, bufferBytes) {
	return buildGoogleMeetSoxAudioCommands(format, bufferBytes).outputCommand;
}
function resolveGoogleMeetConfig(input) {
	return resolveGoogleMeetConfigWithEnv(input);
}
function resolveGoogleMeetConfigWithEnv(input, env = process.env) {
	const raw = asRecord(input);
	const defaults = asRecord(raw.defaults);
	const preview = asRecord(raw.preview);
	const chrome = asRecord(raw.chrome);
	const configuredAudioInputCommand = resolveStringArray(chrome.audioInputCommand);
	const configuredAudioOutputCommand = resolveStringArray(chrome.audioOutputCommand);
	const hasCustomAudioCommand = configuredAudioInputCommand !== void 0 || configuredAudioOutputCommand !== void 0;
	const audioFormat = resolveChromeAudioFormat(chrome.audioFormat) ?? (hasCustomAudioCommand ? "g711-ulaw-8khz" : DEFAULT_GOOGLE_MEET_CONFIG.chrome.audioFormat);
	const audioBufferBytes = resolveAudioBufferBytes(chrome.audioBufferBytes, DEFAULT_GOOGLE_MEET_CONFIG.chrome.audioBufferBytes);
	const chromeNode = asRecord(raw.chromeNode);
	const twilio = asRecord(raw.twilio);
	const voiceCall = asRecord(raw.voiceCall);
	const realtime = asRecord(raw.realtime);
	const realtimeProvider = normalizeOptionalString$1(realtime.provider);
	const resolvedRealtimeProvider = realtimeProvider ?? DEFAULT_GOOGLE_MEET_CONFIG.realtime.provider;
	const oauth = asRecord(raw.oauth);
	const auth = asRecord(raw.auth);
	return {
		enabled: resolveBoolean(raw.enabled, DEFAULT_GOOGLE_MEET_CONFIG.enabled),
		defaults: { meeting: normalizeOptionalString$1(defaults.meeting) ?? readEnvString(env, GOOGLE_MEET_DEFAULT_MEETING_KEYS) },
		preview: { enrollmentAcknowledged: resolveBoolean(preview.enrollmentAcknowledged, readEnvBoolean(env, GOOGLE_MEET_PREVIEW_ACK_KEYS) ?? DEFAULT_GOOGLE_MEET_CONFIG.preview.enrollmentAcknowledged) },
		defaultTransport: resolveTransport$1(raw.defaultTransport, DEFAULT_GOOGLE_MEET_CONFIG.defaultTransport),
		defaultMode: resolveMode$1(raw.defaultMode, DEFAULT_GOOGLE_MEET_CONFIG.defaultMode),
		chrome: {
			audioBackend: "blackhole-2ch",
			audioFormat,
			audioBufferBytes,
			launch: resolveBoolean(chrome.launch, DEFAULT_GOOGLE_MEET_CONFIG.chrome.launch),
			browserProfile: normalizeOptionalString$1(chrome.browserProfile),
			guestName: normalizeOptionalString$1(chrome.guestName) ?? DEFAULT_GOOGLE_MEET_CONFIG.chrome.guestName,
			reuseExistingTab: resolveBoolean(chrome.reuseExistingTab, DEFAULT_GOOGLE_MEET_CONFIG.chrome.reuseExistingTab),
			autoJoin: resolveBoolean(chrome.autoJoin, DEFAULT_GOOGLE_MEET_CONFIG.chrome.autoJoin),
			joinTimeoutMs: resolveTimerConfigMs(chrome.joinTimeoutMs, DEFAULT_GOOGLE_MEET_CONFIG.chrome.joinTimeoutMs),
			waitForInCallMs: resolveTimerConfigMs(chrome.waitForInCallMs, DEFAULT_GOOGLE_MEET_CONFIG.chrome.waitForInCallMs),
			audioInputCommand: configuredAudioInputCommand ?? defaultAudioInputCommand(audioFormat, audioBufferBytes),
			audioOutputCommand: configuredAudioOutputCommand ?? defaultAudioOutputCommand(audioFormat, audioBufferBytes),
			bargeInInputCommand: resolveStringArray(chrome.bargeInInputCommand),
			bargeInRmsThreshold: resolveNumber(chrome.bargeInRmsThreshold, DEFAULT_GOOGLE_MEET_CONFIG.chrome.bargeInRmsThreshold),
			bargeInPeakThreshold: resolveNumber(chrome.bargeInPeakThreshold, DEFAULT_GOOGLE_MEET_CONFIG.chrome.bargeInPeakThreshold),
			bargeInCooldownMs: resolveTimerConfigMs(chrome.bargeInCooldownMs, DEFAULT_GOOGLE_MEET_CONFIG.chrome.bargeInCooldownMs),
			audioBridgeCommand: resolveStringArray(chrome.audioBridgeCommand),
			audioBridgeHealthCommand: resolveStringArray(chrome.audioBridgeHealthCommand)
		},
		chromeNode: { node: normalizeOptionalString$1(chromeNode.node) },
		twilio: {
			defaultDialInNumber: normalizeOptionalString$1(twilio.defaultDialInNumber),
			defaultPin: normalizeOptionalString$1(twilio.defaultPin),
			defaultDtmfSequence: normalizeOptionalString$1(twilio.defaultDtmfSequence)
		},
		voiceCall: {
			enabled: resolveBoolean(voiceCall.enabled, DEFAULT_GOOGLE_MEET_CONFIG.voiceCall.enabled),
			gatewayUrl: normalizeOptionalString$1(voiceCall.gatewayUrl),
			token: normalizeOptionalString$1(voiceCall.token),
			requestTimeoutMs: resolveTimerConfigMs(voiceCall.requestTimeoutMs, DEFAULT_GOOGLE_MEET_CONFIG.voiceCall.requestTimeoutMs),
			dtmfDelayMs: resolveTimerConfigMs(voiceCall.dtmfDelayMs, DEFAULT_GOOGLE_MEET_CONFIG.voiceCall.dtmfDelayMs),
			postDtmfSpeechDelayMs: resolveTimerConfigMs(voiceCall.postDtmfSpeechDelayMs, DEFAULT_GOOGLE_MEET_CONFIG.voiceCall.postDtmfSpeechDelayMs),
			introMessage: normalizeOptionalString$1(voiceCall.introMessage)
		},
		realtime: {
			strategy: resolveRealtimeStrategy(realtime.strategy, DEFAULT_GOOGLE_MEET_CONFIG.realtime.strategy),
			provider: resolvedRealtimeProvider,
			transcriptionProvider: normalizeOptionalString$1(realtime.transcriptionProvider) ?? (realtimeProvider && realtimeProvider !== "google" ? resolvedRealtimeProvider : DEFAULT_GOOGLE_MEET_CONFIG.realtime.transcriptionProvider),
			voiceProvider: normalizeOptionalString$1(realtime.voiceProvider),
			model: normalizeOptionalString$1(realtime.model) ?? DEFAULT_GOOGLE_MEET_CONFIG.realtime.model,
			instructions: normalizeOptionalString$1(realtime.instructions) ?? DEFAULT_GOOGLE_MEET_CONFIG.realtime.instructions,
			introMessage: normalizeStringAllowEmpty(realtime.introMessage) ?? DEFAULT_GOOGLE_MEET_CONFIG.realtime.introMessage,
			agentId: normalizeOptionalString$1(realtime.agentId),
			toolPolicy: resolveRealtimeVoiceAgentConsultToolPolicy(realtime.toolPolicy, DEFAULT_GOOGLE_MEET_CONFIG.realtime.toolPolicy),
			providers: resolveProvidersConfig(realtime.providers)
		},
		oauth: {
			clientId: normalizeOptionalString$1(oauth.clientId) ?? normalizeOptionalString$1(auth.clientId) ?? readEnvString(env, GOOGLE_MEET_CLIENT_ID_KEYS),
			clientSecret: normalizeOptionalString$1(oauth.clientSecret) ?? normalizeOptionalString$1(auth.clientSecret) ?? readEnvString(env, GOOGLE_MEET_CLIENT_SECRET_KEYS),
			refreshToken: normalizeOptionalString$1(oauth.refreshToken) ?? readEnvString(env, GOOGLE_MEET_REFRESH_TOKEN_KEYS),
			accessToken: normalizeOptionalString$1(oauth.accessToken) ?? readEnvString(env, GOOGLE_MEET_ACCESS_TOKEN_KEYS),
			expiresAt: resolveOptionalNumber(oauth.expiresAt) ?? readEnvNumber(env, GOOGLE_MEET_ACCESS_TOKEN_EXPIRES_AT_KEYS)
		},
		auth: {
			provider: "google-oauth",
			clientId: normalizeOptionalString$1(auth.clientId),
			clientSecret: normalizeOptionalString$1(auth.clientSecret),
			tokenPath: normalizeOptionalString$1(auth.tokenPath)
		}
	};
}
//#endregion
//#region extensions/google-meet/src/transports/chrome-audio-device.ts
const GOOGLE_MEET_SYSTEM_PROFILER_COMMAND = "/usr/sbin/system_profiler";
function outputMentionsBlackHole2ch(output) {
	return /\bBlackHole\s+2ch\b/i.test(output);
}
//#endregion
//#region extensions/google-meet/src/transports/types.ts
const GOOGLE_MEET_TRANSCRIPT_MAX_LINES = 2e3;
//#endregion
//#region extensions/google-meet/src/transports/google-meet-page-scripts.ts
const GOOGLE_MEET_CAPTION_SETTLE_MS = 1e3;
function meetStatusScript(params) {
	return `async () => {
  const text = (node) => (node?.innerText || node?.textContent || "").trim();
  const manualActionFor = (reason, message) => ({ reason, message });
  const allowMicrophone = ${JSON.stringify(params.allowMicrophone)};
  const captionSessionId = ${JSON.stringify(params.captionSessionId)};
  const captureCaptions = ${JSON.stringify(params.captureCaptions)};
  const readOnly = ${JSON.stringify(Boolean(params.readOnly))};
  const buttons = [...document.querySelectorAll('button')];
  const buttonLabel = (button) =>
    [
      button.getAttribute("aria-label"),
      button.getAttribute("data-tooltip"),
      text(button),
    ]
      .filter(Boolean)
      .join(" ");
  const buttonLabels = buttons.map(buttonLabel).filter(Boolean);
  const notes = [];
  let audioOutputRouted;
  let audioOutputDeviceLabel;
  let audioOutputRouteError;
  const findButton = (pattern) =>
    buttons.find((button) => {
      const label = buttonLabel(button);
      return pattern.test(label) && !button.disabled;
    });
  const findCallControlButton = (pattern) =>
    buttons.find((button) => {
      const label = buttonLabel(button);
      return pattern.test(label) && !/remotely mute|someone else/i.test(label) && !button.disabled;
    });
  const input = [...document.querySelectorAll('input')].find((el) =>
    /your name/i.test(el.getAttribute('aria-label') || el.placeholder || '')
  );
  if (!readOnly && ${JSON.stringify(params.autoJoin)} && input && !input.value) {
    input.focus();
    input.value = ${JSON.stringify(params.guestName)};
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
  const pageText = text(document.body).toLowerCase();
  const permissionText = [pageText, ...buttonLabels].join("\\n");
  const host = location.hostname.toLowerCase();
  const pageUrl = location.href;
  const permissionNeeded = /permission needed|microphone problem|speaker problem|allow.*(microphone|camera)|blocked.*(microphone|camera)|permission.*(microphone|camera|speaker)/i.test(permissionText);
  let mic = findCallControlButton(/^\\s*turn (?:off|on) microphone\\b/i);
  if (!mic) {
    const callControls = document.querySelector('[role="region"][aria-label="Call controls"]');
    mic = [...(callControls?.querySelectorAll('button') || [])].find((button) =>
      /^\\s*turn (?:off|on) microphone\\b/i.test(buttonLabel(button))
    );
  }
  if (!readOnly && allowMicrophone && mic && /turn on microphone/i.test(buttonLabel(mic))) {
    mic.click();
    notes.push("Attempted to turn on the Meet microphone for talk-back mode.");
  }
  if (!readOnly && !allowMicrophone && mic && /turn off microphone/i.test(mic.getAttribute('aria-label') || text(mic))) {
    mic.click();
    notes.push("Muted Meet microphone for observe-only mode.");
  }
  const joinElsewhere = findButton(/join here too/i);
  const join = !readOnly && ${JSON.stringify(params.autoJoin)}
    ? findButton(/join now|ask to join/i)
    : null;
  if (join) join.click();
  const microphoneChoice = findButton(/\\buse microphone\\b/i);
  const noMicrophoneChoice = findButton(/\\b(continue|join|use) without (microphone|mic)\\b|\\bnot now\\b/i);
  if (!readOnly && allowMicrophone && microphoneChoice) {
    microphoneChoice.click();
    notes.push("Accepted Meet microphone prompt with browser automation.");
  } else if (!readOnly && !allowMicrophone && noMicrophoneChoice) {
    noMicrophoneChoice.click();
    notes.push("Skipped Meet microphone prompt for observe-only mode.");
  }
  const inCall = buttons.some((button) => /leave call/i.test(button.getAttribute('aria-label') || text(button)));
  const routeMeetAudioOutput = async () => {
    if (
      !allowMicrophone ||
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices?.enumerateDevices
    ) return;
    const mediaElements = [...document.querySelectorAll('audio, video')]
      .filter((el) => typeof el.setSinkId === 'function');
    if (mediaElements.length === 0) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const output = devices.find((device) =>
        device.kind === 'audiooutput' && /\\bBlackHole\\s+2ch\\b/i.test(device.label || '')
      ) || devices.find((device) =>
        device.kind === 'audiooutput' && /\\bBlackHole\\b/i.test(device.label || '')
      );
      if (!output?.deviceId) {
        if (devices.some((device) => device.kind === 'audiooutput')) {
          notes.push("BlackHole 2ch speaker output was not visible to Meet.");
        }
        return;
      }
      let routed = 0;
      for (const element of mediaElements) {
        if (element.sinkId !== output.deviceId) {
          if (readOnly) {
            continue;
          }
          await element.setSinkId(output.deviceId);
          routed += 1;
        }
      }
      audioOutputRouted = mediaElements.some((element) => element.sinkId === output.deviceId);
      audioOutputDeviceLabel = output.label || "BlackHole 2ch";
      if (!readOnly && audioOutputRouted) {
        notes.push(
          routed > 0
            ? \`Routed Meet media output to \${audioOutputDeviceLabel}.\`
            : \`Meet media output already routed to \${audioOutputDeviceLabel}.\`
        );
      }
    } catch (error) {
      audioOutputRouteError = error?.message || String(error);
      notes.push(\`Could not route Meet speaker output to BlackHole 2ch: \${audioOutputRouteError}\`);
    }
  };
  if (inCall) {
    await routeMeetAudioOutput();
  }
  let captioning = false;
  let captionsEnabledAttempted = false;
  let transcriptLines = 0;
  let lastCaptionAt;
  let lastCaptionSpeaker;
  let lastCaptionText;
  let recentTranscript = [];
  const captionSelector = '[role="region"][aria-label*="aption" i], [aria-live="polite"][role="region"], div[aria-live="polite"]';
  const captionState = (() => {
    if (!captureCaptions) return undefined;
    const w = window;
    if (!inCall && !w.__openclawMeetCaptions) return undefined;
    // A reused tab starts a fresh logical transcript for each OpenClaw session.
    // Status refreshes omit the id, so they preserve the active page-owned buffer.
    if (!w.__openclawMeetCaptions || (captionSessionId && w.__openclawMeetCaptions.sessionId !== captionSessionId)) {
      if (w.__openclawMeetCaptions?.settleTimer !== undefined) {
        clearTimeout(w.__openclawMeetCaptions.settleTimer);
      }
      w.__openclawMeetCaptions?.observer?.disconnect?.();
      w.__openclawMeetCaptions = {
        sessionId: captionSessionId,
        // Epochs cross document lifetimes in the runtime transcript cursor.
        // Strong UUIDs keep a reloaded page distinct from its prior buffer.
        epoch: crypto.randomUUID(),
        enabledAttempted: false,
        observerInstalled: false,
        observer: undefined,
        droppedLines: 0,
        lines: [],
        settleTimer: undefined,
        visible: []
      };
    }
    return w.__openclawMeetCaptions;
  })();
  const normalizeCaption = (speaker, captionText) => {
    if (!captionState) return;
    const clean = String(captionText || "").replace(/\\s+/g, " ").trim();
    const cleanSpeaker = String(speaker || "").replace(/\\s+/g, " ").trim();
    if (!clean || clean.length < 2) return undefined;
    if (/^(turn on captions|turn off captions|captions)$/i.test(clean)) return undefined;
    return { speaker: cleanSpeaker || undefined, text: clean };
  };
  const commitLines = (state, entries) => {
    state.lines.push(...entries.map((entry) => ({
      at: entry.at,
      speaker: entry.speaker,
      text: entry.text
    })));
    const excess = state.lines.length - ${GOOGLE_MEET_TRANSCRIPT_MAX_LINES};
    if (excess > 0) {
      state.lines.splice(0, excess);
      state.droppedLines = (state.droppedLines || 0) + excess;
    }
  };
  const scrapeCaptions = () => {
    if (!captionState) return;
    const regions = [...document.querySelectorAll(captionSelector)];
    const rows = [];
    for (const region of regions) {
      const raw = text(region);
      if (!raw) continue;
      const pieces = raw.split(/\\n+/).map((part) => part.trim()).filter(Boolean);
      const row = pieces.length >= 2
        ? normalizeCaption(pieces[0], pieces.slice(1).join(" "))
        : normalizeCaption("", pieces[0] || raw);
      if (row) rows.push({ ...row, node: region });
    }
    if (rows.length === 0) {
      // Meet briefly removes caption rows while rerendering. Keep them mutable
      // for one settle window so a DOM gap cannot fabricate a repeated line.
      if (captionState.visible.length > 0 && captionState.settleTimer === undefined) {
        const pendingState = captionState;
        pendingState.settleTimer = setTimeout(() => {
          if (window.__openclawMeetCaptions !== pendingState) return;
          commitLines(pendingState, pendingState.visible);
          pendingState.visible = [];
          pendingState.settleTimer = undefined;
        }, ${GOOGLE_MEET_CAPTION_SETTLE_MS});
      }
      return;
    }
    if (captionState.settleTimer !== undefined) {
      clearTimeout(captionState.settleTimer);
      captionState.settleTimer = undefined;
    }
    const previous = Array.isArray(captionState.visible) ? captionState.visible : [];
    const unmatchedPrevious = [...previous];
    const nextVisible = [];
    const now = Date.now();
    for (let index = 0; index < rows.length; index += 1) {
      const row = rows[index];
      const priorIndex = unmatchedPrevious.findIndex((candidate) => {
        const sameTextLifecycle =
          candidate.text === row.text ||
          row.text.startsWith(candidate.text) ||
          candidate.text.startsWith(row.text);
        const sameDomLifecycle =
          candidate.node === row.node || now - candidate.seenAt <= ${GOOGLE_MEET_CAPTION_SETTLE_MS};
        return candidate.speaker === row.speaker && sameTextLifecycle && sameDomLifecycle;
      });
      const prior = priorIndex >= 0 ? unmatchedPrevious.splice(priorIndex, 1)[0] : undefined;
      const sameSpeaker = Boolean(prior) && prior.speaker === row.speaker;
      if (sameSpeaker && prior.text === row.text) {
        prior.node = row.node;
        prior.seenAt = now;
        nextVisible.push(prior);
        continue;
      }
      if (sameSpeaker && row.text.startsWith(prior.text)) {
        prior.text = row.text;
        prior.node = row.node;
        prior.seenAt = now;
        nextVisible.push(prior);
        continue;
      }
      if (sameSpeaker && prior.text.startsWith(row.text)) {
        prior.node = row.node;
        prior.seenAt = now;
        nextVisible.push(prior);
        continue;
      }
      const entry = {
        at: new Date().toISOString(),
        node: row.node,
        seenAt: now,
        speaker: row.speaker,
        text: row.text
      };
      nextVisible.push(entry);
    }
    commitLines(captionState, unmatchedPrevious);
    captionState.visible = nextVisible;
  };
  if (captionState) {
    if (!readOnly && inCall && !captionState.enabledAttempted) {
      const captionButton = findButton(/turn on captions|show captions|captions/i);
      const captionLabel = captionButton ? (captionButton.getAttribute("aria-label") || captionButton.getAttribute("data-tooltip") || text(captionButton)) : "";
      if (captionButton) {
        captionState.enabledAttempted = true;
        captionsEnabledAttempted = true;
        if (!/turn off captions|hide captions/i.test(captionLabel)) {
          captionButton.click();
          notes.push("Attempted to enable Meet captions for observe-only transcript health.");
        }
      }
    } else if (captionState.enabledAttempted) {
      captionsEnabledAttempted = true;
    }
    if (inCall && !captionState.observerInstalled) {
      captionState.observerInstalled = true;
      captionState.observer = new MutationObserver(scrapeCaptions);
      captionState.observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
      notes.push("Installed Meet caption observer for observe-only transcript health.");
    }
    if (inCall) {
      scrapeCaptions();
    }
    const committedLines = Array.isArray(captionState.lines) ? captionState.lines : [];
    const visibleLines = Array.isArray(captionState.visible) ? captionState.visible : [];
    const lines = [...committedLines, ...visibleLines];
    const last = lines[lines.length - 1];
    captioning = document.querySelector(captionSelector) !== null || lines.length > 0;
    transcriptLines = (captionState.droppedLines || 0) + lines.length;
    lastCaptionAt = last?.at;
    lastCaptionSpeaker = last?.speaker;
    lastCaptionText = last?.text;
    recentTranscript = lines.slice(-5);
  }
  const lobbyWaiting = !inCall && /asking to be let in|you.?ll join when someone lets you in|waiting to be let in|ask to join/i.test(pageText);
  const leaveReason = !inCall && /you left the meeting|you.?ve left the meeting|removed from the meeting|you were removed|call ended|meeting ended/i.test(pageText)
    ? pageText.match(/you left the meeting|you.?ve left the meeting|removed from the meeting|you were removed|call ended|meeting ended/i)?.[0]
    : undefined;
  let manualAction;
  if (!inCall && (host === "accounts.google.com" || /use your google account|to continue to google meet|choose an account|sign in to (join|continue)/i.test(pageText))) {
    manualAction = manualActionFor("google-login-required", "Sign in to Google in the OpenClaw browser profile, then retry the Meet join.");
  } else if (!inCall && joinElsewhere) {
    manualAction = manualActionFor("meet-session-conflict", "Meet is already active in another tab or device. Leave that session or reuse an English-pinned tab before retrying.");
  } else if (!inCall && /asking to be let in|you.?ll join when someone lets you in|waiting to be let in|ask to join/i.test(pageText)) {
    manualAction = manualActionFor("meet-admission-required", "Admit the OpenClaw browser participant in Google Meet, then retry speech.");
  } else if (permissionNeeded) {
    manualAction = manualActionFor("meet-permission-required", allowMicrophone ? "Allow microphone/camera/speaker permissions for Meet in the OpenClaw browser profile, then retry." : "Join without microphone/camera permissions in the OpenClaw browser profile, then retry.");
  } else if (!inCall && (allowMicrophone ? !microphoneChoice : !noMicrophoneChoice) && /do you want people to hear you in the meeting/i.test(pageText)) {
    manualAction = manualActionFor("meet-audio-choice-required", allowMicrophone ? "Meet is showing the microphone choice. Click Use microphone in the OpenClaw browser profile, then retry." : "Meet is showing the microphone choice. Choose the no-microphone option in the OpenClaw browser profile, then retry.");
  }
  return JSON.stringify({
    clickedJoin: Boolean(join),
    clickedMicrophoneChoice: Boolean(allowMicrophone && microphoneChoice),
    inCall,
    micMuted: mic ? /turn on microphone/i.test(buttonLabel(mic)) : undefined,
    lobbyWaiting,
    leaveReason,
    captioning,
    captionsEnabledAttempted,
    transcriptLines,
    lastCaptionAt,
    lastCaptionSpeaker,
    lastCaptionText,
    recentTranscript,
    audioOutputRouted,
    audioOutputDeviceLabel,
    audioOutputRouteError,
    manualAction,
    title: document.title,
    url: pageUrl,
    notes
  });
}`;
}
function meetTranscriptScript(meetingUrl, meetingSessionId, finalize) {
	const expectedMeetingUrl = normalizeMeetUrlForReuse(meetingUrl);
	return `() => {
  const expectedMeetingUrl = ${JSON.stringify(expectedMeetingUrl)};
  const expectedSessionId = ${JSON.stringify(meetingSessionId)};
  let currentMeetingUrl;
  try {
    const currentUrl = new URL(location.href);
    currentMeetingUrl = currentUrl.origin + currentUrl.pathname.toLowerCase().replace(/\\/$/, "");
  } catch {
    return JSON.stringify({ urlMatched: false });
  }
  if (!expectedMeetingUrl || currentMeetingUrl !== expectedMeetingUrl) {
    return JSON.stringify({ urlMatched: false });
  }
  const state = window.__openclawMeetCaptions;
  if (state?.sessionId && state.sessionId !== expectedSessionId) {
    return JSON.stringify({ urlMatched: true, sessionMatched: false });
  }
  if (${JSON.stringify(finalize)} && Array.isArray(state?.visible) && state.visible.length > 0) {
    if (state.settleTimer !== undefined) clearTimeout(state.settleTimer);
    state.settleTimer = undefined;
    state.lines = Array.isArray(state.lines) ? state.lines : [];
    state.lines.push(...state.visible.map((entry) => ({
      at: entry.at,
      speaker: entry.speaker,
      text: entry.text
    })));
    state.visible = [];
    const excess = state.lines.length - ${GOOGLE_MEET_TRANSCRIPT_MAX_LINES};
    if (excess > 0) {
      state.lines.splice(0, excess);
      state.droppedLines = (state.droppedLines || 0) + excess;
    }
  }
  const lines = Array.isArray(state?.lines) ? state.lines : [];
  return JSON.stringify({
    urlMatched: true,
    sessionMatched: true,
    epoch: typeof state?.epoch === "string" ? state.epoch : undefined,
    droppedLines: Number.isFinite(state?.droppedLines) ? Math.max(0, Math.trunc(state.droppedLines)) : 0,
    lines: lines.map((line) => ({
      at: typeof line?.at === "string" ? line.at : undefined,
      speaker: typeof line?.speaker === "string" ? line.speaker : undefined,
      text: typeof line?.text === "string" ? line.text : ""
    })).filter((line) => line.text)
  });
}`;
}
function meetLeaveScript(meetingUrl) {
	const expectedMeetingUrl = normalizeMeetUrlForReuse(meetingUrl);
	return `() => {
  const expectedMeetingUrl = ${JSON.stringify(expectedMeetingUrl)};
  let currentMeetingUrl;
  try {
    const currentUrl = new URL(location.href);
    currentMeetingUrl = currentUrl.origin + currentUrl.pathname.toLowerCase().replace(/\\/$/, "");
  } catch {
    return JSON.stringify({ departed: false });
  }
  if (!expectedMeetingUrl) {
    return JSON.stringify({ departed: false });
  }
  if (currentMeetingUrl !== expectedMeetingUrl) {
    return JSON.stringify({ departed: true, urlMatched: false });
  }
  const text = (node) => (node?.innerText || node?.textContent || "").trim();
  // Locale-independent fallback: Meet renders the leave control as a Material
  // Symbols icon whose ligature text is "call_end" in every UI language, so a
  // localized aria-label (e.g. "Anruf verlassen") still resolves to the button.
  const hasLeaveIcon = (button) => {
    const icon = button.querySelector ? button.querySelector("i") : null;
    return icon ? (icon.textContent || "").trim() === "call_end" : false;
  };
  const buttons = [...document.querySelectorAll('button')];
  const label = (button) => [
    button.getAttribute("aria-label"),
    button.getAttribute("data-tooltip"),
    text(button),
  ]
    .filter(Boolean)
    .join(" ");
  const postCall = buttons.some((button) => /\\b(rejoin|return to home screen)\\b/i.test(label(button)));
  if (postCall) {
    return JSON.stringify({ departed: true, urlMatched: true });
  }
  // Managed join tabs are reused only after the English-tab gate or opened
  // through the English-UI helper, so follow-up labels are pinned to English.
  const confirmation = buttons.find((button) => {
    return !button.disabled && /\\bleave meeting\\b/i.test(label(button));
  });
  if (confirmation) {
    confirmation.click();
    return JSON.stringify({ departed: false, leaveAction: "confirm", urlMatched: true });
  }
  const leave = buttons.find((button) => {
    if (button.disabled) return false;
    return /leave call/i.test(label(button)) || hasLeaveIcon(button);
  });
  if (leave) {
    leave.click();
    return JSON.stringify({ departed: false, leaveAction: "leave", urlMatched: true });
  }
  return JSON.stringify({ departed: false, urlMatched: true });
}`;
}
//#endregion
//#region extensions/google-meet/src/transports/twilio.ts
const DTMF_PATTERN = /^[0-9*#wWpP,]+$/;
function normalizeDialInNumber(value) {
	const normalized = normalizeOptionalString$1(value);
	if (!normalized) return;
	const compact = normalized.replace(/[()\s.-]/g, "");
	if (!/^\+?[0-9]{5,20}$/.test(compact)) throw new Error("dialInNumber must be a phone number");
	return compact;
}
function normalizeDtmfSequence(value) {
	const normalized = normalizeOptionalString$1(value);
	if (!normalized) return;
	const compact = normalized.replace(/\s+/g, "");
	if (!DTMF_PATTERN.test(compact)) throw new Error("dtmfSequence may only contain digits, *, #, comma, w, p");
	return compact;
}
function buildMeetDtmfSequence(params) {
	const explicit = normalizeDtmfSequence(params.dtmfSequence);
	if (explicit) return explicit;
	const pin = normalizeOptionalString$1(params.pin);
	if (!pin) return;
	const compactPin = pin.replace(/\s+/g, "");
	if (!/^[0-9]+#?$/.test(compactPin)) throw new Error("pin may only contain digits and an optional trailing #");
	return compactPin.endsWith("#") ? compactPin : `${compactPin}#`;
}
function prefixDtmfWait(sequence, delayMs) {
	if (!sequence || delayMs <= 0) return sequence;
	const waitCount = Math.ceil(delayMs / 500);
	if (waitCount <= 0) return sequence;
	return `${"w".repeat(waitCount)}${sequence}`;
}
//#endregion
//#region extensions/google-meet/src/transports/google-meet-platform-adapter.ts
function parsePermissionGrantNotes(result) {
	const record = result && typeof result === "object" ? result : {};
	const unsupportedPermissions = Array.isArray(record.unsupportedPermissions) ? record.unsupportedPermissions.filter((value) => typeof value === "string") : [];
	const notes = ["Granted Meet microphone/camera permissions through browser control."];
	if (unsupportedPermissions.includes("speakerSelection")) notes.push("Chrome did not accept the optional Meet speaker-selection permission.");
	return notes;
}
const manualActionCategories = /* @__PURE__ */ new Map([
	["browser-control-unavailable", "browser-control-unavailable"],
	["google-login-required", "login-required"],
	["meet-admission-required", "admission-required"],
	["meet-audio-choice-required", "audio-choice-required"],
	["meet-locale-required", "locale-required"],
	["meet-permission-required", "permission-required"],
	["meet-session-conflict", "session-conflict"]
]);
function classifyManualActionReason(reason) {
	return manualActionCategories.get(reason) ?? "custom";
}
const GOOGLE_MEET_PLATFORM_ADAPTER = MeetingPlatformAdapter.create({
	id: "google-meet",
	displayName: "Google Meet",
	browserLabel: "Meet",
	logScope: "[google-meet]",
	agentConsult: {
		surface: "a private Google Meet",
		userLabel: "Participant",
		assistantLabel: "Agent",
		questionSourceLabel: "participant",
		workingResponseLabel: "participant",
		extraSystemPrompt: [
			"You are a behind-the-scenes consultant for a live meeting voice agent.",
			"Prioritize a fast, speakable answer over exhaustive investigation.",
			"For tool-backed status checks, prefer one or two bounded read-only queries before answering.",
			"Do not print secret values or dump environment variables; only check whether required configuration is present.",
			"Be accurate, brief, and speakable."
		].join(" ")
	},
	session: {
		idPrefix: "meet",
		participantIdentity: (transport) => transport === "twilio" ? "Twilio phone participant" : transport === "chrome-node" ? "signed-in Google Chrome profile on a paired node" : "signed-in Google Chrome profile"
	},
	nodeCommandName: GOOGLE_MEET_NODE_COMMAND,
	nodeConfigPath: "plugins.entries.google-meet.config.chromeNode.node",
	urls: {
		validateAndNormalize: normalizeMeetUrl,
		normalizeForReuse: normalizeMeetUrlForReuse,
		isSameMeeting: isSameMeetUrlForReuse,
		buildJoinUrl: (session) => forceMeetEnglishUi(session.url),
		accountHint: readMeetAuthUser,
		isPreferredJoinUrl: isEnglishMeetTab,
		isRecoverableTab: isRecoverableMeetTab,
		localeAction: (tab) => {
			if (!normalizeMeetUrlForReuse(tab.url) || isEnglishMeetTab(tab.url)) return;
			return {
				category: "locale-required",
				reason: "meet-locale-required",
				message: "The existing Meet tab is not pinned to English. Open the meeting with ?hl=en, then retry recovery."
			};
		}
	},
	browser: {
		allowsMicrophone: MeetingPlatformAdapter.isTalkBackMode,
		buildStatusJoinScript: (params) => meetStatusScript({
			allowMicrophone: MeetingPlatformAdapter.isTalkBackMode(params.mode),
			autoJoin: params.autoJoin,
			captionSessionId: params.meetingSessionId || void 0,
			captureCaptions: params.captureCaptions,
			guestName: params.guestName,
			readOnly: params.readOnly
		}),
		browserControlUnavailable: () => ({
			category: "browser-control-unavailable",
			reason: "browser-control-unavailable",
			message: "Open the OpenClaw browser profile, finish Google Meet login, admission, or permission prompts, then retry."
		}),
		buildLeaveScript: meetLeaveScript,
		captions: {
			enabled: (_mode) => true,
			buildTranscriptScript: ({ finalize, meetingSessionId, meetingUrl }) => meetTranscriptScript(meetingUrl, meetingSessionId, finalize)
		},
		permissions: ({ allowMicrophone }) => allowMicrophone ? {
			origin: "https://meet.google.com",
			permissions: ["audioCapture", "videoCapture"],
			optionalPermissions: ["speakerSelection"]
		} : void 0,
		permissionNotes: ({ allowMicrophone, error, result }) => {
			if (!allowMicrophone) return ["Observe-only mode skips Meet microphone/camera permission grants."];
			if (error) return [`Could not grant Meet media permissions automatically: ${formatErrorMessage(error)}`];
			return parsePermissionGrantNotes(result);
		}
	},
	create: { browser: createMeetWithBrowserProxyOnNode },
	dialIn: { buildPlan: (params) => {
		const number = normalizeDialInNumber(params.dialInNumber ?? params.defaultDialInNumber);
		const pin = params.pin ?? params.defaultPin;
		const rawDtmfSequence = buildMeetDtmfSequence({
			pin,
			dtmfSequence: params.dtmfSequence ?? params.defaultDtmfSequence
		});
		return {
			number,
			pin,
			dtmfSequence: params.dtmfSequence || params.defaultDtmfSequence ? rawDtmfSequence : prefixDtmfWait(rawDtmfSequence, params.dtmfDelayMs)
		};
	} },
	parsing: {
		classifyManualActionReason,
		displayName: "Meet",
		invalidTranscriptMessage: "Google Meet transcript payload is invalid.",
		malformedStatusMessage: "Google Meet browser status JSON is malformed.",
		malformedTranscriptMessage: "Google Meet transcript JSON is malformed.",
		statusFields: (parsed) => ({ leaveReason: typeof parsed.leaveReason === "string" ? parsed.leaveReason : void 0 })
	}
});
//#endregion
//#region extensions/google-meet/src/runtime-probes.ts
function resolveProbeTimeoutMs(input, fallback) {
	if (input === void 0) return Math.min(Math.max(fallback, 1), 12e4);
	if (!Number.isFinite(input) || input <= 0) throw new Error("timeoutMs must be a positive number");
	return Math.min(Math.trunc(input), 12e4);
}
const probes = MeetingPlatformAdapter.createRuntimeProbes({
	defaultSpeechMessage: "Say exactly: Google Meet speech test complete.",
	invalidRequest: (message) => new Error(message),
	resolveTimeoutMs: resolveProbeTimeoutMs,
	shouldWaitForListening: (session) => Boolean((session.transport === "chrome" || session.transport === "chrome-node") && session.chrome?.launched),
	talkBackMode: MeetingPlatformAdapter.isTalkBackMode,
	normalizeUrl: normalizeMeetUrl,
	resolveRequestMode: (mode) => mode === "realtime" ? "agent" : mode,
	defaultTransport: (config) => config.defaultTransport,
	validateListeningTransport: (transport) => {
		if (transport === "twilio") throw new Error("test_listen supports chrome or chrome-node transports");
	},
	resolveSpeechTimeoutMs: (_request, config) => Math.min(config.chrome.joinTimeoutMs, 5e3),
	refreshCaptionHealth: async (context, session) => await context.refreshCaptionHealth(session),
	speechModeError: "test_speech requires mode: agent or bidi; use join mode: transcribe for observe-only sessions.",
	listeningModeError: "test_listen requires mode: transcribe; use test_speech for talk-back sessions."
});
const testGoogleMeetListening = probes.testListening;
const testGoogleMeetSpeech = probes.testSpeech;
//#endregion
//#region extensions/google-meet/src/runtime-session.ts
function resolveTransport(input, config) {
	return input ?? config.defaultTransport;
}
function resolveMode(input, config) {
	return input === "realtime" ? "agent" : input ?? config.defaultMode;
}
function withSessionAgentConfig(config, agentId) {
	return config.realtime.agentId === agentId ? config : {
		...config,
		realtime: {
			...config.realtime,
			agentId
		}
	};
}
function isBrowserTransport(transport) {
	return transport === "chrome" || transport === "chrome-node";
}
function noteSession(session, note) {
	session.notes = [...session.notes.filter((item) => item !== note), note];
}
//#endregion
//#region extensions/google-meet/src/setup.ts
function resolveUserPath(input) {
	if (input === "~") return os.homedir();
	if (input.startsWith("~/")) return path.join(os.homedir(), input.slice(2));
	return input;
}
function isProviderUnreachableWebhookUrl(webhookUrl) {
	try {
		return isBlockedHostnameOrIp(new URL(webhookUrl).hostname);
	} catch {
		return false;
	}
}
function resolveVoiceCallSetupValue(configured, fallback) {
	return normalizeOptionalString$1(configured) ?? normalizeOptionalString$1(fallback);
}
function getVoiceCallWebhookExposureCheck(voiceCallConfig) {
	const publicUrl = normalizeOptionalString$1(voiceCallConfig.publicUrl);
	const tunnel = asRecord(voiceCallConfig.tunnel);
	const tailscale = asRecord(voiceCallConfig.tailscale);
	const tunnelProvider = normalizeOptionalString$1(tunnel.provider);
	const tailscaleMode = normalizeOptionalString$1(tailscale.mode);
	if (publicUrl) {
		const ok = !isProviderUnreachableWebhookUrl(publicUrl);
		return {
			id: "twilio-voice-call-webhook",
			ok,
			message: ok ? `Voice-call public webhook URL configured: ${publicUrl}` : `Voice-call publicUrl is local/private and cannot be reached by Twilio: ${publicUrl}`
		};
	}
	if (tunnelProvider && tunnelProvider !== "none") return {
		id: "twilio-voice-call-webhook",
		ok: true,
		message: "Voice-call webhook exposure configured through tunnel"
	};
	if (tailscaleMode && tailscaleMode !== "off") return {
		id: "twilio-voice-call-webhook",
		ok: true,
		message: "Voice-call webhook exposure configured through Tailscale"
	};
	return {
		id: "twilio-voice-call-webhook",
		ok: false,
		message: "Set plugins.entries.voice-call.config.publicUrl or configure voice-call tunnel/tailscale exposure for Twilio dialing"
	};
}
function getGoogleMeetSetupStatus(config, options) {
	const checks = [];
	const env = options?.env ?? process.env;
	const fullConfig = asRecord(options?.fullConfig);
	const mode = options?.mode ?? config.defaultMode;
	const transport = options?.transport ?? config.defaultTransport;
	const needsChromeRealtimeAudio = MeetingPlatformAdapter.isTalkBackMode(mode) && (transport === "chrome" || transport === "chrome-node");
	const pluginEntries = asRecord(asRecord(fullConfig.plugins).entries);
	const pluginAllow = asRecord(fullConfig.plugins).allow;
	const voiceCallEntry = asRecord(pluginEntries["voice-call"]);
	const voiceCallConfig = asRecord(voiceCallEntry.config);
	const voiceCallTwilioConfig = asRecord(voiceCallConfig.twilio);
	if (config.auth.tokenPath) {
		const tokenPath = resolveUserPath(config.auth.tokenPath);
		checks.push({
			id: "google-oauth-token",
			ok: fs.existsSync(tokenPath),
			message: fs.existsSync(tokenPath) ? "Google OAuth token file found" : `Google OAuth token file missing at ${config.auth.tokenPath}`
		});
	} else checks.push({
		id: "google-oauth-token",
		ok: true,
		message: "Google OAuth token path not configured; Chrome profile auth will be used"
	});
	checks.push({
		id: "chrome-profile",
		ok: true,
		message: config.chrome.browserProfile ? "Local Chrome uses the OpenClaw browser profile; chrome.browserProfile is passed to chrome-node hosts" : "Local Chrome uses the OpenClaw browser profile; configure browser.defaultProfile to choose another profile"
	});
	if (needsChromeRealtimeAudio) {
		const hasCommandPair = Boolean(config.chrome.audioInputCommand && config.chrome.audioOutputCommand);
		const hasExternalBridge = Boolean(config.chrome.audioBridgeCommand);
		const agentModeExternalBridgeInvalid = mode === "agent" && hasExternalBridge;
		checks.push({
			id: "audio-bridge",
			ok: mode === "agent" ? hasCommandPair && !agentModeExternalBridgeInvalid : hasExternalBridge || hasCommandPair,
			message: agentModeExternalBridgeInvalid ? "Chrome agent mode requires chrome.audioInputCommand and chrome.audioOutputCommand; chrome.audioBridgeCommand is bidi-only" : hasExternalBridge ? "Chrome audio bridge command configured" : hasCommandPair ? `Chrome command-pair talk-back audio bridge configured (${config.chrome.audioFormat})` : "Chrome talk-back audio bridge not configured"
		});
	} else if (transport === "chrome" || transport === "chrome-node") checks.push({
		id: "audio-bridge",
		ok: true,
		message: "Chrome observe-only mode does not require a realtime audio bridge"
	});
	checks.push({
		id: "guest-join-defaults",
		ok: Boolean(config.chrome.guestName && config.chrome.autoJoin && config.chrome.reuseExistingTab),
		message: config.chrome.guestName && config.chrome.autoJoin && config.chrome.reuseExistingTab ? "Guest auto-join and tab reuse defaults are enabled" : "Set chrome.guestName, chrome.autoJoin, and chrome.reuseExistingTab for unattended guest joins"
	});
	checks.push({
		id: "chrome-node-target",
		ok: config.defaultTransport !== "chrome-node" || Boolean(config.chromeNode.node),
		message: config.defaultTransport === "chrome-node" && !config.chromeNode.node ? "chrome-node default should pin chromeNode.node when multiple nodes may be connected" : config.chromeNode.node ? `Chrome node pinned to ${config.chromeNode.node}` : "Chrome node not pinned; automatic selection works when exactly one capable node is connected"
	});
	if (needsChromeRealtimeAudio) checks.push({
		id: "intro-after-in-call",
		ok: config.chrome.waitForInCallMs > 0,
		message: config.chrome.waitForInCallMs > 0 ? `Realtime intro waits up to ${config.chrome.waitForInCallMs}ms for the Meet tab to be in-call` : "Set chrome.waitForInCallMs to delay realtime intro until the Meet tab is in-call"
	});
	if (transport === "twilio") {
		const hasRequestDialPlan = Boolean(options?.twilioDialInNumber);
		const hasDefaultDialPlan = Boolean(config.twilio.defaultDialInNumber);
		const hasDialPlan = hasRequestDialPlan || hasDefaultDialPlan;
		checks.push({
			id: "twilio-dial-plan",
			ok: hasDialPlan,
			message: hasRequestDialPlan ? "Twilio request includes a Meet dial-in number" : hasDefaultDialPlan ? "Twilio default Meet dial-in number is configured" : "Twilio joins require a Meet dial-in phone number; pass dialInNumber with optional pin/dtmfSequence or configure twilio.defaultDialInNumber"
		});
	}
	if (config.voiceCall.enabled && (transport === "twilio" || Boolean(config.twilio.defaultDialInNumber) || Object.hasOwn(pluginEntries, "voice-call"))) {
		const voiceCallAllowed = !Array.isArray(pluginAllow) || pluginAllow.includes("voice-call");
		const voiceCallEnabled = Object.hasOwn(pluginEntries, "voice-call") && voiceCallEntry.enabled !== false;
		checks.push({
			id: "twilio-voice-call-plugin",
			ok: voiceCallAllowed && voiceCallEnabled,
			message: voiceCallAllowed && voiceCallEnabled ? "Twilio transport can delegate dialing to the voice-call plugin" : "Enable plugins.entries.voice-call and include voice-call in plugins.allow for Twilio dialing"
		});
		if ((normalizeOptionalString$1(voiceCallConfig.provider) ?? "twilio") === "twilio") {
			const accountSid = resolveVoiceCallSetupValue(voiceCallTwilioConfig.accountSid, env.TWILIO_ACCOUNT_SID);
			const authToken = resolveVoiceCallSetupValue(voiceCallTwilioConfig.authToken, env.TWILIO_AUTH_TOKEN);
			const fromNumber = resolveVoiceCallSetupValue(voiceCallConfig.fromNumber, env.TWILIO_FROM_NUMBER);
			const twilioReady = Boolean(accountSid && authToken && fromNumber);
			checks.push({
				id: "twilio-voice-call-credentials",
				ok: twilioReady,
				message: twilioReady ? "Twilio voice-call credentials are configured" : "Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER or configure voice-call Twilio credentials"
			});
			checks.push(getVoiceCallWebhookExposureCheck(voiceCallConfig));
		}
	}
	return createMeetingSetupStatus(checks);
}
function addGoogleMeetSetupCheck(status, check) {
	return addMeetingSetupCheck(status, check);
}
//#endregion
//#region extensions/google-meet/src/transports/chrome.ts
function shouldCaptureCaptions(mode, fullConfig) {
	return mode === "transcribe" || !fullConfig || resolveTranscriptsConfig(fullConfig.transcripts).enabled;
}
async function assertBlackHole2chAvailable(params) {
	if (process.platform !== "darwin") throw new Error("Chrome Meet transport with blackhole-2ch audio is currently macOS-only");
	const result = await params.runtime.system.runCommandWithTimeout([GOOGLE_MEET_SYSTEM_PROFILER_COMMAND, "SPAudioDataType"], { timeoutMs: params.timeoutMs });
	const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
	if (result.code !== 0 || !outputMentionsBlackHole2ch(output)) {
		const hint = params.runtime.system.formatNativeDependencyHint?.({
			packageName: "BlackHole 2ch",
			downloadCommand: "brew install blackhole-2ch"
		}) ?? "";
		throw new Error([
			"BlackHole 2ch audio device not found.",
			"Install BlackHole 2ch and route Chrome input/output through the OpenClaw audio bridge.",
			hint
		].filter(Boolean).join(" "));
	}
}
async function launchChromeMeet(params) {
	const checkRealtimeAudioPrerequisites = async () => {
		if (!MeetingPlatformAdapter.isTalkBackMode(params.mode)) return;
		await assertBlackHole2chAvailable({
			runtime: params.runtime,
			timeoutMs: Math.min(params.config.chrome.joinTimeoutMs, 1e4)
		});
		if (params.config.chrome.audioBridgeHealthCommand) {
			const health = await params.runtime.system.runCommandWithTimeout(params.config.chrome.audioBridgeHealthCommand, { timeoutMs: params.config.chrome.joinTimeoutMs });
			if (health.code !== 0) throw new Error(`Chrome audio bridge health check failed: ${health.stderr || health.stdout || health.code}`);
		}
	};
	const startRealtimeAudioBridge = async () => {
		if (!MeetingPlatformAdapter.isTalkBackMode(params.mode)) return;
		if (params.config.chrome.audioBridgeCommand) {
			if (params.mode === "agent") throw new Error("Chrome agent mode requires chrome.audioInputCommand and chrome.audioOutputCommand so OpenClaw can run STT and regular TTS directly.");
			const bridge = await params.runtime.system.runCommandWithTimeout(params.config.chrome.audioBridgeCommand, { timeoutMs: params.config.chrome.joinTimeoutMs });
			if (bridge.code !== 0) throw new Error(`failed to start Chrome audio bridge: ${bridge.stderr || bridge.stdout || bridge.code}`);
			return { type: "external-command" };
		}
		if (!params.config.chrome.audioInputCommand || !params.config.chrome.audioOutputCommand) throw new Error("Chrome talk-back mode requires chrome.audioInputCommand and chrome.audioOutputCommand, or chrome.audioBridgeCommand for an external bridge.");
		const transport = createLocalMeetingRealtimeAudioTransport({
			inputCommand: params.config.chrome.audioInputCommand,
			outputCommand: params.config.chrome.audioOutputCommand,
			audioFormat: params.config.chrome.audioFormat,
			bargeInInputCommand: params.config.chrome.bargeInInputCommand,
			bargeInRmsThreshold: params.config.chrome.bargeInRmsThreshold,
			bargeInPeakThreshold: params.config.chrome.bargeInPeakThreshold,
			bargeInCooldownMs: params.config.chrome.bargeInCooldownMs,
			logger: params.logger,
			logScope: GOOGLE_MEET_PLATFORM_ADAPTER.logScope
		});
		const bindings = createMeetingRealtimeEngineBindings({
			platform: GOOGLE_MEET_PLATFORM_ADAPTER,
			...params
		});
		const engine = params.mode === "agent" ? await startMeetingAgentRealtimeEngine({
			config: params.config,
			fullConfig: params.fullConfig,
			runtime: params.runtime,
			platform: bindings.platform,
			meetingSessionId: params.meetingSessionId,
			requesterSessionKey: params.requesterSessionKey,
			transport,
			logger: params.logger,
			consultAgent: bindings.consultAgent
		}) : await startMeetingRealtimeEngine({
			config: {
				...params.config,
				realtime: {
					...params.config.realtime,
					strategy: "bidi"
				}
			},
			fullConfig: params.fullConfig,
			runtime: params.runtime,
			...bindings,
			meetingSessionId: params.meetingSessionId,
			requesterSessionKey: params.requesterSessionKey,
			transport,
			logger: params.logger
		});
		return {
			type: "command-pair",
			inputCommand: params.config.chrome.audioInputCommand,
			outputCommand: params.config.chrome.audioOutputCommand,
			...engine
		};
	};
	await checkRealtimeAudioPrerequisites();
	if (!params.config.chrome.launch) return {
		launched: false,
		audioBridge: await startRealtimeAudioBridge()
	};
	const result = await openMeetingWithBrowser({
		adapter: GOOGLE_MEET_PLATFORM_ADAPTER,
		callBrowser: await resolveLocalMeetingBrowserRequest(params.runtime),
		config: params.config.chrome,
		session: {
			captureCaptions: shouldCaptureCaptions(params.mode, params.fullConfig),
			meetingSessionId: params.meetingSessionId,
			mode: params.mode,
			url: params.url
		}
	});
	const audioBridge = MeetingPlatformAdapter.isTalkBackMode(params.mode) && result.browser?.inCall === true && result.browser.micMuted === false && result.browser.manualAction === void 0 ? await startRealtimeAudioBridge() : void 0;
	return {
		...result,
		audioBridge
	};
}
function parseNodeStartResult(raw) {
	const value = raw && typeof raw === "object" && "payload" in raw ? raw.payload : raw;
	if (!value || typeof value !== "object") throw new Error("Google Meet node returned an invalid start result.");
	return value;
}
async function leaveChromeMeet(params) {
	return await leaveMeetingWithBrowser({
		adapter: GOOGLE_MEET_PLATFORM_ADAPTER,
		callBrowser: await resolveLocalMeetingBrowserRequest(params.runtime),
		launch: params.config.chrome.launch,
		meetingSessionId: params.meetingSessionId,
		meetingUrl: params.meetingUrl,
		tab: params.tab,
		timeoutMs: params.config.chrome.joinTimeoutMs
	});
}
async function readChromeMeetTranscript(params) {
	return await readMeetingTranscriptWithBrowser({
		adapter: GOOGLE_MEET_PLATFORM_ADAPTER,
		callBrowser: await resolveLocalMeetingBrowserRequest(params.runtime),
		finalize: params.finalize === true,
		meetingUrl: params.meetingUrl,
		meetingSessionId: params.meetingSessionId,
		tab: params.tab,
		timeoutMs: Math.min(Math.max(1e3, params.config.chrome.joinTimeoutMs), 1e4)
	});
}
async function readChromeMeetTranscriptOnNode(params) {
	const nodeId = params.nodeId ?? await resolveChromeNode({
		runtime: params.runtime,
		requestedNode: params.config.chromeNode.node
	});
	const timeoutMs = Math.min(Math.max(1e3, params.config.chrome.joinTimeoutMs), 1e4);
	return await readMeetingTranscriptWithBrowser({
		adapter: GOOGLE_MEET_PLATFORM_ADAPTER,
		callBrowser: async (request) => await callBrowserProxyOnNode({
			runtime: params.runtime,
			nodeId,
			method: request.method,
			path: request.path,
			body: request.body,
			timeoutMs: request.timeoutMs
		}),
		finalize: params.finalize === true,
		meetingUrl: params.meetingUrl,
		meetingSessionId: params.meetingSessionId,
		tab: params.tab,
		timeoutMs
	});
}
async function leaveChromeMeetOnNode(params) {
	const nodeId = params.nodeId ?? await resolveChromeNode({
		runtime: params.runtime,
		requestedNode: params.config.chromeNode.node
	});
	return await leaveMeetingWithBrowser({
		adapter: GOOGLE_MEET_PLATFORM_ADAPTER,
		callBrowser: async (request) => await callBrowserProxyOnNode({
			runtime: params.runtime,
			nodeId,
			method: request.method,
			path: request.path,
			body: request.body,
			timeoutMs: request.timeoutMs
		}),
		launch: params.config.chrome.launch,
		meetingSessionId: params.meetingSessionId,
		meetingUrl: params.meetingUrl,
		tab: params.tab,
		timeoutMs: params.config.chrome.joinTimeoutMs
	});
}
async function openMeetWithBrowserProxy(params) {
	return await openMeetingWithBrowser({
		adapter: GOOGLE_MEET_PLATFORM_ADAPTER,
		callBrowser: async (request) => await callBrowserProxyOnNode({
			runtime: params.runtime,
			nodeId: params.nodeId,
			method: request.method,
			path: request.path,
			body: request.body,
			timeoutMs: request.timeoutMs
		}),
		config: params.config.chrome,
		session: {
			captureCaptions: params.captureCaptions,
			mode: params.mode,
			meetingSessionId: params.meetingSessionId,
			url: params.url
		}
	});
}
async function recoverCurrentMeetTab(params) {
	return {
		transport: "chrome",
		...await recoverMeetingBrowserTab({
			adapter: GOOGLE_MEET_PLATFORM_ADAPTER,
			callBrowser: await resolveLocalMeetingBrowserRequest(params.runtime),
			captureCaptions: shouldCaptureCaptions(params.mode ?? "bidi", params.fullConfig),
			config: params.config.chrome,
			locationLabel: "in local Chrome",
			mode: params.mode ?? "bidi",
			readOnly: params.readOnly,
			requestedMeetingUrl: params.url,
			trackedMeetingUrl: params.trackedMeetingUrl,
			trackedTargetId: params.trackedTargetId
		})
	};
}
async function recoverCurrentMeetTabOnNode(params) {
	const nodeId = await resolveChromeNode({
		runtime: params.runtime,
		requestedNode: params.config.chromeNode.node
	});
	return {
		transport: "chrome-node",
		nodeId,
		...await recoverMeetingBrowserTab({
			adapter: GOOGLE_MEET_PLATFORM_ADAPTER,
			callBrowser: async (request) => await callBrowserProxyOnNode({
				runtime: params.runtime,
				nodeId,
				method: request.method,
				path: request.path,
				body: request.body,
				timeoutMs: request.timeoutMs
			}),
			captureCaptions: shouldCaptureCaptions(params.mode ?? "bidi", params.fullConfig),
			config: params.config.chrome,
			locationLabel: "on the selected Chrome node",
			mode: params.mode ?? "bidi",
			readOnly: params.readOnly,
			requestedMeetingUrl: params.url,
			trackedMeetingUrl: params.trackedMeetingUrl,
			trackedTargetId: params.trackedTargetId
		})
	};
}
async function launchChromeMeetOnNode(params) {
	const nodeId = await resolveChromeNode({
		runtime: params.runtime,
		requestedNode: params.config.chromeNode.node
	});
	try {
		await params.runtime.nodes.invoke({
			nodeId,
			command: GOOGLE_MEET_NODE_COMMAND,
			params: {
				action: "stopByUrl",
				url: params.url,
				mode: params.mode
			},
			timeoutMs: 5e3
		});
	} catch (error) {
		params.logger.debug?.(`[google-meet] node bridge cleanup before join ignored: ${error instanceof Error ? error.message : String(error)}`);
	}
	const browserControl = await openMeetWithBrowserProxy({
		runtime: params.runtime,
		nodeId,
		config: params.config,
		captureCaptions: shouldCaptureCaptions(params.mode, params.fullConfig),
		mode: params.mode,
		meetingSessionId: params.meetingSessionId,
		url: params.url
	});
	if (params.config.chrome.launch && MeetingPlatformAdapter.isTalkBackMode(params.mode) && (browserControl.browser?.inCall !== true || browserControl.browser.micMuted !== false || browserControl.browser.manualAction)) return {
		nodeId,
		launched: browserControl.launched,
		browser: browserControl.browser,
		tab: browserControl.tab
	};
	const result = parseNodeStartResult(await params.runtime.nodes.invoke({
		nodeId,
		command: GOOGLE_MEET_NODE_COMMAND,
		params: {
			action: "start",
			url: params.url,
			mode: params.mode,
			launch: false,
			browserProfile: params.config.chrome.browserProfile,
			joinTimeoutMs: params.config.chrome.joinTimeoutMs,
			audioInputCommand: params.config.chrome.audioInputCommand,
			audioOutputCommand: params.config.chrome.audioOutputCommand,
			audioBridgeCommand: params.config.chrome.audioBridgeCommand,
			audioBridgeHealthCommand: params.config.chrome.audioBridgeHealthCommand
		},
		timeoutMs: addTimerTimeoutGraceMs(params.config.chrome.joinTimeoutMs) ?? 1
	}));
	if (result.audioBridge?.type === "node-command-pair") {
		if (!result.bridgeId) throw new Error("Google Meet node did not return an audio bridge id.");
		const transport = createNodeMeetingRealtimeAudioTransport({
			runtime: params.runtime,
			nodeId,
			bridgeId: result.bridgeId,
			audioFormat: params.config.chrome.audioFormat,
			logger: params.logger,
			commandName: GOOGLE_MEET_NODE_COMMAND,
			logScope: GOOGLE_MEET_PLATFORM_ADAPTER.logScope,
			logPrefix: params.mode === "agent" ? "node agent" : "node"
		});
		Reflect.set(transport, Symbol.for("openclaw.internal.meeting-node-output-generation.v1"), result.audioBridge.outputGeneration === true);
		const bindings = createMeetingRealtimeEngineBindings({
			platform: GOOGLE_MEET_PLATFORM_ADAPTER,
			...params
		});
		const engine = params.mode === "agent" ? await startMeetingAgentRealtimeEngine({
			config: params.config,
			fullConfig: params.fullConfig,
			runtime: params.runtime,
			platform: bindings.platform,
			meetingSessionId: params.meetingSessionId,
			requesterSessionKey: params.requesterSessionKey,
			logPrefix: "node",
			transport,
			logger: params.logger,
			consultAgent: bindings.consultAgent
		}) : await startMeetingRealtimeEngine({
			config: {
				...params.config,
				realtime: {
					...params.config.realtime,
					strategy: "bidi"
				}
			},
			fullConfig: params.fullConfig,
			runtime: params.runtime,
			...bindings,
			meetingSessionId: params.meetingSessionId,
			requesterSessionKey: params.requesterSessionKey,
			logPrefix: "node",
			talkSessionId: `google-meet:${params.meetingSessionId}:${result.bridgeId}:node-realtime`,
			talkContext: {
				nodeId,
				bridgeId: result.bridgeId
			},
			transport,
			logger: params.logger
		});
		const bridge = {
			type: "node-command-pair",
			nodeId,
			bridgeId: result.bridgeId,
			...engine
		};
		return {
			nodeId,
			launched: browserControl.launched || result.launched === true,
			audioBridge: bridge,
			browser: browserControl.browser ?? result.browser,
			tab: browserControl.tab
		};
	}
	if (result.audioBridge?.type === "external-command") return {
		nodeId,
		launched: browserControl.launched || result.launched === true,
		audioBridge: { type: "external-command" },
		browser: browserControl.browser ?? result.browser,
		tab: browserControl.tab
	};
	return {
		nodeId,
		launched: browserControl.launched || result.launched === true,
		browser: browserControl.browser ?? result.browser,
		tab: browserControl.tab
	};
}
//#endregion
//#region extensions/google-meet/src/runtime-setup.ts
function collectChromeAudioCommands(config) {
	return uniqueStrings((config.chrome.audioBridgeCommand ? [config.chrome.audioBridgeCommand[0]] : [
		config.chrome.audioInputCommand?.[0],
		config.chrome.audioOutputCommand?.[0],
		config.chrome.bargeInInputCommand?.[0]
	]).filter((value) => Boolean(value?.trim())));
}
async function commandExists(runtime, command) {
	return (await runtime.system.runCommandWithTimeout([
		"/bin/sh",
		"-lc",
		"command -v \"$1\" >/dev/null 2>&1",
		"sh",
		command
	], { timeoutMs: 5e3 })).code === 0;
}
async function getGoogleMeetRuntimeSetupStatus(params) {
	const options = params.options ?? {};
	const transport = options.transport ?? params.config.defaultTransport;
	const mode = options.mode === "realtime" ? "agent" : options.mode ?? params.config.defaultMode;
	const twilioDialInNumber = transport === "twilio" ? normalizeDialInNumber(options.dialInNumber) : void 0;
	const shouldCheckChromeNode = transport === "chrome-node" || !options.transport && Boolean(params.config.chromeNode.node);
	let status = getGoogleMeetSetupStatus(params.config, {
		fullConfig: params.fullConfig,
		mode,
		transport,
		twilioDialInNumber
	});
	if (shouldCheckChromeNode) try {
		const node = await resolveChromeNodeInfo({
			runtime: params.runtime,
			requestedNode: params.config.chromeNode.node
		});
		const label = node.displayName ?? node.remoteIp ?? node.nodeId ?? "connected node";
		status = addGoogleMeetSetupCheck(status, {
			id: "chrome-node-connected",
			ok: true,
			message: `Connected Google Meet node ready: ${label}`
		});
	} catch (error) {
		status = addGoogleMeetSetupCheck(status, {
			id: "chrome-node-connected",
			ok: false,
			message: formatErrorMessage(error)
		});
	}
	if (transport !== "chrome" || mode !== "agent" && mode !== "bidi") return status;
	try {
		await assertBlackHole2chAvailable({
			runtime: params.runtime,
			timeoutMs: Math.min(params.config.chrome.joinTimeoutMs, 1e4)
		});
		status = addGoogleMeetSetupCheck(status, {
			id: "chrome-local-audio-device",
			ok: true,
			message: "BlackHole 2ch audio device found"
		});
	} catch (error) {
		status = addGoogleMeetSetupCheck(status, {
			id: "chrome-local-audio-device",
			ok: false,
			message: formatErrorMessage(error)
		});
	}
	const commands = collectChromeAudioCommands(params.config);
	const missingCommands = [];
	for (const command of commands) try {
		if (!await commandExists(params.runtime, command)) missingCommands.push(command);
	} catch {
		missingCommands.push(command);
	}
	return addGoogleMeetSetupCheck(status, {
		id: "chrome-local-audio-commands",
		ok: commands.length > 0 && missingCommands.length === 0,
		message: commands.length === 0 ? "Chrome talk-back audio commands are not configured" : missingCommands.length === 0 ? `Chrome audio command${commands.length === 1 ? "" : "s"} available: ${commands.join(", ")}` : `Chrome audio command${missingCommands.length === 1 ? "" : "s"} missing: ${missingCommands.join(", ")}`
	});
}
//#endregion
//#region extensions/google-meet/src/voice-call-gateway.ts
const GOOGLE_MEET_VOICE_CALL_SURFACE = {
	clientDisplayName: "Google Meet plugin",
	configPath: "google-meet voiceCall.gatewayUrl",
	logScope: "[google-meet]",
	meetingLabel: "Meet",
	providerLabel: "Twilio"
};
async function createConnectedGatewayClient(params) {
	let client;
	await new Promise((resolve, reject) => {
		const abortStart = new AbortController();
		const timer = setTimeout(() => {
			abortStart.abort();
			reject(/* @__PURE__ */ new Error("gateway connect timeout"));
		}, params.config.requestTimeoutMs);
		client = new GatewayClient({
			url: params.config.gatewayUrl,
			token: params.config.token,
			requestTimeoutMs: params.config.requestTimeoutMs,
			clientName: "cli",
			clientDisplayName: params.surface.clientDisplayName,
			scopes: ["operator.write"],
			onHelloOk: () => {
				clearTimeout(timer);
				resolve();
			},
			onConnectError: (error) => {
				clearTimeout(timer);
				abortStart.abort();
				reject(error);
			}
		});
		startGatewayClientWhenEventLoopReady(client, {
			timeoutMs: params.config.requestTimeoutMs,
			signal: abortStart.signal
		}).then((readiness) => {
			if (!readiness.ready && !readiness.aborted) {
				clearTimeout(timer);
				reject(/* @__PURE__ */ new Error("gateway event loop readiness timeout"));
			}
		}).catch((error) => {
			clearTimeout(timer);
			reject(error instanceof Error ? error : new Error(String(error)));
		});
	});
	return client;
}
function createVoiceCallGateway(params) {
	return createMeetingVoiceCallGateway({
		config: params.config.voiceCall,
		runtime: params.runtime,
		surface: GOOGLE_MEET_VOICE_CALL_SURFACE,
		connectClient: createConnectedGatewayClient
	});
}
const isVoiceCallMissingError = isMeetingVoiceCallMissingError;
async function joinMeetViaVoiceCallGateway(params) {
	return await joinMeetingViaVoiceCallGateway({
		...params,
		config: params.config.voiceCall,
		surface: GOOGLE_MEET_VOICE_CALL_SURFACE
	});
}
async function endMeetVoiceCallGatewayCall(params) {
	await endMeetingVoiceCallGatewayCall(params);
}
async function getMeetVoiceCallGatewayCall(params) {
	return await getMeetingVoiceCallGatewayCall(params);
}
async function speakMeetViaVoiceCallGateway(params) {
	await speakMeetingViaVoiceCallGateway(params);
}
//#endregion
//#region extensions/google-meet/src/runtime.ts
const nowIso = () => (/* @__PURE__ */ new Date()).toISOString();
var GoogleMeetRuntime = class {
	#createdBrowserTabs;
	#agentId;
	#voiceCallGateway;
	#sessions;
	constructor(params) {
		this.params = params;
		this.#createdBrowserTabs = /* @__PURE__ */ new Map();
		this.transcriptSourceRuntime = () => this.#sessions;
		const adapter = GOOGLE_MEET_PLATFORM_ADAPTER;
		this.#agentId = resolveDefaultAgentId(params.fullConfig);
		this.#voiceCallGateway = createVoiceCallGateway(params);
		this.#sessions = new MeetingSessionRuntime({
			logger: params.logger,
			logScope: "[google-meet]",
			formatError: formatErrorMessage,
			reuseExistingBrowserTab: params.config.chrome.reuseExistingTab,
			waitForInCallMs: params.config.chrome.waitForInCallMs,
			joinTimeoutMs: params.config.chrome.joinTimeoutMs,
			defaultSpeechInstructions: params.config.realtime.introMessage,
			transientSpeechBlockedReasons: /* @__PURE__ */ new Set([
				"not-in-call",
				"browser-unverified",
				"meet-microphone-muted"
			]),
			messages: {
				previousBrowserLeaveFailed: "Could not leave the previous Meet browser tab before reassignment.",
				reassignedSessionNote: "Ended before the same Meet tab was reassigned to another agent.",
				reusedSessionNote: "Reused existing active Meet session.",
				replacementBrowserLeaveFailed: "Could not leave the previous Meet browser tab before reassignment.",
				speechBlockedFallback: "Realtime speech blocked until Google Meet is ready.",
				speech: {
					audioBridgeUnavailable: "Realtime speech requires an active Chrome audio bridge.",
					browserUnverified: "Google Meet browser state has not been verified yet.",
					microphoneMuted: "Turn on the OpenClaw Google Meet microphone before asking OpenClaw to speak.",
					microphoneMutedReason: "meet-microphone-muted",
					notInCall: "Google Meet has not reported that the browser participant is in the call.",
					notInCallReason: "not-in-call",
					browserUnverifiedReason: "browser-unverified",
					audioBridgeUnavailableReason: "audio-bridge-unavailable"
				}
			},
			resolveJoin: (request) => ({
				url: adapter.urls.validateAndNormalize(request.url),
				transport: resolveTransport(request.transport, params.config),
				mode: resolveMode(request.mode, params.config),
				agentId: normalizeAgentId(request.agentId ?? params.config.realtime.agentId ?? this.#agentId)
			}),
			createSession: ({ resolved, createdAt }) => createMeetingSession({
				platform: adapter,
				config: params.config,
				resolved,
				createdAt
			}),
			resolveSpeechInstructions: (request) => request.message ?? params.config.realtime.introMessage,
			isBrowserTransport,
			isTalkBackMode: (mode) => MeetingPlatformAdapter.isTalkBackMode(mode),
			isTranscribeMode: (mode) => mode === "transcribe",
			sameMeetingUrl: (left, right) => adapter.urls.isSameMeeting(left, right),
			normalizeMeetingUrlForReuse: (url) => adapter.urls.normalizeForReuse(url),
			getBrowser: (session) => session.chrome ? {
				launched: session.chrome.launched,
				nodeId: session.chrome.nodeId,
				tab: session.chrome.browserTab,
				health: session.chrome.health,
				hasAudioBridge: Boolean(session.chrome.audioBridge)
			} : void 0,
			setBrowserTab: (session, tab) => {
				if (session.chrome) session.chrome.browserTab = tab;
			},
			setBrowserHealth: (session, health) => {
				if (session.chrome) session.chrome.health = health;
			},
			joinTransport: async ({ request, session, context }) => await this.#joinTransport(request, session, context),
			releaseBrowserTab: async (session) => await this.#releaseBrowserTab(session),
			refreshBrowserHealth: async (session, options) => await this.#refreshBrowserHealth(session, options),
			refreshStatus: async (session) => await this.#refreshStatus(session),
			refreshReusableSession: async (session, _request, _resolved) => {
				if (session.transport === "twilio") await this.#refreshTwilioVoiceCallStatus(session);
			},
			ensureRealtimeBridge: async (session) => await this.#ensureChromeRealtimeBridge(session),
			captureTranscript: async (session, options) => await this.#captureTranscript(session, options),
			speakViaTransport: async (session, instructions) => await this.#speakViaTransport(session, instructions),
			durableTranscripts: {
				config: params.fullConfig.transcripts,
				providerId: "google-meet",
				providerName: "Google Meet"
			}
		});
	}
	list() {
		return this.#sessions.list();
	}
	async status(sessionId) {
		return await this.#sessions.status(sessionId);
	}
	async transcript(sessionId, options = {}) {
		return await this.#sessions.transcript(sessionId, options);
	}
	async setupStatus(options = {}) {
		return await getGoogleMeetRuntimeSetupStatus({
			config: this.params.config,
			fullConfig: this.params.fullConfig,
			runtime: this.params.runtime,
			options
		});
	}
	async createViaBrowser() {
		const result = await GOOGLE_MEET_PLATFORM_ADAPTER.create.browser({
			runtime: this.params.runtime,
			config: this.params.config
		});
		if (result.openedByPlugin && result.targetId) this.#createdBrowserTabs.set(`${result.nodeId}:${result.targetId}`, result.meetingUri);
		return result;
	}
	async recoverCurrentTab(request = {}) {
		const transport = resolveTransport(request.transport, this.params.config);
		if (transport === "twilio") throw new Error("recover_current_tab only supports chrome or chrome-node transports");
		const url = request.url ? GOOGLE_MEET_PLATFORM_ADAPTER.urls.validateAndNormalize(request.url) : void 0;
		return transport === "chrome-node" ? await recoverCurrentMeetTabOnNode({
			runtime: this.params.runtime,
			config: this.params.config,
			fullConfig: this.params.fullConfig,
			url
		}) : await recoverCurrentMeetTab({
			runtime: this.params.runtime,
			config: this.params.config,
			fullConfig: this.params.fullConfig,
			url
		});
	}
	async join(request) {
		return await this.#sessions.join(request);
	}
	async leave(sessionId, options) {
		return await this.#sessions.leave(sessionId, options);
	}
	async speak(sessionId, instructions) {
		return await this.#sessions.speak(sessionId, instructions);
	}
	async testSpeech(request) {
		return await testGoogleMeetSpeech(this.#probeContext(), request);
	}
	async testListen(request) {
		return await testGoogleMeetListening(this.#probeContext(), request);
	}
	#probeContext() {
		return {
			config: this.params.config,
			resolveAgentId: (request) => normalizeAgentId(request.agentId ?? this.params.config.realtime.agentId ?? this.#agentId),
			list: () => this.list(),
			join: async (request) => await this.join(request),
			isReusable: (session, resolved) => this.#sessions.isReusableSession(session, resolved),
			hasHealthHandle: (sessionId) => this.#sessions.hasHealthHandle(sessionId),
			refreshHealth: (sessionId) => this.#sessions.refreshHealth(sessionId),
			refreshCaptionHealth: async (session) => await this.#sessions.refreshCaptionHealth(session)
		};
	}
	async #joinTransport(request, session, context) {
		if (isBrowserTransport(session.transport)) {
			const chromeConfig = withSessionAgentConfig(this.params.config, session.agentId);
			const result = session.transport === "chrome-node" ? await launchChromeMeetOnNode({
				runtime: this.params.runtime,
				config: chromeConfig,
				fullConfig: this.params.fullConfig,
				meetingSessionId: session.id,
				requesterSessionKey: request.requesterSessionKey,
				mode: session.mode,
				url: session.url,
				logger: this.params.logger
			}) : await launchChromeMeet({
				runtime: this.params.runtime,
				config: chromeConfig,
				fullConfig: this.params.fullConfig,
				meetingSessionId: session.id,
				requesterSessionKey: request.requesterSessionKey,
				mode: session.mode,
				url: session.url,
				logger: this.params.logger
			});
			const nodeId = "nodeId" in result ? result.nodeId : void 0;
			let tab = result.tab;
			const createdKey = session.transport === "chrome-node" && nodeId && tab ? `${nodeId}:${tab.targetId}` : void 0;
			const createdUrl = createdKey ? this.#createdBrowserTabs.get(createdKey) : void 0;
			if (createdKey) this.#createdBrowserTabs.delete(createdKey);
			if (tab && GOOGLE_MEET_PLATFORM_ADAPTER.urls.isSameMeeting(createdUrl, session.url)) tab = {
				...tab,
				openedByPlugin: true
			};
			tab = context.inheritedBrowserTab({
				session,
				transport: session.transport,
				nodeId,
				meetingUrl: session.url,
				tab
			});
			session.chrome = {
				audioBackend: this.params.config.chrome.audioBackend,
				launched: result.launched,
				nodeId,
				browserProfile: this.params.config.chrome.browserProfile,
				browserTab: tab,
				health: result.browser
			};
			const handles = this.#attachChromeAudioBridge(session, result.audioBridge);
			if (handles) context.attachRuntimeHandles(session, handles);
			session.notes.push(result.audioBridge ? session.transport === "chrome-node" ? "Chrome node transport joins as the signed-in Google profile on the selected node and routes realtime audio through the node bridge." : "Chrome transport joins as the signed-in Google profile and routes realtime audio through the configured bridge." : MeetingPlatformAdapter.isTalkBackMode(session.mode) ? "Chrome transport joins as the signed-in Google profile and expects BlackHole 2ch audio routing." : "Chrome transport joins as the signed-in Google profile without starting the realtime audio bridge.");
			this.#sessions.refreshSpeechReadiness(session);
			return {};
		}
		const dialPlan = GOOGLE_MEET_PLATFORM_ADAPTER.dialIn.buildPlan({
			dialInNumber: request.dialInNumber,
			defaultDialInNumber: this.params.config.twilio.defaultDialInNumber,
			pin: request.pin,
			defaultPin: this.params.config.twilio.defaultPin,
			dtmfSequence: request.dtmfSequence,
			defaultDtmfSequence: this.params.config.twilio.defaultDtmfSequence,
			dtmfDelayMs: this.params.config.voiceCall.dtmfDelayMs
		});
		const dialInNumber = dialPlan.number;
		if (!dialInNumber) throw new Error("Twilio transport requires a Meet dial-in phone number. Google Meet URLs do not include dial-in details; pass dialInNumber with optional pin/dtmfSequence, configure twilio.defaultDialInNumber, or use chrome/chrome-node transport.");
		const dtmfSequence = dialPlan.dtmfSequence;
		const delegatedAgentId = Boolean(normalizeOptionalString$1(request.agentId) || normalizeOptionalString$1(this.params.config.realtime.agentId)) ? session.agentId : void 0;
		const voiceCallResult = this.params.config.voiceCall.enabled ? await joinMeetViaVoiceCallGateway({
			config: this.params.config,
			gateway: this.#voiceCallGateway,
			dialInNumber,
			dtmfSequence,
			logger: this.params.logger,
			...request.requesterSessionKey ? { requesterSessionKey: request.requesterSessionKey } : {},
			agentId: delegatedAgentId,
			sessionKey: delegatedAgentId ? `agent:${delegatedAgentId}:google-meet:${session.id}` : `voice:google-meet:${session.id}`,
			message: MeetingPlatformAdapter.isTalkBackMode(session.mode) ? request.message ?? this.params.config.voiceCall.introMessage ?? this.params.config.realtime.introMessage : void 0
		}) : void 0;
		session.twilio = {
			dialInNumber,
			pinProvided: Boolean(dialPlan.pin),
			dtmfSequence,
			voiceCallId: voiceCallResult?.callId,
			dtmfSent: voiceCallResult?.dtmfSent,
			introSent: voiceCallResult?.introSent
		};
		if (voiceCallResult?.callId) context.attachRuntimeHandles(session, { stop: async () => {
			await endMeetVoiceCallGatewayCall({
				gateway: this.#voiceCallGateway,
				callId: voiceCallResult.callId
			});
		} });
		session.notes.push(this.params.config.voiceCall.enabled ? dtmfSequence ? "Twilio transport delegated the phone leg to the voice-call plugin, then queued configured DTMF before realtime connect." : "Twilio transport delegated the call to the voice-call plugin without configured DTMF." : "Twilio transport is an explicit dial plan; voice-call delegation is disabled.");
		return { delegatedSpoken: Boolean(voiceCallResult?.introSent) };
	}
	#attachChromeAudioBridge(session, audioBridge) {
		if (!session.chrome || !audioBridge) return;
		session.chrome.audioBridge = {
			type: audioBridge.type,
			provider: audioBridge.type === "command-pair" || audioBridge.type === "node-command-pair" ? audioBridge.providerId : void 0
		};
		return audioBridge.type === "command-pair" || audioBridge.type === "node-command-pair" ? {
			stop: audioBridge.stop,
			speak: audioBridge.speak,
			getHealth: audioBridge.getHealth
		} : void 0;
	}
	async #ensureChromeRealtimeBridge(session) {
		if (!MeetingPlatformAdapter.isTalkBackMode(session.mode) || !isBrowserTransport(session.transport) || session.state !== "active" || !session.chrome || session.chrome.audioBridge || session.chrome.health?.inCall !== true || session.chrome.health.micMuted !== false || session.chrome.health.manualAction) return;
		const config = withSessionAgentConfig(this.params.config, session.agentId);
		const recoveryConfig = {
			...config,
			chrome: {
				...config.chrome,
				launch: false
			},
			...session.chrome.nodeId ? { chromeNode: {
				...config.chromeNode,
				node: session.chrome.nodeId
			} } : {}
		};
		const result = session.transport === "chrome-node" ? await launchChromeMeetOnNode({
			runtime: this.params.runtime,
			config: recoveryConfig,
			fullConfig: this.params.fullConfig,
			meetingSessionId: session.id,
			mode: session.mode,
			url: session.url,
			logger: this.params.logger
		}) : await launchChromeMeet({
			runtime: this.params.runtime,
			config: recoveryConfig,
			fullConfig: this.params.fullConfig,
			meetingSessionId: session.id,
			mode: session.mode,
			url: session.url,
			logger: this.params.logger
		});
		session.updatedAt = nowIso();
		return this.#attachChromeAudioBridge(session, result.audioBridge);
	}
	async #refreshBrowserHealth(session, options = {}) {
		try {
			const result = session.transport === "chrome-node" ? await recoverCurrentMeetTabOnNode({
				runtime: this.params.runtime,
				config: this.params.config,
				fullConfig: this.params.fullConfig,
				mode: session.mode,
				readOnly: options.readOnly,
				trackedMeetingUrl: session.url,
				trackedTargetId: session.chrome?.browserTab?.targetId,
				url: session.url
			}) : await recoverCurrentMeetTab({
				runtime: this.params.runtime,
				config: this.params.config,
				fullConfig: this.params.fullConfig,
				mode: session.mode,
				readOnly: options.readOnly,
				trackedMeetingUrl: session.url,
				trackedTargetId: session.chrome?.browserTab?.targetId,
				url: session.url
			});
			if (result.found && session.chrome) {
				if (result.targetId) {
					const currentTab = session.chrome.browserTab;
					session.chrome.browserTab = {
						targetId: result.targetId,
						openedByPlugin: result.targetId === currentTab?.targetId ? currentTab.openedByPlugin : false
					};
				}
				if (result.browser) session.chrome.health = {
					...session.chrome.health,
					...result.browser
				};
				session.updatedAt = nowIso();
			}
		} catch (error) {
			this.params.logger.debug?.(`[google-meet] browser readiness refresh ignored: ${formatErrorMessage(error)}`);
		}
	}
	async #refreshStatus(session) {
		if (isBrowserTransport(session.transport)) await this.#sessions.refreshBrowserHealth(session, {
			force: true,
			readOnly: true
		});
		else if (session.transport === "twilio") await this.#refreshTwilioVoiceCallStatus(session);
		else this.#sessions.refreshSpeechReadiness(session);
	}
	async #refreshTwilioVoiceCallStatus(session) {
		const callId = session.twilio?.voiceCallId;
		if (!callId || session.state !== "active") {
			this.#sessions.refreshSpeechReadiness(session);
			return;
		}
		try {
			if ((await getMeetVoiceCallGatewayCall({
				gateway: this.#voiceCallGateway,
				callId
			})).found === false) this.#sessions.markSessionEnded(session, "Voice Call is no longer active.");
		} catch (error) {
			this.params.logger.debug?.(`[google-meet] voice-call status refresh ignored: ${formatErrorMessage(error)}`);
		}
		this.#sessions.refreshSpeechReadiness(session);
	}
	async #speakViaTransport(session, instructions) {
		if (session.transport !== "twilio" || !session.twilio?.voiceCallId) return;
		try {
			await speakMeetViaVoiceCallGateway({
				gateway: this.#voiceCallGateway,
				callId: session.twilio.voiceCallId,
				message: instructions || this.params.config.voiceCall.introMessage || this.params.config.realtime.introMessage || ""
			});
		} catch (error) {
			if (!isVoiceCallMissingError(error)) throw error;
			this.#sessions.markSessionEnded(session, "Voice Call is no longer active.");
			return {
				handled: true,
				spoken: false
			};
		}
		session.twilio.introSent = true;
		session.updatedAt = nowIso();
		return {
			handled: true,
			spoken: true
		};
	}
	async #captureTranscript(session, options = {}) {
		const tab = session.chrome?.browserTab;
		if (!tab) return;
		return session.transport === "chrome-node" ? await readChromeMeetTranscriptOnNode({
			runtime: this.params.runtime,
			nodeId: session.chrome?.nodeId,
			config: this.params.config,
			...options.finalize === void 0 ? {} : { finalize: options.finalize },
			meetingUrl: session.url,
			meetingSessionId: session.id,
			tab
		}) : await readChromeMeetTranscript({
			runtime: this.params.runtime,
			config: this.params.config,
			...options.finalize === void 0 ? {} : { finalize: options.finalize },
			meetingUrl: session.url,
			meetingSessionId: session.id,
			tab
		});
	}
	async #releaseBrowserTab(session) {
		if (!isBrowserTransport(session.transport)) return;
		const tab = session.chrome?.browserTab;
		if (!tab) {
			noteSession(session, "No tracked Meet browser tab for this session; close the Meet tab manually if it is still in the call.");
			session.browserLeft = false;
			return false;
		}
		if (this.list().some((other) => other.id !== session.id && other.state === "active" && isBrowserTransport(other.transport) && other.chrome?.browserTab?.targetId === tab.targetId && other.chrome?.nodeId === session.chrome?.nodeId)) {
			noteSession(session, "Kept the shared Meet tab open because another active session uses it.");
			session.browserLeft = void 0;
			return;
		}
		let left;
		try {
			const result = session.transport === "chrome-node" ? await leaveChromeMeetOnNode({
				runtime: this.params.runtime,
				nodeId: session.chrome?.nodeId,
				config: this.params.config,
				meetingSessionId: session.id,
				meetingUrl: session.url,
				tab
			}) : await leaveChromeMeet({
				runtime: this.params.runtime,
				config: this.params.config,
				meetingSessionId: session.id,
				meetingUrl: session.url,
				tab
			});
			noteSession(session, result.note);
			left = result.left;
		} catch (error) {
			noteSession(session, `Browser control could not leave the Meet tab: ${formatErrorMessage(error)}`);
			left = false;
		}
		if (session.chrome && left) {
			session.chrome.browserTab = void 0;
			if (session.chrome.health) session.chrome.health = {
				...session.chrome.health,
				captioning: false,
				audioOutputRouted: false,
				providerConnected: false,
				realtimeReady: false,
				audioInputActive: false,
				audioOutputActive: false
			};
		}
		session.browserLeft = left;
		return left;
	}
};
//#endregion
//#region extensions/google-meet/src/plugin-helpers.ts
const loadGoogleMeetCreateModule = createLazyRuntimeModule(() => import("./create-ZU4j3BNR.js"));
const loadGoogleMeetCliModule = createLazyRuntimeModule(() => import("./cli-CRL526YU.js"));
function asParamRecord(params) {
	return params && typeof params === "object" && !Array.isArray(params) ? params : {};
}
function normalizeTransport(value) {
	return value === "chrome" || value === "chrome-node" || value === "twilio" ? value : void 0;
}
function normalizeMode(value) {
	if (value === "realtime") return "agent";
	return value === "agent" || value === "bidi" || value === "transcribe" ? value : void 0;
}
function resolveMeetingInput(config, value) {
	const meeting = normalizeOptionalString$1(value) ?? config.defaults.meeting;
	if (!meeting) throw new Error("Meeting input is required");
	return meeting;
}
function shouldJoinCreatedMeet(raw) {
	return raw.join !== false && raw.join !== "false";
}
const googleMeetToolDeps = {
	callGatewayFromCli,
	platform: () => process.platform
};
const testing = {
	setCallGatewayFromCliForTests(next) {
		googleMeetToolDeps.callGatewayFromCli = next ?? callGatewayFromCli;
	},
	setPlatformForTests(next) {
		googleMeetToolDeps.platform = next ?? (() => process.platform);
	},
	isGoogleMeetAgentToolActionUnsupportedOnHost,
	resolveGoogleMeetGatewayOperationTimeoutMs
};
function googleMeetGatewayMethodForToolAction(action) {
	switch (action) {
		case "recover_current_tab": return "googlemeet.recoverCurrentTab";
		case "setup_status": return "googlemeet.setup";
		case "test_speech": return "googlemeet.testSpeech";
		case "test_listen": return "googlemeet.testListen";
		case "end_active_conference": return "googlemeet.endActiveConference";
		default: return `googlemeet.${action}`;
	}
}
function isGoogleMeetAgentToolActionUnsupportedOnHost(params) {
	if ((params.platform ?? googleMeetToolDeps.platform()) === "darwin") return false;
	const action = params.raw.action;
	if (action !== "join" && action !== "test_speech" && !(action === "create" && shouldJoinCreatedMeet(params.raw))) return false;
	const transport = normalizeTransport(params.raw.transport) ?? params.config.defaultTransport;
	const mode = action === "test_speech" ? "agent" : normalizeMode(params.raw.mode) ?? params.config.defaultMode;
	return transport === "chrome" && MeetingPlatformAdapter.isTalkBackMode(mode);
}
function assertGoogleMeetAgentToolActionSupported(params) {
	if (!isGoogleMeetAgentToolActionUnsupportedOnHost(params)) return;
	throw new Error("Google Meet local Chrome talk-back audio is macOS-only. On this host, use mode: transcribe, transport: twilio, or transport: chrome-node backed by a macOS node.");
}
function readGatewayErrorDetails(err) {
	if (!err || typeof err !== "object" || !("details" in err)) return;
	return err.details;
}
async function callGoogleMeetGatewayFromTool(params) {
	try {
		if (params.runtime) return await params.runtime.gateway.request(googleMeetGatewayMethodForToolAction(params.action), params.raw, {
			timeoutMs: resolveGoogleMeetGatewayOperationTimeoutMs(params.config),
			scopes: ["operator.admin"]
		});
		return await googleMeetToolDeps.callGatewayFromCli(googleMeetGatewayMethodForToolAction(params.action), {
			json: true,
			timeout: String(resolveGoogleMeetGatewayOperationTimeoutMs(params.config))
		}, params.raw, {
			progress: false,
			scopes: ["operator.admin"]
		});
	} catch (err) {
		const details = readGatewayErrorDetails(err);
		if (details && typeof details === "object") return details;
		throw err;
	}
}
function keepTrustedToolAgentId(raw, client) {
	const { agentId: rawAgentId, ...rest } = raw;
	if (client?.internal?.pluginRuntimeOwnerId !== "google-meet") return rest;
	const agentId = normalizeOptionalString$1(rawAgentId);
	return agentId ? {
		...rest,
		agentId
	} : rest;
}
async function createMeetFromParams(params) {
	return (await loadGoogleMeetCreateModule()).createMeetFromParams(params);
}
async function createAndJoinMeetFromParams(params) {
	return (await loadGoogleMeetCreateModule()).createAndJoinMeetFromParams(params);
}
async function resolveGoogleMeetTokenFromParams(config, raw) {
	const { resolveGoogleMeetAccessToken } = await import("./oauth-Bfmgd-DD.js");
	return resolveGoogleMeetAccessToken({
		clientId: normalizeOptionalString$1(raw.clientId) ?? config.oauth.clientId,
		clientSecret: normalizeOptionalString$1(raw.clientSecret) ?? config.oauth.clientSecret,
		refreshToken: normalizeOptionalString$1(raw.refreshToken) ?? config.oauth.refreshToken,
		accessToken: normalizeOptionalString$1(raw.accessToken) ?? config.oauth.accessToken,
		expiresAt: typeof raw.expiresAt === "number" ? raw.expiresAt : config.oauth.expiresAt
	});
}
function wantsCalendarLookup(raw) {
	return raw.today === true || Boolean(normalizeOptionalString$1(raw.event));
}
async function resolveMeetingFromParams(params) {
	if (wantsCalendarLookup(params.raw)) {
		const window = params.raw.today === true ? buildGoogleMeetCalendarDayWindow() : {};
		const calendarEvent = await findGoogleMeetCalendarEvent({
			accessToken: params.accessToken,
			calendarId: normalizeOptionalString$1(params.raw.calendarId),
			eventQuery: normalizeOptionalString$1(params.raw.event),
			...window
		});
		return {
			meeting: calendarEvent.meetingUri,
			calendarEvent
		};
	}
	return { meeting: resolveMeetingInput(params.config, params.raw.meeting) };
}
async function resolveSpaceFromParams(config, raw) {
	const token = await resolveGoogleMeetTokenFromParams(config, raw);
	const { meeting, calendarEvent } = await resolveMeetingFromParams({
		config,
		raw,
		accessToken: token.accessToken
	});
	return {
		meeting,
		token,
		space: await fetchGoogleMeetSpace({
			accessToken: token.accessToken,
			meeting
		}),
		calendarEvent
	};
}
async function resolveArtifactQueryFromParams(config, raw) {
	const meeting = normalizeOptionalString$1(raw.meeting) ?? config.defaults.meeting;
	const conferenceRecord = normalizeOptionalString$1(raw.conferenceRecord);
	const token = await resolveGoogleMeetTokenFromParams(config, raw);
	const resolvedMeeting = conferenceRecord ? { meeting } : wantsCalendarLookup(raw) ? await resolveMeetingFromParams({
		config,
		raw,
		accessToken: token.accessToken
	}) : { meeting };
	if (!resolvedMeeting.meeting && !conferenceRecord) throw new Error("Meeting input, calendar lookup, or conferenceRecord required");
	return {
		token,
		meeting: resolvedMeeting.meeting,
		calendarEvent: resolvedMeeting.calendarEvent,
		conferenceRecord,
		pageSize: readPositiveIntegerParam(raw, "pageSize"),
		includeTranscriptEntries: raw.includeTranscriptEntries !== false,
		includeDocumentBodies: raw.includeDocumentBodies === true,
		allConferenceRecords: raw.includeAllConferenceRecords === true,
		mergeDuplicateParticipants: raw.mergeDuplicateParticipants !== false,
		lateAfterMinutes: readPositiveIntegerParam(raw, "lateAfterMinutes"),
		earlyBeforeMinutes: readPositiveIntegerParam(raw, "earlyBeforeMinutes")
	};
}
async function exportGoogleMeetBundleFromParams(config, raw) {
	const resolved = await resolveArtifactQueryFromParams(config, raw);
	const [artifacts, attendance] = await Promise.all([fetchGoogleMeetArtifacts({
		accessToken: resolved.token.accessToken,
		meeting: resolved.meeting,
		conferenceRecord: resolved.conferenceRecord,
		pageSize: resolved.pageSize,
		includeTranscriptEntries: resolved.includeTranscriptEntries,
		includeDocumentBodies: resolved.includeDocumentBodies,
		allConferenceRecords: resolved.allConferenceRecords
	}), fetchGoogleMeetAttendance({
		accessToken: resolved.token.accessToken,
		meeting: resolved.meeting,
		conferenceRecord: resolved.conferenceRecord,
		pageSize: resolved.pageSize,
		allConferenceRecords: resolved.allConferenceRecords,
		mergeDuplicateParticipants: resolved.mergeDuplicateParticipants,
		lateAfterMinutes: resolved.lateAfterMinutes,
		earlyBeforeMinutes: resolved.earlyBeforeMinutes
	})]);
	const { buildGoogleMeetExportManifest, googleMeetExportFileNames, writeMeetExportBundle } = await loadGoogleMeetCliModule();
	const calendarId = normalizeOptionalString$1(raw.calendarId);
	const request = {
		...resolved.meeting ? { meeting: resolved.meeting } : {},
		...resolved.conferenceRecord ? { conferenceRecord: resolved.conferenceRecord } : {},
		...resolved.calendarEvent?.event.id ? { calendarEventId: resolved.calendarEvent.event.id } : {},
		...resolved.calendarEvent?.event.summary ? { calendarEventSummary: resolved.calendarEvent.event.summary } : {},
		...calendarId ? { calendarId } : {},
		...resolved.pageSize !== void 0 ? { pageSize: resolved.pageSize } : {},
		includeTranscriptEntries: resolved.includeTranscriptEntries,
		includeDocumentBodies: resolved.includeDocumentBodies,
		allConferenceRecords: resolved.allConferenceRecords,
		mergeDuplicateParticipants: resolved.mergeDuplicateParticipants,
		...resolved.lateAfterMinutes !== void 0 ? { lateAfterMinutes: resolved.lateAfterMinutes } : {},
		...resolved.earlyBeforeMinutes !== void 0 ? { earlyBeforeMinutes: resolved.earlyBeforeMinutes } : {}
	};
	const tokenSource = resolved.token.refreshed ? "refresh-token" : "cached-access-token";
	if (raw.dryRun === true) return {
		dryRun: true,
		manifest: buildGoogleMeetExportManifest({
			artifacts,
			attendance,
			files: googleMeetExportFileNames(),
			request,
			tokenSource,
			...resolved.calendarEvent ? { calendarEvent: resolved.calendarEvent } : {}
		}),
		...resolved.calendarEvent ? { calendarEvent: resolved.calendarEvent } : {},
		tokenSource
	};
	const outputDir = normalizeOptionalString$1(raw.outputDir) ?? normalizeOptionalString$1(raw.output);
	return {
		...await writeMeetExportBundle({
			...outputDir ? { outputDir } : {},
			artifacts,
			attendance,
			zip: raw.zip === true,
			request,
			tokenSource,
			...resolved.calendarEvent ? { calendarEvent: resolved.calendarEvent } : {}
		}),
		...resolved.calendarEvent ? { calendarEvent: resolved.calendarEvent } : {},
		tokenSource
	};
}
function createGoogleMeetRuntimeAccessor(params) {
	let runtime = null;
	return async () => {
		if (!params.config.enabled) throw new Error("Google Meet plugin disabled in plugin config");
		if (!runtime) runtime = new GoogleMeetRuntime({
			config: params.config,
			fullConfig: params.api.config,
			runtime: params.api.runtime,
			logger: params.api.logger
		});
		return runtime;
	};
}
function formatGoogleMeetGatewayError(err) {
	return isGoogleMeetBrowserManualActionError(err) ? err.payload : { error: formatErrorMessage(err) };
}
function sendGoogleMeetGatewayError(respond, err, code = ErrorCodes.UNAVAILABLE) {
	const payload = formatGoogleMeetGatewayError(err);
	respond(false, payload, errorShape(code, typeof payload.error === "string" ? payload.error : "Google Meet request failed", { details: payload }));
}
//#endregion
export { outputMentionsBlackHole2ch as C, resolveGoogleMeetGatewayOperationTimeoutMs as D, resolveGoogleMeetConfig as E, buildGoogleMeetCalendarDayWindow as O, GOOGLE_MEET_SYSTEM_PROFILER_COMMAND as S, DEFAULT_GOOGLE_MEET_AUDIO_OUTPUT_COMMAND as T, resolveSpaceFromParams as _, createGoogleMeetRuntimeAccessor as a, testing as b, formatGoogleMeetGatewayError as c, normalizeMode as d, normalizeTransport as f, resolveMeetingInput as g, resolveMeetingFromParams as h, createAndJoinMeetFromParams as i, listGoogleMeetCalendarEvents as k, keepTrustedToolAgentId as l, resolveGoogleMeetTokenFromParams as m, assertGoogleMeetAgentToolActionSupported as n, createMeetFromParams as o, resolveArtifactQueryFromParams as p, callGoogleMeetGatewayFromTool as r, exportGoogleMeetBundleFromParams as s, asParamRecord as t, loadGoogleMeetCliModule as u, sendGoogleMeetGatewayError as v, DEFAULT_GOOGLE_MEET_AUDIO_INPUT_COMMAND as w, GOOGLE_MEET_PLATFORM_ADAPTER as x, shouldJoinCreatedMeet as y };
