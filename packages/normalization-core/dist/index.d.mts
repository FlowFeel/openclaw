import { parseBoolean } from "./boolean-coercion.mjs";
import { CHARS_PER_TOKEN_ESTIMATE, estimateStringChars, estimateTokensFromChars } from "./cjk-chars.mjs";
import { FormatErrorMessageOptions, formatErrorMessage, stringifyNonErrorCause, toErrorObject } from "./error-coercion.mjs";
import { expectDefined, first, last } from "./expect.mjs";
import { MAX_DATE_TIMESTAMP_MS, MAX_TIMER_TIMEOUT_MS, MAX_TIMER_TIMEOUT_SECONDS, UNIX_EPOCH_ISO_STRING, addTimerTimeoutGraceMs, asDateTimestampMs, asFiniteNumber, asFiniteNumberInRange, asPositiveSafeInteger, asSafeIntegerInRange, clampPositiveTimerTimeoutMs, clampTimerTimeoutMs, finiteSecondsToTimerSafeMilliseconds, isFutureDateTimestampMs, nonNegativeSecondsToSafeMilliseconds, parseFiniteNumber, parseStrictFiniteNumber, parseStrictInteger, parseStrictNonNegativeInteger, parseStrictPositiveInteger, positiveSecondsToSafeMilliseconds, resolveDateTimestampMs, resolveExpiresAtMsFromDurationMs, resolveExpiresAtMsFromDurationOrEpoch, resolveExpiresAtMsFromDurationSeconds, resolveExpiresAtMsFromEpochSeconds, resolveIntegerOption, resolveNonNegativeIntegerOption, resolveOptionalIntegerOption, resolvePositiveTimerTimeoutMs, resolveTimerTimeoutMs, resolveTimestampMsToIsoString, timestampMsToIsoFileStamp, timestampMsToIsoString } from "./number-coercion.mjs";
import { asNullableObjectRecord, asNullableRecord, asOptionalObjectRecord, asOptionalRecord, asRecord, isRecord, readStringField } from "./record-coerce.mjs";
import { stableStringify } from "./stable-stringify.mjs";
import { FastMode, hasNonEmptyString, localeLowercasePreservingWhitespace, lowercasePreservingWhitespace, normalizeFastMode, normalizeLowercaseStringOrEmpty, normalizeNullableString, normalizeOptionalLowercaseString, normalizeOptionalString, normalizeOptionalStringifiedId, normalizeOptionalThreadValue, normalizeStringifiedEntries, normalizeStringifiedOptionalString, readStringValue, resolvePrimaryStringValue } from "./string-coerce.mjs";
import { normalizeArrayBackedTrimmedStringList, normalizeAtHashSlug, normalizeCsvOrLooseStringList, normalizeHyphenSlug, normalizeOptionalTrimmedStringList, normalizeSingleOrTrimmedStringList, normalizeSortedUniqueStringEntries, normalizeSortedUniqueTrimmedStringList, normalizeStringEntries, normalizeStringEntriesLower, normalizeTrimmedStringList, normalizeUniqueSingleOrTrimmedStringList, normalizeUniqueStringEntries, normalizeUniqueStringEntriesLower, normalizeUniqueTrimmedStringList, sortUniqueStrings, uniqueStrings, uniqueValues } from "./string-normalization.mjs";
import { avoidTrailingHighSurrogateBreak, sliceUtf16Safe, truncateUtf16Safe } from "./utf16-slice.mjs";

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