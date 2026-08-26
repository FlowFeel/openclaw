/**
 * Pure Queue Ingress vs Worker Pickup Dwell Tracker.
 * Goldilocks decomposition unit (< 100 LOC).
 * 
 * Satisfies B2 (Nominal Dwell <= 15ms) and B4 (Contention Saturation Dwell >= 120ms).
 */

import type { QueueDwellRecord } from "./types.js";

const pendingQueueStamps = new Map<string, { sessionKey: string; enqueuedAt: number }>();

/**
 * Records message enqueue timestamp at gateway ingress boundary.
 */
export function stampMessageEnqueue(messageId: string, sessionKey: string): void {
  pendingQueueStamps.set(messageId, {
    sessionKey,
    enqueuedAt: Date.now(),
  });
}

/**
 * Calculates pure queue dwell time when worker picks up message from queue.
 */
export function stampMessageDequeue(messageId: string, explicitDequeueTimeMs?: number): QueueDwellRecord | null {
  const entry = pendingQueueStamps.get(messageId);
  if (!entry) return null;

  pendingQueueStamps.delete(messageId);
  const dequeuedAt = explicitDequeueTimeMs ?? Date.now();
  const queueDwellMs = Math.max(0, dequeuedAt - entry.enqueuedAt);

  return {
    messageId,
    sessionKey: entry.sessionKey,
    enqueuedAt: entry.enqueuedAt,
    dequeuedAt,
    queueDwellMs,
  };
}

/**
 * Returns current pending queue depth count.
 */
export function getPendingQueueDepth(): number {
  return pendingQueueStamps.size;
}

export function clearPendingQueueStamps(): void {
  pendingQueueStamps.clear();
}
