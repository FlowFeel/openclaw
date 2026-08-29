/**
 * Formal Head+Tail Compaction Engine Projection ψ(v, k).
 * Pure stateless string & JSON valuespace projection at store boundary.
 *
 * @dft
 * - A1 (pure-io-separation): Pure transformation functions with zero I/O.
 * - A2 (determinism): Pure string/object projection.
 * - A4 (goldilocks): < 60 LOC.
 */

export const DEFAULT_PREFIX_BUDGET_BYTES = 120;
export const DEFAULT_HEAD_TAIL_BUDGET_BYTES = 120;

/**
 * Formal Head+Tail Projection Operator ψ(v, k):
 * - Returns v intact if |v| <= 2k.
 * - Slices head v[0:k] and tail v[|v|-k:|v|] with inline delta separator if |v| > 2k.
 */
export function psiHeadTailTruncate<T>(val: T, k: number = DEFAULT_HEAD_TAIL_BUDGET_BYTES): T {
  if (typeof val === "string") {
    const len = val.length;
    if (len <= 2 * k) {
      return val;
    }
    const head = val.slice(0, k);
    const tail = val.slice(len - k);
    const truncatedBytes = len - 2 * k;
    const delta = `\n... [truncated ${truncatedBytes} bytes] ...\n`;
    return (head + delta + tail) as unknown as T;
  }

  if (val === null || typeof val !== "object") {
    return val;
  }

  if (Array.isArray(val)) {
    return val.map((item) => psiHeadTailTruncate(item, k)) as unknown as T;
  }

  const record = val as Record<string, unknown>;
  const projected: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    projected[key] = psiHeadTailTruncate(value, k);
  }
  return projected as T;
}

/** Alias for backwards compatibility */
export const lazyPrefixTruncate = psiHeadTailTruncate;

