import { gt as PluginRuntime } from "./plugin-entry-tcwokeHw.js";
import { qg as ContextVisibilityMode } from "./types.openclaw-_47ZKysp.js";
import { t as ChannelId } from "./channel-id.types-D5AaRnW1.js";
import { IncomingMessage, ServerResponse } from "node:http";

//#region packages/normalization-core/src/agent-id.d.ts
/** Normalizes an OpenClaw agent id to its filesystem-safe canonical form. */
declare function normalizeAgentId(value: string | undefined | null): string;
//#endregion
//#region src/infra/http-body.d.ts
type RequestBodyLimitErrorCode = "PAYLOAD_TOO_LARGE" | "REQUEST_BODY_TIMEOUT" | "CONNECTION_CLOSED";
type RequestBodyLimitErrorInit = {
  code: RequestBodyLimitErrorCode;
  message?: string;
};
declare class RequestBodyLimitError extends Error {
  readonly code: RequestBodyLimitErrorCode;
  readonly statusCode: number;
  constructor(init: RequestBodyLimitErrorInit);
}
declare function isRequestBodyLimitError(error: unknown, code?: RequestBodyLimitErrorCode): error is RequestBodyLimitError;
declare function requestBodyErrorToText(code: RequestBodyLimitErrorCode): string;
type ReadRequestBodyOptions = {
  maxBytes: number;
  timeoutMs?: number;
  encoding?: BufferEncoding;
};
declare function readRequestBodyWithLimit(req: IncomingMessage, options: ReadRequestBodyOptions): Promise<string>;
//#endregion
//#region src/channels/allowlist-match.d.ts
type AllowlistMatchSource = "wildcard" | "id" | "name" | "tag" | "username" | "prefixed-id" | "prefixed-user" | "prefixed-name" | "slug" | "localpart";
type AllowlistMatch<TSource extends string = AllowlistMatchSource> = {
  allowed: boolean;
  matchKey?: string;
  matchSource?: TSource;
};
//#endregion
//#region src/infra/dedupe.d.ts
/** Small in-memory TTL/LRU-style cache for replay and duplicate suppression. */
type DedupeCache = {
  /** Returns true for a recent duplicate; records the key and optional owner when absent. */check: (key: string | undefined | null, now?: number, ownerToken?: object) => boolean; /** Returns true for a recent duplicate without refreshing or recording the key. */
  peek: (key: string | undefined | null, now?: number) => boolean;
  delete: (key: string | undefined | null, ownerToken?: object) => void;
  clear: () => void;
  size: () => number;
};
/** Dedupe cache bounds; ttlMs <= 0 disables expiry, maxSize <= 0 disables storage. */
type DedupeCacheOptions = {
  ttlMs: number;
  maxSize: number;
};
/** Creates a bounded in-memory dedupe cache with optional TTL expiry. */
declare function createDedupeCache(options: DedupeCacheOptions): DedupeCache;
//#endregion
//#region src/security/context-visibility.d.ts
/** Supplemental context classes that can be hidden independently from the main message. */
type ContextVisibilityKind = "history" | "thread" | "quote" | "forwarded";
/** Machine-readable reason for a supplemental context visibility decision. */
type ContextVisibilityDecisionReason = /** Visibility mode includes all supplemental context. */"mode_all" /** Sender allowlist includes the item source. */ | "sender_allowed" /** Quote-only visibility mode permits quoted context even when sender is not allowed. */ | "quote_override" /** Context was omitted by visibility mode or sender policy. */ | "blocked";
/** Visibility decision returned to callers that need both the boolean result and audit reason. */
type ContextVisibilityDecision = {
  /** Whether the supplemental context item should be included. */include: boolean; /** Rule that decided inclusion or omission. */
  reason: ContextVisibilityDecisionReason;
};
/** Evaluates one supplemental context item against mode, kind, and sender allowlist state. */
declare function evaluateSupplementalContextVisibility(params: {
  /** Configured visibility mode for the current channel or default policy. */mode: ContextVisibilityMode; /** Supplemental context class being evaluated. */
  kind: ContextVisibilityKind; /** Whether the item source is permitted by the sender allowlist. */
  senderAllowed: boolean;
}): ContextVisibilityDecision;
/** Filters supplemental context items and reports how many were omitted by visibility policy. */
declare function filterSupplementalContextItems<T>(params: {
  /** Candidate supplemental context items in original delivery order. */items: readonly T[]; /** Configured visibility mode for the current channel or default policy. */
  mode: ContextVisibilityMode; /** Shared supplemental context class for every candidate item. */
  kind: ContextVisibilityKind; /** Per-item allowlist predicate for the sender or source identity. */
  isSenderAllowed: (item: T) => boolean;
}): {
  items: T[];
  omitted: number;
};
//#endregion
//#region src/channels/plugins/pairing-message.d.ts
/**
 * Default approval message sent after channel pairing succeeds.
 */
declare const PAIRING_APPROVED_MESSAGE = "\u2705 OpenClaw access approved. Send a message to start chatting.";
//#endregion
//#region src/pairing/pairing-challenge.d.ts
type PairingMeta = Record<string, string | undefined>;
type PairingChallengeParams = {
  channel: string;
  accountId?: string;
  senderId: string;
  senderIdLine: string;
  meta?: PairingMeta;
  upsertPairingRequest: (params: {
    id: string;
    meta?: PairingMeta;
  }) => Promise<{
    code: string;
    created: boolean;
  }>;
  sendPairingReply: (text: string) => Promise<void>;
  buildReplyText?: (params: {
    code: string;
    senderIdLine: string;
  }) => string;
  onCreated?: (params: {
    code: string;
  }) => void;
  onReplyError?: (err: unknown) => void;
};
/**
 * Shared pairing challenge issuance for DM pairing policy pathways.
 * Ensures every channel follows the same create-if-missing + reply flow.
 */
declare function issuePairingChallenge(params: PairingChallengeParams): Promise<{
  created: boolean;
  code?: string;
}>;
//#endregion
//#region src/plugin-sdk/pairing-access.d.ts
type PairingApi = PluginRuntime["channel"]["pairing"];
type ScopedUpsertInput = Omit<Parameters<PairingApi["upsertPairingRequest"]>[0], "channel" | "accountId">;
/** Scope pairing store operations to one channel/account pair for plugin-facing helpers. */
declare function createScopedPairingAccess(params: {
  /** Plugin runtime that owns the channel pairing store API. */core: PluginRuntime; /** Channel id permanently attached to store reads and writes from this helper. */
  channel: ChannelId; /** Channel account id normalized once before store operations. */
  accountId: string;
}): {
  /** Normalized account id used by every channel-scoped pairing store operation. */accountId: string; /** Read allow-list entries for the scoped channel/account pair. */
  readAllowFromStore: () => Promise<string[]>; /** Delete one approval after the owning channel durably consumes it. */
  removeAllowFromStoreEntry: (entry: string | number) => Promise<{
    changed: boolean;
    allowFrom: string[];
  }>; /** Read another channel/account allow-list for DM policy cross-checks. */
  readStoreForDmPolicy: (provider: ChannelId, accountId: string) => Promise<string[]>; /** Upsert a pairing request with the scoped channel/account injected. */
  upsertPairingRequest: (input: ScopedUpsertInput) => Promise<{
    code: string;
    created: boolean;
  }>;
};
//#endregion
//#region src/plugin-sdk/channel-pairing.d.ts
type ScopedPairingAccess = ReturnType<typeof createScopedPairingAccess>;
/** Pairing helpers scoped to one channel account. */
type ChannelPairingController = ScopedPairingAccess & {
  /** Issue a pairing challenge using the controller's channel and scoped store writer. */issueChallenge: (params: Omit<Parameters<typeof issuePairingChallenge>[0], "channel" | "accountId" | "upsertPairingRequest">) => ReturnType<typeof issuePairingChallenge>;
};
/** Build the full scoped pairing controller used by channel runtime code. */
declare function createChannelPairingController(params: {
  /** Plugin runtime that provides pairing store operations. */core: PluginRuntime; /** Channel id scoped into reads, writes, and issued challenges. */
  channel: ChannelId; /** Channel account id normalized before pairing store access. */
  accountId: string;
}): ChannelPairingController;
//#endregion
//#region src/plugin-sdk/json-store.d.ts
/** Read JSON from disk and fall back cleanly when the file is missing or invalid. */
declare function readJsonFileWithFallback<T>(filePath: string, fallback: T): Promise<{
  value: T;
  exists: boolean;
}>;
//#endregion
//#region src/plugin-sdk/text-chunking.d.ts
/**
 * Splits outbound channel text into chunks no longer than the requested limit.
 * Newline boundaries win over spaces; text without usable separators falls back
 * to a hard character split so channel senders always receive bounded strings.
 */
declare function chunkTextForOutbound(text: string, limit: number, options?: {
  preserveWhitespace?: boolean;
  formatting?: unknown;
}): string[];
//#endregion
//#region extensions/feishu/runtime-api.d.ts
type RuntimeEnv = {
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  exit: (code: number) => void;
};
//#endregion
export { PAIRING_APPROVED_MESSAGE as a, createDedupeCache as c, readRequestBodyWithLimit as d, requestBodyErrorToText as f, createChannelPairingController as i, AllowlistMatch as l, chunkTextForOutbound as n, evaluateSupplementalContextVisibility as o, normalizeAgentId as p, readJsonFileWithFallback as r, filterSupplementalContextItems as s, RuntimeEnv as t, isRequestBodyLimitError as u };