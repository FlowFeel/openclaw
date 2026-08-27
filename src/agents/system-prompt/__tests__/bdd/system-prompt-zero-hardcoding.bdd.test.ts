import { describe, expect, it } from "vitest";
import {
  buildAgentSystemPrompt,
  resolvePromptSections,
} from "../../system-prompt.js";
import { getAvailablePromptSections } from "../../system-prompt/registry.js";

describe("Tier 2 BDD: Zero-Hardcoding Prompt Architecture Behavioral Contracts", () => {
  /**
   * Scenario: Bare prompt generation with zero hardcoded strings
   * Given an agent session configured with promptMode: 'bare'
   * When the system prompt is assembled
   * Then it contains only core mechanics and zero hardcoded etiquette/persona
   */
  it("Contract Z1: Baseline bare generation contains 0 hardcoded persona or etiquette strings", () => {
    const prompt = buildAgentSystemPrompt({
      workspaceDir: "/tmp/workspace",
      promptMode: "bare",
      toolNames: ["exec", "read_file"],
      runtimeInfo: { model: "claude-3-5-sonnet", host: "ec2-box" },
    });

    expect(prompt).not.toContain("You are a personal assistant running inside OpenClaw.");
    expect(prompt).not.toContain("Routine low-risk: call silently.");
    expect(prompt).not.toContain("Model question: answer this current-run value.");
    expect(prompt).not.toContain("## Safety");
    expect(prompt).toContain("## Tools");
    expect(prompt).toContain("## Runtime");
  });

  /**
   * Scenario: Dynamic injection of custom persona and safety guardrails
   * Given an agent configuring sectionOverrides for identity and safety
   * When the prompt is compiled
   * Then custom lines materialize in the cache-stable prefix before cache boundary
   */
  it("Contract Z2: Injected custom sections materialize cleanly in deterministic cache partitions", () => {
    const sections = resolvePromptSections({
      workspaceDir: "/tmp/workspace",
      promptMode: "bare",
      toolNames: ["exec"],
      sectionOverrides: {
        identity: "Phosphene Sentinel Core v4",
        safety: "Zero exfiltration of memory state.",
        messaging: "Telemetry packet streaming format.",
      },
    });

    const boundaryIndex = sections.findIndex((s) => s.id === "cache-boundary");
    const identityIndex = sections.findIndex((s) => s.id === "identity");
    const safetyIndex = sections.findIndex((s) => s.id === "safety");
    const messagingIndex = sections.findIndex((s) => s.id === "messaging");

    expect(boundaryIndex).toBeGreaterThan(-1);
    expect(identityIndex).toBeLessThan(boundaryIndex);
    expect(safetyIndex).toBeLessThan(boundaryIndex);
    expect(messagingIndex).toBeGreaterThan(boundaryIndex);

    expect(sections[identityIndex].lines).toEqual(["Phosphene Sentinel Core v4"]);
    expect(sections[safetyIndex].lines).toEqual(["Zero exfiltration of memory state."]);
    expect(sections[messagingIndex].lines).toEqual(["Telemetry packet streaming format."]);
  });

  /**
   * Scenario: Forcing a section to empty set (null override)
   * Given a default prompt setup where a section would normally render
   * When sectionOverrides sets that section key to null
   * Then the section evaluates to the empty set
   */
  it("Contract Z3: Setting an override to null or empty string forces immediate empty set", () => {
    const sections = resolvePromptSections({
      workspaceDir: "/tmp/workspace",
      promptMode: "full",
      toolNames: ["exec"],
      sectionOverrides: {
        "tool-call-style": null,
        safety: "",
      },
    });

    const toolCallStyleSection = sections.find((s) => s.id === "tool-call-style");
    expect(toolCallStyleSection?.lines).toEqual([]);

    const safetySection = sections.find((s) => s.id === "safety");
    expect(safetySection?.lines).toEqual([]);
  });

  /**
   * Scenario: Registry metadata inspection
   * Given the section primitive registry
   * When queried for available prompt sections
   * Then all 28 primitives are accurately reported with metadata
   */
  it("Contract Z4: getAvailablePromptSections accurately reports all prompt primitives", () => {
    const catalog = getAvailablePromptSections();
    expect(catalog.length).toBeGreaterThanOrEqual(28);

    for (const item of catalog) {
      expect(item.id).toBeTruthy();
      expect(typeof item.cacheStable).toBe("boolean");
      expect(typeof item.isMechanic).toBe("boolean");
      expect(typeof item.description).toBe("string");
    }
  });
});
