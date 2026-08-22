import { updateSessionEntry } from "./session-accessor.js";
import type { AmbientTranscriptWatermark, SessionEntry } from "./types.js";

export type AmbientTranscriptWatermarkScope = {
  channel: string;
  accountId?: string;
  conversationId: string;
  threadId?: string | number;
};

export function resolveAmbientTranscriptWatermarkKey(
  scope: AmbientTranscriptWatermarkScope,
): string {
  // Structured, delimiter-joined key (stable across encode/decode) rather than
  // a JSON.stringify composite. Human-inspectable and server-neutral.
  return [
    "wat",
    scope.channel,
    scope.accountId ?? "",
    scope.conversationId,
    scope.threadId === undefined ? "" : String(scope.threadId),
  ].join(":");
}

/**
 * Legacy JSON-composite key used before SL-14. Retained so pre-migration
 * persisted watermarks (written under the JSON key) are still honored until
 * they are overwritten under the new structured key.
 */
export function resolveAmbientTranscriptWatermarkLegacyKey(
  scope: AmbientTranscriptWatermarkScope,
): string {
  return JSON.stringify([
    scope.channel,
    scope.accountId ?? "",
    scope.conversationId,
    scope.threadId === undefined ? "" : String(scope.threadId),
  ]);
}

function numericMessageId(value: string): number | undefined {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function isAmbientTranscriptWatermarkAfter(
  next: Pick<AmbientTranscriptWatermark, "messageId" | "timestampMs">,
  current: AmbientTranscriptWatermark | undefined,
): boolean {
  if (!current) {
    return true;
  }
  if (next.timestampMs !== undefined && current.timestampMs !== undefined) {
    if (next.timestampMs !== current.timestampMs) {
      return next.timestampMs > current.timestampMs;
    }
    const nextMessageId = numericMessageId(next.messageId);
    const currentMessageId = numericMessageId(current.messageId);
    return (
      nextMessageId !== undefined &&
      currentMessageId !== undefined &&
      nextMessageId > currentMessageId
    );
  }
  const nextMessageId = numericMessageId(next.messageId);
  const currentMessageId = numericMessageId(current.messageId);
  if (nextMessageId !== undefined && currentMessageId !== undefined) {
    return nextMessageId > currentMessageId;
  }
  return next.messageId !== current.messageId;
}

export function readAmbientTranscriptWatermark(
  entry: Pick<SessionEntry, "ambientTranscriptWatermarks" | "sessionId"> | undefined,
  key: string,
  legacyKey?: string,
): AmbientTranscriptWatermark | undefined {
  if (!entry) {
    return undefined;
  }
  const watermarks = entry.ambientTranscriptWatermarks;
  if (!watermarks) {
    return undefined;
  }
  // A watermark only vouches for rows in the transcript it was written against.
  // After a session reset those rows live in an archived file the model never
  // reads, so a cross-session (or legacy sessionId-less) watermark must not hide them.
  const matching = (candidate: AmbientTranscriptWatermark | undefined) =>
    candidate?.sessionId === entry.sessionId ? candidate : undefined;
  const preferred = matching(watermarks[key]);
  if (preferred) {
    return preferred;
  }
  // Migration: honor a pre-SL-14 watermark written under the legacy JSON key
  // only while the new structured key has no watermark for this session yet.
  if (legacyKey && legacyKey !== key) {
    return matching(watermarks[legacyKey]);
  }
  return undefined;
}

export async function updateAmbientTranscriptWatermark(params: {
  storePath: string;
  sessionKey: string;
  key: string;
  /** Alternative key to consult for the current value (pre-SL-14 migration). */
  legacyKey?: string;
  messageId: string;
  timestampMs?: number;
  expectedSessionId?: string;
}): Promise<SessionEntry | null> {
  return await updateSessionEntry(
    {
      storePath: params.storePath,
      sessionKey: params.sessionKey,
    },
    (entry) => {
      // onMessagePersisted fires after the durable row write; if the session was
      // reset in between, stamping the new sessionId would hide rows that only
      // exist in the archived transcript. Skip the advance instead.
      if (!entry.sessionId) {
        return null;
      }
      if (params.expectedSessionId !== undefined && entry.sessionId !== params.expectedSessionId) {
        return null;
      }
      const current = readAmbientTranscriptWatermark(entry, params.key, params.legacyKey);
      if (
        !isAmbientTranscriptWatermarkAfter(
          { messageId: params.messageId, timestampMs: params.timestampMs },
          current,
        )
      ) {
        return null;
      }
      return {
        ambientTranscriptWatermarks: {
          ...entry.ambientTranscriptWatermarks,
          [params.key]: {
            sessionId: entry.sessionId,
            messageId: params.messageId,
            ...(params.timestampMs !== undefined ? { timestampMs: params.timestampMs } : {}),
            updatedAt: Date.now(),
          },
        },
      };
    },
    {
      skipMaintenance: true,
      takeCacheOwnership: true,
    },
  );
}
