import { describe, expect, it } from "vitest";
import {
  createSystemPromptInspectTool,
  estimateTokensFromChars,
} from "./system-prompt-inspect-tool.js";

describe("system_prompt_inspect tool", () => {
  it("estimates token count from character count accurately", () => {
    expect(estimateTokensFromChars(0)).toBe(0);
    expect(estimateTokensFromChars(38)).toBe(10);
    expect(estimateTokensFromChars(380)).toBe(100);
  });

  it("inspects active promptMode and returns section breakdown for bare mode", async () => {
    const tool = createSystemPromptInspectTool();
    const result = await tool.execute("call-1", { sessionKey: "main", includeText: true });

    const details = result.details as {
      ok?: boolean;
      sessionKey: string;
      activePromptMode: string;
      totalChars: number;
      totalTokens: number;
      sectionsCount: number;
      sections: Array<{ id: string; chars: number; estimatedTokens: number; cacheStable: boolean }>;
      summaryText: string;
      renderedText?: string;
    };

    expect(details.sessionKey).toBe("main");
    expect(details.activePromptMode).toBeDefined();
    expect(details.sectionsCount).toBeGreaterThan(0);
    expect(details.totalChars).toBeGreaterThan(0);
    expect(details.totalTokens).toBeGreaterThan(0);
    expect(details.summaryText).toContain("System Prompt Inspection Report");
    expect(details.summaryText).toContain("Active PromptMode:");
    expect(details.renderedText).toBeDefined();
  });

  it("calculates token reduction delta when compareMode is provided", async () => {
    const tool = createSystemPromptInspectTool();
    const result = await tool.execute("call-2", {
      sessionKey: "main",
      includeText: false,
      compareMode: "full",
    });

    const details = result.details as {
      compare?: {
        compareMode: string;
        compareTotalChars: number;
        compareTotalTokens: number;
        tokenDelta: number;
        reductionPercent: string;
      };
      summaryText: string;
      renderedText?: string;
    };

    expect(details.renderedText).toBeUndefined();
    expect(details.compare).toBeDefined();
    expect(details.compare?.compareMode).toBe("full");
    expect(details.compare?.compareTotalTokens).toBeGreaterThan(0);
    expect(details.summaryText).toContain("Mode Comparison Delta");
  });
});
