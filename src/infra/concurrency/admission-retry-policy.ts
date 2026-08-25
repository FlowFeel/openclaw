/**
 * Pure Admission Retry Policy.
 * Classifies optimistic concurrency errors and computes deterministic retry decisions.
 *
 * @dft
 * - A1 / A2: Pure mathematical heuristic, zero I/O, deterministic.
 * - A6: Check-Result explicit decision struct.
 */

import type { AdmissionRetryDecision, AdmissionRetryOptions } from "./types.js";

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_INITIAL_BACKOFF_MS = 50;
const DEFAULT_MAX_BACKOFF_MS = 300;
const DEFAULT_BACKOFF_FACTOR = 1.5;

/**
 * Checks if an error represents an optimistic session collision or state invalidation.
 */
export function isOptimisticConcurrencyError(error: unknown): boolean {
  if (!error) return false;

  const msg =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : JSON.stringify(error);

  return (
    /changed while starting work/i.test(msg) ||
    /SESSION_WORK_START_INVALIDATED/i.test(msg) ||
    /session.*deleted while starting work/i.test(msg) ||
    /transcript tail is not resumable/i.test(msg)
  );
}

/**
 * Computes deterministic retry decision for a turn admission error.
 */
export function evaluateAdmissionRetry(
  error: unknown,
  attempt: number,
  options: AdmissionRetryOptions = {},
): AdmissionRetryDecision {
  const maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
  const initialBackoff = options.initialBackoffMs ?? DEFAULT_INITIAL_BACKOFF_MS;
  const maxBackoff = options.maxBackoffMs ?? DEFAULT_MAX_BACKOFF_MS;
  const factor = options.backoffFactor ?? DEFAULT_BACKOFF_FACTOR;

  if (!isOptimisticConcurrencyError(error) || attempt >= maxRetries) {
    return {
      shouldRetry: false,
      backoffMs: 0,
      attempt,
      reason: isOptimisticConcurrencyError(error) ? "Max retries exceeded" : "Non-retryable error",
      resetExpectedSessionId: false,
    };
  }

  const rawBackoff = initialBackoff * Math.pow(factor, attempt);
  const backoffMs = Math.min(Math.round(rawBackoff), maxBackoff);

  return {
    shouldRetry: true,
    backoffMs,
    attempt: attempt + 1,
    reason: "Optimistic session concurrency collision detected",
    resetExpectedSessionId: true,
  };
}
