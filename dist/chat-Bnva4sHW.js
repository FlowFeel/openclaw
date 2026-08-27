import { i as asOptionalRecord } from "./record-coerce-DHZ4bFlT.js";
import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { f as resolveDefaultAgentId, i as listAgentIds } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { g as scopeLegacySessionKeyToAgent } from "./session-key-DtTE9-Tg.js";
import { g as resolveSessionAgentId } from "./agent-scope-DyEposw2.js";
import { a as measureDiagnosticsTimelineSpan, o as measureDiagnosticsTimelineSpanSync } from "./diagnostics-timeline--Yi1HEPC.js";
import { u as hashRuntimeConfigValue } from "./runtime-snapshot-DLOCFXOE.js";
import { a as hasGatewayClientCap, t as GATEWAY_CLIENT_CAPS } from "./client-info-Dlrmm4mP.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { r as resolveSessionStoreKey } from "./session-store-key-DmGCpash.js";
import { gt as resolveSqliteSessionKeyBySessionId } from "./session-accessor.sqlite-B9iW7DOt.js";
import { ut as beginSessionWorkAdmission } from "./session-entry-slot-keys-DR5d2mKt.js";
import { I as resolveSessionTranscriptActiveLeafEntryId, b as isSessionTranscriptProjectionUnavailableError, p as readSessionTranscriptMessageAnchorPage } from "./session-accessor-t3qUoTeV.js";
import { B as validateChatHistoryParams, G as validateChatToolTitlesParams, H as validateChatMessageGetParams, U as validateChatMetadataParams, V as validateChatInjectParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { t as CHAT_HISTORY_MAX_ENTRIES } from "./chat-history-constants-C2lazUOH.js";
import "./sessions-CBo4LOdS.js";
import { s as resolveSessionWorkStartError } from "./lifecycle-CeMojaXs.js";
import { r as jsonUtf8Bytes } from "./json-utf8-bytes-C14lActR.js";
import { c as readSessionMessagesAsync, f as resolveTranscriptReadTarget, g as ArchivedTranscriptReader, i as readRecentSessionMessagesWithStatsAsync, l as readSessionMessagesPageWithStatsAsync, m as toTranscriptReadScope, o as readSessionMessageByIdAsync, p as sqliteMessageEventWithSeq, v as capArrayByJsonBytes } from "./session-transcript-readers-O3pZVV3x.js";
import { n as resolveSessionModelRef } from "./session-model-ref-SCzh_dh2.js";
import { C as loadSessionEntryReadOnly, S as loadSessionEntry, j as getSessionDefaults, x as listAgentsForGateway } from "./session-utils-row-BDvhdN3C.js";
import { t as listGatewayAgentsBasic } from "./agent-list-c7Bg3rPD.js";
import { i as buildGatewaySessionInfo } from "./session-utils-list-PF9PlJs5.js";
import "./session-utils-C8yYh4dv.js";
import { t as resolveSwarmConfig } from "./swarm-config-BozrcCT-.js";
import { c as augmentChatHistoryWithCanvasBlocks, i as projectRecentChatDisplayMessages, n as projectChatDisplayMessages, o as dropPreSessionStartAnnouncePairs, s as isHeartbeatHistoryTurnBoundaryMessage, t as projectChatDisplayMessage, u as resolveEffectiveChatHistoryMaxChars } from "./chat-display-projection-BmOZbWDY.js";
import { d as resolveInFlightRunSnapshot, i as boundInFlightRunSnapshotForChatHistory } from "./chat-abort-S5cQPsk-.js";
import { t as logLargePayload } from "./diagnostic-payload-Cvs6bzBU.js";
import { a as MAX_PAYLOAD_BYTES, c as getMaxChatHistoryMessagesBytes } from "./server-constants-DKuFNbQH.js";
import { t as formatForLog } from "./ws-log-B1D_Y86r.js";
import { r as modelCatalogBrowseRequiresFullDiscovery } from "./model-catalog-browse-CQT3FaxB.js";
import { a as resolveClaudeCliBindingSessionId } from "./cli-session-history.claude-DRtGxhse.js";
import { n as resolveChatHistoryWithCliSessionImports } from "./cli-session-history-mJ-QsCoh.js";
import { C as scheduleChatHistoryManagedMediaCleanup, L as normalizeOptionalChatText, o as appendAssistantTranscriptMessage } from "./chat-abort-runtime-CEgNlbhw.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as handleChatAbortRequest } from "./chat-abort-handler-DNFQf_fD.js";
import { a as sendGlobalAwareNodeChatPayload, n as resolveRequestedChatAgentId, r as validateChatSelectedAgent, t as handleChatSend } from "./chat-send-handler-KvKqvUS4.js";
import { r as resolveSessionHistoryTailReadOptions } from "./session-history-state-CZZJc1TP.js";
import { r as startOptionalServerMethodModelCatalogSnapshotLoad, t as loadOptionalServerMethodModelCatalogSnapshot } from "./optional-model-catalog-cUfdCxQg.js";
import { i as resolveVisibleActiveSessionRunState } from "./session-active-runs-CVvKRMMT.js";
//#region src/gateway/server-methods/chat-history-budget.ts
const CHAT_HISTORY_MAX_SINGLE_MESSAGE_BYTES = 128 * 1024;
const CHAT_HISTORY_OVERSIZED_PLACEHOLDER = "[chat.history omitted: message too large]";
const CHAT_HISTORY_UNAVAILABLE_SENTINEL = "[chat.history unavailable: transcript too large to display; the full history is preserved on disk]";
let chatHistoryOmittedEmitCount = 0;
function buildChatHistoryUnavailableSentinel() {
	return {
		role: "assistant",
		timestamp: Date.now(),
		content: [{
			type: "text",
			text: CHAT_HISTORY_UNAVAILABLE_SENTINEL
		}]
	};
}
function buildOversizedHistoryPlaceholder(message) {
	const role = message && typeof message === "object" && typeof message.role === "string" ? message.role : "assistant";
	const timestamp = message && typeof message === "object" && typeof message.timestamp === "number" ? message.timestamp : Date.now();
	const rawMetadata = message && typeof message === "object" ? message["__openclaw"] : void 0;
	const metadata = rawMetadata && typeof rawMetadata === "object" && !Array.isArray(rawMetadata) ? rawMetadata : {};
	const metadataId = typeof metadata.id === "string" ? metadata.id : void 0;
	const metadataSeq = typeof metadata.seq === "number" ? metadata.seq : void 0;
	const metadataIdempotencyKey = typeof metadata.idempotencyKey === "string" ? metadata.idempotencyKey : void 0;
	const turnBoundary = metadata.turnBoundary === true;
	return {
		role,
		timestamp,
		content: [{
			type: "text",
			text: CHAT_HISTORY_OVERSIZED_PLACEHOLDER
		}],
		__openclaw: {
			...metadataId ? { id: metadataId } : {},
			...metadataSeq !== void 0 ? { seq: metadataSeq } : {},
			...metadataIdempotencyKey ? { idempotencyKey: metadataIdempotencyKey } : {},
			...turnBoundary ? { turnBoundary: true } : {},
			truncated: true,
			reason: "oversized"
		}
	};
}
function replaceOversizedChatHistoryMessages(params) {
	const { messages, maxSingleMessageBytes } = params;
	if (messages.length === 0) return {
		messages,
		replacedCount: 0
	};
	let replacedCount = 0;
	const next = messages.map((message) => {
		if (jsonUtf8Bytes(message) <= maxSingleMessageBytes) return message;
		replacedCount += 1;
		return buildOversizedHistoryPlaceholder(message);
	});
	return {
		messages: replacedCount > 0 ? next : messages,
		replacedCount
	};
}
function enforceChatHistoryFinalBudget(params) {
	const { messages, maxBytes } = params;
	if (messages.length === 0) return { messages };
	if (jsonUtf8Bytes(messages) <= maxBytes) return { messages };
	const last = messages.at(-1);
	if (last && jsonUtf8Bytes([last]) <= maxBytes) return { messages: [last] };
	const placeholder = buildOversizedHistoryPlaceholder(last);
	if (jsonUtf8Bytes([placeholder]) <= maxBytes) return { messages: [placeholder] };
	return { messages: [buildChatHistoryUnavailableSentinel()] };
}
function reportOmittedChatHistory(params) {
	const { originalMessages, finalMessages, getNormalizedBytes, maxHistoryBytes, logDebug } = params;
	const survivors = new Set(finalMessages);
	let omittedCount = 0;
	for (const message of originalMessages) if (!survivors.has(message)) omittedCount += 1;
	if (omittedCount === 0) return 0;
	chatHistoryOmittedEmitCount += omittedCount;
	logLargePayload({
		surface: "gateway.chat.history",
		action: "truncated",
		bytes: getNormalizedBytes(),
		limitBytes: maxHistoryBytes,
		count: omittedCount,
		reason: "chat_history_budget"
	});
	logDebug(`chat.history omitted oversized payloads count=${omittedCount} total=${chatHistoryOmittedEmitCount}`);
	return omittedCount;
}
//#endregion
//#region src/gateway/session-transcript-anchor-reader.ts
/** Reads one message-id-anchored page from a single transcript snapshot. */
async function readSessionMessagesAroundIdWithStatsAsync(scope, opts) {
	const target = resolveTranscriptReadTarget(scope);
	const sessionFile = !scope.sessionFile && scope.sessionEntry?.sessionId && scope.sessionEntry.sessionId !== scope.sessionId ? void 0 : target.sessionFile;
	const page = readSessionTranscriptMessageAnchorPage(toTranscriptReadScope(target), opts);
	if (!page.found) {
		if (opts.allowResetArchiveFallback === true) return await new ArchivedTranscriptReader({
			agentId: target.agentId,
			sessionFile,
			sessionId: target.sessionId,
			storePath: target.storePath
		}).readAroundId({
			...opts,
			resetArchiveOnly: true
		});
		return {
			found: false,
			hasOverreadContext: false,
			messages: [],
			offset: 0,
			totalMessages: page.totalMessages,
			transcriptPath: target.sessionFile
		};
	}
	return {
		found: true,
		hasOverreadContext: page.hasOverreadContext,
		messages: page.events.flatMap((entry) => {
			const message = sqliteMessageEventWithSeq(entry);
			return message === void 0 ? [] : [message];
		}),
		offset: page.offset,
		totalMessages: page.totalMessages,
		transcriptPath: target.sessionFile
	};
}
//#endregion
//#region src/gateway/server-methods/chat-history-pages.ts
function readChatHistoryMessageId(message) {
	const metadata = asOptionalRecord(asOptionalRecord(message)?.["__openclaw"]);
	return typeof metadata?.id === "string" ? metadata.id : void 0;
}
function readChatHistoryMessageSeq(message) {
	const seq = asOptionalRecord(asOptionalRecord(message)?.["__openclaw"])?.seq;
	return typeof seq === "number" && Number.isSafeInteger(seq) && seq > 0 ? seq : void 0;
}
function resolveChatHistoryActiveLeafEntryId(readPage) {
	if (readPage.transcriptSource !== "active") return null;
	if (Object.hasOwn(readPage, "activeLeafEntryId")) return readPage.activeLeafEntryId ?? null;
	return resolveSessionTranscriptActiveLeafEntryId(readPage.transcriptEvents ?? []) ?? null;
}
/** Add checkpoint token metrics to the synthetic transcript compaction marker. */
function enrichChatHistoryCompactionMarkers(messages, entry) {
	const checkpoints = entry?.compactionCheckpoints;
	if (!Array.isArray(checkpoints) || checkpoints.length === 0) return messages;
	const checkpointByEntryId = new Map(checkpoints.flatMap((checkpoint) => {
		const entryId = checkpoint.postCompaction?.entryId;
		return typeof entryId === "string" && entryId ? [[entryId, checkpoint]] : [];
	}));
	let changed = false;
	const enriched = messages.map((message) => {
		const record = asOptionalRecord(message);
		const metadata = asOptionalRecord(record?.["__openclaw"]);
		if (metadata?.kind !== "compaction" || typeof metadata.id !== "string") return message;
		const checkpoint = checkpointByEntryId.get(metadata.id);
		if (!checkpoint) return message;
		const tokensBefore = checkpoint.tokensBefore;
		const tokensAfter = checkpoint.tokensAfter;
		if ((typeof tokensBefore !== "number" || !Number.isFinite(tokensBefore)) && (typeof tokensAfter !== "number" || !Number.isFinite(tokensAfter))) return message;
		changed = true;
		return {
			...record,
			__openclaw: {
				...metadata,
				...typeof tokensBefore === "number" && Number.isFinite(tokensBefore) ? { tokensBefore } : {},
				...typeof tokensAfter === "number" && Number.isFinite(tokensAfter) ? { tokensAfter } : {}
			}
		};
	});
	return changed ? enriched : messages;
}
function capOffsetChatHistoryProjectedMessages(messages, max) {
	if (messages.length <= max) return messages;
	const start = Math.max(0, messages.length - max);
	const boundarySeq = readChatHistoryMessageSeq(messages[start]);
	if (boundarySeq === void 0) return messages.slice(start);
	let safeStart = start;
	while (safeStart > 0 && readChatHistoryMessageSeq(messages[safeStart - 1]) === boundarySeq) safeStart--;
	return messages.slice(safeStart);
}
function resolveChatHistoryMessageGroup(messages, index) {
	const seq = readChatHistoryMessageSeq(messages[index]);
	if (seq === void 0) return {
		start: index,
		end: index + 1
	};
	let start = index;
	let end = index + 1;
	while (start > 0 && readChatHistoryMessageSeq(messages[start - 1]) === seq) start -= 1;
	while (end < messages.length && readChatHistoryMessageSeq(messages[end]) === seq) end += 1;
	return {
		start,
		end
	};
}
function capChatHistoryAroundMessage(params) {
	const anchorIndex = params.messages.findIndex((message) => readChatHistoryMessageId(message) === params.messageId);
	if (anchorIndex === -1) return;
	const anchorGroup = resolveChatHistoryMessageGroup(params.messages, anchorIndex);
	if (!params.fits(params.messages.slice(anchorGroup.start, anchorGroup.end))) return [params.messages[anchorIndex]];
	let { start, end } = anchorGroup;
	let canGrowOlder = start > 0;
	let canGrowNewer = end < params.messages.length;
	while (canGrowOlder || canGrowNewer) {
		if (canGrowOlder) {
			const olderGroup = resolveChatHistoryMessageGroup(params.messages, start - 1);
			if (params.fits(params.messages.slice(olderGroup.start, end))) start = olderGroup.start;
			else canGrowOlder = false;
		}
		canGrowOlder &&= start > 0;
		if (canGrowNewer) {
			const newerGroup = resolveChatHistoryMessageGroup(params.messages, end);
			if (params.fits(params.messages.slice(start, newerGroup.end))) end = newerGroup.end;
			else canGrowNewer = false;
		}
		canGrowNewer &&= end < params.messages.length;
	}
	return params.messages.slice(start, end);
}
function dropLocalHistoryOverreadContextMessage(messages, contextMessage) {
	if (contextMessage === void 0) return messages;
	const index = messages.indexOf(contextMessage);
	if (index < 0) return messages;
	return [...messages.slice(0, index), ...messages.slice(index + 1)];
}
async function readChatHistoryPage(params) {
	const { entry, provider, sessionId, storePath, sessionAgentId, canonicalKey, max, maxHistoryBytes, effectiveMaxChars, offset, messageId } = params;
	if (!sessionId || !storePath) {
		if (messageId) return { messages: [] };
		return {
			...(offset ?? 0) === 0 ? { activeLeafEntryId: null } : {},
			messages: [],
			...offset !== void 0 ? { responseOffset: offset } : {},
			pagination: {
				offset: offset ?? 0,
				totalMessages: 0,
				rawPageMessages: 0
			}
		};
	}
	const readScope = {
		agentId: sessionAgentId,
		sessionEntry: entry,
		sessionId,
		sessionKey: canonicalKey,
		storePath
	};
	const cliSessionId = params.ignoreCliSessionImports ? void 0 : resolveClaudeCliBindingSessionId(entry);
	if ((offset !== void 0 || messageId) && !cliSessionId) {
		const rawHistoryWindow = resolveSessionHistoryTailReadOptions(max);
		let pageOffset = offset ?? 0;
		let hasOverreadContext = false;
		let readPage;
		if (messageId) {
			const anchoredPage = await readSessionMessagesAroundIdWithStatsAsync(readScope, {
				messageId,
				maxMessages: max,
				allowResetArchiveFallback: true
			});
			if (!anchoredPage.found) return { messages: [] };
			pageOffset = anchoredPage.offset;
			hasOverreadContext = anchoredPage.hasOverreadContext;
			readPage = anchoredPage;
		} else if (pageOffset === 0) readPage = await readRecentSessionMessagesWithStatsAsync(readScope, {
			maxMessages: rawHistoryWindow.maxMessages + 1,
			maxLines: rawHistoryWindow.maxLines + 1,
			maxBytes: Math.max(maxHistoryBytes * 2, 1024 * 1024),
			allowResetArchiveFallback: true
		});
		else readPage = await readSessionMessagesPageWithStatsAsync(readScope, {
			offset: pageOffset,
			maxMessages: max + 1,
			allowResetArchiveFallback: true
		});
		const isTailPage = !messageId && pageOffset === 0;
		const overreadContextMessage = isTailPage ? readPage.messages.length > rawHistoryWindow.maxMessages ? readPage.messages[0] : void 0 : hasOverreadContext || readPage.messages.length > max ? readPage.messages[0] : void 0;
		const localMessages = dropLocalHistoryOverreadContextMessage(dropPreSessionStartAnnouncePairs(readPage.messages, typeof entry?.sessionStartedAt === "number" ? entry.sessionStartedAt : void 0), overreadContextMessage);
		const rawPageMessages = isTailPage ? Math.min(rawHistoryWindow.maxMessages, Math.max(readPage.messages.length, readPage.totalMessages > 0 ? 1 : 0)) : Math.min(max, Math.max(readPage.messages.length, readPage.totalMessages > pageOffset ? 1 : 0));
		const recencyFilteredMessages = dropPreSessionStartAnnouncePairs(localMessages, typeof entry?.sessionStartedAt === "number" ? entry.sessionStartedAt : void 0);
		const projected = isTailPage ? projectRecentChatDisplayMessages(recencyFilteredMessages, {
			maxChars: effectiveMaxChars,
			maxMessages: max,
			turnBoundaryPending: isHeartbeatHistoryTurnBoundaryMessage(overreadContextMessage)
		}) : projectChatDisplayMessages(recencyFilteredMessages, {
			maxChars: effectiveMaxChars,
			turnBoundaryPending: isHeartbeatHistoryTurnBoundaryMessage(overreadContextMessage)
		});
		const normalized = augmentChatHistoryWithCanvasBlocks(messageId ? capChatHistoryAroundMessage({
			messages: projected,
			messageId,
			fits: (messages) => messages.length <= max
		}) ?? capOffsetChatHistoryProjectedMessages(projected, max) : isTailPage ? projected : capOffsetChatHistoryProjectedMessages(projected, max));
		if (messageId) return { messages: normalized };
		return {
			...isTailPage ? { activeLeafEntryId: resolveChatHistoryActiveLeafEntryId(readPage) } : {},
			messages: normalized,
			responseOffset: pageOffset,
			pagination: {
				offset: pageOffset,
				totalMessages: readPage.totalMessages,
				rawPageMessages
			}
		};
	}
	const rawHistoryWindow = resolveSessionHistoryTailReadOptions(max);
	const readPage = await readRecentSessionMessagesWithStatsAsync(readScope, {
		maxMessages: rawHistoryWindow.maxMessages + 1,
		maxLines: rawHistoryWindow.maxLines + 1,
		maxBytes: Math.max(maxHistoryBytes * 2, 1024 * 1024),
		allowResetArchiveFallback: true
	});
	const overreadContextMessage = readPage.messages.length > rawHistoryWindow.maxMessages ? readPage.messages[0] : void 0;
	const turnBoundaryPending = isHeartbeatHistoryTurnBoundaryMessage(overreadContextMessage);
	const activeLeafEntryId = resolveChatHistoryActiveLeafEntryId(readPage);
	const localMessagesWithBoundaryFilter = dropLocalHistoryOverreadContextMessage(dropPreSessionStartAnnouncePairs(readPage.messages, typeof entry?.sessionStartedAt === "number" ? entry.sessionStartedAt : void 0), overreadContextMessage);
	const cliHistory = params.ignoreCliSessionImports ? {
		messages: localMessagesWithBoundaryFilter,
		imported: false
	} : resolveChatHistoryWithCliSessionImports({
		entry,
		provider,
		localMessages: localMessagesWithBoundaryFilter
	});
	if ((offset !== void 0 || messageId) && !cliHistory.imported) return readChatHistoryPage({
		...params,
		ignoreCliSessionImports: true
	});
	if (cliHistory.imported) {
		const completeCliHistory = resolveChatHistoryWithCliSessionImports({
			entry,
			provider,
			localMessages: dropPreSessionStartAnnouncePairs(await readSessionMessagesAsync(readScope, {
				mode: "full",
				reason: "chat.history CLI import merge",
				allowResetArchiveFallback: true
			}), typeof entry?.sessionStartedAt === "number" ? entry.sessionStartedAt : void 0)
		});
		if (!completeCliHistory.imported) return readChatHistoryPage({
			...params,
			ignoreCliSessionImports: true
		});
		const mergedMessages = dropPreSessionStartAnnouncePairs(completeCliHistory.messages, typeof entry?.sessionStartedAt === "number" ? entry.sessionStartedAt : void 0);
		return {
			activeLeafEntryId,
			messages: augmentChatHistoryWithCanvasBlocks(projectChatDisplayMessages(mergedMessages, { maxChars: effectiveMaxChars })),
			completeCliImport: true,
			pagination: {
				offset: 0,
				totalMessages: mergedMessages.length,
				rawPageMessages: mergedMessages.length,
				exhausted: true
			}
		};
	}
	const rawMessages = cliHistory.messages;
	return {
		activeLeafEntryId,
		messages: augmentChatHistoryWithCanvasBlocks(projectRecentChatDisplayMessages(dropPreSessionStartAnnouncePairs(rawMessages, typeof entry?.sessionStartedAt === "number" ? entry.sessionStartedAt : void 0), {
			maxChars: effectiveMaxChars,
			maxMessages: max,
			turnBoundaryPending
		})),
		pagination: {
			offset: 0,
			totalMessages: readPage.totalMessages,
			rawPageMessages: Math.min(rawHistoryWindow.maxMessages, Math.max(readPage.messages.length, readPage.totalMessages > 0 ? 1 : 0))
		}
	};
}
//#endregion
//#region src/gateway/server-methods/chat-startup-projection-memo.ts
const CHAT_STARTUP_METADATA_CACHE_MAX_ENTRIES = 32;
const chatStartupProjectionMemoByContext = /* @__PURE__ */ new WeakMap();
function runtimeConfigsMatch(left, right) {
	if (left === right) return true;
	try {
		return hashRuntimeConfigValue(left) === hashRuntimeConfigValue(right);
	} catch {
		return false;
	}
}
function getChatStartupProjectionMemo(context, config, modelCatalog) {
	const current = chatStartupProjectionMemoByContext.get(context);
	if (current && current.catalogEntries === modelCatalog.entries && current.catalogRouteVariants === modelCatalog.routeVariants && runtimeConfigsMatch(current.config, config)) return current;
	const next = {
		config,
		catalogEntries: modelCatalog.entries,
		catalogRouteVariants: modelCatalog.routeVariants,
		agentsListByKey: /* @__PURE__ */ new Map(),
		metadataByKey: /* @__PURE__ */ new Map()
	};
	chatStartupProjectionMemoByContext.set(context, next);
	return next;
}
function setChatStartupMetadataMemo(memo, key, value) {
	memo.metadataByKey.delete(key);
	memo.metadataByKey.set(key, value);
	pruneMapToMaxSize(memo.metadataByKey, CHAT_STARTUP_METADATA_CACHE_MAX_ENTRIES);
}
function resolveChatStartupMetadataMemoKey(params) {
	return [
		normalizeAgentId(params.agentId),
		params.sessionEntry?.authProfileOverride?.trim() ?? "",
		params.sessionEntry?.authProfileOverrideSource ?? "",
		params.sessionEntry?.authProfileOverrideCompactionCount ?? ""
	].join("\0");
}
async function buildChatStartupMetadataResult(params) {
	if (!params.modelCatalog) return;
	if (modelCatalogBrowseRequiresFullDiscovery({
		cfg: params.cfg,
		agentId: params.agentId,
		view: "configured"
	})) return;
	try {
		const { buildModelsListResult } = await import("./models-list-result-CN07K3N0.js");
		const currentConfig = params.context.getRuntimeConfig();
		if (params.modelCatalog.agentId !== params.agentId || !runtimeConfigsMatch(currentConfig, params.cfg)) return;
		return {
			...await buildModelsListResult({
				context: params.context,
				agentId: params.agentId,
				params: { view: "configured" },
				preloadedCatalog: {
					agentId: params.agentId,
					config: currentConfig,
					snapshot: params.modelCatalog
				},
				preloadedOnly: true,
				...params.catalogProjector ? { catalogProjector: params.catalogProjector } : {}
			}),
			swarmEnabled: resolveSwarmConfig(params.cfg, params.agentId).enabled
		};
	} catch (err) {
		params.context.logGateway.debug(`chat.startup continuing without metadata: ${formatErrorMessage(err)}`);
		return;
	}
}
async function buildMemoizedChatStartupMetadataResult(params) {
	if (!runtimeConfigsMatch(params.context.getRuntimeConfig(), params.cfg)) {
		chatStartupProjectionMemoByContext.delete(params.context);
		return;
	}
	const memo = getChatStartupProjectionMemo(params.context, params.cfg, params.modelCatalog);
	const key = resolveChatStartupMetadataMemoKey(params);
	const cached = memo.metadataByKey.get(key);
	if (cached) {
		memo.metadataByKey.delete(key);
		memo.metadataByKey.set(key, cached);
		return cached;
	}
	const result = await buildChatStartupMetadataResult(params);
	if (result && runtimeConfigsMatch(params.context.getRuntimeConfig(), params.cfg)) setChatStartupMetadataMemo(memo, key, result);
	return result;
}
function listMemoizedChatStartupAgents(params) {
	const buildAgentsList = () => listAgentsForGateway(params.cfg, params.modelCatalog, {
		modelCatalogByAgentId: params.modelCatalogByAgentId,
		includeSystem: params.includeSystem
	});
	if (!runtimeConfigsMatch(params.context.getRuntimeConfig(), params.cfg) || !runtimeConfigsMatch(params.catalogSnapshot.config, params.cfg)) return buildAgentsList();
	const memo = getChatStartupProjectionMemo(params.context, params.cfg, params.catalogSnapshot);
	const key = params.includeSystem ? "include-system" : "agents-only";
	const cached = memo.agentsListByKey.get(key);
	if (cached) return cached;
	const agentsList = buildAgentsList();
	memo.agentsListByKey.set(key, agentsList);
	return agentsList;
}
//#endregion
//#region src/gateway/server-methods/chat-history-handler.ts
async function handleChatMetadataRequest({ params, respond, context }) {
	if (!assertValidParams(params, validateChatMetadataParams, "chat.metadata", respond)) return;
	const metadataParams = params;
	const cfg = context.getRuntimeConfig();
	const requestedAgentId = typeof metadataParams.agentId === "string" && metadataParams.agentId.trim() ? normalizeAgentId(metadataParams.agentId) : resolveDefaultAgentId(cfg);
	if (!listAgentIds(cfg).includes(requestedAgentId)) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `Unknown agent id "${metadataParams.agentId}"`));
		return;
	}
	respond(true, await buildChatMetadataResult({
		cfg,
		context,
		agentId: requestedAgentId
	}));
}
async function buildChatMetadataResult(params) {
	const [{ buildModelsListResult }, { buildCommandsListResult }] = await Promise.all([import("./models-list-result-CN07K3N0.js"), import("./commands-list-result-CNAXzvzQ.js")]);
	const [modelsResult, commandsResult] = await Promise.allSettled([buildModelsListResult({
		context: params.context,
		agentId: params.agentId,
		params: { view: "configured" }
	}), Promise.resolve().then(() => buildCommandsListResult({
		cfg: params.cfg,
		agentId: params.agentId,
		includeArgs: true,
		scope: "text"
	}))]);
	if (modelsResult.status === "rejected") throw modelsResult.reason;
	if (commandsResult.status === "rejected") params.context.logGateway.warn("chat.metadata continuing without text commands: " + formatErrorMessage(commandsResult.reason));
	return {
		...modelsResult.value,
		...commandsResult.status === "fulfilled" ? commandsResult.value : {},
		swarmEnabled: resolveSwarmConfig(params.cfg, params.agentId).enabled
	};
}
async function buildChatStartupModelCatalogProjection(params) {
	const { createGatewayAgentModelCatalogProjector } = await import("./models-list-result-CN07K3N0.js");
	const projectorByKey = /* @__PURE__ */ new Map();
	const modelCatalogByAgentId = /* @__PURE__ */ new Map();
	const getProjector = (agentId, profiles = {}) => {
		const id = normalizeAgentId(agentId);
		const key = `${id}\0${profiles.preferredProfileId ?? ""}\0${profiles.lockedProfileId ?? ""}`;
		let projector = projectorByKey.get(key);
		if (!projector) {
			projector = createGatewayAgentModelCatalogProjector({
				cfg: params.cfg,
				agentId: id,
				snapshot: params.snapshot,
				...profiles.preferredProfileId ? { preferredProfileId: profiles.preferredProfileId } : {},
				...profiles.lockedProfileId ? { lockedProfileId: profiles.lockedProfileId } : {}
			});
			projectorByKey.set(key, projector);
		}
		return projector;
	};
	const agentIds = new Set([params.sessionAgentId, params.defaultAgentId].map(normalizeAgentId));
	if (params.includeAgentsList) for (const agent of listGatewayAgentsBasic(params.cfg).agents) agentIds.add(agent.id);
	await Promise.all([...agentIds].map(async (agentId) => {
		modelCatalogByAgentId.set(agentId, await getProjector(agentId).projectCatalog());
	}));
	const sessionProfileId = params.sessionEntry?.authProfileOverride?.trim();
	const sessionProfileSource = params.sessionEntry?.authProfileOverrideSource;
	const legacyUserProfile = sessionProfileSource === void 0 && params.sessionEntry?.authProfileOverrideCompactionCount === void 0;
	const sessionProfiles = sessionProfileId ? {
		preferredProfileId: sessionProfileId,
		...sessionProfileSource === "user" || legacyUserProfile ? { lockedProfileId: sessionProfileId } : {}
	} : void 0;
	const sessionCatalogProjector = getProjector(params.sessionAgentId, sessionProfiles);
	return {
		getProjector,
		modelCatalogByAgentId,
		sessionCatalogProjector,
		sessionModelCatalog: await sessionCatalogProjector.projectCatalog()
	};
}
const CHAT_OPTIONAL_MODEL_CATALOG_TIMEOUT_MS = 25;
function resolveChatHistoryNextOffset(params) {
	const oldestSeq = params.messages.map((message) => readChatHistoryMessageSeq(message)).find((seq) => typeof seq === "number");
	if (oldestSeq !== void 0) {
		const recordOffset = params.totalMessages - oldestSeq + 1;
		const replayOffset = recordOffset - 1;
		if (params.replayOldestRecord && replayOffset > params.offset) return replayOffset;
		return Math.max(params.offset + 1, recordOffset);
	}
	return params.offset + params.rawPageMessages;
}
function shouldReplayOldestChatHistoryRecord(params) {
	const oldestSeq = params.bounded.map((message) => readChatHistoryMessageSeq(message)).find((seq) => typeof seq === "number");
	if (oldestSeq === void 0) return false;
	const projectedCount = params.projected.filter((message) => readChatHistoryMessageSeq(message) === oldestSeq).length;
	return params.bounded.filter((message) => readChatHistoryMessageSeq(message) === oldestSeq).length < projectedCount;
}
async function handleChatHistoryRequest({ params, respond, context, client, method, includeAgentsList, includeMetadata }) {
	if (!assertValidParams(params, validateChatHistoryParams, method, respond)) return;
	const { sessionKey, limit, offset, messageId, sessionId: requestedSessionId, maxChars } = params;
	if (offset !== void 0 && messageId !== void 0) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "offset and messageId cannot be used together"));
		return;
	}
	if (requestedSessionId !== void 0 && messageId === void 0) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "sessionId requires messageId"));
		return;
	}
	const requestConfig = context.getRuntimeConfig();
	const requestedAgentId = resolveRequestedChatAgentId({
		cfg: requestConfig,
		requestedSessionKey: sessionKey,
		agentId: normalizeOptionalChatText(params.agentId)
	});
	const sessionLoadOptions = requestedAgentId ? { agentId: requestedAgentId } : void 0;
	const { cfg, storePath, store, entry, canonicalKey } = measureDiagnosticsTimelineSpanSync(`gateway.${method}.session_entry`, () => loadSessionEntryReadOnly(sessionKey, {
		...sessionLoadOptions,
		includeStoreChildEntries: true
	}), {
		config: requestConfig,
		phase: method
	});
	const selectedAgent = validateChatSelectedAgent({
		cfg,
		requestedSessionKey: sessionKey,
		agentId: requestedAgentId
	});
	if (!selectedAgent.ok) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, selectedAgent.error));
		return;
	}
	const sessionAgentId = resolveSessionAgentId({
		sessionKey,
		config: cfg,
		agentId: selectedAgent.agentId
	});
	if (requestedSessionId) {
		const transcriptSessionKey = resolveSqliteSessionKeyBySessionId({
			agentId: sessionAgentId,
			sessionId: requestedSessionId,
			storePath
		});
		if (!transcriptSessionKey || scopeLegacySessionKeyToAgent({
			sessionKey: transcriptSessionKey,
			agentId: sessionAgentId
		}) !== scopeLegacySessionKeyToAgent({
			sessionKey: canonicalKey,
			agentId: sessionAgentId
		})) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "sessionId does not belong to sessionKey"));
			return;
		}
	}
	const optionalModelCatalogLoad = startOptionalServerMethodModelCatalogSnapshotLoad(context, { agentId: sessionAgentId });
	const modelCatalogPromise = measureDiagnosticsTimelineSpan(`gateway.${method}.model_catalog`, () => loadOptionalServerMethodModelCatalogSnapshot(context, method, {
		logOnceKey: method,
		startedLoad: optionalModelCatalogLoad,
		timeoutMs: CHAT_OPTIONAL_MODEL_CATALOG_TIMEOUT_MS
	}), {
		config: cfg,
		phase: method
	});
	modelCatalogPromise.catch(() => void 0);
	const sessionId = requestedSessionId ?? entry?.sessionId;
	const historyEntry = requestedSessionId && requestedSessionId !== entry?.sessionId ? void 0 : entry;
	const resolvedSessionModel = resolveSessionModelRef(cfg, entry, sessionAgentId);
	const max = Math.min(CHAT_HISTORY_MAX_ENTRIES, typeof limit === "number" ? limit : 200);
	const maxHistoryBytes = getMaxChatHistoryMessagesBytes();
	const effectiveMaxChars = resolveEffectiveChatHistoryMaxChars(cfg, maxChars);
	let historyPage;
	try {
		historyPage = await measureDiagnosticsTimelineSpan(`gateway.${method}.history_page`, () => readChatHistoryPage({
			entry: historyEntry,
			provider: resolvedSessionModel.provider,
			sessionId,
			storePath,
			sessionAgentId,
			canonicalKey,
			max,
			maxHistoryBytes,
			effectiveMaxChars,
			offset,
			messageId
		}), {
			config: cfg,
			phase: method,
			attributes: {
				limit: max,
				hasMessageId: Boolean(messageId),
				hasOffset: offset !== void 0
			}
		});
	} catch (error) {
		if (!isSessionTranscriptProjectionUnavailableError(error)) throw error;
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "session history is rebuilding; retry shortly", {
			details: { method },
			retryable: true,
			retryAfterMs: 250
		}));
		return;
	}
	const normalized = enrichChatHistoryCompactionMarkers(historyPage.messages, historyEntry);
	const replaced = replaceOversizedChatHistoryMessages({
		messages: normalized,
		maxSingleMessageBytes: Math.min(CHAT_HISTORY_MAX_SINGLE_MESSAGE_BYTES, maxHistoryBytes)
	});
	scheduleChatHistoryManagedMediaCleanup({
		sessionKey,
		...selectedAgent.agentId ? { agentId: selectedAgent.agentId } : {},
		context
	});
	const capped = messageId ? capChatHistoryAroundMessage({
		messages: replaced.messages,
		messageId,
		fits: (messages) => jsonUtf8Bytes(messages) <= maxHistoryBytes
	}) ?? capArrayByJsonBytes(replaced.messages, maxHistoryBytes).items : capArrayByJsonBytes(replaced.messages, maxHistoryBytes).items;
	const bounded = enforceChatHistoryFinalBudget({
		messages: capped,
		maxBytes: maxHistoryBytes
	});
	const historyBudgetPreserved = replaced.replacedCount === 0 && capped.length === normalized.length && bounded.messages.length === capped.length && bounded.messages.every((message, index) => message === capped[index]);
	const pagination = historyPage.pagination;
	const candidateNextOffset = pagination === void 0 ? void 0 : resolveChatHistoryNextOffset({
		messages: bounded.messages,
		totalMessages: pagination.totalMessages,
		offset: pagination.offset,
		rawPageMessages: pagination.rawPageMessages,
		replayOldestRecord: shouldReplayOldestChatHistoryRecord({
			projected: normalized,
			bounded: bounded.messages
		})
	});
	const hasMore = pagination !== void 0 && candidateNextOffset !== void 0 ? pagination.exhausted !== true && candidateNextOffset < pagination.totalMessages : void 0;
	const nextOffset = hasMore ? candidateNextOffset : void 0;
	reportOmittedChatHistory({
		originalMessages: normalized,
		finalMessages: bounded.messages,
		getNormalizedBytes: () => jsonUtf8Bytes(normalized),
		maxHistoryBytes,
		logDebug: (message) => context.logGateway.debug(message)
	});
	const modelCatalogSnapshot = await modelCatalogPromise;
	const catalogOwnedBySessionAgent = modelCatalogSnapshot?.agentId === sessionAgentId;
	const catalogConfig = catalogOwnedBySessionAgent ? modelCatalogSnapshot.config : cfg;
	const modelCatalog = catalogOwnedBySessionAgent ? modelCatalogSnapshot.entries : void 0;
	const defaultAgentId = resolveDefaultAgentId(catalogConfig);
	let startupCatalogProjection;
	let startupMetadata;
	let startupAgentsList;
	if (method === "chat.startup") {
		const includeSystem = hasGatewayClientCap(client?.connect.caps, GATEWAY_CLIENT_CAPS.AGENT_KIND);
		const startupProjections = await measureDiagnosticsTimelineSpan(`gateway.${method}.startup_projections`, async () => {
			const catalogProjection = catalogOwnedBySessionAgent ? await buildChatStartupModelCatalogProjection({
				cfg: catalogConfig,
				snapshot: modelCatalogSnapshot,
				sessionAgentId,
				sessionEntry: entry,
				defaultAgentId,
				includeAgentsList: includeAgentsList === true
			}) : void 0;
			const metadata = includeMetadata && catalogOwnedBySessionAgent ? await buildMemoizedChatStartupMetadataResult({
				cfg: catalogConfig,
				context,
				agentId: sessionAgentId,
				modelCatalog: modelCatalogSnapshot,
				sessionEntry: entry,
				...catalogProjection ? { catalogProjector: catalogProjection.sessionCatalogProjector } : {}
			}) : void 0;
			return {
				agentsList: includeAgentsList ? catalogProjection && modelCatalog && modelCatalogSnapshot ? listMemoizedChatStartupAgents({
					cfg,
					context,
					includeSystem,
					catalogSnapshot: modelCatalogSnapshot,
					modelCatalog,
					modelCatalogByAgentId: catalogProjection.modelCatalogByAgentId
				}) : listAgentsForGateway(cfg, modelCatalog, { includeSystem }) : void 0,
				catalogProjection,
				metadata
			};
		}, {
			config: cfg,
			phase: method,
			attributes: {
				agentId: sessionAgentId,
				includeSystem
			}
		});
		startupCatalogProjection = startupProjections.catalogProjection;
		startupMetadata = startupProjections.metadata;
		startupAgentsList = startupProjections.agentsList;
	}
	const sessionModelCatalog = startupCatalogProjection?.sessionModelCatalog ?? modelCatalog;
	const defaultModelCatalog = startupCatalogProjection?.modelCatalogByAgentId.get(normalizeAgentId(defaultAgentId)) ?? modelCatalog;
	const sessionInfo = measureDiagnosticsTimelineSpanSync(`gateway.${method}.session_info`, () => buildGatewaySessionInfo({
		cfg,
		storePath,
		store,
		key: canonicalKey,
		entry,
		agentId: selectedAgent.agentId,
		modelCatalog: sessionModelCatalog
	}), {
		config: cfg,
		phase: method,
		attributes: { storeEntries: Object.keys(store).length }
	});
	const activeRunAgentId = canonicalKey === "global" ? selectedAgent.agentId ?? defaultAgentId : selectedAgent.agentId;
	const activeRunState = resolveVisibleActiveSessionRunState({
		context,
		requestedKey: sessionKey,
		canonicalKey,
		sessionId: entry?.sessionId,
		...activeRunAgentId ? { agentId: activeRunAgentId } : {},
		defaultAgentId
	});
	sessionInfo.hasActiveRun = activeRunState.active;
	sessionInfo.activeRunIds = activeRunState.runIds;
	if (Object.hasOwn(historyPage, "activeLeafEntryId")) sessionInfo.activeLeafEntryId = historyPage.activeLeafEntryId ?? null;
	const defaults = getSessionDefaults(cfg, defaultModelCatalog, { allowPluginNormalization: false });
	const thinkingLevel = sessionInfo.thinkingLevel ?? sessionInfo.thinkingDefault;
	const verboseLevel = entry?.verboseLevel ?? cfg.agents?.defaults?.verboseDefault;
	sessionInfo.verboseLevel = verboseLevel;
	const boundedInFlightRun = boundInFlightRunSnapshotForChatHistory({
		snapshot: resolveInFlightRunSnapshot({
			chatAbortControllers: context.chatAbortControllers,
			chatRunState: context.chatRunState,
			requestedSessionKey: sessionKey,
			canonicalSessionKey: resolveSessionStoreKey({
				cfg,
				sessionKey
			}),
			agentId: activeRunAgentId,
			defaultAgentId
		}),
		messages: bounded.messages,
		maxBytes: maxHistoryBytes
	});
	respond(true, {
		sessionKey,
		sessionId,
		messages: bounded.messages,
		...historyPage.responseOffset !== void 0 ? { offset: historyPage.responseOffset } : {},
		...hasMore ? { nextOffset } : {},
		...hasMore !== void 0 ? { hasMore } : {},
		...pagination !== void 0 ? { totalMessages: pagination.totalMessages } : {},
		...historyPage.completeCliImport && !hasMore && historyBudgetPreserved ? { completeSnapshot: true } : {},
		defaults,
		sessionInfo,
		thinkingLevel,
		fastMode: entry?.fastMode,
		toolOverrides: entry?.toolOverrides,
		verboseLevel,
		...boundedInFlightRun ? { inFlightRun: boundedInFlightRun } : {},
		...includeAgentsList && startupAgentsList ? { agentsList: startupAgentsList } : {},
		...startupMetadata ? { metadata: startupMetadata } : {}
	});
}
const chatHistoryHandlers = {
	"chat.history": async (opts) => {
		await handleChatHistoryRequest({
			...opts,
			method: "chat.history"
		});
	},
	"chat.startup": async (opts) => {
		await handleChatHistoryRequest({
			...opts,
			method: "chat.startup",
			includeAgentsList: true,
			includeMetadata: true
		});
	},
	"chat.metadata": handleChatMetadataRequest
};
//#endregion
//#region src/gateway/server-methods/chat-message-get-handler.ts
async function isChatMessageIdVisibleAfterHistoryFilters(params) {
	if (params.sessionStartedAt === void 0) return true;
	return dropPreSessionStartAnnouncePairs(await readSessionMessagesAsync({
		agentId: params.agentId,
		sessionEntry: params.sessionEntry,
		sessionId: params.sessionId,
		sessionKey: params.sessionKey,
		storePath: params.storePath
	}, {
		mode: "full",
		reason: "chat.message.get visibility",
		...params.allowResetArchiveFallback === true ? { allowResetArchiveFallback: true } : {}
	}), params.sessionStartedAt).some((message) => readChatHistoryMessageId(message) === params.messageId);
}
const chatMessageGetHandlers = { "chat.message.get": async ({ params, respond, context }) => {
	if (!assertValidParams(params, validateChatMessageGetParams, "chat.message.get", respond)) return;
	const { sessionKey, messageId, maxChars } = params;
	const agentIdOverride = normalizeOptionalChatText(params.agentId);
	const requestedAgentId = resolveRequestedChatAgentId({
		cfg: context.getRuntimeConfig?.(),
		requestedSessionKey: sessionKey,
		agentId: agentIdOverride
	});
	const { cfg, storePath, entry } = loadSessionEntryReadOnly(sessionKey, requestedAgentId ? { agentId: requestedAgentId } : void 0);
	const selectedAgent = validateChatSelectedAgent({
		cfg,
		requestedSessionKey: sessionKey,
		agentId: requestedAgentId
	});
	if (!selectedAgent.ok) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, selectedAgent.error));
		return;
	}
	const sessionId = entry?.sessionId;
	if (!sessionId) {
		respond(true, {
			ok: false,
			unavailableReason: "not_found"
		});
		return;
	}
	const sessionAgentId = resolveSessionAgentId({
		sessionKey,
		config: cfg,
		agentId: selectedAgent.agentId
	});
	const resolved = await readSessionMessageByIdAsync({
		agentId: sessionAgentId,
		sessionEntry: entry,
		sessionId,
		sessionKey,
		storePath
	}, messageId, { allowResetArchiveFallback: true });
	if (!resolved.found) {
		respond(true, {
			ok: false,
			unavailableReason: "not_found"
		});
		return;
	}
	if (!await isChatMessageIdVisibleAfterHistoryFilters({
		sessionId,
		storePath,
		sessionEntry: entry,
		sessionKey,
		agentId: sessionAgentId,
		messageId,
		sessionStartedAt: typeof entry?.sessionStartedAt === "number" ? entry.sessionStartedAt : void 0,
		allowResetArchiveFallback: true
	})) {
		respond(true, {
			ok: false,
			unavailableReason: "not_found"
		});
		return;
	}
	if (resolved.oversized) {
		respond(true, {
			ok: false,
			unavailableReason: "oversized"
		});
		return;
	}
	const effectiveMaxChars = typeof maxChars === "number" ? maxChars : Math.min(MAX_PAYLOAD_BYTES, 1e6);
	const projectedMessage = resolved.message ? projectChatDisplayMessage(resolved.message, { maxChars: effectiveMaxChars }) : void 0;
	const projected = projectedMessage ? augmentChatHistoryWithCanvasBlocks([projectedMessage])[0] : void 0;
	if (!projected) {
		respond(true, {
			ok: false,
			unavailableReason: "not_visible"
		});
		return;
	}
	respond(true, {
		ok: true,
		message: projected
	});
} };
//#endregion
//#region src/gateway/server-methods/chat.ts
const chatHandlers = {
	...chatHistoryHandlers,
	...chatMessageGetHandlers,
	"chat.toolTitles": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateChatToolTitlesParams, "chat.toolTitles", respond)) return;
		const cfg = context.getRuntimeConfig();
		if (cfg.gateway?.controlUi?.toolTitles !== true) {
			respond(true, {
				titles: {},
				disabled: true
			});
			return;
		}
		const agentIdOverride = normalizeOptionalChatText(params.agentId);
		const requestedAgentId = resolveRequestedChatAgentId({
			cfg,
			requestedSessionKey: params.sessionKey,
			agentId: agentIdOverride
		});
		const selectedAgent = validateChatSelectedAgent({
			cfg,
			requestedSessionKey: params.sessionKey,
			agentId: requestedAgentId
		});
		if (!selectedAgent.ok) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, selectedAgent.error));
			return;
		}
		const sessionAgentId = resolveSessionAgentId({
			sessionKey: params.sessionKey,
			config: cfg,
			agentId: selectedAgent.agentId
		});
		const { cfg: sessionCfg, entry } = loadSessionEntryReadOnly(params.sessionKey, selectedAgent.agentId ? { agentId: selectedAgent.agentId } : void 0);
		const sessionModel = resolveSessionModelRef(sessionCfg, entry, sessionAgentId);
		const { generateToolCallTitles } = await import("./chat-tool-titles-Z1sFUIjL.js");
		respond(true, { titles: await generateToolCallTitles({
			cfg: sessionCfg,
			agentId: sessionAgentId,
			sessionPrimaryProvider: sessionModel.provider,
			sessionAuthProfile: entry?.authProfileOverride?.trim() || void 0,
			items: params.items
		}) });
	},
	"chat.abort": handleChatAbortRequest,
	"chat.send": handleChatSend,
	"chat.inject": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateChatInjectParams, "chat.inject", respond)) return;
		const p = params;
		const rawSessionKey = p.sessionKey;
		const requestedAgentId = resolveRequestedChatAgentId({
			cfg: context.getRuntimeConfig?.(),
			requestedSessionKey: rawSessionKey,
			agentId: p.agentId
		});
		const sessionLoadOptions = requestedAgentId ? { agentId: requestedAgentId } : void 0;
		const { cfg, storePath, entry, canonicalKey: sessionKey } = loadSessionEntry(rawSessionKey, sessionLoadOptions);
		const selectedAgent = validateChatSelectedAgent({
			cfg,
			requestedSessionKey: rawSessionKey,
			agentId: requestedAgentId
		});
		if (!selectedAgent.ok) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, selectedAgent.error));
			return;
		}
		const sessionId = entry?.sessionId;
		if (!sessionId || !storePath) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "session not found"));
			return;
		}
		const agentId = resolveSessionAgentId({
			sessionKey,
			config: cfg,
			agentId: selectedAgent.agentId
		});
		let appended;
		try {
			const admission = await beginSessionWorkAdmission({
				scope: storePath,
				identities: [sessionKey, sessionId],
				assertAllowed: () => {
					const latestEntry = loadSessionEntry(rawSessionKey, sessionLoadOptions).entry;
					if (!latestEntry) throw new Error(`Session "${sessionKey}" was deleted while starting work. Retry.`);
					if (latestEntry.sessionId !== sessionId) throw new Error(`Session "${sessionKey}" changed while starting work. Retry.`);
					const archivedError = resolveSessionWorkStartError(sessionKey, latestEntry);
					if (archivedError) throw new Error(archivedError);
				}
			});
			try {
				appended = await admission.run(async () => await appendAssistantTranscriptMessage({
					sessionKey,
					message: p.message,
					label: p.label,
					sessionId,
					storePath,
					agentId,
					createIfMissing: true,
					cfg
				}));
			} finally {
				admission.release();
			}
		} catch (err) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, formatForLog(err)));
			return;
		}
		if (!appended.ok || !appended.messageId || !appended.message) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `failed to write transcript: ${appended.error ?? "unknown error"}`));
			return;
		}
		const message = projectChatDisplayMessage(appended.message, { maxChars: resolveEffectiveChatHistoryMaxChars(cfg) });
		const chatPayload = {
			runId: `inject-${appended.messageId}`,
			sessionKey,
			...sessionKey === "global" && agentId ? { agentId } : {},
			seq: 0,
			state: "final",
			message
		};
		context.broadcast("chat", chatPayload, { sessionKeys: sessionKey === "global" && agentId ? [`agent:${agentId}:global`] : [sessionKey] });
		sendGlobalAwareNodeChatPayload({
			context,
			sessionKey,
			agentId,
			event: "chat",
			payload: chatPayload
		});
		respond(true, {
			ok: true,
			messageId: appended.messageId
		});
	}
};
//#endregion
export { enforceChatHistoryFinalBudget as a, CHAT_HISTORY_MAX_SINGLE_MESSAGE_BYTES as i, enrichChatHistoryCompactionMarkers as n, replaceOversizedChatHistoryMessages as o, readChatHistoryPage as r, reportOmittedChatHistory as s, chatHandlers as t };
