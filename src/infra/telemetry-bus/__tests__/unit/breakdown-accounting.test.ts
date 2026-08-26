/**
 * Tier 1 Unit Tests: Per-Source Token Breakdown Accounting.
 */

import { describe, expect, it } from "vitest";
import { categorizeMessageTokens, estimateTextTokens } from "../../../../agents/tools/session-status/transcript-usage.js";

describe("categorizeMessageTokens (Pure Per-Source Token Breakdown)", () => {
  it("categorizes standard user history turn", () => {
    const msg = { role: "user", content: "Can you summarize this codebase?" };
    const { category, tokens } = categorizeMessageTokens(msg);

    expect(category).toBe("history");
    expect(tokens).toBeGreaterThan(0);
  });

  it("categorizes system prompt turn", () => {
    const msg = { role: "system", content: "You are the resident openclaw assistant." };
    const { category, tokens } = categorizeMessageTokens(msg);

    expect(category).toBe("system");
    expect(tokens).toBe(estimateTextTokens(msg.content));
  });

  it("categorizes workspace memory turn", () => {
    const msg = { role: "system", content: "# Workspace Memory:\n- Prior decisions recorded." };
    const { category, tokens } = categorizeMessageTokens(msg);

    expect(category).toBe("memory");
    expect(tokens).toBeGreaterThan(0);
  });

  it("categorizes tool call results", () => {
    const msg = { role: "tool", content: JSON.stringify({ ok: true, output: "file contents..." }) };
    const { category, tokens } = categorizeMessageTokens(msg);

    expect(category).toBe("tool");
    expect(tokens).toBeGreaterThan(0);
  });
});
