// Tests Telegram channel topics bridge adapter.
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createTelegramChannelTopics } from "./channel-topics-bridge.js";
import { setTelegramRuntime } from "./runtime.js";
import {
  clearTelegramRuntimeForTest,
  resetTelegramTopicNameCacheForTest,
} from "./runtime.test-support.js";
import { updateTopicName } from "./topic-name-cache.js";

type TopicEntry = {
  name: string;
  iconColor?: number;
  iconCustomEmojiId?: string;
  closed?: boolean;
  updatedAt: number;
};

function installMemoryStores() {
  const stores = new Map<string, Map<string, TopicEntry>>();
  setTelegramRuntime({
    state: {
      openKeyedStore: (({ namespace }: { namespace: string }) => {
        const entries = stores.get(namespace) ?? new Map<string, TopicEntry>();
        stores.set(namespace, entries);
        return {
          async register(key: string, value: TopicEntry) {
            entries.set(key, value);
          },
          async entries() {
            return Array.from(entries, ([key, value]) => ({ key, value }));
          },
          async delete(key: string) {
            return entries.delete(key);
          },
          async clear() {
            entries.clear();
          },
        };
      }) as never,
    },
  } as never);
}

describe("createTelegramChannelTopics", () => {
  beforeEach(() => {
    clearTelegramRuntimeForTest();
    resetTelegramTopicNameCacheForTest();
    installMemoryStores();
  });

  afterEach(() => {
    clearTelegramRuntimeForTest();
    resetTelegramTopicNameCacheForTest();
  });

  it("creates a ChannelTopicsSource with expected defaults", () => {
    const bridge = createTelegramChannelTopics({ chatId: -100123456 });
    expect(bridge.environment).toBe("telegram");
    expect(bridge.chatId).toBe("-100123456");
    expect(bridge.scope).toBeUndefined();
  });

  it("customizes environment and resolves scope from storePath", () => {
    const bridge = createTelegramChannelTopics({
      chatId: 42,
      environment: "telegram-test",
      storePath: "/tmp/test-session.json",
    });
    expect(bridge.environment).toBe("telegram-test");
    expect(bridge.chatId).toBe("42");
    expect(bridge.scope).toBeDefined();
  });

  it("resolves topics from telegram topic-name cache", async () => {
    await updateTopicName(-100123456, "10", {
      name: "Announcements",
    });
    await updateTopicName(-100123456, "42", {
      name: "Archived Thread",
      closed: true,
    });

    const bridge = createTelegramChannelTopics({ chatId: -100123456 });
    const topics = await bridge.resolveTopics(bridge.chatId, bridge.scope);

    expect(topics).toEqual([
      { threadId: "10", name: "Announcements", closed: undefined },
      { threadId: "42", name: "Archived Thread", closed: true },
    ]);
  });
});
