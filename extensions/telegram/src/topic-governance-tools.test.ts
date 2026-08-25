import { describe, it, expect, beforeEach } from "vitest";
import {
  telegram_topic_lookup,
  telegram_topic_map,
  telegram_topic_seed,
  telegram_topic_inject,
  setActiveTopicNodes,
} from "./topic-governance-tools.js";

describe("Degree 1: TelegramTopicGovernance Certified Tools", () => {
  beforeEach(() => {
    setActiveTopicNodes([
      {
        topicId: 1,
        name: "General-Main",
        sessionKey: "agent:main:telegram:group:-1004328838138:topic:1",
        hickeyKey: "telegram.supergroup.topics.1.feature_delivery.general_main",
        archetype: "feature_delivery",
        turnCount: 25,
        totalTokens: 12500,
        snrPercentage: 78,
        status: "active",
        lastActivityTimestamp: Date.now(),
      },
    ]);
  });

  it("telegram_topic_lookup resolves fuzzy query", () => {
    const res = telegram_topic_lookup("main");
    expect(res.matches.length).toBe(1);
    expect(res.matches[0]?.topicId).toBe(1);
  });

  it("telegram_topic_map returns rendered board", () => {
    const res = telegram_topic_map();
    expect(res.totalTopics).toBe(1);
    expect(res.summary).toContain("🗺️ **LIVE HICKEY TOPIC COORDINATE MAP**");
  });

  it("telegram_topic_seed creates and registers new topic with care package", () => {
    const res = telegram_topic_seed({
      name: "Refactor-Sprint",
      archetype: "refactor_sprint",
      mission: "Complete Epic 26",
      chatId: "-1004328838138",
    });

    expect(res.ok).toBe(true);
    expect(res.topicName).toBe("Refactor-Sprint");
    expect(res.telegramCardMarkdown).toContain("🛠️ `refactor_sprint`");

    // Verify it appeared in map
    const map = telegram_topic_map();
    expect(map.totalTopics).toBe(2);
  });

  it("telegram_topic_inject formats high-SNR cross-topic block", () => {
    const res = telegram_topic_inject({
      sourceTopicId: 1,
      sourceTopicName: "General-Main",
      turns: [
        { role: "assistant", content: "Working on [x] 1. Fix memory leak" },
        { role: "assistant", content: "decision: configured 768MB V8 heap" },
      ],
      mode: "milestone",
      chatId: "-1004328838138",
    });

    expect(res.ok).toBe(true);
    expect(res.telegramCardMarkdown).toContain("Fix memory leak");
    expect(res.extractedTokens).toBeLessThan(600);
  });
});
