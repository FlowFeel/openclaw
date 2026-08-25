import { describe, it, expect } from "vitest";
import { validateToolParameters } from "./tool-validator.js";
import type { ToolContractDefinition } from "./types.js";

describe("Degree 0: ToolValidator Pure Invariants", () => {
  const sampleContract: ToolContractDefinition = {
    id: "fs_write",
    name: "File Write",
    description: "Writes content to file",
    parameters: [
      { name: "path", required: true, type: "path" },
      { name: "content", required: true, type: "string" },
      { name: "overwrite", required: false, type: "boolean" },
      { name: "lineCount", required: false, type: "number" },
    ],
  };

  it("validates and coerces well-formed parameters", () => {
    const raw = {
      path: "file:///workspace/memory/notes.md",
      content: "  Hello World  ",
      overwrite: "true",
      lineCount: "42",
    };

    const res = validateToolParameters(sampleContract, raw);
    expect(res.isValid).toBe(true);
    expect(res.errors.length).toBe(0);
    expect(res.sanitizedParams.path).toBe("memory/notes.md");
    expect(res.sanitizedParams.content).toBe("Hello World");
    expect(res.sanitizedParams.overwrite).toBe(true);
    expect(res.sanitizedParams.lineCount).toBe(42);
  });

  it("fails when required parameters are missing", () => {
    const raw = {
      content: "Hello",
    };

    const res = validateToolParameters(sampleContract, raw);
    expect(res.isValid).toBe(false);
    expect(res.errors).toContain("Missing required parameter 'path'");
  });

  it("rejects path breakout attempts", () => {
    const raw = {
      path: "../../etc/shadow",
      content: "bad",
    };

    const res = validateToolParameters(sampleContract, raw);
    expect(res.isValid).toBe(false);
    expect(res.errors[0]).toContain("attempts workspace breakout");
  });
});
