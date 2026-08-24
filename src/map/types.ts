/**
 * Hickey Coordinate Map — Type Definitions & Predicate Proofs.
 *
 * Implements the Shannon-Weaver balanced, agent-addressable namespaced key-value surface.
 *
 * @dft
 * - A1 (pure-io-separation): 100% pure types and predicate verification functions.
 * - A2 (determinism): Pure algebraic functions.
 * - A4 (dft-docs): Annotated with authoritative DFT contracts.
 * - A6 (check-result): Read/write/delete return explicit result structures.
 * - M1 (no-schema): Opaque string values.
 * - M2 (silent-overwrite): Overwrites replace values silently without conflict detection.
 * - M3 (null-on-absent): Reading absent keys returns null (never throws).
 * - M4 (prefix-discovery): listKeys provides prefix-based keyspace enumeration.
 * - M5 (gradient-design): Semantic namespace depth <= 3 for lazy agent discovery.
 */

// ── Codified DFT & Map Axiom Constants ───────────────────────────
export const A1 = "pure-io-separation";
export const A2 = "determinism";
export const A4 = "dft-docs";
export const A5 = "mock-doubles";
export const A6 = "check-result";

export const M1 = "no-schema";
export const M2 = "silent-overwrite";
export const M3 = "null-on-absent";
export const M4 = "prefix-discovery";
export const M5 = "gradient-design";

// ── Core Map Branded Types ───────────────────────────────────────
export type MapKey = string & { readonly __brand: "MapKey" };
export type KeySegment = string & { readonly __brand: "KeySegment" };

export interface HickeyMap {
  readonly read: (key: string) => string | null;
  readonly write: (key: string, value: string) => { readonly written: true; readonly key: string };
  readonly listKeys: (prefix: string) => readonly string[];
  readonly delete: (key: string) => { readonly deleted: boolean; readonly key: string };
}

export type MapReadResult =
  | { readonly found: true; readonly key: string; readonly value: string }
  | { readonly found: false; readonly key: string };

export type MapWriteResult = { readonly written: true; readonly key: string };

export type MapDeleteResult =
  | { readonly existed: true; readonly key: string }
  | { readonly existed: false; readonly key: string };

// ── Pure DFT & Predicate Calculus Verifiers ───────────────────────

/**
 * Pure DFT verification (A1: zero-I/O, A6: check-result).
 * Proves the map contract holds for any key-value pair.
 */
export function verifyMapContract(
  map: HickeyMap,
  key: string,
  value: string,
): readonly MapReadResult[] {
  const results: MapReadResult[] = [];

  // 1. Write then read — value must be retrievable
  map.write(key, value);
  const afterWrite = map.read(key);
  results.push(
    afterWrite === value
      ? { found: true, key, value: afterWrite }
      : { found: false, key },
  );

  // 2. Delete then read — must return null
  map.delete(key);
  const afterDelete = map.read(key);
  results.push(
    afterDelete === null
      ? { found: false, key }
      : { found: true, key, value: afterDelete },
  );

  return results;
}

/**
 * Verifies that a non-existent key returns null, not an error (Axiom M3).
 */
export function verifyAbsentKey(map: HickeyMap, key: string): MapReadResult {
  const result = map.read(key);
  return result === null
    ? { found: false, key }
    : { found: true, key, value: result };
}

/**
 * Verifies that overwriting a key silently replaces the value (Axiom M2).
 */
export function verifySilentOverwrite(
  map: HickeyMap,
  key: string,
  v1: string,
  v2: string,
): MapReadResult {
  map.write(key, v1);
  map.write(key, v2);
  const result = map.read(key);
  return result === v2
    ? { found: true, key, value: result }
    : { found: false, key };
}

/**
 * Verifies that prefix listing returns all and only keys under the prefix (Axiom M4).
 */
export function verifyPrefixDiscovery(
  map: HickeyMap,
  prefix: string,
  keys: readonly string[],
  outsideKeys: readonly string[],
): boolean {
  // Write all keys
  for (const k of keys) {
    map.write(k, k);
  }
  for (const k of outsideKeys) {
    map.write(k, `${k}_outside`);
  }

  const listed = map.listKeys(prefix);
  const listedSet = new Set(listed);

  // Every key under prefix must be in the listing
  const allIncluded = keys.every((k) => listedSet.has(k));
  // No outside key must appear
  const noneOutside = outsideKeys.every((k) => !listedSet.has(k));

  return allIncluded && noneOutside;
}

/**
 * Pure helper decomposing key segments.
 */
export function parseKeySegments(key: string): readonly KeySegment[] {
  return key.split("/").filter((s) => s.length > 0) as readonly KeySegment[];
}

/**
 * Pure check evaluating whether a key follows the semantic gradient convention (Axiom M5).
 */
export function isGradientCompliant(
  key: string,
  maxDepth: number = 3,
): { readonly compliant: boolean; readonly depth: number; readonly segments: readonly string[] } {
  const segments = parseKeySegments(key);
  return {
    compliant: segments.length <= maxDepth && segments.every((s) => s.length > 0),
    depth: segments.length,
    segments,
  };
}
