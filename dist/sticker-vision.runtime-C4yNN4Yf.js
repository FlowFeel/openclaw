import { c as resolveAgentDir } from "./agent-scope-config-Dusa8eSA.js";
import { O as findModelInCatalog } from "./model-selection-shared-BDTPW9Jk.js";
import { w as resolveDefaultModelForAgent } from "./codex-route-model-ref-B7v0y8up.js";
import { a as modelSupportsVision } from "./model-catalog-B8e14jEf.js";
import { n as loadPreparedModelCatalog } from "./prepared-model-catalog-CdxSfQZ8.js";
import "./agent-runtime-CVIwE66V.js";
//#region extensions/telegram/src/sticker-vision.runtime.ts
async function resolveStickerVisionSupportRuntime(params) {
	const catalog = await loadPreparedModelCatalog({
		config: params.cfg,
		...params.agentId ? {
			agentId: params.agentId,
			agentDir: resolveAgentDir(params.cfg, params.agentId)
		} : {},
		readOnly: true
	});
	const defaultModel = resolveDefaultModelForAgent({
		cfg: params.cfg,
		agentId: params.agentId
	});
	const entry = findModelInCatalog(catalog, defaultModel.provider, defaultModel.model);
	if (!entry) return false;
	return modelSupportsVision(entry);
}
//#endregion
export { resolveStickerVisionSupportRuntime };
