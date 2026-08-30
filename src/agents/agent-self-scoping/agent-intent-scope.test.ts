import { describe, expect, it } from "vitest";
import {
  createIntentScope,
  recordTurnInScope,
  resolveIntentScope,
} from "./agent-intent-scope.js";

describe("agent-intent-scope (Tier 1 & Tier 3 State Transitions)", () => {
  it("initializes active scope with specified turn budget", () => {
    const scope = createIntentScope({ intent: "Find session DB schema", maxTurns: 3 });
    expect(scope.active).toBe(true);
    expect(scope.maxTurns).toBe(3);
    expect(scope.turnsExecuted).toBe(0);
    expect(scope.intent).toBe("Find session DB schema");
  });

  it("decrements remaining turns and triggers non-fatal advisory on final turn", () => {
    let scope = createIntentScope({ intent: "Survey docs", maxTurns: 2 });

    // Turn 1
    const step1 = recordTurnInScope(scope);
    expect(step1.nextState.turnsExecuted).toBe(1);
    expect(step1.nextState.active).toBe(true);
    expect(step1.advisoryNotice).toBeUndefined();

    // Turn 2 (Budget Exhaustion)
    const step2 = recordTurnInScope(step1.nextState);
    expect(step2.nextState.turnsExecuted).toBe(2);
    expect(step2.nextState.active).toBe(false);
    expect(step2.nextState.outcome?.status).toBe("budget_exhausted");
    expect(step2.advisoryNotice).toContain("[SCOPE ADVISORY: Target turn budget (2/2) reached");
  });

  it("allows early explicit resolution before budget exhaustion", () => {
    let scope = createIntentScope({ intent: "Locate token budget", maxTurns: 5 });
    const step1 = recordTurnInScope(scope);
    const resolved = resolveIntentScope(step1.nextState, "resolved", "Found in agent-tools.ts:45");

    expect(resolved.active).toBe(false);
    expect(resolved.outcome?.status).toBe("resolved");
    expect(resolved.outcome?.notes).toBe("Found in agent-tools.ts:45");

    // Further steps on inactive scope do nothing
    const stepAfter = recordTurnInScope(resolved);
    expect(stepAfter.nextState.turnsExecuted).toBe(1);
    expect(stepAfter.advisoryNotice).toBeUndefined();
  });
});
