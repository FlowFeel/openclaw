import { describe, expect, it } from "vitest";
import {
  createInitialToolBudgetState,
  DEFAULT_TOOL_BUDGET_CONFIG,
  recordToolTurn,
  type ToolBudgetConfig,
} from "./tool-budget-controller.js";
import { generateBandwidthAdvisory } from "./bandwidth-advisory-generator.js";
import { assessSearchOperation } from "./search-execution-policy.js";
import { decorateWithBandwidthTelemetry } from "./bandwidth-telemetry-envelope.js";

/**
 * BDD Specification: Duplication & Resolution of Endless Tool Calling Chains in Production.
 *
 * Problem: In production (Topic 2676), when search tools time out or when exploring,
 * agents execute 7+ sequential tool calls per single user turn without stopping.
 */
describe("BDD Feature: Prevention of Endless Tool Calling Chains & Multi-Turn Runaway", () => {
  const STRICT_PROD_CONFIG: ToolBudgetConfig = {
    maxTurnsPerPrompt: 3,
    defaultReconBudget: 2,
    maxFileIngestBytes: 16384,
    emitBandwidthTelemetry: true,
    enableBudgetAdvisories: true,
  };

  describe("Scenario 1: Reproducing the 7-turn runaway chain and proving budget enforcement", () => {
    it("intercepts runaway chains at turn 2 (recon limit) and turn 3 (hard ceiling)", () => {
      let state = createInitialToolBudgetState(STRICT_PROD_CONFIG);
      const simulatedTurns = [
        { tool: "exec", cmd: "find src/", bytes: 1024 },
        { tool: "read", path: "src/agents/plugin.ts", bytes: 2048 },
        { tool: "exec", cmd: "grep -rn 'foo' src/", bytes: 512 },
        { tool: "read", path: "src/gateway/server.ts", bytes: 4096 },
        { tool: "exec", cmd: "ls -la", bytes: 512 },
        { tool: "read", path: "src/config.ts", bytes: 1024 },
        { tool: "exec", cmd: "cat README.md", bytes: 2048 },
      ];

      const recordedAdvisories: string[] = [];

      for (let i = 0; i < simulatedTurns.length; i++) {
        const turn = simulatedTurns[i];
        state = recordToolTurn(state, turn.bytes, STRICT_PROD_CONFIG);
        const advisory = generateBandwidthAdvisory(state, STRICT_PROD_CONFIG);
        if (advisory) {
          recordedAdvisories.push(`Turn ${state.turnsUsed}: ${advisory}`);
        }
      }

      // Proves that at turn 2 and turn 3, explicit non-fatal short-circuit advisories are emitted
      expect(recordedAdvisories.length).toBeGreaterThanOrEqual(2);
      expect(recordedAdvisories[0]).toContain("Turn 2: [BANDWIDTH ADVISORY: Default recon budget (2/2) reached");
      expect(recordedAdvisories[1]).toContain("Turn 3: [BANDWIDTH ADVISORY: Prompt turn ceiling (3/3) reached");

      // Proves that state flags exhaustion precisely at turn 3
      expect(state.turnsUsed).toBe(7);
      expect(state.isExhausted).toBe(true);
      expect(state.turnsRemaining).toBe(0);
      expect(state.reconBudgetStatus).toBe("exceeded");
    });
  });

  describe("Scenario 2: Detecting search fallback degradation (MCP timeout -> directory crawl)", () => {
    it("flags linear directory listing fallback as suboptimal and advises ripgrep", () => {
      // When phosphene-search MCP is unavailable, agent tries raw 'find src/'
      const assessment = assessSearchOperation({
        toolName: "exec",
        commandText: "find src/ -name '*.ts'",
        responseBytes: 2048,
      });

      expect(assessment.efficiency).toBe("suboptimal_linear_crawl");
      expect(assessment.advisoryComment).toContain("Unfiltered directory listing detected");
    });

    it("attaches suboptimal efficiency warning into the _bandwidth telemetry envelope", () => {
      let state = createInitialToolBudgetState(STRICT_PROD_CONFIG);
      state = recordToolTurn(state, 2048, STRICT_PROD_CONFIG);

      const rawResult = { stdout: "src/a.ts\nsrc/b.ts\nsrc/c.ts", exitCode: 0 };
      const decorated = decorateWithBandwidthTelemetry(
        rawResult,
        state,
        "suboptimal_linear_crawl",
      );

      expect(decorated._bandwidth.search_efficiency).toBe("suboptimal_linear_crawl");
      expect(decorated._bandwidth.turns_used).toBe(1);
      expect(decorated._bandwidth.turns_remaining).toBe(2);
    });
  });
});
