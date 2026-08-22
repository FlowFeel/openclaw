import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { St as publishSqliteTranscriptUpdate, f as withSqliteTranscriptWriteLock, o as appendSqliteTranscriptMessage, st as loadSqliteSessionEntry, t as readSqliteTranscriptRawDelta } from "./session-accessor.sqlite-B9iW7DOt.js";
import { f as selectVisibleTranscriptEventEntries, p as selectVisibleTranscriptEvents } from "./session-transcript-index-cy-aJty7.js";
import { n as extractAssistantVisibleText } from "./chat-message-content-DwX2R88T.js";
import { _ as loadLatestSqliteAssistantText, h as redactTranscriptMessage, y as loadSqliteTranscriptEvents } from "./session-accessor.sqlite-transcript-store-Si6-bv-m.js";
import { S as persistSessionTranscriptTurn, b as isSessionTranscriptProjectionUnavailableError, i as resolveSessionTranscriptRuntimeTarget, r as resolveSessionTranscriptRuntimeReadTarget, v as readSessionTranscriptVisibleMessageDelta$1, x as appendTranscriptMessages } from "./session-accessor-t3qUoTeV.js";
import { t as resolveMirroredTranscriptText } from "./transcript-mirror-DxrLtJZQ.js";
import { t as formatSessionTranscriptMemoryHitKey } from "./session-transcript-memory-hit-Cm7w9St5.js";
//#region src/plugin-sdk/session-transcript-lock-runtime.ts
/** Resolves, locks, and publishes one projected transcript write context. */
async function withProjectedSessionTranscriptWriteLock(params, run, projectContext, publishQueuedUpdate) {
	const storageTarget = await resolveSessionTranscriptRuntimeTarget(params);
	const agentId = normalizeAgentId(storageTarget.agentId);
	const target = {
		agentId,
		memoryKey: formatSessionTranscriptMemoryHitKey({
			agentId,
			sessionId: storageTarget.sessionId
		}),
		sessionId: storageTarget.sessionId,
		sessionKey: storageTarget.sessionKey,
		targetKind: "runtime-session"
	};
	const boundScope = {
		...params,
		sessionId: storageTarget.sessionId,
		sessionKey: storageTarget.sessionKey
	};
	const queuedUpdates = [];
	const result = await withSqliteTranscriptWriteLock(boundScope, async (locked) => await run(projectContext({
		target,
		readEvents: locked.readEvents,
		appendMessage: (options) => locked.appendMessage({
			...options,
			...params.config !== void 0 ? { config: params.config } : {}
		}),
		publishUpdate: async (update) => {
			queuedUpdates.push(update ? { ...update } : void 0);
		}
	}, locked)));
	for (const update of queuedUpdates) {
		if (publishQueuedUpdate) {
			await publishQueuedUpdate({
				...boundScope,
				...update !== void 0 ? { update } : {}
			});
			continue;
		}
		await publishSqliteTranscriptUpdate(boundScope, {
			...update,
			agentId: storageTarget.agentId,
			sessionKey: storageTarget.sessionKey,
			target: {
				agentId: storageTarget.agentId,
				sessionId: storageTarget.sessionId,
				sessionKey: storageTarget.sessionKey
			}
		});
	}
	return result;
}
//#endregion
//#region src/plugin-sdk/session-transcript-runtime.ts
/**
* Resolves the public identity for a transcript without returning its file path.
*/
async function resolveSessionTranscriptIdentity(params) {
	const target = await resolveSessionTranscriptRuntimeReadTarget(params);
	const agentId = normalizeAgentId(target.agentId);
	return {
		agentId,
		memoryKey: formatSessionTranscriptMemoryHitKey({
			agentId,
			sessionId: target.sessionId
		}),
		sessionId: target.sessionId,
		sessionKey: target.sessionKey
	};
}
/**
* Resolves the public target for transcript operations without exposing the
* current storage path as identity.
*/
async function resolveSessionTranscriptTarget(params) {
	return projectPublicTarget({
		...await resolveSessionTranscriptRuntimeReadTarget(params),
		targetKind: "runtime-session"
	});
}
/**
* Reads transcript events by public session identity instead of file path.
*/
async function readSessionTranscriptEvents(params) {
	return await loadSqliteTranscriptEvents(params);
}
/** Reads one bounded raw page; the opaque cursor survives append and resets after replacement. */
async function readSessionTranscriptRawDelta(params) {
	const { cursor, maxBytes, maxEvents, ...target } = params;
	return readSqliteTranscriptRawDelta(target, {
		...cursor !== void 0 ? { cursor } : {},
		...maxBytes !== void 0 ? { maxBytes } : {},
		...maxEvents !== void 0 ? { maxEvents } : {}
	});
}
/** Reads one bounded active-path page that resumes appends and resets after discontinuities. */
async function readSessionTranscriptVisibleMessageDelta(params) {
	const { cursor, maxBytes, maxMessages, ...target } = params;
	let result;
	try {
		result = readSessionTranscriptVisibleMessageDelta$1(target, {
			...cursor !== void 0 ? { cursor } : {},
			...maxBytes !== void 0 ? { maxBytes } : {},
			...maxMessages !== void 0 ? { maxMessages } : {}
		});
	} catch (error) {
		if (isSessionTranscriptProjectionUnavailableError(error)) return {
			kind: "unavailable",
			reason: "projection_rebuilding"
		};
		throw error;
	}
	if (result.kind !== "page") return result;
	const { events, ...page } = result;
	return {
		...page,
		entries: events.flatMap((entry) => projectVisibleMessageEntry({
			event: entry.event,
			parentId: entry.parentId,
			seq: entry.seq
		}))
	};
}
/**
* Reads visible transcript message entries by scoped identity.
*
* This is a branch-safe message projection over the current full transcript
* read. `seq` is ordered read metadata, not a resumable cursor.
*/
async function readVisibleSessionTranscriptMessageEntries(params) {
	return selectVisibleTranscriptEventEntries(await loadSqliteTranscriptEvents(params)).flatMap(projectVisibleMessageEntry);
}
/**
* Reads the latest visible assistant text by scoped identity.
*/
async function readLatestAssistantTextByIdentity(params) {
	return loadLatestSqliteAssistantText(params);
}
/**
* Appends a delivery-mirror assistant message through the SQLite transcript accessor.
*/
async function appendAssistantMirrorMessageByIdentity(params) {
	const text = resolveMirroredTranscriptText({
		...params.mediaUrls !== void 0 ? { mediaUrls: params.mediaUrls } : {},
		...params.text !== void 0 ? { text: params.text } : {}
	});
	if (!text) return {
		ok: false,
		reason: "empty message"
	};
	const message = createAssistantMirrorMessage({
		...params.deliveryMirror !== void 0 ? { deliveryMirror: params.deliveryMirror } : {},
		...params.idempotencyKey !== void 0 ? { idempotencyKey: params.idempotencyKey } : {},
		text
	});
	return await withSqliteTranscriptWriteLock(params, async (locked) => {
		const currentEntry = loadSqliteSessionEntry(params);
		if (!currentEntry?.sessionId) return {
			ok: false,
			reason: "missing active session",
			code: "blocked"
		};
		if (params.sessionId && currentEntry.sessionId !== params.sessionId) return {
			ok: false,
			reason: "session changed",
			code: "session-rebound"
		};
		const scope = {
			...params,
			sessionId: currentEntry.sessionId
		};
		const target = await resolveSessionTranscriptRuntimeReadTarget(scope);
		const latestEquivalentAssistantId = !params.idempotencyKey && isDeliveryMirrorAssistantMessage(message) ? findLatestEquivalentAssistantMessageId(selectVisibleTranscriptEvents(await locked.readEvents()), message, params.config) : void 0;
		if (latestEquivalentAssistantId) return {
			ok: true,
			messageId: latestEquivalentAssistantId
		};
		const appendResult = await locked.appendMessage({
			...params.config !== void 0 ? { config: params.config } : {},
			...params.idempotencyKey ? { idempotencyLookup: "scan" } : {},
			message
		});
		if (!appendResult) return {
			ok: false,
			reason: "message skipped",
			code: "blocked"
		};
		if (params.updateMode !== "none" && appendResult.appended) await publishSqliteTranscriptUpdate(scope, {
			agentId: target.agentId,
			messageId: appendResult.messageId,
			sessionKey: target.sessionKey,
			target: {
				agentId: target.agentId,
				sessionId: target.sessionId,
				sessionKey: target.sessionKey
			}
		});
		return {
			ok: true,
			messageId: appendResult.messageId
		};
	});
}
/**
* Appends an already-canonical transcript message by scoped transcript target.
* Media-bearing user turns use ordered `message.__openclaw.media` facts; this
* low-level API does not infer deprecated top-level Media* projections.
*/
async function appendSessionTranscriptMessageByIdentity(params) {
	return await appendSqliteTranscriptMessage(params, params);
}
/** Appends one message while preserving distinct suppression and session-rebind outcomes. */
async function appendSessionTranscriptMessageByIdentityStrict(params) {
	const expectedSessionId = params.sessionId?.trim();
	if (!expectedSessionId) throw new Error("Cannot strictly append a transcript message without an exact session id");
	const turn = await persistSessionTranscriptTurn(params, {
		...params.config ? { config: params.config } : {},
		...params.cwd ? { cwd: params.cwd } : {},
		expectedSessionId,
		messages: [{
			...params.eventId !== void 0 ? { eventId: params.eventId } : {},
			...params.idempotencyLookup !== void 0 ? { idempotencyLookup: params.idempotencyLookup } : {},
			message: params.message,
			...params.now !== void 0 ? { now: params.now } : {},
			...params.parentId !== void 0 ? { parentId: params.parentId } : {},
			...params.prepareMessageAfterIdempotencyCheck ? { prepareMessageAfterIdempotencyCheck: (message) => params.prepareMessageAfterIdempotencyCheck?.(message) } : {},
			...params.useRawWhenLinear !== void 0 ? { useRawWhenLinear: params.useRawWhenLinear } : {}
		}],
		updateMode: "none"
	});
	if (turn.rejectedReason) return {
		kind: "rejected",
		reason: turn.rejectedReason
	};
	const result = turn.messages[0];
	return result ? {
		kind: "result",
		result
	} : { kind: "suppressed" };
}
/**
* Atomically appends one ordered, already-hooked message group. Preparation and
* redaction finish before SQLite begins; this is the canonical future harness seam.
*/
async function appendSessionTranscriptMessagesByIdentity(params) {
	return await appendTranscriptMessages(params, params);
}
/**
* Publishes a transcript update by scoped transcript target.
*/
async function publishSessionTranscriptUpdateByIdentity(params) {
	const target = await resolveSessionTranscriptRuntimeTarget(params);
	await publishSqliteTranscriptUpdate({
		...params,
		sessionId: target.sessionId,
		sessionKey: target.sessionKey
	}, {
		...params.update,
		agentId: target.agentId,
		sessionKey: target.sessionKey,
		target: {
			agentId: target.agentId,
			sessionId: target.sessionId,
			sessionKey: target.sessionKey
		}
	});
}
/**
* Runs transcript work under the write lock for the resolved scoped target.
*/
async function withSessionTranscriptWriteLock(params, run) {
	return await withProjectedSessionTranscriptWriteLock(params, run, (context) => context);
}
function createAssistantMirrorMessage(params) {
	return {
		role: "assistant",
		content: [{
			type: "text",
			text: params.text
		}],
		api: "openai-responses",
		provider: "openclaw",
		model: "delivery-mirror",
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
		...params.idempotencyKey ? { idempotencyKey: params.idempotencyKey } : {},
		...params.deliveryMirror ? { openclawDeliveryMirror: params.deliveryMirror } : {}
	};
}
function findLatestEquivalentAssistantMessageId(events, message, config) {
	const expectedText = extractAssistantMirrorComparableText(message, config);
	if (!expectedText) return;
	for (let index = events.length - 1; index >= 0; index -= 1) {
		const event = events[index];
		if (!event || typeof event !== "object") continue;
		const record = event;
		const candidate = record.message;
		if (!candidate) continue;
		if (candidate.role !== "assistant") return;
		return extractAssistantMirrorComparableText(candidate, config) === expectedText && typeof record.id === "string" && record.id ? record.id : void 0;
	}
}
function extractAssistantMirrorComparableText(message, config) {
	return extractAssistantVisibleText(redactTranscriptMessage(message, config))?.trim() || void 0;
}
function isDeliveryMirrorAssistantMessage(message) {
	return message.provider === "openclaw" && message.model === "delivery-mirror";
}
function readNonEmptyString(value) {
	return typeof value === "string" && value.trim().length > 0 ? value : void 0;
}
function isAgentMessageRecord(value) {
	return isRecord(value) && readNonEmptyString(value.role) !== void 0;
}
function projectVisibleMessageEntry(entry) {
	const event = entry.event;
	if (!isRecord(event) || event.type !== "message") return [];
	const entryId = readNonEmptyString(event.id);
	const message = event.message;
	if (!entryId || !isAgentMessageRecord(message)) return [];
	const createdAt = readNonEmptyString(event.timestamp);
	const idempotencyKey = readNonEmptyString(message.idempotencyKey);
	return [{
		entryId,
		parentId: entry.parentId,
		seq: entry.seq,
		message,
		role: message.role,
		...createdAt ? { createdAt } : {},
		...idempotencyKey ? { idempotencyKey } : {}
	}];
}
function projectPublicTarget(target) {
	const agentId = normalizeAgentId(target.agentId);
	return {
		agentId,
		memoryKey: formatSessionTranscriptMemoryHitKey({
			agentId,
			sessionId: target.sessionId
		}),
		sessionId: target.sessionId,
		sessionKey: target.sessionKey,
		targetKind: target.targetKind
	};
}
//#endregion
export { publishSessionTranscriptUpdateByIdentity as a, readSessionTranscriptRawDelta as c, resolveSessionTranscriptIdentity as d, resolveSessionTranscriptTarget as f, appendSessionTranscriptMessagesByIdentity as i, readSessionTranscriptVisibleMessageDelta as l, withProjectedSessionTranscriptWriteLock as m, appendSessionTranscriptMessageByIdentity as n, readLatestAssistantTextByIdentity as o, withSessionTranscriptWriteLock as p, appendSessionTranscriptMessageByIdentityStrict as r, readSessionTranscriptEvents as s, appendAssistantMirrorMessageByIdentity as t, readVisibleSessionTranscriptMessageEntries as u };
