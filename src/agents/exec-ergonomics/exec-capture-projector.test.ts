import { describe, expect, it } from "vitest";
import { projectExecOutput } from "./exec-capture-projector.js";

describe("exec-capture-projector (Tier 1 Pure Invariants)", () => {
  const multiLineOutput = Array.from({ length: 100 }, (_, i) => `Line ${i + 1}: Status OK`).join("\n");

  it("handles empty output gracefully across all modes", () => {
    for (const mode of ["full", "exit", "head", "tail"] as const) {
      const result = projectExecOutput("", mode);
      expect(result.stdout).toBe("");
      expect(result.totalLines).toBe(0);
      expect(result.totalBytes).toBe(0);
    }
  });

  it("exit mode suppresses stdout body while reporting line/byte counts", () => {
    const result = projectExecOutput(multiLineOutput, "exit");
    expect(result.mode).toBe("exit");
    expect(result.truncated).toBe(true);
    expect(result.stdout).toContain("(exit capture: 100 lines");
    expect(result.totalLines).toBe(100);
    expect(result.stdout.length).toBeLessThan(100);
  });

  it("head mode limits output to requested head line count", () => {
    const result = projectExecOutput(multiLineOutput, "head", { maxHeadLines: 5 });
    expect(result.mode).toBe("head");
    expect(result.truncated).toBe(true);
    expect(result.stdout).toContain("Line 1: Status OK");
    expect(result.stdout).toContain("Line 5: Status OK");
    expect(result.stdout).not.toContain("Line 6: Status OK");
    expect(result.stdout).toContain("[head capture: omitted 95 lines");
  });

  it("tail mode limits output to requested tail line count", () => {
    const result = projectExecOutput(multiLineOutput, "tail", { maxTailLines: 5 });
    expect(result.mode).toBe("tail");
    expect(result.truncated).toBe(true);
    expect(result.stdout).toContain("Line 100: Status OK");
    expect(result.stdout).toContain("Line 96: Status OK");
    expect(result.stdout).not.toContain("Line 95: Status OK");
    expect(result.stdout).toContain("[tail capture: omitted 95 preceding lines]");
  });

  it("full mode preserves entire output when within limits", () => {
    const smallOutput = "Line 1\nLine 2\nLine 3";
    const result = projectExecOutput(smallOutput, "full");
    expect(result.mode).toBe("full");
    expect(result.truncated).toBe(false);
    expect(result.stdout).toBe(smallOutput);
  });
});
