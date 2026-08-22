import { t as definePluginEntry } from "../../plugin-entry-DjIG8BVe.js";
import { t as buildFalImageGenerationProvider } from "../../image-generation-provider-CMMQoSTP.js";
import { t as buildFalMusicGenerationProvider } from "../../music-generation-provider-DKnM5qvd.js";
import { t as createFalProvider } from "../../provider-registration-NLy_PIVq.js";
import { t as buildFalVideoGenerationProvider } from "../../video-generation-provider-60lzKDlr.js";
var fal_default = definePluginEntry({
	id: "fal",
	name: "fal Provider",
	description: "Bundled fal image, video, and music generation provider",
	register(api) {
		api.registerProvider(createFalProvider());
		api.registerImageGenerationProvider(buildFalImageGenerationProvider());
		api.registerMusicGenerationProvider(buildFalMusicGenerationProvider());
		api.registerVideoGenerationProvider(buildFalVideoGenerationProvider());
	}
});
//#endregion
export { fal_default as default };
