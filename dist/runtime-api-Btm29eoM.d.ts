import { z as PluginRuntime } from "./types-CHzJhI3f.js";
import { t as ChannelId } from "./channel-id.types-CNSVyOiV.js";
//#region src/channels/allowlist-match.d.ts
type AllowlistMatchSource = "wildcard" | "id" | "name" | "tag" | "username" | "prefixed-id" | "prefixed-user" | "prefixed-name" | "slug" | "localpart";
type AllowlistMatch<TSource extends string = AllowlistMatchSource> = {
  allowed: boolean;
  matchKey?: string;
  matchSource?: TSource;
};
//#endregion
//#region src/channels/logging.d.ts
/**
 * Shared channel diagnostic formatters exposed through the plugin SDK.
 * Keep messages compact and stable enough for plugin logs without making them machine contracts.
 */
/** Minimal logger callback shape exposed through channel SDK helpers. */
type LogFn = (message: string) => void;
/** Emits a normalized inbound-drop diagnostic for channel plugins. */
declare function logInboundDrop(params: {
  log: LogFn;
  channel: string;
  reason: string;
  target?: string;
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
//#region extensions/nextcloud-talk/src/runtime.d.ts
declare const setNextcloudTalkRuntime: (next: PluginRuntime) => void, getNextcloudTalkRuntime: () => PluginRuntime;
//#endregion
export { AllowlistMatch as i, createChannelPairingController as n, logInboundDrop as r, setNextcloudTalkRuntime as t };