import { H as REALTIME_VOICE_AUDIO_FORMAT_PCM16_24KHZ, V as REALTIME_VOICE_AUDIO_FORMAT_G711_ULAW_8KHZ } from "./realtime-session-harness-bu55PsqP.js";
import "./realtime-voice-D6uheH7o.js";
import { _ as normalizeXaiRealtimeBaseUrl, b as resolveXaiRealtimeApiKey, g as hasXaiRealtimeApiKeyInput, i as XAI_REALTIME_DEFAULT_MODEL, m as XAI_REALTIME_VOICES, v as normalizeXaiRealtimeProviderConfig } from "./realtime-voice-config-CHBZDWwn.js";
import { t as XaiRealtimeVoiceBridge } from "./realtime-voice-bridge-3AB_2haZ.js";
//#region extensions/xai/realtime-voice-provider.ts
function buildXaiRealtimeVoiceProvider() {
	return {
		id: "xai",
		label: "xAI Grok Voice",
		aliases: ["xai-realtime-voice", "grok-voice"],
		defaultModel: XAI_REALTIME_DEFAULT_MODEL,
		voices: XAI_REALTIME_VOICES,
		autoSelectOrder: 25,
		capabilities: {
			transports: ["gateway-relay"],
			inputAudioFormats: [REALTIME_VOICE_AUDIO_FORMAT_G711_ULAW_8KHZ, REALTIME_VOICE_AUDIO_FORMAT_PCM16_24KHZ],
			outputAudioFormats: [REALTIME_VOICE_AUDIO_FORMAT_G711_ULAW_8KHZ, REALTIME_VOICE_AUDIO_FORMAT_PCM16_24KHZ],
			supportsBargeIn: true,
			handlesInputAudioBargeIn: true,
			supportsToolCalls: true,
			supportsSessionResumption: true
		},
		resolveConfig: ({ rawConfig }) => normalizeXaiRealtimeProviderConfig(rawConfig),
		isConfigured: ({ providerConfig, cfg }) => hasXaiRealtimeApiKeyInput(normalizeXaiRealtimeProviderConfig(providerConfig).apiKey, cfg),
		createBridge: (req) => {
			const config = normalizeXaiRealtimeProviderConfig(req.providerConfig);
			if (req.autoRespondToAudio === false) throw new Error("xAI realtime voice requires automatic server-VAD responses; use consultRouting: \"provider-direct\"");
			if ((req.interruptResponseOnInputAudio ?? config.interruptResponseOnInputAudio) === false) throw new Error("xAI realtime voice requires automatic server-VAD interruption handling");
			return new XaiRealtimeVoiceBridge({
				...req,
				apiKey: config.apiKey,
				baseUrl: normalizeXaiRealtimeBaseUrl(config.baseUrl),
				model: config.model,
				voice: config.voice,
				vadThreshold: config.vadThreshold,
				silenceDurationMs: config.silenceDurationMs,
				prefixPaddingMs: config.prefixPaddingMs,
				reasoningEffort: config.reasoningEffort,
				sessionResumption: config.sessionResumption,
				resolveApiKey: () => resolveXaiRealtimeApiKey(config.apiKey, req.cfg)
			});
		}
	};
}
//#endregion
export { buildXaiRealtimeVoiceProvider as t };
