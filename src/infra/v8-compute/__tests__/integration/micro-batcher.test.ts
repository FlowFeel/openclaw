/**
 * Tier 2 Integration Tests: MicroBatcher Buffer & Flush Mechanics.
 */

import { describe, expect, it, vi } from "vitest";
import { MicroBatcher } from "../../micro-batcher.js";
import { TransferableEnvelope, V8ComputeOpCode } from "../../types.js";

describe("MicroBatcher (Tier 2 Integration)", () => {
  it("buffers tasks and flushes automatically after batchWindowMs", async () => {
    vi.useFakeTimers();

    const flushedBatches: number[] = [];
    const batcher = new MicroBatcher(3, (batch) => {
      flushedBatches.push(batch.length);
    });

    const env: TransferableEnvelope = {
      op: V8ComputeOpCode.PING,
      handleId: 1,
      payload: new Uint8Array([1]),
    };

    batcher.submit(env, () => {}, () => {});
    batcher.submit(env, () => {}, () => {});

    expect(flushedBatches.length).toBe(0);
    expect(batcher.pendingCount).toBe(2);

    vi.advanceTimersByTime(3);

    expect(flushedBatches.length).toBe(1);
    expect(flushedBatches[0]).toBe(2);
    expect(batcher.pendingCount).toBe(0);

    vi.useRealTimers();
  });

  it("flushes immediately when maxBatchSize is reached", () => {
    const flushedBatches: number[] = [];
    const batcher = new MicroBatcher(100, (batch) => {
      flushedBatches.push(batch.length);
    }, 3); // Max batch size 3

    const env: TransferableEnvelope = {
      op: V8ComputeOpCode.PING,
      handleId: 1,
      payload: new Uint8Array([1]),
    };

    batcher.submit(env, () => {}, () => {});
    batcher.submit(env, () => {}, () => {});
    expect(flushedBatches.length).toBe(0);

    // 3rd item triggers instant flush
    batcher.submit(env, () => {}, () => {});
    expect(flushedBatches.length).toBe(1);
    expect(flushedBatches[0]).toBe(3);
  });
});
