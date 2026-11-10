/**
 * command-loop-breaker.ts — Intra-Turn Command Loop Breaker & Repeat Penalty (CAP-EXEC-03)
 *
 * Enforces pure software containment against runaway model loops and identical recovery retries.
 * Detects repeated normalized commands within an active turn and applies spread penalties.
 *
 * @dft
 * - A1: Pure deterministic function logic & bounded state per session.
 * - A2: Zero I/O, mathematical rolling hash comparisons.
 */

export interface LoopGuardResult {
  readonly isLoop: boolean;
  readonly consecutiveCount: number;
  readonly penalty: number;
  readonly warning?: string;
  readonly hint?: string;
}

export interface InFlightCommandRecord {
  readonly commandNormalized: string;
  readonly toolName: string;
  readonly timestamp: number;
}

const MAX_TRACKED_SESSIONS = 1_024;
const MAX_COMMANDS_PER_TURN = 64;

interface SessionLoopState {
  commands: InFlightCommandRecord[];
  totalPenalties: number;
  turnIndex: number;
}

const sessionStates = new Map<string, SessionLoopState>();

export function normalizeCommand(raw: string): string {
  if (!raw || typeof raw !== "string") return "";
  return raw
    .trim()
    .replace(/\s+/g, " ")
    .replace(/(^|\s)\.\//g, "$1"); // Normalize ./path to path
}

export function canonicalizeArguments(args: unknown): string {
  if (args === null || args === undefined) {
    return "";
  }
  if (typeof args !== "object") {
    return normalizeCommand(String(args));
  }
  if (Array.isArray(args)) {
    return "[" + args.map(canonicalizeArguments).join(",") + "]";
  }
  const obj = args as Record<string, unknown>;
  const keys = Object.keys(obj)
    .filter((k) => k !== "timestamp" && k !== "_ts" && k !== "clientRequestId" && k !== "toolCallId")
    .sort();
  const entries: string[] = [];
  for (const k of keys) {
    const val = obj[k];
    if (val === undefined) continue;
    entries.push(`${k}:${typeof val === "string" ? normalizeCommand(val) : canonicalizeArguments(val)}`);
  }
  return "{" + entries.join(",") + "}";
}

/**
 * Checks an incoming tool command against the active turn history.
 */
export function recordAndCheckCommandLoop(params: {
  sessionId?: string;
  toolName: string;
  commandRaw?: string;
  args?: unknown;
  turnIndex?: number;
}): LoopGuardResult {
  const sessionId = params.sessionId?.trim() || "default";
  let norm = "";
  if (params.args !== undefined && params.args !== null) {
    norm = canonicalizeArguments(params.args);
  } else {
    norm = normalizeCommand(params.commandRaw || "");
  }
  const currentTurn = params.turnIndex ?? 0;

  let state = sessionStates.get(sessionId);
  if (!state || state.turnIndex !== currentTurn) {
    state = {
      commands: [],
      totalPenalties: 0,
      turnIndex: currentTurn,
    };
    if (sessionStates.size >= MAX_TRACKED_SESSIONS && !sessionStates.has(sessionId)) {
      const oldest = sessionStates.keys().next().value;
      if (oldest) sessionStates.delete(oldest);
    }
    sessionStates.set(sessionId, state);
  }

  if (!norm) {
    return { isLoop: false, consecutiveCount: 0, penalty: 0 };
  }

  // Count occurrences of identical normalized command in current turn
  let matches = 0;
  for (const cmd of state.commands) {
    if (cmd.toolName === params.toolName && cmd.commandNormalized === norm) {
      matches++;
    }
  }

  // Append current command to history
  state.commands.push({
    commandNormalized: norm,
    toolName: params.toolName,
    timestamp: Date.now(),
  });
  if (state.commands.length > MAX_COMMANDS_PER_TURN) {
    state.commands.shift();
  }

  if (matches >= 1) {
    const consecutiveCount = matches + 1;
    const penalty = 5 * (consecutiveCount - 1);
    state.totalPenalties += penalty;

    return {
      isLoop: true,
      consecutiveCount,
      penalty,
      warning: "duplicate_command_detected",
      hint: "Identical command executed in this turn. Vary parameters/path or synthesize findings directly.",
    };
  }

  return {
    isLoop: false,
    consecutiveCount: 1,
    penalty: 0,
  };
}

/**
 * Returns total loop penalties accumulated in current turn.
 */
export function getSessionLoopPenalties(sessionId?: string): number {
  if (!sessionId) return 0;
  return sessionStates.get(sessionId.trim())?.totalPenalties ?? 0;
}

/**
 * Explicitly clears or resets session loop state.
 */
export function resetSessionLoopGuard(sessionId?: string): void {
  if (!sessionId) return;
  sessionStates.delete(sessionId.trim());
}

/**
 * Test helper to clear all states.
 */
export function clearAllLoopGuardsForTest(): void {
  sessionStates.clear();
}
