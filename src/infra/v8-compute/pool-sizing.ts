/**
 * Pure Decision Core: Elastic Topology Profile Resolution & Pool Sizing.
 * 
 * Axiom:
 * Determines optimal isolate count, memory boundaries, and batching windows
 * dynamically based on physical cores and available memory.
 */

import {
  ChannelTransportPreference,
  ComputeTopologyMode,
  TopologyProfile,
} from "./types.js";

export const DEFAULT_ISOLATE_BASELINE_MEMORY_MB = 35;
export const SINGLE_CORE_ISOLATE_MEMORY_MB = 48;
export const DUAL_CORE_ISOLATE_MEMORY_MB = 128;
export const MULTI_CORE_ISOLATE_MEMORY_MB = 192;

/**
 * Pure function resolving the exact operational profile for the host architecture.
 */
export function resolveTopologyProfile(
  cpus: number,
  availableMemoryMb: number,
  reserveMainCores: number = 1,
): TopologyProfile {
  const safeCpus = Math.max(1, Math.floor(cpus));
  const safeMemory = Math.max(16, Math.floor(availableMemoryMb));

  // Max workers bounded by memory constraint
  const memoryConstrainedMaxWorkers = Math.max(
    1,
    Math.floor(safeMemory / DEFAULT_ISOLATE_BASELINE_MEMORY_MB),
  );

  // 1. Single-Core Architecture (e.g. AWS EC2 1-vCPU nodes)
  if (safeCpus === 1) {
    return {
      mode: ComputeTopologyMode.SINGLE_CORE_ISOLATE,
      workerCount: 1,
      maxIsolateMemoryMb: Math.min(SINGLE_CORE_ISOLATE_MEMORY_MB, Math.floor(safeMemory * 0.25)),
      batchWindowMs: 4, // 4ms cooperative batch window to yield event-loop I/O polling
      transportPreference: ChannelTransportPreference.TRANSFERABLE_ARRAY_BUFFER,
    };
  }

  // 2. Dual-Core Architecture (e.g. 2-vCPU VMs, standard CI runners)
  if (safeCpus === 2) {
    const workerCount = Math.min(1, memoryConstrainedMaxWorkers);
    return {
      mode: ComputeTopologyMode.DUAL_CORE_DEDICATED,
      workerCount,
      maxIsolateMemoryMb: Math.min(DUAL_CORE_ISOLATE_MEMORY_MB, Math.floor(safeMemory * 0.35)),
      batchWindowMs: 2, // Low-latency 2ms batch window
      transportPreference: ChannelTransportPreference.DUAL_LANE_HYBRID,
    };
  }

  // 3. Multi-Core Architecture (Quad Core / 4+ vCPU clusters)
  const theoreticalWorkers = Math.max(1, safeCpus - reserveMainCores);
  const workerCount = Math.min(theoreticalWorkers, memoryConstrainedMaxWorkers);

  return {
    mode: ComputeTopologyMode.MULTI_CORE_PARTITIONED,
    workerCount,
    maxIsolateMemoryMb: Math.min(MULTI_CORE_ISOLATE_MEMORY_MB, Math.floor(safeMemory / (workerCount + 1))),
    batchWindowMs: 1, // High throughput 1ms dispatch window
    transportPreference: ChannelTransportPreference.SHARED_ARRAY_BUFFER_RING,
  };
}
