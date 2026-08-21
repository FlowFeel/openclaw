//#region packages/model-catalog-core/src/provider-model-id-normalization.d.ts
/** Manifest-defined normalization rules for one provider. */
type ManifestModelIdNormalizationProvider = {
  aliases?: Record<string, string>;
  stripPrefixes?: string[];
  prefixWhenBare?: string;
  prefixWhenBareAfterAliasStartsWith?: {
    modelPrefix: string;
    prefix: string;
  }[];
};
/** Manifest fragment that can define provider model-id normalization policies. */
type ManifestModelIdNormalizationRecord = {
  modelIdNormalization?: {
    providers?: Record<string, ManifestModelIdNormalizationProvider>;
  };
};
/** Collect provider model-id normalization policies from plugin manifests. */
declare function collectManifestModelIdNormalizationPolicies(plugins: readonly ManifestModelIdNormalizationRecord[]): Map<string, ManifestModelIdNormalizationProvider>;
/** Replace the process-local manifest normalization policy snapshot. */
declare function setCurrentManifestModelIdNormalizationRecords(plugins: readonly ManifestModelIdNormalizationRecord[] | undefined): void;
/** Strip a duplicated self-provider prefix from a model id. */
declare function stripSelfProviderModelPrefix(provider: string, model: string): string;
/** Apply manifest normalization policies for one provider/model id. */
declare function normalizeProviderModelIdWithPolicies(params: {
  provider: string;
  policies: ReadonlyMap<string, ManifestModelIdNormalizationProvider>;
  context: {
    modelId: string;
  };
}): string | undefined;
/** Apply built-in provider-specific model id normalization rules. */
declare function normalizeBuiltInProviderModelId(provider: string, model: string): string;
/** Apply manifest policies and built-in normalization to a static provider/model id. */
declare function normalizeStaticProviderModelIdWithPolicies(provider: string, model: string, policies?: ReadonlyMap<string, ManifestModelIdNormalizationProvider>): string;
/** Normalize a configured provider/model catalog reference using current policies. */
declare function normalizeConfiguredProviderCatalogModelId(provider: string, model: string, policies?: ReadonlyMap<string, ManifestModelIdNormalizationProvider> | undefined): string;
/** Normalize embedded Google model aliases inside provider/model catalog refs. */
declare function normalizeConfiguredProviderCatalogModelRef(providerModel: string): string;
//#endregion
export { ManifestModelIdNormalizationProvider, ManifestModelIdNormalizationRecord, collectManifestModelIdNormalizationPolicies, normalizeBuiltInProviderModelId, normalizeConfiguredProviderCatalogModelId, normalizeConfiguredProviderCatalogModelRef, normalizeProviderModelIdWithPolicies, normalizeStaticProviderModelIdWithPolicies, setCurrentManifestModelIdNormalizationRecords, stripSelfProviderModelPrefix };