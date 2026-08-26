/**
 * OpenClaw V8 Compute & Shannon-Weaver Channel Decoupling Engine
 * Core Domain Types, OpCodes, Binary Protocols, and Elastic Topologies.
 */

export const enum V8ComputeOpCode {
  PING               = 0x00,
  AST_SANDWICH_SLICE = 0x01,
  TOKEN_MODERATION   = 0x02,
  REGEX_AST_LEX      = 0x03,
  VECTOR_DISTANCE    = 0x04,
  ENTROPY_CALCULUS   = 0x05,
}

export const enum ComputeTopologyMode {
  SINGLE_CORE_ISOLATE    = "SINGLE_CORE_ISOLATE",
  DUAL_CORE_DEDICATED    = "DUAL_CORE_DEDICATED",
  MULTI_CORE_PARTITIONED = "MULTI_CORE_PARTITIONED",
}

export const enum ChannelTransportPreference {
  TRANSFERABLE_ARRAY_BUFFER = "TRANSFERABLE_ARRAY_BUFFER",
  DUAL_LANE_HYBRID          = "DUAL_LANE_HYBRID",
  SHARED_ARRAY_BUFFER_RING  = "SHARED_ARRAY_BUFFER_RING",
}

/**
 * Immutable profile defining the operational parameters for the compute pool.
 */
export interface TopologyProfile {
  readonly mode: ComputeTopologyMode;
  readonly workerCount: number;
  readonly maxIsolateMemoryMb: number;
  readonly batchWindowMs: number;
  readonly transportPreference: ChannelTransportPreference;
}

/**
 * Binary wire envelope for Transferable Lane A.
 * Header layout:
 *   [0]:      OpCode (1 Byte)
 *   [1..3]:   Reserved / Flags (3 Bytes)
 *   [4..7]:   Handle ID (4 Bytes uint32 Big Endian)
 *   [8..N]:   Payload (N Bytes)
 */
export const ENVELOPE_HEADER_SIZE_BYTES = 8;

export interface TransferableEnvelope {
  readonly op: V8ComputeOpCode;
  readonly handleId: number;
  readonly payload: Uint8Array;
}

/**
 * MPMC Ring Buffer on SharedArrayBuffer (Lane B) Descriptors.
 */
export const RING_HEADER_WORDS = 4; // [0]: head, [1]: tail, [2]: capacity, [3]: dropped_count

export const enum RingBufferStatus {
  SUCCESS   = 0,
  FULL      = 1,
  EMPTY     = 2,
  COLLISION = 3,
}

export interface MpmcRingDescriptor {
  readonly sab: SharedArrayBuffer;
  readonly capacity: number;
  readonly slotSizeBytes: number;
}
