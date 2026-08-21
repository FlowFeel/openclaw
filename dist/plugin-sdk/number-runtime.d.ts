import { A as resolveTimestampMsToIsoString, C as resolveExpiresAtMsFromDurationSeconds, D as resolveOptionalIntegerOption, E as resolveNonNegativeIntegerOption, O as resolvePositiveTimerTimeoutMs, S as resolveExpiresAtMsFromDurationOrEpoch, T as resolveIntegerOption, _ as parseStrictNonNegativeInteger, a as asDateTimestampMs, b as resolveDateTimestampMs, c as asSafeIntegerInRange, d as finiteSecondsToTimerSafeMilliseconds, f as isFutureDateTimestampMs, g as parseStrictInteger, h as parseStrictFiniteNumber, i as addTimerTimeoutGraceMs, j as timestampMsToIsoString, k as resolveTimerTimeoutMs, l as clampPositiveTimerTimeoutMs, m as parseFiniteNumber, n as MAX_TIMER_TIMEOUT_MS, p as nonNegativeSecondsToSafeMilliseconds, r as MAX_TIMER_TIMEOUT_SECONDS, s as asFiniteNumberInRange, t as MAX_DATE_TIMESTAMP_MS, u as clampTimerTimeoutMs, v as parseStrictPositiveInteger, w as resolveExpiresAtMsFromEpochSeconds, x as resolveExpiresAtMsFromDurationMs, y as positiveSecondsToSafeMilliseconds } from "../number-coercion-Bp6kiesx.js";

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
/** Formats a byte count with caller-explicit scale, labels, precision, and unit cap. */
declare function formatByteSize(bytes: number, options: ByteSizeFormatOptions): string;
//#endregion
//#region src/infra/tcp-port.d.ts
declare const MAX_TCP_PORT = 65535;
/** Parse a positive TCP port or return null for absent/invalid input. */
declare function parseTcpPort(raw: unknown): number | null;
//#endregion
export { MAX_DATE_TIMESTAMP_MS, MAX_TCP_PORT, MAX_TIMER_TIMEOUT_MS, MAX_TIMER_TIMEOUT_SECONDS, addTimerTimeoutGraceMs, asDateTimestampMs, asFiniteNumberInRange, asSafeIntegerInRange, clampPositiveTimerTimeoutMs, clampTimerTimeoutMs, finiteSecondsToTimerSafeMilliseconds, formatByteSize, isFutureDateTimestampMs, nonNegativeSecondsToSafeMilliseconds, parseFiniteNumber, parseStrictFiniteNumber, parseStrictInteger, parseStrictNonNegativeInteger, parseStrictPositiveInteger, parseTcpPort, positiveSecondsToSafeMilliseconds, resolveDateTimestampMs, resolveExpiresAtMsFromDurationMs, resolveExpiresAtMsFromDurationOrEpoch, resolveExpiresAtMsFromDurationSeconds, resolveExpiresAtMsFromEpochSeconds, resolveIntegerOption, resolveNonNegativeIntegerOption, resolveOptionalIntegerOption, resolvePositiveTimerTimeoutMs, resolveTimerTimeoutMs, resolveTimestampMsToIsoString, timestampMsToIsoString };