import { describe, expect, it } from "vitest";
import { validateCertifiedToolArity } from "../../infra/shannon-weaver/certified-tool-validator.js";
import {
  createCompactionMeterTools,
  defaultCompactionMeterTools,
} from "./compaction-meter-tool.js";

describe("Compaction Meter Tools — Degree 1 Tool Contracts", () => {
  it("certifies that all compaction meter tools are Atomic tier (k <= 2)", () => {
    for (const tool of defaultCompactionMeterTools) {
      const valResult = validateCertifiedToolArity({
        name: tool.name,
        parameters: tool.parameters as Record<string, unknown>,
      });
      expect(valResult.valid).toBe(true);
      expect(valResult.tier).toBe("atomic");
      expect(valResult.certifiedArity).toBeLessThanOrEqual(2);
    }
  });

  it("executes context_meter tool and returns structured visual gauge", async () => {
    const [contextMeterTool] = defaultCompactionMeterTools;
    const result = await contextMeterTool.execute("call-1", {
      currentTokens: 160_000,
      currentBytes: 1.8 * 1024 * 1024,
    });
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed.percentage).toBe(80);
    expect(parsed.tier).toBe("warning");
    expect(parsed.visualMeter).toBe("[████████░░]");
    expect(parsed.formattedLabel).toContain("160K/200K tokens");
  });

  it("executes compaction_preview tool and returns dual-metric savings", async () => {
    const [, previewTool] = defaultCompactionMeterTools;
    const result = await previewTool.execute("call-2", {
      tokensBefore: 167_000,
      tokensAfter: 40_000,
    });
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed.tokenDeltaPercent).toBe(76.0);
    expect(parsed.formattedSummary).toContain("167K tokens → 40K (-76%)");
  });

  it("adapts threshold when instantiated with custom environment vector", async () => {
    const customTools = createCompactionMeterTools({
      modelContextWindow: 128_000,
      reserveTokens: 8_000,
      triggerRatio: 0.75, // 96K tokens
    });
    const [meterTool] = customTools;
    const result = await meterTool.execute("call-3", {
      currentTokens: 96_000,
    });
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed.thresholdTokens).toBe(96_000);
    expect(parsed.percentage).toBe(100);
    expect(parsed.tier).toBe("overflow");
  });
});
