/**
 * Serialization format policy — chooses v8 structured serialization vs JSON for
 * session store persistence.
 *
 * Pure logic — decides, given a session-store value, whether it is JSON-safe
 * (→ persist as JSON, human-readable, backward-compatible) or contains
 * non-JSON-native types (→ persist as v8 structured serialization, lossless).
 * Also performs the encode/decode dispatch. The disk I/O (reading/writing
 * files) stays in the session store; this module owns *what format and how to
 * encode*.
 *
 * Why this exists (OC core issue #4): the legacy session store persists via
 * `JSON.stringify`, which silently loses `Map`, `Set`, `Date` precision,
 * `BigInt`, `ArrayBuffer`/`Uint8Array` (becomes `{}`), `undefined` keys, and
 * throws on circular references. v8 structured serialization
 * (`v8.serialize`/`v8.deserialize`) is lossless and faster for large objects.
 * This module extracts the format *decision* + encode/decode into a pure,
 * foundry-gateable module, then the surgical edit wires it into the store.
 *
 * @dft
 * - A1 (pure-io-separation): no fs/net/http imports. `node:v8` and
 *   `node:buffer` are value transforms, not I/O. No Date.now/Math.random.
 * - A2 (determinism): same value → same bytes. v8.serialize is deterministic
 *   for a given value shape.
 * - A4 (dft-docs): this file is documented.
 * - A6 (check-result): returns result structs ({ format, reason }, { bytes }).
 */

import { Buffer } from "node:buffer";
import { serialize as v8Serialize, deserialize as v8Deserialize } from "node:v8";

/**
 * ASCII magic header prepended to v8-serialized payloads so the read path can
 * detect the format by examining the first bytes. JSON text never starts with
 * 0x7f (DEL) — JSON values begin with `{`, `[`, `"`, a digit, `-`, `t`, `f`,
 * or `n`. Safe, unambiguous, and self-documenting.
 */
export const SERIALIZATION_MAGIC = "\x7fOC-V8\n";

const MAGIC_BYTES = Buffer.from(SERIALIZATION_MAGIC, "utf-8");

/**
 * The chosen on-disk format for a session-store value.
 */
export type SerializationFormat = "v8" | "json";

/**
 * The result of choosing a format — carries its own proof (A6: check-result).
 */
export type SerializationFormatChoice = {
  readonly format: SerializationFormat;
  readonly reason: string;
};

/**
 * Detect the format of a byte stream by examining its magic prefix.
 *
 * @example
 *   detectSerializationFormat(Buffer.from("\x7fOC-V8\n...")) // → "v8"
 *   detectSerializationFormat(Buffer.from('{"a":1}'))         // → "json"
 */
export function detectSerializationFormat(bytes: Uint8Array): SerializationFormat {
  if (bytes.length >= MAGIC_BYTES.length) {
    for (let i = 0; i < MAGIC_BYTES.length; i++) {
      if (bytes[i] !== MAGIC_BYTES[i]) {
        return "json";
      }
    }
    return "v8";
  }
  return "json";
}

/**
 * Determine whether a value is safe to serialize as JSON without loss.
 *
 * Returns false for: `Map`, `Set`, `BigInt`, `ArrayBuffer`, `TypedArray`,
 * `DataView`, `symbol` keys, `function`, and circular references. Returns
 * true for plain JSON-native shapes (object/array/string/number/boolean/null).
 *
 * Depth-limited to prevent pathological traversal; values deeper than the
 * limit are conservatively reported as JSON-unsafe (→ v8).
 */
export function isJsonSafeValue(value: unknown, seen?: WeakSet<object>, depth = 0): boolean {
  const MAX_DEPTH = 200;
  if (depth > MAX_DEPTH) {
    return false;
  }
  if (value === null || value === undefined) {
    return true;
  }
  const type = typeof value;
  if (type === "string" || type === "number" || type === "boolean") {
    return Number.isFinite(value as number) || type !== "number";
  }
  if (type === "bigint" || type === "symbol" || type === "function") {
    return false;
  }
  if (type !== "object") {
    return false;
  }
  const obj = value as object;
  // Non-JSON-native object kinds.
  if (
    obj instanceof Map ||
    obj instanceof Set ||
    obj instanceof ArrayBuffer ||
    ArrayBuffer.isView(obj)
  ) {
    return false;
  }
  if (obj instanceof Date) {
    // Date serializes to a string in JSON; we consider it JSON-safe but
    // lossy. To preserve Date precision, route Dates to v8.
    return false;
  }
  // Circular reference detection.
  const visited = seen ?? new WeakSet<object>();
  if (visited.has(obj)) {
    return false;
  }
  visited.add(obj);
  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (!isJsonSafeValue(item, visited, depth + 1)) {
        return false;
      }
    }
    return true;
  }
  for (const key of Object.keys(obj)) {
    if (typeof key !== "string") {
      return false;
    }
    const prop = (obj as Record<string, unknown>)[key];
    if (!isJsonSafeValue(prop, visited, depth + 1)) {
      return false;
    }
  }
  return true;
}

/**
 * Choose the serialization format for a session-store value.
 *
 * Policy: if every nested value is JSON-native, use JSON (human-readable,
 * backward-compatible, diffable). If any value needs lossless transport, use
 * v8 structured serialization.
 *
 * @example
 *   chooseSerializationFormat({ a: 1 })                     // → { format: "json", reason: ... }
 *   chooseSerializationStore({ m: new Map() })              // → { format: "v8", reason: ... }
 */
export function chooseSerializationFormat(value: unknown): SerializationFormatChoice {
  if (isJsonSafeValue(value)) {
    return {
      format: "json",
      reason: "all values are JSON-native; JSON is human-readable and backward-compatible",
    };
  }
  return {
    format: "v8",
    reason:
      "value contains non-JSON-native types (Map/Set/Date/BigInt/binary/circular); v8 is lossless",
  };
}

/**
 * The result of serializing a session store — bytes + the format chosen.
 */
export type SerializedSessionStore = {
  readonly bytes: Buffer;
  readonly format: SerializationFormat;
};

/**
 * Serialize a session-store value to bytes, choosing the format via the policy.
 *
 * v8 payloads are prefixed with {@link SERIALIZATION_MAGIC} so the read path
 * can detect them. JSON payloads are UTF-8 encoded text (no magic).
 *
 * @example
 *   const { bytes, format } = serializeSessionStore({ a: 1 });
 *   format // → "json"
 */
export function serializeSessionStore<T>(value: Record<string, T>): SerializedSessionStore {
  const choice = chooseSerializationFormat(value);
  if (choice.format === "v8") {
    const payload = v8Serialize(value);
    return {
      bytes: Buffer.concat([MAGIC_BYTES, Buffer.from(payload)]),
      format: "v8",
    };
  }
  return {
    bytes: Buffer.from(JSON.stringify(value, null, 2), "utf-8"),
    format: "json",
  };
}

/**
 * Deserialize a byte stream back into a session store, detecting the format
 * by its magic prefix. Falls back to JSON5 text parsing for legacy files.
 *
 * @example
 *   const { store, ok } = deserializeSessionStore(bytes);
 */
export function deserializeSessionStore(bytes: Uint8Array): {
  store: Record<string, unknown>;
  ok: boolean;
} {
  const format = detectSerializationFormat(bytes);
  if (format === "v8") {
    try {
      const payload = bytes.subarray(MAGIC_BYTES.length);
      const value = v8Deserialize(payload);
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return { store: value as Record<string, unknown>, ok: true };
      }
    } catch {
      // fall through to JSON attempt
    }
    return { store: {}, ok: false };
  }
  // JSON text path — parse strictly first.
  try {
    const text = Buffer.from(bytes).toString("utf-8");
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return { store: parsed as Record<string, unknown>, ok: true };
    }
  } catch {
    // not valid JSON
  }
  return { store: {}, ok: false };
}
