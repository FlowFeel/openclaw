/**
 * Parameterized Sandwich Partitioner — Dynamic (k_entry, k_exit) Document Slicing.
 *
 * Slices Markdown documents into Entry, Body, and Exit zones parameterized by dynamic
 * numerical budgets (k_entry, k_exit), preventing severance of open code blocks.
 *
 * @dft
 * - Pure function (A1): No I/O, deterministic line accumulation.
 */

import { extractFrontmatter } from "./deterministic-frontmatter.js";
import type { ParameterizedDocumentZones } from "./types.js";

export type SandwichBudgets = {
  readonly entryBudget?: number;        // Dynamic k_entry (default: 40)
  readonly exitBudget?: number;         // Dynamic k_exit (default: 40)
  readonly minSplitThreshold?: number; // Minimum lines to split (default: 2 * max(entry, exit))
};

/**
 * Pure function partitioning a document into Entry, Body, and Exit zones.
 */
export function partitionSandwich(
  content: string,
  budgets: SandwichBudgets = {},
): ParameterizedDocumentZones {
  const kEntry = budgets.entryBudget ?? 40;
  const kExit = budgets.exitBudget ?? 40;
  const minThreshold = budgets.minSplitThreshold ?? Math.max(kEntry, kExit) * 2;

  const { frontmatter, body } = extractFrontmatter(content);
  const lines = body.split(/\r?\n/);
  const totalLines = lines.length;

  if (totalLines === 0 || body.trim().length === 0) {
    return {
      frontmatter,
      entryText: "",
      bodyText: "",
      exitText: "",
      totalLines: 0,
      entryLines: 0,
      exitLines: 0,
      entryBudget: kEntry,
      exitBudget: kExit,
      isAligned: true,
    };
  }

  // Short documents under minThreshold: entire document serves as entry & exit
  if (totalLines <= minThreshold) {
    return {
      frontmatter,
      entryText: body.trim(),
      bodyText: "",
      exitText: body.trim(),
      totalLines,
      entryLines: totalLines,
      exitLines: totalLines,
      entryBudget: kEntry,
      exitBudget: kExit,
      isAligned: true,
    };
  }

  // Find fence-safe boundary for entry
  let entryEndIndex = Math.min(kEntry, totalLines);
  // If entryEndIndex cuts inside an odd number of triple backticks, extend to close fence
  let fenceCount = 0;
  for (let i = 0; i < entryEndIndex; i++) {
    if (lines[i]?.trim().startsWith("```")) {
      fenceCount++;
    }
  }
  if (fenceCount % 2 !== 0) {
    // Inside open fence, advance until fence is closed
    for (let i = entryEndIndex; i < totalLines; i++) {
      if (lines[i]?.trim().startsWith("```")) {
        entryEndIndex = i + 1;
        break;
      }
    }
  }

  // Find fence-safe boundary for exit
  let exitStartIndex = Math.max(0, totalLines - kExit);
  // Ensure exit doesn't start inside an open fence
  let prefixFenceCount = 0;
  for (let i = 0; i < exitStartIndex; i++) {
    if (lines[i]?.trim().startsWith("```")) {
      prefixFenceCount++;
    }
  }
  if (prefixFenceCount % 2 !== 0) {
    // Starts inside fence, advance to line after closing fence
    for (let i = exitStartIndex; i < totalLines; i++) {
      if (lines[i]?.trim().startsWith("```")) {
        exitStartIndex = i + 1;
        break;
      }
    }
  }

  // Ensure no overlap between entry and exit
  if (entryEndIndex >= exitStartIndex) {
    return {
      frontmatter,
      entryText: body.trim(),
      bodyText: "",
      exitText: body.trim(),
      totalLines,
      entryLines: totalLines,
      exitLines: totalLines,
      entryBudget: kEntry,
      exitBudget: kExit,
      isAligned: true,
    };
  }

  const entryLinesSlice = lines.slice(0, entryEndIndex);
  const bodyLinesSlice = lines.slice(entryEndIndex, exitStartIndex);
  const exitLinesSlice = lines.slice(exitStartIndex);

  const entryText = entryLinesSlice.join("\n").trim();
  const bodyText = bodyLinesSlice.join("\n").trim();
  const exitText = exitLinesSlice.join("\n").trim();

  return {
    frontmatter,
    entryText,
    bodyText,
    exitText,
    totalLines,
    entryLines: entryLinesSlice.length,
    exitLines: exitLinesSlice.length,
    entryBudget: kEntry,
    exitBudget: kExit,
    isAligned: entryLinesSlice.length <= kEntry * 1.5 && exitLinesSlice.length <= kExit * 1.5,
  };
}
