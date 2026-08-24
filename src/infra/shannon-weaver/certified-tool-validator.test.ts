/**
 * @file certified-tool-validator.test.ts
 * @description Pure DFT Invariant Verification for Tool Arity Certification (Rule A5).
 *
 * @dft
 * - Prediction: Static arity validator catches base parameter duplication (A5.2) and arity mismatch (A5.1)
 *   with 0ms pure AST/Schema inspection.
 * - Competing account: Schema drift passes silently into production.
 * - What would support: All violations caught with accurate diagnostic rule IDs; clean schemas pass.
 * - What would refute: False negatives on base parameter duplication; false positives on compliant schemas.
 */

import { describe, expect, it } from "vitest";
import {
  validateCertifiedToolArity,
  validateToolRegistryArities,
} from "./certified-tool-validator.js";

describe("certified-tool-validator (Rule A5 Invariant Validator)", () => {
  it("validates compliant tool schemas without violations", () => {
    const validTool = {
      name: "read",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string" },
        },
        required: ["path"],
      },
    };

    const result = validateCertifiedToolArity(validTool, 1);
    expect(result.valid).toBe(true);
    expect(result.violations).toHaveLength(0);
    expect(result.certifiedArity).toBe(1);
    expect(result.tier).toBe("atomic");
  });

  it("detects Rule A5.2 violation when base parameter is duplicated", () => {
    const invalidTool = {
      name: "write",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string" },
          content: { type: "string" },
          timeoutMs: { type: "number" }, // Banned duplication
        },
        required: ["path", "content"],
      },
    };

    const result = validateCertifiedToolArity(invalidTool, 2);
    expect(result.valid).toBe(false);
    expect(result.violations).toHaveLength(1);
    expect(result.violations[0].rule).toBe("A5.2");
    expect(result.violations[0].message).toContain("duplicates universal base parameter 'timeoutMs'");
  });

  it("detects Rule A5.1 violation when declared arity mismatches domain properties", () => {
    const mismatchedTool = {
      name: "partition_sandwich",
      parameters: {
        type: "object",
        properties: {
          doc: { type: "string" },
          entry: { type: "number" },
          exit: { type: "number" },
        },
        required: ["doc"],
      },
    };

    // Expected arity 2, but actual domain property count is 3
    const result = validateCertifiedToolArity(mismatchedTool, 2);
    expect(result.valid).toBe(false);
    expect(result.violations).toHaveLength(1);
    expect(result.violations[0].rule).toBe("A5.1");
    expect(result.violations[0].message).toContain("declared arity 2 but resolved arity 3");
  });

  it("batch validates an entire registry of tools", () => {
    const tools = [
      { name: "read", parameters: { type: "object", properties: { path: { type: "string" } } } },
      { name: "session_status", parameters: { type: "object", properties: {} } },
      {
        name: "bad_tool",
        parameters: {
          type: "object",
          properties: { query: { type: "string" }, dryRun: { type: "boolean" } },
        },
      },
    ];

    const declarations = { read: 1, session_status: 0, bad_tool: 1 };
    const batchResult = validateToolRegistryArities(tools, declarations);

    expect(batchResult.valid).toBe(false);
    expect(batchResult.violations).toHaveLength(1);
    expect(batchResult.violations[0].rule).toBe("A5.2");
    expect(batchResult.violations[0].toolName).toBe("bad_tool");
  });
});
