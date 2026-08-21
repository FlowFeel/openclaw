import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as errorShape, s as formatValidationErrors } from "./error-codes-P4fBo0lR.js";
import { t as formatForLog } from "./ws-log-B1D_Y86r.js";
//#region src/gateway/server-methods/nodes.helpers.ts
/** Responds with the protocol validation error for invalid method params. */
function respondInvalidParams(params) {
	params.respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `invalid ${params.method} params: ${formatValidationErrors(params.validator.errors)}`));
}
/** Converts thrown node-handler failures into `UNAVAILABLE` protocol errors. */
async function respondUnavailableOnThrow(respond, fn) {
	try {
		await fn();
	} catch (err) {
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatForLog(err)));
	}
}
/** Narrows successful node invoke results or responds with the node error details. */
function respondUnavailableOnNodeInvokeError(respond, res) {
	return respondUnavailableOnNodeInvokeErrorWithProvenance(respond, res);
}
function respondUnavailableOnNodeInvokeErrorWithProvenance(respond, res, provenance) {
	if (res.ok) return true;
	const nodeError = res.error && typeof res.error === "object" ? res.error : null;
	const nodeCode = normalizeOptionalString(nodeError?.code) ?? "";
	const nodeMessage = normalizeOptionalString(nodeError?.message) ?? "node invoke failed";
	const message = nodeCode ? `${nodeCode}: ${nodeMessage}` : nodeMessage;
	const details = {
		nodeError: res.error ?? null,
		...provenance ? { nodeCommandDispatched: provenance.nodeCommandDispatched } : {}
	};
	respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, message, { details }));
	return false;
}
//#endregion
export { respondUnavailableOnThrow as i, respondUnavailableOnNodeInvokeError as n, respondUnavailableOnNodeInvokeErrorWithProvenance as r, respondInvalidParams as t };
