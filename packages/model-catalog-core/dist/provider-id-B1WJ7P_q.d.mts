//#region packages/normalization-core/src/string-coerce.d.ts
/** Lowercases a normalized string or returns an empty string when absent. */
declare function normalizeLowercaseStringOrEmpty(value: unknown): string;
//#endregion
//#region packages/model-catalog-core/src/provider-id.d.ts
declare function normalizeProviderId(provider: string): string;
/** Normalize provider ID before manifest-owned auth alias lookup. */
declare function normalizeProviderIdForAuth(provider: string): string;
declare function findNormalizedProviderValue<T>(entries: Record<string, T> | undefined, provider: string): T | undefined;
declare function findNormalizedProviderKey(entries: Record<string, unknown> | undefined, provider: string): string | undefined;
//#endregion
export { normalizeLowercaseStringOrEmpty as a, normalizeProviderIdForAuth as i, findNormalizedProviderValue as n, normalizeProviderId as r, findNormalizedProviderKey as t };