/**
 * Unified Domain Types & Schemas for Phosphene Tool Dispatch & Bandwidth Orchestrator.
 * Pure Immutable Data Contracts (Zero I/O).
 */

import type { SessionCwdState } from "../exec-ergonomics/exec-cwd-state.js";
import type { FuelSpendState } from "../agent-self-scoping/agent-fuel-gauge.js";
import type { ToolBudgetConfig, ToolBudgetState } from "../agent-bandwidth-budget/tool-budget-controller.js";
import type { EntropyVelocityState } from "../agent-self-scoping/entropy-velocity-sensor.js";
import type { BandwidthTelemetryEnvelope } from "../agent-bandwidth-budget/bandwidth-telemetry-envelope.js";
import type { ExecExecutionMetadata } from "../exec-ergonomics/exec-register-envelope.js";
import type { FuelGaugeSnapshot } from "../agent-self-scoping/agent-fuel-gauge.js";

export interface PhospheneOrchestratorConfig {
  readonly budget: ToolBudgetConfig;
  readonly defaultCaptureMode?: "full" | "exit" | "head" | "tail";
  readonly maxFlightCapacity?: number;
  readonly defaultWorkspacePath: string;
}

export interface ToolInvocationContext {
  readonly sessionId: string;
  readonly toolName: string;
  readonly commandText?: string;
  readonly targetPath?: string;
  readonly customCaptureMode?: "full" | "exit" | "head" | "tail";
}

export interface RawToolExecutionResult {
  readonly stdout?: string;
  readonly stderr?: string;
  readonly exitCode?: number;
  readonly durationMs: number;
  readonly isError?: boolean;
}

export interface OrchestratedToolEnvelope extends BandwidthTelemetryEnvelope {
  readonly output: string;
  readonly exitCode: number;
  readonly "$?": number;
  readonly "$!": string | null;
  readonly _status: ExecExecutionMetadata;
  readonly _fuel: FuelGaugeSnapshot;
  readonly advisoryPrompt?: string;
}
