import { l as mimeTypeFromFilePath } from "./mime-Ir6g3Vae.js";
import { d as readPersistedMediaFacts } from "./media-facts-D_wLZOa9.js";
import { S as persistSessionTranscriptTurn } from "./session-accessor-D5Or7WgI.js";
import { i as applyInputProvenanceToUserMessage, u as normalizeInputProvenance } from "./input-provenance-CYGbY89H.js";
import path from "node:path";
//#region src/sessions/user-turn-transcript.media-normalize.ts
const URL_LIKE_MEDIA_PATH_PATTERN = /^[a-z][a-z0-9+.-]*:/i;
const STRUCTURED_MEDIA_KINDS = /* @__PURE__ */ new Set([
	"image",
	"audio",
	"video",
	"document",
	"sticker",
	"unknown"
]);
const MIME_TYPE_PATTERN = /^[a-z0-9!#$&^_.+-]+\/[a-z0-9!#$&^_.+-]+$/iu;
function normalizeOptionalText$1(value) {
	const normalized = value?.trim();
	return normalized ? normalized : void 0;
}
function normalizeNonNegativeNumber(value) {
	return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : void 0;
}
function normalizeStructuredMediaKind(value) {
	const kind = normalizeOptionalText$1(value);
	return kind && STRUCTURED_MEDIA_KINDS.has(kind) ? kind : void 0;
}
function normalizePositiveInteger(value) {
	return typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : void 0;
}
function resolveTranscriptMediaPath(pathValue, workspaceDir) {
	if (!workspaceDir || path.isAbsolute(pathValue) || URL_LIKE_MEDIA_PATH_PATTERN.test(pathValue)) return pathValue;
	return path.join(workspaceDir, pathValue);
}
function normalizeStructuredMediaEntryForTranscript(media) {
	const workspaceDir = normalizeOptionalText$1(media.workspaceDir);
	const mediaPath = normalizeOptionalText$1(media.path);
	const mediaUrl = normalizeOptionalText$1(media.url);
	const kind = normalizeStructuredMediaKind(media.kind);
	const legacyKind = normalizeOptionalText$1(media.kind);
	const messageId = normalizeOptionalText$1(media.messageId);
	const contentType = normalizeOptionalText$1(media.contentType) ?? (kind || !legacyKind || !MIME_TYPE_PATTERN.test(legacyKind) ? void 0 : legacyKind) ?? mimeTypeFromFilePath(mediaPath ?? mediaUrl);
	const durationMs = normalizePositiveInteger(media.durationMs);
	const width = normalizePositiveInteger(media.width);
	const height = normalizePositiveInteger(media.height);
	const fileName = normalizeOptionalText$1(media.fileName);
	const sizeBytes = normalizeNonNegativeNumber(media.sizeBytes);
	return {
		...mediaPath ? { path: resolveTranscriptMediaPath(mediaPath, workspaceDir) } : {},
		...mediaUrl ? { url: mediaUrl } : {},
		...contentType ? { contentType } : {},
		...kind ? { kind } : {},
		...fileName ? { fileName } : {},
		...sizeBytes !== void 0 ? { sizeBytes } : {},
		...durationMs ? { durationMs } : {},
		...width ? { width } : {},
		...height ? { height } : {},
		...media.transcribed === true ? { transcribed: true } : {},
		...messageId ? { messageId } : {},
		...workspaceDir ? { workspaceDir } : {},
		...media.hydrationSuppressed === true ? { hydrationSuppressed: true } : {}
	};
}
//#endregion
//#region src/sessions/user-turn-transcript.ts
function buildRunUserTurnIdempotencyKey(runId) {
	return `${runId}:user`;
}
function normalizeOptionalText(value) {
	const normalized = value?.trim();
	return normalized ? normalized : void 0;
}
function normalizeTranscriptText(value) {
	return value ?? "";
}
function resolvePersistedUserTurnText(value) {
	const normalized = normalizeOptionalText(value);
	if (!normalized) return;
	return normalized;
}
function resolveTranscriptMediaType(params) {
	return params.explicitType ?? mimeTypeFromFilePath(params.mediaPath ?? params.mediaUrl);
}
function buildPersistedUserTurnMediaInputsFromFields(fields) {
	if (!fields) return [];
	const normalizedMedia = (readPersistedMediaFacts(fields) ?? []).map((fact) => {
		const rawPath = normalizeOptionalText(fact.path);
		const mediaPath = rawPath ? resolveTranscriptMediaPath(rawPath, normalizeOptionalText(fact.workspaceDir)) : void 0;
		const url = normalizeOptionalText(fact.url);
		if (!mediaPath && !url) return {};
		const media = { contentType: resolveTranscriptMediaType({
			explicitType: normalizeOptionalText(fact.contentType),
			mediaPath,
			mediaUrl: url
		}) };
		if (mediaPath) media.path = mediaPath;
		if (url) media.url = url;
		if (fact.kind) media.kind = fact.kind;
		if (fact.fileName) media.fileName = fact.fileName;
		if (fact.sizeBytes !== void 0) media.sizeBytes = fact.sizeBytes;
		if (fact.durationMs !== void 0) media.durationMs = fact.durationMs;
		if (fact.width !== void 0) media.width = fact.width;
		if (fact.height !== void 0) media.height = fact.height;
		return media;
	});
	return normalizedMedia.some((entry) => entry.path || entry.url) ? normalizedMedia : [];
}
function buildLateMediaAttachedProjection(message) {
	const media = readOpenClawMessageMeta(message)?.lateMedia === true ? readPersistedMediaFacts(message) ?? [] : [];
	const text = media.flatMap((fact) => {
		const mediaRef = fact.path ?? fact.url;
		return mediaRef ? [`[media attached: ${mediaRef}]`] : [];
	}).join("\n");
	return {
		...text ? { text } : {},
		media
	};
}
function buildUserTurnSenderMeta(sender) {
	const senderId = normalizeOptionalText(sender?.id);
	const senderName = normalizeOptionalText(sender?.name);
	const senderUsername = normalizeOptionalText(sender?.username);
	if (!senderId && !senderName && !senderUsername) return;
	return {
		...senderId ? { senderId } : {},
		...senderName ? { senderName } : {},
		...senderUsername ? { senderUsername } : {}
	};
}
function readOpenClawMessageMeta(message) {
	const meta = message["__openclaw"];
	return meta && typeof meta === "object" && !Array.isArray(meta) ? meta : void 0;
}
function buildPersistedUserTurnMessage(params) {
	const normalizedMedia = (params.media ?? []).map(normalizeStructuredMediaEntryForTranscript);
	const text = normalizeTranscriptText(params.text);
	const senderMeta = buildUserTurnSenderMeta(params.sender);
	const openClawMeta = {
		...params.senderIsOwner === void 0 ? {} : { senderIsOwner: params.senderIsOwner && (!params.provenance || params.provenance.kind === "external_user") },
		...senderMeta,
		...params.transport ? { transport: params.transport } : {},
		...normalizedMedia.length > 0 ? { media: normalizedMedia } : {},
		...params.mediaImageLayout ? { mediaImageLayout: {
			slots: params.mediaImageLayout.slots.map((slot) => ({ ...slot })),
			...params.mediaImageLayout.suppressedFactIndexes?.length ? { suppressedFactIndexes: [...params.mediaImageLayout.suppressedFactIndexes] } : {}
		} } : {}
	};
	return applyInputProvenanceToUserMessage({
		role: "user",
		content: text,
		timestamp: params.timestamp ?? Date.now(),
		...params.idempotencyKey ? { idempotencyKey: params.idempotencyKey } : {},
		...Object.keys(openClawMeta).length > 0 ? { __openclaw: openClawMeta } : {}
	}, params.provenance);
}
function resolvePersistedUserTurnMessage(params) {
	if (params.message) return params.message;
	if (!params.input) return;
	return buildPersistedUserTurnMessage(params.input);
}
function isUserMessage(message) {
	return message.role === "user";
}
function buildLateResolvedMediaMessage(params) {
	const admittedMedia = buildPersistedUserTurnMediaInputsFromFields(params.admittedMessage);
	const resolvedMedia = buildPersistedUserTurnMediaInputsFromFields(params.resolvedMessage);
	if (resolvedMedia.length === 0 || JSON.stringify(resolvedMedia) === JSON.stringify(admittedMedia)) return;
	const resolved = params.resolvedMessage;
	const admittedContent = params.admittedMessage?.content;
	const resolvedContent = params.resolvedMessage.content;
	let content = resolvedContent;
	if (resolvedContent === admittedContent) content = "";
	else if (Array.isArray(resolvedContent) && typeof admittedContent === "string") content = resolvedContent.filter((block) => {
		const textBlock = block;
		return textBlock?.type !== "text" || textBlock.text !== admittedContent;
	});
	const idempotencyKey = typeof resolved.idempotencyKey === "string" && resolved.idempotencyKey.length > 0 ? `${resolved.idempotencyKey}:late-media` : `late-media:${typeof resolved.timestamp === "number" ? resolved.timestamp : Date.now()}`;
	return {
		...resolved,
		content,
		idempotencyKey,
		__openclaw: {
			...readOpenClawMessageMeta(params.resolvedMessage),
			lateMedia: true
		}
	};
}
function isBeforeAgentRunBlockedMessage(message) {
	return message["__openclaw"]?.beforeAgentRunBlocked !== void 0;
}
function userMessageHasImageContent(message) {
	return isUserMessage(message) && Array.isArray(message.content) && message.content.some((block) => typeof block === "object" && block !== null && block.type === "image");
}
function mergePreparedUserTurnMessageForRuntime(params) {
	if (!params.preparedMessage || !isUserMessage(params.runtimeMessage) || isBeforeAgentRunBlockedMessage(params.runtimeMessage)) return params.runtimeMessage;
	const runtimeMessage = params.runtimeMessage;
	const preparedMessage = params.preparedMessage;
	const runtimeMeta = readOpenClawMessageMeta(params.runtimeMessage);
	const preparedMeta = readOpenClawMessageMeta(params.preparedMessage);
	return {
		...runtimeMessage,
		...preparedMessage,
		...preparedMeta ? { __openclaw: {
			...runtimeMeta,
			...preparedMeta
		} } : {},
		...userMessageHasImageContent(params.runtimeMessage) ? { content: params.runtimeMessage.content } : {}
	};
}
/** Restores only auth state that write hooks must not be able to forge or erase. */
function restorePreparedUserTurnOperationalMetaForRuntime(params) {
	if (!params.preparedMessage || !isUserMessage(params.runtimeMessage)) return params.runtimeMessage;
	const senderIsOwner = readOpenClawMessageMeta(params.preparedMessage)?.senderIsOwner;
	if (typeof senderIsOwner !== "boolean") return params.runtimeMessage;
	return {
		...params.runtimeMessage,
		__openclaw: {
			...readOpenClawMessageMeta(params.runtimeMessage),
			senderIsOwner
		}
	};
}
/** Applies before-message hooks while preserving user-turn transcript metadata. */
function preparePersistedUserTurnMessageForTranscriptWrite(message, params) {
	if (!params.beforeMessageWrite) return message;
	const originalMessage = message;
	const idempotencyKey = typeof originalMessage.idempotencyKey === "string" ? originalMessage.idempotencyKey : void 0;
	const provenance = normalizeInputProvenance(message.provenance);
	const senderIsOwner = readOpenClawMessageMeta(message)?.senderIsOwner;
	const originalTransport = readOpenClawMessageMeta(message)?.transport;
	const lateMedia = readOpenClawMessageMeta(message)?.lateMedia === true;
	const originalMedia = readOpenClawMessageMeta(message)?.media;
	const media = Array.isArray(originalMedia) ? structuredClone(originalMedia) : void 0;
	const originalMediaImageLayout = readOpenClawMessageMeta(message)?.mediaImageLayout;
	const mediaImageLayout = originalMediaImageLayout === void 0 ? void 0 : structuredClone(originalMediaImageLayout);
	const transport = originalTransport && typeof originalTransport === "object" && !Array.isArray(originalTransport) ? { ...originalTransport } : void 0;
	const nextMessage = params.beforeMessageWrite({
		message,
		...params.agentId ? { agentId: params.agentId } : {},
		...params.sessionKey ? { sessionKey: params.sessionKey } : {}
	});
	if (nextMessage?.role !== "user") return;
	const nextUserMessage = provenance ? applyInputProvenanceToUserMessage(nextMessage, provenance) : nextMessage;
	if (!idempotencyKey && typeof senderIsOwner !== "boolean" && !transport && !lateMedia && media === void 0 && mediaImageLayout === void 0) return nextUserMessage;
	const protectedMeta = {
		...readOpenClawMessageMeta(nextUserMessage),
		...typeof senderIsOwner === "boolean" ? { senderIsOwner } : {},
		...transport ? { transport } : {},
		...lateMedia ? { lateMedia: true } : {},
		...media === void 0 ? {} : { media },
		...mediaImageLayout === void 0 ? {} : { mediaImageLayout }
	};
	return {
		...nextUserMessage,
		...idempotencyKey ? { idempotencyKey } : {},
		...Object.keys(protectedMeta).length > 0 ? { __openclaw: protectedMeta } : {}
	};
}
async function persistUserTurnTranscript(params) {
	const message = resolvePersistedUserTurnMessage(params);
	if (!message) return;
	const turn = await persistSessionTranscriptTurn({
		sessionId: params.sessionId,
		sessionKey: params.sessionKey,
		sessionEntry: params.sessionEntry,
		...params.sessionStore ? { sessionStore: params.sessionStore } : {},
		...params.storePath ? { storePath: params.storePath } : {},
		agentId: params.agentId,
		...params.threadId !== void 0 ? { threadId: params.threadId } : {}
	}, {
		...params.cwd ? { cwd: params.cwd } : {},
		...params.config ? { config: params.config } : {},
		...params.expectedSessionId ? { expectedSessionId: params.expectedSessionId } : {},
		...params.expectedSessionState ? { expectedSessionState: params.expectedSessionState } : {},
		...params.sessionLifecyclePatch ? { sessionLifecyclePatch: params.sessionLifecyclePatch } : {},
		updateMode: params.updateMode ?? "inline",
		messages: [{
			message,
			idempotencyLookup: "scan",
			prepareMessageAfterIdempotencyCheck: (candidate) => preparePersistedUserTurnMessageForTranscriptWrite(candidate, params)
		}]
	});
	const appended = turn.messages[0];
	if (!appended) return;
	return {
		...appended,
		sessionEntry: turn.sessionEntry,
		sessionFile: params.sessionKey
	};
}
async function resolveUserTurnTranscriptTarget(target) {
	return typeof target === "function" ? await target() : target;
}
function createUserTurnTranscriptRecorder(params) {
	let message = resolvePersistedUserTurnMessage(params);
	let blocked = false;
	let persisted = false;
	let runtimePersisted = false;
	let persistedResult;
	let runtimePersistencePromise;
	let selfPersistencePromise;
	let resolvedMessagePromise;
	let persistedMessageNotified = false;
	let runtimePersistedMessage;
	let sentToProvider = false;
	let resolvedBeforeProvider = false;
	let replacementText;
	const applyReplacementText = (candidate) => {
		if (!candidate || replacementText === void 0) return candidate;
		return {
			...candidate,
			content: replacementText
		};
	};
	const handlePersistenceError = (error) => {
		if (params.onPersistenceError) {
			params.onPersistenceError(error);
			return;
		}
		import("./globals-DVvBiLsc.js").then(({ logVerbose }) => {
			logVerbose(`failed to persist ${params.errorContext ?? "user turn transcript"}: ${String(error)}`);
		}).catch(() => void 0);
	};
	const resolveMessageForPersistence = async () => {
		if (params.message || !params.resolveInput) return applyReplacementText(message);
		if (!resolvedMessagePromise) resolvedMessagePromise = (async () => {
			try {
				const resolvedInput = await params.resolveInput?.();
				const resolvedMessage = resolvePersistedUserTurnMessage({
					message: params.message,
					input: resolvedInput ?? params.input
				}) ?? message;
				resolvedBeforeProvider = !sentToProvider;
				return applyReplacementText(resolvedMessage);
			} catch (error) {
				handlePersistenceError(error);
				return applyReplacementText(message);
			}
		})();
		return await resolvedMessagePromise;
	};
	const notifyMessagePersisted = (persistedMessage) => {
		const notificationMessage = persistedMessage ?? persistedResult?.message ?? message;
		if (!notificationMessage || persistedMessageNotified || !params.onMessagePersisted) return;
		persistedMessageNotified = true;
		try {
			Promise.resolve(params.onMessagePersisted(notificationMessage)).catch(handlePersistenceError);
		} catch (error) {
			handlePersistenceError(error);
		}
	};
	const waitForRuntimePersistence = async () => {
		if (!runtimePersistencePromise) return;
		try {
			await runtimePersistencePromise;
		} catch (error) {
			handlePersistenceError(error);
		}
	};
	const persistPrepared = async (options) => {
		if (options.skipWhenBlocked && blocked) return;
		if (!options.message && !message && !params.resolveInput) return;
		if (options.waitForRuntime) await waitForRuntimePersistence();
		if (selfPersistencePromise) {
			const existingPromise = selfPersistencePromise;
			const existingResult = await existingPromise;
			if (existingResult || !options.retryIfUnpersisted) return existingResult;
			if (selfPersistencePromise !== existingPromise) return await selfPersistencePromise;
			selfPersistencePromise = void 0;
		}
		const persistencePromise = (async () => {
			const resolvedMessage = options.message ?? await resolveMessageForPersistence();
			if (!resolvedMessage) return;
			const target = await resolveUserTurnTranscriptTarget(options.target ?? params.target);
			if (!target) return;
			const resolvedTarget = options.cwd ? {
				...target,
				cwd: options.cwd
			} : target;
			const updateMode = options.updateMode ?? params.updateMode ?? "inline";
			const persistMessage = async (candidate, candidateUpdateMode) => await persistUserTurnTranscript({
				...resolvedTarget,
				message: candidate,
				...options.expectedSessionId ? { expectedSessionId: options.expectedSessionId } : {},
				...options.sessionLifecyclePatch ?? params.sessionLifecyclePatch ? { sessionLifecyclePatch: options.sessionLifecyclePatch ?? params.sessionLifecyclePatch } : {},
				...options.expectedSessionState ?? params.expectedSessionState ? { expectedSessionState: options.expectedSessionState ?? params.expectedSessionState } : {},
				updateMode: candidateUpdateMode,
				...params.beforeMessageWrite ? { beforeMessageWrite: params.beforeMessageWrite } : {}
			});
			const lateMediaMessage = sentToProvider && !resolvedBeforeProvider ? buildLateResolvedMediaMessage({
				admittedMessage: runtimePersistedMessage ?? message,
				resolvedMessage
			}) : void 0;
			if (lateMediaMessage) {
				if (!runtimePersisted && !persisted && message) {
					const admittedResult = await persistMessage(message, updateMode);
					if (admittedResult) {
						persisted = true;
						persistedResult = admittedResult;
						notifyMessagePersisted(admittedResult.message);
					}
				}
				const appendedMedia = await persistMessage(lateMediaMessage, "none");
				if (appendedMedia) {
					persisted = true;
					persistedResult = appendedMedia;
				}
				return appendedMedia;
			}
			if (runtimePersisted) return;
			if (persisted) return persistedResult;
			const result = await persistMessage(resolvedMessage, updateMode);
			if (result) {
				persisted = true;
				persistedResult = result;
				notifyMessagePersisted(result.message);
			}
			return result;
		})();
		selfPersistencePromise = persistencePromise;
		try {
			const result = await persistencePromise;
			if (!result && options.retryIfUnpersisted && selfPersistencePromise === persistencePromise) selfPersistencePromise = void 0;
			return result;
		} catch (error) {
			handlePersistenceError(error);
			throw error;
		}
	};
	return {
		get message() {
			return message;
		},
		resolveMessage: resolveMessageForPersistence,
		replaceTextBeforePersistence: (text) => {
			if (persisted || runtimePersisted || sentToProvider) return;
			replacementText = text;
			message = applyReplacementText(message);
			resolvedMessagePromise = void 0;
		},
		getPersistedMessage: () => runtimePersistedMessage ?? persistedResult?.message,
		markSentToProvider: () => {
			sentToProvider = true;
		},
		markRuntimePersistencePending: (pending) => {
			runtimePersistencePromise = pending;
		},
		markRuntimePersisted: (persistedMessage) => {
			runtimePersistedMessage = persistedMessage;
			runtimePersisted = true;
			if (persistedMessage && persistedResult) persistedResult = {
				...persistedResult,
				message: persistedMessage
			};
			notifyMessagePersisted(persistedMessage);
		},
		markBlocked: () => {
			blocked = true;
		},
		hasPersisted: () => persisted || runtimePersisted,
		isBlocked: () => blocked,
		hasRuntimePersistencePending: () => runtimePersistencePromise !== void 0,
		waitForRuntimePersistence,
		persistApproved: async (options) => await persistPrepared({
			waitForRuntime: false,
			skipWhenBlocked: true,
			target: options?.target,
			updateMode: options?.updateMode,
			cwd: options?.cwd,
			expectedSessionId: options?.expectedSessionId,
			expectedSessionState: options?.expectedSessionState,
			sessionLifecyclePatch: options?.sessionLifecyclePatch,
			retryIfUnpersisted: options?.retryIfUnpersisted
		}),
		persistBlocked: async (blockedMessage, options) => {
			blocked = true;
			return await persistPrepared({
				waitForRuntime: false,
				skipWhenBlocked: false,
				message: blockedMessage,
				target: options?.target,
				updateMode: options?.updateMode,
				cwd: options?.cwd
			});
		},
		persistFallback: async (options) => await persistPrepared({
			waitForRuntime: true,
			skipWhenBlocked: true,
			target: options?.target,
			updateMode: options?.updateMode,
			cwd: options?.cwd
		})
	};
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.userTurnTranscriptTestApi")] = { persistUserTurnTranscript };
//#endregion
export { createUserTurnTranscriptRecorder as a, resolvePersistedUserTurnText as c, buildRunUserTurnIdempotencyKey as i, restorePreparedUserTurnOperationalMetaForRuntime as l, buildPersistedUserTurnMediaInputsFromFields as n, mergePreparedUserTurnMessageForRuntime as o, buildPersistedUserTurnMessage as r, preparePersistedUserTurnMessageForTranscriptWrite as s, buildLateMediaAttachedProjection as t };
