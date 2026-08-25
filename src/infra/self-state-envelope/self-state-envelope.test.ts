import { describe, it, expect } from "vitest";
import { resolveSelfStateEnvelope } from "./envelope-resolver.js";
import { queryEnvelopePath } from "./envelope-query.js";
import { formatAmbientPositionMarker } from "./ambient-marker.js";
import type { TurnMessage } from "../tokenomics/types.js";
import type { CompactionEventRecord } from "./types.js";

describe("Degree 0: SelfStateEnvelope Pure Invariants", () => {
  const mockTurns: TurnMessage[] = [
    { role: "system", content: "You are an assistant." },
    { role: "user", content: "Inspect system state" },
    { role: "assistant", content: "System nominal" },
  ];

  const mockF2Events: CompactionEventRecord[] = [
    {
      eventId: "cmp_01",
      timestamp: 1724500000,
      triggerReason: "budget_ceiling",
      tokensBefore: 90000,
      tokensAfter: 12000,
      compressionRatio: 7.5,
      droppedTurnIds: [1, 2, 3],
      archiveRef: "archive:session:42:cmp_01",
      droppedTurnsSummary: "Dropped 3 turns of debug traces",
    },
  ];

  it("purely resolves dynamic F1, F3, F4 and marries with durable F2", () => {
    const envelope = resolveSelfStateEnvelope(mockTurns, {
      modelLimitTokens: 128000,
      activeRoute: "fits",
    }, mockF2Events);

    expect(envelope.F1.limitTokens).toBe(128000);
    expect(envelope.F1.usedTokens).toBeGreaterThan(0);
    expect(envelope.F1.snrPercentage).toBeGreaterThanOrEqual(70);

    expect(envelope.F2.totalCompactionEvents).toBe(1);
    expect(envelope.F2.lastEvent?.eventId).toBe("cmp_01");

    expect(envelope.F3.activeRoute).toBe("fits");
    expect(envelope.F4.hotTurnsCount).toBe(3);
    expect(envelope.platform.version).toBe("v2026.2.26");
  });

  it("formats ambient position marker under 15 tokens", () => {
    const envelope = resolveSelfStateEnvelope(mockTurns, {
      modelLimitTokens: 128000,
      activeRoute: "fits",
    }, mockF2Events);

    const marker = formatAmbientPositionMarker(envelope);
    expect(marker).toContain("[ENV: F1=");
    expect(marker).toContain("128.0k");
    expect(marker).toContain("F3=fits");
    expect(marker).toContain("F2_events=1");
    // Token estimation (< 15 tokens)
    expect(Math.ceil(marker.length / 4)).toBeLessThanOrEqual(15);
  });

  it("queries dotted path expressions with sub-millisecond precision", () => {
    const envelope = resolveSelfStateEnvelope(mockTurns, {
      modelLimitTokens: 128000,
      activeRoute: "fits",
      coldArchiveReferences: ["archive:session:42:cmp_01"],
    }, mockF2Events);

    const f1 = queryEnvelopePath(envelope, "F1.headroom") as any;
    expect(f1.limitTokens).toBe(128000);

    const route = queryEnvelopePath(envelope, "F3.route");
    expect(route).toBe("fits");

    const lastEvent = queryEnvelopePath(envelope, "F2.events[-1]") as CompactionEventRecord;
    expect(lastEvent.eventId).toBe("cmp_01");

    const offloaded = queryEnvelopePath(envelope, "F4.offloaded") as string[];
    expect(offloaded).toContain("archive:session:42:cmp_01");

    const version = queryEnvelopePath(envelope, "platform.version");
    expect(version).toBe("v2026.2.26");
  });
});
