import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { a as publishSessionTranscriptUpdateByIdentity, m as withProjectedSessionTranscriptWriteLock } from "./session-transcript-runtime-DHJ9kAoW.js";
//#region src/plugin-sdk/codex-session-transcript-runtime.ts
/** Runs the bundled Codex mirror under the transcript writer lock. */
async function withCodexSessionTranscriptMirrorWriteLock(params, run) {
	return await withProjectedSessionTranscriptWriteLock(params, run, (context, locked) => ({
		...context,
		appendMessageWithMessageSequence: (options) => locked.appendMessageWithMessageSequence({
			...options,
			...params.config !== void 0 ? { config: params.config } : {}
		}),
		readMessageFacts: async (factParams) => {
			const facts = await locked.readMessageFacts(factParams);
			const messagesByIdempotencyKey = /* @__PURE__ */ new Map();
			for (const [idempotencyKey, message] of facts.messagesByIdempotencyKey) if (isAgentMessageRecord(message)) messagesByIdempotencyKey.set(idempotencyKey, message);
			return {
				...facts,
				messagesByIdempotencyKey
			};
		}
	}), publishSessionTranscriptUpdateByIdentity);
}
function isAgentMessageRecord(value) {
	return isRecord(value) && typeof value.role === "string" && value.role.trim().length > 0;
}
//#endregion
export { withCodexSessionTranscriptMirrorWriteLock as t };
