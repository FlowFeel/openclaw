/**
 * `topic_query` Tool — Executes 0ms indexed relational SQL queries to fetch specific section Markdown from target topic surfaces.
 * Zero JSON, zero transcript bloat (< 100 tokens).
 */

import { TopicSectionStore } from "../../infra/topic-section-store.js";

export type TopicQueryParams = {
  targetTopic: string;
  /** Section name (e.g. "Active Decisions"). Ignored when sectionCoordinate is set. */
  section?: string;
  /** 1-based H2 ordinal of the target section, e.g. ":2" (canonical surface order). */
  sectionCoordinate?: string;
  /** Workspace dir for coordinate resolution against the surface sidecar. */
  workspaceDir?: string;
};

export type TopicQueryResult = {
  success: boolean;
  topicKey: string;
  sectionName: string;
  contentMd: string;
};

export function executeTopicQuery(
  params: TopicQueryParams,
  store?: TopicSectionStore,
): TopicQueryResult {
  const effectiveStore = store ?? new TopicSectionStore();
  const targetTopic = params.targetTopic.trim();

  let targetSection = params.section?.trim() || "Active Decisions";
  if (params.sectionCoordinate) {
    const resolved = effectiveStore.resolveSectionNameByCoordinate(
      targetTopic,
      params.sectionCoordinate.trim(),
      params.workspaceDir,
    );
    if (resolved === null) {
      return {
        success: false,
        topicKey: targetTopic,
        sectionName: params.sectionCoordinate.trim(),
        contentMd: `No section at coordinate "${params.sectionCoordinate.trim()}" for topic "${targetTopic}".`,
      };
    }
    targetSection = resolved;
  }

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
