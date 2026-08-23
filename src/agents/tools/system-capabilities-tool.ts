/**
 * Agent-facing Dynamic Capability & Policy Discovery Tool.
 *
 * Exposes active tool inventory, argument schemas, security policies, and client capability
 * constraints to the agent as a structured result with a stable SHA-256 policy checksum.
 */

import { Type } from "typebox";
import { type AnyAgentTool, jsonResult } from "./common.js";
import {
  projectSystemCapabilities,
  type SystemCapabilitiesResult,
} from "./system-capabilities-projector.js";

export const SystemCapabilitiesToolSchema = Type.Object({}, { additionalProperties: false });

export type CreateSystemCapabilitiesToolOptions = {
  getTools?: () => readonly AnyAgentTool[];
  getAllRegisteredTools?: () => readonly AnyAgentTool[];
  clientCaps?: readonly string[];
  gatewayVersion?: string;
  modelProvider?: string;
  modelId?: string;
  contextWindowTokens?: number;
  sandboxed?: boolean;
  defaultTimeoutMs?: number;
};

export function createSystemCapabilitiesTool(
  options: CreateSystemCapabilitiesToolOptions = {},
): AnyAgentTool {
  return {
    name: "system_capabilities",
    label: "System Capabilities",
    description:
      "Discover the active tool capabilities, parameter schemas, timeout constraints, sandbox policies, denied tools, and deterministic policy checksum of the runtime.",
    parameters: SystemCapabilitiesToolSchema,
    execute: async (
      _toolCallId: string,
      _params: unknown,
    ): Promise<ReturnType<typeof jsonResult<SystemCapabilitiesResult>>> => {
      const activeTools = options.getTools ? options.getTools() : [];
      const allTools = options.getAllRegisteredTools
        ? options.getAllRegisteredTools()
        : activeTools;

      const projection = projectSystemCapabilities({
        tools: activeTools,
        allRegisteredTools: allTools,
        clientCaps: options.clientCaps,
        gatewayVersion: options.gatewayVersion ?? process.env.npm_package_version ?? "1.0.0",
        modelProvider: options.modelProvider ?? process.env.DEFAULT_LLM_PROVIDER ?? "unknown",
        modelId: options.modelId ?? process.env.DEFAULT_LLM_MODEL ?? "unknown",
        contextWindowTokens: options.contextWindowTokens,
        sandboxed: options.sandboxed,
        defaultTimeoutMs: options.defaultTimeoutMs,
      });

      return jsonResult(projection);
    },
  };
}
