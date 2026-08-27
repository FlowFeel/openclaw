/**
 * @dft:axiom A3
 * Pure Token Budget Breakdown & Coverage Partitioner
 */

import {
  type BudgetBreakdown,
  type TokenBudgetCategory,
} from "./types.js";

export interface ContextItem {
  category:
    | "system_prompts"
    | "conversation_history"
    | "tool_definitions"
    | "user_preferences"
    | "workspace_context"
    | "other";
  tokens: number;
}

export function partitionTokenBudget(items: ContextItem[]): BudgetBreakdown {
  if (items.length === 0) {
    return {
      totalTokens: 0,
      accountedTokens: 0,
      coveragePercent: 100,
      categories: [],
    };
  }

  const categoryMap = new Map<string, number>();
  let totalTokens = 0;

  for (const item of items) {
    totalTokens += item.tokens;
    const current = categoryMap.get(item.category) ?? 0;
    categoryMap.set(item.category, current + item.tokens);
  }

  const safeTotal = Math.max(1, totalTokens);
  const categories: TokenBudgetCategory[] = [];
  let accountedTokens = 0;

  for (const [name, tokens] of categoryMap.entries()) {
    accountedTokens += tokens;
    categories.push({
      name,
      tokens,
      percentage: Math.round((tokens / safeTotal) * 100),
    });
  }

  // Sort descending by token consumption
  categories.sort((a, b) => b.tokens - a.tokens);

  const coveragePercent = Math.min(100, Math.round((accountedTokens / safeTotal) * 100));

  return {
    totalTokens,
    accountedTokens,
    coveragePercent,
    categories,
  };
}
