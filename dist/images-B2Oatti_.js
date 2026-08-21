import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-DW4mBlAt.js";
import { g as assertNoWindowsNetworkPath, x as safeFileURLToPath } from "./path-D8zNGPJM.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import "./local-file-access-8uj3r-Aa.js";
import { d as readPersistedMediaFacts, f as readRuntimePromptImageOrder, l as normalizeMediaFacts, n as attachRuntimePromptMediaFacts, p as readRuntimePromptMediaFacts, s as isImageMediaFact } from "./media-facts-D_wLZOa9.js";
import { t as finalizeRuntimePromptImages } from "./runtime-prompt-image-provenance-a6jbLyXX.js";
import { n as sanitizeImageBlocks } from "./tool-images-DzWl3tQX.js";
import { o as resolveMediaReferenceLocalPath } from "./media-reference-B9JOS1br.js";
import { t as log } from "./logger-BeJ7WAxI.js";
import { n as loadWebMedia } from "./web-media-GPm5irud.js";
import { n as resolveSandboxedBridgeMediaPath, t as createSandboxBridgeReadFile } from "./sandbox-media-paths-GR2AmMZJ.js";
import path from "node:path";
//#region src/agents/embedded-agent-runner/run/images.media-refs.ts
const URL_SCHEME_PATTERN = /^[a-z][a-z0-9+.-]*:/i;
const WINDOWS_DRIVE_PATH_PATTERN$1 = /^[A-Za-z]:[\\/]/;
function isOpenClawCliImageCachePath(filePath) {
	const parts = filePath.replaceAll("\\", "/").split("/");
	return parts.some((part, index) => {
		if (part === ".openclaw-cli-images") return true;
		const parent = parts[index - 1] ?? "";
		return part === "openclaw-cli-images" && /^openclaw(?:-\d+)?$/.test(parent);
	});
}
function mediaFactToImageRef(fact, factIndex) {
	if (!isImageMediaFact(fact)) return;
	const mediaUri = [fact.url, fact.path].find((value) => value?.startsWith("media://inbound/"));
	const identity = mediaUri ?? fact.path ?? fact.url;
	if (!identity) return fact.hydrationSuppressed === true ? {
		aliases: [],
		detect: false,
		factIndex,
		raw: "",
		type: "path",
		resolved: "",
		hydrate: false,
		...fact.workspaceDir ? { workspaceDir: fact.workspaceDir } : {}
	} : void 0;
	let resolved = mediaUri;
	if (!resolved && identity && /^file:/i.test(identity)) try {
		resolved = safeFileURLToPath(identity);
	} catch {
		resolved = void 0;
	}
	else if (!resolved && identity && (!URL_SCHEME_PATTERN.test(identity) || WINDOWS_DRIVE_PATH_PATTERN$1.test(identity))) resolved = identity;
	if (resolved?.startsWith("~")) resolved = resolveUserPath(resolved);
	const hydrate = fact.hydrationSuppressed !== true;
	if (!resolved || isOpenClawCliImageCachePath(resolved)) return {
		aliases: [fact.path, fact.url].filter((value) => Boolean(value)),
		detect: false,
		factIndex,
		raw: identity,
		type: "path",
		resolved: identity,
		hydrate: false,
		...fact.workspaceDir ? { workspaceDir: fact.workspaceDir } : {}
	};
	return {
		aliases: [
			fact.path,
			fact.url,
			resolved
		].filter((value) => Boolean(value)),
		factIndex,
		raw: mediaUri ?? fact.path ?? fact.url ?? resolved,
		type: mediaUri ? "media-uri" : "path",
		resolved,
		hydrate,
		...fact.workspaceDir ? { workspaceDir: fact.workspaceDir } : {}
	};
}
function collectMediaImageRefs(media) {
	return normalizeMediaFacts(media).flatMap((fact, factIndex) => isImageMediaFact(fact) ? [mediaFactToImageRef(fact, factIndex)] : []);
}
function collectIdentitylessMediaImageFactIndexes(media) {
	return normalizeMediaFacts(media).flatMap((fact, factIndex) => isImageMediaFact(fact) && fact.hydrationSuppressed !== true && fact.path === void 0 && fact.url === void 0 ? [factIndex] : []);
}
function hasHydratableMediaImages(media) {
	return collectMediaImageRefs(media).some((ref) => ref?.hydrate === true);
}
function selectMediaImageRefs(params) {
	const { refs } = params;
	if (!params.imageOrder?.length) {
		let inlinePairs = params.existingImageCount;
		return refs.filter((ref) => {
			if (ref === void 0 && inlinePairs > 0) {
				inlinePairs -= 1;
				return false;
			}
			return true;
		});
	}
	if (refs.length !== params.imageOrder.length) return refs;
	let remainingExisting = params.existingImageCount;
	return params.imageOrder.flatMap((entry, index) => {
		if (entry === "offloaded") return [refs[index]];
		if (remainingExisting > 0) {
			remainingExisting -= 1;
			return [];
		}
		return [void 0];
	});
}
//#endregion
//#region src/agents/embedded-agent-runner/run/prompt-image-metadata.ts
function resolveLayoutInlineFactIndexes(layout, existingImageCount) {
	const factIndexes = layout?.slots.flatMap((slot) => slot.kind === "inline" ? [slot.factIndex ?? null] : []);
	return factIndexes?.length === existingImageCount ? factIndexes : void 0;
}
function countMissingLayoutInlineSlots(layout, existingFactIndexes, existingImageCount) {
	if (!layout) return 0;
	const available = existingFactIndexes ? [...existingFactIndexes] : Array.from({ length: existingImageCount }, () => null);
	let missing = 0;
	for (const slot of layout.slots) {
		if (slot.kind !== "inline") continue;
		const exactIndex = slot.factIndex === void 0 ? available.length > 0 ? 0 : -1 : available.findIndex((factIndex) => factIndex === slot.factIndex);
		const matchIndex = exactIndex >= 0 ? exactIndex : available.indexOf(null);
		if (matchIndex >= 0) available.splice(matchIndex, 1);
		else missing++;
	}
	return missing;
}
function readPersistedImageBlockFactIndexes(message) {
	const meta = message["__openclaw"];
	const value = meta && typeof meta === "object" && !Array.isArray(meta) ? meta.mediaImageBlockFactIndexes : void 0;
	if (!Array.isArray(value)) return;
	return value.map((entry) => typeof entry === "number" && Number.isSafeInteger(entry) && entry >= 0 ? entry : null);
}
function readPersistedMediaImageLayout(message) {
	const meta = message["__openclaw"];
	if (!meta || typeof meta !== "object" || Array.isArray(meta)) return;
	const layout = meta.mediaImageLayout;
	if (!layout || typeof layout !== "object" || Array.isArray(layout)) return;
	const record = layout;
	const slots = Array.isArray(record.slots) ? record.slots.flatMap((entry) => {
		if (!entry || typeof entry !== "object" || Array.isArray(entry)) return [];
		const slot = entry;
		if (slot.kind !== "inline" && slot.kind !== "offloaded") return [];
		const kind = slot.kind;
		const factIndex = slot.factIndex;
		return [{
			kind,
			...typeof factIndex === "number" && Number.isSafeInteger(factIndex) && factIndex >= 0 ? { factIndex } : {}
		}];
	}) : [];
	const suppressedFactIndexes = Array.isArray(record.suppressedFactIndexes) ? record.suppressedFactIndexes.filter((entry) => typeof entry === "number" && Number.isSafeInteger(entry) && entry >= 0) : [];
	return slots.length > 0 || suppressedFactIndexes.length > 0 ? {
		slots,
		suppressedFactIndexes
	} : void 0;
}
//#endregion
//#region src/agents/embedded-agent-runner/run/images.ts
const IMAGE_EXTENSION_NAMES = [
	"png",
	"jpg",
	"jpeg",
	"gif",
	"webp",
	"bmp",
	"tiff",
	"tif",
	"heic",
	"heif"
];
const IMAGE_EXTENSIONS = /* @__PURE__ */ new Set();
for (const ext of IMAGE_EXTENSION_NAMES) IMAGE_EXTENSIONS.add(`.${ext}`);
const IMAGE_EXTENSION_PATTERN = IMAGE_EXTENSION_NAMES.join("|");
const FILE_URL_REGEX_SOURCE = "file://[^\\s<>\"'`\\]]+\\.(?:" + IMAGE_EXTENSION_PATTERN + ")";
const WINDOWS_DRIVE_PATH_REGEX_SOURCE = "(?:^|\\s|[\"'`(])([A-Za-z]:[\\\\/][^\\s\"'`()\\[\\]]*\\.(?:" + IMAGE_EXTENSION_PATTERN + "))";
const PATH_REGEX_SOURCE = "(?:^|\\s|[\"'`(])((\\.\\.?/|[~/])[^\\s\"'`()\\[\\]]*\\.(?:" + IMAGE_EXTENSION_PATTERN + "))";
const FILE_URL_PATTERN = new RegExp(FILE_URL_REGEX_SOURCE, "gi");
const WINDOWS_DRIVE_PATH_PATTERN = new RegExp(WINDOWS_DRIVE_PATH_REGEX_SOURCE, "gi");
const PATH_PATTERN = new RegExp(PATH_REGEX_SOURCE, "gi");
const LEGACY_ATTACHMENT_MARKER_PATTERN = /\[(?:media attached(?:\s+\d+\/\d+)?:|Image:\s*source:)\s*[^\]]+\]/gi;
function isImageExtension(filePath) {
	const ext = normalizeLowercaseStringOrEmpty(path.extname(filePath));
	return IMAGE_EXTENSIONS.has(ext);
}
function normalizeRefForDedupe(raw) {
	const projected = process.platform === "darwin" && raw.startsWith("/private/var/") ? raw.slice(8) : raw;
	return process.platform === "win32" ? normalizeLowercaseStringOrEmpty(projected) : projected;
}
function mergePromptAttachmentImages(params) {
	const existingImages = (params.existingImages ?? []).map((image, index) => ({
		image,
		factIndex: params.existingImageFactIndexes?.[index] ?? null
	}));
	const offloadedImages = params.offloadedImages ?? [];
	const promptRefImages = (params.promptRefImages ?? []).map((image) => ({
		image,
		factIndex: null
	}));
	const slots = params.mediaImageLayout?.slots ?? params.imageOrder?.map((kind) => ({ kind })) ?? [];
	if (slots.length === 0) return [
		...[...offloadedImages, ...existingImages].filter((entry) => entry !== null && entry.factIndex !== null).toSorted((left, right) => (left.factIndex ?? 0) - (right.factIndex ?? 0)),
		...existingImages.filter((entry) => entry.factIndex === null),
		...promptRefImages
	];
	const unusedExisting = [...existingImages];
	const takeExisting = (factIndex) => {
		const matchIndex = factIndex === void 0 ? 0 : unusedExisting.findIndex((entry) => entry.factIndex === factIndex);
		if (matchIndex < 0) return;
		return unusedExisting.splice(matchIndex, 1)[0];
	};
	let offloadedIndex = 0;
	return [
		...slots.flatMap((slot) => {
			const offloaded = slot.kind === "offloaded" ? offloadedImages[offloadedIndex++] : void 0;
			const existing = (slot.factIndex !== void 0 ? takeExisting(slot.factIndex) : slot.kind === "inline" ? takeExisting(void 0) : void 0) ?? (slot.kind === "inline" && slot.factIndex !== void 0 ? takeExisting(null) : void 0);
			if (existing) return [existing];
			if (slot.kind === "inline") return [];
			return offloaded ? [offloaded] : [];
		}),
		...unusedExisting,
		...offloadedImages.slice(offloadedIndex).filter((entry) => entry !== null),
		...promptRefImages
	];
}
async function sanitizeImageEntriesWithLog(entries, label, imageSanitization) {
	const sanitized = [];
	let dropped = 0;
	let failedMediaCount = 0;
	for (const entry of entries) {
		const result = await sanitizeImageBlocks([entry.image], label, imageSanitization);
		const image = result.images[0];
		if (image) sanitized.push({
			image,
			factIndex: entry.factIndex
		});
		dropped += result.dropped;
		if (result.dropped > 0 && entry.factIndex !== null) failedMediaCount++;
	}
	if (dropped > 0) log.warn(`Native image: dropped ${dropped} image(s) after sanitization (${label}).`);
	return {
		entries: sanitized,
		failedMediaCount
	};
}
/** Detects explicit local image paths and file URLs in user prompt text. */
function detectImageReferences(prompt) {
	const refs = [];
	const seen = /* @__PURE__ */ new Set();
	const pathPrompt = prompt.replace(LEGACY_ATTACHMENT_MARKER_PATTERN, (marker) => " ".repeat(marker.length));
	const addPathRef = (raw) => {
		const trimmed = raw.trim();
		const dedupeKey = normalizeRefForDedupe(trimmed);
		if (!trimmed || seen.has(dedupeKey)) return;
		if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return;
		if (!isImageExtension(trimmed)) return;
		try {
			assertNoWindowsNetworkPath(trimmed, "Image path");
		} catch {
			return;
		}
		const resolved = trimmed.startsWith("~") ? resolveUserPath(trimmed) : trimmed;
		if (isOpenClawCliImageCachePath(resolved)) return;
		seen.add(dedupeKey);
		refs.push({
			raw: trimmed,
			type: "path",
			resolved
		});
	};
	FILE_URL_PATTERN.lastIndex = 0;
	WINDOWS_DRIVE_PATH_PATTERN.lastIndex = 0;
	PATH_PATTERN.lastIndex = 0;
	let match;
	while ((match = FILE_URL_PATTERN.exec(pathPrompt)) !== null) {
		const raw = match[0];
		const dedupeKey = normalizeRefForDedupe(raw);
		if (seen.has(dedupeKey)) continue;
		try {
			const resolved = safeFileURLToPath(raw);
			if (isOpenClawCliImageCachePath(resolved)) continue;
			seen.add(dedupeKey);
			refs.push({
				raw,
				type: "path",
				resolved
			});
		} catch {
			continue;
		}
	}
	while ((match = WINDOWS_DRIVE_PATH_PATTERN.exec(pathPrompt)) !== null) if (match[1]) addPathRef(match[1]);
	while ((match = PATH_PATTERN.exec(pathPrompt)) !== null) if (match[1]) addPathRef(match[1]);
	return refs;
}
function refDedupeKey(ref, workspaceDir) {
	const resolved = ref.type === "path" && workspaceDir && !path.isAbsolute(ref.resolved) ? path.resolve(workspaceDir, ref.resolved) : ref.resolved;
	return `${ref.type}\0${normalizeRefForDedupe(resolved)}`;
}
function rawAliasDedupeKey(alias) {
	return path.isAbsolute(alias) || /^[A-Za-z]:[\\/]/.test(alias) || /^[a-z][a-z0-9+.-]*:/i.test(alias) ? normalizeRefForDedupe(alias) : void 0;
}
async function loadImageFromRef(ref, workspaceDir, options) {
	try {
		let targetPath = ref.resolved;
		if (!options?.sandbox) targetPath = await resolveMediaReferenceLocalPath(targetPath);
		if (options?.sandbox) try {
			targetPath = (await resolveSandboxedBridgeMediaPath({
				sandbox: {
					root: options.sandbox.root,
					bridge: options.sandbox.bridge,
					workspaceOnly: options.workspaceOnly
				},
				mediaPath: targetPath,
				inboundFallbackDir: "media/inbound"
			})).resolved;
		} catch (err) {
			log.debug(`Native image: sandbox validation failed for ${ref.resolved}: ${formatErrorMessage(err)}`);
			return null;
		}
		else if (!path.isAbsolute(targetPath)) targetPath = path.resolve(workspaceDir, targetPath);
		const media = options?.sandbox ? await loadWebMedia(targetPath, {
			maxBytes: options.maxBytes,
			sandboxValidated: true,
			readFile: createSandboxBridgeReadFile({ sandbox: options.sandbox })
		}) : await loadWebMedia(targetPath, options?.workspaceOnly || options?.localRoots ? {
			maxBytes: options.maxBytes,
			localRoots: options.localRoots ?? [workspaceDir]
		} : options?.maxBytes);
		if (media.kind !== "image") {
			log.debug(`Native image: not an image file: ${targetPath} (got ${media.kind})`);
			return null;
		}
		const mimeType = media.contentType ?? "image/jpeg";
		return {
			type: "image",
			data: media.buffer.toString("base64"),
			mimeType
		};
	} catch (err) {
		log.debug(`Native image: failed to load ${ref.resolved}: ${formatErrorMessage(err)}`);
		return null;
	}
}
function modelSupportsImages(model) {
	return model.input?.includes("image") ?? false;
}
async function detectAndLoadPromptImages(params) {
	if (!modelSupportsImages(params.model)) return {
		images: [],
		imageFactIndexes: [],
		detectedRefs: [],
		failedMediaCount: 0,
		loadedCount: 0,
		skippedCount: 0
	};
	const allMediaRefs = collectMediaImageRefs(params.media);
	const suppressedFactIndexes = new Set(params.mediaImageLayout?.suppressedFactIndexes ?? []);
	for (const ref of allMediaRefs) {
		if (!ref || !suppressedFactIndexes.has(ref.factIndex)) continue;
		ref.hydrate = false;
	}
	const orderRefs = allMediaRefs.filter((ref) => !ref || !suppressedFactIndexes.has(ref.factIndex) && ref.hydrate);
	const imageOrder = params.mediaImageLayout?.slots.map((slot) => slot.kind) ?? params.imageOrder;
	const refsByFactIndex = new Map(allMediaRefs.flatMap((ref) => ref ? [[ref.factIndex, ref]] : []));
	const unsuppressedImageFactIndexes = normalizeMediaFacts(params.media).flatMap((fact, factIndex) => isImageMediaFact(fact) && fact.hydrationSuppressed !== true && !suppressedFactIndexes.has(factIndex) ? [factIndex] : []);
	const inferredExistingImageFactIndexes = imageOrder && unsuppressedImageFactIndexes.length === imageOrder.length ? imageOrder.flatMap((entry, index) => entry === "inline" ? [unsuppressedImageFactIndexes[index] ?? null] : []) : void 0;
	const inferredMediaImageLayout = !params.mediaImageLayout && imageOrder && unsuppressedImageFactIndexes.length === imageOrder.length ? {
		slots: imageOrder.map((kind, index) => ({
			kind,
			factIndex: unsuppressedImageFactIndexes[index]
		})),
		suppressedFactIndexes: []
	} : void 0;
	const layoutInlineFactIndexes = resolveLayoutInlineFactIndexes(params.mediaImageLayout, params.existingImages?.length ?? 0);
	const existingImageFactIndexes = params.existingImageFactIndexes ?? layoutInlineFactIndexes ?? (inferredExistingImageFactIndexes?.length === (params.existingImages?.length ?? 0) ? inferredExistingImageFactIndexes : void 0);
	const missingInlineMediaCount = countMissingLayoutInlineSlots(params.mediaImageLayout, existingImageFactIndexes, params.existingImages?.length ?? 0);
	const attachmentRefs = params.mediaImageLayout ? params.mediaImageLayout.slots.flatMap((slot) => slot.kind === "offloaded" ? [{
		factIndex: slot.factIndex,
		ref: slot.factIndex === void 0 ? void 0 : refsByFactIndex.get(slot.factIndex)
	}] : []) : selectMediaImageRefs({
		refs: orderRefs,
		existingImageCount: params.existingImages?.length ?? 0,
		imageOrder
	}).map((ref) => ({
		factIndex: ref?.factIndex,
		ref
	}));
	const materializedFactIndexes = new Set((existingImageFactIndexes ?? []).filter((entry) => typeof entry === "number"));
	const availableMediaRefs = allMediaRefs.filter((ref) => ref !== void 0);
	const selectedAttachmentRefs = attachmentRefs.flatMap(({ ref }) => ref ? [ref] : []);
	const attachmentKeys = new Set(selectedAttachmentRefs.map((ref) => refDedupeKey(ref, ref.workspaceDir ?? params.workspaceDir)));
	const attachmentRawKeys = new Set(selectedAttachmentRefs.flatMap((ref) => ref.aliases.flatMap((alias) => {
		const key = rawAliasDedupeKey(alias);
		return key ? [key] : [];
	})));
	const promptRefs = detectImageReferences(params.prompt).filter((ref) => !attachmentRawKeys.has(rawAliasDedupeKey(ref.raw) ?? "") && !attachmentKeys.has(refDedupeKey(ref, params.workspaceDir)));
	const detectedRefs = [...availableMediaRefs.flatMap(({ detect, hydrate, raw, type, resolved }) => detect !== false && (hydrate || !resolved.startsWith("http://") && !resolved.startsWith("https://")) ? [{
		raw,
		type,
		resolved
	}] : []), ...promptRefs];
	if (attachmentRefs.length === 0 && promptRefs.length === 0) {
		const existingImages = params.existingImages ?? [];
		const sanitized = existingImages.length ? await sanitizeImageEntriesWithLog(existingImages.map((image, index) => ({
			image,
			factIndex: existingImageFactIndexes?.[index] ?? null
		})), "prompt:images", {
			maxBytes: params.maxBytes,
			maxDimensionPx: params.maxDimensionPx
		}) : {
			entries: [],
			failedMediaCount: 0
		};
		return {
			...finalizeRuntimePromptImages(sanitized.entries),
			detectedRefs,
			failedMediaCount: missingInlineMediaCount + sanitized.failedMediaCount,
			loadedCount: 0,
			skippedCount: 0
		};
	}
	log.debug(`Native image: prepared ${attachmentRefs.length} attachment ref(s) and ${promptRefs.length} explicit prompt ref(s)`);
	let loadedCount = 0;
	let failedMediaCount = missingInlineMediaCount;
	let skippedCount = 0;
	const loadRef = async (ref) => {
		const image = await loadImageFromRef(ref, ref.workspaceDir ?? params.workspaceDir, {
			maxBytes: params.maxBytes,
			workspaceOnly: params.workspaceOnly,
			localRoots: params.localRoots ?? (params.workspaceOnly ? [params.workspaceDir] : void 0),
			sandbox: params.sandbox
		});
		if (image) {
			loadedCount++;
			log.debug(`Native image: loaded ${ref.type} ${ref.resolved}`);
		} else skippedCount++;
		return image;
	};
	const offloadedImages = [];
	for (const attachment of attachmentRefs) {
		const factIndex = attachment.factIndex;
		if (factIndex !== void 0 && materializedFactIndexes.has(factIndex)) {
			offloadedImages.push(null);
			continue;
		}
		const ref = attachment.ref;
		if (!ref) {
			failedMediaCount++;
			offloadedImages.push(null);
			continue;
		}
		const image = ref.hydrate ? await loadRef(ref) : null;
		if (ref.hydrate && !image) failedMediaCount++;
		offloadedImages.push(image ? {
			image,
			factIndex: ref.factIndex
		} : null);
	}
	const promptRefImages = [];
	for (const ref of promptRefs) {
		const image = await loadRef(ref);
		if (image) promptRefImages.push(image);
	}
	const sanitizedPromptImages = await sanitizeImageEntriesWithLog(mergePromptAttachmentImages({
		imageOrder,
		mediaImageLayout: params.mediaImageLayout ?? inferredMediaImageLayout,
		existingImages: params.existingImages,
		existingImageFactIndexes,
		offloadedImages,
		promptRefImages
	}), "prompt:images", {
		maxBytes: params.maxBytes,
		maxDimensionPx: params.maxDimensionPx
	});
	return {
		...finalizeRuntimePromptImages(sanitizedPromptImages.entries),
		detectedRefs,
		failedMediaCount: failedMediaCount + sanitizedPromptImages.failedMediaCount,
		loadedCount,
		skippedCount
	};
}
/** Hydrates non-enumerable facts carried by queued user turns before provider replay. */
async function hydratePromptMediaMessages(messages, options) {
	let hydrated;
	for (const [index, message] of messages.entries()) {
		if (message.role !== "user") continue;
		const runtimeMedia = readRuntimePromptMediaFacts(message);
		const meta = message["__openclaw"];
		const resolvedMedia = runtimeMedia ?? readPersistedMediaFacts(message) ?? [];
		const runtimeImageOrder = readRuntimePromptImageOrder(message);
		const mediaImageLayout = readPersistedMediaImageLayout(message);
		if (!resolvedMedia.length) continue;
		const content = Array.isArray(message.content) ? message.content : [{
			type: "text",
			text: message.content
		}];
		const existingImages = content.filter((block) => block.type === "image");
		const persistedImageFactIndexes = readPersistedImageBlockFactIndexes(message);
		const inlineLayoutFactIndexes = mediaImageLayout?.slots.flatMap((slot) => slot.kind === "inline" ? [slot.factIndex ?? null] : []);
		const legacyImageFactIndexes = runtimeMedia === void 0 && mediaImageLayout === void 0 ? collectIdentitylessMediaImageFactIndexes(resolvedMedia) : void 0;
		const existingImageFactIndexes = persistedImageFactIndexes ?? (inlineLayoutFactIndexes?.length === existingImages.length ? inlineLayoutFactIndexes : legacyImageFactIndexes?.slice(0, existingImages.length));
		const result = await detectAndLoadPromptImages({
			prompt: "",
			media: resolvedMedia,
			workspaceDir: options.workspaceDir,
			model: options.model,
			existingImages,
			existingImageFactIndexes,
			imageOrder: runtimeImageOrder,
			mediaImageLayout,
			maxBytes: options.maxBytes,
			maxDimensionPx: options.maxDimensionPx,
			workspaceOnly: options.workspaceOnly,
			localRoots: options.localRoots,
			sandbox: options.sandbox
		});
		const nextMeta = meta && typeof meta === "object" && !Array.isArray(meta) ? { ...meta } : {};
		if (result.images.length > 0) nextMeta.mediaImageBlockFactIndexes = result.imageFactIndexes;
		else delete nextMeta.mediaImageBlockFactIndexes;
		hydrated ??= messages.slice();
		const hydratedMessage = {
			...message,
			content: [...content.filter((block) => block.type !== "image"), ...result.images]
		};
		if (Object.keys(nextMeta).length > 0) hydratedMessage["__openclaw"] = nextMeta;
		else delete hydratedMessage["__openclaw"];
		if (runtimeMedia) attachRuntimePromptMediaFacts(hydratedMessage, runtimeMedia, runtimeImageOrder);
		hydrated[index] = hydratedMessage;
	}
	return hydrated ?? messages;
}
//#endregion
export { hasHydratableMediaImages as a, readPersistedMediaImageLayout as i, detectImageReferences as n, hydratePromptMediaMessages as r, detectAndLoadPromptImages as t };
