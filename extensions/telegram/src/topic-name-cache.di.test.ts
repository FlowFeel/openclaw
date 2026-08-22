// SL-13 DI tests for the TopicNameCache class.
//
// These construct isolated TopicNameCache instances with a DI-injected
// persistent store factory, proving the class is decoupled from any process
// global state. They complement the module-level facade tests in
// topic-name-cache.test.ts (which exercise the default instance).
import { afterEach, describe, expect, it, vi } from "vitest";
import { clearTelegramRuntimeForTest } from "./runtime.test-support.js";
import { TopicNameCache, TopicNamePersistentStore } from "./topic-name-cache.js";

type TopicEntry = {
  name: string;
  iconColor?: number;
  iconCustomEmojiId?: string;
  closed?: boolean;
  updatedAt: number;
};

function installMemoryStores(prefix = "ns") {
  const stores = new Map<string, Map<string, TopicEntry>>();
  const openStore: (namespace: string) => TopicNamePersistentStore = (namespace) => {
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
  };
  return { stores, openStore };
}

describe("TopicNameCache (DI)", () => {
  afterEach(() => {
    vi.useRealTimers();
    clearTelegramRuntimeForTest();
  });

  it("constructs a cache with an injected store and reads its own entries", async () => {
    const { openStore } = installMemoryStores();
    const cache = new TopicNameCache({ openStore });
    await cache.updateTopicName(-100123, 42, { name: "Deployments" });
    await expect(cache.getTopicName(-100123, 42)).resolves.toBe("Deployments");
  });

  it("two isolated instances with separate stores do not share entries", async () => {
    const a = new TopicNameCache({ openStore: installMemoryStores().openStore });
    const b = new TopicNameCache({ openStore: installMemoryStores().openStore });
    await a.updateTopicName(-100123, 42, { name: "OnlyInA" });
    await expect(a.getTopicName(-100123, 42)).resolves.toBe("OnlyInA");
    await expect(b.getTopicName(-100123, 42)).resolves.toBeUndefined();
  });

  it("keeps separate scopes within one instance", async () => {
    const { openStore } = installMemoryStores();
    const cache = new TopicNameCache({ openStore });
    await cache.updateTopicName(-100123, 42, { name: "Deployments" }, "first");
    await cache.updateTopicName(-200456, 84, { name: "Incidents" }, "second");
    await expect(cache.getTopicName(-100123, 42, "first")).resolves.toBe("Deployments");
    await expect(cache.getTopicName(-200456, 84, "second")).resolves.toBe("Incidents");
    // Cross-scope isolation.
    await expect(cache.getTopicName(-100123, 42, "second")).resolves.toBeUndefined();
  });

  it("listTopicNames returns topics for a chat sorted by name", async () => {
    const { openStore } = installMemoryStores();
    const cache = new TopicNameCache({ openStore });
    await cache.updateTopicName(-100123, 42, { name: "Zebras" });
    await cache.updateTopicName(-100123, 10, { name: "Alpha" });
    await cache.updateTopicName(-100123, 99, { name: "Middle" });
    await expect(cache.listTopicNames(-100123)).resolves.toEqual([
      { threadId: "10", name: "Alpha", updatedAt: expect.any(Number) },
      { threadId: "99", name: "Middle", updatedAt: expect.any(Number) },
      { threadId: "42", name: "Zebras", updatedAt: expect.any(Number) },
    ]);
  });

  it("evicts oldest entries within the injected cache", async () => {
    const { stores, openStore } = installMemoryStores();
    const cache = new TopicNameCache({ openStore });
    for (let i = 0; i < 2049; i++) {
      await cache.updateTopicName(-100000, i, { name: `Topic ${i}` });
    }
    const total = Array.from(stores.values(), (m) => m.size).reduce((s, n) => s + n, 0);
    expect(total).toBe(2048);
    await expect(cache.getTopicName(-100000, 0)).resolves.toBeUndefined();
    await expect(cache.getTopicName(-100000, 2048)).resolves.toBe("Topic 2048");
  });

  it("falls back to the runtime openKeyedStore when no injection provided", async () => {
    clearTelegramRuntimeForTest();
    const cache = new TopicNameCache();
    // Without a runtime installed, hydrate is lazy; operations that touch the
    // store gracefully throw rather than crash on a missing runtime.
    await expect(cache.updateTopicName(-1, 1, { name: "X" })).rejects.toThrow();
  });
});
