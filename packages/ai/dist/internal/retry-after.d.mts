//#region packages/ai/src/internal/retry-after.d.ts
/** Parses the three HTTP-date forms accepted for Retry-After without Date.parse normalization. */
declare function parseRetryAfterHttpDateMs(value: string, nowMs?: number): number | undefined;
//#endregion
export { parseRetryAfterHttpDateMs };