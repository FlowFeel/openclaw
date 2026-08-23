import { describe, expect, it } from "vitest";
import { extractFrontmatter } from "./deterministic-frontmatter.js";
import { partitionSandwich } from "./sandwich-partitioner.js";
import { extractCodeFences } from "./micromark-fence-scanner.js";
import { resolveDocumentPath } from "./role-resolver.js";
import { evaluateStalenessSignal } from "./staleness-signal.js";
import { expandBasisCode } from "./basis-tokens.js";

describe("Tier 3 BDD: Shannon-Weaver Agent Behavioral Scenarios", () => {
  it("Scenario: Agent loads structured document, decodes frontmatter, and extracts sandwich entry/exit slices", () => {
    // Given an agent reading a workspace document with YAML frontmatter and deep spec body
    const sampleDoc = `---
title: "Agent Steering Protocol"
role: coordinator
budget: 40
basis_tier: "*[verified-in-memory]*"
---
# Steering Protocol Overview
This is the quick reference entry zone.
- Param A: active
- Param B: ready

## Deep Invariant Body
${Array.from({ length: 80 }, (_, i) => `Section rule ${i + 1}: invariant holds true.`).join("\n")}

## Forward Navigation Pointers
- Next Task: Execute failover check
- Next Doc: [CHANNEL_MAP.md](file:///workspace/CHANNEL_MAP.md)
`;

    // When the frontmatter is extracted deterministically
    const extracted = extractFrontmatter(sampleDoc);
    expect(extracted.hasFrontmatter).toBe(true);
    expect(extracted.frontmatter.title).toBe("Agent Steering Protocol");
    expect(extracted.frontmatter.basis_tier).toBe("*[verified-in-memory]*");

    // And the document is partitioned with dynamic budget k=25
    const zones = partitionSandwich(sampleDoc, { entryBudget: 25, exitBudget: 25 });

    // Then the entry zone contains the quick reference
    expect(zones.entryText).toContain("# Steering Protocol Overview");
    expect(zones.entryText).toContain("- Param A: active");

    // And the exit zone contains the forward navigation pointers
    expect(zones.exitText).toContain("## Forward Navigation Pointers");
    expect(zones.exitText).toContain("Next Task: Execute failover check");

    // And the middle body holds the detailed invariant lines
    expect(zones.bodyText).toContain("Section rule 40: invariant holds true.");
  });

  it("Scenario: Agent isolates code fence tool calls without backslash escaping penalties", () => {
    const messageDoc = `# Outbox Message
\`\`\`yaml
command: system_probe
mode: live
\`\`\`

Explanation text.

\`\`\`typescript
const status = "HEALTHY";
\`\`\`
`;

    const fences = extractCodeFences(messageDoc);
    expect(fences).toHaveLength(2);
    expect(fences[0]?.language).toBe("yaml");
    expect(fences[0]?.code).toContain("command: system_probe");
    expect(fences[1]?.language).toBe("typescript");
  });

  it("Scenario: Agent navigates topology and evaluates Bayesian staleness of CONTEXT_INDEX", () => {
    const params = {
      workspaceRoot: "/workspace/project",
      roleMapping: {
        channelTopology: "TOPOLOGY.md",
      },
    };

    const topologyPath = resolveDocumentPath(params, "channelTopology");
    expect(topologyPath).toBe("/workspace/project/TOPOLOGY.md");

    // When evaluating a 45-day-old index
    const nowMs = 1787500000000;
    const oldIndexTime = nowMs - 45 * 24 * 60 * 60 * 1000;
    const signal = evaluateStalenessSignal(oldIndexTime, nowMs);

    // Then the agent receives a seed_only prior with actionable verification guidance
    expect(signal.classification).toBe("stale");
    expect(signal.confidence).toBe("seed_only");
    expect(signal.actionableAdvice).toContain("treat entries as starting search clues");

    // And basis tier tokens expand correctly
    const qualification = expandBasisCode("*[deductive-axiom]*");
    expect(qualification).toContain("Mathematically proven invariant");
  });
});
