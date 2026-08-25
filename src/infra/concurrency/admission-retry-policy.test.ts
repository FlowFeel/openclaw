import { describe, it, expect } from "vitest";
import {
  isOptimisticConcurrencyError,
  evaluateAdmissionRetry,
} from "./admission-retry-policy.js";

describe("Degree 0: AdmissionRetryPolicy Pure Decision Invariants", () => {
  it("accurately classifies optimistic concurrency error strings", () => {
    expect(
      isOptimisticConcurrencyError(
        new Error('Session "agent:main:telegram:group:-100:topic:1" changed while starting work. Retry.'),
      ),
    ).toBe(true);

    expect(
      isOptimisticConcurrencyError(new Error("SESSION_WORK_START_INVALIDATED")),
    ).toBe(true);

    expect(
      isOptimisticConcurrencyError(
        new Error('Session "key" was deleted while starting work. Retry.'),
      ),
    ).toBe(true);

    expect(
      isOptimisticConcurrencyError(new Error("Network timeout 504 Gateway Time-out")),
    ).toBe(false);
  });

  it("calculates deterministic exponential backoff within bounds", () => {
    const error = new Error('Session "abc" changed while starting work. Retry.');

    const d0 = evaluateAdmissionRetry(error, 0, {
      initialBackoffMs: 50,
      backoffFactor: 2,
      maxBackoffMs: 500,
    });
    expect(d0.shouldRetry).toBe(true);
    expect(d0.backoffMs).toBe(50);
    expect(d0.attempt).toBe(1);
    expect(d0.resetExpectedSessionId).toBe(true);

    const d1 = evaluateAdmissionRetry(error, 1, {
      initialBackoffMs: 50,
      backoffFactor: 2,
      maxBackoffMs: 500,
    });
    expect(d1.shouldRetry).toBe(true);
    expect(d1.backoffMs).toBe(100);
    expect(d1.attempt).toBe(2);

    const d2 = evaluateAdmissionRetry(error, 2, {
      initialBackoffMs: 50,
      backoffFactor: 2,
      maxBackoffMs: 500,
    });
    expect(d2.shouldRetry).toBe(true);
    expect(d2.backoffMs).toBe(200);

    // Max retries exceeded
    const d3 = evaluateAdmissionRetry(error, 3, { maxRetries: 3 });
    expect(d3.shouldRetry).toBe(false);
    expect(d3.reason).toBe("Max retries exceeded");
  });
});
