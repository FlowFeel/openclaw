import { describe, it, expect, beforeEach } from "vitest";
import {
  createTokenomicsEngine,
  TokenomicsEngine,
  TurnMessage,
  ContextItem,
  MAX_OSR_LIMIT,
} from "./index.js";

describe("Degree 2: Shannon-Weaver Tokenomics BDD Behavioral Scenarios", () => {
  let engine: TokenomicsEngine;
  let mockClock: { now: () => number };
  let currentTime: number;

  beforeEach(() => {
    currentTime = 1724500000000;
    mockClock = { now: () => currentTime };
    engine = createTokenomicsEngine({ clock: mockClock });
  });

  it("Scenario 1: Agent detects SNR degradation during heartbeat flood", () => {
    // Given a clean session context
    const cleanTurns: TurnMessage[] = [
      { role: "system", content: "System instructions for agent." },
      { role: "user", content: "We must implement rate-distortion balance." },
      { role: "assistant", content: "Rate-distortion balances token compression and epistemic loss." },
    ];

    const cleanReport = engine.calculateSNR(cleanTurns);
    expect(cleanReport.snrPercent).toBeGreaterThanOrEqual(70);
    expect(cleanReport.isAdequate).toBe(true);

    // When 8 consecutive heartbeats flood the channel
    const floodedTurns: TurnMessage[] = [
      ...cleanTurns,
      ...Array(8).fill({ role: "assistant" as const, content: "heartbeat: status ok", tokens: 25 }),
    ];

    // Then SNR drops to critical (< 50%) and flags compaction recommendation
    const floodedReport = engine.calculateSNR(floodedTurns);
    expect(floodedReport.snrPercent).toBeLessThan(50);
    expect(floodedReport.tier).toBe("critical");
    expect(floodedReport.isAdequate).toBe(false);
    expect(floodedReport.recommendation).toContain("Severe noise pollution");
  });

  it("Scenario 2: Compaction improves SNR monotonically", () => {
    // Given a noisy pre-compaction transcript
    const noisyTurns: TurnMessage[] = [
      { role: "user", content: "Discuss roadmap." },
      { role: "assistant", content: "heartbeat", tokens: 100 },
      { role: "assistant", content: "heartbeat", tokens: 100 },
      { role: "assistant", content: "heartbeat", tokens: 100 },
      { role: "assistant", content: "let me clarify: use SQLite coordinates.", tokens: 50 },
      { role: "assistant", content: "got it.", tokens: 20 },
    ];

    const before = engine.calculateSNR(noisyTurns);

    // When compaction executes into structured artifact + last 2 turns
    const compactedTurns: TurnMessage[] = [
      { role: "system", content: "## Summary\nDecided on SQLite coordinates.", tokens: 40 },
      { role: "user", content: "Implement map_read.", tokens: 10 },
      { role: "assistant", content: "map_read implemented with certified arity k <= 2.", tokens: 20 },
    ];

    const after = engine.calculateSNR(compactedTurns);

    // Then SNR improves monotonically
    expect(after.snrPercent).toBeGreaterThanOrEqual(before.snrPercent);

    // And yield report proves the improvement
    const yieldReport = engine.evaluateYield({
      tokensBefore: before.totalTokens,
      tokensAfter: after.totalTokens,
      snrBefore: before.snrPercent,
      snrAfter: after.snrPercent,
    });

    expect(yieldReport.snrDeltaPoints).toBeGreaterThanOrEqual(0);
    expect(yieldReport.tokenReductionPercent).toBeGreaterThan(0);
  });

  it("Scenario 3: Agent identifies top noise sinks with token costs", () => {
    // Given turns containing multiple noise categories
    const mixedTurns: TurnMessage[] = [
      { role: "assistant", content: "heartbeat", tokens: 120 },
      { role: "assistant", content: "heartbeat", tokens: 120 },
      { role: "assistant", content: "actually, let me correct that", tokens: 70 },
      { role: "assistant", content: "got it", tokens: 15 },
      { role: "user", content: "Real instructions.", tokens: 200 },
    ];

    // When agent requests top 3 noise sinks
    const topSinks = engine.identifyNoise(mixedTurns, 3);

    // Then heartbeats are identified as top sink
    expect(topSinks.length).toBe(3);
    expect(topSinks[0].category).toBe("heartbeat");
    expect(topSinks[0].tokens).toBe(240);
    expect(topSinks[1].category).toBe("self_correction_retraction");
  });

  it("Scenario 4: Context budget accounts for > 90% of tokens without double-counting", () => {
    // Given allocated context items
    const items: ContextItem[] = [
      { category: "system_prompts", tokens: 800 },
      { category: "conversation_history", tokens: 4500 },
      { category: "tool_definitions", tokens: 1200 },
      { category: "user_preferences", tokens: 400 },
      { category: "workspace_context", tokens: 1100 },
    ];

    // When partition is computed
    const breakdown = engine.partitionBudget(items);

    // Then coverage is 100% and total tokens equal sum of parts
    expect(breakdown.coveragePercent).toBe(100);
    expect(breakdown.totalTokens).toBe(8000);
    expect(breakdown.accountedTokens).toBe(8000);
  });

  it("Scenario 5: Channel history persists across compactions and resets", () => {
    // Given compaction events recorded over time
    engine.recordEvent({
      event: "compaction",
      tokensBefore: 167000,
      tokensAfter: 41000,
      bytesBefore: 2100000,
      bytesAfter: 500000,
      snrBefore: 62,
      snrAfter: 81,
      yieldPercent: 75,
      note: "First compaction",
    });

    currentTime += 3600000;

    engine.recordEvent({
      event: "compaction",
      tokensBefore: 190000,
      tokensAfter: 38000,
      bytesBefore: 2400000,
      bytesAfter: 480000,
      snrBefore: 65,
      snrAfter: 83,
      yieldPercent: 80,
      note: "Second compaction",
    });

    // When reading history
    const history = engine.getHistory();

    // Then both entries are present in chronological order
    expect(history.length).toBe(2);
    expect(history[0].yieldPercent).toBe(75);
    expect(history[1].yieldPercent).toBe(80);
    expect(history[1].timestamp).toBeGreaterThan(history[0].timestamp);
  });

  it("Scenario 6: Retransmission delivers missing signal from archive within budget", () => {
    // Given an archived conversation segment
    const archive = [
      "Turn 1: Project kickoff.",
      "Turn 14: Decided lottery payout curve uses Pareto alpha=1.16.",
      "Turn 28: Routine confirmation.",
    ].join("\n\n");

    // When agent requests retransmission for payout curve
    const result = engine.sliceArchive(archive, "Pareto alpha", 500);

    // Then the exact epistemic segment is recovered
    expect(result.found).toBe(true);
    expect(result.segment).toContain("Pareto alpha=1.16");
    expect(result.tokens).toBeLessThanOrEqual(500);
  });

  it("Scenario 7: Overhead-Savings Ratio (OSR <= 1:10) is maintained", () => {
    // Given feature overhead per turn (SNR meter + telemetry)
    const turnOverheadTokens = 15;
    const totalTurns = 100;
    const totalOverhead = turnOverheadTokens * totalTurns; // 1,500 tokens

    // And tokens saved by 2 compactions
    const tokensSavedPerCompaction = 80000;
    const totalSaved = tokensSavedPerCompaction * 2; // 160,000 tokens

    // When computing OSR
    const osr = totalOverhead / totalSaved;

    // Then OSR is far below the 1:10 (0.10) threshold (~1:106)
    expect(osr).toBeLessThanOrEqual(MAX_OSR_LIMIT);
    expect(osr).toBeCloseTo(0.009375, 4);
  });
});
