import { describe, expect, it } from "vitest";
import {
  buildAgentSystemPrompt,
  resolvePromptSections,
} from "../../../system-prompt.js";

describe("Tier 1 Unit: Bare Mode & Dynamic Injection", () => {
  it("renders only core mechanics sections in bare mode with zero hardcoded persona", () => {
    const sections = resolvePromptSections({
      workspaceDir: "/tmp/workspace",
      promptMode: "bare",
      toolNames: ["exec", "read_file"],
      runtimeInfo: { model: "claude-3-5-sonnet", channel: "telegram" },
    });

    const activeSections = sections.filter((s) => s.lines.length > 0);
    const sectionIds = activeSections.map((s) => s.id);

    expect(sectionIds).toContain("tooling");
    expect(sectionIds).toContain("cache-boundary");
    expect(sectionIds).toContain("runtime");

    // Non-mechanics sections evaluate to empty set (0 lines)
    expect(sectionIds).not.toContain("identity");
    expect(sectionIds).not.toContain("safety");
    expect(sectionIds).not.toContain("tool-call-style");
    expect(sectionIds).not.toContain("messaging");
    expect(sectionIds).not.toContain("reactions");
  });

  it("materializes dynamically injected identity and safety in cache-stable prefix", () => {
    const sections = resolvePromptSections({
      workspaceDir: "/tmp/workspace",
      promptMode: "bare",
      toolNames: ["exec"],
      sectionOverrides: {
        identity: "Custom Identity Persona",
        safety: "Custom Guardrail Policy",
      },
    });

    const identitySection = sections.find((s) => s.id === "identity");
    expect(identitySection?.lines).toEqual(["Custom Identity Persona"]);
    expect(identitySection?.cacheStable).toBe(true);

    const safetySection = sections.find((s) => s.id === "safety");
    expect(safetySection?.lines).toEqual(["Custom Guardrail Policy"]);
    expect(safetySection?.cacheStable).toBe(true);
  });

  it("materializes dynamically injected messaging in dynamic suffix", () => {
    const sections = resolvePromptSections({
      workspaceDir: "/tmp/workspace",
      promptMode: "bare",
      toolNames: ["exec"],
      sectionOverrides: {
        messaging: "Custom Messaging Protocol",
      },
    });

    const messagingSection = sections.find((s) => s.id === "messaging");
    expect(messagingSection?.lines).toEqual(["Custom Messaging Protocol"]);
    expect(messagingSection?.cacheStable).toBe(false);
  });

  it("filters prompt sections strictly when promptSections whitelist is passed", () => {
    const prompt = buildAgentSystemPrompt({
      workspaceDir: "/tmp/workspace",
      promptMode: "bare",
      toolNames: ["exec"],
      promptSections: ["tooling", "runtime"],
      runtimeInfo: { model: "claude-3-5-sonnet" },
    });

    expect(prompt).toContain("## Tooling");
    expect(prompt).toContain("## Runtime");
    expect(prompt).not.toContain("## Temporal Context");
  });
});
