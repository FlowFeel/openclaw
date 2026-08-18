// Telegram plugin module implements topic name cache behavior.
import { createHash } from "node:crypto";
import { readJsonFileWithFallback } from "openclaw/plugin-sdk/json-store";
import { getTelegramRuntime } from "./runtime.js";

export const TELEGRAM_TOPIC_NAME_CACHE_MAX_ENTRIES = 2_048;
const STORE_NAMESPACE_PREFIX = "telegram.topic-name-cache";
const DEFAULT_TOPIC_NAME_CACHE_SCOPE = "default";

export type TopicNameEntry = {
  name: string;
  iconColor?: number;
  iconCustomEmojiId?: string;
  closed?: boolean;
  updatedAt: number;
};

/** A topic listing entry returned by {@link listTopicNames}. */
export type TopicListing = {
  threadId: string;
  name: string;
  closed?: boolean;
  updatedAt: number;
};

type TopicNameStore = Map<string, TopicNameEntry>;

type TopicNameStoreState = {
  lastUpdatedAt: number;
  store: TopicNameStore;
  hydrated: boolean;
  hydratePromise?: Promise<void>;
  persistentStore: TopicNamePersistentStore;
};

type TopicNameCacheState = {
  stores: Map<string, TopicNameStoreState>;
};

/** Persistent keyed store contract used by {@link TopicNameCache}. */
export type TopicNamePersistentStore = {
  register(key: string, value: TopicNameEntry): Promise<void>;
  entries(): Promise<Array<{ key: string; value: TopicNameEntry }>>;
  delete(key: string): Promise<boolean>;
  clear(): Promise<void>;
};

/**
 * Opens a persistent store for a topic-name cache namespace.
 *
 * Default impler uses the active Telegram runtime's `openKeyedStore`. Provided
 * as a separate type so @link TopicNameCache can be constructed with a DI-injected
 * provider in tests or federation contexts.
 */
export type OpenTopicNameStore = (namespace: string) => TopicNamePersistentStore;

function openRuntimeTopicNameStore(namespace: string): TopicNamePersistentStore {
  return getTelegramRuntime().state.openKeyedStore<TopicNameEntry>({
    namespace,
    maxEntries: TELEGRAM_TOPIC_NAME_CACHE_MAX_ENTRIES,
  });
}

function createTopicNameStore(): TopicNameStore {
  return new Map<string, TopicNameEntry>();
}

function createTopicNameStoreState(
  openStore: OpenTopicNameStore,
  namespace: string,
): TopicNameStoreState {
  return {
    lastUpdatedAt: 0,
    store: createTopicNameStore(),
    hydrated: false,
    persistentStore: openStore(namespace),
  };
}

function cacheKey(chatId: number | string, threadId: number | string): string {
  return `${chatId}:${threadId}`;
}

function namespaceForScope(scope: string): string {
  const hash = createHash("sha256").update(scope).digest("hex").slice(0, 16);
  return `${STORE_NAMESPACE_PREFIX}.${hash}`;
}

function evictOldest(store: TopicNameStore): string | undefined {
  if (store.size <= TELEGRAM_TOPIC_NAME_CACHE_MAX_ENTRIES) {
    return undefined;
  }
  let oldestKey: string | undefined;
  let oldestTime = Infinity;
  for (const [key, entry] of store) {
    if (entry.updatedAt < oldestTime) {
      oldestTime = entry.updatedAt;
      oldestKey = key;
    }
  }
  if (oldestKey) {
    store.delete(oldestKey);
  }
  return oldestKey;
}

function isTopicNameEntry(value: unknown): value is TopicNameEntry {
  if (!value || typeof value !== "object") {
    return false;
  }
  const entry = value as Partial<TopicNameEntry>;
  return (
    typeof entry.name === "string" &&
    entry.name.length > 0 &&
    typeof entry.updatedAt === "number" &&
    Number.isFinite(entry.updatedAt)
  );
}

async function hydrateTopicStoreState(state: TopicNameStoreState): Promise<void> {
  if (state.hydrated) {
    return;
  }
  if (state.hydratePromise) {
    await state.hydratePromise;
    return;
  }
  state.hydratePromise = (async () => {
    const entries = await state.persistentStore.entries();
    for (const { key, value } of entries) {
      if (isTopicNameEntry(value)) {
        state.store.set(key, value);
      }
    }
    state.lastUpdatedAt = Math.max(
      0,
      ...Array.from(state.store.values(), (entry) => entry.updatedAt),
    );
    state.hydrated = true;
  })().finally(() => {
    state.hydratePromise = undefined;
  });
  await state.hydratePromise;
}

/**
 * A dependency-injectable topic name cache.
 *
 * Wraps the topic-name cache in a class so callers can construct an isolated
 * instance (e.g. one per federation/topic index) with a caller-supplied
 * persistent store factory. When no factory is supplied, the default uses the
 * active Telegram runtime's `openKeyedStore`.
 *
 * The module-level functions in this file are thin facades over a process-local
 * default instance for backwards compatibility.
 */
export class TopicNameCache {
  private readonly state: TopicNameCacheState;
  private readonly openStore: OpenTopicNameStore;

  constructor(options: { openStore?: OpenTopicNameStore } = {}) {
    this.state = { stores: new Map() };
    this.openStore = options.openStore ?? openRuntimeTopicNameStore;
  }

  private getStoreState(scope?: string): TopicNameStoreState {
    const stateKey = scope ?? DEFAULT_TOPIC_NAME_CACHE_SCOPE;
    const existing = this.state.stores.get(stateKey);
    if (existing) {
      return existing;
    }
    const next = createTopicNameStoreState(this.openStore, namespaceForScope(stateKey));
    this.state.stores.set(stateKey, next);
    return next;
  }

  private nextUpdatedAt(scope?: string): number {
    const storeState = this.getStoreState(scope);
    const now = Date.now();
    storeState.lastUpdatedAt = now > storeState.lastUpdatedAt ? now : storeState.lastUpdatedAt + 1;
    return storeState.lastUpdatedAt;
  }

  async updateTopicName(
    chatId: number | string,
    threadId: number | string,
    patch: Partial<Omit<TopicNameEntry, "updatedAt">>,
    scope?: string,
  ): Promise<void> {
    const storeState = this.getStoreState(scope);
    await hydrateTopicStoreState(storeState);
    const key = cacheKey(chatId, threadId);
    const existing = storeState.store.get(key);
    const iconColor = patch.iconColor ?? existing?.iconColor;
    const iconCustomEmojiId = patch.iconCustomEmojiId ?? existing?.iconCustomEmojiId;
    const closed = patch.closed ?? existing?.closed;
    const merged: TopicNameEntry = {
      name: patch.name ?? existing?.name ?? "",
      updatedAt: this.nextUpdatedAt(scope),
      ...(iconColor !== undefined ? { iconColor } : {}),
      ...(iconCustomEmojiId !== undefined ? { iconCustomEmojiId } : {}),
      ...(closed !== undefined ? { closed } : {}),
    };
    if (!merged.name) {
      return;
    }
    storeState.store.set(key, merged);
    await storeState.persistentStore.register(key, merged);
    const evictedKey = evictOldest(storeState.store);
    if (evictedKey) {
      await storeState.persistentStore.delete(evictedKey);
    }
  }

  async getTopicName(
    chatId: number | string,
    threadId: number | string,
    scope?: string,
  ): Promise<string | undefined> {
    const storeState = this.getStoreState(scope);
    await hydrateTopicStoreState(storeState);
    const key = cacheKey(chatId, threadId);
    const entry = storeState.store.get(key);
    if (entry) {
      entry.updatedAt = this.nextUpdatedAt(scope);
      await storeState.persistentStore.register(key, entry);
    }
    return entry?.name;
  }

  /** Lists all known topics for a forum (chat). Returns entries sorted by name. */
  async listTopicNames(chatId: number | string, scope?: string): Promise<TopicListing[]> {
    const storeState = this.getStoreState(scope);
    await hydrateTopicStoreState(storeState);
    const prefix = `${chatId}:`;
    return Array.from(storeState.store.entries())
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, entry]) => ({
        threadId: key.slice(prefix.length),
        name: entry.name,
        ...(entry.closed !== undefined ? { closed: entry.closed } : {}),
        updatedAt: entry.updatedAt,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
}

// ---- Module-level facade API (backwards compatible) ----

let defaultTopicNameCache: TopicNameCache | undefined;

function getDefaultTopicNameCache(): TopicNameCache {
  if (!defaultTopicNameCache) {
    defaultTopicNameCache = new TopicNameCache();
  }
  return defaultTopicNameCache;
}

/** Resets the process-local default facade instance (test support). */
export function resetTopicNameCacheForTest(): void {
  defaultTopicNameCache = undefined;
}

export async function updateTopicName(
  chatId: number | string,
  threadId: number | string,
  patch: Partial<Omit<TopicNameEntry, "updatedAt">>,
  scope?: string,
): Promise<void> {
  return getDefaultTopicNameCache().updateTopicName(chatId, threadId, patch, scope);
}

export async function getTopicName(
  chatId: number | string,
  threadId: number | string,
  scope?: string,
): Promise<string | undefined> {
  return getDefaultTopicNameCache().getTopicName(chatId, threadId, scope);
}

/** Lists all known topics for a forum (chat). Returns entries sorted by name. */
export async function listTopicNames(
  chatId: number | string,
  scope?: string,
): Promise<TopicListing[]> {
  return getDefaultTopicNameCache().listTopicNames(chatId, scope);
}

export function resolveTopicNameCachePath(storePath: string): string {
  return `${storePath}.telegram-topic-names.json`;
}

export function resolveTopicNameCacheScope(storePath: string): string {
  return storePath;
}

export function resolveTopicNameCacheNamespace(scope: string): string {
  return namespaceForScope(scope);
}

export async function listTelegramLegacyTopicNameCacheEntries(params: {
  persistedPath: string;
  maxEntries?: number;
}): Promise<Array<{ key: string; value: TopicNameEntry }>> {
  const { value } = await readJsonFileWithFallback<Record<string, unknown>>(
    params.persistedPath,
    {},
  );
  return Object.entries(value)
    .filter((entry): entry is [string, TopicNameEntry] => isTopicNameEntry(entry[1]))
    .toSorted(([, left], [, right]) => right.updatedAt - left.updatedAt)
    .slice(0, params.maxEntries ?? TELEGRAM_TOPIC_NAME_CACHE_MAX_ENTRIES)
    .map(([key, entry]) => ({ key, value: entry }));
}
