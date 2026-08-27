import { describe, expect, it } from "vitest";
import { synthesizeIntentBreadcrumb } from "../../tool-intent-breadcrumb.js";
import type { ToolCallCommandEntry } from "../../tool-command-types.js";

describe("Tier 1 Unit: Tool Intent Breadcrumb Synthesizer", () => {
  it("synthesizes a structured breadcrumb from tool entries", () => {
    const entries: ToolCallCommandEntry[] = [
      {
        tool: "exec",
        paramsSummary: "docker ps -a",
        ts: 1787856600000,
        sessionKey: "session-1",
        turn: 5,
      },
      {
        tool: "web_search",
        paramsSummary: "query: traefik 200 ok",
        ts: 1787856601000,
        sessionKey: "session-1",
        turn: 5,
      },
    ];

    const breadcrumb = synthesizeIntentBreadcrumb({
      turnIndex: 5,
      entries,
      outcomeSummary: "Found 2 containers, verified 200 OK",
    });

    expect(breadcrumb.turnIndex).toBe(5);
    expect(breadcrumb.toolActions.length).toBe(2);
    expect(breadcrumb.markdown).toContain("[COMPACTED TURN 5 — INTENT BREADCRUMB]");
    expect(breadcrumb.markdown).toContain('Action: exec -> "docker ps -a"');
    expect(breadcrumb.markdown).toContain('Action: web_search -> "query: traefik 200 ok"');
    expect(breadcrumb.markdown).toContain("Outcome: Found 2 containers, verified 200 OK");
  });

  it("handles conversational turns with no tool calls", () => {
    const breadcrumb = synthesizeIntentBreadcrumb({
      turnIndex: 8,
      entries: [],
    });

    expect(breadcrumb.markdown).toContain("Action: No tool calls executed (conversational turn)");
  });
});
