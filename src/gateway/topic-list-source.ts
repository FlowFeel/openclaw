// Channel-neutral topic-list source contract shared by the gateway tool wrapper
// and the channel adapters (e.g. Telegram) that back the list_topics tool.
import type { ResolveTopicsProvider } from "../agents/tools/list-topics-tool.js";

/** Resolves the known topics (message threads) for a forum/group chat. */
export type ResolveTopicNamesFn = ResolveTopicsProvider;

/** Channel topic-index bridge supplied by a channel adapter. */
export type ChannelTopicsSource = {
  environment: string;
  chatId: string;
  scope?: string;
  resolveTopics: ResolveTopicNamesFn;
};