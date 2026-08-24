import { describe, it, expect } from "vitest";
import {
  calculateSNR,
  computeCompactionYield,
  identifyNoiseSources,
  partitionTokenBudget,
  createTokenomicsEngine,
  TurnMessage,
  ContextItem,
} from "./index.js";

describe("Degree 0: Shannon-Weaver Tokenomics Core Invariants", () => {
  it("computes 100% SNR for empty context", () => {
    const report = calculateSNR([]);
    expect(report.snrPercent).toBe(100);
    expect(report.tier).toBe("nominal");
    expect(report.isAdequate).toBe(true);
  });

  it("classifies clean epistemic turns as nominal SNR (>= 70%)", () => {
    const turns: TurnMessage[] = [
      { role: "system", content: "You are an autonomous coding agent operating under DFT axioms." },
      { role: "user", content: "We decided on SQLite over Postgres for the coordinate map." },
      { role: "assistant", content: "Understood. The coordinates are namespaced under domain/slug." },
    ];

    const report = calculateSNR(turns);
    expect(report.snrPercent).toBeGreaterThanOrEqual(70);
    expect(report.tier).toBe("nominal");
    expect(report.isAdequate).toBe(true);
  });

  it("detects heartbeat and repetition flood as critical SNR (< 50%)", () => {
    const turns: TurnMessage[] = [
      { role: "user", content: "What is our architecture?" },
      { role: "assistant", content: "heartbeat" },
      { role: "assistant", content: "heartbeat" },
      { role: "assistant", content: "heartbeat" },
      { role: "assistant", content: "heartbeat" },
      { role: "assistant", content: "heartbeat" },
      { role: "assistant", content: "heartbeat" },
      { role: "assistant", content: "heartbeat" },
      { role: "assistant", content: "heartbeat" },
    ];

    const report = calculateSNR(turns);
    expect(report.snrPercent).toBeLessThan(50);
    expect(report.tier).toBe("critical");
    expect(report.isAdequate).toBe(false);
  });

  it("enforces the SNR Monotonicity Invariant across compaction", () => {
    const preCompactionTurns: TurnMessage[] = [
      { role: "user", content: "Discuss architecture." },
      { role: "assistant", content: "heartbeat" },
      { role: "assistant", content: "heartbeat" },
      { role: "assistant", content: "heartbeat" },
      { role: "assistant", content: "actually, let me clarify that we use SQLite." },
      { role: "assistant", content: "got it." },
    ];

    const postCompactionTurns: TurnMessage[] = [
      { role: "system", content: "## Summary\nDecided on SQLite for coordinate maps." },
      { role: "user", content: "Please implement map_read." },
      { role: "assistant", content: "Implementing map_read with k <= 2." },
    ];

    const before = calculateSNR(preCompactionTurns);
    const after = calculateSNR(postCompactionTurns);

    expect(after.snrPercent).toBeGreaterThanOrEqual(before.snrPercent);
  });

  it("computes self-verifying compaction yield reports (Axiom A6)", () => {
    const yieldReport = computeCompactionYield({
      tokensBefore: 200000,
      tokensAfter: 40000,
      bytesBefore: 2500000,
      bytesAfter: 500000,
      snrBefore: 45,
      snrAfter: 85,
    });

    expect(yieldReport.tokenReductionPercent).toBe(80);
    expect(yieldReport.byteReductionPercent).toBe(80);
    expect(yieldReport.snrDeltaPoints).toBe(40);
    expect(yieldReport.summary).toContain("200000 → 40000 tokens (-80%)");
  });

  it("identifies and ranks top noise sinks", () => {
    const turns: TurnMessage[] = [
      { role: "assistant", content: "heartbeat", tokens: 100 },
      { role: "assistant", content: "heartbeat", tokens: 100 },
      { role: "assistant", content: "let me clarify my previous thought", tokens: 60 },
      { role: "assistant", content: "got it", tokens: 20 },
      { role: "user", content: "Real task description here", tokens: 200 },
    ];

    const topNoise = identifyNoiseSources(turns, 3);
    expect(topNoise.length).toBeGreaterThan(0);
    expect(topNoise[0].category).toBe("heartbeat");
    expect(topNoise[0].tokens).toBe(200);
  });

  it("partitions context budget with > 90% coverage and zero double-counting (Axiom A3)", () => {
    const items: ContextItem[] = [
      { category: "system_prompts", tokens: 1000 },
      { category: "conversation_history", tokens: 6000 },
      { category: "tool_definitions", tokens: 1500 },
      { category: "user_preferences", tokens: 500 },
      { category: "workspace_context", tokens: 1000 },
    ];

    const breakdown = partitionTokenBudget(items);
    expect(breakdown.totalTokens).toBe(10000);
    expect(breakdown.accountedTokens).toBe(10000);
    expect(breakdown.coveragePercent).toBe(100);
    expect(breakdown.categories.length).toBe(5);
  });

  it("instantiates canonical engine with deterministic clock and history store", () => {
    const mockClock = { now: () => 1724500000000 };
    const engine = createTokenomicsEngine({ clock: mockClock });

    const event = engine.recordEvent({
      event: "compaction",
      tokensBefore: 180000,
      tokensAfter: 36000,
      bytesBefore: 2000000,
      bytesAfter: 400000,
      snrBefore: 50,
      snrAfter: 82,
      yieldPercent: 80,
    });

    expect(event.timestamp).toBe(1724500000000);
    expect(engine.getHistory().length).toBe(1);

    const md = engine.renderHistoryMarkdown();
    expect(md).toContain("| compaction | 180000 | 36000 | 50% → 82% | 80% |");
  });

  it("extracts bounded archival retransmission segments", () => {
    const engine = createTokenomicsEngine();
    const archive = "Paragraph 1: General chatter.\n\nParagraph 2: The secret token is PHOS-9988.\n\nParagraph 3: More filler.";

    const result = engine.sliceArchive(archive, "secret token", 100);
    expect(result.found).toBe(true);
    expect(result.segment).toContain("PHOS-9988");
    expect(result.tokens).toBeLessThanOrEqual(100);
  });
});
