import { describe, it, expect, beforeEach } from "vitest";
import {
  normalizeCommand,
  canonicalizeArguments,
  recordAndCheckCommandLoop,
  getSessionLoopPenalties,
  resetSessionLoopGuard,
  clearAllLoopGuardsForTest,
} from "./command-loop-breaker.js";

describe("command-loop-breaker (CAP-EXEC-03)", () => {
  beforeEach(() => {
    clearAllLoopGuardsForTest();
  });

  it("normalizes command strings with whitespace and path prefixes", () => {
    expect(normalizeCommand("  grep -rn 'foo'   ./src  ")).toBe("grep -rn 'foo' src");
    expect(normalizeCommand("cat  ./foo.txt")).toBe("cat foo.txt");
  });

  it("canonicalizes argument objects independently of key order", () => {
    const a = canonicalizeArguments({ Path: "src/index.ts", StartLine: 1, EndLine: 50 });
    const b = canonicalizeArguments({ EndLine: 50, StartLine: 1, Path: "src/index.ts" });
    expect(a).toBe(b);
  });

  it("passes single executions without loop flags", () => {
    const res = recordAndCheckCommandLoop({
      sessionId: "session-1",
      toolName: "exec",
      commandRaw: "git status",
      turnIndex: 1,
    });
    expect(res.isLoop).toBe(false);
    expect(res.penalty).toBe(0);
  });

  it("exempts iterative file reads with distinct offsets/lines", () => {
    const res1 = recordAndCheckCommandLoop({
      sessionId: "session-read",
      toolName: "read_file",
      args: { Path: "src/large.ts", StartLine: 1, EndLine: 100 },
      turnIndex: 1,
    });
    expect(res1.isLoop).toBe(false);
    expect(res1.penalty).toBe(0);

    const res2 = recordAndCheckCommandLoop({
      sessionId: "session-read",
      toolName: "read_file",
      args: { Path: "src/large.ts", StartLine: 101, EndLine: 200 },
      turnIndex: 1,
    });
    expect(res2.isLoop).toBe(false);
    expect(res2.penalty).toBe(0);
  });

  it("exempts edits on the same file with distinct replacements", () => {
    const edit1 = recordAndCheckCommandLoop({
      sessionId: "session-edit",
      toolName: "edit_file",
      args: { Path: "src/app.ts", Target: "oldA", Replacement: "newA" },
      turnIndex: 1,
    });
    expect(edit1.isLoop).toBe(false);

    const edit2 = recordAndCheckCommandLoop({
      sessionId: "session-edit",
      toolName: "edit_file",
      args: { Path: "src/app.ts", Target: "oldB", Replacement: "newB" },
      turnIndex: 1,
    });
    expect(edit2.isLoop).toBe(false);
    expect(edit2.penalty).toBe(0);
  });

  it("flags repeated identical tool calls with canonicalized arguments", () => {
    recordAndCheckCommandLoop({
      sessionId: "session-loop",
      toolName: "read_file",
      args: { Path: "src/target.ts", StartLine: 1 },
      turnIndex: 1,
    });

    const second = recordAndCheckCommandLoop({
      sessionId: "session-loop",
      toolName: "read_file",
      args: { StartLine: 1, Path: "src/target.ts" }, // Reordered keys
      turnIndex: 1,
    });
    expect(second.isLoop).toBe(true);
    expect(second.consecutiveCount).toBe(2);
    expect(second.penalty).toBe(5);
  });

  it("flags repeated identical commands in the same turn with escalating penalty", () => {
    recordAndCheckCommandLoop({
      sessionId: "session-1",
      toolName: "exec",
      commandRaw: "git status",
      turnIndex: 1,
    });

    const second = recordAndCheckCommandLoop({
      sessionId: "session-1",
      toolName: "exec",
      commandRaw: "git   status  ",
      turnIndex: 1,
    });
    expect(second.isLoop).toBe(true);
    expect(second.consecutiveCount).toBe(2);
    expect(second.penalty).toBe(5);
    expect(second.warning).toBe("duplicate_command_detected");

    const third = recordAndCheckCommandLoop({
      sessionId: "session-1",
      toolName: "exec",
      commandRaw: "git status",
      turnIndex: 1,
    });
    expect(third.isLoop).toBe(true);
    expect(third.consecutiveCount).toBe(3);
    expect(third.penalty).toBe(10);
    expect(getSessionLoopPenalties("session-1")).toBe(15);
  });

  it("resets loop detection on turn advance or explicit reset", () => {
    recordAndCheckCommandLoop({
      sessionId: "session-1",
      toolName: "exec",
      commandRaw: "git status",
      turnIndex: 1,
    });

    // Advance turn
    const nextTurn = recordAndCheckCommandLoop({
      sessionId: "session-1",
      toolName: "exec",
      commandRaw: "git status",
      turnIndex: 2,
    });
    expect(nextTurn.isLoop).toBe(false);
    expect(nextTurn.penalty).toBe(0);
  });
});
