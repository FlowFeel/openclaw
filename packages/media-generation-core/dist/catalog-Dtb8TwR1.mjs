import { t as normalizeOptionalString } from "./string-coerce-BXaqR94J.mjs";
//#region packages/media-generation-core/src/string.ts
/** Return unique trimmed strings while preserving first-seen order. */
function uniqueTrimmedStrings(values) {
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	for (const value of values) {
		const normalized = normalizeOptionalString(value);
		if (!normalized || seen.has(normalized)) continue;
		seen.add(normalized);
		result.push(normalized);
	}
	return result;
}
//#endregion
//#region packages/media-generation-core/src/catalog.ts
/** Return unique configured models with default model first when present. */
function uniqueModels(provider) {
	return uniqueTrimmedStrings([provider.defaultModel, ...provider.models ?? []]);
}
/** Synthesize static catalog entries from provider metadata. */
function synthesizeMediaGenerationCatalogEntries(params) {
	const defaultModel = uniqueTrimmedStrings([params.provider.defaultModel])[0];
	return uniqueModels(params.provider).map((model) => {
		const modelCatalogEntry = params.provider.catalogByModel?.[model];
		const entry = {
			kind: params.kind,
			provider: params.provider.id,
			model,
			source: "static",
			capabilities: modelCatalogEntry?.capabilities ?? params.provider.capabilities
		};
		if (params.provider.label) entry.label = params.provider.label;
		if (model === defaultModel) entry.default = true;
		const modes = modelCatalogEntry?.modes ?? params.modes;
		if (modes) entry.modes = modes;
		return entry;
	});
}
/** Return unique model ids exposed by a media generation provider. */
function listMediaGenerationProviderModels(provider) {
	return uniqueModels(provider);
}
//#endregion
export { synthesizeMediaGenerationCatalogEntries as n, listMediaGenerationProviderModels as t };
