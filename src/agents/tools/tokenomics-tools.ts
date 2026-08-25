/**
 * @dft:axiom A5 (Certified Tool Arity k <= 2, No Base Parameter Duplication)
 * Agent-Facing Shannon-Weaver Tokenomics Tools
 */

import {
  createTokenomicsEngine,
  TokenomicsEngine,
  TurnMessage,
  ContextItem,
} from "../../infra/tokenomics/index.js";

// Canonical in-memory instance for tool calls
let activeEngine: TokenomicsEngine = createTokenomicsEngine();

export function setTokenomicsEngine(engine: TokenomicsEngine): void {
  activeEngine = engine;
}

export function resetTokenomicsEngine(): TokenomicsEngine {
  activeEngine = createTokenomicsEngine();
  return activeEngine;
}

/**
 * Certified Atomic Tool (k = 2)
 * Evaluates context signal-to-noise ratio.
 */
export function tokenomics_snr(
  turns: TurnMessage[],
  options?: { threshold?: number; detailed?: boolean }
): {
  snrPercent: number;
  tier: string;
  isAdequate: boolean;
  recommendation: string;
  report?: any;
} {
  const report = activeEngine.calculateSNR(turns);
  return {
    snrPercent: report.snrPercent,
    tier: report.tier,
    isAdequate: report.isAdequate,
    recommendation: report.recommendation,
    ...(options?.detailed ? { report } : {}),
  };
}

/**
 * Certified Atomic Tool (k = 2)
 * Identifies and ranks top noise sources in conversation turns.
 */
export function noise_inspect(
  turns: TurnMessage[],
  options?: { topN?: number; category?: string }
): { topSources: any[]; count: number } {
  const sources = activeEngine.identifyNoise(turns, options?.topN ?? 3);
  const filtered = options?.category
    ? sources.filter((s) => s.category === options.category)
    : sources;

  return {
    topSources: filtered,
    count: filtered.length,
  };
}

/**
 * Certified Atomic Tool (k = 1)
 * Returns token budget coverage and category breakdown.
 */
export function budget_breakdown(items: ContextItem[]): {
  coveragePercent: number;
  totalTokens: number;
  categories: any[];
} {
  const breakdown = activeEngine.partitionBudget(items);
  return {
    coveragePercent: breakdown.coveragePercent,
    totalTokens: breakdown.totalTokens,
    categories: breakdown.categories,
  };
}

/**
 * Certified Atomic Tool (k = 2)
 * Slices bounded context segment from pre-compaction conversation archive.
 */
export function retransmit_request(
  archiveText: string,
  options: { query: string; maxTokens?: number }
): {
  found: boolean;
  tokens: number;
  segment: string;
  truncated: boolean;
} {
  return activeEngine.sliceArchive(archiveText, options.query, options.maxTokens ?? 2048);
}

import { Type } from "typebox";
import { type AnyAgentTool, jsonResult } from "./common.js";

export function createTokenomicsTools(): AnyAgentTool[] {
  return [
    {
      name: "tokenomics_snr",
      label: "Tokenomics SNR",
      description: "Evaluate Shannon-Weaver Signal-to-Noise Ratio (SNR) and tokenomics health for conversation turns.",
      parameters: Type.Object(
        {
          detailed: Type.Optional(Type.Boolean({ description: "Return detailed breakdown per category." })),
        },
        { additionalProperties: false },
      ),
      execute: async (_toolCallId: string, params: { detailed?: boolean }) => {
        return jsonResult(tokenomics_snr([], { detailed: params.detailed }));
      },
    },
    {
      name: "noise_inspect",
      label: "Noise Inspect",
      description: "Identify and rank top noise sources in conversation turns.",
      parameters: Type.Object(
        {
          topN: Type.Optional(Type.Number({ description: "Number of top sources to return (default 3)." })),
          category: Type.Optional(Type.String({ description: "Filter by noise category." })),
        },
        { additionalProperties: false },
      ),
      execute: async (_toolCallId: string, params: { topN?: number; category?: string }) => {
        return jsonResult(noise_inspect([], { topN: params.topN, category: params.category }));
      },
    },
  ];
}

