import { describe, expect, it } from "vitest";
import {
  createInitialToolBudgetState,
  DEFAULT_TOOL_BUDGET_CONFIG,
  recordToolTurn,
} from "./tool-budget-controller.js";

describe("tool-budget-controller (Tier 1 Pure Invariants)", () => {
  it("initializes with full turn allowance and active recon status", () => {
    const state = createInitialToolBudgetState();
    expect(state.turnsUsed).toBe(0);
    expect(state.turnsRemaining).toBe(3);
    expect(state.reconBudgetStatus).toBe("active");
    expect(state.isExhausted).toBe(false);
    expect(state.bytesIngested).toBe(0);
  });

  it("transitions recon budget from active -> exhausted -> exceeded", () => {
    let state = createInitialToolBudgetState(DEFAULT_TOOL_BUDGET_CONFIG);

    // Turn 1
    state = recordToolTurn(state, 1024, DEFAULT_TOOL_BUDGET_CONFIG);
    expect(state.turnsUsed).toBe(1);
    expect(state.turnsRemaining).toBe(2);
    expect(state.reconBudgetStatus).toBe("active");
    expect(state.isExhausted).toBe(false);

    // Turn 2 (Recon budget reached)
    state = recordToolTurn(state, 2048, DEFAULT_TOOL_BUDGET_CONFIG);
    expect(state.turnsUsed).toBe(2);
    expect(state.turnsRemaining).toBe(1);
    expect(state.reconBudgetStatus).toBe("exhausted");
    expect(state.isExhausted).toBe(false);

    // Turn 3 (Final budget limit reached)
    state = recordToolTurn(state, 1024, DEFAULT_TOOL_BUDGET_CONFIG);
    expect(state.turnsUsed).toBe(3);
    expect(state.turnsRemaining).toBe(0);
    expect(state.reconBudgetStatus).toBe("exceeded");
    expect(state.isExhausted).toBe(true);
    expect(state.bytesIngested).toBe(4096);
  });
});
