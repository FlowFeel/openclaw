import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { f as resolveAgentIdFromSessionKey, g as scopeLegacySessionKeyToAgent } from "./session-key-DtTE9-Tg.js";
import "./agent-scope-DyEposw2.js";
import { l as resolveStorePath, r as resolveDefaultSessionStorePath } from "./paths-DSnYpBD3.js";
import { Dt as streamSessionTranscriptLinesReverse, ct as loadSqliteSessionEntryReadOnly } from "./session-accessor.sqlite-B9iW7DOt.js";
import { n as parseSqliteSessionFileMarker } from "./legacy-sqlite-marker-COPKCuIN.js";
import { C as selectSessionTranscriptTreePathNodes, b as scanSessionTranscriptTree } from "./session-transcript-index-cy-aJty7.js";
import { n as extractAssistantVisibleText, r as extractFirstTextBlock } from "./chat-message-content-DwX2R88T.js";
import { c as isTranscriptOnlyOpenClawAssistantModel, n as OPENCLAW_TRANSCRIPT_ARTIFACT_API, r as OPENCLAW_TRANSCRIPT_ARTIFACT_PROVIDER, t as OPENCLAW_DELIVERY_MIRROR_MODEL } from "./transcript-only-openclaw-assistant-ByevblQR.js";
import { _ as loadLatestSqliteAssistantText, h as redactTranscriptMessage, y as loadSqliteTranscriptEvents } from "./session-accessor.sqlite-transcript-store-Si6-bv-m.js";
import { K as updateSessionEntry, S as persistSessionTranscriptTurn, b as isSessionTranscriptProjectionUnavailableError, g as readSessionTranscriptMessageEventPage, it as resolveSessionEntrySelection } from "./session-accessor-t3qUoTeV.js";
import { t as resolveMirroredTranscriptText } from "./transcript-mirror-DxrLtJZQ.js";
//#region src/config/sessions/transcript-assistant-message.ts
function applyBeforeMessageWriteToAssistant(params) {
	if (!params.beforeMessageWrite) return params.message;
	const nextMessage = params.beforeMessageWrite({
		message: params.message,
		...params.agentId ? { agentId: params.agentId } : {},
		sessionKey: params.sessionKey
	});
	if (nextMessage?.role !== "assistant") return;
	return {
		...nextMessage,
		...params.explicitIdempotencyKey ? { idempotencyKey: params.explicitIdempotencyKey } : {}
	};
}
//#endregion
//#region src/config/sessions/transcript-recent-window.ts
function normalizeTranscriptTimestamp(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function isWithinTranscriptWindow(timestamp, options) {
	return (options.beforeTimestampMs === void 0 || timestamp === void 0 || timestamp < options.beforeTimestampMs) && (options.minTimestampMs === void 0 || timestamp === void 0 || timestamp >= options.minTimestampMs);
}
function normalizeRecentTranscriptLimit(limit) {
	return Math.max(1, Math.floor(limit ?? 10));
}
function readPreferredUpstreamUserText(message) {
	const meta = message["__openclaw"] && typeof message["__openclaw"] === "object" ? message["__openclaw"] : void 0;
	if (typeof meta?.upstreamUserText === "string") return meta.upstreamUserText.trim();
	return meta?.mirrorOrigin ? null : void 0;
}
//#endregion
//#region src/config/sessions/transcript.ts
var SessionTranscriptAgentScopeMismatchError = class extends Error {
	constructor(agentId, sessionKeyAgentId) {
		super(`Session transcript agent scope mismatch: explicit agent "${agentId}" does not match session key agent "${sessionKeyAgentId}".`);
		this.agentId = agentId;
		this.sessionKeyAgentId = sessionKeyAgentId;
		this.code = "SESSION_TRANSCRIPT_AGENT_SCOPE_MISMATCH";
		this.name = "SessionTranscriptAgentScopeMismatchError";
	}
};
function parseAssistantTranscriptText(line, options) {
	const parsed = JSON.parse(line);
	const message = parsed.message;
	if (!message || message.role !== "assistant") return;
	if (options?.excludeTranscriptOnlyOpenClawAssistant && isTranscriptOnlyOpenClawAssistantMessage(message)) return;
	const text = extractAssistantVisibleText(message)?.trim();
	if (!text) return;
	return {
		...typeof parsed.id === "string" && parsed.id ? { id: parsed.id } : {},
		text,
		...typeof message.timestamp === "number" && Number.isFinite(message.timestamp) ? { timestamp: message.timestamp } : {}
	};
}
function isTranscriptOnlyOpenClawAssistantMessage(message) {
	return isTranscriptOnlyOpenClawAssistantModel(message.provider, message.model);
}
function parseRecentConversationText(line, options = {}) {
	const parsed = JSON.parse(line);
	const message = parsed.message;
	if (!message || message.role !== "user" && message.role !== "assistant" || options.role && message.role !== options.role) return;
	if (message.role === "assistant" && isTranscriptOnlyOpenClawAssistantMessage(message)) return;
	const upstreamUserText = options.preferUpstreamUserText && message.role === "user" ? readPreferredUpstreamUserText(message) : void 0;
	if (upstreamUserText === null) return;
	const text = message.role === "assistant" ? extractAssistantVisibleText(message) : upstreamUserText ?? extractFirstTextBlock(message)?.trim();
	if (!text) return;
	const provenance = message.provenance && typeof message.provenance === "object" ? message.provenance : void 0;
	return {
		...typeof parsed.id === "string" && parsed.id ? { id: parsed.id } : {},
		role: message.role,
		text,
		...normalizeTranscriptTimestamp(message.timestamp) !== void 0 ? { timestamp: normalizeTranscriptTimestamp(message.timestamp) } : {},
		...typeof provenance?.sourceChannel === "string" && provenance.sourceChannel.trim() ? { sourceChannel: provenance.sourceChannel.trim() } : {}
	};
}
async function readRecentUserAssistantTextFromSqliteTranscript(scope, options = {}) {
	const limit = normalizeRecentTranscriptLimit(options.limit);
	const pageSize = 250;
	try {
		const readScope = {
			agentId: scope.agentId,
			sessionId: scope.sessionId,
			storePath: scope.storePath
		};
		const recent = [];
		for (let offset = 0; recent.length < limit; offset += pageSize) {
			const page = readSessionTranscriptMessageEventPage(readScope, {
				maxMessages: pageSize,
				offset
			});
			if (page.events.length === 0) break;
			for (const event of page.events.toReversed()) {
				const entry = parseRecentConversationText(JSON.stringify(event.event), options);
				if (entry && isWithinTranscriptWindow(entry.timestamp, options)) {
					recent.push(entry);
					if (recent.length >= limit) break;
				}
			}
		}
		return recent.toReversed();
	} catch (error) {
		if (isSessionTranscriptProjectionUnavailableError(error)) return [];
		throw error;
	}
}
function resolveSessionConversationTranscriptTarget(params) {
	const sessionKey = params.sessionKey.trim();
	if (!sessionKey) return {};
	const explicitAgentId = params.agentId?.trim() ? normalizeAgentId(params.agentId) : void 0;
	const sessionKeyAgentId = parseAgentSessionKey(sessionKey)?.agentId;
	if (explicitAgentId && sessionKeyAgentId && explicitAgentId !== normalizeAgentId(sessionKeyAgentId)) throw new SessionTranscriptAgentScopeMismatchError(explicitAgentId, sessionKeyAgentId);
	const agentId = explicitAgentId ?? resolveAgentIdFromSessionKey(sessionKey);
	const scopedSessionKey = scopeLegacySessionKeyToAgent({
		agentId,
		sessionKey
	}) ?? sessionKey;
	const storePath = params.storePath ?? resolveDefaultSessionStorePath(agentId);
	const entry = loadSqliteSessionEntryReadOnly({
		agentId,
		sessionKey: scopedSessionKey,
		storePath
	});
	if (!entry?.sessionId) return {};
	return { sqliteScope: {
		agentId,
		sessionId: entry.sessionId,
		storePath
	} };
}
async function readRecentUserAssistantTextForSession(params) {
	const target = resolveSessionConversationTranscriptTarget(params);
	if (target.sqliteScope) return await readRecentUserAssistantTextFromSqliteTranscript(target.sqliteScope, params);
	return [];
}
async function readLatestAssistantTextFromSessionTranscript(target) {
	if (target && typeof target === "object") return loadLatestSqliteAssistantText(target);
	const sessionFile = target;
	const sqliteMarker = parseSqliteSessionFileMarker(sessionFile);
	if (sqliteMarker) return loadLatestSqliteAssistantText({
		agentId: sqliteMarker.agentId,
		sessionId: sqliteMarker.sessionId,
		storePath: sqliteMarker.storePath
	});
	if (!sessionFile?.trim()) return;
	for await (const line of streamSessionTranscriptLinesReverse(sessionFile)) try {
		const assistantText = parseAssistantTranscriptText(line, { excludeTranscriptOnlyOpenClawAssistant: true });
		if (assistantText) return assistantText;
	} catch {
		continue;
	}
}
async function readTailAssistantTextFromSessionTranscript(sessionFile, options) {
	if (typeof sessionFile === "object") {
		if (!sessionFile.sessionId || !sessionFile.agentId && !sessionFile.sessionKey) return;
		const events = await loadSqliteTranscriptEvents({
			...sessionFile.agentId ? { agentId: sessionFile.agentId } : {},
			sessionId: sessionFile.sessionId,
			...sessionFile.sessionKey ? { sessionKey: sessionFile.sessionKey } : {},
			...sessionFile.storePath ? { storePath: sessionFile.storePath } : {}
		});
		for (const event of events.toReversed()) {
			const parsed = event;
			if (!parsed.message || typeof parsed.message !== "object") continue;
			if (parsed.message.role !== "assistant") return;
			const assistantText = parseAssistantTranscriptText(JSON.stringify(event), { excludeTranscriptOnlyOpenClawAssistant: options?.excludeTranscriptOnlyOpenClawAssistant === true });
			if (assistantText) return assistantText;
			if (options?.excludeTranscriptOnlyOpenClawAssistant !== true || !isTranscriptOnlyOpenClawAssistantMessage(parsed.message)) return;
		}
		return;
	}
	const sqliteMarker = parseSqliteSessionFileMarker(sessionFile);
	if (sqliteMarker) {
		const events = await loadSqliteTranscriptEvents({
			agentId: sqliteMarker.agentId,
			sessionId: sqliteMarker.sessionId,
			storePath: sqliteMarker.storePath
		});
		for (const event of events.toReversed()) {
			const parsed = event;
			if (!parsed.message || typeof parsed.message !== "object") continue;
			if (parsed.message.role !== "assistant") return;
			const assistantText = parseAssistantTranscriptText(JSON.stringify(event), { excludeTranscriptOnlyOpenClawAssistant: options?.excludeTranscriptOnlyOpenClawAssistant === true });
			if (assistantText) return assistantText;
			if (options?.excludeTranscriptOnlyOpenClawAssistant !== true || !isTranscriptOnlyOpenClawAssistantMessage(parsed.message)) return;
		}
		return;
	}
	if (!sessionFile?.trim()) return;
	for await (const line of streamSessionTranscriptLinesReverse(sessionFile)) try {
		const parsed = JSON.parse(line);
		if (!parsed.message || typeof parsed.message !== "object") continue;
		const assistantText = parseAssistantTranscriptText(line, options);
		if (assistantText) return assistantText;
		if (options?.excludeTranscriptOnlyOpenClawAssistant === true && isTranscriptOnlyOpenClawAssistantMessage(parsed.message)) continue;
		return;
	} catch {
		continue;
	}
}
async function appendAssistantMessageToSessionTranscript(params) {
	const sessionKey = params.sessionKey.trim();
	if (!sessionKey) return {
		ok: false,
		reason: "missing sessionKey"
	};
	const mirrorText = resolveMirroredTranscriptText({
		text: params.text,
		mediaUrls: params.mediaUrls
	});
	if (!mirrorText) return {
		ok: false,
		reason: "empty text"
	};
	return appendExactAssistantMessageToSessionTranscript({
		agentId: params.agentId,
		sessionKey,
		...params.expectedSessionId ? { expectedSessionId: params.expectedSessionId } : {},
		...params.expectedLifecycleRevision ? { expectedLifecycleRevision: params.expectedLifecycleRevision } : {},
		...params.expectedSessionState ? { expectedSessionState: params.expectedSessionState } : {},
		...params.sessionLifecyclePatch ? { sessionLifecyclePatch: params.sessionLifecyclePatch } : {},
		storePath: params.storePath,
		idempotencyKey: params.idempotencyKey,
		updateMode: params.updateMode,
		config: params.config,
		...params.beforeMessageWrite ? { beforeMessageWrite: params.beforeMessageWrite } : {},
		message: {
			role: "assistant",
			content: [{
				type: "text",
				text: mirrorText
			}],
			api: OPENCLAW_TRANSCRIPT_ARTIFACT_API,
			provider: OPENCLAW_TRANSCRIPT_ARTIFACT_PROVIDER,
			model: OPENCLAW_DELIVERY_MIRROR_MODEL,
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
			stopReason: "stop",
			timestamp: Date.now(),
			...params.deliveryMirror ? { openclawDeliveryMirror: params.deliveryMirror } : {}
		}
	});
}
async function appendExactAssistantMessageToSessionTranscript(params) {
	const sessionKey = params.sessionKey.trim();
	if (!sessionKey) return {
		ok: false,
		reason: "missing sessionKey"
	};
	if (params.message.role !== "assistant") return {
		ok: false,
		reason: "message role must be assistant"
	};
	const explicitAgentId = params.agentId?.trim() || void 0;
	const sessionAgentId = parseAgentSessionKey(sessionKey)?.agentId;
	const transcriptAgentId = explicitAgentId ?? sessionAgentId;
	const configuredDefaultAgentId = !transcriptAgentId && params.config ? resolveDefaultAgentId(params.config) : void 0;
	const storeAgentId = transcriptAgentId ?? resolveAgentIdFromSessionKey(sessionKey, configuredDefaultAgentId);
	const storePath = params.storePath ?? resolveStorePath(params.config?.session?.store, { agentId: storeAgentId });
	const resolved = resolveSessionEntrySelection({
		...transcriptAgentId ? { agentId: transcriptAgentId } : {},
		sessionKey,
		storePath
	});
	const entry = resolved.existing;
	if (params.expectedSessionId && entry?.sessionId !== params.expectedSessionId) return {
		ok: false,
		code: "session-rebound",
		reason: `session rebound for sessionKey: ${sessionKey}`
	};
	if (params.expectedLifecycleRevision !== void 0 && entry?.lifecycleRevision !== params.expectedLifecycleRevision) return {
		ok: false,
		code: "session-rebound",
		reason: `session rebound for sessionKey: ${sessionKey}`
	};
	if (!entry?.sessionId) return {
		ok: false,
		reason: `unknown sessionKey: ${sessionKey}`
	};
	const appendToSession = async (currentEntry) => {
		const explicitIdempotencyKey = params.idempotencyKey ?? params.message.idempotencyKey;
		const message = {
			...params.message,
			...explicitIdempotencyKey ? { idempotencyKey: explicitIdempotencyKey } : {}
		};
		const preparedUnkeyedMessage = !explicitIdempotencyKey && params.beforeMessageWrite ? applyBeforeMessageWriteToAssistant({
			message,
			beforeMessageWrite: params.beforeMessageWrite,
			agentId: transcriptAgentId,
			sessionKey: resolved.normalizedKey
		}) : message;
		if (!preparedUnkeyedMessage) return {
			ok: false,
			code: "blocked",
			reason: "blocked by before_message_write"
		};
		const identifiedDeliveryMirror = Boolean(explicitIdempotencyKey) && isIdentifiedDeliveryMirror(params.message);
		const target = {
			...transcriptAgentId ? { agentId: transcriptAgentId } : {},
			sessionId: currentEntry.sessionId,
			sessionKey: resolved.normalizedKey,
			storePath
		};
		let latestEquivalentAssistantId;
		const turn = await persistSessionTranscriptTurn({
			sessionId: currentEntry.sessionId,
			sessionKey: resolved.normalizedKey,
			storePath,
			...transcriptAgentId ? { agentId: transcriptAgentId } : {}
		}, {
			cwd: currentEntry.spawnedCwd,
			...params.expectedSessionId ? { expectedSessionId: params.expectedSessionId } : {},
			...params.expectedLifecycleRevision !== void 0 ? { expectedLifecycleRevision: params.expectedLifecycleRevision } : {},
			...params.expectedSessionState ? { expectedSessionState: params.expectedSessionState } : {},
			...params.sessionLifecyclePatch ? { sessionLifecyclePatch: params.sessionLifecyclePatch } : {},
			...params.config ? { config: params.config } : {},
			updateMode: params.updateMode ?? "inline",
			touchSessionEntry: true,
			messages: [{
				message: preparedUnkeyedMessage,
				...explicitIdempotencyKey ? { idempotencyLookup: "scan" } : {},
				...explicitIdempotencyKey && params.beforeMessageWrite ? { prepareMessageAfterIdempotencyCheck: (candidate) => applyBeforeMessageWriteToAssistant({
					message: candidate,
					beforeMessageWrite: params.beforeMessageWrite,
					explicitIdempotencyKey,
					agentId: transcriptAgentId,
					sessionKey: resolved.normalizedKey
				}) } : {},
				shouldAppend: async (appendTarget) => {
					latestEquivalentAssistantId = isRedundantDeliveryMirror(params.message) && !identifiedDeliveryMirror ? await findLatestEquivalentAssistantMessageId(appendTarget, preparedUnkeyedMessage, params.config) : void 0;
					return !latestEquivalentAssistantId;
				}
			}]
		});
		if (turn.rejectedReason === "session-rebound") return {
			ok: false,
			code: "session-rebound",
			reason: `session rebound for sessionKey: ${sessionKey}`
		};
		if (latestEquivalentAssistantId) return {
			ok: true,
			target,
			messageId: latestEquivalentAssistantId
		};
		const appendedResult = turn.messages[0];
		if (!appendedResult) return {
			ok: false,
			code: "blocked",
			reason: "blocked by before_message_write"
		};
		const { messageId } = appendedResult;
		if (!params.expectedSessionId) try {
			await touchSqliteAssistantAppendSessionEntry({
				agentId: transcriptAgentId,
				currentEntry,
				sessionKey: resolved.normalizedKey,
				storePath
			});
		} catch (err) {
			return {
				ok: false,
				reason: formatErrorMessage(err)
			};
		}
		return {
			ok: true,
			target,
			messageId
		};
	};
	return await appendToSession(entry);
}
async function touchSqliteAssistantAppendSessionEntry(params) {
	const now = Date.now();
	const buildPatch = (entry) => ({
		updatedAt: Math.max(entry?.updatedAt ?? 0, now),
		sessionStartedAt: entry?.sessionStartedAt ?? params.currentEntry.sessionStartedAt ?? now
	});
	await updateSessionEntry({
		agentId: params.agentId,
		sessionKey: params.sessionKey,
		storePath: params.storePath
	}, (entry) => {
		if (entry.sessionId !== params.currentEntry.sessionId) return null;
		return buildPatch(entry);
	});
}
function isRedundantDeliveryMirror(message) {
	return message.provider === "openclaw" && message.model === "delivery-mirror";
}
async function readLatestVisibleTranscriptMessage(scope) {
	const events = await loadSqliteTranscriptEvents(scope).catch(() => []);
	const tree = scanSessionTranscriptTree(events);
	const visiblePath = selectSessionTranscriptTreePathNodes(tree, tree.leafId);
	const visibleEvents = visiblePath.length > 0 ? visiblePath.map((node) => node.entry) : tree.hasLeafControl ? [] : events;
	for (const event of visibleEvents.toReversed()) {
		if (!event || typeof event !== "object" || Array.isArray(event)) continue;
		const record = event;
		if (record.message === void 0) continue;
		return {
			...typeof record.id === "string" ? { id: record.id } : {},
			message: record.message
		};
	}
}
function isIdentifiedDeliveryMirror(message) {
	const marker = message.openclawDeliveryMirror;
	return isRedundantDeliveryMirror(message) && (marker?.kind === "channel-final" || marker?.kind === "channel-final-suppressed" || marker?.kind === "message-tool-source-reply");
}
function extractAssistantMessageText(message) {
	if (!Array.isArray(message.content)) return null;
	const parts = message.content.filter((part) => part.type === "text" && typeof part.text === "string" && part.text.trim().length > 0).map((part) => part.text.trim());
	return parts.length > 0 ? parts.join("\n").trim() : null;
}
async function findLatestEquivalentAssistantMessageId(target, message, config) {
	const expectedText = extractAssistantMessageText(redactTranscriptMessage(message, config));
	if (!expectedText) return;
	if (target.storePath && target.sessionId) {
		const latest = await readLatestVisibleTranscriptMessage({
			...target.agentId ? { agentId: target.agentId } : {},
			sessionId: target.sessionId,
			...target.sessionKey ? { sessionKey: target.sessionKey } : {},
			storePath: target.storePath
		});
		if ((latest?.message)?.role !== "assistant") return;
		return (latest ? extractAssistantMessageText(redactTranscriptMessage(latest.message, config)) : void 0) === expectedText ? latest?.id : void 0;
	}
}
//#endregion
export { readTailAssistantTextFromSessionTranscript as a, readRecentUserAssistantTextForSession as i, appendExactAssistantMessageToSessionTranscript as n, readLatestAssistantTextFromSessionTranscript as r, appendAssistantMessageToSessionTranscript as t };
