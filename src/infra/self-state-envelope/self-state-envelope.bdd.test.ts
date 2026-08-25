import { describe, it, expect } from "vitest";
import { resolveSelfStateEnvelope } from "./envelope-resolver.js";
import { queryEnvelopePath } from "./envelope-query.js";
import { formatAmbientPositionMarker } from "./ambient-marker.js";
import type { TurnMessage } from "../tokenomics/types.js";
import type { CompactionEventRecord } from "./types.js";

describe("Degree 2 (BDD): Agent Self-State Envelope & On-Demand Peek", () => {
  it("Scenario 1: Agent observes ambient position header and performs targeted peek on headroom", () => {
    // Given an ongoing conversation with 25 turns
    const turns: TurnMessage[] = Array.from({ length: 25 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: `Turn content ${i} for test verification`,
    }));

    // When the envelope is dynamically resolved
    const envelope = resolveSelfStateEnvelope(turns, {
      modelLimitTokens: 128000,
      activeRoute: "fits",
    });

    // Then ambient header provides immediate awareness without querying
    const header = formatAmbientPositionMarker(envelope);
    expect(header).toContain("F3=fits");
    expect(header).toContain("F2_events=0");

    // And when the agent performs an atomic peek query for headroom
    const headroom = queryEnvelopePath(envelope, "F1.headroom") as any;
    expect(headroom.usedTokens).toBeGreaterThan(0);
    expect(headroom.remainingTokens).toBeLessThan(128000);
  });

  it("Scenario 2: F2 compaction log survives across a compaction boundary", () => {
    // Given durable F2 history from past compactions
    const pastCompactionEvents: CompactionEventRecord[] = [
      {
        eventId: "cmp_alpha",
        timestamp: 1724500000,
        triggerReason: "budget_ceiling",
        tokensBefore: 85000,
        tokensAfter: 10000,
        compressionRatio: 8.5,
        droppedTurnIds: [1, 2, 3, 4, 5],
        archiveRef: "archive:alpha",
        droppedTurnsSummary: "Pruned 5 initial setup turns",
      },
    ];

    // When the agent's context is compacted down to 2 active turns
    const postCompactionTurns: TurnMessage[] = [
      { role: "system", content: "Compacted system summary" },
      { role: "user", content: "Where are we?" },
    ];

    const envelope = resolveSelfStateEnvelope(postCompactionTurns, {
      modelLimitTokens: 128000,
      activeRoute: "fits",
    }, pastCompactionEvents);

    // Then the agent can query F2 to understand prior compactions and dropped turns
    const lastEvent = queryEnvelopePath(envelope, "F2.lastEvent") as CompactionEventRecord;
    expect(lastEvent.eventId).toBe("cmp_alpha");
    expect(lastEvent.droppedTurnIds).toEqual([1, 2, 3, 4, 5]);
    expect(lastEvent.compressionRatio).toBe(8.5);
  });
});
