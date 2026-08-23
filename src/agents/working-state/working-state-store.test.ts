import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { WorkingStateStore } from "./working-state-store.js";

describe("WorkingStateStore (Tier 2 SQLite In-Memory/Isolated)", () => {
  let tempDir: string;
  let testEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "openclaw-ws-store-test-"));
    testEnv = {
      ...process.env,
      OPENCLAW_STATE_DIR: tempDir,
    };
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("saves and retrieves session working state atomically", () => {
    const store = new WorkingStateStore({ env: testEnv });

    const saved = store.saveWorkingState({
      sessionId: "session_abc",
      turnIndex: 3,
      activeFiles: ["src/a.ts", "src/b.ts"],
      recentSearchQueries: ["findStuff"],
      activePlanSummary: "Plan A",
    });

    expect(saved.sessionId).toBe("session_abc");
    expect(saved.turnIndex).toBe(3);
    expect(saved.activeFiles).toEqual(["src/a.ts", "src/b.ts"]);

    const retrieved = store.getWorkingState("session_abc");
    expect(retrieved).toBeDefined();
    expect(retrieved?.turnIndex).toBe(3);
    expect(retrieved?.activeFiles).toEqual(["src/a.ts", "src/b.ts"]);
    expect(retrieved?.recentSearchQueries).toEqual(["findStuff"]);
    expect(retrieved?.activePlanSummary).toBe("Plan A");
  });

  it("isolates working state across distinct sessions", () => {
    const store = new WorkingStateStore({ env: testEnv });

    store.saveWorkingState({
      sessionId: "session_1",
      turnIndex: 1,
      activeFiles: ["file1.ts"],
    });

    store.saveWorkingState({
      sessionId: "session_2",
      turnIndex: 2,
      activeFiles: ["file2.ts"],
    });

    const s1 = store.getWorkingState("session_1");
    const s2 = store.getWorkingState("session_2");

    expect(s1?.activeFiles).toEqual(["file1.ts"]);
    expect(s2?.activeFiles).toEqual(["file2.ts"]);
  });

  it("updates existing session state on subsequent turns", () => {
    const store = new WorkingStateStore({ env: testEnv });

    store.saveWorkingState({
      sessionId: "session_1",
      turnIndex: 1,
      activeFiles: ["file1.ts"],
    });

    store.saveWorkingState({
      sessionId: "session_1",
      turnIndex: 2,
      activeFiles: ["file1.ts", "file2.ts"],
      activePlanSummary: "Updated plan",
    });

    const updated = store.getWorkingState("session_1");
    expect(updated?.turnIndex).toBe(2);
    expect(updated?.activeFiles).toEqual(["file1.ts", "file2.ts"]);
    expect(updated?.activePlanSummary).toBe("Updated plan");
  });
});
