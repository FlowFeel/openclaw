/**
 * Pure composite platform snapshot distiller.
 * Consolidates system_capabilities, session_status, context_health, and CWD state
 * into a single high-density payload to amortize the 16.8% introspection overhead.
 */

export interface PlatformSnapshotParams {
  readonly sessionId: string;
  readonly platform: string;
  readonly arch: string;
  readonly nodeVersion: string;
  readonly workspaceRoot: string;
  readonly activeCwd: string;
  readonly activeTopic?: string | null;
  readonly toolCount: number;
  readonly isSandbox: boolean;
  readonly contextTokenBudget?: {
    readonly usedTokens: number;
    readonly maxTokens: number;
  };
}

export interface PlatformSnapshot {
  readonly schemaVersion: "1.0.0";
  readonly timestamp: number;
  readonly session: {
    readonly id: string;
    readonly workspaceRoot: string;
    readonly activeCwd: string;
    readonly activeTopic: string | null;
  };
  readonly host: {
    readonly os: string;
    readonly arch: string;
    readonly node: string;
    readonly sandbox: boolean;
  };
  readonly tools: {
    readonly availableCount: number;
  };
  readonly contextHealth?: {
    readonly usedTokens: number;
    readonly maxTokens: number;
    readonly utilizationPercent: number;
  };
}

export function distillPlatformSnapshot(params: PlatformSnapshotParams): PlatformSnapshot {
  const contextHealth = params.contextTokenBudget
    ? {
        usedTokens: params.contextTokenBudget.usedTokens,
        maxTokens: params.contextTokenBudget.maxTokens,
        utilizationPercent:
          params.contextTokenBudget.maxTokens > 0
            ? Math.round((params.contextTokenBudget.usedTokens / params.contextTokenBudget.maxTokens) * 100)
            : 0,
      }
    : undefined;

  return Object.freeze({
    schemaVersion: "1.0.0",
    timestamp: Date.now(),
    session: {
      id: params.sessionId,
      workspaceRoot: params.workspaceRoot,
      activeCwd: params.activeCwd,
      activeTopic: params.activeTopic ?? null,
    },
    host: {
      os: params.platform,
      arch: params.arch,
      node: params.nodeVersion,
      sandbox: params.isSandbox,
    },
    tools: {
      availableCount: params.toolCount,
    },
    ...(contextHealth ? { contextHealth } : {}),
  });
}
