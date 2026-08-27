import { S as ChannelId } from "./types-PE8jeqx6.js";
import { z as GroupPolicy } from "./types.openclaw-CXX8ljmy.js";
import { T as WebMediaResult, V as PluginRuntime } from "./types-CAQ6JuHx.js";
import { A as ChannelAccountSnapshot, R as OutboundMediaAccess } from "./types.public-DrgteDAF.js";
import { t as RuntimeEnv } from "./runtime-COwxLt5E.js";
//#region src/routing/account-id.d.ts
declare const DEFAULT_ACCOUNT_ID = "default";
declare function normalizeAccountId(value: string | undefined | null): string;
//#endregion
//#region src/infra/outbound/reply-payload-parts.d.ts
/** Derived sendability facts for text/media outbound payload delivery. */
type SendableOutboundReplyParts = {
  /** Raw text selected for delivery before trimming. */text: string; /** Text after trimming whitespace for sendability checks. */
  trimmedText: string; /** Normalized non-empty media URLs. */
  mediaUrls: string[]; /** Number of normalized media URLs. */
  mediaCount: number; /** Whether trimmed text is sendable. */
  hasText: boolean; /** Whether at least one media URL is sendable. */
  hasMedia: boolean; /** Whether the payload has any sendable text or media. */
  hasContent: boolean;
};
/** Normalize reply payload text/media into a trimmed, sendable shape for delivery paths. */
declare function resolveSendableOutboundReplyParts(payload: {
  text?: string;
  mediaUrls?: string[];
  mediaUrl?: string;
}, options?: {
  text?: string;
}): SendableOutboundReplyParts;
//#endregion
//#region src/channels/allowlists/resolve-utils.d.ts
declare function mergeAllowlist(params: {
  existing?: Array<string | number>;
  additions: string[];
}): string[];
/** Logs a compact resolved/unresolved allowlist lookup summary when there is anything to report. */
declare function summarizeMapping(label: string, mapping: string[], unresolved: string[], runtime: RuntimeEnv): void;
//#endregion
//#region src/plugin-sdk/allow-from.d.ts
/** Lowercase and optionally strip prefixes from allowlist entries before sender comparisons. */
declare function formatAllowFromLowercase(params: {
  /** Raw allowlist entries from config or channel-specific overrides. */allowFrom: Array<string | number>; /** Optional prefix remover for channel aliases such as `tg:` or `zalo:`. */
  stripPrefixRe?: RegExp;
}): string[];
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
//#region extensions/zalouser/src/runtime.d.ts
declare const setZalouserRuntime: (next: PluginRuntime) => void, getZalouserRuntime: () => PluginRuntime;
//#endregion
//#region src/config/runtime-group-policy.d.ts
type RuntimeGroupPolicyResolution = {
  groupPolicy: GroupPolicy;
  providerMissingFallbackApplied: boolean;
};
type ResolveProviderRuntimeGroupPolicyParams = {
  providerConfigPresent: boolean;
  groupPolicy?: GroupPolicy;
  defaultGroupPolicy?: GroupPolicy;
};
type GroupPolicyDefaultsConfig = {
  channels?: {
    defaults?: {
      groupPolicy?: GroupPolicy;
    };
  };
};
/** Read the shared channels default group policy used by provider-specific resolvers. */
declare function resolveDefaultGroupPolicy(cfg: GroupPolicyDefaultsConfig): GroupPolicy | undefined;
/**
 * Resolve the standard channel-provider policy.
 * Configured providers default open; missing provider config defaults allowlist.
 */
declare function resolveOpenProviderRuntimeGroupPolicy(params: ResolveProviderRuntimeGroupPolicyParams): RuntimeGroupPolicyResolution;
/**
 * Log the missing-provider fail-closed fallback once per provider/account.
 * Returns true only when this call emitted the warning.
 */
declare function warnMissingProviderGroupPolicyFallbackOnce(params: {
  providerMissingFallbackApplied: boolean;
  providerKey: string;
  accountId?: string;
  blockedLabel?: string;
  log: (message: string) => void;
}): boolean;
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
//#region src/plugin-sdk/status-helpers.d.ts
type RuntimeLifecycleSnapshot = {
  linked?: boolean | null;
  running?: boolean | null;
  connected?: boolean | null;
  restartPending?: boolean | null;
  reconnectAttempts?: number | null;
  lastConnectedAt?: number | null;
  lastDisconnect?: string | {
    at: number;
    status?: number;
    error?: string;
    loggedOut?: boolean;
  } | null;
  lastEventAt?: number | null;
  lastTransportActivityAt?: number | null;
  healthState?: string | null;
  lifecycle?: ChannelAccountSnapshot["lifecycle"] | null;
  ingressUnavailable?: true | null;
  terminalDisconnect?: boolean | null;
  lastStartAt?: number | null;
  lastStopAt?: number | null;
  lastError?: string | null;
  lastInboundAt?: number | null;
  lastOutboundAt?: number | null;
  busy?: boolean | null;
  activeRuns?: number | null;
  lastRunActivityAt?: number | null;
  activeRunStartedAt?: number | null;
};
type StatusSnapshotExtra = Record<string, unknown>;
/** Build the standard per-account status payload from config metadata plus runtime state. */
declare function buildBaseAccountStatusSnapshot<TExtra extends StatusSnapshotExtra>(params: {
  account: {
    accountId: string;
    name?: string;
    enabled?: boolean;
    configured?: boolean;
  };
  runtime?: RuntimeLifecycleSnapshot | null;
  probe?: unknown;
}, extra?: TExtra): {
  lastInboundAt: number | null;
  lastOutboundAt: number | null;
  activeRunStartedAt?: number | undefined;
  lastRunActivityAt?: number | undefined;
  activeRuns?: number | undefined;
  busy?: boolean | undefined;
  terminalDisconnect?: true | undefined;
  ingressUnavailable?: true | undefined;
  lifecycle?: "blocked" | "starting" | "ready" | "stopped" | "recovering" | undefined;
  healthState?: string | undefined;
  lastTransportActivityAt?: number | undefined;
  lastEventAt?: number | undefined;
  lastDisconnect?: string | {
    at: number;
    status?: number;
    error?: string;
    loggedOut?: boolean;
  } | undefined;
  lastConnectedAt?: number | undefined;
  reconnectAttempts?: number | undefined;
  restartPending?: boolean | undefined;
  connected?: boolean | undefined;
  linked?: boolean | undefined;
  running: boolean;
  lastStartAt: number | null;
  lastStopAt: number | null;
  lastError: string | null;
  probe: unknown;
  accountId: string;
  name: string | undefined;
  enabled: boolean | undefined;
  configured: boolean | undefined;
} & TExtra;
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
export { resolveOpenProviderRuntimeGroupPolicy as a, chunkTextForOutbound as c, summarizeMapping as d, resolveSendableOutboundReplyParts as f, resolveDefaultGroupPolicy as i, formatAllowFromLowercase as l, normalizeAccountId as m, buildBaseAccountStatusSnapshot as n, warnMissingProviderGroupPolicyFallbackOnce as o, DEFAULT_ACCOUNT_ID as p, createChannelPairingController as r, setZalouserRuntime as s, loadOutboundMediaFromUrl as t, mergeAllowlist as u };