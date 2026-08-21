import { t as definePluginEntry } from "../../plugin-entry-DjIG8BVe.js";
import { r as resolvePluginConfigObject } from "../../plugin-config-runtime-D33X7huv.js";
import { r as buildProviderToolCompatFamilyHooks } from "../../provider-tools-mj-Qt8cY.js";
import { t as buildOpenAIImageGenerationProvider } from "../../image-generation-provider-DSwr9tgE.js";
import { t as openaiMediaUnderstandingProvider } from "../../media-understanding-provider-CC4xVY_A.js";
import { t as openAiMemoryEmbeddingProviderAdapter } from "../../memory-embedding-adapter-M6pEKFOW.js";
import { n as buildOpenAIProvider } from "../../openai-provider-DESXHQXO.js";
import { n as resolveOpenAISystemPromptContribution, t as resolveOpenAIPromptOverlayMode } from "../../prompt-overlay-CaLTQcad.js";
import { n as OPENAI_QUICKSILVER_OFFER_PATH } from "../../realtime-quicksilver-session-CWQ8YUV8.js";
import { n as releaseOpenAIQuicksilverBrowserSessionBroker, t as acquireOpenAIQuicksilverBrowserSessionBroker } from "../../realtime-quicksilver-session-owner-DX3hTqG-.js";
import { t as buildOpenAIRealtimeTranscriptionProvider } from "../../realtime-transcription-provider-yqnUvDP4.js";
import { t as buildOpenAIRealtimeVoiceProvider } from "../../realtime-voice-provider-Cd7GDzbN.js";
import { t as buildOpenAISpeechProvider } from "../../speech-provider-BGbQlNbM.js";
import { t as buildOpenAIVideoGenerationProvider } from "../../video-generation-provider-BB3EG9ro.js";
//#region extensions/openai/index.ts
var openai_default = definePluginEntry({
	id: "openai",
	name: "OpenAI Provider",
	description: "Bundled OpenAI provider plugins",
	register(api) {
		const quicksilverSession = api.registrationMode === "full" ? acquireOpenAIQuicksilverBrowserSessionBroker({
			getConfig: () => api.runtime.config.current(),
			logger: api.logger
		}) : void 0;
		if (quicksilverSession) {
			api.registerHttpRoute({
				path: OPENAI_QUICKSILVER_OFFER_PATH,
				auth: "plugin",
				match: "exact",
				handler: quicksilverSession.handler
			});
			api.lifecycle.registerRuntimeLifecycle({
				id: "openai-quicksilver-realtime-browser-session",
				description: "Close GPT-Live browser sidebands when the OpenAI plugin stops",
				cleanup: (ctx) => {
					if (ctx.reason !== "disable") return;
					return releaseOpenAIQuicksilverBrowserSessionBroker(quicksilverSession);
				}
			});
		}
		const openAIToolCompatHooks = buildProviderToolCompatFamilyHooks("openai");
		const buildProviderWithPromptContribution = (provider) => ({
			...provider,
			...openAIToolCompatHooks,
			resolveSystemPromptContribution: (ctx) => {
				const pluginConfig = resolvePluginConfigObject(ctx.config, "openai") ?? (ctx.config ? void 0 : api.pluginConfig);
				return resolveOpenAISystemPromptContribution({
					config: ctx.config,
					legacyPluginConfig: pluginConfig,
					mode: resolveOpenAIPromptOverlayMode(pluginConfig),
					modelProviderId: provider.id,
					modelId: ctx.modelId,
					trigger: ctx.trigger
				});
			}
		});
		api.registerProvider(buildProviderWithPromptContribution(buildOpenAIProvider()));
		api.registerMemoryEmbeddingProvider(openAiMemoryEmbeddingProviderAdapter);
		api.registerImageGenerationProvider(buildOpenAIImageGenerationProvider());
		api.registerRealtimeTranscriptionProvider(buildOpenAIRealtimeTranscriptionProvider());
		api.registerRealtimeVoiceProvider(buildOpenAIRealtimeVoiceProvider({
			quicksilverBrowserSessionBroker: quicksilverSession?.broker,
			logger: api.logger
		}));
		api.registerSpeechProvider(buildOpenAISpeechProvider());
		api.registerMediaUnderstandingProvider(openaiMediaUnderstandingProvider);
		api.registerVideoGenerationProvider(buildOpenAIVideoGenerationProvider());
	}
});
//#endregion
export { openai_default as default };
