/**
 * Runtime setup — wires the TurnDispatcher based on config + host capabilities.
 *
 * Called at gateway startup.  Reads `agents.defaults.runtime` from config,
 * resolves the scale via the pure `runtime-scale-policy`, and installs the
 * appropriate dispatcher as the session placement admission provider.
 *
 * Scale 0 (auto on 1-CPU, or disabled): no provider installed (default
 *   behavior — turns run inline on the main loop).
 * Scale 1 (in-process, or auto on >1-CPU): installs `WorkerPoolDispatcher`.
 *   No workerUrl is passed yet (Scale 1 partial — turn execution stays on
 *   main, the pool is not created).  When the agent runner is worker-safe
 *   (Phase 3a), the real worker URL is wired in and the pool activates.
 * Scale 2 (remote): the existing `worker-environments` layer handles
 *   installation; this module does not override it.
 *
 * Cleanup (1b): returns a `cleanup()` function that uninstalls the provider
 * and terminates the dispatcher's pool.  The caller registers this as a
 * gateway lifetime sidecar so it runs on shutdown.
 *
 * @dft
 * - A1 (pure-io-separation): the scale decision is pure (runtime-scale-policy);
 *   the provider installation is I/O (this module).
 * - A4 (dft-docs): this file is documented.
 */
import os from "node:os";
import { terminateCompactionPlanningPool } from "../agents/compaction-planning-worker.js";
import { installSessionPlacementAdmissionProvider } from "../agents/session-placement-admission.js";
import type { TurnDispatcher } from "../agents/turn-dispatcher.js";
import { WorkerPoolDispatcher } from "../agents/worker-pool-dispatcher.js";
import type { OpenClawConfig } from "../config/types.js";
import { resolveRuntimeScale, type RuntimeScale } from "./runtime-scale-policy.js";

export type RuntimeSetupResult = {
  scale: RuntimeScale;
  /** The installed dispatcher (null for Scale 0 / Scale 2). */
  dispatcher: TurnDispatcher | null;
  /** Cleanup function — uninstalls the provider + terminates the pool. */
  cleanup: () => Promise<void>;
};

/**
 * Read the config, resolve the scale, and install the dispatcher if needed.
 *
 * @returns The resolved scale, the installed dispatcher, and a cleanup function.
 */
export function setupRuntime(config: OpenClawConfig): RuntimeSetupResult {
  const runtimeConfig = config?.agents?.defaults?.runtime ?? {};
  const host = {
    availableParallelism:
      typeof os.availableParallelism === "function" ? os.availableParallelism() : os.cpus().length,
  };

  const scale = resolveRuntimeScale(runtimeConfig, host);

  if (scale.scale === 1) {
    // Scale 1: install the worker pool dispatcher.
    //
    // No workerUrl yet (Scale 1 partial): the dispatcher creates no pool —
    // it wraps MainThreadDispatcher for turn execution.  When the agent
    // runner is worker-safe (Phase 3a), pass the real worker URL here and
    // the pool activates for topic-affine turn dispatch.
    const dispatcher = new WorkerPoolDispatcher({
      poolSize: scale.poolSize,
    });
    // 1c: install the TurnDispatcher directly — it structurally satisfies
    // SessionPlacementAdmissionProvider (same interface).
    const uninstall = installSessionPlacementAdmissionProvider(dispatcher);
    const cleanup = async () => {
      uninstall();
      await dispatcher.terminate();
      await terminateCompactionPlanningPool();
    };
    return { scale, dispatcher, cleanup };
  }

  // Scale 0 or Scale 2: no dispatcher installed here.
  // Scale 0 = default inline behavior (no provider).
  // Scale 2 = remote worker layer installs its own provider.
  // Still clean up the compaction pool (lazy singleton, scale-independent).
  return { scale, dispatcher: null, cleanup: () => terminateCompactionPlanningPool() };
}
