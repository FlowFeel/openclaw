import { n as buildGoogleStaticCatalogProvider, r as buildGoogleVertexStaticCatalogProvider } from "../../provider-catalog-DJmHVE1h.js";
import { r as resolveGoogleVertexConfigApiKey } from "../../vertex-adc-Bg7g4GCF.js";
//#region extensions/google/provider-discovery.ts
const googleProviderDiscovery = {
	id: "google",
	label: "Google AI Studio",
	docsPath: "/providers/models",
	auth: [],
	resolveConfigApiKey: ({ provider, env }) => provider === "google-vertex" ? resolveGoogleVertexConfigApiKey(env) : void 0,
	staticCatalog: {
		order: "simple",
		run: async () => ({ providers: {
			google: buildGoogleStaticCatalogProvider(),
			"google-vertex": buildGoogleVertexStaticCatalogProvider()
		} })
	}
};
//#endregion
export { googleProviderDiscovery as default };
