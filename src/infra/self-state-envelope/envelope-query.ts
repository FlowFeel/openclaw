/**
 * Pure Envelope Path Query Engine.
 * Evaluates dotted path expressions against a SelfStateEnvelope object.
 *
 * @dft
 * - A1 / A2: Zero I/O, deterministic path traversal.
 */

import type { SelfStateEnvelope } from "./types.js";

/**
 * Purely queries a field or subtree from a SelfStateEnvelope by path expression.
 */
export function queryEnvelopePath(
  envelope: SelfStateEnvelope,
  path: string,
): unknown {
  const cleanPath = path.trim();
  if (!cleanPath || cleanPath === "." || cleanPath === "envelope") {
    return envelope;
  }

  // Normalize aliases
  const normalized = cleanPath
    .replace(/^F1\.headroom$/i, "F1")
    .replace(/^F3\.route$/i, "F3.activeRoute")
    .replace(/^F4\.offloaded$/i, "F4.coldArchiveReferences")
    .replace(/\[(\-?\d+)\]/g, ".$1"); // convert array syntax [0] or [-1] to .0 or .-1

  const parts = normalized.split(".").filter((p) => p.length > 0);
  let current: any = envelope;

  for (let i = 0; i < parts.length; i++) {
    const key = parts[i]!;

    if (current === null || current === undefined) {
      return undefined;
    }

    // Handle negative array indexing (e.g. -1 for last element)
    if (Array.isArray(current) && key.startsWith("-")) {
      const negIdx = parseInt(key, 10);
      const posIdx = current.length + negIdx;
      current = current[posIdx];
      continue;
    }

    // Standard property access
    current = current[key];
  }

  return current;
}
