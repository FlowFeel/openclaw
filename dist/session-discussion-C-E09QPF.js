import { r as stripInboundMetadata } from "./strip-inbound-meta-BOGiSpdi.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { Fn as validateSessionDiscussionOpenParams, In as validateSessionDiscussionOpenResult, Nn as validateSessionDiscussionInfoParams, Pn as validateSessionDiscussionInfoResult } from "./src-BSn6va4B.js";
import { a as errorShape, s as formatValidationErrors } from "./error-codes-P4fBo0lR.js";
import { s as readSessionTitleFieldsFromTranscript } from "./session-utils-row-Cby7i9PV.js";
import { t as getSessionDiscussionProvider } from "./session-discussion-registry-CJLme7QY.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { a as maybeGenerateSessionTitle, n as hasExplicitSessionName } from "./dashboard-session-title-0E220cUn.js";
import { t as emitSessionsChanged } from "./session-change-event-DYHaHm0r.js";
import { a as loadAccessorSessionEntryForGatewayTarget } from "./sessions-shared-DxC0b9AR.js";
//#region src/gateway/server-methods/session-discussion.ts
const DISCUSSION_TITLE_TIMEOUT_MS = 1e4;
async function maybeGenerateTitleBeforeDiscussionOpen(params) {
	try {
		const cfg = params.context.getRuntimeConfig();
		const resolved = loadAccessorSessionEntryForGatewayTarget({
			cfg,
			key: params.sessionKey
		});
		const { entry } = resolved;
		const sessionId = entry?.sessionId;
		if (!entry || !sessionId || entry.systemSent === true || hasExplicitSessionName(entry)) return;
		const fields = readSessionTitleFieldsFromTranscript({
			agentId: resolved.target.agentId,
			sessionEntry: entry,
			sessionId,
			sessionKey: resolved.canonicalKey,
			storePath: resolved.storePath
		});
		const userMessage = fields.firstUserMessage ? stripInboundMetadata(fields.firstUserMessage).trim() : "";
		if (!userMessage) return;
		const titleRequest = maybeGenerateSessionTitle({
			cfg,
			agentId: resolved.target.agentId,
			entry,
			sessionId,
			sessionKey: resolved.canonicalKey,
			storePath: resolved.storePath,
			userMessage
		}).then(async (attempt) => {
			if (attempt.kind === "in-flight") {
				await attempt.settled.catch(() => {});
				return false;
			}
			return attempt.kind === "persisted";
		});
		let timeout;
		let persisted = false;
		try {
			persisted = await Promise.race([titleRequest.catch(() => false), new Promise((resolve) => {
				timeout = setTimeout(() => resolve(false), DISCUSSION_TITLE_TIMEOUT_MS);
				timeout.unref?.();
			})]);
		} finally {
			if (timeout) clearTimeout(timeout);
		}
		if (persisted) emitSessionsChanged(params.context, {
			sessionKey: resolved.canonicalKey,
			agentId: resolved.target.agentId,
			reason: "chat.title"
		});
	} catch {}
}
const sessionDiscussionHandlers = {
	"session.discussion.info": async ({ params, respond }) => {
		if (!assertValidParams(params, validateSessionDiscussionInfoParams, "session.discussion.info", respond)) return;
		const provider = getSessionDiscussionProvider();
		if (!provider) {
			respond(true, { state: "none" }, void 0);
			return;
		}
		try {
			const result = await provider.info({ sessionKey: params.sessionKey });
			if (!validateSessionDiscussionInfoResult(result)) {
				respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `invalid session.discussion.info result: ${formatValidationErrors(validateSessionDiscussionInfoResult.errors)}`));
				return;
			}
			respond(true, result, void 0);
		} catch (error) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, error instanceof Error ? error.message : "session discussion provider failed"));
		}
	},
	"session.discussion.open": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateSessionDiscussionOpenParams, "session.discussion.open", respond)) return;
		const provider = getSessionDiscussionProvider();
		if (!provider) {
			respond(true, { state: "none" }, void 0);
			return;
		}
		try {
			await maybeGenerateTitleBeforeDiscussionOpen({
				context,
				sessionKey: params.sessionKey
			});
			const result = await provider.open({ sessionKey: params.sessionKey });
			if (!validateSessionDiscussionOpenResult(result)) {
				respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `invalid session.discussion.open result: ${formatValidationErrors(validateSessionDiscussionOpenResult.errors)}`));
				return;
			}
			respond(true, result, void 0);
		} catch (error) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, error instanceof Error ? error.message : "session discussion provider failed"));
		}
	}
};
//#endregion
export { sessionDiscussionHandlers };
