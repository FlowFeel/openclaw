import { ModelCatalog, ModelCatalogProvider, ModelCatalogSource, NormalizedModelCatalogRow } from "./model-catalog-types.mjs";

//#region packages/model-catalog-core/src/model-catalog-normalize.d.ts
/** Normalize a raw model catalog object for the set of providers owned by a plugin/manifest. */
declare function normalizeModelCatalog(value: unknown, params: {
  ownedProviders: ReadonlySet<string>;
}): ModelCatalog | undefined;
/** Normalize one provider catalog into sorted runtime rows. */
declare function normalizeModelCatalogProviderRows(params: {
  provider: string;
  providerCatalog: ModelCatalogProvider;
  source: ModelCatalogSource;
}): NormalizedModelCatalogRow[];
//#endregion
export { normalizeModelCatalog, normalizeModelCatalogProviderRows };