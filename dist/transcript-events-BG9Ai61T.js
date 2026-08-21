import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { l as asPositiveSafeInteger } from "./number-coercion-Crk_c9KW.js";
import { r as resolveGlobalSet } from "./global-singleton-Dc_stLtU.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
//#region src/sessions/transcript-events.ts
const SESSION_TRANSCRIPT_LISTENERS = resolveGlobalSet(Symbol.for("openclaw.sessionTranscriptListeners"), "close-and-restart");
const INTERNAL_SESSION_TRANSCRIPT_LISTENERS = resolveGlobalSet(Symbol.for("openclaw.internalSessionTranscriptListeners"), "close-and-restart");
/** Registers a listener for normalized session transcript updates. */
function onSessionTranscriptUpdate(listener) {
	SESSION_TRANSCRIPT_LISTENERS.add(listener);
	return () => {
		SESSION_TRANSCRIPT_LISTENERS.delete(listener);
	};
}
/** Registers an internal listener for identity-only or file-backed transcript updates. */
function onInternalSessionTranscriptUpdate(listener) {
	INTERNAL_SESSION_TRANSCRIPT_LISTENERS.add(listener);
	return () => {
		INTERNAL_SESSION_TRANSCRIPT_LISTENERS.delete(listener);
	};
}
/** Emits a normalized transcript update to all registered listeners. */
function emitSessionTranscriptUpdate(update) {
	const nextUpdate = normalizeSessionTranscriptUpdate(update, { allowIdentityOnly: true });
	if (!nextUpdate) return;
	const publicUpdate = projectPublicSessionTranscriptUpdate(nextUpdate);
	if (publicUpdate) emitPublicSessionTranscriptUpdate(publicUpdate);
	emitInternalTranscriptUpdate(nextUpdate);
}
function normalizeSessionTranscriptUpdate(update, options) {
	const normalized = {
		sessionFile: update.sessionFile,
		target: update.target,
		sessionKey: update.sessionKey,
		agentId: update.agentId,
		sessionId: update.sessionId,
		lifecycleRevision: update.lifecycleRevision,
		message: update.message,
		messageId: update.messageId,
		messageSeq: update.messageSeq
	};
	const trimmed = normalizeOptionalString(normalized.sessionFile);
	const target = normalizeUpdateTarget(normalized);
	if (!trimmed && (!options.allowIdentityOnly || !target)) return;
	const messageSeq = asPositiveSafeInteger(normalized.messageSeq);
	const sessionKey = normalizeOptionalString(normalized.sessionKey) ?? target?.sessionKey;
	const agentId = normalizeOptionalString(normalized.agentId) ?? target?.agentId;
	const sessionId = normalizeOptionalString(normalized.sessionId) ?? target?.sessionId;
	const lifecycleRevision = normalizeOptionalString(normalized.lifecycleRevision);
	return {
		...trimmed ? { sessionFile: trimmed } : {},
		...target ? { target } : {},
		...sessionKey ? { sessionKey } : {},
		...agentId ? { agentId } : {},
		...sessionId ? { sessionId } : {},
		...lifecycleRevision ? { lifecycleRevision } : {},
		...normalized.message !== void 0 ? { message: normalized.message } : {},
		...normalizeOptionalString(normalized.messageId) ? { messageId: normalizeOptionalString(normalized.messageId) } : {},
		...messageSeq !== void 0 ? { messageSeq } : {}
	};
}
function emitPublicSessionTranscriptUpdate(nextUpdate) {
	for (const listener of SESSION_TRANSCRIPT_LISTENERS) try {
		listener(nextUpdate);
	} catch {}
}
function emitInternalTranscriptUpdate(nextUpdate) {
	for (const listener of INTERNAL_SESSION_TRANSCRIPT_LISTENERS) try {
		listener(nextUpdate);
	} catch {}
}
function projectPublicSessionTranscriptUpdate(update) {
	const target = update.target;
	if (!target) return;
	return {
		target: {
			agentId: target.agentId,
			sessionId: target.sessionId,
			sessionKey: target.sessionKey
		},
		...update.sessionKey ? { sessionKey: update.sessionKey } : {},
		...update.agentId ? { agentId: update.agentId } : {},
		...update.sessionId ? { sessionId: update.sessionId } : {},
		...update.message !== void 0 ? { message: update.message } : {},
		...update.messageId ? { messageId: update.messageId } : {},
		...update.messageSeq !== void 0 ? { messageSeq: update.messageSeq } : {}
	};
}
function normalizeUpdateTarget(update) {
	const sessionKey = normalizeOptionalString(update.target?.sessionKey) ?? normalizeOptionalString(update.sessionKey);
	const agentId = normalizeOptionalString(update.target?.agentId) ?? normalizeOptionalString(update.agentId) ?? (sessionKey ? parseAgentSessionKey(sessionKey)?.agentId : void 0);
	const sessionId = normalizeOptionalString(update.target?.sessionId) ?? normalizeOptionalString(update.sessionId);
	const storePath = normalizeOptionalString(update.target?.storePath);
	if (!agentId || !sessionId || !sessionKey) return;
	return {
		agentId,
		sessionId,
		sessionKey,
		...storePath ? { storePath } : {}
	};
}
//#endregion
export { onInternalSessionTranscriptUpdate as n, onSessionTranscriptUpdate as r, emitSessionTranscriptUpdate as t };
