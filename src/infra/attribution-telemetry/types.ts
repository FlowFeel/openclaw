/**
 * Domain Types & Schemas for Attribution Telemetry & Tool Intelligence.
 * Goldilocks decomposition unit (< 100 LOC).
 */

export interface TurnLatencyRecord {
  readonly id: string;
  readonly sessionKey: string;
  readonly timestamp: number;
  readonly model?: string;
  readonly promptTokens: number;
  readonly completionTokens: number;
  readonly totalTokens: number;
  readonly wallClockMs: number;
  readonly queueDwellMs: number;
  readonly modelInferenceMs: number;
  readonly cacheHit: boolean;
  readonly compactionFired?: boolean;
  readonly fallbackFired?: boolean;
}

export interface QueueDwellRecord {
  readonly messageId: string;
  readonly sessionKey: string;
  readonly enqueuedAt: number;
  readonly dequeuedAt: number;
  readonly queueDwellMs: number;
}

export interface ToolCallTelemetryEvent {
  readonly id: string;
  readonly timestamp: number;
  readonly sessionKey: string;
  readonly toolName: string;
  readonly parameters: Record<string, unknown>;
  readonly durationMs: number;
  readonly status: "ok" | "error";
  readonly resultSummary: string;
  readonly searchMeta?: {
    readonly query: string;
    readonly resultCount: number;
    readonly domains: readonly string[];
  };
}

export interface ResourceAttributionRecord {
  readonly sessionKey: string;
  readonly timestamp: number;
  readonly transcriptBytes: number;
  readonly logBytesDelta: number;
  readonly memoryAllocMb: number;
}

export interface ConcurrencyTimeSeriesPoint {
  readonly timestamp: number;
  readonly activeSessions: number;
  readonly inFlightTurns: number;
  readonly meanQueueDwellMs: number;
}

export interface ChannelQueueDepthRecord {
  readonly channelId: string;
  readonly pendingMessages: number;
  readonly ingressRatePerMin: number;
  readonly lastEnqueuedAt: number;
}

export interface SessionPerformanceBreakdown {
  readonly sessionKey: string;
  readonly turnCount: number;
  readonly meanLatencyMs: number;
  readonly p95LatencyMs: number;
  readonly cacheHitRatio: number;
  readonly totalTokens: number;
  readonly promptTokens: number;
  readonly completionTokens: number;
  readonly transcriptBytes?: number;
  readonly accumulatedLogGrowth?: number;
}

export interface ConcurrencySnapshot {
  readonly activeSessions: number;
  readonly meanQueueDwellMs: number;
  readonly p95QueueDwellMs: number;
  readonly contentionDragIndex: number;
  readonly timeSeries?: readonly ConcurrencyTimeSeriesPoint[];
}

export interface FleetCacheSummary {
  readonly fleetPromptCacheHitRatio: number;
  readonly totalTurnsSampled: number;
  readonly meanIncrementalTokenCost: number;
  readonly classification: "HIGH_REUSE" | "MODERATE_REUSE" | "COLD_INFERENCE_HEAVY";
}
