import { p as ReplyPayload } from "./types-zW07lbxl.js";
import { Ft as SilentReplyConversationType, Ht as ReplyToMode } from "./types.openclaw-B-6RRL7F.js";
import { t as DeliveryContext } from "./delivery-context.types-CgrQeDKp.js";
import { D as OutboundDeliveryFormattingOptions, E as OutboundIdentity, L as OutboundPayloadDeliverySuppressionReason, V as RenderedMessageBatchPlanItem, z as ChannelMessageUnknownSendReconciliationResult } from "./types.adapters-DCMv7yAc.js";
import { R as ReplyDispatchKind, u as PluginHookReplyPayloadSendingContext } from "./hook-types-DiISlkO8.js";
import { r as SessionTranscriptDeliveryMirror } from "./transcript-BzP3zzt1.js";
//#region src/plugins/runtime/subagent-requester-context.d.ts
type PluginSubagentRequesterContext = Readonly<{
  sessionKey: string;
  origin: Readonly<DeliveryContext>;
}>;
//#endregion
//#region src/infra/delivery-queue-sqlite.types.d.ts
type DeliveryQueueCompletionRetention = "permanent" | Readonly<{
  idPrefix: string;
  maxAgeMs: number;
  maxEntries: number;
}>;
//#endregion
//#region src/infra/outbound/delivery-completion.d.ts
/** Serializable owner callback for a durable queue entry. */
type DurableDeliveryCompletion = {
  kind: "conversation";
  agentId: string;
  operationId: string;
  storePath?: string;
};
//#endregion
//#region src/infra/outbound/mirror.d.ts
/**
 * Transcript append data emitted after an outbound send completes.
 */
type OutboundMirror = {
  sessionKey: string;
  agentId?: string;
  text?: string;
  mediaUrls?: string[];
  idempotencyKey?: string;
  expectedSessionId?: string;
  deliveryMirror?: SessionTranscriptDeliveryMirror;
};
/**
 * Delivery-layer mirror data with optional group/channel correlation metadata.
 */
type DeliveryMirror = OutboundMirror & {
  /** Whether this message is being sent in a group/channel context */isGroup?: boolean; /** Group or channel identifier for correlation with received events */
  groupId?: string;
};
//#endregion
//#region src/infra/outbound/prepared-batch.d.ts
declare const PREPARED_OUTBOUND_BATCH_SCHEMA_VERSION: 1;
type PreparedOutboundAcceptedEntry = {
  sourceIndex: number;
  status: "accepted";
  payload: ReplyPayload;
  replyHookChanged: boolean;
  messageHookChanged: boolean;
  preparedMediaCount: number;
};
type PreparedOutboundSuppressedEntry = {
  sourceIndex: number;
  status: "suppressed";
  reason: OutboundPayloadDeliverySuppressionReason;
  hookEffect?: {
    cancelReason?: string;
    metadata?: Record<string, unknown>;
  };
};
type PreparedOutboundBatchEntry = PreparedOutboundAcceptedEntry | PreparedOutboundSuppressedEntry;
/** Canonical post-policy payload custody persisted by the durable outbound queue. */
type PreparedOutboundBatch = {
  schemaVersion: typeof PREPARED_OUTBOUND_BATCH_SCHEMA_VERSION;
  sourcePayloadCount: number; /** True only when accepted payloads already passed post-policy channel normalization. */
  channelNormalized?: true;
  runId?: string;
  entries: PreparedOutboundBatchEntry[];
};
//#endregion
//#region src/infra/outbound/session-context.d.ts
type OutboundSessionContext = {
  /**
   * Canonical session key used for internal hook dispatch.
   *
   * MUST equal the agent runtime's `params.sessionKey` for the run that
   * produced the payload being delivered. Plugins observing both
   * `agent_end`/`llm_input`/`llm_output`/`before_tool_call`/`after_tool_call`
   * and `message_sending`/`message_sent` rely on this equality to correlate
   * per-turn state across the agent-loop and delivery boundaries.
   *
   * Callers populating this field should use the same value the agent runner
   * received as its sessionKey — in the chat path that is
   * `targetSessionKey || ctx.SessionKey` (see
   * `auto-reply/reply/get-reply.ts`). Followup, ACP, command, and cron
   * delivery paths each have their own canonical value to forward; consult
   * the relevant runner.
   */
  key?: string;
  /**
   * Session key used for policy resolution when delivery differs from the
   * control session. Used to look up silent-reply policy, send rate limits,
   * agent-scoped channel preferences, etc., for the chat the reply is being
   * delivered into. May equal `key` when there is no redirect; otherwise
   * `policyKey` describes the *delivery target*'s session while `key`
   * describes the *control session* whose hooks fire.
   */
  policyKey?: string; /** Explicit conversation type for policy resolution when a session key is generic. */
  conversationType?: SilentReplyConversationType;
  /**
   * Caller-declared destination conversation kind for metadata-only audit
   * projection. Never derived from session-key parsing: policy keys can name
   * an acted-on session that is not the delivery destination, and a wrong
   * "direct" here over-collects under audit.messages="direct".
   */
  conversationKind?: "direct" | "group" | "channel"; /** Active agent id used for workspace-scoped media roots. */
  agentId?: string; /** Originating account id used for requester-scoped group policy resolution. */
  requesterAccountId?: string; /** Originating sender id used for sender-scoped outbound media policy. */
  requesterSenderId?: string; /** Originating sender display name for name-keyed sender policy matching. */
  requesterSenderName?: string; /** Originating sender username for username-keyed sender policy matching. */
  requesterSenderUsername?: string; /** Originating sender E.164 phone number for e164-keyed sender policy matching. */
  requesterSenderE164?: string;
};
//#endregion
//#region src/utils/message-channel-normalize.d.ts
type ChannelId = string & {
  readonly __openclawChannelIdBrand?: never;
};
/** Channel id that can receive outbound messages from the Gateway. */
type DeliverableMessageChannel = ChannelId;
//#endregion
//#region src/infra/outbound/targets.d.ts
/** Deliverable channel id accepted by outbound target resolution. */
type OutboundChannel = DeliverableMessageChannel;
//#endregion
//#region src/infra/outbound/delivery-queue-storage.d.ts
type QueuedRenderedMessageBatchPlan = {
  payloadCount: number;
  textCount: number;
  mediaCount: number;
  voiceCount: number;
  presentationCount: number;
  interactiveCount: number;
  channelDataCount: number;
  items: readonly RenderedMessageBatchPlanItem[];
};
type QueuedReplyPayloadSendingHook = {
  kind: ReplyDispatchKind;
  channel?: string;
  sessionKey?: string;
  runId?: string;
  context: PluginHookReplyPayloadSendingContext;
};
type QueuedDeliveryPayload = {
  channel: Exclude<OutboundChannel, "none">;
  to: string;
  accountId?: string; /** Original queue durability policy when known. */
  queuePolicy?: "required" | "best_effort"; /** Caller preflight explicitly required provider unknown-send reconciliation. */
  requireUnknownSendReconciliation?: boolean; /** Reusable producer intents require one SQLite-fenced platform owner. */
  requiresProducerClaim?: boolean; /** Canonical post-policy payloads; recovery must never rerun modifiers. */
  preparedBatch?: PreparedOutboundBatch; /** @internal Low-level enqueue input; storage immediately canonicalizes it. */
  payloads?: ReplyPayload[]; /** Replayable projection summary captured when the durable send intent is created. */
  renderedBatchPlan?: QueuedRenderedMessageBatchPlan;
  threadId?: string | number | null;
  replyToId?: string | null;
  replyToMode?: ReplyToMode;
  formatting?: OutboundDeliveryFormattingOptions;
  identity?: OutboundIdentity;
  bestEffort?: boolean;
  gifPlayback?: boolean;
  forceDocument?: boolean;
  silent?: boolean;
  mirror?: DeliveryMirror; /** Session context needed to preserve outbound media policy on recovery. */
  session?: OutboundSessionContext; /** Gateway caller scopes at enqueue time, preserved for recovery replay. */
  gatewayClientScopes?: readonly string[]; /** Channel-valid id reserved before enqueue; recovery must reuse it atomically. */
  preparedMessageId?: string; /** Serializable owner state finalized by both live delivery and recovery. */
  deliveryCompletion?: DurableDeliveryCompletion; /** Retain a terminal receipt when the producer may replay this stable intent indefinitely. */
  completionRetention?: DeliveryQueueCompletionRetention; /** One-time pre-D4 provider verdict captured before legacy policy migration. */
  legacyUnknownSendReconciliation?: Exclude<ChannelMessageUnknownSendReconciliationResult, {
    status: "unresolved";
  }>; /** Legacy sent rows lack trustworthy post-policy content for observer replay. */
  legacyPreparedContentUnavailable?: true; /** Producer-specific retry budget; omitted entries use the queue default. */
  maxRetries?: number;
};
type QueuedDelivery = Omit<QueuedDeliveryPayload, "preparedBatch" | "payloads"> & {
  preparedBatch: PreparedOutboundBatch;
  id: string;
  enqueuedAt: number;
  retryCount: number;
  attemptCount: number; /** A recoverable cross-process pre-provider ownership lease. */
  availableAt?: number; /** Fences an active pre-provider lease against reclaimed producer ownership. */
  producerClaimId?: string;
  lastAttemptAt?: number;
  lastError?: string; /** Fences the promoted platform attempt independently of clock precision. */
  platformSendAttemptId?: string;
  platformSendStartedAt?: number; /** Canonical reply target after hooks; null records an intentional root send. */
  effectiveReplyToId?: string | null;
  recoveryState?: "producer_claimed" | "send_attempt_started" | "unknown_after_send";
};
//#endregion
//#region src/infra/outbound/message-sent-hook.d.ts
type MessageSentEvent = {
  success: boolean;
  content: string;
  error?: string;
  messageId?: string;
};
//#endregion
export { QueuedReplyPayloadSendingHook as a, PreparedOutboundBatch as c, DeliveryQueueCompletionRetention as d, PluginSubagentRequesterContext as f, QueuedRenderedMessageBatchPlan as i, DeliveryMirror as l, QueuedDelivery as n, OutboundChannel as o, QueuedDeliveryPayload as r, OutboundSessionContext as s, MessageSentEvent as t, DurableDeliveryCompletion as u };