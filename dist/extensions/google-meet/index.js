import { c as normalizeOptionalString } from "../../string-coerce-DW4mBlAt.js";
import { n as normalizeAgentId } from "../../agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "../../session-key-utils-02xWdGSz.js";
import { t as ErrorCodes } from "../../gateway-error-details-mJ5vWsi5.js";
import { p as readPositiveIntegerParam } from "../../common-RkLs-2lL.js";
import { t as jsonResult } from "../../tool-results-BCM3fdVS.js";
import { a as optionalPositiveIntegerSchema } from "../../typebox-ktRHOCRA.js";
import "../../string-coerce-runtime-CLK2YdzD.js";
import "../../routing-BYqzCOl5.js";
import { t as definePluginEntry } from "../../plugin-entry-DjIG8BVe.js";
import "../../gateway-runtime-w2Zuxd4x.js";
import "../../channel-actions-BCwQOL9z.js";
import { p as createMeetingNodeHost, u as createMeetingBrowserNodeInvokePolicy } from "../../meeting-runtime-BaPqPq3L.js";
import { t as createMeetingTranscriptSourceProvider } from "../../transcripts-bridge-BhkdwJIv.js";
import "../../transcripts-DiMiyCS1.js";
import { C as outputMentionsBlackHole2ch, E as resolveGoogleMeetConfig, O as buildGoogleMeetCalendarDayWindow, S as GOOGLE_MEET_SYSTEM_PROFILER_COMMAND, T as DEFAULT_GOOGLE_MEET_AUDIO_OUTPUT_COMMAND, _ as resolveSpaceFromParams, a as createGoogleMeetRuntimeAccessor, b as testing, c as formatGoogleMeetGatewayError, d as normalizeMode, f as normalizeTransport, g as resolveMeetingInput, h as resolveMeetingFromParams, i as createAndJoinMeetFromParams, k as listGoogleMeetCalendarEvents, l as keepTrustedToolAgentId, m as resolveGoogleMeetTokenFromParams, n as assertGoogleMeetAgentToolActionSupported, o as createMeetFromParams, p as resolveArtifactQueryFromParams, r as callGoogleMeetGatewayFromTool, s as exportGoogleMeetBundleFromParams, t as asParamRecord, u as loadGoogleMeetCliModule, v as sendGoogleMeetGatewayError, w as DEFAULT_GOOGLE_MEET_AUDIO_INPUT_COMMAND, x as GOOGLE_MEET_PLATFORM_ADAPTER, y as shouldJoinCreatedMeet } from "../../plugin-helpers-BUpqUgv_.js";
import { t as GOOGLE_MEET_CLI_DESCRIPTOR } from "../../cli-output-mode-B-ZRlTS3.js";
import { _ as endGoogleMeetActiveConference, f as GOOGLE_MEET_NODE_COMMAND, h as fetchGoogleMeetAttendance, m as fetchGoogleMeetArtifacts, p as buildGoogleMeetPreflightReport, y as fetchLatestGoogleMeetConferenceRecord } from "../../chrome-create-Dt_HOnSg.js";
import { spawnSync } from "node:child_process";
import { Type } from "typebox";
//#region extensions/google-meet/src/node-host.ts
function assertBlackHoleAvailable(timeoutMs) {
	if (process.platform !== "darwin") throw new Error("Chrome Meet transport with blackhole-2ch audio is currently macOS-only");
	const result = spawnSync(GOOGLE_MEET_SYSTEM_PROFILER_COMMAND, ["SPAudioDataType"], {
		encoding: "utf8",
		timeout: timeoutMs
	});
	const stderr = result.stderr ?? (result.error ? result.error instanceof Error ? result.error.message : String(result.error) : "");
	const output = `${result.stdout ?? ""}\n${stderr}`;
	if ((typeof result.status === "number" ? result.status : result.error ? 1 : 0) !== 0 || !outputMentionsBlackHole2ch(output)) throw new Error("BlackHole 2ch audio device not found on the node.");
}
function normalizeMeetKey(value) {
	if (!value) return;
	try {
		const url = new URL(value);
		if (url.hostname.toLowerCase() !== "meet.google.com") return value;
		return /^\/([a-z]{3}-[a-z]{4}-[a-z]{3})(?:$|[/?#])/i.exec(url.pathname)?.[1]?.toLowerCase() ?? value;
	} catch {
		return value;
	}
}
const googleMeetNodeHost = createMeetingNodeHost({
	commandName: GOOGLE_MEET_NODE_COMMAND,
	displayName: "Google Meet",
	browserLabel: "Meet",
	bridgeIdPrefix: "meet_node_",
	defaultAudioInputCommand: DEFAULT_GOOGLE_MEET_AUDIO_INPUT_COMMAND,
	defaultAudioOutputCommand: DEFAULT_GOOGLE_MEET_AUDIO_OUTPUT_COMMAND,
	talkBackModes: /* @__PURE__ */ new Set([
		"agent",
		"bidi",
		"realtime"
	]),
	agentMode: "agent",
	normalizeUrl: (url) => GOOGLE_MEET_PLATFORM_ADAPTER.urls.validateAndNormalize(url),
	normalizeMeetingKey: normalizeMeetKey,
	assertAudioAvailable: assertBlackHoleAvailable,
	browser: {
		application: "Google Chrome",
		buildProfileArgs: (profile) => ["--args", `--profile-directory=${profile}`],
		openedStatus: "chrome-opened",
		openedNotes: ["Browser page control is handled by OpenClaw browser automation when using chrome-node."]
	}
});
async function handleGoogleMeetNodeHostCommand(paramsJSON) {
	return await googleMeetNodeHost.handleCommand(paramsJSON);
}
//#endregion
//#region extensions/google-meet/src/node-invoke-policy.ts
const GOOGLE_MEET_CHROME_NODE_COMMAND = GOOGLE_MEET_NODE_COMMAND;
const START_MODES = /* @__PURE__ */ new Set([
	"agent",
	"bidi",
	"realtime",
	"transcribe"
]);
function createGoogleMeetChromeNodeInvokePolicy(config) {
	return createMeetingBrowserNodeInvokePolicy({
		commandName: GOOGLE_MEET_CHROME_NODE_COMMAND,
		displayName: "Google Meet",
		deniedCode: "GOOGLE_MEET_NODE_POLICY_DENIED",
		supportedModes: START_MODES,
		normalizeUrl: (url) => GOOGLE_MEET_PLATFORM_ADAPTER.urls.validateAndNormalize(url),
		start: config.chrome
	});
}
//#endregion
//#region extensions/google-meet/src/plugin-schema.ts
const googleMeetConfigSchema = {
	parse(value) {
		return resolveGoogleMeetConfig(value);
	},
	uiHints: {
		"defaults.meeting": {
			label: "Default Meeting",
			help: "Meet URL, meeting code, or spaces/{id} used when CLI commands omit a meeting."
		},
		"preview.enrollmentAcknowledged": {
			label: "Preview Acknowledged",
			help: "Confirms you understand the Google Meet Media API is still Developer Preview.",
			advanced: true
		},
		defaultTransport: {
			label: "Default Transport",
			help: "Chrome uses a signed-in browser profile. Chrome-node runs Chrome on a paired node. Twilio uses Meet dial-in numbers."
		},
		defaultMode: {
			label: "Default Mode",
			help: "Agent uses realtime transcription plus regular OpenClaw TTS. Bidi uses the realtime voice model directly. Transcribe observes only."
		},
		"chrome.audioBackend": {
			label: "Chrome Audio Backend",
			help: "BlackHole 2ch is required for local duplex audio routing."
		},
		"chrome.launch": { label: "Launch Chrome" },
		"chrome.browserProfile": {
			label: "Chrome Profile",
			advanced: true
		},
		"chrome.guestName": {
			label: "Guest Name",
			help: "Used when Chrome lands on the signed-out Meet guest-name screen."
		},
		"chrome.reuseExistingTab": {
			label: "Reuse Existing Meet Tab",
			help: "Avoids opening duplicate tabs for the same Meet URL."
		},
		"chrome.autoJoin": {
			label: "Auto Join Guest Screen",
			help: "Best-effort guest-name fill and Join Now click through OpenClaw browser automation."
		},
		"chrome.waitForInCallMs": {
			label: "Wait For In-Call (ms)",
			help: "Waits for Chrome to report that the Meet tab is in-call before the realtime intro speaks.",
			advanced: true
		},
		"chrome.audioFormat": {
			label: "Audio Format",
			help: "Command-pair audio format. PCM16 24 kHz is the default Chrome/Meet path; G.711 mu-law 8 kHz remains available for legacy command pairs.",
			advanced: true
		},
		"chrome.audioBufferBytes": {
			label: "Audio Buffer Bytes",
			help: "SoX processing buffer for generated Chrome command-pair audio commands. Lower values reduce latency but may underrun on busy hosts.",
			advanced: true
		},
		"chrome.audioInputCommand": {
			label: "Audio Input Command",
			help: "Command that writes meeting audio to stdout in chrome.audioFormat.",
			advanced: true
		},
		"chrome.audioOutputCommand": {
			label: "Audio Output Command",
			help: "Command that reads assistant audio from stdin in chrome.audioFormat.",
			advanced: true
		},
		"chrome.bargeInInputCommand": {
			label: "Barge-In Input Command",
			help: "Optional Gateway-hosted microphone command that writes signed 16-bit little-endian mono PCM for human interruption detection while assistant playback is active.",
			advanced: true
		},
		"chrome.bargeInRmsThreshold": {
			label: "Barge-In RMS Threshold",
			help: "RMS level on chrome.bargeInInputCommand that counts as a human interruption.",
			advanced: true
		},
		"chrome.bargeInPeakThreshold": {
			label: "Barge-In Peak Threshold",
			help: "Peak level on chrome.bargeInInputCommand that counts as a human interruption.",
			advanced: true
		},
		"chrome.bargeInCooldownMs": {
			label: "Barge-In Cooldown (ms)",
			help: "Minimum delay between repeated barge-in clears.",
			advanced: true
		},
		"chrome.audioBridgeCommand": {
			label: "Audio Bridge Command",
			advanced: true
		},
		"chrome.audioBridgeHealthCommand": {
			label: "Audio Bridge Health Command",
			advanced: true
		},
		"chromeNode.node": {
			label: "Chrome Node",
			help: "Node id/name/IP that owns Chrome, BlackHole, and SoX for chrome-node transport.",
			advanced: true
		},
		"twilio.defaultDialInNumber": {
			label: "Default Dial-In Number",
			placeholder: "+15551234567"
		},
		"twilio.defaultPin": {
			label: "Default PIN",
			advanced: true
		},
		"twilio.defaultDtmfSequence": {
			label: "Default DTMF Sequence",
			advanced: true
		},
		"voiceCall.enabled": { label: "Delegate To Voice Call" },
		"voiceCall.gatewayUrl": {
			label: "Voice Call Gateway URL",
			advanced: true
		},
		"voiceCall.token": {
			label: "Voice Call Gateway Token",
			sensitive: true,
			advanced: true
		},
		"voiceCall.requestTimeoutMs": {
			label: "Voice Call Request Timeout (ms)",
			advanced: true
		},
		"voiceCall.dtmfDelayMs": {
			label: "DTMF Wait Before PIN (ms)",
			help: "Leading Twilio wait time before playing a PIN-derived Meet DTMF sequence. Increase it if Meet asks for the PIN after DTMF was sent.",
			advanced: true
		},
		"voiceCall.postDtmfSpeechDelayMs": {
			label: "Post-DTMF Speech Delay (ms)",
			help: "Delay before requesting the realtime intro greeting after Voice Call starts the Twilio leg.",
			advanced: true
		},
		"voiceCall.introMessage": {
			label: "Voice Call Intro Message",
			advanced: true
		},
		"realtime.strategy": {
			label: "Realtime Strategy",
			help: "Legacy realtime alias setting. Use mode=agent or mode=bidi for new Meet joins."
		},
		"realtime.provider": {
			label: "Speech Provider",
			help: "Compatibility fallback for both realtime transcription and bidi voice. Prefer realtime.transcriptionProvider and realtime.voiceProvider for new configs."
		},
		"realtime.transcriptionProvider": {
			label: "Realtime Transcription Provider",
			help: "Agent mode uses this provider to transcribe meeting audio before regular OpenClaw TTS answers."
		},
		"realtime.voiceProvider": {
			label: "Bidi Voice Provider",
			help: "Bidi mode uses this realtime voice provider. Falls back to realtime.provider when unset."
		},
		"realtime.model": {
			label: "Bidi Realtime Model",
			help: "Only used by mode=bidi. Agent mode answers with the configured OpenClaw agent and regular TTS.",
			advanced: true
		},
		"realtime.instructions": {
			label: "Realtime Instructions",
			advanced: true
		},
		"realtime.introMessage": {
			label: "Realtime Intro Message",
			help: "Spoken once when the realtime bridge is ready. Set to an empty string to join silently."
		},
		"realtime.agentId": {
			label: "Realtime Consult Agent",
			help: "OpenClaw agent id used by openclaw_agent_consult. Defaults to \"main\".",
			advanced: true
		},
		"realtime.toolPolicy": {
			label: "Realtime Tool Policy",
			help: "Safe read-only tools are available by default; owner requests can unlock broader tools.",
			advanced: true
		},
		"oauth.clientId": { label: "OAuth Client ID" },
		"oauth.clientSecret": {
			label: "OAuth Client Secret",
			sensitive: true
		},
		"oauth.refreshToken": {
			label: "OAuth Refresh Token",
			sensitive: true
		},
		"oauth.accessToken": {
			label: "Cached Access Token",
			sensitive: true,
			advanced: true
		},
		"oauth.expiresAt": {
			label: "Cached Access Token Expiry",
			help: "Unix epoch milliseconds used only for the cached access-token fast path.",
			advanced: true
		}
	}
};
const GoogleMeetToolSchema = Type.Object({
	action: Type.String({
		enum: [
			"join",
			"create",
			"status",
			"transcript",
			"setup_status",
			"resolve_space",
			"preflight",
			"latest",
			"calendar_events",
			"artifacts",
			"attendance",
			"export",
			"recover_current_tab",
			"leave",
			"end_active_conference",
			"speak",
			"test_speech",
			"test_listen"
		],
		description: "Google Meet action to run. create creates and joins by default; pass join=false to only mint a URL. After a timeout or unclear browser state, call recover_current_tab before retrying join."
	}),
	join: Type.Optional(Type.Boolean({ description: "For action=create, set false to create the URL without joining." })),
	accessType: Type.Optional(Type.String({
		enum: [
			"OPEN",
			"TRUSTED",
			"RESTRICTED"
		],
		description: "For action=create with Google Meet OAuth, configure who can join without knocking."
	})),
	entryPointAccess: Type.Optional(Type.String({
		enum: ["ALL", "CREATOR_APP_ONLY"],
		description: "For action=create with Google Meet OAuth, configure allowed join entry points."
	})),
	url: Type.Optional(Type.String({ description: "Explicit https://meet.google.com/... URL" })),
	transport: Type.Optional(Type.String({
		enum: [
			"chrome",
			"chrome-node",
			"twilio"
		],
		description: "Join transport"
	})),
	mode: Type.Optional(Type.String({
		enum: [
			"agent",
			"bidi",
			"transcribe"
		],
		description: "Join mode. agent uses realtime transcription, the configured OpenClaw agent, and regular TTS. bidi uses the realtime voice model directly. transcribe joins observe-only."
	})),
	dialInNumber: Type.Optional(Type.String({ description: "Meet dial-in phone number for Twilio. Required for Twilio unless twilio.defaultDialInNumber is configured; Meet URLs cannot be dialed directly." })),
	pin: Type.Optional(Type.String({ description: "Meet phone PIN for Twilio; # is appended if omitted" })),
	dtmfSequence: Type.Optional(Type.String({ description: "Explicit DTMF sequence for Twilio" })),
	sessionId: Type.Optional(Type.String({ description: "Meet session ID" })),
	sinceIndex: Type.Optional(Type.Integer({
		description: "For transcript, resume from the previous response's nextIndex.",
		minimum: 0
	})),
	message: Type.Optional(Type.String({ description: "Realtime instructions to speak now" })),
	timeoutMs: optionalPositiveIntegerSchema({ description: "Probe timeout in milliseconds" }),
	meeting: Type.Optional(Type.String({ description: "Meet URL, meeting code, or spaces/{id}" })),
	today: Type.Optional(Type.Boolean({ description: "For latest, artifacts, or attendance, find a Meet link on today's calendar." })),
	event: Type.Optional(Type.String({ description: "For latest, artifacts, or attendance, find a matching Calendar event." })),
	calendarId: Type.Optional(Type.String({ description: "Calendar id for today/event lookup" })),
	conferenceRecord: Type.Optional(Type.String({ description: "Meet conferenceRecords/{id} resource name or id" })),
	pageSize: optionalPositiveIntegerSchema({ description: "Meet API page size for list actions" }),
	includeTranscriptEntries: Type.Optional(Type.Boolean({ description: "For artifacts, include structured transcript entries" })),
	includeDocumentBodies: Type.Optional(Type.Boolean({ description: "For artifacts/export, export linked transcript and smart-note Google Docs text through Drive." })),
	outputDir: Type.Optional(Type.String({ description: "For export, output directory" })),
	zip: Type.Optional(Type.Boolean({ description: "For export, also write a .zip archive" })),
	dryRun: Type.Optional(Type.Boolean({ description: "For export, return the manifest without writing files." })),
	includeAllConferenceRecords: Type.Optional(Type.Boolean({ description: "For artifacts, attendance, or export with meeting input, fetch all conference records instead of only the latest." })),
	mergeDuplicateParticipants: Type.Optional(Type.Boolean({ description: "For attendance, merge duplicate participant resources." })),
	lateAfterMinutes: optionalPositiveIntegerSchema({ description: "For attendance, mark participants late after this many minutes." }),
	earlyBeforeMinutes: optionalPositiveIntegerSchema({ description: "For attendance, mark early leavers before this many minutes." }),
	accessToken: Type.Optional(Type.String({ description: "Access token override" })),
	refreshToken: Type.Optional(Type.String({ description: "Refresh token override" })),
	clientId: Type.Optional(Type.String({ description: "OAuth client id override" })),
	clientSecret: Type.Optional(Type.String({ description: "OAuth client secret override" })),
	expiresAt: Type.Optional(Type.Number({ description: "Cached access token expiry ms" }))
});
//#endregion
//#region extensions/google-meet/index.ts
var google_meet_default = definePluginEntry({
	id: "google-meet",
	name: "Google Meet",
	description: "Join Google Meet calls through Chrome or Twilio transports",
	configSchema: googleMeetConfigSchema,
	register(api) {
		const config = googleMeetConfigSchema.parse(api.pluginConfig);
		const ensureRuntime = createGoogleMeetRuntimeAccessor({
			api,
			config
		});
		api.registerTranscriptSourceProvider(createMeetingTranscriptSourceProvider({
			id: "google-meet",
			aliases: ["googlemeet", "meet"],
			name: "Google Meet",
			runtime: async () => (await ensureRuntime()).transcriptSourceRuntime()
		}));
		api.registerGatewayMethod("googlemeet.join", async ({ params, client, respond }) => {
			try {
				const trustedParams = keepTrustedToolAgentId(asParamRecord(params), client);
				respond(true, await (await ensureRuntime()).join({
					url: resolveMeetingInput(config, trustedParams.url),
					transport: normalizeTransport(trustedParams.transport),
					mode: normalizeMode(trustedParams.mode),
					dialInNumber: normalizeOptionalString(trustedParams.dialInNumber),
					pin: normalizeOptionalString(trustedParams.pin),
					dtmfSequence: normalizeOptionalString(trustedParams.dtmfSequence),
					message: normalizeOptionalString(trustedParams.message),
					requesterSessionKey: normalizeOptionalString(trustedParams.requesterSessionKey),
					agentId: normalizeOptionalString(trustedParams.agentId)
				}));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.create", async ({ params, client, respond }) => {
			try {
				const raw = keepTrustedToolAgentId(asParamRecord(params), client);
				respond(true, shouldJoinCreatedMeet(raw) ? await createAndJoinMeetFromParams({
					config,
					runtime: api.runtime,
					raw,
					ensureRuntime
				}) : await createMeetFromParams({
					config,
					runtime: api.runtime,
					raw
				}));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.status", async ({ params, respond }) => {
			try {
				respond(true, await (await ensureRuntime()).status(normalizeOptionalString(params?.sessionId)));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.transcript", async ({ params, respond }) => {
			try {
				const sessionId = normalizeOptionalString(params?.sessionId);
				if (!sessionId) {
					sendGoogleMeetGatewayError(respond, /* @__PURE__ */ new Error("sessionId required"), ErrorCodes.INVALID_REQUEST);
					return;
				}
				const sinceIndex = params?.sinceIndex;
				if (sinceIndex !== void 0 && (typeof sinceIndex !== "number" || !Number.isSafeInteger(sinceIndex) || sinceIndex < 0)) {
					sendGoogleMeetGatewayError(respond, /* @__PURE__ */ new Error("sinceIndex must be a non-negative safe integer"), ErrorCodes.INVALID_REQUEST);
					return;
				}
				respond(true, await (await ensureRuntime()).transcript(sessionId, sinceIndex === void 0 ? {} : { sinceIndex }));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.recoverCurrentTab", async ({ params, respond }) => {
			try {
				respond(true, await (await ensureRuntime()).recoverCurrentTab({
					url: normalizeOptionalString(params?.url),
					transport: normalizeTransport(params?.transport)
				}));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.setup", async ({ params, respond }) => {
			try {
				respond(true, await (await ensureRuntime()).setupStatus({
					transport: normalizeTransport(params?.transport),
					mode: normalizeMode(params?.mode),
					dialInNumber: normalizeOptionalString(params?.dialInNumber)
				}));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.latest", async ({ params, respond }) => {
			try {
				const raw = asParamRecord(params);
				const token = await resolveGoogleMeetTokenFromParams(config, raw);
				const resolved = await resolveMeetingFromParams({
					config,
					raw,
					accessToken: token.accessToken
				});
				respond(true, {
					...await fetchLatestGoogleMeetConferenceRecord({
						accessToken: token.accessToken,
						meeting: resolved.meeting
					}),
					...resolved.calendarEvent ? { calendarEvent: resolved.calendarEvent } : {}
				});
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.calendarEvents", async ({ params, respond }) => {
			try {
				const raw = asParamRecord(params);
				const token = await resolveGoogleMeetTokenFromParams(config, raw);
				const window = raw.today === true ? buildGoogleMeetCalendarDayWindow() : {};
				respond(true, await listGoogleMeetCalendarEvents({
					accessToken: token.accessToken,
					calendarId: normalizeOptionalString(raw.calendarId),
					eventQuery: normalizeOptionalString(raw.event),
					...window
				}));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.artifacts", async ({ params, respond }) => {
			try {
				const raw = asParamRecord(params);
				const resolved = await resolveArtifactQueryFromParams(config, raw);
				respond(true, await fetchGoogleMeetArtifacts({
					accessToken: resolved.token.accessToken,
					meeting: resolved.meeting,
					conferenceRecord: resolved.conferenceRecord,
					pageSize: resolved.pageSize,
					includeTranscriptEntries: resolved.includeTranscriptEntries,
					includeDocumentBodies: resolved.includeDocumentBodies,
					allConferenceRecords: resolved.allConferenceRecords
				}));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.attendance", async ({ params, respond }) => {
			try {
				const raw = asParamRecord(params);
				const resolved = await resolveArtifactQueryFromParams(config, raw);
				respond(true, await fetchGoogleMeetAttendance({
					accessToken: resolved.token.accessToken,
					meeting: resolved.meeting,
					conferenceRecord: resolved.conferenceRecord,
					pageSize: resolved.pageSize,
					allConferenceRecords: resolved.allConferenceRecords,
					mergeDuplicateParticipants: resolved.mergeDuplicateParticipants,
					lateAfterMinutes: resolved.lateAfterMinutes,
					earlyBeforeMinutes: resolved.earlyBeforeMinutes
				}));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.export", async ({ params, respond }) => {
			try {
				respond(true, await exportGoogleMeetBundleFromParams(config, asParamRecord(params)));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.leave", async ({ params, respond }) => {
			try {
				const sessionId = normalizeOptionalString(params?.sessionId);
				if (!sessionId) {
					sendGoogleMeetGatewayError(respond, /* @__PURE__ */ new Error("sessionId required"), ErrorCodes.INVALID_REQUEST);
					return;
				}
				respond(true, await (await ensureRuntime()).leave(sessionId));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.endActiveConference", async ({ params, respond }) => {
			try {
				const raw = asParamRecord(params);
				respond(true, await endGoogleMeetActiveConference({
					accessToken: (await resolveGoogleMeetTokenFromParams(config, raw)).accessToken,
					meeting: resolveMeetingInput(config, raw.meeting)
				}));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.speak", async ({ params, respond }) => {
			try {
				const sessionId = normalizeOptionalString(params?.sessionId);
				if (!sessionId) {
					sendGoogleMeetGatewayError(respond, /* @__PURE__ */ new Error("sessionId required"), ErrorCodes.INVALID_REQUEST);
					return;
				}
				respond(true, await (await ensureRuntime()).speak(sessionId, normalizeOptionalString(params?.message)));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.testSpeech", async ({ params, client, respond }) => {
			try {
				const trustedParams = keepTrustedToolAgentId(asParamRecord(params), client);
				respond(true, await (await ensureRuntime()).testSpeech({
					url: resolveMeetingInput(config, trustedParams.url),
					transport: normalizeTransport(trustedParams.transport),
					mode: normalizeMode(trustedParams.mode),
					dialInNumber: normalizeOptionalString(trustedParams.dialInNumber),
					pin: normalizeOptionalString(trustedParams.pin),
					dtmfSequence: normalizeOptionalString(trustedParams.dtmfSequence),
					message: normalizeOptionalString(trustedParams.message),
					requesterSessionKey: normalizeOptionalString(trustedParams.requesterSessionKey),
					agentId: normalizeOptionalString(trustedParams.agentId)
				}));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerGatewayMethod("googlemeet.testListen", async ({ params, client, respond }) => {
			try {
				const trustedParams = keepTrustedToolAgentId(asParamRecord(params), client);
				respond(true, await (await ensureRuntime()).testListen({
					url: resolveMeetingInput(config, trustedParams.url),
					transport: normalizeTransport(trustedParams.transport),
					mode: normalizeMode(trustedParams.mode),
					agentId: normalizeOptionalString(trustedParams.agentId),
					timeoutMs: readPositiveIntegerParam(trustedParams, "timeoutMs")
				}));
			} catch (err) {
				sendGoogleMeetGatewayError(respond, err);
			}
		});
		api.registerTool((toolContext) => ({
			name: "google_meet",
			label: "Google Meet",
			description: "Join and track Google Meet sessions through Chrome or Twilio. Call setup_status before join/create/test_listen/test_speech; if it reports a Chrome node offline, local audio missing, or missing Twilio dial plan, surface that blocker instead of retrying or switching transports. Twilio cannot dial a Meet URL directly: provide dialInNumber plus optional pin/dtmfSequence, or configure twilio.defaultDialInNumber. Offline nodes are diagnostics only, not usable candidates. If local Chrome talk-back audio is unsupported on this OS, use mode=transcribe, transport=twilio, or a macOS chrome-node for agent/bidi Chrome. If a Meet tab is already open after a timeout, call recover_current_tab before retrying join to report login, permission, or admission blockers without opening another tab.",
			parameters: GoogleMeetToolSchema,
			async execute(_toolCallId, params) {
				const raw = asParamRecord(params);
				const requesterSessionKey = normalizeOptionalString(toolContext.sessionKey);
				const contextAgentId = toolContext.agentId ?? parseAgentSessionKey(requesterSessionKey)?.agentId;
				const agentId = contextAgentId ? normalizeAgentId(contextAgentId) : void 0;
				try {
					const needsTrustedAgentRouting = Boolean(agentId && agentId !== "main");
					const useTrustedRuntime = needsTrustedAgentRouting ? await api.runtime.gateway.isAvailable() : false;
					if (needsTrustedAgentRouting && !useTrustedRuntime) throw new Error("Per-agent Google Meet routing requires a Gateway-hosted agent run.");
					const rawWithRequester = {
						...raw,
						...requesterSessionKey ? { requesterSessionKey } : {},
						...useTrustedRuntime ? { agentId } : {}
					};
					assertGoogleMeetAgentToolActionSupported({
						config,
						raw
					});
					switch (raw.action) {
						case "join": return jsonResult(await callGoogleMeetGatewayFromTool({
							config,
							action: "join",
							raw: rawWithRequester,
							runtime: useTrustedRuntime ? api.runtime : void 0
						}));
						case "create": return jsonResult(await callGoogleMeetGatewayFromTool({
							config,
							action: "create",
							raw: rawWithRequester,
							runtime: useTrustedRuntime ? api.runtime : void 0
						}));
						case "test_speech": return jsonResult(await callGoogleMeetGatewayFromTool({
							config,
							action: "test_speech",
							raw: rawWithRequester,
							runtime: useTrustedRuntime ? api.runtime : void 0
						}));
						case "test_listen": return jsonResult(await callGoogleMeetGatewayFromTool({
							config,
							action: "test_listen",
							raw: rawWithRequester,
							runtime: useTrustedRuntime ? api.runtime : void 0
						}));
						case "status": return jsonResult(await callGoogleMeetGatewayFromTool({
							config,
							action: "status",
							raw
						}));
						case "transcript": return jsonResult(await callGoogleMeetGatewayFromTool({
							config,
							action: "transcript",
							raw
						}));
						case "recover_current_tab": return jsonResult(await callGoogleMeetGatewayFromTool({
							config,
							action: "recover_current_tab",
							raw
						}));
						case "setup_status": return jsonResult(await callGoogleMeetGatewayFromTool({
							config,
							action: "setup_status",
							raw
						}));
						case "resolve_space": {
							const { token: _token, ...result } = await resolveSpaceFromParams(config, raw);
							return jsonResult(result);
						}
						case "preflight": {
							const { meeting, token, space } = await resolveSpaceFromParams(config, raw);
							return jsonResult(buildGoogleMeetPreflightReport({
								input: meeting,
								space,
								previewAcknowledged: config.preview.enrollmentAcknowledged,
								tokenSource: token.refreshed ? "refresh-token" : "cached-access-token"
							}));
						}
						case "latest": {
							const token = await resolveGoogleMeetTokenFromParams(config, raw);
							const resolved = await resolveMeetingFromParams({
								config,
								raw,
								accessToken: token.accessToken
							});
							return jsonResult({
								...await fetchLatestGoogleMeetConferenceRecord({
									accessToken: token.accessToken,
									meeting: resolved.meeting
								}),
								...resolved.calendarEvent ? { calendarEvent: resolved.calendarEvent } : {}
							});
						}
						case "calendar_events": {
							const token = await resolveGoogleMeetTokenFromParams(config, raw);
							const window = raw.today === true ? buildGoogleMeetCalendarDayWindow() : {};
							return jsonResult(await listGoogleMeetCalendarEvents({
								accessToken: token.accessToken,
								calendarId: normalizeOptionalString(raw.calendarId),
								eventQuery: normalizeOptionalString(raw.event),
								...window
							}));
						}
						case "artifacts": {
							const resolved = await resolveArtifactQueryFromParams(config, raw);
							return jsonResult(await fetchGoogleMeetArtifacts({
								accessToken: resolved.token.accessToken,
								meeting: resolved.meeting,
								conferenceRecord: resolved.conferenceRecord,
								pageSize: resolved.pageSize,
								includeTranscriptEntries: resolved.includeTranscriptEntries,
								includeDocumentBodies: resolved.includeDocumentBodies,
								allConferenceRecords: resolved.allConferenceRecords
							}));
						}
						case "attendance": {
							const resolved = await resolveArtifactQueryFromParams(config, raw);
							return jsonResult(await fetchGoogleMeetAttendance({
								accessToken: resolved.token.accessToken,
								meeting: resolved.meeting,
								conferenceRecord: resolved.conferenceRecord,
								pageSize: resolved.pageSize,
								allConferenceRecords: resolved.allConferenceRecords,
								mergeDuplicateParticipants: resolved.mergeDuplicateParticipants,
								lateAfterMinutes: resolved.lateAfterMinutes,
								earlyBeforeMinutes: resolved.earlyBeforeMinutes
							}));
						}
						case "export": return jsonResult(await exportGoogleMeetBundleFromParams(config, raw));
						case "leave":
							if (!normalizeOptionalString(raw.sessionId)) throw new Error("sessionId required");
							return jsonResult(await callGoogleMeetGatewayFromTool({
								config,
								action: "leave",
								raw
							}));
						case "end_active_conference": return jsonResult(await callGoogleMeetGatewayFromTool({
							config,
							action: "end_active_conference",
							raw
						}));
						case "speak":
							if (!normalizeOptionalString(raw.sessionId)) throw new Error("sessionId required");
							return jsonResult(await callGoogleMeetGatewayFromTool({
								config,
								action: "speak",
								raw
							}));
						default: throw new Error("unknown google_meet action");
					}
				} catch (err) {
					return jsonResult(formatGoogleMeetGatewayError(err));
				}
			}
		}), { name: "google_meet" });
		api.registerNodeHostCommand({
			command: GOOGLE_MEET_CHROME_NODE_COMMAND,
			cap: "google-meet",
			dangerous: true,
			handle: handleGoogleMeetNodeHostCommand
		});
		api.registerNodeInvokePolicy(createGoogleMeetChromeNodeInvokePolicy(config));
		api.registerCli(async ({ program }) => {
			const { registerGoogleMeetCli } = await loadGoogleMeetCliModule();
			registerGoogleMeetCli({
				program,
				config,
				ensureRuntime
			});
		}, {
			commands: ["googlemeet"],
			descriptors: [GOOGLE_MEET_CLI_DESCRIPTOR]
		});
	}
});
//#endregion
export { testing as __testing, testing, google_meet_default as default };
