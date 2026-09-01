/**
 * Core Domain Types & Frame Schemas for Live Telemetry Bus.
 * Goldilocks decomposition unit (< 100 LOC).
 */

import type { TranscriptPerSourceBreakdown } from "../../agents/tools/session-status/transcript-usage.js";

export interface InFlightChainMetrics {
  readonly callsUsed: number;
  readonly callsLimit: number;
  readonly spread: number;
  readonly score: number;
  readonly tier: "Diamond" | "Gold" | "Silver" | "Bronze";
  readonly runwaySecondsLeft: number;
  readonly inFlightBudgetExhausted: boolean;
}

export interface Frame1Position {
  readonly usedTokens: number;
  readonly limitTokens: number;
  readonly headroomTokens: number;
  readonly capacityPct: number;
  readonly snrScore: number;
  readonly isForeclosureImminent: boolean;
  readonly breakdown: TranscriptPerSourceBreakdown;
  readonly chainMetrics?: InFlightChainMetrics;
}

export interface PlatformReleaseFrame {
  readonly version: string;
  readonly deployedAt: string;
  readonly recentChangelog: readonly string[];
}

export interface LiveTelemetrySnapshot {
  readonly F1: Frame1Position;
  readonly F2: {
    readonly totalCompactionEvents: number;
    readonly lastEvent?: unknown;
  };
  readonly F3: {
    readonly activeRoute: string;
    readonly reason: string;
  };
  readonly F4: {
    readonly inContextTurnsCount: number;
    readonly coldArchiveCount: number;
  };
  readonly platform: PlatformReleaseFrame;
}
