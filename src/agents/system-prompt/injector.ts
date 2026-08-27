/**
 * Pure Multi-Layer Section Override Resolver & Normalizer.
 * Goldilocks decomposition unit (< 85 LOC).
 * 
 * @dft:axiom A1 (Pure Decision Core)
 * @dft:axiom A3 (Zero-Hardcoding Invariant)
 */

import type { SectionOverridesMap, SectionOverrideValue } from "./types.js";

export function normalizeSectionOverride(value: SectionOverrideValue): string[] | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (Array.isArray(value)) {
    const lines = value.flatMap((line) => String(line).split(/\r?\n/u));
    return lines.length > 0 ? lines : undefined;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed.split(/\r?\n/u) : undefined;
  }
  return undefined;
}

export function mergeSectionOverrides(
  configDefaults?: SectionOverridesMap,
  sessionOverrides?: SectionOverridesMap,
): SectionOverridesMap {
  return {
    ...(configDefaults ?? {}),
    ...(sessionOverrides ?? {}),
  };
}

export function resolveInjectedSectionLines(
  sectionId: string,
  overrides?: SectionOverridesMap,
  fallbackProvider?: () => string[],
): string[] {
  if (overrides && Object.prototype.hasOwnProperty.call(overrides, sectionId)) {
    const override = normalizeSectionOverride(overrides[sectionId]);
    return override ?? [];
  }
  return fallbackProvider ? fallbackProvider() : [];
}
