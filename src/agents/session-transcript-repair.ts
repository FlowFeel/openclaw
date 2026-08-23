/**
 * Barrel entrypoint for session-transcript-repair logic.
 * Decoupled into pure sub-modules under session-transcript-repair/ directory.
 */

export {
  validateTurnInvariants,
  isUnrecoverableEnvironmentError,
  type TurnValidationResult,
} from "./session-transcript-repair/validate.js";

export {
  repairToolUseResultPairing,
  repairOrphanToolCalls,
} from "./session-transcript-repair/repair.js";

export {
  sanitizeToolCallInputs,
  sanitizeToolUseResultPairing,
} from "./session-transcript-repair/sanitize.js";

export {
  stripToolResultDetails,
  makeMissingToolResult,
  type ToolCallInputRepairOptions,
  type ToolCallInputRepairReport,
  type ToolUseResultPairingOptions,
  type ToolUseRepairReport,
} from "./session-transcript-repair/utils.js";
