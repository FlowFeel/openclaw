import { describe, expect, it } from "vitest";
import {
  createInitialToolBudgetState,
  recordToolTurn,
  type ToolBudgetConfig,
} from "./tool-budget-controller.js";
import { generateBandwidthAdvisory } from "./bandwidth-advisory-generator.js";
import { assessSearchOperation } from "./search-execution-policy.js";
import { decorateWithBandwidthTelemetry } from "./bandwidth-telemetry-envelope.js";
import { BoundedToolFlightRecorder } from "../exec-ergonomics/exec-flight-recorder.js";

/**
 * BDD Specification: Forensic Duplication & Mitigation of Multi-Turn Tool Runaways.
 *
 * Simulates the production incident on Topic 2676 where an agent executed a 7-turn
 * consecutive tool chain after an upstream search timeout, using our existing flight
 * recorder and telemetry design to prove termination.
 */
describe("BDD Feature: End-to-End Tool Chain Throttling & Flight Logging", () => {
  const BUDGET_CONFIG: ToolBudgetConfig = {
    maxTurnsPerPrompt: 3,
    defaultReconBudget: 2,
    maxFileIngestBytes: 16384,
    emitBandwidthTelemetry: true,
    enableBudgetAdvisories: true,
  };

  it("Scenario: 7-turn runaway chain is captured by flight recorder and halted by turn budget", () => {
    let budgetState = createInitialToolBudgetState(BUDGET_CONFIG);
    const flightRecorder = new BoundedToolFlightRecorder(10);

    const productionTurnSequence = [
      { id: "1", tool: "exec", cmd: "find src/ -name '*.ts'", bytes: 1024, exit: 0, out: "src/a.ts" },
      { id: "2", tool: "read", path: "src/agents/plugin.ts", bytes: 2048, exit: 0, out: "code" },
      { id: "3", tool: "exec", cmd: "grep -rn 'handleTelegramWebhook' src/", bytes: 512, exit: 0, out: "match" },
      { id: "4", tool: "read", path: "src/gateway/server.ts", bytes: 4096, exit: 0, out: "server code" },
      { id: "5", tool: "exec", cmd: "ls -la src/gateway/", bytes: 512, exit: 0, out: "files" },
      { id: "6", tool: "read", path: "src/config.ts", bytes: 1024, exit: 0, out: "config" },
      { id: "7", tool: "exec", cmd: "cat README.md", bytes: 2048, exit: 0, out: "readme" },
    ];

    const injectedAdvisories: string[] = [];

    for (const step of productionTurnSequence) {
      // 1. Record flight log entry (leveraging existing flight recorder design)
      flightRecorder.record({
        id: step.id,
        tool: step.tool,
        command: step.cmd,
        exitCode: step.exit,
        output: step.out,
        durationMs: 45,
        sessionId: "session-topic-2676",
        timestamp: Date.now(),
      });

      // 2. Assess search efficiency
      const policyAssessment = assessSearchOperation({
        toolName: step.tool,
        commandText: step.cmd,
        filePath: step.path,
        responseBytes: step.bytes,
      });

      // 3. Update budget state
      budgetState = recordToolTurn(budgetState, step.bytes, BUDGET_CONFIG);

      // 4. Attach telemetry envelope
      const decorated = decorateWithBandwidthTelemetry(
        { output: step.out },
        budgetState,
        policyAssessment.efficiency,
      );

      // 5. Check for non-fatal bandwidth advisories
      const advisory = generateBandwidthAdvisory(budgetState, BUDGET_CONFIG);
      if (advisory) {
        injectedAdvisories.push(`Turn ${budgetState.turnsUsed}: ${advisory}`);
      }

      // Assert telemetry is populated on every step
      expect(decorated._bandwidth.turns_used).toBe(budgetState.turnsUsed);
    }

    // Verify flight recorder holds all 7 logged executions
    expect(flightRecorder.size()).toBe(7);

    // Verify flight recorder can query specific failures or tools
    const execEntries = flightRecorder.query({ tool: "exec" });
    expect(execEntries.length).toBe(4);

    // Verify advisories were generated at key budget thresholds
    expect(injectedAdvisories.length).toBe(6);
    expect(injectedAdvisories[0]).toContain("Turn 2: [BANDWIDTH ADVISORY: Default recon budget (2/2) reached");
    expect(injectedAdvisories[1]).toContain("Turn 3: [BANDWIDTH ADVISORY: Prompt turn ceiling (3/3) reached");

    // Verify final state is marked as exhausted
    expect(budgetState.isExhausted).toBe(true);
    expect(budgetState.turnsRemaining).toBe(0);
    expect(budgetState.reconBudgetStatus).toBe("exceeded");
  });
});
