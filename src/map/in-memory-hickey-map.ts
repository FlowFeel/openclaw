/**
 * Pure In-Memory Hickey Coordinate Map Reference Implementation.
 *
 * Provides a zero-I/O, zero-dependency reference map adhering strictly to:
 * - A1 (pure-io-separation)
 * - A2 (determinism)
 * - A5 (mock-doubles / reference implementation)
 * - A6 (check-result)
 * - M1 (no-schema)
 * - M2 (silent-overwrite)
 * - M3 (null-on-absent)
 * - M4 (prefix-discovery)
 *
 * @dft
 */

import type { HickeyMap, MapDeleteResult, MapWriteResult } from "./types.js";

export class InMemoryHickeyMap implements HickeyMap {
  private readonly store = new Map<string, string>();

  /**
   * Reads the value at key, or returns null if absent (M3: null-on-absent).
   */
  read(key: string): string | null {
    if (!key) {
      return null;
    }
    return this.store.get(key) ?? null;
  }

  /**
   * Writes the value at key, overwriting silently without conflict detection (M2: silent-overwrite).
   */
  write(key: string, value: string): MapWriteResult {
    this.store.set(key, value);
    return { written: true, key };
  }

  /**
   * Lists all keys matching the prefix (M4: prefix-discovery).
   */
  listKeys(prefix: string): readonly string[] {
    const matched: string[] = [];
    for (const k of this.store.keys()) {
      if (k.startsWith(prefix)) {
        matched.push(k);
      }
    }
    return matched;
  }

  /**
   * Removes a key. Silent if absent (A6: check-result).
   */
  delete(key: string): MapDeleteResult {
    const existed = this.store.has(key);
    this.store.delete(key);
    return { existed, key };
  }

  /**
   * Returns current map size (helper).
   */
  size(): number {
    return this.store.size;
  }

  /**
   * Clears the entire map store.
   */
  clear(): void {
    this.store.clear();
  }
}

export const defaultHickeyMap = new InMemoryHickeyMap();
