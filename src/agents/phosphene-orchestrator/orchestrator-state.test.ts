import { describe, expect, it } from "vitest";
import { createInitialOrchestratorState } from "./orchestrator-state.js";
import { DEFAULT_TOOL_BUDGET_CONFIG } from "../agent-bandwidth-budget/tool-budget-controller.js";

describe("orchestrator-state (Tier 1 Pure Invariants)", () => {
  it("initializes composite state cleanly with configured workspace and budgets", () => {
    const state = createInitialOrchestratorState("session-abc", {
      defaultWorkspacePath: "/home/node/workspace",
      budget: DEFAULT_TOOL_BUDGET_CONFIG,
    });

    expect(state.sessionId).toBe("session-abc");
    expect(state.cwdState.activeCwd).toBe("/home/node/workspace");
    expect(state.fuelState.chainTurnCount).toBe(0);
    expect(state.budgetState.turnsRemaining).toBe(3);
    expect(state.entropyState.velocityGrade).toBe("high");
    expect(state.topicState.currentTopic).toBeNull();
  });
});
