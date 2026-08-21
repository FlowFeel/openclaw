import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as errorShape, s as formatValidationErrors } from "./error-codes-P4fBo0lR.js";
//#region src/gateway/server-methods/validation.ts
/** Validate params and emit the standard INVALID_REQUEST response on failure. */
function assertValidParams(params, validate, method, respond) {
	if (validate(params)) return true;
	respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `invalid ${method} params: ${formatValidationErrors(validate.errors)}`));
	return false;
}
//#endregion
export { assertValidParams as t };
