import { U as PluginRuntime, g as WebMediaResult } from "./types-B3KbIvCl.js";
import { W as GroupPolicy, n as OpenClawConfig } from "./types.openclaw-hJEKisz6.js";
import { Jt as MediaFact, Yt as MediaFactLegacyProjection, ft as OutboundMediaAccess } from "./setup-wizard-types-B72aypBk.js";
import { t as ChannelId } from "./channel-id.types-DExEjsX7.js";
import { f as RuntimeEnv } from "./manifest-registry-C0GShb_1.js";
import { IncomingMessage, ServerResponse } from "node:http";

//#region src/routing/account-id.d.ts
declare const DEFAULT_ACCOUNT_ID = "default";
//#endregion
//#region src/channels/plugins/media-payload.d.ts
/** Input media item used by channel outbound payload builders. */
type MediaPayloadInput = Required<Pick<MediaFact, "path">> & Pick<MediaFact, "contentType">;
/**
 * Legacy-compatible media payload shape consumed by plugin send helpers.
 * @deprecated Inbound contexts use `media`; outbound replies use lowercase
 * `ReplyPayload.mediaUrl`/`mediaUrls`.
 */
type MediaPayload = Omit<MediaFactLegacyProjection, "MediaTranscribedIndexes">;
/**
 * Builds single-item and list legacy media fields.
 * @deprecated Inbound contexts use `media`; outbound replies use lowercase
 * `ReplyPayload.mediaUrl`/`mediaUrls`.
 */
declare function buildMediaPayload(mediaList: MediaPayloadInput[], opts?: {
  preserveMediaTypeCardinality?: boolean;
}): MediaPayload;
//#endregion
//#region src/infra/http-body.d.ts
declare const DEFAULT_WEBHOOK_MAX_BODY_BYTES: number;
//#endregion
//#region src/channels/channel-config.d.ts
/** How a channel config entry was selected. */
type ChannelMatchSource = "direct" | "parent" | "wildcard";
/** Match result carrying direct, parent, and wildcard candidates for channel config lookup. */
type ChannelEntryMatch<T> = {
  entry?: T;
  key?: string;
  wildcardEntry?: T;
  wildcardKey?: string;
  parentEntry?: T;
  parentKey?: string;
  matchKey?: string;
  matchSource?: ChannelMatchSource;
};
/** Normalizes human channel names into config-safe slugs. */
declare function normalizeChannelSlug(value: string): string;
/** Builds unique config lookup keys from optional channel/account identifiers. */
declare function buildChannelKeyCandidates(...keys: Array<string | undefined | null>): string[];
/** Resolves config entry precedence: direct, normalized direct, parent, normalized parent, wildcard. */
declare function resolveChannelEntryMatchWithFallback<T>(params: {
  entries?: Record<string, T>;
  keys: string[];
  parentKeys?: string[];
  wildcardKey?: string;
  normalizeKey?: (value: string) => string;
}): ChannelEntryMatch<T>;
/** Resolves nested allowlists where an inner list only applies after the outer list matches. */
declare function resolveNestedAllowlistDecision(params: {
  outerConfigured: boolean;
  outerMatched: boolean;
  innerConfigured: boolean;
  innerMatched: boolean;
}): boolean;
//#endregion
//#region src/config/runtime-group-policy.d.ts
type GroupPolicyDefaultsConfig = {
  channels?: {
    defaults?: {
      groupPolicy?: GroupPolicy;
    };
  };
};
/** Read the shared channels default group policy used by provider-specific resolvers. */
declare function resolveDefaultGroupPolicy(cfg: GroupPolicyDefaultsConfig): GroupPolicy | undefined;
//#endregion
//#region src/channels/allowlist-match.d.ts
type AllowlistMatchSource = "wildcard" | "id" | "name" | "tag" | "username" | "prefixed-id" | "prefixed-user" | "prefixed-name" | "slug" | "localpart";
type AllowlistMatch<TSource extends string = AllowlistMatchSource> = {
  allowed: boolean;
  matchKey?: string;
  matchSource?: TSource;
};
/** Matches simple sender id/name allowlists used by legacy channel config. */
declare function resolveAllowlistMatchSimple(params: {
  allowFrom: ReadonlyArray<string | number>;
  senderId: string;
  senderName?: string | null;
  allowNameMatching?: boolean;
}): AllowlistMatch<"wildcard" | "id" | "name">;
//#endregion
//#region packages/normalization-core/src/string-normalization.d.ts
/** Coerces entries to strings, trims them, and drops empty results. */
declare function normalizeStringEntries(list?: ReadonlyArray<unknown>): string[];
//#endregion
//#region src/channels/allowlists/resolve-utils.d.ts
declare function mergeAllowlist(params: {
  existing?: Array<string | number>;
  additions: string[];
}): string[];
/** Logs a compact resolved/unresolved allowlist lookup summary when there is anything to report. */
declare function summarizeMapping(label: string, mapping: string[], unresolved: string[], runtime: RuntimeEnv): void;
//#endregion
//#region src/channels/logging.d.ts
/**
 * Shared channel diagnostic formatters exposed through the plugin SDK.
 * Keep messages compact and stable enough for plugin logs without making them machine contracts.
 */
/** Minimal logger callback shape exposed through channel SDK helpers. */
type LogFn = (message: string) => void;
/** Emits a normalized typing-indicator failure diagnostic for channel plugins. */
declare function logTypingFailure(params: {
  log: LogFn;
  channel: string;
  target?: string;
  action?: "start" | "stop";
  error: unknown;
}): void;
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
//#region src/channels/plugins/pairing-message.d.ts
/**
 * Default approval message sent after channel pairing succeeds.
 */
declare const PAIRING_APPROVED_MESSAGE = "\u2705 OpenClaw access approved. Send a message to start chatting.";
//#endregion
//#region src/plugin-sdk/status-helpers.d.ts
/** Create the baseline runtime snapshot shape used by channel/account status stores. */
declare function createDefaultChannelRuntimeState<T extends Record<string, unknown>>(accountId: string, extra?: T): {
  accountId: string;
  running: false;
  lastStartAt: null;
  lastStopAt: null;
  lastError: null;
} & T;
/** Extend the base summary with probe fields while preserving stable null defaults. */
declare function buildProbeChannelStatusSummary<TExtra extends Record<string, unknown>>(snapshot: {
  configured?: boolean | null;
  running?: boolean | null;
  lastStartAt?: number | null;
  lastStopAt?: number | null;
  lastError?: string | null;
  probe?: unknown;
  lastProbeAt?: number | null;
}, extra?: TExtra): {
  configured: boolean;
} & TExtra & {
  probe: unknown;
  lastProbeAt: number | null;
  running: boolean;
  lastStartAt: number | null;
  lastStopAt: number | null;
  lastError: string | null;
};
//#endregion
//#region src/plugin-sdk/file-lock.d.ts
/** Retry and stale-recovery policy for acquiring a filesystem lock. */
type FileLockOptions = {
  /** Retry policy used while waiting for another process or logical holder to release. */retries: {
    retries: number;
    factor: number;
    minTimeout: number;
    maxTimeout: number;
    randomize?: boolean;
  }; /** Milliseconds used to classify contended sidecars as stale. */
  stale: number; /** Fail closed for security-sensitive state; generic locks retain shipped stale recovery. */
  staleRecovery?: "fail-closed" | "remove-if-unchanged";
  /**
   * Logical operation identity for intentional nested acquisition.
   * Reuse one key only within that call chain; omit it for ordinary contention.
   */
  reentrantOwner?: string;
};
/** Run an async callback while holding a file lock, always releasing the lock afterward. */
declare function withFileLock<T>(filePath: string, options: FileLockOptions, fn: () => Promise<T>): Promise<T>;
//#endregion
//#region src/channels/plugins/media-limits.d.ts
/** Resolves channel media limit bytes from account-specific config or agent defaults. */
declare function resolveChannelMediaMaxBytes(params: {
  cfg: OpenClawConfig;
  resolveChannelLimitMb: (params: {
    cfg: OpenClawConfig;
    accountId: string;
  }) => number | undefined;
  accountId?: string | null;
}): number | undefined;
//#endregion
//#region src/plugin-sdk/outbound-media.d.ts
/** Media loading policy used before plugin media is handed to channel delivery. */
type OutboundMediaLoadOptions = {
  /** Maximum allowed media payload size before the load is rejected. */maxBytes?: number; /** Whether callers may load remote URLs, local files, or both. */
  mediaAccess?: OutboundMediaAccess; /** Approved local roots for file/path media; `"any"` disables root restriction. */
  mediaLocalRoots?: readonly string[] | "any"; /** Optional local file reader used by tests or plugin-specific filesystem adapters. */
  mediaReadFile?: (filePath: string) => Promise<Buffer>; /** Workspace root used when resolving relative local media paths. */
  workspaceDir?: string; /** Explicit proxy URL forwarded to shared outbound media loading policy. */
  proxyUrl?: string; /** Fetch implementation for remote media loads. */
  fetchImpl?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>; /** Extra fetch options merged into remote media requests. */
  requestInit?: RequestInit; /** Whether shared media loading may optimize image payloads. */
  optimizeImages?: boolean; /** Allows explicit proxy DNS behavior to be trusted by the media fetch guard. */
  trustExplicitProxyDns?: boolean;
};
/** Load outbound media from a remote URL or approved local path using the shared web-media policy. */
declare function loadOutboundMediaFromUrl(mediaUrl: string, options?: OutboundMediaLoadOptions): Promise<WebMediaResult>;
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
//#region extensions/msteams/src/runtime.d.ts
declare const setMSTeamsRuntime: (next: PluginRuntime) => void, getMSTeamsRuntime: () => PluginRuntime, getOptionalMSTeamsRuntime: () => PluginRuntime | null;
//#endregion
export { DEFAULT_ACCOUNT_ID as C, buildMediaPayload as S, buildChannelKeyCandidates as _, withFileLock as a, resolveNestedAllowlistDecision as b, PAIRING_APPROVED_MESSAGE as c, mergeAllowlist as d, summarizeMapping as f, resolveDefaultGroupPolicy as g, resolveAllowlistMatchSimple as h, resolveChannelMediaMaxBytes as i, createChannelPairingController as l, AllowlistMatch as m, chunkTextForOutbound as n, buildProbeChannelStatusSummary as o, normalizeStringEntries as p, loadOutboundMediaFromUrl as r, createDefaultChannelRuntimeState as s, setMSTeamsRuntime as t, logTypingFailure as u, normalizeChannelSlug as v, DEFAULT_WEBHOOK_MAX_BODY_BYTES as x, resolveChannelEntryMatchWithFallback as y };