import { AGENT_MODEL_CONFIG_KEYS, collectConfiguredModelRefValues, collectConfiguredModelRefs, listModelRefsFromConfigValue } from "./configured-model-refs.mjs";
import { a as normalizeLowercaseStringOrEmpty, i as normalizeProviderIdForAuth, n as findNormalizedProviderValue, r as normalizeProviderId, t as findNormalizedProviderKey } from "./provider-id-DqD-MNcQ.mjs";
import { n as normalizeModelCatalogProviderRows, t as normalizeModelCatalog } from "./model-catalog-normalize-8lpTUa28.mjs";
import { buildModelCatalogMergeKey, buildModelCatalogRef, isCloudModelRef, normalizeModelCatalogProviderId, parseModelCatalogRef, parseProviderModelRef } from "./model-catalog-refs.mjs";
import { MODEL_CATALOG_APIS, MODEL_CATALOG_THINKING_FORMATS, MODEL_CATALOG_THINKING_LEVELS, isModelCatalogThinkingFormat } from "./model-catalog-types.mjs";
import { normalizeAntigravityPreviewModelId, normalizeGooglePreviewModelId, normalizeTogetherModelId } from "./provider-model-id-normalize.mjs";
import { collectManifestModelIdNormalizationPolicies, normalizeBuiltInProviderModelId, normalizeConfiguredProviderCatalogModelId, normalizeConfiguredProviderCatalogModelRef, normalizeProviderModelIdWithPolicies, normalizeStaticProviderModelIdWithPolicies, setCurrentManifestModelIdNormalizationRecords, stripSelfProviderModelPrefix } from "./provider-model-id-normalization.mjs";
import { z } from "zod";
//#region packages/model-catalog-core/src/remote-catalog-bundle.ts
const REMOTE_CATALOG_MAX_FUTURE_SKEW_MS = 1440 * 6e4;
const stringMapSchema = z.record(z.string(), z.string());
const pricingTierSchema = z.object({
	input: z.number().finite().nonnegative(),
	output: z.number().finite().nonnegative(),
	cacheRead: z.number().finite().nonnegative(),
	cacheWrite: z.number().finite().nonnegative(),
	range: z.union([z.tuple([z.number().finite().nonnegative()]), z.tuple([z.number().finite().nonnegative(), z.number().finite().nonnegative()])])
}).strict();
const costSchema = z.object({
	input: z.number().finite().nonnegative().optional(),
	output: z.number().finite().nonnegative().optional(),
	cacheRead: z.number().finite().nonnegative().optional(),
	cacheWrite: z.number().finite().nonnegative().optional(),
	tieredPricing: z.array(pricingTierSchema).optional()
}).strict();
const hostedPricingSchema = z.object({
	input: z.number().finite().nonnegative(),
	output: z.number().finite().nonnegative(),
	cacheRead: z.number().finite().nonnegative().optional(),
	cacheWrite: z.number().finite().nonnegative().optional(),
	tieredPricing: z.array(pricingTierSchema).optional()
}).strict();
const modelSchema = z.object({
	id: z.string().trim().min(1),
	name: z.string().optional(),
	api: z.enum(MODEL_CATALOG_APIS).optional(),
	baseUrl: z.string().optional(),
	headers: stringMapSchema.optional(),
	input: z.array(z.enum([
		"text",
		"image",
		"document"
	])).optional(),
	reasoning: z.boolean().optional(),
	contextWindow: z.number().finite().positive().optional(),
	contextTokens: z.number().int().positive().optional(),
	maxTokens: z.number().finite().positive().optional(),
	thinkingLevelMap: z.partialRecord(z.enum(MODEL_CATALOG_THINKING_LEVELS), z.string().nullable()).optional(),
	cost: costSchema.optional(),
	compat: z.record(z.string(), z.unknown()).optional(),
	mediaInput: z.record(z.string(), z.unknown()).optional(),
	status: z.enum([
		"available",
		"preview",
		"deprecated",
		"disabled"
	]).optional(),
	statusReason: z.string().optional(),
	replaces: z.array(z.string()).optional(),
	replacedBy: z.string().optional(),
	tags: z.array(z.string()).optional()
});
const remoteModelCatalogProviderSchema = z.object({
	baseUrl: z.string().optional(),
	api: z.enum(MODEL_CATALOG_APIS).optional(),
	headers: stringMapSchema.optional(),
	defaultModel: z.string().optional(),
	defaultUtilityModel: z.string().optional(),
	models: z.array(modelSchema).min(1)
}).strict().superRefine((provider, context) => {
	const seen = /* @__PURE__ */ new Set();
	for (const [index, model] of provider.models.entries()) {
		if (seen.has(model.id)) context.addIssue({
			code: "custom",
			message: `duplicate model id: ${model.id}`,
			path: [
				"models",
				index,
				"id"
			]
		});
		seen.add(model.id);
	}
});
const remoteModelCatalogBundleSchema = z.object({
	schemaVersion: z.literal(1),
	generatedAt: z.number().int().positive().refine((value) => value <= Date.now() + REMOTE_CATALOG_MAX_FUTURE_SKEW_MS, { message: "generatedAt is implausibly far in the future" }),
	minVersion: z.string().trim().min(1).optional(),
	sourceCommit: z.string().trim().min(1),
	providers: z.record(z.string().trim().min(1), remoteModelCatalogProviderSchema),
	pricing: z.record(z.string().trim().min(1), hostedPricingSchema).optional()
}).strict();
function parseRemoteModelCatalogBundle(value) {
	return remoteModelCatalogBundleSchema.parse(value);
}
function stripRemoteTransportOverrides(value) {
	if (Array.isArray(value)) return value.map(stripRemoteTransportOverrides);
	if (!value || typeof value !== "object") return value;
	return Object.fromEntries(Object.entries(value).filter(([key]) => key !== "baseUrl" && key !== "headers").map(([key, entry]) => [key, stripRemoteTransportOverrides(entry)]));
}
/** Removes every transport endpoint/header override before remote data reaches persistence. */
function sanitizeRemoteModelCatalogBundle(bundle) {
	return stripRemoteTransportOverrides(bundle);
}
function validateAndSanitizeRemoteModelCatalogBundle(value) {
	return sanitizeRemoteModelCatalogBundle(parseRemoteModelCatalogBundle(value));
}
//#endregion
export { AGENT_MODEL_CONFIG_KEYS, MODEL_CATALOG_APIS, MODEL_CATALOG_THINKING_FORMATS, MODEL_CATALOG_THINKING_LEVELS, REMOTE_CATALOG_MAX_FUTURE_SKEW_MS, buildModelCatalogMergeKey, buildModelCatalogRef, collectConfiguredModelRefValues, collectConfiguredModelRefs, collectManifestModelIdNormalizationPolicies, findNormalizedProviderKey, findNormalizedProviderValue, isCloudModelRef, isModelCatalogThinkingFormat, listModelRefsFromConfigValue, normalizeAntigravityPreviewModelId, normalizeBuiltInProviderModelId, normalizeConfiguredProviderCatalogModelId, normalizeConfiguredProviderCatalogModelRef, normalizeGooglePreviewModelId, normalizeLowercaseStringOrEmpty, normalizeModelCatalog, normalizeModelCatalogProviderId, normalizeModelCatalogProviderRows, normalizeProviderId, normalizeProviderIdForAuth, normalizeProviderModelIdWithPolicies, normalizeStaticProviderModelIdWithPolicies, normalizeTogetherModelId, parseModelCatalogRef, parseProviderModelRef, parseRemoteModelCatalogBundle, remoteModelCatalogBundleSchema, remoteModelCatalogProviderSchema, sanitizeRemoteModelCatalogBundle, setCurrentManifestModelIdNormalizationRecords, stripSelfProviderModelPrefix, validateAndSanitizeRemoteModelCatalogBundle };
