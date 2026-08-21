import { a as prepareFullCatalogFacts, o as prepareWorkspaceBuildGroup, r as prepareAgentCatalogSource } from "./prepared-model-runtime.facts-BjVNdeA7.js";
//#region src/agents/prepared-model-runtime.scoped-catalog.ts
async function prepareScopedReadOnlyModelCatalogWithMode(input, providerDiscoveryProviderIds, catalogMode) {
	const { agentFacts, workspaceFacts } = await prepareWorkspaceBuildGroup([input.readOnly ? input : {
		...input,
		readOnly: true
	}], catalogMode, { providerDiscoveryProviderIds });
	const agentFactsForInput = agentFacts[0];
	if (!agentFactsForInput) throw new Error("scoped prepared model catalog facts are missing");
	return (await prepareFullCatalogFacts(agentFactsForInput, workspaceFacts, catalogMode, await prepareAgentCatalogSource(agentFactsForInput, workspaceFacts, catalogMode, false, catalogMode === "live" ? { providerDiscoveryProviderIds } : {}))).modelCatalog;
}
/** Builds a request-scoped read-only catalog without executing live provider discovery. */
function prepareScopedReadOnlyModelCatalog(input, providerDiscoveryProviderIds) {
	return prepareScopedReadOnlyModelCatalogWithMode(input, providerDiscoveryProviderIds, "static");
}
/** Builds a request-scoped read-only catalog with live discovery for selected providers. */
function prepareScopedReadOnlyLiveModelCatalog(input, providerDiscoveryProviderIds) {
	return prepareScopedReadOnlyModelCatalogWithMode(input, providerDiscoveryProviderIds, "live");
}
//#endregion
export { prepareScopedReadOnlyModelCatalog as n, prepareScopedReadOnlyLiveModelCatalog as t };
