import { a as buildModelAliasIndex } from "./model-selection-shared-BDTPW9Jk.js";
import { w as resolveDefaultModelForAgent } from "./codex-route-model-ref-B7v0y8up.js";
import "./model-selection-4mvNeCA1.js";
//#region src/auto-reply/reply/directive-handling.defaults.ts
/** Resolve default provider/model plus alias index for directive parsing. */
function resolveDefaultModel(params) {
	const mainModel = resolveDefaultModelForAgent({
		cfg: params.cfg,
		agentId: params.agentId,
		allowPluginNormalization: false
	});
	const defaultProvider = mainModel.provider;
	return {
		defaultProvider,
		defaultModel: mainModel.model,
		aliasIndex: buildModelAliasIndex({
			cfg: params.cfg,
			defaultProvider,
			agentId: params.agentId,
			allowPluginNormalization: false
		})
	};
}
//#endregion
export { resolveDefaultModel as t };
