import { c as normalizeOptionalString, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { i as normalizeModelCompat } from "./provider-model-compat-Rmx9B67o.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import "./provider-model-shared-DPyoH6xD.js";
import { n as normalizeXaiModelId } from "./model-id-h7ReinSn.js";
import { u as resolveXaiCatalogEntry } from "./model-definitions-DS2_tBMV.js";
import { t as applyXaiRuntimeModelCompat } from "./runtime-model-compat-BgO8mCto.js";
//#region extensions/xai/provider-models.ts
const XAI_MODERN_MODEL_PREFIXES = [
	"grok-4.5",
	"grok-build-0.1",
	"grok-4.3",
	"grok-4.20"
];
function isModernXaiModel(modelId) {
	const lower = normalizeOptionalLowercaseString(normalizeXaiModelId(modelId.trim())) ?? "";
	if (!lower || lower.includes("multi-agent")) return false;
	return XAI_MODERN_MODEL_PREFIXES.some((prefix) => lower.startsWith(prefix));
}
function resolveXaiForwardCompatModel(params) {
	const definition = resolveXaiCatalogEntry(params.ctx.modelId);
	if (!definition) return;
	return applyXaiRuntimeModelCompat(normalizeModelCompat({
		id: definition.id,
		name: definition.name,
		api: params.ctx.providerConfig?.api ?? "openai-responses",
		provider: params.providerId,
		baseUrl: normalizeOptionalString(params.ctx.providerConfig?.baseUrl) ?? "https://api.x.ai/v1",
		reasoning: definition.reasoning,
		input: definition.input,
		cost: definition.cost,
		contextWindow: definition.contextWindow,
		maxTokens: definition.maxTokens
	}));
}
function normalizeXaiResolvedModel(model) {
	const canonicalModelId = typeof model.params?.canonicalModelId === "string" ? model.params.canonicalModelId.trim() : void 0;
	return applyXaiRuntimeModelCompat(model.id === "auto" && canonicalModelId ? {
		...model,
		id: canonicalModelId
	} : model);
}
//#endregion
export { normalizeXaiResolvedModel as n, resolveXaiForwardCompatModel as r, isModernXaiModel as t };
