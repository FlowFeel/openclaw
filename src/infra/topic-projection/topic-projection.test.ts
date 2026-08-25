import { describe, it, expect } from "vitest";
import { buildTopicCarePackage } from "./care-package-builder.js";
import { extractTopicProjection } from "./topic-projector.js";
import { buildHickeyTopicMap, lookupTopicCoordinates, buildTopicHickeyKey } from "./topic-coordinate-map.js";
import type { TurnMessage } from "../tokenomics/types.js";

describe("Degree 0: TopicCarePackage Pure Invariants", () => {
  it("builds deterministic Care Package for refactor_sprint", () => {
    const pkg = buildTopicCarePackage({
      name: "Epic-26-Topic-Manager",
      archetype: "refactor_sprint",
      mission: "Autonomous Telegram Topic Governance & Cruft Sanitation",
      referencePaths: ["specs/topic-governance-care-package-and-projection.md"],
      initialTasks: ["Build pure DFT core", "Implement channel tools"],
      chatId: "-1004328838138",
    });

    expect(pkg.topicName).toBe("Epic-26-Topic-Manager");
    expect(pkg.telegramCardMarkdown).toContain("📌 **CARE PACKAGE: Topic Kickoff Briefing**");
    expect(pkg.telegramCardMarkdown).toContain("🛠️ `refactor_sprint`");
    expect(pkg.telegramCardMarkdown).toContain("specs/topic-governance-care-package-and-projection.md");
    expect(pkg.sessionBootstrapPrompt).toContain("[TOPIC BOOTSTRAP FRAME: Epic-26-Topic-Manager]");
    expect(pkg.iconColorHex).toBe(0x6fb9f0);
    expect(pkg.estimatedTokens).toBeLessThan(300);
  });
});

describe("Degree 0: TopicProjector Pure Invariants", () => {
  it("extracts literate milestones, decisions, and files while filtering cruft", () => {
    const turns: TurnMessage[] = [
      { role: "system", content: "System instructions" },
      { role: "assistant", content: "Working on [x] 1. Implement pure DFT types and builders" },
      { role: "user", content: "heartbeat" },
      { role: "assistant", content: "decision: configured NODE_OPTIONS=--max-old-space-size=768" },
      { role: "tool", content: "{ \"status\": 200, \"files\": [\"src/infra/topic-projection/types.ts\"] }" },
      { role: "assistant", content: "184/184 tests passed in Degree 0-2" },
    ];

    const proj = extractTopicProjection({
      sourceTopicId: 12,
      sourceTopicName: "Refactor-Sprint",
      turns,
      mode: "milestone",
      chatId: "-1004328838138",
    });

    expect(proj.sourceTopicId).toBe(12);
    expect(proj.telegramCardMarkdown).toContain("🌐 **CROSS-TOPIC PROJECTION** ➔ From Topic #12");
    expect(proj.telegramCardMarkdown).toContain("184/184 tests passed");
    expect(proj.telegramCardMarkdown).toContain("NODE_OPTIONS=--max-old-space-size=768");
    expect(proj.deepLinkUrl).toBe("https://t.me/c/4328838138/12");
    expect(proj.snrPercentage).toBeGreaterThanOrEqual(90);
    expect(proj.extractedTokenCount).toBeLessThan(600);
  });
});

describe("Degree 0: HickeyTopicCoordinateMap Pure Invariants", () => {
  it("indexes semantic Hickey keys and formats rendered markdown table", () => {
    const map = buildHickeyTopicMap([
      {
        topicId: 1,
        name: "General-Main",
        sessionKey: "agent:main:telegram:group:-1004328838138:topic:1",
        archetype: "feature_delivery",
        turnCount: 25,
        totalTokens: 12500,
        snrPercentage: 78,
        status: "active",
        lastActivityTimestamp: 1724500000,
      },
      {
        topicId: 12,
        name: "Refactor-Tool-Dispatcher",
        sessionKey: "agent:main:telegram:group:-1004328838138:topic:12",
        archetype: "refactor_sprint",
        turnCount: 40,
        totalTokens: 18200,
        snrPercentage: 88,
        status: "active",
        lastActivityTimestamp: 1724505000,
      },
    ]);

    expect(map.totalTopics).toBe(2);
    expect(map.nodes[1]?.hickeyKey).toBe("telegram.supergroup.topics.12.refactor_sprint.refactor_tool_dispatcher");
    expect(map.renderedTableMarkdown).toContain("🗺️ **LIVE HICKEY TOPIC COORDINATE MAP** (2 Topics)");
    expect(map.renderedTableMarkdown).toContain("| `12` | **Refactor-Tool-Dispatcher** |");
  });

  it("provides instant lazy fuzzy topic lookup", () => {
    const map = buildHickeyTopicMap([
      {
        topicId: 12,
        name: "Refactor-Tool-Dispatcher",
        sessionKey: "agent:main:telegram:group:-1004328838138:topic:12",
        archetype: "refactor_sprint",
        turnCount: 40,
        totalTokens: 18200,
        snrPercentage: 88,
        status: "active",
        lastActivityTimestamp: 1724505000,
      },
    ]);

    const res1 = lookupTopicCoordinates("dispatcher", map);
    expect(res1.matches.length).toBe(1);
    expect(res1.matches[0]?.topicId).toBe(12);

    const res2 = lookupTopicCoordinates("12", map);
    expect(res2.matches[0]?.matchConfidence).toBe(1.0);
  });
});
