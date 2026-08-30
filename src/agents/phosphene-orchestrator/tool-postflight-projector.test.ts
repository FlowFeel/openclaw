import { describe, expect, it } from "vitest";
import { projectToolPostflight } from "./tool-postflight-projector.js";
import { createInitialOrchestratorState } from "./orchestrator-state.js";
import { DEFAULT_TOOL_BUDGET_CONFIG } from "../agent-bandwidth-budget/tool-budget-controller.js";

describe("tool-postflight-projector (Tier 1 & Tier 2 Telemetry Contracts)", () => {
  const config = {
    defaultWorkspacePath: "/home/node/workspace",
    budget: DEFAULT_TOOL_BUDGET_CONFIG,
    defaultCaptureMode: "full" as const,
  };

  it("decorates raw tool return with full telemetry and special registers ($?, $!, _fuel, _bandwidth)", () => {
    const state = createInitialOrchestratorState("sess-1", config);
    const result = projectToolPostflight(
      state,
      { sessionId: "sess-1", toolName: "exec", commandText: "grep -rn 'foo' src/" },
      { stdout: "src/a.ts:1:foo\nsrc/b.ts:5:foo", exitCode: 0, durationMs: 120 },
      config,
    );

    expect(result.envelope.output).toContain("src/a.ts:1:foo");
    expect(result.envelope.exitCode).toBe(0);
    expect(result.envelope["$?"]).toBe(0);
    expect(result.envelope["$!"]).toBeNull();
    expect(result.envelope._fuel.chainTurn).toBe(1);
    expect(result.envelope._fuel.chainTimeSeconds).toBe(0.1);
    expect(result.envelope._bandwidth.turns_used).toBe(1);
    expect(result.envelope._bandwidth.turns_remaining).toBe(2);
    expect(result.envelope._bandwidth.search_efficiency).toBe("optimal");
    expect(result.envelope.advisoryPrompt).toBeUndefined();
  });

  it("emits non-fatal bandwidth advisory upon reaching recon budget on turn 2", () => {
    let state = createInitialOrchestratorState("sess-1", config);

    // Turn 1
    const res1 = projectToolPostflight(
      state,
      { sessionId: "sess-1", toolName: "read", targetPath: "a.ts" },
      { stdout: "content A", exitCode: 0, durationMs: 50 },
      config,
    );
    state = res1.nextState;

    // Turn 2
    const res2 = projectToolPostflight(
      state,
      { sessionId: "sess-1", toolName: "read", targetPath: "b.ts" },
      { stdout: "content B", exitCode: 0, durationMs: 50 },
      config,
    );

    expect(res2.envelope._bandwidth.turns_used).toBe(2);
    expect(res2.envelope._bandwidth.recon_budget).toBe("exhausted");
    expect(res2.envelope.advisoryPrompt).toContain("[BANDWIDTH ADVISORY: Default recon budget (2/2) reached");
  });
});
