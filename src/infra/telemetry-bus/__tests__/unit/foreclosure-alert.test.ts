/**
 * Tier 1 Unit Tests: Ambient Foreclosure Alert Header Generator.
 */

import { describe, expect, it } from "vitest";
import { formatAmbientForeclosureHeader } from "../../foreclosure-alert.js";
import type { Frame1Position } from "../../types.js";

describe("formatAmbientForeclosureHeader (Pure Ambient Foreclosure Alert)", () => {
  it("returns null when capacity is nominal (<85%)", () => {
    const f1: Frame1Position = {
      usedTokens: 40000,
      limitTokens: 100000,
      headroomTokens: 60000,
      capacityPct: 40,
      snrScore: 92,
      isForeclosureImminent: false,
      breakdown: {
        totalTokens: 40000,
        systemPromptTokens: 2000,
        historyTurnsTokens: 38000,
        toolResultsTokens: 0,
        workspaceMemoryTokens: 0,
        turnCount: 10,
      },
    };

    expect(formatAmbientForeclosureHeader(f1)).toBeNull();
  });

  it("emits warning header when capacity reaches or exceeds 85%", () => {
    const f1: Frame1Position = {
      usedTokens: 88000,
      limitTokens: 100000,
      headroomTokens: 12000,
      capacityPct: 88,
      snrScore: 85,
      isForeclosureImminent: true,
      breakdown: {
        totalTokens: 88000,
        systemPromptTokens: 2000,
        historyTurnsTokens: 76000,
        toolResultsTokens: 10000,
        workspaceMemoryTokens: 0,
        turnCount: 25,
      },
    };

    const header = formatAmbientForeclosureHeader(f1);
    expect(header).not.toBeNull();
    expect(header).toContain("FORECLOSURE IMMINENT");
    expect(header).toContain("88.0k/100k (88%)");
  });
});
