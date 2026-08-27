import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { p as isCompactionCheckpointTranscriptFileName } from "./paths-DSnYpBD3.js";
import { Et as streamSessionTranscriptLines, Ot as readFileRangeAsync, T as restoreSqliteCompactionCheckpointSession, st as loadSqliteSessionEntry, w as branchSqliteCompactionCheckpointSession } from "./session-accessor.sqlite-B9iW7DOt.js";
import { n as parseSqliteSessionFileMarker } from "./legacy-sqlite-marker-COPKCuIN.js";
import { b as scanSessionTranscriptTree } from "./session-transcript-index-cy-aJty7.js";
import { x as loadSqliteTranscriptEventsSync } from "./session-accessor.sqlite-transcript-store-Si6-bv-m.js";
import { K as updateSessionEntry } from "./session-accessor-t3qUoTeV.js";
import { o as migrateSessionEntries } from "./session-manager-codec-DRZh7P2-.js";
import "./session-manager-dOl3u7vE.js";
import { k as resolveGatewaySessionStoreTarget } from "./session-utils-row-BDvhdN3C.js";
import "./session-utils-C8yYh4dv.js";
import { randomUUID } from "node:crypto";
import path from "node:path";
import fs from "node:fs/promises";
//#region src/gateway/session-compaction-checkpoints.ts
const log = createSubsystemLogger("gateway/session-compaction-checkpoints");
const MAX_COMPACTION_CHECKPOINT_LEAF_SCAN_BYTES = 64 * 1024 * 1024;
const MAX_COMPACTION_CHECKPOINT_RETAINED_BYTES_PER_SESSION = 128 * 1024 * 1024;
function resolveCompactionCheckpointTranscriptPosition(params) {
	const leafId = params.preferredLeafId ?? params.transcriptState?.leafId ?? void 0;
	const entryId = params.transcriptState?.entryId ?? leafId;
	return {
		...leafId ? { leafId } : {},
		...entryId ? { entryId } : {}
	};
}
function checkpointSnapshotPath(checkpoint) {
	return checkpoint.preCompaction.sessionFile?.trim() || void 0;
}
function checkpointSnapshotBytes(checkpoint, snapshotBytesByPath) {
	const sessionFile = checkpointSnapshotPath(checkpoint);
	if (!sessionFile) return 0;
	const bytes = snapshotBytesByPath.get(sessionFile);
	return typeof bytes === "number" && Number.isFinite(bytes) && bytes > 0 ? bytes : 0;
}
function trimSessionCheckpoints(checkpoints, snapshotBytesByPath = /* @__PURE__ */ new Map()) {
	if (!Array.isArray(checkpoints) || checkpoints.length === 0) return {
		kept: void 0,
		removed: []
	};
	const countTrimmed = checkpoints.slice(-25);
	const countRemoved = checkpoints.slice(0, Math.max(0, checkpoints.length - countTrimmed.length));
	const keptNewestFirst = [];
	const byteRemovedNewestFirst = [];
	let retainedBytes = 0;
	for (let index = countTrimmed.length - 1; index >= 0; index -= 1) {
		const checkpoint = countTrimmed[index];
		if (!checkpoint) continue;
		const checkpointBytes = checkpointSnapshotBytes(checkpoint, snapshotBytesByPath);
		if (keptNewestFirst.length === 0 || retainedBytes + checkpointBytes <= MAX_COMPACTION_CHECKPOINT_RETAINED_BYTES_PER_SESSION) {
			keptNewestFirst.push(checkpoint);
			retainedBytes += checkpointBytes;
		} else byteRemovedNewestFirst.push(checkpoint);
	}
	const kept = keptNewestFirst.toReversed();
	return {
		kept: kept.length > 0 ? kept : void 0,
		removed: [...countRemoved, ...byteRemovedNewestFirst.toReversed()]
	};
}
function sessionStoreCheckpoints(entry) {
	return Array.isArray(entry?.compactionCheckpoints) ? [...entry.compactionCheckpoints] : [];
}
async function statCheckpointSnapshotBytes(checkpoints) {
	const bytesByPath = /* @__PURE__ */ new Map();
	await Promise.all(checkpoints.map(async (checkpoint) => {
		const sessionFile = checkpointSnapshotPath(checkpoint);
		if (!sessionFile || bytesByPath.has(sessionFile)) return;
		try {
			const stat = await fs.stat(sessionFile);
			bytesByPath.set(sessionFile, stat.isFile() ? stat.size : 0);
		} catch {
			bytesByPath.set(sessionFile, 0);
		}
	}));
	return bytesByPath;
}
/** Resolve the stored checkpoint reason from compaction trigger state. */
function resolveSessionCompactionCheckpointReason(params) {
	if (params.trigger === "manual") return "manual";
	if (params.timedOut) return "timeout-retry";
	if (params.trigger === "overflow") return "overflow-retry";
	return "auto-threshold";
}
const SESSION_HEADER_READ_MAX_BYTES = 64 * 1024;
const SESSION_TAIL_READ_INITIAL_BYTES = 64 * 1024;
async function readSessionHeaderFromTranscriptAsync(sessionFile) {
	let fileHandle;
	try {
		fileHandle = await fs.open(sessionFile, "r");
		const buffer = await readFileRangeAsync(fileHandle, 0, SESSION_HEADER_READ_MAX_BYTES);
		if (buffer.length <= 0) return null;
		const firstLine = buffer.toString("utf-8").split(/\r?\n/).map((line) => line.trim()).find((line) => line.length > 0);
		if (!firstLine) return null;
		const parsed = JSON.parse(firstLine);
		if (parsed.type !== "session" || typeof parsed.id !== "string" || !parsed.id.trim()) return null;
		return {
			id: parsed.id.trim(),
			...typeof parsed.cwd === "string" && parsed.cwd.trim() ? { cwd: parsed.cwd } : {}
		};
	} catch {
		return null;
	} finally {
		if (fileHandle) await fileHandle.close().catch(() => void 0);
	}
}
async function readSessionIdFromTranscriptHeaderAsync(sessionFile) {
	return (await readSessionHeaderFromTranscriptAsync(sessionFile))?.id ?? null;
}
function parseTranscriptLine(line) {
	try {
		const parsed = JSON.parse(line);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
		return parsed;
	} catch {
		return null;
	}
}
async function readTranscriptEntriesForForkAsync(params) {
	const entries = [];
	const stopAfterEntryId = params.stopAfterEntryId?.trim();
	let foundStopEntry = false;
	try {
		for await (const line of streamSessionTranscriptLines(params.sessionFile)) try {
			const parsed = JSON.parse(line);
			if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) continue;
			entries.push(parsed);
			if (stopAfterEntryId && parsed.type !== "session" && parsed.id === stopAfterEntryId) {
				foundStopEntry = true;
				break;
			}
		} catch {}
	} catch {
		return null;
	}
	const firstEntry = entries[0];
	if (firstEntry?.type !== "session" || typeof firstEntry.id !== "string") return null;
	if (stopAfterEntryId && !foundStopEntry) return null;
	return entries;
}
function trimTranscriptEntriesThroughLeaf(entries, leafId) {
	const normalizedLeafId = leafId?.trim();
	if (!normalizedLeafId) return entries;
	const leafIndex = entries.findIndex((entry, index) => index > 0 && entry.id === normalizedLeafId);
	if (leafIndex < 1) return null;
	return entries.slice(0, leafIndex + 1);
}
async function readSessionLeafStateFromTranscriptAsync(sessionFile, maxBytes = MAX_COMPACTION_CHECKPOINT_LEAF_SCAN_BYTES) {
	if (typeof sessionFile !== "string") return readSessionLeafStateFromRecords(loadSqliteTranscriptEventsSync(sessionFile).filter((event) => Boolean(event) && typeof event === "object" && !Array.isArray(event)));
	const sqliteMarker = parseSqliteSessionFileMarker(sessionFile);
	if (sqliteMarker) return readSessionLeafStateFromRecords(loadSqliteTranscriptEventsSync(sqliteMarker).filter((event) => Boolean(event) && typeof event === "object" && !Array.isArray(event)));
	let fileHandle;
	try {
		fileHandle = await fs.open(sessionFile, "r");
		const stat = await fileHandle.stat();
		if (!stat.isFile() || stat.size <= 0) return null;
		const requestedMaxBytes = Number.isFinite(maxBytes) ? Math.max(1024, Math.floor(maxBytes)) : MAX_COMPACTION_CHECKPOINT_LEAF_SCAN_BYTES;
		const maxReadableBytes = Math.min(stat.size, requestedMaxBytes);
		let readLength = Math.min(maxReadableBytes, SESSION_TAIL_READ_INITIAL_BYTES);
		while (readLength > 0) {
			const readStart = Math.max(0, stat.size - readLength);
			const lines = (await readFileRangeAsync(fileHandle, readStart, readLength)).toString("utf-8").split(/\r?\n/);
			const candidateLines = readStart > 0 ? lines.slice(1) : lines;
			const records = [];
			let latestEntryId;
			for (const candidateLine of candidateLines) {
				const line = candidateLine.trim();
				if (!line) continue;
				const parsed = parseTranscriptLine(line);
				if (!parsed) continue;
				records.push(parsed);
				if (parsed.type === "session") continue;
				const entryId = typeof parsed.id === "string" ? parsed.id.trim() : "";
				if (entryId) latestEntryId = entryId;
			}
			const tree = scanSessionTranscriptTree(records);
			if (latestEntryId && tree.hasLeafUpdate && (!tree.hasInvalidLeafControl || readStart === 0)) return {
				entryId: latestEntryId,
				leafId: tree.leafId
			};
			if (readStart === 0) return null;
			const nextReadLength = Math.min(maxReadableBytes, readLength * 2);
			if (nextReadLength === readLength) return latestEntryId ? {
				entryId: latestEntryId,
				leafId: latestEntryId
			} : null;
			readLength = nextReadLength;
		}
	} catch {
		return null;
	} finally {
		if (fileHandle) await fileHandle.close().catch(() => void 0);
	}
	return null;
}
function readSessionLeafStateFromRecords(records) {
	let latestEntryId;
	for (const record of records) {
		if (record.type === "session") continue;
		const entryId = typeof record.id === "string" ? record.id.trim() : "";
		if (entryId) latestEntryId = entryId;
	}
	if (!latestEntryId) return null;
	const tree = scanSessionTranscriptTree(records);
	return {
		entryId: latestEntryId,
		leafId: tree.leafId
	};
}
function resolveCheckpointTranscriptForkSource(checkpoint) {
	const preCompactionFile = checkpoint.preCompaction.sessionFile?.trim();
	if (preCompactionFile) return {
		sourceFile: preCompactionFile,
		sourceLeafId: checkpoint.preCompaction.entryId ?? checkpoint.preCompaction.leafId,
		totalTokens: checkpoint.tokensBefore
	};
	const postCompactionFile = checkpoint.postCompaction.sessionFile?.trim();
	if (!postCompactionFile) return null;
	const postCompactionLeafId = checkpoint.postCompaction.entryId ?? checkpoint.postCompaction.leafId;
	if (!postCompactionLeafId) return null;
	return {
		sourceFile: postCompactionFile,
		sourceLeafId: postCompactionLeafId,
		totalTokens: checkpoint.tokensAfter
	};
}
async function prepareLegacyCheckpointSource(checkpoint) {
	if (!checkpoint) return;
	const forkSource = resolveCheckpointTranscriptForkSource(checkpoint);
	if (!forkSource) return;
	const entries = await readTranscriptEntriesForForkAsync({
		sessionFile: forkSource.sourceFile,
		stopAfterEntryId: forkSource.sourceLeafId
	});
	if (!entries) return;
	migrateSessionEntries(entries);
	const events = trimTranscriptEntriesThroughLeaf(entries, forkSource.sourceLeafId);
	if (!events) return;
	return {
		checkpointId: checkpoint.checkpointId,
		events,
		sessionFile: forkSource.sourceFile,
		...forkSource.sourceLeafId ? { sourceLeafId: forkSource.sourceLeafId } : {},
		...typeof forkSource.totalTokens === "number" ? { totalTokens: forkSource.totalTokens } : {}
	};
}
function findCheckpoint(entry, checkpointId) {
	return entry?.compactionCheckpoints?.find((checkpoint) => checkpoint.checkpointId === checkpointId);
}
async function branchCheckpointSessionFromStoredBoundary(params) {
	const legacySource = await prepareLegacyCheckpointSource(findCheckpoint(loadSqliteSessionEntry({
		...params.agentId ? { agentId: params.agentId } : {},
		storePath: params.storePath,
		sessionKey: params.sourceStoreKey ?? params.sourceKey
	}), params.checkpointId));
	return await branchSqliteCompactionCheckpointSession({
		...params.agentId ? { agentId: params.agentId } : {},
		storePath: params.storePath,
		sourceKey: params.sourceKey,
		nextKey: params.nextKey,
		checkpointId: params.checkpointId,
		...params.sourceStoreKey ? { sourceStoreKey: params.sourceStoreKey } : {},
		...legacySource ? { legacySource } : {}
	});
}
async function restoreCheckpointSessionFromStoredBoundary(params) {
	const legacySource = await prepareLegacyCheckpointSource(findCheckpoint(loadSqliteSessionEntry({
		...params.agentId ? { agentId: params.agentId } : {},
		storePath: params.storePath,
		sessionKey: params.sessionStoreKey ?? params.sessionKey
	}), params.checkpointId));
	return await restoreSqliteCompactionCheckpointSession({
		...params.agentId ? { agentId: params.agentId } : {},
		storePath: params.storePath,
		sessionKey: params.sessionKey,
		checkpointId: params.checkpointId,
		...params.sessionStoreKey ? { sessionStoreKey: params.sessionStoreKey } : {},
		...legacySource ? { legacySource } : {}
	});
}
/**
* Creates the current file-backed compaction checkpoint domain store.
*
* The branch/restore operations own the transcript fork plus session entry
* update so a SQLite implementation can copy transcript rows and update
* `session_nodes.entry_json` inside one write transaction.
*/
function createFileBackedCompactionCheckpointStore() {
	return {
		captureSnapshot: captureCompactionCheckpointSnapshotAsync,
		persistCheckpoint: persistSessionCompactionCheckpoint,
		cleanupSnapshot: cleanupCompactionCheckpointSnapshot,
		branchCheckpointSession: branchCheckpointSessionFromStoredBoundary,
		restoreCheckpointSession: restoreCheckpointSessionFromStoredBoundary
	};
}
/**
* Capture the stable pre-compaction identity without duplicating the transcript.
* Branch/restore uses the compacted successor transcript, while legacy
* checkpoints that already have a snapshot file keep working.
*/
async function captureCompactionCheckpointSnapshotAsync(params) {
	const getLeafId = params.sessionManager && typeof params.sessionManager.getLeafId === "function" ? params.sessionManager.getLeafId.bind(params.sessionManager) : null;
	const sessionFile = params.sessionFile.trim();
	if (!sessionFile || params.sessionManager && !getLeafId) return null;
	const liveLeafId = getLeafId ? getLeafId() : void 0;
	if (getLeafId && !liveLeafId) return null;
	const maxBytes = params.maxBytes ?? MAX_COMPACTION_CHECKPOINT_LEAF_SCAN_BYTES;
	const sqliteTarget = params.sessionTarget ?? parseSqliteSessionFileMarker(sessionFile);
	if (sqliteTarget) {
		if (typeof params.sessionManager?.getEntries !== "function") return null;
		const position = resolveCompactionCheckpointTranscriptPosition({
			preferredLeafId: liveLeafId,
			transcriptState: readSessionLeafStateFromRecords(params.sessionManager.getEntries())
		});
		const leafId = position.leafId;
		if (!leafId) return null;
		return {
			sessionId: typeof params.sessionManager.getSessionId === "function" ? params.sessionManager.getSessionId() : sqliteTarget.sessionId,
			leafId,
			...position.entryId ? { entryId: position.entryId } : {}
		};
	}
	const sessionId = await readSessionIdFromTranscriptHeaderAsync(sessionFile);
	const position = resolveCompactionCheckpointTranscriptPosition({
		preferredLeafId: liveLeafId,
		transcriptState: await readSessionLeafStateFromTranscriptAsync(sessionFile, maxBytes)
	});
	const leafId = position.leafId;
	if (!sessionId || !leafId) return null;
	return {
		sessionId,
		leafId,
		...position.entryId ? { entryId: position.entryId } : {}
	};
}
async function cleanupCompactionCheckpointSnapshot(snapshot) {
	if (!snapshot?.sessionFile) return;
	try {
		await fs.unlink(snapshot.sessionFile);
	} catch {}
}
async function cleanupTrimmedCompactionCheckpointFiles(params) {
	if (params.removed.length === 0 || !params.artifactDir) return;
	const artifactDir = path.resolve(params.artifactDir);
	const retainedPaths = new Set((params.retained ?? []).map((checkpoint) => checkpoint.preCompaction.sessionFile?.trim()).filter((filePath) => Boolean(filePath)));
	for (const checkpoint of params.removed) {
		const sessionFile = checkpoint.preCompaction.sessionFile?.trim();
		if (!sessionFile || retainedPaths.has(sessionFile)) continue;
		const resolvedSessionFile = path.resolve(sessionFile);
		if (path.dirname(resolvedSessionFile) !== artifactDir || !isCompactionCheckpointTranscriptFileName(path.basename(resolvedSessionFile))) continue;
		try {
			await fs.unlink(resolvedSessionFile);
		} catch {}
	}
}
async function persistSessionCompactionCheckpoint(params) {
	const snapshotSessionFile = params.snapshot.sessionFile?.trim();
	const postSessionFile = params.postSessionFile?.trim();
	const snapshotSqliteMarker = parseSqliteSessionFileMarker(snapshotSessionFile);
	const postSqliteMarker = parseSqliteSessionFileMarker(postSessionFile);
	const snapshotArtifactFile = snapshotSqliteMarker ? void 0 : snapshotSessionFile;
	const postArtifactFile = postSqliteMarker ? void 0 : postSessionFile;
	const postSourceLeafId = params.postEntryId?.trim() || params.postLeafId?.trim();
	if (!snapshotArtifactFile && !postSourceLeafId) {
		log.warn("skipping compaction checkpoint persist: missing stable fork source", { sessionKey: params.sessionKey });
		return null;
	}
	const target = resolveGatewaySessionStoreTarget({
		cfg: params.cfg,
		key: params.sessionKey
	});
	const createdAt = params.createdAt ?? Date.now();
	const checkpoint = {
		checkpointId: randomUUID(),
		sessionKey: target.canonicalKey,
		sessionId: params.sessionId,
		createdAt,
		reason: params.reason,
		...typeof params.tokensBefore === "number" ? { tokensBefore: params.tokensBefore } : {},
		...typeof params.tokensAfter === "number" ? { tokensAfter: params.tokensAfter } : {},
		...params.summary?.trim() ? { summary: params.summary.trim() } : {},
		...params.firstKeptEntryId?.trim() ? { firstKeptEntryId: params.firstKeptEntryId.trim() } : {},
		preCompaction: {
			sessionId: params.snapshot.sessionId,
			...snapshotArtifactFile ? { sessionFile: snapshotArtifactFile } : {},
			leafId: params.snapshot.leafId,
			...params.snapshot.entryId?.trim() ? { entryId: params.snapshot.entryId.trim() } : {}
		},
		postCompaction: {
			sessionId: params.sessionId,
			...postArtifactFile ? { sessionFile: postArtifactFile } : {},
			...params.postLeafId?.trim() ? { leafId: params.postLeafId.trim() } : {},
			...params.postEntryId?.trim() ? { entryId: params.postEntryId.trim() } : {}
		}
	};
	let trimmedCheckpoints;
	let stored = false;
	if (!await updateSessionEntry({
		storePath: target.storePath,
		sessionKey: target.canonicalKey
	}, async (existing) => {
		if (!existing.sessionId) return null;
		const checkpoints = sessionStoreCheckpoints(existing);
		checkpoints.push(checkpoint);
		trimmedCheckpoints = trimSessionCheckpoints(checkpoints, await statCheckpointSnapshotBytes(checkpoints));
		stored = true;
		return {
			updatedAt: Math.max(existing.updatedAt ?? 0, createdAt),
			compactionCheckpoints: trimmedCheckpoints.kept
		};
	}) || !stored) {
		log.warn("skipping compaction checkpoint persist: session not found", { sessionKey: params.sessionKey });
		return null;
	}
	const checkpointArtifactFile = snapshotArtifactFile || postArtifactFile || "";
	await cleanupTrimmedCompactionCheckpointFiles({
		removed: trimmedCheckpoints?.removed ?? [],
		retained: trimmedCheckpoints?.kept,
		...checkpointArtifactFile ? { artifactDir: path.dirname(checkpointArtifactFile) } : {}
	});
	return checkpoint;
}
function listSessionCompactionCheckpoints(entry) {
	return sessionStoreCheckpoints(entry).toSorted((a, b) => b.createdAt - a.createdAt);
}
function getSessionCompactionCheckpoint(params) {
	const checkpointId = params.checkpointId.trim();
	if (!checkpointId) return;
	return listSessionCompactionCheckpoints(params.entry).find((checkpoint) => checkpoint.checkpointId === checkpointId);
}
//#endregion
export { resolveCompactionCheckpointTranscriptPosition as a, readSessionLeafStateFromTranscriptAsync as i, getSessionCompactionCheckpoint as n, resolveSessionCompactionCheckpointReason as o, listSessionCompactionCheckpoints as r, createFileBackedCompactionCheckpointStore as t };
