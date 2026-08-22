// Channel topics bridge adapter connecting Telegram topic name cache to core list_topics tool.
import type { ChannelTopicsSource } from "../../src/gateway/topic-list-source.js";
import { listTopicNames, resolveTopicNameCacheScope } from "./topic-name-cache.js";

export type CreateTelegramChannelTopicsParams = {
  chatId: string | number;
  environment?: string;
  storePath?: string;
  scope?: string;
};

/**
 * Creates a {@link ChannelTopicsSource} for Telegram chats that bridges the core `list_topics`
 * tool to Telegram's topic-name cache.
 */
export function createTelegramChannelTopics(
  params: CreateTelegramChannelTopicsParams,
): ChannelTopicsSource {
  const scope =
    params.scope ??
    (params.storePath ? resolveTopicNameCacheScope(params.storePath) : undefined);

  return {
    environment: params.environment ?? "telegram",
    chatId: String(params.chatId),
    scope,
    resolveTopics: async (chatId, resolvedScope) => {
      const items = await listTopicNames(chatId, resolvedScope);
      return items.map((item) => ({
        threadId: item.threadId,
        name: item.name,
        closed: item.closed,
      }));
    },
  };
}
