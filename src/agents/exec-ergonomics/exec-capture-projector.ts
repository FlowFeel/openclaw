/**
 * Pure projection function psi(output, mode, options) for context-sensitive output capture.
 * Implements Perl's scalar-vs-list context semantics for exec return payloads.
 */

export type ExecCaptureMode = "full" | "exit" | "head" | "tail";

export interface ProjectorOptions {
  readonly maxHeadLines?: number;
  readonly maxTailLines?: number;
  readonly maxTotalChars?: number;
}

export interface ProjectedExecOutput {
  readonly mode: ExecCaptureMode;
  readonly stdout: string;
  readonly truncated: boolean;
  readonly totalLines: number;
  readonly totalBytes: number;
}

const DEFAULT_HEAD_LINES = 20;
const DEFAULT_TAIL_LINES = 20;
const DEFAULT_MAX_CHARS = 16_000;

/**
 * Pure projection of raw stdout/stderr according to the requested capture mode.
 */
export function projectExecOutput(
  rawOutput: string,
  mode: ExecCaptureMode = "full",
  options: ProjectorOptions = {},
): ProjectedExecOutput {
  const headLimit = options.maxHeadLines ?? DEFAULT_HEAD_LINES;
  const tailLimit = options.maxTailLines ?? DEFAULT_TAIL_LINES;
  const charLimit = options.maxTotalChars ?? DEFAULT_MAX_CHARS;

  const totalBytes = Buffer.byteLength(rawOutput, "utf8");
  if (!rawOutput) {
    return { mode, stdout: "", truncated: false, totalLines: 0, totalBytes: 0 };
  }

  const lines = rawOutput.split(/\r?\n/);
  const totalLines = lines.length;

  switch (mode) {
    case "exit": {
      return {
        mode: "exit",
        stdout: `(exit capture: ${totalLines} lines / ${totalBytes} bytes omitted)`,
        truncated: true,
        totalLines,
        totalBytes,
      };
    }

    case "head": {
      if (lines.length <= headLimit && rawOutput.length <= charLimit) {
        return { mode: "head", stdout: rawOutput, truncated: false, totalLines, totalBytes };
      }
      const sliced = lines.slice(0, headLimit).join("\n");
      const summary = `\n... [head capture: omitted ${lines.length - headLimit} lines / ${totalBytes} bytes total]`;
      return {
        mode: "head",
        stdout: sliced + summary,
        truncated: true,
        totalLines,
        totalBytes,
      };
    }

    case "tail": {
      if (lines.length <= tailLimit && rawOutput.length <= charLimit) {
        return { mode: "tail", stdout: rawOutput, truncated: false, totalLines, totalBytes };
      }
      const sliced = lines.slice(-tailLimit).join("\n");
      const summary = `[tail capture: omitted ${lines.length - tailLimit} preceding lines] ...\n`;
      return {
        mode: "tail",
        stdout: summary + sliced,
        truncated: true,
        totalLines,
        totalBytes,
      };
    }

    case "full":
    default: {
      if (rawOutput.length > charLimit) {
        const sliced = rawOutput.slice(0, charLimit);
        return {
          mode: "full",
          stdout: `${sliced}\n... [full capture truncated at ${charLimit} chars / ${totalBytes} bytes total]`,
          truncated: true,
          totalLines,
          totalBytes,
        };
      }
      return {
        mode: "full",
        stdout: rawOutput,
        truncated: false,
        totalLines,
        totalBytes,
      };
    }
  }
}
