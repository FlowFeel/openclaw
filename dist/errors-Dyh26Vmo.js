import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-DW4mBlAt.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import "./error-runtime-Dbl9_3mW.js";
import "./string-coerce-runtime-CLK2YdzD.js";
//#region extensions/matrix/src/matrix/errors.ts
function formatMatrixErrorReason(err) {
	return normalizeLowercaseStringOrEmpty(formatErrorMessage(err));
}
function isMatrixNotFoundError(err) {
	const errObj = err;
	if (errObj?.statusCode === 404 || errObj?.body?.errcode === "M_NOT_FOUND") return true;
	const message = formatMatrixErrorReason(err);
	return message.includes("m_not_found") || message.includes("[404]") || message.includes("not found");
}
//#endregion
export { isMatrixNotFoundError as n, formatMatrixErrorReason as t };
