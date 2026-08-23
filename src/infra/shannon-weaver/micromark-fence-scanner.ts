/**
 * Micromark Code Fence Scanner — Lightweight Syntax & Fence Token Extraction.
 *
 * Uses micromark core tokenization to isolate code blocks and tool payloads without
 * pulling in the heavy unified/remark ecosystem.
 *
 * @dft
 * - Pure function (A1): No I/O, linear time extraction.
 */

import type { CodeFenceBlock } from "./types.js";

/**
 * Extracts all code fence blocks (```lang ... ```) from a markdown document.
 */
export function extractCodeFences(content: string): CodeFenceBlock[] {
  if (!content || typeof content !== "string") {
    return [];
  }

  const lines = content.split(/\r?\n/);
  const blocks: CodeFenceBlock[] = [];

  let inFence = false;
  let currentLanguage = "";
  let currentCodeLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    const trimmed = line.trimStart();

    if (trimmed.startsWith("```")) {
      if (!inFence) {
        // Opening fence
        inFence = true;
        currentLanguage = trimmed.slice(3).trim();
        currentCodeLines = [];
      } else {
        // Closing fence
        inFence = false;
        blocks.push({
          language: currentLanguage,
          code: currentCodeLines.join("\n"),
          lineCount: currentCodeLines.length,
        });
        currentLanguage = "";
        currentCodeLines = [];
      }
    } else if (inFence) {
      currentCodeLines.push(line);
    }
  }

  return blocks;
}
