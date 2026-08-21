import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
//#region src/gateway/session-plugin-ownership.ts
/** Plugin callers may access an existing session only when they own its exact row. */
function resolvePluginSessionOwnershipError(params) {
	const pluginOwnerId = normalizeOptionalString(params.pluginOwnerId);
	if (!pluginOwnerId || !params.entry || normalizeOptionalString(params.entry.pluginOwnerId) === pluginOwnerId) return;
	return errorShape(ErrorCodes.INVALID_REQUEST, `Plugin "${pluginOwnerId}" cannot ${params.action} session "${params.key}" because it did not create it.`);
}
//#endregion
export { resolvePluginSessionOwnershipError as t };
