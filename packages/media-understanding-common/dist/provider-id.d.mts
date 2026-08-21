//#region packages/media-understanding-common/src/provider-id.d.ts
/** Normalize provider aliases to canonical config provider ids. */
declare function normalizeMediaProviderId(id: string): string;
/** Normalize provider ids while preserving execution-specific regional aliases. */
declare function normalizeMediaExecutionProviderId(id: string): string;
//#endregion
export { normalizeMediaExecutionProviderId, normalizeMediaProviderId };