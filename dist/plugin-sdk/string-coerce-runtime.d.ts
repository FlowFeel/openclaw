import { a as normalizeFastMode, c as normalizeOptionalLowercaseString, f as normalizeStringifiedEntries, i as lowercasePreservingWhitespace, l as normalizeOptionalString, m as readStringValue, n as hasNonEmptyString, o as normalizeLowercaseStringOrEmpty, p as normalizeStringifiedOptionalString, r as localeLowercasePreservingWhitespace, s as normalizeNullableString, u as normalizeOptionalStringifiedId } from "../string-coerce-DJnd-JG-.js";
import { a as asRecord, i as asOptionalRecord, n as asNullableRecord, o as isRecord, s as readStringField } from "../record-coerce-BCQdFoCN.js";
import { a as asPositiveSafeInteger, d as parseStrictFiniteNumber, f as parseStrictInteger, i as asFiniteNumberInRange, m as parseStrictPositiveInteger, o as asSafeIntegerInRange, p as parseStrictNonNegativeInteger, r as asFiniteNumber, u as parseFiniteNumber } from "../number-coercion-DLWcU7C1.js";
import { _ as uniqueStrings, a as normalizeOptionalTrimmedStringList, c as normalizeSortedUniqueTrimmedStringList, d as normalizeTrimmedStringList, g as sortUniqueStrings, h as normalizeUniqueTrimmedStringList, i as normalizeHyphenSlug, l as normalizeStringEntries, n as normalizeAtHashSlug, o as normalizeSingleOrTrimmedStringList, p as normalizeUniqueStringEntries, u as normalizeStringEntriesLower, v as uniqueValues } from "../string-normalization-BUWquf-_.js";
import { t as summarizeStringEntries } from "../string-sample-D8vAF65F.js";

//#region src/utils/boolean.d.ts
/**
 * Shared boolean coercion helpers for config, env, and plugin SDK runtime inputs.
 *
 * `asBoolean` is intentionally strict; string parsing is opt-in through
 * `parseBooleanValue` so schema callers do not silently accept ambiguous text.
 */
/** Accepted string literals for boolean parsing beyond actual booleans. */
type BooleanParseOptions = {
  /** Lowercase string values that should parse as true. */truthy?: string[]; /** Lowercase string values that should parse as false. */
  falsy?: string[];
};
/** Returns only real boolean values and leaves boolean-like strings for explicit parsing. */
declare function asBoolean(value: unknown): boolean | undefined;
/** Parses booleans and configured string literals, returning undefined for ambiguous input. */
declare function parseBooleanValue(value: unknown, options?: BooleanParseOptions): boolean | undefined;
//#endregion
export { asBoolean, asFiniteNumber, asFiniteNumberInRange, asNullableRecord, asOptionalRecord, asPositiveSafeInteger, asRecord, asSafeIntegerInRange, hasNonEmptyString, isRecord, localeLowercasePreservingWhitespace, lowercasePreservingWhitespace, normalizeAtHashSlug, normalizeFastMode, normalizeHyphenSlug, normalizeLowercaseStringOrEmpty, normalizeNullableString, normalizeOptionalLowercaseString, normalizeOptionalString, normalizeOptionalStringifiedId, normalizeOptionalTrimmedStringList, normalizeSingleOrTrimmedStringList, normalizeSortedUniqueTrimmedStringList, normalizeStringEntries, normalizeStringEntriesLower, normalizeStringifiedEntries, normalizeStringifiedOptionalString, normalizeTrimmedStringList, normalizeUniqueStringEntries, normalizeUniqueTrimmedStringList, parseBooleanValue, parseFiniteNumber, parseStrictFiniteNumber, parseStrictInteger, parseStrictNonNegativeInteger, parseStrictPositiveInteger, readStringField, readStringValue, sortUniqueStrings, summarizeStringEntries, uniqueStrings, uniqueValues };