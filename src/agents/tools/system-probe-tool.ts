/**
 * Agent-facing System Probe Tool.
 *
 * Exposes runtime health, heap pressure, disk metrics, event loop latency, and sanitized
 * configuration to the agent as a typed discriminated union.
 */

import { Type } from "typebox";
import {
  collectSystemProbeSnapshot,
  type LiveProbeServiceDeps,
  type SystemProbeResult,
} from "../../infra/system-probe-service.js";
import { type AnyAgentTool, jsonResult } from "./common.js";

export const SystemProbeToolSchema = Type.Object({}, { additionalProperties: false });

export type CreateSystemProbeToolOptions = LiveProbeServiceDeps;

export function createSystemProbeTool(options: CreateSystemProbeToolOptions = {}): AnyAgentTool {
  return {
    name: "system_probe",
    label: "System Probe",
    description:
      "Query live gateway runtime health, heap utilization, root disk space, event loop latency, and sanitized configuration. Returns a discriminated union ({ kind: 'healthy' } | { kind: 'degraded', reason } | { kind: 'error' }).",
    parameters: SystemProbeToolSchema,
    execute: async (_toolCallId: string, _params: unknown): Promise<ReturnType<typeof jsonResult<SystemProbeResult>>> => {
      const snapshot = await collectSystemProbeSnapshot(options);
      return jsonResult(snapshot);
    },
  };
}
