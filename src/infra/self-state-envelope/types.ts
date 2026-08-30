/**
 * Pure Types for Agent Self-State Envelope & Peek Query Subsystem.
 *
 * @dft
 * - A1 / A2: Zero I/O, deterministic types, and mathematical boundaries.
 */

import type { TurnMessage } from "../tokenomics/types.js";

export interface ToolCallBudgetSnapshot {
  readonly maxTurnsPerPrompt: number;
  readonly turnsRemaining: number;
  readonly reconLimit: number;
  readonly reconStatus: "active" | "exhausted" | "exceeded";
  readonly turnsUsed: number;
}

export interface Frame1Capacities {
  readonly maxTurnsPerPrompt: number;
  readonly defaultReconBudget: number;
  readonly maxFileIngestBytes: number;
  readonly stickyCwd: boolean;
  readonly specialRegisters: boolean;
}

export interface Frame1Recommended {
  readonly action: "continue" | "synthesize" | "grep_search";
  readonly reason: string;
}

export interface Frame1Headroom {
  readonly usedTokens: number;
  readonly limitTokens: number;
  readonly remainingTokens: number;
  readonly capacityPercentage: number;
  readonly snrPercentage: number;
  readonly toolCallBudget?: ToolCallBudgetSnapshot;
  readonly capacities?: Frame1Capacities;
  readonly recommended?: Frame1Recommended;
}

export interface CompactionEventRecord {
  readonly eventId: string;
  readonly timestamp: number;
  readonly triggerReason: "budget_ceiling" | "snr_threshold" | "agent_directive";
  readonly tokensBefore: number;
  readonly tokensAfter: number;
  readonly compressionRatio: number;
  readonly droppedTurnIds: readonly (string | number)[];
  readonly archiveRef: string;
  readonly droppedTurnsSummary?: string;
}

export interface Frame2CompactionLog {
  readonly totalCompactionEvents: number;
  readonly events: readonly CompactionEventRecord[];
  readonly lastEvent?: CompactionEventRecord;
}

export type RoutingMode =
  | "fits"
  | "truncate_tool_results"
  | "compact_only"
  | "stream_lean";

export interface Frame3Route {
  readonly activeRoute: RoutingMode;
  readonly requestedRoute?: RoutingMode;
  readonly reason: string;
}

export interface Frame4Memory {
  readonly hotTurnsCount: number;
  readonly warmDreamsBytes: number;
  readonly coldArchiveReferences: readonly string[];
}

export interface PlatformCapabilities {
  readonly version: string;
  readonly capabilities: readonly string[];
}

export interface SelfStateEnvelope {
  readonly F1: Frame1Headroom;
  readonly F2: Frame2CompactionLog;
  readonly F3: Frame3Route;
  readonly F4: Frame4Memory;
  readonly platform: PlatformCapabilities;
}

export interface EnvelopeResolverConfig {
  readonly modelLimitTokens?: number;
  readonly activeRoute?: RoutingMode;
  readonly requestedRoute?: RoutingMode;
  readonly platformVersion?: string;
  readonly capabilities?: readonly string[];
  readonly warmDreamsBytes?: number;
  readonly coldArchiveReferences?: readonly string[];
}
