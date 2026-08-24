/**
 * Context Meter & Compaction Diagnostic Tools.
 *
 * Certified Atomic tools (k <= 2) for observing context fill ratio and compaction telemetry.
 *
 * @dft
 * - Pure tool layer wrapping Adaptive Compactor functions (A1, A2, A6).
 * - LC5 (dual-metric), LC6 (environment-calibrated meter).
 */

import { Type } from "typebox";
import {
  calculateContextMeter,
  calculateDualMetricFootprint,
  resolveCompactionThreshold,
  type EnvironmentContextVector,
} from "../../infra/compaction/index.js";
import { type AnyAgentTool, jsonResult } from "./common.js";

// ── Tool Schemas (Atomic: arity <= 2) ────────────────────────────────

export const ContextMeterSchema = Type.Object(
  {
    currentTokens: Type.Optional(
      Type.Number({ description: "Current estimated prompt tokens in active session." }),
    ),
    currentBytes: Type.Optional(
      Type.Number({ description: "Current session payload size on disk in bytes." }),
    ),
  },
  { additionalProperties: false },
);

export const CompactionPreviewSchema = Type.Object(
  {
    tokensBefore: Type.Number({ description: "Pre-compaction token volume." }),
    tokensAfter: Type.Number({ description: "Estimated post-compaction token volume." }),
  },
  { additionalProperties: false },
);

// ── Tool Factory ─────────────────────────────────────────────────────

export function createCompactionMeterTools(
  defaultEnv: EnvironmentContextVector = {
    modelContextWindow: 1_048_576,
    reserveTokens: 16_384,
    absoluteTokenTrigger: 200_000,
  },
): AnyAgentTool[] {
  const resolved = resolveCompactionThreshold(defaultEnv);

  const contextMeterTool: AnyAgentTool = {
    name: "context_meter",
    label: "Context Meter",
    description: "Inspect context capacity, token budget, on-disk MB footprint, and visual fill gauge.",
    parameters: ContextMeterSchema,
    execute: async (_toolCallId: string, params: { currentTokens?: number; currentBytes?: number }) => {
      const tokens = params.currentTokens ?? 0;
      const bytes = params.currentBytes ?? 0;
      const status = calculateContextMeter(
        tokens,
        resolved.tokenTrigger,
        bytes,
        resolved.byteLimit,
      );
      return jsonResult({
        currentTokens: status.currentTokens,
        thresholdTokens: status.thresholdTokens,
        currentBytes: status.currentBytes,
        thresholdBytes: status.thresholdBytes,
        percentage: status.percentage,
        tier: status.tier,
        visualMeter: status.visualMeter,
        formattedLabel: status.formattedLabel,
      });
    },
  };

  const compactionPreviewTool: AnyAgentTool = {
    name: "compaction_preview",
    label: "Compaction Preview",
    description: "Calculate dual-metric token and on-disk MB reduction for a hypothetical or completed compaction.",
    parameters: CompactionPreviewSchema,
    execute: async (_toolCallId: string, params: { tokensBefore: number; tokensAfter: number }) => {
      const footprint = calculateDualMetricFootprint(
        params.tokensBefore,
        params.tokensAfter,
        params.tokensBefore * 12.5,
        params.tokensAfter * 12.5,
      );
      return jsonResult({
        tokensBefore: footprint.tokensBefore,
        tokensAfter: footprint.tokensAfter,
        tokenDeltaPercent: footprint.tokenDeltaPercent,
        formattedSummary: footprint.formattedSummary,
      });
    },
  };

  return [contextMeterTool, compactionPreviewTool];
}

export const defaultCompactionMeterTools = createCompactionMeterTools();
