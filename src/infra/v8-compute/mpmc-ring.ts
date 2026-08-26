/**
 * Pure Decision Core: Lock-Free MPMC Ring Buffer on SharedArrayBuffer (Lane B).
 * 
 * Axiom:
 * Lock-free multi-producer multi-consumer ring coordinated exclusively via
 * atomic operations (Atomics.compareExchange, Atomics.load, Atomics.add).
 */

import {
  MpmcRingDescriptor,
  RING_HEADER_WORDS,
  RingBufferStatus,
} from "./types.js";

// Offsets in Int32Array (4 bytes per 32-bit word)
const HEAD_INDEX = 0;          // Next sequence to dequeue
const TAIL_INDEX = 1;          // Next sequence to enqueue
const CAPACITY_INDEX = 2;      // Power of two capacity
const DROPPED_COUNT_INDEX = 3;  // Overrun counter

/**
 * Creates a new SharedArrayBuffer-backed MpmcRingDescriptor.
 * Capacity must be a positive power of 2.
 */
export function createRingDescriptor(
  capacity: number = 64,
  slotSizeBytes: number = 256,
): MpmcRingDescriptor {
  if (capacity <= 0 || (capacity & (capacity - 1)) !== 0) {
    throw new Error(`Ring capacity must be a positive power of 2, received: ${capacity}`);
  }

  const headerSizeBytes = RING_HEADER_WORDS * Int32Array.BYTES_PER_ELEMENT;
  const payloadSizeBytes = capacity * slotSizeBytes;
  const totalSizeBytes = headerSizeBytes + payloadSizeBytes;

  const sab = new SharedArrayBuffer(totalSizeBytes);
  const headerView = new Int32Array(sab, 0, RING_HEADER_WORDS);

  headerView[HEAD_INDEX] = 0;
  headerView[TAIL_INDEX] = 0;
  headerView[CAPACITY_INDEX] = capacity;
  headerView[DROPPED_COUNT_INDEX] = 0;

  return {
    sab,
    capacity,
    slotSizeBytes,
  };
}

/**
 * Attempts to enqueue a message into the ring buffer atomically.
 * Returns SUCCESS or FULL. Never blocks.
 */
export function tryEnqueueSlot(
  desc: MpmcRingDescriptor,
  data: Uint8Array,
): RingBufferStatus {
  if (data.byteLength > desc.slotSizeBytes) {
    throw new Error(
      `Payload size ${data.byteLength}B exceeds ring slot size ${desc.slotSizeBytes}B`,
    );
  }

  const header = new Int32Array(desc.sab, 0, RING_HEADER_WORDS);

  while (true) {
    const head = Atomics.load(header, HEAD_INDEX);
    const tail = Atomics.load(header, TAIL_INDEX);

    // Check if ring is full: tail - head >= capacity
    if (tail - head >= desc.capacity) {
      Atomics.add(header, DROPPED_COUNT_INDEX, 1);
      return RingBufferStatus.FULL;
    }

    // Try to advance tail atomically
    const prevTail = Atomics.compareExchange(header, TAIL_INDEX, tail, tail + 1);
    if (prevTail === tail) {
      // Slot acquired successfully
      const slotIndex = tail & (desc.capacity - 1);
      const slotOffset =
        RING_HEADER_WORDS * Int32Array.BYTES_PER_ELEMENT + slotIndex * desc.slotSizeBytes;

      const u8View = new Uint8Array(desc.sab, slotOffset, desc.slotSizeBytes);
      u8View.fill(0);
      u8View.set(data, 0);

      return RingBufferStatus.SUCCESS;
    }

    // Collision: loop and retry
  }
}

/**
 * Attempts to dequeue a message from the ring buffer atomically.
 * Returns SUCCESS or EMPTY. Never blocks.
 */
export function tryDequeueSlot(
  desc: MpmcRingDescriptor,
  outputBuffer: Uint8Array,
): RingBufferStatus {
  const header = new Int32Array(desc.sab, 0, RING_HEADER_WORDS);

  while (true) {
    const head = Atomics.load(header, HEAD_INDEX);
    const tail = Atomics.load(header, TAIL_INDEX);

    // Check if ring is empty: head >= tail
    if (head >= tail) {
      return RingBufferStatus.EMPTY;
    }

    // Try to advance head atomically
    const prevHead = Atomics.compareExchange(header, HEAD_INDEX, head, head + 1);
    if (prevHead === head) {
      // Slot dequeued successfully
      const slotIndex = head & (desc.capacity - 1);
      const slotOffset =
        RING_HEADER_WORDS * Int32Array.BYTES_PER_ELEMENT + slotIndex * desc.slotSizeBytes;

      const u8View = new Uint8Array(desc.sab, slotOffset, desc.slotSizeBytes);
      const copyLen = Math.min(outputBuffer.byteLength, desc.slotSizeBytes);
      outputBuffer.set(u8View.subarray(0, copyLen), 0);

      return RingBufferStatus.SUCCESS;
    }

    // Collision: loop and retry
  }
}

/**
 * Pure metrics query on ring state.
 */
export function getRingStats(desc: MpmcRingDescriptor): {
  head: number;
  tail: number;
  occupancy: number;
  capacity: number;
  droppedCount: number;
} {
  const header = new Int32Array(desc.sab, 0, RING_HEADER_WORDS);
  const head = Atomics.load(header, HEAD_INDEX);
  const tail = Atomics.load(header, TAIL_INDEX);
  const droppedCount = Atomics.load(header, DROPPED_COUNT_INDEX);

  return {
    head,
    tail,
    occupancy: Math.max(0, tail - head),
    capacity: desc.capacity,
    droppedCount,
  };
}
