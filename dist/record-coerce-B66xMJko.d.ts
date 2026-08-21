//#region packages/normalization-core/src/record-coerce.d.ts
/** Type guard for non-array object records at browser-safe boundaries. */
declare function isRecord(value: unknown): value is Record<string, unknown>;
/** Returns a non-array record or undefined. */
declare function asOptionalRecord(value: unknown): Record<string, unknown> | undefined;
//#endregion
export { isRecord as n, asOptionalRecord as t };