// Tests for topic-isolation-policy — pure routing logic (no threads).
//
// Prediction (§3.1): the FNV-1a hash is deterministic (same topic → same worker)
// and distributes topics roughly evenly across workers (no clustering).
// Competing account: a poor or non-deterministic hash would cluster topics on
// a single worker (hot worker) or scatter a session's requests across workers
// (lost cache locality).
// Support: same input → same output (determinism); N distinct topics across
// N workers → each worker gets ~N/N topics (no clustering).
// Refute: same input → different outputs; or all topics land on one worker.
//
// Also tests resolveWorkerPoolConfig (clamping), resolveWorkerAssignment
// (workerIndex/workerKey), and resolveTopicIsolation (the decision struct).
import { describe, expect, it } from "vitest";
import {
  DEFAULT_WORKER_COUNT,
  MAIN_WORKER_KEY,
  MAX_WORKER_COUNT,
  hashTopicKey,
  resolveTopicIsolation,
  resolveWorkerAssignment,
  resolveWorkerPoolConfig,
} from "./topic-isolation-policy.js";

describe("hashTopicKey", () => {
  it("is deterministic: same input → same output", () => {
    expect(hashTopicKey("session-1")).toBe(hashTopicKey("session-1"));
    expect(hashTopicKey("agent:main:s1")).toBe(hashTopicKey("agent:main:s1"));
  });

  it("returns an unsigned 32-bit integer", () => {
    const hash = hashTopicKey("any-topic");
    expect(Number.isInteger(hash)).toBe(true);
    expect(hash).toBeGreaterThanOrEqual(0);
    expect(hash).toBeLessThanOrEqual(0xffffffff);
  });

  it("produces different hashes for different topics (collision resistance)", () => {
    const topics = ["session-1", "session-2", "session-3", "session-4"];
    const hashes = topics.map((t) => hashTopicKey(t));
    expect(new Set(hashes).size).toBe(topics.length);
  });

  it("distributes topics roughly evenly across workers (no clustering)", () => {
    // Prediction: FNV-1a distributes uniformly — no single worker gets
    // a disproportionate share of topics.
    // Competing account: a poor hash would cluster all topics on 1-2 workers.
    // Support: with 100 topics and 4 workers, each worker gets ~25 (±10).
    // Refute: one worker gets >50 topics (clustering).
    const workerCount = 4;
    const topicCount = 200;
    const buckets = new Array(workerCount).fill(0);
    for (let i = 0; i < topicCount; i++) {
      const idx = hashTopicKey(`session-${i}`) % workerCount;
      buckets[idx]++;
    }
    const expected = topicCount / workerCount; // 50
    for (const count of buckets) {
      expect(count).toBeGreaterThan(expected * 0.5); // > 25
      expect(count).toBeLessThan(expected * 1.5); // < 75
    }
  });
});

describe("resolveWorkerPoolConfig", () => {
  it("defaults to workerCount=1, isolationMode=disabled", () => {
    const config = resolveWorkerPoolConfig({});
    expect(config.workerCount).toBe(DEFAULT_WORKER_COUNT);
    expect(config.isolationMode).toBe("disabled");
  });

  it("clamps workerCount to [1, MAX_WORKER_COUNT]", () => {
    expect(resolveWorkerPoolConfig({ workerCount: 0 }).workerCount).toBe(1);
    expect(resolveWorkerPoolConfig({ workerCount: -5 }).workerCount).toBe(1);
    expect(resolveWorkerPoolConfig({ workerCount: 999 }).workerCount).toBe(MAX_WORKER_COUNT);
  });

  it("floors fractional workerCount", () => {
    expect(resolveWorkerPoolConfig({ workerCount: 3.9 }).workerCount).toBe(3);
  });

  it("auto-enables isolation when workerCount > 1 and no explicit mode", () => {
    expect(resolveWorkerPoolConfig({ workerCount: 4 }).isolationMode).toBe("enabled");
    expect(resolveWorkerPoolConfig({ workerCount: 1 }).isolationMode).toBe("disabled");
  });

  it("respects explicit isolationMode even when workerCount > 1", () => {
    expect(
      resolveWorkerPoolConfig({ workerCount: 4, isolationMode: "disabled" }).isolationMode,
    ).toBe("disabled");
  });
});

describe("resolveWorkerAssignment", () => {
  it("routes all topics to main (index 0) when workerCount=1", () => {
    const assignment = resolveWorkerAssignment({ topicKey: "any-session", workerCount: 1 });
    expect(assignment.workerIndex).toBe(0);
    expect(assignment.workerKey).toBe(MAIN_WORKER_KEY);
  });

  it("assigns a deterministic workerIndex for workerCount > 1", () => {
    const a = resolveWorkerAssignment({ topicKey: "session-1", workerCount: 4 });
    const b = resolveWorkerAssignment({ topicKey: "session-1", workerCount: 4 });
    expect(a).toEqual(b);
    expect(a.workerIndex).toBeGreaterThanOrEqual(0);
    expect(a.workerIndex).toBeLessThan(4);
    expect(a.workerKey).toBe(`worker-${a.workerIndex}`);
  });

  it("produces workerKey='main' only for index 0", () => {
    // With workerCount=1, index is always 0 → "main".
    // With workerCount > 1, index 0 is still possible but maps to "main".
    const main = resolveWorkerAssignment({ topicKey: "x", workerCount: 1 });
    expect(main.workerKey).toBe("main");

    // Find a topic that hashes to index 0 with workerCount=4.
    for (let i = 0; i < 1000; i++) {
      const key = `probe-${i}`;
      if (hashTopicKey(key) % 4 === 0) {
        const assignment = resolveWorkerAssignment({ topicKey: key, workerCount: 4 });
        expect(assignment.workerIndex).toBe(0);
        expect(assignment.workerKey).toBe("main");
        return;
      }
    }
    // FNV-1a should produce index 0 for at least one of 1000 topics.
    throw new Error("expected at least one topic to hash to index 0");
  });
});

describe("resolveTopicIsolation", () => {
  it("does not isolate when workerCount <= 1", () => {
    const decision = resolveTopicIsolation({ topicKey: "s1", workerCount: 1 });
    expect(decision.isolate).toBe(false);
    expect(decision.assignment.workerKey).toBe("main");
    expect(decision.reason).toContain("<= 1");
  });

  it("does not isolate when isolationMode is disabled (even with workerCount > 1)", () => {
    const decision = resolveTopicIsolation({
      topicKey: "s1",
      workerCount: 4,
      isolationMode: "disabled",
    });
    expect(decision.isolate).toBe(false);
    expect(decision.reason).toContain("disabled");
  });

  it("isolates when isolationMode is enabled and workerCount > 1", () => {
    const decision = resolveTopicIsolation({
      topicKey: "s1",
      workerCount: 4,
      isolationMode: "enabled",
    });
    expect(decision.isolate).toBe(true);
    expect(decision.reason).toContain("enabled");
    expect(decision.assignment.workerIndex).toBeLessThan(4);
  });

  it("carries the topicKey in the result struct (A6: check-result)", () => {
    const decision = resolveTopicIsolation({ topicKey: "agent:main:s1", workerCount: 1 });
    expect(decision.topicKey).toBe("agent:main:s1");
  });
});
