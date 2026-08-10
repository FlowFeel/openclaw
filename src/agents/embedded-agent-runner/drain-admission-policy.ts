/**
 * Drain admission policy — classifies active runs for SIGUSR1 graceful drain.
 *
 * Pure logic — decides, given a run's state, whether to ABORT (safe to recover)
 * or DRAIN (must wait for) the run during a graceful restart. No I/O, no time,
 * no randomness. The wiring (calling abort(), waiting for runs, timeouts) lives
 * in the run-loop; this module only decides the classification.
 *
 * Why this exists (OC core issue #6): SIGUSR1 hot-reload previously killed all
 * WebSockets, destroying active subagents mid-task. The fork at 1aedd8f3
 * already implements a drain (wait for embedded runs, abort only compacting
 * runs, mark sessions for recovery). This module extracts the *decision* —
 * which runs to abort vs. drain — from the run-loop's async I/O body into a
 * pure, foundry-gateable function. The policy is: abort runs that are safe to
 * recover (compacting runs holding write locks), drain everything else
 * (mid-task subagents that must not be destroyed).
 *
 * @dft
 * - A1 (pure-io-separation): no I/O imports. Pure function.
 * - A2 (determinism): no Date.now/Math.random/process.env. Same inputs → same output.
 * - A4 (dft-docs): this file is documented.
 * - A6 (check-result): returns a DrainClassification result struct.
 */

/**
 * The observable state of a single active run, as seen by the drain policy.
 * This is a read-only snapshot — the policy never mutates the run.
 */
export type RunDrainState = {
  /** The session ID of the run. */
  readonly sessionId: string;
  /** True when the run is in the compaction phase (holding a session write lock). */
  readonly isCompacting: boolean;
  /** True when the run can be aborted without corrupting state. */
  readonly isAbortable: boolean;
  /** True when the run has already been aborted (idempotent — skip). */
  readonly isAborted: boolean;
  /** True when the run has stopped (skip — nothing to drain). */
  readonly isStopped: boolean;
};

/**
 * The drain action for a single run — a result struct (A6: check-result).
 * Carries its own proof: `reason` explains why the action was chosen.
 */
export type RunDrainAction = {
  /** The session ID this action applies to. */
  readonly sessionId: string;
  /** What to do with this run during graceful drain. */
  readonly action: "abort" | "drain" | "skip";
  /** Why this action was chosen — for traceability and logging. */
  readonly reason: string;
};

/**
 * The result of classifying a set of runs for drain — a result struct.
 */
export type DrainClassification = {
  /** Runs to abort (safe to recover — compacting runs holding write locks). */
  readonly abort: readonly RunDrainAction[];
  /** Runs to drain (must wait for — mid-task subagents that must not be destroyed). */
  readonly drain: readonly RunDrainAction[];
  /** Runs to skip (already aborted, stopped, or not abortable). */
  readonly skip: readonly RunDrainAction[];
  /** True when at least one run needs draining (the run-loop must wait). */
  readonly needsDrain: boolean;
  /** True when at least one run should be aborted. */
  readonly needsAbort: boolean;
};

/**
 * Classify a single run for graceful drain.
 *
 * Policy:
 *   - Already aborted or stopped → skip (nothing to do)
 *   - Compacting AND abortable → abort (release the write lock; session is
 *     marked for recovery by markRestartAbortedMainSessions)
 *   - Mid-task (not compacting) → drain (wait for the run to finish; the
 *     subagent must not be destroyed mid-task)
 *   - Not abortable → drain (can't abort even if we wanted to; must wait)
 *
 * @example
 *   classifyRunForDrain({ sessionId: "s1", isCompacting: true, isAbortable: true, isAborted: false, isStopped: false })
 *   // → { sessionId: "s1", action: "abort", reason: "compacting run holding write lock; safe to recover" }
 *
 *   classifyRunForDrain({ sessionId: "s2", isCompacting: false, isAbortable: true, isAborted: false, isStopped: false })
 *   // → { sessionId: "s2", action: "drain", reason: "mid-task run; must not be destroyed" }
 */
export function classifyRunForDrain(run: RunDrainState): RunDrainAction {
  if (run.isAborted) {
    return {
      sessionId: run.sessionId,
      action: "skip",
      reason: "already aborted",
    };
  }
  if (run.isStopped) {
    return {
      sessionId: run.sessionId,
      action: "skip",
      reason: "already stopped",
    };
  }
  if (run.isCompacting && run.isAbortable) {
    return {
      sessionId: run.sessionId,
      action: "abort",
      reason: "compacting run holding write lock; safe to recover",
    };
  }
  if (run.isCompacting && !run.isAbortable) {
    return {
      sessionId: run.sessionId,
      action: "drain",
      reason: "compacting but not abortable; must wait for compaction to finish",
    };
  }
  // Mid-task run (not compacting) — must drain, not destroy.
  return {
    sessionId: run.sessionId,
    action: "drain",
    reason: run.isAbortable
      ? "mid-task run; must not be destroyed"
      : "mid-task run not abortable; must wait",
  };
}

/**
 * Classify a set of runs for graceful drain. Returns the abort/drain/skip
 * buckets plus summary flags. Pure — does not mutate the input.
 *
 * @example
 *   classifyRunsForDrain([
 *     { sessionId: "s1", isCompacting: true, isAbortable: true, isAborted: false, isStopped: false },
 *     { sessionId: "s2", isCompacting: false, isAbortable: true, isAborted: false, isStopped: false },
 *   ])
 *   // → { abort: [s1], drain: [s2], skip: [], needsDrain: true, needsAbort: true }
 */
export function classifyRunsForDrain(runs: readonly RunDrainState[]): DrainClassification {
  const abort: RunDrainAction[] = [];
  const drain: RunDrainAction[] = [];
  const skip: RunDrainAction[] = [];

  for (const run of runs) {
    const action = classifyRunForDrain(run);
    switch (action.action) {
      case "abort":
        abort.push(action);
        break;
      case "drain":
        drain.push(action);
        break;
      case "skip":
        skip.push(action);
        break;
    }
  }

  return {
    abort,
    drain,
    skip,
    needsDrain: drain.length > 0,
    needsAbort: abort.length > 0,
  };
}

/**
 * Resolve the drain timeout (ms) for a graceful restart.
 *
 * Pure — reads from the intent + config, not from Date.now() or process.env.
 * Returns undefined when there is no timeout (drain indefinitely until all
 * runs finish or the force-exit timer fires).
 *
 * @example
 *   resolveDrainTimeoutMs({ waitMs: 5000 })        // → 5000
 *   resolveDrainTimeoutMs({ waitMs: 0 })            // → 0 (force: don't wait)
 *   resolveDrainTimeoutMs({})                        // → undefined (drain indefinitely)
 *   resolveDrainTimeoutMs({ force: true })           // → 0 (force: don't wait)
 */
export function resolveDrainTimeoutMs(
  intent: { waitMs?: number; force?: boolean },
  config?: { defaultTimeoutMs?: number; maxTimeoutMs?: number },
): number | undefined {
  // Force restart: don't wait for drain.
  if (intent.force === true) {
    return 0;
  }
  // Explicit waitMs from the intent.
  if (typeof intent.waitMs === "number" && Number.isFinite(intent.waitMs) && intent.waitMs >= 0) {
    return Math.floor(intent.waitMs);
  }
  // Config default.
  const defaultMs = config?.defaultTimeoutMs;
  if (typeof defaultMs === "number" && Number.isFinite(defaultMs) && defaultMs >= 0) {
    const max = config?.maxTimeoutMs;
    if (typeof max === "number" && Number.isFinite(max) && max >= 0) {
      return Math.min(Math.floor(defaultMs), Math.floor(max));
    }
    return Math.floor(defaultMs);
  }
  // No timeout — drain indefinitely.
  return undefined;
}
