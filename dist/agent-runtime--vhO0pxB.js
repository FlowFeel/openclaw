import "./agent-scope-config-Dusa8eSA.js";
import "./agent-scope-DyEposw2.js";
import "./provider-auth-aliases-C6ORXz22.js";
import "./model-selection-shared-V7VmYFPH.js";
import "./codex-route-model-ref-BDwklqCa.js";
import "./model-auth-markers-z4js65k2.js";
import "./model-catalog-DhhEvlEZ.js";
import { n as loadPreparedModelCatalog, t as getPreparedModelCatalogSnapshot } from "./prepared-model-catalog-DJrhvpj1.js";
import "./common-yW0U9cHP.js";
import "./auth-profiles-67bIpdG9.js";
import "./model-auth-yfB4tyNY.js";
import "./model-thinking-default-BwLqoppi.js";
import "./model-selection-CZlE_kEq.js";
import "./embedded-agent-utils-Brq3aP9h.js";
import "./identity-DxC7SNFJ.js";
import "./tts-DJSjy-po.js";
import "./identity-avatar-QelBHHiY.js";
import "./agent-command-B1tYLNFt.js";
//#region src/plugin-sdk/agent-runtime.ts
/** @deprecated Use loadPreparedModelCatalog or getPreparedModelCatalogSnapshot. */
async function loadModelCatalog(params = {}) {
	const { agentId, agentDir, cacheOnly, config, env, readOnly, workspaceDir } = params;
	const preparedParams = {
		...agentId ? { agentId } : {},
		...agentDir ? { agentDir } : {},
		...config ? { config } : {},
		...env ? { env } : {},
		...readOnly !== void 0 ? { readOnly } : {},
		...workspaceDir ? { workspaceDir } : {}
	};
	if (cacheOnly) return getPreparedModelCatalogSnapshot(preparedParams)?.entries ?? [];
	return await loadPreparedModelCatalog(preparedParams);
}
//#endregion
export { loadModelCatalog as t };
