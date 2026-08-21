import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { M as resolveTimestampMsToIsoString, s as asFiniteNumber } from "./number-coercion-Crk_c9KW.js";
import { i as asOptionalRecord, o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { h as syncDirectoryBestEffortSync } from "./pinned-write-CO4XA8tE.js";
import { a as hasErrnoCode } from "./errors-Cg_yT1Sv.js";
import { r as resolveGlobalSet } from "./global-singleton-Dc_stLtU.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { t as isIncognitoSessionKey } from "./incognito-session-key-BwpD1Lwd.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { r as getRuntimeConfig } from "./io-BsQc3Kgy.js";
import { i as getChildLogger } from "./logger-Cv9z4NYi.js";
import { c as runSqliteDeferredTransactionSync, h as getNodeSqliteKysely, m as executeSqliteQueryTakeFirstSync, p as executeSqliteQuerySync } from "./node-sqlite-B_0DgpUE.js";
import "./directory-durability-BjsbsQ47.js";
import { _ as runOpenClawAgentWriteTransaction, h as openOpenClawAgentDatabase, it as resolveOpenClawAgentSqlitePath, nt as isIncognitoOpenClawAgentSqlitePath, rt as resolveIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db-DemdumbZ.js";
import { c as normalizeSessionDeliveryState } from "./delivery-context.shared-DR6KpKlV.js";
import { a as resolveStoredSessionOwnerAgentId } from "./session-store-key-DmGCpash.js";
import { C as SESSION_ARCHIVE_ZSTD_SUFFIX, D as readSessionArchiveContentSync, T as encodeSessionArchiveContent, f as formatSessionArchiveTimestamp, l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { t as withOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-BTRgYEmB.js";
import { n as projectCanonicalSessionEntryShape } from "./store-entry-shape-CTwpu-C_.js";
import { A as sqliteSessionEntriesEqual, B as touchTranscriptMutationInTransaction, C as readSqliteLifecycleTargetSnapshot, D as readSqliteSessionIdentitySnapshot, E as readSqliteSessionEntryStore, G as bindSqliteSessionWindowEntryProjection, H as assertCanonicalSqliteSessionKeysCurrent, J as collectSqliteSessionStateIdsForEntry, K as createFallbackSessionEntry, L as readTranscriptGenerationInTransaction, M as advanceTranscriptMutationAtInTransaction, O as rehomeSqliteSessionWindows, S as readSessionEntryRow, T as readSqliteSessionEntrySelectionSnapshot, U as canonicalSessionKeyMigrationRequiredError, V as assertCanonicalSessionKeyWrite, X as deleteSessionMembersForRepair, Y as copySessionNodeArtifactsForRepair, _ as deleteSqliteSessionEntryRows, at as deriveSessionMetaPatch, b as readExactSessionEntryRow, d as assertSqliteLifecycleTargetSnapshotUnchanged, et as publishSqliteSessionEntryCacheInvalidation, f as assertSqliteLifecycleTargetUnchanged, g as deleteSqliteLifecycleTargetRows, h as deleteLegacySessionEntryRows, it as deriveLastRoutePatch, j as writeSessionEntry, k as resolveSqliteLifecyclePrimaryEntry, m as createSqliteSessionIdentitySnapshot, nt as parseSqliteSessionEntryJson, p as assertSqliteSessionEntrySelectionUnchanged, q as normalizeSqliteNumber, rt as readSqliteSessionEntriesByStatus, tt as readSqliteSessionEntryCache, v as normalizeSqliteLifecycleTarget, w as readSqliteSessionEntryCount, x as readExactSessionEntryRowValidated, y as readExactSessionEntryJsonForCanonicalRepair } from "./targets-Bz-meSET.js";
import { a as normalizeStoreSessionKey, l as runQueuedStoreWrite, o as resolveDeliveryProvenCanonicalSessionKey, t as collectSessionEntryLookupKeys } from "./store-entry-DWPp52Lz.js";
import { a as normalizeSqliteSessionKey, c as resolveSqliteStoreScope, d as resolveSqliteTranscriptScope, f as runExclusiveSqliteSessionWrite, i as getSessionKysely, l as resolveSqliteTranscriptArchiveDirectory, n as formatLegacySqliteSessionMarkerForScope, o as resolveSqliteReadScope, p as toDatabaseOptions, r as formatSqliteSessionReferenceForScope, s as resolveSqliteScope, t as cloneSessionEntry, u as resolveSqliteTranscriptReadScope } from "./session-accessor.sqlite-scope-G-CS03gJ.js";
import { C as selectSessionTranscriptTreePathNodes, S as selectSessionTranscriptLeafControlledPath, a as reconcileSessionTranscriptIndexInTransaction, b as scanSessionTranscriptTree, h as isSessionTranscriptLeafControl, n as deleteSessionTranscriptIndexInTransaction, v as mergeSessionTranscriptVisiblePathWithOpaqueAppendPath } from "./session-transcript-index-NEbbnqMc.js";
import { n as extractAssistantVisibleText } from "./chat-message-content-DwX2R88T.js";
import { A as readTranscriptEventMessage, E as readSqliteTranscriptSnapshot, T as readSqliteTranscriptEventRows, a as readMessageIdempotencyKey, b as loadSqliteTranscriptEventsFromDatabase, c as readTranscriptMessageByScopedIdempotencyKey, d as rewriteSqliteTranscriptEventRowsInTransaction, i as readActiveTranscriptAppendParentId, k as readTranscriptEventJsonSetInTransaction, l as redactTranscriptMessageForStorage, n as appendTranscriptEventsInTransaction, o as readTranscriptIdentityByEventId, p as createSessionTranscriptHeader, r as ensureTranscriptHeader, s as readTranscriptMessageByEventId, t as appendTranscriptEventInTransaction, u as replaceSqliteTranscriptEventsInTransaction } from "./session-accessor.sqlite-transcript-store-BCfOcQgE.js";
import { A as resolveFreshSessionTotalTokens, C as resolveAgentHarnessSessionStoreTransitionError, D as mergeSessionEntry, G as pruneStaleEntries, H as capEntryCount, I as hasRetainedSessionTranscriptArchives, K as pruneStaleModelRunEntries, L as measureSessionPhysicalDiskUsage, N as resolveSessionTotalTokens, O as mergeSessionEntryPreserveActivity, R as pruneSessionTranscriptArchivesToHighWater, S as resolveAgentHarnessSessionStoreError, V as resolveMaintenanceConfig, X as shouldRunModelRunPrune, Y as shouldPreserveMaintenanceEntry, Z as shouldRunSessionEntryMaintenance, at as collectSessionMaintenancePreserveKeys, dt as collectActiveSessionWorkAdmissionIdentities, h as isAgentHarnessSessionKey, m as MODEL_SELECTION_LOCK_REMOVAL_MESSAGE, ot as collectSessionMaintenancePreserveKeysForStore, s as mergeRestartRecoveryTerminalRunIds, u as sameRestartRecoveryTerminalRunIds, v as isValidAgentHarnessSessionStoreEntry, x as resolveAgentHarnessSessionStoreEntryError, xt as runExclusiveSessionLifecycleMutation } from "./session-entry-slot-keys-DPRQmSpa.js";
import { t as emitSessionTranscriptUpdate } from "./transcript-events-BG9Ai61T.js";
import crypto, { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { sql } from "kysely";
import readline from "node:readline";
//#region src/config/sessions/internal-session-key.ts
const INTERNAL_SESSION_EFFECTS_SEGMENT = "internal-session-effects";
function normalizeInternalRunId(runId) {
	return `${runId.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 48) || "run"}-${crypto.createHash("sha256").update(runId).digest("hex").slice(0, 16)}`;
}
/** Resolves the hidden SQLite session identity owned by one internal-effects run. */
function resolveInternalSessionEffectsIdentity(params) {
	const suffix = normalizeInternalRunId(params.runId);
	const keySuffix = params.incognito ? `incognito-${suffix}` : suffix.startsWith("incognito-") ? `legacy-${suffix}` : suffix;
	return {
		sessionId: `${INTERNAL_SESSION_EFFECTS_SEGMENT}-${suffix}`,
		sessionKey: `agent:${normalizeAgentId(params.agentId)}:${INTERNAL_SESSION_EFFECTS_SEGMENT}:${keySuffix}`
	};
}
/** Returns true for SQLite entries that exist only to contain suppressed run effects. */
function isInternalSessionEffectsKey(sessionKey) {
	const parts = sessionKey.split(":");
	return parts.length >= 4 && parts[0] === "agent" && parts[2] === INTERNAL_SESSION_EFFECTS_SEGMENT;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-history.ts
function listSqliteTranscriptInstancesFromDatabase(params) {
	const db = getNodeSqliteKysely(params.database.db);
	return executeSqliteQuerySync(params.database.db, db.selectFrom("session_windows").select([
		"session_id",
		"session_key",
		"transcript_updated_at",
		"session_entry_provenance",
		"acp_owned",
		"plugin_owner_id",
		"hook_external_content_source",
		"parent_session_key",
		"spawned_by",
		"chat_type"
	]).where("transcript_updated_at", "is not", null).orderBy("transcript_updated_at", "desc").orderBy("session_id", "asc")).rows.map((row) => {
		if (isInternalSessionEffectsKey(row.session_key) || row.transcript_updated_at === null) return;
		const updatedAtMs = row.transcript_updated_at;
		const current = params.currentEntries.get(row.session_key);
		const currentIsExact = current?.sessionId === row.session_id;
		const provenanceKnown = row.session_entry_provenance === 1;
		const hookExternalContentSource = row.hook_external_content_source === "gmail" || row.hook_external_content_source === "webhook" ? row.hook_external_content_source : void 0;
		const chatType = row.chat_type === "direct" || row.chat_type === "group" || row.chat_type === "channel" ? row.chat_type : void 0;
		const entry = {
			...currentIsExact && current ? structuredClone(current) : {},
			sessionId: row.session_id,
			updatedAt: updatedAtMs,
			...row.parent_session_key ? { parentSessionKey: row.parent_session_key } : {},
			...row.spawned_by ? {
				spawnedBy: row.spawned_by,
				spawnDepth: 1
			} : {},
			...chatType ? { chatType } : {},
			...provenanceKnown && row.plugin_owner_id ? { pluginOwnerId: row.plugin_owner_id } : {},
			...provenanceKnown && hookExternalContentSource ? { hookExternalContentSource } : {}
		};
		return {
			acpOwned: row.acp_owned === 1 || Boolean(currentIsExact && current?.acp),
			entry,
			provenanceKnown,
			sessionId: row.session_id,
			sessionKey: row.session_key,
			updatedAtMs
		};
	}).filter((entry) => entry !== void 0);
}
//#endregion
//#region src/sessions/session-lifecycle-events.ts
/** Session lifecycle event broadcast to observers when a session is created or linked. */
const SESSION_LIFECYCLE_LISTENERS = resolveGlobalSet(Symbol.for("openclaw.sessionLifecycleEventListeners"), "close-and-restart");
const SESSION_IDENTITY_MUTATION_LISTENERS = resolveGlobalSet(Symbol.for("openclaw.sessionIdentityMutationListeners"), "close-and-restart");
/** Registers a session lifecycle listener. */
function onSessionLifecycleEvent(listener) {
	SESSION_LIFECYCLE_LISTENERS.add(listener);
	return () => {
		SESSION_LIFECYCLE_LISTENERS.delete(listener);
	};
}
/** Emits a best-effort session lifecycle event to all listeners. */
function emitSessionLifecycleEvent(event) {
	for (const listener of SESSION_LIFECYCLE_LISTENERS) try {
		listener(event);
	} catch {}
}
function onSessionIdentityMutation(listener) {
	SESSION_IDENTITY_MUTATION_LISTENERS.add(listener);
	return () => {
		SESSION_IDENTITY_MUTATION_LISTENERS.delete(listener);
	};
}
function emitSessionIdentityMutation(mutation) {
	for (const listener of SESSION_IDENTITY_MUTATION_LISTENERS) try {
		listener(mutation);
	} catch {}
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-identity.ts
function toSessionIdentityTarget(entry, sessionKeys) {
	const sessionId = normalizeOptionalString(entry?.sessionId);
	return {
		...sessionId ? { sessionId } : {},
		sessionKeys
	};
}
function emitCommittedSessionEntryRemoval(sessionKey, entry) {
	emitSessionIdentityMutation({
		kind: "delete",
		previous: toSessionIdentityTarget(entry, [sessionKey])
	});
}
function emitCommittedSessionEntryRemovals(removals) {
	const emittedKeys = /* @__PURE__ */ new Set();
	for (const removal of removals) {
		if (emittedKeys.has(removal.sessionKey)) continue;
		emittedKeys.add(removal.sessionKey);
		emitCommittedSessionEntryRemoval(removal.sessionKey, removal.expectedEntry);
	}
}
function emitCommittedSessionEntryChange(params) {
	const previous = toSessionIdentityTarget(params.previousEntry, [params.previousKey]);
	const current = toSessionIdentityTarget(params.currentEntry, [params.currentKey]);
	const moved = params.previousKey !== params.currentKey;
	if (!moved && previous.sessionId === current.sessionId) return;
	emitSessionIdentityMutation({
		kind: moved ? "move" : "replace",
		previous,
		current
	});
}
function emitCommittedSessionIdentityDiff(previous, current) {
	const currentKeysBySessionId = /* @__PURE__ */ new Map();
	for (const [sessionKey, entry] of current) {
		const sessionId = normalizeOptionalString(entry.sessionId);
		if (sessionId) currentKeysBySessionId.set(sessionId, [...currentKeysBySessionId.get(sessionId) ?? [], sessionKey]);
	}
	const movedKeysByCurrentKey = /* @__PURE__ */ new Map();
	const handledPreviousKeys = /* @__PURE__ */ new Set();
	const handledCurrentKeys = /* @__PURE__ */ new Set();
	for (const [sessionKey, entry] of previous) {
		if (current.has(sessionKey)) continue;
		const sessionId = normalizeOptionalString(entry.sessionId);
		const currentKeys = sessionId ? currentKeysBySessionId.get(sessionId) : void 0;
		if (currentKeys?.length !== 1) continue;
		const [currentKey] = currentKeys;
		if (!currentKey) continue;
		movedKeysByCurrentKey.set(currentKey, [...movedKeysByCurrentKey.get(currentKey) ?? [], sessionKey]);
		handledPreviousKeys.add(sessionKey);
		handledCurrentKeys.add(currentKey);
	}
	for (const [currentKey, previousKeys] of movedKeysByCurrentKey) {
		const currentEntry = current.get(currentKey);
		if (currentEntry) emitSessionIdentityMutation({
			kind: "move",
			previous: toSessionIdentityTarget(currentEntry, previousKeys),
			current: toSessionIdentityTarget(currentEntry, [currentKey])
		});
	}
	for (const [sessionKey, previousEntry] of previous) {
		const currentEntry = current.get(sessionKey);
		if (currentEntry) {
			handledCurrentKeys.add(sessionKey);
			emitCommittedSessionEntryChange({
				currentEntry,
				currentKey: sessionKey,
				previousEntry,
				previousKey: sessionKey
			});
		} else if (!handledPreviousKeys.has(sessionKey)) emitCommittedSessionEntryRemoval(sessionKey, previousEntry);
	}
	for (const [sessionKey, currentEntry] of current) {
		if (handledCurrentKeys.has(sessionKey)) continue;
		emitSessionIdentityMutation({
			kind: "create",
			previous: { sessionKeys: [] },
			current: toSessionIdentityTarget(currentEntry, [sessionKey])
		});
	}
}
function emitCommittedLifecycleIdentityMutations(params) {
	const removedKeys = new Set(params.removedSessionKeys);
	const previous = new Map(params.projected.removals.filter((removal) => removedKeys.has(removal.sessionKey)).map((removal) => [removal.sessionKey, removal.expectedEntry]));
	const current = /* @__PURE__ */ new Map();
	for (const upsert of params.projected.upsertedEntries) {
		if (!current.has(upsert.sessionKey) && upsert.expectedEntry) previous.set(upsert.sessionKey, upsert.expectedEntry);
		current.set(upsert.sessionKey, upsert.entry);
	}
	emitCommittedSessionIdentityDiff(previous, current);
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-archive.ts
function resolveSqliteTranscriptArchivePath(params) {
	const archiveDirectory = path.resolve(params.archiveDirectory);
	const archivePath = path.resolve(archiveDirectory, `${params.sessionId}.jsonl.${params.reason}.${formatSessionArchiveTimestamp(params.nowMs)}`);
	if (path.dirname(archivePath) !== archiveDirectory) throw new Error(`Cannot archive SQLite transcript outside ${archiveDirectory}`);
	return archivePath;
}
function findMatchingSqliteTranscriptArchive(params) {
	let entries;
	try {
		entries = fs.readdirSync(params.archiveDirectory);
	} catch {
		return null;
	}
	const prefix = `${params.sessionId}.jsonl.${params.reason}.`;
	for (const entry of entries) {
		if (!entry.startsWith(prefix)) continue;
		const archivePath = path.join(params.archiveDirectory, entry);
		const compressed = entry.endsWith(SESSION_ARCHIVE_ZSTD_SUFFIX);
		try {
			const stat = fs.statSync(archivePath);
			if (!stat.isFile()) continue;
			if (!compressed && stat.size !== Buffer.byteLength(params.content, "utf8")) continue;
			if (readSessionArchiveContentSync(archivePath) === params.content) return archivePath;
		} catch {
			continue;
		}
	}
	return null;
}
/** Writes or reuses a transcript archive and returns its durable path. */
function writeSqliteTranscriptArchive(params) {
	fs.mkdirSync(params.archiveDirectory, { recursive: true });
	const existing = findMatchingSqliteTranscriptArchive(params);
	if (existing) return existing;
	const encoded = encodeSessionArchiveContent(params.content);
	for (let attempt = 0; attempt < 10; attempt += 1) {
		const archivePath = `${resolveSqliteTranscriptArchivePath({
			archiveDirectory: params.archiveDirectory,
			reason: params.reason,
			sessionId: params.sessionId,
			nowMs: Date.now() + attempt
		})}${encoded.suffix}`;
		if (fs.existsSync(archivePath)) continue;
		const tempPath = `${archivePath}.${randomUUID()}.tmp`;
		try {
			writeDurableFileExclusive(tempPath, encoded.bytes);
			fs.renameSync(tempPath, archivePath);
			syncDirectoryBestEffortSync(params.archiveDirectory);
			if (readSessionArchiveContentSync(archivePath) !== params.content) {
				fs.rmSync(archivePath, { force: true });
				throw new Error(`SQLite transcript archive verification failed for ${params.sessionId}`);
			}
			return archivePath;
		} catch (error) {
			fs.rmSync(tempPath, { force: true });
			if (error?.code === "EEXIST") continue;
			throw error;
		}
	}
	throw new Error(`Could not create SQLite transcript archive for ${params.sessionId}`);
}
function writeDurableFileExclusive(filePath, content) {
	const fd = fs.openSync(filePath, "wx", 384);
	try {
		fs.writeFileSync(fd, content);
		fs.fsyncSync(fd);
	} finally {
		fs.closeSync(fd);
	}
}
function materializeSqliteSessionStateDeletePlans(plans) {
	return dedupeSqliteSessionStateDeletePlans(plans).map((plan) => {
		const archivedTranscript = plan.archiveTranscript && plan.content.length > 0 ? {
			archivedPath: writeSqliteTranscriptArchive({
				archiveDirectory: plan.archiveDirectory,
				content: plan.content,
				reason: plan.reason,
				sessionId: plan.sessionId
			}),
			sourcePath: path.join(plan.archiveDirectory, `${plan.sessionId}.jsonl`)
		} : null;
		return Object.assign({}, plan, { archivedTranscript });
	});
}
function dedupeSqliteSessionStateDeletePlans(plans) {
	const deduped = /* @__PURE__ */ new Map();
	for (const plan of plans) {
		const existing = deduped.get(plan.sessionId);
		if (!existing) {
			deduped.set(plan.sessionId, plan);
			continue;
		}
		if (existing.content !== plan.content || existing.reason !== plan.reason) throw new Error(`Conflicting SQLite transcript archive plans for ${plan.sessionId}`);
		if (!existing.archiveTranscript && plan.archiveTranscript) deduped.set(plan.sessionId, {
			...existing,
			archiveTranscript: true
		});
	}
	return [...deduped.values()];
}
function isValidReplayTimestamp(value) {
	if (typeof value === "number") return Number.isFinite(value);
	return typeof value === "string" && value.trim().length > 0;
}
function replayableTranscriptRole(record) {
	if (!record || record.type !== "message" || typeof record.id !== "string" || record.id.trim().length === 0 || !isValidReplayTimestamp(record.timestamp) || !(record.parentId === null || record.parentId === void 0 || typeof record.parentId === "string")) return;
	const role = record.message?.role;
	return role === "user" || role === "assistant" ? role : void 0;
}
function selectRecentUserAssistantReplayRecords(records, maxMessages = 6) {
	const max = Math.max(0, maxMessages);
	if (max === 0) return [];
	const kept = [];
	for (const record of records) {
		const role = replayableTranscriptRole(record);
		if (role) kept.push({
			role,
			record
		});
	}
	return selectAlternatingReplayTail(kept, max).map((entry) => entry.record);
}
function selectAlternatingReplayTail(kept, max) {
	if (kept.length === 0) return [];
	let startIdx = Math.max(0, kept.length - max);
	while (startIdx < kept.length && kept[startIdx]?.role === "assistant") startIdx += 1;
	if (startIdx === kept.length) return [];
	return coalesceAlternatingReplayTail(kept.slice(startIdx));
}
function coalesceAlternatingReplayTail(entries) {
	const tail = [];
	for (const entry of entries) {
		const lastIdx = tail.length - 1;
		if (lastIdx >= 0 && tail[lastIdx]?.role === entry.role) {
			tail[lastIdx] = entry;
			continue;
		}
		tail.push(entry);
	}
	return tail;
}
//#endregion
//#region src/config/sessions/file-range.ts
async function readFileRangeAsync(fileHandle, position, length) {
	const buffer = Buffer.alloc(length);
	let offset = 0;
	while (offset < length) {
		const { bytesRead } = await fileHandle.read(buffer, offset, length - offset, position + offset);
		if (bytesRead <= 0) break;
		offset += bytesRead;
	}
	return offset === length ? buffer : buffer.subarray(0, offset);
}
//#endregion
//#region src/config/sessions/transcript-stream.ts
const DEFAULT_REVERSE_CHUNK_BYTES = 64 * 1024;
const MAX_REVERSE_CHUNK_BYTES = 1024 * 1024;
const MIN_REVERSE_CHUNK_BYTES = 1024;
/**
* Stream the non-empty, trimmed JSONL lines of a transcript file in order.
*
* Returns an empty async iterator if the file does not exist, is empty, or is
* not a regular file. Honours `options.signal` between lines so long scans can
* cooperate with abort signals.
*/
async function* streamSessionTranscriptLines(filePath, options = {}) {
	let stat;
	try {
		stat = await fs.promises.stat(filePath);
	} catch (error) {
		if (hasErrnoCode(error, "ENOENT")) return;
		throw error;
	}
	if (!stat.isFile() || stat.size <= 0) return;
	if (options.signal?.aborted) return;
	const stream = fs.createReadStream(filePath, { encoding: "utf-8" });
	const rl = readline.createInterface({
		input: stream,
		crlfDelay: Infinity
	});
	try {
		for await (const line of rl) {
			if (options.signal?.aborted) return;
			const trimmed = line.trim();
			if (!trimmed) continue;
			yield trimmed;
		}
	} finally {
		rl.close();
		stream.destroy();
	}
}
/**
* Stream the non-empty, trimmed JSONL lines of a transcript file in reverse
* (newest-first) order.
*
* Returns an empty async iterator if the file does not exist, is empty, or is
* not a regular file. The implementation splits on newline bytes before UTF-8
* decoding so multibyte characters survive arbitrary chunk boundaries.
*/
async function* streamSessionTranscriptLinesReverse(filePath, options = {}) {
	const requestedChunkBytes = Number.isFinite(options.chunkBytes) ? Math.max(MIN_REVERSE_CHUNK_BYTES, Math.floor(options.chunkBytes)) : DEFAULT_REVERSE_CHUNK_BYTES;
	const chunkBytes = Math.min(requestedChunkBytes, MAX_REVERSE_CHUNK_BYTES);
	let fileHandle;
	try {
		fileHandle = await fs.promises.open(filePath, "r");
	} catch (error) {
		if (hasErrnoCode(error, "ENOENT")) return;
		throw error;
	}
	try {
		const stat = await fileHandle.stat();
		if (!stat.isFile() || stat.size <= 0 || options.signal?.aborted) return;
		let position = stat.size;
		let carry = Buffer.alloc(0);
		while (position > 0) {
			if (options.signal?.aborted) return;
			const readLength = Math.min(position, chunkBytes);
			position -= readLength;
			const chunk = await readFileRangeAsync(fileHandle, position, readLength);
			const combined = carry.length > 0 ? Buffer.concat([chunk, carry]) : chunk;
			let lineEnd = combined.length;
			for (let index = combined.length - 1; index >= 0; index -= 1) {
				if (combined[index] !== 10) continue;
				const line = decodeTrimmedLine(combined.subarray(index + 1, lineEnd));
				if (line) {
					yield line;
					if (options.signal?.aborted) return;
				}
				lineEnd = index;
			}
			carry = combined.subarray(0, lineEnd);
		}
		const firstLine = decodeTrimmedLine(carry);
		if (firstLine && !options.signal?.aborted) yield firstLine;
	} finally {
		await fileHandle.close().catch(() => void 0);
	}
}
function decodeTrimmedLine(line) {
	return line.toString("utf-8").trim();
}
//#endregion
//#region src/config/sessions/session-reset-boundary-event.ts
function recordId(record) {
	if (!record || typeof record !== "object" || Array.isArray(record)) return;
	const id = record.id;
	return typeof id === "string" && id.trim() ? id : void 0;
}
function uniqueBoundaryId(records) {
	const ids = new Set(records.flatMap((record) => recordId(record) ? [recordId(record)] : []));
	for (;;) {
		const id = randomUUID().slice(0, 8);
		if (!ids.has(id)) return id;
	}
}
function projectLatestBoundaryWindow(entries) {
	const boundaryIndex = entries.findLastIndex((entry) => {
		const type = entry && typeof entry === "object" && !Array.isArray(entry) ? entry.type : void 0;
		return type === "compaction" || type === "reset";
	});
	if (boundaryIndex < 0) return [...entries];
	const boundary = entries[boundaryIndex];
	const firstKeptIndex = typeof boundary.firstKeptEntryId === "string" ? entries.findIndex((entry, index) => index < boundaryIndex && recordId(entry) === boundary.firstKeptEntryId) : -1;
	return [...firstKeptIndex < 0 ? [] : entries.slice(firstKeptIndex, boundaryIndex).filter((entry) => {
		const role = entry?.message?.role;
		return role === "user" || role === "assistant";
	}), ...entries.slice(boundaryIndex + 1)];
}
function buildSessionResetBoundaryEvent(params) {
	const entries = params.events.filter((event) => event !== null && typeof event === "object" && !Array.isArray(event) && event.type !== "session");
	const activeEntries = selectSessionTranscriptLeafControlledPath(entries) ?? entries;
	const firstKeptEntryId = recordId(selectRecentUserAssistantReplayRecords(projectLatestBoundaryWindow(activeEntries))[0]);
	return {
		type: "reset",
		id: uniqueBoundaryId(params.events),
		parentId: recordId(activeEntries.at(-1)) ?? null,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		reason: params.reason,
		...firstKeptEntryId ? { firstKeptEntryId } : {}
	};
}
async function readLegacyTranscriptEvents(sessionFile) {
	const filePath = sessionFile?.trim();
	if (!filePath || !path.isAbsolute(filePath) || !filePath.endsWith(".jsonl")) return [];
	try {
		const newestFirst = [];
		let boundaryFirstKeptEntryId;
		let foundBoundary = false;
		for await (const line of streamSessionTranscriptLinesReverse(filePath)) {
			let record;
			try {
				record = JSON.parse(line);
			} catch {
				continue;
			}
			const type = record && typeof record === "object" && !Array.isArray(record) ? record.type : void 0;
			if (!foundBoundary && (type === "reset" || type === "compaction")) {
				foundBoundary = true;
				const firstKept = record.firstKeptEntryId;
				boundaryFirstKeptEntryId = typeof firstKept === "string" && firstKept.trim() ? firstKept : void 0;
				if (!boundaryFirstKeptEntryId) break;
				continue;
			}
			if (foundBoundary && (type === "reset" || type === "compaction")) break;
			if (replayableTranscriptRole(record)) newestFirst.push(record);
			if (newestFirst.length >= 6 || foundBoundary && recordId(record) === boundaryFirstKeptEntryId) break;
		}
		const selected = selectRecentUserAssistantReplayRecords(newestFirst.toReversed());
		return selected.map((record, index) => Object.assign({}, record, { parentId: index === 0 ? null : recordId(selected[index - 1]) ?? null }));
	} catch {
		return [];
	}
}
async function buildSessionResetBoundaryPlan(params) {
	const seedEvents = (params.events.some((event) => {
		const type = event !== null && typeof event === "object" && !Array.isArray(event) ? event.type : void 0;
		return type === "message" || type === "compaction" || type === "reset";
	}) ? [] : await readLegacyTranscriptEvents(params.legacySessionFile)).filter((event) => event !== null && typeof event === "object" && !Array.isArray(event) && event.type !== "session");
	return {
		event: buildSessionResetBoundaryEvent({
			events: seedEvents.length > 0 ? [...params.events, ...seedEvents] : params.events,
			reason: params.reason
		}),
		seedEvents
	};
}
//#endregion
//#region src/config/sessions/transcript-jsonl.ts
function serializeJsonlLines(lines) {
	return lines.length > 0 ? `${lines.join("\n")}\n` : "";
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-lifecycle-state.ts
function shouldRemoveSqliteSessionEntry(entry, removal) {
	if (!entry) return false;
	if (removal.expectedEntry !== void 0 && JSON.stringify(entry) !== JSON.stringify(removal.expectedEntry)) return false;
	if (removal.expectedSessionId !== void 0 && entry.sessionId !== removal.expectedSessionId) return false;
	if (removal.expectedLifecycleRevision !== void 0 && entry.lifecycleRevision !== removal.expectedLifecycleRevision) return false;
	if (removal.expectedUpdatedAt !== void 0 && entry.updatedAt !== removal.expectedUpdatedAt) return false;
	return true;
}
function sessionKeySegmentStartsWith(sessionKey, prefix) {
	const firstSeparator = sessionKey.indexOf(":");
	if (firstSeparator < 0) return sessionKey.startsWith(prefix);
	const secondSeparator = sessionKey.indexOf(":", firstSeparator + 1);
	return (secondSeparator < 0 ? sessionKey : sessionKey.slice(secondSeparator + 1)).startsWith(prefix);
}
function sessionKeyBelongsToAgent(sessionKey, agentId) {
	if (agentId === void 0) return true;
	const parsed = parseAgentSessionKey(sessionKey);
	return parsed !== null && normalizeAgentId(parsed.agentId) === normalizeAgentId(agentId);
}
function readSessionTranscriptUpdatedAt(database, sessionId) {
	const db = getSessionKysely(database.db);
	const row = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("transcript_events").select((eb) => eb.fn.max("created_at").as("updated_at")).where("session_id", "=", sessionId));
	if (row?.updated_at === null || row?.updated_at === void 0) return;
	return normalizeSqliteNumber(row.updated_at);
}
function sqliteTranscriptStateIsReclaimable(params) {
	const transcriptUpdatedAt = readSessionTranscriptUpdatedAt(params.database, params.sessionId);
	const updatedAt = params.sessionUpdatedAt === void 0 ? transcriptUpdatedAt : Math.max(params.sessionUpdatedAt, transcriptUpdatedAt ?? params.sessionUpdatedAt);
	return updatedAt === void 0 || params.nowMs - updatedAt >= params.orphanTranscriptMinAgeMs;
}
function sqliteTranscriptStateHasMarker(params) {
	const db = getSessionKysely(params.database.db);
	return executeSqliteQuerySync(params.database.db, db.selectFrom("transcript_events").select("event_json").where("session_id", "=", params.sessionId).orderBy("seq", "asc")).rows.some((row) => row.event_json.includes(params.transcriptContentMarker));
}
/** Session ids protected by live node state. */
function readReferencedSqliteSessionIds(database, excludedSessionKeys = /* @__PURE__ */ new Set()) {
	const db = getSessionKysely(database.db);
	const rows = executeSqliteQuerySync(database.db, db.selectFrom("session_nodes").select([
		"entry_json",
		"current_session_id",
		"session_key"
	])).rows;
	const sessionIds = /* @__PURE__ */ new Set();
	for (const row of rows) {
		if (excludedSessionKeys.has(row.session_key)) continue;
		sessionIds.add(row.current_session_id);
		const entry = parseSqliteSessionEntryJson(row);
		if (!entry) continue;
		for (const sessionId of collectSqliteSessionStateIdsForEntry(entry)) sessionIds.add(sessionId);
	}
	return sessionIds;
}
function readReferencedSqliteSessionIdsAfterTargetMutation(database, target, nextEntry) {
	const removedKeys = new Set(uniqueStrings([target.canonicalKey, ...target.storeKeys].map((key) => key.trim())));
	const db = getSessionKysely(database.db);
	const rows = executeSqliteQuerySync(database.db, db.selectFrom("session_nodes").select([
		"entry_json",
		"session_key",
		"current_session_id"
	])).rows;
	const sessionIds = /* @__PURE__ */ new Set();
	for (const row of rows) {
		if (removedKeys.has(row.session_key)) continue;
		sessionIds.add(row.current_session_id);
		const entry = parseSqliteSessionEntryJson(row);
		if (!entry) continue;
		for (const sessionId of collectSqliteSessionStateIdsForEntry(entry)) sessionIds.add(sessionId);
	}
	if (nextEntry) for (const sessionId of collectSqliteSessionStateIdsForEntry(nextEntry)) sessionIds.add(sessionId);
	return sessionIds;
}
function readSqliteTranscriptArchiveLines(database, sessionId) {
	const db = getSessionKysely(database.db);
	return executeSqliteQuerySync(database.db, db.selectFrom("transcript_events").select("event_json").where("session_id", "=", sessionId).orderBy("seq", "asc")).rows.map((row) => row.event_json);
}
function planSqliteSessionStateDeleteIfUnreferenced(params) {
	if (params.referencedSessionIds.has(params.sessionId)) return null;
	const lines = readSqliteTranscriptArchiveLines(params.database, params.sessionId);
	return {
		archiveDirectory: params.archiveDirectory,
		archiveTranscript: params.archiveTranscript !== false,
		content: serializeJsonlLines(lines),
		hadTranscriptState: readSessionTranscriptUpdatedAt(params.database, params.sessionId) !== void 0,
		reason: params.reason ?? "deleted",
		sessionId: params.sessionId
	};
}
function deleteMaterializedSqliteSessionStatePlans(database, plans, protectedSessionIds, excludedSessionKeys) {
	const archivedTranscripts = [];
	const referencedSessionIds = readReferencedSqliteSessionIds(database, excludedSessionKeys);
	for (const sessionId of protectedSessionIds ?? []) referencedSessionIds.add(sessionId);
	for (const plan of plans) {
		if (referencedSessionIds.has(plan.sessionId)) continue;
		if (plan.archiveTranscript) {
			if (serializeJsonlLines(readSqliteTranscriptArchiveLines(database, plan.sessionId)) !== plan.content) throw new Error(`SQLite transcript changed before archive deletion for ${plan.sessionId}`);
		}
		deleteSqliteSessionStateRows(database, plan.sessionId);
		if (plan.hadTranscriptState && plan.archivedTranscript) archivedTranscripts.push(plan.archivedTranscript);
	}
	return archivedTranscripts;
}
function planSqliteSessionStateAfterEntryRemoval(params) {
	const referencedSessionIds = params.referencedSessionIds ?? readReferencedSqliteSessionIds(params.database);
	const plans = [];
	for (const sessionId of collectSqliteSessionStateIdsForEntry(params.entry)) {
		const plan = planSqliteSessionStateDeleteIfUnreferenced({
			archiveTranscript: params.archiveTranscript,
			archiveDirectory: params.archiveDirectory,
			database: params.database,
			reason: params.reason,
			referencedSessionIds,
			sessionId
		});
		if (plan) plans.push(plan);
	}
	return plans;
}
/** Ids of every persisted generation owned by the given logical session keys. */
function readSqliteSessionGenerationIdsForKeys(database, keys, options = {}) {
	const sessionKeys = uniqueStrings([...keys].map((key) => options.exactStoredKeys ? key : key.trim()));
	if (sessionKeys.length === 0) return [];
	const db = getSessionKysely(database.db);
	return executeSqliteQuerySync(database.db, db.selectFrom("session_windows").select("session_id").where("session_key", "in", sessionKeys)).rows.map((row) => row.session_id);
}
async function projectSqliteSessionEntryLifecycleMutation(database, params) {
	const store = readSqliteSessionEntryStore(database, { allowCanonicalRepair: params.allowCanonicalRepair === true });
	const removedEntries = [];
	const removedKeysToArchive = /* @__PURE__ */ new Set();
	const changedSessionKeys = /* @__PURE__ */ new Set();
	const projectedRemovals = [];
	for (const removal of params.removals) {
		const sessionKey = removal.exactStoredKey ? removal.sessionKey : removal.sessionKey.trim();
		let entry = removal.exactStoredKey || sessionKey ? store[sessionKey] : void 0;
		if (removal.expectedRawEntryJson !== void 0) {
			if (readExactSessionEntryJsonForCanonicalRepair(database, sessionKey) !== removal.expectedRawEntryJson) throw new Error(`SQLite session entry changed before raw lifecycle removal for ${sessionKey}`);
			entry = removal.expectedEntry ? cloneSessionEntry(removal.expectedEntry) : void 0;
		}
		if (!shouldRemoveSqliteSessionEntry(entry, removal)) continue;
		projectedRemovals.push({
			expectedEntry: cloneSessionEntry(entry),
			removal,
			sessionKey
		});
		removedEntries.push({
			archiveTranscript: removal.archiveRemovedTranscript === true,
			entry
		});
		if (removal.archiveRemovedTranscript === true) removedKeysToArchive.add(sessionKey);
		changedSessionKeys.add(sessionKey);
		delete store[sessionKey];
	}
	const upsertedEntries = [];
	for (const upsert of params.upserts) {
		const sessionKey = upsert.sessionKey.trim();
		if (!sessionKey) continue;
		const expectedEntry = store[sessionKey] ? cloneSessionEntry(store[sessionKey]) : void 0;
		if (upsert.resetBoundaryReason && !expectedEntry) throw new Error(`Cannot append reset boundary without an existing session row: ${sessionKey}`);
		const entry = upsert.buildEntry === void 0 ? upsert.entry : await upsert.buildEntry({
			currentEntry: expectedEntry ? cloneSessionEntry(expectedEntry) : void 0,
			sessionKey,
			store
		});
		if (!entry) continue;
		const cloned = cloneSessionEntry(entry);
		store[sessionKey] = cloned;
		changedSessionKeys.add(sessionKey);
		const resetBoundaryPlan = upsert.resetBoundaryReason && expectedEntry?.sessionId ? await buildSessionResetBoundaryPlan({
			events: loadSqliteTranscriptEventsFromDatabase(database, expectedEntry.sessionId),
			reason: upsert.resetBoundaryReason
		}) : void 0;
		upsertedEntries.push({
			expectedEntry,
			sessionKey,
			entry: cloned,
			...resetBoundaryPlan ? { resetBoundaryPlan } : {}
		});
	}
	const referencedSessionIds = collectProjectedReferencedSqliteSessionIds({
		database,
		excludedSessionKeys: changedSessionKeys,
		projectedStore: store
	});
	const deletePlans = removedEntries.flatMap(({ archiveTranscript, entry }) => planSqliteSessionStateAfterEntryRemoval({
		archiveDirectory: params.archiveDirectory,
		archiveTranscript,
		database,
		entry,
		reason: "deleted",
		referencedSessionIds
	}));
	const plannedIds = new Set(deletePlans.map((plan) => plan.sessionId));
	for (const sessionId of readSqliteSessionGenerationIdsForKeys(database, removedKeysToArchive)) {
		if (plannedIds.has(sessionId)) continue;
		const plan = planSqliteSessionStateDeleteIfUnreferenced({
			archiveDirectory: params.archiveDirectory,
			archiveTranscript: true,
			database,
			reason: "deleted",
			referencedSessionIds,
			sessionId
		});
		if (plan) {
			deletePlans.push(plan);
			plannedIds.add(sessionId);
		}
	}
	return {
		deletePlans,
		removals: projectedRemovals,
		upsertedEntries
	};
}
function collectReferencedSqliteSessionIdsFromStore(store) {
	const sessionIds = /* @__PURE__ */ new Set();
	for (const entry of Object.values(store)) for (const sessionId of collectSqliteSessionStateIdsForEntry(entry)) sessionIds.add(sessionId);
	return sessionIds;
}
function collectProjectedReferencedSqliteSessionIds(params) {
	const excludedSessionKeys = new Set(params.excludedSessionKeys);
	const db = getSessionKysely(params.database.db);
	const rows = executeSqliteQuerySync(params.database.db, db.selectFrom("session_nodes").select([
		"entry_json",
		"session_key",
		"current_session_id"
	])).rows;
	const sessionIds = /* @__PURE__ */ new Set();
	for (const row of rows) {
		if (excludedSessionKeys.has(row.session_key)) continue;
		sessionIds.add(row.current_session_id);
		const entry = parseSqliteSessionEntryJson(row);
		if (!entry) continue;
		for (const sessionId of collectSqliteSessionStateIdsForEntry(entry)) sessionIds.add(sessionId);
	}
	for (const sessionId of collectReferencedSqliteSessionIdsFromStore(params.projectedStore)) sessionIds.add(sessionId);
	return sessionIds;
}
function deleteSqliteSessionStateRows(database, sessionId) {
	const db = getSessionKysely(database.db);
	deleteSessionTranscriptIndexInTransaction(database.db, sessionId);
	executeSqliteQuerySync(database.db, db.deleteFrom("session_windows").where("session_id", "=", sessionId));
}
function planSqliteOrphanLifecycleTranscriptStateDeletes(params) {
	const db = getSessionKysely(params.database.db);
	const rows = executeSqliteQuerySync(params.database.db, db.selectFrom("session_windows").select([
		"session_id",
		"session_key",
		"plugin_owner_id"
	]).orderBy("session_id", "asc")).rows;
	const deletePlans = [];
	for (const row of rows) {
		if (!sessionKeyBelongsToAgent(row.session_key, params.agentId) || params.referencedSessionIds.has(row.session_id) || params.excludedSessionIds?.has(row.session_id) || params.pluginOwnerId && row.plugin_owner_id && row.plugin_owner_id !== params.pluginOwnerId) continue;
		if (!sqliteTranscriptStateIsReclaimable({
			database: params.database,
			sessionId: row.session_id,
			nowMs: params.nowMs,
			orphanTranscriptMinAgeMs: params.orphanTranscriptMinAgeMs
		}) || !sqliteTranscriptStateHasMarker({
			database: params.database,
			sessionId: row.session_id,
			transcriptContentMarker: params.transcriptContentMarker
		})) continue;
		const plan = planSqliteSessionStateDeleteIfUnreferenced({
			archiveTranscript: params.archiveRemovedEntryTranscripts,
			archiveDirectory: params.archiveDirectory,
			database: params.database,
			reason: "deleted",
			referencedSessionIds: params.referencedSessionIds,
			sessionId: row.session_id
		});
		if (plan) deletePlans.push(plan);
	}
	return deletePlans;
}
function planSqliteSessionLifecycleArtifactCleanup(database, params) {
	const db = getSessionKysely(database.db);
	const rows = executeSqliteQuerySync(database.db, db.selectFrom("session_nodes").select([
		"entry_json",
		"session_key",
		"current_session_id",
		"updated_at"
	]).orderBy("session_key", "asc")).rows;
	const removedSessionIds = /* @__PURE__ */ new Set();
	const entries = [];
	const projectedStore = readSqliteSessionEntryStore(database);
	const foreignOwnedSessionIds = params.pluginOwnerId ? new Set(executeSqliteQuerySync(database.db, db.selectFrom("session_windows").select("session_id").where("plugin_owner_id", "is not", null).where("plugin_owner_id", "!=", params.pluginOwnerId)).rows.map((row) => row.session_id)) : void 0;
	for (const row of rows) {
		if (!sessionKeyBelongsToAgent(row.session_key, params.agentId) || !sessionKeySegmentStartsWith(row.session_key, params.sessionKeySegmentPrefix)) continue;
		const entry = parseSqliteSessionEntryJson(row);
		const sessionIds = uniqueStrings([row.current_session_id, ...entry ? collectSqliteSessionStateIdsForEntry(entry) : []]);
		if (params.pluginOwnerId && entry?.pluginOwnerId && entry.pluginOwnerId !== params.pluginOwnerId || sessionIds.some((sessionId) => foreignOwnedSessionIds?.has(sessionId))) continue;
		if (!sqliteTranscriptStateIsReclaimable({
			database,
			sessionUpdatedAt: normalizeSqliteNumber(row.updated_at),
			sessionId: row.current_session_id,
			nowMs: params.nowMs,
			orphanTranscriptMinAgeMs: params.orphanTranscriptMinAgeMs
		})) continue;
		for (const sessionId of sessionIds) removedSessionIds.add(sessionId);
		entries.push({
			expectedEntry: entry ? cloneSessionEntry(entry) : void 0,
			sessionKey: row.session_key
		});
		delete projectedStore[row.session_key];
	}
	const referencedSessionIds = collectProjectedReferencedSqliteSessionIds({
		database,
		excludedSessionKeys: entries.map((entry) => entry.sessionKey),
		projectedStore
	});
	const deletePlans = [];
	for (const sessionId of removedSessionIds) {
		const plan = planSqliteSessionStateDeleteIfUnreferenced({
			archiveTranscript: params.archiveRemovedEntryTranscripts,
			archiveDirectory: params.archiveDirectory,
			database,
			referencedSessionIds,
			sessionId
		});
		if (plan) deletePlans.push(plan);
	}
	deletePlans.push(...planSqliteOrphanLifecycleTranscriptStateDeletes({
		...params.agentId ? { agentId: params.agentId } : {},
		archiveRemovedEntryTranscripts: params.archiveRemovedEntryTranscripts,
		archiveDirectory: params.archiveDirectory,
		database,
		excludedSessionIds: removedSessionIds,
		...params.pluginOwnerId ? { pluginOwnerId: params.pluginOwnerId } : {},
		referencedSessionIds,
		transcriptContentMarker: params.transcriptContentMarker,
		orphanTranscriptMinAgeMs: params.orphanTranscriptMinAgeMs,
		nowMs: params.nowMs
	}));
	return {
		deletePlans,
		entries
	};
}
function deletePlannedSqliteLifecycleArtifactEntries(database, entries) {
	assertPlannedSqliteLifecycleArtifactEntriesUnchanged(database, entries);
	let removedEntries = 0;
	for (const planned of entries) {
		deleteSqliteSessionEntryRows(database, planned.sessionKey);
		removedEntries += 1;
	}
	return removedEntries;
}
function assertPlannedSqliteLifecycleArtifactEntriesUnchanged(database, entries) {
	for (const planned of entries) {
		const current = readExactSessionEntryRow(database, planned.sessionKey)?.entry;
		if (!sqliteSessionEntriesEqual(current, planned.expectedEntry)) throw new Error(`SQLite lifecycle cleanup entry changed for ${planned.sessionKey}`);
	}
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-maintenance.ts
function collectSqliteSessionMaintenanceBaseKeys(store, activeSessionKey) {
	const keys = [];
	const seen = /* @__PURE__ */ new Set();
	let currentKey = normalizeStoreSessionKey(activeSessionKey);
	while (currentKey && !seen.has(currentKey)) {
		seen.add(currentKey);
		keys.push(currentKey);
		currentKey = normalizeStoreSessionKey(store[currentKey]?.parentSessionKey ?? "");
	}
	return keys;
}
function hasStaleSqliteSessionEntryCandidate(database, pruneAfterMs, preserveKeys) {
	const cutoffMs = Date.now() - pruneAfterMs;
	const db = getSessionKysely(database.db);
	return executeSqliteQuerySync(database.db, db.selectFrom("session_nodes").select(["entry_json", "session_key"]).where("updated_at", "<", cutoffMs).where(sql`json_extract(entry_json, '$.archivedAt') IS NULL`).orderBy("updated_at", "asc")).rows.some((row) => {
		const entry = parseSqliteSessionEntryJson(row);
		if (!entry) return false;
		return !shouldPreserveMaintenanceEntry({
			key: normalizeStoreSessionKey(row.session_key),
			entry,
			preserveKeys
		});
	});
}
function applySqliteSessionEntryMaintenance(database, params) {
	if (params.skipMaintenance) return {
		entryRemovals: [],
		stateDeletePlans: []
	};
	const maintenance = params.maintenanceConfig ?? resolveMaintenanceConfig();
	if (maintenance.mode === "warn") return {
		entryRemovals: [],
		stateDeletePlans: []
	};
	const entryCount = readSqliteSessionEntryCount(database);
	const preserveCandidateKeys = collectSessionMaintenancePreserveKeys([params.activeSessionKey]);
	const hasStaleCandidate = hasStaleSqliteSessionEntryCandidate(database, maintenance.pruneAfterMs, preserveCandidateKeys);
	if (!(params.forceMaintenance === true || entryCount > maintenance.maxEntries || hasStaleCandidate || shouldRunModelRunPrune({
		maintenance,
		entryCount,
		force: params.forceMaintenance
	}) || shouldRunSessionEntryMaintenance({
		entryCount,
		maxEntries: maintenance.maxEntries,
		force: params.forceMaintenance
	}))) return {
		entryRemovals: [],
		stateDeletePlans: []
	};
	const db = getSessionKysely(database.db);
	const rows = executeSqliteQuerySync(database.db, db.selectFrom("session_nodes").select(["session_key", "entry_json"]).orderBy("session_key")).rows;
	const store = {};
	for (const row of rows) {
		const entry = parseSqliteSessionEntryJson(row);
		if (entry) store[row.session_key] = entry;
	}
	const removedKeys = /* @__PURE__ */ new Set();
	const removedEntriesByKey = /* @__PURE__ */ new Map();
	const removedSessionIds = /* @__PURE__ */ new Set();
	const rememberRemovedEntry = (removed) => {
		removedKeys.add(removed.key);
		removedEntriesByKey.set(removed.key, cloneSessionEntry(removed.entry));
		for (const sessionId of collectSqliteSessionStateIdsForEntry(removed.entry)) removedSessionIds.add(sessionId);
	};
	const preserveKeys = collectSessionMaintenancePreserveKeysForStore({
		storePath: params.storePath,
		store,
		baseKeys: collectSqliteSessionMaintenanceBaseKeys(store, params.activeSessionKey)
	}) ?? /* @__PURE__ */ new Set();
	if (shouldRunModelRunPrune({
		maintenance,
		entryCount: Object.keys(store).length,
		force: params.forceMaintenance
	})) pruneStaleModelRunEntries(store, maintenance.modelRunPruneAfterMs, {
		log: false,
		onPruned: rememberRemovedEntry,
		preserveKeys
	});
	if (params.forceMaintenance === true || hasStaleCandidate || Object.keys(store).length > maintenance.maxEntries) pruneStaleEntries(store, maintenance.pruneAfterMs, {
		log: false,
		onPruned: rememberRemovedEntry,
		preserveKeys
	});
	if (shouldRunSessionEntryMaintenance({
		entryCount: Object.keys(store).length,
		maxEntries: maintenance.maxEntries,
		force: params.forceMaintenance
	})) capEntryCount(store, maintenance.maxEntries, {
		log: false,
		onCapped: rememberRemovedEntry,
		preserveKeys
	});
	for (const sessionId of readSqliteSessionGenerationIdsForKeys(database, removedKeys)) removedSessionIds.add(sessionId);
	const referencedSessionIds = collectProjectedReferencedSqliteSessionIds({
		database,
		excludedSessionKeys: removedKeys,
		projectedStore: store
	});
	const deletePlans = [];
	for (const sessionId of removedSessionIds) {
		const plan = planSqliteSessionStateDeleteIfUnreferenced({
			archiveTranscript: true,
			archiveDirectory: params.archiveDirectory,
			database,
			referencedSessionIds,
			sessionId
		});
		if (plan) deletePlans.push(plan);
	}
	return {
		entryRemovals: [...removedKeys].map((sessionKey) => ({
			expectedEntry: removedEntriesByKey.get(sessionKey),
			sessionKey
		})),
		stateDeletePlans: deletePlans
	};
}
function finalizeSqliteSessionEntryMaintenancePlansBestEffort(scope, plans) {
	const entryRemovals = plans.flatMap((plan) => plan.entryRemovals);
	const stateDeletePlans = plans.flatMap((plan) => plan.stateDeletePlans);
	if (entryRemovals.length === 0 && stateDeletePlans.length === 0) return [];
	try {
		const materializedPlans = materializeSqliteSessionStateDeletePlans(stateDeletePlans);
		let archivedTranscripts = [];
		runOpenClawAgentWriteTransaction((database) => {
			assertPlannedSqliteLifecycleArtifactEntriesUnchanged(database, entryRemovals);
			archivedTranscripts = deleteMaterializedSqliteSessionStatePlans(database, materializedPlans, void 0, new Set(entryRemovals.map((removal) => removal.sessionKey)));
			deletePlannedSqliteLifecycleArtifactEntries(database, entryRemovals);
		}, toDatabaseOptions(scope));
		emitCommittedSessionEntryRemovals(entryRemovals);
		return archivedTranscripts;
	} catch (error) {
		getChildLogger({ subsystem: "session-sqlite" }).warn("SQLite session maintenance cleanup failed", {
			agentId: scope.agentId,
			error,
			path: scope.path,
			sessionIds: uniqueStrings(stateDeletePlans.map((plan) => plan.sessionId))
		});
		return [];
	}
}
//#endregion
//#region src/config/sessions/session-entry-lineage.ts
/** True when this entry's transcript began as a copy of a parent (actual forkSource ancestry or the legacy/thread-settled marker). */
function sessionEntryForkedFromParent(entry) {
	return entry?.forkSource !== void 0 || entry?.forkedFromParent === true;
}
function preserveSqliteSameKeySessionRolloverLineage(params) {
	const previousSessionId = params.previous.sessionId.trim();
	const nextSessionId = params.next.sessionId.trim();
	if (!previousSessionId || !nextSessionId || previousSessionId === nextSessionId) return params.next;
	return {
		...params.next,
		previousSessionId,
		usageFamilyKey: params.next.usageFamilyKey ?? params.previous.usageFamilyKey ?? params.sessionKey,
		usageFamilySessionIds: uniqueStrings([
			...params.previous.usageFamilySessionIds ?? [],
			previousSessionId,
			...params.next.usageFamilySessionIds ?? [],
			nextSessionId
		])
	};
}
//#endregion
//#region src/config/sessions/session-entry-provenance.ts
function buildSessionCreationStamp(params) {
	return {
		createdVia: params.via,
		...params.actor ? { createdActor: params.actor } : {},
		createdAt: params.now ?? Date.now()
	};
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-events.ts
function emitArchivedSqliteTranscriptUpdates(archivedTranscripts) {
	for (const archived of archivedTranscripts) emitSessionTranscriptUpdate({ sessionFile: archived.archivedPath });
}
async function publishSqliteTranscriptUpdate(scope, update = {}) {
	const resolved = resolveSqliteTranscriptScope(scope);
	emitSessionTranscriptUpdate({
		...update,
		agentId: resolved.agentId,
		sessionKey: resolved.sessionKey,
		sessionId: resolved.sessionId,
		target: {
			agentId: resolved.agentId,
			sessionId: resolved.sessionId,
			sessionKey: resolved.sessionKey,
			storePath: resolved.path
		}
	});
}
//#endregion
//#region src/config/sessions/session-history-eviction.ts
function createPhysicalBudgetResult(params) {
	const totalBytesAfter = params.totalBytesAfter ?? params.totalBytesBefore;
	return {
		totalBytesBefore: params.totalBytesBefore,
		totalBytesAfter,
		removedFiles: params.removedFiles ?? 0,
		removedEntries: params.removedEntries ?? 0,
		freedBytes: Math.max(0, params.totalBytesBefore - totalBytesAfter),
		maxBytes: params.maxBytes,
		highWaterBytes: params.highWaterBytes,
		overBudget: params.totalBytesBefore > params.maxBytes
	};
}
/** Reports the same physical total enforce mode compares, without projecting logical row bytes. */
async function inspectSqliteSessionHistoryDiskBudget(params) {
	const { highWaterBytes, maxDiskBytes } = params.maintenance;
	if (maxDiskBytes == null || highWaterBytes == null) return {
		diskBudget: null,
		wouldMutate: false
	};
	const diskBudget = createPhysicalBudgetResult({
		totalBytesBefore: (await measureSessionPhysicalDiskUsage(params.storePath)).totalBytes,
		maxBytes: maxDiskBytes,
		highWaterBytes
	});
	if (!diskBudget.overBudget || params.mode !== "enforce") return {
		diskBudget,
		wouldMutate: false
	};
	if (await hasRetainedSessionTranscriptArchives(params.storePath)) return {
		diskBudget,
		wouldMutate: true
	};
	const database = openOpenClawAgentDatabase(toDatabaseOptions(resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		sessionKey: "",
		storePath: params.storePath
	})));
	return {
		diskBudget,
		wouldMutate: readHistoricalSessionIds({
			database,
			protectedSessionIds: collectProtectedHistoricalSessionIds({
				database,
				storePath: params.storePath
			})
		}).length > 0
	};
}
function collectProtectedHistoricalSessionIds(params) {
	const protectedSessionIds = readReferencedSqliteSessionIds(params.database);
	for (const sessionId of collectAdmissionProtectedSessionIds(params)) protectedSessionIds.add(sessionId);
	return protectedSessionIds;
}
/** Session ids owned by in-flight work admissions, without live-reference protection. */
function collectAdmissionProtectedSessionIds(params) {
	const protectedSessionIds = /* @__PURE__ */ new Set();
	const admissionIdentities = collectActiveSessionWorkAdmissionIdentities(params.storePath);
	if (admissionIdentities.size === 0) return protectedSessionIds;
	for (const identity of admissionIdentities) protectedSessionIds.add(identity);
	const normalizedAdmissionKeys = new Set([...admissionIdentities].map((identity) => normalizeStoreSessionKey(identity)));
	const db = getSessionKysely(params.database.db);
	const rows = executeSqliteQuerySync(params.database.db, db.selectFrom("session_nodes").select([
		"entry_json",
		"current_session_id",
		"session_key"
	])).rows;
	for (const row of rows) {
		if (!normalizedAdmissionKeys.has(normalizeStoreSessionKey(row.session_key))) continue;
		protectedSessionIds.add(row.current_session_id);
		const entry = parseSqliteSessionEntryJson(row);
		if (entry) for (const sessionId of collectSqliteSessionStateIdsForEntry(entry)) protectedSessionIds.add(sessionId);
	}
	const generationRows = executeSqliteQuerySync(params.database.db, db.selectFrom("session_windows").select(["session_id", "session_key"])).rows;
	for (const row of generationRows) if (normalizedAdmissionKeys.has(normalizeStoreSessionKey(row.session_key))) protectedSessionIds.add(row.session_id);
	return protectedSessionIds;
}
function readHistoricalSessionIds(params) {
	const db = getSessionKysely(params.database.db);
	return executeSqliteQuerySync(params.database.db, db.selectFrom("session_windows").select("session_id").orderBy("updated_at", "asc").orderBy("session_id", "asc")).rows.flatMap((row) => params.protectedSessionIds.has(row.session_id) ? [] : [row.session_id]);
}
function reclaimSqliteFreePages(database) {
	database.walMaintenance.checkpoint();
	const row = database.db.prepare("PRAGMA freelist_count").get();
	const freePages = Number(row?.freelist_count ?? 0);
	if (Number.isSafeInteger(freePages) && freePages > 0) database.db.exec(`PRAGMA incremental_vacuum(${freePages});`);
	database.walMaintenance.checkpoint();
}
const PHYSICAL_BUDGET_CHECK_INTERVAL_MS = 1800 * 1e3;
const budgetKickStateByStore = /* @__PURE__ */ new Map();
/** Fire-and-forget budget pass from the ordinary entry-write maintenance seam. */
function kickSessionHistoryDiskBudgetMaintenance(params) {
	if (params.agentId && isIncognitoOpenClawAgentSqlitePath(params.storePath, { agentId: params.agentId })) return;
	const maintenance = params.maintenanceConfig ?? resolveMaintenanceConfig();
	if (maintenance.mode !== "enforce" || maintenance.maxDiskBytes == null || maintenance.highWaterBytes == null) return;
	const now = params.now ?? Date.now();
	const state = budgetKickStateByStore.get(params.storePath) ?? {
		lastCheckAt: 0,
		running: false,
		pendingForce: false
	};
	if (state.running) {
		state.pendingForce = state.pendingForce || params.force === true;
		budgetKickStateByStore.set(params.storePath, state);
		return;
	}
	if (!params.force && now - state.lastCheckAt < PHYSICAL_BUDGET_CHECK_INTERVAL_MS) return;
	state.lastCheckAt = now;
	state.running = true;
	budgetKickStateByStore.set(params.storePath, state);
	enforceSqliteSessionHistoryDiskBudget({
		...params.agentId ? { agentId: params.agentId } : {},
		storePath: params.storePath,
		mode: maintenance.mode,
		maintenance
	}).catch(() => {}).finally(() => {
		state.running = false;
		if (state.pendingForce) {
			state.pendingForce = false;
			kickSessionHistoryDiskBudgetMaintenance({
				...params,
				force: true
			});
		}
	});
}
const SESSION_HISTORY_MAINTENANCE_QUEUES = /* @__PURE__ */ new Map();
/** Extracts historical sessions durably before reclaiming their SQLite rows. */
async function enforceSqliteSessionHistoryDiskBudget(params) {
	return await runQueuedStoreWrite({
		queues: SESSION_HISTORY_MAINTENANCE_QUEUES,
		storePath: params.storePath,
		label: "enforceSqliteSessionHistoryDiskBudget",
		fn: async () => await enforceSessionHistoryMaintenanceSerialized(params)
	});
}
async function enforceSessionHistoryMaintenanceSerialized(params) {
	const { highWaterBytes, maxDiskBytes } = params.maintenance;
	if (maxDiskBytes == null || highWaterBytes == null) return null;
	const initialUsage = await measureSessionPhysicalDiskUsage(params.storePath);
	if (initialUsage.totalBytes <= maxDiskBytes || params.mode === "warn") return createPhysicalBudgetResult({
		totalBytesBefore: initialUsage.totalBytes,
		maxBytes: maxDiskBytes,
		highWaterBytes
	});
	const resolved = resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		sessionKey: "",
		storePath: params.storePath
	});
	const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
	const archiveDirectory = resolveSqliteTranscriptArchiveDirectory(resolved);
	let usage = await runExclusiveSqliteSessionWrite(resolved, async () => {
		reclaimSqliteFreePages(database);
		return await measureSessionPhysicalDiskUsage(params.storePath);
	});
	let removedEntries = 0;
	let removedFiles = 0;
	if (usage.totalBytes > highWaterBytes) {
		const archiveSweep = await runExclusiveSqliteSessionWrite(resolved, async () => pruneSessionTranscriptArchivesToHighWater({
			highWaterBytes,
			storePath: params.storePath
		}));
		removedFiles = archiveSweep.removedFiles;
		usage = archiveSweep.usage;
	}
	const candidates = readHistoricalSessionIds({
		database,
		protectedSessionIds: collectProtectedHistoricalSessionIds({
			database,
			storePath: params.storePath
		})
	});
	for (const sessionId of candidates) {
		if (usage.totalBytes <= highWaterBytes) break;
		const eviction = await runExclusiveSessionLifecycleMutation({
			scope: params.storePath,
			identities: [sessionId],
			run: async () => await runExclusiveSqliteSessionWrite(resolved, async () => {
				const protectedBeforeArchive = collectProtectedHistoricalSessionIds({
					database,
					storePath: params.storePath
				});
				const plan = planSqliteSessionStateDeleteIfUnreferenced({
					archiveDirectory,
					archiveTranscript: true,
					database,
					reason: "deleted",
					referencedSessionIds: protectedBeforeArchive,
					sessionId
				});
				if (!plan) return null;
				const materialized = materializeSqliteSessionStateDeletePlans([plan]);
				let deleted = false;
				let archivedTranscripts = [];
				runOpenClawAgentWriteTransaction((transactionDb) => {
					const protectedAtDelete = collectProtectedHistoricalSessionIds({
						database: transactionDb,
						storePath: params.storePath
					});
					archivedTranscripts = deleteMaterializedSqliteSessionStatePlans(transactionDb, materialized, protectedAtDelete);
					const db = getSessionKysely(transactionDb.db);
					deleted = executeSqliteQuerySync(transactionDb.db, db.selectFrom("session_windows").select("session_id").where("session_id", "=", sessionId)).rows.length === 0;
				}, toDatabaseOptions(resolved));
				if (!deleted) return null;
				try {
					reclaimSqliteFreePages(database);
				} catch {}
				return {
					archivedTranscripts,
					usage: await measureSessionPhysicalDiskUsage(params.storePath)
				};
			})
		});
		if (!eviction) continue;
		removedEntries += 1;
		emitArchivedSqliteTranscriptUpdates(eviction.archivedTranscripts);
		usage = eviction.usage;
		if (usage.totalBytes > highWaterBytes) {
			const repruned = await runExclusiveSqliteSessionWrite(resolved, async () => pruneSessionTranscriptArchivesToHighWater({
				highWaterBytes,
				storePath: params.storePath
			}));
			removedFiles += repruned.removedFiles;
			usage = repruned.usage;
		}
	}
	if (usage.totalBytes > highWaterBytes) {
		const finalPrune = await runExclusiveSqliteSessionWrite(resolved, async () => pruneSessionTranscriptArchivesToHighWater({
			highWaterBytes,
			storePath: params.storePath
		}));
		removedFiles += finalPrune.removedFiles;
		usage = finalPrune.usage;
	}
	return createPhysicalBudgetResult({
		totalBytesBefore: initialUsage.totalBytes,
		totalBytesAfter: usage.totalBytes,
		removedEntries,
		removedFiles,
		maxBytes: maxDiskBytes,
		highWaterBytes
	});
}
//#endregion
//#region src/config/sessions/session-store-path.ts
function resolveSessionStorePathForScope(scope) {
	if (isIncognitoSessionKey(scope.sessionKey)) return resolveIncognitoOpenClawAgentSqlitePath({
		agentId: resolveAgentIdFromSessionKey(scope.sessionKey),
		env: scope.env
	});
	if (scope.storePath) return scope.storePath;
	const agentId = scope.agentId ?? resolveAgentIdFromSessionKey(scope.sessionKey);
	return resolveStorePath(getRuntimeConfig().session?.store, {
		agentId,
		env: scope.env
	});
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-entry.ts
const childSessionKeysByEntrySnapshot = /* @__PURE__ */ new WeakMap();
function assertCanonicalSessionWriteScope(scope) {
	assertCanonicalSessionKeyWrite(scope.sessionKey, scope.agentId);
}
function getChildSessionKeysByParent(entries) {
	const cached = childSessionKeysByEntrySnapshot.get(entries);
	if (cached) return cached;
	const childKeysByParent = /* @__PURE__ */ new Map();
	for (const [sessionKey, entry] of entries) for (const rawParentKey of [entry.spawnedBy, entry.parentSessionKey]) {
		const parentKey = rawParentKey?.trim();
		if (!parentKey || parentKey === sessionKey) continue;
		const childKeys = childKeysByParent.get(parentKey) ?? /* @__PURE__ */ new Set();
		childKeys.add(sessionKey);
		childKeysByParent.set(parentKey, childKeys);
	}
	const indexedChildKeys = new Map([...childKeysByParent].map(([parentKey, childKeys]) => [parentKey, [...childKeys]]));
	childSessionKeysByEntrySnapshot.set(entries, indexedChildKeys);
	return indexedChildKeys;
}
/** Resolves one canonical entry and its proven aliases without materializing the store. */
function resolveSqliteSessionEntry(scope, options = {}) {
	const resolved = resolveSqliteScope(scope);
	const read = (database) => {
		const selected = readSessionEntryRow(database, resolved.sessionKey);
		const existing = selected?.entry;
		return {
			existing: existing ? scope.clone === false ? existing : cloneSessionEntry(existing) : void 0,
			legacyKeys: selected?.legacyKeys ?? [],
			normalizedKey: resolved.sessionKey
		};
	};
	if (options.readOnly) {
		const result = withOpenClawAgentDatabaseReadOnly(read, toDatabaseOptions(resolved));
		return result.found ? result.value : {
			existing: void 0,
			legacyKeys: [],
			normalizedKey: resolved.sessionKey
		};
	}
	return read(openOpenClawAgentDatabase(toDatabaseOptions(resolved)));
}
/** Loads one session entry from the additive SQLite session store. */
function loadSqliteSessionEntry(scope) {
	return resolveSqliteSessionEntry(scope).existing;
}
/** Loads one session entry without opening its agent database writable. */
function loadSqliteSessionEntryReadOnly(scope) {
	return resolveSqliteSessionEntry(scope, { readOnly: true }).existing;
}
/** Loads one exact persisted-key entry from the additive SQLite session store. */
function loadExactSqliteSessionEntry(scope) {
	const sessionKey = scope.sessionKey.trim();
	if (!sessionKey) return;
	const entry = readExactSessionEntryRowValidated(openOpenClawAgentDatabase(toDatabaseOptions(resolveSqliteScope(scope))), sessionKey)?.entry;
	return entry ? {
		sessionKey,
		entry: scope.clone === false ? entry : cloneSessionEntry(entry)
	} : void 0;
}
/** Lists persisted session keys from the data-version-validated entry snapshot. */
function listSqliteSessionEntryKeysReadOnly(scope = {}) {
	const resolved = resolveSqliteScope({
		...scope,
		sessionKey: ""
	});
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		return [...readSessionEntrySnapshot(database, resolved, scope.readConsistency).keys];
	}, toDatabaseOptions(resolved));
	return result.found ? result.value : [];
}
/** Exact persisted-key probe on the read-only handle, for per-row hot paths. */
function loadExactSqliteSessionEntryReadOnly(scope) {
	const sessionKey = scope.sessionKey.trim();
	if (!sessionKey) return;
	const result = withOpenClawAgentDatabaseReadOnly((database) => readExactSessionEntryRowValidated(database, sessionKey)?.entry, toDatabaseOptions(resolveSqliteScope(scope)));
	return result.found && result.value ? {
		sessionKey,
		entry: scope.clone === false ? result.value : cloneSessionEntry(result.value)
	} : void 0;
}
/** Lists direct child rows without cloning or rebuilding the complete session store. */
function listSqliteSessionChildEntriesReadOnly(scope) {
	const resolved = resolveSqliteScope(scope);
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		const snapshot = readSessionEntrySnapshot(database, resolved, scope.readConsistency);
		return (getChildSessionKeysByParent(snapshot.entries).get(resolved.sessionKey) ?? []).flatMap((sessionKey) => {
			if (isInternalSessionEffectsKey(sessionKey)) return [];
			const entry = snapshot.entries.get(sessionKey);
			return entry ? [{
				sessionKey,
				entry: scope.clone === false ? entry : cloneSessionEntry(entry)
			}] : [];
		});
	}, toDatabaseOptions(resolved));
	return result.found ? result.value : [];
}
/** Resolves the persisted session key for a SQLite transcript session id. */
function resolveSqliteSessionKeyBySessionId(scope) {
	const resolved = resolveSqliteTranscriptReadScope(scope);
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		const db = getSessionKysely(database.db);
		return executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("session_windows").select("session_key").where("session_id", "=", resolved.sessionId).limit(1));
	}, toDatabaseOptions(resolved));
	return result.found ? result.value?.session_key : void 0;
}
/** Lists session entries from the additive SQLite session store. */
function listSqliteSessionEntries(scope = {}) {
	const resolved = resolveSqliteScope({
		...scope,
		sessionKey: ""
	});
	return listSqliteSessionEntriesFromDatabase(openOpenClawAgentDatabase(toDatabaseOptions(resolved)), resolved, scope);
}
/**
* Lists session entries without opening the agent database writable.
* Transient lock errors propagate: only the caller knows whether "empty" is an
* acceptable degradation (health snapshots) or hides real state (migration detection).
*/
function listSqliteSessionEntriesReadOnly(scope = {}) {
	const resolved = resolveSqliteScope({
		...scope,
		sessionKey: ""
	});
	const result = withOpenClawAgentDatabaseReadOnly((database) => listSqliteSessionEntriesFromDatabase(database, resolved, scope), toDatabaseOptions(resolved));
	return result.found ? result.value : [];
}
/** Counts durable session rows without materializing entry JSON or warming the entry cache. */
function countSqliteSessionEntryRowsReadOnly(scope = {}) {
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		const db = getSessionKysely(database.db);
		const row = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("session_nodes").select((expression) => expression.fn.countAll().as("count")));
		return row ? normalizeSqliteNumber(row.count) : 0;
	}, toDatabaseOptions(resolveSqliteScope({
		...scope,
		sessionKey: ""
	})));
	return result.found ? result.value : 0;
}
/**
* Proves whether a durable store has a row in one of the requested lifecycle states.
* Unknown existing schemas stay eligible so the writable owner can surface or repair them.
*/
function hasSqliteSessionEntriesByStatusReadOnly(scope, statuses) {
	const selectedStatuses = [...new Set(statuses)];
	if (selectedStatuses.length === 0) return false;
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		const db = getSessionKysely(database.db);
		return Boolean(executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("session_nodes").select("session_key").where("status", "in", selectedStatuses).limit(1)));
	}, toDatabaseOptions(resolveSqliteScope({
		...scope,
		sessionKey: ""
	})));
	return result.found ? result.value : result.reason !== "database-missing";
}
function listSqliteSessionEntriesFromDatabase(database, resolved, scope) {
	assertCanonicalSqliteSessionKeysCurrent(database);
	const snapshot = readSessionEntrySnapshot(database, resolved, scope.readConsistency);
	const entries = scope.projection === "list" ? snapshot.listEntries : snapshot.entries;
	return snapshot.keys.flatMap((sessionKey) => {
		if (isInternalSessionEffectsKey(sessionKey)) return [];
		const entry = entries.get(sessionKey);
		if (!entry) return [];
		const deliveryCanonicalKey = resolveDeliveryProvenCanonicalSessionKey(sessionKey, entry);
		if (deliveryCanonicalKey !== sessionKey) throw canonicalSessionKeyMigrationRequiredError(`non-canonical persisted row resolves to session key ${deliveryCanonicalKey}`);
		return [{
			sessionKey,
			entry: scope.clone === false ? entry : cloneSessionEntry(entry)
		}];
	});
}
function readSessionEntrySnapshot(database, resolved, readConsistency) {
	return readSqliteSessionEntryCache(database, {
		cache: !isIncognitoOpenClawAgentSqlitePath(database.path, {
			agentId: database.agentId,
			env: resolved.env
		}),
		latest: readConsistency === "latest"
	});
}
/** Lists only entries whose normalized session row has one of the requested statuses. */
function listSqliteSessionEntriesByStatus(scope, statuses) {
	return readSqliteSessionEntriesByStatus(openOpenClawAgentDatabase(toDatabaseOptions(resolveSqliteScope({
		...scope,
		sessionKey: ""
	}))), statuses).filter(({ sessionKey }) => !isInternalSessionEffectsKey(sessionKey));
}
/** Lists transcript-bearing SQLite sessions, including retained rows from session-id rotation. */
function listSqliteSessionTranscriptInstances(scope = {}) {
	const resolved = resolveSqliteScope({
		...scope,
		sessionKey: ""
	});
	const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
	const currentEntries = new Map(listSqliteSessionEntries(scope).map((summary) => [summary.sessionKey, summary.entry]));
	return listSqliteTranscriptInstancesFromDatabase({
		agentId: resolved.agentId,
		currentEntries,
		database,
		databasePath: resolveOpenClawAgentSqlitePath(toDatabaseOptions(resolved))
	});
}
/** Reads a session activity timestamp from the additive SQLite session store. */
function readSqliteSessionUpdatedAt(scope) {
	const resolved = resolveSqliteScope(scope);
	const row = readSessionEntryRow(openOpenClawAgentDatabase(toDatabaseOptions(resolved)), resolved.sessionKey)?.row;
	return row ? normalizeSqliteNumber(row.updated_at) : void 0;
}
/** Applies a partial entry update to the additive SQLite session store. */
async function upsertSqliteSessionEntry(scope, patch) {
	return await patchSqliteSessionEntry(scope, () => patch, { fallbackEntry: createFallbackSessionEntry(patch) });
}
/** Replaces one entry in the additive SQLite session store. */
async function replaceSqliteSessionEntry(scope, entry) {
	return await patchSqliteSessionEntry(scope, () => entry, {
		fallbackEntry: entry,
		replaceEntry: true
	});
}
/** Replaces one entry synchronously for sync session runtimes. */
function replaceSqliteSessionEntrySync(scope, entry) {
	const resolved = resolveSqliteScope(scope);
	assertCanonicalSessionWriteScope(resolved);
	let previous = /* @__PURE__ */ new Map();
	let current = /* @__PURE__ */ new Map();
	runOpenClawAgentWriteTransaction((database) => {
		const identityKeys = collectSessionEntryLookupKeys(database, resolved.sessionKey);
		previous = readSqliteSessionIdentitySnapshot(database, identityKeys);
		writeSessionEntry(database, resolved.sessionKey, entry);
		current = readSqliteSessionIdentitySnapshot(database, identityKeys);
	}, toDatabaseOptions(resolved));
	emitCommittedSessionIdentityDiff(previous, current);
}
/** Patches one entry in the additive SQLite session store. */
async function patchSqliteSessionEntry(scope, update, options = {}) {
	const resolved = resolveSqliteScope(scope);
	assertCanonicalSessionWriteScope(resolved);
	return await patchSqliteSessionEntrySnapshot({
		assertSnapshotUnchanged: (prepared, fresh) => assertSqliteSessionEntrySelectionUnchanged(prepared, fresh, "session-entry.patch"),
		existingEntry: (snapshot) => snapshot.selected?.entry,
		legacyKeys: (snapshot) => snapshot.selected?.legacyKeys ?? [],
		options,
		readSnapshot: (database) => readSqliteSessionEntrySelectionSnapshot(database, resolved.sessionKey, options.replaceEntry === true),
		resolved,
		sessionKey: resolved.sessionKey,
		snapshotRows: (snapshot) => snapshot.selectedRows,
		storePath: resolveSessionStorePathForScope(scope),
		update
	});
}
/** Patches one logical entry selected from a canonical key and alias set. */
async function patchSqliteSessionEntryTarget(scope, update, options = {}) {
	return await patchSqliteSessionEntrySnapshot({
		assertSnapshotUnchanged: (prepared, fresh) => assertSqliteLifecycleTargetSnapshotUnchanged(prepared, fresh, "session-entry-target.patch"),
		existingEntry: (snapshot) => snapshot.primary?.entry,
		legacyKeys: () => scope.target.storeKeys,
		options,
		readSnapshot: (database) => readSqliteLifecycleTargetSnapshot(database, scope.target),
		rehomeWindows: true,
		resolved: resolveSqliteStoreScope(scope.storePath, { agentId: scope.agentId }),
		sessionKey: scope.target.canonicalKey,
		snapshotRows: (snapshot) => snapshot.rows,
		storePath: resolveSessionStorePathForScope({
			agentId: scope.agentId,
			sessionKey: scope.target.canonicalKey,
			storePath: scope.storePath
		}),
		update
	});
}
/** All entry patches prepare asynchronously, then revalidate and publish on one commit edge. */
async function patchSqliteSessionEntrySnapshot(params) {
	const { options, resolved, sessionKey } = params;
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		const prepared = params.readSnapshot(database);
		const existing = params.existingEntry(prepared);
		const writeBase = existing ?? options.fallbackEntry;
		if (!writeBase) return null;
		const patch = await params.update(cloneSessionEntry(writeBase), { existingEntry: existing ? cloneSessionEntry(existing) : void 0 });
		const maintenancePlans = [];
		let result = null;
		let previousIdentity = /* @__PURE__ */ new Map();
		let currentIdentity = /* @__PURE__ */ new Map();
		runOpenClawAgentWriteTransaction((writeDatabase) => {
			const fresh = params.readSnapshot(writeDatabase);
			params.assertSnapshotUnchanged(prepared, fresh);
			options.assertCommitAllowed?.();
			if (!patch) {
				result = cloneSessionEntry(writeBase);
				return;
			}
			const snapshotRows = params.snapshotRows(fresh);
			const legacyKeys = params.legacyKeys(fresh);
			const identityKeys = [
				sessionKey,
				...legacyKeys,
				...snapshotRows.map((row) => row.sessionKey)
			];
			previousIdentity = createSqliteSessionIdentitySnapshot(snapshotRows);
			const merged = options.replaceEntry ? cloneSessionEntry(patch) : options.preserveActivity ? mergeSessionEntryPreserveActivity(writeBase, patch) : mergeSessionEntry(writeBase, patch);
			const next = options.replaceEntry ? merged : preserveSqliteSameKeySessionRolloverLineage({
				next: merged,
				previous: writeBase,
				sessionKey
			});
			const selectedPreviousEntry = params.existingEntry(fresh) ?? writeBase;
			writeSessionEntry(writeDatabase, sessionKey, next, { previousEntry: selectedPreviousEntry });
			if (params.rehomeWindows) rehomeSqliteSessionWindows(writeDatabase, sessionKey, legacyKeys);
			deleteLegacySessionEntryRows(writeDatabase, legacyKeys, sessionKey, { rehomeMembers: selectedPreviousEntry.sessionId === next.sessionId });
			maintenancePlans.push(applySqliteSessionEntryMaintenance(writeDatabase, {
				activeSessionKey: sessionKey,
				archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
				maintenanceConfig: options.maintenanceConfig,
				skipMaintenance: options.skipMaintenance,
				storePath: params.storePath
			}));
			currentIdentity = readSqliteSessionIdentitySnapshot(writeDatabase, identityKeys);
			result = cloneSessionEntry(next);
		}, toDatabaseOptions(resolved));
		emitCommittedSessionIdentityDiff(previousIdentity, currentIdentity);
		finalizeSqliteSessionEntryMaintenancePlansBestEffort(resolved, maintenancePlans);
		kickSessionHistoryDiskBudgetMaintenance({
			...resolved.agentId ? { agentId: resolved.agentId } : {},
			storePath: params.storePath,
			...options.maintenanceConfig ? { maintenanceConfig: options.maintenanceConfig } : {}
		});
		return result;
	});
}
/** Forks one parent SQLite transcript into a new child transcript. */
async function recordSqliteInboundSessionMeta(params) {
	const createIfMissing = params.createIfMissing ?? true;
	return await patchSqliteSessionEntry({
		sessionKey: params.sessionKey,
		storePath: params.storePath
	}, (_entry, context) => {
		const metadataPatch = deriveSessionMetaPatch({
			ctx: params.ctx,
			sessionKey: params.sessionKey,
			existing: context.existingEntry,
			groupResolution: params.groupResolution
		});
		if (context.existingEntry) return metadataPatch;
		const senderId = params.ctx.From?.trim();
		return {
			...buildSessionCreationStamp(params.ctx.SessionCreation ?? {
				via: "channel",
				actor: {
					type: "human",
					...senderId ? { id: senderId } : {}
				}
			}),
			...metadataPatch
		};
	}, {
		preserveActivity: true,
		...createIfMissing ? { fallbackEntry: mergeSessionEntry(void 0, {}) } : {}
	});
}
/** Updates last-route/delivery metadata without refreshing activity timestamps. */
async function updateSqliteSessionLastRoute(params) {
	const createIfMissing = params.createIfMissing ?? true;
	return await patchSqliteSessionEntry({
		sessionKey: params.sessionKey,
		storePath: params.storePath
	}, (_entry, context) => {
		const routePatch = deriveLastRoutePatch({
			channel: params.channel,
			to: params.to,
			accountId: params.accountId,
			threadId: params.threadId,
			route: params.route,
			deliveryContext: params.deliveryContext,
			ctx: params.ctx,
			groupResolution: params.groupResolution,
			existing: context.existingEntry,
			sessionKey: params.sessionKey
		});
		if (context.existingEntry) return routePatch;
		const senderId = params.ctx?.From?.trim();
		return {
			...buildSessionCreationStamp(params.ctx?.SessionCreation ?? {
				via: "channel",
				...params.ctx ? { actor: {
					type: "human",
					...senderId ? { id: senderId } : {}
				} } : {}
			}),
			...routePatch
		};
	}, {
		preserveActivity: true,
		...createIfMissing ? { fallbackEntry: mergeSessionEntry(void 0, {}) } : {}
	});
}
/** Writes the forked child's transcript rows (copied branch or header-only). */
//#endregion
//#region src/config/sessions/session-accessor.sqlite-canonical-repair.ts
function resolveSqliteCanonicalRepairLookupKeys(canonicalKey, storedKeys) {
	return uniqueStrings([
		canonicalKey,
		...storedKeys,
		...storedKeys.flatMap((key) => {
			const trimmedKey = key.trim();
			return [trimmedKey, normalizeStoreSessionKey(trimmedKey)];
		})
	]);
}
/** Doctor probes only the exact staged target and may replace a malformed partial row. */
function readExactSessionEntryRowForCanonicalRepair(database, sessionKey, options = {}) {
	const db = getSessionKysely(database.db);
	const row = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("session_nodes").selectAll().where("session_key", "=", sessionKey));
	if (!row) return;
	if (row.entry_json === "{}") {
		if (executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("session_windows").select("session_id").where("session_id", "=", row.current_session_id).where("session_key", "=", row.session_key))) return;
	}
	const parsedEntry = parseSqliteSessionEntryJson(row);
	if (!parsedEntry && !options.allowMalformedRowRepair) throw canonicalSessionKeyMigrationRequiredError(`invalid persisted session row requires repair for ${sessionKey}`);
	return {
		entry: parsedEntry ?? {
			sessionId: row.current_session_id,
			updatedAt: row.updated_at
		},
		legacyKeys: [],
		row
	};
}
/** Doctor-only cross-store copy; the source node remains until lifecycle archival succeeds. */
function copySqliteSessionOwnedStateForCanonicalRepair(params) {
	const sourceDatabase = openOpenClawAgentDatabase(toDatabaseOptions(resolveSqliteStoreScope(params.source.storePath, { agentId: params.source.agentId })));
	copySqliteSessionOwnedStateForRepair({
		canonicalKey: params.canonicalKey,
		destination: params.destinationDatabase,
		...params.preferredEntry ? { preferredEntry: params.preferredEntry } : {},
		...params.preferredSessionKey ? { preferredSessionKey: params.preferredSessionKey } : {},
		source: sourceDatabase,
		sourceEntries: params.sourceEntries,
		sourceKeys: params.sourceKeys
	});
}
/** Doctor-only inventory of every generation copied for one canonical-key group. */
function listSqliteSessionGenerationIdsForCanonicalRepair(params) {
	return readSqliteSessionGenerationIdsForKeys(openOpenClawAgentDatabase(toDatabaseOptions(resolveSqliteStoreScope(params.storePath, { agentId: params.agentId }))), uniqueStrings(params.sourceKeys), { exactStoredKeys: true });
}
/** Doctor-only same-store rewrite for delivery attribution owned by removed aliases. */
function rehomeSqliteSessionDeliveryReferencesForCanonicalRepair(database, canonicalKey, previousKeys) {
	rehomeSqliteSessionDeliveryReferencesForCanonicalRepairBatch(database, [{
		canonicalKey,
		previousKeys
	}]);
}
/** Doctor-only batched delivery rewrite with one session identity inventory per database. */
function rehomeSqliteSessionDeliveryReferencesForCanonicalRepairBatch(database, repairs) {
	if (repairs.length === 0) return;
	const db = getSessionKysely(database.db);
	const storedSessionKeys = executeSqliteQuerySync(database.db, db.selectFrom("session_nodes").select("session_key")).rows.map((row) => row.session_key);
	const storedSessionKeySet = new Set(storedSessionKeys);
	const identityCounts = /* @__PURE__ */ new Map();
	for (const sessionKey of storedSessionKeys) {
		const identity = normalizeStoreSessionKey(sessionKey.trim());
		identityCounts.set(identity, (identityCounts.get(identity) ?? 0) + 1);
	}
	for (const repair of repairs) {
		const ownedKeys = /* @__PURE__ */ new Set([repair.canonicalKey, ...repair.previousKeys]);
		const ownedIdentityCounts = /* @__PURE__ */ new Map();
		for (const sessionKey of ownedKeys) {
			if (!storedSessionKeySet.has(sessionKey)) continue;
			const identity = normalizeStoreSessionKey(sessionKey.trim());
			ownedIdentityCounts.set(identity, (ownedIdentityCounts.get(identity) ?? 0) + 1);
		}
		const aliases = resolveSqliteCanonicalRepairLookupKeys(repair.canonicalKey, repair.previousKeys).filter((key) => {
			if (key === repair.canonicalKey) return false;
			if (ownedKeys.has(key)) return true;
			const identity = normalizeStoreSessionKey(key.trim());
			return (identityCounts.get(identity) ?? 0) <= (ownedIdentityCounts.get(identity) ?? 0);
		});
		if (aliases.length === 0) continue;
		executeSqliteQuerySync(database.db, db.updateTable("conversation_deliveries").set({ source_session_key: repair.canonicalKey }).where("source_session_key", "in", aliases));
	}
}
/** Doctor inventory hydrates rejected legacy blobs from promoted node/window columns. */
function hydrateCanonicalRepairEntry(row) {
	let record = {};
	try {
		const parsed = JSON.parse(row.entry_json);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) record = parsed;
	} catch {}
	const createdActor = row.created_actor_type ? {
		type: row.created_actor_type,
		...row.created_actor_id ? { id: row.created_actor_id } : {}
	} : void 0;
	const forkSource = row.fork_source_session_key && row.fork_source_session_id ? {
		sessionKey: row.fork_source_session_key,
		sessionId: row.fork_source_session_id,
		...row.fork_source_entry_id ? { entryId: row.fork_source_entry_id } : {}
	} : void 0;
	const delivery = row.delivery_channel && row.delivery_target ? normalizeSessionDeliveryState({ context: {
		channel: row.delivery_channel,
		to: row.delivery_target,
		...row.delivery_account_id ? { accountId: row.delivery_account_id } : {},
		...row.delivery_thread_id ? { threadId: row.delivery_thread_id } : {}
	} }) : void 0;
	return projectCanonicalSessionEntryShape({
		...record,
		...row.status ? { status: row.status } : {},
		...row.current_started_at !== null ? { startedAt: row.current_started_at } : {},
		...row.current_ended_at !== null ? { endedAt: row.current_ended_at } : {},
		...row.current_chat_type ? { chatType: row.current_chat_type } : {},
		...row.current_model_provider ? { modelProvider: row.current_model_provider } : {},
		...row.current_model ? { model: row.current_model } : {},
		...row.current_previous_session_id ? { previousSessionId: row.current_previous_session_id } : {},
		...row.current_agent_harness_id ? { agentHarnessId: row.current_agent_harness_id } : {},
		...delivery ? { delivery } : {},
		...row.created_at !== null ? { createdAt: row.created_at } : {},
		...row.created_via ? { createdVia: row.created_via } : {},
		...createdActor ? { createdActor } : {},
		...row.spawned_by ? { spawnedBy: row.spawned_by } : {},
		...row.parent_session_key && row.parent_session_key !== row.spawned_by ? { parentSessionKey: row.parent_session_key } : {},
		...forkSource ? { forkSource } : {},
		...row.label ? { label: row.label } : {},
		...row.display_name ? { displayName: row.display_name } : {},
		...row.category ? { category: row.category } : {},
		...row.icon ? { icon: row.icon } : {},
		...row.pinned_at !== null ? { pinnedAt: row.pinned_at } : {},
		...row.archived_at !== null ? { archivedAt: row.archived_at } : {},
		...row.last_read_at !== null ? { lastReadAt: row.last_read_at } : {},
		...row.last_interaction_at !== null ? { lastInteractionAt: row.last_interaction_at } : {},
		...row.last_activity_at !== null ? { lastActivityAt: row.last_activity_at } : {},
		sessionId: row.current_session_id,
		updatedAt: row.updated_at
	});
}
function listSqliteSessionEntriesForCanonicalRepair(scope = {}) {
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		const db = getSessionKysely(database.db);
		return executeSqliteQuerySync(database.db, db.selectFrom("session_nodes").leftJoin("session_windows as current_window", (join) => join.onRef("current_window.session_id", "=", "session_nodes.current_session_id").onRef("current_window.session_key", "=", "session_nodes.session_key")).leftJoin("conversations as current_conversation", "current_conversation.conversation_id", "current_window.primary_conversation_id").selectAll("session_nodes").select([
			"current_window.session_id as current_window_id",
			"current_window.started_at as current_started_at",
			"current_window.ended_at as current_ended_at",
			"current_window.chat_type as current_chat_type",
			"current_window.model_provider as current_model_provider",
			"current_window.model as current_model",
			"current_window.previous_session_id as current_previous_session_id",
			"current_window.agent_harness_id as current_agent_harness_id",
			"current_conversation.channel as delivery_channel",
			"current_conversation.account_id as delivery_account_id",
			"current_conversation.delivery_target",
			"current_conversation.thread_id as delivery_thread_id"
		])).rows.flatMap((row) => {
			if (row.entry_json === "{}" && row.current_window_id === row.current_session_id) return [];
			const persistedEntry = parseSqliteSessionEntryJson(row);
			const entry = persistedEntry ?? hydrateCanonicalRepairEntry(row);
			const lineageProjectionMismatch = Boolean(persistedEntry && ((row.parent_session_key ?? void 0) !== (persistedEntry.parentSessionKey ?? persistedEntry.spawnedBy ?? void 0) || (row.spawned_by ?? void 0) !== (persistedEntry.spawnedBy ?? void 0) || (row.fork_source_session_key ?? void 0) !== (persistedEntry.forkSource?.sessionKey ?? void 0)));
			const rawCompareRequired = row.entry_valid !== 1 || !persistedEntry || lineageProjectionMismatch;
			return [{
				sessionKey: row.session_key,
				entry,
				...rawCompareRequired ? { rawEntryJson: row.entry_json } : {}
			}];
		});
	}, toDatabaseOptions(resolveSqliteScope({
		...scope,
		sessionKey: ""
	})));
	return result.found ? result.value : [];
}
function copySqliteSessionOwnedStateForRepair(params) {
	const storedSourceKeys = uniqueStrings(params.sourceKeys.filter((key) => key.length > 0));
	if (storedSourceKeys.length === 0) return;
	const sourceKeys = storedSourceKeys;
	const sourceDb = getSessionKysely(params.source.db);
	const destinationDb = getSessionKysely(params.destination.db);
	const entrySessionIds = uniqueStrings(params.sourceEntries.flatMap((entry) => [...collectSqliteSessionStateIdsForEntry(entry)]));
	const windows = executeSqliteQuerySync(params.source.db, sourceDb.selectFrom("session_windows").selectAll().where((eb) => entrySessionIds.length === 0 ? eb("session_key", "in", sourceKeys) : eb.or([eb("session_key", "in", sourceKeys), eb("session_id", "in", entrySessionIds)]))).rows;
	const sessionIds = uniqueStrings([...windows.map((row) => row.session_id), ...entrySessionIds]);
	const sessionLinks = sessionIds.length === 0 ? [] : executeSqliteQuerySync(params.source.db, sourceDb.selectFrom("session_conversations").selectAll().where("session_id", "in", sessionIds)).rows;
	const linkedConversationIds = uniqueStrings([...windows.flatMap((row) => row.primary_conversation_id ? [row.primary_conversation_id] : []), ...sessionLinks.map((row) => row.conversation_id)]);
	const sourceKeyReferences = new Set(sourceKeys);
	const sourceLineageIdentities = new Set(sourceKeys.map((key) => normalizeStoreSessionKey(key.trim())));
	const deliveryLookupKeys = resolveSqliteCanonicalRepairLookupKeys(params.canonicalKey, sourceKeys);
	const competingDeliveryIdentities = new Set(executeSqliteQuerySync(params.source.db, sourceDb.selectFrom("session_nodes").select("session_key")).rows.flatMap((row) => sourceKeyReferences.has(row.session_key) ? [] : [normalizeStoreSessionKey(row.session_key.trim())]));
	const deliverySourceKeys = deliveryLookupKeys.filter((key) => sourceKeyReferences.has(key) || !competingDeliveryIdentities.has(normalizeStoreSessionKey(key.trim())));
	const deliverySourceKeyReferences = new Set(deliverySourceKeys);
	const deliveries = executeSqliteQuerySync(params.source.db, sourceDb.selectFrom("conversation_deliveries").selectAll().where("source_session_key", "in", deliverySourceKeys)).rows;
	const conversationIds = uniqueStrings([...linkedConversationIds, ...deliveries.map((delivery) => delivery.conversation_id)]);
	if (conversationIds.length > 0) {
		const conversations = executeSqliteQuerySync(params.source.db, sourceDb.selectFrom("conversations").selectAll().where("conversation_id", "in", conversationIds)).rows;
		for (const conversation of conversations) {
			const { conversation_id: _conversationId, ...replacement } = conversation;
			executeSqliteQuerySync(params.destination.db, destinationDb.insertInto("conversations").values(conversation).onConflict((conflict) => conflict.column("conversation_id").doUpdateSet(replacement)));
		}
		for (const delivery of deliveries) {
			const canonicalDelivery = {
				...delivery,
				source_session_key: delivery.source_session_key !== null && deliverySourceKeyReferences.has(delivery.source_session_key) ? params.canonicalKey : delivery.source_session_key
			};
			const { operation_id: _operationId, ...replacement } = canonicalDelivery;
			executeSqliteQuerySync(params.destination.db, destinationDb.insertInto("conversation_deliveries").values(canonicalDelivery).onConflict((conflict) => conflict.column("operation_id").doUpdateSet(replacement)));
		}
	}
	const preferredWindowProjection = params.preferredEntry ? bindSqliteSessionWindowEntryProjection({
		entry: params.preferredEntry,
		sessionKey: params.canonicalKey
	}) : void 0;
	const preferredWindowProvenance = params.preferredEntry ? executeSqliteQueryTakeFirstSync(params.destination.db, destinationDb.selectFrom("session_windows").select([
		"session_entry_provenance",
		"acp_owned",
		"plugin_owner_id",
		"hook_external_content_source"
	]).where("session_id", "=", params.preferredEntry.sessionId)) : void 0;
	for (const window of windows) {
		const canonicalWindow = {
			...window,
			session_key: params.canonicalKey,
			parent_session_key: window.parent_session_key && sourceLineageIdentities.has(normalizeStoreSessionKey(window.parent_session_key.trim())) ? params.canonicalKey : window.parent_session_key,
			spawned_by: window.spawned_by && sourceLineageIdentities.has(normalizeStoreSessionKey(window.spawned_by.trim())) ? params.canonicalKey : window.spawned_by,
			...preferredWindowProjection && window.session_id === params.preferredEntry?.sessionId ? {
				...preferredWindowProjection,
				...preferredWindowProvenance
			} : {}
		};
		const { session_id: _sessionId, ...replacement } = { ...canonicalWindow };
		executeSqliteQuerySync(params.destination.db, destinationDb.insertInto("session_windows").values(canonicalWindow).onConflict((conflict) => conflict.column("session_id").doUpdateSet(replacement)));
	}
	const copiedWindowIds = new Set(windows.map((row) => row.session_id));
	for (const sessionId of entrySessionIds) {
		if (copiedWindowIds.has(sessionId)) continue;
		const entry = (params.preferredEntry?.sessionId === sessionId ? params.preferredEntry : void 0) ?? params.sourceEntries.find((candidate) => candidate.sessionId === sessionId) ?? params.sourceEntries.find((candidate) => new Set(collectSqliteSessionStateIdsForEntry(candidate)).has(sessionId));
		const updatedAt = entry?.updatedAt ?? Date.now();
		const recoveryWindow = {
			session_key: params.canonicalKey,
			previous_session_id: entry?.sessionId === sessionId ? entry.previousSessionId ?? null : null,
			reason: "recovery",
			session_scope: "conversation",
			created_at: updatedAt,
			updated_at: updatedAt
		};
		executeSqliteQuerySync(params.destination.db, destinationDb.insertInto("session_windows").values({
			session_id: sessionId,
			...recoveryWindow
		}).onConflict((conflict) => conflict.column("session_id").doUpdateSet({ session_key: params.canonicalKey })));
	}
	for (const link of sessionLinks) executeSqliteQuerySync(params.destination.db, destinationDb.insertInto("session_conversations").values(link).onConflict((conflict) => conflict.columns([
		"session_id",
		"conversation_id",
		"role"
	]).doUpdateSet({
		first_seen_at: link.first_seen_at,
		last_seen_at: link.last_seen_at
	})));
	for (const sessionId of sessionIds) {
		if (!copySqliteSessionGenerationRows({
			destination: params.destination,
			sessionId,
			source: params.source,
			sourceWindowPresent: copiedWindowIds.has(sessionId)
		})) continue;
		deleteSessionTranscriptIndexInTransaction(params.destination.db, sessionId);
		reconcileSessionTranscriptIndexInTransaction(params.destination.db, sessionId);
		publishSqliteSessionEntryCacheInvalidation(params.destination);
	}
	deleteSessionMembersForRepair(params.destination, params.canonicalKey);
	copySessionNodeArtifactsForRepair(params.source, params.destination, sourceKeys, params.canonicalKey, { includeMembers: false });
	copySessionNodeArtifactsForRepair(params.source, params.destination, params.preferredSessionKey ? [params.preferredSessionKey] : sourceKeys, params.canonicalKey);
}
function copySqliteSessionGenerationRows(params) {
	const sourceDb = getSessionKysely(params.source.db);
	const destinationDb = getSessionKysely(params.destination.db);
	const transcriptEvents = executeSqliteQuerySync(params.source.db, sourceDb.selectFrom("transcript_events").selectAll().where("session_id", "=", params.sessionId)).rows;
	const transcriptIdentities = executeSqliteQuerySync(params.source.db, sourceDb.selectFrom("transcript_event_identities").selectAll().where("session_id", "=", params.sessionId)).rows;
	const rewriteWatermarks = executeSqliteQuerySync(params.source.db, sourceDb.selectFrom("transcript_rewrite_watermarks").selectAll().where("session_id", "=", params.sessionId)).rows;
	const trajectoryEvents = executeSqliteQuerySync(params.source.db, sourceDb.selectFrom("trajectory_runtime_events").selectAll().where("session_id", "=", params.sessionId)).rows;
	const parentStreamEvents = executeSqliteQuerySync(params.source.db, sourceDb.selectFrom("acp_parent_stream_events").selectAll().where("session_id", "=", params.sessionId)).rows;
	if (!params.sourceWindowPresent && transcriptEvents.length === 0 && transcriptIdentities.length === 0 && rewriteWatermarks.length === 0 && trajectoryEvents.length === 0 && parentStreamEvents.length === 0) return false;
	for (const table of [
		"transcript_event_identities",
		"transcript_events",
		"transcript_rewrite_watermarks",
		"trajectory_runtime_events",
		"acp_parent_stream_events"
	]) executeSqliteQuerySync(params.destination.db, destinationDb.deleteFrom(table).where("session_id", "=", params.sessionId));
	for (const row of transcriptEvents) executeSqliteQuerySync(params.destination.db, destinationDb.insertInto("transcript_events").values(row));
	for (const row of transcriptIdentities) executeSqliteQuerySync(params.destination.db, destinationDb.insertInto("transcript_event_identities").values(row));
	for (const row of rewriteWatermarks) executeSqliteQuerySync(params.destination.db, destinationDb.insertInto("transcript_rewrite_watermarks").values(row));
	for (const row of trajectoryEvents) executeSqliteQuerySync(params.destination.db, destinationDb.insertInto("trajectory_runtime_events").values(row));
	for (const row of parentStreamEvents) executeSqliteQuerySync(params.destination.db, destinationDb.insertInto("acp_parent_stream_events").values(row));
	return true;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-lifecycle.ts
function deleteSessionBoardRows(database, sessionKeys) {
	const keys = [...new Set(sessionKeys)];
	if (keys.length === 0) return;
	const db = getNodeSqliteKysely(database.db);
	const tableRows = executeSqliteQuerySync(database.db, db.selectFrom("sqlite_schema").select("name").where("type", "=", "table").where("name", "in", ["board_tabs", "board_widgets"])).rows;
	const tables = new Set(tableRows.map((row) => row.name));
	if (!tables.has("board_tabs") || !tables.has("board_widgets")) return;
	executeSqliteQuerySync(database.db, db.deleteFrom("board_widgets").where("session_key", "in", keys));
	executeSqliteQuerySync(database.db, db.deleteFrom("board_tabs").where("session_key", "in", keys));
}
async function cleanupSqliteSessionLifecycleArtifacts(params) {
	const sessionKeySegmentPrefix = params.sessionKeySegmentPrefix.trim();
	const transcriptContentMarker = params.transcriptContentMarker;
	const pluginOwnerId = params.pluginOwnerId?.trim();
	if (!sessionKeySegmentPrefix || !transcriptContentMarker) return {
		removedEntries: 0,
		archivedTranscriptArtifacts: 0
	};
	const resolved = resolveSqliteReadScope({
		...params.agentId ? { agentId: params.agentId } : {},
		storePath: params.storePath
	});
	const databaseOptions = toDatabaseOptions(resolved);
	if (!withOpenClawAgentDatabaseReadOnly(() => true, databaseOptions).found) return {
		removedEntries: 0,
		archivedTranscriptArtifacts: 0
	};
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		const cleanupPlan = planSqliteSessionLifecycleArtifactCleanup(openOpenClawAgentDatabase(databaseOptions), {
			...params.agentId !== void 0 ? { agentId: resolved.agentId } : {},
			archiveRemovedEntryTranscripts: params.archiveRemovedEntryTranscripts !== false,
			archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
			...pluginOwnerId ? { pluginOwnerId } : {},
			sessionKeySegmentPrefix,
			transcriptContentMarker,
			orphanTranscriptMinAgeMs: params.orphanTranscriptMinAgeMs,
			nowMs: params.nowMs ?? Date.now()
		});
		const materializedPlans = materializeSqliteSessionStateDeletePlans(cleanupPlan.deletePlans);
		let removedEntries = 0;
		let archivedTranscripts = [];
		runOpenClawAgentWriteTransaction((transactionDb) => {
			assertPlannedSqliteLifecycleArtifactEntriesUnchanged(transactionDb, cleanupPlan.entries);
			archivedTranscripts = deleteMaterializedSqliteSessionStatePlans(transactionDb, materializedPlans, void 0, new Set(cleanupPlan.entries.map((entry) => entry.sessionKey)));
			removedEntries = deletePlannedSqliteLifecycleArtifactEntries(transactionDb, cleanupPlan.entries);
		}, databaseOptions);
		emitCommittedSessionEntryRemovals(cleanupPlan.entries);
		return {
			removedEntries,
			archivedTranscriptArtifacts: archivedTranscripts.length
		};
	});
}
/** Resets one persisted session entry using SQLite session rows. */
async function resetSqliteSessionEntryLifecycle(params) {
	const agentId = params.agentId ?? parseAgentSessionKey(params.target.canonicalKey)?.agentId;
	const resolved = resolveSqliteStoreScope(params.storePath, { agentId });
	try {
		return await runExclusiveSqliteSessionWrite(resolved, async () => {
			const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
			const targetSnapshot = readSqliteLifecycleTargetSnapshot(database, params.target);
			const current = targetSnapshot.primary;
			const nextEntry = await params.buildNextEntry({
				currentEntry: current ? cloneSessionEntry(current.entry) : void 0,
				primaryKey: params.target.canonicalKey
			});
			const resetBoundaryPlan = params.resetBoundaryReason && current?.entry.sessionId && !sqliteSessionEntriesEqual(current.entry, nextEntry) ? await buildSessionResetBoundaryPlan({
				events: loadSqliteTranscriptEventsFromDatabase(database, current.entry.sessionId),
				reason: params.resetBoundaryReason
			}) : void 0;
			const mutation = {
				nextEntry: cloneSessionEntry(nextEntry),
				...current ? { previousEntry: cloneSessionEntry(current.entry) } : {},
				...current?.entry.sessionId ? { previousSessionId: current.entry.sessionId } : {}
			};
			runOpenClawAgentWriteTransaction((transactionDb) => {
				assertSqliteLifecycleTargetUnchanged(transactionDb, params.target, current?.entry, "reset");
				if (resetBoundaryPlan && current?.entry.sessionId) {
					const events = [...resetBoundaryPlan.seedEvents, resetBoundaryPlan.event];
					if (appendTranscriptEventsInTransaction(transactionDb, {
						...resolved,
						sessionId: current.entry.sessionId,
						sessionKey: current.key
					}, events) !== events.length) throw new Error(`Failed to append reset boundary for ${current.key}`);
				}
				writeSessionEntry(transactionDb, params.target.canonicalKey, nextEntry, { previousEntry: current?.entry ?? null });
				rehomeSqliteSessionWindows(transactionDb, params.target.canonicalKey, params.target.storeKeys);
				deleteLegacySessionEntryRows(transactionDb, params.target.storeKeys, params.target.canonicalKey, { rehomeMembers: current?.entry.sessionId === nextEntry.sessionId });
			}, toDatabaseOptions(resolved));
			if (current) emitSessionIdentityMutation({
				kind: "reset",
				previous: {
					...current.entry.sessionId ? { sessionId: current.entry.sessionId } : {},
					sessionKeys: targetSnapshot.rows.map((row) => row.sessionKey)
				},
				current: {
					...nextEntry.sessionId ? { sessionId: nextEntry.sessionId } : {},
					sessionKeys: [params.target.canonicalKey]
				}
			});
			else emitSessionIdentityMutation({
				kind: "create",
				previous: { sessionKeys: [] },
				current: {
					...nextEntry.sessionId ? { sessionId: nextEntry.sessionId } : {},
					sessionKeys: [params.target.canonicalKey]
				}
			});
			await params.afterEntryMutation?.(mutation);
			return {
				...mutation,
				archivedTranscripts: []
			};
		});
	} finally {
		kickSessionHistoryDiskBudgetMaintenance({
			...resolved.agentId ? { agentId: resolved.agentId } : {},
			storePath: params.storePath,
			force: true
		});
	}
}
async function deleteSqliteSessionEntryLifecycleInternal(params, allowLockedEntryRemoval, expectedPluginOwnerId) {
	const agentId = params.agentId ?? parseAgentSessionKey(params.target.canonicalKey)?.agentId;
	const resolved = resolveSqliteStoreScope(params.storePath, { agentId });
	try {
		return await deleteSqliteSessionEntryLifecycleLocked(resolved, params, allowLockedEntryRemoval, expectedPluginOwnerId);
	} finally {
		kickSessionHistoryDiskBudgetMaintenance({
			...params.agentId ? { agentId: params.agentId } : {},
			storePath: params.storePath,
			force: true
		});
	}
}
async function deleteSqliteSessionEntryLifecycleLocked(resolved, params, allowLockedEntryRemoval, expectedPluginOwnerId) {
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		let result = {
			archivedTranscripts: [],
			deleted: false
		};
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		const targetSnapshot = readSqliteLifecycleTargetSnapshot(database, params.target);
		const current = targetSnapshot.primary;
		if (!current) return result;
		if (current.entry.modelSelectionLocked === true && !allowLockedEntryRemoval) throw new Error(MODEL_SELECTION_LOCK_REMOVAL_MESSAGE);
		if (expectedPluginOwnerId && targetSnapshot.rows.some(({ entry, sessionKey }) => isAgentHarnessSessionKey(sessionKey) || entry.agentHarnessId !== void 0 || entry.modelSelectionLocked !== true || normalizeOptionalString(entry.pluginOwnerId) !== expectedPluginOwnerId)) throw new Error(MODEL_SELECTION_LOCK_REMOVAL_MESSAGE);
		const referencedAfterDelete = readReferencedSqliteSessionIdsAfterTargetMutation(database, params.target);
		const deleteTranscriptState = params.archiveTranscript || params.deleteTranscriptWithoutArchive === true;
		const archiveDirectory = resolveSqliteTranscriptArchiveDirectory(resolved);
		const entryPlans = deleteTranscriptState ? targetSnapshot.rows.flatMap(({ entry }) => planSqliteSessionStateAfterEntryRemoval({
			archiveDirectory,
			archiveTranscript: params.archiveTranscript,
			database,
			entry,
			reason: "deleted",
			referencedSessionIds: referencedAfterDelete
		})) : [];
		const entryPlanIds = new Set(entryPlans.map((plan) => plan.sessionId));
		const historicalGenerationIds = deleteTranscriptState ? readSqliteSessionGenerationIdsForKeys(database, [
			params.target.canonicalKey,
			...params.target.storeKeys,
			...targetSnapshot.rows.map((row) => row.sessionKey)
		]).filter((sessionId) => !entryPlanIds.has(sessionId)) : [];
		const preflightFence = collectAdmissionProtectedSessionIds({
			database,
			storePath: params.storePath
		});
		for (const sessionId of historicalGenerationIds) if (preflightFence.has(sessionId) && !referencedAfterDelete.has(sessionId)) throw new Error(`cannot delete session history while work is in flight for ${sessionId}; retry after the run completes`);
		const historicalArchivedTranscripts = [];
		for (const sessionId of historicalGenerationIds) {
			if (referencedAfterDelete.has(sessionId)) continue;
			if (collectAdmissionProtectedSessionIds({
				database,
				storePath: params.storePath
			}).has(sessionId)) throw new Error(`cannot delete session history while work is in flight for ${sessionId}; retry after the run completes`);
			const plan = planSqliteSessionStateDeleteIfUnreferenced({
				archiveDirectory,
				archiveTranscript: params.archiveTranscript,
				database,
				reason: "deleted",
				referencedSessionIds: referencedAfterDelete,
				sessionId
			});
			if (!plan) continue;
			const materializedGeneration = materializeSqliteSessionStateDeletePlans([plan]);
			const archivedGeneration = [];
			runOpenClawAgentWriteTransaction((transactionDb) => {
				if (collectAdmissionProtectedSessionIds({
					database: transactionDb,
					storePath: params.storePath
				}).has(sessionId)) throw new Error(`cannot delete session history while work is in flight for ${sessionId}; retry after the run completes`);
				archivedGeneration.push(...deleteMaterializedSqliteSessionStatePlans(transactionDb, materializedGeneration));
			}, toDatabaseOptions(resolved));
			emitArchivedSqliteTranscriptUpdates(archivedGeneration);
			historicalArchivedTranscripts.push(...archivedGeneration);
		}
		const materializedPlans = materializeSqliteSessionStateDeletePlans(entryPlans);
		runOpenClawAgentWriteTransaction((transactionDb) => {
			const transactionSnapshot = readSqliteLifecycleTargetSnapshot(transactionDb, params.target);
			assertSqliteLifecycleTargetSnapshotUnchanged(targetSnapshot, transactionSnapshot, "delete session entry");
			const transactionEntry = transactionSnapshot.primary?.entry;
			if (!shouldDeleteSqliteSessionEntryLifecycle(transactionEntry, params)) return;
			const archivedTranscripts = deleteMaterializedSqliteSessionStatePlans(transactionDb, materializedPlans, void 0, /* @__PURE__ */ new Set([
				params.target.canonicalKey,
				...params.target.storeKeys,
				...transactionSnapshot.rows.map((row) => row.sessionKey)
			]));
			deleteSqliteLifecycleTargetRows(transactionDb, params.target);
			deleteSessionBoardRows(transactionDb, [
				params.target.canonicalKey,
				...params.target.storeKeys,
				...transactionSnapshot.rows.map((row) => row.sessionKey)
			]);
			result = {
				archivedTranscripts,
				deleted: true,
				deletedEntry: cloneSessionEntry(current.entry),
				...current.entry.sessionId ? { deletedSessionId: current.entry.sessionId } : {}
			};
		}, toDatabaseOptions(resolved));
		if (result.deleted) emitSessionIdentityMutation({
			kind: "delete",
			previous: {
				...current.entry.sessionId ? { sessionId: current.entry.sessionId } : {},
				sessionKeys: targetSnapshot.rows.map((row) => row.sessionKey)
			}
		});
		emitArchivedSqliteTranscriptUpdates(result.archivedTranscripts);
		result.archivedTranscripts.push(...historicalArchivedTranscripts);
		return result;
	});
}
/** Deletes one persisted session entry using SQLite session rows. */
async function deleteSqliteSessionEntryLifecycle(params) {
	return await deleteSqliteSessionEntryLifecycleInternal(params, false);
}
/** Rolls back one exact locked row created by failed trusted harness initialization. */
async function rollbackSqliteAgentHarnessSessionEntryLifecycle(params) {
	const hasExactTarget = params.target.storeKeys.length === 1 && params.target.storeKeys[0] === params.target.canonicalKey;
	const expectedEntryError = resolveAgentHarnessSessionStoreEntryError(params.target.canonicalKey, params.expectedEntry);
	if (!hasExactTarget || expectedEntryError || !isValidAgentHarnessSessionStoreEntry(params.target.canonicalKey, params.expectedEntry)) throw new Error(expectedEntryError ?? "Model-selection-locked sessions cannot be removed, unlocked, or reassigned.");
	return await deleteSqliteSessionEntryLifecycleInternal(params, true);
}
/** Rolls back one exact locked CLI row created by a failed plugin initializer. */
async function rollbackSqlitePluginOwnedSessionEntryLifecycle(params) {
	const expectedEntry = params.expectedEntry;
	const validPluginOwner = normalizeOptionalString(expectedEntry.pluginOwnerId);
	const expectedPluginOwner = normalizeOptionalString(params.expectedPluginOwnerId);
	if (isAgentHarnessSessionKey(params.target.canonicalKey) || expectedEntry.agentHarnessId !== void 0 || expectedEntry.modelSelectionLocked !== true || !validPluginOwner || validPluginOwner !== expectedPluginOwner) throw new Error(MODEL_SELECTION_LOCK_REMOVAL_MESSAGE);
	return await deleteSqliteSessionEntryLifecycleInternal(params, true, expectedPluginOwner);
}
/** Applies prepared full-row replacements in one validated SQLite transaction. */
function shouldDeleteSqliteSessionEntryLifecycle(entry, params) {
	if (!entry) return false;
	if (params.expectedEntry !== void 0 && !sqliteSessionEntriesEqual(entry, params.expectedEntry)) return false;
	if (params.expectedSessionId !== void 0 && (params.expectedSessionId === null ? entry.sessionId !== void 0 : entry.sessionId !== params.expectedSessionId)) return false;
	if (params.expectedLifecycleRevision !== void 0 && entry.lifecycleRevision !== params.expectedLifecycleRevision) return false;
	if (params.expectedUpdatedAt !== void 0 && entry.updatedAt !== params.expectedUpdatedAt) return false;
	return true;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-projection.ts
let sessionArchiveRuntimePromise;
function loadSessionArchiveRuntime() {
	sessionArchiveRuntimePromise ??= import("./session-archive.runtime.js");
	return sessionArchiveRuntimePromise;
}
async function applySqliteSessionEntryReplacements(params) {
	const resolved = resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		sessionKey: params.activeSessionKey ?? params.sessionKeys?.[0] ?? "",
		storePath: params.storePath
	});
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		const selectedKeys = params.sessionKeys ? new Set(params.sessionKeys) : void 0;
		const selectedStatuses = params.statuses ? new Set(params.statuses) : void 0;
		const entries = selectedStatuses ? readSqliteSessionEntriesByStatus(database, [...selectedStatuses], params.sessionKeys) : selectedKeys ? [...selectedKeys].flatMap((sessionKey) => {
			const entry = readExactSessionEntryRow(database, sessionKey)?.entry;
			return entry ? [{
				entry: cloneSessionEntry(entry),
				sessionKey
			}] : [];
		}) : Object.entries(readSqliteSessionEntryStore(database)).map(([sessionKey, entry]) => ({
			entry: cloneSessionEntry(entry),
			sessionKey
		}));
		const replacementAuthorityKeys = selectedStatuses ? new Set(entries.map(({ sessionKey }) => sessionKey)) : selectedKeys;
		const operation = await params.update(entries.map(({ entry, sessionKey }) => ({
			entry: cloneSessionEntry(entry),
			sessionKey
		})));
		const replacements = [...operation.replacements ?? []];
		for (const replacement of replacements) if (replacementAuthorityKeys && !replacementAuthorityKeys.has(replacement.sessionKey)) throw new Error(`Session entry replacement is outside the selected ${selectedStatuses ? "row" : "key"} set: ${replacement.sessionKey}`);
		const expectedEntries = new Map(entries.map(({ sessionKey, entry }) => [sessionKey, entry]));
		const applicable = replacements.filter((replacement) => expectedEntries.has(replacement.sessionKey));
		if (params.requireWriteSuccess && replacements.length > 0 && applicable.length === 0) throw new Error("session entry replacements did not persist any rows");
		if (applicable.length === 0) return operation.result;
		const maintenancePlans = [];
		runOpenClawAgentWriteTransaction((transactionDb) => {
			for (const replacement of applicable) {
				const current = readExactSessionEntryRow(transactionDb, replacement.sessionKey)?.entry;
				if (!sqliteSessionEntriesEqual(current, expectedEntries.get(replacement.sessionKey))) throw new Error(`SQLite session entry changed before replacement for ${replacement.sessionKey}`);
			}
			for (const replacement of applicable) writeSessionEntry(transactionDb, replacement.sessionKey, cloneSessionEntry(replacement.entry), { previousEntry: expectedEntries.get(replacement.sessionKey) ?? null });
			maintenancePlans.push(applySqliteSessionEntryMaintenance(transactionDb, {
				activeSessionKey: params.activeSessionKey ?? "",
				archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
				skipMaintenance: params.skipMaintenance ?? true,
				storePath: params.storePath
			}));
		}, toDatabaseOptions(resolved), { operationLabel: "session.entry-replacements" });
		const finalReplacements = new Map(applicable.map((replacement) => [replacement.sessionKey, replacement]));
		for (const replacement of finalReplacements.values()) {
			const previousEntry = expectedEntries.get(replacement.sessionKey);
			if (previousEntry) emitCommittedSessionEntryChange({
				currentEntry: replacement.entry,
				currentKey: replacement.sessionKey,
				previousEntry,
				previousKey: replacement.sessionKey
			});
		}
		finalizeSqliteSessionEntryMaintenancePlansBestEffort(resolved, maintenancePlans);
		return operation.result;
	});
}
/**
* Applies a detached whole-store projection under the SQLite writer lane.
* This exists only for bounded compatibility adapters that must preserve a
* legacy serialized callback without exposing mutable storage internals.
*/
async function applySqliteSessionStoreProjection(params) {
	const resolved = resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		sessionKey: params.activeSessionKey ?? "",
		storePath: params.storePath
	});
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		const before = readSqliteSessionEntryStore(openOpenClawAgentDatabase(toDatabaseOptions(resolved)));
		const projected = structuredClone(before);
		const operation = await params.update(projected);
		if (!operation.persist) return operation.result;
		const transitionError = resolveAgentHarnessSessionStoreTransitionError({
			before: new Map(Object.entries(before).filter(([, entry]) => entry.modelSelectionLocked === true)),
			store: projected
		});
		const storeError = resolveAgentHarnessSessionStoreError(projected);
		if (transitionError || storeError) throw new Error(transitionError ?? storeError);
		const changedKeys = uniqueStrings([...Object.keys(before), ...Object.keys(projected)]).filter((sessionKey) => !sqliteSessionEntriesEqual(before[sessionKey], projected[sessionKey]));
		if (changedKeys.length === 0) return operation.result;
		const maintenancePlans = [];
		runOpenClawAgentWriteTransaction((transactionDb) => {
			for (const sessionKey of changedKeys) {
				const current = readExactSessionEntryRow(transactionDb, sessionKey)?.entry;
				if (!sqliteSessionEntriesEqual(current, before[sessionKey])) throw new Error(`SQLite session entry changed before store projection for ${sessionKey}`);
			}
			for (const sessionKey of changedKeys) {
				const entry = projected[sessionKey];
				if (entry) writeSessionEntry(transactionDb, sessionKey, cloneSessionEntry(entry), { previousEntry: before[sessionKey] ?? null });
				else deleteSqliteSessionEntryRows(transactionDb, sessionKey);
			}
			maintenancePlans.push(applySqliteSessionEntryMaintenance(transactionDb, {
				activeSessionKey: params.activeSessionKey ?? "",
				archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
				skipMaintenance: params.skipMaintenance,
				storePath: params.storePath
			}));
		}, toDatabaseOptions(resolved), { operationLabel: "session.store-projection" });
		finalizeSqliteSessionEntryMaintenancePlansBestEffort(resolved, maintenancePlans);
		return operation.result;
	});
}
function readProjectedRemovalEntry(database, projected, allowCanonicalRepair = false) {
	const expectedRawEntryJson = projected.removal.expectedRawEntryJson;
	if (expectedRawEntryJson === void 0) return (allowCanonicalRepair ? readExactSessionEntryRowForCanonicalRepair(database, projected.sessionKey, { allowMalformedRowRepair: true }) : readExactSessionEntryRow(database, projected.sessionKey))?.entry;
	if (readExactSessionEntryJsonForCanonicalRepair(database, projected.sessionKey) !== expectedRawEntryJson) throw new Error(`SQLite session entry changed before raw lifecycle removal for ${projected.sessionKey}`);
	return projected.expectedEntry;
}
/** Applies exact lifecycle removals/upserts using SQLite session rows. */
async function applySqliteSessionEntryLifecycleMutation(params) {
	const resolved = resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		sessionKey: "",
		storePath: params.storePath
	});
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		const removals = [...params.removals ?? []];
		const upserts = [...params.upserts ?? []];
		const removedSessionKeys = [];
		let archivedTranscripts = [];
		const maintenancePlans = [];
		let artifactCleanupError;
		const captureArtifactCleanupError = (error) => {
			if (params.captureArtifactCleanupError === true) {
				artifactCleanupError ??= error;
				return;
			}
			throw error;
		};
		const projected = await projectSqliteSessionEntryLifecycleMutation(openOpenClawAgentDatabase(toDatabaseOptions(resolved)), {
			...params.allowCanonicalRepair ? { allowCanonicalRepair: true } : {},
			archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
			removals,
			upserts
		});
		let materializedRemovalPlans = [];
		try {
			materializedRemovalPlans = materializeSqliteSessionStateDeletePlans(projected.deletePlans);
		} catch (error) {
			captureArtifactCleanupError(error);
		}
		runOpenClawAgentWriteTransaction((transactionDb) => {
			const validatedRemovals = projected.removals.filter((removal) => {
				const entry = readProjectedRemovalEntry(transactionDb, removal, params.allowCanonicalRepair);
				if (!sqliteSessionEntriesEqual(entry, removal.expectedEntry)) {
					const replacedInSameMutation = projected.upsertedEntries.some((upsert) => upsert.sessionKey === removal.sessionKey);
					throw new Error(replacedInSameMutation ? `SQLite session entry has stale lifecycle state for ${removal.sessionKey}` : `SQLite session entry changed before lifecycle removal for ${removal.sessionKey}`);
				}
				const shouldRemove = shouldRemoveSqliteSessionEntry(entry, removal.removal);
				if (!shouldRemove && projected.upsertedEntries.some((upsert) => upsert.sessionKey === removal.sessionKey)) throw new Error(`SQLite session entry has stale lifecycle state for ${removal.sessionKey}`);
				return shouldRemove;
			});
			archivedTranscripts = deleteMaterializedSqliteSessionStatePlans(transactionDb, materializedRemovalPlans, void 0, new Set(validatedRemovals.map((removal) => removal.sessionKey)));
			const legacyReplacementTargets = /* @__PURE__ */ new Map();
			for (const { sessionKey, entry, expectedEntry, resetBoundaryPlan } of projected.upsertedEntries) {
				const sameKeyRemoval = validatedRemovals.find((removal) => removal.sessionKey === sessionKey);
				const currentEntry = sameKeyRemoval ? readProjectedRemovalEntry(transactionDb, sameKeyRemoval, params.allowCanonicalRepair) : (params.allowCanonicalRepair ? readExactSessionEntryRowForCanonicalRepair(transactionDb, sessionKey, { allowMalformedRowRepair: true }) : readExactSessionEntryRow(transactionDb, sessionKey))?.entry;
				const expectedCurrentEntry = expectedEntry ?? sameKeyRemoval?.expectedEntry;
				if (!sqliteSessionEntriesEqual(currentEntry, expectedCurrentEntry)) {
					if (sameKeyRemoval) throw new Error(`SQLite session entry has stale lifecycle state for ${sessionKey}`);
					throw new Error(`SQLite session entry changed before lifecycle upsert for ${sessionKey}`);
				}
				if (sameKeyRemoval && !shouldRemoveSqliteSessionEntry(currentEntry, sameKeyRemoval.removal)) throw new Error(`SQLite session entry has stale lifecycle state for ${sessionKey}`);
				if (resetBoundaryPlan && expectedEntry?.sessionId) {
					const events = [...resetBoundaryPlan.seedEvents, resetBoundaryPlan.event];
					if (appendTranscriptEventsInTransaction(transactionDb, {
						...resolved,
						sessionId: expectedEntry.sessionId,
						sessionKey
					}, events) !== events.length) throw new Error(`Failed to append reset boundary for ${sessionKey}`);
				}
				writeSessionEntry(transactionDb, sessionKey, entry, {
					allowStoredAliases: params.allowCanonicalRepair === true,
					preserveNodeSuggestions: params.allowCanonicalRepair === true,
					previousEntry: expectedCurrentEntry ?? null
				});
				const relatedRemovalKeys = validatedRemovals.flatMap((removal) => {
					const removedSessionId = removal.expectedEntry.sessionId;
					return removal.sessionKey !== sessionKey && (removedSessionId === entry.sessionId || removedSessionId === entry.previousSessionId) ? [removal.sessionKey] : [];
				});
				rehomeSqliteSessionWindows(transactionDb, sessionKey, relatedRemovalKeys);
				for (const legacyKey of relatedRemovalKeys) {
					const removedEntry = validatedRemovals.find((removal) => removal.sessionKey === legacyKey)?.expectedEntry;
					legacyReplacementTargets.set(legacyKey, {
						canonicalKey: sessionKey,
						rehomeMembers: removedEntry?.sessionId === entry.sessionId
					});
				}
			}
			params.afterUpsertsInTransaction?.(transactionDb);
			const upsertedKeys = new Set(projected.upsertedEntries.map((upsert) => upsert.sessionKey));
			for (const removal of validatedRemovals) {
				if (upsertedKeys.has(removal.sessionKey)) continue;
				const entry = readProjectedRemovalEntry(transactionDb, removal, params.allowCanonicalRepair);
				if (!sqliteSessionEntriesEqual(entry, removal.expectedEntry)) throw new Error(`SQLite session entry changed before lifecycle removal for ${removal.sessionKey}`);
				if (!shouldRemoveSqliteSessionEntry(entry, removal.removal)) continue;
				const replacement = legacyReplacementTargets.get(removal.sessionKey);
				if (replacement) deleteLegacySessionEntryRows(transactionDb, [removal.sessionKey], replacement.canonicalKey, { rehomeMembers: replacement.rehomeMembers });
				else deleteSqliteSessionEntryRows(transactionDb, removal.sessionKey, {
					deleteOwnedWindows: removal.removal.deleteOwnedWindows === true,
					deliveryCleanupKeys: removal.removal.deliveryCleanupKeys
				});
				removedSessionKeys.push(removal.sessionKey);
			}
			maintenancePlans.push(applySqliteSessionEntryMaintenance(transactionDb, {
				activeSessionKey: params.activeSessionKey ?? "",
				archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
				forceMaintenance: params.maintenanceOverride !== void 0,
				maintenanceConfig: params.maintenanceOverride ? {
					...resolveMaintenanceConfig(),
					...params.maintenanceOverride
				} : void 0,
				skipMaintenance: params.skipMaintenance,
				storePath: params.storePath
			}));
		}, toDatabaseOptions(resolved));
		emitCommittedLifecycleIdentityMutations({
			projected,
			removedSessionKeys
		});
		const maintenanceArchivedTranscripts = finalizeSqliteSessionEntryMaintenancePlansBestEffort(resolved, maintenancePlans);
		archivedTranscripts = [...archivedTranscripts, ...maintenanceArchivedTranscripts];
		const afterCount = readSqliteSessionEntryCount(openOpenClawAgentDatabase(toDatabaseOptions(resolved)));
		emitArchivedSqliteTranscriptUpdates(archivedTranscripts);
		const archivedTranscriptDirectories = uniqueStrings(archivedTranscripts.map((transcript) => path.dirname(transcript.archivedPath))).toSorted();
		if (archivedTranscriptDirectories.length > 0 && params.cleanupArchivedTranscripts) try {
			const { cleanupArchivedSessionTranscripts } = await loadSessionArchiveRuntime();
			await cleanupArchivedSessionTranscripts({
				directories: archivedTranscriptDirectories,
				rules: params.cleanupArchivedTranscripts.rules,
				nowMs: params.cleanupArchivedTranscripts.nowMs
			});
		} catch (error) {
			captureArtifactCleanupError(error);
		}
		return {
			removedEntries: removedSessionKeys.length,
			removedSessionKeys,
			archivedTranscriptDirectories,
			unreferencedArtifacts: null,
			maintenanceReport: null,
			afterCount,
			artifactCleanupError
		};
	});
}
/** Purges entries owned by a deleted agent from SQLite session rows. */
async function purgeSqliteDeletedAgentSessionEntries(params) {
	const resolved = resolveSqliteStoreScope(params.storePath, { agentId: params.storeAgentId });
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		const store = readSqliteSessionEntryStore(database);
		const remainingStore = { ...store };
		const entryRemovals = [];
		const removedEntriesToArchive = [];
		for (const sessionKey of Object.keys(store)) {
			if (resolveStoredSessionOwnerAgentId({
				cfg: params.cfg,
				agentId: params.storeAgentId,
				sessionKey
			}) !== params.agentId) continue;
			const entry = store[sessionKey];
			if (!entry) continue;
			entryRemovals.push({
				expectedEntry: cloneSessionEntry(entry),
				sessionKey
			});
			removedEntriesToArchive.push(entry);
			delete remainingStore[sessionKey];
		}
		const referencedSessionIds = collectProjectedReferencedSqliteSessionIds({
			database,
			excludedSessionKeys: entryRemovals.map((removal) => removal.sessionKey),
			projectedStore: remainingStore
		});
		const materializedPlans = materializeSqliteSessionStateDeletePlans(removedEntriesToArchive.flatMap((entry) => planSqliteSessionStateAfterEntryRemoval({
			archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
			database,
			entry,
			reason: "deleted",
			referencedSessionIds
		})));
		const removedSessionKeys = entryRemovals.map((removal) => removal.sessionKey);
		let archivedTranscripts = [];
		const maintenancePlans = [];
		runOpenClawAgentWriteTransaction((transactionDb) => {
			assertPlannedSqliteLifecycleArtifactEntriesUnchanged(transactionDb, entryRemovals);
			archivedTranscripts = deleteMaterializedSqliteSessionStatePlans(transactionDb, materializedPlans, void 0, new Set(entryRemovals.map((removal) => removal.sessionKey)));
			deletePlannedSqliteLifecycleArtifactEntries(transactionDb, entryRemovals);
			maintenancePlans.push(applySqliteSessionEntryMaintenance(transactionDb, {
				activeSessionKey: "",
				archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
				storePath: params.storePath
			}));
		}, toDatabaseOptions(resolved));
		emitCommittedSessionEntryRemovals(entryRemovals);
		archivedTranscripts = [...archivedTranscripts, ...finalizeSqliteSessionEntryMaintenancePlansBestEffort(resolved, maintenancePlans)];
		const afterCount = readSqliteSessionEntryCount(openOpenClawAgentDatabase(toDatabaseOptions(resolved)));
		emitArchivedSqliteTranscriptUpdates(archivedTranscripts);
		return {
			removedEntries: removedSessionKeys.length,
			removedSessionKeys,
			archivedTranscriptDirectories: uniqueStrings(archivedTranscripts.map((transcript) => path.dirname(transcript.archivedPath))).toSorted(),
			unreferencedArtifacts: null,
			maintenanceReport: null,
			afterCount
		};
	});
}
/** Fully replaces rows for one transcript in the additive SQLite transcript store. */
//#endregion
//#region src/agents/usage.ts
/**
* Token usage normalization helpers.
* Converts provider-specific usage shapes into OpenClaw's normalized input,
* output, cache, reasoning, and total token accounting fields.
*/
/** Build a zeroed assistant usage snapshot. */
function makeZeroUsageSnapshot() {
	return {
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
	};
}
/** Return true when any normalized usage bucket is positive. */
function hasNonzeroUsage(usage) {
	if (!usage) return false;
	return [
		usage.input,
		usage.output,
		usage.cacheRead,
		usage.cacheWrite,
		usage.contextUsage?.state === "available" ? usage.contextUsage.promptTokens : void 0,
		usage.contextUsage?.state === "available" ? usage.contextUsage.totalTokens : void 0,
		usage.reasoningTokens,
		usage.total
	].some((v) => typeof v === "number" && Number.isFinite(v) && v > 0) || usage.contextUsage?.state === "unavailable";
}
const normalizeTokenCount = (value) => {
	const numeric = asFiniteNumber(value);
	if (numeric === void 0) return;
	if (numeric <= 0) return 0;
	return Math.min(Math.trunc(numeric), Number.MAX_SAFE_INTEGER);
};
/** Normalize provider-specific token usage fields into OpenClaw usage buckets. */
function normalizeUsage(raw) {
	if (!raw) return;
	const cacheRead = normalizeTokenCount(raw.cacheRead ?? raw.cache_read ?? raw.cache_read_input_tokens ?? raw.cached_tokens ?? raw.input_tokens_details?.cached_tokens ?? raw.prompt_tokens_details?.cached_tokens);
	const rawInputValue = raw.input ?? raw.inputTokens ?? raw.input_tokens ?? raw.promptTokens ?? raw.prompt_tokens ?? raw.prompt_n ?? raw.timings?.prompt_n;
	const usesOpenAIStylePromptTotals = raw.cached_tokens !== void 0 || raw.input_tokens_details?.cached_tokens !== void 0 || raw.prompt_tokens_details?.cached_tokens !== void 0;
	const rawInput = asFiniteNumber(rawInputValue);
	const normalizedInput = rawInput !== void 0 && usesOpenAIStylePromptTotals && cacheRead !== void 0 ? rawInput - cacheRead : rawInput;
	const input = normalizeTokenCount(normalizedInput);
	const output = normalizeTokenCount(raw.output ?? raw.outputTokens ?? raw.output_tokens ?? raw.completionTokens ?? raw.completion_tokens ?? raw.predicted_n ?? raw.timings?.predicted_n);
	const cacheWrite = normalizeTokenCount(raw.cacheWrite ?? raw.cache_write ?? raw.cache_creation_input_tokens);
	const contextPromptTokens = raw.contextUsage?.state === "available" ? normalizeTokenCount(raw.contextUsage.promptTokens) : void 0;
	const contextTotalTokens = raw.contextUsage?.state === "available" ? normalizeTokenCount(raw.contextUsage.totalTokens) : void 0;
	const contextUsage = raw.contextUsage?.state === "unavailable" ? { state: "unavailable" } : contextPromptTokens !== void 0 && contextTotalTokens !== void 0 && contextTotalTokens >= contextPromptTokens ? {
		state: "available",
		promptTokens: contextPromptTokens,
		totalTokens: contextTotalTokens
	} : void 0;
	const reasoningTokens = normalizeTokenCount(raw.reasoningTokens ?? raw.reasoning_tokens ?? raw.completion_tokens_details?.reasoning_tokens ?? raw.output_tokens_details?.reasoning_tokens ?? raw.output_tokens_details?.thinking_tokens);
	const total = normalizeTokenCount(raw.total ?? raw.totalTokens ?? raw.total_tokens);
	if (input === void 0 && output === void 0 && cacheRead === void 0 && cacheWrite === void 0 && contextUsage === void 0 && reasoningTokens === void 0 && total === void 0) return;
	return {
		input,
		output,
		cacheRead,
		cacheWrite,
		...contextUsage ? { contextUsage } : {},
		...reasoningTokens !== void 0 ? { reasoningTokens } : {},
		total
	};
}
/**
* Maps normalized usage to OpenAI Chat Completions `usage` fields.
*
* `prompt_tokens` is input + cacheRead (cache write is excluded to match the
* OpenAI-style breakdown used by the compat endpoint).
*
* `total_tokens` is the greater of the component sum and aggregate `total` when
* present, so a partial breakdown cannot discard a valid upstream total.
*
* `prompt_tokens_details.cached_tokens` is emitted when `cacheRead > 0` so
* downstream chat-completions clients can compute the cache-aware blended
* cost. Field name and shape match OpenAI's documented usage breakdown:
* https://platform.openai.com/docs/guides/prompt-caching
*/
function toOpenAiChatCompletionsUsage(usage) {
	const input = usage?.input ?? 0;
	const output = usage?.output ?? 0;
	const cacheRead = usage?.cacheRead ?? 0;
	const promptTokens = Math.max(0, input + cacheRead);
	const completionTokens = Math.max(0, output);
	const componentTotal = promptTokens + completionTokens;
	const aggregateRaw = usage?.total;
	const aggregateTotal = typeof aggregateRaw === "number" && Number.isFinite(aggregateRaw) ? Math.max(0, aggregateRaw) : void 0;
	const totalTokens = aggregateTotal !== void 0 ? Math.max(componentTotal, aggregateTotal) : componentTotal;
	const reasoningTokens = normalizeTokenCount(usage?.reasoningTokens);
	return {
		prompt_tokens: promptTokens,
		completion_tokens: completionTokens,
		total_tokens: totalTokens,
		...cacheRead > 0 ? { prompt_tokens_details: { cached_tokens: cacheRead } } : {},
		...reasoningTokens !== void 0 ? { completion_tokens_details: { reasoning_tokens: reasoningTokens } } : {}
	};
}
/**
* Maps normalized usage to OpenAI Responses `usage` fields.
*
* Responses reports cache reads and writes as subsets of `input_tokens`, so
* recombine OpenClaw's separately priced buckets and retain their details.
* Reasoning tokens remain a detail of `output_tokens`, not an extra bucket.
*/
function toOpenAiResponsesUsage(usage) {
	const input = Math.max(0, usage?.input ?? 0);
	const output = Math.max(0, usage?.output ?? 0);
	const cacheRead = Math.max(0, usage?.cacheRead ?? 0);
	const cacheWrite = Math.max(0, usage?.cacheWrite ?? 0);
	const reasoningTokens = Math.max(0, usage?.reasoningTokens ?? 0);
	const inputTokens = input + cacheRead + cacheWrite;
	const componentTotal = inputTokens + output;
	const aggregateTotal = Math.max(0, usage?.total ?? 0);
	return {
		input_tokens: inputTokens,
		input_tokens_details: {
			cached_tokens: cacheRead,
			cache_write_tokens: cacheWrite
		},
		output_tokens: output,
		output_tokens_details: { reasoning_tokens: reasoningTokens },
		total_tokens: Math.max(componentTotal, aggregateTotal)
	};
}
/** Derive prompt/context tokens from normalized input and cache buckets. */
function derivePromptTokens(usage) {
	if (!usage) return;
	const input = usage.input ?? 0;
	const cacheRead = usage.cacheRead ?? 0;
	const cacheWrite = usage.cacheWrite ?? 0;
	const sum = input + cacheRead + cacheWrite;
	return sum > 0 ? sum : void 0;
}
function derivePromptTokensFromTotal(usage) {
	const total = usage?.total;
	const output = usage?.output;
	if (typeof total !== "number" || !Number.isFinite(total) || total <= 0 || typeof output !== "number" || !Number.isFinite(output) || output < 0) return;
	const promptTokens = total - output;
	return promptTokens > 0 ? promptTokens : void 0;
}
/** Resolve context prompt tokens from explicit override, last call, or aggregate usage. */
function deriveContextPromptTokens(params) {
	const promptOverride = params.promptTokens;
	if (typeof promptOverride === "number" && Number.isFinite(promptOverride) && promptOverride > 0) return promptOverride;
	if (params.lastCallUsage?.contextUsage?.state === "unavailable") return;
	if (params.lastCallUsage?.contextUsage?.state === "available") return params.lastCallUsage.contextUsage.promptTokens;
	const lastCallPromptTokens = derivePromptTokens(params.lastCallUsage) ?? derivePromptTokensFromTotal(params.lastCallUsage);
	if (lastCallPromptTokens !== void 0) return lastCallPromptTokens;
	if (params.usage?.contextUsage?.state === "unavailable") return;
	if (params.usage?.contextUsage?.state === "available") return params.usage.contextUsage.promptTokens;
	return derivePromptTokens(params.usage);
}
/** Derive the session prompt-token snapshot stored for context display. */
function deriveSessionTotalTokens(params) {
	const promptOverride = params.promptTokens;
	const hasPromptOverride = typeof promptOverride === "number" && Number.isFinite(promptOverride) && promptOverride > 0;
	const usage = params.usage;
	if (!params.lastCallUsage && !usage && !hasPromptOverride) return;
	const promptTokens = deriveContextPromptTokens({
		lastCallUsage: params.lastCallUsage,
		promptTokens: hasPromptOverride ? promptOverride : void 0,
		usage
	});
	if (!(typeof promptTokens === "number") || !Number.isFinite(promptTokens) || promptTokens <= 0) return;
	return promptTokens;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-parent-fork.ts
const DEFAULT_PARENT_FORK_MAX_TOKENS = 1e5;
function formatParentForkTooLargeMessage(params) {
	return `Parent context is too large to fork (${params.parentTokens}/${params.maxTokens} tokens); starting with isolated context instead.`;
}
function resolveSqliteParentForkDecision(parentEntry, transcriptEstimate) {
	const maxTokens = DEFAULT_PARENT_FORK_MAX_TOKENS;
	const parentTokens = resolveFreshSessionTotalTokens(parentEntry) ?? (transcriptEstimate?.kind === "exact-context" ? transcriptEstimate.tokens : maxPositiveTokenCount(transcriptEstimate?.tokens, resolveSessionTotalTokens(parentEntry)));
	if (typeof parentTokens === "number" && parentTokens > maxTokens) return {
		status: "skip",
		reason: "parent-too-large",
		maxTokens,
		parentTokens,
		message: formatParentForkTooLargeMessage({
			parentTokens,
			maxTokens
		})
	};
	return {
		status: "fork",
		maxTokens,
		...typeof parentTokens === "number" ? { parentTokens } : {}
	};
}
function estimateSqliteTranscriptPromptTokens(events) {
	let byteEstimate = 0;
	let latestUsageEstimate;
	let latestUsageEstimateIsExactContext = false;
	let trailingBytes = 0;
	for (const event of selectParentForkTokenEstimateEvents(events)) {
		const serializedBytes = Buffer.byteLength(JSON.stringify(event)) + 1;
		byteEstimate += serializedBytes;
		if (!isRecord(event)) {
			if (latestUsageEstimate !== void 0) trailingBytes += serializedBytes;
			continue;
		}
		const message = isRecord(event.message) ? event.message : void 0;
		const usageRaw = isRecord(message?.usage) ? message.usage : isRecord(event.usage) ? event.usage : void 0;
		if (!usageRaw) {
			if (latestUsageEstimate !== void 0) trailingBytes += serializedBytes;
			continue;
		}
		const contextUsage = readTranscriptContextUsage(usageRaw);
		if (contextUsage?.state === "unavailable") {
			latestUsageEstimate = void 0;
			latestUsageEstimateIsExactContext = false;
			trailingBytes = 0;
			continue;
		}
		if (contextUsage?.state === "available") {
			latestUsageEstimate = normalizePositiveTokenCount(contextUsage.totalTokens);
			latestUsageEstimateIsExactContext = true;
			trailingBytes = 0;
			continue;
		}
		const usage = normalizeUsage(usageRaw);
		const promptTokens = normalizePositiveTokenCount(derivePromptTokens({
			input: usage?.input,
			cacheRead: usage?.cacheRead,
			cacheWrite: usage?.cacheWrite
		}));
		const outputTokens = normalizePositiveTokenCount(usage?.output) ?? 0;
		const totalTokens = promptTokens === void 0 ? void 0 : normalizePositiveTokenCount(promptTokens + outputTokens);
		if (typeof totalTokens === "number") {
			latestUsageEstimate = totalTokens;
			latestUsageEstimateIsExactContext = false;
			trailingBytes = 0;
		}
	}
	if (latestUsageEstimate !== void 0) {
		const tokens = normalizePositiveTokenCount(latestUsageEstimate + Math.ceil(trailingBytes / 4));
		return tokens === void 0 ? void 0 : {
			kind: latestUsageEstimateIsExactContext ? "exact-context" : "legacy-or-bytes",
			tokens
		};
	}
	const tokens = normalizePositiveTokenCount(Math.ceil(byteEstimate / 4));
	return tokens === void 0 ? void 0 : {
		kind: "legacy-or-bytes",
		tokens
	};
}
function selectParentForkTokenEstimateEvents(events) {
	const tree = scanSessionTranscriptTree(events.filter((entry) => !(isRecord(entry) && entry.type === "session")));
	return mergeSessionTranscriptVisiblePathWithOpaqueAppendPath({
		visiblePath: selectSessionTranscriptTreePathNodes(tree, tree.leafId),
		appendPath: selectSessionTranscriptTreePathNodes(tree, tree.appendParentId),
		appendParentId: tree.appendParentId
	}).nodes.flatMap((node) => node.entry);
}
function normalizePositiveTokenCount(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : void 0;
}
function maxPositiveTokenCount(...values) {
	let max;
	for (const value of values) {
		const normalized = normalizePositiveTokenCount(value);
		if (normalized !== void 0 && (max === void 0 || normalized > max)) max = normalized;
	}
	return max;
}
function readTranscriptContextUsage(usageRaw) {
	const contextUsage = usageRaw.contextUsage;
	if (!isRecord(contextUsage)) return;
	if (contextUsage.state === "unavailable") return { state: "unavailable" };
	if (contextUsage.state !== "available") return;
	const totalTokens = normalizePositiveTokenCount(contextUsage.totalTokens);
	return totalTokens === void 0 ? void 0 : {
		state: "available",
		totalTokens
	};
}
function resolveSqliteParentForkSourceTranscript(fileEntries) {
	if (fileEntries.length === 0) return null;
	const header = fileEntries.find((entry) => isRecord(entry) && entry.type === "session");
	const entries = fileEntries.filter((entry) => !(isRecord(entry) && entry.type === "session"));
	const tree = scanSessionTranscriptTree(entries);
	const mergedPath = mergeSessionTranscriptVisiblePathWithOpaqueAppendPath({
		visiblePath: selectSessionTranscriptTreePathNodes(tree, tree.leafId),
		appendPath: selectSessionTranscriptTreePathNodes(tree, tree.appendParentId),
		appendParentId: tree.appendParentId
	});
	const branchEntries = mergedPath.nodes.flatMap((node) => {
		if (!isRecord(node.entry)) return [];
		const parentId = node.selectedParentId;
		return [node.entry.parentId === parentId ? node.entry : {
			...node.entry,
			parentId
		}];
	});
	const pathEntryIds = new Set(branchEntries.flatMap((entry) => isRecord(entry) && typeof entry.id === "string" ? [entry.id] : []));
	const lastLeafUpdateNode = tree.nodes.findLast((node) => node.leafId !== void 0);
	return {
		appendParentId: mergedPath.appendParentId,
		...lastLeafUpdateNode?.appendMode ? { appendMode: lastLeafUpdateNode.appendMode } : {},
		branchEntries,
		cwd: typeof header?.cwd === "string" ? header.cwd : void 0,
		labelsToWrite: collectBranchLabels({
			allEntries: entries,
			pathEntryIds
		}),
		leafId: tree.leafId,
		preserveLeafControl: isSessionTranscriptLeafControl(lastLeafUpdateNode?.entry)
	};
}
function collectBranchLabels(params) {
	return params.allEntries.flatMap((entry) => isRecord(entry) && entry.type === "label" && typeof entry.label === "string" && typeof entry.targetId === "string" && typeof entry.id === "string" && !params.pathEntryIds.has(entry.id) && params.pathEntryIds.has(entry.targetId) && typeof entry.timestamp === "string" ? [{
		targetId: entry.targetId,
		label: entry.label,
		timestamp: entry.timestamp
	}] : []);
}
function generateEntryId(existingIds) {
	for (let attempt = 0; attempt < 100; attempt += 1) {
		const id = randomUUID().slice(0, 8);
		if (!existingIds.has(id)) {
			existingIds.add(id);
			return id;
		}
	}
	const id = randomUUID();
	existingIds.add(id);
	return id;
}
function buildLabelEntries(params) {
	let parentId = params.lastEntryId;
	return params.labelsToWrite.map(({ targetId, label, timestamp }) => {
		const entry = {
			type: "label",
			id: generateEntryId(params.pathEntryIds),
			parentId,
			timestamp,
			targetId,
			label
		};
		parentId = entry.id;
		return entry;
	});
}
function hasAssistantEntry(entries) {
	return entries.some((entry) => isRecord(entry) && entry.type === "message" && isRecord(entry.message) && entry.message.role === "assistant");
}
function buildSqliteForkedChildTranscriptEvents(params) {
	const header = {
		...createSessionTranscriptHeader({
			cwd: params.source.cwd,
			sessionId: params.targetSessionId
		}),
		parentSession: params.parentSessionFile
	};
	if (!params.source.preserveLeafControl && !hasAssistantEntry(params.source.branchEntries)) return [header];
	const pathEntryIds = new Set(params.source.branchEntries.flatMap((entry) => isRecord(entry) && typeof entry.id === "string" ? [entry.id] : []));
	const lastPathEntry = params.source.branchEntries.at(-1);
	const lastPathEntryId = isRecord(lastPathEntry) && typeof lastPathEntry.id === "string" ? lastPathEntry.id : null;
	const labelEntries = buildLabelEntries({
		labelsToWrite: params.source.labelsToWrite,
		pathEntryIds,
		lastEntryId: lastPathEntryId
	});
	const leafEntry = params.source.preserveLeafControl ? {
		type: "leaf",
		id: generateEntryId(pathEntryIds),
		parentId: labelEntries.at(-1)?.id ?? lastPathEntryId,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		targetId: params.source.leafId,
		appendParentId: params.source.appendParentId,
		...params.source.appendMode ? { appendMode: params.source.appendMode } : {}
	} : null;
	return [
		header,
		...params.source.branchEntries,
		...labelEntries,
		...leafEntry ? [leafEntry] : []
	];
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-parent-session.ts
async function forkSqliteSessionTranscriptFromParent(params) {
	const resolved = resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		sessionKey: params.sessionKey,
		storePath: params.storePath
	});
	const target = params.targetStorePath ? resolveSqliteScope({
		sessionKey: params.sessionKey,
		storePath: params.targetStorePath
	}) : resolved;
	if (!(target.agentId !== resolved.agentId || (target.path ?? "") !== (resolved.path ?? ""))) return await runExclusiveSqliteSessionWrite(resolved, async () => {
		let result = { status: "failed" };
		runOpenClawAgentWriteTransaction((database) => {
			result = forkSqliteParentTranscriptInTransaction(database, resolved, {
				parentEntry: params.parentEntry,
				parentSessionKey: params.parentSessionKey,
				targetSessionId: params.targetSessionId,
				targetSessionKey: params.sessionKey
			});
		}, toDatabaseOptions(resolved));
		return result;
	});
	if (!params.parentEntry.sessionId) return { status: "missing-parent" };
	const source = resolveSqliteParentForkSourceTranscript(loadSqliteTranscriptEventsFromDatabase(openOpenClawAgentDatabase(toDatabaseOptions(resolved)), params.parentEntry.sessionId));
	if (!source) return { status: "failed" };
	const parentSessionFile = formatLegacySqliteSessionMarkerForScope({
		...resolved,
		sessionId: params.parentEntry.sessionId,
		sessionKey: normalizeSqliteSessionKey(params.parentSessionKey)
	});
	return await runExclusiveSqliteSessionWrite(target, async () => {
		const sessionId = params.targetSessionId ?? randomUUID();
		const targetScope = {
			...target,
			sessionId,
			sessionKey: normalizeSqliteSessionKey(params.sessionKey)
		};
		const sessionFile = formatSqliteSessionReferenceForScope(targetScope);
		runOpenClawAgentWriteTransaction((database) => {
			writeSqliteForkedChildTranscriptInTransaction(database, targetScope, {
				parentSessionFile,
				source
			});
		}, toDatabaseOptions(target));
		return {
			status: "created",
			transcript: {
				sessionFile,
				sessionId
			}
		};
	});
}
/** Forks parent context into a child session entry using SQLite rows only. */
async function forkSqliteSessionEntryFromParentTarget(params) {
	const resolved = resolveSqliteStoreScope(params.storePath, { agentId: params.agentId });
	const parentTarget = normalizeSqliteLifecycleTarget(params.parentTarget);
	const sessionTarget = normalizeSqliteLifecycleTarget(params.sessionTarget);
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		const parent = resolveSqliteLifecyclePrimaryEntry(database, parentTarget);
		if (!parent?.entry.sessionId) return { status: "missing-parent" };
		const base = resolveSqliteLifecyclePrimaryEntry(database, sessionTarget)?.entry ?? params.fallbackEntry;
		if (!base) return { status: "missing-entry" };
		if (params.skipForkWhen?.(cloneSessionEntry(base))) {
			const sessionEntry = await persistSqliteParentForkSkipPatch({
				entry: base,
				params,
				sessionTarget,
				patch: params.skipPatch?.(cloneSessionEntry(base)),
				resolved
			});
			return {
				status: "skipped",
				reason: "existing-entry",
				parentEntry: cloneSessionEntry(parent.entry),
				sessionEntry
			};
		}
		const transcriptParentTokens = typeof resolveFreshSessionTotalTokens(parent.entry) !== "number" && typeof parent.entry.sessionId === "string" && parent.entry.sessionId.length > 0 ? estimateSqliteTranscriptPromptTokens(loadSqliteTranscriptEventsFromDatabase(database, parent.entry.sessionId)) : void 0;
		const decision = resolveSqliteParentForkDecision(parent.entry, transcriptParentTokens);
		if (decision.status === "skip") {
			const patch = params.decisionSkipPatch?.({
				decision,
				entry: cloneSessionEntry(base),
				parentEntry: cloneSessionEntry(parent.entry)
			});
			const sessionEntry = await persistSqliteParentForkSkipPatch({
				entry: base,
				params,
				sessionTarget,
				patch,
				resolved
			});
			return {
				status: "skipped",
				reason: "decision-skip",
				parentEntry: cloneSessionEntry(parent.entry),
				sessionEntry,
				decision
			};
		}
		let result = { status: "failed" };
		const maintenancePlans = [];
		let previousIdentity = /* @__PURE__ */ new Map();
		let currentIdentity = /* @__PURE__ */ new Map();
		runOpenClawAgentWriteTransaction((writeDatabase) => {
			const freshParent = resolveSqliteLifecyclePrimaryEntry(writeDatabase, parentTarget)?.entry;
			if (!freshParent?.sessionId) {
				result = { status: "missing-parent" };
				return;
			}
			const freshBase = resolveSqliteLifecyclePrimaryEntry(writeDatabase, sessionTarget)?.entry ?? params.fallbackEntry;
			if (!freshBase) {
				result = { status: "missing-entry" };
				return;
			}
			const fork = forkSqliteParentTranscriptInTransaction(writeDatabase, resolved, {
				parentEntry: freshParent,
				parentSessionKey: parentTarget.canonicalKey,
				targetSessionKey: sessionTarget.canonicalKey
			});
			if (fork.status !== "created") {
				result = fork.status === "missing-parent" ? { status: "missing-parent" } : { status: "failed" };
				return;
			}
			const patch = params.patch?.({
				decision,
				entry: cloneSessionEntry(freshBase),
				fork: fork.transcript,
				parentEntry: cloneSessionEntry(freshParent)
			});
			const next = mergeSessionEntry(freshBase, {
				...patch,
				forkSource: {
					sessionKey: parentTarget.canonicalKey,
					sessionId: freshParent.sessionId
				},
				forkedFromParent: true,
				sessionId: fork.transcript.sessionId
			});
			previousIdentity = readSqliteSessionIdentitySnapshot(writeDatabase, sessionTarget.storeKeys);
			writeSessionEntry(writeDatabase, sessionTarget.canonicalKey, next, { previousEntry: freshBase });
			rehomeSqliteSessionWindows(writeDatabase, sessionTarget.canonicalKey, sessionTarget.storeKeys);
			deleteLegacySessionEntryRows(writeDatabase, sessionTarget.storeKeys, sessionTarget.canonicalKey, { rehomeMembers: freshBase.sessionId === next.sessionId });
			maintenancePlans.push(applySqliteSessionEntryMaintenance(writeDatabase, {
				activeSessionKey: sessionTarget.canonicalKey,
				archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
				skipMaintenance: true,
				storePath: params.storePath
			}));
			currentIdentity = readSqliteSessionIdentitySnapshot(writeDatabase, sessionTarget.storeKeys);
			result = {
				status: "forked",
				decision,
				fork: fork.transcript,
				parentEntry: cloneSessionEntry(freshParent),
				sessionEntry: cloneSessionEntry(next)
			};
		}, toDatabaseOptions(resolved));
		emitCommittedSessionIdentityDiff(previousIdentity, currentIdentity);
		finalizeSqliteSessionEntryMaintenancePlansBestEffort(resolved, maintenancePlans);
		return result;
	});
}
async function persistSqliteParentForkSkipPatch(params) {
	if (!params.patch) return cloneSessionEntry(params.entry);
	const next = preserveSqliteSameKeySessionRolloverLineage({
		next: mergeSessionEntry(params.entry, params.patch),
		previous: params.entry,
		sessionKey: params.sessionTarget.canonicalKey
	});
	const maintenancePlans = [];
	let previousIdentity = /* @__PURE__ */ new Map();
	let currentIdentity = /* @__PURE__ */ new Map();
	runOpenClawAgentWriteTransaction((database) => {
		previousIdentity = readSqliteSessionIdentitySnapshot(database, params.sessionTarget.storeKeys);
		writeSessionEntry(database, params.sessionTarget.canonicalKey, next, { previousEntry: params.entry });
		rehomeSqliteSessionWindows(database, params.sessionTarget.canonicalKey, params.sessionTarget.storeKeys);
		deleteLegacySessionEntryRows(database, params.sessionTarget.storeKeys, params.sessionTarget.canonicalKey, { rehomeMembers: params.entry.sessionId === next.sessionId });
		maintenancePlans.push(applySqliteSessionEntryMaintenance(database, {
			activeSessionKey: params.sessionTarget.canonicalKey,
			archiveDirectory: resolveSqliteTranscriptArchiveDirectory(params.resolved),
			skipMaintenance: true,
			storePath: params.params.storePath
		}));
		currentIdentity = readSqliteSessionIdentitySnapshot(database, params.sessionTarget.storeKeys);
	}, toDatabaseOptions(params.resolved));
	emitCommittedSessionIdentityDiff(previousIdentity, currentIdentity);
	finalizeSqliteSessionEntryMaintenancePlansBestEffort(params.resolved, maintenancePlans);
	return cloneSessionEntry(next);
}
/** Cleans scoped session lifecycle rows and associated SQLite transcript state. */
async function resolveSqliteSessionParentForkDecision(params) {
	const parentSessionId = typeof params.parentEntry.sessionId === "string" ? params.parentEntry.sessionId : "";
	if (!(typeof resolveFreshSessionTotalTokens(params.parentEntry) !== "number" && parentSessionId.length > 0)) return resolveSqliteParentForkDecision(params.parentEntry);
	const database = openOpenClawAgentDatabase(toDatabaseOptions(resolveSqliteStoreScope(params.storePath)));
	return resolveSqliteParentForkDecision(params.parentEntry, estimateSqliteTranscriptPromptTokens(loadSqliteTranscriptEventsFromDatabase(database, parentSessionId)));
}
function forkSqliteParentTranscriptInTransaction(database, resolved, params) {
	if (!params.parentEntry.sessionId) return { status: "missing-parent" };
	const source = resolveSqliteParentForkSourceTranscript(loadSqliteTranscriptEventsFromDatabase(database, params.parentEntry.sessionId));
	if (!source) return { status: "failed" };
	const sessionId = params.targetSessionId ?? randomUUID();
	const targetScope = {
		...resolved,
		sessionId,
		sessionKey: normalizeSqliteSessionKey(params.targetSessionKey)
	};
	const parentSessionFile = formatLegacySqliteSessionMarkerForScope({
		...resolved,
		sessionId: params.parentEntry.sessionId,
		sessionKey: normalizeSqliteSessionKey(params.parentSessionKey)
	});
	const sessionFile = formatSqliteSessionReferenceForScope(targetScope);
	writeSqliteForkedChildTranscriptInTransaction(database, targetScope, {
		parentSessionFile,
		source
	});
	return {
		status: "created",
		transcript: {
			sessionFile,
			sessionId
		}
	};
}
function writeSqliteForkedChildTranscriptInTransaction(database, targetScope, params) {
	appendTranscriptEventsInTransaction(database, targetScope, buildSqliteForkedChildTranscriptEvents({
		parentSessionFile: params.parentSessionFile,
		source: params.source,
		targetSessionId: targetScope.sessionId
	}));
}
//#endregion
//#region src/config/sessions/bloat-field-policy.ts
/**
* Bloat field policy — decides which session-entry fields are "bloat" and
* strips them to prevent re-injection after compaction.
*
* Pure logic — no I/O, no time, no randomness. The wiring (applying this at
* the compaction checkpoint) lives in session-accessor.sqlite-checkpoint.ts;
* this module only decides what to strip.
*
* Why this exists (OC core issue #1): after compaction, OC carried
* `systemPromptReport`, `skillsSnapshot`, and `compactionCheckpoints` from the
* pre-compaction entry into the post-compaction entry (via an object spread).
* These fields were then rebuilt on the next turn, but the stale copies sat in
* the session context — ~15,000 tokens/turn of dead metadata. A plugin could
* strip them post-compaction, but OC re-added them every turn. This module is
* the pure decision; the checkpoint applies it so the fields never carry over.
*
* @dft
* - A1 (pure-io-separation): no I/O imports. Pure function.
* - A2 (determinism): no Date.now/Math.random/process.env. Same inputs → same output.
* - A4 (dft-docs): this file is documented.
* - A6 (check-result): returns a StripResult struct carrying what was stripped.
*/
/**
* The canonical bloat fields — session-entry metadata that is rebuilt every
* turn and must not carry over from a pre-compaction entry to a post-compaction
* one. Stripping them prevents the ~15K token/turn re-injection.
*/
const BLOAT_FIELDS = [
	"systemPromptReport",
	"skillsSnapshot",
	"compactionCheckpoints"
];
/**
* Strip bloat fields from a session entry, returning a new entry and a record
* of what was removed. The input entry is not mutated (A1: pure).
*
* Only fields that are actually present (value is not `undefined`) are reported
* in `strippedFields`, unless `options.force` is true.
*
* @example
*   stripBloatFields({ systemPromptReport: {…}, skillsSnapshot: {…}, foo: 1 })
*   // → { entry: { foo: 1 }, strippedFields: ["systemPromptReport", "skillsSnapshot"], strippedAny: true }
*
*   stripBloatFields({ foo: 1 })
*   // → { entry: { foo: 1 }, strippedFields: [], strippedAny: false }
*
*   stripBloatFields({ systemPromptReport: undefined, foo: 1 })
*   // → { entry: { foo: 1 }, strippedFields: [], strippedAny: false }  (undefined is not "present")
*/
function stripBloatFields(entry, options) {
	const force = options?.force === true;
	const strippedFields = [];
	const seenFields = /* @__PURE__ */ new Set();
	const result = {};
	for (const key of Object.keys(entry)) {
		seenFields.add(key);
		if (isBloatField(key)) {
			const value = entry[key];
			if (force || value !== void 0) strippedFields.push(key);
			continue;
		}
		result[key] = entry[key];
	}
	if (force) {
		for (const field of BLOAT_FIELDS) if (!seenFields.has(field)) strippedFields.push(field);
	}
	return {
		entry: result,
		strippedFields,
		strippedAny: strippedFields.length > 0
	};
}
/**
* Check whether a key is one of the canonical bloat fields.
* Pure — a simple set membership test.
*/
function isBloatField(key) {
	return BLOAT_FIELDS.includes(key);
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-checkpoint.ts
async function branchSqliteCompactionCheckpointSession(params) {
	const sourceKey = normalizeSqliteSessionKey(params.sourceStoreKey ?? params.sourceKey);
	const requestedSourceKey = normalizeSqliteSessionKey(params.sourceKey);
	const targetKey = normalizeSqliteSessionKey(params.nextKey);
	const resolved = resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		...params.env ? { env: params.env } : {},
		sessionKey: sourceKey,
		...params.storePath ? { storePath: params.storePath } : {}
	});
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		let result;
		let previousIdentity = /* @__PURE__ */ new Map();
		let currentIdentity = /* @__PURE__ */ new Map();
		runOpenClawAgentWriteTransaction((database) => {
			const identityKeys = uniqueStrings([...collectSessionEntryLookupKeys(database, sourceKey), ...collectSessionEntryLookupKeys(database, targetKey)]);
			previousIdentity = readSqliteSessionIdentitySnapshot(database, identityKeys);
			result = branchSqliteCompactionCheckpointSessionInTransaction(database, {
				checkpointId: params.checkpointId,
				parentSessionKey: requestedSourceKey,
				legacySource: params.legacySource,
				resolved,
				sourceKey,
				targetKey
			});
			currentIdentity = readSqliteSessionIdentitySnapshot(database, identityKeys);
		}, toDatabaseOptions(resolved));
		emitCommittedSessionIdentityDiff(previousIdentity, currentIdentity);
		return result ?? { status: "failed" };
	});
}
/** Restores a SQLite session from a compaction checkpoint in one queued transaction. */
async function restoreSqliteCompactionCheckpointSession(params) {
	const sessionKey = normalizeSqliteSessionKey(params.sessionStoreKey ?? params.sessionKey);
	const targetKey = normalizeSqliteSessionKey(params.sessionKey);
	const resolved = resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		...params.env ? { env: params.env } : {},
		sessionKey,
		...params.storePath ? { storePath: params.storePath } : {}
	});
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		let result;
		let previousIdentity = /* @__PURE__ */ new Map();
		let currentIdentity = /* @__PURE__ */ new Map();
		runOpenClawAgentWriteTransaction((database) => {
			const identityKeys = uniqueStrings([...collectSessionEntryLookupKeys(database, sessionKey), ...collectSessionEntryLookupKeys(database, targetKey)]);
			previousIdentity = readSqliteSessionIdentitySnapshot(database, identityKeys);
			result = restoreSqliteCompactionCheckpointSessionInTransaction(database, {
				checkpointId: params.checkpointId,
				legacySource: params.legacySource,
				resolved,
				sourceKey: sessionKey,
				targetKey
			});
			currentIdentity = readSqliteSessionIdentitySnapshot(database, identityKeys);
		}, toDatabaseOptions(resolved));
		emitCommittedSessionIdentityDiff(previousIdentity, currentIdentity);
		return result ?? { status: "failed" };
	});
}
/** Publishes a transcript update using the SQLite transcript scope target. */
function branchSqliteCompactionCheckpointSessionInTransaction(database, params) {
	const currentEntry = readSessionEntryRow(database, params.sourceKey)?.entry;
	if (!currentEntry?.sessionId) return { status: "missing-session" };
	if (currentEntry.modelSelectionLocked === true) return { status: "model-selection-locked" };
	const checkpoint = readSessionCompactionCheckpoint(currentEntry, params.checkpointId);
	if (!checkpoint) return { status: "missing-checkpoint" };
	const forked = forkSqliteCheckpointTranscriptInTransaction(database, params.resolved, {
		checkpoint,
		legacySource: params.legacySource,
		targetSessionKey: params.targetKey
	});
	if (forked.status !== "created") return forked;
	const nextEntry = cloneSqliteCheckpointSessionEntry({
		currentEntry,
		label: currentEntry.label?.trim() ? `${currentEntry.label.trim()} (checkpoint)` : "Checkpoint branch",
		nextSessionId: forked.sessionId,
		parentSessionKey: params.parentSessionKey,
		totalTokens: forked.totalTokens
	});
	writeSessionEntry(database, params.targetKey, nextEntry);
	return {
		status: "created",
		key: params.targetKey,
		checkpoint,
		entry: nextEntry
	};
}
function restoreSqliteCompactionCheckpointSessionInTransaction(database, params) {
	const currentEntry = readSessionEntryRow(database, params.sourceKey)?.entry;
	if (!currentEntry?.sessionId) return { status: "missing-session" };
	if (currentEntry.modelSelectionLocked === true) return { status: "model-selection-locked" };
	const checkpoint = readSessionCompactionCheckpoint(currentEntry, params.checkpointId);
	if (!checkpoint) return { status: "missing-checkpoint" };
	const restored = forkSqliteCheckpointTranscriptInTransaction(database, params.resolved, {
		checkpoint,
		legacySource: params.legacySource,
		targetSessionKey: params.targetKey
	});
	if (restored.status !== "created") return restored;
	const nextEntry = cloneSqliteCheckpointSessionEntry({
		currentEntry,
		nextSessionId: restored.sessionId,
		preserveCompactionCheckpoints: true,
		totalTokens: restored.totalTokens
	});
	writeSessionEntry(database, params.targetKey, nextEntry);
	return {
		status: "created",
		key: params.targetKey,
		checkpoint,
		entry: nextEntry
	};
}
function forkSqliteCheckpointTranscriptInTransaction(database, resolved, params) {
	const sources = resolveSqliteCheckpointTranscriptForkSources(params.checkpoint);
	if (sources.length === 0) return { status: "missing-boundary" };
	let lastFailure = { status: "missing-boundary" };
	let selected;
	for (const source of sources) {
		const rows = readSqliteTranscriptRowsForFork(database, source);
		if (rows.status === "created") {
			selected = {
				source,
				rows: rows.events
			};
			break;
		}
		lastFailure = rows;
	}
	const legacySource = selected ? void 0 : resolvePreparedLegacyCheckpointSource(params.checkpoint, params.legacySource);
	if (!selected && !legacySource) return lastFailure;
	const sessionId = randomUUID();
	const targetScope = {
		...resolved,
		sessionId,
		sessionKey: params.targetSessionKey
	};
	const sessionFile = formatSqliteSessionReferenceForScope(targetScope);
	const selectedEvents = selected?.rows ?? legacySource?.events ?? [];
	const totalTokens = selected?.source.totalTokens ?? legacySource?.totalTokens;
	appendTranscriptEventsInTransaction(database, targetScope, [createSessionTranscriptHeader({
		cwd: readTranscriptHeaderCwd$1(selectedEvents),
		sessionId
	}), ...selectedEvents.filter((event) => !isSessionTranscriptHeader(event))]);
	return {
		status: "created",
		sessionId,
		sessionFile,
		...typeof totalTokens === "number" ? { totalTokens } : {}
	};
}
function resolvePreparedLegacyCheckpointSource(checkpoint, source) {
	if (!source || source.checkpointId !== checkpoint.checkpointId || source.events.length === 0) return;
	return [checkpoint.preCompaction, checkpoint.postCompaction].some((position) => {
		const sessionFile = position.sessionFile?.trim();
		const sourceLeafId = position.entryId?.trim() || position.leafId?.trim() || void 0;
		return sessionFile === source.sessionFile && sourceLeafId === source.sourceLeafId;
	}) ? source : void 0;
}
function resolveSqliteCheckpointTranscriptForkSources(checkpoint) {
	const sources = [];
	if (checkpoint.preCompaction.sessionId) {
		const preLeafId = checkpoint.preCompaction.entryId ?? checkpoint.preCompaction.leafId;
		sources.push({
			sessionId: checkpoint.preCompaction.sessionId,
			...preLeafId ? { leafId: preLeafId } : {},
			...typeof checkpoint.tokensBefore === "number" ? { totalTokens: checkpoint.tokensBefore } : {}
		});
	}
	const postLeafId = checkpoint.postCompaction.entryId ?? checkpoint.postCompaction.leafId;
	if (checkpoint.postCompaction.sessionId && postLeafId) sources.push({
		sessionId: checkpoint.postCompaction.sessionId,
		leafId: postLeafId,
		...typeof checkpoint.tokensAfter === "number" ? { totalTokens: checkpoint.tokensAfter } : {}
	});
	return sources;
}
function readSqliteTranscriptRowsForFork(database, source) {
	const boundarySeq = source.leafId ? readTranscriptIdentityByEventId(database, source.sessionId, source.leafId)?.seq : void 0;
	if (source.leafId && boundarySeq === void 0) return { status: "missing-boundary" };
	const query = getSessionKysely(database.db).selectFrom("transcript_events").select(["event_json", "seq"]).where("session_id", "=", source.sessionId).orderBy("seq", "asc");
	const rows = executeSqliteQuerySync(database.db, boundarySeq === void 0 ? query : query.where("seq", "<=", boundarySeq)).rows;
	if (rows.length === 0) return { status: "failed" };
	try {
		return {
			status: "created",
			events: rows.map((row) => JSON.parse(row.event_json))
		};
	} catch {
		return { status: "failed" };
	}
}
function readSessionCompactionCheckpoint(entry, checkpointId) {
	const normalizedCheckpointId = checkpointId.trim();
	if (!normalizedCheckpointId || !Array.isArray(entry.compactionCheckpoints)) return;
	return entry.compactionCheckpoints.find((checkpoint) => checkpoint.checkpointId === normalizedCheckpointId);
}
function cloneSqliteCheckpointSessionEntry(params) {
	const hasTotalTokens = typeof params.totalTokens === "number" && Number.isFinite(params.totalTokens);
	return {
		...stripBloatFields(params.currentEntry).entry,
		sessionId: params.nextSessionId,
		updatedAt: Date.now(),
		systemSent: false,
		abortedLastRun: false,
		startedAt: void 0,
		endedAt: void 0,
		runtimeMs: void 0,
		status: void 0,
		inputTokens: void 0,
		outputTokens: void 0,
		cacheRead: void 0,
		cacheWrite: void 0,
		estimatedCostUsd: void 0,
		totalTokens: hasTotalTokens ? params.totalTokens : void 0,
		totalTokensFresh: hasTotalTokens ? true : void 0,
		label: params.label ?? params.currentEntry.label,
		parentSessionKey: params.parentSessionKey ?? params.currentEntry.parentSessionKey,
		compactionCheckpoints: params.preserveCompactionCheckpoints ? params.currentEntry.compactionCheckpoints : void 0
	};
}
function readTranscriptHeaderCwd$1(events) {
	const header = events.find(isSessionTranscriptHeader);
	return typeof header?.cwd === "string" && header.cwd.trim() ? header.cwd : void 0;
}
function isSessionTranscriptHeader(event) {
	return Boolean(event && typeof event === "object" && !Array.isArray(event) && event.type === "session");
}
/** Records inbound session metadata without refreshing activity timestamps. */
//#endregion
//#region src/config/sessions/session-entry-selection.ts
/** Carries only user/runtime selection into a new dashboard fork. */
function inheritSessionSelection(parentEntry) {
	if (!parentEntry) return {};
	return {
		...parentEntry.providerOverride ? { providerOverride: parentEntry.providerOverride } : {},
		...parentEntry.modelOverride ? { modelOverride: parentEntry.modelOverride } : {},
		...parentEntry.modelOverrideSource ? { modelOverrideSource: parentEntry.modelOverrideSource } : {},
		...parentEntry.modelOverrideRouteResolution ? { modelOverrideRouteResolution: parentEntry.modelOverrideRouteResolution } : {},
		...parentEntry.agentRuntimeOverride ? { agentRuntimeOverride: parentEntry.agentRuntimeOverride } : {},
		...parentEntry.thinkingLevel ? { thinkingLevel: parentEntry.thinkingLevel } : {},
		...parentEntry.fastMode !== void 0 ? { fastMode: parentEntry.fastMode } : {},
		...parentEntry.toolOverrides ? { toolOverrides: parentEntry.toolOverrides } : {},
		...parentEntry.verboseLevel ? { verboseLevel: parentEntry.verboseLevel } : {},
		...parentEntry.traceLevel ? { traceLevel: parentEntry.traceLevel } : {},
		...parentEntry.reasoningLevel ? { reasoningLevel: parentEntry.reasoningLevel } : {},
		...parentEntry.elevatedLevel ? { elevatedLevel: parentEntry.elevatedLevel } : {},
		...parentEntry.authProfileOverride ? { authProfileOverride: parentEntry.authProfileOverride } : {},
		...parentEntry.authProfileOverrideSource ? { authProfileOverrideSource: parentEntry.authProfileOverrideSource } : {}
	};
}
function cloneOptionalSessionEntry(entry) {
	return entry ? structuredClone(entry) : void 0;
}
function resolveProjectionExistingEntry(entries, target) {
	const candidateKeys = target.candidateKeys ?? [target.primaryKey];
	let freshest;
	for (const candidateKey of candidateKeys) {
		const entry = entries.find((candidate) => candidate.sessionKey === candidateKey)?.entry;
		if (entry && (!freshest || (entry.updatedAt ?? 0) > (freshest.updatedAt ?? 0))) freshest = entry;
	}
	return cloneOptionalSessionEntry(freshest);
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-message-cut.ts
const BRANCH_HEADLINE_MAX_CHARS = 120;
const SESSION_BRANCH_CACHE_MAX_ENTRIES = 32;
const sessionBranchCache = /* @__PURE__ */ new Map();
function sessionBranchCacheKey(databasePath, sessionId) {
	return `${databasePath}\0${sessionId}`;
}
function cloneSessionBranchSummaries(branches) {
	return branches.map((branch) => ({ ...branch }));
}
function readSessionBranchWatermark(database, sessionId) {
	const db = getSessionKysely(database.db);
	const maxSeq = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("transcript_events").select((eb) => eb.fn.max("seq").as("max_seq")).where("session_id", "=", sessionId))?.max_seq;
	return {
		generation: executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("transcript_rewrite_watermarks").select("generation").where("session_id", "=", sessionId))?.generation ?? null,
		maxSeq: maxSeq ?? null
	};
}
function loadSessionBranchSummaries(database, sessionId) {
	const cacheKey = sessionBranchCacheKey(database.path, sessionId);
	const watermark = readSessionBranchWatermark(database, sessionId);
	const cached = sessionBranchCache.get(cacheKey);
	if (cached?.generation === watermark.generation && cached.maxSeq === watermark.maxSeq) {
		sessionBranchCache.delete(cacheKey);
		sessionBranchCache.set(cacheKey, cached);
		return cloneSessionBranchSummaries(cached.branches);
	}
	const branches = summarizeSessionBranches(loadSqliteTranscriptEventsFromDatabase(database, sessionId));
	sessionBranchCache.delete(cacheKey);
	sessionBranchCache.set(cacheKey, {
		...watermark,
		branches
	});
	pruneMapToMaxSize(sessionBranchCache, SESSION_BRANCH_CACHE_MAX_ENTRIES);
	return cloneSessionBranchSummaries(branches);
}
function invalidateSessionBranchCache(databasePath, sessionIds) {
	for (const sessionId of uniqueStrings(sessionIds)) sessionBranchCache.delete(sessionBranchCacheKey(databasePath, sessionId));
}
async function listSqliteSessionBranches(params) {
	const sourceKey = normalizeSqliteSessionKey(params.sessionStoreKey ?? params.sessionKey);
	const resolved = resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		...params.env ? { env: params.env } : {},
		sessionKey: sourceKey,
		...params.storePath ? { storePath: params.storePath } : {}
	});
	try {
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		const currentEntry = readSessionEntryRow(database, sourceKey)?.entry;
		if (!currentEntry?.sessionId) return { status: "missing-session" };
		return {
			status: "ok",
			branches: loadSessionBranchSummaries(database, currentEntry.sessionId)
		};
	} catch {
		return { status: "failed" };
	}
}
/** Resolves the active branch leaf from the same transcript tree used by branch listing. */
function resolveSessionTranscriptActiveLeafEntryId(events) {
	return scanSessionTranscriptTree(events).leafId ?? void 0;
}
async function rewindSqliteSessionToMessage(params) {
	return await mutateSqliteSessionAtMessage(params, "rewind");
}
async function forkSqliteSessionAtMessage(params) {
	return await mutateSqliteSessionAtMessage(params, "fork");
}
async function switchSqliteSessionBranch(params) {
	return await mutateSqliteSessionAtMessage({
		...params,
		entryId: params.leafEntryId
	}, "switch");
}
async function mutateSqliteSessionAtMessage(params, mode) {
	const canonicalSourceKey = normalizeSqliteSessionKey(params.sessionKey);
	const sourceKey = normalizeSqliteSessionKey(params.sessionStoreKey ?? params.sessionKey);
	const targetKey = mode === "fork" ? normalizeSqliteSessionKey(params.targetKey ?? params.sessionKey) : sourceKey;
	const resolved = resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		...params.env ? { env: params.env } : {},
		sessionKey: sourceKey,
		...params.storePath ? { storePath: params.storePath } : {}
	});
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		let previousIdentity = /* @__PURE__ */ new Map();
		let currentIdentity = /* @__PURE__ */ new Map();
		let databasePath;
		const result = runOpenClawAgentWriteTransaction((database) => {
			databasePath = database.path;
			const identityKeys = uniqueStrings([...collectSessionEntryLookupKeys(database, sourceKey), ...collectSessionEntryLookupKeys(database, targetKey)]);
			previousIdentity = readSqliteSessionIdentitySnapshot(database, identityKeys);
			const mutationResult = mutateSqliteSessionAtMessageInTransaction(database, resolved, {
				entryId: params.entryId,
				canonicalSourceKey,
				creation: params.creation,
				mode,
				sourceKey,
				targetKey
			});
			currentIdentity = readSqliteSessionIdentitySnapshot(database, identityKeys);
			return mutationResult;
		}, toDatabaseOptions(resolved));
		if (result.status === "created" && databasePath) invalidateSessionBranchCache(databasePath, [...[...previousIdentity.values()].flatMap((entry) => entry.sessionId ? [entry.sessionId] : []), ...result.entry.sessionId ? [result.entry.sessionId] : []]);
		emitCommittedSessionIdentityDiff(previousIdentity, currentIdentity);
		return result;
	});
}
function mutateSqliteSessionAtMessageInTransaction(database, resolved, params) {
	const currentEntry = readSessionEntryRow(database, params.sourceKey)?.entry;
	if (!currentEntry?.sessionId) return { status: "missing-session" };
	const events = loadSqliteTranscriptEventsFromDatabase(database, currentEntry.sessionId);
	const cut = params.mode === "switch" ? void 0 : resolveMessageCut(events, params.entryId);
	if (cut && "status" in cut) return cut;
	if (params.mode === "switch") {
		const tipStatus = validateBranchTip(events, params.entryId);
		if (tipStatus) return { status: tipStatus };
	}
	const nextSessionId = randomUUID();
	const targetScope = {
		...resolved,
		sessionId: nextSessionId,
		sessionKey: params.targetKey
	};
	const header = createSessionTranscriptHeader({
		cwd: readTranscriptHeaderCwd(events),
		sessionId: nextSessionId
	});
	appendTranscriptEventsInTransaction(database, targetScope, params.mode === "fork" && cut && !("status" in cut) ? [header, ...cut.prefix] : [
		header,
		...events.filter((event) => !isSessionHeader(event)),
		{
			type: "leaf",
			id: uniqueEntryId(events),
			parentId: readLastEventId(events),
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			targetId: params.mode === "switch" ? params.entryId : cut?.parentId ?? null
		}
	]);
	if (params.mode !== "fork") reconcileSessionTranscriptIndexInTransaction(database.db, nextSessionId);
	const nextEntry = {
		...cloneMessageCutSessionEntry({
			currentEntry,
			forked: params.mode === "fork",
			forkSource: params.mode === "fork" ? {
				sessionKey: params.canonicalSourceKey,
				sessionId: currentEntry.sessionId,
				entryId: params.entryId
			} : void 0,
			nextSessionId
		}),
		...params.mode === "fork" && params.creation ? buildSessionCreationStamp(params.creation) : {}
	};
	writeSessionEntry(database, params.targetKey, nextEntry);
	return {
		status: "created",
		key: params.targetKey,
		entry: nextEntry,
		...cut && !("status" in cut) && cut.editorText ? { editorText: cut.editorText } : {},
		...cut && !("status" in cut) && cut.editorAttachments ? { editorAttachments: cut.editorAttachments } : {},
		...cut && !("status" in cut) && cut.editorMediaRefs ? { editorMediaRefs: cut.editorMediaRefs } : {}
	};
}
function validateBranchTip(events, entryId) {
	const tree = scanSessionTranscriptTree(events);
	const target = tree.byId.get(entryId);
	if (!target) return "missing-entry";
	if (isSessionTranscriptLeafControl(target.entry)) return "not-branch-tip";
	if (!sessionBranchTipNodes(tree).some((node) => node.id === entryId)) return "not-branch-tip";
	return tree.leafId === entryId ? "already-active" : void 0;
}
function summarizeSessionBranches(events) {
	const tree = scanSessionTranscriptTree(events);
	return sessionBranchTipNodes(tree).toSorted((left, right) => Number(right.id === tree.leafId) - Number(left.id === tree.leafId) || right.index - left.index).map((node) => summarizeSessionBranch(tree, node.id));
}
function sessionBranchTipNodes(tree) {
	const referencedParents = new Set(tree.nodes.flatMap((node) => isSessionTranscriptLeafControl(node.entry) || node.parentId === null ? [] : [node.parentId]));
	return tree.nodes.filter((node) => !isSessionTranscriptLeafControl(node.entry) && (node.id === tree.leafId || !referencedParents.has(node.id)));
}
function summarizeSessionBranch(tree, leafEntryId) {
	const messages = selectSessionTranscriptTreePathNodes(tree, leafEntryId).flatMap((node) => {
		const record = asOptionalRecord(node.entry);
		return record?.type === "message" ? [record] : [];
	});
	const headline = messages.toReversed().map((record) => extractHeadlineText(record.message)).find((value) => value !== void 0);
	const timestamp = asOptionalRecord(tree.byId.get(leafEntryId)?.entry)?.timestamp;
	return {
		leafEntryId,
		headline: truncateBranchHeadline(headline ?? ""),
		messageCount: messages.length,
		...typeof timestamp === "string" && timestamp.trim() ? { updatedAt: timestamp } : {},
		active: tree.leafId === leafEntryId
	};
}
function extractHeadlineText(messageValue) {
	const message = asOptionalRecord(messageValue);
	if (message?.role !== "user" && message?.role !== "assistant") return;
	return (message.role === "assistant" ? extractAssistantVisibleText(message) : extractEditorText(message.content ?? message.text))?.replace(/\s+/g, " ").trim() || void 0;
}
function truncateBranchHeadline(value) {
	const characters = Array.from(value);
	return characters.length <= BRANCH_HEADLINE_MAX_CHARS ? value : `${characters.slice(0, BRANCH_HEADLINE_MAX_CHARS - 1).join("")}…`;
}
function resolveMessageCut(events, entryId) {
	const tree = scanSessionTranscriptTree(events);
	const target = tree.byId.get(entryId);
	if (!target) return { status: "missing-entry" };
	const record = asOptionalRecord(target.entry);
	const message = asOptionalRecord(record?.message);
	if (record?.type !== "message" || message?.role !== "user") return { status: "not-user-message" };
	const activePath = selectSessionTranscriptTreePathNodes(tree, tree.leafId);
	const targetIndex = activePath.findIndex((node) => node.id === entryId);
	if (targetIndex < 0) return { status: "off-active-path" };
	const prefix = [];
	for (const node of activePath.slice(0, targetIndex)) {
		const entry = asOptionalRecord(node.entry);
		prefix.push(entry && entry.parentId !== node.parentId ? {
			...entry,
			parentId: node.parentId
		} : node.entry);
	}
	const editorAttachments = extractEditorAttachments(message.content);
	const editorMediaRefs = extractEditorMediaRefs(message);
	return {
		editorText: extractEditorText(message.content),
		...editorAttachments ? { editorAttachments } : {},
		...editorMediaRefs ? { editorMediaRefs } : {},
		parentId: target.parentId,
		prefix
	};
}
function cloneMessageCutSessionEntry(params) {
	return {
		...params.forked ? inheritSessionSelection(params.currentEntry) : params.currentEntry,
		sessionId: params.nextSessionId,
		lifecycleRevision: params.forked ? randomUUID() : params.currentEntry.lifecycleRevision,
		updatedAt: Date.now(),
		systemSent: false,
		abortedLastRun: false,
		startedAt: void 0,
		endedAt: void 0,
		runtimeMs: void 0,
		status: void 0,
		inputTokens: void 0,
		outputTokens: void 0,
		cacheRead: void 0,
		cacheWrite: void 0,
		estimatedCostUsd: void 0,
		totalTokens: void 0,
		totalTokensFresh: void 0,
		contextTokens: void 0,
		contextBudgetStatus: void 0,
		compactionCount: void 0,
		compactionCheckpoints: void 0,
		memoryFlush: void 0,
		cliSessionBindings: void 0,
		cliSessionIds: void 0,
		claudeCliSessionId: void 0,
		agentHarnessId: void 0,
		modelSelectionLocked: void 0,
		skillsSnapshot: void 0,
		systemPromptReport: void 0,
		restartRecoveryRuns: void 0,
		restartRecoveryForceSafeTools: void 0,
		abortCutoffMessageSid: void 0,
		abortCutoffTimestamp: void 0,
		usageFamilyKey: params.forked ? void 0 : params.currentEntry.usageFamilyKey,
		usageFamilySessionIds: params.forked ? void 0 : params.currentEntry.usageFamilySessionIds,
		previousSessionId: params.forked ? void 0 : params.currentEntry.sessionId,
		...params.forkSource ? {
			forkSource: params.forkSource,
			parentSessionKey: params.forkSource.sessionKey
		} : {}
	};
}
function extractEditorText(content) {
	if (typeof content === "string") return content;
	if (!Array.isArray(content)) return;
	return content.flatMap((block) => {
		const record = asOptionalRecord(block);
		return record?.type === "text" && typeof record.text === "string" ? [record.text] : [];
	}).join("") || void 0;
}
const EDITOR_ATTACHMENT_LIMIT = 10;
const EDITOR_ATTACHMENT_MAX_BASE64_CHARS = Math.ceil(5 * 1024 * 1024 / 3) * 4;
function extractEditorAttachments(content) {
	if (!Array.isArray(content)) return;
	const attachments = content.flatMap((block) => {
		const record = asOptionalRecord(block);
		return record?.type === "image" && typeof record.data === "string" && record.data.trim() && record.data.length <= EDITOR_ATTACHMENT_MAX_BASE64_CHARS && typeof record.mimeType === "string" && record.mimeType.startsWith("image/") ? [{
			mimeType: record.mimeType,
			data: record.data
		}] : [];
	});
	return attachments.length > 0 ? attachments.slice(0, EDITOR_ATTACHMENT_LIMIT) : void 0;
}
function extractEditorMediaRefs(message) {
	const media = asOptionalRecord(message["__openclaw"])?.media;
	if (!Array.isArray(media)) return;
	const refs = media.flatMap((entry) => {
		const record = asOptionalRecord(entry);
		const mediaPath = typeof record?.path === "string" ? record.path.trim() : "";
		const contentType = record?.contentType;
		return mediaPath && typeof contentType === "string" && contentType.startsWith("image/") ? [{
			path: mediaPath,
			contentType
		}] : [];
	});
	return refs.length > 0 ? refs : void 0;
}
function isSessionHeader(event) {
	return asOptionalRecord(event)?.type === "session";
}
function readTranscriptHeaderCwd(events) {
	const cwd = asOptionalRecord(events.find(isSessionHeader))?.cwd;
	return typeof cwd === "string" && cwd.trim() ? cwd : void 0;
}
function readLastEventId(events) {
	const id = asOptionalRecord(events.findLast((event) => !isSessionHeader(event)))?.id;
	return typeof id === "string" && id.trim() ? id : null;
}
function uniqueEntryId(events) {
	const ids = new Set(events.flatMap((event) => {
		const id = asOptionalRecord(event)?.id;
		return typeof id === "string" ? [id] : [];
	}));
	for (;;) {
		const id = randomUUID().slice(0, 8);
		if (!ids.has(id)) return id;
	}
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-transcript-mirror.ts
const TRANSCRIPT_MIRROR_KEY_QUERY_BATCH_SIZE = 900;
/** Returns raw events only when the transcript identity projection is not current. */
function loadTranscriptEventsForMirrorFallback(database, sessionId) {
	const db = getSessionKysely(database.db);
	const latest = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("transcript_events").select("seq").where("session_id", "=", sessionId).orderBy("seq", "desc").limit(1));
	if (!latest) return [];
	const state = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("session_transcript_index_state").select(["indexed_seq", "needs_rebuild"]).where("session_id", "=", sessionId));
	if (state && state.needs_rebuild === 0 && state.indexed_seq === latest.seq) return;
	return loadSqliteTranscriptEventsFromDatabase(database, sessionId);
}
/** Reads the bounded identity facts needed by transcript mirrors. */
function readTranscriptMirrorFacts(database, sessionId, params) {
	return runSqliteDeferredTransactionSync(database.db, () => readTranscriptMirrorFactsInSnapshot(database, sessionId, params), {
		databaseLabel: database.path,
		operationLabel: "session.transcript.mirror-facts"
	});
}
/** Reads mirror facts after the caller has established one SQLite snapshot. */
function readTranscriptMirrorFactsInSnapshot(database, sessionId, params) {
	const idempotencyKeys = [...new Set(params.idempotencyKeys)];
	const fallbackEvents = loadTranscriptEventsForMirrorFallback(database, sessionId);
	if (fallbackEvents !== void 0) return readMirrorFactsFromEvents(fallbackEvents, new Set(idempotencyKeys));
	const db = getSessionKysely(database.db);
	const facts = {
		existingIdempotencyKeys: /* @__PURE__ */ new Set(),
		messagesByIdempotencyKey: /* @__PURE__ */ new Map()
	};
	for (let offset = 0; offset < idempotencyKeys.length; offset += TRANSCRIPT_MIRROR_KEY_QUERY_BATCH_SIZE) {
		const batch = idempotencyKeys.slice(offset, offset + TRANSCRIPT_MIRROR_KEY_QUERY_BATCH_SIZE);
		const rows = executeSqliteQuerySync(database.db, db.selectFrom("transcript_event_identities as identity").innerJoin("transcript_events as event", (join) => join.onRef("event.session_id", "=", "identity.session_id").onRef("event.seq", "=", "identity.seq")).select(["identity.message_idempotency_key", "event.event_json"]).where("identity.session_id", "=", sessionId).where("identity.message_idempotency_key", "in", batch).orderBy("identity.seq", "asc")).rows;
		for (const row of rows) {
			const idempotencyKey = row.message_idempotency_key;
			if (!idempotencyKey) continue;
			facts.existingIdempotencyKeys.add(idempotencyKey);
			const message = readTranscriptEventMessage(JSON.parse(row.event_json));
			if (message !== void 0) facts.messagesByIdempotencyKey.set(idempotencyKey, message);
		}
	}
	return facts;
}
/** Extracts supplied mirror identities from authoritative transcript events. */
function readMirrorFactsFromEvents(events, candidateKeys) {
	const facts = {
		existingIdempotencyKeys: /* @__PURE__ */ new Set(),
		messagesByIdempotencyKey: /* @__PURE__ */ new Map()
	};
	for (const event of events) {
		const message = readTranscriptEventMessage(event);
		const idempotencyKey = readMessageIdempotencyKey(message);
		if (!idempotencyKey || !candidateKeys.has(idempotencyKey)) continue;
		facts.existingIdempotencyKeys.add(idempotencyKey);
		if (message !== void 0) facts.messagesByIdempotencyKey.set(idempotencyKey, message);
	}
	return facts;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-transcript-parent.ts
/** Resolves the effective parent for a transcript message append inside the write transaction. */
function resolveTranscriptMessageAppendParent(database, sessionId, options) {
	const tailId = readActiveTranscriptAppendParentId(database, sessionId);
	if (options.parentId === void 0) return tailId;
	if (options.appendIntent !== "active-branch" || tailId === options.parentId) return options.parentId;
	const db = getSessionKysely(database.db);
	const countRow = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("transcript_event_identities").select((expression) => expression.fn.countAll().as("count")).where("session_id", "=", sessionId));
	const maxAncestors = Number(countRow?.count ?? 0);
	let ancestorId = tailId;
	for (let depth = 0; depth <= maxAncestors; depth += 1) {
		if (ancestorId === options.parentId) return tailId;
		if (ancestorId === null) break;
		const row = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("transcript_event_identities").select("parent_id").where("session_id", "=", sessionId).where("event_id", "=", ancestorId));
		if (!row) break;
		ancestorId = row.parent_id;
	}
	return options.parentId;
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-transcript-sequences.ts
const committedTranscriptMessageSequences = /* @__PURE__ */ new WeakMap();
/** Reads the visible-message sequence captured from the final active branch. */
function readCommittedSqliteTranscriptMessageSequence(message) {
	return committedTranscriptMessageSequences.get(message);
}
/** Captures atomic turn cursors from the final projection before SQLite commits. */
function rememberCommittedSqliteTranscriptMessageSequencesInTransaction(database, sessionId, messages) {
	const appendedMessages = messages.filter((message) => message.appended);
	for (const message of appendedMessages) committedTranscriptMessageSequences.delete(message);
	if (appendedMessages.length === 0) return;
	const db = getNodeSqliteKysely(database.db);
	if (executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("session_transcript_index_state").select("needs_rebuild").where("session_id", "=", sessionId))?.needs_rebuild !== 0) return;
	for (const message of appendedMessages) {
		const identity = readTranscriptIdentityByEventId(database, sessionId, message.messageId);
		if (!identity) continue;
		const active = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("session_transcript_active_events").select("message_position").where("session_id", "=", sessionId).where("event_seq", "=", identity.seq));
		if (active?.message_position !== null && active?.message_position !== void 0) committedTranscriptMessageSequences.set(message, active.message_position + 1);
	}
}
/** Resolves final cursors while an ordinary turn still owns its writer lock. */
function rememberCommittedSqliteTranscriptMessageSequences(scope, messages) {
	if (!scope.agentId || !scope.sessionId || !scope.sessionKey) return;
	const resolved = resolveSqliteTranscriptScope({
		agentId: scope.agentId,
		sessionId: scope.sessionId,
		sessionKey: scope.sessionKey,
		...scope.storePath ? { storePath: scope.storePath } : {}
	});
	rememberCommittedSqliteTranscriptMessageSequencesInTransaction(openOpenClawAgentDatabase(toDatabaseOptions(resolved)), resolved.sessionId, messages);
}
//#endregion
//#region src/config/sessions/session-transcript-turn-state.ts
function sessionMatchesExpectedTranscriptTurn(selected, expected) {
	const expectedState = expected.expectedSessionState;
	return Boolean(selected && selected.entry.sessionId === expected.expectedSessionId && (expected.expectedLifecycleRevision === void 0 || selected.entry.lifecycleRevision === expected.expectedLifecycleRevision) && (expectedState === void 0 || selected.entry.abortedLastRun === expectedState.abortedLastRun && selected.entry.mainRestartRecovery?.cycleId === expectedState.mainRestartRecoveryCycleId && selected.entry.mainRestartRecovery?.revision === expectedState.mainRestartRecoveryRevision && selected.entry.restartRecoveryBeforeAgentReplyState === expectedState.restartRecoveryBeforeAgentReplyState && selected.entry.restartRecoveryDeliveryReceiptState === expectedState.restartRecoveryDeliveryReceiptState && selected.entry.restartRecoveryDeliveryToolCallId === expectedState.restartRecoveryDeliveryToolCallId && selected.entry.restartRecoveryDeliveryRequestFingerprint === expectedState.restartRecoveryDeliveryRequestFingerprint && selected.entry.restartRecoveryDeliveryRunId === expectedState.restartRecoveryDeliveryRunId && selected.entry.restartRecoveryDeliverySourceRunId === expectedState.restartRecoveryDeliverySourceRunId && selected.entry.restartRecoveryRequesterAccountId === expectedState.restartRecoveryRequesterAccountId && selected.entry.restartRecoveryRequesterSenderId === expectedState.restartRecoveryRequesterSenderId && selected.entry.restartRecoverySameChannelThreadRequired === expectedState.restartRecoverySameChannelThreadRequired && selected.entry.restartRecoverySourceIngress === expectedState.restartRecoverySourceIngress && selected.entry.restartRecoverySourceReplyDeliveryMode === expectedState.restartRecoverySourceReplyDeliveryMode && sameRestartRecoveryTerminalRunIds(selected.entry.restartRecoveryTerminalRunIds, expectedState.restartRecoveryTerminalRunIds) && selected.entry.status === expectedState.status));
}
function buildExpectedTranscriptTurnSessionPatch(params) {
	const appendedCount = params.appendedMessages.filter((message) => message.appended).length;
	const acceptedMessage = appendedCount > 0 || params.expectedSessionState !== void 0 && params.appendedMessages.some((message) => !message.appended);
	const touchUpdatedAt = params.touchSessionEntry === true && appendedCount > 0 ? Date.now() : 0;
	const restartRecoveryTerminalRunIds = params.sessionLifecyclePatch?.restartRecoveryTerminalRunIds ? mergeRestartRecoveryTerminalRunIds(params.currentEntry.restartRecoveryTerminalRunIds, params.sessionLifecyclePatch.restartRecoveryTerminalRunIds) : void 0;
	return {
		...acceptedMessage ? params.sessionLifecyclePatch : void 0,
		...acceptedMessage && restartRecoveryTerminalRunIds ? { restartRecoveryTerminalRunIds } : {},
		...touchUpdatedAt > 0 ? { updatedAt: Math.max(params.currentEntry.updatedAt ?? 0, params.sessionLifecyclePatch?.updatedAt ?? 0, touchUpdatedAt) } : {}
	};
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-transcript-write.ts
var SqliteTranscriptMutationConflictError = class extends Error {
	constructor(sessionId) {
		super(`SQLite transcript changed while preparing rewrite for ${sessionId}`);
		this.name = "SqliteTranscriptMutationConflictError";
	}
};
async function replaceSqliteTranscriptEvents(scope, events) {
	const resolved = resolveSqliteTranscriptScope(scope);
	await runExclusiveSqliteSessionWrite(resolved, async () => {
		runOpenClawAgentWriteTransaction((database) => {
			replaceSqliteTranscriptEventsInTransaction(database, resolved, events);
		}, toDatabaseOptions(resolved));
	});
}
/** Rewrites exact transcript rows after atomically validating their generation and bytes. */
async function rewriteSqliteTranscriptEventRowsExact(scope, params) {
	if (params.rows.length === 0) return null;
	const resolved = resolveSqliteTranscriptScope(scope);
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		let result = null;
		runOpenClawAgentWriteTransaction((database) => {
			const currentGeneration = readTranscriptGenerationInTransaction(database, resolved.sessionId) ?? null;
			const initialGenerationMaterialized = params.allowInitialGenerationMaterialization === true && params.expectedGeneration === null;
			if (currentGeneration !== params.expectedGeneration && !initialGenerationMaterialized) return;
			rewriteSqliteTranscriptEventRowsInTransaction(database, resolved, params.rows);
			const generation = readTranscriptGenerationInTransaction(database, resolved.sessionId);
			if (generation) result = { generation };
		}, toDatabaseOptions(resolved));
		return result;
	});
}
/** Fully replaces rows for one transcript synchronously for sync session runtimes. */
function replaceSqliteTranscriptEventsSync(scope, events) {
	const resolved = resolveSqliteTranscriptScope(scope);
	let replaced = false;
	runOpenClawAgentWriteTransaction((database) => {
		const fresh = readSessionEntryRow(database, resolved.sessionKey);
		if (!fresh || fresh.entry.sessionId !== resolved.sessionId) return;
		replaceSqliteTranscriptEventsInTransaction(database, resolved, events);
		replaced = true;
	}, toDatabaseOptions(resolved));
	return replaced;
}
async function trimSqliteTranscriptForManualCompact(scope, selectRetainedLines, options = {}) {
	const resolved = resolveSqliteTranscriptScope(scope);
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		const snapshotRows = readSqliteTranscriptEventRows(database, resolved.sessionId);
		const sessionSnapshot = readSqliteSessionEntrySelectionSnapshot(database, resolved.sessionKey, true);
		const lines = snapshotRows.map((row) => row.eventJson);
		const retainedLines = selectRetainedLines(lines);
		if (!retainedLines) return { trimmed: false };
		if (sessionSnapshot.selected?.entry.sessionId !== resolved.sessionId) throw new Error(`Cannot compact SQLite transcript ${resolved.sessionId} without its current session entry`);
		const retainedEvents = retainedLines.map((line) => JSON.parse(line));
		const archivedPath = writeSqliteTranscriptArchive({
			archiveDirectory: resolveSqliteTranscriptArchiveDirectory(resolved),
			content: serializeJsonlLines(lines),
			reason: "bak",
			sessionId: resolved.sessionId
		});
		let previousIdentity = /* @__PURE__ */ new Map();
		let currentIdentity = /* @__PURE__ */ new Map();
		runOpenClawAgentWriteTransaction((writeDatabase) => {
			assertSqliteTranscriptSnapshotUnchanged(writeDatabase, resolved.sessionId, snapshotRows);
			const freshSessionSnapshot = readSqliteSessionEntrySelectionSnapshot(writeDatabase, resolved.sessionKey, true);
			assertSqliteSessionEntrySelectionUnchanged(sessionSnapshot, freshSessionSnapshot, "session.transcript.manual-compact");
			const freshEntry = freshSessionSnapshot.selected?.entry;
			if (!freshEntry || freshEntry.sessionId !== resolved.sessionId) throw new Error(`SQLite session changed before compacting ${resolved.sessionId}`);
			const identityKeys = collectSessionEntryLookupKeys(writeDatabase, resolved.sessionKey);
			previousIdentity = readSqliteSessionIdentitySnapshot(writeDatabase, identityKeys);
			replaceSqliteTranscriptEventsInTransaction(writeDatabase, resolved, retainedEvents);
			const nextEntry = cloneSessionEntry(freshEntry);
			delete nextEntry.contextBudgetStatus;
			delete nextEntry.inputTokens;
			delete nextEntry.outputTokens;
			delete nextEntry.totalTokens;
			delete nextEntry.totalTokensFresh;
			nextEntry.updatedAt = options.nowMs ?? Date.now();
			writeSessionEntry(writeDatabase, resolved.sessionKey, nextEntry, { previousEntry: freshEntry });
			currentIdentity = readSqliteSessionIdentitySnapshot(writeDatabase, identityKeys);
		}, toDatabaseOptions(resolved));
		emitCommittedSessionIdentityDiff(previousIdentity, currentIdentity);
		return {
			archivedPath,
			kept: retainedLines.length,
			trimmed: true
		};
	});
}
/** Appends one raw transcript event to the additive SQLite transcript store. */
async function appendSqliteTranscriptEvent(scope, event, options = {}) {
	assertNonMessageTranscriptEvent(event);
	const resolved = resolveSqliteTranscriptScope(scope);
	await runExclusiveSqliteSessionWrite(resolved, async () => {
		runOpenClawAgentWriteTransaction((database) => {
			appendTranscriptEventInTransaction(database, resolved, resolveTranscriptEventAppendParent(database, resolved.sessionId, event, options));
		}, toDatabaseOptions(resolved));
	});
}
/** Appends one raw non-message transcript event synchronously for sync session runtimes. */
function appendSqliteTranscriptEventSync(scope, event, options = {}) {
	assertNonMessageTranscriptEvent(event);
	const resolved = resolveSqliteTranscriptScope(scope);
	let appended = false;
	runOpenClawAgentWriteTransaction((database) => {
		const fresh = readSessionEntryRow(database, resolved.sessionKey);
		if (!fresh || fresh.entry.sessionId !== resolved.sessionId) return;
		appended = appendTranscriptEventInTransaction(database, resolved, resolveTranscriptEventAppendParent(database, resolved.sessionId, event, options));
	}, toDatabaseOptions(resolved));
	return appended;
}
function resolveTranscriptEventAppendParent(database, sessionId, event, options) {
	if (options.appendIntent !== "active-branch" || !event || typeof event !== "object" || Array.isArray(event) || !("parentId" in event)) return event;
	const parentId = event.parentId;
	if (parentId !== null && typeof parentId !== "string") return event;
	const effectiveParentId = resolveTranscriptMessageAppendParent(database, sessionId, {
		appendIntent: "active-branch",
		parentId
	});
	return effectiveParentId === parentId ? event : {
		...event,
		parentId: effectiveParentId
	};
}
/** Appends a guarded transcript turn and touches its session row in one queued write. */
async function appendSqliteExpectedSessionTranscriptTurn(scope, options) {
	const resolved = resolveSqliteTranscriptScope({
		...scope,
		sessionId: options.expectedSessionId
	});
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		const preparedEntry = readSessionEntryRow(openOpenClawAgentDatabase(toDatabaseOptions(resolved)), resolved.sessionKey);
		if (!sessionMatchesExpectedTranscriptTurn(preparedEntry, options)) return sqliteSessionTranscriptTurnRebound(preparedEntry, options.sessionFile);
		const messages = await selectAppendableSqliteTranscriptTurnMessages({
			agentId: resolved.agentId,
			sessionId: options.expectedSessionId,
			sessionKey: resolved.sessionKey,
			...scope.storePath ? { storePath: scope.storePath } : {}
		}, options.messages);
		let result = sqliteSessionTranscriptTurnRebound(preparedEntry, options.sessionFile);
		let previousIdentity = /* @__PURE__ */ new Map();
		let currentIdentity = /* @__PURE__ */ new Map();
		runOpenClawAgentWriteTransaction((transactionDb) => {
			const fresh = readSessionEntryRow(transactionDb, resolved.sessionKey);
			if (!sessionMatchesExpectedTranscriptTurn(fresh, options)) {
				result = sqliteSessionTranscriptTurnRebound(fresh, options.sessionFile);
				return;
			}
			const appendedMessages = [];
			for (const append of messages) {
				const { shouldAppend: _shouldAppend, ...appendOptions } = append;
				const appended = appendSqliteTranscriptMessageInTransaction(transactionDb, resolved, {
					...appendOptions,
					messageAlreadyRedacted: options.atomicGroup === true,
					...append.cwd ?? options.cwd ? { cwd: append.cwd ?? options.cwd } : {},
					...append.config ?? options.config ? { config: append.config ?? options.config } : {}
				});
				if (appended) appendedMessages.push(appended);
			}
			if (options.atomicGroup && (appendedMessages.length !== messages.length || appendedMessages.some((message) => message.appended) !== appendedMessages.every((message) => message.appended))) throw new Error("SQLite transcript batch was not wholly inserted or replayed");
			rememberCommittedSqliteTranscriptMessageSequencesInTransaction(transactionDb, resolved.sessionId, appendedMessages);
			const sessionPatch = buildExpectedTranscriptTurnSessionPatch({
				appendedMessages,
				currentEntry: fresh.entry,
				expectedSessionState: options.expectedSessionState,
				sessionFile: options.sessionFile,
				sessionLifecyclePatch: options.sessionLifecyclePatch,
				touchSessionEntry: options.touchSessionEntry
			});
			const next = Object.keys(sessionPatch).length > 0 ? mergeSessionEntry(fresh.entry, sessionPatch) : fresh.entry;
			if (next !== fresh.entry) {
				const identityKeys = collectSessionEntryLookupKeys(transactionDb, resolved.sessionKey);
				previousIdentity = readSqliteSessionIdentitySnapshot(transactionDb, identityKeys);
				writeSessionEntry(transactionDb, resolved.sessionKey, next);
				deleteLegacySessionEntryRows(transactionDb, fresh.legacyKeys, resolved.sessionKey);
				currentIdentity = readSqliteSessionIdentitySnapshot(transactionDb, identityKeys);
			}
			result = {
				appendedMessages,
				sessionEntry: cloneSessionEntry(next),
				sessionFile: options.sessionFile
			};
		}, toDatabaseOptions(resolved));
		emitCommittedSessionIdentityDiff(previousIdentity, currentIdentity);
		return result;
	});
}
function sqliteSessionTranscriptTurnRebound(selected, sessionFile) {
	return {
		appendedMessages: [],
		rejectedReason: "session-rebound",
		sessionEntry: selected?.entry,
		sessionFile
	};
}
async function selectAppendableSqliteTranscriptTurnMessages(context, messages) {
	const selected = [];
	for (const append of messages) if (append.shouldAppend ? await append.shouldAppend(context) : true) selected.push(append);
	return selected;
}
async function appendSqliteTranscriptMessage(scope, options) {
	const resolved = resolveSqliteTranscriptScope(scope);
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		let result;
		runOpenClawAgentWriteTransaction((database) => {
			result = appendSqliteTranscriptMessageInTransaction(database, resolved, options);
		}, toDatabaseOptions(resolved));
		return result;
	});
}
/** Appends one transcript message synchronously for sync session runtimes. */
function appendSqliteTranscriptMessageSync(scope, options) {
	const resolved = resolveSqliteTranscriptScope(scope);
	let result;
	runOpenClawAgentWriteTransaction((database) => {
		const fresh = readSessionEntryRow(database, resolved.sessionKey);
		if (!fresh || fresh.entry.sessionId !== resolved.sessionId) return;
		result = appendSqliteTranscriptMessageInTransaction(database, resolved, options);
	}, toDatabaseOptions(resolved));
	return result;
}
/** Runs read/append transcript work under one SQLite writer-queue critical section. */
async function withSqliteTranscriptWriteLock(scope, run) {
	const resolved = resolveSqliteTranscriptScope(scope);
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
		let transcriptSnapshot;
		return await run({
			readEvents: async () => {
				const snapshot = readSqliteTranscriptSnapshot(database, resolved.sessionId);
				transcriptSnapshot = {
					kind: "current",
					rows: snapshot.rows
				};
				return snapshot.events;
			},
			readMessageFacts: async (params) => readTranscriptMirrorFacts(database, resolved.sessionId, params),
			replaceEvents: async (events) => {
				if (transcriptSnapshot?.kind === "stale") throw new SqliteTranscriptMutationConflictError(resolved.sessionId);
				const expectedSnapshot = transcriptSnapshot?.rows;
				transcriptSnapshot = {
					kind: "current",
					rows: runOpenClawAgentWriteTransaction((writeDatabase) => {
						if (expectedSnapshot !== void 0) assertSqliteTranscriptSnapshotUnchanged(writeDatabase, resolved.sessionId, expectedSnapshot);
						replaceSqliteTranscriptEventsInTransaction(writeDatabase, resolved, events);
						return readSqliteTranscriptEventRows(writeDatabase, resolved.sessionId);
					}, toDatabaseOptions(resolved))
				};
			},
			appendMessage: async (options) => {
				let result;
				const snapshotState = transcriptSnapshot;
				let nextSnapshotState = snapshotState;
				runOpenClawAgentWriteTransaction((writeDatabase) => {
					const snapshotStillCurrent = snapshotState?.kind === "current" ? isSqliteTranscriptSnapshotUnchanged(writeDatabase, resolved.sessionId, snapshotState.rows) : false;
					result = appendSqliteTranscriptMessageInTransaction(writeDatabase, resolved, options);
					if (snapshotState?.kind === "current") nextSnapshotState = snapshotStillCurrent ? {
						kind: "current",
						rows: readSqliteTranscriptEventRows(writeDatabase, resolved.sessionId)
					} : { kind: "stale" };
				}, toDatabaseOptions(resolved));
				transcriptSnapshot = nextSnapshotState;
				return result;
			},
			appendMessageWithMessageSequence: async (options) => {
				let result;
				let messageSeq;
				runOpenClawAgentWriteTransaction((writeDatabase) => {
					result = appendSqliteTranscriptMessageInTransaction(writeDatabase, resolved, options);
					if (result) {
						rememberCommittedSqliteTranscriptMessageSequencesInTransaction(writeDatabase, resolved.sessionId, [result]);
						messageSeq = readCommittedSqliteTranscriptMessageSequence(result);
					}
				}, toDatabaseOptions(resolved));
				return {
					...messageSeq !== void 0 ? { messageSeq } : {},
					result
				};
			}
		});
	});
}
/** Runs synchronous transcript work under one writer queue and SQLite transaction. */
async function withSqliteTranscriptWriteTransaction(scope, run) {
	const resolved = resolveSqliteTranscriptScope(scope);
	return await runExclusiveSqliteSessionWrite(resolved, async () => runOpenClawAgentWriteTransaction(() => run({
		agentId: resolved.agentId,
		sessionId: resolved.sessionId,
		sessionKey: resolved.sessionKey,
		storePath: resolved.path ?? scope.storePath ?? resolveOpenClawAgentSqlitePath({
			agentId: resolved.agentId,
			env: resolved.env
		})
	}), toDatabaseOptions(resolved), { operationLabel: "session.transcript.batch" }));
}
function isSqliteTranscriptSnapshotUnchanged(database, sessionId, expected) {
	const current = readSqliteTranscriptEventRows(database, sessionId);
	return current.length === expected.length && current.every((row, index) => row.seq === expected[index]?.seq && row.eventJson === expected[index]?.eventJson);
}
function assertSqliteTranscriptSnapshotUnchanged(database, sessionId, expected) {
	if (!isSqliteTranscriptSnapshotUnchanged(database, sessionId, expected)) throw new SqliteTranscriptMutationConflictError(sessionId);
}
function appendSqliteTranscriptMessageInTransaction(database, resolved, options) {
	const existingAppendResult = (found) => ({
		appended: false,
		effectiveParentId: readTranscriptIdentityByEventId(database, resolved.sessionId, found.messageId)?.parentId ?? null,
		message: found.message,
		messageId: found.messageId
	});
	const idempotencyKey = readMessageIdempotencyKey(options.message);
	if (idempotencyKey && options.idempotencyLookup !== "caller-checked") {
		const existing = readTranscriptMessageByScopedIdempotencyKey(database, resolved, idempotencyKey, options.idempotencyLookup);
		if (existing) return existingAppendResult(existing);
	}
	const prepared = options.prepareMessageAfterIdempotencyCheck ? options.prepareMessageAfterIdempotencyCheck(options.message) : options.message;
	if (prepared === void 0) return;
	const messageId = options.eventId ?? randomUUID();
	const now = options.now ?? Date.now();
	const finalMessage = options.messageAlreadyRedacted ? prepared : redactTranscriptMessageForStorage(prepared, options);
	ensureTranscriptHeader(database, resolved, options.cwd, now);
	const parentId = resolveTranscriptMessageAppendParent(database, resolved.sessionId, options);
	const appended = appendTranscriptEventInTransaction(database, resolved, {
		type: "message",
		id: messageId,
		parentId: parentId ?? null,
		timestamp: resolveTimestampMsToIsoString(now),
		message: finalMessage
	}, { dedupeByMessageIdempotency: options.idempotencyLookup !== "caller-checked" && options.idempotencyLookup !== "scan-assistant" });
	if (!appended && idempotencyKey && options.idempotencyLookup !== "caller-checked") {
		const existing = readTranscriptMessageByScopedIdempotencyKey(database, resolved, idempotencyKey, options.idempotencyLookup);
		if (existing) return existingAppendResult(existing);
	}
	if (!appended) {
		const existing = readTranscriptMessageByEventId(database, resolved, messageId);
		if (existing) return existingAppendResult(existing);
	}
	if (!appended) throw new Error(`SQLite transcript append did not insert message ${messageId}.`);
	return {
		appended: true,
		effectiveParentId: parentId ?? null,
		message: finalMessage,
		messageId
	};
}
function assertNonMessageTranscriptEvent(event) {
	if (!event || typeof event !== "object" || Array.isArray(event)) return;
	if (event.type === "message") throw new Error("appendSqliteTranscriptEvent cannot write message transcript records; use appendSqliteTranscriptMessage instead.");
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-import.ts
/** Imports one legacy session entry and its transcript rows for doctor migration. */
async function importSqliteSessionRows(params) {
	const resolvedScope = resolveSqliteScope({
		...params.agentId ? { agentId: params.agentId } : {},
		...params.env ? { env: params.env } : {},
		sessionKey: params.sessionKey,
		...params.storePath ? { storePath: params.storePath } : {}
	});
	const resolved = params.preserveExactStoredKey ? {
		...resolvedScope,
		sessionKey: params.sessionKey
	} : resolvedScope;
	return await runExclusiveSqliteSessionWrite(resolved, async () => {
		let transcriptEvents = 0;
		runOpenClawAgentWriteTransaction((database) => {
			const currentEntry = readExactSessionEntryRowForCanonicalRepair(database, resolved.sessionKey, { allowMalformedRowRepair: params.allowMalformedRowRepair === true })?.entry;
			const preservedHarnessId = params.entry.agentHarnessId === void 0 && currentEntry?.sessionId === params.entry.sessionId && currentEntry.lifecycleRevision === params.entry.lifecycleRevision ? currentEntry.agentHarnessId?.trim() : void 0;
			const importedEntry = {
				...params.entry,
				...preservedHarnessId ? { agentHarnessId: preservedHarnessId } : {},
				sessionFile: formatSqliteSessionReferenceForScope({
					...resolved,
					sessionId: params.entry.sessionId
				})
			};
			writeSessionEntry(database, resolved.sessionKey, importedEntry, {
				allowStoredAliases: true,
				previousEntry: currentEntry ?? null
			});
			if (params.readTranscriptEvents) {
				const transcriptScope = {
					...resolved,
					sessionId: params.entry.sessionId
				};
				const existingEventJson = readTranscriptEventJsonSetInTransaction(database, params.entry.sessionId);
				params.readTranscriptEvents((event) => {
					const eventJson = JSON.stringify(event);
					if (existingEventJson.has(eventJson)) return;
					if (appendTranscriptEventInTransaction(database, transcriptScope, event, {
						allowStoredAlias: true,
						scheduleProjectionReconcile: false,
						touchMutation: false
					})) {
						existingEventJson.add(eventJson);
						transcriptEvents += 1;
					}
				});
				reconcileSessionTranscriptIndexInTransaction(database.db, params.entry.sessionId);
				publishSqliteSessionEntryCacheInvalidation(database);
			}
			if (params.transcriptMtimeMs !== void 0) advanceTranscriptMutationAtInTransaction(database, params.entry.sessionId, params.transcriptMtimeMs);
			else if (transcriptEvents > 0) touchTranscriptMutationInTransaction(database, params.entry.sessionId);
		}, toDatabaseOptions(resolved));
		return {
			sessionId: params.entry.sessionId,
			sessionKey: resolved.sessionKey,
			transcriptEvents
		};
	});
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-delta.ts
const RAW_TRANSCRIPT_CURSOR_VERSION = 1;
const DEFAULT_RAW_TRANSCRIPT_MAX_EVENTS = 1e3;
const DEFAULT_RAW_TRANSCRIPT_MAX_BYTES = 1e6;
const MAX_RAW_TRANSCRIPT_EVENTS = 1e4;
const MAX_RAW_TRANSCRIPT_BYTES = 64 * 1024 * 1024;
function normalizeRawDeltaLimit(value, fallback, maximum, name) {
	const resolved = value ?? fallback;
	if (!Number.isInteger(resolved) || resolved < 1 || resolved > maximum) throw new RangeError(`${name} must be an integer between 1 and ${String(maximum)}`);
	return resolved;
}
function encodeRawTranscriptCursor(cursor) {
	return Buffer.from(JSON.stringify(cursor), "utf8").toString("base64url");
}
function parseRawTranscriptCursor(value) {
	if (value.length > 4096) return;
	try {
		const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
		if (parsed.version !== RAW_TRANSCRIPT_CURSOR_VERSION || typeof parsed.agentId !== "string" || typeof parsed.sessionId !== "string" || typeof parsed.generation !== "string" || !Number.isSafeInteger(parsed.lastSeq) || (parsed.lastSeq ?? -2) < -1) return;
		return parsed;
	} catch {
		return;
	}
}
function bootstrapCursor(scope, generation) {
	return {
		agentId: scope.agentId,
		generation,
		lastSeq: -1,
		sessionId: scope.sessionId,
		version: RAW_TRANSCRIPT_CURSOR_VERSION
	};
}
/** Read one generation-consistent raw transcript page without parsing excluded payload rows. */
function readSqliteTranscriptRawDelta(scope, limits = {}) {
	const resolved = resolveSqliteTranscriptReadScope(scope);
	const maxEvents = normalizeRawDeltaLimit(limits.maxEvents, DEFAULT_RAW_TRANSCRIPT_MAX_EVENTS, MAX_RAW_TRANSCRIPT_EVENTS, "maxEvents");
	const maxBytes = normalizeRawDeltaLimit(limits.maxBytes, DEFAULT_RAW_TRANSCRIPT_MAX_BYTES, MAX_RAW_TRANSCRIPT_BYTES, "maxBytes");
	const database = openOpenClawAgentDatabase(toDatabaseOptions(resolved));
	return runSqliteDeferredTransactionSync(database.db, () => readRawDeltaInTransaction(database.db, resolved, limits.cursor, maxEvents, maxBytes), {
		databaseLabel: database.path,
		operationLabel: "session transcript raw delta"
	});
}
function readRawDeltaInTransaction(database, scope, encodedCursor, maxEvents, maxBytes) {
	const db = getSessionKysely(database);
	const state = executeSqliteQueryTakeFirstSync(database, db.selectFrom("transcript_rewrite_watermarks").select("generation").where("session_id", "=", scope.sessionId));
	if (!state) return { kind: "missing" };
	const initialCursor = bootstrapCursor(scope, state.generation);
	const reset = (reason) => ({
		kind: "reset",
		cursor: encodeRawTranscriptCursor(initialCursor),
		reason
	});
	const cursor = encodedCursor !== void 0 ? parseRawTranscriptCursor(encodedCursor) : initialCursor;
	if (!cursor) return reset("invalid_cursor");
	if (cursor.agentId !== scope.agentId || cursor.sessionId !== scope.sessionId) return reset("scope_mismatch");
	if (cursor.generation !== state.generation) return reset("generation_mismatch");
	const frontier = executeSqliteQueryTakeFirstSync(database, db.selectFrom("transcript_events").select("seq").where("session_id", "=", scope.sessionId).orderBy("seq", "desc").limit(1));
	const maxSeq = frontier ? normalizeSqliteNumber(frontier.seq) : -1;
	if (cursor.lastSeq > maxSeq) return reset("invalid_cursor");
	const metadata = executeSqliteQuerySync(database, db.selectFrom("transcript_events").select(["seq", sql`LENGTH(CAST(event_json AS BLOB)) + 1`.as("serialized_bytes")]).where("session_id", "=", scope.sessionId).where("seq", ">", cursor.lastSeq).orderBy("seq", "asc").limit(maxEvents + 1)).rows.map((row) => ({
		seq: normalizeSqliteNumber(row.seq),
		serializedBytes: normalizeSqliteNumber(row.serialized_bytes)
	}));
	let serializedBytes = 0;
	let selectedCount = 0;
	for (const row of metadata) {
		if (selectedCount >= maxEvents || serializedBytes + row.serializedBytes > maxBytes) break;
		serializedBytes += row.serializedBytes;
		selectedCount += 1;
	}
	const lastSeq = metadata.slice(0, selectedCount).at(-1)?.seq ?? cursor.lastSeq;
	const rows = selectedCount === 0 ? [] : executeSqliteQuerySync(database, db.selectFrom("transcript_events").select(["event_json", "seq"]).where("session_id", "=", scope.sessionId).where("seq", ">", cursor.lastSeq).where("seq", "<=", lastSeq).orderBy("seq", "asc")).rows.map((row) => ({
		event: JSON.parse(row.event_json),
		seq: normalizeSqliteNumber(row.seq)
	}));
	const nextCursor = encodeRawTranscriptCursor({
		...cursor,
		lastSeq
	});
	const requiredBytes = selectedCount === 0 && metadata[0] ? metadata[0].serializedBytes : void 0;
	return {
		kind: "page",
		cursor: nextCursor,
		events: rows,
		hasMore: selectedCount < metadata.length,
		...requiredBytes !== void 0 ? { requiredBytes } : {},
		serializedBytes
	};
}
//#endregion
export { listSqliteSessionChildEntriesReadOnly as $, derivePromptTokens as A, emitSessionLifecycleEvent as At, purgeSqliteDeletedAgentSessionEntries as B, resolveProjectionExistingEntry as C, buildSessionCreationStamp as Ct, forkSqliteSessionTranscriptFromParent as D, streamSessionTranscriptLinesReverse as Dt, forkSqliteSessionEntryFromParentTarget as E, streamSessionTranscriptLines as Et, toOpenAiChatCompletionsUsage as F, rollbackSqlitePluginOwnedSessionEntryLifecycle as G, deleteSqliteSessionEntryLifecycle as H, toOpenAiResponsesUsage as I, listSqliteSessionGenerationIdsForCanonicalRepair as J, copySqliteSessionOwnedStateForCanonicalRepair as K, applySqliteSessionEntryLifecycleMutation as L, hasNonzeroUsage as M, onSessionLifecycleEvent as Mt, makeZeroUsageSnapshot as N, resolveInternalSessionEffectsIdentity as Nt, resolveSqliteSessionParentForkDecision as O, readFileRangeAsync as Ot, normalizeUsage as P, hasSqliteSessionEntriesByStatusReadOnly as Q, applySqliteSessionEntryReplacements as R, inheritSessionSelection as S, publishSqliteTranscriptUpdate as St, restoreSqliteCompactionCheckpointSession as T, serializeJsonlLines as Tt, resetSqliteSessionEntryLifecycle as U, cleanupSqliteSessionLifecycleArtifacts as V, rollbackSqliteAgentHarnessSessionEntryLifecycle as W, rehomeSqliteSessionDeliveryReferencesForCanonicalRepairBatch as X, rehomeSqliteSessionDeliveryReferencesForCanonicalRepair as Y, countSqliteSessionEntryRowsReadOnly as Z, forkSqliteSessionAtMessage as _, updateSqliteSessionLastRoute as _t, appendSqliteTranscriptEventSync as a, loadExactSqliteSessionEntry as at, rewindSqliteSessionToMessage as b, enforceSqliteSessionHistoryDiskBudget as bt, replaceSqliteTranscriptEvents as c, loadSqliteSessionEntryReadOnly as ct, trimSqliteTranscriptForManualCompact as d, readSqliteSessionUpdatedAt as dt, listSqliteSessionEntries as et, withSqliteTranscriptWriteLock as f, recordSqliteInboundSessionMeta as ft, rememberCommittedSqliteTranscriptMessageSequences as g, resolveSqliteSessionKeyBySessionId as gt, readCommittedSqliteTranscriptMessageSequence as h, resolveSqliteSessionEntry as ht, appendSqliteTranscriptEvent as i, listSqliteSessionTranscriptInstances as it, deriveSessionTotalTokens as j, onSessionIdentityMutation as jt, deriveContextPromptTokens as k, writeSqliteTranscriptArchive as kt, replaceSqliteTranscriptEventsSync as l, patchSqliteSessionEntry as lt, sessionMatchesExpectedTranscriptTurn as m, replaceSqliteSessionEntrySync as mt, importSqliteSessionRows as n, listSqliteSessionEntriesReadOnly as nt, appendSqliteTranscriptMessage as o, loadExactSqliteSessionEntryReadOnly as ot, withSqliteTranscriptWriteTransaction as p, replaceSqliteSessionEntry as pt, listSqliteSessionEntriesForCanonicalRepair as q, appendSqliteExpectedSessionTranscriptTurn as r, listSqliteSessionEntryKeysReadOnly as rt, appendSqliteTranscriptMessageSync as s, loadSqliteSessionEntry as st, readSqliteTranscriptRawDelta as t, listSqliteSessionEntriesByStatus as tt, rewriteSqliteTranscriptEventRowsExact as u, patchSqliteSessionEntryTarget as ut, listSqliteSessionBranches as v, upsertSqliteSessionEntry as vt, branchSqliteCompactionCheckpointSession as w, sessionEntryForkedFromParent as wt, switchSqliteSessionBranch as x, inspectSqliteSessionHistoryDiskBudget as xt, resolveSessionTranscriptActiveLeafEntryId as y, resolveSessionStorePathForScope as yt, applySqliteSessionStoreProjection as z };
