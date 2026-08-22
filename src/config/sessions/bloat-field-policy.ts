/**
 * Bloat field policy — decides which session-entry fields are "bloat" and
 * strips them to prevent re-injection after compaction.
 *
 * Pure logic — no I/O, no time, no randomness. The wiring (applying this at
 * the compaction checkpoint) lives in session-accessor.sqlite-checkpoint.ts;
 * this module only decides what to strip.
 *
 * Why this exists (OC core issue #1): after compaction, OC carried
 * `systemPromptReport`, `skillsSnapshot`, and `compactionCheckpoints` from the
 * pre-compaction entry into the post-compaction entry (via an object spread).
 * These fields were then rebuilt on the next turn, but the stale copies sat in
 * the session context — ~15,000 tokens/turn of dead metadata. A plugin could
 * strip them post-compaction, but OC re-added them every turn. This module is
 * the pure decision; the checkpoint applies it so the fields never carry over.
 *
 * @dft
 * - A1 (pure-io-separation): no I/O imports. Pure function.
 * - A2 (determinism): no Date.now/Math.random/process.env. Same inputs → same output.
 * - A4 (dft-docs): this file is documented.
 * - A6 (check-result): returns a StripResult struct carrying what was stripped.
 */

/**
 * The canonical bloat fields — session-entry metadata that is rebuilt every
 * turn and must not carry over from a pre-compaction entry to a post-compaction
 * one. Stripping them prevents the ~15K token/turn re-injection.
 */
export const BLOAT_FIELDS = [
  "systemPromptReport",
  "skillsSnapshot",
  "compactionCheckpoints",
] as const;

/** A single bloat field name. */
export type BloatField = (typeof BLOAT_FIELDS)[number];

/**
 * Options for {@link stripBloatFields}.
 */
export type StripBloatFieldsOptions = {
  /**
   * When true, strip all bloat fields regardless of whether they are present.
   * When false (default), strip only the fields that are actually present.
   * `force: true` is useful when the caller wants a guaranteed-clean entry.
   */
  readonly force?: boolean;
};

/**
 * The result of stripping bloat fields — a result struct (A6: check-result).
 * Carries its own proof: `strippedFields` lists exactly what was removed.
 */
export type StripResult<T extends Record<string, unknown>> = {
  /** The entry with bloat fields removed. A new object; the input is not mutated. */
  readonly entry: T;
  /** The bloat fields that were actually present and stripped, in canonical order. */
  readonly strippedFields: readonly BloatField[];
  /** True when at least one bloat field was stripped. */
  readonly strippedAny: boolean;
};

/**
 * Strip bloat fields from a session entry, returning a new entry and a record
 * of what was removed. The input entry is not mutated (A1: pure).
 *
 * Only fields that are actually present (value is not `undefined`) are reported
 * in `strippedFields`, unless `options.force` is true.
 *
 * @example
 *   stripBloatFields({ systemPromptReport: {…}, skillsSnapshot: {…}, foo: 1 })
 *   // → { entry: { foo: 1 }, strippedFields: ["systemPromptReport", "skillsSnapshot"], strippedAny: true }
 *
 *   stripBloatFields({ foo: 1 })
 *   // → { entry: { foo: 1 }, strippedFields: [], strippedAny: false }
 *
 *   stripBloatFields({ systemPromptReport: undefined, foo: 1 })
 *   // → { entry: { foo: 1 }, strippedFields: [], strippedAny: false }  (undefined is not "present")
 */
export function stripBloatFields<T extends Record<string, unknown>>(
  entry: T,
  options?: StripBloatFieldsOptions,
): StripResult<T> {
  const force = options?.force === true;
  const strippedFields: BloatField[] = [];
  const seenFields = new Set<string>();

  // Build the new entry without mutating the input. Copy all non-bloat keys,
  // and record which bloat keys were present (for the proof).
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(entry)) {
    seenFields.add(key);
    if (isBloatField(key)) {
      const value = entry[key];
      if (force || value !== undefined) {
        strippedFields.push(key);
      }
      // Bloat fields are dropped — not copied to the result.
      continue;
    }
    result[key] = entry[key];
  }

  // When force is true, also report bloat fields that were absent from the
  // entry (not in Object.keys). They are canonical bloat fields by policy.
  if (force) {
    for (const field of BLOAT_FIELDS) {
      if (!seenFields.has(field)) {
        strippedFields.push(field);
      }
    }
  }

  return {
    entry: result as T,
    strippedFields,
    strippedAny: strippedFields.length > 0,
  };
}

/**
 * Check whether a key is one of the canonical bloat fields.
 * Pure — a simple set membership test.
 */
export function isBloatField(key: string): key is BloatField {
  return (BLOAT_FIELDS as readonly string[]).includes(key);
}

/**
 * List the bloat fields that are present (non-undefined) on an entry.
 * Pure — does not strip, just reports. Useful for diagnostics and metrics.
 */
export function presentBloatFields<T extends Record<string, unknown>>(
  entry: T,
): readonly BloatField[] {
  const present: BloatField[] = [];
  for (const field of BLOAT_FIELDS) {
    if (entry[field] !== undefined) {
      present.push(field);
    }
  }
  return present;
}
