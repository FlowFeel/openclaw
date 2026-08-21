import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { Vt as validateLogsTailParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as readConfiguredLogTail } from "./log-tail-BoyZWrYh.js";
//#region src/gateway/server-methods/logs.ts
/** Gateway handler for bounded reads from the configured gateway log. */
const logsHandlers = { "logs.tail": async ({ params, respond }) => {
	if (!assertValidParams(params, validateLogsTailParams, "logs.tail", respond)) return;
	const p = params;
	try {
		respond(true, await readConfiguredLogTail({
			cursor: p.cursor,
			limit: p.limit,
			maxBytes: p.maxBytes
		}), void 0);
	} catch (err) {
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `log read failed: ${String(err)}`));
	}
} };
//#endregion
export { logsHandlers };
