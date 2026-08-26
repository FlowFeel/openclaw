/**
 * Pure & Boundary Token Accounting: 4-Way Per-Source Transcript Breakdown.
 * Goldilocks decomposition unit (< 150 LOC).
 */

import fs from "node:fs";
import readline from "node:readline";

export interface TranscriptPerSourceBreakdown {
  readonly totalTokens: number;
  readonly systemPromptTokens: number;
  readonly historyTurnsTokens: number;
  readonly toolResultsTokens: number;
  readonly workspaceMemoryTokens: number;
  readonly turnCount: number;
}

/**
 * Pure function estimating token length from character content.
 */
export function estimateTextTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

/**
 * Categorizes a raw message object into one of the 4 standard mass buckets.
 */
export function categorizeMessageTokens(msg: {
  role?: string;
  content?: unknown;
}): {
  category: "system" | "history" | "tool" | "memory";
  tokens: number;
} {
  const role = msg.role ?? "user";
  let text = "";

  if (typeof msg.content === "string") {
    text = msg.content;
  } else if (Array.isArray(msg.content)) {
    text = msg.content
      .map((block) => (typeof block === "object" && block && "text" in block ? String(block.text) : JSON.stringify(block)))
      .join("\n");
  } else if (msg.content) {
    text = JSON.stringify(msg.content);
  }

  const tokens = estimateTextTokens(text);

  if (role === "system") {
    if (text.includes("Memory:") || text.includes("MEMORY.md") || text.includes("<memory>")) {
      return { category: "memory", tokens };
    }
    return { category: "system", tokens };
  }

  if (role === "tool" || text.includes("tool_call") || text.includes("tool_result")) {
    return { category: "tool", tokens };
  }

  return { category: "history", tokens };
}

/**
 * Reads a JSONL session transcript file on disk and calculates the exact 4-way per-source breakdown.
 */
export async function calculateTranscriptPerSourceBreakdown(
  transcriptPath: string,
): Promise<TranscriptPerSourceBreakdown> {
  if (!fs.existsSync(transcriptPath)) {
    return {
      totalTokens: 0,
      systemPromptTokens: 0,
      historyTurnsTokens: 0,
      toolResultsTokens: 0,
      workspaceMemoryTokens: 0,
      turnCount: 0,
    };
  }

  let systemPromptTokens = 0;
  let historyTurnsTokens = 0;
  let toolResultsTokens = 0;
  let workspaceMemoryTokens = 0;
  let turnCount = 0;

  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    try {
      const parsed = JSON.parse(trimmed);
      const msg = parsed.message ?? parsed;
      const { category, tokens } = categorizeMessageTokens(msg);

      turnCount++;
      switch (category) {
        case "system":
          systemPromptTokens += tokens;
          break;
        case "history":
          historyTurnsTokens += tokens;
          break;
        case "tool":
          toolResultsTokens += tokens;
          break;
        case "memory":
          workspaceMemoryTokens += tokens;
          break;
      }
    } catch {
      // Ignore corrupted line
    }
  }

  const totalTokens =
    systemPromptTokens + historyTurnsTokens + toolResultsTokens + workspaceMemoryTokens;

  return {
    totalTokens,
    systemPromptTokens,
    historyTurnsTokens,
    toolResultsTokens,
    workspaceMemoryTokens,
    turnCount,
  };
}
