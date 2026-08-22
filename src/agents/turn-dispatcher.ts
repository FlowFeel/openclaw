/**
 * Turn dispatcher port — the hexagonal adapter (§3.1) for turn execution.
 *
 * The `TurnDispatcher` is the transport-agnostic port; concrete adapters
 * select the execution context (main thread, in-process worker, remote SSH
 * worker).  The pure policies (`topic-isolation-policy.ts`,
 * `runtime-scale-policy.ts`) decide *which* adapter; this module defines the
 * interface and the Scale 0 adapter.
 *
 * Mapping to existing OC internals:
 *   `TurnDispatcher`  =  `SessionPlacementAdmissionProvider`  (the port already exists)
 *   Scale 0           =  `MainThreadDispatcher`  (this file)  — inline on main loop
 *   Scale 1           =  `WorkerPoolDispatcher`  (Phase 3)     — in-process worker_threads pool
 *   Scale 2           =  remote `WorkerEnvironmentService`    — SSH-tunneled workers (exists)
 *
 * The `MainThreadDispatcher` is also the §3.2 DirectExecutionDispatcher test
 * double — it runs the task in-process with the identical async interface,
 * no threads spawned.
 */
import type { EmbeddedAgentRunResult } from "./embedded-agent-runner/types.js";
import type {
  LocalTurnPlacementClaim,
  SessionPlacementTurnParams,
} from "./session-placement-admission.js";

/**
 * The turn dispatcher port — decides where a turn executes.
 *
 * Identical to `SessionPlacementAdmissionProvider`; aliased here to make the
 * hexagonal role explicit and to give Phase 3 a single import point.
 */
export type TurnDispatcher = {
  /**
   * Execute a local (non-remote) turn — the task runs inline.
   * Used by cron, CLI, and other non-session turn paths.
   */
  executeLocalTurn: <T>(claim: LocalTurnPlacementClaim, runLocal: () => Promise<T>) => Promise<T>;

  /**
   * Execute a full session turn — may run locally or remotely depending on
   * the adapter.
   *
   * @param claim   The session/turn identity for admission.
   * @param params  The turn parameters (model, messages, etc.).
   * @param runLocal  Fallback that runs the turn inline on the main thread.
   * @param onAdmitted  Callback fired when admission is granted (before execution).
   */
  executeTurn: (
    claim: LocalTurnPlacementClaim,
    params: SessionPlacementTurnParams,
    runLocal: () => Promise<EmbeddedAgentRunResult>,
    onAdmitted?: () => void,
  ) => Promise<EmbeddedAgentRunResult>;
};

/**
 * Scale 0 dispatcher — runs all turns inline on the main event loop.
 *
 * This is the default (backward-compatible) adapter.  It is also the §3.2
 * DirectExecutionDispatcher test double: instantiate it directly in tests,
 * no threads spawned, deterministic.
 *
 * When installed as the admission provider, it preserves the exact behavior
 * of "no provider": call `onAdmitted`, then run the task inline.
 */
export class MainThreadDispatcher implements TurnDispatcher {
  async executeLocalTurn<T>(
    _claim: LocalTurnPlacementClaim,
    runLocal: () => Promise<T>,
  ): Promise<T> {
    return await runLocal();
  }

  async executeTurn(
    _claim: LocalTurnPlacementClaim,
    _params: SessionPlacementTurnParams,
    runLocal: () => Promise<EmbeddedAgentRunResult>,
    onAdmitted?: () => void,
  ): Promise<EmbeddedAgentRunResult> {
    onAdmitted?.();
    return await runLocal();
  }
}
