import { describe, it, expect } from "vitest";
import { RabinKarpTokenHasher } from "./rabin-karp-token-hasher.js";

describe("RabinKarpTokenHasher (TV-V8-01)", () => {
  it("detects repeating 16-token sequence on repetition in O(1) time", () => {
    const hasher = new RabinKarpTokenHasher({ windowSize: 16 });

    // Distinct 16-token pattern
    const pattern = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116];

    // Push initial pattern - should NOT detect collision yet
    for (const tok of pattern) {
      const isLoop = hasher.pushToken(tok);
      expect(isLoop).toBe(false);
    }

    // Push non-repeating tokens
    for (const tok of [200, 201, 202, 203]) {
      const isLoop = hasher.pushToken(tok);
      expect(isLoop).toBe(false);
    }

    // Push identical 16-token pattern again
    let collisionDetected = false;
    for (const tok of pattern) {
      if (hasher.pushToken(tok)) {
        collisionDetected = true;
        break;
      }
    }

    expect(collisionDetected).toBe(true);
  });

  it("handles reset for new generation turns", () => {
    const hasher = new RabinKarpTokenHasher({ windowSize: 8 });
    const pattern = [1, 2, 3, 4, 5, 6, 7, 8];

    hasher.pushTokens(pattern);
    hasher.reset();

    expect(hasher.getTotalTokens()).toBe(0);
    // After reset, identical pattern should not collide with previous turn
    expect(hasher.pushTokens(pattern)).toBe(false);
  });
});
