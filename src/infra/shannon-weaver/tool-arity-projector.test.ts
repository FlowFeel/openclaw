/**
 * @file tool-arity-projector.test.ts
 * @description Pure DFT Invariant Verification for Shannon-Weaver Certified Tool Arity.
 *
 * @dft
 * - Prediction: Pure arity projection factors base parameters, classifies tiers deterministically,
 *   and produces stable 16-character policy hashes across shuffled property key orderings.
 * - Competing account: Schema parsing is order-dependent or leaks base parameters into domain slots.
 * - What would support: Deterministic policyHash across key permutations; atomic (k<=2), operator (k 3..6),
 *   and composite (k>=7) classifications strictly hold; base parameters are filtered.
 * - What would refute: Hash divergence under key shuffling; wrong tier classification; base param leakage.
 */

import { describe, expect, it } from "vitest";
import {
  classifyArityTier,
  createCompactExecutionSignature,
  projectCertifiedToolArity,
} from "./tool-arity-projector.js";

describe("tool-arity-projector (Pure DFT Invariants)", () => {
  it("classifies arity tiers and navigation hints deterministically", () => {
    // Prediction: arity <= 2 is atomic, 3..6 is operator, >= 7 is composite
    expect(classifyArityTier(0).tier).toBe("atomic");
    expect(classifyArityTier(1).tier).toBe("atomic");
    expect(classifyArityTier(2).tier).toBe("atomic");

    expect(classifyArityTier(3).tier).toBe("operator");
    expect(classifyArityTier(5).tier).toBe("operator");
    expect(classifyArityTier(6).tier).toBe("operator");

    expect(classifyArityTier(7).tier).toBe("composite");
    expect(classifyArityTier(12).tier).toBe("composite");
  });

  it("factors base parameters and creates concise parameter slot map", () => {
    const rawTool = {
      name: "partition_sandwich",
      description: "Partitions a markdown document",
      parameters: {
        type: "object",
        properties: {
          doc: { type: "string" },
          entryLines: { type: "number" },
          exitLines: { type: "number" },
          timeoutMs: { type: "number" }, // Base parameter — must be factored out
          dryRun: { type: "boolean" },   // Base parameter — must be factored out
        },
        required: ["doc"],
      },
    };

    const projection = projectCertifiedToolArity(rawTool);

    // Arity must count only domain properties (3), excluding timeoutMs and dryRun
    expect(projection.arity).toBe(3);
    expect(projection.tier).toBe("operator");
    expect(projection.requiredSlots).toEqual(["doc"]);
    expect(projection.parameterSlots).toEqual({
      doc: "string!",
      entryLines: "number?",
      exitLines: "number?",
    });
    expect(projection.policyHash).toBeDefined();
    expect(projection.policyHash.length).toBe(16);
  });

  it("produces deterministic policy hash regardless of raw property ordering", () => {
    const toolA = {
      name: "search_tool",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string" },
          limit: { type: "number" },
          namespace: { type: "string" },
        },
        required: ["query"],
      },
    };

    const toolB = {
      name: "search_tool",
      parameters: {
        type: "object",
        properties: {
          namespace: { type: "string" },
          query: { type: "string" },
          limit: { type: "number" },
        },
        required: ["query"],
      },
    };

    const projA = projectCertifiedToolArity(toolA);
    const projB = projectCertifiedToolArity(toolB);

    expect(projA.policyHash).toBe(projB.policyHash);
    expect(projA.parameterSlots).toEqual(projB.parameterSlots);
  });

  it("formats compact 4-tuple execution signatures for telemetry", () => {
    const signature = createCompactExecutionSignature(
      "read",
      { path: "/workspace/AGENTS.md", timeoutMs: 30000 },
      "a1b2c3d4e5f67890",
      1700000000000,
    );

    expect(signature.tool).toBe("read");
    expect(signature.arity).toBe(1); // timeoutMs factored out
    expect(signature.policyHash).toBe("a1b2c3d4e5f67890");
    expect(signature.args).toEqual({ path: "/workspace/AGENTS.md" });
    expect(signature.timestamp).toBe(1700000000000);
  });
});
