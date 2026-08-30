import { describe, expect, it } from "vitest";
import { createInitialOrchestratorState } from "./orchestrator-state.js";
import { resolveToolPreflight } from "./tool-preflight-resolver.js";
import { projectToolPostflight } from "./tool-postflight-projector.js";
import { BoundedToolFlightRecorder } from "../exec-ergonomics/exec-flight-recorder.js";
import { DEFAULT_TOOL_BUDGET_CONFIG } from "../agent-bandwidth-budget/tool-budget-controller.js";

describe("phosphene-orchestrator (Tier 3 & Tier 4 BDD Replays)", () => {
  const config = {
    defaultWorkspacePath: "/home/node/workspace",
    budget: {
      ...DEFAULT_TOOL_BUDGET_CONFIG,
      maxTurnsPerPrompt: 3,
      defaultReconBudget: 2,
    },
    defaultCaptureMode: "full" as const,
  };

  it("BDD Replay: End-to-end 3-turn recon sequence with sticky CWD, flight logs, and budget cutoffs", () => {
    let state = createInitialOrchestratorState("session-bdd-1", config);
    const flightRecorder = new BoundedToolFlightRecorder(10);

    // Turn 1: Inbound `cd src/gateway`
    const preflight1 = resolveToolPreflight(
      state,
      {
        sessionId: "session-bdd-1",
        toolName: "exec",
        commandText: "cd src/gateway",
      },
      config,
    );
    expect(preflight1.isAdmitted).toBe(true);
    expect(preflight1.effectiveCwd).toBe("/home/node/workspace/src/gateway");

    const postflight1 = projectToolPostflight(
      preflight1.nextState,
      { sessionId: "session-bdd-1", toolName: "exec", commandText: preflight1.resolvedCommand },
      { stdout: "", exitCode: 0, durationMs: 40 },
      config,
    );
    state = postflight1.nextState;

    flightRecorder.record({
      id: "turn-1",
      tool: "exec",
      command: preflight1.resolvedCommand,
      exitCode: 0,
      output: postflight1.envelope.output,
      durationMs: 40,
      sessionId: "session-bdd-1",
      timestamp: Date.now(),
    });

    expect(postflight1.envelope._bandwidth.turns_used).toBe(1);
    expect(postflight1.envelope._fuel.chainTurn).toBe(1);

    // Turn 2: Relative read without re-spelling cd
    const preflight2 = resolveToolPreflight(
      state,
      { sessionId: "session-bdd-1", toolName: "read", targetPath: "server.ts" },
      config,
    );
    expect(preflight2.isAdmitted).toBe(true);
    expect(preflight2.effectiveCwd).toBe("/home/node/workspace/src/gateway"); // Sticky CWD verified!

    const postflight2 = projectToolPostflight(
      preflight2.nextState,
      { sessionId: "session-bdd-1", toolName: "read", targetPath: "server.ts" },
      { stdout: "class Server {}", exitCode: 0, durationMs: 30 },
      config,
    );
    state = postflight2.nextState;

    expect(postflight2.envelope._bandwidth.recon_budget).toBe("exhausted");
    expect(postflight2.envelope.advisoryPrompt).toContain("[BANDWIDTH ADVISORY: Default recon budget (2/2) reached");

    // Turn 3: 3rd tool call hits prompt ceiling
    const preflight3 = resolveToolPreflight(
      state,
      { sessionId: "session-bdd-1", toolName: "exec", commandText: "pnpm test" },
      config,
    );
    expect(preflight3.isAdmitted).toBe(true);

    const postflight3 = projectToolPostflight(
      preflight3.nextState,
      { sessionId: "session-bdd-1", toolName: "exec", commandText: "pnpm test" },
      { stdout: "Tests: 1 passed", exitCode: 0, durationMs: 150 },
      config,
    );
    state = postflight3.nextState;

    expect(postflight3.envelope._bandwidth.turns_used).toBe(3);
    expect(postflight3.envelope.advisoryPrompt).toContain("[BANDWIDTH ADVISORY: Prompt turn ceiling (3/3) reached");

    // Turn 4: Attempting a 4th tool call is rejected by preflight admission
    const preflight4 = resolveToolPreflight(
      state,
      { sessionId: "session-bdd-1", toolName: "exec", commandText: "echo extra" },
      config,
    );
    expect(preflight4.isAdmitted).toBe(false);
    expect(preflight4.rejectionReason).toContain("[BANDWIDTH REJECTION:");
  });

  it("Tier 4: Memory Invariance under 2,000 continuous tool turns", () => {
    let state = createInitialOrchestratorState("session-stress", config);
    for (let i = 0; i < 2000; i++) {
      const preflight = resolveToolPreflight(
        state,
        { sessionId: "session-stress", toolName: "exec", commandText: `cmd_${i}` },
        config,
      );
      const postflight = projectToolPostflight(
        preflight.nextState,
        { sessionId: "session-stress", toolName: "exec", commandText: `cmd_${i}` },
        { stdout: `out_${i}`, exitCode: 0, durationMs: 10 },
        config,
      );
      state = postflight.nextState;
    }

    expect(state.fuelState.chainTurnCount).toBe(2000);
    expect(state.entropyState.samples.length).toBeLessThanOrEqual(5); // Strict O(K) sliding window bound!
  });
});
