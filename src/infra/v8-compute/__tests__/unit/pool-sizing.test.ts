/**
 * Tier 1 Pure Unit Tests: Elastic Topology Profile Resolution & Pool Sizing.
 */

import { describe, expect, it } from "vitest";
import { resolveTopologyProfile } from "../../pool-sizing.js";
import {
  ChannelTransportPreference,
  ComputeTopologyMode,
} from "../../types.js";

describe("resolveTopologyProfile (Pure Topology Sizing)", () => {
  it("resolves SINGLE_CORE_ISOLATE for 1 vCPU environment (e.g. EC2 production)", () => {
    const profile = resolveTopologyProfile(1, 1900); // 1.9GB RAM EC2

    expect(profile.mode).toBe(ComputeTopologyMode.SINGLE_CORE_ISOLATE);
    expect(profile.workerCount).toBe(1);
    expect(profile.maxIsolateMemoryMb).toBeLessThanOrEqual(48);
    expect(profile.batchWindowMs).toBe(4);
    expect(profile.transportPreference).toBe(ChannelTransportPreference.TRANSFERABLE_ARRAY_BUFFER);
  });

  it("resolves DUAL_CORE_DEDICATED for 2 vCPU environment", () => {
    const profile = resolveTopologyProfile(2, 4096);

    expect(profile.mode).toBe(ComputeTopologyMode.DUAL_CORE_DEDICATED);
    expect(profile.workerCount).toBe(1);
    expect(profile.maxIsolateMemoryMb).toBeLessThanOrEqual(128);
    expect(profile.batchWindowMs).toBe(2);
    expect(profile.transportPreference).toBe(ChannelTransportPreference.DUAL_LANE_HYBRID);
  });

  it("resolves MULTI_CORE_PARTITIONED for Quad-Core (4 vCPU) environment", () => {
    const profile = resolveTopologyProfile(4, 8192);

    expect(profile.mode).toBe(ComputeTopologyMode.MULTI_CORE_PARTITIONED);
    expect(profile.workerCount).toBe(3); // 4 cores - 1 main = 3
    expect(profile.batchWindowMs).toBe(1);
    expect(profile.transportPreference).toBe(ChannelTransportPreference.SHARED_ARRAY_BUFFER_RING);
  });

  it("resolves MULTI_CORE_PARTITIONED for 16-Core server environment", () => {
    const profile = resolveTopologyProfile(16, 32768);

    expect(profile.mode).toBe(ComputeTopologyMode.MULTI_CORE_PARTITIONED);
    expect(profile.workerCount).toBe(15);
  });

  it("clamps worker count gracefully when memory is severely constrained", () => {
    // 8 cores but only 70MB available memory -> max 2 workers
    const profile = resolveTopologyProfile(8, 70);

    expect(profile.mode).toBe(ComputeTopologyMode.MULTI_CORE_PARTITIONED);
    expect(profile.workerCount).toBe(2);
  });
});
