/**
 * Pure Tool Arity Projection & Semantic Navigation Engine.
 *
 * Implements the Shannon-Weaver Certified Tool Arity Model:
 * 1. Factors universal base parameters into an amortized runtime codebook.
 * 2. Classifies arity into cognitive navigation tiers (atomic, operator, composite).
 * 3. Formats concise parameter slot maps, reducing token overhead from ~200 to ~50 tokens.
 * 4. Produces deterministic policy checksums and compact execution 4-tuples for telemetry.
 *
 * @dft
 * - A1 / A2: Pure mathematical calculation, zero I/O, deterministic.
 */

import { createHash } from "node:crypto";
import {
  type ArityTier,
  type CertifiedToolArityDescriptor,
  type CompactExecutionSignature,
  UNIVERSAL_BASE_PARAM_KEYS,
} from "./types.js";

export type RawToolSchema = {
  readonly name: string;
  readonly description?: string;
  readonly parameters?: Record<string, unknown>;
  readonly requiredClientCaps?: readonly string[];
};

/**
 * Classifies tool arity into semantic cognitive navigation tiers.
 */
export function classifyArityTier(arity: number): { tier: ArityTier; navigationHint: string } {
  if (arity <= 2) {
    return {
      tier: "atomic",
      navigationHint: "Single-action atomic tool. Pass primary argument directly.",
    };
  }
  if (arity <= 6) {
    return {
      tier: "operator",
      navigationHint: "Parameterized operator. Provide required operational slots.",
    };
  }
  return {
    tier: "composite",
    navigationHint: "Composite orchestrator. Scan for targeted parameter slots.",
  };
}

/**
 * Derives concise type-summary strings from JSON Schema property definitions.
 */
function deriveTypeSummary(propDef: unknown, isRequired: boolean): string {
  if (!propDef || typeof propDef !== "object") {
    return isRequired ? "any!" : "any?";
  }
  const rec = propDef as Record<string, unknown>;
  let baseType = typeof rec.type === "string" ? rec.type : "object";
  if (Array.isArray(rec.enum) && rec.enum.length > 0) {
    baseType = rec.enum.map((e) => JSON.stringify(e)).join("|");
  }
  return isRequired ? `${baseType}!` : `${baseType}?`;
}

/**
 * Pure calculation projecting a raw tool schema into a Certified Tool Arity Descriptor.
 */
export function projectCertifiedToolArity(
  tool: RawToolSchema,
  options: { readonly excludeBaseParams?: boolean } = {},
): CertifiedToolArityDescriptor {
  const excludeBase = options.excludeBaseParams ?? true;
  const rawParams = (tool.parameters as Record<string, unknown>) ?? {};
  const rawProperties = (rawParams.properties as Record<string, unknown>) ?? {};
  const rawRequired = Array.isArray(rawParams.required) ? (rawParams.required as string[]) : [];
  const requiredSet = new Set(rawRequired);

  // Filter domain properties vs base runtime parameters
  const domainKeys = Object.keys(rawProperties).filter(
    (key) => !excludeBase || !UNIVERSAL_BASE_PARAM_KEYS.has(key),
  );
  domainKeys.sort();

  const parameterSlots: Record<string, string> = {};
  const requiredSlots: string[] = [];

  for (const key of domainKeys) {
    const isReq = requiredSet.has(key);
    parameterSlots[key] = deriveTypeSummary(rawProperties[key], isReq);
    if (isReq) {
      requiredSlots.push(key);
    }
  }

  const arity = domainKeys.length;
  const { tier, navigationHint } = classifyArityTier(arity);

  // Deterministic SHA-256 Policy Checksum
  const hashPayload = {
    name: tool.name,
    arity,
    slots: parameterSlots,
    required: requiredSlots,
  };
  const hash = createHash("sha256");
  hash.update(JSON.stringify(hashPayload));
  const policyHash = hash.digest("hex").slice(0, 16);

  return {
    name: tool.name,
    arity,
    tier,
    navigationHint,
    parameterSlots,
    requiredSlots,
    policyHash,
  };
}

/**
 * Generates a compact 4-tuple tool execution signature for telemetry and ring buffers.
 * Sigma_exec = < tool_name, arity k, policy_hash, values >
 */
export function createCompactExecutionSignature(
  toolName: string,
  args: Record<string, unknown>,
  policyHash: string,
  nowMs: number = Date.now(),
): CompactExecutionSignature {
  const cleanArgs: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(args)) {
    if (!UNIVERSAL_BASE_PARAM_KEYS.has(k)) {
      cleanArgs[k] = v;
    }
  }
  const arity = Object.keys(cleanArgs).length;

  return {
    tool: toolName,
    arity,
    policyHash,
    args: cleanArgs,
    timestamp: nowMs,
  };
}
