import { r as OpenClawConfig } from "../types.openclaw-DqdTE9e3.js";
import { S as ReplyToMode } from "../types.base-BYV-OxM1.js";
import { i as ReplyPayload$1 } from "../reply-payload-DdceO6tf.js";
import { v as SourceReplyDeliveryMode } from "../types-CJ2AFyfH.js";
import { c as RuntimeMsgContext, d as UntrustedStructuredContextEntry, f as BlockReplyContext, n as ChannelStructuredContextEntry, p as GetReplyOptions, r as FinalizedMsgContext, s as MsgContext, y as CommandTurnContext } from "../templating-BhJuWyZk.js";
import { Ao as DispatchReplyWithDispatcher, Do as finalizeInboundContextForSdk, Fo as DispatchFromConfigResult, Io as InternalGetReplyFromConfig, Lo as InternalGetReplyOptions, Mo as ReplyDispatcherWithTypingOptions, No as createReplyDispatcher, Oo as settleReplyDispatcher, Po as createReplyDispatcherWithTyping, Ro as CommandSessionMetadataChange, jo as ReplyDispatcherOptions, ko as DispatchReplyWithBufferedBlockDispatcher } from "../types-CWvW31qx.js";
import { at as ReplyDispatchBeforeDeliverOptions, ct as ReplyDispatcher, lt as ReplyFollowupAdmissionBarrierTimeoutPolicy, ot as ReplyDispatchKind } from "../hook-runner-global-B0HTZ6t_.js";
import { c as ChunkMode, d as chunkMarkdownTextWithMode, f as chunkText, h as resolveTextChunkLimit, m as resolveChunkMode, p as chunkTextWithMode, u as chunkMarkdownText } from "../outbound.types-BsP6frUw.js";
import { n as createInboundDebouncer, r as resolveInboundDebounceMs } from "../inbound-debounce-B4oECHg1.js";
import { r as ReplyPayload } from "../reply-payload-DSgZ_G6Q.js";
import { i as isSilentReplyText, n as SILENT_REPLY_TOKEN, t as HEARTBEAT_TOKEN } from "../tokens-CLx0Aap_.js";
import { n as isAbortRequestText, t as isBtwRequestText } from "../btw-command-BpvzQTfW.js";
import { n as generateConversationLabel, t as ConversationLabelParams } from "../conversation-label-generator-CCEp3Tol.js";

//#region src/auto-reply/heartbeat.d.ts
/** Default prompt for heartbeat turns when config does not override it. */
declare const HEARTBEAT_PROMPT = "Follow the heartbeat monitor scratch context when provided. Recurring tasks are automations; create or change their schedules with the automations tool, not heartbeat scratch. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK.";
declare const DEFAULT_HEARTBEAT_ACK_MAX_CHARS = 300;
/** Resolves configured heartbeat prompt text with the built-in default fallback. */
declare function resolveHeartbeatPrompt(raw?: string): string;
type StripHeartbeatMode = "heartbeat" | "message";
/** Strips HEARTBEAT_OK acknowledgements and decides whether visible notification is needed. */
declare function stripHeartbeatToken(raw?: string, opts?: {
  mode?: StripHeartbeatMode;
  maxAckChars?: number;
}): {
  shouldSkip: boolean;
  text: string;
  didStrip: boolean;
};
//#endregion
//#region src/auto-reply/dispatch.d.ts
type InternalDispatchReplyOptions = Omit<InternalGetReplyOptions, "onBlockReply">;
type ReplyPayloadRunState = {
  runId?: string;
};
type DispatchInboundResult = DispatchFromConfigResult;
/** Dispatches one finalized inbound message through reply resolution and queued delivery. */
declare function dispatchInboundMessage(params: {
  ctx: MsgContext | FinalizedMsgContext;
  cfg: OpenClawConfig;
  dispatcher: ReplyDispatcher;
  toolsAllow?: string[];
  replyOptions?: InternalDispatchReplyOptions;
  replyResolver?: InternalGetReplyFromConfig;
  onSessionMetadataChanges?: (changes: CommandSessionMetadataChange[]) => void;
  replyPayloadRunState?: ReplyPayloadRunState; /** Observe-only turns run the agent without entering outbound hook stages. */
  outboundHooks?: "enabled" | "disabled";
  onSettled?: () => void | Promise<void>;
}): Promise<DispatchInboundResult>;
type BufferedInboundDispatcherParams = {
  ctx: MsgContext | FinalizedMsgContext;
  cfg: OpenClawConfig;
  dispatcherOptions: ReplyDispatcherWithTypingOptions;
  toolsAllow?: string[];
  replyOptions?: InternalDispatchReplyOptions;
  replyResolver?: InternalGetReplyFromConfig;
  onSessionMetadataChanges?: (changes: CommandSessionMetadataChange[]) => void;
};
declare function dispatchInboundMessageWithBufferedDispatcher(params: BufferedInboundDispatcherParams): Promise<DispatchInboundResult>;
/** Creates a plain dispatcher, installs global send hooks, and dispatches the inbound message. */
declare function dispatchInboundMessageWithDispatcher(params: {
  ctx: MsgContext | FinalizedMsgContext;
  cfg: OpenClawConfig;
  dispatcherOptions: ReplyDispatcherOptions;
  toolsAllow?: string[];
  replyOptions?: InternalDispatchReplyOptions;
  replyResolver?: InternalGetReplyFromConfig;
}): Promise<DispatchInboundResult>;
//#endregion
//#region src/auto-reply/group-activation.d.ts
/** Supported group activation modes. */
type GroupActivationMode = "mention" | "always";
/** Normalize a raw group activation mode string. */
declare function normalizeGroupActivation(raw?: string | null): GroupActivationMode | undefined;
/** Parse `/activation` commands from inbound message text. */
declare function parseActivationCommand(raw?: string): {
  hasCommand: boolean;
  mode?: GroupActivationMode;
};
//#endregion
//#region src/auto-reply/heartbeat-reply-payload.d.ts
/**
 * Pick the last outbound-capable reply payload for heartbeat delivery.
 *
 * Reasoning payloads are skipped using the shared SDK classifier
 * `isReasoningReplyPayload`, which recognizes the `isReasoning` flag plus the
 * common reasoning/thinking text prefixes (including lowercased and Markdown
 * blockquoted forms). Heartbeat delivery keeps separate reasoning payloads
 * internal; without this guard, a trailing reasoning payload (which reasoning
 * models can emit after the final answer) would be selected as the visible
 * heartbeat reply.
 */
declare function resolveHeartbeatReplyPayload(replyResult: ReplyPayload$1 | ReplyPayload$1[] | undefined): ReplyPayload$1 | undefined;
//#endregion
//#region src/auto-reply/reply/get-reply.d.ts
declare function getReplyFromConfig(ctx: RuntimeMsgContext, opts?: GetReplyOptions, configOverride?: OpenClawConfig): Promise<ReplyPayload$1 | ReplyPayload$1[] | undefined>;
//#endregion
//#region src/auto-reply/reply/inbound-dedupe.d.ts
declare function resetInboundDedupe(): void;
//#endregion
//#region src/auto-reply/reply/provider-dispatcher.d.ts
/** Dispatch a reply using the buffered block dispatcher path. */
declare const dispatchReplyWithBufferedBlockDispatcher: DispatchReplyWithBufferedBlockDispatcher;
/** Dispatch a reply using the standard dispatcher path. */
declare const dispatchReplyWithDispatcher: DispatchReplyWithDispatcher;
//#endregion
//#region src/auto-reply/reply/reply-reference.d.ts
/** Stateful planner for reply-to ids across one delivery flow. */
type ReplyReferencePlanner = {
  /** Returns the effective reply/thread id for the next send without updating state. */peek(): string | undefined; /** Returns the effective reply/thread id for the next send and updates state. */
  use(): string | undefined; /** Mark that a reply was sent (needed when no reference is used). */
  markSent(): void; /** Whether a reply has been sent in this flow. */
  hasReplied(): boolean;
};
/** Returns true for modes that use a reply reference only before the first send. */
/** Creates a planner that tracks whether a reply reference has already been consumed. */
declare function createReplyReferencePlanner(options: {
  replyToMode: ReplyToMode; /** Existing thread/reference id (preferred when allowed by replyToMode). */
  existingId?: string; /** Id to start a new thread/reference when allowed (e.g., parent message id). */
  startId?: string; /** Disable reply references entirely (e.g., when posting inside a new thread). */
  allowReference?: boolean; /** Seed the planner with prior reply state. */
  hasReplied?: boolean;
}): ReplyReferencePlanner;
//#endregion
export { type BlockReplyContext, type ChannelStructuredContextEntry, type ChunkMode, type CommandTurnContext, type ConversationLabelParams, DEFAULT_HEARTBEAT_ACK_MAX_CHARS, type FinalizedMsgContext, type GetReplyOptions, HEARTBEAT_PROMPT, HEARTBEAT_TOKEN, type MsgContext, type ReplyDispatchBeforeDeliverOptions, type ReplyDispatchKind, type ReplyDispatcher, type ReplyDispatcherOptions, type ReplyDispatcherWithTypingOptions, type ReplyFollowupAdmissionBarrierTimeoutPolicy, type ReplyPayload, SILENT_REPLY_TOKEN, type SourceReplyDeliveryMode, type UntrustedStructuredContextEntry, chunkMarkdownText, chunkMarkdownTextWithMode, chunkText, chunkTextWithMode, createInboundDebouncer, createReplyDispatcher, createReplyDispatcherWithTyping, createReplyReferencePlanner, dispatchInboundMessage, dispatchInboundMessageWithBufferedDispatcher, dispatchInboundMessageWithDispatcher, dispatchReplyWithBufferedBlockDispatcher, dispatchReplyWithDispatcher, finalizeInboundContextForSdk as finalizeInboundContext, generateConversationLabel, getReplyFromConfig, isAbortRequestText, isBtwRequestText, isSilentReplyText, normalizeGroupActivation, parseActivationCommand, resetInboundDedupe, resolveChunkMode, resolveHeartbeatPrompt, resolveHeartbeatReplyPayload, resolveInboundDebounceMs, resolveTextChunkLimit, settleReplyDispatcher, stripHeartbeatToken };