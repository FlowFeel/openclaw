import { describe, expect, it } from "vitest";
import {
  buildModelIdentityPromptLine,
  buildUserIdentitySection,
  MODEL_IDENTITY_PREFIX,
} from "../../qa-leak-sanitizer.js";

describe("Tier 1 Unit: QA & Provenance Leak Sanitizer", () => {
  it("builds model identity line without QA question suffix", () => {
    const line = buildModelIdentityPromptLine("claude-3-5-sonnet");
    expect(line).toBe(`${MODEL_IDENTITY_PREFIX} claude-3-5-sonnet.`);
    expect(line).not.toContain("Model question:");
    expect(line).not.toContain("answer this current-run value");
  });

  it("returns undefined for empty model strings", () => {
    expect(buildModelIdentityPromptLine(undefined)).toBeUndefined();
    expect(buildModelIdentityPromptLine("")).toBeUndefined();
    expect(buildModelIdentityPromptLine("   ")).toBeUndefined();
  });

  it("suppresses user identity in minimal / bare modes", () => {
    const section = buildUserIdentitySection("Telegram user: 123456", true);
    expect(section).toEqual([]);
  });

  it("renders user identity when not minimal and ownerLine is provided", () => {
    const section = buildUserIdentitySection("Telegram user: 123456", false);
    expect(section).toEqual(["## Authorized Senders", "Telegram user: 123456", ""]);
  });
});
