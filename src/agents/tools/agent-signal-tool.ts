/**
 * Agent-facing Telemetry & Operational Signal Tool.
 *
 * Allows agents to emit structured diagnostic signals, knowledge gaps, and operational warnings
 * into the non-blocking in-memory telemetry bus without interrupting turns.
 */

import { Type } from "typebox";
import {
  AgentSignalBus,
  defaultAgentSignalBus,
  type AgentSignalLevel,
} from "../../infra/agent-signal-bus.js";
import { type AnyAgentTool, jsonResult } from "./common.js";

export const AgentSignalToolSchema = Type.Object(
  {
    level: Type.Union([Type.Literal("info"), Type.Literal("warn"), Type.Literal("error")], {
      description: "Severity level of the diagnostic signal.",
    }),
    topic: Type.String({
      description: "Short categorical topic (e.g., 'knowledge_gap', 'perf_anomaly', 'policy_friction').",
    }),
    message: Type.String({
      description: "Human-readable diagnostic summary message.",
    }),
    payload: Type.Optional(
      Type.Unknown({
        description: "Optional arbitrary structured data relevant to the signal.",
      }),
    ),
  },
  { additionalProperties: false },
);

export type CreateAgentSignalToolOptions = {
  signalBus?: AgentSignalBus;
  sessionId?: string;
  getTurnIndex?: () => number;
};

export function createAgentSignalTool(options: CreateAgentSignalToolOptions = {}): AnyAgentTool {
  const bus = options.signalBus ?? defaultAgentSignalBus;

  return {
    name: "emit_agent_signal",
    label: "Emit Agent Signal",
    description:
      "Emit a non-blocking diagnostic signal, observation, or warning to operator telemetry. Useful for reporting knowledge gaps, performance anomalies, or sub-goal status.",
    parameters: AgentSignalToolSchema,
    execute: async (
      _toolCallId: string,
      params: unknown,
    ): Promise<
      ReturnType<
        typeof jsonResult<{
          status: "acknowledged";
          signalId: string;
          timestamp: number;
        }>
      >
    > => {
      const p = (params && typeof params === "object" ? params : {}) as {
        level?: AgentSignalLevel;
        topic?: string;
        message?: string;
        payload?: unknown;
      };

      const signal = bus.emit({
        level: p.level ?? "info",
        topic: p.topic ?? "general",
        message: p.message ?? "",
        payload: p.payload,
        sessionId: options.sessionId,
        turnIndex: options.getTurnIndex ? options.getTurnIndex() : undefined,
      });

      return jsonResult({
        status: "acknowledged",
        signalId: signal.id,
        timestamp: signal.timestamp,
      });
    },
  };
}
