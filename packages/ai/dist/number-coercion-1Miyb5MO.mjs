//#region packages/normalization-core/src/number-coercion.ts
/** Returns a number only when the input is already finite. */
function asFiniteNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
/** Returns a finite number only when it satisfies the supplied inclusive/exclusive bounds. */
function asFiniteNumberInRange(value, range) {
	const number = asFiniteNumber(value);
	if (number === void 0) return;
	if (range.min !== void 0) {
		if (range.minExclusive ? number <= range.min : number < range.min) return;
	}
	if (range.max !== void 0) {
		if (range.maxExclusive ? number >= range.max : number > range.max) return;
	}
	return number;
}
function normalizeNumericString(value) {
	const trimmed = value.trim();
	return trimmed ? trimmed : void 0;
}
/** Parses only safe integer numbers or base-10 integer strings. */
function parseStrictInteger(value) {
	if (typeof value === "number") return Number.isSafeInteger(value) ? value : void 0;
	if (typeof value !== "string") return;
	const normalized = normalizeNumericString(value);
	if (!normalized || !/^[+-]?\d+$/.test(normalized)) return;
	const parsed = Number(normalized);
	return Number.isSafeInteger(parsed) ? parsed : void 0;
}
/** Parses only finite decimal/scientific string tokens, rejecting partial numbers. */
function parseStrictFiniteNumber(value) {
	if (typeof value === "number") return Number.isFinite(value) ? value : void 0;
	if (typeof value !== "string") return;
	const normalized = normalizeNumericString(value);
	if (!normalized || !/^[+-]?(?:(?:\d+\.?\d*)|(?:\.\d+))(?:e[+-]?\d+)?$/i.test(normalized)) return;
	const parsed = Number(normalized);
	return Number.isFinite(parsed) ? parsed : void 0;
}
/** Conservative upper bound for Node timer delays. */
const MAX_TIMER_TIMEOUT_MS = 2147e6;
/** Clamps finite millisecond values into the Node-safe timer range. */
function clampTimerTimeoutMs(valueMs, minMs = 1) {
	const value = asFiniteNumber(valueMs);
	if (value === void 0) return;
	return Math.min(Math.max(Math.floor(value), Math.max(1, Math.floor(minMs))), MAX_TIMER_TIMEOUT_MS);
}
/** Resolves arbitrary timeout input with fallback and minimum timer bounds. */
function resolveTimerTimeoutMs(valueMs, fallbackMs, minMs = 1) {
	const value = asFiniteNumber(valueMs) ?? asFiniteNumber(fallbackMs);
	const min = Math.max(0, Math.floor(minMs));
	if (value === void 0) return min;
	return Math.min(Math.max(Math.floor(value), min), MAX_TIMER_TIMEOUT_MS);
}
/** Parses strict positive integer values from numbers or strings. */
function parseStrictPositiveInteger(value) {
	const parsed = parseStrictInteger(value);
	return parsed !== void 0 && parsed > 0 ? parsed : void 0;
}
/** Parses strict non-negative integer values from numbers or strings. */
function parseStrictNonNegativeInteger(value) {
	const parsed = parseStrictInteger(value);
	return parsed !== void 0 && parsed >= 0 ? parsed : void 0;
}
//#endregion
export { parseStrictPositiveInteger as a, parseStrictNonNegativeInteger as i, clampTimerTimeoutMs as n, resolveTimerTimeoutMs as o, parseStrictFiniteNumber as r, asFiniteNumberInRange as t };
