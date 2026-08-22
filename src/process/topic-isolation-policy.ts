/**
 * Topic isolation policy — decides how concurrent session topics map to
 * worker threads in a multithreaded runtime.
 *
 * Pure logic — decides, given a topic (session) key and the worker-pool
 * config, whether a topic should run on the main thread (workerCount <= 1,
 * single-threaded, backward-compatible) or be isolated to a dedicated worker
 * (workerCount > 1, isolation enabled). Uses a deterministic hash so the same
 * topic always maps to the same worker (session affinity — a session's
 * subsequent requests reuse its worker, preserving warm state). The actual
 * worker spawn/execution is I/O (worker_threads) and stays in the caller;
 * this module only decides the routing.
 *
 * Why this exists (OC core issue #5): the gateway runs on a single Node
 * event loop. Concurrent topic sessions share that loop, so a CPU-bound turn
 * in one topic blocks all others. A multithreaded runtime routes each topic
 * to a dedicated worker thread so topics do not block each other. This
 * module extracts the *routing decision* — which worker a topic maps to —
 * into a pure, foundry-gateable, deterministic function. The surgical edit
 * records the decision at the point a session's work becomes active.
 *
 * @dft
 * - A1 (pure-io-separation): no I/O imports. Pure function.
 * - A2 (determinism): no Date.now/Math.random/process.env. Same topic → same
 *   worker. FNV-1a hash is deterministic.
 * - A4 (dft-docs): this file is documented.
 * - A6 (check-result): returns a TopicIsolation result struct.
 */

/**
 * The worker-pool configuration for topic isolation.
 */
export type WorkerPoolConfig = {
  /** The number of workers in the pool (1 = single-threaded, main only). */
  readonly workerCount: number;
  /** Whether topic isolation is enabled. */
  readonly isolationMode: "disabled" | "enabled";
};

/** The default worker count (1 — single-threaded, backward-compatible). */
export const DEFAULT_WORKER_COUNT = 1;

/** The maximum supported worker count (caps the pool size). */
export const MAX_WORKER_COUNT = 64;

/** The worker key for the main thread (workerIndex 0). */
export const MAIN_WORKER_KEY = "main";

/**
 * Resolve the effective worker-pool config from raw options.
 *
 * Pure — clamps workerCount to [1, MAX_WORKER_COUNT], defaults to 1.
 *
 * @example
 *   resolveWorkerPoolConfig({})                                  // → { workerCount: 1, isolationMode: "disabled" }
 *   resolveWorkerPoolConfig({ workerCount: 4, isolationMode: "enabled" }) // → { workerCount: 4, isolationMode: "enabled" }
 */
export function resolveWorkerPoolConfig(
  options: { workerCount?: number; isolationMode?: "disabled" | "enabled" } = {},
): WorkerPoolConfig {
  const raw = options.workerCount;
  let workerCount: number;
  if (typeof raw === "number" && Number.isFinite(raw)) {
    workerCount = Math.max(1, Math.min(MAX_WORKER_COUNT, Math.floor(raw)));
  } else {
    workerCount = DEFAULT_WORKER_COUNT;
  }
  const isolationMode = options.isolationMode ?? (workerCount > 1 ? "enabled" : "disabled");
  return { workerCount, isolationMode };
}

/**
 * Compute a deterministic FNV-1a 32-bit hash of a topic key.
 *
 * Pure — same input always yields the same hash. Used for stable worker
 * assignment (session affinity): a topic maps to the same worker across
 * requests, so its warm state is reused.
 *
 * @example
 *   hashTopicKey("topic-A") // → a fixed number
 *   hashTopicKey("topic-A") === hashTopicKey("topic-A") // → true
 */
export function hashTopicKey(topicKey: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < topicKey.length; i++) {
    hash ^= topicKey.charCodeAt(i);
    // FNV prime multiplication, kept within 32 bits.
    hash = Math.imul(hash, 0x01000193);
  }
  // Force unsigned 32-bit.
  return hash >>> 0;
}

/**
 * The worker assignment for a topic — which worker it maps to.
 */
export type WorkerAssignment = {
  /** The 0-based worker index (0 = main thread). */
  readonly workerIndex: number;
  /** The worker key ("main" for index 0, "worker-N" for N >= 1). */
  readonly workerKey: string;
};

/**
 * Resolve the worker assignment for a topic key given the worker count.
 *
 * Pure — `workerIndex = hashTopicKey(topicKey) % workerCount`. When
 * workerCount is 1, every topic maps to the main thread (workerIndex 0).
 *
 * @example
 *   resolveWorkerAssignment({ topicKey: "s1", workerCount: 1 })  // → { workerIndex: 0, workerKey: "main" }
 *   resolveWorkerAssignment({ topicKey: "s1", workerCount: 4 })  // → { workerIndex: 2, workerKey: "worker-2" } (deterministic)
 */
export function resolveWorkerAssignment(params: {
  topicKey: string;
  workerCount: number;
}): WorkerAssignment {
  const workerCount = Math.max(1, Math.floor(params.workerCount) || 1);
  const workerIndex = workerCount <= 1 ? 0 : hashTopicKey(params.topicKey) % workerCount;
  return {
    workerIndex,
    workerKey: workerIndex === 0 ? MAIN_WORKER_KEY : `worker-${workerIndex}`,
  };
}

/**
 * The topic isolation decision — a result struct (A6: check-result).
 * Carries its own proof: `reason` explains why isolation was chosen.
 */
export type TopicIsolation = {
  /** The topic (session) key this decision applies to. */
  readonly topicKey: string;
  /** Whether the topic should be isolated to a worker thread. */
  readonly isolate: boolean;
  /** The worker assignment (which worker, even when not isolated). */
  readonly assignment: WorkerAssignment;
  /** Why this decision was made — for traceability and logging. */
  readonly reason: string;
};

/**
 * Decide whether a topic should be isolated to a worker thread.
 *
 * Policy:
 *   - isolationMode "disabled" OR workerCount <= 1 → main thread (not isolated)
 *   - isolationMode "enabled" AND workerCount > 1 → isolate to assigned worker
 *
 * @example
 *   resolveTopicIsolation({ topicKey: "s1", workerCount: 1 })                      // → { isolate: false, ... }
 *   resolveTopicIsolation({ topicKey: "s1", workerCount: 4, isolationMode: "enabled" }) // → { isolate: true, ... }
 */
export function resolveTopicIsolation(params: {
  topicKey: string;
  workerCount: number;
  isolationMode?: "disabled" | "enabled";
}): TopicIsolation {
  const config = resolveWorkerPoolConfig({
    workerCount: params.workerCount,
    isolationMode: params.isolationMode,
  });
  const assignment = resolveWorkerAssignment({
    topicKey: params.topicKey,
    workerCount: config.workerCount,
  });
  const isolate = config.isolationMode === "enabled" && config.workerCount > 1;
  return {
    topicKey: params.topicKey,
    isolate,
    assignment,
    reason: isolate
      ? `isolationMode enabled with workerCount ${config.workerCount}; topic routed to ${assignment.workerKey}`
      : config.workerCount <= 1
        ? `workerCount ${config.workerCount} <= 1; topic runs on main thread`
        : `isolationMode disabled; topic runs on main thread (assigned ${assignment.workerKey})`,
  };
}
