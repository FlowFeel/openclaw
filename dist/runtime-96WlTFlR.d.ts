import { J as TelegramNetworkConfig, K as TelegramGroupConfig, W as TelegramDirectConfig, Y as TelegramTopicConfig, _t as MarkdownTableMode, ft as DmPolicy, n as OpenClawConfig, vt as ReplyToMode } from "./types.openclaw-B2WvMv3k.js";
import { K as PairingChannel, L as PluginRuntime, R as InboundMediaFacts, ut as RetryConfig } from "./types-DOjBC-h-.js";
import { W as MessageReceipt, Y as ChannelAccountSnapshot, dn as NormalizedLocation, fn as OutboundLocation, ht as OutboundMediaAccess, pt as PollInput, rt as ChannelMessageActionAdapter, z as ChannelRuntimeSurface } from "./setup-wizard-types-C896ZHgy.js";
import { f as RuntimeEnv } from "./manifest-registry-BChEetzl.js";
import { h as resolveTelegramToken, t as ResolvedTelegramAccount } from "./accounts-CDFmMDSo.js";
import { a as TelegramBotInfo, r as probeTelegram } from "./probe-BNugVd-3.js";
import { Chat, ChatFullInfo, Message, UserFromGetMe } from "grammy/types";
import { Bot } from "grammy";

//#region src/plugin-sdk/channel-lifecycle.core.d.ts
type PassiveAccountLifecycleParams<Handle> = {
  abortSignal?: AbortSignal;
  start: () => Promise<Handle>;
  stop?: (handle: Handle) => void | Promise<void>;
  onStop?: () => void | Promise<void>;
};
/** Runtime context passed to queued channel work. */
/** Bind a fixed account id into a status writer so lifecycle code can emit partial snapshots. */
declare function createAccountStatusSink(params: {
  accountId: string;
  setStatus: (next: ChannelAccountSnapshot) => void;
}): (patch: Omit<ChannelAccountSnapshot, "accountId">) => void;
/**
 * Keep a passive account task alive until abort, then run optional cleanup.
 */
declare function runPassiveAccountLifecycle<Handle>(params: PassiveAccountLifecycleParams<Handle>): Promise<void>;
//#endregion
//#region src/pairing/pairing-store.d.ts
declare function readChannelAllowFromStore(channel: PairingChannel, env?: NodeJS.ProcessEnv, accountId?: string): Promise<string[]>;
//#endregion
//#region src/channels/inbound-event/media.d.ts
/** Attachment metadata accepted from channel plugins before core normalization. */
type ChannelInboundMediaInput = {
  path?: string | null;
  url?: string | null;
  contentType?: string | null;
  kind?: InboundMediaFacts["kind"] | null;
  durationMs?: number | null;
  width?: number | null;
  height?: number | null;
  transcribed?: boolean | null;
  messageId?: string | null;
};
//#endregion
//#region extensions/telegram/src/button-types.d.ts
type TelegramButtonStyle = "danger" | "success" | "primary";
type TelegramInlineButton = {
  text: string;
  callback_data?: string;
  url?: string;
  web_app?: {
    url: string;
  };
  style?: TelegramButtonStyle;
};
type TelegramInlineButtons = ReadonlyArray<ReadonlyArray<TelegramInlineButton>>;
//#endregion
//#region extensions/telegram/src/bot-access.d.ts
type NormalizedAllowFrom = {
  entries: string[];
  hasWildcard: boolean;
  hasEntries: boolean;
  invalidEntries: string[];
};
//#endregion
//#region extensions/telegram/src/bot/body-helpers.d.ts
type TelegramMediaKind = Exclude<NonNullable<ChannelInboundMediaInput["kind"]>, "unknown">;
declare function buildSenderName(msg: Message): string | undefined;
declare function buildSenderLabel(msg: Message, senderId?: number | string): string;
type TelegramTextEntity = NonNullable<Message["entities"]>[number];
type TelegramTextMessage = Pick<Message, "text" | "caption" | "entities" | "caption_entities" | "poll"> & {
  rich_message?: unknown;
};
declare function isBinaryContent(text: string): boolean;
declare function getTelegramTextParts(msg: TelegramTextMessage): {
  text: string;
  entities: TelegramTextEntity[];
};
declare function hasBotMention(msg: Message, botUsername: string): boolean;
type TelegramForwardedContext = {
  from: string;
  date?: number;
  fromType: string;
  fromId?: string;
  fromUsername?: string;
  fromTitle?: string;
  fromSignature?: string;
  fromChatType?: Chat["type"];
  fromMessageId?: number;
};
declare function normalizeForwardedContext(msg: Message): TelegramForwardedContext | null;
declare function extractTelegramLocation(msg: Message): NormalizedLocation | null;
//#endregion
//#region extensions/telegram/src/bot/types.d.ts
/** App-specific stream mode for Telegram stream previews. */
type TelegramStreamMode = "off" | "partial" | "block" | "progress";
type TelegramChatDetails = {
  id?: number | string;
  available_reactions?: ChatFullInfo["available_reactions"] | null;
  is_forum?: boolean;
};
type TelegramGetChat = (chatId: number | string) => Promise<TelegramChatDetails>;
/** Telegram sticker metadata for context enrichment and caching. */
interface StickerMetadata {
  /** Emoji associated with the sticker. */
  emoji?: string;
  /** Name of the sticker set the sticker belongs to. */
  setName?: string;
  /** Telegram file_id for sending the sticker back. */
  fileId?: string;
  /** Stable file_unique_id for cache deduplication. */
  fileUniqueId?: string;
  /** Cached description from previous vision processing (skip re-processing if present). */
  cachedDescription?: string;
}
//#endregion
//#region extensions/telegram/src/bot/helpers.d.ts
declare function resetTelegramForumFlagCacheForTest(): void;
type TelegramThreadSpec = {
  id?: number;
  scope: "dm" | "forum" | "none";
};
declare function extractTelegramForumFlag(value: unknown): boolean | undefined;
declare function resolveTelegramForumFlag(params: {
  chatId: string | number;
  chatType?: Chat["type"];
  isGroup: boolean;
  isForum?: boolean;
  isTopicMessage?: boolean;
  getChat?: TelegramGetChat;
}): Promise<boolean>;
declare function withResolvedTelegramForumFlag<T extends {
  chat: object;
}>(message: T, isForum: boolean): T;
declare function resolveTelegramGroupAllowFromContext(params: {
  cfg: OpenClawConfig;
  chatId: string | number;
  accountId?: string;
  dmPolicy?: DmPolicy;
  allowFrom?: Array<string | number>;
  senderId?: string;
  isGroup?: boolean;
  isForum?: boolean;
  messageThreadId?: number | null;
  groupAllowFrom?: Array<string | number>;
  skipPairingStoreRead?: boolean;
  readChannelAllowFromStore?: typeof readChannelAllowFromStore;
  resolveTelegramGroupConfig: (chatId: string | number, messageThreadId: number | undefined, cfg: OpenClawConfig) => {
    groupConfig?: TelegramGroupConfig | TelegramDirectConfig;
    topicConfig?: TelegramTopicConfig;
  };
}): Promise<{
  resolvedThreadId?: number;
  dmThreadId?: number;
  storeAllowFrom: string[];
  groupConfig?: TelegramGroupConfig | TelegramDirectConfig;
  topicConfig?: TelegramTopicConfig;
  groupAllowOverride?: Array<string | number>;
  effectiveGroupAllow: NormalizedAllowFrom;
  hasGroupAllowOverride: boolean;
}>;
/**
 * Resolve the thread ID for Telegram forum topics.
 * For non-forum groups, returns undefined even if messageThreadId is present
 * (reply threads in regular groups should not create separate sessions).
 * For forum groups, returns the topic ID (or General topic ID=1 if unspecified).
 */
declare function resolveTelegramForumThreadId(params: {
  isForum?: boolean;
  messageThreadId?: number | null;
}): number | undefined;
declare function resolveTelegramThreadSpec(params: {
  isGroup: boolean;
  isForum?: boolean;
  messageThreadId?: number | null;
}): TelegramThreadSpec;
/**
 * Build thread params for Telegram API calls (messages, media).
 *
 * IMPORTANT: Thread IDs behave differently based on chat type:
 * - DMs (private chats): Include message_thread_id when present (DM topics)
 * - Forum topics: Skip thread_id=1 (General topic), include others
 * - Regular groups: Thread IDs are ignored by Telegram
 *
 * General forum topic (id=1) must be treated like a regular supergroup send:
 * Telegram rejects sendMessage/sendMedia with message_thread_id=1 ("thread not found").
 *
 * @param thread - Thread specification with ID and scope
 * @returns API params object or undefined if thread_id should be omitted
 */
declare function buildTelegramThreadParams(thread?: TelegramThreadSpec | null): {
  message_thread_id: number;
} | undefined;
/**
 * Build a Telegram routing target that keeps real topic/thread ids in-band.
 *
 * This is used by generic reply plumbing that may not always carry a separate
 * `threadId` field through every hop. General forum topic stays chat-scoped
 * because Telegram rejects `message_thread_id=1` for message sends.
 */
declare function buildTelegramRoutingTarget(chatId: number | string, thread?: TelegramThreadSpec | null): string;
/**
 * Build thread params for typing indicators (sendChatAction).
 * Empirically, General topic (id=1) needs message_thread_id for typing to appear.
 */
declare function buildTypingThreadParams(messageThreadId?: number): {
  message_thread_id: number;
} | undefined;
declare function resolveTelegramStreamMode(telegramCfg?: {
  streaming?: unknown;
}): TelegramStreamMode;
declare function buildTelegramGroupPeerId(chatId: number | string, messageThreadId?: number): string;
/**
 * Resolve the direct-message peer identifier for Telegram routing/session keys.
 *
 * In some Telegram DM deliveries (for example certain business/chat bridge flows),
 * `chat.id` can differ from the actual sender user id. Prefer sender id when present
 * so per-peer DM scopes isolate users correctly.
 */
declare function resolveTelegramDirectPeerId(params: {
  chatId: number | string;
  senderId?: number | string | null;
}): string;
declare function buildTelegramGroupFrom(chatId: number | string, messageThreadId?: number): string;
/**
 * Build parentPeer for forum topic binding inheritance.
 * When a message comes from a forum topic, the peer ID includes the topic suffix
 * (e.g., `-1001234567890:topic:99`). To allow bindings configured for the base
 * group ID to match, we provide the parent group as `parentPeer` so the routing
 * layer can fall back to it when the exact peer doesn't match.
 */
declare function buildTelegramParentPeer(params: {
  isGroup: boolean;
  resolvedThreadId?: number;
  chatId: number | string;
}): {
  kind: "group";
  id: string;
} | undefined;
declare function buildGroupLabel(msg: Message, chatId: number | string, messageThreadId?: number): string;
declare function resolveTelegramReplyId(raw?: string): number | undefined;
type TelegramReplyTarget = {
  id?: string;
  sender: string;
  senderId?: string;
  senderUsername?: string;
  body?: string;
  mediaType?: TelegramMediaKind;
  kind: "reply" | "quote";
  source: "reply_to_message" | "external_reply";
  quoteText?: string;
  quotePosition?: number;
  quoteEntities?: TelegramTextEntity[]; /** Forward context if the reply target was itself a forwarded message (issue #9619). */
  forwardedFrom?: TelegramForwardedContext;
  quoteSourceText?: string;
  quoteSourceEntities?: TelegramTextEntity[];
};
declare function describeReplyTarget(msg: Message): TelegramReplyTarget | null;
//#endregion
//#region extensions/telegram/src/prompt-context-projection.d.ts
type TelegramPromptContextSource = {
  transcriptMessageId: string;
};
type TelegramPromptContextProjection = TelegramPromptContextSource & {
  partIndex: number;
  finalPart: boolean;
};
declare function createTelegramPromptContextProjectionCursor(source: TelegramPromptContextSource): {
  source: TelegramPromptContextSource;
  nextPartIndex: number;
  complete: boolean;
  invalidate(): void;
  take(finalPart: boolean): TelegramPromptContextProjection;
};
//#endregion
//#region extensions/telegram/src/send-context.d.ts
type TelegramApi = Bot["api"];
type TelegramApiOverride = Partial<TelegramApi>;
type TelegramClientOptionsLease = {
  release: () => void;
};
type TelegramApiContext = {
  cfg: OpenClawConfig;
  account: ResolvedTelegramAccount;
  api: TelegramApi;
  clientOptionsLease?: TelegramClientOptionsLease | undefined;
};
//#endregion
//#region extensions/telegram/src/send-actions.d.ts
type TelegramReactionOpts = {
  cfg: OpenClawConfig;
  token?: string;
  accountId?: string;
  api?: TelegramApiOverride;
  remove?: boolean;
  verbose?: boolean;
  retry?: RetryConfig;
  gatewayClientScopes?: readonly string[];
};
type TelegramTypingOpts = {
  cfg: OpenClawConfig;
  token?: string;
  accountId?: string;
  verbose?: boolean;
  api?: TelegramApiOverride;
  retry?: RetryConfig;
  messageThreadId?: number;
};
declare function sendTypingTelegram(to: string, opts: TelegramTypingOpts): Promise<{
  ok: true;
}>;
declare function reactMessageTelegram(chatIdInput: string | number, messageIdInput: string | number, emoji: string, opts: TelegramReactionOpts): Promise<{
  ok: true;
} | {
  ok: false;
  warning: string;
}>;
type TelegramDeleteOpts$1 = {
  cfg: OpenClawConfig;
  token?: string;
  accountId?: string;
  notify?: boolean;
  verbose?: boolean;
  api?: TelegramApiOverride;
  retry?: RetryConfig;
  gatewayClientScopes?: readonly string[];
};
declare function deleteMessageTelegram(chatIdInput: string | number, messageIdInput: string | number, opts: TelegramDeleteOpts$1): Promise<{
  ok: true;
} | {
  ok: false;
  warning: string;
}>;
declare function pinMessageTelegram(chatIdInput: string | number, messageIdInput: string | number, opts: TelegramDeleteOpts$1): Promise<{
  ok: true;
  messageId: string;
  chatId: string;
}>;
declare function unpinMessageTelegram(chatIdInput: string | number, messageIdInput: string | number | undefined, opts: TelegramDeleteOpts$1): Promise<{
  ok: true;
  chatId: string;
  messageId?: string;
}>;
//#endregion
//#region extensions/telegram/src/send-forum-topics.d.ts
type TelegramDeleteOpts = {
  cfg: OpenClawConfig;
  token?: string;
  accountId?: string;
  notify?: boolean;
  verbose?: boolean;
  api?: TelegramApiOverride;
  retry?: RetryConfig;
  gatewayClientScopes?: readonly string[];
};
type TelegramCreateForumTopicParams = NonNullable<Parameters<TelegramApiContext["api"]["createForumTopic"]>[2]>;
type TelegramEditForumTopicOpts = TelegramDeleteOpts & {
  name?: string;
  iconCustomEmojiId?: string;
};
declare function editForumTopicTelegram(chatIdInput: string | number, messageThreadIdInput: string | number, opts: TelegramEditForumTopicOpts): Promise<{
  ok: true;
  chatId: string;
  messageThreadId: number;
  name?: string;
  iconCustomEmojiId?: string;
}>;
declare function renameForumTopicTelegram(chatIdInput: string | number, messageThreadIdInput: string | number, name: string, opts: TelegramDeleteOpts): Promise<{
  ok: true;
  chatId: string;
  messageThreadId: number;
  name: string;
}>;
type TelegramCreateForumTopicOpts = {
  cfg: OpenClawConfig;
  token?: string;
  accountId?: string;
  api?: TelegramApiOverride;
  verbose?: boolean;
  retry?: RetryConfig;
  gatewayClientScopes?: readonly string[]; /** Icon color for the topic (must be one of 0x6FB9F0, 0xFFD67E, 0xCB86DB, 0x8EEE98, 0xFF93B2, 0xFB6F5F). */
  iconColor?: TelegramCreateForumTopicParams["icon_color"]; /** Custom emoji ID for the topic icon. */
  iconCustomEmojiId?: string;
};
type TelegramCreateForumTopicResult = {
  topicId: number;
  name: string;
  chatId: string;
};
/**
 * Create a forum topic in a Telegram supergroup.
 * Requires the bot to have `can_manage_topics` permission.
 *
 * @param chatId - Supergroup chat ID
 * @param name - Topic name (1-128 characters)
 * @param opts - Optional configuration
 */
declare function createForumTopicTelegram(chatId: string, name: string, opts: TelegramCreateForumTopicOpts): Promise<TelegramCreateForumTopicResult>;
//#endregion
//#region extensions/telegram/src/send-edit.d.ts
type TelegramEditOpts = {
  token?: string;
  accountId?: string;
  verbose?: boolean;
  api?: TelegramApiOverride;
  retry?: RetryConfig;
  gatewayClientScopes?: readonly string[];
  textMode?: "markdown" | "html"; /** Controls whether link previews are shown in the edited message. */
  linkPreview?: boolean; /** Inline keyboard buttons (reply markup). Pass empty array to remove buttons. */
  buttons?: TelegramInlineButtons; /** Use Telegram's media-caption edit endpoint, or fall back to it when text edits target media. */
  editMode?: "text" | "caption" | "auto"; /** Resolved runtime config from the command or gateway boundary. */
  cfg: OpenClawConfig;
};
type TelegramEditReplyMarkupOpts = {
  token?: string;
  accountId?: string;
  verbose?: boolean;
  api?: TelegramApiOverride;
  retry?: RetryConfig;
  gatewayClientScopes?: readonly string[]; /** Inline keyboard buttons (reply markup). Pass empty array to remove buttons. */
  buttons?: TelegramInlineButtons; /** Resolved runtime config from the command or gateway boundary. */
  cfg: OpenClawConfig;
};
declare function editMessageReplyMarkupTelegram(chatIdInput: string | number, messageIdInput: string | number, buttons: TelegramInlineButtons, opts: TelegramEditReplyMarkupOpts): Promise<{
  ok: true;
  messageId: string;
  chatId: string;
}>;
declare function editMessageTelegram(chatIdInput: string | number, messageIdInput: string | number, text: string, opts: TelegramEditOpts): Promise<{
  ok: true;
  messageId: string;
  chatId: string;
}>;
//#endregion
//#region extensions/telegram/src/send-message-types.d.ts
type TelegramSendOpts = {
  cfg: OpenClawConfig;
  token?: string;
  accountId?: string;
  verbose?: boolean;
  mediaUrl?: string;
  mediaAccess?: OutboundMediaAccess;
  mediaLocalRoots?: readonly string[];
  mediaReadFile?: (filePath: string) => Promise<Buffer>;
  gatewayClientScopes?: readonly string[];
  maxBytes?: number;
  api?: TelegramApiOverride;
  retry?: RetryConfig;
  textMode?: "markdown" | "html";
  tableMode?: MarkdownTableMode; /** Send audio as voice message instead of audio file. Defaults to false. */
  asVoice?: boolean; /** Send video as video note instead of regular video. Defaults to false. */
  asVideoNote?: boolean; /** Send message silently (no notification). Defaults to false. */
  silent?: boolean; /** Shared cursor keeps one transcript projection contiguous across concrete sends. */
  promptContextProjectionPlan?: {
    cursor: ReturnType<typeof createTelegramPromptContextProjectionCursor>;
    finalPart: boolean;
  }; /** Message ID to reply to (for threading) */
  replyToMessageId?: number; /** Whether replyToMessageId came from ambient context or explicit payload/action input. */
  replyToIdSource?: "explicit" | "implicit"; /** Controls whether replyToMessageId is applied to every internal text chunk. */
  replyToMode?: ReplyToMode; /** Quote text for Telegram reply_parameters. */
  quoteText?: string; /** Forum topic thread ID (for forum supergroups) */
  messageThreadId?: number; /** Inline keyboard buttons (reply markup). */
  buttons?: TelegramInlineButtons; /** Send image as document to avoid Telegram compression. Defaults to false. */
  forceDocument?: boolean; /** Persist each concrete platform send before any later chunk can fail. */
  onDeliveryResult?: (result: TelegramSendResult) => Promise<void> | void;
};
type TelegramSendResult = {
  messageId: string;
  chatId: string;
  receipt?: MessageReceipt;
  meta?: {
    telegramDeliveredText?: string;
    telegramHasInlineKeyboard?: boolean;
  };
};
type TelegramLocationSendOpts = Pick<TelegramSendOpts, "cfg" | "token" | "accountId" | "verbose" | "api" | "retry" | "gatewayClientScopes" | "replyToMessageId" | "messageThreadId" | "buttons" | "quoteText" | "promptContextProjectionPlan" | "silent" | "onDeliveryResult">;
//#endregion
//#region extensions/telegram/src/send-location.d.ts
/** Send a standalone location pin or named venue through Telegram's native payload. */
declare function sendLocationTelegram(to: string, input: OutboundLocation, opts: TelegramLocationSendOpts): Promise<TelegramSendResult>;
//#endregion
//#region extensions/telegram/src/send-message.d.ts
declare function sendMessageTelegram(to: string, text: string, opts: TelegramSendOpts): Promise<TelegramSendResult>;
//#endregion
//#region extensions/telegram/src/send-special.d.ts
type TelegramStickerOpts = {
  cfg: OpenClawConfig;
  token?: string;
  accountId?: string;
  verbose?: boolean;
  api?: TelegramApiOverride;
  retry?: RetryConfig;
  gatewayClientScopes?: readonly string[]; /** Message ID to reply to (for threading) */
  replyToMessageId?: number; /** Forum topic thread ID (for forum supergroups) */
  messageThreadId?: number;
};
/**
 * Send a sticker to a Telegram chat by file_id.
 * @param to - Chat ID or username (e.g., "123456789" or "@username")
 * @param fileId - Telegram file_id of the sticker to send
 * @param opts - Optional configuration
 */
declare function sendStickerTelegram(to: string, fileId: string, opts: TelegramStickerOpts): Promise<TelegramSendResult>;
type TelegramPollOpts = {
  cfg: OpenClawConfig;
  token?: string;
  accountId?: string;
  verbose?: boolean;
  api?: TelegramApiOverride;
  retry?: RetryConfig;
  gatewayClientScopes?: readonly string[]; /** Message ID to reply to (for threading) */
  replyToMessageId?: number; /** Forum topic thread ID (for forum supergroups) */
  messageThreadId?: number; /** Send message silently (no notification). Defaults to false. */
  silent?: boolean; /** Whether votes are anonymous. Defaults to true (Telegram default). */
  isAnonymous?: boolean;
};
/**
 * Send a poll to a Telegram chat.
 * @param to - Chat ID or username (e.g., "123456789" or "@username")
 * @param poll - Poll input with question, options, maxSelections, and optional durationHours
 * @param opts - Optional configuration
 */
declare function sendPollTelegram(to: string, poll: PollInput, opts: TelegramPollOpts): Promise<{
  messageId: string;
  chatId: string;
  pollId?: string;
}>;
//#endregion
//#region extensions/telegram/src/audit.types.d.ts
type TelegramGroupMembershipAuditEntry = {
  chatId: string;
  ok: boolean;
  status?: string | null;
  error?: string | null;
  matchKey?: string;
  matchSource?: "id";
};
type TelegramGroupMembershipAudit = {
  ok: boolean;
  checkedGroups: number;
  unresolvedGroups: number;
  hasWildcardUnmentionedGroups: boolean;
  groups: TelegramGroupMembershipAuditEntry[];
  elapsedMs: number;
};
type AuditTelegramGroupMembershipParams = {
  token: string;
  botId: number;
  groupIds: string[];
  proxyUrl?: string;
  network?: TelegramNetworkConfig;
  apiRoot?: string;
  timeoutMs: number;
};
//#endregion
//#region extensions/telegram/src/audit.d.ts
declare function collectTelegramUnmentionedGroupIds(groups: Record<string, TelegramGroupConfig> | undefined): {
  groupIds: string[];
  unresolvedGroups: number;
  hasWildcardUnmentionedGroups: boolean;
};
declare function auditTelegramGroupMembership(params: AuditTelegramGroupMembershipParams): Promise<TelegramGroupMembershipAudit>;
//#endregion
//#region extensions/telegram/src/monitor.types.d.ts
type MonitorTelegramOpts = {
  token?: string;
  accountId?: string;
  config?: OpenClawConfig;
  runtime?: RuntimeEnv;
  channelRuntime?: ChannelRuntimeSurface;
  abortSignal?: AbortSignal;
  useWebhook?: boolean;
  webhookPath?: string;
  webhookPort?: number;
  webhookSecret?: string;
  webhookHost?: string;
  proxyFetch?: typeof fetch;
  webhookUrl?: string;
  webhookCertPath?: string;
  botInfo?: TelegramBotInfo;
  setStatus?: (patch: Omit<ChannelAccountSnapshot, "accountId">) => void;
  isolatedIngress?: {
    enabled?: boolean;
  };
};
type TelegramMonitorFn = (opts?: MonitorTelegramOpts) => Promise<void>;
//#endregion
//#region extensions/telegram/src/runtime.types.d.ts
type TelegramProbeFn = typeof probeTelegram;
type TelegramAuditCollectFn = typeof collectTelegramUnmentionedGroupIds;
type TelegramAuditMembershipFn = typeof auditTelegramGroupMembership;
type TelegramSendFn = typeof sendMessageTelegram;
type TelegramResolveTokenFn = typeof resolveTelegramToken;
type BasePluginRuntimeChannel = PluginRuntime extends {
  channel: infer T;
} ? T : never;
type TelegramChannelRuntime = {
  probeTelegram?: TelegramProbeFn;
  collectTelegramUnmentionedGroupIds?: TelegramAuditCollectFn;
  auditTelegramGroupMembership?: TelegramAuditMembershipFn;
  monitorTelegramProvider?: TelegramMonitorFn;
  sendMessageTelegram?: TelegramSendFn;
  resolveTelegramToken?: TelegramResolveTokenFn;
  messageActions?: ChannelMessageActionAdapter;
};
interface TelegramRuntimeChannel extends BasePluginRuntimeChannel {
  telegram?: TelegramChannelRuntime;
}
interface TelegramRuntime extends PluginRuntime {
  channel: TelegramRuntimeChannel;
}
//#endregion
//#region extensions/telegram/src/runtime.d.ts
declare const setTelegramRuntime: (next: TelegramRuntime) => void, getTelegramRuntime: () => TelegramRuntime, getOptionalTelegramRuntime: () => TelegramRuntime | null;
//#endregion
export { runPassiveAccountLifecycle as $, extractTelegramForumFlag as A, StickerMetadata as B, buildTelegramGroupFrom as C, buildTelegramThreadParams as D, buildTelegramRoutingTarget as E, resolveTelegramGroupAllowFromContext as F, extractTelegramLocation as G, TelegramTextEntity as H, resolveTelegramReplyId as I, isBinaryContent as J, getTelegramTextParts as K, resolveTelegramStreamMode as L, resolveTelegramDirectPeerId as M, resolveTelegramForumFlag as N, buildTypingThreadParams as O, resolveTelegramForumThreadId as P, createAccountStatusSink as Q, resolveTelegramThreadSpec as R, buildGroupLabel as S, buildTelegramParentPeer as T, buildSenderLabel as U, TelegramForwardedContext as V, buildSenderName as W, TelegramButtonStyle as X, normalizeForwardedContext as Y, TelegramInlineButtons as Z, sendTypingTelegram as _, sendPollTelegram as a, TelegramReplyTarget as b, sendLocationTelegram as c, createForumTopicTelegram as d, editForumTopicTelegram as f, reactMessageTelegram as g, pinMessageTelegram as h, collectTelegramUnmentionedGroupIds as i, resetTelegramForumFlagCacheForTest as j, describeReplyTarget as k, editMessageReplyMarkupTelegram as l, deleteMessageTelegram as m, MonitorTelegramOpts as n, sendStickerTelegram as o, renameForumTopicTelegram as p, hasBotMention as q, auditTelegramGroupMembership as r, sendMessageTelegram as s, setTelegramRuntime as t, editMessageTelegram as u, unpinMessageTelegram as v, buildTelegramGroupPeerId as w, TelegramThreadSpec as x, TelegramApiOverride as y, withResolvedTelegramForumFlag as z };