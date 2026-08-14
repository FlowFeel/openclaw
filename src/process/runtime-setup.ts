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
 *   The pool is warm and available for subtask offload.  Turn execution
 *   stays on main (Scale 1 partial) until the agent runner is worker-safe.
 * Scale 2 (remote): the existing `worker-environments` layer handles
 *   installation; this module does not override it.
 *
 * @dft
 * - A1 (pure-io-separation): the scale decision is pure (runtime-scale-policy);
 *   the provider installation is I/O (this module).
 * - A4 (dft-docs): this file is documented.
 */
import os from "node:os";
import { installSessionPlacementAdmissionProvider } from "../agents/session-placement-admission.js";
import { WorkerPoolDispatcher } from "../agents/worker-pool-dispatcher.js";
import type { OpenClawConfig } from "../config/types.js";
import { resolveRuntimeScale, type RuntimeScale } from "./runtime-scale-policy.js";

export type RuntimeSetupResult = {
  scale: RuntimeScale;
  dispatcher: WorkerPoolDispatcher | null;
};

/**
 * Read the config, resolve the scale, and install the dispatcher if needed.
 *
 * @returns The resolved scale and the installed dispatcher (null for Scale 0).
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
    // The worker URL will be resolved by the dispatcher lazily; for now
    // we use a placeholder that the dispatcher fills in on first use.
    // (Full turn dispatch is Scale 1 partial — subtask offload only.)
    const dispatcher = new WorkerPoolDispatcher({
      workerUrl: new URL("about:blank"), // placeholder — subtask pool is separate
      poolSize: scale.poolSize,
    });
    const uninstall = installSessionPlacementAdmissionProvider({
      executeLocalTurn: (claim, runLocal) => dispatcher.executeLocalTurn(claim, runLocal),
      executeTurn: (claim, params, runLocal, onAdmitted) =>
        dispatcher.executeTurn(claim, params, runLocal, onAdmitted),
    });
    // Best-effort cleanup — the gateway process exits on shutdown anyway.
    void uninstall;
    return { scale, dispatcher };
  }

  // Scale 0 or Scale 2: no dispatcher installed here.
  // Scale 0 = default inline behavior (no provider).
  // Scale 2 = remote worker layer installs its own provider.
  return { scale, dispatcher: null };
}
