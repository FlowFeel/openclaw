import type { ChannelQueueDepthRecord, QueueDwellRecord } from "./types.js";

interface PendingQueueEntry {
  channelId: string;
  sessionKey: string;
  enqueuedAt: number;
}

const pendingQueueStamps = new Map<string, PendingQueueEntry>();
const channelIngressHistory = new Map<string, number[]>();

/**
 * Records message enqueue timestamp and channel at gateway ingress boundary.
 */
export function stampChannelEnqueue(messageId: string, channelId: string, sessionKey: string): void {
  const now = Date.now();
  pendingQueueStamps.set(messageId, {
    channelId,
    sessionKey,
    enqueuedAt: now,
  });

  const history = channelIngressHistory.get(channelId) ?? [];
  history.push(now);
  // Keep last 100 timestamps
  if (history.length > 100) history.shift();
  channelIngressHistory.set(channelId, history);
}

/**
 * Records message enqueue timestamp at gateway ingress boundary (default channel).
 */
export function stampMessageEnqueue(messageId: string, sessionKey: string): void {
  stampChannelEnqueue(messageId, "default", sessionKey);
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
 * Returns current pending queue depth count across all channels.
 */
export function getPendingQueueDepth(): number {
  return pendingQueueStamps.size;
}

/**
 * Returns real-time per-channel queue depths and ingress rates.
 */
export function getChannelQueueDepths(): ChannelQueueDepthRecord[] {
  const channelDepths = new Map<string, { pending: number; lastEnqueuedAt: number }>();

  for (const entry of pendingQueueStamps.values()) {
    const ch = channelDepths.get(entry.channelId) ?? { pending: 0, lastEnqueuedAt: 0 };
    ch.pending++;
    if (entry.enqueuedAt > ch.lastEnqueuedAt) {
      ch.lastEnqueuedAt = entry.enqueuedAt;
    }
    channelDepths.set(entry.channelId, ch);
  }

  const now = Date.now();
  const oneMinAgo = now - 60 * 1000;
  const results: ChannelQueueDepthRecord[] = [];

  const allChannels = new Set([...channelDepths.keys(), ...channelIngressHistory.keys()]);
  for (const chId of allChannels) {
    const depthInfo = channelDepths.get(chId) ?? { pending: 0, lastEnqueuedAt: 0 };
    const history = channelIngressHistory.get(chId) ?? [];
    const recentCount = history.filter((t) => t >= oneMinAgo).length;

    results.push({
      channelId: chId,
      pendingMessages: depthInfo.pending,
      ingressRatePerMin: recentCount,
      lastEnqueuedAt: depthInfo.lastEnqueuedAt,
    });
  }

  return results.sort((a, b) => b.pendingMessages - a.pendingMessages);
}

export function clearPendingQueueStamps(): void {
  pendingQueueStamps.clear();
  channelIngressHistory.clear();
}
