/**
 * Pure Intent Breadcrumb Synthesizer for Shannon-Weaver Compaction.
 * Goldilocks decomposition unit (< 80 LOC).
 * 
 * @dft:axiom A1 (Pure Decision Core)
 * @dft:axiom A4 (Bounded Channel Economics)
 */

import type { ToolCallCommandEntry } from "./tool-command-types.js";

export type CompactedTurnBreadcrumb = {
  turnIndex: number;
  toolActions: Array<{ tool: string; summary: string }>;
  markdown: string;
};

export function synthesizeIntentBreadcrumb(params: {
  turnIndex: number;
  entries: ToolCallCommandEntry[];
  outcomeSummary?: string;
}): CompactedTurnBreadcrumb {
  const toolActions = params.entries.map((e) => ({
    tool: e.tool,
    summary: e.paramsSummary,
  }));

  const lines: string[] = [
    `[COMPACTED TURN ${params.turnIndex} — INTENT BREADCRUMB]`,
  ];

  if (toolActions.length === 0) {
    lines.push("Action: No tool calls executed (conversational turn)");
  } else {
    for (const action of toolActions) {
      lines.push(`Action: ${action.tool} -> "${action.summary}"`);
    }
  }

  if (params.outcomeSummary) {
    lines.push(`Outcome: ${params.outcomeSummary}`);
  }

  return {
    turnIndex: params.turnIndex,
    toolActions,
    markdown: lines.join("\n"),
  };
}
