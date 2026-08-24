/**
 * @dft:axiom A1, A2
 * Pure Shannon-Weaver Tokenomics Types & Invariant Constants
 */

export const SNR_NOMINAL_PERCENT = 70;
export const SNR_WARNING_PERCENT = 50;
export const SNR_CRITICAL_PERCENT = 40;
export const MAX_OSR_LIMIT = 0.10; // Overhead-Savings Ratio <= 1:10
export const DEFAULT_RETRANSMIT_BUDGET_TOKENS = 2048;

export type SNRTier = "nominal" | "warning" | "critical";

export type NoiseCategory =
  | "heartbeat"
  | "duplicate_tool_output"
  | "self_correction_retraction"
  | "user_retread"
  | "social_padding"
  | "chaff";

export interface TurnMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  tokens?: number;
  toolCallId?: string;
  name?: string;
}

export interface SNRReport {
  totalTokens: number;
  signalTokens: number;
  noiseTokens: number;
  snrPercent: number; // 0 - 100
  tier: SNRTier;
  isAdequate: boolean;
  recommendation: string;
}

export interface CompactionYieldReport {
  tokensBefore: number;
  tokensAfter: number;
  bytesBefore: number;
  bytesAfter: number;
  snrBefore: number;
  snrAfter: number;
  tokenReductionPercent: number;
  byteReductionPercent: number;
  snrDeltaPoints: number;
  summary: string;
}

export interface NoiseSource {
  category: NoiseCategory;
  tokens: number;
  percentageOfContext: number;
  description: string;
}

export interface TokenBudgetCategory {
  name: string;
  tokens: number;
  percentage: number;
}

export interface BudgetBreakdown {
  totalTokens: number;
  accountedTokens: number;
  coveragePercent: number;
  categories: TokenBudgetCategory[];
}

export interface ChannelHistoryEntry {
  event: "compaction" | "bandwidth_change" | "retransmission" | "reset";
  tokensBefore: number;
  tokensAfter: number;
  bytesBefore: number;
  bytesAfter: number;
  snrBefore: number;
  snrAfter: number;
  yieldPercent: number;
  timestamp: number;
  note?: string;
}

export interface TokenomicsClock {
  now(): number;
}

export interface TokenomicsConfig {
  snrThresholdPercent?: number;
  retransmitBudgetTokens?: number;
  maxHistoryEntries?: number;
  clock?: TokenomicsClock;
}
