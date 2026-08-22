/**
 * Per-call timeout policy for agent tool calls.
 *
 * Pure logic — resolves the timeout for a single tool call from its parameters
 * and a policy config. No I/O, no time, no randomness. The wiring (creating
 * the AbortSignal, combining it with the parent signal) lives in the adapter
 * (`agent-tool-definition-adapter.ts`); this module only decides the value.
 *
 * Why this exists (OC core issue #2): the dispatcher passed the run-level
 * AbortSignal to `tool.execute` but never read a per-call `timeoutMs` from
 * the tool-call payload. A tool call specifying `timeoutMs: 5000` was
 * ignored. This module is the pure decision; the adapter applies it.
 *
 * @dft
 * - A1 (pure-io-separation): no I/O imports. Pure function.
 * - A2 (determinism): no Date.now/Math.random/process.env. Same inputs → same output.
 * - A4 (dft-docs): this file is documented.
 * - A6 (check-result): returns a ResolvedToolCallTimeout result struct, not a bare number.
 */

/**
 * Configuration for the per-call timeout policy.
 * All fields optional — defaults are applied in {@link resolveToolCallTimeoutMs}.
 */
export type ToolCallTimeoutPolicyConfig = {
  /** Minimum allowed timeout (ms). Calls below this are clamped up. Default: 1000. */
  readonly minTimeoutMs?: number;
  /** Maximum allowed timeout (ms). Calls above this are clamped down. Default: 300000 (5 min). */
  readonly maxTimeoutMs?: number;
  /** Default timeout (ms) when the tool call doesn't specify one. Default: undefined (no timeout). */
  readonly defaultTimeoutMs?: number;
};

/**
 * The resolved per-call timeout — a result struct (A6: check-result).
 * Carries its own proof: `source` explains where the value came from.
 */
export type ResolvedToolCallTimeout = {
  /** The resolved timeout in ms, or undefined if no per-call timeout applies. */
  readonly timeoutMs: number | undefined;
  /** Where the value came from — for traceability and metrics. */
  readonly source: "explicit" | "default" | "none";
};

/** Default bounds — exported for tests and documentation. */
export const DEFAULT_MIN_TIMEOUT_MS = 1_000;
export const DEFAULT_MAX_TIMEOUT_MS = 300_000; // 5 minutes

/**
 * Resolve the per-call timeout for a tool call from its parameters.
 *
 * Precedence:
 *   1. `params.timeoutMs` — explicit, from the tool-call payload (clamped to [min, max])
 *   2. `config.defaultTimeoutMs` — policy default (clamped to [min, max])
 *   3. `undefined` — no per-call timeout (the run-level signal governs)
 *
 * Non-finite, non-positive, or non-number values are treated as absent.
 *
 * @example
 *   resolveToolCallTimeoutMs({ timeoutMs: 5000 })        // → { timeoutMs: 5000, source: "explicit" }
 *   resolveToolCallTimeoutMs({ timeoutMs: 50 })           // → { timeoutMs: 1000, source: "explicit" } (clamped to min)
 *   resolveToolCallTimeoutMs({ timeoutMs: 999999 })       // → { timeoutMs: 300000, source: "explicit" } (clamped to max)
 *   resolveToolCallTimeoutMs({ timeoutMs: "bad" })        // → { timeoutMs: undefined, source: "none" }
 *   resolveToolCallTimeoutMs({}, { defaultTimeoutMs: 30000 }) // → { timeoutMs: 30000, source: "default" }
 *   resolveToolCallTimeoutMs({})                           // → { timeoutMs: undefined, source: "none" }
 */
export function resolveToolCallTimeoutMs(
  params: Record<string, unknown>,
  config?: ToolCallTimeoutPolicyConfig,
): ResolvedToolCallTimeout {
  const min = config?.minTimeoutMs ?? DEFAULT_MIN_TIMEOUT_MS;
  const max = config?.maxTimeoutMs ?? DEFAULT_MAX_TIMEOUT_MS;

  const raw = params?.timeoutMs;
  if (isPositiveFiniteNumber(raw)) {
    return { timeoutMs: clamp(Math.floor(raw), min, max), source: "explicit" };
  }

  const defaultMs = config?.defaultTimeoutMs;
  if (isPositiveFiniteNumber(defaultMs)) {
    return { timeoutMs: clamp(Math.floor(defaultMs), min, max), source: "default" };
  }

  return { timeoutMs: undefined, source: "none" };
}

/** True when value is a finite positive number (the only valid timeoutMs shape). */
function isPositiveFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

/** Clamp value to [min, max]. Pure — no side effects. */
function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
