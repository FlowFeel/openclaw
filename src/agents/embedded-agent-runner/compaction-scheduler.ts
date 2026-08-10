/**
 * Compaction scheduler policy — decides whether compaction planning runs inline
 * (on the main event loop) or off-thread (on a worker).
 *
 * Pure logic — decides, given the message count and config, whether to run
 * compaction planning inline (fast for tiny histories — worker startup is
 * more expensive than the planning itself) or offload it to a worker thread
 * (for larger histories — keeps the main event loop responsive). The actual
 * worker spawn/execution is I/O (worker_threads) and stays in the caller;
 * this module only decides the strategy.
 *
 * Why this exists (OC core issue #3): compaction planning is CPU-bound
 * (chunking, message projection, stage splitting). Running it inline on the
 * main event loop blocks all other requests for the duration. The fork at
 * 1aedd8f3 already offloads planning to a `worker_threads` worker when the
 * history exceeds a threshold (64 messages), falling back to inline for tiny
 * histories. This module extracts the *threshold decision* — inline vs worker
 * — from the worker harness into a pure, foundry-gateable, configurable
 * function. The surgical edit wires it into `runCompactionPlan`.
 *
 * @dft
 * - A1 (pure-io-separation): no I/O imports. Pure function.
 * - A2 (determinism): no Date.now/Math.random/process.env. Same inputs → same output.
 * - A4 (dft-docs): this file is documented.
 * - A6 (check-result): returns a CompactionStrategy result struct.
 */

/**
 * The observable context for a compaction planning decision.
 */
export type CompactionPlanningContext = {
  /** The number of messages in the history to compact. */
  readonly messageCount: number;
  /** Override for the minimum message count that triggers worker offload. */
  readonly minMessagesForWorker?: number;
  /** True when worker_threads are unavailable (e.g. constrained runtime). */
  readonly workerUnavailable?: boolean;
};

/**
 * The default minimum message count that triggers worker offload. Below this,
 * inline planning is faster (worker startup cost exceeds planning cost).
 * Matches the fork's original hardcoded threshold (64).
 */
export const DEFAULT_MIN_MESSAGES_FOR_COMPACTION_WORKER = 64;

/**
 * The chosen compaction planning strategy — a result struct (A6: check-result).
 * Carries its own proof: `reason` explains why the strategy was chosen.
 */
export type CompactionStrategy = {
  /** Where to run compaction planning. */
  readonly mode: "inline" | "worker";
  /** The effective threshold used to make the decision. */
  readonly threshold: number;
  /** Why this strategy was chosen — for traceability and logging. */
  readonly reason: string;
};

/**
 * Resolve the effective minimum-message threshold for worker offload.
 *
 * Pure — reads from context + default, not from process.env. Clamps to a
 * non-negative integer.
 *
 * @example
 *   resolveCompactionWorkerThreshold({})                         // → 64
 *   resolveCompactionWorkerThreshold({ minMessagesForWorker: 32 }) // → 32
 *   resolveCompactionWorkerThreshold({ minMessagesForWorker: -1 }) // → 0
 */
export function resolveCompactionWorkerThreshold(
  context: { minMessagesForWorker?: number } = {},
): number {
  const raw = context.minMessagesForWorker;
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return Math.max(0, Math.floor(raw));
  }
  return DEFAULT_MIN_MESSAGES_FOR_COMPACTION_WORKER;
}

/**
 * Decide whether compaction planning should run inline or on a worker.
 *
 * Policy:
 *   - workerUnavailable → inline (can't offload)
 *   - messageCount < threshold → inline (worker startup not worth it)
 *   - messageCount >= threshold → worker (offload CPU-bound planning)
 *
 * @example
 *   resolveCompactionStrategy({ messageCount: 10 })   // → { mode: "inline", threshold: 64, ... }
 *   resolveCompactionStrategy({ messageCount: 100 })  // → { mode: "worker", threshold: 64, ... }
 *   resolveCompactionStrategy({ messageCount: 100, workerUnavailable: true }) // → { mode: "inline", ... }
 */
export function resolveCompactionStrategy(context: CompactionPlanningContext): CompactionStrategy {
  const threshold = resolveCompactionWorkerThreshold(context);
  if (context.messageCount <= 0) {
    return {
      mode: "inline",
      threshold,
      reason: `messageCount ${context.messageCount} <= 0; nothing to plan, runs inline`,
    };
  }
  if (context.workerUnavailable) {
    return {
      mode: "inline",
      threshold,
      reason: "worker_threads unavailable; planning runs inline",
    };
  }
  if (context.messageCount < threshold) {
    return {
      mode: "inline",
      threshold,
      reason: `messageCount ${context.messageCount} < threshold ${threshold}; worker startup not worth it`,
    };
  }
  return {
    mode: "worker",
    threshold,
    reason: `messageCount ${context.messageCount} >= threshold ${threshold}; offload CPU-bound planning to worker`,
  };
}

/**
 * Whether compaction planning should run off-thread (worker) for the given
 * context. Convenience predicate over {@link resolveCompactionStrategy}.
 *
 * @example
 *   shouldOffloadCompactionPlanning({ messageCount: 100 }) // → true
 *   shouldOffloadCompactionPlanning({ messageCount: 10 })  // → false
 */
export function shouldOffloadCompactionPlanning(context: CompactionPlanningContext): boolean {
  return resolveCompactionStrategy(context).mode === "worker";
}
