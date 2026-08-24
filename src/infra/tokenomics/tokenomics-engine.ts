/**
 * @dft:axiom A1, A2
 * Pure Canonical Tokenomics Engine Factory
 */

import {
  TokenomicsConfig,
  TurnMessage,
  SNRReport,
  CompactionYieldReport,
  NoiseSource,
  BudgetBreakdown,
  ChannelHistoryEntry,
} from "./types.js";
import { calculateSNR } from "./snr-calculator.js";
import { computeCompactionYield, YieldCalculationInput } from "./compaction-yield.js";
import { identifyNoiseSources } from "./noise-source-classifier.js";
import { partitionTokenBudget, ContextItem } from "./token-budget-partitioner.js";
import { ChannelHistoryStore } from "./channel-history-store.js";
import { sliceArchivedSegment, RetransmitResult } from "./retransmission-slicer.js";

export interface TokenomicsEngine {
  calculateSNR(turns: TurnMessage[]): SNRReport;
  evaluateYield(input: YieldCalculationInput): CompactionYieldReport;
  identifyNoise(turns: TurnMessage[], topN?: number): NoiseSource[];
  partitionBudget(items: ContextItem[]): BudgetBreakdown;
  sliceArchive(archiveText: string, query: string, maxTokens?: number): RetransmitResult;
  recordEvent(event: Omit<ChannelHistoryEntry, "timestamp"> & { timestamp?: number }): ChannelHistoryEntry;
  getHistory(): readonly ChannelHistoryEntry[];
  renderHistoryMarkdown(): string;
}

export function createTokenomicsEngine(
  config: TokenomicsConfig = {},
  initialHistory: ChannelHistoryEntry[] = []
): TokenomicsEngine {
  const clock = config.clock ?? { now: () => Date.now() };
  const historyStore = new ChannelHistoryStore(
    initialHistory,
    clock,
    config.maxHistoryEntries ?? 100
  );

  return {
    calculateSNR: (turns: TurnMessage[]) => calculateSNR(turns),
    evaluateYield: (input: YieldCalculationInput) => computeCompactionYield(input),
    identifyNoise: (turns: TurnMessage[], topN: number = 3) => identifyNoiseSources(turns, topN),
    partitionBudget: (items: ContextItem[]) => partitionTokenBudget(items),
    sliceArchive: (archiveText: string, query: string, maxTokens?: number) =>
      sliceArchivedSegment(archiveText, query, maxTokens ?? config.retransmitBudgetTokens),
    recordEvent: (event) => historyStore.record(event),
    getHistory: () => historyStore.getHistory(),
    renderHistoryMarkdown: () => historyStore.renderMarkdown(),
  };
}
