import { t as definePluginEntry } from "../../plugin-entry-DjIG8BVe.js";
import { t as buildFalImageGenerationProvider } from "../../image-generation-provider-D8gEl5eB.js";
import { t as buildFalMusicGenerationProvider } from "../../music-generation-provider-BgwuYVB9.js";
import { t as createFalProvider } from "../../provider-registration-DLpz0VQ9.js";
import { t as buildFalVideoGenerationProvider } from "../../video-generation-provider-B6NUoWCA.js";
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
