/**
 * Lock-Free In-Memory Circular Attribution Ring Buffer (N=1,000).
 * Goldilocks decomposition unit (< 150 LOC).
 * 
 * Satisfies B1 (Vacuum), B2 (Nominal), and B6 (FIFO wrap-around closure).
 */

import type {
  ConcurrencySnapshot,
  ConcurrencyTimeSeriesPoint,
  FleetCacheSummary,
  SessionPerformanceBreakdown,
  TurnLatencyRecord,
} from "./types.js";

export class AttributionRingBuffer {
  private readonly capacity: number;
  private readonly buffer: (TurnLatencyRecord | null)[];
  private head = 0;
  private count = 0;

  constructor(capacity = 1000) {
    this.capacity = Math.max(10, capacity);
    this.buffer = new Array(this.capacity).fill(null);
  }

  /**
   * O(1) Append turn record into the ring buffer.
   */
  public recordTurn(record: TurnLatencyRecord): void {
    this.buffer[this.head] = record;
    this.head = (this.head + 1) % this.capacity;
    if (this.count < this.capacity) {
      this.count++;
    }
  }

  /**
   * Returns records in chronological order matching optional filter criteria.
   */
  public querySlice(options?: {
    sessionKey?: string;
    windowMinutes?: number;
    limit?: number;
  }): { records: TurnLatencyRecord[]; totalSampled: number } {
    if (this.count === 0) {
      return { records: [], totalSampled: 0 };
    }

    const now = Date.now();
    const windowMs = (options?.windowMinutes ?? 60) * 60 * 1000;
    const minTimestamp = now - windowMs;
    const limit = options?.limit ?? this.capacity;

    const results: TurnLatencyRecord[] = [];
    const startIndex = (this.head - this.count + this.capacity) % this.capacity;

    for (let i = 0; i < this.count; i++) {
      const idx = (startIndex + i) % this.capacity;
      const record = this.buffer[idx];
      if (!record) continue;

      if (record.timestamp < minTimestamp) continue;
      if (options?.sessionKey && record.sessionKey !== options.sessionKey) continue;

      results.push(record);
      if (results.length >= limit) break;
    }

    return { records: results, totalSampled: this.count };
  }

  /**
   * Calculates Mean Queue Dwell (ms).
   */
  public getMeanQueueDwellMs(): number {
    if (this.count === 0) return 0;
    let totalDwell = 0;
    let validCount = 0;

    for (const r of this.buffer) {
      if (r) {
        totalDwell += r.queueDwellMs;
        validCount++;
      }
    }
    return validCount > 0 ? Math.round(totalDwell / validCount) : 0;
  }

  /**
   * Discretizes the historical window into 1-minute time-series buckets.
   */
  public getConcurrencyTimeSeries(options?: { windowMinutes?: number; nowMs?: number } | number): ConcurrencyTimeSeriesPoint[] {
    const windowMinutes = typeof options === "number" ? options : options?.windowMinutes ?? 15;
    const { records } = this.querySlice({ windowMinutes });
    if (records.length === 0) return [];

    const bucketMs = 60 * 1000;
    const buckets = new Map<number, { sessionKeys: Set<string>; dwells: number[]; count: number }>();

    for (const r of records) {
      const bucketKey = Math.floor(r.timestamp / bucketMs) * bucketMs;
      const b = buckets.get(bucketKey) ?? { sessionKeys: new Set(), dwells: [], count: 0 };
      b.sessionKeys.add(r.sessionKey);
      b.dwells.push(r.queueDwellMs);
      b.count++;
      buckets.set(bucketKey, b);
    }

    return Array.from(buckets.entries())
      .sort(([a], [b]) => a - b)
      .map(([timestamp, data]) => ({
        timestamp,
        activeSessions: data.sessionKeys.size,
        inFlightTurns: data.count,
        meanQueueDwellMs: data.dwells.length > 0 ? Math.round(data.dwells.reduce((a, b) => a + b, 0) / data.dwells.length) : 0,
      }));
  }

  /**
   * Aggregates turn latency and token throughput per session.
   */
  public getSessionPerformanceBreakdown(windowMinutes = 60): SessionPerformanceBreakdown[] {
    const { records } = this.querySlice({ windowMinutes });
    if (records.length === 0) return [];

    const sessions = new Map<string, TurnLatencyRecord[]>();
    for (const r of records) {
      const list = sessions.get(r.sessionKey) ?? [];
      list.push(r);
      sessions.set(r.sessionKey, list);
    }

    const breakdowns: SessionPerformanceBreakdown[] = Array.from(sessions.entries()).map(([sessionKey, items]) => {
      const latencies = items.map((r) => r.wallClockMs).sort((a, b) => a - b);
      const meanLatencyMs = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
      const p95Idx = Math.min(latencies.length - 1, Math.floor(latencies.length * 0.95));
      const p95LatencyMs = latencies[p95Idx] ?? 0;
      const cacheHits = items.filter((r) => r.cacheHit).length;
      const compactionEvents = items.filter((r) => r.compactionFired).length;
      const totalTokens = items.reduce((acc, r) => acc + r.totalTokens, 0);
      const promptTokens = items.reduce((acc, r) => acc + r.promptTokens, 0);
      const completionTokens = items.reduce((acc, r) => acc + r.completionTokens, 0);

      return {
        sessionKey,
        turnCount: items.length,
        meanLatencyMs,
        p95LatencyMs,
        cacheHitRatio: Math.round((cacheHits / items.length) * 100) / 100,
        totalTokens,
        promptTokens,
        completionTokens,
        compactionEvents,
      };
    });

    return breakdowns.sort((a, b) => b.turnCount - a.turnCount);
  }

  /**
   * Calculates Fleet Concurrency Snapshot.
   */
  public getConcurrencySnapshot(): ConcurrencySnapshot {
    const { records } = this.querySlice({ windowMinutes: 15 });
    const timeSeries = this.getConcurrencyTimeSeries(15);
    if (records.length === 0) {
      return {
        activeSessions: 0,
        meanQueueDwellMs: 0,
        p95QueueDwellMs: 0,
        contentionDragIndex: 1.0,
        timeSeries,
      };
    }

    const sessionKeys = new Set(records.map((r) => r.sessionKey));
    const dwells = records.map((r) => r.queueDwellMs).sort((a, b) => a - b);
    const meanDwell = Math.round(dwells.reduce((a, b) => a + b, 0) / dwells.length);
    const p95Index = Math.min(dwells.length - 1, Math.floor(dwells.length * 0.95));
    const p95Dwell = dwells[p95Index] ?? 0;
    const contentionDragIndex = Math.max(1.0, parseFloat((1.0 + p95Dwell / 50).toFixed(2)));

    return {
      activeSessions: sessionKeys.size,
      meanQueueDwellMs: meanDwell,
      p95QueueDwellMs: p95Dwell,
      contentionDragIndex,
      timeSeries,
    };
  }

  /**
   * Calculates Fleet Cache Efficiency Summary.
   */
  public getFleetCacheSummary(): FleetCacheSummary {
    const { records } = this.querySlice({ windowMinutes: 60 });
    if (records.length === 0) {
      return {
        fleetPromptCacheHitRatio: 0.0,
        totalTurnsSampled: 0,
        meanIncrementalTokenCost: 0,
        classification: "MODERATE_REUSE",
      };
    }

    const hits = records.filter((r) => r.cacheHit).length;
    const ratio = parseFloat((hits / records.length).toFixed(2));
    const totalTokens = records.reduce((sum, r) => sum + r.totalTokens, 0);
    const meanTokens = Math.round(totalTokens / records.length);

    let classification: FleetCacheSummary["classification"] = "MODERATE_REUSE";
    if (ratio >= 0.7) classification = "HIGH_REUSE";
    else if (ratio < 0.3) classification = "COLD_INFERENCE_HEAVY";

    return {
      fleetPromptCacheHitRatio: ratio,
      totalTurnsSampled: records.length,
      meanIncrementalTokenCost: meanTokens,
      classification,
    };
  }
}

// Export singleton instance for platform-wide turn attribution
export const globalAttributionRing = new AttributionRingBuffer(1000);

