/**
 * Tier 3 Fault Injection Tests: Worker Crash Recovery & Promise Cleanup.
 */

import { describe, expect, it } from "vitest";
import {
  ChannelTransportPreference,
  ComputeTopologyMode,
  TopologyProfile,
  V8ComputeOpCode,
} from "../../types.js";
import { V8ComputePool } from "../../worker-pool.js";

describe("V8ComputePool Fault Recovery (Tier 3 Fault Injection)", () => {
  it("detects sudden worker termination and recovers transparently for subsequent tasks", async () => {
    const singleCoreProfile: TopologyProfile = {
      mode: ComputeTopologyMode.SINGLE_CORE_ISOLATE,
      workerCount: 1,
      maxIsolateMemoryMb: 48,
      batchWindowMs: 1,
      transportPreference: ChannelTransportPreference.TRANSFERABLE_ARRAY_BUFFER,
    };

    const workerScript = new URL("../../compute-worker.ts", import.meta.url).pathname;

    const pool = new V8ComputePool({
      customProfile: singleCoreProfile,
      workerScriptPath: workerScript,
    });

    // 1. Initial healthy task
    const res1 = await pool.execute(
      V8ComputeOpCode.PING,
      new TextEncoder().encode("Pre-crash"),
    );
    expect(new TextDecoder().decode(res1.payload)).toBe("Pre-crash");

    // 2. Terminate the internal worker forcibly to simulate crash
    const slots = (pool as unknown as { workerSlots: Array<{ worker: { terminate: () => Promise<number> } }> }).workerSlots;
    expect(slots.length).toBe(1);
    await slots[0].worker.terminate();

    // Give event loop tick for exit event handler to respawn
    await new Promise((r) => setTimeout(r, 50));

    // 3. Post-crash task should succeed via the respawned isolate
    const res2 = await pool.execute(
      V8ComputeOpCode.PING,
      new TextEncoder().encode("Post-crash recovery"),
    );
    expect(new TextDecoder().decode(res2.payload)).toBe("Post-crash recovery");

    await pool.dispose();
  });
});
