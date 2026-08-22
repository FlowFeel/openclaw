import { Ut as SessionMaintenanceMode, n as OpenClawConfig } from "./types.openclaw-B-6RRL7F.js";
//#region src/config/sessions/store-maintenance.d.ts
type ResolvedSessionMaintenanceConfig = {
  mode: SessionMaintenanceMode;
  pruneAfterMs: number;
  maxEntries: number;
  modelRunPruneAfterMs: number;
  resetArchiveRetentionMs: number | null;
  maxDiskBytes: number | null;
  highWaterBytes: number | null;
};
type ResolvedSessionMaintenanceConfigInput = Omit<ResolvedSessionMaintenanceConfig, "modelRunPruneAfterMs"> & Partial<Pick<ResolvedSessionMaintenanceConfig, "modelRunPruneAfterMs">>;
//#endregion
//#region src/sessions/transcript-events.d.ts
/** Storage-neutral identity for the session transcript that changed. */
type SessionTranscriptUpdateTarget = {
  agentId: string;
  sessionId: string;
  sessionKey: string;
  storePath?: string;
};
type SessionTranscriptUpdateFields = {
  sessionFile?: string;
  target?: SessionTranscriptUpdateTarget;
  sessionKey?: string;
  agentId?: string;
  sessionId?: string; /** Committed lifecycle owner; internal delivery must not expose it publicly. */
  lifecycleRevision?: string;
  message?: unknown;
  messageId?: string;
  messageSeq?: number;
};
/** Normalized transcript update emitted after a session transcript changes. */
type SessionTranscriptUpdate = Omit<SessionTranscriptUpdateFields, "sessionFile" | "lifecycleRevision" | "target"> & {
  target: Omit<SessionTranscriptUpdateTarget, "storePath">;
};
type SessionTranscriptListener = (update: SessionTranscriptUpdate) => void;
/** Registers a listener for normalized session transcript updates. */
declare function onSessionTranscriptUpdate(listener: SessionTranscriptListener): () => void;
//#endregion
//#region src/config/sessions/session-accessor.types.d.ts
/** Raw transcript record for non-message events; message records use appendTranscriptMessage. */
type TranscriptEvent = unknown;
type SessionTranscriptEventRow = {
  event: TranscriptEvent;
  seq: number;
};
/** Count, byte, and continuation bounds for one raw transcript page. */
type SessionTranscriptRawDeltaLimits = {
  /** Opaque cursor returned by a prior page or reset result. */cursor?: string; /** Maximum serialized JSONL bytes returned by this page. */
  maxBytes?: number; /** Maximum number of events returned by this page. */
  maxEvents?: number;
};
/** Generation-aware outcome for one bounded raw transcript read. */
type SessionTranscriptRawDeltaResult = {
  kind: "page"; /** Cursor positioned after the last returned event. */
  cursor: string; /** Ordered raw transcript events selected for this page. */
  events: SessionTranscriptEventRow[]; /** True when another event remains after this page. */
  hasMore: boolean; /** First unread event size when it cannot fit under maxBytes. */
  requiredBytes?: number; /** Stored JSONL bytes represented by events. */
  serializedBytes: number;
} | {
  kind: "reset"; /** Fresh bootstrap cursor for the current generation. */
  cursor: string; /** Stable discontinuity that invalidated the supplied cursor. */
  reason: "generation_mismatch" | "invalid_cursor" | "scope_mismatch";
} | {
  kind: "missing";
};
/** Count, byte, and continuation bounds for one visible-message page. */
type SessionTranscriptVisibleMessageDeltaLimits = {
  /** Opaque continuation cursor; store and return it unchanged. */cursor?: string; /** Maximum serialized JSONL bytes returned by this page. */
  maxBytes?: number; /** Maximum number of visible messages returned by this page. */
  maxMessages?: number;
};
type TranscriptMessageAppendOptions<TMessage> = {
  /** Rebase a stale explicit parent when the current tail still descends from it. */appendIntent?: "active-branch"; /** Runtime config used for message redaction and transcript header metadata. */
  config?: OpenClawConfig; /** Working directory recorded in a newly created transcript header. */
  cwd?: string; /** How duplicate message idempotency keys are detected before append. */
  idempotencyLookup?: "scan" | "scan-assistant" | "caller-checked"; /** Provider/channel message payload to persist. */
  message: TMessage; /** Testable timestamp override for the generated transcript entry. */
  now?: number; /** Existing transcript event id owned by a caller with its own session tree. */
  eventId?: string; /** Existing parent id owned by a caller with its own session tree. */
  parentId?: string | null; /** Optional finalizer that runs after duplicate detection but before persistence. */
  prepareMessageAfterIdempotencyCheck?: (message: TMessage) => TMessage | undefined; /** Allow append without parent-link migration for large legacy linear transcripts. */
  useRawWhenLinear?: boolean;
};
type TranscriptMessageAppendResult<TMessage> = {
  /** False when idempotency lookup found an existing transcript message. */appended: boolean; /** Redacted message payload as persisted or replayed from the transcript. */
  message: TMessage; /** Existing or newly generated transcript message id. */
  messageId: string; /** Parent id actually used by the durable transcript append. */
  effectiveParentId?: string | null;
};
/** Transcript update fields supplied by callers; the target is resolved here. */
type TranscriptUpdatePayload = Partial<SessionTranscriptUpdate>;
interface SessionTranscriptRuntimeTarget {
  agentId: string;
  sessionId: string;
  sessionKey: string;
  storePath: string;
}
//#endregion
export { TranscriptMessageAppendOptions as a, onSessionTranscriptUpdate as c, SessionTranscriptVisibleMessageDeltaLimits as i, ResolvedSessionMaintenanceConfigInput as l, SessionTranscriptRawDeltaResult as n, TranscriptMessageAppendResult as o, SessionTranscriptRuntimeTarget as r, TranscriptUpdatePayload as s, SessionTranscriptRawDeltaLimits as t };