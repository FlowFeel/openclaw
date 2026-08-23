import { p as WebSearchProviderPlugin } from "../../types-B3KbIvCl.js";
//#region extensions/brave/web-search-shared.d.ts
/** Build the common Brave provider metadata without the runtime tool executor. */
declare function buildBraveWebSearchProviderBase(): Omit<WebSearchProviderPlugin, "createTool">;
//#endregion
export { buildBraveWebSearchProviderBase };