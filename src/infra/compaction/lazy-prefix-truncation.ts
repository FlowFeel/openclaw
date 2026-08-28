/**
 * Lazy Prefix Truncation Projection φ(v, k).
 * Pure stateless string & JSON valuespace projection at store boundary.
 *
 * @dft
 * - A1 (pure-io-separation): Pure transformation functions with zero I/O.
 * - A2 (determinism): Pure string/object projection.
 * - A4 (goldilocks): < 60 LOC.
 */

export const DEFAULT_PREFIX_BUDGET_BYTES = 120;
export const TRUNCATION_ELLIPSIS = "…";

/**
 * Pure projection function φ(v, k):
 * Truncates string values to k bytes while leaving primitives/keys intact.
 */
export function lazyPrefixTruncate<T>(val: T, limitBytes: number = DEFAULT_PREFIX_BUDGET_BYTES): T {
  if (typeof val === "string") {
    if (val.length <= limitBytes) {
      return val;
    }
    return (val.slice(0, limitBytes) + TRUNCATION_ELLIPSIS) as unknown as T;
  }

  if (val === null || typeof val !== "object") {
    return val;
  }

  if (Array.isArray(val)) {
    return val.map((item) => lazyPrefixTruncate(item, limitBytes)) as unknown as T;
  }

  const record = val as Record<string, unknown>;
  const projected: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    projected[key] = lazyPrefixTruncate(value, limitBytes);
  }
  return projected as T;
}
