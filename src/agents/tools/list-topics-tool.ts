/**
 * list_topics built-in tool.
 *
 * Lists the known topics (message threads) for the current forum/group from the
 * topic-index layer, so an agent can discover sibling topics and know what rooms
 * exist in a federated multi-topic deployment. Channel-neutral: the topics are
 * resolved through an injected `resolveTopics` provider (wired by the channel
 * adapter, e.g. Telegram's topic-name-cache `listTopicNames`).
 */
import { Type } from "typebox";
import type { AnyAgentTool } from "./common.js";
import { asToolParamsRecord, jsonResult, readStringParam } from "./common.js";

/** A topic listing entry (channel-neutral shape). */
export type ListTopicsEntry = {
  threadId: string;
  name: string;
  closed?: boolean;
};

const ListTopicsInputSchema = Type.Object({
  /** Optional substring filter on topic name (case-insensitive). */
  query: Type.Optional(Type.String()),
  /** Include closed topics in the listing. Defaults to true. */
  include_closed: Type.Optional(Type.Boolean()),
});
const ListTopicsOutputSchema = Type.Object(
  {
    chat_id: Type.String(),
    environment: Type.String(),
    topics: Type.Array(
      Type.Object(
        {
          thread_id: Type.String(),
          name: Type.String(),
          closed: Type.Optional(Type.Boolean()),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export type ResolveTopicsProvider = (
  chatId: string,
  scope?: string,
) => Promise<ListTopicsEntry[]>;

export function createListTopicsTool(opts: {
  /** Channel identifier, e.g. "telegram". */
  environment: string;
  /** Forum/group chat id whose topics are listed. */
  chatId: string;
  /** Topic-index scope (e.g. telegram store path). Optional. */
  scope?: string;
  /** Resolves topics for the given chat from the topic-index layer. */
  resolveTopics: ResolveTopicsProvider;
}): AnyAgentTool {
  return {
    label: "Topics",
    name: "list_topics",
    description:
      'List the known topics (message threads) in the current forum/group. Returns each topic\'s canonical thread id and name so you can discover sibling rooms, route cross-topic messages to the right thread id, and reference topic context. Optional "query" filters by name; "include_closed" defaults to true.',
    parameters: ListTopicsInputSchema,
    outputSchema: ListTopicsOutputSchema,
    execute: async (_toolCallId, params) => {
      const raw = asToolParamsRecord(params);
      const query = readStringParam(raw, "query");
      const includeClosed =
        typeof raw["include_closed"] === "boolean" ? raw["include_closed"] : true;
      const topics = await opts.resolveTopics(opts.chatId, opts.scope);
      const filtered = topics
        .filter((t) => (query ? t.name.toLowerCase().includes(query.toLowerCase()) : true))
        .filter((t) => includeClosed || t.closed !== true)
        .map((t) => ({
          thread_id: t.threadId,
          name: t.name,
          ...(t.closed !== undefined ? { closed: t.closed } : {}),
        }))
        .toSorted((a, b) => a.name.localeCompare(b.name));
      return jsonResult({
        chat_id: opts.chatId,
        environment: opts.environment,
        topics: filtered,
      });
    },
  };
}