import { a as normalizeLowercaseStringOrEmpty, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { i as normalizeMessageChannel } from "./message-channel-normalize-Bmutiks_.js";
import "./message-channel-1n7hD5_u.js";
import { et as resolveLoadedSessionThreadInfo } from "./session-entry-slot-keys-DR5d2mKt.js";
//#region src/config/sessions/reset.ts
const GROUP_SESSION_MARKERS = [":group:", ":channel:"];
/** Returns true when a session key is known to represent a thread. */
function isThreadSessionKey(sessionKey) {
	return Boolean(resolveLoadedSessionThreadInfo(sessionKey).threadId);
}
function resolveSessionResetType(params) {
	if (params.isThread || isThreadSessionKey(params.sessionKey)) return "thread";
	if (params.isGroup) return "group";
	const normalized = normalizeLowercaseStringOrEmpty(params.sessionKey);
	if (GROUP_SESSION_MARKERS.some((marker) => normalized.includes(marker))) return "group";
	return "direct";
}
function resolveThreadFlag(params) {
	if (params.messageThreadId != null) return true;
	if (params.threadLabel?.trim()) return true;
	if (params.threadStarterBody?.trim()) return true;
	if (params.parentSessionKey?.trim()) return true;
	return isThreadSessionKey(params.sessionKey);
}
function resolveChannelResetConfig(params) {
	const resetByChannel = params.sessionCfg?.resetByChannel;
	if (!resetByChannel) return;
	const normalized = normalizeMessageChannel(params.channel);
	const fallback = normalizeOptionalLowercaseString(params.channel);
	const key = normalized ?? fallback;
	if (!key) return;
	return resetByChannel[key];
}
//#endregion
export { resolveSessionResetType as n, resolveThreadFlag as r, resolveChannelResetConfig as t };
