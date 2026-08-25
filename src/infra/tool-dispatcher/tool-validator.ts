/**
 * Pure Tool Parameter Validator & Coercer.
 *
 * @dft
 * - A1 / A2: Zero I/O, deterministic parameter validation.
 */

import { normalizeToolPath } from "../path-normalizer/path-normalizer.js";
import type { ToolContractDefinition, ToolValidationResult } from "./types.js";

/**
 * Validates and coerces raw tool parameters against a certified tool contract.
 */
export function validateToolParameters(
  contract: ToolContractDefinition,
  rawParams: unknown,
): ToolValidationResult {
  const params =
    rawParams && typeof rawParams === "object" && !Array.isArray(rawParams)
      ? (rawParams as Record<string, unknown>)
      : {};

  const errors: string[] = [];
  const sanitizedParams: Record<string, unknown> = {};

  for (const schema of contract.parameters) {
    const rawVal = params[schema.name];

    // Check required constraint
    if (rawVal === undefined || rawVal === null || (typeof rawVal === "string" && rawVal.trim() === "")) {
      if (schema.required) {
        errors.push(`Missing required parameter '${schema.name}'`);
      }
      continue;
    }

    switch (schema.type) {
      case "string": {
        if (typeof rawVal !== "string" && typeof rawVal !== "number") {
          errors.push(`Parameter '${schema.name}' must be a string`);
        } else {
          sanitizedParams[schema.name] = String(rawVal).trim();
        }
        break;
      }
      case "number": {
        const num = typeof rawVal === "number" ? rawVal : Number(String(rawVal).trim());
        if (!Number.isFinite(num)) {
          errors.push(`Parameter '${schema.name}' must be a finite number`);
        } else {
          sanitizedParams[schema.name] = num;
        }
        break;
      }
      case "boolean": {
        if (typeof rawVal === "boolean") {
          sanitizedParams[schema.name] = rawVal;
        } else if (rawVal === "true" || rawVal === "1") {
          sanitizedParams[schema.name] = true;
        } else if (rawVal === "false" || rawVal === "0") {
          sanitizedParams[schema.name] = false;
        } else {
          errors.push(`Parameter '${schema.name}' must be a boolean`);
        }
        break;
      }
      case "path": {
        if (typeof rawVal !== "string") {
          errors.push(`Parameter '${schema.name}' must be a valid path string`);
        } else {
          const norm = normalizeToolPath(rawVal);
          if (!norm.isWithinWorkspace) {
            errors.push(`Parameter '${schema.name}' attempts workspace breakout`);
          } else {
            sanitizedParams[schema.name] = norm.normalized;
          }
        }
        break;
      }
      case "array": {
        if (!Array.isArray(rawVal)) {
          errors.push(`Parameter '${schema.name}' must be an array`);
        } else {
          sanitizedParams[schema.name] = rawVal;
        }
        break;
      }
    }
  }

  return {
    isValid: errors.length === 0,
    sanitizedParams: Object.freeze(sanitizedParams),
    errors: Object.freeze(errors),
  };
}
