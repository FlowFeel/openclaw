import { t as definePluginEntry } from "../../plugin-entry-DjIG8BVe.js";
import { t as buildFalImageGenerationProvider } from "../../image-generation-provider-BDC-DrKN.js";
import { t as buildFalMusicGenerationProvider } from "../../music-generation-provider-BnIjVGRQ.js";
import { t as createFalProvider } from "../../provider-registration-p6r5e0mX.js";
import { t as buildFalVideoGenerationProvider } from "../../video-generation-provider-BG5j3kFq.js";
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
