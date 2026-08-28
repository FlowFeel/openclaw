/**
 * System Prompt Inspector Tool (`system_prompt_inspect`).
 *
 * Phosphene DFT Observation Operator (O_prompt) for inspecting the active
 * compiled system prompt text, section-by-section character/token breakdown,
 * promptMode configuration, and token compaction deltas.
 *
 * @dft:axiom A1 (Pure Decision Core wrapper)
 * @dft:axiom A6 (Context & Prompt Observability)
 */

import { Type } from "typebox";
import { loadSessionEntry } from "../../config/sessions/session-accessor.js";
import {
  buildAgentSystemPrompt,
  getLastResolvedPromptSections,
  type BuildAgentSystemPromptParams,
} from "../system-prompt.js";
import type { PromptMode } from "../system-prompt.types.js";
import { getAvailablePromptSections } from "../system-prompt/registry.js";
import { type AnyAgentTool, jsonResult } from "./common.js";

// ── Tool Schema ──────────────────────────────────────────────────────

export const SystemPromptInspectParamsSchema = Type.Object(
  {
    sessionKey: Type.Optional(
      Type.String({ description: "Target session key (defaults to current session)." }),
    ),
    includeText: Type.Optional(
      Type.Boolean({ description: "Include full compiled system prompt text (default: true)." }),
    ),
    compareMode: Type.Optional(
      Type.String({
        description:
          "Optional alternative promptMode ('full', 'minimal', 'scaffold', 'bare') to compare token reduction delta.",
      }),
    ),
  },
  { additionalProperties: false },
);

export type SystemPromptInspectSectionBreakdown = {
  id: string;
  description: string;
  lineCount: number;
  chars: number;
  estimatedTokens: number;
  cacheStable: boolean;
  tier: "STABLE_ROOT" | "DYNAMIC_SESSION";
};

export function estimateTokensFromChars(chars: number): number {
  return chars <= 0 ? 0 : Math.ceil(chars / 3.8);
}

function getSectionDescription(id: string): string {
  const catalog = getAvailablePromptSections();
  const found = catalog.find((s) => s.id === id);
  return found?.description ?? id;
}

export function compileSectionsForParams(
  params: BuildAgentSystemPromptParams,
): { text: string; sections: SystemPromptInspectSectionBreakdown[] } {
  const text = buildAgentSystemPrompt(params);
  const rawSections = getLastResolvedPromptSections();

  const sections: SystemPromptInspectSectionBreakdown[] = rawSections.map((sec) => {
    const secText = sec.lines.join("\n");
    const chars = secText.length;
    return {
      id: sec.id,
      description: getSectionDescription(sec.id),
      lineCount: sec.lines.length,
      chars,
      estimatedTokens: estimateTokensFromChars(chars),
      cacheStable: sec.cacheStable,
      tier: sec.cacheStable ? "STABLE_ROOT" : "DYNAMIC_SESSION",
    };
  });

  return { text, sections };
}

function buildDefaultPromptParams(opts: {
  promptMode: PromptMode;
}): BuildAgentSystemPromptParams {
  return {
    promptMode: opts.promptMode,
    tools: [
      {
        name: "read",
        description: "Read file contents from workspace.",
        parameters: { type: "object" },
      },
      {
        name: "exec",
        description: "Run terminal shell command.",
        parameters: { type: "object" },
      },
      {
        name: "session_status",
        description: "Inspect session status.",
        parameters: { type: "object" },
      },
    ],
    skillsPrompt: "",
    userDate: new Date().toISOString().slice(0, 10),
    userTimezone: "UTC",
  };
}

// ── Tool Factory ─────────────────────────────────────────────────────

export function createSystemPromptInspectTool(opts?: {
  agentId?: string;
  storePath?: string;
}): AnyAgentTool {
  return {
    name: "system_prompt_inspect",
    label: "System Prompt Inspector",
    description:
      "Inspect compiled system prompt text, section-by-section token breakdown, active promptMode, and token compaction deltas.",
    parameters: SystemPromptInspectParamsSchema,
    execute: async (_toolCallId: string, params: Record<string, unknown>, context) => {
      const agentId = opts?.agentId ?? context?.agentId ?? "main";
      const storePath = opts?.storePath;
      const requestedKey = typeof params.sessionKey === "string" ? params.sessionKey.trim() : undefined;
      const includeText = params.includeText !== false;
      const compareModeRaw = typeof params.compareMode === "string" ? params.compareMode.trim().toLowerCase() : undefined;

      const sessionKey = requestedKey || context?.sessionKey || "main";

      const loadedSession = loadSessionEntry({
        agentId,
        sessionKey,
        storePath,
      });

      const activePromptMode: PromptMode = (loadedSession?.promptMode as PromptMode) ?? "full";

      const currentBuildParams = buildDefaultPromptParams({ promptMode: activePromptMode });
      const { text: currentText, sections: currentSections } = compileSectionsForParams(currentBuildParams);

      const totalChars = currentText.length;
      const totalTokens = estimateTokensFromChars(totalChars);
      const stableSections = currentSections.filter((s) => s.cacheStable);
      const dynamicSections = currentSections.filter((s) => !s.cacheStable);
      const stableTokens = stableSections.reduce((sum, s) => sum + s.estimatedTokens, 0);
      const dynamicTokens = dynamicSections.reduce((sum, s) => sum + s.estimatedTokens, 0);

      let compareStats: Record<string, unknown> | undefined;
      if (compareModeRaw && ["full", "minimal", "scaffold", "bare"].includes(compareModeRaw)) {
        const compareParams = buildDefaultPromptParams({ promptMode: compareModeRaw as PromptMode });
        const { text: compareText } = compileSectionsForParams(compareParams);
        const compareChars = compareText.length;
        const compareTokens = estimateTokensFromChars(compareChars);
        const tokenDelta = compareTokens - totalTokens;
        const charDelta = compareChars - totalChars;
        const reductionPercent =
          compareTokens > 0
            ? `${(((compareTokens - totalTokens) / compareTokens) * 100).toFixed(1)}%`
            : "0.0%";

        compareStats = {
          compareMode: compareModeRaw,
          compareTotalChars: compareChars,
          compareTotalTokens: compareTokens,
          charDelta,
          tokenDelta,
          reductionPercent: tokenDelta > 0 ? `-${reductionPercent}` : `+${Math.abs((tokenDelta / compareTokens) * 100).toFixed(1)}%`,
        };
      }

      const formattedBreakdownTable = currentSections
        .map(
          (s) =>
            `| ${s.id.padEnd(26)} | ${String(s.lineCount).padStart(5)} lines | ${String(s.chars).padStart(6)} chars | ${String(s.estimatedTokens).padStart(6)} tokens | ${s.tier} |`,
        )
        .join("\n");

      let summaryText = `🎭 System Prompt Inspection Report
SessionKey: ${sessionKey}
Active PromptMode: ${activePromptMode}
Total Prompt Size: ${totalChars} chars (~${totalTokens} tokens)
  - Stable Cache Prefix: ${stableTokens} tokens (${stableSections.length} sections)
  - Dynamic Session: ${dynamicTokens} tokens (${dynamicSections.length} sections)

Section Decomposition (${currentSections.length} sections active):
${formattedBreakdownTable}`;

      if (compareStats) {
        summaryText += `\n\n📊 Mode Comparison Delta (vs "${compareStats.compareMode}"):
  - Baseline ("${compareStats.compareMode}"): ${compareStats.compareTotalChars} chars (~${compareStats.compareTotalTokens} tokens)
  - Active ("${activePromptMode}"): ${totalChars} chars (~${totalTokens} tokens)
  - Reduction Delta: ${compareStats.tokenDelta} tokens (${compareStats.reductionPercent} reduction)`;
      }

      if (includeText) {
        summaryText += `\n\n--- Compiled System Prompt Text ---\n${currentText}`;
      }

      return jsonResult({
        sessionKey,
        activePromptMode,
        totalChars,
        totalTokens,
        stableTokens,
        dynamicTokens,
        sectionsCount: currentSections.length,
        sections: currentSections,
        ...(compareStats ? { compare: compareStats } : {}),
        ...(includeText ? { renderedText: currentText } : {}),
        summaryText,
      });
    },
  };
}

export const defaultSystemPromptInspectTool = createSystemPromptInspectTool();
