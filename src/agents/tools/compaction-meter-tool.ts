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
import { loadSessionEntry } from "../../config/sessions/session-accessor.js";
import {
  calculateContextMeter,
  calculateDualMetricFootprint,
  resolveCompactionThreshold,
  type EnvironmentContextVector,
} from "../../infra/compaction/index.js";
import type { PromptMode } from "../system-prompt.types.js";
import { type AnyAgentTool, jsonResult } from "./common.js";
import { compileSectionsForParams } from "./system-prompt-inspect-tool.js";

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
    execute: async (_toolCallId: string, params: { currentTokens?: number; currentBytes?: number }, context) => {
      let tokens = params.currentTokens;
      let bytes = params.currentBytes;

      let systemPromptTokens = 0;
      let historyTokens = 0;
      let toolResultTokens = 0;

      if (tokens === undefined || tokens === 0) {
        const agentId = context?.agentId ?? "main";
        const sessionKey = context?.sessionKey ?? "main";
        const loadedSession = loadSessionEntry({ agentId, sessionKey });

        const report = loadedSession?.systemPromptReport;
        if (report?.systemPrompt?.chars) {
          systemPromptTokens = Math.ceil(report.systemPrompt.chars / 3.8);
        } else {
          // Default estimation for session prompt mode
          const promptMode: PromptMode = (loadedSession?.promptMode as PromptMode) ?? "full";
          const { text } = compileSectionsForParams({
            promptMode,
            tools: [{ name: "read", description: "", parameters: {} }],
            skillsPrompt: "",
            userDate: new Date().toISOString().slice(0, 10),
            userTimezone: "UTC",
          });
          systemPromptTokens = Math.ceil(text.length / 3.8);
        }

        const totalSessionTokens = loadedSession?.totalTokens ?? systemPromptTokens;
        tokens = Math.max(systemPromptTokens, totalSessionTokens);
        historyTokens = Math.max(0, tokens - systemPromptTokens);
        bytes = bytes ?? (loadedSession?.payloadBytes ?? Math.round(tokens * 12.5));
      } else {
        systemPromptTokens = Math.round(tokens * 0.25);
        historyTokens = Math.round(tokens * 0.75);
      }

      const status = calculateContextMeter(
        tokens,
        resolved.tokenTrigger,
        bytes,
        resolved.byteLimit,
      );

      const freeBudgetTokens = Math.max(0, resolved.contextWindow - tokens);
      const totalCapacity = resolved.contextWindow;
      const sPct = Math.round((systemPromptTokens / totalCapacity) * 100);
      const hPct = Math.round((historyTokens / totalCapacity) * 100);
      const tPct = Math.round((toolResultTokens / totalCapacity) * 100);
      const rPct = Math.max(0, 100 - (sPct + hPct + tPct));

      const partitionMeterGauge = `[██ System (${sPct}%) | ██ History (${hPct}%) | ░░ Free (${rPct}%)]`;

      return jsonResult({
        currentTokens: status.currentTokens,
        thresholdTokens: status.thresholdTokens,
        currentBytes: status.currentBytes,
        thresholdBytes: status.thresholdBytes,
        percentage: status.percentage,
        tier: status.tier,
        visualMeter: status.visualMeter,
        partitionMeterGauge,
        formattedLabel: status.formattedLabel,
        partitionBreakdown: {
          systemPromptTokens,
          historyTokens,
          toolResultTokens,
          freeBudgetTokens,
          modelContextWindow: resolved.contextWindow,
        },
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
