/**
 * BDD Behavioral Scenarios: Adaptive Literate Compaction Subsystem (Epic 16).
 *
 * Gherkin feature tests asserting Shannon-Weaver tokenomics, adaptive triggers,
 * living tail preservation, dual-metric telemetry, and context meter visualization.
 */

import { describe, expect, it } from "vitest";
import {
  calculateDualMetricFootprint,
  resolveCompactionThreshold,
} from "./adaptive-threshold.js";
import {
  calculateContextMeter,
  formatLiterateCompactionArtifact,
  partitionEpistemicTurns,
} from "./literate-compactor.js";
import {
  shouldTriggerCompaction,
  type EnvironmentContextVector,
} from "./types.js";

describe("Feature: Adaptive Literate Compaction", () => {
  describe("Scenario 1: Dynamic auto-trigger across distinct model contexts", () => {
    it("Given a 1M model with 200K profile override, triggers at 200,000 tokens without interactive prompts", () => {
      const env: EnvironmentContextVector = {
        modelContextWindow: 1_048_576,
        reserveTokens: 16_384,
        absoluteTokenTrigger: 200_000,
      };
      const threshold = resolveCompactionThreshold(env);

      // When context is at 195,000 tokens
      expect(shouldTriggerCompaction(threshold, 195_000)).toBe(false);

      // When context crosses 200,000 tokens
      expect(shouldTriggerCompaction(threshold, 200_000)).toBe(true);
      expect(threshold.reason).toContain("absolute-override");
    });

    it("Given a 128K context model, triggers at 75% ratio (96,000 tokens)", () => {
      const env: EnvironmentContextVector = {
        modelContextWindow: 128_000,
        reserveTokens: 8_000,
        triggerRatio: 0.75,
      };
      const threshold = resolveCompactionThreshold(env);

      expect(threshold.tokenTrigger).toBe(96_000);
      expect(shouldTriggerCompaction(threshold, 95_999)).toBe(false);
      expect(shouldTriggerCompaction(threshold, 96_000)).toBe(true);
    });
  });

  describe("Scenario 2: Host storage ceiling preempts token limit", () => {
    it("Given an active session with low tokens but on-disk payload crossing 5MB limit, triggers compaction", () => {
      const env: EnvironmentContextVector = {
        modelContextWindow: 1_000_000,
        reserveTokens: 10_000,
        hostDiskLimitBytes: 5 * 1024 * 1024, // 5MB limit
      };
      const threshold = resolveCompactionThreshold(env);

      // When tokens are low (50K) but on-disk size is 5.2MB
      const currentTokens = 50_000;
      const currentBytes = 5.2 * 1024 * 1024;

      expect(shouldTriggerCompaction(threshold, currentTokens, currentBytes)).toBe(true);
    });
  });

  describe("Scenario 3: Verbatim living tail preservation (Rule LC2)", () => {
    it("Given a 10-turn conversation history, preserves the most recent 2 turns verbatim while summarizing earlier turns", () => {
      const turns = Array.from({ length: 10 }, (_, i) => [
        { role: "user", text: `User request turn ${i + 1}`, id: `u-${i + 1}` },
        { role: "assistant", text: `Assistant answer turn ${i + 1}`, id: `a-${i + 1}` },
      ]).flat();

      // When partitioning for living tail
      const partition = partitionEpistemicTurns(turns, 2);

      // Then exactly turns 1-8 are pre-tail, and turns 9-10 are in living tail
      expect(partition.preTailMessages).toHaveLength(16); // 8 turns * 2 messages
      expect(partition.livingTailMessages).toHaveLength(4); // 2 turns * 2 messages
      expect(partition.livingTailMessages[0].text).toBe("User request turn 9");
      expect(partition.livingTailMessages[3].text).toBe("Assistant answer turn 10");
    });
  });

  describe("Scenario 4: Structured epistemic compression (Rule LC4)", () => {
    it("Given pre-tail conversation with decisions and failure modes, creates a first-class literate artifact preserving Axiom IDs and War Stories", () => {
      const artifact = formatLiterateCompactionArtifact({
        goal: "Deploy Hickey Coordinate Map with Zero-Schema Architecture",
        constraintsAndPreferences: [
          "Must follow Axiom M1 (no-schema)",
          "Must follow Axiom M2 (silent-overwrite)",
          "Must follow Rule A5 (certified arity k <= 2)",
        ],
        progressDone: [
          "Created InMemoryHickeyMap with Map<string, string>",
          "Implemented map_read, map_write, map_list_keys, map_delete",
        ],
        progressInProgress: [
          "Verifying Graduated Test Pyramid",
        ],
        progressBlocked: [],
        keyDecisions: [
          {
            decision: "Hickey Address Space",
            rationale: "Forward-slash delimited namespace is the address and discovery primitive",
          },
        ],
        warStories: [
          {
            failure: "SQLite lock contention (280MB)",
            rootCause: "Uncapped transcript bloat caused database to freeze",
          },
        ],
        criticalContext: [
          "EC2 Production: 18.116.164.101",
          "Proxy port: 9090",
        ],
        nextSteps: [
          "Run fast-path deployment",
          "Verify 6/6 live health probes",
        ],
      });

      expect(artifact).toContain("## Goal\nDeploy Hickey Coordinate Map with Zero-Schema Architecture");
      expect(artifact).toContain("Must follow Axiom M1 (no-schema)");
      expect(artifact).toContain("Must follow Rule A5 (certified arity k <= 2)");
      expect(artifact).toContain("SQLite lock contention (280MB)");
      expect(artifact).toContain("Forward-slash delimited namespace is the address");
      expect(artifact).toContain("1. Run fast-path deployment");
    });
  });

  describe("Scenario 5: Dual-metric token and on-disk MB reduction telemetry (Rule LC5)", () => {
    it("Given a compaction from 167K tokens / 2.1MB to 40K tokens / 0.4MB, formats accurate dual-metric telemetry", () => {
      const footprint = calculateDualMetricFootprint(
        167_000,
        40_000,
        2.1 * 1024 * 1024,
        0.4 * 1024 * 1024,
      );

      expect(footprint.tokensBefore).toBe(167_000);
      expect(footprint.tokensAfter).toBe(40_000);
      expect(footprint.tokenDeltaPercent).toBe(76.0);
      expect(footprint.byteDeltaPercent).toBe(81.0);
      expect(footprint.formattedSummary).toContain("167K tokens → 40K (-76%)");
      expect(footprint.formattedSummary).toContain("2.1MB → 0.4MB (-81%)");
      expect(footprint.formattedSummary).toContain("density: 13.19 B/tok");
    });
  });

  describe("Scenario 6: Visual context meter progression (Rule LC6)", () => {
    it("Given increasing context tokens, transitions through nominal, warning, and overflow tiers", () => {
      // 50K / 200K (25%) -> nominal
      const meter1 = calculateContextMeter(50_000, 200_000);
      expect(meter1.tier).toBe("nominal");
      expect(meter1.percentage).toBe(25);
      expect(meter1.visualMeter).toBe("[███░░░░░░░]");

      // 160K / 200K (80%) -> warning
      const meter2 = calculateContextMeter(160_000, 200_000);
      expect(meter2.tier).toBe("warning");
      expect(meter2.percentage).toBe(80);
      expect(meter2.visualMeter).toBe("[████████░░]");

      // 180K / 200K (90%) -> critical
      const meter3 = calculateContextMeter(180_000, 200_000);
      expect(meter3.tier).toBe("critical");
      expect(meter3.percentage).toBe(90);

      // 200K / 200K (100%) -> overflow
      const meter4 = calculateContextMeter(200_000, 200_000);
      expect(meter4.tier).toBe("overflow");
      expect(meter4.percentage).toBe(100);
      expect(meter4.visualMeter).toBe("[██████████]");
    });
  });
});
