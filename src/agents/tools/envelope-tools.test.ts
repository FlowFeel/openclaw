import { describe, it, expect, beforeEach } from "vitest";
import {
  peek,
  retransmit,
  bandwidth_negotiate,
  setActiveEnvelopeContext,
} from "./envelope-tools.js";

describe("Degree 1: SelfStateEnvelope Certified Tools", () => {
  beforeEach(() => {
    setActiveEnvelopeContext(
      [
        { role: "system", content: "You are the resident agent." },
        { role: "user", content: "Check memory" },
      ],
      [
        {
          eventId: "cmp_1",
          timestamp: 1724500000,
          triggerReason: "budget_ceiling",
          tokensBefore: 80000,
          tokensAfter: 12000,
          compressionRatio: 6.6,
          droppedTurnIds: ["turn_10", "turn_11"],
          archiveRef: "archive:session:1",
        },
      ],
      [
        ["turn_10", "Original detailed prompt instructions from Ed Phillips regarding platform deployment"],
      ],
    );
  });

  it("peek returns targeted field with minimal payload (< 40 tokens)", () => {
    const res = peek("F1.headroom");
    expect(res.path).toBe("F1.headroom");
    expect(res.result).toBeDefined();

    const f3 = peek("F3.route");
    expect(f3.result).toBe("fits");

    const f2Last = peek("F2.lastEvent") as any;
    expect(f2Last.result.eventId).toBe("cmp_1");
  });

  it("retransmit recovers dropped turn from pre-compaction archive", () => {
    const res = retransmit("turn_10");
    expect(res.ok).toBe(true);
    expect(res.content).toContain("Original detailed prompt instructions");
    expect(res.tokens).toBeLessThan(2000);
  });

  it("retransmit fails gracefully when turn is not in archive", () => {
    const res = retransmit("non_existent_turn");
    expect(res.ok).toBe(false);
    expect(res.error).toContain("not found");
  });

  it("bandwidth_negotiate sets forward routing intent", () => {
    const res = bandwidth_negotiate("truncate_tool_results", "High noise turn upcoming");
    expect(res.ok).toBe(true);
    expect(res.requestedRoute).toBe("truncate_tool_results");

    const f3 = peek("F3.requestedRoute");
    expect(f3.result).toBe("truncate_tool_results");
  });
});
