import {
  TopicAffineWorkerPool,
  type WorkerPoolError,
} from "../process/topic-affine-worker-pool.js";
/**
 * Worker-pool dispatcher — Scale 1 adapter for the TurnDispatcher port.
 *
 * Implements `TurnDispatcher` using a `TopicAffineWorkerPool`.  When
 * `isolation: "in-process"` is configured, this dispatcher is installed as
 * the session placement admission provider.
 *
 * Current state (Phase 3 — Scale 1 partial):
 * Turn execution stays on the main thread (delegates to `MainThreadDispatcher`)
 * because the embedded agent runner has deep main-thread dependencies (session
 * managers, plugin hooks, reply registries) that are not yet worker-safe.
 * The pool IS created and available for CPU-bound subtask offload (compaction,
 * code-mode).  When the agent runner is made worker-safe (future phase),
 * only `executeTurn` changes — the infrastructure is in place.
 *
 * Invariant (multithreaded-runtime-design.md §3.2):
 * The admission claim is held on the main thread.  `executeTurn` calls
 * `onAdmitted` on main before dispatching.  A worker crash can never
 * deadlock the session's admission gate because the `finally` on main
 * releases the claim.
 */
import type { EmbeddedAgentRunResult } from "./embedded-agent-runner/types.js";
import type {
  LocalTurnPlacementClaim,
  SessionPlacementTurnParams,
} from "./session-placement-admission.js";
import type { TurnDispatcher } from "./turn-dispatcher.js";
import { MainThreadDispatcher } from "./turn-dispatcher.js";

export type WorkerPoolDispatcherOptions = {
  /**
   * The worker script URL for the pool.
   *
   * When omitted (Scale 1 partial), no pool is created — the dispatcher is
   * purely a MainThreadDispatcher wrapper. Turn execution stays on main.
   * When Scale 1 is completed (agent runner worker-safe), pass the real
   * worker URL and the pool becomes active.
   */
  workerUrl?: URL;
  /** Number of workers in the pool. */
  poolSize: number;
  /** Bounded queue depth per worker (default 4). */
  queueDepth?: number;
};

/**
 * Scale 1 dispatcher — topic-affine worker pool with main-thread turn execution.
 *
 * The pool is created eagerly so it's warm when the first subtask arrives.
 * Turn execution delegates to `MainThreadDispatcher` (Scale 1 partial).
 */
export class WorkerPoolDispatcher implements TurnDispatcher {
  private readonly mainThread: MainThreadDispatcher = new MainThreadDispatcher();
  /** The pool, or null when no workerUrl is configured (Scale 1 partial). */
  readonly pool: TopicAffineWorkerPool<unknown> | null;

  constructor(options: WorkerPoolDispatcherOptions) {
    this.pool = options.workerUrl
      ? new TopicAffineWorkerPool<unknown>({
          workerUrl: options.workerUrl,
          poolSize: options.poolSize,
          queueDepth: options.queueDepth,
        })
      : null;
  }

  async executeLocalTurn<T>(
    claim: LocalTurnPlacementClaim,
    runLocal: () => Promise<T>,
  ): Promise<T> {
    // Local turns (cron, CLI) run inline — no worker dispatch needed.
    return this.mainThread.executeLocalTurn(claim, runLocal);
  }

  async executeTurn(
    claim: LocalTurnPlacementClaim,
    params: SessionPlacementTurnParams,
    runLocal: () => Promise<EmbeddedAgentRunResult>,
    onAdmitted?: () => void,
  ): Promise<EmbeddedAgentRunResult> {
    // Phase 3 (Scale 1 partial): claim on main, execute on main.
    // The pool is available for subtask offload (compaction, code-mode).
    // Future: dispatch runLocal to the topic-affine worker instead.
    return this.mainThread.executeTurn(claim, params, runLocal, onAdmitted);
  }

  /** Terminate the worker pool (no-op when no pool is configured). */
  async terminate(): Promise<void> {
    await this.pool?.terminateAll();
  }
}

export type { WorkerPoolError };
