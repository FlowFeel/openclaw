import { describe, it, expect } from "vitest";
import { buildTopicCarePackage } from "./care-package-builder.js";
import { extractTopicProjection } from "./topic-projector.js";
import { buildHickeyTopicMap, lookupTopicCoordinates } from "./topic-coordinate-map.js";
import type { TurnMessage } from "../tokenomics/types.js";

describe("Degree 2 (BDD): Topic Governance & Cross-Topic Runtime Projections", () => {
  it("Scenario 1: Seeding a new topic produces high-SNR briefing card and bootstrap session", () => {
    // Given an agent requesting a topic care package for incident triage
    const input = {
      name: "Prod-Flash-EC2-Heap",
      archetype: "incident_remediation" as const,
      mission: "Remediate V8 GC thrashing and swap pressure on EC2",
      referencePaths: ["docs/war_stories.md", "compose/docker-compose.ec2.yml"],
      initialTasks: ["Inspect top and docker stats", "Tune NODE_OPTIONS to 768MB", "Verify health check"],
      chatId: "-1004328838138",
    };

    // When the care package is built
    const carePackage = buildTopicCarePackage(input);

    // Then it generates a structured pinned message for Telegram and a bootstrap frame
    expect(carePackage.telegramCardMarkdown).toContain("🚨 `incident_remediation`");
    expect(carePackage.telegramCardMarkdown).toContain("docs/war_stories.md");
    expect(carePackage.sessionBootstrapPrompt).toContain("Tellman A1 (Zero-I/O)");
    expect(carePackage.iconColorHex).toBe(0xff5c5c);
  });

  it("Scenario 2: Multi-turn noisy transcript is compressed into a compact literate projection under 600 tokens", () => {
    // Given a noisy 30-turn source topic with 15KB of JSON AST schemas
    const noisyTurns: TurnMessage[] = [
      { role: "system", content: "Agent system prompt" },
      { role: "assistant", content: "Starting work on [x] 1. Investigate EC2 heap" },
      { role: "tool", content: JSON.stringify({ raw_dump: "a".repeat(4000) }) },
      { role: "user", content: "thanks" },
      { role: "assistant", content: "decision: enforced NODE_OPTIONS=--max-old-space-size=768 --max-semi-space-size=64" },
      { role: "tool", content: JSON.stringify({ second_dump: "b".repeat(4000) }) },
      { role: "assistant", content: "✓ 184/184 tests passing green" },
    ];

    // When a cross-topic projection is extracted
    const projection = extractTopicProjection({
      sourceTopicId: 18,
      sourceTopicName: "Prod-Flash-EC2-Heap",
      turns: noisyTurns,
      mode: "full_signal",
      chatId: "-1004328838138",
    });

    // Then raw JSON payloads are stripped, token size is <= 600, and SNR >= 90%
    expect(projection.telegramCardMarkdown).not.toContain("raw_dump");
    expect(projection.telegramCardMarkdown).not.toContain("second_dump");
    expect(projection.telegramCardMarkdown).toContain("184/184 tests passing");
    expect(projection.extractedTokenCount).toBeLessThan(600);
    expect(projection.snrPercentage).toBeGreaterThanOrEqual(90);
  });

  it("Scenario 3: Live Hickey map indexes topics and enables lazy agent lookup by keyword", () => {
    // Given a live coordinate map of active topics
    const map = buildHickeyTopicMap([
      {
        topicId: 1,
        name: "General-Main",
        sessionKey: "agent:main:telegram:group:-1004328838138:topic:1",
        archetype: "feature_delivery",
        turnCount: 15,
        totalTokens: 6000,
        snrPercentage: 82,
        status: "active",
        lastActivityTimestamp: 1724500000,
      },
      {
        topicId: 18,
        name: "Prod-Flash-EC2-Heap",
        sessionKey: "agent:main:telegram:group:-1004328838138:topic:18",
        archetype: "incident_remediation",
        turnCount: 30,
        totalTokens: 14000,
        snrPercentage: 91,
        status: "active",
        lastActivityTimestamp: 1724501000,
      },
    ]);

    // When an agent lazily queries for "heap" or "18"
    const lookup = lookupTopicCoordinates("heap", map);

    // Then the target topic is resolved with high confidence
    expect(lookup.matches.length).toBe(1);
    expect(lookup.matches[0]?.topicId).toBe(18);
    expect(lookup.matches[0]?.quickTarget).toBe("18");
  });
});
