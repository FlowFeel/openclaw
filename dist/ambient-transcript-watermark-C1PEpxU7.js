import { K as updateSessionEntry } from "./session-accessor-t3qUoTeV.js";
//#region src/config/sessions/ambient-transcript-watermark.ts
function resolveAmbientTranscriptWatermarkKey(scope) {
	return [
		"wat",
		scope.channel,
		scope.accountId ?? "",
		scope.conversationId,
		scope.threadId === void 0 ? "" : String(scope.threadId)
	].join(":");
}
/**
* Legacy JSON-composite key used before SL-14. Retained so pre-migration
* persisted watermarks (written under the JSON key) are still honored until
* they are overwritten under the new structured key.
*/
function resolveAmbientTranscriptWatermarkLegacyKey(scope) {
	return JSON.stringify([
		scope.channel,
		scope.accountId ?? "",
		scope.conversationId,
		scope.threadId === void 0 ? "" : String(scope.threadId)
	]);
}
function numericMessageId(value) {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : void 0;
}
function isAmbientTranscriptWatermarkAfter(next, current) {
	if (!current) return true;
	if (next.timestampMs !== void 0 && current.timestampMs !== void 0) {
		if (next.timestampMs !== current.timestampMs) return next.timestampMs > current.timestampMs;
		const nextMessageId = numericMessageId(next.messageId);
		const currentMessageId = numericMessageId(current.messageId);
		return nextMessageId !== void 0 && currentMessageId !== void 0 && nextMessageId > currentMessageId;
	}
	const nextMessageId = numericMessageId(next.messageId);
	const currentMessageId = numericMessageId(current.messageId);
	if (nextMessageId !== void 0 && currentMessageId !== void 0) return nextMessageId > currentMessageId;
	return next.messageId !== current.messageId;
}
function readAmbientTranscriptWatermark(entry, key, legacyKey) {
	if (!entry) return;
	const watermarks = entry.ambientTranscriptWatermarks;
	if (!watermarks) return;
	const matching = (candidate) => candidate?.sessionId === entry.sessionId ? candidate : void 0;
	const preferred = matching(watermarks[key]);
	if (preferred) return preferred;
	if (legacyKey && legacyKey !== key) return matching(watermarks[legacyKey]);
}
async function updateAmbientTranscriptWatermark(params) {
	return await updateSessionEntry({
		storePath: params.storePath,
		sessionKey: params.sessionKey
	}, (entry) => {
		if (!entry.sessionId) return null;
		if (params.expectedSessionId !== void 0 && entry.sessionId !== params.expectedSessionId) return null;
		const current = readAmbientTranscriptWatermark(entry, params.key, params.legacyKey);
		if (!isAmbientTranscriptWatermarkAfter({
			messageId: params.messageId,
			timestampMs: params.timestampMs
		}, current)) return null;
		return { ambientTranscriptWatermarks: {
			...entry.ambientTranscriptWatermarks,
			[params.key]: {
				sessionId: entry.sessionId,
				messageId: params.messageId,
				...params.timestampMs !== void 0 ? { timestampMs: params.timestampMs } : {},
				updatedAt: Date.now()
			}
		} };
	}, {
		skipMaintenance: true,
		takeCacheOwnership: true
	});
}
//#endregion
export { updateAmbientTranscriptWatermark as i, resolveAmbientTranscriptWatermarkKey as n, resolveAmbientTranscriptWatermarkLegacyKey as r, readAmbientTranscriptWatermark as t };
