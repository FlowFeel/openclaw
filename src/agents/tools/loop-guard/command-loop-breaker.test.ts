import { describe, it, expect, beforeEach } from "vitest";
import {
  normalizeCommand,
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
