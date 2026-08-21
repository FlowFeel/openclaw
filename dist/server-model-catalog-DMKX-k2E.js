import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { n as resolvePublishedModelCatalogOwner } from "./prepared-model-catalog-owner-qCUl7GW6.js";
//#region src/gateway/server-model-catalog.ts
async function resolveLoader(params) {
	if (params?.loadPublishedPreparedModelCatalogOwnerSnapshot) return params.loadPublishedPreparedModelCatalogOwnerSnapshot;
	const { loadPublishedPreparedModelCatalogOwnerSnapshot } = await import("./prepared-model-catalog-ClbAcHfK.js");
	return loadPublishedPreparedModelCatalogOwnerSnapshot;
}
async function resetPreparedModelCatalogForTest() {
	const [{ resetPreparedModelRuntimeSnapshotsForTest }, { resetModelCatalogBuilderCacheForTest }] = await Promise.all([import("./prepared-model-runtime.test-support-BYyBntIt.js"), import("./model-catalog-CcDInTyl.js")]);
	resetPreparedModelRuntimeSnapshotsForTest();
	resetModelCatalogBuilderCacheForTest();
}
async function loadGatewayModelCatalogOwnerSnapshot(params) {
	return resolvePublishedModelCatalogOwner(await (await resolveLoader(params))({
		...params?.agentId ? { agentId: params.agentId } : {},
		...params?.agentDir ? { agentDir: params.agentDir } : {},
		config: (params?.getConfig ?? getRuntimeConfig)(),
		readOnly: params?.readOnly !== false,
		...params?.workspaceDir ? { workspaceDir: params.workspaceDir } : {}
	}));
}
async function loadGatewayModelCatalogSnapshot(params) {
	const owner = await loadGatewayModelCatalogOwnerSnapshot(params);
	return {
		...owner.modelCatalog,
		agentId: owner.agentId,
		agentDir: owner.agentDir,
		workspaceDir: owner.workspaceDir,
		config: owner.config
	};
}
async function loadGatewayModelCatalog(params) {
	return (await loadGatewayModelCatalogSnapshot(params)).entries;
}
/** Reads the already-published startup catalog without starting provider discovery. */
async function readPreparedGatewayModelCatalog(params) {
	const { getPreparedModelCatalogSnapshot } = await import("./prepared-model-catalog-ClbAcHfK.js");
	const config = (params?.getConfig ?? getRuntimeConfig)();
	return getPreparedModelCatalogSnapshot({
		...params?.agentId ? { agentId: params.agentId } : {},
		...params?.agentDir ? { agentDir: params.agentDir } : {},
		config,
		readOnly: true,
		...params?.workspaceDir ? { workspaceDir: params.workspaceDir } : {}
	})?.entries;
}
//#endregion
export { resetPreparedModelCatalogForTest as i, loadGatewayModelCatalogSnapshot as n, readPreparedGatewayModelCatalog as r, loadGatewayModelCatalog as t };
