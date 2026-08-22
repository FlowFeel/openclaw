import { t as buildXaiWebSearchProviderBase } from "../../web-search-provider-shared-D2fYJW7f.js";
//#region extensions/xai/web-search-contract-api.ts
function createXaiWebSearchProvider() {
	return {
		...buildXaiWebSearchProviderBase(),
		createTool: () => null
	};
}
//#endregion
export { createXaiWebSearchProvider };
