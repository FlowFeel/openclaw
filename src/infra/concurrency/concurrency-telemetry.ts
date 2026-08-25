/**
 * Concurrency Telemetry & Check-Result Tracker.
 *
 * @dft
 * - A1 / A2: Pure in-memory accumulator.
 * - A6: Check-Result telemetry format.
 */

import type { ConcurrencyMetrics, QueueExecutionResult, QueueExecutionStatus } from "./types.js";

export class ConcurrencyTelemetryTracker {
  private totalDispatches = 0;
  private totalRetries = 0;
  private totalLockCollisionsAvoided = 0;

  recordExecution<T>(params: {
    value: T;
    status: QueueExecutionStatus;
    queuedDurationMs: number;
    executionDurationMs: number;
    attempts: number;
    collisionAvoided?: boolean;
  }): QueueExecutionResult<T> {
    this.totalDispatches++;
    this.totalRetries += Math.max(0, params.attempts - 1);
    if (params.collisionAvoided) {
      this.totalLockCollisionsAvoided++;
    }

    return {
      value: params.value,
      status: params.status,
      queuedDurationMs: params.queuedDurationMs,
      executionDurationMs: params.executionDurationMs,
      attempts: params.attempts,
    };
  }

  getMetrics(activeQueues: number): ConcurrencyMetrics {
    return {
      activeQueues,
      totalDispatches: this.totalDispatches,
      totalRetries: this.totalRetries,
      totalLockCollisionsAvoided: this.totalLockCollisionsAvoided,
    };
  }
}
