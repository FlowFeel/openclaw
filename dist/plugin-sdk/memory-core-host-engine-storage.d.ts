import { $r as listMemoryFiles, Gr as MemoryChunk, Hr as CuratedProjectAnnotations, Jr as buildMultimodalChunkForIndexing, Kr as MemoryFileEntry, Qr as extractProjectKeysFromCuratedEntry, Ur as INVALID_PROJECT_ANNOTATION_KEY, Vr as CuratedMarkdownEntry, Wr as MEMORY_CHUNKING_VERSION, Xr as cosineSimilarity, Yr as chunkMarkdown, Zr as ensureMemoryHostDir, _i as MemorySyncParams, ai as splitCuratedMarkdownEntries, ci as MemoryOriginClass, di as MemorySearchManager, ei as normalizeExtraMemoryPaths, fi as MemorySearchResult, gi as MemorySource, hi as MemorySessionSyncTarget, ii as runMemoryHostTasksWithConcurrency, li as MemoryProviderStatus, mi as MemorySessionKind, ni as parseEmbedding, oi as stripMemoryAnnotationCarriers, pi as MemorySearchRuntimeDebug, qr as buildFileEntry, ri as remapChunkLines, si as MemoryEntryProvenance, ti as normalizeProjectAnnotationKey, ui as MemoryReadResult, vi as MemorySyncProgressUpdate, yi as resolveMemorySearchStaleness } from "../types-fxGJj6Ov.js";
import { a as SqliteWalMaintenanceOptions, i as SqliteWalMaintenance, r as SqliteConnectionPragmaOptions } from "../openclaw-state-db-contract-CmXakrzW.js";
import { i as resolveMemoryBackendConfig, n as ResolvedQmdConfig, r as ResolvedQmdMcporterConfig, t as ResolvedMemoryBackendConfig } from "../backend-config-BR8b4yed.js";
import { n as readMemoryFile } from "../read-file-t4EYUDCt.js";
import { Stats } from "node:fs";
import { DatabaseSync } from "node:sqlite";

//#region node_modules/@openclaw/fs-safe/dist/regular-file.d.ts
type RegularFileStatResult = {
  missing: true;
} | {
  missing: false;
  stat: Stats;
};
declare function statRegularFile(filePath: string): Promise<RegularFileStatResult>;
//#endregion
//#region packages/memory-host-sdk/src/host/fs-utils.d.ts
/** True for missing-file errors emitted by Node or fs-safe. */
declare function isFileMissingError(err: unknown): err is NodeJS.ErrnoException & {
  code: "ENOENT" | "ENOTDIR" | "not-found";
};
//#endregion
//#region packages/memory-host-sdk/src/host/hash.d.ts
/** SHA-256 hash helper for stable cache/content keys. */
declare function hashText(value: string): string;
//#endregion
//#region packages/memory-host-sdk/src/host/read-file-shared.d.ts
/** Default number of lines returned by memory read helpers. */
declare const DEFAULT_MEMORY_READ_LINES = 120;
/** Default max character budget for memory read helper output. */
declare const DEFAULT_MEMORY_READ_MAX_CHARS = 12000;
/** Build a memory read result from an already-selected line slice. */
declare function buildMemoryReadResultFromSlice(params: {
  selectedLines: string[];
  relPath: string;
  startLine: number;
  moreSourceLinesRemain?: boolean;
  maxChars?: number;
  suggestReadFallback?: boolean;
}): MemoryReadResult;
/** Build a memory read result from raw file content and caller range options. */
declare function buildMemoryReadResult(params: {
  content: string;
  relPath: string;
  from?: number;
  lines?: number;
  defaultLines?: number;
  maxChars?: number;
  suggestReadFallback?: boolean;
}): MemoryReadResult;
//#endregion
//#region packages/memory-host-sdk/src/host/read-retry.d.ts
/** Return true for transient memory read failures that should be retried. */
declare function isTransientMemoryReadError(error: unknown): boolean;
/** Retry a memory read with the narrow transient error predicate. */
declare function retryTransientMemoryRead<T>(read: () => Promise<T>, label?: string): Promise<T>;
//#endregion
//#region packages/memory-host-sdk/src/host/memory-schema-recall.d.ts
declare const MEMORY_INDEX_CHUNK_RECALL_METADATA_TABLE = "memory_index_chunk_recall_metadata";
declare function ensureMemoryRecallMetadataSchema(db: DatabaseSync): void;
//#endregion
//#region packages/memory-host-sdk/src/host/memory-schema-fts.d.ts
declare const MEMORY_INDEX_SOURCES_TABLE = "memory_index_sources";
declare const MEMORY_INDEX_CHUNKS_TABLE = "memory_index_chunks";
declare const MEMORY_INDEX_FTS_TABLE = "memory_index_chunks_fts";
declare const MEMORY_INDEX_PATHS_FTS_TABLE = "memory_index_paths_fts";
/** Drop the canonical source-to-path-FTS maintenance triggers. */
declare function dropMemoryPathFtsTriggers(db: DatabaseSync): void;
/** Install the canonical source-to-path-FTS maintenance triggers. */
declare function ensureMemoryPathFtsTriggers(db: DatabaseSync): void;
//#endregion
//#region packages/memory-host-sdk/src/host/memory-schema-provenance.d.ts
declare const MEMORY_INDEX_CHUNK_PROVENANCE_TABLE = "memory_index_chunk_provenance";
declare function ensureMemoryChunkProvenance(db: DatabaseSync): void;
//#endregion
//#region packages/memory-host-sdk/src/host/memory-schema-base.d.ts
declare const MEMORY_INDEX_META_TABLE = "memory_index_meta";
declare const MEMORY_EMBEDDING_CACHE_TABLE = "memory_embedding_cache";
declare const MEMORY_INDEX_STATE_TABLE = "memory_index_state";
declare const MEMORY_INDEX_VECTOR_TABLE = "memory_index_chunks_vec";
//#endregion
//#region packages/memory-host-sdk/src/host/memory-schema.d.ts
/** Ensure canonical memory index tables and the optional FTS table exist. */
declare function ensureMemoryIndexSchema(params: {
  db: DatabaseSync; /** @deprecated Omit to use the canonical memory cache table. */
  embeddingCacheTable?: string;
  cacheEnabled: boolean; /** @deprecated Omit to use the canonical memory FTS table. */
  ftsTable?: string;
  ftsEnabled: boolean;
  ftsTokenizer?: "unicode61" | "trigram";
}): {
  ftsAvailable: boolean;
  ftsError?: string;
};
//#endregion
//#region packages/memory-host-sdk/src/host/sqlite-vec.d.ts
declare function loadSqliteVecExtension(params: {
  db: DatabaseSync;
  extensionPath?: string;
}): Promise<{
  ok: boolean;
  extensionPath?: string;
  error?: string;
}>;
//#endregion
//#region packages/memory-host-sdk/src/host/memory-recall-metadata.d.ts
declare function readMemoryRecallMetadata(db: DatabaseSync, ids: readonly string[]): Map<string, {
  importance: number | null;
  triggers: string | null;
  project_key: string | null;
}>;
declare function readCuratedMemoryTriggerCandidates(db: DatabaseSync, limit: number, activeProjectKeys?: readonly string[]): {
  id: string;
  importance: number | null;
  triggers: string | null;
  project_key: string | null;
  path: string;
  source: string;
  start_line: number;
  end_line: number;
  text: string;
}[];
declare function readCuratedProjectMemoryCandidates(db: DatabaseSync, limit: number, activeProjectKeys: readonly string[]): {
  id: string;
  importance: number | null;
  triggers: string | null;
  project_key: string | null;
  path: string;
  source: string;
  start_line: number;
  end_line: number;
  text: string;
}[];
//#endregion
//#region packages/memory-host-sdk/src/host/sqlite.d.ts
declare function requireMemoryHostNodeSqlite(): typeof import("node:sqlite");
declare function configureMemorySqliteWalMaintenance(db: DatabaseSync, options?: SqliteWalMaintenanceOptions & Pick<SqliteConnectionPragmaOptions, "busyTimeoutMs">): SqliteWalMaintenance;
declare function closeMemorySqliteWalMaintenance(db: DatabaseSync): boolean;
//#endregion
//#region src/plugin-sdk/memory-core-host-engine-storage.d.ts
/** Health probe result for embedding provider availability checks. */
type MemoryEmbeddingProbeResult = {
  ok: boolean;
  error?: string;
  checked?: boolean;
  cached?: boolean;
  checkedAtMs?: number;
  cacheExpiresAtMs?: number;
};
//#endregion
export { type CuratedMarkdownEntry, type CuratedProjectAnnotations, DEFAULT_MEMORY_READ_LINES, DEFAULT_MEMORY_READ_MAX_CHARS, INVALID_PROJECT_ANNOTATION_KEY, MEMORY_CHUNKING_VERSION, MEMORY_EMBEDDING_CACHE_TABLE, MEMORY_INDEX_CHUNKS_TABLE, MEMORY_INDEX_CHUNK_PROVENANCE_TABLE, MEMORY_INDEX_CHUNK_RECALL_METADATA_TABLE, MEMORY_INDEX_FTS_TABLE, MEMORY_INDEX_META_TABLE, MEMORY_INDEX_PATHS_FTS_TABLE, MEMORY_INDEX_SOURCES_TABLE, MEMORY_INDEX_STATE_TABLE, MEMORY_INDEX_VECTOR_TABLE, type MemoryChunk, MemoryEmbeddingProbeResult, type MemoryEntryProvenance, type MemoryFileEntry, type MemoryOriginClass, type MemoryProviderStatus, type MemoryReadResult, type MemorySearchManager, type MemorySearchResult, type MemorySearchRuntimeDebug, type MemorySessionKind, type MemorySessionSyncTarget, type MemorySource, type MemorySyncParams, type MemorySyncProgressUpdate, type ResolvedMemoryBackendConfig, type ResolvedQmdConfig, type ResolvedQmdMcporterConfig, buildFileEntry, buildMemoryReadResult, buildMemoryReadResultFromSlice, buildMultimodalChunkForIndexing, chunkMarkdown, closeMemorySqliteWalMaintenance, configureMemorySqliteWalMaintenance, cosineSimilarity, dropMemoryPathFtsTriggers, ensureMemoryHostDir as ensureDir, ensureMemoryChunkProvenance, ensureMemoryIndexSchema, ensureMemoryPathFtsTriggers, ensureMemoryRecallMetadataSchema, extractProjectKeysFromCuratedEntry, hashText, isFileMissingError, isTransientMemoryReadError, listMemoryFiles, loadSqliteVecExtension, normalizeExtraMemoryPaths, normalizeProjectAnnotationKey, parseEmbedding, readCuratedMemoryTriggerCandidates, readCuratedProjectMemoryCandidates, readMemoryFile, readMemoryRecallMetadata, remapChunkLines, requireMemoryHostNodeSqlite as requireNodeSqlite, resolveMemoryBackendConfig, resolveMemorySearchStaleness, retryTransientMemoryRead, runMemoryHostTasksWithConcurrency as runWithConcurrency, splitCuratedMarkdownEntries, statRegularFile, stripMemoryAnnotationCarriers };