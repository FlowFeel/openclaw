/**
 * Pure lossy summary projector for survey passes across search and exec results.
 * Distills voluminous outputs into high-density top highlights for fast recon.
 */

export interface SkimOptions {
  readonly maxHighlights?: number;
  readonly maxCharsPerHighlight?: number;
}

export interface SkimResult {
  readonly mode: "skim";
  readonly highlights: readonly string[];
  readonly totalLines: number;
  readonly totalBytes: number;
  readonly summaryText: string;
}

const DEFAULT_MAX_HIGHLIGHTS = 3;
const DEFAULT_MAX_CHARS = 100;

export function projectSkimResult(
  rawText: string,
  options: SkimOptions = {},
): SkimResult {
  const maxHighlights = options.maxHighlights ?? DEFAULT_MAX_HIGHLIGHTS;
  const maxChars = options.maxCharsPerHighlight ?? DEFAULT_MAX_CHARS;

  const totalBytes = Buffer.byteLength(rawText, "utf8");
  if (!rawText || rawText.trim().length === 0) {
    return {
      mode: "skim",
      highlights: [],
      totalLines: 0,
      totalBytes: 0,
      summaryText: "(no content to skim)",
    };
  }

  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const totalLines = lines.length;

  // Extract non-trivial salient lines (skipping basic braces, imports, comments if possible)
  const salient = lines.filter((l) => l.length > 5 && !/^[{}[\],;]+$/.test(l));
  const candidatePool = salient.length > 0 ? salient : lines;

  const highlights = candidatePool.slice(0, maxHighlights).map((line, idx) => {
    const trimmed = line.length > maxChars ? `${line.slice(0, maxChars)}...` : line;
    return `[#${idx + 1}] ${trimmed}`;
  });

  const summaryText = [
    `[SKIM SUMMARY: ${totalLines} lines / ${totalBytes}B total]`,
    ...highlights,
  ].join("\n");

  return Object.freeze({
    mode: "skim",
    highlights: Object.freeze(highlights),
    totalLines,
    totalBytes,
    summaryText,
  });
}
