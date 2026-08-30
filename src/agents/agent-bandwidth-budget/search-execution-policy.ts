/**
 * Pure search execution policy & efficiency analyzer.
 * Recommends ripgrep pattern queries and validates payload limits.
 */

export type SearchEfficiencyGrade = "optimal" | "suboptimal_linear_crawl" | "oversized_payload";

export interface ToolOperationDescriptor {
  readonly toolName: string;
  readonly commandText?: string;
  readonly filePath?: string;
  readonly responseBytes: number;
}

export interface SearchPolicyAssessment {
  readonly efficiency: SearchEfficiencyGrade;
  readonly advisoryComment?: string;
  readonly clampedPayload?: string;
}

const DEFAULT_MAX_FILE_BYTES = 16384;

/**
 * Assesses whether a tool operation adheres to high-density search discipline.
 */
export function assessSearchOperation(
  op: ToolOperationDescriptor,
  maxFileBytes = DEFAULT_MAX_FILE_BYTES,
): SearchPolicyAssessment {
  // Check for oversized single-file ingestion
  if (op.responseBytes > maxFileBytes) {
    return {
      efficiency: "oversized_payload",
      advisoryComment: `[SEARCH POLICY: Response payload (${op.responseBytes}B) exceeds recommended recon limit (${maxFileBytes}B). Use targeted line ranges or grep.]`,
    };
  }

  // Detect suboptimal directory crawling patterns (e.g. ls / find without pattern filter)
  if (op.toolName === "exec" && op.commandText) {
    const cmd = op.commandText.trim();
    if (/^(ls|find\s+\S+\s*$|tree)/i.test(cmd)) {
      return {
        efficiency: "suboptimal_linear_crawl",
        advisoryComment: `[SEARCH POLICY: Unfiltered directory listing detected. Use 'grep -rn \"pattern\" <dir>' for single-turn resolution.]`,
      };
    }
  }

  return {
    efficiency: "optimal",
  };
}

/**
 * Purely clamps an oversized payload to the configured maximum bytes.
 */
export function clampPayloadBytes(
  rawContent: string,
  maxBytes = DEFAULT_MAX_FILE_BYTES,
): string {
  const byteLength = Buffer.byteLength(rawContent, "utf8");
  if (byteLength <= maxBytes) {
    return rawContent;
  }

  const truncatedBuffer = Buffer.from(rawContent, "utf8").subarray(0, maxBytes);
  return `${truncatedBuffer.toString("utf8")}\n\n[TRUNCATED: Exceeded ${maxBytes}B limit]`;
}
