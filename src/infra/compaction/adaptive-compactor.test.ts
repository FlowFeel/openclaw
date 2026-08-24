import { describe, expect, it } from "vitest";
import {
  calculateDualMetricFootprint,
  calculateEmpiricalDensity,
  formatBytes,
  formatTokens,
  resolveCompactionThreshold,
} from "./adaptive-threshold.js";
import {
  calculateContextMeter,
  formatLiterateCompactionArtifact,
  generateAsciiBar,
  partitionEpistemicTurns,
} from "./literate-compactor.js";
import {
  shouldTriggerCompaction,
  type EnvironmentContextVector,
} from "./types.js";

describe("Adaptive Compactor — Degree 0 Pure Invariants", () => {
  describe("Adaptive Threshold Resolution", () => {
    it("resolves 200K threshold for 1M model when absolute override is given", () => {
      const env: EnvironmentContextVector = {
        modelContextWindow: 1_048_576,
        reserveTokens: 16_384,
        absoluteTokenTrigger: 200_000,
      };
      const resolved = resolveCompactionThreshold(env);
      expect(resolved.tokenTrigger).toBe(200_000);
      expect(resolved.contextWindow).toBe(1_048_576);
      expect(resolved.tailTurnCount).toBe(2);
      expect(resolved.preTailTargetRatio).toBe(0.15);
      expect(resolved.reason).toContain("absolute-override");
    });

    it("resolves 75% ratio threshold for 128K model", () => {
      const env: EnvironmentContextVector = {
        modelContextWindow: 128_000,
        reserveTokens: 10_000,
        triggerRatio: 0.75,
      };
      const resolved = resolveCompactionThreshold(env);
      expect(resolved.tokenTrigger).toBe(96_000);
      expect(resolved.reason).toContain("model-ratio (75%");
    });

    it("clamps to reactive reserve ceiling when reserve is huge", () => {
      const env: EnvironmentContextVector = {
        modelContextWindow: 32_000,
        reserveTokens: 16_000,
        triggerRatio: 0.9,
      };
      const resolved = resolveCompactionThreshold(env);
      expect(resolved.tokenTrigger).toBe(16_000);
      expect(resolved.reason).toContain("reactive-reserve-ceiling");
    });

    it("preempts token trigger when host disk limit is constrained", () => {
      // 1MB disk limit = ~83K tokens at 12.5 B/tok
      const env: EnvironmentContextVector = {
        modelContextWindow: 1_000_000,
        reserveTokens: 10_000,
        hostDiskLimitBytes: 1024 * 1024,
      };
      const resolved = resolveCompactionThreshold(env);
      expect(resolved.tokenTrigger).toBe(83_886);
      expect(resolved.byteLimit).toBe(1024 * 1024);
      expect(resolved.reason).toContain("host-disk-limit");
    });
  });

  describe("Predicates & Sizing Math", () => {
    it("triggers compaction when token count crosses threshold", () => {
      const resolved = resolveCompactionThreshold({
        modelContextWindow: 1_000_000,
        reserveTokens: 10_000,
        absoluteTokenTrigger: 200_000,
      });
      expect(shouldTriggerCompaction(resolved, 199_999)).toBe(false);
      expect(shouldTriggerCompaction(resolved, 200_000)).toBe(true);
      expect(shouldTriggerCompaction(resolved, 250_000)).toBe(true);
    });

    it("triggers compaction when on-disk byte limit is crossed even if tokens fit", () => {
      const resolved = resolveCompactionThreshold({
        modelContextWindow: 1_000_000,
        reserveTokens: 10_000,
        hostDiskLimitBytes: 5 * 1024 * 1024,
      });
      // Tokens below 200K, but bytes = 6MB (> 5MB)
      expect(shouldTriggerCompaction(resolved, 50_000, 6 * 1024 * 1024)).toBe(true);
    });

    it("calculates empirical density correctly", () => {
      expect(calculateEmpiricalDensity(10_000, 131_000)).toBe(13.1);
      expect(calculateEmpiricalDensity(0, 0, 12.5)).toBe(12.5);
    });

    it("formats tokens and bytes correctly", () => {
      expect(formatTokens(200_000)).toBe("200K");
      expect(formatTokens(1_500_000)).toBe("1.5M");
      expect(formatBytes(2.1 * 1024 * 1024)).toBe("2.1MB");
      expect(formatBytes(400 * 1024)).toBe("0.4MB");
    });

    it("calculates dual-metric token and MB footprint reduction", () => {
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
    });
  });

  describe("Visual Context Meter", () => {
    it("generates ASCII progression bar", () => {
      expect(generateAsciiBar(0.0)).toBe("[░░░░░░░░░░]");
      expect(generateAsciiBar(0.5)).toBe("[█████░░░░░]");
      expect(generateAsciiBar(0.8)).toBe("[████████░░]");
      expect(generateAsciiBar(1.0)).toBe("[██████████]");
    });

    it("calculates meter status and tiers accurately", () => {
      const meter = calculateContextMeter(160_000, 200_000, 1.8 * 1024 * 1024, 2.5 * 1024 * 1024);
      expect(meter.percentage).toBe(80);
      expect(meter.tier).toBe("warning");
      expect(meter.visualMeter).toBe("[████████░░]");
      expect(meter.formattedLabel).toContain("[████████░░] 80% (160K/200K tokens | 1.8MB/2.5MB)");
    });
  });

  describe("Living Tail Turn Partitioning", () => {
    it("preserves exactly the last 2 user turns verbatim", () => {
      const messages = [
        { role: "user", text: "turn 1 prompt" },
        { role: "assistant", text: "turn 1 reply" },
        { role: "user", text: "turn 2 prompt" },
        { role: "assistant", text: "turn 2 reply" },
        { role: "user", text: "turn 3 prompt" },
        { role: "assistant", text: "turn 3 reply" },
      ];
      const partition = partitionEpistemicTurns(messages, 2);
      expect(partition.preTailMessages).toHaveLength(2);
      expect(partition.preTailMessages[0].text).toBe("turn 1 prompt");
      expect(partition.livingTailMessages).toHaveLength(4);
      expect(partition.livingTailMessages[0].text).toBe("turn 2 prompt");
      expect(partition.tailTurnCount).toBe(2);
    });

    it("retains all messages in living tail if history is shorter than tail count", () => {
      const messages = [
        { role: "user", text: "turn 1 prompt" },
        { role: "assistant", text: "turn 1 reply" },
      ];
      const partition = partitionEpistemicTurns(messages, 2);
      expect(partition.preTailMessages).toHaveLength(0);
      expect(partition.livingTailMessages).toHaveLength(2);
      expect(partition.tailTurnCount).toBe(1);
    });
  });

  describe("Literate Compaction Artifact Formatter", () => {
    it("produces a structured first-class markdown artifact preserving Axioms & War Stories", () => {
      const artifact = formatLiterateCompactionArtifact({
        goal: "Deploy Hickey Coordinate Map to production EC2",
        constraintsAndPreferences: ["Must satisfy Axioms M1-M5", "Keep arity k <= 2"],
        progressDone: ["Implemented InMemoryHickeyMap", "All 84 tests passing"],
        progressInProgress: ["Finalizing Literate Compaction"],
        progressBlocked: [],
        keyDecisions: [
          { decision: "Zero-Schema Registry", rationale: "Namespace is the schema per M1" },
        ],
        warStories: [
          {
            failure: "SQLite 280MB bloat lock contention",
            rootCause: "Uncapped transcript compaction failure",
          },
        ],
        criticalContext: ["EC2 host: 18.116.164.101"],
        nextSteps: ["Deploy v2026.8.5-phosphene to production"],
      });

      expect(artifact).toContain("## Goal\nDeploy Hickey Coordinate Map to production EC2");
      expect(artifact).toContain("## Constraints & Preferences\n- Must satisfy Axioms M1-M5");
      expect(artifact).toContain("## War Stories\n- **SQLite 280MB bloat lock contention**: Uncapped transcript compaction failure");
      expect(artifact).toContain("## Key Decisions\n- **Zero-Schema Registry**: Namespace is the schema per M1");
      expect(artifact).toContain("## Next Steps\n1. Deploy v2026.8.5-phosphene to production");
    });
  });
});
