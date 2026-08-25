/**
 * Pure Types for the Turn Context Budget Envelope Subsystem.
 *
 * @dft
 * - A1 / A2: Pure mathematical types, zero I/O, deterministic budget calculation.
 */

import type { SNRTier, TurnMessage } from "../tokenomics/types.js";

export interface ContextEnvelopeOptions {
  readonly maxContextTokens: number;
  readonly reservedResponseTokens: number;
  readonly snrWarningThresholdPercent?: number;
  readonly enableProactiveCues?: boolean;
}

export interface TurnCompressionSummary {
  readonly turnsBefore: number;
  readonly turnsAfter: number;
  readonly tokensBefore: number;
  readonly tokensAfter: number;
  readonly compactedTurnCount: number;
  readonly freedTokens: number;
}

export interface ResolvedContextEnvelope {
  readonly turns: readonly TurnMessage[];
  readonly totalTokens: number;
  readonly snrPercent: number;
  readonly tier: SNRTier;
  readonly promptCue?: string;
  readonly compressionSummary?: TurnCompressionSummary;
  readonly isWithinBudget: boolean;
}
