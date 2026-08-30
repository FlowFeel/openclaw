import { describe, expect, it } from "vitest";
import { projectSkimResult } from "./skim-projector.js";

describe("skim-projector (Tier 1 Pure Invariants)", () => {
  it("handles empty text gracefully", () => {
    const res = projectSkimResult("");
    expect(res.mode).toBe("skim");
    expect(res.highlights).toHaveLength(0);
    expect(res.totalLines).toBe(0);
  });

  it("extracts top highlights with summary header", () => {
    const raw = `
      // System header
      export function connectToDatabase(): void {
        console.log("Connecting...");
      }
      export function fetchUserRecord(): Record<string, string> {
        return { id: "123" };
      }
      export function disconnectDatabase(): void {
        console.log("Closing...");
      }
    `;

    const res = projectSkimResult(raw, { maxHighlights: 2, maxCharsPerHighlight: 50 });
    expect(res.mode).toBe("skim");
    expect(res.highlights).toHaveLength(2);
    expect(res.summaryText).toContain("[SKIM SUMMARY:");
    expect(res.highlights[0]).toContain("[#1]");
    expect(res.highlights[1]).toContain("[#2]");
  });
});
