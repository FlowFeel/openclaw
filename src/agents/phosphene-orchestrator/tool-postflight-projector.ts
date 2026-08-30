/**
 * Pure postflight projector for Phosphene Tool Orchestrator.
 * Decorates tool outputs with `$?`, `$!`, `_fuel`, `_bandwidth`, and ambient advisories.
 */

import {
  projectExecOutput,
  type ExecCaptureMode,
} from "../exec-ergonomics/exec-capture-projector.js";
import { createExecStatusMetadata } from "../exec-ergonomics/exec-register-envelope.js";
import {
  accumulateFuelSpend,
  formatFuelGaugeSnapshot,
} from "../agent-self-scoping/agent-fuel-gauge.js";
import { recordToolTurn } from "../agent-bandwidth-budget/tool-budget-controller.js";
import { assessSearchOperation } from "../agent-bandwidth-budget/search-execution-policy.js";
import { generateBandwidthAdvisory } from "../agent-bandwidth-budget/bandwidth-advisory-generator.js";
import { recordToolSample } from "../agent-self-scoping/entropy-velocity-sensor.js";
import type { CompositeOrchestratorState } from "./orchestrator-state.js";
import type {
  OrchestratedToolEnvelope,
  PhospheneOrchestratorConfig,
  RawToolExecutionResult,
  ToolInvocationContext,
} from "./orchestrator-types.js";

export interface PostflightResult {
  readonly envelope: OrchestratedToolEnvelope;
  readonly nextState: CompositeOrchestratorState;
}

/**
 * Purely processes raw tool output into a fully decorated Phosphene envelope.
 */
export function projectToolPostflight(
  state: CompositeOrchestratorState,
  ctx: ToolInvocationContext,
  raw: RawToolExecutionResult,
  config: PhospheneOrchestratorConfig,
): PostflightResult {
  const exitCode = raw.exitCode ?? 0;
  const rawOutput = raw.stdout ?? raw.stderr ?? "";
  const payloadBytes = Buffer.byteLength(rawOutput, "utf8");

  // 1. Context-sensitive capture mode projection
  const captureMode: ExecCaptureMode = (ctx.customCaptureMode ?? config.defaultCaptureMode ?? "full") as ExecCaptureMode;
  const projected = projectExecOutput(rawOutput, captureMode);

  // 2. Assess search efficiency and update turn budget
  const searchPolicy = assessSearchOperation(
    {
      toolName: ctx.toolName,
      commandText: ctx.commandText,
      filePath: ctx.targetPath,
      responseBytes: payloadBytes,
    },
    config.budget.maxFileIngestBytes,
  );

  const nextBudgetState = recordToolTurn(state.budgetState, payloadBytes, config.budget);

  // 3. Accumulate fuel spend
  const nextFuelState = accumulateFuelSpend(state.fuelState, {
    elapsedMs: raw.durationMs,
    responseBytes: payloadBytes,
  });

  // 4. Update sliding entropy velocity sensor
  const nextEntropyState = recordToolSample(state.entropyState, {
    tool: ctx.toolName,
    target: ctx.commandText ?? ctx.targetPath,
    isError: exitCode !== 0 || Boolean(raw.isError),
    outputSignature: rawOutput.slice(0, 40),
  });

  // 5. Generate ambient advisories if thresholds are reached
  const advisoryPrompt = generateBandwidthAdvisory(nextBudgetState, config.budget);

  // 6. Format status and registers
  const statusMeta = createExecStatusMetadata({
    exitCode,
    durationMs: raw.durationMs,
    tool: ctx.toolName,
    errorCode: exitCode !== 0 ? `ERR_${exitCode}` : undefined,
    errorMessage: raw.stderr || (exitCode !== 0 ? "Tool exited with non-zero status" : undefined),
  });

  // 7. Compose unified immutable return envelope
  const envelope: OrchestratedToolEnvelope = Object.freeze({
    output: projected.stdout,
    exitCode,
    "$?": exitCode,
    "$!": raw.stderr || null,
    _status: statusMeta,
    _fuel: formatFuelGaugeSnapshot(nextFuelState),
    _bandwidth: Object.freeze({
      turns_used: nextBudgetState.turnsUsed,
      turns_remaining: nextBudgetState.turnsRemaining,
      recon_budget: nextBudgetState.reconBudgetStatus,
      bytes_ingested: nextBudgetState.bytesIngested,
      search_efficiency: searchPolicy.efficiency,
    }),
    advisoryPrompt,
  });

  const nextState: CompositeOrchestratorState = Object.freeze({
    ...state,
    fuelState: nextFuelState,
    budgetState: nextBudgetState,
    entropyState: nextEntropyState,
  });

  return Object.freeze({
    envelope,
    nextState,
  });
}
