/**
 * Pure Decision Core: Zero-Copy Binary Wire Serialization & Deserialization.
 * 
 * Axiom:
 * Marshals descriptors and payloads into a contiguous ArrayBuffer suitable
 * for O(1) pointer ownership transfer across V8 isolate boundaries.
 */

import {
  ENVELOPE_HEADER_SIZE_BYTES,
  type TransferableEnvelope,
  V8ComputeOpCode,
} from "./types.js";

/**
 * Packs an OpCode, handle descriptor, and payload byte array into a contiguous ArrayBuffer.
 */
export function packEnvelope(
  op: V8ComputeOpCode,
  handleId: number,
  payload: Uint8Array,
): ArrayBuffer {
  const totalLength = ENVELOPE_HEADER_SIZE_BYTES + payload.byteLength;
  const buffer = new ArrayBuffer(totalLength);
  const view = new DataView(buffer);
  const u8View = new Uint8Array(buffer);

  // [0]: OpCode (1 Byte)
  view.setUint8(0, op);
  // [1..3]: Reserved (set to 0)
  view.setUint8(1, 0);
  view.setUint8(2, 0);
  view.setUint8(3, 0);
  // [4..7]: Handle ID (4 Bytes uint32 Big Endian)
  view.setUint32(4, handleId >>> 0, false);

  // [8..N]: Payload
  if (payload.byteLength > 0) {
    u8View.set(payload, ENVELOPE_HEADER_SIZE_BYTES);
  }

  return buffer;
}

/**
 * Unpacks an ArrayBuffer received from an isolate boundary into a TransferableEnvelope.
 */
export function unpackEnvelope(buffer: ArrayBuffer): TransferableEnvelope {
  if (buffer.byteLength < ENVELOPE_HEADER_SIZE_BYTES) {
    throw new Error(
      `Invalid transferable envelope: buffer size ${buffer.byteLength}B is smaller than header ${ENVELOPE_HEADER_SIZE_BYTES}B`,
    );
  }

  const view = new DataView(buffer);
  const op = view.getUint8(0) as V8ComputeOpCode;
  const handleId = view.getUint32(4, false);

  const payload = new Uint8Array(
    buffer,
    ENVELOPE_HEADER_SIZE_BYTES,
    buffer.byteLength - ENVELOPE_HEADER_SIZE_BYTES,
  );

  return {
    op,
    handleId,
    payload,
  };
}
