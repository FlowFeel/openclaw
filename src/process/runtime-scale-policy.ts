/**
 * Runtime scale policy — pure function that resolves the concurrency scale.
 *
 * Decides, given the runtime config and host capabilities, which scale the
 * gateway operates at:
 *
 *   Scale 0 — inline on main loop (1-CPU host, default).  No worker pool.
 *   Scale 1 — in-process worker_threads pool with topic affinity (N-CPU host).
 *   Scale 2 — SSH-tunneled remote workers (fleet, exists today).
 *
 * This is the pure kernel (§3.1 Transport Decoupling): no I/O, no
 * Date.now/Math.random/process.env.  Same inputs → same output.  The actual
 * dispatcher installation (provider wiring) is I/O and stays in the caller.
 *
 * @dft
 * - A1 (pure-io-separation): no I/O imports. Pure function.
 * - A2 (determinism): no Date.now/Math.random/process.env.
 * - A4 (dft-docs): this file is documented.
 * - A6 (check-result): returns a RuntimeScale result struct with `reason`.
 */

/**
 * The isolation mode — how turns are dispatched.
 *
 * - `"auto"` (default): Scale 0 on 1-CPU hosts, Scale 1 on >1-CPU hosts.
 * - `"disabled"`: always Scale 0 (single-threaded, backward-compatible).
 * - `"in-process"`: always Scale 1 (in-process worker pool).
 * - `"remote"`: always Scale 2 (SSH-tunneled remote workers).
 */
export type RuntimeIsolationMode = "auto" | "disabled" | "in-process" | "remote";

/**
 * The host's parallelism capabilities (injected for testability).
 */
export type HostCapabilities = {
  /** Number of logical CPUs (os.availableParallelism()). */
  availableParallelism: number;
};

/**
 * The runtime config (extracted from agents.defaults.runtime).
 */
export type RuntimeConfig = {
  isolation?: RuntimeIsolationMode;
  workerCount?: number;
};

/** The maximum supported worker pool size (caps the pool). */
export const MAX_WORKER_COUNT = 64;

/**
 * The resolved runtime scale — a result struct (A6: check-result).
 * Carries its own proof: `reason` explains why this scale was chosen.
 */
export type RuntimeScale = {
  /** The scale level: 0 (inline), 1 (in-process pool), 2 (remote). */
  readonly scale: 0 | 1 | 2;
  /** The worker pool size (0 for Scale 0 and Scale 2). */
  readonly poolSize: number;
  /** The effective isolation mode. */
  readonly isolation: RuntimeIsolationMode;
  /** Why this scale was chosen — for traceability and logging. */
  readonly reason: string;
};

/**
 * Resolve the runtime scale from config and host capabilities.
 *
 * Pure — same inputs always yield the same output.
 *
 * @example
 *   resolveRuntimeScale({}, { availableParallelism: 1 })
 *     // → { scale: 0, poolSize: 0, isolation: "auto", reason: "auto: 1 CPU → Scale 0" }
 *   resolveRuntimeScale({ isolation: "in-process", workerCount: 4 }, { availableParallelism: 8 })
 *     // → { scale: 1, poolSize: 4, isolation: "in-process", reason: "in-process: poolSize 4" }
 *   resolveRuntimeScale({ isolation: "remote" }, { availableParallelism: 8 })
 *     // → { scale: 2, poolSize: 0, isolation: "remote", reason: "remote: SSH worker environments" }
 */
export function resolveRuntimeScale(config: RuntimeConfig, host: HostCapabilities): RuntimeScale {
  const isolation = config.isolation ?? "auto";
  const cpus = Math.max(1, Math.floor(host.availableParallelism) || 1);

  // Scale 2: explicit remote isolation
  if (isolation === "remote") {
    return {
      scale: 2,
      poolSize: 0,
      isolation: "remote",
      reason: "remote: SSH worker environments",
    };
  }

  // Scale 1: explicit in-process isolation
  if (isolation === "in-process") {
    const poolSize = clampPoolSize(config.workerCount ?? cpus);
    return {
      scale: 1,
      poolSize,
      isolation: "in-process",
      reason: `in-process: poolSize ${poolSize}`,
    };
  }

  // Scale 0: explicit disabled
  if (isolation === "disabled") {
    return {
      scale: 0,
      poolSize: 0,
      isolation: "disabled",
      reason: "disabled: single-threaded, main loop only",
    };
  }

  // auto: Scale 0 on 1-CPU hosts, Scale 1 on >1-CPU hosts
  if (cpus <= 1) {
    return {
      scale: 0,
      poolSize: 0,
      isolation: "auto",
      reason: `auto: ${cpus} CPU → Scale 0 (inline)`,
    };
  }

  const poolSize = clampPoolSize(config.workerCount ?? cpus);
  return {
    scale: 1,
    poolSize,
    isolation: "auto",
    reason: `auto: ${cpus} CPUs → Scale 1 (in-process pool, poolSize ${poolSize})`,
  };
}

function clampPoolSize(requested: number): number {
  return Math.max(1, Math.min(MAX_WORKER_COUNT, Math.floor(requested) || 1));
}
