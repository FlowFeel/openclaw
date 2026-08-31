/**
 * session-usage-accumulator.ts — Phosphene Monotonic Usage Accumulator (CAP-GAUGE-01)
 *
 * Implements Axiom G1 (Monotonic Accumulator), Axiom G2 (Signal vs Noise Distinction),
 * and Axiom G4 (Explicit Reset Boundary).
 *
 * Prevents usage gauge from dropping to zero during fallback / timeout turns where
 * provider metadata is omitted, ensuring compaction and circuit breakers fire on
 * true monotonic state.
 *
 * @dft
 */

export interface SessionUsageRecord {
  readonly usedTokens: number;
  readonly confidence: "live" | "stale" | "none";
  readonly isStale: boolean;
  readonly lastUpdated: number;
  readonly observationCount: number;
}

const MAX_SESSION_ENTRIES = 4_096;
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1_000; // 24 hours

const sessionUsageStore = new Map<string, SessionUsageRecord>();

/**
 * Records an observed token usage for a session and returns the monotonic accumulation.
 */
export function recordMonotonicSessionUsage(params: {
  sessionId?: string;
  sampleTokens?: number;
  now?: number;
}): SessionUsageRecord {
  const now = params.now ?? Date.now();
  const sessionId = params.sessionId?.trim();

  const sample =
    typeof params.sampleTokens === "number" &&
    Number.isFinite(params.sampleTokens) &&
    params.sampleTokens > 0
      ? Math.round(params.sampleTokens)
      : undefined;

  if (!sessionId) {
    if (sample !== undefined) {
      return {
        usedTokens: sample,
        confidence: "live",
        isStale: false,
        lastUpdated: now,
        observationCount: 1,
      };
    }
    return {
      usedTokens: 0,
      confidence: "none",
      isStale: false,
      lastUpdated: now,
      observationCount: 0,
    };
  }

  const existing = sessionUsageStore.get(sessionId);

  if (sample !== undefined) {
    const nextUsed = existing ? Math.max(existing.usedTokens, sample) : sample;
    const nextRecord: SessionUsageRecord = {
      usedTokens: nextUsed,
      confidence: "live",
      isStale: false,
      lastUpdated: now,
      observationCount: (existing?.observationCount ?? 0) + 1,
    };

    if (sessionUsageStore.size >= MAX_SESSION_ENTRIES && !sessionUsageStore.has(sessionId)) {
      const oldestKey = sessionUsageStore.keys().next().value;
      if (oldestKey) {
        sessionUsageStore.delete(oldestKey);
      }
    }

    sessionUsageStore.set(sessionId, nextRecord);
    return nextRecord;
  }

  // Sample is missing or 0: evaluate fallback / stale behavior
  if (existing && existing.usedTokens > 0) {
    const staleRecord: SessionUsageRecord = {
      usedTokens: existing.usedTokens,
      confidence: "stale",
      isStale: true,
      lastUpdated: existing.lastUpdated,
      observationCount: existing.observationCount,
    };
    return staleRecord;
  }

  return {
    usedTokens: 0,
    confidence: "none",
    isStale: false,
    lastUpdated: now,
    observationCount: 0,
  };
}

/**
 * Explicitly resets the monotonic usage record for a given session.
 */
export function resetMonotonicSessionUsage(sessionId?: string): void {
  if (!sessionId) return;
  sessionUsageStore.delete(sessionId.trim());
}

/**
 * Retrieves the current monotonic usage record without modifying it.
 */
export function getMonotonicSessionUsage(sessionId?: string): SessionUsageRecord | undefined {
  if (!sessionId) return undefined;
  return sessionUsageStore.get(sessionId.trim());
}

/**
 * Clears all stored sessions (primarily for testing).
 */
export function clearAllSessionUsageForTest(): void {
  sessionUsageStore.clear();
}
