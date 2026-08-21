import { o as truncateUtf16Safe } from "./tool-result-text-Dvkp2Dus.mjs";
//#region packages/ai/src/utils/provider-error.ts
const MAX_ERROR_BODY_LENGTH = 4e3;
function stringify(value) {
	const seen = /* @__PURE__ */ new WeakSet();
	try {
		return JSON.stringify(value, (_key, candidate) => {
			if (typeof candidate !== "object" || candidate === null) return candidate;
			if (seen.has(candidate)) return "[Circular]";
			seen.add(candidate);
			return candidate;
		}) ?? String(value);
	} catch {
		return String(value);
	}
}
function readStatus(error) {
	for (const value of [
		error.status,
		error.statusCode,
		error.response?.status,
		error.response?.statusCode
	]) if (typeof value === "number" && Number.isFinite(value)) return value;
}
function readBody(error) {
	for (const value of [
		error.body,
		error.error,
		error.response?.body,
		error.response?.data
	]) {
		if (value === void 0 || value === null) continue;
		if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) continue;
		const body = (typeof value === "string" ? value : stringify(value)).trim();
		if (body.length > 0) return body.length <= MAX_ERROR_BODY_LENGTH ? body : `${truncateUtf16Safe(body, MAX_ERROR_BODY_LENGTH)}... [truncated]`;
	}
}
function formatProviderError(error) {
	if (!(error instanceof Error)) return stringify(error);
	const httpError = error;
	const status = readStatus(httpError);
	const body = readBody(httpError);
	if (status === void 0 || body === void 0 || error.message.includes(body)) return error.message;
	return `${status}: ${body}`;
}
//#endregion
export { formatProviderError as t };
