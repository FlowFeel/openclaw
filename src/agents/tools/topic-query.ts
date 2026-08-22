/**
 * `topic_query` Tool — Executes 0ms indexed relational SQL queries to fetch specific section Markdown from target topic surfaces.
 * Zero JSON, zero transcript bloat (< 100 tokens).
 */

import { TopicSectionStore } from "../../infra/topic-section-store.js";

export type TopicQueryParams = {
  targetTopic: string;
  section?: string;
};

export type TopicQueryResult = {
  success: boolean;
  topicKey: string;
  sectionName: string;
  contentMd: string;
};

export function executeTopicQuery(params: TopicQueryParams, store?: TopicSectionStore): TopicQueryResult {
  const effectiveStore = store ?? new TopicSectionStore();
  const targetTopic = params.targetTopic.trim();
  const targetSection = params.section?.trim() || "Active Decisions";

  const contentMd = effectiveStore.getSection(targetTopic, targetSection);

  if (!contentMd) {
    return {
      success: false,
      topicKey: targetTopic,
      sectionName: targetSection,
      contentMd: `No section "${targetSection}" found for topic "${targetTopic}".`,
    };
  }

  return {
    success: true,
    topicKey: targetTopic,
    sectionName: targetSection,
    contentMd,
  };
}
