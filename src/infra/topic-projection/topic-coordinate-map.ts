/**
 * Pure Live Topic Coordinate Map & Lazy Fuzzy Resolver.
 * Generates semantic Hickey keys and provides instant fuzzy lookup for agent accessibility.
 *
 * @dft
 * - A1 / A2: Zero I/O, deterministic indexing and fuzzy matching.
 */

import type {
  HickeyTopicCoordinateMap,
  TopicCoordinateNode,
  TopicLookupMatch,
  TopicLookupResult,
} from "./types.js";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/**
 * Builds a semantic Hickey key from topic metadata.
 */
export function buildTopicHickeyKey(
  topicId: string | number,
  archetype: string,
  name: string,
): string {
  return `telegram.supergroup.topics.${topicId}.${slugify(archetype)}.${slugify(name)}`;
}

/**
 * Builds a complete Hickey Topic Coordinate Map from a list of topic nodes.
 */
export function buildHickeyTopicMap(
  rawNodes: readonly Omit<TopicCoordinateNode, "hickeyKey">[],
): HickeyTopicCoordinateMap {
  const nodes: TopicCoordinateNode[] = rawNodes.map((n) => ({
    ...n,
    hickeyKey: buildTopicHickeyKey(n.topicId, n.archetype, n.name),
  }));

  let totalTokensAcrossTopics = 0;
  let totalSNR = 0;

  for (const node of nodes) {
    totalTokensAcrossTopics += node.totalTokens;
    totalSNR += node.snrPercentage;
  }

  const averageSNRPercentage =
    nodes.length > 0 ? Math.round(totalSNR / nodes.length) : 100;

  const header = "| ID | Topic Name | Archetype | Turns | Tokens | SNR% | Status |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |";
  const rows = nodes.map(
    (n) =>
      `| \`${n.topicId}\` | **${n.name}** | \`${n.archetype}\` | ${n.turnCount} | ${n.totalTokens.toLocaleString()} | ${n.snrPercentage}% | \`${n.status}\` |`,
  );

  const renderedTableMarkdown = `🗺️ **LIVE HICKEY TOPIC COORDINATE MAP** (${nodes.length} Topics)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${header}\n${rows.join("\n")}\n\n*Total Context Footprint: ${totalTokensAcrossTopics.toLocaleString()} tokens  │  Avg SNR: ${averageSNRPercentage}%*`;

  return {
    nodes: Object.freeze(nodes),
    totalTopics: nodes.length,
    totalTokensAcrossTopics,
    averageSNRPercentage,
    renderedTableMarkdown,
  };
}

/**
 * Lazy fuzzy lookup resolving topic IDs from names, keywords, or Hickey keys.
 */
export function lookupTopicCoordinates(
  query: string,
  map: HickeyTopicCoordinateMap,
): TopicLookupResult {
  const cleanQuery = query.trim().toLowerCase();
  const matches: TopicLookupMatch[] = [];

  for (const node of map.nodes) {
    const idStr = String(node.topicId);
    const nameLower = node.name.toLowerCase();
    const hickeyLower = node.hickeyKey.toLowerCase();

    let confidence = 0;

    if (idStr === cleanQuery) {
      confidence = 1.0;
    } else if (nameLower === cleanQuery) {
      confidence = 0.95;
    } else if (hickeyLower === cleanQuery) {
      confidence = 0.90;
    } else if (nameLower.startsWith(cleanQuery)) {
      confidence = 0.85;
    } else if (nameLower.includes(cleanQuery)) {
      confidence = 0.75;
    } else if (hickeyLower.includes(cleanQuery)) {
      confidence = 0.65;
    }

    if (confidence > 0.5) {
      matches.push({
        topicId: node.topicId,
        name: node.name,
        hickeyKey: node.hickeyKey,
        matchConfidence: confidence,
        quickTarget: String(node.topicId),
      });
    }
  }

  matches.sort((a, b) => b.matchConfidence - a.matchConfidence);

  return {
    query,
    matches: Object.freeze(matches),
  };
}
