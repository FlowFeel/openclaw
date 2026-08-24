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
import { projectCertifiedToolArity } from "../../infra/shannon-weaver/tool-arity-projector.js";
import type { ArityTier } from "../../infra/shannon-weaver/types.js";
import type { AnyAgentTool } from "./common.js";

export type ToolCapabilityDescriptor = {
  readonly name: string;
  readonly label?: string;
  readonly description: string;
  readonly parameters: Record<string, unknown>;
  readonly isSandboxed: boolean;
  readonly timeoutMs: number;
  readonly requiredClientCaps?: readonly string[];
  readonly arity?: number;
  readonly tier?: ArityTier;
  readonly navigationHint?: string;
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

export type CapabilityProjectionMode = "summary" | "detail" | "compact";

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
  readonly mode?: CapabilityProjectionMode;
  readonly filterTools?: readonly string[];
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
  const mode = input.mode ?? "summary";
  const filterSet = input.filterTools && input.filterTools.length > 0 ? new Set(input.filterTools) : null;

  const activeToolList: ToolCapabilityDescriptor[] = [];
  const deniedToolList: DeniedToolDescriptor[] = [];

  for (const tool of input.tools) {
    if (filterSet && !filterSet.has(tool.name)) {
      continue;
    }

    const isSandboxed =
      isGlobalSandboxed ||
      tool.name === "write" ||
      tool.name === "edit" ||
      tool.name === "apply_patch";

    let params: Record<string, unknown> = {};
    const rawParams = (tool.parameters as Record<string, unknown>) ?? {};
    let arity: number | undefined;
    let tier: ArityTier | undefined;
    let navigationHint: string | undefined;

    const arityProj = projectCertifiedToolArity({
      name: tool.name,
      description: tool.description,
      parameters: rawParams,
    });
    arity = arityProj.arity;
    tier = arityProj.tier;
    navigationHint = arityProj.navigationHint;

    if (mode === "detail") {
      params = rawParams;
    } else if (mode === "compact") {
      params = {};
    } else {
      // "summary" mode: concise parameter keys without deep JSON Schema trees
      const propObj = (rawParams.properties as Record<string, unknown>) ?? {};
      const requiredList = Array.isArray(rawParams.required) ? rawParams.required : [];
      params = {
        type: rawParams.type ?? "object",
        keys: Object.keys(propObj),
        required: requiredList,
        slots: arityProj.parameterSlots,
      };
    }

    const description =
      mode === "summary" && tool.description && tool.description.length > 80
        ? tool.description.slice(0, 77) + "..."
        : (tool.description ?? "");

    activeToolList.push({
      name: tool.name,
      label: tool.label,
      description,
      parameters: params,
      isSandboxed,
      timeoutMs: defaultTimeoutMs,
      requiredClientCaps: tool.requiredClientCaps,
      arity,
      tier,
      navigationHint,
    });
  }

  // Check for denied tools if all registered tools are provided
  if (input.allRegisteredTools) {
    for (const tool of input.allRegisteredTools) {
      if (filterSet && !filterSet.has(tool.name)) {
        continue;
      }
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

