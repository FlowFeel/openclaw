import { O as WebSearchProviderPlugin } from "../../types-DhsBnKIv.js";
//#region extensions/xai/web-search-provider-shared.d.ts
declare function buildXaiWebSearchProviderBase(): Omit<WebSearchProviderPlugin, "createTool" | "runSetup">;
//#endregion
export { buildXaiWebSearchProviderBase };