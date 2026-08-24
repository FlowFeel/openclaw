/**
 * @dft:axiom A1, A2
 * Pure Retransmission Segment Slicer
 */

import { DEFAULT_RETRANSMIT_BUDGET_TOKENS } from "./types.js";
import { estimateTokens } from "./snr-calculator.js";

export interface RetransmitResult {
  found: boolean;
  query: string;
  segment: string;
  tokens: number;
  truncated: boolean;
}

export function sliceArchivedSegment(
  archiveText: string,
  query: string,
  maxTokens: number = DEFAULT_RETRANSMIT_BUDGET_TOKENS
): RetransmitResult {
  if (!archiveText || !query) {
    return { found: false, query, segment: "", tokens: 0, truncated: false };
  }

  const queryLower = query.toLowerCase();
  const paragraphs = archiveText.split(/\n\n+/);
  const matchedParagraphs: string[] = [];

  for (const p of paragraphs) {
    if (p.toLowerCase().includes(queryLower)) {
      matchedParagraphs.push(p.trim());
    }
  }

  if (matchedParagraphs.length === 0) {
    return { found: false, query, segment: "", tokens: 0, truncated: false };
  }

  let combined = matchedParagraphs.join("\n\n");
  let tokens = estimateTokens(combined);
  let truncated = false;

  if (tokens > maxTokens) {
    // Truncate cleanly on character boundary
    const maxChars = maxTokens * 4;
    combined = combined.slice(0, maxChars) + "\n...[truncated to retransmission budget]";
    tokens = estimateTokens(combined);
    truncated = true;
  }

  return {
    found: true,
    query,
    segment: combined,
    tokens,
    truncated,
  };
}
