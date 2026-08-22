//#region packages/model-catalog-core/src/model-catalog-refs.d.ts
type ModelCatalogRef = {
  provider: string;
  modelId: string;
};
type ProviderModelRef = {
  provider: string;
  model: string;
};
/** Recognizes one unambiguous hosted source suffix on a bare or qualified model ref. */
declare function isCloudModelRef(modelRef: string | undefined): boolean;
/** Normalize provider ids for catalog refs. */
declare function normalizeModelCatalogProviderId(provider: string): string;
/** Build a provider/model catalog reference. */
declare function buildModelCatalogRef(provider: string, modelId: string): string;
/** Parse a strict provider/model reference without normalizing either segment. */
declare function parseProviderModelRef(value: string): ProviderModelRef | null;
/** Parse a strict provider/model catalog reference. */
declare function parseModelCatalogRef(value: string): ModelCatalogRef | null;
/** Build a case-insensitive merge key for provider/model rows. */
declare function buildModelCatalogMergeKey(provider: string, modelId: string): string;
//#endregion
export { ModelCatalogRef, ProviderModelRef, buildModelCatalogMergeKey, buildModelCatalogRef, isCloudModelRef, normalizeModelCatalogProviderId, parseModelCatalogRef, parseProviderModelRef };