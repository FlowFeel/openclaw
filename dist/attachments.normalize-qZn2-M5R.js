import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { g as assertNoWindowsNetworkPath, x as safeFileURLToPath } from "./path-D8zNGPJM.js";
import { c as kindFromMime, l as mimeTypeFromFilePath, u as normalizeMimeType } from "./mime-Ir6g3Vae.js";
import "./local-file-access-8uj3r-Aa.js";
import { l as normalizeMediaFacts, o as isGenericBinaryMediaContentType, s as isImageMediaFact } from "./media-facts-D_wLZOa9.js";
//#region src/media-understanding/attachments.normalize.ts
/** Normalizes a local attachment path while rejecting remote file URLs and Windows UNC paths. */
function normalizeAttachmentPath(raw) {
	const value = normalizeOptionalString(raw);
	if (!value) return;
	if (value.startsWith("file://")) try {
		return safeFileURLToPath(value);
	} catch {
		return;
	}
	try {
		assertNoWindowsNetworkPath(value, "Attachment path");
	} catch {
		return;
	}
	return value;
}
/** Converts ordered media facts into indexed attachment records. */
function normalizeAttachments(ctx) {
	return normalizeMediaFacts(ctx.media).map((fact, index) => {
		const attachment = {
			path: normalizeOptionalString(fact.path),
			url: normalizeOptionalString(fact.url),
			mime: normalizeOptionalString(fact.contentType),
			index,
			alreadyTranscribed: fact.transcribed === true
		};
		if (fact.kind) attachment.kind = fact.kind;
		if (fact.workspaceDir) attachment.workspaceDir = fact.workspaceDir;
		return attachment;
	}).filter((entry) => Boolean(entry.path ?? entry.url));
}
/** Classifies an attachment by authoritative kind, MIME, then canonical filename metadata. */
function resolveAttachmentKind(attachment) {
	if (isImageMediaFact({
		path: attachment.path,
		url: attachment.url,
		contentType: attachment.mime,
		kind: attachment.kind
	})) return "image";
	if (attachment.kind === "audio" || attachment.kind === "video") return attachment.kind;
	if (attachment.kind === "document") return "unknown";
	const mime = normalizeMimeType(attachment.mime);
	const kind = kindFromMime(mime);
	if (kind === "audio" || kind === "video") return kind;
	if (mime && !isGenericBinaryMediaContentType(mime)) return "unknown";
	const inferredKind = kindFromMime(mimeTypeFromFilePath(attachment.path ?? attachment.url));
	return inferredKind === "audio" || inferredKind === "video" ? inferredKind : "unknown";
}
/** Returns true when the attachment is classified as video media. */
function isVideoAttachment(attachment) {
	return resolveAttachmentKind(attachment) === "video";
}
/** Returns true when the attachment is classified as audio media. */
function isAudioAttachment(attachment) {
	return resolveAttachmentKind(attachment) === "audio";
}
/** Returns true when the attachment is classified as image media. */
function isImageAttachment(attachment) {
	return resolveAttachmentKind(attachment) === "image";
}
//#endregion
export { normalizeAttachments as a, normalizeAttachmentPath as i, isImageAttachment as n, resolveAttachmentKind as o, isVideoAttachment as r, isAudioAttachment as t };
