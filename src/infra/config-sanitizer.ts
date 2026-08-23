/**
 * Pure Config Secret Sanitizer — Zero-leakage redaction utility for telemetry and agent probes.
 *
 * Recursively inspects configuration trees and masks any values whose keys match
 * secret patterns (keys, tokens, passwords, secrets, credentials, webhooks).
 *
 * @dft
 * - A1 (pure-io-separation): zero runtime I/O; accepts any object tree, returns sanitized clone.
 * - Axiom P0.3 (zero-secret-leakage): all matching values are strictly replaced with "[REDACTED]".
 */

const SECRET_KEY_PATTERNS: readonly RegExp[] = [
  /key/i,
  /token/i,
  /secret/i,
  /password/i,
  /auth/i,
  /credential/i,
  /webhook/i,
  /private/i,
  /cert/i,
  /signature/i,
];

/**
 * Pure deep sanitizer ensuring no sensitive credentials leak into agent probe responses.
 */
export function sanitizeConfigForProbe<T>(input: T, seen = new WeakSet<object>()): T {
  if (input === null || typeof input !== "object") {
    return input;
  }

  // Guard against circular structures
  if (seen.has(input)) {
    return "[CIRCULAR]" as unknown as T;
  }
  seen.add(input);

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeConfigForProbe(item, seen)) as unknown as T;
  }

  const record = input as Record<string, unknown>;
  const output: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(record)) {
    const isSecretKey = SECRET_KEY_PATTERNS.some((pattern) => pattern.test(key));
    if (isSecretKey && typeof value === "string") {
      output[key] = value.length > 0 ? "[REDACTED]" : "";
    } else if (typeof value === "object" && value !== null) {
      output[key] = sanitizeConfigForProbe(value, seen);
    } else {
      output[key] = value;
    }
  }

  return output as T;
}
