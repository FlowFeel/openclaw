import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import "./utils-Bs67j6-3.js";
import { o as markInboundContextLabel } from "./strip-inbound-meta-BOGiSpdi.js";
import { o as isAudioFileName } from "./mime-Ir6g3Vae.js";
import { c as isMeaningfulMediaFact, d as readPersistedMediaFacts, l as normalizeMediaFacts } from "./media-facts-D_wLZOa9.js";
import { O as resolveProviderReasoningOutputModeWithPlugin } from "./provider-runtime-ByIbzpnW.js";
import { s as getMediaDir } from "./store-BDR50q7S.js";
import { i as normalizeInboundTextNewlines } from "./inbound-context-BIpjK7pv.js";
import path from "node:path";
//#region src/auto-reply/media-note.ts
/** Builds compact prompt notes for inbound media attachments. */
function stripDarwinPrivatePrefix(value) {
	return value.startsWith("/private/var/") ? value.slice(8) : value;
}
function normalizeManagedInboundMediaRef(value) {
	if (!path.isAbsolute(value)) return value;
	const mediaDir = stripDarwinPrivatePrefix(path.resolve(getMediaDir()));
	const candidate = stripDarwinPrivatePrefix(path.resolve(value));
	const inboundDir = path.join(mediaDir, "inbound");
	const relativeToInbound = path.relative(inboundDir, candidate);
	if (!relativeToInbound || relativeToInbound.startsWith("..") || path.isAbsolute(relativeToInbound)) return value;
	return `media://inbound/${path.basename(candidate)}`;
}
function sanitizeInlineMediaNoteValue(value) {
	const trimmed = value?.trim();
	if (!trimmed) return "";
	return normalizeManagedInboundMediaRef(trimmed).replace(/[\p{Cc}\]]+/gu, " ").replace(/\s+/g, " ").trim();
}
function formatMediaAttachedLine(params) {
	const prefix = typeof params.index === "number" && typeof params.total === "number" ? `[media attached ${params.index}/${params.total}: ` : "[media attached: ";
	const pathValue = sanitizeInlineMediaNoteValue(params.path);
	const typeRaw = sanitizeInlineMediaNoteValue(params.type);
	const typePart = typeRaw ? ` (${typeRaw})` : "";
	const urlRaw = sanitizeInlineMediaNoteValue(params.url);
	return `${prefix}${pathValue}${typePart}${urlRaw && urlRaw !== pathValue ? ` | ${urlRaw}` : ""}]`;
}
const AUDIO_EXTENSIONS_WITHOUT_CANONICAL_MIME = [
	".webm",
	".wma",
	".alac"
];
function isAudioPath(pathLocal) {
	if (!pathLocal) return false;
	if (isAudioFileName(pathLocal)) return true;
	const lower = normalizeLowercaseStringOrEmpty(pathLocal);
	return AUDIO_EXTENSIONS_WITHOUT_CANONICAL_MIME.some((extension) => lower.endsWith(extension));
}
function isValidAttachmentIndex(index, attachmentCount) {
	return Number.isSafeInteger(index) && index >= 0 && index < attachmentCount;
}
function collectTranscribedAudioAttachmentIndices(ctx, attachmentCount) {
	const transcribedAudioIndices = /* @__PURE__ */ new Set();
	if (Array.isArray(ctx.MediaUnderstanding)) {
		for (const output of ctx.MediaUnderstanding) if (output.kind === "audio.transcription" && isValidAttachmentIndex(output.attachmentIndex, attachmentCount)) transcribedAudioIndices.add(output.attachmentIndex);
	}
	if (Array.isArray(ctx.MediaUnderstandingDecisions)) for (const decision of ctx.MediaUnderstandingDecisions) {
		if (decision.capability !== "audio" || decision.outcome !== "success") continue;
		for (const attachment of decision.attachments) if (attachment.chosen?.outcome === "success" && isValidAttachmentIndex(attachment.attachmentIndex, attachmentCount)) transcribedAudioIndices.add(attachment.attachmentIndex);
	}
	return transcribedAudioIndices;
}
function collectDescribedImageAttachmentIndices(ctx) {
	return new Set(ctx.MediaUnderstanding?.flatMap((output) => output.kind === "image.description" ? [output.attachmentIndex] : []) ?? []);
}
/** Formats prompt-visible attachment text and retains facts that still need native hydration. */
function buildInboundMediaNoteProjection(ctx) {
	const facts = normalizeMediaFacts(ctx.media);
	const entries = facts.flatMap((fact, index) => {
		const mediaPath = fact.path?.trim() ?? "";
		return mediaPath || fact.url?.trim() ? [{
			fact,
			path: mediaPath,
			type: fact.contentType ?? fact.kind,
			url: fact.url,
			index
		}] : [];
	});
	if (entries.length === 0) return { media: [] };
	const transcribedAudioIndices = collectTranscribedAudioAttachmentIndices(ctx, facts.length);
	const canStripSingleAttachmentByTranscript = Boolean(ctx.Transcript?.trim()) && facts.length === 1;
	const visibleEntries = entries.filter((entry) => {
		const normalizedType = normalizeLowercaseStringOrEmpty(entry.type);
		const isAudioByMime = normalizedType === "audio" || normalizedType.startsWith("audio/");
		if (!(entry.fact.kind === "audio" || isAudioPath(entry.path) || isAudioByMime)) return true;
		if (entry.fact.transcribed === true || transcribedAudioIndices.has(entry.index) || canStripSingleAttachmentByTranscript && entry.index === 0) return false;
		return true;
	});
	if (visibleEntries.length === 0) return { media: [] };
	const describedImageIndices = collectDescribedImageAttachmentIndices(ctx);
	const media = visibleEntries.map((entry) => ({
		...entry.fact,
		...describedImageIndices.has(entry.index) ? { hydrationSuppressed: true } : {}
	}));
	if (visibleEntries.length === 1) return {
		text: formatMediaAttachedLine({
			path: visibleEntries[0]?.path ?? "",
			type: visibleEntries[0]?.type,
			url: visibleEntries[0]?.url
		}),
		media
	};
	const count = visibleEntries.length;
	const lines = [`[media attached: ${count} files]`];
	for (const [idx, entry] of visibleEntries.entries()) lines.push(formatMediaAttachedLine({
		path: entry.path,
		index: idx + 1,
		total: count,
		type: entry.type,
		url: entry.url
	}));
	return {
		text: lines.join("\n"),
		media
	};
}
//#endregion
//#region src/auto-reply/reply/channel-prompt-context.ts
/** Appends channel-supplied prompt context to the user-role body under a marked label. */
/**
* The fixed marker lets strippers recognize OpenClaw-injected context; it is not
* a trust guardrail. Trust guidance travels with each entry instead
* (`buildChannelMetadata` wraps entries in `wrapExternalContent`, whose SECURITY
* NOTICE carries the do-not-obey clause).
*/
function appendChannelPromptContext(base, channelPromptContext) {
	if (!Array.isArray(channelPromptContext) || channelPromptContext.length === 0) return base;
	const entries = channelPromptContext.map((entry) => normalizeInboundTextNewlines(entry)).filter((entry) => Boolean(entry));
	if (entries.length === 0) return base;
	return [base, [markInboundContextLabel("Context:"), ...entries].join("\n")].filter(Boolean).join("\n\n");
}
const MAX_CONTEXT_JSON_STRING_CHARS = 2e3;
function neutralizeMarkdownFences(value) {
	return value.replaceAll("```", "`​``");
}
function truncateContextJsonString(value) {
	if (value.length <= 2e3) return value;
	return `${truncateUtf16Safe(value, Math.max(0, MAX_CONTEXT_JSON_STRING_CHARS - 14)).trimEnd()}…[truncated]`;
}
function sanitizeContextJsonValue(value) {
	if (typeof value === "string") return neutralizeMarkdownFences(truncateContextJsonString(value));
	if (Array.isArray(value)) return value.map((entry) => sanitizeContextJsonValue(entry));
	if (!value || typeof value !== "object") return value;
	return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, sanitizeContextJsonValue(entry)]));
}
function formatContextJsonBlock(label, payload) {
	return [
		label,
		"```json",
		JSON.stringify(sanitizeContextJsonValue(payload)),
		"```"
	].join("\n");
}
//#endregion
//#region src/sessions/user-turn-media.ts
const MEDIA_ONLY_USER_TEXT = "[User sent media without caption]";
function hasPersistedMedia(message) {
	if (!message || typeof message !== "object" || Array.isArray(message)) return false;
	return (readPersistedMediaFacts(message) ?? []).some(isMeaningfulMediaFact);
}
//#endregion
//#region src/utils/provider-utils.ts
/**
* Provider behavior helpers shared by reply runners, embedded agents, and provider plugins.
* Keep policy here generic; provider-specific reasoning rules belong in provider runtime hooks.
*/
/**
* Resolves whether a provider should emit reasoning via native fields or tagged text,
* using provider runtime hooks when available and defaulting to native output.
*/
function resolveReasoningOutputMode(params) {
	const provider = normalizeOptionalString(params.provider);
	if (!provider) return "native";
	const pluginMode = resolveProviderReasoningOutputModeWithPlugin({
		provider,
		config: params.config,
		workspaceDir: params.workspaceDir,
		env: params.env,
		runtimeHandle: params.runtimeHandle,
		context: {
			config: params.config,
			workspaceDir: params.workspaceDir,
			env: params.env,
			provider,
			modelId: params.modelId,
			modelApi: params.modelApi,
			model: params.model
		}
	});
	if (pluginMode) return pluginMode;
	return "native";
}
/**
* Returns true if the provider requires reasoning to be wrapped in tags
* (e.g. <think> and <final>) in the text stream, rather than using native
* API fields for reasoning/thinking.
*/
function isReasoningTagProvider(provider, options) {
	return resolveReasoningOutputMode({
		provider,
		config: options?.config,
		workspaceDir: options?.workspaceDir,
		env: options?.env,
		modelId: options?.modelId,
		modelApi: options?.modelApi,
		model: options?.model,
		runtimeHandle: options?.runtimeHandle
	}) === "tagged";
}
//#endregion
export { appendChannelPromptContext as a, buildInboundMediaNoteProjection as c, MAX_CONTEXT_JSON_STRING_CHARS as i, MEDIA_ONLY_USER_TEXT as n, formatContextJsonBlock as o, hasPersistedMedia as r, neutralizeMarkdownFences as s, isReasoningTagProvider as t };
