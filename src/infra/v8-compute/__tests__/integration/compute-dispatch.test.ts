/**
 * Tier 2 Pure Monomorphic Dispatch Tests: compute-worker opcode execution.
 */

import { describe, expect, it } from "vitest";
import { dispatchOpCode } from "../../compute-worker.js";
import { TransferableEnvelope, V8ComputeOpCode } from "../../types.js";

describe("dispatchOpCode (Worker Isolate Monomorphic Analytical Dispatch)", () => {
  it("executes AST_SANDWICH_SLICE accurately", () => {
    const text = Array.from({ length: 100 }, (_, i) => `Line ${i + 1}`).join("\n");
    const payload = new TextEncoder().encode(text);

    const envelope: TransferableEnvelope = {
      op: V8ComputeOpCode.AST_SANDWICH_SLICE,
      handleId: 10,
      payload,
    };

    const result = dispatchOpCode(envelope);
    expect(result.op).toBe(V8ComputeOpCode.AST_SANDWICH_SLICE);
    expect(result.handleId).toBe(10);

    const parsed = JSON.parse(new TextDecoder().decode(result.payload));
    expect(parsed.totalLines).toBe(100);
  });

  it("executes TOKEN_MODERATION cleanly", () => {
    const cleanPayload = new TextEncoder().encode("Hello world, this is a clean prompt.");
    const resClean = dispatchOpCode({
      op: V8ComputeOpCode.TOKEN_MODERATION,
      handleId: 1,
      payload: cleanPayload,
    });
    expect(JSON.parse(new TextDecoder().decode(resClean.payload)).clean).toBe(true);

    const dirtyPayload = new TextEncoder().encode("const x = obj.__proto__;");
    const resDirty = dispatchOpCode({
      op: V8ComputeOpCode.TOKEN_MODERATION,
      handleId: 2,
      payload: dirtyPayload,
    });
    expect(JSON.parse(new TextDecoder().decode(resDirty.payload)).clean).toBe(false);
  });

  it("executes ENTROPY_CALCULUS correctly", () => {
    const constantBytes = new Uint8Array([65, 65, 65, 65, 65]);
    const resConst = dispatchOpCode({
      op: V8ComputeOpCode.ENTROPY_CALCULUS,
      handleId: 5,
      payload: constantBytes,
    });
    const parsedConst = JSON.parse(new TextDecoder().decode(resConst.payload));
    expect(parsedConst.shannonEntropy).toBe(0); // Zero entropy for uniform symbol
  });
});
