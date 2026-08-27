import "./agent-scope-config-Dusa8eSA.js";
import "./agent-scope-DyEposw2.js";
import "./provider-auth-aliases-BxGzIxtp.js";
import "./model-selection-shared-BDTPW9Jk.js";
import "./codex-route-model-ref-B7v0y8up.js";
import "./model-auth-markers-Co0rjfKm.js";
import "./model-catalog-B8e14jEf.js";
import { n as loadPreparedModelCatalog, t as getPreparedModelCatalogSnapshot } from "./prepared-model-catalog-CdxSfQZ8.js";
import "./common-RkLs-2lL.js";
import "./auth-profiles-9ILihU8J.js";
import "./model-auth-D-tc_3Dn.js";
import "./model-thinking-default-VKKhnMLC.js";
import "./model-selection-4mvNeCA1.js";
import "./embedded-agent-utils-BYrAMdPg.js";
import "./identity-DxC7SNFJ.js";
import "./tts-B6GGIXHP.js";
import "./identity-avatar-DEDjjlJG.js";
import "./agent-command-BoD6qpqv.js";
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
