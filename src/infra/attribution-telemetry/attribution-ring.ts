/**
 * Lock-Free In-Memory Circular Attribution Ring Buffer (N=1,000).
 * Goldilocks decomposition unit (< 150 LOC).
 * 
 * Satisfies B1 (Vacuum), B2 (Nominal), and B6 (FIFO wrap-around closure).
 */

import type { ConcurrencySnapshot, FleetCacheSummary, TurnLatencyRecord } from "./types.js";

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
   * Calculates Fleet Concurrency Snapshot.
   */
  public getConcurrencySnapshot(): ConcurrencySnapshot {
    const { records } = this.querySlice({ windowMinutes: 15 });
    if (records.length === 0) {
      return {
        activeSessions: 0,
        meanQueueDwellMs: 0,
        p95QueueDwellMs: 0,
        contentionDragIndex: 1.0,
      };
    }

    const sessionKeys = new Set(records.map((r) => r.sessionKey));
    const dwells = records.map((r) => r.queueDwellMs).sort((a, b) => a - b);
    const meanDwell = Math.round(dwells.reduce((a, b) => a + b, 0) / dwells.length);
    const p95Index = Math.min(dwells.length - 1, Math.floor(dwells.length * 0.95));
    const p95Dwell = dwells[p95Index] ?? 0;

    // Contention index: baseline 1.0; scales up when p95 dwell exceeds 30ms
    const contentionDragIndex = Math.max(1.0, parseFloat((1.0 + p95Dwell / 50).toFixed(2)));

    return {
      activeSessions: sessionKeys.size,
      meanQueueDwellMs: meanDwell,
      p95QueueDwellMs: p95Dwell,
      contentionDragIndex,
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
