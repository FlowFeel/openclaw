import { n as GatewayErrorDetailCodes, t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { ar as validateSessionsCompanionResetParams, ir as validateSessionsCompanionAskParams, or as validateSessionsCompanionStateParams } from "./src-BSn6va4B.js";
import { a as errorShape, s as formatValidationErrors } from "./error-codes-P4fBo0lR.js";
import { t as SessionCompanionAskError } from "./session-companion-ask-DzZQiDnf.js";
//#region src/gateway/session-companion-rpc.ts
const sessionCompanionHandlers = {
	"sessions.companion.ask": async ({ params, respond, client, context }) => {
		if (!validateSessionsCompanionAskParams(params)) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `invalid sessions.companion.ask params: ${formatValidationErrors(validateSessionsCompanionAskParams.errors)}`));
			return;
		}
		const { sessionKey, question } = params;
		if (!question.trim()) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "question must contain non-whitespace text"));
			return;
		}
		if (!client?.connId) {
			respond(false, void 0, errorShape(ErrorCodes.FORBIDDEN, "Session companion asks require a connected client."));
			return;
		}
		if (!context.sessionCompanion) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "Session companion is unavailable."));
			return;
		}
		try {
			respond(true, await context.sessionCompanion.ask({
				sessionKey,
				question,
				connId: client.connId
			}));
		} catch (error) {
			if (!(error instanceof SessionCompanionAskError)) {
				respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "The session companion could not answer right now."));
				return;
			}
			if (error.reason === "busy") {
				respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, error.message, {
					details: { code: GatewayErrorDetailCodes.SESSION_COMPANION_BUSY },
					retryable: true
				}));
				return;
			}
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, error.message, {
				details: { reason: error.reason },
				retryable: error.reason === "rate-limited",
				...error.retryAfterMs ? { retryAfterMs: error.retryAfterMs } : {}
			}));
		}
	},
	"sessions.companion.state": ({ params, respond, context }) => {
		if (!validateSessionsCompanionStateParams(params)) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `invalid sessions.companion.state params: ${formatValidationErrors(validateSessionsCompanionStateParams.errors)}`));
			return;
		}
		if (!context.sessionCompanion) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "Session companion is unavailable."));
			return;
		}
		const { sessionKey } = params;
		respond(true, context.sessionCompanion.state(sessionKey));
	},
	"sessions.companion.reset": ({ params, respond, context }) => {
		if (!validateSessionsCompanionResetParams(params)) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `invalid sessions.companion.reset params: ${formatValidationErrors(validateSessionsCompanionResetParams.errors)}`));
			return;
		}
		if (!context.sessionCompanion) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "Session companion is unavailable."));
			return;
		}
		const { sessionKey } = params;
		context.sessionCompanion.reset(sessionKey);
		respond(true, { ok: true });
	}
};
//#endregion
export { sessionCompanionHandlers };
