import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString, u as normalizeOptionalThreadValue } from "./string-coerce-DW4mBlAt.js";
import { r as getLoadedChannelPluginForRead } from "./registry-loaded-DSocaiGy.js";
import { a as normalizeChannelId } from "./registry-DOSZ6AfI.js";
import "./plugins-DYLnGbXq.js";
//#region src/channels/plugins/target-parsing-loaded.ts
/** Preserves the shipped `parseExplicitTarget` SDK contract until its deprecation window ends. */
function resolveExplicitDeliveryTargetCompat(params) {
	const channel = normalizeLowercaseStringOrEmpty(params.channel);
	const rawTo = normalizeOptionalString(params.rawTarget);
	if (!channel || !rawTo) return null;
	const parsed = getLoadedChannelPluginForRead(normalizeChannelId(channel) ?? channel)?.messaging?.parseExplicitTarget?.({ raw: rawTo });
	return {
		channel,
		rawTo,
		to: parsed?.to ?? rawTo,
		threadId: normalizeOptionalThreadValue(parsed?.threadId ?? params.fallbackThreadId),
		chatType: parsed?.chatType
	};
}
//#endregion
export { resolveExplicitDeliveryTargetCompat as t };
