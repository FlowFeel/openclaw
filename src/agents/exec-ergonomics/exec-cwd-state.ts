/**
 * Pure session CWD state transitions and resolution (Builtin chdir).
 * Implements the Perl/UNIX sticky working directory state without side-effecting filesystem I/O.
 */
import path from "node:path";

export interface SessionCwdState {
  readonly workspaceRoot: string;
  readonly activeCwd: string;
  readonly history: readonly string[];
}

export function createInitialSessionCwdState(workspaceRoot: string): SessionCwdState {
  const normalized = path.normalize(workspaceRoot);
  return {
    workspaceRoot: normalized,
    activeCwd: normalized,
    history: [normalized],
  };
}

export type CwdResolutionResult =
  | { kind: "inherited"; effectiveCwd: string }
  | { kind: "explicit"; effectiveCwd: string }
  | { kind: "mutated"; effectiveCwd: string; nextState: SessionCwdState };

/**
 * Detects whether a command is a pure directory transition (e.g. `cd src/infra` or `cd /path`).
 */
export function extractDirectChdirTarget(command: string): string | null {
  const trimmed = command.trim();
  // Match `cd <path>` without subshells or pipe chaining
  const match = /^cd\s+([^&|;]+)$/.exec(trimmed);
  if (!match) return null;
  const target = match[1].trim().replace(/^['"]|['"]$/g, "");
  return target || null;
}

/**
 * Purely resolves the effective working directory and any sticky state mutation.
 */
export function resolveEffectiveCwd(
  state: SessionCwdState,
  explicitWorkdir?: string,
  command?: string,
): CwdResolutionResult {
  // 1. If explicit workdir parameter is provided, it takes precedence
  if (explicitWorkdir && explicitWorkdir.trim().length > 0) {
    const resolved = path.isAbsolute(explicitWorkdir)
      ? path.normalize(explicitWorkdir)
      : path.normalize(path.join(state.activeCwd, explicitWorkdir));
    return { kind: "explicit", effectiveCwd: resolved };
  }

  // 2. If command is a direct `cd <target>`, compute state mutation
  if (command) {
    const cdTarget = extractDirectChdirTarget(command);
    if (cdTarget) {
      const nextCwd = path.isAbsolute(cdTarget)
        ? path.normalize(cdTarget)
        : path.normalize(path.join(state.activeCwd, cdTarget));

      const nextState: SessionCwdState = {
        workspaceRoot: state.workspaceRoot,
        activeCwd: nextCwd,
        history: [...state.history, nextCwd],
      };
      return { kind: "mutated", effectiveCwd: nextCwd, nextState };
    }
  }

  // 3. Otherwise inherit the active sticky CWD
  return { kind: "inherited", effectiveCwd: state.activeCwd };
}
