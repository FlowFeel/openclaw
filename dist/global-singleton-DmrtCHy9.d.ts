//#region packages/normalization-core/src/utf16-slice.d.ts
/** Slices a UTF-16 string without returning dangling surrogate halves at either edge. */
declare function sliceUtf16Safe(input: string, start: number, end?: number): string;
/** Truncates a UTF-16 string without cutting a surrogate pair in half. */
declare function truncateUtf16Safe(input: string, maxLen: number): string;
//#endregion
//#region src/shared/global-singleton.d.ts
type GlobalSingletonLifecycle = "close-and-restart" | "close-only" | "plugin-registry";
type GlobalSingletonReset<T> = (value: T) => void | Promise<void>;
/** Resolves a process-local singleton for caches and registries that tolerate helper lookup. */
declare function resolveGlobalSingleton<T>(key: symbol, create: () => T, reset?: GlobalSingletonReset<T>, lifecycle?: GlobalSingletonLifecycle): T;
/** Resolves a process-local Map singleton for keyed caches backed by globalThis. */
declare function resolveGlobalMap<TKey, TValue>(key: symbol, reset?: GlobalSingletonLifecycle | GlobalSingletonReset<Map<TKey, TValue>>, lifecycle?: GlobalSingletonLifecycle): Map<TKey, TValue>;
//#endregion
export { truncateUtf16Safe as i, resolveGlobalSingleton as n, sliceUtf16Safe as r, resolveGlobalMap as t };