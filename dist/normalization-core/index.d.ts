import { a as normalizeFastMode, c as normalizeOptionalLowercaseString, d as normalizeOptionalThreadValue, f as normalizeStringifiedEntries, h as resolvePrimaryStringValue, i as lowercasePreservingWhitespace, l as normalizeOptionalString, m as readStringValue, n as hasNonEmptyString, o as normalizeLowercaseStringOrEmpty, p as normalizeStringifiedOptionalString, r as localeLowercasePreservingWhitespace, s as normalizeNullableString, t as FastMode, u as normalizeOptionalStringifiedId } from "../string-coerce-DJnd-JG-.js";
import { i as toErrorObject, n as formatErrorMessage, r as stringifyNonErrorCause, t as FormatErrorMessageOptions } from "../error-coercion-CMz4NpVo.js";
import { parseBoolean } from "./boolean-coercion.js";
import { CHARS_PER_TOKEN_ESTIMATE, estimateStringChars, estimateTokensFromChars } from "./cjk-chars.js";
import { expectDefined, first, last } from "./expect.js";
import { MAX_DATE_TIMESTAMP_MS, MAX_TIMER_TIMEOUT_MS, MAX_TIMER_TIMEOUT_SECONDS, UNIX_EPOCH_ISO_STRING, addTimerTimeoutGraceMs, asDateTimestampMs, asFiniteNumber, asFiniteNumberInRange, asPositiveSafeInteger, asSafeIntegerInRange, clampPositiveTimerTimeoutMs, clampTimerTimeoutMs, finiteSecondsToTimerSafeMilliseconds, isFutureDateTimestampMs, nonNegativeSecondsToSafeMilliseconds, parseFiniteNumber, parseStrictFiniteNumber, parseStrictInteger, parseStrictNonNegativeInteger, parseStrictPositiveInteger, positiveSecondsToSafeMilliseconds, resolveDateTimestampMs, resolveExpiresAtMsFromDurationMs, resolveExpiresAtMsFromDurationOrEpoch, resolveExpiresAtMsFromDurationSeconds, resolveExpiresAtMsFromEpochSeconds, resolveIntegerOption, resolveNonNegativeIntegerOption, resolveOptionalIntegerOption, resolvePositiveTimerTimeoutMs, resolveTimerTimeoutMs, resolveTimestampMsToIsoString, timestampMsToIsoFileStamp, timestampMsToIsoString } from "./number-coercion.js";
import { a as asRecord, i as asOptionalRecord, n as asNullableRecord, o as isRecord, r as asOptionalObjectRecord, s as readStringField, t as asNullableObjectRecord } from "../record-coerce-BCQdFoCN.js";
import { stableStringify } from "./stable-stringify.js";
import { normalizeArrayBackedTrimmedStringList, normalizeAtHashSlug, normalizeCsvOrLooseStringList, normalizeHyphenSlug, normalizeOptionalTrimmedStringList, normalizeSingleOrTrimmedStringList, normalizeSortedUniqueStringEntries, normalizeSortedUniqueTrimmedStringList, normalizeStringEntries, normalizeStringEntriesLower, normalizeTrimmedStringList, normalizeUniqueSingleOrTrimmedStringList, normalizeUniqueStringEntries, normalizeUniqueStringEntriesLower, normalizeUniqueTrimmedStringList, sortUniqueStrings, uniqueStrings, uniqueValues } from "./string-normalization.js";
import { n as sliceUtf16Safe, r as truncateUtf16Safe, t as avoidTrailingHighSurrogateBreak } from "../utf16-slice-DvSyDs5j.js";

//#region packages/normalization-core/src/format.d.ts
type ByteSizeUnit = "byte" | "kilo" | "mega" | "giga" | "tera";
type ByteSizeStyle = "iec" | "legacy-binary";
type ByteSizeFormatOptions = {
  style: ByteSizeStyle;
  maxUnit: ByteSizeUnit;
  separator: "" | " ";
  fractionDigits: number | ((value: number, unit: ByteSizeUnit) => number | null);
  floorUnits?: readonly ByteSizeUnit[];
};
type RelativeTimeUnit = "second" | "minute" | "hour" | "day";
/** Buckets an absolute duration while preserving nested display rounding at unit boundaries. */
declare function bucketRelativeTimeMs(durationMs: number): {
  value: number;
  unit: RelativeTimeUnit;
};
/** Formats a byte count with caller-explicit scale, labels, precision, and unit cap. */
declare function formatByteSize(bytes: number, options: ByteSizeFormatOptions): string;
//#endregion
//#region packages/normalization-core/src/json-coercion.d.ts
/** Parses JSON without throwing, returning undefined for invalid input. */
declare function safeParseJson(value: string): unknown;
//#endregion
//#region packages/normalization-core/src/text-decoding.d.ts
type DecodeTextPrefixOptions = {
  encoding?: string;
  truncated?: boolean;
};
/** Decodes a byte prefix without inventing a replacement character for a cut trailing sequence. */
declare function decodeTextPrefix(bytes: Uint8Array, options?: DecodeTextPrefixOptions): string;
//#endregion
export { CHARS_PER_TOKEN_ESTIMATE, DecodeTextPrefixOptions, FastMode, FormatErrorMessageOptions, MAX_DATE_TIMESTAMP_MS, MAX_TIMER_TIMEOUT_MS, MAX_TIMER_TIMEOUT_SECONDS, RelativeTimeUnit, UNIX_EPOCH_ISO_STRING, addTimerTimeoutGraceMs, asDateTimestampMs, asFiniteNumber, asFiniteNumberInRange, asNullableObjectRecord, asNullableRecord, asOptionalObjectRecord, asOptionalRecord, asPositiveSafeInteger, asRecord, asSafeIntegerInRange, avoidTrailingHighSurrogateBreak, bucketRelativeTimeMs, clampPositiveTimerTimeoutMs, clampTimerTimeoutMs, decodeTextPrefix, estimateStringChars, estimateTokensFromChars, expectDefined, finiteSecondsToTimerSafeMilliseconds, first, formatByteSize, formatErrorMessage, hasNonEmptyString, isFutureDateTimestampMs, isRecord, last, localeLowercasePreservingWhitespace, lowercasePreservingWhitespace, nonNegativeSecondsToSafeMilliseconds, normalizeArrayBackedTrimmedStringList, normalizeAtHashSlug, normalizeCsvOrLooseStringList, normalizeFastMode, normalizeHyphenSlug, normalizeLowercaseStringOrEmpty, normalizeNullableString, normalizeOptionalLowercaseString, normalizeOptionalString, normalizeOptionalStringifiedId, normalizeOptionalThreadValue, normalizeOptionalTrimmedStringList, normalizeSingleOrTrimmedStringList, normalizeSortedUniqueStringEntries, normalizeSortedUniqueTrimmedStringList, normalizeStringEntries, normalizeStringEntriesLower, normalizeStringifiedEntries, normalizeStringifiedOptionalString, normalizeTrimmedStringList, normalizeUniqueSingleOrTrimmedStringList, normalizeUniqueStringEntries, normalizeUniqueStringEntriesLower, normalizeUniqueTrimmedStringList, parseBoolean, parseFiniteNumber, parseStrictFiniteNumber, parseStrictInteger, parseStrictNonNegativeInteger, parseStrictPositiveInteger, positiveSecondsToSafeMilliseconds, readStringField, readStringValue, resolveDateTimestampMs, resolveExpiresAtMsFromDurationMs, resolveExpiresAtMsFromDurationOrEpoch, resolveExpiresAtMsFromDurationSeconds, resolveExpiresAtMsFromEpochSeconds, resolveIntegerOption, resolveNonNegativeIntegerOption, resolveOptionalIntegerOption, resolvePositiveTimerTimeoutMs, resolvePrimaryStringValue, resolveTimerTimeoutMs, resolveTimestampMsToIsoString, safeParseJson, sliceUtf16Safe, sortUniqueStrings, stableStringify, stringifyNonErrorCause, timestampMsToIsoFileStamp, timestampMsToIsoString, toErrorObject, truncateUtf16Safe, uniqueStrings, uniqueValues };