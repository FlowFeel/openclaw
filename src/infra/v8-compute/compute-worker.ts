/**
 * Compute Worker Isolate Entrypoint.
 * 
 * Axiom:
 * Runs in a clean, dedicated V8 worker_threads isolate.
 * Dispatches tasks monomorphically by 1-byte OpCode without importing network/socket modules.
 */

import { parentPort } from "node:worker_threads";
import { packEnvelope, unpackEnvelope } from "./transfer-envelope.js";
import { type TransferableEnvelope, V8ComputeOpCode } from "./types.js";

// Pure Analytical Handlers (Zero-I/O)
function handlePing(handleId: number, payload: Uint8Array): TransferableEnvelope {
  // Echo back payload with handle intact
  return {
    op: V8ComputeOpCode.PING,
    handleId,
    payload,
  };
}

function handleAstSandwichSlice(handleId: number, payload: Uint8Array): TransferableEnvelope {
  // Analytical AST line budget evaluation
  const text = new TextDecoder().decode(payload);
  const lines = text.split("\n");
  const entry = lines.slice(0, 40).join("\n");
  const exit = lines.slice(-40).join("\n");
  const summary = JSON.stringify({
    totalLines: lines.length,
    entryLength: entry.length,
    exitLength: exit.length,
  });

  return {
    op: V8ComputeOpCode.AST_SANDWICH_SLICE,
    handleId,
    payload: new TextEncoder().encode(summary),
  };
}

function handleTokenModeration(handleId: number, payload: Uint8Array): TransferableEnvelope {
  const text = new TextDecoder().decode(payload);
  // Fast regex scan without event loop blocking
  const hasProhibitedPattern = /(__proto__|eval\(|constructor\s*\[)/i.test(text);
  const result = JSON.stringify({ clean: !hasProhibitedPattern });

  return {
    op: V8ComputeOpCode.TOKEN_MODERATION,
    handleId,
    payload: new TextEncoder().encode(result),
  };
}

function handleRegexAstLex(handleId: number, payload: Uint8Array): TransferableEnvelope {
  const text = new TextDecoder().decode(payload);
  const matches = (text.match(/```[a-z0-9_-]*\n[\s\S]*?```/gi) || []).length;
  const result = JSON.stringify({ codeBlocksCount: matches });

  return {
    op: V8ComputeOpCode.REGEX_AST_LEX,
    handleId,
    payload: new TextEncoder().encode(result),
  };
}

function handleVectorDistance(handleId: number, payload: Uint8Array): TransferableEnvelope {
  // Simple float32 dot product distance calculation
  const floats = new Float32Array(payload.buffer, payload.byteOffset, payload.byteLength / 4);
  let norm = 0.0;
  for (let i = 0; i < floats.length; i++) {
    norm += floats[i] * floats[i];
  }
  const result = JSON.stringify({ l2Norm: Math.sqrt(norm) });

  return {
    op: V8ComputeOpCode.VECTOR_DISTANCE,
    handleId,
    payload: new TextEncoder().encode(result),
  };
}

function handleEntropyCalculus(handleId: number, payload: Uint8Array): TransferableEnvelope {
  const frequencies = new Uint32Array(256);
  for (let i = 0; i < payload.byteLength; i++) {
    frequencies[payload[i]]++;
  }
  let entropy = 0.0;
  const len = payload.byteLength || 1;
  for (let i = 0; i < 256; i++) {
    if (frequencies[i] > 0) {
      const p = frequencies[i] / len;
      entropy -= p * Math.log2(p);
    }
  }
  const result = JSON.stringify({ shannonEntropy: entropy });

  return {
    op: V8ComputeOpCode.ENTROPY_CALCULUS,
    handleId,
    payload: new TextEncoder().encode(result),
  };
}

/**
 * Monomorphic OpCode Dispatcher
 */
export function dispatchOpCode(envelope: TransferableEnvelope): TransferableEnvelope {
  switch (envelope.op) {
    case V8ComputeOpCode.PING:
      return handlePing(envelope.handleId, envelope.payload);
    case V8ComputeOpCode.AST_SANDWICH_SLICE:
      return handleAstSandwichSlice(envelope.handleId, envelope.payload);
    case V8ComputeOpCode.TOKEN_MODERATION:
      return handleTokenModeration(envelope.handleId, envelope.payload);
    case V8ComputeOpCode.REGEX_AST_LEX:
      return handleRegexAstLex(envelope.handleId, envelope.payload);
    case V8ComputeOpCode.VECTOR_DISTANCE:
      return handleVectorDistance(envelope.handleId, envelope.payload);
    case V8ComputeOpCode.ENTROPY_CALCULUS:
      return handleEntropyCalculus(envelope.handleId, envelope.payload);
    default:
      return {
        op: envelope.op,
        handleId: envelope.handleId,
        payload: new TextEncoder().encode(JSON.stringify({ error: `Unknown opcode: ${envelope.op}` })),
      };
  }
}

// Execution Boundary: If run inside worker_threads
if (parentPort) {
  parentPort.on("message", (rawBuffer: ArrayBuffer) => {
    try {
      const envelope = unpackEnvelope(rawBuffer);
      const resultEnvelope = dispatchOpCode(envelope);
      const packedBuffer = packEnvelope(
        resultEnvelope.op,
        resultEnvelope.handleId,
        resultEnvelope.payload,
      );

      // Ownership handover (Zero copy return)
      parentPort!.postMessage(packedBuffer, [packedBuffer]);
    } catch (err: unknown) {
      const errorPayload = new TextEncoder().encode(
        JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      );
      const errBuffer = packEnvelope(V8ComputeOpCode.PING, 0, errorPayload);
      parentPort!.postMessage(errBuffer, [errBuffer]);
    }
  });
}
