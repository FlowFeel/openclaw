import { t as VideoGenerationProvider } from "../../video-generation-BH_Z_TNG.js";

//#region extensions/minimax/video-generation-provider.d.ts
declare function buildMinimaxVideoGenerationProvider(): VideoGenerationProvider;
declare function buildMinimaxPortalVideoGenerationProvider(): VideoGenerationProvider;
//#endregion
export { buildMinimaxPortalVideoGenerationProvider, buildMinimaxVideoGenerationProvider };