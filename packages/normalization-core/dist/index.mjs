import { hasNonEmptyString, localeLowercasePreservingWhitespace, lowercasePreservingWhitespace, normalizeFastMode, normalizeLowercaseStringOrEmpty, normalizeNullableString, normalizeOptionalLowercaseString, normalizeOptionalString, normalizeOptionalStringifiedId, normalizeOptionalThreadValue, normalizeStringifiedEntries, normalizeStringifiedOptionalString, readStringValue, resolvePrimaryStringValue } from "./string-coerce.mjs";
import { parseBoolean } from "./boolean-coercion.mjs";
import { CHARS_PER_TOKEN_ESTIMATE, estimateStringChars, estimateTokensFromChars } from "./cjk-chars.mjs";
import { formatErrorMessage, stringifyNonErrorCause, toErrorObject } from "./error-coercion.mjs";
import { expectDefined, first, last } from "./expect.mjs";
import { MAX_DATE_TIMESTAMP_MS, MAX_TIMER_TIMEOUT_MS, MAX_TIMER_TIMEOUT_SECONDS, UNIX_EPOCH_ISO_STRING, addTimerTimeoutGraceMs, asDateTimestampMs, asFiniteNumber, asFiniteNumberInRange, asPositiveSafeInteger, asSafeIntegerInRange, clampPositiveTimerTimeoutMs, clampTimerTimeoutMs, finiteSecondsToTimerSafeMilliseconds, isFutureDateTimestampMs, nonNegativeSecondsToSafeMilliseconds, parseFiniteNumber, parseStrictFiniteNumber, parseStrictInteger, parseStrictNonNegativeInteger, parseStrictPositiveInteger, positiveSecondsToSafeMilliseconds, resolveDateTimestampMs, resolveExpiresAtMsFromDurationMs, resolveExpiresAtMsFromDurationOrEpoch, resolveExpiresAtMsFromDurationSeconds, resolveExpiresAtMsFromEpochSeconds, resolveIntegerOption, resolveNonNegativeIntegerOption, resolveOptionalIntegerOption, resolvePositiveTimerTimeoutMs, resolveTimerTimeoutMs, resolveTimestampMsToIsoString, timestampMsToIsoFileStamp, timestampMsToIsoString } from "./number-coercion.mjs";
import { asNullableObjectRecord, asNullableRecord, asOptionalObjectRecord, asOptionalRecord, asRecord, isRecord, readStringField } from "./record-coerce.mjs";
import { stableStringify } from "./stable-stringify.mjs";
import { normalizeArrayBackedTrimmedStringList, normalizeAtHashSlug, normalizeCsvOrLooseStringList, normalizeHyphenSlug, normalizeOptionalTrimmedStringList, normalizeSingleOrTrimmedStringList, normalizeSortedUniqueStringEntries, normalizeSortedUniqueTrimmedStringList, normalizeStringEntries, normalizeStringEntriesLower, normalizeTrimmedStringList, normalizeUniqueSingleOrTrimmedStringList, normalizeUniqueStringEntries, normalizeUniqueStringEntriesLower, normalizeUniqueTrimmedStringList, sortUniqueStrings, uniqueStrings, uniqueValues } from "./string-normalization.mjs";
import { avoidTrailingHighSurrogateBreak, sliceUtf16Safe, truncateUtf16Safe } from "./utf16-slice.mjs";
//#region packages/normalization-core/src/format.ts
const BYTE_SIZE_UNITS = [
	"byte",
	"kilo",
	"mega",
	"giga",
	"tera"
];
const BYTE_SIZE_STYLES = {
	iec: {
		base: 1024,
		labels: [
			"B",
			"KiB",
			"MiB",
			"GiB",
			"TiB"
		]
	},
	"legacy-binary": {
		base: 1024,
		labels: [
			"B",
			"KB",
			"MB",
			"GB",
			"TB"
		]
	}
};
/** Buckets an absolute duration while preserving nested display rounding at unit boundaries. */
function bucketRelativeTimeMs(durationMs) {
	const seconds = Math.round(durationMs / 1e3);
	if (seconds < 60) return {
		value: seconds,
		unit: "second"
	};
	const minutes = Math.round(seconds / 60);
	if (minutes < 60) return {
		value: minutes,
		unit: "minute"
	};
	const hours = Math.round(minutes / 60);
	return hours < 48 ? {
		value: hours,
		unit: "hour"
	} : {
		value: Math.round(hours / 24),
		unit: "day"
	};
}
/** Formats a byte count with caller-explicit scale, labels, precision, and unit cap. */
function formatByteSize(bytes, options) {
	const { base, labels } = BYTE_SIZE_STYLES[options.style];
	const maxUnitIndex = BYTE_SIZE_UNITS.indexOf(options.maxUnit);
	let unitIndex = 0;
	let value = bytes;
	while (value >= base && unitIndex < maxUnitIndex) {
		value /= base;
		unitIndex += 1;
	}
	const unit = expectDefined(BYTE_SIZE_UNITS[unitIndex], "byte-size unit");
	const label = expectDefined(labels[unitIndex], "byte-size label");
	const fractionDigits = typeof options.fractionDigits === "function" ? options.fractionDigits(value, unit) : options.fractionDigits;
	if (fractionDigits === null) return `${value}${options.separator}${label}`;
	if (options.floorUnits?.includes(unit)) value = Math.floor(value * 10 ** fractionDigits) / 10 ** fractionDigits;
	return `${value.toFixed(fractionDigits)}${options.separator}${label}`;
}
//#endregion
//#region packages/normalization-core/src/json-coercion.ts
/** Parses JSON without throwing, returning undefined for invalid input. */
function safeParseJson(value) {
	try {
		return JSON.parse(value);
	} catch {
		return;
	}
}
//#endregion
//#region packages/normalization-core/src/text-decoding.ts
/** Decodes a byte prefix without inventing a replacement character for a cut trailing sequence. */
function decodeTextPrefix(bytes, options = {}) {
	return new TextDecoder(options.encoding).decode(bytes, options.truncated ? { stream: true } : void 0);
}
//#endregion
export { CHARS_PER_TOKEN_ESTIMATE, MAX_DATE_TIMESTAMP_MS, MAX_TIMER_TIMEOUT_MS, MAX_TIMER_TIMEOUT_SECONDS, UNIX_EPOCH_ISO_STRING, addTimerTimeoutGraceMs, asDateTimestampMs, asFiniteNumber, asFiniteNumberInRange, asNullableObjectRecord, asNullableRecord, asOptionalObjectRecord, asOptionalRecord, asPositiveSafeInteger, asRecord, asSafeIntegerInRange, avoidTrailingHighSurrogateBreak, bucketRelativeTimeMs, clampPositiveTimerTimeoutMs, clampTimerTimeoutMs, decodeTextPrefix, estimateStringChars, estimateTokensFromChars, expectDefined, finiteSecondsToTimerSafeMilliseconds, first, formatByteSize, formatErrorMessage, hasNonEmptyString, isFutureDateTimestampMs, isRecord, last, localeLowercasePreservingWhitespace, lowercasePreservingWhitespace, nonNegativeSecondsToSafeMilliseconds, normalizeArrayBackedTrimmedStringList, normalizeAtHashSlug, normalizeCsvOrLooseStringList, normalizeFastMode, normalizeHyphenSlug, normalizeLowercaseStringOrEmpty, normalizeNullableString, normalizeOptionalLowercaseString, normalizeOptionalString, normalizeOptionalStringifiedId, normalizeOptionalThreadValue, normalizeOptionalTrimmedStringList, normalizeSingleOrTrimmedStringList, normalizeSortedUniqueStringEntries, normalizeSortedUniqueTrimmedStringList, normalizeStringEntries, normalizeStringEntriesLower, normalizeStringifiedEntries, normalizeStringifiedOptionalString, normalizeTrimmedStringList, normalizeUniqueSingleOrTrimmedStringList, normalizeUniqueStringEntries, normalizeUniqueStringEntriesLower, normalizeUniqueTrimmedStringList, parseBoolean, parseFiniteNumber, parseStrictFiniteNumber, parseStrictInteger, parseStrictNonNegativeInteger, parseStrictPositiveInteger, positiveSecondsToSafeMilliseconds, readStringField, readStringValue, resolveDateTimestampMs, resolveExpiresAtMsFromDurationMs, resolveExpiresAtMsFromDurationOrEpoch, resolveExpiresAtMsFromDurationSeconds, resolveExpiresAtMsFromEpochSeconds, resolveIntegerOption, resolveNonNegativeIntegerOption, resolveOptionalIntegerOption, resolvePositiveTimerTimeoutMs, resolvePrimaryStringValue, resolveTimerTimeoutMs, resolveTimestampMsToIsoString, safeParseJson, sliceUtf16Safe, sortUniqueStrings, stableStringify, stringifyNonErrorCause, timestampMsToIsoFileStamp, timestampMsToIsoString, toErrorObject, truncateUtf16Safe, uniqueStrings, uniqueValues };
