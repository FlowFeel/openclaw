import { describe, expect, it } from "vitest";
import {
  accumulateFuelSpend,
  createInitialFuelState,
  formatFuelGaugeSnapshot,
} from "./agent-fuel-gauge.js";

describe("agent-fuel-gauge (Tier 1 Pure Invariants)", () => {
  it("initializes with zero turns and baseline depth", () => {
    const state = createInitialFuelState(1);
    expect(state.chainTurnCount).toBe(0);
    expect(state.accumulatedElapsedMs).toBe(0);
    expect(state.accumulatedBytes).toBe(0);
    expect(state.activeDepth).toBe(1);
  });

  it("purely accumulates turns, time, and bytes across operations", () => {
    let state = createInitialFuelState();
    state = accumulateFuelSpend(state, { elapsedMs: 1500, responseBytes: 4096 });
    state = accumulateFuelSpend(state, { elapsedMs: 2500, responseBytes: 2048, depthDelta: 1 });

    expect(state.chainTurnCount).toBe(2);
    expect(state.accumulatedElapsedMs).toBe(4000);
    expect(state.accumulatedBytes).toBe(6144);
    expect(state.activeDepth).toBe(2);

    const snapshot = formatFuelGaugeSnapshot(state);
    expect(snapshot.chainTurn).toBe(2);
    expect(snapshot.chainTimeSeconds).toBe(4.0);
    expect(snapshot.chainBytes).toBe(6144);
    expect(snapshot.depth).toBe(2);
  });
});
