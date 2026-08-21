import { n as PinnedDispatcherPolicy, r as SsrFPolicy, t as LookupFn } from "./ssrf-Crs8FTVH.js";
import { r as GuardedFetchResult, t as GuardedFetchMode } from "./fetch-guard-BFmUMj1d.js";
import { h as ProviderRequestCapability, o as ResolvedProviderRequestConfig, t as ModelProviderRequestTransportOverrides, y as ProviderRequestTransport } from "./provider-request-config-B6FN25DX.js";
import { n as TransientProviderRetryConfig, t as ProviderOperationRetryStage } from "./operation-retry-NcoF5CTY.js";
import { TlsCertificateErrorDetails, TlsCertificateErrorKind, inspectTlsCertificateError } from "@openclaw/ai/internal/shared";

//#region src/media-understanding/shared.d.ts
/** Resolves the multipart upload filename, mapping AAC inputs to provider-friendly `.m4a`. */
declare function resolveAudioTranscriptionUploadFileName(fileName?: string, mime?: string): string;
/** Builds provider-compatible multipart form data for audio transcription requests. */
declare function buildAudioTranscriptionFormData(params: {
  buffer: Buffer;
  fileName?: string;
  mime?: string;
  fields?: Record<string, string | number | boolean | undefined>;
}): FormData;
/** Shared absolute deadline state for long-running provider operations and polling loops. */
type ProviderOperationDeadline = {
  deadlineAtMs?: number;
  label: string;
  timeoutMs?: number;
};
/** Static or per-call timeout resolver used by provider HTTP helpers. */
type ProviderOperationTimeoutMs = number | (() => number);
type GuardedProviderRequestParams = {
  pinDns?: boolean;
  allowPrivateNetwork?: boolean;
  ssrfPolicy?: SsrFPolicy;
  dispatcherPolicy?: PinnedDispatcherPolicy;
  auditContext?: string;
  /**
   * Override the guarded-fetch mode. Defaults to an auto-upgrade to
   * `TRUSTED_ENV_PROXY` when `HTTP_PROXY`/`HTTPS_PROXY` is configured in the
   * environment; pass `"strict"` to force pinned-DNS even inside a proxy.
   */
  mode?: GuardedFetchMode;
};
/** Creates a timer-safe absolute deadline, resolving a lazy total timeout exactly once. */
declare function createProviderOperationDeadline(params: {
  timeoutMs?: ProviderOperationTimeoutMs;
  label: string;
}): ProviderOperationDeadline;
/** Resolves a per-request timeout without exceeding the remaining operation deadline. */
declare function resolveProviderOperationTimeoutMs(params: {
  deadline: ProviderOperationDeadline;
  defaultTimeoutMs: number;
}): number;
/** Returns a lazy timeout resolver for code paths that retry or poll multiple HTTP calls. */
declare function createProviderOperationTimeoutResolver(params: {
  deadline: ProviderOperationDeadline;
  defaultTimeoutMs: number;
}): () => number;
/** Waits for the next poll interval while respecting the total provider operation deadline. */
declare function waitProviderOperationPollInterval(params: {
  deadline: ProviderOperationDeadline;
  pollIntervalMs: number;
}): Promise<void>;
declare function pollProviderOperationJson<TPayload>(params: {
  url: string;
  headers: Headers | (() => Headers);
  deadline: ProviderOperationDeadline;
  defaultTimeoutMs: number;
  fetchFn: typeof fetch;
  maxAttempts: number;
  pollIntervalMs: number;
  requestFailedMessage: string;
  timeoutMessage: string;
  isComplete: (payload: TPayload) => boolean;
  getFailureMessage?: (payload: TPayload) => string | undefined;
} & GuardedProviderRequestParams): Promise<TPayload>;
declare function fetchProviderOperationResponse(params: {
  stage: ProviderOperationRetryStage;
  url: string;
  init?: RequestInit;
  timeoutMs?: ProviderOperationTimeoutMs;
  fetchFn: typeof fetch;
  provider?: string;
  requestFailedMessage?: string;
  retry?: TransientProviderRetryConfig;
}): Promise<Response>;
/**
 * Fetches generated-asset response headers and bounded error details under an absolute deadline.
 * Successful-body readers must reuse the same deadline so header time cannot reset the budget.
 */
declare function fetchProviderDownloadResponse(params: {
  url: string;
  init?: RequestInit;
  deadline?: ProviderOperationDeadline; /** @deprecated Pass `deadline` so successful-body reads can reuse the same total budget. */
  timeoutMs?: ProviderOperationTimeoutMs;
  fetchFn: typeof fetch;
  provider?: string;
  requestFailedMessage: string;
  retry?: TransientProviderRetryConfig;
}): Promise<Response>;
type ResolvedProviderHttpRequestConfig = {
  baseUrl: string;
  allowPrivateNetwork: boolean;
  headers: Headers;
  dispatcherPolicy?: PinnedDispatcherPolicy;
  requestConfig: ResolvedProviderRequestConfig;
};
type ResolvedProviderHttpRequestConfigWithOriginTrust = ResolvedProviderHttpRequestConfig & {
  trustConfiguredBaseUrlOrigin: boolean;
};
declare function resolveProviderHttpRequestConfigWithOriginTrustInternal(params: {
  baseUrl?: string;
  defaultBaseUrl: string;
  allowPrivateNetwork?: boolean;
  headers?: HeadersInit;
  defaultHeaders?: Record<string, string>;
  request?: ModelProviderRequestTransportOverrides;
  provider?: string;
  api?: string;
  capability?: ProviderRequestCapability;
  transport?: ProviderRequestTransport;
}): ResolvedProviderHttpRequestConfigWithOriginTrust;
declare function resolveProviderHttpRequestConfig(params: Parameters<typeof resolveProviderHttpRequestConfigWithOriginTrustInternal>[0]): ResolvedProviderHttpRequestConfig;
declare function fetchWithTimeoutGuarded(url: string, init: RequestInit, timeoutMs: number | undefined, fetchFn: typeof fetch, options?: {
  ssrfPolicy?: SsrFPolicy;
  lookupFn?: LookupFn;
  pinDns?: boolean;
  dispatcherPolicy?: PinnedDispatcherPolicy;
  auditContext?: string;
  mode?: GuardedFetchMode;
}): Promise<GuardedFetchResult>;
type GuardedPostRequestRetryOptions = {
  /**
   * POST requests default to no retry because many provider endpoints create
   * billable jobs. Pass "read" only for read/analysis POST endpoints.
   */
  retryStage?: ProviderOperationRetryStage;
  retry?: TransientProviderRetryConfig;
};
type GuardedPostRequestParams<TBody> = GuardedProviderRequestParams & GuardedPostRequestRetryOptions & {
  url: string;
  headers: Headers;
  body: TBody;
  timeoutMs?: number;
  signal?: AbortSignal;
  fetchFn: typeof fetch;
};
declare function postTranscriptionRequest(params: GuardedPostRequestParams<BodyInit>): Promise<GuardedFetchResult>;
declare function postJsonRequest(params: GuardedPostRequestParams<unknown>): Promise<GuardedFetchResult>;
declare function postMultipartRequest(params: GuardedPostRequestParams<BodyInit>): Promise<GuardedFetchResult>;
declare function requireTranscriptionText(value: string | undefined, missingMessage: string): string;
//#endregion
export { resolveAudioTranscriptionUploadFileName as _, ProviderOperationTimeoutMs as a, waitProviderOperationPollInterval as b, createProviderOperationTimeoutResolver as c, fetchWithTimeoutGuarded as d, pollProviderOperationJson as f, requireTranscriptionText as g, postTranscriptionRequest as h, ProviderOperationDeadline as i, fetchProviderDownloadResponse as l, postMultipartRequest as m, TlsCertificateErrorKind as n, buildAudioTranscriptionFormData as o, postJsonRequest as p, inspectTlsCertificateError as r, createProviderOperationDeadline as s, TlsCertificateErrorDetails as t, fetchProviderOperationResponse as u, resolveProviderHttpRequestConfig as v, resolveProviderOperationTimeoutMs as y };