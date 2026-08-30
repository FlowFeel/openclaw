import { describe, expect, it } from "vitest";
import { resolveToolPreflight } from "./tool-preflight-resolver.js";
import { createInitialOrchestratorState } from "./orchestrator-state.js";
import { DEFAULT_TOOL_BUDGET_CONFIG, recordToolTurn } from "../agent-bandwidth-budget/tool-budget-controller.js";

describe("tool-preflight-resolver (Tier 1 Pure Invariants)", () => {
  const config = {
    defaultWorkspacePath: "/home/node/workspace",
    budget: DEFAULT_TOOL_BUDGET_CONFIG,
  };

  it("resolves sticky CWD upon direct cd commands", () => {
    const state = createInitialOrchestratorState("sess-1", config);
    const preflight = resolveToolPreflight(
      state,
      {
        sessionId: "sess-1",
        toolName: "exec",
        commandText: "cd src/agents",
      },
      config,
    );

    expect(preflight.isAdmitted).toBe(true);
    expect(preflight.effectiveCwd).toBe("/home/node/workspace/src/agents");
    expect(preflight.nextState.cwdState.activeCwd).toBe("/home/node/workspace/src/agents");
  });

  it("defaults omitted target path to prior topic subject ($_)", () => {
    let state = createInitialOrchestratorState("sess-1", config);
    // Turn 1 sets topic to config.yaml
    const turn1 = resolveToolPreflight(
      state,
      { sessionId: "sess-1", toolName: "read", targetPath: "config.yaml" },
      config,
    );
    state = turn1.nextState;

    // Turn 2 omits targetPath
    const turn2 = resolveToolPreflight(
      state,
      { sessionId: "sess-1", toolName: "read" },
      config,
    );

    expect(turn2.resolvedTargetPath).toBe("/home/node/workspace/config.yaml");
  });

  it("rejects preflight when turn budget is exhausted", () => {
    let state = createInitialOrchestratorState("sess-1", config);
    // Exhaust budget (3 turns)
    state = {
      ...state,
      budgetState: recordToolTurn(
        recordToolTurn(recordToolTurn(state.budgetState, 100), 100),
        100,
      ),
    };

    const preflight = resolveToolPreflight(
      state,
      { sessionId: "sess-1", toolName: "exec", commandText: "ls" },
      config,
    );

    expect(preflight.isAdmitted).toBe(false);
    expect(preflight.rejectionReason).toContain("[BANDWIDTH REJECTION:");
  });
});
