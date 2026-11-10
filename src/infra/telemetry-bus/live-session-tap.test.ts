import { describe, it, expect, beforeEach } from "vitest";
import {
  startInFlightTurn,
  recordInFlightToolCall,
  getInFlightChainMetrics,
  clearInFlightTurn,
} from "./live-session-tap.js";

describe("live-session-tap (In-Flight Turn Telemetry & Budget Clamping)", () => {
  beforeEach(() => {
    clearInFlightTurn("test-session");
  });

  it("increments callsUsed up to callsLimit and flags initial exhaustion", () => {
    startInFlightTurn({ sessionId: "test-session", tier: "Bronze", score: 80 });

    const call1 = recordInFlightToolCall("test-session");
    expect(call1.callsUsed).toBe(1);
    expect(call1.callsLimit).toBe(3);
    expect(call1.budgetExhausted).toBe(false);
    expect(call1.shouldEmitWarning).toBe(false);

    const call2 = recordInFlightToolCall("test-session");
    expect(call2.callsUsed).toBe(2);
    expect(call2.budgetExhausted).toBe(false);
    expect(call2.shouldEmitWarning).toBe(false);

    const call3 = recordInFlightToolCall("test-session");
    expect(call3.callsUsed).toBe(3);
    expect(call3.callsLimit).toBe(3);
    expect(call3.budgetExhausted).toBe(true);
    expect(call3.shouldEmitWarning).toBe(true);
  });

  it("clamps callsUsed at callsLimit and suppresses repeated warning emissions post-exhaustion", () => {
    startInFlightTurn({ sessionId: "test-session", tier: "Gold", score: 96 });

    // Exhaust the 8-call Gold budget
    for (let i = 1; i < 8; i++) {
      const res = recordInFlightToolCall("test-session");
      expect(res.callsUsed).toBe(i);
      expect(res.budgetExhausted).toBe(false);
      expect(res.shouldEmitWarning).toBe(false);
    }

    const call8 = recordInFlightToolCall("test-session");
    expect(call8.callsUsed).toBe(8);
    expect(call8.callsLimit).toBe(8);
    expect(call8.budgetExhausted).toBe(true);
    expect(call8.shouldEmitWarning).toBe(true);

    // Call 9..14: post-exhaustion calls must clamp display to 8/8 and NOT emit warnings again
    for (let extra = 9; extra <= 14; extra++) {
      const postExhaustion = recordInFlightToolCall("test-session");
      expect(postExhaustion.callsUsed).toBe(8); // Clamped display counter
      expect(postExhaustion.callsLimit).toBe(8);
      expect(postExhaustion.budgetExhausted).toBe(true);
      expect(postExhaustion.shouldEmitWarning).toBe(false); // Warning gate suppressed
    }
  });

  it("reflects loop penalties in chain metrics", () => {
    startInFlightTurn({ sessionId: "test-session", tier: "Diamond", score: 100 });
    const metrics = getInFlightChainMetrics("test-session");
    expect(metrics.tier).toBe("Diamond");
    expect(metrics.callsLimit).toBe(12);
    expect(metrics.score).toBe(100);
    expect(metrics.inFlightBudgetExhausted).toBe(false);
  });
});

