import { describe, expect, it } from "vitest";
import {
  formatWorkingStateRecoveryPrompt,
  normalizeWorkingStateInput,
} from "./working-state-synthesizer.js";

describe("normalizeWorkingStateInput", () => {
  it("enforces array and string limits on checkpoint payload", () => {
    const excessiveFiles = Array.from({ length: 80 }, (_, i) => `file_${i}.ts`);
    const excessiveQueries = Array.from({ length: 30 }, (_, i) => `query_${i}`);
    const excessivePlan = "x".repeat(6000);

    const normalized = normalizeWorkingStateInput(
      {
        sessionId: "sess_1",
        turnIndex: 5,
        activeFiles: excessiveFiles,
        recentSearchQueries: excessiveQueries,
        activePlanSummary: excessivePlan,
      },
      1234567890,
    );

    expect(normalized.activeFiles.length).toBe(50);
    expect(normalized.activeFiles[49]).toBe("file_79.ts"); // keeps most recent
    expect(normalized.recentSearchQueries.length).toBe(20);
    expect(normalized.recentSearchQueries[19]).toBe("query_29");
    expect(normalized.activePlanSummary?.length).toBe(4000);
    expect(normalized.updatedAt).toBe(1234567890);
  });
});

describe("formatWorkingStateRecoveryPrompt", () => {
  it("synthesizes formatted recovery prompt with all sections", () => {
    const prompt = formatWorkingStateRecoveryPrompt({
      sessionId: "sess_1",
      turnIndex: 4,
      activeFiles: ["src/process/lanes.ts", "src/process/command-queue.ts"],
      recentSearchQueries: ["calculateEffectivePriority", "HeapEmergencyGovernor"],
      activePlanSummary: "Refactoring scheduler for starvation aging",
      subGoalTree: [
        { id: "T5.1", description: "Priority queue", status: "done" },
        { id: "T5.2", description: "Starvation aging", status: "in_progress" },
      ],
      updatedAt: Date.now(),
    });

    expect(prompt).toContain("[RECONSTRUCTED WORKING CONTEXT — Turn 4]");
    expect(prompt).toContain("Active Plan:\nRefactoring scheduler for starvation aging");
    expect(prompt).toContain("Active Working Files:\n- src/process/lanes.ts\n- src/process/command-queue.ts");
    expect(prompt).toContain("Recent Search Context:\n- calculateEffectivePriority\n- HeapEmergencyGovernor");
    expect(prompt).toContain("Task Graph:\n[DONE] T5.1: Priority queue\n[IN_PROGRESS] T5.2: Starvation aging");
  });

  it("handles partial context gracefully without empty sections", () => {
    const prompt = formatWorkingStateRecoveryPrompt({
      sessionId: "sess_1",
      turnIndex: 1,
      activeFiles: ["src/process/lanes.ts"],
      recentSearchQueries: [],
      updatedAt: Date.now(),
    });

    expect(prompt).toContain("[RECONSTRUCTED WORKING CONTEXT — Turn 1]");
    expect(prompt).toContain("Active Working Files:\n- src/process/lanes.ts");
    expect(prompt).not.toContain("Active Plan:");
    expect(prompt).not.toContain("Recent Search Context:");
  });
});
