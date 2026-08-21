import { c as resolveAgentDir } from "./agent-scope-config-Dusa8eSA.js";
import { O as findModelInCatalog } from "./model-selection-shared-V7VmYFPH.js";
import { w as resolveDefaultModelForAgent } from "./codex-route-model-ref-BDwklqCa.js";
import { a as modelSupportsVision } from "./model-catalog-DhhEvlEZ.js";
import { n as loadPreparedModelCatalog } from "./prepared-model-catalog-DJrhvpj1.js";
import "./agent-runtime--vhO0pxB.js";
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
