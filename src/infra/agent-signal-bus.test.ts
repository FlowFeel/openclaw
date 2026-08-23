import { describe, expect, it } from "vitest";
import { AgentSignalBus } from "./agent-signal-bus.js";

describe("AgentSignalBus (Ring Buffer Subsystem)", () => {
  it("records and retrieves signals", () => {
    const bus = new AgentSignalBus(10);
    const signal = bus.emit({
      level: "warn",
      topic: "knowledge_gap",
      message: "Missing RPC documentation",
      sessionId: "session_123",
    });

    expect(signal.id).toBeDefined();
    expect(signal.level).toBe("warn");
    expect(signal.topic).toBe("knowledge_gap");

    const retrieved = bus.getSignals({ topic: "knowledge_gap" });
    expect(retrieved.length).toBe(1);
    expect(retrieved[0]?.id).toBe(signal.id);
  });

  it("maintains circular ring buffer bounding at capacity", () => {
    const capacity = 5;
    const bus = new AgentSignalBus(capacity);

    for (let i = 0; i < 10; i++) {
      bus.emit({
        level: "info",
        topic: "turn_progress",
        message: `Signal ${i}`,
        timestamp: 1000 + i,
      });
    }

    const stats = bus.getStats();
    expect(stats.count).toBe(capacity);
    expect(stats.totalEmitted).toBe(10);

    const signals = bus.getSignals();
    expect(signals.length).toBe(capacity);
    // Newest signals should be retained (9, 8, 7, 6, 5)
    expect(signals[0]?.message).toBe("Signal 9");
  });
});
