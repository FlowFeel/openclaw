import { t as expectDefined } from "./expect-CyE8FADM.js";
import "./src-COWbwBfI.js";
import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import "./method-scopes-ChuOr7sh.js";
import { t as ADMIN_SCOPE } from "./operator-scopes-Dw7Gu2cA.js";
import { m as readPairingQrReplyChannelData } from "./reply-payload-BtIUrr9c.js";
import { St as publishSqliteTranscriptUpdate, f as withSqliteTranscriptWriteLock, lt as patchSqliteSessionEntry, u as rewriteSqliteTranscriptEventRowsExact } from "./session-accessor.sqlite-B9iW7DOt.js";
import { v as loadSqliteTranscriptEventRowsAfterSeqSync } from "./session-accessor.sqlite-transcript-store-Si6-bv-m.js";
import { D as findTranscriptEvent, S as persistSessionTranscriptTurn, a as readSessionTranscriptWatermark } from "./session-accessor-t3qUoTeV.js";
import { t as resolveMirroredTranscriptText } from "./transcript-mirror-DxrLtJZQ.js";
import { i as stripInlineDirectiveTagsForDisplay } from "./directive-tags-XkukyPkv.js";
import { b as stripEnvelopeFromMessage } from "./session-transcript-readers-O3pZVV3x.js";
import { S as loadSessionEntry } from "./session-utils-row-Cby7i9PV.js";
import "./session-utils-DRzriWC1.js";
import { p as splitMediaFromOutput, t as createOutboundPayloadPlan } from "./payloads-BRd0B8mC.js";
import { s as normalizeMediaReferenceForComparison } from "./reply-payloads-dedupe-CrDHl82Z.js";
import { n as createChatAbortMarker } from "./server-chat-state-C8AVcQU8.js";
import { t as abortChatRunById } from "./chat-abort-BvCyxb9W.js";
import { i as listQueuedChatTurnsForSession, n as abortQueuedChatTurns } from "./chat-queued-turns-DWyXqGgL.js";
import { n as renderQrPngDataUrl } from "./qr-image-IYPK6Q8D.js";
import { t as renderQrTerminal } from "./qr-terminal-27AasTys.js";
import { t as formatForLog } from "./ws-log-B1D_Y86r.js";
import { n as pendingChatSendDedupeKey, t as PENDING_CHAT_SEND_DEDUPE_PREFIX } from "./server-shared-C-7Ahu3n.js";
import { t as asWorkerInferenceControl } from "./inference-control-CDvM08Nt.js";
import { t as setGatewayDedupeEntry } from "./agent-job-C6LRLwR3.js";
import { o as cleanupManagedOutgoingMediaRecords, s as createManagedOutgoingMediaBlocks } from "./managed-image-attachments-XyX6UAvC.js";
//#region src/gateway/server-methods/chat-text-normalization.ts
function normalizeOptionalChatText(value) {
	return value?.trim() || void 0;
}
function normalizeUnknownChatText(value) {
	return typeof value === "string" ? normalizeOptionalChatText(value) : void 0;
}
//#endregion
//#region src/gateway/server-methods/chat-abort-authorization.ts
function buildAbortedChatSendPayload(params) {
	return {
		runId: params.runId,
		status: "timeout",
		summary: "aborted",
		...params.stopReason ? { stopReason: params.stopReason } : {},
		endedAt: params.endedAt
	};
}
function resolveChatAbortRequester(client) {
	const scopes = Array.isArray(client?.connect?.scopes) ? client.connect.scopes : [];
	return {
		connId: normalizeOptionalChatText(client?.connId),
		deviceId: normalizeOptionalChatText(client?.connect?.device?.id),
		isAdmin: scopes.includes(ADMIN_SCOPE)
	};
}
function canRequesterAbortChatRun(entry, requester) {
	if (requester.isAdmin) return true;
	const ownerDeviceId = normalizeOptionalChatText(entry.ownerDeviceId);
	const ownerConnId = normalizeOptionalChatText(entry.ownerConnId);
	if (!ownerDeviceId && !ownerConnId) return true;
	if (ownerDeviceId && requester.deviceId && ownerDeviceId === requester.deviceId) return true;
	if (ownerConnId && requester.connId && ownerConnId === requester.connId) return true;
	return false;
}
function canRequesterAbortChatRunWithoutSessionMatch(entry, requester) {
	if (requester.isAdmin) return true;
	const ownerDeviceId = normalizeOptionalChatText(entry.ownerDeviceId);
	const ownerConnId = normalizeOptionalChatText(entry.ownerConnId);
	return Boolean(ownerDeviceId && requester.deviceId && ownerDeviceId === requester.deviceId || ownerConnId && requester.connId && ownerConnId === requester.connId);
}
function readPreRegisteredAgentDedupePayloadForSession(params) {
	if (!params.entry?.ok) return;
	const payload = params.entry.payload;
	if (payload?.status !== "accepted") return;
	if (!params.includeHidden && payload.controlUiVisible === false) return;
	const payloadRunId = normalizeUnknownChatText(payload.runId);
	if (payloadRunId && payloadRunId !== params.runId) return;
	const payloadSessionKeys = /* @__PURE__ */ new Set([normalizeUnknownChatText(payload.sessionKey), ...Array.isArray(payload.sessionKeyAliases) ? payload.sessionKeyAliases.map(normalizeUnknownChatText) : []]);
	const hasPayloadSessionKey = [...payloadSessionKeys].some(Boolean);
	if (hasPayloadSessionKey && !payloadSessionKeys.has(params.sessionKey) || !hasPayloadSessionKey && payloadRunId !== params.runId) return;
	const agentId = normalizeOptionalChatText(params.agentId)?.toLowerCase();
	if (agentId) {
		const parsed = parseAgentSessionKey(params.sessionKey);
		const sessionAgentId = params.sessionKey === "global" ? resolveStoredGlobalRunAgentId(normalizeUnknownChatText(payload.agentId), params.defaultAgentId) : parsed?.agentId ? normalizeAgentId(parsed.agentId) : void 0;
		if (sessionAgentId && sessionAgentId !== agentId) return;
	}
	return payload;
}
function readPreRegisteredRun(params) {
	if (!params.key.startsWith(params.keyPrefix) || !params.entry?.ok) return;
	const payload = params.entry.payload;
	if (payload?.status !== "accepted") return;
	if (!params.includeHidden && payload.controlUiVisible === false) return;
	const runId = normalizeUnknownChatText(payload.runId) ?? normalizeOptionalChatText(params.key.slice(params.keyPrefix.length));
	const sessionKey = normalizeUnknownChatText(payload.sessionKey);
	if (!runId || !sessionKey) return;
	return {
		runId,
		sessionKey,
		payload
	};
}
function canRequesterAbortPreRegisteredRun(payload, requester) {
	return canRequesterAbortChatRun({
		controller: new AbortController(),
		sessionId: "",
		sessionKey: normalizeUnknownChatText(payload.sessionKey) ?? "",
		startedAtMs: 0,
		expiresAtMs: 0,
		ownerConnId: normalizeUnknownChatText(payload.ownerConnId),
		ownerDeviceId: normalizeUnknownChatText(payload.ownerDeviceId),
		controlUiVisible: payload.controlUiVisible === false ? false : void 0,
		kind: "agent"
	}, requester);
}
function resolvePreRegisteredAgentDedupeKeys(payload, runId) {
	const keys = [`agent:${runId}`];
	const payloadKeys = Array.isArray(payload.dedupeKeys) ? payload.dedupeKeys : [];
	for (const key of payloadKeys) {
		const normalized = normalizeUnknownChatText(key);
		if (normalized?.startsWith("agent:")) keys.push(normalized);
	}
	return uniqueStrings(keys);
}
function resolveStoredGlobalRunAgentId(agentId, defaultAgentId) {
	return normalizeOptionalChatText(agentId)?.toLowerCase() ?? defaultAgentId.toLowerCase();
}
function writePreRegisteredAgentAbort(params) {
	const endedAt = params.endedAt ?? Date.now();
	const payloadAgentId = normalizeUnknownChatText(params.payload.agentId);
	for (const key of resolvePreRegisteredAgentDedupeKeys(params.payload, params.runId)) setGatewayDedupeEntry({
		dedupe: params.context.dedupe,
		key,
		entry: {
			ts: endedAt,
			ok: true,
			payload: {
				runId: params.runId,
				...params.sessionKey ? { sessionKey: params.sessionKey } : {},
				...payloadAgentId ? { agentId: payloadAgentId } : {},
				...params.payload.controlUiVisible === false ? { controlUiVisible: false } : {},
				status: "timeout",
				summary: "aborted",
				stopReason: params.stopReason,
				endedAt
			}
		}
	});
}
function writePreRegisteredChatAbort(params) {
	const endedAt = params.endedAt ?? Date.now();
	const payload = buildAbortedChatSendPayload({
		runId: params.runId,
		stopReason: params.stopReason,
		endedAt
	});
	params.context.chatRunState.getOrCreate(params.runId).abortMarker = createChatAbortMarker(endedAt);
	const pendingKey = pendingChatSendDedupeKey(params.runId);
	const pendingAttemptId = normalizeUnknownChatText((params.context.dedupe.get(pendingKey)?.payload)?.attemptId);
	if (!params.attemptId || pendingAttemptId === params.attemptId) params.context.dedupe.delete(pendingKey);
	setGatewayDedupeEntry({
		dedupe: params.context.dedupe,
		key: `chat:${params.runId}`,
		entry: {
			ts: endedAt,
			ok: true,
			payload
		}
	});
}
function resolveAuthorizedPreRegisteredRunsForSessionKeys(params) {
	const sessionKeys = new Set(Array.from(params.sessionKeys, (sessionKey) => normalizeOptionalChatText(sessionKey)).filter((sessionKey) => Boolean(sessionKey)));
	const authorizedByRunId = /* @__PURE__ */ new Map();
	let hasUnauthorizedRuns = false;
	let hasUnauthorizedProtectedRuns = false;
	let hasProtectedRuns = false;
	for (const [key, entry] of params.context.dedupe) {
		const run = readPreRegisteredRun({
			key,
			entry,
			keyPrefix: params.keyPrefix,
			includeHidden: true
		});
		if (!run) continue;
		if (params.excludeRunIds?.has(run.runId)) continue;
		if (![run.sessionKey, ...Array.isArray(run.payload.sessionKeyAliases) ? run.payload.sessionKeyAliases.map(normalizeUnknownChatText) : []].some((sessionKey) => Boolean(sessionKey && sessionKeys.has(sessionKey)))) continue;
		if (params.context.chatAbortControllers.has(run.runId)) continue;
		const agentId = normalizeOptionalChatText(params.agentId)?.toLowerCase();
		if (agentId && run.sessionKey === "global" && resolveStoredGlobalRunAgentId(normalizeUnknownChatText(run.payload.agentId), params.defaultAgentId) !== agentId) continue;
		const requesterCanAbort = canRequesterAbortPreRegisteredRun(run.payload, params.requester);
		if (run.payload.controlUiVisible === false || params.preserveSideRuns && normalizeUnknownChatText(run.payload.turnKind) === "btw") {
			hasProtectedRuns = true;
			if (!requesterCanAbort) hasUnauthorizedProtectedRuns = true;
			continue;
		}
		if (requesterCanAbort) authorizedByRunId.set(run.runId, run);
		else hasUnauthorizedRuns = true;
	}
	return {
		authorizedRuns: [...authorizedByRunId.values()],
		hasUnauthorizedRuns,
		hasUnauthorizedProtectedRuns,
		hasProtectedRuns
	};
}
function resolveAuthorizedRunsForSessionKeys(params) {
	const sessionKeys = new Set(Array.from(params.sessionKeys, (sessionKey) => normalizeOptionalChatText(sessionKey)).filter((sessionKey) => Boolean(sessionKey)));
	const sessionIds = new Set(Array.from(params.sessionIds ?? [], (sessionId) => normalizeOptionalChatText(sessionId)).filter((sessionId) => Boolean(sessionId)));
	const agentId = normalizeOptionalChatText(params.agentId)?.toLowerCase();
	const authorizedRuns = [];
	const matchedRunIds = [];
	let hasUnauthorizedRuns = false;
	let hasUnauthorizedProtectedRuns = false;
	let hasProtectedRuns = false;
	for (const [runId, active] of params.chatAbortControllers) {
		if (params.excludeRunIds?.has(runId)) continue;
		if (!sessionKeys.has(active.sessionKey) && !sessionIds.has(active.sessionId)) continue;
		if (agentId && active.sessionKey === "global" && resolveStoredGlobalRunAgentId(active.agentId, params.defaultAgentId) !== agentId) continue;
		matchedRunIds.push(runId);
		const requesterCanAbort = canRequesterAbortChatRun(active, params.requester);
		if (active.controlUiVisible === false || params.preserveSideRuns && active.turnKind === "btw") {
			hasProtectedRuns = true;
			if (!requesterCanAbort) hasUnauthorizedProtectedRuns = true;
			continue;
		}
		if (requesterCanAbort) authorizedRuns.push({
			runId,
			sessionKey: active.sessionKey
		});
		else hasUnauthorizedRuns = true;
	}
	return {
		authorizedRuns,
		matchedRunIds,
		hasUnauthorizedRuns,
		hasUnauthorizedProtectedRuns,
		hasProtectedRuns
	};
}
function canRequesterAbortQueuedChatTurn(entry, requester) {
	if (requester.isAdmin) return true;
	const ownerDeviceId = normalizeOptionalChatText(entry.ownerDeviceId);
	const ownerConnId = normalizeOptionalChatText(entry.ownerConnId);
	if (!ownerDeviceId && !ownerConnId) return true;
	if (ownerDeviceId && requester.deviceId && ownerDeviceId === requester.deviceId) return true;
	if (ownerConnId && requester.connId && ownerConnId === requester.connId) return true;
	return false;
}
function canRequesterAbortQueuedChatTurnWithoutSessionMatch(entry, requester) {
	if (requester.isAdmin) return true;
	const ownerDeviceId = normalizeOptionalChatText(entry.ownerDeviceId);
	const ownerConnId = normalizeOptionalChatText(entry.ownerConnId);
	return Boolean(ownerDeviceId && requester.deviceId && ownerDeviceId === requester.deviceId || ownerConnId && requester.connId && ownerConnId === requester.connId);
}
//#endregion
//#region src/gateway/server-methods/chat-assistant-content.ts
const MANAGED_OUTGOING_MEDIA_PATH_PREFIX = "/api/chat/media/outgoing/";
const chatHistoryManagedMediaCleanupState = /* @__PURE__ */ new Map();
function collectReplyMediaEntries(payload) {
	const attachmentByReference = /* @__PURE__ */ new Map();
	for (const attachment of payload.attachments ?? []) {
		const reference = (attachment.path ?? attachment.url ?? attachment.mediaUrl ?? attachment.filePath)?.trim();
		if (reference && !attachmentByReference.has(reference)) attachmentByReference.set(reference, attachment);
	}
	const mediaUrlCount = payload.mediaUrls?.length ?? 0;
	return [...(payload.mediaUrls ?? []).map((url, index) => ({
		url,
		attachment: attachmentByReference.get(url.trim()) ?? payload.attachments?.[index]
	})), ...typeof payload.mediaUrl === "string" ? [{
		url: payload.mediaUrl,
		attachment: attachmentByReference.get(payload.mediaUrl.trim()) ?? payload.attachments?.[mediaUrlCount]
	}] : []];
}
function resolveAlignedReplyMedia(payload, metadataSource = payload) {
	const metadataByUrl = /* @__PURE__ */ new Map();
	for (const entry of collectReplyMediaEntries(metadataSource)) {
		const key = entry.url.trim();
		if (key && entry.attachment && !metadataByUrl.has(key)) metadataByUrl.set(key, entry.attachment);
	}
	const seen = /* @__PURE__ */ new Set();
	const mediaUrls = [];
	const attachments = [];
	let hasMetadata = false;
	for (const entry of collectReplyMediaEntries(payload)) {
		const key = entry.url.trim();
		if (!key || seen.has(key)) continue;
		seen.add(key);
		mediaUrls.push(entry.url);
		const attachment = metadataByUrl.get(key) ?? entry.attachment ?? {};
		attachments.push(attachment);
		hasMetadata ||= Object.keys(attachment).length > 0;
	}
	return {
		mediaUrls,
		...hasMetadata ? { attachments } : {}
	};
}
function splitReplyMediaByTrust(media, payloadTrusted) {
	const groups = /* @__PURE__ */ new Map();
	for (const [index, url] of media.mediaUrls.entries()) {
		const attachment = media.attachments?.[index] ?? {};
		const trusted = attachment.trustedLocalMedia ?? payloadTrusted;
		const group = groups.get(trusted) ?? {
			mediaUrls: [],
			attachments: [],
			sourceIndexes: []
		};
		group.mediaUrls.push(url);
		group.attachments.push(attachment);
		group.sourceIndexes.push(index);
		groups.set(trusted, group);
	}
	return [...groups].map(([trustedLocalMedia, group]) => Object.assign(group, { trustedLocalMedia }));
}
/** Recombine non-streamed text without destroying Markdown's meaningful indentation. */
function combineNonStreamingReplyParts(parts) {
	let combined = "";
	for (const part of parts) {
		if (!part.trim()) continue;
		if (!combined) {
			combined = part;
			continue;
		}
		const separator = /[\r\n]$/.test(combined) || /^[\r\n]/.test(part) ? "" : /^[\t ]+\S/.test(part) ? "\n" : "\n\n";
		combined += separator + part;
	}
	return combined.trim();
}
function isMediaBearingPayload(payload) {
	if (payload.isReasoning === true) return false;
	if (payload.mediaUrl?.trim()) return true;
	return Boolean(payload.mediaUrls?.some((url) => url.trim()));
}
function hasSensitiveMediaPayload(payloads) {
	return payloads.some((payload) => payload.sensitiveMedia === true && (isMediaBearingPayload(payload) || Boolean(readPairingQrReplyChannelData(payload))));
}
async function buildPairingQrAssistantContentBlock(payload) {
	const qr = readPairingQrReplyChannelData(payload);
	if (!qr) return;
	const [imageUrl, terminalText] = await Promise.all([renderQrPngDataUrl(qr.setupCode), renderQrTerminal(qr.setupCode, { small: true })]);
	return {
		type: "openclaw_pairing_qr",
		image_url: imageUrl,
		terminalText,
		alt: "OpenClaw pairing QR code",
		expiresAtMs: qr.expiresAtMs,
		sensitive: true
	};
}
function sanitizeAssistantDisplayText(value, options) {
	if (!value) return;
	const withoutEnvelope = stripEnvelopeFromMessage(value);
	const stripped = stripInlineDirectiveTagsForDisplay(typeof withoutEnvelope === "string" ? withoutEnvelope : value).text;
	const visible = stripped.trim();
	return visible ? options?.preserveBoundaries ? stripped : visible : void 0;
}
function extractAssistantDisplayTextFromContent(content) {
	if (!Array.isArray(content) || content.length === 0) return;
	return combineNonStreamingReplyParts(content.map((block) => {
		if (block?.type !== "text" || typeof block.text !== "string") return "";
		return block.text;
	}).filter(Boolean)) || void 0;
}
async function buildAssistantDisplayContentFromReplyPayloads(params) {
	const rawTextPayloadCount = params.payloads.filter((payload) => payload.isReasoning !== true && typeof payload.text === "string" && payload.text.trim().length > 0).length;
	const plan = createOutboundPayloadPlan(params.payloads);
	if (plan.length === 0) return rawTextPayloadCount > 0 ? [{
		type: "text",
		text: ""
	}] : void 0;
	const preserveTextBoundaries = plan.filter(({ payload }) => typeof payload.text === "string" && payload.text.trim()).length > 1;
	const content = [];
	let strippedTextPayloadCount = 0;
	for (const entry of plan) {
		const payload = entry.payload;
		const text = sanitizeAssistantDisplayText(payload.text, { preserveBoundaries: preserveTextBoundaries });
		if (text) {
			const previousBlock = content.at(-1);
			if (previousBlock?.type === "text" && typeof previousBlock.text === "string") previousBlock.text = combineNonStreamingReplyParts([previousBlock.text, text]);
			else content.push({
				type: "text",
				text
			});
		} else if (typeof payload.text === "string" && payload.text.trim().length > 0) strippedTextPayloadCount += 1;
		if (params.includeSensitiveDisplay === true) try {
			const pairingQrBlock = await buildPairingQrAssistantContentBlock(payload);
			if (pairingQrBlock) content.push(pairingQrBlock);
		} catch (err) {
			params.onSensitiveDisplayPrepareError?.(formatForLog(err));
		}
		if (params.includeSensitiveMedia === false && payload.sensitiveMedia === true) continue;
		const media = resolveAlignedReplyMedia(payload, params.payloads[entry.sourceIndex] ?? payload);
		const preparedMedia = [];
		for (const mediaGroup of splitReplyMediaByTrust(media, payload.trustedLocalMedia === true)) for (const [groupIndex, mediaUrl] of mediaGroup.mediaUrls.entries()) {
			const mediaBlocks = await createManagedOutgoingMediaBlocks({
				sessionKey: params.sessionKey,
				...params.sessionKey === "global" && params.agentId ? { agentId: params.agentId } : {},
				mediaUrls: [mediaUrl],
				attachments: [mediaGroup.attachments[groupIndex] ?? {}],
				localRoots: params.managedMediaLocalRoots,
				allowLocalNonImage: mediaGroup.trustedLocalMedia,
				continueOnPrepareError: true,
				onPrepareError: (error) => {
					params.onManagedMediaPrepareError?.(error.message);
				}
			});
			if (payload.audioAsVoice === true) {
				for (const block of mediaBlocks) if (block.type === "audio") block.isVoiceNote = true;
			}
			preparedMedia.push({
				sourceIndex: mediaGroup.sourceIndexes[groupIndex] ?? groupIndex,
				blocks: mediaBlocks
			});
		}
		preparedMedia.sort((left, right) => left.sourceIndex - right.sourceIndex);
		content.push(...preparedMedia.flatMap((preparedEntry) => preparedEntry.blocks));
	}
	if (content.length > 0) return content;
	return strippedTextPayloadCount > 0 ? [{
		type: "text",
		text: ""
	}] : void 0;
}
function replaceAssistantContentTextBlocks(content, transcriptMediaMessage) {
	const transcriptTextBlocks = (transcriptMediaMessage?.content ?? []).filter((block) => Boolean(block) && typeof block === "object" && block.type === "text" && typeof block.text === "string");
	if (transcriptTextBlocks.length === 0) return content ? [...content] : void 0;
	if (!content || content.length === 0) return [...transcriptTextBlocks];
	const merged = [];
	let transcriptTextIndex = 0;
	for (const block of content) {
		if (block?.type === "text" && typeof block.text === "string" && transcriptTextIndex < transcriptTextBlocks.length) {
			merged.push(expectDefined(transcriptTextBlocks[transcriptTextIndex++], "transcript text blocks entry at transcript text index++"));
			continue;
		}
		merged.push(block);
	}
	if (transcriptTextIndex < transcriptTextBlocks.length) merged.unshift(...transcriptTextBlocks.slice(transcriptTextIndex));
	return merged;
}
function isManagedOutgoingMediaUrl(value) {
	if (typeof value !== "string" || !value.trim()) return false;
	try {
		return new URL(value, "http://localhost").pathname.startsWith(MANAGED_OUTGOING_MEDIA_PATH_PREFIX);
	} catch {
		return false;
	}
}
function stripManagedOutgoingAssistantContentBlocks(content) {
	if (!content || content.length === 0) return;
	const filtered = content.filter((block) => {
		if (block?.type !== "image" && block?.type !== "audio" && block?.type !== "video") return true;
		return !(isManagedOutgoingMediaUrl(block.url) || isManagedOutgoingMediaUrl(block.openUrl));
	});
	return filtered.length > 0 ? filtered : void 0;
}
function extractAssistantDisplayText(content) {
	if (!content || content.length === 0) return;
	return combineNonStreamingReplyParts(content.map((block) => block?.type === "text" && typeof block.text === "string" ? block.text : "")) || void 0;
}
function hasAssistantDisplayMediaContent(content) {
	return Boolean(content?.some((block) => block?.type !== "text"));
}
function hasVisibleAssistantFinalMessage(message) {
	if (!message) return false;
	if (typeof message.text === "string" && message.text.trim()) return true;
	return (Array.isArray(message.content) ? message.content : []).some((block) => {
		if (!block || typeof block !== "object") return false;
		const record = block;
		if (record.type === "text") return typeof record.text === "string" && record.text.trim().length > 0;
		return true;
	});
}
function hasManagedOutgoingAssistantContent(content) {
	return Boolean(content?.some((block) => (block?.type === "image" || block?.type === "audio" || block?.type === "video") && (isManagedOutgoingMediaUrl(block.url) || isManagedOutgoingMediaUrl(block.openUrl))));
}
function scheduleChatHistoryManagedMediaCleanup(params) {
	const cleanupKey = params.sessionKey === "global" && params.agentId ? `agent:${params.agentId}:global` : params.sessionKey;
	if (chatHistoryManagedMediaCleanupState.has(cleanupKey)) return;
	const pending = cleanupManagedOutgoingMediaRecords({
		sessionKey: params.sessionKey,
		...params.sessionKey === "global" && params.agentId ? { agentId: params.agentId } : {}
	}).then(() => void 0).catch((error) => {
		params.context.logGateway.debug(`chat.history managed media cleanup skipped sessionKey=${JSON.stringify(params.sessionKey)} error=${formatForLog(error)}`);
	}).finally(() => {
		if (chatHistoryManagedMediaCleanupState.get(cleanupKey) === pending) chatHistoryManagedMediaCleanupState.delete(cleanupKey);
	});
	chatHistoryManagedMediaCleanupState.set(cleanupKey, pending);
}
//#endregion
//#region src/gateway/server-methods/chat-transcript-inject.ts
function resolveInjectedAssistantContent(params) {
	const labelPrefix = params.label ? `[${params.label}]\n\n` : "";
	if (params.content && params.content.length > 0) {
		if (!labelPrefix) return params.content;
		const first = params.content[0];
		if (first && typeof first === "object" && first.type === "text" && typeof first.text === "string") return [{
			...first,
			text: `${labelPrefix}${first.text}`
		}, ...params.content.slice(1)];
		return [{
			type: "text",
			text: labelPrefix.trim()
		}, ...params.content];
	}
	return [{
		type: "text",
		text: `${labelPrefix}${params.message}`
	}];
}
/** Append a gateway-authored assistant message while preserving transcript parent links. */
async function appendInjectedAssistantMessageToTranscript(params) {
	const now = params.now ?? Date.now();
	const messageBody = {
		role: "assistant",
		content: resolveInjectedAssistantContent({
			message: params.message,
			label: params.label,
			content: params.content
		}),
		timestamp: now,
		stopReason: "stop",
		usage: {
			input: 0,
			output: 0,
			cacheRead: 0,
			cacheWrite: 0,
			totalTokens: 0,
			cost: {
				input: 0,
				output: 0,
				cacheRead: 0,
				cacheWrite: 0,
				total: 0
			}
		},
		api: "openai-responses",
		provider: "openclaw",
		model: "gateway-injected",
		...params.idempotencyKey ? { idempotencyKey: params.idempotencyKey } : {},
		...params.ttsSupplement ? { openclawTtsSupplement: params.ttsSupplement } : {},
		...params.abortMeta ? { openclawAbort: {
			aborted: true,
			origin: params.abortMeta.origin,
			runId: params.abortMeta.runId
		} } : {}
	};
	try {
		if (!params.transcriptPath && (!params.storePath || !params.sessionId || !params.sessionKey)) return {
			ok: false,
			error: "transcript identity not resolved"
		};
		const appended = (await persistSessionTranscriptTurn({
			sessionKey: params.sessionKey ?? "",
			...params.transcriptPath ? { sessionFile: params.transcriptPath } : {},
			...params.storePath ? { storePath: params.storePath } : {},
			...params.sessionId ? { sessionId: params.sessionId } : {},
			...params.agentId ? { agentId: params.agentId } : {}
		}, {
			updateMode: "inline",
			touchSessionEntry: Boolean(params.storePath && params.sessionId && params.sessionKey),
			...params.config ? { config: params.config } : {},
			messages: [{
				message: messageBody,
				idempotencyLookup: "scan-assistant",
				now,
				useRawWhenLinear: true
			}]
		})).messages[0];
		if (!appended) return {
			ok: false,
			error: "gateway-injected assistant message was not appended"
		};
		return {
			ok: true,
			messageId: appended.messageId,
			message: appended.message
		};
	} catch (err) {
		return {
			ok: false,
			error: formatErrorMessage(err)
		};
	}
}
//#endregion
//#region src/gateway/server-methods/chat-transcript-persistence.ts
function assistantTranscriptScope(params) {
	const sessionKey = params.sessionKey.trim();
	if (!sessionKey || !params.sessionId.trim()) return null;
	return {
		sessionKey,
		sessionId: params.sessionId,
		...params.storePath ? { storePath: params.storePath } : {},
		...params.agentId ? { agentId: params.agentId } : {}
	};
}
function transcriptEventRecord(event) {
	return event && typeof event === "object" && !Array.isArray(event) ? event : void 0;
}
function transcriptEventId(event) {
	const id = transcriptEventRecord(event)?.id;
	return typeof id === "string" && id.trim().length > 0 ? id : void 0;
}
function transcriptEventMessage(event) {
	const message = transcriptEventRecord(event)?.message;
	return message && typeof message === "object" && !Array.isArray(message) ? message : void 0;
}
function findAssistantTranscriptMessageByIdempotencyKeyInEvents(events, idempotencyKey) {
	const trimmedIdempotencyKey = idempotencyKey.trim();
	if (!trimmedIdempotencyKey) return null;
	const target = events.toReversed().find((event) => {
		const message = transcriptEventMessage(event);
		return message?.role === "assistant" && message.idempotencyKey === trimmedIdempotencyKey;
	});
	const message = target ? transcriptEventMessage(target) : void 0;
	const messageId = target ? transcriptEventId(target) : void 0;
	if (!messageId || !message) return null;
	return {
		messageId,
		message
	};
}
function findAssistantTranscriptMessageByTurnIndexAndMediaInEvents(events, params) {
	const expectedMedia = new Set(params.mediaUrls.map((value) => normalizeMediaReferenceForComparison(value)).filter((value) => value.length > 0));
	if (expectedMedia.size === 0 || !Number.isSafeInteger(params.assistantMessageIndex) || params.assistantMessageIndex < 1) return null;
	const target = events.filter((event) => transcriptEventMessage(event)?.role === "assistant")[params.assistantMessageIndex - 1];
	const message = target ? transcriptEventMessage(target) : void 0;
	const messageId = target ? transcriptEventId(target) : void 0;
	const text = message ? extractAssistantTranscriptText(message) : void 0;
	if (!messageId || !message || !text) return null;
	const actualMedia = new Set((splitMediaFromOutput(text).mediaUrls ?? []).map((value) => normalizeMediaReferenceForComparison(value)).filter((value) => value.length > 0));
	return actualMedia.size === expectedMedia.size && [...expectedMedia].every((value) => actualMedia.has(value)) ? {
		messageId,
		message
	} : null;
}
function mergeManagedMediaIntoAssistantContent(params) {
	const original = Array.isArray(params.message.content) ? params.message.content : [];
	const managedBlocks = params.replacement.filter((block) => block?.type !== "text");
	if (managedBlocks.length === 0) return null;
	let replaced = false;
	const merged = [];
	for (const block of original) {
		if (block?.type !== "text" || typeof block.text !== "string") {
			merged.push(block);
			continue;
		}
		const split = splitMediaFromOutput(block.text);
		const directiveTagsChanged = stripInlineDirectiveTagsForDisplay(split.text).changed;
		const visibleText = sanitizeAssistantDisplayText(split.text, { preserveBoundaries: !directiveTagsChanged });
		if (visibleText) {
			const { textSignature: _textSignature, ...rest } = block;
			merged.push({
				...rest,
				text: visibleText
			});
		}
		if (split.mediaUrls?.length && !replaced) {
			merged.push(...managedBlocks);
			replaced = true;
		}
	}
	return replaced ? merged : null;
}
function findSourceReplyTranscriptMirrorByIdempotencyKeyInEvents(events, idempotencyKey) {
	const found = findAssistantTranscriptMessageByIdempotencyKeyInEvents(events, idempotencyKey);
	if (found?.message.provider !== "openclaw" || found.message.model !== "delivery-mirror") return null;
	return found;
}
function extractAssistantTranscriptText(message) {
	const content = message.content;
	if (!Array.isArray(content)) return;
	return content.map((block) => block && typeof block === "object" && block.type === "text" && typeof block.text === "string" ? block.text.trim() ?? "" : "").filter(Boolean).join("\n").trim() || void 0;
}
function findSourceReplyTranscriptMirrorByMetadataInEvents(params) {
	const byIdempotencyKey = findSourceReplyTranscriptMirrorByIdempotencyKeyInEvents(params.events, params.idempotencyKey);
	if (byIdempotencyKey) return byIdempotencyKey;
	const expectedText = resolveMirroredTranscriptText({
		text: params.metadata?.text,
		mediaUrls: params.metadata?.mediaUrls
	});
	if (!expectedText) return null;
	const target = params.events.toReversed().find((event) => {
		const message = transcriptEventMessage(event);
		return typeof transcriptEventId(event) === "string" && message?.role === "assistant" && message.provider === "openclaw" && message.model === "delivery-mirror" && extractAssistantTranscriptText(message) === expectedText;
	});
	const message = target ? transcriptEventMessage(target) : void 0;
	const messageId = target ? transcriptEventId(target) : void 0;
	if (!messageId || !message) return null;
	return {
		messageId,
		message
	};
}
async function transcriptExists(scope) {
	const sessionId = scope.sessionId;
	if (!sessionId) return false;
	return await findTranscriptEvent({
		...scope,
		sessionId
	}, () => true).catch(() => void 0) !== void 0;
}
async function appendAssistantTranscriptMessage(params) {
	const scope = assistantTranscriptScope(params);
	if (!scope) return {
		ok: false,
		error: "transcript identity not resolved"
	};
	if (!params.createIfMissing && !await transcriptExists(scope)) return {
		ok: false,
		error: "transcript not found"
	};
	return await appendInjectedAssistantMessageToTranscript({
		sessionKey: params.sessionKey,
		sessionId: params.sessionId,
		storePath: params.storePath,
		...params.agentId ? { agentId: params.agentId } : {},
		message: params.message,
		label: params.label,
		content: params.content,
		idempotencyKey: params.idempotencyKey,
		abortMeta: params.abortMeta,
		ttsSupplement: params.ttsSupplement,
		config: params.cfg
	});
}
async function touchAssistantTranscriptSessionEntry(scope) {
	if (!scope.storePath || !scope.sessionKey || !scope.sessionId) return;
	const transcriptMarkerUpdatedAt = Date.now();
	await patchSqliteSessionEntry({
		storePath: scope.storePath,
		sessionKey: scope.sessionKey,
		...scope.agentId ? { agentId: scope.agentId } : {}
	}, (current) => current.sessionId === scope.sessionId ? { updatedAt: transcriptMarkerUpdatedAt } : null, { skipMaintenance: true });
}
async function rewriteSourceReplyTranscriptMirrors(params) {
	if (params.requests.length === 0 || params.candidates.length === 0) return [];
	return await withSqliteTranscriptWriteLock(params.scope, async (transcript) => {
		const events = await transcript.readEvents();
		const allowedSourceReplyMirrorIds = /* @__PURE__ */ new Set();
		for (const candidate of params.candidates) {
			const target = findSourceReplyTranscriptMirrorByMetadataInEvents({
				events,
				idempotencyKey: candidate.idempotencyKey,
				metadata: candidate.metadata
			});
			if (target) allowedSourceReplyMirrorIds.add(target.messageId);
		}
		const rewriteTargets = [];
		for (const request of params.requests) {
			const target = findSourceReplyTranscriptMirrorByMetadataInEvents({
				events,
				idempotencyKey: request.idempotencyKey,
				metadata: request.metadata
			});
			if (target) rewriteTargets.push({
				request,
				...target
			});
		}
		if (rewriteTargets.length === 0) return [];
		const rewriteTargetIds = new Set(rewriteTargets.map((target) => target.messageId));
		const firstRewriteEntryIndex = events.findIndex((event) => {
			const id = transcriptEventId(event);
			return id ? rewriteTargetIds.has(id) : false;
		});
		if (!(firstRewriteEntryIndex >= 0 && events.slice(firstRewriteEntryIndex).every((event) => {
			const id = transcriptEventId(event);
			return !id || allowedSourceReplyMirrorIds.has(id);
		}))) return [];
		const replacementsById = new Map(rewriteTargets.map((target) => [target.messageId, target]));
		const rewrittenEvents = events.map((event) => {
			const id = transcriptEventId(event);
			const replacement = id ? replacementsById.get(id) : void 0;
			if (!replacement) return event;
			return Object.assign({}, event, { message: {
				...replacement.message,
				idempotencyKey: replacement.request.idempotencyKey,
				content: replacement.request.state.persistedContent
			} });
		});
		await transcript.replaceEvents(rewrittenEvents);
		return rewriteTargets.map((target) => ({
			messageId: target.messageId,
			request: target.request
		}));
	});
}
async function rewriteAssistantTranscriptMessageByIdempotencyKey(params) {
	const idempotencyKey = params.idempotencyKey.trim();
	if (!idempotencyKey || params.content.length === 0) return null;
	return await withSqliteTranscriptWriteLock(params.scope, async (transcript) => {
		const events = await transcript.readEvents();
		const target = findAssistantTranscriptMessageByIdempotencyKeyInEvents(events, idempotencyKey);
		if (!target) return null;
		const rewrittenEvents = events.map((event) => transcriptEventId(event) === target.messageId ? Object.assign({}, event, { message: {
			...target.message,
			content: params.content
		} }) : event);
		await transcript.replaceEvents(rewrittenEvents);
		return { messageId: target.messageId };
	});
}
async function rewriteAssistantTranscriptMessageByTurnIndexAndMedia(params) {
	if (params.content.length === 0 || params.mediaUrls.length === 0) return null;
	const currentWatermark = readSessionTranscriptWatermark(params.scope);
	const initialGenerationMaterialized = params.expectedGeneration === null && params.afterSeq === 0;
	if (currentWatermark.generation !== params.expectedGeneration && !initialGenerationMaterialized) return null;
	const currentTurnRows = loadSqliteTranscriptEventRowsAfterSeqSync(params.scope, params.afterSeq);
	const target = findAssistantTranscriptMessageByTurnIndexAndMediaInEvents(currentTurnRows.map((row) => row.event), params);
	if (!target) return null;
	const targetRow = currentTurnRows.find((row) => transcriptEventId(row.event) === target.messageId);
	if (!targetRow) return null;
	const mergedContent = mergeManagedMediaIntoAssistantContent({
		message: target.message,
		replacement: params.content
	});
	if (!mergedContent) return null;
	const rewrittenEvent = Object.assign({}, targetRow.event, { message: {
		...target.message,
		content: mergedContent
	} });
	const rewritten = await rewriteSqliteTranscriptEventRowsExact(params.scope, {
		allowInitialGenerationMaterialization: initialGenerationMaterialized,
		expectedGeneration: params.expectedGeneration,
		rows: [{
			event: rewrittenEvent,
			expectedEventJson: JSON.stringify(targetRow.event),
			seq: targetRow.seq
		}]
	});
	return rewritten ? {
		generation: rewritten.generation,
		messageId: target.messageId
	} : null;
}
async function publishAssistantTranscriptRewrite(params) {
	if (params.rewritten.length === 0) return;
	await touchAssistantTranscriptSessionEntry(params.scope);
	await publishSqliteTranscriptUpdate(params.scope, { messageId: params.rewritten.at(-1)?.messageId });
}
//#endregion
//#region src/gateway/server-methods/chat-abort-runtime.ts
function collectSessionAbortPartials(params) {
	const out = [];
	for (const [runId, active] of params.chatAbortControllers) {
		if (!params.runIds.has(runId)) continue;
		const text = params.chatRunState.resolveBuffer(runId).text;
		if (!text || !text.trim()) continue;
		out.push({
			runId,
			sessionId: active.sessionId,
			agentId: active.agentId,
			text,
			abortOrigin: params.abortOrigin
		});
	}
	return out;
}
async function persistAbortedPartials(params) {
	if (params.snapshots.length === 0) return;
	for (const snapshot of params.snapshots) {
		const sessionLoadOptions = params.sessionKey === "global" && snapshot.agentId ? { agentId: snapshot.agentId } : void 0;
		const { cfg, storePath, entry } = loadSessionEntry(params.sessionKey, sessionLoadOptions);
		const sessionId = entry?.sessionId ?? snapshot.sessionId ?? snapshot.runId;
		const appended = await appendAssistantTranscriptMessage({
			sessionKey: params.sessionKey,
			message: snapshot.text,
			sessionId,
			storePath,
			...snapshot.agentId ? { agentId: snapshot.agentId } : {},
			createIfMissing: true,
			idempotencyKey: `${snapshot.runId}:assistant`,
			cfg,
			abortMeta: {
				aborted: true,
				origin: snapshot.abortOrigin,
				runId: snapshot.runId
			}
		});
		if (!appended.ok) params.context.logGateway.warn(`chat.abort transcript append failed: ${appended.error ?? "unknown error"}`);
	}
}
function createChatAbortOps(context) {
	return {
		chatAbortControllers: context.chatAbortControllers,
		chatRunState: context.chatRunState,
		removeChatRun: context.removeChatRun,
		agentRunSeq: context.agentRunSeq,
		getRuntimeConfig: context.getRuntimeConfig,
		broadcast: context.broadcast,
		nodeSendToSession: context.nodeSendToSession,
		onRunAborted: context.cancelRunBoundApprovals
	};
}
function ensureChatQueuedTurns(context) {
	return context.chatQueuedTurns;
}
function resolveAuthorizedQueuedTurnsForSession(params) {
	const matches = listQueuedChatTurnsForSession({
		chatQueuedTurns: ensureChatQueuedTurns(params.context),
		sessionKeys: params.sessionKeys,
		sessionIds: [params.sessionId],
		agentId: params.agentId,
		defaultAgentId: params.defaultAgentId
	});
	if (matches.length === 0) return {
		authorized: [],
		hasUnauthorizedRuns: false
	};
	const authorized = matches.filter((m) => canRequesterAbortQueuedChatTurn(m.entry, params.requester));
	return {
		authorized,
		hasUnauthorizedRuns: authorized.length < matches.length
	};
}
function cancelWorkerInferenceForSession(params) {
	const sessionId = normalizeOptionalChatText(params.sessionId);
	if (!sessionId) return [];
	return asWorkerInferenceControl(params.context.workerEnvironmentService)?.cancelInferenceForSession({
		sessionId,
		...params.runId ? { runId: params.runId } : {}
	}) ?? [];
}
async function abortChatRunsForSessionKeyWithPartials(params) {
	const sessionKeys = [params.sessionKey, ...params.sessionKeyAliases ?? []];
	const queuedPlan = resolveAuthorizedQueuedTurnsForSession({
		context: params.context,
		sessionKeys,
		sessionId: params.sessionId,
		agentId: params.agentId,
		defaultAgentId: params.defaultAgentId,
		requester: params.requester
	});
	const { authorizedRuns, matchedRunIds: matchedActiveRunIds, hasUnauthorizedRuns: hasUnauthorizedActiveRuns, hasUnauthorizedProtectedRuns: hasUnauthorizedProtectedActiveRuns, hasProtectedRuns: hasProtectedActiveRuns } = resolveAuthorizedRunsForSessionKeys({
		chatAbortControllers: params.context.chatAbortControllers,
		sessionKeys,
		sessionIds: [params.sessionId],
		agentId: params.agentId,
		defaultAgentId: params.defaultAgentId,
		requester: params.requester,
		preserveSideRuns: params.preserveSideRuns,
		excludeRunIds: params.excludeRunIds
	});
	const { authorizedRuns: authorizedPendingAgentRuns, hasUnauthorizedRuns: hasUnauthorizedPendingAgentRuns, hasUnauthorizedProtectedRuns: hasUnauthorizedProtectedPendingAgentRuns, hasProtectedRuns: hasProtectedPendingAgentRuns } = resolveAuthorizedPreRegisteredRunsForSessionKeys({
		context: params.context,
		sessionKeys,
		agentId: params.agentId,
		defaultAgentId: params.defaultAgentId,
		requester: params.requester,
		keyPrefix: "agent:",
		preserveSideRuns: params.preserveSideRuns,
		excludeRunIds: params.excludeRunIds
	});
	const { authorizedRuns: authorizedPendingChatRuns, hasUnauthorizedRuns: hasUnauthorizedPendingChatRuns, hasUnauthorizedProtectedRuns: hasUnauthorizedProtectedPendingChatRuns, hasProtectedRuns: hasProtectedPendingChatRuns } = resolveAuthorizedPreRegisteredRunsForSessionKeys({
		context: params.context,
		sessionKeys,
		agentId: params.agentId,
		defaultAgentId: params.defaultAgentId,
		requester: params.requester,
		keyPrefix: PENDING_CHAT_SEND_DEDUPE_PREFIX,
		preserveSideRuns: params.preserveSideRuns,
		excludeRunIds: params.excludeRunIds
	});
	const hasAuthorizedGatewayRuns = authorizedRuns.length > 0 || authorizedPendingAgentRuns.length > 0 || authorizedPendingChatRuns.length > 0 || queuedPlan.authorized.length > 0;
	const workerService = asWorkerInferenceControl(params.context.workerEnvironmentService);
	const workerSessionId = params.sessionId;
	const hasWorkerRun = Boolean(workerSessionId && (!hasAuthorizedGatewayRuns || params.onAuthorizedAfterQueuedAbort) && workerService?.hasInferenceForSession(workerSessionId));
	const hasControllerRepresentedWorkerRun = Boolean(hasWorkerRun && workerSessionId && workerService && matchedActiveRunIds.some((runId) => workerService.hasInferenceForSession(workerSessionId, runId)));
	const hasUnauthorizedOwner = hasUnauthorizedActiveRuns || hasUnauthorizedPendingAgentRuns || hasUnauthorizedPendingChatRuns || queuedPlan.hasUnauthorizedRuns || hasWorkerRun && !hasControllerRepresentedWorkerRun && !params.requester.isAdmin;
	const hasProtectedLifecycleRuns = hasProtectedActiveRuns || hasProtectedPendingAgentRuns || hasProtectedPendingChatRuns;
	const hasUnauthorizedProtectedOwner = hasUnauthorizedProtectedActiveRuns || hasUnauthorizedProtectedPendingAgentRuns || hasUnauthorizedProtectedPendingChatRuns;
	const hasUnauthorizedLifecycleOwner = Boolean(params.onAuthorizedAfterQueuedAbort) && hasUnauthorizedProtectedOwner;
	const canRunLifecycleCleanup = !hasUnauthorizedOwner && !hasProtectedLifecycleRuns;
	const canCancelWorkerSession = !params.onAuthorizedAfterQueuedAbort || !hasProtectedLifecycleRuns;
	if (!hasAuthorizedGatewayRuns) {
		if (hasUnauthorizedOwner || hasUnauthorizedLifecycleOwner) return {
			aborted: false,
			runIds: [],
			unauthorized: true
		};
		const additionalAborted = canRunLifecycleCleanup ? params.onAuthorizedAfterQueuedAbort?.() ?? false : false;
		if (!hasWorkerRun || !workerSessionId || !params.requester.isAdmin || !canCancelWorkerSession) return {
			aborted: additionalAborted,
			runIds: [],
			unauthorized: false
		};
		const workerRunIds = cancelWorkerInferenceForSession({
			context: params.context,
			sessionId: workerSessionId
		});
		return {
			aborted: additionalAborted || workerRunIds.length > 0,
			runIds: workerRunIds,
			unauthorized: false
		};
	}
	const authorizedRunIdSet = new Set(authorizedRuns.map((run) => run.runId));
	const snapshots = collectSessionAbortPartials({
		chatAbortControllers: params.context.chatAbortControllers,
		chatRunState: params.context.chatRunState,
		runIds: authorizedRunIdSet,
		abortOrigin: params.abortOrigin
	});
	const runIds = abortQueuedChatTurns(ensureChatQueuedTurns(params.context), queuedPlan.authorized, params.stopReason);
	const additionalAborted = canRunLifecycleCleanup ? params.onAuthorizedAfterQueuedAbort?.() ?? false : false;
	for (const { runId, sessionKey } of authorizedRuns) if (abortChatRunById(params.ops, {
		runId,
		sessionKey,
		stopReason: params.stopReason
	}).aborted) runIds.push(runId);
	const endedAt = Date.now();
	const stopReason = params.stopReason ?? "rpc";
	for (const { runId, sessionKey, payload } of authorizedPendingAgentRuns) {
		writePreRegisteredAgentAbort({
			context: params.context,
			runId,
			sessionKey,
			payload,
			stopReason,
			endedAt
		});
		runIds.push(runId);
	}
	for (const { runId, payload } of authorizedPendingChatRuns) {
		writePreRegisteredChatAbort({
			context: params.context,
			runId,
			stopReason,
			endedAt,
			attemptId: normalizeUnknownChatText(payload.attemptId)
		});
		runIds.push(runId);
	}
	if (params.requester.isAdmin && canCancelWorkerSession) {
		for (const runId of cancelWorkerInferenceForSession({
			context: params.context,
			sessionId: params.sessionId
		})) if (!runIds.includes(runId)) runIds.push(runId);
	}
	const res = {
		aborted: additionalAborted || runIds.length > 0,
		runIds,
		unauthorized: false
	};
	if (res.aborted && snapshots.length > 0) {
		const abortedRunIds = new Set(runIds);
		await persistAbortedPartials({
			context: params.context,
			sessionKey: params.persistSessionKey ?? params.sessionKey,
			snapshots: snapshots.filter((snapshot) => abortedRunIds.has(snapshot.runId))
		});
	}
	return res;
}
//#endregion
export { canRequesterAbortQueuedChatTurnWithoutSessionMatch as A, scheduleChatHistoryManagedMediaCleanup as C, canRequesterAbortChatRunWithoutSessionMatch as D, canRequesterAbortChatRun as E, writePreRegisteredAgentAbort as F, writePreRegisteredChatAbort as I, normalizeOptionalChatText as L, readPreRegisteredRun as M, resolveChatAbortRequester as N, canRequesterAbortPreRegisteredRun as O, resolveStoredGlobalRunAgentId as P, normalizeUnknownChatText as R, sanitizeAssistantDisplayText as S, buildAbortedChatSendPayload as T, hasManagedOutgoingAssistantContent as _, persistAbortedPartials as a, isMediaBearingPayload as b, publishAssistantTranscriptRewrite as c, rewriteSourceReplyTranscriptMirrors as d, buildAssistantDisplayContentFromReplyPayloads as f, hasAssistantDisplayMediaContent as g, extractAssistantDisplayTextFromContent as h, ensureChatQueuedTurns as i, readPreRegisteredAgentDedupePayloadForSession as j, canRequesterAbortQueuedChatTurn as k, rewriteAssistantTranscriptMessageByIdempotencyKey as l, extractAssistantDisplayText as m, cancelWorkerInferenceForSession as n, appendAssistantTranscriptMessage as o, combineNonStreamingReplyParts as p, createChatAbortOps as r, assistantTranscriptScope as s, abortChatRunsForSessionKeyWithPartials as t, rewriteAssistantTranscriptMessageByTurnIndexAndMedia as u, hasSensitiveMediaPayload as v, stripManagedOutgoingAssistantContentBlocks as w, replaceAssistantContentTextBlocks as x, hasVisibleAssistantFinalMessage as y };
