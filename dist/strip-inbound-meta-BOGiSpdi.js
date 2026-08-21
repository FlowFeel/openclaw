import { n as MESSAGE_TOOL_DELIVERY_HINTS } from "./message-tool-delivery-hints-8OSBEg_c.js";
//#region src/auto-reply/reply/inbound-context-marker.ts
/**
* Provenance marker appended to every OpenClaw-injected inbound context header
* (see `buildInboundUserContextPrefix`). Strippers key on this marker rather
* than on label text so detection is label-agnostic and never collides with
* user-typed headings. Fixed (not per-turn random): strippers run on stored
* text with no out-of-band value, and forging it only strips the forger's own
* text — no trust boundary depends on it.
*
* Duplicated (never imported) in:
*   - extensions/memory-lancedb/memory-capture-sanitization.ts (extension boundary
*     forbids core imports)
*   - apps/shared/OpenClawKit/Sources/OpenClawChatUI/ChatMarkdownPreprocessor.swift, which spells the
*     same two code points as `\u{27E6}`/`\u{27E7}` escapes
* Keep every copy equal to this value; a drifted copy silently stops stripping.
*/
const INBOUND_CONTEXT_MARKER = "⟦openclaw:ctx⟧";
/** Appends the provenance marker to a context header label. */
function markInboundContextLabel(label) {
	return `${label} ${INBOUND_CONTEXT_MARKER}`;
}
//#endregion
//#region src/auto-reply/reply/strip-inbound-meta.ts
/**
* Strips OpenClaw-injected inbound metadata blocks from a user-role message
* text before it is displayed in any UI surface (TUI, webchat, macOS app) or
* replayed as historical context to the model.
*
* Background: `buildInboundUserContextPrefix` in `inbound-meta.ts` prepends
* structured metadata blocks (Conversation info, Sender info, reply context,
* etc.) directly to the stored user message content so the LLM can access
* them. These blocks are current-turn AI-facing context only and must never
* surface in user-visible chat history or accumulate in historical prompt
* replay.
*
* Also strips the timestamp prefix injected by `injectTimestamp` so UI surfaces
* do not show AI-facing envelope metadata as user text.
*
* Detection: every OpenClaw-injected context header is stamped with a fixed
* provenance marker `⟦openclaw:ctx⟧`. Strippers key on this marker rather than
* on label text, making detection label-agnostic (arbitrary structured labels
* are supported) and collision-free (user text never carries the marker). This
* fixes both label collision risks (e.g., `Sender:` in natural prose) and the
* structured-context over-strip (arbitrary plugin labels are now recognized).
*/
const LEADING_TIMESTAMP_PREFIX_RE = /^\[[A-Za-z]{3} \d{4}-\d{2}-\d{2} \d{2}:\d{2}[^\]]*\] */;
const CHANNEL_CONTEXT_HEADER = `Context: ${INBOUND_CONTEXT_MARKER}`;
const ACTIVE_MEMORY_CONTEXT_HEADER = "Context:";
const ACTIVE_MEMORY_OPEN_TAG = "<active_memory_plugin>";
const ACTIVE_MEMORY_CLOSE_TAG = "</active_memory_plugin>";
function isInboundContextHeaderLine(line) {
	const t = line.trim();
	return t.length > 14 && t.endsWith("⟦openclaw:ctx⟧");
}
const SENTINEL_SUBSTRING_ALTERNATIVES = [INBOUND_CONTEXT_MARKER, ...MESSAGE_TOOL_DELIVERY_HINTS].map((sentinel) => sentinel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
const ACTIVE_MEMORY_HEADER_ESCAPED = ACTIVE_MEMORY_CONTEXT_HEADER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const SENTINEL_FAST_RE = new RegExp(`${SENTINEL_SUBSTRING_ALTERNATIVES}|^[ \t]*${ACTIVE_MEMORY_HEADER_ESCAPED}[ \t]*$`, "m");
/** Fast check for whether text contains any inbound metadata sentinel. */
function hasInboundMetadataSentinel(text) {
	return Boolean(text && SENTINEL_FAST_RE.test(text));
}
function isMessageToolDeliveryHintLine(line) {
	const trimmed = line.trim();
	return MESSAGE_TOOL_DELIVERY_HINTS.some((hint) => hint === trimmed);
}
function skipChatWindowContextBlock(lines, index) {
	let next = index + 1;
	while (next < lines.length && lines[next]?.trim() !== "") next++;
	while (next < lines.length && lines[next]?.trim() === "") next++;
	return next;
}
function restoreNeutralizedMarkdownFences(value) {
	if (typeof value === "string") return value.replaceAll("`​``", "```");
	if (Array.isArray(value)) return value.map((entry) => restoreNeutralizedMarkdownFences(entry));
	if (!value || typeof value !== "object") return value;
	return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, restoreNeutralizedMarkdownFences(entry)]));
}
function parseJsonObjectRecord(jsonText) {
	try {
		const parsed = JSON.parse(jsonText);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
		return parsed;
	} catch {
		return null;
	}
}
function parseInboundMetaBlock(lines, sentinelBase) {
	const markedSentinel = `${sentinelBase} ${INBOUND_CONTEXT_MARKER}`;
	for (let i = 0; i < lines.length; i++) {
		if (lines[i]?.trim() !== markedSentinel) continue;
		if (lines[i + 1]?.trim() !== "```json") return null;
		let end = i + 2;
		while (end < lines.length && lines[end]?.trim() !== "```") end += 1;
		if (end >= lines.length) return null;
		const jsonText = lines.slice(i + 2, end).join("\n").trim();
		if (!jsonText) return null;
		const parsed = parseJsonObjectRecord(jsonText);
		return parsed ? restoreNeutralizedMarkdownFences(parsed) : null;
	}
	return null;
}
function firstNonEmptyString(...values) {
	for (const value of values) {
		if (typeof value !== "string") continue;
		const trimmed = value.trim();
		if (trimmed) return trimmed;
	}
	return null;
}
function shouldStripTrailingContextBlock(lines, index) {
	return lines[index]?.trim() === CHANNEL_CONTEXT_HEADER;
}
function stripTrailingContextBlockSuffix(lines) {
	for (let i = 0; i < lines.length; i++) {
		if (!shouldStripTrailingContextBlock(lines, i)) continue;
		let end = i;
		while (end > 0 && lines[end - 1]?.trim() === "") end -= 1;
		return lines.slice(0, end);
	}
	return lines;
}
function stripActiveMemoryPromptPrefixBlocks(lines) {
	const result = [];
	for (let index = 0; index < lines.length; index += 1) {
		const line = lines.at(index);
		if (line === void 0) break;
		if (line.trim() === ACTIVE_MEMORY_CONTEXT_HEADER && lines[index + 1]?.trim() === ACTIVE_MEMORY_OPEN_TAG) {
			let closeIndex = -1;
			for (let probe = index + 2; probe < lines.length; probe += 1) if (lines[probe]?.trim() === ACTIVE_MEMORY_CLOSE_TAG) {
				closeIndex = probe;
				break;
			}
			if (closeIndex !== -1) {
				index = closeIndex;
				while (index + 1 < lines.length && lines[index + 1]?.trim() === "") index += 1;
				continue;
			}
		}
		result.push(line);
	}
	return result;
}
/**
* Remove all injected inbound metadata prefix blocks from `text`.
*
* Each block has the shape:
*
* ```
* <header-with-marker>
* ```json
* { … }
* ```
* ```
*
* Returns the original string reference unchanged when no metadata is present
* (fast path — zero allocation).
*/
/** Strips all injected inbound metadata blocks from user-visible text. */
function stripInboundMetadata(text) {
	if (!text) return text;
	const withoutTimestamp = text.replace(LEADING_TIMESTAMP_PREFIX_RE, "");
	if (!SENTINEL_FAST_RE.test(withoutTimestamp)) return withoutTimestamp;
	const strippedLeadingPrefixLines = stripActiveMemoryPromptPrefixBlocks(withoutTimestamp.split("\n"));
	const result = [];
	let inMetaBlock = false;
	let inFencedJson = false;
	for (let i = 0; i < strippedLeadingPrefixLines.length; i++) {
		const line = strippedLeadingPrefixLines.at(i);
		if (line === void 0) break;
		if (!inMetaBlock && shouldStripTrailingContextBlock(strippedLeadingPrefixLines, i)) break;
		if (!inMetaBlock && isMessageToolDeliveryHintLine(line)) continue;
		if (!inMetaBlock && isInboundContextHeaderLine(line)) {
			if (strippedLeadingPrefixLines[i + 1]?.trim() !== "```json") {
				i = skipChatWindowContextBlock(strippedLeadingPrefixLines, i) - 1;
				continue;
			}
			inMetaBlock = true;
			inFencedJson = false;
			continue;
		}
		if (inMetaBlock) {
			if (!inFencedJson && line.trim() === "```json") {
				inFencedJson = true;
				continue;
			}
			if (inFencedJson) {
				if (line.trim() === "```") {
					inMetaBlock = false;
					inFencedJson = false;
				}
				continue;
			}
			if (line.trim() === "") continue;
			inMetaBlock = false;
		}
		result.push(line);
	}
	return result.join("\n").replace(/^\n+/, "").replace(/\n+$/, "").replace(LEADING_TIMESTAMP_PREFIX_RE, "");
}
/** Strips only leading inbound metadata blocks while preserving later user text. */
function stripLeadingInboundMetadata(text) {
	if (!text || !SENTINEL_FAST_RE.test(text)) return text;
	const lines = stripActiveMemoryPromptPrefixBlocks(text.split("\n"));
	let index = 0;
	while (lines.at(index) === "") index++;
	const firstLine = lines.at(index);
	if (firstLine === void 0) return "";
	const strippedDeliveryHint = isMessageToolDeliveryHintLine(firstLine);
	while (true) {
		const line = lines.at(index);
		if (line === void 0 || !isMessageToolDeliveryHintLine(line)) break;
		index++;
		while (lines.at(index) === "") index++;
	}
	const firstContentLine = lines.at(index);
	if (firstContentLine === void 0) return "";
	if (!isInboundContextHeaderLine(firstContentLine)) return stripTrailingContextBlockSuffix(strippedDeliveryHint ? lines.slice(index) : lines).join("\n");
	while (index < lines.length) {
		const line = lines.at(index);
		if (line === void 0) break;
		if (!isInboundContextHeaderLine(line)) break;
		if (lines[index + 1]?.trim() !== "```json") {
			index = skipChatWindowContextBlock(lines, index);
			continue;
		}
		index++;
		if (lines.at(index)?.trim() === "```json") {
			index++;
			while (index < lines.length && lines.at(index)?.trim() !== "```") index++;
			if (lines.at(index)?.trim() === "```") index++;
		} else return text;
		while (lines.at(index)?.trim() === "") index++;
	}
	return stripTrailingContextBlockSuffix(lines.slice(index)).join("\n");
}
/** Extracts the sender label from injected inbound metadata when present. */
function extractInboundSenderLabel(text) {
	if (!text || !SENTINEL_FAST_RE.test(text)) return null;
	const lines = text.split("\n");
	const senderInfo = parseInboundMetaBlock(lines, "Sender:");
	const conversationSender = parseInboundMetaBlock(lines, "Conversation info:")?.sender;
	const conversationSenderFields = conversationSender && typeof conversationSender === "object" && !Array.isArray(conversationSender) ? [
		conversationSender["name"],
		conversationSender["username"],
		conversationSender["e164"],
		conversationSender["id"]
	] : [conversationSender];
	return firstNonEmptyString(senderInfo?.label, senderInfo?.name, senderInfo?.username, senderInfo?.e164, senderInfo?.id, ...conversationSenderFields);
}
//#endregion
export { INBOUND_CONTEXT_MARKER as a, stripLeadingInboundMetadata as i, hasInboundMetadataSentinel as n, markInboundContextLabel as o, stripInboundMetadata as r, extractInboundSenderLabel as t };
