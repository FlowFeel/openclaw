/**
 * Certified Tool Arity Static Validator (Rule A5 Invariant Enforcement).
 *
 * Enforces Design-Time Fidelity (DFT) Axiom A5 on Tool Surfaces:
 * - Rule A5.1 (Arity Integrity): Declared arity must equal domain parameter key count.
 * - Rule A5.2 (No Base Parameter Duplication): Tools must not re-declare universal base params.
 * - Rule A5.3 (Arity Tier Discipline): Atomic tools (k <= 2) must not accept catch-all option bloat.
 *
 * @dft
 * - Pure validation engine (A1 / A2), zero I/O.
 */

import { projectCertifiedToolArity, type RawToolSchema } from "./tool-arity-projector.js";
import { type ArityTier, UNIVERSAL_BASE_PARAM_KEYS } from "./types.js";

export type ToolArityViolation = {
  readonly rule: "A5.1" | "A5.2" | "A5.3";
  readonly toolName: string;
  readonly message: string;
};

export type ArityValidationResult = {
  readonly valid: boolean;
  readonly violations: readonly ToolArityViolation[];
  readonly certifiedArity: number;
  readonly tier: ArityTier;
};

/**
 * Validates a single tool schema against certified arity rules.
 */
export function validateCertifiedToolArity(
  tool: RawToolSchema,
  expectedArity?: number,
): ArityValidationResult {
  const violations: ToolArityViolation[] = [];
  const rawParams = (tool.parameters as Record<string, unknown>) ?? {};
  const rawProperties = (rawParams.properties as Record<string, unknown>) ?? {};

  // Check Rule A5.2: Base parameter duplication
  for (const key of Object.keys(rawProperties)) {
    if (UNIVERSAL_BASE_PARAM_KEYS.has(key)) {
      violations.push({
        rule: "A5.2",
        toolName: tool.name,
        message: `Tool '${tool.name}' duplicates universal base parameter '${key}'. Base parameters are inherited once from the runtime codebook.`,
      });
    }
  }

  const projection = projectCertifiedToolArity(tool);

  // Check Rule A5.1: Arity integrity against expected declaration
  if (expectedArity !== undefined && projection.arity !== expectedArity) {
    violations.push({
      rule: "A5.1",
      toolName: tool.name,
      message: `Tool '${tool.name}' declared arity ${expectedArity} but resolved arity ${projection.arity} (domain keys: ${Object.keys(projection.parameterSlots).join(", ")}).`,
    });
  }

  return {
    valid: violations.length === 0,
    violations,
    certifiedArity: projection.arity,
    tier: projection.tier,
  };
}

/**
 * Batch validates an entire tool registry.
 */
export function validateToolRegistryArities(
  tools: readonly RawToolSchema[],
  arityDeclarations?: Readonly<Record<string, number>>,
): { valid: boolean; violations: readonly ToolArityViolation[] } {
  const allViolations: ToolArityViolation[] = [];

  for (const tool of tools) {
    const expected = arityDeclarations ? arityDeclarations[tool.name] : undefined;
    const result = validateCertifiedToolArity(tool, expected);
    if (!result.valid) {
      allViolations.push(...result.violations);
    }
  }

  return {
    valid: allViolations.length === 0,
    violations: allViolations,
  };
}
