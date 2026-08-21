import { l as normalizeStringEntries } from "./string-normalization-CRyoFBPt.js";
import { s as normalizeThinkLevel } from "./thinking.shared-k6K-6JHM.js";
import "./thinking-CTxMHCzD.js";
import { i as sanitizeToolCallIdsForCloudCodeAssist } from "./tool-call-id-BrrPYNyX.js";
import { t as sanitizeContentBlocksImages } from "./tool-images-CQUX2dp-.js";
import "./errors-Bujrccyt.js";
import { r as isReasoningConstraintErrorMessage } from "./context-overflow-DNey-WOn.js";
import { o as stripThoughtSignatures } from "./bootstrap-DOyGG4hV.js";
//#region src/agents/embedded-agent-helpers/google.ts
/**
* Google/Gemini-specific embedded-agent runtime helpers.
*/
/** Detects Google-owned embedded runtime APIs. */
function isGoogleModelApi(api) {
	return api === "google-gemini-cli" || api === "google-generative-ai";
}
//#endregion
//#region src/agents/embedded-agent-helpers/images.ts
const EMPTY_CONTENT_PLACEHOLDER = "[empty content omitted]";
function dropEmptyTextBlocks(content) {
	return content.filter((block) => {
		if (!block || typeof block !== "object") return true;
		const rec = block;
		if (rec.type !== "text" || typeof rec.text !== "string") return true;
		return rec.text.trim().length > 0;
	});
}
function ensureNonEmptyContent(content) {
	if (content.length > 0) return content;
	return [{
		type: "text",
		text: EMPTY_CONTENT_PLACEHOLDER
	}];
}
/** Resize/remove unsafe image payloads while keeping transcript turns valid. */
async function sanitizeSessionMessagesImages(messages, label, options) {
	const allowNonImageSanitization = (options?.sanitizeMode ?? "full") === "full";
	const imageSanitization = {
		maxDimensionPx: options?.maxDimensionPx,
		maxBytes: options?.maxBytes
	};
	const sanitizedIds = options?.sanitizeToolCallIds === true ? sanitizeToolCallIdsForCloudCodeAssist(messages, options.toolCallIdMode, {
		preserveNativeAnthropicToolUseIds: options?.preserveNativeAnthropicToolUseIds,
		duplicateToolCallIdStyle: options?.duplicateToolCallIdStyle
	}) : messages;
	const out = [];
	for (const msg of sanitizedIds) {
		if (!msg || typeof msg !== "object") {
			out.push(msg);
			continue;
		}
		const role = msg.role;
		if (role === "toolResult") {
			const toolMsg = msg;
			const nextContent = await sanitizeContentBlocksImages(Array.isArray(toolMsg.content) ? toolMsg.content : [], label, imageSanitization);
			out.push({
				...toolMsg,
				content: ensureNonEmptyContent(dropEmptyTextBlocks(nextContent))
			});
			continue;
		}
		if (role === "user") {
			const userMsg = msg;
			const content = userMsg.content;
			if (Array.isArray(content)) {
				const nextContent = await sanitizeContentBlocksImages(content, label, imageSanitization);
				out.push({
					...userMsg,
					content: ensureNonEmptyContent(dropEmptyTextBlocks(nextContent))
				});
				continue;
			}
		}
		if (role === "assistant") {
			const assistantMsg = msg;
			if (assistantMsg.stopReason === "error") {
				const content = assistantMsg.content;
				if (Array.isArray(content)) {
					const finalContent = dropEmptyTextBlocks(await sanitizeContentBlocksImages(content, label, imageSanitization));
					if (finalContent.length > 0) out.push({
						...assistantMsg,
						content: finalContent
					});
				} else out.push(assistantMsg);
				continue;
			}
			const content = assistantMsg.content;
			if (Array.isArray(content)) {
				const strippedContent = options?.preserveSignatures ? content : stripThoughtSignatures(content, options?.sanitizeThoughtSignatures);
				if (!allowNonImageSanitization) {
					const nextContent = await sanitizeContentBlocksImages(dropEmptyTextBlocks(strippedContent), label, imageSanitization);
					if (nextContent.length > 0) out.push({
						...assistantMsg,
						content: nextContent
					});
					continue;
				}
				const finalContent = await sanitizeContentBlocksImages(dropEmptyTextBlocks(strippedContent), label, imageSanitization);
				if (finalContent.length === 0) continue;
				out.push({
					...assistantMsg,
					content: finalContent
				});
				continue;
			}
		}
		out.push(msg);
	}
	return out;
}
//#endregion
//#region src/agents/embedded-agent-helpers/thinking.ts
/**
* Resolves fallback thinking levels for providers that require reasoning.
*/
function extractSupportedValues(raw) {
	const match = raw.match(/supported values are:\s*([^\n.]+)/i) ?? raw.match(/supported values:\s*([^\n.]+)/i);
	if (!match?.[1]) return [];
	const fragment = match[1];
	const quoted = Array.from(fragment.matchAll(/['"]([^'"]+)['"]/g)).map((entry) => entry[1]?.trim());
	if (quoted.length > 0) return normalizeStringEntries(quoted.filter((entry) => Boolean(entry)));
	return normalizeStringEntries(fragment.split(/,|\band\b/gi).map((entry) => entry.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "")));
}
/** Pick a configured or provider-safe reasoning level for fallback attempts. */
function pickFallbackThinkingLevel(params) {
	const raw = params.message?.trim();
	if (!raw) return;
	if (isReasoningConstraintErrorMessage(raw) && !params.attempted.has("minimal")) return "minimal";
	const supported = extractSupportedValues(raw);
	if (supported.length === 0) {
		if (/not supported/i.test(raw) && !params.attempted.has("off")) return "off";
		return;
	}
	for (const entry of supported) {
		const normalized = normalizeThinkLevel(entry);
		if (!normalized) continue;
		if (params.attempted.has(normalized)) continue;
		return normalized;
	}
}
//#endregion
export { sanitizeSessionMessagesImages as n, isGoogleModelApi as r, pickFallbackThinkingLevel as t };
