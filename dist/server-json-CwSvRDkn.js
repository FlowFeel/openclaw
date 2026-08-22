import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
//#region src/gateway/server-json.ts
/** Safely parses an optional JSON string, returning a payloadJSON wrapper on parse failure. */
function safeParseJson(value) {
	const trimmed = normalizeOptionalString(value);
	if (!trimmed) return;
	try {
		return JSON.parse(trimmed);
	} catch {
		return { payloadJSON: value };
	}
}
//#endregion
export { safeParseJson as t };
