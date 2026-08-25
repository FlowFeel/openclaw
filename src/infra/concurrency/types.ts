/**
 * Pure types for the Phosphene Concurrency Subsystem.
 *
 * @dft
 * - A1 / A2: Pure mathematical definitions, zero I/O, deterministic.
 */

export type QueueExecutionStatus = "executed" | "retried" | "aborted";

export interface QueueExecutionResult<T> {
  readonly value: T;
  readonly status: QueueExecutionStatus;
  readonly queuedDurationMs: number;
  readonly executionDurationMs: number;
  readonly attempts: number;
}

export interface AdmissionRetryOptions {
  readonly maxRetries?: number;
  readonly initialBackoffMs?: number;
  readonly maxBackoffMs?: number;
  readonly backoffFactor?: number;
}

export interface AdmissionRetryDecision {
  readonly shouldRetry: boolean;
  readonly backoffMs: number;
  readonly attempt: number;
  readonly reason?: string;
  readonly resetExpectedSessionId: boolean;
}

export interface ConcurrencyMetrics {
  readonly activeQueues: number;
  readonly totalDispatches: number;
  readonly totalRetries: number;
  readonly totalLockCollisionsAvoided: number;
}
