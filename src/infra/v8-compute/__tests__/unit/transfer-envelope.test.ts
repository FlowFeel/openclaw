/**
 * Tier 1 Pure Unit Tests: Zero-Copy Binary Wire Serialization.
 */

import { describe, expect, it } from "vitest";
import { packEnvelope, unpackEnvelope } from "../../transfer-envelope.js";
import { ENVELOPE_HEADER_SIZE_BYTES, V8ComputeOpCode } from "../../types.js";

describe("packEnvelope & unpackEnvelope (Zero-Copy Binary Wire Protocol)", () => {
  it("packs and unpacks an envelope with handleId and payload faithfully", () => {
    const rawPayload = new TextEncoder().encode("Hello Shannon-Weaver Compute!");
    const handleId = 420871;
    const op = V8ComputeOpCode.AST_SANDWICH_SLICE;

    const buffer = packEnvelope(op, handleId, rawPayload);

    expect(buffer.byteLength).toBe(ENVELOPE_HEADER_SIZE_BYTES + rawPayload.byteLength);

    const unpacked = unpackEnvelope(buffer);

    expect(unpacked.op).toBe(op);
    expect(unpacked.handleId).toBe(handleId);
    expect(new TextDecoder().decode(unpacked.payload)).toBe("Hello Shannon-Weaver Compute!");
  });

  it("handles zero-length payloads cleanly", () => {
    const emptyPayload = new Uint8Array(0);
    const buffer = packEnvelope(V8ComputeOpCode.PING, 101, emptyPayload);

    expect(buffer.byteLength).toBe(ENVELOPE_HEADER_SIZE_BYTES);

    const unpacked = unpackEnvelope(buffer);
    expect(unpacked.op).toBe(V8ComputeOpCode.PING);
    expect(unpacked.handleId).toBe(101);
    expect(unpacked.payload.byteLength).toBe(0);
  });

  it("throws descriptive error when buffer size is smaller than header size", () => {
    const corruptBuffer = new ArrayBuffer(4); // Only 4 bytes

    expect(() => unpackEnvelope(corruptBuffer)).toThrowError(
      /is smaller than header/,
    );
  });
});
