import { n as OpenClawConfig } from "./types.openclaw-B2WvMv3k.js";
import { $ as MemoryEmbeddingProviderRuntime, Q as MemoryEmbeddingProviderCreateOptions, Z as MemoryEmbeddingProvider, at as MemorySessionKind, ct as MemorySyncParams, dt as EmbeddingInput, it as MemorySearchResult, lt as MemorySyncProgressUpdate, nt as MemoryProviderStatus, ot as MemorySessionSyncTarget, pt as ResolvedMemorySearchConfig, rt as MemorySearchManager, st as MemorySource, tt as MemoryEntryProvenance } from "./types-DOjBC-h-.js";
import { t as MemoryEmbeddingProbeResult } from "./memory-core-host-engine-storage-CsLyJ6c8.js";
import { t as MemoryCoreAcquireLocalService } from "./embedding-local-service-BCpPp3QB.js";
import { DatabaseSync } from "node:sqlite";
import { FSWatcher } from "chokidar";

//#region extensions/memory-core/src/memory/embeddings.d.ts
type EmbeddingProvider = MemoryEmbeddingProvider;
type EmbeddingProviderId = string;
type EmbeddingProviderRequest = string;
type EmbeddingProviderFallback = string;
type EmbeddingProviderRuntime = MemoryEmbeddingProviderRuntime;
type EmbeddingProviderResult = {
  provider: EmbeddingProvider | null;
  requestedProvider: EmbeddingProviderRequest;
  fallbackFrom?: string;
  fallbackReason?: string;
  providerUnavailableReason?: string;
  runtime?: EmbeddingProviderRuntime;
};
type CreateEmbeddingProviderOptions = MemoryEmbeddingProviderCreateOptions & {
  provider: EmbeddingProviderRequest;
  fallback: EmbeddingProviderFallback;
  acquireLocalService?: MemoryCoreAcquireLocalService;
};
declare function createEmbeddingProvider(options: CreateEmbeddingProviderOptions): Promise<EmbeddingProviderResult>;
//#endregion
//#region extensions/memory-core/src/memory/manager-reindex-state.d.ts
type MemoryIndexMeta = {
  model: string;
  provider: string;
  providerKey?: string;
  sources?: MemorySource[];
  scopeHash?: string;
  chunkTokens: number;
  chunkOverlap: number;
  chunkingVersion?: number;
  vectorDims?: number;
  ftsTokenizer?: string;
  provenanceVersion?: number;
};
type MemoryIndexIdentityState = {
  status: "valid";
} | {
  status: "missing";
  reason: string;
} | {
  status: "mismatched";
  reason: string;
};
type MemoryIndexProviderIdentity = {
  provider: string;
  model: string;
  providerKey: string;
};
//#endregion
//#region packages/memory-host-sdk/src/host/session-transcript-corpus.d.ts
type SessionTranscriptCorpusArtifactKind = "active-session" | "retained-session" | "archive-artifact";
type SessionTranscriptCorpusEntry = {
  agentId: string;
  sessionFile: string;
  sessionId: string; /** Canonical source revision used by derived transcript consumers. */
  contentRevision?: string;
  artifactKind: SessionTranscriptCorpusArtifactKind;
  sessionKey?: string;
  storePath?: string; /** Present when an active transcript is addressed by SQLite identity, not a JSONL path. */
  transcriptSource?: "sqlite"; /** Session entry activity timestamp used when the source has no filesystem stat. */
  updatedAtMs?: number; /** True when this transcript belongs to an internal dreaming narrative run. */
  generatedByDreamingNarrative?: boolean; /** True when this transcript belongs to an isolated cron run session. */
  generatedByCronRun?: boolean;
  sessionKind?: MemorySessionKind;
};
//#endregion
//#region extensions/memory-core/src/memory/manager-provider-state.d.ts
type MemoryProviderLifecycleState = {
  mode: "pending";
  requestedProvider: string;
} | {
  mode: "active";
  providerId: string;
} | {
  mode: "degraded";
  providerId: string;
  reason: string;
  code?: string;
} | {
  mode: "fallback-active";
  providerId: string;
  fallbackFrom: string;
  reason: string;
} | {
  mode: "fts-only";
  reason: string;
  attemptedProviderId?: string;
};
//#endregion
//#region extensions/memory-core/src/memory/watch-settle.d.ts
type MemoryWatchEventStats = {
  isDirectory?: () => boolean;
  size?: number;
  mtimeMs?: number;
};
type WatchPathSnapshot = {
  size: number;
  mtimeMs: number;
};
type MemoryWatchSettleQueue = Map<string, WatchPathSnapshot | null>;
//#endregion
//#region extensions/memory-core/src/memory/manager-sync-base.d.ts
type MemorySyncProgressState = {
  completed: number;
  total: number;
  label?: string;
  report: (update: MemorySyncProgressUpdate) => void;
};
type MemoryIndexEntry$1 = {
  path: string;
  absPath: string;
  mtimeMs: number;
  size: number;
  hash: string;
  kind?: "markdown" | "multimodal";
  content?: string;
  contentText?: string;
  lineMap?: number[];
  lineProvenance?: MemoryEntryProvenance[];
};
type MemoryIndexWorkItem = {
  entry: MemoryIndexEntry$1;
  source: MemorySource;
  afterIndex?: () => void;
};
type MemorySourceSyncPlan = {
  indexItems: MemoryIndexWorkItem[];
  finalize: () => Promise<void> | void;
};
type MemoryReindexRetryState = {
  dirty: boolean;
  memoryFullRetryDirty: boolean;
  sessionsDirty: boolean;
  sessionsFullRetryDirty: boolean;
  sessionsDirtyFiles: Set<string>;
};
declare abstract class MemoryManagerSyncBase {
  protected readonly acquireLocalService?: MemoryCoreAcquireLocalService;
  protected abstract readonly cfg: OpenClawConfig;
  protected abstract readonly agentId: string;
  protected abstract readonly workspaceDir: string;
  protected abstract readonly settings: ResolvedMemorySearchConfig;
  protected provider: EmbeddingProvider | null;
  protected fallbackFrom?: EmbeddingProviderId;
  protected abstract providerUnavailableReason?: string;
  protected abstract providerLifecycle: MemoryProviderLifecycleState;
  protected providerRuntime?: EmbeddingProviderRuntime;
  protected abstract batch: {
    enabled: boolean;
    wait: boolean;
    concurrency: number;
    pollIntervalMs: number;
    timeoutMs: number;
  };
  protected readonly sources: Set<MemorySource>;
  protected providerKey: string | null;
  protected abstract readonly vector: {
    enabled: boolean;
    available: boolean | null;
    semanticAvailable?: boolean;
    extensionPath?: string;
    loadError?: string;
    dims?: number;
  };
  protected readonly fts: {
    enabled: boolean;
    available: boolean;
    loadError?: string;
  };
  protected vectorReady: Promise<boolean> | null;
  protected watcher: FSWatcher | null;
  protected watchTimer: NodeJS.Timeout | null;
  protected sessionWatchTimer: NodeJS.Timeout | null;
  protected sessionUnsubscribe: (() => void) | null;
  protected fallbackReason?: string;
  protected intervalTimer: NodeJS.Timeout | null;
  protected memoryWatchPressureStartupTimer: NodeJS.Timeout | null;
  protected closed: boolean;
  protected dirty: boolean;
  protected memoryFullRetryDirty: boolean;
  protected pendingWatchPaths: MemoryWatchSettleQueue;
  protected sessionsDirty: boolean;
  protected sessionsFullRetryDirty: boolean;
  protected sessionsDirtyFiles: Set<string>;
  protected sessionPendingFiles: Set<string>;
  protected sessionPendingTargets: Map<string, MemorySessionSyncTarget>;
  protected vectorDegradedWriteWarningShown: boolean;
  protected lastMetaSerialized: string | null;
  protected abstract readonly cache: {
    enabled: boolean;
    maxEntries?: number;
  };
  protected abstract db: DatabaseSync;
  protected abstract computeProviderKey(): string;
  protected abstract resolveProviderIndexIdentities(): MemoryIndexProviderIdentity[];
  protected abstract sync(params?: MemorySyncParams): Promise<void>;
  protected abstract withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T>;
  protected abstract getIndexConcurrency(): number;
  protected abstract pruneEmbeddingCacheIfNeeded(): void;
  protected abstract resetProviderInitializationForRetry(): void;
  protected abstract assertRequiredProviderAvailable(operation: "search" | "sync"): void;
  protected abstract indexFile(entry: MemoryIndexEntry$1, options: {
    source: MemorySource;
    content?: string;
  }): Promise<void>;
  protected abstract syncMemoryFiles(params: {
    needsFullReindex: boolean;
    progress?: MemorySyncProgressState;
    deferIndex?: boolean;
  }): Promise<MemorySourceSyncPlan>;
  protected abstract syncArchiveFiles(params: {
    needsFullReindex: boolean;
    targetArchiveFiles?: string[];
    progress?: MemorySyncProgressState;
    deferIndex?: boolean;
    prefixIndexItems?: MemoryIndexWorkItem[];
  }): Promise<MemorySourceSyncPlan>;
  protected indexFiles(items: MemoryIndexWorkItem[]): Promise<void>;
  protected emptySourceSyncPlan(): MemorySourceSyncPlan;
  protected snapshotReindexRetryState(): MemoryReindexRetryState;
  protected restoreReindexRetryState(snapshot: MemoryReindexRetryState): void;
  protected markFailedFullReindexRetry(params: {
    memory: boolean;
    sessions: boolean;
  }): void;
  protected clearSessionRetryState(): void;
  protected clearMemoryRetryState(): void;
  protected refreshSessionDirtyFlag(): void;
  protected shouldDeferSourceWideBatch(): boolean;
  protected indexQueuedFiles(items: MemoryIndexWorkItem[], progress?: MemorySyncProgressState, label?: string): Promise<void>;
  protected executeSourceSyncPlans(plans: MemorySourceSyncPlan[], progress?: MemorySyncProgressState): Promise<void>;
  protected executeSourceWideSync(params: {
    shouldSyncMemory: boolean;
    shouldSyncSessions: boolean;
    needsFullReindex: boolean;
    needsFullSessionReindex?: boolean;
    targetArchiveFiles?: string[];
    progress?: MemorySyncProgressState;
  }): Promise<void>;
  protected hasIndexedChunks(): boolean;
  protected hasSemanticChunks(): boolean;
  protected resolveCurrentIndexIdentityState(params?: {
    meta?: MemoryIndexMeta | null;
    provider?: {
      id: string;
      model: string;
    } | null;
    providerKeyKnown?: boolean;
    vectorReady?: boolean;
    hasIndexedChunks?: boolean;
  }): MemoryIndexIdentityState;
  protected resetVectorState(): void;
  protected ensureVectorReady(dimensions?: number): Promise<boolean>;
  private loadVectorExtension;
  protected deleteVectorRowsForSource(pathname: string, source: MemorySource): void;
  protected markVectorRebuildRequired(): void;
  private hasVectorRebuildMarker;
  private markConfiguredSourcesForFullReindex;
  private ensureVectorTable;
  private dropLegacyVectorTable;
  private dropVectorTable;
  protected buildSourceFilter(alias?: string, sourcesOverride?: MemorySource[]): {
    sql: string;
    params: MemorySource[];
  };
  protected openDatabase(): DatabaseSync;
  protected seedEmbeddingCache(sourceDb: DatabaseSync): Promise<void>;
  protected ensureSchema(): void;
  protected readMeta(): MemoryIndexMeta | null;
  protected writeMeta(meta: MemoryIndexMeta): void;
}
//#endregion
//#region extensions/memory-core/src/memory/manager-watch-ops.d.ts
declare abstract class MemoryManagerWatchOps extends MemoryManagerSyncBase {
  private nativeMemoryWatchPairs;
  private readonly memoryWatchPressureWarning;
  protected ensureWatcher(): void;
  private scheduleMemoryWatchPressureStartupCheck;
  private warnIfMemoryWatchPressure;
  private currentMemoryChokidarWatcher;
  protected attachNativeMemoryWatchForDir(dir: string, markDirty: (watchPath?: string, stats?: MemoryWatchEventStats) => void): boolean;
  protected attachLinuxMemoryDirectoryTreeWatchForDir(dir: string, markDirty: (watchPath?: string, stats?: MemoryWatchEventStats) => void): boolean;
  private attachLinuxMemoryDirectoryTreeSubtree;
  private closeNativeMemoryWatchPair;
  protected closeNativeMemoryWatchPairs(): void;
  private removeNativeMemoryParentWatch;
  private removeNativeMemoryWatchPair;
  protected attachMemoryChokidarFallback(dir: string, markDirty: (watchPath?: string, stats?: MemoryWatchEventStats) => void): void;
  protected ensureIntervalSync(): void;
  private scheduleWatchSync;
}
//#endregion
//#region extensions/memory-core/src/memory/manager-session-sync-ops.d.ts
type MemorySessionTranscriptUpdate = {
  agentId?: string;
  sessionFile?: string;
  sessionKey?: string;
  target?: {
    agentId: string;
    sessionId: string;
    sessionKey: string;
  };
};
declare abstract class MemoryManagerSessionSyncOps extends MemoryManagerWatchOps {
  protected listSessionCorpusEntries(): Promise<SessionTranscriptCorpusEntry[]>;
  protected sessionPathForCorpusEntry(entry: SessionTranscriptCorpusEntry): string;
  protected legacyExtensionlessSessionPathForIdentity(agentId: string, sessionId: string): string;
  protected buildSessionEntryOptions(entry: SessionTranscriptCorpusEntry): {
    updatedAtMs?: number | undefined;
    sessionKey?: string | undefined;
    agentId?: string | undefined;
    sessionId?: string | undefined;
    storePath?: string | undefined;
    sessionKind?: MemorySessionKind | undefined;
    generatedByDreamingNarrative: boolean;
    generatedByCronRun: boolean;
  };
  protected ensureSessionListener(): void;
  protected subscribeSessionTranscriptUpdates(listener: (update: MemorySessionTranscriptUpdate) => void): () => void;
  private scheduleCorpusSessionFileDirty;
  protected ensureSessionStartupCatchup(): void;
  protected markSessionStartupCatchupDirtyFiles(): Promise<string[]>;
  protected runSessionStartupCatchup(): Promise<string[]>;
  private scheduleSessionDirty;
  private processSessionUpdateBatch;
  private resolveSessionTranscriptUpdateSyncTarget;
  protected normalizeTargetArchiveFiles(archiveFiles?: string[], corpusEntries?: readonly SessionTranscriptCorpusEntry[], includeSqlite?: boolean): Set<string> | null;
  private resolveArchiveFilesForSyncTargets;
  protected resolveTargetSessionSyncPlan(params: {
    sessions?: MemorySessionSyncTarget[];
    archiveFiles?: string[];
  }): Promise<{
    corpusEntries: SessionTranscriptCorpusEntry[];
    targetArchiveFiles: Set<string>;
  } | null>;
  private memorySessionSyncTargetKey;
  protected shouldSyncSessions(params?: MemorySyncParams, needsFullReindex?: boolean): boolean;
}
//#endregion
//#region extensions/memory-core/src/memory/manager-source-sync-ops.d.ts
declare abstract class MemoryManagerSourceSyncOps extends MemoryManagerSessionSyncOps {
  protected syncMemoryFiles(params: {
    needsFullReindex: boolean;
    progress?: MemorySyncProgressState;
    deferIndex?: boolean;
  }): Promise<MemorySourceSyncPlan>;
  protected syncArchiveFiles(params: {
    needsFullReindex: boolean;
    targetArchiveFiles?: string[];
    corpusEntries?: readonly SessionTranscriptCorpusEntry[];
    progress?: MemorySyncProgressState;
    deferIndex?: boolean;
    prefixIndexItems?: MemoryIndexWorkItem[];
  }): Promise<MemorySourceSyncPlan>;
}
//#endregion
//#region extensions/memory-core/src/memory/manager-sync-ops.d.ts
type MemorySyncProviderGenerationBase = {
  providerKey: string;
  identities: MemoryIndexProviderIdentity[];
};
type MemorySyncProviderGeneration = (MemorySyncProviderGenerationBase & {
  kind: "fts-only";
  provider: null;
}) | (MemorySyncProviderGenerationBase & {
  kind: "semantic";
  provider: EmbeddingProvider;
  runtime?: EmbeddingProviderRuntime;
});
type MemorySemanticProviderGeneration = Extract<MemorySyncProviderGeneration, {
  kind: "semantic";
}>;
declare abstract class MemoryManagerSyncOps extends MemoryManagerSourceSyncOps {
  private fallbackProviderInitPromise;
  protected syncProviderGeneration: MemorySyncProviderGeneration | null;
  protected beginSyncProviderGeneration(_options?: {
    forceFtsOnly?: boolean;
  }): void;
  protected endSyncProviderGeneration(): void;
  protected shouldDeferSourceWideBatch(): boolean;
  protected retireCurrentProvider(): Promise<void>;
  private createSyncProgress;
  private assertFtsOnlySyncAllowed;
  protected runSync(params?: MemorySyncParams): Promise<void>;
  protected shouldFallbackOnError(err: unknown): boolean;
  private hasRequestedTargetSessionSync;
  protected resolveBatchConfig(): {
    enabled: boolean;
    wait: boolean;
    concurrency: number;
    pollIntervalMs: number;
    timeoutMs: number;
  };
  protected activateFallbackProvider(reason: string): Promise<boolean>;
  protected getPendingFallbackProviderInitialization(): Promise<boolean> | null;
  private activateFallbackProviderOnce;
  private runInPlaceReindex;
}
//#endregion
//#region extensions/memory-core/src/memory/manager-embedding-ops.d.ts
type MemoryIndexEntry = MemoryIndexWorkItem["entry"];
declare abstract class MemoryManagerEmbeddingOps extends MemoryManagerSyncOps {
  protected abstract batchFailureCount: number;
  protected abstract batchFailureLastError?: string;
  protected abstract batchFailureLastProvider?: string;
  protected abstract batchFailureLock: Promise<void>;
  protected abstract markLocalEmbeddingProviderDegraded(err: unknown): void;
  private activeProviderUses;
  private providerIdleWaiters;
  private syncProviderGenerationRelease;
  private syncProviderGenerationOwners;
  protected acquireProviderUse(provider: EmbeddingProvider): () => void;
  protected withProviderUse<T>(provider: EmbeddingProvider, run: () => Promise<T>): Promise<T>;
  protected awaitProviderIdle(provider: EmbeddingProvider): Promise<void>;
  protected beginSyncProviderGeneration(options?: {
    forceFtsOnly?: boolean;
  }): void;
  protected endSyncProviderGeneration(): void;
  protected pruneEmbeddingCacheIfNeeded(): void;
  private upsertEmbeddingCacheEntries;
  private embedChunksInBatches;
  protected computeProviderKey(): string;
  protected resolveProviderIndexIdentities(): MemoryIndexProviderIdentity[];
  private buildBatchDebug;
  private embedChunksWithBatch;
  private collectCachedEmbeddings;
  protected embedBatchWithRetry(texts: string[], generation?: MemorySemanticProviderGeneration): Promise<number[][]>;
  protected embedBatchInputsWithRetry(inputs: EmbeddingInput[], generation?: MemorySemanticProviderGeneration): Promise<number[][]>;
  private runProviderBatchWithRetry;
  private waitForEmbeddingRetry;
  private resolveEmbeddingTimeout;
  protected embedQueryWithRetry(text: string, signal?: AbortSignal, providerOverride?: EmbeddingProvider, markDegraded?: boolean, providerRuntimeOverride?: MemoryEmbeddingProviderRuntime): Promise<number[]>;
  protected withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T>;
  private withBatchFailureLock;
  private resetBatchFailureCount;
  private recordBatchFailure;
  private runBatchWithTimeoutRetry;
  private runBatchWithFallback;
  protected getIndexConcurrency(): number;
  private clearIndexedFileData;
  private upsertFileRecord;
  private deleteFileRecord;
  /**
   * Write chunks (and optional embeddings) for a file into the index.
   * Handles both the chunks table, the vector table, and the FTS table.
   * Pass an empty embeddings array to skip vector writes (FTS-only mode).
   */
  private writeChunks;
  private prepareIndexEntry;
  private resolveChunkProvenance;
  protected indexFiles(items: MemoryIndexWorkItem[]): Promise<void>;
  private indexFilesWithGeneration;
  protected indexFile(entry: MemoryIndexEntry, options: {
    source: MemorySource;
    content?: string;
  }): Promise<void>;
  private indexFileWithGeneration;
}
//#endregion
//#region extensions/memory-core/src/memory/manager.d.ts
type MemoryIndexManagerPurpose = "default" | "status" | "cli";
declare function closeAllMemoryIndexManagers(): Promise<void>;
declare function closeMemoryIndexManagersForAgent(params: {
  cfg: OpenClawConfig;
  agentId: string;
}): Promise<void>;
type MemoryIndexSearchOptions = NonNullable<Parameters<MemorySearchManager["search"]>[1]>;
declare class MemoryIndexManager extends MemoryManagerEmbeddingOps implements MemorySearchManager {
  private readonly cacheKey;
  private readonly purpose;
  protected readonly acquireLocalService?: MemoryCoreAcquireLocalService;
  protected readonly cfg: OpenClawConfig;
  protected readonly agentId: string;
  protected readonly workspaceDir: string;
  protected readonly settings: ResolvedMemorySearchConfig;
  private readonly providerRequirement;
  protected provider: EmbeddingProvider | null;
  private readonly requestedProvider;
  private providerInitPromise;
  private providerInitialized;
  private embeddingBootstrapFailure?;
  private providerRetirementPromise;
  private providersPendingRetirement;
  private closePromise;
  private closeTeardownComplete;
  private closing;
  private activeManagerOperations;
  private managerIdleWaiters;
  protected fallbackFrom?: EmbeddingProviderId;
  protected fallbackReason?: string;
  protected providerUnavailableReason?: string;
  protected providerLifecycle: MemoryProviderLifecycleState;
  protected providerRuntime?: EmbeddingProviderRuntime;
  protected batch: {
    enabled: boolean;
    wait: boolean;
    concurrency: number;
    pollIntervalMs: number;
    timeoutMs: number;
  };
  protected batchFailureCount: number;
  protected batchFailureLastError?: string;
  protected batchFailureLastProvider?: string;
  protected batchFailureLock: Promise<void>;
  protected db: DatabaseSync;
  protected readonly sources: Set<MemorySource>;
  protected providerKey: string;
  protected readonly cache: {
    enabled: boolean;
    maxEntries?: number;
  };
  protected readonly vector: {
    enabled: boolean;
    available: boolean | null;
    semanticAvailable?: boolean;
    extensionPath?: string;
    loadError?: string;
    dims?: number;
  };
  protected readonly fts: {
    enabled: boolean;
    available: boolean;
    loadError?: string;
  };
  protected vectorReady: Promise<boolean> | null;
  protected watcher: FSWatcher | null;
  protected watchTimer: NodeJS.Timeout | null;
  protected sessionWatchTimer: NodeJS.Timeout | null;
  protected sessionUnsubscribe: (() => void) | null;
  protected intervalTimer: NodeJS.Timeout | null;
  protected memoryWatchPressureStartupTimer: NodeJS.Timeout | null;
  protected closed: boolean;
  protected dirty: boolean;
  protected sessionsDirty: boolean;
  protected sessionsDirtyFiles: Set<string>;
  protected sessionPendingFiles: Set<string>;
  protected sessionPendingTargets: Map<string, MemorySessionSyncTarget>;
  private indexIdentityDirty;
  private sessionWarm;
  private syncing;
  private queuedArchiveFiles;
  private queuedSessions;
  private queuedForce;
  private queuedProgressCallbacks;
  private queuedSessionSync;
  private readonlyRecoveryAttempts;
  private readonlyRecoverySuccesses;
  private readonlyRecoveryFailures;
  private readonlyRecoveryLastError?;
  private indexIdentityState;
  private static loadProviderResult;
  static get(params: {
    cfg: OpenClawConfig;
    agentId: string;
    purpose?: MemoryIndexManagerPurpose;
    acquireLocalService?: MemoryCoreAcquireLocalService;
  }): Promise<MemoryIndexManager | null>;
  private static getWithinGlobalLifecycle;
  private constructor();
  private applyProviderResult;
  private markEmbeddingBootstrapFailure;
  private ensureEmbeddingProviderForSearch;
  private clearEmbeddingBootstrapFailureAfterRecovery;
  private confirmEmbeddingBootstrapRecovery;
  private ensureProviderInitialized;
  protected resetProviderInitializationForRetry(): void;
  protected markLocalEmbeddingProviderDegraded(err: unknown): void;
  protected retireCurrentProvider(): Promise<void>;
  private drainPendingProviderRetirements;
  protected isRequiredProviderUnavailable(): boolean;
  protected buildRequiredProviderUnavailableError(operation: "search" | "sync"): Error;
  protected assertRequiredProviderAvailable(operation: "search" | "sync"): void;
  warmSession(sessionKey?: string): Promise<void>;
  private refreshIndexIdentityDirty;
  private refreshKeywordFallbackIndexIdentity;
  private withManagerOperation;
  private awaitManagerIdle;
  search(query: string, opts?: MemoryIndexSearchOptions): Promise<MemorySearchResult[]>;
  private searchUnranked;
  private selectScoredResults;
  listTriggerCandidates(opts?: {
    limit?: number;
    activeProjectKeys?: string[];
  }): Promise<MemorySearchResult[]>;
  listCuratedProjectCandidates(opts: {
    activeProjectKeys: string[];
    limit?: number;
  }): Promise<MemorySearchResult[]>;
  private toCuratedMemorySearchResults;
  private rankKeywordOnlyResults;
  private finalizeKeywordOnlyResults;
  private hasIndexedContent;
  private searchVector;
  private attachRecallMetadata;
  private buildFtsQuery;
  private searchKeyword;
  private searchKeywordWithFallback;
  private resolveKeywordFallbackTerms;
  private mergeKeywordSearchHits;
  private limitKeywordSearchHits;
  private toMemorySearchResults;
  private mergeHybridResults;
  sync(params?: MemorySyncParams): Promise<void>;
  private syncAdmitted;
  private enqueueTargetedSessionSync;
  private runSyncWithReadonlyRecovery;
  readFile(params: {
    relPath: string;
    from?: number;
    lines?: number;
  }): Promise<{
    text: string;
    path: string;
  }>;
  status(): MemoryProviderStatus;
  probeVectorAvailability(): Promise<boolean>;
  probeVectorStoreAvailability(): Promise<boolean>;
  private probeVectorStoreAvailabilityAdmitted;
  private cacheProbeResult;
  getCachedEmbeddingAvailability(): MemoryEmbeddingProbeResult | null;
  probeEmbeddingAvailability(): Promise<MemoryEmbeddingProbeResult>;
  close(): Promise<void>;
  private retryFailedClose;
  private closeOnce;
}
//#endregion
export { createEmbeddingProvider as i, closeAllMemoryIndexManagers as n, closeMemoryIndexManagersForAgent as r, MemoryIndexManager as t };