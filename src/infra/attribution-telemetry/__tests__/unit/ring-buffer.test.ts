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

  it("calculates discrete concurrency time-series buckets", () => {
    const ring = new AttributionRingBuffer(100);
    const baseTime = Math.floor(Date.now() / 60000) * 60000;

    ring.recordTurn({
      id: "t1",
      sessionKey: "s1",
      timestamp: baseTime + 1000,
      promptTokens: 100,
      completionTokens: 50,
      totalTokens: 150,
      wallClockMs: 200,
      queueDwellMs: 10,
      modelInferenceMs: 190,
      cacheHit: true,
    });
    ring.recordTurn({
      id: "t2",
      sessionKey: "s2",
      timestamp: baseTime + 5000,
      promptTokens: 200,
      completionTokens: 50,
      totalTokens: 250,
      wallClockMs: 300,
      queueDwellMs: 20,
      modelInferenceMs: 280,
      cacheHit: false,
    });

    const timeSeries = ring.getConcurrencyTimeSeries(15);
    expect(timeSeries.length).toBe(1);
    expect(timeSeries[0]!.activeSessions).toBe(2);
    expect(timeSeries[0]!.inFlightTurns).toBe(2);
    expect(timeSeries[0]!.meanQueueDwellMs).toBe(15);
  });

  it("computes multi-session performance breakdown", () => {
    const ring = new AttributionRingBuffer(100);
    const now = Date.now();

    ring.recordTurn({
      id: "t1",
      sessionKey: "session_A",
      timestamp: now,
      promptTokens: 1000,
      completionTokens: 200,
      totalTokens: 1200,
      wallClockMs: 400,
      queueDwellMs: 10,
      modelInferenceMs: 390,
      cacheHit: true,
      compactionFired: true,
    });
    ring.recordTurn({
      id: "t2",
      sessionKey: "session_A",
      timestamp: now + 1000,
      promptTokens: 1500,
      completionTokens: 300,
      totalTokens: 1800,
      wallClockMs: 600,
      queueDwellMs: 15,
      modelInferenceMs: 585,
      cacheHit: true,
      compactionFired: false,
    });
    ring.recordTurn({
      id: "t3",
      sessionKey: "session_B",
      timestamp: now + 2000,
      promptTokens: 800,
      completionTokens: 100,
      totalTokens: 900,
      wallClockMs: 300,
      queueDwellMs: 5,
      modelInferenceMs: 295,
      cacheHit: false,
      compactionFired: false,
    });

    const breakdown = ring.getSessionPerformanceBreakdown(60);
    expect(breakdown.length).toBe(2);

    const sessA = breakdown.find((s) => s.sessionKey === "session_A");
    expect(sessA).toBeDefined();
    expect(sessA!.turnCount).toBe(2);
    expect(sessA!.meanLatencyMs).toBe(500);
    expect(sessA!.cacheHitRatio).toBe(1.0);
    expect(sessA!.totalTokens).toBe(3000);
    expect(sessA!.compactionEvents).toBe(1);

    const sessB = breakdown.find((s) => s.sessionKey === "session_B");
    expect(sessB).toBeDefined();
    expect(sessB!.turnCount).toBe(1);
    expect(sessB!.cacheHitRatio).toBe(0.0);
    expect(sessB!.compactionEvents).toBe(0);
  });
});

describe("Queue Dwell & Channel Depths", () => {
  it("tracks per-channel queue depths and ingress rates", async () => {
    const { stampChannelEnqueue, getChannelQueueDepths, stampMessageDequeue, clearPendingQueueStamps } = await import(
      "../../queue-dwell-tracker.js"
    );
    clearPendingQueueStamps();

    stampChannelEnqueue("msg_discord_1", "discord", "sess_disc");
    stampChannelEnqueue("msg_discord_2", "discord", "sess_disc");
    stampChannelEnqueue("msg_telegram_1", "telegram", "sess_tg");

    const depths = getChannelQueueDepths();
    expect(depths.length).toBe(2);

    const discord = depths.find((d) => d.channelId === "discord");
    expect(discord).toBeDefined();
    expect(discord!.pendingMessages).toBe(2);
    expect(discord!.ingressRatePerMin).toBe(2);

    const telegram = depths.find((d) => d.channelId === "telegram");
    expect(telegram).toBeDefined();
    expect(telegram!.pendingMessages).toBe(1);

    const dequeued = stampMessageDequeue("msg_discord_1");
    expect(dequeued).not.toBeNull();
    expect(dequeued!.sessionKey).toBe("sess_disc");

    const after = getChannelQueueDepths();
    const discordAfter = after.find((d) => d.channelId === "discord");
    expect(discordAfter!.pendingMessages).toBe(1);
  });
});
