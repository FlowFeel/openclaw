import { describe, it, expect } from "vitest";
import { SequentialKeyedQueue } from "./sequential-keyed-queue.js";
import { evaluateAdmissionRetry } from "./admission-retry-policy.js";
import { ConcurrencyTelemetryTracker } from "./concurrency-telemetry.js";

describe("Degree 2: Concurrency & Turn Serialization BDD Scenarios", () => {
  it("Scenario 1: Rapid 5-message burst to a Telegram topic executes sequentially without collision", async () => {
    // Given an active Telegram topic with an in-memory queue
    const queue = new SequentialKeyedQueue();
    const completedTurnOrder: number[] = [];
    const sessionKey = "agent:main:telegram:group:-1004328838138:topic:1";

    // When 5 rapid inbound messages arrive concurrently
    const burstPromises = [1, 2, 3, 4, 5].map((msgId) =>
      queue.runExclusive(sessionKey, async () => {
        // Simulate turn processing with random duration
        await new Promise((resolve) => setTimeout(resolve, 10 + (5 - msgId) * 2));
        completedTurnOrder.push(msgId);
        return `reply_for_msg_${msgId}`;
      }),
    );

    // Then all turns execute in exact FIFO sequence and finish successfully
    const results = await Promise.all(burstPromises);
    expect(completedTurnOrder).toEqual([1, 2, 3, 4, 5]);
    expect(results).toEqual([
      "reply_for_msg_1",
      "reply_for_msg_2",
      "reply_for_msg_3",
      "reply_for_msg_4",
      "reply_for_msg_5",
    ]);
    expect(queue.queueCount).toBe(0);
    expect(queue.collisionsAvoided).toBe(4);
  });

  it("Scenario 2: Burst messages to distinct topics execute in parallel without cross-topic latency", async () => {
    // Given two distinct Telegram topics
    const queue = new SequentialKeyedQueue();
    const topic1Key = "agent:main:telegram:group:-1004328838138:topic:1";
    const topic63Key = "agent:main:telegram:group:-1004328838138:topic:63";

    const startTimes: Record<string, number> = {};

    // When messages arrive simultaneously at topic:1 and topic:63
    const turn1 = queue.runExclusive(topic1Key, async () => {
      startTimes["topic:1"] = Date.now();
      await new Promise((resolve) => setTimeout(resolve, 30));
      return "topic1_reply";
    });

    const turn63 = queue.runExclusive(topic63Key, async () => {
      startTimes["topic:63"] = Date.now();
      await new Promise((resolve) => setTimeout(resolve, 30));
      return "topic63_reply";
    });

    await Promise.all([turn1, turn63]);

    // Then both turns started simultaneously (parallelism verified)
    const timeDelta = Math.abs(startTimes["topic:1"] - startTimes["topic:63"]);
    expect(timeDelta).toBeLessThan(20);
    expect(queue.queueCount).toBe(0);
  });

  it("Scenario 3: Transient optimistic locking collision is healed with backoff and zero spool failure", async () => {
    // Given an optimistic session collision error
    const error = new Error(
      'Session "agent:main:telegram:group:-1004328838138:topic:1" changed while starting work. Retry.',
    );

    // When evaluated by the admission retry policy
    const decision = evaluateAdmissionRetry(error, 0, { initialBackoffMs: 25 });

    // Then it decides to retry with backoff and flags session ID reset
    expect(decision.shouldRetry).toBe(true);
    expect(decision.backoffMs).toBe(25);
    expect(decision.resetExpectedSessionId).toBe(true);
    expect(decision.attempt).toBe(1);
  });

  it("Scenario 4: Concurrency telemetry records avoided collisions and execution durations", () => {
    // Given a telemetry tracker
    const tracker = new ConcurrencyTelemetryTracker();

    // When recordings are submitted
    const res = tracker.recordExecution({
      value: "turn_result",
      status: "retried",
      queuedDurationMs: 45,
      executionDurationMs: 120,
      attempts: 2,
      collisionAvoided: true,
    });

    // Then metrics correctly aggregate
    expect(res.status).toBe("retried");
    expect(res.queuedDurationMs).toBe(45);
    expect(res.attempts).toBe(2);

    const metrics = tracker.getMetrics(0);
    expect(metrics.totalDispatches).toBe(1);
    expect(metrics.totalRetries).toBe(1);
    expect(metrics.totalLockCollisionsAvoided).toBe(1);
  });
});
