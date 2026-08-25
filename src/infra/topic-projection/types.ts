/**
 * Pure Types for Topic Governance, Care Package Seeding & Cross-Topic Projections.
 *
 * @dft
 * - A1 / A2: Pure mathematical definitions, zero I/O, deterministic formatting.
 */

import type { TurnMessage } from "../tokenomics/types.js";

export type TopicArchetype =
  | "refactor_sprint"
  | "incident_remediation"
  | "research_spike"
  | "feature_delivery";

export type ProjectionMode =
  | "milestone"
  | "decisions"
  | "artifact_diff"
  | "full_signal";

export interface CarePackageInput {
  readonly name: string;
  readonly archetype: TopicArchetype;
  readonly mission: string;
  readonly referencePaths?: readonly string[];
  readonly initialTasks?: readonly string[];
  readonly chatId: string | number;
}

export interface CarePackageResult {
  readonly topicName: string;
  readonly telegramCardMarkdown: string;
  readonly sessionBootstrapPrompt: string;
  readonly iconColorHex: number;
  readonly estimatedTokens: number;
}

export interface TopicProjectionInput {
  readonly sourceTopicId: string | number;
  readonly sourceTopicName: string;
  readonly turns: readonly TurnMessage[];
  readonly mode: ProjectionMode;
  readonly chatId: string | number;
}

export interface TopicProjectionResult {
  readonly sourceTopicId: string | number;
  readonly sourceTopicName: string;
  readonly mode: ProjectionMode;
  readonly telegramCardMarkdown: string;
  readonly sessionInjectionContext: string;
  readonly extractedTokenCount: number;
  readonly snrPercentage: number;
  readonly deepLinkUrl: string;
}

export interface TopicCoordinateNode {
  readonly topicId: string | number;
  readonly name: string;
  readonly sessionKey: string;
  readonly hickeyKey: string;
  readonly archetype: TopicArchetype;
  readonly turnCount: number;
  readonly totalTokens: number;
  readonly snrPercentage: number;
  readonly status: "active" | "compacted" | "closed";
  readonly lastActivityTimestamp: number;
}

export interface HickeyTopicCoordinateMap {
  readonly nodes: readonly TopicCoordinateNode[];
  readonly totalTopics: number;
  readonly totalTokensAcrossTopics: number;
  readonly averageSNRPercentage: number;
  readonly renderedTableMarkdown: string;
}

export interface TopicLookupMatch {
  readonly topicId: string | number;
  readonly name: string;
  readonly hickeyKey: string;
  readonly matchConfidence: number;
  readonly quickTarget: string;
}

export interface TopicLookupResult {
  readonly query: string;
  readonly matches: readonly TopicLookupMatch[];
}
