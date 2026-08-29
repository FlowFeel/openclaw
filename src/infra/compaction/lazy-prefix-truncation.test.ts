// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  DEFAULT_HEAD_TAIL_BUDGET_BYTES,
  psiHeadTailTruncate,
} from "./lazy-prefix-truncation.js";

describe("psiHeadTailTruncate ψ(v, k)", () => {
  it("leaves short strings under 2*k bytes intact", () => {
    const input = "find /home/node";
    const result = psiHeadTailTruncate(input, 120);
    expect(result).toBe("find /home/node");
  });

  it("slices head 0:k and tail |v|-k:|v| for long strings exceeding 2*k", () => {
    const headPart = "HEAD_START_" + "a".repeat(10); // 21 chars
    const bodyPart = "BODY_NOISE_".repeat(20);        // 220 chars
    const tailPart = "b".repeat(10) + "_TAIL_END";  // 19 chars
    const input = headPart + bodyPart + tailPart;

    const result = psiHeadTailTruncate(input, 20);
    expect(result).toContain(headPart.slice(0, 20));
    expect(result).toContain(tailPart.slice(tailPart.length - 20));
    expect(result).toContain("... [truncated ");
  });

  it("recursively projects object property values while leaving keys intact", () => {
    const input = {
      command: "START_" + "x".repeat(150) + "_END",
      count: 42,
      flag: true,
      nullVal: null,
    };
    const result = psiHeadTailTruncate(input, 10);
    expect(result.command).toBe("START_xxxx\n... [truncated 140 bytes] ...\nxxxxxx_END");
    expect(result.count).toBe(42);
    expect(result.flag).toBe(true);
    expect(result.nullVal).toBeNull();
    // Keys carry 0 entropy delta
    expect(Object.keys(result)).toEqual(Object.keys(input));
  });

  it("passes non-string primitives through unchanged", () => {
    expect(psiHeadTailTruncate(123)).toBe(123);
    expect(psiHeadTailTruncate(true)).toBe(true);
    expect(psiHeadTailTruncate(null)).toBeNull();
    expect(psiHeadTailTruncate(undefined)).toBeUndefined();
  });

  it("uses default k budget of 120 when omitted", () => {
    const longString = "h".repeat(150) + "m".repeat(100) + "t".repeat(150);
    const result = psiHeadTailTruncate(longString);
    expect(result).toContain("h".repeat(120));
    expect(result).toContain("t".repeat(120));
    expect(result).toContain("... [truncated 160 bytes] ...");
  });
});

