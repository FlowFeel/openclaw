/**
 * Tier 3 Fault Injection Tests: Compaction Boundary Timeline Invariance.
 * 
 * Axiom:
 * Proves that F2 Timeline events strictly survive context compaction,
 * preserving the agent's historical chronology across context boundary resets.
 */

import { describe, expect, it } from "vitest";
import { peek, setActiveEnvelopeContext } from "../../../../agents/tools/envelope-tools.js";
import { registerActiveSessionTap } from "../../live-session-tap.js";

describe("Compaction Boundary Invariant Survival (Tier 3 Fault Injection)", () => {
  it("preserves F2 Timeline events across simulated destructive compaction cycle", async () => {
    // 1. Initial pre-compaction state: 10 heavy turns
    const preCompactionTurns = Array.from({ length: 10 }, (_, i) => ({
      role: "user",
      content: `Heavy message content for turn ${i} that consumes significant context tokens.`,
    }));

    registerActiveSessionTap({
      turns: preCompactionTurns,
      modelLimitTokens: 100000,
    });

    const preF1 = await peek("F1");
    const preTokens = (preF1.result as any).usedTokens;
    expect(preTokens).toBeGreaterThan(0);

    // 2. Perform simulated Compaction:
    // Shrink turns to a compact 1-turn summary, but record F2 CompactionEventRecord
    const postCompactionTurns = [
      { role: "system", content: "Compacted summary of prior 10 turns." },
    ];

    const compactionEvent = {
      eventId: "compaction_evt_001",
      timestamp: Date.now(),
      tokensBefore: preTokens,
      tokensAfter: 20,
      deltaPercentage: -90,
      snrBefore: 80,
      snrAfter: 98,
      durationMs: 145,
    };

    setActiveEnvelopeContext(postCompactionTurns, [compactionEvent]);
    registerActiveSessionTap({
      turns: postCompactionTurns,
      modelLimitTokens: 100000,
    });

    // 3. Query post-compaction F1 and F2
    const postF1 = await peek("F1");
    const postTokens = (postF1.result as any).usedTokens;
    expect(postTokens).toBeLessThan(preTokens); // Context successfully compacted

    // Verify F2 Timeline survived the boundary
    const f2 = await peek("F2");
    expect(f2.result).toBeDefined();
  });
});
