import { n as OpenClawConfig } from "../../types.openclaw-C0MxgyRv.js";
import { et as MemoryPluginRuntime, h as PluginStateLeaseRunner, rt as MemorySearchManager } from "../../types-BykvrQHR.js";
import { a as repairShortTermPromotionArtifacts, c as RepairShortTermPromotionArtifactsResult, d as ShortTermDreamingStatsEntry, i as removeGroundedShortTermCandidates, l as ShortTermAuditSummary, o as loadShortTermPromotionDreamingStats, r as auditShortTermPromotionArtifacts, u as ShortTermDreamingStats } from "../../memory-core-host-runtime-core-C0vmuJgG.js";
import { n as configureMemoryCoreDreamingState } from "../../dreaming-state-BZM1K-fl.js";
import { t as MemoryCoreAcquireLocalService } from "../../embedding-local-service-BCpPp3QB.js";
import { i as createEmbeddingProvider, t as MemoryIndexManager } from "../../manager-DWI-rY0i.js";

//#region packages/memory-host-sdk/src/host/embedding-defaults.d.ts
/** Default local embedding model used when config omits an explicit model. */
declare const DEFAULT_LOCAL_MODEL = "hf:ggml-org/embeddinggemma-300m-qat-q8_0-GGUF/embeddinggemma-300m-qat-Q8_0.gguf";
//#endregion
//#region packages/memory-host-sdk/src/host/status-format.d.ts
/** Display tone used by memory status renderers. */
type Tone = "ok" | "warn" | "muted";
/** Resolve vector indexing state from enabled and availability flags. */
declare function resolveMemoryVectorState(vector: {
  enabled: boolean;
  available?: boolean;
}): {
  tone: Tone;
  state: "ready" | "unavailable" | "disabled" | "unknown";
};
/** Resolve full-text search state from enabled and availability flags. */
declare function resolveMemoryFtsState(fts: {
  enabled: boolean;
  available: boolean;
}): {
  tone: Tone;
  state: "ready" | "unavailable" | "disabled";
};
/** Format cache state as concise status text with optional entry count. */
declare function resolveMemoryCacheSummary(cache: {
  enabled: boolean;
  entries?: number;
}): {
  tone: Tone;
  text: string;
};
//#endregion
//#region packages/memory-host-sdk/src/host/qmd-process.d.ts
type QmdBinaryUnavailableReason = "binary" | "workspace-cwd";
type QmdBinaryUnavailable = {
  available: false;
  /**
   * Optional for source compatibility with older plugin SDK callers that
   * returned only `{ available: false, error }`.
   */
  reason?: QmdBinaryUnavailableReason;
  error: string;
};
type QmdBinaryAvailability = {
  available: true;
} | QmdBinaryUnavailable;
declare function checkQmdBinaryAvailability(params: {
  command: string;
  env: NodeJS.ProcessEnv;
  cwd?: string;
  timeoutMs?: number;
}): Promise<QmdBinaryAvailability>;
//#endregion
//#region extensions/memory-core/src/memory/search-manager.d.ts
type Maybe<T> = T | null;
type MemorySearchManagerCacheState = "cached-full-hit" | "cached-full-miss" | "transient-cli" | "transient-status" | "pending-create-wait" | "fallback-builtin" | "recent-failure-cooldown";
type MemorySearchManagerDebug = {
  backend?: "builtin" | "qmd";
  purpose?: MemorySearchManagerPurpose;
  managerMs?: number;
  managerCacheState?: MemorySearchManagerCacheState;
  qmdIdentityHash?: string;
  failureCode?: "qmd-unavailable";
};
type MemorySearchManagerResult = {
  manager: Maybe<MemorySearchManager>;
  error?: string;
  debug?: MemorySearchManagerDebug;
};
type MemorySearchManagerPurpose = "default" | "status" | "cli";
type MemorySearchManagerParams = {
  cfg: OpenClawConfig;
  agentId: string;
  purpose?: MemorySearchManagerPurpose;
  acquireLocalService?: MemoryCoreAcquireLocalService;
  withLease?: PluginStateLeaseRunner;
};
declare function getMemorySearchManager(params: MemorySearchManagerParams): Promise<MemorySearchManagerResult>;
//#endregion
//#region extensions/memory-core/src/runtime-provider.d.ts
declare const memoryRuntime: MemoryPluginRuntime;
//#endregion
//#region extensions/memory-core/src/memory/provider-adapters.d.ts
type BuiltinMemoryEmbeddingProviderDoctorMetadata = {
  providerId: string;
  authProviderId: string;
  envVars: string[];
  transport: "local" | "remote";
  autoSelectPriority?: number;
};
declare function getBuiltinMemoryEmbeddingProviderDoctorMetadata(providerId: string): BuiltinMemoryEmbeddingProviderDoctorMetadata | null;
declare function listBuiltinAutoSelectMemoryEmbeddingProviderDoctorMetadata(): Array<BuiltinMemoryEmbeddingProviderDoctorMetadata>;
//#endregion
//#region packages/memory-host-sdk/src/host/secret-input.d.ts
/** Return true when a configured memory secret contains a literal value or reference. */
declare function hasConfiguredMemorySecretInput(value: unknown): boolean;
//#endregion
//#region extensions/memory-core/src/dreaming-repair.d.ts
type DreamingArtifactsAuditIssue = {
  severity: "warn" | "error";
  code: "dreaming-session-corpus-unreadable" | "dreaming-session-corpus-self-ingested" | "dreaming-session-ingestion-unreadable" | "dreaming-diary-unreadable";
  message: string;
  fixable: boolean;
};
type DreamingArtifactsAuditSummary = {
  dreamsPath?: string;
  sessionCorpusDir: string;
  sessionCorpusFileCount: number;
  suspiciousSessionCorpusFileCount: number;
  suspiciousSessionCorpusLineCount: number;
  sessionIngestionPath: string;
  sessionIngestionExists: boolean;
  issues: DreamingArtifactsAuditIssue[];
};
type RepairDreamingArtifactsResult = {
  changed: boolean;
  archiveDir?: string;
  archivedDreamsDiary: boolean;
  archivedSessionCorpus: boolean;
  archivedSessionIngestion: boolean;
  archivedPaths: string[];
  warnings: string[];
};
declare function auditDreamingArtifacts(params: {
  workspaceDir: string;
}): Promise<DreamingArtifactsAuditSummary>;
declare function repairDreamingArtifacts(params: {
  workspaceDir: string;
  archiveDiary?: boolean;
  now?: Date;
}): Promise<RepairDreamingArtifactsResult>;
//#endregion
export { type BuiltinMemoryEmbeddingProviderDoctorMetadata, DEFAULT_LOCAL_MODEL, type DreamingArtifactsAuditSummary, MemoryIndexManager, type RepairDreamingArtifactsResult, type RepairShortTermPromotionArtifactsResult, type ShortTermAuditSummary, type ShortTermDreamingStats, type ShortTermDreamingStatsEntry, type Tone, auditDreamingArtifacts, auditShortTermPromotionArtifacts, checkQmdBinaryAvailability, configureMemoryCoreDreamingState, createEmbeddingProvider, getBuiltinMemoryEmbeddingProviderDoctorMetadata, getMemorySearchManager, hasConfiguredMemorySecretInput, listBuiltinAutoSelectMemoryEmbeddingProviderDoctorMetadata, loadShortTermPromotionDreamingStats, memoryRuntime, removeGroundedShortTermCandidates, repairDreamingArtifacts, repairShortTermPromotionArtifacts, resolveMemoryCacheSummary, resolveMemoryFtsState, resolveMemoryVectorState };