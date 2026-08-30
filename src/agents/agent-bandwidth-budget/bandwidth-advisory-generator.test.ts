import { describe, expect, it } from "vitest";
import { generateBandwidthAdvisory } from "./bandwidth-advisory-generator.js";
import {
  createInitialToolBudgetState,
  DEFAULT_TOOL_BUDGET_CONFIG,
  recordToolTurn,
} from "./tool-budget-controller.js";

describe("bandwidth-advisory-generator (Tier 1 & Tier 3 Replays)", () => {
  it("emits no advisory on turn 1 when budget is active", () => {
    let state = createInitialToolBudgetState();
    state = recordToolTurn(state, 1024);

    const advisory = generateBandwidthAdvisory(state, DEFAULT_TOOL_BUDGET_CONFIG);
    expect(advisory).toBeUndefined();
  });

  it("emits recon budget advisory on turn 2", () => {
    let state = createInitialToolBudgetState();
    state = recordToolTurn(state, 1024);
    state = recordToolTurn(state, 1024);

    const advisory = generateBandwidthAdvisory(state, DEFAULT_TOOL_BUDGET_CONFIG);
    expect(advisory).toContain("[BANDWIDTH ADVISORY: Default recon budget (2/2) reached");
  });

  it("emits prompt turn ceiling advisory on turn 3", () => {
    let state = createInitialToolBudgetState();
    state = recordToolTurn(state, 1024);
    state = recordToolTurn(state, 1024);
    state = recordToolTurn(state, 1024);

    const advisory = generateBandwidthAdvisory(state, DEFAULT_TOOL_BUDGET_CONFIG);
    expect(advisory).toContain("[BANDWIDTH ADVISORY: Prompt turn ceiling (3/3) reached");
  });
});
