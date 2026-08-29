/**
 * Pure metadata envelope generator for $? (exit code), $! (error classification), and execution duration.
 * Provides first-class special variable telemetry for agents.
 */

export interface ExecExecutionMetadata {
  readonly exitCode: number;
  readonly durationMs: number;
  readonly tool: string;
  readonly error?: {
    readonly code: string;
    readonly message: string;
    readonly fatal: boolean;
  };
}

export interface EnvelopedToolResult<T> {
  readonly result: T;
  readonly _status: ExecExecutionMetadata;
}

export function createExecStatusMetadata(params: {
  exitCode: number;
  durationMs: number;
  tool?: string;
  errorCode?: string;
  errorMessage?: string;
  fatal?: boolean;
}): ExecExecutionMetadata {
  const meta: ExecExecutionMetadata = {
    exitCode: params.exitCode,
    durationMs: Math.max(0, Math.round(params.durationMs)),
    tool: params.tool ?? "exec",
    ...(params.errorCode
      ? {
          error: {
            code: params.errorCode,
            message: params.errorMessage ?? "Command returned non-zero exit code",
            fatal: params.fatal ?? false,
          },
        }
      : {}),
  };
  return Object.freeze(meta);
}

export function wrapToolResultWithStatus<T>(
  result: T,
  meta: ExecExecutionMetadata,
): EnvelopedToolResult<T> {
  return {
    result,
    _status: meta,
  };
}
