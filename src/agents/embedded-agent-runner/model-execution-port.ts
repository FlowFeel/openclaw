/**
 * Model execution port — the swappable boundary for model API calls.
 *
 * Phase 3a-1 (phase-3a-1-extraction-findings.md):
 * The model API call (`streamSimple` in `llm/stream.ts`) is extracted behind
 * this port. The default adapter (`DirectModelExecutionPort`) calls
 * `streamSimple` directly — identical to the previous behavior. A future
 * worker adapter (`WorkerModelExecutionPort`, Phase 3a-2) will dispatch to
 * the `TopicAffineWorkerPool` for Scale 1.
 *
 * This mirrors the existing `SessionPlacementAdmissionProvider` singleton
 * pattern: install at startup, resolve at the call site.
 *
 * Why offload at `stream()` (not `agent.streamFn`):
 * `agent.streamFn` is wrapped by ~10 layers (diagnostics, transforms,
 * recovery, sanitization) that run on the main thread and need process-global
 * access. The `stream()` facade is the boundary between main-thread concerns
 * (prompt, tools, wrappers, hooks) and model API concerns (HTTP fetch, SSE
 * parse). Offloading here means the worker does only HTTP + SSE, exactly like
 * Scale 2's `WorkerInferenceExecutor`.
 *
 * @dft
 * - A1 (pure-io-separation): the port type is pure; adapters do I/O.
 * - A4 (dft-docs): this file is documented.
 * - §3.1 (hexagonal port): one port, two adapters (direct + worker).
 */
import { streamSimple } from "../../llm/stream.js";
import type {
  AssistantMessageEventStreamContract,
  Context,
  Model,
  SimpleStreamOptions,
} from "../../llm/types.js";
import { resolveGlobalSingleton } from "../../shared/global-singleton.js";

/**
 * The model execution port — streams model responses.
 *
 * Implementations:
 * - `DirectModelExecutionPort` (Scale 0): calls `streamSimple` on main.
 * - `WorkerModelExecutionPort` (Scale 1, Phase 3a-2): dispatches to worker pool.
 */
export interface ModelExecutionPort {
  /**
   * Stream a model response. Mirrors `streamSimple` in `llm/stream.ts`.
   *
   * Returns an `AssistantMessageEventStreamContract` — an async iterable of
   * assistant message events (start, text_delta, toolcall_delta, done, error).
   * The caller (agent loop) iterates this stream regardless of where it came
   * from.
   */
  stream(
    model: Model,
    context: Context,
    options?: SimpleStreamOptions,
  ): AssistantMessageEventStreamContract;
}

type ModelExecutionPortState = {
  port?: ModelExecutionPort;
};

const state = resolveGlobalSingleton(
  Symbol.for("openclaw.modelExecutionPortState"),
  (): ModelExecutionPortState => ({}),
);

/**
 * Install a model execution port. Returns an uninstall function.
 *
 * Called at startup by `runtime-setup.ts`. At Scale 0, installs
 * `DirectModelExecutionPort`. At Scale 1 (Phase 3a-3), installs
 * `WorkerModelExecutionPort`.
 */
export function installModelExecutionPort(port: ModelExecutionPort): () => void {
  state.port = port;
  return () => {
    if (state.port === port) {
      state.port = undefined;
    }
  };
}

/**
 * Resolve the installed model execution port.
 *
 * Returns `DirectModelExecutionPort` when no port is installed (default,
 * backward-compatible). This is the call site for `sessions/sdk.ts`.
 */
export function resolveModelExecutionPort(): ModelExecutionPort {
  return state.port ?? directModelExecutionPort;
}

/**
 * Direct model execution port — calls `streamSimple` on the main thread.
 *
 * This is the default (Scale 0) and the graceful-degradation fallback for
 * Scale 1 (Phase 3a-5: when the worker pool is busy, fall back to direct).
 */
export class DirectModelExecutionPort implements ModelExecutionPort {
  stream(
    model: Model,
    context: Context,
    options?: SimpleStreamOptions,
  ): AssistantMessageEventStreamContract {
    return streamSimple(model, context, options);
  }
}

const directModelExecutionPort: ModelExecutionPort = new DirectModelExecutionPort();
