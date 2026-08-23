/**
 * BDD Scenario Suite: Session Working State Persistence & Synthetic Recovery
 *
 * Implements literate Given / When / Then steps corresponding to:
 * kitchen/suites/oc-mods/features/working_state_persistence.feature
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { WorkingStateStore } from "./working-state-store.js";
import { formatWorkingStateRecoveryPrompt } from "./working-state-synthesizer.js";

describe("Feature: Session Working State Persistence & Synthetic Recovery (BDD)", () => {
  let tempDir: string;
  let testEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "openclaw-ws-bdd-test-"));
    testEnv = {
      ...process.env,
      OPENCLAW_STATE_DIR: tempDir,
    };
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("Scenario: Agent builds working context across multi-turn refactor", () => {
    // Given an initialized SQLite state database with session_working_state table
    const store = new WorkingStateStore({ env: testEnv });

    // When the agent reads files ["src/process/lanes.ts", "src/process/command-queue.ts"]
    // And the agent executes search query "calculateEffectivePriority"
    // And the agent updates the active plan summary to "Refactoring queue scheduler for starvation aging"
    // And the turn finishes settlement
    const saved = store.saveWorkingState({
      sessionId: "sess_refactor_456",
      turnIndex: 3,
      activeFiles: ["src/process/lanes.ts", "src/process/command-queue.ts"],
      recentSearchQueries: ["calculateEffectivePriority"],
      activePlanSummary: "Refactoring queue scheduler for starvation aging",
    });

    // Then a working state snapshot is saved to SQLite for "sess_refactor_456" at turn 3
    expect(saved.sessionId).toBe("sess_refactor_456");
    expect(saved.turnIndex).toBe(3);

    // And the saved record contains exactly 2 active files and 1 search query
    const record = store.getWorkingState("sess_refactor_456");
    expect(record).toBeDefined();
    expect(record?.activeFiles).toEqual(["src/process/lanes.ts", "src/process/command-queue.ts"]);
    expect(record?.recentSearchQueries).toEqual(["calculateEffectivePriority"]);
    expect(record?.activePlanSummary).toBe("Refactoring queue scheduler for starvation aging");
  });

  it("Scenario: Gateway container restarts abruptly mid-synthesis", () => {
    // Given an established working state for session "sess_refactor_456" at turn 3
    const store = new WorkingStateStore({ env: testEnv });
    store.saveWorkingState({
      sessionId: "sess_refactor_456",
      turnIndex: 3,
      activeFiles: ["src/process/lanes.ts", "src/process/command-queue.ts"],
      recentSearchQueries: ["calculateEffectivePriority"],
      activePlanSummary: "Refactoring queue scheduler for starvation aging",
    });

    // And the gateway process terminates abruptly (simulated crash)
    // When the gateway restarts and resumes session "sess_refactor_456"
    const freshStoreAfterRestart = new WorkingStateStore({ env: testEnv });
    const loadedState = freshStoreAfterRestart.getWorkingState("sess_refactor_456");
    expect(loadedState).toBeDefined();

    // Then the recovery dispatcher loads the working state for turn 3 and synthetically reconstructs prompt:
    const prompt = formatWorkingStateRecoveryPrompt(loadedState!);
    expect(prompt).toContain("[RECONSTRUCTED WORKING CONTEXT — Turn 3]");
    expect(prompt).toContain("Active Plan:\nRefactoring queue scheduler for starvation aging");
    expect(prompt).toContain("Active Working Files:\n- src/process/lanes.ts\n- src/process/command-queue.ts");
    expect(prompt).toContain("Recent Search Context:\n- calculateEffectivePriority");
  });

  it("Scenario: Working state bounded entropy enforcement", () => {
    // Given an agent session attempting to record 75 active files and 8000 character plan
    const store = new WorkingStateStore({ env: testEnv });
    const excessiveFiles = Array.from({ length: 75 }, (_, i) => `file_${i}.ts`);
    const excessivePlan = "A".repeat(8000);

    // When the working state checkpoint is processed
    const saved = store.saveWorkingState({
      sessionId: "sess_entropy_test",
      turnIndex: 10,
      activeFiles: excessiveFiles,
      activePlanSummary: excessivePlan,
    });

    // Then the active files list is trimmed to the most recent 50 files
    expect(saved.activeFiles.length).toBe(50);
    expect(saved.activeFiles[49]).toBe("file_74.ts");

    // And the plan summary is bounded to 4000 characters
    expect(saved.activePlanSummary?.length).toBe(4000);
  });
});
