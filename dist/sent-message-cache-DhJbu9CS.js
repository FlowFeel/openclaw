import { v as parseStrictInteger, y as parseStrictNonNegativeInteger } from "./number-coercion-Crk_c9KW.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { r as logVerbose } from "./globals-DHQUG86L.js";
import { m as resolveStorePath } from "./session-store-runtime-dul9f0ER.js";
import "./runtime-env-Cah9m5gV.js";
import "./number-runtime-C6TGSEc_.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import "./agent-runtime-DECiFwev.js";
import { n as getTelegramRuntime } from "./runtime-D4cq5Nic.js";
import { createHash } from "node:crypto";
import fs from "node:fs";
//#region extensions/telegram/src/outbound-params.ts
function parseIntegerId(value) {
	return parseStrictInteger(value);
}
function parseTelegramMessageThreadId(value) {
	return parseStrictNonNegativeInteger(value);
}
function normalizeTelegramReplyToMessageId(value) {
	if (typeof value !== "string") return parseIntegerId(value);
	const trimmed = value.trim();
	return trimmed ? parseIntegerId(trimmed) : void 0;
}
function parseTelegramReplyToMessageId(replyToId) {
	return normalizeTelegramReplyToMessageId(replyToId);
}
function parseTelegramThreadId(threadId) {
	if (threadId == null) return;
	if (typeof threadId === "number") return parseIntegerId(threadId);
	const trimmed = threadId.trim();
	if (!trimmed) return;
	const topicMatch = /^-?\d+:topic:(\d+)$/.exec(trimmed);
	if (topicMatch) return parseIntegerId(topicMatch[1]);
	const scopedMatch = /^-?\d+:(-?\d+)$/.exec(trimmed);
	return parseIntegerId(scopedMatch ? scopedMatch[1] : trimmed);
}
//#endregion
//#region extensions/telegram/src/message-cache-persistence.ts
const TELEGRAM_MESSAGE_CACHE_PERSISTENT_MAX_MESSAGES = 3e3;
const TELEGRAM_MESSAGE_CACHE_PERSISTENT_NAMESPACE = "telegram.message-cache";
function resolveTelegramMessageCachePath(storePath) {
	return `${storePath}.telegram-messages.json`;
}
function resolveTelegramMessageCacheScope(storePath) {
	return resolveTelegramMessageCachePath(storePath);
}
function resolveTelegramMessageCachePersistentScopeKey(scope) {
	return createHash("sha256").update(scope).digest("hex").slice(0, 24);
}
function isTelegramMessageCacheSourceMessage(value) {
	return isRecord(value) && typeof value.message_id === "number" && Number.isFinite(value.message_id) && typeof value.date === "number" && Number.isFinite(value.date);
}
//#endregion
//#region extensions/telegram/src/sent-message-cache.ts
const TTL_MS = 1440 * 60 * 1e3;
const CLEANUP_INTERVAL_MS = 3600 * 1e3;
const TELEGRAM_SENT_MESSAGE_CACHE_NAMESPACE = "telegram.sent-messages";
const TELEGRAM_SENT_MESSAGE_CACHE_MAX_ENTRIES = 1e4;
const TELEGRAM_SENT_MESSAGES_STATE_KEY = Symbol.for("openclaw.telegramSentMessagesState");
function getSentMessageState() {
	const globalStore = globalThis;
	const existing = globalStore[TELEGRAM_SENT_MESSAGES_STATE_KEY];
	if (existing) return existing;
	const state = { bucketsByScope: /* @__PURE__ */ new Map() };
	globalStore[TELEGRAM_SENT_MESSAGES_STATE_KEY] = state;
	return state;
}
function createSentMessageStore() {
	return /* @__PURE__ */ new Map();
}
function resolveSentMessageAgentId(cfg, agentId) {
	return agentId?.trim() || (cfg?.agents ? resolveDefaultAgentId(cfg) : "main");
}
function resolveSentMessageStorePath(cfg, agentId) {
	return `${resolveStorePath(cfg?.session?.store, { agentId: resolveSentMessageAgentId(cfg, agentId) })}.telegram-sent-messages.json`;
}
function sentMessageScopeKeyForStorePath(storePath) {
	return createHash("sha256").update(storePath, "utf8").digest("hex").slice(0, 24);
}
function resolveSentMessageScopeKey(cfg, agentId) {
	return sentMessageScopeKeyForStorePath(resolveStorePath(cfg?.session?.store, { agentId: resolveSentMessageAgentId(cfg, agentId) }));
}
function sentMessageEntryKey(scopeKey, chatId, messageId) {
	return createHash("sha256").update(`${scopeKey}\0${chatId}\0${messageId}`, "utf8").digest("hex").slice(0, 32);
}
function openSentMessageStore() {
	return getTelegramRuntime().state.openSyncKeyedStore({
		namespace: TELEGRAM_SENT_MESSAGE_CACHE_NAMESPACE,
		maxEntries: TELEGRAM_SENT_MESSAGE_CACHE_MAX_ENTRIES
	});
}
function cleanupExpired(store, scopeKey, entry, now) {
	for (const [id, timestamp] of entry) if (now - timestamp >= TTL_MS) entry.delete(id);
	if (entry.size === 0) store.delete(scopeKey);
}
function cleanupExpiredSentMessages(store, now) {
	for (const [scopeKey, entry] of store) cleanupExpired(store, scopeKey, entry, now);
}
function readLegacySentMessages(filePath) {
	try {
		const raw = fs.readFileSync(filePath, "utf-8");
		const parsed = JSON.parse(raw);
		const now = Date.now();
		const store = createSentMessageStore();
		for (const [chatId, entry] of Object.entries(parsed)) {
			const messages = /* @__PURE__ */ new Map();
			for (const [messageId, timestamp] of Object.entries(entry)) if (typeof timestamp === "number" && Number.isFinite(timestamp) && now - timestamp < TTL_MS) messages.set(messageId, timestamp);
			if (messages.size > 0) store.set(chatId, messages);
		}
		return store;
	} catch (error) {
		logVerbose(`telegram: failed to read sent-message cache: ${String(error)}`);
		return createSentMessageStore();
	}
}
function readPersistedSentMessages(scopeKey) {
	const now = Date.now();
	const store = createSentMessageStore();
	try {
		for (const entry of openSentMessageStore().entries()) {
			if (entry.value.scopeKey !== scopeKey || now - entry.value.timestamp > TTL_MS) continue;
			let messages = store.get(entry.value.chatId);
			if (!messages) {
				messages = /* @__PURE__ */ new Map();
				store.set(entry.value.chatId, messages);
			}
			messages.set(entry.value.messageId, entry.value.timestamp);
		}
	} catch (error) {
		logVerbose(`telegram: failed to read sent-message cache: ${String(error)}`);
	}
	return store;
}
function getSentMessageBucket(cfg) {
	const state = getSentMessageState();
	const scopeKey = resolveSentMessageScopeKey(cfg);
	const existing = state.bucketsByScope.get(scopeKey);
	if (existing) return existing;
	const bucket = {
		scopeKey,
		store: readPersistedSentMessages(scopeKey),
		nextCleanupAt: Date.now() + CLEANUP_INTERVAL_MS
	};
	state.bucketsByScope.set(scopeKey, bucket);
	return bucket;
}
function getSentMessages(cfg) {
	return getSentMessageBucket(cfg).store;
}
function persistSentMessage(bucket, chatId, messageId, timestamp) {
	openSentMessageStore().register(sentMessageEntryKey(bucket.scopeKey, chatId, messageId), {
		scopeKey: bucket.scopeKey,
		chatId,
		messageId,
		timestamp
	}, { ttlMs: TTL_MS });
}
function recordSentMessage(chatId, messageId, cfg) {
	const scopeKey = String(chatId);
	const idKey = String(messageId);
	const now = Date.now();
	const bucket = getSentMessageBucket(cfg);
	const { store } = bucket;
	let entry = store.get(scopeKey);
	if (!entry) {
		entry = /* @__PURE__ */ new Map();
		store.set(scopeKey, entry);
	}
	entry.set(idKey, now);
	if (now >= bucket.nextCleanupAt) {
		cleanupExpiredSentMessages(store, now);
		bucket.nextCleanupAt = now + CLEANUP_INTERVAL_MS;
	}
	try {
		persistSentMessage(bucket, scopeKey, idKey, now);
	} catch (error) {
		logVerbose(`telegram: failed to persist sent-message cache: ${String(error)}`);
	}
}
function wasSentByBot(chatId, messageId, cfg) {
	const scopeKey = String(chatId);
	const idKey = String(messageId);
	const store = getSentMessages(cfg);
	const entry = store.get(scopeKey);
	if (!entry) return false;
	cleanupExpired(store, scopeKey, entry, Date.now());
	return entry.has(idKey);
}
function listTelegramLegacySentMessageCacheEntries(params) {
	const scopeKey = params.targetStorePath ? sentMessageScopeKeyForStorePath(params.targetStorePath) : resolveSentMessageScopeKey(params.cfg, params.agentId);
	const filePath = params.persistedPath ?? resolveSentMessageStorePath(params.cfg, params.agentId);
	return [...(fs.existsSync(filePath) ? readLegacySentMessages(filePath) : createSentMessageStore()).entries()].flatMap(([chatId, messages]) => [...messages.entries()].flatMap(([messageId, timestamp]) => {
		const ttlMs = TTL_MS - Math.max(0, Date.now() - timestamp);
		return ttlMs > 0 ? [{
			key: sentMessageEntryKey(scopeKey, chatId, messageId),
			value: {
				scopeKey,
				chatId,
				messageId,
				timestamp
			},
			ttlMs,
			timestamp
		}] : [];
	}));
}
//#endregion
export { wasSentByBot as a, isTelegramMessageCacheSourceMessage as c, resolveTelegramMessageCacheScope as d, normalizeTelegramReplyToMessageId as f, parseTelegramThreadId as h, recordSentMessage as i, resolveTelegramMessageCachePath as l, parseTelegramReplyToMessageId as m, TELEGRAM_SENT_MESSAGE_CACHE_NAMESPACE as n, TELEGRAM_MESSAGE_CACHE_PERSISTENT_MAX_MESSAGES as o, parseTelegramMessageThreadId as p, listTelegramLegacySentMessageCacheEntries as r, TELEGRAM_MESSAGE_CACHE_PERSISTENT_NAMESPACE as s, TELEGRAM_SENT_MESSAGE_CACHE_MAX_ENTRIES as t, resolveTelegramMessageCachePersistentScopeKey as u };
