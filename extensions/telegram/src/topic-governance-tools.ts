/**
 * Certified Telegram Topic Governance Tools.
 *
 * @dft:axiom A5 (Certified Tool Arity k <= 2)
 * Pure, accessible topic lifecycle, live Hickey map, Care Package seeding, and cross-topic injection tools.
 */

import {
  buildHickeyTopicMap,
  buildTopicCarePackage,
  extractTopicProjection,
  lookupTopicCoordinates,
  type CarePackageInput,
  type HickeyTopicCoordinateMap,
  type TopicCoordinateNode,
  type TopicLookupResult,
  type TopicProjectionInput,
} from "../../src/infra/topic-projection/index.js";

// Global in-memory active topic registry
let activeTopicNodes: TopicCoordinateNode[] = [
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
];

export function setActiveTopicNodes(nodes: TopicCoordinateNode[]): void {
  activeTopicNodes = [...nodes];
}

export function getActiveTopicMap(): HickeyTopicCoordinateMap {
  return buildHickeyTopicMap(activeTopicNodes);
}

/**
 * Certified Tool (k = 1)
 * Lazy fuzzy lookup of Telegram topics by name, keyword, or Hickey slug.
 */
export function telegram_topic_lookup(
  query: string,
  options?: { limit?: number },
): TopicLookupResult {
  const map = getActiveTopicMap();
  const res = lookupTopicCoordinates(query, map);
  if (options?.limit && options.limit > 0) {
    return {
      query: res.query,
      matches: res.matches.slice(0, options.limit),
    };
  }
  return res;
}

/**
 * Certified Tool (k = 1)
 * Renders the live semantic Hickey topic coordinate map board.
 */
export function telegram_topic_map(
  options?: { format?: "table" | "json" },
): { summary: string; totalTopics: number; totalTokens: number; avgSNR: number; map?: any } {
  const map = getActiveTopicMap();
  return {
    summary: map.renderedTableMarkdown,
    totalTopics: map.totalTopics,
    totalTokens: map.totalTokensAcrossTopics,
    avgSNR: map.averageSNRPercentage,
    ...(options?.format === "json" ? { map } : {}),
  };
}

/**
 * Certified Tool (k = 2)
 * Generates and seeds a Care Package briefing for a new topic.
 */
export function telegram_topic_seed(
  input: CarePackageInput,
): {
  ok: true;
  topicName: string;
  telegramCardMarkdown: string;
  sessionBootstrapPrompt: string;
  iconColorHex: number;
  estimatedTokens: number;
} {
  const pkg = buildTopicCarePackage(input);

  // Register in live topic nodes
  const nextId = activeTopicNodes.length + 10;
  activeTopicNodes.push({
    topicId: nextId,
    name: input.name,
    sessionKey: `agent:main:telegram:group:${input.chatId}:topic:${nextId}`,
    hickeyKey: `telegram.supergroup.topics.${nextId}.${input.archetype}.${input.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`,
    archetype: input.archetype,
    turnCount: 1,
    totalTokens: pkg.estimatedTokens,
    snrPercentage: 98,
    status: "active",
    lastActivityTimestamp: Date.now(),
  });

  return {
    ok: true,
    ...pkg,
  };
}

/**
 * Certified Tool (k = 2)
 * Injects a compressed live state projection from a source topic.
 */
export function telegram_topic_inject(
  input: TopicProjectionInput,
): {
  ok: true;
  sourceTopicId: string | number;
  sourceTopicName: string;
  telegramCardMarkdown: string;
  sessionInjectionContext: string;
  extractedTokens: number;
  snrPercentage: number;
} {
  const res = extractTopicProjection(input);
  return {
    ok: true,
    sourceTopicId: res.sourceTopicId,
    sourceTopicName: res.sourceTopicName,
    telegramCardMarkdown: res.telegramCardMarkdown,
    sessionInjectionContext: res.sessionInjectionContext,
    extractedTokens: res.extractedTokenCount,
    snrPercentage: res.snrPercentage,
  };
}
