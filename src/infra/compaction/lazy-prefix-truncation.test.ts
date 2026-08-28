// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  DEFAULT_PREFIX_BUDGET_BYTES,
  lazyPrefixTruncate,
} from "./lazy-prefix-truncation.js";

describe("lazyPrefixTruncate φ(v, k)", () => {
  it("leaves short strings under limitBytes intact", () => {
    const input = "find /home/node";
    const result = lazyPrefixTruncate(input, 120);
    expect(result).toBe("find /home/node");
  });

  it("truncates long strings exceeding limitBytes and appends ellipsis", () => {
    const input = "a".repeat(200);
    const result = lazyPrefixTruncate(input, 50);
    expect(result).toBe("a".repeat(50) + "…");
  });

  it("recursively projects object property values while leaving keys intact", () => {
    const input = {
      command: "git status " + "x".repeat(150),
      count: 42,
      flag: true,
      nullVal: null,
    };
    const result = lazyPrefixTruncate(input, 30);
    expect(result).toEqual({
      command: "git status " + "x".repeat(19) + "…",
      count: 42,
      flag: true,
      nullVal: null,
    });
    // Keys carry 0 entropy delta
    expect(Object.keys(result)).toEqual(Object.keys(input));
  });

  it("recursively projects array elements", () => {
    const input = ["short", "long string ".repeat(20)];
    const result = lazyPrefixTruncate(input, 15);
    expect(result).toEqual(["short", "long string lon" + "…"]);
  });

  it("passes non-string primitives through unchanged", () => {
    expect(lazyPrefixTruncate(123)).toBe(123);
    expect(lazyPrefixTruncate(true)).toBe(true);
    expect(lazyPrefixTruncate(null)).toBeNull();
    expect(lazyPrefixTruncate(undefined)).toBeUndefined();
  });

  it("uses default limitBytes of 120 when omitted", () => {
    const longString = "k".repeat(150);
    const result = lazyPrefixTruncate(longString);
    expect(result).toBe("k".repeat(DEFAULT_PREFIX_BUDGET_BYTES) + "…");
  });
});
