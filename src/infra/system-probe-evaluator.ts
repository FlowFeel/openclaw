/**
 * Pure System Probe Evaluator — Zero-I/O health state classifier.
 *
 * Evaluates system metrics (heap, disk, event loop) against calibrated thresholds
 * to produce deterministic, discriminated health assessments for autonomous agents.
 *
 * @dft
 * - A1 (pure-io-separation): zero runtime I/O imports; accepts metrics struct, returns health struct.
 * - A2 (explicit-invariant-modeling): health state is a closed discriminated union.
 */

export type SystemProbeThresholds = {
  readonly heapWarningRatio: number;      // default: 0.75 (75%)
  readonly heapEmergencyRatio: number;    // default: 0.88 (88%)
  readonly eventLoopLagWarningMs: number; // default: 100ms
  readonly eventLoopLagCriticalMs: number;// default: 500ms
  readonly diskWarningPercent: number;    // default: 85 (85%)
  readonly diskCriticalPercent: number;   // default: 95 (95%)
};

export const DEFAULT_PROBE_THRESHOLDS: SystemProbeThresholds = {
  heapWarningRatio: 0.75,
  heapEmergencyRatio: 0.88,
  eventLoopLagWarningMs: 100,
  eventLoopLagCriticalMs: 500,
  diskWarningPercent: 85,
  diskCriticalPercent: 95,
};

export type SystemMetricsSnapshot = {
  readonly heap: {
    readonly usedBytes: number;
    readonly totalBytes: number;
    readonly limitBytes: number;
    readonly utilizationRatio: number;
  };
  readonly eventLoop: {
    readonly lagMs: number;
    readonly p95LagMs?: number;
  };
  readonly disk: {
    readonly usedPercent: number;
    readonly freeBytes: number;
    readonly totalBytes: number;
  };
  readonly activeSessions?: number;
  readonly gatewayVersion?: string;
  readonly activeProvider?: string;
  readonly activeModel?: string;
};

export type EvaluatedHealthState =
  | { readonly kind: "healthy" }
  | { readonly kind: "degraded"; readonly reason: string; readonly critical: boolean };

/**
 * Pure mathematical evaluator mapping system metrics to health state without I/O.
 */
export function evaluateSystemHealthState(
  metrics: SystemMetricsSnapshot,
  thresholds: SystemProbeThresholds = DEFAULT_PROBE_THRESHOLDS,
): EvaluatedHealthState {
  // 1. Heap emergency / warning check
  if (metrics.heap.utilizationRatio >= thresholds.heapEmergencyRatio) {
    return {
      kind: "degraded",
      reason: `heap_emergency: utilization ${(metrics.heap.utilizationRatio * 100).toFixed(1)}% >= ${(thresholds.heapEmergencyRatio * 100).toFixed(1)}%`,
      critical: true,
    };
  }
  if (metrics.heap.utilizationRatio >= thresholds.heapWarningRatio) {
    return {
      kind: "degraded",
      reason: `heap_warning: utilization ${(metrics.heap.utilizationRatio * 100).toFixed(1)}% >= ${(thresholds.heapWarningRatio * 100).toFixed(1)}%`,
      critical: false,
    };
  }

  // 2. Disk saturation check
  if (metrics.disk.usedPercent >= thresholds.diskCriticalPercent) {
    return {
      kind: "degraded",
      reason: `disk_critical: usage ${metrics.disk.usedPercent.toFixed(1)}% >= ${thresholds.diskCriticalPercent}%`,
      critical: true,
    };
  }
  if (metrics.disk.usedPercent >= thresholds.diskWarningPercent) {
    return {
      kind: "degraded",
      reason: `disk_warning: usage ${metrics.disk.usedPercent.toFixed(1)}% >= ${thresholds.diskWarningPercent}%`,
      critical: false,
    };
  }

  // 3. Event loop lag check
  if (metrics.eventLoop.lagMs >= thresholds.eventLoopLagCriticalMs) {
    return {
      kind: "degraded",
      reason: `event_loop_critical: lag ${metrics.eventLoop.lagMs.toFixed(0)}ms >= ${thresholds.eventLoopLagCriticalMs}ms`,
      critical: true,
    };
  }
  if (metrics.eventLoop.lagMs >= thresholds.eventLoopLagWarningMs) {
    return {
      kind: "degraded",
      reason: `event_loop_warning: lag ${metrics.eventLoop.lagMs.toFixed(0)}ms >= ${thresholds.eventLoopLagWarningMs}ms`,
      critical: false,
    };
  }

  return { kind: "healthy" };
}
