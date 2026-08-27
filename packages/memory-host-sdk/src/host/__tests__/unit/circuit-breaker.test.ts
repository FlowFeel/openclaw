import { describe, expect, it } from "vitest";
import { EmbeddingCircuitBreaker } from "../../circuit-breaker.js";
import { EmbeddingProviderUnreachableError } from "../../embedding-error-classifier.js";

describe("Tier 1 Unit: EmbeddingCircuitBreaker", () => {
  it("initializes in CLOSED state with 0 failures", () => {
    const breaker = new EmbeddingCircuitBreaker({ failureThreshold: 3 });
    expect(breaker.getState()).toBe("CLOSED");
    expect(breaker.canExecute()).toBe(true);
    expect(breaker.getFailureCount()).toBe(0);
  });

  it("transitions to OPEN after 3 consecutive failures", () => {
    const breaker = new EmbeddingCircuitBreaker({ failureThreshold: 3 });
    breaker.recordFailure(false);
    expect(breaker.getState()).toBe("CLOSED");
    expect(breaker.getFailureCount()).toBe(1);

    breaker.recordFailure(false);
    expect(breaker.getState()).toBe("CLOSED");
    expect(breaker.getFailureCount()).toBe(2);

    breaker.recordFailure(false);
    expect(breaker.getState()).toBe("OPEN");
    expect(breaker.canExecute()).toBe(false);
  });

  it("transitions immediately to OPEN on terminal error", () => {
    const breaker = new EmbeddingCircuitBreaker({ failureThreshold: 5 });
    breaker.recordFailure(true); // terminal failure
    expect(breaker.getState()).toBe("OPEN");
    expect(breaker.canExecute()).toBe(false);
  });

  it("transitions to HALF_OPEN after cooldown period expires", () => {
    const breaker = new EmbeddingCircuitBreaker({
      failureThreshold: 1,
      cooldownPeriodMs: 100, // 100ms for test
    });
    breaker.recordFailure(true);
    expect(breaker.getState()).toBe("OPEN");

    // Fast-forward
    const start = Date.now();
    while (Date.now() - start < 110) {
      // wait 110ms
    }

    expect(breaker.getState()).toBe("HALF_OPEN");
    expect(breaker.canExecute()).toBe(true);
  });

  it("recovers to CLOSED on successful execution in HALF_OPEN state", () => {
    const breaker = new EmbeddingCircuitBreaker({
      failureThreshold: 1,
      cooldownPeriodMs: 50,
    });
    breaker.recordFailure(true);
    expect(breaker.getState()).toBe("OPEN");

    const start = Date.now();
    while (Date.now() - start < 60) {
      // wait
    }

    expect(breaker.getState()).toBe("HALF_OPEN");
    breaker.recordSuccess();
    expect(breaker.getState()).toBe("CLOSED");
    expect(breaker.getFailureCount()).toBe(0);
  });

  it("rejects executeGuarded immediately when OPEN without running operation", async () => {
    const breaker = new EmbeddingCircuitBreaker({ failureThreshold: 1 });
    breaker.recordFailure(true);

    let executed = false;
    await expect(
      breaker.executeGuarded(async () => {
        executed = true;
        return "ok";
      }),
    ).rejects.toThrow(EmbeddingProviderUnreachableError);

    expect(executed).toBe(false);
  });
});
