import { Ai as clearMemoryEmbeddingProviders, Br as enforceEmbeddingMaxInputTokens, Ci as hasNonTextEmbeddingParts, Cr as MemoryEmbeddingProviderAdapter, Di as getMemoryEmbeddingProvider, Dr as MemoryEmbeddingProviderIndexIdentity, Er as MemoryEmbeddingProviderCreateResult, Fi as buildCaseInsensitiveExtensionGlob, Fr as RemoteEmbeddingClient, Ii as classifyMemoryMultimodalPath, Ir as createRemoteEmbeddingProvider, Li as getMemoryMultimodalExtensions, Lr as resolveRemoteEmbeddingClient, Mi as registerMemoryEmbeddingProvider, Nr as buildRemoteBaseUrlPolicy, Oi as listMemoryEmbeddingProviders, Or as MemoryEmbeddingProviderRuntime, Pr as withRemoteHttpResponse, Rr as RemoteEmbeddingProviderId, Si as EmbeddingInput, Sr as MemoryEmbeddingProvider, Tr as MemoryEmbeddingProviderCreateOptions, bi as SsrFPolicy, br as MemoryEmbeddingBatchChunk, ji as listRegisteredMemoryEmbeddingProviders, ki as listRegisteredMemoryEmbeddingProviderAdapters, wr as MemoryEmbeddingProviderCallOptions, xi as createLocalEmbeddingProvider, xr as MemoryEmbeddingBatchOptions, zr as resolveRemoteEmbeddingBearerClient } from "../types-DdUyjaEr.js";
import { t as DEFAULT_LOCAL_MODEL } from "../embedding-defaults-XlI8aDUR.js";
import { a as retryAsync } from "../index-BTQfvEv9.js";

//#region packages/memory-host-sdk/src/host/batch-output.d.ts
type ReadEmbeddingBatchJsonlOptions<T> = {
  label: string;
  maxRecords: number;
  maxRecordBytes?: number;
  onRecord: (record: T) => boolean;
};
/** Stream bounded JSONL records without buffering the provider output file. */
declare function readEmbeddingBatchJsonl<T>(response: Response, options: ReadEmbeddingBatchJsonlOptions<T>): Promise<void>;
/** Minimal OpenAI-compatible embedding batch output line. */
type EmbeddingBatchOutputLine = {
  custom_id?: string;
  error?: {
    message?: string;
  } | null;
  response?: {
    status_code?: number;
    message?: string;
    body?: {
      data?: Array<{
        embedding?: number[];
      }>;
      error?: {
        message?: string;
      };
    } | string;
  };
};
/** Apply one output line, collecting errors and successful embeddings by custom id. */
declare function applyEmbeddingBatchOutputLine(params: {
  line: EmbeddingBatchOutputLine;
  remaining: Set<string>;
  errors: string[];
  byCustomId: Map<string, number[]>;
}): void;
//#endregion
//#region packages/memory-host-sdk/src/host/batch-error-utils.d.ts
/** Signals that a provider cannot run the configured embedding batch operation. */
declare class EmbeddingBatchUnavailableError extends Error {
  readonly code = "embedding_batch_unavailable";
  constructor(message: string, options?: ErrorOptions);
}
declare function isEmbeddingBatchUnavailableError(error: unknown): boolean;
/** Return the first useful error message from batch output lines. */
declare function extractBatchErrorMessage(lines: EmbeddingBatchOutputLine[]): string | undefined;
/** Redact and bound provider-controlled batch diagnostics before logging them. */
declare function formatBatchErrorDetail(detail: string | undefined): string | undefined;
/** Format a failed error-file read without hiding the underlying read problem. */
declare function formatUnavailableBatchError(err: unknown): string | undefined;
//#endregion
//#region packages/memory-host-sdk/src/host/batch-http.d.ts
/** POST JSON and retry provider 429/5xx failures with bounded backoff. */
declare function postJsonWithRetry<T>(params: {
  url: string;
  headers: Record<string, string>;
  ssrfPolicy?: SsrFPolicy;
  fetchImpl?: typeof fetch;
  retryImpl?: typeof retryAsync;
  body: unknown;
  errorPrefix: string;
}): Promise<T>;
//#endregion
//#region packages/memory-host-sdk/src/host/batch-provider-common.d.ts
/** Minimal provider batch status payload used by polling code. */
type EmbeddingBatchStatus = {
  id?: string;
  status?: string;
  output_file_id?: string | null;
  error_file_id?: string | null;
};
/** Provider output line after an embedding batch file is read. */
type ProviderBatchOutputLine = EmbeddingBatchOutputLine;
/** OpenAI-compatible endpoint used inside embedding batch request lines. */
declare const EMBEDDING_BATCH_ENDPOINT = "/v1/embeddings";
//#endregion
//#region packages/memory-host-sdk/src/host/batch-runner.d.ts
/** Execution controls for provider embedding batch submissions and polling. */
type EmbeddingBatchExecutionParams = {
  wait: boolean;
  pollIntervalMs: number;
  timeoutMs: number;
  concurrency: number;
  debug?: (message: string, data?: Record<string, unknown>) => void;
};
type EmbeddingBatchGroupRunArgs<TRequest> = {
  group: TRequest[];
  groupIndex: number;
  groups: number;
  byCustomId: Map<string, number[]>;
  pollIntervalMs: number;
  timeoutMs: number;
};
type EmbeddingBatchSplitArgs<TRequest> = {
  error: unknown;
  group: TRequest[];
  parts: TRequest[][];
  groupIndex: number;
  groups: number;
  depth: number;
};
/** Run request groups with bounded concurrency and return embeddings by custom id. */
declare function runEmbeddingBatchGroups<TRequest>(params: {
  requests: TRequest[];
  maxRequests: number;
  maxJsonlBytes?: number;
  wait: EmbeddingBatchExecutionParams["wait"];
  pollIntervalMs: EmbeddingBatchExecutionParams["pollIntervalMs"];
  timeoutMs: EmbeddingBatchExecutionParams["timeoutMs"];
  concurrency: EmbeddingBatchExecutionParams["concurrency"];
  debugLabel: string;
  debug?: EmbeddingBatchExecutionParams["debug"];
  shouldSplitGroupOnError?: (error: unknown, group: TRequest[]) => boolean;
  onSplitGroup?: (args: EmbeddingBatchSplitArgs<TRequest>) => void;
  runGroup: (args: EmbeddingBatchGroupRunArgs<TRequest>) => Promise<void>;
}): Promise<Map<string, number[]>>;
/** Build normalized batch-group options for provider-specific runners. */
declare function buildEmbeddingBatchGroupOptions<TRequest>(params: {
  requests: TRequest[];
} & EmbeddingBatchExecutionParams, options: {
  maxRequests: number;
  maxJsonlBytes?: number;
  debugLabel: string;
}): {
  requests: TRequest[];
  maxRequests: number;
  maxJsonlBytes: number | undefined;
  wait: boolean;
  pollIntervalMs: number;
  timeoutMs: number;
  concurrency: number;
  debug: ((message: string, data?: Record<string, unknown>) => void) | undefined;
  debugLabel: string;
};
//#endregion
//#region packages/memory-host-sdk/src/host/batch-status.d.ts
/** File ids returned once a batch has completed. */
type BatchCompletionResult = {
  outputFileId: string;
  errorFileId?: string;
};
/** Convert a completed provider status payload into output/error file ids. */
declare function resolveBatchCompletionFromStatus(params: {
  provider: string;
  batchId: string;
  status: EmbeddingBatchStatus;
}): BatchCompletionResult;
/** Fail a completed partial/all-error batch before requiring its success file. */
declare function throwIfBatchCompletionError(params: {
  provider: string;
  status: EmbeddingBatchStatus;
  readError: (errorFileId: string) => Promise<string | undefined>;
}): Promise<void>;
/** Throw when a provider reports a terminal failure, including error-file detail if available. */
declare function throwIfBatchTerminalFailure(params: {
  provider: string;
  status: EmbeddingBatchStatus;
  readError: (errorFileId: string) => Promise<string | undefined>;
}): Promise<void>;
/** Resolve the completed batch files, optionally waiting according to caller policy. */
declare function resolveCompletedBatchResult(params: {
  provider: string;
  status: EmbeddingBatchStatus;
  wait: boolean;
  waitForBatch: () => Promise<BatchCompletionResult>;
}): Promise<BatchCompletionResult>;
//#endregion
//#region packages/memory-host-sdk/src/host/batch-utils.d.ts
/** Minimal HTTP client config needed by batch providers. */
type BatchHttpClientConfig = {
  baseUrl?: string;
  headers?: Record<string, string>;
  ssrfPolicy?: SsrFPolicy;
  fetchImpl?: typeof fetch;
};
/** Normalize batch API base URLs by removing one trailing slash. */
declare function normalizeBatchBaseUrl(client: BatchHttpClientConfig): string;
/** Build request headers, preserving caller auth and controlling JSON/form content type. */
declare function buildBatchHeaders(client: Pick<BatchHttpClientConfig, "headers">, params: {
  json: boolean;
}): Record<string, string>;
//#endregion
//#region packages/memory-host-sdk/src/host/batch-upload.d.ts
/** Upload embedding batch requests and return the provider file id. */
declare function uploadBatchJsonlFile(params: {
  client: BatchHttpClientConfig;
  requests: unknown[];
  errorPrefix: string;
  maxResponseBytes?: number;
  signal?: AbortSignal;
}): Promise<string>;
//#endregion
//#region packages/memory-host-sdk/src/host/embedding-provider-adapter-utils.d.ts
/** Detect missing API key errors from provider auth resolution. */
declare function isMissingEmbeddingApiKeyError(err: unknown): boolean;
/** Return stable cache headers after removing adapter-declared secret headers. */
declare function sanitizeEmbeddingCacheHeaders(headers: Record<string, string>, excludedHeaderNames: string[]): Array<[string, string]>;
/** Convert custom-id keyed batch embeddings back to request-index order. */
declare function mapBatchEmbeddingsByIndex(byCustomId: Map<string, number[]>, count: number): number[][];
//#endregion
//#region packages/memory-host-sdk/src/host/embedding-vectors.d.ts
/** Replace invalid coordinates and L2-normalize non-empty vectors. */
declare function sanitizeAndNormalizeEmbedding(vec: number[]): number[];
//#endregion
//#region packages/memory-host-sdk/src/host/embeddings-debug.d.ts
/** Write embedding debug metadata when OPENCLAW_DEBUG_MEMORY_EMBEDDINGS is enabled. */
declare function debugEmbeddingsLog(message: string, meta?: Record<string, unknown>): void;
//#endregion
//#region packages/memory-host-sdk/src/host/embeddings-model-normalize.d.ts
/** Trim a configured model id, fall back when empty, and strip known prefixes. */
declare function normalizeEmbeddingModelWithPrefixes(params: {
  model: string;
  defaultModel: string;
  prefixes: string[];
}): string;
//#endregion
//#region packages/memory-host-sdk/src/host/embeddings-remote-fetch.d.ts
/** POST an embedding request and return validated vectors in provider response order. */
declare function fetchRemoteEmbeddingVectors(params: {
  url: string;
  headers: Record<string, string>;
  ssrfPolicy?: SsrFPolicy;
  fetchImpl?: typeof fetch;
  signal?: AbortSignal;
  body: unknown;
  errorPrefix: string;
}): Promise<number[][]>;
//#endregion
//#region packages/memory-host-sdk/src/host/embedding-input-limits.d.ts
declare function estimateUtf8Bytes(text: string): number;
declare function estimateStructuredEmbeddingInputBytes(input: EmbeddingInput): number;
//#endregion
//#region src/agents/auth-profiles/runtime-snapshots.d.ts
type RuntimeAuthProfileStoreMutationListener = (event: {
  agentDir?: string;
  affectsInheritedStores: boolean;
}) => void;
/** Observes credential snapshot changes at their lifecycle publication edge. */
declare function registerRuntimeAuthProfileStoreMutationListener(listener: RuntimeAuthProfileStoreMutationListener): () => void;
//#endregion
export { type BatchCompletionResult, type BatchHttpClientConfig, DEFAULT_LOCAL_MODEL, EMBEDDING_BATCH_ENDPOINT, type EmbeddingBatchExecutionParams, type EmbeddingBatchStatus, EmbeddingBatchUnavailableError, type EmbeddingInput, type MemoryEmbeddingBatchChunk, type MemoryEmbeddingBatchOptions, type MemoryEmbeddingProvider, type MemoryEmbeddingProviderAdapter, type MemoryEmbeddingProviderCallOptions, type MemoryEmbeddingProviderCreateOptions, type MemoryEmbeddingProviderCreateResult, type MemoryEmbeddingProviderIndexIdentity, type MemoryEmbeddingProviderRuntime, type ProviderBatchOutputLine, type RemoteEmbeddingClient, type RemoteEmbeddingProviderId, applyEmbeddingBatchOutputLine, buildBatchHeaders, buildCaseInsensitiveExtensionGlob, buildEmbeddingBatchGroupOptions, buildRemoteBaseUrlPolicy, classifyMemoryMultimodalPath, clearMemoryEmbeddingProviders, createLocalEmbeddingProvider, createRemoteEmbeddingProvider, debugEmbeddingsLog, enforceEmbeddingMaxInputTokens, estimateStructuredEmbeddingInputBytes, estimateUtf8Bytes, extractBatchErrorMessage, fetchRemoteEmbeddingVectors, formatBatchErrorDetail, formatUnavailableBatchError, getMemoryEmbeddingProvider, getMemoryMultimodalExtensions, hasNonTextEmbeddingParts, isEmbeddingBatchUnavailableError, isMissingEmbeddingApiKeyError, listMemoryEmbeddingProviders, listRegisteredMemoryEmbeddingProviderAdapters, listRegisteredMemoryEmbeddingProviders, mapBatchEmbeddingsByIndex, normalizeBatchBaseUrl, normalizeEmbeddingModelWithPrefixes, postJsonWithRetry, readEmbeddingBatchJsonl, registerMemoryEmbeddingProvider, registerRuntimeAuthProfileStoreMutationListener, resolveBatchCompletionFromStatus, resolveCompletedBatchResult, resolveRemoteEmbeddingBearerClient, resolveRemoteEmbeddingClient, runEmbeddingBatchGroups, sanitizeAndNormalizeEmbedding, sanitizeEmbeddingCacheHeaders, throwIfBatchCompletionError, throwIfBatchTerminalFailure, uploadBatchJsonlFile, withRemoteHttpResponse };