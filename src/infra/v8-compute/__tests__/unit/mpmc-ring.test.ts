/**
 * Tier 1 Pure Unit Tests: Lock-Free SharedArrayBuffer Ring Buffer Math.
 */

import { describe, expect, it } from "vitest";
import {
  createRingDescriptor,
  getRingStats,
  tryDequeueSlot,
  tryEnqueueSlot,
} from "../../mpmc-ring.js";
import { RingBufferStatus } from "../../types.js";

describe("MPMC SharedArrayBuffer Ring Buffer (Pure Concurrency Math)", () => {
  it("enforces capacity to be a power of 2", () => {
    expect(() => createRingDescriptor(10)).toThrowError(/power of 2/);
    expect(() => createRingDescriptor(64)).not.toThrow();
  });

  it("enqueues and dequeues slots sequentially", () => {
    const ring = createRingDescriptor(4, 64);
    const msg1 = new TextEncoder().encode("slot-1");
    const msg2 = new TextEncoder().encode("slot-2");

    expect(tryEnqueueSlot(ring, msg1)).toBe(RingBufferStatus.SUCCESS);
    expect(tryEnqueueSlot(ring, msg2)).toBe(RingBufferStatus.SUCCESS);

    const stats = getRingStats(ring);
    expect(stats.occupancy).toBe(2);

    const outBuf1 = new Uint8Array(64);
    expect(tryDequeueSlot(ring, outBuf1)).toBe(RingBufferStatus.SUCCESS);
    expect(new TextDecoder().decode(outBuf1).startsWith("slot-1")).toBe(true);

    const outBuf2 = new Uint8Array(64);
    expect(tryDequeueSlot(ring, outBuf2)).toBe(RingBufferStatus.SUCCESS);
    expect(new TextDecoder().decode(outBuf2).startsWith("slot-2")).toBe(true);

    const emptyBuf = new Uint8Array(64);
    expect(tryDequeueSlot(ring, emptyBuf)).toBe(RingBufferStatus.EMPTY);
  });

  it("returns FULL and records dropped count without blocking when capacity is reached", () => {
    const ring = createRingDescriptor(2, 32);
    const payload = new Uint8Array([1, 2, 3]);

    expect(tryEnqueueSlot(ring, payload)).toBe(RingBufferStatus.SUCCESS);
    expect(tryEnqueueSlot(ring, payload)).toBe(RingBufferStatus.SUCCESS);

    // 3rd enqueue should return FULL
    expect(tryEnqueueSlot(ring, payload)).toBe(RingBufferStatus.FULL);

    const stats = getRingStats(ring);
    expect(stats.occupancy).toBe(2);
    expect(stats.droppedCount).toBe(1);
  });
});
