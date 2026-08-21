import { n as normalizeXaiModelId } from "./model-id-h7ReinSn.js";
import { u as resolveXaiCatalogEntry } from "./model-definitions-DS2_tBMV.js";
import { t as isXaiProviderId } from "./provider-id-D5RT5Els.js";
//#region extensions/xai/provider-policy-api.ts
function resolveThinkingProfile(ctx) {
	const reasoning = ctx.reasoning ?? resolveXaiCatalogEntry(ctx.modelId)?.reasoning;
	if (!isXaiProviderId(ctx.provider) || !reasoning) return {
		levels: [{ id: "off" }],
		defaultLevel: "off"
	};
	const modelId = normalizeXaiModelId(ctx.modelId.trim().toLowerCase());
	if (modelId === "grok-4.5" || modelId.startsWith("grok-4.5-")) return {
		levels: [
			{ id: "low" },
			{ id: "medium" },
			{ id: "high" }
		],
		defaultLevel: "high"
	};
	if (!(modelId === "grok-latest" || modelId === "grok-4.3" || modelId.startsWith("grok-4.3-"))) return {
		levels: [{ id: "off" }],
		defaultLevel: "off"
	};
	return {
		levels: [
			{ id: "off" },
			{ id: "minimal" },
			{ id: "low" },
			{ id: "medium" },
			{ id: "high" }
		],
		defaultLevel: "low"
	};
}
//#endregion
export { resolveThinkingProfile as t };
