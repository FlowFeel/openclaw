/**
 * Memory Audit Tracer — Pure markdown parser and byte budget inspector for bootstrap memory.
 *
 * Inspects `MEMORY.md` and daily memory files, parses headers and sections, tracks byte allocations,
 * and detects truncation when exceeding configured budget ceilings.
 *
 * @dft
 * - A1 (pure-io-separation): `parseAndAuditMemoryMarkdown` is a pure zero-I/O function.
 * - Axiom P2.1 (memory-budget-monotonicity): enforces B_max ceiling (default 8192 bytes).
 */

import fs from "node:fs";

export const DEFAULT_MEMORY_BUDGET_BYTES = 8192;

export type MemorySectionTrace = {
  readonly heading: string;
  readonly byteLength: number;
  readonly lineCount: number;
  readonly isTruncated: boolean;
};

export type MemoryAuditResult =
  | {
      readonly status: "healthy" | "truncated";
      readonly filePath: string;
      readonly totalBytes: number;
      readonly budgetBytes: number;
      readonly budgetUtilizationPercent: number;
      readonly sections: readonly MemorySectionTrace[];
      readonly truncatedBytes?: number;
      readonly warning?: string;
      readonly timestamp: number;
    }
  | {
      readonly status: "missing" | "empty" | "error";
      readonly filePath: string;
      readonly message: string;
    };

/**
 * Pure function parsing markdown into sections and auditing against a byte budget.
 */
export function parseAndAuditMemoryMarkdown(
  content: string,
  filePath: string = "MEMORY.md",
  budgetBytes: number = DEFAULT_MEMORY_BUDGET_BYTES,
  nowMs: number = Date.now(),
): MemoryAuditResult {
  const trimmed = content.trim();
  if (trimmed.length === 0) {
    return {
      status: "empty",
      filePath,
      message: `Memory file at ${filePath} is empty.`,
    };
  }

  const rawBytes = Buffer.byteLength(content, "utf8");
  const lines = content.split("\n");

  type RawSection = {
    heading: string;
    lines: string[];
  };

  const sections: RawSection[] = [];
  let currentSection: RawSection = { heading: "Overview", lines: [] };

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,6}\s+(.+)$/);
    if (headingMatch && headingMatch[1]) {
      if (currentSection.lines.length > 0 || currentSection.heading !== "Overview") {
        sections.push(currentSection);
      }
      currentSection = { heading: headingMatch[1].trim(), lines: [] };
    } else {
      currentSection.lines.push(line);
    }
  }
  if (currentSection.lines.length > 0 || sections.length === 0) {
    sections.push(currentSection);
  }

  // Calculate section metrics and enforce budget
  let accumulatedBytes = 0;
  let hasTruncation = rawBytes > budgetBytes;
  const sectionTraces: MemorySectionTrace[] = [];

  for (const sec of sections) {
    const secContent = sec.lines.join("\n");
    const secBytes = Buffer.byteLength(secContent, "utf8") + Buffer.byteLength(sec.heading, "utf8");
    const isTruncated = accumulatedBytes + secBytes > budgetBytes;

    sectionTraces.push({
      heading: sec.heading,
      byteLength: secBytes,
      lineCount: sec.lines.length,
      isTruncated,
    });

    accumulatedBytes += secBytes;
  }

  const utilizationPercent =
    Math.round((Math.min(rawBytes, budgetBytes) / budgetBytes) * 1000) / 10;

  if (hasTruncation) {
    const excessBytes = rawBytes - budgetBytes;
    return {
      status: "truncated",
      filePath,
      totalBytes: rawBytes,
      budgetBytes,
      budgetUtilizationPercent: 100.0,
      sections: sectionTraces,
      truncatedBytes: excessBytes,
      warning: `Memory file exceeds budget: ${rawBytes}B > ${budgetBytes}B limit (${excessBytes}B truncated)`,
      timestamp: nowMs,
    };
  }

  return {
    status: "healthy",
    filePath,
    totalBytes: rawBytes,
    budgetBytes,
    budgetUtilizationPercent: utilizationPercent,
    sections: sectionTraces,
    timestamp: nowMs,
  };
}

/**
 * Inspects a memory file on disk and returns its audit result.
 */
export function auditMemoryFile(
  filePath: string,
  budgetBytes: number = DEFAULT_MEMORY_BUDGET_BYTES,
  nowMs: number = Date.now(),
): MemoryAuditResult {
  if (!fs.existsSync(filePath)) {
    return {
      status: "missing",
      filePath,
      message: `Memory file not found at ${filePath}.`,
    };
  }

  try {
    const content = fs.readFileSync(filePath, "utf8");
    return parseAndAuditMemoryMarkdown(content, filePath, budgetBytes, nowMs);
  } catch (err) {
    return {
      status: "error",
      filePath,
      message: err instanceof Error ? err.message : String(err),
    };
  }
}
