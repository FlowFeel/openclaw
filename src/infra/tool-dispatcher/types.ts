/**
 * Pure Types for the Tool Invocation Dispatcher Subsystem.
 *
 * @dft
 * - A1 / A2: Pure mathematical types, zero I/O, deterministic parameter validation and error classification.
 */

export type ToolExecutionStatus = "success" | "invalid_params" | "unauthorized" | "runtime_error";

export interface ToolParameterSchema {
  readonly name: string;
  readonly required?: boolean;
  readonly type: "string" | "number" | "boolean" | "path" | "array";
}

export interface ToolContractDefinition {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly parameters: readonly ToolParameterSchema[];
}

export interface ToolValidationResult {
  readonly isValid: boolean;
  readonly sanitizedParams: Record<string, unknown>;
  readonly errors: readonly string[];
}

export interface ToolExecutionReport {
  readonly toolId: string;
  readonly status: ToolExecutionStatus;
  readonly durationMs: number;
  readonly parameterErrors?: readonly string[];
  readonly errorMessage?: string;
}
