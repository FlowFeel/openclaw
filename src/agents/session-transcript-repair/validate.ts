export type TurnValidationResult =
  | { readonly valid: true; readonly pairedCount: number }
  | { readonly valid: false; readonly orphanCallIds: readonly string[]; readonly orphanResultIds: readonly string[] };

/**
 * Validates invariant pairing between tool invocations and results without disk or network I/O.
 */
export function validateTurnInvariants(
  toolCallIds: readonly string[],
  toolResultIds: readonly string[],
): TurnValidationResult {
  const callIdSet = new Set(toolCallIds);
  const resultIdSet = new Set(toolResultIds);

  const orphanCalls = toolCallIds.filter((id) => !resultIdSet.has(id));
  const orphanResults = toolResultIds.filter((id) => !callIdSet.has(id));

  if (orphanCalls.length === 0 && orphanResults.length === 0) {
    return { valid: true, pairedCount: toolCallIds.length };
  }

  return {
    valid: false,
    orphanCallIds: orphanCalls,
    orphanResultIds: orphanResults,
  };
}

/**
 * Checks if a tool error represents an unrecoverable environment fault
 * (e.g. missing binary or browser) that should immediately break execution loops.
 */
export function isUnrecoverableEnvironmentError(errorMessage: string): boolean {
  const lower = errorMessage.toLowerCase();
  return (
    lower.includes("no supported browser found") ||
    lower.includes("command not found") ||
    lower.includes("enoent") ||
    lower.includes("chromium absent") ||
    lower.includes("cannot find module")
  );
}
