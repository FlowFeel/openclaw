/**
 * Tier 2 Integration Tests: Elastic V8ComputePool Worker Lifecycle & Dispatch.
 */

import { describe, expect, it } from "vitest";
import { resolveTopologyProfile } from "../../pool-sizing.js";
import {
  ChannelTransportPreference,
  ComputeTopologyMode,
  TopologyProfile,
  V8ComputeOpCode,
} from "../../types.js";
import { V8ComputePool } from "../../worker-pool.js";

describe("V8ComputePool (Tier 2 Elastic Worker Pool Integration)", () => {
  it("executes PING with zero-copy binary transfer roundtrip", async () => {
    const singleCoreProfile: TopologyProfile = {
      mode: ComputeTopologyMode.SINGLE_CORE_ISOLATE,
      workerCount: 1,
      maxIsolateMemoryMb: 48,
      batchWindowMs: 2,
      transportPreference: ChannelTransportPreference.TRANSFERABLE_ARRAY_BUFFER,
    };

    const workerScript = new URL("../../compute-worker.ts", import.meta.url).pathname;

    const pool = new V8ComputePool({
      customProfile: singleCoreProfile,
      workerScriptPath: workerScript,
    });

    const payload = new TextEncoder().encode("Elastic Pool Payload");
    const result = await pool.execute(V8ComputeOpCode.PING, payload);

    expect(result.op).toBe(V8ComputeOpCode.PING);
    expect(new TextDecoder().decode(result.payload)).toBe("Elastic Pool Payload");

    await pool.dispose();
  });

  it("handles concurrent multi-task dispatch across batched queue", async () => {
    const dualCoreProfile = resolveTopologyProfile(2, 4096);
    const workerScript = new URL("../../compute-worker.ts", import.meta.url).pathname;

    const pool = new V8ComputePool({
      customProfile: dualCoreProfile,
      workerScriptPath: workerScript,
    });

    const tasks = Array.from({ length: 10 }, (_, i) => {
      const payload = new TextEncoder().encode(`Task-${i}`);
      return pool.execute(V8ComputeOpCode.PING, payload);
    });

    const results = await Promise.all(tasks);
    expect(results.length).toBe(10);
    for (let i = 0; i < 10; i++) {
      expect(new TextDecoder().decode(results[i].payload)).toBe(`Task-${i}`);
    }

    await pool.dispose();
  });
});
