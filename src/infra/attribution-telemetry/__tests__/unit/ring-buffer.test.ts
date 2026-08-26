/**
 * Tier 1 Unit Tests: Attribution Ring Buffer & FIFO Eviction.
 * 
 * Verifies B1 (Vacuum) and B6 (Ring Saturation / FIFO Wrap).
 */

import { describe, expect, it } from "vitest";
import { AttributionRingBuffer } from "../../attribution-ring.js";

describe("AttributionRingBuffer (Tier 1 Unit)", () => {
  it("satisfies B1 Vacuum state with safe defaults", () => {
    const ring = new AttributionRingBuffer(100);
    const slice = ring.querySlice();
    expect(slice.records).toEqual([]);
    expect(slice.totalSampled).toBe(0);
    expect(ring.getMeanQueueDwellMs()).toBe(0);

    const concurrency = ring.getConcurrencySnapshot();
    expect(concurrency.activeSessions).toBe(0);
    expect(concurrency.contentionDragIndex).toBe(1.0);

    const cache = ring.getFleetCacheSummary();
    expect(cache.fleetPromptCacheHitRatio).toBe(0);
    expect(cache.classification).toBe("MODERATE_REUSE");
  });

  it("satisfies B6 Ring Saturation FIFO Closure without memory leaks", () => {
    const ring = new AttributionRingBuffer(50);

    for (let i = 0; i < 75; i++) {
      ring.recordTurn({
        id: `turn_${i}`,
        sessionKey: `session_${i % 3}`,
        timestamp: Date.now() + i * 1000,
        promptTokens: 500,
        completionTokens: 200,
        totalTokens: 700,
        wallClockMs: 800,
        queueDwellMs: 25,
        modelInferenceMs: 775,
        cacheHit: i % 2 === 0,
      });
    }

    const slice = ring.querySlice({ limit: 100 });
    expect(slice.records.length).toBe(50);
    expect(slice.records[0]!.id).toBe("turn_25"); // Oldest 25 dropped
    expect(slice.records[49]!.id).toBe("turn_74");
  });
});
