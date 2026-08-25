import { describe, it, expect } from "vitest";
import { resolveContextEnvelope } from "./context-envelope.js";
import type { TurnMessage } from "../tokenomics/types.js";

describe("Degree 0: ContextEnvelope Pure Invariants", () => {
  it("preserves turns within budget and nominal SNR", () => {
    const turns: TurnMessage[] = [
      { role: "system", content: "You are an AI assistant." },
      { role: "user", content: "What is the status of the refactor?" },
    ];

    const res = resolveContextEnvelope(turns, {
      maxContextTokens: 4000,
      reservedResponseTokens: 1000,
    });

    expect(res.turns.length).toBe(2);
    expect(res.isWithinBudget).toBe(true);
    expect(res.tier).toBe("nominal");
    expect(res.promptCue).toBeUndefined();
    expect(res.compressionSummary).toBeUndefined();
  });

  it("compacts older turns when token budget is exceeded", () => {
    const turns: TurnMessage[] = [
      { role: "system", content: "System instructions" },
      { role: "user", content: "A".repeat(800) }, // ~200 tokens
      { role: "assistant", content: "B".repeat(800) }, // ~200 tokens
      { role: "user", content: "C".repeat(800) }, // ~200 tokens
      { role: "assistant", content: "D".repeat(800) }, // ~200 tokens
      { role: "user", content: "Latest user message" },
    ];

    // Budget limit = 500 - 100 = 400 tokens
    const res = resolveContextEnvelope(turns, {
      maxContextTokens: 500,
      reservedResponseTokens: 100,
    });

    expect(res.turns.length).toBeLessThan(turns.length);
    expect(res.turns[0]?.role).toBe("system");
    expect(res.turns[res.turns.length - 1]?.content).toBe("Latest user message");
    expect(res.compressionSummary).toBeDefined();
    expect(res.compressionSummary?.freedTokens).toBeGreaterThan(0);
  });

  it("attaches proactive warning cue when context contains noise patterns", () => {
    const turns: TurnMessage[] = [
      { role: "system", content: "System" },
      { role: "user", content: "thanks" },
      { role: "assistant", content: "got it" },
      { role: "user", content: "makes sense" },
      { role: "user", content: "Please do work" },
    ];

    const res = resolveContextEnvelope(turns, {
      maxContextTokens: 4000,
      reservedResponseTokens: 1000,
    });

    expect(res.tier).not.toBe("nominal");
    expect(res.promptCue).toBeDefined();
    expect(res.promptCue).toContain("TOKENOMICS");
  });
});
