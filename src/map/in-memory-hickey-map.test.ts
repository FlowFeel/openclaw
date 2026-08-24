/**
 * @file in-memory-hickey-map.test.ts
 * @description Pure DFT Invariant Verification for Hickey Coordinate Map Reference Implementation.
 *
 * @dft
 * - Prediction: In-memory Hickey map implements pure O(1) reads/writes/deletes, prefix discovery,
 *   silent overwrites, and null-on-absent without errors or schema enforcement.
 * - Competing account: Missing keys throw errors, or overwrites fail/warn, or prefix queries leak unrelated keys.
 * - What would support: All pure assertions pass with 0ms execution; M1-M5 axioms hold strictly.
 * - What would refute: read() throws on absent key; write() validates schemas; listKeys fails on prefixes.
 */

import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryHickeyMap } from "./in-memory-hickey-map.js";
import {
  isGradientCompliant,
  verifyAbsentKey,
  verifyMapContract,
  verifyPrefixDiscovery,
  verifySilentOverwrite,
} from "./types.js";

describe("HickeyCoordinateMap (Pure DFT Invariants)", () => {
  let map: InMemoryHickeyMap;

  beforeEach(() => {
    map = new InMemoryHickeyMap();
  });

  describe("read (M3: null-on-absent)", () => {
    it("returns the value for an existing key", () => {
      map.write("fin/framework/panic-not-doom", "we assume stability");
      expect(map.read("fin/framework/panic-not-doom")).toBe("we assume stability");
    });

    it("returns null for a key that does not exist", () => {
      expect(map.read("fin/framework/does-not-exist")).toBeNull();
    });

    it("returns null for an empty key", () => {
      expect(map.read("")).toBeNull();
    });
  });

  describe("write (M1: no-schema, M2: silent-overwrite)", () => {
    it("stores a value and returns it on subsequent read", () => {
      const result = map.write("fin/cycles/csco", "placeholder");
      expect(result).toEqual({ written: true, key: "fin/cycles/csco" });
      expect(map.read("fin/cycles/csco")).toBe("placeholder");
    });

    it("silently overwrites an existing key", () => {
      map.write("fin/cycles/csco", "old value");
      map.write("fin/cycles/csco", "new value");
      expect(map.read("fin/cycles/csco")).toBe("new value");
    });

    it("accepts empty string as value", () => {
      map.write("fin/empty", "");
      expect(map.read("fin/empty")).toBe("");
    });

    it("accepts keys with special characters", () => {
      map.write("fin/2024-08-24/notes", "test");
      expect(map.read("fin/2024-08-24/notes")).toBe("test");
    });
  });

  describe("delete (A6: check-result)", () => {
    it("removes a key and returns existed: true", () => {
      map.write("fin/cycles/csco", "value");
      const result = map.delete("fin/cycles/csco");
      expect(result).toEqual({ existed: true, key: "fin/cycles/csco" });
      expect(map.read("fin/cycles/csco")).toBeNull();
    });

    it("returns existed: false for a key that does not exist", () => {
      const result = map.delete("fin/cycles/nonexistent");
      expect(result).toEqual({ existed: false, key: "fin/cycles/nonexistent" });
    });

    it("does not affect other keys with the same prefix", () => {
      map.write("fin/framework/panic-not-doom", "value");
      map.write("fin/cycles/csco", "value");
      map.delete("fin/cycles/csco");
      expect(map.read("fin/framework/panic-not-doom")).toBe("value");
      expect(map.read("fin/cycles/csco")).toBeNull();
    });
  });

  describe("listKeys (M4: prefix-discovery)", () => {
    it("returns all keys under a prefix", () => {
      map.write("fin/framework/panic-not-doom", "a");
      map.write("fin/cycles/csco", "b");
      map.write("fin/figures/minsky", "c");
      map.write("telegram/group/123/topic/1", "d");

      const finKeys = map.listKeys("fin/");
      expect([...finKeys].sort()).toEqual([
        "fin/cycles/csco",
        "fin/figures/minsky",
        "fin/framework/panic-not-doom",
      ]);
    });

    it("returns an empty array for a prefix that does not exist", () => {
      expect(map.listKeys("nonexistent/")).toEqual([]);
    });

    it("returns only keys under the exact prefix, not substrings", () => {
      map.write("finance/note", "a");
      map.write("fin/note", "b");
      const finKeys = map.listKeys("fin/");
      expect(finKeys).toEqual(["fin/note"]);
      expect(finKeys).not.toContain("finance/note");
    });

    it("returns all keys for empty prefix", () => {
      map.write("a", "1");
      map.write("b", "2");
      const allKeys = map.listKeys("");
      expect([...allKeys].sort()).toEqual(["a", "b"]);
    });
  });

  describe("edge cases & predicate proofs", () => {
    it("handles keys with trailing slashes consistently", () => {
      map.write("fin/", "value");
      expect(map.read("fin/")).toBe("value");
      expect(map.read("fin")).toBeNull(); // different key
    });

    it("handles deep nesting", () => {
      map.write("a/b/c/d/e/f/g", "deep");
      expect(map.read("a/b/c/d/e/f/g")).toBe("deep");
      expect(map.listKeys("a/b/c/")).toEqual(["a/b/c/d/e/f/g"]);
    });

    it("proves immediate consistency via verifyMapContract", () => {
      const contractResults = verifyMapContract(map, "fin/test/immediate", "immediate_val");
      expect(contractResults).toEqual([
        { found: true, key: "fin/test/immediate", value: "immediate_val" },
        { found: false, key: "fin/test/immediate" },
      ]);
    });

    it("proves absent key verification via verifyAbsentKey", () => {
      expect(verifyAbsentKey(map, "fin/absent/key")).toEqual({
        found: false,
        key: "fin/absent/key",
      });
    });

    it("proves silent overwrite via verifySilentOverwrite", () => {
      expect(verifySilentOverwrite(map, "fin/k", "v1", "v2")).toEqual({
        found: true,
        key: "fin/k",
        value: "v2",
      });
    });

    it("proves prefix discovery via verifyPrefixDiscovery", () => {
      expect(
        verifyPrefixDiscovery(
          map,
          "fin/",
          ["fin/a", "fin/b", "fin/c/d"],
          ["tel/a", "other/b"],
        ),
      ).toBe(true);
    });

    it("evaluates gradient compliance via isGradientCompliant (M5)", () => {
      expect(isGradientCompliant("fin/framework/panic-not-doom").compliant).toBe(true);
      expect(isGradientCompliant("a/b/c/d/e").compliant).toBe(false);
    });
  });
});
