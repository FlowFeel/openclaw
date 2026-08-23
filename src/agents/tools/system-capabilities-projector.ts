/**
 * Pure System Capabilities Projector — Zero-I/O capability projector & policy hasher.
 *
 * Introspects active tool inventory, argument parameters, sandbox policies, and client capability
 * gates to produce a deterministic capability snapshot with a stable SHA-256 checksum.
 *
 * @dft
 * - A1 (pure-io-separation): zero runtime I/O; accepts tool list and config, returns capability struct.
 * - Axiom P1.3 (capability-completeness): accurately projects visible vs denied tools.
 * - Axiom P1.4 (deterministic-policy-checksum): stable SHA-256 across sorted descriptors.
 */

import { createHash } from "node:crypto";
import type { AnyAgentTool } from "./common.js";

export type ToolCapabilityDescriptor = {
  readonly name: string;
  readonly label?: string;
  readonly description: string;
  readonly parameters: Record<string, unknown>;
  readonly isSandboxed: boolean;
  readonly timeoutMs: number;
  readonly requiredClientCaps?: readonly string[];
};

export type DeniedToolDescriptor = {
  readonly name: string;
  readonly reason: string;
};

export type SystemCapabilitiesResult = {
  readonly gatewayVersion: string;
  readonly modelProvider: string;
  readonly modelId: string;
  readonly contextWindowTokens?: number;
  readonly clientCapabilities: readonly string[];
  readonly tools: readonly ToolCapabilityDescriptor[];
  readonly deniedTools: readonly DeniedToolDescriptor[];
  readonly policyChecksum: string;
  readonly timestamp: number;
};

export type ProjectCapabilitiesInput = {
  readonly tools: readonly AnyAgentTool[];
  readonly allRegisteredTools?: readonly AnyAgentTool[];
  readonly clientCaps?: readonly string[];
  readonly gatewayVersion?: string;
  readonly modelProvider?: string;
  readonly modelId?: string;
  readonly contextWindowTokens?: number;
  readonly sandboxed?: boolean;
  readonly defaultTimeoutMs?: number;
  readonly nowMs?: number;
};

/**
 * Pure policy checksum calculator over sorted tool capability definitions.
 */
export function calculatePolicyChecksum(
  tools: readonly ToolCapabilityDescriptor[],
  clientCaps: readonly string[] = [],
): string {
  const sortedTools = [...tools].sort((a, b) => a.name.localeCompare(b.name));
  const sortedCaps = [...clientCaps].sort();

  const payload = {
    caps: sortedCaps,
    tools: sortedTools.map((t) => ({
      name: t.name,
      sandboxed: t.isSandboxed,
      timeout: t.timeoutMs,
      params: t.parameters,
    })),
  };

  const hash = createHash("sha256");
  hash.update(JSON.stringify(payload));
  return hash.digest("hex");
}

/**
 * Pure projector transforming active tools and runtime policies into structured capability results.
 */
export function projectSystemCapabilities(input: ProjectCapabilitiesInput): SystemCapabilitiesResult {
  const clientCaps = input.clientCaps ?? [];
  const clientCapSet = new Set(clientCaps);
  const nowMs = input.nowMs ?? Date.now();
  const defaultTimeoutMs = input.defaultTimeoutMs ?? 30_000;
  const isGlobalSandboxed = Boolean(input.sandboxed);

  const activeToolList: ToolCapabilityDescriptor[] = [];
  const deniedToolList: DeniedToolDescriptor[] = [];

  for (const tool of input.tools) {
    const isSandboxed =
      isGlobalSandboxed ||
      tool.name === "write" ||
      tool.name === "edit" ||
      tool.name === "apply_patch";

    activeToolList.push({
      name: tool.name,
      label: tool.label,
      description: tool.description ?? "",
      parameters: (tool.parameters as Record<string, unknown>) ?? {},
      isSandboxed,
      timeoutMs: defaultTimeoutMs,
      requiredClientCaps: tool.requiredClientCaps,
    });
  }

  // Check for denied tools if all registered tools are provided
  if (input.allRegisteredTools) {
    for (const tool of input.allRegisteredTools) {
      if (tool.requiredClientCaps && tool.requiredClientCaps.length > 0) {
        const missing = tool.requiredClientCaps.filter((cap) => !clientCapSet.has(cap));
        if (missing.length > 0) {
          deniedToolList.push({
            name: tool.name,
            reason: `missing_client_cap: ${missing.join(", ")}`,
          });
        }
      }
    }
  }

  const policyChecksum = calculatePolicyChecksum(activeToolList, clientCaps);

  return {
    gatewayVersion: input.gatewayVersion ?? "1.0.0",
    modelProvider: input.modelProvider ?? "unknown",
    modelId: input.modelId ?? "unknown",
    contextWindowTokens: input.contextWindowTokens,
    clientCapabilities: clientCaps,
    tools: activeToolList,
    deniedTools: deniedToolList,
    policyChecksum,
    timestamp: nowMs,
  };
}
