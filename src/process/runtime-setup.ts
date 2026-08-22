/**
 * Runtime setup — wires the TurnDispatcher + ModelExecutionPort based on
 * config + host capabilities.
 *
 * Called at gateway startup.  Reads `agents.defaults.runtime` from config,
 * resolves the scale via the pure `runtime-scale-policy`, and installs the
 * appropriate dispatchers.
 *
 * Scale 0 (auto on 1-CPU, or disabled):
 *   - No TurnDispatcher installed (default — turns run inline on main loop).
 *   - DirectModelExecutionPort (default — model calls run on main).
 *   - Per-session admission only.
 *
 * Scale 1 (in-process, or auto on >1-CPU):
 *   - WorkerPoolDispatcher installed (for the turn admission provider
 *     interface).  Turn execution still delegates to MainThreadDispatcher
 *     (full turn dispatch requires serializing ~200 params — deferred).
 *   - WorkerModelExecutionPort installed (3a-3): model API calls offloaded
 *     to a TopicAffineWorkerPool.  This is the real Scale 1 parallelism —
 *     model fetch + SSE parse runs in a worker, main loop stays I/O-free.
 *
 * Scale 2 (remote): the existing `worker-environments` layer handles
 *   installation; this module does not override it.
 *
 * Cleanup (1b): returns a `cleanup()` function that uninstalls providers
 * and terminates pools.  The caller registers this as a gateway lifetime
 * sidecar so it runs on shutdown.
 *
 * @dft
 * - A1 (pure-io-separation): the scale decision is pure (runtime-scale-policy);
 *   the provider installation is I/O (this module).
 * - A4 (dft-docs): this file is documented.
 */
import os from "node:os";
import { terminateCompactionPlanningPool } from "../agents/compaction-planning-worker.js";
import { installModelExecutionPort } from "../agents/embedded-agent-runner/model-execution-port.js";
import {
  WorkerModelExecutionPort,
  resolveModelExecutionWorkerUrl,
} from "../agents/embedded-agent-runner/model-execution-worker.js";
import { installSessionPlacementAdmissionProvider } from "../agents/session-placement-admission.js";
import type { TurnDispatcher } from "../agents/turn-dispatcher.js";
import { WorkerPoolDispatcher } from "../agents/worker-pool-dispatcher.js";
import type { OpenClawConfig } from "../config/types.js";
import { resolveRuntimeScale, type RuntimeScale } from "./runtime-scale-policy.js";

export type RuntimeSetupResult = {
  scale: RuntimeScale;
  /** The installed dispatcher (null for Scale 0 / Scale 2). */
  dispatcher: TurnDispatcher | null;
  /** The installed model execution port (null for Scale 0 / Scale 2). */
  modelExecutionPort: WorkerModelExecutionPort | null;
  /** Cleanup function — uninstalls providers + terminates pools. */
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
    // Scale 1: install the worker pool dispatcher (turn admission provider).
    //
    // Turn execution still delegates to MainThreadDispatcher (full turn
    // dispatch requires serializing ~200 params — deferred).  The dispatcher
    // is installed for interface completeness; its pool is null.
    const dispatcher = new WorkerPoolDispatcher({
      poolSize: scale.poolSize,
    });
    const uninstallDispatcher = installSessionPlacementAdmissionProvider(dispatcher);

    // 3a-3: install the WorkerModelExecutionPort — the real Scale 1 offload.
    // Model API calls (streamSimple) are dispatched to a TopicAffineWorkerPool.
    // The worker does HTTP fetch + SSE parse; main keeps all prompt/tool/wrapper
    // logic.  This is the same pattern as Scale 2's WorkerInferenceExecutor.
    const modelExecutionPort = new WorkerModelExecutionPort({
      workerUrl: resolveModelExecutionWorkerUrl(),
      poolSize: scale.poolSize,
    });
    const uninstallModelPort = installModelExecutionPort(modelExecutionPort);

    const cleanup = async () => {
      uninstallDispatcher();
      uninstallModelPort();
      await dispatcher.terminate();
      await modelExecutionPort.terminate();
      await terminateCompactionPlanningPool();
    };
    return { scale, dispatcher, modelExecutionPort: modelExecutionPort, cleanup };
  }

  // Scale 0 or Scale 2: no dispatcher installed here.
  // Scale 0 = default inline behavior (no provider).
  // Scale 2 = remote worker layer installs its own provider.
  // Still clean up the compaction pool (lazy singleton, scale-independent).
  return {
    scale,
    dispatcher: null,
    modelExecutionPort: null,
    cleanup: () => terminateCompactionPlanningPool(),
  };
}
