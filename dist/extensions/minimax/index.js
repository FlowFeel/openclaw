import { t as definePluginEntry } from "../../plugin-entry-DjIG8BVe.js";
import { n as buildMinimaxPortalImageGenerationProvider, t as buildMinimaxImageGenerationProvider } from "../../image-generation-provider-BJIJgbqX.js";
import { n as minimaxPortalMediaUnderstandingProvider, t as minimaxMediaUnderstandingProvider } from "../../media-understanding-provider-BNBgUk2g.js";
import { n as buildMinimaxPortalMusicGenerationProvider, t as buildMinimaxMusicGenerationProvider } from "../../music-generation-provider-c_CLJDL0.js";
import { t as registerMinimaxProviders } from "../../provider-registration-CEUA0tt6.js";
import { t as buildMinimaxSpeechProvider } from "../../speech-provider-Bzi1GTRs.js";
import { t as createMiniMaxWebSearchProvider } from "../../minimax-web-search-provider-DQ_PtpK8.js";
import { n as buildMinimaxVideoGenerationProvider, t as buildMinimaxPortalVideoGenerationProvider } from "../../video-generation-provider-sG3Ay8uy.js";
//#region extensions/minimax/index.ts
var minimax_default = definePluginEntry({
	id: "minimax",
	name: "MiniMax",
	description: "Bundled MiniMax API-key and OAuth provider plugin",
	register(api) {
		registerMinimaxProviders(api);
		api.registerMediaUnderstandingProvider(minimaxMediaUnderstandingProvider);
		api.registerMediaUnderstandingProvider(minimaxPortalMediaUnderstandingProvider);
		api.registerImageGenerationProvider(buildMinimaxImageGenerationProvider());
		api.registerImageGenerationProvider(buildMinimaxPortalImageGenerationProvider());
		api.registerMusicGenerationProvider(buildMinimaxMusicGenerationProvider());
		api.registerMusicGenerationProvider(buildMinimaxPortalMusicGenerationProvider());
		api.registerVideoGenerationProvider(buildMinimaxVideoGenerationProvider());
		api.registerVideoGenerationProvider(buildMinimaxPortalVideoGenerationProvider());
		api.registerSpeechProvider(buildMinimaxSpeechProvider());
		api.registerWebSearchProvider(createMiniMaxWebSearchProvider());
	}
});
//#endregion
export { minimax_default as default };
